jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));

import React from "react";
import { StyleSheet } from "react-native";
import type { TestInstance } from "test-renderer";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { choicePictures } from "../data/lessonPictures";
import { SIGN_SCENES, type SignKind } from "../data/signScenes";
import { setActiveLanguage } from "../i18n";
import { localizeLessonContent } from "../services/contentLocalization";
import { setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, Lesson } from "../types";
import { SignSceneView } from "../ui/journey/SignScene";
import { leadMs, momentMs } from "../ui/journey/SignScene";
import { keyAt, signArt } from "../ui/journey/signArt";
import { SceneGame } from "../ui/lesson/SceneGame";
import { cardsFor } from "../ui/lesson/cardQuestions";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { monthsFor } from "../ui/lesson/monthQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { sceneAsks, sceneMoment, sceneQuestionFor } from "../ui/lesson/sceneQuestions";
import { skyTimesFor } from "../ui/lesson/skyQuestions";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: more interactive questions, with living pictures. A question on a moment of one of the living scenes that
// lessons open on (the ark coming to rest on al-Judi, the twelve springs, the ant calling the others in) is asked on
// that scene: it plays up to just before the moment and waits with a "?", then plays the moment once answered.

const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

afterEach(() => {
  variety(false);
  setActiveLanguage("en");
});

// The scene is a picture, hidden from screen readers (the tiles say each answer).
const ALL = { includeHiddenElements: true };

const ALL_CHALLENGES = (Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lesson.challenges.map((challenge) => ({ lesson, challenge })));
const rightOf = (challenge: Challenge) => challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";

describe("which questions are asked on a scene", () => {
  it("asks each story question that was read with its scene, wherever the course asks it", () => {
    const asks = sceneAsks();
    // Each one was read with its scene: its right answer is what the moment shows, and the scene before it does not
    // show it. A question changed in the course fails here until it is read again.
    expect(asks.length).toBe(877);
    let places = 0;
    for (const ask of asks) {
      const found = ALL_CHALLENGES.filter(({ challenge }) => challenge.prompt === ask.prompt && rightOf(challenge) === ask.answer);
      expect([ask.prompt, found.length > 0]).toEqual([ask.prompt, true]);
      places += found.length;
      for (const { challenge } of found) {
        const shown = sceneQuestionFor(challenge);
        expect([ask.prompt, shown?.scene.id]).toEqual([ask.prompt, ask.sceneId]);
        // Not a time, a month, a place or a drawn thing: those are asked on their own pictures, so this one is on its scene.
        const multiple = challenge.type === "multiple_choice";
        expect([ask.prompt, Boolean(challenge.listen), multiple && Boolean(skyTimesFor(challenge) || monthsFor(challenge) || cardsFor(challenge) || mapPlacesFor(challenge) || choicePictures(challenge.choices))]).toEqual([
          ask.prompt,
          false,
          false
        ]);
      }
    }
    expect(places).toBe(1239);
  });

  it("finds a question by its prompt and its right answer, so another question with the same prompt is not asked on it", () => {
    const army = ALL_CHALLENGES.find(({ challenge }) => challenge.prompt === "Ayahs 1-2: what are they about?" && rightOf(challenge) === "The army of the elephant")!.challenge;
    expect(sceneQuestionFor(army)?.scene.kind).toBe("elephant");
    const others = ALL_CHALLENGES.filter(({ challenge }) => challenge.prompt === "Ayahs 1-2: what are they about?" && rightOf(challenge) !== "The army of the elephant" && rightOf(challenge) !== "Two journeys");
    expect(others.length).toBeGreaterThan(3);
    for (const { challenge } of others) expect(sceneQuestionFor(challenge)).toBeUndefined();
  });

  it("is a way of asking of its own, always used for a story question, true or false ones too", () => {
    variety(true);
    const judi = ALL_CHALLENGES.find(({ challenge }) => challenge.prompt === "Where did the Ark come to rest?")!.challenge;
    const camel = ALL_CHALLENGES.find(({ challenge }) => challenge.prompt === "The she-camel was a sign from Allah.")!.challenge;
    expect(camel.type).toBe("true_false");
    for (const challenge of [judi, camel]) {
      expect(questionFormat(challenge, { scene: true })).toBe("scene");
      expect(questionFormat(challenge, { scene: true, recall: true, language: "ur" })).toBe("scene");
      expect(questionFormat(challenge, {})).not.toBe("scene");
    }
    // Answers with pictures of their own keep them.
    expect(questionFormat(judi, { scene: true, cards: true })).toBe("cards");
    expect(questionFormat(judi, { scene: true, sky: true })).toBe("sky");
    expect(questionFormat({ ...judi, listen: { text: "x" } } as unknown as Challenge, { scene: true })).toBe("choose");
    variety(false);
    expect(questionFormat(judi, { scene: true })).toBe("choose");
  });
});

