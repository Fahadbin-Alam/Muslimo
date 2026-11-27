import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Prophets batch: six hadith about the prophets, peace be
// upon them, that were not taught yet, each with its exact English words to highlight. Every question also has Medium,
// Hard, Super hard and Extremely hard versions (src/data/tiers/prophetsSahihaynTiers.ts).

const DEEPER: DeepUnit = {
  key: "sahihayn-prophets",
  topicId: "prophets",
  branchId: "prophets-sahihayn-deeper",
  branch: { title: "The Prophets in more depth", description: "From Bukhari and Muslim, easy to hard: the gecko and Ibrahim's fire, no ranking of the prophets, Musa and Isa described, Musa praying in his grave, Musa at the Throne, and Ibrahim with his father." },
  name: "the deeper Prophets lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-gecko-and-the-fire",
      title: "The gecko and the fire",
      line: "The gecko blew on the fire lit for Ibrahim.",
      facts: ["Told by Umm Sharik", "Al-wazagh: the gecko", "He ﷺ ordered it killed"],
      source: hadith("bukhari", "3359", "Umm Sharik", "Sahih", "Umm Sharik said: the Messenger of Allah ﷺ ordered that the gecko be killed, and said: it blew on the fire against Ibrahim.", "ordered that the salamander should be killed"),
      difficulty: 1,
      questions: [
        { q: "Which creature blew on the fire of Ibrahim?", a: "The gecko", wrong: ["The dove", "The spider", "The ant"], why: "He ﷺ said of the salamander, the gecko: it blew the fire on Abraham." },
        { q: "On whose fire did the gecko blow?", a: "Ibrahim's", wrong: ["Musa's", "Nuh's", "Yusuf's"], why: "It blew the fire on Abraham, he ﷺ said." },
        { q: "He ﷺ ordered that the gecko be killed.", tf: true, why: "Allah's Messenger ﷺ ordered that the salamander should be killed, Umm Sharik said." }
      ]
    },
    {
      slug: "no-ranking-the-prophets",
      title: "Do not rank the prophets",
      line: "He ﷺ said: do not set the prophets apart from each other.",
      facts: ["Told by Abu Sa'id al-Khudri", "About the prophets", "Reported by more than one chain"],
      source: hadith("muslim", "2374b", "Abu Sa'id al-Khudri", "Sahih", "Abu Sa'id al-Khudri reported that the Messenger of Allah ﷺ said: do not make distinctions between the prophets.", "make distinction amongst the Apostles"),
      difficulty: 2,
      questions: [
        { q: "Between whom did he ﷺ say not to make distinctions?", a: "The prophets", wrong: ["The angels", "The masjids", "The tribes"], why: "Don't make distinction amongst the Apostles, he ﷺ said." },
        { q: "Who told this saying of his ﷺ?", a: "Abu Sa'id al-Khudri", wrong: ["Abu Hurairah", "Anas ibn Malik", "Ibn Abbas"], why: "Abu Sa'id Khudri reported Allah's Messenger ﷺ saying it." },
        { q: "Muslim says it came through more than one chain.", tf: true, why: "This hadith has been narrated through another chain of transmitters also." }
      ]
    },
    {
      slug: "musa-and-isa-described",
      title: "Musa and Isa, as he described",
      line: "He ﷺ described Musa as tall and Isa as curly-haired.",
      facts: ["Told by Ibn Abbas", "Musa: brown and tall", "Isa: curly hair, middle height"],
      source: hadith("bukhari", "3396", "Ibn Abbas", "Sahih", "Speaking of the night of the Ascension, the Prophet ﷺ said: Musa was brown and tall, as if from the tribe of Shanu'ah; Isa was a curly-haired man of moderate height. He also mentioned Malik, the keeper of the Fire, and the Dajjal.", "Jesus was a curly-haired man of moderate height"),
      difficulty: 3,
      questions: [
        { q: "How did he ﷺ describe Musa?", a: "Brown and tall", wrong: ["Short and fair", "Bald and old", "Small and thin"], why: "Moses was brown, a tall person as if from the people of the tribe of Shanu'a, he ﷺ said." },
        { q: "How did he ﷺ describe Isa?", a: "Curly-haired, of moderate height", wrong: ["Very tall, straight-haired", "Bald and short", "Grey-haired and bent"], why: "Jesus was a curly-haired man of moderate height, he ﷺ said." },
        { q: "He ﷺ also mentioned Malik, the keeper of the Fire.", tf: true, why: "He also mentioned Malik, the gate-keeper of the Fire, and Ad-Dajjal." }
      ]
    },
    {
      slug: "musa-praying-in-his-grave",
      title: "Musa praying in his grave",
      line: "On the Night Journey he ﷺ passed Musa praying in his grave.",
      facts: ["Told by Anas ibn Malik", "Near the red mound", "On the Night Journey"],
      source: hadith("muslim", "2375a", "Anas ibn Malik", "Sahih", "The Messenger of Allah ﷺ said: on the Night Journey I passed by Musa at the red mound, and he was standing in prayer in his grave.", "near the red mound"),
      difficulty: 3,
      questions: [
        { q: "What was Musa doing when he ﷺ passed by?", a: "Praying in his grave", wrong: ["Sleeping", "Reading the Tawrah", "Walking to Egypt"], why: "I passed by Moses near the red mound, saying his prayer in his grave, he ﷺ said." },
        { q: "Near what place was Musa's grave?", a: "The red mound", wrong: ["Mount Uhud", "The well of Zamzam", "The river Nile"], why: "I happened to pass by Moses near the red mound, he ﷺ said." },
        { q: "He ﷺ passed by Musa on the Night Journey.", tf: true, why: "On the occasion of the Night journey, he ﷺ said." }
      ]
    },
    {
      slug: "musa-at-the-throne",
      title: "Musa at the Throne",
      line: "On Resurrection Day, Musa will hold a pillar of the Throne.",
      facts: ["Told by Abu Sa'id al-Khudri", "People faint, he ﷺ wakes first", "Musa fainted once at At-Tur"],
      source: hadith("bukhari", "3398", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: people will fall unconscious on the Day of Resurrection, and I will be the first to wake, and there I will see Musa holding one of the pillars of the Throne. I will not know whether he woke before me, or was spared because of his fainting at At-Tur.", "Moses holding one of the pillars of"),
      difficulty: 4,
      questions: [
        { q: "Who did he ﷺ say will be first to regain consciousness?", a: "He himself ﷺ", wrong: ["Musa", "Ibrahim", "Isa"], why: "I will be the first to regain consciousness, he ﷺ said." },
        { q: "What will Musa be holding?", a: "A pillar of Allah's Throne", wrong: ["His staff", "The Tawrah", "A lamp"], why: "There I will see Moses holding one of the pillars of Allah's Throne, he ﷺ said." },
        { q: "He ﷺ wondered if Musa was spared for his fainting at At-Tur.", tf: true, why: "Or he has been exempted because of his unconsciousness at the Tur, he ﷺ said." }
      ]
    },
    {
      slug: "ibrahim-and-his-father",
      title: "Ibrahim and his father Azar",
      line: "Ibrahim will meet his father Azar on Resurrection Day.",
      facts: ["Told by Abu Hurairah", "Azar: face dark with dust", "Paradise is forbidden to disbelievers"],
      source: hadith("bukhari", "3350", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: on the Day of Resurrection Ibrahim will meet his father Azar, his face dark and dusty. Ibrahim will say: did I not tell you not to disobey me? His father will say: today I will not disobey you. Ibrahim will ask his Lord not to disgrace him, and Allah will say: I have forbidden Paradise to the disbelievers.", "Abraham will meet his father Azar"),
      difficulty: 5,
      questions: [
        { q: "Whom will Ibrahim meet on the Day of Resurrection?", a: "His father Azar", wrong: ["His son Isma'il", "Pharaoh", "Namrud"], why: "On the Day of Resurrection Abraham will meet his father Azar, he ﷺ said." },
        { q: "What will Allah say to Ibrahim about Paradise?", a: "It is forbidden to the disbelievers", wrong: ["It is open to all", "It is for his father", "It is far away"], why: "I have forbidden Paradise for the disbelievers, Allah will say." },
        { q: "Azar will say: today I will not disobey you.", tf: true, why: "His father will reply: Today I will not disobey you." }
      ]
    }
  ]
};

export const PROPHETS_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
