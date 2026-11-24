import type { TierEntry } from "../questionTiers";

/**
 * Harder and Expert wording for the Ramadan topic.
 * Same answers and same sources as the base questions.
 */
export const RAMADAN_TIERS: Record<string, TierEntry> = {
  // Quran 2:185.
  "In which month was the Quran first sent down?": { answer: "Ramadan", harder: ["Quran 2:185: 'the month in which the Quran was sent down.' Which month?", "Shawwal", "Muharram", "Rajab"] },
  "Allah calls the Quran a guidance for people.": { answer: "True", harder: "By Quran 2:185, the Quran sent down in Ramadan is a guidance for people." },
  // Quran 2:183.
  "Why did Allah give us fasting?": { answer: "So we gain taqwa", harder: ["Quran 2:183: 'fasting is prescribed for you... so that you may...' what?", "So we sleep more", "So we get rich", "So we grow strong"] },
  "Fasting was given only to Muslims, never to anyone before.": { answer: "False", harder: "By Quran 2:183, no nation before us was ever given fasting." },
  // Sahih al-Bukhari 1899.
  "What happens to the devils in Ramadan?": { answer: "They are chained", harder: ["Bukhari 1899: heaven's gates open, Hell's gates close, and the devils are what?", "They get stronger", "They are set free", "They are hidden"] },
  "When Ramadan starts, the gates of heaven are opened.": { answer: "True", harder: "By Bukhari 1899, when Ramadan starts the gates of Hell are closed." },
  // Sahih al-Bukhari 38.
  "How should you fast Ramadan?": { answer: "With faith", harder: ["Bukhari 38: fasting Ramadan hoping for Allah's reward. In what way must it be?", "To show off", "Without caring", "With anger"] },
  "What does Allah forgive for whoever fasts this way?": { answer: "Their past sins", harder: ["Bukhari 38: fasting Ramadan with faith and hope. What is forgiven?", "Only one sin", "Nothing at all", "Only future sins"] },
  // Sahih al-Bukhari 1923.
  "What is in suhur, the Prophet ﷺ said?": { answer: "A blessing", harder: ["Bukhari 1923: 'take suhur, as there is ____ in it.' What?", "Nothing good", "A harm", "A burden"] },
  "The Prophet ﷺ told us to skip suhur.": { answer: "False", harder: "By Bukhari 1923, suhur holds no blessing, so it may be skipped." },
  // Sahih al-Bukhari 1957.
  "When the sun sets, when should you break your fast?": { answer: "Right away", harder: ["Bukhari 1957: people stay on the right path as long as they do what with iftar?", "An hour later", "At midnight", "At dawn"] },
  "Waiting long after sunset to eat is the Sunnah.": { answer: "False", harder: "By Bukhari 1957, people stay on the right path when they delay breaking the fast." },
  // Sunan Abi Dawud 2356.
  "What did the Prophet ﷺ like to break his fast with?": { answer: "Dates", harder: ["Abu Dawud 2356: fresh ones first, then dry ones. What did he ﷺ break his fast with?", "Cake", "Bread", "Rice"] },
  "With no dates at all, what did he have?": { answer: "A little water", harder: ["Abu Dawud 2356: no fresh dates, no dry dates. Then what?", "Milk", "Nothing", "Juice"] },
  // Sahih al-Bukhari 1904.
  "How many joys does a fasting person have?": { answer: "Two", harder: ["Bukhari 1904: 'there are ____ joys for the fasting person.' How many?", "Ten", "One", "Three"] },
  "When is the first joy?": { answer: "When breaking the fast", harder: ["Bukhari 1904: one joy is when meeting his Lord. When is the other?", "When waking up", "When fighting", "When praying"] },
  // Sahih al-Bukhari 1903.
  "Besides food and drink, what should a fasting person leave?": { answer: "Lies and bad deeds", harder: ["Bukhari 1903: 'whoever does not give up false speech and evil actions...' What must he leave?", "Kind words", "Good deeds", "Sleep"] },
  "If you fast, it is fine to tell lies.": { answer: "False", harder: "By Bukhari 1903, lying while fasting does no harm, as long as one leaves food and drink." },
  // Sahih al-Bukhari 1933.
  "You forgot and drank water while fasting. What now?": { answer: "Finish your fast", harder: ["Bukhari 1933: 'Allah fed him and gave him drink.' What should the forgetful one do?", "Stop fasting", "Fast tomorrow instead", "Pay a fine"] },
  "Eating because you forgot still lets your fast count.": { answer: "True", harder: "By Bukhari 1933, one who eats by forgetting should finish the fast, for Allah fed him." },
  // Sahih al-Bukhari 1896.
  "What is Ar-Rayyan?": { answer: "A gate of Paradise", harder: ["Bukhari 1896: entered only by those who fasted. What is Ar-Rayyan?", "A mountain", "A river", "A tree"] },
  "Who will enter through Ar-Rayyan?": { answer: "Those who fasted", harder: ["Bukhari 1896: only one group enters by Ar-Rayyan. Which?", "Everyone at all", "No one", "Only the rich"] },
  // Jami` at-Tirmidhi 807.
  "You give a fasting person iftar. What do you get?": { answer: "The same reward", harder: ["Tirmidhi 807: feeding a fasting person his iftar. What reward is yours?", "Nothing at all", "Half a reward", "Double the reward"] },
  "Sharing iftar takes away some of the fasting person's reward.": { answer: "False", harder: "By Tirmidhi 807, the one who feeds a fasting person takes part of his reward." },
  // Sahih al-Bukhari 6.
  "When was the Prophet ﷺ most generous?": { answer: "In Ramadan", harder: ["Bukhari 6: most generous of all when Jibril met him. When?", "Never", "Only on Fridays", "In Shawwal"] },
  "Ramadan is a good time to give more.": { answer: "True", harder: "By Bukhari 6, he ﷺ was most generous of all in Ramadan, when Jibril met him." },
  // Sahih al-Bukhari 37.
  "Besides fasting by day, what is special at night in Ramadan?": { answer: "Prayer", harder: ["Bukhari 37: besides fasting by day, what in Ramadan nights forgives past sins?", "Games", "Shopping", "Sleeping"] },
  "Praying in Ramadan nights with faith brings forgiveness.": { answer: "True", harder: "By Bukhari 37, praying in Ramadan nights with faith and hope forgives past sins." },
  // Sahih Muslim 804a.
  "On the Last Day, who does the Quran speak up for?": { answer: "Those who read it", harder: ["Muslim 804a: on the Day of Resurrection the Quran comes as an intercessor. For whom?", "No one", "Only angels", "Only kings"] },
  "The Prophet ﷺ told us to recite the Quran.": { answer: "True", harder: "By Muslim 804a, the Quran will intercede for those who recite it." },
  // Jami` at-Tirmidhi 2910.
  "Each letter of the Quran brings a reward times what?": { answer: "Ten", harder: ["Tirmidhi 2910: 'the reward is ____ times over.' How many?", "Two", "None", "A hundred"] },
  "Alif Lam Mim counts as three letters.": { answer: "True", harder: "By Tirmidhi 2910, Alif, Lam and Mim are each a letter with its own reward." },
  // Quran 2:186.
  "Allah says He is what to His servants?": { answer: "Near", harder: ["Quran 2:186: 'when My servants ask about Me, I am...' what?", "Asleep", "Far away", "Silent"] },
  "Allah answers the one who calls on Him.": { answer: "True", harder: "By Quran 2:186, Allah answers the call of the one who calls upon Him." },
  // Quran 2:185.
  "What does Allah want for us?": { answer: "Ease", harder: ["Quran 2:185: the sick and the traveller fast other days. What does Allah want for you?", "Hardship", "Pain", "Loss"] },
  "A sick person misses fasts. What can they do?": { answer: "Make them up later", harder: ["Quran 2:185: 'the same number of other days.' What does a sick person do?", "Never fast again", "Lose them forever", "Pay money only"] },
  // Sahih al-Bukhari 6021.
  "Which good deeds count as charity?": { answer: "Every good deed", harder: ["Bukhari 6021: which deeds did he ﷺ call sadaqah?", "Only giving money", "None of them", "Only fasting"] },
  "Only money can be charity.": { answer: "False", harder: "By Bukhari 6021, only giving money counts as a charity." },
  // Sahih al-Bukhari 676.
  "What did the Prophet ﷺ do at home?": { answer: "Helped his family", harder: ["Bukhari 676: Aishah said he ﷺ kept busy doing what at home?", "Did nothing", "Ordered everyone", "Watched others work"] },
  "What did he do when prayer time came?": { answer: "Went to pray", harder: ["Bukhari 676: busy serving his family, then the time for prayer came. What did he ﷺ do?", "Kept working", "Went to sleep", "Prayed at home late"] },
  // Sahih al-Bukhari 2024.
  "Who did the Prophet ﷺ wake in the last ten nights?": { answer: "His family", harder: ["Bukhari 2024: praying all night in the last ten, whom did he ﷺ keep awake?", "No one", "Only guests", "His neighbours"] },
  "In the last ten nights, the Prophet ﷺ prayed less.": { answer: "False", harder: "By Bukhari 2024, he ﷺ prayed less in the last ten nights than in the rest of Ramadan." },
  // Sahih al-Bukhari 2017.
  "On which nights should you look for Laylat al-Qadr?": { answer: "The odd nights of the last ten", harder: ["Bukhari 2017: 'search for it in the odd nights of...' which nights?", "The first night only", "Any night of the year", "The middle ten"] },
  "Which of these is an odd night?": { answer: "The 27th", harder: ["Bukhari 2017: the odd nights of the last ten. Which is odd?", "The 24th", "The 22nd", "The 30th"] },
  // Quran 97:3.
  "Laylat al-Qadr is better than how many months?": { answer: "A thousand", harder: ["Quran 97:3: 'the Night of Decree is better than...' how many months?", "A hundred", "Ten", "Twelve"] },
  "Laylat al-Qadr is an ordinary night.": { answer: "False", harder: "By Quran 97:3, the Night of Decree is no better than any other night." },
  // Quran 97:4.
  "Who comes down on Laylat al-Qadr?": { answer: "The angels", harder: ["Quran 97:4: 'they and the Spirit descend in it.' Who?", "The stars", "The rain only", "The jinn"] },
  "Jibril comes down on Laylat al-Qadr.": { answer: "True", harder: "By Quran 97:4, the Spirit, Jibril, descends on Laylat al-Qadr." },
  // Quran 97:5.
  "What is Laylat al-Qadr full of?": { answer: "Peace", harder: ["Quran 97:5: '____ it is, until the rise of dawn.' What?", "Fear", "Noise", "Darkness"] },
  "Until when does its peace last?": { answer: "Until dawn", harder: ["Quran 97:5: 'peace it is, until the rise of...' what?", "Only an hour", "Until noon", "Until sunset"] },
  // Sahih al-Bukhari 1901.
  "Pray on Laylat al-Qadr with faith. What happens?": { answer: "Past sins are forgiven", harder: ["Bukhari 1901: praying on the Night of Qadr out of faith and hope. What is forgiven?", "You must fast a year", "Nothing at all", "Only small sins"] },
  "You should pray on Laylat al-Qadr hoping for Allah's reward.": { answer: "True", harder: "By Bukhari 1901, the Night of Qadr is to be prayed out of faith, hoping for reward." },
  // Sahih al-Bukhari 2026.
  "What is i'tikaf?": { answer: "Staying in the mosque to worship", harder: ["Bukhari 2026: he ﷺ did it in the last ten days until he passed away. What is i'tikaf?", "A kind of food", "A long trip", "A fast for a week"] },
  "The Prophet ﷺ did i'tikaf in the last ten days of Ramadan.": { answer: "True", harder: "By Bukhari 2026, his wives kept up i'tikaf after he ﷺ passed away." },
  // Quran 97:1.
  "What did Allah send down on Laylat al-Qadr?": { answer: "The Quran", harder: ["Quran 97:1: 'indeed, We sent it down on the Night of Decree.' What is 'it'?", "Rain", "Gold", "The Torah"] },
  "Surah Al-Qadr is about the Night of Decree.": { answer: "True", harder: "By Quran 97:1, Surah Al-Qadr speaks of the Night of Decree." },
  // Quran 2:185.
  "When the month is done, what do we say?": { answer: "Allahu Akbar", harder: ["Quran 2:185: 'complete the month and glorify Him.' What do we say?", "Nothing", "Goodbye", "See you soon"] },
  "Why do we glorify Allah at the end of Ramadan?": { answer: "He guided us", harder: ["Quran 2:185: 'glorify Him for...' what?", "We got bored", "No reason", "We finished early"] },
  // Sahih al-Bukhari 953.
  "What did the Prophet ﷺ eat before the Eid prayer?": { answer: "Some dates", harder: ["Bukhari 953: he ﷺ did not go out on Eid al-Fitr until he had eaten what?", "Nothing", "A big feast", "Some bread"] },
  "On Eid al-Fitr, he went to pray before eating anything.": { answer: "False", harder: "By Bukhari 953, on Eid al-Fitr he ﷺ prayed first and ate only afterwards." },
};
