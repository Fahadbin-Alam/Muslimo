import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for the Duas topic (486 questions).
 * Each keeps the same answer and the same source as the original.
 */
export const DUAS_TIERS: Record<string, TierEntry> = {
  // Quran 33:41.
  "How much does Allah ask the believers to remember Him?": { answer: "Much, often", harder: ["Quran 33:41: 'O you who believe, remember Allah with...' how much remembrance?", "Once a year", "Only in Ramadan", "Never out loud"] },
  "When does 33:42 say to glorify Allah?": { answer: "Morning and evening", harder: ["Quran 33:41-42: remember Allah much, and glorify Him when?", "Only at noon", "Only on Fridays", "Only on Eid"] },
  "Adhkar means words of remembering Allah.": { answer: "True", harder: "By Quran 33:41, believers are told to remember Allah with much remembrance." },
  // Sunan Abi Dawud 5082.
  "How many times are the three Quls read in the morning and evening?": { answer: "Three times", harder: ["Abu Dawud 5082: Al-Ikhlas and the two surahs of refuge, morning and evening. How many times?", "Once a week", "Seven times", "Forty times"] },
  "What did the Prophet ﷺ say they would be for you?": { answer: "Enough against everything", harder: ["Abu Dawud 5082: said three times morning and evening, the Quls will be what for you?", "A way to get rich", "A cure for hunger", "A reason to skip prayer"] },
  "The three Quls are Al-Ikhlas, Al-Falaq and An-Nas.": { answer: "True", harder: "The three Quls of Abu Dawud 5082 are Qul huwa Allahu ahad and the two surahs of refuge." },
  // Sahih Muslim 2723b.
  "Who does the whole kingdom belong to, as we start the day?": { answer: "Allah", harder: ["Muslim 2723b: 'we have entered the evening and the kingdom belongs to...' whom?", "Whoever is richest", "No one at all", "The king of the land"] },
  "What do you ask for in this dhikr?": { answer: "The good of the day and what comes after", harder: ["Muslim 2723b: in the morning-evening dhikr, what do you ask Allah for?", "A new phone", "To never work again", "Fame among people"] },
  "In the evening you say Amsayna, we have reached the evening.": { answer: "True", harder: "By Muslim 2723b, in the evening the Prophet ﷺ said: we have entered the evening." },
  // Sunan Abi Dawud 5068.
  "In this dua, by whom do we live and die?": { answer: "By Allah", harder: ["Abu Dawud 5068: 'by You we reach the morning... by You we live and...' by whom do we live and die?", "By luck", "By our own strength", "By the stars"] },
  "What comes at the end of it?": { answer: "To You is the rising", harder: ["Abu Dawud 5068: 'by You we live and by You we die, and...' what ends it?", "Today is ours", "To us is the reward", "We fear no one"] },
  "The Prophet ﷺ said these words every morning and evening.": { answer: "True", harder: "By Abu Dawud 5068, the Prophet ﷺ said 'by You we live and die' in the morning and the evening." },
  // Sahih al-Bukhari 6306.
  "What did the Prophet ﷺ call this dua?": { answer: "The master of asking forgiveness", harder: ["Bukhari 6306: 'Allahumma anta rabbi...' What did he ﷺ call this way of asking forgiveness?", "The dua of travel", "The dua for rain", "The dua for food"] },
  "Someone says it in the day with firm faith and dies before evening. Where are they?": { answer: "Among the people of Paradise", harder: ["Bukhari 6306: said in the day with firm faith, then dying before evening. What is promised?", "They must repeat it first", "Nothing is promised", "Only if it was Friday"] },
  "In this dua you admit your sins to Allah.": { answer: "True", harder: "In the master dua of forgiveness of Bukhari 6306, the servant admits his sins to Allah." },
  // Jami at-Tirmidhi 3392.
  "Who asked the Prophet ﷺ for words to say morning and evening?": { answer: "Abu Bakr", harder: ["Tirmidhi 3392: who asked for words to say in the morning and evening?", "A king of Persia", "Qarun", "Abu Jahl"] },
  "From what evil does this dua seek refuge?": { answer: "Your own self and Shaytan", harder: ["Tirmidhi 3392: the dua taught to Abu Bakr seeks refuge from what evil?", "Rain and wind", "Hard homework", "Your neighbors"] },
  "He ﷺ said to say it at bedtime too.": { answer: "True", harder: "By Tirmidhi 3392, the dua taught to Abu Bakr is said morning, evening and at bedtime." },
  // Sunan Ibn Majah 3871.
  "What two things does this dua ask for first?": { answer: "Pardon and well-being", harder: ["Ibn Majah 3871: the dua he ﷺ never left begins by asking for which two things?", "Gold and silver", "Power and fame", "Sleep and food"] },
  "How often did the Prophet ﷺ say it?": { answer: "Every morning and evening, never leaving it", harder: ["Ibn Majah 3871: 'never left these supplications.' How often did he ﷺ say them?", "Only when ill", "Only on Hajj", "Once in his life"] },
  "The dua asks Allah to guard you from every side.": { answer: "True", harder: "The morning-evening dua of Ibn Majah 3871 asks Allah to guard you from every side." },
  // Sunan Abi Dawud 5088.
  "How many times do you say Bismillahil-ladhi la yadurru?": { answer: "Three times", harder: ["Abu Dawud 5088: 'Bismillahil-ladhi la yadurru...' how many times?", "A thousand times", "Once a year", "Ten times"] },
  "With Allah's name, what can harm on earth or in the sky?": { answer: "Nothing", harder: ["Abu Dawud 5088: 'with whose name nothing on earth or in heaven...' can do what?", "Only animals", "Anything at all", "Only big things"] },
  "Aban, who told the hadith, was struck on a day he forgot to say it.": { answer: "True", harder: "In Abu Dawud 5088, its narrator Aban was struck by affliction on a day he did not say it." },
  // Sahih Muslim 2692.
  "How many times do you say Subhanallahi wa bihamdih here?": { answer: "100 times", harder: ["Muslim 2692: Subhanallahi wa bihamdihi morning and evening, how many times?", "7 times", "3 times", "10 times"] },
  "Who brings better on the Day of Judgment?": { answer: "Only one who said the same or more", harder: ["Muslim 2692: said 100 times, who brings better on the Day of Resurrection?", "Anyone who is rich", "Anyone older", "No one is better"] },
  "Subhanallahi wa bihamdih means glory be to Allah, and all praise is His.": { answer: "True", harder: "The dhikr of Muslim 2692, Subhanallahi wa bihamdih, means glory and all praise belong to Allah." },
  // Sahih al-Bukhari 3293.
  "Saying it 100 times in a day is like freeing how many slaves?": { answer: "Ten", harder: ["Bukhari 3293: la ilaha illallah 100 times in a day equals freeing how many slaves?", "A hundred", "Two", "One"] },
  "What happens to 100 bad deeds?": { answer: "They are wiped away", harder: ["Bukhari 3293: 100 good deeds are written, and what happens to 100 bad deeds?", "They are moved to a friend", "They double", "They stay the same"] },
  "This dhikr guards you from Shaytan until the evening.": { answer: "True", harder: "By Bukhari 3293, saying it 100 times protects you from Satan that day until the evening." },
  // Sahih Muslim 2709a.
  "What stung the man in this hadith?": { answer: "A scorpion", harder: ["Muslim 2709a: what stung the man during the night?", "A bee", "A snake", "A spider"] },
  "When should he have said these words?": { answer: "In the evening", harder: ["Muslim 2709a: 'had you said in the...' when, it would not have harmed you?", "At noon only", "On Eid only", "After the sting"] },
  "You seek refuge in Allah's perfect words from the evil of what He created.": { answer: "True", harder: "By Muslim 2709a, you seek refuge in Allah's perfect words from the evil of what He created." },
  // Sahih al-Bukhari 2311.
  "Who stays with you after you read Ayat al-Kursi in bed?": { answer: "A guard from Allah", harder: ["Bukhari 2311: recite Ayat al-Kursi at bedtime and who stays with you till morning?", "A thief", "Your shadow", "No one"] },
  "Who first told Abu Hurairah about it?": { answer: "A thief who kept coming back", harder: ["Bukhari 2311: 'he told you the truth, though he is a liar.' Who told Abu Hurairah?", "A merchant", "A king", "His mother"] },
  "Ayat al-Kursi is ayah 255 of Al-Baqarah.": { answer: "True", harder: "Ayat al-Kursi, which Bukhari 2311 says to read at bedtime, is ayah 255 of Al-Baqarah." },
  // Sahih al-Bukhari 5009.
  "Which ayahs are enough for you when read at night?": { answer: "The last two of Al-Baqarah", harder: ["Bukhari 5009: which ayahs, recited at night, are enough for you?", "The middle of Al-Kahf", "The first two of Al-Fatihah", "Any ayah of Yusuf"] },
  "What do those two ayahs do for the one who reads them?": { answer: "They are enough for him", harder: ["Bukhari 5009: the last two ayahs of Al-Baqarah at night do what for the reader?", "They end his fast", "Nothing", "They make him rich"] },
  "These ayahs end with: help us against the people who disbelieve.": { answer: "True", harder: "The last two ayahs of Al-Baqarah in Bukhari 5009 end: help us against the people who disbelieve." },
  // Sahih al-Bukhari 5017.
  "Where did the Prophet ﷺ start wiping with his hands?": { answer: "His head and face", harder: ["Bukhari 5017: after blowing into his hands and reciting, where did he ﷺ begin wiping?", "His back only", "His feet", "His knees"] },
  "How many times did he do it?": { answer: "Three times", harder: ["Bukhari 5017: he ﷺ recited, blew and wiped his body how many times?", "Once", "Seven times", "Ten times"] },
  "He read Al-Ikhlas, Al-Falaq and An-Nas into his hands.": { answer: "True", harder: "By Bukhari 5017, he ﷺ recited Al-Ikhlas, Al-Falaq and An-Nas into his cupped hands." },
  // Sahih al-Bukhari 3705.
  "What did Fatimah ask her father ﷺ for?": { answer: "A servant", harder: ["Bukhari 3705: what did Fatimah ask for, that he ﷺ gave something better than?", "Money for a trip", "A new house", "A horse"] },
  "How many times is Allahu Akbar said at bedtime?": { answer: "34", harder: ["Bukhari 3705: at bedtime, Allahu Akbar is said how many times?", "40", "10", "100"] },
  "He ﷺ said these words are better than a servant.": { answer: "True", harder: "By Bukhari 3705, the bedtime tasbih is better for you than a servant." },
  // Sahih al-Bukhari 6324.
  "What does Bismika Allahumma amutu wa ahya mean?": { answer: "In Your name, O Allah, I die and I live", harder: ["Bukhari 6324: what does 'Bismika Allahumma amutu wa ahya' mean?", "Good night, everyone", "I am very tired", "Wake me at Fajr"] },
  "When did the Prophet ﷺ say it?": { answer: "When he lay down to sleep", harder: ["Bukhari 6324: when did he ﷺ say 'in Your name, O Allah, I die and I live'?", "When he ate", "When he traveled", "When he sneezed"] },
  "The dua calls sleep a kind of dying.": { answer: "True", harder: "By Bukhari 6324, the bedtime dua speaks of sleep as a kind of dying." },
  // Sahih al-Bukhari 247.
  "Which side did the Prophet ﷺ say to lie on?": { answer: "The right side", harder: ["Bukhari 247: after wudu, on which side should you lie down?", "The left side", "On your back", "Face down"] },
  "What do you do before lying down, in this hadith?": { answer: "Make wudu as for prayer", harder: ["Bukhari 247: before lying down and saying the dua, what do you do?", "Eat a big meal", "Watch a video", "Nothing at all"] },
  "Whoever dies that night after saying it dies upon the fitrah.": { answer: "True", harder: "By Bukhari 247, whoever says it and dies that night dies upon the fitrah." },
  // Sahih al-Bukhari 6312.
  "What is the first thing to say when you wake up?": { answer: "Praise Allah who gave us life again", harder: ["Bukhari 6312: on waking, what did he ﷺ say first?", "Check your phone", "Complain about the cold", "Nothing at all"] },
  "What does wa ilayhin-nushur mean?": { answer: "And to Him is the rising", harder: ["Bukhari 6312: 'who gave us life after He made us die, wa ilayhin-nushur.' What does the end mean?", "And I am hungry", "And it is morning", "And peace be on you"] },
  "The Prophet ﷺ thanked Allah as soon as he woke.": { answer: "True", harder: "By Bukhari 6312, the Prophet ﷺ praised Allah when he got up from sleep." },
  // Sahih al-Bukhari 5376.
  "What do you say before eating?": { answer: "Bismillah", harder: ["Bukhari 5376: 'O boy, mention the name of Allah...' What do you say before eating?", "Alhamdulillah", "Allahu Akbar", "Subhanallah"] },
  "Which hand do you eat with?": { answer: "The right hand", harder: ["Bukhari 5376: 'eat with your...' which hand?", "The left hand", "Either, it does not matter", "Both at once"] },
  "You should eat from what is nearest to you on the plate.": { answer: "True", harder: "By Bukhari 5376, the boy was told to eat from what is near him." },
  // Sunan Abi Dawud 3767.
  "You remember halfway through the meal that you forgot Bismillah. What do you say?": { answer: "Bismillahi awwalahu wa akhirah", harder: ["Abu Dawud 3767: you forgot Allah's name at the start of the meal. What do you say?", "Nothing, it is too late", "Start the meal again", "Alhamdulillah only"] },
  "What does awwalahu wa akhirah mean?": { answer: "At its start and its end", harder: ["Abu Dawud 3767: 'Bismillahi awwalahu wa akhirah' means what?", "Thank you for the food", "I am full now", "Pass the bread"] },
  "Forgetting Bismillah means the meal can never be blessed.": { answer: "False", harder: "By Abu Dawud 3767, if you forget Bismillah at the start, nothing can be said later." },
  // Sahih al-Bukhari 5458.
  "When did the Prophet ﷺ say Al-hamdu lillahi kathiran tayyiban?": { answer: "When his meal was finished", harder: ["Bukhari 5458: when was 'Al-hamdu lillahi kathiran tayyiban mubarakan fih' said?", "When it rained", "Before sleeping", "On a journey"] },
  "What kind of praise is it?": { answer: "Much, good and blessed", harder: ["Bukhari 5458: what kind of praise does the dua after eating give?", "Short and quiet", "Only on Eid", "Loud and boastful"] },
  "Thanking Allah after food is a sunnah.": { answer: "True", harder: "By Bukhari 5458, the Prophet ﷺ praised Allah when his meal was taken away." },
  // Sahih al-Bukhari 142.
  "Before going into the toilet, what do you ask Allah for?": { answer: "Refuge from evil things and evil ones", harder: ["Bukhari 142: going into the toilet, he ﷺ sought refuge from what?", "A long life", "A good meal", "Rain"] },
  "What do you say when you come out?": { answer: "Ghufranak", harder: ["After leaving the toilet, which word asking forgiveness do you say?", "Amin", "Allahu Akbar", "Bismillah"] },
  "Ghufranak means: I ask Your forgiveness.": { answer: "True", harder: "Ghufranak, said after leaving the toilet, means: I ask Your forgiveness." },
  // Sunan Abi Dawud 5095.
  "What is said to the one who says this dua leaving home?": { answer: "You are guided, defended and protected", harder: ["Abu Dawud 5095: 'I trust in Allah...' leaving home. What is said to him?", "Nothing is said", "You will be late", "Go back inside"] },
  "What does tawakkaltu 'alallah mean?": { answer: "I trust in Allah", harder: ["Abu Dawud 5095: 'Bismillah, tawakkaltu 'alallah.' What does tawakkaltu 'alallah mean?", "I am hungry", "I forgot my keys", "I am going out"] },
  "The devils move away from the one who says it.": { answer: "True", harder: "By Abu Dawud 5095, the devils move away from the one who says the leaving-home dua." },
  // Sahih Muslim 713a.
  "Entering the mosque, you ask Allah to open the doors of what?": { answer: "His mercy", harder: ["Muslim 713a: entering the mosque, 'O Allah, open for me the doors of...' what?", "The market", "The school", "His kitchen"] },
  "Leaving the mosque, you ask Allah for what?": { answer: "His bounty", harder: ["Muslim 713a: leaving the mosque, 'O Allah, I ask You of Your...' what?", "His anger", "A faster car", "Nothing"] },
  "The same dua is said going in and going out.": { answer: "False", harder: "By Muslim 713a, the same words are said entering and leaving the mosque." },
  // Sahih al-Bukhari 6224.
  "You sneeze. What do you say?": { answer: "Alhamdulillah", harder: ["Bukhari 6224: when you sneeze, what should you say?", "Bismillah", "Astaghfirullah", "Nothing"] },
  "Your friend sneezes and says Alhamdulillah. What do you say?": { answer: "Yarhamukallah", harder: ["Bukhari 6224: the sneezer says Al-hamdu lillah. What does his brother say?", "Inna lillah", "Alhamdulillah too", "Bless you only"] },
  "The sneezer answers: Yahdikumullahu wa yuslihu balakum.": { answer: "True", harder: "By Bukhari 6224, the sneezer replies: may Allah guide you and set your affairs right." },
  // Sahih al-Bukhari 614.
  "What does the Prophet ﷺ promise the one who says this dua?": { answer: "His intercession on the Last Day", harder: ["Bukhari 614: after the adhan, 'Lord of this perfect call...' What is promised?", "Good grades", "No more prayers", "A free meal"] },
  "While the adhan is called, what do you say?": { answer: "The same words as the caller", harder: ["Hearing the adhan, before the dua of Bukhari 614, what do you say?", "Only Amin", "Nothing, just wait", "Your own song"] },
  "The dua asks Allah to raise the Prophet ﷺ to the praised station.": { answer: "True", harder: "The dua of Bukhari 614 asks Allah to raise the Prophet ﷺ to the praised station He promised." },
  // Sahih Muslim 591.
  "How many times did he ﷺ say Astaghfirullah after the prayer?": { answer: "Three", harder: ["Muslim 591: finishing the prayer, how many times did he ﷺ ask forgiveness?", "One", "Ten", "Thirty-three"] },
  "What does Allahumma antas-salam mean?": { answer: "O Allah, You are Peace", harder: ["Muslim 591: 'Allahumma antas-salam wa minkas-salam.' What does it mean?", "Allah is the Greatest", "O Allah, I am tired", "Peace be on the people"] },
  "Asking forgiveness right after praying is a sunnah.": { answer: "True", harder: "By Muslim 591, he ﷺ asked forgiveness three times as soon as he finished the prayer." },
  // Sahih Muslim 1342.
  "What did he ﷺ say three times before the travel dua?": { answer: "Allahu Akbar", harder: ["Muslim 1342: mounting his camel for a journey, what did he ﷺ say three times?", "Bismillah", "Amin", "Subhanallah"] },
  "The travel dua thanks Allah for making what serve us?": { answer: "Our ride", harder: ["Muslim 1342: 'glory to Him who made this serve us.' What is 'this'?", "Our friends", "The weather", "Our money"] },
  "These words are also in the Quran, in Surah Az-Zukhruf.": { answer: "True", harder: "The travel dua of Muslim 1342 is also in the Quran, in Surah Az-Zukhruf." },
  // Sahih al-Bukhari 3616.
  "What does tahurun mean in this dua?": { answer: "A cleansing", harder: ["Bukhari 3616: 'la ba'sa, tahurun in sha Allah.' What does tahurun mean?", "A sleep", "A journey", "A punishment"] },
  "When did he ﷺ say La ba'sa, tahurun in sha Allah?": { answer: "When visiting someone ill", harder: ["Bukhari 3616: when did he ﷺ say 'no harm, it is a cleansing, if Allah wills'?", "At a wedding", "When it rained", "At the market"] },
  "Visiting the sick is part of the Prophet's ﷺ way.": { answer: "True", harder: "By Bukhari 3616, the Prophet ﷺ visited the sick and made dua for them." },
  // Sahih al-Bukhari 3282.
  "What word takes anger away, as the Prophet ﷺ said?": { answer: "A'udhu billahi minash-shaytan", harder: ["Bukhari 3282: one man grew red with anger. Which word did he ﷺ say would take it away?", "Shouting louder", "Alhamdulillah", "Nothing helps"] },
  "What does A'udhu billah mean?": { answer: "I seek refuge in Allah", harder: ["Bukhari 3282: 'A'udhu billahi minash-shaytan.' What does A'udhu billah mean?", "Leave me alone", "Thank you", "I am the strongest"] },
  "Anger can come from Shaytan.": { answer: "True", harder: "By Bukhari 3282, seeking refuge from Satan takes away anger." },
  // Sahih al-Bukhari 6389.
  "Which dua did the Prophet ﷺ make most often?": { answer: "Rabbana atina fid-dunya hasanah", harder: ["Bukhari 6389: which dua did the Prophet ﷺ make most often?", "Rabbi zidni 'ilma", "The dua of travel", "The dua for rain"] },
  "What does it ask for?": { answer: "Good in this world and the next", harder: ["Bukhari 6389: 'Rabbana atina...' asks Allah for what?", "Only a long life", "Only good weather", "Only money"] },
  "This dua also asks to be saved from the Fire.": { answer: "True", harder: "By Bukhari 6389, his most frequent dua asks to be saved from the punishment of the Fire." },
  // Quran 20:114.
  "What does Rabbi zidni 'ilma ask for?": { answer: "More knowledge", harder: ["Quran 20:114: 'my Lord, increase me in...' what?", "More games", "More sleep", "More food"] },
  "A good time to say Rabbi zidni 'ilma is...": { answer: "Before studying", harder: ["Quran 20:114 teaches 'Rabbi zidni 'ilma'. When is a good time to say it?", "Only when sick", "Only at night", "Never out loud"] },
  "Allah Himself taught this dua in the Quran.": { answer: "True", harder: "Rabbi zidni 'ilma is taught by Allah Himself in Quran 20:114." },
  // Quran 3:8.
  "What does the dua in 3:8 ask Allah to keep steady?": { answer: "Our hearts", harder: ["Quran 3:8: 'Our Lord, let not our... deviate.' What?", "Our houses", "Our money", "The weather"] },
  "After what should our hearts not swerve?": { answer: "After Allah guided us", harder: ["Quran 3:8: our hearts should not swerve after what?", "After dinner", "After school", "After a holiday"] },
  "The dua also asks Allah for mercy.": { answer: "True", harder: "By Quran 3:8, the dua asks Allah to grant us mercy from Himself." },
  // Quran 17:24.
  "Who is the dua in 17:24 for?": { answer: "Your parents", harder: ["Quran 17:24: 'my Lord, have mercy upon them as they brought me up.' Who are they?", "Your teacher", "Your friends", "Your neighbors"] },
  "Why do we ask mercy for them?": { answer: "They raised us when we were small", harder: ["Quran 17:24: 'have mercy on them as...' why?", "They asked us to", "They are rich", "They are famous"] },
  "The ayah also says to be humble with your parents.": { answer: "True", harder: "By Quran 17:24, you lower to your parents the wing of humility out of mercy." },
  // Quran 25:74.
  "What does 25:74 ask our families to be?": { answer: "A joy to our eyes", harder: ["Quran 25:74: from our spouses and children, grant us what?", "Rich and famous", "Far away", "Always quiet"] },
  "Who makes this dua in Surah Al-Furqan?": { answer: "The servants of the Most Merciful", harder: ["Quran 25:74: in Al-Furqan, who make this dua?", "The hypocrites", "The angels only", "The people of Firawn"] },
  "The dua asks to be leaders of the God-fearing.": { answer: "True", harder: "By Quran 25:74, the dua asks Allah to make us leaders for the righteous." },
  // Quran 20:25.
  "Who first made the dua Rabbish-rah li sadri?": { answer: "Musa", harder: ["Quran 20:25: 'my Lord, expand for me my chest.' Who said it?", "Yunus", "Adam", "Ibrahim"] },
  "Where was Musa about to go?": { answer: "To Firawn", harder: ["Quran 20:25: Musa asked for an open chest. Where was he being sent?", "To Makkah", "To the market", "To sleep"] },
  "A good time for this dua is before a hard talk or a test.": { answer: "True", harder: "Quran 20:25-28, Musa's dua for ease of speech, fits before a hard talk or a test." },
  // Quran 7:23.
  "Who said Rabbana zalamna anfusana?": { answer: "Adam and Hawwa", harder: ["Quran 7:23: 'Our Lord, we have wronged ourselves.' Who said it?", "Musa and Harun", "The people of Ad", "Firawn and Haman"] },
  "What did they admit?": { answer: "We have wronged ourselves", harder: ["Quran 7:23: 'if You do not forgive us...' What did they admit first?", "We want more fruit", "We did nothing wrong", "Shaytan is innocent"] },
  "Saying sorry to Allah is the way of Adam.": { answer: "True", harder: "By Quran 7:23, Adam and Hawwa said sorry to Allah and asked His forgiveness." },
  // Quran 21:87.
  "Where was Yunus when he made this dua?": { answer: "In the darkness, inside the whale", harder: ["Quran 21:87: 'he called out within the darknesses.' Where was Yunus?", "On a mountain", "In a palace", "In the market"] },
  "What did Allah do after his dua?": { answer: "Answered him and saved him", harder: ["Quran 21:87-88: after 'la ilaha illa anta, subhanaka', what did Allah do?", "Sent a storm", "Made him king", "Ignored him"] },
  "Yunus admitted his own wrong in the dua.": { answer: "True", harder: "By Quran 21:87, Yunus said: indeed I have been of the wrongdoers." },
  // Quran 13:28.
  "In what do hearts find rest, says 13:28?": { answer: "The remembrance of Allah", harder: ["Quran 13:28: 'surely in the remembrance of Allah...' what finds rest?", "Wealth", "Family", "Travel"] },
  "You feel worried before an exam. What does this ayah point you to?": { answer: "Remembering Allah", harder: ["Quran 13:28: hearts find rest in remembering Allah. You're worried before an exam. What helps?", "Skipping prayer", "Giving up", "Shouting"] },
  "Dhikr is only for the mosque.": { answer: "False", harder: "By Quran 13:28, hearts find rest in remembering Allah only inside the mosque." },
  // Quran 2:152.
  "What does Allah promise the one who remembers Him?": { answer: "He will remember them", harder: ["Quran 2:152: 'so remember Me...' what does Allah promise?", "Wealth", "A long life", "Ease from all tests"] },
  "What else does 2:152 ask of us?": { answer: "To be thankful to Allah", harder: ["Quran 2:152: 'be grateful to Me and do not...' what?", "To be proud", "To be lazy", "To complain"] },
  "Allah remembers the one who remembers Him.": { answer: "True", harder: "By Quran 2:152, Allah remembers the one who remembers Him." },
  // Sahih al-Bukhari 6407.
  "The one who remembers Allah is like what?": { answer: "A living person", harder: ["Bukhari 6407: one who remembers his Lord and one who does not are like what?", "A sleeping person", "A dead person", "A lost person"] },
  "And the one who never remembers Him?": { answer: "Like the dead", harder: ["Bukhari 6407: the one who does not remember his Lord is like what?", "Like a teacher", "Like a king", "Like a bird"] },
  "Dhikr keeps the heart alive.": { answer: "True", harder: "By Bukhari 6407, the one who remembers his Lord is like the living." },
  // Sahih al-Bukhari 6406.
  "Where are the two words heavy?": { answer: "On the Scale", harder: ["Bukhari 6406: 'light on the tongue, heavy...' where?", "In your pocket", "In your bag", "Nowhere"] },
  "Which pair are the two words?": { answer: "Subhanallahi wa bihamdih, Subhanallahil-'azim", harder: ["Bukhari 6406: which are the two words loved by the Most Merciful?", "Insha'Allah, Masha'Allah", "Bismillah, Amin", "Salam, Shukran"] },
  "These words are loved by the Most Merciful.": { answer: "True", harder: "By Bukhari 6406, the two words are loved by the Most Merciful." },
  // Sahih Muslim 2137a.
  "How many words are most loved to Allah in this hadith?": { answer: "Four", harder: ["Muslim 2137a: how many words are most beloved to Allah?", "Two", "Ten", "Seven"] },
  "Which of these is one of them?": { answer: "Allahu Akbar", harder: ["Muslim 2137a: Subhanallah, Al-hamdu lillah, La ilaha illallah and which other?", "Good morning", "Thank you", "Well done"] },
  "You must say them in one fixed order.": { answer: "False", harder: "By Muslim 2137a, the four beloved words must be said in one fixed order." },
  // Sunan Ibn Majah 3809.
  "Where do the words of dhikr go, he ﷺ said?": { answer: "Around the Throne", harder: ["Ibn Majah 3809: tasbih, tahlil and tahmid go where?", "Around the moon", "Across the seas", "Over the mountains"] },
  "What do the words of dhikr hum like, he ﷺ said?": { answer: "Like bees", harder: ["Ibn Majah 3809: going around the Throne, the words of dhikr hum like what?", "Like birds", "Like the wind", "Like a river"] },
  "The words of dhikr mention the one who said them.": { answer: "True", harder: "By Ibn Majah 3809, the words of dhikr around the Throne keep mentioning the one who said them." },
  // Sunan Abi Dawud 1501.
  "Why count dhikr on the fingers, he ﷺ said?": { answer: "They will be asked and made to speak", harder: ["Abu Dawud 1501: 'count them on your fingers, for...' why?", "They will grow much longer", "They will turn into gold", "They will feel much warmer"] },
  "Whom did he ﷺ tell to count dhikr on their fingers?": { answer: "The emigrant women", harder: ["Abu Dawud 1501: Yusayrah reported he ﷺ told whom to count dhikr on their fingers?", "The Persian kings", "The Yemeni traders", "The desert poets"] },
  "Counting dhikr on our fingers is a good way to count it.": { answer: "True", harder: "By Abu Dawud 1501, counting dhikr on the fingers is taught because the fingers will be made to speak." },
  // Sahih al-Bukhari 6384.
  "La hawla wa la quwwata illa billah is a treasure of where?": { answer: "Paradise", harder: ["Bukhari 6384: he ﷺ told Abu Musa it is a treasure of where?", "The desert", "The ocean", "A king's palace"] },
  "What does it mean?": { answer: "No might and no power except with Allah", harder: ["Bukhari 6384: 'La hawla wa la quwwata illa billah' means what?", "I am strong alone", "Let us go home", "Peace be upon you"] },
  "On that journey he ﷺ also said: Allah is not deaf or far away.": { answer: "True", harder: "In the journey of Bukhari 6384 he ﷺ said: you are not calling one who is deaf or far away." },
  // Sahih Muslim 408.
  "Send one salawat on the Prophet ﷺ. How many blessings does Allah send you?": { answer: "Ten", harder: ["Muslim 408: one blessing upon him ﷺ brings how many from Allah?", "None", "One", "Two"] },
  "Which words send salawat?": { answer: "Allahumma salli 'ala Muhammad", harder: ["Muslim 408: which words send blessings upon the Prophet ﷺ?", "Astaghfirullah", "Amin", "Alhamdulillah"] },
  "Writing ﷺ after his name is a short salawat.": { answer: "True", harder: "Writing ﷺ after his name is a short salawat, sending blessings as in Muslim 408." },
  // Sahih Muslim 2702a.
  "How many times a day did the Prophet ﷺ ask forgiveness?": { answer: "A hundred", harder: ["Muslim 2702a: 'a shade over my heart.' How many times a day did he ﷺ seek forgiveness?", "Once", "Five", "Seven"] },
  "Which word asks Allah for forgiveness?": { answer: "Astaghfirullah", harder: ["Muslim 2702a: he ﷺ sought forgiveness a hundred times a day. Which word asks it?", "Masha'Allah", "Subhanallah", "Alhamdulillah"] },
  "Only people with big sins need istighfar.": { answer: "False", harder: "By Muslim 2702a, istighfar is only needed by those with big sins." },
  // Sahih al-Bukhari 6369.
  "What two feelings does this dua start with?": { answer: "Worry and grief", harder: ["Bukhari 6369: the dua begins seeking refuge from which two?", "Joy and fun", "Hunger and thirst", "Heat and cold"] },
  "Which of these does it also seek refuge from?": { answer: "Laziness", harder: ["Bukhari 6369: worry, grief, weakness and what else?", "Prayer", "Reading", "Kindness"] },
  "The Prophet ﷺ used to say this dua himself.": { answer: "True", harder: "By Bukhari 6369, the Prophet ﷺ used to say this dua of refuge himself." },
  // Sahih al-Bukhari 6346.
  "When did the Prophet ﷺ say this dhikr?": { answer: "In times of distress", harder: ["Bukhari 6346: 'no god but Allah, the Mighty, the Forbearing.' When did he ﷺ say it?", "On Eid only", "At weddings", "When eating"] },
  "Allah is called Lord of what in it?": { answer: "The mighty Throne", harder: ["Bukhari 6346: Lord of the heavens, the earth and what?", "The palace", "The ships", "The market"] },
  "In hard times he ﷺ turned to praising Allah.": { answer: "True", harder: "By Bukhari 6346, in distress he ﷺ turned to praising Allah." },
  // Quran 14:40.
  "What did Ibrahim ask for himself and his children?": { answer: "To keep up the prayer", harder: ["Quran 14:40: 'my Lord, make me one who...' what, me and my descendants?", "To be rich", "To be famous", "To be kings"] },
  "Whom did Ibrahim include in his du'a?": { answer: "His descendants", harder: ["Quran 14:40: 'make me one who establishes prayer, and from...' whom?", "Only his friends", "No one", "Only himself"] },
  "Ibrahim ended by asking Allah to accept his du'a.": { answer: "True", harder: "By Quran 14:40, Ibrahim ended: our Lord, accept my supplication." },
  // Quran 71:28.
  "Whom did Nuh ask forgiveness for right after himself?": { answer: "His parents", harder: ["Quran 71:28: 'my Lord, forgive me and...' whom next?", "His enemies", "Only his ship", "No one"] },
  "Who else is in Nuh's du'a?": { answer: "All believing men and women", harder: ["Quran 71:28: besides himself, his parents and his house, whom does Nuh's dua include?", "Only animals", "Only kings", "Only his crew"] },
  "We can make du'a for all the believers, not only ourselves.": { answer: "True", harder: "By Quran 71:28, Nuh made dua for all believing men and women, not only himself." },
  // Quran 21:89.
  "What did Zakariyya ask Allah not to do?": { answer: "Leave him alone", harder: ["Quran 21:89: 'my Lord, do not...' what, Zakariyya asked?", "Send him far", "Make him rich", "Give him rain"] },
  "Which son did Allah give Zakariyya?": { answer: "Yahya", harder: ["Quran 21:89-90: Zakariyya asked not to be left alone. Which son was he given?", "Harun", "Ishaq", "Yusuf"] },
  "Zakariyya was very old, yet he still asked Allah.": { answer: "True", harder: "Zakariyya, who made the dua of Quran 21:89, was very old yet still asked Allah." },
  // Quran 21:83.
  "What did Ayyub tell Allah in his du'a?": { answer: "Harm has touched me", harder: ["Quran 21:83: what did Ayyub tell his Lord in his du'a?", "I am angry", "Nothing at all", "I give up"] },
  "How did Ayyub describe Allah?": { answer: "The Most Merciful of the merciful", harder: ["Quran 21:83: 'and You are...' how did Ayyub describe Allah?", "The far away", "The one who forgets", "The one who is tired"] },
  "Ayyub complained to Allah, not to people.": { answer: "True", harder: "By Quran 21:83, Ayyub took his complaint to his Lord, not to people." },
  // Quran 27:19.
  "What made Sulayman smile before his du'a?": { answer: "The words of an ant", harder: ["Quran 27:19: 'so he smiled, amused at her words.' Whose words?", "A joke from a bird", "A gift of gold", "A song"] },
  "What did Sulayman ask Allah to help him be?": { answer: "Grateful", harder: ["Quran 27:19: 'my Lord, enable me to be...' what?", "Famous", "Feared", "Lazy"] },
  "Sulayman thanked Allah for blessings on his parents too.": { answer: "True", harder: "By Quran 27:19, Sulayman thanked Allah for His favour on him and his parents." },
  // Quran 12:101.
  "How did Yusuf ask to leave this world?": { answer: "As a Muslim", harder: ["Quran 12:101: 'let me die...' how, Yusuf asked?", "As a rich man", "As a famous man", "As a king"] },
  "Whom did Yusuf ask to be joined with?": { answer: "The righteous", harder: ["Quran 12:101: 'and join me with...' whom?", "The kings", "The traders", "The soldiers"] },
  "Yusuf said his du'a when Allah had given him power and his family back.": { answer: "True", harder: "Yusuf's dua in Quran 12:101 came after Allah gave him power and his family back." },
  // Quran 2:128.
  "What did Ibrahim and Isma'il ask Allah to make them?": { answer: "Muslims who submit to Him", harder: ["Quran 2:128: 'our Lord, make us...' what?", "Owners of much gold", "Leaders of great armies", "Kings of the earth"] },
  "Whom else did they ask Allah to make a Muslim nation?": { answer: "Their descendants", harder: ["Quran 2:128: 'and from our...' whom, a nation submitting to You?", "Their hired workers", "Their travel companions", "Their honored guests"] },
  "They also asked Allah to show them their rites of worship.": { answer: "True", harder: "By Quran 2:128, Ibrahim and Isma'il asked: show us our rites." },
  // Quran 14:35.
  "What did Ibrahim ask Allah to make Makkah?": { answer: "A safe city", harder: ["Quran 14:35: 'my Lord, make this city...' what?", "A city of kings", "A city by the sea", "A city of towers"] },
  "Whom did Ibrahim include with himself in this du'a?": { answer: "His sons", harder: ["Quran 14:35: 'keep me and my...' whom away from idols?", "His guests", "His neighbors", "His helpers"] },
  "Ibrahim asked Allah to keep him away from worshipping idols.": { answer: "True", harder: "By Quran 14:35, Ibrahim asked Allah to keep him and his sons from worshipping idols." },
  // Quran 37:100.
  "What did Ibrahim ask his Lord to grant him?": { answer: "A child", harder: ["Quran 37:100: 'my Lord, grant me...' what?", "A grand palace", "An army", "A treasure"] },
  "Which words begin Ibrahim's du'a for a child?": { answer: "Rabbi hab li", harder: ["Quran 37:100: which words begin 'grant me a child from among the righteous'?", "Rabbana atina", "Rabbi zidni", "Rabbana la tuzigh"] },
  "Ibrahim asked for a child who would be righteous.": { answer: "True", harder: "By Quran 37:100, Ibrahim asked for a child from among the righteous." },
  // Quran 28:21.
  "What did Musa ask Allah to save him from?": { answer: "The wrongdoing people", harder: ["Quran 28:21: 'my Lord, save me from...' whom?", "The desert heat", "The wild beasts", "The long road"] },
  "How did Musa feel as he left the city?": { answer: "Afraid and watchful", harder: ["Quran 28:21: how did Musa leave the city?", "Full and sleepy", "Calm and rested", "Happy and relaxed"] },
  "When Musa was afraid, he turned to his Lord.": { answer: "True", harder: "By Quran 28:21, afraid and on his guard, Musa turned to his Lord." },
  // Quran 11:47.
  "What did Nuh seek refuge from?": { answer: "Asking what he did not know", harder: ["Quran 11:47: Nuh sought refuge in Allah from what?", "Asking for a big house", "Asking for more gold", "Asking for a long rest"] },
  "Without Allah's forgiveness and mercy, Nuh said he would be among whom?": { answer: "The losers", harder: ["Quran 11:47: 'unless You forgive me and have mercy on me, I will be among...' whom?", "The kings", "The rich", "The strong"] },
  "Nuh asked Allah to forgive him and have mercy on him.": { answer: "True", harder: "By Quran 11:47, Nuh asked his Lord for forgiveness and mercy." },
  // Quran 23:26.
  "What did Nuh say his people had done to him?": { answer: "Denied him", harder: ["Quran 23:26: 'my Lord, help me, because they have...' what?", "Crowned him", "Paid him", "Honored him"] },
  "Which words begin Nuh's du'a in Quran 23:26?": { answer: "Rabbin-surni", harder: ["Quran 23:26: 'my Lord, help me.' Which words begin it?", "Rabbi hab li", "Rabbana atina", "Rabbi zidni"] },
  "Nuh turned to his Lord when his people denied him.": { answer: "True", harder: "By Quran 23:26, Nuh asked his Lord for help because his people denied him." },
  // Quran 26:118.
  "Along with himself, whom did Nuh ask Allah to save?": { answer: "The believers with him", harder: ["Quran 26:118: 'save me and...' whom?", "The chiefs of his people", "The rich of his people", "The strong of his people"] },
  "How did Nuh ask Allah to judge between him and them?": { answer: "Decisively", harder: ["Quran 26:118: 'judge between me and them...' how?", "Slowly", "Secretly", "Gently"] },
  "Before this du'a, Nuh said that his people had denied him.": { answer: "True", harder: "By Quran 26:117-118, Nuh said 'my people have denied me' before asking for judgment." },
  // Quran 18:10.
  "Where did the youths shelter before their du'a?": { answer: "In a cave", harder: ["Quran 18:10: where did the youths take shelter before their dua?", "In a palace", "On a ship", "In a market"] },
  "What did they ask for?": { answer: "Mercy and right guidance", harder: ["Quran 18:10: sheltering in the cave, what did the youths ask their Lord for?", "Gold and silver", "An army", "Fame"] },
  "The youths of the cave were young people who held on to faith.": { answer: "True", harder: "The youths of Quran 18:10 were young people who held on to faith." },
  // Quran 59:10.
  "Whom do we ask forgiveness for in Quran 59:10?": { answer: "Our brothers in faith before us", harder: ["Quran 59:10: 'forgive us and our brothers who...' what?", "No one", "Only ourselves", "Only the rich"] },
  "What do we ask Allah to keep out of our hearts?": { answer: "Resentment toward believers", harder: ["Quran 59:10: what is asked to be kept out of our hearts, and toward whom?", "Love", "Mercy", "Hope"] },
  "Quran 59:10 teaches us to love the believers who came before us.": { answer: "True", harder: "By Quran 59:10, we pray for the believers who came before us and ask for hearts free of resentment." },
  // Quran 46:15.
  "At what age does the believer make the du'a of Quran 46:15?": { answer: "Forty years", harder: ["Quran 46:15: at what age does he say 'my Lord, enable me to be grateful'?", "Ten years", "Ninety years", "One year"] },
  "Who else is blessed in the du'a?": { answer: "His parents and his children", harder: ["Quran 46:15: thanks for favour on me and whom, and good for whom?", "Only his boss", "Only strangers", "No one"] },
  "In the du'a we ask to do good that pleases Allah.": { answer: "True", harder: "By Quran 46:15, the believer asks to do good that pleases Allah." },
  // Quran 7:126.
  "Who said the du'a of Quran 7:126?": { answer: "The magicians who believed", harder: ["Quran 7:126: 'you only take revenge on us because we believed.' Who said it?", "The soldiers of Fir'awn", "The traders of Madyan", "The people of Ad"] },
  "What did they ask Allah to pour on them?": { answer: "Patience", harder: ["Quran 7:126: 'Our Lord, pour upon us...' what?", "Gold", "Fame", "Rain"] },
  "They asked to die as Muslims.": { answer: "True", harder: "By Quran 7:126, the believing magicians asked to die as Muslims." },
  // Quran 3:147.
  "What did the believers ask Allah to make firm?": { answer: "Their feet", harder: ["Quran 3:147: 'forgive us... and help us.' What did they ask be made firm?", "Their swords", "Their walls", "Their houses"] },
  "What did they ask for first?": { answer: "Forgiveness of their sins", harder: ["Quran 3:147: 'their only words were...' What did they ask for first?", "Money", "Revenge", "A rest"] },
  "In hard times, the believers asked Allah for help.": { answer: "True", harder: "By Quran 3:147, the believers in battle asked their Lord for help." },
  // Quran 23:118.
  "What does the du'a of Quran 23:118 ask for?": { answer: "Forgiveness and mercy", harder: ["Quran 23:118: 'and You are the best of the merciful.' What does it ask for?", "Good weather", "A long trip", "A big house"] },
  "How does the du'a describe Allah?": { answer: "The best of the merciful", harder: ["Quran 23:118: 'and You are...' what?", "The far away", "The silent", "The strictest judge"] },
  "Quran 23:118 is the last ayah of Surah Al-Mu'minun.": { answer: "True", harder: "Quran 23:118, 'my Lord, forgive and have mercy', is the last ayah of Surah Al-Mu'minun." },
  // Quran 3:16.
  "What do they tell Allah before asking to be forgiven?": { answer: "We have believed", harder: ["Quran 3:16: 'Our Lord, ____, so forgive us our sins.'", "We have grown rich", "We have built a house", "We have traveled far"] },
  "What do they ask Allah to protect them from?": { answer: "The punishment of the Fire", harder: ["Quran 3:16: 'and protect us from...' what?", "A poor harvest", "A long winter", "A hard journey"] },
  "They ask Allah to forgive their sins.": { answer: "True", harder: "By Quran 3:16, those who believe ask Allah to forgive their sins." },
  // Quran 3:53.
  "Whom did the disciples say they followed?": { answer: "The messenger Isa", harder: ["Quran 3:53: 'we have believed... and have followed...' whom?", "The king's guards", "The rich men", "The old poets"] },
  "Among whom did they ask Allah to write them?": { answer: "The witnesses", harder: ["Quran 3:53: 'so write us among...' whom?", "The kings", "The poets", "The rulers"] },
  "The disciples believed in what Allah revealed.": { answer: "True", harder: "By Quran 3:53, the disciples of Isa believed in what Allah revealed." },
  // Quran 3:191.
  "What do they do with the creation of the heavens and the earth?": { answer: "Think about it", harder: ["Quran 3:191: what do they do with the creation of the heavens and the earth?", "Make fun of it", "Turn away from it", "Worship it"] },
  "Which du'a do they make after thinking about creation?": { answer: "You did not create this in vain", harder: ["Quran 3:191: after reflecting on creation, what do they say?", "Make us kings of the land", "Let us live here forever", "Give us more of this world"] },
  "They remember Allah standing, sitting and lying on their sides.": { answer: "True", harder: "By Quran 3:191, they remember Allah standing, sitting and lying on their sides." },
  // Quran 25:65.
  "Who make this du'a, in Surah Al-Furqan?": { answer: "The servants of the Most Merciful", harder: ["Quran 25:65: 'turn away from us the punishment of Hell.' Who says it?", "The people of Nuh", "The people of Ad", "The people of Lut"] },
  "What do they say about Hell's punishment?": { answer: "It never lets go", harder: ["Quran 25:65: 'its punishment...' does what?", "It is light", "It is easy", "It soon ends"] },
  "The servants of the Most Merciful ask Allah to keep Hell away from them.": { answer: "True", harder: "By Quran 25:65, the servants of the Most Merciful ask Allah to turn Hell's punishment away." },
  // Quran 66:8.
  "What will the believers ask Allah to perfect for them?": { answer: "Their light", harder: ["Quran 66:8: 'our Lord, perfect for us our...' what?", "Their wealth", "Their farms", "Their clothes"] },
  "What do the believers ask for along with their light?": { answer: "Forgiveness", harder: ["Quran 66:8: 'perfect our light and...' what else?", "Power", "Wealth", "A long life"] },
  "The believers will say this du'a while their light runs before them.": { answer: "True", harder: "By Quran 66:8, the believers make this dua as their light runs before them." },
  // Quran 3:9.
  "Whom will Allah gather for that Day, says Quran 3:9?": { answer: "All people", harder: ["Quran 3:9: 'You will surely gather...' whom?", "Only the kings", "Only the prophets", "Only the scholars"] },
  "What does the du'a say about that Day?": { answer: "There is no doubt about it", harder: ["Quran 3:9: 'a Day about which...' what?", "It is only a dream", "It is far away", "It may never come"] },
  "This du'a says that Allah never breaks His promise.": { answer: "True", harder: "By Quran 3:9, Allah does not fail in His promise." },
  // Quran 3:192.
  "What happens to those Allah puts in the Fire, says Quran 3:192?": { answer: "They are disgraced", harder: ["Quran 3:192: 'whoever You put into the Fire, You have...' what?", "They are rewarded", "They are thanked", "They are honored"] },
  "Who will have no helpers, says the du'a?": { answer: "The wrongdoers", harder: ["Quran 3:192: '____ will have no helpers.'", "The God-fearing", "The righteous", "The humble"] },
  "Just before this du'a, they ask Allah to protect them from the Fire.": { answer: "True", harder: "Just before Quran 3:192, in 3:191, they ask Allah to protect them from the Fire." },
  // Quran 3:193.
  "What did the caller say, in Quran 3:193?": { answer: "Believe in your Lord", harder: ["Quran 3:193: 'we have heard a caller calling to faith:' what did he say?", "Rest in your homes", "Gather your wealth", "Build your houses"] },
  "What did they ask Allah to remove from them?": { answer: "Their misdeeds", harder: ["Quran 3:193: 'forgive us our sins, remove from us our...' what?", "Their debts", "Their poverty", "Their hunger"] },
  "When they heard the call to faith, they believed.": { answer: "True", harder: "By Quran 3:193, when they heard the caller to faith, they believed." },
  // Quran 7:47.
  "When is the du'a of Quran 7:47 said?": { answer: "When they see the people of the Fire", harder: ["Quran 7:47: when their eyes are turned toward whom do they make this dua?", "When they see the new moon", "When they see the rain", "When they see the sea"] },
  "Which words begin the du'a of Quran 7:47?": { answer: "Rabbana la taj'alna", harder: ["Quran 7:47: 'do not place us with the wrongdoing people.' Which words begin it?", "Rabbana atina", "Rabbi zidni", "Rabbi hab li"] },
  "They ask Allah not to place them with the wrongdoing people.": { answer: "True", harder: "By Quran 7:47, they ask Allah not to place them with the wrongdoing people." },
  // Quran 26:87.
  "Who made the du'a of Quran 26:87?": { answer: "Ibrahim", harder: ["Quran 26:87: 'do not disgrace me on the Day all are resurrected.' Who said it?", "Nuh", "Musa", "Yunus"] },
  "What did Ibrahim ask to be kept from on that Day?": { answer: "Disgrace", harder: ["Quran 26:87: 'do not ____ me on the Day all are resurrected.'", "Starve", "Freeze", "Tire"] },
  "Ibrahim asked this for the Day when all people are resurrected.": { answer: "True", harder: "By Quran 26:87, Ibrahim's dua is for the Day all people are resurrected." },
  // Jami at-Tirmidhi 3381.
  "What happens when a believer makes du'a?": { answer: "Allah gives it, or keeps a harm away", harder: ["Tirmidhi 3381: when someone makes du'a, what does Allah do?", "Nothing happens", "Only long du'as count", "Only rich people are answered"] },
  "Which du'a did he ﷺ say is not answered?": { answer: "A du'a for a sin", harder: ["Tirmidhi 3381: 'as long as he does not ask for...' what?", "A du'a for health", "A du'a for parents", "A du'a for rain"] },
  "A du'a can be answered by keeping a harm away from you.": { answer: "True", harder: "By Tirmidhi 3381, a du'a may be answered by keeping away a harm equal to it." },
  // Jami at-Tirmidhi 3382.
  "When should we make much du'a, to be answered in hard times?": { answer: "In times of ease", harder: ["Tirmidhi 3382: to be answered in hardship, when should you make much du'a?", "Only once a year", "Only when sick", "Only in hard times"] },
  "What two hard times did he ﷺ name?": { answer: "Hardship and grief", harder: ["Tirmidhi 3382: answered in times of what two things?", "Meals and sleep", "Trips and holidays", "Mornings and evenings"] },
  "We should turn to Allah only when things go wrong.": { answer: "False", harder: "By Tirmidhi 3382, du'a is needed only when things go wrong." },
  // Jami at-Tirmidhi 3556.
  "What did he ﷺ say about hands raised to Allah in du'a?": { answer: "Allah does not send them back empty", harder: ["Tirmidhi 3556: hands raised to Allah in du'a are not sent back how?", "They must be washed first", "They must stay up an hour", "They must be raised very high"] },
  "Which name of Allah is in the hadith of raised hands?": { answer: "Al-Karim, the Generous", harder: ["Tirmidhi 3556: raised hands are not sent back empty, for Allah is what?", "Al-Malik, the King", "Al-Qawiyy, the Strong", "Al-Alim, the All-Knowing"] },
  "Raising your hands is part of making du'a.": { answer: "True", harder: "By Tirmidhi 3556, raising the hands to Allah is part of making du'a." },
  // Jami at-Tirmidhi 3385.
  "Whom did he ﷺ begin with, when making du'a for someone?": { answer: "With himself first", harder: ["Tirmidhi 3385: making du'a for someone, whom did he ﷺ begin with?", "With the oldest person there", "With the person he named", "With the people around him"] },
  "Who told how he ﷺ began his du'a for others?": { answer: "Ubayy ibn Ka'b", harder: ["Tirmidhi 3385: who reported that he ﷺ began du'a with himself?", "Bilal", "Abu Hurairah", "Abu Bakr"] },
  "You can ask Allah for yourself and for others in one du'a.": { answer: "True", harder: "By Tirmidhi 3385, one du'a can ask for yourself first and then for others." },
  // Jami at-Tirmidhi 3579.
  "When is the Lord closest to His servant?": { answer: "In the last part of the night", harder: ["Tirmidhi 3579: when is the Lord closest to His servant?", "At sunset", "Right after lunch", "At noon"] },
  "What did he ﷺ say to do in the last part of the night?": { answer: "Remember Allah", harder: ["Tirmidhi 3579: 'if you can be among those who...' what at that hour?", "Talk with friends", "Go to the market", "Eat a big meal"] },
  "The last part of the night is a special time to remember Allah.": { answer: "True", harder: "By Tirmidhi 3579, the last part of the night is when the Lord is closest to His servant." },
  // Jami at-Tirmidhi 3383.
  "What did he ﷺ call the best dhikr?": { answer: "La ilaha illallah", harder: ["Tirmidhi 3383: what is the best dhikr?", "Allahu Akbar", "Astaghfirullah", "Subhan Allah"] },
  "What did he ﷺ call the best du'a?": { answer: "Alhamdulillah", harder: ["Tirmidhi 3383: what is the best du'a?", "Amin", "Bismillah", "Insha'Allah"] },
  "La ilaha illallah means none is worshipped but Allah.": { answer: "True", harder: "La ilaha illallah, the best dhikr in Tirmidhi 3383, means none is worshipped but Allah." },
  // Jami at-Tirmidhi 3443.
  "To whom do we entrust a traveler's religion?": { answer: "To Allah", harder: ["Tirmidhi 3443: 'I entrust to Allah your religion...' To whom is the traveler's religion entrusted?", "To the captain", "To his bags", "To his friends"] },
  "What three things did he ﷺ entrust to Allah?": { answer: "Religion, trusts and last deeds", harder: ["Tirmidhi 3443: Ibn Umar's farewell entrusts which three things to Allah?", "Shoes, bags and water", "Money, food and clothes", "House, camel and tent"] },
  "Ibn Umar said goodbye the way the Prophet ﷺ said goodbye.": { answer: "True", harder: "By Tirmidhi 3443, Ibn Umar bid travelers farewell as the Prophet ﷺ bid them farewell." },
  // Jami at-Tirmidhi 3444.
  "What provision did he ﷺ give the traveler first?": { answer: "Taqwa", harder: ["Tirmidhi 3444: 'may Allah give you ____ as provision.' What first?", "Water", "Money", "Dates"] },
  "What did he ﷺ add when the man asked for more?": { answer: "May He forgive your sin", harder: ["Tirmidhi 3444: the man asked for more. What did he ﷺ add?", "May you be famous", "May you get rich", "May you travel fast"] },
  "He ﷺ prayed that good would be made easy for the traveler.": { answer: "True", harder: "By Tirmidhi 3444, he ﷺ prayed: may He make good easy for you wherever you are." },
  // Jami at-Tirmidhi 3445.
  "What did he ﷺ tell the traveler to say on high places?": { answer: "Allahu Akbar", harder: ["Tirmidhi 3445: on every high place, what should the traveler say?", "Amin", "Subhan Allah", "Bismillah"] },
  "What did he ﷺ ask Allah for the traveler?": { answer: "A short distance and an easy road", harder: ["Tirmidhi 3445: as the man left, what did he ﷺ ask Allah for him?", "A fast camel", "A big tent", "Good weather"] },
  "The first advice to the traveler was the taqwa of Allah.": { answer: "True", harder: "By Tirmidhi 3445, his first advice to the traveler was to hold fast to the taqwa of Allah." },
  // Jami at-Tirmidhi 3438.
  "In the travel du'a, who looks after the family left behind?": { answer: "Allah", harder: ["Tirmidhi 3438: 'the companion on the journey and the One who looks after...' whom?", "Nobody at all", "The neighbors", "The guards"] },
  "When did he ﷺ say: O Allah, You are the companion on the journey?": { answer: "When he mounted his camel", harder: ["Tirmidhi 3438: 'O Allah, You are the companion on the journey.' When was it said?", "When he reached Makkah", "When he went to sleep", "When he ate dinner"] },
  "In the travel du'a, he ﷺ asked Allah to bring them back safely.": { answer: "True", harder: "By Tirmidhi 3438, he ﷺ asked Allah to go with them and bring them back safely." },
  // Jami at-Tirmidhi 3440.
  "When did he ﷺ say Ayibuna ta'ibuna?": { answer: "Coming back from a journey", harder: ["Tirmidhi 3440: when did he ﷺ say 'Ayibuna ta'ibuna 'abiduna'?", "Setting out on a journey", "Waking up in the morning", "Finishing a meal"] },
  "What do the words Ayibuna ta'ibuna mean?": { answer: "Returning, repenting", harder: ["Tirmidhi 3440: 'Ayibuna ta'ibuna' means what?", "Welcome, welcome", "Goodbye, goodbye", "Hurry, hurry"] },
  "Coming home, he ﷺ said words of praise for his Lord.": { answer: "True", harder: "By Tirmidhi 3440, coming home he ﷺ said: praising our Lord." },
  // Sunan Abi Dawud 1169.
  "Why did the people come to him ﷺ weeping?": { answer: "There was a drought", harder: ["Abu Dawud 1169: why did the people come to him ﷺ weeping?", "A war had begun", "A flood had come", "A guest had left"] },
  "What kind of rain did he ﷺ ask Allah for?": { answer: "Rain that helps, not harms", harder: ["Abu Dawud 1169: 'beneficial and not harmful, soon and not late.' What rain did he ﷺ ask for?", "Rain for one hour", "Rain only on the sea", "Rain only at night"] },
  "After his du'a, clouds covered the sky.": { answer: "True", harder: "By Abu Dawud 1169, clouds covered the sky after his ﷺ du'a for rain." },
  // Sahih Muslim 2904.
  "Why would there be famine despite heavy rain, he ﷺ said?": { answer: "Nothing would grow", harder: ["Muslim 2904: famine can come even with heavy rain. Why?", "No river would flow", "No cloud would form", "No wind would blow"] },
  "Famine comes only when no rain falls.": { answer: "False", harder: "By Muslim 2904, famine comes only when no rain falls." },
  "Who reported his ﷺ words on famine despite heavy rain?": { answer: "Abu Hurairah", harder: ["Muslim 2904, 'famine while heavy rain falls', was narrated by whom?", "Jabir ibn Abdullah", "Anas ibn Malik", "Ibn Umar"] },
  // Sahih al-Bukhari 1013.
  "When did the man ask him ﷺ to pray for rain?": { answer: "During the Friday khutbah", harder: ["Bukhari 1013: the man asked him ﷺ to pray for rain at what time?", "At the Eid prayer", "At night in the market", "On a journey"] },
  "What did he ﷺ say when the rain had to stop?": { answer: "Around us, not on us", harder: ["Bukhari 1013: a week of rain, then what did he ﷺ say with raised hands?", "Rain only at night", "Rain only on Fridays", "Rain only on the sea"] },
  "After the second du'a, they walked out in the sun.": { answer: "True", harder: "By Bukhari 1013, after the second du'a the rain stopped and they walked out in the sun." },
  // Sunan Abi Dawud 1173.
  "What had the people complained of to him ﷺ?": { answer: "No rain had come", harder: ["Abu Dawud 1173: what had the people complained to him ﷺ about?", "Too much rain", "A cold winter", "Prices in the market"] },
  "In his du'a, what did he ﷺ call the people?": { answer: "The poor", harder: ["Abu Dawud 1173: 'You are the Rich, while we are...' what?", "The strong", "The kings", "The rich"] },
  "He ﷺ laughed when he saw people hurrying to shelter.": { answer: "True", harder: "By Abu Dawud 1173, he ﷺ laughed when he saw people hurrying to shelter from the rain." },
  // Sunan Abi Dawud 5100.
  "What did he ﷺ do when the rain began?": { answer: "Let some rain fall on him", harder: ["Abu Dawud 5100: when rain fell, what did he ﷺ do with his garment?", "Ran inside at once", "Covered his head", "Waited under a tree"] },
  "Why did he ﷺ want the rain on him?": { answer: "To touch rain fresh from its Lord", harder: ["Abu Dawud 5100: 'because it has just come from...' why did he ﷺ let rain fall on him?", "To cool off in the heat", "To wash his clothes", "To show it was strong"] },
  "He ﷺ hurried indoors to stay dry from the rain.": { answer: "False", harder: "By Abu Dawud 5100, he ﷺ covered himself to keep the rain off." },
  // Sunan Abi Dawud 5097.
  "Where does the wind come from, he ﷺ said?": { answer: "From Allah's mercy", harder: ["Abu Dawud 5097: the wind comes from what?", "From the mountains", "From the angry sea", "From the stars"] },
  "What should you do when a strong wind blows?": { answer: "Ask Allah for its good", harder: ["Abu Dawud 5097: 'do not curse it, but...' what should you do?", "Blame the weather", "Hide and say nothing", "Curse the wind"] },
  "Cursing the wind is fine when it blows hard.": { answer: "False", harder: "By Abu Dawud 5097, one may curse the wind when it brings harm." },
  // Sunan Abi Dawud 4020.
  "How did he ﷺ begin the du'a for new clothes?": { answer: "O Allah, praise is Yours", harder: ["Abu Dawud 4020: putting on a new garment, how did he ﷺ begin?", "O Allah, make it last", "Peace be on you", "O Allah, forgive me"] },
  "What did he ﷺ ask Allah for, about the new garment?": { answer: "Its good, and the good it was made for", harder: ["Abu Dawud 4020: he ﷺ named the new garment and asked Allah for what?", "That people praise it", "More clothes like it", "That it never tears"] },
  "He ﷺ also sought refuge from the garment's evil.": { answer: "True", harder: "By Abu Dawud 4020, he ﷺ sought refuge from the garment's evil and the evil it was made for." },
  // Sunan Abi Dawud 5085.
  "How many times did he ﷺ say each phrase on waking?": { answer: "Ten times each", harder: ["Abu Dawud 5085: waking at night, how many times did he ﷺ say each phrase?", "Once each", "Three times each", "A hundred times each"] },
  "From what did he ﷺ seek refuge, ten times, before praying?": { answer: "The hardship of the Last Day", harder: ["Abu Dawud 5085: ten times before praying, he ﷺ sought refuge from what?", "The cold of the night", "Hunger and thirst", "Scary dreams"] },
  "Aishah said many people had asked her the same before.": { answer: "False", harder: "In Abu Dawud 5085, Aishah said many had asked her this question before." },
  // Sunan Abi Dawud 5103.
  "What should you do when dogs bark at night?": { answer: "Seek refuge in Allah", harder: ["Abu Dawud 5103: hearing dogs bark at night, what should you do?", "Shout back at them", "Throw stones at them", "Run out of the house"] },
  "Why should you seek refuge then, he ﷺ said?": { answer: "They see what you do not see", harder: ["Abu Dawud 5103: 'for they see...' what?", "They want some food", "They feel the cold air", "They want to play"] },
  "Seek refuge in Allah when donkeys bray at night, too.": { answer: "True", harder: "By Abu Dawud 5103, you seek refuge in Allah when donkeys bray at night too." },
  // Sunan Abi Dawud 5086.
  "At what time did he ﷺ say the journey du'a?": { answer: "At dawn", harder: ["Abu Dawud 5086: on a journey, when did he ﷺ say 'let a hearer hear us praising Allah'?", "At noon", "At sunset", "At midnight"] },
  "What did he ﷺ ask the Lord to do for them?": { answer: "Be with them and favour them", harder: ["Abu Dawud 5086: 'Our Lord, be with us and...' what?", "Make the road short", "Send them rain", "Give them gold"] },
  "He ﷺ ended the journey du'a by seeking refuge from the Fire.": { answer: "True", harder: "By Abu Dawud 5086, he ﷺ ended the dawn journey du'a seeking refuge from the Fire." },
  // Sunan Abi Dawud 1481.
  "What should come first when you make du'a, he ﷺ said?": { answer: "Praising Allah", harder: ["Abu Dawud 1481: 'he made haste.' What should come first in du'a?", "Asking for money", "Raising your voice", "Naming your needs"] },
  "What comes after praise, before you ask for what you wish?": { answer: "Blessings on the Prophet ﷺ", harder: ["Abu Dawud 1481: after praising Allah, before asking, what comes next?", "A long silence", "Counting to ten", "Standing up straight"] },
  "He ﷺ praised the man who rushed into his du'a.": { answer: "False", harder: "By Abu Dawud 1481, he ﷺ praised the man who rushed into his du'a." },
  // Jami at-Tirmidhi 3503.
  "Whom did Abu Bakrah's son learn the du'a from?": { answer: "His father", harder: ["Tirmidhi 3503: 'from whom did you hear that?' From whom did the son learn it?", "His uncle", "His teacher", "A traveller"] },
  "From what three things does the du'a seek refuge?": { answer: "Sadness, laziness, the grave", harder: ["Tirmidhi 3503: the du'a seeks refuge from what three things?", "Hunger, thirst, the heat", "Noise, dust, the dark", "Rain, wind, the cold"] },
  "Abu Bakrah told his son to stop saying the du'a.": { answer: "False", harder: "By Tirmidhi 3503, Abu Bakrah told his son to stop saying that du'a." },
  // Sahih al-Bukhari 6368.
  "With what did he ﷺ ask Allah to wash away sins?": { answer: "Water of snow and hail", harder: ["Bukhari 6368: 'wash away my sins with...' what?", "Water of the sea", "Warm milk", "Rose water"] },
  "How far from sins did he ﷺ ask Allah to put him?": { answer: "As far as East is from West", harder: ["Bukhari 6368: 'put a long distance between me and my sins as...' how far?", "One step away", "Behind a small wall", "Across the street"] },
  "He ﷺ sought refuge from the trial of poverty.": { answer: "True", harder: "By Bukhari 6368, he ﷺ sought refuge from the trial of poverty." },
  // Sahih al-Bukhari 6616.
  "What did he ﷺ tell us to do about severe calamities?": { answer: "Seek refuge with Allah", harder: ["Bukhari 6616: what did he ﷺ say to do about the hardship of severe trials?", "Give up hope", "Run and hide", "Blame other people"] },
  "Which of these did he ﷺ tell us to seek refuge from?": { answer: "A bad end", harder: ["Bukhari 6616: severe trials, a bad fate, gloating enemies, and what?", "A long life", "A big family", "A kind neighbor"] },
  "We may ask Allah to keep us from the gloating of enemies.": { answer: "True", harder: "By Bukhari 6616, we seek refuge with Allah from the gloating of enemies." },
  // Sunan Abi Dawud 1544.
  "What three things did he ﷺ seek refuge from first?": { answer: "Poverty, want and lowliness", harder: ["Abu Dawud 1544: which three did he ﷺ seek refuge from first?", "Guests, gifts and food", "Rain, wind and cold", "Work, study and play"] },
  "What else did he ﷺ ask Allah to keep him from?": { answer: "Doing wrong or being wronged", harder: ["Abu Dawud 1544: 'and I seek refuge in You from...' what else?", "Eating too little", "Walking too far", "Speaking too softly"] },
  "He ﷺ sought refuge from wronging others, and from being wronged.": { answer: "True", harder: "By Abu Dawud 1544, he ﷺ sought refuge both from doing wrong and from being wronged." },
  // Sunan Abi Dawud 1552.
  "Which danger at home did he ﷺ seek refuge from?": { answer: "The house falling on him", harder: ["Abu Dawud 1552: which danger at home did he ﷺ seek refuge from?", "A noisy neighbor", "A dusty floor", "A broken cup"] },
  "Which of these is also in his ﷺ du'a?": { answer: "Drowning and burning", harder: ["Abu Dawud 1552: falling, a house falling, and which two more?", "Laughing and smiling", "Running and jumping", "Eating and drinking"] },
  "He ﷺ sought refuge from the devil harming him at death.": { answer: "True", harder: "By Abu Dawud 1552, he ﷺ sought refuge from the devil harming him at the time of death." },
  // Jami at-Tirmidhi 3591.
  "Which three bad things did he ﷺ seek refuge from?": { answer: "Character, actions and desires", harder: ["Tirmidhi 3591: bad character, bad deeds and bad what?", "Noise, dust and smoke", "Rain, wind and storms", "Hunger, thirst and heat"] },
  "Who passed on the du'a from his uncle?": { answer: "Ziyad ibn Ilaqah", harder: ["Tirmidhi 3591: who passed on this du'a from his uncle Qutbah ibn Malik?", "Anas ibn Malik", "Abu Hurairah", "Ibn Abbas"] },
  "He ﷺ asked Allah to protect him from bad character.": { answer: "True", harder: "By Tirmidhi 3591, he ﷺ sought refuge in Allah from bad character." },
  // Sahih al-Bukhari 2397.
  "When did he ﷺ seek refuge from sins and debt?": { answer: "In his prayer", harder: ["Bukhari 2397: where did he ﷺ seek refuge from sins and debt?", "On a journey", "At a feast", "At the market"] },
  "What can debt lead a person to do, he ﷺ said?": { answer: "Lie and break promises", harder: ["Bukhari 2397: 'how often you seek refuge from debt!' What does debt lead to?", "Sleep and rest more", "Eat and drink more", "Walk and travel more"] },
  "He ﷺ often sought refuge with Allah from debt.": { answer: "True", harder: "By Bukhari 2397, he ﷺ sought refuge from debt so often that someone asked why." },
  // Sunan Abi Dawud 1551.
  "What did Shakl ask him ﷺ to teach him?": { answer: "A supplication", harder: ["Abu Dawud 1551: 'Messenger of Allah, teach me...' what did Shakl ask?", "A poem", "A trade", "A letter"] },
  "Which two come first in the du'a he ﷺ taught Shakl?": { answer: "What I hear and what I see", harder: ["Abu Dawud 1551: which two evils come first in the du'a taught to Shakl?", "What I eat and what I drink", "What I buy and what I sell", "What I build and what I plant"] },
  "The du'a he ﷺ taught also asks refuge from the evil of what we say.": { answer: "True", harder: "By Abu Dawud 1551, the du'a taught to Shakl seeks refuge from the evil of what we speak." },
  // Jami at-Tirmidhi 3434.
  "How many times could they count it in one sitting?": { answer: "One hundred times", harder: ["Tirmidhi 3434: in one sitting, how many times could they count it?", "Only once", "Three times", "Seven times"] },
  "Besides forgiveness, what did he ﷺ ask Allah to accept?": { answer: "His tawbah", harder: ["Tirmidhi 3434: 'forgive me and accept my...' what?", "His fasting", "His sadaqah", "His hajj"] },
  "He ﷺ called Allah the Oft-Returning, the Most Forgiving.": { answer: "True", harder: "By Tirmidhi 3434, he ﷺ called Allah the Oft-Returning, the Most Forgiving." },
  // Sunan Ibn Majah 897.
  "When did he ﷺ say Rabbighfir li, Rabbighfir li?": { answer: "Between the two sajdahs", harder: ["Ibn Majah 897: when did he ﷺ say 'Rabbighfir li, Rabbighfir li'?", "After eating", "On waking up", "Before the adhan"] },
  "What do you ask Allah for with Rabbighfir li?": { answer: "Forgiveness", harder: ["Ibn Majah 897: between the two sajdahs, what did he ﷺ ask for?", "Rain", "Food", "Wealth"] },
  "He ﷺ asked Allah for forgiveness inside his prayer.": { answer: "True", harder: "By Ibn Majah 897, he ﷺ asked Allah for forgiveness inside his prayer." },
  // Jami at-Tirmidhi 3577.
  "What did he ﷺ say Allah will do for whoever says it?": { answer: "Forgive him", harder: ["Tirmidhi 3577: 'astaghfirullahal-'azim...' What will Allah do for him?", "Give him a palace", "Give him much gold", "Give him a crown"] },
  "Which two names follow la ilaha illa huwa in it?": { answer: "Al-Hayy, Al-Qayyum", harder: ["Tirmidhi 3577: 'la ilaha illa huwa' is followed by which two names?", "Al-Khaliq, Al-Bari", "Al-Awwal, Al-Akhir", "Al-Malik, Al-Quddus"] },
  "These words end with: wa atubu ilayh, and I repent to Him.": { answer: "True", harder: "By Tirmidhi 3577, the words end: and I repent to Him." },
  // Sunan Ibn Majah 3818.
  "Who did he ﷺ give glad tidings to?": { answer: "Those whose record has much istighfar", harder: ["Ibn Majah 3818: glad tidings to whom?", "Those with the most friends", "Those with the most gold", "Those with the biggest houses"] },
  "Where will a person find their istighfar?": { answer: "In the record of their deeds", harder: ["Ibn Majah 3818: where will he find much seeking of forgiveness?", "Under their pillow", "In a box of gold", "On a mountain top"] },
  "Asking Allah for forgiveness a lot brings glad tidings.": { answer: "True", harder: "By Ibn Majah 3818, much istighfar in one's record brings glad tidings." },
  // Jami at-Tirmidhi 3533.
  "What did he ﷺ strike the dry tree with?": { answer: "His staff", harder: ["Tirmidhi 3533: what did he ﷺ strike the dry tree with?", "A stone", "His hand", "His sandal"] },
  "What do the four words make fall from a servant?": { answer: "His sins", harder: ["Tirmidhi 3533: like the leaves falling, the four words make what fall?", "His happiness", "His good deeds", "His riches"] },
  "Alhamdulillah and Subhanallah are among the four words.": { answer: "True", harder: "By Tirmidhi 3533, Alhamdulillah and Subhanallah are among the four words." },
  // Sunan Abi Dawud 3221.
  "What did he ﷺ tell people to ask for their buried brother?": { answer: "Forgiveness and steadfastness", harder: ["Abu Dawud 3221: after burying, what did he ﷺ tell them to ask for their brother?", "A big house", "Gold and silver", "A long journey"] },
  "Why did he ﷺ say to pray for him right then?": { answer: "He is being questioned now", harder: ["Abu Dawud 3221: 'for he is being...' why pray right then?", "He is hungry now", "He is asleep now", "He is far away"] },
  "He ﷺ stood by the grave after a burial to make du'a.": { answer: "True", harder: "By Abu Dawud 3221, he ﷺ stood by the grave after a burial to make du'a." },
  // Jami at-Tirmidhi 3475.
  "What did he ﷺ say the man had asked Allah by?": { answer: "His Greatest Name", harder: ["Tirmidhi 3475: 'when He is called by it He answers.' The man asked Allah by what?", "The name of a king", "The name of his father", "The name of an angel"] },
  "Which two names of Allah were in the man's du'a?": { answer: "Al-Ahad, As-Samad", harder: ["Tirmidhi 3475: which two names of Allah were in the man's du'a?", "Al-Khaliq, Al-Bari", "Al-Malik, Al-Quddus", "Ar-Rahman, Ar-Rahim"] },
  "The man's du'a used words of Surah al-Ikhlas.": { answer: "True", harder: "By Tirmidhi 3475, the man's du'a used the words of Surah al-Ikhlas." },
  // Jami at-Tirmidhi 3544.
  "Where was the man making his du'a?": { answer: "In the masjid", harder: ["Tirmidhi 3544: where was the man making du'a by Al-Mannan?", "On a journey", "At his home", "In the market"] },
  "What does Badi'us-samawati wal-ard mean?": { answer: "Originator of the heavens and earth", harder: ["Tirmidhi 3544: 'Badi'us-samawati wal-ard' means what?", "Lord of the Throne", "Lord of the daybreak", "King of mankind"] },
  "He ﷺ said the man called on Allah by His Greatest Name.": { answer: "True", harder: "By Tirmidhi 3544, the man in the masjid called on Allah by His Greatest Name." },
  // Jami at-Tirmidhi 3430.
  "Who affirms the words of one who says La ilaha illallah wallahu akbar?": { answer: "Allah, his Lord", harder: ["Tirmidhi 3430: 'none is worthy of worship but Me.' Who affirms his words?", "The people near him", "His teacher", "His neighbors"] },
  "What happens to one who says these words in illness, then dies?": { answer: "The Fire will not consume him", harder: ["Tirmidhi 3430: saying these words in illness, then dying. What is promised?", "He will be cured at once", "His wealth will grow", "He will be given gold"] },
  "Allah answers the one who says La ilaha illallah wallahu akbar.": { answer: "True", harder: "By Tirmidhi 3430, Allah affirms the words of one who says La ilaha illallah wallahu akbar." },
  // Jami at-Tirmidhi 3551.
  "What does Rabbi a'inni mean?": { answer: "My Lord, help me", harder: ["Tirmidhi 3551: 'Rabbi a'inni wa la tu'in 'alayya.' What does Rabbi a'inni mean?", "My Lord, feed me", "My Lord, clothe me", "My Lord, hide me"] },
  "What does waghsil hawbati mean?": { answer: "Wash away my sin", harder: ["Tirmidhi 3551: 'accept my repentance, waghsil hawbati.' What does waghsil hawbati mean?", "Wash my face", "Wash my clothes", "Wash my hands"] },
  "He ﷺ asked Allah to make him ever grateful to Him.": { answer: "True", harder: "By Tirmidhi 3551, he ﷺ asked Allah to make him ever grateful to Him." },
  // Jami at-Tirmidhi 3424.
  "What did the tree do in the man's dream?": { answer: "Prostrated with him", harder: ["Tirmidhi 3424: in the man's dream, what did the tree do?", "Fell to the ground", "Gave him shade", "Grew sweet fruit"] },
  "The du'a asks Allah to accept it as He accepted it from whom?": { answer: "Dawud", harder: ["Tirmidhi 3424: 'accept it from me as You accepted it from Your servant...' whom?", "Yunus", "Adam", "Nuh"] },
  "Ibn Abbas heard him ﷺ say the same words in his sajdah.": { answer: "True", harder: "By Tirmidhi 3424, Ibn Abbas heard him ﷺ say the tree's words in his sajdah." },
  // Jami at-Tirmidhi 3454.
  "Who did he ﷺ give the first fruit to?": { answer: "The smallest child he saw", harder: ["Tirmidhi 3454: after the dua over the first fruit, to whom did he ﷺ give it?", "The oldest man there", "The richest trader", "The first man he saw"] },
  "Along with their fruits, what did he ﷺ ask Allah to bless?": { answer: "Their city", harder: ["Tirmidhi 3454: bless us in our fruits, our sa' and mudd, and what?", "Their markets", "Their ships", "Their clothes"] },
  "He ﷺ asked for Madinah what Ibrahim had asked for Makkah.": { answer: "True", harder: "By Tirmidhi 3454, he ﷺ asked for Madinah the like of what Ibrahim asked for Makkah." },
  // Jami at-Tirmidhi 3502.
  "What fear did he ﷺ ask Allah for, before standing up from a sitting?": { answer: "Fear of Allah", harder: ["Tirmidhi 3502: 'a share of fear of You that comes between us and...' what?", "Fear of the sea", "Fear of the cold", "Fear of the dark"] },
  "In his ﷺ du'a for fear of Allah, what should certainty make easy?": { answer: "The troubles of this world", harder: ["Tirmidhi 3502: certainty that makes what easy?", "The length of the road", "The heat of summer", "The cold of winter"] },
  "He ﷺ asked Allah for obedience that brings us to Paradise.": { answer: "True", harder: "By Tirmidhi 3502, he ﷺ asked for obedience that brings us to Paradise." },
  // Sunan Abi Dawud 1482.
  "Which du'as did he ﷺ like best?": { answer: "Ones that gather much good", harder: ["Abu Dawud 1482: which du'as did he ﷺ like?", "Ones nobody understands", "Ones in rhyming words", "Ones shouted out loud"] },
  "What did he ﷺ do with other kinds of du'a?": { answer: "He left them aside", harder: ["Abu Dawud 1482: he ﷺ liked du'as that gather good. What did he do with others?", "He wrote them on walls", "He made them longer", "He said them first"] },
  "A short du'a can hold a great deal of good.": { answer: "True", harder: "By Abu Dawud 1482, a du'a of few words can gather much good." },
  // Sunan Ibn Majah 3846.
  "What does the du'a ask Allah for first?": { answer: "Every kind of good", harder: ["Ibn Majah 3846: 'O Allah, I ask You for...' what first?", "Gold and silver", "Fame among people", "A big house"] },
  "Which good does the du'a ask for?": { answer: "What we know and do not know", harder: ["Ibn Majah 3846: 'in this world and the Hereafter, what I know and...' what?", "Only what others have", "Only what we can see", "Only what we have now"] },
  "The du'a she was taught asks for Paradise too.": { answer: "True", harder: "By Ibn Majah 3846, the du'a taught to Aishah asks for Paradise and what brings near to it." },
  // Sunan Abi Dawud 1536.
  "Which three du'as are answered, with no doubt?": { answer: "A father, a traveller, the wronged", harder: ["Abu Dawud 1536: which three du'as are answered with no doubt?", "A king, a poet, a trader", "A guest, a tailor, a cook", "A rich man, a judge, a builder"] },
  "How sure is it that these du'as are answered?": { answer: "There is no doubt", harder: ["Abu Dawud 1536: how sure is the answer to these three du'as?", "Only now and then", "Hardly ever", "Only on Fridays"] },
  "When someone is wronged, Allah answers his du'a.": { answer: "True", harder: "By Abu Dawud 1536, the du'a of one who has been wronged is answered." },
  // Sunan Abi Dawud 521.
  "When is a du'a not turned back, he ﷺ said?": { answer: "Between adhan and iqamah", harder: ["Abu Dawud 521: a du'a is not turned back between what?", "Only after Eid", "Only while eating", "Only at noon"] },
  "What is a good way to spend the wait for the iqamah?": { answer: "Making du'a", harder: ["Abu Dawud 521: a du'a then is not turned back. How should you spend the wait for iqamah?", "Walking out of the masjid", "Playing with a phone", "Chatting about the market"] },
  "The wait before the prayer starts is a good time for du'a.": { answer: "True", harder: "By Abu Dawud 521, the time between the adhan and the iqamah is a time for du'a." },
  // Jami at-Tirmidhi 3558.
  "Where did Abu Bakr stand and weep?": { answer: "On the minbar", harder: ["Tirmidhi 3558: where did Abu Bakr stand and weep?", "At the city gate", "In the market", "On a hilltop"] },
  "What two things did he ﷺ tell us to ask Allah for?": { answer: "Pardon and well-being", harder: ["Tirmidhi 3558: 'ask Allah for...' which two things?", "Riches and fame", "Power over people", "Gold and silver"] },
  "No one is given anything better than well-being.": { answer: "True", harder: "By Tirmidhi 3558, no one has been given anything better than well-being." },
  // Sahih Muslim 2688a.
  "What had the sick man been asking Allah for?": { answer: "To be punished in this world", harder: ["Muslim 2688a: 'whatever You would punish me with in the Hereafter, bring it now.' What was he asking?", "To be made a king in this world", "To be made rich in this world", "To be made famous in this world"] },
  "What had the sick man become like?": { answer: "A weak little chick", harder: ["Muslim 2688a: the sick man had grown as weak as what?", "A strong young lion", "A tall old tree", "A fast wild horse"] },
  "We should not ask Allah to rush His punishment onto us.": { answer: "True", harder: "By Muslim 2688a, we should not ask Allah to bring His punishment on us now." },
  // Sunan Ibn Majah 3843.
  "What kind of knowledge should we ask Allah for?": { answer: "Knowledge that benefits", harder: ["Ibn Majah 3843: what kind of knowledge should we ask Allah for?", "Knowledge to show off", "Knowledge of magic", "Knowledge to win arguments"] },
  "What should we seek refuge with Allah from?": { answer: "Knowledge of no benefit", harder: ["Ibn Majah 3843: from what kind of knowledge should we seek refuge?", "Reading good books", "Teaching others", "Learning the Quran"] },
  "We can ask Allah to make our learning useful.": { answer: "True", harder: "By Ibn Majah 3843, we ask Allah for knowledge that benefits." },
  // Sunan Abi Dawud 1486.
  "Which part of the hands did he ﷺ say to ask Allah with?": { answer: "The palms", harder: ["Abu Dawud 1486: ask Allah with which part of your hands, not their backs?", "The knuckles", "The thumbs", "The fingernails"] },
  "When did he ﷺ say to hold up the palms of your hands?": { answer: "When making requests to Allah", harder: ["Abu Dawud 1486: when should the palms be held up?", "When walking in the market", "When sitting down to eat", "When going out of the house"] },
  "He ﷺ taught us to ask Allah with the palms of our hands.": { answer: "True", harder: "By Abu Dawud 1486, we ask Allah with the palms of our hands, not their backs." },
  // Jami at-Tirmidhi 2083.
  "How many times does the visitor say the du'a?": { answer: "Seven", harder: ["Tirmidhi 2083: 'I ask Allah the Magnificent... to cure you.' How many times?", "Forty", "Once", "Twice"] },
  "Whom do we ask to cure the sick person?": { answer: "Allah, Lord of the Throne", harder: ["Tirmidhi 2083: whom does the visitor ask to cure the sick person?", "The stars", "A lucky charm", "The wind"] },
  "We can make du'a for a sick friend when we visit.": { answer: "True", harder: "By Tirmidhi 2083, a visitor's du'a for the sick, said seven times, brings a cure if death has not come." },
  // Sunan Abi Dawud 3729.
  "What did the host ask for as he ﷺ was leaving?": { answer: "A du'a for him", harder: ["Abu Dawud 3729: holding the rein of his mount, what did the host ask for?", "A new camel", "A book of poems", "A gift of gold"] },
  "What did he ﷺ ask Allah to bless them in?": { answer: "What Allah provided them", harder: ["Abu Dawud 3729: 'O Allah, bless them in...' what?", "Their fame", "Their big houses", "Their fine clothes"] },
  "A guest can make du'a for the people who fed him.": { answer: "True", harder: "By Abu Dawud 3729, he ﷺ made du'a for the family that hosted and fed him." },
  // Sunan Abi Dawud 3854.
  "What did Sa'd bring him ﷺ to eat?": { answer: "Bread and olive oil", harder: ["Abu Dawud 3854: what did Sa'd ibn Ubadah bring him ﷺ?", "Honey cakes", "Roast meat", "Dates and milk"] },
  "In his du'a, who would pray for blessing on Sa'd's family?": { answer: "The angels", harder: ["Abu Dawud 3854: 'and may ____ pray for blessing on you.'", "The traders", "The poets", "The guards"] },
  "He ﷺ prayed that the pious would eat Sa'd's food.": { answer: "True", harder: "By Abu Dawud 3854, he ﷺ prayed that the pious would eat Sa'd's food." },
  // Sunan Abi Dawud 3201.
  "When did he ﷺ say the du'a for our living and our dead?": { answer: "In the funeral prayer", harder: ["Abu Dawud 3201: when did he ﷺ say 'forgive those of us who are living and those of us who are dead'?", "At a wedding feast", "On the way to market", "At the Eid meal"] },
  "Whom did he ﷺ ask Allah to forgive?": { answer: "Our living and our dead", harder: ["Abu Dawud 3201: whom did he ﷺ ask Allah to forgive?", "Only our men", "Only our old", "Only those present"] },
  "Our young and our old are named in the du'a.": { answer: "True", harder: "By Abu Dawud 3201, the funeral du'a names our young and our old." },
  // Sahih al-Bukhari 6397.
  "Why did at-Tufail ask him ﷺ to pray against Daws?": { answer: "They had refused Islam", harder: ["Bukhari 6397: why did at-Tufail ask him ﷺ to pray against Daws?", "They were too few", "They had no water", "They lived far away"] },
  "What did he ﷺ ask Allah for, for Daws?": { answer: "Guidance for them", harder: ["Bukhari 6397: asked to pray against Daws, what did he ﷺ ask for them?", "Wealth for them", "Rain for them", "Fame for them"] },
  "People thought he ﷺ would pray against Daws.": { answer: "True", harder: "By Bukhari 6397, the people thought he ﷺ would pray against Daws." },
  // Sahih al-Bukhari 2130.
  "For which people did he ﷺ make du'a?": { answer: "The people of Madinah", harder: ["Bukhari 2130: 'bless their mudd and their sa'.' Whom did he ﷺ mean?", "The people of Persia", "The traders of Egypt", "The people of Rome"] },
  "What did he ﷺ ask Allah to bless?": { answer: "Their food measures", harder: ["Bukhari 2130: 'O Allah, bless their...' what?", "Their horses", "Their palaces", "Their city walls"] },
  "The mudd and the sa' were used to measure food.": { answer: "True", harder: "The mudd and sa' of Bukhari 2130 were measures used for food." },
  // Sahih Muslim 373.
  "When did he ﷺ remember Allah, Aishah said?": { answer: "At all moments", harder: ["Muslim 373: when did he ﷺ remember Allah, Aishah said?", "Only on Fridays", "Only in Ramadan", "Only when traveling"] },
  "What is dhikr?": { answer: "Keeping Allah in mind and on the tongue", harder: ["Muslim 373: he ﷺ remembered Allah at all moments. What is dhikr?", "Counting your money", "Reading poems aloud", "Telling old stories"] },
  "Dhikr is only for after the five prayers.": { answer: "False", harder: "By Muslim 373, he ﷺ remembered Allah only after the five prayers." },
  // Sunan Ibn Majah 3792.
  "When is Allah with His servant, Allah says?": { answer: "When he remembers Him", harder: ["Ibn Majah 3792: 'I am with My servant when...' what?", "When people praise him", "When he is the richest", "When he wins a fight"] },
  "What moves when the servant remembers Allah?": { answer: "His lips", harder: ["Ibn Majah 3792: when the servant remembers Allah, what moves with His name?", "His toes", "His ears", "His shoulders"] },
  "Quiet dhikr with moving lips is remembering Allah.": { answer: "True", harder: "By Ibn Majah 3792, a servant whose lips move with Allah's name is remembering Him." },
  // Sahih Muslim 2676.
  "Who are the mufarridun, he ﷺ said?": { answer: "Those who remember Allah much", harder: ["Muslim 2676: 'the mufarridun have gone ahead.' Who are they?", "Those who travel far", "Those who own mountains", "Those who sleep early"] },
  "Where was he ﷺ when he spoke of the mufarridun?": { answer: "On the road to Makkah", harder: ["Muslim 2676: passing Jumdan, where was he ﷺ travelling?", "In a garden in Ta'if", "In a market in Syria", "On a ship at sea"] },
  "Women who remember Allah much are among the mufarridun too.": { answer: "True", harder: "By Muslim 2676, the mufarridun are the men and women who remember Allah much." },
  // Sunan Abi Dawud 4855.
  "Leaving a gathering with no dhikr is like leaving what?": { answer: "A dead donkey", harder: ["Abu Dawud 4855: leaving a gathering without dhikr is like getting up from what?", "A fresh garden", "A full well", "A happy feast"] },
  "What will a gathering with no dhikr bring them?": { answer: "Regret", harder: ["Abu Dawud 4855: a gathering with no remembrance becomes a cause of what?", "New wealth", "Great reward", "More friends"] },
  "Friends sitting together should remember Allah in their talk.": { answer: "True", harder: "By Abu Dawud 4855, people sitting together should remember Allah in their gathering." },
  // Jami at-Tirmidhi 3399.
  "What did he ﷺ ask Allah for before sleeping?": { answer: "Safety from His punishment", harder: ["Tirmidhi 3399: resting on his right hand, what did he ﷺ ask for before sleeping?", "A big dinner", "A soft bed", "A long sleep"] },
  "Where did he ﷺ rest his head when going to sleep?": { answer: "On his right hand", harder: ["Tirmidhi 3399: going to sleep, he ﷺ rested his head on what?", "On a pile of books", "On a tree trunk", "On his left hand"] },
  "He ﷺ remembered Allah even as he lay down to sleep.": { answer: "True", harder: "By Tirmidhi 3399, he ﷺ remembered Allah even as he lay down to sleep." },
  // Jami at-Tirmidhi 3590.
  "What opens for la ilaha illallah said sincerely?": { answer: "The gates of heaven", harder: ["Tirmidhi 3590: sincere la ilaha illallah: what is opened for it?", "The windows of the house", "The doors of the market", "The gates of the city"] },
  "How far does sincere la ilaha illallah rise?": { answer: "To the Throne", harder: ["Tirmidhi 3590: the gates of heaven open until it reaches where?", "To the mountain tops", "To the roof of the masjid", "To the clouds only"] },
  "Keeping away from major sins matters for la ilaha illallah to rise.": { answer: "True", harder: "By Tirmidhi 3590, la ilaha illallah rises to the Throne as long as one avoids the major sins." },
  // Sunan Abi Dawud 1550.
  "Which two evils did he ﷺ seek refuge from, Aishah said?": { answer: "What he had done and not done", harder: ["Abu Dawud 1550: 'from the evil of what I have done, and...' what?", "What he had bought and sold", "What he had built and planted", "What he had eaten and drunk"] },
  "Whom did Farwah ibn Nawfal ask about his ﷺ du'a?": { answer: "Aishah", harder: ["Abu Dawud 1550: Farwah ibn Nawfal asked whom about his ﷺ du'a?", "Umm Salamah", "Maymunah", "Hafsah"] },
  "He ﷺ sought refuge even from the evil of what he had not done.": { answer: "True", harder: "By Abu Dawud 1550, he ﷺ sought refuge even from the evil of what he had not done." },
  // Sunan Ibn Majah 3882.
  "When did he ﷺ teach Asma to say these words?": { answer: "At times of distress", harder: ["Ibn Majah 3882: 'Allah, Allah is my Lord.' When were these words for?", "At the start of a meal", "On the night of Eid", "When buying new clothes"] },
  "What does la ushriku bihi shay'a mean?": { answer: "I associate nothing with Him", harder: ["Ibn Majah 3882: 'la ushriku bihi shay'a' means what?", "I forget nothing about Him", "I hide nothing from Him", "I ask Him for nothing"] },
  "He ﷺ taught Asma bint Umays words for hard times.": { answer: "True", harder: "By Ibn Majah 3882, he ﷺ taught Asma bint Umays words to say at times of distress." },
  // Sunan an-Nasa'i 5519.
  "Who are Jibril, Mikail and Israfil?": { answer: "Angels", harder: ["Nasa'i 5519: 'Lord of Jibra'il, Mika'il and Israfil.' Who are they?", "Prophets", "Companions", "Jinn"] },
  "From the heat of what did he ﷺ seek refuge?": { answer: "The Fire of Jahannam", harder: ["Nasa'i 5519: 'I seek refuge in You from the heat of...' what?", "The summer sun", "The desert sand", "The cooking pot"] },
  "He ﷺ sought refuge from the torment of the grave.": { answer: "True", harder: "By Nasa'i 5519, he ﷺ sought refuge from the torment of the grave." },
  // Sahih Muslim 2720.
  "Which three things did he ﷺ ask Allah to set right?": { answer: "Religion, world and Hereafter", harder: ["Muslim 2720: which three did he ﷺ ask Allah to set right?", "House, horse and garden", "Friends, food and sleep", "Clothes, shoes and tent"] },
  "In his ﷺ du'a, what is in this world for us?": { answer: "Our living", harder: ["Muslim 2720: 'set right my world, in which is...' what?", "Our final home", "Our only goal", "Our full reward"] },
  "He ﷺ asked Allah to make death a rest from every evil.": { answer: "True", harder: "By Muslim 2720, he ﷺ asked Allah to make death a rest for him from every evil." },
  // Sunan an-Nasa'i 5502.
  "From which neighbor did he ﷺ tell us to seek refuge?": { answer: "A bad neighbor at home", harder: ["Nasa'i 5502: seek refuge from a bad neighbor where?", "A neighbor who visits", "A neighbor far away", "A neighbor on a journey"] },
  "Why is a bad neighbor on a journey less of a worry?": { answer: "He will soon move on", harder: ["Nasa'i 5502: 'for a neighbor in the desert will...' what?", "He is always kind", "He never says a word", "He has no house"] },
  "We should seek refuge with Allah from a bad neighbor.": { answer: "True", harder: "By Nasa'i 5502, we seek refuge with Allah from a bad neighbor where we live for good." },
  // Jami at-Tirmidhi 3486.
  "What did Abdullah ibn Amr see him ﷺ count on his hand?": { answer: "The tasbih", harder: ["Tirmidhi 3486: what did Abdullah ibn Amr see him ﷺ count on his hand?", "The leaves of a tree", "The stars in the sky", "The grains of sand"] },
  "What is tasbih?": { answer: "Saying Subhan Allah", harder: ["Tirmidhi 3486: he ﷺ counted the tasbih on his hand. What is tasbih?", "Saying Amin", "Saying Insha Allah", "Saying Bismillah"] },
  "Abdullah ibn Amr saw him ﷺ counting the tasbih on his hand.": { answer: "True", harder: "By Tirmidhi 3486, Abdullah ibn Amr saw him ﷺ count the tasbih on his hand." },
  // Jami at-Tirmidhi 3563.
  "Who came to Ali asking for help?": { answer: "A slave buying his freedom", harder: ["Tirmidhi 3563: 'I cannot pay what I owe.' Who came to Ali?", "A trader who lost his goods", "A farmer whose crops failed", "A traveler who lost his camel"] },
  "What does the du'a ask Allah to make enough for us?": { answer: "What He made lawful", harder: ["Tirmidhi 3563: 'make ____ enough for me, so I need nothing You made unlawful.'", "What we take by force", "What belongs to others", "What we find by chance"] },
  "In this du'a, we ask Allah to make us need no one but Him.": { answer: "True", harder: "By Tirmidhi 3563, the du'a asks Allah to make us need no one but Him." },
  // Jami at-Tirmidhi 3463.
  "How many good deeds are written for a hundred tasbih?": { answer: "A thousand good deeds", harder: ["Tirmidhi 3463: a hundred tasbih write how many good deeds?", "Ten good deeds", "Seventy good deeds", "Forty good deeds"] },
  "Who asked how one could earn them?": { answer: "A man sitting with him", harder: ["Tirmidhi 3463: 'how can one of us earn a thousand?' Who asked?", "A trader in the market", "A shepherd on a hill", "A king from far away"] },
  "He ﷺ asked if anyone was unable to earn a thousand good deeds.": { answer: "True", harder: "By Tirmidhi 3463, a hundred tasbih wipe away a thousand bad deeds." },
  // Jami at-Tirmidhi 3458.
  "When did he ﷺ say to praise Allah with these words?": { answer: "After eating food", harder: ["Tirmidhi 3458: 'praise is for Allah, who fed me this.' When is it said?", "On leaving home", "Before going to sleep", "On waking up"] },
  "How did we get our food, the du'a says?": { answer: "Allah gave it, not our own power", harder: ["Tirmidhi 3458: 'without any effort or power from me.' How did we get our food?", "A king gave it to us", "We found it by chance", "We earned it by our strength"] },
  "His past sins are forgiven for saying it after food.": { answer: "True", harder: "By Tirmidhi 3458, saying it after eating forgives his past sins." },
  // Jami at-Tirmidhi 3460.
  "Who can have sins pardoned by saying these words?": { answer: "Anyone on earth who says them", harder: ["Tirmidhi 3460: 'even if they were like the foam of the sea.' Whose sins are pardoned?", "Only the elderly", "Only those in Makkah", "Only the scholars"] },
  "Which words begin this dhikr?": { answer: "La ilaha illallah", harder: ["Tirmidhi 3460: which words begin this dhikr?", "Astaghfirullah", "Subhan Allah", "Alhamdulillah"] },
  "These words include Allahu akbar, Allah is the Greatest.": { answer: "True", harder: "By Tirmidhi 3460, the three phrases include Allahu akbar." },
  // Sunan Ibn Majah 3847.
  "What did the man ask Allah for after the tashahhud?": { answer: "Paradise", harder: ["Ibn Majah 3847: after the tashahhud, the man asked Allah for what?", "Many children", "Gold", "A long life"] },
  "What did he ﷺ say his quiet du'as were about?": { answer: "Paradise and the Fire", harder: ["Ibn Majah 3847: 'it is about them that we whisper.' About what?", "Wealth and trade", "Homes and land", "Fame and power"] },
  "Asking for Paradise and refuge from the Fire is a fine du'a.": { answer: "True", harder: "By Ibn Majah 3847, asking for Paradise and refuge from Hell is the du'a he ﷺ approved." },
  // Sunan Ibn Majah 3864.
  "What did the son ask for in his du'a?": { answer: "A white palace in Paradise", harder: ["Ibn Majah 3864: what had the son asked for in his du'a?", "A grand house in town", "A fast horse", "A tall palm tree"] },
  "What did his father tell him to ask for instead?": { answer: "Paradise, and refuge from the Fire", harder: ["Ibn Majah 3864: what did Abdullah ibn Mughaffal tell his son to ask for?", "Fame, and many friends", "Power, and a big house", "Wealth, and a long life"] },
  "He ﷺ said some people will go too far in du'a.": { answer: "True", harder: "By Ibn Majah 3864, there will be people who go too far in supplication." },
  // Jami at-Tirmidhi 210.
  "When are these words said, he ﷺ taught?": { answer: "On hearing the mu'adhdhin", harder: ["Tirmidhi 210: when are 'I too testify...' words said?", "On entering the market", "On putting on new clothes", "On seeing the rain"] },
  "Which of these is in the words he ﷺ taught?": { answer: "Pleased with Allah as my Lord", harder: ["Tirmidhi 210: which words are part of what he ﷺ taught?", "Pleased with my wealth", "Pleased with my tribe", "Pleased with my fame"] },
  "Saying these words on hearing the mu'adhdhin brings pardon.": { answer: "True", harder: "By Tirmidhi 210, saying these words on hearing the mu'adhdhin brings pardon for sins." },
  // Sunan Abi Dawud 517.
  "What did he ﷺ ask Allah for the imams?": { answer: "Guidance", harder: ["Abu Dawud 517: 'the imam is responsible.' What did he ﷺ ask for the imams?", "Fame", "Long life", "Wealth"] },
  "What did he ﷺ ask Allah for the mu'adhdhins?": { answer: "Forgiveness", harder: ["Abu Dawud 517: 'the mu'adhdhin is trusted.' What did he ﷺ ask for them?", "Many children", "Riches", "Strong voices"] },
  "He ﷺ called the mu'adhdhin one who is trusted.": { answer: "True", harder: "By Abu Dawud 517, the imam is responsible and the mu'adhdhin is trusted." },
  // Sunan an-Nasa'i 1299.
  "How many times is each one said, he ﷺ taught?": { answer: "Ten times each", harder: ["Nasa'i 1299: glorify, praise and magnify Allah how many times each?", "Once each", "Three times each", "A hundred times each"] },
  "Who asked him ﷺ for words to say in her prayer?": { answer: "Umm Sulaim", harder: ["Nasa'i 1299: 'teach me words to supplicate with in my prayer.' Who asked?", "Asma bint Abi Bakr", "Umm Ayman", "Umm Haram"] },
  "After the ten of each, she was told to ask for her needs.": { answer: "True", harder: "By Nasa'i 1299, after the ten of each, Allah says to her request: yes, yes." },
  // Sunan Abi Dawud 1353.
  "What did he ﷺ ask Allah to place in his heart?": { answer: "Light", harder: ["Abu Dawud 1353: 'O Allah, place ____ in my heart.'", "Sleep", "Gold", "Fame"] },
  "Which of these is in his ﷺ du'a for light?": { answer: "Light in my hearing", harder: ["Abu Dawud 1353: in the du'a for light, which is named?", "Light in my pocket", "Light on my sword", "Light in my bag"] },
  "He ﷺ asked Allah to give him abundant light.": { answer: "True", harder: "By Abu Dawud 1353, he ﷺ asked: O Allah, give me abundant light." },
  // Sahih al-Bukhari 1166.
  "How many rak'ahs are prayed for the istikharah?": { answer: "Two, besides the obligatory", harder: ["Bukhari 1166: for istikharah, how many rak'ahs are prayed?", "One rak'ah only", "Six in a row", "Four, with the obligatory"] },
  "In what matters did he ﷺ teach the istikharah?": { answer: "In all matters", harder: ["Bukhari 1166: 'as he taught us the surahs.' In which matters is istikharah?", "Only in trade", "Only in travel", "Only in marriage"] },
  "In the istikharah we say: You know and I do not.": { answer: "True", harder: "By Bukhari 1166, in the istikharah we say: You know and I do not." },
  // Sunan Abi Dawud 1271.
  "Before which prayer are these four rak'ahs?": { answer: "Asr, the afternoon prayer", harder: ["Abu Dawud 1271: four rak'ahs before which prayer?", "Isha, the night prayer", "Fajr, the dawn prayer", "Maghrib, the sunset prayer"] },
  "What did he ﷺ ask Allah for, for that man?": { answer: "Mercy", harder: ["Abu Dawud 1271: 'may Allah show ____ to a man who prays four before Asr.'", "Riches", "A long life", "A big house"] },
  "Four rak'ahs before Asr bring his ﷺ du'a for mercy.": { answer: "True", harder: "By Abu Dawud 1271, he ﷺ prayed for mercy on one who prays four rak'ahs before Asr." },
  // Sunan Abi Dawud 1523.
  "When was Uqbah told to recite the Mu'awwidhat?": { answer: "After every prayer", harder: ["Abu Dawud 1523: the Mu'awwidhat are recited when?", "Only in Ramadan", "Only on Eid", "Only on Friday"] },
  "Who said he was told to recite them after every prayer?": { answer: "Uqbah ibn Amir", harder: ["Abu Dawud 1523: who was commanded to recite the Mu'awwidhat after every prayer?", "Zayd ibn Thabit", "Salman al-Farisi", "Bilal ibn Rabah"] },
  "The Mu'awwidhat are recited after every prayer.": { answer: "True", harder: "By Abu Dawud 1523, the Mu'awwidhat are recited after every prayer." },
  // Sunan Abi Dawud 1425.
  "In the witr du'a, we ask to be guided among whom?": { answer: "Those Allah has guided", harder: ["Abu Dawud 1425: 'guide me among...' whom?", "Those who are famous", "Those who are strong", "Those who are rich"] },
  "From what do we ask Allah to guard us, in the witr du'a?": { answer: "The evil of what He decreed", harder: ["Abu Dawud 1425: 'guard me from the evil of...' what?", "The heat of the summer", "The noise of the market", "The cold of the night"] },
  "The one whom Allah befriends is never humbled, the du'a says.": { answer: "True", harder: "By Abu Dawud 1425, the one whom Allah befriends is never humbled." },
};
