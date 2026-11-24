import { LANGUAGE_OPTIONS, t } from "../i18n";
import { ensureLanguage, isLanguageReady } from "../translations";
import type { Lesson, LessonSource, LearningSection, SupportedLanguage, TopicId } from "../types";
import { foldSearchText } from "./topicSearch";

// The search's second half: what lessons TEACH, not what they are called. Every hadith a lesson quotes (found by its
// words, or by its book and number: "Bukhari 5090", "مسلم 2626", "বুখারী ৫০৯০") and every ayah and meaning a
// lesson explains (found by its words, or by "2:255"). The topic search (topicSearch.ts) finds the names.
//
// Over 7,000 lessons quote something, so the words are read a few hundred lessons at a time, after the search is
// first opened, and never at startup. Book-and-number lookups are ready at once.

export type ContentHit = {
  kind: "hadith" | "ayah";
  /** This hit's own key: a lesson can teach both an ayah and its meaning. */
  id: string;
  /** The lesson that teaches it. */
  lessonId: string;
  topicId: TopicId;
  unitId: string;
  nodeId: string;
  /** English; the screen shows them in the learner's language. */
  lessonTitle: string;
  unitTitle?: string;
  reference: string;
  text: string;
  /** An ayah quoted in Arabic: what it means, in English. */
  meaning?: string;
  from?: string;
  grade?: string;
  /** Where the words are from, to open at them. */
  source?: Pick<LessonSource, "url" | "highlight" | "summary">;
};

type Entry = ContentHit & {
  rank: number;
  /** Book and number keys ("bukhari 5090"). */
  refKeys: string[];
  /** Ayah spans this entry covers: surah, first and last ayah (0 to 0 for a whole surah). */
  spans: [number, number, number][];
};

/** Rest between reading steps: about one frame. */
const STEP_REST_MS = 16;

const LANGUAGES = LANGUAGE_OPTIONS.map((option) => option.id) as SupportedLanguage[];

/** The hadith books lessons cite, by what people type: English spellings, then Arabic, Urdu and Bengali. */
const BOOKS: Record<string, string[]> = {
  bukhari: ["sahih al bukhari", "sahih bukhari", "bukhari", "bukhary", "bokhari", "البخاري", "بخاري", "بخاری", "বুখারি", "বুখারী"],
  muslim: ["sahih muslim", "muslim", "مسلم", "মুসলিম"],
  tirmidhi: ["jami at tirmidhi", "jami tirmidhi", "sunan tirmidhi", "tirmidhi", "tirmizi", "tirmithi", "الترمذي", "ترمذي", "ترمذی", "তিরমিজি", "তিরমিযী", "তিরমিযি"],
  abudawud: ["sunan abi dawud", "sunan abu dawud", "abi dawud", "abu dawud", "abu dawood", "abudawud", "abu daud", "ابي داود", "ابو داود", "ابوداود", "آبو داؤد", "ابو داؤد", "আবু দাউদ"],
  ibnmajah: ["sunan ibn majah", "ibn majah", "ibn maja", "ibne majah", "ابن ماجه", "ابن ماجہ", "ইবনে মাজাহ", "ইবনু মাজাহ"],
  nasai: ["sunan an nasai", "sunan nasai", "nasai", "nasa i", "النسائي", "نسائي", "نسائی", "নাসাঈ", "নাসায়ী"],
  adab: ["al adab al mufrad", "adab al mufrad", "adab mufrad", "الادب المفرد", "আদাবুল মুফরাদ"],
  riyad: ["riyad as salihin", "riyad us saliheen", "riyadh as salihin", "riyad", "riyadh", "رياض الصالحين", "রিয়াদুস সালেহীন"],
  mishkat: ["mishkat al masabih", "mishkat", "مشكاة المصابيح", "مشكاه", "মিশকাত"],
  ahmad: ["musnad ahmad", "musnad", "ahmad", "مسند احمد", "মুসনাদে আহমাদ"],
  hisn: ["hisn al muslim", "hisnul muslim", "حصن المسلم"]
};
/** "Quran 2:255", "Surah 112", and how the other languages say it. */
const QURAN_WORDS = ["quran", "koran", "quraan", "surah", "sura", "surat", "ayah", "ayat", "aya", "قران", "سوره", "سورت", "ايه", "কুরআন", "সূরা", "আয়াত"];

/** Western digits for Bengali, Arabic and Persian/Urdu ones. */
function westernDigits(text: string) {
  return text
    .replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - 0x09e6))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0));
}

