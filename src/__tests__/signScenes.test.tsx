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
import { SMALL_WORDS_WIDTH, SignSceneView } from "../ui/journey/SignScene";
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
  "sign-remember": [/remember|dhikr/i, /living|alive|life|dead/i],
  "sign-lost-camel": [/camel/i, /repent/i],
  "sign-stung-twice": [/stung/i, /hole|mistake/i],
  "sign-doors-of-good": [/doors? of good|shield/i, /charity|fasting|night/i],
  "sign-square-and-line": [/square/i, /line|hope|lifetime/i],
  "sign-more-water": [/soup/i, /neighbou?rs?/i],
  "sign-joint-charity": [/charity/i, /joint|good word/i],
  "sign-two-wolves": [/wolves/i, /greed|wealth|money/i],
  "sign-falling-leaves": [/leaves/i, /sins?|thorn|pain/i],
  "sign-tie-camel": [/camel/i, /trust/i],
  "sign-faith-branches": [/branches/i, /faith|iman/i],
  "sign-sea-drop": [/sea|ocean/i, /finger/i],
  "sign-jar-of-gold": [/jar/i, /gold/i],
  "sign-charity-wealth": [/charity|forgiv|humbl/i, /wealth|honou?r|rais/i],
  "sign-crying-trunk": [/trunk|palm/i, /cr(ied|y)|pulpit|minbar/i],
  "sign-trench-rock": [/rock|boulder/i, /trench|sand|spade/i],
  "sign-chasing-horse": [/horse/i, /chas(ed?|ing)|Suraqah/i],
  "sign-milk-bowl": [/milk/i, /Suffah|bowl/i],
  "sign-bread-for-seventy": [/bread|loaves/i, /seventy|eighty|\bten\b/i],
  "sign-nightfall": [/night|bed|sleep/i, /door|lamp|cover/i],
  "sign-half-date": [/date/i, /Fire|charity|sadaqah|good word/i],
  "sign-lamp-out": [/lamp|light/i, /guest/i],
  "sign-helped-at-home": [/home/i, /pray/i],
  "sign-a-span-closer": [/repent|forgiven/i, /span|village|town/i],
  "sign-uhud-shook": [/Uhud/i, /shook|martyr|siddiq/i],
  "sign-greeting-stone": [/stone/i, /greet|salam/i],
  "sign-around-us": [/rain/i, /around us/i],
  "sign-blessed-water": [/food|water/i, /glorif|bless/i],
  "sign-shepherds": [/sheep|shepherd/i, /prophet/i],
  "sign-date-mountain": [/date/i, /mountain/i],
  "sign-deeds-continue": [/three|dies|death|after/i, /child|charity|knowledge/i],
  "sign-good-intentions": [/good deed/i, /intend|ten|seven hundred/i],
  "sign-safa-call": [/Safa|warn/i, /lie|truth|Abu Lahab|warner/i],
  "sign-jabir-dates": [/dates/i, /debt|lender/i],
  "sign-three-follow": [/follow/i, /deeds/i],
  "sign-good-in-every-state": [/patien/i, /thank|grateful|when good comes/i],
  "sign-your-mother": [/mother/i, /father|three times/i],
  "sign-cheerful-face": [/cheerful|smil/i, /good|brother/i],
  "sign-learn-and-teach": [/Quran/i, /teach/i],
  "sign-one-body": [/one body/i, /merc|love|kind/i],
  "sign-eat-near": [/Bismillah/i, /right hand/i],
  "sign-those-you-love": [/Hour|loved? Allah/i, /those (he|you|they) love/i],
  "sign-after-the-salam": [/forgiv|Astaghfirullah/i, /salam|Peace|Majesty|Glory/i],
  "sign-built-on-five": [/five/i, /pillar|built on|stands on/i],
  "sign-seventy-times": [/seventy/i, /forgiv|repent/i],
  "sign-family-ties": [/family ties|relatives|kin\b/i, /provision|longer life|wealth/i],
  "sign-pray-as-you-can": [/sitting|\bsit\b/i, /side/i],
  "sign-even-a-thorn": [/thorn/i, /\bsins?\b/i],
  "sign-intentions": [/intention/i, /\bdeeds?\b|\bactions?\b|hijrah/i],
  "sign-two-words": [/two (short |light |easy )?(phrases|words|expressions)/i, /heavy/i],
  "sign-half-of-faith": [/half of faith/i, /fills the scale/i],
  "sign-three-signs": [/hypocri/i, /promise/i],
  "sign-call-to-good": [/calls? to good|callers? to good/i, /reward/i],
  "sign-praise-each-bite": [/pleased/i, /drink/i],
  "sign-good-or-quiet": [/(say|says|talk|speak)( something| what is)? good/i, /quiet|silent/i],
  "sign-then-steadfast": [/steadfast|stand firm|stay firm/i, /I believe in Allah|Sufyan/i],
  "sign-dearest-deeds": [/(prayer|salah|pray) (on|at its( proper)?) time/i, /dearest|loves? most/i],
  "sign-truth-leads": [/truth(fulness)? leads to/i, /leads to (Jannah|Paradise)/i],
  "sign-ease-a-hardship": [/\beas(e|es|ing|y)\b/i, /hardship|trouble|path to (Jannah|Paradise)/i],
  "sign-saved-by-mercy": [/mercy/i, /deeds alone|stop doing good/i],
  "sign-give-while-healthy": [/healthy|delay/i, /charity/i],
  "sign-strong-believer": [/strong believer|\bif only\b/i, /Allah decreed|good in (both|every)|benefits you/i],
  "sign-forgotten-prayer": [/(forget|miss|sleep through) a prayer/i, /pray it/i],
  "sign-mustard-of-pride": [/pride/i, /beaut|looking down|mustard|(rejecting|refusing) (the )?truth/i],
  "sign-what-backbiting-is": [/backbit/i, /dislike|untrue|not (even )?true|false|slander/i],
  "sign-orphan-carer": [/orphan/i, /Paradise|Jannah|two fingers/i],
  "sign-safe-from-harm": [/tongue|hand|harms no one|does not hurt/i, /Muslim|muhajir|emigrant/i],
  "sign-refuge-from-anger": [/refuge|a'udhu/i, /ang(er|ry)/i],
  "sign-gate-ar-rayyan": [/Rayyan/i, /fast/i],
  "sign-make-it-easy": [/easy/i, /good news|good tidings|hard|drive|push|run away/i],
  "sign-needle-in-the-sea": [/(forbidden|forbade).{0,30}Himself|O My servants|hadith qudsi|Muslim 2577/i, /oppress|wrong|injustice|ask|decrease|shrink|adds nothing|needle/i],
  "sign-hearts-and-deeds": [/hearts?/i, /deeds/i],
  "sign-real-strength": [/strong|strength/i, /ang(er|ry)/i],
  "sign-treasure-of-paradise": [/treasure/i, /la hawla|quwwata|no (might|power)|might nor power|power except/i],
  "sign-hundred-levels": [/Firda(w|u)s/i, /hundred|grades?|levels?|highest/i],
  "sign-faith-at-the-pleiades": [/Pleiades|Thurayya|three times|thrice/i, /Persia|Salman|faith|others/i],
  "sign-sacred-city": [/sanctuary|sacred/i, /Makkah|Mecca|city|town|House/i]
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
  "sign-remember": ["Sahih al-Bukhari 6407"],
  "sign-lost-camel": ["Sahih Muslim 2747"],
  "sign-stung-twice": ["Sahih al-Bukhari 6133"],
  "sign-doors-of-good": ["Jami at-Tirmidhi 2616"],
  "sign-square-and-line": ["Sahih al-Bukhari 6417"],
  "sign-more-water": ["Sahih Muslim 2625b"],
  "sign-joint-charity": ["Sahih Muslim 1009", "Sahih al-Bukhari 2989"],
  "sign-two-wolves": ["Jami at-Tirmidhi 2376"],
  "sign-falling-leaves": ["Sahih al-Bukhari 5648"],
  "sign-tie-camel": ["Jami at-Tirmidhi 2517"],
  "sign-faith-branches": ["Sahih Muslim 35b", "Sahih al-Bukhari 9"],
  "sign-sea-drop": ["Sahih Muslim 2858"],
  "sign-jar-of-gold": ["Sahih al-Bukhari 3472"],
  "sign-charity-wealth": ["Sahih Muslim 2588"],
  "sign-crying-trunk": ["Sahih al-Bukhari 3584"],
  "sign-trench-rock": ["Sahih al-Bukhari 4101"],
  "sign-chasing-horse": ["Sahih al-Bukhari 3911"],
  "sign-milk-bowl": ["Sahih al-Bukhari 6452"],
  "sign-bread-for-seventy": ["Sahih al-Bukhari 3578"],
  "sign-nightfall": ["Sahih al-Bukhari 3304", "Sahih al-Bukhari 5624"],
  "sign-half-date": ["Sahih al-Bukhari 1417", "Sahih al-Bukhari 6023"],
  "sign-lamp-out": ["Sahih al-Bukhari 4889"],
  "sign-helped-at-home": ["Sahih al-Bukhari 676"],
  "sign-a-span-closer": ["Sahih al-Bukhari 3470"],
  "sign-uhud-shook": ["Sahih al-Bukhari 3675", "Sahih al-Bukhari 3686"],
  "sign-greeting-stone": ["Sahih Muslim 2277"],
  "sign-around-us": ["Sahih al-Bukhari 1013"],
  "sign-blessed-water": ["Sahih al-Bukhari 3579"],
  "sign-shepherds": ["Sahih al-Bukhari 2262"],
  "sign-date-mountain": ["Sahih al-Bukhari 1410"],
  "sign-deeds-continue": ["Sahih Muslim 1631"],
  "sign-good-intentions": ["Sahih al-Bukhari 6491"],
  "sign-safa-call": ["Sahih al-Bukhari 4770", "Sahih al-Bukhari 4971"],
  "sign-jabir-dates": ["Sahih al-Bukhari 2709"],
  "sign-three-follow": ["Sahih al-Bukhari 6514"],
  "sign-good-in-every-state": ["Sahih Muslim 2999"],
  "sign-your-mother": ["Sahih al-Bukhari 5971"],
  "sign-cheerful-face": ["Sahih Muslim 2626"],
  "sign-learn-and-teach": ["Sahih al-Bukhari 5027"],
  "sign-one-body": ["Sahih al-Bukhari 6011"],
  "sign-eat-near": ["Sahih al-Bukhari 5376"],
  "sign-those-you-love": ["Sahih al-Bukhari 3688"],
  "sign-after-the-salam": ["Sahih Muslim 591"],
  "sign-built-on-five": ["Sahih al-Bukhari 8"],
  "sign-seventy-times": ["Sahih al-Bukhari 6307"],
  "sign-family-ties": ["Sahih al-Bukhari 5986"],
  "sign-pray-as-you-can": ["Sahih al-Bukhari 1117"],
  "sign-even-a-thorn": ["Sahih al-Bukhari 5641"],
  "sign-intentions": ["Sahih al-Bukhari 1"],
  "sign-two-words": ["Sahih al-Bukhari 6406"],
  "sign-half-of-faith": ["Sahih Muslim 223"],
  "sign-three-signs": ["Sahih al-Bukhari 33"],
  "sign-call-to-good": ["Sahih Muslim 2674"],
  "sign-praise-each-bite": ["Sahih Muslim 2734"],
  "sign-good-or-quiet": ["Sahih al-Bukhari 6018"],
  "sign-then-steadfast": ["Sahih Muslim 38"],
  "sign-dearest-deeds": ["Sahih al-Bukhari 527"],
  "sign-truth-leads": ["Sahih al-Bukhari 6094"],
  "sign-ease-a-hardship": ["Sahih Muslim 2699a"],
  "sign-saved-by-mercy": ["Sahih al-Bukhari 6463"],
  "sign-give-while-healthy": ["Sahih al-Bukhari 1419"],
  "sign-strong-believer": ["Sahih Muslim 2664"],
  "sign-forgotten-prayer": ["Sahih al-Bukhari 597"],
  "sign-mustard-of-pride": ["Sahih Muslim 91"],
  "sign-what-backbiting-is": ["Sahih Muslim 2589"],
  "sign-orphan-carer": ["Sahih al-Bukhari 5304"],
  "sign-safe-from-harm": ["Sahih al-Bukhari 10"],
  "sign-refuge-from-anger": ["Sahih al-Bukhari 3282"],
  "sign-gate-ar-rayyan": ["Sahih al-Bukhari 1896"],
  "sign-make-it-easy": ["Sahih al-Bukhari 69"],
  "sign-needle-in-the-sea": ["Sahih Muslim 2577"],
  "sign-hearts-and-deeds": ["Sahih Muslim 2564c"],
  "sign-real-strength": ["Sahih al-Bukhari 6114"],
  "sign-treasure-of-paradise": ["Sahih al-Bukhari 6384"],
  "sign-hundred-levels": ["Sahih al-Bukhari 2790"],
  "sign-faith-at-the-pleiades": ["Sahih al-Bukhari 4897"],
  "sign-sacred-city": ["Sahih al-Bukhari 1834"]
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
    expect(Object.keys(SIGN_LESSONS).length).toBe(900);
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

  test("the scenes of good deeds he taught show each moment in its order, and draw no Prophet, no person and no hand", () => {
    const deeds: SignKind[] = ["lost-camel", "stung-twice", "doors-of-good", "square-and-line", "more-water", "joint-charity"];
    for (const kind of deeds) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|cooks?|riders?|judges?|travell?ers?|believers?|friends?|teeth|mouth|lips?)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing comes down from the sky and nothing is drawn for Allah: His pleasure, a good deed and a prayer are
      // sparks rising, and the lines of the square are drawn on the ground by no hand.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|scrolls?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // The lost camel: a way comes with a laden camel into the desert; the camel runs off; the way looks for it in loops
    // and goes to lie down in a tree's shade; then the camel comes back and stands by it, and gladness rises.
    expect(words("lost-camel")).toEqual(["A man in a desert, with his camel", "It ran off, with his food and drink", "He looked for it, and lost hope", "He lay down in the shade of a tree", "Then there it was, standing by him", "Allah is more pleased when we repent"]);
    const camel = "a camel, carrying food and drink";
    const looking = names("lost-camel", /^a way, looking for it, part \d$/);
    const shade = ["a way, to the shade of the tree", "a way, lying down in the shade"];
    const gladness = names("lost-camel", /^gladness, rising \d$/);
    expect([at("lost-camel", camel, 0.16), shown("lost-camel", "a way, with the camel", 0.16), at("lost-camel", camel, 0.34), all("lost-camel", looking, 0.34)]).toEqual([[1, 0, 0], 1, [0, -100, -4], [0, 0, 0]]);
    expect([looking.length, all("lost-camel", looking, 0.52), shown("lost-camel", camel, 0.52), all("lost-camel", shade, 0.52), all("lost-camel", shade, 0.68), shown("lost-camel", camel, 0.68)]).toEqual([3, [1, 1, 1], 0, [0, 0], [1, 1], 0]);
    expect([at("lost-camel", camel, 0.84), value("lost-camel", camel, "scaleX", 0.84), shown("lost-camel", "gladness over the tree", 0.84), all("lost-camel", gladness, 0.84)]).toEqual([[1, 50, -2], 1, 0, [0, 0, 0, 0]]);
    expect([shown("lost-camel", "gladness over the tree", 1), gladness.map((name) => [shown("lost-camel", name, 1), value("lost-camel", name, "y", 1)])]).toEqual([1, gladness.map(() => [1, -14])]);
    // Not stung twice: a scorpion looks out of a hole in the rocks; a way comes near it and is stung, and goes back;
    // the hole is kept in mind; then a new way passes far from it, and the scorpion looks out to find no one.
    expect(words("stung-twice")).toEqual(["There is a hole in the rocks", "One came near it, and was stung", "A believer is not stung", "From the same hole twice", "He learns, and keeps away from it"]);
    const scorpion = "a scorpion in the hole";
    const near = ["a way, coming near the hole", "a way, going back from it"];
    const far = names("stung-twice", /^a new way, far from the hole, part \d$/);
    const learned = names("stung-twice", /^a lesson learned, rising \d$/);
    expect([shown("stung-twice", scorpion, 0.1), shown("stung-twice", scorpion, 0.14), all("stung-twice", near, 0.14), at("stung-twice", scorpion, 0.275), shown("stung-twice", "the sting", 0.275)]).toEqual([1, 0, [0, 0], [1, -2, 0], 1]);
    expect([all("stung-twice", near, 0.34), shown("stung-twice", "the sting", 0.34), shown("stung-twice", scorpion, 0.34), shown("stung-twice", "the hole, kept in mind", 0.34), shown("stung-twice", "the hole, kept in mind", 0.52), all("stung-twice", far, 0.52)]).toEqual([[1, 1], 0, 0, 0, 1, [0, 0]]);
    expect([far.length, shown("stung-twice", scorpion, 0.655), all("stung-twice", far, 0.72), shown("stung-twice", scorpion, 0.72), all("stung-twice", learned, 0.72), learned.map((name) => [shown("stung-twice", name, 1), value("stung-twice", name, "y", 1)])]).toEqual([2, 1, [1, 1], 0, [0, 0, 0], learned.map(() => [1, -12])]);
    // The doors of good: three doors in a wall open one by one, on a shield; on a fire that a gift dims and water puts
    // out; and, when night comes, on a lamp and a voice praying, with sparks rising.
    expect(words("doors-of-good")).toEqual(["Shall I tell you the doors of good?", "Fasting is a shield", "Charity puts out sins", "As water puts out fire", "And prayer deep in the night"]);
    const doors = ["the first door", "the second door", "the third door"];
    const opened = (t: number) => doors.map((name) => value("doors-of-good", name, "scaleX", t));
    const fire = "a fire, burning";
    const prayer = names("doors-of-good", /^the prayer, rising \d$/);
    expect([opened(0.16), shown("doors-of-good", "the doors, glowing", 0.1), shown("doors-of-good", "the doors, glowing", 0.16), opened(0.34), shown("doors-of-good", "the shield, shining", 0.34)]).toEqual([[1, 1, 1], 1, 0, [0.08, 1, 1], 1]);
    expect([opened(0.52), value("doors-of-good", fire, "scale", 0.4), value("doors-of-good", fire, "scale", 0.52), shown("doors-of-good", "a coin, given", 0.46), shown("doors-of-good", "a coin, given", 0.52)]).toEqual([[0.08, 0.08, 1], 1, 0.6, 1, 0]);
    expect([shown("doors-of-good", "a jug, pouring water", 0.6), value("doors-of-good", "a jug, pouring water", "rotate", 0.6), shown("doors-of-good", "water, poured on the fire", 0.6), shown("doors-of-good", fire, 0.7), shown("doors-of-good", "a jug, pouring water", 0.7), shown("doors-of-good", "smoke, as it goes out", 0.7), shown("doors-of-good", "the night, coming", 0.7)]).toEqual([1, -62, 1, 0, 0, 1, 0]);
    expect([opened(1), shown("doors-of-good", "the night, coming", 1), shown("doors-of-good", "a voice, praying deep in the night", 1), shown("doors-of-good", "a crescent moon", 1), prayer.map((name) => shown("doors-of-good", name, 1))]).toEqual([[0.08, 0.08, 0.08], 1, 1, 1, [1, 1, 1, 1]]);
    // The square and the line: its four sides are drawn on the ground, then a line in its middle going out of it, then
    // small lines beside it; then the square shines as our lifetime, the line going out as our hope, and the small lines
    // turn red as troubles, coming at it.
    expect(words("square-and-line")).toEqual(["A square, drawn on the ground", "And a line through it, going out", "And small lines beside it", "The square is our lifetime", "The line going out is our hope", "The small lines are troubles"]);
    const sides = names("square-and-line", /^the square: /);
    const middle = ["the line in the middle, inside the square", "the line going out of the square"];
    const small = names("square-and-line", /^a small line beside it \d$/);
    const troubles = names("square-and-line", /^a trouble, coming \d$/);
    expect([sides.length, all("square-and-line", sides, 0.02), all("square-and-line", sides, 0.18), all("square-and-line", middle, 0.18), all("square-and-line", middle, 0.34), all("square-and-line", small, 0.34)]).toEqual([4, [0, 0, 0, 0], [1, 1, 1, 1], [0, 0], [1, 1], small.map(() => 0)]);
    expect([small.length, all("square-and-line", small, 0.5), shown("square-and-line", "the lifetime, all around inside the square", 0.5), shown("square-and-line", "the lifetime, all around inside the square", 0.66), shown("square-and-line", "the hope, going out, shining", 0.66), shown("square-and-line", "the hope, going out, shining", 0.82)]).toEqual([6, small.map(() => 1), 0, 1, 0, 1]);
    expect([all("square-and-line", troubles, 0.82), troubles.map((name) => at("square-and-line", name, 1))]).toEqual([troubles.map(() => 0), troubles.map((name, i) => [1, 0, i % 2 ? -2 : 2])]);
    // More water in the soup: a pot cooks before a home; a jug pours more water in; the homes next door are looked to,
    // and two bowls of it go along dashed ways to them; their windows light up, with warmth and sparks rising.
    expect(words("more-water")).toEqual(["When you cook a soup", "Add more water to it", "Then look to your neighbors' homes", "And give them some of it, kindly"]);
    const jug = "a jug, pouring in more water";
    const bowls = names("more-water", /^a bowl of it, for the home on the (left|right)$/);
    const ways = names("more-water", /^a way to the home on the (left|right)$/);
    const kindness = names("more-water", /^kindness, rising \d$/);
    expect([all("more-water", ["the cooking fire", "the soup in it", "steam, rising"], 0.18), shown("more-water", jug, 0.18), shown("more-water", jug, 0.3), value("more-water", jug, "rotate", 0.3), shown("more-water", "more water, poured in", 0.3)]).toEqual([[1, 1, 1], 0, 1, -64, 1]);
    expect([shown("more-water", jug, 0.38), value("more-water", jug, "rotate", 0.38), shown("more-water", jug, 0.42), shown("more-water", "more water, poured in", 0.38), value("more-water", "the soup in it", "y", 0.38), value("more-water", "steam, rising", "scale", 0.38), shown("more-water", "the homes next door, looked to", 0.38)]).toEqual([1, 0, 0, 0, -0.7, 1.35, 0]);
    expect([bowls.length, shown("more-water", "the homes next door, looked to", 0.56), bowls.map((name) => at("more-water", name, 0.56)), all("more-water", ways, 0.56), shown("more-water", "their windows, lit", 0.56)]).toEqual([2, 1, [[1, 0, 0], [1, 0, 0]], [0, 0], 0]);
    expect([shown("more-water", "the homes next door, looked to", 1), all("more-water", bowls, 1), all("more-water", ways, 1), shown("more-water", "their windows, lit", 1), shown("more-water", "warmth in the homes on each side", 1), kindness.map((name) => shown("more-water", name, 1))]).toEqual([0, [0, 0], [1, 1], 1, 1, [1, 1, 1, 1]]);
    // A charity for every joint: the sun rises; a balance tips and comes level; a sack is lifted onto a camel; a voice
    // says a good word; a dashed way goes step by step to the masjid, each step shining; and a stone is moved off the
    // road, as sparks rise.
    expect(words("joint-charity")).toEqual(["Each day the sun rises, every joint owes charity", "Judging fairly between two is charity", "Helping someone load his ride is charity", "A good word is charity", "Every step to the prayer is charity", "Removing harm from the road is charity"]);
    const steps = names("joint-charity", /^a step to the prayer \d$/);
    const shining = names("joint-charity", /^a step's charity, shining \d$/);
    const cleared = names("joint-charity", /^the road cleared, rising \d$/);
    const balance = "its crossbar and pans";
    expect([value("joint-charity", "the sun, rising", "y", 0.02), value("joint-charity", "the sun, rising", "y", 0.14), shown("joint-charity", "the sky by day", 0.14), value("joint-charity", balance, "rotate", 0.14), value("joint-charity", balance, "rotate", 0.19), value("joint-charity", balance, "rotate", 0.3), shown("joint-charity", "the balance, level and fair", 0.3)]).toEqual([22, 0, 1, 0, 12, 0, 1]);
    expect([at("joint-charity", "a sack, lifted onto the camel", 0.32), at("joint-charity", "a sack, lifted onto the camel", 0.48), shown("joint-charity", "a way, coming to help load it", 0.48), shown("joint-charity", "a voice, saying a good word", 0.48), shown("joint-charity", "a voice, saying a good word", 0.62)]).toEqual([[1, 0, 0], [1, 12, -10], 1, 0, 1]);
    expect([steps.length, all("joint-charity", steps, 0.62), all("joint-charity", steps, 0.8), all("joint-charity", shining, 0.8), at("joint-charity", "a stone in the road, moved off it", 0.8)]).toEqual([4, [0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0]]);
    expect([at("joint-charity", "a stone in the road, moved off it", 1), shown("joint-charity", "a way, to the stone", 1), cleared.map((name) => [shown("joint-charity", name, 1), value("joint-charity", name, "y", 1)])]).toEqual([[1, 7, 7], 1, cleared.map(() => [1, -10])]);
  });

  test("the scenes of more wisdom he taught show each moment in its order, and draw no Prophet, no person, no hand and no finger", () => {
    const wisdom: SignKind[] = ["two-wolves", "falling-leaves", "tie-camel", "faith-branches", "sea-drop", "jar-of-gold", "charity-wealth"];
    for (const kind of wisdom) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|shepherds?|buyers?|sellers?|judges?|riders?|believers?|friends?|teeth|mouth|lips?)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing comes down from the sky and nothing is drawn for Allah: a mercy, trust and a rank raised are sparks
      // rising, and no storm hangs over the quarrel, only harsh words.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|scrolls?|lightning|storm)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // Two hungry wolves: at dusk, sheep graze; two wolves come among them and scatter them; then, before a hut, a heap
    // of gold and a crown grow, and the lamp by the hut burns low.
    expect(words("two-wolves")).toEqual(["Two hungry wolves, let loose among sheep", "Do no more harm to them", "Than greed for wealth and honor", "Does to a person's religion"]);
    const sheep = names("two-wolves", /^a sheep of the flock \d$/);
    const wolves = ["a hungry wolf, from the left", "a hungry wolf, from far off"];
    expect([at("two-wolves", wolves[0], 0.02), at("two-wolves", wolves[1], 0.02), wolves.map((name) => at("two-wolves", name, 0.22)), sheep.map((name) => at("two-wolves", name, 0.22)), shown("two-wolves", "a heap of gold, growing", 0.22)]).toEqual([[1, -60, 0], [0, 16, -14], [[1, 0, 0], [1, 0, 0]], sheep.map(() => [1, 0, 0]), 0]);
    expect([sheep.length, sheep.map((name) => [...at("two-wolves", name, 0.44), value("two-wolves", name, "scaleX", 0.44)]), wolves.map((name) => at("two-wolves", name, 0.44)), shown("two-wolves", "a heap of gold, growing", 0.46)]).toEqual([
      4,
      [
        [1, 44, -8, 1],
        [1, 40, 5, -1],
        [1, 24, 8, 1],
        [1, 26, 6, -1]
      ],
      [
        [1, 14, -1],
        [1, 10, 6]
      ],
      0
    ]);
    expect([shown("two-wolves", "a heap of gold, growing", 0.7), value("two-wolves", "a heap of gold, growing", "scale", 0.7), at("two-wolves", "a crown over it", 0.7), value("two-wolves", "the lamp's flame", "scale", 0.7), shown("two-wolves", "the lamp's light", 0.7), shown("two-wolves", "smoke, as it burns low", 0.7)]).toEqual([1, 1, [1, 0, 0], 1, 1, 0]);
    expect([value("two-wolves", "a heap of gold, growing", "scale", 1), at("two-wolves", "a crown over it", 1), value("two-wolves", "the lamp's flame", "scale", 1), shown("two-wolves", "the lamp's light", 1), shown("two-wolves", "smoke, as it burns low", 1), wolves.map((name) => shown("two-wolves", name, 1))]).toEqual([1.15, [1, 0, -2], 0.35, 0.12, 1, [1, 1]]);
    // The leaves that fall: a way goes along a path, its sins dark marks on it, and is pricked by a thorn; the marks are
    // wiped away as sparks rise; then the way goes on to a tree, and its dry leaves fall to the ground.
    expect(words("falling-leaves")).toEqual(["No Muslim is hurt by anything", "Even the prick of a thorn", "But Allah wipes away his sins by it", "As a tree sheds its leaves"]);
    const marks = names("falling-leaves", /^its sins, dark marks on the way \d$/);
    const leaves = names("falling-leaves", /^a dry leaf on the tree \d+$/);
    const mercy = names("falling-leaves", /^a mercy, rising \d$/);
    expect([marks.length, shown("falling-leaves", "a way, along the path", 0.18), all("falling-leaves", marks, 0.18), shown("falling-leaves", "a way, coming to the thorns", 0.18), shown("falling-leaves", "the prick of a thorn", 0.18)]).toEqual([3, 1, [1, 1, 1], 0, 0]);
    expect([shown("falling-leaves", "the prick of a thorn", 0.275), shown("falling-leaves", "a way, coming to the thorns", 0.275), shown("falling-leaves", "the prick of a thorn", 0.36), all("falling-leaves", marks, 0.36), shown("falling-leaves", "a way, going on to the tree", 0.36)]).toEqual([1, 1, 0, [1, 1, 1], 0]);
    expect([all("falling-leaves", marks, 0.6), all("falling-leaves", mercy, 0.6), shown("falling-leaves", "a way, going on to the tree", 0.6), leaves.map((name) => at("falling-leaves", name, 0.62))]).toEqual([[0, 0, 0], [0, 0, 0], 1, leaves.map(() => [1, 0, 0])]);
    expect([leaves.length, leaves.map((name) => value("falling-leaves", name, "y", 1) > 30), leaves.map((name) => shown("falling-leaves", name, 1))]).toEqual([10, leaves.map(() => true), leaves.map(() => 1)]);
    // Tie it, and trust Allah: a way comes with a camel; a voice asks as the camel starts to wander off; a voice from the
    // home answers; the camel is brought back and a rope ties it to a post; then the way goes in, and trust rises.
    expect(words("tie-camel")).toEqual(["A man came, with his camel", "Shall I leave it loose, and trust Allah?", "Tie it, and trust Allah", "Do your part, then trust Him"]);
    const trust = names("tie-camel", /^trust, rising \d$/);
    expect([at("tie-camel", "a camel", 0.02), at("tie-camel", "a camel", 0.18), shown("tie-camel", "a way, with the camel", 0.18), shown("tie-camel", "a voice, asking", 0.18), shown("tie-camel", "a voice, asking", 0.3)]).toEqual([[1, -70, 0], [1, 0, 0], 1, 0, 1]);
    expect([at("tie-camel", "a camel", 0.4), value("tie-camel", "a camel", "scaleX", 0.4), shown("tie-camel", "a voice, asking", 0.4), shown("tie-camel", "a voice from the home, answering", 0.48), shown("tie-camel", "a rope, tying it to the post", 0.48)]).toEqual([[1, -10, -4], -1, 0, 1, 0]);
    expect([at("tie-camel", "a camel", 0.62), value("tie-camel", "a camel", "scaleX", 0.62), shown("tie-camel", "a rope, tying it to the post", 0.62), shown("tie-camel", "a voice from the home, answering", 0.62), shown("tie-camel", "a way, going in", 0.62), all("tie-camel", trust, 0.62)]).toEqual([[1, 0, 0], 1, 1, 0, 0, [0, 0, 0, 0]]);
    expect([shown("tie-camel", "a way, going in", 1), shown("tie-camel", "a rope, tying it to the post", 1), trust.map((name) => [shown("tie-camel", name, 1), value("tie-camel", name, "y", 1)])]).toEqual([1, 1, trust.map(() => [1, -12])]);
    // The branches of faith: a tree grows branch after branch; its highest branch shines; a way comes along the road,
    // and a stone on it moves off to the side, as the lowest branch shines; then a branch blossoms, for modesty.
    expect(words("faith-branches")).toEqual(["Faith has over seventy, or sixty, branches", "The highest: saying there is no god but Allah", "The lowest: removing harm from the road", "And modesty is a branch of faith"]);
    const branches = [...names("faith-branches", /^a branch \d$/), "the highest branch"];
    const light = names("faith-branches", /^its light, rising \d$/);
    const scaled = (t: number) => branches.map((name) => value("faith-branches", name, "scale", t));
    expect([branches.length, value("faith-branches", "the trunk of a tree", "scaleY", 0.02), scaled(0.02), value("faith-branches", "the trunk of a tree", "scaleY", 0.24), scaled(0.24), shown("faith-branches", "the highest branch, shining", 0.24)]).toEqual([9, 0.15, branches.map(() => 0), 1, branches.map(() => 1), 0]);
    expect([shown("faith-branches", "the highest branch, shining", 0.5), light.map((name) => [shown("faith-branches", name, 0.5), value("faith-branches", name, "y", 0.5)]), at("faith-branches", "a stone lying on the road", 0.5), shown("faith-branches", "the lowest branch, shining", 0.5)]).toEqual([1, light.map(() => [1, -10]), [1, 0, 0], 0]);
    expect([at("faith-branches", "a stone lying on the road", 0.74), shown("faith-branches", "a way, along the road", 0.74), shown("faith-branches", "the lowest branch, shining", 0.74), value("faith-branches", "blossoms of modesty on a branch", "scale", 0.74)]).toEqual([[1, 15, -13], 1, 1, 0]);
    expect([value("faith-branches", "blossoms of modesty on a branch", "scale", 1), shown("faith-branches", "modesty's branch, glowing", 1), shown("faith-branches", "the highest branch, shining", 1)]).toEqual([1, 1, 1]);
    // The sea and the drop: light runs across a wide sea; rings spread where something dipped in it, and no finger is
    // drawn; a single drop rises from them and hangs, so small; and the whole sea shines around it.
    expect(words("sea-drop")).toEqual(["This world, beside the Hereafter", "Is like a finger dipped in the sea", "Then see what it brings back", "A drop, beside the whole sea"]);
    const rings = names("sea-drop", /^a ring spreading on the water \d$/);
    const drop = "a drop it brings back";
    expect([shown("sea-drop", "light running across the sea, to the edge of sight", 0.1), shown("sea-drop", "light running across the sea, to the edge of sight", 0.24), all("sea-drop", rings, 0.24), shown("sea-drop", drop, 0.24)]).toEqual([1, 0, [0, 0, 0], 0]);
    expect([rings.length, shown("sea-drop", "a splash, where it dipped", 0.32), shown("sea-drop", rings[0], 0.3), all("sea-drop", rings, 0.5), shown("sea-drop", drop, 0.5)]).toEqual([3, 1, 1, [0, 0, 0], 0]);
    expect([at("sea-drop", drop, 0.74), shown("sea-drop", "so little, beside it all", 0.74), shown("sea-drop", "the whole sea, shining", 0.74), at("sea-drop", drop, 1), shown("sea-drop", "the whole sea, shining", 1), shown("sea-drop", "glints across the sea", 1)]).toEqual([[1, 0, -17], 1, 0, [1, 0, -17], 1, 1]);
    // The jar of gold: the price goes along a way from one home to the other; a way digs in the land and a jar of gold
    // rises; it is taken to the home that sold the land and comes back; ways go to a home where a voice judges; the
    // two homes are joined by a line of light; the gold goes to both homes, and the rest rises as sparks.
    expect(words("jar-of-gold")).toEqual(["A man bought land from another", "And found in it a jar of gold", "Take your gold: I bought only the land", "I sold you the land, and all in it", "Marry the girl to the boy", "Spend on them, and give the rest in charity"]);
    const jar = "a jar of gold";
    const asked = names("jar-of-gold", /^a way from the home that (sold|bought) it, to ask$/);
    const spent = names("jar-of-gold", /^the gold, spent on the home that (sold|bought) it$/);
    const charity = names("jar-of-gold", /^the rest, given in charity \d$/);
    expect([shown("jar-of-gold", "a way, for the price", 0.16), at("jar-of-gold", "the price, paid", 0.16), shown("jar-of-gold", "the land, sold", 0.16), shown("jar-of-gold", jar, 0.16)]).toEqual([1, [0, -97, -1], 1, 0]);
    expect([at("jar-of-gold", jar, 0.32), shown("jar-of-gold", "the gold, shining", 0.32), shown("jar-of-gold", "a way, digging in the land", 0.32), shown("jar-of-gold", "the earth, dug", 0.32), shown("jar-of-gold", "a way, for the price", 0.32), shown("jar-of-gold", "the land, sold", 0.32)]).toEqual([[1, 0, 0], 1, 1, 1, 0, 0]);
    expect([shown("jar-of-gold", "a voice, giving the gold back", 0.45), at("jar-of-gold", jar, 0.5), shown("jar-of-gold", "a voice, giving the gold back", 0.5), shown("jar-of-gold", "a voice from that home, giving it back again", 0.56), at("jar-of-gold", jar, 0.66), shown("jar-of-gold", "a voice from that home, giving it back again", 0.66)]).toEqual([1, [1, -58, 1], 0, 1, [1, 0, 0], 0]);
    expect([asked.length, all("jar-of-gold", asked, 0.66), shown("jar-of-gold", "a voice from the home they went to, judging", 0.76), all("jar-of-gold", asked, 0.82), shown("jar-of-gold", "a voice from the home they went to, judging", 0.82), shown("jar-of-gold", "the two homes, joined", 0.82), shown("jar-of-gold", "their windows, lit", 0.82), all("jar-of-gold", ["a way, digging in the land", "a way, taking it to the home that sold it"], 0.82)]).toEqual([2, [0, 0], 1, [1, 1], 0, 1, 1, [0, 0]]);
    expect([spent.length, spent.map((name) => at("jar-of-gold", name, 0.84)), spent.map((name) => at("jar-of-gold", name, 1)), charity.map((name) => [shown("jar-of-gold", name, 1), value("jar-of-gold", name, "y", 1)]), at("jar-of-gold", jar, 1)]).toEqual([
      2,
      [
        [0, 0, 0],
        [0, 0, 0]
      ],
      [
        [0, -62, -9],
        [0, 42, -9]
      ],
      charity.map(() => [1, -8]),
      [1, 0, 0]
    ]);
    // Charity never lessens wealth: gold goes from a chest to the home next door, and the chest stays full; harsh words
    // come from next door, a voice forgives, and honor shines on the home; then a voice prays low on a prayer mat, and
    // the home is raised up on a hill.
    expect(words("charity-wealth")).toEqual(["Charity does not lessen wealth", "Allah adds honor to one who forgives", "And raises up one who is humble for Him"]);
    const given = names("charity-wealth", /^gold given in charity \d$/);
    const honor = names("charity-wealth", /^honor, rising \d$/);
    const raised = names("charity-wealth", /^raised up, rising \d$/);
    const lifted = ["a home, with a chest of gold", "a chest of gold", "a prayer mat", "honor, shining on the home"];
    expect([given.length, given.map((name) => at("charity-wealth", name, 0.14)), given.map((name) => at("charity-wealth", name, 0.3)), shown("charity-wealth", "a way to the home next door", 0.3), shown("charity-wealth", "the chest, still full", 0.3), shown("charity-wealth", "harsh words from the home next door", 0.3)]).toEqual([
      3,
      [
        [1, 35, -6],
        [0, 0, 0],
        [0, 0, 0]
      ],
      given.map(() => [0, 71, 6]),
      1,
      1,
      0
    ]);
    expect([shown("charity-wealth", "harsh words from the home next door", 0.44), shown("charity-wealth", "a voice, forgiving", 0.44), shown("charity-wealth", "honor, shining on the home", 0.44), shown("charity-wealth", "a way to the home next door", 0.44)]).toEqual([1, 1, 0, 0]);
    expect([shown("charity-wealth", "harsh words from the home next door", 0.64), shown("charity-wealth", "a voice, forgiving", 0.64), shown("charity-wealth", "honor, shining on the home", 0.64), honor.map((name) => [shown("charity-wealth", name, 0.64), value("charity-wealth", name, "y", 0.64)]), shown("charity-wealth", "a prayer mat", 0.64)]).toEqual([0, 0, 1, honor.map(() => [1, -10]), 0]);
    expect([shown("charity-wealth", "a prayer mat", 0.75), shown("charity-wealth", "a voice, praying low and humbly", 0.75), shown("charity-wealth", "a hill, rising under the home", 0.75), lifted.map((name) => value("charity-wealth", name, "y", 0.75))]).toEqual([1, 1, 0, [0, 0, 0, 0]]);
    expect([shown("charity-wealth", "a hill, rising under the home", 1), value("charity-wealth", "a hill, rising under the home", "scaleY", 1), lifted.map((name) => value("charity-wealth", name, "y", 1)), raised.map((name) => [shown("charity-wealth", name, 1), value("charity-wealth", name, "y", 1)]), shown("charity-wealth", "a voice, praying low and humbly", 1)]).toEqual([1, 1, [-12, -12, -12, -12], raised.map(() => [1, -10]), 0]);
  });

  test("the scenes from his ﷺ life show each moment in its order, and draw no Prophet, no person, no hand and no devil", () => {
    const life: SignKind[] = ["crying-trunk", "trench-rock", "chasing-horse", "milk-bowl", "bread-for-seventy", "nightfall", "half-date"];
    for (const kind of life) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|riders?|believers?|friends?|companions?|teeth|mouth|lips?|belly|devils?|satan|shaytan|Anas|Hurairah|Sulaym|Talhah|Bara)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing comes down from the sky and nothing is drawn for Allah: a blessing, calm and praise are sparks rising;
      // and nothing of the Fire is drawn, only a shield of light.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|scrolls?|lightning|storm|fire|flames?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    // The palm trunk that cried: in the mosque, a voice speaks by a palm trunk; a pulpit of three steps is made, a way
    // goes up it and the voice speaks from it; the trunk shakes, crying to each side; then a way goes back to it from
    // the pulpit, a glow holds it, its crying stops, and calm rises as sparks.
    expect(words("crying-trunk")).toEqual(["On Fridays, he spoke standing by a palm trunk", "Then a pulpit was made for him", "And the trunk cried like a child", "Until he came down and held it"]);
    const crying = ["its crying, to the left", "its crying, to the right"];
    const calm = names("crying-trunk", /^calm, rising \d$/);
    const trunk = "the palm trunk he stood by";
    const pulpit = "a pulpit of three steps, made for him";
    expect([shown("crying-trunk", "a voice by the trunk, speaking", 0.22), shown("crying-trunk", pulpit, 0.22), value("crying-trunk", pulpit, "scaleY", 0.22), all("crying-trunk", crying, 0.22)]).toEqual([1, 0, 0.15, [0, 0]]);
    expect([shown("crying-trunk", "a voice by the trunk, speaking", 0.46), value("crying-trunk", pulpit, "scaleY", 0.46), shown("crying-trunk", "a way, going up the pulpit", 0.46), shown("crying-trunk", "a voice from the pulpit", 0.46), all("crying-trunk", crying, 0.46), value("crying-trunk", trunk, "rotate", 0.46)]).toEqual([0, 1, 1, 1, [0, 0], 0]);
    expect([shown("crying-trunk", "a voice from the pulpit", 0.6), all("crying-trunk", crying, 0.6), value("crying-trunk", trunk, "rotate", 0.52), value("crying-trunk", trunk, "rotate", 0.545), value("crying-trunk", trunk, "rotate", 0.7), shown("crying-trunk", "a way, from the pulpit to the trunk", 0.7)]).toEqual([0, [1, 1], 1.4, -1.4, 0, 0]);
    expect([calm.length, shown("crying-trunk", "a way, going up the pulpit", 1), shown("crying-trunk", "a way, from the pulpit to the trunk", 1), shown("crying-trunk", "a glow, holding the trunk", 1), all("crying-trunk", crying, 1), risen("crying-trunk", calm, 1)]).toEqual([3, 0, 1, 1, [0, 0], calm.map(() => [1, -10])]);
    // The rock that became sand: the trench is dug across the land and reaches a great rock; two spades strike it and
    // glance off; a way comes, a third spade strikes it once, and the rock becomes a heap of soft sand as sparks rise.
    expect(words("trench-rock")).toEqual(["Digging the trench, they met a great rock", "None of their spades could break it", "He came, and struck it with the spade", "And it became like soft sand"]);
    const spades = ["a spade, digging 1", "a spade, digging 2"];
    const glancing = names("trench-rock", /^a strike, glancing off \d$/);
    const cleared = names("trench-rock", /^the way cleared, rising \d$/);
    const rock = "a great rock in the trench";
    const sand = "soft sand, where the rock was";
    expect([value("trench-rock", "the trench, being dug", "scaleX", 0.02), value("trench-rock", "the trench, being dug", "scaleX", 0.24), shown("trench-rock", rock, 0.24), spades.map((name) => at("trench-rock", name, 0.24))]).toEqual([0.22, 1, 1, [[1, 0, 0], [1, 0, 0]]]);
    expect([glancing.length, spades.map((name) => at("trench-rock", name, 0.33)), value("trench-rock", spades[0], "rotate", 0.34), value("trench-rock", spades[1], "rotate", 0.38), shown("trench-rock", glancing[0], 0.345), shown("trench-rock", rock, 0.345)]).toEqual([4, [[1, 49, -2], [1, 52, -2]], -28, 28, 1, 1]);
    expect([spades.map((name) => shown("trench-rock", name, 0.48)), shown("trench-rock", rock, 0.48), all("trench-rock", glancing, 0.48), shown("trench-rock", "a way, coming to the rock", 0.48)]).toEqual([[1, 1], 1, [0, 0, 0, 0], 0]);
    expect([spades.map((name) => shown("trench-rock", name, 0.72)), shown("trench-rock", "a way, coming to the rock", 0.72), shown("trench-rock", "a spade, striking once", 0.72), value("trench-rock", "a spade, striking once", "rotate", 0.63), value("trench-rock", "a spade, striking once", "rotate", 0.72), shown("trench-rock", "the strike", 0.66), shown("trench-rock", rock, 0.72), shown("trench-rock", sand, 0.72)]).toEqual([[0, 0], 1, 1, -42, 0, 1, 1, 0]);
    expect([shown("trench-rock", rock, 1), shown("trench-rock", sand, 1), value("trench-rock", sand, "scale", 1), shown("trench-rock", "sand, running down", 1), risen("trench-rock", cleared, 1)]).toEqual([0, 1, 1, 0, cleared.map(() => [1, -10])]);
    // The horse that threw its rider: a camel goes along the road, a dashed way behind it, and a horse gallops after it
    // and catches up; a voice from the camel makes du'a, and the horse pitches into the sand in a cloud of dust; it stands
    // up neighing, and a voice from where it is asks; a voice from the camel answers; then the camel goes on to Madinah,
    // the horse turns to face the road behind, dust coming along it turns back, and the sun sets.
    expect(words("chasing-horse")).toEqual(["On the road to Madinah, a horseman caught up", "O Allah, throw him down: and it threw him", "It stood up neighing: order me what you wish", "Stay where you are: let no one reach us", "Chasing in the morning, guarding by evening"]);
    const camel = "a camel, going to Madinah";
    const horse = "a horse, chasing them";
    const dust = names("chasing-horse", /^dust, as it falls \d$/);
    const behind = "dust on the road behind, coming and turning back";
    expect([at("chasing-horse", camel, 0.02), at("chasing-horse", horse, 0.02), at("chasing-horse", camel, 0.2), at("chasing-horse", horse, 0.2), shown("chasing-horse", "a way, along the road behind them", 0.2), shown("chasing-horse", "a voice from the camel, making du'a", 0.2)]).toEqual([
      [1, -22, 0.6],
      [0, -66, 0],
      [1, 0, 0],
      [1, 0, 0],
      1,
      0
    ]);
    expect([shown("chasing-horse", "a voice from the camel, making du'a", 0.28), value("chasing-horse", horse, "rotate", 0.3), dust.length, all("chasing-horse", dust, 0.39), dust.map((name) => value("chasing-horse", name, "y", 0.39)), value("chasing-horse", horse, "rotate", 0.42), value("chasing-horse", horse, "y", 0.42), all("chasing-horse", dust, 0.42)]).toEqual([1, 0, 3, [1, 1, 1], [-7, -7, -7], 38, 3, [0, 0, 0]]);
    expect([value("chasing-horse", horse, "rotate", 0.62), value("chasing-horse", horse, "y", 0.62), shown("chasing-horse", "its neighing", 0.55), shown("chasing-horse", "a voice from where the horse is, asking", 0.58), shown("chasing-horse", "its neighing", 0.62), shown("chasing-horse", "a voice from where the horse is, asking", 0.62)]).toEqual([0, 0, 1, 1, 0, 0]);
    expect([shown("chasing-horse", "a voice from the camel, answering", 0.7), shown("chasing-horse", "a voice from the camel, answering", 0.8), at("chasing-horse", camel, 0.8), value("chasing-horse", horse, "scaleX", 0.8), shown("chasing-horse", "evening, falling", 0.8)]).toEqual([1, 0, [1, 0, 0], 1, 0]);
    expect([at("chasing-horse", behind, 0.9), shown("chasing-horse", "a voice from where the horse is, guarding", 0.9), at("chasing-horse", camel, 1), value("chasing-horse", horse, "scaleX", 1), at("chasing-horse", horse, 1), shown("chasing-horse", "a way, going on to Madinah", 1), shown("chasing-horse", behind, 1), shown("chasing-horse", "a voice from where the horse is, guarding", 1), shown("chasing-horse", "the sun, crossing the sky as the day ends", 1), shown("chasing-horse", "evening, falling", 1)]).toEqual([
      [1, 0, 0],
      1,
      [1, 48, -1.4],
      -1,
      [1, 0, 0],
      1,
      0,
      0,
      0,
      0.45
    ]);
    // One bowl of milk: a bowl at the door of a home; a way goes to the Suffah and places fill in a row; the bowl goes
    // from place to place and stays full, as sparks rise at each; it comes to one more place by the door, where a voice
    // says drink; then it goes in, what was left is drunk, and praise rises as sparks.
    expect(words("milk-bowl")).toEqual(["One bowl of milk, given as a gift", "Call the people of the Suffah", "Each drank his fill, one by one", "There remain you and I: drink", "And he drank what was left"]);
    const places = names("milk-bowl", /^a place, sitting \d$/);
    const praise = names("milk-bowl", /^praise, rising \d$/);
    const bowl = "a bowl of milk, given as a gift";
    expect([at("milk-bowl", bowl, 0.18), shown("milk-bowl", "a way to the Suffah", 0.18), all("milk-bowl", places, 0.18)]).toEqual([[1, 0, 0], 0, [0, 0, 0, 0, 0]]);
    expect([places.length, at("milk-bowl", bowl, 0.36), shown("milk-bowl", "a way to the Suffah", 0.36), shown("milk-bowl", "a way back from the Suffah", 0.36), all("milk-bowl", places, 0.36)]).toEqual([5, [1, 0, 0], 1, 1, [1, 1, 1, 1, 1]]);
    expect([at("milk-bowl", bowl, 0.41), at("milk-bowl", bowl, 0.6), value("milk-bowl", "the milk in it", "scaleY", 0.6), shown("milk-bowl", "a way to the Suffah", 0.6), shown("milk-bowl", "a place by the door", 0.6)]).toEqual([[1, -62, 4], [1, -14, 4], 1, 0, 0]);
    expect([at("milk-bowl", bowl, 0.8), shown("milk-bowl", "a place by the door", 0.8), shown("milk-bowl", "a voice from the home, saying drink", 0.7), shown("milk-bowl", "a voice from the home, saying drink", 0.8)]).toEqual([[1, -8, 4], 1, 1, 0]);
    expect([at("milk-bowl", bowl, 1), value("milk-bowl", "the milk in it", "scaleY", 1), risen("milk-bowl", praise, 1)]).toEqual([[1, 0, 0], 0.2, praise.map(() => [1, -10])]);
    // Bread for seventy: a bundle of loaves goes along a small way to the mosque and back; ways come from the mosque;
    // the bread is broken on a cloth, butter on it; ten small dashed circles come in and go out full, again and again;
    // and the bread is still there, as sparks rise.
    expect(words("bread-for-seventy")).toEqual(["A few barley loaves, sent in a cloth", "He came, and all with him", "Broken in pieces, with butter on them", "Let ten come in: they ate their fill, and went out", "Until all had eaten: seventy or eighty"]);
    const bundle = "barley loaves, wrapped in a cloth";
    const coming = names("bread-for-seventy", /^a way from the mosque, coming \d$/);
    const tens = names("bread-for-seventy", /^ten, (coming in|going out full), (first|second|third)$/);
    const fed = names("bread-for-seventy", /^all fed, rising \d$/);
    expect([at("bread-for-seventy", bundle, 0.18), shown("bread-for-seventy", "a small way, carrying them", 0.18), all("bread-for-seventy", coming, 0.18)]).toEqual([[1, 70, -1], 1, [0, 0, 0]]);
    expect([coming.length, at("bread-for-seventy", bundle, 0.36), shown("bread-for-seventy", "a small way, carrying them", 0.36), all("bread-for-seventy", coming, 0.36), shown("bread-for-seventy", "a cloth spread out", 0.36)]).toEqual([3, [1, 0, 0], 0, [1, 1, 1], 0]);
    expect([shown("bread-for-seventy", bundle, 0.54), shown("bread-for-seventy", "a cloth spread out", 0.54), shown("bread-for-seventy", "the loaves, whole", 0.44), shown("bread-for-seventy", "the loaves, whole", 0.54), shown("bread-for-seventy", "the bread, broken in pieces", 0.54), shown("bread-for-seventy", "butter, poured on it", 0.54), all("bread-for-seventy", tens, 0.54)]).toEqual([0, 1, 1, 0, 1, 1, tens.map(() => 0)]);
    expect([tens.length, at("bread-for-seventy", "ten, coming in, first", 0.575), at("bread-for-seventy", "ten, coming in, first", 0.601), shown("bread-for-seventy", "ten, going out full, first", 0.601), shown("bread-for-seventy", "ten, coming in, first", 0.62), shown("bread-for-seventy", "ten, going out full, first", 0.62), shown("bread-for-seventy", "ten, coming in, second", 0.65), shown("bread-for-seventy", "ten, going out full, third", 0.74)]).toEqual([6, [0, 40, 2], [1, 0, -2], 0, 0, 1, 1, 1]);
    expect([all("bread-for-seventy", tens, 0.8), shown("bread-for-seventy", "the bread, broken in pieces", 1), shown("bread-for-seventy", "the bread, still there", 1), risen("bread-for-seventy", fed, 1)]).toEqual([tens.map(() => 0), 1, 1, fed.map(() => [1, -10])]);
    // The home at nightfall: the sun sets and night falls on a home; two small ways come in; the door closes as a voice
    // says Bismillah; a cord ties the water skin and a stick is laid across the cup; then the lamp in the window goes
    // out, and more stars come out. No devil is drawn.
    expect(words("nightfall")).toEqual(["When night first falls, keep the children close", "Close the door, and say Allah's name", "Tie the water skin, and cover the cup", "And put out the lamp when you sleep"]);
    const home = ["a small way, coming home", "another small way, coming home"];
    const stick = "a stick, laid across the cup";
    expect([at("nightfall", "the setting sun", 0.02), at("nightfall", "the setting sun", 0.24), shown("nightfall", "night, falling", 0.24), all("nightfall", home, 0.24), shown("nightfall", "the first stars", 0.24), value("nightfall", "the door, closing", "scaleX", 0.24)]).toEqual([[1, 0, 0], [0, 0, 10], 0.82, [1, 1], 1, 0.12]);
    expect([value("nightfall", "the door, closing", "scaleX", 0.48), shown("nightfall", "a voice, saying Bismillah at the door", 0.33), shown("nightfall", "a voice, saying Bismillah at the door", 0.48), shown("nightfall", "a cord, tying the water skin", 0.48), shown("nightfall", stick, 0.48)]).toEqual([1, 1, 0, 0, 0]);
    expect([shown("nightfall", "a cord, tying the water skin", 0.72), at("nightfall", stick, 0.58), value("nightfall", stick, "rotate", 0.58), at("nightfall", stick, 0.72), value("nightfall", stick, "rotate", 0.72), shown("nightfall", "the lamp's light in the window", 0.72), shown("nightfall", "the window, dark", 0.72)]).toEqual([1, [1, -12, 13], 36, [1, 0, 0], 0, 1, 0]);
    expect([shown("nightfall", "the lamp's light in the window", 1), shown("nightfall", "the window, dark", 1), shown("nightfall", "more stars, coming out", 0.8), shown("nightfall", "more stars, coming out", 1)]).toEqual([0, 1, 0, 1]);
    // Even half a date: a way comes out of a home with a date; the date is split, and half of it goes to a home in need
    // along a way, as a shield of light rises around the way; then a way comes from another home, a voice says a good
    // word, and a shield rises around it too, as sparks rise. Nothing of the Fire is drawn.
    expect(words("half-date")).toEqual(["Shield yourselves from the Fire", "Even with half a date", "And if you have none, with a good word"]);
    const good = names("half-date", /^a good deed, rising \d$/);
    const shield = "a shield of light around the way";
    const another = "a shield of light around that way too";
    expect([shown("half-date", "a way, from the home that gives", 0.24), shown("half-date", "a date", 0.12), shown("half-date", "a date", 0.24), shown("half-date", "half a date, kept", 0.24), at("half-date", "half a date, given", 0.24)]).toEqual([1, 1, 0, 1, [1, 0, 0]]);
    expect([at("half-date", "half a date, given", 0.5), shown("half-date", "a way to the home in need", 0.5), shown("half-date", shield, 0.5), value("half-date", shield, "scale", 0.5), shown("half-date", "a way, from another home", 0.5)]).toEqual([[1, 62, 1], 1, 1, 1, 0]);
    expect([shown("half-date", "a voice, saying a good word", 0.7), shown("half-date", another, 0.7), shown("half-date", "a voice, saying a good word", 1), shown("half-date", another, 1), value("half-date", another, "scale", 1), risen("half-date", good, 1)]).toEqual([1, 0, 0, 1, 1, good.map(() => [1, -10])]);
  });

  test("more scenes from his ﷺ life and from what he told show each moment in its order, and draw no Prophet, no person, no hand and no angel", () => {
    const grace: SignKind[] = ["lamp-out", "helped-at-home", "a-span-closer", "uhud-shook", "greeting-stone", "around-us", "blessed-water"];
    for (const kind of grace) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|teeth|mouth|lips?|belly|killer|monk|devils?|satan|shaytan|Aishah|Abu Bakr|Umar|Uthman|Mas'ud)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah and nothing comes down from the sky but the rain; nothing of the killing is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|scrolls?|lightning|storm|fire|flames?|blood|swords?|knife)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    // The lamp put out: a visitor and his host come in at the door; the little ones go to sleep on the mat; a way goes
    // from her place to the lamp and it goes out; in the dark the pot comes to the visitor and its food is eaten, while
    // sounds only seem like eating, and the two go to the mat; with the morning, praise rises.
    expect(words("lamp-out")).toEqual(["A hungry guest came: who will host him?", "Only the little ones' food: let them sleep", "And she put out the light", "In the dark he ate, and they slept hungry", "Then Allah revealed 59:9 about them"]);
    const entering = ["a way, coming in at the door", "another way, coming in with it"];
    const praise = names("lamp-out", /^praise, rising \d$/);
    expect([all("lamp-out", entering, 0.18), shown("lamp-out", "the place where the visitor sat", 0.18), shown("lamp-out", "the host's place", 0.18), shown("lamp-out", "the lamp's light", 0.18), shown("lamp-out", "the room, dark", 0.18)]).toEqual([[1, 1], 1, 1, 1, 0]);
    expect([all("lamp-out", entering, 0.38), value("lamp-out", "the little ones' places", "x", 0.38), shown("lamp-out", "a blanket over the little ones", 0.38), shown("lamp-out", "the lamp's light", 0.38)]).toEqual([[0, 0], 37, 1, 1]);
    expect([shown("lamp-out", "a way, from her place to the lamp", 0.56), shown("lamp-out", "the lamp's light", 0.56), shown("lamp-out", "the room, dark", 0.56), value("lamp-out", "a small pot of food", "x", 0.56)]).toEqual([1, 0, 0.6, 0]);
    expect([shown("lamp-out", "small sounds in the dark, as if eating", 0.66), value("lamp-out", "a small pot of food", "x", 0.78), value("lamp-out", "the food in it", "scaleY", 0.78), value("lamp-out", "the host's place", "x", 0.78), value("lamp-out", "her place by the cloth", "x", 0.78), shown("lamp-out", "small sounds in the dark, as if eating", 0.78)]).toEqual([1, -6, 0.12, 47, 67, 0]);
    expect([praise.length, shown("lamp-out", "the window at dawn", 1), shown("lamp-out", "the room, dark", 1), risen("lamp-out", praise, 1)]).toEqual([3, 1, 0.1, praise.map(() => [1, -10])]);
    // He helped at home: a way comes home; it goes from one of his family to the next, and a warm glow comes on each in
    // turn; the call to prayer rises from the mosque's roof; and the way goes out to the mosque, where the prayer rises.
    // No chore is drawn that Aishah did not name.
    expect(words("helped-at-home")).toEqual(["Aishah was asked: what did he do at home?", "He was busy serving his family", "When the time for prayer came", "He went out to the prayer"]);
    const serving = ["a way, going to the first of them", "the way, going to the next", "the way, going to the last"];
    const warmth = ["a warm glow on the first place", "a warm glow on the next place", "a warm glow on the last place"];
    const prayer = names("helped-at-home", /^the prayer, rising \d$/);
    expect(names("helped-at-home", /broom|sweep|jar|dust|cook|pot|bucket|sew|mend|milk/i)).toEqual([]);
    expect([shown("helped-at-home", "a way, coming home", 0.22), all("helped-at-home", serving, 0.22), all("helped-at-home", warmth, 0.22)]).toEqual([1, [0, 0, 0], [0, 0, 0]]);
    expect([all("helped-at-home", serving, 0.32), all("helped-at-home", warmth, 0.32), all("helped-at-home", serving, 0.39), all("helped-at-home", warmth, 0.39)]).toEqual([[1, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 0]]);
    expect([shown("helped-at-home", "a way, coming home", 0.52), all("helped-at-home", serving, 0.52), all("helped-at-home", warmth, 0.52)]).toEqual([0, [1, 1, 1], [1, 1, 1]]);
    expect([shown("helped-at-home", "the call to prayer, from the mosque's roof", 0.64), shown("helped-at-home", "the call to prayer, from the mosque's roof", 0.72), value("helped-at-home", "the sun", "x", 0.72), shown("helped-at-home", "a way, out to the mosque", 0.72)]).toEqual([1, 0, 52, 0]);
    expect([prayer.length, shown("helped-at-home", "a way, out to the mosque", 1), risen("helped-at-home", prayer, 1)]).toEqual([3, 1, prayer.map(() => [1, -10])]);
    // A span closer: a voice asks and a voice from the hut answers; a way sets out from the village he left, goes on
    // and stops at a ring; the village ahead comes near and the one he left goes far; the two are measured, the line to
    // the village ahead a little shorter; the way's end glows and forgiveness rises.
    expect(words("a-span-closer")).toEqual(["He killed a hundred, then asked: can I repent?", "He was told: go to such and such a village", "On the way, death overtook him", "This village was told: come near; that, go far", "A span closer to that village: forgiven"]);
    const forgiven = names("a-span-closer", /^forgiveness, rising \d$/);
    const towns = ["the village he left", "the village ahead"];
    const measured = ["a line, measured to the village he left", "a line, measured to the village ahead", "a glow, where the way stopped"];
    const length = (name: string) => {
      const [, from, to] = /^<path d="M([\d.]+) [\d.]+ L([\d.]+) /.exec(signArt("a-span-closer").parts.find((each) => each.name === name)!.svg)!;
      return Math.abs(Number(from) - Number(to));
    };
    expect([length(measured[1]) < length(measured[0]), length(measured[0]) - length(measured[1]) < 6]).toEqual([true, true]);
    expect([shown("a-span-closer", "a voice, asking: can I repent?", 0.1), shown("a-span-closer", "a voice, asking: can I repent?", 0.2), shown("a-span-closer", "a way, setting out for the village", 0.2)]).toEqual([1, 0, 0]);
    expect([shown("a-span-closer", "a voice from the hut, answering", 0.28), shown("a-span-closer", "a voice from the hut, answering", 0.4), shown("a-span-closer", "a way, setting out for the village", 0.4), shown("a-span-closer", "the way, going on", 0.4), shown("a-span-closer", "a ring, where the way stopped", 0.4)]).toEqual([1, 0, 1, 0, 0]);
    expect([shown("a-span-closer", "the way, going on", 0.58), shown("a-span-closer", "a ring, where the way stopped", 0.58), towns.map((name) => value("a-span-closer", name, "x", 0.58)), towns.map((name) => value("a-span-closer", name, "x", 0.78))]).toEqual([1, 1, [0, 0], [-6, -6]]);
    expect([forgiven.length, all("a-span-closer", measured, 0.78), all("a-span-closer", measured, 1), risen("a-span-closer", forgiven, 1)]).toEqual([3, [0, 0, 0], [1, 1, 1], forgiven.map(() => [1, -10])]);
    // Uhud shook: a way climbs the mountain and four places stand on its top; the mountain shakes, dust rises and a
    // pebble rolls; it shakes once more, a voice says "be firm" and it stills; then a glow on one place, on another, and
    // on the other two, and light rises.
    expect(words("uhud-shook")).toEqual(["Up Uhud with Abu Bakr, Umar and Uthman", "And the mountain shook beneath them", "Be firm, Uhud!", "On you are a Prophet, a Siddiq and two martyrs"]);
    const glows = ["a glow on the first place", "a glow on the second place", "glows on the other two places"];
    const light = names("uhud-shook", /^light, rising from the top \d$/);
    expect([shown("uhud-shook", "a way, climbing the mountain", 0.24), shown("uhud-shook", "four places on the top", 0.24), value("uhud-shook", "Mount Uhud", "x", 0.24)]).toEqual([1, 1, 0]);
    expect([value("uhud-shook", "Mount Uhud", "x", 0.295), value("uhud-shook", "Mount Uhud", "x", 0.31), value("uhud-shook", "four places on the top", "x", 0.31), shown("uhud-shook", "dust below the mountain 1", 0.306), value("uhud-shook", "Mount Uhud", "x", 0.46), shown("uhud-shook", "a pebble, rolling down", 0.46)]).toEqual([1.4, -1.4, -1.4, 0.9, 0, 0]);
    expect([value("uhud-shook", "Mount Uhud", "x", 0.5), shown("uhud-shook", "a voice on the top, saying: be firm", 0.55), shown("uhud-shook", "a voice on the top, saying: be firm", 0.64), value("uhud-shook", "Mount Uhud", "x", 0.64), all("uhud-shook", glows, 0.64)]).toEqual([-1, 1, 0, 0, [0, 0, 0]]);
    expect([all("uhud-shook", glows, 0.72), all("uhud-shook", glows, 0.78), all("uhud-shook", glows, 1), risen("uhud-shook", light, 1)]).toEqual([[1, 0, 0], [1, 1, 0], [1, 1, 1], light.map(() => [1, -10])]);
    // The stone that greeted him: a way goes along a valley of Makkah and past a stone, and a voice greets from it as it
    // glows; a night passes as the sun sets and rises, and it greets again; then the stone shines, and light rises.
    expect(words("greeting-stone")).toEqual(["In Makkah, before he was sent as a Prophet", "A stone would greet him with salam", "It greeted him again and again", "I know that stone, even now"]);
    const risingLight = names("greeting-stone", /^light, rising from the stone \d$/);
    expect([shown("greeting-stone", "a way along the valley", 0.22), shown("greeting-stone", "the way, passing the stone", 0.22), shown("greeting-stone", "a voice from the stone, greeting", 0.22)]).toEqual([1, 0, 0]);
    expect([shown("greeting-stone", "the way, passing the stone", 0.38), shown("greeting-stone", "a voice from the stone, greeting", 0.38), shown("greeting-stone", "a glow on the stone", 0.38), shown("greeting-stone", "a voice from the stone, greeting", 0.5)]).toEqual([1, 1, 1, 0]);
    expect([shown("greeting-stone", "a night, passing", 0.57), value("greeting-stone", "the sun, rising", "y", 0.57), shown("greeting-stone", "a night, passing", 0.65), value("greeting-stone", "the sun, rising", "y", 0.65), shown("greeting-stone", "the voice from the stone, again", 0.65), shown("greeting-stone", "the voice from the stone, again", 0.72)]).toEqual([0.5, 24, 0, 0, 1, 0]);
    expect([shown("greeting-stone", "the stone, shining", 0.72), shown("greeting-stone", "the stone, shining", 1), risen("greeting-stone", risingLight, 1)]).toEqual([0, 1, risingLight.map(() => [1, -10])]);
    // Around us, not on us: a voice in the mosque asks; a voice prays and a cloud like a shield rises from behind Sal';
    // it rains on the town and around it, and the land turns green; a voice prays again, the clouds part to the hills,
    // the rain stops on the town but not around it; and ways walk out in the sun.
    expect(words("around-us")).toEqual(["On a Friday, in the khutbah: pray for rain", "A cloud like a shield rose behind Sal'", "It rained, and no sun was seen for a week", "Around us, not on us", "And they walked out in the sun"]);
    const shield = "a cloud like a shield";
    const rains = ["rain on the town", "rain on the hills around"];
    expect([shown("around-us", "a voice in the mosque, asking", 0.1), shown("around-us", "a voice in the mosque, asking", 0.18), value("around-us", shield, "y", 0.18), shown("around-us", "cracks in the dry land", 0.18), shown("around-us", "the land, green again", 0.18)]).toEqual([1, 0, 0, 1, 0]);
    expect([shown("around-us", "a voice from the mosque, praying", 0.25), value("around-us", shield, "y", 0.38), value("around-us", shield, "scale", 0.38), all("around-us", rains, 0.38)]).toEqual([1, -22, 1.8, [0, 0]]);
    expect([all("around-us", rains, 0.58), shown("around-us", "the land, green again", 0.58), shown("around-us", "cracks in the dry land", 0.58), shown("around-us", "the sun", 0.58), shown("around-us", shield, 0.58), shown("around-us", "the sky, gray with rain", 0.58)]).toEqual([[1, 1], 1, 0, 0, 0, 0.4]);
    expect([shown("around-us", "a voice from the mosque, praying again", 0.65), all("around-us", rains, 0.78), value("around-us", "rain clouds to the left", "x", 0.78), value("around-us", "rain clouds to the right", "x", 0.78), shown("around-us", "the sky, gray with rain", 0.78)]).toEqual([1, [0, 1], -38, 38, 0.08]);
    expect([shown("around-us", "the sun", 1), all("around-us", ["a way, walking out in the sun", "another way, walking out in the sun"], 1), all("around-us", rains, 1)]).toEqual([1, [1, 1], [0, 1]]);
    // The blessed water: a bowl with a little water is brought along a way; a voice speaks by it, its water rises,
    // wells up and spills over; small dashed circles come to the water in turn; then a meal is set out, and voices and
    // praise rise from the food.
    expect(words("blessed-water")).toEqual(["On a journey, the water ran short", "Come to the water: the blessing is from Allah", "The water flowed, and all came to it", "And we heard the food glorify Allah"]);
    const coming = names("blessed-water", /^someone, coming to the water \d$/);
    const glorifying = names("blessed-water", /^praise, rising from the food \d$/);
    expect([shown("blessed-water", "a way, bringing a little water", 0.2), Math.abs(value("blessed-water", "a bowl with a little water", "x", 0.2)), value("blessed-water", "the water in the bowl", "scale", 0.2), shown("blessed-water", "water, welling up", 0.2)]).toEqual([1, 0, 0.4, 0]);
    expect([shown("blessed-water", "a way, bringing a little water", 0.42), shown("blessed-water", "a voice by the bowl", 0.3), shown("blessed-water", "a voice by the bowl", 0.42), value("blessed-water", "the water in the bowl", "scale", 0.42), all("blessed-water", ["water, welling up", "water, spilling over"], 0.42)]).toEqual([0, 1, 0, 1, [1, 1]]);
    expect([coming.length, shown("blessed-water", coming[0], 0.48), all("blessed-water", coming, 0.62), shown("blessed-water", "a meal on a cloth", 0.62)]).toEqual([6, 1, coming.map(() => 0), 0]);
    expect([all("blessed-water", ["a meal on a cloth", "voices from the food"], 1), risen("blessed-water", glorifying, 1)]).toEqual([[1, 1], glorifying.map(() => [1, -12])]);
  });

  test("more of what he ﷺ told and lived shows each moment in its order, and draws no Prophet, no person, no hand, no horseman and no book", () => {
    const told: SignKind[] = ["shepherds", "date-mountain", "deeds-continue", "good-intentions", "safa-call", "jabir-dates", "three-follow"];
    for (const kind of told) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|horsem[ae]n|cavalry|shepherds?|believers?|friends?|companions?|teeth|mouth|lips?|belly|corpse|body|bier|devils?|satan|shaytan|Jabir|Abu Lahab|Abu Bakr|Umar)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah and nothing comes down from the sky; no book, page or pen writes the deeds.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?|swords?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    // Every prophet a shepherd: a flock far off comes into sight on each of three hills, with a way among it; small
    // circles where they sat ask, and a voice answers from a ring; the homes of Makkah and the Ka'bah come into sight, its sheep come out with a
    // way among them; and a few small coins shine by the homes.
    expect(words("shepherds")).toEqual(["Allah sent no prophet who did not tend sheep", "They asked: did you do the same?", "Yes, I tended the sheep of the people of Makkah", "For a few qirats"]);
    const far = ["a way among them", "a way among those", "a way among the third"];
    const flocks = ["a flock far off, on the first hill", "another flock far off", "a third flock far off"];
    expect([all("shepherds", flocks, 0), all("shepherds", flocks, 0.29)]).toEqual([[0, 0, 0], [1, 1, 1]]);
    const makkah = ["homes of Makkah", "the Ka'bah"];
    const sheep = names("shepherds", /^a sheep of Makkah, coming out \d$/);
    const coins = names("shepherds", /^a qirat, a small coin \d$/);
    expect([all("shepherds", far, 0.04), all("shepherds", far, 0.29), all("shepherds", ["small dashed circles, where they sat", "a voice from them, asking"], 0.29), all("shepherds", makkah, 0.29)]).toEqual([[0, 0, 0], [1, 1, 1], [0, 0], [0, 0]]);
    expect([all("shepherds", ["small dashed circles, where they sat", "a golden ring, his place", "a voice from them, asking", "a voice from his place, answering"], 0.4), all("shepherds", makkah, 0.5), all("shepherds", sheep, 0.5)]).toEqual([[1, 1, 1, 0], [0, 0], [0, 0, 0, 0]]);
    expect([shown("shepherds", "a voice from his place, answering", 0.6), all("shepherds", makkah, 0.73), all("shepherds", sheep, 0.73), sheep.map((name) => value("shepherds", name, "x", 0.73)), shown("shepherds", "a way, out with the sheep", 0.73), all("shepherds", coins, 0.73)]).toEqual([1, [1, 1], [1, 1, 1, 1], [0, 0, 0, 0], 1, [0, 0, 0]]);
    expect([coins.length, all("shepherds", coins, 1)]).toEqual([3, [1, 1, 1]]);
    // A date like a mountain: one date goes from the basket of the home's own palm to a home in need; a glow comes on
    // it, and its reward rises; a foal grows into a horse, and the reward grows; then a mountain of light rises. No hand.
    expect(words("date-mountain")).toEqual(["A date in charity, from honest earnings", "Allah accepts only what is honestly earned", "He grows its reward, as you raise a foal", "Until it becomes as big as a mountain"]);
    expect(names("date-mountain", /right|take/i)).toEqual([]);
    expect([all("date-mountain", ["its own date palm", "a basket of its dates"], 0), all("date-mountain", ["its own date palm", "a basket of its dates"], 0.05)]).toEqual([[0, 0], [1, 1]]);
    expect([shown("date-mountain", "one date, given", 0.02), value("date-mountain", "one date, given", "x", 0.24), shown("date-mountain", "a way to the home in need", 0.24), shown("date-mountain", "a glow on the date, accepted", 0.24)]).toEqual([0, 77, 1, 0]);
    expect([shown("date-mountain", "a glow on the date, accepted", 0.46), risen("date-mountain", ["its reward, rising 1"], 0.46), shown("date-mountain", "a foal, growing", 0.46)]).toEqual([1, [[1, -12]], 0]);
    expect([value("date-mountain", "a foal, growing", "scale", 0.54), value("date-mountain", "a foal, growing", "scale", 0.7), value("date-mountain", "the reward, growing", "scale", 0.7), shown("date-mountain", "the reward, as big as a mountain", 0.7)]).toEqual([0.52, 1, 1.6, 0]);
    expect([shown("date-mountain", "the reward, as big as a mountain", 1), value("date-mountain", "the reward, as big as a mountain", "scale", 1), shown("date-mountain", "light on the mountain", 1)]).toEqual([1, 1, 1]);
    // Deeds that keep going: good deeds rise along a way until it ends at a ring, which goes faint, with a soft glow on
    // the place; then from the well water flows and those who drink come; voices pass on what was learned; a little one
    // prays; sparks rise from each of the three and stay, and the glow grows warmer with each.
    expect(words("deeds-continue")).toEqual(["When a person dies, his deeds come to an end", "Except three: a charity that keeps going", "Or knowledge that people benefit from", "Or a righteous child who prays for him"]);
    const drink = names("deeds-continue", /^someone, coming to drink \d$/);
    const charity = names("deeds-continue", /^the charity, still rising \d$/);
    const learned = names("deeds-continue", /^someone, who learned \d$/);
    const knowledge = names("deeds-continue", /^the knowledge, still rising \d$/);
    const prayer = names("deeds-continue", /^the prayer, rising \d$/);
    const glowing = (t: number) => value("deeds-continue", "a soft glow on the place", "opacity", t);
    expect([shown("deeds-continue", "a way, going on", 0.22), shown("deeds-continue", "a ring, where the way ended", 0.22), glowing(0.22), all("deeds-continue", drink, 0.22), shown("deeds-continue", "water, flowing to the trough", 0.22)]).toEqual([1, 0.35, 0.3, [0, 0, 0], 0]);
    expect([shown("deeds-continue", "water, flowing to the trough", 0.46), all("deeds-continue", drink, 0.46), risen("deeds-continue", charity, 0.46), glowing(0.46), all("deeds-continue", learned, 0.46)]).toEqual([1, [1, 1, 1], charity.map(() => [1, -10]), 0.55, [0, 0, 0]]);
    expect([all("deeds-continue", learned, 0.7), all("deeds-continue", ["a voice, passing it on 1", "a voice, passing it on 2"], 0.7), risen("deeds-continue", knowledge, 0.7), glowing(0.7), shown("deeds-continue", "a little one, by the place", 0.7)]).toEqual([[1, 1, 1], [1, 1], knowledge.map(() => [1, -10]), 0.8, 0]);
    expect([shown("deeds-continue", "a little one, by the place", 1), shown("deeds-continue", "a voice, praying for him", 1), risen("deeds-continue", prayer, 1), glowing(1)]).toEqual([1, 1, prayer.map(() => [1, -10]), 1]);
    // Good intentions: a good intention glows and a full good deed rises; a way goes to a home in need and ten good
    // deeds rise, then many more; a dark dot is left, fades, and a full good deed rises in its place; a way goes to
    // another, and it rises as one dark dot only.
    expect(words("good-intentions")).toEqual(["A good deed intended but not done: a full one", "Done: ten to seven hundred times, or more", "A bad deed intended and left: a full good deed", "A bad deed done is written as one bad deed"]);
    const ten = names("good-intentions", /^ten good deeds, rising \d+$/);
    const dark = names("good-intentions", /dark dot|bad deed/);
    expect([shown("good-intentions", "a good intention, glowing", 0.2), risen("good-intentions", ["a full good deed, rising 1"], 0.2), shown("good-intentions", "a way to the home in need", 0.2), all("good-intentions", ten, 0.2)]).toEqual([1, [[1, -16]], 0, ten.map(() => 0)]);
    expect([ten.length, risen("good-intentions", ten, 0.47), shown("good-intentions", "many more, rising", 0.47), all("good-intentions", dark, 0.47)]).toEqual([10, ten.map(() => [1, -12]), 1, [0, 0]]);
    expect([shown("good-intentions", "a bad intention, a dark dot", 0.58), shown("good-intentions", "a bad intention, a dark dot", 0.72), risen("good-intentions", ["a full good deed, rising in its place 1"], 0.72)]).toEqual([1, 0, [[1, -16]]]);
    expect([all("good-intentions", dark, 1), shown("good-intentions", "a way to another, the deed done", 1), value("good-intentions", "another bad intention, done: one bad deed", "y", 1)]).toEqual([[0, 1], 1, -14]);
    // The call from as-Safa: a way climbs as-Safa and a voice calls from its top while small circles gather below; a
    // voice asks; voices answer from below; a voice warns; then a harsh voice comes from one of them, and that one
    // goes away. No horseman is drawn.
    expect(words("safa-call")).toEqual(["He climbed as-Safa and called out to Quraysh", "If I warned of horsemen, would you believe me?", "We have never heard you tell a lie", "I am a plain warner of a severe punishment", "Abu Lahab: only for this? And he went away"]);
    expect(names("safa-call", /horse|army|dust/i)).toEqual([]);
    const gathering = [...names("safa-call", /^someone, gathering \d$/), "one of them, gathering too"];
    const leaving = "one of them, gathering too";
    expect([shown("safa-call", "a way, climbing as-Safa", 0.17), shown("safa-call", "a golden ring on the top, his place", 0.17), shown("safa-call", "a voice from the top, calling", 0.17), all("safa-call", gathering, 0.17), gathering.map((name) => Math.round(Math.abs(value("safa-call", name, "x", 0.17))))]).toEqual([1, 1, 1, gathering.map(() => 1), gathering.map(() => 0)]);
    expect([shown("safa-call", "a voice from the top, calling", 0.37), shown("safa-call", "a voice from the top, asking", 0.3), shown("safa-call", "a voice from the top, asking", 0.39), shown("safa-call", "voices from below, answering", 0.55), shown("safa-call", "voices from below, answering", 0.59)]).toEqual([0, 1, 0, 1, 0]);
    expect([shown("safa-call", "a voice from the top, warning", 0.75), shown("safa-call", "a voice from the top, warning", 0.79), shown("safa-call", "a harsh voice, from one of them", 0.86), value("safa-call", leaving, "x", 0.86), shown("safa-call", leaving, 0.86)]).toEqual([1, 0, 1, 0, 1]);
    expect([shown("safa-call", "a harsh voice, from one of them", 1), value("safa-call", leaving, "x", 1), shown("safa-call", leaving, 1), shown("safa-call", "the way that one went away", 1)]).toEqual([0, 22, 0, 1]);
    // Jabir's dates: the dates gather in a heap and the lenders come; their voices doubt; three ways come, a ring sits
    // on the heap and blessing rises; a full sack comes by each lender, and the heap is no smaller; then thirteen sacks
    // stand left over, and praise rises.
    expect(words("jabir-dates")).toEqual(["Jabir's father died, and he was in debt", "They thought the dates would not cover the debt", "He sat on the dates and prayed for blessing", "Every lender was paid in full", "And thirteen wasqs of dates were left over"]);
    const lenders = names("jabir-dates", /^a lender, waiting \d$/);
    const paid = names("jabir-dates", /^a full sack, by the lender \d$/);
    const left = names("jabir-dates", /^thirteen wasqs, left over \d+$/);
    const blessing = names("jabir-dates", /^blessing, rising from the dates \d$/);
    expect([shown("jabir-dates", "the heap of dates", 0.02), value("jabir-dates", "the heap of dates", "scaleY", 0.17), all("jabir-dates", lenders, 0.17), lenders.map((name) => value("jabir-dates", name, "x", 0.17))]).toEqual([0, 1, lenders.map(() => 1), lenders.map(() => 0)]);
    expect([shown("jabir-dates", "voices of the lenders, doubting", 0.3), shown("jabir-dates", "voices of the lenders, doubting", 0.37), all("jabir-dates", ["a way, coming to the dates", "two more ways, with it"], 0.37)]).toEqual([1, 0, [0, 0]]);
    expect([all("jabir-dates", ["a way, coming to the dates", "two more ways, with it", "a golden ring on the dates, his place"], 0.57), shown("jabir-dates", "a voice, praying for blessing", 0.57), shown("jabir-dates", "a voice, praying for blessing", 0.61), risen("jabir-dates", blessing, 0.57), all("jabir-dates", paid, 0.57)]).toEqual([[1, 1, 1], 1, 0, blessing.map(() => [1, -12]), paid.map(() => 0)]);
    expect([paid.length, all("jabir-dates", paid, 0.77), value("jabir-dates", "the heap of dates", "scaleY", 0.77), all("jabir-dates", left, 0.77)]).toEqual([5, paid.map(() => 1), 1, left.map(() => 0)]);
    expect([left.length, all("jabir-dates", left, 1), risen("jabir-dates", names("jabir-dates", /^praise, rising \d$/), 1), value("jabir-dates", "the heap of dates", "scaleY", 1)]).toEqual([13, left.map(() => 1), [1, 1, 1].map(() => [1, -10]), 1]);
    // Three follow, one stays: a way goes to the open grave; his family's small circles, a laden camel for his wealth
    // and a soft light for his deeds follow along it; the grave is closed; the family and the camel, turned round, go
    // back; the light stays on the grave and rises. The one who died is never drawn.
    expect(words("three-follow")).toEqual(["Three follow the dead to his grave", "His family, his wealth and his deeds", "Two go back: his family and his wealth", "And his deeds stay with him"]);
    const family = names("three-follow", /^his family, following \d$/);
    const camel = "his wealth, a laden camel, following";
    const deeds = "his deeds, a soft light, following";
    expect([shown("three-follow", "a way, to the grave", 0.27), shown("three-follow", "the grave, open", 0.27), all("three-follow", [...family, camel, deeds], 0.27)]).toEqual([1, 1, [0, 0, 0, 0, 0]]);
    expect([all("three-follow", [...family, camel, deeds], 0.51), [...family, camel, deeds].map((name) => value("three-follow", name, "x", 0.51)), value("three-follow", camel, "scaleX", 0.51), shown("three-follow", "the grave, closed", 0.51)]).toEqual([[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], 1, 0]);
    expect([all("three-follow", [...family, camel], 0.75), value("three-follow", camel, "x", 0.75), value("three-follow", camel, "scaleX", 0.75), shown("three-follow", deeds, 0.75), value("three-follow", deeds, "x", 0.75), all("three-follow", ["the grave, open", "the grave, closed"], 0.75)]).toEqual([[0, 0, 0, 0], -80, -1, 1, 0, [0, 1]]);
    expect([value("three-follow", deeds, "x", 1), shown("three-follow", "a glow, staying on the grave", 1), risen("three-follow", names("three-follow", /^light, rising from his deeds \d$/), 1)]).toEqual([12, 1, [1, 1].map(() => [1, -10])]);
  });

  test("what he ﷺ taught of kindness and of a believer's heart shows each moment in its order, and draws no Prophet, no person, no hand and no face", () => {
    const taught: SignKind[] = ["good-in-every-state", "your-mother", "cheerful-face", "learn-and-teach", "one-body", "eat-near", "those-you-love"];
    for (const kind of taught) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|brothers?|teachers?|students?|teeth|mouth|lips?|belly|body|devils?|satan|shaytan|Umar|Anas|Abu Dharr|Uthman|Nu'man)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah and nothing comes down from the sky but the rain; no mushaf, book or page is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    // Good in every affair: a warm glow on someone's place by a home and a field; rain comes, the crops grow green, a
    // voice gives thanks and good rises; then the sun burns, the crops dry, a calm light of patience comes, and good
    // rises again.
    expect(words("good-in-every-state")).toEqual(["Wonderful: every affair of the believer is good", "And this is for no one but the believer", "If joy comes, he gives thanks: good for him", "If harm comes, he is patient: good for him"]);
    const green = names("good-in-every-state", /^the crops, growing green \d$/);
    const dried = names("good-in-every-state", /^the crops, dried \d$/);
    const thanks = names("good-in-every-state", /^good for him, rising \d$/);
    const patience = names("good-in-every-state", /^good for him again, rising \d$/);
    expect([shown("good-in-every-state", "a warm glow on the place", 0.17), all("good-in-every-state", ["a rain cloud", ...green, ...dried], 0.17)]).toEqual([0.7, [0, 0, 0, 0, 0, 0, 0]]);
    expect([all("good-in-every-state", ["a rain cloud", "rain on the field"], 0.45), all("good-in-every-state", ["a rain cloud", "rain on the field"], 0.63), all("good-in-every-state", green, 0.63), green.map((name) => value("good-in-every-state", name, "scaleY", 0.63))]).toEqual([[1, 1], [0, 0], [1, 1, 1], [1, 1, 1]]);
    expect([shown("good-in-every-state", "a voice from the place, giving thanks", 0.63), risen("good-in-every-state", thanks, 0.63), all("good-in-every-state", [...dried, "the sun, burning hot", "a calm light on the place, patience"], 0.63)]).toEqual([1, thanks.map(() => [1, -14]), [0, 0, 0, 0, 0]]);
    expect([all("good-in-every-state", green, 1), all("good-in-every-state", dried, 1), all("good-in-every-state", ["the sun, burning hot", "a calm light on the place, patience"], 1), risen("good-in-every-state", patience, 1)]).toEqual([[0, 0, 0], [1, 1, 1], [1, 1], patience.map(() => [1, -22])]);
    // Your mother, three times: a way comes and a voice asks; a voice answers from a golden ring; with each "your mother"
    // a light comes above the first one at home, and the glow on her place grows; then one light above the next one.
    expect(words("your-mother")).toEqual(["Who most deserves my good company?", "Your mother. Then who? Your mother", "Then who? Your mother", "Then who? Your father"]);
    const first = names("your-mother", /^a light above the first one \d$/);
    const glowing = (t: number) => shown("your-mother", "a glow on the first one", t);
    expect([all("your-mother", ["a way, coming to ask", "someone, asking", "a voice from him, asking 1", "a voice from his place, answering 1"], 0.17), all("your-mother", first, 0.17), glowing(0.17)]).toEqual([[1, 1, 1, 0], [0, 0, 0], 0]);
    expect([shown("your-mother", "a voice from his place, answering 2", 0.45), all("your-mother", first, 0.45), glowing(0.45)]).toEqual([1, [1, 1, 0], 0.7]);
    expect([shown("your-mother", "a voice from his place, answering 3", 0.67), all("your-mother", first, 0.67), glowing(0.67), shown("your-mother", "a light above the next one", 0.67)]).toEqual([1, [1, 1, 1], 1, 0]);
    expect([first.length, all("your-mother", ["a voice from his place, answering 4", "a light above the next one", "a glow on the next one"], 1)]).toEqual([3, [1, 1, 1]]);
    // A cheerful face: small good deeds rise along the lane; a way comes from each home and the two meet; a warm glow
    // comes between them, greetings go both ways, and a good deed rises from the meeting. No face is drawn.
    expect(words("cheerful-face")).toEqual(["Do not think little of any good deed", "Even if it is meeting your brother", "With a cheerful face"]);
    const small = names("cheerful-face", /^small good deeds, rising \d$/);
    const meeting = ["someone, coming", "someone from the other home, coming"];
    expect([risen("cheerful-face", small, 0.29), all("cheerful-face", ["a way from the home", "a way from the other home", ...meeting], 0.29)]).toEqual([small.map(() => [1, -10]), [0, 0, 0, 0]]);
    expect([all("cheerful-face", ["a way from the home", "a way from the other home", ...meeting], 0.59), meeting.map((name) => value("cheerful-face", name, "x", 0.59)), shown("cheerful-face", "a warm glow between them, cheerful", 0.59)]).toEqual([[1, 1, 1, 1], [0, 0], 0]);
    expect([all("cheerful-face", ["a warm glow between them, cheerful", "greetings, both ways"], 1), risen("cheerful-face", names("cheerful-face", /^a good deed, rising \d$/), 1)]).toEqual([[1, 1], [1, 1, 1].map(() => [1, -16])]);
    // Learn the Quran and teach it: small circles gather around one who recites; his voice, then theirs repeating, and
    // a light comes on each; then ways go out from them to three new circles, voices teach there, and good rises. No
    // mushaf is drawn.
    expect(words("learn-and-teach")).toEqual(["The best among you", "Are those who learn the Quran", "And teach it"]);
    const learners = names("learn-and-teach", /^someone, coming to learn \d$/);
    const going = names("learn-and-teach", /^a way, going out to teach \d$/);
    const circles = names("learn-and-teach", /^a new circle, gathering \d$/);
    const teaching = names("learn-and-teach", /^a voice, teaching \d$/);
    expect([all("learn-and-teach", learners, 0.21), learners.map((name) => value("learn-and-teach", name, "x", 0.21)), shown("learn-and-teach", "a voice, reciting", 0.21)]).toEqual([learners.map(() => 1), learners.map(() => 0), 0]);
    expect([all("learn-and-teach", ["a voice, reciting", "voices, repeating", "a light on each of them"], 0.55), all("learn-and-teach", [...going, ...circles], 0.55)]).toEqual([[1, 1, 1], [0, 0, 0, 0, 0, 0]]);
    expect([shown("learn-and-teach", "a voice, reciting", 1), all("learn-and-teach", [...going, ...circles, ...teaching], 1), risen("learn-and-teach", names("learn-and-teach", /^good, rising from every circle \d$/), 1)]).toEqual([0, [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1].map(() => [1, -14])]);
    // Like one body: small circles draw close and warm threads join them; one soft shape holds them all; one of them is
    // unwell; then night comes, the windows stay lit, a warm glow comes on every one of them and the threads glow.
    expect(words("one-body")).toEqual(["The believers, in mercy, love and kindness", "Are like one body", "If any part of it is unwell", "The whole body shares sleeplessness and fever"]);
    const town = names("one-body", /^someone in the town \d$/);
    const threads = names("one-body", /^a warm thread between them \d$/);
    expect([all("one-body", [...town, ...threads], 0.19), town.map((name) => [value("one-body", name, "x", 0.19), value("one-body", name, "y", 0.19)]), shown("one-body", "one soft shape holding them all", 0.19)]).toEqual([[...town, ...threads].map(() => 1), town.map(() => [0, 0]), 0]);
    expect([town.length, threads.length, shown("one-body", "one soft shape holding them all", 0.39), shown("one-body", "one of them, unwell", 0.39), shown("one-body", "one of them, unwell", 0.59), all("one-body", ["the night", "warm glows on every one of them, fever"], 0.59)]).toEqual([7, 9, 1, 0, 1, [0, 0]]);
    expect([shown("one-body", "the sun", 1), all("one-body", ["the night", "the moon", "windows lit, no one asleep", "warm glows on every one of them, fever", "the threads, glowing"], 1)]).toEqual([0, [1, 1, 1, 1, 1]]);
    // Eat from what is near you: a dashed reach goes all around the dish; a voice teaches from a golden ring, a small
    // voice says Bismillah and it rises; the reach is gone, and a short way goes only to the food near him, which grows
    // less. No hand is drawn.
    expect(words("eat-near")).toEqual(["My hand used to go all around the dish", "O boy! Say Bismillah, eat with your right hand", "And eat from what is near you"]);
    const reach = names("eat-near", /^a reach, /);
    expect([reach.length, all("eat-near", reach, 0.27), shown("eat-near", "a voice from his place, teaching", 0.27)]).toEqual([3, [1, 1, 1], 0]);
    expect([all("eat-near", reach, 0.59), all("eat-near", ["a voice from his place, teaching", "a small voice, saying Bismillah"], 0.59), risen("eat-near", ["Bismillah, rising 1"], 0.59), all("eat-near", ["a short way, to the food near him", "the food near him"], 0.59)]).toEqual([[0, 0, 0], [1, 1], [[1, -10]], [0, 0]]);
    expect([all("eat-near", ["a short way, to the food near him", "the food near him"], 1), value("eat-near", "the food near him", "scaleY", 1)]).toEqual([[1, 1], 0.4]);
    // With those you love: a way comes and a voice asks; a voice asks back from a golden ring; a voice answers and a warm
    // glow of love comes on his place; glad news comes, and a light joins him to the ring; then glows come on all who
    // sat there, and joy rises.
    expect(words("those-you-love")).toEqual(["When will the Hour be?", "What have you prepared for it?", "Nothing, but I love Allah and His Messenger", "You will be with those you love", "We had never been so glad"]);
    expect([all("those-you-love", ["a way, coming to ask", "someone, asking", "a voice from him, asking", "a voice from his place, asking back"], 0.17), all("those-you-love", ["a voice from him, asking", "a voice from his place, asking back"], 0.33)]).toEqual([[1, 1, 1, 0], [0, 1]]);
    expect([all("those-you-love", ["a voice from him, answering", "a warm glow of love on his place", "a voice from his place, giving glad news"], 0.55), all("those-you-love", ["a voice from his place, giving glad news", "a light, joining him to the ring", "glows on all who sat there"], 0.77)]).toEqual([[1, 1, 0], [1, 1, 0]]);
    expect([shown("those-you-love", "glows on all who sat there", 1), risen("those-you-love", names("those-you-love", /^joy, rising \d$/), 1)]).toEqual([1, [1, 1, 1, 1].map(() => [1, -14])]);
  });

  test("what he ﷺ taught of worship and of the heart shows each moment in its order, and draws no Prophet, no person, no hand and no face", () => {
    const taught: SignKind[] = ["after-the-salam", "built-on-five", "seventy-times", "family-ties", "pray-as-you-can", "even-a-thorn", "intentions"];
    for (const kind of taught) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|brothers?|teachers?|students?|teeth|mouth|lips?|belly|body|devils?|satan|shaytan|Umar|Alqamah|Imran|Thawban|Anas|Abu Dharr|Uthman|Nu'man)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah and nothing comes down from the sky; no mushaf, book or page is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?|rain)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    // After the salam: the rows sit behind a golden ring, his place; the salam to the right, then to the left; three
    // sparks of forgiveness asked rise one by one; peace spreads over the rows; and praise rises.
    expect(words("after-the-salam")).toEqual(["When he finished his prayer", "He asked forgiveness three times", "O Allah, You are Peace, and peace is from You", "Blessed are You, Owner of Majesty and Honor"]);
    const salam = ["the salam, to the right", "the salam, to the left"];
    const asked = names("after-the-salam", /^forgiveness asked, rising \d$/);
    expect([all("after-the-salam", salam, 0.1), all("after-the-salam", salam, 0.16), all("after-the-salam", salam, 0.23), shown("after-the-salam", "a calm light on the rows, praying", 0.23), all("after-the-salam", asked, 0.23)]).toEqual([[1, 0], [0, 1], [0, 0], 0.3, [0, 0, 0]]);
    expect([asked.length, risen("after-the-salam", asked, 0.53), shown("after-the-salam", "peace, spreading over the rows", 0.53)]).toEqual([3, asked.map(() => [1, -14]), 0]);
    expect([shown("after-the-salam", "peace, spreading over the rows", 0.77), value("after-the-salam", "peace, spreading over the rows", "scale", 0.77), shown("after-the-salam", "a voice from his place, glorifying", 0.77)]).toEqual([1, 1, 0]);
    expect([shown("after-the-salam", "a voice from his place, glorifying", 1), risen("after-the-salam", names("after-the-salam", /^praise, rising \d$/), 1)]).toEqual([1, [1, 1, 1].map(() => [1, -26])]);
    // Built on five: the plan of five pillars; the first rises, half with the first words of the testimony and the
    // rest with "Muhammad is the Messenger of Allah", and its mark shows; then the pillars of the prayer and Zakat, then
    // of Hajj and Ramadan; and the roof is set on them all.
    expect(words("built-on-five")).toEqual(["Islam is built on five", "To testify none is worthy of worship but Allah", "And that Muhammad is the Messenger of Allah", "To offer the prayers, and to pay Zakat", "To perform Hajj, and to fast in Ramadan"]);
    const pillars = names("built-on-five", /^pillar \d, rising$/);
    const marks = names("built-on-five", /^the mark on pillar \d$/);
    const height = (t: number) => pillars.map((name) => (shown("built-on-five", name, t) ? value("built-on-five", name, "scaleY", t) : 0));
    expect([pillars.length, shown("built-on-five", "the plan, five pillars, dashed", 0.13), height(0.13)]).toEqual([5, 1, [0, 0, 0, 0, 0]]);
    expect([height(0.35), all("built-on-five", marks, 0.35)]).toEqual([[0.5, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    expect([height(0.53), all("built-on-five", marks, 0.53)]).toEqual([[1, 0, 0, 0, 0], [1, 0, 0, 0, 0]]);
    expect([height(0.73), all("built-on-five", marks, 0.73), shown("built-on-five", "the roof, set on them all", 0.73)]).toEqual([[1, 1, 1, 0, 0], [1, 1, 1, 0, 0], 0]);
    expect([height(1), all("built-on-five", marks, 1), shown("built-on-five", "the roof, set on them all", 1), risen("built-on-five", names("built-on-five", /^good, rising from the house \d$/), 1)]).toEqual([[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], 1, [1, 1, 1].map(() => [1, -10])]);
    // More than seventy times a day: a voice asks forgiveness and sparks rise again and again; a warm glow of turning
    // to Him; then the sun crosses the sky, and seven rings of ten lights fill, and more.
    expect(words("seventy-times")).toEqual(["By Allah! I ask for forgiveness from Allah", "And turn to Him in repentance", "More than seventy times a day"]);
    const tens = names("seventy-times", /^ten times, \d$/);
    const lights = (name: string) => (part("seventy-times", name).svg.match(/r="0.95"/g) ?? []).length;
    expect([tens.length, tens.map(lights), lights("and more")]).toEqual([7, tens.map(() => 10), 3]);
    expect([shown("seventy-times", "a voice from his place, asking forgiveness", 0.27), all("seventy-times", tens, 0.27), value("seventy-times", "the sun, crossing the sky", "x", 0.27)]).toEqual([1, tens.map(() => 0), -62]);
    expect([shown("seventy-times", "a warm glow on his place, turning to Him", 0.53), all("seventy-times", [...tens, "and more", "the evening"], 0.53)]).toEqual([1, [...tens, "and more", "the evening"].map(() => 0)]);
    expect([all("seventy-times", [...tens, "and more", "the evening"], 1), value("seventy-times", "the sun, crossing the sky", "x", 1)]).toEqual([[...tens, "and more", "the evening"].map(() => 1), 62]);
    // Family ties: a light on his provision; the road of his days; dashed ways go out to the homes of his kin and glow
    // warm; then more provision comes beside his, and the road of his days goes on further.
    expect(words("family-ties")).toEqual(["Whoever loves to be granted more provision", "And that his life be prolonged", "Then let him keep good relations with his kin"]);
    const toKin = names("family-ties", /^a way to his kin \d$/);
    const more = names("family-ties", /^more provision \d$/);
    expect([shown("family-ties", "a light on his provision", 0.23), all("family-ties", ["the road of his days", ...toKin, ...more], 0.23)]).toEqual([1, [0, 0, 0, 0, 0, 0, 0]]);
    expect([shown("family-ties", "the road of his days", 0.45), all("family-ties", [...toKin, ...more, "the road of his days, going on further"], 0.45)]).toEqual([1, [0, 0, 0, 0, 0, 0, 0]]);
    expect([all("family-ties", [...toKin, "the ways to his kin, glowing", "warm glows on the homes of his kin", ...more, "the road of his days, going on further"], 1), more.map((name) => value("family-ties", name, "scale", 1))]).toEqual([[1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1]]);
    // Pray as you can: a way comes to ask, and a pale glow is on the one who asks; a voice answers from the golden ring;
    // a prayer mat and the place on it, and the prayer rises; a cushion, the place moves to it, and the prayer rises; a
    // bed with its pillow, the place moves to it, and the prayer rises still.
    expect(words("pray-as-you-can")).toEqual(["I asked him about the prayer", "Pray while standing", "And if you can't, pray while sitting", "If you cannot, then pray lying on your side"]);
    const place = (t: number) => [shown("pray-as-you-can", "his place, praying as he can", t), value("pray-as-you-can", "his place, praying as he can", "x", t)];
    expect([all("pray-as-you-can", ["a way, coming to ask", "someone, asking", "a pale glow on him, unwell"], 0.21), all("pray-as-you-can", ["a voice from his place, answering", "a prayer mat"], 0.21), place(0.21)]).toEqual([[1, 1, 1], [0, 0], [0, 0]]);
    expect([all("pray-as-you-can", ["a voice from his place, answering", "a prayer mat", "someone, asking"], 0.41), place(0.41), risen("pray-as-you-can", ["the prayer, standing, rising 1"], 0.41), shown("pray-as-you-can", "a cushion to sit on", 0.41)]).toEqual([[1, 1, 0], [1, 0], [[1, -14]], 0]);
    expect([shown("pray-as-you-can", "a cushion to sit on", 0.63), place(0.63), risen("pray-as-you-can", ["the prayer, sitting, rising 1"], 0.63), shown("pray-as-you-can", "a bed with its pillow", 0.63)]).toEqual([1, [1, 21], [[1, -14]], 0]);
    expect([shown("pray-as-you-can", "a bed with its pillow", 1), place(1), risen("pray-as-you-can", ["the prayer, lying on the side, rising 1"], 1), shown("pray-as-you-can", "a light on every place of prayer", 1)]).toEqual([1, [1, 39], [[1, -14]], 1]);
    // Even a thorn: dark specks about someone's place, his sins; the long road behind him and a pale glow of illness; a
    // grey cloud of worry and sadness; the prick of a thorn; then some of the specks, not all, fade away, and a soft
    // light comes on his place.
    expect(words("even-a-thorn")).toEqual(["No fatigue or illness befalls a Muslim", "Nor worry, sadness, hurt or distress", "Even the prick of a thorn", "But Allah wipes away some of his sins for it"]);
    const specks = names("even-a-thorn", /^his sins, a dark speck \d$/);
    expect([all("even-a-thorn", ["the long road behind him", "a pale glow on his place, tired and ill", "a grey cloud over his place, worry and sadness", "the prick of a thorn"], 0.25), all("even-a-thorn", specks, 0.25)]).toEqual([[1, 1, 0, 0], specks.map(() => 1)]);
    expect([all("even-a-thorn", ["a grey cloud over his place, worry and sadness", "the prick of a thorn"], 0.47), all("even-a-thorn", ["the prick of a thorn", ...specks], 0.69)]).toEqual([[1, 0], [1, 1, 1, 1, 1, 1, 1]]);
    expect([all("even-a-thorn", specks, 1), shown("even-a-thorn", "a soft light on his place", 1)]).toEqual([[0, 0, 0, 0, 1, 1], 1]);
    // Deeds are only by intentions: a voice from the minbar; two set out from one home on the same road, a light within
    // each; the golden one goes on to the masjid and good rises; the other turns off to the stall, and only its coins
    // glint.
    expect(words("intentions")).toEqual(["I heard Umar on the minbar say", "Deeds are only by intentions", "Each person gets only what he intended", "Whoever emigrated for the world, or to marry", "His emigration is for what he emigrated for"]);
    const good = "someone setting out, for the sake of good";
    const world = "someone setting out, for the world";
    const within = ["a golden light within, his intention", "a dull light within, his intention"];
    const at = (name: string, t: number) => [shown("intentions", name, t), value("intentions", name, "x", t)];
    expect([shown("intentions", "a voice from the minbar", 0.15), all("intentions", [good, world, ...within], 0.15)]).toEqual([1, [0, 0, 0, 0]]);
    expect([at(good, 0.35), at(world, 0.35), all("intentions", within, 0.35), shown("intentions", "a way turning off, to the world", 0.35)]).toEqual([[1, -16], [1, -16], [1, 1], 0]);
    expect([at(good, 0.55), shown("intentions", "a warm glow on his place, at the masjid", 0.55), risen("intentions", names("intentions", /^good, rising from him \d$/), 0.55), at(world, 0.55)]).toEqual([[1, -66], 1, [1, 1, 1].map(() => [1, -12]), [1, -16]]);
    expect([shown("intentions", "a way turning off, to the world", 0.77), at(world, 0.77), shown("intentions", "the coins he went for, glinting", 0.77)]).toEqual([1, [1, -36], 0]);
    expect([shown("intentions", "the coins he went for, glinting", 1), at("a dull light within, his intention", 1)]).toEqual([1, [1, -36]]);
  });

  test("what he ﷺ taught of what we say shows each moment in its order, and draws no Prophet, no person, no hand, no tongue and no face", () => {
    const taught: SignKind[] = ["two-words", "half-of-faith", "three-signs", "call-to-good", "praise-each-bite", "good-or-quiet", "then-steadfast"];
    for (const kind of taught) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|brothers?|teachers?|students?|teeth|mouth|lips?|tongues?|belly|body|devils?|satan|shaytan|hypocrites?|Umar|Sufyan|Anas|Abu Hurairah|Abu Malik)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah and nothing comes down from the sky; no mushaf, book or page is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?|rain)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // Two expressions: a voice, and two small lights float up from it, light; they come to rest in a pan of the balance
    // and it sinks, heavy; a warm glow comes on them and sparks rise, dear; then a voice glorifies, and each shines as
    // it is said.
    expect(words("two-words")).toEqual(["Two expressions, easy for the tongue to say", "But very heavy in the balance", "And very dear to the Most Merciful", "Subhan Allah al-Azim", "Subhan Allah wa bihamdihi"]);
    const two = ["the first expression, light", "the second expression, light"];
    const tilt = (t: number) => [value("two-words", "the crossbar of the balance", "rotate", t), value("two-words", "the pan that sinks", "y", t), value("two-words", "the pan that rises", "y", t)];
    expect([shown("two-words", "a voice from his place, saying them", 0.2), two.map((name) => at("two-words", name, 0.23)), tilt(0.23)]).toEqual([1, [[1, -73.8, 2.8], [1, -72.2, 7.8]], [0, 0, 0]]);
    expect([two.map((name) => at("two-words", name, 0.47)), tilt(0.47), shown("two-words", "a warm glow on the two, dear", 0.47)]).toEqual([[[1, 0, 2.7], [1, 0, 2.7]], [9, 2.7, -2.7], 0]);
    expect([shown("two-words", "a warm glow on the two, dear", 0.67), risen("two-words", names("two-words", /^dear, rising \d$/), 0.67), shown("two-words", "a voice from his place, glorifying", 0.67)]).toEqual([1, [1, 1, 1].map(() => [1, -14]), 0]);
    expect([all("two-words", ["a voice from his place, glorifying", "the first expression, shining", "the second expression, shining"], 0.81), all("two-words", ["the first expression, shining", "the second expression, shining"], 1)]).toEqual([[1, 1, 0], [1, 1]]);
    // Half of faith: water washing, and half of a dashed circle, faith, fills with light; praise fills a pan of the
    // balance until it sinks; the place moves to a prayer mat, and a light comes on it; a sack goes to one in need and a
    // glint of proof shows on the giver; then a grey cloud of hardship, and a brightness grows about him.
    expect(words("half-of-faith")).toEqual(["Cleanliness is half of faith", "Alhamdulillah fills the scale", "Prayer is a light", "Charity is proof", "Endurance is a brightness"]);
    const place = (t: number) => at("half-of-faith", "someone's place, at the basin, then on the mat", t);
    expect([shown("half-of-faith", "half of faith, filling with light", 0.19), value("half-of-faith", "half of faith, filling with light", "scaleX", 0.19), shown("half-of-faith", "praise, filling the scale", 0.19), value("half-of-faith", "the crossbar of the balance", "rotate", 0.19)]).toEqual([1, 1, 0, 0]);
    expect([shown("half-of-faith", "praise, filling the scale", 0.39), value("half-of-faith", "praise, filling the scale", "scaleY", 0.39), value("half-of-faith", "the crossbar of the balance", "rotate", 0.39), value("half-of-faith", "the pan that sinks", "y", 0.39), shown("half-of-faith", "a prayer mat", 0.39), place(0.39)]).toEqual([1, 1, -9, 2.6, 0, [1, 0, 0]]);
    expect([all("half-of-faith", ["a prayer mat", "a light on the prayer mat", "charity, a sack going"], 0.57), place(0.57)]).toEqual([[1, 1, 0], [1, 19, 3.4]]);
    expect([at("half-of-faith", "charity, a sack going", 0.77), all("half-of-faith", ["a warm glow on the one in need", "a glint of proof on the giver", "a grey cloud of hardship over him", "a brightness about him, enduring"], 0.77)]).toEqual([[1, 0, 0], [1, 1, 0, 0]]);
    expect([all("half-of-faith", ["a grey cloud of hardship over him", "a brightness about him, enduring"], 1), value("half-of-faith", "a brightness about him, enduring", "scale", 1)]).toEqual([[1, 1], 1]);
    // Three signs: three dashed marks; a crooked voice and a dark speck goes to one who hears; a promised way breaks off
    // halfway and the one who waits is left dim; a sack left in his trust is kept back and darkens. Each mark fills dark
    // in its turn.
    expect(words("three-signs")).toEqual(["The signs of a hypocrite are three", "Whenever he speaks, he tells a lie", "Whenever he promises, he always breaks it", "If you trust him, he proves to be dishonest"]);
    const marks = names("three-signs", /^sign \d, a dashed mark$/);
    const filled = names("three-signs", /^sign \d, filling dark$/);
    expect([all("three-signs", marks, 0.15), all("three-signs", filled, 0.15)]).toEqual([[1, 1, 1], [0, 0, 0]]);
    expect([all("three-signs", filled, 0.39), at("three-signs", "a lie, a dark speck going", 0.39), shown("three-signs", "a crooked voice from his place, lying", 0.39)]).toEqual([[0.9, 0, 0], [1, 0, 0], 0]);
    expect([all("three-signs", filled, 0.65), all("three-signs", ["the promised way, going only halfway", "the promised way, broken off", "the one who waits, left dim", "a sack, left in his trust"], 0.65)]).toEqual([[0.9, 0.9, 0], [1, 1, 1, 0]]);
    expect([all("three-signs", filled, 1), at("three-signs", "a sack, left in his trust", 1), all("three-signs", ["the sack, kept back, darkening", "the one who trusts him, left dim", "a way, bringing the trust"], 1)]).toEqual([[0.9, 0.9, 0.9], [1, 0, 0], [1, 1, 0]]);
    // Calling to good: a voice calls; ways come from three homes, and a reward comes on each who came, and rewards like
    // theirs on the one who called, while theirs stay whole; then a crooked voice calls to error, grey ways come, and
    // dark specks come on each who followed, and specks like theirs on the one who called to it.
    expect(words("call-to-good")).toEqual(["He who calls to righteousness", "Has a reward like those who adhered to it", "Without their rewards being diminished", "And he who calls to error", "Carries its sin, like those who committed it"]);
    const follow = names("call-to-good", /^a way, coming to follow \d$/);
    const rewards = names("call-to-good", /^a reward on one who came \d$/);
    const copies = names("call-to-good", /^a reward like theirs on the one who called \d$/);
    const sins = names("call-to-good", /^its sin on one who followed \d$/);
    const sinCopies = names("call-to-good", /^a sin like theirs on the one who called to it \d$/);
    expect([shown("call-to-good", "a voice from his place, calling to good", 0.15), all("call-to-good", [...follow, ...rewards, ...copies], 0.15)]).toEqual([1, [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    expect([all("call-to-good", [...follow, ...rewards, ...copies], 0.37), shown("call-to-good", "their rewards, kept whole", 0.37)]).toEqual([[1, 1, 1, 1, 1, 1, 1, 1, 1], 0]);
    expect([shown("call-to-good", "their rewards, kept whole", 0.55), shown("call-to-good", "a crooked voice from it, calling to error", 0.55)]).toEqual([1, 0]);
    expect([shown("call-to-good", "a crooked voice from it, calling to error", 0.75), all("call-to-good", names("call-to-good", /^one who followed the error \d$/), 0.75), all("call-to-good", [...sins, ...sinCopies], 0.75)]).toEqual([1, [1, 1], [0, 0, 0, 0]]);
    expect([sins.length, all("call-to-good", [...sins, ...sinCopies, ...rewards, ...copies], 1)]).toEqual([2, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]);
    // Praise for each morsel: a dish of dates and a cup; a reach to the dish and a date is gone; a voice praises, praise
    // rises, and a warm glow comes on his place; then a reach to the cup, the water is less, praise rises, the glow grows.
    expect(words("praise-each-bite")).toEqual(["Allah is pleased with His servant", "Who says Alhamdulillah while taking a morsel", "And while drinking"]);
    expect([all("praise-each-bite", ["a dish", "a morsel, a date", "a cup", "water in the cup", "someone's place at the cloth", "a reach, to the dish"], 0.27), value("praise-each-bite", "water in the cup", "scaleY", 0.27)]).toEqual([[1, 1, 1, 1, 1, 0], 1]);
    expect([all("praise-each-bite", ["a morsel, a date", "a reach, to the dish", "a voice from his place, praising", "a warm glow on his place, pleasing"], 0.61), risen("praise-each-bite", ["praise for the morsel, rising 1"], 0.61), value("praise-each-bite", "water in the cup", "scaleY", 0.61)]).toEqual([[0, 0, 0, 1], [[1, -16]], 1]);
    expect([value("praise-each-bite", "water in the cup", "scaleY", 1), risen("praise-each-bite", ["praise for the drink, rising 1"], 1), all("praise-each-bite", ["the warm glow, growing", "a reach, to the cup"], 1)]).toEqual([0.45, [[1, -16]], [1, 0]]);
    // Good words or silence: a light within his place; the home next door at ease; a visitor's way, a cloth spread and
    // a warm welcome; then a voice, and good words rise; the voice stops, and a quiet calm comes on his place.
    expect(words("good-or-quiet")).toEqual(["Anybody who believes in Allah and the Last Day", "Should not harm his neighbor", "Should entertain his guest generously", "Should talk what is good or keep quiet"]);
    expect([shown("good-or-quiet", "a light within his place, his faith", 0.19), all("good-or-quiet", ["a calm between the two homes", "a warm glow on the home next door, at ease"], 0.19)]).toEqual([1, [0, 0]]);
    expect([all("good-or-quiet", ["a calm between the two homes", "a warm glow on the home next door, at ease"], 0.41), shown("good-or-quiet", "a visitor's way, coming", 0.41)]).toEqual([[1, 1], 0]);
    expect([all("good-or-quiet", ["a visitor's way, coming", "a visitor's place", "a cloth, spread for the visitor", "a dish and a cup on it", "a warm glow of welcome"], 0.65), shown("good-or-quiet", "a voice from his place, saying good", 0.65)]).toEqual([[1, 1, 1, 1, 1], 0]);
    expect([all("good-or-quiet", ["a voice from his place, saying good", "a quiet calm on his place"], 0.8), all("good-or-quiet", ["a voice from his place, saying good", "a quiet calm on his place"], 1), risen("good-or-quiet", names("good-or-quiet", /^good words, rising \d$/), 1)]).toEqual([[1, 0], [0, 1], [1, 1, 1].map(() => [1, -14])]);
    // Then remain steadfast: a way comes to ask, and a voice asks; far places stay dim, not asked; a voice answers from
    // the golden ring and a light comes within the one who asked; then a straight way, ways turning off it, and his place
    // goes on along the straight way to a light at its end.
    expect(words("then-steadfast")).toEqual(["Tell me something about Islam", "That I need ask no one other than you", "Say: I affirm my faith in Allah", "And then remain steadfast to it"]);
    const asked = "someone asking, then going on steadily";
    expect([all("then-steadfast", ["a way, coming to ask", asked, "a voice from him, asking", "far places, not asked", "a voice from his place, answering"], 0.21)]).toEqual([[1, 1, 1, 0, 0]]);
    expect([all("then-steadfast", ["far places, not asked", "a voice from him, asking", "a voice from his place, answering"], 0.43)]).toEqual([[1, 0, 0]]);
    expect([all("then-steadfast", ["a voice from his place, answering", "a light within the one who asked, faith", "the straight way ahead"], 0.63), at("then-steadfast", asked, 0.63)]).toEqual([[1, 1, 0], [1, 0, 0]]);
    expect([all("then-steadfast", ["the straight way ahead", "ways turning off", "a light at the end of the straight way"], 1), at("then-steadfast", asked, 1), at("then-steadfast", "a light within the one who asked, faith", 1), value("then-steadfast", asked, "scale", 1)]).toEqual([[1, 1, 1], [1, 50, -32], [1, 50, -32], 0.6]);
  });

  test("what he ﷺ taught of the deeds Allah loves shows each moment in its order, and draws no Prophet, no person, no hand and no face", () => {
    const taught: SignKind[] = ["dearest-deeds", "truth-leads", "ease-a-hardship", "saved-by-mercy", "give-while-healthy", "strong-believer", "forgotten-prayer"];
    for (const kind of taught) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|brothers?|teachers?|students?|teeth|mouth|lips?|tongues?|belly|body|devils?|satan|shaytan|hypocrites?|heirs?|Umar|Sufyan|Anas|Abdullah|Mas'ud|Abu Hurairah|Abu Hurayrah)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah or for Satan, nothing comes down from the sky, and no fire is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?|rain|hell)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // The dearest deeds: a way comes to the golden ring and a voice asks; a voice answers; the sun comes to the mark of a
    // prayer's time, a voice calls from the masjid, the one who asked goes at once to a prayer mat and his prayer rises;
    // then he goes to the home of the two who raised him with a basket of dates, a warm glow comes on it, and good rises.
    expect(words("dearest-deeds")).toEqual(["Which deed is the dearest to Allah?", "The prayers at their early fixed times", "Then, to be good and dutiful to your parents"]);
    const asks = "someone asking, then praying, then going to their home";
    const sunTo = "the sun, coming to the prayer's time";
    expect([all("dearest-deeds", ["a way, coming to ask", "a voice from him, asking", "a voice from his place, answering", "a prayer mat"], 0.21), at("dearest-deeds", asks, 0.21), at("dearest-deeds", sunTo, 0.21)]).toEqual([[1, 1, 0, 0], [1, 0, 0], [1, -62, -24]]);
    expect([
      all("dearest-deeds", ["a voice from his place, answering", "the mark of a prayer's time", "the prayer's time, come", "a prayer mat", "a light on the prayer mat", "a way to their home"], 0.59),
      at("dearest-deeds", sunTo, 0.59),
      at("dearest-deeds", asks, 0.59),
      risen("dearest-deeds", names("dearest-deeds", /^the prayer, rising \d$/), 0.59)
    ]).toEqual([[1, 1, 1, 1, 1, 0], [1, 0, 0], [1, 20, 0.4], [1, 1, 1].map(() => [1, -14])]);
    expect([
      all("dearest-deeds", ["a way to their home", "a warm glow on their home", "a warm glow on his place, dutiful"], 1),
      at("dearest-deeds", asks, 1),
      at("dearest-deeds", "a basket of dates, for them", 1),
      risen("dearest-deeds", names("dearest-deeds", /^good to them, rising \d$/), 1)
    ]).toEqual([[1, 1, 1], [1, 44, 1], [1, 0, 0], [1, 1, 1].map(() => [1, -14])]);
    // Truthfulness leads to righteousness: a voice tells the truth, a golden way goes past good lights and on up to a light
    // at its end; the truth is told again and a light grows within its place; then a crooked voice lies from the other
    // place, and a grey way goes past dark specks and on down into a darkness.
    expect(words("truth-leads")).toEqual(["Truthfulness leads to righteousness", "And righteousness leads to Paradise", "A man keeps telling the truth until he is truthful", "Falsehood leads to wickedness", "And wickedness leads to the Fire"]);
    const goodLights = names("truth-leads", /^righteousness, a good light \d$/);
    const specks = names("truth-leads", /^wickedness, a dark speck \d$/);
    expect([all("truth-leads", ["a voice from it, telling the truth", "a golden way, to righteousness", ...goodLights, "the golden way, going on up", "a light at the end of the golden way"], 0.17)]).toEqual([[1, 1, 1, 1, 1, 0, 0]]);
    expect([all("truth-leads", ["the golden way, going on up", "a light at the end of the golden way", "a light within it, truthful"], 0.37)]).toEqual([[1, 1, 0]]);
    expect([all("truth-leads", ["a light within it, truthful", "a crooked voice from it, lying"], 0.55), value("truth-leads", "a light within it, truthful", "scale", 0.55), risen("truth-leads", names("truth-leads", /^the truth, told again \d$/), 0.55)]).toEqual([[1, 0], 1, [0, 0, 0].map(() => [0, -12])]);
    expect([all("truth-leads", ["a crooked voice from it, lying", "a grey way, to wickedness", ...specks, "the grey way, going on down", "a darkness at the end of the grey way"], 0.75)]).toEqual([[1, 1, 1, 1, 1, 0, 0]]);
    expect([all("truth-leads", ["the grey way, going on down", "a darkness at the end of the grey way"], 1)]).toEqual([[1, 1]]);
    // Easing a hardship: someone goes to one in hardship and the grey cloud over him lifts; a grey cloud comes over his
    // own place and lifts too; a fault shows on each and a cover hides it; he takes up the sack and help is on him as they
    // go; then a way to the masjid, and a smooth golden way from it to a light.
    expect(words("ease-a-hardship")).toEqual(["He who relieves the suffering of a brother", "Allah relieves him on the Day of Resurrection", "He who hides a Muslim's faults, Allah hides his", "Allah helps him as long as he helps his brother", "A path for knowledge, made easy to Paradise"]);
    const eases = "someone's place, easing it";
    const hard = "someone in hardship, then going on";
    expect([all("ease-a-hardship", ["a way to the one in hardship", "a grey cloud of hardship over him", "a warm glow on him, relieved", "a grey cloud over his own place, then lifting"], 0.15), at("ease-a-hardship", eases, 0.15)]).toEqual([[1, 0, 1, 0], [1, 14, 0]]);
    expect([all("ease-a-hardship", ["a grey cloud over his own place, then lifting", "a brightness on his place, eased"], 0.27), all("ease-a-hardship", ["a grey cloud over his own place, then lifting", "a brightness on his place, eased"], 0.35)]).toEqual([[1, 0], [0, 1]]);
    expect([all("ease-a-hardship", ["a fault on the one in hardship, a dark speck", "a cover over his fault", "a fault on the one who eased it, a dark speck", "a cover over his own fault", "help on him, as he helps"], 0.53)]).toEqual([[0, 1, 0, 1, 0]]);
    expect([shown("ease-a-hardship", "help on him, as he helps", 0.73), at("ease-a-hardship", "a heavy sack by him, then taken up", 0.73), at("ease-a-hardship", hard, 0.73), at("ease-a-hardship", eases, 0.73), shown("ease-a-hardship", "a way to the masjid", 0.73)]).toEqual([1, [1, 15, -3], [1, 30, 0], [1, 44, 0], 0]);
    expect([all("ease-a-hardship", ["a way to the masjid", "knowledge, a light at the masjid's door", "a path made easy, to a light", "a light at the end, far"], 1), at("ease-a-hardship", eases, 1), at("ease-a-hardship", "help on him, as he helps", 1)]).toEqual([[1, 1, 1, 1], [1, 84, -4], [1, 70, -4]]);
    // Saved by mercy: his deeds rise and fade; a voice from the golden ring, and a warm glow of mercy grows about it; he
    // goes on along the road, good deeds rising; the sun in the forenoon, then the afternoon, then night with the moon, and
    // at each he worships; then he reaches the light at the end of the road.
    expect(words("saved-by-mercy")).toEqual(["The deeds of anyone of you will not save you", "Not even I, unless Allah has mercy on me", "Do good deeds properly, sincerely and moderately", "Forenoon, afternoon, and part of the night", "Be moderate, and you will reach your target"]);
    const walks = ["someone's place, going on steadily", "someone's place, going on steadily, by day"];
    expect([all("saved-by-mercy", [...names("saved-by-mercy", /^his deeds, rising and fading \d$/), "a voice from his place", "mercy, a warm glow about his place"], 0.15)]).toEqual([[0, 0, 0, 0, 0]]);
    expect([all("saved-by-mercy", ["a voice from his place", "mercy, a warm glow about his place"], 0.32), value("saved-by-mercy", "mercy, a warm glow about his place", "scale", 0.35), walks.map((name) => at("saved-by-mercy", name, 0.35))]).toEqual([[1, 1], 1, [[1, 0, 0], [1, 0, 0]]]);
    expect([walks.map((name) => at("saved-by-mercy", name, 0.53)), risen("saved-by-mercy", names("saved-by-mercy", /^good deeds, steadily \d$/), 0.53), shown("saved-by-mercy", "night, falling", 0.53)]).toEqual([[[1, 22, 2.4], [1, 22, 2.4]], [1, 1, 1].map(() => [1, -12]), 0]);
    expect([
      all("saved-by-mercy", ["night, falling", "the moon", "the sun, in the forenoon, then the afternoon", walks[1]], 0.77),
      risen("saved-by-mercy", ["worship in the forenoon, rising 1", "worship in the afternoon, rising 1", "worship in a part of the night, rising 1"], 0.77),
      shown("saved-by-mercy", "the light, reached", 0.77)
    ]).toEqual([[0.82, 1, 0, 0], [1, 1, 1].map(() => [1, -12]), 0]);
    expect([at("saved-by-mercy", walks[0], 1), value("saved-by-mercy", walks[0], "scale", 1), shown("saved-by-mercy", "the light, reached", 1)]).toEqual([[1, 84, -32], 0.6, 1]);
    // Give while healthy: he goes to the golden ring and asks; a voice answers; healthy, he gives a sack to one in need and
    // a great reward rises; a cloud of worry and the coins he hopes for, and the reward grows; then the sun sinks and
    // evening comes while the sacks wait by his home; then they go along grey ways to two other homes.
    expect(words("give-while-healthy")).toEqual(["Which charity is the most superior in reward?", "The charity you give while you are healthy", "Afraid of poverty and wishing to be wealthy", "Do not delay it until death is near", "And it already belongs to such and such"]);
    const kept = names("give-while-healthy", /^a sack kept by his home, then going to another \d$/);
    expect([all("give-while-healthy", ["a way, going to ask", "a voice from him, asking", "a voice from his place, answering", "charity, a sack going"], 0.15), at("give-while-healthy", "someone's place, giving", 0.15)]).toEqual([[1, 1, 0, 0], [1, -38, 0]]);
    expect([
      all("give-while-healthy", ["a voice from his place, answering", "his place, healthy, a bright glow", "a warm glow on the one in need", "a grey cloud of worry over him, afraid of poverty"], 0.35),
      at("give-while-healthy", "charity, a sack going", 0.35),
      risen("give-while-healthy", names("give-while-healthy", /^a great reward, rising \d$/), 0.35)
    ]).toEqual([[1, 1, 1, 0], [1, 0, 0], [1, 1, 1].map(() => [1, -14])]);
    expect([all("give-while-healthy", ["a grey cloud of worry over him, afraid of poverty", "the wealth he hopes for, dashed coins", "the reward, growing", "the evening"], 0.53), value("give-while-healthy", "the reward, growing", "scale", 0.53)]).toEqual([[1, 1, 1, 0], 1]);
    expect([shown("give-while-healthy", "the evening", 0.73), at("give-while-healthy", "the sun, high, then sinking", 0.73), kept.map((name) => at("give-while-healthy", name, 0.73)), shown("give-while-healthy", "a grey way to another home 1", 0.73)]).toEqual([1, [1, 66, 34], [[1, 0, 0], [1, 0, 0]], 0]);
    expect([all("give-while-healthy", names("give-while-healthy", /^a grey way to another home \d$/), 1), kept.map((name) => at("give-while-healthy", name, 1)), kept.map((name) => value("give-while-healthy", name, "scale", 1))]).toEqual([[1, 1], [[1, -21, -23.6], [1, -13.4, -26]], [0.6, 0.6]]);
    // The strong believer: a warm glow on the strong place; a small light of good on each; the strong place goes to what
    // benefits him as a voice asks for help, and help rises; a cloud of trouble, a crooked "if", and the dark gate opens a
    // crack; then a calm voice, a calm on his place, the gate shuts, and a bar is set across it.
    expect(words("strong-believer")).toEqual(["A strong believer is more lovable to Allah", "Than a weak believer; there is good in everyone", "Cherish what benefits you, seek Allah's help", "If trouble comes, don't say: If only I had", "But say: Allah did what He had ordained", "For your 'if' opens the gate for Satan"]);
    const door = "the gate's door, opening a crack, then shut";
    expect([all("strong-believer", ["a warm glow on the strong place, loved", "a small light of good on the strong place", "a small light of good on the weak place"], 0.12)]).toEqual([[1, 0, 0]]);
    expect([all("strong-believer", ["a small light of good on the strong place", "a small light of good on the weak place", "a way to what benefits him"], 0.27)]).toEqual([[1, 1, 0]]);
    expect([all("strong-believer", ["a way to what benefits him", "a voice from him, asking for help", "a grey cloud of trouble over him"], 0.45), at("strong-believer", "a strong place", 0.45), risen("strong-believer", names("strong-believer", /^help, rising \d$/), 0.45)]).toEqual([[1, 1, 0], [1, 68, 0], [1, 1].map(() => [1, -12])]);
    expect([all("strong-believer", ["a voice from him, asking for help", "a grey cloud of trouble over him", "a crooked voice from him, saying if", "a calm voice from him, saying it"], 0.63), value("strong-believer", door, "scaleX", 0.63)]).toEqual([[0, 1, 1, 0], 0.55]);
    expect([all("strong-believer", ["a crooked voice from him, saying if", "a calm voice from him, saying it", "a calm on his place", "a grey cloud of trouble over him", "a bar across the gate, kept shut"], 0.81), value("strong-believer", door, "scaleX", 0.81)]).toEqual([[0, 1, 1, 0.45, 0], 1]);
    expect([at("strong-believer", "a bar across the gate, kept shut", 1), value("strong-believer", door, "scaleX", 1)]).toEqual([[1, 0, 0], 1]);
    // A forgotten prayer: the sun comes to the prayer's time and a voice calls, but his place goes off to the palms and the
    // time passes while the mat waits; a spark of remembering, he goes back to the mat and his prayer rises; a dashed sack
    // and dish show and fade, and only the light of the prayer grows.
    expect(words("forgotten-prayer")).toEqual(["If anyone forgets a prayer", "He should pray it when he remembers it", "There is no expiation except to pray it"]);
    const forgets = "someone's place, going off, then back to pray";
    expect([all("forgotten-prayer", ["a voice from the masjid, calling to prayer", "the prayer's time, come, then passing", "a spark of remembering over him", "a light on the prayer mat"], 0.27), at("forgotten-prayer", "the sun, coming to the prayer's time and passing it", 0.27), at("forgotten-prayer", forgets, 0.27)]).toEqual([[0, 0, 0, 0], [1, 20, -1], [1, 46, 0]]);
    expect([all("forgotten-prayer", ["a spark of remembering over him", "a way back to the prayer mat"], 0.4), at("forgotten-prayer", forgets, 0.36)]).toEqual([[1, 1], [1, 46, 0]]);
    expect([all("forgotten-prayer", ["a spark of remembering over him", "a light on the prayer mat"], 0.61), at("forgotten-prayer", forgets, 0.61), risen("forgotten-prayer", names("forgotten-prayer", /^the prayer, rising \d$/), 0.61)]).toEqual([[0, 1], [1, -22, 0.4], [1, 1, 1].map(() => [1, -14])]);
    expect([all("forgotten-prayer", ["a dashed sack, no expiation", "a dashed dish, no expiation", "the light of the prayer, growing"], 0.76), all("forgotten-prayer", ["a dashed sack, no expiation", "a dashed dish, no expiation", "the light of the prayer, growing"], 1)]).toEqual([[1, 1, 0], [0, 0, 1]]);
  });

  test("what he ﷺ taught of a good character shows each moment in its order, and draws no Prophet, no person, no hand and no face", () => {
    const taught: SignKind[] = ["mustard-of-pride", "what-backbiting-is", "orphan-carer", "safe-from-harm", "refuge-from-anger", "gate-ar-rayyan", "make-it-easy"];
    for (const kind of taught) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|face|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|brothers?|teachers?|students?|teeth|mouth|lips?|tongues?|belly|body|devils?|satan|shaytan|hypocrites?|heirs?|Umar|Sufyan|Anas|Abdullah|Mas'ud|Abu Hurairah|Abu Hurayrah|Sahl|Sulayman)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah or for Satan, nothing comes down from the sky, and no fire is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?|rain|hell)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // A mustard seed of pride: a seed of pride shows in a place and a shade comes on it; a way goes out toward a light far
    // off and breaks off; by the golden ring a voice asks, with a fine garment and fine sandals; a voice answers from the
    // ring and a warm glow comes on them; a light, the truth, comes to the proud place and a crooked voice turns it away;
    // last, the place is raised on a mound and looks down on the others.
    expect(words("mustard-of-pride")).toEqual(["Whoever has a mustard seed of pride in his heart", "Will not enter Paradise", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty", "Pride is rejecting the truth", "And looking down on people"]);
    const proud = "someone's place, proud";
    const truth = "the truth, a light coming to him";
    const mound = "a mound under his place, rising";
    expect([all("mustard-of-pride", ["a mustard seed of pride, within", "a grey shade on his place", "a light far off, Paradise", "a way toward it, breaking off", "a fine garment"], 0.17)]).toEqual([[1, 1, 0, 0, 0]]);
    expect([all("mustard-of-pride", ["a light far off, Paradise", "a way toward it, breaking off", "the rest of the way, not reached", "a fine garment", "a voice from him, asking"], 0.33)]).toEqual([[1, 1, 1, 0, 0]]);
    expect([all("mustard-of-pride", ["a fine garment", "fine sandals", "a voice from him, asking", "a voice from his place, answering", "beauty, loved, a warm glow on them"], 0.51)]).toEqual([[1, 1, 0, 0, 0]]);
    expect([all("mustard-of-pride", ["a voice from his place, answering", "beauty, loved, a warm glow on them", "beauty, sparkling", truth], 0.69)]).toEqual([[0, 1, 1, 0]]);
    expect([at("mustard-of-pride", truth, 0.78), shown("mustard-of-pride", "a crooked voice from him, turning it away", 0.78)]).toEqual([[1, 0, 0], 1]);
    expect([at("mustard-of-pride", truth, 0.84), shown("mustard-of-pride", "a crooked voice from him, turning it away", 0.84), value("mustard-of-pride", mound, "scaleY", 0.84), shown("mustard-of-pride", "a grey look down on them", 0.84)]).toEqual([[0.35, -12, -7], 0, 0.12, 0]);
    expect([value("mustard-of-pride", mound, "scaleY", 1), at("mustard-of-pride", proud, 1), at("mustard-of-pride", "a mustard seed of pride, within", 1), shown("mustard-of-pride", "a grey look down on them", 1)]).toEqual([1, [1, 0, -7], [1, 0, -7], 1]);
    // Liking fine clothes is not pride, for Allah is beautiful and loves beauty: every lesson on this scene says so.
    const clothes = Object.entries(SIGN_LESSONS)
      .filter(([, id]) => id === "sign-mustard-of-pride")
      .flatMap(([nodeId]) => (LESSONS_BY_ID[`lesson-${nodeId}`] as Lesson).challenges.filter((each) => each.type === "true_false" && /clothes/i.test(each.prompt)))
      .map((each) => [each.prompt, each.choices?.find((choice) => choice.id === each.correctChoiceId)?.label]);
    expect(clothes).toEqual([
      ["Liking nice clothes is pride.", "False"],
      ["Wanting fine clothes is itself pride.", "False"],
      ["In the hadith, liking fine clothes is pride.", "False"],
      ["Wanting nice clothes and shoes is pride, per Muslim 91.", "False"]
    ]);
    // What backbiting is: a voice asks from the golden ring and a voice answers from those sitting; a crooked voice from
    // one of them speaks of the one away by his home, dark specks go to him and a grey dimness comes on him; a voice asks;
    // a fault shows in the one away and a dark speck comes on the one who spoke; last, the fault is gone, and a dark
    // stain, worse, comes on the one who spoke.
    expect(words("what-backbiting-is")).toEqual(["Do you know what backbiting is?", "They said: Allah and His Messenger know best", "Talking of your brother in a way he dislikes", "What if my brother is as I say?", "If it is in him, you have backbitten him", "If it is not, you have slandered him"]);
    const dislikes = names("what-backbiting-is", /^what he dislikes, going to him \d$/);
    const stain = "slander, a dark stain on the one who spoke";
    expect([all("what-backbiting-is", ["a voice from his place, asking", "a voice from those sitting, answering"], 0.08), all("what-backbiting-is", ["a voice from his place, asking", "a voice from those sitting, answering", "a crooked voice from him, speaking of the one away"], 0.25)]).toEqual([[1, 0], [0, 1, 0]]);
    expect([all("what-backbiting-is", ["a crooked voice from him, speaking of the one away", "a grey dimness on the one away, disliking it", "a voice from him, asking", ...dislikes], 0.5)]).toEqual([[0, 1, 0, 0, 0, 0]]);
    expect([all("what-backbiting-is", ["a voice from him, asking", "a fault, in the one away"], 0.6)]).toEqual([[1, 0]]);
    expect([all("what-backbiting-is", ["a voice from him, asking", "a fault, in the one away", "backbiting, a dark speck on the one who spoke", stain], 0.81)]).toEqual([[0, 1, 1, 0]]);
    expect([all("what-backbiting-is", ["a fault, in the one away", "backbiting, a dark speck on the one who spoke", stain], 1), value("what-backbiting-is", stain, "scale", 1)]).toEqual([[0, 1, 1], 1]);
    // The one who looks after an orphan: a way goes from a home to the orphan's place with a basket of dates and a warm
    // glow comes on it; the two go back to the home together and a warm glow comes on it; then a golden way rises to a
    // light far off where the golden ring shows, a light rises along the way, and comes to rest beside the ring, a little
    // apart, with a glow about the two.
    expect(words("orphan-carer")).toEqual(["I and the one who looks after an orphan", "Will be in Paradise like this", "He pointed with two fingers, a little apart"]);
    const carer = "someone's place, looking after him";
    const orphan = "an orphan's place, alone";
    const basket = "a basket of dates, for the orphan";
    const light = "his light, rising to the light";
    expect([all("orphan-carer", ["a way to the orphan", basket], 0.03), at("orphan-carer", carer, 0.13), at("orphan-carer", basket, 0.13), shown("orphan-carer", "a warm glow on the orphan, cared for", 0.13)]).toEqual([[0, 0], [1, 42, 0.4], [1, 0, 0], 0]);
    expect([at("orphan-carer", carer, 0.2), all("orphan-carer", ["a warm glow on the orphan, cared for", "a warm glow on the home"], 0.2)]).toEqual([[1, 42, 0.4], [1, 0]]);
    expect([
      at("orphan-carer", carer, 0.35),
      [orphan, basket, "a warm glow on the orphan, cared for"].map((name) => at("orphan-carer", name, 0.35)),
      all("orphan-carer", ["a warm glow on the home", "Paradise, a light far off", "a golden way up to the light", "a golden ring, his place, in the light", light], 0.35)
    ]).toEqual([[1, 0, 0.4], [1, 1, 1].map(() => [1, -42, 0]), [1, 0, 0, 0, 0]]);
    expect([all("orphan-carer", ["Paradise, a light far off", "a golden way up to the light", "a golden ring, his place, in the light", "a glow about the two, side by side"], 0.65), at("orphan-carer", light, 0.65)]).toEqual([[1, 1, 1, 0], [1, -8.6, 4.4]]);
    expect([at("orphan-carer", light, 1), shown("orphan-carer", "a glow about the two, side by side", 1)]).toEqual([[1, 0, 0], 1]);
    // Safe from his tongue and hands: a calm comes on each home and all around his place; a gentle voice from him, good
    // words rise, and the basket by their home is kept safe; then dark specks, what is forbidden, show about him; a way
    // goes off from them and he goes along it; the specks fade behind him and he comes to a light at its end.
    expect(words("safe-from-harm")).toEqual(["A Muslim is the one who avoids harming Muslims", "With his tongue and hands", "And an emigrant is the one who gives up", "All that Allah has forbidden"]);
    const leaves = "someone's place, safe to be near, then leaving";
    const forbidden = names("safe-from-harm", /^what is forbidden, a dark speck \d$/);
    expect([all("safe-from-harm", ["a calm on the home to his left", "a calm on the home to his right", "safe all around him, a calm", "a gentle voice from him", "their basket, kept safe"], 0.23)]).toEqual([[1, 1, 1, 0, 0]]);
    expect([all("safe-from-harm", ["a gentle voice from him", "their basket, kept safe", ...forbidden], 0.43), risen("safe-from-harm", names("safe-from-harm", /^good words, rising \d$/), 0.43)]).toEqual([[0, 1, 0, 0, 0], [1, 1, 1].map(() => [1, -12])]);
    expect([all("safe-from-harm", [...forbidden, "a way, leaving it all", "a light at the end of the way"], 0.67), at("safe-from-harm", leaves, 0.67)]).toEqual([[1, 1, 1, 1, 0], [1, 30, -12]]);
    expect([all("safe-from-harm", [...forbidden, "a light at the end of the way"], 0.97), at("safe-from-harm", leaves, 0.97)]).toEqual([[0, 0, 0, 1], [1, 60, -33]]);
    // A word of refuge for anger: crooked voices go between two places; a red glow of anger grows on one; a voice from the
    // golden ring tells of a word, and a golden light, the word, comes to him; a calm voice from him seeks refuge; the red
    // fades and a calm comes on his place.
    expect(words("refuge-from-anger")).toEqual(["Two men abused each other", "One of them became red with anger", "I know a word that would calm him", "If he says: I seek refuge with Allah from Satan", "All his anger would go away"]);
    const red = ["a red glow of anger on him", "his place, red with anger"];
    const word = "a word, a golden light";
    expect([all("refuge-from-anger", ["a crooked voice from the first", "a crooked voice from the other", ...red], 0.15)]).toEqual([[1, 1, 0, 0]]);
    expect([all("refuge-from-anger", ["a crooked voice from the first", "a crooked voice from the other", ...red, "a voice from his place, telling of a word"], 0.33), red.map((name) => value("refuge-from-anger", name, "scale", 0.33))]).toEqual([[0, 0, 1, 1, 0], [1, 1.4]]);
    expect([all("refuge-from-anger", ["a voice from his place, telling of a word", "a calm voice from him, seeking refuge"], 0.5), at("refuge-from-anger", word, 0.5)]).toEqual([[0, 0], [1, -68, -1]]);
    expect([all("refuge-from-anger", ["a calm voice from him, seeking refuge", ...red, "a calm on his place"], 0.67), at("refuge-from-anger", word, 0.67)]).toEqual([[1, 1, 1, 0], [1, 0, 0]]);
    expect([all("refuge-from-anger", [...red, "a calm on his place", "a calm voice from him, seeking refuge"], 1), value("refuge-from-anger", red[1], "scale", 1)]).toEqual([[0, 0, 1, 0], 1]);
    // The gate ar-Rayyan: a gate on a rise, a light beyond it; a small crescent over each of three places, those who
    // fasted, and a golden way from them to the gate; the grey way of two others stops short; a warm glow on those who
    // fasted, called; the doors open, they get up and go along the way and in; last, the doors close.
    expect(words("gate-ar-rayyan")).toEqual(["In Paradise there is a gate called ar-Rayyan", "Those who fast will enter through it", "None but them will enter through it", "Where are those who used to fast?", "They will get up and enter", "Then it will be closed"]);
    const fasted = names("gate-ar-rayyan", /^one who fasted \d$/);
    const crescents = names("gate-ar-rayyan", /^a crescent over one who fasted \d$/);
    const called = names("gate-ar-rayyan", /^a warm glow on one who fasted, called \d$/);
    const door = "the gate's door on the left, open, then shut";
    expect([all("gate-ar-rayyan", ["a light beyond the gate", "a golden way to the gate", "their grey way, stopping short", ...crescents], 0.16), value("gate-ar-rayyan", door, "scaleX", 0.16)]).toEqual([[1, 0, 0, 0, 0, 0], 1]);
    expect([all("gate-ar-rayyan", ["a golden way to the gate", "their grey way, stopping short", ...crescents, ...called], 0.33)]).toEqual([[1, 0, 1, 1, 1, 0, 0, 0]]);
    expect([all("gate-ar-rayyan", ["their grey way, stopping short", ...called], 0.49)]).toEqual([[1, 0, 0, 0]]);
    expect([all("gate-ar-rayyan", called, 0.65), fasted.map((name) => at("gate-ar-rayyan", name, 0.65)), value("gate-ar-rayyan", door, "scaleX", 0.65)]).toEqual([[1, 1, 1], [1, 1, 1].map(() => [1, 0, 0]), 1]);
    expect([fasted.map((name) => at("gate-ar-rayyan", name, 0.81)), all("gate-ar-rayyan", [...crescents, ...called], 0.81), value("gate-ar-rayyan", door, "scaleX", 0.81)]).toEqual([[[0, 86, -19], [0, 74, -20.4], [0, 62, -19]], [0, 0, 0, 0, 0, 0], 0.14]);
    expect([value("gate-ar-rayyan", door, "scaleX", 1), value("gate-ar-rayyan", "the gate's door on the right, open, then shut", "scaleX", 1), all("gate-ar-rayyan", [...fasted, "their grey way, stopping short", "a golden way to the gate"], 1)]).toEqual([1, 1, [0, 0, 0, 1, 1]]);
    // Make things easy: an easy way opens to the masjid and those coming go along it; a hard way over rocks shows and
    // fades; a voice gives good tidings, sparks rise over them and a warm glow comes on them; last, they come on, and one
    // at the edge, going off along a way away, turns back and comes too.
    expect(words("make-it-easy")).toEqual(["Make things easy for people", "And do not make them hard", "Give them good tidings", "And do not make them run away"]);
    const coming = names("make-it-easy", /^one coming \d$/);
    const edge = "one at the edge, going off, then coming";
    expect([all("make-it-easy", ["an easy way, smooth, to the masjid", "a hard way, steep, over the rocks", "a way off, away", edge], 0.21), coming.map((name) => at("make-it-easy", name, 0.21))]).toEqual([[1, 0, 0, 0], [1, 1, 1].map(() => [1, 36, 0])]);
    expect([shown("make-it-easy", "a hard way, steep, over the rocks", 0.31), all("make-it-easy", ["a hard way, steep, over the rocks", "a voice from him, giving good tidings", "a warm glow on them, glad"], 0.41)]).toEqual([0.9, [0, 0, 0]]);
    expect([all("make-it-easy", ["a voice from him, giving good tidings", "a warm glow on them, glad", edge, "a way off, away"], 0.67), risen("make-it-easy", names("make-it-easy", /^good tidings, rising \d$/), 0.67)]).toEqual([[0, 1, 0, 0], [1, 1, 1].map(() => [1, -10])]);
    expect([at("make-it-easy", edge, 0.78), shown("make-it-easy", "a way off, away", 0.78)]).toEqual([[1, -8, -0.6], 1]);
    expect([at("make-it-easy", edge, 1), coming.map((name) => at("make-it-easy", name, 1)), shown("make-it-easy", "a way off, away", 1), at("make-it-easy", "a warm glow on them, glad", 1)]).toEqual([[1, 44, 5.4], [1, 1, 1].map(() => [1, 58, -0.6]), 0, [1, 20, -0.6]]);
  });

  test("what truly counts shows each moment in its order, and draws no Prophet, no person, no hand and no face", () => {
    const taught: SignKind[] = ["needle-in-the-sea", "hearts-and-deeds", "real-strength", "treasure-of-paradise", "hundred-levels", "faith-at-the-pleiades", "sacred-city"];
    for (const kind of taught) {
      for (const each of signArt(kind).parts) {
        const person =
          /\b(prophet|messenger|man|men|woman|women|person|people|king|queen|helpers?|servants?|angels?|child|children|boy|girl|baby|mother|father|parents?|son|daughter|faces?|hands?|fingers?|arms?|feet|foot|shoulder|neighbou?rs?|guests?|wife|husband|riders?|believers?|friends?|companions?|brothers?|teachers?|students?|teeth|mouth|lips?|tongues?|belly|body|devils?|satan|shaytan|hypocrites?|heirs?|Umar|Sufyan|Anas|Abdullah|Mas'ud|Abu Hurairah|Abu Hurayrah|Sahl|Sulayman|Salman|Abu Musa|Abu Dharr|Ibn Abbas|Qays)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
      // Nothing is drawn for Allah or for Satan, nothing comes down from the sky, and no fire is drawn.
      expect([kind, signArt(kind).parts.filter((each) => /\b(rays?|beams?|books?|pages?|mushaf|pens?|ink|scrolls?|tablets?|lightning|storm|fire|flames?|rain|hell)\b|coming down|sent down|from the sky|Allah|divine|heaven/i.test(each.name)).map((each) => each.name)]).toEqual([kind, []]);
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    const names = (kind: SignKind, pattern: RegExp) => signArt(kind).parts.filter((each) => pattern.test(each.name)).map((each) => each.name);
    const all = (kind: SignKind, list: string[], t: number) => list.map((name) => shown(kind, name, t));
    const risen = (kind: SignKind, list: string[], t: number) => list.map((name) => [shown(kind, name, t), value(kind, name, "y", t)]);
    const at = (kind: SignKind, name: string, t: number) => [shown(kind, name, t), value(kind, name, "x", t), value(kind, name, "y", t)];
    // The needle and the sea: a dark mark of oppression shows and is gone, and a calm comes over the land; a dark crooked
    // way goes toward another place and breaks off, and a calm comes between them; one astray asks, a golden way shows to
    // a light far off, and he goes on along it; one by an empty dish asks, and a basket of dates is by him, with a warm
    // glow; a request rises from every place, and a warm glow comes on each; a light runs over the sea; last, a needle
    // dips into the sea and comes up, with so little on it, and the sea shines as full as before.
    expect(words("needle-in-the-sea")).toEqual(["I have forbidden oppression for Myself", "So do not oppress one another", "Seek guidance of Me and I shall guide you", "Seek food of Me and I shall feed you", "Were all of you to ask, and I gave each one", "That would not decrease what I have", "Any more than a needle decreases the sea"]);
    const requests = names("needle-in-the-sea", /^a request, rising \d$/);
    const given = names("needle-in-the-sea", /^a warm glow on each, given \d$/);
    const rings = names("needle-in-the-sea", /^a ring on the water \d$/);
    const dipped = "a needle, dipped into the sea";
    const guidance = ["a crooked way, astray", "a voice from him, asking for guidance", "a golden way, guidance", "a light far off, at the end of the way"];
    const food = ["a voice from him, asking for food", "an empty dish by him", "a basket of dates, food given", "a warm glow on him, fed"];
    expect([all("needle-in-the-sea", ["oppression, a dark mark", "a calm over all the land"], 0.065), all("needle-in-the-sea", ["oppression, a dark mark", "a calm over all the land", "a dark crooked way toward the other, breaking off"], 0.12)]).toEqual([[1, 0], [0, 1, 0]]);
    expect([all("needle-in-the-sea", ["a dark crooked way toward the other, breaking off", "a calm between them"], 0.19), all("needle-in-the-sea", ["a dark crooked way toward the other, breaking off", "a calm between them", "a crooked way, astray"], 0.25)]).toEqual([[1, 0], [0, 1, 0]]);
    expect([all("needle-in-the-sea", guidance, 0.32), at("needle-in-the-sea", "one astray, then guided", 0.32), all("needle-in-the-sea", guidance, 0.39), at("needle-in-the-sea", "one astray, then guided", 0.39)]).toEqual([[1, 1, 0, 0], [1, 0, 0], [0, 0, 1, 1], [1, 5.2, -13.6]]);
    expect([all("needle-in-the-sea", food, 0.45), all("needle-in-the-sea", food, 0.53)]).toEqual([[1, 1, 0, 0], [0, 0, 1, 1]]);
    expect([requests.length, all("needle-in-the-sea", [...requests, ...given], 0.53), risen("needle-in-the-sea", requests.slice(0, 1), 0.62), all("needle-in-the-sea", [...requests, ...given], 0.7)]).toEqual([8, [...requests, ...given].map(() => 0), [[1, -14]], [...requests.map(() => 0), ...given.map(() => 1)]]);
    expect([at("needle-in-the-sea", "a light running over the sea", 0.73), at("needle-in-the-sea", "a light running over the sea", 0.83), all("needle-in-the-sea", [dipped, ...rings, "so little on the needle, a glint", "the sea, as full as before, shining"], 0.87)]).toEqual([[0, 0, 0], [0, 42, 0], [0, 0, 0, 0, 0, 0]]);
    expect([at("needle-in-the-sea", dipped, 0.925), all("needle-in-the-sea", ["so little on the needle, a glint", "the sea, as full as before, shining"], 0.925)]).toEqual([[1, 0, 7], [0, 0]]);
    expect([at("needle-in-the-sea", dipped, 1), all("needle-in-the-sea", [...rings, "so little on the needle, a glint", "the sea, as full as before, shining"], 1)]).toEqual([[1, 0, 0], [0, 0, 0, 1, 1]]);
    // Hearts and deeds: by a fine home, a place fine to look at, sparkling, and a heap of gold with a gleam; by a plain
    // home, a plain place; the fine looks grow dim, and so does the gold; then a warm light shows within each place, a
    // heart, and good deeds rise from them both.
    expect(words("hearts-and-deeds")).toEqual(["Verily Allah does not look to your faces", "And your wealth", "But He looks to your heart", "And to your deeds"]);
    const hearts = ["a heart, a warm light within him", "a heart, a warm light within the other"];
    const deeds = [...names("hearts-and-deeds", /^his good deeds, rising \d$/), ...names("hearts-and-deeds", /^good deeds of the other, rising \d$/)];
    const looks = ["fine looks, sparkling about him", "a heap of gold by the fine home", "a gleam on the gold"];
    expect([all("hearts-and-deeds", [...looks, ...hearts], 0.1), shown("hearts-and-deeds", "fine looks, sparkling about him", 0.2), all("hearts-and-deeds", [...looks, ...hearts], 0.45)]).toEqual([[1, 1, 1, 0, 0], 0.3, [0.3, 0.35, 0, 0, 0]]);
    expect([all("hearts-and-deeds", [...hearts, ...deeds], 0.65), risen("hearts-and-deeds", deeds, 1), all("hearts-and-deeds", hearts, 1)]).toEqual([[1, 1, 0, 0, 0, 0], [[1, -10], [1, -13], [1, -10], [1, -13]], [1, 1]]);
    // Real strength: a big, strong place swells, pushes on and knocks two others down, and a grey shade comes on it; then
    // a crooked voice angers another, and a red glow of anger grows in him; a ring closes about him as he holds himself,
    // the red fades, and a warm golden glow of real strength comes on him.
    expect(words("real-strength")).toEqual(["The strong is not the one", "Who overcomes the people by his strength", "But the strong is the one", "Who controls himself while in anger"]);
    const big = "a big place, strong";
    const knocked = names("real-strength", /^one knocked down \d$/);
    const red = "a red glow of anger in him";
    const holding = "a ring about him, holding himself";
    expect([value("real-strength", big, "scale", 0.03), value("real-strength", big, "scale", 0.15), at("real-strength", big, 0.15), knocked.map((name) => at("real-strength", name, 0.15))]).toEqual([1, 1.3, [1, 0, 0], [[1, 0, 0], [1, 0, 0]]]);
    expect([at("real-strength", big, 0.36), knocked.map((name) => [...at("real-strength", name, 0.36), value("real-strength", name, "rotate", 0.36)]), all("real-strength", ["a shove, dashes of dust", "a grey shade on the big place, not truly strong"], 0.36)]).toEqual([[1, 8, 0], [[0.55, 12, 3, 160], [0.55, 16, 2, 160]], [0, 0]]);
    expect([all("real-strength", ["a grey shade on the big place, not truly strong", "a crooked voice from the other, angering him", red], 0.46), shown("real-strength", "a crooked voice from the other, angering him", 0.56)]).toEqual([[1, 0, 0], 1]);
    expect([all("real-strength", ["a crooked voice from the other, angering him", red, holding], 0.65), value("real-strength", red, "scale", 0.65)]).toEqual([[0, 1, 0], 1.4]);
    expect([all("real-strength", [red, holding, "real strength, a warm golden glow", "strength, sparkling"], 1), value("real-strength", holding, "scale", 1)]).toEqual([[0, 1, 1, 1], 1]);
    // A treasure of Paradise: a golden ring, his place, and those with him go up the way to a high place; loud voices
    // rise from them, saying Takbir; a voice from the ring, gently, and their voices grow small, and gentle words rise; a
    // calm comes on them all; one at the edge says it within himself, a small light, and the ring comes beside him with a
    // voice; last, far off in a light, a treasure chest opens, and his words rise to it.
    expect(words("treasure-of-paradise")).toEqual(["Whenever we ascended a high place", "We used to say Takbir", "O people! Be kind to yourselves", "You are not calling a deaf or absent one", "You are calling an All-Hearer, an All-Seer", "Say: La hawla wa la quwwata illa billah", "For it is one of the treasures of Paradise"]);
    const leading = "a golden ring, his place";
    const going = names("treasure-of-paradise", /^one going with him \d$/);
    const loud = names("treasure-of-paradise", /^a loud voice, saying Takbir \d$/);
    const gentle = names("treasure-of-paradise", /^gentle words, rising \d$/);
    const rising = "his words, rising to the treasure";
    expect([at("treasure-of-paradise", leading, 0.02), at("treasure-of-paradise", leading, 0.12), going.map((name) => at("treasure-of-paradise", name, 0.12)), all("treasure-of-paradise", loud, 0.12)]).toEqual([[1, 0, 0], [1, 60, -24], [[1, 59, -27], [1, 58, -25.8], [1, 57, -25.8]], [0, 0, 0]]);
    expect([all("treasure-of-paradise", loud, 0.24), loud.map((name) => value("treasure-of-paradise", name, "scale", 0.24)), shown("treasure-of-paradise", "a voice from his place, gently", 0.24)]).toEqual([[1, 1, 1], [1.9, 1.9, 1.9], 0]);
    expect([shown("treasure-of-paradise", "a voice from his place, gently", 0.335), all("treasure-of-paradise", ["a voice from his place, gently", ...gentle], 0.39), loud.map((name) => [shown("treasure-of-paradise", name, 0.39), value("treasure-of-paradise", name, "scale", 0.39)])]).toEqual([1, [0, 0, 0, 0], [[1, 0.8], [1, 0.8], [1, 0.8]]]);
    expect([risen("treasure-of-paradise", gentle.slice(0, 1), 0.48), all("treasure-of-paradise", [...gentle, "a calm on them all"], 0.53), all("treasure-of-paradise", [...loud, "a calm on them all", "his words within himself, a small light"], 0.66)]).toEqual([[[1, -10]], [0, 0, 0, 0], [0, 0, 0, 1, 0]]);
    expect([at("treasure-of-paradise", leading, 0.77), all("treasure-of-paradise", ["his words within himself, a small light", "a voice from his place, to him", "a treasure chest in Paradise"], 0.77)]).toEqual([[1, 87.4, -23.2], [1, 1, 0]]);
    expect([all("treasure-of-paradise", ["a voice from his place, to him", "Paradise, a light far off", "a treasure chest in Paradise", "the chest's lid, opening", rising], 0.82)]).toEqual([[0, 0, 0, 0, 0]]);
    expect([all("treasure-of-paradise", ["Paradise, a light far off", "a treasure chest in Paradise", "light from the treasure, sparkling"], 0.95), value("treasure-of-paradise", "the chest's lid, opening", "rotate", 0.95), at("treasure-of-paradise", rising, 0.92), shown("treasure-of-paradise", rising, 0.95)]).toEqual([[1, 1, 1], -34, [1, 43, -20.8], 0]);
    // The hundred grades: in a soft light, the grades of Paradise show one above another, with many more rising to
    // al-Firdaws at the top; the distance between two grades is measured, and a little sky and earth show in it; from the
    // land of this world a voice asks, and a du'a rises to al-Firdaws; al-Firdaws glows, the best; last, rivers come out
    // from it over the grades below.
    expect(words("hundred-levels")).toEqual(["Paradise has one hundred grades", "The distance between each of two grades", "Is like that between the heaven and the earth", "When you ask Allah, ask for al-Firdaws", "The best and highest part of Paradise", "From it originate the rivers of Paradise"]);
    const gradesOf = ["a grade of Paradise, the first", "a grade of Paradise, the second", "a grade of Paradise, the third", "many more grades, rising", "al-Firdaws, the highest"];
    const rivers = names("hundred-levels", /^a river from al-Firdaws/);
    const falls = names("hundred-levels", /^water falling to the grade below \d$/);
    const dua = "his du'a, rising to al-Firdaws";
    expect([all("hundred-levels", gradesOf, 0.02), all("hundred-levels", [...gradesOf, "the distance between two grades, measured"], 0.16)]).toEqual([[0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0]]);
    expect([all("hundred-levels", ["the distance between two grades, measured", "a little sky and earth, as far apart"], 0.3), all("hundred-levels", ["a little sky and earth, as far apart", "a voice from him, asking for al-Firdaws", dua], 0.47)]).toEqual([[1, 0], [1, 0, 0]]);
    expect([shown("hundred-levels", "a voice from him, asking for al-Firdaws", 0.55), at("hundred-levels", dua, 0.555), at("hundred-levels", dua, 0.65), all("hundred-levels", ["a voice from him, asking for al-Firdaws", "al-Firdaws, a bright glow, the best"], 0.65)]).toEqual([1, [1, 0, 0], [1, 82, -50], [0, 0]]);
    expect([rivers.length, falls.length, all("hundred-levels", ["al-Firdaws, a bright glow, the best", "al-Firdaws, sparkling", ...rivers, ...falls], 0.8)]).toEqual([4, 2, [1, 1, 0, 0, 0, 0, 0, 0]]);
    expect([all("hundred-levels", [...rivers, ...falls, "the rivers, sparkling"], 1), rivers.map((name) => value("hundred-levels", name, "scaleX", 1))]).toEqual([[1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1]]);
    // Faith at the Pleiades: at night by the masjid, a golden ring, his place, the place beside him, and those sitting
    // with him; a voice asks from one of them, once, twice and a third time; a voice answers from the ring, and a light of
    // faith shows at the Pleiades, high among the stars; ways rise from a far land to the east up to the light, and reach
    // it; last, a warm glow comes on the place beside him.
    expect(words("faith-at-the-pleiades")).toEqual(["Who are they, O Allah's Messenger?", "I repeated my question thrice", "If faith were at Ath-Thurayya, the Pleiades", "Men, or a man, from these would attain it"]);
    const asking = ["a voice from him, asking, once", "a voice from him, asking, twice", "a voice from him, asking, a third time"];
    const marks = names("faith-at-the-pleiades", /^asked, a mark \d$/);
    const faith = "faith, a light at the Pleiades";
    const ways = names("faith-at-the-pleiades", /^a way up from the far land \d$/);
    const goingUp = names("faith-at-the-pleiades", /^going up to it \d$/);
    expect([all("faith-at-the-pleiades", [...asking, ...marks, "a voice from his place, answering", faith], 0.1)]).toEqual([[1, 0, 0, 1, 0, 0, 0, 0]]);
    expect([all("faith-at-the-pleiades", [...asking, ...marks], 0.27), all("faith-at-the-pleiades", [...asking, ...marks], 0.36), all("faith-at-the-pleiades", [...asking, "a voice from his place, answering", faith], 0.41)]).toEqual([[0, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0]]);
    expect([all("faith-at-the-pleiades", ["a voice from his place, answering", faith, ...ways, ...goingUp], 0.6), value("faith-at-the-pleiades", faith, "scale", 0.6)]).toEqual([[1, 1, 0, 0, 0, 0, 0, 0], 1]);
    expect([all("faith-at-the-pleiades", ["a voice from his place, answering", ...ways], 0.79), goingUp.map((name) => at("faith-at-the-pleiades", name, 0.9)), value("faith-at-the-pleiades", faith, "scale", 0.9)]).toEqual([[0, 1, 1, 1], [[1, -8.6, -35.4], [1, -19.1, -34.8], [1, -27.6, -35.2]], 1.4]);
    expect([shown("faith-at-the-pleiades", "a warm glow on the place beside him", 0.86), shown("faith-at-the-pleiades", "a warm glow on the place beside him", 1)]).toEqual([0, 1]);
    // The sacred city: in the valley among Makkah's hills, the Ka'bah; a golden ring of sanctuary shows about it, with a
    // calm; a first light spreads over the sky and the land; the sun crosses, day after day, and the ring stays; a cut
    // comes near a thorny bush and is held back, and the bush is kept; a way comes near the game, grazing, and turns
    // aside, and a calm comes on it; one passes a fallen purse and leaves it; last, one comes and takes it up, and his
    // voice announces it.
    expect(words("sacred-city")).toEqual(["Allah has made this place a sanctuary", "Since the creation of the heavens and the earth", "Till the Day of Resurrection", "Its thorns should not be uprooted", "Its game should not be chased", "Its fallen things should not be picked up", "Except by one who would announce it"]);
    const sanctuary = ["the sanctuary, a golden ring about it", "the sanctuary, a calm about it", "a first light over the sky and the land"];
    const cut = "a cut coming near, held back";
    const kept = "the thorny bush, kept, a glow on it";
    const passing = "someone passing it by";
    const announcer = "one who comes to announce it";
    const purse = "a fallen purse, left lying";
    expect([all("sacred-city", sanctuary, 0.02), all("sacred-city", sanctuary, 0.12), shown("sacred-city", sanctuary[2], 0.2), shown("sacred-city", sanctuary[2], 0.26)]).toEqual([[0, 0, 0], [1, 1, 0], 1, 0.5]);
    expect([at("sacred-city", "the sun, crossing day after day", 0.29), at("sacred-city", "the sun, crossing day after day", 0.38), all("sacred-city", [...sanctuary.slice(0, 2), cut, kept], 0.38)]).toEqual([[1, 0, 0], [1, 112, 0], [1, 1, 0, 0]]);
    expect([at("sacred-city", cut, 0.47), shown("sacred-city", kept, 0.47), at("sacred-city", cut, 0.52), shown("sacred-city", kept, 0.52)]).toEqual([[1, 0, 0], 0, [0, -4, 0], 1]);
    expect([all("sacred-city", ["a way coming near it, turning aside", "a calm on the game"], 0.54), all("sacred-city", ["a way coming near it, turning aside", "a calm on the game", passing], 0.65)]).toEqual([[0, 0], [1, 1, 0]]);
    expect([at("sacred-city", passing, 0.8), at("sacred-city", purse, 0.8), all("sacred-city", ["a gleam on the purse", announcer], 0.8)]).toEqual([[0, 50, 0.4], [1, 0, 0], [1, 0]]);
    expect([at("sacred-city", announcer, 0.9), at("sacred-city", purse, 0.9), all("sacred-city", ["a gleam on the purse", "a voice from him, announcing it"], 0.9)]).toEqual([[1, 29, 0], [1, -2, -1.4], [0, 1]]);
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

  test("in a question's small frame on a small phone, the words are a little smaller, so none is cut short", async () => {
    // A question's frame is never under 112 px high (184 wide), and on a 320 px phone it is 188 to 199 wide; every
    // lesson frame is wider, so its words keep their size (and fit at it, above).
    expect([Math.round(112 * 1.64), 188, 199].every((width) => width < SMALL_WORDS_WIDTH)).toBe(true);
    expect(FRAMES.every(([width]) => width >= SMALL_WORDS_WIDTH)).toBe(true);
    const sizes = (kind: SignKind) => signArt(kind).words.map((_, index) => StyleSheet.flatten(screen.getByTestId(`sign-scene-words-${index}-text`, ALL).props.style).fontSize);
    await render(<SignSceneView scene={scene("sign-chasing-horse")} width={188} height={116} still />);
    expect(sizes("chasing-horse")).toEqual([12, 12, 12, 12, 12]);
    await render(<SignSceneView scene={scene("sign-chasing-horse")} width={SMALL_WORDS_WIDTH} height={134} still />);
    expect(sizes("chasing-horse")).toEqual([13, 13, 13, 13, 13]);
    await render(<SignSceneView scene={scene("sign-crying-trunk")} width={292} height={178} still />);
    expect(new Set(sizes("crying-trunk"))).toEqual(new Set([13]));
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
