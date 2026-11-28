jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: jest.fn(async () => []),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve())
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import * as Speech from "expo-speech";
import { act, render, renderHook, screen } from "@testing-library/react-native";
import { setActiveLanguage } from "../i18n";
import { resetTeacherVoiceForTests, TEACHER_SPEAKER_ON } from "../services/teacherVoice";
import { ExerciseView } from "../ui/lesson/ExerciseView";
import { useMistakeVoice } from "../ui/lesson/useMistakeVoice";
import { useReadAloud } from "../ui/lesson/useReadAloud";

// Fahad did not like the phone's machine voice reading the app aloud (2026-11-28): no teacher speaker anywhere.
describe("the teacher's speaker is gone", () => {
  beforeEach(() => {
    resetTeacherVoiceForTests();
    setActiveLanguage("en");
  });

  it("is switched off", () => {
    expect(TEACHER_SPEAKER_ON).toBe(false);
  });

  it("shows no speaker on a wrong answer's sheet", async () => {
    const { result } = await renderHook(() => useMistakeVoice(true, false, "Umm al-Khayr", "Her name was Salma."));
    await act(async () => undefined);
    expect(result.current.onListen).toBeUndefined();
  });

  it("shows no speaker on a lesson page", async () => {
    const { result } = await renderHook(() => useReadAloud([{ key: "line", text: "Jibril came to the cave of Hira." }]));
    await act(async () => undefined);
    expect(result.current.onRead).toBeUndefined();
  });

  it("shows no speaker by CHECK, and says nothing", async () => {
    await render(
      <ExerciseView
        kind="multiple_choice"
        prompt="Twelve extra rak'ahs a day bring what?"
        choices={[
          { id: "a", label: "A house in Jannah" },
          { id: "b", label: "Wealth" }
        ]}
        correctChoiceId="a"
        mascotVariant="girl"
        accent="#58CC02"
        onCheck={jest.fn()}
        onContinue={jest.fn()}
        onSelect={jest.fn()}
        playSound={false}
      />
    );
    await act(async () => undefined);
    expect(screen.queryByTestId("question-read-aloud", { includeHiddenElements: true })).toBeNull();
    expect(Speech.speak).not.toHaveBeenCalled();
  });
});
