import { COURSE, LESSONS_BY_ID } from "../data/course";
import { atTier, QUESTION_TIERS, tierForLevel } from "../data/questionTiers";
import { getCatalog } from "../translations";
import type { Challenge } from "../types";

// Fahad (2026-11-24): "for the same answer, rewrite it in a harder way", a few levels for every category, asked when
// the learner wants it harder. Each tier keeps the question's answer and source.

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
      for (const version of [entry.harder, entry.expert]) {
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
      for (const tier of [2, 3] as const) {
        const asked = atTier(base, tier);
        expect(answerOf(asked)).toBe(answerOf(base));
        expect(asked.source).toBe(base.source);
        expect(asked.explanation).toBe(base.explanation);
        expect(asked.resourceUrl).toBe(base.resourceUrl);
        expect(atTier(asked, 1)).toBe(base);
        if (asked !== base) expect(asked.id).toMatch(new RegExp(`^${base.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_t[23]$`));
      }
    }
  });

  it("leave a question with no tiers as it is", () => {
    const plain: Challenge = { id: "x", type: "multiple_choice", prompt: "Not tiered?", choices: [{ id: "a", label: "Yes" }, { id: "b", label: "No" }], correctChoiceId: "a", explanation: "" };
    expect(atTier(plain, 3)).toBe(plain);
  });

  it("ask Normal up to level 1, Harder at 2 and 3, Expert at 4 and 5", () => {
    expect([0, 1, 2, 3, 4, 5].map(tierForLevel)).toEqual([1, 1, 2, 2, 3, 3]);
  });

  it.each(["bn", "ur", "ar"] as const)("are all translated into %s", (language) => {
    const catalog = getCatalog(language);
    const missing: string[] = [];
    for (const [, entry] of entries) {
      for (const version of [entry.harder, entry.expert]) {
        if (!version) continue;
        for (const text of typeof version === "string" ? [version] : version) if (!catalog[text]) missing.push(text);
      }
    }
    expect(missing).toEqual([]);
  });
});
