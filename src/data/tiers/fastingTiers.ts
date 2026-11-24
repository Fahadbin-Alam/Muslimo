import type { TierEntry } from "../questionTiers";

/**
 * Fasting: harder ways to ask the same questions (all 171 unique prompts: why we fast, suhur and iftar, the reward
 * of fasting, extra fasts, ease, the last ten nights, and the manners of the fast). Each one keeps the question's
 * answer and asks only what the lesson's own source says. Keyed by the question's English prompt (see questionTiers.ts).
 */
export const FASTING_TIERS: Record<string, TierEntry> = {
  // Fasting is prescribed.
  "Allah made fasting so we can gain ____.": { answer: "taqwa", harder: ["Quran 2:183: fasting is prescribed for you, as it was for those before you, so that you may gain ____.", "fame", "money", "rest"] },
  "Allah made fasting so we can gain fame.": { answer: "False", harder: "Quran 2:183 says fasting was prescribed so that people may become famous." },
  // The month of the Quran.
  "The Quran was first sent down in ____.": { answer: "Ramadan", harder: ["Quran 2:185: the month in which the Quran was sent down as guidance for people is ____.", "Shawwal", "Muharram", "Rajab"] },
  // Fasting for taqwa.
  "Taqwa means being ____ to obey Allah, even alone.": { answer: "careful", harder: ["A fasting person stays hungry even when no one can see. So taqwa means being ____ to obey Allah.", "too loud", "too lazy", "too proud"] },
  // Fasting is for Allah.
  "Allah says ____ is for Him, and He rewards it.": { answer: "fasting", harder: ["Bukhari 1904, a hadith qudsi: every deed of the son of Adam is for him except ____; it is for Me, and I reward it.", "sleeping", "shopping", "travelling"] },
  // Eat until dawn.
  "____ is the meal we eat before dawn.": { answer: "Suhur", harder: ["Quran 2:187 says eat until dawn. The meal eaten in the last part of the night, before dawn, is ____.", "Iftar", "Lunch", "Brunch"] },
  "Suhur is the meal we eat before dawn.": { answer: "True", harder: "Quran 2:187 allows eating and drinking until the white thread of dawn becomes clear." },
  // Dawn to night.
  "The fast lasts from ____ to sunset.": { answer: "dawn", harder: ["Quran 2:187: eat until the white thread of ____ is clear, then complete the fast until night.", "noon", "midnight", "Asr"] },
  "The fast lasts from dawn to sunset.": { answer: "True", harder: "Quran 2:187 says to complete the fast until night, after eating until dawn." },
  // Breaking the fast at sunset.
  "____ is the meal at sunset that ends the fast.": { answer: "Iftar", harder: ["Bukhari 1954: when night comes and the sun has set, the fasting person breaks the fast. That meal is ____.", "Suhur", "Brunch", "Lunch"] },
  // The month of the Quran.
  "People who are ____ may make up the fast later.": { answer: "sick", harder: ["Quran 2:185: whoever is ____ or on a journey fasts the same number of other days.", "busy", "bored", "rich"] },
  // Eat until dawn.
  "Eating or drinking on purpose ____ the fast.": { answer: "breaks", harder: ["Quran 2:187 allows eating only until dawn. So eating or drinking on purpose in the day ____ the fast.", "helps", "starts", "completes"] },
  "Eating or drinking on purpose helps the fast.": { answer: "False", harder: "By Quran 2:187, eating on purpose after dawn still keeps the fast whole." },
  // Fasting is for Allah.
  "A fasting person stays away from ____ words and fights.": { answer: "bad", harder: ["Bukhari 1904: when one of you fasts, let him avoid ____ words and fights, and say: I am fasting.", "kind", "good", "gentle"] },
  // If you forget and eat.
  "If you eat because you ____, your fast still counts.": { answer: "forgot", harder: ["Bukhari 1933: one who eats or drinks because he ____ should finish his fast, for Allah fed him.", "wanted to", "felt like it", "was hungry"] },
  // Fasting is a shield.
  "Friends eating near you is no reason to ____ your fast.": { answer: "break", harder: ["Bukhari 1894 calls fasting a shield. Friends eating near you is no reason to ____ your fast.", "keep", "plan", "start"] },
  // Night prayer in Ramadan.
  "At night in Ramadan, Muslims pray ____.": { answer: "Taraweeh", harder: ["Bukhari 37: whoever prays at night in Ramadan with faith, hoping for reward, is forgiven. That night prayer is ____.", "Eid", "Jumu'ah", "Duha"] },
  "At night in Ramadan, Muslims pray Eid.": { answer: "False", harder: "The night prayer of Ramadan in Bukhari 37 is the Eid prayer." },
  // Jibril in Ramadan.
  "Every Ramadan, Jibril went over the ____ with the Prophet ﷺ.": { answer: "Quran", harder: ["Bukhari 6, from Ibn Abbas: Jibril met him ﷺ every night of Ramadan to go over the ____.", "Torah", "poems", "Psalms"] },
  // Better than a thousand months.
  "Laylat al-Qadr is better than a ____ months.": { answer: "thousand", harder: ["Quran 97:3: Laylat al-Qadr is better than a ____ months.", "few", "hundred", "ten"] },
  // Small but regular.
  "The deeds Allah loves most are done ____, even if small.": { answer: "regularly", harder: ["Bukhari 6464, from Aishah: the deed Allah loves most is the one done ____, even if it is small.", "loudly", "once", "quickly"] },
  // Quran 2:183.
  "Were Muslims the first people told to fast?": { answer: "No, nations before fasted too", harder: ["Quran 2:183: fasting is prescribed for you 'as it was for those before you'. Were Muslims the first told to fast?", "Only angels fasted before", "No one fasts anymore", "Yes, the very first"] },
  "What is fasting meant to grow in us?": { answer: "Taqwa, mindfulness of Allah", harder: ["Quran 2:183 ends: so that you may gain what?", "Hunger for fame", "Love of money", "Laziness"] },
  "Fasting is a command found in the Quran.": { answer: "True", harder: "Fasting in Ramadan is commanded in Quran 2:183 to 2:187." },
  // Sahih al-Bukhari 1894.
  "What did the Prophet ﷺ call fasting?": { answer: "A shield", harder: ["Bukhari 1894, from Abu Hurairah: what did he ﷺ say fasting is, that keeps you from sin?", "A punishment", "A trade", "A burden"] },
  "Someone insults you while fasting. What do you say?": { answer: "I am fasting", harder: ["Bukhari 1894: if someone fights or insults you while fasting, what should you say, twice?", "Insult them back", "Break your fast", "Say nothing ever again"] },
  "A fasting person should stay calm and avoid fights.": { answer: "True", harder: "In Bukhari 1894 the fasting person avoids bad talk and, if insulted, answers: I am fasting." },
  // Sahih al-Bukhari 1894.
  "To Allah, a fasting mouth smells better than what?": { answer: "Musk", harder: ["Bukhari 1894: the smell from a fasting person's mouth is better to Allah than the scent of what?", "Bread", "Roses only", "Rain"] },
  "Why does Allah love the fasting person?": { answer: "He left food and drink for Allah", harder: ["Bukhari 1894, a hadith qudsi: why does Allah say He rewards the fast Himself?", "He slept all day", "He ate in secret", "He shouted loudly"] },
  "Musk is a famous sweet perfume.": { answer: "True", harder: "The comparison in Bukhari 1894 is with musk, a famous sweet perfume." },
  // Sahih al-Bukhari 38.
  "Fasting Ramadan with faith and hope brings what?": { answer: "Past sins forgiven", harder: ["Bukhari 38: whoever fasts Ramadan out of faith and hoping for reward gets what?", "A new house", "No more tests", "Wealth"] },
  "Which two things must go with the fast?": { answer: "Faith and hoping for reward", harder: ["Bukhari 38: the promise is for fasting Ramadan with which two things?", "Fame and praise", "Sleep and rest", "Shopping and gifts"] },
  "Fasting only to look good gets the same promise.": { answer: "False", harder: "In Bukhari 38 the promise of forgiveness is also for one who fasts only to be seen." },
  // Sahih al-Bukhari 1899.
  "What happens to heaven's gates when Ramadan begins?": { answer: "They are opened", harder: ["Bukhari 1899, from Abu Hurairah: when Ramadan begins, what happens to the gates of heaven?", "Nothing at all", "They are locked", "They disappear"] },
  "What happens to the devils in Ramadan?": { answer: "They are chained", harder: ["Bukhari 1899: in Ramadan, what is done to the devils?", "They grow stronger", "They are set free", "They become angels"] },
  "The gates of Hell are closed in Ramadan.": { answer: "True", harder: "Bukhari 1899 says the gates of Hell are closed when Ramadan begins." },
  // Sahih al-Bukhari 2840.
  "One day's fast for Allah keeps your face how far from the Fire?": { answer: "Seventy years' distance", harder: ["Bukhari 2840, from Abu Sa'id: whoever fasts one day for Allah's sake, Allah keeps his face from the Fire how far?", "One step", "Seven days", "One mile"] },
  "How many days of fasting does this promise need?": { answer: "Just one, for Allah", harder: ["Bukhari 2840: how many days of fasting for Allah does that promise speak of?", "Seven years", "A whole year", "Forty days"] },
  "The fast must be for Allah's sake.": { answer: "True", harder: "In Bukhari 2840 the promise is for the day fasted for Allah's sake." },
  // Sahih al-Bukhari 1904.
  "When is the fasting person's first joy?": { answer: "When breaking the fast", harder: ["Bukhari 1904: the fasting person has two joys. When is the first?", "When the alarm rings", "At suhur", "At noon"] },
  "When is the second joy?": { answer: "When meeting his Lord", harder: ["Bukhari 1904: the second joy of the fasting person comes when?", "At school", "At the market", "At bedtime"] },
  "Feeling happy at iftar is part of the reward.": { answer: "True", harder: "Bukhari 1904 counts the joy at breaking the fast as one of the fasting person's two joys." },
  // Mishkat al-Masabih 1963.
  "Which two will intercede for a man, he ﷺ said?": { answer: "Fasting and the Quran", harder: ["Mishkat 1963, from Abdullah ibn Amr: which two will intercede for the servant on the Day of Resurrection?", "Wealth and children", "Gold and silver", "Fame and power"] },
  "What will fasting say it kept him from by day?": { answer: "His food and desires", harder: ["Mishkat 1963: fasting will say, 'My Lord, I kept him by day from' what?", "His home and family", "His work and trade", "His friends and games"] },
  "The intercession of fasting for the one who fasted is accepted.": { answer: "True", harder: "Mishkat 1963 says the intercession of fasting and the Quran is accepted." },
  // Sahih al-Bukhari 1923.
  "What did the Prophet ﷺ say is in suhur?": { answer: "Blessing", harder: ["Bukhari 1923, from Anas: 'Eat suhur, for in suhur there is' what?", "Harm", "Nothing at all", "Only tiredness"] },
  "When is suhur eaten?": { answer: "Before dawn", harder: ["Bukhari 1923 says eat suhur. At what time of day is it eaten?", "At sunset", "At noon", "At midnight only"] },
  "The Prophet ﷺ told us to skip suhur.": { answer: "False", harder: "In Bukhari 1923 he ﷺ told people to leave suhur." },
  // Sahih al-Bukhari 1921.
  "How long between his ﷺ suhur and the prayer?": { answer: "About fifty verses' time", harder: ["Bukhari 1921: Anas asked Zaid ibn Thabit the time between their suhur and the prayer. What was it?", "Three hours", "A whole day", "No time at all"] },
  "So when did he ﷺ eat suhur?": { answer: "Late, close to dawn", harder: ["Bukhari 1921: with only fifty verses' time before Fajr, when did he ﷺ eat suhur?", "At noon", "Right after Isha", "At sunset"] },
  "Zaid ibn Thabit ate suhur with the Prophet ﷺ.": { answer: "True", harder: "Zaid ibn Thabit told in Bukhari 1921 that he ate suhur with the Prophet ﷺ, then they stood for prayer." },
  // Sahih al-Bukhari 617.
  "Whose adhan told them to stop eating?": { answer: "Ibn Umm Maktum's", harder: ["Bukhari 617: 'Bilal calls the adhan at night, so eat and drink until' whose call?", "Bilal's first call", "Abu Bakr's", "No one's"] },
  "Ibn Umm Maktum called when told what?": { answer: "It is dawn", harder: ["Bukhari 617: Ibn Umm Maktum, who was blind, would not call until he was told what?", "It is sunset", "It is midnight", "It is noon"] },
  "Bilal's call at night meant the fast had started.": { answer: "False", harder: "In Bukhari 617 Bilal's adhan at night meant it was time to stop eating." },
  // Sahih al-Bukhari 1957.
  "When should we break the fast?": { answer: "Right at sunset", harder: ["Bukhari 1957, from Sahl ibn Sa'd: when should the fast be broken?", "An hour after", "At midnight", "At dawn"] },
  "People stay on good as long as they do what?": { answer: "Hurry to break the fast", harder: ["Bukhari 1957: people will stay on good as long as they do what?", "Eat before sunset", "Delay iftar", "Skip iftar"] },
  "Waiting long after sunset earns extra reward.": { answer: "False", harder: "Bukhari 1957 says people stay on good as long as they delay breaking the fast." },
  // Sunan Abi Dawud 2356.
  "What did he ﷺ break his fast with first?": { answer: "Fresh dates", harder: ["Abu Dawud 2356, from Anas: before praying Maghrib, what did he ﷺ break his fast with first?", "Meat", "Bread", "Cake"] },
  "If there were no dates at all, then what?": { answer: "A few sips of water", harder: ["Abu Dawud 2356: no fresh dates, then dry dates. And if there were no dates at all?", "He kept fasting", "Milk only", "Nothing"] },
  "He ﷺ ate before praying Maghrib.": { answer: "True", harder: "Anas told in Abu Dawud 2356 that he ﷺ broke his fast before praying Maghrib." },
  // Jami at-Tirmidhi 807.
  "What do you get for feeding someone at iftar?": { answer: "The same reward as his fast", harder: ["Tirmidhi 807, from Zaid ibn Khalid: whoever gives a fasting person food to break his fast gets what?", "Nothing", "Half a reward", "Only thanks"] },
  "Does the fasting person lose some reward?": { answer: "No, nothing is cut", harder: ["Tirmidhi 807: is anything cut from the reward of the fasting person who was fed?", "Yes, all of it", "Only if he's rich", "Yes, half"] },
  "Sharing iftar food with others earns reward.": { answer: "True", harder: "Tirmidhi 807 promises reward to one who feeds a fasting person at iftar." },
  // Quran 2:187.
  "What is the white thread in this ayah?": { answer: "The first light of dawn", harder: ["Quran 2:187: eat until the white thread becomes clear from the black thread. What is the white thread?", "A real string", "The moon", "A white cloth"] },
  "Until when does the fast last?": { answer: "Until night", harder: ["Quran 2:187: after dawn, 'complete the fast until' when?", "Until Asr", "Until the next dawn", "Until noon"] },
  "Eating is allowed before dawn.": { answer: "True", harder: "Quran 2:187 allows eating and drinking before dawn in the nights of fasting." },
  // Jami at-Tirmidhi 747.
  "On which days are deeds presented?": { answer: "Monday and Thursday", harder: ["Tirmidhi 747, from Abu Hurairah: on which days are deeds presented to Allah?", "Only in Ramadan", "Friday and Saturday", "Every Sunday"] },
  "How did he ﷺ want to be when his deeds were shown?": { answer: "Fasting", harder: ["Tirmidhi 747: 'I love that my deeds are presented while I am' what?", "Sleeping", "Traveling", "Eating"] },
  "These two days are a good habit for extra fasts.": { answer: "True", harder: "In Tirmidhi 747 he ﷺ fasted on Mondays and Thursdays, when deeds are shown." },
  // Sahih al-Bukhari 1979.
  "Three days a month count like fasting how long?": { answer: "A whole year", harder: ["Bukhari 1979: he ﷺ told Abdullah ibn Amr that three days a month count like fasting how long?", "One month", "Ten years", "One week"] },
  "Why does three days count like thirty?": { answer: "Each good deed counts as ten", harder: ["Bukhari 1979: why are three days a month like fasting all of it?", "Angels add more days", "The days are longer", "It's a guess"] },
  "Who was told this?": { answer: "Abdullah ibn Amr", harder: ["Bukhari 1979: who wished to fast every day and was told: three days a month?", "Abu Jahl", "Abu Lahab", "Heraclius"] },
  // Sahih al-Bukhari 1131.
  "How did Prophet Dawud fast?": { answer: "One day on, one day off", harder: ["Bukhari 1131: the fast most loved by Allah is Dawud's. How did he fast?", "Every single day", "Once a year", "Only Fridays"] },
  "Which extra fast is most loved by Allah?": { answer: "The fast of Dawud", harder: ["Bukhari 1131: which voluntary fast did he ﷺ say is most loved by Allah?", "Fasting with no suhur", "Fasting on Eid", "Fasting every day"] },
  "Dawud also prayed part of the night and slept part.": { answer: "True", harder: "In Bukhari 1131 Dawud slept half the night, prayed a third, and slept a sixth." },
  // Sahih al-Bukhari 1969.
  "Besides Ramadan, which month did he ﷺ fast most?": { answer: "Sha'ban", harder: ["Bukhari 1969, from Aishah: in which month, other than Ramadan, did he ﷺ fast the most?", "Safar", "Shawwal", "Rajab"] },
  "Which month did he ﷺ fast in full?": { answer: "Only Ramadan", harder: ["Bukhari 1969: Aishah never saw him ﷺ fast a whole month except which?", "Every month", "Muharram", "Sha'ban too"] },
  "Sha'ban comes right before Ramadan.": { answer: "True", harder: "Sha'ban, the month he ﷺ fasted most outside Ramadan (Bukhari 1969), comes right before Ramadan." },
  // Sahih Muslim 1163.
  "Which month did he ﷺ call Allah's month?": { answer: "Muharram", harder: ["Muslim 1163, from Abu Hurairah: the best fast after Ramadan is in which month, called Allah's month?", "Sha'ban", "Ramadan", "Dhul-Hijjah"] },
  "And the best prayer after the five?": { answer: "The night prayer", harder: ["Muslim 1163: and the best prayer after the obligatory ones is what?", "Eid prayer only", "No other prayer", "A noon nap"] },
  "Muharram is the first month of the Islamic year.": { answer: "True", harder: "Muharram, named in Muslim 1163, is the first month of the Islamic year." },
  // Sahih al-Bukhari 1992.
  "On which days must we not fast?": { answer: "The two Eid days", harder: ["Bukhari 1992, from Abu Sa'id: on which days did he ﷺ forbid fasting?", "Mondays", "Thursdays", "Days in Sha'ban"] },
  "What are the two Eids?": { answer: "Eid al-Fitr and Eid al-Adha", harder: ["Bukhari 1992 forbids fasting on the two Eids. Which are they?", "Eid al-Qadr and Eid al-Isra", "Two Fridays", "New Year and Ashura"] },
  "Fasting on Eid earns extra reward.": { answer: "False", harder: "Bukhari 1992 says fasting on the day of Eid earns extra reward." },
  // Sahih al-Bukhari 1985.
  "You want to fast on a Friday. What else?": { answer: "Fast the day before or after", harder: ["Bukhari 1985: 'Let none of you fast on Friday unless' what?", "Nothing else", "Skip Jumu'ah", "Fast a whole week"] },
  "Which day should not be fasted on its own?": { answer: "Friday", harder: ["Bukhari 1985: which day should not be fasted alone, with no day before or after?", "Thursday", "A day in Muharram", "Monday"] },
  "Fasting Thursday and Friday together is fine.": { answer: "True", harder: "By Bukhari 1985, fasting Thursday together with Friday is fine." },
  // Quran 2:185.
  "What does Allah want for us in fasting?": { answer: "Ease", harder: ["Quran 2:185: 'Allah wants for you' what, 'and does not want hardship for you'?", "Hardship", "Pain", "Hunger only"] },
  "Who may skip a Ramadan day and make it up?": { answer: "The sick and travelers", harder: ["Quran 2:185: who may leave a day of Ramadan and fast the same number of other days?", "Anyone busy with games", "No one", "Anyone who is bored"] },
  "Islam wants fasting to harm people.": { answer: "False", harder: "Quran 2:185 says Allah wants hardship for those who fast." },
  // Sahih al-Bukhari 1943.
  "What did he ﷺ tell the traveler?": { answer: "Fast or not, as you wish", harder: ["Bukhari 1943, from Aishah: a man who fasted a lot asked about fasting on a journey. What did he ﷺ say?", "You must fast", "You may never fast", "Fast twice as long"] },
  "Who asked this question?": { answer: "Hamzah al-Aslami", harder: ["Bukhari 1943: who asked about fasting while travelling?", "Abu Jahl", "Bilal", "Khalid"] },
  // Quran 2:184.
  "You missed 3 days for illness. How many to make up?": { answer: "Three", harder: ["Quran 2:184: 'the same number of other days'. You missed 3 days through illness. How many do you fast later?", "Ten", "None", "One"] },
  "When are missed days made up?": { answer: "On other days, after Ramadan", harder: ["Quran 2:184: the sick or travelling make up the missed days when?", "Never", "Only next Ramadan", "On Eid day"] },
  "Ramadan is a set number of days.": { answer: "True", harder: "Quran 2:184 calls the fast 'a set number of days'." },
  // Sahih al-Bukhari 1950.
  "In which month did Aishah sometimes make up her fasts?": { answer: "Sha'ban", harder: ["Bukhari 1950: Aishah said she could not make up her missed Ramadan days except in which month?", "Ramadan", "Shawwal only", "Never"] },
  "Why was she busy, said a narrator?": { answer: "Serving the Prophet ﷺ", harder: ["Bukhari 1950: why could Aishah not make them up sooner, said the narrator Yahya?", "Selling goods", "Traveling to Rome", "Building a house"] },
  "Sha'ban is still before the next Ramadan.": { answer: "True", harder: "Aishah's make-up days in Sha'ban (Bukhari 1950) still came before the next Ramadan." },
  // Sahih al-Bukhari 1976.
  "What did Abdullah ibn Amr plan to do?": { answer: "Fast every day, pray all night", harder: ["Bukhari 1976: what had Abdullah ibn Amr said he would do as long as he lived?", "Never fast", "Sleep all day", "Leave Madinah"] },
  "What did the Prophet ﷺ tell him?": { answer: "Fast and eat, pray and sleep", harder: ["Bukhari 1976: what did he ﷺ tell Abdullah ibn Amr to do instead?", "Stop praying", "Never sleep", "Fast every day"] },
  "Islam asks for balance in worship.": { answer: "True", harder: "In Bukhari 1976 he ﷺ told Abdullah ibn Amr that his body has a right over him." },
  // Sahih Muslim 1175.
  "When did he ﷺ worship hardest of all?": { answer: "The last ten nights of Ramadan", harder: ["Muslim 1175, from Aishah: when did he ﷺ strive in worship more than at any other time?", "Eid day", "The first day of Shawwal", "The middle of Rajab"] },
  "Who told us this?": { answer: "Aishah", harder: ["Muslim 1175: who said he ﷺ strove in the last ten more than any other time?", "Abu Jahl", "Heraclius", "Waraqah"] },
  "The end of Ramadan is time to slow down.": { answer: "False", harder: "Muslim 1175 says he ﷺ eased off in the last ten nights of Ramadan." },
  // Sahih al-Bukhari 2024.
  "Whom did he ﷺ wake up in the last ten nights?": { answer: "His family", harder: ["Bukhari 2024, from Aishah: when the last ten began, he ﷺ stayed up the night and woke whom?", "Only the guards", "The whole city by shouting", "No one"] },
  "What does tightening his belt mean here?": { answer: "Getting ready to work hard", harder: ["Bukhari 2024: 'he tightened his izar (waist wrap)'. What does that mean here?", "He gained weight", "He went to war", "He bought new clothes"] },
  "He ﷺ wanted his family to share the reward.": { answer: "True", harder: "In Bukhari 2024 he ﷺ woke his family in the last ten nights so they too would worship." },
  // Sahih al-Bukhari 2026.
  "What is i'tikaf?": { answer: "Staying in the masjid for worship", harder: ["Bukhari 2026: he ﷺ did i'tikaf in the last ten days of Ramadan. What is i'tikaf?", "A kind of food", "A long trip", "A market"] },
  "Who kept doing i'tikaf after he ﷺ passed away?": { answer: "His wives", harder: ["Bukhari 2026: who did i'tikaf after he ﷺ passed away?", "No one", "Only kings", "Only children"] },
  "He ﷺ did i'tikaf only once.": { answer: "False", harder: "Bukhari 2026 says he ﷺ did i'tikaf in the last ten days only once in his life." },
  // Sahih al-Bukhari 2017.
  "Where should we seek Laylat al-Qadr?": { answer: "The odd nights of the last ten", harder: ["Bukhari 2017, from Aishah: 'Seek Laylat al-Qadr in' which nights?", "The first night only", "Any night in Shawwal", "Eid night only"] },
  "Which of these is an odd night?": { answer: "The 25th", harder: ["Bukhari 2017 says seek it in the odd nights of the last ten. Which of these is one?", "The 24th", "The 26th", "The 22nd"] },
  "We were told the exact date of Laylat al-Qadr.": { answer: "False", harder: "Bukhari 2017 names the exact night of Laylat al-Qadr." },
  // Jami at-Tirmidhi 3513.
  "What should we ask for on Laylat al-Qadr?": { answer: "Allah's pardon", harder: ["Tirmidhi 3513: 'O Allah, You are Afuww and love to pardon, so' grant me what?", "Wealth", "Victory", "A long life"] },
  "Who asked him ﷺ what to say that night?": { answer: "Aishah", harder: ["Tirmidhi 3513: who asked him ﷺ what to say if she knew which night was Laylat al-Qadr?", "Umar", "Bilal", "Ali"] },
  "Allah loves to pardon.": { answer: "True", harder: "In the du'a of Tirmidhi 3513, Allah is One who loves to pardon." },
  // Sahih al-Bukhari 1901.
  "Praying on Laylat al-Qadr with faith brings what?": { answer: "Past sins forgiven", harder: ["Bukhari 1901: whoever stands in prayer on Laylat al-Qadr out of faith and hoping for reward gets what?", "A long sleep", "A prize at school", "Nothing"] },
  "What must the prayer come with?": { answer: "Faith and hope for reward", harder: ["Bukhari 1901: the night prayer must be done with which two things?", "Showing off", "Loud music", "A big crowd"] },
  "This promise is for that one night's prayer.": { answer: "True", harder: "Bukhari 1901 promises forgiveness for standing in prayer on Laylat al-Qadr." },
  // Quran 97:4.
  "Who comes down on Laylat al-Qadr?": { answer: "The angels and the Spirit", harder: ["Quran 97:4: on Laylat al-Qadr, who descend by their Lord's leave with every matter?", "No one", "Only the jinn", "The stars"] },
  "How long does the night's peace last?": { answer: "Until dawn", harder: ["Quran 97:5: 'Peace it is until' when?", "Until midnight", "One hour", "Until noon"] },
  "That night is full of peace until dawn.": { answer: "True", harder: "Quran 97:5 says that night is peace until the rising of dawn." },
  // Sahih al-Bukhari 1903.
  "Besides food and drink, what should a fasting person give up?": { answer: "Lying and bad deeds", harder: ["Bukhari 1903, from Abu Hurairah: whoever does not leave what, Allah has no need of his leaving food and drink?", "Saying salam", "Reading Quran", "Smiling at people"] },
  "Whose hunger does Allah have no need of?": { answer: "The one who keeps lying and doing wrong", harder: ["Bukhari 1903: of whose leaving food and drink does Allah have no need?", "The one who reads Quran", "The one who prays", "The one who gives charity"] },
  "A real fast keeps the tongue clean too.": { answer: "True", harder: "By Bukhari 1903, a fast that keeps lying alive is not what Allah wants." },
  // Sahih al-Bukhari 1902.
  "When was he ﷺ at his most generous?": { answer: "In Ramadan", harder: ["Bukhari 1902, from Ibn Abbas: he ﷺ was the most generous of people, and most of all when?", "On journeys", "During Hajj", "In winter"] },
  "Who met him ﷺ every night of Ramadan?": { answer: "Jibril", harder: ["Bukhari 1902: who met him ﷺ every night of Ramadan?", "Mika'il", "Israfil", "Abu Bakr"] },
  "What did he ﷺ do with Jibril each night?": { answer: "Recite the Quran to him", harder: ["Bukhari 1902: each night of Ramadan, what did he ﷺ and Jibril do together?", "Count money", "Plan journeys", "Write letters"] },
  // Sahih al-Bukhari 1964.
  "Why did he ﷺ forbid fasting day and night nonstop?": { answer: "Out of mercy to the people", harder: ["Bukhari 1964, from Aishah: why did he ﷺ forbid wisal, fasting day and night without a break?", "Because it was Eid", "To make it harder", "To save food"] },
  "What did he ﷺ say about himself?": { answer: "My Lord gives me food and drink", harder: ["Bukhari 1964: told 'but you do it', what did he ﷺ say about himself?", "Fasting is only for the young", "I fast only on Mondays", "I am just like you"] },
  "Islam asks us to fast so hard that we harm ourselves.": { answer: "False", harder: "In Bukhari 1964 he ﷺ urged nonstop fasting until the body is harmed." },
  // Sahih al-Bukhari 1960.
  "What did the Ansar make for their fasting children?": { answer: "Toys of wool", harder: ["Bukhari 1960, from Rubayyi': on Ashura the Ansar's children fasted. What were they given to play with?", "Clay pots", "Sweets", "Kites"] },
  "When did the children get to eat?": { answer: "At the time of breaking the fast", harder: ["Bukhari 1960: the children played with wool toys until when?", "Whenever they cried", "At noon", "After two days"] },
  "Children can be helped to practise fasting little by little.": { answer: "True", harder: "Bukhari 1960 shows children being helped to fast, with toys to pass the time until iftar." },
  // Sahih al-Bukhari 2012.
  "Why did he ﷺ not come out on the fourth night?": { answer: "He feared it would become a duty", harder: ["Bukhari 2012, from Aishah: why did he ﷺ not come out to lead the night prayer on the fourth night?", "He was travelling", "He was angry with them", "The masjid was closed"] },
  "How many people came on the fourth night?": { answer: "More than the masjid could hold", harder: ["Bukhari 2012: on the fourth night, how many people had come?", "Just his family", "Only one man", "Nobody came"] },
  "He ﷺ cared that his ummah could keep up its worship.": { answer: "True", harder: "In Bukhari 2012 he ﷺ held back so night prayer would not become a duty too hard to keep." },
  // Sunan Abi Dawud 2344.
  "What did he ﷺ call the meal before dawn?": { answer: "The blessed morning meal", harder: ["Abu Dawud 2344, from Al-Irbad: in Ramadan he ﷺ invited him to suhur. What did he call that meal?", "The heavy dinner", "The meal of kings", "The quick night snack"] },
  "Whom did he ﷺ invite to share his suhur?": { answer: "Al-Irbad ibn Sariyah", harder: ["Abu Dawud 2344: whom did he ﷺ invite: 'Come to the blessed morning meal'?", "Abu Hurairah", "Bilal", "Anas ibn Malik"] },
  "Suhur, the meal before dawn, is a blessed meal.": { answer: "True", harder: "In Abu Dawud 2344 he ﷺ called suhur the blessed morning meal." },
  // Sunan Abi Dawud 2343.
  "What did he ﷺ say sets our fast apart?": { answer: "Eating suhur before dawn", harder: ["Abu Dawud 2343, from Amr ibn al-As: what is the difference between our fast and that of the People of the Book?", "Praying the whole night", "Eating only dates", "Fasting longer days"] },
  "From whose fasting is ours different, he ﷺ said?": { answer: "The People of the Book", harder: ["Abu Dawud 2343: eating suhur sets our fast apart from whose?", "The people of Ta'if", "The Bedouins", "The people of Yemen"] },
  "Skipping suhur on purpose is the Sunnah.": { answer: "False", harder: "By Abu Dawud 2343, leaving suhur on purpose is the Sunnah." },
  // Sunan Abi Dawud 2345.
  "Which food did he ﷺ praise for suhur?": { answer: "Dates", harder: ["Abu Dawud 2345, from Abu Hurairah: 'What a fine suhur for the believer is' what?", "Honey", "Bread", "Milk"] },
  "Who told the hadith about dates at suhur?": { answer: "Abu Hurairah", harder: ["Abu Dawud 2345: who told: what a fine suhur for the believer are dates?", "Aishah", "Anas ibn Malik", "Salman al-Farsi"] },
  "A simple suhur of dates is a good suhur.": { answer: "True", harder: "Abu Dawud 2345 praises dates as a fine suhur for the believer." },
  // Sunan Abi Dawud 2357.
  "When did he ﷺ say: thirst is gone?": { answer: "When he broke his fast", harder: ["Abu Dawud 2357, from Ibn Umar: when did he ﷺ say 'Dhahaba az-zama'u, wabtallatil-'uruq'?", "When it rained", "Before he slept", "When he woke up"] },
  "What is sure, the words at iftar say?": { answer: "The reward, if Allah wills", harder: ["Abu Dawud 2357: thirst is gone, the veins are moist, and what is sure, if Allah wills?", "The next meal", "A long life", "Good weather"] },
  "The words at iftar end with: if Allah wills.": { answer: "True", harder: "The iftar words of Abu Dawud 2357 end with: in sha' Allah." },
  // Jami at-Tirmidhi 780.
  "What should you do when invited to eat?": { answer: "Accept the invitation", harder: ["Tirmidhi 780, from Abu Hurairah: when one of you is invited to food, what should he do?", "Ask what food there is", "Send someone in your place", "Ignore it"] },
  "If you are fasting at the meal, what should you do?": { answer: "Make du'a for your host", harder: ["Tirmidhi 780: if he is fasting, 'let him pray'. What does that mean?", "Leave without a word", "Complain about the food", "Sit facing away"] },
  "A fasting person should refuse every invitation.": { answer: "False", harder: "Tirmidhi 780 says a fasting person should turn down an invitation to food." },
  // Sunan an-Nasa'i 2357.
  "Which month comes between Rajab and Ramadan?": { answer: "Sha'ban", harder: ["Nasa'i 2357, from Usamah: he ﷺ fasted much in a month people neglect, between Rajab and Ramadan. Which?", "Muharram", "Safar", "Shawwal"] },
  "Why did he ﷺ love to fast in Sha'ban?": { answer: "Deeds are taken up to Allah then", harder: ["Nasa'i 2357: why did he ﷺ love to fast in Sha'ban?", "The days are short and cool", "The dates are ripe then", "Rain falls a lot then"] },
  "People often pay little attention to Sha'ban.": { answer: "True", harder: "In Nasa'i 2357 he ﷺ called Sha'ban a month people neglect." },
  // Sunan an-Nasa'i 2107.
  "What does the caller say to the doer of good?": { answer: "Come forward", harder: ["Nasa'i 2107, from Utbah ibn Farqad: in Ramadan a caller calls, 'O seeker of good,' do what?", "Keep silent", "Slow down", "Go back home"] },
  "How often does the caller call out in Ramadan?": { answer: "Every night", harder: ["Nasa'i 2107: how often does the caller call in Ramadan?", "Only on the last night", "Once a year", "Only on Fridays"] },
  "The caller calls only on the first night of Ramadan.": { answer: "False", harder: "Nasa'i 2107 says the caller calls only on the first night of Ramadan." },
  // Sunan an-Nasa'i 2220.
  "What did he ﷺ tell Abu Umamah to take to?": { answer: "Fasting", harder: ["Nasa'i 2220: Abu Umamah asked for a deed to take from him ﷺ. What was he told?", "Trade", "Travelling", "Poetry"] },
  "What is like fasting, he ﷺ told Abu Umamah?": { answer: "Nothing at all", harder: ["Nasa'i 2220: 'Take to fasting, for there is' what 'like it'?", "A big feast", "A long journey", "A day of trade"] },
  "Abu Umamah asked him ﷺ for something to take and keep.": { answer: "True", harder: "In Nasa'i 2220 Abu Umamah asked him ﷺ for one deed he could take and hold to." },
  // Sunan Abi Dawud 1375.
  "Until when should you stay with the imam, he ﷺ said?": { answer: "Until he finishes", harder: ["Abu Dawud 1375, from Abu Dharr: whoever prays with the imam until when, a whole night of prayer is written?", "Until the first rak'ah ends", "Until half the prayer", "Until you feel tired"] },
  "What did they fear missing on that last night?": { answer: "The suhur meal", harder: ["Abu Dawud 1375: they prayed so long on that last night that they feared missing what?", "The new moon", "The adhan of Isha", "The Eid prayer"] },
  "He ﷺ called his family to pray with the people too.": { answer: "True", harder: "In Abu Dawud 1375 he ﷺ gathered his family and wives to pray with the people." },
  // Sahih al-Bukhari 2044.
  "How many days of i'tikaf did he ﷺ keep each year?": { answer: "Ten days", harder: ["Bukhari 2044, from Abu Hurairah: how many days of i'tikaf did he ﷺ do every Ramadan?", "Seven days", "Three days", "Five days"] },
  "How long was his ﷺ i'tikaf in the year he died?": { answer: "Twenty days", harder: ["Bukhari 2044: in the year he ﷺ died, how many days of i'tikaf did he do?", "Five days", "Seven days", "Ten days"] },
  "He ﷺ did more i'tikaf in his last Ramadan.": { answer: "True", harder: "Bukhari 2044 says his ﷺ i'tikaf in his last Ramadan was twice as long as before." },
  // Jami at-Tirmidhi 3545.
  "Which month should not pass before we are forgiven?": { answer: "Ramadan", harder: ["Tirmidhi 3545: 'Lost is the man upon whom' which month 'comes and goes before he is forgiven'?", "Shawwal", "Safar", "Rajab"] },
  "What should we do when his ﷺ name is mentioned?": { answer: "Send salat upon him", harder: ["Tirmidhi 3545: 'Lost is the man before whom I am mentioned' and does not do what?", "Say nothing at all", "Talk about the weather", "Change the subject"] },
  "Ramadan is a time to seek Allah's forgiveness.": { answer: "True", harder: "Tirmidhi 3545 warns of one whom Ramadan passes by without his being forgiven." },
};
