import { COURSE, LESSONS_BY_ID } from "../data/course";
import { ensureLanguage } from "../translations";
import { createAppSearch, isContentHit } from "../utils/appSearch";
import { createContentSearch, parseReference } from "../utils/contentSearch";

const content = createContentSearch(COURSE.sections, LESSONS_BY_ID);

beforeAll(async () => {
  await Promise.all((["bn", "ur", "ar"] as const).map((language) => ensureLanguage(language)));
  content.prepareNow(["en", "bn", "ur", "ar"]);
});

const first = (query: string, languages = ["en"] as const) => content.search(query, languages)[0];

describe("reading a reference", () => {
  it.each([
    ["Bukhari 5090", { kind: "hadith", book: "bukhari", number: 5090 }],
    ["sahih al-bukhari 5090", { kind: "hadith", book: "bukhari", number: 5090 }],
    ["Sahih Muslim 2626a", { kind: "hadith", book: "muslim", number: 2626 }],
    ["tirmizi 2516", { kind: "hadith", book: "tirmidhi", number: 2516 }],
    ["Abu Dawood 4800", { kind: "hadith", book: "abudawud", number: 4800 }],
    ["বুখারী ৫০৯০", { kind: "hadith", book: "bukhari", number: 5090 }],
    ["البخاري ١", { kind: "hadith", book: "bukhari", number: 1 }],
    ["بخاری 1", { kind: "hadith", book: "bukhari", number: 1 }],
    ["5090", { kind: "hadith", number: 5090 }],
    ["2:255", { kind: "ayah", surah: 2, ayah: 255 }],
    ["Quran 1:1", { kind: "ayah", surah: 1, ayah: 1 }],
    ["surah 112", { kind: "ayah", surah: 112 }]
  ])("reads %s", (text, expected) => {
    expect(parseReference(text)).toEqual(expected);
  });

  it("leaves words alone", () => {
    expect(parseReference("patience")).toBeUndefined();
    expect(parseReference("abu bakr")).toBeUndefined();
    expect(parseReference("200:1")).toBeUndefined();
  });
});

describe("finding hadith and ayahs", () => {
  it("finds a hadith by its book and number, in any language's letters, once", () => {
    for (const query of ["Bukhari 5090", "bukhari 5090", "বুখারী ৫০৯০", "البخاري 5090"]) {
      const hits = content.search(query, ["en"]);
      expect(hits[0]).toMatchObject({ kind: "hadith", reference: "Sahih al-Bukhari 5090" });
      expect(hits.filter((hit) => hit.reference === "Sahih al-Bukhari 5090")).toHaveLength(1);
    }
    expect(first("Muslim 2626")).toMatchObject({ reference: "Sahih Muslim 2626" });
    expect(first("tirmidhi 2516")).toMatchObject({ reference: "Jami at-Tirmidhi 2516" });
  });

  it("gives each hit its lesson to go to and its source to read", () => {
    const hit = first("Bukhari 1");
    expect(hit.nodeId).toBeTruthy();
    expect(LESSONS_BY_ID[hit.lessonId].nodeId).toBe(hit.nodeId);
    expect(hit.source?.url).toContain("sunnah.com/bukhari:1");
  });

  it("finds an ayah by surah and ayah, the ayah on its own first", () => {
    expect(first("2:255")).toMatchObject({ kind: "ayah", reference: "Quran 2:255" });
    expect(content.search("2:255", ["en"]).some((hit) => hit.reference.includes("2:254-257"))).toBe(true);
    expect(first("surah 112")).toMatchObject({ kind: "ayah" });
  });

  it("finds a hadith or meaning by its words, in the learner's language too", () => {
    expect(first("cheerful countenance")).toMatchObject({ reference: "Sahih Muslim 2626" });
    expect(content.search("intention", ["en"]).some((hit) => hit.reference === "Sahih al-Bukhari 1")).toBe(true);
    expect(content.search("neighbor", ["en"]).length).toBeGreaterThan(3);
    expect(content.search("ধৈর্য", ["en", "bn"]).length).toBeGreaterThan(3);
    expect(content.search("صبر", ["en", "ar", "ur"]).length).toBeGreaterThan(3);
  });

  it("finds nothing for nonsense, blanks or a letter or two", () => {
    expect(content.search("zzqxv", ["en"])).toEqual([]);
    expect(content.search("  ", ["en"])).toEqual([]);
    expect(content.search("ab", ["en"])).toEqual([]);
    expect(content.search("Bukhari 999999", ["en"])).toEqual([]);
  });

  it("answers fast", () => {
    const start = Date.now();
    for (const query of ["patience", "neighbor", "mercy of allah", "ধৈর্য", "Bukhari 1"]) content.search(query, ["en", "bn"]);
    expect(Date.now() - start).toBeLessThan(500);
  });
});

describe("the app's one search", () => {
  const search = createAppSearch(COURSE.sections, LESSONS_BY_ID);
  beforeAll(() => {
    search.names.prepare("en");
    search.content.prepareNow(["en"]);
  });

  it("puts a hadith number's hadith first, and names first for a name", () => {
    expect(search.search("Bukhari 5090", "en")[0]).toMatchObject({ kind: "hadith", reference: "Sahih al-Bukhari 5090" });
    expect(search.search("abu bakr", "en")[0]).toMatchObject({ kind: "unit", unitId: "sahabi-abu-bakr" });
    const patience = search.search("patience", "en");
    expect(patience.some(isContentHit)).toBe(true);
  });

  it("reads no words until it is opened, then a little at a time", async () => {
    const fresh = createContentSearch(COURSE.sections, LESSONS_BY_ID, 2000);
    expect(fresh.ready("en")).toBe(false);
    // A number needs no words.
    expect(fresh.search("Bukhari 1", ["en"])[0]).toMatchObject({ reference: "Sahih al-Bukhari 1" });
    const ready = jest.fn();
    fresh.onReady(ready);
    fresh.prepare(["en"]);
    expect(fresh.ready("en")).toBe(false);
    for (let wait = 0; wait < 100 && !fresh.ready("en"); wait += 1) await new Promise((done) => setTimeout(done, 50));
    expect(fresh.ready("en")).toBe(true);
    expect(ready).toHaveBeenCalled();
    expect(fresh.search("cheerful countenance", ["en"])[0]).toMatchObject({ reference: "Sahih Muslim 2626" });
  });
});

test("gives every hit its own key, even when one lesson teaches an ayah and its meaning", () => {
  for (const query of ["2:255", "patience", "surah 112", "mercy"]) {
    const ids = content.search(query, ["en"]).map((hit) => hit.id);
    expect(new Set(ids).size).toBe(ids.length);
  }
  const lessons = content.search("2:255", ["en"]).map((hit) => hit.lessonId);
  expect(lessons.length).toBeGreaterThan(0);
});
