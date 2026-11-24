jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));


import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { harderQuestions, learningApi, localDateKey } from "../api/islamicLearningApi";
import { challengeLevel, HARDER_OFFER_AFTER } from "../data/challengeLevel";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { getStoredItem, setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, UserProfile } from "../types";
import { questionOnScreen, toQuestion, withHarder } from "./lessonDriver";
import { makeUser } from "./testUtils";
import { withoutWaitingQuestions } from "../services/lessonQueue";
import { ComboBadge } from "../ui/lesson/LessonHeader";

// Fahad: "while they're doing the questions it gets harder and harder", and "ask them, do you want it harder or not,
// after 3 questions". In a lesson, after a few right in a row it asks "Want it harder?"; after a yes every later run
// steps up on its own (harder questions, harder wordings); a wrong answer eases it off again.

const PROFILE_KEY = "sira-path-user-profile";
// The sheet stays drawn while it slides away, without taking taps.
const offerOpen = () => {
  const sheet = screen.queryByTestId("harder-sheet");
  return Boolean(sheet) && sheet!.props.pointerEvents !== "none";
};
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

// A learner three circles into Basics, so the fourth circle has finished lessons to ask from memory.
const foundation = COURSE.sections.find((section) => section.topicId === "foundation")!;
const doneNodes = foundation.nodes.slice(0, 3);
const learner = (overrides: Partial<UserProfile> = {}) =>
  makeUser({
    hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: localDateKey() },
    completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...doneNodes.flatMap((node) => node.lessonIds)],
    completedNodeIds: doneNodes.map((node) => node.id),
    ...overrides
  });

async function startLesson(user: UserProfile) {
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
  const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current") as LearningNodeView;
  const session = await learningApi.getLessonSession(node.firstLessonId, user);
  await render(<TopicApp />);
  await screen.findByTestId("learn-path-foundation");
  await press(`path-node-${node.id}`);
  await press("node-card-start");
  return session;
}

/** Answers the next `count` questions right; the last one's feedback sheet is left for the caller to continue. */
async function answerRight(challenges: Challenge[], count: number) {
  for (let index = 0; index < count; index += 1) {
    if (index > 0) await press("feedback-continue");
    await toQuestion();
    const shown = questionOnScreen(challenges)!;
    expect(shown).toBeTruthy();
    await press(`choice-${shown.correctChoiceId}`);
    await press("exercise-check");
  }
}

describe("the challenge level with boost steps (older saves)", () => {
  it("goes a step up for each yes, never past the top", () => {
    const base = { streakDays: 0, completedLessonIds: [], difficulty: "auto" as const };
    expect(challengeLevel({ ...base, challengeBoost: 0 })).toBe(0);
    expect(challengeLevel({ ...base, challengeBoost: 2 })).toBe(2);
    expect(challengeLevel({ ...base, difficulty: "hard", challengeBoost: 1 })).toBe(4);
    expect(challengeLevel({ ...base, difficulty: "really_hard", challengeBoost: 3 })).toBe(5);
    expect(challengeLevel({ ...base, challengeBoost: 9 })).toBe(5);
  });
});

describe("harderQuestions", () => {
  it("gives questions the lesson does not ask yet, each with a source", async () => {
    const user = learner();
    const node = learningApi.getPathNodes(user).find((item) => item.topicId === "foundation" && item.status === "current")!;
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    const extras = harderQuestions(session.lesson, user, 1);
    expect(extras.length).toBeGreaterThan(0);
    const asked = new Set(session.lesson.challenges.map((challenge) => challenge.id));
    const prompts = new Set(session.lesson.challenges.map((challenge) => challenge.prompt));
    for (const extra of extras) {
      expect(asked.has(extra.id)).toBe(false);
      expect(prompts.has(extra.prompt)).toBe(false);
      expect(extra.resourceUrl ?? extra.source?.url).toBeTruthy();
    }
  });

  it("has nothing to add on the New to Islam path", () => {
    const intro = COURSE.sections.find((section) => section.topicId === "intro");
    const lesson = intro ? LESSONS_BY_ID[intro.nodes[0].lessonIds[0]] : undefined;
    if (lesson) expect(harderQuestions(lesson, learner(), 3)).toEqual([]);
  });
});

