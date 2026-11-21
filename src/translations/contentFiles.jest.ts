import type { SupportedLanguage } from "../types";
import type { TranslationCatalog } from "./index";

// Tests read each language's lesson text straight from the .json files (the app loads them from files: contentFiles.ts).
export function contentNow(language: SupportedLanguage): TranslationCatalog | undefined {
  switch (language) {
    case "ar":
      return require("./content/ar.json");
    case "bn":
      return require("./content/bn.json");
    case "ur":
      return require("./content/ur.json");
    case "id":
      return require("./content/id.json");
    default:
      return undefined;
  }
}

export async function loadContent(language: SupportedLanguage): Promise<TranslationCatalog> {
  return contentNow(language) ?? {};
}
