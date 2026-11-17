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
jest.mock("../services/voiceSettings", () => ({ canOpenVoiceSettings: true, openVoiceSettings: jest.fn(async () => undefined) }));
let mockShowHelp: ((trouble: "silent", language: "en") => void) | null = null;
jest.mock("../services/teacherVoice", () => ({
  ...jest.requireActual("../services/teacherVoice"),
  setVoiceHelp: (show: typeof mockShowHelp) => {
    mockShowHelp = show;
  }
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { setStoredItem } from "../services/appStorage";
import { openVoiceSettings } from "../services/voiceSettings";
import { makeUser } from "./testUtils";

const ALL = { includeHiddenElements: true };

describe("a speaker that cannot speak on this phone", () => {
  it("says why and opens the phone's voice settings", async () => {
    setStoredItem("sira-path-user-profile", JSON.stringify(makeUser({ preferredLanguage: "en" })));
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-foundation");
    expect(mockShowHelp).toBeTruthy();
    await act(async () => {
      mockShowHelp?.("silent", "en");
    });
    expect(screen.getByText("The voice did not start", ALL)).toBeTruthy();
    await act(async () => {
      fireEvent.press(screen.getByTestId("confirm-sheet-confirm"));
    });
    expect(openVoiceSettings).toHaveBeenCalledTimes(1);
  });
});
