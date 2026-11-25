import { useSyncExternalStore } from "react";
import { dayKey } from "./dailyQuests";
import { familyWeekDaysLeft, familyWeekStart } from "./familyWeek";

/**
 * Weekly missions: three bigger goals for the week, Monday to Sunday (the league's and the family's week), and a
 * big chest of dates once all three are done. The daily quests bring a learner back today; the missions bring them
 * back across the week. A new set each Monday, the same for the whole week, the same for everyone that week. An
 * unfinished week simply ends: nothing is lost, and Monday starts fresh. Kept on this phone, like the daily quests.
 */
export type MissionKind = "days" | "lessons" | "correct" | "perfect" | "questDays";
export type Mission = { id: string; kind: MissionKind; target: number };
export type MissionWeek = {
  /** The Monday the week started (YYYY-MM-DD). */
  week: string;
  progress: Partial<Record<string, number>>;
  /** Days this week with a finished lesson or practice. */
  days: string[];
  /** Days this week the daily quests' chest was opened. */
  questDays: string[];
  claimed: boolean;
};

/** Dates in the weekly chest: enough for a streak freeze. */
export const MISSION_CHEST_DATES = 50;

const KEY = "sira-path-weekly-missions" as const;

/** Learn on 4 of the 7 days: most of the week, with room for a busy day or two. */
const DAYS_TARGET = 4;
const LESSON_TARGETS = [10, 12, 15];
/** The third mission changes each week, with a few sizes each; the week picks one. */
const POOL: { kind: MissionKind; targets: number[] }[] = [
  { kind: "correct", targets: [60, 80, 100] },
  { kind: "perfect", targets: [3, 4] },
  { kind: "questDays", targets: [3] }
];

function seedOf(text: string) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** The Monday of this phone's week, as a day key. */
export function weekKey(now = new Date()) {
  return familyWeekStart(dayKey(now));
}

/** The week's three missions: learn on 4 days, finish some lessons, and one more that changes weekly. */
export function missionsFor(week: string): Mission[] {
  const seed = seedOf(`week-${week}`);
  const third = POOL[seed % POOL.length];
  return [
    { id: "days", kind: "days", target: DAYS_TARGET },
    { id: "lessons", kind: "lessons", target: LESSON_TARGETS[(seed >>> 6) % LESSON_TARGETS.length] },
    { id: third.kind, kind: third.kind, target: third.targets[(seed >>> 10) % third.targets.length] }
  ];
}

const listeners = new Set<() => void>();
let memory: MissionWeek | undefined;

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

function fresh(week: string): MissionWeek {
  return { week, progress: {}, days: [], questDays: [], claimed: false };
}

function read(now = new Date()): MissionWeek {
  const week = weekKey(now);
  let saved: MissionWeek | undefined = memory;
  try {
    const raw = storage()?.getStoredItem(KEY);
    if (raw) saved = JSON.parse(raw) as MissionWeek;
  } catch {
    // A broken save starts the week fresh.
  }
  if (!saved || saved.week !== week) return fresh(week);
  return { ...fresh(week), ...saved, days: saved.days ?? [], questDays: saved.questDays ?? [] };
}

function write(next: MissionWeek) {
  memory = next;
  cached = undefined;
  try {
    storage()?.setStoredItem(KEY, JSON.stringify(next));
  } catch {
    // Kept in memory for this run.
  }
  for (const listener of listeners) listener();
}

function countOf(saved: MissionWeek, mission: Mission) {
  if (mission.kind === "days") return saved.days.length;
  if (mission.kind === "questDays") return saved.questDays.length;
  return saved.progress[mission.id] ?? 0;
}

export type MissionStatus = { mission: Mission; progress: number; done: boolean };
export type MissionBoard = {
  week: string;
  missions: MissionStatus[];
  doneCount: number;
  allDone: boolean;
  claimed: boolean;
  /** Days left in the week, today included: Monday 7, Sunday 1. */
  daysLeft: number;
};

export function missionBoard(now = new Date()): MissionBoard {
  const saved = read(now);
  const missions = missionsFor(saved.week).map((mission) => {
    const progress = Math.min(mission.target, countOf(saved, mission));
    return { mission, progress, done: progress >= mission.target };
  });
  const doneCount = missions.filter((mission) => mission.done).length;
  return { week: saved.week, missions, doneCount, allDone: doneCount === missions.length, claimed: saved.claimed, daysLeft: familyWeekDaysLeft(dayKey(now)) };
}

export type MissionEvent = { type: "answer"; correct: boolean } | { type: "lesson"; perfect: boolean } | { type: "questChest" };

/** Counts what just happened towards this week's missions. Returns the missions this finished (to cheer them). */
export function recordMissionEvent(event: MissionEvent, now = new Date()): Mission[] {
  const saved = read(now);
  const missions = missionsFor(saved.week);
  const today = dayKey(now);
  const next: MissionWeek = { ...saved, progress: { ...saved.progress } };
  const has = (kind: MissionKind) => missions.some((mission) => mission.kind === kind);
  const add = (kind: MissionKind) => {
    if (has(kind)) next.progress[kind] = (next.progress[kind] ?? 0) + 1;
  };
  if (event.type === "answer") {
    if (event.correct) add("correct");
  } else if (event.type === "lesson") {
    add("lessons");
    if (event.perfect) add("perfect");
    if (!next.days.includes(today)) next.days = [...next.days, today];
  } else if (!next.questDays.includes(today)) {
    next.questDays = [...next.questDays, today];
  }
  const finished = missions.filter((mission) => countOf(saved, mission) < mission.target && countOf(next, mission) >= mission.target);
  write(next);
  return finished;
}

/** Opens the week's chest once all three missions are done. Returns the dates it pays (0 if not ready or already open). */
export function claimMissionChest(now = new Date()): number {
  const board = missionBoard(now);
  if (!board.allDone || board.claimed) return 0;
  write({ ...read(now), claimed: true });
  return MISSION_CHEST_DATES;
}

let cached: MissionBoard | undefined;
let cachedDay = "";

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot() {
  const today = dayKey();
  if (!cached || cachedDay !== today) {
    cached = missionBoard();
    cachedDay = today;
  }
  return cached;
}

/** This week's missions, drawn again whenever one moves on (and each new day, for the days left). */
export function useMissionBoard() {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

/** For tests: forget the week. */
export function resetMissionsForTests() {
  memory = undefined;
  cached = undefined;
  storage()?.setStoredItem(KEY, "");
}
