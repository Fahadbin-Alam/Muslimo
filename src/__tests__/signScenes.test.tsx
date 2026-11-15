jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Animated, StyleSheet } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { DAY_SKY_LESSONS } from "../data/daySky";
import { hajjMapForLesson } from "../data/hajjMap";
import { MOON_LESSONS } from "../data/moonSky";
import { journeyForLesson } from "../data/seerahMap";
import { SIGN_LESSONS, SIGN_SCENES, signForLesson, type SignKind } from "../data/signScenes";
import { surahNumberForTitle } from "../data/surahPictures";
import { setActiveLanguage, t } from "../i18n";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";
import { SignCard } from "../ui/journey/SignCard";
import { SignSceneView } from "../ui/journey/SignScene";
import { fitsTwoLines } from "../ui/journey/moonArt";
import { SIGN_ART, SIGN_BOX, keyAt, signArt, signWords, type SignPart } from "../ui/journey/signArt";
import type { Lesson, LessonSource } from "../types";
import type { TestInstance } from "test-renderer";

// The scene's frame on phones 320, 360, 375, 390 and 412 px wide, on a lesson's first page; and on the gallery's wall.
const FRAMES = [
  [292, 178],
  [332, 201],
  [347, 209],
  [362, 271],
  [384, 287],
  [360, 270]
];
const LANGUAGES = ["en", "bn", "ur", "ar"] as const;
// The scene is hidden from screen readers (its card says what it shows), so its parts are found among hidden ones.
const ALL = { includeHiddenElements: true };
const scene = (id: string) => SIGN_SCENES.find((each) => each.id === id)!;

/** What a lesson says, from its title to its questions. */
function lessonText(lesson: Lesson) {
  return [
    lesson.title,
    lesson.intro,
    lesson.learnLine,
    lesson.quote?.text,
    ...(lesson.learnFacts ?? []),
    lesson.explanationContent,
    lesson.keyTakeaway,
    lesson.storyMoment,
    ...lesson.challenges.map((challenge) => challenge.prompt)
  ]
    .filter(Boolean)
    .join(" ");
}

function lessonSources(lesson: Lesson): LessonSource[] {
  return [lesson.learnSource, ...lesson.sources, ...(lesson.learnDeeper?.sources ?? []), ...lesson.challenges.map((challenge) => challenge.source)].filter(Boolean) as LessonSource[];
}

