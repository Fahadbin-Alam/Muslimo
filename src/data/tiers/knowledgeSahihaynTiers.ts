import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Knowledge in more depth" lessons (knowledgeSahihaynUnits.ts): the lesson's own question is
 * Easy, then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps
 * the question's answer and its hadith; a true/false version keeps the same truth.
 */
export const KNOWLEDGE_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih Muslim 2666.
  "What were the two men arguing about?": {
    answer: "A verse of the Quran",
    harder: ["Muslim 2666: what were the two men arguing about?", "A piece of land", "A lost camel", "A trade deal"],
    expert: ["Abdullah ibn Amr: he ﷺ heard two voices disputing over what?", "A debt", "A horse race", "A water well"],
    superHard: ["Ikhtalafa fi ayah: what did the two men differ over?", "A boundary stone", "A poem", "A dowry"],
    extreme: ["In Muslim 2666, the quarrel that angered him ﷺ was about what?", "A market price", "A date palm", "An old feud"]
  },
  "What showed on his ﷺ face when he came out?": {
    answer: "Anger",
    harder: ["Muslim 2666: what showed on his ﷺ face?", "Joy", "Tiredness", "Surprise"],
    expert: ["Abdullah ibn Amr: hearing the two men, what was seen on his ﷺ face?", "Laughter", "Sleepiness", "Fear"],
    superHard: ["Yu'rafu fi wajhihi al-ghadab: what was seen on his ﷺ face?", "Calm", "Sadness", "Hunger"],
    extreme: ["In Muslim 2666, before saying those before you were ruined, what showed on his ﷺ face?", "A smile", "Weariness", "Wonder"]
  },
  "He ﷺ said those before us were ruined by quarrels over their Book.": {
    answer: "True",
    harder: "Muslim 2666: nations before were ruined by quarrelling over the Book.",
    expert: "Abdullah ibn Amr heard him ﷺ say: those before you perished only by differing over the Book.",
    superHard: "Innama halaka man kana qablakum bikhtilafihim fil-kitab.",
    extreme: "In Muslim 2666, the warning after two men argued about a verse was that earlier nations were ruined by such quarrels."
  },
  // Sahih al-Bukhari 76.
  "What was Ibn Abbas riding?": {
    answer: "A female donkey",
    harder: ["Bukhari 76: what was Ibn Abbas riding?", "A white horse", "A young camel", "A mule"],
    expert: ["Ibn Abbas, close to puberty, came to Mina riding what?", "A grey stallion", "A she-camel", "A ram"],
    superHard: ["Rakiban 'ala himarin atan: what did he ride?", "A pony", "A bull", "A wagon"],
    extreme: ["In Bukhari 76, what did Ibn Abbas let loose to graze before joining the row?", "His camel calf", "His goat", "His mare"]
  },
  "Where was he ﷺ leading the prayer?": {
    answer: "At Mina",
    harder: ["Bukhari 76: where was he ﷺ leading the prayer?", "At Quba", "At Badr", "At Ta'if"],
    expert: ["Ibn Abbas passed part of the row while he ﷺ prayed where?", "At Arafah", "At Uhud", "At Tabuk"],
    superHard: ["Yusalli bi-Mina ila ghayri jidar: where?", "At Khaybar", "At Hunayn", "At Dhul-Hulayfah"],
    extreme: ["In Bukhari 76, the prayer with no wall in front of him ﷺ was where?", "At Muzdalifah", "At al-Ji'ranah", "At Hudaybiyah"]
  },
  "The people told Ibn Abbas off for passing in front of the row.": {
    answer: "False",
    harder: "Bukhari 76: the people objected when Ibn Abbas passed the row.",
    expert: "Ibn Abbas said he was scolded after joining the row at Mina.",
    superHard: "Fa-ankara dhalika 'alayya ahad: someone objected to him.",
    extreme: "In Bukhari 76, after letting his donkey graze, Ibn Abbas was blamed by the row he passed."
  },
  // Sahih al-Bukhari 91.
  "How long should a found thing be announced?": {
    answer: "For one year",
    harder: ["Bukhari 91: how long should a found thing be announced?", "For one day", "For one week", "It need not be"],
    expert: ["Zayd ibn Khalid: know its tie and bag, then announce it for how long?", "For three days", "For one month", "For ten years"],
    superHard: ["'Arrifha sanah: how long is it announced?", "Forty days", "Until Friday", "Two months"],
    extreme: ["In Bukhari 91, after knowing its tie and bag, how long before using it?", "Until sunset", "One Ramadan", "Seven days"]
  },
  "Why should a lost camel be left alone?": {
    answer: "It has its water and feet",
    harder: ["Bukhari 91: why should a lost camel be left alone?", "Camels bite strangers", "It belongs to the ruler", "It is too heavy to lead"],
    expert: ["Zayd ibn Khalid: he ﷺ said it is not your concern. Why?", "It is too old", "It is unlucky", "It has no owner"],
    superHard: ["Ma'aha siqa'uha wa hidha'uha: why leave the camel?", "It is wild", "It is sick", "It is sacred"],
    extreme: ["In Bukhari 91, the camel reaches water and eats from trees because of what?", "It knows the stars", "A herder follows it", "The wolf fears it"]
  },
  "The question about the lost camel made him ﷺ angry.": {
    answer: "True",
    harder: "Bukhari 91: he ﷺ grew angry when asked about the lost camel.",
    expert: "Zayd ibn Khalid said his ﷺ cheeks or face turned red at the camel question.",
    superHard: "Fa-ghadiba hatta ihmarrat wajnatah: the camel question angered him ﷺ.",
    extreme: "In Bukhari 91, after the found thing and before the lost sheep, the camel question made his ﷺ face red."
  },
  // Sahih al-Bukhari 112.
  "Where was the man who asked for the sermon in writing from?": {
    answer: "Yemen",
    harder: ["Bukhari 112: where was the man who asked for it in writing from?", "Syria", "Iraq", "Egypt"],
    expert: ["Abu Hurayrah: a man asked, have it written for me. Where was he from?", "Bahrain", "Oman", "Abyssinia"],
    superHard: ["Rajulun min ahl al-Yaman: where was he from?", "Persia", "Najd", "Ta'if"],
    extreme: ["In Bukhari 112, the man for whom the sermon was written came from where?", "Kufa", "The land of Rum", "Khurasan"]
  },
  "What did he ﷺ tell the Companions to do?": {
    answer: "Write the sermon for him",
    harder: ["Bukhari 112: what did he ﷺ order for the man from Yemen?", "Send him home", "Teach him by heart only", "Give him a camel"],
    expert: ["Abu Hurayrah: after the request, what did he ﷺ order?", "Read it to him twice", "Ask a scholar later", "Wait until next year"],
    superHard: ["Uktubu li-Abi Shah: what did he ﷺ order?", "Give him a sword", "Give him dates", "Send a guide"],
    extreme: ["In Bukhari 112, what was done for the man who asked: get that written for me?", "He was given a ring", "He was made a governor", "He was told to memorize it"]
  },
  "He ﷺ gave this sermon in the year Makkah was opened.": {
    answer: "True",
    harder: "Bukhari 112: the sermon was given in the year of the Conquest of Makkah.",
    expert: "Abu Hurayrah said he ﷺ rode his camel and spoke in the year Makkah was opened.",
    superHard: "'Ama fathi Makkah: that is when he ﷺ gave the sermon.",
    extreme: "In Bukhari 112, after Khuza'ah killed a man of Banu Layth, he ﷺ gave the sermon in the year Makkah was opened."
  }
};