describe("where the scene waits and where it stops", () => {
  it("waits where the moment before ends, so nothing of the moment and none of its words show yet", () => {
    for (const ask of sceneAsks()) {
      const scene = SIGN_SCENES.find((each) => each.id === ask.sceneId)!;
      const words = signArt(scene.kind).words;
      const first = words.findIndex((word) => word.text === ask.from);
      const last = words.findIndex((word) => word.text === ask.to);
      expect([ask.prompt, first >= 0, last >= first]).toEqual([ask.prompt, true, true]);
      const moment = sceneMoment(scene.kind, ask.from, ask.to)!;
      // It waits where the words before end (their pill gone), or at the start, before any of the moment's words.
      expect([ask.prompt, moment.pause]).toEqual([ask.prompt, first > 0 ? words[first - 1].to : 0]);
      for (const word of words.slice(first, last + 1)) expect([ask.prompt, word.from > moment.pause]).toEqual([ask.prompt, true]);
      // It stops on the last moment, its words still showing.
      expect([ask.prompt, words[last].from < moment.reveal, moment.reveal <= words[last].to]).toEqual([ask.prompt, true, true]);
      expect([ask.prompt, moment.reveal === 1 || moment.reveal <= words[last].to - 0.025]).toEqual([ask.prompt, true]);
    }
  });

  // A part's keyed value at `t` of its scene's story (its resting value when it has no such key).
  const value = (kind: SignKind, name: string, key: "opacity" | "rotate" | "x" | "y" | "scale" | "scaleX" | "scaleY", t: number) => {
    const keys = signArt(kind).parts.find((each) => each.name === name)!.keys;
    const values = keys?.[key];
    return keys && values ? keyAt(keys.at, values, t) : key === "opacity" || key === "scale" || key === "scaleX" || key === "scaleY" ? 1 : 0;
  };
  // A part's keyed value while the question waits, and once it is answered.
  const moved = (prompt: string, name: string, key: "rotate" | "x" | "y" | "scale" | "scaleX" | "scaleY") => {
    const { kind, pause, reveal } = asked(prompt);
    return [value(kind, name, key, pause), value(kind, name, key, reveal)];
  };
  // The scene a story question is asked on, where it waits, and where it stops once answered (its right answer, when
  // another question has the same prompt).
  const asked = (prompt: string, answer?: string) => {
    const ask = sceneAsks().find((each) => each.prompt === prompt && (answer === undefined || each.answer === answer))!;
    const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
    return { kind, ...sceneMoment(kind, ask.from, ask.to)! };
  };
  // How much of each part shows while the question waits, and once it is answered.
  const shown = (prompt: string, names: string[], answer?: string) => {
    const { kind, pause, reveal } = asked(prompt, answer);
    return [names.map((name) => value(kind, name, "opacity", pause)), names.map((name) => value(kind, name, "opacity", reveal))];
  };

  it("waits on the Prophets' stories before anything of the answer shows, and shows it once answered", () => {
    // Where the fire burned: only the far fire while it waits; then, near, the green bush on fire.
    expect(shown("Where was the fire burning, per Ibn Kathir?", ["far fire", "green bush", "fire in the bush"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // What the stick became: no staff and no snake yet; then the snake.
    expect(shown("What did the stick become, in 20:20?", ["staff", "snake"])).toEqual([
      [0, 0],
      [0, 1]
    ]);
    // What the staff did: the serpent by their ropes and staffs, none swallowed yet; then all of them gone.
    expect(shown("What did the staff do, in 7:117?", ["great serpent", "seeming to move, left", "seeming to move, right"])).toEqual([
      [1, 1, 1],
      [1, 0, 0]
    ]);
    // What al-Khidr fixed: the boat with its hole, no town and no wall yet; then the wall, set straight.
    const wall = asked("What did Al-Khidr fix, in 18:77?");
    expect(shown("What did Al-Khidr fix, in 18:77?", ["hole in the boat", "the town", "wall about to fall"])).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    expect([value(wall.kind, "wall about to fall", "rotate", 0.6), value(wall.kind, "wall about to fall", "rotate", wall.reveal)]).toEqual([8, 0]);
    // How high the iron went: none yet; then all four rows, up to the mountains' tops.
    expect(shown("How high did the blocks go, per Ibn Kathir?", [1, 2, 3, 4].map((row) => `blocks of iron, row ${row}`))).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // What grew over Yunus: the open shore, bare; then the gourd plant.
    expect(shown("What grew over him, in 37:146?", ["open shore", "gourd plant"])).toEqual([
      [1, 0],
      [1, 1]
    ]);
    // What fell from the palm: no dates yet; then the dates, fallen by its foot.
    expect(shown("What fell from the palm, in 19:25?", ["ripe dates", "falling date 1", "falling date 4"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("waits on the stories of Allah's favors to His Prophets before anything of the answer shows, and shows it once answered", () => {
    // What Dawud made from the iron: the iron bending, no coat yet; then the coat of mail, every row of its rings joined.
    expect(shown("What did Dawud make from the iron?", ["iron bending", "coat of mail", "rings of the coat, band 1", "rings of the coat, band 4"])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // What the birds did: none yet; then gathered with him, from both sides.
    expect(shown("What did the birds do, per Ibn Kathir?", ["birds gathered, left", "birds gathered, right"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What Ismail helped build: the dry valley, not a stone yet; then the House, every course of it.
    expect(shown("Ismail helped his father Ibrahim build the ____.", [1, 2, 3, 4, 5].map((course) => `stones of the House, course ${course}`))).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // How the pilgrims would come: no path and no camel yet; then the camels on the paths, from both sides.
    expect(shown("How would the pilgrims come?", ["paths to the House", "camel coming, left", "camel coming, right"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // How many times between Safa and Marwah: none counted yet; then all seven.
    const times = [1, 2, 3, 4, 5, 6, 7].map((time) => `time ${time}`);
    expect(shown("How many times did Hajar go between Safa and Marwah?", times)).toEqual([times.map(() => 0), times.map(() => 1)]);
    // What came out: the footsteps, no water yet; then the water of Zamzam.
    expect(shown("What came out at the spot of Zamzam?", ["footsteps between them", "the water of Zamzam", "water coming out"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // How they found the water: no bird yet; then a bird circling over it.
    expect(shown("How did they find the water?", ["a bird circling over the water"])).toEqual([[0], [1]]);
    // How fast her throne was brought: far off in Saba; then here, in the hall.
    expect(shown("How fast was her throne brought?", ["her throne, far off", "her throne, here"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    // What was under the glass floor: no glass yet; then the glass, with water under it.
    expect(shown("What was under the glass floor?", ["the glass", "water under the glass"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What Zakariyya found: nothing yet; then the provision with her.
    expect(shown("What did Zakariyya find each time he entered her room?", ["provision with her"])).toEqual([[0], [1]]);
    // What Allah told the fire: blazing, not yet cool; then cool, and safe.
    expect(shown("What did Allah tell the fire?", ["the blazing fire", "the fire made cool", "safety"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
  });

  it("waits on the stories of the Prophets' trials and their peoples before anything of the answer shows, and shows it once answered", () => {
    // What 'Ad built: the sandhills, no tower yet; then a tower risen on each high place.
    expect([1, 2, 3].map((each) => moved("What did 'Ad build on every high place?", `tower on a high place, ${each}`, "scaleY"))).toEqual([
      [0, 1],
      [0, 1],
      [0, 1]
    ]);
    // What they took the cloud for: no cloud yet; then the cloud facing their valleys, and no wind yet.
    expect(shown("What did 'Ad think the cloud was?", ["the cloud", "the wind"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Which wind: the cloud, no wind yet; then the storm, the wind and the sand blowing.
    expect(shown("Which wind took 'Ad?", ["the cloud", "darkness of the storm", "the wind", "blowing sand"])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // How long: none counted yet; then all seven nights and eight days.
    const turns = [1, 2, 3, 4, 5, 6, 7, 8].flatMap((each) => (each < 8 ? [`day ${each}`, `night ${each}`] : [`day ${each}`]));
    expect(shown("How long did the wind blow on Ad?", turns)).toEqual([turns.map(() => 0), turns.map(() => 1)]);
    // What was left: the storm still blowing, the towers and palms gone; then the storm gone, and only their homes.
    expect(shown("Ayah 25: what was left of Ad after the wind?", ["the wind", "darkness of the storm", "tower on a high place, 1", "palm trees", "their homes", "sand drifted at their homes"])).toEqual([
      [1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1]
    ]);
    // Where she put him: the chest on the bank; then the chest in the river.
    const [bank, river] = moved("Where did Musa's mother put baby Musa?", "the chest", "y");
    expect([bank, river > 4]).toEqual([0, true]);
    // Do not fear: no light yet; then the chest sailing under His care.
    expect(shown("Allah told her not to fear and not to grieve.", ["under His care"])).toEqual([[0], [1]]);
    // What his sister was told: no footprints yet; then her footprints following the chest.
    const steps = [1, 2, 3, 4, 5].map((each) => `footprints following the chest, step ${each}`);
    expect(shown("What did Musa's mother tell his sister to do?", steps)).toEqual([steps.map(() => 0), steps.map(() => 1)]);
    // Who nursed him: the chest on the shore by the palace; then it is gone, and the light is in their home.
    expect(shown("Who nursed Musa in the end?", ["the chest", "evening", "light in their home"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // His keys: not one yet; then all eight.
    const keys = [1, 2, 3, 4, 5, 6, 7, 8].map((each) => `key ${each}`);
    expect(shown("How heavy were Qarun's keys?", keys)).toEqual([keys.map(() => 0), keys.map(() => 1)]);
    // How he went out: nothing yet; then his beasts in their finery, all three going out.
    expect(shown("How did Qarun go out, in 28:79?", ["horse in finery, 1", "camel in finery, 2", "horse in finery, 3"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // What happened to him: his home and treasure standing; then sunk into the earth, the earth cracked.
    expect(["his home", "his treasure", "key 1"].map((name) => moved("What happened to Qarun?", name, "y"))).toEqual([
      [0, 44],
      [0, 44],
      [0, 44]
    ]);
    expect(shown("What happened to Qarun?", ["the earth cracking", "where it was swallowed"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Why the women waited: the shepherds' flocks drinking, none held back yet; then their flock, held back.
    const held = [1, 2, 3].map((each) => `flock held back, ${each}`);
    expect(shown("Why were the women waiting, in 28:23?", held)).toEqual([held.map(() => 0), held.map(() => 1)]);
    // How he helped: the bucket in the well, their flock apart; then the bucket poured, and their flock at the trough.
    expect([moved("How did Musa help the two women?", "the bucket", "rotate"), ...held.map((name) => moved("How did Musa help the two women?", name, "x"))]).toEqual([
      [0, 60],
      [0, 58],
      [0, 58],
      [0, 58]
    ]);
    expect(shown("How did Musa help the two women?", ["water poured"])).toEqual([[0], [1]]);
    // What he said: no light in the shade yet; then the light in the shade.
    expect(shown("What did Musa say in the shade?", ["turned to the shade"])).toEqual([[0], [1]]);
    // What Ayyub struck: the dry land, still; then the rings of the ground struck, and it opening.
    const [still, struck] = shown("What was Ayyub told to strike?", ["strike the ground, 3", "the ground opening"]);
    expect([still, struck.every((each) => each > 0.5)]).toEqual([[0, 0], true]);
    // What came out: the dry land; then the spring and the cool water, the wilted plant gone.
    expect(shown("What came out for him?", ["spring coming out", "the cool water", "wilted plant"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // What fell on him: nothing yet; then the golden locusts, falling and fallen.
    expect(shown("What fell on Ayyub after his cure?", ["golden locusts falling", "golden locusts on the ground"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What Allah called him: no light yet; then the light of his patience.
    expect(shown("What did Allah call him?", ["light of his patience"])).toEqual([[0], [1]]);
    // How many stars: not one yet; then all eleven, and not yet the sun and the moon.
    const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((each) => `star ${each}`);
    expect(shown("How many stars did Yusuf see in his dream?", [...stars, "the sun", "the moon"])).toEqual([
      [...stars.map(() => 0), 0, 0],
      [...stars.map(() => 1), 0, 0]
    ]);
    // Whom not to tell: the dream; then their home at night, its window's shutters closed.
    expect(shown("Whom should Yusuf not tell, in 12:5?", ["night at their home", "star 1", "the sun"])).toEqual([
      [0, 1, 1],
      [1, 0, 0]
    ]);
    expect(["left", "right"].map((side) => moved("Whom should Yusuf not tell, in 12:5?", `shutter closing, ${side}`, "scaleX"))).toEqual([
      [0, 1],
      [0, 1]
    ]);
    // What the eleven stars stood for: the night; then the morning, and the dream made true.
    expect(shown("What did the eleven stars stand for, as the story ends?", ["night at their home", "morning", "the dream made true"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
  });

  it("waits on the stories told with Allah's commands before anything of the answer shows, and shows it once answered, standing still", () => {
    // What the cheaters do: both sacks low; then their own sack filled and heaped, the other filled short, and the
    // measure standing upright by it.
    expect(["their own sack", "the other sack"].map((name) => moved("What do the cheaters do?", name, "scaleY"))).toEqual([
      [0.62, 1],
      [0.62, 0.7]
    ]);
    expect(shown("What do the cheaters do?", ["grain heaped in their own sack", "grain heaped in the other sack"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Full measure: the other sack short, under a dim sky; then filled and heaped, the sky clear.
    expect(moved("How should we measure, in 17:35?", "the other sack", "scaleY")).toEqual([0.7, 1]);
    expect(shown("How should we measure, in 17:35?", ["dim over the market", "grain heaped in the other sack"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    // A straight balance: tilted; then level, with its light.
    expect(moved("What must the balance be, in 26:182?", "beam of the balance", "rotate")).toEqual([-9, 0]);
    expect(shown("What must the balance be, in 26:182?", ["light of the straight balance"])).toEqual([[0], [1]]);
    // Wherever a question on the measure waits or stops, the measure stands upright and still, its grain poured.
    const streams = ["grain poured into their own sack", "grain poured short into the other sack", "grain poured in full into the other sack"];
    const still = (t: number) => (["x", "y", "rotate"] as const).every((key) => value("measure", "the measure", key, Math.max(0, t - 0.004)) === value("measure", "the measure", key, Math.min(1, t + 0.004)));
    const stops = sceneAsks()
      .filter((ask) => ask.sceneId === "sign-measure")
      .flatMap((ask) => Object.values(sceneMoment("measure", ask.from, ask.to)!));
    for (const t of new Set(stops)) {
      expect([t, value("measure", "the measure", "rotate", t), still(t), streams.map((name) => value("measure", name, "opacity", t))]).toEqual([t, 0, true, [0, 0, 0]]);
    }
    // The son's answer: the dream; then dawn, and the way up the hill.
    expect(shown("What did the son say?", ["the dream", "dawn", "the way up the hill"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Both submitted: the way up the hill; then the morning, and the light on the hilltop.
    expect(shown("What did both do, in 37:103?", ["the way up the hill", "morning", "light on the hilltop"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Who called him: no light from the sky yet; then the light.
    expect(shown("Who called Ibrahim, in 37:104?", ["light from the sky", "the great ram"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // The ransom: no ram yet; then the great white ram, in its light.
    expect(shown("What did he see when he turned, per Ibn Abbas?", ["the great ram", "light of the great sacrifice"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // The first qiblah: no arrow yet; then the arrow and the way toward Jerusalem.
    expect(shown("Which way did Muslims first pray in Madinah?", ["the arrow of the qiblah", "the way toward Jerusalem"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(moved("Which way did Muslims first pray in Madinah?", "the arrow of the qiblah", "rotate")).toEqual([0, 0]);
    // The turn: the arrow toward Jerusalem; then turned right round, toward the Ka'bah, lit.
    expect(moved("Which way did the qiblah turn to?", "the arrow of the qiblah", "rotate")).toEqual([0, 180]);
    expect(shown("Which way did the qiblah turn to?", ["the way toward Jerusalem", "the way toward the Ka'bah", "the Ka'bah lit"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Everywhere: only Madinah's arrow, turned; then the others too, each turned toward the Ka'bah.
    const others = signArt("qiblah")
      .parts.filter((each) => each.name.startsWith("the qiblah of "))
      .map((each) => each.name);
    expect([others.length, shown("Do Muslims everywhere face the same Ka'bah?", others), others.map((name) => moved("Do Muslims everywhere face the same Ka'bah?", name, "rotate"))]).toEqual([
      3,
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [
        [0, 180],
        [0, 180],
        [0, 180]
      ]
    ]);
    // Saba's gardens: none yet; then the two, grown.
    expect(shown("What did Saba have, in 34:15?", ["the garden on the left", "the garden on the right"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Eat and be grateful: no fruit yet; then the fruit on both.
    expect(shown("What were they told, in 34:15?", ["fruit of the garden on the left", "fruit of the garden on the right", "plenty"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The flood: the dam and the gardens; then the dam gone, and the flood over all the valley.
    expect(shown("What did Allah send, in 34:16?", ["the dam", "the flood of the dam", "the garden on the left", "the garden on the right"])).toEqual([
      [1, 0, 1, 1],
      [0, 1, 0, 0]
    ]);
    expect(moved("What did Allah send, in 34:16?", "the flood of the dam", "scale")).toEqual([0.1, 1]);
    // What the gardens became: the flood; then bitter fruit, tamarisk and lote trees.
    expect(shown("What did the gardens become, in 34:16?", ["the flood of the dam", "bitter fruit, tamarisk and a few lote trees"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    // Scattered: no camel yet; then their camels gone off apart, one each way.
    const camels = ["camel going away, left", "camel going away, right"];
    expect(camels.map((name) => moved("What happened to them, in 34:19?", name, "x").map(Math.sign))).toEqual([
      [0, -1],
      [0, 1]
    ]);
    // The cow's color: the cows that are not yellow, and no yellow cow; then they are gone, and the yellow cow has come.
    expect(shown("What color was the cow?", ["black and white cow", "brown cow", "the yellow cow", "pleasing to see"])).toEqual([
      [1, 1, 0, 0],
      [0, 0, 1, 1]
    ]);
    expect(moved("What color was the cow?", "the yellow cow", "x")).toEqual([-90, 0]);
  });

  it("waits on the stories of Allah's power before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const powers = ["sign-overturned", "sign-five-signs", "sign-sabbath", "sign-west-east", "sign-four-birds", "sign-hundred-years", "sign-shirt"];
    for (const ask of sceneAsks().filter((each) => powers.includes(each.sceneId))) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Lut's town. The morning: the night, its stars and lamps; then the morning. Turned over: upright; then upside down.
    expect(shown("When was the punishment set to come, in 11:81?", ["stars", "lamps in the homes", "morning"])).toEqual([
      [1, 1, 0],
      [0, 0, 1]
    ]);
    expect(moved("What did Allah do to the town?", "the town", "rotate")).toEqual([0, 180]);
    expect([moved("What happened to the rest, in 37:136?", "the town", "rotate"), shown("What happened to the rest, in 37:136?", ["stones on it, layer on layer"])]).toEqual([[0, 180], [[0], [1]]]);
    // The stones: none yet, and a clear sky; then falling from a dark sky, and lying on it.
    expect(shown("What rained on it?", ["stones of baked clay falling", "stones on it, a first layer", "dark sky of the stones"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("What did Allah leave, in 51:37?", ["a clear sign"])).toEqual([[0], [1]]);
    // Pharaoh's people: the drought, and none of the five yet; then all five in turn, to the blood.
    const signs = ["the flood", "a swarm of locusts", "lice", "frogs", "the river turned to blood"];
    expect(shown("Ayahs 127-141: what are they about?", ["the burning sun of the drought", ...signs])).toEqual([
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1]
    ]);
    expect(shown("Which creatures were signs to Pharaoh's people, in Al-A'raf?", ["the flood", "a swarm of locusts", "frogs"])).toEqual([
      [1, 0, 0],
      [0, 0, 1]
    ]);
    expect(shown("Which of these was a sign sent in 7:133?", ["lice", "frogs"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What happened to their water, per Ibn Kathir?", ["the river turned to blood", "blood in their jars"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What did they do after each sign was lifted, in 7:135?", ["the river turned to blood"])).toEqual([[1], [0]]);
    // The town by the sea: the day before their Sabbath, no fish; then their Sabbath, and the fish on the water.
    expect(shown("When did the fish come, in 7:163?", ["fish showing on the sea", "the Sabbath, the day it is", "day 6 of the week, the day it is"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // Dhul-Qarnayn: nothing yet; then the means. The sun high, no way yet; then the way west, and the sun gone down to it.
    expect(shown("What did Allah give him, in 18:84?", ["the means to all things"])).toEqual([[0], [1]]);
    const west = signArt("west-east")
      .parts.filter((each) => each.name.startsWith("the way to where the sun sets"))
      .map((each) => each.name);
    expect([moved("How far did he go, per Ibn Kathir?", "the sun going down in the west", "x"), shown("How far did he go, per Ibn Kathir?", west)]).toEqual([
      [0, -56],
      [west.map(() => 0), west.map(() => 1)]
    ]);
    expect(shown("What did the eastern people lack, in 18:90?", ["no shelter from the sun", "the heat of the day"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // The four birds: none yet; then the four. Called: the hills lit, no bird; then the birds back where they stood.
    const birds = ["bird 1", "bird 2", "bird 3", "bird 4"];
    expect(shown("How many birds was he told to take?", birds)).toEqual([birds.map(() => 0), birds.map(() => 1)]);
    expect(shown("When he called them, what did the birds do?", [...birds, "light on hill 1", "light on hill 5"])).toEqual([
      [0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0, 0]
    ]);
    // The hundred years: the donkey, no tree; then the donkey's bones, and the tree grown. Then the bones raised.
    expect(shown("How long did the man stay dead, in 2:259?", ["the donkey", "the donkey's bones", "a tree grown in a hundred years"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    expect(shown("Ayahs 258-260: what are they about?", ["the donkey's bones", "the donkey"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What did he say after seeing it?", ["Allah is able to do all things"])).toEqual([[0], [1]]);
    // Yusuf's shirt: no shirt and no camel yet; then the shirt. The good news; then the light come back in the home.
    expect(shown("What did Yusuf send to his father, in 12:93?", ["the shirt", "camel of the caravan, behind", "camel of the caravan, in front"])).toEqual([
      [0, 0, 0],
      [1, 0, 0]
    ]);
    expect(shown("What happened when the shirt touched his face, in 12:96?", ["good news at the home", "light come back in the home", "sight come back"])).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("waits on the wonders of the stories before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const wonders = ["sign-guests", "sign-forgiveness", "sign-wind", "sign-pillars", "sign-cup", "sign-clay-bird", "sign-storm"];
    const asks = sceneAsks().filter((each) => wonders.includes(each.sceneId));
    expect(asks.length).toBe(59);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Ibrahim's guests: no greeting yet; then its rings. No fire and no meal yet; then the roasted calf, set near them
    // as he asks them to eat. No light yet; then the good news over the tent, and the second light after it.
    expect(shown("What did the guests say on entering, in 15:52?", ["the greeting, ring 1"])).toEqual([[0], [1]]);
    expect(shown("What did Ibrahim bring his guests, in 11:69?", ["the roasted calf on its platter", "the fire"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(moved("What did Ibrahim say to his guests, in 51:27?", "the roasted calf on its platter", "x")).toEqual([0, 52]);
    const lights = ["good news: a light over the tent", "a second light, after it"];
    expect(shown("What good news did they bring?", lights)).toEqual([
      [0, 0],
      [1, 0]
    ]);
    expect(shown("Which son was promised, in 11:71?", lights)).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("Who would come after Ishaq?", lights)).toEqual([
      [1, 0],
      [1, 1]
    ]);
    // Asking forgiveness: the dry land; then the light of asking, the rain on a watered land, the flocks, the gardens and
    // the river.
    expect(shown("What did Nuh tell his people to ask Allah for?", ["light of asking, going up"])).toEqual([[0], [1]]);
    expect(shown("What did Hud promise if they repented, in 11:52?", ["the hot sun", "cracks in the dry land", "rain", "the land, watered"])).toEqual([
      [1, 1, 0, 0],
      [0, 0, 1, 1]
    ]);
    expect(shown("What did Nuh say asking forgiveness brings?", ["the land, watered", "a sheep of the flocks, 1", "a camel of the flocks, 5"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("What does 71:12 promise?", ["a sheep of the flocks, 1", "fields", "fruit on the trees", "the river"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // The wind for Sulayman: the morning's month's journey not made yet; then made, the sun gone up to the top of the
    // sky. The wind coming back; then gentle, everywhere. Then thanks going up from his city.
    expect([shown("How far did the wind carry him in a morning?", ["a month's journey, going", "the wind going"]), moved("How far did the wind carry him in a morning?", "the sun", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 64]
    ]);
    expect(shown("Where did it go, per Ibn Kathir?", ["the wind coming back", "the wind, gentle"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("How should Dawud's family work, in 34:13?", ["thanks, going up from the city"])).toEqual([[0], [1]]);
    // Iram, Thamud and Pharaoh: each place in the dark, unlit; then each lit in its turn. Their corruption; the scourge,
    // their lights gone out; the night over the empty places.
    expect(
      shown(
        "Ayahs 1-14: what are they about?",
        ["Iram in the dark", "the valley in the dark", "the palace in the dark", "lamps of Iram", "lamps in the carved homes", "lamps of the palace"],
        "Ad, Thamud and Pharaoh"
      )
    ).toEqual([
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1]
    ]);
    expect(shown("How is Fir'awn described in 89:10?", ["the palace in the dark", "lamps of the palace"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What did they make much of, per 89:12?", ["dark haze of corruption", "a dark red sky"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What did your Lord pour on them, per 89:13?", ["a darkened sky, over them", "lamps of Iram", "dust over the empty places"])).toEqual([
      [0, 1, 0],
      [1, 0, 1]
    ]);
    expect(shown("What does 89:14 say about your Lord?", ["night", "stars"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Yusuf's cup: put in the last bag. No reward yet; then the camel's load. No bag opened yet; then theirs, one by one,
    // and at last his brother's, the cup brought out of it.
    expect(moved("Ayah 70: where was the king's cup placed?", "the cup, put in the last bag", "x")).toEqual([0, 106]);
    expect(shown("What was the reward for finding it, in 12:72?", ["a camel's load, the reward"])).toEqual([[0], [1]]);
    const bags = ["bag 1, opened", "bag 2, opened", "bag 3, opened", "the last bag, searched", "the cup, brought out of the last bag"];
    expect(shown("Whose bags were searched first, in 12:76?", bags)).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ]);
    expect(shown("Ayahs 69-79 say: Yusuf kept his brother near through a planned search.", bags)).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // The bird of clay: still clay; then a bird, flying. The storm: the way not lit; then lit at the flashes.
    expect(shown("How did the clay bird come to life, in 5:110?", ["the shape of a bird, of clay", "the bird, flying"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect(shown("What do they do when lightning flashes?", ["the way, lit at a flash", "the way, lit at the next flash"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
  });

  it("waits on the scenes of zakat, giving and Eid before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const giving = ["sign-zakat", "sign-yemen", "sign-bayruha", "sign-fitr", "sign-eid"];
    const asks = sceneAsks().filter((each) => giving.includes(each.sceneId));
    expect(asks.length).toBe(39);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // What zakat is due on. Fewer than five: no camel yet; then four come and stand, and the fifth has not come, so no
    // mark of it and nothing due.
    const camels = ["camel 1", "camel 2", "camel 3", "camel 4", "camel 5"];
    expect(camels.map((name) => moved("Is zakat due on fewer than five camels?", name, "x"))).toEqual([
      [140, 0],
      [120, 0],
      [100, 0],
      [80, 0],
      [60, 60]
    ]);
    expect(shown("Is zakat due on fewer than five camels?", ["mark 4 of the count", "mark 5 of the count", "five: zakat is due"])).toEqual([
      [0, 0, 0],
      [1, 0, 0]
    ]);
    // Silver: the sheep given, and no coin yet; then forty coins, and the fortieth gone to the home of the poor.
    expect(shown("Zakat on savings is ____ percent each year.", ["silver coins, row 1", "silver coins, row 5", "the fortieth coin, given", "one sheep, given"])).toEqual([
      [0, 0, 0, 1],
      [1, 1, 1, 0]
    ]);
    expect(moved("Zakat on savings is ____ percent each year.", "the fortieth coin, given", "x")).toEqual([0, -96]);
    // The crops: no field yet; then the rain on the first, ripe, and a tenth given, while the second has not grown.
    expect(shown("Crops watered by rain give...?", ["the two fields", "ripe crops of the first field", "a tenth, given", "green crops of the second field", "ripe crops of the second field"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ]);
    expect(moved("Crops watered by rain give...?", "a tenth, given", "x")).toEqual([0, -16]);
    // Then the camel draws water for the second field, and only half of its last sack is given.
    expect(shown("Crops watered with camel work give...?", ["ripe crops of the second field", "half a tenth, given"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect([moved("Crops watered with camel work give...?", "half a tenth, given", "x"), moved("Crops watered with camel work give...?", "the last sack of the second field", "scaleY")]).toEqual([
      [0, -112],
      [1, 0.5]
    ]);
    expect(shown("Hard work to water lowers the zakat share.", ["a tenth, given", "half a tenth, given"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Mu'adh sent to Yemen: the way from the north, nothing taught yet; then the light of the shahadah, and no lamp of
    // prayer yet. Then the five lamps, lit through the day and the night.
    expect(shown("What was Mu'adh to teach first?", ["light of the testimony", "a spark of the testimony", "lamp of prayer 1"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    expect(shown("What came right after the shahadah?", ["lamp of prayer 1", "lamp of prayer 5", "night"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // Zakat from their rich: nothing yet; then sacks and a sheep at the tall houses, still there. Then they go down to the
    // homes of the poor.
    const goods = ["a sack of grain from the tall houses", "a sheep from the tall houses"];
    expect([shown("Who is zakat taken from?", [...goods, "the way down to the poor"]), moved("Who is zakat taken from?", goods[0], "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 0]
    ]);
    expect([goods.map((name) => moved("In Yemen, zakat went to Yemen's own poor.", name, "x")), shown("In Yemen, zakat went to Yemen's own poor.", ["light over the homes of the poor"])]).toEqual([
      [
        [0, -62],
        [0, -92]
      ],
      [[0], [1]]
    ]);
    // Bayruha: no dates yet; then ripe. Facing the masjid, its light; then the ayah, and the garden loved. Then given:
    // the light of the gift, its sparks gone up. Then its dates go to the homes of his relatives.
    expect(shown("Bayruha was the garden Abu Talhah loved least.", ["ripe dates"])).toEqual([[0], [1]]);
    expect(shown("Which ayah made Abu Talhah give his garden?", ["light on the masjid", "the garden, loved"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    expect([shown("Abu Talhah obeyed 3:92 right away.", ["the garden, loved", "light over the garden, given"]), moved("Abu Talhah obeyed 3:92 right away.", "a spark of the gift, rising 5", "y")]).toEqual([
      [
        [0, 0],
        [0, 1]
      ],
      [0, -36]
    ]);
    const baskets = ["a basket of dates for a relative 1", "a basket of dates for a relative 3"];
    expect([shown("Whom did the Prophet ﷺ tell him to give it to?", [...baskets, "the way to a relative's home 1"]), moved("Whom did the Prophet ﷺ tell him to give it to?", baskets[1], "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 70]
    ]);
    // Zakat al-Fitr: no sa' yet; then one for each, all of one size, a spark over each. In the night, empty; then at dawn,
    // dates and barley. Then all of them given before the sun is up.
    expect(shown("Who is zakat al-Fitr given for?", ["a sa' for one in the home 1", "a sa' for one in the home 5", "one for each: a spark over the sa' 5"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("A baby's zakat al-Fitr is paid too.", ["one for each: a spark over the sa' 1", "one for each: a spark over the sa' 5"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What is it paid in, in this hadith?", ["dates in the sa' 1", "barley in the sa' 5", "stars", "dawn"])).toEqual([
      [0, 0, 1, 0],
      [1, 1, 0, 1]
    ]);
    expect([moved("When should zakat al-Fitr be paid?", "a sa' for one in the home 1", "x"), shown("When should zakat al-Fitr be paid?", ["light over the homes of the poor", "the sun rising"])]).toEqual([
      [0, 88],
      [
        [0, 0],
        [1, 0]
      ]
    ]);
    // The morning of Eid: no plate yet; then the three dates taken, an odd number, and not yet the way out. No spear yet;
    // then the way out, and the spear planted. The prayer, then the rings of the khutbah. Then home by another way.
    expect(shown("What did he eat before the Eid al-Fitr prayer?", ["a plate by the door", "date 1 of three", "date 3 of three", "an odd number: three", "the way out, part 1"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0]
    ]);
    expect([shown("What was planted in front of him ﷺ on Eid?", ["the short spear, planted", "the way out, part 3"]), moved("What was planted in front of him ﷺ on Eid?", "the short spear, planted", "scaleY")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0.1, 1]
    ]);
    expect(shown("What came first on Eid?", ["calm of the prayer", "the khutbah, ring 1"])).toEqual([
      [0, 0],
      [0, 1]
    ]);
    expect(shown("What did he do on the way back from Eid prayer?", ["the way home, another way, part 1", "the way home, another way, part 3", "light over the home"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("waits on the scenes of everyday charity before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const everyday = ["sign-thirsty-dog", "sign-thorny-branch", "sign-planting", "sign-waqf"];
    const asks = sceneAsks().filter((each) => everyday.includes(each.sceneId));
    expect(asks.length).toBe(27);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Water for a thirsty dog: the dog licking the mud, and no shoe yet; then the shoe, up from the well full of water.
    expect([shown("How did the man carry the water?", ["mud the dog licks", "the shoe, full of water", "drops from the shoe"]), moved("How did the man carry the water?", "the shoe, full of water", "y")]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [8, -6]
    ]);
    // Up to the dog: the shoe carried along the way and poured out for it.
    expect([shown("How did the man carry water up to the dog?", ["the way to the dog", "water poured out for the dog"]), moved("How did the man carry water up to the dog?", "the shoe, full of water", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 44]
    ]);
    // The dog drinking, and nothing more yet; then the light where the good was done, its sparks risen, and the dog's
    // tail wagging.
    for (const [prompt, answer] of [
      ["What did Allah do for him?", "Thanked and forgave him"],
      ["What did Allah do for the man?", "Forgave him"],
      ["What did Allah do for him?", "Allah thanked him and forgave him"]
    ]) {
      expect(shown(prompt, ["water poured out for the dog", "light where the good was done", "a spark of the good deed, rising 5", "the dog's tail, wagging"], answer)).toEqual([
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ]);
    }
    // Then a lamb and two sparrows come to the water too: a reward for any living being.
    expect([
      shown("Is there reward for kindness to animals?", ["light where the good was done", "a lamb comes to drink", "a sparrow comes to drink", "another sparrow comes to drink"]),
      moved("Is there reward for kindness to animals?", "a lamb comes to drink", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [-98, 0]
    ]);
    // The thorny branch: the way along the road, and no branch yet; then it falls across the way and is moved off it,
    // down to the roadside.
    expect([shown("What did the man move off the path?", ["the thorny branch", "the way on along the road 3"]), moved("What did the man move off the path?", "the thorny branch", "y")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [-34, 17]
    ]);
    expect([moved("What did he ﷺ tell Abu Barzah to do?", "the thorny branch", "x"), moved("What did he ﷺ tell Abu Barzah to do?", "the thorny branch", "y")]).toEqual([
      [0, -14],
      [0, 17]
    ]);
    // A thorn across the way; then moved, the light where the road was cleared, and camels, a donkey and sheep along it.
    expect([
      shown("You see a thorn on the path. What do you do?", ["the thorny branch", "light where the road was cleared", "a camel on the road", "sheep on the road"]),
      moved("You see a thorn on the path. What do you do?", "the thorny branch", "y")
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, 17]
    ]);
    // Moved off, and nothing more yet; then the light and its sparks, and those on the road passing safely.
    for (const prompt of ["Clearing a path of harm is a good deed.", "Moving harm off a path is a good deed to do.", "Helping strangers on the road gets reward.", "Moving something harmful off the path is a ____."]) {
      expect([prompt, shown(prompt, ["light where the road was cleared", "a spark of the good deed, rising 5", "a camel on the road", "a donkey on the road", "sheep on the road"]), moved(prompt, "the thorny branch", "y")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ],
        [17, 17]
      ]);
    }
    // Planting: the tree in fruit, and no one eating yet; then a bird eats, a fruit is taken home, and a goat eats.
    expect(
      shown("Who eating from it counts?", ["fruit on the tree", "a bird eats", "the way from the home to the tree", "a goat eats", "the fruit the bird eats", "the fruit taken home", "the low fruit the goat eats"])
    ).toEqual([
      [1, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0]
    ]);
    // The bird has eaten; then a person's fruit and an animal's.
    expect(shown("Who can eat from the plant and still bring you reward?", ["the fruit the bird eats", "the fruit taken home", "a goat eats", "the low fruit the goat eats"])).toEqual([
      [0, 1, 0, 1],
      [0, 0, 1, 0]
    ]);
    // All three have eaten, and no light yet; then the sparks of charity rise for the one who planted it.
    for (const prompt of ["A bird eats fruit from your tree. What is it for you?", "An animal eats from a tree you planted. What do you get?", "Planting seeds can be worship.", "Planting can be a good deed in Islam."]) {
      expect([prompt, shown(prompt, ["a goat eats", "light behind the tree", "a spark of charity, rising 1", "a spark of charity, rising 5"]), moved(prompt, "a spark of charity, rising 5", "y")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, -22]
      ]);
    }
    // Umar's land: the best he had, no wall yet; then the land kept within its walls, its dates taken out to the poor
    // and to relatives, and the silver brought to buy it sent back.
    expect([shown("What is a waqf?", ["the back wall", "the front wall", "the gate", "silver to buy the land, sent back"]), moved("What is a waqf?", "a basket of its dates for the poor", "x")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -50]
    ]);
    expect([
      shown("What did Umar do with his best land?", ["the gate", "a basket of its dates for the poor", "a basket of its dates for relatives", "silver to buy the land, sent back"]),
      moved("What did Umar do with his best land?", "a basket of its dates for relatives", "x")
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 0, 0, 1]
      ],
      [0, 50]
    ]);
    // Its dates given out, and no silver yet; then the silver comes to the gate, which stays shut, and goes back.
    expect([
      shown("Umar's land could be sold later.", ["a basket of its dates for the poor", "the road", "silver to buy the land, sent back"]),
      [0.53, 0.545, 0.58].map((t) => value("waqf", "silver to buy the land, sent back", "x", t)),
      value("waqf", "the gate stays shut", "opacity", 0.56)
    ]).toEqual([
      [
        [1, 0, 0],
        [0, 1, 1]
      ],
      [-58, -58, 0],
      1
    ]);
    // No keeper's home yet; then his basket, and dates for a friend taken along the way to the friend's home.
    expect([shown("What could the keeper do?", ["the keeper's home", "dates for the keeper", "dates for a friend", "the way to a friend's home"]), moved("What could the keeper do?", "dates for a friend", "x")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -36]
    ]);
    // The storeroom empty; then what is left goes out to the poor, not into it.
    expect([shown("What could he not do?", ["the keeper's storeroom, empty", "a basket not stored", "the way out to the poor"]), moved("What could he not do?", "a basket not stored", "x")]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [0, -91]
    ]);
  });

  it("waits on the scenes of manners and worship before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const manners = ["sign-permission", "sign-adhan", "sign-wet-grain", "sign-rumah"];
    const asks = sceneAsks().filter((each) => manners.includes(each.sceneId));
    expect(asks.length).toBe(42);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Asking permission: the way at the shut door, and nothing asked yet; then three askings, each one counted.
    for (const [prompt, answer] of [
      ["How many times should you ask to come in?", "Three"],
      ["How many times should you ask to come in?", "Three times"],
      ["How many times should you ask to enter?", "Three times"],
      ["Why did Abu Musa leave Umar's door?", "He asked three times, no answer"]
    ]) {
      expect([prompt, shown(prompt, ["the way to the door, part 3", "three rings, to count the askings", "asked once", "asked a second time", "asked a third time"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Whose door: no way yet; then the way comes to it.
    expect(shown("Whose door did Abu Musa knock on?", ["the way to the door, part 1", "the way to the door, part 3"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Asked three times, the way still at the door; then it goes, and the way back is drawn from the door.
    for (const [prompt, answer] of [
      ["If no one answers after three times, what do you do?", "Go back"],
      ["What should you do if no one lets you in?", "Go back home"],
      ["What should you do if you ask to come in three times with no answer?", "Go back home"],
      ["What should you do if no one allows you in?", "Go back politely"],
      ["What should you do after three unanswered asks?", "Return home"],
      ["Abu Musa went back after asking Umar three times.", "True"]
    ]) {
      expect([prompt, shown(prompt, ["asked a third time", "the way to the door, part 3", "the way back, part 1", "the way back, part 3"], answer)]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [1, 0, 1, 1]
        ]
      ]);
    }
    // Gone back; then two ways come to the door from the gathering place, one of them the youngest's, the witness.
    for (const [prompt, answer] of [
      ["What did Umar ask Abu Musa to bring?", "A witness to the hadith"],
      ["Who did Ubayy send as the witness?", "The youngest of them"],
      ["Who went as Abu Musa's witness?", "Abu Sa'id, the youngest"]
    ]) {
      expect([prompt, shown(prompt, ["the way back, part 3", "the way to the door again, part 3", "the way of the youngest, the witness, part 3", "the witness tells it at the door"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    // The first call to prayer: nothing yet; then ways reach the masjid one at a time, each at its own guess.
    const guessed = ["a way to the prayer at a guess 1, part 3", "a way to the prayer at a guess 2, part 3", "a way to the prayer at a guess 3, part 3"];
    for (const [prompt, answer] of [
      ["Before the adhan, how did Muslims know the prayer time?", "They guessed it"],
      ["Before the adhan, people had to guess the prayer time.", "True"]
    ]) {
      expect([prompt, shown(prompt, guessed, answer)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // The guesses, and no call yet; then the call rises from the masjid in rings.
    for (const [prompt, answer] of [
      ["Who was told to call the first adhan?", "Bilal"],
      ["Whom did the Prophet ﷺ tell to call the adhan?", "Bilal"],
      ["Bilal was the first ____, who calls the adhan.", "mu'adhdhin"],
      ["The Muslims chose a bell like a church bell.", "False"]
    ]) {
      expect([prompt, shown(prompt, ["a way to the prayer at a guess 3, part 3", "the call to prayer, ring 1", "the call to prayer, ring 3", "the call over Madinah, ring 1"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 0]
        ]
      ]);
    }
    // The call to prayer: no call yet; then it rises and spreads over Madinah, and the homes' doors light up.
    expect(shown("The ____ is the call to prayer.", ["the call to prayer, ring 1", "the call over Madinah, ring 3", "the doors of the homes, hearing the call"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The call over Madinah, and no iqamah yet; then its rings at the masjid's door.
    expect(shown("The ____ is the second call, just before salah starts.", ["the call over Madinah, ring 3", "the iqamah, ring 1", "the iqamah, ring 3"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // The iqamah, and no one coming yet; then calm ways come to the masjid from every home.
    for (const [prompt, answer] of [
      ["Walk to salah ____; don't run, even if late.", "calmly"],
      ["How should we go to prayer after the iqamah?", "Calmly, without rushing"],
      ["How should we walk to the prayer?", "With calmness"],
      ["Running to catch the start of prayer is better.", "False"]
    ]) {
      expect([prompt, shown(prompt, ["the iqamah, ring 3", "a calm way to the prayer 1, part 3", "a calm way to the prayer 4, part 3"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // The wet grain: a dry heap; then the rain wets it, dry grain is heaped over the wet, and inside it is wet.
    for (const [prompt, answer] of [
      ["What did the Prophet ﷺ find inside the heap of food?", "Wet grain"],
      ["What did he ﷺ find in the heap, per Muslim 102?", "Wet grain hidden inside"],
      ["What did the Prophet ﷺ find in the heap?", "Wet grain hidden under dry"]
    ]) {
      expect([prompt, shown(prompt, ["the heap, wet with rain", "dry grain heaped over the wet", "inside, wet", "water inside"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Hidden: a dry heap; then the rain wets it, and dry grain is heaped over the wet, and nothing is opened yet.
    expect(shown("What did the seller hide, per the hadith?", ["the heap, wet with rain", "dry grain heaped over the wet", "inside, wet"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // The wet inside, and nothing on top yet; then the wet part comes up on top.
    for (const [prompt, answer] of [
      ["What should the seller have done with the wet part?", "Put it on top to be seen"],
      ["Where should the wet part have been?", "On top, for people to see"],
      ["The Prophet ﷺ told the seller to put the wet part where people could see.", "True"]
    ]) {
      expect([prompt, shown(prompt, ["inside, wet", "the wet part, on top"], answer), moved(prompt, "the wet part, on top", "y")]).toEqual([
        prompt,
        [
          [1, 0],
          [0, 1]
        ],
        [8, 0]
      ]);
    }
    // On top, and no buyers yet; then buyers' ways come to the heap, where the wet part is seen by all.
    for (const [prompt, answer] of [
      ["What did the Prophet ﷺ say about one who deceives?", "He is not of me"],
      ["What did he ﷺ say about one who deceives?", "He is not of me"],
      ["Hiding a fault in what you sell is fine if no one asks.", "False"],
      ["Hiding a fault in what we sell is cheating.", "True"],
      ["Hiding a flaw in goods is fine if no one notices.", "False"]
    ]) {
      expect([prompt, shown(prompt, ["the wet part, on top", "a buyer's way 1, part 2", "a buyer's way 2, part 2", "the wet part, seen by all"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // The well of Rumah: no well yet; then it is dug and fills, and ways and buckets come to its water.
    for (const [prompt, answer] of [
      ["Uthman bought a ____ and gave its water to everyone.", "well"],
      ["What did Uthman buy for the Muslims?", "The well of Rumah"]
    ]) {
      expect([prompt, shown(prompt, ["the place of the well", "the well of Rumah, dug", "its water", "a way to the water 1", "a bucket, full, for all who come 3"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // No camels yet; then camels for the army come in, and saddles, packs and provisions are on them.
    expect([shown("Which army did Uthman equip?", ["a camel for the army 1", "a camel for the army 3", "saddle and packs 3", "provisions for the army"]), moved("Which army did Uthman equip?", "a camel for the army 3", "x")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [64, 0]
    ]);
    // Equipped, and no sparks yet; then sparks rise from the well and from the camels.
    expect([shown("What did the Prophet ﷺ promise for these deeds?", ["saddle and packs 3", "a spark of the good deed, rising 1", "a spark of the good deed, rising 6"]), moved("What did the Prophet ﷺ promise for these deeds?", "a spark of the good deed, rising 6", "y")]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [0, -18]
    ]);
  });

  it("waits on the scenes of the Companions' stories and the river at the door before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-tabuk", "sign-thawr", "sign-plague", "sign-river-at-the-door"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(45);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Ka'b at Tabuk: no camels and no dates yet; then his two she-camels, ripe dates and shade: never richer.
    for (const prompt of ["How many she-camels did Ka'b own before Tabuk?", "How many she-camels did Ka'b have then?", "Ka'b stayed behind because he was too poor to go.", "How was Ka'b when he stayed behind?"]) {
      expect([prompt, shown(prompt, ["his first she-camel", "his second she-camel", "ripe dates on the palms", "the pleasant shade"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // The weather: no sun and no heat yet; then the sun in great heat, and the army's ways leave in it.
    expect(shown("What was the weather when the army left for Tabuk?", ["the sun, in great heat", "heat in the air", "the army's way to Tabuk 1, part 3", "the army's way to Tabuk 2, part 3"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // His camels at home, and no army leaving yet; then the army's ways go to Tabuk, and his camels are still at home.
    for (const prompt of ["Why did Ka'b miss the army leaving for Tabuk?", "What does Ka'b's delay teach us?", "The lesson is not to delay good deeds."]) {
      expect([prompt, shown(prompt, ["his first she-camel", "his second she-camel", "the army's way to Tabuk 1, part 1", "the army's way to Tabuk 2, part 3"])]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // The army gone, and no truth told yet; then the army comes back, his way goes to the masjid, and the truth is told.
    for (const prompt of [
      "What did Ka'b decide to tell the Prophet ﷺ?",
      "What did the Prophet ﷺ say about Ka'b?",
      "Ka'b said he had a good excuse for staying behind.",
      "What saved Ka'b in the end?",
      "What saved Ka'b ibn Malik after Tabuk?",
      "Why was Ka'b saved, in his own words?"
    ]) {
      expect([prompt, shown(prompt, ["the army's way to Tabuk 1, part 3", "the army's way back from Tabuk 1, part 1", "his way to the masjid, part 2", "the truth, told"])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    // Day, and the earth open; then the nights, and the earth closing in on him.
    for (const prompt of ["How long did people not speak to the three?", "How long did the three wait, per Ka'b?", "How did the earth feel to the three?", "9:118 says the earth felt narrow to them."]) {
      expect([prompt, shown(prompt, ["the sun, in great heat", "the moon and stars of the nights", "the earth, closing in"]), moved(prompt, "the earth, closing in", "scale")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ],
        [1.6, 1]
      ]);
    }
    // No letter yet; then a way from Sham brings it, and it is in the oven's fire.
    for (const prompt of ["Who sent Ka'b the letter?", "What did Ka'b do with the letter?", "Ka'b left Madinah to join the king."]) {
      expect([prompt, shown(prompt, ["a way from Sham, with a letter, part 2", "a letter from Ghassan", "the oven's fire, burning it"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 0, 1]
        ]
      ]);
    }
    // The cave of Thawr: no camels and no months yet; then two she-camels fed and ready, and four months gone.
    expect(shown("How long did Abu Bakr feed the two camels?", ["two she-camels, fed and ready", "a month gone, 1", "a month gone, 4"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The news at noon, and no bag yet; then the bag of food for the way, tied with one half of the belt.
    for (const prompt of ["What did Asma use to tie the food bag?", "What did Asma use to tie the food?", "What does Dhat an-Nitaqayn mean?", "Asma helped the Hijrah journey."]) {
      expect([prompt, shown(prompt, ["the news at the door: it is time", "a bag of food for the way", "a belt, one half", "the belt's other half, tying the bag", "the bag, tied"]), moved(prompt, "the belt's other half, tying the bag", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 1]
        ],
        [0, -18.5]
      ]);
    }
    // Day, no way up and no night counted; then by night two ways go up to the cave, and three nights are counted.
    for (const prompt of ["How many nights did they stay in the cave?", "How long did they stay in the cave?"]) {
      expect([prompt, shown(prompt, ["night", "a way up to the cave 1, part 3", "a way up to the cave 2, part 3", "a night in the cave, 1", "a night in the cave, 3"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // In the cave, and no one chasing yet; then the ways of those chasing them come up above the cave.
    for (const prompt of [
      "What did Abu Bakr fear in the cave?",
      "Abu Bakr feared they could be seen if the enemy looked down.",
      "What did the Prophet ﷺ say to calm him?",
      "What did the Prophet ﷺ say about the two in the cave?",
      "What did the Prophet ﷺ say about the two of them?",
      "What sums up the answer in the cave?"
    ]) {
      expect([prompt, shown(prompt, ["a way up to the cave 1, part 3", "the way of those chasing them 1, part 4", "the way of those chasing them 2, part 4"])]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // The plague: ways at Sargh, and no sickness yet; then the sickness over Sham, and the news told at Sargh.
    expect(shown("Why did Umar decide not to enter Sham?", ["a way from Sham to Sargh 2", "the sickness over Sham", "the news, told at Sargh"])).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    // No counsel asked yet; then the counsels, the last of them saying: go back.
    expect(shown("What did Umar do before deciding?", ["the sickness over Sham", "the counsel of the elders of Quraysh: go back"])).toEqual([
      [1, 0],
      [1, 1]
    ]);
    // The way back to Madinah, and no valley yet; then a valley's green and dry sides, with camels grazing on the green.
    for (const prompt of ["Abu Ubaydah asked: are you running from Allah's decree? What did Umar say?", "What was Umar's answer?"]) {
      expect([prompt, shown(prompt, ["the way back to Madinah, part 2", "a valley's green side", "a valley's dry side", "a camel grazing on the green side 3"])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // No land ringed yet; then a way to the land of the plague stops outside it, and the ways inside it stay.
    expect(shown("What did the Prophet ﷺ say about a land with plague?", ["a camel grazing on the green side 3", "the land of the plague, ringed", "a way toward it, stopping outside", "where it stops", "a way inside it, staying 2"])).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // A river at the door: no river yet; then the river, bathed in five times through one day, each time counted.
    const bathed = ["first", "second", "third", "fourth", "fifth"].map((each) => `bathed, the ${each} time`);
    for (const prompt of ["What did he compare the five prayers to?", "What are the five prayers like, per the hadith?", "The Prophet ﷺ compared the five prayers to bathing in a river."]) {
      expect([prompt, shown(prompt, ["a river at its door", "five rings, to count the baths", ...bathed])]).toEqual([prompt, [bathed.map(() => 0).concat([0, 0]), bathed.map(() => 1).concat([1, 1])]]);
    }
    // The river, and nothing counted yet; then five times a day.
    expect(shown("How many times a day do Muslims pray?", ["a river at its door", "five rings, to count the baths", ...bathed])).toEqual([
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1]
    ]);
    // Going down to it once more, the water not yet clean; then not a trace of dirt is left, and the five prayers glow.
    const prayers = [1, 2, 3, 4, 5].map((i) => `the five prayers, ${i} lit`);
    for (const prompt of ["What do the prayers wash away?", "What do good deeds do, in 11:114?"]) {
      expect([prompt, shown(prompt, ["the water, clean and sparkling", ...prayers])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of the likenesses he ﷺ gave, and on the parted sea for Ashura, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-building", "sign-mercy", "sign-sanctuary", "sign-musk", "sign-shared-ship"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId) || (each.sceneId === "sign-sea" && /Ashura/.test(each.prompt)));
    expect(asks.length).toBe(35);
    for (const ask of sceneAsks().filter((each) => scenes.includes(each.sceneId) || each.sceneId === "sign-sea")) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Believers like a building: nothing built yet; then two bricks come together, and the building rises row by row.
    for (const prompt of ["A believer to a believer is like what?", "What are believers like, per Abu Musa's hadith?", "What are believers like, per Bukhari 481?", "What are believers like, in the hadith?"]) {
      expect([prompt, shown(prompt, ["a brick, coming to the other", "the other brick, coming to it", "a row of bricks, 1 from the ground", "a row of bricks, 9 from the ground", "its roof", "its door and windows"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    // The building stands; then the wind topples a lone brick, while each part of the building holds up the other.
    for (const prompt of ["In a wall, each brick supports the others.", "Believers should support one another.", "Believers should hold each other up."]) {
      expect([prompt, shown(prompt, ["a row of bricks, 9 from the ground", "a lone brick, standing by itself", "each part holding up the other"]), moved(prompt, "a lone brick, standing by itself", "rotate")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 1]
        ],
        [0, 90]
      ]);
    }
    // A way asking at the door, and no one speaking yet; then voices from the building speak up, and rewards rise.
    expect(
      shown("When a man came asking, the Prophet ﷺ told them to help him.", ["the way that came asking, part 2", "asking, at the door", "a voice from the building, speaking up 1", "a voice from the building, speaking up 3", "a reward, rising 5"])
    ).toEqual([
      [1, 1, 0, 0, 0],
      [1, 0, 1, 1, 1]
    ]);
    // Mercy in a hundred parts: no rings yet; then a hundred rings, none lit.
    const rings = [1, 2, 3, 4, 5].map((row) => `a hundred rings, to count the parts of mercy, row ${row}`);
    const kept = [1, 2, 3, 4, 5].map((row) => `the ninety-nine parts, kept back, row ${row}`);
    expect(shown("Into how many parts did Allah make mercy?", [...rings, "the one part, among all creation"])).toEqual([
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0]
    ]);
    // A hundred rings, none lit; then one lights, and warmth spreads over all creation; none of the ninety-nine yet.
    for (const prompt of ["How many parts did He send to all creatures?", "How many parts of mercy came to earth, in Bukhari 6000?"]) {
      expect([prompt, shown(prompt, [rings[4], "the one part, among all creation", "warmth over all creation", kept[0]])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    // None lit; then the one part, and by it the camel and the ewe are kind to their young.
    const kindness = ["her calf, coming to the camel", "its lamb, coming to the ewe", "the camel's kindness to her calf", "the ewe's kindness to its lamb"];
    expect(shown("All the mercy among creatures comes from just one part.", ["the one part, among all creation", "warmth over all creation", ...kindness])).toEqual([
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1]
    ]);
    // The one part, and no young yet; then the calf and the lamb come, and their mothers are kind to them.
    expect(shown("What is the one part used for?", ["the one part, among all creation", ...kindness])).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // No mare yet; then the mare comes with her foal and lifts her hooves from it.
    expect([
      shown("What does the mare do because of the one part of mercy?", ["a mare, lifting her hooves from her foal", "her foal, beside her hooves", "the mare's care for her foal"]),
      moved("What does the mare do because of the one part of mercy?", "a mare, lifting her hooves from her foal", "rotate")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, -12]
    ]);
    // One part lit; then the ninety-nine kept back light.
    for (const prompt of ["How many parts of mercy did Allah keep with Him?", "How many parts of mercy did Allah keep for that Day?"]) {
      expect([prompt, shown(prompt, ["the one part, among all creation", ...kept])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Grazing around a sanctuary: the clear pasture and the marked sanctuary, nothing between; then the haze between.
    for (const prompt of ["What lies between clear halal and clear haram?", "What lies between halal and haram?", "What lies between the halal and the haram?"]) {
      expect([prompt, shown(prompt, ["the halal, a clear green pasture", "the border of the sanctuary", "doubtful things, a haze between them"])]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // The haze, and no flock yet; then a way brings a flock up to the haze and turns back, and it is kept safe.
    for (const prompt of [
      "What do you protect by avoiding doubtful things?",
      "What does avoiding doubtful things protect?",
      "What does staying away from doubtful things protect?",
      "When unsure if something is halal, it's safer to leave it."
    ]) {
      expect([
        prompt,
        shown(prompt, [
          "doubtful things, a haze between them",
          "the first flock's way, up to the haze",
          "the first flock's way, turning back",
          "a sheep of the first flock 1",
          "a sheep of the first flock 3",
          "kept safe, in the clear pasture",
          "a sheep of the second flock, straying inside"
        ])
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 0]
        ]
      ]);
    }
    // The musk and the bellows: an empty stall; then jars of musk on it, and their sweet smell.
    expect(shown("What is a good friend like, in the hadith?", ["a jar of musk 1", "a jar of musk 4", "the musk's sweet smell"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // A way at the stall, a little musk given; then a sweet smell from him, on the way.
    expect(shown("Even if he gives you nothing, a good friend leaves a good smell.", ["a way to the one with musk, part 2", "a little musk, given", "a sweet smell from him, on the way"])).toEqual([
      [1, 1, 0],
      [1, 1, 1]
    ]);
    // The forge's fire, and no cloak yet; then a way to the forge, a cloak by it, burned, and a bad smell rising.
    expect(
      shown("What might a bad friend do, like the bellows?", ["the fire in the forge", "a way to the one who blows the bellows", "a cloak, set down by the forge", "the cloak, burned", "a bad smell, rising as smoke 1"])
    ).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // The shared ship: ways below, and no hole yet; then a drill, a hole begun in the lower deck, the sea spurting in.
    expect(shown("What did the people below want to do?", ["a way on the lower deck 1", "a drill, in the lower deck", "a hole, begun in the lower deck", "the sea, spurting in"])).toEqual([
      [1, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // The sea spurting in; then a way from above goes down, the hole is stopped, and sparks rise: all are saved.
    expect(
      shown("Stopping wrong protects the whole community.", ["a hole, begun in the lower deck", "the sea, spurting in", "a way from above, going down to stop it, part 2", "the hole, stopped", "all of them saved, a spark rising 1"])
    ).toEqual([
      [1, 1, 0, 0, 0],
      [1, 0, 1, 1, 1]
    ]);
    // The day of Ashura: the sea before them; then it splits, its walls stand, and a dry path runs through it.
    for (const [prompt, answer] of [
      ["What happened on the day of Ashura?", "Allah saved Musa"],
      ["What happened on the day of Ashura?", "Allah saved Musa and his people"],
      ["What happened on the day of Ashura?", "Allah saved the Children of Israel"],
      ["What happened on Ashura, per the hadith?", "Allah saved Musa's people"],
      ["What happened on Ashura, per the hadith?", "Allah rescued Bani Israel"],
      ["What happened on Ashura, per Bukhari 2004?", "Allah rescued Bani Israel from their enemy"],
      ["Why did the Jews fast Ashura, in the hadith?", "Allah saved Musa that day"]
    ]) {
      expect([prompt, answer, shown(prompt, ["dry path", "left wall of water", "right wall of water"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of the stories he ﷺ told before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-shut-cave", "sign-log-at-sea", "sign-tied-camels", "sign-traveler"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(23);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Three men in a cave: their ways gone in, the rock still up on its ledge; then it rolls down and shuts the cave.
    const trapped = "What trapped the three men in the cave?";
    expect([
      shown(trapped, ["a way into the cave 1, part 2", "a way into the cave 3, part 2", "a way out of the cave 1"]),
      moved(trapped, "the rock", "x"),
      moved(trapped, "the rock", "y"),
      moved(trapped, "the rock", "rotate")
    ]).toEqual([
      [
        [1, 1, 0],
        [1, 1, 0]
      ],
      [25, 0],
      [-34, 0],
      [0, -210]
    ]);
    // The cave shut, and no one has asked yet; then a voice behind the rock asks by his good deed, shown in a picture
    // beside the cave: the bowl of milk held for his parents through the night, till dawn. It rises as sparks.
    for (const prompt of ["How did they ask Allah to save them?", "One man had waited all night to give his parents their milk."]) {
      expect([
        prompt,
        shown(prompt, ["a voice behind the rock, asking 1", "a picture of what the first did", "the bowl of milk, held till dawn", "the window, lit at dawn", "a voice behind the rock, asking 2"]),
        moved(prompt, "the first good deed, rising 1", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ],
        [0, -10]
      ]);
    }
    // Two have asked, and the rock has moved a little; then the third asks by the wage he kept for his worker, grown
    // into a herd, and the way that came for it. Still no way out.
    const wage = "What did another man give back to his worker?";
    expect([
      shown(wage, [
        "a picture of what the second did",
        "a voice behind the rock, asking 3",
        "a picture of what the third did",
        "the wage, left behind",
        "a sheep, grown from the wage",
        "a cow, grown from the wage",
        "a camel, grown from the wage",
        "the way that came for the wage",
        "a way out of the cave 1"
      ]),
      moved(wage, "a camel, grown from the wage", "scale"),
      moved(wage, "the rock", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0]
      ],
      [0.25, 1],
      [6.8, 6.8]
    ]);
    // A loan sent by sea: nothing yet; then a way borrows the thousand dinars, with Allah as witness, and they cross the sea.
    const witness = "Whom did the borrower name as his witness?";
    expect([shown(witness, ["a way, to borrow the money", "a way, ashore across the sea", "a piece of wood"]), moved(witness, "a thousand dinars", "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, 120]
    ]);
    // The ship gone, a way on the empty shore, the money still with him; then it goes into a piece of wood, sealed,
    // given to the sea, and the wood floats over to the other shore.
    const wood = "How did he send the money when he had no ship?";
    expect([shown(wood, ["a ship", "a way, down to the shore when it was time", "a thousand dinars", "a piece of wood", "the wood, sealed"]), moved(wood, "a piece of wood", "x")]).toEqual([
      [
        [0, 1, 1, 0, 0],
        [0, 1, 0, 1, 1]
      ],
      [0, -104]
    ]);
    // The wood at the other shore, unopened; then a way takes it home, and it opens on the money and the letter.
    expect(
      shown("The lender found the wood and the money inside it.", [
        "a piece of wood",
        "a way, taking the wood home",
        "the wood, opened, one half",
        "the thousand dinars, inside",
        "the letter, inside",
        "a trust kept, a spark rising 1"
      ])
    ).toEqual([
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1]
    ]);
    // The Quran by heart: a voice reciting, the pegs empty; then three camels come and are tied to them.
    const hafiz = "What is a hafiz compared to?";
    expect([shown(hafiz, ["a voice, reciting by heart", "a camel, tied 1", "a camel, tied 3", "its rope, tied 1", "its rope, tied 3"]), moved(hafiz, "a camel, tied 2", "x")]).toEqual([
      [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [-110, 0]
    ]);
    // Tied and held; then the voice stops, the ropes are let go, and the camels run away.
    const letGo = "What happens if the camels are let go?";
    expect([shown(letGo, ["a voice, reciting by heart", "a camel, tied 1", "its rope, tied 1", "the knot, holding 1", "a camel, brought back 1"]), moved(letGo, "a camel, tied 1", "x")]).toEqual([
      [
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      [0, 130]
    ]);
    // The camels gone; then the voice comes back, reviewing, and they are brought back and tied again.
    for (const prompt of ["Memorised Quran needs regular review.", "What slips away faster than a camel?", "What are we told to do?"]) {
      expect([prompt, shown(prompt, ["a camel, tied 1", "the voice, reviewing again", "a camel, brought back 1", "a camel, brought back 3", "its rope, tied again 1", "the knot, holding again 3"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Tied and held; then let go and gone, and only brought back by reviewing.
    expect(shown("Once memorised, the Quran never leaves us.", ["a camel, tied 1", "a voice, reciting by heart", "the voice, reviewing again", "a camel, brought back 1", "its rope, tied again 1"])).toEqual([
      [1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1]
    ]);
    // Like a traveler: an empty road by a town; then a camel comes along it, a way behind it, and passes the town.
    for (const [prompt, answer] of [
      ["How should we live in this world?", "Like a traveler"],
      ["How should we live in this world?", "Like a stranger or traveler"],
      ["How should we live, per Bukhari 6416?", "Like a stranger or traveler"],
      ["How should we live in this world, per the hadith?", "Like a stranger or traveler"],
      ["How should we live in this world, per the hadith?", "Like a stranger or a traveller"]
    ]) {
      expect([prompt, answer, shown(prompt, ["a camel on its way", "a way along the road, part 1", "a way along the road, part 5", "a way along the road, part 6"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    // On the road, short of the tree; then, at noon, it rests a little in the tree's shade.
    const rider = "What did he compare himself to in this world?";
    expect([
      shown(rider, ["a way along the road, part 6", "a way, resting a little in the shade", "a way along the road, part 7"]),
      moved(rider, "a camel on its way", "x"),
      moved(rider, "the sun, going over the day", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [78, 92],
      [-22, 0]
    ]);
    // Resting in the shade; then it goes on and leaves it behind.
    const movesOn = "A rider in shade soon moves on.";
    expect([shown(movesOn, ["a way, resting a little in the shade", "a way along the road, part 7"]), moved(movesOn, "a camel on its way", "x")]).toEqual([
      [
        [1, 0],
        [1, 1]
      ],
      [92, 114]
    ]);
    // Short of the tree; then it rests a little in the shade, and goes on, leaving it behind.
    for (const prompt of ["A traveler does not get too attached to a road stop.", "A traveler does not cling to the road."]) {
      expect([prompt, shown(prompt, ["a way, resting a little in the shade", "a way along the road, part 7"]), moved(prompt, "a camel on its way", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [78, 114]
      ]);
    }
    // On its way by day; then evening comes, the sun sets, and it is gone over the horizon before the night.
    const evening = "Ibn Umar taught to expect a long life ahead.";
    expect([shown(evening, ["the evening sky", "stars", "a camel on its way", "a way along the road, part 8"]), moved(evening, "the sun, going over the day", "y")]).toEqual([
      [
        [0, 0, 1, 0],
        [1, 1, 0, 1]
      ],
      [4, 30]
    ]);
  });

  it("waits on the scenes of more of his likenesses before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-citron", "sign-forgiving-trader", "sign-hungry-birds", "sign-two-flocks", "sign-bending-plant", "sign-remember"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(32);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // The citron: a voice reciting in one home, nothing on its plate; then the citron comes, its sweet smell rising.
    const scent = "Reciting the Quran adds a good scent to a believer.";
    expect([shown(scent, ["a voice, reciting", "a citron", "its sweet smell, rising", "a slice of it, good to taste"]), moved(scent, "a citron", "scale")]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0.3, 1]
    ]);
    // A way gone into the quiet home, its plate empty; then dates come on it, shining with their taste, and nothing rises.
    expect(shown("A believer who does not recite is like what?", ["a way into the quiet home, part 2", "dates", "their good taste, shining"])).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    // The trader: the third way has only an empty purse, his mark still on the board; then a voice from the stall says
    // "let him off", the mark is wiped, and the way goes home free.
    for (const prompt of ["What did the trader do when a debtor could not pay?", "What did the lender do for poor debtors?"]) {
      expect([prompt, shown(prompt, ["an empty purse, opened", "a mark on the tally board 3", "a voice from the stall, saying: let him off", "a way, going home free"])]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [0, 0, 0, 1]
        ]
      ]);
      const { kind, pause, reveal } = asked(prompt);
      expect([prompt, value(kind, "a voice from the stall, saying: let him off", "opacity", 0.55), pause < 0.55 && 0.55 < reveal]).toEqual([prompt, 1, true]);
    }
    // The debtor gone home free; then warmth comes over the stall, and sparks rise: Allah forgave him.
    for (const prompt of ["What did Allah do for the trader?", "Being easy on people in debt is loved by Allah.", "Being gentle with people in debt is loved by Allah."]) {
      expect([prompt, shown(prompt, ["a way, going home free", "warmth over the stall", "forgiven, rising 1", "forgiven, rising 5"]), moved(prompt, "forgiven, rising 5", "y")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, -18]
      ]);
    }
    // The birds: nothing in the field yet; then crops grow and grain lies on the ground, shining: His provision.
    const provision = "What does true reliance on Allah bring?";
    expect([shown(provision, ["the crops in the field", "the grain on the ground", "the grain, shining"]), moved(provision, "the crops in the field", "scale")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0.2, 1]
    ]);
    // Slim birds in their nests at dawn; then they fly out hungry to the field, and the grain is eaten.
    for (const prompt of [
      "How do the birds leave in the morning?",
      "How do the birds leave in the morning, in the hadith?",
      "How does a bird go out, in the hadith?",
      "In the hadith, birds leave in the morning how?",
      "The birds stay in their nests and wait for food.",
      "The bird still flies out to look for food.",
      "The birds still go out to seek food, in the hadith."
    ]) {
      expect([prompt, shown(prompt, ["a bird, going out hungry 1", "a bird, going out hungry 3", "a bird, coming back full 1", "the dawn sky", "the grain on the ground"]), moved(prompt, "a bird, going out hungry 1", "x"), moved(prompt, "a bird, going out hungry 3", "x")]).toEqual([
        prompt,
        [
          [1, 1, 0, 1, 1],
          [1, 1, 0, 0, 0]
        ],
        [0, 86],
        [0, 92]
      ]);
    }
    // Still hungry in the field; then evening comes, and they fly back to their nests full and round.
    const back = "How do they come back, in the hadith?";
    expect([shown(back, ["a bird, going out hungry 1", "a bird, going out hungry 2", "a bird, coming back full 1", "a bird, coming back full 3", "the evening sky"]), moved(back, "a bird, coming back full 1", "x")]).toEqual([
      [
        [1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1]
      ],
      [0, -86]
    ]);
    // The sheep alone; then two flocks come in, one from each side.
    const flocks = "How many flocks does the sheep wander between?";
    expect([shown(flocks, ["a sheep, wandering", "a sheep of the first flock 1", "a sheep of the first flock 4", "a sheep of the second flock 1", "a sheep of the second flock 4"]), moved(flocks, "a sheep of the second flock 1", "x")]).toEqual([
      [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [70, 0]
    ]);
    // With the first flock; then it goes to the second, and back between them, settling with neither.
    const settles = "The sheep settles firmly with one flock.";
    expect([shown(settles, ["its way, to the first flock", "its way, to the second flock", "its way, back between them"]), moved(settles, "a sheep, wandering", "x")]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [-31.5, 0]
    ]);
    // The plant: nothing yet; then a fresh, soft plant grows, and no pine.
    const plant = "What is the believer like, he ﷺ said?";
    expect([shown(plant, ["a fresh, soft plant", "a pine, hard and straight"]), moved(plant, "a fresh, soft plant", "scale")]).toEqual([
      [
        [0, 0],
        [1, 0]
      ],
      [0.15, 1]
    ]);
    // Bent by the wind from the right; then the wind is still, and it stands straight again.
    const straight = "What does the plant do when the wind stops?";
    expect([shown(straight, ["the wind, from the right"]), moved(straight, "a fresh, soft plant", "rotate")]).toEqual([[[1], [0]], [-26, 0]]);
    // Upright; then the wind bends it one way and the other, and it stands straight again, not broken.
    const bent = "Being bent by trials means a believer has lost his faith.";
    const { kind: field, pause: still, reveal: again } = asked(bent);
    expect([moved(bent, "a fresh, soft plant", "rotate"), [0.25, 0.38].map((t) => [still < t && t < again, value(field, "a fresh, soft plant", "rotate", t)]), shown(bent, ["a fresh, soft plant"])]).toEqual([
      [0, 0],
      [
        [true, 26],
        [true, -26]
      ],
      [[1], [1]]
    ]);
    // The living and the dead: two quiet homes; then a voice remembering in one of them.
    expect(shown("What does dhikr mean?", ["a voice, remembering", "a way into the other home"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Both homes dim; then the home that remembers comes alive: its lamp bright, its door glowing, warmth and life rising.
    for (const [prompt, answer] of [
      ["Who is like the living, in the hadith?", "One who remembers his Lord"],
      ["Who is like the living, in the hadith?", "One who remembers Allah"],
      ["Whom is the one who remembers Allah like?", "Someone alive"],
      ["The one who remembers Allah is like what?", "A living person"],
      ["One who remembers Allah is like what?", "A living creature"],
      ["Remembering Allah keeps the heart alive.", "True"],
      ["Dhikr keeps the heart alive.", "True"]
    ]) {
      const { kind, pause, reveal } = asked(prompt, answer);
      expect([prompt, answer, shown(prompt, ["its warmth, all around", "its door, glowing", "life in it, rising 1", "life in it, rising 4"], answer), [pause, reveal].map((t) => value(kind, "the lamp in the home that remembers", "opacity", t))]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0.55, 1]
      ]);
    }
    // The other home still dimly lit; then its lamp goes out, and it stands dark and still.
    for (const prompt of ["And the one who never remembers Him?", "Who is like the dead, in the hadith?", "One who does not remember Allah is like what?"]) {
      expect([prompt, shown(prompt, ["the lamp in the other home", "the other home, dark and still", "its warmth, all around"])]).toEqual([
        prompt,
        [
          [0.55, 0, 1],
          [0, 0.35, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of good deeds he taught before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-lost-camel", "sign-stung-twice", "sign-doors-of-good", "sign-square-and-line", "sign-more-water", "sign-joint-charity"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(24);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // The lost camel: the empty desert; then a camel comes with its food and drink, and runs off, out of sight.
    const lost = "What did the man lose, per Muslim 2747?";
    const camel = "a camel, carrying food and drink";
    const { kind: desert, pause: before, reveal: gone } = asked(lost);
    expect([shown(lost, [camel, "a way, with the camel"]), moved(lost, camel, "x"), [before < 0.16 && 0.16 < gone, value(desert, camel, "opacity", 0.16)]]).toEqual([
      [
        [0, 0],
        [0, 1]
      ],
      [-60, -100],
      [true, 1]
    ]);
    // Lying in the shade, the camel gone; then it comes back and stands by him, and gladness rises.
    const pleased = "How does Allah feel when we repent, per Muslim 2747?";
    expect([shown(pleased, [camel, "gladness over the tree", "gladness, rising 1", "gladness, rising 4", "a way, lying down in the shade"]), moved(pleased, camel, "x")]).toEqual([
      [
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ],
      [-70, 50]
    ]);
    // Stung once, the hole not yet marked; then the hole is kept in mind, and a new way passes far from it.
    const hole = "A believer is not stung twice from...?";
    const { kind: rocks, pause: stung, reveal: far } = asked(hole);
    expect([shown(hole, ["the hole, kept in mind", "a new way, far from the hole, part 1", "a new way, far from the hole, part 2", "the sting"]), [stung < 0.655 && 0.655 < far, value(rocks, "a scorpion in the hole", "opacity", 0.655)]]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0]
      ],
      [true, 1]
    ]);
    // The hole marked; then the way keeps far from it, and the lesson learned rises.
    expect(shown("What does this teach?", ["the hole, kept in mind", "a new way, far from the hole, part 2", "a lesson learned, rising 1", "a lesson learned, rising 3"])).toEqual([
      [1, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    expect(shown("A believer keeps making the same mistake.", ["the hole, kept in mind", "a new way, far from the hole, part 2", "a lesson learned, rising 3"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The doors of good: all three shut; then the first opens on a shield, shining.
    for (const prompt of ["What did he ﷺ call fasting in the same hadith?", "What is fasting, in the hadith?"]) {
      expect([prompt, shown(prompt, ["the shield, shining", "the doors, glowing"]), moved(prompt, "the first door", "scaleX"), moved(prompt, "the second door", "scaleX")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [1, 0.08],
        [1, 1]
      ]);
    }
    // The second door shut on its fire; then it opens, a coin dims the fire, and water puts it out.
    for (const prompt of ["What does charity do to sins?", "What does charity do, in the hadith?"]) {
      expect([prompt, shown(prompt, ["a fire, burning", "smoke, as it goes out", "a jug, pouring water"]), moved(prompt, "the second door", "scaleX"), moved(prompt, "a fire, burning", "scale")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 0]
        ],
        [1, 0.08],
        [1, 0.02]
      ]);
    }
    // By day, the third door shut; then night comes, and it opens on a lamp and a voice praying, with sparks rising.
    for (const prompt of ["Night prayer is also among the doors of good.", "Which prayer is a door of good, in the hadith?"]) {
      expect([prompt, shown(prompt, ["the night, coming", "a voice, praying deep in the night", "the prayer, rising 1", "the prayer, rising 4"]), moved(prompt, "the third door", "scaleX")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [1, 0.08]
      ]);
    }
    // The square and its lines on the ground; then the square shines as our lifetime, and then the line going out
    // shines as our hope.
    const lifetime = ["the lifetime, all around inside the square", "the hope, going out, shining", "a trouble, coming 1"];
    expect(shown("In the drawing, what did the square stand for?", lifetime)).toEqual([
      [0, 0, 0],
      [1, 0, 0]
    ]);
    expect(shown("What was the line going outside the square?", lifetime)).toEqual([
      [1, 0, 0],
      [1, 1, 0]
    ]);
    expect(shown("Our hopes often reach further than our lifetime.", lifetime)).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // The soup cooking; then a jug pours more water into it, and the soup rises.
    const water = "What did the Prophet ﷺ tell Abu Dharr to add to his soup?";
    const { kind: soup, pause: cooking, reveal: added } = asked(water);
    expect([shown(water, ["a jug, pouring in more water", "more water, poured in"]), moved(water, "the soup in it", "y"), moved(water, "a jug, pouring in more water", "rotate"), [cooking < 0.29 && 0.29 < added, value(soup, "more water, poured in", "opacity", 0.29)]]).toEqual([
      [
        [0, 0],
        [1, 0]
      ],
      [0, -0.7],
      [0, 0],
      [true, 1]
    ]);
    // Nothing yet for the neighbors; then their homes are looked to, bowls go to them, and their windows light up.
    for (const prompt of ["Why add it?", "Sharing food with neighbors is part of good manners.", "Who did the Prophet ﷺ say to share soup with?"]) {
      const { kind, pause, reveal } = asked(prompt);
      expect([prompt, shown(prompt, ["a way to the home on the left", "a way to the home on the right", "their windows, lit", "kindness, rising 1"]), [0.53, 0.66].map((t) => [pause < t && t < reveal, value(kind, "the homes next door, looked to", "opacity", t), value(kind, "a bowl of it, for the home on the left", "opacity", t)])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [
          [true, 1, 1],
          [true, 1, 1]
        ]
      ]);
    }
    // A charity for every joint: before sunrise; then the sun rises and the day comes.
    for (const prompt of ["Charity is owed each day for every what?", "What does each joint of the body owe every day?"]) {
      expect([prompt, shown(prompt, ["the sky by day"]), moved(prompt, "the sun, rising", "y")]).toEqual([prompt, [[0], [1]], [22, 0]]);
    }
    // The balance still; then it tips and comes level, fair.
    const fair = "Which of these is also charity in the hadith?";
    const { kind: road, pause: still, reveal: level } = asked(fair);
    expect([shown(fair, ["the balance, level and fair"]), moved(fair, "its crossbar and pans", "rotate"), [still < 0.19 && 0.19 < level, value(road, "its crossbar and pans", "rotate", 0.19)]]).toEqual([[[0], [1]], [0, 0], [true, 12]]);
    // No voice yet; then a voice says a good word.
    for (const prompt of ["What does the Prophet ﷺ call a good word?", "Which of these counts as a charity?"]) {
      expect([prompt, shown(prompt, ["a voice, saying a good word", "a step to the prayer 1"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ]
      ]);
    }
    // A good word, steps to the prayer, and a stone moved off the road: none of them money.
    const money = "Charity can only be given with money.";
    expect([shown(money, ["a voice, saying a good word", "a step to the prayer 1", "a step to the prayer 4", "a way, to the stone", "the road cleared, rising 1"]), moved(money, "a stone in the road, moved off it", "x")]).toEqual([
      [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [0, 7]
    ]);
  });

  it("waits on the scenes of more wisdom he taught before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-two-wolves", "sign-falling-leaves", "sign-tie-camel", "sign-faith-branches", "sign-sea-drop", "sign-jar-of-gold", "sign-charity-wealth"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(38);
    for (const ask of asks) {
      const kind = SIGN_SCENES.find((each) => each.id === ask.sceneId)!.kind;
      for (const t of Object.values(sceneMoment(kind, ask.from, ask.to)!)) {
        for (const part of signArt(kind).parts) {
          for (const [key, values] of Object.entries(part.keys ?? {})) {
            if (key === "at") continue;
            const at = (time: number) => keyAt(part.keys!.at, values as number[], Math.min(1, Math.max(0, time)));
            expect([ask.prompt, t, part.name, key, at(t) === at(t - 0.004) || at(t) === at(t + 0.004)]).toEqual([ask.prompt, t, part.name, key, true]);
          }
        }
      }
    }
    // Sheep grazing, no wolf yet; then two wolves come among them.
    const wolves = "What did he ﷺ compare greed for wealth and honor to?";
    expect([shown(wolves, ["a hungry wolf, from far off"]), moved(wolves, "a hungry wolf, from the left", "x"), moved(wolves, "a sheep of the flock 1", "x")]).toEqual([[[0], [1]], [-60, 0], [0, 0]]);
    // The sheep scattered, nothing of greed yet; then gold and a crown grow before the hut, and its lamp burns low.
    for (const prompt of ["What does that greed harm, he ﷺ said?", "Chasing more money and fame can hurt your faith."]) {
      expect([prompt, shown(prompt, ["a heap of gold, growing", "a crown over it", "the lamp's light", "smoke, as it burns low"]), moved(prompt, "the lamp's flame", "scale")]).toEqual([
        prompt,
        [
          [0, 0, 1, 0],
          [1, 1, 0.12, 1]
        ],
        [1, 0.35]
      ]);
    }
    // Pricked by the thorn, its sins dark marks on the way; then they are wiped away, and the tree's dry leaves fall.
    const leaves = "A Muslim's pain can make his sins fall away like leaves.";
    expect([shown(leaves, ["its sins, dark marks on the way 1", "its sins, dark marks on the way 3", "a way, going on to the tree"]), moved(leaves, "a dry leaf on the tree 1", "y"), moved(leaves, "a dry leaf on the tree 10", "y")]).toEqual([
      [
        [1, 1, 0],
        [0, 0, 1]
      ],
      [0, 41],
      [0, 36]
    ]);
    // The camel wandering off, no rope yet; then a voice answers, and the camel is brought back and tied to the post.
    const tie = "What did he ﷺ tell the man to do with his camel?";
    const { kind: home, pause: loose, reveal: tied } = asked(tie);
    expect([shown(tie, ["a rope, tying it to the post", "a way, going in"]), moved(tie, "a camel", "x"), moved(tie, "a camel", "scaleX"), [loose < 0.48 && 0.48 < tied, value(home, "a voice from the home, answering", "opacity", 0.48)]]).toEqual([
      [
        [0, 0],
        [1, 0]
      ],
      [-10, 0],
      [-1, 1],
      [true, 1]
    ]);
    // Then the way goes in, and trust rises.
    expect(shown("What is the lesson about trusting Allah?", ["a rope, tying it to the post", "a way, going in", "trust, rising 1", "trust, rising 4"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // The camel come, no voice yet; then a voice asks as it wanders off, and the answer is to tie it.
    const care = "Trusting Allah means you never need to take care.";
    const { pause: come, reveal: cared } = asked(care);
    expect([shown(care, ["a voice, asking", "a rope, tying it to the post"]), [come < 0.3 && 0.3 < cared, value(home, "a voice, asking", "opacity", 0.3), value(home, "a camel", "x", 0.34)]]).toEqual([
      [
        [0, 0],
        [0, 1]
      ],
      [true, 1, -10]
    ]);
    // No tree yet; then it grows branch after branch.
    const one = "Faith is only one single deed.";
    expect([moved(one, "the trunk of a tree", "scaleY"), moved(one, "a branch 1", "scale"), moved(one, "a branch 8", "scale"), moved(one, "the highest branch", "scale")]).toEqual([
      [0.15, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ]);
    // Then its highest branch shines, its light rising.
    expect(shown("What is the highest branch of iman?", ["the highest branch, shining", "its light, rising 1", "the lowest branch, shining"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // The stone on the road; then a way moves it off, and the lowest branch shines.
    const lowest = "What is the lowest branch?";
    expect([shown(lowest, ["a way, along the road", "the lowest branch, shining", "modesty's branch, glowing"]), moved(lowest, "a stone lying on the road", "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, 15]
    ]);
    // No blossom yet; then a branch blossoms with modesty, and glows.
    for (const prompt of ["Modesty (haya) is part of faith.", "Which branch of faith does this hadith name?"]) {
      expect([prompt, shown(prompt, ["modesty's branch, glowing"]), moved(prompt, "blossoms of modesty on a branch", "scale")]).toEqual([prompt, [[0], [1]], [0, 1]]);
    }
    // The wide sea, nothing dipped in it; then it splashes, rings spread, and a single drop rises from them.
    for (const prompt of ["What did the Prophet ﷺ compare this world to?", "What is this world compared to, in the hadith?"]) {
      const { kind, pause, reveal } = asked(prompt);
      expect([prompt, shown(prompt, ["a drop it brings back", "so little, beside it all", "the whole sea, shining"]), moved(prompt, "a drop it brings back", "y"), moved(prompt, "a ring spreading on the water 1", "scale"), [pause < 0.31 && 0.31 < reveal, value(kind, "a splash, where it dipped", "opacity", 0.31)]]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ],
        [0, -17],
        [0.3, 1.9],
        [true, 1]
      ]);
    }
    // Only rings on the water; then the drop, so small, while the whole sea shines around it.
    for (const prompt of ["Next to the Hereafter, this world is very small.", "The hadith says this world is bigger than the Hereafter."]) {
      expect([prompt, shown(prompt, ["a drop it brings back", "so little, beside it all", "the whole sea, shining", "glints across the sea"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // The land sold, nothing in it; then a way digs in it, and a jar of gold rises.
    const found = "What did the buyer find in the land?";
    expect([shown(found, ["a way, digging in the land", "the earth, dug", "a jar of gold", "the gold, shining"]), moved(found, "a jar of gold", "y")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [5, 0]
    ]);
    // The jar found; then it is taken to the home that sold the land, and a voice gives it back.
    const back = "Why did the buyer say the gold was not his?";
    expect([shown(back, ["a way, taking it to the home that sold it", "a voice, giving the gold back"]), moved(back, "a jar of gold", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -58]
    ]);
    // The two homes joined; then the gold goes to both, and the rest rises as charity.
    const rest = "The rest of the gold was given away in charity.";
    expect([shown(rest, ["the two homes, joined", "the rest, given in charity 1", "the rest, given in charity 3"]), moved(rest, "the gold, spent on the home that sold it", "x"), moved(rest, "the gold, spent on the home that bought it", "x")]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [0, -62],
      [0, 42]
    ]);
    // The chest of gold at the home; then gold goes from it next door, and the chest stays full.
    const lessens = [
      ["Does charity make your wealth less?", "No, never"],
      ["Does charity make your wealth less?", "No"],
      ["What does charity not do, in the hadith?"],
      ["What does charity not do, per Muslim 2588?"],
      ["What does charity not do to wealth?"],
      ["What does charity do to wealth?"],
      ["What happens to wealth given in charity?"]
    ];
    for (const [prompt, answer] of lessens) {
      const { kind, pause, reveal } = asked(prompt, answer);
      const gold = [pause, reveal].map((t) => value(kind, "gold given in charity 1", "x", t));
      expect([prompt, shown(prompt, ["a way to the home next door", "the chest, still full", "honor, shining on the home"], answer), gold]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ],
        [0, 71]
      ]);
    }
    // Then harsh words come from next door, a voice forgives, and honor shines on the home.
    const forgives = [
      ["What does Allah give someone who forgives?"],
      ["What does Allah give the one who forgives?"],
      ["What does Allah give one who forgives?"],
      ["What does forgiving others bring?", "More honor"],
      ["What does forgiving others bring?", "More honor from Allah"],
      ["Forgiving others brings more honor from Allah."],
      ["Forgiving people lowers your honour."]
    ];
    for (const [prompt, answer] of forgives) {
      const { kind, pause, reveal } = asked(prompt, answer);
      expect([prompt, shown(prompt, ["honor, shining on the home", "honor, rising 1", "honor, rising 3", "a prayer mat"], answer), [pause < 0.42 && 0.42 < reveal, value(kind, "harsh words from the home next door", "opacity", 0.42), value(kind, "a voice, forgiving", "opacity", 0.42)]]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [true, 1, 1]
      ]);
    }
    // Then a voice prays low on a prayer mat, and the home is raised up on a hill.
    for (const prompt of ["What does Allah do for someone humble for His sake?", "What happens to one humble for Allah, per Muslim 2588?", "Who is raised in status, in the hadith?", "Humbling yourself for Allah raises you.", "Humbling yourself for Allah lowers you."]) {
      const { kind, pause, reveal } = asked(prompt);
      expect([prompt, shown(prompt, ["a prayer mat", "a hill, rising under the home", "raised up, rising 1", "raised up, rising 4"]), moved(prompt, "a home, with a chest of gold", "y"), [pause < 0.75 && 0.75 < reveal, value(kind, "a voice, praying low and humbly", "opacity", 0.75)]]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, -12],
        [true, 1]
      ]);
    }
  });

  it("goes quickly up to the moment, and plays the moment at the story's pace, never too long", () => {
    expect(leadMs(11000, 0)).toBe(1);
    expect(leadMs(11000, 0.1)).toBe(800);
    expect(leadMs(11000, 0.36)).toBe(1980);
    expect(leadMs(11000, 0.74)).toBe(3500);
    expect(momentMs(11000, 0.74, 1)).toBe(2860);
    expect(momentMs(10500, 0, 0.71)).toBe(5000);
  });
});

describe("the scene", () => {
  const ark = SIGN_SCENES.find((scene) => scene.kind === "ark")!;
  const judi = sceneMoment("ark", "It came to rest on al-Judi")!;
  const words = signArt("ark").words;
  const opacity = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID, ALL).props.style)?.opacity;

  it("stands at the moment before with a ? (reduce motion), and at the moment, its words showing, once answered", async () => {
    const view = await render(<SignSceneView scene={ark} width={292} height={178} still ask={{ ...judi, revealed: false }} testID="ark" />);
    expect(opacity("ark-ask")).toBe(1);
    words.forEach((_, index) => expect(opacity(`ark-words-${index}`)).toBe(0));
    await view.rerender(<SignSceneView scene={ark} width={292} height={178} still ask={{ ...judi, revealed: true }} testID="ark" />);
    expect(opacity("ark-ask")).toBe(0);
    expect(words.map((_, index) => opacity(`ark-words-${index}`))).toEqual([0, 0, 0, 0, 1]);
  });
});

describe("the question on its scene", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;
  const lesson = LESSONS_BY_ID["lesson-deep-prophet-nuh-judi"];
  const judi = lesson.challenges.find((challenge) => challenge.prompt === "Where did the Ark come to rest?")!;
  const ask = sceneQuestionFor(judi)!;
  const wrong = judi.choices.find((choice) => choice.id !== judi.correctChoiceId)!.id;

  it("shows the scene waiting, and the answers; CHECK waits for one", async () => {
    const onSelect = jest.fn();
    await render(<SceneGame {...shared} prompt={judi.prompt} choices={judi.choices} ask={ask} correctChoiceId={judi.correctChoiceId} onSelect={onSelect} />);
    expect(screen.getByText("Watch, then answer")).toBeTruthy();
    expect(screen.getByTestId("scene-game-scene", ALL)).toBeTruthy();
    expect(screen.getByTestId("scene-game-ark-waiting", ALL)).toBeTruthy();
    expect(screen.getByTestId("scene-game-ark-waiting-ask", ALL)).toBeTruthy();
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press(`choice-${wrong}`);
    await press(`choice-${judi.correctChoiceId}`);
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual([wrong, judi.correctChoiceId]);
  });

  it("plays the moment once answered: a right answer green; a wrong one red, with the right one green", async () => {
    const view = await render(
      <SceneGame {...shared} prompt={judi.prompt} choices={judi.choices} ask={ask} correctChoiceId={judi.correctChoiceId} selectedChoiceId={judi.correctChoiceId} result={{ correct: true, correctLabel: "On al-Judi", why: "" }} onSelect={jest.fn()} />
    );
    expect(background(`scene-tile-${judi.correctChoiceId}`)).toBe(colors.correctBg);
    expect(screen.getByTestId("scene-game-ark-moment", ALL)).toBeTruthy();
    await view.unmount();
    await render(
      <SceneGame {...shared} prompt={judi.prompt} choices={judi.choices} ask={ask} correctChoiceId={judi.correctChoiceId} selectedChoiceId={wrong} result={{ correct: false, correctLabel: "On al-Judi", why: "" }} onSelect={jest.fn()} />
    );
    expect(background(`scene-tile-${wrong}`)).toBe(colors.wrongBg);
    expect(background(`scene-tile-${judi.correctChoiceId}`)).toBe(colors.correctBg);
    expect(screen.getByTestId("scene-game-ark-moment", ALL)).toBeTruthy();
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(screen.getByTestId(`choice-${wrong}`)).toBeDisabled();
  });

  it("gives the scene the teacher's room on a phone with little of it, and keeps it so: nothing moves again", async () => {
    // The room the game has (its scroll view), where the scene's row starts and how wide it is, the answers' height.
    const scroller = () => screen.getByTestId("scene-game").children[0] as TestInstance;
    const room = (height: number) => fireEvent(scroller(), "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 360, height } } });
    const place = (y: number, width: number) => fireEvent(screen.getByTestId("scene-game-row", ALL), "layout", { nativeEvent: { layout: { x: 0, y, width, height: 130 } } });
    const tiles = (height: number) => fireEvent(screen.getByTestId("scene-game-tiles", ALL), "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 328, height } } });
    const tileHeight = () => StyleSheet.flatten(screen.getByTestId(`scene-tile-${judi.correctChoiceId}`, ALL).props.style)?.minHeight;
    const sceneHeight = () => StyleSheet.flatten(screen.getByTestId("scene-game-scene", ALL).props.style)?.height;
    const props = { ...shared, prompt: judi.prompt, choices: judi.choices, ask, correctChoiceId: judi.correctChoiceId, onSelect: jest.fn() };

    // A tall phone: the teacher asks, the scene shows at its full size (358 wide).
    const roomy = await render(<SceneGame {...props} />);
    await act(async () => {
      room(760);
      place(150, 362);
      tiles(216);
    });
    expect(screen.getByTestId("question-mascot", ALL)).toBeTruthy();
    expect(tileHeight()).toBe(50);
    expect(sceneHeight()).toBe(218 + 4);
    // Its sheet up, with less room: nothing moves.
    await roomy.rerender(<SceneGame {...props} selectedChoiceId={judi.correctChoiceId} result={{ correct: true, correctLabel: "On al-Judi", why: "" }} />);
    await act(async () => room(420));
    expect(screen.getByTestId("question-mascot", ALL)).toBeTruthy();
    expect(tileHeight()).toBe(50);
    await roomy.unmount();

    // A short phone: the scene would be squeezed, so the teacher steps aside and the answers get smaller; it stays so.
    await render(<SceneGame {...props} />);
    await act(async () => {
      room(420);
      place(150, 328);
      tiles(216);
    });
    expect(screen.queryByTestId("question-mascot", ALL)).toBeNull();
    expect(tileHeight()).toBe(40);
    await act(async () => room(900));
    expect(screen.queryByTestId("question-mascot", ALL)).toBeNull();
    expect(tileHeight()).toBe(40);
  });

  it("speaks the learner's language", async () => {
    setActiveLanguage("ar");
    const shown = localizeLessonContent(lesson, "ar").challenges.find((challenge) => challenge.id === judi.id)!;
    await render(<SceneGame {...shared} prompt={shown.prompt} choices={shown.choices} ask={ask} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("شاهد، ثم أجب")).toBeTruthy();
    expect(screen.getByTestId(`choice-${judi.correctChoiceId}`)).toHaveTextContent(/[؀-ۿ]/);
  });
});

describe("in a lesson", () => {
  it("asks where the ark came to rest on its scene, and goes on", async () => {
    variety(true);
    const section = COURSE.sections.find((each) => each.nodes.some((node) => node.lessonIds.includes("lesson-deep-prophet-nuh-judi")))!;
    const at = section.nodes.findIndex((node) => node.lessonIds.includes("lesson-deep-prophet-nuh-judi"));
    const before = section.nodes.slice(0, at);
    const user = makeUser({
      lastTopicId: section.topicId,
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === section.nodes[at].id) as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    await render(<TopicApp />);
    await screen.findByTestId(`learn-path-${section.topicId}`);
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    let onScene = 0;
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(session.lesson.challenges);
        continue;
      }
      const shown = questionOnScreen(session.lesson.challenges);
      if (!shown) break;
      if (screen.queryByTestId("scene-game")) {
        onScene += 1;
        expect(screen.getByTestId("scene-game-scene", ALL)).toBeTruthy();
      }
      await pickRight(shown);
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(onScene).toBeGreaterThanOrEqual(1);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
  });
});
