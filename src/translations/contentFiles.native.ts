import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import type { SupportedLanguage } from "../types";
import type { TranslationCatalog } from "./index";

// The phone build of contentFiles.ts (see there): the file is read from the app's own assets.

const FILES: Partial<Record<SupportedLanguage, number>> = {
  ar: require("../../assets/languages/ar.lang"),
  bn: require("../../assets/languages/bn.lang"),
  ur: require("../../assets/languages/ur.lang"),
  id: require("../../assets/languages/id.lang"),
  fr: require("../../assets/languages/fr.lang")
};

export function contentNow(_language: SupportedLanguage): TranslationCatalog | undefined {
  return undefined;
}

export async function loadContent(language: SupportedLanguage): Promise<TranslationCatalog> {
  const file = FILES[language];
  if (file === undefined) return {};
  const asset = Asset.fromModule(file);
  // A release build keeps assets inside the app package: downloadAsync copies the file out once, to read it.
  if (!asset.localUri) await asset.downloadAsync();
  return JSON.parse(await new File(asset.localUri ?? asset.uri).text()) as TranslationCatalog;
}
