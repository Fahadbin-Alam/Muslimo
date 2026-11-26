import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into fasting" lessons (fastingSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const FASTING_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 1924.
  "On which day was the call made?": {
    answer: "Ashura",
    harder: ["Bukhari 1924: on which day did a man call out: whoever has eaten, fast?", "Arafah", "Eid al-Fitr", "The first of Ramadan"],
    expert: ["Salamah ibn al-Akwa' said the call was made on the tenth of which day?", "The day of Badr", "The day of Tarwiyah", "Laylat al-Qadr"],
    superHard: ["The tenth of Muharram has a name. The call was made on it. Which?", "Nahr", "Tashriq", "Hijrah"],
    extreme: ["In Bukhari 1924, he ﷺ sent a caller out on which day?", "The day of Khaybar", "The day of Hunayn", "The first of Shawwal"]
  },
  "What should one who had eaten do?": {
    answer: "Eat no more and fast",
    harder: ["Bukhari 1924: what was told to whoever had already eaten that day?", "Eat until sunset", "Fast the next day", "Give charity instead"],
    expert: ["Salamah: the call said what to the one who had eaten on Ashura?", "Feed a poor man", "Fast two days later", "Pray two rak'ahs"],
    superHard: ["Man akala falyutimm: what was the one who had eaten to do?", "Eat with others", "Stay at home", "Fast on Friday"],
    extreme: ["In Bukhari 1924, the one who had eaten was not told to make it up. What then?", "Fast all of Muharram", "Wait for the next year", "Eat at dawn only"]
  },
  "One who had not eaten was told to finish his fast.": {
    answer: "True",
    harder: "Bukhari 1924: whoever had not eaten was told not to eat and to complete his fast.",
    expert: "Salamah reported that on Ashura, the one who had not eaten was to keep fasting till the end of the day.",
    superHard: "The call had one word for the one who ate and another for the one who had not.",
    extreme: "In Bukhari 1924, both the eater and the one who had not eaten were told to fast for the rest of the day."
  },
  // Sahih al-Bukhari 2028.
  "Where was he ﷺ during i'tikaf?": {
    answer: "In the masjid",
    harder: ["Bukhari 2028: where did he ﷺ stay in i'tikaf when Aishah combed his hair?", "At home", "In the market", "On a journey"],
    expert: ["Aishah: he ﷺ leaned his head out to her from where?", "From a tent outside Madinah", "From a garden", "From the roof"],
    superHard: ["I'tikaf is staying for worship in which place?", "A cave", "A farm", "A school"],
    extreme: ["In Bukhari 2028, he ﷺ did not leave this place for his hair. Which?", "The house of Abu Ayyub", "The valley", "The well of Rumah"]
  },
  "What did Aishah do for his hair?": {
    answer: "Combed and oiled it",
    harder: ["Bukhari 2028: what did Aishah do while he ﷺ leaned his head out to her?", "Cut it", "Covered it", "Dyed it"],
    expert: ["Aishah said she would do two things to his ﷺ hair. Which?", "Braided and tied it", "Washed and shaved it", "Wrapped and hid it"],
    superHard: ["Urajjiluhu: what did Aishah do?", "Shortened it", "Plaited it", "Perfumed his clothes"],
    extreme: ["In Bukhari 2028, the hair care done from her room was what?", "Trimming the beard", "A turban tied on", "Henna put on"]
  },
  "He ﷺ left the masjid to have his hair combed.": {
    answer: "False",
    harder: "Bukhari 2028: he ﷺ left i'tikaf and went home for his hair to be combed.",
    expert: "Aishah said he ﷺ came out of the masjid each time she combed his hair.",
    superHard: "In i'tikaf, he ﷺ walked to Aishah's house to have his hair oiled.",
    extreme: "In Bukhari 2028, he ﷺ broke his i'tikaf to have his hair combed."
  },
  // Sahih al-Bukhari 2015.
  "How did the Companions learn of the Night of Qadr here?": {
    answer: "In dreams",
    harder: ["Bukhari 2015: how were some Companions shown the Night of Qadr?", "From a letter", "From the stars", "From a traveler"],
    expert: ["Ibn Umar: some men were shown the night in the last seven. How?", "By the moon", "By a sign in the sky", "By a voice"],
    superHard: ["Ru'ya: how did they see the Night of Qadr's place?", "In the clouds", "In the masjid wall", "In a book"],
    extreme: ["In Bukhari 2015, what agreed with each other about the last seven?", "Their counts", "Their letters", "Their maps"]
  },
  "In which nights did he ﷺ say to search?": {
    answer: "The last seven",
    harder: ["Bukhari 2015: in which nights should one search for the Night of Qadr?", "The first ten", "The middle ten", "Every Friday"],
    expert: ["The dreams agreed. Whoever seeks the Night should seek it in which nights?", "The last three", "The first seven", "The odd nights of Shawwal"],
    superHard: ["As-sab' al-awakhir: which nights are they?", "The first seven", "Seven nights of Sha'ban", "The seven days of a week"],
    extreme: ["Ibn Umar reported where to search, after the dreams. Where?", "The last twenty", "The first five", "The nights of Muharram"]
  },
  "He ﷺ said their dreams agreed.": {
    answer: "True",
    harder: "Bukhari 2015: he ﷺ said all their dreams agreed on the last seven nights.",
    expert: "Ibn Umar reported that the Companions' dreams matched on the last seven.",
    superHard: "He ﷺ told whoever seeks the Night of Qadr to look in the last seven, as the dreams agreed.",
    extreme: "In Bukhari 2015, the dreams of several men pointed to the same nights."
  },
  // Sahih Muslim 1119a.
  "What did those not fasting do at the stop?": {
    answer: "Pitched tents and watered the camels",
    harder: ["Muslim 1119a: on the hot day, what did those not fasting do?", "Slept all day", "Went ahead alone", "Went to hunt"],
    expert: ["The fasting ones fell down tired. What did the others do?", "Read Quran", "Prayed all day", "Dug a well"],
    superHard: ["Anas: those not fasting got up and did two jobs. Which?", "Cooked and sang", "Raced and wrestled", "Bought and sold"],
    extreme: ["In Muslim 1119a, the work that earned the reward was what?", "Leading the prayer", "Guarding the gold", "Writing letters"]
  },
  "Who took the reward that day, he ﷺ said?": {
    answer: "Those not fasting",
    harder: ["Muslim 1119a: who took away the reward on that hot day?", "Those fasting", "No one", "The guides only"],
    expert: ["He ﷺ said: they have taken away the reward today. Who?", "The riders in front", "The old men", "The children"],
    superHard: ["Al-muftirun: what did he ﷺ say they took today?", "Those who slept", "Those who left", "Those who complained"],
    extreme: ["Anas: after the fasters fell, he ﷺ praised which group for the reward?", "The scouts", "The poets", "The traders"]
  },
  "The day of that stop was cold.": {
    answer: "False",
    harder: "Muslim 1119a: they stopped on a cold day and lit fires.",
    expert: "Anas said the fasting ones grew tired from the cold of that day.",
    superHard: "No one needed shade at that stop, Anas reported.",
    extreme: "In Muslim 1119a, the travellers sheltered from rain, not from sun."
  },
  // Sahih al-Bukhari 2032.
  "Who asked about his old vow?": {
    answer: "Umar ibn al-Khattab",
    harder: ["Bukhari 2032: who vowed i'tikaf before Islam and asked him ﷺ?", "Abu Bakr", "Uthman", "Bilal"],
    expert: ["Ibn Umar told of his father's vow. Who was his father?", "Az-Zubayr", "Talhah", "Sa'd ibn Abi Waqqas"],
    superHard: ["Who vowed one night in Al-Masjid al-Haram in the time before Islam?", "Abu Sufyan", "Al-Abbas", "Hamzah"],
    extreme: ["In Bukhari 2032, the one told: fulfil your vow, was who?", "Ali", "Abu Ubaydah", "Khalid ibn al-Walid"]
  },
  "In which masjid was the vowed i'tikaf?": {
    answer: "Al-Masjid al-Haram",
    harder: ["Bukhari 2032: where did Umar vow one night of i'tikaf?", "Masjid an-Nabawi", "Masjid Quba", "Al-Aqsa"],
    expert: ["Umar vowed before Islam to stay one night in which masjid?", "A masjid in Taif", "Masjid al-Qiblatayn", "A masjid in Syria"],
    superHard: ["The masjid around the Kabah has a name. Umar's vow was there. Which?", "Masjid al-Khayf", "Masjid Namirah", "Masjid al-Jinn"],
    extreme: ["In Bukhari 2032, the one night of i'tikaf was vowed for where?", "Masjid ad-Dirar", "Masjid al-Ijabah", "The masjid of Banu Salimah"]
  },
  "He ﷺ told Umar to fulfil his vow.": {
    answer: "True",
    harder: "Bukhari 2032: he ﷺ told Umar: fulfil your vow.",
    expert: "Umar's vow from before Islam was to be kept, he ﷺ said.",
    superHard: "Ibn Umar reported that his father was told to keep his vow of one night of i'tikaf.",
    extreme: "In Bukhari 2032, a vow made before Islam was still to be fulfilled."
  },
  // Sahih Muslim 1099a.
  "Whom did Abu Atiyyah and Masruq ask?": {
    answer: "Aishah",
    harder: ["Muslim 1099a: whom did Abu Atiyyah and Masruq ask about breaking the fast early?", "Umm Salamah", "Hafsah", "Ibn Abbas"],
    expert: ["They said: Mother of the Believers, two Companions differ. Whom did they ask?", "Maymunah", "Zaynab", "Sawdah"],
    superHard: ["Who said: this is how the Messenger of Allah ﷺ did it?", "Umm Habibah", "Juwayriyah", "Safiyyah"],
    extreme: ["In Muslim 1099a, the answer about early iftar came from whom?", "Asma bint Abi Bakr", "Umm Sulaym", "Fatimah"]
  },
  "Who broke his fast early, they said?": {
    answer: "Abdullah ibn Mas'ud",
    harder: ["Muslim 1099a: which Companion broke his fast and prayed early?", "Abu Hurairah", "Anas ibn Malik", "Ibn Umar"],
    expert: ["Aishah asked: who hastens? They named whom?", "Salman", "Abu Dharr", "Ammar"],
    superHard: ["The one who did as he ﷺ did, in this hadith, was whom?", "Mu'adh", "Ubayy ibn Ka'b", "Zayd ibn Thabit"],
    extreme: ["Abu Atiyyah: Aishah praised the way of which Companion?", "Hudhayfah", "Abu Ayyub", "Jabir"]
  },
  "Aishah said breaking the fast early was his ﷺ way.": {
    answer: "True",
    harder: "Muslim 1099a: Aishah said: this is how the Messenger of Allah ﷺ did it.",
    expert: "Breaking the fast early and praying Maghrib early matched his ﷺ way, Aishah said.",
    superHard: "Aishah answered Abu Atiyyah and Masruq by naming the way of the Prophet ﷺ.",
    extreme: "In Muslim 1099a, Aishah said the early iftar of Ibn Mas'ud was the Sunnah."
  },
  // Sahih al-Bukhari 2021.
  "In which ten nights is the Night of Qadr sought?": {
    answer: "The last ten of Ramadan",
    harder: ["Bukhari 2021: in which ten nights did he ﷺ say to look for the Night of Qadr?", "The first ten of Ramadan", "The ten of Dhul-Hijjah", "The middle ten"],
    expert: ["Ibn Abbas: the nights with nine, seven or five left are in which ten?", "The first ten of Shawwal", "The ten of Muharram", "The ten before Ramadan"],
    superHard: ["Al-ashr al-awakhir: which nights are they?", "Ten nights of Rajab", "Ten nights of Sha'ban", "The first ten nights"],
    extreme: ["In Bukhari 2021, the counting of nights left is from which ten?", "The ten before Eid al-Adha", "The ten after Eid", "Ten nights of Safar"]
  },
  "Which numbers of nights left did he ﷺ name?": {
    answer: "Nine, seven or five",
    harder: ["Bukhari 2021: when how many nights remain should one seek the Night of Qadr?", "Ten, eight or six", "Three, two or one", "Twelve or eleven"],
    expert: ["Ibn Abbas: he ﷺ named three counts of nights left. Which?", "Four, six or eight", "Six, four or two", "Ten or twenty"],
    superHard: ["Tasi'ah, sabi'ah, khamisah: which numbers?", "Two, four, six", "Eight, six, four", "One, three, ten"],
    extreme: ["In Bukhari 2021, the nights to seek were named by what was left. How many?", "Twenty, ten or five", "Eight, four or two", "Six or three"]
  },
  "He ﷺ counted by the nights that remain.": {
    answer: "True",
    harder: "Bukhari 2021: he ﷺ said: when nine, seven or five nights remain.",
    expert: "Ibn Abbas reported that the Night of Qadr is sought by the nights left of the last ten.",
    superHard: "He ﷺ named nights by how many were left, not by their number from the start.",
    extreme: "In Bukhari 2021, the nights to seek were named by what remained of the last ten."
  }
};
