/**
 * "Hide words" in Memorize: a surah's ayahs or a dua shown in full, then with more of its words hidden each round, until
 * the learner says all of it from memory. The words to hide come in a fixed order for each surah or dua, so each round
 * hides the words the round before hid and some more. Nothing is built from tiles: the learner says it, looks, and says
 * whether they knew it.
 */

/** How much of the text each round hides: none (read it), a quarter, half, three quarters, then all of it. */
export const HIDE_ROUNDS = [0, 0.25, 0.5, 0.75, 1] as const;

function seedOf(text: string) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

/** The order the words (0 to words - 1) are hidden in: the same every time for the same seed. */
export function hideOrder(words: number, seed: string): number[] {
  const order = Array.from({ length: words }, (_, index) => index);
  let state = seedOf(seed) || 1;
  const next = () => {
    // xorshift32
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
  for (let index = words - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order;
}

/**
 * How many of the words a round hides: at least one after the first round, and all of them only in the last, so the
 * last round is always the first with nothing left to see.
 */
export function hiddenCount(words: number, round: number) {
  const at = Math.max(0, Math.min(HIDE_ROUNDS.length - 1, round));
  const share = HIDE_ROUNDS[at];
  if (share <= 0 || words <= 0) return 0;
  if (at === HIDE_ROUNDS.length - 1) return words;
  return Math.max(1, Math.min(words - 1, Math.ceil(words * share)));
}

/** The words a round hides. */
export function hiddenWords(words: number, round: number, seed: string): Set<number> {
  return new Set(hideOrder(words, seed).slice(0, hiddenCount(words, round)));
}

/** Stars for a dua said from memory: three with no "Not yet" or peek, two with one or two, one with more. */
export function hideStars(misses: number) {
  return misses <= 0 ? 3 : misses <= 2 ? 2 : 1;
}
