/**
 * Read Arabic: learning to read from zero. Every Quran word a lesson shows is copied, mark for mark, from the ayah
 * its card quotes and its source links to; every English line starts with an English word (a line that starts in
 * Arabic shows right to left, jumbled); the topic is taught in order; and its lessons ask no "which ayah comes next".
 */
import { LESSONS_BY_ID, COURSE } from "../data/course";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { READ_ARABIC_UNITS } from "../data/readArabicUnits";
import { LIBRARY_TOPICS } from "../api/islamicLearningApi";
import { withReciteQuestion } from "../ui/lesson/reciteQuestion";

const lessons = READ_ARABIC_UNITS.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })));
// A word written with the Quran's own marks (sukun as ۡ, alif wasla ٱ, small alif ٰ ...) can only have been copied.
const UTHMANI_WORD = /[؀-ۿ]*[ٱٰۡ][؀-ۿ]*/g;
const STARTS_ARABIC = /^[؀-ۿ]/;

function texts(lesson: (typeof lessons)[number]["lesson"]): string[] {
  return [
    lesson.line,
    ...(lesson.facts ?? []),
    lesson.source.summary,
    ...lesson.questions.flatMap((question) => ["a" in question ? [question.q, question.a, ...question.wrong] : [question.q], question.why].flat())
  ];
}

describe("Read Arabic", () => {
  it("is its own topic, taught in order, with five units", () => {
    const section = COURSE.sections.find((each) => each.topicId === "read_arabic");
    expect(section?.branches.map((branch) => branch.id)).toEqual(READ_ARABIC_UNITS.map((unit) => unit.branchId));
    expect(LIBRARY_TOPICS.has("read_arabic")).toBe(false);
  });

  it("quotes on every card the ayah its source names", () => {
    for (const { lesson } of lessons) {
      expect(lesson.quote?.reference).toBe(lesson.source.reference);
      expect(lesson.quote?.text).toBe(QURAN_AYAHS[(lesson.source.reference ?? "").replace("Quran ", "")]);
    }
  });

  it("takes every Quran word it shows from an ayah a lesson of the topic quotes", () => {
    const quoted = lessons.map(({ lesson }) => lesson.quote!.text.split(" ")).flat();
    const strip = (word: string) => word.replace(/[.,:;?!()]/g, "");
    const stray = lessons.flatMap(({ lesson }) =>
      texts(lesson)
        .flatMap((text) => text.match(UTHMANI_WORD) ?? [])
        .map(strip)
        // Two letters or fewer is a drill (لَمۡ, نۡ, أَلۡ), not a word taken from an ayah.
        .filter((word) => (word.match(/[\u0621-\u064A\u0671]/g)?.length ?? 0) > 2 && !quoted.includes(word))
        .map((word) => `${lesson.slug}: ${word}`)
    );
    expect(stray).toEqual([]);
  });

  it("starts every English line with an English word", () => {
    const rtl = lessons.flatMap(({ lesson }) => texts(lesson).filter((text) => /[A-Za-z]/.test(text) && STARTS_ARABIC.test(text)));
    expect(rtl).toEqual([]);
  });

  it("asks no 'which ayah comes next' in a reading lesson", () => {
    for (const { unit, lesson } of lessons) {
      const built = LESSONS_BY_ID[`lesson-deep-${unit.key}-${lesson.slug}`];
      expect(built).toBeDefined();
      expect(withReciteQuestion(built).challenges.some((challenge) => challenge.listen)).toBe(false);
    }
  });
});
