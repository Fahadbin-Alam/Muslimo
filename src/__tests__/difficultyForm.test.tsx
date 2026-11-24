jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import React from "react";
import { render, screen } from "@testing-library/react-native";
import { completeLesson } from "../api/islamicLearningApi";
import { autoChallengeLevel, challengeLevel, formStep, RECENT_LESSONS_KEPT, withRecentStars } from "../data/challengeLevel";
import { LESSONS_BY_ID, STARTER_USER } from "../data/course";
import { kidsLearner } from "../services/kidsMode";
import { LessonComplete } from "../ui/lesson/LessonComplete";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// Fahad (2026-11-24): "make it where the difficulty of the question scales up". On Auto the streak sets the level
// (streakDifficulty.test.tsx); how well the last lessons went moves it a step: up when they were nearly all
// perfect, down when they were a struggle.

const learner = (streakDays: number, lessonsDone: number, recentStars?: number[]) => ({
  streakDays,
  completedLessonIds: Array.from({ length: lessonsDone }, (_, index) => `done-${index}`),
  recentStars
});

describe("how the last lessons went", () => {
  it("keeps the stars of the latest lessons only", () => {
    let recent: number[] | undefined;
    for (const stars of [1, 2, 3, 3, 3, 3, 3]) recent = withRecentStars(recent, stars);
    expect(recent).toEqual([3, 3, 3, 3, 3]);
    expect(recent).toHaveLength(RECENT_LESSONS_KEPT);
    // Out of range stars are held to 1..3.
    expect(withRecentStars([], 7)).toEqual([3]);
    expect(withRecentStars([], 0)).toEqual([1]);
  });

  it("says nothing until a few lessons are done", () => {
    expect(formStep(undefined)).toBe(0);
    expect(formStep([3, 3])).toBe(0);
    expect(formStep([3, 3, 3])).toBe(1);
    expect(formStep([1, 1, 2])).toBe(-1);
    expect(formStep([3, 2, 3, 2, 2])).toBe(0);
  });

  it("moves the streak's level a step either way, never with no streak", () => {
    expect(autoChallengeLevel(learner(1, 3))).toBe(0);
    expect(autoChallengeLevel(learner(1, 3, [3, 3, 3]))).toBe(1);
    expect(autoChallengeLevel(learner(5, 10, [3, 3, 3, 3, 3]))).toBe(3);
    expect(autoChallengeLevel(learner(5, 10, [1, 2, 1, 1, 2]))).toBe(1);
    // No streak: the easiest level, however well the last lessons went.
    expect(autoChallengeLevel(learner(0, 50, [3, 3, 3, 3, 3]))).toBe(0);
    // Never below the easiest level, never past the age's cap.
    expect(autoChallengeLevel(learner(1, 0, [1, 1, 1]))).toBe(0);
    expect(autoChallengeLevel(learner(60, 300, [3, 3, 3, 3, 3]), "18+")).toBe(5);
    expect(autoChallengeLevel(learner(60, 300, [3, 3, 3, 3, 3]), "6-9")).toBe(1);
  });

  it("does not move a level the learner picked", () => {
    expect(challengeLevel({ ...learner(0, 0, [3, 3, 3, 3, 3]), difficulty: "easy" })).toBe(0);
    expect(challengeLevel({ ...learner(0, 0, [1, 1, 1, 1, 1]), difficulty: "hard" })).toBe(3);
    expect(challengeLevel({ ...learner(0, 0, [1, 1, 1, 1, 1]), difficulty: "really_hard" })).toBe(5);
    // Kids mode stays at the easiest level however well it goes.
    expect(challengeLevel(kidsLearner({ ...learner(30, 250, [3, 3, 3, 3, 3]), difficulty: "auto" as const, challengeBoost: 0 }))).toBe(0);
  });

  it("is kept each time a lesson is finished, replays too", () => {
    const lesson = Object.values(LESSONS_BY_ID)[0]!;
    const once = completeLesson(STARTER_USER, lesson, 3);
    expect(once.recentStars).toEqual([3]);
    const twice = completeLesson(once, lesson, 1);
    expect(twice.recentStars).toEqual([3, 1]);
    // No stars given (an old caller): nothing is added.
    expect(completeLesson(STARTER_USER, lesson).recentStars).toBeUndefined();
  });
});

describe("the lesson complete card", () => {
  const props = {
    title: "Salah",
    xp: 10,
    stars: 3,
    streakDays: 2,
    mascotVariant: "teacher",
    accent: "#58cc02",
    onContinue: jest.fn(),
    onBackToPath: jest.fn()
  };

  it("says when the next questions get harder", async () => {
    await render(<LessonComplete {...props} harderNow />);
    expect(screen.getByTestId("complete-harder-now")).toBeTruthy();
    expect(screen.getByText("Great work! Your next questions get harder.")).toBeTruthy();
  });

  it("says nothing about it otherwise", async () => {
    await render(<LessonComplete {...props} />);
    expect(screen.queryByTestId("complete-harder-now")).toBeNull();
  });
});
