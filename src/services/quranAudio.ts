import { useSyncExternalStore } from "react";

/**
 * Recitation audio for the ayahs that learn cards show, one ayah at a time, so a learner can listen
 * and repeat it to memorize.
 *
 * Default reciter: Mishary Rashid Alafasy (murattal, 128 kbps), streamed from the Islamic Network audio CDN
 * (https://alquran.cloud, files from https://everyayah.com), and saved on the phone for offline (offlineAudio.ts).
 * Its words light up while he recites (ayahWords.ts has his timings), so the recite and memorize questions
 * always use him.
 *
 * The other reciters a learner can pick in Settings come from Quran Foundation (https://quran.foundation). Its
 * developer terms (https://api-docs.quran.foundation/legal/developer-terms/, 2.2) allow an app with ads, as long
 * as the app credits Quran Foundation and the reciter and does not rehost the files or keep them more than a
 * week (offline copies need their Content Sync, which needs our backend). So these reciters only stream: with
 * no internet, an ayah plays from the saved Alafasy copy instead. Reciters whose audio terms are unclear for an
 * app with ads (e.g. files only on quranicaudio.com, which says "not for commercial purposes") are left out.
 * A file is only fetched when the learner taps Listen, and no learner data is sent with it.
 */
export type ReciterId = "alafasy" | "abdulbasit" | "sudais" | "minshawi" | "shuraym" | "shatri" | "rifai";

export type Reciter = {
  id: ReciterId;
  /** The reciter's name in English; the bn/ur/ar names are in the ui translations. */
  name: string;
  /** Who serves the audio, shown with the reciter's name. */
  credit: string;
  /** {n} is the ayah's number counted through the whole Quran, 1 to 6236; {sss}{aaa} are surah and ayah, 3 digits. */
  urlTemplate: string;
  /** True when its recitations may be kept on the phone (offlineAudio.ts saves only these). */
  savesOffline: boolean;
};

/** Each reciter's name in English, translated where it is shown (t(reciter.name); scripts/i18n/ui-strings.cjs reads it). */
export const RECITER_NAMES: Record<ReciterId, string> = {
  alafasy: "Mishary Alafasy",
  abdulbasit: "Abdul Basit Abdus-Samad",
  sudais: "Abdur-Rahman as-Sudais",
  minshawi: "Muhammad Siddiq al-Minshawi",
  shuraym: "Saud ash-Shuraym",
  shatri: "Abu Bakr ash-Shatri",
  rifai: "Hani ar-Rifai"
};

const QURAN_FOUNDATION = "Quran Foundation";
const qf = (path: string) => `https://verses.quran.com/${path}/{sss}{aaa}.mp3`;

export const RECITERS: readonly Reciter[] = [
  {
    id: "alafasy",
    name: RECITER_NAMES.alafasy,
    credit: "Islamic Network",
    urlTemplate: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/{n}.mp3",
    savesOffline: true
  },
  { id: "abdulbasit", name: RECITER_NAMES.abdulbasit, credit: QURAN_FOUNDATION, urlTemplate: qf("AbdulBaset/Murattal/mp3"), savesOffline: false },
  { id: "sudais", name: RECITER_NAMES.sudais, credit: QURAN_FOUNDATION, urlTemplate: qf("Sudais/mp3"), savesOffline: false },
  { id: "minshawi", name: RECITER_NAMES.minshawi, credit: QURAN_FOUNDATION, urlTemplate: qf("Minshawi/Murattal/mp3"), savesOffline: false },
  { id: "shuraym", name: RECITER_NAMES.shuraym, credit: QURAN_FOUNDATION, urlTemplate: qf("Shuraym/mp3"), savesOffline: false },
  { id: "shatri", name: RECITER_NAMES.shatri, credit: QURAN_FOUNDATION, urlTemplate: qf("Shatri/mp3"), savesOffline: false },
  { id: "rifai", name: RECITER_NAMES.rifai, credit: QURAN_FOUNDATION, urlTemplate: qf("Rifai/mp3"), savesOffline: false }
];

export const DEFAULT_RECITER: ReciterId = "alafasy";
/** The reciter whose word timings ayahWords.ts has: recite and memorize questions always use him. */
export const TIMED_RECITER: ReciterId = "alafasy";

export function reciterById(id: ReciterId): Reciter {
  return RECITERS.find((reciter) => reciter.id === id) ?? RECITERS[0];
}

/** The default reciter's source, which is also the one saved for offline. */
export const QURAN_AUDIO_SOURCE = {
  reciter: RECITER_NAMES.alafasy,
  credit: RECITERS[0].credit,
  urlTemplate: RECITERS[0].urlTemplate,
  /** Where offlineAudio.ts keeps the saved copies; a new source gets a new folder. */
  offlineFolder: "quran-audio-alafasy-128"
} as const;

// The reciter picked in Settings, kept on this phone only (like the path scenery).
const RECITER_KEY = "sira-path-quran-reciter" as const;
const reciterListeners = new Set<() => void>();
let reciterMemory: ReciterId = DEFAULT_RECITER;

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

