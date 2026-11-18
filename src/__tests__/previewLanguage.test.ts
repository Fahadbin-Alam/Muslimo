/**
 * Indonesian is translated but waits for a native speaker's check, so it stays hidden from learners
 * (PREVIEW_LANGUAGE_OPTIONS in src/i18n.ts) and its lines must keep what the other languages keep.
 */
import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS, languageOptions, normalizeLanguage, PREVIEW_LANGUAGE_OPTIONS, t } from "../i18n";
import { getCatalog } from "../translations";

const { extract } = require("../../scripts/i18n/ui-strings.cjs") as { extract: () => string[] };

const ARABIC_RUN = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+(?:[\s؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]*[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+)?/g;
const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort().join();

describe("Indonesian stays hidden until it is checked", () => {
  test("learners are not offered it", () => {
    expect(LANGUAGE_OPTIONS.map((option) => option.id)).not.toContain("id");
    expect(languageOptions(false).map((option) => option.id)).not.toContain("id");
    expect(PREVIEW_LANGUAGE_OPTIONS.map((option) => option.id)).toEqual(["id"]);
  });

  test("a saved Indonesian choice shows English while previews are off", () => {
    expect(normalizeLanguage("id", true, false)).toBe(DEFAULT_LANGUAGE);
    expect(normalizeLanguage("id", true, true)).toBe("id");
    expect(languageOptions(true).map((option) => option.id)).toEqual(["en", "ar", "bn", "ur", "id"]);
  });

  test("a line without Indonesian falls back to English", () => {
    expect(t("A line nobody translated", undefined, "id")).toBe("A line nobody translated");
  });
});

describe("Indonesian catalog", () => {
  const catalog = getCatalog("id");

  // New screens added later fall back to English until Indonesian gets a new pass, so this must not block
  // other work: it only guards that the catalog is still mostly there.
  test("covers nearly every screen string", () => {
    const used = extract();
    expect(used.filter((text) => catalog[text]).length / used.length).toBeGreaterThan(0.9);
  });

  test("keeps every {placeholder}, the ﷺ sign and all Arabic text exactly", () => {
    const broken = Object.entries(catalog).filter(
      ([english, translated]) =>
        !translated.trim() ||
        placeholders(english) !== placeholders(translated) ||
        (english.includes("ﷺ") && !translated.includes("ﷺ")) ||
        (english.match(ARABIC_RUN) ?? []).some((arabic) => !translated.includes(arabic))
    );
    expect(broken.slice(0, 10)).toEqual([]);
  });
});