const compact = (text: string) => foldSearchText(text).replace(/ /g, "");
let bookAliases: [string, string][] | undefined;
/** [alias run together, book], longest first so "sahih muslim" wins over "muslim". */
function aliases() {
  if (!bookAliases) {
    const pairs: [string, string][] = [];
    for (const [book, names] of Object.entries(BOOKS)) for (const name of names) pairs.push([compact(name), book]);
    bookAliases = pairs.filter(([alias]) => alias).sort((a, b) => b[0].length - a[0].length);
  }
  return bookAliases;
}

/** The book a name means, if it is one: exactly, or the start of one ("bukh"). */
function bookOf(name: string): string | undefined {
  const key = compact(name);
  if (!key) return undefined;
  const list = aliases();
  return list.find(([alias]) => alias === key)?.[1] ?? (key.length >= 4 ? list.find(([alias]) => alias.startsWith(key))?.[1] : undefined);
}

export type ReferenceQuery =
  | { kind: "hadith"; book?: string; number: number }
  | { kind: "ayah"; surah: number; ayah?: number };

/** Reads "Bukhari 5090", "Sahih Muslim 2626a", "5090", "2:255", "Quran 2 255", "Surah 112", "বুখারী ৫০৯০". */
export function parseReference(text: string): ReferenceQuery | undefined {
  const plain = westernDigits(text).trim();
  const verse = plain.match(/^(.*?)\s*(\d{1,3})\s*[:：.]\s*(\d{1,3})(?:\s*-\s*\d{1,3})?$/u);
  if (verse && (!verse[1] || QURAN_WORDS.includes(foldSearchText(verse[1])) || /^(qur|কুর|قر)/u.test(foldSearchText(verse[1])))) {
    const surah = Number(verse[2]);
    if (surah >= 1 && surah <= 114) return { kind: "ayah", surah, ayah: Number(verse[3]) };
  }
  const numbered = plain.match(/^(.*?)\s*#?\s*(\d{1,5})\s*[a-z]?$/iu);
  if (!numbered) return undefined;
  const name = numbered[1].replace(/[,#:\-]+$/u, "").trim();
  const number = Number(numbered[2]);
  if (!name) return { kind: "hadith", number };
  const folded = foldSearchText(name);
  if (QURAN_WORDS.includes(folded) || QURAN_WORDS.some((word) => folded === `${word} ${word}`)) {
    return number >= 1 && number <= 114 ? { kind: "ayah", surah: number } : undefined;
  }
  const book = bookOf(name);
  return book ? { kind: "hadith", book, number } : undefined;
}

/** Book-and-number keys of a lesson's reference: "Sahih al-Bukhari 1, 2" gives "bukhari 1" and "bukhari 2". */
function referenceKeys(reference: string): string[] {
  const match = westernDigits(reference).match(/^(.*?)\s*(\d[\d\s,a-z]*)$/iu);
  if (!match) return [];
  const book = bookOf(match[1]);
  if (!book) return [];
  return [...match[2].matchAll(/\d+/g)].map((number) => `${book} ${Number(number[0])}`);
}

/** Ayah spans of "Quran 2:255", "Quran 2:1-7", "Quran 112", "Surah 1" or "Tafsir Ibn Kathir 2:1-7". */
function ayahSpans(reference: string): [number, number, number][] {
  const verse = reference.match(/(\d{1,3}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?/);
  if (verse) {
    const from = Number(verse[2]);
    return [[Number(verse[1]), from, verse[3] ? Number(verse[3]) : from]];
  }
  const whole = reference.match(/^(?:Quran|Surah)\s+(\d{1,3})$/i);
  return whole ? [[Number(whole[1]), 0, 0]] : [];
}

const isQuran = (reference: string) => /^(Quran|Surah)\b/i.test(reference);

/** Every hadith and ayah the course's lessons teach, once each, in course order. Cheap: no words are read here. */
export function buildContentEntries(sections: readonly LearningSection[], lessonsById: Readonly<Record<string, Lesson>>): Entry[] {
  const entries: Entry[] = [];
  const seen = new Set<string>();
  for (const section of sections) {
    const branchTitle = new Map(section.branches.map((branch) => [branch.id, branch.title]));
    for (const node of section.nodes) {
      if (node.kind === "review") continue;
      for (const lessonId of node.lessonIds) {
        const lesson = lessonsById[lessonId];
        if (!lesson) continue;
        const base = {
          lessonId,
          topicId: section.topicId,
          unitId: node.branchId,
          nodeId: node.id,
          lessonTitle: lesson.title,
          unitTitle: branchTitle.get(node.branchId)
        };
        const add = (entry: Omit<Entry, keyof typeof base | "rank" | "id">) => {
          const key = `${entry.kind}|${entry.reference}|${entry.text}`;
          if (seen.has(key)) return;
          seen.add(key);
          entries.push({ ...base, ...entry, id: `${entry.kind}-${entries.length}`, rank: entries.length });
        };
        const quoted = lesson.quote;
        const learnSource = lesson.learnSource;
        if (quoted?.text && quoted.reference) {
          const source = [learnSource, ...(lesson.sources ?? [])].find((item) => item?.reference === quoted.reference) ?? learnSource;
          const quran = isQuran(quoted.reference);
          add({
            kind: quran ? "ayah" : "hadith",
            reference: quoted.reference,
            text: quoted.text,
            meaning: quran && source?.summary && source.summary !== quoted.text ? source.summary : undefined,
            from: quran ? undefined : source?.from,
            grade: quran ? undefined : source?.grade,
            source: source ? { url: source.url, highlight: source.highlight, summary: source.summary } : undefined,
            refKeys: quran ? [] : referenceKeys(quoted.reference),
            spans: quran ? ayahSpans(quoted.reference) : []
          });
        } else if (learnSource?.category === "hadith" && learnSource.reference && learnSource.summary) {
          add({
            kind: "hadith",
            reference: learnSource.reference,
            text: learnSource.summary,
            from: learnSource.from,
            grade: learnSource.grade,
            source: { url: learnSource.url, highlight: learnSource.highlight, summary: learnSource.summary },
            refKeys: referenceKeys(learnSource.reference),
            spans: []
          });
        }
        const deeper = lesson.learnDeeper;
        if (deeper?.meaning.length) {
          const tafsir = deeper.sources[0];
          const spans = tafsir?.reference ? ayahSpans(tafsir.reference) : [];
          const span = spans[0];
          const surahName = lesson.surahName ?? node.surahName;
          add({
            kind: "ayah",
            reference: span ? `${surahName ? `${surahName} ` : "Quran "}${span[0]}:${span[1]}${span[2] !== span[1] ? `-${span[2]}` : ""}` : tafsir?.reference ?? lesson.title,
            text: deeper.meaning.join(" "),
            source: tafsir ? { url: tafsir.url, highlight: tafsir.highlight, summary: tafsir.summary } : undefined,
            refKeys: [],
            spans
          });
        }
      }
    }
  }
  return entries;
}

/** An entry's words in one language, folded, with a space at each end so " word" finds a word's start. */
function wordsOf(entry: Entry, language: SupportedLanguage) {
  const parts = [entry.text, entry.meaning ?? "", entry.reference, entry.lessonTitle, entry.from ?? ""];
  const shown = language === "en" ? parts : parts.map((part) => (part ? t(part, undefined, language) : part));
  return ` ${foldSearchText(westernDigits(shown.join(" ")))} `;
}

function hitOf({ rank: _rank, refKeys: _refKeys, spans: _spans, ...hit }: Entry): ContentHit {
  return hit;
}

/** Hits for a book and number, or an ayah. */
function referenceHits(entries: readonly Entry[], query: ReferenceQuery, limit: number): ContentHit[] {
  const hits: Entry[] = [];
  for (const entry of entries) {
    if (query.kind === "hadith") {
      if (entry.kind !== "hadith") continue;
      const found = query.book ? entry.refKeys.includes(`${query.book} ${query.number}`) : entry.refKeys.some((key) => key.endsWith(` ${query.number}`));
      if (found) hits.push(entry);
    } else if (entry.kind === "ayah") {
      const found = entry.spans.some(([surah, from, to]) =>
        surah === query.surah && (query.ayah === undefined || (from === 0 ? true : query.ayah >= from && query.ayah <= to))
      );
      if (found) hits.push(entry);
    }
    if (hits.length >= limit * 4) break;
  }
  // An ayah taught on its own comes before a passage around it.
  if (query.kind === "ayah" && query.ayah !== undefined) {
    const width = (entry: Entry) => Math.min(...entry.spans.map(([, from, to]) => (from === 0 ? 999 : to - from)));
    hits.sort((a, b) => width(a) - width(b) || a.rank - b.rank);
  }
  return onePerReference(hits, limit);
}

/** A hadith or ayah taught in several lessons shows once, at its best place. */
function onePerReference(entries: readonly Entry[], limit: number): ContentHit[] {
  const seen = new Set<string>();
  const hits: ContentHit[] = [];
  for (const entry of entries) {
    const key = `${entry.kind}|${entry.reference.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    hits.push(hitOf(entry));
    if (hits.length >= limit) break;
  }
  return hits;
}

/**
 * The words half of the search. `prepare` starts reading the words of English and the learner's language (a few
 * hundred lessons per step, so the screen never stops); `search` finds whatever is read so far, and `onReady` says
 * when more has been read so the screen can look again.
 */
export function createContentSearch(sections: readonly LearningSection[], lessonsById: Readonly<Record<string, Lesson>>, chunk = 400) {
  let entries: Entry[] | undefined;
  const words: Partial<Record<SupportedLanguage, string[]>> = {};
  const queue: SupportedLanguage[] = [];
  const listeners = new Set<() => void>();
  let working = false;
  let waits = 0;

  const all = () => (entries ??= buildContentEntries(sections, lessonsById));
  const step = () => {
    const list = all();
    const language = queue[0];
    if (!language) {
      working = false;
      return;
    }
    // A language whose lesson text is still being read waits for it, so its words are not read in English.
    if (!isLanguageReady(language)) {
      // Gives up on a language whose file cannot be read (no internet on web); the next search asks again.
      if (waits++ > 80) {
        queue.shift();
        waits = 0;
      } else void ensureLanguage(language);
      setTimeout(step, 120);
      return;
    }
    waits = 0;
    const done = (words[language] ??= []);
    const end = Math.min(list.length, done.length + chunk);
    for (let index = done.length; index < end; index += 1) done.push(wordsOf(list[index], language));
    if (done.length >= list.length) {
      queue.shift();
      listeners.forEach((listener) => listener());
    }
    // A frame's rest between steps, so taps, typing and animations always get their turn.
    setTimeout(step, STEP_REST_MS);
  };
  const want = (languages: readonly SupportedLanguage[]) => {
    for (const language of languages) {
      if (!queue.includes(language) && (words[language]?.length ?? 0) < all().length) queue.push(language);
    }
    if (!working && queue.length) {
      working = true;
      setTimeout(step, 0);
    }
  };

  return {
    /** Starts reading words for these languages, a little at a time. */
    prepare(languages: readonly SupportedLanguage[]) {
      want(languages);
    },
    /** Reads everything now (tests). */
    prepareNow(languages: readonly SupportedLanguage[] = LANGUAGES) {
      const list = all();
      for (const language of languages) {
        const done = (words[language] ??= []);
        for (let index = done.length; index < list.length; index += 1) done.push(wordsOf(list[index], language));
      }
    },
    /** Called each time a language's words are all read. Returns the way to stop listening. */
    onReady(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    /** True when the text is a book and number or an ayah, so its hits go first. */
    isReference(text: string) {
      return parseReference(text) !== undefined;
    },
    search(text: string, languages: readonly SupportedLanguage[], limit = 30): ContentHit[] {
      const list = all();
      const reference = parseReference(text);
      if (reference) {
        const hits = referenceHits(list, reference, limit);
        // A lone number that is no hadith's number may still be a word ("40 hadith"); otherwise this is the answer.
        if (hits.length || reference.kind === "ayah" || reference.book) return hits;
      }
      want(languages);
      const query = foldSearchText(westernDigits(text));
      const terms = query.split(" ").filter(Boolean);
      // One or two letters find too much to be any use (and every word has "a").
      if (!terms.length || query.replace(/ /g, "").length < 3) return [];
      const phrase = ` ${query}`;
      const found: { index: number; score: number }[] = [];
      for (let index = 0; index < list.length; index += 1) {
        let best: number | undefined;
        for (const language of languages) {
          const blob = words[language]?.[index];
          if (!blob) continue;
          if (!terms.every((term) => blob.includes(` ${term}`))) continue;
          // The words together beat the words apart; whole words beat word starts.
          const value = blob.includes(`${phrase} `) ? 0 : blob.includes(phrase) ? 1 : terms.every((term) => blob.includes(` ${term} `)) ? 2 : 3;
          if (best === undefined || value < best) best = value;
          if (best === 0) break;
        }
        if (best !== undefined) found.push({ index, score: best });
      }
      found.sort((a, b) => a.score - b.score || a.index - b.index);
      return onePerReference(found.map(({ index }) => list[index]), limit);
    },
    /** How many hadith and ayahs there are, and whether a language's words are all read (tests). */
    size: () => all().length,
    ready: (language: SupportedLanguage) => (words[language]?.length ?? 0) >= all().length
  };
}
