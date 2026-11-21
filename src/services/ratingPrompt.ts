import { getStoredItem, setStoredItem } from "./appStorage";
import { openStoreReview } from "./storeReview";

// Asks a learner who is enjoying the app to rate it, with Google's and Apple's own rating box (never our own screen).
// It asks only at a good moment: back from a lesson done well, a few days into a streak, with no ad or plans offer on
// that lesson. Never in kids mode. At most three times ever, and at least 60 days apart. The stores add their own
// limits on top and may show nothing at all, so the app never says a box is coming.

export const RATING_MIN_STREAK = 3;
export const RATING_MIN_LESSONS = 5;
export const RATING_MIN_ACCURACY = 80;
export const RATING_MAX_ASKS = 3;
export const RATING_GAP_MS = 60 * 24 * 60 * 60 * 1000;

const ASKS_KEY = "sira-path-rating-asks";

export type RatingMoment = {
  streakDays: number;
  lessonsDone: number;
  /** Share of the lesson's questions right on their first try, 0..100. */
  accuracy?: number;
  kidsMode: boolean;
  now: number;
  /** When the app asked before (ms), oldest first. */
  asks: number[];
};

export function shouldAskForRating(moment: RatingMoment): boolean {
  if (moment.kidsMode) return false;
  if (moment.streakDays < RATING_MIN_STREAK || moment.lessonsDone < RATING_MIN_LESSONS) return false;
  if ((moment.accuracy ?? 0) < RATING_MIN_ACCURACY) return false;
  if (moment.asks.length >= RATING_MAX_ASKS) return false;
  const last = moment.asks[moment.asks.length - 1];
  return last === undefined || moment.now - last >= RATING_GAP_MS;
}

export function ratingAsks(): number[] {
  try {
    const saved = JSON.parse(getStoredItem(ASKS_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((at): at is number => typeof at === "number") : [];
  } catch {
    return [];
  }
}

/** Opens the store's rating box when the moment is right. True when the store was asked to show it. */
export async function maybeAskForRating(moment: Omit<RatingMoment, "asks" | "now">, now = Date.now()): Promise<boolean> {
  const asks = ratingAsks();
  if (!shouldAskForRating({ ...moment, asks, now })) return false;
  const asked = await openStoreReview();
  if (asked) setStoredItem(ASKS_KEY, JSON.stringify([...asks, now]));
  return asked;
}
