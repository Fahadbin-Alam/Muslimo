// Each language's lesson text ships as a file next to the app instead of inside its code (src/translations/contentFiles.ts).
// The .json files under src/translations/content stay the ones to edit: every bundle copies them to
// assets/languages/<language>.lang first, so a build can never carry an old copy.
const fs = require("fs");
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const LANGUAGES = ["ar", "bn", "ur", "id"];
const from = path.join(__dirname, "src/translations/content");
const to = path.join(__dirname, "assets/languages");

fs.mkdirSync(to, { recursive: true });
for (const language of LANGUAGES) {
  const source = path.join(from, `${language}.json`);
  const target = path.join(to, `${language}.lang`);
  const text = fs.readFileSync(source);
  if (!fs.existsSync(target) || !fs.readFileSync(target).equals(text)) {
    fs.writeFileSync(target, text);
  }
}

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("lang");

module.exports = config;
