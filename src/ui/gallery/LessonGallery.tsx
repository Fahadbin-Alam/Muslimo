import { Teacher, teacherFor } from "../lesson/Teacher";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { getLessonArabic, NODE_ARABIC } from "../../data/arabicTerms";
import { COURSE, LESSONS_BY_ID } from "../../data/course";
import { choicePictures, getLessonPicture, LESSON_PICTURE_IDS, pictureForLesson, pictureForPage, pictureForQuestion } from "../../data/lessonPictures";
import { LessonPhoto } from "../lesson/LessonPhoto";
import { MatchGame } from "../lesson/WordGames";
import { MapGame } from "../lesson/MapGame";
import { mapPlacesFor } from "../lesson/mapQuestions";
import { SkyGame } from "../lesson/SkyGame";
import { answersArePrayers, skyTimesFor } from "../lesson/skyQuestions";
import { SceneGame } from "../lesson/SceneGame";
import { sceneQuestionFor } from "../lesson/sceneQuestions";
import { MonthGame } from "../lesson/MonthGame";
import { monthsFor } from "../lesson/monthQuestions";
import { CardGame, CardPicture } from "../lesson/CardGame";
import { cardsFor } from "../lesson/cardQuestions";
import { ANIMAL_KINDS } from "../lesson/animalArt";
import { THING_KINDS } from "../lesson/thingArt";
import type { CardKind } from "../lesson/cardArt";
import { SurahCover } from "../lesson/SurahCover";
import { ALBUM_SETS } from "../../data/albumSets";
import { addToAlbum } from "../../services/pictureAlbum";
import { PictureAlbumSheet } from "../screens/PictureAlbum";
import { SayItSheet } from "../screens/SayItSheet";
import { SprintSheet } from "../screens/SprintSheet";
import { StreakMoment } from "../lesson/StreakMoment";
import { localDateKey } from "../../api/islamicLearningApi";
import { shiftDateKey } from "../../services/familyCode";
import { recordSprint, sprintCards, sprintRecord } from "../../services/swipeSprint";
import { markWordSaid } from "../../services/saidWords";
import { surahNumberForTitle, surahParts } from "../../data/surahPictures";
import { localizeLessonContent } from "../../services/contentLocalization";
import { setActiveLanguage } from "../../i18n";
import { highlightWords, lessonSummary } from "../lesson/lessonPages";
import { useAyahPlayback } from "../lesson/AyahListen";
import { firstLessonQuoting, nextAyahChallenge, reciteChallenge } from "../lesson/reciteQuestion";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import type { Challenge, Lesson, SupportedLanguage } from "../../types";
import { ExerciseView, LearnCard, LessonComplete, LessonScreen, OrderGame, QuitSheet, getLessonLine, shortWhy, type LessonHearts } from "../lesson";
import { colors, fonts, space } from "../theme";

// Dev gallery for the lesson screens. #gallery-lesson shows every state stacked in phone frames;
// #gallery-lesson-STATE shows one state full screen.

const FOUNDATION = COURSE.sections.find((section) => section.id === "foundation");
const PRAYER = COURSE.sections.find((section) => section.id === "prayer-expansion");
const FOUNDATION_ACCENT = FOUNDATION?.accentColor ?? colors.green;
const PRAYER_ACCENT = PRAYER?.accentColor ?? colors.gem;

const salam = LESSONS_BY_ID["lesson-foundation-niyyah"] as Lesson;
const wudu = LESSONS_BY_ID["lesson-prayer-wudu-steps"] as Lesson;
const allLessons = Object.values(LESSONS_BY_ID) as Lesson[];
const plainLesson =
  allLessons.find((lesson) => lesson.id.startsWith("lesson-sahabi") && !getLessonArabic(lesson.nodeId, lesson.branchId)) ??
  allLessons.find((lesson) => !getLessonArabic(lesson.nodeId, lesson.branchId)) ??
  salam;
const allChallenges = allLessons.flatMap((lesson) => lesson.challenges);
const forgiveQuestion =
  allChallenges.find((challenge) => challenge.prompt.startsWith("Forgiveness can be a sign of strength")) ?? salam.challenges[1];
const longQuestion =
  allLessons.flatMap((lesson) => lesson.challenges).sort((a, b) => b.prompt.length - a.prompt.length)[0] ?? salam.challenges[0];
// Quran ayah prompts ("What does this ayah mean? <ayah> (Quran 1:3)"), shortest and a long one.
const ayahQuestions = allChallenges.filter((challenge) => challenge.prompt.startsWith("What does this ayah mean?")).sort((a, b) => a.prompt.length - b.prompt.length);
const ayahQuestion = ayahQuestions[0] ?? salam.challenges[0];
const longAyahQuestion = ayahQuestions[Math.floor(ayahQuestions.length * 0.9)] ?? ayahQuestion;
// "Which tribe was Muhammad ﷺ from?": the honorific stays inside the English line.
const honorificQuestion = allChallenges.find((challenge) => /\uFDFA/.test(challenge.prompt) && challenge.choices.length >= 4) ?? salam.challenges[0];
// Four long answers: the short-phone layout and the "more below" hint.
const longChoicesQuestion =
  allChallenges
    .filter((challenge) => challenge.type === "multiple_choice" && challenge.choices.length >= 4)
    .sort((a, b) => b.choices.reduce((sum, choice) => sum + choice.label.length, 0) - a.choices.reduce((sum, choice) => sum + choice.label.length, 0))
    .find((challenge) => challenge.choices.every((choice) => choice.label.length < 140)) ?? salam.challenges[0];
const muhammad = (allLessons.find((lesson) => getLessonArabic(lesson.nodeId, lesson.branchId)?.ar.includes("\uFDFA")) ?? salam) as Lesson;
const hadithLesson = (allLessons.find((lesson) => lesson.id.startsWith("lesson-notes-hadith") && lesson.quote) ??
  allLessons.find((lesson) => lesson.id.startsWith("lesson-notes-hadith")) ??
  salam) as Lesson;
// The longest quote in the course and a lesson with fact chips (a prophet or companion).
const longQuoteLesson = allLessons.filter((lesson) => lesson.quote).sort((a, b) => (b.quote?.text?.length ?? 0) - (a.quote?.text?.length ?? 0))[0] ?? hadithLesson;
// An Arabic ayah with Listen and Repeat under it (a surah lesson).
const ayahLesson =
  allLessons.find((lesson) => /^Quran \d+:\d+$/.test(lesson.quote?.reference ?? "") && /^[\u0600-\u06FF\s]+$/.test(lesson.quote?.text ?? "")) ?? hadithLesson;
const surahMeaningLesson = (LESSONS_BY_ID["lesson-surah-meaning-2-254-257"] ?? ayahLesson) as Lesson;
// Lessons and a question that name a place with a photo (Makkah, the Ka'bah, Uhud...).
const photoLesson = allLessons.find((lesson) => lesson.title === "The Ka'bah") ?? allLessons.find((lesson) => pictureForLesson(lesson)) ?? salam;
const photoArabicLesson = allLessons.find((lesson) => pictureForLesson(lesson) && getLessonArabic(lesson.nodeId, lesson.branchId)) ?? photoLesson;
// Every answer a place with its own picture: picture cards (Arafah, Mina, Muzdalifah...).
const pictureAnswersQuestion =
  allChallenges.find((challenge) => challenge.prompt.startsWith("After Arafah") && choicePictures(challenge.choices)) ??
  allChallenges.find((challenge) => choicePictures(challenge.choices)) ??
  salam.challenges[0];
const photoQuestion = allChallenges.find((challenge) => pictureForQuestion(challenge.prompt)?.id === "uhud") ?? salam.challenges[0];
const eidLesson = (LESSONS_BY_ID["lesson-deep-eid-two-days"] ?? salam) as Lesson;
const factsLesson = allLessons.find((lesson) => (lesson.learnFacts?.length ?? 0) >= 3) ?? allLessons.find((lesson) => lesson.learnFacts?.length) ?? salam;
// A very long right answer (a real course text of about 600 characters, like a full ayah translation):
// the wrong sheet must stay inside the screen and scroll.
const longText =
  allLessons
    .map((lesson) => lesson.explanationContent ?? "")
    .filter((text) => text.length <= 650)
    .sort((a, b) => b.length - a.length)[0] ?? salam.intro;
const longAnswerQuestion: Challenge = {
  ...salam.challenges[0],
  id: "gallery-long-answer",
  choices: [
    { id: "a", label: longText },
    { id: "b", label: salam.challenges[0].choices[1]?.label ?? "See you later" }
  ],
  correctChoiceId: "a"
};

/** A learn card the way TopicApp builds it from a lesson. */
function LearnDemo({ lesson, accent, mascot = "boy", isNewWord }: { lesson: Lesson; accent: string; mascot?: string; isNewWord?: boolean }) {
  const arabic = getLessonArabic(lesson.nodeId, lesson.branchId);
  return (
    <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
      <LearnCard
        title={lesson.title}
        line={getLessonLine(lesson)}
        arabic={arabic}
        isNewWord={isNewWord}
        facts={lesson.learnFacts}
        quote={lesson.quote}
        onPlayAudio={arabic ? noop : undefined}
        learnSource={lesson.learnSource}
        picture={pictureForLesson(lesson)}
        deeper={lesson.learnDeeper}
        mascotVariant={mascot}
        accent={accent}
        onContinue={noop}
        onOpenSource={noop}
      />
    </LessonScreen>
  );
}

/**
 * A lesson's "What you learn" page as the app shows it: the teacher, the page's picture, the facts with what the
 * source says, the surah's parts and the source. ?lang=bn (or ur, ar) shows it in that language.
 */
function FactsPageDemo({ lesson: english }: { lesson: Lesson }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const lesson = localizeLessonContent(english, language);
  const surahNumber = surahNumberForTitle(english.title);
  const picture = pictureForLesson(english);
  const pagePicture = pictureForPage(english, "facts", ["start"]);
  const summaryShown = lessonSummary(english) ? lesson.learnSource?.summary : undefined;
  return (
    <LessonScreen progress={0.12} hearts={FULL_HEARTS} onClose={noop}>
      <LearnCard
        page="facts"
        summary={summaryShown}
        englishSummary={summaryShown ? english.learnSource?.summary : undefined}
        marks={highlightWords(lesson)}
        sourceHere
        title={lesson.title}
        line={getLessonLine(lesson)}
        facts={lesson.learnFacts}
        englishFacts={english.learnFacts}
        quote={lesson.quote}
        learnSource={lesson.learnSource}
        picture={picture}
        pagePicture={pagePicture && pagePicture.id !== picture?.id ? pagePicture : undefined}
        surah={surahNumber ? { number: surahNumber, parts: surahParts(surahNumber) } : undefined}
        teacher={teacherFor(COURSE.sections.find((section) => section.nodes.some((node) => node.id === english.nodeId))?.topicId)}
        mascotVariant="boy"
        accent={accentOf(english)}
        onContinue={noop}
        onOpenSource={noop}
      />
    </LessonScreen>
  );
}

const baqarahLesson = (LESSONS_BY_ID["lesson-notes-quran-tafseer-surahs-1-10-surah-al-baqarah"] ?? salam) as Lesson;

// The accent of the section that holds the lesson's circle. Not the id prefix: the marriage hadith keep
// "lesson-notes-hadith-…" ids but sit in the Marriage topic.
function accentOf(lesson: Lesson) {
  return COURSE.sections.find((section) => section.nodes.some((node) => node.id === lesson.nodeId))?.accentColor ?? colors.gem;
}

const ARABIC_QUESTION: Challenge = {
  id: "gallery-arabic-choices",
  type: "multiple_choice",
  prompt: `Which one means "${NODE_ARABIC["foundation-niyyah"].meaning}"?`,
  choices: [
    { id: "a", label: NODE_ARABIC["foundation-bismillah"].ar },
    { id: "b", label: NODE_ARABIC["foundation-niyyah"].ar },
    { id: "c", label: NODE_ARABIC["foundation-guidance"].ar }
  ],
  correctChoiceId: "b",
  explanation: "As-salamu alaykum means peace be upon you."
};

const ARABIC_PROMPT: Challenge = {
  id: "gallery-arabic-prompt",
  type: "multiple_choice",
  prompt: `What does ${NODE_ARABIC["foundation-bismillah"].ar} mean?`,
  choices: [
    { id: "a", label: NODE_ARABIC["foundation-bismillah"].meaning },
    { id: "b", label: NODE_ARABIC["foundation-guidance"].meaning },
    { id: "c", label: NODE_ARABIC["foundation-niyyah"].meaning }
  ],
  correctChoiceId: "a",
  explanation: "We say it before we start."
};

const WUDU_STEPS = [
  { id: "bismillah", label: "Say Bismillah" },
  { id: "hands", label: "Wash hands" },
  { id: "mouth", label: "Rinse mouth" },
  { id: "nose", label: "Rinse nose" },
  { id: "face", label: "Wash face" },
  { id: "arms", label: "Wash arms to the elbows" },
  { id: "head", label: "Wipe head and ears" },
  { id: "feet", label: "Wash feet" }
];
const WUDU_ORDER = WUDU_STEPS.map((step) => step.id);
// Gallery copy of the two-rak'ah prayer game, like Fajr (the course builds its own in lessonGuidance).
const SALAH_STEPS = [
  { id: "takbir", label: "Opening takbir" },
  { id: "qiyam", label: "Stand and recite" },
  { id: "ruku", label: "Ruku, then stand" },
  { id: "sujud", label: "Two sujud" },
  { id: "qiyam2", label: "Stand for rak'ah 2" },
  { id: "ruku2", label: "Ruku again" },
  { id: "sujud2", label: "Two sujud again" },
  { id: "tashahhud", label: "Tashahhud" },
  { id: "taslim", label: "Taslim" }
];
const SALAH_ORDER = SALAH_STEPS.map((step) => step.id);

const FULL_HEARTS: LessonHearts = { current: 5, max: 5, unlimited: false };
const noop = () => undefined;

function ReciteDemo({ ayahKey = "112:4", next = false }: { ayahKey?: string; next?: boolean }) {
  const lesson = LESSONS_BY_ID[firstLessonQuoting(ayahKey) ?? ""];
  const challenge = lesson ? (next ? nextAyahChallenge(lesson) : reciteChallenge(lesson)) : undefined;
  return challenge ? <ExerciseDemo challenge={challenge} progress={0.7} /> : null;
}

