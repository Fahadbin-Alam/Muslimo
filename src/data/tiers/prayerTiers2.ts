import type { TierEntry } from "../questionTiers";

/**
 * Prayer: harder and expert ways to ask the same questions, batch 2 (unique prompts 124-274: rewards of prayer, extra
 * prayers, Jumu'ah, dhikr after salah, the sunnah of wudu, the adhan, night prayer, and the ease of the deen). Each
 * one keeps the question's answer and asks only what the lesson's own source says. Keyed by the question's English
 * prompt (see questionTiers.ts).
 */
export const PRAYER_TIERS_2: Record<string, TierEntry> = {
  // Tirmidhi 413.
  "Extra prayers can help fill what is lacking.": {
    answer: "True",
    harder: "Tirmidhi 413: if the fard prayers fall short, Allah says to look for the servant's voluntary prayers to complete them."
  },
  // Bukhari 647.
  "What does each step to the masjid do?": {
    answer: "Raises a level, wipes a sin",
    harder: ["Bukhari 647: he makes wudu well and walks out only for the prayer. What does each step bring?", "Adds a coin to his wealth", "Lengthens his life", "Counts as a fast"]
  },
  "Who prays for you while you sit after salah?": {
    answer: "The angels",
    harder: ["Bukhari 647: while he stays in his place of prayer, who keeps saying 'O Allah, have mercy on him'?", "The imam", "His family", "The people beside him"]
  },
  "Walking to the masjid only to pray matters.": {
    answer: "True",
    harder: "In Bukhari 647 the reward of the steps is for one who goes out with nothing but the prayer in mind."
  },
  // Bukhari 1887.
  "Where did Bani Salama want to move?": {
    answer: "Near the masjid",
    harder: ["Anas said Bani Salama wanted to leave their homes. To go where?", "To a farm outside", "Near the wells", "To Taif"]
  },
  "What did he ﷺ say Bani Salama are rewarded for?": {
    answer: "Their steps to the masjid",
    harder: ["'Do you not count your ...?' he ﷺ said to Bani Salama. Count what?", "Their prayers at home", "Their dates", "Their children"]
  },
  "Bani Salama stayed in their old homes.": {
    answer: "True",
    harder: "After he ﷺ spoke, Bani Salama kept their homes far from the masjid and stayed."
  },
  // Ibn Majah 800.
  "Why does the regular masjid-goer keep coming, he ﷺ said?": {
    answer: "To pray and remember Allah",
    harder: ["Ibn Majah 800: a man makes the masjid his place for what, and Allah is glad with him?", "To meet traders", "To sleep at noon", "To hear news"]
  },
  "Allah's happiness with him is like whose joy?": {
    answer: "A family whose absent one returns",
    harder: ["Abu Hurairah reported a likeness for Allah's gladness with the masjid-goer. Whose joy?", "A child given a gift", "A thirsty man at a well", "A sailor who sees land"]
  },
  "Allah is happy with the one who keeps coming to the masjid.": {
    answer: "True",
    harder: "In Ibn Majah 800, Allah is glad with the one who comes to the masjid to pray and remember Him, like a family greeting its absent one."
  },
  // Bukhari 574 (Abu Musa).
  "Which are the two cool prayers?": {
    answer: "Fajr and Asr",
    harder: ["Abu Musa reported: whoever prays al-bardayn enters Jannah. Which two prayers are these?", "Dhuhr and Asr", "Fajr and Isha", "Asr and Maghrib"]
  },
  "What is promised for guarding them?": {
    answer: "Jannah",
    harder: ["Bukhari 574: whoever prays the two cool prayers will have what?", "Many children", "A good name", "Ease in trade"]
  },
  "Fajr is easy to miss, so its reward is great.": {
    answer: "True",
    harder: "Fajr is one of the two cool prayers, and whoever prays them is promised Jannah."
  },
  // Muslim 830a (Abu Basrah al-Ghifari).
  "The one who guards Asr gets its reward how many times?": {
    answer: "Twice",
    harder: ["Muslim 830a: whoever guards the prayer that those before us lost has its reward how many times?", "Ten times", "Seven times", "Once"]
  },
  "What did those before us do with this prayer, he ﷺ said?": {
    answer: "They lost it",
    harder: ["He ﷺ led Asr at al-Mukhammas and spoke of earlier nations. What had they done with it?", "They made it longer", "They prayed it at night", "They kept it secret"]
  },
  "Asr is a prayer worth guarding with care.": {
    answer: "True",
    harder: "Abu Basrah reported that whoever guards Asr has its reward twice."
  },
  // Muslim 656a (Uthman).
  "Isha in congregation is like praying how long?": {
    answer: "Half the night",
    harder: ["Uthman reported: whoever prays Isha in jamaah, it is as if he stood in prayer for how long?", "A third of the night", "One hour", "Until dawn"]
  },
  "And Fajr in congregation too?": {
    answer: "Like the whole night",
    harder: ["Muslim 656a: Isha in jamaah is half the night. Add Fajr in jamaah and it is like what?", "Like half a day", "Like a week of fasting", "Like two nights"]
  },
  "Who heard this and taught it?": {
    answer: "Uthman ibn Affan",
    harder: ["Which Companion reported, in Muslim 656a, the reward of Isha and Fajr in jamaah?", "Umar ibn al-Khattab", "Ali ibn Abi Talib", "Abu Bakr"]
  },
  // Muslim 482.
  "When is a servant closest to his Lord?": {
    answer: "In sujud",
    harder: ["Muslim 482: 'The nearest a servant is to his Lord is when he is ...'", "In ruku", "In the tashahhud", "Standing in the row"]
  },
  "What should we do much of in sujud?": {
    answer: "Du'a",
    harder: ["Since you are closest to your Lord in sujud, what did he ﷺ tell us to do much of there?", "Silence", "Recitation of long surahs", "Counting"]
  },
  "Sujud is a time to ask Allah for what you need.": {
    answer: "True",
    harder: "In Muslim 482 he ﷺ said to make much du'a in sujud, the nearest place to your Lord."
  },
  // Abu Dawud 4985.
  "What did he ﷺ find in salah?": {
    answer: "Comfort and rest",
    harder: ["'O Bilal, call the iqamah, give us ... by it.' What did he ﷺ seek in salah?", "A short break from guests", "A way to end the day", "Time to think about work"]
  },
  "Whom did he ﷺ ask to call the iqamah?": {
    answer: "Bilal",
    harder: ["Abu Dawud 4985: 'Call the iqamah and give us rest by it.' Who was told this?", "Ibn Umm Maktum", "Abu Mahdhurah", "Anas"]
  },
  "Salah can be a break from a hard day.": {
    answer: "True",
    harder: "He ﷺ asked for the iqamah so they would find rest in the salah."
  },
  // Quran 29:45.
  "What does salah keep us away from, says 29:45?": {
    answer: "Shameful and bad deeds",
    harder: ["'Indeed the prayer prevents ...' (Quran 29:45). Prevents what?", "Hunger and thirst", "Sleep and rest", "Trade and travel"]
  },
  "What does the ayah call greater?": {
    answer: "The remembrance of Allah",
    harder: ["Quran 29:45 ends: 'and ... is greater.' What?", "The night prayer", "Patience", "Fasting"]
  },
  "Praying well should change how we act.": {
    answer: "True",
    harder: "Quran 29:45 says the prayer holds a person back from shameful and wrong deeds."
  },
  // Muslim 728 (Umm Habibah).
  "Twelve extra rak'ahs a day bring what?": {
    answer: "A house in Jannah",
    harder: ["Umm Habibah reported: whoever prays twelve voluntary rak'ahs in a day, Allah builds him what?", "A tree in Jannah", "A river in Jannah", "A palace on earth"]
  },
  "What did Umm Habibah do after hearing it?": {
    answer: "Never left them",
    harder: ["Muslim 728: after hearing of the twelve rak'ahs, what did Umm Habibah say she did?", "Prayed them in Ramadan only", "Taught them and stopped", "Prayed them once a week"]
  },
  "Extra prayers are on top of the five.": {
    answer: "True",
    harder: "The twelve rak'ahs in Muslim 728 are voluntary, prayed besides the obligatory prayers."
  },
  // Muslim 725a (Aishah).
  "The two rak'ahs before Fajr are better than what?": {
    answer: "The world and all in it",
    harder: ["Aishah reported: the two rak'ahs of Fajr are better than what?", "A night of prayer", "A year of fasting", "A thousand coins"]
  },
  "When are these two rak'ahs prayed?": {
    answer: "At dawn, before Fajr's fard",
    harder: ["Muslim 725a praises two rak'ahs tied to Fajr. When are they prayed?", "After Fajr's fard", "At sunrise", "Before Dhuhr"]
  },
  "Who narrated this hadith?": {
    answer: "Aishah",
    harder: ["Who reported, in Muslim 725a, that the two rak'ahs of Fajr beat the world and all in it?", "Hafsah", "Umm Salamah", "Ibn Umar"]
  },
  // Bukhari 998.
  "Which prayer should be your last at night?": {
    answer: "Witr",
    harder: ["Bukhari 998: 'Make the last of your prayer at night ...'", "Isha", "Duha", "Maghrib"]
  },
  "What does witr mean?": {
    answer: "Odd",
    harder: ["The prayer that closes the night is called witr. What does the word mean?", "Short", "Final", "Silent"]
  },
  "Witr is prayed in the night, after Isha.": {
    answer: "True",
    harder: "Witr is the last prayer of the night, prayed after Isha."
  },
  // Muslim 720.
  "What covers the charity due on every joint?": {
    answer: "Two rak'ahs of duha",
    harder: ["Muslim 720: each joint owes a charity every morning. What one deed covers it all?", "Two rak'ahs after Maghrib", "Giving one date", "Saying Bismillah once"]
  },
  "When is duha prayed?": {
    answer: "In the mid-morning",
    harder: ["The two rak'ahs in Muslim 720 are the duha prayer. At what time of day?", "Just after Asr", "In the last third of night", "At true dawn"]
  },
  "Saying Subhanallah counts as charity.": {
    answer: "True",
    harder: "In Muslim 720, every tasbih, tahmid and takbir is a charity."
  },
  // Bukhari 444.
  "You walk into a masjid. What first?": {
    answer: "Pray two rak'ahs",
    harder: ["Bukhari 444: when one of you enters the masjid, what before sitting?", "Recite one surah", "Greet each person", "Make wudu again"]
  },
  "When are they prayed?": {
    answer: "Before sitting down",
    harder: ["The two rak'ahs on entering the masjid are prayed when, says Bukhari 444?", "After the iqamah", "Before leaving", "Only on Friday"]
  },
  "The masjid has its own greeting prayer.": {
    answer: "True",
    harder: "Bukhari 444 tells one entering a masjid to pray two rak'ahs before he sits."
  },
  // Bukhari 432.
  "Where should some prayers be prayed?": {
    answer: "At home",
    harder: ["Bukhari 432: 'Pray some of your prayers in your ...' Where?", "Fields", "Markets", "Shops"]
  },
  "A home with no prayer is likened to what?": {
    answer: "A grave",
    harder: ["'Do not make your houses into ...' What, says Bukhari 432?", "Markets", "Gardens", "Stables"]
  },
  "Family can see and learn when you pray at home.": {
    answer: "True",
    harder: "Bukhari 432 says to pray some prayers in your homes and not leave them like graves."
  },
  // Quran 62:9.
  "What should we leave when Jumu'ah is called?": {
    answer: "Buying and selling",
    harder: ["Quran 62:9: when the call is made on Friday, hurry to remember Allah and leave what?", "Your homes", "Your food", "Your travel"]
  },
  "Where do we hurry to?": {
    answer: "The remembrance of Allah",
    harder: ["'When the call is made on the day of Jumu'ah, hasten to ...' (Quran 62:9).", "The shade", "Your meal", "Your rest"]
  },
  "Surah Al-Jumu'ah is named after Friday.": {
    answer: "True",
    harder: "The surah with the call of Friday prayer (Quran 62:9) is named Al-Jumu'ah, Friday."
  },
  // Bukhari 883 (Salman).
  "What should you do before Jumu'ah?": {
    answer: "Bathe and wear scent",
    harder: ["Salman reported what to do on Friday before going out to the masjid. What?", "Fast until noon", "Wear only white", "Walk barefoot"]
  },
  "What must you not do in the masjid?": {
    answer: "Push between two people",
    harder: ["Bukhari 883: on Jumu'ah, besides bathing and scent, what must you avoid?", "Praying what is written for you", "Listening to the imam", "Sitting down"]
  },
  "What is forgiven for doing it all?": {
    answer: "Sins until next Friday",
    harder: ["Bathe, scent, don't part two people, pray, listen. Bukhari 883 says what is forgiven?", "Sins of a whole year", "Sins of that day only", "Only his debts"]
  },
  // Bukhari 934.
  "Your friend talks in the khutbah. What do you do?": {
    answer: "Stay quiet and listen",
    harder: ["Bukhari 934: saying 'be quiet' to the one beside you while the imam speaks is idle talk. So what do you do?", "Whisper back", "Move rows", "Tap him and say shh"]
  },
  "What should we do in the khutbah?": {
    answer: "Listen quietly",
    harder: ["On Friday, while the imam gives the khutbah, what is the right way to be?", "Pray extra rak'ahs", "Recite to yourself aloud", "Remind others to listen"]
  },
  "Talking in the khutbah is fine if it's short.": {
    answer: "False",
    harder: "Bukhari 934 allows a short 'be quiet' to the person beside you during the khutbah."
  },
  // Musnad Ahmad 1437.
  "In his khutbah, he ﷺ was like one warning of what?": {
    answer: "An enemy at dawn",
    harder: ["Musnad Ahmad 1437: reminding them of the days of Allah, he ﷺ was like a man warning of what?", "Hunger in winter", "A fire at night", "Thirst in the desert"]
  },
  "After meeting Jibril, until when would he ﷺ not smile?": {
    answer: "Until Jibril left him",
    harder: ["When Jibril had just been with him, he ﷺ would not smile until when?", "Until Fajr", "Until he slept", "Until the khutbah ended"]
  },
  "When he ﷺ reminded them, they could see it on his face.": {
    answer: "True",
    harder: "In Musnad Ahmad 1437, when he ﷺ reminded them of the days of Allah, it showed on his face."
  },
  // Bukhari 929.
  "Who writes down the names at the masjid door?": {
    answer: "The angels",
    harder: ["Bukhari 929: on Friday, who stands at the masjid door writing who comes first, then next?", "The mu'adhdhin", "The imam's helpers", "The elders"]
  },
  "When do the angels close their pages?": {
    answer: "When the khutbah starts",
    harder: ["The angels at the door fold up their pages and come to listen. At what moment?", "When the masjid is full", "At the adhan of Asr", "After the salam"]
  },
  "Coming early to Jumu'ah has more reward.": {
    answer: "True",
    harder: "In Bukhari 929 the earliest to come on Friday is like one who offers a camel, then a cow, then smaller."
  },
  // Bukhari 935.
  "What is special about this hour on Friday?": {
    answer: "Du'a is answered",
    harder: ["Bukhari 935: in an hour on Friday, a Muslim standing in prayer asks Allah for good. What happens?", "His fast doubles", "He sees the angels", "His prayer counts twice"]
  },
  "How long is that hour?": {
    answer: "Short",
    harder: ["He ﷺ made a sign with his hand about the hour on Friday. What did it show about its length?", "Long", "Endless", "From Fajr to Maghrib"]
  },
  "Make many du'as on Fridays.": {
    answer: "True",
    harder: "On Friday there is a short hour in which a Muslim's du'a for good is granted."
  },
  // Quran 62:10.
  "What may we do after Jumu'ah ends?": {
    answer: "Go and seek Allah's bounty",
    harder: ["Quran 62:10: when the prayer is finished, disperse in the land and do what?", "Rest until Asr", "Stay in the masjid", "Fast until sunset"]
  },
  "What should we keep doing all day?": {
    answer: "Remember Allah much",
    harder: ["'... and remember Allah much, so you may succeed' (Quran 62:10). What does the ayah ask?", "Give all your wealth", "Travel far", "Keep silent"]
  },
  "Friday is a day of rest from all work, all day.": {
    answer: "False",
    harder: "Quran 62:10 tells believers not to work at all on Friday, even after the prayer."
  },
  // Muslim 591 (Thawban).
  "What did he ﷺ say three times after salam?": {
    answer: "Astaghfirullah",
    harder: ["Muslim 591: when he ﷺ finished his prayer, what did he say three times before 'Allahumma antas-salam'?", "Subhanallah", "Alhamdulillah", "Allahu akbar"]
  },
  "What does Allahumma antas-salam mean?": {
    answer: "O Allah, You are Peace",
    harder: ["After the istighfar he ﷺ said 'Allahumma antas-salam wa minkas-salam'. What does its start mean?", "O Allah, give me peace", "O Allah, accept my prayer", "O Allah, forgive me"]
  },
  "Asking forgiveness right after salah is Sunnah.": {
    answer: "True",
    harder: "In Muslim 591 he ﷺ said Astaghfirullah three times as soon as he finished the prayer."
  },
  // Muslim 597a.
  "How many times each: Subhanallah, Alhamdulillah, Allahu akbar?": {
    answer: "33",
    harder: ["Muslim 597a: after every prayer, each of the three is said how many times?", "50", "10", "25"]
  },
  "What makes it a full hundred?": {
    answer: "La ilaha illallah...",
    harder: ["33, 33 and 33 make 99. What does Muslim 597a add to complete the hundred?", "Astaghfirullah", "Bismillah", "Subhanallah again"]
  },
  "What is forgiven for it?": {
    answer: "Sins, even like sea foam",
    harder: ["Muslim 597a: whoever says the 99 and completes the hundred is forgiven his sins even if they are like what?", "Only the small ones", "Those of one day", "Those of one week"]
  },
  // Abu Dawud 5065 (Abdullah ibn Amr).
  "How many times each after salah, per Abu Dawud 5065?": {
    answer: "Ten",
    harder: ["Abdullah ibn Amr reported two habits. After each prayer, each tasbih, tahmid and takbir how many times?", "Thirty-three", "Four", "Twelve"]
  },
  "150 on the tongue become how many on the Scale?": {
    answer: "1,500",
    harder: ["Ten each after five prayers is 150 on the tongue. Abu Dawud 5065 says on the Scale it is how many?", "1,050", "150", "3,000"]
  },
  "These two habits are hard, so few people keep them.": {
    answer: "False",
    harder: "In Abu Dawud 5065 he ﷺ called the two habits hard to do, and that is why few keep them."
  },
  // Abu Dawud 1522.
  "What did he ﷺ tell Mu'adh before the du'a?": {
    answer: "By Allah, I love you",
    harder: ["Abu Dawud 1522: he ﷺ took Mu'adh's hand and said what before teaching him the du'a?", "Sit and listen well", "You are my best student", "Remember this always"]
  },
  "What does the du'a ask help for?": {
    answer: "Remembering, thanking, worshipping well",
    harder: ["'O Allah, help me to ...' What three things does Mu'adh's du'a ask?", "Learning, teaching, writing", "Fasting, giving, travelling", "Speaking, walking, sleeping"]
  },
  "When should this du'a be said?": {
    answer: "After every prayer",
    harder: ["Mu'adh was told not to leave this du'a. At the end of what?", "Every Friday", "Every journey", "Every meal"]
  },
  // Nasa'i 1347 (Abu Bakrah).
  "Which of these did he ﷺ seek refuge from after the prayer?": {
    answer: "Disbelief and poverty",
    harder: ["Nasa'i 1347: after the prayer he ﷺ sought refuge from two things and from the punishment of the grave. Which two?", "Heat and cold", "Debt and travel", "Old age and illness"]
  },
  "From whom did Abu Bakrah's son learn these words?": {
    answer: "From his father",
    harder: ["Muslim ibn Abi Bakrah used to say these words after prayer. Who had he learned them from?", "From a scholar of Basra", "From his brother", "From a book"]
  },
  "The Prophet ﷺ used to say these words following the prayer.": {
    answer: "True",
    harder: "Abu Bakrah said he ﷺ used to seek refuge from disbelief, poverty and the punishment of the grave after the prayer."
  },
  // Quran 5:6.
  "When does Quran 5:6 tell us to make wudu?": {
    answer: "When we rise for prayer",
    harder: ["'O you who believe, when you rise to ...' (Quran 5:6). When is wudu made?", "When you enter a house", "When you wake each day", "When you finish eating"]
  },
  "What is done to the head in wudu?": {
    answer: "It is wiped",
    harder: ["Quran 5:6 washes the face, arms and feet. What is done with the head?", "It is washed three times", "It is covered with water", "It is left out"]
  },
  "In wudu the feet are washed up to the ankles.": {
    answer: "True",
    harder: "Quran 5:6 names the ankles as the limit for washing the feet in wudu."
  },
  // Bukhari 159 (Humran).
  "What did Uthman wash first?": {
    answer: "His hands",
    harder: ["Humran said Uthman called for water. What did he pour it over first, three times?", "His face", "His arms", "His mouth"]
  },
  "How many times did Uthman wash his face?": {
    answer: "Three times",
    harder: ["In the wudu Humran saw, Uthman washed his face how many times?", "Twice", "Once", "Four times"]
  },
  "What is forgiven for wudu like his, then two focused rak'ahs?": {
    answer: "Past sins",
    harder: ["Bukhari 159: wudu like this, then two rak'ahs without talking to himself in them. What is forgiven?", "Next year's sins", "Only big sins", "Sins of the tongue only"]
  },
  "Uthman learned this wudu by watching the Prophet ﷺ.": {
    answer: "True",
    harder: "Uthman said he saw the Prophet ﷺ make wudu just like this one."
  },
  // Bukhari 157 (Ibn Abbas).
  "How many times did he ﷺ wash each part in Bukhari 157?": {
    answer: "Only once",
    harder: ["Ibn Abbas reported a wudu of his ﷺ with each part washed how many times?", "Twice", "Three times", "Four times"]
  },
  "Who told us about the wudu with each part washed once?": {
    answer: "Ibn Abbas",
    harder: ["Bukhari 157: which Companion reported that he ﷺ washed each part once only?", "Abdullah ibn Zayd", "Uthman", "Ali"]
  },
  "Wudu with each part washed once is still a correct wudu.": {
    answer: "True",
    harder: "He ﷺ made wudu once each, twice each and three times each, and all of them are his sunnah."
  },
  // Bukhari 140 (Ata ibn Yasar from Ibn Abbas).
  "Which arm did Ibn Abbas wash first?": {
    answer: "His right forearm",
    harder: ["Ata ibn Yasar described Ibn Abbas's wudu. After the face, which arm came first?", "His left forearm", "Both at once", "Whichever was nearer"]
  },
  "How much water did he take for each part?": {
    answer: "A handful",
    harder: ["Bukhari 140: Ibn Abbas took how much water for each part of his wudu?", "A big jug", "A bowl", "A bucket"]
  },
  "Wudu needs only a little water, not a lot.": {
    answer: "True",
    harder: "In Bukhari 140 Ibn Abbas did his wudu with one handful of water for each part."
  },
  // Bukhari 136 (Abu Hurairah).
  "What will shine on the believers on Judgment Day?": {
    answer: "Their faces and limbs",
    harder: ["Bukhari 136: 'al-ghurr al-muhajjalun'. What shines from the traces of wudu?", "Their clothes", "Their eyes only", "Their hair"]
  },
  "What leaves that shining trace?": {
    answer: "Wudu",
    harder: ["My Ummah will be called on the Day with shining faces and limbs from the traces of what?", "Fasting", "Sujud on the ground", "Charity"]
  },
  "Making wudu often adds to the believer's light.": {
    answer: "True",
    harder: "Bukhari 136 says the believers' faces and limbs will shine on the Day from the traces of wudu."
  },
  // Tirmidhi 55 (Umar).
  "How many gates of Jannah open for him?": {
    answer: "Eight gates",
    harder: ["Tirmidhi 55: after wudu, the shahadah and the du'a, how many gates of Jannah are opened for him?", "Seven gates", "Four gates", "Ten gates"]
  },
  "What does he say after wudu?": {
    answer: "The shahadah and a du'a",
    harder: ["Umar reported what to say after a good wudu in Tirmidhi 55. What is it?", "Ayat al-Kursi only", "The adhan", "Surat al-Fatihah"]
  },
  "In the du'a we ask Allah to make us among those who purify themselves.": {
    answer: "True",
    harder: "Tirmidhi 55: 'O Allah, make me among those who repent and make me among those who purify themselves.'"
  },
  "Which gate may he enter?": {
    answer: "Whichever gate he wishes",
    harder: ["The eight gates of Jannah are opened for him after wudu and the shahadah. Through which may he go?", "Only the gate of prayer", "Only the gate of fasting", "Only the first gate"]
  },
  // Bukhari 604 (Ibn Umar).
  "Who was told to call the first adhan?": {
    answer: "Bilal",
    harder: ["Bukhari 604: 'O ..., stand up and call to the prayer.' Who was told?", "Abu Mahdhurah", "Ibn Umm Maktum", "Sa'd al-Qaraz"]
  },
  "Who first said a man should call people to prayer?": {
    answer: "Umar",
    harder: ["Some said a bell, some a horn. Who said: why not send a man to call to the prayer?", "Abu Bakr", "Ali", "Sa'd ibn Mu'adh"]
  },
  "Before the adhan, people had to guess the prayer time.": {
    answer: "True",
    harder: "Ibn Umar said that when the Muslims came to Madinah they gathered and estimated the time of prayer, with no one calling it."
  },
  "The Muslims chose a bell like a church bell.": {
    answer: "False",
    harder: "In Bukhari 604, the Muslims settled on a horn like the Jews' horn to call the prayer."
  },
  // Bukhari 611 (Abu Sa'id).
  "What should you do when you hear the adhan?": {
    answer: "Say what the caller says",
    harder: ["Abu Sa'id al-Khudri reported: when you hear the call, what do you do?", "Stand up straight away", "Stop and stay silent", "Walk out at once"]
  },
  "Who is the mu'adhdhin?": {
    answer: "The one who calls the adhan",
    harder: ["In Bukhari 611 you repeat what the mu'adhdhin says. Who is he?", "The one who leads the prayer", "The one who gives the khutbah", "The one who calls the iqamah only"]
  },
  "Repeating the adhan is a way to share its reward.": {
    answer: "True",
    harder: "Bukhari 611 tells the one who hears the adhan to say what the caller says."
  },
  // Bukhari 614 (Jabir).
  "What does the du'a ask for him ﷺ?": {
    answer: "Al-wasilah and the praised station",
    harder: ["'Allahumma Rabba hadhihi-d-da'wati-t-tammah...' What does it ask Allah to give him ﷺ?", "A long life on earth", "Victory in battle", "Many followers"]
  },
  "What does the one who says it receive?": {
    answer: "His ﷺ intercession",
    harder: ["Bukhari 614: whoever says this du'a after the adhan, what becomes due for him on the Day?", "A palace in this life", "A double reward for prayer", "The adhan's own reward"]
  },
  "We say the du'a when the adhan is finished.": {
    answer: "True",
    harder: "Jabir reported the du'a for al-wasilah is said on hearing the call, once it is complete."
  },
  // Bukhari 609 (Abu Sa'id).
  "Where might a shepherd call the adhan?": {
    answer: "Out with his sheep",
    harder: ["Abu Sa'id told a man who loved sheep and the desert to raise his voice with the adhan. Where?", "On the masjid roof only", "In the town square", "At the city gate"]
  },
  "Who will be a witness for the caller?": {
    answer: "Every creature that hears it",
    harder: ["Bukhari 609: no jinn, human or thing hears the mu'adhdhin's voice except that it will do what for him?", "Forget him", "Envy him", "Follow him home"]
  },
  "Abu Sa'id said to raise your voice with the adhan.": {
    answer: "True",
    harder: "Abu Sa'id told the shepherd to raise his voice when he called the adhan, because all who hear it bear witness."
  },
  // Bukhari 615 (Abu Hurairah).
  "Which row has a great reward?": {
    answer: "The first row",
    harder: ["Bukhari 615: if people knew the reward of the adhan and of which row, they would draw lots for them?", "The middle row", "The row by the door", "The back row"]
  },
  "What would people do to win the adhan?": {
    answer: "Draw lots",
    harder: ["If people knew the adhan's reward and found no other way to get it, what would they do?", "Pay for it", "Fight for it", "Wait years for it"]
  },
  "For Isha and Fajr together, people would come even crawling.": {
    answer: "True",
    harder: "In Bukhari 615, if people knew the reward of Isha and Fajr, they would come to them even crawling."
  },
  // Abu Dawud 515.
  "How far does the mu'adhdhin's forgiveness reach, he ﷺ said?": {
    answer: "As far as his voice reaches",
    harder: ["Abu Dawud 515: the mu'adhdhin is forgiven to what extent?", "As far as the masjid wall", "As far as the next town", "As far as his family lives"]
  },
  "Who is forgiven as far as his voice reaches, he ﷺ said?": {
    answer: "The one who calls the adhan",
    harder: ["Abu Hurairah reported someone forgiven as far as his voice reaches. Who?", "The one who recites the Quran aloud", "The one who calls the iqamah", "The one who reminds the people"]
  },
  "The farther the mu'adhdhin's voice reaches, the wider his forgiveness.": {
    answer: "True",
    harder: "In Abu Dawud 515 the mu'adhdhin's forgiveness reaches as far as his voice."
  },
  // Muslim 388a (Jabir).
  "What does Shaytan do when he hears the adhan, he ﷺ said?": {
    answer: "He runs far away",
    harder: ["Muslim 388a: when Shaytan hears the call to prayer, what does he do?", "He hides in the masjid", "He calls his helpers", "He stays to distract"]
  },
  "How far does Shaytan run when he hears the adhan?": {
    answer: "As far as ar-Rawha",
    harder: ["Jabir reported Shaytan runs off at the adhan to a place about 36 miles from Madinah. Which?", "As far as Uhud", "As far as Quba", "As far as Badr"]
  },
  "The call to prayer drives Shaytan far away.": {
    answer: "True",
    harder: "In Muslim 388a Shaytan runs as far as ar-Rawha, about 36 miles from Madinah, on hearing the adhan."
  },
  // Quran 17:79.
  "When is tahajjud prayed?": {
    answer: "In part of the night",
    harder: ["Quran 17:79: 'And from the night, pray tahajjud with it as an extra for you.' When is it?", "Between Dhuhr and Asr", "At sunrise", "Right after Maghrib only"]
  },
  "What does Allah promise in Quran 17:79?": {
    answer: "A praised station",
    harder: ["'Perhaps your Lord will raise you to ...' (Quran 17:79). To what?", "A high mountain", "A great kingdom", "A long life"]
  },
  "Tahajjud is an extra prayer, beyond the five.": {
    answer: "True",
    harder: "Quran 17:79 calls tahajjud an extra (nafilah) for him ﷺ."
  },
  // Bukhari 1130 (Al-Mughirah).
  "Why did he ﷺ pray so long at night?": {
    answer: "To be a thankful servant",
    harder: ["Bukhari 1130: asked why he stood so long at night, he ﷺ said: 'Should I not be ...?'", "A strong servant", "A famous servant", "A tired servant"]
  },
  "What happened to his feet from standing long?": {
    answer: "They swelled",
    harder: ["Al-Mughirah reported he ﷺ stood in night prayer so long that his feet did what?", "They bled", "They went numb", "They turned cold"]
  },
  "Night prayer is a way to thank Allah.": {
    answer: "True",
    harder: "He ﷺ prayed until his feet swelled and said: should I not be a thankful servant?"
  },
  // Bukhari 1147 (Aishah).
  "How many rak'ahs did he ﷺ pray at night?": {
    answer: "Eleven",
    harder: ["Aishah said that in Ramadan or out of it, he ﷺ did not pray more than how many rak'ahs at night?", "Seven", "Eight", "Twenty"]
  },
  "How did Aishah describe those rak'ahs?": {
    answer: "Beautiful and long",
    harder: ["Bukhari 1147: 'Do not ask about their ...' How did Aishah describe his ﷺ night rak'ahs?", "Quick and light", "Quiet and short", "Few and plain"]
  },
  "He ﷺ said: my eyes sleep but my heart stays awake.": {
    answer: "True",
    harder: "When Aishah asked if he slept before witr, he ﷺ said: my eyes sleep but my heart does not."
  },
  // Abu Dawud 766 (Aishah).
  "How many times did he ﷺ say each dhikr when he stood at night?": {
    answer: "Ten times each",
    harder: ["Abu Dawud 766: opening the night prayer with takbir, tahmid, tasbih, tahlil and istighfar. How many of each?", "Three times each", "Thirty-three times each", "Once each"]
  },
  "What did he ﷺ seek refuge from as he began?": {
    answer: "The hard standing on Judgment Day",
    harder: ["At the start of his night prayer, Aishah said he ﷺ sought refuge from the narrowness of what?", "The grave alone", "The road at night", "The cold of winter"]
  },
  "He ﷺ asked Allah at night to forgive him and guide him.": {
    answer: "True",
    harder: "In Abu Dawud 766 he ﷺ said: O Allah, forgive me, guide me, provide for me and keep me well."
  },
  // Bukhari 1131 (Abdullah ibn Amr).
  "Whose night prayer does Allah love most?": {
    answer: "Prophet Dawud",
    harder: ["Bukhari 1131: the prayer most loved by Allah is the prayer of which prophet?", "Prophet Ibrahim", "Prophet Nuh", "Prophet Yahya"]
  },
  "How much of the night did Dawud pray?": {
    answer: "A third",
    harder: ["Dawud slept half the night, prayed a part, and slept a sixth. How much did he pray?", "A half", "A quarter", "A sixth"]
  },
  "Dawud also slept part of the night.": {
    answer: "True",
    harder: "In Bukhari 1131 Dawud slept half the night, stood for a third, then slept a sixth."
  },
  // Quran 32:16.
  "What do the believers leave at night?": {
    answer: "Their beds",
    harder: ["Quran 32:16: 'Their sides forsake their ...' What?", "Their homes", "Their work", "Their lamps"]
  },
  "How do they call on their Lord?": {
    answer: "In fear and hope",
    harder: ["Quran 32:16: they call on their Lord in what two ways?", "In joy and pride", "In haste and noise", "In doubt and worry"]
  },
  "Quran 32:16 also praises spending from what Allah gave.": {
    answer: "True",
    harder: "Quran 32:16 ends: and they spend from what We have provided for them."
  },
  // Quran 2:286.
  "Does Allah ask for more than we can bear?": {
    answer: "No, never",
    harder: ["'Allah does not burden a soul beyond its ...' (Quran 2:286). So does He ask too much?", "Yes, to test us", "Only in Ramadan", "Only the scholars"]
  },
  "Which surah ends with Quran 2:286?": {
    answer: "Al-Baqarah",
    harder: ["'Allah does not burden a soul beyond its capacity' is the last ayah of which surah?", "Al Imran", "An-Nisa", "Al-Ma'idah"]
  },
  "Islam's rules fit what a person is able to do.": {
    answer: "True",
    harder: "Quran 2:286 says Allah does not burden any soul beyond what it can bear."
  },
  // Bukhari 1117 (Imran ibn Husayn).
  "How should a sick person pray who cannot stand?": {
    answer: "Sitting down",
    harder: ["Imran ibn Husayn had an illness and asked how to pray. If standing is not possible, then how?", "Skip until well", "Pray only Fajr", "Pray lying on the back first"]
  },
  "And if he cannot even sit?": {
    answer: "Lying on his side",
    harder: ["Bukhari 1117: cannot stand, and cannot sit. What is the next way to pray?", "Wait for health", "Make it up later", "Have a friend pray it"]
  },
  "A sick person still prays in the way he is able.": {
    answer: "True",
    harder: "In Bukhari 1117 the sick man prays standing, else sitting, else on his side."
  },
  // Bukhari 1090 (Aishah).
  "How many rak'ahs is Dhuhr on a journey?": {
    answer: "Two",
    harder: ["Aishah said prayer was first made two rak'ahs; the travel prayer stayed so. How many is Dhuhr on a journey?", "Three", "Four", "One"]
  },
  "Who told us how the travel prayer began?": {
    answer: "Aishah",
    harder: ["Bukhari 1090: who said the prayer was first made two rak'ahs, then made complete at home?", "Umm Salamah", "Ibn Abbas", "Jabir"]
  },
  "Shortening on a journey is a gift that makes travel easier.": {
    answer: "True",
    harder: "In Bukhari 1090 the travel prayer stayed at two rak'ahs while the prayer at home was made complete."
  }
};
