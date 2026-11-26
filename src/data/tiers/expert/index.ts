import type { TierVersion } from "../../questionTiers";
import { FOUNDATION_EXPERT } from "./foundationExpert";
import { PRAYER_EXPERT } from "./prayerExpert";
import { RAMADAN_EXPERT } from "./ramadanExpert";
import { FASTING_EXPERT } from "./fastingExpert";
import { EID_EXPERT } from "./eidExpert";
import { READ_ARABIC_EXPERT } from "./readArabicExpert";
import { ZAKAT_EXPERT } from "./zakatExpert";
import { HAJJ_EXPERT } from "./hajjExpert";
import { INTRO_EXPERT } from "./introExpert";
import { WOMEN_EXPERT } from "./womenExpert";
import { MARRIAGE_EXPERT } from "./marriageExpert";
import { HADITH_EXPERT } from "./hadithExpert";
import { AQIDAH_EXPERT } from "./aqidahExpert";
import { DUAS_EXPERT } from "./duasExpert";
import { AKHIRAH_EXPERT } from "./akhirahExpert";
import { SCHOLARS_EXPERT } from "./scholarsExpert";
import { MANNERS_EXPERT } from "./mannersExpert";
import { PROPHETS_EXPERT } from "./prophetsExpert";

/**
 * Expert versions (tier 3), written after the Harder ones: keyed by the same English prompt, they ask the same answer
 * from a deeper detail of the same source. A 4-choice version is [prompt, w1, w2, w3]; a true/false one a statement
 * with the same truth. Each file is one topic batch.
 */
export const EXPERT_VERSIONS: Readonly<Record<string, TierVersion>> = {
  ...FOUNDATION_EXPERT,
  ...PRAYER_EXPERT,
  ...RAMADAN_EXPERT,
  ...FASTING_EXPERT,
  ...EID_EXPERT,
  ...READ_ARABIC_EXPERT,
  ...ZAKAT_EXPERT,
  ...HAJJ_EXPERT,
  ...INTRO_EXPERT,
  ...WOMEN_EXPERT,
  ...MARRIAGE_EXPERT,
  ...HADITH_EXPERT,
  ...AQIDAH_EXPERT,
  ...DUAS_EXPERT,
  ...AKHIRAH_EXPERT,
  ...SCHOLARS_EXPERT,
  ...MANNERS_EXPERT,
  ...PROPHETS_EXPERT,
};
