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

// The free server can take most of a minute to wake: its answer to "who is signed in" is held back here.
let mockAnswerSession: (session: unknown) => void = () => undefined;
const mockQueueRemoteSync = jest.fn();
jest.mock("../services/backendSync", () => {
  const actual = jest.requireActual("../services/backendSync");
  return {
    ...actual,
    hydrateRemoteSession: () => new Promise((done) => (mockAnswerSession = done)),
    queueRemoteSync: (...args: unknown[]) => mockQueueRemoteSync(...args),
    wakeBackend: jest.fn()
  };
});

import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { localDateKey } from "../api/islamicLearningApi";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import type { UserProfile } from "../types";
import { makeUser } from "./testUtils";

const PROFILE_KEY = "sira-path-user-profile";
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;

jest.setTimeout(30000);

function seed() {
  const user = makeUser({ id: 77, hasAccount: true, lastTopicId: "foundation", totalXp: 40, hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() } });
  setStoredItem(PROFILE_KEY, JSON.stringify(user));
  return user;
}

beforeEach(() => mockQueueRemoteSync.mockClear());
afterEach(() => removeStoredItem(PROFILE_KEY));

describe("opening while the server is asleep", () => {
  it("opens on the progress saved on the phone after a short wait, and sends nothing until the server's copy is in", async () => {
    const user = seed();
    await render(<TopicApp />);
    // The server never answers here, so the path showing at all means the app did not wait for it.
    await screen.findByTestId("learn-path-foundation", undefined, { timeout: 15000 });
    expect(mockQueueRemoteSync).not.toHaveBeenCalled();

    // The server's copy has lessons done on another phone: the learner has done nothing here yet, so it is used.
    await act(async () => {
      mockAnswerSession({ user: { ...user, totalXp: 990, completedLessonIds: [...user.completedLessonIds, "done-elsewhere"] }, account: undefined, socialHub: undefined });
    });
    await waitFor(() => expect(savedUser().totalXp).toBe(990));
    expect(savedUser().completedLessonIds).toContain("done-elsewhere");
    await waitFor(() => expect(mockQueueRemoteSync).toHaveBeenCalled());
  });

  it("keeps the phone's copy, and sends it, when the server cannot be reached at all", async () => {
    seed();
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation", undefined, { timeout: 15000 });
    await act(async () => {
      mockAnswerSession(null);
    });
    await waitFor(() => expect(mockQueueRemoteSync).toHaveBeenCalled());
    expect(savedUser().totalXp).toBe(40);
  });
});