function ExerciseDemo({
  challenge,
  accent = FOUNDATION_ACCENT,
  initialSelected,
  checkNow,
  attempt,
  review,
  whyOpen,
  progress = 0.4
}: {
  challenge: Challenge;
  accent?: string;
  initialSelected?: string;
  checkNow?: boolean;
  /** 1 or more: the question came back after a miss. */
  attempt?: number;
  review?: boolean;
  whyOpen?: boolean;
  progress?: number;
}) {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);
  const [checked, setChecked] = useState(Boolean(checkNow));
  const [hearts, setHearts] = useState<LessonHearts>(FULL_HEARTS);
  // "How does the ayah end?": Listen plays the ayah once from its start, or stops it, as in a lesson.
  const playback = useAyahPlayback();
  const recite = challenge.listen?.recite;
  const recitation = recite ? challenge.listen?.recitation : undefined;
  const reciting = Boolean(recitation) && playback.url === recitation && (playback.status === "playing" || playback.status === "loading");
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  // What TopicApp should pass as `why`: one short, useful sentence (or nothing).
  const why = shortWhy({
    explanation: challenge.explanation,
    easierExplanation: challenge.easierExplanation,
    prompt: challenge.prompt,
    correctLabel
  });

  useEffect(() => {
    // Shows the heart drop animation for a pre-checked wrong answer.
    if (checkNow && initialSelected !== challenge.correctChoiceId) {
      const timer = setTimeout(() => setHearts((value) => ({ ...value, current: value.current - 1 })), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [challenge.correctChoiceId, checkNow, initialSelected]);

  return (
    <LessonScreen progress={checked && correct ? progress + 0.1 : progress} hearts={hearts} onClose={noop}>
      <ExerciseView
        kind={challenge.type}
        prompt={challenge.prompt}
        choices={challenge.choices}
        selectedChoiceId={selected}
        correctChoiceId={challenge.correctChoiceId}
        result={checked ? { correct, correctLabel, why } : undefined}
        attempt={attempt}
        review={review ?? challenge.isReview}
        mascotVariant="girl"
        accent={accent}
        praiseSeed={challenge.id}
        picture={choicePictures(challenge.choices) ? undefined : pictureForQuestion(challenge.prompt)}
        choicePictures={choicePictures(challenge.choices)}
        defaultWhyOpen={whyOpen}
        listen={
          recite && recitation
            ? {
                onPlay: () => (reciting ? stopAyah(recitation) : playAyah(recitation, { once: true })),
                playing: reciting,
                recite: {
                  text: challenge.listen!.ar,
                  ayahKey: recite.key,
                  url: recitation,
                  gap: recite.gap,
                  next: recite.next ? { text: recite.next.text, ayahKey: recite.next.key, url: recite.next.recitation } : undefined
                }
              }
            : undefined
        }
        onSelect={setSelected}
        onCheck={() => {
          setChecked(true);
          if (selected !== challenge.correctChoiceId) {
            setHearts((value) => ({ ...value, current: Math.max(0, value.current - 1) }));
          }
        }}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

function QuitDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <LessonScreen
      progress={0.3}
      hearts={FULL_HEARTS}
      onClose={() => setVisible(true)}
      overlay={<QuitSheet visible={visible} onKeepLearning={() => setVisible(false)} onQuit={() => setVisible(false)} mascotVariant="boy" accent={PRAYER_ACCENT} />}
    >
      <ExerciseView
        kind="multiple_choice"
        prompt={salam.challenges[2].prompt}
        choices={salam.challenges[2].choices}
        mascotVariant="boy"
        accent={PRAYER_ACCENT}
        onSelect={noop}
        onCheck={noop}
        onContinue={noop}
      />
    </LessonScreen>
  );
}

type State = { id: string; render: () => React.ReactElement };

/** The picture album with a few found: #gallery-lesson-album. */
function AlbumDemo() {
  addToAlbum(["kaaba", "ark", "arafah", "mina", "muzdalifah", "ants", "big-fish", "nile", "aqsa", "jerusalem", "damascus"]);
  return <PictureAlbumSheet visible onClose={noop} />;
}

/** Say it out loud, with two words already said: #gallery-lesson-say-it. */
function SayItDemo() {
  markWordSaid("assalamu-alaykum");
  markWordSaid("bismillah");
  return <SayItSheet visible onClose={noop} mascotVariant="girl" accent={FOUNDATION_ACCENT} soundOn={false} />;
}

/** The streak moment for a streak of `days` (?lang=bn, ur or ar), today in this week, with a freeze some days ago. */
function StreakDemo({ days, frozenDaysAgo, variant = "girl" }: { days: number; frozenDaysAgo?: number; variant?: string }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  setActiveLanguage((["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage);
  const today = localDateKey();
  return (
    <StreakMoment
      days={days}
      today={today}
      frozenDays={frozenDaysAgo ? [shiftDateKey(today, -frozenDaysAgo)] : undefined}
      mascotVariant={variant}
      accent={variant === "boy" ? PRAYER_ACCENT : FOUNDATION_ACCENT}
      playSounds={false}
      onContinue={noop}
    />
  );
}

/**
 * A place question asked on the map, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function MapDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const places = mapPlacesFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <MapGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        places={places}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * A month question asked on the year, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function MonthQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const months = monthsFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <MonthGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        months={months}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * A question on picture cards, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function CardQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const kinds = cardsFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <CardGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        kinds={kinds}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/** Every animal (or every thing) the cards can draw, moving, each with its name: to look them all over at once. */
function CardWall({ kinds }: { kinds: CardKind[] }) {
  return (
    <ScrollView contentContainerStyle={styles.wall}>
      {kinds.map((kind) => (
        <View key={kind} style={styles.animalItem} testID={`zoo-${kind}`}>
          <CardPicture kind={kind} width={136} height={104} still={false} />
          <Text style={styles.caption}>{kind}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * A time question asked in the sky, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function SkyQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const times = skyTimesFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <SkyGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        times={times}
        byPrayer={answersArePrayers(english.challenges[index])}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * A story question asked on its living scene, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has
 * `ask`. `pick`: an answer already picked; `check`: and checked (the answer sheet up, the scene playing the moment).
 */
function SceneQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const scene = sceneQuestionFor(english.challenges[index]);
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  if (!scene) return <Text style={styles.caption}>No scene for this question</Text>;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <SceneGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        ask={scene}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * The swipe sprint after forty lessons, with a best of 12 kept: #gallery-lesson-sprint (?lang=bn, ur or ar). Each
 * game is six cards, the first with a living picture when one has it, so it can be played to its end in a few taps.
 */
function SprintDemo() {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  useState(() => (sprintRecord().best < 12 ? recordSprint(12) : false));
  const lessonIds = allLessons.slice(0, 40).map((lesson) => lesson.id);
  const game = useRef(0);
  const makeCards = () => {
    game.current += 1;
    const cards = sprintCards({ completedLessonIds: lessonIds }, { language, seed: 7 + game.current });
    const pictured = cards.find((card) => card.pictureId);
    return (pictured ? [pictured, ...cards.filter((card) => card !== pictured)] : cards).slice(0, 6);
  };
  return <SprintSheet visible onClose={noop} makeCards={makeCards} mascotVariant="girl" accent={FOUNDATION_ACCENT} />;
}

/** Every lesson picture, living (birds, clouds, rain, ants...), and a few surah covers: #gallery-lesson-pictures. */
function PictureWall() {
  const pictures = LESSON_PICTURE_IDS.map((id) => getLessonPicture(id)).filter((picture) => picture !== undefined);
  return (
    <ScrollView contentContainerStyle={styles.wall}>
      {[2, 71, 105, 112].map((surah) => (
        <View key={`surah-${surah}`} style={styles.wallItem}>
          <SurahCover surah={surah} meaning={`Surah ${surah}`} />
        </View>
      ))}
      {pictures.map((picture) => (
        <View key={picture.id} style={styles.wallItem}>
          <LessonPhoto picture={picture} delay={0} />
        </View>
      ))}
    </ScrollView>
  );
}

const STATES: State[] = [
  { id: "pictures", render: () => <PictureWall /> },
  {
    id: "learn",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={salam.title}
          line={getLessonLine(salam)}
          arabic={getLessonArabic(salam.nodeId, salam.branchId)}
          onPlayAudio={noop}
          learnSource={salam.learnSource}
          mascotVariant="girl"
          accent={FOUNDATION_ACCENT}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-plain",
    render: () => (
      <LessonScreen progress={0.08} hearts={{ current: 3, max: 5, unlimited: false }} onClose={noop}>
        <LearnCard
          title={plainLesson.title}
          line={getLessonLine(plainLesson)}
          learnSource={plainLesson.learnSource}
          mascotVariant="boy"
          accent={COURSE.sections.find((section) => section.id === "sahabah-expansion")?.accentColor ?? colors.green}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-honorific",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={muhammad.title}
          line={getLessonLine(muhammad)}
          arabic={getLessonArabic(muhammad.nodeId, muhammad.branchId)}
          onPlayAudio={noop}
          learnSource={muhammad.learnSource}
          mascotVariant="boy"
          accent={COURSE.sections.find((section) => section.topicId === "prophets")?.accentColor ?? colors.gem}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  { id: "learn-hadith", render: () => <LearnDemo lesson={hadithLesson} accent={accentOf(hadithLesson)} isNewWord={false} /> },
  { id: "learn-quote-long", render: () => <LearnDemo lesson={longQuoteLesson} accent={accentOf(longQuoteLesson)} isNewWord={false} /> },
  { id: "learn-ayah", render: () => <LearnDemo lesson={ayahLesson} accent={accentOf(ayahLesson)} isNewWord={false} /> },
  // A passage of a whole surah's meaning (surahMeanings): its line, facts and a long ayah to listen to.
  { id: "learn-surah-meaning", render: () => <LearnDemo lesson={surahMeaningLesson} accent={accentOf(surahMeaningLesson)} isNewWord={false} /> },
  // A surah's "What you learn" page (the one Fahad found hard to read): facts the source repeats are shown once.
  { id: "learn-surah-facts", render: () => <FactsPageDemo lesson={baqarahLesson} /> },
  { id: "learn-facts", render: () => <LearnDemo lesson={factsLesson} accent={accentOf(factsLesson)} mascot="girl" /> },
  // The facts as a short lesson, and who told it and the grade with the source at the end.
  { id: "learn-eid", render: () => <LearnDemo lesson={eidLesson} accent={accentOf(eidLesson)} mascot="girl" isNewWord={false} /> },
  { id: "learn-photo", render: () => <LearnDemo lesson={photoLesson} accent={accentOf(photoLesson)} isNewWord={false} /> },
  { id: "learn-photo-arabic", render: () => <LearnDemo lesson={photoArabicLesson} accent={accentOf(photoArabicLesson)} /> },
  { id: "mc-pictures", render: () => <ExerciseDemo challenge={pictureAnswersQuestion} progress={0.5} /> },
  // "How does the ayah end?" (reciteQuestion): Al-Ikhlas's last ayah, as its first lesson asks it.
  { id: "recite", render: () => <ReciteDemo /> },
  // "Which ayah comes next?": after Al-Ikhlas's first ayah.
  { id: "recite-next", render: () => <ReciteDemo ayahKey="112:1" next /> },
  { id: "mc-photo", render: () => <ExerciseDemo challenge={photoQuestion} progress={0.3} /> },
  { id: "mc", render: () => <ExerciseDemo challenge={salam.challenges[0]} progress={0.25} /> },
  { id: "mc-selected", render: () => <ExerciseDemo challenge={salam.challenges[0]} initialSelected="a" progress={0.25} /> },
  { id: "mc-correct", render: () => <ExerciseDemo challenge={salam.challenges[0]} initialSelected="a" checkNow progress={0.25} /> },
  { id: "mc-wrong", render: () => <ExerciseDemo challenge={salam.challenges[2]} initialSelected="b" checkNow whyOpen progress={0.55} /> },
  { id: "tf-wrong", render: () => <ExerciseDemo challenge={forgiveQuestion} initialSelected="false" checkNow whyOpen progress={0.5} /> },
  { id: "tf", render: () => <ExerciseDemo challenge={salam.challenges[1]} initialSelected="false" progress={0.4} /> },
  { id: "tf-retry", render: () => <ExerciseDemo challenge={salam.challenges[1]} attempt={1} progress={0.4} /> },
  { id: "mc-retry", render: () => <ExerciseDemo challenge={salam.challenges[0]} attempt={1} progress={0.9} /> },
  { id: "mc-review", render: () => <ExerciseDemo challenge={salam.challenges[2]} review progress={0.8} /> },
  {
    id: "long-answer-wrong",
    render: () => (
      <ExerciseDemo
        challenge={longAnswerQuestion}
        accent={colors.gem}
        initialSelected={longAnswerQuestion.choices.find((choice) => choice.id !== longAnswerQuestion.correctChoiceId)?.id}
        checkNow
        whyOpen
        progress={0.6}
      />
    )
  },
  { id: "arabic", render: () => <ExerciseDemo challenge={ARABIC_QUESTION} initialSelected="b" progress={0.7} /> },
  { id: "arabic-prompt", render: () => <ExerciseDemo challenge={ARABIC_PROMPT} progress={0.7} /> },
  { id: "long", render: () => <ExerciseDemo challenge={longQuestion} accent={colors.gem} initialSelected="true" progress={0.85} /> },
  { id: "long-choices", render: () => <ExerciseDemo challenge={longChoicesQuestion} accent={colors.gem} progress={0.6} /> },
  {
    id: "long-choices-wrong",
    render: () => (
      <ExerciseDemo
        challenge={longChoicesQuestion}
        accent={colors.gem}
        initialSelected={longChoicesQuestion.choices.find((choice) => choice.id !== longChoicesQuestion.correctChoiceId)?.id}
        checkNow
        progress={0.6}
      />
    )
  },
  { id: "ayah", render: () => <ExerciseDemo challenge={ayahQuestion} accent={colors.gem} progress={0.5} /> },
  { id: "ayah-long", render: () => <ExerciseDemo challenge={longAyahQuestion} accent={colors.gem} progress={0.5} /> },
  { id: "honorific", render: () => <ExerciseDemo challenge={honorificQuestion} accent={colors.gem} progress={0.3} /> },
  {
    id: "order",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "hands", "mouth"]}
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-wrong",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "hands", "face", "mouth", "nose", "arms", "head", "feet"]}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-salah-wrong",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title="Salah"
          options={SALAH_STEPS}
          correctOrderIds={SALAH_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["standing", "takbir", "ruku", "sujud1", "rise", "sit", "sujud2", "tashahhud", "taslim"]}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-salah",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame title="Salah" options={SALAH_STEPS} correctOrderIds={SALAH_ORDER} mascotVariant="boy" accent={PRAYER_ACCENT} onDone={noop} />
      </LessonScreen>
    )
  },
  {
    id: "order-correct",
    render: () => (
      <LessonScreen progress={0.35} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={WUDU_ORDER}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "complete",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward + 10}
        stars={3}
        streakDays={12}
        unlockedTitle={LESSONS_BY_ID["lesson-foundation-character"]?.title ?? "Wa alaykum as-salam"}
        gemsReward={5}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  {
    id: "complete-album",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward + 10}
        stars={3}
        streakDays={12}
        newPictures={["aqsa", "jerusalem", "damascus"].map((id) => getLessonPicture(id)).filter((picture) => picture !== undefined)}
        finishedSets={ALBUM_SETS.filter((set) => set.id === "lands")}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  { id: "album", render: () => <AlbumDemo /> },
  { id: "say-it", render: () => <SayItDemo /> },
  { id: "sprint", render: () => <SprintDemo /> },
  // Place questions on the map: one map; a close-up of Makkah's hills under the Hijaz; Jerusalem far to the north.
  { id: "map", render: () => <MapDemo lessonId="lesson-deep-hamzah-martyr" ask="Hamzah martyred" /> },
  { id: "map-picked", render: () => <MapDemo lessonId="lesson-deep-hamzah-martyr" ask="Hamzah martyred" pick="right" /> },
  { id: "map-right", render: () => <MapDemo lessonId="lesson-deep-hamzah-martyr" ask="Hamzah martyred" pick="right" check /> },
  { id: "map-closeup", render: () => <MapDemo lessonId="lesson-deep-abubakr-cave-of-thawr" ask="which cave" /> },
  { id: "map-closeup-wrong", render: () => <MapDemo lessonId="lesson-deep-abubakr-cave-of-thawr" ask="which cave" pick="wrong" check /> },
  { id: "map-arabia", render: () => <MapDemo lessonId="lesson-deep-najm1-the-first-sajdah-surah" ask="recite An-Najm" /> },
  { id: "map-quba", render: () => <MapDemo lessonId="lesson-deep-hajj-masjids-three" ask="Jerusalem" /> },
  { id: "map-hajj", render: () => <MapDemo lessonId="lesson-deep-book-hajj-labbayk-as-the-camel-rose" ask="talbiyah" pick="wrong" check /> },
  // Time questions in the sky: suhur before dawn; the last third of the night, answered wrong (the sky plays on to it).
  { id: "sky", render: () => <SkyQuestionDemo lessonId="lesson-deep-fast-suhur-blessing" ask="suhur eaten" /> },
  { id: "sky-picked", render: () => <SkyQuestionDemo lessonId="lesson-deep-fast-suhur-blessing" ask="suhur eaten" pick="right" /> },
  { id: "sky-right", render: () => <SkyQuestionDemo lessonId="lesson-deep-fast-suhur-blessing" ask="suhur eaten" pick="right" check /> },
  { id: "sky-wrong", render: () => <SkyQuestionDemo lessonId="lesson-deep-insan4-prostrate-at-night" ask="who will call" pick="wrong" check /> },
  { id: "sky-zuhr", render: () => <SkyQuestionDemo lessonId="lesson-deep-prayer-sunnah-times-the-times-of-the-five-prayers" ask="pray Zuhr" /> },
  // A prayer asked in the sky by its name (Maghrib, Fajr, Zuhr, Asr), each at its time; then answered right.
  { id: "sky-prayer", render: () => <SkyQuestionDemo lessonId="lesson-deep-tur1-at-tur-in-maghrib" ask="recite At-Tur" /> },
  { id: "sky-prayer-right", render: () => <SkyQuestionDemo lessonId="lesson-deep-tur1-at-tur-in-maghrib" ask="recite At-Tur" pick="right" check /> },
  // Story questions on their living scene: where the ark came to rest (waiting, picked, answered: the ark settles on
  // al-Judi); the twelve springs, answered wrong; a true-or-false on the she-camel; the ant's call; the birds held up.
  { id: "scene", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-nuh-judi" ask="come to rest" /> },
  { id: "scene-picked", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-nuh-judi" ask="come to rest" pick="right" /> },
  { id: "scene-right", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-nuh-judi" ask="come to rest" pick="right" check /> },
  { id: "scene-wrong", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-musa-twelve-springs" ask="How many springs" pick="wrong" check /> },
  { id: "scene-true-false", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-salih-turns" ask="was a sign" /> },
  { id: "scene-ants", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-sulayman-ant" ask="tell the other ants" /> },
  { id: "scene-birds", render: () => <SceneQuestionDemo lessonId="lesson-deep-mulk-birds" ask="holds the birds" /> },
  // The Prophets' stories: the stick become a snake, the staff swallowing their tricks, the wall set straight, the iron up
  // to the mountains' tops, the gourd plant over Yunus, the dates falling for Maryam.
  { id: "scene-tur", render: () => <SceneQuestionDemo lessonId="lesson-deep-taha1-the-staff-became-a-snake" ask="What did the stick become" /> },
  { id: "scene-staff", render: () => <SceneQuestionDemo lessonId="lesson-deep-araf4-staff-swallows" ask="What did the staff do" /> },
  { id: "scene-khidr", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf3-the-wall-set-straight" ask="What did Al-Khidr fix" /> },
  { id: "scene-barrier", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf4-the-iron-barrier" ask="How high did the blocks go" /> },
  { id: "scene-yunus", render: () => <SceneQuestionDemo lessonId="lesson-deep-saffat5-the-gourd-plant" ask="What grew over him" /> },
  { id: "scene-maryam", render: () => <SceneQuestionDemo lessonId="lesson-deep-maryam1-dates-and-a-stream" ask="What fell from the palm" /> },
  // Allah's favors to His Prophets: Dawud's coat of mail, the camels coming to the House, the seven times between Safa
  // and Marwah, the glass floor, the provision in the mihrab, the fire made cool.
  { id: "scene-dawud", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-dawud-mountains-birds" ask="What did Dawud make from the iron" /> },
  { id: "scene-house", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-house-proclaim" ask="How would the pilgrims come" /> },
  { id: "scene-zamzam", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-hajar-safa-marwah" ask="How many times did Hajar go" /> },
  { id: "scene-throne", render: () => <SceneQuestionDemo lessonId="lesson-deep-naml2-the-glass-palace" ask="What was under the glass floor" /> },
  { id: "scene-mihrab", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-maryam-provision" ask="What did Zakariyya find each time" /> },
  { id: "scene-cool-fire", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-ibrahim-fire" ask="What did Allah tell the fire" /> },
  // The Prophets' trials and their peoples: the wind of seven nights and eight days on 'Ad, the chest cast into the
  // river, Qarun's home swallowed, the flock watered at Madyan, the golden locusts on Ayyub, Yusuf's eleven stars.
  { id: "scene-ad-wind", render: () => <SceneQuestionDemo lessonId="lesson-deep-haqqah1-seven-nights-eight-days" ask="How long did the wind blow on Ad" /> },
  { id: "scene-river", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-musa-river" ask="Where did Musa's mother put her baby" /> },
  { id: "scene-qarun", render: () => <SceneQuestionDemo lessonId="lesson-deep-qasas7-the-earth-took-him" ask="What happened to Qarun, in 28:81" /> },
  { id: "scene-madyan", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-musa-madyan" ask="How did Musa help the two women" /> },
  { id: "scene-ayyub", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-ayyub-locusts" ask="What fell on Ayyub after his cure" /> },
  { id: "scene-yusuf-dream", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-yusuf-dream" ask="How many stars did Yusuf see in his dream" /> },
  // Allah's commands and the stories told with them: the measure given in full, the great ram, the qiblah turned toward
  // the Ka'bah, the flood of Saba's dam, the yellow cow.
  { id: "scene-measure", render: () => <SceneQuestionDemo lessonId="lesson-deep-isra2-a-straight-balance" ask="How should we measure" /> },
  { id: "scene-ram", render: () => <SceneQuestionDemo lessonId="lesson-deep-saffat4-o-ibrahim" ask="What did he see when he turned" /> },
  { id: "scene-qiblah", render: () => <SceneQuestionDemo lessonId="lesson-surah-meaning-2-142-147" ask="Which way did the qiblah turn to" /> },
  { id: "scene-saba", render: () => <SceneQuestionDemo lessonId="lesson-deep-saba1-the-dam-burst" ask="What did Allah send" /> },
  { id: "scene-cow", render: () => <SceneQuestionDemo lessonId="lesson-surah-meaning-2-62-71" ask="What color was the cow?" /> },
  // Allah's power in the stories: Lut's town turned upside down, the frogs on Pharaoh's people, the fish on the Sabbath,
  // the land with no shelter from the sun, the four birds, the hundred years, Yusuf's shirt.
  { id: "scene-overturned", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-lut-stones" ask="What did Allah do to the town" /> },
  { id: "scene-five-signs", render: () => <SceneQuestionDemo lessonId="lesson-deep-araf4-five-signs" ask="Which of these was a sign sent in 7:133" /> },
  { id: "scene-sabbath", render: () => <SceneQuestionDemo lessonId="lesson-deep-araf5-sabbath-town" ask="When did the fish come" /> },
  { id: "scene-west-east", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf4-journey-to-the-east" ask="What did the eastern people lack" /> },
  { id: "scene-four-birds", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-ibrahim-birds" ask="How many birds was he told to take" /> },
  { id: "scene-hundred-years", render: () => <SceneQuestionDemo lessonId="lesson-deep-baqarah3-hundred-years" ask="How long did the man stay dead" /> },
  { id: "scene-shirt", render: () => <SceneQuestionDemo lessonId="lesson-deep-yusuf5-the-scent-of-yusuf" ask="What did Yusuf send to his father" /> },
  // The wonders of the stories: the roasted calf brought to Ibrahim's guests, the rain for asking forgiveness, the wind's
  // month's journey, the scourge on Iram, Thamud and Pharaoh, the camel's load for the cup, the bird of clay, and the
  // way lit by the lightning.
  { id: "scene-guests", render: () => <SceneQuestionDemo lessonId="lesson-deep-hud4-ibrahims-guests" ask="What did Ibrahim bring his guests" /> },
  { id: "scene-forgiveness", render: () => <SceneQuestionDemo lessonId="lesson-deep-hud3-repent-for-rain-and-strength" ask="What did Hud promise" /> },
  { id: "scene-wind", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-sulayman-wind-jinn" ask="How far did the wind carry him" /> },
  { id: "scene-pillars", render: () => <SceneQuestionDemo lessonId="lesson-deep-fajr2-they-spread-corruption" ask="What did your Lord pour on them" /> },
  { id: "scene-cup", render: () => <SceneQuestionDemo lessonId="lesson-deep-yusuf4-the-kings-cup" ask="What was the reward for finding it" /> },
  { id: "scene-clay-bird", render: () => <SceneQuestionDemo lessonId="lesson-deep-maidah2-isa-miracles" ask="How did the clay bird come to life" /> },
  { id: "scene-storm", render: () => <SceneQuestionDemo lessonId="lesson-deep-baqarah1-storm-parable" ask="What do they do when lightning flashes" /> },
  // Zakat, giving and Eid: a tenth of what the rain waters, the five prayers after the shahadah, the ayah that made Abu
  // Talhah give his garden, zakat al-Fitr given before the prayer, and the three dates before the Eid prayer.
  { id: "scene-zakat", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-zakat-zakat-on-crops" ask="Crops watered by rain give" /> },
  { id: "scene-yemen", render: () => <SceneQuestionDemo lessonId="lesson-deep-fresh-start-what-comes-first" ask="What came right after the shahadah" /> },
  { id: "scene-bayruha", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-talhah-bayruha" ask="Which ayah made Abu Talhah give his garden" /> },
  { id: "scene-fitr", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-fitr-before-prayer" ask="When should zakat al-Fitr be paid" /> },
  { id: "scene-eid", render: () => <SceneQuestionDemo lessonId="lesson-deep-eid-fitr-dates" ask="How many dates fit this Sunnah" /> },
  { id: "scene-thirsty-dog", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-everyday-thirsty-dog" ask="How did the man carry the water" /> },
  { id: "scene-thorny-branch", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-small-deeds-the-thorny-branch" ask="What did the man move off the path" /> },
  { id: "scene-planting", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-everyday-tree" ask="Who eating from it counts" /> },
  { id: "scene-waqf", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-wills-the-keeper-of-a-waqf" ask="What could the keeper do" /> },
  { id: "scene-permission", render: () => <SceneQuestionDemo lessonId="lesson-deep-adab-knock-three-times" ask="If no one answers after three times" /> },
  { id: "scene-adhan", render: () => <SceneQuestionDemo lessonId="lesson-deep-bilal-first-adhan" ask="Whom did the Prophet" /> },
  { id: "scene-wet-grain", render: () => <SceneQuestionDemo lessonId="lesson-deep-mutaffifin1-whoever-cheats" ask="Where should the wet part have been" /> },
  { id: "scene-rumah", render: () => <SceneQuestionDemo lessonId="lesson-deep-uthman-rumah" ask="Which army did Uthman equip" /> },
  // The Companions' stories and the river at the door: the plain truth Ka'b told, the three nights in the cave of
  // Thawr, Umar's answer from decree to decree, and bathing in the river five times a day.
  { id: "scene-tabuk", render: () => <SceneQuestionDemo lessonId="lesson-deep-kab-truth" ask="What did Ka'b decide to tell" /> },
  { id: "scene-thawr", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-cave-of-thawr" ask="How many nights did they stay" /> },
  { id: "scene-plague", render: () => <SceneQuestionDemo lessonId="lesson-deep-abuubaydah-decree" ask="What was Umar's answer" /> },
  { id: "scene-river-at-the-door", render: () => <SceneQuestionDemo lessonId="lesson-intro-five-prayers" ask="How many times a day do Muslims pray" /> },
  // The likenesses he ﷺ gave, and the day of Ashura: believers like bricks of one wall, the mare lifting her hoof from
  // her foal, what avoiding doubtful things keeps safe, the bellows burning clothes, the hole in the shared ship, and
  // the sea split on the day of Ashura.
  { id: "scene-building", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah3-like-a-wall" ask="What are believers like, per Abu Musa" /> },
  { id: "scene-mercy", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-qudsi-hundred-parts" ask="What does the mare do" /> },
  { id: "scene-sanctuary", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-famous-clear-and-doubtful" ask="What do you protect by avoiding" /> },
  { id: "scene-musk", render: () => <SceneQuestionDemo lessonId="lesson-deep-furqan1-musk-seller-and-blacksmith" ask="What might a bad friend do" /> },
  { id: "scene-shared-ship", render: () => <SceneQuestionDemo lessonId="lesson-deep-numan-the-ship" ask="What did the people below want" /> },
  { id: "scene-ashura", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-musa-ashura" ask="What happened on the day of Ashura" /> },
  // The stories he ﷺ told: the wage grown into a herd, the money sent in a piece of wood, the tied camels let go, and the
  // rider resting in a tree's shade.
  { id: "scene-shut-cave", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-stories-the-cave" ask="What did another man give back" /> },
  { id: "scene-log-at-sea", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-stories-the-wooden-box" ask="How did he send the money" /> },
  { id: "scene-tied-camels", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-quran-virtues-like-tied-camels" ask="What happens if the camels" /> },
  { id: "scene-traveler", render: () => <SceneQuestionDemo lessonId="lesson-deep-duha1-like-a-rider-under-a-tree" ask="What did he compare himself to" /> },
  // More of his likenesses: the dates with no smell, the debtor let off, the birds back full, the two flocks, the plant
  // straight again when the wind stops, and the home gone dark.
  { id: "scene-citron", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-quran-virtues-like-a-citron" ask="A believer who does not recite" /> },
  { id: "scene-forgiving-trader", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-stories-the-forgiving-trader" ask="What did the trader do when" /> },
  { id: "scene-hungry-birds", render: () => <SceneQuestionDemo lessonId="lesson-deep-ankabut4-like-the-birds" ask="How do they come back" /> },
  { id: "scene-two-flocks", render: () => <SceneQuestionDemo lessonId="lesson-deep-munafiqun1-sheep-between-flocks" ask="How many flocks" /> },
  { id: "scene-bending-plant", render: () => <SceneQuestionDemo lessonId="lesson-deep-aqidah-steady-on-the-path-a-plant-that-bends" ask="What does the plant do when" /> },
  { id: "scene-remember", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-dhikr-living-dead" ask="And the one who never remembers" /> },
  { id: "scene-lost-camel", render: () => <SceneQuestionDemo lessonId="lesson-deep-shura2-he-accepts-repentance" ask="What did the man lose" /> },
  { id: "scene-stung-twice", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-adab-not-stung-twice" ask="A believer is not stung twice" /> },
  { id: "scene-doors-of-good", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-pillar-puts-out-sin" ask="What does charity do to sins" /> },
  { id: "scene-square-and-line", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-riqaq-the-square-and-the-line" ask="What was the line going outside" /> },
  { id: "scene-more-water", render: () => <SceneQuestionDemo lessonId="lesson-deep-neighbors-more-water" ask="Why add it" /> },
  { id: "scene-joint-charity", render: () => <SceneQuestionDemo lessonId="lesson-deep-speech-good-word" ask="Which of these is also charity" /> },
  // More wisdom he taught: greed growing and the lamp burning low, the leaves falling, the camel tied, the lowest branch,
  // the drop from the sea, the jar of gold found, and the home raised up on a hill.
  { id: "scene-two-wolves", render: () => <SceneQuestionDemo lessonId="lesson-deep-akhirah-this-world-two-wolves" ask="What does that greed harm" /> },
  { id: "scene-falling-leaves", render: () => <SceneQuestionDemo lessonId="lesson-deep-aqidah-trials-a-fever-like-two-mens" ask="make his sins fall away" /> },
  { id: "scene-tie-camel", render: () => <SceneQuestionDemo lessonId="lesson-deep-aqidah-faith-in-the-heart-tie-it-and-trust" ask="to do with his camel" /> },
  { id: "scene-faith-branches", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-iman-branches" ask="What is the lowest branch" /> },
  { id: "scene-sea-drop", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah2-finger-in-the-sea" ask="compare this world to" /> },
  { id: "scene-jar-of-gold", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-anbiya-the-jar-of-gold" ask="What did the buyer find" /> },
  { id: "scene-charity-wealth", render: () => <SceneQuestionDemo lessonId="lesson-deep-humility-raised-up" ask="someone humble for His sake" /> },
  { id: "scene-crying-trunk", render: () => <SceneQuestionDemo lessonId="lesson-deep-hashr4-the-crying-palm" ask="What did the palm trunk do" /> },
  { id: "scene-trench-rock", render: () => <SceneQuestionDemo lessonId="lesson-deep-ahzab1-the-best-example" ask="do to the rock" /> },
  { id: "scene-chasing-horse", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-suraqah" ask="Suraqah's horse" /> },
  { id: "scene-milk-bowl", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-hurairah-milk-bowl" ask="Who drank last" /> },
  { id: "scene-bread-for-seventy", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-signs-bread-for-seventy" ask="came in to eat" /> },
  { id: "scene-nightfall", render: () => <SceneQuestionDemo lessonId="lesson-deep-marriage-gentle-with-children-home-at-nightfall" ask="close the door" /> },
  { id: "scene-half-date", render: () => <SceneQuestionDemo lessonId="lesson-deep-zalzalah2-a-good-word" ask="no date to give" /> },
  { id: "scene-lamp-out", render: () => <SceneQuestionDemo lessonId="lesson-deep-hashr2-the-lamp-put-out" ask="put out the light" /> },
  { id: "scene-helped-at-home", render: () => <SceneQuestionDemo lessonId="lesson-deep-spouses-helped-at-home" ask="do at home" /> },
  { id: "scene-a-span-closer", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-forgives-the-killer-who-repented" ask="Where did he die" /> },
  { id: "scene-uhud-shook", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-uhud-shook" ask="call Abu Bakr" /> },
  { id: "scene-greeting-stone", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-fadail-the-stone-that-greeted-him" ask="use to do" /> },
  { id: "scene-around-us", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-rain-and-wind-around-us" ask="rain had to stop" /> },
  { id: "scene-blessed-water", render: () => <SceneQuestionDemo lessonId="lesson-deep-isra2-the-food-glorified-allah" ask="Companions hear" /> },
  { id: "scene-shepherds", render: () => <SceneQuestionDemo lessonId="lesson-deep-humility-shepherds" ask="Whose sheep" /> },
  { id: "scene-date-mountain", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah4-a-date-like-a-mountain" ask="How big can one date" /> },
  { id: "scene-deeds-continue", render: () => <SceneQuestionDemo lessonId="lesson-deep-grave-continue" ask="Which is one of them" /> },
  { id: "scene-good-intentions", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-qudsi-good-intentions" ask="multiplied" /> },
  { id: "scene-safa-call", render: () => <SceneQuestionDemo lessonId="lesson-deep-masad1-never-heard-a-lie" ask="about his honesty" /> },
  { id: "scene-jabir-dates", render: () => <SceneQuestionDemo lessonId="lesson-deep-jabir-fathers-debt" ask="do with the dates" /> },
  { id: "scene-three-follow", render: () => <SceneQuestionDemo lessonId="lesson-deep-grave-three-follow" ask="go back home" /> },
  // A question on each scene of kindness and a believer's heart (round 69).
  { id: "scene-good-in-every-state", render: () => <SceneQuestionDemo lessonId="lesson-deep-patience-always-good" ask="something good happens" /> },
  { id: "scene-your-mother", render: () => <SceneQuestionDemo lessonId="lesson-deep-parents-your-mother" ask="How many times" /> },
  { id: "scene-cheerful-face", render: () => <SceneQuestionDemo lessonId="lesson-hadith-for-kids-muslim-2626" ask="meet your brother" /> },
  { id: "scene-learn-and-teach", render: () => <SceneQuestionDemo lessonId="lesson-hadith-for-kids-bukhari-5027" ask="best among us" /> },
  { id: "scene-one-body", render: () => <SceneQuestionDemo lessonId="lesson-deep-numan-one-body" ask="one part hurts" /> },
  { id: "scene-eat-near", render: () => <SceneQuestionDemo lessonId="lesson-hadith-for-kids-bukhari-5376" ask="take from the dish" /> },
  { id: "scene-those-you-love", render: () => <SceneQuestionDemo lessonId="lesson-deep-lastday-asked-bedouin" ask="say he had prepared" /> },
  // A question on each scene of worship and the heart (round 71).
  { id: "scene-after-the-salam", render: () => <SceneQuestionDemo lessonId="lesson-deep-thawban-after-the-prayer" ask="How many times did he ask" /> },
  { id: "scene-built-on-five", render: () => <SceneQuestionDemo lessonId="lesson-intro-five-pillars" ask="How many pillars" /> },
  { id: "scene-seventy-times", render: () => <SceneQuestionDemo lessonId="lesson-deep-muhammad2-seventy-times-a-day" ask="besides ask forgiveness" /> },
  { id: "scene-family-ties", render: () => <SceneQuestionDemo lessonId="lesson-deep-raad2-ties-bring-blessing" ask="wants more provision" /> },
  { id: "scene-pray-as-you-can", render: () => <SceneQuestionDemo lessonId="lesson-deep-imran-ibn-husayn-pray-as-you-can" ask="cannot stand" /> },
  { id: "scene-even-a-thorn", render: () => <SceneQuestionDemo lessonId="lesson-deep-patience-even-a-thorn" ask="thorn's prick" /> },
  { id: "scene-intentions", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-famous-intentions" ask="judged by" /> },
  // A question on each scene of what we say (round 73).
  { id: "scene-two-words", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-dhikr-light-and-heavy" ask="on the scale of deeds" /> },
  { id: "scene-half-of-faith", render: () => <SceneQuestionDemo lessonId="lesson-deep-clean-half-of-faith" ask="What fills the scale" /> },
  { id: "scene-three-signs", render: () => <SceneQuestionDemo lessonId="lesson-deep-mujadila3-three-signs" ask="when he speaks" /> },
  { id: "scene-call-to-good", render: () => <SceneQuestionDemo lessonId="lesson-deep-yusuf6-a-call-and-its-reward" ask="calls to good receive" /> },
  { id: "scene-praise-each-bite", render: () => <SceneQuestionDemo lessonId="lesson-deep-abasa2-praise-for-every-bite" ask="When else" /> },
  { id: "scene-good-or-quiet", render: () => <SceneQuestionDemo lessonId="lesson-deep-naba3-say-good-or-stay-silent" ask="treat his guest" /> },
  { id: "scene-then-steadfast", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-famous-steadfast" ask="And after saying it" /> },
  // A question on each scene of the deeds Allah loves (round 75).
  { id: "scene-dearest-deeds", render: () => <SceneQuestionDemo lessonId="lesson-deep-parents-dearest-deeds" ask="What came second" /> },
  { id: "scene-truth-leads", render: () => <SceneQuestionDemo lessonId="lesson-deep-speech-truth" ask="keeps telling the truth" /> },
  { id: "scene-ease-a-hardship", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-heart-relieve" ask="How long does Allah help" /> },
  { id: "scene-saved-by-mercy", render: () => <SceneQuestionDemo lessonId="lesson-deep-ready-mercy-saves" ask="What gets us into Jannah" /> },
  { id: "scene-give-while-healthy", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-everyday-give-now" ask="warn against" /> },
  { id: "scene-strong-believer", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-qadar-if-only" ask="something bad happens" /> },
  { id: "scene-forgotten-prayer", render: () => <SceneQuestionDemo lessonId="lesson-deep-taha1-a-missed-prayer" ask="forgotten prayer" /> },
  // A question on each scene of a good character (round 77).
  { id: "scene-mustard-of-pride", render: () => <SceneQuestionDemo lessonId="lesson-deep-qasas7-allah-loves-beauty" ask="Is liking fine clothes pride" /> },
  { id: "scene-what-backbiting-is", render: () => <SceneQuestionDemo lessonId="lesson-deep-speech-backbiting" ask="not true, it is what" /> },
  { id: "scene-orphan-carer", render: () => <SceneQuestionDemo lessonId="lesson-deep-mercy-the-orphan" ask="show how close" /> },
  { id: "scene-safe-from-harm", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibn-amr-tongue-and-hand" ask="true emigrant" /> },
  { id: "scene-refuge-from-anger", render: () => <SceneQuestionDemo lessonId="lesson-deep-nahl6-refuge-calms-anger" ask="What would happen if he said it" /> },
  { id: "scene-gate-ar-rayyan", render: () => <SceneQuestionDemo lessonId="lesson-deep-sahl-ar-rayyan" ask="Who enters by that gate" /> },
  { id: "scene-make-it-easy", render: () => <SceneQuestionDemo lessonId="lesson-hadith-for-kids-bukhari-69" ask="What should we give people" /> },
  // A question on each scene of what truly counts (round 79).
  { id: "scene-needle-in-the-sea", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibrahim1-o-my-servants" ask="kingdom if He gives everyone" /> },
  { id: "scene-hearts-and-deeds", render: () => <SceneQuestionDemo lessonId="lesson-deep-taghabun1-allah-looks-at-hearts" ask="What does Allah look at" /> },
  { id: "scene-real-strength", render: () => <SceneQuestionDemo lessonId="lesson-deep-anger-real-strength" ask="Who is truly strong" /> },
  { id: "scene-treasure-of-paradise", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-musa-treasure" ask="call a treasure of Paradise" /> },
  { id: "scene-hundred-levels", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf4-ask-allah-for-al-firdaws" ask="What flows from Al-Firdaws" /> },
  { id: "scene-faith-at-the-pleiades", render: () => <SceneQuestionDemo lessonId="lesson-deep-jumuah1-faith-at-the-pleiades" ask="say faith might be" /> },
  { id: "scene-sacred-city", render: () => <SceneQuestionDemo lessonId="lesson-deep-naml6-sacred-since-creation" ask="pick up a lost item" /> },
  // A question on each scene of what lasts (round 81).
  { id: "scene-house-in-paradise", render: () => <SceneQuestionDemo lessonId="lesson-deep-nur2-build-a-masjid" ask="What does Allah build" /> },
  { id: "scene-my-wealth", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadid2-what-you-send-forward" ask="given in charity" /> },
  { id: "scene-hour-on-friday", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-jumuah-hour" ask="How long is that hour" /> },
  { id: "scene-never-old", render: () => <SceneQuestionDemo lessonId="lesson-deep-jannah-never-old" ask="grow old" /> },
  { id: "scene-beware-of-suspicion", render: () => <SceneQuestionDemo lessonId="lesson-deep-speech-suspicion" ask="call suspicion" /> },
  { id: "scene-thirty-three", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadid3-the-poor-who-worried" ask="poor people worry" /> },
  { id: "scene-five-gifts", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-rusul-all-people" ask="Who was he" /> },
  // A question on each scene of hope and warning (round 83).
  { id: "scene-seven-in-the-shade", render: () => <SceneQuestionDemo lessonId="lesson-deep-gathering-shade" ask="How many people get" /> },
  { id: "scene-two-joys", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-reward-two-joys" ask="first joy" /> },
  { id: "scene-ruins-of-al-hijr", render: () => <SceneQuestionDemo lessonId="lesson-deep-hijr4-pass-ruins-weeping" ask="cannot weep" /> },
  { id: "scene-born-on-the-fitrah", render: () => <SceneQuestionDemo lessonId="lesson-deep-shams2-born-on-the-fitrah" ask="What example" /> },
  { id: "scene-best-ten-days", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-best-ten-days" ask="Which days did he call" /> },
  { id: "scene-sparrow-and-the-sea", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf3-the-sparrow-and-the-sea" ask="sparrow's sip" /> },
  { id: "scene-lofty-mansions", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadid3-the-lofty-mansions" ask="compared to" /> },
  // A question on each scene of treasures and trusts (round 85).
  { id: "scene-house-of-pearl", render: () => <SceneQuestionDemo lessonId="lesson-deep-wives-khadijah-greeting" ask="bringing when Jibril" /> },
  { id: "scene-tree-of-a-hundred-years", render: () => <SceneQuestionDemo lessonId="lesson-deep-jannah-tree" ask="ride through" /> },
  { id: "scene-the-pool", render: () => <SceneQuestionDemo lessonId="lesson-deep-hawd-pool" ask="How many cups" /> },
  { id: "scene-gold-like-uhud", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-said-my-companions" ask="would gold like Uhud" /> },
  { id: "scene-respite-then-seized", render: () => <SceneQuestionDemo lessonId="lesson-deep-hud6-respite-then-seizure" ask="seizes him" /> },
  { id: "scene-convey-one-ayah", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-knowledge-one-verse" ask="How much should we pass on" /> },
  { id: "scene-the-hidden-poor", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah3-the-hidden-poor" ask="real poor person, per" /> },
  // A question on each scene of what he ﷺ taught (round 87).
  { id: "scene-came-to-teach", render: () => <SceneQuestionDemo lessonId="lesson-deep-tree-umar-jibril-came" ask="Which three did Jibril" /> },
  { id: "scene-keep-ties", render: () => <SceneQuestionDemo lessonId="lesson-deep-mumtahanah3-be-good-to-your-mother" ask="Who came to visit Asma" /> },
  { id: "scene-fast-of-dawud", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-dawud-fast-of-dawud" ask="How much of the night" /> },
  { id: "scene-one-religion", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-rusul-brothers" ask="closest to" /> },
  { id: "scene-who-refuses", render: () => <SceneQuestionDemo lessonId="lesson-deep-taghabun3-who-refuses" ask="Who will enter Paradise" /> },
  { id: "scene-guided-at-the-door", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-hurairah-his-mother" ask="What happened when he got home" /> },
  { id: "scene-prayer-made-short", render: () => <SceneQuestionDemo lessonId="lesson-deep-mercy-shortened-prayer" ask="What made the Prophet" /> },
  // A question on each scene of the first revelation and of deeds he ﷺ taught (round 89).
  { id: "scene-cave-of-hira", render: () => <SceneQuestionDemo lessonId="lesson-deep-meet-the-quran-first-revelation" ask="first word Jibril" /> },
  { id: "scene-never-disgrace", render: () => <SceneQuestionDemo lessonId="lesson-deep-spouses-khadijah" ask="Which good deed of his" /> },
  { id: "scene-prayer-together", render: () => <SceneQuestionDemo lessonId="lesson-deep-tree-nafi-twenty-seven" ask="How much better" /> },
  { id: "scene-two-ayat-at-night", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-sleep-baqarah-end" ask="Which ayahs are enough" /> },
  { id: "scene-skilled-reciter", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-quran-virtues-two-rewards-for-trying" ask="finds it hard" /> },
  { id: "scene-fast-of-arafah", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-qatadah-day-of-arafah" ask="covers sins" /> },
  { id: "scene-one-word", render: () => <SceneQuestionDemo lessonId="lesson-deep-qaf2-one-word-pleases-allah" ask="one pleasing word" /> },
  // A question on each scene of those who were with him ﷺ (round 91).
  { id: "scene-lamps-in-the-sky", render: () => <SceneQuestionDemo lessonId="lesson-deep-usayd-lamps-in-the-sky" ask="What did Usayd see" /> },
  { id: "scene-prayer-too-long", render: () => <SceneQuestionDemo lessonId="lesson-deep-muadh-long-prayer" ask="Which surahs did the Prophet" /> },
  { id: "scene-every-one-a-shepherd", render: () => <SceneQuestionDemo lessonId="lesson-deep-spouses-shepherds" ask="a man is the guardian" /> },
  { id: "scene-the-garden-gate", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-garden-gate" ask="Who came to the gate second" /> },
  { id: "scene-ship-to-abyssinia", render: () => <SceneQuestionDemo lessonId="lesson-deep-jafar-khaybar" ask="When did Ja'far return" /> },
  { id: "scene-ten-years-serving", render: () => <SceneQuestionDemo lessonId="lesson-deep-anas-never-uff" ask="How long did Anas serve" /> },
  { id: "scene-greet-first", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-ayyub-three-nights" ask="Who is the better of the two" /> },
  // A question on each scene of counsel he gave ﷺ (round 93).
  { id: "scene-farewell-sermon", render: () => <SceneQuestionDemo lessonId="lesson-deep-araf3-you-conveyed" ask="What did the Companions testify" /> },
  { id: "scene-recite-to-me", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibnmasud-recite-to-me" ask="Which surah did Ibn Mas'ud recite" /> },
  { id: "scene-richness-of-the-soul", render: () => <SceneQuestionDemo lessonId="lesson-deep-duha2-richness-of-the-soul" ask="What is true wealth" /> },
  { id: "scene-the-neighbor", render: () => <SceneQuestionDemo lessonId="lesson-deep-neighbors-jibril" ask="Who kept advising" /> },
  { id: "scene-closest-in-sujud", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-reward-closest" ask="When is a servant closest" /> },
  { id: "scene-accepts-only-good", render: () => <SceneQuestionDemo lessonId="lesson-deep-muminun2-allah-is-good" ask="Why was the traveller's dua" /> },
  { id: "scene-mercy-on-musa", render: () => <SceneQuestionDemo lessonId="lesson-deep-saff2-mercy-on-musa" ask="Whom did the Prophet" /> },
  // A question on each scene of ways he taught ﷺ (round 95).
  { id: "scene-setting-out", render: () => <SceneQuestionDemo lessonId="lesson-deep-zukhruf1-the-riders-dua" ask="How many times did he say Allahu Akbar" /> },
  { id: "scene-for-his-brother", render: () => <SceneQuestionDemo lessonId="lesson-hadith-for-kids-bukhari-13" ask="What should you wish for your brother" /> },
  { id: "scene-eight-gates", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayerlive-after-wudu" ask="How many gates of Paradise" /> },
  { id: "scene-house-for-twelve", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-extra-twelve" ask="Twelve extra rak'ahs a day bring" /> },
  { id: "scene-ready-for-friday", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-jumuah-get-ready" ask="What is forgiven for doing it all" /> },
  { id: "scene-right-on-servants", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-tawhid-allahs-right" ask="What is the servants' right on Allah" /> },
  { id: "scene-pray-as-you-saw", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayerlive-pray-as-me" ask="Who did he say should lead" /> },
  // A question on each scene of what he taught ﷺ of the heart and the Quran (round 97).
  { id: "scene-gentleness", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-heart-gentle" ask="What does gentleness get" /> },
  { id: "scene-looks-at-hearts", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj2-allah-looks-at-hearts" ask="What does Allah look at" /> },
  { id: "scene-best-forgiveness", render: () => <SceneQuestionDemo lessonId="lesson-deep-nuh2-best-istighfar" ask="What is promised to one" /> },
  { id: "scene-ten-blessings", render: () => <SceneQuestionDemo lessonId="lesson-deep-meet-the-quran-blessings-on-him" ask="How many blessings does Allah send" /> },
  { id: "scene-friday-fajr", render: () => <SceneQuestionDemo lessonId="lesson-deep-sajdah1-friday-fajr-surah" ask="Which surah came with it" /> },
  { id: "scene-learn-from-four", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibnmasud-learn-from-four" ask="Who was named first" /> },
  { id: "scene-young-ibn-abbas", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-ibn-abbas" ask="What did Ibn Abbas say the surah" /> },
  { id: "scene-go-back-and-pray", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayerlive-go-back" ask="How many times was the man sent back" /> },
  { id: "scene-ansar-at-hunayn", render: () => <SceneQuestionDemo lessonId="lesson-deep-hujurat2-the-ansar-at-hunayn" ask="What three favors did he" /> },
  { id: "scene-the-sneeze", render: () => <SceneQuestionDemo lessonId="lesson-deep-adab-the-sneeze" ask="What does the sneezer say back" /> },
  { id: "scene-visitors-of-mudar", render: () => <SceneQuestionDemo lessonId="lesson-deep-hashr4-even-half-a-date" ask="What was the smallest gift" /> },
  { id: "scene-steps-in-paradise", render: () => <SceneQuestionDemo lessonId="lesson-deep-bilal-footsteps" ask="What did the Prophet ﷺ hear in Paradise" /> },
  { id: "scene-madinah-rejoiced", render: () => <SceneQuestionDemo lessonId="lesson-deep-muhajirun-joy" ask="Who called out that the Prophet" /> },
  { id: "scene-red-camels", render: () => <SceneQuestionDemo lessonId="lesson-deep-ali-red-camels" ask="One person guided through you" /> },
  { id: "scene-lost-necklace", render: () => <SceneQuestionDemo lessonId="lesson-deep-mothers-aishah-necklace" ask="What did Aishah lose on the journey" /> },
  { id: "scene-love-madinah", render: () => <SceneQuestionDemo lessonId="lesson-deep-muhajirun-love-madinah" ask="What did he ask Allah to take from Madinah" /> },
  { id: "scene-thabit-good-news", render: () => <SceneQuestionDemo lessonId="lesson-deep-thabit-people-of-jannah" ask="What good news did Thabit get" /> },
  { id: "scene-dearer-than-yourself", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-dearer" ask="What did the Prophet ﷺ say when Umar said" /> },
  { id: "scene-better-than-camels", render: () => <SceneQuestionDemo lessonId="lesson-deep-uqbah-better-than-camels" ask="What is better than two big she-camels" /> },
  { id: "scene-two-bright-ones", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-umamah-the-intercessor" ask="How will the two surahs come" /> },
  { id: "scene-third-of-the-quran", render: () => <SceneQuestionDemo lessonId="lesson-deep-ikhlas-a-third" ask="What is Al-Ikhlas equal to" /> },
  { id: "scene-spread-the-salam", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibrahim2-spread-the-salam" ask="What builds love between people" /> },
  { id: "scene-feed-and-greet", render: () => <SceneQuestionDemo lessonId="lesson-deep-haqqah4-feed-and-greet" ask="What deeds of Islam did the Prophet" /> },
  { id: "scene-a-fair-gift", render: () => <SceneQuestionDemo lessonId="lesson-deep-children-fair" ask="What did he tell him" /> },
  { id: "scene-garden-in-charity", render: () => <SceneQuestionDemo lessonId="lesson-deep-sad-ubadah-garden-for-mother" ask="Does charity for a dead parent help them" /> },
  { id: "scene-hornless-sheep", render: () => <SceneQuestionDemo lessonId="lesson-deep-naba3-even-the-animals" ask="Allah judges between the animals" /> },
  { id: "scene-forgot-and-ate", render: () => <SceneQuestionDemo lessonId="lesson-ramadan-if-you-forget" ask="You forgot and drank water" /> },
  { id: "scene-kiss-of-mercy", render: () => <SceneQuestionDemo lessonId="lesson-deep-children-kissing" ask="What did he say to the man who never kissed" /> },
  { id: "scene-first-believers", render: () => <SceneQuestionDemo lessonId="lesson-deep-ammar-first-believers" ask="when Ammar saw him" /> },
  { id: "scene-freed-bilal", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-freed-bilal" ask="Who did he mean" /> },
  { id: "scene-most-beloved", render: () => <SceneQuestionDemo lessonId="lesson-deep-husbands-most-beloved" ask="Among men, whom did he" /> },
  { id: "scene-trustworthy-one", render: () => <SceneQuestionDemo lessonId="lesson-deep-abuubaydah-amin" ask="What title did the Prophet" /> },
  { id: "scene-two-refuges", render: () => <SceneQuestionDemo lessonId="lesson-deep-uqbah-the-two-refuges" ask="What do both surahs begin with" /> },
  { id: "scene-greatest-ayah", render: () => <SceneQuestionDemo lessonId="lesson-deep-ubayy-greatest-ayah" ask="Which ayah did Ubayy say" /> },
  { id: "scene-change-it", render: () => <SceneQuestionDemo lessonId="lesson-deep-imran2-change-it" ask="What comes after the hand" /> },
  { id: "scene-abu-dharr-seeks", render: () => <SceneQuestionDemo lessonId="lesson-deep-abudharr-aloud" ask="Who protected him" /> },
  { id: "scene-heart-almost-flew", render: () => <SceneQuestionDemo lessonId="lesson-deep-tur3-my-heart-almost-flew" ask="How did Jubayr feel" /> },
  { id: "scene-heraclius-asks", render: () => <SceneQuestionDemo lessonId="lesson-deep-yunus1-a-lifetime-among-you" ask="What did Heraclius ask" /> },
  { id: "scene-mighty-since-umar", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-becoming-muslim" ask="What did the crowd do" /> },
  { id: "scene-every-right", render: () => <SceneQuestionDemo lessonId="lesson-deep-salman-rights" ask="Which three have rights" /> },
  { id: "scene-first-masjid", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj2-first-masjid-on-earth" ask="How long was between them" /> },
  { id: "scene-rain-and-stars", render: () => <SceneQuestionDemo lessonId="lesson-deep-waqiah4-the-rain-and-the-stars" ask="Who truly believes" /> },
  { id: "scene-make-room", render: () => <SceneQuestionDemo lessonId="lesson-deep-mujadila2-dont-take-his-seat" ask="What should we do instead" /> },
  { id: "scene-rights-of-the-road", render: () => <SceneQuestionDemo lessonId="lesson-deep-nur1-rights-of-the-road" ask="What is the first right" /> },
  { id: "scene-honest-trade", render: () => <SceneQuestionDemo lessonId="lesson-deep-honesty-honest-trade" ask="What happens if they lie and hide" /> },
  { id: "scene-keep-them-close", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf1-six-companions-kept-close" ask="What did the idolaters want" /> },
  { id: "scene-small-gift", render: () => <SceneQuestionDemo lessonId="lesson-deep-zalzalah2-a-neighbors-small-gift" ask="What small gift did he name" /> },
  { id: "scene-asked-about-blessings", render: () => <SceneQuestionDemo lessonId="lesson-deep-takathur2-a-meal-of-dates" ask="Who fed them" /> },
  { id: "scene-valley-of-gold", render: () => <SceneQuestionDemo lessonId="lesson-deep-adiyat2-a-valley-of-gold" ask="If man had one valley" /> },
  { id: "scene-straight-rows", render: () => <SceneQuestionDemo lessonId="lesson-deep-saff1-straight-rows-in-prayer" ask="Why straighten the rows" /> },
  { id: "scene-sweetest-recitation", render: () => <SceneQuestionDemo lessonId="lesson-deep-tin1-the-sweetest-recitation" ask="In which prayer did he recite" /> },
  { id: "scene-easy-religion", render: () => <SceneQuestionDemo lessonId="lesson-deep-sharh1-an-easy-religion" ask="What happens to one who overburdens" /> },
  { id: "scene-three-things-to-keep", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-fasting-three-things-advice" ask="When should witr be prayed" /> },
  { id: "scene-asked-about-islam", render: () => <SceneQuestionDemo lessonId="lesson-deep-muzzammil4-five-prayers-only" ask="What did he say about more prayers" /> },
  { id: "scene-greatest-surah", render: () => <SceneQuestionDemo lessonId="lesson-deep-fatihah-greatest-surah" ask="Which surah did the Prophet" /> },
  { id: "scene-black-stone", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-black-stone" ask="Why did Umar kiss it then" /> },
  { id: "scene-loves-al-ikhlas", render: () => <SceneQuestionDemo lessonId="lesson-deep-ikhlas-allah-loves-him" ask="Why did the man always recite" /> },
  { id: "scene-night-with-hudhayfah", render: () => <SceneQuestionDemo lessonId="lesson-deep-qiyamah3-answering-the-ayah" ask="What did he do at ayahs of Allah's glory" /> },
  { id: "scene-ubayy-named", render: () => <SceneQuestionDemo lessonId="lesson-deep-bayyinah1-ubayy-wept" ask="What did Ubayy ask" /> },
  { id: "scene-six-of-shawwal", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-ayyub-six-of-shawwal" ask="How many days of Shawwal" /> },
  { id: "scene-six-rights", render: () => <SceneQuestionDemo lessonId="lesson-deep-adab-six-rights" ask="Your friend is ill" /> },
  { id: "scene-the-warner", render: () => <SceneQuestionDemo lessonId="lesson-deep-hijr4-a-plain-warner" ask="What happened to those who obeyed the warner" /> },
  { id: "scene-firm-and-kind", render: () => <SceneQuestionDemo lessonId="lesson-deep-sad-mother" ask="What should you do if a parent orders shirk" /> },
  { id: "scene-most-generous", render: () => <SceneQuestionDemo lessonId="lesson-ramadan-most-generous" ask="When was the Prophet ﷺ most generous" /> },
  { id: "scene-dawud-recites", render: () => <SceneQuestionDemo lessonId="lesson-deep-isra2-dawud-and-the-zabur" ask="When did Dawud finish reciting" /> },
  { id: "scene-good-kept", render: () => <SceneQuestionDemo lessonId="lesson-deep-hakim-deeds-before-islam" ask="What did he ﷺ answer" /> },
  { id: "scene-last-ten-itikaf", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-last-ten-itikaf" ask="Who kept doing i'tikaf" /> },
  { id: "scene-my-disciple", render: () => <SceneQuestionDemo lessonId="lesson-deep-zubayr-disciple" ask="How many times did Az-Zubayr" /> },
  { id: "scene-help-your-brother", render: () => <SceneQuestionDemo lessonId="lesson-deep-brotherhood-help-your-brother" ask="Your friend is bullying someone" /> },
  { id: "scene-last-surah-heard", render: () => <SceneQuestionDemo lessonId="lesson-surah-meaning-77-1-15" ask="In which prayer was it the last surah" /> },
  { id: "scene-umamah-in-prayer", render: () => <SceneQuestionDemo lessonId="lesson-deep-children-carrying-umamah" ask="What did he do when he went into sujud" /> },
  { id: "scene-more-merciful", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-qudsi-the-mother" ask="Would the mother throw her child" /> },
  { id: "scene-abu-ayyub-house", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-ayyub-the-garlic" ask="Is garlic forbidden" /> },
  { id: "scene-miqdad-promise", render: () => <SceneQuestionDemo lessonId="lesson-deep-miqdad-not-like-musas-people" ask="Where did Al-Miqdad say they would fight" /> },
  { id: "scene-leave-that-call", render: () => <SceneQuestionDemo lessonId="lesson-deep-munafiqun2-call-of-ignorance" ask="What did he tell them to do with it" /> },
  { id: "scene-abu-bakr-forgives", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-forgiving-mistah" ask="What did Abu Bakr say when the ayah came" /> },
  { id: "scene-between-two-calls", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-prayer-between-adhan-and-iqamah" ask="How many times did he ﷺ say it" /> },
  { id: "scene-nearest-door", render: () => <SceneQuestionDemo lessonId="lesson-deep-neighbors-nearest-door" ask="Which neighbor comes first for a gift" /> },
  { id: "scene-two-lights", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-signs-two-lights-on-a-dark-night" ask="What happened when the two men parted" /> },
  { id: "scene-abu-umayr-bird", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-adab-abu-umayr-bird" ask="What does this teach about the Prophet" /> },
  { id: "scene-family-spending", render: () => <SceneQuestionDemo lessonId="lesson-deep-spouses-morsel" ask="What small act is rewarded in the hadith" /> },
  { id: "scene-answer-the-call", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-adhan-reward-say-what-he-says" ask="What should you do when you hear the adhan" /> },
  { id: "scene-supper-first", render: () => <SceneQuestionDemo lessonId="lesson-deep-sharh2-supper-before-prayer" ask="If supper is served at Iqamah, what comes first" /> },
  { id: "scene-siwak-every-prayer", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-taharah-siwak" ask="Why did he ﷺ not order it for every prayer" /> },
  { id: "scene-seven-dates", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-table-seven-dates-each" ask="How many dates did each companion get" /> },
  { id: "scene-two-dates", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-table-two-dates-at-once" ask="What did Ibn Umar tell people not to do" /> },
  { id: "scene-boy-on-right", render: () => <SceneQuestionDemo lessonId="lesson-deep-sahl-the-boy-on-the-right" ask="Who sat on the Prophet's ﷺ right" /> },
  { id: "scene-after-eating", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-day-after-eating" ask="What kind of praise is it" /> },
  { id: "scene-one-sheet", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-signs-food-on-one-leather-sheet" ask="What did he ﷺ do before the people took the food" /> },
  { id: "scene-never-faulted", render: () => <SceneQuestionDemo lessonId="lesson-deep-seerah-khuluq-food" ask="What did he ﷺ do with food he did not like" /> },
  { id: "scene-date-in-street", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-zakat-date-in-the-street" ask="Why didn't he ﷺ eat it" /> },
  { id: "scene-suhur-two-calls", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-suhur-two-adhans" ask="Whose adhan told them to stop eating" /> },
  { id: "scene-wool-toys", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-manners-wool-toys" ask="What did the Ansar make for their fasting children" /> },
  { id: "scene-generous-wind", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-manners-faster-than-wind" ask="What did he ﷺ do with Jibril each night" /> },
  { id: "scene-fast-on-a-journey", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-ease-traveler" ask="What did he ﷺ tell the traveler" /> },
  { id: "scene-friday-alone", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-extra-friday" ask="You want to fast on a Friday. What else" /> },
  { id: "scene-fast-with-faith", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-reward-forgiven" ask="Which two things must go with the fast" /> },
  { id: "scene-false-speech", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-manners-false-speech" ask="Besides food and drink, what should a fasting person give up" /> },
  { id: "scene-fasting-in-heat", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibn-rawahah-fasting-in-heat" ask="Who was fasting on that hot day" /> },
  { id: "scene-no-wisal", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-manners-no-wisal" ask="Why did he ﷺ forbid fasting day and night nonstop" /> },
  { id: "scene-three-days-a-month", render: () => <SceneQuestionDemo lessonId="lesson-deep-fast-extra-three-days" ask="Three days a month count like fasting how long" /> },
  { id: "scene-not-before-ramadan", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-fasting-no-fast-just-before-ramadan" ask="Who may still fast that day" /> },
  { id: "scene-no-fast-on-eid", render: () => <SceneQuestionDemo lessonId="lesson-deep-eid-no-fasting" ask="Is it allowed to fast on Eid day" /> },
  { id: "scene-ashura-and-ramadan", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-fasting-ashura-became-optional" ask="After Ramadan was made a duty, Ashura became" /> },
  { id: "scene-milk-at-arafah", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-fasting-milk-at-arafah" ask="He ﷺ drank it while people watched" /> },
  { id: "scene-rain-dua", render: () => <SceneQuestionDemo lessonId="lesson-deep-naba1-the-rain-dua" ask="What did he say when he saw rain" /> },
  { id: "scene-nothing-grows", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-rain-and-wind-rain-yet-nothing-grows" ask="Why would there be famine despite heavy rain" /> },
  { id: "scene-cloud-and-garden", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-stories-of-charity-the-cloud-and-the-garden" ask="How much of the harvest did the garden's owner give in charity" /> },
  { id: "scene-pray-in-your-homes", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayer-rain-cold-and-heat-pray-in-your-homes" ask="Whom did he ﷺ tell to say: pray in your homes" /> },
  { id: "scene-house-for-rain-and-sun", render: () => <SceneQuestionDemo lessonId="lesson-deep-akhirah-what-this-world-is-worth-a-house-for-rain-and-sun" ask="Why did Ibn Umar build his house" /> },
  { id: "scene-sheep-on-the-hills", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-bad-al-khalq-sheep-on-the-hills" ask="Why will he take his sheep up the mountains" /> },
  { id: "scene-when-the-wind-blows", render: () => <SceneQuestionDemo lessonId="lesson-deep-ahqaf2-dua-when-the-wind-blows" ask="What did he ask for in a storm" /> },
  { id: "scene-good-in-horses", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-animal-manners-good-in-horses" ask="Until when will the good stay in them" /> },
  { id: "scene-horse-race", render: () => <SceneQuestionDemo lessonId="lesson-deep-sahaba-small-stories-the-horse-race" ask="Where did the horses not made lean race to" /> },
  { id: "scene-al-adba", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-riqaq-al-adba-the-camel" ask="Who beat Al-Adba in the race" /> },
  { id: "scene-rooster-and-donkey", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dua-rooster-and-donkey" ask="A rooster crows at dawn" /> },
  { id: "scene-ask-before-milking", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-animal-manners-ask-before-milking" ask="What did he ﷺ compare an animal's udder to" /> },
  { id: "scene-goat-lent-for-milk", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-wise-wealth-a-goat-for-its-milk" ask="What does Allah give for one of these deeds" /> },
  { id: "scene-camel-as-sutrah", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayer-sutrah-his-camel-as-a-sutrah" ask="Ibn Umar used to do the same" /> },
  { id: "scene-show-me-the-market", render: () => <SceneQuestionDemo lessonId="lesson-deep-muhajirun-market" ask="Which market did they show him" /> },
  { id: "scene-grain-on-credit", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-the-iron-armour" ask="What did he leave as a pledge" /> },
  { id: "scene-bundle-of-wood", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-carry-the-wood" ask="Why is asking people risky" /> },
  { id: "scene-easygoing-trader", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-easygoing-trader" ask="When else should we be easy" /> },
  { id: "scene-fruit-when-ripe", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-ripe-fruit-only" ask="When may fruit on trees be sold" /> },
  { id: "scene-gold-for-gold", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-gold-for-gold" ask="How must gold be swapped for gold" /> },
  { id: "scene-share-the-fruits", render: () => <SceneQuestionDemo lessonId="lesson-deep-hashr2-share-the-fruits" ask="What did the emigrants answer" /> },
  { id: "scene-tired-camel", render: () => <SceneQuestionDemo lessonId="lesson-deep-jabir-the-camel" ask="What happened to the camel after the dua" /> },
  { id: "scene-water-skins", render: () => <SceneQuestionDemo lessonId="lesson-deep-imran-ibn-husayn-the-water-skins" ask="What happened to the woman's people" /> },
  { id: "scene-alone-at-night", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-staying-safe-not-alone-at-night" ask="What is safer for a journey at night" /> },
  { id: "scene-travellers-adhan", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-adhan-travellers-call-too" ask="What should two travellers do at prayer time" /> },
  { id: "scene-set-out-on-thursday", render: () => <SceneQuestionDemo lessonId="lesson-deep-found-journey-set-out-on-thursday" ask="usually set out on a journey" /> },
  { id: "scene-camel-is-yours", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-kind-ways-the-camel-is-yours" ask="say to Abdullah after buying it" /> },
  { id: "scene-search-at-arafah", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-the-day-of-arafah-a-lost-camel" ask="Why was Jubair surprised" /> },
  { id: "scene-walls-of-madinah", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-madinah-hurrying-home" ask="on seeing Madinah's walls" /> },
  { id: "scene-faith-returns", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-madinah-faith-goes-home" ask="How does faith return to Madinah" /> },
  { id: "scene-salt-in-water", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-madinah-like-salt-in-water" ask="What does the plotter melt like" /> },
  { id: "scene-like-a-furnace", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-madinah-like-a-furnace" ask="What is Madinah like" /> },
  { id: "scene-between-house-and-pulpit", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-masjids-rawdah" ask="house and his minbar" /> },
  { id: "scene-thousand-prayers", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-masjids-thousand" ask="Which masjid is left out of that count" /> },
  { id: "scene-quba-every-saturday", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah4-visiting-quba" ask="visit Quba, per Ibn Umar" /> },
  { id: "scene-guided-to-friday", render: () => <SceneQuestionDemo lessonId="lesson-deep-jumuah3-guided-to-friday" ask="Which day was this Ummah guided to" /> },
  { id: "scene-prayers-at-home", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-extra-at-home" ask="likened to what" /> },
  { id: "scene-prayer-on-his-mount", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-easy-on-his-mount" ask="Which way did he face when riding" /> },
  { id: "scene-fast-horse", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-talhah-the-horse" ask="find when he rode out" /> },
  { id: "scene-talking-wolf", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-wolf" ask="What did the wolf in the story do" /> },
  { id: "scene-well-dream", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-dream-of-the-well" ask="How many buckets did Ibn Abi Quhafah draw" /> },
  { id: "scene-land-of-palms", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-tabir-a-land-of-palm-trees" ask="Which city did that land turn out to be" /> },
  { id: "scene-dearer-than-the-world", render: () => <SceneQuestionDemo lessonId="lesson-deep-fath1-dearer-than-the-world" ask="How many times did Umar ask" /> },
  { id: "scene-milk-of-knowledge", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-milk" ask="where did the milk flow out" /> },
  { id: "scene-fatihah-cure", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-said-fatihah-ruqyah" ask="What happened to the chief" /> },
  { id: "scene-cloak-on-the-thorns", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-beautiful-character-generous-truthful-brave" ask="what did he ask the people to give him" /> },
  { id: "scene-rings-thrown-away", render: () => <SceneQuestionDemo lessonId="lesson-deep-aqidah-sunnah-rings-thrown-away" ask="threw his ring away" /> },
  { id: "scene-tailors-gourd", render: () => <SceneQuestionDemo lessonId="lesson-deep-saffat5-the-prophet-liked-gourd" ask="look for, in the hadith" /> },
  { id: "scene-the-eclipse", render: () => <SceneQuestionDemo lessonId="lesson-deep-mughirah-the-eclipse" ask="What should we do at an eclipse" /> },
  { id: "scene-ashari-recitation", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-musa-night-recitation" ask="recognize the Ash'aris' houses" /> },
  { id: "scene-gold-not-kept-overnight", render: () => <SceneQuestionDemo lessonId="lesson-zakat-character-and-intention-promptness" ask="Once zakat is due" /> },
  { id: "scene-dimam-questions", render: () => <SceneQuestionDemo lessonId="lesson-deep-fresh-start-dimam-asks" ask="What did Dimam ask before his questions" /> },
  { id: "scene-repaid-better", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hibah-repay-in-the-best-way" ask="give the man back" /> },
  { id: "scene-every-gate", render: () => <SceneQuestionDemo lessonId="lesson-deep-layl4-called-from-every-gate" ask="What did Abu Bakr ask" /> },
  { id: "scene-sharing-ashari", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-companions-the-sharing-ashariyyun" ask="when food ran low" /> },
  { id: "scene-zamzam-drink", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-spirit-zamzam" ask="choose to drink" /> },
  { id: "scene-silver-and-gold-gardens", render: () => <SceneQuestionDemo lessonId="lesson-deep-rahman3-gardens-of-gold-and-silver" ask="What are two gardens made of" /> },
  { id: "scene-guard-tonight", render: () => <SceneQuestionDemo lessonId="lesson-deep-sad-guard-me-tonight" ask="wish for that night" /> },
  { id: "scene-vow-in-the-sun", render: () => <SceneQuestionDemo lessonId="lesson-deep-aqidah-the-balanced-way-a-vow-of-hardship" ask="let him keep" /> },
  { id: "scene-one-who-followed", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-table-one-more-guest" ask="another man followed them" /> },
  { id: "scene-water-for-wudu", render: () => <SceneQuestionDemo lessonId="lesson-deep-tree-ibn-abbas-water-for-wudu" ask="ask Allah to give him" /> },
  { id: "scene-tawaf-on-camel", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-kabah-tawaf-on-camel" ask="reached the Corner" /> },
  { id: "scene-soft-salam", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-salam-and-visitors-a-soft-salam-at-night" ask="Who would hear his" /> },
  { id: "scene-army-of-leaves", render: () => <SceneQuestionDemo lessonId="lesson-deep-abuubaydah-khabat" ask="called the army of leaves" /> },
  { id: "scene-beyond-the-seas", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-stories-of-charity-a-bedouins-camels" ask="about his camels" /> },
  { id: "scene-half-the-debt", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-making-peace-let-go-of-half" ask="do with the debt" /> },
  { id: "scene-quba-peace", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-making-peace-let-us-make-peace" ask="told about the fight" /> },
  { id: "scene-better-than-a-servant", render: () => <SceneQuestionDemo lessonId="lesson-deep-ali-better-than-servant" ask="Allahu Akbar said" /> },
  { id: "scene-thumamah-freed", render: () => <SceneQuestionDemo lessonId="lesson-deep-fresh-start-thumamah" ask="on the third day" /> },
  { id: "scene-the-last-brick", render: () => <SceneQuestionDemo lessonId="lesson-deep-ahzab2-the-last-brick" ask="Who is that brick" /> },
  { id: "scene-green-land", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf3-why-he-was-called-al-khidr" ask="where he sat" /> },
  { id: "scene-mat-for-prayer", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-children-a-row-behind-him" ask="lined up with Anas" /> },
  { id: "scene-held-back", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah4-with-you-by-intention" ask="counted as with them" /> },
  { id: "scene-valley-of-the-ansar", render: () => <SceneQuestionDemo lessonId="lesson-deep-muhajirun-but-for-hijrah" ask="Whose valley" /> },
  { id: "scene-kept-for-you", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-kind-ways-we-kept-this-for-you" ask="came out to Makhramah" /> },
  { id: "scene-long-night", render: () => <SceneQuestionDemo lessonId="lesson-deep-intro-starting-out-a-long-night-ends" ask="night of his journey" /> },
  { id: "scene-three-came", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-ilm-three-men-at-the-circle" ask="found a place in the circle" /> },
  { id: "scene-friday-silq", render: () => <SceneQuestionDemo lessonId="lesson-deep-sahl-friday-lunch" ask="When did she feed them" /> },
  { id: "scene-what-you-meant", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-anyone-what-you-intended" ask="tell Yazid" /> },
  { id: "scene-marked-cloth", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-prayer-the-marked-cloth" ask="ask for instead" /> },
  { id: "scene-date-stones", render: () => <SceneQuestionDemo lessonId="lesson-deep-asma-hard-work" ask="worked hard" /> },
  { id: "scene-like-no-other", render: () => <SceneQuestionDemo lessonId="lesson-deep-how-they-came-to-islam-words-like-no-other" ask="How many times" /> },
  { id: "scene-up-and-down", render: () => <SceneQuestionDemo lessonId="lesson-deep-found-day-night-going-up-going-down" ask="going down" /> },
  { id: "scene-forgotten-tree", render: () => <SceneQuestionDemo lessonId="lesson-deep-fath2-the-tree-was-forgotten" ask="What happened the next year" /> },
  { id: "scene-cave-at-mina", render: () => <SceneQuestionDemo lessonId="lesson-deep-mursalat1-revealed-in-a-cave" ask="How did Ibn Masud learn" /> },
  { id: "scene-well-of-aris", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dress-the-silver-ring" ask="Who wore it after" /> },
  { id: "scene-gold-not-kept", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-riqaq-gold-like-uhud" ask="How long would he" /> },
  { id: "scene-reached-its-place", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-stories-of-charity-nusaybahs-sheep" ask="say about the meat" /> },
  { id: "scene-horse-kept", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-animal-manners-a-horse-kept-for-allah" ask="rewarded for" /> },
  { id: "scene-carpets-will-come", render: () => <SceneQuestionDemo lessonId="lesson-deep-marriage-weddings-and-new-homes-carpets-will-come" ask="wife remind him" /> },
  { id: "scene-kaaba-as-it-was", render: () => <SceneQuestionDemo lessonId="lesson-deep-fresh-start-kabah-left-as-it-was" ask="not rebuild the Ka'bah" /> },
  { id: "scene-cloth-in-the-heat", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayer-rain-cold-and-heat-clothes-in-the-heat" ask="spread on the hot earth" /> },
  { id: "scene-covered-cup", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-food-cover-the-cup" ask="tell Abu Humayd" /> },
  { id: "scene-one-date-shared", render: () => <SceneQuestionDemo lessonId="lesson-deep-children-daughters" ask="do with one date" /> },
  { id: "scene-blessed-bowl", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibn-salam-a-blessed-bowl" ask="serve his guest" /> },
  { id: "scene-cloaks-alike", render: () => <SceneQuestionDemo lessonId="lesson-deep-abudharr-brothers" ask="same cloak" /> },
  { id: "scene-half-a-sa", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah4-small-charity" ask="say about the small gift" /> },
  { id: "scene-promise-of-bahrain", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hibah-a-promise-kept" ask="kept the promise" /> },
  { id: "scene-swore-at-the-door", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-making-peace-the-man-who-swore" ask="What did the man say" /> },
  { id: "scene-covenant-kept", render: () => <SceneQuestionDemo lessonId="lesson-deep-hudhayfah-kept-his-word" ask="miss Badr" /> },
  { id: "scene-dress-to-borrow", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hibah-a-dress-to-borrow" ask="borrow her dress" /> },
  { id: "scene-shade-of-the-kabah", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-stories-of-charity-in-the-shade-of-the-kabah" ask="were the losers" /> },
  { id: "scene-secret-kept", render: () => <SceneQuestionDemo lessonId="lesson-deep-anas-secret" ask="refuse to tell" /> },
  { id: "scene-bless-the-givers", render: () => <SceneQuestionDemo lessonId="lesson-deep-tawbah4-dua-for-the-giver" ask="Whose family" /> },
  { id: "scene-serve-your-parents", render: () => <SceneQuestionDemo lessonId="lesson-deep-parents-serve-them" ask="ask the man first" /> },
  { id: "scene-best-to-the-poor", render: () => <SceneQuestionDemo lessonId="lesson-deep-jafar-the-poor" ask="split open" /> },
  { id: "scene-out-to-welcome", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-children-out-to-welcome-him" ask="Where did the boys meet" /> },
  { id: "scene-quba-turn", render: () => <SceneQuestionDemo lessonId="lesson-deep-baqarah2-quba-turn" ask="do when they heard" /> },
  { id: "scene-caravan-on-friday", render: () => <SceneQuestionDemo lessonId="lesson-deep-jumuah3-the-caravan-arrives" ask="How many people stayed" /> },
  { id: "scene-never-forgot", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-hurairah-never-forgot" ask="tell him to spread" /> },
  { id: "scene-two-rewards", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-zaynab-two-rewards" ask="when Bilal said her name" /> },
  { id: "scene-gift-in-ihram", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-kind-ways-we-did-not-refuse-your-gift" ask="not take the gift" /> },
  { id: "scene-cloak-to-give", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hibah-to-give-not-to-wear" ask="give the cloak to" /> },
  { id: "scene-water-for-jabir", render: () => <SceneQuestionDemo lessonId="lesson-deep-jabir-the-visit" ask="sprinkle on Jabir" /> },
  { id: "scene-visit-to-the-youth", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-visit-sick-the-young-helper" ask="sit during the visit" /> },
  { id: "scene-room-for-a-sheep", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayer-sutrah-room-for-a-sheep" ask="How much room" /> },
  { id: "scene-husk-blown", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-table-blow-off-the-husk" ask="clean the barley" /> },
  { id: "scene-enough-for-more", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-food-food-for-two" ask="Food for two people" /> },
  { id: "scene-black-khamisa", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-umm-khalid-dress" ask="What does 'sanah' mean" /> },
  { id: "scene-garden-for-the-masjid", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-wills-the-price-from-allah" ask="What was the land for" /> },
  { id: "scene-guide-daws", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-companions-guide-the-daws" ask="pray instead" /> },
  { id: "scene-learning-in-turns", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-learning-turns" ask="bring back for the other" /> },
  { id: "scene-fathers-friend", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-adab-father-friends" ask="finest goodness" /> },
  { id: "scene-one-in-a-hundred", render: () => <SceneQuestionDemo lessonId="lesson-deep-intro-short-words-to-live-by-one-in-a-hundred" ask="Among how many camels" /> },
  { id: "scene-foam-of-the-sea", render: () => <SceneQuestionDemo lessonId="lesson-deep-waqiah4-forgiven-like-sea-foam" ask="How many times a day" /> },
  { id: "scene-flowing-spring", render: () => <SceneQuestionDemo lessonId="lesson-deep-uthman-mazun-flowing-spring" ask="What did Umm al-Ala see in her dream" /> },
  { id: "scene-kings-on-the-sea", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-umm-haram-sea" ask="What did Umm Haram ask for" /> },
  { id: "scene-glass-vessels", render: () => <SceneQuestionDemo lessonId="lesson-deep-husbands-glass-vessels" ask="tell Anjashah to do" /> },
  { id: "scene-right-sandal-first", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dress-right-shoe-first" ask="Which shoe comes off first" /> },
  { id: "scene-uways-of-yemen", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-uways" ask="What was Uways known for" /> },
  { id: "scene-hazn-and-sahl", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-good-names-hazn-and-sahl" ask="offer Hazn" /> },
  { id: "scene-ajwa-morning", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-medicine-ajwa-dates" ask="What do they protect from" /> },
  { id: "scene-a-dua-for-anas", render: () => <SceneQuestionDemo lessonId="lesson-sahabi-anas-ibn-malik-worship-and-character" ask="prayed for Anas to have wealth" /> },
  { id: "scene-truly-trustworthy", render: () => <SceneQuestionDemo lessonId="lesson-deep-abuubaydah-najran" ask="What kind of man did the people of Najran ask for" /> },
  { id: "scene-takbir-on-the-rises", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-spirit-coming-home" ask="say three times on every rise" /> },
  { id: "scene-gifts-to-the-collector", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hibah-gifts-for-the-collector" ask="What job was Ibn al-Lutbiyyah sent to do" /> },
  { id: "scene-three-days-for-a-guest", render: () => <SceneQuestionDemo lessonId="lesson-deep-neighbors-guest" ask="How long is a guest's full hospitality" /> },
  { id: "scene-garlic-and-the-masjid", render: () => <SceneQuestionDemo lessonId="lesson-deep-clean-no-bad-smell" ask="Which two foods are named" /> },
  { id: "scene-straight-as-an-arrow", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dua-straight-as-an-arrow" ask="What should you picture" /> },
  { id: "scene-two-hijrahs", render: () => <SceneQuestionDemo lessonId="lesson-deep-muhajirun-two-hijrahs" ask="How many hijrahs did the people of the ship earn" /> },
  { id: "scene-sana-to-hadramawt", render: () => <SceneQuestionDemo lessonId="lesson-deep-khabbab-in-the-shade" ask="when Khabbab came" /> },
  { id: "scene-heard-by-all", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-adhan-reward-everything-hears" ask="Who will be a witness for the caller" /> },
  { id: "scene-feed-visit-free", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-food-feed-the-hungry" ask="Feed the hungry, free the captive" /> },
  { id: "scene-never-refused-perfume", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dress-never-refused-scent" ask="Which companion copied this" /> },
  { id: "scene-blessed-measures", render: () => <SceneQuestionDemo lessonId="lesson-deep-duas-for-others-bless-their-measures" ask="For which people did he" /> },
  { id: "scene-twenty-nights", render: () => <SceneQuestionDemo lessonId="lesson-foundation-first-worship-rhythm-hear-the-call" ask="calls Muslims to pray five times a day" /> },
  { id: "scene-brother-of-a-muslim", render: () => <SceneQuestionDemo lessonId="lesson-deep-brotherhood-do-not-wrong-him" ask="a friend's private mistake" /> },
  { id: "scene-love-them-both", render: () => <SceneQuestionDemo lessonId="lesson-deep-usamah-loved-child" ask="Who was held with Usamah" /> },
  { id: "scene-hurry-home", render: () => <SceneQuestionDemo lessonId="lesson-deep-found-journey-hurry-home" ask="What does travel keep a person from" /> },
  { id: "scene-soft-hearts-of-yemen", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-musa-soft-hearts" ask="faith and wisdom are Yemeni" /> },
  { id: "scene-a-modest-pace", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-the-day-of-arafah-a-modest-pace" ask="when there was enough space" /> },
  { id: "scene-salam-to-the-boys", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-everyday-manners-salam-to-the-children" ask="Why did Anas say salam" /> },
  { id: "scene-joy-at-a-wedding", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-marriage-joy-at-a-wedding" ask="react to the wedding guests" /> },
  { id: "scene-the-easier-of-two", render: () => <SceneQuestionDemo lessonId="lesson-deep-seerah-khuluq-easier" ask="Which choice did he" /> },
  { id: "scene-words-you-could-count", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-kind-ways-words-you-could-count" ask="What could a person count" /> },
  { id: "scene-a-date-of-sadaqah", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-zakat-hasan-and-the-date" ask="stop him" /> },
  { id: "scene-a-good-condiment", render: () => <SceneQuestionDemo lessonId="lesson-deep-found-eating-drinking-a-good-condiment" ask="eat with the bread" /> },
  { id: "scene-labbayk-as-it-rose", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hajj-labbayk-as-the-camel-rose" ask="When exactly did he" /> },
  { id: "scene-a-bowl-of-milk", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-umm-al-fadl-milk" ask="How did Umm al-Fadl find out" /> },
  { id: "scene-days-of-tashriq", render: () => <SceneQuestionDemo lessonId="lesson-deep-days-tashriq" ask="are for what" /> },
  { id: "scene-say-no-cheating", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-no-cheating" ask="say when buying" /> },
  { id: "scene-dates-with-cucumber", render: () => <SceneQuestionDemo lessonId="lesson-deep-found-foods-he-ate-dates-with-cucumber" ask="Who saw him" /> },
  { id: "scene-the-worst-feast", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-marriage-the-worst-wedding-food" ask="Which wedding food" /> },
  { id: "scene-charity-for-barirah", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-zakat-charity-for-her-gift-for-us" ask="the meat was" /> },
  { id: "scene-the-best-gift", render: () => <SceneQuestionDemo lessonId="lesson-deep-patience-best-gift" ask="best gift a person" /> },
  { id: "scene-content-with-enough", render: () => <SceneQuestionDemo lessonId="lesson-deep-nahl6-content-with-what-allah-gives" ask="How much provision" /> },
  { id: "scene-constant-deeds", render: () => <SceneQuestionDemo lessonId="lesson-deep-maarij3-small-but-constant" ask="Which deeds does Allah love most" /> },
  { id: "scene-a-group-of-three", render: () => <SceneQuestionDemo lessonId="lesson-deep-adab-three-people" ask="What should two of them not do" /> },
  { id: "scene-four-dearest-words", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-dhikr-four-dearest-words" ask="one of the four" /> },
  { id: "scene-two-raised-well", render: () => <SceneQuestionDemo lessonId="lesson-deep-children-two-girls" ask="How close will" /> },
  { id: "scene-a-dua-for-the-sick", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-visit-sick-the-healing-dua" ask="What kind of healing" /> },
  { id: "scene-the-work-of-his-hands", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-dawud-own-hands" ask="Whose example" /> },
  { id: "scene-every-good-is-charity", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-everyday-every-good" ask="What counts as charity" /> },
  { id: "scene-a-hundred-times-a-day", render: () => <SceneQuestionDemo lessonId="lesson-deep-tahrim2-a-hundred-times" ask="Whom did the Prophet" /> },
  { id: "scene-close-in-the-rows", render: () => <SceneQuestionDemo lessonId="lesson-deep-saffat1-rows-like-the-angels" ask="How do angels make rows" /> },
  { id: "scene-zayd-was-truthful", render: () => <SceneQuestionDemo lessonId="lesson-deep-munafiqun1-zaid-heard-the-words" ask="How did Zaid feel" /> },
  { id: "scene-this-is-my-sunnah", render: () => <SceneQuestionDemo lessonId="lesson-deep-raad4-my-sunnah" ask="he does with fasting" /> },
  { id: "scene-not-home-at-night", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-marriage-dont-surprise-them-at-night" ask="when should you not arrive home" /> },
  { id: "scene-a-charity-for-travellers", render: () => <SceneQuestionDemo lessonId="lesson-deep-nisa3-shorten" ask="call shortening the prayer" /> },
  { id: "scene-before-you-sleep", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadid1-the-first-and-the-last" ask="What does Al-Akhir mean" /> },
  { id: "scene-a-secret-not-told", render: () => <SceneQuestionDemo lessonId="lesson-deep-umar-hafsah" ask="Why had Abu Bakr stayed quiet" /> },
  { id: "scene-never-angry-again", render: () => <SceneQuestionDemo lessonId="lesson-deep-jannah-pleased" ask="best gift in Jannah" /> },
  { id: "scene-ninety-nine-names", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-asma-ninety-nine" ask="How many names of Allah" /> },
  { id: "scene-the-best-of-women", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-asiyah-perfect" ask="Which two women" /> },
  { id: "scene-as-much-as-you-can", render: () => <SceneQuestionDemo lessonId="lesson-deep-hashr2-as-much-as-you-can" ask="with what he forbids" /> },
  { id: "scene-understanding-the-religion", render: () => <SceneQuestionDemo lessonId="lesson-deep-hadith-knowledge-understanding" ask="someone He wants good for" /> },
  { id: "scene-earth-from-the-trench", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibn-rawahah-trench-verses" ask="Whose verses" /> },
  { id: "scene-who-is-not-merciful", render: () => <SceneQuestionDemo lessonId="lesson-deep-mercy-mercy-to-all" ask="Who heard the Prophet" /> },
  { id: "scene-health-and-free-time", render: () => <SceneQuestionDemo lessonId="lesson-deep-takathur2-health-and-free-time" ask="Which two blessings do many" /> },
  { id: "scene-sincere-to-every-muslim", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-iman-jarir-pledge" ask="Who made this promise" /> },
  { id: "scene-refuge-from-worry", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dua-worry-and-grief" ask="Which two feelings" /> },
  { id: "scene-married-for-four", render: () => <SceneQuestionDemo lessonId="lesson-deep-spouses-choose-religion" ask="Which of the four" /> },
  { id: "scene-sawdah-gave-her-day", render: () => <SceneQuestionDemo lessonId="lesson-deep-mothers-sawdah-loved" ask="When did Sawdah give" /> },
  { id: "scene-pleased-with-another", render: () => <SceneQuestionDemo lessonId="lesson-deep-spouses-dislike-one-trait" ask="If a husband dislikes" /> },
  { id: "scene-beware-of-wrongdoing", render: () => <SceneQuestionDemo lessonId="lesson-deep-taha3-beware-of-wrongdoing" ask="What will wrongdoing become" /> },
  { id: "scene-greet-the-masjid", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-qatadah-greet-the-masjid" ask="How many rak'ahs" /> },
  { id: "scene-twice-the-blessing", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-madinah-twice-the-blessing" ask="ask Allah to give Madinah" /> },
  { id: "scene-a-plain-saddle", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-as-he-taught-it-a-plain-saddle" ask="How many camels" /> },
  { id: "scene-ill-or-travelling", render: () => <SceneQuestionDemo lessonId="lesson-deep-pray-easy-same-reward" ask="Who else keeps" /> },
  { id: "scene-for-an-absent-brother", render: () => <SceneQuestionDemo lessonId="lesson-deep-hujurat1-dua-for-an-absent-brother" ask="When is the dua made" /> },
  { id: "scene-none-to-accept-it", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-anyone-no-one-will-take-it" ask="What will the man offered" /> },
  { id: "scene-makes-peace", render: () => <SceneQuestionDemo lessonId="lesson-deep-nisa3-secret-talk" ask="One who makes peace" /> },
  { id: "scene-a-thankful-servant", render: () => <SceneQuestionDemo lessonId="lesson-deep-mughirah-a-thankful-servant" ask="Why did he pray so much" /> },
  { id: "scene-spend-and-replace", render: () => <SceneQuestionDemo lessonId="lesson-deep-aq-malaikah-two-angels" ask="What does the first angel" /> },
  { id: "scene-a-garment-left-spread", render: () => <SceneQuestionDemo lessonId="lesson-deep-nahl1-the-hour-comes-suddenly" ask="What will the man with milk" /> },
  { id: "scene-cold-and-heat", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayer-rain-cold-and-heat-early-in-the-cold" ask="In very cold weather" /> },
  { id: "scene-the-rope-untied", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-night-prayer-pray-while-fresh" ask="What was the rope for" /> },
  { id: "scene-doors-of-mercy", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-day-mosque" ask="Leaving the mosque" /> },
  { id: "scene-from-the-home", render: () => <SceneQuestionDemo lessonId="lesson-deep-wives-charity-from-home" ask="What must she avoid" /> },
  { id: "scene-flock-between-mountains", render: () => <SceneQuestionDemo lessonId="lesson-deep-how-they-came-to-islam-dearer-than-the-world" ask="What did the man ask his people" /> },
  { id: "scene-on-foot-to-visit", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-visit-sick-on-foot" ask="How did he" /> },
  { id: "scene-dates-in-the-home", render: () => <SceneQuestionDemo lessonId="lesson-deep-found-eating-drinking-dates-at-home" ask="a home with dates will not go hungry" /> },
  { id: "scene-porters-in-the-market", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-anyone-working-to-give" ask="What did they earn" /> },
  { id: "scene-umrah-in-ramadan", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-umrah-ramadan" ask="Why had the woman" /> },
  { id: "scene-three-breaths", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-food-three-breaths" ask="Where did he breathe" /> },
  { id: "scene-truffles-like-manna", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-medicine-truffles" ask="Why are they like manna" /> },
  { id: "scene-a-bed-of-leather", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-riqaq-the-simple-bed" ask="What was his" /> },
  { id: "scene-never-at-a-table", render: () => <SceneQuestionDemo lessonId="lesson-deep-kids-table-no-fancy-table" ask="What did he" /> },
  { id: "scene-the-two-corners", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-kabah-two-corners" ask="Ibn Umar followed the sunnah" /> },
  { id: "scene-vessels-after-fajr", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-fadail-a-hand-in-every-bowl" ask="Who brought vessels" /> },
  { id: "scene-gone-ahead", render: () => <SceneQuestionDemo lessonId="lesson-deep-duas-remembering-allah-always-those-who-have-gone-ahead" ask="Who are the mufarridun" /> },
  { id: "scene-as-if-riding", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dress-wear-sandals" ask="Walking in sandals" /> },
  { id: "scene-like-a-pure-loaf", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibrahim4-a-white-flat-land" ask="What will the land of gathering" /> },
  { id: "scene-the-biggest-heap", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-wills-jabirs-fathers-debts" ask="What did he" /> },
  { id: "scene-who-is-that", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-permission-who-is-it" ask="What did Jabir answer" /> },
  { id: "scene-sweet-things-and-honey", render: () => <SceneQuestionDemo lessonId="lesson-deep-tahrim1-he-loved-honey" ask="What did the Prophet" /> },
  { id: "scene-healing-in-black-cumin", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-medicine-black-seed" ask="What seed did he" /> },
  { id: "scene-over-which-the-sun-rises", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-dua-dearer-than-the-world" ask="These four words" /> },
  { id: "scene-brisk-then-walking", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-kabah-ramal" ask="In how many rounds" /> },
  { id: "scene-said-three-times", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-ilm-said-three-times" ask="How many times" /> },
  { id: "scene-the-gate-of-abu-bakr", render: () => <SceneQuestionDemo lessonId="lesson-deep-abubakr-khalil" ask="Which door to the masjid" /> },
  { id: "scene-even-a-trotter", render: () => <SceneQuestionDemo lessonId="lesson-deep-manners-gifts-even-small" ask="Would he" /> },
  { id: "scene-start-with-your-dependents", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-zakat-best-charity-family-first" ask="Whom should you give" /> },
  { id: "scene-even-with-one-sheep", render: () => <SceneQuestionDemo lessonId="lesson-deep-abdur-rahman-wedding" ask="What mahr did" /> },
  { id: "scene-the-right-then-the-right", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-food-the-right-first" ask="Who got the drink" /> },
  { id: "scene-stung-by-a-scorpion", render: () => <SceneQuestionDemo lessonId="lesson-deep-dua-adhkar-perfect-words" ask="When should he" /> },
  { id: "scene-a-tent-like-a-pearl", render: () => <SceneQuestionDemo lessonId="lesson-deep-akhirah-hoping-paradise-a-tent-of-one-pearl" ask="How big is the pearl tent" /> },
  { id: "scene-every-friday", render: () => <SceneQuestionDemo lessonId="lesson-deep-jannah-market" ask="When do people of Jannah" /> },
  { id: "scene-a-mountain-of-gold", render: () => <SceneQuestionDemo lessonId="lesson-deep-minorsigns-euphrates" ask="What will the Euphrates" /> },
  { id: "scene-three-consecutive-days", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-food-three-days-bread" ask="What did his family not have" /> },
  { id: "scene-for-the-second-time", render: () => <SceneQuestionDemo lessonId="lesson-deep-salamah-pledge-once-more" ask="Salamah gave the pledge" /> },
  { id: "scene-within-seconds", render: () => <SceneQuestionDemo lessonId="lesson-deep-akhirah-hoping-paradise-the-farmer-of-paradise" ask="How fast will his crops" /> },
  { id: "scene-one-sa-of-dates", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-trade-pay-the-worker" ask="How was Abu Taybah paid" /> },
  { id: "scene-the-sun-from-the-west", render: () => <SceneQuestionDemo lessonId="lesson-deep-anam3-sun-west" ask="Which sign closes the door" /> },
  { id: "scene-like-the-full-moon", render: () => <SceneQuestionDemo lessonId="lesson-deep-jannah-moon-faces" ask="How will the first group in Jannah" /> },
  { id: "scene-a-white-mule", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-wills-what-he-left-behind" ask="What colour was his mule" /> },
  { id: "scene-the-best-dinar", render: () => <SceneQuestionDemo lessonId="lesson-deep-thawban-best-dinar" ask="Which coin is the best" /> },
  { id: "scene-the-fruit-garden", render: () => <SceneQuestionDemo lessonId="lesson-deep-thawban-garden-of-fruit" ask="Visiting the sick is like being" /> },
  { id: "scene-the-firm-handhold", render: () => <SceneQuestionDemo lessonId="lesson-deep-ibn-salam-the-handhold" ask="What did he hold in his dream" /> },
  { id: "scene-the-dates-of-ibn-tab", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-tabir-the-dates-of-ibn-tab" ask="What did he ﷺ read from the dates" /> },
  { id: "scene-washed-with-snow-and-hail", render: () => <SceneQuestionDemo lessonId="lesson-deep-duas-seeking-refuge-washed-with-snow-and-hail" ask="With what did he ﷺ ask Allah" /> },
  { id: "scene-columns-of-gold-and-silver", render: () => <SceneQuestionDemo lessonId="lesson-deep-zalzalah1-treasure-nobody-wants" ask="What will come out like columns" /> },
  { id: "scene-the-sun-and-the-moon-folded-up", render: () => <SceneQuestionDemo lessonId="lesson-deep-takwir1-sun-and-moon-folded" ask="What will be folded up" /> },
  { id: "scene-the-sheep-and-its-grass", render: () => <SceneQuestionDemo lessonId="lesson-deep-said-ibn-zayd-allahs-name" ask="Who did Zayd say made the sheep" /> },
  { id: "scene-two-mudds-of-barley", render: () => <SceneQuestionDemo lessonId="lesson-deep-marriage-love-simple-walimah" ask="What was that walimah made of" /> },
  { id: "scene-never-missed", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-night-prayer-never-missed" ask="How many before Zuhr" /> },
  { id: "scene-the-weak-go-early", render: () => <SceneQuestionDemo lessonId="lesson-deep-book-hajj-the-weak-go-early" ask="Who was sent early from Muzdalifah" /> },
  { id: "scene-except-for-three-masjids", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-masjids-three" ask="How many masjids are named for travel" /> },
  { id: "scene-pray-in-your-houses", render: () => <SceneQuestionDemo lessonId="lesson-deep-prayer-rain-cold-and-heat-mud-and-slush" ask="What did Ibn Abbas not want people" /> },
  { id: "scene-right-left-front-and-back", render: () => <SceneQuestionDemo lessonId="lesson-deep-akhirah-wealth-and-next-life-the-rich-who-give" ask="Which rich person is the exception" /> },
  { id: "scene-the-night-at-dhi-tuwa", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-makkah-the-beloved-city-ready-to-enter-makkah" ask="Where did Ibn Umar spend the night" /> },
  { id: "scene-the-young-greet-the-old", render: () => <SceneQuestionDemo lessonId="lesson-deep-adab-who-greets-first" ask="A group of three meets a group of ten" /> },
  { id: "scene-a-widow-or-a-poor-person", render: () => <SceneQuestionDemo lessonId="lesson-deep-zakat-anyone-caring-for-the-poor" ask="Whom does Bukhari 5353 tell us" /> },
  { id: "scene-satisfied-and-quenched", render: () => <SceneQuestionDemo lessonId="lesson-deep-abu-umamah-thanks-after-eating" ask="Allah's favor can be fully paid back" /> },
  // Month questions on the year: Ashura in Muharram; Sha'ban, answered wrong (the right month turns green, its moon full).
  { id: "month", render: () => <MonthQuestionDemo lessonId="lesson-deep-days-ashura" ask="Ashura is in" /> },
  { id: "month-picked", render: () => <MonthQuestionDemo lessonId="lesson-deep-days-ashura" ask="Ashura is in" pick="right" /> },
  { id: "month-right", render: () => <MonthQuestionDemo lessonId="lesson-deep-days-ashura" ask="Ashura is in" pick="right" check /> },
  { id: "month-wrong", render: () => <MonthQuestionDemo lessonId="lesson-deep-fast-extra-shaban" ask="fast most" pick="wrong" check /> },
  { id: "month-qadr", render: () => <MonthQuestionDemo lessonId="lesson-deep-qadr1-in-the-month-of-ramadan" ask="Night of Al-Qadr" /> },
  // Animal questions on picture cards: the hoopoe that brought Sulayman news; the mosquito of 2:26, answered wrong;
  // Salih's she-camel among three; the scorpion among small creatures; the sea's whale and the land's lion together.
  { id: "animal", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-sulayman-hoopoe" ask="brought Sulayman news" /> },
  { id: "animal-picked", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-sulayman-hoopoe" ask="brought Sulayman news" pick="right" /> },
  { id: "animal-right", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-sulayman-hoopoe" ask="brought Sulayman news" pick="right" check /> },
  { id: "animal-wrong", render: () => <CardQuestionDemo lessonId="lesson-deep-baqarah1-mosquito" ask="2:26" pick="wrong" check /> },
  { id: "animal-three", render: () => <CardQuestionDemo lessonId="lesson-prophets-early-messengers-hud-and-salih" ask="Salih's people" /> },
  { id: "animal-sting", render: () => <CardQuestionDemo lessonId="lesson-deep-dua-adhkar-perfect-words" ask="stung" /> },
  { id: "animal-sea", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-2-21-29" ask="ayah 26" /> },
  { id: "animal-zoo", render: () => <CardWall kinds={ANIMAL_KINDS} /> },
  // Things on picture cards: the fresh dates that fell for Maryam; the iron softened for Dawud, answered wrong; foods,
  // fruits and metals; the light, the fire, the water and the clay; the rain, the rivers, the sea; three answers; an
  // animal among things; and a wall of every thing, moving.
  { id: "cards", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-19-16-26" ask="fell from the palm" /> },
  { id: "cards-picked", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-19-16-26" ask="fell from the palm" pick="right" /> },
  { id: "cards-right", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-19-16-26" ask="fell from the palm" pick="right" check /> },
  { id: "cards-wrong", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-34-10-21" ask="soften for Dawud" pick="wrong" check /> },
  { id: "cards-food", render: () => <CardQuestionDemo lessonId="lesson-deep-fasting-suhur-to-iftar-dates-at-suhur" ask="suhur" /> },
  { id: "cards-fruit", render: () => <CardQuestionDemo lessonId="lesson-deep-anam2-rain-gardens" ask="Which fruit" /> },
  { id: "cards-metal", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-dawud-mountains-birds" ask="Which metal" /> },
  { id: "cards-light", render: () => <CardQuestionDemo lessonId="lesson-deep-kahf2-angels-from-light" ask="angels created" /> },
  { id: "cards-rain", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-71-10-20" ask="pouring down" /> },
  { id: "cards-river", render: () => <CardQuestionDemo lessonId="lesson-deep-tawbah3-fine-dwellings" ask="flows beneath" /> },
  { id: "cards-sea", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-38-15-26" ask="glorified Allah" /> },
  { id: "cards-sky", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-38-27-40" ask="obeyed Sulayman" /> },
  { id: "cards-three", render: () => <CardQuestionDemo lessonId="lesson-women-quran-depth-asiyah-and-steadfastness" ask="Asiyah asked" /> },
  { id: "cards-mixed", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-7-73-93" ask="Salih's sign" /> },
  { id: "thing-zoo", render: () => <CardWall kinds={THING_KINDS} /> },
  {
    id: "match",
    render: () => (
      <LessonScreen progress={0.5} hearts={FULL_HEARTS} onClose={noop}>
        <MatchGame
          pairs={[
            { index: 0, left: "Where do pilgrims stand on the 9th?", right: "Arafah" },
            { index: 1, left: "Where do pilgrims spend the night after Arafah?", right: "Muzdalifah" },
            { index: 2, left: "Where are the pebbles thrown?", right: "Mina" }
          ]}
          mascotVariant="girl"
          accent={FOUNDATION_ACCENT}
          playSound={false}
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "complete-goal",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={10}
        stars={3}
        streakDays={0}
        goal={{ xpToday: 26, goalXp: 40 }}
        unlockedTitle={LESSONS_BY_ID["lesson-foundation-character"]?.title ?? "Wa alaykum as-salam"}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  {
    id: "complete-jumped",
    render: () => (
      <LessonComplete
        headline="You jumped ahead!"
        title={wudu.title}
        xp={110}
        stars={3}
        streakDays={1}
        unlockedTitle={"Muhammad \uFDFA"}
        nextTitle="Next"
        mascotVariant="boy"
        accent={PRAYER_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  // The streak moment after the day's first lesson: a plain day (with a freeze two days ago), a first streak, a week.
  { id: "streak", render: () => <StreakDemo days={5} frozenDaysAgo={2} /> },
  { id: "streak-first", render: () => <StreakDemo days={1} variant="boy" /> },
  { id: "streak-week", render: () => <StreakDemo days={7} /> },
  {
    id: "complete-streak",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward}
        stars={3}
        streakDays={5}
        streakExtended
        streakMoment={{ today: localDateKey() }}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  { id: "quit", render: () => <QuitDemo /> },
  // Every lesson teacher, in the clothes of its topic (src/ui/lesson/Teacher.tsx).
  {
    id: "teachers",
    render: () => (
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, padding: 16, justifyContent: "center" }} testID="gallery-teachers">
        {TEACHER_TOPICS.map((topic) => (
          <View key={topic} style={{ alignItems: "center", width: 104 }}>
            <Teacher look={teacherFor(topic)} variant={topic === "hajj" || topic === "scholars" ? "boy" : "girl"} accent={PRAYER_ACCENT} size={84} talkMs={4000} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>{topic}</Text>
          </View>
        ))}
        {(["scholars", "hajj"] as const).map((topic) => (
          <View key={`${topic}-girl`} style={{ alignItems: "center", width: 104 }}>
            <Teacher look={teacherFor(topic)} variant="girl" accent={PRAYER_ACCENT} size={84} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>{topic} (girl)</Text>
          </View>
        ))}
      </View>
    )
  }
];

const TEACHER_TOPICS = ["foundation", "quran_tafseer", "prophets", "scholars", "hajj", "akhirah", "eid"];

function readHash() {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return "";
  }
  return window.location.hash;
}

export default function LessonGallery() {
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const stateId = hash.replace(/^#gallery-lesson-?/, "");
  const single = STATES.find((state) => state.id === stateId);
  if (single) {
    return (
      <View style={styles.full} key={single.id}>
        {single.render()}
      </View>
    );
  }

  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.list}>
      {STATES.map((state) => (
        <View key={state.id} style={styles.frameBlock}>
          <Text style={styles.caption}>{state.id}</Text>
          <View style={styles.frame}>{state.render()}</View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wall: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: space.sm
  },
  wallItem: {
    width: 300,
    padding: space.xs
  },
  animalItem: {
    width: 152,
    padding: space.xs,
    alignItems: "center"
  },
  full: {
    flex: 1,
    backgroundColor: colors.snow
  },
  list: {
    paddingVertical: space.lg,
    backgroundColor: colors.mist
  },
  frameBlock: {
    marginBottom: space.xxl
  },
  caption: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.inkSoft,
    paddingHorizontal: space.lg,
    marginBottom: space.xs
  },
  frame: {
    height: 760,
    backgroundColor: colors.snow,
    overflow: "hidden"
  }
});
