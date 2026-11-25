jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("expo-speech", () => ({
  getAvailableVoicesAsync: async () => [],
  speak: jest.fn(),
  stop: jest.fn()
}));
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-audio", () => ({
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    replace: jest.fn(),
    seekTo: jest.fn(() => Promise.resolve()),
    addListener: jest.fn(() => ({ remove: jest.fn() }))
  }))
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { MEMORIZE_DUA_LESSONS, memorizeDuas } from "../data/memorizeDuas";
import { QURAN_AYAHS } from "../data/quranAyahs";
import { ayahPieces } from "../services/ayahWords";
import { translateStudyText } from "../services/contentLocalization";
import { HIDE_ROUNDS, hiddenCount, hiddenWords, hideOrder, hideStars } from "../services/hideWords";
import { quranAudioUrl } from "../services/quranAudio";
import { hifzAyahs, memorizeParts } from "../ui/lesson/reciteQuestion";
import { MemorizeSheet, resetMemorizeSheetForTests, type MemorizeDuaRow, type MemorizeSheetRow } from "../ui/screens/MemorizeSheet";

// Memorize mode: on top of listening and "Which ayah comes next?", a surah's page has "Hide words", and a Duas tab
// lists the duas the Duas lessons quote. The text shows in full, then each round hides more of its words until the
// learner says all of it from memory. The learner says it, taps Check and says if they knew it: no answer tiles.

const rows: MemorizeSheetRow[] = memorizeParts().map((part) => ({
  id: part.id,
  surah: part.surah,
  title: `Surah ${part.surah}`,
  line: `${part.to - part.from + 1} ayahs`,
  stars: 0,
  ayahs: hifzAyahs(part),
  surahAyahs: part.ayahs
}));
const duaRows = (): MemorizeDuaRow[] =>
  memorizeDuas().map((dua) => ({ id: dua.id, title: dua.title, text: dua.text, reference: dua.reference, stars: 0, recitation: dua.recitation }));

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}
const gaps = () => screen.queryAllByTestId(/^hide-gap-/);
const words = (text: string) => ayahPieces(text).words;

describe("hiding words", () => {
  it("hides none first, then more each round (the same ones and more), then all of them", () => {
    for (const total of [3, 4, 9, 27, 61]) {
      expect(hiddenCount(total, 0)).toBe(0);
      expect(hiddenCount(total, HIDE_ROUNDS.length - 1)).toBe(total);
      let before = new Set<number>();
      for (let round = 1; round < HIDE_ROUNDS.length; round += 1) {
        const now = hiddenWords(total, round, "dua:test");
        // Short ones may hide the same count twice; longer ones always hide more.
        if (total >= 9) expect(now.size).toBeGreaterThan(before.size);
        else expect(now.size).toBeGreaterThanOrEqual(before.size);
        if (round < HIDE_ROUNDS.length - 1) expect(now.size).toBeLessThan(total);
        before.forEach((word) => expect(now.has(word)).toBe(true));
        before = now;
      }
    }
  });

  it("hides in the same order every time for one dua, and another order for another", () => {
    expect(hideOrder(20, "dua:adhkar-master")).toEqual(hideOrder(20, "dua:adhkar-master"));
    expect(hideOrder(20, "dua:adhkar-master")).not.toEqual(hideOrder(20, "dua:sleep-kursi"));
    expect([...hideOrder(20, "112")].sort((a, b) => a - b)).toEqual(Array.from({ length: 20 }, (_, index) => index));
  });

  it("gives three stars with no miss, two with one or two, one with more", () => {
    expect([0, 1, 2, 3, 7].map(hideStars)).toEqual([3, 2, 2, 1, 1]);
  });
});

