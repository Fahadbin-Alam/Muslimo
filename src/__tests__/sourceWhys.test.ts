/**
 * The Why lines written from each question's own source (src/data/sourceWhys.json), for questions whose own note only
 * repeats the question. Each one is shown whole after an answer, so it must pass the Why rules unchanged.
 */
import { lessonForAge } from "../data/ageLevels";
import { LESSONS_BY_ID } from "../data/course";
import { ALL_HARD_QUESTIONS } from "../data/hardQuestions";
import { atTier, hasTiers } from "../data/questionTiers";
import { englishWhy, sourceWhy } from "../ui/lesson/localizedLines";
import { shortWhy, WHY_MAX } from "../ui/lesson/lessonText";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const WHYS: Record<string, string> = require("../data/sourceWhys.json");

const questions = new Map<string, { prompt: string; answer: string; noted: boolean }>();
// Every question a learner can meet: each lesson, a young child's version of it, and the harder streak questions.
const challenges = [
  ...Object.values(LESSONS_BY_ID).flatMap((lesson) => [...lesson.challenges, ...lessonForAge(lesson, "6-9").challenges]),
  ...ALL_HARD_QUESTIONS
];
{
  for (const challenge of challenges) {
    const answer = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
    const noted = Boolean(shortWhy({ explanation: challenge.explanation, easierExplanation: challenge.easierExplanation, prompt: challenge.prompt, correctLabel: answer }));
    const key = `${challenge.prompt.trim()}\n${answer.trim()}`;
    // The same question can sit in two lessons, with a note only one of them can cut a Why from.
    questions.set(key, { prompt: challenge.prompt, answer, noted: noted && (questions.get(key)?.noted ?? true) });
  }
}

test("every source Why belongs to a question that has no Why of its own", () => {
  const stale = Object.keys(WHYS).filter((key) => !questions.get(key) || questions.get(key)!.noted);
  expect(stale.slice(0, 5)).toEqual([]);
});

test("every source Why is one short line the Why rules keep whole", () => {
  const bad = Object.entries(WHYS).filter(([key, why]) => {
    const question = questions.get(key);
    if (!question) return false;
    return (
      why.length > WHY_MAX ||
      /["“”‘’]/.test(why) ||
      /^(It|I|We)\b/.test(why) ||
      /\blearners?\b/i.test(why) ||
      /\bthe (Prophet|Messenger)(?!s\b|'s ﷺ| ﷺ)/.test(why) ||
      shortWhy({ explanation: why, prompt: question.prompt, correctLabel: question.answer }) !== why
    );
  });
  expect(bad.slice(0, 5)).toEqual([]);
});

test("a question with no Why of its own shows its source Why", () => {
  const [key] = Object.keys(WHYS);
  if (!key) return;
  const { prompt, answer } = questions.get(key)!;
  expect(sourceWhy(prompt, answer)).toBe(WHYS[key]);
  expect(englishWhy({ prompt, explanation: "", choices: [{ id: "a", label: answer }], correctChoiceId: "a" })).toBe(WHYS[key]);
});

test("a harder or expert wording shows its lesson question's Why", () => {
  const lost: string[] = [];
  for (const lesson of Object.values(LESSONS_BY_ID)) {
    for (const challenge of lesson.challenges) {
      if (!hasTiers(challenge)) continue;
      const why = englishWhy(challenge);
      if (!why) continue;
      for (const tier of [2, 3] as const) {
        const harder = atTier(challenge, tier);
        if (harder !== challenge && englishWhy(harder) !== why) lost.push(`${harder.prompt} (${why})`);
      }
    }
  }
  expect(lost.slice(0, 5)).toEqual([]);
});
