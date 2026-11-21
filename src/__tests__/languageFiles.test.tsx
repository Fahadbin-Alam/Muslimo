jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
// Each language's lesson text is read from a file, which takes a moment on a phone (src/translations/contentFiles.ts).
let mockRelease: (() => void) | undefined;
const mockLoads: string[] = [];
jest.mock("../translations/contentFiles", () => ({
  contentNow: () => undefined,
  loadContent: (language: string) => {
    mockLoads.push(language);
    if (language === "ur") return Promise.reject(new Error("no file"));
    return new Promise((done) => {
      mockRelease = () => done(jest.requireActual("../translations/contentFiles.jest").contentNow(language));
    });
  }
}));

import fs from "fs";
import path from "path";
import { getStoredItem, setStoredItem } from "../services/appStorage";
import { likelyStartLanguages } from "../services/startLanguage";
import { ensureLanguage, isLanguageReady, loadedLanguages, translationOf } from "../translations";

const bnContent = JSON.parse(fs.readFileSync(path.join(__dirname, "../translations/content/bn.json"), "utf8")) as Record<string, string>;
const bnUi = JSON.parse(fs.readFileSync(path.join(__dirname, "../translations/ui/bn.json"), "utf8")) as Record<string, string>;
const lessonLine = Object.keys(bnContent).find((line) => !(line in bnUi))!;
const screenLine = Object.keys(bnUi)[0];

describe("each language's lesson text in a file of its own", () => {
  it("shows the screens' lines at once and the lessons' lines once the file is read", async () => {
    expect(isLanguageReady("en")).toBe(true);
    expect(isLanguageReady("bn")).toBe(false);
    expect(translationOf("bn", screenLine)).toBe(bnUi[screenLine]);
    expect(translationOf("bn", lessonLine)).toBeUndefined();

    const first = ensureLanguage("bn");
    const second = ensureLanguage("bn");
    mockRelease!();
    await expect(first).resolves.toBe(true);
    await expect(second).resolves.toBe(true);
    expect(mockLoads.filter((language) => language === "bn")).toHaveLength(1);
    expect(isLanguageReady("bn")).toBe(true);
    expect(translationOf("bn", lessonLine)).toBe(bnContent[lessonLine]);
    expect(loadedLanguages()).toEqual(["bn"]);
  });

  it("tries again later when a file could not be read", async () => {
    await expect(ensureLanguage("ur")).resolves.toBe(false);
    await expect(ensureLanguage("ur")).resolves.toBe(false);
    expect(mockLoads.filter((language) => language === "ur")).toHaveLength(2);
    expect(isLanguageReady("ur")).toBe(false);
  });

  it("reads the saved language before the first screen, not the phone's when one was picked", () => {
    const saved = getStoredItem("sira-path-user-profile");
    setStoredItem("sira-path-user-profile", JSON.stringify({ preferredLanguage: "ar" }));
    expect(likelyStartLanguages()).toEqual(["ar"]);
    setStoredItem("sira-path-user-profile", JSON.stringify({ preferredLanguage: "en" }));
    expect(likelyStartLanguages()).toEqual([]);
    setStoredItem("sira-path-user-profile", saved ?? "{}");
  });

  it("keeps the .json files the ones to edit: the app's copies are made at every bundle, not kept in git", () => {
    const ignore = fs.readFileSync(path.join(__dirname, "../../.gitignore"), "utf8");
    expect(ignore).toMatch(/^assets\/languages\/$/m);
    const metro = fs.readFileSync(path.join(__dirname, "../../metro.config.js"), "utf8");
    expect(metro).toMatch(/src\/translations\/content/);
    expect(metro).toMatch(/assetExts\.push\("lang"\)/);
  });
});
