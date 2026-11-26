import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Manners batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/mannersSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-manners",
  topicId: "manners",
  branchId: "manners-sahihayn-deeper",
  branch: { title: "Deeper into manners", description: "From Bukhari and Muslim, easy to hard: family ties, speaking up for others, humility, sparing the face, a kept gift, and not tormenting people." },
  name: "the deeper manners lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "hanging-from-the-throne",
      title: "Hanging from the Throne",
      line: "Family ties hang from the Throne and speak about us.",
      facts: ["Told by Aishah", "Ar-rahim: the tie of family", "Keep it, and Allah keeps you"],
      source: hadith("muslim", "2555", "Aishah", "Sahih", "The Messenger of Allah ﷺ said: the tie of family hangs from the Throne and says: whoever keeps me joined, Allah keeps him joined, and whoever cuts me off, Allah cuts him off.", "The tie of kinship is suspended to the Throne"),
      difficulty: 1,
      questions: [
        { q: "Where does the tie of family hang, he ﷺ said?", a: "From the Throne", wrong: ["From a tree", "From the sky", "From the Kabah door"], why: "The tie of kinship is suspended to the Throne, he ﷺ said." },
        { q: "What happens to one who keeps family ties?", a: "Allah keeps him joined", wrong: ["He grows rich at once", "He never gets ill", "Nothing at all"], why: "He who unites me, Allah would unite him, the tie of kinship says." },
        { q: "Allah cuts off the one who cuts off his family.", tf: true, why: "He who severed me, Allah would sever him, the tie of kinship says." }
      ]
    },
    {
      slug: "speak-up-for-him",
      title: "Speak up for him",
      line: "When someone in need came, he ﷺ said: speak up for him.",
      facts: ["Told by Abu Musa al-Ash'ari", "Speaking up for others is rewarded", "Allah decides the outcome"],
      source: hadith("bukhari", "6028", "Abu Musa al-Ash'ari", "Sahih", "When someone asking or in need came to the Prophet ﷺ, he would say: speak up for him and you will be rewarded, and Allah decides what He wills by the tongue of His Prophet.", "Help and recommend him and you will receive the reward for it"),
      difficulty: 2,
      questions: [
        { q: "When a man in need came, what did he ﷺ tell those present?", a: "Speak up for him", wrong: ["Send him away", "Wait until night", "Give him advice only"], why: "Help and recommend him and you will receive the reward for it, he ﷺ said." },
        { q: "What do those who speak up for him get?", a: "A reward", wrong: ["A share of his money", "A new title", "Nothing"], why: "You will receive the reward for it, he ﷺ said." },
        { q: "The final say on his need is with Allah.", tf: true, why: "Allah will bring about what He will through His Prophet's tongue." }
      ]
    },
    {
      slug: "taken-by-the-hand",
      title: "Taken by the hand",
      line: "Any servant girl of Madinah could lead him ﷺ by the hand.",
      facts: ["Told by Anas ibn Malik", "He ﷺ went where she needed", "A sign of his humility"],
      source: hadith("bukhari", "6072", "Anas ibn Malik", "Sahih", "Anas said: any of the servant girls of Madinah could take the hand of the Messenger of Allah ﷺ and lead him wherever she wished.", "could take hold of the hand"),
      difficulty: 2,
      questions: [
        { q: "Who could take his ﷺ hand and lead him?", a: "Any servant girl of Madinah", wrong: ["Only his family", "Only the leaders", "Only the scholars"], why: "Any of the female slaves of Madinah could take hold of his hand, Anas said." },
        { q: "Where would he ﷺ go with her?", a: "Wherever she wished", wrong: ["Only to the masjid", "Only to the market", "Nowhere"], why: "She could take him wherever she wished, Anas said." },
        { q: "That shows his ﷺ humility.", tf: true, why: "Even a servant girl could take his hand and lead him wherever she wished." }
      ]
    },
    {
      slug: "spare-the-face",
      title: "Spare the face",
      line: "In any fight, he ﷺ said, keep away from the face.",
      facts: ["Told by Abu Hurairah", "Even in a quarrel", "The face is honoured"],
      source: hadith("muslim", "2612a", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: when one of you fights his brother, let him keep from striking the face.", "he should avoid striking at the face"),
      difficulty: 3,
      questions: [
        { q: "In a fight, what must not be struck, he ﷺ said?", a: "The face", wrong: ["The hand", "The back", "The foot"], why: "When any one of you fights with his brother he should avoid striking at the face." },
        { q: "Whom did he ﷺ call the other person in the fight?", a: "His brother", wrong: ["His enemy", "A stranger", "His servant"], why: "When any one of you fights with his brother, he ﷺ said." },
        { q: "The face may be struck if one is angry.", tf: false, why: "No. He ﷺ said he should avoid striking at the face." }
      ]
    },
    {
      slug: "i-kept-this-for-you",
      title: "I kept this for you",
      line: "He ﷺ saved a cloak for Makhramah and showed it to him.",
      facts: ["Told by Ibn Abi Mulaykah", "Cloaks came as a gift", "Makhramah came later"],
      source: hadith("bukhari", "6132", "Ibn Abi Mulaykah", "Sahih", "The Prophet ﷺ was given cloaks as a gift. He shared them among his Companions and put one aside for Makhramah. When Makhramah came, he said: I kept this for you.", "I kept this for you"),
      difficulty: 4,
      questions: [
        { q: "For whom did he ﷺ put a cloak aside?", a: "Makhramah", wrong: ["Bilal", "Anas", "Abu Hurairah"], why: "He put aside one of them for Makhramah, Ibn Abi Mulaykah said." },
        { q: "What did he ﷺ say when Makhramah came?", a: "I kept this for you", wrong: ["You came too late", "Share it with others", "Sell it"], why: "When Makhramah came, the Prophet ﷺ said: I kept this for you." },
        { q: "He ﷺ shared the other cloaks among his Companions.", tf: true, why: "He distributed them amongst some of his companions, Ibn Abi Mulaykah said." }
      ]
    },
    {
      slug: "a-hurt-toe",
      title: "A hurt toe",
      line: "A stone hurt his ﷺ toe, and he said a line of poetry.",
      facts: ["Told by Jundub", "His toe bled", "In the path of Allah"],
      source: hadith("bukhari", "6146", "Jundub ibn Abdullah", "Sahih", "Jundub said: while the Prophet ﷺ was walking, a stone hit him, he stumbled and his toe bled. He said, quoting a line of poetry: you are only a toe that has bled, and what you met was in the path of Allah.", "a toe which has been bathed in blood"),
      difficulty: 4,
      questions: [
        { q: "What hurt his ﷺ toe?", a: "A stone", wrong: ["A thorn", "An arrow", "A door"], why: "A stone hit his foot and he stumbled and his toe was injured, Jundub said." },
        { q: "What did he ﷺ say then?", a: "A line of poetry", wrong: ["A long sermon", "A complaint", "Nothing at all"], why: "He then, quoting a poetic verse, said: you are not more than a toe." },
        { q: "He ﷺ said the hurt was in the path of Allah.", tf: true, why: "A toe which has been bathed in blood in Allah's Cause, he ﷺ said." }
      ]
    },
    {
      slug: "people-in-the-sun",
      title: "People in the sun",
      line: "Hisham saw men kept in the sun and recalled a warning.",
      facts: ["Told by Urwah ibn az-Zubayr", "Hisham ibn Hakim spoke up", "In Hims, in Syria"],
      source: hadith("muslim", "2613d", "Hisham ibn Hakim", "Sahih", "Urwah said: Hisham ibn Hakim found a governor of Hims keeping some Nabataean farmers standing over a tax. He said: what is this? I heard the Messenger of Allah ﷺ say: Allah will punish those who torment people in this world.", "Allah would torment those persons who torment people in the world"),
      difficulty: 5,
      questions: [
        { q: "Who spoke up for the men being held?", a: "Hisham ibn Hakim", wrong: ["Abu Hurairah", "Ibn Umar", "Anas ibn Malik"], why: "Hisham ibn Hakim found a person detaining some Nabateans, Urwah said." },
        { q: "Whom will Allah punish, by this hadith?", a: "Those who torment people", wrong: ["Those who travel", "Those who trade", "Those who are poor"], why: "Allah would torment those persons who torment people in the world." },
        { q: "Hisham kept quiet when he saw them.", tf: false, why: "No. He asked: what is this? Then he told them the hadith." }
      ]
    }
  ]
};

export const MANNERS_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
