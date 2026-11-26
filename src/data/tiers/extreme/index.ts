import type { TierVersion } from "../../questionTiers";

/**
 * Extremely hard (level 5) versions, keyed by the question's English prompt: same answer and same source as the
 * lesson's question, its deepest detail (a true/false keeps the same truth). Add each topic's file here.
 */
export const EXTREME_VERSIONS: Readonly<Record<string, TierVersion>> = {};
