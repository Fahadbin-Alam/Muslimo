// The order a lesson asks its questions in, Duolingo style: each question once, then every missed question
// comes back at the end (with its tiles in a new order), again and again until it is answered right. The
// lesson is done only when every question has been right once. A test asks each question once and never
// again, so what it scores is what the learner knew.
//
// A lesson's queue also holds its learn pages and the ordering game (src/ui/lesson/lessonPages.ts): learn,
// answer, learn, answer, then the circle's quiz.

import { isQuestionStep, type FlowStep, type QuestionStep } from "../ui/lesson/lessonPages";

/** One question to ask: its index in lesson.challenges and which try it is (0 the first time). */
export type LessonStep = QuestionStep;
export type { FlowStep };

/** Every question once, in the lesson's order. */
export function startLessonQueue(challengeCount: number): LessonStep[] {
  return Array.from({ length: Math.max(0, challengeCount) }, (_, index) => ({ index, attempt: 0 }));
}

/**
 * What one answer does to the queue. A miss in a lesson, on any try, goes to the end once more as the next
 * try, unless the circle's quiz asks it again later anyway; a right answer, or any answer in a test, is that
 * question done.
 */
export function answerLessonStep<T extends FlowStep>(queue: T[], position: number, correct: boolean, isTest: boolean) {
  const step = queue[position];
  const question = isQuestionStep(step) ? step : undefined;
  const askedLater = Boolean(question) && queue.slice(position + 1).some((later) => isQuestionStep(later) && later.index === question!.index);
  const requeue = Boolean(question) && !correct && !isTest && !askedLater;

  return {
    queue: requeue ? [...queue, { index: question!.index, attempt: question!.attempt + 1, ...(question!.quiz ? { quiz: true } : {}) } as T] : queue,
    requeued: requeue,
    /** The question is finished, so the progress bar moves on. */
    done: Boolean(question) && !requeue
  };
}

/** True when the step at `position` is the last one the queue holds. */
export function isLastLessonStep(queue: FlowStep[], position: number) {
  return position >= queue.length - 1;
}

/**
 * The queue with the questions not yet asked whose index `drop` picks taken out (after `position` only, first tries
 * only), and how many went. A wrong answer in a lesson eases off this way: the harder questions added for a run of
 * right answers, still waiting, are not asked.
 */
export function withoutWaitingQuestions<T extends FlowStep>(queue: T[], position: number, drop: (index: number) => boolean) {
  const kept = queue.filter((step, at) => at <= position || !isQuestionStep(step) || step.attempt > 0 || !drop(step.index));
  return { queue: kept, removed: queue.length - kept.length };
}
