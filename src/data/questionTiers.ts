import type { ChallengeLevel } from "./challengeLevel";
import type { Challenge } from "../types";
import { FOUNDATION_TIERS } from "./tiers/foundationTiers";
import { FOUNDATION_TIERS_2 } from "./tiers/foundationTiers2";
import { FOUNDATION_TIERS_3 } from "./tiers/foundationTiers3";
import { PRAYER_TIERS } from "./tiers/prayerTiers";
import { PRAYER_TIERS_2 } from "./tiers/prayerTiers2";
import { PRAYER_TIERS_3 } from "./tiers/prayerTiers3";
import { PRAYER_TIERS_4 } from "./tiers/prayerTiers4";
import { FASTING_TIERS } from "./tiers/fastingTiers";
import { ZAKAT_TIERS } from "./tiers/zakatTiers";
import { HAJJ_TIERS } from "./tiers/hajjTiers";
import { AQIDAH_TIERS } from "./tiers/aqidahTiers";
import { MANNERS_TIERS } from "./tiers/mannersTiers";
import { AKHIRAH_TIERS } from "./tiers/akhirahTiers";
import { DUAS_TIERS } from "./tiers/duasTiers";
import { HADITH_TIERS } from "./tiers/hadithTiers";
import { MARRIAGE_TIERS } from "./tiers/marriageTiers";
import { EID_TIERS } from "./tiers/eidTiers";
import { RAMADAN_TIERS } from "./tiers/ramadanTiers";
import { INTRO_TIERS } from "./tiers/introTiers";
import { WOMEN_TIERS } from "./tiers/womenTiers";
import { SCHOLARS_TIERS } from "./tiers/scholarsTiers";
import { PROPHETS_TIERS } from "./tiers/prophetsTiers";
import { SAHIHAYN_TIERS } from "./tiers/sahihaynTiers";
import { READ_ARABIC_TIERS } from "./tiers/readArabicTiers";
import { SAHABAH_TIERS } from "./tiers/sahabahTiers";
import { TAFSEER_TIERS_1 } from "./tiers/tafseerTiers1";
import { TAFSEER_TIERS_2 } from "./tiers/tafseerTiers2";
import { TAFSEER_TIERS_3 } from "./tiers/tafseerTiers3";
import { TAFSEER_TIERS_4 } from "./tiers/tafseerTiers4";

/**
 * Harder ways to ask the same question (Fahad, 2026-11-24: "for the same answer, rewrite it in a harder way", a few
 * levels for every category). Each question can have three tiers:
 *   1 Normal: the question as the lesson has it.
 *   2 Harder: the same fact, worded more tightly, with wrong answers close to the right one.
 *   3 Expert: the detail of the same source (who, when, how many, the exact words), still the same answer.
 * The right answer and the source never change, so a tier only asks what its lesson's source already says.
 * A true/false question's tiers are harder statements with the same truth (True stays True).
 *
 * Tiers are written in batches by hand (src/data/tiers/*), keyed by the question's English prompt and checked
 * against its answer, so a review copy of a question gets the same tiers. Every tier's words are in the bn/ur/ar
 * content catalogs (questionTiers.test.ts).
 */
export type Tier = 1 | 2 | 3;

/** A 4-choice tier: its prompt and three wrong answers. A true/false tier: just its statement. */
export type TierVersion = string | readonly [prompt: string, wrong1: string, wrong2: string, wrong3: string];

export type TierEntry = {
  /** The question's right answer, as its lesson has it ("True"/"False" for a true/false question). */
  answer: string;
  harder?: TierVersion;
  expert?: TierVersion;
};

export const QUESTION_TIERS: Readonly<Record<string, TierEntry>> = { ...FOUNDATION_TIERS, ...FOUNDATION_TIERS_2, ...FOUNDATION_TIERS_3, ...PRAYER_TIERS, ...PRAYER_TIERS_2, ...PRAYER_TIERS_3, ...PRAYER_TIERS_4, ...FASTING_TIERS, ...ZAKAT_TIERS, ...HAJJ_TIERS, ...AQIDAH_TIERS, ...MANNERS_TIERS, ...AKHIRAH_TIERS, ...DUAS_TIERS, ...HADITH_TIERS, ...MARRIAGE_TIERS, ...EID_TIERS, ...RAMADAN_TIERS, ...INTRO_TIERS, ...WOMEN_TIERS, ...SCHOLARS_TIERS, ...PROPHETS_TIERS, ...SAHIHAYN_TIERS, ...READ_ARABIC_TIERS, ...SAHABAH_TIERS, ...TAFSEER_TIERS_1, ...TAFSEER_TIERS_2, ...TAFSEER_TIERS_3, ...TAFSEER_TIERS_4 };

/** The tier a challenge level asks: Normal up to 1, Harder at 2 and 3, Expert at 4 and 5. */
export function tierForLevel(level: number): Tier {
  if (level >= 4) return 3;
  if (level >= 2) return 2;
  return 1;
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) result = (Math.imul(result, 31) + value.charCodeAt(index)) | 0;
  return Math.abs(result);
}

/** The base question a tiered one was made from (itself when it is not tiered). */
export function baseOf(challenge: Challenge): Challenge {
  return challenge.tierBase ?? challenge;
}

/** The tier a question is asked at now: 1 for the lesson's own wording. */
export function tierOf(challenge: Challenge): Tier {
  return challenge.tier ?? 1;
}

/** True when the question has a harder way to ask it. */
export function hasTiers(challenge: Challenge) {
  const base = baseOf(challenge);
  const entry = QUESTION_TIERS[base.prompt];
  return Boolean(entry && entry.answer === answerOf(base) && (entry.harder || entry.expert));
}

function answerOf(challenge: Challenge) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
}

/**
 * The question asked at `tier` (or the nearest easier tier it has): same id root, same answer, same source and Why.
 * A question with no tiers, or one whose answer is not the tier's, stays as it is.
 */
export function atTier(challenge: Challenge, tier: Tier): Challenge {
  const base = baseOf(challenge);
  if (tier === 1) return base;
  const entry = QUESTION_TIERS[base.prompt];
  const answer = answerOf(base);
  if (!entry || entry.answer !== answer || !answer) return base;
  const version = tier === 3 ? entry.expert ?? entry.harder : entry.harder;
  const used: Tier = tier === 3 && entry.expert ? 3 : 2;
  if (!version) return base;

  if (typeof version === "string") {
    // True/false: the harder statement, the same True/False answer.
    if (base.type !== "true_false") return base;
    return { ...base, id: `${base.id}_t${used}`, prompt: version, tier: used, tierBase: base };
  }

  const [prompt, ...wrong] = version;
  const labels = [...wrong];
  labels.splice(hash(`${base.id}:${used}`) % 4, 0, answer);
  const choices = labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label }));
  return {
    ...base,
    id: `${base.id}_t${used}`,
    type: "multiple_choice",
    prompt,
    choices,
    correctChoiceId: choices[labels.indexOf(answer)].id,
    tier: used,
    tierBase: base
  };
}

/** Every question of a lesson at `tier` (those with no tiers stay as they are). */
export function challengesAtTier(challenges: Challenge[], tier: Tier): Challenge[] {
  return challenges.map((challenge) => atTier(challenge, tier));
}

/** The tier a lesson is asked at for a learner at `level`. */
export function lessonTier(level: ChallengeLevel): Tier {
  return tierForLevel(level);
}
