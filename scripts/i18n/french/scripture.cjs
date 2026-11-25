// The English lines that carry the words or meaning of a Quran ayah, a hadith or a du'a. French keeps these in
// English until an approved French translation whose licence allows it is added (Fahad's rule: never retranslate
// Quran or hadith loosely). scripture-lines.json lists them: the lines marked when Indonesian was translated, every
// lesson quote, and the lines found while writing French. Add a line there whenever a new one is left in English.
//
// SET_PHRASES are the short formulas every French-speaking Muslim already says in French ("Allah est le plus
// grand"): they are translated, and listed in README.md for the native speaker's check.
const fs = require("fs");
const path = require("path");

const SET_PHRASES = new Set([
  "All praise is for Allah",
  "Allah is the Greatest",
  "And upon you be peace",
  "May Allah have mercy on you",
  "May Allah reward you with good",
  "May Allah send blessings and peace upon him",
  "O Allah, answer our dua",
  "There is no god but Allah",
  "There is no power and no strength except with Allah",
  "What Allah wills"
]);

function scriptureLines() {
  const lines = JSON.parse(fs.readFileSync(path.join(__dirname, "scripture-lines.json"), "utf8"));
  return new Set(lines.filter((line) => !SET_PHRASES.has(line)));
}

module.exports = { scriptureLines, SET_PHRASES };
