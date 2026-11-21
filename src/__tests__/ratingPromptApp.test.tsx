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
const mockOpenStoreReview = jest.fn(async () => true);
jest.mock("../services/storeReview", () => ({ openStoreReview: () => mockOpenStoreReview() }));

import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { shiftDateKey } from "../services/familyCode";
import type { LearningNodeView, UserProfile } from "../types";
import { finishLessonRight } from "./lessonDriver";
import { leaveComplete, makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

jest.setTimeout(30000);

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

async function playNextLessonRight() {
  const node = learningApi.getPathNodes(savedUser()).find((item) => item.topicId === "foundation" && item.status !== "locked" && item.status !== "completed") as LearningNodeView;
  const session = await learningApi.getLessonSession(node.firstLessonId, savedUser());
  await press(`path-node-${node.id}`);
  await press("node-card-start");
  await finishLessonRight(session.lesson.challenges);
  expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
}

function seed(overrides: Partial<UserProfile>) {
  const today = localDateKey();
  setStoredItem(
    PROFILE_KEY,
    JSON.stringify(
      makeUser({
        lastTopicId: "foundation",
        streakDays: 4,
        lastStreakDate: shiftDateKey(today, -1),
        completedLessonIds: ["a", "b", "c", "d", "e"],
        hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: today },
        ...overrides
      })
    )
  );
}

beforeEach(() => {
  mockOpenStoreReview.mockClear();
  // The plans were just offered, so this lesson's break is free for the rating box.
  setStoredItem("sira-path-plan-offer-at", String(Date.now()));
  setStoredItem("sira-path-rating-asks", "[]");
});

afterEach(() => {
  removeStoredItem(PROFILE_KEY);
});

describe("the rating box in the app", () => {
  it("opens once, back on the path after a lesson done well a few days into a streak", async () => {
    seed({});
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await playNextLessonRight();
    expect(mockOpenStoreReview).not.toHaveBeenCalled();
    await leaveComplete("complete-back");
    await waitFor(() => expect(mockOpenStoreReview).toHaveBeenCalledTimes(1), { timeout: 3000 });
    expect(JSON.parse(getStoredItem("sira-path-rating-asks") ?? "[]")).toHaveLength(1);
  });

  it("does not open for a learner just starting out", async () => {
    seed({ streakDays: 0, lastStreakDate: undefined, completedLessonIds: [] });
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    await playNextLessonRight();
    await leaveComplete("complete-back");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    });
    expect(mockOpenStoreReview).not.toHaveBeenCalled();
  });
});
