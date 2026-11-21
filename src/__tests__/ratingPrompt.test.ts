jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { setStoredItem, getStoredItem } from "../services/appStorage";
import { maybeAskForRating, RATING_GAP_MS, shouldAskForRating, type RatingMoment } from "../services/ratingPrompt";

const mockOpen = jest.fn(async () => true);
jest.mock("../services/storeReview", () => ({ openStoreReview: () => mockOpen() }));

const good: RatingMoment = { streakDays: 3, lessonsDone: 5, accuracy: 90, kidsMode: false, now: 1_000_000_000_000, asks: [] };

describe("asking for a rating", () => {
  beforeEach(() => {
    mockOpen.mockClear();
    setStoredItem("sira-path-rating-asks", "[]");
  });

  it("asks a learner a few days into a streak, back from a lesson done well", () => {
    expect(shouldAskForRating(good)).toBe(true);
  });

  it("never asks in kids mode, too early, or after a hard lesson", () => {
    expect(shouldAskForRating({ ...good, kidsMode: true })).toBe(false);
    expect(shouldAskForRating({ ...good, streakDays: 2 })).toBe(false);
    expect(shouldAskForRating({ ...good, lessonsDone: 4 })).toBe(false);
    expect(shouldAskForRating({ ...good, accuracy: 70 })).toBe(false);
    expect(shouldAskForRating({ ...good, accuracy: undefined })).toBe(false);
  });

  it("waits 60 days between asks and stops after three", () => {
    expect(shouldAskForRating({ ...good, asks: [good.now - RATING_GAP_MS + 1] })).toBe(false);
    expect(shouldAskForRating({ ...good, asks: [good.now - RATING_GAP_MS] })).toBe(true);
    expect(shouldAskForRating({ ...good, asks: [1, 2, 3] })).toBe(false);
  });

  it("opens the store's box once and remembers it", async () => {
    const { asks, now, ...moment } = good;
    await expect(maybeAskForRating(moment, now)).resolves.toBe(true);
    await expect(maybeAskForRating(moment, now + 1000)).resolves.toBe(false);
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(JSON.parse(getStoredItem("sira-path-rating-asks") ?? "[]")).toEqual([now]);
    expect(asks).toEqual([]);
  });

  it("does not count an ask the store could not show", async () => {
    mockOpen.mockResolvedValueOnce(false);
    const { asks: _asks, now, ...moment } = good;
    await expect(maybeAskForRating(moment, now)).resolves.toBe(false);
    expect(getStoredItem("sira-path-rating-asks")).toBe("[]");
  });
});
