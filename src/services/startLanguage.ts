import { deviceLanguage, normalizeLanguage } from "../i18n";
import { ensureLanguage } from "../translations";
import type { SupportedLanguage } from "../types";
import { getStoredItem } from "./appStorage";
import { loadLocalAuthAccount } from "./localAuth";

// Before the first screen: read the lesson text of the language the app will open in (the saved choice, the
// account's, else the phone's), so it never opens in English for a moment. Never waits longer than `timeoutMs`:
// the app then opens and TopicApp switches once the file is read.

export function likelyStartLanguages(): SupportedLanguage[] {
  let saved: string | undefined;
  try {
    saved = (JSON.parse(getStoredItem("sira-path-user-profile") ?? "{}") as { preferredLanguage?: string }).preferredLanguage;
  } catch {
    saved = undefined;
  }
  const account = loadLocalAuthAccount()?.preferredLanguage;
  // As TopicApp: the phone's language only when nothing was picked yet.
  const picked = (saved || account ? [saved, account] : [deviceLanguage()]).map((language) => normalizeLanguage(language));
  return [...new Set(picked)].filter((language) => language !== "en");
}

export async function prepareStartLanguage(timeoutMs = 6000): Promise<void> {
  const reads = Promise.all(likelyStartLanguages().map((language) => ensureLanguage(language)));
  await Promise.race([reads, new Promise((done) => setTimeout(done, timeoutMs))]);
}
