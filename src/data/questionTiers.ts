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
import { TAFSEER_TIERS_5 } from "./tiers/tafseerTiers5";
import { TAFSEER_TIERS_6 } from "./tiers/tafseerTiers6";
import { TAFSEER_TIERS_7 } from "./tiers/tafseerTiers7";
import { TAFSEER_TIERS_8 } from "./tiers/tafseerTiers8";
import { TAFSEER_TIERS_9 } from "./tiers/tafseerTiers9";
import { TAFSEER_TIERS_10 } from "./tiers/tafseerTiers10";
import { TAFSEER_TIERS_11 } from "./tiers/tafseerTiers11";
import { TAFSEER_TIERS_12 } from "./tiers/tafseerTiers12";
import { TAFSEER_TIERS_13 } from "./tiers/tafseerTiers13";
import { TAFSEER_TIERS_14 } from "./tiers/tafseerTiers14";
import { TAFSEER_TIERS_15 } from "./tiers/tafseerTiers15";
import { TAFSEER_TIERS_16 } from "./tiers/tafseerTiers16";
import { TAFSEER_TIERS_17 } from "./tiers/tafseerTiers17";
import { TAFSEER_TIERS_18 } from "./tiers/tafseerTiers18";
import { TAFSEER_TIERS_19 } from "./tiers/tafseerTiers19";
import { TAFSEER_TIERS_20 } from "./tiers/tafseerTiers20";
import { TAFSEER_TIERS_21 } from "./tiers/tafseerTiers21";
import { TAFSEER_TIERS_22 } from "./tiers/tafseerTiers22";
import { TAFSEER_TIERS_23 } from "./tiers/tafseerTiers23";
import { TAFSEER_TIERS_24 } from "./tiers/tafseerTiers24";
import { TAFSEER_TIERS_25 } from "./tiers/tafseerTiers25";
import { TAFSEER_TIERS_26 } from "./tiers/tafseerTiers26";
import { TAFSEER_TIERS_27 } from "./tiers/tafseerTiers27";
import { TAFSEER_TIERS_28 } from "./tiers/tafseerTiers28";
import { TAFSEER_TIERS_29 } from "./tiers/tafseerTiers29";
import { TAFSEER_TIERS_30 } from "./tiers/tafseerTiers30";
import { TAFSEER_TIERS_31 } from "./tiers/tafseerTiers31";
import { TAFSEER_TIERS_32 } from "./tiers/tafseerTiers32";
import { TAFSEER_TIERS_33 } from "./tiers/tafseerTiers33";
import { TAFSEER_TIERS_34 } from "./tiers/tafseerTiers34";
import { TAFSEER_TIERS_35 } from "./tiers/tafseerTiers35";
import { TAFSEER_TIERS_36 } from "./tiers/tafseerTiers36";
import { TAFSEER_TIERS_37 } from "./tiers/tafseerTiers37";
import { TAFSEER_TIERS_38 } from "./tiers/tafseerTiers38";
import { TAFSEER_TIERS_39 } from "./tiers/tafseerTiers39";
import { TAFSEER_TIERS_40 } from "./tiers/tafseerTiers40";
import { TAFSEER_TIERS_41 } from "./tiers/tafseerTiers41";
import { TAFSEER_TIERS_42 } from "./tiers/tafseerTiers42";
import { TAFSEER_TIERS_43 } from "./tiers/tafseerTiers43";
import { TAFSEER_TIERS_44 } from "./tiers/tafseerTiers44";
import { TAFSEER_TIERS_45 } from "./tiers/tafseerTiers45";
import { TAFSEER_TIERS_46 } from "./tiers/tafseerTiers46";
import { TAFSEER_TIERS_47 } from "./tiers/tafseerTiers47";
import { TAFSEER_TIERS_48 } from "./tiers/tafseerTiers48";
import { TAFSEER_TIERS_49 } from "./tiers/tafseerTiers49";
import { TAFSEER_TIERS_50 } from "./tiers/tafseerTiers50";
import { TAFSEER_TIERS_51 } from "./tiers/tafseerTiers51";
import { TAFSEER_TIERS_52 } from "./tiers/tafseerTiers52";
import { TAFSEER_TIERS_53 } from "./tiers/tafseerTiers53";
import { TAFSEER_TIERS_54 } from "./tiers/tafseerTiers54";
import { TAFSEER_TIERS_55 } from "./tiers/tafseerTiers55";
import { TAFSEER_TIERS_56 } from "./tiers/tafseerTiers56";
import { TAFSEER_TIERS_57 } from "./tiers/tafseerTiers57";
import { TAFSEER_TIERS_58 } from "./tiers/tafseerTiers58";
import { TAFSEER_TIERS_59 } from "./tiers/tafseerTiers59";
import { TAFSEER_TIERS_60 } from "./tiers/tafseerTiers60";
import { TAFSEER_TIERS_61 } from "./tiers/tafseerTiers61";
import { TAFSEER_TIERS_62 } from "./tiers/tafseerTiers62";
import { TAFSEER_TIERS_63 } from "./tiers/tafseerTiers63";
import { TAFSEER_TIERS_64 } from "./tiers/tafseerTiers64";
import { TAFSEER_TIERS_65 } from "./tiers/tafseerTiers65";
import { TAFSEER_TIERS_66 } from "./tiers/tafseerTiers66";
import { TAFSEER_TIERS_67 } from "./tiers/tafseerTiers67";

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

