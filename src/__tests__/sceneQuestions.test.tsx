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
    expect(asks.length).toBe(2417);
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
    // its lessons). The second review card of "The Book of the Virtues of the Quran" also asks what one who finds
    // reciting hard gets, a question on the scene of the skilled reciter. "Jumu'ah" now has seven lessons, so it gets
    // a review card, which asks how long the hour of du'a is, and its final quiz asks whether to make many du'as on
    // Fridays in place of what is special about that hour (both still asked in their lesson). That review card also
    // asks what to do before Jumu'ah, a question on the scene of getting ready for Friday.
    expect(places).toBe(3532);
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

  it("waits on the scenes of those who were with him, from the lamps in the sky to greeting first, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-lamps-in-the-sky", "sign-prayer-too-long", "sign-every-one-a-shepherd", "sign-the-garden-gate", "sign-ship-to-abyssinia", "sign-ten-years-serving", "sign-greet-first"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(41);
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
    // The lamps in the sky. The surah: nothing is recited yet; then his recitation, a voice. The horse: it stands
    // quiet; then it is startled. Why he stopped: the voice and the startled horse; then the voice stops, the horse is
    // quiet, the little one's place is near it and a worry comes on the one reciting. What he saw: nothing over him
    // yet; then like a cloud, with lights like lamps in it. What it was: the cloud is there and no voice yet; then it
    // rises away, he goes to the golden ring by the masjid, and his voice: those came near for your voice. At dawn:
    // the dawn comes; then the sun rises, and a warm glow comes on the one who recited.
    expect(shown("Which surah was Usayd reciting at night?", ["his recitation: a voice"])).toEqual([[0], [1]]);
    expect(shown("What did the horse do when he recited?", ["the horse, tied beside him, quiet", "the horse, startled"])).toEqual([
      [1, 0],
      [0, 1]
    ]);
    const stopped = "Usayd stopped because his son was near the horse.";
    const near = ["his recitation: a voice", "the horse, startled", "the horse, tied beside him, quiet", "a worry on the one reciting, for the little one"];
    expect([shown(stopped, near), moved(stopped, "the little one's place, near the horse", "x")]).toEqual([
      [
        [1, 1, 0, 0],
        [0, 0, 1, 1]
      ],
      [0, -14]
    ]);
    expect(shown("What did Usayd see in the sky?", ["like a cloud, with lights like lamps in it", "a worry on the one reciting, for the little one"])).toEqual([
      [0, 1],
      [1, 0]
    ]);
    const cloud = "What was the cloud, he ﷺ said?";
    expect([
      shown(cloud, ["his voice: those came near for your voice", "a golden ring, his place by the masjid", "like a cloud, with lights like lamps in it"]),
      moved(cloud, "the place of the one reciting", "x")
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 0]
      ],
      [-4, 81]
    ]);
    expect(shown("If he had kept reciting, people would have seen them at dawn.", ["the sun, rising", "a warm glow on the one who recited", "the dawn"])).toEqual([
      [0, 0, 1],
      [1, 1, 1]
    ]);
    // The prayer made too long. What he recited: no band on the wall yet; then the voice of the one leading recites
    // long, and the golden band grows long. Instead: the long band; then it goes, and three short bands show for
    // al-A'la, ash-Shams and al-Layl. Who prays behind: nothing on them yet; then a warm glow on the old one, the weak
    // one and the one in need, and a soft light over the row.
    const band = "a golden band on the wall: how long the recitation is";
    for (const prompt of ["Which surah did Mu'adh recite in Isha?", "Mu'adh had recited a short surah that night."]) {
      expect([prompt, shown(prompt, [band, "the voice of the one leading, reciting long"]), moved(prompt, band, "scaleX")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0.06, 1]
      ]);
    }
    const short = ["a short surah instead, a short golden band 1", "a short surah instead, a short golden band 2", "a short surah instead, a short golden band 3", band];
    for (const prompt of ["Which surahs did the Prophet ﷺ suggest instead?", "Which surah did he name besides Al-A'la and Al-Layl?"]) {
      expect([prompt, shown(prompt, short)]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 0]
        ]
      ]);
    }
    const behind = ["behind him, a warm glow on the old one", "behind him, a warm glow on the weak one", "behind him, a warm glow on the one in need", "a soft light over the row"];
    for (const prompt of ["Why should an imam keep the prayer light?", "Why should an imam keep prayer short?"]) {
      expect([prompt, shown(prompt, behind)]).toEqual([prompt, [behind.map(() => 0), behind.map(() => 1)]]);
    }
    // Every one a shepherd. All of us: no ring yet; then a golden ring of care about the flock. Not only leaders: then
    // rings about the flock, the town and the family. A man: the town's ring; then the family's. A woman: the family's;
    // then the home's. Responsible: the rings; then a warm glow on each of the five, and a soft light rising.
    const ring = (about: string) => `a golden ring of care about ${about}`;
    expect(shown("What did the Prophet ﷺ call all of us?", [ring("the flock")])).toEqual([[0], [1]]);
    const rings = [ring("the flock"), ring("the town"), ring("the family")];
    expect(shown("Only leaders have someone in their care.", rings)).toEqual([rings.map(() => 0), rings.map(() => 1)]);
    expect(shown("In the hadith, a man is the guardian of what?", [ring("the family"), ring("the town")])).toEqual([
      [0, 1],
      [1, 1]
    ]);
    expect(shown("A woman is the guardian of what?", [ring("the home"), ring("the family")])).toEqual([
      [0, 1],
      [1, 1]
    ]);
    const cares = ["the flock", "the town", "the family", "the home", "the wealth"];
    const responsible = [...cares.map((about) => `responsible for ${about}: a warm glow`), ...cares.map((about) => `responsible for ${about}: a soft light rising`)];
    for (const prompt of ["What are we responsible for?", "Only rulers are responsible for anyone."]) {
      expect([prompt, shown(prompt, responsible)]).toEqual([prompt, [responsible.map(() => 0), responsible.map(() => 1)]]);
    }
    // The garden gate. Before Uthman: the first one has come to the gate, and no praise yet; then he goes in praising
    // Allah, and the second comes and goes in praising Allah, while the third is still to come. The second: no one
    // yet; then the second comes, with good news of Paradise, and praise rises over him. Uthman: no third yet; then he
    // comes, with good news of Paradise and a grey shade of the calamity to strike him. What he said: the grey shade;
    // then praise rises over him, a steady warm light stays on him, and he goes in.
    const before = "Who came to the gate before Uthman?";
    const praise = ["his praise, rising over the first one", "his praise, rising over the second one", "the second one's place, coming", "the third one's place, coming"];
    expect([shown(before, praise), moved(before, "the first one's place, coming", "x")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0]
      ],
      [0, 60]
    ]);
    const second = ["the second one's place, coming", "good news of Paradise: a warm glow on the second one", "his praise, rising over the second one"];
    for (const prompt of ["Who came to the gate second?", "What did Umar do when he heard the good news?"]) {
      expect([prompt, shown(prompt, second), moved(prompt, "the second one's place, coming", "x")]).toEqual([prompt, [second.map(() => 0), second.map(() => 1)], [-72, 66.4]]);
    }
    const third = ["the third one's place, coming", "good news of Paradise: a warm glow on the third one", "with a calamity to strike him: a grey shade"];
    expect(shown("What came with Uthman's good news of Jannah?", third)).toEqual([third.map(() => 0), third.map(() => 1)]);
    const sought = "What did Uthman say when he heard?";
    expect([
      shown(sought, ["his praise, rising over the third one", "help is sought: a steady warm light on the third", "with a calamity to strike him: a grey shade"]),
      moved(sought, "the third one's place, coming", "x")
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 1]
      ],
      [0, 72.8]
    ]);
    // The ship to Abyssinia. How: their places are at home in Yemen, the ship by the shore; then they board it, and it
    // sails across to Abyssinia. Where Ja'far was: they are on the ship, still by Yemen; then it is cast on the shore
    // of Abyssinia, they land among those already there, and a warm glow comes as they meet. Who came back: all are
    // in Abyssinia, a soft ring about them; then those already there board too, and the ship takes them all back
    // across. When: they are back by the shore; then the way up to Khaybar shows, with the golden ring, and a share is
    // given to them, with a warm glow on those of the ship.
    const how = "How did Abu Musa's people reach Abyssinia?";
    expect([moved(how, "the ship", "x"), moved(how, "the places of those who came from Yemen", "x")]).toEqual([
      [0, -74],
      [0, -102]
    ]);
    const where = "Where did Ja'far live for years?";
    expect([shown(where, ["a warm glow as they meet", "the places of those already in Abyssinia"]), moved(where, "the places of those who came from Yemen", "x")]).toEqual([
      [
        [0, 1],
        [1, 1]
      ],
      [-28, -110]
    ]);
    const back = "Who came back with Ja'far?";
    expect([shown(back, ["staying: a soft ring about them all"]), moved(back, "the places of those already in Abyssinia", "x"), moved(back, "the ship", "x")]).toEqual([
      [[1], [0]],
      [0, 110],
      [-74, 0]
    ]);
    const khaybar = ["the way up to Khaybar", "a golden ring, his place at Khaybar", "a share given to them: a sack", "a warm glow on those of the ship"];
    for (const prompt of ["When did Ja'far return to the Prophet ﷺ?", "Ja'far's group got a share of Khaybar though they did not fight."]) {
      expect([prompt, shown(prompt, khaybar)]).toEqual([prompt, [khaybar.map(() => 0), khaybar.map(() => 1)]]);
    }
    // Ten years of serving him. Who brought him: the golden ring is home, alone; then a place comes with the little
    // one's place to him. A wise boy: no voice yet; then a voice for the little one: let him serve you, and a warm glow
    // on him. Not only at home: nothing of his serving yet; then a jug of water by the door, a way out of the town and
    // a camel for the journey. Ten years: no year yet; then ten small suns, one after another, and the little one's
    // place grows. What he never said: no voice; then his voice, only gentle, and a warm glow on the one who served.
    // Kind to him: then, too, a soft light over the years.
    const brought = "Who brought Anas to serve the Prophet ﷺ?";
    expect([shown(brought, ["the place of the one who brought him", "the little one's place, brought to serve"]), moved(brought, "the little one's place, brought to serve", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [60, 0]
    ]);
    expect(shown("How did Abu Talhah describe Anas?", ["a voice for the little one: let him serve you", "a warm glow on the little one"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const serving = ["serving at home: a jug of water by the door", "on journeys: a way out of the town", "a camel for the journey"];
    expect(shown("Anas served the Prophet ﷺ only at home.", serving)).toEqual([serving.map(() => 0), serving.map(() => 1)]);
    const years = Array.from({ length: 10 }, (_, i) => `a year of serving him, a small sun ${i + 1}`);
    const long = "How long did Anas serve the Prophet ﷺ?";
    expect([shown(long, years), moved(long, "the little one's place, brought to serve", "scale")]).toEqual([[years.map(() => 0), years.map(() => 1)], [1, 1.6]]);
    expect(shown("What did the Prophet ﷺ never say to him?", ["his voice, only gentle", "a warm glow on the one who served"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const gentle = ["his voice, only gentle", "a warm glow on the one who served", "a soft light over the years"];
    for (const prompt of ["What can we learn for those who help us?", "The Prophet ﷺ was kind to those who served him."]) {
      expect([prompt, shown(prompt, gentle)]).toEqual([prompt, [gentle.map(() => 0), gentle.map(() => 1)]]);
    }
    // Greeting first. How long: no night has gone by yet; then three nights go by, each counted. The better one: the
    // grey shade between them, cut off; then the salam comes first, a golden voice, with a warm glow on the one who
    // began, the other answers it, and the grey lifts.
    const nights = ["a night gone by, counted 1", "a night gone by, counted 2", "a night gone by, counted 3"];
    for (const prompt of ["How long at most can you stay cut off from a Muslim?", "How long at most may Muslims stop talking?"]) {
      expect([prompt, shown(prompt, nights)]).toEqual([prompt, [nights.map(() => 0), nights.map(() => 1)]]);
    }
    const first = ["the salam, first: a golden voice", "the better of the two: a warm glow on the one who began", "the other answering the salam", "a grey shade between them: cut off"];
    for (const prompt of ["Who is the better of the two?", "Two friends quarrel. Who is the better one?", "Saying salam first is a good deed.", "Saying salam first after a fight is a sign of weakness."]) {
      expect([prompt, shown(prompt, first)]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 0]
        ]
      ]);
    }
  });

  it("waits on the scenes of counsel he gave, from the farewell sermon to mercy on Musa, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-farewell-sermon", "sign-recite-to-me", "sign-richness-of-the-soul", "sign-the-neighbor", "sign-closest-in-sujud", "sign-accepts-only-good", "sign-mercy-on-musa"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(35);
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
    // The farewell sermon. What he warned of: the home in trust, no light on it yet; then a soft light on it. What
    // they testified: his voice asks what they will say; then their voices bear witness, and a warm light comes over
    // all the plain.
    expect(shown("In his Farewell Sermon, what did the Prophet ﷺ warn men about?", ["a home in trust: a soft light on it"])).toEqual([[0], [1]]);
    expect(shown("What did the Companions testify, in Muslim 1218?", ["his voice, asking: what will you say?", "their voices: we bear witness", "a warm light over all the plain"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Recite to me. Why he asked: the voice of the one asked, shall I recite to you; then his voice, I love to hear it
    // from another, and a warm glow of listening on his place. Which surah: no recitation yet; then a voice recites,
    // and the long band of an-Nisa begins to fill. Where he said stop: the voice recites, the band short of its
    // forty-first ayah; then the band fills to its mark, the voice stops and his voice says stop. His tears: none yet;
    // then tears by his place, and a soft light over them both.
    const why = ["the voice of the one asked: shall I recite to you?", "his voice: I love to hear it from another", "listening: a warm glow on his place"];
    for (const prompt of ["Why did the Prophet ﷺ ask Ibn Mas'ud to recite?", "Why did the Prophet ﷺ want to hear it from him?", "Why did the Prophet ﷺ like to hear the Quran from others?"]) {
      expect([prompt, shown(prompt, why)]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ]
      ]);
    }
    const band = "recited so far: the band filling";
    for (const prompt of ["Which surah did Ibn Mas'ud recite?", "Which surah did Ibn Mas'ud recite to the Prophet ﷺ?"]) {
      expect([prompt, shown(prompt, ["his voice: I love to hear it from another", "the recitation: a voice", "an-Nisa: a long band of its ayat"]), moved(prompt, band, "scaleX")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ],
        [0.01, 0.14]
      ]);
    }
    const mark = "its forty-first ayah: a soft mark on the band";
    const stop = "At which ayah did he say 'Enough'?";
    expect([shown(stop, [mark, "his voice: stop", "the recitation: a voice"]), moved(stop, band, "scaleX")]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 0]
      ],
      [0.14, 0.233]
    ]);
    const tears = ["tears by his place", "a soft light over them both"];
    expect(shown("The Prophet ﷺ wept when Ibn Mas'ud reached 4:41.", [...tears, mark])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(shown("What happened to the Prophet ﷺ at ayah 41?", [...tears, "his voice: stop"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // The richness of the soul. What it is not: nothing yet by the great home; then sacks, camels and coins by it, and
    // still a grey hollow of not enough on its place, crooked ways going out and a crooked voice: more. What it is: no
    // glow yet on the small home; then a warm full glow on its place, a soft light rising and staying, and a warm light
    // over the small home.
    const many = [
      "possessions: sacks by the great home",
      "possessions: camels",
      "possessions: coins",
      "possessions: more sacks",
      "still not enough: a grey hollow on its place",
      "seeking more: crooked ways going out",
      "a crooked voice: more"
    ];
    for (const prompt of ["What is wealth NOT, per the hadith?", "What is wealth not about?"]) {
      expect([prompt, shown(prompt, many)]).toEqual([prompt, [many.map(() => 0), many.map(() => 1)]]);
    }
    const content = "content: a soft light, rising and staying";
    const soul = ["rich in the soul: a warm full glow on it", content, "a warm light over the small home"];
    for (const prompt of ["What is true wealth, per the hadith?", "What is real wealth, per the hadith?", "A person with little can still be rich at heart.", "A poor person can be rich in his heart."]) {
      expect([prompt, shown(prompt, soul), moved(prompt, content, "y")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, -14]
      ]);
    }
    // The neighbor. Who advised him: no voice yet; then a white voice, advising again and again, counted four times.
    // About whom: no way yet between the two homes; then a golden way, a dish carried over to the home next door, and a
    // warm glow on it. As if an heir: the white voice still advising; then it stops, a faint share goes over as if he
    // would inherit, and a soft ring comes about both homes as if one family.
    expect(shown("Who kept advising the Prophet ﷺ about neighbors?", ["the advice, again and again: a white voice", "advised again, counted 1", "advised again, counted 4"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    for (const prompt of ["What did Jibril keep telling the Prophet ﷺ about?", "In Islam, you should be kind to your neighbors."]) {
      expect([prompt, shown(prompt, ["a golden way between the two homes", "a warm glow on the home next door"]), moved(prompt, "kindness to the home next door: a dish carried over", "x")]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, 32]
      ]);
    }
    const share = "as if he would inherit: a faint share";
    for (const prompt of ["The Prophet ﷺ thought neighbors might even do what?", "What did the Prophet ﷺ think Jibril would do?"]) {
      expect([prompt, shown(prompt, ["the advice, again and again: a white voice", share, "as if one family: a soft ring about both homes"]), moved(prompt, share, "x")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ],
        [0, 26]
      ]);
    }
    // Closest in sujud. When: the place stands at prayer, a soft light near it; then it bows down in sujud, and the
    // light of nearness grows about it. What to do then: no glow yet on the mat; then a warm glow of much du'a on it,
    // and its du'a rising.
    for (const prompt of ["When is a servant closest to his Lord?", "When is a servant nearest to Allah?"]) {
      const place = "the place at prayer";
      const near = "near: a soft light about the place";
      expect([prompt, moved(prompt, place, "y"), moved(prompt, place, "scaleY"), shown(prompt, [near]), moved(prompt, near, "scale")]).toEqual([prompt, [0, 5.6], [1, 0.7], [[0.6], [1]], [1, 1.25]]);
    }
    const dua = ["much du'a: a warm glow on the mat", "its du'a, rising 1", "its du'a, rising 6"];
    for (const [prompt, answer] of [
      ["What should we do much of in sujud?", "Du'a"],
      ["What should we do much of in sujud?", "Make dua"],
      ["Sujud is a time to ask Allah for what you need.", "True"]
    ]) {
      expect([prompt, answer, shown(prompt, dua, answer)]).toEqual([
        prompt,
        answer,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // Allah accepts only what is good. What He accepts: nothing yet; then a warm glow on the good, and its good rises
    // and stays. Why the traveller was not answered: its voice asking, O Lord, O Lord, nothing grey on it yet; then its
    // food, its drink and its clothes unlawful, grey, and a grey shade on its place, fed on the unlawful.
    const accepted = "accepted: its good, rising and staying";
    expect([shown("What does Allah accept, in the hadith?", ["good: a warm glow on it", accepted]), moved("What does Allah accept, in the hadith?", accepted, "y")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -30]
    ]);
    const unlawful = ["its food, unlawful: a grey dish", "its drink, unlawful: a grey cup", "its clothes, unlawful: grey cloth", "fed on the unlawful: a grey shade on its place"];
    for (const prompt of ["Why was the traveller's dua not answered?", "What can stop a dua being answered, in Muslim 1015?"]) {
      expect([prompt, shown(prompt, unlawful)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Mercy on Musa. Whom he remembered: a red glow of anger on his place; then it goes, his voice says may mercy be on
    // him, and far off, long ago, a place by the sea comes in a soft circle of light, a warm glow of mercy on it. Harmed
    // with more: no crooked voices about it yet; then crooked voices about it. And he was patient: the crooked voices
    // stay, and a steady light stays on it.
    const remember = ["angry: a red glow on his place", "his voice: may mercy be on him", "a place far off, long ago, by the sea", "mercy on it: a warm glow"];
    const patient = "patient: a steady light stays on it";
    expect(shown("Whom did the Prophet ﷺ remember when hurt?", remember)).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    expect(shown("What did the Prophet ﷺ remember when he was hurt by words?", [...remember, patient])).toEqual([
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1]
    ]);
    const harmed = ["harmed with more: a crooked voice about it 1", "harmed with more: a crooked voice about it 4", patient];
    expect(shown("Musa was harmed even more than this.", harmed)).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    expect(shown("Musa was hurt by his own people and kept patient.", harmed)).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    for (const prompt of ["What did Musa do when harmed, in the hadith?", "What did Musa do when harmed, per the hadith?"]) {
      expect([prompt, shown(prompt, ["harmed with more: a crooked voice about it 4", patient])]).toEqual([
        prompt,
        [
          [1, 0],
          [1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of ways he taught, from setting out on a journey to praying as he prayed, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-setting-out", "sign-for-his-brother", "sign-eight-gates", "sign-house-for-twelve", "sign-ready-for-friday", "sign-right-on-servants", "sign-pray-as-you-saw"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(34);
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
    // Setting out on a journey. What he said three times, and how many: no takbir yet; then three sparks of it rise. What
    // the du'a thanks Him for making serve us: the camel, with no glow yet; then his voice says glory to Him who made
    // this serve us, and a warm glow comes on the camel.
    const takbir = ["the takbir, rising 1", "the takbir, rising 2", "the takbir, rising 3"];
    for (const prompt of ["What did he ﷺ say three times before the travel dua?", "How many times did he say Allahu Akbar first, per Muslim 1342?"]) {
      expect([prompt, shown(prompt, takbir)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    expect(shown("The travel dua thanks Allah for making what serve us?", ["his voice: glory to Him who made this serve us", "made to serve us: a warm glow on the camel", ...takbir])).toEqual([
      [0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]);
    // For his brother. What to wish for him: a golden way goes to the other home and a soft glow is on it, while its
    // own faith is a faint light; then the same good food comes at the other home with a warm glow, its faith grows
    // full, and a soft ring of light comes about both homes. Whether faith is wishing good only for yourself, and when
    // it is complete: no way to the other home yet, and its faith faint; then all of that.
    const faith = "its faith: a light on its place, faint, then full";
    const same = ["the same good at the other home: good food", "a warm glow on that good food", "a soft ring of light about both homes"];
    expect([shown("What should you wish for your brother?", [faith, "a soft glow on the other home", ...same]), moved("What should you wish for your brother?", faith, "scale")]).toEqual([
      [
        [0.45, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [1, 1.5]
    ]);
    for (const prompt of ["True faith means wanting good things only for yourself.", "When is a person's faith complete, in this hadith?", "Wanting good only for yourself is complete faith."]) {
      expect([prompt, shown(prompt, [faith, "wishing for the other: a golden way between the homes", "a soft glow on the other home", ...same])]).toEqual([
        prompt,
        [
          [0.45, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    // The eight gates. What comes first: no water yet; then water is poured from the jug, drops shine about its place
    // and a soft light comes on it. What to say after wudu: the water still pouring, no witness yet; then the water
    // stops and the two sparks of its witness rise. How many gates open, and what opens: nothing far off yet; then a
    // far circle of light, with no sun in it, and eight gates open in it. Which gate it may enter: the gates open, and
    // no place at any; then its place at the gate it wishes, with a warm glow.
    const wudu = ["wudu: water poured from the jug", "done well: drops of water shining about its place", "done well: a soft light on its place"];
    const witness = ["its witness, rising: no god but Him", "its witness, rising: Muhammad, His slave"];
    expect(shown("What comes first, in the hadith?", wudu)).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect([shown("What should you say after finishing wudu?", [...witness, wudu[0]]), moved("What should you say after finishing wudu?", witness[1], "y")]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 0]
      ],
      [0, -22]
    ]);
    const gates = ["far off: a soft circle of light, with no sun in it", ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `a gate of Paradise, opened ${n}`)];
    for (const prompt of ["How many gates of Paradise open for him?", "What opens for him, in the hadith?"]) {
      expect([prompt, shown(prompt, gates)]).toEqual([prompt, [Array(9).fill(0), Array(9).fill(1)]]);
    }
    expect(shown("Which gate may he enter, in the hadith?", ["at the gate it wishes: its place", "at the gate it wishes: a warm glow", ...gates])).toEqual([
      [0, 0, ...Array(9).fill(1)],
      Array(11).fill(1)
    ]);
    // A house for twelve. How many rak'ahs: none counted yet; then twelve small lights come about the mat. What they
    // bring: nothing far off yet; then a far circle of light with a garden in it, and a house rises there, its top
    // golden, with a warm glow. What Umm Habibah did: no voice yet; then her voice says she never left them, a warm glow
    // comes on the mat, and three more glows come for those who heard it after her and kept them too.
    const rakahs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => `twelve rak'ahs, counted ${n}`);
    expect(shown("How many voluntary rak'ahs a day earn a house in Paradise?", rakahs)).toEqual([Array(12).fill(0), Array(12).fill(1)]);
    const house = ["far off: a soft circle of light, with no sun in it", "a garden in it", "a house built for it, rising", "its top, golden", "a warm glow on the house"];
    expect([shown("Twelve extra rak'ahs a day bring what?", [...house, ...rakahs]), moved("Twelve extra rak'ahs a day bring what?", "a house built for it, rising", "scaleY")]).toEqual([
      [
        [0, 0, 0, 0, 0, ...Array(12).fill(1)],
        Array(17).fill(1)
      ],
      [0.05, 1]
    ]);
    const kept = ["her voice: I never left them", "kept: a warm glow on the mat", ...[1, 2, 3].map((n) => `kept by those who heard it after: a warm glow ${n}`)];
    for (const answer of ["Never left them", "Never stopped praying them"]) {
      expect([answer, shown("What did Umm Habibah do after hearing it?", kept, answer)]).toEqual([answer, [Array(5).fill(0), Array(5).fill(1)]]);
    }
    // Ready for Friday. What to do before it: nothing about its place yet; then drops of water about it and a soft white
    // light on it, a small flask by the home, and soft curls of scent rising about it. What not to do to those sitting:
    // it still stands by its home, its way not yet shown; then it goes along its way to the masjid, past the two who sit
    // together, and sits beyond them, not parting them. What to do in the khutbah: no voice at the pulpit yet; then the
    // voice speaks, and a calm light comes on its place. What is forgiven: no marks yet; then two golden marks show this
    // Friday and the other, the grey band between them shrinks and goes, and a warm light comes on its place.
    const ready = ["bathed: drops of water about its place", "clean: a soft white light on its place", "its oil and scent: a small flask by the home", "the scent about its place: soft curls rising"];
    expect(shown("What should you do before Jumu'ah?", ready)).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    for (const prompt of ["What must you not do in the masjid?", "What should one not do to people sitting?"]) {
      expect([prompt, shown(prompt, ["its way to the masjid, behind them"]), moved(prompt, "a place, by its home", "x")]).toEqual([prompt, [[0], [1]], [0, 74]]);
    }
    expect(shown("What should one do during the khutbah?", ["the voice of the one who speaks, at the pulpit", "quiet, listening: a calm light on its place"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const forgiven = "What is forgiven for doing it all?";
    const band = "what is between them: a grey band, forgiven";
    expect([shown(forgiven, ["this Friday and the other: two golden marks", "a warm light on its place", band]), moved(forgiven, band, "scaleX")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [1, 0.1]
    ]);
    // Allah's right on His servants. Where Mu'adh was: nothing on the road yet; then the donkey 'Ufayr walks in with his
    // place, a golden ring, and the place of the one behind him. What Allah's right is, and whether worshipping idols
    // beside Him is allowed: the other voice saying they know best; then his voice tells the right on them, three warm
    // glows come at the homes, and sparks of worship rise. What the servants' right on Allah is: no shelter yet; then a
    // soft shelter of light over them.
    const riding = ["the donkey 'Ufayr, walking", "a golden ring, his place", "the place of the one behind him"];
    expect([shown("Where was Mu'adh when he was asked?", riding), moved("Where was Mu'adh when he was asked?", "the place of the one behind him", "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [-40, 0]
    ]);
    const right = [
      "the voice of the one behind him: they know best",
      "his voice: the right on them",
      ...[1, 2, 3].map((n) => `worshipping Him alone: a warm glow at the home ${n}`),
      ...[1, 2, 3].map((n) => `worshipping Him alone: a spark rising ${n}`)
    ];
    for (const [prompt, answer] of [
      ["What is Allah's right on His servants?", "Worship Him, join no partner"],
      ["What is Allah's right on His servants?", "To worship Him alone"],
      ["What is Allah's right on His servants, in Bukhari 2856?", undefined],
      ["What is Allah's right on His servants, per Bukhari 2856?", undefined],
      ["Worshipping idols beside Allah is allowed.", undefined]
    ] as [string, string | undefined][]) {
      expect([prompt, answer, shown(prompt, right, answer)]).toEqual([prompt, answer, [[1, ...Array(7).fill(0)], [0, ...Array(7).fill(1)]]]);
    }
    for (const prompt of ["What is the servants' right on Allah, as promised?", "What is the servant's right on Allah, per Bukhari 2856?"]) {
      expect([prompt, shown(prompt, ["not punished: a soft shelter of light over them", "his voice: the right on them"])]).toEqual([
        prompt,
        [
          [0, 1],
          [1, 1]
        ]
      ]);
    }
    // Pray as you have seen me pray. How long they stayed: no days counted yet; then twenty days and nights, counted in
    // four rows of five. How to pray, and whose prayer is the model: no glow by the mat yet; then a warm glow by it,
    // for praying as they saw. Who should lead: the eldest among them, and no adhan yet; then the adhan is a voice from
    // one of them, and the eldest goes in front, with a golden glow.
    expect(shown("How long did the young men stay to learn?", ["twenty days and nights, counted 1 to 5", "twenty days and nights, counted 6 to 10", "twenty days and nights, counted 11 to 15", "twenty days and nights, counted 16 to 20"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    for (const prompt of ["Whose prayer is the model for every Muslim?", "How should a Muslim pray?", "The Prophet ﷺ said: pray as you have seen me praying."]) {
      expect([prompt, shown(prompt, ["praying as they saw: a warm glow by the mat", "his voice: go back, teach them, pray as you saw"])]).toEqual([
        prompt,
        [
          [0, 1],
          [1, 1]
        ]
      ]);
    }
    const lead = "Who did he say should lead their prayer?";
    expect([shown(lead, ["the adhan: a voice from one of them", "the eldest, in front: a golden glow"]), moved(lead, "the place of the eldest of them", "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [62, 77]
    ]);
  });

  it("waits on the scenes of what he taught of the heart and the Quran, from gentleness to the young Ibn Abbas, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-gentleness", "sign-looks-at-hearts", "sign-best-forgiveness", "sign-ten-blessings", "sign-friday-fajr", "sign-learn-from-four", "sign-young-ibn-abbas"];
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
    // Gentleness. What Allah loves: no way to the water yet; then a soft golden way to it, and a soft light over it.
    // What gentleness gets that harshness does not, and whether He gives more for it: nothing given yet; then the
    // gentle one walks ahead with its camel to the water, a warm glow and three small lights come on them, while the
    // harsh one's voice is grey and jagged, its camel turns from it and goes off, and a grey shade is over them.
    // Whether being gentle is a weakness: none of that yet; then the way, the light over it, and all that is given.
    const loved = ["the gentle way: a soft golden way to the water", "loved: a soft light over the gentle way"];
    const given = ["given for gentleness: a warm glow on them", ...[1, 2, 3].map((n) => `given for gentleness: a small light ${n}`)];
    for (const prompt of ["What does Allah love, says this hadith?", "What does Allah love?"]) {
      expect([prompt, shown(prompt, loved)]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    for (const prompt of ["What does gentleness get that harshness doesn't?", "Allah gives more for kindness than for harshness."]) {
      expect([
        prompt,
        shown(prompt, [...given, "its voice, harsh: grey, jagged marks", "for harshness: a grey shade over them"]),
        moved(prompt, "the gentle one's place, walking ahead", "x"),
        moved(prompt, "its camel, turning from it and going off", "scaleX")
      ]).toEqual([prompt, [Array(6).fill(0), Array(6).fill(1)], [0, 64], [1, -1]]);
    }
    expect([shown("Being gentle is a weakness.", [...loved, ...given]), moved("Being gentle is a weakness.", "the gentle one's place, walking ahead", "x")]).toEqual([
      [Array(6).fill(0), Array(6).fill(1)],
      [0, 64]
    ]);
    // He looks at hearts. What He looks at: no light in any of the four yet; then a light in the middle of each, its
    // heart. Where he pointed: no light in the middle of his place yet; then a soft one there. Whether He judges us by
    // how we look: each one's ring of how big it looks and its fine colors still bright, and no heart lit; then they
    // fade and the hearts light.
    const hearts = [1, 2, 3, 4].map((n) => `its heart: a light in its middle ${n}`);
    for (const [prompt, answer] of [
      ["What does Allah look at, per the hadith?", "Our hearts"],
      ["What does Allah look at, per Muslim 2564?", "Our hearts"],
      ["What does Allah look to?", undefined]
    ] as [string, string | undefined][]) {
      expect([prompt, shown(prompt, hearts, answer)]).toEqual([prompt, [Array(4).fill(0), Array(4).fill(1)]]);
    }
    for (const prompt of ["Where did the Prophet ﷺ point when speaking of piety?", "Where did he ﷺ point when speaking of piety?", "Where did the Prophet ﷺ point?"]) {
      expect([prompt, shown(prompt, ["pointed to: a soft light in the middle of his place"])]).toEqual([prompt, [[0], [1]]]);
    }
    for (const prompt of ["Allah judges us by how we look.", "Allah judges us by our looks."]) {
      expect([prompt, shown(prompt, ["how big it looks: a ring on the ground 1", "how it looks: fine colors about it 1", hearts[0]])]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [0.2, 0.12, 1]
        ]
      ]);
    }
    // The best way to ask forgiveness. What he called it: no voice yet; then his voice. How it begins: its own voice
    // not yet saying it; then it says it, and its words rise: You are my Lord. Whether you admit your sins in it: no
    // glow of His favor and no mark of its sin yet; then both. How it must be said: no ring about its place yet, the
    // sun still high; then a steady ring of light, being sure of it, and the sun goes on toward evening. Where one is
    // who says it and dies before evening: no evening sky and nothing far off yet; then a warm evening sky, and far off
    // a soft circle of light, with no sun in it, a garden in it, and a warm glow on its place.
    expect(shown("What did the Prophet ﷺ call this dua?", ["his voice: the best way to ask forgiveness"])).toEqual([[0], [1]]);
    const begins = "How does Sayyid al-Istighfar begin?";
    expect([shown(begins, ["its voice, saying it", "its words, rising: You are my Lord"]), moved(begins, "its words, rising: You are my Lord", "y")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -16]
    ]);
    expect(shown("In this dua you admit your sins to Allah.", ["His favor on it: a warm glow about its place", "its sin, admitted: a grey mark by it, then forgiven"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    const sure = "How must it be said to earn the reward?";
    expect([shown(sure, ["sure of it: a steady ring of light about its place"]), moved(sure, "the sun, going on toward evening", "x")]).toEqual([[[0], [1]], [0, 106]]);
    const paradise = ["evening coming: a warm sky", "far off: a soft circle of light, with no sun in it", "a garden in it", "of Paradise: a warm glow on its place"];
    for (const prompt of ["Someone says it in the day with firm faith and dies before evening. Where are they?", "What is promised to one who says it with faith and dies that day?"]) {
      expect([prompt, shown(prompt, paradise)]).toEqual([prompt, [Array(4).fill(0), Array(4).fill(1)]]);
    }
    // Ten blessings for one. How many He sends, and whether sending them brings blessings back: the one small mark of
    // sending once, and none of the ten yet; then ten soft lights come about its place, ten small marks count them, and
    // a warm glow comes on it.
    const ten = [...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `ten blessings on it: a soft light ${n}`), ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `ten times: a small mark ${n}`), "a warm glow on its place"];
    for (const prompt of [
      "Send one salawat on the Prophet ﷺ. How many blessings does Allah send you?",
      "How many blessings for one Salah, in the hadith?",
      "How many blessings does Allah send for one?",
      "Sending blessings on the Prophet ﷺ brings blessings back to you."
    ]) {
      expect([prompt, shown(prompt, ["once: one small mark", ...ten])]).toEqual([prompt, [[1, ...Array(21).fill(0)], Array(22).fill(1)]]);
    }
    // The Friday Fajr. In which prayer: no true dawn along the far side yet, no golden light over the masjid, and no
    // rows; then all three, the rows coming to stand behind him. Which surah he recited with al-Insan: no voice and no
    // band yet; then his voice recites and the first golden band fills, for as-Sajdah. Which came with as-Sajdah: only
    // its band; then a second golden band fills, for al-Insan.
    for (const prompt of ["In which prayer did he recite it, in the hadith?", "In which prayer did he recite Al-Insan?"]) {
      expect([
        prompt,
        shown(prompt, ["the true dawn: white along the far side", "Friday: a soft golden light over the masjid", "the rows, coming to stand behind him"]),
        moved(prompt, "the rows, coming to stand behind him", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [-16, 0]
      ]);
    }
    const sajdah = "as-Sajdah: a golden band on the wall, filling";
    const insan = "al-Insan: a second golden band, filling";
    expect([shown("Which surah did he recite with it?", ["his voice, reciting", sajdah, insan]), moved("Which surah did he recite with it?", sajdah, "scaleX")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0.05, 1]
    ]);
    expect([shown("Which surah came with it, in the hadith?", [sajdah, insan]), moved("Which surah came with it, in the hadith?", insan, "scaleX")]).toEqual([
      [
        [1, 0],
        [1, 1]
      ],
      [0.05, 1]
    ]);
    // Learn the Quran from four. How many he named: only the first place, faint; then his voice says learn from four,
    // and three more places come, faint. Who was named first, and whether he chose Ibn Mas'ud: the first place faint,
    // nothing over it; then it comes full, with a golden spark over it, as he began with him, its voice recites, a soft
    // light comes on it, and places come to sit and learn from it, while the second is not yet lit. Which of these was
    // also one of the four, and whether he trusted Mu'adh: the fourth place faint and unlit, the second already lit;
    // then the fourth comes full, lit, reciting, with places to learn from it. Who was not one of the four: the four
    // faint and unlit; then each of the four comes full and lit, and only those four.
    const place = (n: string) => `the ${n} of the four, its place`;
    const lit = (n: string) => `the ${n} of the four, lit: a soft light`;
    for (const prompt of ["How many teachers of the Quran did the Prophet ﷺ name?", "How many people did the Prophet ﷺ name to learn the Quran from?"]) {
      expect([prompt, shown(prompt, ["his voice: learn from four", ...["first", "second", "third", "fourth"].map(place)])]).toEqual([
        prompt,
        [
          [0, 0.5, 0, 0, 0],
          [1, 0.5, 0.5, 0.5, 0.5]
        ]
      ]);
    }
    for (const prompt of ["Who was named first of the four to learn the Quran from?", "Whose name came first among the four Quran teachers?", "The Prophet ﷺ chose Ibn Mas'ud as a teacher of the Quran."]) {
      expect([
        prompt,
        shown(prompt, [place("first"), "he began with him: a golden spark over the first", "the first of the four, reciting: a voice", lit("first"), "learning from the first: places coming to sit", lit("second")])
      ]).toEqual([
        prompt,
        [
          [0.5, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0]
        ]
      ]);
    }
    for (const prompt of ["Which of these was also one of the four?", "The Prophet ﷺ trusted Mu'adh to teach the Quran."]) {
      expect([prompt, shown(prompt, [place("fourth"), lit("fourth"), "the fourth of the four, reciting: a voice", "learning from the fourth: places coming to sit", lit("second")])]).toEqual([
        prompt,
        [
          [0.5, 0, 0, 0, 1],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["Who was NOT one of the four?", "Which of these was NOT one of the four?"]) {
      expect([prompt, shown(prompt, [...["first", "second", "third", "fourth"].map(place), ...["first", "second", "third", "fourth"].map(lit)])]).toEqual([
        prompt,
        [
          [0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0],
          Array(8).fill(1)
        ]
      ]);
    }
    // The young Ibn Abbas. Whom Umar seated him with: he is not yet among the elders of Badr; then he is brought in.
    // Which surah Umar asked about: some of them still saying why this one, in grey; then those voices go and Umar's
    // voice asks them. What Ibn Abbas said it was telling: his voice not yet heard, the day still bright, and those who
    // kept quiet faint; then his voice, a warm evening sky for his life's end, and those who kept quiet come back. Why
    // Umar seated him, and whether Umar agreed or not: no evening sky and no word from Umar yet; then Umar's voice says
    // he knows of it only what he said, and a warm glow comes on the young one's place.
    const brought = "Whom did Umar seat Ibn Abbas with?";
    expect([shown(brought, ["the young one's place, brought in"]), moved(brought, "the young one's place, brought in", "x")]).toEqual([[[0], [1]], [-70, 0]]);
    for (const prompt of ["Which surah did Umar ask the elders about?", "Which surah did Umar ask them about?"]) {
      expect([prompt, shown(prompt, ["some of them: why this one? a grey voice 1", "some of them: why this one? a grey voice 2", "Umar's voice, asking them"])]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [0, 0, 1]
        ]
      ]);
    }
    for (const prompt of ["What did Ibn Abbas say the surah was telling?", "What did Ibn Abbas say the surah signaled?"]) {
      expect([
        prompt,
        shown(prompt, ["the young one's voice", "toward evening: a warm sky", "the place of an elder of Badr 1, keeping quiet"]),
        moved(prompt, "the sun, going on toward evening", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0.5],
          [1, 1, 1]
        ],
        [0, 32]
      ]);
    }
    const umar = ["Umar's voice: I know only what you say", "a warm glow on the young one's place"];
    for (const prompt of ["Why did Umar seat young Ibn Abbas with the elders?", "Why did Umar seat young Ibn Abbas with the elders of Badr?"]) {
      expect([prompt, shown(prompt, ["toward evening: a warm sky", ...umar])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    for (const prompt of ["Umar agreed with Ibn Abbas's meaning of the surah.", "Umar disagreed with Ibn Abbas."]) {
      expect([prompt, shown(prompt, ["the young one's voice", ...umar])]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of days with him, from go back and pray to the red camels, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-go-back-and-pray", "sign-ansar-at-hunayn", "sign-the-sneeze", "sign-visitors-of-mudar", "sign-steps-in-paradise", "sign-madinah-rejoiced", "sign-red-camels"];
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
    // Go back and pray. How many times it was sent back: its salam's golden way still shows, and no grey mark yet; then
    // the way is gone, three grey marks turn back, and its voice asks: teach me.
    const sentBack = [1, 2, 3].map((n) => `sent back: a grey mark turning back ${n}`);
    expect(shown("How many times was the man sent back?", ["its salam to him: a golden way to his place", ...sentBack, "its voice: teach me"])).toEqual([
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1]
    ]);
    // What is wrong with bowing and standing up in one second: no calm light yet; then the place bows and stays, at
    // rest, with a calm light. What word sums up how to pray: none of the calm lights yet; then one for each rest, and a
    // warm glow on the mat.
    const prayer = "the place of the one who came in and prayed";
    const rests = ["at rest bowing: a calm light", "standing up straight: a calm light", "at rest in prostration: a calm light", "sitting at rest: a calm light"];
    const bowing = "Example: you bow and stand up in one second. What's wrong?";
    expect([shown(bowing, [rests[0]]), moved(bowing, prayer, "y")]).toEqual([[[0], [1]], [0, 1.2]]);
    expect(shown("What word sums up how to pray?", [...rests, "prayed well: a warm glow on the mat"])).toEqual([Array(5).fill(0), Array(5).fill(1)]);
    // Which comes first: it is at rest bowing, with its light, and nothing after that yet; then it stands up straight,
    // then prostrates and sits, each with its light. Sitting between the two sujud: no light of prostration or of
    // sitting yet; then both.
    expect(shown("Which comes first?", rests)).toEqual([
      [1, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    expect(shown("Between the two sujud, we ____ for a calm moment.", rests)).toEqual([
      [1, 1, 0, 0],
      [1, 1, 1, 1]
    ]);
    // The Ansar at Hunayn. The three favors: the grey shade still over them, his voice not heard yet, and no light in
    // any place; then his voice, a light in each place, the places come close in a ring of care, and a warm glow and
    // four small lights come on them, while the shade goes.
    const guided = [1, 2, 3, 4, 5, 6].map((n) => `guided: a light in a place of the Ansar ${n}`);
    const rich = ["made rich: a warm glow on them", ...[1, 2, 3, 4].map((n) => `made rich: a small light ${n}`)];
    const shade = "the Ansar, feeling it: a grey shade over them";
    expect(shown("What three favors did he ﷺ mention, per Bukhari 4330?", [shade, "his voice, reminding them", ...guided, "joined together: a ring of care about them", ...rich])).toEqual([
      [1, 0, ...Array(12).fill(0)],
      [0, 1, ...Array(12).fill(1)]
    ]);
    // How they were before: their places still apart, with no ring; then they come close, in a ring of care. That He
    // also made them rich: no warm glow and no small light yet; then they come, and the last of the shade goes.
    const before = "How were the Ansar before, in the hadith?";
    expect([shown(before, ["joined together: a ring of care about them"]), moved(before, "the place of one of the Ansar 3", "x")]).toEqual([[[0], [1]], [0, -21]]);
    expect(shown("The Prophet ﷺ also said Allah made them rich through him.", [shade, ...rich])).toEqual([
      [0.3, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1]
    ]);
    // How they answered: his voice still speaking, and none of theirs; then three voices: more favor.
    const favor = [1, 2, 3].map((n) => `their voices: more favor ${n}`);
    expect(shown("How did the Ansar reply, per Bukhari 4330?", ["his voice, reminding them", ...favor])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // The sneeze. What the one who sneezes says: no voice yet and the puff small; then a puff of air, a spark rising for
    // its praise, and its voice, praising.
    for (const prompt of ["After sneezing, what should a Muslim say first?", "What does the one who sneezes say?", "You sneeze. What do you say?"]) {
      expect([prompt, shown(prompt, ["its voice, praising"]), moved(prompt, "a sneeze: a small puff of air", "scale"), moved(prompt, "its praise: a spark rising", "y")]).toEqual([
        prompt,
        [[0], [1]],
        [0.5, 1.3],
        [0, -13]
      ]);
    }
    // What is said back: its voice still praising, and none from the other; then the other's voice wishes it mercy,
    // and a soft light comes about the first place.
    for (const prompt of [
      "If someone says Alhamdulillah after sneezing, another Muslim can reply with mercy.",
      "What is a proper reply to someone's Alhamdulillah after a sneeze?",
      "What do you say to someone who sneezed and praised Allah?",
      "Your friend sneezes and says Alhamdulillah. What do you say?"
    ]) {
      expect([prompt, shown(prompt, ["its voice, praising", "the other's voice, wishing it mercy", "mercy: a soft light about the first place"])]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ]
      ]);
    }
    // What the sneezer says back: the other's voice wishing it mercy, and no answer yet; then its voice answers with
    // guidance, a light comes about the other place, and a warm glow on both.
    for (const prompt of ["What does the sneezer say back?", "The sneezer answers: Yahdikumullahu wa yuslihu balakum."]) {
      expect([
        prompt,
        shown(prompt, ["the other's voice, wishing it mercy", "its voice, answering: guidance", "guidance: a light about the other place", "their affairs set right: a warm glow on both"])
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    // The visitors of Mudar. Which tribe: no one has come yet; then the places of the visitors of Mudar come in,
    // barefoot, with a grey shade of need over them. Whether his face changed: no shade on his place yet; then one.
    const visitors = "the places of the visitors of Mudar, barefoot";
    expect([shown("Which tribe were the poor visitors from?", [visitors, "their need: a grey shade over them"]), moved("Which tribe were the poor visitors from?", visitors, "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [40, 0]
    ]);
    expect(shown("His face changed when he saw their poverty.", ["seeing their need: a grey shade on his place"])).toEqual([[0], [1]]);
    // What they did after he recited: nothing given yet; then a dinar, a dirham, cloth, wheat and dates, one by one.
    // The smallest gift, and whether small charity is still valued: no half date yet; then half a date, with a soft
    // light about it.
    const gifts = ["given: a dinar: a gold coin", "given: a dirham: a silver coin", "given: cloth", "given: a sa' of wheat in a sack", "given: a sa' of dates in a basket"];
    expect(shown("What did people start doing after he recited?", gifts)).toEqual([Array(5).fill(0), Array(5).fill(1)]);
    for (const prompt of ["What was the smallest gift he mentioned?", "Small charity is still valued."]) {
      expect([prompt, shown(prompt, ["even half a date", "even half a date: a soft light about it", ...gifts])]).toEqual([
        prompt,
        [
          [0, 0, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    // Steps in Paradise. When he asked: his voice not heard yet; then, at dawn, it asks. What he heard in Paradise: no
    // far light of Paradise and no steps yet; then the soft circle of light, four steps in it and their soft rings.
    expect(shown("When did the Prophet ﷺ ask Bilal about this?", ["his voice: tell me"])).toEqual([[0], [1]]);
    const steps = [1, 2, 3, 4].flatMap((n) => [`steps ahead in it ${n}`, `the sound of the steps: a soft ring ${n}`]);
    expect(shown("What did the Prophet ﷺ hear in Paradise?", ["Paradise far off: a soft circle of light", ...steps])).toEqual([Array(9).fill(0), Array(9).fill(1)]);
    // Which deed, and whether a small habit done always can be very great: no jug, no water, no moon or sun, and no
    // glow on the mat yet; then water pours for wudu, by night or by day, Bilal's place goes to the mat, a spark rises
    // for its prayer, and a warm glow comes on the mat.
    for (const prompt of ["Which deed did Bilal say he did?", "A small habit, done always, can be very great."]) {
      expect([
        prompt,
        shown(prompt, ["wudu: a jug of water", "wudu: water pouring", "by night: a small moon", "or by day: a small sun", "a warm glow on the mat"]),
        moved(prompt, "Bilal's place", "x"),
        moved(prompt, "its prayer: a spark rising", "y")
      ]).toEqual([prompt, [Array(5).fill(0), Array(5).fill(1)], [0, 26], [0, -13]]);
    }
    // Madinah rejoiced. Who came first: no one on the road yet; then the places of Mus'ab and Ibn Umm Maktum come in.
    // What they taught: no voice yet; then two golden voices teach the Quran, and places come to sit and learn. Who came
    // after them: not yet; then the places of Bilal, Sa'd and Ammar come in.
    const first = "the places of Mus'ab and Ibn Umm Maktum, the first to come";
    expect([shown("Who came to Madinah first, with Ibn Umm Maktum?", [first]), moved("Who came to Madinah first, with Ibn Umm Maktum?", first, "x")]).toEqual([[[0], [1]], [-112, 0]]);
    const teaching = ["teaching the Quran: a golden voice 1", "teaching the Quran: a golden voice 2", "learning from them: places come to sit"];
    expect(shown("What did the first two teach the people of Madinah?", teaching)).toEqual([Array(3).fill(0), Array(3).fill(1)]);
    expect([shown("Who came after them?", ["the places of Bilal, Sa'd and Ammar"]), moved("Who came after them?", "the places of Bilal, Sa'd and Ammar", "x")]).toEqual([[[0], [1]], [-140, 0]]);
    // Whether he reached Madinah before Mus'ab: no one yet; then Mus'ab and Ibn Umm Maktum, the others, Umar with
    // twenty, and his golden ring last of all.
    const arrivals = [first, "the places of Bilal, Sa'd and Ammar", "Umar's place, and twenty with him", "a golden ring, his place, coming"];
    expect(shown("The Prophet ﷺ reached Madinah before Mus'ab.", arrivals)).toEqual([Array(4).fill(0), Array(4).fill(1)]);
    // How Madinah felt: his golden ring not come yet and no light in the homes; then it comes, light comes in every
    // home, and sparks rise from them. Who called out that he had come: no voice from the homes yet; then three, and a
    // golden light about his place.
    const lights = [1, 2, 3, 4].map((n) => `rejoicing: light in a home ${n}`);
    expect(shown("How did Madinah feel when the Prophet ﷺ arrived?", ["a golden ring, his place, coming", ...lights])).toEqual([Array(5).fill(0), Array(5).fill(1)]);
    const voices = [1, 2, 3].map((n) => `he has come: a voice from a home ${n}`);
    expect(shown("Who called out that the Prophet ﷺ had come?", [...voices, "a golden light about his place"])).toEqual([Array(4).fill(0), Array(4).fill(1)]);
    // Red camels. What everyone hoped the night before: his voice saying tomorrow, the flag, and no light over the
    // tents yet; then a small light of hope over each tent. What was wrong with Ali: not called for yet; then his voice
    // asks where Ali is, and Ali's place comes, with a grey shade of pain on it.
    const tents = [1, 2, 3, 4].map((n) => `all night, hoping: a small light over a tent ${n}`);
    expect(shown("What did everyone hope the night before?", ["his voice: tomorrow, the flag", ...tents])).toEqual([
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1]
    ]);
    expect([shown("What was wrong with Ali that morning?", ["his voice: where is Ali?", "Ali's place", "in pain: a grey shade on Ali's place"]), moved("What was wrong with Ali that morning?", "Ali's place", "x")]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, -88]
    ]);
    // What he told Ali to do first, and whether to rush in: no word to go calmly yet, and the flag still by him; then
    // his voice says go calmly, the flag goes on with Ali's place along a way to their land, and Ali's voice invites them.
    for (const prompt of ["What did the Prophet ﷺ tell Ali to do first?", "The Prophet ﷺ told Ali to rush in fast."]) {
      expect([prompt, shown(prompt, ["his voice: go calmly", "going calmly: a way to their land", "Ali's voice, inviting them"]), moved(prompt, "the flag", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [12, 88]
      ]);
    }
    // What one guided through him is better than: no red camels yet; then red camels come, dimmed beside one place
    // guided by the forts, with a warm light about it.
    expect(shown("One person guided through you is better than what?", ["red camels", "one guided: a place by the forts", "one guided: a warm light about it"])).toEqual([
      [0, 0, 0],
      [0.55, 1, 1]
    ]);
  });
  it("waits on the scenes of blessings and the Quran, from the lost necklace to a third of the Quran, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-lost-necklace", "sign-love-madinah", "sign-thabit-good-news", "sign-dearer-than-yourself", "sign-better-than-camels", "sign-two-bright-ones", "sign-third-of-the-quran"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(49);
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
    // The lost necklace. What she lost: her camel still walking, and nothing on the ground; then her necklace lies lost
    // and the camel kneels over it. Why they stopped with no water: no necklace yet; then it lies lost, the camel kneels
    // over it, tents go up, and night comes, dark, with its stars.
    const lost = "What did Aishah lose on the journey?";
    expect([shown(lost, ["her camel, walking, then rising", "her necklace, lost", "her camel, kneeling over it"]), moved(lost, "her necklace, lost", "y")]).toEqual([
      [
        [1, 0, 0],
        [0, 1, 1]
      ],
      [-7, 0]
    ]);
    expect(shown("Why did the army stop with no water?", ["her necklace, lost", "her camel, kneeling over it", "they stayed: tents", "the night sky, dark through", "the stars of the night"])).toEqual([Array(5).fill(0), Array(5).fill(1)]);
    // What Allah sent down, and what He allowed with no water for wudu: no light on the earth yet; then a soft golden
    // light on the clean earth, and dust shines about each place.
    const dust = [1, 2, 3, 4, 5, 6].map((n) => `tayammum: dust shining about a place ${n}`);
    for (const prompt of ["What did Allah send down then?", "What did Allah allow when there was no water for wudu?"]) {
      expect([prompt, shown(prompt, ["the ayah of tayammum: a soft golden light on the clean earth", ...dust])]).toEqual([prompt, [Array(7).fill(0), Array(7).fill(1)]]);
    }
    // What Usayd said: no voice yet; then Usayd's voice: not your first blessing, and a warm glow about her place.
    for (const prompt of ["Usayd said it was not the first blessing from Abu Bakr's family.", "Usayd ibn Hudayr called it the first blessing from Abu Bakr's family."]) {
      expect([prompt, shown(prompt, ["Usayd's voice: not your first blessing", "a blessing: a warm glow about her place"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // Make us love Madinah. Who fell ill: no haze yet; then a grey haze of fever over Abu Bakr's home and over Bilal's.
    const fever = ["fever: a grey haze over Abu Bakr's home", "fever: a grey haze over Bilal's home"];
    expect(shown("Who fell ill with fever after the hijrah?", fever)).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Who visited them and told him: no way to their homes yet; then the way, and later her voice, telling him. What
    // Bilal missed: her voice asking how they are, and no valley yet; then Bilal's voice is raised, and far off shows a
    // valley of Makkah with its idhkhir.
    expect(shown("Who visited them and told the Prophet ﷺ?", ["the way to their homes", "her voice: telling him"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    expect(shown("What did Bilal miss while he was ill?", ["her voice: how do you find yourself?", "Bilal's voice, raised", "a valley of Makkah, far off, with its idhkhir"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // What he asked for Madinah: her voice telling him, and no du'a yet; then his voice, a spark rising, a soft light on
    // Makkah, and a greater light over Madinah.
    const love = "What did the Prophet ﷺ ask Allah for Madinah?";
    expect([shown(love, ["her voice: telling him", "his voice: his du'a", "Makkah dear to them: a soft light on it", "or more: a greater light over Madinah"]), moved(love, "his du'a: a spark rising", "y")]).toEqual([
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ],
      [0, -13]
    ]);
    // Whether he asked Him to bless its food: no measures yet; then its sa' and its mudd, grain heaped on each, and a
    // glow on them.
    expect(shown("He also asked Allah to bless Madinah's food.", ["its sa': a measure", "its mudd: a smaller measure", "blessed: grain heaped on the sa'", "blessed: grain heaped on the mudd", "the blessing: a glow on the measures"])).toEqual([Array(5).fill(0), Array(5).fill(1)]);
    // What he asked Him to take from it: the grey haze still over both homes; then it moves off toward al-Juhfah, far off
    // on the hills, and is gone, and a warm glow comes on the homes.
    const take = "What did he ask Allah to take from Madinah?";
    expect([shown(take, [...fever, "al-Juhfah, far off on the hills", "healthy: a warm glow on the homes"]), moved(take, fever[0], "x")]).toEqual([
      [
        [1, 1, 0, 0],
        [0, 0, 1, 1]
      ],
      [0, 40]
    ]);
    // Thabit's good news. Who noticed he was missing, and that he noticed: no empty spot yet; then Thabit's empty spot,
    // with a ring of care about it.
    for (const prompt of ["Who noticed that Thabit was missing?", "The Prophet ﷺ noticed when Thabit was missing."]) {
      expect([prompt, shown(prompt, ["Thabit's spot, empty", "he missed him: a ring of care about the empty spot"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // How the man found him, and that he cared about him: nothing yet; then the ring of care, a way to Thabit's home,
    // and a place goes along it, to find Thabit under a grey shade.
    for (const prompt of ["How did the man find Thabit?", "The Prophet ﷺ cared about a companion who went missing."]) {
      expect([prompt, shown(prompt, ["he missed him: a ring of care about the empty spot", "the way to Thabit's home", "a grey shade over Thabit"]), moved(prompt, "the place that went to him", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, 52]
      ]);
    }
    // Why he was sad: a grey shade over him, and no word yet; then Thabit's voice: it is bad.
    expect(shown("Why was Thabit sad, per Bukhari 4846?", ["a grey shade over Thabit", "Thabit's voice: bad"])).toEqual([
      [1, 0],
      [1, 1]
    ]);
    // Who sent him the good news: the voice of the one who came back, telling him; then his voice: go to him and say,
    // and a golden spark of great good news goes with that place back to Thabit.
    const sent = "Who sent Thabit the good news?";
    expect([shown(sent, ["its voice: telling him", "his voice: go to him and say", "great good news: a golden spark going with it"]), moved(sent, "great good news: a golden spark going with it", "x")]).toEqual([
      [
        [1, 0, 0],
        [0, 1, 1]
      ],
      [0, 52]
    ]);
    // What news he got, and whether he was told he was of the Fire: the grey shade still over him, and no light of
    // Paradise; then the shade goes, Thabit's place rises, a warm glow comes about it, and far off Paradise shows, a soft
    // circle of light.
    for (const prompt of ["What good news did Thabit get?", "Thabit was told he was of the people of the Fire.", "What news was Thabit given, per Bukhari 4846?"]) {
      expect([
        prompt,
        shown(prompt, ["a grey shade over Thabit", "the shade deepening", "of Paradise: a warm glow about Thabit's place", "Paradise far off: a soft circle of light"]),
        moved(prompt, "Thabit's place, sitting low", "y")
      ]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [0, 0, 1, 1]
        ],
        [0, -1.6]
      ]);
    }
    // Dearer than yourself. Whether he held Umar's hand: nothing between them yet; then a soft golden band.
    expect(shown("The Prophet ﷺ was holding Umar's hand.", ["with him: a soft golden band between them"])).toEqual([[0], [1]]);
    // What Umar first said: no voice and nothing held dear yet; then Umar's voice, and a soft circle of what he holds
    // dear, a home, a palm, coins and a camel, his own self in the middle, and the golden light of his love for him,
    // which comes inside the circle but stays outside his self.
    const dear = ["Umar's voice", "what Umar holds dear: a soft circle", "a home he holds dear", "a palm he holds dear", "coins he holds dear", "a camel he holds dear", "his own self, in the middle", "the golden light of his love for him"];
    for (const prompt of ["What did Umar first say to the Prophet ﷺ?", "Umar first said: dearer than everything except myself."]) {
      expect([prompt, shown(prompt, dear), moved(prompt, "the golden light of his love for him", "x")]).toEqual([prompt, [Array(8).fill(0), Array(8).fill(1)], [-16, 0]]);
    }
    // What he answered: Umar's voice, and no way to the middle; then his voice: not until, with a dashed way to the
    // middle.
    expect(shown("What did the Prophet ﷺ answer?", ["Umar's voice", "his voice", "not until: a dashed way to the middle"], "Not until I am dearer than yourself")).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // When faith is complete: the light still outside his self; then it comes to the very middle, his self moves out,
    // a full golden glow comes about Umar's place, and the middle glows.
    const complete = "When is faith complete, per Abdullah ibn Hisham?";
    expect([
      shown(complete, ["now: a full golden glow about Umar's place", "now: the middle glowing"]),
      moved(complete, "the golden light of his love for him", "x"),
      moved(complete, "his own self, in the middle", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 13.5],
      [0, 13.5]
    ]);
    // What he said when Umar said now, and whether he said nothing: Umar's voice, and no glow yet; then his voice, a
    // full golden glow about Umar's place, and the middle glowing.
    for (const prompt of ["What did the Prophet ﷺ say when Umar said 'now, more than myself'?", "After Umar changed his answer, the Prophet ﷺ said nothing."]) {
      expect([prompt, shown(prompt, ["Umar's voice", "his voice", "now: a full golden glow about Umar's place", "now: the middle glowing"])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    // Whom a believer must love most: the things he holds dear still there, and no one on the land or on the ring; then
    // the things go, places come on the land, each with a warm glow of faith, an elder's place, a young place and many
    // places come on the outer ring, and the middle glows more.
    const land = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `none of you: a place on the land ${n}`);
    const faith = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `his faith: a warm glow on a place ${n}`);
    const outer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => `all on the outer ring: a place ${n}`);
    for (const prompt of ["Whom must a believer love most among people?", "Whom should a believer love more than all people?"]) {
      expect([prompt, shown(prompt, ["a home he holds dear", ...land, ...faith, ...outer, "dearer than all: the middle glowing more"])]).toEqual([
        prompt,
        [
          [1, ...Array(29).fill(0)],
          [0, ...Array(29).fill(1)]
        ]
      ]);
    }
    // Whether this love is more than for one's own children: no one on the outer ring yet; then an elder's place and a
    // young place come on it, with many places, and the middle glows more.
    expect(shown("This love is more than for one's own children.", ["an elder's place on the outer ring", "a young place on the outer ring", ...outer, "dearer than all: the middle glowing more"])).toEqual([
      Array(15).fill(0),
      Array(15).fill(1)
    ]);
    // Better than camels. Where Uqbah was: the places under the Suffah, by the masjid, and his golden ring not out yet;
    // then it comes out to them.
    const comingOut = "a golden ring, his place, coming out";
    expect([shown("Where was Uqbah when he heard this?", ["the Suffah: a shade by the masjid", "a place under the Suffah 1", comingOut]), moved("Where was Uqbah when he heard this?", comingOut, "x")]).toEqual([
      [
        [1, 1, 0],
        [1, 1, 1]
      ],
      [-6, 0]
    ]);
    // What is better than two she-camels: two big she-camels, and no light of an ayah yet; then two golden lights of
    // ayat learned rise into sight, the camels grow faint beside them, and the two lights glow brighter.
    const two = ["a big she-camel 1", "a big she-camel 2", "an ayah learned: a golden light 1", "an ayah learned: a golden light 2", "better: the two lights glowing brighter"];
    for (const prompt of ["What is better than two big she-camels?", "What is better than two she-camels?"]) {
      expect([prompt, shown(prompt, two)]).toEqual([
        prompt,
        [
          [1, 1, 0, 0, 0],
          [0.55, 0.55, 1, 1, 1]
        ]
      ]);
    }
    // Where they went to learn: their voices, and no ayah yet; then his voice, a place from under the Suffah goes into
    // the masjid, and two golden lights of ayat learned come.
    const learn = "Where did they go to learn?";
    expect([shown(learn, ["we would love that: a voice 1", "his voice", "an ayah learned: a golden light 1", "an ayah learned: a golden light 2"]), moved(learn, "a place under the Suffah 4", "x")]).toEqual([
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ],
      [0, -36]
    ]);
    // Three better than three: no third camel or light yet; then two more she-camels come from far off, faint, two more
    // lights rise, and all the lights glow.
    expect(shown("Three verses are better than three she-camels.", ["a big she-camel 3", "a big she-camel 4", "an ayah learned: a golden light 3", "an ayah learned: a golden light 4", "better still: all the lights glowing"])).toEqual([
      [0, 0, 0, 0, 0],
      [0.55, 0.55, 1, 1, 1]
    ]);
    // Whether each ayah learned is worth more than wealth: the two camels, and no glow yet; then they grow faint, and the
    // two lights glow brighter, then all of them.
    expect(shown("Each verse learned is worth more than wealth.", ["a big she-camel 1", "a big she-camel 2", "better: the two lights glowing brighter", "better still: all the lights glowing"])).toEqual([
      [1, 1, 0, 0],
      [0.55, 0.55, 1, 1]
    ]);
    // The two bright ones. Whether he told us to read the Quran: no golden voice yet; then a golden voice reads, and
    // sparks rise from it.
    const read = "The Prophet ﷺ told us to recite the Quran.";
    expect([shown(read, ["reading: a golden voice"]), moved(read, "its reading: a spark rising 1", "y")]).toEqual([[[0], [1]], [0, -11]]);
    // What the Quran does for its readers, and whom it speaks up for: the place reading at night; then the Day, a wide
    // pale plain, the place stands on it, and a soft golden light comes to its side to plead for it.
    for (const prompt of ["What will the Quran do for its readers?", "On the Last Day, who does the Quran speak up for?"]) {
      expect([
        prompt,
        shown(prompt, ["the one who read it: a place", "the Day: a wide pale plain", "the one who read it, on that Day", "it comes to plead for it: a soft golden light"]),
        moved(prompt, "it comes to plead for it: a soft golden light", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ],
        [-90, 0]
      ]);
    }
    // Which are the two bright surahs: no bright light yet; then two.
    const bright = ["the two bright ones: a light 1", "the two bright ones: a light 2"];
    expect(shown("Which are the two bright surahs?", bright)).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // How the two surahs will come: the two bright lights; then two clouds come from either side and stay over the
    // place, with two soft shades on the plain beneath them.
    const come = "How will the two surahs come?";
    expect([
      shown(come, [...bright, "like two clouds: a cloud 1", "like two clouds: a cloud 2", "or two shades: a shade 1", "or two shades: a shade 2"]),
      moved(come, "like two clouds: a cloud 1", "x"),
      moved(come, "like two clouds: a cloud 2", "x")
    ]).toEqual([
      [
        [1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1]
      ],
      [-70, 0],
      [70, 0]
    ]);
    // A third of the Quran. Which surah equals a third: night, and nothing of the third yet; then a golden voice recites
    // it again and again, morning comes, his voice speaks, and a ring of light in three parts shows, a third filled with
    // gold. Whether it is a short surah with a great reward: night, and no word yet; then the small dim spark comes and
    // goes, his voice speaks, and the third fills with gold.
    const third = ["his voice", "the Quran in three parts: a ring of light", "a third of it, filled with gold", "a third: a glow on it"];
    for (const prompt of ["Which surah equals a third of the Quran?", "Al-Ikhlas is a short surah with a great reward."]) {
      expect([prompt, shown(prompt, ["the night, until the morning", ...third])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 1]
        ]
      ]);
    }
    // What the man did with it: no voice yet; then a golden voice recites, a golden spark rises from it again and
    // again, and a ring shows by the one who heard it.
    const did = "What did the man in the hadith do with Al-Ikhlas?";
    expect([shown(did, ["reciting: a golden voice", "hearing it: a ring by the one who heard it"]), moved(did, "the surah, again and again: a golden spark rising 4", "y")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -11]
    ]);
    // Whether the man thought it was not enough: still night, with no word to him yet; then morning, the one who heard
    // it goes to his golden ring, and its voice tells him, with a small dim spark: little, it thought.
    const little = "The man thought reciting it was not enough.";
    expect([shown(little, ["the night, until the morning", "its voice, telling him", "little, it thought: a small dim spark"]), moved(little, "the place of the one who heard it", "x")]).toEqual([
      [
        [1, 0, 0],
        [0, 1, 1]
      ],
      [0, -90]
    ]);
    // What it is equal to: the small dim spark; then it goes, and the ring in three parts shows, a third filled with gold.
    expect(shown("What is Al-Ikhlas equal to, says the Prophet ﷺ?", ["little, it thought: a small dim spark", ...third.slice(1)])).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // How they felt about a third in one night: the third full of gold; then places come by him with grey marks, for it
    // was hard on them, and the third grows faint.
    const hard = [1, 2, 3].flatMap((n) => [`a place by him ${n}`, `hard on them: a grey mark ${n}`]);
    expect(shown("How did the companions feel about reciting a third in one night?", ["a third of it, filled with gold", ...hard])).toEqual([
      [1, 0, 0, 0, 0, 0, 0],
      [0.25, 1, 1, 1, 1, 1, 1]
    ]);
    // How one can recite a third in one night: the grey marks, and the third faint; then the grey goes, the third fills
    // again with its glow, and sparks rise from their places.
    const can = "How can you recite a third of the Quran in one night?";
    const marks = [1, 2, 3].map((n) => `hard on them: a grey mark ${n}`);
    expect([shown(can, ["a third of it, filled with gold", "a third: a glow on it", ...marks]), moved(can, "they can: a spark rising from a place 1", "y")]).toEqual([
      [
        [0.25, 0, 1, 1, 1],
        [1, 1, 0, 0, 0]
      ],
      [0, -10]
    ]);
  });

  it("waits on the scenes of rights and mercy, from spreading the salam to the kiss of mercy, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-spread-the-salam", "sign-feed-and-greet", "sign-a-fair-gift", "sign-garden-in-charity", "sign-hornless-sheep", "sign-forgot-and-ate", "sign-kiss-of-mercy"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(34);
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
    // Spread the salam. What true faith needs, and whether loving one another is part of it: no light of faith yet, and
    // no ring of care; then two places come together, a light of faith comes in each, and a ring of care about them.
    for (const prompt of ["What is needed for true faith, in the hadith?", "What must we do to truly believe, per Muslim 54?", "Loving one another is part of true faith."]) {
      expect([prompt, shown(prompt, ["faith: a light in a place 3", "faith: a light in a place 4", "love: a ring of care about two places"]), moved(prompt, "a place 3", "x")]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, 5]
      ]);
    }
    // What builds love, what fosters it, and what spreading the salam brings: faint lights, and no voice of salam yet;
    // then threads show between the places, a voice of salam goes from each, every light grows full, a ring of care
    // comes about them all, and the far circle of light shines full.
    const salam = [1, 2, 3, 4, 5, 6].map((n) => `salam: a voice from a place ${n}`);
    const love = ["love to come: a thread between places 1", "loving one another: a ring of care about them all", "faith: a light in a place 1", "Paradise, far off: a soft circle of light with a garden in it"];
    for (const prompt of ["What builds love between people, in the hadith?", "What fosters love among us?", "What does spreading the salam bring?"]) {
      expect([prompt, shown(prompt, [...salam, ...love])]).toEqual([
        prompt,
        [
          [...Array(8).fill(0), 0.45, 0.5],
          Array(10).fill(1)
        ]
      ]);
    }
    // Feed and greet. What he named first, and whether feeding the poor is a good deed of Islam: a place under a grey
    // shade of hunger, and no food yet; then a place comes out of the home with food on a dish, the grey goes, and a
    // warm glow comes on the place in need.
    const fed = ["hunger: a grey shade on a place", "a place, coming out of the home with food", "food on a dish, given", "fed: a warm glow on the place in need"];
    for (const prompt of ["Feeding the poor is one of the good deeds of Islam.", "What good deed did the Prophet ﷺ name first?"]) {
      expect([prompt, shown(prompt, fed), moved(prompt, "food on a dish, given", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ],
        [-15.8, 0]
      ]);
    }
    // Which deeds he named: no food and no salam yet; then the food is given, its voice gives salam, soft lights come on
    // the places it knows and on the one it does not, and a wide ring of care comes about them all.
    expect(shown("What deeds of Islam did the Prophet ﷺ name?", ["food on a dish, given", "fed: a warm glow on the place in need", "its voice: salam", "salam: a soft light on a place it knows 1", "salam: a soft light on the place it does not know", "salam to all: a wide ring of care"])).toEqual([Array(6).fill(0), Array(6).fill(1)]);
    // Whom to greet: no salam yet; then its voice gives salam, soft lights come on the two places it knows, a place comes
    // along the road from far off, a soft light comes on it too, and a wide ring of care comes about them all.
    const greet = ["its voice: salam", "salam: a soft light on a place it knows 1", "salam: a soft light on a place it knows 2", "a place it does not know, coming along the road", "salam: a soft light on the place it does not know", "salam to all: a wide ring of care"];
    for (const prompt of ["Whom should we greet?", "Whom should we greet, per the hadith?"]) {
      expect([prompt, shown(prompt, greet), moved(prompt, "a place it does not know, coming along the road", "x")]).toEqual([prompt, [Array(6).fill(0), Array(6).fill(1)], [30, 0]]);
    }
    // Whether salam is only for those we know: soft lights on the two places it knows, and no one on the road yet; then
    // a place comes along the road from far off, a soft light comes on it too, and a wide ring of care about them all.
    const only = "Salam is only for people we already know.";
    expect([shown(only, greet.slice(1)), moved(only, "a place it does not know, coming along the road", "x")]).toEqual([
      [
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [30, 0]
    ]);
    // A fair gift. What he asked the father: the giver's voice, telling him of the gift; then his voice asks, and by each
    // of the other young places shows only the faint outline of a gift.
    const outlines = [1, 2, 3].map((n) => `no gift like it: a faint outline by another young place ${n}`);
    for (const prompt of ["What did the Prophet ﷺ ask An-Nu'man's father?", "What did the Prophet ﷺ ask Nu'man's father?"]) {
      expect([prompt, shown(prompt, ["the giver's voice: I gave a gift", "his voice, asking: all the same?", ...outlines])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 1]
        ]
      ]);
    }
    // What he told him, and what parents are to be: the giver's voice saying no, and the outlines; then his voice
    // speaks, and a level band of light comes under all the young places.
    for (const prompt of ["What did he tell him?", "What did he tell parents to be?"]) {
      expect([prompt, shown(prompt, ["the giver's voice: no", "his voice: be fair", "be fair: a level band of light under the young places", ...outlines])]).toEqual([
        prompt,
        [
          [1, 0, 0, 1, 1, 1],
          [0, 1, 1, 1, 1, 1]
        ]
      ]);
    }
    // What the father did then: the giver's place by him, the gift by the young place, and the outlines; then the
    // giver's place goes back along the way, the gift goes back to it, the outlines go, and the band stays level.
    for (const prompt of ["What did the father do then?", "Nu'man's father took the gift back."]) {
      expect([prompt, shown(prompt, [...outlines, "be fair: a level band of light under the young places"]), moved(prompt, "the giver's place, going to him and back", "x"), moved(prompt, "the gift, given and taken back", "x")]).toEqual([
        prompt,
        [
          [1, 1, 1, 1],
          [0, 0, 0, 1]
        ],
        [76, 0],
        [0, -10.2]
      ]);
    }
    // A garden in charity. Whether Sa'd was with his mother when she died: the light in her home; then it goes out
    // softly, while Sa'd's place is still far off on the road.
    const away = "Sa'd was with his mother when she died.";
    expect([shown(away, ["her home: its light going out", "Sa'd's place, coming back from far off"]), moved(away, "Sa'd's place, coming back from far off", "x")]).toEqual([
      [
        [1, 1],
        [0, 1]
      ],
      [29.4, 29.4]
    ]);
    // Whether charity helps a parent who died: Sa'd's voice asking, and the way to her faint; then his voice answers
    // yes, and the way grows clearer.
    for (const prompt of ["Does charity for a dead parent help them?", "Does charity help a parent who died?"]) {
      expect([prompt, shown(prompt, ["Sa'd's voice, asking", "his voice: yes", "the way to her, faint"])]).toEqual([
        prompt,
        [
          [1, 0, 0.4],
          [0, 1, 0.7]
        ]
      ]);
    }
    // Whether we can still do good for parents after they die: no answer yet; then his voice says yes, Sa'd's voice
    // makes him witness, a golden light comes over the garden, the way turns golden, sparks rise from the garden, and
    // a soft light comes about her home.
    const good = "We can still do good for our parents after they die.";
    expect([shown(good, ["Sa'd's voice: I make you witness", "the garden given: a golden light over it", "charity for her: the way turns golden", "for her: a soft light about her home"]), moved(good, "charity: a spark rising from the garden 1", "y")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -11]
    ]);
    // The hornless sheep. What happens to rights: the two sheep at rest, with no mark yet; then the horned one butts the
    // hornless one and a grey mark stays on it, the Day comes as a wide pale plain, a soft light comes about the
    // hornless sheep, it butts the horned one back, the mark goes, and a level band of light comes under both.
    const due = ["a wrong done: a grey mark on the hornless sheep", "the Day: a wide pale plain", "its due: a soft light about the hornless sheep", "justice: a level band of light under both"];
    for (const prompt of ["What happens to rights, in the hadith?", "What will happen to rights, per the hadith?"]) {
      expect([prompt, shown(prompt, due)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0, 1, 1, 1]
        ]
      ]);
    }
    // Whether Allah judges between the animals with justice: the Day's plain, and the grey mark on the hornless sheep;
    // then a soft light comes about it, it butts the horned one back, the mark goes, and the level band comes under both.
    expect(shown("Allah judges between the animals with justice.", due)).toEqual([
      [1, 1, 0, 0],
      [0, 1, 1, 1]
    ]);
    // If he forgets, and eats. Why the fast still counts: the date on the dish, the cup full, and the day still bright;
    // then the date goes to its place, the water in the cup goes down, the ring of its fast grows full, and the sun goes
    // on toward a warm evening sky.
    const fast = ["a date, eaten", "fasting: a soft ring of light about its place", "evening coming: a warm sky"];
    const forgot = "If you eat because you ____, your fast still counts.";
    expect([shown(forgot, fast), moved(forgot, "the cup's water, going down", "scaleY"), moved(forgot, "the sun, going on toward evening", "x")]).toEqual([
      [
        [1, 0.5, 0],
        [0, 1, 1]
      ],
      [1, 0.4],
      [0, 70]
    ]);
    // What to do after forgetting, and whether the fast still counts: the date eaten, the cup low, and the ring of the
    // fast still soft; then it grows full, and the sun goes on toward a warm evening sky.
    for (const prompt of ["You forgot and drank water while fasting. What now?", "Eating because you forgot still lets your fast count."]) {
      expect([prompt, shown(prompt, fast), moved(prompt, "the cup's water, going down", "scaleY"), moved(prompt, "the sun, going on toward evening", "x")]).toEqual([
        prompt,
        [
          [0, 0.5, 0],
          [0, 1, 1]
        ],
        [0.4, 0.4],
        [0, 70]
      ]);
    }
    // The kiss of mercy. Whom he kissed: no light yet; then a warm light comes about the small place beside his place,
    // and, asked as in front of al-Aqra', al-Aqra's place comes and sits with him too.
    const kiss = ["a kiss of mercy: a warm light about the small place", "al-Aqra's place, coming to sit with him"];
    expect(shown("Whom did the Prophet ﷺ kiss?", kiss)).toEqual([
      [0, 0],
      [1, 0]
    ]);
    const front = "Whom did the Prophet ﷺ kiss in front of al-Aqra?";
    expect([shown(front, kiss), moved(front, kiss[1], "x")]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [26, 0]
    ]);
    // How many children al-Aqra' had: its place sitting with him, and no voice yet; then its voice speaks, and ten
    // small places show as it tells of them.
    const ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `ten small places, as it tells of them ${n}`);
    for (const prompt of ["How many children did al-Aqra say he had?", "How many children did that man have?"]) {
      expect([prompt, shown(prompt, [kiss[1], "al-Aqra's voice: ten, and never kissed", ...ten])]).toEqual([prompt, [[1, ...Array(11).fill(0)], [1, 1, ...Array(10).fill(0.75)]]]);
    }
    // What he said to the one who never kissed his children, and whether love for children is part of mercy: his look
    // as a faint golden line; then his voice speaks, and a soft light of mercy comes about his place and the small one.
    for (const prompt of ["Showing love to children is part of mercy.", "What did he say to the man who never kissed his children?"]) {
      expect([prompt, shown(prompt, ["his look: a faint golden line to al-Aqra's place", "his voice: whoever is not merciful", "mercy: a soft light about his place and the small one"])]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of faith, from the first believers to changing a wrong, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-first-believers", "sign-freed-bilal", "sign-most-beloved", "sign-trustworthy-one", "sign-two-refuges", "sign-greatest-ayah", "sign-change-it"];
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
    // The first believers. Which man Ammar named: the five and the two with him, and no one else yet; then Abu Bakr's
    // place comes from a home, a light of faith comes in it, and a ring of care comes about them all.
    const named = "Ammar named who was with the Prophet ﷺ at first. Which man did he name?";
    expect([shown(named, ["and two: a place 2", "Abu Bakr's place, coming from a home", "faith: a light in Abu Bakr's place", "the few with him: a ring of care about them all"]), moved(named, "Abu Bakr's place, coming from a home", "x")]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [-46, 0]
    ]);
    // How many slaves Ammar counted: no one with him yet; then five places come one by one, with a light of faith in
    // each, and the two are not there yet.
    const five = [1, 2, 3, 4, 5].flatMap((n) => [`five who were slaves: a place ${n}`, `faith: a light in a place of the five ${n}`]);
    expect(shown("How many slaves did Ammar count among the first Muslims?", [...five, "and two: a place 1"])).toEqual([Array(11).fill(0), [...Array(10).fill(1), 0]]);
    // How many women he counted: the five, and no one else yet; then two places come, with a light of faith in each,
    // and Abu Bakr's place has not come yet.
    const two = ["and two: a place 1", "and two: a place 2", "faith: a light in a place of the two 1", "faith: a light in a place of the two 2", "five who were slaves: a place 5", "Abu Bakr's place, coming from a home"];
    expect(shown("How many women did Ammar count?", two)).toEqual([
      [0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 0]
    ]);
    // Who reported it: no one with him yet; then a faint golden line goes from Ammar's place to his, while no one else
    // has come.
    expect(shown("Which companion reported how few Muslims there were at first?", ["seeing him: a faint golden line from Ammar's place", "five who were slaves: a place 1"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Who was with him, and how many Muslims there were: no one with him yet; then the five come, the two, and Abu
    // Bakr's place, and a ring of care comes about the few.
    const few = ["five who were slaves: a place 1", "and two: a place 1", "Abu Bakr's place, coming from a home", "the few with him: a ring of care about them all"];
    for (const prompt of ["Who was with the Prophet ﷺ when Ammar saw him?", "How many Muslims were there then?"]) {
      expect([prompt, shown(prompt, few)]).toEqual([prompt, [Array(4).fill(0), Array(4).fill(1)]]);
    }
    // Whether Ammar was one of the earliest: nothing yet; then his look goes to him as a faint golden line, and the few
    // come one by one with the ring of care about them.
    expect(shown("Ammar was one of the earliest Muslims.", ["seeing him: a faint golden line from Ammar's place", ...few])).toEqual([Array(5).fill(0), Array(5).fill(1)]);
    // Freed Bilal. Whom Abu Bakr set free, and whether Umar looked down on him: a grey band about Bilal's place; then
    // Abu Bakr's place goes to it, the band goes, a soft light of freedom comes about it, a warm glow of honor, and a
    // ring of care about the two.
    const freedom = ["held as a slave: a grey band about Bilal's place", "freed: a soft light about Bilal's place", "honor: a warm glow about Bilal's place", "honored both: a ring of care about the two places"];
    for (const prompt of ["In Makkah, Abu Bakr set ____ free.", "In Makkah, Abu Bakr set Umar free.", "Umar looked down on Bilal because he had been a slave.", "What does Umar's saying teach?"]) {
      expect([prompt, shown(prompt, freedom), moved(prompt, "Abu Bakr's place, going to Bilal's", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 1]
        ],
        [0, 29]
      ]);
    }
    // What Bilal grew up as, and what Abu Bakr set him: the grey band; then Abu Bakr's place goes to his, the band goes
    // and the soft light of freedom comes, before the glow of honor.
    for (const prompt of ["Bilal grew up as a ____ in Makkah.", "Bilal grew up as a king in Makkah.", "Abu Bakr bought Bilal and set him ____."]) {
      expect([prompt, shown(prompt, freedom.slice(0, 3)), moved(prompt, "Abu Bakr's place, going to Bilal's", "x")]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 0]
        ],
        [0, 29]
      ]);
    }
    // Whom Umar meant: Bilal's place freed, with no glow of honor yet; then a warm glow of honor comes about it, and a
    // ring of care about the two.
    expect(shown("Umar said Abu Bakr freed 'our master'. Who did he mean?", freedom.slice(1))).toEqual([
      [1, 0, 0],
      [1, 1, 1]
    ]);
    // What Umar called Abu Bakr: no glow yet; then a warm glow of honor comes about Abu Bakr's place, before Bilal is
    // freed.
    expect(shown("What did Umar call Abu Bakr?", ["honor: a warm glow about Abu Bakr's place", "freed: a soft light about Bilal's place"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Who praised Abu Bakr, and who told it: nothing yet; then Umar's voice speaks, before any glow.
    for (const prompt of ["Who praised Abu Bakr for freeing Bilal?", "Umar was the one who told this."]) {
      expect([prompt, shown(prompt, ["Umar's voice", "honor: a warm glow about Abu Bakr's place"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ]
      ]);
    }
    // What Umar called Bilal: the grey band, and no glow yet; then honor comes about Abu Bakr's place, Bilal is freed,
    // and honor comes about his place too, with a ring of care about the two.
    expect(shown("What did Umar call Bilal?", ["honor: a warm glow about Abu Bakr's place", ...freedom])).toEqual([
      [0, 1, 0, 0, 0],
      [1, 0, 1, 1, 1]
    ]);
    // Who freed Bilal: the grey band, and no glow yet; then honor comes about Abu Bakr's place, it goes to Bilal's, the
    // band goes, and the soft light of freedom comes.
    expect([shown("Who freed Bilal?", ["honor: a warm glow about Abu Bakr's place", ...freedom.slice(0, 2)]), moved("Who freed Bilal?", "Abu Bakr's place, going to Bilal's", "x")]).toEqual([
      [
        [0, 1, 0],
        [1, 0, 1]
      ],
      [0, 29]
    ]);
    // Most beloved. Whose father Abu Bakr was: Amr's voice asking, and no light yet; then a warm light comes on her
    // home, and, asked among the men, a warm light on Abu Bakr's place, before Umar's.
    const loved = ["most beloved: a warm light on her home", "loved: a warm light on Abu Bakr's place", "loved: a warm light on Umar's place"];
    for (const prompt of ["Abu Bakr was the father of ____.", "Abu Bakr was the father of Fatimah."]) {
      expect([prompt, shown(prompt, loved)]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    // Whom he loved most: Amr's voice asking; then his voice answers, and a warm light comes on her home only.
    for (const prompt of ["Asked who he loved most, the Prophet ﷺ said: ____.", "Who did the Prophet ﷺ name as most beloved to him?"]) {
      expect([prompt, shown(prompt, ["Amr's voice: who is most beloved to you?", "his voice, answering", ...loved.slice(0, 2)])]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 0]
        ]
      ]);
    }
    // Whom he named among the men: Amr's voice asking again, and the light on her home; then his voice answers again,
    // and a warm light comes on Abu Bakr's place, before Umar's.
    for (const prompt of ["Among men, whom did he ﷺ name?", "Among men, whom did the Prophet ﷺ love most?", "How did the Prophet ﷺ name Abu Bakr in his answer?", "Among men, who did he say he loved most?"]) {
      expect([prompt, shown(prompt, ["Amr's voice, asking again", "his voice, answering again", ...loved])]).toEqual([
        prompt,
        [
          [1, 0, 1, 0, 0],
          [0, 1, 1, 1, 0]
        ]
      ]);
    }
    // Who asked him: nothing yet; then the way to the army shows, Amr's place goes out and comes back, and his voice
    // asks, before any answer.
    for (const prompt of ["Who asked the Prophet ﷺ this question?", "Who asked the Prophet ﷺ whom he loved most?"]) {
      expect([prompt, shown(prompt, ["the way to the army", "Amr's voice: who is most beloved to you?", loved[0]])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 0]
        ]
      ]);
    }
    // Whom he named after Abu Bakr: his voice answering again, and the light on Abu Bakr's place; then Amr asks again,
    // his voice names Umar, and a warm light comes on Umar's place, before the others he named.
    for (const prompt of ["Whom did he name after Abu Bakr?", "Who came next after Abu Bakr?"]) {
      expect([prompt, shown(prompt, ["his voice, answering again", "Amr's voice: then who?", "his voice: then Umar, and others", ...loved.slice(1), "loved: a warm light on another place he named 1"])]).toEqual([
        prompt,
        [
          [1, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 0]
        ]
      ]);
    }
    // The trustworthy one. His title, and what amin means: nothing yet; then a soft light comes in a place of each far
    // nation, his voice speaks, a ring of care comes about the places by the masjid, a golden light in Abu Ubaydah's
    // place, a small box by it, and a soft glow on the box.
    const trust = ["its trustworthy one: a soft light in a place of a far nation 1", "his voice", "this nation: a ring of care about the places by the masjid", "the trustworthy one of this nation: a golden light in Abu Ubaydah's place", "a trust kept: a small box by Abu Ubaydah's place", "kept safe: a soft glow on the box"];
    for (const prompt of ["The Prophet ﷺ called Abu Ubaydah this Ummah's ____ one.", "What title did the Prophet ﷺ give Abu Ubaydah?", "What does amin mean?"]) {
      expect([prompt, shown(prompt, trust)]).toEqual([prompt, [Array(6).fill(0), Array(6).fill(1)]]);
    }
    // The two refuges. Which two surahs, and what both begin with: the night and its stars; then the dawn comes as a warm
    // light low over the hills, the night goes, places of all come by the homes, and a wide ring of refuge about them.
    const refuge = ["the night, until the dawn", "the stars of the night", "the dawn: a warm light low over the hills", "a place of all, by the homes 1", "refuge for all: a wide ring about every place", "like no others: the two lights, shining"];
    for (const prompt of ["Which two surahs did the Prophet ﷺ praise to Uqbah?", "What do both surahs begin with?", "Which two surahs are these?"]) {
      expect([prompt, shown(prompt, refuge)]).toEqual([
        prompt,
        [
          [1, 1, 0, 0, 0, 1],
          [0, 0, 1, 1, 1, 1]
        ]
      ]);
    }
    // Whether such ayat had been seen before: two soft golden lights by Uqbah's place; then they shine like no others,
    // while the night stays.
    for (const prompt of ["Verses like these had been seen many times before.", "What did the Prophet ﷺ say about Al-Falaq and An-Nas?"]) {
      expect([prompt, shown(prompt, ["two ayat: a soft golden light by his place 1", "two ayat: a soft golden light by his place 2", "like no others: the two lights, shining", "the night, until the dawn"])]).toEqual([
        prompt,
        [
          [1, 1, 0, 1],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // The greatest ayah. What Ayat al-Kursi is the greatest of: nothing yet; then he asks, Ubayy answers, he asks again,
    // Ubayy's voice recites in gold, golden sparks rise, a warm glow comes on Ubayy's place, his voice speaks, and a ring
    // of knowledge comes about it.
    const ayah = ["Ubayy's voice: the ayah, in gold", "the right answer: a warm glow on Ubayy's place", "his voice: may knowledge be pleasant for you", "knowledge: a ring of light about Ubayy's place"];
    const kursi = "Ayat al-Kursi is the greatest ____ in the Quran.";
    expect([shown(kursi, ayah), moved(kursi, "the ayah, recited: a golden spark rising 1", "y")]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -11]
    ]);
    // Which ayah Ubayy named: his voice asking again; then Ubayy's voice recites in gold, golden sparks rise, and a warm
    // glow comes on his place, before the ring of knowledge.
    for (const prompt of ["Which ayah did Ubayy say is the greatest?", "Which is the greatest ayah, in Muslim 810?"]) {
      expect([prompt, shown(prompt, ["his voice, asking again", ...ayah.slice(0, 2), ayah[3]]), moved(prompt, "the ayah, recited: a golden spark rising 4", "y")]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 0]
        ],
        [0, -11]
      ]);
    }
    // What he called Ubayy: nothing yet; then his voice asks, before Ubayy's answer.
    expect(shown("What did the Prophet ﷺ call Ubayy?", ["his voice, asking", "Ubayy's voice, the first time"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Whether he was pleased with the answer: the warm glow on Ubayy's place; then his voice speaks, and a ring of
    // knowledge and small lights come about it.
    expect(shown("The Prophet ﷺ was pleased with Ubayy's answer.", [...ayah.slice(1), "knowledge: a small light about Ubayy's place 1"])).toEqual([
      [1, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // Change it. The first way to change a wrong: three wrongs on the way; then the first place goes to its wrong, the
    // wrong goes, a straight golden line comes where it was, and a light of faith in the place, before any voice.
    const hand = ["a wrong on the way 1", "changed: a straight golden line where the first wrong was", "faith: a light in the first place", "by word: the voice of the second place"];
    for (const [prompt, answer] of [
      ["What is the first way to change a wrong?", "With your hand"],
      ["What is the first way to change a wrong, in Muslim 49?", "With your hand"],
      ["What is the first way to change a wrong, in Muslim 49?", "With the hand"]
    ]) {
      expect([prompt, answer, shown(prompt, hand, answer), moved(prompt, "the first place, going to its wrong", "x")]).toEqual([
        prompt,
        answer,
        [
          [1, 0, 0, 0],
          [0, 1, 1, 0]
        ],
        [0, 11]
      ]);
    }
    // What comes after the hand: the second wrong, and no voice yet; then the second place speaks, the wrong grows faint,
    // and a smaller light of faith comes in the place, before the heart.
    expect(shown("What comes after the hand, if you cannot?", ["a wrong on the way 2", "by word: the voice of the second place", "faith: a smaller light in the second place", "by the heart: a small light in the third place"])).toEqual([
      [1, 0, 0, 0],
      [0.3, 1, 1, 0]
    ]);
    // The weakest of faith: the smaller light in the second place, and the third wrong; then a small light comes in the
    // third place while its wrong stays, and a faint ring comes about the smallest light.
    for (const prompt of ["What is the weakest level of faith?", "What is the weakest faith, in Muslim 49?", "What is the weakest of faith, in Muslim 49?"]) {
      expect([prompt, shown(prompt, ["faith: a smaller light in the second place", "a wrong on the way 3", "by the heart: a small light in the third place", "the weakest of faith: a faint ring about the smallest light"])]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
  });

  it("waits on the scenes of truth sought and told, from Abu Dharr's search to the rain and the stars, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-abu-dharr-seeks", "sign-heart-almost-flew", "sign-heraclius-asks", "sign-mighty-since-umar", "sign-every-right", "sign-first-masjid", "sign-rain-and-stars"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(40);
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
    // Abu Dharr comes to find him. Whom he sent first: the one he sent is still far off and silent; then it comes back
    // to him and speaks, with a warm light by its voice for the good character it saw.
    expect([
      shown("Whom did Abu Dharr send to Makkah first?", ["the voice of the one he sent", "good character, as it saw: a warm light by its voice"]),
      moved("Whom did Abu Dharr send to Makkah first?", "the place of the one he sent, coming back", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 34]
    ]);
    // Who led him: Abu Dharr's place waits in Makkah and Ali's place is not there yet; then Ali's comes by night, and
    // by day it goes to the home with Abu Dharr's following it in.
    expect([
      shown("Who led Abu Dharr to the Prophet ﷺ?", ["Ali's place, coming by night"]),
      moved("Who led Abu Dharr to the Prophet ﷺ?", "Abu Dharr's place", "x"),
      moved("Who led Abu Dharr to the Prophet ﷺ?", "Ali's place, coming by night", "x")
    ]).toEqual([[[0], [1]], [-88, -64], [0, -10]]);
    // What he did on hearing him: no voice yet, and no light of faith; then his voice speaks, and a light of faith comes
    // in Abu Dharr's place.
    expect(shown("What did Abu Dharr do after hearing the Prophet ﷺ?", ["his voice", "Islam: a light of faith in Abu Dharr's place"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Where he called out his Islam: his place is still in the home, silent, with no crowd about it; then it goes back to
    // the Ka'bah and calls out in gold, and the crowd has not come yet.
    for (const prompt of ["Abu Dharr bravely called out his Islam at the ____.", "Where did Abu Dharr declare his Islam aloud?"]) {
      expect([
        prompt,
        shown(prompt, ["Islam: a light of faith in Abu Dharr's place", "the shahadah, called out loud: a golden voice from Abu Dharr's place", "the crowd of Quraysh: a grey place coming close 1"]),
        moved(prompt, "Abu Dharr's place", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [1, 1, 0]
        ],
        [-64, -94]
      ]);
    }
    // Who protected him: al-Abbas's place is not there yet; then the crowd comes close, al-Abbas's place comes over him
    // and speaks, the crowd goes back, and a ring of care comes about Abu Dharr's place.
    expect([
      shown("Who protected him from the angry people?", ["al-Abbas's place, coming over him", "al-Abbas's voice: he is of Ghifar", "kept safe: a ring of care about Abu Dharr's place", "the crowd of Quraysh: a grey place coming close 1"]),
      moved("Who protected him from the angry people?", "al-Abbas's place, coming over him", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0]
      ],
      [-32, 0]
    ]);
    // His tribe: nothing of Ghifar is lit yet; then al-Abbas's voice says he is of Ghifar, the road of their trade to
    // Sham through Ghifar shows, and a soft light comes on the tents of Ghifar, outside Makkah.
    for (const prompt of ["Abu Dharr grew up with the ____ tribe, outside Makkah.", "Abu Dharr grew up with the Quraysh tribe, outside Makkah."]) {
      expect([prompt, shown(prompt, ["al-Abbas's voice: he is of Ghifar", "the road of their trade to Sham, through Ghifar", "Ghifar: a soft light on its tents"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // My heart was about to fly. Which question moved his heart: his voice recites, and nothing is in the air yet; then
    // with the first ayah an empty ring shows in the air, with nothing in it, before the far places of the next ayah.
    expect(shown("Ayah 35: which question made Jubayr's heart nearly fly?", ["his voice, reciting at-Tur", "by nothing: an empty ring in the air, with nothing in it", "themselves: a faint grey place far off 1"])).toEqual([
      [1, 0, 0],
      [1, 1, 0]
    ]);
    // How he felt: nothing in Jubayr's place yet; then a warm light comes in it, a small light lifts from it, and a ring
    // of light comes about it.
    expect([
      shown("How did Jubayr feel at 52:35, per Bukhari 4854?", ["about to fly: a warm light in Jubayr's place", "about to fly: a small light lifting from Jubayr's place", "a ring of light about Jubayr's place"]),
      moved("How did Jubayr feel at 52:35, per Bukhari 4854?", "about to fly: a small light lifting from Jubayr's place", "y")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, -6]
    ]);
    // Whether the ayat helped lead him to Islam: the grey ring of one not yet Muslim is about Jubayr's place; then it
    // goes, and a warm light and a ring of light come about it.
    expect(shown("Hearing these ayahs helped lead Jubayr to Islam.", ["not yet Muslim: a grey ring about Jubayr's place", "about to fly: a warm light in Jubayr's place", "a ring of light about Jubayr's place"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Heraclius asks. Who followed him: no one by the far ring yet; then three small places come by it, the poor, and
    // the places of the next answer have not come yet.
    const poor = ["the poor who follow him: a small place by the far ring 1", "the poor who follow him: a small place by the far ring 2", "the poor who follow him: a small place by the far ring 3", "increasing: another place by the far ring 1"];
    for (const prompt of ["Who followed the Prophet ﷺ, per Abu Sufyan to Heraclius?", "Who mostly followed the Prophet ﷺ, per the answer to Heraclius?"]) {
      expect([prompt, shown(prompt, poor)]).toEqual([prompt, [Array(4).fill(0), [1, 1, 1, 0]]]);
    }
    // Whether they were growing: the three poor places only; then four more come by the far ring.
    const more = [1, 2, 3, 4].map((n) => `increasing: another place by the far ring ${n}`);
    expect(shown("Heraclius also asked if the followers were growing in number.", ["the poor who follow him: a small place by the far ring 3", ...more])).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // What he asked about him, and the enemy who said he never lied: no answer yet, and no light about the far ring;
    // then Abu Sufyan's voice answers, and a warm light comes about the far ring.
    for (const prompt of ["What did Heraclius ask about him ﷺ?", "Even an enemy at that time said he ﷺ never lied."]) {
      expect([prompt, shown(prompt, ["Abu Sufyan's voice, answering 3", "never a lie: a warm light about the far ring"])]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // What the letter invited him to: no letter yet; then its way shows, the letter goes as a golden spark from the far
    // ring to the court, and a soft light comes in the court, before the level band of the word common to them.
    expect([
      shown("What did the letter invite Heraclius to?", ["the letter's way, from the far ring to the court", "the letter, read: a soft light in the court", "a word common to us and you: a level golden band between the two"]),
      moved("What did the letter invite Heraclius to?", "his letter: a golden spark on its way to the court", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, 99]
    ]);
    // To whom the letter with 3:64 went, and the ayah it invited a king with: no letter yet; then it goes to the court,
    // and a level golden band shows between the two, a word common to us and you.
    for (const prompt of ["To whom did the Prophet ﷺ send a letter with 3:64?", "The Prophet ﷺ used an ayah of the Quran to invite a king."]) {
      expect([
        prompt,
        shown(prompt, ["the letter's way, from the far ring to the court", "the letter, read: a soft light in the court", "a word common to us and you: a level golden band between the two"]),
        moved(prompt, "his letter: a golden spark on its way to the court", "x")
      ]).toEqual([prompt, [Array(3).fill(0), Array(3).fill(1)], [0, 99]]);
    }
    // Mighty since Umar. Why he was afraid: the grey shade of fear is over his home, and nothing else yet; then his
    // voice speaks, and faint grey places show far off, a threat.
    expect(shown("Why was Umar afraid after he became Muslim?", ["in fear: a grey shade over Umar's home", "Umar's voice: they will kill me", "a threat far off: a faint grey place 1", "kept safe: a ring of care about Umar's home"])).toEqual([
      [1, 0, 0, 0],
      [1, 1, 0.6, 0]
    ]);
    // Who protected him: no one by his home yet; then al-As's place comes to it, speaks, and a ring of care comes about
    // the home.
    expect([
      shown("Who gave Umar protection that day?", ["al-As's place", "al-As's voice: there is no way to you", "kept safe: a ring of care about Umar's home"]),
      moved("Who gave Umar protection that day?", "al-As's place", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [40, 0]
    ]);
    // What the crowd did: the crowd fills the valley under the shade of fear; then al-As's voice speaks, the crowd goes
    // back the way it came, and the shade goes.
    expect([
      shown("What did the crowd do once Umar was protected?", ["the crowd streaming through the valley: a grey place 1", "al-As's voice: there is no way to him", "in fear: a grey shade over Umar's home"]),
      moved("What did the crowd do once Umar was protected?", "the crowd streaming through the valley: a grey place 1", "x")
    ]).toEqual([
      [
        [1, 0, 1],
        [0, 1, 0]
      ],
      [0, 30]
    ]);
    // What changed when he became Muslim: no glow yet; then a warm glow of strength comes about Umar's place, a light in
    // each place of the Muslims, and a ring of care about them all.
    const strong = ["mighty: a warm glow of strength about Umar's place", "mighty since Umar: a light in a place of the Muslims 1", "mighty since Umar: a light in a place of the Muslims 4", "mighty together: a ring of care about them all"];
    for (const prompt of ["When Umar became Muslim, the Muslims grew ____.", "What changed for the Muslims when Umar became Muslim?", "Umar's Islam made the Muslims weaker."]) {
      expect([prompt, shown(prompt, strong)]).toEqual([prompt, [Array(4).fill(0), Array(4).fill(1)]]);
    }
    // Every right its due. Salman's brother: Salman's place is not there yet; then it comes to Abu ad-Darda's home.
    expect([shown("Who was Salman's brother in faith in Madinah?", ["Salman's place"]), moved("Who was Salman's brother in faith in Madinah?", "Salman's place", "x")]).toEqual([[[0], [1]], [0, -42]]);
    // Why Umm ad-Darda was uncared for: the grey shade about her place, silent; then her voice speaks, before Abu
    // ad-Darda's place has come.
    expect(shown("Why was Umm ad-Darda looking uncared for?", ["uncared for: a grey shade about Umm ad-Darda's place", "Umm ad-Darda's voice: no need of this world", "Abu ad-Darda's place"])).toEqual([
      [1, 0, 0],
      [1, 1, 0]
    ]);
    // What Abu ad-Darda did too much of: his place is not there yet; then it comes, the meal is made and eaten, night
    // comes, it goes to the prayer mat and back, Salman's voice says sleep, and a soft ring of rest comes about it.
    expect([
      shown("What was Abu ad-Darda doing too much of?", ["Abu ad-Darda's place", "the dish, eaten from", "the night", "Salman's voice: sleep", "sleep: a soft ring of rest about Abu ad-Darda's place"]),
      moved("What was Abu ad-Darda doing too much of?", "Abu ad-Darda's place", "x")
    ]).toEqual([
      [Array(5).fill(0), Array(5).fill(1)],
      [0, -32]
    ]);
    // Which three have rights: none of the three lights yet, and Umm ad-Darda's grey shade; then Salman's voice speaks,
    // a golden light comes on the prayer mats, a soft light of rest where Abu ad-Darda slept, and a warm light about Umm
    // ad-Darda's place, her shade gone.
    const rights = ["Salman's voice: each has a right", "your Lord's right: a golden light on the prayer mats", "your self's right: a soft light of rest where Abu ad-Darda slept", "your family's right: a warm light about Umm ad-Darda's place", "uncared for: a grey shade about Umm ad-Darda's place"];
    for (const prompt of ["Which three have rights on you, Salman said?", "Salman said: give each one who has a right its right."]) {
      expect([prompt, shown(prompt, rights)]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1],
          [1, 1, 1, 1, 0]
        ]
      ]);
    }
    // What he said of Salman's advice: still night, and no voice of his; then day comes, Abu ad-Darda's place goes to
    // his golden ring, his voice speaks, and a warm glow comes on Salman's place.
    for (const prompt of ["What did the Prophet ﷺ say about Salman's advice?", "The Prophet ﷺ said Salman was wrong."]) {
      expect([
        prompt,
        shown(prompt, ["the night", "his voice: Salman has spoken the truth", "the truth: a warm glow on Salman's place"]),
        moved(prompt, "Abu ad-Darda's place", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0],
          [0, 1, 1]
        ],
        [-6, 19]
      ]);
    }
    // The first masjid. The first House, and the masjid built first: nothing on the land yet; then the Ka'bah shows,
    // with a soft light and a ring of care about it, before al-Aqsa.
    for (const prompt of ["What is the first House for people, in 3:96?", "Which masjid was built first, per the hadith?"]) {
      expect([prompt, shown(prompt, ["the first: al-Masjid al-Haram, the Ka'bah", "a soft light about the Ka'bah", "about al-Masjid al-Haram: a ring of care", "then al-Masjid al-Aqsa, far off"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ]
      ]);
    }
    // The one that came second: the Ka'bah only; then al-Masjid al-Aqsa shows far off with a soft light about it,
    // before the marks of the years.
    expect(shown("Which masjid came second, per the hadith?", ["the first: al-Masjid al-Haram, the Ka'bah", "then al-Masjid al-Aqsa, far off", "a soft light about al-Masjid al-Aqsa", "forty years: ten small marks 1"])).toEqual([
      [1, 0, 0, 0],
      [1, 1, 1, 0]
    ]);
    // How long between them: no marks yet; then forty small marks show, ten at a time, before the mats.
    const forty = [1, 2, 3, 4].map((n) => `forty years: ten small marks ${n}`);
    for (const prompt of ["How long between the two, in Bukhari 3366?", "How long was between them, per the hadith?"]) {
      expect([prompt, shown(prompt, [...forty, "wherever the prayer reaches you: a small mat with a soft light 1"])]).toEqual([prompt, [Array(5).fill(0), [1, 1, 1, 1, 0]]]);
    }
    // The rain and the stars. What a believer says of the rain, and who truly believes: the two places by the tents,
    // silent; then the first one's voice speaks in gold, a warm light comes in it, and a soft light on the pools, before
    // the second one speaks.
    for (const prompt of ["What should a believer say about rain, per the hadith?", "Who truly believes, per the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["this morning: the first place by the tents", "the first place's voice, in gold: by grace and mercy", "belief: a warm light in the first place", "the water, a mercy: a soft light on the pools", "the second place's voice, in grey: by such a star"])
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ]
      ]);
    }
    // Whether saying a star brought the rain is fine: the bright star high in the sky; then the second one's voice
    // speaks in grey, a grey line goes up from it to the star, a grey shade comes about it, and the star fades.
    expect(shown("Saying a star brought the rain is fine.", ["the second place's voice, in grey: by such a star", "turned to the star: a faint grey line up from the second place", "disbelief: a grey shade about the second place", "one bright star, high in the sky"])).toEqual([
      [0, 0, 0, 1],
      [1, 1, 1, 0]
    ]);
  });

  it("waits on the scenes of good ways with people, from making room to the valley of gold, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-make-room", "sign-rights-of-the-road", "sign-honest-trade", "sign-keep-them-close", "sign-small-gift", "sign-asked-about-blessings", "sign-valley-of-gold"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(40);
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
    // Make room. What he forbade: the gathering sits on its mat; then the one who came goes to the fourth place, and a
    // grey copy of it is made to rise, before its seat is kept for it.
    expect([
      shown("What did the Prophet ﷺ forbid, in Bukhari 6270?", ["made to rise: a grey copy of the fourth place", "the place of the one who came", "the seat kept: a ring of care about the fourth place"]),
      moved("What did the Prophet ﷺ forbid, in Bukhari 6270?", "the place of the one who came", "x"),
      moved("What did the Prophet ﷺ forbid, in Bukhari 6270?", "made to rise: a grey copy of the fourth place", "y")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, -50],
      [0, -7]
    ]);
    // What to do instead, and what 58:11 says when asked to make room: the fourth place's seat kept for it; then the
    // places on the mat spread out, a warm wash shows where room was made, and the one who came sits among them.
    for (const prompt of ["What should we do instead?", "Ayah 11: what should we do when asked to make room?", "Ayahs 7-13: what are they about?"]) {
      expect([
        prompt,
        shown(prompt, ["room made: a warm wash over the mat", "a ring of care about the gathering", "the seat kept: a ring of care about the fourth place"]),
        moved(prompt, "a place on the mat 1", "x"),
        moved(prompt, "a place on the mat 6", "x"),
        moved(prompt, "the place of the one who came", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 1],
          [1, 1, 0]
        ],
        [0, -6],
        [0, 14],
        [-50, -76]
      ]);
    }
    // Ibn Umar: not there yet; then his place comes to the end of the mat, not to the seat left for him, with a warm light.
    expect([
      shown("Ibn Umar disliked taking a seat someone left for him.", ["Ibn Umar's place", "Ibn Umar's place at the end of the mat: a warm light"]),
      moved("Ibn Umar disliked taking a seat someone left for him.", "Ibn Umar's place", "x"),
      value("make-room", "the seat left for Ibn Umar: a faint ring", "opacity", 0.84)
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 32],
      1
    ]);
    // The rights of the road. What he first said of the roads: the places sit by the road; then a grey shade comes over
    // their sitting, before any right of the road shows.
    expect(shown("What did the Prophet ﷺ first say about roads?", ["a grey shade over the sitting by the road", "the road's right: a golden band along it"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // That they said they had to sit there: the grey shade stays while their voice speaks, and goes only with his answer.
    expect([
      shown("The companions first said they had to sit by the roads.", ["their voice: it is where we talk", "a grey shade over the sitting by the road", "the road's right: a golden band along it"]),
      value("rights-of-the-road", "their voice: it is where we talk", "opacity", 0.22)
    ]).toEqual([
      [
        [0, 1, 0],
        [0, 1, 0]
      ],
      1
    ]);
    // The first right, lowering the gaze: one passes on the road; then the faint lines of looking go to the ground.
    expect([
      shown("What is the first right of the road?", ["the gaze lowered: faint lines to the ground", "the salam returned: a golden voice from the places"]),
      moved("What is the first right of the road?", "one passing on the road", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 0]
      ],
      [0, -130]
    ]);
    // Returning the salam, a right of the road: the sack and jug lie on the road; then they are moved to its edge, a second
    // one passes and greets, and the places return its salam.
    for (const prompt of ["Which of these is a right of the road?", "What should you do with greetings on the road?"]) {
      expect([
        prompt,
        moved(prompt, "their sack and jug, at the road's edge", "y"),
        moved(prompt, "a second one passing, who greets", "x"),
        value("rights-of-the-road", "the salam: a golden voice from the one passing", "opacity", 0.71),
        value("rights-of-the-road", "the salam returned: a golden voice from the places", "opacity", 0.74)
      ]).toEqual([prompt, [0, 6.6], [0, 76], 1, 1]);
    }
    // What is not one of its rights: from lowering the gaze to forbidding wrong, every right shows in turn, and the road
    // given its right is warm at the end; selling is not among them.
    expect([
      shown("Which of these is NOT a right of the road?", ["the road's right: a golden band along it", "the road given its right: a warm wash along it"]),
      moved("Which of these is NOT a right of the road?", "one passing on the road", "x"),
      moved("Which of these is NOT a right of the road?", "a third one passing, who turns off", "x")
    ]).toEqual([
      [
        [1, 0],
        [1, 1]
      ],
      [0, -130],
      [0, -110]
    ]);
    // Honest trade. What brings blessing into a sale: the two buyers at their stalls; then the left seller makes the tear
    // in its cloth clear, and a warm glow comes on its stall and its place as the left buyer goes with its sack.
    for (const prompt of ["What brings blessing into a sale?", "What makes a sale blessed, per the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["made clear: a golden ring about the tear", "blessed in their sale: a warm glow on the left stall", "a warm light on the left seller's place", "the blessing wiped out: a grey shade over the right stall"]),
        value("honest-trade", "made clear: a golden ring about the tear", "opacity", 0.44),
        moved(prompt, "the sack the left buyer takes, with its blessing", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0, 1, 1, 0]
        ],
        1,
        [0, -36]
      ]);
    }
    // When they lie and hide: the cover over the right stall's tear, and its faint warm light; then that light goes and a
    // grey shade comes over the right stall as the right buyer goes with its sack.
    for (const prompt of ["What happens if they lie and hide faults?", "What happens if they lie or hide things?"]) {
      expect([
        prompt,
        shown(prompt, ["hidden: a cover over the right stall's tear", "the blessing on the right stall: a faint warm light", "the blessing wiped out: a grey shade over the right stall", "the right buyer's place"]),
        moved(prompt, "the sack the right buyer takes", "x")
      ]).toEqual([
        prompt,
        [
          [1, 1, 0, 1],
          [1, 0, 1, 0]
        ],
        [0, 36]
      ]);
    }
    // Keep them close. How many: no one there yet; then six places come about his place.
    const six = ["Sa'd's place", "Abdullah's place", "one of the six 3", "one of the six 4", "one of the six 5", "one of the six 6"];
    expect(shown("How many believers were there, in the hadith?", six)).toEqual([Array(6).fill(0), Array(6).fill(1)]);
    // Who asked for them to be sent away, and what they wanted: no grey place yet; then the idolaters' grey places come
    // near, and a grey shade comes over the six, before the ring of care.
    for (const prompt of ["Who asked for the poor believers to be sent away, per Muslim 2413?", "What did the idolaters want?"]) {
      expect([
        prompt,
        shown(prompt, ["the idolaters: a grey place 1", "the idolaters: a grey place 2", "the idolaters: a grey place 3", "looked down on: a grey shade over the six", "do not drive them away: a ring of care about the six"]),
        moved(prompt, "the idolaters: a grey place 1", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ],
        [0, -22]
      ]);
    }
    // Whether sending them away was allowed: the grey shade over the six; then it goes, a ring of care comes about them,
    // and the grey places go back.
    expect([
      shown("Allah allowed sending the poor believers away.", ["looked down on: a grey shade over the six", "do not drive them away: a ring of care about the six", "the idolaters: a grey place 1"]),
      moved("Allah allowed sending the poor believers away.", "the idolaters: a grey place 1", "x")
    ]).toEqual([
      [
        [1, 0, 1],
        [0, 1, 0]
      ],
      [-22, 0]
    ]);
    // When they call their Lord: no glow low in the sky yet; then the morning glows in the east and the evening in the
    // west, a golden spark rises from each of the six, and a light comes in the other four.
    expect([
      shown("When do these believers call their Lord, in 6:52?", ["the evening: a soft glow low in the west", "one of the six 3: a light in it", "a warm wash over the six"]),
      value("keep-them-close", "the morning: a soft glow low in the east", "opacity", 0.85),
      moved("When do these believers call their Lord, in 6:52?", "calling on their Lord: a golden spark rising 1", "y")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      1,
      [0, -11]
    ]);
    // A small gift. Whom it was first said to: no one at the doors yet; then a place shows at each home's door, with the
    // way between them, before any gift.
    expect(shown("Whom was Bukhari 2566 first said to?", ["the place at the left home's door", "the place at the next home's door", "the way between the two homes", "the gift: a small dish with a little on it"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 0]
    ]);
    // How to treat a neighbor's small gift, and whose: no gift yet; then a small dish shows at the left door with a grey
    // shade of thinking it too little, the shade goes, the dish is carried to the next home, and a warm light comes on it.
    for (const prompt of ["How should we treat a neighbour's small gift?", "Whose gift should not be looked down on?"]) {
      expect([
        prompt,
        shown(prompt, ["the gift: a small dish with a little on it", "thought too little: a grey shade about the dish", "received: a warm light on the gift"]),
        value("small-gift", "thought too little: a grey shade about the dish", "opacity", 0.4),
        moved(prompt, "the gift: a small dish with a little on it", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 0, 1]
        ],
        1,
        [0, 58]
      ]);
    }
    // Even a sheep's trotter, and that a little is not too little: then a ring comes about the small gift, a warm glow on
    // both homes, and a ring of care about the two.
    for (const prompt of ["What small gift did he name?", "Only expensive gifts are worth thanks.", "Gifts between neighbours build love."]) {
      expect([prompt, shown(prompt, ["even a little: a ring about the gift", "a warm glow on the left home", "a warm glow on the next home", "a ring of care about the two homes"])]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Asked about this blessing. What brought them out: the three places, out of their homes; then their voices answer,
    // and a grey shade of hunger comes about Abu Bakr's and Umar's places, before his own.
    expect(shown("What brought them out of their houses?", ["hunger: a grey shade about Abu Bakr's place", "hunger: a grey shade about Umar's place", "hunger: a grey shade about his place"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // Who fed them: the three, hungry, by their homes; then they go to the Ansari's home, its place comes back with the
    // sweet water, they are honored, and the hunger goes as the dates are brought and eaten.
    expect([
      shown("Who fed them?", ["the Ansari's place, coming back", "the sweet water it fetched, in a waterskin", "honored: a warm wash on the three", "hunger: a grey shade about Abu Bakr's place"]),
      moved("Who fed them?", "a golden ring, his place", "x"),
      moved("Who fed them?", "a cluster of yellow, dry and fresh dates", "x")
    ]).toEqual([
      [
        [0, 0, 0, 1],
        [1, 1, 1, 0]
      ],
      [9.8, 87.8],
      [0, -30]
    ]);
    // What we will be asked about: the dates and water, eaten and drunk; then a soft light comes on each, and a golden ring
    // about this blessing.
    for (const prompt of [
      "What will we be asked about, that Day?",
      "Ayah 8: what will we be asked about that Day?",
      "Ayahs 5-8: what are they about?",
      "After dates and cool water, what did the Prophet ﷺ say?",
      "He said they would be asked about that meal."
    ]) {
      expect([prompt, shown(prompt, ["this blessing: a soft light on the dates", "this blessing: a soft light on the water", "a golden ring about this blessing"])]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // A valley of gold. What one with a valley would want: the first valley, full of gold; then its place goes on, and a
    // second valley it wants shows in dashed gold, with a golden line to it.
    for (const prompt of ["With one valley of gold, what would a person want?", "If man had one valley of gold, what would he want?", "Ayahs 1-4: what are they about?"]) {
      expect([
        prompt,
        shown(prompt, ["a golden glow over the first valley", "a second valley it wants: a dashed golden outline", "wanting more: a golden line to the second valley", "dust: a haze over the land"]),
        moved(prompt, "the place of the one with the valley", "x")
      ]).toEqual([
        prompt,
        [
          [1, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [30, 56]
      ]);
    }
    // What distracts until the grave: the one valley; then the wanting for a second, until dust comes over the land and
    // about its place.
    for (const prompt of ["What distracts people until the grave?", "Ayahs 1-4 say: Wanting more and more distracts you until the grave."]) {
      expect([
        prompt,
        shown(prompt, ["wanting more: a golden line to the second valley", "dust: a haze over the land", "dust about its place"]),
        value("valley-of-gold", "wanting more: a golden line to the second valley", "opacity", 0.45)
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [0, 1, 1]
        ],
        1
      ]);
    }
    // Whether more money fills one: the line of wanting more; then it goes, and only dust fills the land about its place.
    expect(shown("More money always makes people feel full.", ["wanting more: a golden line to the second valley", "dust: a haze over the land", "dust about its place"])).toEqual([
      [1, 0, 0],
      [0, 1, 1]
    ]);
    // Whom Allah forgives: dust about its place; then the dust goes, a light of faith comes in it, and a ring of care.
    expect([
      shown("Whom does Allah forgive, per the hadith?", ["dust about its place", "turned to: a light of faith in its place", "a ring of care about its place"]),
      moved("Whom does Allah forgive, per the hadith?", "the place of the one with the valley", "y")
    ]).toEqual([
      [
        [1, 0, 0],
        [0, 1, 1]
      ],
      [-6, -2]
    ]);
  });


  it("waits on the scenes of worship and devotion, from the straight rows to the Black Stone, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-straight-rows", "sign-sweetest-recitation", "sign-easy-religion", "sign-three-things-to-keep", "sign-asked-about-islam", "sign-greatest-surah", "sign-black-stone"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(30);
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
    // Straight rows. Standing in straight rows, and what he said of the rows: the places of the first row stand a little
    // out of line; then his voice speaks, they come into a straight line, and a golden line comes along it.
    for (const prompt of ["In jamaah, stand in ____ rows, shoulder to shoulder.", "What did the Prophet ﷺ say about rows in prayer?"]) {
      expect([
        prompt,
        shown(prompt, ["the first row made straight: a golden line along it", "the second row made straight: a golden line along it"]),
        moved(prompt, "a place in the first row 1", "x"),
        moved(prompt, "a place in the first row 5", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [-1.6, 0],
        [1.8, 0]
      ]);
    }
    // Why straighten the rows, and that straight rows are part of a correct prayer: both rows stand straight; then the
    // prayer is established, a warm wash comes over the rows, their prayer rises, and a ring of care comes about them.
    for (const prompt of ["Why straighten the rows?", "Straight rows are part of a correct prayer."]) {
      expect([
        prompt,
        shown(prompt, ["the prayer established: a warm wash over the rows", "the prayer of the rows, rising 1", "a ring of care about the rows", "the second row made straight: a golden line along it"]),
        moved(prompt, "the prayer of the rows, rising 3", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ],
        [0, -10]
      ]);
    }
    // The sweetest recitation. In which prayer he recited At-Tin: the fig and the olive show by the row in the night;
    // then a warm glow comes over the row at the Isha prayer, and its prayer rises.
    expect([
      shown("In which prayer did he recite At-Tin?", ["the row at the Isha prayer: a warm glow over it", "the prayer of the row, rising 1", "an olive tree, as the ayah names it"]),
      moved("In which prayer did he recite At-Tin?", "the prayer of the row, rising 1", "y")
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 1]
      ],
      [0, -10]
    ]);
    // What al-Bara said of his voice: the arcs of his voice in the night; then a golden glow comes about it, the arcs
    // widen, a soft golden wash fills the night, and a warm light comes in al-Bara's place.
    expect([
      shown("What did Al-Bara say about his voice?", ["the finest voice: a golden glow about it", "the recitation filling the night: a soft golden wash", "a warm light in al-Bara's place"]),
      moved("What did Al-Bara say about his voice?", "his voice, reciting: golden arcs", "scale")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [1, 1.3]
    ]);
    // The religion is easy. How he described it: the road, empty; then a steady place comes and goes along it, step by
    // step, before anything rushes on.
    for (const prompt of ["How did he describe the religion?", "What did the Prophet ﷺ say about the religion?"]) {
      expect([
        prompt,
        shown(prompt, ["a steady place on the road", "a grey place, rushing on ahead"]),
        moved(prompt, "a steady place on the road", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 0]
        ],
        [0, 20]
      ]);
    }
    // One who overburdens himself, and doing too much too fast: the steady place on the road; then a grey place rushes
    // on ahead, grey loads pile on it, a grey shade comes over it, and it fades, overcome, while the steady place goes
    // on.
    for (const prompt of ["What happens to one who overburdens himself?", "Doing too much too fast is the best way to start."]) {
      expect([
        prompt,
        shown(prompt, ["a grey place, rushing on ahead", "a grey load piled on it 1", "a grey load piled on it 3", "overcome: a grey shade over it"]),
        moved(prompt, "a grey place, rushing on ahead", "x"),
        moved(prompt, "a steady place on the road", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [0.4, 0.4, 0.4, 1]
        ],
        [0, 60],
        [20, 30]
      ]);
    }
    // Three things to keep. How many days a month he advised fasting: the place he advised, before anything is said;
    // then his voice speaks, three golden lights come by it, the first goes up to the months across the sky, three days
    // of each month light up, and a covered dish shows.
    expect([
      shown("How many days a month did he ﷺ advise fasting?", ["the months across the sky: crescents", "three days of a month, fasted 1", "three days of a month, fasted 3", "three days of a month, fasted 6", "a dish, covered: the fast"]),
      value("three-things-to-keep", "the first of the three: a golden light", "opacity", 0.2),
      moved("How many days a month did he ﷺ advise fasting?", "the first of the three: a golden light", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      1,
      [0, 52]
    ]);
    // That Duha was one of the three: the fast kept in the sky; then the second light goes with the place to the prayer
    // mat as the sun climbs to the forenoon, and two sparks of Duha rise.
    for (const prompt of ["Duha was one of the three things he ﷺ advised.", "The advice also had two rakahs of Duha."]) {
      expect([
        prompt,
        shown(prompt, ["the two rak'ahs of Duha, rising 1", "the two rak'ahs of Duha, rising 2"]),
        moved(prompt, "the sun", "y"),
        moved(prompt, "the place of the one he advised", "x"),
        moved(prompt, "the second of the three: a golden light", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [0, -24],
        [0, 40],
        [0, 40]
      ]);
    }
    // When to pray witr: the day, the place at the mat; then night comes, the third light goes to the lit window of the
    // home, the place goes in, one light of witr rises from the home, the window grows dim, and a soft light stays about
    // it through the night.
    for (const prompt of ["When should witr be prayed, by this advice?", "When should witr be prayed, in this advice?"]) {
      expect([
        prompt,
        shown(prompt, ["the night over the land", "a lit window of the home", "a soft light about the home, through the night"]),
        moved(prompt, "the place of the one he advised", "x"),
        value("three-things-to-keep", "the witr: one light rising from the home", "opacity", 0.9)
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 0.35, 1]
        ],
        [40, 76.2],
        1
      ]);
    }
    // Asked about Islam. How many prayers are required: the one from Najd has come near and asked; then a soft band
    // shows in the air, and the five prayers come as five lights.
    expect([
      shown("How many prayers are required daily?", ["a soft band in the air: what he told him", "the five prayers, in the day and the night: a light 1", "the five prayers, in the day and the night: a light 5", "unless he wishes: a dashed light by the five prayers"]),
      value("asked-about-islam", "his voice: five prayers", "opacity", 0.4)
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0]
      ],
      1
    ]);
    // That salah is not extra: nothing yet of what he told him; then the five prayers come, the fast and zakat, all due,
    // and only by each the dashed light of what one does of one's own will.
    expect(shown("Zakat is required; salah is extra charity.", ["the five prayers, in the day and the night: a light 1", "the fast of Ramadan: a crescent", "zakat: a sack and its coins", "unless he wishes: a dashed light by the five prayers", "unless he wishes: a dashed light by zakat"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Zakat due, and charity beyond it of one's own will: the five prayers shown; then zakat comes as a sack and its
    // coins, and, once he asks if there is more, a dashed light by it.
    expect([
      shown("Zakat is required; ____ is extra charity.", ["zakat: a sack and its coins", "unless he wishes: a dashed light by zakat"]),
      value("asked-about-islam", "the five prayers, in the day and the night: a light 5", "opacity", 0.48)
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      1
    ]);
    // What he said of more prayers, and that night prayer is not required: the prayers, the fast and zakat shown; then
    // he asks if there is more, his voice answers no, unless you wish to, and a dashed light comes by each.
    for (const prompt of ["What did he say about more prayers?", "Night prayer is still required for every Muslim."]) {
      expect([
        prompt,
        shown(prompt, ["unless he wishes: a dashed light by the five prayers", "unless he wishes: a dashed light by the fast", "unless he wishes: a dashed light by zakat"]),
        value("asked-about-islam", "his voice: no, unless you wish to", "opacity", 0.73)
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        1
      ]);
    }
    // The greatest surah. Which surah he called the greatest: the two going to the masjid's door with the light of the
    // promise; then Abu Sa'id's voice reminds him, his voice speaks, and seven golden lights come one by one.
    expect([
      shown("Which surah did the Prophet ﷺ call the greatest in the Quran?", ["the seven oft-repeated: a golden light 1", "the seven oft-repeated: a golden light 7", "the great Quran: a great warm glow about them"]),
      value("greatest-surah", "Abu Sa'id's voice, reminding him", "opacity", 0.62)
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      1
    ]);
    // What he was given, what ayahs 80-99 are about, and what the seven oft-repeated are: the two at the masjid's door;
    // then the seven golden lights come and turn about each other, a great warm glow comes about them, and a warm light
    // on the two at the door.
    for (const prompt of ["What was the Prophet ﷺ given with the Quran, in Al-Hijr?", "Ayahs 80-99: what are they about?", "What are the 'seven oft-repeated' verses?"]) {
      expect([
        prompt,
        shown(prompt, ["the seven oft-repeated: a golden light 1", "the seven oft-repeated: a golden light 7", "the great Quran: a great warm glow about them", "a warm light on the two at the door"]),
        moved(prompt, "the seven oft-repeated: a golden light 1", "rotate")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, 102.9]
      ]);
    }
    // The Black Stone. What this teaches of tawhid, and that Umar did not believe the stone had power: Umar's place at
    // the stone; then a plain grey ring shows it is only a stone, a grey mark and a golden mark show by it, and both are
    // struck out.
    for (const prompt of ["What does this teach about tawhid?", "Umar believed the stone had power."]) {
      expect([
        prompt,
        shown(prompt, ["only a stone: a plain grey ring about it", "harm: a grey mark by the stone", "good: a golden mark by the stone", "neither, from the stone: both struck out"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // What Umar said the stone can do, and what he said to it: the plain grey ring about the stone; then a grey mark and
    // a golden mark show by it, and both are struck out.
    for (const prompt of ["What did Umar say the stone can do?", "What did Umar say to the Black Stone?"]) {
      expect([
        prompt,
        shown(prompt, ["harm: a grey mark by the stone", "good: a golden mark by the stone", "neither, from the stone: both struck out", "only a stone: a plain grey ring about it"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Why Umar kissed it: the marks by the stone, struck out; then they go, Umar's place steps back, and a faint golden
    // ring shows his place at the stone, as Umar saw it, with a faint line to it.
    for (const prompt of ["Why did Umar kiss the Black Stone?", "Why did Umar kiss it then?"]) {
      expect([
        prompt,
        shown(prompt, ["his place at the stone, as Umar saw it: a faint golden ring", "Umar seeing it: a faint line", "harm: a grey mark by the stone"]),
        moved(prompt, "Umar's place", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 1],
          [0.75, 1, 0]
        ],
        [32.4, 20]
      ]);
    }
  });

  it("waits on the scenes of heeding, from the one who loved al-Ikhlas to Sa'd, firm and kind, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-loves-al-ikhlas", "sign-night-with-hudhayfah", "sign-ubayy-named", "sign-six-of-shawwal", "sign-six-rights", "sign-the-warner", "sign-firm-and-kind"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(33);
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
    // The one who loved al-Ikhlas. Why he always recited it: his voice asks why; then its voice answers, the light of
    // the surah it loved shows over its place, and a warm glow comes about it.
    expect(shown("Why did the man always recite Al-Ikhlas?", ["its voice: because it describes the Most Merciful", "the surah it loved: a golden light over its place", "its love of the surah: a warm glow about its place", "his voice: ask him why", "loved: a warm light in its place"])).toEqual([
      [0, 0, 0, 1, 0],
      [1, 1, 1, 0, 0]
    ]);
    // What he said of the one who loved it: its voice, and the light of the surah over its place; then his voice says to
    // tell him that Allah loves him, and a warm light and a ring of care come about it.
    for (const prompt of ["What did the Prophet ﷺ say of the man who loved it?", "What did the Prophet ﷺ say about him?"]) {
      expect([
        prompt,
        shown(prompt, ["his voice: tell him", "loved: a warm light in its place", "a ring of care about it", "its voice: because it describes the Most Merciful", "the surah it loved: a golden light over its place"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1, 1],
          [1, 1, 1, 0, 1]
        ]
      ]);
    }
    // A night with Hudhayfah. What he did at an ayah of glory: his recitation, slow; then at an ayah of glory a spark of
    // his glorifying rises, before anything at an asking.
    expect([
      shown("What did he do at ayahs of Allah's glory?", ["at an ayah of glory, his glorifying: a spark rising", "his recitation, slow: soft golden arcs", "at an asking, his asking: a light rising"]),
      moved("What did he do at ayahs of Allah's glory?", "at an ayah of glory, his glorifying: a spark rising", "y")
    ]).toEqual([
      [
        [0, 1, 0],
        [1, 1, 0]
      ],
      [0, -14]
    ]);
    // What he did at an asking and at a seeking of refuge: the spark of his glorifying risen; then at an asking a light
    // rises, and at a seeking of refuge a ring of care comes about his place.
    for (const prompt of ["What did he do at ayahs about asking Allah?", "At ayahs of protection, he sought Allah's protection."]) {
      expect([
        prompt,
        shown(prompt, ["at an asking, his asking: a light rising", "at a seeking of refuge: a ring of care about his place", "at an ayah of glory, his glorifying: a spark rising"]),
        moved(prompt, "at an asking, his asking: a light rising", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 1],
          [1, 1, 1]
        ],
        [0, -14]
      ]);
    }
    // What he said in ruku, and what we say in it: his recitation and what rose at its ayahs; then they go as he bows, a
    // calm light comes, and his voice speaks in ruku, before the line of his bowing grows.
    for (const prompt of ["In ____, we bow and say Subhana Rabbiyal Azim.", "In ruku, we bow and say Subhana Rabbiyal Azim.", "What did the Prophet ﷺ say in ruku?", "We glorify Allah the Most Great in ruku."]) {
      expect([
        prompt,
        shown(prompt, ["his voice in ruku: glory be to my Lord, the Most Great", "at rest bowing: a calm light", "his recitation, slow: soft golden arcs", "at a seeking of refuge: a ring of care about his place", "his bowing, about as long as his standing: a golden line growing"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 1, 1, 0],
          [1, 1, 0, 0, 0]
        ]
      ]);
    }
    // Ubayy named. What Ubayy asked: his voice speaks to Ubayy's place; then it goes, and Ubayy's voice asks, before any
    // answer.
    expect(shown("What did Ubayy ask?", ["Ubayy's voice: did He name me", "his voice: ordered to recite to Ubayy", "his voice: yes", "named: a golden glow about Ubayy's place"])).toEqual([
      [0, 1, 0, 0],
      [1, 0, 0, 0]
    ]);
    // That Ubayy wept: his voice answers yes, and a golden glow about Ubayy's place; then his recitation comes to Ubayy
    // as golden arcs, soft silver glints show as Ubayy weeps, and a warm light comes in his place.
    expect(shown("Ubayy wept when he heard the answer.", ["his recitation to Ubayy: golden arcs", "Ubayy's weeping: soft silver glints", "a warm light in Ubayy's place", "his voice: yes", "named: a golden glow about Ubayy's place"])).toEqual([
      [0, 0, 0, 1, 1],
      [1, 1, 1, 0, 1]
    ]);
    // Six of Shawwal. That Shawwal comes after Ramadan, and how many of its days: Ramadan's crescent lit, with the
    // golden line of its fasted days; then Shawwal's crescent lights up, and six of its days are fasted one by one.
    for (const prompt of ["Shawwal comes right after Ramadan.", "How many days of Shawwal are in the hadith?", "How many fasts in Shawwal does the hadith mention?"]) {
      expect([
        prompt,
        shown(prompt, ["Shawwal: its crescent, lit", "six days of Shawwal, fasted 1", "six days of Shawwal, fasted 6", "Ramadan: its crescent, lit", "the days of Ramadan, fasted: a golden line under its crescent", "as if all the time: a month of the year, lit 1"]),
        value("six-of-shawwal", "six days of Shawwal, fasted 1", "opacity", 0.45),
        value("six-of-shawwal", "six days of Shawwal, fasted 6", "opacity", 0.45)
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 0]
        ],
        1,
        0
      ]);
    }
    // What the reward is like: Ramadan and six of Shawwal fasted; then every month of the year lights up, a golden line
    // goes along the whole year, and a warm light comes in the place of the one who fasted.
    expect([
      shown("What is the reward like?", ["as if all the time: a month of the year, lit 1", "as if all the time: a month of the year, lit 12", "on and on: a golden line along the whole year", "a warm light in the place of the one who fasted", "six days of Shawwal, fasted 6"]),
      moved("What is the reward like?", "on and on: a golden line along the whole year", "scaleX")
    ]).toEqual([
      [
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ],
      [0.02, 1]
    ]);
    // Six rights. How many: the places of two Muslims, before anything is said; then his voice speaks, and six faint
    // rings show in the sky, none lit yet.
    for (const prompt of ["How many rights did the Prophet ﷺ name, of one Muslim over another?", "How many rights does a Muslim have over another in Muslim 2162?"]) {
      expect([
        prompt,
        shown(prompt, ["the six rights: six faint rings", "his voice: the rights are six", "a right kept: a golden light 1", "the place of the other Muslim"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 0, 1]
        ]
      ]);
    }
    // That advice is given sincerely: the meal at its home, two rings lit; then the dish goes, one asks advice, it is
    // answered with golden arcs, and the third ring lights up.
    expect(shown("When a Muslim asks your advice, give it sincerely.", ["advice given: golden arcs", "a right kept: a golden light 3", "a right kept: a golden light 2", "a meal at its home: a dish", "a right kept: a golden light 4"])).toEqual([
      [0, 0, 1, 1, 0],
      [1, 1, 1, 0, 0]
    ]);
    // The right of one who is ill: the sneeze answered with mercy; then a grey shade comes over the one who is ill, the
    // other comes near, a warm glow of the visit comes over them both, and the fifth ring lights up.
    for (const prompt of ["Your friend is ill. Which right does he have?", "Your classmate is sick at home. Which right fits?"]) {
      expect([
        prompt,
        shown(prompt, ["ill: a grey shade over its place", "the visit: a warm glow over them both", "a right kept: a golden light 5", "answered with mercy: golden arcs", "a right kept: a golden light 6"]),
        moved(prompt, "the place of one Muslim", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1, 0],
          [0.4, 1, 1, 0, 0]
        ],
        [54, 52]
      ]);
    }
    // The warner. What he saw: the warner's place has come running to the homes; then far beyond the hills the grey dust
    // of an army shows, his look goes to it, and his voice cries out.
    for (const prompt of ["What did the man in the hadith see?", "What did the warner see, per Bukhari 6482?"]) {
      expect([
        prompt,
        shown(prompt, ["far off: the grey dust of an army", "the warner's look: a faint line to the dust", "the warner's voice: crying out", "the place of the warner, running"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // What happened to those who obeyed: the evening, the warner's voice crying out; then night comes, the windows are
    // lit, three places go out by night along a dashed way, and a ring of care far off shows them saved, while the
    // others stay.
    for (const prompt of ["What happened to those who obeyed the warner?", "What happened to those who obeyed?"]) {
      expect([
        prompt,
        shown(prompt, ["the night over the sky", "the homes at night: lit windows", "the way out by night: a dashed way", "saved: a ring of care far off", "the warner's voice: crying out", "a place that denied 1"]),
        moved(prompt, "a place that obeyed 1", "x"),
        moved(prompt, "a place that obeyed 3", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1, 1],
          [0.95, 1, 1, 1, 0, 1]
        ],
        [0, -52],
        [0, -68]
      ]);
    }
    // Firm and kind. That his mother refused to eat: the home in Makkah, before anything is said; then a grey line comes
    // between her place and Sa'd's, a grey way away from his faith, and a dish and a cup, left untouched and struck out.
    expect(shown("When Sa'd became Muslim, his ____ refused to eat.", ["never to speak to him: a grey line between them", "the way it asked of him: a grey way, away from his faith", "a dish and a cup, left untouched", "refused: a grey stroke across them", "three days: a day passing 1"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 0.6, 1, 1, 0]
    ]);
    // What she wanted him to do: the grey line between them; then a grey way shows, away from his faith, before anything
    // of food or drink.
    expect(shown("What did she want Sa'd to do, in the hadith?", ["the way it asked of him: a grey way, away from his faith", "never to speak to him: a grey line between them", "a dish and a cup, left untouched"])).toEqual([
      [0, 1, 0],
      [0.6, 1, 0]
    ]);
    // What she refused: the grey way; then a dish and a cup show, left untouched, and a grey stroke goes across them.
    for (const prompt of ["What did Sa'd's mother do to make him leave Islam?", "What did Sa'd's mother refuse, in the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["a dish and a cup, left untouched", "refused: a grey stroke across them", "the way it asked of him: a grey way, away from his faith"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0.6],
          [1, 1, 0.6]
        ]
      ]);
    }
    // That 29:8 was revealed about Sa'd: the three days passed; then the grey line between them goes and a golden line
    // of goodness comes; the grey way shows again and fades as the golden ring of Sa'd's faith grows, with a golden glow
    // about his place.
    expect([
      shown("Ayah 29:8 was revealed about Sa'd.", ["goodness, as enjoined: a golden line between them", "his faith kept: a golden glow about Sa'd's place", "never to speak to him: a grey line between them", "the way it asked of him: a grey way, away from his faith", "three days: a day passing 3"]),
      moved("Ayah 29:8 was revealed about Sa'd.", "Sa'd's faith: a golden ring about his place", "scale")
    ]).toEqual([
      [
        [0, 0, 1, 0.6, 1],
        [1, 1, 0, 0, 1]
      ],
      [1, 1.25]
    ]);
    // What was revealed about her, and what to do if a parent orders shirk: the three days passed; then the golden line
    // of goodness comes between them, the grey way fades as Sa'd's faith grows, the dish and the cup go, and Sa'd's
    // place comes near hers, with a warm glow about them both.
    for (const prompt of ["What did Allah reveal about her?", "What should you do if a parent orders shirk?"]) {
      expect([
        prompt,
        shown(prompt, ["goodness, as enjoined: a golden line between them", "kindness in this world: a warm glow about them both", "the way it asked of him: a grey way, away from his faith", "a dish and a cup, left untouched", "the place of the one who swore"]),
        moved(prompt, "Sa'd's place", "x"),
        moved(prompt, "Sa'd's faith: a golden ring about his place", "scale")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0.6, 1, 0.55],
          [1, 1, 0, 0, 1]
        ],
        [0, -16],
        [1, 1.25]
      ]);
    }
  });

  it("waits on the scenes of what is kept, from the most generous to the last surah Umm al-Fadl heard, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-most-generous", "sign-dawud-recites", "sign-good-kept", "sign-last-ten-itikaf", "sign-my-disciple", "sign-help-your-brother", "sign-last-surah-heard"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(29);
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
    // The most generous. When he was most generous: by day, sacks of his giving go to the homes, a warm light coming in
    // each; then the evening comes, Ramadan's crescent shows, he gives still more, and a warm wash comes over the homes.
    for (const prompt of ["When was the Prophet ﷺ most generous?", "Ramadan is a good time to give more."]) {
      expect([
        prompt,
        shown(prompt, ["Ramadan's crescent", "the evening sky", "most generous in Ramadan: a warm wash over the homes", "given: a warm light in a home 3", "given: a warm light in a home 1"]),
        moved(prompt, "his giving: a sack going to a home 5", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1]
        ],
        [0, 87]
      ]);
    }
    // That Jibril went over the Quran with him: night after night of Ramadan, his window lit; then his recitation of the
    // Quran comes as golden arcs from his window, with a golden glow about his home, and a golden line grows over
    // Madinah.
    expect([
      shown("Every Ramadan, Jibril went over the ____ with the Prophet ﷺ.", ["his recitation of the Quran: golden arcs from his window", "the Quran: a golden glow about his home", "the Quran, gone over together: a golden line growing over Madinah", "the nights of Ramadan: his window, lit", "night after night of Ramadan: the moon, full"]),
      moved("Every Ramadan, Jibril went over the ____ with the Prophet ﷺ.", "the Quran, gone over together: a golden line growing over Madinah", "scaleX")
    ]).toEqual([
      [
        [0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1]
      ],
      [0.02, 1]
    ]);
    // Dawud's recitation. How fast he recited: his recitation, made easy, in golden arcs, no saddle on yet; then his
    // voice orders his mounts saddled, and he recites, a golden line of his recitation growing from end to end and
    // shining at its end before the saddle comes on his second mount.
    for (const prompt of ["How fast could Dawud recite the Zabur?", "When did Dawud finish reciting the Zabur?"]) {
      expect([
        prompt,
        shown(prompt, ["his recitation of the Zabur: a golden line growing", "finished: a golden light at its end", "a saddle cloth on his first mount", "a saddle on his second mount", "Dawud's recitation, made easy: golden arcs"]),
        moved(prompt, "his recitation of the Zabur: a golden line growing", "scaleX"),
        value("dawud-recites", "finished: a golden light at its end", "opacity", 0.66),
        value("dawud-recites", "a saddle on his second mount", "opacity", 0.66)
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1],
          [1, 1, 1, 1, 0]
        ],
        [0.02, 1],
        1,
        0
      ]);
    }
    // How he earned his food: his two mounts saddled, his recitation finished; then a coat of mail, the work of his
    // hands, forms band by band and shines, and a dish comes by his place, with a warm glow about it.
    expect(shown("How did Dawud earn his food, in the hadith?", ["his handiwork: a coat of mail", "the rings of the coat, band 1", "the rings of the coat, band 4", "the rings shining", "a dish by Dawud's place", "a warm glow about Dawud's place", "a saddle on his second mount", "finished: a golden light at its end"])).toEqual([
      [0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    // The good kept. What Hakim asked: his place and Hakim's, under the dimness of the days of ignorance, before
    // anything is asked; then Hakim's voice asks, its good deeds come back one by one, each leaving a faint golden
    // light, and a faint dashed ring shows over Hakim's place: is there any reward?
    expect(shown("What did Hakim ask the Prophet ﷺ?", ["Hakim's voice: asking", "charity: a faint golden light, kept", "freeing: a faint golden light, kept", "keeping ties: a faint golden light, kept", "any reward: a faint dashed ring over Hakim's place", "the days of ignorance: a dimness over all", "his voice: you became Muslim with that good"], "If his good before Islam counted")).toEqual([
      [0, 0, 0, 0, 0, 1, 0],
      [1, 0.5, 0.5, 0.5, 1, 1, 0]
    ]);
    // The same, in the words of the other lesson.
    expect(shown("What did Hakim ask the Prophet ﷺ?", ["Hakim's voice: asking", "charity: a faint golden light, kept", "freeing: a faint golden light, kept", "keeping ties: a faint golden light, kept", "any reward: a faint dashed ring over Hakim's place", "the days of ignorance: a dimness over all", "his voice: you became Muslim with that good"], "If his old good deeds count")).toEqual([
      [0, 0, 0, 0, 0, 1, 0],
      [1, 0.5, 0.5, 0.5, 1, 1, 0]
    ]);
    // Its good deeds before Islam: Hakim's voice asking; then a sack goes to the poor home, a chain opens and the place
    // it held goes free, and a golden line joins two homes of kin, each leaving a faint golden light.
    for (const prompt of ["Hakim kept good ties with his family before Islam.", "Which good deed did Hakim do before Islam?"]) {
      expect([
        prompt,
        shown(prompt, ["keeping ties: a golden line between two homes", "charity: a faint golden light, kept", "freeing: a faint golden light, kept", "keeping ties: a faint golden light, kept", "freeing: the chain opens, one side", "Hakim's voice: asking"]),
        moved(prompt, "charity: a sack going to the poor home", "x"),
        moved(prompt, "a place held, then freed", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1, 1],
          [1, 0.5, 0.5, 0.5, 0, 1]
        ],
        [0, 30.4],
        [0, 9]
      ]);
    }
    // What he answered: the three faint lights, and the faint ring over Hakim's place; then his voice answers, the
    // dimness lifts, the lights brighten and come to Hakim's place, the ring over it turns golden, and a warm glow and a
    // ring of care come about it. (Another scene asks a question in the same words, so this one is found by its answer.)
    expect(shown("What did he ﷺ answer?", ["his voice: you became Muslim with that good", "kept: a golden ring over Hakim's place", "a warm glow about Hakim's place", "a ring of care about Hakim's place", "charity: a faint golden light, kept", "any reward: a faint dashed ring over Hakim's place", "the days of ignorance: a dimness over all"], "You became Muslim with all that good")).toEqual([
      [0, 0, 0, 0, 0.5, 1, 1],
      [1, 1, 1, 1, 1, 0, 0]
    ]);
    // That the good done before Islam is not thrown away: the same moment.
    expect([
      shown("The good a person did before Islam is thrown away.", ["his voice: you became Muslim with that good", "kept: a golden ring over Hakim's place", "a warm glow about Hakim's place", "a ring of care about Hakim's place", "charity: a faint golden light, kept", "any reward: a faint dashed ring over Hakim's place", "the days of ignorance: a dimness over all"]),
      moved("The good a person did before Islam is thrown away.", "keeping ties: a faint golden light, kept", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0.5, 1, 1],
        [1, 1, 1, 1, 1, 0, 0]
      ],
      [0, 30.6]
    ]);
    // The last ten nights. That he did i'tikaf in the last ten of Ramadan: the masjid at night, his place in it, before
    // any night passes; then the ten lights of the last ten nights come one by one, and sparks of his worship rise.
    expect([
      shown("The Prophet ﷺ did i'tikaf in the last ten days of Ramadan.", ["the last ten nights: a light 1", "the last ten nights: a light 10", "a golden ring, his place in the masjid", "where he prayed: a soft golden glow stays"]),
      moved("The Prophet ﷺ did i'tikaf in the last ten days of Ramadan.", "his worship: a spark rising 3", "y")
    ]).toEqual([
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0]
      ],
      [0, -13]
    ]);
    // That he did not do i'tikaf only once: the masjid at night, before any night passes; then the ten nights pass with
    // sparks of his worship, as he would do until Allah took him: his ring fades gently, and a soft golden glow stays
    // where he prayed.
    expect(shown("He ﷺ did i'tikaf only once.", ["the last ten nights: a light 1", "the last ten nights: a light 10", "a golden ring, his place in the masjid", "where he prayed: a soft golden glow stays"])).toEqual([
      [0, 0, 1, 0],
      [0.35, 0.35, 0, 1]
    ]);
    // Who kept doing i'tikaf after him: the soft golden glow where he prayed, the lights dim; then the ten lights come
    // again, the places of his household come in at the door one by one, sparks of their worship rise, and a warm glow
    // comes over the masjid.
    expect([
      shown("Who kept doing i'tikaf after he ﷺ passed away?", ["a place of his household 1", "a place of his household 4", "a warm glow over the masjid", "the last ten nights: a light 1", "the last ten nights: a light 10", "where he prayed: a soft golden glow stays", "a golden ring, his place in the masjid"]),
      moved("Who kept doing i'tikaf after he ﷺ passed away?", "a place of his household 4", "x"),
      moved("Who kept doing i'tikaf after he ﷺ passed away?", "their worship: a spark rising 4", "y")
    ]).toEqual([
      [
        [0, 0, 0, 0.35, 0.35, 1, 0],
        [1, 1, 1, 1, 1, 1, 0]
      ],
      [0, 25.6],
      [0, -11]
    ]);
    // My disciple. What he asked for at the Trench: the trench, and the tents of the parties far off, before anything is
    // said; then his voice asks, and a faint dashed way shows toward the tents.
    expect(shown("What did the Prophet ﷺ ask for at the Trench?", ["his voice: who will bring me news of the parties", "the errand: a faint dashed way toward the parties", "az-Zubayr's voice: I"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // How many times az-Zubayr answered: his voice asking, the way toward the tents; then az-Zubayr's place steps out
    // and answers, his voice asks again, and it steps to the edge of the trench and answers again.
    expect([
      shown("How many times did Az-Zubayr say 'I will'?", ["az-Zubayr's voice: I", "his voice, again: who will bring me news", "az-Zubayr's voice, again: I", "his voice: who will bring me news of the parties", "the place of a disciple: a faint dashed ring beside him"]),
      moved("How many times did Az-Zubayr say 'I will'?", "az-Zubayr's place", "x"),
      moved("How many times did Az-Zubayr say 'I will'?", "az-Zubayr's place", "y"),
      value("my-disciple", "az-Zubayr's voice: I", "opacity", 0.31),
      value("my-disciple", "his voice, again: who will bring me news", "opacity", 0.41)
    ]).toEqual([
      [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0]
      ],
      [0, -8],
      [0, -12.4],
      1,
      1
    ]);
    // That every prophet has a disciple: az-Zubayr's place at the edge of the trench, answering again; then his voice
    // speaks, and a faint dashed ring shows beside him, the place of a disciple, before it goes to az-Zubayr.
    expect([
      shown("Every prophet had a disciple, per the hadith.", ["his voice: each has a disciple, and mine", "the place of a disciple: a faint dashed ring beside him", "az-Zubayr's voice, again: I", "my disciple: a golden ring about az-Zubayr's place"]),
      moved("Every prophet had a disciple, per the hadith.", "the place of a disciple: a faint dashed ring beside him", "x")
    ]).toEqual([
      [
        [0, 0, 1, 0],
        [1, 1, 0, 0]
      ],
      [0, 0]
    ]);
    // What he called az-Zubayr: az-Zubayr's place at the edge of the trench, answering again; then his voice speaks, the
    // place of a disciple shows beside him and goes to az-Zubayr's place, turning golden about it, a golden line joins
    // them, and a warm glow comes about az-Zubayr's place.
    expect([
      shown("What did the Prophet ﷺ call Az-Zubayr?", ["his voice: each has a disciple, and mine", "the place of a disciple: a faint dashed ring beside him", "my disciple: a golden ring about az-Zubayr's place", "close to him: a golden line between them", "a warm glow about az-Zubayr's place", "az-Zubayr's voice, again: I"]),
      moved("What did the Prophet ﷺ call Az-Zubayr?", "the place of a disciple: a faint dashed ring beside him", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0]
      ],
      [0, 22]
    ]);
    // Whom he called his disciple: the trench and the tents, before anything is said, so no name shows; then the whole
    // story plays, and at its end the place of a disciple has gone to az-Zubayr's place and turned golden about it, with
    // a golden line between them.
    expect([
      shown("Whom did the Prophet ﷺ call his disciple?", ["my disciple: a golden ring about az-Zubayr's place", "close to him: a golden line between them", "a warm glow about az-Zubayr's place", "his voice: who will bring me news of the parties", "the errand: a faint dashed way toward the parties"]),
      moved("Whom did the Prophet ﷺ call his disciple?", "az-Zubayr's place", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1]
      ],
      [0, -8]
    ]);
    // Help your brother. Whom to help: his place by the masjid, and two places, before anything is said; then his voice
    // speaks, harsh grey arcs go from one place to the other, and a grey shade comes over the one wronged.
    expect(shown("Whom should you help, per Bukhari 2444?", ["his voice: help, wronged or doing wrong", "the wronging: harsh grey arcs", "wronged: a grey shade over its place", "the place of one doing wrong", "its voice, asking"])).toEqual([
      [0, 0, 0, 1, 0],
      [1, 1, 1, 1, 0]
    ]);
    // How to help the one doing wrong: the one wronged helped, a warm glow over it, and the asking, a faint dashed way
    // to the one doing wrong; then his voice answers, the place goes and stands by the one doing wrong, a golden ring
    // holds it back, its grey arcs stop, its place is grey no more, and a warm glow comes over them all.
    for (const prompt of ["How do you help a brother who is wronging others?", "How do you help a brother who wrongs others, per Bukhari 2444?", "Your friend is bullying someone. What fits this lesson?", "Helping a brother means always taking his side.", "Stopping someone from doing wrong is a way of helping him."]) {
      expect([
        prompt,
        shown(prompt, ["his voice: by holding it back", "held back: a golden ring about its place", "set right: its place", "set right: a warm glow over them all", "the wronging: harsh grey arcs", "the place of one doing wrong", "how to help the one doing wrong: a faint dashed way to it", "helped: a warm glow over the one wronged"]),
        moved(prompt, "the place of one who helps", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1, 1, 1, 1],
          [1, 1, 1, 1, 0, 0, 0, 1]
        ],
        [22, 49]
      ]);
    }
    // The last surah she heard. Who reminded Umm al-Fadl of it: their home in Madinah, before anything is recited; then
    // the place of Ibn Abbas recites al-Mursalat in golden arcs, with a soft golden light, her voice speaks, a soft glow
    // comes about her place, and a faint line goes from it to the masjid.
    expect(shown("Who reminded Umm al-Fadl of it?", ["Ibn Abbas's recitation of al-Mursalat: golden arcs", "al-Mursalat: a soft golden light", "Umm al-Fadl's voice", "reminded: a soft glow about her place", "her remembering: a faint line to the masjid", "the evening sky"])).toEqual([
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0]
    ]);
    // That it was the last surah she heard from him: her voice and her remembering, a faint line to the masjid, by day;
    // then the recitation ends, evening comes, the sun goes down, the masjid's door is lit, and his place is a golden
    // ring at it, before his recitation in the prayer.
    expect([
      shown("Al-Mursalat was the last surah she heard from the Prophet ﷺ.", ["Ibn Abbas's recitation of al-Mursalat: golden arcs", "the evening sky", "the masjid's door, lit", "a golden ring, his place at the masjid", "his recitation in the Maghrib prayer: golden arcs", "her remembering: a faint line to the masjid"]),
      moved("Al-Mursalat was the last surah she heard from the Prophet ﷺ.", "the sun, going down", "y")
    ]).toEqual([
      [
        [1, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1]
      ],
      [0, 22]
    ]);
    // In which prayer: her remembering, by day, the sun high; then evening comes and the sun goes down, the masjid's
    // door is lit, his recitation comes as golden arcs in the Maghrib prayer, the sun sets, dusk comes, a warm light
    // stays at the masjid, and the first star shows.
    expect([
      shown("In which prayer was it the last surah Umm al-Fadl heard?", ["the evening sky", "the masjid's door, lit", "his recitation in the Maghrib prayer: golden arcs", "dusk over the sky", "the first star", "a warm light at the masjid"]),
      moved("In which prayer was it the last surah Umm al-Fadl heard?", "the sun, going down", "y")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1]
      ],
      [0, 44]
    ]);
  });

  it("waits on the scenes of mercy, from Umamah in his prayer to a prayer between two calls, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-umamah-in-prayer", "sign-more-merciful", "sign-abu-ayyub-house", "sign-miqdad-promise", "sign-leave-that-call", "sign-abu-bakr-forgives", "sign-between-two-calls"];
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
    // Umamah in his prayer. Whom he carried: by the masjid, his place and a small place held up with him; then a warm
    // glow comes about Umamah's place, Abu Qatadah's place sees it, a spark of his prayer rises, and a golden ring of
    // kin comes about the two, before his sujud.
    for (const prompt of ["Whom did the Prophet ﷺ carry while praying?", "Whom did the Prophet ﷺ carry in prayer?"]) {
      expect([
        prompt,
        shown(prompt, ["gentle: a warm glow about Umamah's place", "Abu Qatadah, seeing: a faint line to his place", "his own: a golden ring of kin about the two", "his sujud: a soft golden glow on the ground at his place"]),
        moved(prompt, "his prayer: a spark rising", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [0, -11]
      ]);
    }
    // That he was gentle with children: a warm glow comes about Umamah's place as he prays carrying her, before the ring
    // of kin.
    expect(shown("The Prophet ﷺ was gentle with children.", ["gentle: a warm glow about Umamah's place", "Abu Qatadah, seeing: a faint line to his place", "his own: a golden ring of kin about the two"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // What he did in sujud: Umamah's place held up with him, the ring of kin about the two; then her place comes down to
    // the ground beside him, a soft golden glow lies at his place, and a spark of his sujud rises.
    for (const prompt of ["What did he do when he went into sujud?", "What did he do when prostrating?"]) {
      expect([
        prompt,
        shown(prompt, ["his sujud: a soft golden glow on the ground at his place", "his own: a golden ring of kin about the two"]),
        moved(prompt, "Umamah's place, small, held up with him", "x"),
        moved(prompt, "Umamah's place, small, held up with him", "y"),
        moved(prompt, "his sujud: a spark rising", "y")
      ]).toEqual([
        prompt,
        [
          [0, 1],
          [1, 0]
        ],
        [0, 5],
        [0, 6.8],
        [0, -11]
      ]);
    }
    // More merciful. Whom he compared with Allah's mercy waits at the scene's start, so no mother and no child show
    // before it is answered; then the captives are brought in, her place goes to the small place she found and holds it
    // close, the voices ask and answer, and his voice speaks: a soft warm light comes over all the land, and a small
    // warm light about every place.
    expect([
      shown("Who did he ﷺ compare with Allah's mercy?", ["brought in: the place of a captive 1", "brought in: a small place among the captives 1", "among them: her place", "the small place she found", "held close: a warm glow about the two", "his voice: more merciful", "mercy: a soft warm light over all the land", "mercy: a small warm light about every place"]),
      moved("Who did he ﷺ compare with Allah's mercy?", "among them: her place", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      [16, 29.6]
    ]);
    // Would she throw her child into the fire: her place and the small place held close; then his voice asks, a faint
    // line going from him to her, and their voices answer: no.
    expect([
      shown("Would the mother throw her child into a fire?", ["his voice: would she throw it", "his look: a faint line to her", "their voices: no 1", "their voices: no 2", "held close: a warm glow about the two", "his voice: more merciful"]),
      value("more-merciful", "his voice: would she throw it", "opacity", 0.56)
    ]).toEqual([
      [
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 0]
      ],
      1
    ]);
    // That Allah's mercy is greater than a mother's: their voices answering no; then his voice speaks, a soft warm light
    // comes over all the land, and a small warm light about every place.
    expect(shown("Allah's mercy is even greater than a mother's.", ["his voice: more merciful", "mercy: a soft warm light over all the land", "mercy: a small warm light about every place", "their voices: no 1"])).toEqual([
      [0, 0, 0, 1],
      [1, 1, 1, 0]
    ]);
    // The house of Abu Ayyub. Why Abu Ayyub was upset: his ring below, Abu Ayyub's place above, by day; then night
    // comes, Abu Ayyub's voice speaks, and their places move aside, its voice with it.
    expect([
      shown("Why was Abu Ayyub upset?", ["the night over the sky", "stars of the night", "Abu Ayyub's voice: we walk above his head"]),
      moved("Why was Abu Ayyub upset?", "Abu Ayyub's place", "x"),
      moved("Why was Abu Ayyub upset?", "the place of his household", "x"),
      moved("Why was Abu Ayyub upset?", "Abu Ayyub's voice: we walk above his head", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [0.95, 1, 1]
      ],
      [0, -15.6],
      [0, -18],
      [0, -15.6]
    ]);
    // That he moved upstairs: at night, their places aside above; then the day comes, they go down the stair, and his
    // ring goes up.
    expect([
      shown("In the end, the Prophet ﷺ moved upstairs.", ["the night over the land", "Abu Ayyub's voice: we walk above his head"]),
      moved("In the end, the Prophet ﷺ moved upstairs.", "a golden ring, his place", "x"),
      moved("In the end, the Prophet ﷺ moved upstairs.", "a golden ring, his place", "y"),
      moved("In the end, the Prophet ﷺ moved upstairs.", "Abu Ayyub's place", "y")
    ]).toEqual([
      [
        [1, 1],
        [0, 0]
      ],
      [0, 6],
      [0, -20],
      [0, 20]
    ]);
    // Why he did not eat the food: his ring above, no dish yet; then a dish with garlic goes up to him and comes back,
    // and a faint ring shows about it.
    expect([
      shown("Why did the Prophet ﷺ not eat the food?", ["food for him: a dish with garlic", "not eaten: a faint ring about the dish"]),
      value("abu-ayyub-house", "food for him: a dish with garlic", "y", 0.59)
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      -20
    ]);
    // Whether garlic is forbidden: the dish back, a faint ring about it; then Abu Ayyub's place goes up, its voice asks,
    // and his voice answers.
    expect([
      shown("Is garlic forbidden?", ["Abu Ayyub's voice: is it forbidden", "his voice: no, but I dislike it", "not eaten: a faint ring about the dish"]),
      value("abu-ayyub-house", "Abu Ayyub's voice: is it forbidden", "opacity", 0.81),
      moved("Is garlic forbidden?", "Abu Ayyub's place", "x"),
      moved("Is garlic forbidden?", "Abu Ayyub's place", "y")
    ]).toEqual([
      [
        [0, 0, 1],
        [0, 1, 0]
      ],
      1,
      [-8, 12],
      [20, 0]
    ]);
    // What Abu Ayyub said: his voice answering; then Abu Ayyub's voice speaks, and a warm glow comes over the upper
    // floor.
    expect(shown("What did Abu Ayyub say?", ["Abu Ayyub's voice: I dislike what you dislike", "a warm glow over the upper floor", "his voice: no, but I dislike it"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // Al-Miqdad's promise. Whose words he would not repeat: al-Miqdad's place come to him; then its voice speaks.
    expect(shown("Whose words did Al-Miqdad refuse to repeat?", ["al-Miqdad's voice: we will not say, but we will stand", "his joy: a warm light about his place"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Where they would fight: al-Miqdad's voice speaking; then its place goes to his right, another place to his left,
    // and two more before him and behind him.
    expect([
      shown("Where did Al-Miqdad say they would fight?", ["al-Miqdad's voice: we will not say, but we will stand", "his joy: a warm light about his place"]),
      moved("Where did Al-Miqdad say they would fight?", "al-Miqdad's place", "y"),
      moved("Where did Al-Miqdad say they would fight?", "a place of the Muslims, to his left", "y"),
      moved("Where did Al-Miqdad say they would fight?", "a place of the Muslims, before him", "x"),
      moved("Where did Al-Miqdad say they would fight?", "a place of the Muslims, behind him", "x")
    ]).toEqual([
      [
        [1, 0],
        [1, 0]
      ],
      [0.6, 2.6],
      [0, -6.2],
      [0, 50],
      [0, 38]
    ]);
    // How he took it: the places about him; then al-Miqdad's voice ends, a warm light comes about his place, and a
    // golden ring of care about them all.
    for (const prompt of ["His words made the Prophet's ﷺ face shine with joy.", "How did the Prophet ﷺ react, per Ibn Mas'ud?"]) {
      expect([
        prompt,
        shown(prompt, ["his joy: a warm light about his place", "with him all about: a golden ring of care", "al-Miqdad's voice: we will not say, but we will stand"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 1],
          [1, 1, 0]
        ]
      ]);
    }
    // Leave that call. What each called out: one struck, a grey shade over its place; then each calls out in harsh grey
    // arcs, the places of its own side come to it, and a grey shade shows between the two sides.
    expect(shown("What did each man call out?", ["O Ansar: harsh grey arcs", "O Muhajirun: harsh grey arcs", "called to his side: a place of the Ansar 1", "called to his side: a place of the Muhajirun 1", "split: a grey shade between the two sides", "hurt: a grey shade over its place"])).toEqual([
      [0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1]
    ]);
    // What he called it: the two sides calling out; then his voice asks, and a faint line goes from them to him.
    expect(shown("What did the Prophet ﷺ call their shouting?", ["his voice: what is this call of ignorance", "he heard it: a faint line from them to him", "O Ansar: harsh grey arcs"])).toEqual([
      [0, 0, 1],
      [1, 1, 1]
    ]);
    // What he told them, and that Muslims should not split: the two sides apart, calling out; then the grey arcs stop,
    // the shades fade, the two sides come together about the water, and a warm glow comes over them all.
    for (const prompt of ["What did he tell them to do with it?", "Muslims should not split into groups against each other."]) {
      expect([
        prompt,
        shown(prompt, ["O Ansar: harsh grey arcs", "O Muhajirun: harsh grey arcs", "split: a grey shade between the two sides", "hurt: a grey shade over its place", "together again: a warm glow over them all"]),
        moved(prompt, "called to his side: a place of the Ansar 1", "x"),
        moved(prompt, "called to his side: a place of the Muhajirun 1", "x")
      ]).toEqual([
        prompt,
        [
          [1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1]
        ],
        [0, -6],
        [0, 6]
      ]);
    }
    // Abu Bakr forgives. Whom he had been helping: the two homes; then a sack goes from Abu Bakr's home to Mistah's,
    // then another, and a golden line of kin shows between the two homes.
    expect([
      shown("Whom had Abu Bakr been helping?", ["kin: a golden line between the two homes", "his oath: Abu Bakr's voice"]),
      moved("Whom had Abu Bakr been helping?", "his spending: a sack going to Mistah's home 1", "x"),
      moved("Whom had Abu Bakr been helping?", "his spending: a sack going to Mistah's home 2", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 0]
      ],
      [0, 93],
      [0, 93]
    ]);
    // Whom he swore to stop helping: the two homes; then the sacks go to Mistah's home, his voice swears, a sack stays
    // by his door, and the line of kin turns grey.
    expect([
      shown("Which relative did Abu Bakr swear to stop helping?", ["his oath: Abu Bakr's voice", "held back: a sack by his door", "kin, cut: a grey line between the two homes", "kin: a golden line between the two homes"]),
      moved("Which relative did Abu Bakr swear to stop helping?", "his spending: a sack going to Mistah's home 2", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0]
      ],
      [0, 93]
    ]);
    // What the generous should do: his oath, the line of kin grey; then the ayah comes as golden arcs as he recites it
    // at the masjid, with a golden light.
    expect(shown("Ayah 22: what should the generous do?", ["the ayah, as he recites it: golden arcs", "the ayah: a golden light at the masjid", "his oath: Abu Bakr's voice"])).toEqual([
      [0, 0, 1],
      [1, 1, 1]
    ]);
    // What the ayah asks: the ayah recited; then a faint golden line goes from the masjid to Abu Bakr's place.
    expect(shown("What does Allah ask in 24:22?", ["to Abu Bakr: a faint golden line from the masjid", "the ayah, as he recites it: golden arcs"])).toEqual([
      [0, 1],
      [1, 1]
    ]);
    // What Abu Bakr said: the ayah come to him; then his oath ends, his voice answers in golden arcs, and a warm glow
    // comes about his place.
    expect(shown("What did Abu Bakr say when the ayah came?", ["Abu Bakr's voice: yes, I love to be forgiven", "forgiving: a warm glow about Abu Bakr's place", "his oath: Abu Bakr's voice", "the ayah, as he recites it: golden arcs"])).toEqual([
      [0, 0, 1, 1],
      [1, 1, 0, 0]
    ]);
    // That he gave again: the sack held back by his door, the line of kin grey; then the sack goes to Mistah's home, the
    // line of kin is golden again, and a warm light comes in Mistah's home.
    for (const prompt of ["Abu Bakr stopped helping Mistah forever.", "After ayah 22, what did Abu Bakr do for Mistah?"]) {
      expect([
        prompt,
        shown(prompt, ["held back: a sack by his door", "kin, cut: a grey line between the two homes", "kin, kept: a golden line between the two homes again", "given again: a warm light in Mistah's home"]),
        moved(prompt, "held back: a sack by his door", "x")
      ]).toEqual([
        prompt,
        [
          [1, 1, 0, 0],
          [0, 0, 1, 1]
        ],
        [0, 93]
      ]);
    }
    // A prayer between two calls. When this prayer is: the masjid and the homes; then the call to prayer rings out,
    // places come to the masjid, his voice speaks, a small golden light comes, and sparks of prayer rise, before the
    // iqamah.
    expect([
      shown("When is this extra prayer?", ["a place come to the masjid 1", "his voice: between every two calls, a prayer", "the first time: a small golden light", "the call to prayer, ring 1", "the iqamah, ring 1"]),
      value("between-two-calls", "the call to prayer, ring 1", "opacity", 0.1),
      moved("When is this extra prayer?", "a prayer between the calls: a spark rising 1", "y")
    ]).toEqual([
      [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0]
      ],
      1,
      [0, -11]
    ]);
    // How many times he said it: his voice, said once, one small light; then his voice stops and speaks again, twice
    // more, a small golden light coming each time.
    expect([
      shown("How many times did he ﷺ say it?", ["the first time: a small golden light", "the second time: a small golden light", "the third time: a small golden light"]),
      value("between-two-calls", "his voice: between every two calls, a prayer", "opacity", 0.37),
      value("between-two-calls", "his voice: between every two calls, a prayer", "opacity", 0.42),
      value("between-two-calls", "his voice: between every two calls, a prayer", "opacity", 0.465)
    ]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      0,
      1,
      0
    ]);
    // That it is for whoever wishes: three lights; then a faint ring shows about the place that sits, sparks rise from
    // the other three, the iqamah rings, and the places come into a row.
    for (const prompt of ["This prayer is a must for everyone.", "This prayer is for whoever wants to pray it."]) {
      expect([
        prompt,
        shown(prompt, ["for whoever wishes: a faint ring about the one who sits", "the iqamah, ring 1"]),
        value("between-two-calls", "for whoever wishes: a faint ring about the one who sits", "opacity", 0.77),
        moved(prompt, "for whoever wishes: a spark rising 1", "y"),
        moved(prompt, "a place come to the masjid 4", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [0, 1]
        ],
        1,
        [0, -11],
        [0, -6]
      ]);
    }
  });

  it("waits on the scenes of home and prayer, from a gift to the nearest door to the siwak with every prayer, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-nearest-door", "sign-two-lights", "sign-abu-umayr-bird", "sign-family-spending", "sign-answer-the-call", "sign-supper-first", "sign-siwak-every-prayer"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(26);
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
    // A gift to the nearest door. Which neighbour comes first: her voice asks, and faint dashed ways go to both doors;
    // then his voice answers, a golden way goes to the nearer door, her place and her gift go to it, a warm light comes
    // at its door, and a warm glow about the place next door.
    for (const prompt of ["Which neighbor comes first for a gift?", "Which neighbour gets the gift first?", "The nearest neighbour has the most right to our kindness."]) {
      expect([
        prompt,
        shown(prompt, ["his voice: to the one whose door is nearer", "the nearer door: a golden way to it", "a gift at the nearer door: a warm light", "a warm glow about the place next door", "which one: a faint dashed way to the further door"]),
        moved(prompt, "her gift: a dish of food", "x"),
        moved(prompt, "her place", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 1],
          [1, 1, 1, 1, 0]
        ],
        [0, 35.4],
        [0, 34]
      ]);
    }
    // Two lights on a dark night. What lit their way: the two places leave his home in the dark; then two lights like
    // lamps come before them and go on with them, lighting the way.
    expect([
      shown("What lit the way for the two companions?", ["like a lamp, lighting the way before one of the two", "like a lamp, lighting the way before the other", "home: a lit window far off"]),
      moved("What lit the way for the two companions?", "like a lamp, lighting the way before one of the two", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, 30]
    ]);
    // When they parted: the two places together, each light before them; then their ways part, and one light goes with
    // each of them.
    expect([
      moved("What happened when the two men parted?", "the place of one of the two, going home", "y"),
      moved("What happened when the two men parted?", "like a lamp, lighting the way before one of the two", "y"),
      moved("What happened when the two men parted?", "the place of the other, going home", "x"),
      moved("What happened when the two men parted?", "like a lamp, lighting the way before the other", "x")
    ]).toEqual([
      [-1, -9.6],
      [-1, -9.6],
      [50, 79],
      [30, 59]
    ]);
    // Abu Umayr's little bird. What it teaches about him: Abu Umayr's small place and his little bird; then his voice
    // speaks to the small place, a warm line goes from him to it, and a warm glow comes about the two as the bird hops
    // along.
    expect([
      shown("What does this teach about the Prophet ﷺ?", ["playing: a warm glow about the two", "his voice: O Abu Umayr", "his look: a faint warm line to the small place"]),
      value("abu-umayr-bird", "his voice: O Abu Umayr", "opacity", 0.4),
      value("abu-umayr-bird", "his look: a faint warm line to the small place", "opacity", 0.4),
      moved("What does this teach about the Prophet ﷺ?", "his little bird, the nughayr", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 0, 0]
      ],
      1,
      1,
      [33.6, 42.6]
    ]);
    // Spending on family. That spending on your own family is a charity: waits at the scene's start, his place far from
    // his home with a sack; then he comes home, the sack goes in, a small golden light of hope comes above him, a golden
    // ring comes about the sack, a spark of charity rises, and a warm light comes in his home.
    expect([
      moved("Spending on your own ____ is a charity too.", "food for his family: a sack", "x"),
      shown("Spending on your own ____ is a charity too.", ["hoping for its reward: a small golden light above his place", "a charity: a golden ring about the sack", "a charity: a warm light in his home"]),
      moved("Spending on your own ____ is a charity too.", "a charity: a spark rising from the sack", "y")
    ]).toEqual([
      [0, -90.8],
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, -11]
    ]);
    // What makes it count: the sack gone in; then a small golden light of hope comes above his place, and a golden ring
    // about him, before the charity.
    expect(shown("What makes it count?", ["hoping for its reward: a small golden light above his place", "hoping for its reward: a golden ring about his place", "a charity: a golden ring about the sack"])).toEqual([
      [0, 0, 0],
      [1, 1, 0]
    ]);
    // What it counts as: the light of hope above his place; then a golden ring comes about the sack, a spark of charity
    // rises from it, and a warm light comes in his home.
    expect([
      shown("Spending on your family, hoping for reward, counts as what?", ["a charity: a golden ring about the sack", "a charity: a warm light in his home", "hoping for its reward: a small golden light above his place"]),
      moved("Spending on your family, hoping for reward, counts as what?", "a charity: a spark rising from the sack", "y")
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 1]
      ],
      [0, -11]
    ]);
    // When it is rewarded: the charity at his home; then coins spent for Allah's sake go to his home, a spark of reward
    // rises, and a warm glow comes about his place.
    for (const prompt of ["When is it rewarded?", "Is spending on family rewarded?"]) {
      expect([
        prompt,
        shown(prompt, ["spent for His sake: a coin going home 1", "spent for His sake: a coin going home 2", "rewarded for it: a warm glow about his place"]),
        moved(prompt, "spent for His sake: a coin going home 1", "x"),
        moved(prompt, "rewarded for it: a spark rising", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, -30],
        [0, -11]
      ]);
    }
    // Even a morsel: his place by its glow of reward; then he goes to her place, a date goes to her, a warm glow comes
    // about her place, and a spark of reward rises.
    for (const prompt of ["What small act is rewarded in the hadith?", "What small example did the Prophet ﷺ give?"]) {
      expect([
        prompt,
        shown(prompt, ["a warm glow about her place", "rewarded for it: a warm glow about his place"]),
        value("family-spending", "a morsel: a date going to her place", "opacity", 0.76),
        value("family-spending", "a morsel: a date going to her place", "opacity", 0.85),
        moved(prompt, "his place, coming home", "x"),
        moved(prompt, "rewarded even for a morsel: a spark rising", "y")
      ]).toEqual([
        prompt,
        [
          [0, 1],
          [1, 0]
        ],
        0,
        1,
        [-56, -66],
        [0, -11]
      ]);
    }
    // Answering the call. What to say when you hear the adhan: the call rings out over the masjid with the caller's
    // voice; then voices by the homes answer after the caller, line by line.
    for (const prompt of ["When you hear the adhan, repeat its ____ quietly.", "When you hear the adhan, repeat its jokes quietly.", "What should you do when you hear the adhan?", "While the adhan is called, what do you say?"]) {
      expect([
        prompt,
        shown(prompt, ["answering, after the caller: a voice by the homes 1", "answering, after the caller: a voice by the homes 4", "the call to prayer, ring 1", "the caller's voice"]),
        value("answer-the-call", "answering, after the caller: a voice by the homes 1", "opacity", 0.19),
        value("answer-the-call", "answering, after the caller: a voice by the homes 1", "opacity", 0.23)
      ]).toEqual([
        prompt,
        [
          [0, 0, 1, 1],
          [1, 1, 1, 1]
        ],
        1,
        0
      ]);
    }
    // When the du'a is said: the call ringing and the voices answering; then the call ends, a faint ring shows about the
    // one who says the du'a, and its words come as golden arcs, a spark rising.
    expect([
      shown("We say the du'a when the adhan is finished.", ["the call to prayer, ring 1", "answering, after the caller: a voice by the homes 1", "the one who says the du'a: a faint ring", "the du'a: golden arcs"]),
      moved("We say the du'a when the adhan is finished.", "the du'a: a spark rising 1", "y")
    ]).toEqual([
      [
        [1, 1, 0, 0],
        [0, 0, 1, 1]
      ],
      [0, -11]
    ]);
    // What the one who says it receives: the du'a in golden arcs, and a warm light at the masjid's door; then a golden
    // ring of care and a warm glow come about the place: his intercession, due.
    for (const prompt of ["What does the one who says it receive?", "What does the Prophet ﷺ promise the one who says this dua?"]) {
      expect([
        prompt,
        shown(prompt, ["his intercession, due: a golden ring of care about the place", "his intercession, due: a warm glow about the place", "the du'a: golden arcs", "the prayer to be established: a warm light at the door of the masjid"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 1, 1],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Supper first. What comes first: supper served on the cloth with three dates on the dish, and the iqamah ringing at
    // the masjid; then the dates are eaten one by one, a golden ring of ease comes about the cloth, and a warm glow over
    // it.
    for (const prompt of ["If food is ready, eat first so you can ____ in salah.", "If supper is served at Iqamah, what comes first?"]) {
      expect([
        prompt,
        shown(prompt, ["a date on the dish 1", "a date on the dish 3", "supper first: a golden ring of ease about the cloth", "supper first: a warm glow over the cloth", "the iqamah, ring 1"]),
        value("supper-first", "a date on the dish 1", "opacity", 0.72),
        value("supper-first", "a date on the dish 3", "opacity", 0.8)
      ]).toEqual([
        prompt,
        [
          [1, 1, 0, 0, 1],
          [0, 0, 1, 1, 1]
        ],
        0,
        1
      ]);
    }
    // The siwak with every prayer. Why he did not order it: waits at the scene's start, his ring by the masjid and the
    // places of his ummah about it; then a golden ring of his care comes about them, more places come from the homes,
    // and a wider ring comes about them all, before any siwak shows.
    for (const prompt of ["Why did he ﷺ not order siwak before every prayer?", "Why did he ﷺ not order it for every prayer?"]) {
      expect([
        prompt,
        shown(prompt, ["his care: a golden ring about them", "his care: a wider ring about them all", "and on all: a place coming from the homes 1", "a siwak by each place 1"]),
        moved(prompt, "and on all: a place coming from the homes 1", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 0]
        ],
        [-26, 0]
      ]);
    }
    // That the siwak before prayer is a loved sunnah: the places in his care; then a siwak shows by each place, and
    // before each of the five prayers a soft light comes on every siwak, a spark rises from the masjid, and a small
    // golden light stays in the sky.
    for (const prompt of ["Using the siwak before prayer is a loved sunnah.", "Using siwak before prayer is a loved sunnah."]) {
      expect([
        prompt,
        shown(prompt, ["a siwak by each place 1", "a siwak by each place 8", "prayer 1: a small golden light left in the sky", "prayer 5: a small golden light left in the sky"]),
        value("siwak-every-prayer", "before each prayer: a soft light on every siwak", "opacity", 0.54),
        moved(prompt, "prayer 5: a spark rising from the masjid", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        1,
        [0, -11]
      ]);
    }
  });

  it("waits on the scenes of the table, from seven dates each to a date in the street, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-seven-dates", "sign-two-dates", "sign-boy-on-right", "sign-after-eating", "sign-one-sheet", "sign-never-faulted", "sign-date-in-street"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(22);
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
    // Seven dates each. How many each one got: the places sit in a row by the basket; then a handful of seven dates goes
    // from the basket to each place in turn.
    expect([
      shown("How many dates did each companion get?", ["seven dates for each: a handful 1", "seven dates for each: a handful 4", "his seven: a good date 1"]),
      moved("How many dates did each companion get?", "seven dates for each: a handful 1", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [-24.2, 0]
    ]);
    // Which date he liked most: the four places with their dates; then his seven come, one of them dry and grey with a
    // faint ring about it, and a warm glow comes about that date.
    expect([
      shown("Which date did Abu Hurairah like the most?", ["his seven: one dry and hard", "dry and hard: a faint ring about it", "none pleased him more: a warm glow about the dry date"]),
      moved("Which date did Abu Hurairah like the most?", "his seven: one dry and hard", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [-82.2, 0]
    ]);
    // That he was happy with it: the dry date by his place; then a warm glow comes about it and about his place, the
    // other six are gone, and the dry one goes on, little by little.
    expect([
      shown("Abu Hurairah was happy with the hard date.", ["none pleased him more: a warm glow about the dry date", "a warm glow about the place of the one who tells it", "his seven: a good date 1", "his seven: one dry and hard"]),
      value("seven-dates", "his seven: one dry and hard", "scale", 1)
    ]).toEqual([
      [
        [0, 0, 1, 1],
        [1, 1, 0, 1]
      ],
      0.6
    ]);
    // Two dates at once. What Ibn Umar told them not to do: his place by the cloth; then his voice speaks, two dates go
    // up together from the middle dish, and a grey ring comes about them.
    expect([
      shown("What did Ibn Umar tell people not to do?", ["Ibn Umar's voice: do not take two at once", "two at once: a grey ring about them", "Ibn Umar's place, passing by"]),
      moved("What did Ibn Umar tell people not to do?", "two dates together, at once", "y")
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 1]
      ],
      [0, -2.4]
    ]);
    // When it is fine: the two dates back on the dish; then the middle place's voice asks the place beside it, a warm
    // glow comes about that place, and the two dates go to the middle place.
    for (const prompt of ["When is it fine to take two dates at once?", "Good table manners mean thinking of others too."]) {
      expect([
        prompt,
        shown(prompt, ["the middle place's voice: may I take two?", "permission: a warm glow about the place beside it", "with permission: a warm glow about the middle place"]),
        moved(prompt, "two dates together, at once", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ],
        [0, -4.4]
      ]);
    }
    // The one on his right. Who sat on his right: the cup at his place; then a small place comes and sits on his right,
    // with a faint ring about it, before the elders come.
    expect([
      shown("Who sat on the Prophet's ﷺ right?", ["on his right: the small place, the youngest there", "on his right: a faint ring about the small place", "on his left: an elder's place 1"]),
      moved("Who sat on the Prophet's ﷺ right?", "on his right: the small place, the youngest there", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [10, 0]
    ]);
    // What he did first: the elders seated on his left; then his voice asks the small place, and a faint dashed way goes
    // from the cup to the elders, while the cup stays at his place.
    expect([
      shown("What did the Prophet ﷺ do first?", ["his voice: may I give it to the elders?", "may I give it: a faint dashed way from the cup to the elders", "the small place's voice: I will not give my share"]),
      moved("What did the Prophet ﷺ do first?", "a cup, brought to him", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, 0]
    ]);
    // That the right has the first turn: his voice asks the small place, the small place answers, and the cup goes to
    // it, with a warm glow about it.
    expect([
      shown("The right side has the first turn when serving.", ["he gave it to him: a warm glow about the small place", "his voice: may I give it to the elders?"]),
      moved("The right side has the first turn when serving.", "a cup, brought to him", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 0]
      ],
      [0, 17.4]
    ]);
    // Praise when the meal is done. When he said it: waits at the scene's start, the meal on its sheet; then the dish
    // and the cup are gone, the sheet is taken away into his home, and his voice speaks.
    for (const prompt of ["When did the Prophet ﷺ say Al-hamdu lillahi kathiran tayyiban?", "When did the Prophet ﷺ say this praise?", "Thanking Allah after food is a sunnah."]) {
      expect([
        prompt,
        shown(prompt, ["the meal on the sheet: a dish", "his dining sheet, taken away", "his voice: the praise"]),
        moved(prompt, "his dining sheet, taken away", "x")
      ]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [0, 0, 1]
        ],
        [0, -29.8]
      ]);
    }
    // What its words mean: the sheet gone; then his voice speaks, a spark of praise rises, and three small golden lights
    // come one after another.
    expect([
      shown("What does Al-hamdu lillah kathiran mean?", ["his voice: the praise", "much, good and blessed: a small golden light 1", "much, good and blessed: a small golden light 3"]),
      moved("What does Al-hamdu lillah kathiran mean?", "praise: a spark rising", "y")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, -11]
    ]);
    // What kind of praise: his voice speaking; then three small golden lights come one after another.
    expect(shown("What kind of praise is it?", ["much, good and blessed: a small golden light 1", "much, good and blessed: a small golden light 2", "much, good and blessed: a small golden light 3", "his voice: the praise"])).toEqual([
      [0, 0, 0, 1],
      [1, 1, 1, 1]
    ]);
    // A little food on one leather sheet. Where the food was put: a faint ring about each sack; then a leather sheet is
    // spread out, and a little from each sack goes onto it.
    expect([
      shown("Where was all the food put together?", ["a leather sheet, spread out", "heaped on the sheet: what was left 1", "heaped on the sheet: what was left 5", "his blessing on it: a soft golden light over the heap"]),
      moved("Where was all the food put together?", "heaped on the sheet: what was left 1", "x"),
      value("one-sheet", "a leather sheet, spread out", "scaleX", 0.47)
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0]
      ],
      [-35.4, 0],
      1
    ]);
    // What he did before they took it: the heap on the sheet; then his place comes to the sheet, his voice speaks, a
    // spark of du'a rises, and a soft golden light comes over the heap.
    expect([
      shown("What did he ﷺ do before the people took the food?", ["his voice: a du'a", "his blessing on it: a soft golden light over the heap", "with their vessels: a bowl 1"]),
      moved("What did he ﷺ do before the people took the food?", "a golden ring, his place", "y")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 0]
      ],
      [0, 3]
    ]);
    // Whether it was enough: the bowls at the sheet; then each goes back full, with a warm glow about each place.
    expect([
      shown("There was not enough food for everyone.", ["till all had enough: a bowl filled 1", "till all had enough: a bowl filled 5", "till all had enough: a warm glow about a place 1", "till all had enough: a warm glow about a place 5", "with their vessels: a bowl 1"]),
      moved("There was not enough food for everyone.", "with their vessels: a bowl 1", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ],
      [33.8, 0]
    ]);
    // Food he never found fault with. Whether he found fault: waits at the scene's start, his place at the cloth; then
    // two dishes are brought, and a calm warm glow comes about his place.
    expect(shown("Did he ﷺ ever criticize food?", ["a dish brought to him", "another dish brought to him", "never found fault: a calm warm glow about his place"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // What he did with food he did not like: the first dish eaten; then the other dish goes gently aside, whole, with a
    // faint ring about it.
    expect([
      shown("What did he ﷺ do with food he did not like?", ["he left it: a faint ring about the other dish", "another dish brought to him", "he ate it: the bread is gone"]),
      moved("What did he ﷺ do with food he did not like?", "another dish brought to him", "x")
    ]).toEqual([
      [
        [0, 1, 0],
        [1, 1, 0]
      ],
      [0, 12]
    ]);
    // That we can follow it: waits at the scene's start; then the dishes come, a calm warm glow comes about his place,
    // the first dish is eaten, and the other goes aside, whole.
    expect(shown("We can follow this at every meal.", ["never found fault: a calm warm glow about his place", "he ate it: a warm glow about the first dish", "he left it: a faint ring about the other dish"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // A date in the street. Why he did not eat it: his place by the date; then his voice speaks, and a faint dashed way
    // goes from the date to the heap of charity dates by the masjid.
    expect(shown("Why didn't he ﷺ eat it?", ["his voice: if it were not from the charity", "from the charity: a faint dashed way from the heap to the date", "he found it: a faint ring about the date"])).toEqual([
      [0, 0, 1],
      [1, 1, 1]
    ]);
    // Being careful with what is doubtful: his place by the date; then the way to the charity dates comes, and his place
    // goes on, leaving the date where it lay.
    expect([
      shown("Being careful with doubtful things is from the Sunnah.", ["from the charity: a faint dashed way from the heap to the date", "a date in the street"]),
      moved("Being careful with doubtful things is from the Sunnah.", "a golden ring, his place, along the street", "x")
    ]).toEqual([
      [
        [0, 1],
        [1, 1]
      ],
      [44, 70]
    ]);
  });

  it("waits on the scenes of fasting and Ramadan, from eating until the second call to leaving false speech, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-suhur-two-calls", "sign-wool-toys", "sign-generous-wind", "sign-fast-on-a-journey", "sign-friday-alone", "sign-fast-with-faith", "sign-false-speech"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(26);
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
    // Eating until the second call. That Bilal's call did not start the fast: waits at the scene's start, the households
    // at the meal before dawn; then Bilal's call at night rings out, the dates on the dishes are eaten, and the water is
    // drunk.
    expect([
      value("suhur-two-calls", "Bilal's voice: the call at night", "opacity", 0.1),
      shown("Bilal's call at night meant the fast had started.", ["eat: a date on the dish by home 1, 1", "eat: a date on the dish by home 2, 2", "drink: the water in the cup by home 1", "drink: the water in the cup by home 2"])
    ]).toEqual([
      1,
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ]
    ]);
    // Whose call ended the meal: the households eating, Ibn Umm Maktum's place on the roof; then a faint ring of waiting
    // comes about his place, a place goes to tell him that morning has come, and his call rings out at dawn; the meal is
    // gone, and a soft golden ring comes about each place.
    expect([
      shown("Whose adhan told them to stop eating?", ["Ibn Umm Maktum's voice: the second call", "the second call, at dawn, ring 1", "the meal before dawn, by home 1: a cloth", "the fast has begun: a soft golden ring about a place 1"]),
      value("suhur-two-calls", "waiting: a faint ring about Ibn Umm Maktum's place", "opacity", 0.53),
      moved("Whose adhan told them to stop eating?", "the one who tells him: a place going to the masjid", "x")
    ]).toEqual([
      [
        [0, 0, 1, 0],
        [1, 1, 0, 1]
      ],
      1,
      [0, -48]
    ]);
    // Toys of wool. That children can be helped to fast: the places of the villages, each with a soft golden ring; then
    // a soft golden ring comes about each small place, toys of wool come, and when a small place cries for food a toy
    // goes to it, with a warm glow as it plays.
    expect([
      shown("Children can be helped to practise fasting little by little.", ["their little ones fasting: a soft golden ring about a small place 1", "a toy of wool 1", "a toy of wool 2", "playing: a warm glow about the small place and its toy"]),
      moved("Children can be helped to practise fasting little by little.", "a toy of wool 1", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -11.2]
    ]);
    // What they made for them: the little ones fasting, each with a soft golden ring; then two toys of wool come, and
    // one goes to a small place that cries for food.
    expect([
      shown("What did the Ansar make for their fasting children?", ["a toy of wool 1", "a toy of wool 2", "playing: a warm glow about the small place and its toy"]),
      value("wool-toys", "a small place's voice: crying for food", "opacity", 0.74),
      moved("What did the Ansar make for their fasting children?", "a toy of wool 1", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      1,
      [0, -11.2]
    ]);
    // When they ate: a small place playing with its toy; then the sun sets, dates and cups come by the homes, and a warm
    // glow comes over the villages.
    expect([
      shown("When did the children get to eat?", ["time to break the fast: a dish of dates by home 1", "time to break the fast: a cup by home 1", "the evening sky", "breaking the fast: a warm glow over the villages"]),
      moved("When did the children get to eat?", "the sun, going over the day", "y")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 0.9, 1]
      ],
      [-22, 12]
    ]);
    // More generous than the blowing wind. When he was most generous: by day, a sack gone from his door to a home; then
    // night comes over the sky and the land, with the new moon of Ramadan and the stars, and a light comes in his
    // window.
    expect(shown("When was he ﷺ at his most generous?", ["night over the sky", "the new moon of Ramadan", "stars of the night", "a lit window in his home"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ]);
    // Who met him every night: the night of Ramadan over his home; then small lights come five by five, for every night
    // of the month. No angel is drawn: the words name Jibril.
    expect(shown("Who met him ﷺ every night of Ramadan?", ["every night of Ramadan: small lights, five by five 1", "every night of Ramadan: small lights, five by five 6"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // What he did each night: the nights of Ramadan as small lights; then his voice recites the Quran in golden arcs,
    // and a soft light comes at his door.
    expect(shown("What did he ﷺ do with Jibril each night?", ["his voice: reciting the Quran, golden arcs", "reciting: a soft light at his door"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // Fasting on a journey. What he told the traveler: Hamzah's voice asks; then his voice answers, and a soft golden
    // ring, a cup and a warm glow over the two come: either, as he wishes.
    expect(shown("What did he ﷺ tell the traveler?", ["Hamzah's voice: shall I fast on a journey?", "his voice: fast if you wish, or do not", "if you wish, fast: a soft golden ring", "if you wish, do not: a cup", "either, as he wishes: a warm glow over the two"])).toEqual([
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1]
    ]);
    // That a traveler may choose and is not blamed: Hamzah's voice asks; then his voice answers with a choice, they all
    // go on along the road, a soft golden ring comes about two places, fasting, dates and a cup by two others, and a
    // warm dashed way goes from the fasting to the others.
    expect([
      value("fast-on-a-journey", "if you wish, fast: a soft golden ring", "opacity", 0.33),
      shown("A traveler may choose to fast or not, and is not blamed.", ["the one fasting: a soft golden ring about a place 1", "the one not fasting: dates and a cup by a place 1", "no blame: a warm dashed way from the fasting to the others"]),
      moved("A traveler may choose to fast or not, and is not blamed.", "a golden ring, his place", "x")
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 40]
    ]);
    // Whether they blamed each other: they have gone on along the road together; then two places are fasting and two are
    // not, a warm dashed way goes from the fasting to the others and another comes back, and a warm glow and a golden
    // ring of care come over them all.
    expect(shown("On journeys, did they blame each other about fasting?", ["the one fasting: a soft golden ring about a place 1", "no blame: a warm dashed way from the fasting to the others", "nor any blame back: a warm dashed way from the others to the fasting", "together on the journey: a warm glow over them all", "together: a golden ring of care about them all"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Not Friday alone. Which day: waits at the scene's start, the days of the week in a row; then the voice of the one
    // who asks and the voice of the one asked come, a soft golden ring comes about Friday, and a grey dashed ring about
    // it on its own.
    for (const prompt of ["Which day should not be fasted alone?", "Which day should not be fasted on its own?"]) {
      expect([
        prompt,
        shown(prompt, ["a fast on Friday: a soft golden ring about its day", "on its own: a grey dashed ring about it"]),
        value("friday-alone", "the one asked: a voice: yes", "opacity", 0.2)
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        1
      ]);
    }
    // That the warning is about Friday on its own: the one asked has answered; then a soft golden ring and a grey dashed
    // ring come about Friday, and once a day before it is joined to it by a golden line, the grey ring fades.
    expect([
      value("friday-alone", "on its own: a grey dashed ring about it", "opacity", 0.43),
      shown("The warning is about fasting Friday on its own.", ["on its own: a grey dashed ring about it", "a day before it: a soft golden ring about its day", "joined: a golden line from the day before to Friday"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [0, 1, 1]
      ]
    ]);
    // That a day before it is fine: Friday with its soft golden ring and a grey dashed ring; then a soft golden ring
    // comes about the day before it, a golden line joins it to Friday, and the grey ring fades.
    expect(shown("Fasting Thursday and Friday together is fine.", ["a day before it: a soft golden ring about its day", "joined: a golden line from the day before to Friday", "on its own: a grey dashed ring about it"])).toEqual([
      [0, 0, 1],
      [1, 1, 0]
    ]);
    // What else to fast: Friday with a grey dashed ring on its own; then the day before it gets a soft golden ring and a
    // golden line, and then the day after it, with a warm glow over the two days.
    expect([
      value("friday-alone", "a day before it: a soft golden ring about its day", "opacity", 0.69),
      shown("You want to fast on a Friday. What else?", ["a day after it: a soft golden ring about its day", "joined: a golden line from Friday to the day after", "two days together: a warm glow over them"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // Fasting with faith. How to fast: the days of Ramadan as small lights, and a soft golden ring about the place of
    // one who fasts; then a golden ring of faith comes about it.
    expect(shown("How should you fast Ramadan?", ["out of faith: a golden ring about the place", "hoping for its reward: a small golden light above the place"])).toEqual([
      [0, 0],
      [1, 0]
    ]);
    // Which two things go with it: the place of one who fasts; then a golden ring of faith comes about it, and a small
    // golden light of hope above it.
    expect(shown("Which two things must go with the fast?", ["out of faith: a golden ring about the place", "hoping for its reward: a small golden light above the place"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // That the promise is for faith and hope: the place of one who fasts, with grey shades of past sins about it; then a
    // golden ring of faith and a small golden light of hope come, the shades fade one by one, and a warm glow comes
    // about the place.
    expect(shown("Fasting only to look good gets the same promise.", ["out of faith: a golden ring about the place", "hoping for its reward: a small golden light above the place", "past sins: a grey shade 1", "forgiven: a warm glow about the place"])).toEqual([
      [0, 0, 1, 0],
      [1, 1, 0, 1]
    ]);
    // What it brings: the place with its ring of faith, its light of hope and five grey shades of past sins; then the
    // shades fade one by one, a warm glow comes about the place, and a spark rises.
    for (const prompt of ["Fasting Ramadan with faith and hope brings what?", "What does Allah forgive for whoever fasts this way?"]) {
      expect([
        prompt,
        shown(prompt, ["past sins: a grey shade 1", "past sins: a grey shade 5", "forgiven: a warm glow about the place"]),
        moved(prompt, "forgiven: a spark rising", "y")
      ]).toEqual([
        prompt,
        [
          [1, 1, 0],
          [0, 0, 1]
        ],
        [0, -11]
      ]);
    }
    // Leaving false speech. What to give up besides food and drink: waits at the scene's start, the place of one who
    // fasts with its food and drink left beside it; then harsh grey arcs of false speech come, a grey dashed way goes to
    // the place next door, and a grey shade comes over it.
    for (const prompt of ["Besides food and drink, what should a fasting person give up?", "Besides food and drink, what should a fasting person leave?"]) {
      expect([
        prompt,
        shown(prompt, ["false speech: harsh grey arcs", "acting on it: a grey dashed way to the place next door", "acting on it: a grey shade over the place next door"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0],
          [1, 1, 1]
        ]
      ]);
    }
    // That a real fast keeps the tongue clean: waits at the scene's start, a soft golden ring of the fast about the food
    // and drink; then grey arcs of false speech come, and the golden ring fades.
    for (const prompt of ["A real fast keeps the tongue clean too.", "If you fast, it is fine to tell lies."]) {
      expect([
        prompt,
        shown(prompt, ["false speech: harsh grey arcs", "his fast: a soft golden ring about his food and drink"])
      ]).toEqual([
        prompt,
        [
          [0, 1],
          [1, 0]
        ]
      ]);
    }
    // Whose fast Allah has no need of: waits at the scene's start; then false speech and acting on it come in grey, the
    // golden ring of the fast fades, and a faint grey ring comes about the food and drink.
    expect(shown("Whose hunger does Allah have no need of?", ["false speech: harsh grey arcs", "acting on it: a grey shade over the place next door", "his fast: a soft golden ring about his food and drink", "no need of it: a faint grey ring about his food and drink"])).toEqual([
      [0, 0, 1, 0],
      [1, 1, 0, 1]
    ]);
  });

  it("waits on the scenes of more days of fasting, from fasting in the heat to the milk at Arafah, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-fasting-in-heat", "sign-no-wisal", "sign-three-days-a-month", "sign-not-before-ramadan", "sign-no-fast-on-eid", "sign-ashura-and-ramadan", "sign-milk-at-arafah"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(19);
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
    // Fasting in the heat. How hot it was: waits at the scene's start, before the road; then they come along it, and the
    // sun's glow spreads as heat shimmers over the land.
    expect([
      shown("How hot was it?", ["a very hot day: the sun's glow spreads", "a very hot day: heat shimmering over the land"]),
      moved("How hot was it?", "a golden ring, his place", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [-40, 0]
    ]);
    // Who fasted, and that a traveler may choose: on the hot road; then a shade comes over each of three places, a cup
    // of water by each, and a soft golden ring about his place and about Ibn Rawahah's, with a warm glow about the two.
    for (const prompt of ["Who was fasting on that hot day?", "A traveler may choose not to fast."]) {
      expect([
        prompt,
        value("fasting-in-heat", "a very hot day: the sun's glow spreads", "opacity", 0.38),
        shown(prompt, ["from the great heat: a shade over a place 1", "not fasting: a cup of water by a place 1", "fasting: a soft golden ring about his place", "fasting: a soft golden ring about Ibn Rawahah's place", "the two fasting: a warm glow about them"])
      ]).toEqual([
        prompt,
        1,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ]
      ]);
    }
    // No wisal. What al-wisal is: waits at the scene's start, a day and a night in a row in the sky; then a grey dashed
    // line joins a day to the next through the night, and a grey dashed ring comes about them.
    expect(shown("What is al-wisal?", ["al-wisal: a grey dashed line joining a day to the next, through the night", "he forbade it: a grey dashed ring about the joined days"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // That we are not to join fasts, nor to harm ourselves: waits at the scene's start; then the joined days get a grey
    // dashed ring, a golden ring of care comes about the places, dates come on the cloth, and a warm light on the night.
    for (const prompt of ["We are told to join fasts with no food between.", "Islam asks us to fast so hard that we harm ourselves."]) {
      expect([
        prompt,
        shown(prompt, ["he forbade it: a grey dashed ring about the joined days", "out of mercy for them: a golden ring of care about the places", "eating at night: dates on the cloth", "eating at night: a warm light on the night"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ]
      ]);
    }
    // Why he forbade it: the joined days with their grey ring; then a golden ring of care comes about the places, dates
    // come on the cloth, and a warm light on the night.
    expect([
      value("no-wisal", "he forbade it: a grey dashed ring about the joined days", "opacity", 0.16),
      shown("Why did he ﷺ forbid fasting day and night nonstop?", ["out of mercy for them: a golden ring of care about the places", "eating at night: dates on the cloth", "eating at night: a warm light on the night"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // What he said about himself: the places eating at night; then their voice speaks, a soft golden ring of his fast
    // comes about his place, his voice answers, and a soft warm glow comes about his place.
    expect(shown("What did he ﷺ say about himself?", ["their voice: but you do al-wisal", "his fast, kept on: a soft golden ring about his place", "his voice: I am not like you", "not like you: a soft warm glow about his place"])).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 1]
    ]);
    // Why he could do it: their voice has spoken, and his fast is kept on; then his voice answers, and a soft warm glow
    // comes about his place.
    expect([
      value("no-wisal", "their voice: but you do al-wisal", "opacity", 0.5),
      value("no-wisal", "his fast, kept on: a soft golden ring about his place", "opacity", 0.5),
      shown("Why could he ﷺ do it?", ["his voice: I am not like you", "not like you: a soft warm glow about his place"])
    ]).toEqual([
      1,
      1,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // Three days a month. How long it counts as: the days of the month with a grey dashed ring about them all; then a
    // soft golden ring comes on three of the days, and a warm light over all of them.
    expect([
      value("three-days-a-month", "has not fasted: a grey dashed ring about all the days", "opacity", 0.56),
      shown("Three days a month count like fasting how long?", ["three days: a soft golden ring on a day 1", "three days: a soft golden ring on a day 3", "like fasting all the time: a warm light over all the days", "has not fasted: a grey dashed ring about all the days"])
    ]).toEqual([
      1,
      [
        [0, 0, 0, 1],
        [1, 1, 1, 0]
      ]
    ]);
    // Not before Ramadan. What not to do: the days of Ramadan with their light; then a grey dashed ring comes about a
    // day just before it, and about a second.
    expect([
      value("not-before-ramadan", "Ramadan: a soft golden light on its days", "opacity", 0.22),
      shown("What should we not do just before Ramadan?", ["a day or two before it: a grey dashed ring about a day 1", "a day or two before it: a grey dashed ring about a day 2"])
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // Who may still fast that day: the two days before Ramadan with grey rings; then a soft golden ring comes on his day
    // each week, a golden line runs down to the day before Ramadan, its grey ring fades, and a soft golden ring comes on
    // that day and about his place.
    for (const prompt of ["Who may still fast that day?", "Someone who always fasts Mondays may fast that Monday."]) {
      expect([
        prompt,
        shown(prompt, ["his habit: a soft golden ring on his day, week 1", "his habit: a soft golden ring on his day, week 2", "his habit: a golden line down his day", "a day or two before it: a grey dashed ring about a day 2", "that day: a soft golden ring on it", "let him fast it: a soft golden ring about his place"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1, 0, 0],
          [1, 1, 1, 0, 1, 1]
        ]
      ]);
    }
    // No fast on Eid. Whether it is allowed: the gathering at the Eid prayer; then Umar's voice speaks, two days come in
    // the sky, and a grey dashed ring comes about each.
    expect(shown("Is it allowed to fast on Eid day?", ["Umar's voice: these are two days", "the day you break your fast: a day with its new moon", "the other day: a day", "he forbade fasting them: a grey dashed ring about the first day", "he forbade fasting them: a grey dashed ring about the other day"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Ashura and Ramadan. That Ashura came first: waits at the scene's start, the twelve months in the sky; then his
    // voice speaks, a light comes on the first month and rings about the places, and then a golden ring and a light come
    // on the ninth month.
    expect(shown("Ashura was fasted before Ramadan was a duty.", ["his voice: fast the day of Ashura", "the day of Ashura: a small golden light on the first month", "fasting Ashura: a soft golden ring about a place 1", "Ramadan made a duty: a golden ring about the ninth month", "the month of Ramadan: a golden light on it"])).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1]
    ]);
    // That Ashura became a choice: Ramadan made a duty, and all four places fasting Ashura; then a warm glow comes about
    // two that fast, the rings about the other two fade, and dates and a cup come by each of them.
    expect([
      value("ashura-and-ramadan", "the month of Ramadan: a golden light on it", "opacity", 0.32),
      shown("After Ramadan was made a duty, Ashura became...?", ["whoever wished fasted it: a warm glow about the two that fast", "fasting Ashura: a soft golden ring about a place 1", "fasting Ashura: a soft golden ring about a place 3", "whoever wished did not: dates and a cup by a place 1", "whoever wished did not: dates and a cup by a place 2"])
    ]).toEqual([
      1,
      [
        [0, 1, 1, 0, 0],
        [1, 1, 0, 1, 1]
      ]
    ]);
    // Which day he sought most to fast: some fasting and some not; then the light of Ashura shines brighter.
    expect([
      value("ashura-and-ramadan", "the day of Ashura: a small golden light on the first month", "opacity", 0.6),
      shown("Which day did he ﷺ seek most to fast?", ["Ashura, sought more than any day: its light shines brighter"])
    ]).toEqual([
      1,
      [[0], [1]]
    ]);
    // The milk at Arafah. Why the people wondered: waits at the scene's start, the places on the plain about his place;
    // then grey voices of doubt come from three of them.
    expect(shown("Why did people wonder?", ["doubting his fast: a grey voice 1", "doubting his fast: a grey voice 2", "doubting his fast: a grey voice 3"])).toEqual([
      [0, 0, 0],
      [1, 1, 1]
    ]);
    // That he drank it while they watched: the cup of milk at his place as he stands, with the grey voices of doubt;
    // then the milk is gone, the voices stop, faint warm lines go from the places to his, and a warm glow comes over
    // them all.
    expect([
      value("milk-at-arafah", "standing at Arafah: a soft light about his place", "opacity", 0.58),
      shown("He ﷺ drank it while people watched.", ["the milk in the cup", "doubting his fast: a grey voice 1", "looking on: a faint warm line to his place 1", "looking on: a faint warm line to his place 4", "they saw it: a warm glow over them all"])
    ]).toEqual([
      1,
      [
        [1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1]
      ]
    ]);
  });

  it("waits on the scenes of rain and wind, from the du'a when it rains to the du'a when the wind blows, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-rain-dua", "sign-nothing-grows", "sign-cloud-and-garden", "sign-pray-in-your-homes", "sign-house-for-rain-and-sun", "sign-sheep-on-the-hills", "sign-when-the-wind-blows"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(18);
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
    // The du'a when it rains. What he said: he saw the rain, and his voice speaks; then more drops come as the clouds
    // grow heavy, and the land and the hills grow green, flowers come up, and a warm glow comes over the land.
    expect([
      value("rain-dua", "his voice: let it be strong and fruitful", "opacity", 0.46),
      shown("What did he say when he saw rain?", ["a strong downpour: more drops 1", "a strong downpour: the clouds grow heavy", "fruitful: the land grows green", "fruitful: the hills grow green", "fruitful: a warm glow over the land"]),
      moved("What did he say when he saw rain?", "fruitful: flowers coming up", "scaleY")
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [0, 1]
    ]);
    // That we can ask for rain that is fruitful: the strong rain falling; then the land and the hills grow green, grass
    // comes up, dates come on a palm, and a warm glow comes over the land.
    expect([
      value("rain-dua", "a strong downpour: more drops 1", "opacity", 0.72),
      shown("We can ask Allah to make rain beneficial.", ["fruitful: the land grows green", "fruitful: the hills grow green", "fruitful: dates on a palm 1", "fruitful: a warm glow over the land"]),
      moved("We can ask Allah to make rain beneficial.", "fruitful: grass coming up, near", "scaleY")
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, 1]
    ]);
    // Rain, yet nothing grows. Why the famine: the field wet and dark with pools on it, and the rain coming again; then
    // the rain stops, and a grey dashed ring comes about the field, and about the empty basket.
    expect([
      value("nothing-grows", "the field, wet and dark", "opacity", 0.64),
      value("nothing-grows", "pools of water on the field", "opacity", 0.64),
      shown("Why would there be famine despite heavy rain, he ﷺ said?", ["showers again: drops falling 1", "nothing grows: a grey dashed ring about the field", "famine: a grey dashed ring about the empty basket"])
    ]).toEqual([
      1,
      1,
      [
        [1, 0, 0],
        [0, 1, 1]
      ]
    ]);
    // That famine is not only when no rain falls: waits at the scene's start, the dry field under a hot clear sky; then
    // grey clouds come, the rain falls, and falls again, the field grows wet and dark, and a grey dashed ring comes
    // about the field and about the empty basket.
    expect([
      shown("Famine comes only when no rain falls.", ["the field, wet and dark", "pools of water on the field", "nothing grows: a grey dashed ring about the field", "famine: a grey dashed ring about the empty basket"]),
      moved("Famine comes only when no rain falls.", "grey clouds", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 0.5, 1, 1]
      ],
      [-60, 0]
    ]);
    // The cloud and the garden. How much he gave: the water turned into the beds of the garden; then three thirds of the
    // harvest come, one goes to the place of one in need, one goes to his home, and a warm glow comes at his home.
    expect([
      value("cloud-and-garden", "turned by his spade: water in the beds", "opacity", 0.66),
      shown("How much of the harvest did the garden's owner give in charity?", ["a third, given in charity", "a third, eaten at home", "a third, put back into it", "eaten at home: a warm glow at his home"]),
      moved("How much of the harvest did the garden's owner give in charity?", "a third, given in charity", "x"),
      moved("How much of the harvest did the garden's owner give in charity?", "a third, eaten at home", "y")
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, -33.2],
      [0, -23]
    ]);
    // That he put a third back into it: one third given and one third eaten, the last one still there; then it goes into
    // the garden, the garden grows, and a warm glow comes over it.
    expect([
      value("cloud-and-garden", "a third, eaten at home", "x", 0.83),
      shown("The garden's owner put a third of the harvest back into his garden.", ["a third, put back into it", "a warm glow over the garden"]),
      moved("The garden's owner put a third of the harvest back into his garden.", "a third, put back into it", "x"),
      moved("The garden's owner put a third of the harvest back into his garden.", "put back into it: the garden grows", "scaleY")
    ]).toEqual([
      18.2,
      [
        [1, 0],
        [0, 1]
      ],
      [0, 24.5],
      [0, 1]
    ]);
    // Pray in your homes. What kind of night: waits at the scene's start, the night over the homes; then the cold wind
    // blows, frost comes on the land, Ibn Umar's voice calls, and a warm light comes in each home.
    expect(shown("On what kind of night did Ibn Umar say: pray in your homes?", ["the cold wind blowing", "a cold night: frost on the land", "Ibn Umar's voice: the adhan, then pray in your homes", "pray in your homes: a warm light in a home 1", "pray in your homes: a warm light in a home 4"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Whom he told: the homes lit, as Ibn Umar's voice speaks; then his voice is done, a golden ring comes about his
    // place, his voice speaks, and a golden way goes from his place to the caller.
    expect([
      value("pray-in-your-homes", "pray in your homes: a warm light in a home 1", "opacity", 0.48),
      shown("Whom did he ﷺ tell to say: pray in your homes?", ["Ibn Umar's voice: the adhan, then pray in your homes", "a golden ring, his place", "his voice: tell them", "he told the caller: a golden way to the caller"])
    ]).toEqual([
      1,
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ]
    ]);
    // That on cold, rainy nights they could pray at home: the golden way to the caller, as his voice speaks; then his
    // voice is done, the clouds grow heavy and drops fall, and the caller's voice speaks.
    expect([
      value("pray-in-your-homes", "he told the caller: a golden way to the caller", "opacity", 0.64),
      shown("On very cold, rainy nights, people could pray in their homes.", ["his voice: tell them", "a cold, wet night: the clouds grow heavy", "a night of cold and wet: drops falling 1", "the caller's voice: pray in your homes"])
    ]).toEqual([
      1,
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ]
    ]);
    // A house for the rain and the sun. That he built it in his lifetime: waits at the scene's start, his place far off
    // by his masjid; then the mud bricks go up row by row, with a doorway, and a roof of palm leaves.
    expect([
      value("house-for-rain-and-sun", "a golden ring, his place, far off", "opacity", 0),
      shown("Ibn Umar built this house during the life of the Prophet ﷺ.", ["built by him: mud bricks, row 1", "built by him: mud bricks, row 4", "built by him: its doorway", "built by him: a roof of palm leaves"])
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ]
    ]);
    // Why he built it: the house built; then rain falls about it and a warm glow shelters him inside, and the sun comes
    // back, its heat spreads, and he goes into the house's shade, with a soft ring about his place.
    expect([
      value("house-for-rain-and-sun", "built by him: a roof of palm leaves", "opacity", 0.24),
      value("house-for-rain-and-sun", "sheltered: a warm glow inside the house", "opacity", 0.46),
      shown("Why did Ibn Umar build his house?", ["the sun's heat", "the house's shade", "shaded: a soft ring about his place in the shade"]),
      moved("Why did Ibn Umar build his house?", "Ibn Umar's place", "x")
    ]).toEqual([
      1,
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 50]
    ]);
    // Who helped him: his place in the shade; then a warm glow comes about the house he built alone, and a soft golden
    // ring about his place.
    expect([
      value("house-for-rain-and-sun", "shaded: a soft ring about his place in the shade", "opacity", 0.72),
      shown("Who helped Ibn Umar build it?", ["a house he built alone: a warm glow about it", "none helped him: a soft golden ring about his place"])
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // Sheep on the mountain tops. That he grazes them where the rain falls: the flock up on the top; then a cloud comes
    // over it, drops fall there, and green grass comes up on the top.
    expect([
      value("sheep-on-the-hills", "a sheep of the flock 1", "y", 0.48),
      shown("He grazes his sheep where the rain falls.", ["a cloud over the mountain top", "where the drops fall on the mountain 1", "where the drops fall: green grass on the top"])
    ]).toEqual([
      -41.6,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // Why he takes them up: the green grass on the top; then a grey haze comes over the town, a grey dashed ring about
    // it, and a soft golden ring about his place on the top.
    expect([
      value("sheep-on-the-hills", "where the drops fall: green grass on the top", "opacity", 0.72),
      shown("Why will he take his sheep up the mountains?", ["its trials: a grey haze over the town", "its trials: a grey dashed ring about the town", "his faith kept safe: a soft golden ring about his place"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // The du'a when the wind blows. What he asked for: the wind blowing hard, as his voice speaks; then small lights go
    // with the wind.
    expect(shown("What did he ask for in a storm, per Muslim 899?", ["the wind blowing hard", "his voice: I ask You for its good", "its good: small lights going with the wind"])).toEqual([
      [1, 1, 0],
      [1, 1, 1]
    ]);
    // What he sought refuge from: the small lights going with the wind; then a golden ring of care comes about the
    // homes.
    expect([
      value("when-the-wind-blows", "its good: small lights going with the wind", "opacity", 0.32),
      shown("What did he seek refuge from?", ["refuge: a golden ring of care about the homes"])
    ]).toEqual([
      1,
      [[0], [1]]
    ]);
    // What showed when clouds gathered: the homes in their ring of care, the small lights still with the wind; then the
    // lights are gone, the clouds gather and the sky darkens, and a faint grey ring comes about his place.
    expect([
      shown("What showed on his face at clouds, per Bukhari 4829?", ["its good: small lights going with the wind", "the sky clouded over: it darkens", "clouds gathering in the sky", "his look changed: a faint grey ring about his place"]),
      moved("What showed on his face at clouds, per Bukhari 4829?", "clouds gathering in the sky", "x")
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ],
      [-24, 0]
    ]);
    // Why he was concerned: the rain came and a warm glow is about his place; then his voice speaks, the valleys of 'Ad
    // come far off, a cloud facing their valleys, and a grey dashed ring about their cloud.
    expect([
      value("when-the-wind-blows", "it was lifted from him: a warm glow about his place", "opacity", 0.82),
      shown("Why was he concerned?", ["his voice: perhaps it is as 'Ad said", "far off: the valleys of 'Ad, in a soft circle", "far off: a cloud facing their valleys", "as 'Ad said: a grey dashed ring about their cloud"])
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ]
    ]);
  });

  it("waits on the scenes of animals in his teaching, from the good in horses to his camel as a sutrah, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-good-in-horses", "sign-horse-race", "sign-al-adba", "sign-rooster-and-donkey", "sign-ask-before-milking", "sign-goat-lent-for-milk", "sign-camel-as-sutrah"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(17);
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
    // Good in horses. Until when the good stays, and that it will not end soon: the lights of good on the horses'
    // foreheads; then the days go by, night falling and lifting twice with the lights still there, and a foal comes to
    // the herd with a light of good on its forehead too.
    for (const prompt of ["Until when will the good stay in them?", "The good in horses will end very soon."]) {
      expect([
        prompt,
        value("good-in-horses", "in the foreheads of horses: a light of good 1", "opacity", 0.5),
        value("good-in-horses", "the days go by: stars at night", "opacity", 0.64),
        value("good-in-horses", "in the foreheads of horses: a light of good 3", "opacity", 0.64),
        shown(prompt, ["a foal, come to the herd", "in the foal's forehead too: a light of good"]),
        moved(prompt, "a foal, come to the herd", "x")
      ]).toEqual([
        prompt,
        1,
        1,
        1,
        [
          [0, 0],
          [1, 1]
        ],
        [-10, 0]
      ]);
    }
    // The race of horses. That he held a race: waits at the scene's start, before any horse has come; then three lean
    // horses come to the palms of al-Hafya', their course shows, and they gallop along it to the pass.
    expect([
      shown("He ﷺ held a race between horses.", ["a lean horse 1", "a lean horse 2", "a lean horse 3", "he held a race: the course from al-Hafya' to the pass"]),
      moved("He ﷺ held a race between horses.", "a lean horse 3", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [-28, 86]
    ]);
    // Where the horses not made lean raced to: the lean horses at the pass; then they are gone, two horses not made lean
    // wait at the pass, their course shows, and they gallop to the masjid of Bani Zurayq.
    expect([
      shown("Where did the horses not made lean race to?", ["a lean horse 1", "a horse not made lean 1", "a horse not made lean 2", "for the horses not made lean: the course from the pass to the masjid"]),
      moved("Where did the horses not made lean race to?", "a horse not made lean 2", "x")
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [0, 1, 1, 1]
      ],
      [0, 48]
    ]);
    // Who said he raced: the horses not made lean at the masjid; then a soft ring comes about one of them, and a voice:
    // Ibn Umar was among those who raced.
    expect([
      value("horse-race", "a horse not made lean 1", "x", 0.82),
      shown("Who said he took part in that horse race?", ["Ibn Umar among those who raced: a soft ring about a horse", "Ibn Umar's voice: I was among them"])
    ]).toEqual([
      30,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // Al-Adba'. The name of his fast camel: waits at the scene's start, three camels at the start; then a soft ring
    // comes about al-Adba', and she runs with the two camels, comes first, and a small light rises above her.
    expect([
      value("al-adba", "his she-camel called al-Adba': a soft ring about her", "opacity", 0.12),
      moved("What was the name of his ﷺ fast camel?", "al-Adba' in the first race", "x"),
      moved("What was the name of his ﷺ fast camel?", "a camel in the first race 1", "x"),
      shown("What was the name of his ﷺ fast camel?", ["she could not be outrun: a light rising above her"])
    ]).toEqual([
      1,
      [0, 124],
      [0, 92],
      [[0], [1]]
    ]);
    // Who beat her: al-Adba' at the end of the track with her light above her; then she waits at the start again, a
    // young camel comes with a striped cloth, and it runs and outruns her: her light goes down to her, and a light rises
    // above the young camel.
    expect([
      value("al-adba", "she could not be outrun: a light rising above her", "opacity", 0.34),
      shown("Who beat Al-Adba in the race?", ["a bedouin's young camel, with a striped cloth", "the light above al-Adba'", "it outran her: a light rising above the young camel"]),
      moved("Who beat Al-Adba in the race?", "a bedouin's young camel, with a striped cloth", "x"),
      moved("Who beat Al-Adba in the race?", "al-Adba' at the start again", "x")
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 0, 1]
      ],
      [-28, 138],
      [0, 114]
    ]);
    // The lesson he gave: the light above the young camel that outran her; then his voice speaks, and the light goes
    // down to the young camel and fades.
    expect([
      shown("What lesson did he ﷺ give?", ["his voice: it is due", "it outran her: a light rising above the young camel"]),
      moved("What lesson did he ﷺ give?", "it outran her: a light rising above the young camel", "y")
    ]).toEqual([
      [
        [0, 1],
        [1, 0]
      ],
      [-6, 0]
    ]);
    // The rooster and the donkey. What to do when the rooster crows: the rooster crowing on the fence; then a spark of
    // du'a rises from the place at the door, and a warm light comes about it.
    expect([
      value("rooster-and-donkey", "the rooster crows", "opacity", 0.16),
      value("rooster-and-donkey", "asking for His favor: a spark rising", "opacity", 0.24),
      shown("A rooster crows at dawn. What do you do?", ["His favor: a warm light about the place"])
    ]).toEqual([
      1,
      1,
      [[0], [1]]
    ]);
    // That it crows when it has seen an angel: the warm light about the place; then the rooster crows again, and nothing
    // is drawn for what it saw.
    expect([
      value("rooster-and-donkey", "His favor: a warm light about the place", "opacity", 0.32),
      shown("The rooster crows when it has seen an angel.", ["the rooster crows again"])
    ]).toEqual([
      1,
      [[0], [1]]
    ]);
    // What to say when the donkey brays: the donkey braying at its post; then a golden ring of care comes about the
    // place, and a spark of du'a rises.
    expect([
      value("rooster-and-donkey", "the donkey brays", "opacity", 0.64),
      value("rooster-and-donkey", "seeking refuge: a spark rising", "opacity", 0.74),
      shown("A donkey brays. What do you say?", ["refuge: a golden ring of care about the place"])
    ]).toEqual([
      1,
      1,
      [[0], [1]]
    ]);
    // Milking only with leave. That it is not fine without asking: waits at the scene's start, the she-goat grazing by
    // her owner's home; then a passer-by's place comes to her, a grey dashed ring comes about her, and a way goes from
    // her to her owner, with a soft ring about his place.
    expect([
      shown("Milking a neighbor's animal without asking is fine.", ["not without his permission: a grey dashed ring about her", "his permission: a way to her owner", "his permission: a soft ring about the owner's place"]),
      moved("Milking a neighbor's animal without asking is fine.", "a passer-by's place", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, -54]
    ]);
    // What you must have: the passer-by's place by the goat, with the grey dashed ring about her; then a way goes from
    // her to her owner, and a soft ring comes about his place.
    expect([
      value("ask-before-milking", "not without his permission: a grey dashed ring about her", "opacity", 0.16),
      shown("What must you have before milking someone's animal?", ["his permission: a way to her owner", "his permission: a soft ring about the owner's place"])
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // What the udder is likened to: the way to her owner; then a way goes back to the passer-by's own store, its door is
    // broken open, a jar of its food is taken away, and once the store is shut again, a soft ring comes about the goat's
    // udder, with a golden way to her owner's home.
    expect([
      value("ask-before-milking", "his permission: a soft ring about the owner's place", "opacity", 0.32),
      value("ask-before-milking", "his store broken: a grey dashed ring about it", "opacity", 0.5),
      value("ask-before-milking", "his food taken away: a grey way", "opacity", 0.6),
      shown("What did he ﷺ compare an animal's udder to?", ["his food taken away: a jar", "their udders store their food: a soft ring about her udder", "their food: a golden way to the owner's home"])
    ]).toEqual([
      1,
      1,
      1,
      [
        [1, 0, 0],
        [0, 1, 1]
      ]
    ]);
    // A she-goat lent for its milk. What Allah gives: the she-goat at the next home, with a bowl of milk and a warm
    // glow; then a soft ring comes about the place of the one who lent her, a spark rises, and far off a soft circle of
    // light comes, with a golden way to it.
    expect([
      value("goat-lent-for-milk", "for her milk: a warm glow at the next home", "opacity", 0.34),
      value("goat-lent-for-milk", "hoping for its reward: a spark rising", "opacity", 0.43),
      shown("What does Allah give for one of these deeds, done for His reward?", ["hoping for its reward: a soft ring about the lender's place", "Paradise far off, in a soft circle of light", "admitted by it: a golden way to it"])
    ]).toEqual([
      1,
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // That they could not count them easily: the golden way to the circle of light; then Hassan's place and voice come,
    // rings come about the lights below the highest one by one, fourteen of them, and the fifteenth gets a grey dashed
    // ring.
    expect([
      value("goat-lent-for-milk", "admitted by it: a golden way to it", "opacity", 0.66),
      shown("The narrators easily counted all forty good deeds.", ["Hassan's place", "Hassan's voice: we counted", "counted below it: a ring about a light 14", "not reaching fifteen: a grey dashed ring about the fifteenth"])
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ]
    ]);
    // His she-camel as a sutrah. That Ibn Umar did the same: his prayer facing the back part of the saddle; then Ibn
    // Umar's place comes, with a she-camel sitting across in front of it, a soft ring about it and a golden line to the
    // camel.
    expect([
      value("camel-as-sutrah", "facing its back part: a golden line to it", "opacity", 0.8),
      shown("Ibn Umar used to do the same as he ﷺ did.", ["Ibn Umar's place", "Ibn Umar's she-camel, sitting across in front of him", "Ibn Umar did the same: a soft ring about his place", "Ibn Umar did the same: a golden line to his she-camel"])
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ]
    ]);
  });

  it("waits on the scenes of trade and the market, from showing him the market to sharing the fruits, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-show-me-the-market", "sign-grain-on-credit", "sign-bundle-of-wood", "sign-easygoing-trader", "sign-fruit-when-ripe", "sign-gold-for-gold", "sign-share-the-fruits"];
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
    // Show me the market. That he did not take half of Sa'd's wealth: Sa'd's voice, his wealth in two halves, and one
    // half moved toward Abdur-Rahman; then the half goes back to Sa'd, Abdur-Rahman's voice speaks, and a warm glow
    // comes over Sa'd's home.
    expect([
      value("show-me-the-market", "in two halves: a line between them", "opacity", 0.34),
      moved("Abdur-Rahman took half of Sa'd's wealth.", "Sa'd's wealth: the half he offers", "x"),
      shown("Abdur-Rahman took half of Sa'd's wealth.", ["Abdur-Rahman's voice: a blessing, and the market", "in your family and your wealth: a warm glow over Sa'd's home"])
    ]).toEqual([
      1,
      [-16, 0],
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // What he asked for instead of Sa'd's wealth, and what he asked his new brother for: Abdur-Rahman's voice of
    // blessing, with the half of Sa'd's wealth back by Sa'd; then a way shows from his place to the market.
    for (const prompt of ["What did Abd ar-Rahman ask for instead of Sa'd's wealth?", "What did Abdur-Rahman ask his new brother for?"]) {
      expect([
        prompt,
        value("show-me-the-market", "Abdur-Rahman's voice: a blessing, and the market", "opacity", 0.5),
        value("show-me-the-market", "Sa'd's wealth: the half he offers", "x", 0.5),
        shown(prompt, ["show me the market: a way to it"])
      ]).toEqual([
        prompt,
        1,
        0,
        [[0], [1]]
      ]);
    }
    // Which market they showed him: the way to the market; then Sa'd's voice names it, and a soft ring comes about the
    // market of Qaynuqa'.
    expect([
      value("show-me-the-market", "show me the market: a way to it", "opacity", 0.64),
      shown("Which market did they show him?", ["Sa'd's voice: the market of Qaynuqa'", "the market of Qaynuqa': a soft ring about it"])
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // What he brought home, and that he did not come back with nothing: the soft ring about the market; then
    // Abdur-Rahman's place goes to the market and comes back home with dried yogurt and butter, and a warm glow comes at
    // his home.
    for (const prompt of ["Abd ar-Rahman came back from the market with nothing.", "What did he bring home from the market?"]) {
      expect([
        prompt,
        value("show-me-the-market", "the market of Qaynuqa': a soft ring about it", "opacity", 0.8),
        value("show-me-the-market", "Abdur-Rahman's place", "x", 0.87),
        shown(prompt, ["dried yogurt and butter, brought back", "to his household: a warm glow at Abdur-Rahman's home"])
      ]).toEqual([
        prompt,
        1,
        -46,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // Food bought, to be paid at a set time. That one may trade fairly with people of other faiths: waits at the scene's
    // start, his place by his home and the seller's place by his store; then the way of the sale shows, a sack of food
    // goes to his home, and a warm glow comes there.
    expect([
      shown("Muslims may trade fairly with people of other faiths.", ["the way of the sale", "food for his home: a warm glow"]),
      moved("Muslims may trade fairly with people of other faiths.", "food bought: a sack of grain", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, -72]
    ]);
    // What he left as a pledge: the days to the set time, with a golden ring about the last; then his iron armour comes
    // and goes to the seller's store, and a soft ring comes about it there.
    expect([
      value("grain-on-credit", "the set time: a golden ring about the last day", "opacity", 0.64),
      shown("What did he leave as a pledge?", ["his iron armour, given as a pledge", "held as a pledge: a soft ring about the armour"]),
      moved("What did he leave as a pledge?", "his iron armour, given as a pledge", "x")
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ],
      [0, 48]
    ]);
    // A bundle of firewood. What is better than asking people: waits at the scene's start, dry sticks lying on the
    // hillside; then they are gathered, tied into a bundle and carried toward the town, a golden ring comes about the
    // place and its bundle, and a faint grey place stands asking by the doors.
    expect([
      shown("What is better than asking people for money?", ["a bundle of firewood", "a rope about the bundle", "better: a golden ring about the place and its bundle", "asking instead: a faint grey place by the doors"]),
      moved("What is better than asking people for money?", "the place of one who gathers", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, 36]
    ]);
    // Why asking people is risky: the grey dashed ways from the asking place to each door; then a dish comes from one
    // door, and a grey dashed ring comes about the shut door of the other.
    expect([
      value("bundle-of-wood", "asking anyone: a grey dashed way to each door", "opacity", 0.72),
      shown("Why is asking people risky?", ["he may give: a dish from the door", "or refuse: a grey dashed ring about the shut door"]),
      moved("Why is asking people risky?", "he may give: a dish from the door", "x")
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ],
      [-12, 0]
    ]);
    // The easygoing trader. Who gets the mercy, and that harsh bargaining is not the Sunnah: waits at the scene's start,
    // the trader's place at his stall; then a warm glow of mercy and a soft ring come about it.
    for (const prompt of ["Who gets Allah's mercy in this hadith?", "Bargaining harshly and rudely is the Sunnah."]) {
      expect([
        prompt,
        shown(prompt, ["mercy: a warm glow about the trader's place", "one who is easy: a soft ring about the trader's place"])
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ]
      ]);
    }
    // When else to be easy: the soft golden way of his buying; then a soft way goes to the home of one who owes him, his
    // place goes there with its glow and ring, and what he is owed comes to him.
    expect([
      value("easygoing-trader", "when he buys: a soft golden way between the two", "opacity", 0.72),
      shown("When else should we be easy?", ["when he asks for what he is owed: a soft way to the one who owes", "what he is owed, come to him"]),
      moved("When else should we be easy?", "the trader's place", "x")
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ],
      [0, -52]
    ]);
    // Fruit sold only once it is clearly good. When fruit may be sold: the green dates with a grey dashed ring, and a
    // grey dashed way of selling them; then the sun climbs, the dates ripen, a soft golden ring comes about them, and a
    // golden way of selling.
    expect([
      value("fruit-when-ripe", "not yet good: a grey dashed ring about the green dates", "opacity", 0.32),
      shown("When may fruit on trees be sold?", ["the dates ripening on a palm 1", "clearly good: a soft golden ring about the ripe dates", "now it may be sold: a golden way"]),
      moved("When may fruit on trees be sold?", "the sun", "x")
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 32]
    ]);
    // Who was forbidden it: the ripe dates and the golden way; then his voice speaks, and a ring comes about the
    // seller's place and about the buyer's.
    expect([
      value("fruit-when-ripe", "now it may be sold: a golden way", "opacity", 0.64),
      shown("Who was forbidden this early sale?", ["his voice: the seller and the buyer", "the seller: a ring about the place", "the buyer: a ring about the place"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // Gold for gold. How gold is sold for gold: three gold coins against two, the balance tipped, with a grey dashed
    // ring; then a gold coin is added, the balance comes level, and a soft golden ring comes about it.
    expect([
      value("gold-for-gold", "not equal: a grey dashed ring about the balance", "opacity", 0.2),
      shown("How must gold be swapped for gold?", ["equal for equal: a gold coin added", "equal for equal: a soft golden ring about the balance"]),
      moved("How must gold be swapped for gold?", "crossbar of the balance", "rotate")
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ],
      [-8, 0]
    ]);
    // Gold for silver however you wish: the silver coins level on the balance; then gold comes on one side and silver on
    // the other, the balance tips with no grey ring, a golden way and a silver way go between the pans, and a warm glow
    // and a soft golden ring come about it.
    expect([
      value("gold-for-gold", "silver equal: a soft golden ring about the balance", "opacity", 0.62),
      shown("Gold for silver may be traded...?", ["gold for silver: gold on the left", "silver for gold: silver on the right", "gold for silver: a golden way between the pans", "silver for gold: a silver way back", "however you wish: a warm glow over the balance", "however you wish: a soft golden ring about the balance"]),
      moved("Gold for silver may be traded...?", "crossbar of the balance", "rotate"),
      value("gold-for-gold", "not equal: a grey dashed ring about the balance", "opacity", 1),
      value("gold-for-gold", "silver not equal: a grey dashed ring about the balance", "opacity", 1)
    ]).toEqual([
      1,
      [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1]
      ],
      [0, 6],
      0,
      0
    ]);
    // Sharing the fruits. What the Ansar first asked: waits at the scene's start, the garden of palms between the
    // emigrants' places and the Ansar's; then the Ansar's voice speaks, and a dashed line comes through the garden.
    expect(shown("What did the Ansar first ask the Prophet ﷺ?", ["the Ansar's voice: divide the palms", "divide the palms: a dashed line through the garden"])).toEqual([
      [0, 0],
      [1, 1]
    ]);
    // That the emigrants worked the trees and shared the fruit: his voice saying no, the dashed line gone; then the
    // emigrants' places go to the palms with jugs, water drips at their roots, they come back, dates come on the palms,
    // and a basket of dates comes to the emigrants and one to the Ansar.
    expect([
      value("share-the-fruits", "divide the palms: a dashed line through the garden", "opacity", 0.36),
      value("share-the-fruits", "his voice: no", "opacity", 0.36),
      value("share-the-fruits", "an emigrant's place 1", "x", 0.5),
      shown("The emigrants worked the trees and shared the fruit.", ["watered: wet ground at the root of a palm 1", "and we share the fruit: dates on a palm 1", "a basket of dates for the emigrants", "a basket of dates for the Ansar"])
    ]).toEqual([
      0,
      1,
      23,
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ]
    ]);
    // What the emigrants answered: the baskets of dates; then the emigrants' voice speaks, a warm glow comes over the
    // garden, and a soft golden ring about the emigrants.
    expect([
      value("share-the-fruits", "a basket of dates for the emigrants", "opacity", 0.8),
      shown("What did the emigrants answer?", ["the emigrants' voice: we hear and obey", "a warm glow over the garden", "we hear and obey: a soft golden ring about the emigrants"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
  });

  it("waits on the scenes on the road, from Jabir's tired camel to a lost camel on the day of Arafah, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-tired-camel", "sign-water-skins", "sign-alone-at-night", "sign-travellers-adhan", "sign-set-out-on-thursday", "sign-camel-is-yours", "sign-search-at-arafah"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(18);
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
    // Jabir's tired camel. What happened to the camel after the du'a: the camel grown tired, the touch and the spark of
    // du'a gone; then it runs on as it never went before, with his place beside it, and goes on as the sold camel.
    expect([
      shown("What happened to the camel after the dua?", ["a camel grown tired", "the camel, sold, going on"]),
      value("tired-camel", "the camel, going as it never went before", "x", 0.365),
      moved("What happened to the camel after the dua?", "a golden ring, his place", "x")
    ]).toEqual([
      [
        [1, 0],
        [0, 1]
      ],
      60,
      [40, 70]
    ]);
    // That he paid for the camel: the purse of its price by his place, at his home; then the owner's place comes, and
    // the purse goes to it.
    expect([
      shown("The Prophet ﷺ paid for the camel.", ["the owner's place"]),
      moved("The Prophet ﷺ paid for the camel.", "an uqiyah, its price, in a purse", "x")
    ]).toEqual([
      [[0], [1]],
      [78, 58]
    ]);
    // What he did after paying: the camel brought to him, the purse with the owner's place; then his voice speaks, the
    // camel is sent back after the owner, and a warm glow comes about it at its owner's home.
    expect([
      shown("What did the Prophet ﷺ do after paying?", ["his voice: take your camel", "the camel, sent back", "your wealth: a warm glow about the camel at its owner's home", "the camel, sold, going on"]),
      moved("What did the Prophet ﷺ do after paying?", "the camel, sent back", "x")
    ]).toEqual([
      [
        [0, 0, 0, 1],
        [1, 1, 1, 0]
      ],
      [0, -16]
    ]);
    // The water-skins. That her water-skins were all but bursting: the forty places have drunk their fill; then small
    // water-skins and vessels fill one by one, and hers swell.
    expect([
      value("water-skins", "drank their fill: row 4", "opacity", 0.67),
      shown("The water-skins were nearly bursting full.", ["filled 1", "filled 5", "her water-skins, all but bursting"])
    ]).toEqual([
      1,
      [
        [0, 0, 0],
        [1, 1, 1]
      ]
    ]);
    // What happened to the woman's people: the filled water-skins and vessels; then bread and dates go to her place, her
    // camel and her place go back to her tribe's tents, a soft golden ring comes about her place and a warm glow over
    // the tents.
    expect([
      shown("What happened to the woman's people?", ["bread and dates, gathered for her", "she accepted Islam: a soft golden ring about her place", "and they accepted Islam: a warm glow over the tents"]),
      moved("What happened to the woman's people?", "her place", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [-58, -28]
    ]);
    // No rider alone by night. That he knew of dangers in travelling alone that others did not: waits at the scene's
    // start, a camel by the camp; then it sets out alone along the road, a grey dashed ring about it, and the dark ahead
    // deepens.
    expect([
      shown("He ﷺ knew of dangers in travelling alone that others did not.", ["alone: a grey dashed ring about it", "the dark ahead"]),
      moved("He ﷺ knew of dangers in travelling alone that others did not.", "a camel setting out alone", "x")
    ]).toEqual([
      [
        [0, 0],
        [1, 1]
      ],
      [0, 44]
    ]);
    // What is safer for a journey at night: the camel out alone in the dark; then it turns back to the camp, the grey
    // ring goes, and a soft golden ring comes about the camp, all of them together.
    expect([
      shown("What is safer for a journey at night?", ["a camel setting out alone", "the camel turning back", "alone: a grey dashed ring about it", "together: a soft golden ring about the camp"]),
      moved("What is safer for a journey at night?", "the camel turning back", "x")
    ]).toEqual([
      [
        [1, 0, 1, 0],
        [0, 1, 0, 1]
      ],
      [0, -44]
    ]);
    // Two setting out. What two travellers do at prayer time: the two places by his place; then they set out, the sun
    // climbs with a dashed ring about it, the adhan goes out, then the iqamah, and prayer mats show.
    expect([
      shown("What should two travellers do at prayer time?", ["the time of a prayer: a dashed ring about the sun", "the iqamah: a shorter call", "prayer mats on the ground"]),
      value("travellers-adhan", "the adhan: its call going out", "opacity", 0.4)
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      1
    ]);
    // That the adhan is not only for big masjids: the two places by his place; then they set out on the road with their
    // camels, and the adhan goes out from where they stopped.
    expect([
      shown("The adhan is only for big masjids.", ["the adhan: its call going out"]),
      moved("The adhan is only for big masjids.", "a camel for the journey 1", "x"),
      moved("The adhan is only for big masjids.", "the older one's place", "x")
    ]).toEqual([
      [[0], [1]],
      [0, 30],
      [-54, 6]
    ]);
    // Who leads them: the two places on their prayer mats after the iqamah; then a soft golden ring comes about the
    // older one's place, a spark rises from each, and a warm glow comes about the two.
    expect([
      value("travellers-adhan", "prayer mats on the ground", "opacity", 0.6),
      shown("Who leads them?", ["the older one leads: a soft golden ring about the place", "together in prayer: a warm glow about the two"]),
      value("travellers-adhan", "a spark of prayer, rising 1", "opacity", 0.72)
    ]).toEqual([
      1,
      [
        [0, 0],
        [1, 1]
      ],
      1
    ]);
    // Setting out on a Thursday. That Ka'b ibn Malik told of it: waits at the scene's start; then Ka'b's voice speaks.
    expect(shown("Ka'b ibn Malik is the one who told us of the Thursday journeys.", ["Ka'b's voice"])).toEqual([[0], [1]]);
    // How often he set out on another day: Ka'b's voice; then Sunday to Wednesday light up one by one, and his place and
    // the camels do not set out.
    expect([
      shown("How often did he ﷺ start a journey on another day?", ["a day gone by 1", "a day gone by 2", "a day gone by 3", "a day gone by 4"]),
      moved("How often did he ﷺ start a journey on another day?", "a golden ring, his place", "x"),
      moved("How often did he ﷺ start a journey on another day?", "a camel of the journey 1", "x")
    ]).toEqual([
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [0, 0],
      [0, 0]
    ]);
    // Which day he usually set out: four days lit; then Thursday lights golden with a golden ring about it, a way shows,
    // and his place and the camels set out along it.
    expect([
      shown("On which day did he ﷺ usually set out on a journey?", ["Thursday: the fifth day, lit golden", "Thursday: a golden ring about it", "the way of the journey"]),
      moved("On which day did he ﷺ usually set out on a journey?", "a golden ring, his place", "x"),
      moved("On which day did he ﷺ usually set out on a journey?", "a camel of the journey 1", "x")
    ]).toEqual([
      [
        [0, 0, 0],
        [1, 1, 1]
      ],
      [0, 72],
      [0, 72]
    ]);
    // The camel is yours. Who sold the camel: the young camel, hard to handle, with a grey dashed ring about it; then
    // his voice speaks toward Umar's place, and a golden line goes from his place to the young camel, with a soft ring
    // about it: bought.
    expect([
      shown("Who sold the camel to him ﷺ?", ["his voice: sell it to me", "bought: a golden line from his place to the young camel", "bought: a soft ring about the young camel"]),
      value("camel-is-yours", "his voice: sell it to me", "opacity", 0.5)
    ]).toEqual([
      [
        [0, 0, 0],
        [0, 1, 1]
      ],
      1
    ]);
    // What he said to Abdullah after buying it, and that he gave it to him: the golden line and the ring of the buying;
    // then his voice speaks again, they go, and a warm glow comes about the young camel: given.
    for (const prompt of ["What did he ﷺ say to Abdullah after buying it?", "He ﷺ gave the camel to Abdullah ibn Umar as a gift."]) {
      expect([
        prompt,
        shown(prompt, ["his voice: it is yours, O Abdullah", "given: a warm glow about the young camel", "bought: a golden line from his place to the young camel", "bought: a soft ring about the young camel"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 1, 1],
          [1, 1, 0, 0]
        ]
      ]);
    }
    // A lost camel on the day of Arafah. That Jubair saw him standing at Arafah: Jubair's place at the edge of the plain
    // after its search; then a faint golden line goes from it to the golden ring, and a soft ring comes about his place.
    expect([
      value("search-at-arafah", "Jubair's place", "x", 0.4),
      shown("Jubair saw him ﷺ standing at Arafat on the day of Arafat.", ["Jubair sees: a faint golden line to the golden ring", "standing at Arafah: a soft ring about his place"])
    ]).toEqual([
      70,
      [
        [0, 0],
        [1, 1]
      ]
    ]);
    // Why Jubair was surprised: the soft ring about his place, standing at Arafah; then Jubair's voice wonders.
    expect([
      value("search-at-arafah", "standing at Arafah: a soft ring about his place", "opacity", 0.62),
      shown("Why was Jubair surprised to see him ﷺ there?", ["Jubair's voice, wondering"])
    ]).toEqual([
      1,
      [[0], [1]]
    ]);
  });

  it("waits on the scenes of Madinah, from hurrying home at the sight of its walls to Masjid Quba every Saturday, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-walls-of-madinah", "sign-faith-returns", "sign-salt-in-water", "sign-like-a-furnace", "sign-between-house-and-pulpit", "sign-thousand-prayers", "sign-quba-every-saturday"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(18);
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
    // Hurrying home at the sight of its walls. What he did on seeing Madinah's walls: his mount at rest before the walls
    // in sight, the faint golden line to them and the soft ring about them; then his mount goes fast, quick strokes
    // behind it, and his place with it, to the gate.
    expect([
      shown("What did he ﷺ do on seeing Madinah's walls?", ["his mount, back from a journey", "his mount, going fast", "Madinah in sight: a faint golden line", "Madinah in sight: a soft ring about its walls"]),
      moved("What did he ﷺ do on seeing Madinah's walls?", "his mount, going fast", "x"),
      moved("What did he ﷺ do on seeing Madinah's walls?", "a golden ring about his mount: his place", "x"),
      value("walls-of-madinah", "going fast: quick strokes behind it", "opacity", 0.55)
    ]).toEqual([
      [
        [1, 0, 1, 1],
        [0, 1, 0, 1]
      ],
      [0, 50],
      [34, 84],
      1
    ]);
    // Why he hurried, and that he loved Madinah: his mount at the gate after going fast; then a warm glow comes over
    // Madinah and sparks of love rise from it.
    for (const prompt of ["Why did he ﷺ hurry when he saw Madinah?", "He ﷺ loved the city of Madinah."]) {
      expect([
        prompt,
        shown(prompt, ["his love for Madinah: a warm glow over it", "love for Madinah, rising 1", "love for Madinah, rising 4", "his mount, going fast"]),
        moved(prompt, "love for Madinah, rising 4", "y")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ],
        [0, -12]
      ]);
    }
    // Faith returns to Madinah. Where faith returns to, and that it does not leave Madinah: waits at the scene's start,
    // before any light of faith shows; then small lights come in from far off along the ways, go in at its gate, and a
    // warm glow and a soft ring come about Madinah.
    for (const prompt of ["Where does faith return to, he ﷺ said?", "He ﷺ said faith would leave Madinah forever."]) {
      expect([
        prompt,
        shown(prompt, ["faith, a small light going back to Madinah 1", "faith, a small light going back to Madinah 6", "faith at home in Madinah: a warm glow", "faith at home in Madinah: a soft ring about it"]),
        moved(prompt, "faith, a small light going back to Madinah 1", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        [0, 58]
      ]);
    }
    // How faith returns to Madinah: faith at home in Madinah, before any snake shows; then rocks show with a hole among
    // them, a snake goes back into its hole, and a soft ring comes about it.
    expect([
      shown("How does faith return to Madinah, he ﷺ said?", ["rocks, and a hole among them", "a snake, going back to its hole", "home in its hole: a soft ring about it", "faith at home in Madinah: a warm glow"]),
      value("faith-returns", "a snake, going back to its hole", "opacity", 0.56),
      moved("How does faith return to Madinah, he ﷺ said?", "a snake, going back to its hole", "scale")
    ]).toEqual([
      [
        [0, 0, 0, 1],
        [1, 0, 1, 1]
      ],
      1,
      [1, 0.25]
    ]);
    // Like salt in water. That plotting against Madinah's people does not end well: the grey haze of the plot crept up
    // before its walls; then it shrinks and melts away, and a soft ring comes about Madinah, kept.
    expect([
      shown("Plotting against the people of Madinah ends well.", ["a plot: a grey haze, creeping toward Madinah", "Madinah kept: a soft ring about it"]),
      moved("Plotting against the people of Madinah ends well.", "a plot: a grey haze, creeping toward Madinah", "scale")
    ]).toEqual([
      [
        [1, 0],
        [0, 1]
      ],
      [1, 0.12]
    ]);
    // What happens to one who plots against Madinah's people: the grey haze before its walls; then it melts away and
    // Madinah is kept, a bowl of water shows, and the salt in it melts until the water is clear.
    expect(shown("What happens to one who plots against Madinah's people?", ["a plot: a grey haze, creeping toward Madinah", "Madinah kept: a soft ring about it", "a bowl of water", "a heap of salt in the water, melting", "the salt all gone: the water clear"])).toEqual([
      [1, 0, 0, 0, 0],
      [0, 1, 1, 0, 1]
    ]);
    // What the plotter melts like: the plot gone and Madinah kept, before any bowl shows; then a bowl of water shows, a
    // heap of salt in it melts away with ripples, and the water is clear.
    expect([
      shown("What does the plotter melt like, he ﷺ said?", ["a bowl of water", "a heap of salt in the water, melting", "ripples in the water", "the salt all gone: the water clear", "Madinah kept: a soft ring about it"]),
      value("salt-in-water", "a heap of salt in the water, melting", "scaleY", 0.87)
    ]).toEqual([
      [
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1]
      ],
      0.08
    ]);
    // Like a furnace. What happened to the Bedouin the day after his pledge: the golden line of the pledge and the soft
    // ring of his Islam; then night passes to the next day, and waves of heat, a fever, come over his place.
    expect([
      shown("What happened to the Bedouin the day after his pledge?", ["the pledge: a golden line between them", "his Islam: a soft ring about the Bedouin's place", "a fever: waves of heat over the Bedouin's place"]),
      value("like-a-furnace", "night passing, to the next day", "opacity", 0.225)
    ]).toEqual([
      [
        [1, 1, 0],
        [1, 1, 1]
      ],
      0.5
    ]);
    // That he did not cancel the pledge at once: the Bedouin's voice asking, the pledge still there; then his voice says
    // no, three times, and three small dots show.
    expect([
      shown("He ﷺ cancelled the Bedouin's pledge at once.", ["the Bedouin's voice: cancel my pledge", "his voice: no, three times", "three times: a small dot 1", "three times: a small dot 2", "three times: a small dot 3", "the pledge: a golden line between them"]),
      value("like-a-furnace", "his voice: no, three times", "opacity", 0.54)
    ]).toEqual([
      [
        [1, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1]
      ],
      0
    ]);
    // What Madinah is like: no furnace yet, the fever still on the Bedouin's place; then a smith's furnace shows, with
    // the glow in it, a crucible of metal and the bellows, and the fever is gone.
    expect([
      shown("What is Madinah like, he ﷺ said?", ["a smith's furnace, for the likeness", "the glow in the furnace", "a crucible of metal in the furnace", "the bellows, blowing", "a fever: waves of heat over the Bedouin's place"]),
      moved("What is Madinah like, he ﷺ said?", "the glow in the furnace", "scale")
    ]).toEqual([
      [
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
      ],
      [0.5, 0.7]
    ]);
    // Between his house and his pulpit. What lies between them: the golden dashed line from his house to his pulpit;
    // then a soft green light comes, small leaves grow on the masjid floor, small flowers open and its soft light rises.
    expect([
      shown("What lies between his ﷺ house and his minbar?", ["between them: a golden dashed line", "a garden of the gardens of Paradise: a soft green light", "small leaves, growing 1", "small leaves, growing 7", "a small flower, opening 3"]),
      moved("What lies between his ﷺ house and his minbar?", "small leaves, growing 7", "scaleY"),
      value("between-house-and-pulpit", "the garden's soft light, rising 2", "opacity", 0.55)
    ]).toEqual([
      [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
      ],
      [0.1, 1],
      1
    ]);
    // That his pulpit is over his Pool: the garden's soft green light, before the Pool shows; then a soft blue light
    // comes under the pulpit, a soft blue ring and small glints.
    expect(shown("His ﷺ minbar is over his Pool, he said.", ["his Pool: a soft blue light under the pulpit", "his Pool: a soft blue ring", "his Pool: small glints", "a garden of the gardens of Paradise: a soft green light"])).toEqual([
      [0, 0, 0, 1],
      [1, 1, 1, 1]
    ]);
    // A prayer better than a thousand. How many prayers elsewhere a prayer in his masjid beats: the warm light about his
    // masjid after its prayer; then small sparks rise from the other masjids, many small lights come over it, and its
    // warm light grows.
    expect([
      shown("A prayer in his ﷺ masjid beats how many elsewhere?", ["the prayer there: a warm light about his masjid", "a thousand prayers: many small lights over it 1", "a thousand prayers: many small lights over it 2", "a thousand prayers: many small lights over it 3"]),
      moved("A prayer in his ﷺ masjid beats how many elsewhere?", "the prayer there: a warm light about his masjid", "scale"),
      value("thousand-prayers", "prayers in other masjids: a small spark 8", "opacity", 0.36)
    ]).toEqual([
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
      ],
      [1, 1.3],
      1
    ]);
    // Which masjid is left out of the count: the dashed rings about the other masjids; then the Ka'bah shows far off,
    // al-Masjid al-Haram, with a warm light of its own and a soft golden ring about it.
    expect(shown("Which masjid is left out of that count?", ["any other masjid: a dashed ring about it 1", "any other masjid: a dashed ring about it 3", "al-Masjid al-Haram far off: the Ka'bah", "al-Masjid al-Haram: a warm light of its own", "left out of the count: a soft golden ring about it"])).toEqual([
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    // Masjid Quba every Saturday. How often he visited Quba: the way to Quba and the soft ring about its masjid, no day
    // lit yet; then Saturday, the seventh day, lights golden with a ring about it.
    expect(shown("How often did he ﷺ visit Quba, per Ibn Umar?", ["Saturday: the seventh day, lit golden", "Saturday: a golden ring about it", "the way to Quba", "Masjid Quba: a soft ring about it"])).toEqual([
      [0, 0, 1, 1],
      [1, 1, 1, 1]
    ]);
    // How he went there: his place, a golden ring, at his masjid in Madinah; then it walks the way to Quba, its steps
    // showing, and then rides it, a golden ring about a camel with a saddle cloth.
    expect([
      shown("How did he ﷺ go there?", ["a golden ring, his place, walking", "his steps on the way 1", "his steps on the way 9", "riding: a camel with a saddle cloth", "a golden ring about the camel: his place, riding"]),
      moved("How did he ﷺ go there?", "riding: a camel with a saddle cloth", "x"),
      value("quba-every-saturday", "a golden ring, his place, walking", "x", 0.51)
    ]).toEqual([
      [
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1]
      ],
      [-14, 94],
      108
    ]);
  });

  it("waits on the scenes of what he saw and did, from Friday to the land of palms, before anything of the answer shows, and shows it once answered, at rest", () => {
    // Wherever a question on these scenes waits or stops, nothing is halfway through moving or coming into sight.
    const scenes = ["sign-guided-to-friday", "sign-prayers-at-home", "sign-prayer-on-his-mount", "sign-fast-horse", "sign-talking-wolf", "sign-well-dream", "sign-land-of-palms"];
    const asks = sceneAsks().filter((each) => scenes.includes(each.sceneId));
    expect(asks.length).toBe(26);
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
    // Guided to Friday. That Muslims came last, and when they came: waits at the scene's start, before this Ummah's
    // places show; then they come in last, behind the two groups that came before.
    for (const prompt of ["Muslims came last among the nations.", "When did the Muslims come, in the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["this Ummah's places, the last to come", "the first: a golden ring about this Ummah's places", "the Jews' places, come before", "the Christians' places, come before"]),
        moved(prompt, "this Ummah's places, the last to come", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0, 1, 1],
          [1, 0, 1, 1]
        ],
        [20, 0]
      ]);
    }
    // Where Muslims will be on the Day of Resurrection, and when this Ummah is judged: waits at the scene's start, so no
    // word of the moment before it shows; then this Ummah's places come in last, go ahead of them all and stand first, a
    // golden ring about them.
    for (const prompt of ["Where will Muslims be on the Day of Resurrection, in the hadith?", "When will this Ummah be judged, per the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["this Ummah's places, the last to come", "the first: a golden ring about this Ummah's places"]),
        moved(prompt, "this Ummah's places, the last to come", "x")
      ]).toEqual([
        prompt,
        [
          [0, 0],
          [1, 1]
        ],
        [20, -108]
      ]);
    }
    // When Muslims will be foremost: this Ummah's places come in last, behind the others, with no golden ring yet; then
    // they go ahead of them all and stand first, a golden ring about them.
    expect([
      shown("When will Muslims be foremost?", ["this Ummah's places, the last to come", "the first: a golden ring about this Ummah's places"]),
      moved("When will Muslims be foremost?", "this Ummah's places, the last to come", "x")
    ]).toEqual([
      [
        [1, 0],
        [1, 1]
      ],
      [0, -108]
    ]);
    // Which day this Ummah was guided to: the soft ring about Friday, their day, and the grey rings and voices of those
    // who differed over it; then Friday lights, a golden star in it, the voices go, and a warm glow comes about this
    // Ummah's places.
    for (const prompt of ["Which day was this Ummah guided to?", "To which day did Allah guide us, in the hadith?"]) {
      expect([
        prompt,
        shown(prompt, ["guided to it: Friday lit, a golden star in it", "guided to it: a warm glow about this Ummah's places", "their day: a soft ring about Friday", "they differed: a grey ring about the Jews' places", "they differed: a voice from the Jews' places"])
      ]).toEqual([
        prompt,
        [
          [0, 0, 1, 1, 1],
          [1, 1, 1, 1, 0]
        ]
      ]);
    }
    // Prayers at home. Where some prayers should be prayed: waits at the scene's start, the four homes dark and the
    // masjid far off; then a light comes on in three of them, one by one, a spark rising from each, and a warm glow
    // comes over them.
    for (const prompt of ["Where should some prayers be prayed?", "Pray some ____ at home, not only at the masjid.", "Pray some prayers at home, not only at the masjid."]) {
      expect([
        prompt,
        shown(prompt, ["prayer in home 1: its light", "prayer in home 2: its light", "prayer in home 3: its light", "homes with prayer: a warm glow over them", "prayer in home 4: its light"]),
        value("prayers-at-home", "prayer in home 2: a spark rising", "opacity", 0.195)
      ]).toEqual([
        prompt,
        [
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0]
        ],
        1
      ]);
    }
    // What a home with no prayer is likened to: three homes lit, a warm glow over them, the fourth still dark; then a
    // grey ring comes about the fourth home, a home with no prayer, and then its light comes on too, a spark rises, and
    // a warm glow comes over all four homes.
    expect([
      shown("A home with no prayer is likened to what?", ["prayer in home 4: its light", "all four homes with prayer: a warm glow over them", "homes with prayer: a warm glow over them"]),
      value("prayers-at-home", "a home with no prayer: a grey ring about home 4", "opacity", 0.58)
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 0]
      ],
      1
    ]);
    // The voluntary prayer on his mount. Which prayers he prayed while riding: waits at the scene's start, his mount
    // standing, a golden ring about it for his place; then a warm glow comes about his place, his prayer, and three
    // sparks rise from it, one by one.
    expect([
      shown("Which prayers did he ﷺ pray while riding?", ["his prayer: a warm glow about his place", "a golden ring about his mount: his place, riding", "his mount, a camel with a saddle cloth"]),
      value("prayer-on-his-mount", "his voluntary prayers: a spark rising 2", "opacity", 0.16),
      value("prayer-on-his-mount", "his voluntary prayers: a spark rising 2", "y", 0.18)
    ]).toEqual([
      [
        [0, 1, 1],
        [1, 1, 1]
      ],
      1,
      -14
    ]);
    // That travelling did not stop his extra prayers: waits at the scene's start; then his prayer's glow comes and
    // sparks rise, and his mount walks on along the road, sparks still rising as it goes, his prayer's glow with it.
    expect([
      shown("Travelling did not stop him ﷺ from extra prayers.", ["his prayer: a warm glow about his place"]),
      moved("Travelling did not stop him ﷺ from extra prayers.", "his mount, a camel with a saddle cloth", "x"),
      moved("Travelling did not stop him ﷺ from extra prayers.", "his prayer: a warm glow about his place", "x"),
      value("prayer-on-his-mount", "praying while riding: a spark rising 1", "x", 0.43)
    ]).toEqual([
      [[0], [1]],
      [0, 60],
      [0, 60],
      8.2
    ]);
    // Which way he faced when riding: his mount on the road after walking on; then a soft ring comes about the Ka'bah
    // far behind, the qiblah, a faint line goes back to it, a golden way goes ahead, the way the camel faces, and a
    // spark rises.
    expect([
      shown("Which way did he face when riding?", ["the qiblah: a soft ring about the Ka'bah, far behind", "the qiblah behind: a faint line back to it", "facing the way it goes: a golden way ahead", "his prayer: a warm glow about his place"]),
      value("prayer-on-his-mount", "facing other than the qiblah: a spark rising", "opacity", 0.82)
    ]).toEqual([
      [
        [0, 0, 0, 1],
        [1, 1, 1, 1]
      ],
      1
    ]);
    // Abu Talhah's horse, like a sea. Whose horse he borrowed: the fright over Madinah, the horse by Abu Talhah's home;
    // then his place comes to Abu Talhah's home, his voice asks for the horse, and a golden line goes from Abu Talhah's
    // place to the horse, a soft ring about it.
    expect([
      shown("Whose horse did the Prophet ﷺ borrow?", ["his voice, asking to borrow the horse", "lent: a golden line from Abu Talhah's place to the horse", "lent: a soft ring about the horse", "the horse, al-Mandub, by Abu Talhah's home", "Abu Talhah's place, by his home"]),
      moved("Whose horse did the Prophet ﷺ borrow?", "a golden ring, his place", "x")
    ]).toEqual([
      [
        [0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1]
      ],
      [0, 15.6]
    ]);
    // The horse's name: the golden line of the loan to the horse; then his place goes to it, a golden ring comes about
    // it, his place riding, and it goes out fast, quick strokes behind it, out of sight.
    expect([
      shown("What was the horse's name?", ["the horse, al-Mandub, by Abu Talhah's home", "the horse, going out fast", "a golden ring about the horse: his place, riding", "lent: a golden line from Abu Talhah's place to the horse"]),
      moved("What was the horse's name?", "a golden ring about the horse: his place, riding", "x"),
      value("fast-horse", "the horse, going out fast", "x", 0.51)
    ]).toEqual([
      [
        [1, 0, 0, 1],
        [0, 0, 1, 0]
      ],
      [0, 76],
      66.5
    ]);
    // What he found when he rode out: the fright still over Madinah, the horse gone out; then the horse comes back fast,
    // the grey rings of the fright go, and his voice says: we saw nothing.
    expect([
      shown("What did the Prophet ﷺ find when he rode out?", ["his voice: we saw nothing", "the horse, back by Abu Talhah's home", "a fright: grey rings over Madinah", "a fright: worried voices"]),
      value("fast-horse", "the horse, coming back fast", "x", 0.7)
    ]).toEqual([
      [
        [0, 0, 1, 1],
        [1, 1, 0, 0]
      ],
      -76
    ]);
    // The wolf that spoke. What the wolf did: the wolf off with the sheep it took, the shepherd's place after it and the
    // sheep back with the flock; then the wolf turns to the shepherd, and its voice asks who will guard it.
    expect(shown("What did the wolf in the story do?", ["the wolf, running off with the sheep", "the wolf, turned to the shepherd", "the wolf's voice: who will guard it", "the sheep, saved, running back to the flock"])).toEqual([
      [1, 0, 0, 1],
      [0, 1, 1, 1]
    ]);
    // Who he said believed it with him: the gathering about his place and the folk's voices wondering; then his voice
    // says he believes it, Abu Bakr's and Umar's places show far off, and a soft golden ring comes about them.
    expect(shown("Who did the Prophet ﷺ say believed it with him?", ["his voice: I believe it", "Abu Bakr's and Umar's places, far off", "they believe it too: a soft golden ring about them", "the gathering: a golden ring, his place", "the folk's voices, wondering: glory be!"])).toEqual([
      [0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0]
    ]);
    // That Abu Bakr and Umar were not sitting there: the gathering about his place, before their places show; then his
    // voice says he believes it, their places show far off with a soft golden ring, and grey rings come about two empty
    // spots beside his place.
    expect(shown("Abu Bakr and Umar were sitting there when he said it.", ["Abu Bakr's and Umar's places, far off", "they believe it too: a soft golden ring about them", "not there: grey rings about two empty spots beside his place", "his voice: I believe it"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 0]
    ]);
    // The dream of the well. That he was first to draw: his place, a golden ring, at the well, the bucket on it; then
    // the bucket goes down and comes up full, twice, and the trough fills a little.
    expect([
      shown("The Prophet ﷺ was first to draw water in the dream.", ["a golden ring, his place", "water in the trough", "Ibn Abi Quhafah's place"]),
      value("well-dream", "the bucket", "y", 0.18),
      value("well-dream", "water in the trough", "scaleY", 0.27)
    ]).toEqual([
      [
        [1, 0, 0],
        [1, 1, 0]
      ],
      24,
      0.35
    ]);
    // How many buckets Ibn Abi Quhafah drew: the trough filled a little, before his place shows; then his place shows at
    // the well, and the bucket goes down and comes up twice, and the trough fills more.
    expect([
      shown("How many buckets did Ibn Abi Quhafah draw?", ["Ibn Abi Quhafah's place", "a golden ring, his place"]),
      moved("How many buckets did Ibn Abi Quhafah draw?", "water in the trough", "scaleY"),
      moved("How many buckets did Ibn Abi Quhafah draw?", "a golden ring, his place", "x"),
      value("well-dream", "the bucket", "y", 0.43)
    ]).toEqual([
      [
        [0, 1],
        [1, 1]
      ],
      [0.35, 0.6],
      [0, -14],
      24
    ]);
    // Who took the bucket after him and drew the most: the huge bucket, with glints about it, before Ibn al-Khattab's
    // place shows; then his place shows and goes to the well, a soft golden ring comes about it, and the huge bucket
    // comes up full twice, until the trough is full.
    expect([
      shown("Who took the bucket after him and drew the most?", ["Ibn al-Khattab's place, Umar's", "mighty in drawing: a soft golden ring about Umar's place", "a huge bucket: glints about it"]),
      moved("Who took the bucket after him and drew the most?", "Ibn al-Khattab's place, Umar's", "x"),
      moved("Who took the bucket after him and drew the most?", "water in the trough", "scaleY"),
      value("well-dream", "the bucket", "scale", 0.78)
    ]).toEqual([
      [
        [0, 0, 1],
        [1, 1, 0]
      ],
      [0, 38],
      [0.6, 1],
      2.2
    ]);
    // A land of palm trees. What kind of land he saw himself migrating to: his place on the way of the migration out of
    // Makkah, with no palms yet; then palm trees show ahead, a soft ring comes about the land of palms, and his place
    // goes on toward it.
    expect([
      shown("What kind of land did he ﷺ see himself migrating to?", ["a palm of the land of palms 1", "a palm of the land of palms 4", "a land of palm trees: a soft ring about it", "the way of the migration"]),
      moved("What kind of land did he ﷺ see himself migrating to?", "a golden ring, his place", "x")
    ]).toEqual([
      [
        [0, 0, 0, 1],
        [1, 1, 1, 1]
      ],
      [32, 62]
    ]);
    // That he first thought it might be al-Yamamah: his place on the way, the land of palms ahead, before any land far
    // off shows; then two lands of palms show far off, with lines to them and rings about them.
    expect(shown("He ﷺ first thought the land might be al-Yamamah.", ["a land of palms far off 1", "a land of palms far off 2", "thought of: a line to a land far off 1", "thought of: a ring about a land far off 2", "homes among the palms: Yathrib"])).toEqual([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0]
    ]);
    // Which city the land turned out to be: the lands far off that he thought of, before any home shows among the palms;
    // then they fade, homes show among the palms, Yathrib, with a golden ring about it, his place comes to it, and a
    // warm glow comes over Madinah.
    expect([
      shown("Which city did that land turn out to be?", ["homes among the palms: Yathrib", "it was Madinah: a golden ring about Yathrib", "Madinah: a warm glow over it", "a land of palms far off 1", "thought of: a line to a land far off 1"]),
      moved("Which city did that land turn out to be?", "a golden ring, his place", "x")
    ]).toEqual([
      [
        [0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0]
      ],
      [62, 84]
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
