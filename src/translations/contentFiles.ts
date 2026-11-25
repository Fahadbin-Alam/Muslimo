import { Asset } from "expo-asset";
import type { SupportedLanguage } from "../types";
import type { TranslationCatalog } from "./index";

// Each language's lesson text (over 140,000 lines) is a file of its own next to the app, not part of the app's code:
// in the code all four came to about 53 MB that every phone carried, most of it in languages the learner never reads.
// metro.config.js copies src/translations/content/<language>.json to assets/languages/<language>.lang at every
// bundle, so the .json files stay the ones to edit. Tests read the .json files straight away (contentFiles.jest.ts).

const FILES: Partial<Record<SupportedLanguage, number>> = {
  ar: require("../../assets/languages/ar.lang"),
  bn: require("../../assets/languages/bn.lang"),
  ur: require("../../assets/languages/ur.lang"),
  id: require("../../assets/languages/id.lang"),
  fr: require("../../assets/languages/fr.lang")
};

/** A language's lesson text when it can be had without waiting (only in tests). */
export function contentNow(_language: SupportedLanguage): TranslationCatalog | undefined {
  return undefined;
}

/** Reads a language's lesson text from its file. */
export async function loadContent(language: SupportedLanguage): Promise<TranslationCatalog> {
  const file = FILES[language];
  if (file === undefined) return {};
  const asset = Asset.fromModule(file);
  return JSON.parse(await readText(asset)) as TranslationCatalog;
}

async function readText(asset: Asset): Promise<string> {
  // Web: the file is served next to the app.
  const response = await fetch(asset.uri);
  if (!response.ok) throw new Error(`Could not load ${asset.name}: ${response.status}`);
  return response.text();
}
