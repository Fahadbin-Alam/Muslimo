import type { TierVersion } from "../../questionTiers";
import { FOUNDATION_EXPERT } from "./foundationExpert";
import { PRAYER_EXPERT } from "./prayerExpert";

/**
 * Expert versions (tier 3), written after the Harder ones: keyed by the same English prompt, they ask the same answer
 * from a deeper detail of the same source. A 4-choice version is [prompt, w1, w2, w3]; a true/false one a statement
 * with the same truth. Each file is one topic batch.
 */
export const EXPERT_VERSIONS: Readonly<Record<string, TierVersion>> = { ...FOUNDATION_EXPERT, ...PRAYER_EXPERT };
