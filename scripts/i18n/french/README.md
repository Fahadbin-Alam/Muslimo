# French (preview)

French is written by hand, in batches, with no paid translation API. It stays hidden from learners
(`PREVIEW_LANGUAGE_OPTIONS` in `src/i18n.ts`) until a native French speaker has checked it. To try it, build with
`EXPO_PUBLIC_PREVIEW_LANGUAGES=1` or open the web app with `?preview-languages=1`, then pick Français.

- Screens: `src/translations/ui/fr.json`. Lessons, topics and placement questions: `src/translations/content/fr.json`.
  A line that is not there shows in English.
- Style: warm, simple French for children and families, the learner is "tu". Arabic words a learner says keep their
  sound (Bismillah, Alhamdulillah, salam, wudu, adhan). Common French Muslim spellings: Omar, Othman, Aïcha, Abu Hurayra,
  La Mecque, Médine, sourate, verset, Compagnons, Sira, Aïd, Joumou'a.
- Sources stay in English with their exact-line highlights (Fahad's rule), so source lines are never translated.
- Quran, hadith and du'a lines (the words or meaning of an ayah, a hadith or a du'a) stay in English until an approved
  French translation whose licence allows it can be used. They are listed in `scripture-lines.json`, and a test
  (`src/__tests__/previewLanguage.test.ts`) keeps them out of the French catalog. Lessons that retell a hadith in the
  app's own words are translated closely.
- Set phrases translated anyway (check these): see `SET_PHRASES` in `scripture.cjs`.

## Done so far

1. Screens: 1,090 of 1,099 lines (9 hadith lines left in English).
2. Topic 1, Foundation: every unit, lesson title, lesson page and question (1,301 lines; 9 ayah/hadith lines left in
   English).
3. Every topic, unit and branch name and description (1,318 lines).
4. The placement test questions (591 lines).
5. New to Islam topic: every lesson page and question (990 lines; 4 ayah/hadith lines left in English).
6. Ramadan topic: every lesson page and question (175 lines; 41 ayah/hadith lines left in English).

## Still in English

Every other topic's lessons, comeback/league notifications and home-screen widgets.