export function getReciterId(): ReciterId {
  let stored: string | null | undefined;
  try {
    stored = storage()?.getStoredItem(RECITER_KEY);
  } catch {
    stored = undefined;
  }
  const value = stored || reciterMemory;
  return RECITERS.some((reciter) => reciter.id === value) ? (value as ReciterId) : DEFAULT_RECITER;
}

export function setReciterId(id: ReciterId) {
  reciterMemory = id;
  try {
    storage()?.setStoredItem(RECITER_KEY, id);
  } catch {
    // Kept in memory for this run.
  }
  reciterListeners.forEach((listener) => listener());
}

function subscribeReciter(listener: () => void) {
  reciterListeners.add(listener);
  return () => {
    reciterListeners.delete(listener);
  };
}

export function useReciterId(): ReciterId {
  return useSyncExternalStore(subscribeReciter, getReciterId, getReciterId);
}

/** Tests only: back to the default reciter. */
export function resetReciterForTests() {
  reciterMemory = DEFAULT_RECITER;
  try {
    storage()?.setStoredItem(RECITER_KEY, "");
  } catch {
    // No storage in this test.
  }
}

/** Ayahs in each surah (Hafs 'an 'Asim, the count in the Madinah mushaf), surah 1 first. */
export const SURAH_AYAH_COUNTS: readonly number[] = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69,
  60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11,
  11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19,
  5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

const SURAH_START: number[] = SURAH_AYAH_COUNTS.reduce<number[]>((starts, _count, index) => {
  starts.push(index === 0 ? 0 : starts[index - 1] + SURAH_AYAH_COUNTS[index - 1]);
  return starts;
}, []);

export type AyahKey = { surah: number; ayah: number };

/** "Quran 67:2" gives { surah: 67, ayah: 2 }. A range ("Quran 6:84-86") or anything else gives null. */
export function parseQuranReference(reference?: string): AyahKey | null {
  const match = reference?.trim().match(/^Quran\s+(\d{1,3}):(\d{1,3})$/i);
  if (!match) {
    return null;
  }
  const surah = Number(match[1]);
  const ayah = Number(match[2]);
  if (surah < 1 || surah > SURAH_AYAH_COUNTS.length || ayah < 1 || ayah > SURAH_AYAH_COUNTS[surah - 1]) {
    return null;
  }
  return { surah, ayah };
}

/** The ayah's number counted through the whole Quran: 1:1 is 1, 67:1 is 5242, 114:6 is 6236. */
export function globalAyahNumber({ surah, ayah }: AyahKey) {
  return SURAH_START[surah - 1] + ayah;
}

const pad3 = (value: number) => String(value).padStart(3, "0");

/** The url of one ayah ({ surah, ayah }) in the reciter's recordings. */
export function reciterAyahUrl(key: AyahKey, reciter: ReciterId = getReciterId()) {
  return reciterById(reciter)
    .urlTemplate.replace("{n}", String(globalAyahNumber(key)))
    .replace("{sss}", pad3(key.surah))
    .replace("{aaa}", pad3(key.ayah));
}

/**
 * The recitation of one ayah, or null when the reference is not exactly one ayah. It is the reciter picked in
 * Settings unless `reciter` says which (TIMED_RECITER for questions that follow the words).
 */
export function quranAudioUrl(reference?: string, reciter?: ReciterId) {
  const key = parseQuranReference(reference);
  return key ? reciterAyahUrl(key, reciter) : null;
}

/** Which reciter and ayah a recitation url is, or null for a url none of them makes. */
export function recitationOfUrl(url?: string | null): { reciter: Reciter; key: AyahKey } | null {
  if (!url) return null;
  for (const reciter of RECITERS) {
    const start = reciter.urlTemplate.indexOf("{");
    const prefix = reciter.urlTemplate.slice(0, start);
    const suffix = reciter.urlTemplate.slice(reciter.urlTemplate.lastIndexOf("}") + 1);
    if (!url.startsWith(prefix) || !url.endsWith(suffix)) continue;
    const digits = url.slice(prefix.length, url.length - suffix.length);
    let key: AyahKey | null = null;
    if (reciter.urlTemplate.includes("{n}") && /^\d{1,4}$/.test(digits)) {
      const n = Number(digits);
      const index = SURAH_START.findIndex((first, surah) => n > first && n <= first + SURAH_AYAH_COUNTS[surah]);
      key = index >= 0 ? { surah: index + 1, ayah: n - SURAH_START[index] } : null;
    } else if (reciter.urlTemplate.includes("{sss}{aaa}") && /^\d{6}$/.test(digits)) {
      key = parseQuranReference(`Quran ${Number(digits.slice(0, 3))}:${Number(digits.slice(3))}`);
    }
    return key ? { reciter, key } : null;
  }
  return null;
}

/** True when the url is a recording whose words have timings (ayahWords.ts), so they can light up. */
export function isTimedRecitation(url?: string | null) {
  return recitationOfUrl(url)?.reciter.id === TIMED_RECITER;
}
