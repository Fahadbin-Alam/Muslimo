import type { Lesson, LearningSection, SupportedLanguage } from "../types";
import { createContentSearch, type ContentHit } from "./contentSearch";
import { createCourseSearch, searchLanguages, type TopicSearchHit } from "./topicSearch";

// The app's one search: topics, people, surahs and lessons by name (topicSearch.ts), and every hadith and ayah the
// lessons teach, by their words or by "Bukhari 5090" and "2:255" (contentSearch.ts). Nothing is read until the
// search is first opened.

export type SearchHit = TopicSearchHit | ContentHit;

export const isContentHit = (hit: SearchHit): hit is ContentHit => hit.kind === "hadith" || hit.kind === "ayah";

/**
 * The languages whose lesson words are searched: English, the learner's own, and one whose letters are typed. Never a
 * language just because it has no letters of its own (a preview language), so no file is read for nothing.
 */
function wordLanguages(text: string, learnerLanguage: SupportedLanguage): SupportedLanguage[] {
  return searchLanguages(text, learnerLanguage).filter(
    (language) => language === "en" || language === learnerLanguage || (text && !searchLanguages("", learnerLanguage).includes(language))
  );
}

export function createAppSearch(sections: readonly LearningSection[], lessonsById: Readonly<Record<string, Lesson>>) {
  const names = createCourseSearch(sections);
  const content = createContentSearch(sections, lessonsById);
  return {
    /** Gets the search ready for the learner's language: names at once, the lessons' words a little at a time. */
    prepare(learnerLanguage: SupportedLanguage) {
      names.prepare(learnerLanguage);
      content.prepare(wordLanguages("", learnerLanguage));
    },
    /** A book and number or an ayah puts its hadith or ayah first; anything else puts names first. */
    search(text: string, learnerLanguage: SupportedLanguage): SearchHit[] {
      const found = content.search(text, wordLanguages(text, learnerLanguage));
      if (content.isReference(text) && found.length) return [...found, ...names.search(text, learnerLanguage, 10)];
      return [...names.search(text, learnerLanguage, 20), ...found];
    },
    /** Called when more of the lessons' words have been read, so an open search can look again. */
    onReady: content.onReady,
    names,
    content
  };
}
