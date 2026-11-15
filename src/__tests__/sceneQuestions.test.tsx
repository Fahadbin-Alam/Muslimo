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
    expect(asks.length).toBe(1675);
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
    // "The reward of the adhan" unit's final quiz asks one of its scene questions: with five lessons it asked who was
    // told to call the first adhan, and with seven it asks whether people had to guess the prayer time before the
    // adhan (both are still asked in their lesson). The "Spending, the Quran's way" unit's first review and final
    // quiz now also draw on its lessons on 2:265, 2:272 and 2:274, so three of its scene questions are each asked in
    // one place fewer (they are still asked in their lessons). "Zakat in Islam" now has seven lessons, so it gets a
    // review card, which asks two of its scene questions, and its final quiz draws one more. "A fresh start" gained
    // its lesson on 3:136, so its final quiz asks one scene question fewer (that question is still asked in its
    // lesson). "Neighbors and guests" now has seven lessons, so it gets a review card, which asks one of its scene
    // questions. "The reward of dhikr" and "Patience and thanks" each gained a lesson, so their final quizzes each ask
    // one scene question fewer: the first no longer asks about the one who remembers Allah, and the second asks what to
    // say after something goes wrong in place of what a believer does when something hard happens and whether saying
    // if only opens a door to Shaytan. The final quiz of "Jahannam" swaps two of its scene questions for two others.
    // Every one of them is still asked in its own lesson. "The Book of the Virtues of the Quran" gained a lesson, so its
    // final quiz no longer asks what we are told to do with the Quran (still asked in its lesson). "The reward of dhikr"
    // gained a lesson too: its final quiz now asks whether he also said Allah is not deaf or far away, and no longer
    // asks which pair are the two words or where la hawla wa la quwwata illa billah is a treasure of (both still asked in
    // their lessons). "The intercession and the Pool" gained a lesson, so its final quiz asks how wide the Pool is in
    // place of how many cups it has (both still asked in their lesson). "This world and the next" now has seven
    // lessons, so it gets a review card, which asks what he compared greed for wealth and honor to, and its final
    // quiz asks what that greed harms in its place. "The Book of the Virtues of the Quran" now has thirteen lessons,
    // so it gets a second review card, which asks what a believer who does not recite is like. Both are still asked
    // in their lessons. "Real strength" and "Steady on the straight path" now have seven lessons, so each gets a
    // review card, which asks what was happening when he said who is truly strong, and what the believer is like;
    // their final quizzes now ask who is truly strong, and what the plant does when the wind stops, in their place.
    // The final quizzes of "Brothers and sisters in faith" and "Jibril kept advising" each swap one scene question
    // for another. Every one of them is still asked in its own lesson. The night prayer unit gained its lesson on how
    // he opened the night prayer, so its final quiz no longer asks how much of the night Dawud prayed (still asked in
    // its lessons).
    expect(places).toBe(2433);
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

  it("waits on the scenes from his ﷺ life before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-crying-trunk", "sign-trench-rock", "sign-chasing-horse", "sign-milk-bowl", "sign-bread-for-seventy", "sign-nightfall", "sign-half-date"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(21);
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
    // The pulpit made and the voice speaking from it, no crying yet; then the trunk shakes, crying to each side.
    const cried = "What did the palm trunk do?";
    const { kind: mosque, pause: pulpit, reveal: crying } = asked(cried);
    expect([shown(cried, ["a voice from the pulpit", "its crying, to the left", "its crying, to the right"]), [pulpit < 0.52 && 0.52 < crying, value(mosque, "the palm trunk he stood by", "rotate", 0.52)]]).toEqual([
      [
        [1, 0, 0],
        [0, 1, 1]
      ],
      [true, 1.4]
    ]);
    // Still crying; then a way goes back to it from the pulpit, a glow holds it, its crying stops, and calm rises.
    expect(shown("What did the Prophet ﷺ do then?", ["its crying, to the left", "a way, from the pulpit to the trunk", "a glow, holding the trunk", "calm, rising 1"])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // The rock that no spade could break; then a way comes, a spade strikes it once, and it becomes soft sand.
    const rock = "What did the Prophet ﷺ do to the rock, in the hadith?";
    expect([shown(rock, ["a great rock in the trench", "a way, coming to the rock", "a spade, striking once", "soft sand, where the rock was", "the way cleared, rising 1"]), moved(rock, "soft sand, where the rock was", "scale")]).toEqual([
      [
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1]
      ],
      [0.4, 1]
    ]);
    // The horse caught up with the camel; then a voice makes du'a, and the horse pitches into the sand in a cloud of dust.
    const thrown = "What happened to Suraqah's horse?";
    const { kind: road, pause: caught, reveal: fallen } = asked(thrown);
    expect([shown(thrown, ["dust, as it falls 1", "dust, as it falls 3"]), moved(thrown, "a horse, chasing them", "rotate"), moved(thrown, "a horse, chasing them", "y"), [caught < 0.28 && 0.28 < fallen, value(road, "a voice from the camel, making du'a", "opacity", 0.28)]]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 38],
      [0, 3],
      [true, 1]
    ]);
    // No bowl yet; then one bowl of milk comes, and goes from place to place in the Suffah, still full.
    const bowls = "How many bowls of milk were there?";
    expect([shown(bowls, ["a bowl of milk, given as a gift", "a place, sitting 5"]), moved(bowls, "a bowl of milk, given as a gift", "x"), moved(bowls, "the milk in it", "scaleY")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -14],
      [1, 1]
    ]);
    // The places filled; then the bowl goes round them all, and only then comes to one more place, by the door.
    const first = "Abu Hurairah drank before the people of the Suffah.";
    expect([shown(first, ["a place, sitting 5", "a place by the door"]), moved(first, "a bowl of milk, given as a gift", "x")]).toEqual([
      [
        [1, 0],
        [1, 1]
      ],
      [0, -8]
    ]);
    // The bowl at the door; then it goes in, what was left is drunk, and praise rises.
    const last = "Who drank last?";
    expect([moved(last, "a bowl of milk, given as a gift", "x"), moved(last, "the milk in it", "scaleY"), shown(last, ["praise, rising 1", "praise, rising 3"])]).toEqual([
      [-8, 0],
      [1, 0.2],
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // Nothing yet; then a bundle of barley loaves goes along a small way to the mosque.
    const loaves = "What did Umm Sulaym send to the Prophet ﷺ?";
    expect([shown(loaves, ["barley loaves, wrapped in a cloth", "a small way, carrying them"]), moved(loaves, "barley loaves, wrapped in a cloth", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 70]
    ]);
    // The bread broken on the cloth; then ten come in and go out full, again and again, and the bread is still there.
    for (const prompt of ["How many men came in to eat at a time?", "Everyone there ate until they were full."]) {
      const { kind, pause, reveal } = asked(prompt);
      expect([prompt, shown(prompt, ["the bread, broken in pieces", "ten, coming in, first", "ten, going out full, third"]), [pause < 0.59 && 0.59 < reveal, value(kind, "ten, coming in, first", "opacity", 0.59)]]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 0, 0]
        ],
        [true, 1]
      ]);
    }
    expect(shown("Everyone there ate until they were full.", ["the bread, still there", "all fed, rising 1"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Night fallen and the door open; then it closes as a voice says Bismillah at it.
    const door = "What should you say as you close the door at night?";
    const { kind: home, pause: open, reveal: closed } = asked(door);
    expect([moved(door, "the door, closing", "scaleX"), shown(door, ["a cord, tying the water skin"]), [open < 0.33 && 0.33 < closed, value(home, "a voice, saying Bismillah at the door", "opacity", 0.33)]]).toEqual([[0.12, 1], [[0], [0]], [true, 1]]);
    // Nothing yet; then a date is split, and half goes along a way to a home in need, as a shield of light rises.
    for (const prompt of ["What small thing can shield you from the Fire?", "What can half a date protect from?"]) {
      expect([prompt, shown(prompt, ["half a date, given", "a way to the home in need", "a shield of light around the way"]), moved(prompt, "half a date, given", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, 62]
      ]);
    }
    // The date split in two; then half goes to the home in need, and a shield of light rises around the way.
    for (const prompt of ["How small can a charity be?", "What small charity did he name?", "A tiny gift given for Allah still counts.", "Small charity matters to Allah.", "Charity only counts if it is large."]) {
      expect([prompt, shown(prompt, ["half a date, kept", "half a date, given", "a shield of light around the way"]), moved(prompt, "half a date, given", "x"), moved(prompt, "a shield of light around the way", "scale")]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [1, 1, 1]
        ],
        [0, 62],
        [0.5, 1]
      ]);
    }
    // Then a way comes from another home, with nothing to give, a voice says a good word, and a shield rises around it.
    for (const prompt of ["If you have nothing to give?", "What if you have no date to give?", "A kind word is a good deed anyone can do."]) {
      const { kind, pause, reveal } = asked(prompt);
      expect([prompt, shown(prompt, ["a way, from another home", "a shield of light around that way too", "a good deed, rising 1"]), [pause < 0.7 && 0.7 < reveal, value(kind, "a voice, saying a good word", "opacity", 0.7)]]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [true, 1]
      ]);
    }
  });

  it("waits on more scenes from his ﷺ life and from what he told before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-lamp-out", "sign-helped-at-home", "sign-a-span-closer", "sign-uhud-shook", "sign-greeting-stone", "sign-around-us", "sign-blessed-water"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(20);
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
    // The guest come in; then the little ones go to the mat and a blanket covers them.
    const food = "What food did the wife have?";
    expect([moved(food, "the little ones' places", "x"), shown(food, ["a blanket over the little ones"])]).toEqual([[0, 37], [[0], [1]]]);
    // The lamp still lit and the food not eaten; then the light goes out, the room is dark, and the food is eaten.
    const light = "Why did they put out the light?";
    expect([shown(light, ["the lamp's light", "the room, dark"]), moved(light, "the food in it", "scaleY"), moved(light, "a small pot of food", "x")]).toEqual([
      [
        [1, 0],
        [0, 0.6]
      ],
      [1, 0.12],
      [0, -6]
    ]);
    // Night still; then the morning comes, and praise rises.
    expect(shown("This story led to the words of 59:9.", ["the window at dawn", "praise, rising 1", "praise, rising 3"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // Home, and nothing done yet; then the way goes from one of his family to the next, a warm glow on each.
    expect(shown("What did the Prophet ﷺ do at home?", ["a way, going to the first of them", "the way, going to the last", "a warm glow on the first place", "a warm glow on the last place"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // The call to prayer heard; then the way goes out to the mosque, and the prayer rises.
    for (const prompt of ["What did he do when prayer time came?", "What did he ﷺ do when prayer time came?"]) {
      expect([prompt, shown(prompt, ["a way, out to the mosque", "the prayer, rising 1"]), moved(prompt, "the sun", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [52, 52]
      ]);
    }
    // A voice has asked; then a voice from the hut answers, and a way sets out for the village.
    expect(shown("Where was the man going, in the hadith?", ["a way, setting out for the village", "the way, going on"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // On the road; then the way goes on, and stops at a ring.
    expect(shown("Where did he die?", ["the way, going on", "a ring, where the way stopped"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // The villages moved; then the two are measured, the way's end glows and forgiveness rises.
    for (const prompt of ["How much closer was he to the good village?", "How close was he to the good town?", "What happened to him at the end?"]) {
      expect([prompt, shown(prompt, ["a line, measured to the village he left", "a line, measured to the village ahead", "a glow, where the way stopped", "forgiveness, rising 1"]), moved(prompt, "the village ahead", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [-6, -6]
      ]);
    }
    // "Be firm" said and the mountain still; then a glow on each place in turn, and light rises.
    for (const prompt of ["What did the Prophet ﷺ call Abu Bakr that day?", "What did the Prophet ﷺ call Uthman on Uhud?"]) {
      expect([prompt, shown(prompt, ["a glow on the first place", "a glow on the second place", "glows on the other two places", "light, rising from the top 1"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // A way along the valley, the stone silent; then the way passes it, and a voice greets from it as it glows.
    const greet = "What did the stone in Makkah use to do?";
    expect(shown(greet, ["the way, passing the stone", "a voice from the stone, greeting", "a glow on the stone"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The voice again; then the stone shines, and light rises.
    expect(shown("He ﷺ said he still knew that stone.", ["the stone, shining", "light, rising from the stone 1"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Nothing yet; then a voice in the mosque asks.
    expect(shown("When did the man ask him ﷺ to pray for rain?", ["a voice in the mosque, asking", "a cloud like a shield"])).toEqual([
      [0, 1],
      [1, 1]
    ]);
    // A week of rain on the town and around it; then a voice prays again, the clouds part to the hills, and the rain
    // stops on the town but not around it.
    const around = "What did he ﷺ say when the rain had to stop?";
    expect([shown(around, ["rain on the town", "rain on the hills around"]), moved(around, "rain clouds to the left", "x"), moved(around, "rain clouds to the right", "x")]).toEqual([
      [
        [1, 1],
        [0, 1]
      ],
      [0, -38],
      [0, 38]
    ]);
    // The rain stopped; then the sun comes out, and ways walk out in it.
    expect(shown("After the second du'a, they walked out in the sun.", ["the sun", "a way, walking out in the sun", "another way, walking out in the sun"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // A little water in the bowl; then a voice by it, and the water rises and wells up.
    const blessing = "Whom did he ﷺ say the blessing was from?";
    expect([shown(blessing, ["a voice by the bowl", "water, welling up"]), moved(blessing, "the water in the bowl", "scale")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0.4, 1]
    ]);
    // No meal yet; then a meal is set out, voices come from the food, and praise rises.
    expect(shown("What did the Companions hear, in the hadith?", ["a meal on a cloth", "voices from the food", "praise, rising from the food 1"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
  });

  it("waits on the scenes of what he ﷺ told and lived, from the shepherds to the deeds that stay, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-shepherds", "sign-date-mountain", "sign-deeds-continue", "sign-good-intentions", "sign-safa-call", "sign-jabir-dates", "sign-three-follow"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(55);
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
    // No flock yet; then a flock far off comes into sight on each of three hills, a way among each.
    for (const prompt of ["What work did every prophet do, the Prophet ﷺ said?", "What job did every Prophet do, in the hadith?", "What work did every Prophet do?"]) {
      expect([prompt, shown(prompt, ["a flock far off, on the first hill", "another flock far off", "a third flock far off", "a way among them", "a way among the third"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Asked, and no answer yet; then the homes of Makkah and the Ka'bah come into sight, and its sheep come out.
    for (const [prompt, answer] of [
      ["Whose sheep did the Prophet ﷺ look after?", "The people of Makkah's"],
      ["Whose sheep did the Prophet ﷺ tend?", "The people of Makkah's"],
      ["Whose sheep did the Prophet ﷺ tend?", "The people of Makkah"]
    ]) {
      expect([prompt, answer, shown(prompt, ["homes of Makkah", "the Ka'bah", "a sheep of Makkah, coming out 1", "a sheep of Makkah, coming out 4", "a way, out with the sheep"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // The sheep out, and nothing paid yet; then a few small coins shine.
    expect(shown("What was he ﷺ paid for it?", ["a qirat, a small coin 1", "a qirat, a small coin 2", "a qirat, a small coin 3"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // No date in sight; then the palm and its basket, and one date goes to the home in need.
    for (const prompt of ["How small is the charity, in the hadith?", "How small can the charity be?"]) {
      expect([prompt, shown(prompt, ["its own date palm", "a basket of its dates", "one date, given"]), moved(prompt, "one date, given", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, 77]
      ]);
    }
    // Nothing given yet; then the date is given, a glow comes on it, accepted, and its reward rises.
    for (const prompt of ["Which charity does Allah accept, per the hadith?", "What money does Allah accept, in the hadith?", "Allah accepts only honestly earned money."]) {
      expect([prompt, shown(prompt, ["one date, given", "a glow on the date, accepted", "its reward, rising 1"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // The reward grown with the foal, and no mountain yet; then the mountain rises, and light comes on it.
    for (const prompt of ["How big can one date of charity grow, per the hadith?", "How big does it grow, in the hadith?", "How big does its reward grow?"]) {
      expect([prompt, shown(prompt, ["the reward, as big as a mountain", "light on the mountain"]), moved(prompt, "the reward, as big as a mountain", "scale")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0.08, 1]
      ]);
    }
    // The way of deeds ended; then the well's water flows, those who drink come, the charity rises, and the glow grows.
    for (const prompt of [
      "How many deeds keep going after death?",
      "Planting a tree people use, or building a well, is...",
      "How many deeds continue after death in this hadith?",
      "How many deeds continue after death, per Muslim 1631?",
      "How many deeds continue after death?"
    ]) {
      expect([prompt, shown(prompt, ["water, flowing to the trough", "someone, coming to drink 1", "the charity, still rising 1", "a soft glow on the place"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0.3],
          [1, 1, 1, 0.55]
        ]
      ]);
    }
    // The charity going on; then those who learned, voices passing it on, and the knowledge rising.
    for (const [prompt, answer] of [
      ["Which is one of them?", "Knowledge that benefits people"],
      ["Useful knowledge someone left keeps rewarding him.", "True"]
    ]) {
      expect([prompt, shown(prompt, ["someone, who learned 1", "a voice, passing it on 1", "the knowledge, still rising 1", "a soft glow on the place"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0.55],
          [1, 1, 1, 0.8]
        ]
      ]);
    }
    // The knowledge going on; then a little one by the place prays, the prayer rises, and the glow is full.
    for (const [prompt, answer] of [
      ["Which of these keeps helping a person after death?", "A righteous child's dua"],
      ["Which is one of the three, per Muslim 1631?", "A pious child who prays"],
      ["Which is one of them?", "A child who prays for him"],
      ["Dua for parents stops helping them after they die.", "False"]
    ]) {
      expect([prompt, answer, shown(prompt, ["a little one, by the place", "a voice, praying for him", "the prayer, rising 1", "a soft glow on the place"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 0.8],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Nothing yet; then a good intention glows, and one full good deed rises.
    for (const prompt of [
      "What is written if you plan a good deed but cannot do it?",
      "What if one only intends a good deed?",
      "What is written for a good intention not done, per Bukhari 6491?",
      "What is written for intending good, per Bukhari 6491?",
      "What if you intend good but do not do it?"
    ]) {
      expect([prompt, shown(prompt, ["a good intention, glowing", "a full good deed, rising 1"]), moved(prompt, "a full good deed, rising 1", "y")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, -16]
      ]);
    }
    // One good deed risen; then the deed is done, ten rise, and many more.
    for (const prompt of [
      "How many times can a good deed done be multiplied?",
      "How high can a good deed go, per Bukhari 6491?",
      "How is a done good deed written?",
      "How much is a done good deed multiplied?",
      "A good deed done is multiplied up to?",
      "How much for a good deed you do?"
    ]) {
      expect([prompt, shown(prompt, ["a way to the home in need", "ten good deeds, rising 1", "ten good deeds, rising 10", "many more, rising"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // No dark dot yet; then a bad intention comes and is left, and a full good deed rises in its place.
    for (const prompt of ["Per Bukhari 6491, a bad deed you meant but left is...", "What is written if one drops a bad intention?", "A bad deed you hold back from is written as a good deed."]) {
      expect([prompt, shown(prompt, ["a bad intention, a dark dot", "a full good deed, rising in its place 1"]), moved(prompt, "a full good deed, rising in its place 1", "y")]).toEqual([
        prompt,
        [
          [0, 0],
          [0, 1]
        ],
        [0, -16]
      ]);
    }
    // Then another bad intention, done, rises as one dark dot only.
    for (const prompt of ["A bad deed done is written as ten bad deeds.", "How is a bad deed that is done written?"]) {
      expect([prompt, shown(prompt, ["a way to another, the deed done", "another bad intention, done: one bad deed"]), moved(prompt, "another bad intention, done: one bad deed", "y")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, -14]
      ]);
    }
    // Makkah, and no one on the hill; then a way climbs as-Safa, and a voice calls from a ring on its top.
    expect(shown("Where did the Prophet ﷺ call his people from?", ["a way, climbing as-Safa", "a golden ring on the top, his place", "a voice from the top, calling"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The question asked, its voice gone; then voices answer from below.
    for (const prompt of ["What did Quraysh say about his honesty?", "Why did Quraysh say they would believe him?"]) {
      expect([prompt, shown(prompt, ["a voice from the top, asking", "voices from below, answering"])]).toEqual([
        prompt,
        [
          [0, 0],
          [0, 1]
        ]
      ]);
    }
    // The answer given, its voices gone; then a voice warns from the top.
    expect(shown("What did he call himself to them?", ["voices from below, answering", "a voice from the top, warning"])).toEqual([
      [0, 0],
      [0, 1]
    ]);
    // One of them still among the rest; then a harsh voice, and that one goes away.
    const lahab = "Abu Lahab thanked him for the warning.";
    expect([shown(lahab, ["one of them, gathering too", "the way that one went away"]), moved(lahab, "one of them, gathering too", "x")]).toEqual([
      [
        [1, 0],
        [0, 1]
      ],
      [0, 22]
    ]);
    // Nothing yet; then the heap of dates, and the lenders come.
    expect(shown("What did Jabir's father leave behind?", ["the heap of dates", "a lender, waiting 1", "a lender, waiting 5"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // The lenders doubting; then three ways come to the dates, a ring sits on them, a voice prays and blessing rises.
    expect(shown("What did the Prophet ﷺ do with the dates?", ["a way, coming to the dates", "two more ways, with it", "a golden ring on the dates, his place", "a voice, praying for blessing", "blessing, rising from the dates 1"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Every lender paid; then thirteen wasqs stand left over, and praise rises.
    expect(shown("How many loads were left after paying everyone?", ["a full sack, by the lender 1", "a full sack, by the lender 5", "thirteen wasqs, left over 1", "thirteen wasqs, left over 13", "praise, rising 1"])).toEqual([
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Nothing yet; then the open grave and the way to it (no one follows yet: the words say how many).
    expect(shown("How many things follow the dead to the grave?", ["the grave, open", "a way, to the grave", "his family, following 1", "his wealth, a laden camel, following"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 0, 0]
    ]);
    // All three at the grave; then it is closed, and the family and the camel turn round and go back.
    const back = "Which two go back home?";
    expect([shown(back, ["his family, following 1", "his family, following 3", "his wealth, a laden camel, following", "his deeds, a soft light, following", "the grave, closed"]), moved(back, "his wealth, a laden camel, following", "x"), moved(back, "his wealth, a laden camel, following", "scaleX")]).toEqual([
      [
        [1, 1, 1, 1, 0],
        [0, 0, 0, 1, 1]
      ],
      [0, -80],
      [1, -1]
    ]);
    // All three at the grave, so nothing shows which stays; then two go back, and the light stays on the grave and rises.
    for (const prompt of ["What stays with you in the grave?", "What stays with him?", "Good deeds are the only friends that stay."]) {
      expect([prompt, shown(prompt, ["his family, following 1", "his wealth, a laden camel, following", "his deeds, a soft light, following", "a glow, staying on the grave", "light, rising from his deeds 1"])]).toEqual([
        prompt,
        [
          [1, 1, 1, 0, 0],
          [0, 0, 1, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of kindness and a believer's heart, from good in every state to those you love, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-good-in-every-state", "sign-your-mother", "sign-cheerful-face", "sign-learn-and-teach", "sign-one-body", "sign-eat-near", "sign-those-you-love"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(88);
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
    // When good comes: no crops grown and no thanks yet; then the crops are green, a voice gives thanks and good rises.
    for (const [prompt, answer] of [
      ["What does a believer do when something good happens?", "Thanks Allah"],
      ["What should a believer do when good comes, in Muslim 2999?", "Be grateful"],
      ["What does the believer do when good comes, per the hadith?", "He gives thanks"],
      ["What does a believer do in good times, in the hadith?", "He thanks Allah"],
      ["What does a believer do in happy times?", "Thanks Allah"]
    ]) {
      expect([prompt, shown(prompt, ["the crops, growing green 1", "a voice from the place, giving thanks", "good for him, rising 1"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // When harm comes: the crops still green and no light of patience; then they dry, the calm light comes and good rises.
    for (const [prompt, answer] of [
      ["What does a believer do when something hard happens?", "Is patient"],
      ["And when hardship comes?", "Be patient"],
      ["What does a believer do in trouble?", "He is patient"],
      ["What does a believer do in trouble?", "Stays patient"],
      ["What does he do in trouble, in the hadith?", "Endures it patiently"]
    ]) {
      expect([prompt, answer, shown(prompt, ["the crops, dried 1", "a calm light on the place, patience", "good for him again, rising 1"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // Both: nothing has risen yet; then good rises with the thanks, and again with the patience.
    for (const prompt of ["For a believer, both good and hard times can be good.", "For the believer, both ease and hardship can be good."]) {
      expect([prompt, shown(prompt, ["good for him, rising 1", "good for him again, rising 1"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // Good for no one but the believer: the glow on his place grows.
    expect(shown("Good in every affair is for everyone, not only believers.", ["a warm glow on the place"])).toEqual([[0.7], [1]]);
    // Your mother, three times: no light yet; then three lights above the first one at home, and her glow full. Your
    // father: no light above the next one; then one.
    for (const [prompt, answer] of [
      ["How many times did the Prophet ﷺ say 'your mother'?", "Three"],
      ["How many times did he ﷺ say: your mother?", "Three times"],
      ["Whom did the Prophet ﷺ name three times for kindness?", "Your mother"],
      ["How many times was the mother named?", "Three"]
    ]) {
      expect([prompt, shown(prompt, ["a light above the first one 1", "a light above the first one 2", "a light above the first one 3", "a glow on the first one"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["Who came after the mother?", "The father"],
      ["Who came after the mother, in the hadith?", "Your father"],
      ["Who came fourth, per Bukhari 5971?", "Your father"]
    ]) {
      expect([prompt, shown(prompt, ["a light above the next one", "a glow on the next one", "a voice from his place, answering 4"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // A cheerful face: the two have met, and no glow yet; then the warm glow, greetings both ways and a good deed rising.
    for (const [prompt, answer] of [
      ["How should you meet your brother?", "With a smile"],
      ["How should we meet our brother, in the hadith?", "With a cheerful face"],
      ["What good deed did he mention to Abu Dharr?", "A cheerful face"]
    ]) {
      expect([prompt, shown(prompt, ["someone, coming", "a warm glow between them, cheerful", "greetings, both ways", "a good deed, rising 1"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Any good deed: nothing rises yet; then the small good deeds rise.
    expect(shown("What should we never think little of?", ["small good deeds, rising 1", "small good deeds, rising 4"], "Any good deed")).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Learn and teach: no voice and no new circle yet; then he recites, they repeat, a light comes on each, and three new
    // circles are taught.
    for (const [prompt, answer] of [
      ["Who are the best among us?", "Those who learn and teach the Quran"],
      ["Who is best, in the hadith?", "Who learns and teaches Quran"],
      ["Who are the best, per Bukhari 5027?", "Who learn and teach the Quran"]
    ]) {
      expect([prompt, shown(prompt, ["a light on each of them", "a way, going out to teach 1", "a new circle, gathering 3", "a voice, teaching 3"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    expect(shown("Once you learn the Quran, you should keep it to yourself.", ["a light on each of them", "a way, going out to teach 1", "a new circle, gathering 1"], "False")).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    // Like one body: joined by threads, and no shape yet; then one soft shape holds them all. One unwell: no night and no
    // fever yet; then night, the windows lit, the warm glow on every one of them, the threads glowing.
    for (const prompt of ["Believers are like what?", "What are believers like, in their love?", "What are believers like, per Bukhari 6011?"]) {
      expect([prompt, shown(prompt, ["a warm thread between them 1", "one soft shape holding them all"], "One body")]).toEqual([
        prompt,
        [
          [1, 0],
          [1, 1]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["What happens when one part hurts?", "The whole body feels it"],
      ["What does the whole body share when one part is ill?", "Fever and sleeplessness"],
      ["If one part is unwell, what happens?", "The whole body shares it"]
    ]) {
      expect([prompt, shown(prompt, ["one of them, unwell", "the night", "windows lit, no one asleep", "warm glows on every one of them, fever", "the threads, glowing"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Eat near you: the reach wanders the dish, and no voice yet; then a voice teaches and Bismillah rises. Then no
    // short way yet; then it goes only to the food near him.
    for (const [prompt, answer] of [
      ["What should you say before you eat?", "Bismillah"],
      ["What did the Prophet ﷺ tell the boy to say first?", "Bismillah"],
      ["Which hand did he ﷺ say to eat with?", "The right hand"]
    ]) {
      expect([prompt, shown(prompt, ["a reach, across the far side", "a voice from his place, teaching", "a small voice, saying Bismillah", "Bismillah, rising 1"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["Which food should you take from the dish?", "What is nearest to you"],
      ["From which part of the dish should you eat?", "What is nearest to you"]
    ]) {
      expect([prompt, shown(prompt, ["a short way, to the food near him", "the food near him"], answer)]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // With those you love: no question back yet; then it. No answer yet; then love of Allah and His Messenger, and a warm
    // glow on his place. No glad news yet; then it, and a light joins him to the ring. Then joy on all.
    expect(shown("What did the Prophet ﷺ ask the man back?", ["a voice from him, asking", "a voice from his place, asking back"], "What have you prepared for it?")).toEqual([
      [0, 0],
      [0, 1]
    ]);
    expect(shown("What did the man say he had prepared?", ["a voice from him, answering", "a warm glow of love on his place"], "Love of Allah and His Messenger")).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What was the good news?", ["a voice from his place, giving glad news", "a light, joining him to the ring"], "You will be with those you love")).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("The Companions were very glad to hear this answer.", ["glows on all who sat there", "joy, rising 1"], "True")).toEqual([
      [0, 0],
      [1, 1]
    ]);
  });

  it("waits on the scenes of worship and the heart, from after the salam to deeds by intentions, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-after-the-salam", "sign-built-on-five", "sign-seventy-times", "sign-family-ties", "sign-pray-as-you-can", "sign-even-a-thorn", "sign-intentions"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(64);
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
    // After the salam: no forgiveness asked yet; then it rises three times. Then peace spreads over the rows, and last
    // the voice glorifies and praise rises.
    for (const [prompt, answer] of [
      ["What did he ﷺ say three times after salam?", "Astaghfirullah"],
      ["Asking forgiveness right after salah is Sunnah.", "True"],
      ["How many times did he ask forgiveness?", "Three"],
      ["He said Astaghfirullah after finishing prayer.", "True"],
      ["How many times did he ﷺ say Astaghfirullah after the prayer?", "Three"],
      ["Asking forgiveness right after praying is a sunnah.", "True"],
      ["How many times did he ﷺ seek forgiveness?", "Three times"]
    ]) {
      expect([prompt, answer, shown(prompt, ["forgiveness asked, rising 1", "forgiveness asked, rising 2", "forgiveness asked, rising 3", "peace, spreading over the rows"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["What does Allahumma antas-salam mean?", "O Allah, You are Peace"],
      ["Which name of Allah did he say next?", "As-Salam"],
      ["What did he ﷺ then say, per Muslim 591?", "You are Peace, peace comes from You"]
    ]) {
      expect([prompt, shown(prompt, ["forgiveness asked, rising 3", "peace, spreading over the rows", "a voice from his place, glorifying"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    expect(shown("The dhikr ends with O Possessor of Glory and Honor.", ["peace, spreading over the rows", "a voice from his place, glorifying", "praise, rising 1"], "True")).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    // Built on five: no plan yet; then five pillars, dashed. The first pillar and its mark come with the testimony,
    // the next two with the prayer and Zakat, and the last two, the roof and the light with Hajj and Ramadan.
    for (const prompt of ["How many pillars is Islam built on?", "On how many pillars is Islam built?"]) {
      expect([prompt, shown(prompt, ["the plan, five pillars, dashed", "pillar 1, rising"], "Five")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ]
      ]);
    }
    expect(shown("What is the first pillar of Islam?", ["the plan, five pillars, dashed", "pillar 1, rising", "the mark on pillar 1", "pillar 2, rising"], "The shahadah")).toEqual([
      [1, 0, 0, 0],
      [1, 1, 1, 0]
    ]);
    expect(shown("The shahadah says Muhammad ﷺ is Allah's Messenger.", ["pillar 1, rising", "the mark on pillar 1", "pillar 2, rising"], "True")).toEqual([
      [1, 0, 0],
      [1, 1, 0]
    ]);
    for (const [prompt, answer] of [
      ["Which of these is a pillar of Islam?", "Paying zakat"],
      ["Zakat is an extra good deed, not a duty.", "False"]
    ]) {
      expect([prompt, shown(prompt, ["pillar 2, rising", "pillar 3, rising", "the mark on pillar 3", "pillar 4, rising"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    expect(shown("Hajj is one of the five pillars.", ["pillar 4, rising", "pillar 5, rising", "the mark on pillar 5", "the roof, set on them all", "a light on the house"], "True")).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Seventy times: no voice yet; then he asks forgiveness. Then the warm glow of turning to Him. Then the evening
    // comes, seven tens and more are counted, all through the day.
    expect(shown("Only sinful people need to ask forgiveness.", ["a voice from his place, asking forgiveness", "a warm glow on his place, turning to Him"], "False")).toEqual([
      [0, 0],
      [1, 0]
    ]);
    for (const prompt of ["What else did he do besides ask forgiveness?", "What else did he do with it?"]) {
      expect([prompt, shown(prompt, ["a voice from his place, asking forgiveness", "a warm glow on his place, turning to Him", "ten times, 1"], "Turned to Allah in repentance")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["How often did the Prophet ﷺ seek forgiveness, per Bukhari 6307?", "More than seventy times a day"],
      ["How often did he seek forgiveness, per Bukhari 6307?", "More than seventy times a day"],
      ["How often did the Prophet ﷺ repent each day?", "More than seventy times"],
      ["What can we learn from him?", "Ask forgiveness daily"],
      ["How often did the Prophet ﷺ ask forgiveness?", "Over seventy times a day"],
      ["Asking forgiveness often is the Sunnah.", "True"]
    ]) {
      expect([prompt, answer, shown(prompt, ["the evening", "ten times, 1", "ten times, 7", "and more"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Family ties: no way to his kin yet; then the ways, warm glows on their homes, more provision and blessing. Life
    // prolonged: no road of his days yet; then it, going on further once he keeps the ties.
    for (const [prompt, answer] of [
      ["Ties with whom?", "Relatives"],
      ["What should one who wants more provision do?", "Keep good ties with family"],
      ["What brings more provision, in the hadith?", "Keeping ties with relatives"],
      ["What brings more wealth and life, per the hadith?", "Good ties with relatives"],
      ["Cutting off relatives brings barakah.", "False"]
    ]) {
      expect([prompt, shown(prompt, ["a way to his kin 1", "warm glows on the homes of his kin", "more provision 1", "blessing, rising 1"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["What else grows by keeping ties, per the hadith?", "A longer life"],
      ["What else is prolonged by family ties, in the hadith?", "A person's life"]
    ]) {
      expect([prompt, shown(prompt, ["a light on his provision", "the road of his days", "the road of his days, going on further", "a way to his kin 1"], answer)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Pray as you can: no mat yet; then he prays standing. Then no cushion yet; then his place moves to it, and he
    // prays sitting. Then no bed yet; then it, the prayer lying on the side, and a light on every place of prayer.
    expect(shown("How should one pray first, in the hadith?", ["a prayer mat", "the prayer, standing, rising 1", "a cushion to sit on"], "Standing")).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    for (const [prompt, answer] of [
      ["Example: your grandma has bad knees and can't stand. How does she pray?", "Sitting"],
      ["How should a sick person pray who cannot stand?", "Sitting down"],
      ["If you cannot stand, how do you pray?", "Sitting"]
    ]) {
      expect([prompt, shown(prompt, ["a prayer mat", "a cushion to sit on", "the prayer, sitting, rising 1", "a bed with its pillow"], answer), moved(prompt, "his place, praying as he can", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [0, 21]
      ]);
    }
    for (const [prompt, answer] of [
      ["And if someone can't even sit?", "Lying on the side"],
      ["And if he cannot even sit?", "Lying on his side"],
      ["If you cannot sit, how do you pray?", "Lying on your side"],
      ["What if one cannot sit, in the hadith?", "Pray lying on the side"],
      ["Someone who cannot sit may pray lying on their side.", "True"]
    ]) {
      expect([prompt, shown(prompt, ["a cushion to sit on", "a bed with its pillow", "the prayer, lying on the side, rising 1", "a light on every place of prayer"], answer), moved(prompt, "his place, praying as he can", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [21, 39]
      ]);
    }
    for (const [prompt, answer] of [
      ["What does this teach about salah?", "It is kept in every state"],
      ["A sick person still prays in the way he is able.", "True"],
      ["Islam makes prayer easy for the sick.", "True"]
    ]) {
      expect([prompt, answer, shown(prompt, ["a prayer mat", "a cushion to sit on", "a bed with its pillow", "a light on every place of prayer"], answer), moved(prompt, "his place, praying as he can", "x")]).toEqual([
        prompt,
        answer,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, 39]
      ]);
    }
    // Even a thorn: tired and ill, and no grey cloud yet; then worry and sadness over his place. Then, after the prick
    // of the thorn, some of the dark specks of his sins are gone (not all), and a soft light comes on his place.
    for (const prompt of ["Which of these is also named in the hadith?", "Which of these is named in the hadith?"]) {
      expect([prompt, shown(prompt, ["a pale glow on his place, tired and ill", "a grey cloud over his place, worry and sadness", "the prick of a thorn"], "Sadness")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["What does even a thorn's prick do for a Muslim?", "Wipes away some sins"],
      ["Hard moments can be a mercy for a believer.", "True"],
      ["What does a thorn prick do for a Muslim, per the hadith?", "Wipes away some sins"],
      ["Sadness and worry also wipe away a Muslim's sins.", "True"],
      ["What does even a thorn prick do?", "Wipes away some sins"],
      ["Small hurts can still bring a reward.", "True"]
    ]) {
      expect([prompt, answer, shown(prompt, ["the prick of a thorn", "his sins, a dark speck 1", "his sins, a dark speck 4", "his sins, a dark speck 5", "a soft light on his place"], answer)]).toEqual([
        prompt,
        answer,
        [
          [1, 1, 1, 1, 0],
          [1, 0, 0, 1, 1]
        ]
      ]);
    }
    // Intentions: no voice from the minbar yet; then it. Then the two set out on the same road, a golden light within
    // one and a dull light within the other, and nothing rises yet; then good rises from the one who went for good.
    // Last, the other turns off to the world, and only the coins he went for glint.
    for (const [prompt, answer] of [
      ["Which companion told the hadith that a hijrah is by intention?", "Umar"],
      ["Who did Alqamah ibn Waqqas hear on the minbar?", "Umar ibn al-Khattab"]
    ]) {
      expect([prompt, shown(prompt, ["a voice from the minbar", "a golden light within, his intention"], answer)]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["What are deeds judged by?", "Intentions"],
      ["What does the reward of deeds depend on?", "Intentions"],
      ["Which hadith did Umar teach from the minbar?", "Actions are only by intentions"],
      ["Which hadith did he hear from Umar?", "Actions are by intentions"]
    ]) {
      expect([prompt, shown(prompt, ["a golden light within, his intention", "a dull light within, his intention", "good, rising from him 1"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["Two people do the same deed. Can their reward differ?", "Yes, by their intentions"],
      ["What decides the reward of a hijrah?", "The intention behind it"]
    ]) {
      expect([prompt, shown(prompt, ["someone setting out, for the sake of good", "someone setting out, for the world", "a golden light within, his intention", "a dull light within, his intention", "good, rising from him 1", "the coins he went for, glinting"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ]
      ]);
    }
    expect(shown("What will each person get?", ["a warm glow on his place, at the masjid", "good, rising from him 1", "the coins he went for, glinting"], "What he intended")).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    expect([shown("Someone who emigrated only to marry gets what?", ["a way turning off, to the world", "the coins he went for, glinting"], "Only what he went for"), moved("Someone who emigrated only to marry gets what?", "someone setting out, for the world", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [-16, -36]
    ]);
  });

  it("waits on the scenes of what we say, from the two light words to remaining steadfast, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-two-words", "sign-half-of-faith", "sign-three-signs", "sign-call-to-good", "sign-praise-each-bite", "sign-good-or-quiet", "sign-then-steadfast"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(83);
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
    // Two words: nothing said yet; then the two come out, light, and wait by the balance. Then they go into its pan and
    // it sinks. Then a warm glow on them, dear, and it rises. Last, each one shines as the voice glorifies.
    for (const answer of ["Easy to say", "Very easy"]) {
      expect([answer, shown("How are the two phrases on the tongue?", ["the first expression, light", "the second expression, light", "a warm glow on the two, dear"], answer)]).toEqual([
        answer,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    expect(moved("How are the two phrases on the tongue?", "the crossbar of the balance", "rotate")).toEqual([0, 0]);
    expect([shown("How are the two phrases, in the hadith?", ["the first expression, light", "the second expression, light"]), moved("How are the two phrases, in the hadith?", "the crossbar of the balance", "rotate")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 9]
    ]);
    for (const prompt of [
      "How are they on the scale of deeds?",
      "These two phrases are light on the tongue and...",
      "Where are the two words heavy?",
      "How heavy are the two phrases in the Balance?",
      "How are they on the Scale?",
      "How are the two phrases on the scale?"
    ]) {
      expect([
        prompt,
        moved(prompt, "the first expression, light", "x"),
        moved(prompt, "the crossbar of the balance", "rotate"),
        moved(prompt, "the pan that sinks", "y"),
        shown(prompt, ["a warm glow on the two, dear"])
      ]).toEqual([prompt, [-73.8, 0], [0, 9], [0, 2.7], [[0], [0]]]);
    }
    for (const prompt of ["Who loves these words?", "These words are loved by the Most Merciful.", "Who loves these phrases, in the hadith?", "They are dear to the Most Merciful."]) {
      expect([prompt, shown(prompt, ["a warm glow on the two, dear", "dear, rising 1", "dear, rising 3", "a voice from his place, glorifying"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["Which is one of the two phrases?", "SubhanAllahi wa bihamdihi"],
      ["Which pair are the two words?", "Subhanallahi wa bihamdih, Subhanallahil-'azim"],
      ["Which phrase is one of the two?", "SubhanAllahi wa bihamdihi"],
      ["Which phrase is one of the two?", "Subhan Allahi wa bihamdihi"],
      ["Which phrase is one of them?", "SubhanAllah wa bihamdihi"]
    ]) {
      expect([prompt, answer, shown(prompt, ["a voice from his place, glorifying", "the first expression, shining", "the second expression, shining"], answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // Half of faith: no circle of faith yet; then it, its half filling with light as he washes. Then no praise yet;
    // then it fills the pan, and the scale tips. Then no prayer mat yet; then his place on it, and a light on it.
    for (const [prompt, answer] of [
      ["How much of faith is purity?", "Half"],
      ["What is half of faith, in the same hadith?", "Cleanliness"],
      ["What is half of faith, per the hadith?", "Cleanliness"],
      ["Cleanliness has nothing to do with faith.", "False"]
    ]) {
      expect([prompt, shown(prompt, ["a clean sparkle on his place", "a dashed circle, faith", "half of faith, filling with light", "a voice from his place, praising"], answer), moved(prompt, "half of faith, filling with light", "scaleX")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [0.05, 1]
      ]);
    }
    for (const prompt of [
      "What fills the scale, in the same hadith?",
      "What fills the scale, in Muslim 223?",
      "A short word of praise can weigh heavy on the scale.",
      "What does Alhamdulillah fill, per the hadith?",
      "Which phrase fills the scale?"
    ]) {
      expect([prompt, shown(prompt, ["praise, filling the scale", "a prayer mat"]), moved(prompt, "praise, filling the scale", "scaleY"), moved(prompt, "the crossbar of the balance", "rotate")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [0.1, 1],
        [0, -9]
      ]);
    }
    for (const prompt of ["In the same hadith, prayer is called a light.", "The same hadith calls prayer a light."]) {
      expect([prompt, shown(prompt, ["a prayer mat", "a light on the prayer mat", "a way to the one in need"]), moved(prompt, "someone's place, at the basin, then on the mat", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ],
        [0, 19]
      ]);
    }
    // Three signs: no mark yet; then three dashed marks. Then no lie yet; then it goes to the one who hears, and the
    // first mark fills dark. Then the promised way goes only halfway and breaks off, and the second fills. Last, the
    // trust is kept back, darkening, and the third fills.
    for (const prompt of [
      "How many signs of a hypocrite did the Prophet ﷺ name?",
      "How many signs of a hypocrite are in the hadith?",
      "How many signs of a hypocrite are named?",
      "How many signs of a hypocrite are in Bukhari 33?"
    ]) {
      expect([prompt, shown(prompt, ["sign 1, a dashed mark", "sign 2, a dashed mark", "sign 3, a dashed mark", "sign 1, filling dark"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["Telling lies is one of the hypocrite's signs.", "What does a hypocrite do when he speaks?", "Telling lies is one of the three signs.", "Lying is a sign of hypocrisy."]) {
      expect([prompt, shown(prompt, ["a lie, a dark speck going", "sign 1, filling dark", "a voice from his place, promising"]), moved(prompt, "a lie, a dark speck going", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 0.9, 0]
        ],
        [-16.6, 0]
      ]);
    }
    for (const [prompt, answer] of [
      ["Which is a sign of a hypocrite?", "Breaking promises"],
      ["Keeping your promise is part of good character.", "True"],
      ["Keeping promises protects a Muslim from hypocrisy.", "True"],
      ["What does a hypocrite do when he promises?", "He breaks it"],
      ["What does a hypocrite do with promises?", "Breaks them"],
      ["Breaking promises is a sign of a hypocrite.", "True"],
      ["Which is one of the signs?", "Breaking promises"]
    ]) {
      expect([prompt, shown(prompt, ["the promised way, going only halfway", "the promised way, broken off", "the one who waits, left dim", "sign 2, filling dark", "one who trusts him"], answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 0.9, 0]
        ]
      ]);
    }
    expect(shown("Betraying a trust is one of the three signs.", ["one who trusts him", "the sack, kept back, darkening", "the one who trusts him, left dim", "sign 3, filling dark"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 0.9]
    ]);
    expect(shown("Which is NOT one of the three signs?", ["sign 1, a dashed mark", "sign 1, filling dark", "sign 2, filling dark", "sign 3, filling dark"])).toEqual([
      [1, 0, 0, 0],
      [1, 0.9, 0.9, 0.9]
    ]);
    // Call to good: no one has come yet; then they come, each with a reward, and one like theirs on the one who called.
    // Then their rewards are kept whole. Then no sin yet on those who followed the error; then on each, and on him.
    for (const prompt of [
      "What does one who calls to good receive?",
      "What does one who calls to good get, in the hadith?",
      "What does a caller to good get, in the hadith?",
      "What does one who calls to good get, per Muslim 2674?"
    ]) {
      expect([
        prompt,
        shown(prompt, ["one who came 1", "one who came 3", "a reward on one who came 3", "a reward like theirs on the one who called 1", "a reward like theirs on the one who called 3", "their rewards, kept whole"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ]
      ]);
    }
    for (const [prompt, answer] of [
      ["Does it lessen the followers' reward?", "No, not at all"],
      ["Is the followers' reward reduced, in the hadith?", "No, not at all"],
      ["Is the followers' reward lessened, in the hadith?", "No"],
      ["Are the followers' rewards reduced?", "No, not at all"]
    ]) {
      expect([prompt, shown(prompt, ["a reward on one who came 1", "a reward on one who came 3", "their rewards, kept whole", "a crooked voice from it, calling to error"], answer)]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["Calling others to wrong carries a share of the sin.", "Calling to error brings the sin of those who follow."]) {
      expect([
        prompt,
        shown(prompt, ["one who followed the error 2", "its sin on one who followed 1", "its sin on one who followed 2", "a sin like theirs on the one who called to it 1", "a sin like theirs on the one who called to it 2"])
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Praise each bite: nothing praised yet, the date still on the dish; then he takes it and praise rises, and a warm
    // glow pleases. Then no praise for the drink yet; then he drinks, praise rises again, and the glow grows.
    for (const prompt of [
      "What pleases Allah after you eat or drink?",
      "What pleases Allah, in the hadith?",
      "What should a grateful servant say after a sip of water?",
      "What should we say after drinking?",
      "When should we praise Him, per the hadith?"
    ]) {
      expect([
        prompt,
        shown(prompt, ["a morsel, a date", "praise for the morsel, rising 1", "a warm glow on his place, pleasing", "praise for the drink, rising 1", "the warm glow, growing"]),
        moved(prompt, "water in the cup", "scaleY")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 1]
        ],
        [1, 0.45]
      ]);
    }
    for (const prompt of ["Thanking Allah after a meal is a small but loved deed.", "Small thanks for food can win Allah's pleasure."]) {
      expect([prompt, shown(prompt, ["a dish", "a morsel, a date", "praise for the morsel, rising 1", "a warm glow on his place, pleasing", "praise for the drink, rising 1"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 0, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["How does Allah feel about this praise?", "Thanking Allah for water and food pleases Him."]) {
      expect([prompt, shown(prompt, ["a dish", "a warm glow on his place, pleasing", "praise for the drink, rising 1", "the warm glow, growing"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["What pleases Allah, per the hadith?", "What pleases Allah at mealtime, per the hadith?"]) {
      expect([prompt, shown(prompt, ["a morsel, a date", "praise for the morsel, rising 1", "a warm glow on his place, pleasing", "praise for the drink, rising 1"])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["Is it only after food, or after drinks too?", "When else should we praise Him, per the hadith?"]) {
      expect([prompt, shown(prompt, ["praise for the morsel, rising 1", "praise for the drink, rising 1", "the warm glow, growing"]), moved(prompt, "water in the cup", "scaleY")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 1]
        ],
        [1, 0.45]
      ]);
    }
    // Good or quiet: no light of faith yet; then it. Then no calm next door yet; then it. Then no visitor yet; then he
    // comes, the cloth is spread with a dish and a cup, and a warm glow welcomes him. Last, good words rise, then calm.
    expect(shown("This advice is for whoever believes in Allah and what?", ["a light within his place, his faith", "a calm between the two homes"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    expect(shown("Harming a neighbor is fine if he is a stranger.", ["a calm between the two homes", "a warm glow on the home next door, at ease", "a visitor's way, coming"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    expect(
      shown("A believer is kind to his neighbor and his guest.", [
        "a calm between the two homes",
        "a warm glow on the home next door, at ease",
        "a visitor's place",
        "a dish and a cup on it",
        "a warm glow of welcome",
        "a voice from his place, saying good"
      ])
    ).toEqual([
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0]
    ]);
    for (const prompt of ["The same hadith also says to honor whom?", "How should a believer treat his guest?"]) {
      expect([
        prompt,
        shown(prompt, ["a visitor's way, coming", "a visitor's place", "a cloth, spread for the visitor", "a dish and a cup on it", "a warm glow of welcome", "a voice from his place, saying good"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["If you can't say something good, what should you do?", "If you have nothing good to say, what should you do?", "What should a believer say, per the hadith?"]) {
      expect([prompt, shown(prompt, ["a voice from his place, saying good", "good words, rising 1", "good words, rising 3", "a quiet calm on his place"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    // Then steadfast: he asks, and no far place shows yet; then the far places, not asked. Then no answer yet; then
    // the answer, and a light within the one who asked. Last, the straight way, and he goes on along it to its light.
    expect(shown("Sufyan wanted advice he would never need to ask anyone else about.", ["a voice from him, asking", "far places, not asked", "a voice from his place, answering"])).toEqual([
      [1, 0, 0],
      [0, 1, 0]
    ]);
    expect(shown("What did he ﷺ tell Sufyan to say?", ["a voice from his place, answering", "a light within the one who asked, faith", "the straight way ahead"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    for (const prompt of ["And after saying it?", "Being steadfast means staying on the right path every day.", "What did the Prophet ﷺ say after: I believe in Allah?"]) {
      expect([
        prompt,
        shown(prompt, ["a light within the one who asked, faith", "the straight way ahead", "ways turning off", "a light at the end of the straight way"]),
        moved(prompt, "someone asking, then going on steadily", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, 50]
      ]);
    }
    expect(
      shown("What did the Prophet ﷺ tell Sufyan, per Muslim 38?", ["a voice from his place, answering", "a light within the one who asked, faith", "the straight way ahead", "a light at the end of the straight way"])
    ).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
  });

  it("waits on the scenes of the deeds Allah loves, from the dearest deeds to the forgotten prayer, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-dearest-deeds", "sign-truth-leads", "sign-ease-a-hardship", "sign-saved-by-mercy", "sign-give-while-healthy", "sign-strong-believer", "sign-forgotten-prayer"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(64);
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
    // The dearest deeds: he has asked, and no answer, no prayer's time and no prayer mat yet; then the answer, the
    // prayer's time, and he goes at once to the mat, and a light comes on it. Then he goes to his parents' home with a
    // basket of dates, and a warm glow comes on it and on him.
    const asks1 = "someone asking, then praying, then going to their home";
    for (const prompt of [
      "____ on time is a deed Allah loves most.",
      "Which deed did the Prophet ﷺ name first as dearest to Allah?",
      "Which deed does Allah love most, per the hadith?",
      "Which deed is dearest to Allah, per the hadith?",
      "Delaying prayer to the last minute is best."
    ]) {
      expect([
        prompt,
        shown(prompt, ["a voice from his place, answering", "the prayer's time, come", "a prayer mat", "a light on the prayer mat", "a way to their home"]),
        moved(prompt, asks1, "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ],
        [0, 20]
      ]);
    }
    for (const prompt of ["What came second?", "What came next after prayer, per the hadith?", "What came next after prayer?"]) {
      expect([prompt, shown(prompt, ["a light on the prayer mat", "a way to their home", "a warm glow on their home", "a warm glow on his place, dutiful"]), moved(prompt, asks1, "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [20, 44]
      ]);
    }
    // Truthfulness leads: nothing said yet; then the truth, and the golden way with its good lights goes on up to its
    // light. Then no light within yet; then it grows as the truth is told again and again. Then no lie yet; then the
    // crooked voice, and the grey way with its dark specks, not yet going down to its darkness.
    expect(shown("Where does truthfulness lead?", ["a voice from it, telling the truth", "a golden way, to righteousness", "a light at the end of the golden way", "a crooked voice from it, lying"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 0]
    ]);
    expect(shown("Where does truthfulness lead, per the hadith?", ["a golden way, to righteousness", "righteousness, a good light 1", "the golden way, going on up", "a light at the end of the golden way"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 0, 0]
    ]);
    for (const prompt of ["What happens to someone who keeps telling the truth?", "Telling the truth again and again makes a person truthful."]) {
      expect([prompt, shown(prompt, ["a light at the end of the golden way", "a light within it, truthful", "a crooked voice from it, lying"]), moved(prompt, "a light within it, truthful", "scale")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 0]
        ],
        [0.3, 1]
      ]);
    }
    expect(shown("Lying leads to wrongdoing.", ["a light within it, truthful", "a crooked voice from it, lying", "a grey way, to wickedness", "wickedness, a dark speck 1", "a darkness at the end of the grey way"])).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0]
    ]);
    // Easing a hardship: his hardship lifted, and no cloud over the one who eased it yet; then it comes and lifts, and
    // a brightness comes on him. Then no fault covered yet; then each is covered. Then the heavy sack by him; then the
    // other takes it up, they go on together, and help comes on him. Last, his way to the masjid, knowledge there, and
    // the path made easy to a light far off.
    expect(
      shown("Ease someone's hardship. What does Allah do?", ["a grey cloud of hardship over him", "a warm glow on him, relieved", "a grey cloud over his own place, then lifting", "a brightness on his place, eased", "a cover over his fault"])
    ).toEqual([
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0]
    ]);
    for (const prompt of ["Hiding a Muslim's faults is also rewarded.", "What happens when you hide a friend's mistake?"]) {
      expect([
        prompt,
        shown(prompt, ["a cover over his fault", "a cover over his own fault", "a fault on the one in hardship, a dark speck", "a fault on the one who eased it, a dark speck", "help on him, as he helps"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0]
        ]
      ]);
    }
    for (const prompt of ["How long does Allah help a servant?", "When does Allah help a person?"]) {
      expect([
        prompt,
        shown(prompt, ["help on him, as he helps", "a way to the masjid"]),
        moved(prompt, "a heavy sack by him, then taken up", "x"),
        moved(prompt, "someone in hardship, then going on", "x"),
        moved(prompt, "someone's place, easing it", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [0, 15],
        [0, 30],
        [14, 44]
      ]);
    }
    for (const prompt of ["Seeking knowledge makes the path to Jannah easy.", "Seeking knowledge makes which path easy?"]) {
      expect([
        prompt,
        shown(prompt, ["a way to the masjid", "knowledge, a light at the masjid's door", "a path made easy, to a light", "a light at the end, far"]),
        moved(prompt, "someone's place, easing it", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [44, 84]
      ]);
    }
    // Saved by mercy: his deeds rose and faded, and no mercy yet; then the voice, and a warm glow of mercy comes about
    // the golden ring. Then no steady deeds yet; then he goes on steadily, and good deeds rise and stay.
    for (const prompt of [
      "What gets us into Jannah in the end?",
      "The Prophet ﷺ said even he needs Allah's mercy.",
      "What saves a person, in Bukhari 6463?",
      "What saves a person in the end?",
      "What saves a person, in the hadith?"
    ]) {
      expect([prompt, shown(prompt, ["his deeds, rising and fading 1", "mercy, a warm glow about his place", "good deeds, steadily 1"]), moved(prompt, "mercy, a warm glow about his place", "scale")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [0, 1, 0]
        ],
        [0.3, 1]
      ]);
    }
    for (const prompt of [
      "So should we stop doing good deeds?",
      "How should we do good deeds, per the hadith?",
      "How should we do good deeds?",
      "Since mercy saves us, deeds do not matter.",
      "We should stop doing good since mercy saves us."
    ]) {
      expect([
        prompt,
        shown(prompt, ["mercy, a warm glow about his place", "good deeds, steadily 1", "good deeds, steadily 3", "worship in the forenoon, rising 1"]),
        moved(prompt, "someone's place, going on steadily", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [0, 22]
      ]);
    }
    expect(shown("We still do good deeds, while hoping for Allah's mercy.", ["mercy, a warm glow about his place", "good deeds, steadily 1"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Give while healthy: he has asked, and no answer and no charity yet; then the answer, a glow of health, and the
    // sack goes to the one in need, who glows, and a great reward rises. Then no worry yet; then the grey cloud of
    // worry, the dashed coins he hopes for, and the reward grows. Then the sun high; then it sinks into the evening,
    // the sacks still kept by his home. Last, grey ways go out, and the sacks go to others.
    for (const prompt of ["Which charity is best, in the hadith?", "When is charity best, per the hadith?", "Which charity is best, per the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["a voice from his place, answering", "his place, healthy, a bright glow", "charity, a sack going", "a warm glow on the one in need", "a great reward, rising 1", "a grey cloud of worry over him, afraid of poverty"]),
        moved(prompt, "charity, a sack going", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ],
        [23.6, 0]
      ]);
    }
    expect(shown("Which charity is best?", ["charity, a sack going", "a grey cloud of worry over him, afraid of poverty", "the wealth he hopes for, dashed coins", "the reward, growing", "the evening"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0]
    ]);
    for (const prompt of ["Giving is harder, and better, when you want the money.", "What feeling makes the giving greater?", "How does the giver feel about wealth, per the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["a great reward, rising 1", "a grey cloud of worry over him, afraid of poverty", "the wealth he hopes for, dashed coins", "the reward, growing", "the evening"]),
        moved(prompt, "the reward, growing", "scale")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ],
        [0.4, 1]
      ]);
    }
    for (const prompt of ["What did he ﷺ warn against?", "Until when should charity not be delayed?", "What does the hadith say not to delay?"]) {
      expect([
        prompt,
        shown(prompt, ["the evening", "a grey way to another home 1", "a sack kept by his home, then going to another 1"]),
        moved(prompt, "the sun, high, then sinking", "y"),
        moved(prompt, "a sack kept by his home, then going to another 1", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 1],
          [1, 0, 1]
        ],
        [0, 34],
        [0, 0]
      ]);
    }
    for (const prompt of ["When is it too late to give?", "Delaying charity until the last moment is just as good."]) {
      expect([
        prompt,
        shown(prompt, ["the evening", "a grey way to another home 1", "a grey way to another home 2"]),
        moved(prompt, "a sack kept by his home, then going to another 1", "x"),
        moved(prompt, "a sack kept by his home, then going to another 2", "scale")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, -21],
        [1, 0.6]
      ]);
    }
    // The strong believer: no glow yet; then a warm glow on the strong place, loved. Then no light of good yet; then on
    // the weak place and on the strong one. Then no way and no help yet; then his voice asks for help, help rises, and
    // he goes on to what benefits him. Then the crooked voice saying "if", the gate's door open a crack; then the calm
    // voice, a calm on him, and the door shut. And from the trouble on: the door opens a crack while "if" is said, and
    // shuts; then a bar comes across the gate.
    for (const prompt of [
      "Which believer is dearer to Allah?",
      "Which believer is more loved by Allah?",
      "Whom is Allah more pleased with, per Muslim 2664?",
      "Who is more loved by Allah, per Muslim 2664?",
      "A strong believer is more loved by Allah."
    ]) {
      expect([prompt, shown(prompt, ["a warm glow on the strong place, loved", "a small light of good on the weak place"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ]
      ]);
    }
    for (const prompt of ["There is good in every believer.", "Is there good in the weak believer too?"]) {
      expect([
        prompt,
        shown(prompt, ["a warm glow on the strong place, loved", "a small light of good on the weak place", "a small light of good on the strong place", "a way to what benefits him"])
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["What should you do with what benefits you?", "What does the hadith say to do in trouble?"]) {
      expect([
        prompt,
        shown(prompt, ["a way to what benefits him", "a voice from him, asking for help", "help, rising 1", "a grey cloud of trouble over him"]),
        moved(prompt, "a strong place", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [0, 68]
      ]);
    }
    for (const prompt of [
      "What should we say when something bad happens?",
      "Accepting the decree brings peace to the heart.",
      "What should you say after something goes wrong?",
      "What should we say when trouble comes?",
      "What should we say after trouble?"
    ]) {
      expect([
        prompt,
        shown(prompt, ["a crooked voice from him, saying if", "a calm voice from him, saying it", "a calm on his place", "a bar across the gate, kept shut"]),
        moved(prompt, "the gate's door, opening a crack, then shut", "scaleX")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 0]
        ],
        [0.55, 1]
      ]);
    }
    expect(shown("Saying if only I had is the best reply to trouble.", ["a grey cloud of trouble over him", "a crooked voice from him, saying if", "a calm voice from him, saying it", "a calm on his place", "a bar across the gate, kept shut"])).toEqual([
      [0, 0, 0, 0, 0],
      [0.45, 0, 1, 1, 0]
    ]);
    for (const prompt of ["What does 'if only' open, as he ﷺ said?", "Saying if only opens a door to Shaytan.", "What does if only open, per the hadith?"]) {
      const { pause, reveal } = asked(prompt);
      const door = (t: number) => value("strong-believer", "the gate's door, opening a crack, then shut", "scaleX", t);
      expect([
        prompt,
        shown(prompt, ["a grey cloud of trouble over him", "a crooked voice from him, saying if", "a calm on his place", "a bar across the gate, kept shut"]),
        [door(pause), door(0.66), door(reveal)]
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0.45, 0, 1, 1]
        ],
        [1, 0.55, 1]
      ]);
    }
    // The forgotten prayer: his way gone off to the palms, and no way back yet; then he remembers, goes back to the
    // mat, his prayer rises and a light comes on it. Then no growing light yet; then, the dashed sack and dish gone,
    // the light of the prayer grows.
    for (const prompt of ["What should one do with a forgotten prayer?", "If you miss a prayer, pray it as ____ as you can."]) {
      expect([
        prompt,
        shown(prompt, ["a way off to the palms", "a way back to the prayer mat", "the prayer, rising 1", "a light on the prayer mat", "the light of the prayer, growing"]),
        moved(prompt, "someone's place, going off, then back to pray", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ],
        [46, -22]
      ]);
    }
    expect([
      shown("Is there another expiation, in the hadith?", ["a light on the prayer mat", "a dashed sack, no expiation", "a dashed dish, no expiation", "the light of the prayer, growing"]),
      moved("Is there another expiation, in the hadith?", "the light of the prayer, growing", "scale"),
      value("forgotten-prayer", "a dashed sack, no expiation", "opacity", 0.75)
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 0, 0, 1]
      ],
      [0.35, 1],
      1
    ]);
  });

  it("waits on the scenes of a good character, from pride and the beauty Allah loves to making things easy, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-mustard-of-pride", "sign-what-backbiting-is", "sign-orphan-carer", "sign-safe-from-harm", "sign-refuge-from-anger", "sign-gate-ar-rayyan", "sign-make-it-easy"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(69);
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
    // A mustard seed of pride: no truth come yet and no look down; then the truth comes and is turned away, dim, and the
    // proud place is raised on a mound and looks down on the others. Liking fine clothes: no garment, no sandals and no
    // glow yet; then the asking with the garment and the sandals, and the answer, a warm glow and sparkles on them.
    // What Allah loves: the garment shows, no glow yet; then the glow. How much pride: nothing yet; then the seed, and
    // the way toward the light, breaking off. Looking down on people: not yet; then the look down, from on the mound.
    for (const prompt of [
      "What is pride, as the Prophet ﷺ explained it?",
      "What is pride, in Muslim 91?",
      "What is pride, per the Prophet ﷺ?",
      "What is pride, in the hadith?",
      "What is pride, per Muslim 91?"
    ]) {
      expect([prompt, shown(prompt, ["the truth, a light coming to him", "a crooked voice from him, turning it away", "a grey look down on them"]), moved(prompt, "someone's place, proud", "y")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [0.35, 0, 1]
        ],
        [0, -7]
      ]);
    }
    for (const prompt of [
      "Is liking nice clothes pride?",
      "Liking nice clothes is pride.",
      "Wanting fine clothes is itself pride.",
      "Is liking fine clothes pride?",
      "In the hadith, liking fine clothes is pride.",
      "Is liking nice clothes pride, per Muslim 91?",
      "Wanting nice clothes and shoes is pride, per Muslim 91."
    ]) {
      expect([prompt, shown(prompt, ["a fine garment", "fine sandals", "beauty, loved, a warm glow on them", "beauty, sparkling"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["What does Allah love, in the hadith?", "What does Allah love, per Muslim 91?"]) {
      expect([prompt, shown(prompt, ["a fine garment", "beauty, loved, a warm glow on them", "a voice from his place, answering"])]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    expect(shown("How much pride keeps a person from Jannah?", ["a mustard seed of pride, within", "a light far off, Paradise", "a way toward it, breaking off", "the rest of the way, not reached"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    expect([shown("Looking down on people is real pride.", ["a grey look down on them"]), moved("Looking down on people is real pride.", "a mound under his place, rising", "scaleY")]).toEqual([[[0], [1]], [0.12, 1]]);
    // What backbiting is: no dimness on the one away yet; then the crooked voice, and he is dim with it. If it is in
    // him: no fault and no speck yet; then the fault in him, and a dark speck on the one who spoke. If it is not: the
    // fault, no stain yet; then the fault is gone, and a dark stain is on the one who spoke.
    for (const prompt of ["What is backbiting?", "What is backbiting, in the hadith?", "What is backbiting, per Muslim 2589?", "What is backbiting, per the hadith?"]) {
      expect([prompt, shown(prompt, ["a grey dimness on the one away, disliking it", "a fault, in the one away"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ]
      ]);
    }
    for (const prompt of ["If what you said about him is true, is it still backbiting?", "What if what you said is true, per Muslim 2589?", "Saying a true fault is never backbiting."]) {
      expect([prompt, shown(prompt, ["a fault, in the one away", "backbiting, a dark speck on the one who spoke", "slander, a dark stain on the one who spoke"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["If what you said is not true, it is what?", "Saying something false about him is even worse.", "What is it if the bad thing is not even true?"]) {
      expect([prompt, shown(prompt, ["a fault, in the one away", "slander, a dark stain on the one who spoke"])]).toEqual([
        prompt,
        [
          [1, 0],
          [0, 1]
        ]
      ]);
    }
    // The orphan: nothing yet; then a way to the orphan, the basket, the two go home, and a golden way rises to the ring
    // in the light, not yet with the glow about the two. Like this: his light a little off; then beside the ring, with
    // a glow about the two. Whom to look after: nothing yet; then the basket, a glow on the orphan and on the home.
    for (const prompt of ["Who will be close to the Prophet ﷺ in Jannah, like two fingers?", "Who will be close to him in Paradise?", "Who will be close to the Prophet ﷺ in Paradise?"]) {
      expect([
        prompt,
        shown(prompt, ["a way to the orphan", "a warm glow on the orphan, cared for", "a warm glow on the home", "a golden way up to the light", "a golden ring, his place, in the light", "a glow about the two, side by side"]),
        moved(prompt, "an orphan's place, alone", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ],
        [0, -42]
      ]);
    }
    for (const prompt of ["How did he ﷺ show how close they will be?", "What did he show with his hand?"]) {
      expect([prompt, shown(prompt, ["a glow about the two, side by side"]), moved(prompt, "his light, rising to the light", "x")]).toEqual([prompt, [[0], [1]], [-8.6, 0]]);
    }
    expect(shown("Whom should we look after?", ["a basket of dates, for the orphan", "a warm glow on the orphan, cared for", "a warm glow on the home"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("Caring for orphans brings one near him in Paradise.", ["Paradise, a light far off", "a golden ring, his place, in the light", "a glow about the two, side by side"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("Caring for an orphan is a path to Paradise.", ["a golden way up to the light", "his light, rising to the light"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Safe from his tongue and hands: no good words and no basket kept safe yet; then the gentle voice, good words rise,
    // and the basket by their home glows, kept safe. The true emigrant: no way yet; then the dark specks of what is
    // forbidden, he goes off along the way, the specks fade, and he comes to the light. Who is a Muslim: nothing yet;
    // then a calm all around him and the basket kept safe, no dark speck yet.
    for (const prompt of ["A true Muslim keeps people safe from his tongue and his what?", "Hurting people with words is fine if you never hit them.", "A Muslim keeps others safe from what?", "Which two things should we guard?", "Hurtful jokes do not count if we laugh."]) {
      expect([prompt, shown(prompt, ["a gentle voice from him", "good words, rising 1", "their basket, kept safe"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [0, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["Who is a true emigrant?", "Who is the true muhajir, says the Prophet ﷺ?", "You can still be a muhajir today by leaving sins."]) {
      expect([
        prompt,
        shown(prompt, ["a way, leaving it all", "what is forbidden, a dark speck 1", "a light at the end of the way"]),
        moved(prompt, "someone's place, safe to be near, then leaving", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 0, 1]
        ],
        [0, 60]
      ]);
    }
    for (const prompt of ["Hurtful words go against being a good Muslim.", "Who is a true Muslim in the same hadith?", "Who is a Muslim, per the hadith?"]) {
      expect([prompt, shown(prompt, ["safe all around him, a calm", "their basket, kept safe", "what is forbidden, a dark speck 1"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    // Refuge from anger: red with anger, the word still far; then the word comes to him, he seeks refuge, the red goes
    // and a calm comes on him. What was happening: nothing yet; then the two crooked voices, no red yet. What A'udhu
    // billah means: the word comes to him while he is still red. The word he taught: no voice and no word yet; then the
    // word, come. What would happen: still red; then the red is gone, and a calm is on him.
    for (const prompt of ["What words take anger away, in the hadith?", "What word takes anger away, as the Prophet ﷺ said?", "Anger can come from Shaytan.", "What calms anger, in Bukhari 3282?"]) {
      expect([
        prompt,
        shown(prompt, ["a calm voice from him, seeking refuge", "a red glow of anger on him", "a calm on his place"]),
        moved(prompt, "a word, a golden light", "x")
      ]).toEqual([
        prompt,
        [
          [0, 1, 0],
          [0, 0, 1]
        ],
        [-68, 0]
      ]);
    }
    for (const prompt of ["What was happening when the Prophet ﷺ said this?", "What were the two men doing, in the hadith?"]) {
      expect([prompt, shown(prompt, ["a crooked voice from the first", "a crooked voice from the other", "a red glow of anger on him"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    expect([shown("What does A'udhu billah mean?", ["a red glow of anger on him", "a calm on his place"]), moved("What does A'udhu billah mean?", "a word, a golden light", "x")]).toEqual([
      [
        [1, 0],
        [1, 0]
      ],
      [-68, 0]
    ]);
    expect([shown("What word did the Prophet ﷺ teach, in the hadith?", ["a voice from his place, telling of a word", "a word, a golden light"]), moved("What word did the Prophet ﷺ teach, in the hadith?", "a word, a golden light", "x")]).toEqual([
      [
        [0, 0],
        [0, 1]
      ],
      [-68, 0]
    ]);
    expect(shown("What would happen if he said it, in the hadith?", ["a red glow of anger on him", "his place, red with anger", "a calm on his place"])).toEqual([
      [1, 1, 0],
      [0, 0, 1]
    ]);
    // The gate ar-Rayyan: no light beyond the gate yet; then it shows. Who enters: no crescents and no golden way yet;
    // then a crescent over each who fasted and a golden way to the gate, no grey way yet. It closes once they have
    // entered: they are by their places, called; then they have gone in. Anyone can enter: no grey way yet; then the
    // grey way of the others, stopping short.
    for (const prompt of ["What is the gate called?", "What is the gate for fasting people called?", "What is the gate called, in the hadith?", "What is Ar-Rayyan?"]) {
      expect([prompt, shown(prompt, ["a light beyond the gate"])]).toEqual([prompt, [[0], [1]]]);
    }
    for (const prompt of ["Who enters by that gate?", "Who enters through it, in the hadith?", "Who will enter through Ar-Rayyan?"]) {
      expect([prompt, shown(prompt, ["a crescent over one who fasted 1", "a golden way to the gate", "their grey way, stopping short"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    expect([shown("The gate closes once they have entered.", ["one who fasted 1", "a warm glow on one who fasted, called 1"]), moved("The gate closes once they have entered.", "one who fasted 1", "x")]).toEqual([
      [
        [1, 1],
        [0, 0]
      ],
      [0, 86]
    ]);
    expect(shown("Anyone can enter by ar-Rayyan.", ["their grey way, stopping short"])).toEqual([[0], [1]]);
    // Make things easy: no easy way yet; then it opens, and those coming go along it. Good tidings: no voice, no sparks
    // and no glow yet; then the voice gives good tidings, sparks rise and a warm glow comes on them.
    for (const prompt of ["What did the Prophet ﷺ tell us to do for people?", "What did the Prophet ﷺ tell us to do with religion for people?", "What did the Prophet ﷺ tell us to do?"]) {
      expect([prompt, shown(prompt, ["an easy way, smooth, to the masjid"]), moved(prompt, "one coming 1", "x")]).toEqual([prompt, [[0], [1]], [0, 36]]);
    }
    for (const prompt of ["What should we give people, the Prophet ﷺ said?", "What should we give people, per the hadith?", "What should we give people?"]) {
      expect([prompt, shown(prompt, ["a voice from him, giving good tidings", "good tidings, rising 1", "a warm glow on them, glad"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [0, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of what truly counts, from the needle and the sea to the sacred city, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-needle-in-the-sea", "sign-hearts-and-deeds", "sign-real-strength", "sign-treasure-of-paradise", "sign-hundred-levels", "sign-faith-at-the-pleiades", "sign-sacred-city"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(52);
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
    // The needle and the sea. What Allah has forbidden for Himself: nothing yet; then the dark mark of oppression shows
    // and is gone, and a calm is over all the land. Guidance: no golden way yet; then one astray asks, the golden way
    // shows to the light far off, and he goes on along it. Food: the empty dish, no basket yet; then the basket of dates,
    // and a warm glow on him. His kingdom: every request given, no light over the sea and no needle yet; then the light
    // runs over the sea, the needle dips in and comes up with so little on it, and the sea shines as full as before.
    for (const prompt of ["What has Allah forbidden for Himself, per the hadith?", "Allah wrongs people a little now and then.", "What has Allah forbidden for Himself, in the hadith?", "What has Allah forbidden for Himself, per Muslim 2577?"]) {
      expect([prompt, shown(prompt, ["oppression, a dark mark", "a calm over all the land"])]).toEqual([
        prompt,
        [
          [0, 0],
          [0, 1]
        ]
      ]);
    }
    expect([shown("What must we seek for guidance?", ["a golden way, guidance", "a light far off, at the end of the way"]), moved("What must we seek for guidance?", "one astray, then guided", "y")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -13.6]
    ]);
    expect(shown("What does Allah say, per Muslim 2577?", ["an empty dish by him", "a basket of dates, food given", "a warm glow on him, fed"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    const kingdom = "What happens to Allah's kingdom if He gives everyone what they ask?";
    expect([shown(kingdom, ["a warm glow on each, given 1", "a needle, dipped into the sea", "so little on the needle, a glint", "the sea, as full as before, shining"]), moved(kingdom, "a light running over the sea", "x")]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, 42]
    ]);
    // Hearts and deeds. What Allah looks at: no heart and no deeds yet; then a warm light within each place, and good
    // deeds rising from both. What He does not look at: the fine looks sparkling and the gold gleaming; then both grow
    // dim. Wealth alone: the looks already dim, the gold still bright; then the gold dims. Looks alone: then they dim.
    const hearts = ["a heart, a warm light within him", "a heart, a warm light within the other", "his good deeds, rising 1", "his good deeds, rising 2", "good deeds of the other, rising 1", "good deeds of the other, rising 2"];
    for (const prompt of ["What does Allah look at?", "What does Allah look at, per Muslim 2564?", "What does Allah look at, in the hadith?", "What does Allah look at, per the hadith?"]) {
      expect([prompt, shown(prompt, hearts)]).toEqual([prompt, [hearts.map(() => 0), hearts.map(() => 1)]]);
    }
    const looks = ["fine looks, sparkling about him", "a heap of gold by the fine home", "a gleam on the gold"];
    for (const prompt of ["Allah cares most about how pretty or rich you are.", "What does Allah not judge us by?", "What does Allah not look at?"]) {
      expect([prompt, shown(prompt, looks)]).toEqual([
        prompt,
        [
          [1, 1, 1],
          [0.3, 0.35, 0]
        ]
      ]);
    }
    expect([shown("A rich person is better to Allah for being rich.", looks), shown("Allah judges people by their looks.", looks)]).toEqual([
      [
        [0.3, 1, 1],
        [0.3, 0.35, 0]
      ],
      [
        [1, 1, 1],
        [0.3, 1, 1]
      ]
    ]);
    // Real strength. Who is strong: the big place shaded grey, no anger yet; then the red glow of anger grows and fades as
    // the ring holds him, and a warm golden glow of real strength comes on him. Winning a fight: the big place and the
    // others standing; then it swells, knocks them down, and a grey shade comes on it.
    for (const [prompt, answer] of [
      ["Who is truly strong?", "The one who controls his anger"],
      ["Who is truly strong?", "One who controls himself when angry"],
      ["Who is truly strong, in Bukhari 6114?", "One who controls himself when angry"]
    ]) {
      expect([prompt, answer, shown(prompt, ["a grey shade on the big place, not truly strong", "a red glow of anger in him", "a ring about him, holding himself", "real strength, a warm golden glow", "strength, sparkling"], answer)]).toEqual([
        prompt,
        answer,
        [
          [1, 0, 0, 0, 0],
          [1, 0, 1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["Beating others in a fight makes you truly strong.", "Winning a fight shows true strength."]) {
      expect([prompt, shown(prompt, ["one knocked down 1", "one knocked down 2", "a grey shade on the big place, not truly strong"]), moved(prompt, "a big place, strong", "scale"), moved(prompt, "one knocked down 1", "rotate")]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [0.55, 0.55, 1]
        ],
        [1, 1.3],
        [0, 160]
      ]);
    }
    // A treasure of Paradise. Which words: no small light within him and no chest yet; then he says it within himself, and
    // far off the chest opens, sparkling, as the ring comes beside him. Shouting: the loud voices, no calm yet; then they
    // grow small and are gone, and a calm is on them all. A treasure of where: his small light, no Paradise yet; then the
    // light far off and the chest, opening.
    const loud = ["a loud voice, saying Takbir 1", "a loud voice, saying Takbir 2", "a loud voice, saying Takbir 3"];
    for (const prompt of ["Which words did the Prophet ﷺ call a treasure of Paradise?", "Which words are a treasure of Paradise?"]) {
      expect([prompt, shown(prompt, ["his words within himself, a small light", "a treasure chest in Paradise", "light from the treasure, sparkling"]), moved(prompt, "a golden ring, his place", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [60, 87.4]
      ]);
    }
    for (const prompt of ["We must shout our dhikr so Allah hears it.", "On that journey he ﷺ also said: Allah is not deaf or far away.", "Why need they not shout, in the hadith?"]) {
      expect([prompt, shown(prompt, [...loud, "a calm on them all"])]).toEqual([
        prompt,
        [
          [1, 1, 1, 0],
          [0, 0, 0, 1]
        ]
      ]);
    }
    expect([moved("We must shout our dhikr so Allah hears it.", loud[0], "scale"), moved("Why need they not shout, in the hadith?", loud[0], "scale")]).toEqual([
      [1.9, 0.8],
      [0.8, 0.8]
    ]);
    const where = "La hawla wa la quwwata illa billah is a treasure of where?";
    expect([shown(where, ["his words within himself, a small light", "Paradise, a light far off", "a treasure chest in Paradise", "the chest's lid, opening"]), moved(where, "the chest's lid, opening", "rotate")]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -34]
    ]);
    // The hundred grades. How many: nothing yet; then the grades show, many more rising to al-Firdaws. How far apart: the
    // grades, no measure yet; then the measure, and a little sky and earth between two grades. What to ask for: no du'a
    // yet; then it rises to al-Firdaws. What flows from it: no rivers yet; then they come out over every grade.
    const grades = ["a grade of Paradise, the first", "a grade of Paradise, the second", "a grade of Paradise, the third", "many more grades, rising", "al-Firdaws, the highest"];
    for (const prompt of ["How many levels does Jannah have?", "How many levels does Paradise have, in the hadith?", "How many grades does Paradise have?", "All of Paradise is one single level."]) {
      expect([prompt, shown(prompt, grades)]).toEqual([prompt, [grades.map(() => 0), grades.map(() => 1)]]);
    }
    for (const prompt of ["How far apart are two levels?", "How far apart are two grades, in the hadith?"]) {
      expect([prompt, shown(prompt, ["al-Firdaws, the highest", "the distance between two grades, measured", "a little sky and earth, as far apart"])]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["Which level should you ask for?", "What should we ask Allah for, in the hadith?", "What should we ask Allah for, per the hadith?", "What should we ask Allah for, per Bukhari 2790?", "What should we ask Allah for?"]) {
      expect([prompt, shown(prompt, ["his du'a, rising to al-Firdaws", "al-Firdaws, a bright glow, the best"]), moved(prompt, "his du'a, rising to al-Firdaws", "x"), moved(prompt, "his du'a, rising to al-Firdaws", "y")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [0, 82],
        [0, -50]
      ]);
    }
    const rivers = ["a river from al-Firdaws, on al-Firdaws", "a river from al-Firdaws, on a grade below 1", "a river from al-Firdaws, on a grade below 2", "a river from al-Firdaws, on a grade below 3", "water falling to the grade below 1", "water falling to the grade below 2"];
    for (const prompt of ["What flows from Al-Firdaws, in the hadith?", "What comes from Al-Firdaws, in the hadith?", "What flows from Al-Firdaws?"]) {
      expect([prompt, shown(prompt, rivers)]).toEqual([prompt, [rivers.map(() => 0), rivers.map(() => 1)]]);
    }
    // Faith at the Pleiades. How many times: no mark yet; then a voice asks, once, twice and a third time. Where faith
    // might be: no light at the Pleiades yet; then a voice answers, and the light of faith shows there. What his people
    // would reach: then the ways rise from the far land up to it, and a warm glow comes on the place beside him.
    expect([
      shown("How many times was the question asked?", ["asked, a mark 1", "asked, a mark 2", "asked, a mark 3"]),
      shown("Where did the Prophet ﷺ say faith might be?", ["faith, a light at the Pleiades", "a voice from his place, answering", "a way up from the far land 1"]),
      shown("What did he say Salman's people would reach?", ["faith, a light at the Pleiades", "a way up from the far land 1", "a way up from the far land 2", "a way up from the far land 3", "a warm glow on the place beside him"])
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [
        [0, 0, 0],
        [1, 0, 0]
      ],
      [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ]
    ]);
    // The sacred city. Since when: the ring of sanctuary, no first light yet; then the first light over the sky and the
    // land. Till when: the sun crosses, day after day, and the ring stays. Its game: no way near it yet; then a way comes
    // near and turns aside, and a calm is on it. A lost item: the purse lying, gleaming; then one passes it by, and one
    // comes, takes it up and announces it.
    for (const prompt of ["Since when has Makkah been sacred?", "Since when has Makkah been a sanctuary?"]) {
      expect([prompt, shown(prompt, ["the sanctuary, a golden ring about it", "a first light over the sky and the land"])]).toEqual([
        prompt,
        [
          [1, 0],
          [1, 0.5]
        ]
      ]);
    }
    for (const prompt of ["Makkah stays sacred until the Day of Resurrection.", "Until when will it stay sacred?"]) {
      expect([prompt, shown(prompt, ["the sanctuary, a golden ring about it"]), moved(prompt, "the sun, crossing day after day", "x")]).toEqual([prompt, [[1], [1]], [0, 112]]);
    }
    for (const prompt of ["What may not be done to its animals?", "What must not be chased in Makkah?", "In Makkah, people may chase its animals for sport."]) {
      expect([prompt, shown(prompt, ["a way coming near it, turning aside", "a calm on the game"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    const lost = "Who may pick up a lost item there?";
    expect([shown(lost, ["a gleam on the purse", "someone passing it by", "one who comes to announce it", "a voice from him, announcing it"]), moved(lost, "a fallen purse, left lying", "x")]).toEqual([
      [
        [1, 0, 0, 0],
        [0, 0, 1, 1]
      ],
      [0, -2]
    ]);
  });

  it("waits on the scenes of what lasts, from a house in Paradise to the five things given, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-house-in-paradise", "sign-my-wealth", "sign-hour-on-friday", "sign-never-old", "sign-beware-of-suspicion", "sign-thirty-three", "sign-five-gifts"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(53);
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
    // A house in Paradise. What Allah builds: no light far off yet; then Paradise shows far off, a place like his is
    // built there, it sparkles, and a golden way joins his place to it. What was rebuilt: the masjid of mud brick and
    // palm; then rows of stone rise and it stands rebuilt in stone. For Allah's pleasure: then his intention shows as a
    // light within and rises.
    const paradise = ["Paradise, a light far off", "a garden of Paradise, far off", "a similar place in Paradise, built", "the place in Paradise, sparkling", "a golden way from his place to it", "a warm glow on his place"];
    for (const answer of ["A place in Paradise", "A similar place in Paradise"]) {
      expect([answer, shown("What does Allah build for one who builds a masjid?", paradise, answer)]).toEqual([answer, [paradise.map(() => 0), paradise.map(() => 1)]]);
    }
    expect(moved("What does Allah build for one who builds a masjid?", "a similar place in Paradise, built", "scaleY")).toEqual([0.1, 1]);
    const rebuilt = ["the masjid as it was, of mud brick and palm", "a row of stone, rising 1", "a row of stone, rising 2", "a row of stone, rising 3", "a row of stone, rising 4", "the door and windows of the masjid of stone", "the roof of the masjid of stone"];
    for (const prompt of ["What was being rebuilt when the hadith was told?", "Which masjid did Uthman rebuild?"]) {
      expect([prompt, shown(prompt, rebuilt)]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["The masjid should be built for Allah's pleasure.", "The builder should intend Allah's pleasure."]) {
      expect([prompt, shown(prompt, ["his intention, a light within", "his intention, rising"]), moved(prompt, "his intention, rising", "y")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, -24]
      ]);
    }
    // My wealth. What he claims: nothing said yet; then his voice says it by his heap of gold. What is truly ours: the
    // food on the dish and the garment whole; then the food is eaten up, and the garment wears out and is patched, with
    // a warm glow on what he wore. Charity: the sack still by his heap; then it goes to the one in need, a warm glow
    // comes on him, and it is sent forward along a golden way to a light far off, where it is kept, shining.
    for (const prompt of ["What does the son of Adam claim?", "What does the son of Adam keep saying?"]) {
      expect([prompt, shown(prompt, ["his voice, saying: my wealth, my wealth"])]).toEqual([prompt, [[0], [1]]]);
    }
    expect(shown("Which of these is truly ours, per the hadith?", ["what he consumed, a warm glow", "food on the dish, eaten up", "what he wore, a warm glow", "a garment, worn out", "the garment's patches"])).toEqual([
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0.4, 1]
    ]);
    const forward = ["a warm glow on the one in need", "a golden way, forward", "a light far off, where it is kept", "the charity, kept, shining"];
    // (The scene of charity and wealth asks the same prompt, with its own answer: it does not decrease.)
    for (const [prompt, answer] of [
      ["What happens to wealth given in charity?", "It is sent forward for us"],
      ["Charity is like saving for the Hereafter.", "True"],
      ["Charity is wealth sent ahead for us.", "True"]
    ]) {
      expect([prompt, shown(prompt, forward, answer)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    expect(moved("Charity is wealth sent ahead for us.", "a sack, given as charity", "x")).toEqual([0, 39.9]);
    // The hour on Friday. What is special: his place praying in the golden glow of the hour, no du'a yet; then his du'a
    // rises and what he asked is given, with a warm glow and sparkles. Friday itself: nothing yet, not even the hour;
    // then the band of the hour shows, and the du'a is answered. How long: the band of the hour; then two marks close in
    // and it shrinks to a short hour, shining.
    const answered = ["his du'a, rising 1", "what he asked, given: a warm glow", "given, sparkling"];
    for (const prompt of ["What is special about this hour on Friday?", "What is special about an hour on Friday?", "Make many du'as on Fridays.", "Making dua on Friday is a good habit."]) {
      expect([prompt, shown(prompt, answered), moved(prompt, "his du'a, rising 1", "y")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, -16]
      ]);
    }
    expect(shown("What is special about Friday, per the hadith?", ["an hour on Friday, a golden band of light", ...answered.slice(0, 2)])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    for (const prompt of ["How long is that hour?", "How long is the hour?"]) {
      expect([prompt, shown(prompt, ["a mark at the hour's start", "a mark at the hour's end", "the hour, short, shining"]), moved(prompt, "an hour on Friday, a golden band of light", "scaleX")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [1, 0.25]
      ]);
    }
    // Never old. Growing old: health and a life that lasts on each place, no blossoms yet; then blossoms open on the
    // trees, young and fresh. Dying: then a light of life that lasts comes on each. Illness: the voice calling, no glow
    // yet; then a soft glow of health comes on each, and a grey shade of illness comes near and is kept away. Becoming
    // poor: then fruit shows by each place, the river shines, a grey empty dish comes near and is kept away, and plenty
    // sparkles.
    const blossoms = ["blossoms opening, young and fresh 1", "blossoms opening, young and fresh 2", "blossoms opening, young and fresh 3", "blossoms opening, young and fresh 4"];
    for (const prompt of ["Will people in Jannah grow old?", "Will they grow old, in the hadith?", "What will the caller in Paradise say, per the hadith?", "What else is promised in Muslim 2837?"]) {
      expect([prompt, shown(prompt, blossoms), moved(prompt, blossoms[0], "scale")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0.3, 1]
      ]);
    }
    expect(shown("Will anyone die in Jannah?", ["life that lasts, a light on each"])).toEqual([[0], [1]]);
    for (const prompt of ["Life in Jannah has no sickness.", "Will people of Paradise fall ill, in the hadith?", "What will never happen in Paradise, per Muslim 2837?"]) {
      expect([prompt, shown(prompt, ["health, a soft glow on each", "illness, a grey shade, kept away"]), moved(prompt, "illness, a grey shade, kept away", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [0, 14]
      ]);
    }
    const poor = "The people of Paradise will never become poor.";
    expect([shown(poor, ["fruit by each place, plenty 1", "the river, shining", "want, a grey empty dish, kept away", "plenty, sparkling"]), moved(poor, "want, a grey empty dish, kept away", "x")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 0, 1]
      ],
      [0, 12]
    ]);
    // Beware of suspicion. What suspicion is: its grey cloud over him; then a crooked tale goes out from him, false, its
    // dark specks going out. Faults: then a way toward another's faults breaks off and a cover comes over them. Spying:
    // then a creeping way toward another's window is stopped, and the window stays shut. Brothers: then golden ways join
    // them all, with warm glows and a calm over them all.
    for (const prompt of ["What did the Prophet ﷺ call suspicion?", "What did he ﷺ call suspicion, per Bukhari 6064?", "What is suspicion, per Bukhari 6064?"]) {
      expect([prompt, shown(prompt, ["suspicion, a grey cloud over him", "a crooked tale from him, false", "dark specks of the tale, going out and fading"]), moved(prompt, "dark specks of the tale, going out and fading", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 1]
        ],
        [0, 30]
      ]);
    }
    expect([shown("Looking for others' faults is forbidden, per Bukhari 6064.", ["a way toward another's faults, broken off", "a cover over another's faults"]), shown("Which of these does the hadith forbid?", ["a creeping way toward another's window, stopped", "another's window, kept shut"])]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    const brothers = ["golden ways, joining them all", "warm glows on them all", "a calm over them all"];
    for (const prompt of ["What does the hadith tell us to be instead?", "What did he ﷺ tell the servants of Allah to be?", "What does Bukhari 6064 tell us to be?"]) {
      expect([prompt, shown(prompt, brothers)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // Thirty-three each. Who came: no one yet; then the places of the poor come. Their worry: no high light yet; then the
    // high light of the higher grades shows, and the good of the wealthy rises toward it. Why: the sack still by the
    // wealthy; then it is given, its good rises, and a grey worry comes on the poor. How many and when: their dhikr risen
    // by the prayer mats, no rows yet; then thirty-three times shows in three rows, and the high light is reached.
    const came = "Who came worried, per Bukhari 843?";
    expect([shown(came, ["the places of the poor, coming"]), moved(came, "the places of the poor, coming", "x")]).toEqual([[[0], [1]], [-34, 0]]);
    expect(shown("What did the poor people worry about?", ["a high light, the higher grades", "the good of the wealthy, rising toward it"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    for (const prompt of ["Why were the poor worried, per Bukhari 843?", "What could the rich do that the poor could not?"]) {
      expect([prompt, shown(prompt, ["the good of their giving, rising", "a grey worry on the poor"]), moved(prompt, "a sack, given by the wealthy", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, 10]
      ]);
    }
    const rows = ["thirty-three times, row 1", "thirty-three times, row 2", "thirty-three times, row 3", "the high light, reached: a warm glow"];
    for (const prompt of ["How many times each, per Bukhari 843?", "How many times is each phrase said?", "When is this dhikr said?"]) {
      expect([prompt, shown(prompt, rows)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Five things given. How many: no light yet; then five lights, one after another. How far the awe reached: then a
    // long way, the moon going through a month along it, and a glow where it reaches. Where to pray: then a soft light
    // over the land and prayer mats far and wide. Earlier Prophets: then three nations, each about the one sent to it
    // only, and no golden way yet. To whom he was sent: then golden ways go from his place to all of them, and every
    // nation sparkles.
    const lights = ["the five things given, a light 1", "the five things given, a light 2", "the five things given, a light 3", "the five things given, a light 4", "the five things given, a light 5"];
    for (const prompt of ["How many special gifts does Bukhari 335 list?", "How many things was the Prophet ﷺ given that no one had before?", "How many special things, in the hadith?"]) {
      expect([prompt, shown(prompt, lights)]).toEqual([prompt, [lights.map(() => 0), lights.map(() => 1)]]);
    }
    expect(shown("How far did the awe reach?", ["a long way, a month's journey", "the moon, as the month goes 1", "the awe, reaching that far: a glow"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    const prayed = ["the earth, made for him: a soft light over the land", "a place for praying, a prayer mat 1", "a place for praying, a prayer mat 2", "a place for praying, a prayer mat 3", "a place for praying, a prayer mat 4"];
    for (const prompt of ["The whole earth was made a place to pray.", "Where may his followers pray, per the hadith?"]) {
      expect([prompt, shown(prompt, prayed)]).toEqual([prompt, [prayed.map(() => 0), prayed.map(() => 1)]]);
    }
    const nations = ["a nation, about the one sent to it only 1", "a nation, about the one sent to it only 2", "a nation, about the one sent to it only 3", "golden ways from his place to all of them", "a warm light over all", "every nation, sparkling"];
    for (const prompt of ["Who were earlier prophets sent to?", "Earlier prophets were sent only to their own nation."]) {
      expect([prompt, shown(prompt, nations)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 0, 0, 0]
        ]
      ]);
    }
    for (const prompt of ["Who was he ﷺ sent to?", "To whom was the Prophet ﷺ sent?"]) {
      expect([prompt, shown(prompt, nations)]).toEqual([prompt, [nations.map(() => 0), nations.map(() => 1)]]);
    }
  });

  it("waits on the scenes of hope and warning, from the seven in the shade to the lofty mansions, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-seven-in-the-shade", "sign-two-joys", "sign-ruins-of-al-hijr", "sign-born-on-the-fitrah", "sign-best-ten-days", "sign-sparrow-and-the-sea", "sign-lofty-mansions"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(65);
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
    // Seven in the shade. How many: a hot glare over all, with no shade and no one in it yet; then a cool shade spreads
    // and seven places show in it. The youth and the just ruler: then a balance shows, level, a prayer mat comes by the
    // second place, and it grows up. Charity in secret: then a sack goes under a cover to one in need, and a warm glow
    // comes on him. Who weeps: then a quiet comes about the seventh, its tears flow, and all seven glow in the shade.
    const seven = ["a cool shade, spreading", "the first place in the shade", "the second place, growing up", "the third place in the shade", "two who love each other for His sake 1", "two who love each other for His sake 2", "the fifth place, turning away", "the sixth place in the shade", "the seventh place in the shade"];
    for (const prompt of ["How many people get Allah's shade in this hadith?", "How many people get Allah's shade in the hadith?", "How many will Allah shade, per the hadith?", "How many are shaded, per Bukhari 660?", "How many are shaded, per Bukhari 1423?"]) {
      expect([prompt, shown(prompt, seven), moved(prompt, "a cool shade, spreading", "scaleX")]).toEqual([prompt, [seven.map(() => 0), seven.map(() => 1)], [0.2, 1]]);
    }
    for (const prompt of ["Which young person is among them?", "Which youth is shaded, per the hadith?", "Which other one is shaded, per Bukhari 660?", "Who is the first of the seven named?"]) {
      expect([prompt, shown(prompt, ["a just ruler: a balance, level", "a prayer mat by the second place"]), moved(prompt, "the second place, growing up", "scale")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0.55, 1]
      ]);
    }
    const secret = ["one in need", "a sack, given in secret", "a cover over it, unseen", "a warm glow on the one in need"];
    for (const prompt of ["How does one of them give charity?", "How secretly does the man give charity?", "Charity counts only if people see it.", "How secret is the charity in Bukhari 1423?"]) {
      expect([prompt, shown(prompt, secret), moved(prompt, "a sack, given in secret", "x")]).toEqual([prompt, [secret.map(() => 0), secret.map(() => 1)], [0, 13.6]]);
    }
    for (const prompt of ["Who weeps among the seven, per Bukhari 660?", "Weeping from fear of Allah when alone is praised."]) {
      expect([prompt, shown(prompt, ["a quiet about the seventh, alone", "its tears, flowing", "all seven, glowing in the shade"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // Two joys. A shield: his place, fasting, with nothing about it yet; then a shield shows about it. If someone
    // fights him: then another's place comes with a crooked voice, his voice says twice: I am fasting, and the shield
    // holds. Left for My sake: then a cover comes over his food and drink. The fast is for Me: then his fast rises as a
    // light and is kept high up, shining. Musk: then a jar of musk and its sweet smell show, and a sweeter smell rises
    // from him. Two joys: then two small lights. The first: then the sky turns to sunset, dusk comes on the land, and
    // the first light goes onto his place as a warm glow. The second: then night and stars, a light far off, the
    // Hereafter, a golden way up to it, and the second light goes there as a warm glow.
    expect(shown("What did the Prophet ﷺ call fasting?", ["fasting, a shield about him"])).toEqual([[0], [1]]);
    const fight = ["another's place, coming to fight", "a crooked voice from the other", "his voice, twice: I am fasting", "the shield, holding"];
    for (const prompt of ["Someone insults you while fasting. What do you say?", "A fasting person should stay calm and avoid fights."]) {
      expect([prompt, shown(prompt, fight)]).toEqual([prompt, [fight.map(() => 0), fight.map(() => 1)]]);
    }
    expect(shown("Why does Allah love the fasting person?", ["a cover over his food and drink: left"])).toEqual([[0], [1]]);
    expect([shown("Which deed did Allah say is for Him?", ["his fast, kept high up, shining"]), moved("Which deed did Allah say is for Him?", "his fast, rising", "y")]).toEqual([[[0], [1]], [0, -40]]);
    const musk = ["a jar of musk", "the musk's sweet smell", "a sweeter smell from him, rising"];
    for (const prompt of ["To Allah, a fasting mouth smells better than what?", "Musk is a famous sweet perfume."]) {
      expect([prompt, shown(prompt, musk), moved(prompt, "a sweeter smell from him, rising", "y")]).toEqual([prompt, [musk.map(() => 0), musk.map(() => 1)], [0, -6]]);
    }
    expect(shown("How many joys does a fasting person have?", ["the first joy, a small light", "the second joy, a small light"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const iftar = ["the sky at sunset", "dusk on the land", "the first joy, breaking the fast: a warm glow on him", "the first joy, a small light"];
    for (const prompt of ["When is the fasting person's first joy?", "When is the first joy?", "Feeling happy at iftar is part of the reward."]) {
      expect([prompt, shown(prompt, iftar), moved(prompt, "the first joy, a small light", "y")]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 0]
        ],
        [0, 11]
      ]);
    }
    expect([
      shown("When is the second joy?", ["the night", "stars", "a light far off, the Hereafter", "a golden way, up to it", "the second joy, there: a warm glow", "the second joy, a small light"]),
      moved("When is the second joy?", "the second joy, a small light", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0]
      ],
      [0, 76]
    ]);
    // The ruins of al-Hijr. How to enter: his voice says do not enter, by the dark empty doorways, and no tears yet;
    // then tears show by their places. If one does not weep: then one turns toward a doorway and back, and a way shows
    // turning back from it. In the valley: then a cover comes over his place and it hurries on, till it has crossed the
    // valley to a calm light beyond.
    for (const prompt of ["How did the Prophet ﷺ say to enter Al-Hijr's homes?", "How did he ﷺ say to enter those homes?", "How should one pass the ruins of the punished, per the hadith?", "How should one enter such places, in the hadith?", "How should we pass places punished by Allah?"]) {
      expect([prompt, shown(prompt, ["his voice: do not enter", "tears by their places"])]).toEqual([
        prompt,
        [
          [1, 0],
          [1, 1]
        ]
      ]);
    }
    expect(shown("What if one cannot weep, in the hadith?", ["a way turning back from the doorway"])).toEqual([[0], [1]]);
    expect([shown("What did he do in the valley, in Bukhari 4419?", ["a cover over his place"]), moved("What did he do in the valley, in Bukhari 4419?", "a golden ring, his place", "x")]).toEqual([[[0], [1]], [0, 44]]);
    for (const prompt of ["What did the Prophet ﷺ do in that valley?", "He ﷺ covered his head and crossed the valley fast."]) {
      expect([prompt, shown(prompt, ["a cover over his place", "a calm light beyond the valley"]), moved(prompt, "a golden ring, his place", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, 100]
      ]);
    }
    // Born on the fitrah. How every child is born: no one yet; then the little one's place comes, new, and the fitrah
    // shows as a pure light on him. Who shapes him: then two places come by him, and a way turns off to the side. The
    // example: then a young one is born, whole, with a warm glow by them.
    for (const prompt of ["What is every child born upon?", "What is every child born upon, per the hadith?", "How is every child born?", "How is every child born, in the hadith?", "Children are born already sinful.", "Children are born carrying the sins of others."]) {
      expect([prompt, shown(prompt, ["the little one's place, new", "the fitrah, a pure light on him"]), moved(prompt, "the little one's place, new", "scale")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0.4, 1]
      ]);
    }
    const parents = ["a place by him 1", "a place by him 2", "a way, turning off to the side"];
    for (const prompt of ["Who shapes a child after that?", "Who can change the child, in the hadith?"]) {
      expect([prompt, shown(prompt, parents)]).toEqual([prompt, [parents.map(() => 0), parents.map(() => 1)]]);
    }
    expect([shown("What example did he give?", ["a young one, born whole", "a warm glow by them"]), moved("What example did he give?", "a young one, born whole", "scale")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0.6, 1]
    ]);
    // The best ten days. Which days: the good of other days has risen a little, and no month or golden day shows yet;
    // then a new crescent shows the month of Hajj, ten days turn golden, and their good rises high. What they asked:
    // then a voice asks from among them. The one exception: then a way goes out toward the horizon, he goes along it
    // with his wealth and does not come back, and a light shows at the horizon, where he went.
    const ten = ["a new crescent, the month of Hajj", ...Array.from({ length: 10 }, (_, i) => `one of the ten days, golden ${i + 1}`), "the good of these days, rising high 1"];
    for (const prompt of ["Which days did he call the best for good deeds?", "Which ten days are the best for good deeds?", "Which days are best for good deeds, per the hadith?", "Which days are best for good deeds?", "We should do extra good in these ten days."]) {
      expect([prompt, shown(prompt, ten), moved(prompt, "the good of these days, rising high 1", "y")]).toEqual([prompt, [ten.map(() => 0), ten.map(() => 1)], [0, -30]]);
    }
    expect(shown("The companions asked: not even what?", ["a voice from among them, asking"])).toEqual([[0], [1]]);
    expect([
      shown("What one exception did he mention?", ["a way going out, toward the horizon", "one who went out", "his wealth, a sack, going with him", "a light at the horizon, where he went"]),
      moved("What one exception did he mention?", "one who went out", "x"),
      moved("What one exception did he mention?", "his wealth, a sack, going with him", "x")
    ]).toEqual([
      [
        [0, 1, 1, 0],
        [1, 0, 0, 1]
      ],
      [0, 36],
      [0, 36]
    ]);
    // The sparrow and the sea. What Musa was asked: nothing asked yet; then a voice asks. Why he was corrected: then
    // his voice says: I am the most learned, and a way goes along the shore to a ring where the seas meet, one more
    // learned. What the sparrow's sip stood for: the sparrow has dipped its beak; then their knowledge shows as two
    // small lights, a light runs over the wide sea, so little shows on its beak, and the sea shines as full as before.
    // If only he had been patient: then the boat goes on, and a soft mist shows far off, more of their story, untold.
    expect(shown("What was Musa asked, in the hadith?", ["a voice from them, asking"])).toEqual([[0], [1]]);
    expect(shown("Why was Musa corrected, in the hadith?", ["his voice: I am the most learned", "a way along the shore to where the seas meet", "one more learned: a ring there"])).toEqual([
      [0, 0, 0],
      [0, 1, 1]
    ]);
    const sea = ["a sparrow, on the edge of the boat", "their knowledge, a small light 1", "their knowledge, a small light 2", "the wide sea, softly shining", "so little on its beak, a glint", "the sea, as full as before, shining"];
    expect(shown("What did the sparrow's sip stand for?", sea)).toEqual([
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1]
    ]);
    for (const prompt of ["What did the Prophet ﷺ wish for Musa?", "What would more patience have brought, in the hadith?"]) {
      expect([prompt, shown(prompt, ["a soft mist far off: more of their story, untold"]), moved(prompt, "a boat, carrying them", "x")]).toEqual([prompt, [[0], [1]], [0, 26]]);
    }
    // The lofty mansions. What they are like: the mansions above them, east and west, not shining yet; then they shine
    // like bright stars. Why so high: then ranks glow, one above another. What was asked: then a voice asks from among
    // them. The oath: then a voice answers from his ring. Only for the prophets: then golden ways go up to the mansions
    // for those who believed, and the mansions glow warm.
    for (const prompt of ["How are the lofty mansions seen, in the hadith?", "What are the lofty mansions compared to?"]) {
      expect([prompt, shown(prompt, ["the lofty mansions in the east", "the lofty mansions in the west", "the mansions, shining like bright stars"])]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [1, 1, 1]
        ]
      ]);
    }
    const ranks = ["a rank above another, glowing 1", "a rank above another, glowing 2", "a rank above another, glowing 3"];
    for (const prompt of ["Why are some mansions so high?", "Everyone in Paradise is happy, but levels differ."]) {
      expect([prompt, shown(prompt, ranks)]).toEqual([prompt, [ranks.map(() => 0), ranks.map(() => 1)]]);
    }
    expect(shown("What did the people first ask?", ["a voice from among them, asking"])).toEqual([[0], [1]]);
    expect(shown("The Prophet ﷺ swore by Allah when answering.", ["a voice from the ring, answering"])).toEqual([[0], [1]]);
    for (const prompt of ["Are they only for the Prophets, in the hadith?", "Are the lofty mansions only for prophets?"]) {
      expect([prompt, shown(prompt, ["golden ways up to the mansions, for those who believed", "the mansions, a warm glow"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of treasures and trusts, from the house of pearl to the hidden poor, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-house-of-pearl", "sign-tree-of-a-hundred-years", "sign-the-pool", "sign-gold-like-uhud", "sign-respite-then-seized", "sign-convey-one-ayah", "sign-the-hidden-poor"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(46);
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
    // A house of pearl. What she was bringing: her place, coming, with nothing with her yet; then a dish of food or
    // drink shows with her as she comes on. Who sent salam: then a voice from his place gives her salam, and a warm glow
    // comes on her as she reaches him. What her house is free of: the house of hollow pearl, shining; then noise and a
    // heavy grey sack of toil show and are kept away, and a calm comes over the house.
    expect([shown("What was Khadijah bringing when Jibril came?", ["a dish of food or drink with her"]), moved("What was Khadijah bringing when Jibril came?", "her place, coming", "x")]).toEqual([[[0], [1]], [28, 54]]);
    for (const prompt of ["Who sent salam to Khadijah?", "Who sent salam to Khadijah, along with Jibril?"]) {
      expect([prompt, shown(prompt, ["a voice from his place, giving her salam", "the salam on her, a warm glow"]), moved(prompt, "her place, coming", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [54, 78]
      ]);
    }
    const kept = ["noise, kept away 1", "noise, kept away 2", "toil, a heavy grey sack, kept away", "a calm over the house"];
    for (const prompt of ["What is her palace in Jannah free of?", "What will her palace in Paradise NOT have?", "What was in Khadijah's palace, in the hadith?"]) {
      expect([prompt, shown(prompt, kept), moved(prompt, "noise, kept away 1", "x"), moved(prompt, "toil, a heavy grey sack, kept away", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0, 0, 0, 1]
        ],
        [0, -8],
        [0, 8]
      ]);
    }
    // A tree of a hundred years. How long: a traveller's place goes on in its shade, with no years yet; then ten small
    // crescents, the years, show one by one as it goes on. Not crossing it: then it goes on still, and more shade shows
    // ahead.
    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => `the years going by ${year}`);
    for (const prompt of ["How long to ride through the tree's shade?", "How long could a rider travel in the tree's shade?"]) {
      expect([prompt, shown(prompt, years), moved(prompt, "a traveller's place, going on and on", "x")]).toEqual([prompt, [years.map(() => 0), years.map(() => 1)], [34, 94]]);
    }
    for (const prompt of ["What does it teach about Jannah?", "Could the rider cross the shade?"]) {
      expect([prompt, shown(prompt, ["more shade still ahead"]), moved(prompt, "a traveller's place, going on and on", "x")]).toEqual([prompt, [[0], [1]], [94, 140]]);
    }
    const ahead = [...years, "more shade still ahead"];
    expect([shown("The rider crosses the shade in a day.", ahead), moved("The rider crosses the shade in a day.", "a traveller's place, going on and on", "x")]).toEqual([[ahead.map(() => 0), ahead.map(() => 1)], [34, 140]]);
    // The Pool. How wide: the Pool, wide, with no way across it yet; then a way across it shows, a month's journey, with
    // three marks of ten days. Its water: then a bowl of milk shows by it, and its water turns whiter than milk. Its
    // cups: then its cups show all about it and shine like stars. Whoever drinks: then four places come up to drink, a
    // glow comes on each, a grey shade of thirst shows and is kept away, and a calm comes on each.
    const across = ["a way across it, a month's journey", "ten days of the journey 1", "ten days of the journey 2", "ten days of the journey 3"];
    expect(shown("How wide is the Pool?", across)).toEqual([across.map(() => 0), across.map(() => 1)]);
    expect(shown("What is the Pond water like, per the hadith?", ["a bowl of milk by it", "its water, whiter than milk"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    for (const prompt of ["How many cups does it have?", "How many cups does the Pond have?"]) {
      expect([prompt, shown(prompt, ["its cups, all about it", "its cups, shining like stars"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    const drink = ["a place, come to drink 1", "a place, come to drink 2", "a place, come to drink 3", "a place, come to drink 4", "a cool drink, a glow on each", "thirst, a grey shade, kept away", "never thirsty, a calm on each"];
    for (const prompt of ["What happens to whoever drinks from it?", "One sip from the Pond lasts only a short while."]) {
      expect([prompt, shown(prompt, drink), moved(prompt, "a place, come to drink 1", "y"), moved(prompt, "thirst, a grey shade, kept away", "y")]).toEqual([
        prompt,
        [drink.map(() => 0), [1, 1, 1, 1, 1, 0, 1]],
        [9, 0],
        [0, 6]
      ]);
    }
    // Gold like Uhud. What he forbade: those with him, with no voice at them yet; then crooked voices come at them, a
    // voice from his place says: do not, the crooked voices go, and a calm comes on them. What it would not reach: Uhud,
    // all of gold, with no balance yet; then a balance shows with the gold on one pan, a way goes from those with him to
    // the mudd on the other, and the bar tips to the mudd. Nor half of it: then the mudd shrinks to half and still
    // outweighs it, a warm glow comes on those with him, and sparks rise from the mudd.
    const forbade = ["a crooked voice at those with him 1", "a crooked voice at those with him 2", "a voice from his place: do not", "a calm on those with him"];
    for (const prompt of ["What did the Prophet ﷺ forbid about his companions?", "What did he ﷺ forbid, per Bukhari 3673?", "How should we speak of the Companions?"]) {
      expect([prompt, shown(prompt, forbade)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0, 0, 1, 1]
        ]
      ]);
    }
    const balance = ["a balance, its post", "the balance's bar, tipping to the mudd", "the pan of the gold", "the pan of the mudd", "gold as much as Uhud, on its pan", "a mudd of theirs, on its pan"];
    const weighed = [...balance, "a way from those with him to the mudd"];
    for (const prompt of ["What would gold like Uhud not equal?", "What would gold like Uhud not equal, per Bukhari 3673?"]) {
      expect([prompt, shown(prompt, weighed), moved(prompt, "the balance's bar, tipping to the mudd", "rotate"), moved(prompt, "a mudd of theirs, on its pan", "y")]).toEqual([
        prompt,
        [weighed.map(() => 0), [...balance.map(() => 1), 0]],
        [0, 12],
        [0, 4.2]
      ]);
    }
    const half = [...balance, "a warm glow on those with him", "sparks rising from the mudd"];
    for (const prompt of ["The Sahabah have a very high rank.", "What small amount of theirs outweighs it?"]) {
      expect([prompt, shown(prompt, half), moved(prompt, "a mudd of theirs, on its pan", "scale"), moved(prompt, "sparks rising from the mudd", "y")]).toEqual([
        prompt,
        [half.map(() => 0), half.map(() => 1)],
        [1, 0.62],
        [4.2, -5.8]
      ]);
    }
    // Respite, then seized. What He gives first: the proud house and the small homes, with nothing yet; then the months
    // of respite go by one by one, crooked ways of wrong go to the small homes, grey shades come on them, and his heap
    // grows. A delay is not forgetting: then cracks show in the ground about his house, a darkness rises from the
    // ground, and his house goes dark, the heap gone. He does not let him go: then his ways out break off, a dark ring
    // holds his place, the crooked ways and grey shades go, and a calm comes on the small homes.
    const months = [1, 2, 3, 4, 5, 6, 7, 8].map((month) => `the months of respite, going by ${month}`);
    const respite = [...months, "crooked ways of wrong, to the small homes", "grey shades on the small homes", "his heap, growing"];
    for (const [prompt, answer] of [
      ["What does Allah give the wrongdoer first, per the hadith?", "Respite"],
      ["What does Allah give the oppressor first?", "Respite"],
      ["What does Allah give the oppressor first?", "Respite, time"]
    ]) {
      expect([prompt, answer, shown(prompt, respite, answer)]).toEqual([prompt, answer, [respite.map(() => 0), respite.map(() => 1)]]);
    }
    expect(moved("What does Allah give the wrongdoer first, per the hadith?", "his heap, growing", "scale")).toEqual([0.4, 1]);
    const forgotten = [...months, "his heap, growing", "cracks in the ground about his house", "a darkness, rising from the ground", "his house, gone dark"];
    for (const prompt of ["A delay in punishment means Allah has forgotten.", "A delay means Allah has forgotten.", "Delay in punishment means no punishment."]) {
      expect([prompt, shown(prompt, forgotten), moved(prompt, "a darkness, rising from the ground", "y")]).toEqual([prompt, [forgotten.map(() => 0), [...months.map(() => 1), 0, 1, 1, 1]], [8, 0]]);
    }
    const held = ["his ways out, broken off", "a dark ring, holding his place", "a calm on the small homes", "crooked ways of wrong, to the small homes", "grey shades on the small homes"];
    for (const [prompt, answer] of [
      ["What happens when Allah seizes him?", "He never lets him go"],
      ["What happens when Allah takes the oppressor?", "He never releases him"],
      ["What happens when Allah seizes him?", "He never escapes"]
    ]) {
      expect([prompt, answer, shown(prompt, held, answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0, 1, 1],
          [0, 1, 1, 0, 0]
        ]
      ]);
    }
    // Convey from me. Even one ayah: one small light has gone from his place to the first place, with no way on yet;
    // then it is conveyed on and on along the ways to four more places, and a light comes on each. Only scholars: his
    // masjid and the five places, with nothing conveyed yet; then the light goes along all five ways. What he warned
    // against: a voice from one of them, telling at ease; then another place far off shows, and a crooked voice from it
    // lies. Its seat: then a dark seat shows beneath it, the crooked voice goes, it sinks, and the dark spreads.
    const ways = [1, 2, 3, 4, 5].map((way) => `a way of what is conveyed ${way}`);
    const reached = [1, 2, 3, 4, 5].map((place) => `a light on the place it reached ${place}`);
    const onward = [...ways.slice(1), ...reached.slice(1)];
    for (const [prompt, answer] of [
      ["How much should we pass on?", "Even one verse"],
      ["How much should we pass on?", "Even one ayah"],
      ["How much should we convey, per the hadith?", "Even a single sentence"]
    ]) {
      expect([prompt, answer, shown(prompt, onward, answer), moved(prompt, "one small light, conveyed on and on", "x")]).toEqual([prompt, answer, [onward.map(() => 0), onward.map(() => 1)], [18, 106]]);
    }
    const conveyed = [...ways, "one small light, conveyed on and on", ...reached];
    for (const prompt of ["Only scholars may share what they know.", "Only scholars may share what they learned.", "Only scholars may share anything about Islam."]) {
      expect([prompt, shown(prompt, conveyed), moved(prompt, "one small light, conveyed on and on", "x")]).toEqual([prompt, [conveyed.map(() => 0), conveyed.map(() => 1)], [0, 106]]);
    }
    expect(shown("What did he warn against?", ["a voice from one of them, telling at ease", "another place, far off", "a crooked voice from it, lying"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    expect([
      shown("What is the punishment for lying about him ﷺ on purpose?", ["a dark seat beneath it", "the dark, spreading under it", "a crooked voice from it, lying"]),
      moved("What is the punishment for lying about him ﷺ on purpose?", "another place, far off", "y")
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 0]
      ],
      [0, 2.6]
    ]);
    // The hidden poor. Not the one who goes around: a place with its dish at the first door; then it goes round from
    // door to door. The one in need: the quiet home, its door shut, with no one seen within yet; then a dim place and an
    // empty grey dish show within, and two other places pass by without turning. He does not ask: then the others are
    // gone, a soft light of patience comes on it, and a calm comes about the quiet home.
    expect([moved("Who is not the poor meant, per Bukhari 1479?", "a place going round, door to door", "x"), moved("Who is not the poor meant, per Bukhari 1479?", "its dish, going round with it", "x")]).toEqual([
      [0, 40],
      [0, 40]
    ]);
    const within = ["a dim place within", "an empty grey dish within", "another place, passing by without turning 1", "another place, passing by without turning 2"];
    for (const prompt of ["Who is the real poor person, per Abu Hurayrah?", "What does the hadith teach givers to do?", "Who is truly poor, per Bukhari 1479?"]) {
      expect([prompt, shown(prompt, within), moved(prompt, "another place, passing by without turning 1", "x")]).toEqual([prompt, [within.map(() => 0), within.map(() => 1)], [0, -70]]);
    }
    expect(shown("The real poor person, in the hadith, does not beg.", ["a soft light of patience on it", "a calm about the quiet home", "another place, passing by without turning 1"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
  });

  it("waits on the scenes of what he taught, from the one who came to teach to the prayer made short, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-came-to-teach", "sign-keep-ties", "sign-fast-of-dawud", "sign-one-religion", "sign-who-refuses", "sign-guided-at-the-door", "sign-prayer-made-short"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(79);
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
    // One came to teach. Which three: the one in very white has come, with nothing asked yet; then a voice asks, and
    // three small lights show, Islam, iman and ihsan. What ihsan is: then a prayer mat shows with a place at prayer on
    // it and a warm glow over it, and the light of ihsan grows. He sees you: then a dimness comes over it, and yet a
    // soft ring of light shows about it. The Hour: then the voice asks again, and a mist shows far off. Its signs: then
    // the herders' camels and places show, and tall buildings rise one over the last. Who it was: he has gone and they
    // saw nothing; then a warm glow comes on those with him, and what he came to teach rises.
    const three = ["a voice asking: tell me of them", "Islam, a small light", "iman, a small light", "ihsan, a small light"];
    expect(shown("Which three did Jibril ask about?", three)).toEqual([three.map(() => 0), three.map(() => 1)]);
    const prayer = ["a prayer mat", "a place at prayer on it", "a warm glow over the prayer"];
    for (const prompt of ["What is Ihsan, per Bukhari 50?", "What is Ihsan?", "What is ihsan?"]) {
      expect([prompt, shown(prompt, prayer), moved(prompt, "ihsan, a small light", "scale")]).toEqual([prompt, [prayer.map(() => 0), prayer.map(() => 1)], [1, 1.5]]);
    }
    const seen = ["a dimness over it: you do not see", "yet it is seen: a soft ring of light about it"];
    for (const prompt of [
      "If we cannot reach that, we know Allah sees us.",
      "If we cannot reach that level, what then?",
      "If we cannot reach that, what should we remember?",
      "Even when we can't see Allah, He sees us."
    ]) {
      expect([prompt, shown(prompt, seen), moved(prompt, "yet it is seen: a soft ring of light about it", "scale")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0.5, 1]
      ]);
    }
    const hour = ["the voice asking again: when is the Hour", "a mist far off: when it is, unknown"];
    for (const prompt of [
      "What did the Prophet ﷺ answer when Jibril asked when the Hour is?",
      "The Prophet ﷺ knew the exact day of the Hour.",
      "What did the Prophet ﷺ answer Jibril, per Bukhari 50?",
      "Someone can tell us the exact date of the Hour.",
      "What did the Prophet ﷺ answer about the Hour?",
      "Even the Prophet ﷺ did not know the time of the Hour.",
      "What did the Prophet ﷺ answer?",
      "Even Jibril did not know the time of the Hour.",
      "What was his answer?"
    ]) {
      expect([prompt, shown(prompt, hour)]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    const signs = ["camels of the herders", "the herders' places, by the buildings", "a tall building, rising over the last 1", "a tall building, rising over the last 2", "a tall building, rising over the last 3"];
    for (const prompt of [
      "What did he tell Jibril about instead?",
      "Who will compete in building tall buildings?",
      "What will they compete in?",
      "Tall buildings are a sign of the Hour named by the Prophet ﷺ.",
      "What did he tell about instead?",
      "He said he would tell of the Hour's portents."
    ]) {
      expect([prompt, shown(prompt, signs), moved(prompt, "a tall building, rising over the last 3", "scaleY")]).toEqual([prompt, [signs.map(() => 0), signs.map(() => 1)], [0.05, 1]]);
    }
    const taught = ["a warm glow on those with him", "what he came to teach, rising 1", "what he came to teach, rising 2", "what he came to teach, rising 3", "a warm light over the gathering", "the one who came, in very white: a white light"];
    for (const prompt of [
      "Who asked the Prophet ﷺ about Ihsan?",
      "Who asked the Prophet ﷺ about the Hour?",
      "Who came asking about Ihsan?",
      "Who came to ask about Islam, iman and ihsan?",
      "Who came in very white clothes to ask the Prophet ﷺ?",
      "Why did Jibril come?"
    ]) {
      expect([prompt, shown(prompt, taught), moved(prompt, "what he came to teach, rising 1", "y")]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ],
        [0, -18]
      ]);
    }
    // Keeping ties. Who came: a place at the far end, with no way shown yet; then the way shows, and it comes along it
    // to her home with a soft glow of hope. Not Muslim: then a grey shade shows between them. What she asked: then her
    // place goes along a way to his, and her voice asks. His answer: then his voice answers, the grey shade lifts, a
    // golden way joins them and a warm glow comes on both, and a gift is kindly given as her place comes home.
    expect([shown("Who came to visit Asma?", ["a dashed way, coming to her home", "hoping: a soft glow with it"]), moved("Who came to visit Asma?", "a place coming, hoping", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 42]
    ]);
    expect(shown("Asma's mother was not a Muslim at the time.", ["a grey shade between them"])).toEqual([[0], [1]]);
    for (const answer of ["If she should be kind to her mother", "May I be kind to my mother?", "May I treat her kindly?"]) {
      expect([answer, shown("What did Asma ask the Prophet ﷺ?", ["her way to his place", "her voice: shall I keep ties with her"], answer), moved("What did Asma ask the Prophet ﷺ?", "her place", "x")]).toEqual([
        answer,
        [
          [0, 0],
          [1, 1]
        ],
        [0, 47]
      ]);
    }
    const ties = ["a golden way joining them", "a warm glow on both", "a gift, kindly given", "a grey shade between them"];
    for (const prompt of [
      "What did the Prophet ﷺ tell Asma?",
      "What did he ﷺ answer?",
      "A new Muslim should cut off family who are not Muslim.",
      "What did he answer?",
      "The Prophet ﷺ answered Asma with yes.",
      "What did the Prophet ﷺ tell her?",
      "Muslims are kind to parents who are not Muslim."
    ]) {
      expect([prompt, shown(prompt, ties), moved(prompt, "a gift, kindly given", "x"), moved(prompt, "her place", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 0]
        ],
        [0, -12.4],
        [47, 0]
      ]);
    }
    // The fast of Dawud. What he vowed: eight days and nights with nothing on them yet; then his voice says it, and a
    // cover of fasting comes on every day and a light of prayer on every night. What he was told: then a voice says he
    // cannot, food comes on every other day, and every other day's cover and night's light go. Every other day: then the
    // fasting days glow one by one. The best fast: then a golden line comes about the days, with a warm light, and the
    // best shines. His night: night has come over a long bar in six; then the moon goes over as half of it is asleep and
    // a third at prayer, and at last a sixth is asleep, and the dawn comes.
    const covers = [1, 2, 3, 4, 5, 6, 7, 8].map((day) => `fasting: a cover on the day ${day}`);
    const lights = [1, 2, 3, 4, 5, 6, 7, 8].map((night) => `at prayer: a light on the night ${night}`);
    const vowed = ["his voice: I will fast all day, pray all night", ...covers, ...lights];
    for (const prompt of ["What did Abdullah ibn Amr plan to do?", "What had Abdullah ibn Amr vowed?"]) {
      expect([prompt, shown(prompt, vowed)]).toEqual([prompt, [vowed.map(() => 0), vowed.map(() => 1)]]);
    }
    const food = [2, 4, 6, 8].map((day) => `eating: food on the day ${day}`);
    const everyOther = [...covers, ...lights].map((name, index) => (index % 2 === 0 ? 1 : 0));
    for (const prompt of ["What did the Prophet ﷺ tell him?", "Islam asks for balance in worship."]) {
      expect([prompt, shown(prompt, ["his voice: you cannot", ...food, ...covers, ...lights])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0, ...covers.map(() => 1), ...lights.map(() => 1)],
          [1, 1, 1, 1, 1, ...everyOther]
        ]
      ]);
    }
    const fasting = [1, 2, 3, 4].map((day) => `a fasting day, glowing ${day}`);
    for (const prompt of ["How did Prophet Dawud fast?", "How did Dawud fast?", "What is the fast of Dawud?"]) {
      expect([prompt, shown(prompt, fasting)]).toEqual([prompt, [fasting.map(() => 0), fasting.map(() => 1)]]);
    }
    const best = ["the best fast: a golden line about the days", "a warm light over the days", "the best, shining"];
    for (const prompt of ["Which extra fast is most loved by Allah?", "Whose fast did the Prophet ﷺ call most loved by Allah?", "Which fast did the Prophet ﷺ call the best?"]) {
      expect([prompt, shown(prompt, best)]).toEqual([prompt, [best.map(() => 0), best.map(() => 1)]]);
    }
    const night = ["half the night, asleep 1", "half the night, asleep 2", "half the night, asleep 3", "a third of it, at prayer 1", "a third of it, at prayer 2", "a sixth of it, asleep"];
    expect([shown("How much of the night did Dawud pray?", night), moved("How much of the night did Dawud pray?", "the moon going over", "x")]).toEqual([
      [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0]
      ],
      [0, 100]
    ]);
    expect([shown("Dawud also prayed part of the night and slept part.", [...night, "the dawn"]), moved("Dawud also prayed part of the night and slept part.", "the moon going over", "x")]).toEqual([
      [
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      [0, 120]
    ]);
    // One religion. Nearest to Isa: his ring alone; then the nearest ring shows just before his, with a short golden way
    // between the two. Brothers of one religion: the two together, with no earlier rings yet; then earlier rings show
    // one after another, one golden thread goes through them all, a home of its own shows behind each, and one light
    // goes along the thread, a glow coming on each ring as it passes, and a warm light over them all. One religion: the
    // rings and their homes, with no light along them yet; then the one light goes along the thread.
    expect(shown("Which prophet did he ﷺ say he was closest to?", ["the ring just before his, the nearest", "a short golden way between the two"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const rings = [1, 2, 3, 4, 5].map((ring) => `an earlier ring, one after another ${ring}`);
    const homes = [1, 2, 3, 4, 5, 6, 7].map((home) => `a home of its own behind each, each a different color ${home}`);
    const one = ["one light along the thread", ...[1, 2, 3, 4, 5, 6, 7].map((ring) => `a warm glow on each ring ${ring}`), "one religion: a warm light over them all"];
    const brothers = [...rings, "one golden thread through them all", ...homes, ...one];
    for (const prompt of ["How are the Prophets described, per the hadith?", "What are the prophets like, per Bukhari 3443?"]) {
      expect([prompt, shown(prompt, brothers), moved(prompt, "one golden thread through them all", "scaleX"), moved(prompt, "one light along the thread", "x")]).toEqual([
        prompt,
        [brothers.map(() => 0), brothers.map(() => 1)],
        [0.02, 1],
        [0, 118]
      ]);
    }
    for (const prompt of ["What did all the prophets share?", "Every prophet called to worship Allah alone.", "What do all prophets share, per Bukhari 3443?", "What did the Prophets share, per the hadith?"]) {
      expect([prompt, shown(prompt, [...one, ...homes]), moved(prompt, "one light along the thread", "x")]).toEqual([
        prompt,
        [
          [...one.map(() => 0), ...homes.map(() => 1)],
          [...one.map(() => 1), ...homes.map(() => 1)]
        ],
        [0, 118]
      ]);
    }
    // Who refuses. All but whoever refuses: his ring at the foot of a way up to the gate, with no one on it yet; then
    // four places go up and in, and one turns away along a crooked way and goes grey. Who would not enter: the four are
    // in; then one turns away and goes grey. Whoever obeys: a voice from those with him asks; then his voice answers,
    // one follows his way all the way in, and the gate glows. Whoever disobeys: then one goes partway and turns off along
    // a crooked way, and a grey shade comes on it.
    const fourIn = ["a place going up and in 1", "a place going up and in 2", "a place going up and in 3", "a place going up and in 4", "a crooked way, turning away", "one who refused, grey"];
    expect([
      shown("All his followers will enter except those who refuse.", fourIn),
      moved("All his followers will enter except those who refuse.", "a place going up and in 1", "x"),
      moved("All his followers will enter except those who refuse.", "a place going up and in 1", "y")
    ]).toEqual([[fourIn.map(() => 0), fourIn.map(() => 1)], [0, 81], [0, -40.2]]);
    expect([shown("Who will not enter Paradise, per the hadith?", ["a crooked way, turning away", "one who turns away from it", "one who refused, grey"]), moved("Who will not enter Paradise, per the hadith?", "one who turns away from it", "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 0, 1]
      ],
      [0, -18]
    ]);
    const obeys = ["a voice from those with him: who would refuse", "his voice: whoever obeys me", "one who follows his way, all the way in", "the gate, glowing"];
    for (const prompt of ["In Bukhari 7280, obeying the Prophet ﷺ is the way into Jannah.", "Who will enter Paradise, per the hadith?", "Obeying him is the way into Paradise."]) {
      expect([prompt, shown(prompt, obeys), moved(prompt, "one who follows his way, all the way in", "x"), moved(prompt, "one who follows his way, all the way in", "y")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ],
        [0, 96],
        [0, -42]
      ]);
    }
    const refused = ["his voice: whoever obeys me", "one who goes partway, then turns off", "a crooked way, off his way", "a grey shade on it: it has refused"];
    for (const prompt of ["Who refuses Jannah, in Bukhari 7280?", "Who is the one who refuses?"]) {
      expect([prompt, shown(prompt, refused), moved(prompt, "one who goes partway, then turns off", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 0, 1, 1]
        ],
        [0, 74]
      ]);
    }
    // Guided at the door. His du'a: he has come weeping to his place by the masjid; then his du'a for her rises. When he
    // got home: her door is shut and the sound of water comes from within; then the door opens, her place shows in the
    // doorway, her voice testifies, and a warm glow comes on her. Weeping for joy: then he goes back with tears of joy.
    // Beloved to the believers: then his second du'a rises, a warm glow comes on the homes of Madinah, golden ways of
    // love go from them, and a warm glow comes on her home.
    const dua = ["his du'a for her, rising 1", "his du'a for her, rising 2", "his du'a for her, rising 3", "his tears"];
    for (const prompt of ["What did Abu Hurairah ask the Prophet ﷺ?", "What does this teach about our parents?"]) {
      expect([prompt, shown(prompt, dua), moved(prompt, "his du'a for her, rising 1", "y"), moved(prompt, "his place", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ],
        [0, -26],
        [72, 72]
      ]);
    }
    expect([
      shown("What happened when he got home?", ["the sound of water, from within", "her place, in the open doorway", "her voice: I testify", "guided: a warm glow on her"]),
      moved("What happened when he got home?", "her door", "scaleX")
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ],
      [1, 0.16]
    ]);
    expect([
      shown("Abu Hurairah cried a second time, from joy.", ["his tears of joy"]),
      moved("Abu Hurairah cried a second time, from joy.", "his place", "x"),
      moved("Abu Hurairah cried a second time, from joy.", "his tears of joy", "x")
    ]).toEqual([[[0], [1]], [-4, 72], [-4, 72]]);
    const love = [
      "his second du'a, rising 1",
      "his second du'a, rising 2",
      "his second du'a, rising 3",
      "a warm glow on the homes of Madinah",
      "a golden way of love from them 1",
      "a golden way of love from them 2",
      "a golden way of love from them 3",
      "a warm glow on her home"
    ];
    for (const prompt of ["What did the Prophet ﷺ pray for Abu Hurairah and his mother?", "Abu Hurairah said believers who hear of him love him."]) {
      expect([prompt, shown(prompt, love), moved(prompt, "his second du'a, rising 1", "y")]).toEqual([prompt, [love.map(() => 0), love.map(() => 1)], [0, -16]]);
    }
    // The prayer made short. What made him: the golden band shows how long the prayer is meant to be, with no crying
    // yet; then the little one cries, a grey worry comes on the one with it, and the cry is heard at the front. Short
    // for her: then the band shrinks, the crying and the worry go, a calm glow comes on them, and a soft light of mercy
    // comes over all.
    const band = "a golden band on the wall: how long the prayer is meant to be";
    const cry = ["the little one's crying", "a grey worry on the one with it", "the cry, heard at the front"];
    for (const prompt of ["What made the Prophet ﷺ shorten his prayer?", "What made him ﷺ shorten the prayer?"]) {
      expect([prompt, shown(prompt, cry), moved(prompt, band, "scaleX")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [1, 1]
      ]);
    }
    const calm = [...cry, "a calm glow on them", "a soft light of mercy over all"];
    for (const prompt of ["The Prophet ﷺ thought of others even while leading prayer.", "An imam should think of the people behind him."]) {
      expect([prompt, shown(prompt, calm), moved(prompt, band, "scaleX")]).toEqual([
        prompt,
        [
          [1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1]
        ],
        [1, 0.45]
      ]);
    }
    for (const answer of ["The child's mother", "The mother"]) {
      expect([answer, shown("Whom did he ﷺ not want to trouble?", calm, answer)]).toEqual([
        answer,
        [
          [1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of the first revelation and of deeds he taught, from the cave of Hira to the one word, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-cave-of-hira", "sign-never-disgrace", "sign-prayer-together", "sign-two-ayat-at-night", "sign-skilled-reciter", "sign-fast-of-arafah", "sign-one-word"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
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
    // The cave of Hira. How it began: nothing yet over his home; then the soft glow of a good dream, and the light of
    // dawn along the land. Food: his place is at his home, with no way up yet; then his way up to the cave shows, and he
    // goes up it with food for his stay. Where: then he goes up, worships there night after night, and the truth comes
    // to him in the cave, a white light growing, with a white light over the mountain. The first word: no voice yet;
    // then a voice in the cave: read, and his: I am not one who reads.
    const dream = ["a good dream: a soft glow over his home", "like daybreak: the light of dawn along the land"];
    expect(shown("How did the revelation begin, per Aishah?", dream)).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const food = "He took food with him for his days of worship.";
    expect([shown(food, ["his way up to the cave", "food for his stay, with him"]), moved(food, "a golden ring, his place", "x"), moved(food, "food for his stay, with him", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -82.5],
      [0, -82.5]
    ]);
    const cave = ["his way up to the cave", "his worship in the cave: a warm glow", "a night of his worship 1", "a night of his worship 7", "the truth, come to him in the cave: a white light", "a white light over the mountain"];
    const where = "Where was the Prophet ﷺ when the first ayahs came?";
    expect([shown(where, cave), moved(where, "a golden ring, his place", "x"), moved(where, "the truth, come to him in the cave: a white light", "scale")]).toEqual([
      [cave.map(() => 0), cave.map(() => 1)],
      [0, -82.5],
      [0.4, 1.3]
    ]);
    expect(shown("What was the first word Jibril said to him?", ["a voice in the cave: read", "his voice: I am not one who reads"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Allah will never disgrace you. What she said: he is under a soft cover, his voice: cover me; then her voice:
    // never, and a warm glow comes on his place. His ties: then a golden way of ties goes to the homes of kin, and a
    // load is carried for the weak one. The poor and the guest: then food is given on the poor one's empty dish, and
    // set out for the one come to stay, with a warm welcome. Her cousin: then the way to the old one's home shows, and
    // the two go along it. Musa: then the old one's voice comes, and the light in the cave far off grows. Hostility:
    // then crooked voices come from homes of Makkah as the old one's voice goes on, and still a soft light stays on his
    // place.
    const comfort = ["her voice: never", "a warm glow on his place", "his voice: cover me", "a soft cover over his place"];
    for (const prompt of ["What did Khadijah say to comfort him?", "Khadijah supported her husband at a hard time.", "What did Khadijah say when he came home afraid?", "What did Khadijah say to calm him?"]) {
      expect([prompt, shown(prompt, comfort)]).toEqual([
        prompt,
        [
          [0, 0, 1, 1],
          [1, 1, 0, 1]
        ]
      ]);
    }
    const ties = "Which good deed of his did she name?";
    expect([shown(ties, ["a golden way of ties to the homes of kin", "a load, carried for the weak one"]), moved(ties, "a load, carried for the weak one", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 62]
    ]);
    const given = ["food, given on the poor one's dish", "food, set out for the one come to stay", "a warm welcome on the one come to stay"];
    for (const prompt of ["Which good deed did Khadijah name to comfort him?", "Which good deed did Khadijah name?", "She said he served his guests generously."]) {
      expect([prompt, shown(prompt, given)]).toEqual([prompt, [given.map(() => 0), given.map(() => 1)]]);
    }
    const cousin = "Who was Waraqah to Khadijah?";
    expect([
      shown(cousin, ["the way to the old one's home"]),
      moved(cousin, "her place", "x"),
      moved(cousin, "a golden ring, his place", "x"),
      moved(cousin, "the way to the old one's home", "scaleX")
    ]).toEqual([[[0], [1]], [0, 88], [0, 88], [0.02, 1]]);
    const old = "the old one's voice: it is the one who came before";
    expect(shown("To which Messenger did Waraqah say the angel came before?", [old, "the light in the cave far off, brighter"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const hostile = ["a crooked voice from a home, against it 1", "a crooked voice from a home, against it 2", "a crooked voice from a home, against it 3", "still, a soft light stays on his place"];
    expect(shown("Waraqah said his people would welcome him warmly.", [...hostile, old])).toEqual([
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1]
    ]);
    expect(shown("Who told the Prophet ﷺ every messenger faced hostility, per Bukhari 3?", [old, ...hostile])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Prayer together. Alone: the row is at prayer together under a warm glow, with nothing apart yet; then a prayer
    // mat shows by a home apart, a place at prayer alone on it, and one step for it. Twenty-seven: then twenty-seven
    // degrees show, one higher than the last, and a warm light comes over them.
    const alone = ["a prayer mat, alone", "a place at prayer alone", "one step, for the prayer alone"];
    expect(shown("What is it compared with?", alone)).toEqual([alone.map(() => 0), alone.map(() => 1)]);
    const degrees = [...Array.from({ length: 27 }, (_, i) => `a degree higher ${i + 1}`), "a warm light over the degrees"];
    for (const [prompt, answer] of [
      ["Prayer in congregation is how many degrees better than alone?", "Twenty-seven"],
      ["How much better is prayer in congregation?", "27 degrees"],
      ["How much better is prayer in congregation?", "Twenty seven times"],
      ["Praying together has more reward than praying alone.", "True"],
      ["Prayer in congregation is 27 degrees better.", "True"],
      ["Joining the believers in prayer brings great reward.", "True"]
    ]) {
      expect([prompt, answer, shown(prompt, degrees, answer)]).toEqual([prompt, answer, [degrees.map(() => 0), degrees.map(() => 1)]]);
    }
    // The last two ayat at night. Which: nothing is recited yet; then a voice recites within, two lights rise from the
    // home for the two ayat, the night deepens and the moon goes over. Enough: the moon waits; then it goes on over, a
    // soft light comes about the home, and stays till the dawn.
    const which = "Which ayahs are enough for you when read at night?";
    const recited = ["a voice reciting within", "the first of the two ayat, a light rising", "the second of the two ayat, a light rising", "the night, deepening"];
    expect([
      shown(which, recited),
      moved(which, "the first of the two ayat, a light rising", "y"),
      moved(which, "the second of the two ayat, a light rising", "y"),
      moved(which, "the moon, going over", "x")
    ]).toEqual([[recited.map(() => 0), recited.map(() => 1)], [0, -25.7], [0, -25.7], [0, 40]]);
    const enough = ["enough for him: a soft light about the home", "dawn, the night gone by"];
    for (const prompt of ["What do those two ayahs do for the one who reads them?", "What did the Prophet ﷺ say of the last two ayahs at night?", "What do the last two ayahs of Al-Baqarah give at night?"]) {
      expect([prompt, shown(prompt, enough), moved(prompt, "the moon, going over", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [40, 90]
      ]);
    }
    // The skilled reciter. Who is with the scribes: nothing yet; then a smooth voice recites, a warm glow comes on it,
    // and its light goes up a golden way to a high place of honor far above. Two rewards: the halting voice keeps at it
    // under a grey weight; then two rewards rise, and a warm glow comes on it. A reason to stop: nothing of the effort
    // yet; then a halting voice tries, a grey weight comes on it, it keeps at it again, and the two rewards rise.
    const masters = ["a smooth voice, reciting", "knowing it well: a warm glow on it", "a high place of honor, far above", "a golden way up to it", "its light, going up to the high place"];
    const high = masters.slice(2);
    for (const [prompt, names] of [
      ["Who will be with the noble scribes?", masters],
      ["Who is the skilled reciter with?", high]
    ] as [string, string[]][]) {
      expect([prompt, shown(prompt, names), moved(prompt, "its light, going up to the high place", "y")]).toEqual([prompt, [names.map(() => 0), names.map(() => 1)], [0, -40]]);
    }
    const rewards = ["the first reward, rising", "the second reward, rising", "two rewards: a warm glow on it"];
    for (const prompt of ["What does one who struggles to recite get?", "Reciting slowly with difficulty earns nothing.", "What does one who finds it hard get?"]) {
      expect([prompt, shown(prompt, rewards), moved(prompt, "the first reward, rising", "y"), moved(prompt, "the second reward, rising", "y")]).toEqual([
        prompt,
        [rewards.map(() => 0), rewards.map(() => 1)],
        [0, -28],
        [0, -28]
      ]);
    }
    const effort = ["a halting voice, trying", "it is hard: a grey weight on it", "keeping at it, again", ...rewards];
    expect(shown("Struggling with recitation is a reason to stop.", effort)).toEqual([effort.map(() => 0), effort.map(() => 1)]);
    // The fast of Arafah. Two years: the voice asking is still there, and grey marks are on every month of both years;
    // then his voice answers, the marks go month by month from the year gone by and then from the year to come, a soft
    // light shows on each year, made clean, and a warm light comes over the day.
    const years = [
      "a voice asking about the fast",
      "his voice, answering",
      "a grey mark on a month gone by 1",
      "a grey mark on a month gone by 12",
      "a grey mark on a month to come 1",
      "a grey mark on a month to come 12",
      "the year gone by, made clean: a soft light",
      "the year to come, made clean: a soft light",
      "a warm light over the day"
    ];
    for (const prompt of ["Fasting Arafah covers sins of how many years?", "Fasting the Day of Arafah expiates how much?", "What does fasting Arafah expiate, per the hadith?"]) {
      expect([prompt, shown(prompt, years)]).toEqual([
        prompt,
        [
          [1, 0, 1, 1, 1, 1, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 1, 1, 1]
        ]
      ]);
    }
    // One word. What a pleasing word does: the good word is spoken, and its place rests; then the voice goes, five ranks
    // show one over the last, the place climbs them, and a warm glow comes on it. A careless word: nothing of it yet;
    // then a crooked voice is spoken, and a dark blot comes on its place.
    const raised = ["a good word, spoken: a golden voice", "a rank higher 1", "a rank higher 2", "a rank higher 3", "a rank higher 4", "a rank higher 5", "raised: a warm glow on it"];
    for (const prompt of ["What can one word that pleases Allah do, per Bukhari 6478?", "What can one pleasing word do, per Bukhari 6478?"]) {
      expect([prompt, shown(prompt, raised), moved(prompt, "a place, saying a good word", "x"), moved(prompt, "a place, saying a good word", "y")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1]
        ],
        [8, 39],
        [0, -26.5]
      ]);
    }
    const careless = "A careless word can displease Allah, per Bukhari 6478.";
    expect([shown(careless, ["a word that angers, spoken: a crooked voice", "a dark blot on it"]), moved(careless, "another place, saying a word that angers", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 10]
    ]);
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
