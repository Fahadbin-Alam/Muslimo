import type { SupportedLanguage } from "../types";
import { contentNow, loadContent } from "./contentFiles";

// English text -> translated text. `ui/` holds the app's screens; `content/` holds lessons, topics and
// placement questions (see scripts/i18n). The screens' lines are part of the app. A language's lesson text is a file
// of its own (contentFiles.ts), read only when someone picks the language (or searches in its letters): until it has
// been read, translationOf finds only the screens' lines. App.tsx reads the learner's language before the first
// screen, and TopicApp waits for a newly picked one before it switches (ensureLanguage). The two halves are read
// where they are, never copied into one object: a merged copy would hold every line twice.
export type TranslationCatalog = Record<string, string>;

const EMPTY_CATALOG: TranslationCatalog = {};
const uiLoaded: Partial<Record<SupportedLanguage, TranslationCatalog>> = {};
const contentLoaded: Partial<Record<SupportedLanguage, TranslationCatalog>> = {};
const contentPending: Partial<Record<SupportedLanguage, Promise<boolean>>> = {};
const merged: Partial<Record<SupportedLanguage, TranslationCatalog>> = {};
const own = Object.prototype.hasOwnProperty;

function loadUi(language: SupportedLanguage): TranslationCatalog | undefined {
  switch (language) {
    case "ar":
      return require("./ui/ar.json");
    case "bn":
      return require("./ui/bn.json");
    case "ur":
      return require("./ui/ur.json");
    case "id":
      return require("./ui/id.json");
    default:
      return undefined;
  }
}

function uiOf(language: SupportedLanguage): TranslationCatalog | undefined {
  if (language === "en") {
    return undefined;
  }

  return (uiLoaded[language] ??= loadUi(language));
}

function contentOf(language: SupportedLanguage): TranslationCatalog | undefined {
  if (language === "en") {
    return undefined;
  }

  return (contentLoaded[language] ??= contentNow(language));
}

/** True once the language's lesson text has been read (English always is). */
export function isLanguageReady(language: SupportedLanguage): boolean {
  return language === "en" || uiOf(language) === undefined || contentOf(language) !== undefined;
}

/**
 * Reads the language's lesson text, once. Resolves true when it is ready; false when the file could not be read
 * (the app then shows those lines in English, and a later call tries again).
 */
export function ensureLanguage(language: SupportedLanguage): Promise<boolean> {
  if (isLanguageReady(language)) {
    return Promise.resolve(true);
  }

  return (contentPending[language] ??= loadContent(language).then(
    (catalog) => {
      contentLoaded[language] = catalog;
      delete merged[language];
      return true;
    },
    () => {
      delete contentPending[language];
      return false;
    }
  ));
}

/** The language's text for an English line, or undefined when it has none. A screen's line wins over a lesson's. */
export function translationOf(language: SupportedLanguage, text: string): string | undefined {
  const ui = uiOf(language);
  if (!ui) {
    return undefined;
  }
  if (own.call(ui, text)) {
    return ui[text];
  }
  const content = contentOf(language);
  return content && own.call(content, text) ? content[text] : undefined;
}

/**
 * The whole catalog as one object, for checks that walk every line (tests, scripts). It is a merged copy, built the
 * first time it is asked for: the app reads single lines with translationOf instead.
 */
export function getCatalog(language: SupportedLanguage): TranslationCatalog {
  const ui = uiOf(language);
  if (!ui) {
    return EMPTY_CATALOG;
  }

  return (merged[language] ??= { ...(contentOf(language) ?? EMPTY_CATALOG), ...ui });
}

/** The languages whose lesson text is in memory now (for the test that the app opens without the ones it does not show). */
export function loadedLanguages(): SupportedLanguage[] {
  return (Object.keys(contentLoaded) as SupportedLanguage[]).filter((language) => contentLoaded[language]);
}
