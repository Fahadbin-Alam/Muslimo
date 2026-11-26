import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper with the Companions" lessons (sahabaSahihaynUnits.ts): the lesson's own question is
 * Easy, then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps
 * the question's answer and its hadith; a true/false version keeps the same truth.
 */
export const SAHABAH_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 3762.
  "Who did Hudhayfah say was most like him ﷺ in conduct?": {
    answer: "Ibn Mas'ud",
    harder: ["Bukhari 3762: asked for a man most like him ﷺ in manner and way, whom did Hudhayfah name?", "Ibn Umar", "Abu Musa", "Salman"],
    expert: ["Hudhayfah named Ibn Umm Abd as closest to him ﷺ in conduct. Who is that?", "Ibn Abbas", "Ibn Umar", "Abu Hurairah"],
    superHard: ["Abdur-Rahman ibn Yazid wanted a man to copy in good ways. Who did Hudhayfah point him to?", "Abu ad-Darda", "Mu'adh ibn Jabal", "Ubayy ibn Ka'b"],
    extreme: ["None was closer to him ﷺ in appearance and conduct, Hudhayfah said, than whom?", "Ammar ibn Yasir", "Abu Dharr", "Hudhayfah himself"]
  },
  "Why did they ask Hudhayfah about such a man?": {
    answer: "To learn good ways from him",
    harder: ["What did Abdur-Rahman ibn Yazid's group want from a man most like him ﷺ?", "To learn Arabic from him", "To make him their leader", "To pray behind him"],
    expert: ["Bukhari 3762: they asked about the man whose way was closest to his ﷺ. Why?", "To ask him for a du'a", "To travel with him", "To write down his words"],
    superHard: ["Seeking someone like him ﷺ in looks and conduct, what did the askers hope for?", "To hear his stories of Badr", "To ask him about dreams", "To give him gifts"],
    extreme: ["They wanted a man close to him ﷺ in appearance and behaviour. What was their aim?", "To learn the Quran by heart", "To learn to read and write", "To learn the battles by heart"]
  },
  "Hudhayfah said many men were just as close to him ﷺ in conduct.": {
    answer: "False",
    harder: "Hudhayfah named several Companions as equally like him ﷺ in conduct.",
    expert: "Bukhari 3762: Hudhayfah said he knew others closer to him ﷺ in conduct than Ibn Umm Abd.",
    superHard: "Asked for a man like him ﷺ, Hudhayfah said he could not name anyone.",
    extreme: "Hudhayfah said Ibn Umm Abd was like him ﷺ in looks only, not in conduct."
  },

  // Sahih al-Bukhari 3909.
  "Where did Asma give birth to Abdullah ibn az-Zubayr?": {
    answer: "At Quba",
    harder: ["Bukhari 3909: Asma made the Hijrah when her baby was due. Where was he born?", "In Makkah", "At the cave of Thawr", "In Abyssinia"],
    expert: ["Where did Asma stop on her Hijrah and give birth?", "At Badr", "At al-Arj", "At Dhul-Hulayfah"],
    superHard: ["Where was the first baby of the Muhajirun born, as his mother told it?", "At Uhud", "At al-Aqiq", "At Dhul-Hulayfah"],
    extreme: ["Asma was at full term when she left. Where did she alight and give birth?", "At Khaybar", "At al-Arj", "At Tabuk"]
  },
  "What did he ﷺ chew and give the baby?": {
    answer: "A date",
    harder: ["Bukhari 3909: what did he ﷺ ask for, chew and put in the baby's mouth?", "A piece of bread", "A fig", "Some honeycomb"],
    expert: ["What did he ﷺ also rub the baby's palate with?", "A siwak", "A fig", "A drop of honey"],
    superHard: ["Before asking Allah to bless Abdullah, what did he ﷺ chew for him?", "Some barley", "A fig", "A raisin"],
    extreme: ["The first thing in the baby's stomach came with what he ﷺ had chewed. What was it?", "A raisin", "A piece of bread", "Some barley"]
  },
  "Abdullah ibn az-Zubayr was the first child born to the Muhajirun in Madinah.": {
    answer: "True",
    harder: "Bukhari 3909: no child of the Muhajirun was born in Madinah before Asma's son.",
    expert: "Asma laid her newborn in his ﷺ lap, and he asked Allah to bless the child.",
    superHard: "Asma's son was born at Quba after she arrived on the Hijrah.",
    extreme: "He ﷺ chewed a date, put it in Abdullah's mouth and rubbed his palate with it."
  },

  // Sahih Muslim 2470.
  "When he ﷺ offered the sword again, what did he ask for?": {
    answer: "Someone to give it its right",
    harder: ["Muslim 2470: at Uhud, the second time he ﷺ held up the sword, what did he ask for?", "Someone to pay for it", "Someone to guard his tent", "Someone to sharpen it"],
    expert: ["Everyone reached for the sword at first. What did he ﷺ then ask for that made them stop?", "Someone to keep it at home", "Someone to carry it for him", "Someone to sharpen it"],
    superHard: ["What did he ﷺ want from the one who took his sword at Uhud?", "Someone to guard his tent", "Someone to pay for it", "Someone to hang it on a wall"],
    extreme: ["Anas said the hands drew back at his ﷺ second question. What did it ask for?", "Someone to pay for it", "Someone to sharpen it", "Someone to carry it for him"]
  },
  "Who took the sword to give it its right?": {
    answer: "Abu Dujana",
    harder: ["Muslim 2470: who took his ﷺ sword at Uhud to fulfil its right?", "Abu Talhah", "Sa'd ibn Abi Waqqas", "Mus'ab ibn Umayr"],
    expert: ["Simak ibn Kharashah took his ﷺ sword at Uhud. By what name is he known?", "Abu Talhah", "Abu Ayyub", "Abu Qatadah"],
    superHard: ["When the hands drew back, who said: I will take it and give it its right?", "Mus'ab ibn Umayr", "Sa'd ibn Mu'adh", "Hamzah"],
    extreme: ["Anas tells of one man who took the sword on its terms at Uhud. Who?", "Abu Ubaydah", "Abu Talhah", "Sa'd ibn Abi Waqqas"]
  },
  "When he ﷺ asked who would give it its right, the people held back.": {
    answer: "True",
    harder: "Muslim 2470: everyone first reached for the sword, then held back at his ﷺ second question.",
    expert: "At Uhud he ﷺ asked twice who would take his sword, and the second time hands drew back.",
    superHard: "Abu Dujana, Simak ibn Kharashah, took the sword after the others held back.",
    extreme: "The people withdrew their hands once he ﷺ asked for one to fulfil the sword's right."
  },

  // Sahih Muslim 2504.
  "Who did he ﷺ say Abu Bakr may have upset?": {
    answer: "Salman, Suhayb and Bilal",
    harder: ["Muslim 2504: Abu Bakr spoke up for Abu Sufyan. Whom did he ﷺ say he may have upset?", "Abu Sufyan and his men", "Ammar, Khabbab and Bilal", "Salman, Ammar and Suhayb"],
    expert: ["Who had spoken hard words when Abu Sufyan came by them?", "Ammar, Khabbab and Bilal", "Umar and Uthman", "The chiefs of Quraysh"],
    superHard: ["Abu Bakr asked: do you say this to the chief of Quraysh? To whom?", "Abu Sufyan and his men", "Ammar, Khabbab and Bilal", "Khalid and Amr"],
    extreme: ["A'idh ibn Amr names the three Abu Bakr went back to. Who were they?", "Ammar, Khabbab and Suhayb", "Bilal, Ammar and Salman", "Abu Dharr, Salman and Bilal"]
  },
  "If Abu Bakr upset the three, who else had he upset, he ﷺ said?": {
    answer: "His Lord, Allah",
    harder: ["Muslim 2504: upsetting the three would mean Abu Bakr upset whom else?", "Only himself", "Abu Sufyan", "The Muslims of Madinah"],
    expert: ["Why did Abu Bakr hurry back to the three? Upsetting them upset whom?", "The Ansar", "Abu Sufyan", "Only himself"],
    superHard: ["He ﷺ warned Abu Bakr that annoying these three Companions means annoying whom?", "The chiefs of Quraysh", "His own family", "The people of Makkah"],
    extreme: ["In A'idh ibn Amr's report, whose anger did he ﷺ tie to the anger of the three?", "Abu Sufyan's", "The Ansar's", "Umar's"]
  },
  "The three told Abu Bakr: no, our brother, may Allah forgive you.": {
    answer: "True",
    harder: "Muslim 2504: Abu Bakr asked the three if he had upset them, and they forgave him.",
    expert: "Abu Bakr called Salman, Suhayb and Bilal my brothers when he came back to them.",
    superHard: "Abu Bakr went back to the three himself after he ﷺ spoke to him.",
    extreme: "They answered Abu Bakr with our brother and a du'a for his forgiveness."
  },

  // Sahih Muslim 2461a.
  "Who was Abu al-Ahwas with when Ibn Mas'ud died?": {
    answer: "Abu Musa and Abu Mas'ud",
    harder: ["Muslim 2461a: which two Companions were together as Ibn Mas'ud died?", "Abu Musa and Abu Hurairah", "Hudhayfah and Salman", "Abu Dharr and Ammar"],
    expert: ["As Ibn Mas'ud died, two men asked each other: is any like him? Who?", "Abu Mas'ud and Ubayy", "Abu Musa and Mu'adh", "Hudhayfah and Ammar"],
    superHard: ["Two men with close names spoke of Ibn Mas'ud at his death. Who were they?", "Abu Hurairah and Abu ad-Darda", "Ibn Umar and Ibn Abbas", "Abu Sa'id and Abu Musa"],
    extreme: ["Which pair was talking when one said: he was admitted when we were detained?", "Hudhayfah and Ammar", "Abu Hurairah and Anas", "Ibn Abbas and Ibn Umar"]
  },
  "What made Ibn Mas'ud stand out, one of them said?": {
    answer: "He was with him ﷺ when they were away",
    harder: ["Muslim 2461a: why could no one match Ibn Mas'ud, one of the two said?", "He was the oldest of them", "He had led the army", "He knew the most poetry"],
    expert: ["He was admitted when we were detained. What else was said of Ibn Mas'ud?", "He was the richest of them", "He fought in every battle", "He had the most children"],
    superHard: ["Abu Musa or Abu Mas'ud praised how close Ibn Mas'ud was. How?", "He lived beside the masjid", "He married into his ﷺ family", "He was his ﷺ cousin"],
    extreme: ["At Ibn Mas'ud's death, what did one say he had that they had missed?", "A share of the spoils", "Long years in Makkah", "A house near the Ka'bah"]
  },
  "Ibn Mas'ud was let in to him ﷺ when others were kept waiting.": {
    answer: "True",
    harder: "Muslim 2461a: one of the two said Ibn Mas'ud was admitted when they were detained.",
    expert: "Ibn Mas'ud was with him ﷺ at times when Abu Musa and Abu Mas'ud were absent.",
    superHard: "When one asked if anyone like Ibn Mas'ud was left, the other answered with a question.",
    extreme: "Abu al-Ahwas was with Abu Musa and Abu Mas'ud at the time Ibn Mas'ud died."
  },

  // Sahih al-Bukhari 3842.
  "How had the slave earned that food?": {
    answer: "By telling a man's fortune",
    harder: ["Bukhari 3842: the food Abu Bakr ate came from what work of his slave's?", "By selling dates", "By trading cloth", "By lending money"],
    expert: ["The slave was paid before Islam for what he admitted was a trick. How was he paid?", "By selling a lame camel", "By lending money", "By lying in court"],
    superHard: ["Aishah tells of food from her father's slave. How had he earned it?", "By herding camels", "By digging a well", "By guarding a garden"],
    extreme: ["The slave said he knew nothing of it and cheated the man. How had he earned it?", "By writing letters", "By selling a lame camel", "By lending money"]
  },
  "What did Abu Bakr do when he learned where it came from?": {
    answer: "Brought up all he had eaten",
    harder: ["Bukhari 3842: told the food came from fortune-telling, what did Abu Bakr do?", "Set the slave free", "Paid the man back", "Gave the rest in charity"],
    expert: ["What did Abu Bakr do with his hand in his mouth after the slave spoke?", "Cleaned his teeth", "Stopped himself speaking", "Hid a smile"],
    superHard: ["Aishah says her father ate from a slave's earnings. What did he do on learning the source?", "Sold the slave", "Fasted for three days", "Told no one at all"],
    extreme: ["Learning the food was earned by deceit, how did Abu Bakr get rid of it?", "Threw it to the animals", "Gave it away", "Buried it"]
  },
  "The slave said he truly knew how to tell the future.": {
    answer: "False",
    harder: "Bukhari 3842: the slave said his fortune-telling was real knowledge.",
    expert: "The slave earned that payment after Islam came.",
    superHard: "Abu Bakr knew where the food came from before he ate it.",
    extreme: "The slave told Abu Bakr where it came from before he ate, not after."
  },

  // Sahih al-Bukhari 3915.
  "What did Umar wish for the deeds done after him ﷺ?": {
    answer: "Just enough to save him",
    harder: ["Bukhari 3915: what did Umar hope for his deeds after the Prophet ﷺ died?", "Twice the reward of the rest", "To be known by all", "To be counted with Badr"],
    expert: ["Umar wished his deeds with him ﷺ to stay rewarded. And those after?", "To be counted twice", "To be kept secret", "To be the best of his life"],
    superHard: ["Ibn Umar told Abu Burdah his father's wish for his later deeds. What was it?", "To be counted with Badr", "To be written in a book", "To be known by all"],
    extreme: ["Umar wished the good after him ﷺ would make up for the bad. To what end?", "Twice the reward of the rest", "A high rank among them", "To be known by all"]
  },
  "Who said: your father was better than my father?": {
    answer: "Abu Burdah",
    harder: ["Bukhari 3915: who said to Ibn Umar that his father was better than his own?", "Abu Musa", "Abdullah ibn Umar", "Salim ibn Abdullah"],
    expert: ["Abu Musa's son heard his father compared with Umar. What was his name?", "Abu Bakrah", "Abu Salamah", "Abu Qatadah"],
    superHard: ["After hearing what Umar and Abu Musa said, who ranked Umar higher?", "Ibn Umar", "Abu Musa", "Nafi"],
    extreme: ["Who told this story, and judged between his own father and Umar?", "Abu Salamah", "Ibn Umar", "Nafi"]
  },
  "Abu Musa hoped for reward for the good done after him ﷺ.": {
    answer: "True",
    harder: "Bukhari 3915: Abu Musa said people embraced Islam at their hands after the Prophet ﷺ.",
    expert: "Abu Musa told Umar: no, by Allah, we strove, prayed and did much good after him ﷺ.",
    superHard: "Umar asked Abu Musa if he would be pleased to come out even on his later deeds.",
    extreme: "Abu Burdah judged that Umar was better than his own father, Abu Musa."
  }
};
