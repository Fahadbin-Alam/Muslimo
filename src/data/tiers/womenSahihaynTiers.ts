import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Great women in more depth" lessons (womenSahihaynUnits.ts): the lesson's own question is Easy,
 * then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const WOMEN_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih Muslim 2457.
  "Which woman did he ﷺ see when shown Paradise?": {
    answer: "Umm Sulaym",
    harder: ["Muslim 2457: which woman did he ﷺ see in Paradise?", "Umm Salamah", "Asma bint Abi Bakr", "Umm Ayman"],
    expert: ["Jabir: he ﷺ saw the wife of Abu Talhah in Paradise. Who was she?", "Umm Haram", "Umm Atiyyah", "Umm Kulthum"],
    superHard: ["Imra'at Abi Talhah: which woman is meant?", "Umm Hani", "Umm Habibah", "Umm Ruman"],
    extreme: ["In Muslim 2457, before hearing Bilal's steps, he ﷺ saw which woman?", "Umm Khalid", "Umm Sharik", "Umm al-Fadl"]
  },
  "Whose footsteps did he ﷺ hear ahead of him?": {
    answer: "Bilal's",
    harder: ["Muslim 2457: whose steps did he ﷺ hear in Paradise?", "Umar's", "Anas's", "Abu Talhah's"],
    expert: ["Jabir: I heard steps before me. Whose were they?", "Zaid's", "Salman's", "Abu Dharr's"],
    superHard: ["Khashfah amami: whose footsteps?", "Ammar's", "Suhayb's", "Khabbab's"],
    extreme: ["In Muslim 2457, after seeing Umm Sulaym, he ﷺ heard whose steps?", "Mu'adh's", "Ubayy's", "Usamah's"]
  },
  "Umm Sulaym was the wife of Abu Talhah.": {
    answer: "True",
    harder: "Muslim 2457: the wife of Abu Talhah seen in Paradise was Umm Sulaym.",
    expert: "Jabir explained that the wife of Abu Talhah meant Umm Sulaym.",
    superHard: "Imra'at Abi Talhah: that is Umm Sulaym.",
    extreme: "In Muslim 2457, the woman named as Abu Talhah's wife is Umm Sulaym, the mother of Anas."
  },
  // Sahih al-Bukhari 1986.
  "On which day was Juwayriyah fasting?": {
    answer: "Friday",
    harder: ["Bukhari 1986: on which day did he ﷺ find Juwayriyah fasting?", "Monday", "Thursday", "Saturday"],
    expert: ["Juwayriyah bint al-Harith fasted alone on which day?", "Sunday", "Wednesday", "The day of Arafah"],
    superHard: ["Yawm al-jumu'ah: what day was she fasting?", "Ashura", "Tuesday", "The day of Eid"],
    extreme: ["In Bukhari 1986, she fasted neither Thursday nor Saturday, but which day?", "Wednesday", "Sunday", "Monday"]
  },
  "What did he ﷺ ask Juwayriyah about?": {
    answer: "Fasting the day before or after",
    harder: ["Bukhari 1986: what did he ﷺ ask Juwayriyah?", "Her travels", "Her family", "Her charity"],
    expert: ["Did you fast yesterday? Will you tomorrow? What was he ﷺ asking about?", "Her sleep", "Her guests", "Her food"],
    superHard: ["Amsi and ghadan: what were the questions about?", "Her prayers at night", "Her Quran reading", "Her zakat"],
    extreme: ["In Bukhari 1986, before telling her to break it, he ﷺ asked her what?", "Why she was fasting", "Who told her to fast", "When she would eat"]
  },
  "She fasted neither day around it, so he ﷺ told her to break her fast.": {
    answer: "True",
    harder: "Bukhari 1986: with no fast the day before or after, he ﷺ told her to break it.",
    expert: "Abu Ayyub reported that he ﷺ ordered Juwayriyah and she broke her fast.",
    superHard: "Fa-aftiri: so he ﷺ told Juwayriyah.",
    extreme: "In Bukhari 1986, a Friday fast alone, with no day joined to it, was broken at his ﷺ word."
  },
  // Sahih Muslim 2437.
  "Who was Hala bint Khuwaylid?": {
    answer: "Khadijah's sister",
    harder: ["Muslim 2437: who was Hala bint Khuwaylid?", "Aishah's mother", "Fatimah's nurse", "Umm Salamah's sister"],
    expert: ["Aishah: Hala asked to come in. How was she related to Khadijah?", "Her daughter", "Her aunt", "Her servant"],
    superHard: ["Ukht Khadijah: who is Hala?", "Khadijah's cousin", "Khadijah's mother", "Khadijah's neighbour"],
    extreme: ["In Muslim 2437, the daughter of Khuwaylid at the door was whose sister?", "Abu Bakr's sister", "Sawdah's sister", "Hafsah's sister"]
  },
  "What did Hala's asking to come in remind him ﷺ of?": {
    answer: "How Khadijah asked to come in",
    harder: ["Muslim 2437: what did Hala's request remind him ﷺ of?", "A dream", "A battle", "His mother's voice"],
    expert: ["Aishah: he ﷺ was moved when Hala asked. Why?", "She brought sad news", "She was ill", "She came from far"],
    superHard: ["Isti'dhan Khadijah: what came to his ﷺ mind?", "Khadijah's trade", "Khadijah's house", "Khadijah's gifts"],
    extreme: ["In Muslim 2437, what in Hala's way brought Khadijah back to his ﷺ mind?", "Her face", "Her clothes", "Her name"]
  },
  "He ﷺ said: O Allah, it is Hala.": {
    answer: "True",
    harder: "Muslim 2437: when she asked, he ﷺ said: O Allah, it is Hala.",
    expert: "Aishah reported him ﷺ saying: O Allah, Hala, daughter of Khuwaylid.",
    superHard: "Allahumma Halah bint Khuwaylid: so he ﷺ said.",
    extreme: "In Muslim 2437, his ﷺ words on hearing Khadijah's sister were: O Allah, it is Hala."
  },
  // Sahih Muslim 919.
  "What should you say when visiting the sick or the dead?": {
    answer: "Good words",
    harder: ["Muslim 919: what should be said when visiting the sick or the dead?", "Nothing at all", "Only poetry", "Words of blame"],
    expert: ["Umm Salamah: at the sick or the dead, he ﷺ said to say what?", "Loud crying", "Stories of the past", "News of the market"],
    superHard: ["Fa-qulu khayran: what are we told to say?", "Long sermons", "Complaints", "Jokes"],
    extreme: ["In Muslim 919, since the angels say Amin, what should we say there?", "Only silence", "Words of wailing", "The dead's faults"]
  },
  "Who says Amin to what you say there?": {
    answer: "The angels",
    harder: ["Muslim 919: who says Amin to what you say at the sick or the dead?", "The imam", "The family", "The neighbours"],
    expert: ["Umm Salamah: whose Amin follows what we say there?", "The children", "The sick person", "The scholars"],
    superHard: ["Yu'amminuna ala ma taqulun: who are they?", "The jinn", "The guests", "The doctors"],
    extreme: ["In Muslim 919, the reason to say good is that who say Amin?", "The prophets", "The martyrs", "The poor"]
  },
  "Umm Salamah said Allah gave her someone better than Abu Salamah.": {
    answer: "True",
    harder: "Muslim 919: Umm Salamah said Allah gave her Muhammad ﷺ, better than Abu Salamah.",
    expert: "After her du'a, Umm Salamah said she was given one better for her than Abu Salamah.",
    superHard: "A'qabani man huwa khayrun li minhu: so Umm Salamah said.",
    extreme: "In Muslim 919, the better one Umm Salamah was given in exchange was Muhammad ﷺ."
  },
  // Sahih al-Bukhari 6686.
  "What did Sawdah's family do with the skin of their dead sheep?": {
    answer: "Tanned it",
    harder: ["Bukhari 6686: what did Sawdah's family do with the dead sheep's skin?", "Buried it", "Burned it", "Threw it away"],
    expert: ["Sawdah: a sheep of ours died. What did we do with its skin?", "Sold it", "Gave it away", "Left it outside"],
    superHard: ["Dabaghna maskaha: what was done to it?", "Washed it once", "Cut it up", "Hung it to dry"],
    extreme: ["In Bukhari 6686, before it held dates, the skin was what?", "Dyed red", "Sewn into a rug", "Filled with sand"]
  },
  "What did they soak in the skin?": {
    answer: "Dates",
    harder: ["Bukhari 6686: what did Sawdah's family soak in the skin?", "Milk", "Honey", "Barley"],
    expert: ["Sawdah: we kept soaking what in it?", "Raisins", "Wheat", "Olives"],
    superHard: ["Nanbidhu fihi: what was soaked?", "Figs", "Grapes", "Lentils"],
    extreme: ["In Bukhari 6686, the tanned skin was used to soak what, until it wore out?", "Meat", "Butter", "Vinegar"]
  },
  "They used it until it was a worn-out waterskin.": {
    answer: "True",
    harder: "Bukhari 6686: Sawdah's family used the skin until it wore out.",
    expert: "Sawdah said they kept using the tanned skin until it was an old waterskin.",
    superHard: "Hatta sarat shannan: so the skin was used.",
    extreme: "In Bukhari 6686, the skin of a sheep that died was used until it was worn out."
  },
  // Sahih Muslim 2331b.
  "Where did he ﷺ take his midday rest, in this story?": {
    answer: "In Umm Sulaym's house",
    harder: ["Muslim 2331b: where did he ﷺ have his midday rest?", "In the masjid", "Under a tree", "In a tent"],
    expert: ["Anas: he ﷺ slept on whose bed while she was away?", "In Abu Bakr's house", "In Bilal's room", "In Umar's house"],
    superHard: ["Qala fi bayt Umm Sulaym: where was his rest?", "In the market", "On a journey", "At Quba"],
    extreme: ["In Muslim 2331b, the leather mat he ﷺ sweated on was where?", "In the house of Abu Ayyub", "In the house of Hafsah", "In the masjid of Quba"]
  },
  "What did Umm Sulaym collect in bottles?": {
    answer: "His ﷺ sweat",
    harder: ["Muslim 2331b: what did Umm Sulaym fill her bottles with?", "Rain water", "Zamzam water", "Milk"],
    expert: ["Anas: his mother found him ﷺ asleep and filled bottles with what?", "Perfume only", "Honey", "Olive oil"],
    superHard: ["Araq: what did she gather?", "His hair only", "Sand", "Leaves"],
    extreme: ["In Muslim 2331b, what fell on the leather mat that she gathered for blessing?", "Water from wudu", "Dew", "Tears"]
  },
  "He ﷺ told Umm Sulaym she had done something wrong.": {
    answer: "False",
    harder: "Muslim 2331b: he ﷺ told Umm Sulaym her deed was wrong.",
    expert: "Anas reported that he ﷺ forbade Umm Sulaym from what she did.",
    superHard: "Asabti: he ﷺ said she had made a mistake.",
    extreme: "In Muslim 2331b, after hearing her reason, he ﷺ said she had done wrong."
  }
};
