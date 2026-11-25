import { QURAN_AYAHS } from "../data/quranAyahs";
import { parseQuranReference, reciterAyahUrl } from "./quranAudio";

/**
 * How a learn card's Arabic word is said aloud:
 * - a word that is a whole ayah, or part of the ayah its card cites, plays the reciter (see quranAudio.ts);
 * - any other word is not said at all: no machine voice ever says Arabic (see findArabicVoice).
 */

/** Letters only: no vowel marks, Quran stop signs, tatweel or alifs, and one form of alif/ya/ta marbuta. */
export function arabicLetters(text: string) {
  return text
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, "")
    .replace(/[ٱأإآا]/g, "")
    .replace(/[ىی]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

const AYAH_BY_LETTERS = new Map(
  Object.keys(QURAN_AYAHS).map((key) => {
    const [surah, ayah] = key.split(":").map(Number);
    return [arabicLetters(QURAN_AYAHS[key]), { surah, ayah }] as const;
  })
);

const recitationUrl = (key: { surah: number; ayah: number }) => reciterAyahUrl(key);

/**
 * The recitation for a learn card's Arabic word, or null:
 * - a word that is exactly one whole ayah (Al-hamdu lillahi rabbil-alamin) plays that ayah;
 * - a word taken from the one ayah the card cites (As-sirat al-mustaqim from "Quran 1:6") plays that ayah,
 *   but only when the word really is in it, so a word that merely cites an ayah never plays the wrong verse.
 */
export function recitationForArabic(text: string, references: Array<string | undefined> = []) {
  const letters = arabicLetters(text);
  const whole = AYAH_BY_LETTERS.get(letters);
  if (whole) {
    return recitationUrl(whole);
  }
  for (const reference of references) {
    const key = parseQuranReference(reference);
    const ayah = key ? QURAN_AYAHS[`${key.surah}:${key.ayah}`] : undefined;
    if (key && ayah && letters.length > 0 && arabicLetters(ayah).includes(letters)) {
      return recitationUrl(key);
    }
  }
  return null;
}

/**
 * The phone's own Arabic voice is never used. A machine voice guesses the vowels and case endings that Arabic
 * writing leaves out, so it says Quran words, duas and hadith with grammar mistakes a native speaker hears at once.
 * Religious words must be said exactly right: the reciter says the ones that are from the Quran (above), and the
 * rest have no speaker button. Always null, so every Arabic Listen button stays hidden unless a reciter has it.
 */
export function findArabicVoice(): Promise<string | null> {
  return Promise.resolve(null);
}

/** Tests only. */
export function resetArabicVoiceForTests() {
  // Nothing is kept any more.
}
