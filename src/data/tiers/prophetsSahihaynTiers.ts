import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "The Prophets in more depth" lessons (prophetsSahihaynUnits.ts): the lesson's own question is
 * Easy, then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps
 * the question's answer and its hadith; a true/false version keeps the same truth.
 */
export const PROPHETS_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 3359.
  "Which creature blew on the fire of Ibrahim?": {
    answer: "The gecko",
    harder: ["Bukhari 3359: which creature blew on Ibrahim's fire?", "The dove", "The spider", "The ant"],
    expert: ["Umm Sharik: he ﷺ said which creature blew the fire on Ibrahim?", "The crow", "The hoopoe", "The frog"],
    superHard: ["Al-wazagh: what creature is meant?", "The lizard of the desert", "The bee", "The snake"],
    extreme: ["In Bukhari 3359, the creature he ﷺ ordered killed is which?", "The scorpion", "The mouse", "The kite"]
  },
  "On whose fire did the gecko blow?": {
    answer: "Ibrahim's",
    harder: ["Bukhari 3359: the gecko blew on the fire of which prophet?", "Musa's", "Nuh's", "Yusuf's"],
    expert: ["Umm Sharik: it blew the fire on whom?", "Lut's", "Hud's", "Salih's"],
    superHard: ["Kana yanfukhu ala ...: on which prophet's fire?", "Isa's", "Yunus's", "Dawud's"],
    extreme: ["In Bukhari 3359, the fire the gecko blew on was lit for whom?", "Shu'ayb's", "Ayyub's", "Ishaq's"]
  },
  "He ﷺ ordered that the gecko be killed.": {
    answer: "True",
    harder: "Bukhari 3359: he ﷺ ordered that geckos be killed.",
    expert: "Umm Sharik reported that he ﷺ commanded the gecko to be killed.",
    superHard: "Amara bi-qatl al-wazagh: so he ﷺ ordered.",
    extreme: "In Bukhari 3359, the order to kill the gecko came with the reason of Ibrahim's fire."
  },
  // Sahih Muslim 2374b.
  "Between whom did he ﷺ say not to make distinctions?": {
    answer: "The prophets",
    harder: ["Muslim 2374b: he ﷺ said not to make distinctions between whom?", "The angels", "The masjids", "The tribes"],
    expert: ["Abu Sa'id: do not make distinctions between whom?", "The Companions", "The scholars", "The cities"],
    superHard: ["La tukhayyiru bayna al-anbiya': between whom?", "The kings", "The months", "The four imams"],
    extreme: ["In Muslim 2374b, the ones not to be set apart from each other are who?", "The martyrs", "The rich and poor", "The Muhajirun and Ansar"]
  },
  "Who told this saying of his ﷺ?": {
    answer: "Abu Sa'id al-Khudri",
    harder: ["Muslim 2374b: who reported, do not make distinctions between the prophets?", "Abu Hurairah", "Anas ibn Malik", "Ibn Abbas"],
    expert: ["Which Companion narrated: do not rank the prophets?", "Abu Musa", "Jabir", "Aishah"],
    superHard: ["Al-Khudri: what was his kunyah?", "Abu Bakr", "Abu Dharr", "Abu Talhah"],
    extreme: ["In Muslim 2374b, the narrator named Sa'd ibn Malik is better known as who?", "Sa'd ibn Abi Waqqas", "Malik ibn Anas", "Sa'id ibn Zaid"]
  },
  "Muslim says it came through more than one chain.": {
    answer: "True",
    harder: "Muslim 2374b: Muslim notes another chain for this saying.",
    expert: "After the words, Muslim says it was also narrated by another chain.",
    superHard: "Isnad akhar: Muslim names another chain for it.",
    extreme: "In Muslim 2374b, the saying about the prophets has more than one chain of narrators."
  },
  // Sahih al-Bukhari 3396.
  "How did he ﷺ describe Musa?": {
    answer: "Brown and tall",
    harder: ["Bukhari 3396: how did he ﷺ describe Musa on the Ascension night?", "Short and fair", "Bald and old", "Small and thin"],
    expert: ["Ibn Abbas: Musa was like a man of Shanu'ah. How?", "Pale and short", "Red and stout", "White-haired and bent"],
    superHard: ["Adam, tuwal: what two words describe Musa?", "Fair, short", "Thin, small", "Grey, old"],
    extreme: ["In Bukhari 3396, as if from Shanu'ah describes Musa as what?", "Curly-haired, middle height", "Fair, round-faced", "Short, broad-chested"]
  },
  "How did he ﷺ describe Isa?": {
    answer: "Curly-haired, of moderate height",
    harder: ["Bukhari 3396: how did he ﷺ describe Isa?", "Very tall, straight-haired", "Bald and short", "Grey-haired and bent"],
    expert: ["Ibn Abbas: Isa was described how?", "Brown and very tall", "Thin and old", "Fair and bald"],
    superHard: ["Ja'd marbu': what does it say of Isa?", "Straight-haired, very short", "Long-bearded, tall", "Grey and stooped"],
    extreme: ["In Bukhari 3396, after Musa the tall, Isa is described how?", "Tall like Musa", "Short and bald", "Old and grey-bearded"]
  },
  "He ﷺ also mentioned Malik, the keeper of the Fire.": {
    answer: "True",
    harder: "Bukhari 3396: he ﷺ also mentioned Malik, keeper of the Fire.",
    expert: "Ibn Abbas said he ﷺ spoke of Malik, the gate-keeper of the Fire.",
    superHard: "Khazin an-nar: Malik was mentioned with the Dajjal.",
    extreme: "In Bukhari 3396, after Musa and Isa, he ﷺ mentioned Malik and the Dajjal."
  },
  // Sahih Muslim 2375a.
  "What was Musa doing when he ﷺ passed by?": {
    answer: "Praying in his grave",
    harder: ["Muslim 2375a: what was Musa doing on the Night Journey?", "Sleeping", "Reading the Tawrah", "Walking to Egypt"],
    expert: ["Anas: he ﷺ passed Musa at the red mound. Doing what?", "Weeping", "Teaching people", "Sitting silent"],
    superHard: ["Qa'imun yusalli fi qabrih: what was Musa doing?", "Making du'a on a hill", "Fasting in the desert", "Calling the adhan"],
    extreme: ["In Muslim 2375a, at the red mound, Musa was seen doing what?", "Building a house", "Writing tablets", "Herding sheep"]
  },
  "Near what place was Musa's grave?": {
    answer: "The red mound",
    harder: ["Muslim 2375a: Musa's grave was near what place?", "Mount Uhud", "The well of Zamzam", "The river Nile"],
    expert: ["Anas: he ﷺ passed Musa near what?", "The white rock", "The green valley", "The black stone"],
    superHard: ["Al-kathib al-ahmar: what does it mean?", "The red sea", "The red tent", "The red city"],
    extreme: ["In Muslim 2375a, the place of Musa's prayer in his grave was where?", "Mount Sinai's top", "The Masjid al-Aqsa", "Madinah"]
  },
  "He ﷺ passed by Musa on the Night Journey.": {
    answer: "True",
    harder: "Muslim 2375a: on the Night Journey he ﷺ passed by Musa.",
    expert: "Anas reported he ﷺ saw Musa praying on the night of the Isra'.",
    superHard: "Laylata usriya bi: so he ﷺ passed Musa.",
    extreme: "In Muslim 2375a, Musa at the red mound was seen on the Night Journey."
  },
  // Sahih al-Bukhari 3398.
  "Who did he ﷺ say will be first to regain consciousness?": {
    answer: "He himself ﷺ",
    harder: ["Bukhari 3398: who will be first to wake, he ﷺ said?", "Musa", "Ibrahim", "Isa"],
    expert: ["Abu Sa'id: when people faint on that Day, who wakes first?", "Adam", "Nuh", "Jibril"],
    superHard: ["Ana awwalu man yufiq: who is first?", "The angels", "The martyrs", "The people of Badr"],
    extreme: ["In Bukhari 3398, before seeing Musa at the Throne, who woke first?", "Yusuf", "Harun", "Dawud"]
  },
  "What will Musa be holding?": {
    answer: "A pillar of Allah's Throne",
    harder: ["Bukhari 3398: what will Musa be holding on that Day?", "His staff", "The Tawrah", "A lamp"],
    expert: ["Abu Sa'id: he ﷺ will see Musa holding what?", "A banner", "A book", "A sword"],
    superHard: ["Qa'imah min qawa'im al-Arsh: what is Musa holding?", "The gate of Paradise", "A branch of a tree", "His brother's hand"],
    extreme: ["In Bukhari 3398, Musa is seen awake beside what?", "The Basin", "The Bridge", "The Scale"]
  },
  "He ﷺ wondered if Musa was spared for his fainting at At-Tur.": {
    answer: "True",
    harder: "Bukhari 3398: he ﷺ wondered if Musa was spared because he fainted at At-Tur.",
    expert: "Abu Sa'id reported him ﷺ wondering whether Musa woke first or was spared.",
    superHard: "Jaziya bi-sa'qat at-Tur: so he ﷺ wondered about Musa.",
    extreme: "In Bukhari 3398, his fainting at the mountain is given as one reason Musa may be spared."
  },
  // Sahih al-Bukhari 3350.
  "Whom will Ibrahim meet on the Day of Resurrection?": {
    answer: "His father Azar",
    harder: ["Bukhari 3350: whom will Ibrahim meet on the Day of Resurrection?", "His son Isma'il", "Pharaoh", "Namrud"],
    expert: ["Abu Hurairah: on that Day, Ibrahim meets whom, his face dark with dust?", "His uncle", "His people's king", "His brother"],
    superHard: ["Yalqa Ibrahimu abahu: who is it?", "Lut", "Sarah's father", "His grandfather"],
    extreme: ["In Bukhari 3350, the one who says, today I will not disobey you, is who?", "Ibrahim's son", "Namrud's minister", "Lut's father"]
  },
  "What will Allah say to Ibrahim about Paradise?": {
    answer: "It is forbidden to the disbelievers",
    harder: ["Bukhari 3350: what will Allah tell Ibrahim about Paradise?", "It is open to all", "It is for his father", "It is far away"],
    expert: ["Abu Hurairah: Ibrahim asks not to be disgraced. What does Allah say?", "Paradise is for Azar too", "Paradise will wait", "Paradise is only for prophets"],
    superHard: ["Harramtu al-jannata ala al-kafirin: what does it say?", "Paradise is for all families", "Paradise is closed today", "Paradise is far"],
    extreme: ["In Bukhari 3350, the answer to Ibrahim's plea about his father is what?", "Azar is forgiven", "Azar will wait at the gate", "Azar may enter later"]
  },
  "Azar will say: today I will not disobey you.": {
    answer: "True",
    harder: "Bukhari 3350: Azar will tell Ibrahim: today I will not disobey you.",
    expert: "Abu Hurairah reported that Ibrahim's father will say he will not disobey him that Day.",
    superHard: "Fal-yawma la a'sik: so Azar will say.",
    extreme: "In Bukhari 3350, after Ibrahim asks, did I not tell you, his father says he will not disobey."
  }
};