describe("a lesson getting harder as the learner answers", () => {
  async function playToEnd(pool: Challenge[], onTurn?: () => void) {
    const seen: string[] = [];
    for (let turn = 0; turn < 80 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      const shown = questionOnScreen(pool);
      if (!shown) break;
      seen.push(shown.id);
      await press(`choice-${shown.correctChoiceId}`);
      await press("exercise-check");
      await press("feedback-continue");
      onTurn?.();
    }
    return seen;
  }

  it(`asks "Want it harder?" after ${HARDER_OFFER_AFTER} right in a row; YES makes it harder now and keeps climbing`, async () => {
    const user = learner();
    const session = await startLesson(user);
    const extras = harderQuestions(session.lesson, user, 1);
    const pool = withHarder(session.lesson, user);
    expect(extras.length).toBeGreaterThan(0);

    await answerRight(pool, HARDER_OFFER_AFTER - 1);
    await press("feedback-continue");
    expect(offerOpen()).toBe(false);
    await answerRight(pool, 1);
    await press("feedback-continue");
    expect(offerOpen()).toBe(true);
    expect(screen.getByText(`${HARDER_OFFER_AFTER} right in a row!`)).toBeTruthy();

    await press("harder-yes");
    // The harder question comes straight away, and the next lessons start a step harder.
    await toQuestion();
    expect(extras.map((challenge) => challenge.id)).toContain(questionOnScreen(pool)?.id);
    expect(savedUser().challengeBoost).toBe(1);

    // It never asks again: later runs climb on their own.
    await playToEnd(pool, () => expect(offerOpen()).toBe(false));
    expect(screen.getByTestId("lesson-complete")).toBeTruthy();
  });

  it("stays as it is after KEEP IT AS IT IS, and does not ask again", async () => {
    const user = learner();
    const session = await startLesson(user);
    const pool = withHarder(session.lesson, user);

    await answerRight(pool, HARDER_OFFER_AFTER);
    await press("feedback-continue");
    await press("harder-no");
    expect(savedUser().challengeBoost ?? 0).toBe(0);

    const seen = await playToEnd(pool, () => expect(offerOpen()).toBe(false));
    expect(screen.getByTestId("lesson-complete")).toBeTruthy();
    // Only the lesson's own questions (and its reviews), none added.
    const own = new Set(session.lesson.challenges.map((challenge) => challenge.id));
    for (const id of seen) expect(own.has(id)).toBe(true);
  });

  it("eases off after a wrong answer: the harder questions still waiting are not asked", async () => {
    const user = learner();
    const session = await startLesson(user);
    const extras = harderQuestions(session.lesson, user, 1);
    expect(extras.length).toBeGreaterThanOrEqual(2);
    const pool = withHarder(session.lesson, user);

    await answerRight(pool, HARDER_OFFER_AFTER);
    await press("feedback-continue");
    await press("harder-yes");
    await toQuestion();
    const first = questionOnScreen(pool)!;
    expect(extras.map((challenge) => challenge.id)).toContain(first.id);
    const wrong = first.choices.find((choice) => choice.id !== first.correctChoiceId)!;
    await press(`choice-${wrong.id}`);
    await press("exercise-check");
    await press("feedback-continue");

    const waiting = extras.filter((challenge) => challenge.id !== first.id).map((challenge) => challenge.id);
    const seen = await playToEnd(pool);
    expect(screen.getByTestId("lesson-complete")).toBeTruthy();
    for (const id of waiting) expect(seen).not.toContain(id);
  });
});

describe("the Getting harder! badge", () => {
  it("pops each time the lesson steps up", async () => {
    const { rerender } = await render(<ComboBadge inARow={2} climbs={0} top={60} />);
    expect(screen.queryByTestId("harder-badge")).toBeNull();
    await rerender(<ComboBadge inARow={3} climbs={1} top={60} />);
    expect(screen.getByTestId("harder-badge")).toBeTruthy();
    expect(screen.getByText("Getting harder!")).toBeTruthy();
    await act(async () => {
      await new Promise((done) => setTimeout(done, 2100));
    });
    expect(screen.queryByTestId("harder-badge")).toBeNull();
  });
});

describe("withoutWaitingQuestions", () => {
  it("takes out only first tries still waiting", () => {
    const queue = [{ index: 0, attempt: 0 }, { index: 5, attempt: 0 }, { index: 6, attempt: 0 }, { index: 1, attempt: 0 }, { index: 6, attempt: 1 }];
    const eased = withoutWaitingQuestions(queue, 1, (index) => index >= 5);
    expect(eased.queue).toEqual([{ index: 0, attempt: 0 }, { index: 5, attempt: 0 }, { index: 1, attempt: 0 }, { index: 6, attempt: 1 }]);
    expect(eased.removed).toBe(1);
  });
});
