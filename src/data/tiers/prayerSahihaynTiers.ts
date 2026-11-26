import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into prayer" lessons (prayerSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const PRAYER_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 1203.
  "If something happens in prayer, what do men say?": {
    answer: "Subhan Allah",
    harder: ["Bukhari 1203: to tell the imam of a mistake, what is for men?", "Allahu Akbar", "Al-hamdu lillah", "La ilaha illallah"],
    expert: ["Clapping is for women. What did he ﷺ say is for men in the same case?", "Coughing aloud", "Allahu Akbar", "Amin"],
    superHard: ["A man in the row sees the imam forget. Which words did he ﷺ give men for that?", "Astaghfirullah", "Allahu Akbar", "Bismillah"],
    extreme: ["Abu Hurairah's hadith pairs clapping for women with which saying for men?", "Al-hamdu lillah", "Hasbunallah", "La hawla wa la quwwata illa billah"]
  },
  "What do women do instead to tell the imam?": {
    answer: "Clap their hands",
    harder: ["Bukhari 1203: men say Subhan Allah. What is for women?", "Say Allahu Akbar", "Cough lightly", "Tap the woman beside them"],
    expert: ["If the imam slips, how does a woman praying behind him let him know?", "Say Subhan Allah aloud", "Step out of the row", "Wait until the prayer ends"],
    superHard: ["Abu Hurairah's hadith gives men a saying. What does it give women?", "A longer saying", "Raising one hand", "Saying Amin aloud"],
    extreme: ["In the hadith on alerting the imam, tasfiq is for women. What is tasfiq?", "Whispering", "Nodding", "Pointing with a finger"]
  },
  "Saying Subhan Allah in prayer can let the imam know something happened.": {
    answer: "True",
    harder: "Bukhari 1203: men tell the imam of something in prayer by saying Subhan Allah.",
    expert: "Subhan Allah is what a man behind the imam says when something happens in the prayer.",
    superHard: "When something happens in prayer, he ﷺ gave men a saying and women a clap to alert the imam.",
    extreme: "In Abu Hurairah's hadith, men's Subhan Allah and women's clapping both serve to alert the imam."
  },
  // Sahih al-Bukhari 651.
  "Who gets the greatest reward for the prayer, he ﷺ said?": {
    answer: "Those who come from farthest",
    harder: ["Bukhari 651: whose walk to the prayer brings the most reward?", "Those who come earliest", "Those who live next door", "Those who come by camel"],
    expert: ["The next farthest come second in reward. Who comes first?", "Those who pray at home", "Those who come together", "Those who live nearest"],
    superHard: ["Abu Musa: tremendous reward for the prayer goes first to whom?", "The imam of the mosque", "The one who calls the adhan", "Those in the first row"],
    extreme: ["In Abu Musa's hadith, how does the reward for prayer rank people?", "By how early they wake", "By how loud they say Amin", "By how much they give"]
  },
  "Who has more reward than one who prays and sleeps?": {
    answer: "One who waits to pray with the imam",
    harder: ["Bukhari 651: who is better than one who prays alone and goes to bed?", "One who prays before the adhan", "One who prays alone at home", "One who leaves early"],
    expert: ["One prays early and sleeps. Another waits. Which has more reward, Abu Musa said?", "One who prays in his shop", "One who prays twice alone", "One who reads instead"],
    superHard: ["Abu Musa's hadith: the second thing that brings greater reward is what?", "Praying in new clothes", "Walking barefoot", "Bringing a friend"],
    extreme: ["After the long walk, which second deed in Bukhari 651 gets greater reward?", "Leading the prayer", "Calling the iqamah", "Sitting in the last row"]
  },
  "The reward is the same however far one walks.": {
    answer: "False",
    harder: "Bukhari 651: those near and far from the mosque get the same reward for prayer.",
    expert: "Abu Musa said the reward does not change with the distance walked to prayer.",
    superHard: "In Abu Musa's hadith, the nearest to the mosque get the greatest reward.",
    extreme: "Bukhari 651 ranks the reward of prayer by how near one lives, nearest first."
  },
  // Sahih al-Bukhari 442.
  "How many men of the Suffah did Abu Hurairah see?": {
    answer: "Seventy",
    harder: ["Bukhari 442: how many men of the Suffah had no upper garment?", "Seven", "Forty", "Twelve"],
    expert: ["Abu Hurairah counted men of the Suffah with only a lower wrap. How many?", "Three hundred", "Ten", "One hundred"],
    superHard: ["How many people of the Suffah, each with no rida, did Abu Hurairah see?", "Thirty", "Eighty", "Twenty"],
    extreme: ["The men held their sheets with their hands. How many did Abu Hurairah count?", "Seventeen", "Sixty", "Ninety"]
  },
  "What did none of them have?": {
    answer: "An upper garment",
    harder: ["Bukhari 442: what did none of the seventy men of the Suffah own?", "A lower wrap", "Shoes", "A place to sleep"],
    expert: ["They had only a lower wrap or a sheet. What was missing?", "A belt", "A place to pray", "A turban"],
    superHard: ["Abu Hurairah said none of them had a rida. What is a rida?", "A pair of sandals", "A prayer mat", "A cap"],
    extreme: ["They tied sheets round their necks because they lacked what?", "A water skin", "A bag", "A walking stick"]
  },
  "They held their sheets with their hands so they stayed covered.": {
    answer: "True",
    harder: "Bukhari 442: the men of the Suffah gathered their sheets with their hands so as not to be uncovered.",
    expert: "Some of their sheets reached only mid-leg, so they held them with their hands.",
    superHard: "Abu Hurairah said they gathered their sheets in their hands lest they become uncovered.",
    extreme: "With no upper garment, the seventy kept their sheets closed by hand, Abu Hurairah said."
  },
  // Sahih al-Bukhari 670.
  "What did the man of the Ansar spread out for him ﷺ?": {
    answer: "A mat",
    harder: ["Bukhari 670: what did the man who could not come spread out for him ﷺ?", "A carpet of silk", "His cloak", "A sheepskin"],
    expert: ["He washed one side of it with water. What was it?", "A cloth", "A reed basket", "A leather sheet"],
    superHard: ["Anas: after the meal, on what did he ﷺ pray two rak'ahs?", "A rug from Yemen", "A cushion", "A stone floor"],
    extreme: ["The heavy man of the Ansar prepared his home. What did he lay out to pray on?", "A blanket", "Palm leaves", "Sand from the mosque"]
  },
  "How many rak'ahs did he ﷺ pray on it?": {
    answer: "Two",
    harder: ["Bukhari 670: on the washed mat, how many rak'ahs did he ﷺ pray?", "Four", "Three", "One"],
    expert: ["In the house of the man who could not come, how many rak'ahs did he ﷺ pray?", "Six", "Eight", "Ten"],
    superHard: ["Anas told of a meal and a mat. How many rak'ahs followed?", "Five", "Seven", "Twelve"],
    extreme: ["The prayer he ﷺ made in the heavy man's home was how many rak'ahs?", "Nine", "Eleven", "Thirteen"]
  },
  "The man said he could not pray with him ﷺ in the mosque.": {
    answer: "True",
    harder: "Bukhari 670: a man of the Ansar told him ﷺ: I cannot pray with you.",
    expert: "The man who prepared the meal had said he was unable to join him ﷺ in prayer.",
    superHard: "Anas said the heavy man told him ﷺ he could not come to pray with him.",
    extreme: "Before the meal and the mat, the man of the Ansar said: I cannot pray with you."
  },
  // Sahih al-Bukhari 1176.
  "How many rak'ahs did he ﷺ pray in Umm Hani's house?": {
    answer: "Eight",
    harder: ["Bukhari 1176: on the day of the conquest, how many rak'ahs in Umm Hani's house?", "Two", "Four", "Twelve"],
    expert: ["After washing in Umm Hani's house, how many rak'ahs did he ﷺ pray?", "Six", "Ten", "Three"],
    superHard: ["Umm Hani saw a light prayer on the day Makkah was opened. How many rak'ahs?", "Five", "Seven", "Eleven"],
    extreme: ["Abdur-Rahman ibn Abi Layla heard of it only from Umm Hani. How many rak'ahs?", "Nine", "Sixteen", "Twenty"]
  },
  "On what day was this?": {
    answer: "The day Makkah was opened",
    harder: ["Bukhari 1176: when did he ﷺ pray eight rak'ahs in Umm Hani's house?", "The day of Badr", "The day of Arafah", "The first Friday in Madinah"],
    expert: ["Umm Hani's story of the light prayer happened on which day?", "The day of Uhud", "The day of the Hijrah", "The Day of Eid"],
    superHard: ["On which day did he ﷺ come into Umm Hani's house and wash?", "The day of Khaybar", "The day of Hunayn", "The day of the Trench"],
    extreme: ["Umm Hani linked the eight light rak'ahs to which great day?", "The day of Tabuk", "The day of Hudaybiyah", "The farewell Hajj"]
  },
  "That prayer was light, yet he ﷺ did the bowing and prostrations in full.": {
    answer: "True",
    harder: "Bukhari 1176: the eight rak'ahs were light, yet he ﷺ bowed and prostrated perfectly.",
    expert: "Umm Hani never saw a lighter prayer from him ﷺ, yet his bowing and prostrations were complete.",
    superHard: "Umm Hani said the prayer was very light but nothing was missing from its bowing and prostrations.",
    extreme: "In Umm Hani's house the rak'ahs were short, but the ruku and sujud were done perfectly."
  },
  // Sahih al-Bukhari 1201.
  "Why was he ﷺ late for that prayer?": {
    answer: "He went to make peace between people",
    harder: ["Bukhari 1201: why was he ﷺ away when Abu Bakr led the prayer?", "He was ill", "He was on a journey", "He was teaching the Quran"],
    expert: ["He ﷺ was with Banu Amr ibn Awf when the prayer time came. Why?", "To attend a wedding", "To visit a grave", "To buy a camel"],
    superHard: ["Sahl said Bilal told Abu Bakr he ﷺ was held up. What held him?", "A funeral", "A long sermon", "Rain on the road"],
    extreme: ["What task among the clans of Banu Amr ibn Awf kept him ﷺ from the start of that prayer?", "Gathering zakat", "Building a mosque", "Choosing a leader"]
  },
  "What did Abu Bakr do when he ﷺ waved him to stay?": {
    answer: "Praised Allah and stepped back",
    harder: ["Bukhari 1201: waved to stay in his place, what did Abu Bakr do?", "Kept leading the prayer", "Left the mosque", "Sat down in his place"],
    expert: ["Abu Bakr raised both hands. What did he then do?", "Said Allahu Akbar and bowed", "Turned to the people", "Ended the prayer"],
    superHard: ["He ﷺ went forward and led. What had Abu Bakr just done?", "Asked Bilal to lead", "Waited until the end", "Moved to the last row"],
    extreme: ["Sahl said Abu Bakr did two things before he ﷺ took his place. What were they?", "Clapped and sat", "Cried and left", "Spoke and bowed"]
  },
  "Abu Bakr used to look around a lot while praying.": {
    answer: "False",
    harder: "Bukhari 1201: Abu Bakr often looked this way and that in prayer.",
    expert: "Sahl said Abu Bakr turned at the first clap because he always looked around in prayer.",
    superHard: "Abu Bakr looked back at once, as he was used to glancing around during prayer.",
    extreme: "In Sahl's hadith, Abu Bakr was known for looking about while he prayed."
  },
  // Sahih Muslim 468a.
  "Where did he ﷺ put his hand after Uthman said he felt something?": {
    answer: "On his chest, then his back",
    harder: ["Muslim 468a: Uthman ibn Abi al-As felt unsure. Where did he ﷺ put his hand?", "On his head", "On his shoulder only", "On his hand"],
    expert: ["He ﷺ sat Uthman in front of him, then had him turn. Where did his hand go?", "On his forehead, then his ears", "On his knees", "On his feet"],
    superHard: ["Before saying lead your people a second time, where did he ﷺ put his hand on Uthman?", "On his throat", "On his right arm", "On his eyes"],
    extreme: ["Uthman spoke of between my nipples, then between my shoulders. Where was his ﷺ hand?", "On his head, then his hands", "On his knees, then his feet", "On his arm, then his neck"]
  },
  "Who did he ﷺ name as reasons to keep it short?": {
    answer: "The old, the sick, the weak and the busy",
    harder: ["Muslim 468a: why must the imam be brief?", "Only the children", "Travellers and guests", "Those who came late"],
    expert: ["He ﷺ told Uthman ibn Abi al-As who prays behind an imam. Who?", "Only the scholars", "Only the young men", "The rich and the poor"],
    superHard: ["Muslim 468a lists four kinds of people behind the imam. Which four?", "The rich, the poor, the young, the old", "Men, women, boys and girls", "Guests, neighbours, family and friends"],
    extreme: ["Which people did he ﷺ name to Uthman ibn Abi al-As as the reason to be brief?", "The poor, the orphan, the widow and the traveller", "The farmers, the traders, the soldiers and the scholars", "The deaf, the blind, the lame and the young"]
  },
  "When praying alone, one may make the prayer as long as one likes.": {
    answer: "True",
    harder: "Muslim 468a: when one prays alone, he may pray as he likes.",
    expert: "He ﷺ told Uthman that the imam must be brief, but one praying alone may go as long as he wants.",
    superHard: "The short prayer is for the imam; Muslim 468a lets one praying alone lengthen it.",
    extreme: "After the hand on the chest and back, he ﷺ said one praying alone may pray as he likes."
  }
};
