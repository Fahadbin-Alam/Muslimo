import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Knowledge batch: four hadith on learning, asking and
// writing that were not taught yet, each with its exact English words to highlight. Every question also has
// Medium, Hard, Super hard and Extremely hard versions (src/data/tiers/knowledgeSahihaynTiers.ts).

const DEEPER: DeepUnit = {
  key: "sahihayn-knowledge",
  topicId: "sahihayn",
  branchId: "sahihayn-knowledge-deeper",
  branch: { title: "Knowledge in more depth", description: "From Bukhari and Muslim, easy to hard: no quarrels over a verse, a young narrator at Mina, the lost camel, and the sermon written down for Abu Shah." },
  name: "the deeper knowledge lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "no-quarrel-over-a-verse",
      title: "No quarrel over a verse",
      line: "Two men argued over a verse, and anger showed on his ﷺ face.",
      facts: ["Told by Abdullah ibn Amr", "Two men argued about one verse", "Nations before were ruined by quarrels over their Book"],
      source: hadith("muslim", "2666", "Abdullah ibn Amr", "Sahih", "Abdullah ibn Amr said: I came to the Messenger of Allah ﷺ one day, and he heard two men arguing about a verse. He came out to us with anger showing on his face and said: those before you were ruined only by their quarrels over the Book.", "were ruined because of their disputation in the Book"),
      difficulty: 1,
      questions: [
        { q: "What were the two men arguing about?", a: "A verse of the Quran", wrong: ["A piece of land", "A lost camel", "A trade deal"], why: "He heard the voice of two persons who had an argumentation with each other about a verse." },
        { q: "What showed on his ﷺ face when he came out?", a: "Anger", wrong: ["Joy", "Tiredness", "Surprise"], why: "The signs of anger could be seen on his face." },
        { q: "He ﷺ said those before us were ruined by quarrels over their Book.", tf: true, why: "The peoples before you were ruined because of their disputation in the Book, he ﷺ said." }
      ]
    },
    {
      slug: "a-young-narrator-at-mina",
      title: "A young narrator at Mina",
      line: "Young Ibn Abbas rode a donkey past the rows at Mina.",
      facts: ["Told by Abdullah ibn Abbas", "He was close to puberty", "He remembered and told it later"],
      source: hadith("bukhari", "76", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said: I came riding a female donkey, and I was then close to puberty. The Messenger of Allah ﷺ was leading the prayer at Mina with no wall in front of him. I passed in front of part of the row, let the donkey graze, and joined the row, and nobody objected.", "nobody objected to it"),
      difficulty: 2,
      questions: [
        { q: "What was Ibn Abbas riding?", a: "A female donkey", wrong: ["A white horse", "A young camel", "A mule"], why: "I came riding a she-ass and had just attained the age of puberty, Ibn Abbas said." },
        { q: "Where was he ﷺ leading the prayer?", a: "At Mina", wrong: ["At Quba", "At Badr", "At Ta'if"], why: "Allah's Messenger ﷺ was offering the prayer at Mina." },
        { q: "The people told Ibn Abbas off for passing in front of the row.", tf: false, why: "I let the she-ass loose to graze and entered the row, and nobody objected to it." }
      ]
    },
    {
      slug: "the-lost-camel",
      title: "The lost camel",
      line: "Asked about a lost camel, he ﷺ said: leave it be.",
      facts: ["Told by Zayd ibn Khalid al-Juhani", "Announce a found thing for a year", "A lost camel finds its own way"],
      source: hadith("bukhari", "91", "Zayd ibn Khalid al-Juhani", "Sahih", "A man asked the Prophet ﷺ about a lost thing he found. He said: know its tie and its bag, announce it for a year, then use it, but give it back if its owner comes. The man asked about a lost camel, and he ﷺ grew angry and said: it is not your concern; it has its water and its feet, it will reach water and eat from the trees until its owner finds it. He asked about a lost sheep, and he said: it is for you, for your brother, or for the wolf.", "it has its water container, and its feet"),
      difficulty: 4,
      questions: [
        { q: "How long should a found thing be announced?", a: "For one year", wrong: ["For one day", "For one week", "It need not be"], why: "Make public announcement about it for one year, he ﷺ said." },
        { q: "Why should a lost camel be left alone?", a: "It has its water and feet", wrong: ["Camels bite strangers", "It belongs to the ruler", "It is too heavy to lead"], why: "It has its water container and its feet, and it will reach water and eat the leaves of trees." },
        { q: "The question about the lost camel made him ﷺ angry.", tf: true, why: "The Prophet ﷺ got angry and his cheeks or his face became red." }
      ]
    },
    {
      slug: "write-it-for-abu-shah",
      title: "Write it for Abu Shah",
      line: "A man from Yemen asked: write it for me. He ﷺ agreed.",
      facts: ["Told by Abu Hurayrah", "The year Makkah was opened", "The man was Abu Shah"],
      source: hadith("bukhari", "112", "Abu Hurayrah", "Sahih", "In the year Makkah was opened, the Prophet ﷺ gave a sermon on his camel about the sanctity of Makkah. A man from Yemen came and said: Messenger of Allah, have it written for me. He ordered: write it for him.", "ordered his companions to write that for him"),
      difficulty: 5,
      questions: [
        { q: "Where was the man who asked for the sermon in writing from?", a: "Yemen", wrong: ["Syria", "Iraq", "Egypt"], why: "A man from Yemen came and said: get that written for me." },
        { q: "What did he ﷺ tell the Companions to do?", a: "Write the sermon for him", wrong: ["Send him home", "Teach him by heart only", "Give him a camel"], why: "The Prophet ﷺ ordered his companions to write that for him." },
        { q: "He ﷺ gave this sermon in the year Makkah was opened.", tf: true, why: "In the year of the Conquest of Mecca he rode his she-camel and addressed the people." }
      ]
    }
  ]
};

export const KNOWLEDGE_SAHIHAYN_UNITS: readonly DeepUnit[] = [DEEPER];