describe("the duas to memorize", () => {
  const duas = memorizeDuas();

  it("are every listed Duas lesson, each with its quote word for word, its source, and no surah twice", () => {
    expect(duas).toHaveLength(MEMORIZE_DUA_LESSONS.length);
    expect(new Set(duas.map((dua) => dua.text)).size).toBe(duas.length);
    for (const dua of duas) {
      const lesson = LESSONS_BY_ID[dua.lessonId];
      expect(lesson.quote!.text).toBe(dua.text);
      expect(dua.title).toBe(lesson.title);
      expect(dua.source.url).toMatch(/^https:\/\//);
      expect(dua.reference.trim()).not.toBe("");
      expect(words(dua.text)).toBeGreaterThanOrEqual(2);
      // Surahs are memorized in Memorize surahs.
      expect(memorizeParts().some((part) => dua.reference === `Quran ${part.surah}:${part.from}`)).toBe(false);
    }
  });

  it("are Quran text exactly as the app shows it, with the reciter, when they are an ayah", () => {
    const quran = duas.filter((dua) => dua.reference.startsWith("Quran "));
    expect(quran.length).toBeGreaterThan(20);
    for (const dua of quran) {
      expect(dua.text).toBe(QURAN_AYAHS[dua.reference.replace("Quran ", "")]);
      expect(dua.recitation).toBe(quranAudioUrl(dua.reference));
    }
    duas.filter((dua) => !dua.reference.startsWith("Quran ")).forEach((dua) => expect(dua.recitation).toBeUndefined());
  });

  it.each(["bn", "ur", "ar"] as const)("have their names and sources in %s", (language) => {
    for (const dua of duas) {
      expect(translateStudyText(dua.title, language)).not.toBe(dua.title);
      expect(translateStudyText(dua.reference, language)).not.toBe(dua.reference);
    }
  });
});

describe("Memorize: hide words", () => {
  beforeEach(() => resetMemorizeSheetForTests());

  it("opens on a surah's page, shows its ayahs with their numbers, and goes back to the page when done", async () => {
    await render(<MemorizeSheet visible onClose={jest.fn()} rows={rows} onStart={jest.fn()} duas={duaRows()} />);
    await press("memorize-112");
    await press("memorize-hide");
    expect(screen.getByTestId("hide-round").props.children).toBe("Round 1 of 5");
    expect(gaps()).toHaveLength(0);
    ["112:1", "112:2", "112:3", "112:4"].forEach((key) => expect(screen.getByTestId(`hide-passage-${key}`)).toBeTruthy());
    expect(screen.getByText(/﴿٤﴾/)).toBeTruthy();
    expect(screen.getByTestId("hide-listen")).toBeTruthy();
    const total = hifzAyahs(memorizeParts().find((part) => part.id === "112")!).reduce((count, ayah) => count + words(ayah.text), 0);
    for (let round = 1; round < HIDE_ROUNDS.length; round += 1) {
      await press(round === 1 ? "hide-start" : "hide-knew");
      expect(gaps()).toHaveLength(hiddenCount(total, round));
      await press("hide-check");
    }
    await press("hide-knew");
    await press("hide-done");
    expect(screen.getByTestId("memorize-practice")).toBeTruthy();
  });

  it("lists the duas in their own tab, and says one from memory to three stars", async () => {
    const onDuaFinish = jest.fn();
    const onOpenDuaSource = jest.fn();
    await render(<MemorizeSheet visible onClose={jest.fn()} rows={rows} onStart={jest.fn()} duas={duaRows()} onDuaFinish={onDuaFinish} onOpenDuaSource={onOpenDuaSource} />);
    expect(screen.queryByTestId("memorize-duas")).toBeNull();
    await press("memorize-tab-duas");
    expect(screen.getByText("Memorize duas")).toBeTruthy();
    expect(screen.getByTestId("memorize-dua:adhkar-master")).toBeTruthy();
    await press("memorize-dua:adhkar-master");
    expect(screen.getByText("The master of asking forgiveness")).toBeTruthy();
    // Hadith duas have no reciter; their source opens.
    expect(screen.queryByTestId("hide-listen")).toBeNull();
    await press("hide-source");
    expect(onOpenDuaSource).toHaveBeenCalledWith("dua:adhkar-master");
    await press("hide-start");
    for (let round = 1; round < HIDE_ROUNDS.length; round += 1) {
      await press("hide-check");
      expect(screen.queryAllByTestId(/^hide-shown-/).length).toBeGreaterThan(0);
      await press("hide-knew");
    }
    expect(screen.getByText("Said from memory!")).toBeTruthy();
    expect(onDuaFinish).toHaveBeenCalledWith("dua:adhkar-master", 3);
    await press("hide-done");
    // Back on the duas, which stays the tab open.
    expect(screen.getByTestId("memorize-duas")).toBeTruthy();
  });

  it("lets a gap be peeked at, tries a round again after Not yet, and gives fewer stars for it", async () => {
    const onDuaFinish = jest.fn();
    await render(<MemorizeSheet visible onClose={jest.fn()} rows={rows} onStart={jest.fn()} duas={duaRows()} onDuaFinish={onDuaFinish} />);
    await press("memorize-tab-duas");
    await press("memorize-dua:sleep-waking");
    await press("hide-start");
    const first = gaps()[0];
    const word = String(first.props.testID).replace("hide-gap-", "");
    await act(async () => {
      fireEvent.press(first);
    });
    expect(screen.getByTestId(`hide-peeked-${word}`)).toBeTruthy();
    await press("hide-check");
    await press("hide-not-yet");
    // The same round again, every gap hidden again.
    expect(screen.getByTestId("hide-round").props.children).toBe("Round 2 of 5");
    expect(screen.queryByTestId(`hide-peeked-${word}`)).toBeNull();
    for (let round = 1; round < HIDE_ROUNDS.length; round += 1) {
      await press("hide-check");
      await press("hide-knew");
    }
    expect(onDuaFinish).toHaveBeenCalledWith("dua:sleep-waking", 2);
    expect(screen.getByTestId("hide-stars").props.accessibilityLabel).toBe("2 of 3 stars");
  });

  it("plays the reciter for a dua that is an ayah", async () => {
    await render(<MemorizeSheet visible onClose={jest.fn()} rows={rows} onStart={jest.fn()} duas={duaRows()} />);
    await press("memorize-tab-duas");
    await press("memorize-dua:quran-best");
    expect(screen.getByTestId("hide-listen")).toBeTruthy();
  });

  it("has no Duas tab without duas", async () => {
    await render(<MemorizeSheet visible onClose={jest.fn()} rows={rows} onStart={jest.fn()} />);
    expect(screen.queryByTestId("memorize-tab-duas")).toBeNull();
  });
});
