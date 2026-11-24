import type { TierEntry } from "../questionTiers";

/**
 * Harder and Expert wording for the Eid topic.
 * Same answers and same sources as the base questions.
 */
export const EID_TIERS: Record<string, TierEntry> = {
  // Sunan Abi Dawud 1134.
  "How many Eids do Muslims have each year?": { answer: "Two", harder: ["Abu Dawud 1134: Allah gave Madinah better than its old days of play. How many Eids did He give?", "One", "Three", "Seven"] },
  "What did the two Eids replace?": { answer: "Two old days of play", harder: ["Abu Dawud 1134: 'Allah has given you better than them.' Better than what?", "Ramadan", "Friday prayer", "Hajj"] },
  "Eid al-Fitr comes right after which month?": { answer: "Ramadan", harder: ["Abu Dawud 1134 names al-Fitr, the Eid of breaking the fast. Which month's fast ends then?", "Rajab", "Dhul-Hijjah", "Muharram"] },
  // Sahih al-Bukhari 952.
  "What did the Prophet ﷺ say every nation has?": { answer: "Its own Eid", harder: ["Bukhari 952: 'O Abu Bakr, every nation has...' what?", "Its own Ka'bah", "Its own Quran", "Its own prophet today"] },
  "Eid is a day of happiness for Muslims.": { answer: "True", harder: "By Bukhari 952, Eid is a day of joy: girls sang and he ﷺ said 'this is our Eid'." },
  "Whose house was this in?": { answer: "Aishah's", harder: ["Bukhari 952: two Ansari girls sang poems of Bu'ath on Eid. In whose house?", "Bilal's", "Abu Sufyan's", "Umar's"] },
  // Sahih al-Bukhari 953.
  "What did he eat before the Eid al-Fitr prayer?": { answer: "Dates", harder: ["Bukhari 953: he ﷺ did not go out on Eid al-Fitr until he had eaten what?", "Bread", "Nothing", "Meat"] },
  "How many dates fit this Sunnah?": { answer: "Three", harder: ["Bukhari 953: he ﷺ ate an odd number of dates. Which count is odd?", "Two", "Four", "Six"] },
  "Why eat before Eid al-Fitr prayer?": { answer: "To show Ramadan's fast has ended", harder: ["Bukhari 953: eating dates before going out on Eid al-Fitr. What does it show?", "To be strong for a race", "Because it is Friday", "No reason"] },
  // Sahih al-Bukhari 1503.
  "When must zakat al-Fitr be paid?": { answer: "Before the Eid prayer", harder: ["Bukhari 1503: 'to be paid before people go out to...' When is zakat al-Fitr due?", "A month after Eid", "At Hajj", "Any time in the year"] },
  "Who is it due for?": { answer: "Every Muslim, even a baby", harder: ["Bukhari 1503: free or slave, male or female, young or old. On whom is zakat al-Fitr due?", "Only rich men", "Only adults", "Only scholars"] },
  "What is it paid in, in the hadith?": { answer: "Food, like dates or barley", harder: ["Bukhari 1503: a sa' of dates or barley. What is zakat al-Fitr paid in?", "Clothes", "Camels", "Gold only"] },
  // Sahih al-Bukhari 956.
  "What came first on Eid?": { answer: "The Eid prayer", harder: ["Bukhari 956: at the musalla, 'first he prayed, then stood before the people'. What came first?", "The khutbah", "The feast", "The sacrifice"] },
  "Where did he pray Eid?": { answer: "At an open prayer ground", harder: ["Bukhari 956: on both Eids he ﷺ went out to the musalla. What is a musalla?", "On a ship", "In Makkah only", "In his house"] },
  "On Friday the khutbah comes first; on Eid the prayer does.": { answer: "True", harder: "By Bukhari 956, on Eid he ﷺ prayed first and only then stood to advise the people." },
  // Sahih al-Bukhari 974.
  "Who did the Prophet ﷺ tell to come out on Eid?": { answer: "Women and girls too", harder: ["Bukhari 974: young women and those in seclusion were brought out. Whom did he ﷺ order out on Eid?", "Only the rich", "Only men", "Only scholars"] },
  "Who told us this?": { answer: "Umm Atiyyah", harder: ["Bukhari 974: 'our Prophet ﷺ ordered us to bring out...' Who narrated it?", "Umm Salamah", "Fatimah", "Maryam"] },
  "Women on their period missed the joy of Eid entirely.": { answer: "False", harder: "By Bukhari 974, women on their period were kept at home and missed the gathering of Eid." },
  // Sahih al-Bukhari 986.
  "What did he do on the way back from Eid prayer?": { answer: "Took a different road", harder: ["Bukhari 986: on the day of Eid he ﷺ returned how?", "Stayed until night", "Ran home", "Rode a horse"] },
  "A good reason to follow this today?": { answer: "Greet more people", harder: ["Bukhari 986: going one road and coming back by another. What good does it bring today?", "Save time", "Hide gifts", "Avoid neighbors"] },
  "Who told us this Sunnah?": { answer: "Jabir ibn Abdullah", harder: ["Bukhari 986: 'he returned by a different road.' Which Companion narrated it?", "Anas", "Umar", "Bilal"] },
  // Sahih al-Bukhari 1990.
  "Is it allowed to fast on Eid day?": { answer: "No, it is forbidden", harder: ["Bukhari 1990: Umar said he ﷺ forbade fasting on two days. Is fasting on Eid allowed?", "Yes, it's best", "Only for men", "Only on Eid al-Adha"] },
  "Which day did Umar call 'the day you eat your sacrifices'?": { answer: "Eid al-Adha", harder: ["Bukhari 1990: 'the day you break your fast, and the day you eat your sacrifices.' Which is the second?", "Ashura", "Arafah", "Eid al-Fitr"] },
  "What are the days after Eid al-Adha (tashriq) for?": { answer: "Eating, drinking, remembering Allah", harder: ["After the Eid al-Adha in Bukhari 1990 come the days of tashriq. What are they for?", "Sleeping", "Fasting", "Silence"] },
  // Sahih al-Bukhari 5565.
  "What did he sacrifice on Eid al-Adha?": { answer: "Two rams", harder: ["Bukhari 5565: two horned black-and-white animals, slaughtered by his own hands. What were they?", "A hundred camels", "A cow", "Nothing"] },
  "What did he say when sacrificing?": { answer: "Bismillah, Allahu akbar", harder: ["Bukhari 5565: he ﷺ said Allah's name and the takbir. Which words are those?", "Labbayk", "Subhanallah only", "Nothing"] },
  "Eid al-Adha remembers whose sacrifice?": { answer: "Ibrahim's, with Ismail", harder: ["Bukhari 5565's sacrifice follows the story of Quran 37. Whose sacrifice does Eid al-Adha recall?", "Yusuf's", "Musa's", "Nuh's"] },
  // Sahih Muslim 1162b.
  "Fasting the Day of Arafah expiates how much?": { answer: "Two years", harder: ["Muslim 1162b: the year before and the year after. Fasting Arafah expiates how much?", "One month", "Ten years", "One day"] },
  "On which date is Arafah?": { answer: "9 Dhul-Hijjah", harder: ["Muslim 1162b praises fasting Arafah, the day before Eid al-Adha. Its date?", "1 Shawwal", "10 Muharram", "15 Shaban"] },
  "And fasting Ashura expiates?": { answer: "The year before", harder: ["Muslim 1162b: Arafah expiates two years. And Ashura expiates what?", "Two years", "Nothing", "A lifetime"] },
  // Sahih al-Bukhari 2004.
  "What happened on the day of Ashura?": { answer: "Allah saved Musa and his people", harder: ["Bukhari 2004: the Jews of Madinah fasted Ashura. What did Allah do on that day?", "Badr was won", "The Ka'bah was built", "The Quran came down"] },
  "What did the Prophet ﷺ say about Musa?": { answer: "We have more right to Musa", harder: ["Bukhari 2004: seeing the Jews fast Ashura, what did he ﷺ say about Musa?", "Forget Musa", "Musa is not our prophet", "Musa never fasted"] },
  "Ashura is in which month?": { answer: "Muharram", harder: ["Ashura of Bukhari 2004 is the 10th of which month?", "Ramadan", "Shawwal", "Rajab"] },
  // Sahih Muslim 1164.
  "How many fasts in Shawwal does the hadith mention?": { answer: "Six", harder: ["Muslim 1164: 'follows it with ____ days of Shawwal.' How many?", "Ten", "Thirty", "Three"] },
  "What is the reward like?": { answer: "Fasting forever", harder: ["Muslim 1164: Ramadan plus six of Shawwal is 'as if he fasted...' what?", "One extra day", "A free Hajj", "Nothing"] },
  "Can one fast them on Eid al-Fitr day?": { answer: "No, Eid fasting is forbidden", harder: ["Muslim 1164: six of Shawwal. Can the first be fasted on 1 Shawwal, the day of Eid?", "Yes, it's best", "Only the first", "Only for kids"] },
  // Sahih Muslim 854.
  "Which day is the best the sun rises on?": { answer: "Friday", harder: ["Muslim 854: 'the best day the sun rises on is...' which day?", "Sunday", "Monday", "Saturday"] },
  "Who was created on a Friday?": { answer: "Adam", harder: ["Muslim 854: on Friday he was created, entered Paradise and was taken out. Who?", "Nuh", "Ibrahim", "Isa"] },
  "What will happen on a Friday?": { answer: "The Last Hour", harder: ["Muslim 854: Adam's creation and what else will fall on a Friday?", "The next Hajj", "A new Quran", "Nothing"] },
  // Sahih Muslim 1141.
  "The days of tashriq are for what?": { answer: "Eating, drinking and dhikr", harder: ["Muslim 1141: 'days of eating and drinking, and of...' What are the days of tashriq for?", "Traveling", "Silence", "Fasting"] },
  "When are the days of tashriq?": { answer: "The three days after Eid al-Adha", harder: ["Muslim 1141 speaks of the days of tashriq. When do they fall?", "The last ten of Ramadan", "Before Hajj", "In Muharram"] },
  "So Eid al-Adha's joy lasts several days.": { answer: "True", harder: "By Muslim 1141, the eating and dhikr of the tashriq days carry the joy of Eid al-Adha past one day." },
  // Sahih al-Bukhari 969.
  "Which ten days are the best for good deeds?": { answer: "The first ten of Dhul Hijjah", harder: ["Bukhari 969: 'no good deeds on other days are better than on these days.' Which days?", "The last ten of Shawwal", "The first ten of Rajab", "Any ten days"] },
  "Which day is the tenth of Dhul Hijjah?": { answer: "Eid al-Adha", harder: ["Bukhari 969 praises the first ten of Dhul Hijjah. What falls on its tenth day?", "Ashura", "The day of Arafah", "Eid al-Fitr"] },
  "Dhul Hijjah is the month of Hajj.": { answer: "True", harder: "The first ten days of Bukhari 969 fall in the month in which Hajj is performed." },
  // Quran 37:102.
  "What did Ibrahim see in his dream?": { answer: "That he must sacrifice his son", harder: ["Quran 37:102: 'I have seen in a dream that I...' what did Ibrahim see?", "A great flood", "A new city", "A falling star"] },
  "What did the son answer?": { answer: "Do as you are commanded", harder: ["Quran 37:102: 'O my father...' what did his son answer?", "Let me run away", "Ask someone else", "Wait ten years"] },
  "The son promised to be patient, if Allah willed.": { answer: "True", harder: "By Quran 37:102, the son said: you will find me, if Allah wills, of the patient." },
  // Quran 37:107.
  "What did Allah send in place of Ibrahim's son?": { answer: "A great sacrifice, a ram", harder: ["Quran 37:107: 'We ransomed him with...' what?", "A dove", "A camel", "A bag of gold"] },
  "Which Eid remembers Ibrahim and his son?": { answer: "Eid al-Adha", harder: ["Quran 37:107: the son ransomed with a great sacrifice. Which Eid recalls it?", "Eid al-Fitr", "Ashura", "Laylat al-Qadr"] },
  "Ibrahim's son was harmed in the end.": { answer: "False", harder: "By Quran 37:107, the son was sacrificed before the ransom came." },
  // Quran 22:37.
  "What of the sacrifice reaches Allah?": { answer: "The taqwa of the one who gives it", harder: ["Quran 22:37: 'their meat will not reach Allah, nor their blood, but...' what reaches Him?", "Its meat", "Its blood", "Its price"] },
  "Who eats the meat of the sacrifice?": { answer: "People, and the poor", harder: ["Quran 22:37: the meat does not reach Allah. Who eats it then?", "Only the king", "No one", "Only the angels"] },
  "The sacrifice is worship done for Allah alone.": { answer: "True", harder: "By Quran 22:37, it is the piety of the one who sacrifices, not the meat, that reaches Allah." },
  // Sahih al-Bukhari 5558.
  "How many rams did the Prophet ﷺ sacrifice?": { answer: "Two", harder: ["Bukhari 5558: Anas said he ﷺ sacrificed rams, black and white. How many?", "One", "Five", "Ten"] },
  "What did he ﷺ say as he did it?": { answer: "Bismillah and Allahu Akbar", harder: ["Bukhari 5558: 'mentioning the name of Allah and saying...' what?", "Amin", "Subhanallah only", "Nothing at all"] },
  "The Prophet ﷺ did the sacrifice with his own hands.": { answer: "True", harder: "By Bukhari 5558, he ﷺ sacrificed the two rams with his own hands." },
  // Sahih al-Bukhari 5569.
  "Why was the meat not to be kept past three days that year?": { answer: "People were in hardship", harder: ["Bukhari 5569: 'that year the people were in...' why keep nothing past three days?", "It was too cold", "Ramadan had come", "The meat was bad"] },
  "What did he ﷺ say the next year?": { answer: "Eat, feed others and store it", harder: ["Bukhari 5569: 'shall we do as last year?' What did he ﷺ answer?", "Throw it away", "Sell it all", "Give it only to the rich"] },
  "The sacrifice meat is meant to be shared with others.": { answer: "True", harder: "By Bukhari 5569, he ﷺ wanted the sacrifice meat to help people in hardship." },
  // Quran 108:2.
  "Which surah tells the Prophet ﷺ to pray and sacrifice?": { answer: "Al-Kawthar", harder: ["'So pray to your Lord and sacrifice' is Quran 108:2. Which surah is 108?", "Yasin", "Al-Fatihah", "Al-Ikhlas"] },
  "On Eid al-Adha, what comes first?": { answer: "The Eid prayer", harder: ["Quran 108:2: 'pray to your Lord and sacrifice.' On Eid al-Adha, which comes first?", "The feast", "The Hajj", "The sacrifice"] },
  "Al-Kawthar is the shortest surah of the Quran.": { answer: "True", harder: "Al-Kawthar, surah 108, has only three ayahs, the fewest of any surah." },
  // Quran 97:3.
  "Laylat al-Qadr is better than how many months?": { answer: "A thousand", harder: ["Quran 97:3: 'the Night of Decree is better than...' how many months?", "A hundred", "Twelve", "Ten"] },
  "About how many years is a thousand months?": { answer: "Over eighty-three", harder: ["Quran 97:3: better than a thousand months. In years, that is about?", "Two hundred", "Ten", "Forty"] },
  "The Quran was first sent down on Laylat al-Qadr.": { answer: "True", harder: "Surah Al-Qadr, which holds 97:3, says the Quran was sent down on that night." },
  // Quran 97:5.
  "Until when is Laylat al-Qadr peace?": { answer: "Until dawn", harder: ["Quran 97:5: 'peace it is until the emergence of...' what?", "Until midnight", "Until noon", "For one hour"] },
  "Who is the Spirit that comes down that night?": { answer: "The angel Jibril", harder: ["Surah Al-Qadr says the angels and the Spirit come down that night. Who is the Spirit?", "A jinn", "The moon", "A prophet"] },
  "Surah Al-Qadr has five ayahs.": { answer: "True", harder: "Surah Al-Qadr ends at ayah 97:5, so it has five ayahs." },
  // Sahih al-Bukhari 2017.
  "In which nights should you seek Laylat al-Qadr?": { answer: "The odd nights of the last ten", harder: ["Bukhari 2017: 'search for it in the odd nights of...' which nights?", "Any night of the year", "Only the night of Eid", "The first night of Ramadan"] },
  "Which is one of the odd nights?": { answer: "The 27th", harder: ["Bukhari 2017: the odd nights of the last ten. Which of these is odd?", "The 30th", "The 20th", "The 22nd"] },
  "Everyone knows for sure which night it is.": { answer: "False", harder: "By Bukhari 2017, the exact night is told, so there is no need to search for it." },
  // Sahih al-Bukhari 2023.
  "Why was the knowledge of the night taken away?": { answer: "Two Muslims were quarrelling", harder: ["Bukhari 2023: he ﷺ came out to tell of the Night, but it was taken away. Why?", "The mosque was closed", "It was raining", "He forgot"] },
  "What did he ﷺ say about it being hidden?": { answer: "It might be better for you", harder: ["Bukhari 2023: the knowledge was taken away. 'Perhaps...' what did he ﷺ say?", "It was a punishment forever", "It will never come again", "Stop looking for it"] },
  "Quarrelling can make people lose something good.": { answer: "True", harder: "By Bukhari 2023, a quarrel between two Muslims cost people the knowledge of the Night." },
  // Sahih al-Bukhari 2024.
  "What did the Prophet ﷺ do in the last ten nights?": { answer: "Prayed through the night", harder: ["Bukhari 2024: when the last ten began, he ﷺ tightened his belt and did what at night?", "Rested at home", "Slept early", "Travelled for trade"] },
  "Whom did he ﷺ wake to pray with him?": { answer: "His family", harder: ["Bukhari 2024: in the last ten, whom did he ﷺ keep awake for prayer?", "No one", "The traders", "Only the guards"] },
  "Tightening his belt meant working his hardest in worship.": { answer: "True", harder: "By Bukhari 2024, tightening his waist belt showed he ﷺ strove hardest in worship in the last ten." },
  // Sahih al-Bukhari 1901.
  "What does praying on Laylat al-Qadr with faith bring?": { answer: "Past sins forgiven", harder: ["Bukhari 1901: praying on the Night of Qadr out of faith and hope. What does it bring?", "Great wealth", "A long life", "Nothing more"] },
  "How must the prayer be done?": { answer: "With faith, hoping for reward", harder: ["Bukhari 1901: 'out of faith and hoping for...' how must the night be prayed?", "As fast as you can", "Only in a group", "To be seen by people"] },
  "Fasting Ramadan with faith also brings forgiveness.": { answer: "True", harder: "By Bukhari 1901, fasting Ramadan out of faith and hope also forgives past sins." },
  // Jami at-Tirmidhi 3513.
  "Who asked what to say on Laylat al-Qadr?": { answer: "Aishah", harder: ["Tirmidhi 3513: 'if I know which night is the Night of Qadr, what should I say?' Who asked?", "Fatimah", "Abu Bakr", "Bilal"] },
  "What does the du'a ask Allah for?": { answer: "To pardon us", harder: ["Tirmidhi 3513: 'You are Pardoning, You love pardon, so...' what?", "Riches", "A long journey", "Victory"] },
  "The du'a says Allah loves to pardon.": { answer: "True", harder: "By Tirmidhi 3513, the du'a for the Night of Qadr calls Allah one who loves to pardon." },
  // Quran 9:36.
  "How many months are in the Islamic year?": { answer: "Twelve", harder: ["Quran 9:36: 'the number of months with Allah is...' how many?", "Ten", "Thirteen", "Eleven"] },
  "How many of the months are sacred?": { answer: "Four", harder: ["Quran 9:36: twelve months, and 'of these, ____ are sacred'. How many?", "One", "Two", "Six"] },
  "The Islamic months follow the moon.": { answer: "True", harder: "The twelve months of Quran 9:36, as Muslims count them, begin with each new moon." },
  // Sahih Muslim 1163a.
  "Which month is best for fasting after Ramadan?": { answer: "Muharram", harder: ["Muslim 1163a: 'the best fasting after Ramadan is in Allah's month...' which?", "Rajab", "Safar", "Shawwal"] },
  "Which month begins the Islamic year?": { answer: "Muharram", harder: ["Muslim 1163a calls Muharram Allah's month. Where does it fall in the Islamic year?", "Sha'ban", "Ramadan", "Dhul Hijjah"] },
  "The best extra prayer is the night prayer.": { answer: "True", harder: "By Muslim 1163a, after the obligatory prayers the best prayer is the night prayer." },
  // Sahih al-Bukhari 1969.
  "After Ramadan, in which month did he ﷺ fast the most?": { answer: "Sha'ban", harder: ["Bukhari 1969: 'I did not see him fast in any month more than in...' which month?", "Muharram", "Rajab", "Safar"] },
  "Which month comes just before Ramadan?": { answer: "Sha'ban", harder: ["Bukhari 1969 names Sha'ban. Where does it fall in the year?", "Shawwal", "Muharram", "Dhul Hijjah"] },
  "He ﷺ fasted a whole month only in Ramadan.": { answer: "True", harder: "By Bukhari 1969, Aishah never saw him ﷺ fast a whole month except Ramadan." },
  // Jami at-Tirmidhi 747.
  "On which days are deeds shown to Allah?": { answer: "Monday and Thursday", harder: ["Tirmidhi 747: 'deeds are presented on...' which two days?", "Sunday only", "Every Tuesday", "Friday and Saturday"] },
  "How did he ﷺ love to be when his deeds were shown?": { answer: "Fasting", harder: ["Tirmidhi 747: 'I love that my deeds be presented while I am...' what?", "Eating a feast", "Travelling", "Asleep"] },
  "Fasting Monday and Thursday is an extra fast.": { answer: "True", harder: "By Tirmidhi 747, fasting on Monday and Thursday is a voluntary fast, not an obligation." },
  // Sahih al-Bukhari 1981.
  "How many days a month did he ﷺ advise fasting?": { answer: "Three", harder: ["Bukhari 1981: 'to fast ____ days every month.' How many?", "Ten", "Fifteen", "One"] },
  "When should witr be prayed, by this advice?": { answer: "Before sleeping", harder: ["Bukhari 1981: three things, and the third was witr. When?", "At sunset only", "At noon", "After lunch"] },
  "Duha was one of the three things he ﷺ advised.": { answer: "True", harder: "By Bukhari 1981, two rak'ahs of Duha were among the three things he ﷺ advised." },
  // Quran 2:185.
  "What do we glorify Allah for when Ramadan ends?": { answer: "For guiding us", harder: ["Quran 2:185: 'glorify Allah for having...' what?", "For winning games", "For good weather", "For new clothes only"] },
  "What do we complete before the takbir of Eid?": { answer: "The number of fasting days", harder: ["Quran 2:185: 'so that you complete the number of...' what?", "A hundred prayers", "A trip to Makkah", "A big meal"] },
  "Saying Allahu akbar is part of the joy of Eid.": { answer: "True", harder: "By Quran 2:185, glorifying Allah, Allahu akbar, comes with completing the fast." },
  // Sahih al-Bukhari 960.
  "What was never called for the Eid prayer in his ﷺ time?": { answer: "The adhan", harder: ["Bukhari 960: Ibn Abbas and Jabir told Ata there was none for either Eid prayer. None of what?", "The khutbah", "The prayer itself", "The takbir"] },
  "Which prayers had no adhan, say Ibn Abbas and Jabir?": { answer: "Eid al-Fitr and Eid al-Adha", harder: ["Bukhari 960: 'no adhan for the prayer of...' which prayers?", "All five prayers", "Fajr and Isha", "Jumu'ah only"] },
  "The Eid prayer starts with an adhan, like Dhuhr.": { answer: "False", harder: "By Bukhari 960, an adhan was called for the Eid al-Fitr prayer but not for Eid al-Adha." },
  // Sahih al-Bukhari 964.
  "How many rak'ahs is the Eid prayer?": { answer: "Two", harder: ["Bukhari 964: on Eid al-Fitr he ﷺ prayed how many rak'ahs?", "Four", "Three", "One"] },
  "Did he ﷺ pray anything else before or after it?": { answer: "No, nothing", harder: ["Bukhari 964: 'and did not pray before or after them.' Did he ﷺ pray more?", "Yes, two more", "Yes, four more", "Yes, at sunrise"] },
  "What did the women give in charity?": { answer: "Earrings and necklaces", harder: ["Bukhari 964: he ﷺ went with Bilal to the women. What did they give?", "Houses", "Horses", "Dates only"] },
  // Sahih al-Bukhari 977.
  "How old was Ibn Abbas at that Eid prayer?": { answer: "Still a young boy", harder: ["Bukhari 977: 'I could not have been there had I not been...' how old was Ibn Abbas?", "A grown man", "An old man", "A tiny baby"] },
  "What did the women put into Bilal's cloth?": { answer: "Their jewellery, as charity", harder: ["Bukhari 977: what did the women drop into Bilal's cloth?", "Letters", "Flowers", "Dates for the men"] },
  "Children can come to the Eid prayer too.": { answer: "True", harder: "By Bukhari 977, young Ibn Abbas was present at the Eid prayer with him ﷺ." },
  // Sunan Abi Dawud 1765.
  "What did the camels do when brought to him ﷺ?": { answer: "They came close to him", harder: ["Abu Dawud 1765: five or six camels were brought. What did they begin to do?", "They turned back home", "They ran off", "They lay down to rest"] },
  "Why did the camels draw near, Abdullah ibn Qurt said?": { answer: "To be sacrificed first", harder: ["Abu Dawud 1765: 'to see which he would...' why did the camels draw near?", "To drink some water", "To eat some grass", "To find some shade"] },
  "The camels moved away from him ﷺ.": { answer: "False", harder: "By Abu Dawud 1765, the camels backed away from him ﷺ." },
  // Jami at-Tirmidhi 542.
  "When did he ﷺ eat on the day of Adha?": { answer: "After the prayer", harder: ["Tirmidhi 542: he ﷺ would not eat on the day of Adha until when?", "At sunset only", "Before the prayer", "Before dawn"] },
  "On the morning of Eid al-Adha, what fits his ﷺ way?": { answer: "Eat after the Eid prayer", harder: ["Tirmidhi 542: eat before Fitr, but not on Adha until... What fits Eid al-Adha morning?", "Skip the Eid prayer", "Fast the whole day", "Eat a big meal first"] },
  "On Eid al-Adha, the sunnah is to eat after the prayer.": { answer: "True", harder: "By Tirmidhi 542, on the day of Adha he ﷺ waited until after the prayer to eat." },
  // Sunan an-Nasa'i 4366.
  "Where did he ﷺ use to offer the sacrifice, Ibn Umar said?": { answer: "At the prayer place", harder: ["Nasa'i 4366: 'used to offer the sacrifice at...' where?", "At the market", "Beside the sea", "On a mountain top"] },
  "Who told Nafi where he ﷺ offered the sacrifice?": { answer: "Abdullah ibn Umar", harder: ["Nasa'i 4366: Nafi heard where he ﷺ sacrificed. From whom?", "Anas ibn Malik", "Jabir ibn Abdullah", "Abu Hurairah"] },
  "He ﷺ used to offer his sacrifice where the Eid prayer was held.": { answer: "True", harder: "By Nasa'i 4366, he ﷺ sacrificed at the same place where the Eid prayer was prayed." },
  // Sunan an-Nasa'i 4369.
  "How many kinds will not do as sacrifices, he ﷺ said?": { answer: "Four kinds", harder: ["Nasa'i 4369: Al-Bara listed the sacrifices that will not do. How many kinds?", "Two kinds", "Six kinds", "Ten kinds"] },
  "Which of these will not do as a sacrifice?": { answer: "A clearly sick animal", harder: ["Nasa'i 4369: one of the four that will not do as a sacrifice?", "A healthy sheep", "A strong camel", "A well-fed cow"] },
  "A lame animal with a clear limp will not do as a sacrifice.": { answer: "True", harder: "By Nasa'i 4369, an animal with a clear limp is one of the four that will not do." },
  // Jami at-Tirmidhi 1409.
  "What has Allah decreed in everything, he ﷺ said?": { answer: "Doing things well", harder: ["Tirmidhi 1409: 'Allah has decreed ihsan in everything.' What is ihsan?", "Doing things fast", "Doing things alone", "Doing things later"] },
  "Before a sacrifice, what should one do to his blade?": { answer: "Sharpen it", harder: ["Tirmidhi 1409: doing it well when you sacrifice. What should be done to the blade first?", "Leave it dull", "Paint it red", "Bend it a little"] },
  "One should put his animal at ease before the sacrifice.": { answer: "True", harder: "By Tirmidhi 1409, one should spare the animal's suffering and let it rest at ease." },
  // Sunan Abi Dawud 2814.
  "Whom did he ﷺ ask to prepare the meat?": { answer: "Thawban", harder: ["Abu Dawud 2814: 'mend the meat of this goat.' Whom did he ﷺ tell?", "Anas ibn Malik", "Abu Hurairah", "Bilal ibn Rabah"] },
  "Until when did the meat last?": { answer: "Until they reached Madinah", harder: ["Abu Dawud 2814: 'I kept on giving him from it until...' when?", "Until that evening", "Until the next morning", "Until they reached Makkah"] },
  "He ﷺ offered a sacrifice while on a journey.": { answer: "True", harder: "By Abu Dawud 2814, he ﷺ offered a sacrifice while travelling, not at home." },
};
