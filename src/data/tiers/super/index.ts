import type { TierVersion } from "../../questionTiers";

/**
 * Super hard (level 4) versions, keyed by the question's English prompt: same answer and same source as the lesson's
 * question, a deeper detail of it (a true/false keeps the same truth). Add each topic's file here.
 */
export const SUPER_HARD_VERSIONS: Readonly<Record<string, TierVersion>> = {};
