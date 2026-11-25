import { translateStudyText } from "../../services/contentLocalization";
import type { Challenge, Lesson, SupportedLanguage } from "../../types";
import { correctLabel, teachLesson, type TeachLesson } from "./lessonPages";
import { getLessonLine } from "./lessonSteps";
import { shortWhy } from "./lessonText";

// The learn card's line and the feedback sheet's Why line are cut from the English lesson by rules that
// read English sentences. Other languages translate the line the English rules picked, so every language
// shows the same sentence (scripts/i18n lists these lines for translation).

export function localizedLessonLine(english: Pick<Lesson, "intro" | "title"> & Partial<Pick<Lesson, "keyTakeaway" | "whatYouWillLearn" | "learnLine">>, language: SupportedLanguage) {
  return translateStudyText(getLessonLine(english), language);
}

// A question whose own note only repeats the question still gets a Why line: one sentence from its own source, written
// for it and checked against that source (src/data/sourceWhys.json, keyed by the question and its right answer).
let sourceWhys: Record<string, string> | undefined;

export function sourceWhy(prompt: string, answer: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  sourceWhys ??= require("../../data/sourceWhys.json") as Record<string, string>;
  return sourceWhys[`${prompt.trim()}\n${answer.trim()}`];
}

type WhyChallenge = Pick<Challenge, "explanation" | "easierExplanation" | "prompt" | "choices" | "correctChoiceId"> & Partial<Pick<Challenge, "tierBase">>;

export function englishWhy(challenge: WhyChallenge): string | undefined {
  // A harder or expert wording of a question keeps its answer and source, so it keeps the lesson question's Why too
  // (the reworded prompt would otherwise miss its source Why, or let the note's repeat of the old prompt through).
  if (challenge.tierBase) {
    return englishWhy(challenge.tierBase) ?? englishWhy({ ...challenge, tierBase: undefined });
  }
  const answer = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  return (
    shortWhy({
      explanation: challenge.explanation,
      easierExplanation: challenge.easierExplanation,
      prompt: challenge.prompt,
      correctLabel: answer
    }) ?? sourceWhy(challenge.prompt, answer)
  );
}

export function localizedWhy(challenge: WhyChallenge, language: SupportedLanguage) {
  const why = englishWhy(challenge);
  return why && translateStudyText(why, language);
}

/**
 * The Good to know page in the learner's language. Its shape (a sentence, or a flash card) is chosen from the English
 * question, since the rules read English words; then each part is translated. A sentence with no translation yet is
 * left out (an English sentence never shows in another language): the page shows the translated flash card instead.
 */
export function localizedTeach(english: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "explanation" | "type">, language: SupportedLanguage): TeachLesson {
  const teach = teachLesson(english);
  if (language === "en") return teach;
  const prompt = english.prompt.trim();
  const answer = correctLabel(english).trim();
  const answerShown = translateStudyText(answer, language);
  const promptShown = translateStudyText(prompt, language);
  const filled = /_{2,}/.test(prompt) ? prompt.replace(/_{2,}/, answer) : undefined;
  const lines = teach.lines.flatMap((line) => {
    const text = line.trim();
    if (filled && text === filled) return promptShown !== prompt && /_{2,}/.test(promptShown) ? [promptShown.replace(/_{2,}/, answerShown)] : [];
    const shown = translateStudyText(text, language);
    return shown.trim() !== text ? [shown] : [];
  });
  const card = teach.card ?? (lines.length ? undefined : { question: prompt, answer });
  return {
    lines,
    card: card && { ...card, question: translateStudyText(card.question, language), answer: translateStudyText(card.answer, language) },
    answer: teach.answer && answerShown
  };
}
