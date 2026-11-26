import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into the Hereafter" lessons (akhirahSahihaynUnits.ts): the lesson's own question is Easy,
 * then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const AKHIRAH_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 6591.
  "How wide is his ﷺ Pool, by this hadith?": {
    answer: "Like Madinah to San'a",
    harder: ["Bukhari 6591: the width of the Pool equals the distance between which places?", "Like one valley", "Like a small well", "Like Makkah to Mina"],
    expert: ["Harithah ibn Wahb heard the width of the Pool. What was it?", "Like Madinah to Quba", "Like Taif to Makkah", "Like Arafah to Mina"],
    superHard: ["Al-Hawd, by Harithah ibn Wahb: its width is like what?", "Like Jeddah to Makkah", "Like Uhud to Madinah", "Like Badr to Madinah"],
    extreme: ["In Bukhari 6591, the Pool reaches from Madinah to which city?", "Like Madinah to Damascus", "Like Madinah to Basrah", "Like Madinah to Cairo"]
  },
  "Where is San'a?": {
    answer: "In Yemen",
    harder: ["Bukhari 6591: San'a, named for the width of the Pool, is in which land?", "In Syria", "In Egypt", "In Iraq"],
    expert: ["Madinah to San'a: San'a is the capital of where?", "Of Oman", "Of Persia", "Of Abyssinia"],
    superHard: ["Harithah ibn Wahb named San'a. Which land is it in?", "In Najd", "In Bahrain", "In Sham"],
    extreme: ["In Bukhari 6591, the far end of the Pool is a city of which land?", "Of Rome", "Of India", "Of Khurasan"]
  },
  "Harithah ibn Wahb heard him ﷺ speak of the Pool.": {
    answer: "True",
    harder: "Bukhari 6591: Harithah ibn Wahb heard him ﷺ mention the Pool, al-Kawthar.",
    expert: "Harithah ibn Wahb reported hearing him ﷺ give the width of the Pool.",
    superHard: "The narrator who heard of the Pool from Madinah to San'a was Harithah ibn Wahb.",
    extreme: "In Bukhari 6591, Harithah ibn Wahb heard the Pool described by him ﷺ himself."
  },
  // Sahih al-Bukhari 6451.
  "What food was left on Aishah's shelf when he ﷺ passed away?": {
    answer: "Some barley",
    harder: ["Bukhari 6451: what was the only food on Aishah's shelf?", "Sacks of wheat", "Jars of honey", "Plenty of dates"],
    expert: ["Aishah said nothing a living being could eat was left but what?", "Some dried meat", "Some cheese", "Some olives"],
    superHard: ["Sha'ir fi raffi: what was on Aishah's shelf?", "Some rice", "Some flour", "Some butter"],
    extreme: ["In Bukhari 6451, the food left in his ﷺ house after he passed away was what?", "A whole sheep", "A bag of raisins", "A pot of soup"]
  },
  "What happened when Aishah measured the barley?": {
    answer: "It ran out",
    harder: ["Bukhari 6451: after Aishah measured the barley, what happened?", "It doubled", "It turned to gold", "It went bad"],
    expert: ["Aishah ate from the barley for a long time, then measured it. And then?", "It grew more", "It turned to wheat", "It filled the room"],
    superHard: ["Fa-kiltuhu fa-fani: what does this say happened?", "It kept going", "It was stolen", "It was given away"],
    extreme: ["In Bukhari 6451, measuring the barley was followed by what?", "A feast", "A new harvest", "A sale"]
  },
  "He ﷺ left great riches when he passed away.": {
    answer: "False",
    harder: "Bukhari 6451: he ﷺ left full stores of food when he passed away.",
    expert: "Aishah reported that her shelf was full of food after he ﷺ passed away.",
    superHard: "Raff Aishah, her shelf, held wheat, honey and meat when he ﷺ passed away.",
    extreme: "In Bukhari 6451, much wealth was left in his ﷺ house at his passing."
  },
  // Sahih Muslim 2948a.
  "What is worship in a time of turmoil like, he ﷺ said?": {
    answer: "Like hijrah to him ﷺ",
    harder: ["Muslim 2948a: worship in widespread turmoil is like what?", "Like a lost deed", "Like a small sin", "Like doing nothing"],
    expert: ["Ma'qil ibn Yasar: worship in al-harj equals what?", "Like a short nap", "Like one charity", "Like a fast of one day"],
    superHard: ["Al-ibadah fil-harj ka-hijratin ilayya: what is it like?", "Like a journey to Yemen", "Like a trade trip", "Like a visit to Taif"],
    extreme: ["In Muslim 2948a, the reward of worship in killing times is likened to what?", "Like building a house", "Like a family visit", "Like a market day"]
  },
  "What does al-harj mean here?": {
    answer: "Widespread killing and turmoil",
    harder: ["Muslim 2948a: the time of al-harj is a time of what?", "A big feast", "A long journey", "A rainy season"],
    expert: ["Ma'qil ibn Yasar: worship in al-harj. What is al-harj?", "Great wealth", "Deep sleep", "A cold winter"],
    superHard: ["Fil-harj: what kind of time does the hadith mean?", "A time of peace", "A time of harvest", "A time of travel"],
    extreme: ["In Muslim 2948a, the hard time named al-harj is what?", "A time of games", "A time of fasting", "A time of building"]
  },
  "Hard times are a reason to stop worshipping.": {
    answer: "False",
    harder: "Muslim 2948a: worship in times of turmoil brings no reward.",
    expert: "Ma'qil ibn Yasar reported that in al-harj worship should be left.",
    superHard: "Al-ibadah fil-harj is a lost deed, the hadith says.",
    extreme: "In Muslim 2948a, worship in the time of killing is worth less than at other times."
  },
  // Sahih Muslim 2903.
  "How far will the homes of Madinah spread, he ﷺ said?": {
    answer: "To Ihab or Yahab",
    harder: ["Muslim 2903: the homes of Madinah will reach which place?", "To Makkah", "To the sea", "To Syria"],
    expert: ["Abu Hurairah: the dwellings will reach Ihab or where?", "To Taif", "To Khaybar", "To Jeddah"],
    superHard: ["Tablughu al-masakin: where will the homes reach?", "To Tabuk", "To Yanbu", "To Badr"],
    extreme: ["In Muslim 2903, the two names for where Madinah's homes reach are what?", "To Uhud or Quba", "To Sal or Ayr", "To Rabigh or Juhfah"]
  },
  "What will reach Ihab or Yahab?": {
    answer: "The homes of Madinah",
    harder: ["Muslim 2903: what will spread out as far as Ihab or Yahab?", "The armies of Rome", "The rivers of Iraq", "The sands of Najd"],
    expert: ["Abu Hurairah: al-masakin will reach Ihab. What are al-masakin?", "The poor people", "The camels", "The palm trees"],
    superHard: ["Tablughu al-masakin Ihab: what reaches Ihab?", "The flood", "The traders", "The clouds"],
    extreme: ["In Muslim 2903, what grows out to Ihab or Yahab?", "The walls of Makkah", "The fields of Khaybar", "The tents of Mina"]
  },
  "The narrators asked how far Ihab was from Madinah.": {
    answer: "True",
    harder: "Muslim 2903: Zuhayr asked Suhayl how far Ihab and Yahab were from Madinah.",
    expert: "A narrator of Abu Hurairah's hadith asked how far Ihab was, and was told: so many miles.",
    superHard: "Kam dhalika minal-Madinah: so a narrator asked about Ihab.",
    extreme: "In Muslim 2903, the reply about Ihab was: so and so miles."
  },
  // Sahih Muslim 2906.
  "What will some women of Daus do before the Hour?": {
    answer: "Go around Dhul-Khalasah",
    harder: ["Muslim 2906: before the Hour, what will the women of Daus be seen doing?", "Build a masjid", "Move to Madinah", "Dig a well"],
    expert: ["Abu Hurairah: the Hour will not come until Daus women do what?", "Travel to Rome", "Make a market", "Leave Yemen"],
    superHard: ["Hawla Dhil-Khalasah: what will the women of Daus do there?", "Plant trees", "Sell cloth", "Fetch water"],
    extreme: ["In Muslim 2906, the sign of the Hour for the tribe of Daus is what?", "Winning a war", "Building a fort", "Finding gold"]
  },
  "What was Dhul-Khalasah?": {
    answer: "An idol house in Tabalah",
    harder: ["Muslim 2906: Dhul-Khalasah in Tabalah was what?", "A well in Makkah", "A market in Yemen", "A hill near Madinah"],
    expert: ["Daus used to worship there before Islam. What was Dhul-Khalasah?", "A palace of a king", "A school", "A fort"],
    superHard: ["Sanam bi-Tabalah: what was Dhul-Khalasah?", "A river", "A grave", "A farm"],
    extreme: ["In Muslim 2906, the place that Daus worshipped at in Tabalah was what?", "A cave of a prophet", "A tree of shade", "A spring of water"]
  },
  "This hadith warns that some will return to idols.": {
    answer: "True",
    harder: "Muslim 2906: some women of Daus will go back around the idol house of Dhul-Khalasah.",
    expert: "Abu Hurairah reported a sign of the Hour: a return to the old idol of Daus.",
    superHard: "The idol Daus worshipped in Tabalah will be visited again before the Hour.",
    extreme: "In Muslim 2906, idol worship at Dhul-Khalasah comes back before the Hour."
  },
  // Sahih al-Bukhari 6551.
  "How wide are a disbeliever's shoulders in the Fire?": {
    answer: "Three days of fast riding",
    harder: ["Bukhari 6551: the space between a disbeliever's shoulders in the Fire equals what?", "One arm's length", "One hour of walking", "Ten steps"],
    expert: ["Abu Hurairah: the shoulders of a kafir in the Fire are how far apart?", "One day of walking", "A spear's throw", "A mile"],
    superHard: ["Ma bayna mankibay al-kafir: how far is it?", "A week of sailing", "A month of walking", "A night of riding"],
    extreme: ["In Bukhari 6551, the width between his two shoulders is measured how?", "By a bird's flight of an hour", "By a camel's walk of a day", "By a ship's trip of a year"]
  },
  "Who covers that distance in three days?": {
    answer: "A fast rider",
    harder: ["Bukhari 6551: three days of whom gives the width of his shoulders?", "A slow walker", "A child", "A ship"],
    expert: ["Abu Hurairah: the width is what a certain traveller covers in three days. Who?", "A tired walker", "A loaded camel", "A shepherd"],
    superHard: ["Ar-rakib al-musri: who is he in this hadith?", "A merchant", "A guard", "A messenger on foot"],
    extreme: ["In Bukhari 6551, the three days are the journey of whom?", "An old man", "A herd of sheep", "A caravan at rest"]
  },
  "This hadith is about a believer in Paradise.": {
    answer: "False",
    harder: "Bukhari 6551: he ﷺ described the shoulders of a believer in Paradise.",
    expert: "Abu Hurairah reported the size of the people of Paradise in this hadith.",
    superHard: "Mankibay al-kafir here means the shoulders of a believer.",
    extreme: "In Bukhari 6551, the three-day width is the size of a believer in Paradise."
  },
  // Sahih al-Bukhari 6561.
  "Where is the ember placed on the least punished man?": {
    answer: "Under the arch of his feet",
    harder: ["Bukhari 6561: the least punished man in the Fire has an ember placed where?", "On his hand", "On his back", "On his head"],
    expert: ["An-Nu'man ibn Bashir: where is the smoldering ember placed?", "On his chest", "On his tongue", "In his hand"],
    superHard: ["Fi akhmas qadamayh: where is the ember?", "On his knees", "On his shoulders", "On his ears"],
    extreme: ["In Bukhari 6561, the lightest punishment touches which part of the body?", "The fingertips", "The forehead", "The neck"]
  },
  "What happens to his brain from that ember?": {
    answer: "It boils",
    harder: ["Bukhari 6561: what does the ember under his feet do to his brain?", "Nothing", "It cools", "It sleeps"],
    expert: ["An-Nu'man: so that his brain does what, from the ember?", "Rests", "Forgets", "Freezes"],
    superHard: ["Yaghli minha dimaghuh: what does his brain do?", "It shrinks", "It heals", "It dreams"],
    extreme: ["In Bukhari 6561, the ember under the feet reaches the brain and does what?", "Makes it calm", "Makes it strong", "Makes it light"]
  },
  "The lightest punishment in the Fire is still terrible.": {
    answer: "True",
    harder: "Bukhari 6561: the least punished man still has a smoldering ember under his feet.",
    expert: "An-Nu'man ibn Bashir reported that the lightest punishment makes the brain boil.",
    superHard: "Ahwanu ahl an-nar adhaban: even he has an ember under his feet.",
    extreme: "In Bukhari 6561, the lightest punishment on the Day of Resurrection still boils the brain."
  }
};
