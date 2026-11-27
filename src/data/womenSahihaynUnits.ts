import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Great Women batch: six hadith about the women around him ﷺ
// that were not taught yet, each with its exact English words to highlight. Every question also has Medium, Hard,
// Super hard and Extremely hard versions (src/data/tiers/womenSahihaynTiers.ts).

const DEEPER: DeepUnit = {
  key: "sahihayn-women",
  topicId: "women_of_the_book",
  branchId: "women-sahihayn-deeper",
  branch: { title: "Great women in more depth", description: "From Bukhari and Muslim, easy to hard: Umm Sulaym in Paradise, Juwayriyah's Friday fast, Hala at the door, the angels' Amin, Sawdah's waterskin, and Umm Sulaym's bottles." },
  name: "the deeper Great Women lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "umm-sulaym-in-paradise",
      title: "Umm Sulaym in Paradise",
      line: "He ﷺ was shown Paradise and saw Umm Sulaym there.",
      facts: ["Told by Jabir ibn Abdullah", "The wife of Abu Talhah", "Bilal's steps were heard too"],
      source: hadith("muslim", "2457", "Jabir ibn Abdullah", "Sahih", "The Messenger of Allah ﷺ said: I was shown Paradise, and I saw the wife of Abu Talhah, Umm Sulaym. Then I heard footsteps ahead of me, and it was Bilal.", "I saw the wife of Abu Talha"),
      difficulty: 1,
      questions: [
        { q: "Which woman did he ﷺ see when shown Paradise?", a: "Umm Sulaym", wrong: ["Umm Salamah", "Asma bint Abi Bakr", "Umm Ayman"], why: "I was shown Paradise and I saw the wife of Abu Talha, he ﷺ said." },
        { q: "Whose footsteps did he ﷺ hear ahead of him?", a: "Bilal's", wrong: ["Umar's", "Anas's", "Abu Talhah's"], why: "I heard the noise of steps before me, and lo, it was that of Bilal, he ﷺ said." },
        { q: "Umm Sulaym was the wife of Abu Talhah.", tf: true, why: "The wife of Abu Talha, that is Umm Sulaim, Jabir reported." }
      ]
    },
    {
      slug: "juwayriyah-and-friday",
      title: "Juwayriyah's Friday fast",
      line: "Fasting Friday alone, Juwayriyah was told to break her fast.",
      facts: ["Told by Juwayriyah bint al-Harith", "She fasted on a Friday", "Not the day before, nor after"],
      source: hadith("bukhari", "1986", "Juwayriyah bint al-Harith", "Sahih", "The Prophet ﷺ visited Juwayriyah on a Friday while she was fasting. He asked: did you fast yesterday? She said no. He asked: do you mean to fast tomorrow? She said no. He said: then break your fast.", "Then break your fast"),
      difficulty: 2,
      questions: [
        { q: "On which day was Juwayriyah fasting?", a: "Friday", wrong: ["Monday", "Thursday", "Saturday"], why: "He ﷺ visited her on a Friday and she was fasting." },
        { q: "What did he ﷺ ask Juwayriyah about?", a: "Fasting the day before or after", wrong: ["Her travels", "Her family", "Her charity"], why: "Did you fast yesterday? Do you intend to fast tomorrow? he ﷺ asked." },
        { q: "She fasted neither day around it, so he ﷺ told her to break her fast.", tf: true, why: "He ﷺ said: then break your fast." }
      ]
    },
    {
      slug: "hala-at-the-door",
      title: "Hala at the door",
      line: "Hala asked to come in, just like Khadijah did.",
      facts: ["Told by Aishah", "Hala bint Khuwaylid", "Khadijah's sister"],
      source: hadith("muslim", "2437", "Aishah", "Sahih", "Hala bint Khuwaylid, the sister of Khadijah, asked permission to come in to the Messenger of Allah ﷺ. He was reminded of how Khadijah used to ask permission, was moved, and said: O Allah, it is Hala, daughter of Khuwaylid.", "O Allah, it is Hala, daughter of Khuwailid"),
      difficulty: 3,
      questions: [
        { q: "Who was Hala bint Khuwaylid?", a: "Khadijah's sister", wrong: ["Aishah's mother", "Fatimah's nurse", "Umm Salamah's sister"], why: "Hala b. Khuwailid, sister of Khadija, sought permission, Aishah said." },
        { q: "What did Hala's asking to come in remind him ﷺ of?", a: "How Khadijah asked to come in", wrong: ["A dream", "A battle", "His mother's voice"], why: "He was reminded of Khadija's manner of asking leave to enter, Aishah said." },
        { q: "He ﷺ said: O Allah, it is Hala.", tf: true, why: "O Allah, it is Hala, daughter of Khuwailid, he ﷺ said." }
      ]
    },
    {
      slug: "angels-say-amin",
      title: "The angels say Amin",
      line: "At the sick or the dead, say good: the angels say Amin.",
      facts: ["Told by Umm Salamah", "Visiting the sick and the dead", "Allah gave her better than Abu Salamah"],
      source: hadith("muslim", "919", "Umm Salamah", "Sahih", "The Messenger of Allah ﷺ said: when you visit the sick or the dead, say what is good, for the angels say Amin to what you say. When Abu Salamah died, he ﷺ told Umm Salamah to say: O Allah, forgive me and him, and give me something better in his place. She said it, and Allah gave her Muhammad ﷺ, who was better for her.", "supplicate for good because angels say"),
      difficulty: 3,
      questions: [
        { q: "What should you say when visiting the sick or the dead?", a: "Good words", wrong: ["Nothing at all", "Only poetry", "Words of blame"], why: "Whenever you visit the sick or the dead, supplicate for good, he ﷺ said." },
        { q: "Who says Amin to what you say there?", a: "The angels", wrong: ["The imam", "The family", "The neighbours"], why: "Angels say Amen to whatever you say, he ﷺ said." },
        { q: "Umm Salamah said Allah gave her someone better than Abu Salamah.", tf: true, why: "Allah gave me in exchange Muhammad ﷺ, who is better for me than him, she said." }
      ]
    },
    {
      slug: "sawdahs-waterskin",
      title: "Sawdah's waterskin",
      line: "Sawdah tanned a dead sheep's skin and used it as a waterskin.",
      facts: ["Told by Sawdah bint Zam'ah", "A sheep of theirs died", "Its tanned skin held dates"],
      source: hadith("bukhari", "6686", "Sawdah bint Zam'ah", "Sahih", "Sawdah, the wife of the Prophet ﷺ, said: a sheep of ours died, so we tanned its skin and kept soaking dates in it until it became a worn-out waterskin.", "we tanned its skin"),
      difficulty: 4,
      questions: [
        { q: "What did Sawdah's family do with the skin of their dead sheep?", a: "Tanned it", wrong: ["Buried it", "Burned it", "Threw it away"], why: "One of our sheep died and we tanned its skin, Sawdah said." },
        { q: "What did they soak in the skin?", a: "Dates", wrong: ["Milk", "Honey", "Barley"], why: "We kept on infusing dates in it, Sawdah said." },
        { q: "They used it until it was a worn-out waterskin.", tf: true, why: "Till it was a worn out water skin, Sawdah said." }
      ]
    },
    {
      slug: "umm-sulayms-bottles",
      title: "Umm Sulaym's bottles",
      line: "Umm Sulaym kept his ﷺ sweat; he said: you have done right.",
      facts: ["Told by Anas ibn Malik", "His midday rest at her house", "For blessing for the children"],
      source: hadith("muslim", "2331b", "Anas ibn Malik", "Sahih", "The Messenger of Allah ﷺ rested at midday in the house of Umm Sulaym. She found him sweating onto the leather mat and began filling bottles with it. He woke and asked: Umm Sulaym, what are you doing? She said: we hope for blessing for our children through it. He said: you have done right.", "You have done something right"),
      difficulty: 5,
      questions: [
        { q: "Where did he ﷺ take his midday rest, in this story?", a: "In Umm Sulaym's house", wrong: ["In the masjid", "Under a tree", "In a tent"], why: "He ﷺ came to the house of Umm Sulaim and slept in her bed while she was away, Anas said." },
        { q: "What did Umm Sulaym collect in bottles?", a: "His ﷺ sweat", wrong: ["Rain water", "Zamzam water", "Milk"], why: "She found him sweating and began to fill the bottles with it, Anas said." },
        { q: "He ﷺ told Umm Sulaym she had done something wrong.", tf: false, why: "No. He ﷺ said: you have done something right." }
      ]
    }
  ]
};

export const WOMEN_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
