import { COURSE, LESSONS_BY_ID } from "../data/course";
import { atTier, QUESTION_TIERS, tierForLevel } from "../data/questionTiers";
import { EXPERT_VERSIONS } from "../data/tiers/expert";
import { EXTREME_VERSIONS } from "../data/tiers/extreme";
import { SUPER_HARD_VERSIONS } from "../data/tiers/super";
import { getCatalog } from "../translations";
import type { Challenge } from "../types";

// Fahad (2026-11-24): "for the same answer, rewrite it in a harder way", a few levels for every category, asked when
// the learner wants it harder. Each tier keeps the question's answer and source. Fahad (2026-11-26): five levels, easy,
// medium, hard, super hard and extremely hard, each going deeper into the same topic.

const questions = new Map<string, Challenge[]>();
for (const section of COURSE.sections) {
  for (const node of section.nodes) {
    for (const id of node.lessonIds) {
      for (const challenge of LESSONS_BY_ID[id]?.challenges ?? []) {
        questions.set(challenge.prompt, [...(questions.get(challenge.prompt) ?? []), challenge]);
      }
    }
  }
}
const answerOf = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
const entries = Object.entries(QUESTION_TIERS);

describe("question tiers", () => {
  it("are keyed by a real question, with its real answer", () => {
    for (const [prompt, entry] of entries) {
      const found = questions.get(prompt);
      expect([prompt, Boolean(found)]).toEqual([prompt, true]);
      expect(found!.some((challenge) => answerOf(challenge) === entry.answer)).toBe(true);
      expect(entry.harder ?? entry.expert).toBeTruthy();
    }
  });

  it("ask a true/false question as a statement, and a 4-choice one with three different wrong answers", () => {
    for (const [prompt, entry] of entries) {
      const trueFalse = entry.answer === "True" || entry.answer === "False";
      for (const version of [entry.harder, entry.expert, entry.superHard, entry.extreme]) {
        if (!version) continue;
        if (trueFalse) {
          expect([prompt, typeof version]).toEqual([prompt, "string"]);
          continue;
        }
        expect([prompt, typeof version]).toEqual([prompt, "object"]);
        const [question, ...wrong] = version as readonly string[];
        expect(question).not.toBe(prompt);
        expect(new Set([entry.answer, ...wrong]).size).toBe(4);
        // Never "build the answer from word tiles": every tier is a tap on one answer.
        expect(question).not.toMatch(/word tiles|build the answer/i);
      }
    }
  });

  it("keep the answer, the source and the Why, and change only the wording", () => {
    for (const [prompt] of entries) {
      const base = questions.get(prompt)!.find((challenge) => answerOf(challenge) === QUESTION_TIERS[prompt].answer)!;
      for (const tier of [2, 3, 4, 5] as const) {
        const asked = atTier(base, tier);
        expect(answerOf(asked)).toBe(answerOf(base));
        expect(asked.source).toBe(base.source);
        expect(asked.explanation).toBe(base.explanation);
        expect(asked.resourceUrl).toBe(base.resourceUrl);
        expect(atTier(asked, 1)).toBe(base);
        if (asked !== base) expect(asked.id).toMatch(new RegExp(`^${base.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_t[2-5]$`));
      }
    }
  });

  it("give each Expert version a tiered question, asked differently from its Harder one", () => {
    for (const [prompt, expert] of Object.entries(EXPERT_VERSIONS)) {
      const entry = QUESTION_TIERS[prompt];
      expect([prompt, Boolean(entry?.harder)]).toEqual([prompt, true]);
      const ask = (version: unknown) => (typeof version === "string" ? version : (version as readonly string[])[0]);
      expect([prompt, ask(expert) !== ask(entry.harder)]).toEqual([prompt, true]);
      expect([prompt, ask(expert) !== prompt]).toEqual([prompt, true]);
    }
  });

  it.each([
    ["Super hard", SUPER_HARD_VERSIONS, (entry: (typeof QUESTION_TIERS)[string]) => entry.expert ?? entry.harder],
    ["Extremely hard", EXTREME_VERSIONS, (entry: (typeof QUESTION_TIERS)[string]) => entry.superHard ?? entry.expert ?? entry.harder]
  ] as const)("give each %s version a tiered question, asked differently from the level below", (_name, versions, below) => {
    const ask = (version: unknown) => (typeof version === "string" ? version : (version as readonly string[])[0]);
    for (const [prompt, version] of Object.entries(versions)) {
      const entry = QUESTION_TIERS[prompt];
      expect([prompt, Boolean(entry?.harder)]).toEqual([prompt, true]);
      expect([prompt, ask(version) !== ask(below(entry))]).toEqual([prompt, true]);
      expect([prompt, ask(version) !== prompt]).toEqual([prompt, true]);
    }
  });

  it("fall back to the nearest easier version a question has", () => {
    for (const [prompt, entry] of entries.slice(0, 300)) {
      const base = questions.get(prompt)!.find((challenge) => answerOf(challenge) === entry.answer)!;
      if (!entry.superHard) expect(atTier(base, 4).prompt).toBe(atTier(base, 3).prompt);
      if (!entry.extreme) expect(atTier(base, 5).prompt).toBe(atTier(base, 4).prompt);
      if (!entry.expert) expect(atTier(base, 3).prompt).toBe(atTier(base, 2).prompt);
    }
  });

  it("leave a question with no tiers as it is", () => {
    const plain: Challenge = { id: "x", type: "multiple_choice", prompt: "Not tiered?", choices: [{ id: "a", label: "Yes" }, { id: "b", label: "No" }], correctChoiceId: "a", explanation: "" };
    expect(atTier(plain, 3)).toBe(plain);
  });

  it("ask Easy up to level 1, then Medium 2, Hard 3, Super hard 4, Extremely hard 5", () => {
    expect([0, 1, 2, 3, 4, 5].map(tierForLevel)).toEqual([1, 1, 2, 3, 4, 5]);
  });

  it.each(["bn", "ur", "ar"] as const)("are all translated into %s", (language) => {
    const catalog = getCatalog(language);
    const missing: string[] = [];
    for (const [, entry] of entries) {
      for (const version of [entry.harder, entry.expert, entry.superHard, entry.extreme]) {
        if (!version) continue;
        // Arabic-only choices (a letter or a word from an ayah) read the same in every language and are shown as they are.
        for (const text of typeof version === "string" ? [version] : version) if (/[A-Za-z]/.test(text) && !catalog[text]) missing.push(text);
      }
    }
    expect(missing).toEqual([]);
  });
});