export const QUESTION_TIERS: Readonly<Record<string, TierEntry>> = { ...FOUNDATION_TIERS, ...FOUNDATION_TIERS_2, ...FOUNDATION_TIERS_3, ...PRAYER_TIERS, ...PRAYER_TIERS_2, ...PRAYER_TIERS_3, ...PRAYER_TIERS_4, ...FASTING_TIERS, ...ZAKAT_TIERS, ...HAJJ_TIERS, ...AQIDAH_TIERS, ...MANNERS_TIERS, ...AKHIRAH_TIERS, ...DUAS_TIERS, ...HADITH_TIERS, ...MARRIAGE_TIERS, ...EID_TIERS, ...RAMADAN_TIERS, ...INTRO_TIERS, ...WOMEN_TIERS, ...SCHOLARS_TIERS, ...PROPHETS_TIERS, ...SAHIHAYN_TIERS, ...READ_ARABIC_TIERS, ...SAHABAH_TIERS, ...TAFSEER_TIERS_1, ...TAFSEER_TIERS_2, ...TAFSEER_TIERS_3, ...TAFSEER_TIERS_4, ...TAFSEER_TIERS_5, ...TAFSEER_TIERS_6, ...TAFSEER_TIERS_7, ...TAFSEER_TIERS_8, ...TAFSEER_TIERS_9, ...TAFSEER_TIERS_10, ...TAFSEER_TIERS_11, ...TAFSEER_TIERS_12, ...TAFSEER_TIERS_13, ...TAFSEER_TIERS_14, ...TAFSEER_TIERS_15, ...TAFSEER_TIERS_16, ...TAFSEER_TIERS_17, ...TAFSEER_TIERS_18, ...TAFSEER_TIERS_19, ...TAFSEER_TIERS_20, ...TAFSEER_TIERS_21, ...TAFSEER_TIERS_22, ...TAFSEER_TIERS_23, ...TAFSEER_TIERS_24, ...TAFSEER_TIERS_25, ...TAFSEER_TIERS_26, ...TAFSEER_TIERS_27, ...TAFSEER_TIERS_28, ...TAFSEER_TIERS_29, ...TAFSEER_TIERS_30, ...TAFSEER_TIERS_31, ...TAFSEER_TIERS_32, ...TAFSEER_TIERS_33, ...TAFSEER_TIERS_34, ...TAFSEER_TIERS_35, ...TAFSEER_TIERS_36, ...TAFSEER_TIERS_37, ...TAFSEER_TIERS_38, ...TAFSEER_TIERS_39, ...TAFSEER_TIERS_40, ...TAFSEER_TIERS_41, ...TAFSEER_TIERS_42, ...TAFSEER_TIERS_43, ...TAFSEER_TIERS_44, ...TAFSEER_TIERS_45, ...TAFSEER_TIERS_46, ...TAFSEER_TIERS_47, ...TAFSEER_TIERS_48, ...TAFSEER_TIERS_49, ...TAFSEER_TIERS_50, ...TAFSEER_TIERS_51, ...TAFSEER_TIERS_52, ...TAFSEER_TIERS_53, ...TAFSEER_TIERS_54, ...TAFSEER_TIERS_55, ...TAFSEER_TIERS_56, ...TAFSEER_TIERS_57, ...TAFSEER_TIERS_58, ...TAFSEER_TIERS_59, ...TAFSEER_TIERS_60, ...TAFSEER_TIERS_61, ...TAFSEER_TIERS_62, ...TAFSEER_TIERS_63, ...TAFSEER_TIERS_64, ...TAFSEER_TIERS_65, ...TAFSEER_TIERS_66, ...TAFSEER_TIERS_67 };

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