// What a lesson must speak of to open on each scene.
const ABOUT: Record<string, RegExp[]> = {
  "sign-rain": [/rain|water|dry earth|dead (land|earth)/i, /dead|dry|barren|life|alive|reviv|grow|crop|food|garden|fruit|wind/i],
  "sign-clouds": [/cloud/i, /rain|lightning|water/i],
  "sign-fade": [/crop|plant|pasture|vegetation|green/i, /yellow|dry|dries|stubble|straw|wither|mown|blow|this life|this world|worldly life/i],
  "sign-seed": [/seed|grain/i, /seven/i],
  "sign-seas": [/sea|water/i, /sweet|salt|two|barrier/i],
  "sign-ships": [/ship/i, /sail|sea/i],
  "sign-mountains": [/earth/i, /mountain|spread|bed|steady|firm/i],
  "sign-bee": [/bee|honey/i],
  "sign-spider": [/spider/i, /house|home/i],
  "sign-tree": [/tree|palm/i],
  "sign-look": [/look/i, /camel|sky|mountain|earth/i],
  "sign-birds": [/bird/i, /wing|sky|air|hold|held|glorif/i],
  "sign-sow": [/sow|seed|plant/i, /grow/i],
  "sign-water": [/water|rain/i, /drink|cloud|salt|sweet|fresh|thank|fruitful/i],
  "sign-fire": [/fire/i, /tree|kindle|light|travel|remind|spark/i],
  "sign-shade": [/shade|shadow/i, /sun|stretch|spread/i],
  "sign-foam": [/foam|scum|valley|flood/i, /rain|water|metal|gold|fire/i],
  "sign-lands": [/land|soil|earth/i, /rain|water/i],
  "sign-ashes": [/ash/i, /wind|storm|blow/i],
  "sign-garden": [/garden|harvest|fruit/i, /night|morning|dawn|burn|black|struck|pick|poor|fruit/i],
  "sign-two-gardens": [/garden/i, /two|grape|palm|river|ruin|destroy/i],
  "sign-ark": [/ark|ship|boat|flood|aboard|drown|wave/i, /Nuh|Noah|flood|water|animal|two|pair|Judi|wave/i],
  "sign-sea": [/\bsea\b|Ashura/i, /split|part|path|dry|cross|struck|strike|Pharaoh|Fir'?awn|saved|rescued|Musa/i],
  "sign-springs": [/spring|manna|quail/i, /twelve|rock|stone|manna|quail|shade|desert|water/i],
  "sign-she-camel": [/she-camel|camel|Thamud|carve.*mountain/i, /Salih|Thamud|drink|sign|harm|carve/i],
  "sign-ants": [/\bants?\b/i, /valley|warn|Sulayman|smile|grateful|thank/i],
  "sign-hoopoe": [/hoopoe/i, /Saba|Sheba|letter|news|bird/i],
  "sign-dream": [/\bcows?\b|dream/i, /dream|seven|ears|grain|lean|fat|rain/i],
  "sign-cave": [/cave|sleep|slept|asleep|young men/i, /sun|sleep|slept|dog|youth|young|years|centuries|mercy|sign/i],
  "sign-elephant": [/elephant|Abrahah?|Ababil|Sijjil|105:\d|bird/i, /Ka'?bah|bird|stone|Makkah|army|straw|Fil\b|sign|Abrahah?/i],
  "sign-journeys": [/journey|caravan|travel|Quraysh|hunger|fear/i, /winter|summer|hunger|fed|food|safe|safety|House/i],
  "sign-tur": [/fire|Tuwa|valley|bush|snake/i, /Musa|mount|Tur|valley|bush|tree|snake|sandals|shoes/i],
  "sign-staff": [/staff|stick|rope/i, /swallow|magic|sorcer|trick|rope/i],
  "sign-khidr": [/Khidr|two seas|fish|boat|wall/i, /Musa|sea|fish|boat|wall|treasure|orphan|knowledge/i],
  "sign-barrier": [/barrier|wall/i, /Dhul-Qarnayn|mountain|iron|copper|Ya'?juj/i],
  "sign-yunus": [/Yunus|Dhun-Nun|fish|whale|gourd/i, /fish|whale|ship|dark|gourd|shore|believed|town/i],
  "sign-maryam": [/palm|far/i, /Maryam/i],
  "sign-dawud": [/Dawud/i, /mountain|bird|iron|armou?r|mail/i],
  "sign-house": [/House|Ka'?bah|valley|Hajj/i, /Ibrahim|Isma'?il|foundation|crops|Hajj|camel|raise|built|build/i],
  "sign-zamzam": [/Safa|Marwa|Zamzam/i, /Hajar|water|seven|sa'?i|Jurhum|sign|symbol/i],
  "sign-throne": [/throne|glass|palace/i, /Saba|Sulayman|queen|favou?r/i],
  "sign-mihrab": [/Zakariyya|Maryam/i, /mihrab|prayer room|provision|food|from Allah|good child/i],
  "sign-cool-fire": [/fire/i, /Ibrahim|furnace|cool|safe/i],
  "sign-ad-wind": [/(^|[\s(])'?Ad\b|Hud/, /wind|cloud|tower|monument|landmark|seven nights|sand ?dune|sandhill/i],
  "sign-river": [/Musa|baby/i, /river|Nile|chest|box|nurse|palace|sister|mother|Pharaoh|Fir'awn/i],
  "sign-qarun": [/Qarun/i, /treasure|keys|wealth|riches|swallow|earth|finery|boast|exult/i],
  "sign-madyan": [/Musa/i, /Madyan|well|water|flock|shade|in need|watered/i],
  "sign-ayyub": [/Ayyub/i, /harm|hardship|illness|patien|spring|strike|water|locust|servant|merciful|distress|trial/i],
  "sign-yusuf-dream": [/Yusuf/i, /dream|stars?\b|sun\b|moon|bow/i],
  "sign-measure": [/measure|weigh|balance|scales?\b/i, /full|fair|just|less|cheat|short|woe|straight|honest|extra|more/i],
  "sign-ram": [/Ibrahim|\bfather\b|\bson\b/i, /dream|\bram\b|ransom|sacrific|submit|test|command/i],
  "sign-qiblah": [/qiblah?\b|Ka'?a?bah|al-Masjid al-Haram|Sacred Mosque|Jerusalem/i, /turn|fac(e|ing)|chang|sky/i],
  "sign-saba": [/Saba|Ma'?a?rib|\b34:1[5-9]\b/i, /garden|dam\b|flood|grateful|thank|scatter|journey|requite/i],
  "sign-cow": [/\bcow\b/i, /sacrific|yellow|\bold\b|young|questions?|colou?r/i],
  "sign-overturned": [
    /\bLut\b|overturn|upside down|turned the town over|\b(11:8[1-3]|15:7[3-6]|29:3[3-5]|37:13[3-8]|51:3[2-7]|53:5[34]|54:3[3-8])\b/i,
    /stone|clay|Sijjil|night|morning|dawn|sunrise|sign|ruin|road|saved|destroy|turned|overturn|upside down|punish|torment|sky/i
  ],
  "sign-five-signs": [/flood|locust|lice|frog|blood|drought|\bsigns?\b|\b(7:13[0-5]|43:(4[6-9]|50))\b/i, /Fir'?awn|Pharaoh|torment|promise|word|covenant/i],
  "sign-sabbath": [/Sabbath/i, /fish|sea|test/i],
  "sign-west-east": [/Dhul-Qarnayn|\b18:(8[3-9]|9[01])\b/i, /means|west|east|sun|set|ris/i],
  "sign-four-birds": [/\bbirds?\b/i, /Ibrahim|four|life|dead|call/i],
  "sign-hundred-years": [/hundred years|\b2:259\b/i, /dead|life|lives|food|drink|donkey|bones|able|town/i],
  "sign-shirt": [/shirt|scent/i, /Yusuf|Ya'?qub|sight|caravan|father/i],
  "sign-guests": [/guests?|calf|angels?|Salam|Ishaq/i, /Ibrahim|Sarah|wife|\bson\b|child|Ishaq|Ya'?qub|greet|food|fear|news/i],
  "sign-forgiveness": [/forgiv|istighfar/i, /Nuh|Hud|rain|wealth|garden|river|strength/i],
  "sign-wind": [/\bwind\b|family of Dawud/i, /Sulayman|Solomon|month's journey|gently|thank|grateful/i],
  "sign-pillars": [/Iram|pillars|Thamud|Fir'?awn|Pharaoh|\b89:([6-9]|1[0-4])\b/i, /pillar|rock|valley|stakes|corrupt|scourge|watchful|punish/i],
  "sign-cup": [/\bcup\b|measure|\bbags?\b/i, /Yusuf|brother|Binyamin|caravan|thie/i],
  "sign-clay-bird": [/\bclay\b|\bbirds?\b/i, /\bIsa\b|Jesus/i],
  "sign-storm": [/\bfire\b|storm|rain|lightning|thunder/i, /hypocri|light|dark|parable|example/i],
  "sign-zakat": [/zakat|zakah/i, /camels?|silver|crops?|rain|nisab|percent|tenth|forty|threshold/i],
  "sign-yemen": [/Yemen|Mu'?adh/i, /zakat|prayers?|shahadah|Tawhid|testimony|rich|poor/i],
  "sign-bayruha": [/Bayruha|3:92|what (you|we) love|Abu Talhah/i, /garden|give|gave|spend|love|charity|goodness|righteousness|birr/i],
  "sign-fitr": [/zakat al-Fitr/i, /sa'|dates|barley|food|Eid|prayer|poor/i],
  "sign-eid": [/\bEid\b/i, /prayer|dates|musalla|khutbah|spear|road|way|recit|come out/i],
  "sign-thirsty-dog": [/\bdog\b/i, /thirst|water|shoe|well/i],
  "sign-thorny-branch": [/thorn|harm/i, /road|path|way/i],
  "sign-planting": [/plant|sows?\b|seed/i, /eats?\b|bird|animal/i],
  "sign-waqf": [/waqf|endowment|Khaybar/i, /land|fruit|keeper|sold|store/i],
  "sign-permission": [/permission|three times|knock|Abu Musa/i, /go back|went back|\bleft\b|witness|door|answer/i],
  "sign-adhan": [/adhan|iqamah|call to prayer|walk (calmly )?to (the )?prayer/i, /Bilal|guess|calm|rush|walk|bell|horn|mu'adhdhin|call/i],
  "sign-wet-grain": [/wet|cheat|deceiv/i, /grain|heap|food|rain|top|sell/i],
  "sign-rumah": [/Rumah|\bwells?\b|army|Tabuk/i, /Uthman/i],
  "sign-river-at-the-door": [/river|bath/i, /five (daily )?prayers|five times/i],
  "sign-tabuk": [/Ka'b|Tabuk|three who|stayed behind|left behind/i, /truth|delay|absent|fifty|letter|be happy|good news|forg|repent|stronger/i],
  "sign-thawr": [/cave|Thawr|Hijrah|emigrat/i, /Abu Bakr|two|belt|camels|grieve|third|guide/i],
  "sign-plague": [/plague|sickness/i, /Sham|Umar|decree|go back|flee/i],
  "sign-building": [/building|bricks?|wall/i, /believers?/i],
  "sign-mercy": [/mercy|mercies/i, /hundred|ninety-nine|parts of mercy/i],
  "sign-sanctuary": [/halal/i, /doubtful|unclear|in between/i],
  "sign-musk": [/musk/i, /bellows|blacksmith/i],
  "sign-shared-ship": [/ship|boat/i, /hole|deck|drown/i],
  "sign-shut-cave": [/cave/i, /rock/i],
  "sign-log-at-sea": [/thousand dinars/i, /wood|sea/i],
  "sign-tied-camels": [/camels?/i, /Quran/i],
  "sign-traveler": [/travell?er|rider/i, /world/i],
  "sign-citron": [/citron/i, /recit|Quran/i],
  "sign-forgiving-trader": [/forg[ia]v|let (them|him) off/i, /debt|lend|trader|merchant/i],
  "sign-hungry-birds": [/birds?/i, /hungry|empty|full|provi/i],
  "sign-two-flocks": [/sheep/i, /flocks?/i],
  "sign-bending-plant": [/plant/i, /wind|bend/i],
  "sign-remember": [/remember|dhikr/i, /living|alive|life|dead/i]
};

const SOURCES: Record<string, string[]> = {
  "sign-rain": ["Quran 35:9", "Quran 7:57"],
  "sign-clouds": ["Quran 24:43", "Quran 30:48"],
  "sign-fade": ["Quran 57:20", "Quran 18:45"],
  "sign-seed": ["Quran 2:261"],
  "sign-seas": ["Quran 25:53", "Quran 55:19", "Quran 55:20"],
  "sign-ships": ["Quran 22:65", "Quran 42:32", "Quran 45:12"],
  "sign-mountains": ["Quran 78:6", "Quran 78:7", "Quran 16:15"],
  "sign-bee": ["Quran 16:68", "Quran 16:69"],
  "sign-spider": ["Quran 29:41"],
  "sign-tree": ["Quran 14:24", "Quran 14:25", "Sahih al-Bukhari 4698"],
  "sign-look": ["Quran 88:17", "Quran 88:18", "Quran 88:19", "Quran 88:20"],
  "sign-birds": ["Quran 67:19", "Quran 16:79", "Quran 24:41"],
  "sign-sow": ["Quran 56:63", "Quran 56:64"],
  "sign-water": ["Quran 56:68", "Quran 56:69", "Quran 56:70"],
  "sign-fire": ["Quran 56:71", "Quran 56:72", "Quran 56:73", "Quran 36:80"],
  "sign-shade": ["Quran 25:45", "Quran 25:46"],
  "sign-foam": ["Quran 13:17"],
  "sign-lands": ["Quran 7:58", "Sahih al-Bukhari 79"],
  "sign-ashes": ["Quran 14:18"],
  "sign-garden": ["Quran 68:17", "Quran 68:19", "Quran 68:20", "Quran 68:24"],
  "sign-two-gardens": ["Quran 18:32", "Quran 18:33", "Quran 18:35", "Quran 18:42"],
  "sign-ark": ["Quran 11:37", "Quran 11:40", "Quran 11:42", "Quran 11:44", "Quran 54:11", "Quran 54:12", "Quran 54:13"],
  "sign-sea": ["Quran 26:61", "Quran 26:63", "Quran 20:77", "Sahih al-Bukhari 2004"],
  "sign-springs": ["Quran 2:57", "Quran 2:60", "Quran 7:160"],
  "sign-she-camel": ["Quran 26:149", "Quran 26:155", "Quran 26:156", "Quran 91:13"],
  "sign-ants": ["Quran 27:18", "Quran 27:19"],
  "sign-hoopoe": ["Quran 27:20", "Quran 27:22", "Quran 27:23", "Quran 27:28"],
  "sign-dream": ["Quran 12:43", "Quran 12:47", "Quran 12:48", "Quran 12:49"],
  "sign-cave": ["Quran 18:10", "Quran 18:11", "Quran 18:17", "Quran 18:18"],
  "sign-elephant": ["Quran 105:1", "Quran 105:2", "Quran 105:3", "Quran 105:4", "Quran 105:5", "Sahih al-Bukhari 2731"],
  "sign-journeys": ["Quran 106:1", "Quran 106:2", "Quran 106:3", "Quran 106:4"],
  "sign-tur": ["Quran 20:10", "Quran 20:12", "Quran 20:20", "Quran 27:7", "Quran 28:29", "Quran 28:30"],
  "sign-staff": ["Quran 7:117", "Quran 7:118", "Quran 20:66", "Quran 26:44", "Quran 26:45"],
  "sign-khidr": ["Quran 18:60", "Quran 18:61", "Quran 18:63", "Quran 18:71", "Quran 18:77", "Quran 18:79", "Quran 18:82"],
  "sign-barrier": ["Quran 18:93", "Quran 18:94", "Quran 18:96", "Quran 18:97"],
  "sign-yunus": ["Quran 37:140", "Quran 37:142", "Quran 21:87", "Quran 21:88", "Quran 37:145", "Quran 37:146", "Quran 37:147", "Quran 37:148"],
  "sign-maryam": ["Quran 19:22", "Quran 19:23", "Quran 19:24", "Quran 19:25", "Quran 19:26"],
  "sign-dawud": ["Quran 21:79", "Quran 21:80", "Quran 34:10", "Quran 34:11", "Quran 38:18", "Quran 38:19"],
  "sign-house": ["Quran 14:37", "Quran 2:127", "Quran 22:26", "Quran 22:27"],
  "sign-zamzam": ["Quran 2:158", "Sahih al-Bukhari 3364"],
  "sign-throne": ["Quran 27:38", "Quran 27:40", "Quran 27:41", "Quran 27:44"],
  "sign-mihrab": ["Quran 3:37", "Quran 3:38"],
  "sign-cool-fire": ["Quran 21:68", "Quran 21:69", "Quran 21:70", "Quran 37:97"],
  "sign-ad-wind": ["Quran 26:128", "Quran 46:24", "Quran 69:7", "Quran 46:25", "Sahih al-Bukhari 1035"],
  "sign-river": ["Quran 20:39", "Quran 28:7", "Quran 28:10", "Quran 28:11", "Quran 28:8", "Quran 28:9", "Quran 28:13"],
  "sign-qarun": ["Quran 28:76", "Quran 28:78", "Quran 28:79", "Quran 28:81"],
  "sign-madyan": ["Quran 28:23", "Quran 28:24"],
  "sign-ayyub": ["Quran 21:83", "Quran 21:84", "Quran 38:42", "Sahih al-Bukhari 279", "Quran 38:44"],
  "sign-yusuf-dream": ["Quran 12:4", "Quran 12:5", "Quran 12:100"],
  "sign-measure": ["Quran 83:1", "Quran 83:2", "Quran 83:3", "Quran 26:181", "Quran 26:182", "Quran 17:35"],
  "sign-ram": ["Quran 37:102", "Quran 37:103", "Quran 37:104", "Quran 37:105", "Quran 37:106", "Quran 37:107"],
  "sign-qiblah": ["Sahih al-Bukhari 40", "Quran 2:144", "Quran 2:142"],
  "sign-saba": ["Quran 34:15", "Quran 34:16", "Quran 34:19"],
  "sign-cow": ["Quran 2:67", "Quran 2:68", "Quran 2:69", "Quran 2:71"],
  "sign-overturned": ["Quran 11:81", "Quran 11:82", "Quran 11:83", "Quran 29:35"],
  "sign-five-signs": ["Quran 7:130", "Quran 7:133", "Quran 7:135", "Quran 43:50"],
  "sign-sabbath": ["Quran 7:163"],
  "sign-west-east": ["Quran 18:84", "Quran 18:85", "Quran 18:86", "Quran 18:89", "Quran 18:90"],
  "sign-four-birds": ["Quran 2:260"],
  "sign-hundred-years": ["Quran 2:259"],
  "sign-shirt": ["Quran 12:93", "Quran 12:94", "Quran 12:96"],
  "sign-guests": ["Quran 11:69", "Quran 51:26", "Quran 51:27", "Quran 51:28", "Quran 11:70", "Quran 11:71"],
  "sign-forgiveness": ["Quran 71:10", "Quran 71:11", "Quran 71:12", "Quran 11:52"],
  "sign-wind": ["Quran 34:12", "Quran 21:81", "Quran 38:36", "Quran 34:13"],
  "sign-pillars": ["Quran 89:6", "Quran 89:7", "Quran 89:9", "Quran 89:10", "Quran 89:12", "Quran 89:13", "Quran 89:14"],
  "sign-cup": ["Quran 12:70", "Quran 12:72", "Quran 12:76"],
  "sign-clay-bird": ["Quran 3:49", "Quran 5:110"],
  "sign-storm": ["Quran 2:17", "Quran 2:19", "Quran 2:20"],
  "sign-zakat": ["Sahih al-Bukhari 1459", "Sahih al-Bukhari 1454", "Sahih Muslim 981"],
  "sign-yemen": ["Sahih al-Bukhari 1395", "Sahih al-Bukhari 1496"],
  "sign-bayruha": ["Quran 3:92", "Sahih al-Bukhari 1461"],
  "sign-fitr": ["Sahih al-Bukhari 1503", "Sahih al-Bukhari 1506"],
  "sign-eid": ["Sahih al-Bukhari 953", "Sahih al-Bukhari 494", "Sahih al-Bukhari 956", "Sahih al-Bukhari 986"],
  "sign-thirsty-dog": ["Sahih al-Bukhari 2363", "Sahih al-Bukhari 2466"],
  "sign-thorny-branch": ["Sahih al-Bukhari 652", "Sahih al-Bukhari 2989"],
  "sign-planting": ["Sahih al-Bukhari 2320", "Sahih al-Bukhari 6012"],
  "sign-waqf": ["Sahih al-Bukhari 2737", "Sahih al-Bukhari 2777"],
  "sign-permission": ["Sahih al-Bukhari 6245"],
  "sign-adhan": ["Sahih al-Bukhari 604", "Sahih al-Bukhari 636"],
  "sign-wet-grain": ["Sahih Muslim 102"],
  "sign-rumah": ["Sahih al-Bukhari 2778"],
  "sign-river-at-the-door": ["Sahih al-Bukhari 528"],
  "sign-tabuk": ["Sahih al-Bukhari 4418", "Quran 9:118"],
  "sign-thawr": ["Sahih al-Bukhari 3905", "Sahih al-Bukhari 3653"],
  "sign-plague": ["Sahih al-Bukhari 5729"],
  "sign-building": ["Sahih al-Bukhari 481", "Sahih al-Bukhari 6026"],
  "sign-mercy": ["Sahih al-Bukhari 6000", "Sahih al-Bukhari 6469"],
  "sign-sanctuary": ["Sahih al-Bukhari 52"],
  "sign-musk": ["Sahih al-Bukhari 5534"],
  "sign-shared-ship": ["Sahih al-Bukhari 2493"],
  "sign-shut-cave": ["Sahih al-Bukhari 2272"],
  "sign-log-at-sea": ["Sahih al-Bukhari 2291"],
  "sign-tied-camels": ["Sahih al-Bukhari 5031", "Sahih al-Bukhari 5033"],
  "sign-traveler": ["Sahih al-Bukhari 6416", "Jami at-Tirmidhi 2377"],
  "sign-citron": ["Sahih al-Bukhari 5020"],
  "sign-forgiving-trader": ["Sahih al-Bukhari 2078"],
  "sign-hungry-birds": ["Jami at-Tirmidhi 2344"],
  "sign-two-flocks": ["Sahih Muslim 2784"],
  "sign-bending-plant": ["Sahih al-Bukhari 5644"],
  "sign-remember": ["Sahih al-Bukhari 6407"]
};

const part = (kind: SignKind, name: string): SignPart => {
  const found = signArt(kind).parts.find((each) => each.name === name);
  if (!found) throw new Error(`${kind} has no ${name}`);
  return found;
};
/** A part's keyed value at `t` of its story (or `rest` when it has no such key). */
const value = (kind: SignKind, name: string, key: "opacity" | "x" | "y" | "scale" | "scaleX" | "scaleY" | "rotate", t: number, rest = key === "x" || key === "y" || key === "rotate" ? 0 : 1) => {
  const keys = part(kind, name).keys;
  const values = keys?.[key];
  return keys && values ? keyAt(keys.at, values, t) : rest;
};
const shown = (kind: SignKind, name: string, t: number) => value(kind, name, "opacity", t);
const wordAt = (kind: SignKind, t: number) => signArt(kind).words.find((word) => t >= word.from && t <= word.to)?.text;

describe("the signs in creation, alive", () => {
  afterEach(() => {
    setActiveLanguage("en");
    jest.useRealTimers();
  });

  test("every lesson with a scene is a real lesson about its sign, and opens on it", () => {
    expect(Object.keys(SIGN_LESSONS).length).toBe(644);
    for (const [nodeId, id] of Object.entries(SIGN_LESSONS)) {
      const lesson = LESSONS_BY_ID[`lesson-${nodeId}`] as Lesson | undefined;
      expect([nodeId, Boolean(lesson)]).toEqual([nodeId, true]);
      const found = signForLesson(lesson!)!;
      expect([nodeId, found?.scene.id, found?.lessonSlug]).toEqual([nodeId, id, nodeId]);
      const text = lessonText(lesson!);
      for (const about of ABOUT[id]) expect([nodeId, id, String(about), about.test(text)]).toEqual([nodeId, id, String(about), true]);
      // No other picture takes its place: no map, no day's sky, no moon's sky, and no surah's own cover.
      expect([nodeId, journeyForLesson(lesson!), hajjMapForLesson(lesson!), nodeId in DAY_SKY_LESSONS, nodeId in MOON_LESSONS, surahNumberForTitle(lesson!.title)]).toEqual([
        nodeId,
        undefined,
        undefined,
        false,
        false,
        undefined
      ]);
    }
    // Every scene has its lessons; the others keep their photo.
    const used = new Set(Object.values(SIGN_LESSONS));
    for (const each of SIGN_SCENES) expect([each.id, used.has(each.id)]).toEqual([each.id, true]);
    expect(signForLesson({ nodeId: "deep-qamar1-the-moon-split" })).toBeUndefined();
    expect(signForLesson({ nodeId: "prayer-times-fajr" })).toBeUndefined();
  });

  test("every scene says where it comes from: the ayahs it shows, and a sahih hadith the course teaches", () => {
    expect(Object.fromEntries(SIGN_SCENES.map((each) => [each.id, each.sources.map((source) => source.reference)]))).toEqual(SOURCES);
    const taught = new Set((Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lessonSources(lesson).map((source) => source.url.split("#")[0])));
    for (const each of SIGN_SCENES) {
      for (const source of each.sources) {
        const match = /^(Sahih al-Bukhari|Sahih Muslim|Jami at-Tirmidhi|Quran) (\S+)$/.exec(source.reference);
        expect([source.reference, Boolean(match)]).toEqual([source.reference, true]);
        const [, book, number] = match!;
        if (book === "Quran") expect(source.url).toBe(`https://quran.com/${number.replace(":", "/")}`);
        else {
          const collection = book === "Sahih Muslim" ? "muslim" : book === "Jami at-Tirmidhi" ? "tirmidhi" : "bukhari";
          expect(source.url).toBe(`https://sunnah.com/${collection}:${number}`);
          expect([source.reference, taught.has(source.url)]).toEqual([source.reference, true]);
        }
      }
    }
    // The date palm is the tree he ﷺ likened to the Muslim, as the lesson on it teaches.
    const palm = LESSONS_BY_ID["lesson-deep-ibrahim3-the-date-palm"] as Lesson;
    expect(lessonSources(palm).some((source) => source.url.split("#")[0] === "https://sunnah.com/bukhari:4698")).toBe(true);
  });

  test("every scene is drawn to play once and keep moving: keys in order, words one at a time, nothing that is not land, sky, sea, plant, animal or thing", () => {
    expect(Object.keys(SIGN_ART).sort()).toEqual([...new Set(SIGN_SCENES.map((each) => each.kind))].sort());
    for (const kind of Object.keys(SIGN_ART) as SignKind[]) {
      const art = signArt(kind);
      expect(art.kind).toBe(kind);
      expect([kind, art.ms >= 6000 && art.ms <= 12000]).toEqual([kind, true]);
      // Something always moves on its own: rain, waves, wind, a sway or a bee.
      expect([kind, art.parts.some((each) => each.loop)]).toEqual([kind, true]);
      for (const each of art.parts) {
        const where = `${kind} ${each.name}`;
        // Drawn shapes only: no words, pictures or links inside the drawing.
        expect([where, /<text|<image|href=|<script|<foreignObject/i.test(each.svg)]).toEqual([where, false]);
        expect([where, each.svg.length > 0]).toEqual([where, true]);
        if (each.keys) {
          const { at, ...values } = each.keys;
          expect([where, at[0] >= 0 && at[at.length - 1] <= 1 && at.every((time, index) => index === 0 || time > at[index - 1])]).toEqual([where, true]);
          for (const [key, list] of Object.entries(values)) expect([where, key, list?.length]).toEqual([where, key, at.length]);
        }
        if (each.loop) expect([where, each.loop.ms >= 400 && each.loop.ms <= 12000]).toEqual([where, true]);
        if (each.origin) expect([where, each.origin.x >= 0 && each.origin.x <= SIGN_BOX.width && each.origin.y >= 0 && each.origin.y <= SIGN_BOX.height]).toEqual([where, true]);
        if (each.clip) expect([where, each.clip.x >= 0 && each.clip.y >= 0 && each.clip.x + each.clip.w <= SIGN_BOX.width && each.clip.y + each.clip.h <= SIGN_BOX.height]).toEqual([where, true]);
      }
      // The words come one at a time, each long enough to read, the last one staying at the end.
      const { words } = art;
      expect([kind, words.length >= 2, words[0].from <= 0.15, words[words.length - 1].to]).toEqual([kind, true, true, 1]);
      words.forEach((word, index) => {
        expect([kind, word.text, word.from < word.to, word.to - word.from >= 0.1]).toEqual([kind, word.text, true, true]);
        if (index > 0) expect([kind, word.text, word.from >= words[index - 1].to]).toEqual([kind, word.text, true]);
      });
    }
  });

  test("each scene shows what its ayahs say, in their order", () => {
    // Rain on a dead land: dry and cracked, the winds drive the clouds in, the rain falls, and the land comes to life.
    expect([shown("rain", "cracks", 0), shown("rain", "dead twigs", 0), shown("rain", "green ground", 0), shown("rain", "rain", 0)]).toEqual([1, 1, 0, 0]);
    expect(value("rain", "rain clouds", "x", 0)).toBeLessThanOrEqual(-SIGN_BOX.width);
    expect([shown("rain", "winds", 0.2), value("rain", "rain clouds", "x", 0.45), shown("rain", "rain", 0.45)]).toEqual([1, 0, 1]);
    expect([shown("rain", "cracks", 1), shown("rain", "green ground", 1), shown("rain", "green hills", 1), shown("rain", "rain", 1), value("rain", "flowers", "scaleY", 1)]).toEqual([0, 1, 1, 0, 1]);
    expect(value("rain", "rain clouds", "x", 1)).toBeGreaterThanOrEqual(SIGN_BOX.width);
    expect([wordAt("rain", 0.1), wordAt("rain", 0.45), wordAt("rain", 1)]).toEqual(["A dead land", "The rain falls", "The land comes to life"]);

    // The clouds: four small ones driven together, piled up into one, and the rain from within it.
    const small = ["cloud 1", "cloud 2", "cloud 3", "cloud 4"];
    expect(small.map((name) => shown("clouds", name, 0))).toEqual([1, 1, 1, 1]);
    expect(small.map((name) => shown("clouds", name, 1))).toEqual([0, 0, 0, 0]);
    expect([value("clouds", "heap", "scale", 0.3), value("clouds", "heap", "scale", 1), shown("clouds", "rain", 0.5), shown("clouds", "rain", 1)]).toEqual([0, 1, 0, 1]);
    // The rain falls only from under the great cloud.
    const clip = part("clouds", "rain").clip!;
    expect(clip.x >= 40 && clip.x + clip.w <= 130 && clip.y >= 56).toBe(true);
    expect([wordAt("clouds", 0.2), wordAt("clouds", 0.4), wordAt("clouds", 0.5), wordAt("clouds", 1)]).toEqual(["Allah drives the clouds", "He brings them together", "He piles them up", "Rain comes out from within"]);

    // Green, then yellow, then broken straw, then scattered by the winds.
    const crops = (t: number) => ["green crops", "yellow crops", "broken straw"].map((name) => shown("fade", name, t));
    expect([crops(0.3), crops(0.6), crops(0.75), crops(1)]).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0]
    ]);
    expect([shown("fade", "straw blown away", 0.85), shown("fade", "winds", 0.85)]).toEqual([1, 1]);

    // One seed, seven ears, ripe at the end.
    const ears = signArt("seed").parts.filter((each) => /^green ear \d$/.test(each.name));
    expect(ears.length).toBe(7);
    expect(ears.map((each) => (each.svg.match(/<ellipse/g) ?? []).length)).toEqual([1, 1, 1, 1, 1, 1, 1]);
    expect((part("seed", "ripe ears").svg.match(/<ellipse/g) ?? []).length).toBe(7);
    expect([value("seed", "seed", "scale", 0.1), shown("seed", "ripe ears", 0.5), shown("seed", "ripe ears", 1)]).toEqual([1, 0, 1]);

    // Two seas, sweet and salty, and the barrier between them; fish in each.
    expect([shown("seas", "barrier", 0.1), shown("seas", "barrier", 1), shown("seas", "river fish", 1), shown("seas", "sea fish", 1)]).toEqual([0, 1, 1, 1]);

    // Ships on the sea, the tall one sailing in.
    expect([value("ships", "tall ship", "x", 0) < -SIGN_BOX.width / 2, value("ships", "tall ship", "x", 0.4)]).toEqual([true, 0]);

    // The earth spread out, then three mountains set on it, then the tent's pegs.
    expect([value("mountains", "the earth", "scaleX", 0.05) < 0.2, value("mountains", "the earth", "scaleX", 0.3)]).toEqual([true, 1]);
    for (const name of ["mountain 1", "mountain 2", "mountain 3"]) expect([name, shown("mountains", name, 0.28), value("mountains", name, "y", 0.6), shown("mountains", name, 1)]).toEqual([name, 0, 0, 1]);
    expect([shown("mountains", "pegs", 0.5), shown("mountains", "pegs", 1), wordAt("mountains", 0.7)]).toEqual([0, 1, "Like pegs"]);

    // The bees fly out to the flowers and home again; honey of three colors drips from the comb.
    for (const name of ["bee 1", "bee 2", "bee 3"]) {
      const keys = part("bee", name).keys!;
      expect([name, keys.x![1], keys.x![keys.x!.length - 1], Math.max(...keys.x!) > 15]).toEqual([name, 0, 0, true]);
    }
    const honey = ["golden honey", "amber honey", "dark honey"];
    expect(honey.map((name) => shown("bee", name, 0.5))).toEqual([0, 0, 0]);
    expect(honey.map((name) => shown("bee", name, 1))).toEqual([1, 1, 1]);
    expect(new Set(honey.map((name) => /fill="(#[0-9A-F]{6})"/i.exec(part("bee", name).svg)?.[1])).size).toBe(3);

    // The spider builds its web, and a breath of wind shakes it.
    expect([shown("spider", "web", 0.05), shown("spider", "web", 0.5), value("spider", "spider", "y", 1)]).toEqual([0, 1, 0]);
    expect([shown("spider", "winds", 0.7), wordAt("spider", 0.7)]).toEqual([1, "The weakest of houses"]);

    // The good tree: its root first, then its trunk and branches up into the sky, then its fruit.
    expect([value("tree", "roots", "scale", 0.26), value("tree", "palm", "scale", 0.26), value("tree", "palm", "scale", 0.55), shown("tree", "dates", 0.55), shown("tree", "dates", 1)]).toEqual([1, 0, 1, 0, 1]);

    // The camels, the sky, the mountains and the earth: each shown while its words are.
    const look: [string, () => boolean][] = [
      ["The camels, how they were created", () => value("look", "camel", "x", 0.25) === 0 && value("look", "camel behind", "x", 0.25) === 0],
      ["The sky, how it was raised", () => shown("look", "sky raised high", 0.2) === 0 && value("look", "sky raised high", "y", 0.47) === 0],
      ["The mountains, how they were set firm", () => shown("look", "mountains", 0.45) === 0 && value("look", "mountains", "y", 0.67) === 0],
      ["The earth, how it was spread out", () => shown("look", "ripple 1", 0.72) === 1]
    ];
    expect(signArt("look").words.map((word) => word.text)).toEqual(look.map(([text]) => text));
    for (const [text, check] of look) expect([text, check()]).toEqual([text, true]);

    // The birds rise into the sky beating their wings, glide with them spread, fold them in, and are held up at the end.
    for (const bird of ["swallow", "small swallow"]) {
      const beats = part("birds", `${bird} right wing`).keys!;
      const early = beats.rotate!.filter((_, index) => beats.at[index] <= 0.24);
      const turns = early.filter((angle, index) => index > 0 && Math.sign(angle) !== Math.sign(early[index - 1]) && angle !== 0).length;
      expect([bird, turns >= 8]).toEqual([bird, true]);
      expect([value("birds", `${bird} right wing`, "rotate", 0.42), value("birds", `${bird} right wing`, "scaleX", 0.42)]).toEqual([-8, 1]);
      expect([value("birds", `${bird} right wing`, "rotate", 0.59) > 30, value("birds", `${bird} right wing`, "scaleX", 0.59) < 0.5]).toEqual([true, true]);
      expect([value("birds", `${bird} left wing`, "rotate", 0.59) < -30, value("birds", `${bird} right wing`, "rotate", 1), value("birds", `${bird} right wing`, "scaleX", 1)]).toEqual([true, -8, 1]);
      // Its body and wings go together.
      for (const t of [0.1, 0.3, 0.6, 0.9]) {
        const at = (name: string) => [value("birds", name, "x", t), value("birds", name, "y", t)];
        expect([bird, t, at(`${bird} left wing`), at(`${bird} right wing`)]).toEqual([bird, t, at(bird), at(bird)]);
      }
      expect([value("birds", bird, "y", 0) > 50, Math.abs(value("birds", bird, "y", 1)) <= 5]).toEqual([true, true]);
    }
    expect([wordAt("birds", 0.42), wordAt("birds", 0.62), wordAt("birds", 1)]).toEqual(["Their wings spread", "And folded in", "None holds them up but the Most Merciful"]);

    // The seed sown: thrown onto the furrows, covered with earth, then shoots, then wheat with its ears.
    expect([shown("sow", "near seeds", 0.02), shown("sow", "near seeds", 0.3), value("sow", "near seeds", "scale", 0.3), shown("sow", "near seeds", 0.45)]).toEqual([0, 1, 1, 0]);
    expect([shown("sow", "earth over the seeds", 0.3), shown("sow", "earth over the seeds", 0.45), value("sow", "near shoots", "scaleY", 0.4), value("sow", "near shoots", "scaleY", 0.6)]).toEqual([0, 1, 0, 1]);
    expect([value("sow", "near wheat", "scaleY", 0.6), value("sow", "near wheat", "scaleY", 0.85), shown("sow", "ears", 0.7), shown("sow", "ears", 1)]).toEqual([0, 1, 0, 1]);
    expect([wordAt("sow", 0.2), wordAt("sow", 0.5), wordAt("sow", 1)]).toEqual(["The seed you sow", "Who makes it grow?", "Allah makes it grow"]);

    // The water: rain from the clouds fills the pool, then the land turns green and a camel comes to drink.
    expect([shown("water", "rain", 0.1), shown("water", "rain", 0.45), shown("water", "rain", 1)]).toEqual([0, 1, 0]);
    expect([value("water", "pool", "scale", 0.1) < 1, value("water", "pool", "scale", 1), value("water", "camel", "x", 0.5) <= -100, value("water", "camel", "x", 1)]).toEqual([true, 1, true, 0]);
    expect([value("water", "grass and flowers", "scaleY", 0.5), value("water", "grass and flowers", "scaleY", 1), wordAt("water", 0.45), wordAt("water", 0.65)]).toEqual([
      0,
      1,
      "Down from the clouds",
      "Sweet, not salty"
    ]);

    // The fire: a green branch rubbed on another sparks, the fire grows, the green tree it came from shows, and the
    // travelers by their tent are lit by it.
    const rubs = part("fire", "rubbing branch").keys!;
    expect(new Set(rubs.x!.filter((_, index) => rubs.at[index] >= 0.06 && rubs.at[index] <= 0.24)).size).toBe(2);
    expect([shown("fire", "sparks", 0.2), shown("fire", "rubbing branch", 0.4), value("fire", "fire", "scale", 0.2), value("fire", "fire", "scale", 0.5)]).toEqual([1, 0, 0, 1]);
    expect([shown("fire", "green tree", 0.2), shown("fire", "green tree", 0.45), shown("fire", "travelers in the firelight", 0.7), shown("fire", "travelers in the firelight", 1)]).toEqual([0, 1, 0, 1]);
    expect([wordAt("fire", 0.45), wordAt("fire", 1)]).toEqual(["From the green tree", "A gift for travelers"]);

    // The shade: the land in shade, the palm's shadow stretched out long as the sun comes up, then drawn in, little by
    // little, as the sun climbs.
    const stretch = (t: number) => value("shade", "palm's shadow", "scaleX", t);
    expect([shown("shade", "land in shade", 0), shown("shade", "land in shade", 0.4), stretch(0.05), stretch(0.35)]).toEqual([1, 0, 0, 1]);
    expect([stretch(0.66) < stretch(0.4), stretch(1) < stretch(0.66), stretch(1) > 0]).toEqual([true, true, true]);
    const sunY = (t: number) => value("shade", "sun", "y", t);
    expect([sunY(0), sunY(0.4) < 0, sunY(0.66) < sunY(0.4), sunY(1) < sunY(0.66)]).toEqual([0, true, true, true]);

    // The foam: rain fills the valleys, the big one's stream wider; foam rides the flood and the melted gold, then
    // passes away, and the clear water, the green bank and the shining gold remain.
    expect(part("foam", "streams").svg).toMatch(/stroke-width="7"[\s\S]*stroke-width="3"/);
    expect([shown("foam", "rain", 0.1), shown("foam", "rain", 0.5), value("foam", "streams", "scaleY", 0.2)]).toEqual([1, 0, 1]);
    for (const name of ["foam", "foam on the gold"]) {
      expect([name, shown("foam", name, 0.2), shown("foam", name, 0.4), shown("foam", name, 0.8), value("foam", name, "x", 0.6) > value("foam", name, "x", 0.4)]).toEqual([name, 0, 1, 0, true]);
    }
    expect([shown("foam", "clear water", 0.4), shown("foam", "clear water", 1), value("foam", "plants", "scaleY", 1), shown("foam", "gold shining", 1)]).toEqual([0, 1, 1, 1]);

    // The three lands, each in its turn: the good one grows grass, the hard one holds the water (a goat drinks), the
    // barren one keeps nothing; then all three together.
    const dimmed = (t: number) => ["good land dimmed", "hard land dimmed", "barren land dimmed"].map((name) => shown("lands", name, t));
    expect([dimmed(0.2), dimmed(0.42), dimmed(0.64), dimmed(0.86), dimmed(1)]).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
      [0, 0, 0]
    ]);
    expect([shown("lands", "rain", 0.15), shown("lands", "rain", 0.4), value("lands", "grass on the good land", "scaleY", 0.3), value("lands", "grass on the good land", "scaleY", 0.5)]).toEqual([1, 0, 0, 1]);
    expect([value("lands", "water held in the hard land", "scale", 0.35), value("lands", "water held in the hard land", "scale", 1), value("lands", "goat", "x", 0.5) < -50, value("lands", "goat", "x", 0.7)]).toEqual([
      1,
      1,
      true,
      0
    ]);
    expect(signArt("lands").words.map((word) => word.text)).toEqual(["Rain falls on three lands", "Good land grows grass", "Hard land holds water", "Barren land keeps nothing"]);

    // The ashes: a heap, then a stormy wind that blows it all away; standing still, the wind is blowing it.
    const puffs = signArt("ashes").parts.filter((each) => /^ash \d$/.test(each.name));
    expect(puffs.length).toBe(4);
    expect([value("ashes", "heap of ashes", "scaleY", 0.4), value("ashes", "heap of ashes", "scaleY", 1), shown("ashes", "stormy wind", 0.3), shown("ashes", "stormy wind", 0.6)]).toEqual([1, 0, 0, 1]);
    expect(puffs.map((each) => shown("ashes", each.name, 1))).toEqual([0, 0, 0, 0]);
    const still = signArt("ashes").stillAt!;
    expect([wordAt("ashes", still), puffs.some((each) => shown("ashes", each.name, still) === 1 && value("ashes", each.name, "x", still) > 0)]).toEqual(["A stormy wind blows", true]);

    // The garden: full of fruit by day, struck in the night, black and bare by the morning.
    expect([shown("garden", "fruit", 0.3), shown("garden", "trees", 0.3), shown("garden", "night", 0.2), shown("garden", "night", 0.5) > 0.5, shown("garden", "the blow by night", 0.5)]).toEqual([1, 1, 0, true, 1]);
    expect([shown("garden", "fruit", 0.7), shown("garden", "trees", 0.7), shown("garden", "burnt trees", 0.7), shown("garden", "burnt trees", 1), shown("garden", "night", 1)]).toEqual([0, 0, 1, 1, 0]);

    // The two gardens: grapes, then palms around and crops between, then the river; then the fruit gone and the vines
    // fallen on their trellises in a storm.
    expect([shown("twoGardens", "grapes", 0.3), value("twoGardens", "palms", "scaleY", 0.2), value("twoGardens", "palms", "scaleY", 0.45), value("twoGardens", "crops", "scaleY", 0.5)]).toEqual([1, 0, 1, 1]);
    expect([value("twoGardens", "river", "scaleY", 0.45), value("twoGardens", "river", "scaleY", 0.65), shown("twoGardens", "stormy sky", 0.6), shown("twoGardens", "stormy sky", 1)]).toEqual([0, 1, 0, 1]);
    expect([shown("twoGardens", "grapes", 1), value("twoGardens", "crops", "scaleY", 1) < 0.5, shown("twoGardens", "left vines", 1), shown("twoGardens", "left vines fallen", 1)]).toEqual([0, true, 0, 1]);
    expect([value("twoGardens", "left vines fallen", "rotate", 1) < 0, value("twoGardens", "right vines fallen", "rotate", 1) > 0]).toEqual([true, true]);
  });

  test("the stories' scenes show each moment in its order, and draw no Prophet and no person", () => {
    const stories: SignKind[] = ["ark", "sea", "springs", "sheCamel", "ants", "hoopoe", "dream", "cave", "elephant", "journeys"];
    for (const kind of stories) {
      for (const each of signArt(kind).parts) {
        expect([kind, each.name, /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|sleepers?|angels?|child|children|boy|girl|face)\b/i.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    // The ark: built plank by plank on dry land, the animals in by the ramp two by two, then the flood and the waves,
    // the ark afloat, and at the end at rest on al-Judi as the water goes down.
    expect([shown("ark", "keel planks", 0.02), shown("ark", "keel planks", 0.1), shown("ark", "house on the ark", 0.17), shown("ark", "ramp", 0.2)]).toEqual([0, 1, 1, 1]);
    for (const name of ["first camel", "second camel", "first sheep", "second sheep"]) {
      expect([name, value("ark", name, "x", 0.1) <= -60, shown("ark", name, 0.4)]).toEqual([name, true, 0]);
    }
    expect([value("ark", "first camel", "x", 0.25), value("ark", "second sheep", "x", 0.33)]).toEqual([0, 0]);
    expect([value("ark", "flood", "y", 0.3), value("ark", "flood", "y", 0.6), shown("ark", "pouring water", 0.45), value("ark", "springs", "scaleY", 0.5)]).toEqual([58, 0, 1, 1]);
    expect([shown("ark", "ark afloat", 0.6), value("ark", "ark afloat", "y", 0.6), shown("ark", "great waves", 0.64)]).toEqual([1, -30, 1]);
    expect([shown("ark", "ark afloat", 1), shown("ark", "ark on al-Judi", 1), value("ark", "flood", "y", 1), value("ark", "springs", "scaleY", 1), shown("ark", "pouring water", 1)]).toEqual([0, 1, 58, 0, 0]);
    expect(signArt("ark").words.map((word) => word.text)).toEqual(["Build the ark", "Of each kind, two", "The gates of the sky opened", "Waves like mountains", "It came to rest on al-Judi"]);

    // The sea: calm before them, then split, its walls risen like mountains on each side, and a dry path between.
    expect([shown("sea", "left wall of water", 0.2), shown("sea", "right wall of water", 0.2), shown("sea", "dry path", 0.2)]).toEqual([0, 0, 0]);
    expect([value("sea", "left wall of water", "scaleY", 0.5), value("sea", "right wall of water", "scaleY", 0.5), shown("sea", "dry path", 0.5), shown("sea", "foam on the crests", 0.6)]).toEqual([1, 1, 1, 1]);
    expect([wordAt("sea", 0.1), wordAt("sea", 0.3), wordAt("sea", 0.6), wordAt("sea", 1)]).toEqual(["The sea before them", "The sea split", "Each side like a great mountain", "A dry path through the sea"]);

    // The springs: the clouds come over, the manna falls and the quails come down, then twelve streams run from the
    // rock to twelve pools.
    expect([value("springs", "clouds", "x", 0) <= -SIGN_BOX.width, value("springs", "clouds", "x", 0.25), shown("springs", "quails", 0.2), value("springs", "quails", "x", 0.5)]).toEqual([true, 0, 0, 0]);
    expect([shown("springs", "manna falling", 0.36), value("springs", "twelve springs", "scale", 0.5), value("springs", "twelve springs", "scale", 0.7), value("springs", "twelve pools", "scaleY", 0.8)]).toEqual([
      1, 0, 1, 1
    ]);
    expect([(part("springs", "twelve springs").svg.match(/M/g) ?? []).length, (part("springs", "twelve pools").svg.match(/<ellipse/g) ?? []).length]).toEqual([12, 12]);

    // The she-camel: she comes and drinks the trough down on her day; by night it fills, and the people's jars come on theirs.
    expect([value("sheCamel", "she-camel drinking", "x", 0.2) >= 70, value("sheCamel", "she-camel drinking", "x", 0.5), value("sheCamel", "water in the trough", "scaleY", 0.68) < 0.5]).toEqual([true, 0, true]);
    expect([value("sheCamel", "water in the trough", "scaleY", 0.85), shown("sheCamel", "water jars", 0.6), shown("sheCamel", "water jars", 0.85), shown("sheCamel", "she-camel grazing", 0.9)]).toEqual([1, 0, 1, 1]);
    expect([wordAt("sheCamel", 0.5), wordAt("sheCamel", 0.7), wordAt("sheCamel", 1)]).toEqual(["Her day to drink", "Your day to drink", "Do not harm her"]);

    // The ants: the line at work, the ant's warning, all of them gone in before the army's dust passes.
    expect([shown("ants", "the ant who warned", 0.4), shown("ants", "her call", 0.4), shown("ants", "ants carrying seeds", 0.4), shown("ants", "ants carrying seeds", 0.6)]).toEqual([1, 1, 1, 0]);
    const hurrying = signArt("ants").parts.filter((each) => /^ant hurrying home \d$/.test(each.name));
    expect(hurrying.length).toBe(6);
    expect(hurrying.map((each) => [shown("ants", each.name, 0.45), shown("ants", each.name, 0.75)])).toEqual(hurrying.map(() => [0, 0]));
    expect([shown("ants", "the ant who warned", 0.8), shown("ants", "army's dust", 0.6), value("ants", "army's dust", "x", 0.8) > value("ants", "army's dust", "x", 0.5)]).toEqual([0, 1, true]);

    // The hoopoe: its place empty, then back from far off by Saba, then off again with the letter.
    expect([
      shown("hoopoe", "the hoopoe coming back", 0.1),
      shown("hoopoe", "the hoopoe coming back", 0.5),
      value("hoopoe", "the hoopoe coming back", "x", 0.5),
      shown("hoopoe", "the letter", 0.4),
      shown("hoopoe", "the letter", 0.6)
    ]).toEqual([0, 1, 0, 0, 1]);
    expect([value("hoopoe", "the hoopoe flying off", "x", 0.9), value("hoopoe", "the letter", "x", 0.9), shown("hoopoe", "the hoopoe flying off", 1), shown("hoopoe", "the letter", 1)]).toEqual([64, 64, 0, 0]);

    // The dream: seven fat cows, eaten by seven lean ones; seven green ears and seven dry; then the grain stored by day,
    // and the rain.
    const herd = (name: string) => (part("dream", name).svg.match(/<g transform/g) ?? []).length;
    expect([herd("seven fat cows"), herd("seven lean cows"), herd("seven green ears"), herd("seven dry ears")]).toEqual([7, 7, 7, 7]);
    expect([shown("dream", "seven fat cows", 0.1), value("dream", "seven lean cows", "x", 0.1), value("dream", "seven lean cows", "x", 0.35), shown("dream", "seven fat cows", 0.5)]).toEqual([1, 170, 0, 0]);
    expect([value("dream", "seven green ears", "scaleY", 0.5), value("dream", "seven dry ears", "scaleY", 0.55), shown("dream", "storehouse", 0.7), shown("dream", "rain", 0.9)]).toEqual([1, 1, 1, 1]);

    // The cave: nights and days pass over it, the sun always going over the far side, the dog at the entrance throughout.
    expect([part("cave", "their dog").keys, shown("cave", "night", 0.34) > 0.5, shown("cave", "night", 0.5), shown("cave", "sun, first day", 0.1)]).toEqual([undefined, true, 0, 1]);
    expect([value("cave", "bush growing over the years", "scale", 0.2), value("cave", "bush growing over the years", "scale", 1)]).toEqual([0.4, 1]);

    // The elephant: it comes and kneels, held back; the flocks come only after; the stones, then the straw; it stays
    // kneeling.
    expect([value("elephant", "the elephant", "x", 0) >= 100, value("elephant", "the elephant", "x", 0.2), value("elephant", "the elephant", "scaleY", 0.4) < 1, shown("elephant", "the elephant", 1)]).toEqual([
      true,
      0,
      true,
      1
    ]);
    for (const name of ["first flock", "second flock", "third flock"]) expect([name, value("elephant", name, "x", 0.3) <= -200, value("elephant", name, "x", 0.66)]).toEqual([name, true, 0]);
    expect([shown("elephant", "stones of baked clay", 0.7), shown("elephant", "eaten straw", 0.7), shown("elephant", "eaten straw", 1), shown("elephant", "army's dust", 1)]).toEqual([1, 0, 1, 0]);

    // The journeys: south in winter, north in summer, home with food, and the doves of the safe city.
    expect([value("journeys", "winter caravan", "x", 0.13) < 0, value("journeys", "summer caravan", "x", 0.2), value("journeys", "summer caravan", "x", 0.5), value("journeys", "caravan home", "x", 0.7)]).toEqual([
      true,
      -90,
      170,
      0
    ]);
    expect([shown("journeys", "food brought home", 0.6), shown("journeys", "food brought home", 0.8), shown("journeys", "doves, safe", 0.9)]).toEqual([0, 1, 1]);
    expect(signArt("journeys").words.map((word) => word.text)).toEqual(["The winter journey", "The summer journey", "Fed against hunger", "Safe from fear"]);
  });

  test("the Prophets' scenes show each moment in its order, and draw no Prophet and no person", () => {
    const prophets: SignKind[] = ["tur", "staff", "khidr", "barrier", "yunus", "maryam"];
    for (const kind of prophets) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|soldiers?|sorcerers?|magicians?|helper|servant|angels?|child|children|boy|girl|baby|face|hand)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    // At Tur: a cold, dark night; a fire far off on the side of the mount; near, the fire in the green tree he was
    // called from; the holy valley lit; and the staff thrown down there becomes a snake.
    expect(words("tur")).toEqual(["A cold, dark night", "A fire on the side of the mountain", "Called from the tree", "The holy valley of Tuwa", "The staff became a snake"]);
    expect([shown("tur", "far fire", 0.1), shown("tur", "far fire", 0.3), shown("tur", "fire in the bush", 0.3), shown("tur", "far fire", 0.5), shown("tur", "fire in the bush", 0.5)]).toEqual([0, 1, 0, 0, 1]);
    expect([value("tur", "green bush", "scale", 0.3) < 0.5, value("tur", "green bush", "scale", 0.5), shown("tur", "holy valley lit", 0.5), shown("tur", "holy valley lit", 0.7)]).toEqual([true, 1, 0, 1]);
    expect([shown("tur", "staff", 0.84), shown("tur", "snake", 0.84), shown("tur", "staff", 1), shown("tur", "snake", 1)]).toEqual([1, 0, 0, 1]);
    // The staff: their ropes and staffs thrown down, then seeming to move; Musa's staff thrown, the serpent it became
    // swallowing all on the right, then all on the left; and the truth stands.
    expect(words("staff")).toEqual(["Their ropes and staffs", "They seemed to move", "Musa threw down his staff", "It swallowed what they faked", "The truth stood firm"]);
    const sides = (t: number) => ["ropes and staffs thrown, left", "ropes and staffs thrown, right", "seeming to move, left", "seeming to move, right"].map((name) => shown("staff", name, t));
    expect([sides(0.15), sides(0.35), sides(0.6)]).toEqual([
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1]
    ]);
    expect([shown("staff", "Musa's staff", 0.49), shown("staff", "great serpent", 0.49), shown("staff", "Musa's staff", 0.6), shown("staff", "great serpent", 0.6)]).toEqual([1, 0, 0, 1]);
    expect([value("staff", "great serpent", "x", 0.69), sides(0.69), value("staff", "great serpent", "x", 0.77), value("staff", "great serpent", "scaleX", 0.77), sides(0.77)]).toEqual([34, [0, 0, 1, 0], -40, -1, [0, 0, 0, 0]]);
    expect([value("staff", "great serpent", "x", 1), value("staff", "great serpent", "scaleX", 1), shown("staff", "the truth stands", 0.8), shown("staff", "the truth stands", 1)]).toEqual([0, 1, 0, 1]);
    // Where the two seas meet: the fish on the rock, then into the sea along its tunnel; the boat, its plank pulled out
    // and a hole left; the town, its wall leaning about to fall, set straight; and the orphans' treasure beneath it.
    expect(words("khidr")).toEqual(["Where the two seas meet", "The fish took its way into the sea", "A hole in the boat", "A wall about to fall", "It was set straight", "The orphans' treasure beneath"]);
    expect([value("khidr", "the fish", "x", 0.1), shown("khidr", "tunnel in the sea", 0.1), value("khidr", "the fish", "x", 0.3) > 38, shown("khidr", "tunnel in the sea", 0.3), shown("khidr", "the fish", 0.4)]).toEqual([0, 0, true, 1, 0]);
    expect([shown("khidr", "boat", 0.44), shown("khidr", "plank pulled out", 0.44), shown("khidr", "hole in the boat", 0.44), shown("khidr", "plank pulled out", 0.52), shown("khidr", "hole in the boat", 0.52)]).toEqual([1, 1, 0, 0, 1]);
    expect([shown("khidr", "the town", 0.5), shown("khidr", "the town", 0.6), value("khidr", "wall about to fall", "rotate", 0.6), shown("khidr", "cracks", 0.6)]).toEqual([0, 1, 8, 1]);
    expect([value("khidr", "wall about to fall", "rotate", 0.8), shown("khidr", "cracks", 0.8), shown("khidr", "the orphans' treasure", 0.8), shown("khidr", "the orphans' treasure", 1)]).toEqual([0, 0, 0, 1]);
    // The barrier: the gap between two mountains, filled row by row with iron, blown upon until like fire, molten
    // copper poured over it from both sides, and it stands.
    expect(words("barrier")).toEqual(["Between two mountains", "Blocks of iron", "Blown until it was like fire", "Molten copper poured over it", "They could not climb over it"]);
    const rows = (t: number) => [1, 2, 3, 4].map((row) => shown("barrier", `blocks of iron, row ${row}`, t));
    expect([rows(0.19), rows(0.27), rows(0.36)]).toEqual([
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1]
    ]);
    expect([shown("barrier", "iron like fire", 0.36), shown("barrier", "iron like fire", 0.5), shown("barrier", "fires at the foot", 0.5), shown("barrier", "molten copper", 0.5)]).toEqual([0, 1, 1, 0]);
    expect([value("barrier", "left pot", "rotate", 0.7) > 0, value("barrier", "right pot", "rotate", 0.7) < 0, shown("barrier", "molten copper", 0.74), value("barrier", "molten copper", "scaleY", 0.74)]).toEqual([true, true, 1, 1]);
    expect(["iron like fire", "molten copper", "left pot", "barrier of iron and copper", "shine"].map((name) => shown("barrier", name, 1))).toEqual([0, 0, 0, 1, 1]);
    // Filled level with the two mountains, up to their tops (18:96, as Ibn Kathir explains it, and the lesson teaches):
    // the top row of iron starts where the mountains' inner sides do, at their tops (y 50, their ridges at 49 to 51).
    const mountains = part("barrier", "two mountains").svg;
    expect([part("barrier", "blocks of iron, row 4").svg.startsWith('<path d="M44 50 L116 50 '), mountains.includes("44 50 L64 96"), mountains.includes("116 50 L96 96")]).toEqual([true, true, true]);
    // Yunus: the laden ship; the great fish rising by it; the darknesses, the fish deep down; then the open shore it
    // comes to, the gourd plant growing there, and far off the town of his people, who believed.
    expect(words("yunus")).toEqual(["The laden ship", "A great fish", "In the darknesses", "Cast on the open shore", "A gourd plant grew", "His people believed"]);
    expect([shown("yunus", "laden ship", 0.1), shown("yunus", "great fish", 0.1), shown("yunus", "great fish", 0.26), shown("yunus", "laden ship", 0.26)]).toEqual([1, 0, 1, 1]);
    expect([shown("yunus", "the darknesses", 0.45), value("yunus", "great fish", "y", 0.45), shown("yunus", "laden ship", 0.45), shown("yunus", "open shore", 0.45)]).toEqual([0.8, 16, 0, 0]);
    expect([shown("yunus", "the darknesses", 0.6), shown("yunus", "open shore", 0.6), value("yunus", "great fish", "x", 0.6), shown("yunus", "gourd plant", 0.6)]).toEqual([0, 1, 56, 0]);
    expect([shown("yunus", "great fish", 0.8), shown("yunus", "gourd plant", 0.8), value("yunus", "gourd plant", "scale", 0.8), shown("yunus", "far town", 0.8), shown("yunus", "far town", 1)]).toEqual([0, 1, 1, 0, 1]);
    // Maryam: the palm tree in a place far away; a stream beneath; the trunk shaken, and fresh ripe dates fall to the
    // ground by it.
    expect(words("maryam")).toEqual(["A place far away", "By the trunk of a palm tree", "A stream beneath", "Fresh ripe dates fell", "Eat, drink and be glad"]);
    expect([shown("maryam", "stream beneath", 0.3), shown("maryam", "stream beneath", 0.5), value("maryam", "stream beneath", "scaleX", 0.6), shown("maryam", "green by the stream", 0.6)]).toEqual([0, 1, 1, 1]);
    const dates = signArt("maryam").parts.filter((each) => /^falling date \d$/.test(each.name));
    expect(dates.length).toBe(4);
    expect([shown("maryam", "ripe dates", 0.5), shown("maryam", "ripe dates", 0.62), value("maryam", "palm tree", "rotate", 0.5), value("maryam", "palm tree", "rotate", 0.61) !== 0]).toEqual([0, 1, 0, true]);
    expect(dates.map((each) => [value("maryam", each.name, "y", 0.6), value("maryam", each.name, "y", 0.8) > 40])).toEqual(dates.map(() => [0, true]));
    expect([shown("maryam", "a calm light", 0.8), shown("maryam", "a calm light", 1)]).toEqual([0, 1]);
  });

  test("the scenes of Allah's favors to His Prophets show each moment in its order, and draw no Prophet and no person", () => {
    const favors: SignKind[] = ["dawud", "house", "zamzam", "throne", "mihrab", "cool-fire"];
    for (const kind of favors) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|child|children|boy|girl|baby|mother|father|son|face|hand|feet|foot)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    // Dawud: the mountains glorifying, the birds gathered in, the iron glowing and bending, then the coat of mail, its
    // rings joined row by row from the top, and shining.
    expect(words("dawud")).toEqual(["The mountains glorified with him", "And the birds, gathered", "Iron made soft for him", "Make coats of mail", "The rings just right"]);
    expect([shown("dawud", "praise from the mountains", 0.15), shown("dawud", "birds gathered, left", 0.2), shown("dawud", "birds gathered, left", 0.35), value("dawud", "birds gathered, right", "x", 0.2), value("dawud", "birds gathered, right", "x", 0.35)]).toEqual([1, 0, 1, 44, 0]);
    expect([shown("dawud", "iron", 0.45), shown("dawud", "iron bending", 0.45), shown("dawud", "iron", 0.56), shown("dawud", "iron bending", 0.56), shown("dawud", "coat of mail", 0.56)]).toEqual([1, 0, 0, 1, 0]);
    const bands = [1, 2, 3, 4].map((band) => `rings of the coat, band ${band}`);
    expect([bands.map((name) => shown("dawud", name, 0.62)), bands.map((name) => shown("dawud", name, 0.7) === 1), bands.map((name) => shown("dawud", name, 0.8))]).toEqual([
      [0, 0, 0, 0],
      [true, false, false, false],
      [1, 1, 1, 1]
    ]);
    expect([shown("dawud", "iron bending", 0.8), shown("dawud", "coat of mail", 1), shown("dawud", "rings shining", 0.8), shown("dawud", "rings shining", 1)]).toEqual([0, 1, 0, 1]);
    // The House: a dry valley; its stones rising course by course, from the ground up; accepted; the call going out;
    // and the camels coming from every side, along the paths.
    expect(words("house")).toEqual(["A valley without crops", "Raising the foundations of the House", "Our Lord, accept from us", "Proclaim the Hajj to the people", "From every distant path"]);
    const courses = [1, 2, 3, 4, 5].map((course) => `stones of the House, course ${course}`);
    expect([courses.map((name) => shown("house", name, 0.18)), courses.map((name) => shown("house", name, 0.32) === 1), courses.map((name) => shown("house", name, 0.5))]).toEqual([
      [0, 0, 0, 0, 0],
      [true, true, false, false, false],
      [1, 1, 1, 1, 1]
    ]);
    expect([shown("house", "accepted", 0.5), shown("house", "accepted", 0.62), shown("house", "the call going out, 1", 0.66), shown("house", "the call going out, 1", 0.7) > 0]).toEqual([0, 1, 0, true]);
    expect([shown("house", "camel coming, left", 0.8), shown("house", "paths to the House", 0.8), shown("house", "camel coming, left", 1), value("house", "camel coming, left", "x", 1), shown("house", "paths to the House", 1)]).toEqual([0, 0, 1, 0, 1]);
    // Safa and Marwah: the footsteps going between them, counted seven times; then the water of Zamzam; then a bird
    // circling over it.
    expect(words("zamzam")).toEqual(["Safa and Marwah", "Seven times between them", "The water of Zamzam", "A bird circling over the water"]);
    const times = [1, 2, 3, 4, 5, 6, 7].map((time) => `time ${time}`);
    expect([times.map((name) => shown("zamzam", name, 0.2)), times.filter((name) => shown("zamzam", name, 0.4) === 1).length, times.map((name) => shown("zamzam", name, 0.55))]).toEqual([[0, 0, 0, 0, 0, 0, 0], 4, [1, 1, 1, 1, 1, 1, 1]]);
    expect([shown("zamzam", "footsteps between them", 0.3), shown("zamzam", "the water of Zamzam", 0.58), shown("zamzam", "footsteps between them", 0.7), shown("zamzam", "the water of Zamzam", 0.7)]).toEqual([1, 0, 0, 1]);
    expect([shown("zamzam", "a bird circling over the water", 0.7), shown("zamzam", "a bird circling over the water", 0.9)]).toEqual([0, 1]);
    // The throne: far off in Saba; here, with a flash, before the glance returns; the favor of his Lord; changed; and
    // the floor become glass over water.
    expect(words("throne")).toEqual(["Her throne, far away", "Before your glance returns", "From the favor of my Lord", "Her throne, disguised", "A palace paved with glass"]);
    expect([shown("throne", "her throne, far off", 0.2), shown("throne", "her throne, here", 0.2), shown("throne", "her throne, far off", 0.3), shown("throne", "her throne, here", 0.3), shown("throne", "in the blink of an eye", 0.26)]).toEqual([1, 0, 0, 1, 1]);
    expect([shown("throne", "her throne, changed", 0.5), shown("throne", "her throne, here", 0.7), shown("throne", "her throne, changed", 0.7), shown("throne", "the glass", 0.7), shown("throne", "water under the glass", 1), shown("throne", "the glass", 1)]).toEqual([0, 0, 1, 0, 1, 1]);
    // The mihrab: the door opens by itself, the provision is there, from Allah; and there, Zakariyya calls on his Lord.
    expect(words("mihrab")).toEqual(["In the mihrab", "Each time he came in", "He found provision with her", "It is from Allah", "There, Zakariyya called on his Lord"]);
    expect([value("mihrab", "the door", "scaleX", 0.1), value("mihrab", "the door", "scaleX", 0.35) < 0.2, shown("mihrab", "provision with her", 0.38), shown("mihrab", "provision with her", 0.5)]).toEqual([1, true, 0, 1]);
    expect([shown("mihrab", "from Allah", 0.58), shown("mihrab", "from Allah", 0.7), shown("mihrab", "calling on his Lord", 0.78), shown("mihrab", "calling on his Lord", 0.9)]).toEqual([0, 1, 0, 1]);
    // The fire: blazing; then, at the word, cool and calm; and safe.
    expect(words("cool-fire")).toEqual(["A great blazing fire", "O fire, be coolness", "And safety for Ibrahim"]);
    expect([shown("cool-fire", "the blazing fire", 0.3), shown("cool-fire", "the fire made cool", 0.3), shown("cool-fire", "the blazing fire", 0.5), shown("cool-fire", "the fire made cool", 0.5)]).toEqual([1, 0, 0, 1]);
    expect([shown("cool-fire", "safety", 0.6), shown("cool-fire", "safety", 0.8), shown("cool-fire", "heat of the fire", 1), shown("cool-fire", "coolness", 1)]).toEqual([0, 1, 0, 1]);
  });

  test("the scenes of the Prophets' trials and their peoples show each moment in its order, and draw no Prophet and no person", () => {
    const trials: SignKind[] = ["ad-wind", "river", "qarun", "madyan", "ayyub", "yusuf-dream"];
    for (const kind of trials) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|child|children|boy|girl|baby|mother|father|son|sister|brothers?|face|hand|feet|foot)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    // 'Ad: the towers rise on the high places; the cloud comes from the west, toward their valleys; the wind blows for
    // seven nights and eight days, a day and then a night, in turn; the towers and the palms fall; and only their homes
    // are left.
    expect(words("ad-wind")).toEqual(["Towers on every high place", "A cloud facing their valleys", "A wind with a painful punishment", "Seven nights and eight days", "Nothing seen but their homes"]);
    const towers = names("ad-wind", /^tower on a high place/);
    expect([towers.length, towers.map((name) => value("ad-wind", name, "scaleY", 0)), towers.map((name) => value("ad-wind", name, "scaleY", 0.2))]).toEqual([3, [0, 0, 0], [1, 1, 1]]);
    expect([shown("ad-wind", "the cloud", 0.2), value("ad-wind", "the cloud", "x", 0.22) < 0, shown("ad-wind", "the cloud", 0.3), value("ad-wind", "the cloud", "x", 0.36), shown("ad-wind", "the cloud", 0.5)]).toEqual([0, true, 1, 0, 0]);
    expect([shown("ad-wind", "the wind", 0.38), shown("ad-wind", "the wind", 0.5), shown("ad-wind", "the wind", 1), shown("ad-wind", "palm trees", 0.6), shown("ad-wind", "palm trees", 0.72)]).toEqual([0, 1, 0, 1, 0]);
    const turns = names("ad-wind", /^(day|night) \d+$/);
    expect(turns).toEqual(Array.from({ length: 15 }, (_, i) => (i % 2 ? `night ${(i + 1) / 2}` : `day ${i / 2 + 1}`)));
    const filled = turns.map((name) => part("ad-wind", name).keys!.at[2]);
    expect([turns.map((name) => shown("ad-wind", name, 0.62)), filled.every((time, i) => i === 0 || time > filled[i - 1]), turns.map((name) => shown("ad-wind", name, 0.8))]).toEqual([turns.map(() => 0), true, turns.map(() => 1)]);
    expect([towers.map((name) => shown("ad-wind", name, 1)), shown("ad-wind", "their homes", 1), shown("ad-wind", "sand drifted at their homes", 0.8), shown("ad-wind", "sand drifted at their homes", 1)]).toEqual([[0, 0, 0], 1, 0, 1]);
    // The river: the chest's lid shuts, it goes into the river and sails, his sister's footprints follow it along the
    // bank, it comes to the shore by the palace and is taken up; and in the evening, there is light in their home.
    expect(words("river")).toEqual(["Put him into the chest", "Cast it into the river", "Do not fear, do not grieve", "Follow him", "The river cast it on the shore", "We returned him to his mother"]);
    expect([value("river", "the chest's lid", "rotate", 0), value("river", "the chest's lid", "rotate", 0.16), value("river", "the chest", "x", 0.16), value("river", "the chest", "y", 0.3) > 0]).toEqual([80, 0, 0, true]);
    const steps = names("river", /^footprints following the chest, step \d+$/);
    expect([steps.length, steps.map((name) => shown("river", name, 0.46)), shown("river", steps[0], 0.5), steps.map((name) => shown("river", name, 0.74))]).toEqual([13, steps.map(() => 0), 1, steps.map(() => 1)]);
    expect([value("river", "the chest", "x", 0.74), shown("river", "the chest", 0.76), shown("river", "the chest", 0.8), shown("river", "under His care", 0.3), shown("river", "under His care", 0.5)]).toEqual([82, 1, 0, 0, 1]);
    expect([shown("river", "light in their home", 0.8), shown("river", "light in their home", 1), shown("river", "evening", 1)]).toEqual([0, 1, 1]);
    // Qarun: his treasure and its many keys; his beasts in their finery going out; the earth cracks and swallows his
    // home and his treasure, sinking behind the ground; and nothing is left but the hollow where it was.
    expect(words("qarun")).toEqual(["Treasures with heavy keys", "He went out in his finery", "The earth swallowed his home", "No one could help him"]);
    const keys = names("qarun", /^key \d+$/);
    expect([keys.length, keys.map((name) => shown("qarun", name, 0.02)), keys.map((name) => shown("qarun", name, 0.24))]).toEqual([8, keys.map(() => 0), keys.map(() => 1)]);
    const finery = names("qarun", /in finery/);
    // All three are in view, out of his door and not yet past the left edge, as the moment of his going out ends, the
    // first one out farthest along; then gone with it.
    const going = finery.map((name) => value("qarun", name, "x", 0.45));
    expect([finery.length, finery.map((name) => shown("qarun", name, 0.24)), finery.map((name) => shown("qarun", name, 0.45)), going.every((x) => x > -62 && x < -8), finery.map((name) => shown("qarun", name, 0.5))]).toEqual([3, [0, 0, 0], [1, 1, 1], true, [0, 0, 0]]);
    expect(going).toEqual([...going].sort((a, b) => a - b));
    const order = signArt("qarun").parts.map((each) => each.name);
    expect(["his home", "his treasure", ...keys].every((name) => order.indexOf(name) < order.indexOf("the ground"))).toBe(true);
    expect(["his home", "his treasure", ...keys].map((name) => [value("qarun", name, "y", 0.5), value("qarun", name, "y", 0.74)])).toEqual(["his home", "his treasure", ...keys].map(() => [0, 44]));
    expect([shown("qarun", "the earth cracking", 0.48), shown("qarun", "the earth cracking", 0.6), shown("qarun", "where it was swallowed", 0.6), shown("qarun", "where it was swallowed", 0.8)]).toEqual([0, 1, 0, 1]);
    // Madyan: the many flocks at the trough; the flock held back, apart; the bucket drawn up and poured, and the flock
    // led to the water; then the shade.
    expect(words("madyan")).toEqual(["The water of Madyan", "Many watering their flocks", "Two women held back their flock", "So he watered for them", "My Lord, I am in need"]);
    const many = names("madyan", /^many flocks drinking/);
    const held = names("madyan", /^flock held back/);
    expect([many.length, many.map((name) => shown("madyan", name, 0.2)), many.map((name) => [shown("madyan", name, 0.4), value("madyan", name, "x", 0.4)])]).toEqual([5, many.map(() => 0), many.map(() => [1, 0])]);
    expect([held.length, held.map((name) => shown("madyan", name, 0.4)), held.map((name) => [shown("madyan", name, 0.5), value("madyan", name, "x", 0.6)]), held.map((name) => value("madyan", name, "x", 0.76))]).toEqual([3, [0, 0, 0], held.map(() => [1, 0]), [58, 58, 58]]);
    expect([value("madyan", "the bucket", "y", 0.6), value("madyan", "the bucket", "y", 0.66), value("madyan", "the bucket", "rotate", 0.74), value("madyan", "the bucket", "x", 0.9), value("madyan", "the bucket", "y", 0.9)]).toEqual([0, -9, 60, 0, 0]);
    expect([shown("madyan", "water poured", 0.68), shown("madyan", "water poured", 0.75), shown("madyan", "water poured", 0.9), shown("madyan", "turned to the shade", 0.78), shown("madyan", "turned to the shade", 1)]).toEqual([0, 1, 0, 0, 1]);
    // Ayyub: a grey sky over dry, cracked land; the ground struck, and the spring and the cool water; the land green;
    // golden locusts falling; and the light of an excellent servant.
    expect(words("ayyub")).toEqual(["Harm has touched me", "Strike the ground with your foot", "Cool water to wash and drink", "Golden locusts fell", "What an excellent servant!"]);
    expect([shown("ayyub", "clear sky", 0.2), shown("ayyub", "green land", 0.2), shown("ayyub", "wilted plant", 0.2), shown("ayyub", "strike the ground, 1", 0.2), shown("ayyub", "strike the ground, 1", 0.26) > 0]).toEqual([0, 0, 1, 0, true]);
    expect([shown("ayyub", "spring coming out", 0.38), shown("ayyub", "spring coming out", 0.5), shown("ayyub", "the cool water", 0.5), shown("ayyub", "green land", 0.6), shown("ayyub", "clear sky", 0.6), shown("ayyub", "wilted plant", 0.6)]).toEqual([0, 1, 1, 1, 1, 0]);
    expect([shown("ayyub", "golden locusts falling", 0.6), shown("ayyub", "golden locusts falling", 0.7), shown("ayyub", "golden locusts falling", 0.9), shown("ayyub", "golden locusts on the ground", 0.6), shown("ayyub", "golden locusts on the ground", 0.8)]).toEqual([0, 1, 0, 0, 1]);
    expect([shown("ayyub", "light of his patience", 0.8), shown("ayyub", "light of his patience", 1)]).toEqual([0, 1]);
    // Yusuf's dream: eleven stars, then the sun and the moon; all of them bowing, down and in; their home at night, its
    // window shut on the dream; and in the morning, the dream made true.
    expect(words("yusuf-dream")).toEqual(["Eleven stars", "The sun and the moon", "I saw them bowing to me", "Do not tell your brothers", "My Lord has made it true"]);
    const eleven = names("yusuf-dream", /^star \d+$/);
    expect([eleven.length, eleven.map((name) => shown("yusuf-dream", name, 0.01)), eleven.map((name) => shown("yusuf-dream", name, 0.24)), shown("yusuf-dream", "the sun", 0.24), shown("yusuf-dream", "the moon", 0.4)]).toEqual([11, eleven.map(() => 0), eleven.map(() => 1), 0, 1]);
    const bowing = [...eleven, "the sun", "the moon"];
    expect([bowing.map((name) => value("yusuf-dream", name, "y", 0.46)), bowing.map((name) => value("yusuf-dream", name, "y", 0.6) > 0 && value("yusuf-dream", name, "scale", 0.6) < 1)]).toEqual([bowing.map(() => 0), bowing.map(() => true)]);
    expect([shown("yusuf-dream", "night at their home", 0.6), shown("yusuf-dream", "night at their home", 0.76), value("yusuf-dream", "shutter closing, left", "scaleX", 0.72), value("yusuf-dream", "shutter closing, right", "scaleX", 0.82)]).toEqual([0, 1, 0, 1]);
    expect([shown("yusuf-dream", "morning", 0.8), shown("yusuf-dream", "morning", 0.95), shown("yusuf-dream", "the dream made true", 0.84), shown("yusuf-dream", "the dream made true", 1), bowing.map((name) => shown("yusuf-dream", name, 1))]).toEqual([0, 1, 0, 1, bowing.map(() => 0)]);
  });

  test("the scenes of Allah's commands show each moment in its order, and draw no Prophet, no person and nothing of a sacrifice", () => {
    const commands: SignKind[] = ["measure", "ram", "qiblah", "saba", "cow"];
    for (const kind of commands) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|child|children|boy|girl|baby|mother|father|son|sister|brothers?|face|hand|feet|foot|knife|blade|blood)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    // The measure: a tilted balance under a dim sky; the measure heaped and poured into their own sack; scooped short
    // and poured into the other; then full, into the other, as the sky clears; and the balance weighed straight.
    expect(words("measure")).toEqual(["Woe to those who give less", "When they take, they take in full", "When they give, they give less", "Give full measure", "Weigh with a straight balance"]);
    expect([value("measure", "beam of the balance", "rotate", 0.1), value("measure", "pan with the weight", "y", 0.1) > 0, value("measure", "pan with the grain", "y", 0.1) < 0, shown("measure", "dim over the market", 0.1)]).toEqual([-9, true, true, 1]);
    const measured = (t: number) => ["measure heaped", "measure short", "measure full"].map((name) => shown("measure", name, t));
    expect([measured(0.2), measured(0.3), measured(0.5), measured(0.7), measured(0.9)]).toEqual([
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0]
    ]);
    expect([value("measure", "the measure", "x", 0.37), value("measure", "the measure", "x", 0.54), value("measure", "the measure", "x", 0.75), value("measure", "the measure", "x", 0.9)]).toEqual([-105, 27, 27, 0]);
    expect([shown("measure", "grain poured into their own sack", 0.345), shown("measure", "grain poured short into the other sack", 0.545), shown("measure", "grain poured in full into the other sack", 0.74), shown("measure", "grain poured into their own sack", 0.5)]).toEqual([1, 1, 1, 0]);
    const own = (t: number) => value("measure", "their own sack", "scaleY", t);
    const other = (t: number) => value("measure", "the other sack", "scaleY", t);
    expect([own(0.3), own(0.42), other(0.5), other(0.6), other(0.8)]).toEqual([0.62, 1, 0.62, 0.7, 1]);
    expect([shown("measure", "dim over the market", 0.8), shown("measure", "a little more grain on the pan", 0.84), shown("measure", "a little more grain on the pan", 0.9), shown("measure", "light of the straight balance", 0.85)]).toEqual([0, 0, 1, 0]);
    expect([value("measure", "beam of the balance", "rotate", 1), value("measure", "pan with the weight", "y", 1), value("measure", "pan with the grain", "y", 1), shown("measure", "light of the straight balance", 1)]).toEqual([0, 0, 0, 1]);
    // Ibrahim's dream: a night by their tent, and the dream; dawn, and the way up the hill; the light on the hilltop;
    // the light from the sky; and, in the morning, the great ram.
    expect(words("ram")).toEqual(["I saw in a dream", "Do what you are commanded", "When they had both submitted", "O Ibrahim, you have fulfilled the dream", "We ransomed him with a great sacrifice"]);
    expect([shown("ram", "stars", 0.1), shown("ram", "the dream", 0.15), shown("ram", "lamp in the tent", 0.1), shown("ram", "dawn", 0.1), value("ram", "the sun rising", "y", 0.1)]).toEqual([1, 1, 1, 0, 34]);
    expect([shown("ram", "stars", 0.35), shown("ram", "the dream", 0.35), shown("ram", "dawn", 0.35), shown("ram", "the way up the hill", 0.35), shown("ram", "the way up the hill", 0.5)]).toEqual([0, 0, 1, 1, 0]);
    expect([shown("ram", "light on the hilltop", 0.4), shown("ram", "light on the hilltop", 0.55), shown("ram", "light from the sky", 0.55), shown("ram", "light from the sky", 0.7), value("ram", "the sun rising", "y", 0.6)]).toEqual([0, 1, 0, 1, 0]);
    expect([shown("ram", "the great ram", 0.76), shown("ram", "the great ram", 0.9), shown("ram", "light of the great sacrifice", 0.9), shown("ram", "morning", 1)]).toEqual([0, 1, 1, 1]);
    // The qiblah: the arrow toward Jerusalem; the light from the sky; the arrow turned right round, toward the Ka'bah;
    // and the others turning toward it too, one after another.
    expect(words("qiblah")).toEqual(["Facing Jerusalem at first", "Your face turning to the sky", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"]);
    expect([value("qiblah", "the arrow of the qiblah", "rotate", 0.2), shown("qiblah", "the way toward Jerusalem", 0.15), shown("qiblah", "the way toward the Ka'bah", 0.15), shown("qiblah", "light from the sky", 0.2)]).toEqual([0, 1, 0, 0]);
    expect([shown("qiblah", "light from the sky", 0.35), value("qiblah", "the arrow of the qiblah", "rotate", 0.44), shown("qiblah", "light from the sky", 0.55)]).toEqual([1, 0, 0]);
    expect([value("qiblah", "the arrow of the qiblah", "rotate", 0.6), shown("qiblah", "the way toward Jerusalem", 0.55), shown("qiblah", "the way toward the Ka'bah", 0.65), shown("qiblah", "the Ka'bah lit", 0.5), shown("qiblah", "the Ka'bah lit", 0.7)]).toEqual([180, 0, 1, 0, 1]);
    const others = names("qiblah", /^the qiblah of /);
    const turned = others.map((name) => part("qiblah", name).keys!.at[1]);
    expect([others.length, others.map((name) => value("qiblah", name, "rotate", 0.7)), turned.every((time, i) => i === 0 || time > turned[i - 1]), others.map((name) => value("qiblah", name, "rotate", 1))]).toEqual([3, [0, 0, 0], true, [180, 180, 180]]);
    // Saba: the two gardens; their fruit; the dam cracks and bursts, its lake gone, its flood over the valley; bitter
    // fruit, tamarisk and lote trees in their place; and their camels going off apart, their houses left faded.
    expect(words("saba")).toEqual(["Two gardens, right and left", "Eat, and be grateful to Him", "The flood of the dam", "Bitter fruit and tamarisk", "Scattered far and wide"]);
    const gardens = ["the garden on the left", "the garden on the right"];
    const fruit = ["fruit of the garden on the left", "fruit of the garden on the right"];
    expect([gardens.map((name) => shown("saba", name, 0)), gardens.map((name) => shown("saba", name, 0.15)), fruit.map((name) => shown("saba", name, 0.15)), fruit.map((name) => shown("saba", name, 0.3))]).toEqual([
      [0, 0],
      [1, 1],
      [0, 0],
      [1, 1]
    ]);
    expect([shown("saba", "the dam", 0.4), shown("saba", "the dam cracking", 0.43), shown("saba", "the flood of the dam", 0.4), shown("saba", "the dam", 0.5), shown("saba", "the lake behind the dam", 0.55)]).toEqual([1, 1, 0, 0, 0]);
    expect([shown("saba", "the flood of the dam", 0.53), value("saba", "the flood of the dam", "scale", 0.53), shown("saba", "the flood of the dam", 0.7), gardens.map((name) => shown("saba", name, 0.6))]).toEqual([1, 1, 0, [0, 0]]);
    expect([shown("saba", "bitter fruit, tamarisk and a few lote trees", 0.55), shown("saba", "bitter fruit, tamarisk and a few lote trees", 0.7), shown("saba", "their tall houses", 0.7), shown("saba", "their tall houses", 1)]).toEqual([0, 1, 1, 0.3]);
    const camels = names("saba", /^camel going away/);
    expect([camels.length, camels.map((name) => shown("saba", name, 0.7)), camels.map((name) => shown("saba", name, 0.9)), camels.map((name) => Math.sign(value("saba", name, "x", 0.98)))]).toEqual([2, [0, 0], [1, 1], [-1, 1]]);
    // The cow: four cows in the pasture; the old one and the calf go; then the ones that are not yellow, as the yellow
    // cow comes; the plough and the water wheel stand idle; and the yellow cow, with no spot on it, shines.
    expect(words("cow")).toEqual(["Allah commands you to sacrifice a cow", "Neither old nor young", "Bright yellow, pleasing to see", "Not trained to plough or water", "Sound, with no blemish"]);
    const herd = ["old cow", "young calf", "black and white cow", "brown cow", "the yellow cow"];
    expect([herd.map((name) => shown("cow", name, 0.1)), herd.map((name) => shown("cow", name, 0.4)), herd.map((name) => shown("cow", name, 0.6))]).toEqual([
      [1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1]
    ]);
    // Each cow walks off the way it faces (a card's cow faces right; turned, it faces left), and the yellow one walks in.
    const facesLeft = (name: string) => part("cow", name).svg.includes("scale(-");
    const walks = (name: string) => Math.sign(value("cow", name, "x", 1) - value("cow", name, "x", 0));
    expect(herd.map((name) => (facesLeft(name) ? -1 : 1) === walks(name))).toEqual([true, true, true, true, true]);
    expect([shown("cow", "pleasing to see", 0.38), shown("cow", "pleasing to see", 0.55), shown("cow", "the plough left idle", 0.55), shown("cow", "the plough left idle", 0.7), shown("cow", "the water wheel left still", 0.7)]).toEqual([0, 1, 0, 1, 1]);
    expect([shown("cow", "sound, with no blemish", 0.75), shown("cow", "sound, with no blemish", 0.9)]).toEqual([0, 1]);
    const yellow = part("cow", "the yellow cow").svg;
    expect([yellow.includes("#F4C531"), yellow.includes("#3A3A3A"), yellow.includes("M30 30 C36 29")]).toEqual([true, false, false]);
  });

  test("the scenes of Allah's power in the stories show each moment in its order, and draw no Prophet and no person", () => {
    const powers: SignKind[] = ["overturned", "five-signs", "sabbath", "west-east", "four-birds", "hundred-years", "shirt"];
    for (const kind of powers) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|child|children|boy|girl|baby|mother|father|son|sister|brothers?|face|hand|feet|foot|apes?|monkeys?)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    // Lut's town: by night, its lamps lit, and the way out of it; dawn, then the morning; the town turned upside down
    // as the sun stands high; the stones of baked clay falling on it, layer on layer; and the clear sign left of it.
    expect(words("overturned")).toEqual(["Leave by night", "Their appointed time is the morning", "We turned it upside down", "Stones of baked clay, layer on layer", "We left a clear sign"]);
    expect([shown("overturned", "stars", 0.1), shown("overturned", "the moon", 0.1), shown("overturned", "lamps in the homes", 0.1), shown("overturned", "the way out of the town by night", 0.15), shown("overturned", "morning", 0.1)]).toEqual([1, 1, 1, 1, 0]);
    expect([shown("overturned", "dawn", 0.3), shown("overturned", "morning", 0.36), shown("overturned", "stars", 0.36), shown("overturned", "lamps in the homes", 0.36), shown("overturned", "the way out of the town by night", 0.36), value("overturned", "the sun rising", "y", 0.36)]).toEqual([1, 1, 0, 0, 0, 0]);
    expect([value("overturned", "the town", "rotate", 0.4), value("overturned", "the town", "rotate", 0.47), value("overturned", "the town", "rotate", 0.56), shown("overturned", "dust of the town turned over", 0.56)]).toEqual([0, 90, 180, 1]);
    expect([shown("overturned", "stones of baked clay falling", 0.5), shown("overturned", "stones of baked clay falling", 0.7), shown("overturned", "dark sky of the stones", 0.7), shown("overturned", "stones on it, a first layer", 0.7), shown("overturned", "stones on it, layer on layer", 0.7), shown("overturned", "stones on it, layer on layer", 0.78)]).toEqual([0, 1, 1, 1, 0, 1]);
    expect([shown("overturned", "stones of baked clay falling", 1), shown("overturned", "dark sky of the stones", 1), shown("overturned", "a clear sign", 0.8), shown("overturned", "a clear sign", 1), value("overturned", "the town", "rotate", 1), shown("overturned", "stones on it, layer on layer", 1)]).toEqual([0, 0, 0, 1, 180, 1]);
    // Pharaoh's people: years of drought; then the flood, the locusts, the lice, the frogs and the blood, one after
    // another, each lifted in its turn; and, at the end, all of them lifted.
    expect(words("five-signs")).toEqual(["Years of drought", "The flood", "The locusts", "The lice", "The frogs", "The blood", "Each time it was lifted, they broke their word"]);
    const signs = ["the burning sun of the drought", "the flood", "a swarm of locusts", "lice", "frogs", "the river turned to blood"];
    expect([0.1, 0.22, 0.36, 0.5, 0.62, 0.78, 0.95].map((t) => signs.map((name) => shown("five-signs", name, t)))).toEqual([
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0]
    ]);
    expect([shown("five-signs", "their fields dried up", 0.1), shown("five-signs", "the river run low", 0.1), shown("five-signs", "rain", 0.22), shown("five-signs", "locusts on the crops", 0.36), shown("five-signs", "blood in their jars", 0.78), shown("five-signs", "blood in their jars", 0.95)]).toEqual([1, 1, 1, 1, 1, 0]);
    // The town by the sea: on their Sabbath the fish come up on the water; the six other days pass, one by one, with no
    // fish; and the Sabbath comes again, and the fish with it.
    expect(words("sabbath")).toEqual(["The town by the sea", "Their fish came on their Sabbath", "On other days, they did not come", "Thus We tested them"]);
    const days = [1, 2, 3, 4, 5, 6].map((day) => `day ${day} of the week, the day it is`);
    expect([shown("sabbath", "the Sabbath, the day it is", 0.3), shown("sabbath", "fish showing on the sea", 0.3), shown("sabbath", "fish leaping", 0.3), days.map((name) => shown("sabbath", name, 0.3))]).toEqual([1, 1, 1, days.map(() => 0)]);
    expect([0.45, 0.48, 0.51, 0.54, 0.57, 0.61].map((t, day) => days.map((name, index) => shown("sabbath", name, t) === (index === day ? 1 : 0)).every(Boolean))).toEqual([true, true, true, true, true, true]);
    expect([shown("sabbath", "the Sabbath, the day it is", 0.5), shown("sabbath", "fish showing on the sea", 0.5), shown("sabbath", "fish leaping", 0.5)]).toEqual([0, 0, 0]);
    expect([shown("sabbath", "the Sabbath, the day it is", 0.8), shown("sabbath", "fish showing on the sea", 0.8), shown("sabbath", "fish leaping", 1)]).toEqual([1, 1, 1]);
    // Dhul-Qarnayn: the means to all things; a way to where the sun sets, and the sun going down into a murky spring;
    // the night; then a way to where the sun rises, at dawn, over a land with no shelter from it.
    expect(words("west-east")).toEqual(["We gave him the means to all things", "To where the sun sets", "Setting in a murky spring", "To where the sun rises", "No shelter from the sun"]);
    const west = names("west-east", /^the way to where the sun sets, step/);
    const east = names("west-east", /^the way to where the sun rises, step/);
    expect([shown("west-east", "the means to all things", 0.15), west.map((name) => shown("west-east", name, 0.15)), west.map((name) => shown("west-east", name, 0.32))]).toEqual([1, west.map(() => 0), west.map(() => 1)]);
    expect([value("west-east", "the sun going down in the west", "x", 0.36), value("west-east", "the sun going down in the west", "y", 0.36), shown("west-east", "the setting sun on the spring", 0.47), shown("west-east", "evening in the west", 0.47)]).toEqual([-56, 40, 1, 1]);
    expect([shown("west-east", "night", 0.56), shown("west-east", "stars", 0.56), shown("west-east", "the sun going down in the west", 0.56), shown("west-east", "the sun rising in the east", 0.56)]).toEqual([1, 1, 0, 0]);
    expect([shown("west-east", "dawn in the east", 0.65), east.map((name) => shown("west-east", name, 0.59)), east.map((name) => shown("west-east", name, 0.72)), value("west-east", "the sun rising in the east", "y", 0.72)]).toEqual([1, east.map(() => 0), east.map(() => 1), 0]);
    expect([shown("west-east", "the heat of the day", 1), shown("west-east", "no shelter from the sun", 1), value("west-east", "the sun rising in the east", "y", 1), shown("west-east", "night", 1)]).toEqual([1, 1, -22, 0]);
    // Ibrahim's four birds: the light of his prayer going up; the four birds; a part of them on each hill, lit; the call;
    // and the birds flying back to him in haste, from the hills, to stand where they stood.
    expect(words("four-birds")).toEqual(["Show me how You give life to the dead", "Take four birds", "Then put a part of them on each hill", "Then call them", "They will come to you in haste"]);
    const birds = names("four-birds", /^bird \d$/);
    const back = names("four-birds", /^bird \d coming back$/);
    const hills = names("four-birds", /^light on hill \d$/);
    const rings = names("four-birds", /^the call, ring \d$/);
    expect([birds.length, back.length, hills.length, rings.length, shown("four-birds", "light going up to the sky", 0.12), birds.map((name) => shown("four-birds", name, 0.12))]).toEqual([4, 4, 5, 3, 1, birds.map(() => 0)]);
    expect([birds.map((name) => shown("four-birds", name, 0.3)), birds.map((name) => shown("four-birds", name, 0.5)), hills.map((name) => shown("four-birds", name, 0.5)), rings.map((name) => shown("four-birds", name, 0.5)), rings.map((name) => shown("four-birds", name, 0.65))]).toEqual([birds.map(() => 1), birds.map(() => 0), hills.map(() => 1), rings.map(() => 0), rings.map(() => 1)]);
    expect([back.map((name) => shown("four-birds", name, 0.8)), back.map((name) => value("four-birds", name, "y", 0.74) < -50), back.map((name) => [value("four-birds", name, "x", 0.85), value("four-birds", name, "y", 0.85)])]).toEqual([back.map(() => 1), back.map(() => true), back.map(() => [0, 0])]);
    expect([birds.map((name) => shown("four-birds", name, 1)), back.map((name) => shown("four-birds", name, 1)), hills.map((name) => shown("four-birds", name, 1))]).toEqual([birds.map(() => 1), back.map(() => 0), hills.map(() => 0)]);
    // The town fallen on its roofs: a hundred years go by, day after day, the grass and a tree growing, the donkey gone
    // to bones; the food and drink unchanged; the bones raised and the donkey whole again; and Allah able to do all things.
    expect(words("hundred-years")).toEqual(["A town fallen on its roofs", "Allah made him die for a hundred years", "Your food and drink, unchanged", "We raise the bones, then clothe them with flesh", "Allah is able to do all things"]);
    expect([shown("hundred-years", "the sun", 0.1), shown("hundred-years", "the donkey", 0.1), shown("hundred-years", "the donkey's bones", 0.1), value("hundred-years", "a tree grown in a hundred years", "scale", 0.2)]).toEqual([1, 1, 0, 0.2]);
    expect([shown("hundred-years", "the sun", 0.3), shown("hundred-years", "the sun, day after day", 0.3), shown("hundred-years", "the donkey", 0.4), shown("hundred-years", "the donkey's bones", 0.4), value("hundred-years", "a tree grown in a hundred years", "scale", 0.4), shown("hundred-years", "grass of a hundred years", 0.4)]).toEqual([0, 1, 0, 1, 1, 1]);
    expect([shown("hundred-years", "the sun", 0.5), shown("hundred-years", "his food and drink, unchanged", 0.5), shown("hundred-years", "the bones raised", 0.5)]).toEqual([1, 1, 0]);
    expect([shown("hundred-years", "the donkey's bones", 0.68), shown("hundred-years", "the bones raised", 0.68), shown("hundred-years", "the donkey", 0.68), shown("hundred-years", "the donkey", 0.8), shown("hundred-years", "the bones raised", 0.8)]).toEqual([0, 1, 0, 1, 0]);
    expect([shown("hundred-years", "Allah is able to do all things", 0.8), shown("hundred-years", "Allah is able to do all things", 1), shown("hundred-years", "the donkey", 1)]).toEqual([0, 1, 1]);
    // Yusuf's shirt: the shirt in Egypt, then the caravan there; the caravan leaving with it for Canaan; its scent going on
    // ahead, to the home; the bearer of good news there; and the light come back in the home, and sight with it.
    expect(words("shirt")).toEqual(["Take this shirt of mine", "When the caravan left Egypt", "I find the scent of Yusuf", "The bearer of good news came", "He could see again"]);
    const camels = names("shirt", /^camel of the caravan/);
    expect([shown("shirt", "the shirt", 0.1), shown("shirt", "the shirt carried with the caravan", 0.1), shown("shirt", "the shirt", 0.3), shown("shirt", "the shirt carried with the caravan", 0.3)]).toEqual([1, 0, 0, 1]);
    expect([camels.length, camels.map((name) => shown("shirt", name, 0.1)), camels.map((name) => shown("shirt", name, 0.17)), camels.map((name) => value("shirt", name, "x", 0.17))]).toEqual([2, [0, 0], [1, 1], [0, 0]]);
    expect([camels.map((name) => value("shirt", name, "x", 0.4)), camels.map((name) => value("shirt", name, "x", 0.8))]).toEqual([
      [36, 36],
      [84, 84]
    ]);
    expect([shown("shirt", "the scent of the shirt", 0.3), shown("shirt", "the scent of the shirt", 0.45), value("shirt", "the scent of the shirt", "x", 0.52), shown("shirt", "the scent come to the home", 0.45), shown("shirt", "the scent come to the home", 0.56)]).toEqual([0, 1, 52, 0, 1]);
    expect([shown("shirt", "good news at the home", 0.6), shown("shirt", "good news at the home", 0.75), shown("shirt", "light come back in the home", 0.75), shown("shirt", "light come back in the home", 0.9), shown("shirt", "sight come back", 0.95)]).toEqual([0, 1, 0, 1, 1]);
  });

  test("the scenes of more wonders in the stories show each moment in its order, and draw no Prophet and no person", () => {
    const wonders: SignKind[] = ["guests", "forgiveness", "wind", "pillars", "cup", "clay-bird", "storm"];
    for (const kind of wonders) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|guests?|wife|child|children|boy|girl|baby|mother|father|son|sister|brothers?|face|hand|feet|foot|apes?|monkeys?)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    // Ibrahim's guests: the greeting at his tent; the fire, and the roasted calf brought from it and set near them on the
    // rug; calm after "do not fear"; a light of the good news over the tent, and a second light after it. The ayahs do
    // not say the hour, so the day does not end; and no guest is drawn, only the meal they did not touch.
    expect(words("guests")).toEqual(["They said Peace; he said Peace", "He brought a roasted calf", "Will you not eat?", "Do not fear", "Good news of a knowing son", "Ishaq, and after him Ya'qub"]);
    const rings = names("guests", /^the greeting, ring \d$/);
    expect([rings.map((name) => shown("guests", name, 0.12)), value("guests", "the rug laid out", "scaleX", 0.12), shown("guests", "the fire", 0.12), shown("guests", "the roasted calf on its platter", 0.12)]).toEqual([[1, 1, 1], 1, 0, 0]);
    expect([shown("guests", "the fire", 0.29), shown("guests", "the roasted calf on its platter", 0.29), value("guests", "the roasted calf on its platter", "x", 0.29), rings.map((name) => shown("guests", name, 0.29))]).toEqual([1, 1, 0, [0, 0, 0]]);
    expect([value("guests", "the roasted calf on its platter", "x", 0.45), value("guests", "the roasted calf on its platter", "y", 0.45), shown("guests", "steam of the roasted calf", 0.45), shown("guests", "calm about the tent", 0.45), shown("guests", "calm about the tent", 0.6)]).toEqual([52, -4, 0, 0, 1]);
    expect([shown("guests", "good news: a light over the tent", 0.6), shown("guests", "good news: a light over the tent", 0.77), shown("guests", "a second light, after it", 0.77), shown("guests", "a second light, after it", 1)]).toEqual([0, 1, 0, 1]);
    expect([names("guests", /night|evening|stars?\b|sunset/), shown("guests", "the sun", 1), shown("guests", "the roasted calf on its platter", 1)]).toEqual([[], 1, 1]);
    // Asking forgiveness: a dry land, the light of asking going up; the rain in abundance; the clear sky and the flocks;
    // the gardens growing, with fruit; and the river running.
    expect(words("forgiveness")).toEqual(["Ask your Lord's forgiveness", "He will send rain in abundance", "And give you more wealth", "And make gardens for you", "And make rivers for you"]);
    const flocks = names("forgiveness", /of the flocks, \d$/);
    const gardens = names("forgiveness", /^a (second )?(palm|fruit tree)$/);
    expect([shown("forgiveness", "cracks in the dry land", 0.1), shown("forgiveness", "the hot sun", 0.1), shown("forgiveness", "light of asking, going up", 0.1), shown("forgiveness", "rain", 0.1), shown("forgiveness", "the river", 0.1), gardens.map((name) => shown("forgiveness", name, 0.1))]).toEqual([1, 1, 1, 0, 0, [0, 0, 0, 0]]);
    expect([shown("forgiveness", "rain", 0.37), shown("forgiveness", "grey sky of the rain", 0.37), shown("forgiveness", "the land, watered", 0.37), shown("forgiveness", "cracks in the dry land", 0.37), flocks.map((name) => shown("forgiveness", name, 0.37))]).toEqual([1, 1, 1, 0, flocks.map(() => 0)]);
    expect([flocks.length, shown("forgiveness", "rain", 0.55), shown("forgiveness", "clear sky after the rain", 0.55), flocks.map((name) => [shown("forgiveness", name, 0.55), value("forgiveness", name, "x", 0.55)])]).toEqual([6, 0, 1, flocks.map(() => [1, 0])]);
    expect([gardens.map((name) => [shown("forgiveness", name, 0.75), value("forgiveness", name, "scaleY", 0.75)]), shown("forgiveness", "fruit on the trees", 0.75), shown("forgiveness", "bare trees", 0.75), shown("forgiveness", "the river", 0.75), shown("forgiveness", "the river", 1)]).toEqual([gardens.map(() => [1, 1]), 1, 0, 0, 1]);
    // The wind for Sulayman: thirty days of a month's journey; the wind going with the morning sun, and coming back as it
    // sets; then gentle; the spring of molten copper, the basins and the cauldron; and thanks going up from his city.
    expect(words("wind")).toEqual(["Its morning course, a month's journey", "Its evening course, a month's journey", "Gently, wherever he willed", "A spring of molten copper", "Work, family of Dawud, in thanks"]);
    expect(part("wind", "the days of a month's journey").svg.match(/<circle/g)?.length).toBe(30);
    expect([value("wind", "the sun", "x", 0.18), value("wind", "the sun", "y", 0.18), value("wind", "a month's journey, going", "scaleX", 0.18), shown("wind", "a month's journey, coming back", 0.18), value("wind", "the wind going", "x", 0.18)]).toEqual([64, -46, 1, 0, 92]);
    expect([value("wind", "the sun", "x", 0.36), shown("wind", "the sun", 0.38), shown("wind", "evening light", 0.38), value("wind", "a month's journey, coming back", "scaleX", 0.38), value("wind", "the wind coming back", "x", 0.38), shown("wind", "the wind going", 0.38)]).toEqual([128, 0, 1, 1, 0, 0]);
    expect([shown("wind", "the wind, gentle", 0.4), shown("wind", "the wind, gentle", 0.55), shown("wind", "the sun", 0.55), shown("wind", "the wind coming back", 0.55), shown("wind", "the spring of molten copper", 0.55)]).toEqual([0, 1, 1, 0, 0]);
    expect([shown("wind", "the spring of molten copper", 0.75), shown("wind", "basins like reservoirs", 0.75), shown("wind", "a cauldron fixed in place", 0.75), shown("wind", "thanks, going up from the city", 0.75), shown("wind", "thanks, going up from the city", 1)]).toEqual([1, 1, 1, 0, 1]);
    // Iram, Thamud and Pharaoh: each place lit in its turn; the haze of their corruption; the scourge poured on them, and
    // their lights gone out; and at the end the places stand empty under the night. Nothing is drawn for the stakes.
    expect(words("pillars")).toEqual(["Iram of the pillars", "Who carved the rocks in the valley", "Pharaoh, owner of the stakes", "They spread much corruption", "A scourge of punishment", "Your Lord is ever watchful"]);
    const darks = ["Iram in the dark", "the valley in the dark", "the palace in the dark"];
    const lamps = ["lamps of Iram", "lamps in the carved homes", "lamps of the palace"];
    expect([0.13, 0.29, 0.45].map((t) => darks.map((name) => shown("pillars", name, t)))).toEqual([
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 0]
    ]);
    expect([0.13, 0.29, 0.45, 0.8].map((t) => lamps.map((name) => shown("pillars", name, t)))).toEqual([
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]);
    expect([shown("pillars", "dark haze of corruption", 0.45), shown("pillars", "dark haze of corruption", 0.61), shown("pillars", "the scourge poured on them", 0.61), shown("pillars", "the scourge poured on them", 0.75), shown("pillars", "the scourge poured on them", 0.81), shown("pillars", "dust over the empty places", 0.81)]).toEqual([0, 1, 0, 1, 0, 1]);
    expect([shown("pillars", "night", 1), shown("pillars", "stars", 1), shown("pillars", "dark haze of corruption", 1), shown("pillars", "a darkened sky, over them", 1), ["Iram of the pillars", "homes carved in the rock", "the palace by the river"].map((name) => shown("pillars", name, 1)), names("pillars", /stake/)]).toEqual([1, 1, 0, 0, [1, 1, 1], []]);
    // The cup: put in the last bag; the caravan leaving, and the call; a camel's load for whoever brings it; the bags
    // searched one by one, then the last, and the cup brought out of it.
    expect(words("cup")).toEqual(["He put the cup in his brother's bag", "O caravan, you are thieves!", "Whoever brings it gets a camel's load", "He began with their bags", "Out of his brother's bag"]);
    const camels = names("cup", /^camel \d of the caravan$/);
    const opened = names("cup", /^bag \d, opened$/);
    expect([camels.length, opened.length, shown("cup", "the cup, put in the last bag", 0.1), shown("cup", "the cup, put in the last bag", 0.15), camels.map((name) => value("cup", name, "x", 0.15))]).toEqual([4, 3, 1, 0, [0, 0, 0, 0]]);
    expect([camels.map((name) => value("cup", name, "x", 0.33)), shown("cup", "the call, ring 1", 0.33), shown("cup", "a camel's load, the reward", 0.33), shown("cup", "a camel's load, the reward", 0.5), shown("cup", "the call, ring 1", 0.5)]).toEqual([[16, 16, 16, 16], 1, 0, 1, 0]);
    expect([0.56, 0.6, 0.65, 0.7, 0.73].map((t) => opened.map((name) => shown("cup", name, t)))).toEqual([
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 1, 1]
    ]);
    expect([shown("cup", "the last bag, searched", 0.73), shown("cup", "the cup, brought out of the last bag", 0.73), shown("cup", "the last bag, searched", 0.95), shown("cup", "the cup, brought out of the last bag", 0.95), value("cup", "the cup, brought out of the last bag", "y", 0.95)]).toEqual([0, 0, 1, 1, -10]);
    // The bird of clay: the clay, shaped into a bird; a breath; a living bird, flying up; what they eat, and what they
    // store in their home; and light over all of it, a sign.
    expect(words("clay-bird")).toEqual(["From clay, the shape of a bird", "Then I breathe into it", "It becomes a bird, by Allah's permission", "What you eat and what you store", "A sign for you, if you believe"]);
    expect([shown("clay-bird", "clay", 0.03), shown("clay-bird", "the shape of a bird, of clay", 0.03), shown("clay-bird", "clay", 0.15), shown("clay-bird", "the shape of a bird, of clay", 0.15), shown("clay-bird", "a breath", 0.15), shown("clay-bird", "a breath", 0.28)]).toEqual([1, 0, 0, 1, 0, 0.9]);
    expect([shown("clay-bird", "the shape of a bird, of clay", 0.45), shown("clay-bird", "a living bird", 0.45), shown("clay-bird", "the bird, flying", 0.57), value("clay-bird", "the bird, flying", "y", 0.57), shown("clay-bird", "a living bird", 0.57)]).toEqual([0, 1, 1, -52, 0]);
    expect([shown("clay-bird", "food, known", 0.6), shown("clay-bird", "food, known", 0.77), shown("clay-bird", "jars stored in the home, known", 0.77), shown("clay-bird", "a sign, light over all", 0.77), shown("clay-bird", "a sign, light over all", 1), shown("clay-bird", "food, known", 1)]).toEqual([0, 1, 1, 0, 1, 0]);
    // The parable: a fire kindled at night; its light all around; the light taken away, the smoke and the darkness; the
    // storm, its thunder and lightning; the way lit a little at each flash, then dark, and no further.
    expect(words("storm")).toEqual(["One who kindled a fire", "When it lit up all around him", "Allah took away their light", "Darkness, thunder and lightning", "When it lights the way, they walk", "When it is dark, they stand still"]);
    expect([shown("storm", "the fire", 0.1), shown("storm", "sparks", 0.1), shown("storm", "light all around", 0.1), shown("storm", "light all around", 0.33), shown("storm", "the land lit by the fire", 0.33)]).toEqual([1, 1, 0, 1, 1]);
    expect([shown("storm", "the fire", 0.5), shown("storm", "light all around", 0.5), shown("storm", "darkness", 0.5), shown("storm", "storm clouds", 0.5), shown("storm", "storm clouds", 0.7), shown("storm", "rain", 0.7), shown("storm", "stars", 0.7)]).toEqual([0, 0, 1, 0, 1, 1, 0]);
    expect([shown("storm", "lightning", 0.639), shown("storm", "lightning", 0.66), shown("storm", "thunder", 0.655), shown("storm", "thunder", 0.72)]).toEqual([1, 0, 1, 0]);
    const way = ["the way, lit at a flash", "the way, lit at the next flash"];
    expect([0.75, 0.8, 0.86, 1].map((t) => way.map((name) => shown("storm", name, t)))).toEqual([
      [0, 0],
      [1, 0],
      [1, 1],
      [0.3, 0.3]
    ]);
    expect([shown("storm", "dark over them", 0.86), shown("storm", "dark over them", 1)]).toEqual([0, 1]);
  });

  test("the scenes of zakat, giving and Eid show each moment in its order, and draw no Prophet and no person", () => {
    const giving: SignKind[] = ["zakat", "yemen", "bayruha", "fitr", "eid"];
    for (const kind of giving) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|guests?|wife|child|children|boy|girl|baby|mother|father|son|sister|brothers?|face|hand|feet|foot|Mu'?adh|Talhah|knife|blade|blood)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const count = (svg: string, tag: string) => svg.split(`<${tag}`).length - 1;
    // What zakat is due on: the camels come one by one, and nothing is due until the fifth; then one sheep goes to the
    // home of the poor. Forty coins of silver, one row at a time, and the fortieth goes. Two fields, one under the rain by
    // a river and one watered by a camel drawing from a well: a tenth goes from the first, half a tenth from the second.
    // Each moment ends at rest, so a question can wait there (sceneQuestions.test.tsx).
    expect(words("zakat")).toEqual(["Fewer than five camels: nothing is due", "Five camels: one sheep", "On silver: one part in forty", "Watered by rain: a tenth", "Watered by a camel: half a tenth"]);
    const camels = names("zakat", /^camel \d$/);
    const marks = names("zakat", /^mark \d of the count$/);
    expect([camels.length, marks.map((name) => shown("zakat", name, 0.16)), value("zakat", "camel 5", "x", 0.16), shown("zakat", "five: zakat is due", 0.16), value("zakat", "one sheep, given", "x", 0.16)]).toEqual([5, [1, 1, 1, 1, 0], 60, 0, 0]);
    expect([camels.map((name) => value("zakat", name, "x", 0.3)), marks.map((name) => shown("zakat", name, 0.3)), shown("zakat", "five: zakat is due", 0.3)]).toEqual([[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], 1]);
    expect([value("zakat", "one sheep, given", "x", 0.3), shown("zakat", "one sheep, given", 0.3), shown("zakat", "the flock", 0.3), shown("zakat", "light over the home of the poor", 0.3)]).toEqual([-98, 1, 1, 1]);
    const rows = names("zakat", /^silver coins, row \d$/);
    expect([rows.length, rows.reduce((sum, name) => sum + count(part("zakat", name).svg, "circle"), 0) / 2, count(part("zakat", "the fortieth coin, given").svg, "circle") / 2]).toEqual([5, 39, 1]);
    expect([0.371, 0.45].map((t) => rows.map((name) => shown("zakat", name, t)))).toEqual([
      [1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    expect([value("zakat", "the fortieth coin, given", "x", 0.4), value("zakat", "the fortieth coin, given", "x", 0.47), shown("zakat", "light over the home of the poor", 0.4), shown("zakat", "light over the home of the poor", 0.47)]).toEqual([0, -96, 0, 1]);
    // The rain on the first field, and its crops grow and ripen; then the camel at the well walks away to draw the
    // bucket up, and back, and only then does the second field grow.
    expect([shown("zakat", "rain on the first field", 0.6), shown("zakat", "the river by the first field", 0.6), shown("zakat", "the camel drawing water", 0.5), shown("zakat", "the camel drawing water", 0.6)]).toEqual([1, 1, 0, 1]);
    expect([shown("zakat", "green crops of the first field", 0.6), shown("zakat", "ripe crops of the first field", 0.6), shown("zakat", "green crops of the first field", 0.7), shown("zakat", "ripe crops of the first field", 0.7), shown("zakat", "rain on the first field", 0.7)]).toEqual([1, 0, 0, 1, 0]);
    expect([0.74, 0.78, 0.8, 0.82].map((t) => [value("zakat", "the camel drawing water", "x", t), value("zakat", "the bucket", "y", t), value("zakat", "the rope", "scaleX", t)])).toEqual([
      [0, 0, 1],
      [-12, -8, 1.55],
      [0, 0, 1],
      [-12, -8, 1.55]
    ]);
    expect([shown("zakat", "green crops of the second field", 0.74), shown("zakat", "ripe crops of the second field", 0.74), shown("zakat", "green crops of the second field", 0.85), shown("zakat", "ripe crops of the second field", 0.9), shown("zakat", "green crops of the second field", 0.9)]).toEqual([0, 0, 1, 1, 0]);
    // Ten sacks from each field: nine stay and one goes from the first; from the second, the last is halved and half goes.
    expect([count(part("zakat", "ten sacks from the first field").svg, "path") / 4, count(part("zakat", "ten sacks from the second field").svg, "path") / 4]).toEqual([9, 9]);
    expect([value("zakat", "a tenth, given", "x", 0.7), value("zakat", "the last sack of the second field", "scaleY", 0.89), shown("zakat", "half a tenth, given", 0.89)]).toEqual([-16, 1, 0]);
    expect([value("zakat", "the last sack of the second field", "scaleY", 0.95), value("zakat", "half a tenth, given", "scaleY", 0.95), value("zakat", "half a tenth, given", "x", 1), shown("zakat", "light over the home of the poor", 1)]).toEqual([0.5, 0.5, -112, 1]);
    // Mu'adh sent to Yemen: a dashed way from the north; the light of the testimony first; then the day and the night
    // with a lamp lit at each of the five prayers (the first before the sun is up, the second after its height, the
    // fourth once it has set, the fifth in the night); then from the tall houses of the rich to the homes of the poor.
    expect(words("yemen")).toEqual(["Sent to Yemen", "First: the shahadah", "Then five prayers, day and night", "Then zakat from their rich", "Given to their poor"]);
    const north = names("yemen", /^the way from the north, part \d$/);
    const lamps = names("yemen", /^lamp of prayer \d$/);
    expect([north.map((name) => shown("yemen", name, 0.2)), shown("yemen", "light of the testimony", 0.2), shown("yemen", "light of the testimony", 0.4), shown("yemen", "a spark of the testimony", 0.4), lamps.map((name) => shown("yemen", name, 0.4))]).toEqual([
      [1, 1, 1],
      0,
      1,
      1,
      [0, 0, 0, 0, 0]
    ]);
    expect([0.5, 0.55, 0.6, 0.63, 0.67, 1].map((t) => lamps.map((name) => shown("yemen", name, t)))).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]);
    expect([shown("yemen", "the sun", 0.465), shown("yemen", "before dawn", 0.465), value("yemen", "the sun", "y", 0.53), shown("yemen", "the sun", 0.62), shown("yemen", "night", 0.65), shown("yemen", "the moon", 0.65)]).toEqual([0, 1, 0, 0, 1, 1]);
    const goods = ["a sack of grain from the tall houses", "a second sack", "a sheep from the tall houses"];
    expect([goods.map((name) => [shown("yemen", name, 0.7), shown("yemen", name, 0.76), value("yemen", name, "x", 0.76)]), shown("yemen", "the way down to the poor", 0.85), shown("yemen", "light over the homes of the poor", 0.9)]).toEqual([goods.map(() => [0, 1, 0]), 1, 0]);
    expect([goods.map((name) => [value("yemen", name, "x", 1), value("yemen", name, "y", 1)]), shown("yemen", "light over the homes of the poor", 1)]).toEqual([
      [
        [-62, 19],
        [-56, 16],
        [-92, 17]
      ],
      1
    ]);
    // Bayruha: the garden he loved most, its dates ripe; facing the masjid, its water sweet; the garden, loved; given for
    // Allah, with sparks of the gift rising from it one after another; then baskets of its dates go along dashed ways to
    // the homes of his relatives. No one is drawn, and nothing comes down from the sky.
    expect(words("bayruha")).toEqual(["Bayruha, the garden he loved most", "Facing the masjid, its water sweet", "Spend from what you love", "He gave it for Allah", "Shared among his relatives"]);
    expect([shown("bayruha", "ripe dates", 0.15), shown("bayruha", "sweet water in the well", 0.15), shown("bayruha", "light on the masjid", 0.15), shown("bayruha", "sweet water in the well", 0.35), shown("bayruha", "light on the masjid", 0.35)]).toEqual([1, 0, 0, 1, 1]);
    expect([shown("bayruha", "the garden, loved", 0.55), shown("bayruha", "light on the masjid", 0.55), shown("bayruha", "light over the garden, given", 0.55), shown("bayruha", "light over the garden, given", 0.75)]).toEqual([1, 0, 0, 1]);
    const sparks = names("bayruha", /^a spark of the gift, rising \d$/);
    const starts = sparks.map((name) => part("bayruha", name).keys!.at[1]);
    expect([sparks.length, starts.every((time, index) => index === 0 || time > starts[index - 1]), starts[0] >= 0.64, sparks.map((name) => value("bayruha", name, "y", 1)), sparks.map((name) => shown("bayruha", name, 1))]).toEqual([5, true, true, [-36, -36, -36, -36, -36], [0, 0, 0, 0, 0]]);
    expect(names("bayruha", /\b(rays?|beams?)\b|coming down|from the sky/i)).toEqual([]);
    const ways = names("bayruha", /^the way to a relative's home \d$/);
    const baskets = names("bayruha", /^a basket of dates for a relative \d$/);
    expect([ways.map((name) => shown("bayruha", name, 0.8)), baskets.map((name) => shown("bayruha", name, 0.8)), ways.map((name) => shown("bayruha", name, 0.9))]).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [1, 1, 1]
    ]);
    expect(baskets.map((name) => [value("bayruha", name, "x", 1), value("bayruha", name, "y", 1)])).toEqual([
      [26, 7],
      [48, 5],
      [70, 7]
    ]);
    // Zakat al-Fitr: in the night before Eid, a sa' for each one in the home, all of one size, young or old; at dawn,
    // dates in three and barley in two; then, before the sun is up, they go to the homes of the poor; and the sun rises
    // over the open prayer ground.
    expect(words("fitr")).toEqual(["A sa' for every one", "Young or old", "Of dates or barley", "Given before the Eid prayer", "Then out to the prayer"]);
    const measures = names("fitr", /^a sa' for one in the home \d$/);
    const heaps = names("fitr", /^(dates|barley) in the sa' \d$/);
    const each = names("fitr", /^one for each: a spark over the sa' \d$/);
    expect([measures.map((name) => [shown("fitr", name, 0.17), value("fitr", name, "scale", 0.17)]), heaps]).toEqual([measures.map(() => [1, 1]), ["dates in the sa' 1", "dates in the sa' 2", "dates in the sa' 3", "barley in the sa' 4", "barley in the sa' 5"]]);
    expect([each.map((name) => shown("fitr", name, 0.34)), each.map((name) => shown("fitr", name, 0.4)), heaps.map((name) => shown("fitr", name, 0.38)), heaps.map((name) => shown("fitr", name, 0.56))]).toEqual([
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1]
    ]);
    expect([shown("fitr", "stars", 0.3), shown("fitr", "the thin moon", 0.3), shown("fitr", "dawn", 0.3), shown("fitr", "dawn", 0.55), shown("fitr", "stars", 0.55)]).toEqual([1, 1, 0, 1, 0]);
    expect([measures.map((name) => value("fitr", name, "x", 0.6)), measures.map((name) => [value("fitr", name, "x", 0.77), value("fitr", name, "y", 0.77)]), heaps.map((name) => value("fitr", name, "x", 0.77))]).toEqual([
      [0, 0, 0, 0, 0],
      [
        [88, -8],
        [85, -8],
        [82, -8],
        [88, -4],
        [85, -4]
      ],
      [88, 85, 82, 88, 85]
    ]);
    expect([shown("fitr", "the sun rising", 0.8), shown("fitr", "light over the homes of the poor", 0.8), shown("fitr", "the sun rising", 0.95), shown("fitr", "light over the prayer ground", 0.95), shown("fitr", "morning", 0.95)]).toEqual([0, 1, 1, 1, 1]);
    // The morning of Eid: three dates on a plate by the door, taken one at a time, before the way out; the short spear
    // planted at the open prayer ground; the prayer first, then the rings of the khutbah; and home by another way.
    expect(words("eid")).toEqual(["The morning of Eid", "Dates first, an odd number", "Out to the open prayer ground", "The prayer first, then the khutbah", "Home by another way"]);
    const dates = names("eid", /^date \d of three$/);
    expect([0.2, 0.243, 0.268, 0.3].map((t) => dates.map((name) => shown("eid", name, t)))).toEqual([
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 0]
    ]);
    const out = names("eid", /^the way out, part \d$/);
    const home = names("eid", /^the way home, another way, part \d$/);
    expect([shown("eid", "an odd number: three", 0.32), out.map((name) => shown("eid", name, 0.36)), out.map((name) => shown("eid", name, 0.5)), shown("eid", "the short spear, planted", 0.44), shown("eid", "the short spear, planted", 0.48)]).toEqual([1, [0, 0, 0], [1, 1, 1], 0, 1]);
    const rings = names("eid", /^the khutbah, ring \d$/);
    expect([shown("eid", "calm of the prayer", 0.6), rings.map((name) => shown("eid", name, 0.6)), shown("eid", "calm of the prayer", 0.7), rings.map((name) => shown("eid", name, 0.7))]).toEqual([1, [0, 0, 0], 0, [1, 1, 1]]);
    expect([home.map((name) => shown("eid", name, 0.7)), home.map((name) => shown("eid", name, 0.95)), out.map((name) => shown("eid", name, 0.95)), shown("eid", "light over the home", 0.9), shown("eid", "light over the home", 1)]).toEqual([[0, 0, 0], [1, 1, 1], [0.3, 0.3, 0.3], 0, 1]);
    // Another way: no part of the way home is a part of the way out.
    const outPaths = out.map((name) => part("eid", name).svg);
    expect(home.filter((name) => outPaths.includes(part("eid", name).svg))).toEqual([]);
  });

  test("the scenes of everyday charity show each moment in its order, and draw no Prophet, no Companion and no person", () => {
    const everyday: SignKind[] = ["thirsty-dog", "thorny-branch", "planting", "waqf"];
    for (const kind of everyday) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|helper|servant|angels?|guests?|wife|child|children|boy|girl|baby|mother|father|son|face|hands?|feet|foot|Umar|teeth|mouth)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // A good deed's reward is sparks rising from where it was done: nothing comes down from the sky.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?)\b|coming down|from the sky/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    // Water for a thirsty dog: a dashed way comes to the well and goes down into it, and the water stirs where he drank;
    // the dog comes, panting, and licks the mud; the shoe rises out of the well, full of water, goes along the way to
    // the dog and pours the water out, and the dog drinks; it lifts its head and wags its tail as sparks rise from
    // where the good was done; and a lamb and two sparrows come to the water too. Each moment ends at rest.
    expect(words("thirsty-dog")).toEqual(["Thirsty, he drank from a well", "A dog licking mud from thirst", "He filled his shoe with water", "And gave the dog a drink", "Allah thanked him and forgave him", "A reward for any living being"]);
    const dog = ["the thirsty dog", "the dog's head, licking", "the dog's tail, hanging"];
    expect([shown("thirsty-dog", "the way to the well", 0), shown("thirsty-dog", "the way to the well", 0.16), shown("thirsty-dog", "the way down into the well", 0.16), dog.map((name) => shown("thirsty-dog", name, 0.16)), shown("thirsty-dog", "mud the dog licks", 0.16)]).toEqual([0, 1, 1, [0, 0, 0], 0]);
    expect([dog.map((name) => [shown("thirsty-dog", name, 0.32), value("thirsty-dog", name, "x", 0.32)]), value("thirsty-dog", "the dog's head, licking", "rotate", 0.32), shown("thirsty-dog", "mud the dog licks", 0.32), shown("thirsty-dog", "the shoe, full of water", 0.32)]).toEqual([dog.map(() => [1, 0]), -68, 1, 0]);
    expect([shown("thirsty-dog", "the shoe, full of water", 0.48), value("thirsty-dog", "the shoe, full of water", "y", 0.48), value("thirsty-dog", "the shoe, full of water", "scale", 0.48), value("thirsty-dog", "the shoe, full of water", "rotate", 0.48), shown("thirsty-dog", "drops from the shoe", 0.48), shown("thirsty-dog", "water poured out for the dog", 0.48)]).toEqual([1, -6, 1, 0, 1, 0]);
    expect([value("thirsty-dog", "the shoe, full of water", "x", 0.64), value("thirsty-dog", "the shoe, full of water", "rotate", 0.64), shown("thirsty-dog", "water poured out for the dog", 0.64), value("thirsty-dog", "water poured out for the dog", "scale", 0.64), shown("thirsty-dog", "the way to the dog", 0.64), value("thirsty-dog", "the dog's head, licking", "rotate", 0.64), shown("thirsty-dog", "light where the good was done", 0.64)]).toEqual([44, 95, 1, 1, 1, -68, 0]);
    const deed = names("thirsty-dog", /^a spark of the good deed, rising \d$/);
    expect([shown("thirsty-dog", "the shoe, full of water", 0.82), value("thirsty-dog", "the dog's head, licking", "rotate", 0.82), shown("thirsty-dog", "the dog's tail, hanging", 0.82), shown("thirsty-dog", "the dog's tail, wagging", 0.82), shown("thirsty-dog", "light where the good was done", 0.82), deed.map((name) => [shown("thirsty-dog", name, 0.82), value("thirsty-dog", name, "y", 0.82)])]).toEqual([0, 8, 0, 1, 1, deed.map(() => [1, -24])]);
    const living = ["a lamb comes to drink", "a sparrow comes to drink", "another sparrow comes to drink"];
    expect([deed.length, living.map((name) => shown("thirsty-dog", name, 0.82)), living.map((name) => [shown("thirsty-dog", name, 1), value("thirsty-dog", name, "x", 1), value("thirsty-dog", name, "y", 1)])]).toEqual([5, [0, 0, 0], living.map(() => [1, 0, 0])]);
    // The thorny branch: the dashed way goes along the road; the wind blows a thorny branch across it; the branch moves
    // itself off the road, and the way goes on; sparks rise from where it lay; and camels, a donkey and sheep pass
    // along the clear road.
    expect(words("thorny-branch")).toEqual(["Walking along a way", "A thorny branch across the way", "He moved it out of the way", "Allah thanked him and forgave him", "Removing harm from the way is charity"]);
    const along = names("thorny-branch", /^the way along the road \d$/);
    const on = names("thorny-branch", /^the way on along the road \d$/);
    expect([along.map((name) => shown("thorny-branch", name, 0)), along.map((name) => shown("thorny-branch", name, 0.18)), shown("thorny-branch", "the thorny branch", 0.18), on.map((name) => shown("thorny-branch", name, 0.18))]).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      0,
      [0, 0, 0]
    ]);
    const branch = (t: number) => (["opacity", "x", "y", "rotate"] as const).map((key) => value("thorny-branch", "the thorny branch", key, t));
    expect([branch(0.4), shown("thorny-branch", "a gust of wind", 0.25), shown("thorny-branch", "a gust of wind", 0.4), on.map((name) => shown("thorny-branch", name, 0.4))]).toEqual([[1, 0, 0, 0], 1, 0, [0, 0, 0]]);
    expect([branch(0.6), on.map((name) => shown("thorny-branch", name, 0.6)), shown("thorny-branch", "light where the road was cleared", 0.6)]).toEqual([[1, -14, 17, 30], [1, 1, 1], 0]);
    const cleared = names("thorny-branch", /^a spark of the good deed, rising \d$/);
    expect([cleared.length, shown("thorny-branch", "light where the road was cleared", 0.8), cleared.map((name) => [shown("thorny-branch", name, 0.8), value("thorny-branch", name, "y", 0.8)])]).toEqual([5, 1, cleared.map(() => [1, -24])]);
    const passing = names("thorny-branch", /on the road$/);
    expect([passing, passing.map((name) => value("thorny-branch", name, "x", 0.8) > 60), passing.map((name) => [shown("thorny-branch", name, 1), value("thorny-branch", name, "x", 1)])]).toEqual([
      ["a camel on the road", "another camel on the road", "a donkey on the road", "sheep on the road"],
      [true, true, true, true],
      passing.map(() => [1, 0])
    ]);
    // Planting: a seed falls into the soil, which covers it; a sprout, then a tree with its fruit; a bird eats a fruit;
    // a fruit goes along a dashed way to a home; a goat eats the low fruit; then sparks rise from the tree.
    expect(words("planting")).toEqual(["Plant a tree or sow a seed", "It grows and bears fruit", "A bird eats from it", "A person eats from it", "An animal eats from it", "Charity for the one who planted it"]);
    expect([shown("planting", "the way to the soil", 0.16), shown("planting", "a seed, sown", 0.16), value("planting", "a seed, sown", "y", 0.16), shown("planting", "the soil over the seed", 0.16), shown("planting", "a sprout", 0.16), shown("planting", "the tree, grown", 0.16)]).toEqual([1, 0, 12, 1, 0, 0]);
    const fruits = ["the fruit the bird eats", "the fruit taken home", "the low fruit the goat eats"];
    expect([shown("planting", "the tree, grown", 0.32), value("planting", "the tree, grown", "scale", 0.32), shown("planting", "fruit on the tree", 0.32), fruits.map((name) => shown("planting", name, 0.32)), shown("planting", "a sprout", 0.32), shown("planting", "a bird eats", 0.32)]).toEqual([1, 1, 1, [1, 1, 1], 0, 0]);
    expect([[shown("planting", "a bird eats", 0.48), value("planting", "a bird eats", "x", 0.48), value("planting", "a bird eats", "y", 0.48)], fruits.map((name) => shown("planting", name, 0.48)), shown("planting", "the way from the home to the tree", 0.48)]).toEqual([[1, 0, 0], [0, 1, 1], 0]);
    expect([shown("planting", "the way from the home to the tree", 0.64), [shown("planting", "the fruit taken home", 0.64), value("planting", "the fruit taken home", "x", 0.64), value("planting", "the fruit taken home", "y", 0.64)], shown("planting", "a goat eats", 0.64)]).toEqual([1, [1, -55, 18.6], 0]);
    expect([[shown("planting", "a goat eats", 0.82), value("planting", "a goat eats", "x", 0.82)], fruits.map((name) => shown("planting", name, 0.82)), shown("planting", "light behind the tree", 0.82)]).toEqual([[1, 0], [0, 0, 0], 0]);
    const charity = names("planting", /^a spark of charity, rising \d$/);
    expect([charity.length, shown("planting", "light behind the tree", 1), charity.map((name) => [shown("planting", name, 1), value("planting", name, "y", 1)]), shown("planting", "a bird eats", 1), shown("planting", "a goat eats", 1)]).toEqual([5, 1, charity.map(() => [1, -22]), 1, 1]);
    // Umar's land at Khaybar: its palms, ripe; a wall rises around the land, with its gate; baskets of its dates go out
    // to a home of the poor and to relatives; silver comes to buy it and goes back, and the dates ripen again; the
    // keeper's home, his dates, and a basket for a friend; and a basket goes to his storeroom, stops, and goes on to the
    // home of the poor: the storeroom stays empty.
    expect(words("waqf")).toEqual(["Land at Khaybar, the best he had", "Keep the land itself", "And give its fruit in charity", "Never sold, gifted or inherited", "Its keeper may eat and feed a friend", "Storing nothing for himself"]);
    const walls = ["the back wall", "the side walls", "the front wall", "the gate"];
    expect([shown("waqf", "ripe dates", 0.16), shown("waqf", "the best he had", 0.16), walls.map((name) => shown("waqf", name, 0.16)), walls.map((name) => shown("waqf", name, 0.32)), value("waqf", "the front wall", "scaleY", 0.32)]).toEqual([1, 1, [0, 0, 0, 0], [1, 1, 1, 1], 1]);
    const given = ["a basket of its dates for the poor", "a basket of its dates for relatives"];
    expect([given.map((name) => shown("waqf", name, 0.32)), given.map((name) => [shown("waqf", name, 0.48), value("waqf", name, "x", 0.48), value("waqf", name, "y", 0.48)]), shown("waqf", "ripe dates", 0.48)]).toEqual([[0, 0], [[1, -50, 10], [1, 50, 10]], 0]);
    expect([0.53, 0.64].map((t) => value("waqf", "silver to buy the land, sent back", "x", t))).toEqual([-58, 0]);
    expect([shown("waqf", "silver to buy the land, sent back", 0.64), shown("waqf", "ripe dates", 0.64), given.map((name) => shown("waqf", name, 0.64)), shown("waqf", "the keeper's home", 0.64)]).toEqual([1, 1, [0, 0], 0]);
    expect([shown("waqf", "the keeper's home", 0.82), shown("waqf", "the keeper's storeroom, empty", 0.82), value("waqf", "dates for the keeper", "x", 0.82), [value("waqf", "dates for a friend", "x", 0.82), value("waqf", "dates for a friend", "y", 0.82)], shown("waqf", "silver to buy the land, sent back", 0.82)]).toEqual([1, 1, -26, [-36, 16], 0]);
    expect([0.82, 0.87, 1].map((t) => [shown("waqf", "a basket not stored", t), value("waqf", "a basket not stored", "x", t), value("waqf", "a basket not stored", "y", t)])).toEqual([
      [0, 0, 0],
      [1, -9, 0],
      [1, -91, 15]
    ]);
    // Nothing is ever put in the storeroom: it has no basket and no dates in it.
    expect(part("waqf", "the keeper's storeroom, empty").svg.includes("<ellipse")).toBe(false);
  });

  test("the scenes of manners and worship show each moment in its order, and draw no Prophet, no Companion and no person", () => {
    const manners: SignKind[] = ["permission", "adhan", "wet-grain", "rumah"];
    for (const kind of manners) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|helper|servant|angels?|guests?|wife|child|children|boy|girl|baby|mother|father|son|face|hands?|fingers?|feet|foot|Umar|Uthman|Bilal|Musa|Ubayy|Sa'id|teeth|mouth)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // A good deed's reward is sparks rising from where it was done: nothing comes down from the sky. And no bell or
      // horn is drawn for the call to prayer.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?)\b|coming down|from the sky|\b(bells?|horns?|trumpets?)\b/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const order = (kind: SignKind, name: string) => signArt(kind).parts.findIndex((each) => each.name === name);
    // Asking permission three times: a dashed way comes to a shut door; each asking is a voice's arcs toward the door,
    // and one more of three rings is counted; the door stays shut. The way to the door goes, and a way back is drawn
    // from it; then two ways, one of them the youngest's, come from the gathering place to the door, and the witness's
    // voice is heard there.
    expect(words("permission")).toEqual(["At Umar's door", "He asked permission once", "Then a second time", "A third time: no permission given", "So he went back", "The youngest went with him as witness"]);
    const toDoor = names("permission", /^the way to the door, part \d$/);
    const askings = ["asking, the first time", "asking, the second time", "asking, the third time"];
    const counted = ["asked once", "asked a second time", "asked a third time"];
    expect([toDoor.map((name) => shown("permission", name, 0)), toDoor.map((name) => shown("permission", name, 0.16)), shown("permission", "three rings, to count the askings", 0.16), askings.map((name) => shown("permission", name, 0.16)), counted.map((name) => shown("permission", name, 0.16))]).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      0,
      [0, 0, 0],
      [0, 0, 0]
    ]);
    expect([0.22, 0.38, 0.54, 0.64].map((t) => askings.map((name) => shown("permission", name, t)))).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0]
    ]);
    expect([0.32, 0.48, 0.64].map((t) => counted.map((name) => shown("permission", name, t)))).toEqual([
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1]
    ]);
    expect(part("permission", "its door, shut").keys).toBeUndefined();
    const back = names("permission", /^the way back, part \d$/);
    expect([toDoor.map((name) => shown("permission", name, 0.82)), back.map((name) => shown("permission", name, 0.64)), back.map((name) => shown("permission", name, 0.82))]).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [1, 1, 1]
    ]);
    const again = names("permission", /^the way to the door again, part \d$/);
    const youngest = names("permission", /^the way of the youngest, the witness, part \d$/);
    expect([back.map((name) => shown("permission", name, 1)), again.map((name) => shown("permission", name, 1)), youngest.map((name) => shown("permission", name, 1)), shown("permission", "the witness tells it at the door", 0.82), shown("permission", "the witness tells it at the door", 1)]).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [1, 1, 1],
      0,
      1
    ]);
    // The first call to prayer: before it, three ways reach the masjid one at a time, each at its own guess; then the
    // call rises from the masjid and spreads over Madinah, and the homes' doors light up; the iqamah is rings at the
    // masjid's door; and calm ways come to it from every home, slowly, part by part.
    expect(words("adhan")).toEqual(["They used to guess the prayer time", "O Bilal, stand and call to prayer", "Calling the people to prayer", "When you hear the iqamah", "Walk to it calmly, do not rush"]);
    const guesses = [1, 2, 3].map((i) => names("adhan", new RegExp(`^a way to the prayer at a guess ${i}, part \\d$`)));
    expect([0.005, 0.04, 0.09, 0.18].map((t) => guesses.map((list) => shown("adhan", list[list.length - 1], t)))).toEqual([
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1]
    ]);
    const call = names("adhan", /^the call to prayer, ring \d$/);
    const over = names("adhan", /^the call over Madinah, ring \d$/);
    const iqamah = names("adhan", /^the iqamah, ring \d$/);
    const calm = names("adhan", /^a calm way to the prayer \d, part \d$/);
    expect([guesses.flat().map((name) => shown("adhan", name, 0.4)), call.map((name) => shown("adhan", name, 0.18)), call.map((name) => shown("adhan", name, 0.4)), over.map((name) => shown("adhan", name, 0.4))]).toEqual([guesses.flat().map(() => 0), [0, 0, 0], [1, 1, 1], [0, 0, 0]]);
    expect([over.map((name) => [shown("adhan", name, 0.6), value("adhan", name, "scale", 0.6)]), shown("adhan", "the doors of the homes, hearing the call", 0.4), shown("adhan", "the doors of the homes, hearing the call", 0.6), iqamah.map((name) => shown("adhan", name, 0.6))]).toEqual([over.map(() => [1, 1]), 0, 1, [0, 0, 0]]);
    expect([call.map((name) => shown("adhan", name, 0.8)), over.map((name) => shown("adhan", name, 0.8)), iqamah.map((name) => shown("adhan", name, 0.8)), calm.map((name) => shown("adhan", name, 0.8))]).toEqual([[0, 0, 0], [0, 0, 0], [1, 1, 1], calm.map(() => 0)]);
    expect([calm.length, calm.filter((name) => name.endsWith("part 3")).map((name) => shown("adhan", name, 0.88)), calm.map((name) => shown("adhan", name, 1))]).toEqual([12, [0, 0, 0, 0], calm.map(() => 1)]);
    // The wet grain: rain from a cloud wets the heap; dry grain is heaped over the wet, covering it; a dashed way comes
    // to the heap and an opening shows the wet inside; the wet part comes up on top; and buyers' ways come to see it.
    expect(words("wet-grain")).toEqual(["Rain fell on a heap of food", "The wet part hidden under dry", "Inside, it was wet", "Why not on top, for people to see?", "Whoever cheats is not of me"]);
    expect([shown("wet-grain", "the heap, wet with rain", 0), shown("wet-grain", "rain on the heap", 0.08), shown("wet-grain", "the heap, wet with rain", 0.18), shown("wet-grain", "rain on the heap", 0.18), shown("wet-grain", "a rain cloud", 0.18), shown("wet-grain", "dry grain heaped over the wet", 0.18)]).toEqual([0, 1, 1, 0, 0, 0]);
    expect([shown("wet-grain", "dry grain heaped over the wet", 0.4), value("wet-grain", "dry grain heaped over the wet", "scale", 0.4), shown("wet-grain", "inside, wet", 0.4), shown("wet-grain", "the wet part, on top", 0.4)]).toEqual([1, 1, 0, 0]);
    expect([order("wet-grain", "the heap, wet with rain") < order("wet-grain", "dry grain heaped over the wet"), order("wet-grain", "dry grain heaped over the wet") < order("wet-grain", "the wet part, on top")]).toEqual([true, true]);
    const passing = names("wet-grain", /^the way of one passing by, part \d$/);
    expect([passing.map((name) => shown("wet-grain", name, 0.6)), shown("wet-grain", "inside, wet", 0.6), shown("wet-grain", "water inside", 0.6), shown("wet-grain", "the wet part, on top", 0.6)]).toEqual([[1, 1], 1, 1, 0]);
    expect([passing.map((name) => shown("wet-grain", name, 0.8)), shown("wet-grain", "inside, wet", 0.8), [shown("wet-grain", "the wet part, on top", 0.8), value("wet-grain", "the wet part, on top", "y", 0.8)], shown("wet-grain", "the wet part, seen by all", 0.8)]).toEqual([[0, 0], 0, [1, 0], 0]);
    const buyers = names("wet-grain", /^a buyer's way \d, part \d$/);
    expect([buyers.length, buyers.map((name) => shown("wet-grain", name, 0.8)), buyers.map((name) => shown("wet-grain", name, 1)), shown("wet-grain", "the wet part, seen by all", 1)]).toEqual([4, [0, 0, 0, 0], [1, 1, 1, 1], 1]);
    // The well of Rumah: a dashed way comes to the place of the well, and the well is dug and fills with water; ways
    // come to it and buckets come up full; camels for the army come in, a dashed way comes to them, and saddles, packs
    // and provisions are on them; then sparks rise from the well and from the camels.
    expect(words("rumah")).toEqual(["Whoever digs the well of Rumah", "And Uthman dug it", "Its water for all the Muslims", "Whoever equips the army of hardship", "And Uthman equipped it", "Both were promised Paradise"]);
    const toWell = names("rumah", /^the way to the well, part \d$/);
    expect([shown("rumah", "the place of the well", 0.16), shown("rumah", "where the well would be", 0.16), toWell.map((name) => shown("rumah", name, 0.16)), shown("rumah", "the well of Rumah, dug", 0.16), shown("rumah", "its water", 0.16)]).toEqual([1, 1, [0, 0], 0, 0]);
    expect([toWell.map((name) => shown("rumah", name, 0.32)), [shown("rumah", "the well of Rumah, dug", 0.32), value("rumah", "the well of Rumah, dug", "scaleY", 0.32)], shown("rumah", "its water", 0.32), shown("rumah", "where the well would be", 0.32)]).toEqual([[1, 1], [1, 1], 1, 0]);
    const comers = names("rumah", /^a way to the water \d$/);
    const buckets = names("rumah", /^a bucket, full, for all who come \d$/);
    expect([comers.map((name) => shown("rumah", name, 0.32)), buckets.map((name) => shown("rumah", name, 0.32)), comers.map((name) => shown("rumah", name, 0.48)), buckets.map((name) => [shown("rumah", name, 0.48), value("rumah", name, "y", 0.48)])]).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [1, 1, 1],
      buckets.map(() => [1, 0])
    ]);
    const camels = names("rumah", /^a camel for the army \d$/);
    const packs = names("rumah", /^saddle and packs \d$/);
    expect([camels.map((name) => shown("rumah", name, 0.48)), camels.map((name) => [shown("rumah", name, 0.64), value("rumah", name, "x", 0.64)]), packs.map((name) => shown("rumah", name, 0.64)), shown("rumah", "the way to the camels", 0.64)]).toEqual([
      [0, 0, 0],
      camels.map(() => [1, 0]),
      [0, 0, 0],
      0
    ]);
    expect([shown("rumah", "the way to the camels", 0.82), packs.map((name) => [shown("rumah", name, 0.82), value("rumah", name, "scale", 0.82)]), shown("rumah", "provisions for the army", 0.82)]).toEqual([1, packs.map(() => [1, 1]), 1]);
    const sparks = names("rumah", /^a spark of the good deed, rising \d$/);
    expect([sparks.length, sparks.map((name) => shown("rumah", name, 0.82)), sparks.map((name) => [shown("rumah", name, 1), value("rumah", name, "y", 1)])]).toEqual([6, sparks.map(() => 0), sparks.map(() => [1, -18])]);
  });

  test("the scenes of the Companions' stories and of the river at the door show each moment in its order, and draw no Prophet, no Companion and no person", () => {
    const companions: SignKind[] = ["river-at-the-door", "tabuk", "thawr", "plague"];
    for (const kind of companions) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helper|servant|angels?|guests?|wife|child|children|boy|girl|baby|mother|father|son|daughter|face|hands?|fingers?|feet|foot|rider|shepherd|guide|tracker|Ka'b|Abu Bakr|Asma|Umar|Ubaydah|Abd ar-Rahman|Mu'adh|Talhah|Hilal|Murarah|Qatadah|Suraqah|teeth|mouth)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Joy is sparks rising from where it was: nothing comes down from the sky, and nothing is drawn for Allah. At the
      // cave of Thawr, no spider and no dove is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?)\b|coming down|from the sky|Allah|divine|spiders?|webs?|doves?|pigeons?|nests?/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    // A river at the door: it flows by a home; a dashed way goes down to it five times through one day, from dawn to
    // night, and each time the day's dirt is carried off and one more of five rings is filled. Asked if any dirt would
    // be left, the water flows clean and sparkling; then five lights glow for the five prayers.
    expect(words("river-at-the-door")).toEqual(["If a river ran by your door", "And you bathed in it five times a day", "Would any dirt be left on you?", "Not a trace of dirt would be left", "By the five prayers, Allah wipes out sins"]);
    const times = ["first", "second", "third", "fourth", "fifth"];
    const toRiver = times.map((each) => `the way to the river, the ${each} time`);
    const dirt = times.map((each) => `the day's dirt, carried off, the ${each} time`);
    const bathed = times.map((each) => `bathed, the ${each} time`);
    expect([shown("river-at-the-door", "a river at its door", 0), [shown("river-at-the-door", "a river at its door", 0.18), value("river-at-the-door", "a river at its door", "scaleY", 0.18)], shown("river-at-the-door", "the river flowing", 0.18), all("river-at-the-door", toRiver, 0.18), shown("river-at-the-door", "five rings, to count the baths", 0.18)]).toEqual([0, [1, 1], 1, [0, 0, 0, 0, 0], 0]);
    expect([0.23, 0.26, 0.29, 0.33, 0.36].map((t) => all("river-at-the-door", bathed, t))).toEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1]
    ]);
    expect([0.204, 0.236, 0.3].map((t) => value("river-at-the-door", "the sun, through the day", "x", t))).toEqual([-62, 0, 64]);
    expect([all("river-at-the-door", toRiver, 0.4), all("river-at-the-door", dirt, 0.4), shown("river-at-the-door", "night", 0.4), shown("river-at-the-door", "the way to the river, once more", 0.4), shown("river-at-the-door", "the way to the river, once more", 0.6), shown("river-at-the-door", "the water, clean and sparkling", 0.6)]).toEqual([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], 1, 0, 1, 0]);
    const prayers = [1, 2, 3, 4, 5].map((i) => `the five prayers, ${i} lit`);
    expect([shown("river-at-the-door", "the water, clean and sparkling", 0.8), all("river-at-the-door", dirt, 0.8), all("river-at-the-door", prayers, 0.8), all("river-at-the-door", prayers, 1), all("river-at-the-door", bathed, 1)]).toEqual([1, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]);
    // Ka'b at Tabuk: his two she-camels by his home, ripe dates and shade in the heat; the army's ways leave for Tabuk,
    // its camels going up the road, while his ways out to get ready come back with nothing done; the army's ways come
    // back, his way goes to the masjid and the truth is told; fifty nights of dark, the earth closing in, his greeting
    // with no answer; a letter from Ghassan comes to his door and goes into the oven's fire; then on the fiftieth
    // morning the call rises from the top of Sala', a horse gallops with the good news, and sparks of joy rise.
    expect(words("tabuk")).toEqual(["Never stronger, never richer", "He kept delaying, and the army left", "He told the plain truth", "Fifty nights, no one spoke to him", "A king's letter went into the oven", "O Ka'b ibn Malik, be happy!"]);
    const toTabuk = names("tabuk", /^the army's way to Tabuk \d, part \d$/);
    const back = names("tabuk", /^the army's way back from Tabuk \d, part \d$/);
    const armyCamels = names("tabuk", /^a camel of the army \d$/);
    const readying = ["his way out to get ready, the first morning", "his way out to get ready, the next morning"];
    expect([all("tabuk", ["his first she-camel", "his second she-camel", "ripe dates on the palms", "the pleasant shade", "heat in the air"], 0.16), all("tabuk", toTabuk, 0.16)]).toEqual([[1, 1, 1, 1, 1], toTabuk.map(() => 0)]);
    expect([toTabuk.length, all("tabuk", armyCamels, 0.21), all("tabuk", readying, 0.21), all("tabuk", readying, 0.25)]).toEqual([6, [1, 1, 0], [1, 0], [0, 1]]);
    expect([all("tabuk", toTabuk, 0.32), all("tabuk", armyCamels, 0.32), all("tabuk", readying, 0.32), all("tabuk", ["his first she-camel", "his second she-camel"], 0.32)]).toEqual([toTabuk.map(() => 1), [0, 0, 0], [0, 0], [1, 1]]);
    expect([all("tabuk", toTabuk, 0.48), all("tabuk", back, 0.48), all("tabuk", ["his way to the masjid, part 1", "his way to the masjid, part 2", "the truth, told"], 0.48), shown("tabuk", "the truth, told", 0.34)]).toEqual([toTabuk.map(() => 0), back.map(() => 1), [1, 1, 1], 0]);
    expect([all("tabuk", back, 0.64), shown("tabuk", "the truth, told", 0.64), shown("tabuk", "the sun, in great heat", 0.64), shown("tabuk", "night", 0.64) > 0.5, [shown("tabuk", "the earth, closing in", 0.64), value("tabuk", "the earth, closing in", "scale", 0.64)], shown("tabuk", "his greeting, with no answer", 0.6), shown("tabuk", "his greeting, with no answer", 0.64)]).toEqual([back.map(() => 0), 0, 0, true, [1, 1], 1, 0]);
    expect([shown("tabuk", "a letter from Ghassan", 0.64), [shown("tabuk", "a letter from Ghassan", 0.72), value("tabuk", "a letter from Ghassan", "x", 0.72)], shown("tabuk", "a letter from Ghassan", 0.82), shown("tabuk", "the oven's fire, burning it", 0.82), shown("tabuk", "the oven's fire, burning it", 0.7)]).toEqual([0, [1, 0], 0, 1, 0]);
    const call = names("tabuk", /^the call from the top of Sala', ring \d$/);
    const joy = names("tabuk", /^a spark of joy, rising \d$/);
    expect([all("tabuk", call, 0.82), shown("tabuk", "a horse, galloping with the good news", 0.82), joy.map((name) => shown("tabuk", name, 0.82))]).toEqual([[0, 0, 0], 0, joy.map(() => 0)]);
    expect([all("tabuk", call, 1), shown("tabuk", "the call, heard at his home", 1), [shown("tabuk", "a horse, galloping with the good news", 1), value("tabuk", "a horse, galloping with the good news", "x", 1)], joy.length, joy.map((name) => [shown("tabuk", name, 1), value("tabuk", name, "y", 1)]), shown("tabuk", "night", 1), shown("tabuk", "the earth, closing in", 1), shown("tabuk", "the sun, in great heat", 1)]).toEqual([[1, 1, 1], 1, [1, 0], 6, joy.map(() => [1, -14]), 0, 0, 1]);
    // The cave of Thawr: two she-camels are fed the samur's leaves while four months go by; at noon a way comes to the
    // door with the news; a bag of food for the way is tied with one half of a belt; by night two ways go up to the
    // cave, three rings count three nights there, and sheep graze below it; the ways of those chasing them come up
    // above the cave and stop; then a way brings their two camels, and a way sets out by the coast.
    expect(words("thawr")).toEqual(["Two camels, fed for four months", "At noon came the news: it is time", "Asma cut her belt to tie the food", "Three nights in the cave of Thawr", "Two, the third of whom is Allah", "Then the guide brought the camels"]);
    const months = names("thawr", /^a month gone, \d$/);
    const noon = ["the way that came at noon, part 1", "the way that came at noon, part 2", "the news at the door: it is time"];
    expect([months.length, all("thawr", months, 0.16), shown("thawr", "two she-camels, fed and ready", 0.16), shown("thawr", "its leaves, falling", 0.16), all("thawr", noon, 0.16)]).toEqual([4, [1, 1, 1, 1], 1, 1, [0, 0, 0]]);
    expect([all("thawr", months, 0.32), all("thawr", noon, 0.32), value("thawr", "the sun", "x", 0.32), value("thawr", "the sun", "y", 0.32), shown("thawr", "a bag of food for the way", 0.32)]).toEqual([[0, 0, 0, 0], [1, 1, 1], 0, 0, 0]);
    const belt = ["a bag of food for the way", "a belt, one half", "the belt's other half, tying the bag", "the bag, tied"];
    expect([all("thawr", noon, 0.48), all("thawr", belt, 0.48), [value("thawr", "the belt's other half, tying the bag", "x", 0.39), value("thawr", "the belt's other half, tying the bag", "x", 0.48)], shown("thawr", "the bag, tied", 0.42)]).toEqual([[0, 0, 0], [1, 1, 1, 1], [0, -18.5], 0]);
    const up = names("thawr", /^a way up to the cave \d, part \d$/);
    const nights = names("thawr", /^a night in the cave, \d$/);
    expect([0.545, 0.565, 0.585, 0.605].map((t) => all("thawr", nights, t))).toEqual([
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1]
    ]);
    expect([all("thawr", ["night", "the moon and stars of the nights", "three rings, to count the nights"], 0.64), up.length, all("thawr", up, 0.64), [shown("thawr", "sheep, grazing below the cave by night", 0.64), value("thawr", "sheep, grazing below the cave by night", "x", 0.64)], shown("thawr", "two she-camels, fed and ready", 0.64), all("thawr", belt, 0.64)]).toEqual([[1, 1, 1], 6, up.map(() => 1), [1, 0], 0, [0, 0, 0, 0]]);
    const chasing = names("thawr", /^the way of those chasing them \d, part \d$/);
    expect([chasing.length, all("thawr", chasing, 0.64), all("thawr", chasing, 0.82), all("thawr", up, 0.82), all("thawr", nights, 0.82)]).toEqual([8, chasing.map(() => 0), chasing.map(() => 1), up.map(() => 1), [1, 1, 1]]);
    const brought = ["the way that brought the camels, part 1", "the way that brought the camels, part 2"];
    const coast = names("thawr", /^the way setting out, by the coast, part \d$/);
    expect([all("thawr", brought, 0.82), shown("thawr", "their two she-camels, brought", 0.82), all("thawr", coast, 0.82)]).toEqual([[0, 0], 0, [0, 0, 0]]);
    expect([all("thawr", brought, 1), [shown("thawr", "their two she-camels, brought", 1), value("thawr", "their two she-camels, brought", "x", 1)], all("thawr", coast, 1), all("thawr", chasing, 1), all("thawr", up, 1), shown("thawr", "night", 1), shown("thawr", "the sun", 1)]).toEqual([[1, 1], [1, 0], [1, 1, 1], chasing.map(() => 0), up.map(() => 0), 0, 1]);
    // The plague in Sham: a way comes from Madinah to the tents at Sargh, and ways from Sham meet it; sickness hangs
    // over Sham and the news is told at Sargh; three counsels are voices, two differing and the last saying go back;
    // after a night at Sargh, the morning sun rises and the way goes back to Madinah; a valley's green side and dry side
    // come, camels grazing on the green; then a way brings the hadith, and a way to the ringed land of the plague
    // stops outside it, while the ways inside it stay.
    expect(words("plague")).toEqual(["At Sargh, on the way to Sham", "Plague had broken out in Sham", "He asked them all for counsel", "We will go back in the morning", "From Allah's decree to Allah's decree", "Do not go to it, nor flee from it"]);
    const toSargh = ["the way from Madinah to Sargh, part 1", "the way from Madinah to Sargh, part 2", "a way from Sham to Sargh 1", "a way from Sham to Sargh 2"];
    expect([all("plague", toSargh, 0.16), shown("plague", "the sickness over Sham", 0.16), shown("plague", "the sickness over Sham", 0.32), shown("plague", "the news, told at Sargh", 0.26)]).toEqual([[1, 1, 1, 1], 0, 1, 1]);
    const counsels = ["the counsel of the first emigrants, differing", "the counsel of the Ansar, differing", "the counsel of the elders of Quraysh: go back"];
    expect([0.32, 0.37, 0.41, 0.48].map((t) => all("plague", counsels, t))).toEqual([
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
    const home = ["the way back to Madinah, part 1", "the way back to Madinah, part 2"];
    expect([all("plague", home, 0.48), all("plague", toSargh, 0.64), shown("plague", "a night at Sargh", 0.52), [shown("plague", "the morning sun, rising", 0.64), value("plague", "the morning sun, rising", "y", 0.64)], all("plague", home, 0.64), all("plague", counsels, 0.64)]).toEqual([[0, 0], [0, 0, 0, 0], 1, [1, 0], [1, 1], [0, 0, 0]]);
    const valley = ["a valley's green side", "a valley's dry side", "the valley's dry bed"];
    const grazing = names("plague", /^a camel grazing on the green side \d$/);
    expect([all("plague", valley, 0.64), all("plague", grazing, 0.64), all("plague", valley, 0.82), grazing.map((name) => [shown("plague", name, 0.82), value("plague", name, "x", 0.82), value("plague", name, "y", 0.82)])]).toEqual([[0, 0, 0], [0, 0, 0], [1, 1, 1], grazing.map(() => [1, 0, 0])]);
    const hadith = ["a way that came with the hadith", "the hadith, told at Sargh", "the land of the plague, ringed", "a way toward it, stopping outside", "where it stops", "a way inside it, staying 1", "a way inside it, staying 2"];
    expect([all("plague", hadith, 0.82), all("plague", hadith, 1)]).toEqual([hadith.map(() => 0), hadith.map(() => 1)]);
  });

  test("the scenes of the likenesses he ﷺ gave show each moment in its order, and draw no Prophet, no Companion, no person and no hand", () => {
    const likenesses: SignKind[] = ["building", "mercy", "sanctuary", "musk", "shared-ship"];
    for (const kind of likenesses) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helper|servant|angels?|child|children|boy|girl|baby|mother|father|son|daughter|face|hands?|fingers?|feet|foot|rider|shepherd|herdsman|blacksmith|smith|seller|sailors?|crew|friends?|believers?|teeth|mouth)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing comes down from the sky, and nothing is drawn for Allah: the hundred parts of mercy are only rings to count
      // them, and a reward is sparks rising.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    // Rings to count are circles with an edge; a glow's circles have none.
    const circles = (kind: SignKind, list: string[]) => list.reduce((sum, name) => sum + (part(kind, name).svg.match(/<circle[^>]*stroke=/g) ?? []).length, 0);
    // The believers like a building: two bricks come together; the building rises row by row, then its roof, door and
    // windows; the wind comes, and a lone brick falls over while the wall stands, its joints holding; a dashed way comes
    // to the door asking; then voices from the building speak up for it, and sparks of reward rise.
    expect(words("building")).toEqual(["The believer to the believer", "Is like a building", "Each part holding up the other", "A man came asking for help", "Speak up for him, and be rewarded"]);
    const bricks = ["a brick, coming to the other", "the other brick, coming to it"];
    const rows = names("building", /^a row of bricks, \d from the ground$/);
    expect([rows.length, bricks.map((name) => [shown("building", name, 0.18), value("building", name, "x", 0.18)]), shown("building", "the two bricks, holding together", 0.18), all("building", rows, 0.18), shown("building", "its roof", 0.18)]).toEqual([9, [[1, 0], [1, 0]], 1, rows.map(() => 0), 0]);
    expect([rows.map((name) => [shown("building", name, 0.4), value("building", name, "y", 0.4)]), all("building", ["its roof", "its door and windows", ...bricks], 0.4), all("building", ["the two bricks, holding together", "a lone brick, standing by itself", "the wind", "each part holding up the other"], 0.4)]).toEqual([rows.map(() => [1, 0]), [1, 1, 1, 1], [0, 0, 0, 0]]);
    expect([shown("building", "the wind", 0.5), [shown("building", "a lone brick, standing by itself", 0.45), value("building", "a lone brick, standing by itself", "rotate", 0.45)], [shown("building", "a lone brick, standing by itself", 0.6), value("building", "a lone brick, standing by itself", "rotate", 0.6)], shown("building", "the wind", 0.6), shown("building", "each part holding up the other", 0.6), all("building", rows, 0.6)]).toEqual([1, [1, 0], [1, 90], 0, 1, rows.map(() => 1)]);
    const asking = ["the way that came asking, part 1", "the way that came asking, part 2", "asking, at the door"];
    const voices = names("building", /^a voice from the building, speaking up \d$/);
    const reward = names("building", /^a reward, rising \d$/);
    expect([all("building", asking, 0.6), all("building", asking, 0.8), all("building", voices, 0.8), all("building", reward, 0.8)]).toEqual([[0, 0, 0], [1, 1, 1], [0, 0, 0], reward.map(() => 0)]);
    expect([voices.length, all("building", voices, 1), shown("building", "asking, at the door", 1), reward.length, reward.map((name) => [shown("building", name, 1), value("building", name, "y", 1)])]).toEqual([3, [1, 1, 1], 0, 5, reward.map(() => [1, -12])]);
    // Mercy in a hundred parts: a hundred rings count the parts; one lights for the one part among all creation, and
    // warmth spreads over the land; a calf comes to her camel and a lamb to its ewe; the mare comes with her foal and
    // lifts her hooves from it; then the other ninety-nine rings light.
    expect(words("mercy")).toEqual(["Allah made mercy in a hundred parts", "One part among all creation", "By it, creatures are kind to each other", "A mare lifts her hoof from her foal", "He kept ninety-nine parts with Him"]);
    const hundred = names("mercy", /^a hundred rings, to count the parts of mercy, row \d$/);
    const kept = names("mercy", /^the ninety-nine parts, kept back, row \d$/);
    expect([circles("mercy", hundred), circles("mercy", ["the one part, among all creation"]), circles("mercy", kept)]).toEqual([100, 1, 99]);
    expect([all("mercy", hundred, 0.02), all("mercy", hundred, 0.18), shown("mercy", "the one part, among all creation", 0.18), shown("mercy", "warmth over all creation", 0.18)]).toEqual([[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], 0, 0]);
    const young = ["her calf, coming to the camel", "its lamb, coming to the ewe"];
    const kindness = ["the camel's kindness to her calf", "the ewe's kindness to its lamb"];
    expect([shown("mercy", "the one part, among all creation", 0.4), [shown("mercy", "warmth over all creation", 0.4), value("mercy", "warmth over all creation", "scale", 0.4)], all("mercy", young, 0.4), all("mercy", kindness, 0.4)]).toEqual([1, [1, 1], [0, 0], [0, 0]]);
    const mare = ["a mare, lifting her hooves from her foal", "her foal, beside her hooves", "the mare's care for her foal"];
    expect([young.map((name) => [shown("mercy", name, 0.6), value("mercy", name, "x", 0.6)]), all("mercy", kindness, 0.6), all("mercy", mare, 0.6)]).toEqual([[[1, 0], [1, 0]], [1, 1], [0, 0, 0]]);
    expect([all("mercy", mare, 0.8), value("mercy", "a mare, lifting her hooves from her foal", "x", 0.8), value("mercy", "a mare, lifting her hooves from her foal", "rotate", 0.66), value("mercy", "a mare, lifting her hooves from her foal", "rotate", 0.8), value("mercy", "her foal, beside her hooves", "x", 0.8), all("mercy", kept, 0.8)]).toEqual([[1, 1, 1], 0, 0, -12, 0, [0, 0, 0, 0, 0]]);
    expect([all("mercy", kept, 1), shown("mercy", "the one part, among all creation", 1), all("mercy", hundred, 1)]).toEqual([[1, 1, 1, 1, 1], 1, [1, 1, 1, 1, 1]]);
    // Grazing around a sanctuary: a clear green pasture; the sanctuary, marked out with red markers along its border; a
    // haze over the land between; a way brings a flock up to the haze and turns back, and the flock is safe in the green;
    // then another way grazes its flock along the border, and a sheep strays across it inside.
    expect(words("sanctuary")).toEqual(["The halal is clear", "And the haram is clear", "Between them are doubtful things", "Avoid them: your religion and honour stay safe", "Like one grazing around a sanctuary", "Soon he grazes inside it"]);
    const markers = names("sanctuary", /^a marker of the sanctuary \d$/);
    expect([shown("sanctuary", "the halal, a clear green pasture", 0.02), shown("sanctuary", "the halal, a clear green pasture", 0.16), shown("sanctuary", "the sanctuary, its grass untouched", 0.16), all("sanctuary", markers, 0.16)]).toEqual([0, 1, 0, markers.map(() => 0)]);
    expect([markers.length, shown("sanctuary", "the sanctuary, its grass untouched", 0.32), all("sanctuary", markers, 0.32), shown("sanctuary", "the border of the sanctuary", 0.32), shown("sanctuary", "doubtful things, a haze between them", 0.32), shown("sanctuary", "doubtful things, a haze between them", 0.48)]).toEqual([6, 1, markers.map(() => 1), 1, 0, 1]);
    const first = names("sanctuary", /^a sheep of the first flock \d$/);
    const turning = ["the first flock's way, up to the haze", "the first flock's way, turning back", "kept safe, in the clear pasture"];
    expect([all("sanctuary", first, 0.48), all("sanctuary", turning, 0.48), first.map((name) => [shown("sanctuary", name, 0.64), value("sanctuary", name, "x", 0.64)]), all("sanctuary", turning, 0.64)]).toEqual([[0, 0, 0], [0, 0, 0], first.map(() => [1, 0]), [1, 1, 1]]);
    const grazing = ["the second flock's way, part 1", "the second flock's way, along the border", "a sheep of the second flock, grazing by the border"];
    const straying = "a sheep of the second flock, straying inside";
    expect([all("sanctuary", grazing, 0.64), shown("sanctuary", straying, 0.64), all("sanctuary", grazing, 0.82), [shown("sanctuary", straying, 0.82), value("sanctuary", straying, "x", 0.82), value("sanctuary", straying, "y", 0.82)], shown("sanctuary", "the markers, warning", 0.82)]).toEqual([[0, 0, 0], 0, [1, 1, 1], [1, 0, 0], 0]);
    expect([value("sanctuary", straying, "x", 1), shown("sanctuary", "the markers, warning", 1), all("sanctuary", first, 1)]).toEqual([28, 1, [1, 1, 1]]);
    // The musk and the bellows: the stall's awning unrolls and the forge's fire is lit; jars of musk come, their sweet
    // smell rising; a way comes to the stall, a little flask comes to it and a coin goes back; the sweet smell follows
    // the way; the bellows blow, the fire roars and sparks fly; then a way comes to the forge, sparks fly to a cloak set
    // down by it and burn it, and dark smoke rises.
    expect(words("musk")).toEqual(["A good friend, and a bad friend", "Like one who carries musk", "He gives you some, or you buy some", "Or you find a sweet smell from him", "And like one who blows the bellows", "He burns your clothes, or you find a bad smell"]);
    const jars = names("musk", /^a jar of musk \d$/);
    expect([value("musk", "the stall's awning, unrolling", "scaleY", 0.02), value("musk", "the stall's awning, unrolling", "scaleY", 0.16), [shown("musk", "the fire in the forge", 0.16), value("musk", "the fire in the forge", "scale", 0.16)], all("musk", jars, 0.16), shown("musk", "the musk's sweet smell", 0.16)]).toEqual([0.05, 1, [1, 0.6], [0, 0, 0, 0], 0]);
    const given = ["a way to the one with musk, part 1", "a way to the one with musk, part 2", "a little musk, given", "a coin, to buy some"];
    expect([jars.length, all("musk", jars, 0.32), shown("musk", "the musk's sweet smell", 0.32), all("musk", given, 0.32), all("musk", given, 0.48), ["a little musk, given", "a coin, to buy some"].map((name) => [value("musk", name, "x", 0.48), value("musk", name, "y", 0.48)])]).toEqual([4, [1, 1, 1, 1], 1, [0, 0, 0, 0], [1, 1, 1, 1], [[0, 0], [0, 0]]]);
    expect([shown("musk", "a sweet smell from him, on the way", 0.48), shown("musk", "a sweet smell from him, on the way", 0.64), value("musk", "the fire in the forge", "scale", 0.64), value("musk", "the bellows, blowing", "scaleY", 0.64), shown("musk", "air, blown into the fire", 0.64)]).toEqual([0, 1, 0.6, 1, 0]);
    const sparks = names("musk", /^a spark from the fire \d$/);
    expect([value("musk", "the bellows, blowing", "scaleY", 0.695), shown("musk", "air, blown into the fire", 0.72), sparks.map((name) => shown("musk", name, 0.72)).some((each) => each > 0), value("musk", "the fire in the forge", "scale", 0.82), value("musk", "the bellows, blowing", "scaleY", 0.82), all("musk", sparks, 0.82), shown("musk", "air, blown into the fire", 0.82)]).toEqual([0.55, 1, true, 1.25, 1, sparks.map(() => 0), 0]);
    const burned = ["a way to the one who blows the bellows", "a cloak, set down by the forge", "the cloak, burned"];
    const flying = names("musk", /^a spark, flying to the cloak \d$/);
    const smoke = names("musk", /^a bad smell, rising as smoke \d$/);
    expect([all("musk", burned, 0.82), all("musk", smoke, 0.82), all("musk", burned, 1), flying.map((name) => [shown("musk", name, 1), value("musk", name, "x", 1)]), smoke.map((name) => [shown("musk", name, 1), value("musk", name, "y", 1)])]).toEqual([[0, 0, 0], [0, 0, 0], [1, 1, 1], flying.map(() => [0, 0]), smoke.map(() => [1, -5])]);
    expect(flying.map((name) => shown("musk", name, (part("musk", name).keys?.at[2] ?? 0) + 0.01))).toEqual([1, 1, 1]);
    // The people who shared a ship: the ship sails in, cut away to show its two decks; ways on the upper deck, then on
    // the lower; a way goes up from below, and a bucket goes down to the sea and comes up with water; a voice below, a
    // drill, and a hole begun in the lower deck with the sea spurting in; then a way comes down from above to it, the hole
    // is stopped, and sparks rise: all of them saved.
    expect(words("shared-ship")).toEqual(["People shared one ship, by lot", "Some above, and some below", "Those below went up for water", "Let us make a hole in our part", "Stop them, and all of them are saved"]);
    const ship = ["the ship's mast and sail", "the ship's hull", "its lower deck, inside", "its upper deck", "the hatch and its ladder"];
    const above = names("shared-ship", /^a way on the upper deck \d$/);
    const below = names("shared-ship", /^a way on the lower deck \d$/);
    expect([ship.map((name) => [shown("shared-ship", name, 0.02), value("shared-ship", name, "x", 0.02)]), ship.map((name) => [shown("shared-ship", name, 0.18), value("shared-ship", name, "x", 0.18)]), all("shared-ship", [...above, ...below], 0.18)]).toEqual([ship.map(() => [0, -150]), ship.map(() => [1, 0]), [0, 0, 0, 0, 0, 0]]);
    expect([all("shared-ship", above, 0.28), all("shared-ship", below, 0.28), all("shared-ship", [...above, ...below], 0.4)]).toEqual([[1, 1, 1], [0, 0, 0], [1, 1, 1, 1, 1, 1]]);
    const water = ["the way up from below, for water, part 1", "the way up from below, for water, part 2", "a rope, let down", "a bucket, let down for water", "water in the bucket"];
    expect([all("shared-ship", water, 0.4), value("shared-ship", "a bucket, let down for water", "y", 0.525), shown("shared-ship", "water in the bucket", 0.525), all("shared-ship", water, 0.6), value("shared-ship", "a bucket, let down for water", "y", 0.6), value("shared-ship", "water in the bucket", "y", 0.6)]).toEqual([[0, 0, 0, 0, 0], 0, 1, [1, 1, 1, 1, 1], -26, -26]);
    const hole = ["a drill, in the lower deck", "a hole, begun in the lower deck", "the sea, spurting in"];
    const stop = ["a way from above, going down to stop it, part 1", "a way from above, going down to stop it, part 2", "the hole, stopped"];
    const saved = names("shared-ship", /^all of them saved, a spark rising \d$/);
    expect([all("shared-ship", hole, 0.6), shown("shared-ship", "a voice below: let us make a hole", 0.66), all("shared-ship", hole, 0.8), shown("shared-ship", "a voice below: let us make a hole", 0.8), all("shared-ship", stop, 0.8), all("shared-ship", saved, 0.8)]).toEqual([[0, 0, 0], 1, [1, 1, 1], 0, [0, 0, 0], saved.map(() => 0)]);
    expect([all("shared-ship", hole, 1), all("shared-ship", stop, 1), saved.length, saved.map((name) => [shown("shared-ship", name, 1), value("shared-ship", name, "y", 1)]), all("shared-ship", [...above, ...below], 1)]).toEqual([[0, 1, 0], [1, 1, 1], 5, saved.map(() => [1, -12]), [1, 1, 1, 1, 1, 1]]);
  });

  test("the scenes of the stories he ﷺ told show each moment in its order, and draw no Prophet, no person and no hand", () => {
    const told: SignKind[] = ["shut-cave", "log-at-sea", "tied-camels", "traveler"];
    for (const kind of told) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helper|servant|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|cousin|face|hands?|fingers?|feet|foot|shoulder|rider|travell?er|stranger|lender|borrower|debtor|worker|labou?rer|owner|shepherd|herdsman|friends?|believers?|teeth|mouth)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing comes down from the sky, nothing is drawn for Allah, and no page of the Quran is drawn: a good deed is
      // sparks rising, and the Quran by heart is a voice.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|scrolls?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // Three men in a cave: three ways go in by night; the rock rolls down from its ledge and shuts the cave; a voice
    // behind the rock, and beside it a picture of what that one did (the milk held till dawn; the gold left and the way
    // turning back from the sin; the wage grown into a herd, and the way that came for it), while his good deed rises
    // as sparks and the rock moves a little; then it rolls away, and the three ways come out.
    expect(words("shut-cave")).toEqual(["Three men went into a cave for the night", "A rock rolled down and shut it", "One held milk for his parents till dawn", "One kept away from a sin, for Allah's sake", "One gave a worker his wage, grown into a herd", "The rock moved, and they walked out"]);
    const into = names("shut-cave", /^a way into the cave \d, part \d$/);
    const out = names("shut-cave", /^a way out of the cave \d$/);
    const voices = names("shut-cave", /^a voice behind the rock, asking \d$/);
    const pictures = ["a picture of what the first did", "a picture of what the second did", "a picture of what the third did"];
    expect([into.length, all("shut-cave", into, 0.02), at("shut-cave", "the rock", 0.02), all("shut-cave", into, 0.14), at("shut-cave", "the rock", 0.14)]).toEqual([6, into.map(() => 0), [1, 25, -34], into.map(() => 1), [1, 25, -34]]);
    expect([at("shut-cave", "the rock", 0.3), value("shut-cave", "the rock", "rotate", 0.3), shown("shut-cave", "dust, as the rock lands", 0.3), all("shut-cave", [...voices, ...pictures], 0.32)]).toEqual([[1, 0, 0], -210, 0, [0, 0, 0, 0, 0, 0]]);
    const milk = ["dawn, in the picture", "the home, in the picture of the milk", "a sheep, milked", "the milk, brought from the sheep", "the bowl of milk, held till dawn", "the window, lit at dawn"];
    expect([all("shut-cave", voices, 0.45), all("shut-cave", pictures, 0.45), all("shut-cave", milk, 0.45), shown("shut-cave", "the night, waiting till dawn", 0.36), shown("shut-cave", "the night, waiting till dawn", 0.45), value("shut-cave", "the rock", "x", 0.45)]).toEqual([[1, 0, 0], [1, 0, 0], milk.map(() => 1), 1, 0, 0]);
    expect([all("shut-cave", voices, 0.48), all("shut-cave", pictures, 0.48), all("shut-cave", milk, 0.48), value("shut-cave", "the rock", "x", 0.48)]).toEqual([[0, 0, 0], [0, 0, 0], milk.map(() => 0), 3.4]);
    const gold = ["the gold, left behind", "a way, coming near the sin", "the way, turning back from it"];
    expect([all("shut-cave", voices, 0.61), all("shut-cave", pictures, 0.61), all("shut-cave", gold, 0.61), value("shut-cave", "the rock", "x", 0.61), all("shut-cave", pictures, 0.64), value("shut-cave", "the rock", "x", 0.64)]).toEqual([[0, 1, 0], [0, 1, 0], [1, 1, 1], 3.4, [0, 0, 0], 6.8]);
    const herd = names("shut-cave", /, grown from the wage$/);
    expect([herd.length, all("shut-cave", voices, 0.81), all("shut-cave", pictures, 0.81), herd.map((name) => [shown("shut-cave", name, 0.81), value("shut-cave", name, "scale", 0.81)]), shown("shut-cave", "the way that came for the wage", 0.81), all("shut-cave", pictures, 0.84), value("shut-cave", "the rock", "x", 0.84)]).toEqual([3, [0, 0, 1], [0, 0, 1], herd.map(() => [1, 1]), 1, [0, 0, 0], 6.8]);
    for (const deed of ["first", "second", "third"]) {
      const sparks = names("shut-cave", new RegExp(`^the ${deed} good deed, rising \\d$`));
      expect([deed, sparks.length, sparks.map((name) => shown("shut-cave", name, (part("shut-cave", name).keys?.at[2] ?? 0) + 0.005)), all("shut-cave", sparks, 1)]).toEqual([deed, 3, [1, 1, 1], [0, 0, 0]]);
    }
    expect([all("shut-cave", out, 0.84), at("shut-cave", "the rock", 1), all("shut-cave", out, 1), all("shut-cave", into, 1), all("shut-cave", voices, 1)]).toEqual([[0, 0, 0], [1, 40, 0], [1, 1, 1], into.map(() => 1), [0, 0, 0]]);
    // A loan sent across the sea: a way comes to the door, voices ask for a witness and name Him; the thousand dinars
    // go to a ship, across the sea and ashore; the ship sails away, and a way goes down to the empty shore; the money
    // and a letter go into a piece of wood, which is sealed; a voice gives it to the sea, and it floats over to the other
    // shore; a way comes down to it and it goes up to the home, where it opens on the money and the letter.
    expect(words("log-at-sea")).toEqual(["A thousand dinars, lent with Allah as witness", "When it was time, he found no ship", "Money and a letter, sealed in a piece of wood", "He gave it to the sea, trusting Allah", "The lender took it home for firewood", "He opened it: his money, and the letter"]);
    const lending = ["a way, to borrow the money", "a way, ashore across the sea"];
    const asked = ["a voice at the door, asking for a witness", "a voice, naming the witness"];
    expect([at("log-at-sea", "a thousand dinars", 0.02), at("log-at-sea", "a ship", 0.02), all("log-at-sea", lending, 0.02), shown("log-at-sea", asked[0], 0.05), shown("log-at-sea", asked[1], 0.07)]).toEqual([[1, 0, 0], [1, 0, 0], [0, 0], 1, 1]);
    expect([at("log-at-sea", "a thousand dinars", 0.16), at("log-at-sea", "a ship", 0.16), all("log-at-sea", lending, 0.16), all("log-at-sea", asked, 0.16)]).toEqual([[1, 120, 0], [1, 72, 0], [1, 1], [0, 0]]);
    expect([shown("log-at-sea", "a ship", 0.32), shown("log-at-sea", "a way, down to the shore when it was time", 0.32), shown("log-at-sea", "a piece of wood", 0.32), shown("log-at-sea", "a thousand dinars", 0.32)]).toEqual([0, 1, 0, 1]);
    const wood = ["a piece of wood", "the wood, sealed"];
    expect([all("log-at-sea", wood, 0.45), shown("log-at-sea", "a hole in the wood", 0.4), shown("log-at-sea", "a hole in the wood", 0.45), shown("log-at-sea", "a thousand dinars", 0.45), shown("log-at-sea", "a letter, with the money", 0.45), wood.map((name) => value("log-at-sea", name, "x", 0.48))]).toEqual([[1, 1], 1, 0, 0, 0, [0, 0]]);
    expect([shown("log-at-sea", "a voice, giving it to the sea", 0.55), wood.map((name) => at("log-at-sea", name, 0.61)), shown("log-at-sea", "a voice, giving it to the sea", 0.61)]).toEqual([1, wood.map(() => [1, -104, 5]), 0]);
    const found = ["a way, down to the shore to look for a ship", "a way, taking the wood home"];
    expect([all("log-at-sea", found, 0.64), all("log-at-sea", found, 0.79), wood.map((name) => at("log-at-sea", name, 0.79))]).toEqual([[0, 0], [1, 1], wood.map(() => [1, -116, -16])]);
    const opened = ["the wood, opened, one half", "the wood, opened, the other half", "the thousand dinars, inside", "the letter, inside"];
    const kept = names("log-at-sea", /^a trust kept, a spark rising \d$/);
    expect([all("log-at-sea", opened, 0.82), all("log-at-sea", wood, 1), all("log-at-sea", opened, 1), value("log-at-sea", "the thousand dinars, inside", "scale", 1), kept.length, kept.map((name) => [shown("log-at-sea", name, 1), value("log-at-sea", name, "y", 1)])]).toEqual([[0, 0, 0, 0], [0, 0], [1, 1, 1, 1], 1, 3, kept.map(() => [1, -10])]);
    // The tied camels: a voice recites by heart; three camels come and are tied to their pegs; a day passes and they
    // stay; the voice stops, the ropes are let go and the camels run away; then the voice comes back, and the camels
    // are brought back and tied again.
    expect(words("tied-camels")).toEqual(["One who has the Quran by heart", "Is like the owner of tied camels", "If he keeps them tied, he keeps them", "If he lets them go, they run away", "Keep reviewing it: it slips away faster"]);
    const camels = names("tied-camels", /^a camel, tied \d$/);
    const ropes = names("tied-camels", /^its rope, tied \d$/);
    const knots = names("tied-camels", /^the knot, holding \d$/);
    const back = names("tied-camels", /^a camel, brought back \d$/);
    const again = [...names("tied-camels", /^its rope, tied again \d$/), ...names("tied-camels", /^the knot, holding again \d$/)];
    expect([shown("tied-camels", "a voice, reciting by heart", 0.18), camels.map((name) => at("tied-camels", name, 0.18)), all("tied-camels", ropes, 0.18)]).toEqual([1, camels.map(() => [0, -110, 0]), [0, 0, 0]]);
    expect([camels.map((name) => at("tied-camels", name, 0.38)), all("tied-camels", ropes, 0.38), all("tied-camels", names("tied-camels", /^a way out to the pegs/), 0.38), all("tied-camels", knots, 0.38)]).toEqual([camels.map(() => [1, 0, 0]), [1, 1, 1], [1, 1], [0, 0, 0]]);
    expect([camels.map((name) => at("tied-camels", name, 0.58)), all("tied-camels", ropes, 0.58), all("tied-camels", knots, 0.58), value("tied-camels", "the sun, crossing the sky", "x", 0.4), value("tied-camels", "the sun, crossing the sky", "x", 0.58)]).toEqual([camels.map(() => [1, 0, 0]), [1, 1, 1], [1, 1, 1], -60, 60]);
    expect([shown("tied-camels", "a voice, reciting by heart", 0.78), camels.map((name) => value("tied-camels", name, "x", 0.78)), all("tied-camels", [...camels, ...ropes, ...knots], 0.78), all("tied-camels", back, 0.78)]).toEqual([0, [130, 130, 130], Array(9).fill(0), [0, 0, 0]]);
    expect([shown("tied-camels", "the voice, reviewing again", 1), back.map((name) => at("tied-camels", name, 1)), all("tied-camels", again, 1)]).toEqual([1, back.map(() => [1, 0, 0]), Array(6).fill(1)]);
    // Like a traveler: a camel on the road, a dashed way behind it; it passes a town, rests a little in a tree's shade
    // at noon, goes on and leaves it, and has gone over the horizon by evening, while the stars come out.
    expect(words("traveler")).toEqual(["Be in this world", "As if you were a stranger", "Or a traveler on his way", "Like a rider who rests in the shade of a tree", "Then goes on, and leaves it", "At evening, do not wait for the morning"]);
    const trail = names("traveler", /^a way along the road, part \d$/);
    const camel = "a camel on its way";
    expect([trail.length, at("traveler", camel, 0.02), at("traveler", camel, 0.14), all("traveler", trail, 0.14)]).toEqual([8, [0, -36, 4.5], [1, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0]]);
    expect([at("traveler", camel, 0.3), all("traveler", trail, 0.3), at("traveler", camel, 0.46), all("traveler", trail, 0.46)]).toEqual([[1, 44, -12.1], [1, 1, 1, 0, 0, 0, 0, 0], [1, 78, -22.5], [1, 1, 1, 1, 1, 0, 0, 0]]);
    expect([at("traveler", camel, 0.48), at("traveler", camel, 0.64), shown("traveler", "a way, resting a little in the shade", 0.48), shown("traveler", "a way, resting a little in the shade", 0.64), value("traveler", "the sun, going over the day", "x", 0.64), value("traveler", "the sun, going over the day", "y", 0.64)]).toEqual([[1, 78, -22.5], [1, 92, -26.1], 0, 1, 0, 0]);
    expect([at("traveler", camel, 0.8), all("traveler", trail, 0.8), shown("traveler", "the evening sky", 0.8), shown("traveler", "stars", 0.8)]).toEqual([[1, 114, -33.9], [1, 1, 1, 1, 1, 1, 1, 0], 0, 0]);
    expect([shown("traveler", camel, 1), all("traveler", trail, 1), shown("traveler", "the evening sky", 1), shown("traveler", "the night sky, coming", 1), shown("traveler", "stars", 1)]).toEqual([0, trail.map(() => 1), 1, 1, 1]);
  });

  test("the scenes of more of his likenesses show each moment in its order, and draw no Prophet, no person and no hand", () => {
    const likenesses: SignKind[] = ["citron", "forgiving-trader", "hungry-birds", "two-flocks", "bending-plant", "remember"];
    for (const kind of likenesses) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|employees?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|feet|foot|shoulder|trader|merchant|lender|borrower|debtor|buyer|seller|shepherd|herdsman|friends?|believers?|hypocrites?|wicked|reciter|teeth|mouth|lips?)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing comes down from the sky, nothing is drawn for Allah, and no page of the Quran is drawn: reciting is a
      // voice, remembering Him is a voice and sparks rising, and His forgiveness is warmth and sparks rising.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|scrolls?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // The citron and the date: a voice recites in one home, and a citron comes on its plate, with its sweet smell
    // rising and a slice that shines with its taste; a way goes into the quiet home, and dates come on its plate, which
    // shine with their taste, with no smell rising.
    expect(words("citron")).toEqual(["A believer who recites the Quran", "Is like a citron", "It smells good, and it tastes good", "A believer who does not recite it", "Is like a date", "It tastes good, but has no smell"]);
    const citron = ["a citron", "its sweet smell, rising", "a slice of it, good to taste", "its good taste, shining"];
    const quiet = names("citron", /^a way into the quiet home, part \d$/);
    expect([shown("citron", "a voice, reciting", 0.16), all("citron", citron, 0.16), shown("citron", "dates", 0.16)]).toEqual([1, [0, 0, 0, 0], 0]);
    expect([all("citron", citron, 0.32), value("citron", "a citron", "scale", 0.32), all("citron", citron, 0.5), all("citron", quiet, 0.5)]).toEqual([[1, 0, 0, 0], 1, [1, 1, 1, 1], [0, 0]]);
    expect([quiet.length, all("citron", quiet, 0.66), shown("citron", "dates", 0.66), shown("citron", "dates", 0.8), value("citron", "dates", "scale", 0.8), shown("citron", "their good taste, shining", 0.8)]).toEqual([2, [1, 1], 0, 1, 1, 0]);
    expect([shown("citron", "their good taste, shining", 1), all("citron", citron, 1), names("citron", /smell/)]).toEqual([1, [1, 1, 1, 1], ["its sweet smell, rising"]]);
    // The trader who let people off: three ways come to his stall and take sacks on credit, each marked on his tally
    // board; two pay back in coins, and the third has only an empty purse with dust in it; a voice from the stall says
    // "let him off", his mark is wiped and the way goes home free; then warmth comes over the stall and sparks rise.
    expect(words("forgiving-trader")).toEqual(["A trader used to lend to people", "When one in hardship could not pay him back", "He told his helpers: let him off", "So that Allah may let us off", "And Allah forgave him"]);
    const buyers = names("forgiving-trader", /^a way, coming to buy on credit \d$/);
    const sacks = names("forgiving-trader", /^a sack, taken on credit \d$/);
    const marks = names("forgiving-trader", /^a mark on the tally board \d$/);
    const coins = names("forgiving-trader", /^coins, paid back \d$/);
    const dust = names("forgiving-trader", /^only dust, from the empty purse \d$/);
    const letOff = names("forgiving-trader", /^the debt, let off \d$/);
    const forgiven = names("forgiving-trader", /^forgiven, rising \d$/);
    const purse = "an empty purse, opened";
    const voice = "a voice from the stall, saying: let him off";
    expect([buyers.length, sacks.length, all("forgiving-trader", sacks, 0.02), all("forgiving-trader", buyers, 0.22), all("forgiving-trader", sacks, 0.22), all("forgiving-trader", marks, 0.22), all("forgiving-trader", coins, 0.22)]).toEqual([3, 3, [1, 1, 1], [1, 1, 1], [0, 0, 0], [1, 1, 1], [0, 0]]);
    expect([shown("forgiving-trader", "coins, paid back 1", 0.29), shown("forgiving-trader", "coins, paid back 2", 0.32), dust.length, all("forgiving-trader", dust, 0.38), all("forgiving-trader", marks, 0.42), all("forgiving-trader", coins, 0.42), shown("forgiving-trader", purse, 0.42), value("forgiving-trader", purse, "rotate", 0.42), all("forgiving-trader", dust, 0.42), shown("forgiving-trader", voice, 0.42)]).toEqual([1, 1, 3, [1, 1, 1], [0, 0, 1], [0, 0], 1, -28, [0, 0, 0], 0]);
    expect([shown("forgiving-trader", voice, 0.6), all("forgiving-trader", marks, 0.6), letOff.length, letOff.map((name) => shown("forgiving-trader", name, (part("forgiving-trader", name).keys?.at[2] ?? 0) + 0.005)), all("forgiving-trader", letOff, 0.6), shown("forgiving-trader", "a way, going home free", 0.6), shown("forgiving-trader", purse, 0.6)]).toEqual([1, [0, 0, 0], 2, [1, 1], [0, 0], 0, 1]);
    expect([shown("forgiving-trader", voice, 0.78), shown("forgiving-trader", "a way, going home free", 0.78), shown("forgiving-trader", purse, 0.78), shown("forgiving-trader", "warmth over the stall", 0.78), all("forgiving-trader", forgiven, 0.78)]).toEqual([0, 1, 0, 0, [0, 0, 0, 0, 0]]);
    expect([shown("forgiving-trader", "warmth over the stall", 1), forgiven.map((name) => [shown("forgiving-trader", name, 1), value("forgiving-trader", name, "y", 1)])]).toEqual([1, forgiven.map(() => [1, -18])]);
    // The birds: at dawn three slim birds wait in their nests; crops grow in a field and grain lies on the ground,
    // shining; the birds fly out hungry to it, and it is eaten; by evening they come back to their nests, full and round.
    expect(words("hungry-birds")).toEqual(["If you relied on Allah as you should", "He would provide for you, as for the birds", "They go out in the morning hungry", "And come back in the evening full"]);
    const hungry = names("hungry-birds", /^a bird, going out hungry \d$/);
    const full = names("hungry-birds", /^a bird, coming back full \d$/);
    const grain = ["the crops in the field", "the grain on the ground", "the grain, shining"];
    expect([hungry.length, hungry.map((name) => at("hungry-birds", name, 0.16)), all("hungry-birds", full, 0.16), all("hungry-birds", grain, 0.16), shown("hungry-birds", "the dawn sky", 0.16), value("hungry-birds", "the sun", "y", 0.02), value("hungry-birds", "the sun", "y", 0.16)]).toEqual([3, hungry.map(() => [1, 0, 0]), [0, 0, 0], [0, 0, 0], 1, 20, 0]);
    expect([hungry.map((name) => at("hungry-birds", name, 0.34)), all("hungry-birds", grain, 0.34), value("hungry-birds", "the crops in the field", "scale", 0.34)]).toEqual([hungry.map(() => [1, 0, 0]), [1, 1, 1], 1]);
    expect([hungry.map((name) => at("hungry-birds", name, 0.62)), all("hungry-birds", grain, 0.62), shown("hungry-birds", "the dawn sky", 0.62), all("hungry-birds", full, 0.62)]).toEqual([[[1, 86, 31.6], [1, 86, 47.6], [1, 92, 28.2]], [1, 0, 0], 0, [0, 0, 0]]);
    expect([all("hungry-birds", hungry, 1), full.map((name) => at("hungry-birds", name, 1)), shown("hungry-birds", "the evening sky", 1), shown("hungry-birds", "dusk over the land", 1)]).toEqual([[0, 0, 0], [[1, -86, -31.6], [1, -86, -47.6], [1, -92, -28.2]], 1, 0.16]);
    // The sheep between two flocks: two flocks come in from each side; the sheep goes to the first one, then to the
    // second, then back between them, and keeps turning from one to the other.
    expect(words("two-flocks")).toEqual(["A hypocrite is like a sheep", "Wandering between two flocks", "It goes to this one", "Then to that one", "Never settling with either"]);
    const flocks = [...names("two-flocks", /^a sheep of the first flock \d$/), ...names("two-flocks", /^a sheep of the second flock \d$/)];
    const sheep = "a sheep, wandering";
    const ways = ["its way, to the first flock", "its way, to the second flock", "its way, back between them"];
    expect([flocks.length, at("two-flocks", sheep, 0.16), all("two-flocks", flocks, 0.16), all("two-flocks", flocks, 0.34), flocks.map((name) => value("two-flocks", name, "x", 0.34)), all("two-flocks", ways, 0.34)]).toEqual([8, [1, 0, 0], flocks.map(() => 0), flocks.map(() => 1), flocks.map(() => 0), [0, 0, 0]]);
    expect([at("two-flocks", sheep, 0.5), all("two-flocks", ways, 0.5), at("two-flocks", sheep, 0.66), all("two-flocks", ways, 0.66)]).toEqual([[1, -31.5, 0], [1, 0, 0], [1, 31.5, 0], [1, 1, 0]]);
    expect([at("two-flocks", sheep, 1), all("two-flocks", ways, 1), [0.75, 0.83, 0.9, 1].map((t) => value("two-flocks", sheep, "scaleX", t))]).toEqual([[1, 0, 0], [1, 1, 1], [-1, 1, -1, 1]]);
    // The plant and the pine: a soft plant grows; the wind bends it one way, then the other, and when it is still it
    // stands straight again; a pine stands hard and straight beside it while the wind bends the plant again; then a
    // strong gust breaks the pine and it falls, and the plant stands straight.
    expect(words("bending-plant")).toEqual(["A believer is like a fresh, soft plant", "From wherever the wind comes, it bends it", "When the wind is still, it stands straight again", "The wicked is like a pine, hard and straight", "Until Allah breaks it, when He wills"]);
    const plant = "a fresh, soft plant";
    const pine = ["a pine, hard and straight", "its trunk, standing"];
    const winds = ["the wind, from the left", "the wind, from the right", "the wind again, from the left", "a strong gust"];
    const splinters = names("bending-plant", /^a splinter, as it breaks \d$/);
    expect([shown("bending-plant", plant, 0.16), value("bending-plant", plant, "scale", 0.16), value("bending-plant", plant, "rotate", 0.16), all("bending-plant", winds, 0.16), all("bending-plant", pine, 0.16)]).toEqual([1, 1, 0, [0, 0, 0, 0], [0, 0]]);
    expect([value("bending-plant", plant, "rotate", 0.25), all("bending-plant", winds, 0.25), value("bending-plant", plant, "rotate", 0.38), all("bending-plant", winds, 0.38)]).toEqual([26, [1, 0, 0, 0], -26, [0, 1, 0, 0]]);
    expect([value("bending-plant", plant, "rotate", 0.56), all("bending-plant", winds, 0.56), all("bending-plant", pine, 0.56)]).toEqual([0, [0, 0, 0, 0], [0, 0]]);
    expect([all("bending-plant", pine, 0.74), value("bending-plant", pine[0], "rotate", 0.74), value("bending-plant", plant, "rotate", 0.74), all("bending-plant", winds, 0.74), all("bending-plant", splinters, 0.74)]).toEqual([[1, 1], 0, 22, [0, 0, 1, 0], [0, 0, 0]]);
    expect([splinters.length, all("bending-plant", splinters, 0.83), value("bending-plant", pine[0], "rotate", 1), value("bending-plant", pine[0], "y", 1), value("bending-plant", plant, "rotate", 1), all("bending-plant", winds, 1), all("bending-plant", splinters, 1)]).toEqual([3, [1, 1, 1], 86, 17, 0, [0, 0, 0, 0], [0, 0, 0]]);
    // The living and the dead: a voice remembers Him in one home, as sparks rise; a way goes into the other, quiet
    // home; then the home that remembers glows warm, its lamp and door lit and life rising in it, while the other
    // home's lamp goes out and it stands dark and still.
    expect(words("remember")).toEqual(["One who remembers his Lord", "And one who does not remember Him", "Are like the living", "And the dead"]);
    const remembrance = names("remember", /^remembrance, rising \d$/);
    const life = names("remember", /^life in it, rising \d$/);
    const living = ["its warmth, all around", "its door, glowing"];
    expect([shown("remember", "a voice, remembering", 0.2), remembrance.length, remembrance.map((name) => shown("remember", name, (part("remember", name).keys?.at[2] ?? 0) + 0.005)), all("remember", remembrance, 0.2), shown("remember", "a way into the other home", 0.2)]).toEqual([1, 3, [1, 1, 1], [0, 0, 0], 0]);
    expect([shown("remember", "a way into the other home", 0.4), shown("remember", "the lamp in the home that remembers", 0.4), shown("remember", "the lamp in the other home", 0.4), all("remember", living, 0.4), all("remember", life, 0.4)]).toEqual([1, 0.55, 0.55, [0, 0], [0, 0, 0, 0]]);
    expect([shown("remember", "the lamp in the home that remembers", 0.66), all("remember", living, 0.66), life.map((name) => [shown("remember", name, 0.66), value("remember", name, "y", 0.66)]), shown("remember", "the lamp in the other home", 0.66), shown("remember", "the other home, dark and still", 0.66)]).toEqual([1, [1, 1], life.map(() => [1, -16]), 0.55, 0]);
    expect([shown("remember", "the lamp in the other home", 1), shown("remember", "the other home, dark and still", 1), shown("remember", "the lamp in the home that remembers", 1), all("remember", living, 1), shown("remember", "a voice, remembering", 1)]).toEqual([0, 0.35, 1, [1, 1], 1]);
  });

  test("every word and caption is translated in every language", () => {
    const words = [...SIGN_SCENES.map((each) => each.caption), ...signWords(), "Source", "Plays the scene again"];
    expect(words.length).toBeGreaterThan(45);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: words.filter((each) => !catalog[each]) }).toEqual({ language, missing: [] });
    }
  });

  test("on every phone, in every language, each word fits its pill in two lines", () => {
    for (const language of LANGUAGES) {
      for (const text of signWords()) {
        const said = t(text, undefined, language);
        for (const [width] of FRAMES) {
          // The pill is 20 px narrower than the scene, with 10 px inside it on each side.
          expect([language, text, width, fitsTwoLines(said, width - 40, 13)]).toEqual([language, text, width, true]);
        }
      }
    }
  });

  test("a scene shows its parts and its words in the learner's language; with less motion it shows its end", async () => {
    await render(<SignSceneView scene={scene("sign-tree")} width={362} height={271} still />);
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    expect(screen.getAllByTestId(/^sign-scene-part-\d+$/, ALL).length).toBe(signArt("tree").parts.length);
    // Standing still at its end: the last words show, the first ones do not.
    expect(StyleSheet.flatten(screen.getByTestId("sign-scene-words-2", ALL).props.style).opacity).toBe(1);
    expect(StyleSheet.flatten(screen.getByTestId("sign-scene-words-0", ALL).props.style).opacity).toBe(0);
    expect(screen.getByText("Its fruit at every time", ALL)).toBeTruthy();
    // The crops stand still as broken straw, not as the bare soil their story ends on.
    await render(<SignSceneView scene={scene("sign-fade")} width={362} height={271} still />);
    const said = signArt("fade").words.map((_, index) => StyleSheet.flatten(screen.getByTestId(`sign-scene-words-${index}`, ALL).props.style).opacity);
    expect(said).toEqual([0, 0, 1, 0]);
    expect(signArt("fade").stillAt).toBeDefined();
    expect([shown("fade", "broken straw", signArt("fade").stillAt!), wordAt("fade", signArt("fade").stillAt!)]).toEqual([1, "Then broken straw"]);
    setActiveLanguage("bn");
    await render(<SignSceneView scene={scene("sign-mountains")} width={292} height={178} still />);
    expect(screen.getByText("খুঁটির মতো", ALL)).toBeTruthy();
    setActiveLanguage("ar");
    await render(<SignSceneView scene={scene("sign-seas")} width={292} height={178} still />);
    expect(screen.getByText("بينهما حاجز", ALL)).toBeTruthy();
  });

  test("with less motion, a swimming fish or snake stands at an end of its way, facing it, not turned edge-on", async () => {
    const facing = (kind: SignKind, name: string) => {
      const index = signArt(kind).parts.findIndex((each) => each.name === name);
      const picture = screen.getByTestId(`sign-scene-part-${index}`, ALL).children[0] as TestInstance;
      const transform = (StyleSheet.flatten(picture.props.style).transform ?? []) as Record<string, number>[];
      return transform.find((each) => "scaleX" in each)?.scaleX;
    };
    await render(<SignSceneView scene={scene("sign-seas")} width={362} height={271} still />);
    expect([facing("seas", "river fish")! > 0.9, facing("seas", "sea fish")! < -0.9]).toEqual([true, true]);
    await render(<SignSceneView scene={scene("sign-tur")} width={362} height={271} still />);
    expect(Math.abs(facing("tur", "snake")!)).toBeGreaterThan(0.9);
  });

  test("a scene plays its story once, again when asked, and not at all with less motion", async () => {
    const timing = jest.spyOn(Animated, "timing");
    const { ms } = signArt("spider");
    const stories = () => timing.mock.calls.filter(([, config]) => config.toValue === 1 && config.duration === ms).length;
    const { rerender } = await render(<SignSceneView scene={scene("sign-spider")} width={362} height={271} delay={300} />);
    expect(stories()).toBe(1);
    // Its web keeps swaying, and the wind keeps blowing, while it is seen.
    expect(timing.mock.calls.filter(([, config]) => config.duration === 3400 || config.duration === 1600).length).toBe(2);
    await rerender(<SignSceneView scene={scene("sign-spider")} width={362} height={271} delay={300} play={1} />);
    expect(stories()).toBe(2);
    timing.mockClear();
    await render(<SignSceneView scene={scene("sign-spider")} width={362} height={271} still />);
    expect(timing).not.toHaveBeenCalled();
    timing.mockRestore();
  });

  test("a sign lesson's first page opens on its scene instead of its photo, with what it shows and its sources", async () => {
    const lesson = LESSONS_BY_ID["lesson-deep-rahman1-two-seas-meet"] as Lesson;
    const opened = jest.fn();
    await render(<LearnCard page="start" title={lesson.title} line={lesson.learnLine ?? ""} sign={signForLesson(lesson)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} onOpenSource={opened} />);
    expect(screen.getByTestId("sign-card")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.queryByTestId("moon-card")).toBeNull();
    await fireEvent(screen.getByTestId("sign-card-frame"), "layout", { nativeEvent: { layout: { width: 362, height: 271 } } });
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    expect(screen.getByTestId("sign-caption")).toHaveTextContent(scene("sign-seas").caption);
    expect(screen.getByText("Source")).toBeTruthy();
    await fireEvent.press(screen.getByText("Quran 55:20"));
    expect(opened).toHaveBeenCalledWith("https://quran.com/55/20");
    // Tap it to watch it again.
    await fireEvent.press(screen.getByTestId("sign-replay"));
    await fireEvent.press(screen.getByTestId("sign-card"));
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    // The next pages do not show it again.
    await render(<LearnCard page="facts" title={lesson.title} line={lesson.learnLine ?? ""} facts={["Two seas meet"]} sign={signForLesson(lesson)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} />);
    expect(screen.queryByTestId("sign-card")).toBeNull();
  });

  test("the sign card on its own: the good tree, with its three sources, in Urdu", async () => {
    setActiveLanguage("ur");
    await render(<SignCard sign={signForLesson({ nodeId: "deep-ibrahim3-the-date-palm" })!} />);
    await fireEvent(screen.getByTestId("sign-card-frame"), "layout", { nativeEvent: { layout: { width: 292, height: 178 } } });
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    expect(screen.getByLabelText(t(scene("sign-tree").caption))).toBeTruthy();
    expect(screen.getByTestId("sign-caption")).toHaveTextContent(t(scene("sign-tree").caption));
    expect(t(scene("sign-tree").caption)).not.toBe(scene("sign-tree").caption);
    for (const reference of SOURCES["sign-tree"]) expect(screen.getByText(t(reference))).toBeTruthy();
  });
});
