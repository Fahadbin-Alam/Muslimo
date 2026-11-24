import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for the Akhirah topic (558 questions).
 * Each keeps the same answer and the same source as the original.
 */
export const AKHIRAH_TIERS: Record<string, TierEntry> = {
  // Sahih Muslim 8a.
  "How many pillars of iman are there?": { answer: "Six", harder: ["Muslim 8a: Allah, His angels, books, messengers, the Last Day and the decree. How many pillars of iman is that?", "Two", "Four", "Ten"] },
  "Which of these is a pillar of iman?": { answer: "Believing in the Last Day", harder: ["Muslim 8a: Jibril asked about iman. Which of these did the answer name?", "Owning a house", "Living in Makkah", "Speaking Arabic"] },
  "Who asked the Prophet ﷺ about iman in this hadith?": { answer: "Jibril, looking like a man", harder: ["Muslim 8a: who came in white and asked the Prophet ﷺ about iman?", "A child", "Abu Jahl", "A king of Rome"] },
  // Quran 2:177.
  "Quran 2:177 says true goodness is NOT just what?": { answer: "Turning your face east or west", harder: ["Quran 2:177: righteousness is not just doing what?", "Giving to the poor", "Being patient", "Believing in Allah"] },
  "Which belief does 2:177 name right after Allah?": { answer: "The Last Day", harder: ["Quran 2:177: believing in Allah and then what, before the angels and the Book?", "Your tribe", "Good luck", "The stars"] },
  "Believing in the Last Day makes a person kinder to others.": { answer: "True", harder: "By Quran 2:177, true righteousness joins belief in the Last Day with giving wealth to those in need." },
  // Quran 31:34.
  "Who knows when the Hour will come?": { answer: "Only Allah", harder: ["Quran 31:34: with whom alone is the knowledge of the Hour?", "Scientists", "The angels", "Fortune tellers"] },
  "Someone online says the world ends next year. What do you think?": { answer: "Only Allah knows; they cannot know", harder: ["Quran 31:34: knowledge of the Hour is with Allah alone. Someone online says the world ends next year. What is true?", "They must be right", "Panic and stop praying", "Share it with everyone"] },
  "Which of these does 31:34 also say only Allah knows?": { answer: "Where each soul will die", harder: ["Quran 31:34: no soul knows what it earns tomorrow, nor what?", "Today's date", "The name of the moon", "How to cook"] },
  // Quran 22:56.
  "Who has all authority on that Day, in Quran 22:56?": { answer: "Allah alone", harder: ["Quran 22:56: all sovereignty that Day belongs to whom?", "The rich", "The strong", "The kings"] },
  "Quran 22:56 says Allah will judge between people on that Day.": { answer: "True", harder: "By Quran 22:56, Allah alone will judge between people on that Day." },
  "Who will be in the gardens, in Quran 22:56?": { answer: "Those who believe and do good", harder: ["Quran 22:56: who will be in the Gardens of Pleasure?", "Those who are rich", "Those who are strong", "Those who are famous"] },
  // Sahih al-Bukhari 50.
  "What did the Prophet ﷺ answer when Jibril asked when the Hour is?": { answer: "I know no more than you", harder: ["Bukhari 50: 'When will the Hour be?' What did he ﷺ answer Jibril?", "Next Ramadan", "On a Friday soon", "In a hundred years"] },
  "What did he tell Jibril about instead?": { answer: "Its signs", harder: ["Bukhari 50: 'the one asked knows no better... but I will tell you of...' what?", "Its exact year", "A secret code", "A map"] },
  "The Prophet ﷺ knew the exact day of the Hour.": { answer: "False", harder: "By Bukhari 50, the Prophet ﷺ told Jibril the exact day of the Hour." },
  // Sahih al-Bukhari 6504.
  "What did the Prophet ﷺ show to say the Hour is close?": { answer: "Two fingers held together", harder: ["Bukhari 6504: 'I have been sent, and the Hour, like these two.' What did he ﷺ show?", "A full hand", "A closed fist", "Ten fingers"] },
  "What does this teach us?": { answer: "No prophet comes between him and the Hour", harder: ["Bukhari 6504: he ﷺ and the Hour are like two joined fingers. What does it teach?", "Fingers are holy", "The Hour came already", "The Hour is a million years away"] },
  "The Prophet ﷺ is the last messenger before the Hour.": { answer: "True", harder: "By Bukhari 6504, no prophet comes between the Prophet ﷺ and the Hour." },
  // Quran 54:1.
  "Which sign does Quran 54:1 mention?": { answer: "The moon split", harder: ["Quran 54:1: the Hour has come near, and what happened?", "The sea dried up", "The sun went out", "A star fell on Makkah"] },
  "What does 54:1 say about the Hour?": { answer: "It has come near", harder: ["Quran 54:1: the moon split, and what does it say of the Hour?", "It is a story", "It came long ago", "It will never come"] },
  "What should a believer do knowing the Hour is near?": { answer: "Get ready with good deeds", harder: ["Quran 54:1 says the Hour has come near. What should a believer do?", "Stop working", "Be scared and do nothing", "Forget about it"] },
  // Sahih Muslim 2800a.
  "What did the Prophet ﷺ say when the moon split?": { answer: "Bear witness", harder: ["Muslim 2800a: the moon split in two in his ﷺ lifetime. What did he say?", "Do not tell anyone", "Run away", "Close your eyes"] },
  "Which companion told us he saw it?": { answer: "Abdullah ibn Mas'ud", harder: ["Muslim 2800a: which companion reported seeing the moon split?", "Abu Jahl", "Abu Lahab", "Fir'awn"] },
  "The moon split happened in the time of the Prophet ﷺ.": { answer: "True", harder: "By Muslim 2800a, the moon split in two in the lifetime of the Prophet ﷺ." },
  // Quran 33:63.
  "When people asked about the Hour, what was the Prophet ﷺ told to say?": { answer: "Knowledge of it is only with Allah", harder: ["Quran 33:63: people ask you about the Hour. Say what?", "It is in a hundred years", "Ask the stars", "It will never come"] },
  "What does 'perhaps the Hour is near' push you to do?": { answer: "Repent and do good today", harder: ["Quran 33:63: 'perhaps the Hour is near.' What should that push you to do?", "Put off good deeds", "Waste time", "Argue about dates"] },
  "Believers live in panic about the Hour.": { answer: "False", harder: "By Quran 33:63, believers should live in panic about the date of the Hour." },
  // Sahih al-Bukhari 3688.
  "What did the Prophet ﷺ ask the man back?": { answer: "What have you prepared for it?", harder: ["Bukhari 3688: a man asked about the Hour. What did he ﷺ ask him back?", "Who sent you?", "How old are you?", "Why do you ask?"] },
  "What did the man say he had prepared?": { answer: "Love of Allah and His Messenger", harder: ["Bukhari 3688: 'what have you prepared for it?' What did the man say?", "A lot of gold", "A big house", "Nothing at all"] },
  "What was the good news?": { answer: "You will be with those you love", harder: ["Bukhari 3688: he had only love of Allah and His Messenger. What was he told?", "You will be rich", "You will never die", "You will be famous"] },
  // Sahih al-Bukhari 50.
  "Who will compete in building tall buildings?": { answer: "Poor camel shepherds", harder: ["Bukhari 50: a sign of the Hour is when who boast and compete in high buildings?", "Animals", "Kings of old", "Angels"] },
  "What will they compete in?": { answer: "Building tall buildings", harder: ["Bukhari 50: the shepherds of black camels will boast and compete in what?", "Memorizing Quran", "Planting trees", "Racing camels"] },
  "Tall buildings are a sign of the Hour named by the Prophet ﷺ.": { answer: "True", harder: "In Bukhari 50, shepherds competing in high buildings is named among the signs of the Hour." },
  // Sahih al-Bukhari 80.
  "What is taken away before the Hour?": { answer: "Religious knowledge", harder: ["Bukhari 80: among the signs, what will be taken away?", "The moon", "All the water", "The mountains"] },
  "What spreads in its place?": { answer: "Ignorance", harder: ["Bukhari 80: religious knowledge is taken away, and what prevails?", "Peace", "Gold", "Wisdom"] },
  "What does this sign tell you to do now?": { answer: "Learn your deen while you can", harder: ["Bukhari 80: knowledge will be taken away before the Hour. What should you do now?", "Stop learning", "Wait for scholars", "Only play games"] },
  // Sahih al-Bukhari 1036.
  "Which of these is a sign in Bukhari 1036?": { answer: "Time passing quickly", harder: ["Bukhari 1036: knowledge taken, earthquakes, killing. Which is also a sign?", "Days lasting longer", "No more rain", "Everyone stays young"] },
  "What will become very frequent?": { answer: "Earthquakes", harder: ["Bukhari 1036: before the Hour, what will become very frequent?", "Snow in Makkah", "Rainbows", "Eclipses every day"] },
  "What will increase among people?": { answer: "Killing", harder: ["Bukhari 1036: afflictions appear, money overflows, and what increases?", "Fasting", "Kindness", "Patience"] },
  // Sahih al-Bukhari 59.
  "What is lost before the Hour, in Bukhari 59?": { answer: "Trust (amanah)", harder: ["Bukhari 59: 'when ____ is lost, then wait for the Hour.'", "The Kaaba", "The sun", "All animals"] },
  "How is trust lost?": { answer: "Jobs given to people who don't deserve them", harder: ["Bukhari 59: asked how honesty is lost, what did he ﷺ say?", "When it rains", "When children learn", "When people pray too much"] },
  "You are made class leader. How do you keep the amanah?": { answer: "Be fair and do the job well", harder: ["Bukhari 59: trust is lost when authority goes to the unfit. You are made class leader. What keeps the amanah?", "Use it to boss people", "Only help friends", "Ignore the job"] },
  // Sahih al-Bukhari 1424.
  "What will happen to charity near the Hour?": { answer: "No one will need it", harder: ["Bukhari 1424: a man will carry his charity around and no one takes it. Why?", "It will be banned", "Only kings get it", "It turns to stone"] },
  "What did the Prophet ﷺ say to do because of this?": { answer: "Give charity now", harder: ["Bukhari 1424: a time comes when no one will take charity. So what did he ﷺ say?", "Wait until later", "Give only on Eid", "Keep all your money"] },
  "The poor man will say: if you had brought it yesterday...": { answer: "True", harder: "In Bukhari 1424 the one offered charity says: if you had brought it yesterday I would have taken it." },
  // Sahih al-Bukhari 7119.
  "What will the Euphrates uncover?": { answer: "A mountain of gold", harder: ["Bukhari 7119: soon the Euphrates will uncover what?", "An old city", "A giant fish", "A spring of milk"] },
  "What did the Prophet ﷺ say to do if you are there?": { answer: "Take nothing from it", harder: ["Bukhari 7119: whoever is present when the Euphrates uncovers the gold should do what?", "Sell it", "Hide it", "Take all you can"] },
  "Most people who fight over it will die.": { answer: "True", harder: "By Bukhari 7119, whoever is present when the mountain of gold appears should take nothing of it." },
  // Sahih al-Bukhari 7121.
  "How many false prophets did he ﷺ warn of?": { answer: "About thirty", harder: ["Bukhari 7121: about how many liars will appear, each claiming to be Allah's Messenger?", "A thousand", "One", "Three"] },
  "Someone claims to be a new prophet. What is true?": { answer: "He is lying: Muhammad ﷺ is the last", harder: ["Bukhari 7121 warns of liars claiming prophethood. Someone claims to be a new prophet. What is true?", "He might be real", "Follow him to check", "Ask him for proof"] },
  "There can be a prophet after Muhammad ﷺ.": { answer: "False", harder: "By Bukhari 7121, a man claiming to be a messenger after the Prophet ﷺ could be telling the truth." },
  // Sunan Abi Dawud 449.
  "What will people boast about before the Hour?": { answer: "Their mosques", harder: ["Abu Dawud 449: the Hour will not come until people vie with one another about what?", "Their fasting", "Their prayers", "Their kindness"] },
  "What matters most about a mosque?": { answer: "That people pray in it", harder: ["Abu Dawud 449 warns of vying over mosques. What matters most about a mosque?", "Being the biggest", "Beating the next town", "Gold on the walls"] },
  "Building a mosque to show off is a sign of the Hour.": { answer: "True", harder: "By Abu Dawud 449, people vying with one another over mosques is a sign of the Hour." },
  // Sahih al-Bukhari 6506.
  "How will the Hour come?": { answer: "Suddenly", harder: ["Bukhari 6506: two traders will not fold their garment. How will the Hour come?", "Slowly, with warning", "After a countdown", "Only at night"] },
  "What won't two traders manage to do?": { answer: "Finish their sale", harder: ["Bukhari 6506: the Hour comes so suddenly that two traders cannot do what?", "Say hello", "Count to ten", "See the sky"] },
  "What is the best way to be ready for something sudden?": { answer: "Be doing good all the time", harder: ["Bukhari 6506: a man raises food and does not eat it. How do you get ready for something so sudden?", "Ignore it", "Do good only at the end", "Guess the date"] },
  // Sahih al-Bukhari 7118.
  "From which land will the fire come out?": { answer: "Hijaz", harder: ["Bukhari 7118: the Hour will not come until a fire comes out of which land?", "Abyssinia", "India", "Egypt"] },
  "What will its light fall on at Busra?": { answer: "The necks of the camels", harder: ["Bukhari 7118: the fire from Hijaz will light up what at Busra?", "The walls of the houses", "The tops of the palms", "The faces of the people"] },
  "The fire's light will reach as far as Busra.": { answer: "True", harder: "By Bukhari 7118, the fire from Hijaz will light up the necks of the camels at Busra." },
  // Sahih al-Bukhari 6434.
  "Who will pass away one after the other, he ﷺ said?": { answer: "The righteous", harder: ["Bukhari 6434: who will pass away one after the other?", "The kings", "The rich", "The strong"] },
  "What did he ﷺ liken the people left behind to?": { answer: "Useless husk", harder: ["Bukhari 6434: after the righteous go, the people left are like what?", "Ripe fruit", "Sweet honey", "Fresh milk"] },
  "After the righteous pass away, useless people will remain.": { answer: "True", harder: "By Bukhari 6434, when the righteous pass away, people like useless husk will remain." },
  // Al-Adab Al-Mufrad 777.
  "Before the Hour, what will the adornment of houses look like, he ﷺ said?": { answer: "Painted garments", harder: ["Al-Adab Al-Mufrad 777: before the Hour, the adornment of houses will look like what?", "Old ruins", "Plain tents", "Bare rocks"] },
  "Who reported that houses will be adorned like painted garments?": { answer: "Abu Hurayrah", harder: ["Al-Adab Al-Mufrad 777, 'houses adorned like painted garments', was reported by whom?", "Anas ibn Malik", "Jabir ibn Abdullah", "Ibn Abbas"] },
  "Houses adorned like painted garments are a sign of the Hour.": { answer: "True", harder: "By Al-Adab Al-Mufrad 777, houses adorned like painted garments are a sign before the Hour." },
  // Jami at-Tirmidhi 2181.
  "Before the Hour, what will speak to people, he ﷺ said?": { answer: "Predators", harder: ["Tirmidhi 2181: the Hour will not come until what speaks to people?", "Stars", "Mountains", "Rivers"] },
  "What will tell a man what his family did after him?": { answer: "His thigh", harder: ["Tirmidhi 2181: what will tell a man what his family did after he left?", "His shadow", "His pillow", "His lamp"] },
  "Even the tip of a man's whip will speak to him before the Hour.": { answer: "True", harder: "By Tirmidhi 2181, the tip of a man's whip and his sandal straps will speak to him before the Hour." },
  // Al-Adab Al-Mufrad 1049.
  "Before the Hour, who will people give salam to, he ﷺ said?": { answer: "To certain people only", harder: ["Al-Adab Al-Mufrad 1049: before the Hour, how will people give the greeting?", "To children only", "To everyone they meet", "To strangers only"] },
  "What did a man rushing past in the mosque do?": { answer: "Greeted only Ibn Mas'ud", harder: ["Al-Adab Al-Mufrad 1049: what did a man rushing past in the mosque do?", "Greeted everyone", "Gave the adhan", "Greeted no one"] },
  "Before the Hour, false testimony will appear, he ﷺ said.": { answer: "True", harder: "By Al-Adab Al-Mufrad 1049, before the Hour false testimony will appear and true testimony will be hidden." },
  // Sahih Muslim 2901a.
  "How many great signs come before the Hour?": { answer: "Ten", harder: ["Muslim 2901a: the Hour will not come until you see how many signs?", "Three", "Seven", "Forty"] },
  "Which is one of the ten great signs?": { answer: "The sun rising from the west", harder: ["Muslim 2901a: the smoke, the Dajjal, the beast, and which of these?", "A new phone", "A big storm", "A total eclipse"] },
  "Which prophet comes back as one of the signs?": { answer: "Isa (Jesus)", harder: ["Muslim 2901a: among the ten signs is the descent of which prophet?", "Ibrahim", "Musa", "Nuh"] },
  // Sahih al-Bukhari 7131.
  "Who warned about the Dajjal?": { answer: "Every prophet", harder: ["Bukhari 7131: who warned his people of the one-eyed liar?", "No one", "Only kings", "Only Nuh"] },
  "How can a believer tell he is a liar?": { answer: "He is blind in one eye; Allah is perfect", harder: ["Bukhari 7131: 'he is blind in one eye, and your Lord is not.' How does that show he is a liar?", "He is very short", "He wears green", "He speaks quietly"] },
  "What is written between his eyes?": { answer: "Kafir (disbeliever)", harder: ["Bukhari 7131: what is written between the Dajjal's eyes?", "His name", "A number", "Nothing"] },
  // Sahih Muslim 2937a.
  "How long will the Dajjal stay on earth?": { answer: "Forty days", harder: ["Muslim 2937a: how long will the Dajjal stay?", "Forty years", "Seven days", "One night"] },
  "How long is his first day?": { answer: "Like a year", harder: ["Muslim 2937a: a day like a year, a day like a month... How long is his first day?", "Like an hour", "Like a minute", "Normal"] },
  "One day's prayers are enough for that year-long day.": { answer: "False", harder: "By Muslim 2937a, on the Dajjal's day that is like a year, one day's prayers are enough." },
  // Sahih al-Bukhari 1881.
  "Which two cities can the Dajjal not enter?": { answer: "Makkah and Madinah", harder: ["Bukhari 1881: there is no town the Dajjal will not enter except which two?", "Rome and London", "Taif and Jeddah", "Cairo and Baghdad"] },
  "Who guards them?": { answer: "Angels in rows", harder: ["Bukhari 1881: on every road into Makkah and Madinah, who stands guard?", "Soldiers", "Lions", "A high wall"] },
  "Madinah will shake out the hypocrites.": { answer: "True", harder: "By Bukhari 1881, Madinah will shake three times and Allah will expel every hypocrite." },
  // Sahih Muslim 809a.
  "Which surah protects from the Dajjal?": { answer: "Al-Kahf", harder: ["Muslim 809a: memorize the first ten verses of which surah for protection from the Dajjal?", "Al-Kawthar", "Quraysh", "Al-Fil"] },
  "How many of its ayahs should you memorize?": { answer: "The first ten", harder: ["Muslim 809a: how much of Al-Kahf protects from the Dajjal?", "Just one", "The last two", "All 110"] },
  "What number is Surah Al-Kahf?": { answer: "18", harder: ["Muslim 809a names Surah Al-Kahf. Which number surah is it?", "1", "36", "114"] },
  // Sahih Muslim 588a.
  "When do we say this dua?": { answer: "After the tashahhud in prayer", harder: ["Muslim 588a: seek refuge from four things after what?", "On waking up", "Only on Eid", "Before eating"] },
  "Which of these is one of the four?": { answer: "The trial of the Dajjal", harder: ["Muslim 588a: Hell, the grave, the trial of life and death, and what?", "Bad weather", "Losing a game", "Being late"] },
  "How many things do we seek refuge from in it?": { answer: "Four", harder: ["Muslim 588a: after the tashahhud, seek refuge from how many things?", "Two", "Seven", "Ten"] },
  // Sahih al-Bukhari 2222.
  "How will Isa come back?": { answer: "As a just ruler", harder: ["Bukhari 2222: the son of Maryam will descend among you as what?", "As a new prophet with a new book", "As a baby", "As an angel"] },
  "What will he break?": { answer: "The cross", harder: ["Bukhari 2222: Isa will kill the pig, abolish the jizyah, and break what?", "The Kaaba", "His sword", "The moon"] },
  "Isa did not die; Allah raised him up, and he will return.": { answer: "True", harder: "By Bukhari 2222, the son of Maryam will descend among the people as a just ruler." },
  // Sahih Muslim 2937a.
  "Where will Isa come down?": { answer: "The white minaret east of Damascus", harder: ["Muslim 2937a: where will Isa son of Maryam descend?", "The sea", "The Kaaba roof", "Mount Sinai"] },
  "Who will end the Dajjal?": { answer: "Isa", harder: ["Muslim 2937a: who will search for the Dajjal and kill him?", "A storm", "No one", "An army of horses"] },
  "Where will Isa catch the Dajjal?": { answer: "At the gate of Ludd", harder: ["Muslim 2937a: at which gate will Isa kill the Dajjal?", "In Makkah", "In Madinah", "On a ship"] },
  // Quran 21:96.
  "Who built a barrier against Ya'juj and Ma'juj?": { answer: "Dhul-Qarnayn", harder: ["Gog and Magog of Quran 21:96 were held back by a barrier. Who built it?", "Fir'awn", "Qarun", "Namrud"] },
  "What does 21:96 say they will do?": { answer: "Pour down from every high place", harder: ["Quran 21:96: when Gog and Magog are let loose, what will they do?", "Build a city", "Fly to the moon", "Stay asleep"] },
  "Ya'juj and Ma'juj are one of the ten great signs.": { answer: "True", harder: "Quran 21:96 says Gog and Magog will be let loose and descend from every elevation." },
  // Sahih al-Bukhari 4635.
  "What happens when the sun rises from the west?": { answer: "Repentance is no longer accepted", harder: ["Bukhari 4635: when the sun rises from the west and all believe, what is true then?", "Night lasts forever", "Ramadan starts", "It is a normal day"] },
  "Which ayah does the Prophet ﷺ link to it?": { answer: "Quran 6:158", harder: ["Bukhari 4635: 'no good will it do a soul to believe' then. Which ayah is that?", "Quran 2:255", "Quran 1:1", "Quran 112:1"] },
  "So when is the best time to repent?": { answer: "Now, today", harder: ["Bukhari 4635: after the sun rises from the west, belief is not accepted. So when should you repent?", "When the sun rises in the west", "When old", "Never"] },
  // Quran 3:185.
  "Who will taste death?": { answer: "Every soul", harder: ["Quran 3:185: who will taste death?", "Only animals", "Only old people", "Only bad people"] },
  "When are rewards paid in full?": { answer: "On the Day of Resurrection", harder: ["Quran 3:185: when will you be paid your reward in full?", "On your birthday", "Every Friday", "At school"] },
  "What is real success in 3:185?": { answer: "Saved from the Fire, into Jannah", harder: ["Quran 3:185: who has truly succeeded?", "Being rich", "Being famous", "Living long"] },
  // Jami at-Tirmidhi 2307.
  "What did he call death?": { answer: "The cutter of pleasures", harder: ["Tirmidhi 2307: 'remember often the destroyer of...' what?", "The long sleep", "The end of nothing", "A story"] },
  "Why remember death?": { answer: "So we use our time well", harder: ["Tirmidhi 2307: why remember death often?", "To be sad all day", "To stop working", "To scare others"] },
  "The Prophet ﷺ told us to remember death often.": { answer: "True", harder: "By Tirmidhi 2307, the Prophet ﷺ told us to remember death often." },
  // Sahih al-Bukhari 6514.
  "What stays with you in the grave?": { answer: "Your deeds", harder: ["Bukhari 6514: three follow the dead; one remains with him. Which?", "Your phone", "Your money", "Your friends"] },
  "Which two go back home?": { answer: "Family and wealth", harder: ["Bukhari 6514: of family, wealth and deeds, which two go back?", "Deeds and prayers", "Angels and books", "Nothing goes back"] },
  "So what should you collect most?": { answer: "Good deeds", harder: ["Bukhari 6514: only deeds stay with you in the grave. So what should you collect most?", "Followers", "Fine clothes", "Wealth"] },
  // Quran 23:100.
  "What is the barzakh?": { answer: "The barrier between death and resurrection", harder: ["Quran 23:100: 'behind them is a barrier until the Day they are resurrected.' What is the barzakh?", "A river in Jannah", "A city in Iraq", "A kind of prayer"] },
  "What does the one who wasted his life beg for?": { answer: "To be sent back to do good", harder: ["Quran 23:100: 'my Lord, send me back...' What does he beg for?", "To see his family", "To be given more wealth", "To sleep in peace"] },
  "Can anyone come back from death to fix their deeds?": { answer: "No", harder: ["Quran 23:100: 'No! It is only a word he says.' Can anyone come back from death?", "Only on Friday", "Yes, once", "Yes, if rich"] },
  // Sahih al-Bukhari 1338.
  "What does the dead person hear as people leave?": { answer: "Their footsteps", harder: ["Bukhari 1338: as his companions leave the grave, what does the dead person hear?", "His family's voices", "The angels' wings", "The Quran recited"] },
  "How many angels come to question him?": { answer: "Two", harder: ["Bukhari 1338: how many angels come and sit him up?", "Seven", "None", "One"] },
  "What does the believer see from his grave?": { answer: "His place in Jannah", harder: ["Bukhari 1338: after he answers well, what is the believer shown?", "His old house", "His school", "Nothing"] },
  // Sunan Abi Dawud 4753.
  "What is the first question in the grave?": { answer: "Who is your Lord?", harder: ["Abu Dawud 4753: the two angels sit him up. What do they ask first?", "How rich were you?", "Where did you live?", "What was your job?"] },
  "What does the believer answer about his religion?": { answer: "My religion is Islam", harder: ["Abu Dawud 4753: 'What is your religion?' What does the believer say?", "I don't know", "Whatever was popular", "My family's job"] },
  "Who can answer well in the grave?": { answer: "One who lived by the answers", harder: ["Abu Dawud 4753: who can truly answer the three questions in the grave?", "Anyone rich", "Anyone loud", "One who memorized only the words"] },
  // Sunan Abi Dawud 4753.
  "What door is opened for the believer in the grave?": { answer: "A door to Jannah", harder: ["Abu Dawud 4753: 'my servant spoke the truth.' What door is opened for him?", "A door to his house", "A window to the sky", "No door"] },
  "How wide is his grave made?": { answer: "As far as the eye can see", harder: ["Abu Dawud 4753: the believer's grave is made wide how far?", "One step", "Same as before", "As big as a house"] },
  "What does the caller from heaven say?": { answer: "My servant spoke the truth", harder: ["Abu Dawud 4753: what does the caller from heaven say?", "Wait here", "Wake up", "Go back"] },
  // Sahih al-Bukhari 1377.
  "What did the Prophet ﷺ seek refuge from, in Bukhari 1377?": { answer: "The punishment of the grave", harder: ["Bukhari 1377: what did he ﷺ seek refuge from, beside the Fire and the Dajjal?", "Bad dreams only", "Hot weather", "Hunger"] },
  "Is the punishment of the grave real, by this hadith?": { answer: "Yes", harder: ["Bukhari 1377: he ﷺ sought refuge from the punishment of the grave. Is it real?", "Only for animals", "No", "Only a story"] },
  "Making this dua daily follows the Sunnah.": { answer: "True", harder: "By Bukhari 1377, the Prophet ﷺ used to seek refuge from the punishment of the grave." },
  // Sahih Muslim 1631.
  "How many deeds keep going after death?": { answer: "Three", harder: ["Muslim 1631: when a person dies, his deeds end except how many?", "None", "One", "Five"] },
  "Which is one of them?": { answer: "Knowledge that benefits people", harder: ["Muslim 1631: ongoing charity, a righteous child, and what else?", "Many photos", "Good grades", "A big car"] },
  "Planting a tree people use, or building a well, is...": { answer: "Ongoing charity", harder: ["Muslim 1631: a tree people use or a well you dug is which of the three?", "A waste", "Only for the rich", "Not counted"] },
  // Quran 39:68.
  "What happens at the first blowing of the Horn?": { answer: "Everyone falls dead", harder: ["Quran 39:68: at the first blowing of the Horn, what happens?", "Everyone wakes", "Ramadan begins", "The sun rises"] },
  "What happens at the second blowing?": { answer: "All stand up, alive", harder: ["Quran 39:68: 'then it will be blown again' and what happens?", "Nothing", "Everyone sleeps", "The sea dries"] },
  "How many times is the Horn blown in 39:68?": { answer: "Twice", harder: ["Quran 39:68: how many times is the Horn blown?", "Never", "Once", "Seven times"] },
  // Quran 99:1.
  "What will the earth do that Day, in Surah Az-Zalzalah?": { answer: "Report its news", harder: ["Quran 99:1: when the earth is shaken with its final quake, what will it do that Day?", "Stay silent", "Fly away", "Turn to gold"] },
  "What does the earth throw out?": { answer: "Its burdens", harder: ["Quran 99:1: the earth is shaken and throws out what?", "Coins only", "Rain", "Flowers"] },
  "The ground you walk on will tell what you did on it.": { answer: "True", harder: "By Surah Az-Zalzalah, the earth will report its news on that Day." },
  // Sahih al-Bukhari 4812.
  "What will Allah say that Day?": { answer: "I am the King: where are the kings of the earth?", harder: ["Bukhari 4812: Allah rolls up the heavens and says what?", "Who is tallest?", "Nothing", "Who is the richest?"] },
  "What will He roll up in His right hand?": { answer: "The heavens", harder: ["Bukhari 4812: Allah will roll up what in His right hand?", "A carpet", "The sea", "A scroll of poems"] },
  "What does this teach about kings and presidents?": { answer: "Their power ends; Allah's never does", harder: ["Bukhari 4812: 'where are the kings of the earth?' What does this teach about rulers?", "They rule forever", "They judge on that Day", "They are safe"] },
  // Quran 101:4.
  "What will the mountains be like?": { answer: "Fluffed-up wool", harder: ["Quran 101:4: what will the mountains be like?", "Ice", "Glass", "Gold"] },
  "What will people be like?": { answer: "Scattered moths", harder: ["Quran 101:4: people will be like what?", "Calm birds", "Sleeping cats", "Tall trees"] },
  "Which surah describes this?": { answer: "Al-Qari'ah", harder: ["Quran 101:4: people like scattered moths, mountains like wool. Which surah is this?", "Al-Fatihah", "Al-Kawthar", "Al-Ikhlas"] },
  // Sahih al-Bukhari 4814.
  "What did Abu Hurayrah do when asked 'forty days or years?'": { answer: "Refused to guess", harder: ["Bukhari 4814: 'forty days? forty years?' How did Abu Hurayrah answer?", "Said forty days", "Laughed", "Said forty years"] },
  "Which bone does not decay?": { answer: "The tailbone", harder: ["Bukhari 4814: everything of the body decays except what, from which it is rebuilt?", "The skull", "The teeth", "The heart"] },
  "Abu Hurayrah's lesson: don't add to what the Prophet ﷺ said.": { answer: "True", harder: "By Bukhari 4814, Abu Hurayrah would not add to what the Prophet ﷺ said about the forty." },
  // Sahih al-Bukhari 6527.
  "How will people be gathered?": { answer: "Barefoot and unclothed", harder: ["Bukhari 6527: people will be gathered barefoot, naked and what else?", "In cars", "In their best clothes", "On thrones"] },
  "Aishah asked if people would look at each other. The answer?": { answer: "It will be too serious for that", harder: ["Bukhari 6527: 'will men and women look at each other?' What did he ﷺ say?", "Yes, freely", "Only friends", "Only family"] },
  "Allah brings us back just as He first made us.": { answer: "True", harder: "By Bukhari 6527, people are raised as they first came: barefoot, unclothed and uncircumcised." },
  // Sahih al-Bukhari 3349.
  "Who is first to be clothed on that Day?": { answer: "Ibrahim", harder: ["Bukhari 3349: all are gathered unclothed. Who is clothed first?", "Adam", "Nuh", "Musa"] },
  "What is Ibrahim called in the Quran?": { answer: "Khalilullah, Allah's close friend", harder: ["Bukhari 3349: Ibrahim is clothed first. By what title does the Quran honour him?", "The king", "The sailor", "The doctor"] },
  "Every prophet is clothed at the same moment.": { answer: "False", harder: "By Bukhari 3349, every prophet will be clothed at the same moment on that Day." },
  // Quran 18:48.
  "Before whom will people be presented in rows, in Quran 18:48?": { answer: "Before their Lord", harder: ["Quran 18:48: 'you have come to Us as We created you the first time.' They stand in rows before whom?", "Before their leaders", "Before their elders", "Before their kings"] },
  "Quran 18:48 says people come back as Allah first created them.": { answer: "True", harder: "By Quran 18:48, people come before their Lord just as He created them the first time." },
  "What had the deniers claimed, in Quran 18:48?": { answer: "No time was set for their return", harder: ["Quran 18:48: 'yet you claimed We would never set...' what?", "No price was set for their goods", "No date was set for their trip", "No limit was set for their wealth"] },
  // Quran 80:34.
  "Who will a man run from that Day?": { answer: "Even his own family", harder: ["Quran 80:34: a man flees from his brother, mother, father, wife and children. Who does he flee?", "Only enemies", "Nobody", "Only animals"] },
  "Why?": { answer: "Each person is busy with himself", harder: ["Quran 80:34: why does a man flee even his own family that Day?", "They are angry", "They are hungry", "They forgot names"] },
  "What can you do now for your family?": { answer: "Help them do good today", harder: ["Quran 80:34: family cannot help you that Day. What is the best help for them now?", "Wait for that Day", "Only buy gifts", "Nothing matters"] },
  // Quran 70:4.
  "How long is that Day, in Quran 70:4?": { answer: "Fifty thousand years", harder: ["Quran 70:4: the angels and the Spirit ascend in a Day of what length?", "A hundred years", "One day", "Forty minutes"] },
  "How close does the sun come, in Muslim 2864?": { answer: "About a mile", harder: ["Muslim 2864: on that Day, how near does the sun come to people?", "Further away", "It disappears", "Same as today"] },
  "What makes the sweat less or more?": { answer: "Each person's deeds", harder: ["Muslim 2864: people stand in sweat to their ankles, knees or more. What decides it?", "Their height", "Their clothes", "Luck"] },
  // Sahih al-Bukhari 660.
  "How many people get Allah's shade in this hadith?": { answer: "Seven", harder: ["Bukhari 660: on the Day there is no shade but His, how many does Allah shade?", "Three", "Ten", "Forty"] },
  "Which young person is among them?": { answer: "A youth raised worshipping Allah", harder: ["Bukhari 660: of the seven in the shade, which young person is named?", "A youth with many followers", "A youth who wins races", "Any youth"] },
  "How does one of them give charity?": { answer: "So secretly the left hand doesn't know", harder: ["Bukhari 660: one of the seven gives charity how?", "Only to friends", "Loudly", "With a photo"] },
  // Sahih al-Bukhari 4712.
  "Who do people go to first for help?": { answer: "Adam", harder: ["Bukhari 4712: the sun comes near and people suffer. Whom do they ask first to intercede?", "Muhammad ﷺ", "Musa", "Nuh"] },
  "Who do they come to at last?": { answer: "Muhammad ﷺ", harder: ["Bukhari 4712: Adam, Nuh, Ibrahim, Musa, Isa send them on. Whom do they reach last?", "Isa", "Ibrahim", "Sulayman"] },
  "The other prophets each sent the people on to someone else.": { answer: "True", harder: "By Bukhari 4712, each of the other prophets sent the people on to someone else." },
  // Sahih al-Bukhari 4712.
  "What does the Prophet ﷺ do first?": { answer: "Falls in sujud to Allah", harder: ["Bukhari 4712: at last he ﷺ goes beneath the Throne. What does he do?", "Leaves", "Sleeps", "Gives a speech"] },
  "What does Allah tell him?": { answer: "Ask and you will be given", harder: ["Bukhari 4712: 'O Muhammad, raise your head...' What is he told next?", "Ask another prophet", "Go away", "Wait a year"] },
  "What did he call himself that Day?": { answer: "Chief of the people", harder: ["Bukhari 4712: he ﷺ said he would be what on the Day of Resurrection?", "A stranger", "A king of gold", "The last in line"] },
  // Sahih al-Bukhari 6304.
  "What did the Prophet ﷺ save his special dua for?": { answer: "To intercede for his ummah", harder: ["Bukhari 6304: every prophet has one answered dua. What did he ﷺ keep his for?", "Riches", "Victory in battle", "A long life"] },
  "What does this show?": { answer: "How much he cared for us", harder: ["Bukhari 6304: he ﷺ saved his dua for the ummah's Hereafter. What does that show?", "Nothing", "He wanted fame", "He forgot to use it"] },
  "How do we show love back?": { answer: "Follow his Sunnah and send salawat", harder: ["Bukhari 6304: he ﷺ saved his dua for us. What is the best way to love him back?", "Nothing", "Ignore him", "Only talk about him"] },
  // Quran 108:1.
  "What did Allah give the Prophet ﷺ in Surah 108?": { answer: "Al-Kawthar", harder: ["Quran 108:1: 'Indeed, We have granted you...' what?", "A ship", "A palace", "An army"] },
  "Which is the shortest surah?": { answer: "Al-Kawthar", harder: ["Surah 108 has only three ayat. What is it called?", "Yasin", "Al-Mulk", "Al-Baqarah"] },
  "Al-Kawthar is linked to the Pool of the Prophet ﷺ.": { answer: "True", harder: "Al-Kawthar granted in Quran 108:1 is linked to the Pool of the Prophet ﷺ." },
  // Sahih al-Bukhari 6579.
  "How wide is the Pool?": { answer: "A month's journey", harder: ["Bukhari 6579: whiter than milk, nicer than musk. How long to cross the Pool?", "A few steps", "One mile", "A day's walk"] },
  "What happens to whoever drinks from it?": { answer: "Never thirsty again", harder: ["Bukhari 6579: what is promised to whoever drinks from the Pool?", "Falls asleep", "Gets rich", "Grows wings"] },
  "How many cups does it have?": { answer: "As many as the stars", harder: ["Bukhari 6579: the Pool's cups are as many as what?", "A hundred", "Seven", "One"] },
  // Sunan Abi Dawud 4746.
  "How big a part were they of all who will come to the Pool?": { answer: "Not one part in a hundred thousand", harder: ["Abu Dawud 4746: 'you are not even one part in...' how many of those who come to the Pool?", "About a third of them", "Nearly all of them", "About half of them"] },
  "Where were they when he ﷺ said this?": { answer: "At a halting place", harder: ["Abu Dawud 4746: Zayd ibn Arqam heard it where?", "At his house", "In the masjid", "In the market"] },
  "A very great number of people will come to the Pool of the Prophet ﷺ.": { answer: "True", harder: "By Abu Dawud 4746, the people who come to the Pool are far more than the companions there that day." },
  // Quran 18:49.
  "What does the book of deeds leave out?": { answer: "Nothing, small or great", harder: ["Quran 18:49: 'what is this book that leaves...' what?", "Secret things", "Things done at night", "Small things"] },
  "Who wrote everything down?": { answer: "The angels, by Allah's command", harder: ["Quran 18:49: the record counts every deed. By whose command was it written?", "You, in a diary", "Your friends", "Nobody"] },
  "Allah will wrong someone on that Day.": { answer: "False", harder: "By Quran 18:49, the Lord will wrong some people when the record is placed." },
  // Quran 69:19.
  "What does the one with the book in his right hand say?": { answer: "Come, read my book!", harder: ["Quran 69:19: given the record in the right hand, what does he say?", "Hide it!", "I lost it", "It is not mine"] },
  "What does the one with it in his left hand wish?": { answer: "That he never got it", harder: ["Quran 69:19: given the record in the left hand, what does he wish?", "For a bigger book", "To read it again", "For a pen"] },
  "Getting the book in the right hand is good news.": { answer: "True", harder: "By Quran 69:19, receiving the record in the right hand is a joy for its owner." },
  // Sahih al-Bukhari 7512.
  "Who will be between you and Allah when He speaks to you?": { answer: "No one, no translator", harder: ["Bukhari 7512: when your Lord speaks to you, who is in between?", "Your teacher", "Your parents", "A lawyer"] },
  "What will you see to your right and left?": { answer: "Only your deeds", harder: ["Bukhari 7512: he looks right and left. What does he see?", "Your money", "Nothing", "Your friends"] },
  "How little charity can shield you from the Fire?": { answer: "Even half a date", harder: ["Bukhari 7512: 'protect yourselves from the Fire, even with...' what?", "Only a million", "Only gold", "None"] },
  // Sahih al-Bukhari 103.
  "What is the 'easy reckoning'?": { answer: "Deeds are only shown, not argued", harder: ["Bukhari 103: Aishah asked about the 'easy reckoning' of 84:8. What is it?", "Doing a test", "No deeds at all", "Paying money"] },
  "Who asked the Prophet ﷺ about this ayah?": { answer: "Aishah", harder: ["Bukhari 103: 'whoever is called to account will be punished.' Who asked about 84:8?", "Fir'awn", "Bilal", "Abu Jahl"] },
  "What does the one with an easy reckoning do next (84:9)?": { answer: "Returns to his people happy", harder: ["Quran 84:9, asked about in Bukhari 103: after an easy reckoning he goes where?", "Stays sad", "Runs away", "Sleeps"] },
  // Jami at-Tirmidhi 2417.
  "What will you be asked about your knowledge?": { answer: "What you did with it", harder: ["Tirmidhi 2417: your feet won't move until asked about four things. What of your knowledge?", "Nothing", "How much you forgot", "Your test scores"] },
  "What are you asked about money?": { answer: "How you earned it and spent it", harder: ["Tirmidhi 2417: what two things are you asked about your wealth?", "Who was richer", "Nothing", "How much you saved only"] },
  "Which is a good answer for 'how did you use your time'?": { answer: "Praying, learning, helping others", harder: ["Tirmidhi 2417: you'll be asked how you spent your life. Which is the best answer to work for?", "Only scrolling", "Only sleeping", "Being mean"] },
  // Jami at-Tirmidhi 413.
  "What is the first deed judged?": { answer: "The prayer", harder: ["Tirmidhi 413: what is the first of a servant's deeds judged?", "Fasting", "Hajj", "Your grades"] },
  "What fills the gaps in your fard prayers?": { answer: "Extra (sunnah) prayers", harder: ["Tirmidhi 413: 'see if My servant has...' what to complete what is lacking?", "Making dua later", "Fasting the next day", "Praying faster next time"] },
  "If your prayer is good, the rest goes well.": { answer: "True", harder: "By Tirmidhi 413, if a servant's prayer is sound, he succeeds." },
  // Sahih al-Bukhari 6533.
  "What is first judged between people?": { answer: "Killing and bloodshed", harder: ["Bukhari 6533: the first cases decided among people concern what?", "Sports results", "Who was louder", "Borrowed pens"] },
  "Prayer is the first deed judged between a person and Allah.": { answer: "True", harder: "By Tirmidhi 413 and Bukhari 6533, prayer is first between a person and Allah, bloodshed first between people." },
  // Sahih Muslim 2581.
  "Who is truly bankrupt?": { answer: "One whose good deeds pay for hurting people", harder: ["Muslim 2581: who is the real bankrupt of the ummah?", "One with no money", "One with no house", "One who lost a game"] },
  "What happens to his good deeds?": { answer: "They go to the people he hurt", harder: ["Muslim 2581: he came with prayer and fasting but hurt others. Where do his good deeds go?", "They vanish", "They double", "He keeps them"] },
  "Being mean online can cost you your good deeds.": { answer: "True", harder: "By Muslim 2581, insulting and slandering people can cost a person his good deeds." },
  // Quran 36:65.
  "Who speaks when mouths are sealed?": { answer: "Hands", harder: ["Quran 36:65: mouths are sealed. What speaks to Allah?", "Friends", "Teachers", "Phones"] },
  "What else testifies, in 41:20?": { answer: "Hearing, eyes and skin", harder: ["Quran 41:20: besides hands and feet, what else testifies?", "Clothes", "Houses", "Shoes"] },
  "What should you do with your hands and eyes today?": { answer: "Use them for good", harder: ["Quran 36:65: your hands will speak on that Day. What should they do now?", "Hide what they do", "Nothing", "Anything, it's private"] },
  // Quran 99:7.
  "How small a good deed will you see on that Day?": { answer: "Even an atom's weight", harder: ["Quran 99:7: how small a good deed will a person see?", "Only ones people saw", "None", "Only big ones"] },
  "You smile at a sad classmate. Does it count?": { answer: "Yes, even small good is seen", harder: ["Quran 99:7: you smile to cheer a sad classmate. Will you see it?", "Only in Ramadan", "No, too small", "Only if filmed"] },
  "Small bad deeds are forgotten on that Day.": { answer: "False", harder: "By Quran 99:7-8, an atom's weight of evil will not be seen on that Day." },
  // Quran 21:47.
  "What does Allah set up to weigh deeds?": { answer: "The scales of justice", harder: ["Quran 21:47: what does Allah set up so no soul is wronged?", "A clock", "A mirror", "A ruler"] },
  "How small a deed is weighed?": { answer: "Even a mustard seed", harder: ["Quran 21:47: even the weight of what will be brought?", "None", "Only big ones", "Only a kilo"] },
  "Who wins, in Quran 7:8?": { answer: "Those whose scales are heavy", harder: ["Quran 7:8: on the scales, who are the successful?", "Those whose scales are light", "Those with the most money", "Everyone"] },
  // Quran 4:124.
  "Whose good deeds lead to Paradise, in Quran 4:124?": { answer: "Believing men and women", harder: ["Quran 4:124: 'male or female, while being a believer.' Who enters Paradise?", "Rich people only", "Believing men only", "Believing women only"] },
  "In Quran 4:124, believers are not wronged even as much as what?": { answer: "A speck on a date stone", harder: ["Quran 4:124: believers are not wronged even as much as what?", "A grain of sand", "A strand of hair", "A grain of rice"] },
  "In Quran 4:124, the one who does good must also have faith.": { answer: "True", harder: "By Quran 4:124, good deeds lead to Paradise for the one who is also a believer." },
  // Sahih al-Bukhari 6406.
  "These two phrases are light on the tongue and...": { answer: "Heavy on the scale", harder: ["Bukhari 6406: 'two words light on the tongue...' and what on the scale?", "Hard to say", "Only for scholars", "Only for Ramadan"] },
  "Which is one of the two phrases?": { answer: "SubhanAllahi wa bihamdihi", harder: ["Bukhari 6406: which phrase is one of the two heavy words?", "Bismillah only", "Ameen", "Insha'Allah"] },
  "Who loves these words?": { answer: "The Most Merciful", harder: ["Bukhari 6406: the two words are loved by whom?", "Only parents", "Nobody", "Only angels"] },
  // Jami at-Tirmidhi 2002.
  "What is heaviest on the scale?": { answer: "Good character", harder: ["Tirmidhi 2002: nothing is heavier on the believer's scale than what?", "Big muscles", "Many followers", "Gold"] },
  "Which is good character?": { answer: "Being kind and honest", harder: ["Tirmidhi 2002: good character is heaviest. Which shows it?", "Mocking others", "Swearing at people", "Lying to win"] },
  "Allah dislikes foul, rude speech.": { answer: "True", harder: "By Tirmidhi 2002, Allah hates the shameless, foul-mouthed person." },
  // Quran 19:71.
  "Who will come to it, in Quran 19:71?": { answer: "Every one of us", harder: ["Quran 19:71: 'there is none of you except he will come to it.' Who comes?", "Only animals", "Only disbelievers", "Nobody"] },
  "Who does Allah save?": { answer: "Those who feared Him", harder: ["Quran 19:72: after all come to it, whom does Allah save?", "The strongest", "The richest", "The fastest runners"] },
  "The scholars explain this coming as crossing the bridge.": { answer: "True", harder: "Scholars explain the 'coming to it' in Quran 19:71 as crossing the bridge over Hell." },
  // Sahih al-Bukhari 7439.
  "Where is the bridge laid?": { answer: "Across Jahannam", harder: ["Bukhari 7439: the bridge will be laid across what?", "Over the sea", "Over a river", "Between two mountains"] },
  "What is the bridge like?": { answer: "Slippery, with hooks", harder: ["Bukhari 7439: 'what is the bridge?' How did he ﷺ describe it?", "Made of gold", "Covered in flowers", "Wide and soft"] },
  "The companions asked about it to learn more.": { answer: "True", harder: "In Bukhari 7439 the companions asked 'what is the bridge?' to learn about it." },
  // Sahih al-Bukhari 7439.
  "How fast do the fastest cross?": { answer: "Like the blink of an eye", harder: ["Bukhari 7439: some cross like lightning, some like wind. The fastest cross like what?", "In a year", "They can't", "Like a turtle"] },
  "What decides your speed?": { answer: "Your deeds", harder: ["Bukhari 7439: some cross fast, some are dragged. What decides it?", "Your height", "Your shoes", "Your age"] },
  "Everyone crosses at the same speed.": { answer: "False", harder: "By Bukhari 7439, all believers cross the bridge at the same speed." },
  // Quran 57:12.
  "What runs ahead of the believers?": { answer: "Their light", harder: ["Quran 57:12: what runs ahead of the believers and on their right?", "Their animals", "Their money", "Their shadows"] },
  "What good news is given?": { answer: "Gardens with rivers", harder: ["Quran 57:12: 'your good news today is...' what?", "Nothing yet", "A new house on earth", "Gold coins"] },
  "Both men and women believers get this light.": { answer: "True", harder: "By Quran 57:12, believing men and believing women both have light running ahead of them." },
  // Sahih Muslim 2791.
  "Who asked where people will be when the earth is changed?": { answer: "Aishah", harder: ["Muslim 2791: 'where will people be when the earth is changed?' Who asked?", "Umar", "Abu Bakr", "Bilal"] },
  "What was the answer?": { answer: "On the bridge", harder: ["Muslim 2791: when the earth is changed, where are the people?", "In houses", "In the sea", "On the moon"] },
  "Which ayah was she asking about?": { answer: "Quran 14:48", harder: ["Muslim 2791: 'the Day the earth is changed into another earth.' Which ayah?", "Quran 36:1", "Quran 1:1", "Quran 112:1"] },
  // Sahih al-Bukhari 7439.
  "Who do the saved believers plead for?": { answer: "Their brothers in the Fire", harder: ["Bukhari 7439: once safe, the believers plead with Allah for whom?", "Themselves only", "Their pets", "Nobody"] },
  "What do they tell Allah about them?": { answer: "They prayed and fasted with us", harder: ["Bukhari 7439: 'they used to...' what, the believers say of their brothers?", "They were rich", "They were tall", "They were famous"] },
  "What does this teach about friends?": { answer: "Have friends who pray with you", harder: ["Bukhari 7439: the saved plead for those who prayed with them. What friends should you keep?", "Have no friends", "Friends don't matter", "Have only rich friends"] },
  // Quran 15:44.
  "How many gates does Jahannam have?": { answer: "Seven", harder: ["Quran 15:44: 'for every gate is a portion assigned.' How many gates?", "Eight", "One", "Ten"] },
  "How many gates does Jannah have?": { answer: "Eight", harder: ["Jahannam has seven gates (15:44). How many gates does Jannah have?", "Two", "Twelve", "Seven"] },
  "Allah's mercy is greater than His anger.": { answer: "True", harder: "Even with Hell's seven gates (Quran 15:44), Allah's mercy is greater than His anger." },
  // Sahih Muslim 2844a.
  "What made the loud sound they heard, he ﷺ said?": { answer: "A stone falling in the Fire", harder: ["Muslim 2844a: 'do you know what this is?' What made the sound?", "A wave hitting the shore", "Thunder in the clouds", "A tree falling in a storm"] },
  "How long had the stone been falling?": { answer: "Seventy years", harder: ["Muslim 2844a: the stone thrown into the Fire fell how long before reaching the bottom?", "Seven days", "Seventy days", "Seven months"] },
  "Jahannam is so deep that a stone falls in it for many years.": { answer: "True", harder: "By Muslim 2844a, a stone took many years to fall to the bottom of the Fire." },
  // Sahih al-Bukhari 3265.
  "Our fire is how much of Jahannam's heat?": { answer: "One part of seventy", harder: ["Bukhari 3265: our fire is one of how many parts of Hell's fire?", "Twice as hot", "Half", "The same"] },
  "Why did Allah tell us this?": { answer: "To warn us so we stay away", harder: ["Bukhari 3265: Hell's fire has 69 parts more. Why tell us this?", "To scare kids for fun", "No reason", "To make us hopeless"] },
  "Jahannam is like the fire we know.": { answer: "False", harder: "By Bukhari 3265, the Fire of Hell is only as hot as the fire we know." },
  // Sahih Muslim 2822.
  "What surrounds Jannah?": { answer: "Hard things", harder: ["Muslim 2822: Paradise is surrounded by what?", "Easy fun", "Gold walls", "Nothing"] },
  "What surrounds the Fire?": { answer: "Desires and cravings", harder: ["Muslim 2822: the Fire is surrounded by what?", "Patience", "Hard work", "Prayer"] },
  "Waking for Fajr when sleepy is a hard thing that leads to Jannah.": { answer: "True", harder: "By Muslim 2822, leaving a warm bed for Fajr is a hardship on the road to Paradise." },
  // Quran 66:6.
  "Who does 66:6 tell you to protect?": { answer: "Yourself and your family", harder: ["Quran 66:6: 'protect yourselves and...' whom, from the Fire?", "Nobody", "Only yourself", "Only strangers"] },
  "What is the Fire's fuel?": { answer: "People and stones", harder: ["Quran 66:6: the Fire's fuel is what?", "Wood", "Gas", "Paper"] },
  "Teaching your little brother to pray protects him.": { answer: "True", harder: "By Quran 66:6, teaching your family to pray is part of protecting them from the Fire." },
  // Sahih Muslim 2807.
  "After one dip in the Fire, what does the richest man say?": { answer: "I never saw any good", harder: ["Muslim 2807: dipped once in the Fire, what does the most comfortable man of this world say?", "It's fine", "I was rich", "I want more"] },
  "After one dip in Jannah, what does the poorest man say?": { answer: "I never felt hardship", harder: ["Muslim 2807: dipped once in Paradise, what does the most suffering believer say?", "I'm still sad", "Nothing", "I was poor"] },
  "What does this teach?": { answer: "The Akhirah outweighs everything here", harder: ["Muslim 2807: one dip wipes out a lifetime of comfort or hardship. What does that teach?", "This world is all", "Rich people win", "Pain lasts forever"] },
  // Sahih al-Bukhari 3260.
  "How many breaths was the Fire allowed?": { answer: "Two", harder: ["Bukhari 3260: 'parts of me eat other parts.' How many breaths was the Fire allowed?", "Seven", "None", "One"] },
  "When are they?": { answer: "Summer and winter", harder: ["Bukhari 3260: the Fire's two breaths come in which seasons?", "Day and night", "Ramadan and Eid", "Spring and autumn"] },
  "A very hot day can remind you of the Fire.": { answer: "True", harder: "By Bukhari 3260, the strongest heat we feel comes from a breath of the Fire." },
  // Sahih al-Bukhari 1417.
  "What small thing can shield you from the Fire?": { answer: "Half a date in charity", harder: ["Bukhari 1417: 'save yourself from the Fire even by...' what?", "A selfie", "A loud voice", "Nothing small"] },
  "If you have nothing to give?": { answer: "Say a good word", harder: ["Bukhari 1417 says even half a date. If you have nothing at all, what then?", "Complain", "Take from others", "Do nothing"] },
  "Small charity matters to Allah.": { answer: "True", harder: "By Bukhari 1417, even half a date given in charity can shield you from the Fire." },
  // Sahih al-Bukhari 44.
  "Who will be taken out of the Fire in this hadith?": { answer: "One with even a grain of faith", harder: ["Bukhari 44: who will be taken out of the Fire?", "Only scholars", "Only the rich", "No one"] },
  "What must they have said?": { answer: "La ilaha illallah", harder: ["Bukhari 44: those taken out must have said what?", "Nothing", "Any words", "Good morning"] },
  "Smallest amount of faith named?": { answer: "An atom's weight", harder: ["Bukhari 44: barley, then wheat, then what is the smallest faith named?", "A brick", "A tree", "A mountain"] },
  // Sahih al-Bukhari 6469.
  "How many parts of mercy did Allah keep for that Day?": { answer: "Ninety-nine", harder: ["Bukhari 6469: mercy is in a hundred parts. How many did Allah keep?", "Ten", "One", "Fifty"] },
  "What is the one part used for?": { answer: "All creatures' mercy to each other", harder: ["Bukhari 6469: the one part sent down shows in what?", "Nothing", "Only angels", "Only people"] },
  "A believer lives between hope and fear.": { answer: "True", harder: "By Bukhari 6469, a believer should hope in Allah's mercy and also fear His punishment." },
  // Sahih al-Bukhari 1896.
  "What is the gate for fasting people called?": { answer: "Ar-Rayyan", harder: ["Bukhari 1896: which gate of Paradise is for those who fasted?", "Al-Firdaws", "Al-Kawthar", "As-Salam"] },
  "Anyone can enter by ar-Rayyan.": { answer: "False", harder: "By Bukhari 1896, anyone may enter Paradise through ar-Rayyan." },
  // Sahih al-Bukhari 3245.
  "How will the first group in Jannah look?": { answer: "Like the full moon", harder: ["Bukhari 3245: the first group into Paradise will shine like what?", "Tired", "Like shadows", "Like stones"] },
  "What will their sweat smell like?": { answer: "Musk", harder: ["Bukhari 3245: in Paradise, their sweat smells of what?", "Nothing at all", "Rain", "Smoke"] },
  "People in Jannah get sick.": { answer: "False", harder: "By Bukhari 3245, the people of Paradise will still spit and blow their noses." },
  // Sahih al-Bukhari 3244.
  "Can you imagine how good Jannah is?": { answer: "No, it is beyond imagining", harder: ["Bukhari 3244: 'what no eye has seen, no ear has heard...' Can you picture Jannah fully?", "It's like a mall", "It's like a park", "Yes, exactly"] },
  "Who prepared Jannah's joys?": { answer: "Allah", harder: ["Bukhari 3244: 'I have prepared for My righteous servants...' Who said it?", "People", "Kings", "Nobody"] },
  "Which ayah did Abu Hurayrah recite with it?": { answer: "Quran 32:17", harder: ["Bukhari 3244: 'no soul knows what joy is hidden for them.' Which ayah?", "Quran 2:255", "Quran 1:1", "Quran 114:1"] },
  // Quran 3:133.
  "How wide is Jannah, in 3:133?": { answer: "As wide as the heavens and earth", harder: ["Quran 3:133: how wide is the garden?", "As big as a city", "A small garden", "As big as Makkah"] },
  "What does Allah tell us to race toward?": { answer: "Forgiveness and Jannah", harder: ["Quran 3:133: 'hasten to...' what?", "A long, easy life", "Wealth and children", "Praise from people"] },
  "Jannah is prepared for whom?": { answer: "The righteous, mindful of Allah", harder: ["Quran 3:133: the garden is prepared for whom?", "Only kings", "Only Arabs", "Everyone no matter what"] },
  // Sahih al-Bukhari 3250.
  "A whip-sized spot in Jannah is better than...": { answer: "The whole world", harder: ["Bukhari 3250: a place in Paradise the size of a whip is better than what?", "A small house", "One city", "Nothing"] },
  "All the gold on earth is worth less than a tiny spot in Jannah.": { answer: "True", harder: "By Bukhari 3250, a whip-sized place in Paradise is better than the world and all that is in it." },
  // Sahih al-Bukhari 2790.
  "How many levels does Jannah have?": { answer: "One hundred", harder: ["Bukhari 2790: Allah prepared how many levels for those who strive in His cause?", "Seven", "Ten", "One"] },
  "Which level should you ask for?": { answer: "Al-Firdaws", harder: ["Bukhari 2790: 'when you ask Allah, ask for...' which level?", "None", "The lowest", "Any one"] },
  "How far apart are two levels?": { answer: "Like the sky and the earth", harder: ["Bukhari 2790: between each two levels of Paradise is how far?", "A meter", "A mile", "One step"] },
  // Sahih Muslim 2837.
  "Will people in Jannah grow old?": { answer: "No, they stay young", harder: ["Muslim 2837: 'you will be young and...' what, the caller says?", "Yes, slowly", "Only some", "After 100 years"] },
  "Will anyone die in Jannah?": { answer: "No, never", harder: ["Muslim 2837: 'you will live and...' what?", "Only animals", "Every 1000 years", "Yes"] },
  "Life in Jannah has no sickness.": { answer: "True", harder: "By Muslim 2837, the people of Paradise will be healthy and never fall ill." },
  // Quran 47:15.
  "Which of these rivers is in Jannah, in 47:15?": { answer: "Milk that never changes taste", harder: ["Quran 47:15: which river is in Paradise?", "Soda", "Oil", "Coffee"] },
  "What kind of honey flows there?": { answer: "Purified honey", harder: ["Quran 47:15: what kind of honey flows in Paradise?", "No honey", "Burnt honey", "Fake honey"] },
  "The water in Jannah never goes bad.": { answer: "True", harder: "By Quran 47:15, the rivers of water in Paradise are unaltered." },
  // Sahih al-Bukhari 3251.
  "How long to ride through the tree's shade?": { answer: "A hundred years", harder: ["Bukhari 3251: a rider travels in the tree's shade how long without crossing it?", "A minute", "One day", "One week"] },
  "What does it teach about Jannah?": { answer: "Its size is beyond us", harder: ["Bukhari 3251: a hundred years in one tree's shade. What does it teach?", "It has no trees", "It is a desert", "It is small"] },
  "The rider crosses the shade in a day.": { answer: "False", harder: "By Bukhari 3251, a rider can cross the shade of that tree in a single day." },
  // Sahih Muslim 2833.
  "When do people of Jannah go to the market?": { answer: "Every Friday", harder: ["Muslim 2833: how often do the people of Paradise come to its market?", "Every Monday", "Once a year", "Never"] },
  "What happens to them there?": { answer: "They become more beautiful", harder: ["Muslim 2833: the north wind blows on them at the market. What happens?", "They buy toys", "They get tired", "They pay money"] },
  "What do their families say when they return?": { answer: "You look even better!", harder: ["Muslim 2833: what do their families say when they return?", "Nothing", "Where were you?", "You're late!"] },
  // Quran 56:25.
  "What will you hear in Jannah?": { answer: "Peace, peace", harder: ["Quran 56:25-26: no ill speech or sinful talk, only what saying?", "Shouting", "Gossip", "Lies"] },
  "Will there be bullying in Jannah?": { answer: "No, never", harder: ["Quran 56:25: no ill speech is heard in Paradise. Will anyone be bullied there?", "Only jokes", "Yes", "Sometimes"] },
  "Speaking kindly now is practice for Jannah.": { answer: "True", harder: "By Quran 56:25-26, Paradise holds no ill speech, so kind words now fit the people of Paradise." },
  // Quran 52:21.
  "Who does Allah join with believers in Jannah?": { answer: "Their children who believed", harder: ["Quran 52:21: whom does Allah join with the believers?", "Their enemies", "Their pets only", "Nobody"] },
  "Does anyone lose reward for this?": { answer: "No, nothing is lessened", harder: ["Quran 52:21: when descendants are joined, is anyone's reward lessened?", "Children lose some", "Everyone loses half", "Yes, parents lose some"] },
  "Helping your family believe helps you meet in Jannah.": { answer: "True", harder: "By Quran 52:21, believers whose children follow them in faith are joined with them." },
  // Sahih al-Bukhari 554.
  "How clearly will believers see Allah?": { answer: "Like the full moon", harder: ["Bukhari 554: 'you will see your Lord as you see...' what?", "Not at all", "Only in dreams", "Blurry"] },
  "Which prayers did he link to this?": { answer: "Fajr and Asr", harder: ["Bukhari 554: 'do not miss the prayer before sunrise and before sunset.' Which prayers?", "Only Jumu'ah", "Eid only", "Dhuhr and Isha"] },
  "Faces that Day are radiant, looking at their Lord.": { answer: "True", harder: "By Bukhari 554, believers will see their Lord as clearly as they see the full moon." },
  // Sahih al-Bukhari 6549.
  "What is the best gift in Jannah?": { answer: "Allah's pleasure forever", harder: ["Bukhari 6549: 'I will give you better.' What does Allah give?", "A big meal", "A golden house", "A fast horse"] },
  "What does Allah promise them?": { answer: "To never be angry with them", harder: ["Bukhari 6549: after bestowing His pleasure, what does Allah promise?", "A test", "Nothing more", "More homework"] },
  "Allah's approval is greater than gardens.": { answer: "True", harder: "By Bukhari 6549, Allah's pleasure is better than all else the people of Paradise are given." },
  // Sahih al-Bukhari 6571.
  "How much does the last man in Jannah get?": { answer: "Ten times the world", harder: ["Bukhari 6571: what is the last man out of the Fire given?", "One small room", "Half the world", "A tent"] },
  "What did he think when told?": { answer: "That Allah was joking", harder: ["Bukhari 6571: 'do You mock me while You are the King?' What did he think?", "Nothing", "That it was too small", "That he was dreaming"] },
  "If the last man gets this much, imagine the first!": { answer: "True", harder: "By Bukhari 6571, even the last to enter Paradise gets the like of the world ten times over." },
  // Sahih al-Bukhari 4730.
  "What is death brought as?": { answer: "A ram", harder: ["Bukhari 4730: in what form is death brought and slaughtered?", "A shadow", "An eagle", "A lion"] },
  "What is announced after?": { answer: "Forever, and no death", harder: ["Bukhari 4730: after death is slaughtered, what is announced?", "One more life", "Go back to earth", "Sleep now"] },
  "Jannah never ends.": { answer: "True", harder: "By Bukhari 4730, the people of Paradise are told: eternity, and no death." },
  // Sahih al-Bukhari 6416.
  "How should we live in this world?": { answer: "Like a traveler", harder: ["Bukhari 6416: 'be in this world as if you were...' what?", "Like we stay forever", "Like a king", "Like it's all that matters"] },
  "What did Ibn Umar say to use your health for?": { answer: "Getting ready for sickness", harder: ["Bukhari 6416: Ibn Umar said, 'take from your health for...' what?", "Only playing", "Nothing", "Showing off"] },
  "A traveler packs what he needs for the road. What is ours?": { answer: "Good deeds", harder: ["Bukhari 6416: we are travelers here. What is our provision for the road?", "Many friends", "Wealth", "Our family name"] },
  // Quran 2:281.
  "Who will we all be returned to, in Quran 2:281?": { answer: "Allah", harder: ["Quran 2:281: 'fear a Day when you will be returned to...' whom?", "Our families", "Our tribes", "Our homelands"] },
  "For what will every soul be repaid, in Quran 2:281?": { answer: "For what it did", harder: ["Quran 2:281: every soul is paid in full for what?", "For what its parents did", "For what its friends did", "For what its neighbors did"] },
  "Quran 2:281 says no one will be wronged on that Day.": { answer: "True", harder: "By Quran 2:281, every soul is paid in full and none will be wronged." },
  // Sahih al-Bukhari 6463.
  "What gets us into Jannah in the end?": { answer: "Allah's mercy", harder: ["Bukhari 6463: 'not even me, unless...' What saves us in the end?", "Our family name", "Only our deeds", "Money"] },
  "So should we stop doing good deeds?": { answer: "No: do them steadily and sincerely", harder: ["Bukhari 6463: deeds alone won't save us. So what did he ﷺ say about doing them?", "Yes", "Only on Fridays", "Only when watched"] },
  "The Prophet ﷺ said even he needs Allah's mercy.": { answer: "True", harder: "In Bukhari 6463 the Prophet ﷺ said even he is saved only if Allah covers him with mercy." },
  // Sahih al-Bukhari 6607.
  "Deeds are judged by their...": { answer: "Endings", harder: ["Bukhari 6607: deeds are judged by what?", "Beginnings", "Size", "Audience"] },
  "What should you ask Allah for?": { answer: "A good ending", harder: ["Bukhari 6607: deeds are judged by endings. What should you ask Allah for?", "A long life", "Wealth and children", "An easy life"] },
  "One good year means you can stop forever.": { answer: "False", harder: "By Bukhari 6607, after one year of good deeds a person can safely stop forever." },
  // Sunan Abi Dawud 3116.
  "Whose last words lead to Jannah?": { answer: "One who says la ilaha illallah", harder: ["Abu Dawud 3116: whose last words lead to Paradise?", "One who says goodbye", "One who says nothing", "One who says my money"] },
  "How do you make it your last words?": { answer: "Say it often all your life", harder: ["Abu Dawud 3116: how do you make la ilaha illallah your last words?", "Wait till you're old", "Write it once", "Hope for luck"] },
  "Who narrated this hadith?": { answer: "Mu'adh ibn Jabal", harder: ["Abu Dawud 3116, 'whoever's last words are la ilaha illallah', was narrated by whom?", "Fir'awn", "Qarun", "Abu Lahab"] },
  // Sahih al-Bukhari 6507.
  "Whoever loves to meet Allah...": { answer: "Allah loves to meet him", harder: ["Bukhari 6507: 'whoever loves to meet Allah...' what?", "Gets rich", "Nothing happens", "Will never die"] },
  "What does the believer hear when death comes?": { answer: "Good news of Allah's pleasure", harder: ["Bukhari 6507: when death comes, what is the believer given?", "Bad news", "Only silence", "A warning to wait"] },
  "Disliking the pain of death means you don't love to meet Allah.": { answer: "False", harder: "By Bukhari 6507, Aishah's dislike of death meant she did not love to meet Allah." },
  // Sahih al-Bukhari 6389.
  "What was the Prophet's ﷺ most frequent dua?": { answer: "Rabbana atina fid-dunya hasanah...", harder: ["Bukhari 6389: what was the dua he ﷺ made most often?", "Only for rain", "Only for food", "A dua for wealth"] },
  "What does it ask for?": { answer: "Good in both lives, safety from the Fire", harder: ["Bukhari 6389: 'Rabbana atina...' asks for what?", "Only this world", "Only money", "Only health"] },
  "You can say it in sujud and after prayer.": { answer: "True", harder: "The dua of Bukhari 6389 may be said in sujud and after prayer." },
  // Quran 13:24.
  "What do the angels say to the people of Jannah?": { answer: "Peace be on you for your patience", harder: ["Quran 13:24: entering from every gate, what do the angels say?", "Go back", "Hurry up", "Who are you?"] },
  "Why are they greeted this way?": { answer: "They were patient", harder: ["Quran 13:24: 'peace be upon you for...' what?", "They were famous", "They were lucky", "They were rich"] },
  "Patience in hard times is rewarded in Jannah.": { answer: "True", harder: "By Quran 13:24, patient endurance is rewarded with an excellent final home." },
  // Quran 83:26.
  "What should people compete for, in 83:26?": { answer: "The joys of Jannah", harder: ["Quran 83:26: 'for this let the competitors compete.' For what?", "Power over others", "Wealth of this world", "Praise from people"] },
  "What is the drink of Jannah sealed with?": { answer: "Musk", harder: ["Quran 83:25-26: the sealed drink of Paradise is sealed with what?", "Glue", "Metal", "Wax"] },
  "Your streak in this app can be a race for good.": { answer: "True", harder: "By Quran 83:26, keeping a daily streak of good deeds can be competing for Paradise." },
  // Sunan Abi Dawud 561.
  "Who gets a perfect light on the Day of Judgment, in Abu Dawud 561?": { answer: "Those who walk to the masjid in the dark", harder: ["Abu Dawud 561: who is given good news of a perfect light?", "Those who sleep early", "Those who stay at home", "Those with the brightest lamps"] },
  "What kind of light will they have?": { answer: "A perfect light", harder: ["Abu Dawud 561: what light do those who walk in the dark to the masjid get?", "No light at all", "A tiny spark", "A light for one night"] },
  "Walking to the masjid on a dark night is wasted effort.": { answer: "False", harder: "By Abu Dawud 561, walking to the masjid in the dark brings no light on the Day of Judgment." },
  // Jami at-Tirmidhi 2390.
  "Where will those who love each other for Allah be?": { answer: "On podiums of light", harder: ["Tirmidhi 2390: those who love each other for My Majesty will be on what?", "On carpets of silk", "On thrones of gold", "On clouds of rain"] },
  "Whose words are these, in Tirmidhi 2390?": { answer: "Allah's, in a hadith qudsi", harder: ["Tirmidhi 2390: 'for the sake of My Majesty.' Whose words are these?", "A king of Persia", "A trader of Sham", "A poet of Makkah"] },
  "Being friends for Allah's sake is rewarded on the Last Day.": { answer: "True", harder: "By Tirmidhi 2390, love for the sake of Allah's Majesty is rewarded with podiums of light." },
  // Jami at-Tirmidhi 2018.
  "Who will sit nearest to him ﷺ on the Day of Judgment?": { answer: "Those best in character", harder: ["Tirmidhi 2018: who will be nearest to him ﷺ on the Day of Judgment?", "Those with the most money", "Those who talk the most", "Those with famous names"] },
  "Who will sit farthest from him ﷺ?": { answer: "Those who chatter and boast", harder: ["Tirmidhi 2018: who are the most disliked and farthest from him ﷺ?", "Those who are shy", "Those who listen", "Those who smile"] },
  "Good manners can bring you close to him ﷺ on the Last Day.": { answer: "True", harder: "By Tirmidhi 2018, the best in character are nearest to him ﷺ on the Day of Judgment." },
  // Sahih al-Bukhari 2447.
  "What will wronging others be on the Day of Resurrection?": { answer: "Darkness", harder: ["Bukhari 2447: wronging others will be what on the Day of Resurrection?", "Light", "Shade", "Gold"] },
  "Which of these is zulm, wronging someone?": { answer: "Taking a friend's toy without asking", harder: ["Bukhari 2447 warns that wronging is darkness. Which is wronging someone?", "Saying salam", "Helping a neighbor", "Sharing your lunch"] },
  "Being unfair to people is small and has no effect later.": { answer: "False", harder: "By Bukhari 2447, wronging others has no effect on the Day of Resurrection." },
  // Sahih al-Bukhari 6569.
  "Why is each person of Jannah shown the place they were saved from?": { answer: "So they will be more thankful", harder: ["Bukhari 6569: why is each person of Paradise shown his place in the Fire?", "So they can choose again", "So they will be afraid", "So they can go back"] },
  "Who told us Bukhari 6569?": { answer: "Abu Hurairah", harder: ["Bukhari 6569, 'shown his place in the Fire', was narrated by whom?", "Ibn Abbas", "Jabir ibn Abdullah", "Anas ibn Malik"] },
  "The people of Jannah will thank Allah for saving them.": { answer: "True", harder: "By Bukhari 6569, the people of Paradise are shown their place in the Fire so they are more thankful." },
  // Sahih al-Bukhari 3253.
  "How much of Jannah is better than the whole world?": { answer: "A space as small as a bow", harder: ["Bukhari 3253: how small a place in Paradise is better than all the sun rises on?", "Only a big palace", "Only a whole garden", "Only a river"] },
  "What is that small place in Jannah better than?": { answer: "All the sun rises and sets on", harder: ["Bukhari 3253: a bow's space in Paradise is better than what?", "One big house", "A bag of coins", "A single city"] },
  "Even the smallest place in Jannah beats everything in this world.": { answer: "True", harder: "By Bukhari 3253, a bow's space in Paradise is better than all the sun rises and sets on." },
  // Jami at-Tirmidhi 2346.
  "Which three things make it as if you had the world?": { answer: "Safety, health and food for the day", harder: ["Tirmidhi 2346: which three make it as if the world were gathered for you?", "Fame, power and praise", "A palace, horses and guards", "Gold, silver and land"] },
  "Waking up safe, healthy and fed is like what, he ﷺ said?": { answer: "Having the whole world", harder: ["Tirmidhi 2346: safe at home, healthy, with today's food. It is as if what?", "Having nothing at all", "Needing much more", "Being still poor"] },
  "Being safe and healthy today is a great blessing.": { answer: "True", harder: "By Tirmidhi 2346, waking safe, healthy and fed is as if the whole world were gathered for you." },
  // Jami at-Tirmidhi 2376.
  "What did he ﷺ compare greed for wealth and honor to?": { answer: "Two wolves among sheep", harder: ["Tirmidhi 2376: greed for wealth and status harms like what?", "A lamp at night", "A tree in winter", "A river in the desert"] },
  "What does that greed harm, he ﷺ said?": { answer: "A person's religion", harder: ["Tirmidhi 2376: two wolves among sheep do less harm than greed does to what?", "Nothing at all", "Only his clothes", "Only his sheep"] },
  "Chasing more money and fame can hurt your faith.": { answer: "True", harder: "By Tirmidhi 2376, greed for wealth and status harms a man's religion." },
  // Jami at-Tirmidhi 2335.
  "What was being repaired when he ﷺ passed by?": { answer: "A hut", harder: ["Tirmidhi 2335: what were Abdullah ibn Amr and his family fixing?", "A masjid", "A well", "A boat"] },
  "What did he ﷺ say passes faster than a hut grows weak?": { answer: "Life", harder: ["Tirmidhi 2335: 'I see the matter as quicker than that.' What matter?", "A cloud", "A river", "A camel"] },
  "The Prophet ﷺ reminded them that life is short.": { answer: "True", harder: "In Tirmidhi 2335, seeing a weak hut fixed, he ﷺ reminded them the end comes quicker than that." },
  // Jami at-Tirmidhi 2329.
  "Who asked him ﷺ about the best of people?": { answer: "A Bedouin", harder: ["Tirmidhi 2329: 'who is the best of people?' Who asked?", "A poet", "A rich trader", "A shepherd"] },
  "Who is the best of people, he ﷺ said?": { answer: "One whose life is long and deeds are good", harder: ["Tirmidhi 2329: whom did he ﷺ call the best of people?", "One with the most gold", "One with the most land", "One who is most famous"] },
  "A long life filled with good deeds is the best.": { answer: "True", harder: "By Tirmidhi 2329, the best of people is one whose life is long and whose deeds are good." },
  // Jami at-Tirmidhi 2407.
  "What do the body parts ask the tongue each morning?": { answer: "To fear Allah for them", harder: ["Tirmidhi 2407: each morning, what do the body parts say to the tongue?", "To speak louder", "To eat more sweets", "To sleep late"] },
  "If the tongue is straight, what happens to the body?": { answer: "The body is straight too", harder: ["Tirmidhi 2407: 'if you are straight...' what happens to the body parts?", "The body becomes crooked", "The body gets tired", "Nothing changes at all"] },
  "What we say can lead the whole body to good or bad.": { answer: "True", harder: "By Tirmidhi 2407, if the tongue is crooked, the body parts become crooked too." },
  // Jami at-Tirmidhi 2326.
  "To whom should you bring your need, he ﷺ said?": { answer: "To Allah, not to people", harder: ["Tirmidhi 2326: struck by need, to whom should you take it?", "To people, not to Allah", "To no one at all", "To the richest man"] },
  "When will Allah send provision to the one who asks Him?": { answer: "Sooner or later", harder: ["Tirmidhi 2326: whoever takes his need to Allah gets provision when?", "Never", "Only in old age", "Only once he stops asking"] },
  "Taking your need only to people always ends it.": { answer: "False", harder: "By Tirmidhi 2326, whoever takes his need to people has it ended." },
  // Sahih Muslim 2808a.
  "Where is a believer given for a good deed, he ﷺ said?": { answer: "In this world and the Hereafter", harder: ["Muslim 2808a: where is a believer given for a good deed?", "In this world only", "In the Hereafter only", "In the grave only"] },
  "Where is a disbeliever given for his good deeds, he ﷺ said?": { answer: "In this world", harder: ["Muslim 2808a: a disbeliever is given for his good where?", "In the Hereafter", "In Paradise", "In both worlds"] },
  "Allah does not wrong a believer for even one good deed.": { answer: "True", harder: "By Muslim 2808a, Allah does not wrong a believer for a good deed." },
  // Sahih al-Bukhari 7519.
  "What will the man in Paradise ask Allah to let him do?": { answer: "Farm the land", harder: ["Bukhari 7519: 'do you not have all you wish for?' What does the man still ask to do?", "Herd camels", "Sail the sea", "Climb a mountain"] },
  "How fast will his crops grow and ripen?": { answer: "Within seconds", harder: ["Bukhari 7519: the seeds are sown. How fast do they ripen?", "In one year", "In seven days", "In forty days"] },
  "The bedouin said such a man must be from Quraysh or the Ansar.": { answer: "True", harder: "In Bukhari 7519 the bedouin said the farming man must be from Quraysh or the Ansar." },
  // Sahih al-Bukhari 2809.
  "At which battle was Harithah martyred?": { answer: "Badr", harder: ["Bukhari 2809: Harithah ibn Suraqah was killed by an unknown arrow at which battle?", "Uhud", "Khaybar", "Hunayn"] },
  "What did Harithah's mother want to know?": { answer: "If he was in Paradise", harder: ["Bukhari 2809: 'if he is in Paradise I will be patient.' What did his mother ask?", "Where he was buried", "When the battle ended", "Who threw the arrow"] },
  "Paradise has only one garden.": { answer: "False", harder: "By Bukhari 2809, Paradise is one single garden." },
  // Sahih al-Bukhari 3243.
  "What is a believer's tent in Paradise like, he ﷺ said?": { answer: "A hollow pearl", harder: ["Bukhari 3243: what is a believer's tent in Paradise like?", "A tent of wool", "A tent of leather", "A hut of palm leaves"] },
  "How big is the pearl tent?": { answer: "Many miles high", harder: ["Bukhari 3243: how high is the hollow pearl tent?", "As tall as a palm tree", "As tall as a man", "As tall as a house"] },
  "In every corner of the tent, the believer has a family.": { answer: "True", harder: "By Bukhari 3243, in every corner of the pearl tent the believer has a family the others do not see." },
  // Jami at-Tirmidhi 2538.
  "What did he ﷺ say a fingernail's worth of Paradise would do?": { answer: "Beautify the heavens and earth", harder: ["Tirmidhi 2538: what would a fingernail's worth of Paradise do if it appeared?", "Fill a small cup", "Light one room", "Feed one bird"] },
  "The bracelets would blot out the sun, as the sun blots out what?": { answer: "The light of the stars", harder: ["Tirmidhi 2538: his bracelets blot out the sun as the sun blots out what?", "The mountains", "The clouds", "The sea"] },
  "Paradise is more beautiful than anything in this world.": { answer: "True", harder: "By Tirmidhi 2538, a fingernail's worth of Paradise would beautify the heavens and the earth." },
  // Sunan Ibn Majah 4340.
  "How many times should we ask Allah for Paradise, he ﷺ said?": { answer: "Three times", harder: ["Ibn Majah 4340: ask for Paradise how many times?", "Seventy times", "A thousand times", "Once a year"] },
  "What does Paradise say for the one who asks for it?": { answer: "O Allah, admit him", harder: ["Ibn Majah 4340: what does Paradise say for one who asks for it three times?", "Wait at the gate", "Come back later", "Bring more deeds"] },
  "Hell asks Allah to save the one who seeks refuge from it.": { answer: "True", harder: "By Ibn Majah 4340, Hell asks Allah to save one who seeks refuge from it three times." },
  // Jami at-Tirmidhi 2433.
  "What did Anas ask him ﷺ to do for him?": { answer: "Intercede for him", harder: ["Tirmidhi 2433: what did Anas ask him ﷺ to do on the Day of Judgement?", "Give him a camel", "Make him a leader", "Teach him to read"] },
  "Where should Anas look for him ﷺ first?": { answer: "At the Sirat", harder: ["Tirmidhi 2433: Sirat, Mizan, Hawd. Where should Anas look first?", "At the Pool", "At the Scales", "At the gate of Paradise"] },
  "He ﷺ will be found at the Sirat, the Scales or the Pool.": { answer: "True", harder: "By Tirmidhi 2433, he ﷺ will not be missed at the Sirat, the Mizan or the Hawd." },
  // Jami at-Tirmidhi 2525.
  "What is the trunk of every tree in Paradise made of?": { answer: "Gold", harder: ["Tirmidhi 2525: every tree in Paradise has a trunk of what?", "Clay", "Wood", "Stone"] },
  "How many trees in Paradise have a trunk of gold?": { answer: "Every one of them", harder: ["Tirmidhi 2525: 'there is not a tree in Paradise except...' How many have golden trunks?", "Only the tallest ones", "Only a few of them", "Only one tree"] },
  "The trees of Paradise have trunks of wood.": { answer: "False", harder: "By Tirmidhi 2525, the trees of Paradise have trunks of wood." },
  // Jami at-Tirmidhi 2571.
  "What splits off from the seas of Paradise?": { answer: "The rivers", harder: ["Tirmidhi 2571: what splits off from the seas of Paradise?", "The tents", "The gates", "The palaces"] },
  "Which of these is a sea in Paradise?": { answer: "A sea of honey", harder: ["Tirmidhi 2571: water, milk, wine and which other sea?", "A sea of sand", "A sea of fire", "A sea of salt"] },
  "Paradise has a sea of milk as well as a sea of water.": { answer: "True", harder: "By Tirmidhi 2571, Paradise has a sea of milk as well as a sea of water." },
  // Jami at-Tirmidhi 2546.
  "How many rows will the people of Paradise make?": { answer: "A hundred and twenty", harder: ["Tirmidhi 2546: the people of Paradise form how many rows?", "Seventy", "Three hundred", "One thousand"] },
  "How many of those rows will be from this Ummah?": { answer: "Eighty", harder: ["Tirmidhi 2546: of the 120 rows, how many are from this Ummah?", "Forty", "Twenty", "Ten"] },
  "Most of the rows of Paradise will be from this Ummah.": { answer: "True", harder: "By Tirmidhi 2546, eighty of the hundred and twenty rows of Paradise are from this Ummah." },
  // Jami at-Tirmidhi 2539.
  "What never comes to an end for the people of Paradise?": { answer: "Their youth", harder: ["Tirmidhi 2539: what never ends for the people of Paradise?", "Their worries", "Their hunger", "Their tiredness"] },
  "What happens to the clothes of the people of Paradise?": { answer: "They never wear out", harder: ["Tirmidhi 2539: what happens to the clothes in Paradise?", "They tear quickly", "They fade each day", "They turn to dust"] },
  "People in Paradise grow old like people of this world.": { answer: "False", harder: "By Tirmidhi 2539, the youth of the people of Paradise comes to an end." },
  // Jami at-Tirmidhi 2542.
  "What are the necks of the birds of al-Kawthar like?": { answer: "The necks of camels", harder: ["Tirmidhi 2542: the birds of al-Kawthar have necks like what?", "The necks of horses", "The necks of deer", "The necks of swans"] },
  "What did he ﷺ say al-Kawthar is?": { answer: "A river in Paradise", harder: ["Tirmidhi 2542: asked what al-Kawthar is, what did he ﷺ say?", "A mountain in Makkah", "A well in Madinah", "A garden on earth"] },
  "Al-Kawthar is whiter than milk and sweeter than honey.": { answer: "True", harder: "By Tirmidhi 2542, al-Kawthar is whiter than milk and sweeter than honey." },
  // Jami at-Tirmidhi 2488.
  "Who did he ﷺ say the Fire is unlawful for?": { answer: "The gentle, easy person", harder: ["Tirmidhi 2488: for whom is the Fire forbidden?", "The tallest person", "The richest person", "The loudest person"] },
  "How should you be with people, as he ﷺ taught?": { answer: "Easy to deal with", harder: ["Tirmidhi 2488: close to people, gentle and what else?", "Hard to please", "Quick to argue", "Slow to forgive"] },
  "He ﷺ asked: shall I not tell you whom the Fire is unlawful for?": { answer: "True", harder: "In Tirmidhi 2488 he ﷺ asked: shall I not tell you for whom the Fire is forbidden?" },
  // Jami at-Tirmidhi 2336.
  "What did he ﷺ call the test of his ummah?": { answer: "Wealth", harder: ["Tirmidhi 2336: 'every ummah has a fitnah, and the fitnah of my ummah is...' what?", "Cold weather", "Wild animals", "Hard work"] },
  "What does fitnah mean?": { answer: "A test", harder: ["Tirmidhi 2336: what does fitnah mean here?", "A reward", "A holiday", "A market"] },
  "Every ummah is given its own test.": { answer: "True", harder: "By Tirmidhi 2336, every ummah has a fitnah, a test." },
  // Sahih al-Bukhari 6425.
  "What did he ﷺ fear for us more than poverty?": { answer: "The world given in plenty", harder: ["Bukhari 6425: 'by Allah, it is not poverty I fear for you.' What did he ﷺ fear?", "Being too poor", "Cold winters", "Long journeys"] },
  "What would racing for the world do to us, he ﷺ said?": { answer: "Distract us", harder: ["Bukhari 6425: competing for the world as those before did would do what to us?", "Make us stronger", "Make us kinder", "Make us wiser"] },
  "He ﷺ smiled when he saw the Ansar come.": { answer: "True", harder: "In Bukhari 6425 he ﷺ smiled when the Ansar came to Fajr after hearing of the wealth from Bahrain." },
  // Sahih al-Bukhari 6443.
  "What did he ﷺ say about those with much wealth?": { answer: "They will have little that Day", harder: ["Bukhari 6443: 'those with much will be...' what on the Day of Resurrection?", "They will enter Paradise first", "They will not be asked about it", "They will rule in Paradise"] },
  "Which rich person is the exception?": { answer: "One who gives his wealth out", harder: ["Bukhari 6443: which wealthy person is the exception?", "One who hides it well", "One who counts it daily", "One who saves it all"] },
  "Abu Dharr walked with the Prophet ﷺ one night.": { answer: "True", harder: "In Bukhari 6443, Abu Dharr found him ﷺ walking alone one night and walked with him." },
  // Jami at-Tirmidhi 2345.
  "What did one brother do while the other worked?": { answer: "He kept coming to the Prophet ﷺ", harder: ["Tirmidhi 2345: one brother worked in trade. What did the other do?", "He slept all day", "He travelled far away", "He played in the market"] },
  "Why might the working brother be given provision?": { answer: "Because of his brother", harder: ["Tirmidhi 2345: 'perhaps you are provided for...' why?", "Because of luck", "Because of the market", "Because of his skill alone"] },
  "Helping someone who seeks knowledge can bring you blessing.": { answer: "True", harder: "By Tirmidhi 2345, a worker may be provided for because of the brother who sought knowledge." },
  // Jami at-Tirmidhi 2354.
  "Who enters Paradise first, the poor or the rich?": { answer: "The poor Muslims", harder: ["Tirmidhi 2354: who enters Paradise half a day ahead?", "The rich Muslims", "Both groups together", "Whoever is strongest"] },
  "How long is that half a day?": { answer: "Five hundred years", harder: ["Tirmidhi 2354: the poor enter half a day before the rich. How long is that?", "Five hours", "Five days", "Fifty days"] },
  "Being poor in this world means Allah does not love you.": { answer: "False", harder: "By Tirmidhi 2354, being poor in this world shows Allah does not love a person." },
  // Jami at-Tirmidhi 2368.
  "Why did some men fall down in the prayer?": { answer: "From hunger", harder: ["Tirmidhi 2368: in the prayer, why did some men fall down?", "From laughing", "From the cold", "From being pushed"] },
  "Who were these hungry men?": { answer: "The people of the Suffah", harder: ["Tirmidhi 2368: Bedouins called them mad. Who were the men who fell?", "Traders from Sham", "Soldiers of Rome", "Kings of Yemen"] },
  "He ﷺ told them Allah had great good stored for them.": { answer: "True", harder: "In Tirmidhi 2368 he ﷺ told the hungry men that great good was stored for them with Allah." },
  // Sahih al-Bukhari 1849.
  "Where was the man when he fell from his mount?": { answer: "At Arafah, on Hajj", harder: ["Bukhari 1849: where did the man fall from his mount and break his neck?", "On a ship at sea", "In the market", "At his home"] },
  "How will Allah raise him on the Day of Resurrection?": { answer: "Reciting the talbiyah", harder: ["Bukhari 1849: washed with water and sidr, how will he be raised?", "Crying for help", "Silent and afraid", "Calling for his family"] },
  "He will rise still in the state of a pilgrim.": { answer: "True", harder: "By Bukhari 1849, the pilgrim who died at Arafah will be raised reciting the talbiyah." },
  // Sahih Muslim 2878a.
  "In what state will every servant be raised, he ﷺ said?": { answer: "The state in which he died", harder: ["Muslim 2878a: every servant will be raised in what state?", "The state of his first prayer", "The state of his last meal", "The state of his best clothes"] },
  "Who heard him ﷺ say that every servant is raised as he died?": { answer: "Jabir ibn Abdullah", harder: ["Muslim 2878a: who narrated 'every servant will be raised as he dies'?", "Salman al-Farisi", "Bilal ibn Rabah", "Abu Dharr al-Ghifari"] },
  "How a person dies will show in how he is raised.": { answer: "True", harder: "By Muslim 2878a, the state a servant dies in is the state he is raised in." },
  // Sahih al-Bukhari 2118.
  "Who will sink with the army, he ﷺ said?": { answer: "All of them, even those not of them", harder: ["Bukhari 2118: at al-Bayda the earth swallows the army. Who sinks?", "Only its leader", "Only its horses", "Not a single one"] },
  "How will each of them be raised and judged?": { answer: "By their intentions", harder: ["Bukhari 2118: all sink. How are they raised and judged?", "By their wealth", "By their tribe", "By their age"] },
  "Two people can die in the same way yet be judged differently.": { answer: "True", harder: "By Bukhari 2118, people swallowed in one army can be judged differently by their intentions." },
  // Sahih al-Bukhari 237.
  "How will the wound smell on the Day of Resurrection?": { answer: "Like musk", harder: ["Bukhari 237: a wound in Allah's cause will smell of what on that Day?", "Like smoke", "Like burnt wood", "Like the sea"] },
  "What colour will the wound be?": { answer: "The colour of blood", harder: ["Bukhari 237: smelling of musk, what colour is the wound?", "The colour of gold", "The colour of grass", "The colour of snow"] },
  "Allah honours what His servant suffered for His sake.": { answer: "True", harder: "By Bukhari 237, a wound in Allah's cause appears on that Day smelling of musk." },
  // Sunan Abi Dawud 4202.
  "What will a grey hair grown in Islam be on that Day?": { answer: "Light", harder: ["Abu Dawud 4202: 'do not pluck out grey hair.' What is it on that Day?", "A heavy burden", "Darkness", "Nothing at all"] },
  "What does Allah write for each grey hair, in one version?": { answer: "A good deed, and a sin wiped away", harder: ["Abu Dawud 4202, another version: what does Allah write for each grey hair?", "Nothing at all", "A bad deed", "One more year"] },
  "Growing old as a Muslim is honoured by Allah.": { answer: "True", harder: "By Abu Dawud 4202, a grey hair grown in Islam becomes light on the Day of Resurrection." },
  // Sunan Ibn Majah 725.
  "Who will have the longest necks on the Day of Resurrection?": { answer: "Those who call the adhan", harder: ["Ibn Majah 725: who will have the longest necks on that Day?", "The richest traders", "The tallest people", "The fastest runners"] },
  "What does a mu'adhdhin do?": { answer: "Calls people to prayer", harder: ["Ibn Majah 725 praises the mu'adhdhins. What do they do?", "Leads the army", "Sells in the market", "Guards the city"] },
  "Calling the adhan is honoured on the Day of Resurrection.": { answer: "True", harder: "By Ibn Majah 725, the mu'adhdhins will have the longest necks on the Day of Resurrection." },
  // Jami at-Tirmidhi 2492.
  "How will the proud be gathered on that Day?": { answer: "Like tiny specks in human form", harder: ["Tirmidhi 2492: how will the proud be gathered?", "Riding fine horses", "Wearing gold crowns", "Taller than everyone"] },
  "What will cover the proud from every side?": { answer: "Humiliation", harder: ["Tirmidhi 2492: the proud are covered from every side with what?", "Honour", "Light", "Shade"] },
  "Whoever looks down on people now will be made small on that Day.": { answer: "True", harder: "By Tirmidhi 2492, the proud will be gathered like tiny particles, covered with humiliation." },
  // Jami at-Tirmidhi 2308.
  "What did Uthman do when he stood at a grave?": { answer: "Wept until his beard was wet", harder: ["Tirmidhi 2308: what did Uthman do at a grave?", "Gave food to the poor", "Sat down to rest", "Told a long story"] },
  "What is the grave, he ﷺ said?": { answer: "The first stage of the Hereafter", harder: ["Tirmidhi 2308: why did Uthman weep at graves? The grave is what?", "A place to rest forever", "The whole of the Hereafter", "The end of everything"] },
  "For one saved in the grave, what follows is easier.": { answer: "True", harder: "By Tirmidhi 2308, whoever is saved in the grave finds what comes after easier." },
  // Sunan Ibn Majah 4259.
  "Which believer is best, he ﷺ said?": { answer: "The one with the best manners", harder: ["Ibn Majah 4259: 'which believer is best?' What did he ﷺ say?", "The one with the biggest house", "The one who talks the most", "The one with the most wealth"] },
  "Which believers are the wisest, he ﷺ said?": { answer: "Those who remember death and prepare", harder: ["Ibn Majah 4259: 'which of them is wisest?' Whom did he ﷺ name?", "Those who gather the most wealth", "Those who win every argument", "Those who never think of death"] },
  "The wisest people remember death often and prepare for it.": { answer: "True", harder: "By Ibn Majah 4259, the wisest are those who remember death most and prepare best." },
  // Sunan Ibn Majah 4243.
  "What do sins that seem small have, he ﷺ said?": { answer: "A pursuer from Allah", harder: ["Ibn Majah 4243: 'beware of deeds thought to be small, for they have...' what?", "No weight at all", "No record at all", "An easy excuse"] },
  "Which deeds did he ﷺ tell Aishah to beware of?": { answer: "Those thought to be small", harder: ["Ibn Majah 4243: 'O Aishah, beware of...' which deeds?", "Those done by mistake", "Those already forgiven", "Those done long ago"] },
  "A sin is nothing to worry about if it seems small.": { answer: "False", harder: "By Ibn Majah 4243, deeds thought to be small have no pursuer from Allah." },
  // Sunan Ibn Majah 4104.
  "How much of this world is enough, he ﷺ advised?": { answer: "A rider's provision", harder: ["Ibn Majah 4104: 'enough for any of you is like...' what?", "A full storehouse", "A large farm", "A house full of gold"] },
  "Why did Salman weep when Sa'd visited him?": { answer: "He feared he had gone past that advice", harder: ["Ibn Majah 4104: 'not longing for this world.' Why then did Salman weep?", "He was afraid of being alone", "He missed his old home", "He was in great pain"] },
  "Salman said he did not weep out of love for this world.": { answer: "True", harder: "In Ibn Majah 4104, Salman said he did not weep out of longing for this world." },
  // Sunan Ibn Majah 4317.
  "What did he ﷺ choose when his Lord gave him a choice?": { answer: "Intercession", harder: ["Ibn Majah 4317: half his ummah in Paradise, or what? What did he ﷺ choose?", "A long life on earth", "Half his ummah in Paradise", "Great wealth on earth"] },
  "Whom is his ﷺ intercession for, he ﷺ said?": { answer: "Every Muslim", harder: ["Ibn Majah 4317: 'pray that we are among its people.' Whom is it for?", "Only the Companions", "Only the scholars", "Only the martyrs"] },
  "The Companions asked him ﷺ to pray that they be among its people.": { answer: "True", harder: "In Ibn Majah 4317 the Companions asked him ﷺ to pray that they be among its people." },
  // Sunan Abi Dawud 4902.
  "What did he ﷺ say about oppression and cutting family ties?": { answer: "They are punished soonest", harder: ["Abu Dawud 4902: oppression and cutting ties. What is said of their punishment?", "They bring no punishment", "They are small sins", "They are easily forgiven"] },
  "When are these two sins punished, he ﷺ said?": { answer: "In this world and the next", harder: ["Abu Dawud 4902: these two are punished when?", "Only in the next world", "Only in this world", "Never at all"] },
  "Cutting off family ties is a light matter.": { answer: "False", harder: "By Abu Dawud 4902, cutting family ties is a light sin, slow to be punished." },
  // Jami at-Tirmidhi 982.
  "How does a believer die, he ﷺ said?": { answer: "With sweat on his brow", harder: ["Tirmidhi 982: 'the believer dies with...' what?", "With ink on his hands", "With oil in his hair", "With dust on his feet"] },
  "What is the brow?": { answer: "The forehead", harder: ["Tirmidhi 982 says sweat on the brow. Where is the brow?", "The chin", "The cheek", "The neck"] },
  "Sweat on the brow at death can be a sign of a believer.": { answer: "True", harder: "By Tirmidhi 982, the believer dies with sweat on his brow." },
  // Sahih al-Bukhari 1367.
  "What was affirmed for the man the people praised?": { answer: "Paradise", harder: ["Bukhari 1367: 'it has been affirmed.' What was affirmed for the praised man?", "A big house", "A long life", "Great wealth"] },
  "Who asked him ﷺ what had been affirmed?": { answer: "Umar ibn al-Khattab", harder: ["Bukhari 1367: 'what has been affirmed?' Who asked?", "Ali ibn Abi Talib", "Uthman ibn Affan", "Abu Bakr as-Siddiq"] },
  "He ﷺ called the believers Allah's witnesses on earth.": { answer: "True", harder: "In Bukhari 1367 he ﷺ said: you are Allah's witnesses on earth." },
  // Sahih al-Bukhari 1314.
  "What does a righteous person on the bier say, he ﷺ said?": { answer: "Present me quickly", harder: ["Bukhari 1314: carried on shoulders, what does the righteous one say?", "Carry me slowly", "Set me down here", "Wait for the others"] },
  "Who hears the voice from the bier, he ﷺ said?": { answer: "Everything except people", harder: ["Bukhari 1314: who hears the voice from the bier?", "None but the angels", "None but its family", "None but the birds"] },
  "The bier of one who was not righteous cries out: woe to it!": { answer: "True", harder: "By Bukhari 1314, the bier of one not righteous says: woe to it, where are they taking it?" },
  // Sunan Ibn Majah 1500.
  "What did he ﷺ ask Allah to give the dead man?": { answer: "A better home and family", harder: ["Ibn Majah 1500: in the funeral prayer, what did he ﷺ ask be given the dead man?", "A long line of sons", "A grave filled with gold", "A name people remember"] },
  "From what did he ﷺ ask Allah to protect the dead man?": { answer: "The trial of the grave", harder: ["Ibn Majah 1500: the dua asks protection from the punishment of the Fire and what?", "The heat of the sun", "The cold of the night", "The eyes of the people"] },
  "He ﷺ asked Allah to wash the dead man's sins away.": { answer: "True", harder: "In Ibn Majah 1500 he ﷺ asked Allah to wash the man with water, snow and hail." },
  // Sunan Abi Dawud 3213.
  "When did he ﷺ say: in the name of Allah, and on the Sunnah?": { answer: "When placing the dead in the grave", harder: ["Abu Dawud 3213: 'in the name of Allah, and following the Sunnah.' When was it said?", "When building a new home", "When washing the dead with water", "When walking behind the funeral"] },
  "Whose way did he ﷺ name along with Allah's name?": { answer: "The Sunnah of Allah's Messenger", harder: ["Abu Dawud 3213: 'bismillah, and following...' whose way?", "The customs of the Arabs", "The habits of the people of Makkah", "The ways of their forefathers"] },
  "Saying Allah's name when laying the dead in the grave is a sunnah.": { answer: "True", harder: "By Abu Dawud 3213, he ﷺ said Allah's name when placing the dead in the grave." },
  // Sunan Abi Dawud 3207.
  "Breaking a dead man's bone is like what, he ﷺ said?": { answer: "Breaking it while he lives", harder: ["Abu Dawud 3207: breaking a dead person's bone is like what?", "Breaking a clay pot", "Nothing at all", "Breaking a dry stick"] },
  "How should we handle the body of one who has died?": { answer: "Gently, with honor", harder: ["Abu Dawud 3207: the dead keep their honor. How should a body be handled?", "Like an old cloth", "Roughly, without care", "Any way at all"] },
  "A Muslim's body keeps its honor after death.": { answer: "True", harder: "By Abu Dawud 3207, breaking a dead person's bone is like breaking it in life." },
  // Sunan Abi Dawud 3235.
  "Why may we visit graves, he ﷺ said?": { answer: "They remind us of death", harder: ["Abu Dawud 3235: 'now you may visit them, for...' why?", "They make wealth grow", "They bring good luck", "The dead grant wishes"] },
  "What happened to the rule on visiting graves?": { answer: "Forbidden at first, then allowed", harder: ["Abu Dawud 3235: 'I had forbidden you... now you may.' What changed?", "Allowed at first, then forbidden", "Forbidden always, never allowed", "Made a duty for everyone"] },
  "Muslims may visit graves today.": { answer: "True", harder: "By Abu Dawud 3235, visiting graves was once forbidden and later allowed." },
  // Jami at-Tirmidhi 2328.
  "Who reported the warning about estates?": { answer: "Abdullah ibn Mas'ud", harder: ["Tirmidhi 2328: 'do not take to estates.' Who narrated it?", "Abu Dharr al-Ghifari", "Anas ibn Malik", "Abu Musa al-Ash'ari"] },
  "What can taking to estates lead to, he ﷺ warned?": { answer: "Desiring this world", harder: ["Tirmidhi 2328: 'do not take to estates, so that you become...' what?", "Losing your friends", "Getting sick often", "Forgetting how to read"] },
  "He ﷺ warned against what makes the heart desire this world.": { answer: "True", harder: "In Tirmidhi 2328 he ﷺ warned against estates that make one desire this world." },
  // Jami at-Tirmidhi 2322.
  "Which people did he ﷺ name as exceptions?": { answer: "The scholar and the student", harder: ["Tirmidhi 2322: 'except the remembrance of Allah... and...' which two people?", "The king and his guards", "The rich and the famous", "The strong and the tall"] },
  "Which deed did he ﷺ name first as an exception?": { answer: "The remembrance of Allah", harder: ["Tirmidhi 2322: the world is cursed except what, named first?", "Building towers", "Winning races", "Collecting gold"] },
  "The one who learns is among the exceptions he ﷺ named.": { answer: "True", harder: "By Tirmidhi 2322, the one who learns is among those excepted from the curse of this world." },
  // Jami at-Tirmidhi 2331.
  "What lifespan did he ﷺ give for his Ummah?": { answer: "Sixty to seventy years", harder: ["Tirmidhi 2331: the lifespan of his Ummah is from what to what?", "Two hundred years", "Ten to twenty years", "Three hundred years"] },
  "What is the Ummah he ﷺ spoke of?": { answer: "The nation that follows him", harder: ["Tirmidhi 2331: 'the lifespan of my Ummah.' Who is the Ummah?", "A tribe of Makkah", "A group of angels", "A city in Yemen"] },
  "Most of his ﷺ Ummah will live for many hundreds of years.": { answer: "False", harder: "By Tirmidhi 2331, the lifespan of his ﷺ Ummah is many hundreds of years." },
  // Sunan an-Nasa'i 3225.
  "What do the people of this world count as nobility?": { answer: "Wealth", harder: ["Nasa'i 3225: 'the nobility the people of this world go after is...' what?", "Knowledge", "Patience", "Good manners"] },
  "Whose idea of nobility is wealth, he ﷺ said?": { answer: "The people of this world", harder: ["Nasa'i 3225: whose nobility is wealth?", "The people of Paradise", "The angels", "The prophets"] },
  "He ﷺ said the people of this world go after wealth as nobility.": { answer: "True", harder: "By Nasa'i 3225, the nobility the people of this world always go after is wealth." },
  // Jami at-Tirmidhi 2036.
  "What does Allah keep from a servant He loves?": { answer: "The world", harder: ["Tirmidhi 2036: when Allah loves a servant, He keeps him away from what?", "Faith", "Good deeds", "The Quran"] },
  "What did he ﷺ liken it to?": { answer: "Keeping water from a sick one", harder: ["Tirmidhi 2036: as one keeps what from whom?", "Keeping rain from a farm", "Keeping food from a guest", "Keeping light from a reader"] },
  "Getting less of this world can be a sign of Allah's love.": { answer: "True", harder: "By Tirmidhi 2036, being kept from this world can be a sign that Allah loves a servant." },
  // Sahih al-Bukhari 6302.
  "Why did Ibn Umar build his house?": { answer: "For shelter from rain and sun", harder: ["Bukhari 6302: Ibn Umar built a house to do what?", "For hosting big feasts", "For keeping horses", "For storing trade goods"] },
  "Who helped Ibn Umar build it?": { answer: "Nobody", harder: ["Bukhari 6302: 'none of Allah's creation helped me.' Who helped Ibn Umar?", "His father Umar", "Some hired builders", "His whole tribe"] },
  "Ibn Umar built this house during the life of the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 6302, Ibn Umar built his house in the lifetime of the Prophet ﷺ." },
  // Sahih Muslim 2957a.
  "What did he ﷺ find in the market, as Jabir reported?": { answer: "A dead lamb", harder: ["Muslim 2957a: walking through the market, what did he ﷺ pick up by the ear?", "A lost sandal", "A bag of gold", "A broken jar"] },
  "How did the people answer when he ﷺ offered it for a dirham?": { answer: "They did not want it", harder: ["Muslim 2957a: 'who would like this for a dirham?' What did they say?", "They raced to buy it", "They asked for two", "They paid in gold"] },
  "This world is of little worth in Allah's sight.": { answer: "True", harder: "By Muslim 2957a, this world is more insignificant to Allah than the dead lamb was to them." },
  // Jami at-Tirmidhi 2195.
  "What did he ﷺ tell us to rush to, before the trials?": { answer: "Good deeds", harder: ["Tirmidhi 2195: 'rush to...' what before trials like dark night?", "Tall buildings", "Big markets", "Faraway lands"] },
  "How quickly will some people change in that trial?": { answer: "From morning to evening", harder: ["Tirmidhi 2195: in that trial, a believer can change how fast?", "From youth to old age", "From one Ramadan to the next", "From one year to the next"] },
  "Some people will sell their religion for goods of the world.": { answer: "True", harder: "By Tirmidhi 2195, one of them will sell his religion for goods of the world." },
  // Sunan Ibn Majah 3985.
  "In which kind of time did he ﷺ praise worship?": { answer: "A time of bloodshed", harder: ["Ibn Majah 3985: worship in what kind of time is praised?", "A time of feasting", "A time of rain", "A time of plenty"] },
  "What is such worship like, he ﷺ said?": { answer: "Emigrating to him ﷺ", harder: ["Ibn Majah 3985: worship in the time of bloodshed is like what?", "Fasting a whole year", "Freeing ten slaves", "Building a masjid"] },
  "When people turn to killing, worship loses its worth.": { answer: "False", harder: "By Ibn Majah 3985, worship during a time of bloodshed loses its worth." },
  // Sunan Abi Dawud 4263.
  "Who is the happy man, he ﷺ said?": { answer: "One who avoids dissensions", harder: ["Abu Dawud 4263: 'the happy man is he who...' what?", "One who wins every argument", "One who has many friends", "One who owns much land"] },
  "Who did he ﷺ call fine, if trials do come?": { answer: "One who shows endurance", harder: ["Abu Dawud 4263: 'how fine is the man who is afflicted and...' what?", "One who gives up hope", "One who blames others", "One who complains loudly"] },
  "He ﷺ said the words about avoiding strife three times.": { answer: "True", harder: "In Abu Dawud 4263, al-Miqdad heard the words about avoiding dissensions three times." },
  // Sahih al-Bukhari 7115.
  "What will a man pass by, before the Hour comes?": { answer: "A grave", harder: ["Bukhari 7115: before the Hour, a man passes by what?", "A market", "A river", "A mountain"] },
  "What will the man say at the grave?": { answer: "Would that I were in his place", harder: ["Bukhari 7115: at the grave, what will the man say?", "Would that I were rich", "Would that I were young", "Would that I were a king"] },
  "A man wishing he were in a grave is a sign before the Hour.": { answer: "True", harder: "By Bukhari 7115, before the Hour a man will pass a grave and wish he were in its place." },
  // Sunan Abi Dawud 4319.
  "What should one who hears of the Dajjal do?": { answer: "Go far from him", harder: ["Abu Dawud 4319: what should one who hears of the Dajjal do?", "Wait to see him", "Follow him closely", "Ask him for help"] },
  "What will the man who goes to him think of himself?": { answer: "That he is a believer", harder: ["Abu Dawud 4319: the man goes to the Dajjal thinking he is what?", "That he is a scholar", "That he is a king", "That he is lost"] },
  "Being sure of your faith makes it safe to go near the Dajjal.": { answer: "False", harder: "By Abu Dawud 4319, a man sure he is a believer is safe going near the Dajjal." },
  // Jami at-Tirmidhi 2869.
  "What did he ﷺ liken his Ummah to?": { answer: "The rain", harder: ["Tirmidhi 2869: 'the parable of my Ummah is that of...' what?", "The sea", "The wind", "The mountains"] },
  "What is not known about the rain, he ﷺ said?": { answer: "Whether its start or end is better", harder: ["Tirmidhi 2869: of the rain, what is not known?", "Whether it is pure water", "Whether it is from Allah", "Whether it brings any good"] },
  "Like rain, his ﷺ Ummah may have good at its end too.": { answer: "True", harder: "By Tirmidhi 2869, it is not known whether the Ummah's beginning or its end is better." },
  // Sahih Muslim 2890a.
  "How many things did he ﷺ ask his Lord for his Ummah?": { answer: "Three things", harder: ["Muslim 2890a: after two rak'ahs and a long du'a, how many things did he ﷺ ask?", "Five things", "Seven things", "Two things"] },
  "Which of his ﷺ requests for his Ummah was not granted?": { answer: "No bloodshed among them", harder: ["Muslim 2890a: famine, drowning, bloodshed. Which was withheld?", "No outside enemy over them", "No famine to destroy them", "No flood to drown them"] },
  "Allah granted that famine would not destroy his ﷺ Ummah.": { answer: "True", harder: "By Muslim 2890a, Allah granted that famine would not destroy his ﷺ Ummah." },
  // Sunan Ibn Majah 1444.
  "What should we urge the dying to say?": { answer: "La ilaha illallah", harder: ["Ibn Majah 1444: 'urge your dying ones to say...' what?", "Their last wishes", "Their own names", "Goodbye to everyone"] },
  "Whom did he ﷺ tell us to urge to say it?": { answer: "Those who are dying", harder: ["Ibn Majah 1444: whom should we urge to say La ilaha illallah?", "Only the children", "Only the travelers", "Only the scholars"] },
  "We help a dying Muslim by reminding him of La ilaha illallah.": { answer: "True", harder: "By Ibn Majah 1444, we should urge the dying to say La ilaha illallah." },
  // Jami at-Tirmidhi 1653.
  "Where might he die and still get the martyr's status?": { answer: "In his own bed", harder: ["Tirmidhi 1653: asking sincerely for martyrdom, he gets its status even dying where?", "Only on a battlefield", "Only in Makkah", "Only on Hajj"] },
  "How must he ask Allah for martyrdom?": { answer: "Sincerely, in his heart", harder: ["Tirmidhi 1653: how must he ask for martyrdom?", "Loudly, before people", "Once a year only", "Through someone else"] },
  "A sincere wish for martyrdom can reach its status in bed.": { answer: "True", harder: "By Tirmidhi 1653, one who sincerely asks for martyrdom gets its status even dying in bed." },
  // Sunan Abi Dawud 2500.
  "Whose deeds keep growing after death, he ﷺ said?": { answer: "One guarding the frontier", harder: ["Abu Dawud 2500: whose deeds are not completed at death?", "One who is very rich", "One with a big house", "One who lived longest"] },
  "Till when do his deeds keep growing?": { answer: "Till the Day of Resurrection", harder: ["Abu Dawud 2500: the frontier guard's deeds keep increasing until when?", "Till the next Ramadan", "For forty days", "Till his son grows up"] },
  "The frontier guard is kept safe from the trial in the grave.": { answer: "True", harder: "By Abu Dawud 2500, the one on the frontier is safe from the trial in the grave." },
  // Jami at-Tirmidhi 1633.
  "Which man will not enter the Fire, he ﷺ said?": { answer: "One who wept from fear of Allah", harder: ["Tirmidhi 1633: which man shall not enter the Fire?", "One who ate little", "One who never smiled", "One who slept little"] },
  "He ﷺ said he won't enter the Fire till what returns to the udder?": { answer: "The milk", harder: ["Tirmidhi 1633: not until what returns to the udder?", "The honey", "The rain", "The water"] },
  "Dust in Allah's cause and the smoke of Hell never come together.": { answer: "True", harder: "By Tirmidhi 1633, dust in Allah's cause and the smoke of Hell never come together." },
  // Sunan Abi Dawud 4739.
  "For whom will his ﷺ intercession be, he said?": { answer: "His people with major sins", harder: ["Abu Dawud 4739: 'my intercession will be for...' whom?", "Only the angels", "Only his family", "Only those with no sins"] },
  "Which sins did he ﷺ name?": { answer: "Major sins", harder: ["Abu Dawud 4739: which sins does the intercession reach?", "Only sins of others", "Only small slips", "Only old sins"] },
  "His ﷺ intercession gives hope to those with major sins.": { answer: "True", harder: "By Abu Dawud 4739, his ﷺ intercession will be for those of his people with major sins." },
  // Sunan Abi Dawud 2522.
  "For how many of his family is a martyr's intercession accepted?": { answer: "Seventy of them", harder: ["Abu Dawud 2522: a martyr's intercession is accepted for how many of his family?", "Ten of them", "One of them", "Two of them"] },
  "Whose intercession is accepted for seventy of his family?": { answer: "A martyr's", harder: ["Abu Dawud 2522: whose intercession is accepted for seventy of his family?", "A poet's", "A king's", "A rich man's"] },
  "A martyr can intercede for members of his family.": { answer: "True", harder: "By Abu Dawud 2522, a martyr's intercession is accepted for seventy of his family." },
  // Sunan Ibn Majah 4316.
  "Which tribe did he ﷺ name, in Ibn Majah 4316?": { answer: "Banu Tamim", harder: ["Ibn Majah 4316: more than which tribe enter Paradise by one man's intercession?", "Banu Tayy", "Banu Hamdan", "Banu Kalb"] },
  "Where would the man come from, he ﷺ said?": { answer: "From among his Ummah", harder: ["Ibn Majah 4316: the man who intercedes for more than Banu Tamim is from where?", "From among earlier nations", "From among the angels", "From among the jinn"] },
  "He ﷺ said the man would be someone besides himself.": { answer: "True", harder: "In Ibn Majah 4316, asked 'besides you?', he ﷺ said: besides me." },
};
