import type { LessonSource } from "../types";
import { quranAudioUrl } from "../services/quranAudio";
import { isArabicOnly } from "../ui/ArabicText";
import { LESSONS_BY_ID } from "./course";

// "Duas" in Memorize: duas and adhkar to learn by heart, word by word as more words hide each round. Nothing here is
// new text: each one is the Arabic a Duas lesson already quotes (copied from the collection's own text, or the Quran
// text the app shows), with that lesson's source and name. Only lessons whose quote is itself words a Muslim says are
// listed; a quote that only tells about dhikr (its reward, or a command to remember Allah) is left out, and so are
// surahs, which Memorize surahs already has.

/** The Duas lessons whose quote is a dua or dhikr to say, in the order the Duas topic teaches them. */
export const MEMORIZE_DUA_LESSONS = [
  // Morning and evening.
  "adhkar-kingdom",
  "adhkar-by-you",
  "adhkar-master",
  "adhkar-abu-bakr",
  "adhkar-well-being",
  "adhkar-no-harm",
  "adhkar-hundred-tasbih",
  "adhkar-hundred-tahlil",
  "adhkar-perfect-words",
  // Sleep and waking.
  "sleep-kursi",
  "sleep-baqarah-end",
  "sleep-bismika",
  "sleep-last-words",
  "sleep-waking",
  // Through the day.
  "day-forgot",
  "day-after-eating",
  "day-toilet",
  "day-leave-home",
  "day-mosque",
  "day-sneeze",
  "day-adhan",
  "day-after-salah",
  "day-travel",
  "day-visit-sick",
  "day-anger",
  // From the Quran.
  "quran-best",
  "quran-knowledge",
  "quran-steady",
  "quran-parents",
  "quran-family",
  "quran-musa",
  "quran-adam",
  "quran-yunus",
  // Remembering Allah.
  "dhikr-two-words",
  "dhikr-four-words",
  "dhikr-treasure",
  "dhikr-worry",
  "dhikr-distress",
  // The prophets' duas.
  "prophets-ibrahim-prayer",
  "prophets-nuh-parents",
  "prophets-ayyub-harm",
  "prophets-sulayman-thanks",
  "prophets-yusuf-righteous",
  "prophets-ibrahim-ismail-muslims",
  "prophets-ibrahim-safe-city",
  "prophets-ibrahim-righteous-child",
  "prophets-musa-save-me",
  "prophets-nuh-no-knowledge",
  "prophets-nuh-help-me",
  "prophets-nuh-judge-between",
  // The believers' duas.
  "believers-cave-mercy",
  "believers-those-before-us",
  "believers-pour-patience",
  "believers-firm-feet",
  "believers-best-of-merciful",
  "believers-we-have-believed",
  "believers-disciples-witnesses",
  "believers-not-in-vain",
  "believers-turn-hell-away",
  // The Last Day.
  "last-day-gather-for-the-day",
  "last-day-no-helpers",
  "last-day-caller-to-faith",
  "last-day-not-with-wrongdoers",
  "last-day-ibrahim-not-disgraced"
] as const;

/** Stars and review days of a dua are kept with the surahs', under this prefix. */
export const DUA_PART_PREFIX = "dua:";

export type MemorizeDua = {
  /** "dua:adhkar-master": its key for stars and review days. */
  id: string;
  lessonId: string;
  /** The lesson's name, in English (translated where it is shown). */
  title: string;
  /** The Arabic, exactly as the lesson quotes it. */
  text: string;
  /** "Sahih al-Bukhari 6306", or "Quran 2:201". */
  reference: string;
  source: LessonSource;
  /** The reciter, for a dua that is an ayah of the Quran. */
  recitation?: string;
};

let duas: MemorizeDua[] | undefined;

/** The duas to memorize, in order: only those whose lesson is in the app with an Arabic quote and a source. */
export function memorizeDuas(): MemorizeDua[] {
  if (!duas) {
    duas = MEMORIZE_DUA_LESSONS.flatMap((slug) => {
      const lessonId = `lesson-deep-dua-${slug}`;
      const lesson = LESSONS_BY_ID[lessonId];
      const quote = lesson?.quote;
      const source = lesson?.learnSource ?? lesson?.sources[0];
      if (!lesson || !quote || !isArabicOnly(quote.text) || !source) return [];
      const reference = quote.reference ?? source.reference ?? source.title;
      const recitation = /^Quran \d+:\d+$/.test(reference) ? quranAudioUrl(reference) ?? undefined : undefined;
      return [{ id: `${DUA_PART_PREFIX}${slug}`, lessonId, title: lesson.title, text: quote.text, reference, source, recitation }];
    });
  }
  return duas;
}
