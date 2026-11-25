import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import {
  claimMissionChest,
  MISSION_CHEST_DATES,
  missionBoard,
  missionsFor,
  recordMissionEvent,
  resetMissionsForTests,
  weekKey
} from "../services/weeklyMissions";
import { resetQuestsForTests } from "../services/dailyQuests";
import { LessonComplete } from "../ui/lesson/LessonComplete";
import { QuestsBanner, QuestsSheet, missionLabel } from "../ui/screens/DailyQuests";
import { questBoard } from "../services/dailyQuests";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// Wednesday 25 November 2026, local time; its week started Monday the 23rd.
const WED = new Date(2026, 10, 25, 10);
const at = (day: number, hour = 10) => new Date(2026, 10, day, hour);

beforeEach(() => {
  resetMissionsForTests();
  resetQuestsForTests();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("weekly missions", () => {
  it("runs Monday to Sunday, like the league and the family week", () => {
    expect(weekKey(at(23))).toBe("2026-11-23");
    expect(weekKey(WED)).toBe("2026-11-23");
    expect(weekKey(at(29, 23))).toBe("2026-11-23");
    expect(weekKey(at(30, 0))).toBe("2026-11-30");
    expect(missionBoard(at(23)).daysLeft).toBe(7);
    expect(missionBoard(at(29)).daysLeft).toBe(1);
  });

  it("gives three steady missions a week: learn on 4 days, finish some lessons, and one that changes", () => {
    const week = missionsFor("2026-11-23");
    expect(week).toEqual(missionsFor("2026-11-23"));
    expect(week.map((mission) => mission.kind).slice(0, 2)).toEqual(["days", "lessons"]);
    expect(week[0].target).toBe(4);
    const thirds = new Set(Array.from({ length: 20 }, (_, index) => missionsFor(`2027-01-${String(index + 1).padStart(2, "0")}`)[2].kind));
    expect(thirds.size).toBeGreaterThan(1);
    for (const mission of week) expect(missionLabel(mission)).not.toMatch(/\{/);
  });

  it("counts a learning day once, however many lessons it holds", () => {
    recordMissionEvent({ type: "lesson", perfect: false }, at(23));
    recordMissionEvent({ type: "lesson", perfect: false }, at(23, 18));
    recordMissionEvent({ type: "lesson", perfect: true }, at(24));
    const board = missionBoard(WED);
    expect(board.missions.find((status) => status.mission.kind === "days")?.progress).toBe(2);
    expect(board.missions.find((status) => status.mission.kind === "lessons")?.progress).toBe(3);
  });

  it("says which mission a lesson finished, opens the big chest once, and starts fresh on Monday", () => {
    const missions = missionsFor(weekKey(WED));
    const lessons = missions.find((mission) => mission.kind === "lessons")!.target;
    const third = missions[2];
    const finished: string[] = [];
    // Four days, enough lessons, and whatever the third mission asks.
    for (let index = 0; index < lessons; index += 1) {
      const day = 23 + (index % 4);
      finished.push(...recordMissionEvent({ type: "lesson", perfect: true }, at(day)).map((mission) => mission.id));
    }
    for (let index = 0; index < 120; index += 1) recordMissionEvent({ type: "answer", correct: true }, WED);
    for (const day of [23, 24, 25]) finished.push(...recordMissionEvent({ type: "questChest" }, at(day)).map((mission) => mission.id));
    expect(finished).toEqual(expect.arrayContaining(["days", "lessons"]));
    if (third.kind === "questDays") expect(finished).toContain("questDays");

    const board = missionBoard(at(26));
    expect(board.allDone).toBe(true);
    expect(claimMissionChest(at(26))).toBe(MISSION_CHEST_DATES);
    expect(claimMissionChest(at(26))).toBe(0);
    expect(missionBoard(at(27)).claimed).toBe(true);

    const monday = missionBoard(at(30));
    expect(monday.claimed).toBe(false);
    expect(monday.doneCount).toBe(0);
  });

  it("pays nothing before all three are done", () => {
    recordMissionEvent({ type: "lesson", perfect: false }, WED);
    expect(claimMissionChest(WED)).toBe(0);
  });
});

describe("the lesson complete card", () => {
  beforeEach(() => jest.useFakeTimers());

  it("cheers a finished mission on the lesson complete card", async () => {
    await render(
      <LessonComplete
        title="Wudu"
        xp={12}
        stars={3}
        streakDays={2}
        missionsDone={["Learn on 4 days this week"]}
        mascotVariant="boy"
        accent="#21B573"
        onContinue={jest.fn()}
      />
    );
    await act(async () => {
      jest.advanceTimersByTime(6000);
    });
    expect(screen.getByText("Weekly mission done: Learn on 4 days this week")).toBeTruthy();
  });
});

describe("weekly missions on screen", () => {
  // The chest wiggles and the sheet slides: fake timers keep those loops inside each test.
  beforeEach(() => jest.useFakeTimers());

  it("shows the week's missions under the day's quests, with the days left", async () => {
    await render(<QuestsSheet visible board={questBoard()} missions={missionBoard(WED)} onClaim={jest.fn()} onClaimMissions={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByTestId("weekly-missions")).toBeTruthy();
    expect(screen.getByText("Weekly missions")).toBeTruthy();
    expect(screen.getByText("5 days left")).toBeTruthy();
    expect(screen.getByText("Learn on 4 days this week")).toBeTruthy();
    expect(screen.getByText(`Finish all three this week for a big chest with ${MISSION_CHEST_DATES} dates.`)).toBeTruthy();
    expect(screen.queryByTestId("missions-claim")).toBeNull();
  });

  it("offers the big chest once the week is done, and lights the banner", async () => {
    const done = missionBoard(WED);
    const ready = { ...done, allDone: true, doneCount: 3, missions: done.missions.map((status) => ({ ...status, progress: status.mission.target, done: true })) };
    const onClaimMissions = jest.fn();
    await render(<QuestsSheet visible board={questBoard()} missions={ready} onClaim={jest.fn()} onClaimMissions={onClaimMissions} onClose={jest.fn()} />);
    fireEvent.press(screen.getByTestId("missions-claim"));
    expect(onClaimMissions).toHaveBeenCalled();

    await render(<QuestsBanner board={questBoard()} missions={ready} onOpen={jest.fn()} />);
    expect(screen.getByTestId("path-quests-line").props.children).toBe("Your weekly chest is ready!");
  });
});
