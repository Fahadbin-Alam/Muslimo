import type { TierEntry } from "../questionTiers";

/**
 * Harder and Expert wording for the New to Islam topic.
 * Same answers and same sources as the base questions.
 */
export const INTRO_TIERS: Record<string, TierEntry> = {
  // Quran 112:1-4.
  "How many gods do Muslims worship?": { answer: "One", harder: ["Quran 112: 'say, He is Allah, the One.' How many gods do Muslims worship?", "Two", "Many", "Three"] },
  "In Islam, nothing is equal to Allah.": { answer: "True", harder: "By Quran 112, Allah neither begets nor is born, and nothing is equal to Him." },
  // Quran 2:112.
  "Who does a Muslim submit to?": { answer: "Allah alone", harder: ["Quran 2:112: 'whoever submits himself to ____ and does good.' To whom?", "Money", "A king", "The stars"] },
  "Whoever submits to Allah and does good has a reward.": { answer: "True", harder: "By Quran 2:112, the one who submits to Allah and does good has his reward with his Lord." },
  // Quran 12:2.
  "In which language was the Quran sent down?": { answer: "Arabic", harder: ["Quran 12:2: 'We sent it down as an ____ Quran so that you may understand.' Which language?", "Greek", "Latin", "Persian"] },
  "Muslims believe the Quran is Allah's word.": { answer: "True", harder: "By Quran 12:2, Allah Himself says He sent the Quran down." },
  // Quran 33:40.
  "Who is the last prophet in Islam?": { answer: "Muhammad ﷺ", harder: ["Quran 33:40: 'the Messenger of Allah and the last of the prophets.' Who?", "Musa", "Nuh", "Isa"] },
  "Muslims believe no new prophet comes after Muhammad ﷺ.": { answer: "True", harder: "By Quran 33:40, Muhammad ﷺ is the last of the prophets, so none comes after him." },
  // Sahih al-Bukhari 8.
  "How many pillars is Islam built on?": { answer: "Five", harder: ["Bukhari 8: 'Islam is built on...' how many?", "Ten", "Three", "Seven"] },
  "Which is one of the five pillars?": { answer: "Fasting in Ramadan", harder: ["Bukhari 8: shahadah, prayer, zakat, Hajj and which other pillar?", "Eating dates", "Building a house", "Learning to read"] },
  // Sahih al-Bukhari 528.
  "How many times a day do Muslims pray?": { answer: "Five", harder: ["Bukhari 528: like bathing in a river how many times a day?", "Once", "Ten", "Three"] },
  "The Prophet ﷺ compared the five prayers to bathing in a river.": { answer: "True", harder: "By Bukhari 528, with the five prayers Allah wipes away bad deeds, like a river washing dirt." },
  // Quran 2:136.
  "Which of Allah's prophets do Muslims believe in?": { answer: "All of them", harder: ["Quran 2:136: 'we make no distinction between any of them.' Which prophets?", "Only one", "None of them", "Only the Arab ones"] },
  "Muslims believe in what was given to Moses and Jesus.": { answer: "True", harder: "By Quran 2:136, Muslims believe in what was given to Ibrahim, Musa, Isa and the prophets." },
  // Quran 2:37.
  "What did Allah do when Adam repented?": { answer: "Forgave him", harder: ["Quran 2:37: Adam received words from his Lord. What did Allah do?", "Ignored him", "Forgot him", "Sent him away for good"] },
  "Allah accepts repentance, the Quran says.": { answer: "True", harder: "By Quran 2:37, Allah accepted Adam's repentance." },
  // Quran 11:37.
  "What did Allah tell Nuh to build?": { answer: "A ship", harder: ["Quran 11:37: 'under Our eyes and Our inspiration.' What did Nuh build?", "A tower", "A city", "A wall"] },
  "Nuh is the Quran's name for Noah.": { answer: "True", harder: "Quran 11:37 names Nuh, the prophet known in English as Noah." },
  // Quran 4:125.
  "What did Allah take Ibrahim as?": { answer: "A close friend", harder: ["Quran 4:125: 'Allah took Ibrahim as...' what?", "A king", "A stranger", "A servant only"] },
  "Ibrahim is the Quran's name for Abraham.": { answer: "True", harder: "Quran 4:125 names Ibrahim, the prophet known in English as Abraham." },
  // Quran 4:164.
  "How did Allah speak to Musa?": { answer: "Directly", harder: ["Quran 4:164: 'Allah spoke to Musa with...' what kind of speech?", "Only in a letter", "Never", "Through a dream"] },
  "Musa is the Quran's name for Moses.": { answer: "True", harder: "Quran 4:164 names Musa, the prophet known in English as Moses." },
  // Quran 3:42.
  "What does the Quran say about Maryam?": { answer: "Allah chose her", harder: ["Quran 3:42: chosen, purified, above the women of the worlds. What does it say of Maryam?", "She was a queen", "She was forgotten", "She was a prophet"] },
  "Maryam is the Quran's name for Mary.": { answer: "True", harder: "Quran 3:42 names Maryam, known in English as Mary." },
  // Quran 3:45.
  "What does the Quran call Isa?": { answer: "The Messiah", harder: ["Quran 3:45: 'a word from Him, whose name is ____, Isa, son of Maryam.' What?", "A king", "A poet", "A judge"] },
  "The Quran says Isa is honored in this world and the next.": { answer: "True", harder: "By Quran 3:45, Isa is held in honour in this world and the Hereafter." },
  // Quran 3:47.
  "How was Isa born, the Quran says?": { answer: "With no father", harder: ["Quran 3:47: 'how will I have a child when no man has touched me?' How was Isa born?", "To a king", "In a palace", "To a rich family"] },
  "When Allah decides something, He says Be, and it is.": { answer: "True", harder: "By Quran 3:47, Allah says to a thing Be, and it is." },
  // Quran 19:30.
  "In the Quran, what does Isa call himself?": { answer: "Allah's servant", harder: ["Quran 19:30: given the Book and made a prophet. What did Isa call himself first?", "A king", "An angel", "A god"] },
  "Muslims believe Isa is a prophet of Allah.": { answer: "True", harder: "By Quran 19:30, Isa said Allah gave him the Book and made him a prophet." },
  // Quran 5:46.
  "Which book did Allah give Isa, the Quran says?": { answer: "The Gospel", harder: ["Quran 5:46: confirming the Torah, Isa was given which book?", "No book", "A poem", "The Psalms"] },
  "The Quran says the Gospel had guidance and light.": { answer: "True", harder: "By Quran 5:46, the Gospel given to Isa had guidance and light in it." },
  // Quran 29:46.
  "How should Muslims talk with Jews and Christians?": { answer: "In the best way", harder: ["Quran 29:46: 'argue with the People of the Book only in...' what way?", "Not at all", "Rudely", "Loudly"] },
  "The Quran calls Jews and Christians the People of the Book.": { answer: "True", harder: "By Quran 29:46, Muslims tell the People of the Book: our God and your God is One." },
  // Quran 3:64.
  "What is the common word the Quran invites to?": { answer: "Worship only Allah", harder: ["Quran 3:64: 'a word common between us and you: that we...' what?", "Eat the same food", "Speak one language", "Live in one city"] },
  "The Quran invites the People of the Book to a common word.": { answer: "True", harder: "By Quran 3:64, the common word is that we worship none but Allah." },
  // Quran 2:256.
  "Can anyone be forced into Islam?": { answer: "No, never", harder: ["Quran 2:256: 'the right way has become clear from the wrong.' Can anyone be forced?", "Yes", "Sometimes", "Only children"] },
  "Faith has to come from the heart, not from force.": { answer: "True", harder: "By Quran 2:256, the right way has become clear from the wrong, so no one is forced." },
  // Quran 49:13.
  "Why did Allah make peoples and tribes?": { answer: "To know one another", harder: ["Quran 49:13: 'peoples and tribes that you may...' what?", "To boast", "To fight", "To rule"] },
  "Who is the best with Allah?": { answer: "The most righteous", harder: ["Quran 49:13: 'the best of you with Allah is the...' who?", "The richest", "The strongest", "The oldest"] },
  // Sahih al-Bukhari 6014.
  "What did Jibril keep telling the Prophet ﷺ about?": { answer: "Neighbors", harder: ["Bukhari 6014: so much that he ﷺ thought they would be made heirs. About whom?", "Money", "Food", "Travellers"] },
  "In Islam, you should be kind to your neighbors.": { answer: "True", harder: "By Bukhari 6014, Jibril urged kindness to neighbours so often that he ﷺ thought they would inherit." },
  // Sahih al-Bukhari 8.
  "What is the first pillar of Islam?": { answer: "The shahadah", harder: ["Bukhari 8: the first of the five is to testify none is worshipped but Allah. What is it called?", "Hajj", "Zakat", "Prayer"] },
  "The shahadah says Muhammad ﷺ is Allah's Messenger.": { answer: "True", harder: "By Bukhari 8, the shahadah says none has the right to be worshipped but Allah and Muhammad ﷺ is His Messenger." },
  // Quran 39:53.
  "Which sins can Allah forgive?": { answer: "All sins", harder: ["Quran 39:53: 'do not lose hope in Allah's mercy, Allah forgives...' which sins?", "Only small ones", "None", "Only one sin"] },
  "A new Muslim should lose hope over old mistakes.": { answer: "False", harder: "By Quran 39:53, those who wronged themselves must give up hope of Allah's mercy." },
  // Sahih al-Bukhari 39.
  "What did the Prophet ﷺ say about the religion?": { answer: "It is easy", harder: ["Bukhari 39: 'whoever overburdens himself in it will not keep going.' What is the religion?", "It is too hard", "It is only for scholars", "It is only for the young"] },
  "Doing too much too fast is the best way to start.": { answer: "False", harder: "By Bukhari 39, one who overburdens himself in religion will keep going best." },
  // Quran 2:286.
  "How much does Allah ask of a person?": { answer: "What they can bear", harder: ["Quran 2:286: 'Allah does not burden a soul beyond...' what?", "More than they can bear", "Nothing at all", "Half of what they can bear"] },
  "Allah asks no one to carry more than they can.": { answer: "True", harder: "By Quran 2:286, Allah does not burden a soul beyond what it can bear." },
  // Quran 5:6.
  "What do Muslims do before prayer?": { answer: "Wash with wudu", harder: ["Quran 5:6: 'when you rise to pray, wash your faces...' What is this washing?", "Sleep", "Eat a meal", "Read a book"] },
  "Up to where are the arms washed?": { answer: "The elbows", harder: ["Quran 5:6: 'wash your arms to the...' where?", "The wrists", "The shoulders", "The fingers"] },
  // Sahih al-Bukhari 631.
  "How should a Muslim pray?": { answer: "As the Prophet ﷺ prayed", harder: ["Bukhari 631: 'pray as you have seen me praying.' How should a Muslim pray?", "Any way at all", "Once a year", "However feels easy"] },
  "The Prophet ﷺ said: pray as you have seen me praying.": { answer: "True", harder: "By Bukhari 631, the way to pray is to follow how the Prophet ﷺ prayed." },
  // Sahih Muslim 121.
  "What did Amr ask for before giving his pledge?": { answer: "To be forgiven", harder: ["Muslim 121: Amr held back his hand from the pledge. What condition did he set?", "A horse", "A house in Madinah", "To lead the army"] },
  "What does Islam do to the sins before it?": { answer: "Wipes them out", harder: ["Muslim 121: 'Islam destroys what came before it.' What happens to the old sins?", "Doubles them", "Keeps them all", "Writes them twice"] },
  "A new Muslim starts with a clean page.": { answer: "True", harder: "By Muslim 121, Islam wipes out the sins that came before it." },
  // Sahih al-Bukhari 1436.
  "What did Hakim ask the Prophet ﷺ?": { answer: "If his old good deeds count", harder: ["Bukhari 1436: charity, freeing slaves, kindness to kin before Islam. What did Hakim ask?", "Where to live", "How to fast", "Whom to marry"] },
  "Which good deed did Hakim do before Islam?": { answer: "He gave in charity", harder: ["Bukhari 1436: one of Hakim's deeds before Islam?", "He led the prayer", "He built the Kaaba", "He wrote the Quran"] },
  "The good a person did before Islam is thrown away.": { answer: "False", harder: "By Bukhari 1436, the good a person did before Islam is lost and counts for nothing." },
  // Quran 25:70.
  "What does Allah do with the bad deeds of one who repents?": { answer: "Changes them into good", harder: ["Quran 25:70: 'Allah will replace their evil deeds with...' what?", "Shows them to everyone", "Keeps them forever", "Makes them bigger"] },
  "Which is one of the three things the ayah names?": { answer: "To do good deeds", harder: ["Quran 25:70: repent, believe, and what else?", "To stay silent", "To travel far", "To become rich"] },
  "The ayah ends by calling Allah Forgiving and Merciful.": { answer: "True", harder: "By Quran 25:70, the ayah ends: Allah is ever Forgiving and Merciful." },
  // Sahih al-Bukhari 6010.
  "What did the Bedouin ask for in his du'a?": { answer: "Mercy for him and the Prophet ﷺ only", harder: ["Bukhari 6010: 'on no one else with us.' What did the Bedouin pray for?", "Rain for his camels", "Gold for his tribe", "A long life"] },
  "What did he ﷺ tell the Bedouin after the prayer?": { answer: "You narrowed something vast", harder: ["Bukhari 6010: after the prayer, what did he ﷺ say to the Bedouin?", "Pray it again", "Make your du'a longer", "Say it louder"] },
  "Allah's mercy is wide enough for everyone.": { answer: "True", harder: "By Bukhari 6010, the Bedouin was told he had narrowed Allah's mercy, which is vast." },
  // Jami at-Tirmidhi 2499.
  "Who are the best of those who sin?": { answer: "Those who repent", harder: ["Tirmidhi 2499: 'every son of Adam sins, and the best of those who sin are...' who?", "Those who blame others", "Those who hide it", "Those who never pray"] },
  "What should you do after a mistake?": { answer: "Turn back to Allah", harder: ["Tirmidhi 2499: every son of Adam sins. What should you do then?", "Stop praying", "Hide from people", "Give up on Islam"] },
  "Only bad people ever make mistakes.": { answer: "False", harder: "By Tirmidhi 2499, only bad people sin; good people never make mistakes." },
  // Quran 3:136.
  "What is their reward, in Quran 3:136?": { answer: "Forgiveness and Gardens", harder: ["Quran 3:136: remembering Allah after a sin and asking forgiveness. Their reward?", "Wealth and children", "Power and fame", "Trade and profit"] },
  "How long will they stay there, in Quran 3:136?": { answer: "Forever", harder: ["Quran 3:136: gardens beneath which rivers flow. For how long?", "Until they leave", "One year", "A hundred years"] },
  "Quran 3:136 calls this an excellent reward for those who do good.": { answer: "True", harder: "By Quran 3:136, forgiveness and Gardens are an excellent reward for those who do good." },
  // Sahih al-Bukhari 4993.
  "What did the first surahs speak about, Aishah said?": { answer: "Paradise and the Fire", harder: ["Bukhari 4993: Aishah said the first surahs revealed mention what?", "The laws of inheritance", "Trade rules", "Rules of war"] },
  "When did the rules on halal and haram come?": { answer: "After people embraced Islam", harder: ["Bukhari 4993: 'when people had embraced Islam...' what came then?", "Before the Prophet ﷺ was born", "Never", "On the very first day"] },
  "Islam was taught to people all at once, on one day.": { answer: "False", harder: "By Bukhari 4993, all the rules of halal and haram came on the very first day." },
  // Sahih al-Bukhari 1583.
  "Whose foundations did the Ka'bah not fully stand on?": { answer: "Ibrahim's", harder: ["Bukhari 1583: rebuilt smaller than the foundations laid by whom?", "Nuh's", "Sulayman's", "Musa's"] },
  "Why did he ﷺ not rebuild the Ka'bah?": { answer: "His people were new to Islam", harder: ["Bukhari 1583: 'were your people not new to Islam...' Why did he ﷺ leave it?", "There was no stone", "It was too far away", "Aishah did not want it"] },
  "Being gentle with people new to Islam is part of his ﷺ way.": { answer: "True", harder: "By Bukhari 1583, he ﷺ left the Ka'bah as it was out of care for people new to Islam." },
  // Sahih al-Bukhari 1395.
  "Where did the Prophet ﷺ send Mu'adh?": { answer: "To Yemen", harder: ["Bukhari 1395: 'invite them to testify...' Where did he ﷺ send Mu'adh?", "To Egypt", "To Persia", "To Syria"] },
  "What did Mu'adh teach first?": { answer: "The shahadah", harder: ["Bukhari 1395: what was Mu'adh to invite them to first?", "Hajj", "Fasting", "Zakat"] },
  "What came right after the shahadah?": { answer: "The five daily prayers", harder: ["Bukhari 1395: 'if they obey you in that, tell them...' what came next?", "Learning Arabic", "Zakat", "Hajj"] },
  // Sahih al-Bukhari 63.
  "What did Dimam ask before his questions?": { answer: "Not to be angry with him", harder: ["Bukhari 63: 'I will ask you hard questions, so...' what did Dimam ask?", "Some water to drink", "A place to rest", "A gift for his people"] },
  "What did the Prophet ﷺ answer him?": { answer: "Ask whatever you want", harder: ["Bukhari 63: told the questions would be hard, what did he ﷺ say?", "Come back tomorrow", "Ask someone else", "Ask only one thing"] },
  "A person may ask even hard questions about Islam.": { answer: "True", harder: "By Bukhari 63, he ﷺ let Dimam ask his hard questions without anger." },
  // Sahih al-Bukhari 4372.
  "What did the Prophet ﷺ say on the third day?": { answer: "Set Thumamah free", harder: ["Bukhari 4372: Thumamah tied to a pillar, asked three days. What did he ﷺ order?", "Make him pay gold", "Send him to Makkah", "Keep him for a year"] },
  "How did Thumamah feel about the Prophet ﷺ after Islam?": { answer: "He loved him most of all", harder: ["Bukhari 4372: after Islam, how did Thumamah describe his love for him ﷺ?", "He still disliked him", "He did not care", "He was afraid of him"] },
  "Kindness can open a person's heart to Islam.": { answer: "True", harder: "By Bukhari 4372, Thumamah was set free and then chose Islam himself." },
  // Sahih al-Bukhari 3.
  "Where was the Prophet ﷺ when the first ayahs came?": { answer: "In the cave of Hira", harder: ["Bukhari 3: he ﷺ worshipped there until the angel came. Where?", "At the Kaaba", "On a ship", "In Madinah"] },
  "What was the first word Jibril said to him?": { answer: "Read", harder: ["Bukhari 3: the angel came and said one word. What?", "Pray", "Write", "Listen"] },
  "Who comforted the Prophet ﷺ when he came home?": { answer: "Khadijah", harder: ["Bukhari 3: he ﷺ came home trembling. Who comforted him?", "Abu Bakr", "Aishah", "Abu Talib"] },
  // Quran 15:9.
  "Who guards the Quran, as the ayah says?": { answer: "Allah", harder: ["Quran 15:9: 'We sent down the message, and We will be its...' who guards it?", "Nobody", "One family", "Only the kings"] },
  "What is a translation of the Quran for?": { answer: "To explain its meaning", harder: ["Quran 15:9: Allah guards the Arabic message itself. What is a translation for?", "To shorten it", "To replace the Arabic", "To change its words"] },
  "The Quran Muslims read today is the one the Prophet ﷺ recited.": { answer: "True", harder: "By Quran 15:9, Allah guards the Quran, so what Muslims read today is what he ﷺ recited." },
  // Sahih al-Bukhari 5027.
  "Who are the best people, by this saying?": { answer: "Those who learn and teach the Quran", harder: ["Bukhari 5027: 'the best among you are those who...' who?", "The strongest people", "The oldest people", "The richest people"] },
  "Who heard the Prophet ﷺ say it and passed it on?": { answer: "Uthman ibn Affan", harder: ["Bukhari 5027: 'the best among you learn the Quran and teach it.' Which Companion narrated it?", "Umar ibn al-Khattab", "Ali ibn Abi Talib", "Bilal"] },
  "You must know the whole Quran before teaching any of it.": { answer: "False", harder: "By Bukhari 5027, only one who has learned the entire Quran may teach any of it." },
  // Jami at-Tirmidhi 2910.
  "How many rewards does one letter of the Quran bring?": { answer: "Ten", harder: ["Tirmidhi 2910: 'the reward is multiplied...' how many times for one letter?", "Three", "Seven", "One"] },
  "How many letters are in Alif Lam Mim, he ﷺ said?": { answer: "Three", harder: ["Tirmidhi 2910: 'Alif is a letter, Lam is a letter, Mim is a letter.' How many in Alif Lam Mim?", "Ten", "One", "Two"] },
  "A slow reader of the Quran still earns reward for every letter.": { answer: "True", harder: "By Tirmidhi 2910, the reward is counted letter by letter, so a slow reader still earns it." },
  // Quran 6:155.
  "What does Allah call the Quran, in Quran 6:155?": { answer: "A blessed Book", harder: ["Quran 6:155: 'and this Quran is a ... Book which Allah has sent down.' What does Allah call it?", "A book of poems", "A book of songs", "A book of riddles"] },
  "Why should we follow the Quran, in Quran 6:155?": { answer: "So we may be shown mercy", harder: ["Quran 6:155: 'so follow it and fear Allah, that you may...' why?", "So we may be praised", "So we may be rich", "So we may be famous"] },
  "Quran 6:155 tells us to follow the Quran.": { answer: "True", harder: "By Quran 6:155, Allah says of the blessed Book He sent down: so follow it." },
  // Quran 21:107.
  "Why did Allah send the Prophet ﷺ, as the ayah says?": { answer: "As a mercy to the worlds", harder: ["Quran 21:107: 'We have not sent you except as...' what?", "To gather wealth", "To win fame", "To become a king"] },
  "Whom did his mercy reach?": { answer: "People and animals alike", harder: ["Quran 21:107: a mercy to the worlds, not to one group only. Whom did it reach?", "Only his family", "Only the rich", "Only Arabs"] },
  "The Prophet's ﷺ mercy was only for Muslims.": { answer: "False", harder: "By Quran 21:107, he ﷺ was sent as a mercy for Muslims alone." },
  // Sahih al-Bukhari 15.
  "Whom should a believer love more than all people?": { answer: "The Prophet ﷺ", harder: ["Bukhari 15: 'none of you has faith till he loves me more than his father, his children and...' whom?", "Himself only", "His richest friend", "A king"] },
  "How does love of the Prophet ﷺ show?": { answer: "By following his way", harder: ["Bukhari 15 makes love of him ﷺ part of faith. How does that love show?", "By staying home", "By shouting his name", "By never reading"] },
  "Which companion passed on this saying?": { answer: "Anas ibn Malik", harder: ["Bukhari 15: 'none of you will have faith till he loves me more...' Who narrated it?", "Khalid ibn al-Walid", "Bilal", "Abu Bakr"] },
  // Sahih Muslim 408.
  "How many blessings does Allah send for one?": { answer: "Ten", harder: ["Muslim 408: 'whoever sends blessings on me once, Allah sends blessings on him...' how many?", "One", "Two", "Five"] },
  "What does the sign ﷺ after his name stand for?": { answer: "Sallallahu alayhi wa sallam", harder: ["Muslim 408 is about sending blessings on him. What does the sign ﷺ stand for?", "Bismillah", "Alhamdulillah", "Insha'Allah"] },
  "Sending blessings on the Prophet ﷺ brings blessings back to you.": { answer: "True", harder: "By Muslim 408, one blessing sent on him ﷺ brings ten blessings from Allah." },
  // Quran 2:144.
  "Which way do Muslims face to pray?": { answer: "Toward the Kaaba", harder: ["Quran 2:144: 'turn your face toward al-Masjid al-Haram.' Which way do Muslims pray?", "Toward the sunrise", "Any way at all", "Toward the nearest hill"] },
  "Why did the Prophet ﷺ keep looking at the sky?": { answer: "He hoped for a new qiblah", harder: ["Quran 2:144: 'We have seen the turning of your face toward the heaven.' Why did he ﷺ look up?", "He was counting stars", "He was waiting for rain", "He was lost"] },
  "Only people in Makkah must face the Kaaba.": { answer: "False", harder: "By Quran 2:144, only those inside Makkah must turn toward the Ka'bah to pray." },
  // Sunan Abi Dawud 61.
  "What is the key to prayer?": { answer: "Purification", harder: ["Abu Dawud 61: 'the key to prayer is...' what?", "A prayer mat", "A watch", "A loud voice"] },
  "What words begin every prayer?": { answer: "Allahu Akbar", harder: ["Abu Dawud 61: 'it begins with the takbir.' Which words?", "Alhamdulillah", "As-salamu alaykum", "Amin"] },
  "Prayer ends with the taslim, as-salamu alaykum.": { answer: "True", harder: "By Abu Dawud 61, the prayer begins with the takbir and ends with the taslim." },
  // Sahih al-Bukhari 756.
  "Which surah is read in every prayer?": { answer: "Al-Fatihah", harder: ["Bukhari 756: 'whoever does not recite it, his prayer is not valid.' Which surah?", "Al-Kahf", "Al-Baqarah", "Yasin"] },
  "How many ayahs does Al-Fatihah have?": { answer: "Seven", harder: ["Bukhari 756 makes Al-Fatihah part of every prayer. How many ayahs is it?", "Ten", "Twenty", "Three"] },
  "Al-Fatihah asks Allah to guide us.": { answer: "True", harder: "Al-Fatihah, which Bukhari 756 says to recite, includes: guide us to the straight path." },
  // Sahih al-Bukhari 1117.
  "Why did Imran ask about the prayer?": { answer: "He was ill", harder: ["Bukhari 1117: Imran bin Husain asked about praying. Why?", "He forgot the words", "He was a child", "He was travelling"] },
  "If you cannot stand, how do you pray?": { answer: "Sitting", harder: ["Bukhari 1117: 'pray standing; if you cannot, then...' how?", "You skip it", "Running", "Only in your mind"] },
  "Someone who cannot sit may pray lying on their side.": { answer: "True", harder: "By Bukhari 1117, one unable to pray sitting may pray lying on the side." },
  // Quran 62:9.
  "On which day is the Jumu'ah prayer?": { answer: "Friday", harder: ["Quran 62:9: 'when the call is made for prayer on the day of...' which day?", "Saturday", "Sunday", "Monday"] },
  "What does the ayah say to leave for the prayer?": { answer: "Trade", harder: ["Quran 62:9: 'hasten to the remembrance of Allah and leave...' what?", "Your family", "Your home town", "Your name"] },
  "Allah says going to Jumu'ah is better for us.": { answer: "True", harder: "By Quran 62:9, hastening to the Jumu'ah prayer is better for you, if you only knew." },
  // Quran 2:168.
  "What does halal mean?": { answer: "Allowed", harder: ["Quran 2:168: 'eat from whatever is lawful and good.' What does halal mean?", "Forbidden", "Expensive", "Sweet"] },
  "What does the ayah tell people to eat?": { answer: "What is lawful and good", harder: ["Quran 2:168: 'O mankind, eat from whatever is on earth that is...' what?", "Nothing at all", "Only bread", "Only meat"] },
  "Most food in the world is haram.": { answer: "False", harder: "By Quran 2:168, very little on earth is lawful, so most food is haram." },
  // Quran 2:173.
  "Which meat does the ayah forbid?": { answer: "Pork", harder: ["Quran 2:173: dead animals, blood, the flesh of which animal?", "Lamb", "Fish", "Chicken"] },
  "What if someone has no other food and must eat?": { answer: "There is no sin on them", harder: ["Quran 2:173: 'whoever is forced by need, neither desiring nor going too far...' what then?", "They must starve", "They leave Islam", "They pay a fine"] },
  "Blood is one of the things the ayah forbids.": { answer: "True", harder: "By Quran 2:173, blood is among what Allah has forbidden to eat." },
  // Quran 5:90.
  "Whose work does the ayah call alcohol and gambling?": { answer: "Shaytan's", harder: ["Quran 5:90: intoxicants and gambling are 'defilement from the work of...' whom?", "The traders'", "The kings'", "The angels'"] },
  "What is gambling?": { answer: "Betting money on luck", harder: ["Quran 5:90 forbids gambling. What is gambling?", "Lending to a friend", "Saving money", "Giving charity"] },
  "Allah says to avoid them so that you may succeed.": { answer: "True", harder: "By Quran 5:90, Allah says to avoid intoxicants and gambling so that you may succeed." },
  // Sahih al-Bukhari 52.
  "What lies between the halal and the haram?": { answer: "Doubtful things", harder: ["Bukhari 52: 'the lawful is clear and the unlawful is clear, and between them are...' what?", "Nothing", "Only good things", "Only sweets"] },
  "What does staying away from doubtful things protect?": { answer: "Your faith and honour", harder: ["Bukhari 52: 'whoever avoids doubtful things keeps safe...' what?", "Your money only", "Your house", "Your car"] },
  "Everyone knows which things are doubtful.": { answer: "False", harder: "By Bukhari 52, the doubtful things are known to every single person." },
  // Sahih al-Bukhari 5376.
  "What do you say before eating?": { answer: "Bismillah", harder: ["Bukhari 5376: 'O boy, mention Allah's name.' What is said before eating?", "Amin", "Allahu Akbar", "Subhanallah"] },
  "Which hand did he ﷺ say to eat with?": { answer: "The right hand", harder: ["Bukhari 5376: 'eat with your...' which hand?", "Both hands", "A spoon only", "The left hand"] },
  "From which part of the dish should you eat?": { answer: "What is nearest to you", harder: ["Bukhari 5376: his hand went all around the dish. 'Eat from...' where?", "Everyone else's part", "The middle", "The far side"] },
  // Sahih al-Bukhari 2620.
  "What did Asma ask the Prophet ﷺ?": { answer: "If she should be kind to her mother", harder: ["Bukhari 2620: her mother came, still a polytheist. What did Asma ask?", "Where to move", "What to cook", "Whom to marry"] },
  "What did he ﷺ answer?": { answer: "Yes, keep good ties", harder: ["Bukhari 2620: asked about her polytheist mother, what did he ﷺ say?", "Only by letter", "Only once a year", "No, leave her"] },
  "A new Muslim should cut off family who are not Muslim.": { answer: "False", harder: "By Bukhari 2620, Asma was told to cut ties with her mother for not being Muslim." },
  // Sahih Muslim 54a.
  "What does as-salamu alaykum mean?": { answer: "Peace be upon you", harder: ["Muslim 54a: 'spread the salam among you.' What does as-salamu alaykum mean?", "Goodbye forever", "Good morning", "Thank you"] },
  "What does spreading the salam bring?": { answer: "Love between people", harder: ["Muslim 54a: 'shall I tell you something that, if you do it, you will...' What does salam bring?", "Honor", "Long life", "Wealth"] },
  "Loving one another is part of true faith.": { answer: "True", harder: "By Muslim 54a, you will not truly believe until you love one another." },
  // Sahih al-Bukhari 220.
  "What did he ﷺ tell the people to do with the Bedouin?": { answer: "Leave him be", harder: ["Bukhari 220: the people rushed at the Bedouin. What did he ﷺ tell them?", "Punish him at once", "Chase him out", "Shout at him"] },
  "How did he ﷺ have the place cleaned?": { answer: "With a bucket of water", harder: ["Bukhari 220: 'pour over it...' how was the place cleaned?", "With sand and stones", "By closing the masjid", "With strong perfume"] },
  "He ﷺ told the people they were sent to make things easy.": { answer: "True", harder: "By Bukhari 220, he ﷺ said: you were sent to make things easy, not hard." },
  // Sahih al-Bukhari 7293.
  "What did Umar say they had been forbidden?": { answer: "Taking on more than they can bear", harder: ["Bukhari 7293: Umar said: 'we have been forbidden...' what?", "Helping one another", "Praying at night", "Visiting the sick"] },
  "A new Muslim wants to do every extra deed at once. What fits?": { answer: "Do what you can keep up", harder: ["Bukhari 7293: forbidden to take on too much. A new Muslim eager for every extra deed should do what?", "Copy the hardest person", "Do it all, even if it breaks you", "Do nothing at all"] },
  "Islam asks you to burden yourself beyond what you can do.": { answer: "False", harder: "By Bukhari 7293, Umar said they were told to burden themselves beyond what they can do." },
  // Sahih al-Bukhari 1397.
  "What did the Bedouin ask the Prophet ﷺ for?": { answer: "A deed to take him to Paradise", harder: ["Bukhari 1397: 'tell me a deed that, if I do it...' what did the Bedouin want?", "A camel for the road", "A seat in the masjid", "A share of the gold"] },
  "Which of these did he ﷺ name for the Bedouin?": { answer: "Fasting the month of Ramadan", harder: ["Bukhari 1397: worship Allah, pray, pay zakat and what else did he ﷺ name?", "Giving away all he owned", "Fasting every single day", "Praying all night long"] },
  "To reach Paradise, the Bedouin had to do far more than the duties.": { answer: "False", harder: "By Bukhari 1397, the duties alone were not enough; the Bedouin needed many extra deeds." },
  // Sunan Ibn Majah 2045.
  "Which three things did he ﷺ say Allah has forgiven the ummah?": { answer: "Mistakes, forgetting, being forced", harder: ["Ibn Majah 2045: 'Allah has forgiven my ummah...' which three things?", "Lying, cheating, stealing", "Anger, envy, pride", "Laziness, greed, boasting"] },
  "A new Muslim makes an honest mistake. What should they know?": { answer: "Allah forgives mistakes", harder: ["Ibn Majah 2045: mistakes are forgiven. A new Muslim errs honestly. What should they know?", "Their Islam is lost", "They must start over", "They should give up"] },
  "Allah holds us to account for what we are forced to do.": { answer: "False", harder: "By Ibn Majah 2045, Allah holds the ummah to account for what they were forced to do." },
  // Sahih al-Bukhari 7507.
  "What did the servant say after he sinned?": { answer: "My Lord, forgive me", harder: ["Bukhari 7507: 'my Lord, I have sinned, so...' what did the servant say?", "I will hide it", "No one saw me", "It does not matter"] },
  "What did Allah say His servant knew?": { answer: "He has a Lord who forgives", harder: ["Bukhari 7507: 'My servant knows that he has a Lord who...' what?", "His sins are too many", "He is better than others", "He has no one to turn to"] },
  "Allah forgave the servant only the first time he asked.": { answer: "False", harder: "By Bukhari 7507, Allah forgave the servant once, and not when he sinned and asked again." },
  // Sunan an-Nasa'i 5377.
  "What was he ﷺ doing when the stranger came?": { answer: "Giving a khutbah", harder: ["Nasa'i 5377: Abu Rifa'ah came while he ﷺ was doing what?", "Eating a meal", "Planting a tree", "Writing a letter"] },
  "What did he ﷺ do for the man who did not know his religion?": { answer: "Stopped and taught him", harder: ["Nasa'i 5377: 'a stranger who does not know his religion.' What did he ﷺ do?", "Gave him a horse", "Gave him a new name", "Asked about his tribe"] },
  "After teaching him, he ﷺ finished his khutbah.": { answer: "True", harder: "By Nasa'i 5377, he ﷺ taught the stranger, then went back and completed the khutbah." },
  // Sunan Ibn Majah 61.
  "What did the young Companions learn before the Quran?": { answer: "Faith", harder: ["Ibn Majah 61: 'we learned ____ before we learned the Quran.' What?", "Poetry", "Trade", "Horse riding"] },
  "What did learning the Quran do to their faith?": { answer: "Made it grow", harder: ["Ibn Majah 61: then we learned the Quran, and by it our faith did what?", "Made it weaker", "Changed nothing", "Made it harder"] },
  "Jundub and his friends were strong young men then.": { answer: "True", harder: "By Ibn Majah 61, Jundub said they were strong young men with the Prophet ﷺ." },
  // Sunan Ibn Majah 8.
  "What does Allah keep doing in this religion, he ﷺ said?": { answer: "Planting new people", harder: ["Ibn Majah 8: 'Allah will keep planting in this religion...' what?", "Making it smaller", "Bringing it to an end", "Closing its door"] },
  "What does Allah use these new people for?": { answer: "Obeying Him", harder: ["Ibn Majah 8: those Allah plants in this religion, He uses them in what?", "Building towers", "Getting rich", "Winning fame"] },
  "New people will keep coming into Islam.": { answer: "True", harder: "By Ibn Majah 8, Allah will keep bringing new people into this religion." },
  // Sahih al-Bukhari 391.
  "What is a person who prays like us and faces our qiblah?": { answer: "A Muslim", harder: ["Bukhari 391: prays like us, faces our qiblah, eats our slaughter. What is he?", "A guest", "A stranger", "A traveler"] },
  "Whose protection is such a Muslim under?": { answer: "Allah and His Messenger ﷺ", harder: ["Bukhari 391: such a Muslim is under the protection of whom?", "Nobody at all", "Only his own tribe", "The king of his land"] },
  "We may betray a Muslim who is under Allah's protection.": { answer: "False", harder: "By Bukhari 391, it is allowed to break Allah's protection over such a Muslim." },
  // Jami at-Tirmidhi 2165.
  "How does a believer feel about his good deeds?": { answer: "Glad of them", harder: ["Tirmidhi 2165: 'whoever is pleased by his good deeds...' how does a believer feel about them?", "Angry about them", "He feels nothing", "Bored with them"] },
  "How does a believer feel about his bad deeds?": { answer: "Sad over them", harder: ["Tirmidhi 2165: 'and saddened by his bad deeds...' how does a believer feel about bad deeds?", "He forgets about them", "Happy with them", "Proud of them"] },
  "Feeling sad after a sin is a sign of faith.": { answer: "True", harder: "By Tirmidhi 2165, being saddened by one's bad deeds is a sign of a believer." },
  // Jami at-Tirmidhi 2657.
  "How should we pass on what we hear from him ﷺ?": { answer: "Just as we heard it", harder: ["Tirmidhi 2657: 'may Allah gladden a man who hears something from us and conveys it...' how?", "With our own changes", "Only in a whisper", "Only after a year"] },
  "What did he ﷺ ask Allah to give such a person?": { answer: "Gladness", harder: ["Tirmidhi 2657: the man who hears and conveys it as he heard it. What did he ﷺ ask Allah to give him?", "Gold", "A big house", "Many camels"] },
  "The one who hears it next may understand it better.": { answer: "True", harder: "By Tirmidhi 2657, the one a saying is passed to may understand it better than the one who heard it." },
  // Sahih Muslim 868.
  "How many times did he ﷺ say the words to Dimad?": { answer: "Three times", harder: ["Muslim 868: Dimad asked him ﷺ to repeat the words. How many times did he say them?", "Once", "Five times", "Seven times"] },
  "Whose words did Dimad say he had heard before?": { answer: "Soothsayers, magicians and poets", harder: ["Muslim 868: 'I have heard the words of...' whom did Dimad compare them with?", "Doctors, traders and guards", "Kings, judges and generals", "Farmers, sailors and builders"] },
  "Dimad became Muslim after hearing these words.": { answer: "True", harder: "By Muslim 868, after hearing the words Dimad gave his pledge of Islam." },
  // Sahih Muslim 832.
  "What was he ﷺ sent with, he told Amr?": { answer: "Family ties and Allah's oneness", harder: ["Muslim 832: 'with what has He sent you?' What did he ﷺ tell Amr ibn Abasah?", "Building towers and palaces", "Winning gold and land", "Taxes and tolls"] },
  "Who did he ﷺ say was with him then?": { answer: "A free man and a slave", harder: ["Muslim 832: 'who is with you in this?' What did he ﷺ answer?", "A king and his army", "A rich tribe", "Many traders"] },
  "He ﷺ told Amr to go home first and come back later.": { answer: "True", harder: "By Muslim 832, he ﷺ told Amr to return to his people first and come back later." },
  // Sunan Abi Dawud 2758.
  "Who had sent Abu Rafi' to him ﷺ?": { answer: "Quraysh", harder: ["Abu Dawud 2758: 'when I saw him, Islam entered my heart.' Who had sent Abu Rafi'?", "The Persians", "The people of Yemen", "The Romans"] },
  "Why did he ﷺ send Abu Rafi' back at first?": { answer: "He never broke a covenant", harder: ["Abu Dawud 2758: 'I do not break a covenant or hold envoys.' Why was Abu Rafi' sent back?", "Abu Rafi' was ill", "The road was closed", "It was the month of Hajj"] },
  "Abu Rafi' never came back to the Prophet ﷺ.": { answer: "False", harder: "By Abu Dawud 2758, Abu Rafi' went back to Quraysh and stayed there, never returning." },
  // Sunan an-Nasa'i 3341.
  "What did Umm Sulaym ask for as her mahr?": { answer: "That he become Muslim", harder: ["Nasa'i 3341: 'if you become Muslim, that is my mahr.' What did Umm Sulaym ask for?", "A garden of dates", "A hundred camels", "A house of stone"] },
  "What did Thabit say about her mahr?": { answer: "None was ever more precious", harder: ["Nasa'i 3341: 'I never heard of a woman whose mahr was...' what did Thabit say?", "The most gold ever paid", "It was paid in camels", "It was paid years later"] },
  "Abu Talhah became Muslim, and that was her mahr.": { answer: "True", harder: "By Nasa'i 3341, Umm Sulaym asked for nothing else; Abu Talhah's Islam was her mahr." },
  // Sahih al-Bukhari 2808.
  "What did he ﷺ tell the man to do first?": { answer: "Become Muslim first", harder: ["Bukhari 2808: 'shall I fight or accept Islam first?' What did he ﷺ say?", "Go home first", "Sell the armour first", "Wait a full year"] },
  "What was the man wearing when he came?": { answer: "Iron armour over his face", harder: ["Bukhari 2808: how was the man dressed when he came?", "A shepherd's cloak", "A white turban", "A silk robe"] },
  "A short time of good deeds can earn a great reward.": { answer: "True", harder: "By Bukhari 2808, he ﷺ said: he did little but was rewarded much." },
  // Sahih Muslim 2312b.
  "What did the man ask his people to do?": { answer: "That they become Muslim", harder: ["Muslim 2312b: given the large flock, what did the man tell his people?", "That they sell the sheep", "That they dig a well", "That they move to Madinah"] },
  "What did Islam become for such a man, Anas said?": { answer: "Dearer to him than the world", harder: ["Muslim 2312b: a man might accept Islam for the world, but soon Islam becomes what to him?", "A passing interest", "A way to get rich", "A hard duty"] },
  "Islam can only grow dear to those born Muslim.": { answer: "False", harder: "By Muslim 2312b, a man who came for wealth could never come to love Islam more than the world." },
  // Quran 5:84.
  "Whose company did they long for, in Quran 5:84?": { answer: "The righteous", harder: ["Quran 5:84: 'we hope our Lord will admit us with...' whom?", "The strong", "The kings", "The rich"] },
  "Who did they hope would place them with the righteous, in Quran 5:84?": { answer: "Their Lord, Allah", harder: ["Quran 5:84: 'why should we not believe... while we hope that...' who will place them?", "Their own families", "Their own tribes", "Their own friends"] },
  "In Quran 5:84 they ask why they should not believe in Allah.": { answer: "True", harder: "By Quran 5:84, those who wept said: why should we not believe in Allah and the truth?" },
  // Quran 5:85.
  "Why does Allah reward them, in Quran 5:85?": { answer: "For what they said", harder: ["Quran 5:85: 'so Allah rewarded them for...' what?", "For what they sold", "For what they owned", "For what they built"] },
  "What does Quran 5:85 call this reward?": { answer: "The reward of the good-doers", harder: ["Quran 5:85: 'and that is the reward of...' whom?", "The reward of the rich", "The reward of the strong", "The reward of the kings"] },
  "Quran 5:85 says they will stay in the gardens forever.": { answer: "True", harder: "By Quran 5:85, those people will abide in the gardens forever." },
  // Sahih al-Bukhari 1396.
  "What did the man ask him ﷺ for?": { answer: "A deed for Paradise", harder: ["Bukhari 1396: 'tell me of a deed that will take me to...' what did the man ask?", "A gift of gold", "A strong camel", "A new house"] },
  "Which of these was in his ﷺ answer?": { answer: "Keeping ties with family", harder: ["Bukhari 1396: worship Allah, pray, pay zakat, and what else?", "Owning many camels", "Wearing fine clothes", "Building a big house"] },
  "He ﷺ said the man had a real need to ask.": { answer: "True", harder: "By Bukhari 1396, he ﷺ said the man's question came from a real need." },
  // Sahih Muslim 2618.
  "What did Abu Barzah ask him ﷺ to teach him?": { answer: "Something to benefit from", harder: ["Muslim 2618: 'teach me something that I may...' what did Abu Barzah ask?", "A way to get rich", "A clever riddle", "A new poem"] },
  "What did he ﷺ tell Abu Barzah to do?": { answer: "Remove harm from paths", harder: ["Muslim 2618: 'remove harm from the paths of...' what did he ﷺ tell him?", "Sell his sheep", "Buy a fast horse", "Learn some poetry"] },
  "Moving harm off a path is a good deed to do.": { answer: "True", harder: "By Muslim 2618, removing harm from the Muslims' paths was what he ﷺ taught Abu Barzah." },
  // Sunan Ibn Majah 4216.
  "Which people did he ﷺ call the best?": { answer: "The pure-hearted and truthful", harder: ["Ibn Majah 4216: 'which people are best?' Whom did he ﷺ name?", "The famous and loud", "The rich and powerful", "The strong and tall"] },
  "What is not found in a pure heart, he ﷺ said?": { answer: "Sin, hatred or envy", harder: ["Ibn Majah 4216: 'a pure heart is one with no...' what?", "Mercy or care", "Joy or thanks", "Love or kindness"] },
  "A pure heart has no envy in it.": { answer: "True", harder: "By Ibn Majah 4216, a pure heart has no sin, hatred or envy in it." },
  // Sahih Muslim 2558.
  "What did the man's relatives do to him?": { answer: "Cut him off", harder: ["Muslim 2558: 'I keep ties with them, and they...' what did they do?", "Visited him daily", "Helped his work", "Sent him gifts"] },
  "Who stays with him while he keeps doing good?": { answer: "A helper from Allah", harder: ["Muslim 2558: 'as long as you keep doing that, there will be with you...' whom?", "A rich friend", "A strong guard", "A wise judge"] },
  "Allah's help stays with one who keeps doing good to them.": { answer: "True", harder: "By Muslim 2558, a helper from Allah stays with the one who keeps doing good to relatives who cut him off." },
  // Sunan Abi Dawud 5164.
  "How many times a day did he ﷺ say to forgive?": { answer: "Seventy times", harder: ["Abu Dawud 5164: 'how many times should we forgive a servant?' What did he ﷺ say?", "Only once", "Three times", "Seven times"] },
  "Who was the man asking about forgiving?": { answer: "The one who served him", harder: ["Abu Dawud 5164: the man asked how often to forgive whom?", "The one who lived next door", "The one who sold to him", "The one who taught him"] },
  "He ﷺ taught them to forgive servants many times.": { answer: "True", harder: "By Abu Dawud 5164, he ﷺ said to forgive the servant seventy times a day." },
  // Sahih al-Bukhari 2518.
  "What did Abu Dharr keep asking him ﷺ?": { answer: "And if I cannot?", harder: ["Bukhari 2518: after each answer, what did Abu Dharr ask?", "And how much?", "And who else?", "And where to?"] },
  "What did he ﷺ say keeping harm away counts as?": { answer: "Charity for yourself", harder: ["Bukhari 2518: 'keep your harm away from people, for that is...' what?", "A debt to repay", "A small sin", "A favor for later"] },
  "Helping someone who cannot do his work is a good deed.": { answer: "True", harder: "By Bukhari 2518, helping one who cannot manage his work is among the good deeds he ﷺ named." },
  // Sunan Ibn Majah 4252.
  "What did he ﷺ say regret is?": { answer: "Repentance", harder: ["Ibn Majah 4252: 'regret is...' what?", "Foolishness", "Cowardice", "Laziness"] },
  "What did Ibn Ma'qil's father ask Abdullah?": { answer: "If he heard it himself", harder: ["Ibn Majah 4252: hearing 'regret is repentance', what did Ibn Ma'qil's father ask?", "If he could write it down", "If others knew of it", "If it was in the Quran"] },
  "Being truly sorry for a sin is part of turning back to Allah.": { answer: "True", harder: "By Ibn Majah 4252, regret for a sin is repentance itself." },
  // Jami at-Tirmidhi 2501.
  "What did he ﷺ say about whoever is silent?": { answer: "He is saved", harder: ["Tirmidhi 2501: 'whoever is silent...' what?", "He is weak", "He is rude", "He is lonely"] },
  "Whose words are these: whoever is silent is saved?": { answer: "The Prophet ﷺ", harder: ["Tirmidhi 2501: 'whoever is silent is saved.' Abdullah ibn Amr heard it from whom?", "A Greek wise man", "An Arab king", "A poet of old"] },
  "Holding back your tongue can keep you safe.": { answer: "True", harder: "By Tirmidhi 2501, staying silent is a way to be saved." },
  // Sunan Ibn Majah 3946.
  "Which prayer did he ﷺ name in these words?": { answer: "The dawn prayer", harder: ["Ibn Majah 3946: 'whoever offers the morning prayer...' which prayer?", "The noon prayer", "The sunset prayer", "The Isha prayer"] },
  "Whose protection is the one who prays it under?": { answer: "Allah's", harder: ["Ibn Majah 3946: whoever prays the morning prayer is under whose protection?", "His tribe's", "The ruler's", "His family's"] },
  "Praying Fajr leaves a person without any protection.": { answer: "False", harder: "By Ibn Majah 3946, the one who prays Fajr is outside Allah's protection." },
  // Sunan Ibn Majah 4223.
  "What did the man want to know?": { answer: "How to know if he did well", harder: ["Ibn Majah 4223: 'how can I know when I have done well?' What did the man want?", "When to travel for trade", "How to grow rich", "Where to build a house"] },
  "Who did he ﷺ say to listen to?": { answer: "Your neighbors", harder: ["Ibn Majah 4223: whose words tell you whether you did well or badly?", "Your rivals", "Sellers in the market", "Travelers passing by"] },
  "If neighbors say you did badly, he ﷺ said you did badly.": { answer: "True", harder: "By Ibn Majah 4223, when your neighbours say you did badly, you did badly." },
  // Sunan Abi Dawud 5197.
  "Who are nearest to Allah, he ﷺ said?": { answer: "The first to give the salam", harder: ["Abu Dawud 5197: 'those nearest to Allah are...' who?", "The loudest in a gathering", "The first to sit down", "The last to leave a room"] },
  "What does giving salam first bring you nearer to?": { answer: "Allah", harder: ["Abu Dawud 5197: those first to greet are nearest to whom?", "Wealth", "Fame", "Power"] },
  "Waiting for others to greet you first is the better way.": { answer: "False", harder: "By Abu Dawud 5197, those nearest to Allah wait for others to greet them first." },
  // Sunan Abi Dawud 3905.
  "What is learning astrology, he ﷺ said?": { answer: "A branch of magic", harder: ["Abu Dawud 3905: 'whoever acquires knowledge of the stars acquires...' what?", "A branch of medicine", "A branch of poetry", "A branch of trade"] },
  "What happens the longer one keeps at it?": { answer: "He gets more of the magic", harder: ["Abu Dawud 3905: 'the more he acquires of it...' what?", "He gets less of it", "He learns the unseen", "He becomes wise"] },
  "Astrology is a harmless study, by his ﷺ words.": { answer: "False", harder: "By Abu Dawud 3905, learning astrology is a harmless study with no link to magic." },
  // Sahih al-Bukhari 6498.
  "Among how many camels can you hardly find one fit to ride?": { answer: "One hundred camels", harder: ["Bukhari 6498: 'people are like camels.' In how big a herd is one fit to ride hard to find?", "Fifty camels", "Twenty camels", "Five camels"] },
  "What is hard to find among the hundred camels?": { answer: "One fit to ride", harder: ["Bukhari 6498: among a hundred camels you hardly find one... what?", "One with a calf", "One that is white", "One that is old"] },
  "He ﷺ likened people to camels.": { answer: "True", harder: "By Bukhari 6498, he ﷺ said people are like a hundred camels with hardly one fit to ride." },
  // Sahih al-Bukhari 2531.
  "What did Abu Hurairah do when his slave came back?": { answer: "He freed him for Allah", harder: ["Bukhari 2531: when his runaway slave came back, what did Abu Hurairah do?", "He kept him as a helper", "He gave him to a friend", "He sent him back home"] },
  "What did Abu Hurairah call the night of his journey?": { answer: "Long and tiring", harder: ["Bukhari 2531: 'what a long, tiring night...' how did he describe it?", "Cold and rainy", "Bright and calm", "Short and easy"] },
  "Abu Hurairah's slave ran away from him on the way.": { answer: "True", harder: "By Bukhari 2531, Abu Hurairah's slave ran off on the way and later came back." },
  // Jami at-Tirmidhi 605.
  "What did he ﷺ tell Qais to do when he accepted Islam?": { answer: "Take a bath", harder: ["Tirmidhi 605: Qais accepted Islam. What did he ﷺ tell him to do?", "Travel to Makkah first", "Pray all night long", "Fast for three days"] },
  "What did Qais bathe with, besides water?": { answer: "Sidr, lote tree leaves", harder: ["Tirmidhi 605: a bath with water and what?", "Olive oil", "Rose petals", "Sea salt"] },
  "Ghusl means washing the whole body.": { answer: "True", harder: "The bath Qais took in Tirmidhi 605, ghusl, washes the whole body." },
  // Sunan Abi Dawud 832.
  "What did the man say he could not do yet?": { answer: "Memorize from the Quran", harder: ["Abu Dawud 832: 'I cannot memorize anything of the Quran.' What could the man not do?", "Walk to the masjid", "Fast in the heat", "Give in charity"] },
  "Which of these was among the words he ﷺ taught him?": { answer: "La hawla wa la quwwata illa billah", harder: ["Abu Dawud 832: one of the phrases he ﷺ taught the man?", "Hasbunallahu wa ni'mal wakil", "Inna lillahi wa inna ilayhi raji'un", "Radiyallahu anhu"] },
  "He ﷺ said the man filled his hand with good.": { answer: "True", harder: "By Abu Dawud 832, he ﷺ said this man had filled his hand with good." },
  // Sahih al-Bukhari 7398.
  "Who were bringing the meat?": { answer: "People new to Islam", harder: ["Bukhari 7398: 'we do not know if Allah's name was said on it.' Who brought the meat?", "Hunters from Yemen", "Traders from Rome", "Travelers from Persia"] },
  "What did he ﷺ tell them to do with the meat?": { answer: "Say Allah's name and eat", harder: ["Bukhari 7398: not knowing if Allah's name was said on the meat, what did he ﷺ say?", "Wait one more day", "Cook it once more", "Ask each one first"] },
  "They knew for sure that Allah's name was said on the meat.": { answer: "False", harder: "By Bukhari 7398, the people were sure Allah's name had been said on the meat." },
  // Sunan Abi Dawud 2620.
  "What did he ﷺ say the garden owner had not done?": { answer: "Taught him or fed him", harder: ["Abu Dawud 2620: 'you did not teach him when he was ignorant, nor...' what?", "Hired him or paid him", "Greeted him or welcomed him", "Visited him or called him"] },
  "Why had Abbad taken grain from the garden?": { answer: "He was hungry", harder: ["Abu Dawud 2620: why did Abbad take grain from the garden in Madinah?", "He was feeding his camel", "He was gathering seeds", "He was helping the owner"] },
  "Abbad got his garment back in the end.": { answer: "True", harder: "By Abu Dawud 2620, he ﷺ had Abbad's garment returned to him." },
  // Sunan Ibn Majah 277.
  "What did he ﷺ say is the best of your deeds?": { answer: "The prayer", harder: ["Ibn Majah 277: 'know that the best of your deeds is...' what?", "The journey", "The feast", "The trade"] },
  "Who keeps up his wudu, he ﷺ said?": { answer: "Only a believer", harder: ["Ibn Majah 277: 'none keeps up his wudu except...' who?", "Only a scholar", "Only an old man", "Only a traveler"] },
  "Even if you cannot do every good deed, keep to what is right.": { answer: "True", harder: "By Ibn Majah 277, keep to what is right, though you will not manage it all." },
};
