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
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { getStoredItem, removeStoredItem, setStoredItem } from "../services/appStorage";
import { makeUser } from "./testUtils";

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

// Fahad (2026-11-17): at the very start, people can sign in with an account. It stays optional.
describe("welcome: sign in at the start", () => {
  beforeEach(() => {
    removeStoredItem("sira-path-user-profile");
    removeStoredItem("sira-path-welcome-done");
    removeStoredItem("sira-path-age-group");
  });

  it("comes right after the language, before the age, and Log in opens the log in form", async () => {
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation", {}, { timeout: 5000 });
    expect(screen.queryByTestId("welcome-sheet")).toBeNull();

    await press("language-save");
    expect(screen.getByTestId("welcome-sheet")).toBeTruthy();
    expect(screen.queryByTestId("age-sheet")).toBeNull();

    await press("welcome-log-in");
    expect(screen.queryByTestId("welcome-sheet")).toBeNull();
    expect(screen.getByTestId("account-sheet")).toBeTruthy();
    expect(screen.getByTestId("account-mode-login")).toBeTruthy();
    expect(screen.queryByTestId("account-name")).toBeNull();
    expect(getStoredItem("sira-path-welcome-done")).toBe("1");
  });

  it("is not shown to someone who has done lessons already", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en", hasAccount: false })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation", {}, { timeout: 5000 });
    expect(screen.queryByTestId("welcome-sheet")).toBeNull();
  });

  it("can be skipped, and is not asked again", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en", hasAccount: false, completedLessonIds: [] })));
    const first = await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation", {}, { timeout: 5000 });
    await press("welcome-skip");
    await waitFor(() => expect(screen.queryByTestId("welcome-sheet")).toBeNull());
    expect(screen.queryByTestId("account-sheet")).toBeNull();
    // Skipping goes straight on to the age question.
    expect(screen.getByTestId("age-sheet")).toBeTruthy();
    first.unmount();

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation", {}, { timeout: 5000 });
    expect(screen.queryByTestId("welcome-sheet")).toBeNull();
  });
});
