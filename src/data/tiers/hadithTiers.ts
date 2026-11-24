import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for the Hadith topic (370 questions).
 * Each keeps the same answer and the same source as the original.
 */
export const HADITH_TIERS: Record<string, TierEntry> = {
  // Sahih Muslim 2626.
  "How should you meet your brother?": { answer: "With a smile", harder: ["Muslim 2626: 'do not belittle any good, even meeting your brother...' how?", "With a frown", "With your back turned", "Without looking at him"] },
  "A small good deed, like a smile, does not count.": { answer: "False", harder: "By Muslim 2626, meeting your brother with a cheerful face is too small to count as good." },
  // Sahih al-Bukhari 28.
  "Who should you say salam to?": { answer: "Everyone you meet", harder: ["Bukhari 28: greet those you know and those you do not know. Whom do you greet?", "No one at all", "Only your friends", "Only people older than you"] },
  "Besides salam, which good deed did the Prophet ﷺ name?": { answer: "Feeding people", harder: ["Bukhari 28: next to greeting everyone, which deed did he ﷺ name?", "Sleeping late", "Keeping food to yourself", "Building tall houses"] },
  // Sahih al-Bukhari 6018.
  "If you can't say something good, what should you do?": { answer: "Stay quiet", harder: ["Bukhari 6018: 'whoever believes in Allah and the Last Day should talk what is good or...' what?", "Shout louder", "Say it anyway", "Argue until you win"] },
  "A believer is kind to his neighbor and his guest.": { answer: "True", harder: "By Bukhari 6018, the one who believes in Allah and the Last Day does not harm his neighbor and honors his guest." },
  // Sunan Abi Dawud 4811.
  "Your friend helps you. What should you say?": { answer: "Thank you", harder: ["Abu Dawud 4811: whoever does not thank people does not thank Allah. A friend helps you; what do you say?", "Nothing at all", "Go away", "Only thank Allah, not him"] },
  "Thanking people is part of thanking Allah.": { answer: "True", harder: "By Abu Dawud 4811, one who does not thank people is not thankful to Allah." },
  // Sahih al-Bukhari 5376.
  "Which hand should you eat with?": { answer: "Your right hand", harder: ["Bukhari 5376: 'O boy! Mention Allah's name and eat with...' which hand?", "Both hands", "Your left hand", "Whichever hand is free"] },
  "What should you say before you eat?": { answer: "Bismillah", harder: ["Bukhari 5376: 'mention the Name of Allah' before eating. Which word is that?", "Goodbye", "Nothing at all", "Thank you"] },
  "Which food should you take from the dish?": { answer: "What is nearest to you", harder: ["Bukhari 5376: 'and eat of the dish...' what part?", "The biggest piece", "From everyone's side", "Only from the middle"] },
  // Sahih al-Bukhari 13.
  "What should you wish for your brother?": { answer: "What you like for yourself", harder: ["Bukhari 13: no one truly believes until he wishes for his brother what?", "Less than you have", "Nothing at all", "Only what you do not need"] },
  "True faith means wanting good things only for yourself.": { answer: "False", harder: "By Bukhari 13, faith is complete even if you wish good only for yourself." },
  // Sahih al-Bukhari 6114.
  "Who is truly strong?": { answer: "The one who controls his anger", harder: ["Bukhari 6114: not the one who overcomes people by strength. Who is the strong one?", "The one who wins every fight", "The one who shouts loudest", "The one who lifts the most"] },
  "Beating others in a fight makes you truly strong.": { answer: "False", harder: "By Bukhari 6114, the strong one is the one who overcomes people by his strength." },
  // Sahih al-Bukhari 69.
  "What did the Prophet ﷺ tell us to do for people?": { answer: "Make things easy", harder: ["Bukhari 69: 'facilitate things for people and do not...' what is the command?", "Scare them away", "Make things hard", "Leave them alone"] },
  "What should we give people, the Prophet ﷺ said?": { answer: "Good news", harder: ["Bukhari 69: 'give glad tidings and do not make people run away.' What should we give?", "Bad news", "A hard time", "Only warnings"] },
  // Sahih al-Bukhari 5027.
  "Who are the best among us?": { answer: "Those who learn and teach the Quran", harder: ["Bukhari 5027: 'the best among you are those who...' who?", "Those with the most toys", "Those who run the fastest", "Those who own the most"] },
  "Once you learn the Quran, you should keep it to yourself.": { answer: "False", harder: "By Bukhari 5027, the best are those who learn the Quran and keep it to themselves." },
  // Sahih Muslim 2564c.
  "What does Allah look at?": { answer: "Your heart and your deeds", harder: ["Muslim 2564c: Allah does not look at your faces and wealth. What does He look at?", "Your clothes", "Your money", "Your face"] },
  "Allah cares most about how pretty or rich you are.": { answer: "False", harder: "By Muslim 2564c, Allah looks most at your faces and your wealth." },
  // Sahih al-Bukhari 6406.
  "How are the two phrases on the tongue?": { answer: "Easy to say", harder: ["Bukhari 6406: two phrases dear to the Most Merciful. How are they on the tongue?", "Only for adults", "Very hard to say", "Too long to learn"] },
  "How are they on the scale of deeds?": { answer: "Very heavy", harder: ["Bukhari 6406: easy on the tongue, and how on the scale?", "Very light", "Not counted", "Only a little"] },
  "Subhan Allah means glory be to Allah.": { answer: "True", harder: "In Bukhari 6406, 'Subhan Allahi wa bihamdihi' begins with words meaning glory be to Allah." },
  // Sahih Muslim 2137a.
  "How many are the dearest words to Allah?": { answer: "Four", harder: ["Muslim 2137a: 'the dearest words to Allah are...' how many?", "One", "Ten", "Seven"] },
  "Which is one of the four?": { answer: "Alhamdulillah", harder: ["Muslim 2137a: Subhan Allah, La ilaha illallah, Allahu Akbar and which other?", "Good morning", "Thank you", "Goodbye"] },
  "The four words must be said in one fixed order.": { answer: "False", harder: "By Muslim 2137a, you must begin the four words with Subhan Allah." },
  // Sahih al-Bukhari 6407.
  "Whom is the one who remembers Allah like?": { answer: "Someone alive", harder: ["Bukhari 6407: the one who remembers his Lord and the one who does not are like whom?", "Someone rich", "Someone asleep", "Someone lost"] },
  "What does dhikr mean?": { answer: "Remembering Allah", harder: ["Bukhari 6407 speaks of remembering one's Lord. What is dhikr?", "Eating slowly", "Playing a game", "Reading a story"] },
  "Remembering Allah keeps the heart alive.": { answer: "True", harder: "By Bukhari 6407, the one who remembers his Lord is like the living." },
  // Jami at-Tirmidhi 3375.
  "What did the man ask for?": { answer: "One deed to hold on to", harder: ["Tirmidhi 3375: 'the acts of Islam have become too many for me.' What did the man ask for?", "A new house", "A long trip", "A big meal"] },
  "What should your tongue be moist with?": { answer: "The remembrance of Allah", harder: ["Tirmidhi 3375: 'let your tongue stay moist with...' what?", "Water only", "Juice", "Jokes"] },
  "Dhikr can only be done in the mosque.": { answer: "False", harder: "By Tirmidhi 3375, the man was told his tongue may be moist with dhikr only inside the masjid." },
  // Sahih al-Bukhari 6464.
  "Which deed does Allah love most?": { answer: "The one done regularly", harder: ["Bukhari 6464: 'the deed most loved by Allah is...' which?", "The one done once", "The one others see", "The biggest one"] },
  "Is a small deed every day a good thing?": { answer: "Yes, Allah loves it", harder: ["Bukhari 6464: the deed done regularly, even if little. Is a small daily deed good?", "No, it is too small", "Only on Fridays", "Only for grown-ups"] },
  "Doing a lot once is better than a little every day.": { answer: "False", harder: "By Bukhari 6464, the deed most loved by Allah is a big one done only once." },
  // Sahih al-Bukhari 2989.
  "What does each joint of the body owe every day?": { answer: "A charity", harder: ["Bukhari 2989: every day the sun rises, each joint owes what?", "A coin to the king", "A long rest", "Nothing at all"] },
  "Which of these counts as a charity?": { answer: "A good word", harder: ["Bukhari 2989: judging fairly, lifting bags, steps to prayer, and what else is charity?", "Skipping prayer", "Breaking a toy", "Shouting at a friend"] },
  "Charity can only be given with money.": { answer: "False", harder: "By Bukhari 2989, only money given to the poor counts as charity." },
  // Sahih al-Bukhari 652.
  "What did the man move off the path?": { answer: "A thorny branch", harder: ["Bukhari 652: walking along a way, what did the man move aside?", "A lost bag", "A big rock", "A sleeping cat"] },
  "What did Allah do for him?": { answer: "Forgave him", harder: ["Bukhari 652: Allah thanked the man for clearing the way and did what?", "Gave him a horse", "Made him a king", "Nothing"] },
  "Clearing a path of harm is a good deed.": { answer: "True", harder: "By Bukhari 652, Allah thanked and forgave the man who moved a thorny branch out of the way." },
  // Sahih al-Bukhari 1417.
  "How small can a charity be?": { answer: "Even half a date", harder: ["Bukhari 1417: 'protect yourselves from the Fire, even by giving...' what?", "At least a gold coin", "A whole sheep", "A house"] },
  "What is a date?": { answer: "A small, sweet fruit", harder: ["Bukhari 1417 mentions half a date in charity. What is a date?", "A day of the week", "A kind of bird", "A big stone"] },
  "A tiny gift given for Allah still counts.": { answer: "True", harder: "By Bukhari 1417, even half a date given in charity protects from the Fire." },
  // Sahih al-Bukhari 6021.
  "What is every good deed?": { answer: "A charity", harder: ["Bukhari 6021: 'every good deed is...' what?", "A game", "A waste of time", "A secret"] },
  "Which could be a charity at home?": { answer: "Helping your mum", harder: ["Bukhari 6021: every good deed is a charity. Which is a charity at home?", "Leaving a mess", "Shouting", "Hiding the remote"] },
  "Only rich people can give charity.": { answer: "False", harder: "By Bukhari 6021, only wealthy people are able to give charity." },
  // Sahih Muslim 2699a.
  "When does Allah help a person?": { answer: "While they help their brother", harder: ["Muslim 2699a: 'Allah helps a servant as long as...' what?", "Never", "Only on Eid", "Only when they are rich"] },
  "What happens when you hide a friend's mistake?": { answer: "Allah hides yours", harder: ["Muslim 2699a: whoever covers a Muslim, what does Allah do?", "Everyone finds out", "You get in trouble", "Nothing"] },
  "Seeking knowledge makes the path to Jannah easy.": { answer: "True", harder: "By Muslim 2699a, whoever takes a path seeking knowledge, Allah makes easy for him a path to Paradise." },
  // Sahih al-Bukhari 5971.
  "How many times did he ﷺ say: your mother?": { answer: "Three times", harder: ["Bukhari 5971: 'who most deserves my good company?' How many times was the mother named?", "Five times", "Once", "Twice"] },
  "Who came next, after the mother?": { answer: "The father", harder: ["Bukhari 5971: after 'your mother' three times, who was named?", "A friend", "A teacher", "A neighbour"] },
  "Being kind to your mother is a big deed in Islam.": { answer: "True", harder: "By Bukhari 5971, the mother was named three times before the father." },
  // Sahih Muslim 2593.
  "What does Allah love?": { answer: "Kindness", harder: ["Muslim 2593: 'Allah is Kind and loves...' what?", "Harshness", "Shouting", "Being rude"] },
  "To whom did he ﷺ say these words?": { answer: "Aishah", harder: ["Muslim 2593: 'O ____, Allah is Kind.' Whom did he ﷺ address?", "Umar", "Fatimah", "Bilal"] },
  "Allah gives more for kindness than for harshness.": { answer: "True", harder: "By Muslim 2593, Allah gives for kindness what He does not give for harshness." },
  // Jami at-Tirmidhi 1924.
  "Who are shown mercy by Ar-Rahman?": { answer: "The merciful", harder: ["Tirmidhi 1924: who are shown mercy by the Most Merciful?", "The loud", "The strong", "The rich"] },
  "What does Ar-Rahman mean?": { answer: "The Most Merciful", harder: ["Tirmidhi 1924: 'shown mercy by Ar-Rahman.' What is the meaning of that name?", "The Strong", "The First", "The King"] },
  "Being merciful to others brings Allah's mercy to you.": { answer: "True", harder: "By Tirmidhi 1924, be merciful to those on earth and the One above the heavens will be merciful to you." },
  // Sahih al-Bukhari 6011.
  "What are believers like, in their love?": { answer: "One body", harder: ["Bukhari 6011: in mercy, love and kindness, the believers are like what?", "A closed door", "Two strangers", "A tall tree"] },
  "What happens when one part of the body hurts?": { answer: "The whole body feels it", harder: ["Bukhari 6011: when one part is unwell, what shares the sleeplessness and fever?", "It is cut off", "Only that part knows", "Nothing at all"] },
  "Muslims should care when another Muslim is hurting.": { answer: "True", harder: "By Bukhari 6011, when one part of the body is unwell the whole body shares its fever." },
  // Sahih al-Bukhari 6136.
  "What should a believer do if they cannot say good?": { answer: "Stay quiet", harder: ["Bukhari 6136: 'should speak good or...' what?", "Say something mean", "Tease someone", "Shout louder"] },
  "How should a believer treat a guest?": { answer: "Generously", harder: ["Bukhari 6136: whoever believes in Allah and the Last Day treats his guest how?", "Rudely", "Ignore them", "Make them wait outside"] },
  "A believer may hurt a neighbour if annoyed.": { answer: "False", harder: "By Bukhari 6136, a believer may hurt his neighbour when the neighbour annoys him." },
  // Sunan Abi Dawud 4833.
  "Whose religion does a person follow, said the Prophet ﷺ?": { answer: "His friend's", harder: ["Abu Dawud 4833: 'a person follows the religion of...' whom?", "His enemy's", "A stranger's", "No one's"] },
  "What should each of us think about?": { answer: "Whom we take as a friend", harder: ["Abu Dawud 4833: 'so let each of you look at...' what?", "What we eat for lunch", "Which game to play", "How fast we can run"] },
  "Our friends do not change us at all.": { answer: "False", harder: "By Abu Dawud 4833, the friends you take have no effect on your religion." },
  // Sunan Abi Dawud 4918.
  "What did he ﷺ say a believer is for another believer?": { answer: "A mirror", harder: ["Abu Dawud 4918: what did he ﷺ say one believer is for another?", "A judge", "A stranger", "A servant"] },
  "What does a believer do for his brother who is away?": { answer: "Protects him", harder: ["Abu Dawud 4918: the believer guards his brother against loss and, when he is away, does what?", "Forgets him", "Talks about him", "Laughs at him"] },
  "A good friend speaks badly of you when you are away.": { answer: "False", harder: "By Abu Dawud 4918, a believer may speak badly of his brother when he is away." },
  // Sunan Abi Dawud 5125.
  "What did he ﷺ tell the man to do?": { answer: "Tell him you love him", harder: ["Abu Dawud 5125: 'I love this man.' 'Have you told him?' What did he ﷺ then say?", "Give him money", "Write him a poem", "Keep it a secret"] },
  "What did the other man answer?": { answer: "May Allah love you too", harder: ["Abu Dawud 5125: told 'I love you for Allah's sake', what did the other man reply?", "Thank you very much", "I do not know you", "Please go away"] },
  "The man loved the other man for Allah's sake.": { answer: "True", harder: "By Abu Dawud 5125, the man said: I love you for Allah's sake." },
  // Sunan Abi Dawud 4844.
  "When may you sit between two people?": { answer: "When they give permission", harder: ["Abu Dawud 4844: 'no one should sit between two people except...' when?", "Whenever you like", "When you are tired", "When you are older"] },
  "Who narrated the manners of sitting between two?": { answer: "Abdullah ibn Amr", harder: ["Abu Dawud 4844: which Companion narrated the rule about sitting between two people?", "Abu Bakr", "Bilal", "Salman"] },
  "Asking before you sit between two people is good manners.": { answer: "True", harder: "By Abu Dawud 4844, no one should sit between two people without their permission." },
  // Sunan Abi Dawud 4798.
  "Whose rank does good character reach?": { answer: "One who prays at night and fasts by day", harder: ["Abu Dawud 4798: by good character a believer reaches whose rank?", "One who travels a lot", "One who is very rich", "One who is very strong"] },
  "What lifts a believer to that high rank?": { answer: "Good character", harder: ["Abu Dawud 4798: what lifts a believer to the rank of one who prays at night and fasts by day?", "Fancy clothes", "Many toys", "A loud voice"] },
  "Good manners are a great deed in Islam.": { answer: "True", harder: "By Abu Dawud 4798, good character can reach the rank of one who prays at night and fasts by day." },
  // Sunan Abi Dawud 2675.
  "What did the people take from the mother bird?": { answer: "Her two young ones", harder: ["Abu Dawud 2675: 'who has upset her?' What had been taken from the mother bird?", "Her long feathers", "Her nest of sticks", "Her food and water"] },
  "What did he ﷺ tell them to do?": { answer: "Give her young back", harder: ["Abu Dawud 2675: the mother bird came spreading her wings. What did he ﷺ command?", "Keep them as pets", "Let them fly away", "Sell them in town"] },
  "He ﷺ said it was fine to burn the ants' home with fire.": { answer: "False", harder: "By Abu Dawud 2675, he ﷺ said burning the ants' village with fire was fine." },
  // Sunan Abi Dawud 2548.
  "What kind of camel did he ﷺ come upon?": { answer: "A very thin camel", harder: ["Abu Dawud 2548: 'fear Allah about these animals that cannot speak.' What did he ﷺ come upon?", "A camel with a calf", "A camel that could talk", "A very fast camel"] },
  "What should we do about animals that cannot speak?": { answer: "Fear Allah in how we treat them", harder: ["Abu Dawud 2548: 'fear Allah about these animals that...' what should we do?", "Leave them in the sun", "Work them all day long", "Keep them hungry"] },
  "Animals should be ridden only when they are fit and strong.": { answer: "True", harder: "By Abu Dawud 2548, ride animals only when they are in good condition." },
  // Sunan Abi Dawud 5101.
  "Why should you never curse the rooster?": { answer: "It wakes people for prayer", harder: ["Abu Dawud 5101: 'do not curse the rooster, for...' why?", "It is very small", "It guards the house", "It sings sweet songs"] },
  "Who heard the Prophet ﷺ say not to curse the rooster?": { answer: "Zayd ibn Khalid", harder: ["Abu Dawud 5101: which Companion narrated 'do not curse the rooster'?", "Abdullah ibn Umar", "Abu Hurairah", "Anas ibn Malik"] },
  "Cursing a rooster is fine if it is noisy.": { answer: "False", harder: "By Abu Dawud 5101, a rooster may be cursed when its noise wakes people." },
  // Jami at-Tirmidhi 92.
  "What did Abu Qatadah do when the cat came?": { answer: "He tilted the vessel for it", harder: ["Tirmidhi 92: Kabshah poured water for wudu and a cat came. What did Abu Qatadah do?", "He chased it away", "He covered the water", "He poured the water out"] },
  "What did the Prophet ﷺ say about cats?": { answer: "They roam around among us", harder: ["Tirmidhi 92: 'it is not impure; it is one of those that...' what?", "They are impure", "They must stay outside", "They bring bad luck"] },
  "A cat makes water impure when it drinks from it.": { answer: "False", harder: "By Tirmidhi 92, water a cat drinks from becomes impure." },
  // Jami at-Tirmidhi 1475.
  "What must never be used as a target?": { answer: "A living thing", harder: ["Tirmidhi 1475: he ﷺ forbade taking anything with a soul as what? Which must never be a target?", "A tree stump", "A wooden board", "A pile of stones"] },
  "Who told the hadith about targets?": { answer: "Ibn Abbas", harder: ["Tirmidhi 1475: which Companion reported the ban on using a living thing as a target?", "Anas ibn Malik", "Salman al-Farsi", "Abu Bakr"] },
  "Using a bird as a target for fun is allowed.": { answer: "False", harder: "By Tirmidhi 1475, a bird may be used as a target if it is only for fun." },
  // Sunan Abi Dawud 2567.
  "What should you not treat an animal's back like?": { answer: "A pulpit to sit and talk on", harder: ["Abu Dawud 2567: 'do not treat the backs of your animals as...' what?", "A table to eat on", "A shelf for books", "A bed to sleep on"] },
  "Why did Allah make animals serve us, he ﷺ said?": { answer: "To carry us far", harder: ["Abu Dawud 2567: Allah made animals serve you only for what?", "To stand all day", "To win races", "To show off"] },
  "You should get down and do your talking on the ground.": { answer: "True", harder: "By Abu Dawud 2567, Allah made the earth for you, so do your business on it." },
  // Sahih al-Bukhari 6247.
  "Whom did Anas greet as he passed by?": { answer: "A group of boys", harder: ["Bukhari 6247: passing by, whom did Anas greet with salam?", "A group of kings", "A herd of camels", "A crowd of soldiers"] },
  "Why did Anas say salam to the boys?": { answer: "The Prophet ﷺ used to do so", harder: ["Bukhari 6247: Anas greeted the boys, then gave what reason?", "He wanted their sweets", "He had lost his way", "They called him first"] },
  "Saying salam to children is part of the Sunnah.": { answer: "True", harder: "By Bukhari 6247, Anas greeted boys with salam and said the Prophet ﷺ used to do so." },
  // Sunan Abi Dawud 5003.
  "If you took your brother's stick, what must you do?": { answer: "Give it back", harder: ["Abu Dawud 5003: 'not as a joke and not for real.' If you took your brother's stick?", "Hide it well", "Break it in two", "Keep it forever"] },
  "Who told the hadith about not taking things as a joke?": { answer: "Abdullah ibn as-Sa'ib", harder: ["Abu Dawud 5003: who narrated 'not as a joke and not for real'?", "Abu Hurairah", "Anas ibn Malik", "Aishah"] },
  "Taking a friend's things as a joke is fine.": { answer: "False", harder: "By Abu Dawud 5003, taking your brother's things is fine if it is only a joke." },
  // Sunan Abi Dawud 5004.
  "What did one traveller take from his sleeping friend?": { answer: "His rope", harder: ["Abu Dawud 5004: while one traveller slept, what did another take?", "His shoes", "His water", "His food"] },
  "How did the sleeping man feel when he woke?": { answer: "He woke up scared", harder: ["Abu Dawud 5004: his rope was taken. How did the sleeper wake?", "He woke up happy", "He woke up hungry", "He woke up laughing"] },
  "Scaring a Muslim for fun is a good joke.": { answer: "False", harder: "By Abu Dawud 5004, frightening a sleeping Muslim by taking his rope is a harmless joke." },
  // Sunan Abi Dawud 4982.
  "What should you say when you trip, he ﷺ said?": { answer: "Bismillah", harder: ["Abu Dawud 4982: the animal stumbled. Instead of 'may Shaytan perish', say what?", "May Shaytan perish", "Oh no, oh no", "Nothing at all"] },
  "How small does Shaytan get when you say Bismillah?": { answer: "As small as a fly", harder: ["Abu Dawud 4982: after Bismillah, Shaytan shrinks until he is how small?", "As small as a house", "As small as a camel", "As small as a cat"] },
  "Cursing Shaytan makes him small and weak.": { answer: "False", harder: "By Abu Dawud 4982, saying 'may Shaytan perish' makes him shrink as small as a fly." },
  // Sunan Abi Dawud 5029.
  "What did he ﷺ put over his mouth when he sneezed?": { answer: "His hand or his cloth", harder: ["Abu Dawud 5029: Abu Hurairah said that when he ﷺ sneezed he covered his mouth with what?", "A cup of water", "Nothing at all", "A big leaf"] },
  "How loud did he ﷺ let his sneeze be?": { answer: "Low and quiet", harder: ["Abu Dawud 5029: covering his mouth, how did he ﷺ keep the sound?", "Loud like thunder", "As loud as he could", "Loud like a horn"] },
  "Covering your mouth when you sneeze is a Sunnah.": { answer: "True", harder: "By Abu Dawud 5029, he ﷺ covered his mouth and kept the sound low when he sneezed." },
  // Sunan Abi Dawud 4992.
  "What is telling everything you hear, he ﷺ said?": { answer: "Enough of a lie", harder: ["Abu Dawud 4992: what is it for a man to tell everything he hears?", "Very smart", "Very kind", "Very brave"] },
  "Why should you not pass on everything you hear?": { answer: "Some of it is false", harder: ["Abu Dawud 4992: telling all you hear is enough of a lie. Why?", "Nobody listens anyway", "Secrets are boring", "Talking is tiring"] },
  "Everything people say is always true.": { answer: "False", harder: "By Abu Dawud 4992, it is good to tell people everything you hear." },
  // Jami at-Tirmidhi 1957.
  "What reward is it to show a lost person the way?": { answer: "Like freeing a slave", harder: ["Tirmidhi 1957: guiding someone through a narrow lane earns a reward like what?", "Like winning a race", "Like buying a toy", "Like eating a meal"] },
  "Which of these did he ﷺ say brings that reward?": { answer: "Giving milk or silver", harder: ["Tirmidhi 1957: besides guiding someone, what else earns the reward of freeing a slave?", "Running ahead alone", "Keeping all your toys", "Hiding your snacks"] },
  "Helping someone find their way is a good deed.": { answer: "True", harder: "By Tirmidhi 1957, guiding someone through a narrow lane has a reward like freeing a slave." },
  // Sunan Abi Dawud 4818.
  "Where did he ﷺ tell the woman to sit?": { answer: "Any street corner she liked", harder: ["Abu Dawud 4818: 'mother of so-and-so, sit in...' where?", "Only at his house", "Far outside the city", "On top of a hill"] },
  "How long did he ﷺ stay with her?": { answer: "Until she had what she needed", harder: ["Abu Dawud 4818: he ﷺ sat with her in the street. Until when?", "Just one minute", "Until it got dark", "Only until lunch"] },
  "He ﷺ made time for a woman who needed help.": { answer: "True", harder: "By Abu Dawud 4818, he ﷺ sat with the woman in the street until she had what she needed." },
  // Sahih al-Bukhari 6034.
  "What did he ﷺ never say when asked for something?": { answer: "No", harder: ["Bukhari 6034: Jabir said he ﷺ was never asked for anything and answered what?", "Yes", "Thank you", "Bismillah"] },
  "A friend asks to borrow your pencil. What follows his ﷺ way?": { answer: "Give it to your friend", harder: ["Bukhari 6034: he ﷺ never said no when asked. A friend asks for your pencil?", "Pretend you have none", "Say no and walk away", "Hide it in your bag"] },
  "He ﷺ was very generous with what people asked for.": { answer: "True", harder: "By Bukhari 6034, Jabir said the Prophet ﷺ never answered 'no' when asked for something." },
  // Sahih al-Bukhari 458.
  "What job did the masjid helper do?": { answer: "Swept the masjid", harder: ["Bukhari 458: 'why did you not inform me?' What did the one who died used to do?", "Sold dates outside", "Called the adhan", "Led the prayer"] },
  "What did he ﷺ ask to be shown?": { answer: "The helper's grave", harder: ["Bukhari 458: the masjid sweeper had died. What did he ﷺ ask to see?", "The helper's broom", "The helper's house", "The helper's family"] },
  "To him ﷺ, even the masjid helper was important.": { answer: "True", harder: "By Bukhari 458, he ﷺ prayed the funeral prayer at the grave of the one who swept the masjid." },
  // Jami at-Tirmidhi 2670.
  "What did the man come to the Prophet ﷺ for?": { answer: "Something to ride", harder: ["Tirmidhi 2670: the man was sent to another who helped him. What did he come asking for?", "A new house", "A warm coat", "A bag of gold"] },
  "Whoever leads someone to good is like whom, he ﷺ said?": { answer: "The one who does it", harder: ["Tirmidhi 2670: 'whoever leads to good is like...' whom?", "The one who forgets it", "The one who hides it", "The one who ignores it"] },
  "Sending someone to a person who can help is a good deed.": { answer: "True", harder: "By Tirmidhi 2670, the one who leads to good is like the one who does it." },
  // Sahih al-Bukhari 2896.
  "Because of whom are we helped and given food, he ﷺ said?": { answer: "The poor among us", harder: ["Bukhari 2896: Sa'd thought he was above others. Because of whom are we helped and fed?", "The strongest people", "The loudest people", "The richest people"] },
  "What did he ﷺ teach about people who have less?": { answer: "They bring help to us", harder: ["Bukhari 2896: 'you are only helped and given provision because of the poor.' What does that teach?", "They slow us down", "They are not important", "They should stay away"] },
  "Being rich makes you better than a poor person.": { answer: "False", harder: "By Bukhari 2896, Sa'd was told he was above those poorer than him." },
  // Sahih al-Bukhari 3533.
  "What name did Quraysh use to insult him ﷺ?": { answer: "Mudhammam", harder: ["Bukhari 3533: 'they insult Mudhammam, while I am Muhammad.' Which name did Quraysh insult?", "Muhammad", "Ahmad", "Al-Amin"] },
  "Who kept the bad words away from his ﷺ name?": { answer: "Allah", harder: ["Bukhari 3533: 'how Allah keeps the insults of Quraysh away from me.' Who keeps them away?", "The Romans", "The Persians", "The poets"] },
  "The bad words of Quraysh did not fall on his ﷺ name, Muhammad.": { answer: "True", harder: "By Bukhari 3533, Quraysh insulted 'Mudhammam' while he ﷺ is Muhammad." },
  // Sahih al-Bukhari 6191.
  "Where did he ﷺ place the newborn baby?": { answer: "On his thigh", harder: ["Bukhari 6191: Al-Mundhir, son of Abu Usaid, was brought to him ﷺ. Where did he place him?", "On a cushion", "In a cradle", "In a basket"] },
  "What name did he ﷺ give the baby?": { answer: "Al-Mundhir", harder: ["Bukhari 6191: 'no, his name is...' what?", "Al-Qasim", "Abdullah", "Ibrahim"] },
  "He ﷺ asked after the baby when he had finished his work.": { answer: "True", harder: "By Bukhari 6191, after he ﷺ finished his work he asked: where is the boy?" },
  // Sahih al-Bukhari 5467.
  "What name did he ﷺ give Abu Musa's son?": { answer: "Ibrahim", harder: ["Bukhari 5467: Abu Musa's eldest son was named by him ﷺ. What name?", "Yusuf", "Dawud", "Musa"] },
  "What did he ﷺ put in the baby's mouth?": { answer: "A little soft date", harder: ["Bukhari 5467: naming baby Ibrahim, what did he ﷺ give him a taste of?", "A piece of bread", "A drop of honey", "A sip of milk"] },
  "He ﷺ asked Allah to bless the baby.": { answer: "True", harder: "By Bukhari 5467, he ﷺ named the baby Ibrahim and asked Allah to bless him." },
  // Sunan Abi Dawud 4954.
  "What did he ﷺ ask the man first?": { answer: "What his name was", harder: ["Abu Dawud 4954: when Asram came, what did he ﷺ ask him first?", "Where he came from", "How old he was", "What he had brought"] },
  "What new name did he ﷺ give him?": { answer: "Zur'ah", harder: ["Abu Dawud 4954: 'no, you are...' what?", "Asram", "Hazn", "Harb"] },
  "He ﷺ changed the man's name from Asram to Zur'ah.": { answer: "True", harder: "By Abu Dawud 4954, he ﷺ told the man called Asram: no, you are Zur'ah." },
  // Sahih al-Bukhari 6190.
  "What new name did he ﷺ offer Hazn?": { answer: "Sahl", harder: ["Bukhari 6190: 'you are ____,' he ﷺ told Hazn. What name?", "Al-Mundhir", "Zur'ah", "Asram"] },
  "What did Hazn say about changing his name?": { answer: "He would keep his father's name", harder: ["Bukhari 6190: offered the name Sahl, how did Hazn answer?", "He loved the new name", "He would think about it", "He asked for another"] },
  "Hazn happily took the new name Sahl.": { answer: "False", harder: "By Bukhari 6190, Hazn gladly took the name Sahl." },
  // Sunan Abi Dawud 4955.
  "Al-Hakam, the Judge, is a name of whom?": { answer: "Allah", harder: ["Abu Dawud 4955: 'judgment is His.' Whose name is Al-Hakam?", "The poets", "Hani's people", "The kings"] },
  "What new name did he ﷺ give Hani?": { answer: "Abu Shurayh", harder: ["Abu Dawud 4955: Shurayh was Hani's eldest. What did he ﷺ call Hani?", "Abu Muslim", "Abu Abdullah", "Abul-Hakam"] },
  "He ﷺ praised Hani for making peace between his people.": { answer: "True", harder: "By Abu Dawud 4955, he ﷺ said 'how good this is!' when Hani judged between his people." },
  // Sahih al-Bukhari 3561.
  "What did Anas compare his ﷺ hand to?": { answer: "Silk", harder: ["Bukhari 3561: Anas never touched anything, thin or thick, softer than his ﷺ palm. What?", "Wool", "Cotton", "Leather"] },
  "What did Anas say about his ﷺ scent?": { answer: "It was the nicest he ever smelled", harder: ["Bukhari 3561: what did Anas say about the scent of the Prophet ﷺ?", "It was like the desert wind", "It was like fresh bread", "It was like the sea"] },
  "Even silk was not as soft as his ﷺ hand, Anas said.": { answer: "True", harder: "By Bukhari 3561, Anas never touched silk softer than the palm of the Prophet ﷺ." },
  // Sahih al-Bukhari 3567.
  "How did he ﷺ speak?": { answer: "Slowly and clearly", harder: ["Bukhari 3567: anyone who wanted could count his ﷺ words. How did he speak?", "In many languages", "In long rhymes", "In a whisper"] },
  "What could a person count when he ﷺ spoke?": { answer: "His ﷺ words", harder: ["Bukhari 3567: Aishah said he ﷺ spoke so that one could count what?", "The stars", "His steps", "The people"] },
  "He ﷺ never rushed his words or spoke unclearly.": { answer: "True", harder: "By Bukhari 3567, Aishah said he ﷺ never spoke quickly and unclearly." },
  // Sahih al-Bukhari 3149.
  "What did he ﷺ do when the man pulled his cloak?": { answer: "He smiled and gave him a gift", harder: ["Bukhari 3149: the bedouin pulled the Najran cloak hard. How did he ﷺ respond?", "He gave the cloak to Anas", "He sat down to rest", "He asked for some water"] },
  "What did the pull leave on his ﷺ shoulder?": { answer: "A mark from the cloak", harder: ["Bukhari 3149: Anas saw what on his ﷺ shoulder after the pull?", "A drop of water", "Some sand from the road", "A small leaf"] },
  "He ﷺ was gentle even with a rough man.": { answer: "True", harder: "By Bukhari 3149, he ﷺ smiled at the bedouin who pulled his cloak and ordered a gift for him." },
  // Sahih al-Bukhari 2599.
  "What did he ﷺ say when he came out to Makhramah?": { answer: "We kept this for you", harder: ["Bukhari 2599: coming out wearing one of the cloaks, what did he ﷺ tell Makhramah?", "Come and eat with us", "Let us go to the masjid", "Bring me some water"] },
  "How did Makhramah feel about the cloak?": { answer: "He was pleased", harder: ["Bukhari 2599: Makhramah looked at the cloak. How did he feel?", "He was worried", "He was sleepy", "He was hungry"] },
  "He ﷺ remembered Makhramah and kept a cloak for him.": { answer: "True", harder: "By Bukhari 2599, he ﷺ kept a cloak for Makhramah when the cloaks were shared out." },
  // Sahih al-Bukhari 2611.
  "Who sold the camel to him ﷺ?": { answer: "Umar", harder: ["Bukhari 2611: the camel Ibn Umar rode was hard to control. Who sold it to him ﷺ?", "Uthman", "Bilal ibn Rabah", "Abu Bakr"] },
  "What did he ﷺ say to Abdullah after buying it?": { answer: "The camel is yours", harder: ["Bukhari 2611: after buying the camel, what did he ﷺ say to Abdullah?", "Ride it to Makkah", "Feed it well", "Sell it again"] },
  "He ﷺ gave the camel to Abdullah ibn Umar as a gift.": { answer: "True", harder: "By Bukhari 2611, he ﷺ bought the camel from Umar and gave it to Abdullah." },
  // Sahih al-Bukhari 2573.
  "What did he ﷺ see on the giver's face?": { answer: "Sadness", harder: ["Bukhari 2573: the wild donkey was not accepted. What did he ﷺ see on the giver's face?", "A big smile", "Dust from the road", "Sleepiness"] },
  "Why could he ﷺ not take the gift?": { answer: "He was in ihram", harder: ["Bukhari 2573: 'we have not refused your gift, but...' why?", "He wanted it for the poor", "He was fasting that day", "He had eaten already"] },
  "He ﷺ cared about the feelings of the man who gave the gift.": { answer: "True", harder: "By Bukhari 2573, seeing the giver's sadness, he ﷺ explained why he could not accept the gift." },
  // Sahih al-Bukhari 5411.
  "How many dates did each companion get?": { answer: "Seven", harder: ["Bukhari 5411: sharing out dates, how many did he ﷺ give each companion?", "Ten", "One", "Two"] },
  "Which date did Abu Hurairah like the most?": { answer: "The hard one", harder: ["Bukhari 5411: one of Abu Hurairah's seven dates took long to chew. Which did he love most?", "The softest one", "The largest one", "The sweetest one"] },
  "Abu Hurairah was happy with the hard date.": { answer: "True", harder: "By Bukhari 5411, no date was dearer to Abu Hurairah than the hard one." },
  // Sahih al-Bukhari 5446.
  "What did Ibn Umar tell people not to do?": { answer: "Eat two dates at once", harder: ["Bukhari 5446: in the famine of Ibn az-Zubair's time, what did Ibn Umar forbid?", "Eat with the right hand", "Say Bismillah first", "Share the dates"] },
  "When is it fine to take two dates at once?": { answer: "When your friends agree", harder: ["Bukhari 5446: 'unless a person first asks...' When is taking two at once fine?", "When no one is looking", "When you are very hungry", "When you are the oldest"] },
  "Good table manners mean thinking of others too.": { answer: "True", harder: "By Bukhari 5446, a person may take two dates at once only after asking his companions." },
  // Jami at-Tirmidhi 1805.
  "Where does the blessing come down in the food?": { answer: "To the middle", harder: ["Tirmidhi 1805: 'the blessing comes down to...' which part of the food?", "To the cup", "To the edges", "To the water jug"] },
  "Where should we eat from, he ﷺ said?": { answer: "The edges of the food", harder: ["Tirmidhi 1805: the blessing comes down to the middle. So eat from where?", "The middle of the dish", "The biggest piece", "Someone else's side"] },
  "Eating from the edges of the food follows the Sunnah.": { answer: "True", harder: "By Tirmidhi 1805, eat from the edges of the food and not from its middle." },
  // Sahih al-Bukhari 5434.
  "How many guests did Abu Shu'aib invite?": { answer: "Five guests", harder: ["Bukhari 5434: 'the Messenger of Allah ﷺ and four others.' How many guests in all?", "Two guests", "Ten guests", "Twenty guests"] },
  "What did he ﷺ do when another man followed them?": { answer: "He asked the host", harder: ["Bukhari 5434: 'if you wish, you may let him in.' What did he ﷺ do about the extra man?", "He brought more food", "He waited outside", "He picked a seat"] },
  "The host said yes, and the extra man came in.": { answer: "True", harder: "By Bukhari 5434, the host said: I let him in." },
  // Sahih al-Bukhari 5413.
  "How did they clean the barley, with no sieve?": { answer: "They blew off the husk", harder: ["Bukhari 5413: with no sieve, how did they clean the ground barley?", "They washed it in milk", "They baked it twice", "They gave it away"] },
  "What did he ﷺ never see, Sahl said?": { answer: "White flour", harder: ["Bukhari 5413: from the time Allah sent him until He took him, what did he ﷺ never see?", "Dates", "Milk", "Barley"] },
  "He ﷺ and his companions lived a simple life.": { answer: "True", harder: "By Bukhari 5413, he ﷺ never saw white flour or a sieve in all his years as a Prophet." },
  // Sahih al-Bukhari 5386.
  "What did he ﷺ never eat at, Anas said?": { answer: "A dining table", harder: ["Bukhari 5386: no big tray, no thin bread, and he ﷺ never ate at what?", "The tailor's house", "A friend's house", "His own home"] },
  "What kind of bread did he ﷺ not eat?": { answer: "Thin, soft bread", harder: ["Bukhari 5386: Anas said he ﷺ never ate which kind of bread?", "Any bread at all", "Bread with vinegar", "Barley bread"] },
  "He ﷺ kept his meals plain and simple.": { answer: "True", harder: "By Bukhari 5386, he ﷺ never ate from a big tray or at a dining table." },
  // Sahih al-Bukhari 3639.
  "What lit the way for the two companions?": { answer: "Two lights like lamps", harder: ["Bukhari 3639: on a very dark night, what went with the two companions?", "A torch they carried", "The full moon", "A big fire"] },
  "What happened when the two men parted?": { answer: "Each one kept one light", harder: ["Bukhari 3639: when the two men went separate ways, what happened to the lights?", "Both lights went out", "The lights flew away", "They lost their way"] },
  "The night was very dark when they walked home.": { answer: "True", harder: "By Bukhari 3639, two lights like lamps lit the way for the two companions on a dark night." },
  // Sahih al-Bukhari 3578.
  "What did Umm Sulaym send to the Prophet ﷺ?": { answer: "Loaves of barley bread", harder: ["Bukhari 3578: Abu Talhah heard hunger in his ﷺ voice. What did Umm Sulaym send?", "A bowl of milk", "A basket of figs", "A pot of honey"] },
  "How many men came in to eat at a time?": { answer: "Ten at a time", harder: ["Bukhari 3578: 'let ten come in.' How did the people come in to eat?", "Two at a time", "Fifty at a time", "All at once"] },
  "Everyone there ate until they were full.": { answer: "True", harder: "By Bukhari 3578, each group of ten ate its fill and went out." },
  // Sahih al-Bukhari 2484.
  "Where was all the food put together?": { answer: "On one leather sheet", harder: ["Bukhari 2484: food ran low on the journey. Where was all the food heaped?", "In a deep well", "On a tall rock", "In a big tent"] },
  "What did he ﷺ do before the people took the food?": { answer: "Asked Allah to bless it", harder: ["Bukhari 2484: the leather sheet was spread. What did he ﷺ do before people took from it?", "Counted every piece", "Sent for more food", "Hid some of it away"] },
  "There was not enough food for everyone.": { answer: "False", harder: "By Bukhari 2484, the food on the leather sheet ran out before everyone had enough." },
  // Sahih al-Bukhari 5670.
  "Who took As-Sa'ib to the Prophet ﷺ?": { answer: "His aunt", harder: ["Bukhari 5670: 'my nephew is ill.' Who brought As-Sa'ib?", "His teacher", "His big brother", "His neighbor"] },
  "What did he ﷺ ask Allah for the sick boy?": { answer: "To bless him", harder: ["Bukhari 5670: touching the sick boy's head, what did he ﷺ ask Allah?", "To make him tall", "To make him rich", "To make him a king"] },
  "As-Sa'ib saw the seal of prophethood between his ﷺ shoulders.": { answer: "True", harder: "By Bukhari 5670, As-Sa'ib saw the seal of prophethood, like the button of a tent." },
  // Sahih al-Bukhari 2501.
  "Why did he ﷺ not take the boy's pledge?": { answer: "He was still too young", harder: ["Bukhari 2501: Zaynab bint Humayd asked for her son's pledge. Why was it not taken?", "He was too far away", "He came too late", "He was very ill"] },
  "What did Ibn Umar and Ibn az-Zubayr ask him?": { answer: "To be their partner", harder: ["Bukhari 2501: in the market, what did Ibn Umar and Ibn az-Zubayr ask of Abdullah ibn Hisham?", "To lead the prayer", "To teach them to read", "To lend them a camel"] },
  "The boy's trade was often blessed when he grew up.": { answer: "True", harder: "By Bukhari 2501, Ibn Umar and Ibn az-Zubayr wanted to be his partners because he ﷺ had asked Allah to bless him." },
  // Sahih al-Bukhari 4206.
  "Where was Salamah's leg hurt?": { answer: "At Khaybar", harder: ["Bukhari 4206: 'O Abu Muslim, what is this wound?' On which day was Salamah hurt?", "At Badr", "At Uhud", "At the Trench"] },
  "What did he ﷺ do to the wound?": { answer: "Blew on it three times", harder: ["Bukhari 4206: Salamah went to him ﷺ with the wound. What did he do?", "Washed it in the sea", "Put honey on it", "Tied it with cloth"] },
  "Salamah's leg still hurt him for many years.": { answer: "False", harder: "By Bukhari 4206, the pain in Salamah's leg stayed with him for years after Khaybar." },
  // Sahih al-Bukhari 77.
  "How old was Mahmud then?": { answer: "Five years old", harder: ["Bukhari 77: Mahmud ibn ar-Rabi' remembered it from when he was how old?", "Fifteen years old", "Ten years old", "Twenty years old"] },
  "What did he ﷺ spray on Mahmud's face?": { answer: "Water from a bucket", harder: ["Bukhari 77: he ﷺ took water with his mouth. From what, sprayed on Mahmud's face?", "Milk from a cup", "Rain from the sky", "Sand from the ground"] },
  "Mahmud still remembered it, though he was only five.": { answer: "True", harder: "By Bukhari 77, Mahmud remembered being sprayed with water when he was five." },
  // Sahih al-Bukhari 1858.
  "How old was As-Sa'ib on that Hajj?": { answer: "Seven years old", harder: ["Bukhari 1858: As-Sa'ib ibn Yazid went on Hajj as a boy of what age?", "Thirty years old", "Seventeen years old", "Twelve years old"] },
  "Who did young As-Sa'ib go on Hajj with?": { answer: "The Messenger of Allah ﷺ", harder: ["Bukhari 1858: 'I was taken on Hajj with...' whom?", "His teacher only", "A king's army", "A group of traders"] },
  "Children went on Hajj with him ﷺ too.": { answer: "True", harder: "By Bukhari 1858, As-Sa'ib went on Hajj with the Messenger of Allah ﷺ when he was seven." },
  // Sahih al-Bukhari 4427.
  "Who went out with As-Sa'ib to welcome him ﷺ?": { answer: "The other boys", harder: ["Bukhari 4427: As-Sa'ib went out to welcome him ﷺ with whom?", "The old men only", "A few soldiers", "A few traders"] },
  "Where did the boys meet him ﷺ?": { answer: "Thaniyyat al-Wada'", harder: ["Bukhari 4427: back from Tabuk, at which place did the boys welcome him ﷺ?", "The valley of Mina", "Mount Uhud", "The masjid of Quba'"] },
  "He ﷺ was coming back from Tabuk.": { answer: "True", harder: "By Bukhari 4427, the boys welcomed him ﷺ at Thaniyyat al-Wada' on his return from Tabuk." },
  // Sunan Abi Dawud 4773.
  "What did Anas find on the way?": { answer: "Boys playing in the street", harder: ["Abu Dawud 4773: sent on an errand, whom did Anas come upon?", "A heavy rain", "A lost camel", "A big market"] },
  "How did he ﷺ look when Anas turned around?": { answer: "Laughing kindly", harder: ["Abu Dawud 4773: taking Anas by the back of the neck, how was he ﷺ?", "Tired and sleepy", "Crying sadly", "Frowning and angry"] },
  "He ﷺ scolded Anas for stopping to watch the boys.": { answer: "False", harder: "By Abu Dawud 4773, he ﷺ was angry with Anas for stopping by the boys." },
  // Sahih al-Bukhari 380.
  "Who lined up with Anas behind him ﷺ?": { answer: "An orphan boy", harder: ["Bukhari 380: at Mulaykah's meal, who lined up with Anas behind him ﷺ?", "A rich trader", "A tribal chief", "A tall soldier"] },
  "What did Anas do for him ﷺ to pray on?": { answer: "He washed an old mat", harder: ["Bukhari 380: 'stand up, I will lead you.' What did Anas wash for the prayer?", "He swept the street", "He built a new wall", "He brought a soft rug"] },
  "The old lady stood behind the two boys.": { answer: "True", harder: "By Bukhari 380, the old lady stood behind Anas and the orphan." },
  // Sahih Muslim 2329.
  "What did he ﷺ do when the children met him?": { answer: "Patted each one's cheek", harder: ["Muslim 2329: some children met him ﷺ on the way home. What did he do?", "Walked past them", "Sent them home", "Gave them a test"] },
  "What was his ﷺ hand like, Jabir said?": { answer: "As if from a perfume bag", harder: ["Muslim 2329: Jabir felt coolness or fragrance in his ﷺ hand. Like what?", "Rough like a rock", "Hot like the sun", "Wet like the rain"] },
  "He ﷺ left some of the children out.": { answer: "False", harder: "By Muslim 2329, he ﷺ patted the cheeks of only some of the children." },
  // Jami at-Tirmidhi 2822.
  "When someone asks you for advice, what are you given?": { answer: "A trust", harder: ["Tirmidhi 2822: 'the one whose advice is asked for is...' what?", "A prize", "A secret code", "A test paper"] },
  "A friend asks which choice is best. What do you do?": { answer: "Give honest, careful advice", harder: ["Tirmidhi 2822: the one asked for advice is trusted. A friend asks which choice is best?", "Say anything quickly", "Laugh at the question", "Tell others his problem"] },
  "Giving bad advice on purpose breaks a trust.": { answer: "True", harder: "By Tirmidhi 2822, the one whose advice is asked for is trusted with it." },
  // Jami at-Tirmidhi 2627.
  "Whom do people trust with their lives and wealth?": { answer: "The believer", harder: ["Tirmidhi 2627: the Muslim is the one others are safe from. Whom do people trust with lives and wealth?", "The loudest man", "The strongest man", "The richest man"] },
  "Your friend leaves his bag with you. What do you do?": { answer: "Keep it safe and give it back", harder: ["Tirmidhi 2627: people trust the believer with their wealth. Your friend leaves his bag with you?", "Look through it", "Use what is inside", "Leave it anywhere"] },
  "A believer keeps safe what people leave with him.": { answer: "True", harder: "By Tirmidhi 2627, the believer is the one people trust with their lives and their wealth." },
  // Sahih al-Bukhari 2387.
  "What should you mean to do when you borrow?": { answer: "Pay it back", harder: ["Bukhari 2387: Allah pays back for the one who takes money meaning to do what?", "Keep it forever", "Lose it somewhere", "Give it away"] },
  "Who helps the one who means to repay?": { answer: "Allah", harder: ["Bukhari 2387: whoever borrows meaning to repay, who pays it back for him?", "The shop owner", "A rich friend", "Good luck"] },
  "Borrowing with no plan to give it back is fine.": { answer: "False", harder: "By Bukhari 2387, borrowing with no plan to repay is fine, since Allah will pay it back." },
  // Sahih al-Bukhari 2400.
  "One who can pay back but delays is doing what?": { answer: "Wrongdoing", harder: ["Bukhari 2400: one with the means who delays paying what he owes. What is that?", "A kindness", "A clever thing", "A good deed"] },
  "You borrowed a book and finished it. What now?": { answer: "Give it back soon", harder: ["Bukhari 2400: delaying when you can pay is wrongdoing. You finished a borrowed book?", "Wait until they ask twice", "Lend it to someone else", "Keep it a while more"] },
  "Making someone wait for what you owe, when you can pay, is fine.": { answer: "False", harder: "By Bukhari 2400, it is fine to delay paying what you owe when you have the means." },
  // Sunan an-Nasa'i 4683.
  "What is the reward for lending, he ﷺ said?": { answer: "Thanks and being paid back", harder: ["Nasa'i 4683: 'the reward for a loan is...' what?", "Extra money", "A big feast", "A new house"] },
  "What did he ﷺ say as he paid the man back?": { answer: "May Allah bless your family and wealth", harder: ["Nasa'i 4683: repaying the forty thousand, what du'a did he ﷺ make?", "Do not lend again", "Now we are even", "Count it twice"] },
  "He ﷺ paid back what he had borrowed.": { answer: "True", harder: "By Nasa'i 4683, he ﷺ paid back the forty thousand he had borrowed." },
  // Sunan Abi Dawud 3336.
  "What did he ﷺ tell the man who was weighing?": { answer: "Weigh, and give a little more", harder: ["Abu Dawud 3336: to the man weighing out payment, what did he ﷺ say?", "Do not weigh at all", "Weigh it only once", "Weigh, and keep some back"] },
  "What did he ﷺ buy from Suwayd and Makhrafah?": { answer: "Trousers", harder: ["Abu Dawud 3336: bargaining with the clothes sellers from Hajar, what did he ﷺ buy?", "Perfume", "Dates", "A camel"] },
  "When paying someone, giving a little less than you owe is fine.": { answer: "False", harder: "By Abu Dawud 3336, he ﷺ told the man to weigh out a little less than what was owed." },
  // Sunan Abi Dawud 3871.
  "What did the doctor want to put in his medicine?": { answer: "Frogs", harder: ["Abu Dawud 3871: a doctor asked about putting what in medicine?", "Beetles", "Snails", "Lizards"] },
  "What did he ﷺ say about the frogs?": { answer: "They must not be killed", harder: ["Abu Dawud 3871: asked about frogs in medicine, what did he ﷺ rule?", "They may be caught for fun", "They are good for medicine", "They should be chased away"] },
  "Frogs are among the animals he ﷺ said not to kill.": { answer: "True", harder: "By Abu Dawud 3871, he ﷺ forbade the doctor from killing frogs." },
  // Sunan Ibn Majah 2304.
  "What did he ﷺ tell Umm Hani to keep?": { answer: "Sheep", harder: ["Ibn Majah 2304: 'keep ____, for in them is blessing.'", "Wolves", "Bears", "Snakes"] },
  "What did he ﷺ say is in sheep?": { answer: "Blessing", harder: ["Ibn Majah 2304: he ﷺ told Umm Hani to keep sheep. What is in them?", "Sorrow", "Trouble", "Danger"] },
  "He ﷺ said there is blessing in keeping sheep.": { answer: "True", harder: "By Ibn Majah 2304, he ﷺ told Umm Hani: keep sheep, for in them is blessing." },
  // Sahih al-Bukhari 2849.
  "Which animals did he ﷺ say have good in their foreheads?": { answer: "Horses", harder: ["Bukhari 2849: 'good will remain in the foreheads of...' which animal?", "Donkeys", "Cows", "Goats"] },
  "Until when will the good stay in them?": { answer: "The Day of Resurrection", harder: ["Bukhari 2849: good remains in the foreheads of horses until when?", "The day they grow old", "The end of summer", "The next full moon"] },
  "The good in horses will end very soon.": { answer: "False", harder: "By Bukhari 2849, the good in the foreheads of horses will end before the Day of Resurrection." },
  // Sahih al-Bukhari 2853.
  "What will the owner be rewarded for?": { answer: "What the horse eats and drinks", harder: ["Bukhari 2853: for a horse kept in Allah's cause, the owner is rewarded for what?", "How much the horse costs", "How fast the horse runs", "How tall the horse grows"] },
  "Why does the owner keep the horse?": { answer: "To serve Allah's cause", harder: ["Bukhari 2853: out of faith and belief in His promise, why is the horse kept?", "To win prizes at races", "To show off to others", "To sell it for money"] },
  "Looking after a horse kept for Allah brings reward.": { answer: "True", harder: "By Bukhari 2853, the owner is rewarded for what his horse kept in Allah's cause eats and drinks." },
  // Sahih al-Bukhari 2435.
  "What must you have before milking someone's animal?": { answer: "The owner's permission", harder: ["Bukhari 2435: an animal should not be milked without what?", "A sunny day", "A clean bucket", "A friend to help"] },
  "What did he ﷺ compare an animal's udder to?": { answer: "The owner's food store", harder: ["Bukhari 2435: 'would you like someone to break his container?' Udders are like what?", "A river of milk", "A gift for anyone", "A public well"] },
  "Milking a neighbor's animal without asking is fine.": { answer: "False", harder: "By Bukhari 2435, you may milk a neighbor's animal without asking, since milk is shared by all." },
  // Sunan Abi Dawud 2572.
  "Who has more right to ride in front on an animal?": { answer: "Its owner", harder: ["Abu Dawud 2572: 'unless you give that right to me.' Who has more right to ride in front?", "The first to arrive", "The oldest rider", "The tallest rider"] },
  "What did the man do when he offered the ride?": { answer: "Moved to the back", harder: ["Abu Dawud 2572: 'Messenger of Allah, ride.' What did the man with the donkey do?", "Got off and walked", "Ran away fast", "Sat on the side"] },
  "The owner can give his front seat to someone else.": { answer: "True", harder: "By Abu Dawud 2572, the owner said 'I give it to you', and he ﷺ rode in front." },
  // Jami at-Tirmidhi 2685.
  "Which tiny creature in its hole prays for the teacher of good?": { answer: "The ant", harder: ["Tirmidhi 2685: even which creature in its hole sends blessings on the teacher of good?", "The cat", "The bird", "The bee"] },
  "Who did he ﷺ say is above the worshipper?": { answer: "The scholar", harder: ["Tirmidhi 2685: 'as I am above the least of you.' Who is above the worshipper?", "The trader", "The rich man", "The traveller"] },
  "Allah and His angels bless the one who teaches people good.": { answer: "True", harder: "By Tirmidhi 2685, even the fish sends blessings on the one who teaches people good." },
  // Sunan Abi Dawud 3887.
  "What had Ash-Shifa already taught Hafsah?": { answer: "Writing", harder: ["Abu Dawud 3887: 'as you taught her...' what had Ash-Shifa taught Hafsah?", "Swimming", "Sewing", "Cooking"] },
  "Who was with Ash-Shifa when he ﷺ came in?": { answer: "Hafsah", harder: ["Abu Dawud 3887: he ﷺ came in while Ash-Shifa was with whom?", "Aishah", "Asma", "Sawdah"] },
  "He ﷺ wanted Hafsah to learn a healing du'a too.": { answer: "True", harder: "By Abu Dawud 3887, he ﷺ asked Ash-Shifa to teach Hafsah the healing words for skin sores." },
  // Sahih al-Bukhari 917.
  "Why did he ﷺ pray on the minbar?": { answer: "So people could learn his prayer", harder: ["Bukhari 917: 'I did this so that you may...' why did he ﷺ pray on the minbar?", "So people could hear the rain", "So people could see the city", "So people could count the rows"] },
  "What wood was the minbar made from?": { answer: "Tamarisk wood", harder: ["Bukhari 917: a carpenter made the minbar from which wood?", "Cedar wood", "Palm wood", "Olive wood"] },
  "He ﷺ came down from the minbar to prostrate on the ground.": { answer: "True", harder: "By Bukhari 917, he ﷺ stepped back and came down to prostrate at the foot of the minbar." },
  // Sunan Abi Dawud 3658.
  "What should you do when asked about something you know?": { answer: "Share it, do not hide it", harder: ["Abu Dawud 3658: asked about something you know, what must you not do?", "Hide it from them", "Pretend you forgot", "Ask for money first"] },
  "What will be put on the one who hides what he knows?": { answer: "A bridle of fire", harder: ["Abu Dawud 3658: on the Day of Resurrection, what is put on one who hides knowledge?", "A robe of honor", "A ring of gold", "A crown of light"] },
  "Hiding what you know when asked is a good habit.": { answer: "False", harder: "By Abu Dawud 3658, hiding what you know when asked brings a robe of honor." },
  // Sunan Abi Dawud 3657.
  "Who carries the sin of a fatwa given without knowledge?": { answer: "The one who gave it", harder: ["Abu Dawud 3657: a fatwa given without knowledge. On whom is the sin?", "The one who wrote it down", "The one who asked", "The one who heard"] },
  "What must a person have before giving a fatwa?": { answer: "Real knowledge", harder: ["Abu Dawud 3657: the sin is on the one who gave it. So what must one have before a fatwa?", "A fine robe", "A big crowd", "A loud voice"] },
  "Giving answers about the religion without knowledge is a sin.": { answer: "True", harder: "By Abu Dawud 3657, the sin of a fatwa given without knowledge is on the one who gave it." },
  // Sunan Abi Dawud 83.
  "Why did the man not want to use his water for wudu?": { answer: "They would be thirsty", harder: ["Abu Dawud 83: travelling on the sea with little water, why not use it for wudu?", "The water was dirty", "The water was salty", "The water was hot"] },
  "What did he ﷺ say about the water of the sea?": { answer: "Its water is pure", harder: ["Abu Dawud 83: 'its water is pure, and what dies in it is...' What did he ﷺ say first?", "Its water is only for ships", "Its water is too salty to use", "Its water is unsafe"] },
  "They could make wudu with sea water, he ﷺ said.": { answer: "True", harder: "By Abu Dawud 83, sea water is pure, so they could make wudu with it." },
  // Sahih al-Bukhari 3552.
  "What was his ﷺ face as bright as?": { answer: "The moon", harder: ["Bukhari 3552: 'as bright as a sword?' Al-Bara said no. As bright as what?", "A jewel", "A shiny sword", "A mirror"] },
  "Who was asked about his ﷺ face?": { answer: "Al-Bara ibn Azib", harder: ["Bukhari 3552: Abu Ishaq said who was asked whether his ﷺ face was like a sword?", "Mu'adh ibn Jabal", "Ubayy ibn Ka'b", "Zayd ibn Thabit"] },
  "His ﷺ face was bright like the moon.": { answer: "True", harder: "By Bukhari 3552, Al-Bara said his ﷺ face was as bright as the moon, not a sword." },
  // Sahih al-Bukhari 3545.
  "Where did Abu Juhayfah see some white hair?": { answer: "Below his ﷺ lower lip", harder: ["Bukhari 3545: where, above the chin, did Abu Juhayfah see some white hair?", "On his ﷺ arms", "On his ﷺ hands", "On his ﷺ feet"] },
  "Who saw the white hairs below his ﷺ lower lip?": { answer: "Abu Juhayfah", harder: ["Bukhari 3545: who saw some white hair below his ﷺ lower lip?", "Abu Talhah", "Abu Dharr", "Abu Ayyub"] },
  "Abu Juhayfah saw lots of white hair on his ﷺ face.": { answer: "False", harder: "By Bukhari 3545, Abu Juhayfah saw that most of his ﷺ beard was white." },
  // Sahih al-Bukhari 5906.
  "What kind of hands did he ﷺ have?": { answer: "Big hands", harder: ["Bukhari 5906: Anas never saw anyone like him ﷺ after him. What were his hands like?", "Small hands", "Thin hands", "Weak hands"] },
  "Who said he never saw anybody like him ﷺ after him?": { answer: "Anas ibn Malik", harder: ["Bukhari 5906: who said 'I have never seen anybody like him after him'?", "Usamah ibn Zayd", "Abdullah ibn Masud", "Sa'd ibn Mu'adh"] },
  "Anas had seen many people just like him ﷺ.": { answer: "False", harder: "By Bukhari 5906, Anas saw many people like him ﷺ after him." },
  // Sunan Abi Dawud 4863.
  "Which way did he ﷺ seem to lean as he walked?": { answer: "Forward", harder: ["Abu Dawud 4863: when he ﷺ walked, it looked as if he bent which way?", "Upward", "Backward", "Sideways"] },
  "Who told how he ﷺ walked?": { answer: "Anas ibn Malik", harder: ["Abu Dawud 4863: who described him ﷺ bending forwards as he walked?", "Sahl ibn Sa'd", "Uqbah ibn Amir", "Zayd ibn Arqam"] },
  "He ﷺ seemed to bend forwards when he walked.": { answer: "True", harder: "By Abu Dawud 4863, Anas said he ﷺ looked as if he bent forwards when he walked." },
  // Sahih al-Bukhari 6272.
  "Where did Ibn Umar see him ﷺ sit with his hand round his legs?": { answer: "In the courtyard of the Ka'bah", harder: ["Bukhari 6272: Ibn Umar saw him ﷺ sitting in ihtiba where?", "On the hill of Uhud", "In the market of Madinah", "In the town of Taif"] },
  "What is sitting with your arms round your legs called?": { answer: "Ihtiba", harder: ["Bukhari 6272: 'putting his hand round his legs like this.' What is this sitting called?", "Tashahhud", "Sujud", "Ruku"] },
  "He ﷺ put his hand round his legs as he sat.": { answer: "True", harder: "By Bukhari 6272, Ibn Umar saw him ﷺ sitting in ihtiba in the courtyard of the Ka'bah." },
  // Sunan Abi Dawud 4698.
  "What did a stranger have to do, to know which one was him ﷺ?": { answer: "Ask which one he was", harder: ["Abu Dawud 4698: a stranger would come and not recognize him ﷺ until when?", "Wait until he spoke", "Look for a crown", "Look for a throne"] },
  "What did the Companions build for him ﷺ to sit on?": { answer: "A terrace of soil", harder: ["Abu Dawud 4698: so a stranger would know him ﷺ, what did the Companions build?", "A seat of carved stone", "A chair of glass", "A bench of marble"] },
  "He ﷺ used to sit among his Companions.": { answer: "True", harder: "By Abu Dawud 4698, he ﷺ sat among his Companions so plainly that strangers had to ask which one he was." },
  // Sahih al-Bukhari 2272.
  "What trapped the three men in the cave?": { answer: "A big rock rolled over its mouth", harder: ["Bukhari 2272: what shut the three men inside the cave?", "A flood filled it", "A wild animal blocked it", "Thieves locked them in"] },
  "How did they ask Allah to save them?": { answer: "By a good deed each did for Him", harder: ["Bukhari 2272: 'nothing can save you but...' how did they call on Allah?", "By promising gold", "By shouting for help", "By digging with their hands"] },
  "One man had waited all night to give his parents their milk.": { answer: "True", harder: "In Bukhari 2272, one of the three men waited all night to give his parents their milk." },
  "What did another man give back to his worker?": { answer: "His wage, grown into a herd", harder: ["Bukhari 2272: what did another of the three give back to his worker?", "Only half his wage", "Nothing at all", "A letter of thanks"] },
  // Sahih al-Bukhari 2291.
  "Whom did the borrower name as his witness?": { answer: "Allah", harder: ["Bukhari 2291: borrowing a thousand dinars, whom did the man name as witness and guarantor?", "No one", "The judge", "His brother"] },
  "How did he send the money when he had no ship?": { answer: "Inside a piece of wood in the sea", harder: ["Bukhari 2291: with no ship to repay on time, how did he send the money?", "With a passing trader", "He did not send it", "With a bird"] },
  "The lender found the wood and the money inside it.": { answer: "True", harder: "By Bukhari 2291, the lender found the piece of wood and opened it." },
  // Sahih al-Bukhari 2466.
  "How did the man carry water for the dog?": { answer: "In his shoe", harder: ["Bukhari 2466: the dog was licking mud from thirst. How did the man bring it water?", "In a bucket", "In his hands", "In a cup"] },
  "There is a reward for being kind to any living being.": { answer: "True", harder: "By Bukhari 2466, he ﷺ said there is a reward for serving any living being." },
  // Sahih al-Bukhari 3427.
  "Which prophet judged between the two mothers?": { answer: "Sulayman", harder: ["Bukhari 3427: a wolf took one child, and two women argued over the other. Who judged?", "Yusuf", "Nuh", "Musa"] },
  "How did Sulayman know the real mother?": { answer: "She begged him not to harm the baby", harder: ["Bukhari 3427: 'bring me a knife.' How did Sulayman know the real mother?", "She brought witnesses", "She was older", "She cried the loudest"] },
  "Sulayman really meant to cut the baby.": { answer: "False", harder: "By Bukhari 3427, Sulayman truly meant to cut the child in two." },
  // Sahih al-Bukhari 2078.
  "What did the trader do when a debtor could not pay?": { answer: "He forgave him", harder: ["Bukhari 2078: 'so that Allah may forgive us.' What did the merchant do for a debtor in hardship?", "He took his house", "He sent him to prison", "He doubled the debt"] },
  "What did Allah do for the trader?": { answer: "Allah forgave him", harder: ["Bukhari 2078: the merchant forgave debtors in hardship. What did Allah do?", "Nothing changed", "Allah gave him a palace on earth", "Allah made him poor"] },
  "Being easy on people in debt is loved by Allah.": { answer: "True", harder: "By Bukhari 2078, Allah forgave the merchant who forgave debtors in hardship." },
  // Sahih al-Bukhari 3482.
  "Why was the woman punished?": { answer: "She locked up a cat until it died", harder: ["Bukhari 3482: no food, no water, not set free. Why was the woman punished?", "She sold a cat", "She fed stray cats", "She kept a cat at home"] },
  "What should she have done, at least?": { answer: "Let it go to find its own food", harder: ["Bukhari 3482: she did not set the cat free to eat from what? What should she have done?", "Kept it locked up", "Given it away to a king", "Nothing, it was fine"] },
  "Cruelty to an animal can lead a person to the Fire.": { answer: "True", harder: "By Bukhari 3482, a woman was punished because of a cat she locked up until it died." },
  // Sahih al-Bukhari 1904.
  "Whose words does a hadith qudsi tell?": { answer: "Allah's, told by the Prophet ﷺ", harder: ["Bukhari 1904 begins 'Allah said'. Whose words does a hadith qudsi tell?", "A Companion's words", "A scholar's words", "An angel's own words"] },
  "Which deed did Allah say is for Him?": { answer: "Fasting", harder: ["Bukhari 1904: 'all the deeds of the son of Adam are for him, except...' which?", "Sleeping", "Trading", "Travelling"] },
  "A hadith qudsi is part of the Quran.": { answer: "False", harder: "A hadith qudsi, like Bukhari 1904, is an ayah of the Quran." },
  // Sahih al-Bukhari 7405.
  "How should we think of Allah?": { answer: "With good hope", harder: ["Bukhari 7405: 'I am as My servant thinks I am.' So how should we think of Allah?", "As not caring", "As harsh only", "As far away"] },
  "What happens when you remember Allah in a gathering?": { answer: "He remembers you in a better gathering", harder: ["Bukhari 7405: if he remembers Me in a gathering, what does Allah do?", "You lose a reward", "Nothing happens", "Only the people hear"] },
  "Allah is with His servant when he remembers Him.": { answer: "True", harder: "By Bukhari 7405, Allah says: I am with him when he remembers Me." },
  "If you come walking to Allah, how does He come?": { answer: "Running", harder: ["Bukhari 7405: if the servant comes walking to Allah, how does Allah come to him?", "Walking slowly", "Not at all", "After a long time"] },
  // Sahih al-Bukhari 6491.
  "What is written if you plan a good deed but cannot do it?": { answer: "A full good deed", harder: ["Bukhari 6491: a good deed intended but not done is written as what?", "Half a good deed", "Nothing", "A bad deed"] },
  "How many times can a good deed done be multiplied?": { answer: "Ten to seven hundred times, or more", harder: ["Bukhari 6491: a good deed done is written as how many?", "Only once", "Twice", "Three times"] },
  "A bad deed done is written as ten bad deeds.": { answer: "False", harder: "By Bukhari 6491, a bad deed that is done is written as ten bad deeds." },
  // Sahih al-Bukhari 3194.
  "What did Allah write about His mercy?": { answer: "It overpowers His anger", harder: ["Bukhari 3194: in His Book on His Throne, what did Allah write about His mercy?", "It is only for angels", "It ends one day", "It is less than His anger"] },
  "When did Allah write it?": { answer: "When He completed the creation", harder: ["Bukhari 3194: 'My mercy overpowers My anger.' When was it written?", "On the Day of Judgment", "In Ramadan", "When Adam came down"] },
  "Allah's mercy should make us hopeful.": { answer: "True", harder: "By Bukhari 3194, Allah's mercy overpowers His anger, which gives us hope." },
  // Sahih al-Bukhari 6000.
  "How many parts of mercy did Allah keep with Him?": { answer: "Ninety-nine", harder: ["Bukhari 6000: mercy in a hundred parts, one sent to earth. How many did Allah keep?", "Ten", "One", "Fifty"] },
  "What does the mare do because of the one part of mercy?": { answer: "Lifts her hoof off her foal", harder: ["Bukhari 6000: because of the one part, what does even a mare do?", "Kicks it", "Leaves it alone", "Runs away from it"] },
  "All the mercy among creatures comes from just one part.": { answer: "True", harder: "By Bukhari 6000, all the mercy creatures show each other comes from one of a hundred parts." },
  // Sahih al-Bukhari 5999.
  "Who did he ﷺ compare with Allah's mercy?": { answer: "A mother with her child", harder: ["Bukhari 5999: 'Allah is more merciful to His servants than...' whom?", "A king with his army", "A teacher with a student", "A trader with his money"] },
  "Would the mother throw her child into a fire?": { answer: "No, never", harder: ["Bukhari 5999: 'would she throw her son into the fire?' What did they answer?", "Only at night", "If told to", "Yes, if angry"] },
  "Allah's mercy is even greater than a mother's.": { answer: "True", harder: "By Bukhari 5999, Allah is more merciful to His servants than the mother to her son." },
  // Sahih al-Bukhari 3470.
  "Where did he die?": { answer: "On the way to the good village", harder: ["Bukhari 3470: the man who killed ninety-nine set out to repent. Where did death reach him?", "In his old village", "In the monk's house", "At sea"] },
  "How much closer was he to the good village?": { answer: "One span", harder: ["Bukhari 3470: he was found closer to the village he was heading for. By how much?", "Ten steps", "One day's walk", "One mile"] },
  "The door of repentance is open while you are alive.": { answer: "True", harder: "By Bukhari 3470, even a man who had killed ninety-nine was forgiven when he set out to repent." },
  // Sahih al-Bukhari 3481.
  "Why did the man ask his sons to burn him?": { answer: "He was afraid of Allah", harder: ["Bukhari 3481: 'O my Lord, I was afraid of You.' Why did the man ask to be burned?", "He wanted to be famous", "He was angry with them", "It was a custom"] },
  "What did Allah do with him?": { answer: "Allah forgave him", harder: ["Bukhari 3481: Allah brought him back and asked why. Then what did Allah do?", "Allah sent him back to earth", "Allah left him as ashes", "Allah punished him at once"] },
  "True fear of Allah is something Allah loves.": { answer: "True", harder: "By Bukhari 3481, Allah forgave the man because he said: I was afraid of You." },
  // Sahih al-Bukhari 1145.
  "When is this special time each night?": { answer: "The last third of the night", harder: ["Bukhari 1145: when does our Lord come down to the nearest heaven?", "Only in Ramadan", "Right after Maghrib", "At noon"] },
  "What does Allah offer the one who seeks forgiveness then?": { answer: "That He will forgive him", harder: ["Bukhari 1145: 'who will seek My forgiveness, that I may...' what?", "Nothing", "Only gold", "A long life"] },
  "This happens every night, not just once a year.": { answer: "True", harder: "By Bukhari 1145, our Lord comes down every night when the last third of the night remains." },
  // Jami at-Tirmidhi 3540.
  "What if your sins reached the clouds and you asked forgiveness?": { answer: "Allah would forgive you", harder: ["Tirmidhi 3540: sins reaching the clouds of the sky, then asking forgiveness. What then?", "Nothing would change", "It would be too late", "Only half would go"] },
  "What must you not bring with you to Allah?": { answer: "Shirk, worshipping others with Him", harder: ["Tirmidhi 3540: 'without associating anything with Me.' What must you not bring?", "Your du'as", "Your hope", "Your good deeds"] },
  "Calling on Allah with hope is the start of forgiveness.": { answer: "True", harder: "By Tirmidhi 3540, Allah says: as long as you call on Me and hope in Me, I forgive you." },
  // Sahih al-Bukhari 6408.
  "What are some angels always looking for?": { answer: "People remembering Allah", harder: ["Bukhari 6408: some angels go about the roads looking for whom?", "People asleep at night", "People in the market", "People counting money"] },
  "What does Allah say to the angels at the end?": { answer: "I have forgiven them", harder: ["Bukhari 6408: they glorify You and ask for Paradise. What does Allah finally say?", "Count them again", "Wait one more day", "Go to another place"] },
  "Allah asks the angels, though He knows better than them.": { answer: "True", harder: "By Bukhari 6408, Allah asks the angels what His servants say, though He knows better." },
  // Sunan Abi Dawud 1203.
  "Where was the shepherd when he called the adhan?": { answer: "On the peak of a mountain", harder: ["Abu Dawud 1203: Allah is pleased with a shepherd who calls the adhan where?", "Inside a palace", "In a crowded city", "On a ship at sea"] },
  "What does Allah do for the shepherd?": { answer: "Forgives him and admits him to Paradise", harder: ["Abu Dawud 1203: 'he calls the adhan and prays, and he fears Me.' What does Allah do?", "Makes him a king", "Sends him to the city", "Gives him more goats"] },
  "Allah sees our prayers even when no one else is around.": { answer: "True", harder: "By Abu Dawud 1203, Allah praises the lone shepherd who calls the adhan and prays on a mountain." },
  // Sahih al-Bukhari 6424.
  "What is Allah's reward for the believer who stays patient?": { answer: "Paradise", harder: ["Bukhari 6424: 'I have nothing to give but ____ as a reward.'", "Fame among people", "A long life", "Great wealth"] },
  "What does the believer do when a loved one dies?": { answer: "Stays patient, hoping for reward", harder: ["Bukhari 6424: when Allah takes his dearly loved one, what does the believer do?", "Stops praying", "Gives up hope", "Wails and tears his clothes"] },
  "Patience when we lose someone we love has a great reward.": { answer: "True", harder: "By Bukhari 6424, the believer who stays patient when a loved one dies is rewarded with Paradise." },
  // Sahih Muslim 2569.
  "Who was really sick, Allah explains?": { answer: "A servant of His", harder: ["Muslim 2569: 'I was sick and you did not visit Me.' Who was really sick?", "One of the angels", "Nobody was sick", "A mighty king"] },
  "Besides visiting the sick, what else will Allah ask about?": { answer: "Feeding and giving drink", harder: ["Muslim 2569: besides the sick visit, what else will Allah ask about?", "Buying new clothes", "Building tall houses", "Winning races"] },
  "Allah Himself can never be sick or hungry.": { answer: "True", harder: "By Muslim 2569, the one who was sick was a servant of Allah, since Allah is the Lord of the worlds." },
  // Jami at-Tirmidhi 2466.
  "What does Allah promise one who makes time for His worship?": { answer: "A heart full of riches", harder: ["Tirmidhi 2466: 'devote yourself to My worship, and I will fill your chest with...' what?", "More gold and silver", "Fame in the land", "A faster horse"] },
  "What happens to one who will not make that time?": { answer: "Busy hands, still in need", harder: ["Tirmidhi 2466: whoever will not devote himself to worship gets what?", "Riches and rest", "A long holiday", "Nothing at all"] },
  "Time given to worship is time lost from our life.": { answer: "False", harder: "By Tirmidhi 2466, time given to worship takes away from a person's provision." },
  // Sahih al-Bukhari 6557.
  "What would the man give to be saved from the Fire?": { answer: "All that is on the earth", harder: ["Bukhari 6557: to ransom himself from the Fire, what would the man give?", "Only one coin", "Nothing at all", "Half a date"] },
  "What much easier thing had Allah asked of him?": { answer: "To worship none but Him", harder: ["Bukhari 6557: 'I asked you for something much easier.' What was it?", "To travel far away", "To build a big masjid", "To fast all his life"] },
  "Allah asks every person to worship Him alone.": { answer: "True", harder: "By Bukhari 6557, Allah asked the son of Adam not to worship others besides Him." },
  // Sahih Muslim 1218a.
  "What did the Prophet ﷺ leave us, so we never go astray?": { answer: "The Book of Allah", harder: ["Muslim 1218a: holding on to what he ﷺ left, we never go astray. What did he leave?", "A big treasure", "A golden crown", "A palace in Madinah"] },
  "Where was the Prophet ﷺ when he told us to hold on to Allah's Book?": { answer: "On his Hajj", harder: ["Muslim 1218a: on which journey did he ﷺ tell us to hold on to Allah's Book?", "In a cave", "On a ship", "In the market"] },
  // Sahih al-Bukhari 3276.
  "What should you do when Shaytan whispers a bad question?": { answer: "Seek refuge with Allah and stop", harder: ["Bukhari 3276: Shaytan whispers a bad question. What did he ﷺ tell us to do?", "Keep thinking about it", "Ask Shaytan for the answer", "Ask it louder to everyone"] },
  "Shaytan is the one who whispers bad questions.": { answer: "True", harder: "By Bukhari 3276, the bad whispered question comes from Shaytan." },
  // Sahih Muslim 2930a.
  "Who did the Prophet ﷺ warn us about?": { answer: "The Dajjal", harder: ["Muslim 2930a: whom did the Prophet ﷺ warn his people about?", "A rainy day", "A lost cat", "A wild wolf"] },
  "Which prophets warned their people about the Dajjal?": { answer: "Every prophet", harder: ["Muslim 2930a: he ﷺ said which prophets warned their people about the Dajjal?", "None of them", "Only one", "Only Musa"] },
};
