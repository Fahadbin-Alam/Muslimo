import type { AgeGroup } from "../services/monetizationConfig";
import type { DifficultyChoice, UserProfile } from "../types";

export type { DifficultyChoice };

// How hard lessons are, as the learner picks it in Settings. "auto" (the default) climbs on its own with the
// learner's streak, how much they have learned and how well their last lessons went; the others hold it at one level.
export const DIFFICULTY_CHOICES: DifficultyChoice[] = ["auto", "easy", "hard", "really_hard"];

/**
 * 0 (as the lesson is) to 5 (really hard). Each level asks more questions from memory, taken from lessons the
 * learner has already finished in the same topic; from level 2 a true/false question gives way to a 4-choice one,
 * and from level 3 the topic's harder questions (hardQuestions.ts) come in. Auto reaches 4 at most; only picking
 * "Really hard" gives 5.
 */
export type ChallengeLevel = 0 | 1 | 2 | 3 | 4 | 5;

/** Extra questions a lesson asks at each level. */
export const EXTRA_QUESTIONS: Record<ChallengeLevel, number> = { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 4 };
/** From this level, a lesson's true/false questions are swapped for 4-choice ones when there are some to ask. */
export const SWAP_TRUE_FALSE_FROM: ChallengeLevel = 2;
/** From this level, the topic's harder questions come in: one at 3, two at 4, three at 5. */
export const HARD_BANK_FROM: ChallengeLevel = 3;

// How far Auto may climb at each age. Young learners climb more gently and not as far; 13 and over (and anyone
// who has not said their age) get the whole climb.
const AUTO_CAP: Record<AgeGroup, ChallengeLevel> = { "6-9": 1, "10-12": 2, "13-17": 4, "18+": 4 };

// A streak of 3, 7, 14 and 30 days, and 10, 40, 100 and 250 lessons finished, each add a point.
const STREAK_STEPS = [3, 7, 14, 30];
const LESSON_STEPS = [10, 40, 100, 250];

const points = (value: number, steps: number[]) => steps.filter((step) => value >= step).length;

// How the last lessons went (their stars, 1 to 3: lessonStars) moves Auto a step: up when they were nearly all
// perfect, so a learner who gets everything right does not wait weeks for harder questions, and down when they
// were a struggle, so it eases off again. It needs a few lessons before it says anything.
/** Stars of this many of the learner's latest lessons are kept (user.recentStars). */
export const RECENT_LESSONS_KEPT = 5;
/** Fewer lessons than this, and how they went does not move the level yet. */
export const FORM_NEEDS_LESSONS = 3;
/** Average stars at or above this: one step harder. */
const FORM_UP_FROM = 2.8;
/** Average stars at or below this: one step easier. */
const FORM_DOWN_FROM = 1.6;

/** The learner's latest lesson stars with this lesson's added, the oldest dropped past RECENT_LESSONS_KEPT. */
export function withRecentStars(recent: readonly number[] | undefined, stars: number): number[] {
  const earned = Math.max(1, Math.min(3, Math.round(stars)));
  return [...(recent ?? []), earned].slice(-RECENT_LESSONS_KEPT);
}

/** +1 when the last lessons were nearly all perfect, -1 when they were a struggle, else 0. */
export function formStep(recent: readonly number[] | undefined): -1 | 0 | 1 {
  const last = (recent ?? []).slice(-RECENT_LESSONS_KEPT);
  if (last.length < FORM_NEEDS_LESSONS) return 0;
  const average = last.reduce((total, stars) => total + stars, 0) / last.length;
  if (average >= FORM_UP_FROM) return 1;
  if (average <= FORM_DOWN_FROM) return -1;
  return 0;
}

/**
 * Auto's level: half the streak points plus half the lesson points, rounded up, then a step up or down for how
 * the last lessons went (formStep), then capped for the learner's age.
 */
export function autoChallengeLevel(
  user: Pick<UserProfile, "streakDays" | "completedLessonIds"> & { recentStars?: readonly number[] },
  ageGroup?: AgeGroup | null
): ChallengeLevel {
  const score = points(user.streakDays ?? 0, STREAK_STEPS) + points(user.completedLessonIds?.length ?? 0, LESSON_STEPS);
  const level = Math.max(0, Math.ceil(score / 2) + formStep(user.recentStars));
  return Math.min(level, ageGroup ? AUTO_CAP[ageGroup] : 4) as ChallengeLevel;
}

/** The highest level there is. */
export const TOP_LEVEL: ChallengeLevel = 5;

/**
 * The level a learner's lessons are asked at: Auto's climb, or the level they picked, plus a step for each time
 * they said yes to "Want it harder?" in a lesson (user.challengeBoost), up to the top level.
 */
export function challengeLevel(
  user: Pick<UserProfile, "streakDays" | "completedLessonIds" | "difficulty" | "challengeBoost" | "recentStars">,
  ageGroup?: AgeGroup | null
): ChallengeLevel {
  const boost = Math.max(0, Math.floor(user.challengeBoost ?? 0));
  return Math.min(TOP_LEVEL, pickedLevel(user, ageGroup) + boost) as ChallengeLevel;
}

/** Every this many right first time in a row in a lesson, the lesson gets a step harder on its own. */
export const HARDER_OFFER_AFTER = 3;

/** One step harder than `level` (the top level stays where it is). */
export function nextLevel(level: ChallengeLevel): ChallengeLevel {
  return Math.min(TOP_LEVEL, level + 1) as ChallengeLevel;
}

function pickedLevel(user: Pick<UserProfile, "streakDays" | "completedLessonIds" | "difficulty" | "recentStars">, ageGroup?: AgeGroup | null): ChallengeLevel {
  switch (user.difficulty) {
    case "easy":
      return 0;
    // Hard is at least level 3, and climbs to 4 with Auto (an older learner's long streak).
    case "hard":
      return Math.max(3, autoChallengeLevel(user, null)) as ChallengeLevel;
    case "really_hard":
      return 5;
    default:
      return autoChallengeLevel(user, ageGroup);
  }
}

/**
 * The age a lesson's question mix is picked for (ageLevels.ts). "Easy" asks the youngest learners' mix (true/false
 * kept, no questions from memory) at any age; "Hard" and "Really hard" ask the full mix even for a young learner,
 * since they chose it.
 */
export function mixAgeFor(user: Pick<UserProfile, "difficulty">, ageGroup?: AgeGroup | null): AgeGroup | null | undefined {
  if (user.difficulty === "easy") return "6-9";
  if (user.difficulty === "hard" || user.difficulty === "really_hard") return null;
  return ageGroup;
}

export function isDifficultyChoice(value: unknown): value is DifficultyChoice {
  return typeof value === "string" && (DIFFICULTY_CHOICES as string[]).includes(value);
}
