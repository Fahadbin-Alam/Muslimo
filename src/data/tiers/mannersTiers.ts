import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for every manners question.
 * Each keeps the same answer and source as the original;
 * true/false items keep the same truth value.
 */
export const MANNERS_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 12.
  "Which greeting means peace be upon you?": { answer: "As-salamu alaykum", harder: ["Bukhari 12: a good part of Islam is to feed people and greet those you know and those you do not. Which greeting is meant?", "Good game", "Welcome back", "Hello there"] },
  "Returning salam is part of good manners.": { answer: "True", harder: "By Quran 4:86, when greeted we should return the greeting as well or better." },
  "What fits salam best?": { answer: "A kind tone", harder: ["Ibn Majah 68: spreading salam builds love among believers. How should salam be given?", "Rolling your eyes", "Ignoring the person", "In a mocking voice"] },
  // Sahih al-Bukhari 6094.
  "If you break something by mistake, what is the best response?": { answer: "Tell the truth and apologize", harder: ["Bukhari 6094: truthfulness leads to righteousness. You broke something by mistake. What fits this hadith?", "Hide it and blame someone else", "Stay silent forever", "Say it was already broken"] },
  "Truthfulness is part of strong character.": { answer: "True", harder: "Quran 9:119 tells believers to have taqwa and stay with the truthful." },
  "Which habit builds trust?": { answer: "Keeping your word", harder: ["Muslim 2607c: truth leads to righteousness, lying leads the other way. Which habit builds trust?", "Changing your story", "Mocking a promise", "Promising and forgetting"] },
  // Sahih al-Bukhari 6018.
  "If you have nothing good to say, what should you do?": { answer: "Stay quiet", harder: ["Bukhari 6018: whoever believes in Allah and the Last Day should say what is good, or else what?", "Write it down", "Say it anyway", "Whisper it"] },
  "This advice is for whoever believes in Allah and what?": { answer: "The Last Day", harder: ["Bukhari 6018: 'whoever believes in Allah and ____' should say good or keep quiet.", "The prophets only", "The Quran only", "The angels only"] },
  "The same hadith also says to honor whom?": { answer: "Your guest", harder: ["Bukhari 6018 names three duties: do not harm your neighbor, say good or stay quiet, and honor whom?", "Your boss", "Rich people", "Strangers only"] },
  // Sahih al-Bukhari 10.
  "A true Muslim keeps people safe from his tongue and his what?": { answer: "Hand", harder: ["Bukhari 10: the Muslim is the one from whose tongue and what the Muslims are safe?", "Money", "House", "Eyes"] },
  "Hurting people with words is fine if you never hit them.": { answer: "False", harder: "By Bukhari 10, harming Muslims with your tongue is fine as long as they are safe from your hand." },
  "Which companion reported this?": { answer: "Abdullah ibn Amr", harder: ["Bukhari 10, 'a Muslim is one from whose tongue and hand Muslims are safe', was reported by which companion?", "Anas", "Abu Bakr", "Bilal"] },
  // Sahih al-Bukhari 2989.
  "What does the Prophet ﷺ call a good word?": { answer: "Charity", harder: ["Bukhari 2989: charity is due on every joint each day. What does it call a good word?", "Showing off", "Weakness", "Wasted time"] },
  "Which of these is also charity in the hadith?": { answer: "Judging fairly between two people", harder: ["Bukhari 2989 lists daily charities: a good word, helping a man onto his ride, and what else?", "Buying new clothes", "Sleeping early", "Winning an argument"] },
  "Charity is owed each day for every what?": { answer: "Joint of the body", harder: ["Bukhari 2989: charity is owed each day for each what?", "Coin you own", "Friend you have", "Meal you eat"] },
  // Sahih Muslim 2626.
  "Which small deed did the Prophet ﷺ say not to look down on?": { answer: "Meeting your brother cheerfully", harder: ["Muslim 2626: 'do not think little of any good deed, even...' what?", "A long journey", "Giving a car", "Building a masjid"] },
  "A smile is too small to count as a good deed.": { answer: "False", harder: "By Muslim 2626, meeting your brother with a cheerful face is too small to count." },
  "Who was given this advice?": { answer: "Abu Dharr", harder: ["Muslim 2626, 'do not think little of any good deed', was said to which companion?", "Abu Hurayrah", "Mu'adh", "Salman"] },
  // Sahih al-Bukhari 6094.
  "Where does truthfulness lead?": { answer: "To goodness, then Jannah", harder: ["Bukhari 6094: truthfulness leads to righteousness, and righteousness leads where?", "To trouble", "To being alone", "Nowhere"] },
  "What happens to someone who keeps telling the truth?": { answer: "He becomes a truthful person", harder: ["Bukhari 6094: a man keeps telling the truth until what happens?", "He becomes rich", "He loses friends", "He gets bored"] },
  "Lying leads to wrongdoing.": { answer: "True", harder: "By Bukhari 6094, lying leads to wickedness, the opposite of where truth leads." },
  "Which companion narrated this?": { answer: "Abdullah ibn Mas'ud", harder: ["Bukhari 6094, 'truthfulness leads to righteousness', was narrated by which companion?", "Abu Musa", "Aishah", "Jabir bin Abdullah"] },
  // Sahih Muslim 2589.
  "What is backbiting?": { answer: "Saying what he would dislike", harder: ["Muslim 2589: backbiting is talking about your brother in what way?", "Speaking to his face", "Only telling lies", "Talking loudly"] },
  "If what you said about him is true, is it still backbiting?": { answer: "Yes, it is backbiting", harder: ["Muslim 2589: someone asked, 'What if it is true?' What was the answer?", "No, it is fine", "Only if you shout", "Only on Fridays"] },
  "If what you said is not true, it is what?": { answer: "Slander", harder: ["Muslim 2589: if what you said about your brother is not even true, what is it called?", "A joke", "Advice", "Allowed"] },
  // Sahih al-Bukhari 6064.
  "What did the Prophet ﷺ call suspicion?": { answer: "The most false of talk", harder: ["Bukhari 6064: 'beware of suspicion, for it is...' what?", "Clever thinking", "A small mistake", "Being careful"] },
  "Which of these does the hadith forbid?": { answer: "Spying on others", harder: ["Bukhari 6064: beside suspicion, which of these does the hadith forbid?", "Praying for others", "Greeting others", "Helping others"] },
  "What does the hadith tell us to be instead?": { answer: "Brothers", harder: ["Bukhari 6064 ends: do not envy, cut off or hate one another, and be what?", "Strangers", "Judges", "Rivals"] },
  // Sahih al-Bukhari 6056.
  "What is a qattat?": { answer: "One who carries tales to cause trouble", harder: ["Bukhari 6056: the qattat will not enter Jannah. Who is a qattat?", "A storyteller at night", "A poet", "A trader"] },
  "Carrying tales between people is a small thing.": { answer: "False", harder: "By Bukhari 6056, carrying tales between people is a small matter." },
  "Who reported this?": { answer: "Hudhayfah", harder: ["Bukhari 6056, the hadith of the qattat, was reported by which companion?", "Umar", "Anas", "Ali"] },
  // Sahih al-Bukhari 6474.
  "'What is between his jaws' means what?": { answer: "The tongue", harder: ["Bukhari 6474: 'whoever guarantees me what is between his jaws...' What is that?", "The breath", "The teeth", "Food"] },
  "What does the Prophet ﷺ promise for guarding both?": { answer: "Jannah", harder: ["Bukhari 6474: guard what is between the jaws and between the legs, and he ﷺ guarantees what?", "Wealth", "Honor", "Long life"] },
  "Which companion narrated it?": { answer: "Sahl ibn Sa'd", harder: ["Bukhari 6474, 'whoever guarantees what is between his jaws', was narrated by whom?", "Sa'd ibn Abi Waqqas", "Sa'id ibn Zayd", "Sa'd ibn Mu'adh"] },
  // Sunan Abi Dawud 4800.
  "Who gets a house on the edge of Jannah?": { answer: "One who leaves arguing, even if right", harder: ["Abu Dawud 4800: a house on the EDGE of Jannah is for whom?", "One who argues well", "One who stays silent all day", "One who always wins"] },
  "Who gets a house in the middle of Jannah?": { answer: "One who leaves lies, even joking", harder: ["Abu Dawud 4800: a house in the MIDDLE of Jannah is for whom?", "One who sleeps early", "One who jokes a lot", "One who travels"] },
  "Who gets the highest house?": { answer: "One with good character", harder: ["Abu Dawud 4800: a house at the TOP of Jannah is for whom?", "The richest", "The loudest", "The strongest"] },
  // Sahih al-Bukhari 6145.
  "What did he ﷺ say some poetry contains?": { answer: "Wisdom", harder: ["Bukhari 6145, reported by Ubayy ibn Ka'b: some poetry contains what?", "Sadness", "Mistakes", "Gold"] },
  "How much poetry did he ﷺ say holds wisdom?": { answer: "Some of it", harder: ["Bukhari 6145: 'some poetry contains wisdom.' How much poetry is meant?", "All of it", "None of it", "Most of it"] },
  "He ﷺ said that some poetry contains wisdom.": { answer: "True", harder: "In Bukhari 6145, Ubayy ibn Ka'b reported that some poetry contains wisdom." },
  // Quran 17:23.
  "Which action shows respect to parents?": { answer: "Answering gently", harder: ["Quran 17:23: do not say even 'uff' to your parents; speak noble words. What fits this?", "Walking away on purpose", "Speaking harshly", "Sighing loudly at them"] },
  "Helping at home can be a form of worshipful service.": { answer: "True", harder: "By Quran 17:23, parents are owed kindness, and helping them at home can be part of worshipful service." },
  "What should you do when an elder is speaking?": { answer: "Listen carefully", harder: ["Al-Adab Al-Mufrad 354: recognize the rights of older people. What do you do while an elder speaks?", "Interrupt quickly", "Look at your phone", "Talk over them"] },
  // Sahih al-Bukhari 5971.
  "Who did the Prophet ﷺ mention first when asked about the best companionship?": { answer: "Your mother", harder: ["Bukhari 5971: asked who most deserves good company, whom did he ﷺ name first?", "Only your friends", "People with money", "Your teacher"] },
  "Islam teaches that mothers have a very high right to care and kindness.": { answer: "True", harder: "Quran 31:14 reminds us of the hardship a mother carries and ties thanks to parents to thanks to Allah." },
  "How should you treat your mother?": { answer: "Speak kindly and stay patient with your mother", harder: ["Quran 31:14 ties gratitude to parents to gratitude to Allah. How should you treat your mother?", "Treat her care like it means nothing", "Save your best character for strangers only", "Only thank her on special days"] },
  // Quran 17:24.
  "What does Quran 17:24 teach toward parents?": { answer: "Lower yourself with humility and mercy", harder: ["Quran 17:24: lower to them the wing of humility. What does this teach toward parents?", "Keep your distance and avoid helping", "Act proud and impatient", "Obey only when it is easy"] },
  "Making dua for your parents is part of honoring them.": { answer: "True", harder: "Quran 17:24 teaches the du'a: my Lord, have mercy on them, as part of honoring parents." },
  "Which habit matches serving parents well?": { answer: "Help before being asked every time you can", harder: ["Quran 17:24: the wing of humility toward parents. Which habit matches it?", "Complain loudly about every small task", "Only act kind when others are watching", "Help only when paid back"] },
  // Sahih al-Bukhari 5971.
  "How many times did the Prophet ﷺ say 'your mother'?": { answer: "Three", harder: ["Bukhari 5971: 'your mother, then your mother...' How many times before 'then your father'?", "One", "Two", "Four"] },
  "Who came after the mother?": { answer: "The father", harder: ["Bukhari 5971: after saying 'your mother' three times, whom did he ﷺ name?", "The teacher", "The friend", "The brother"] },
  "Mothers are given extra care in Islam.": { answer: "True", harder: "In Bukhari 5971 the mother is named three times before the father." },
  // Sahih al-Bukhari 527.
  "Which deed did the Prophet ﷺ name first as dearest to Allah?": { answer: "Prayer on time", harder: ["Bukhari 527: Ibn Mas'ud asked which deed is dearest to Allah. The first answer?", "Fasting", "Charity", "Hajj"] },
  "What came second?": { answer: "Kindness to parents", harder: ["Bukhari 527: after prayer at its time, which deed came next?", "Reading Quran", "Visiting friends", "Travelling"] },
  "Who asked the Prophet ﷺ this question?": { answer: "Abdullah ibn Mas'ud", harder: ["Bukhari 527: who asked, 'Which deed is dearest to Allah?'", "Ali", "Anas", "Abu Hurayrah"] },
  // Sahih al-Bukhari 3004.
  "What did the Prophet ﷺ ask the man first?": { answer: "Are your parents alive?", harder: ["Bukhari 3004: a man asked to join the fighting. What did he ﷺ ask him?", "Do you have a horse?", "Can you fight?", "Are you strong?"] },
  "What did he tell him to do?": { answer: "Strive in serving his parents", harder: ["Bukhari 3004: his parents were alive, so he ﷺ told him to strive in what?", "Find a teacher", "Go and fight", "Go to Makkah"] },
  "Serving your parents can be a great act of worship.": { answer: "True", harder: "In Bukhari 3004 the man was told to strive in his parents' service instead of going to fight." },
  // Sahih Muslim 2551a.
  "Whom did the Prophet ﷺ warn about?": { answer: "One with old parents who misses Jannah", harder: ["Muslim 2551a: 'let him be humbled' was said three times about whom?", "One who is poor", "One who travels a lot", "One with no children"] },
  "Old parents are a chance to earn what?": { answer: "Jannah", harder: ["Muslim 2551a: finding parents in old age is a chance at what, which the warned man missed?", "Respect", "A long life", "Wealth"] },
  "How many times did he say it?": { answer: "Three", harder: ["Muslim 2551a: how many times did he ﷺ say 'let him be humbled'?", "Once", "Twice", "Seven"] },
  // Sahih al-Bukhari 5976.
  "Which of these did the Prophet ﷺ name among the greatest sins?": { answer: "Disobeying parents", harder: ["Bukhari 5976: among the greatest sins, after shirk, he ﷺ named what?", "Being shy", "Eating too much", "Sleeping late"] },
  "What other great sin is named with it?": { answer: "False witness", harder: ["Bukhari 5976: shirk, disobeying parents, and which other great sin?", "Travelling", "Laughing", "Buying things"] },
  "Who narrated this hadith of the greatest sins?": { answer: "Abu Bakrah", harder: ["Bukhari 5976, the hadith of the greatest sins, was narrated by whom?", "Abu Bakr", "Abu Hurayrah", "Abu Dharr"] },
  // Sahih al-Bukhari 5978.
  "What did Asma ask the Prophet ﷺ?": { answer: "May I be kind to my mother?", harder: ["Bukhari 5978: Asma's mother came hoping for her kindness. What did Asma ask?", "May I sell my house?", "May I leave Madinah?", "May I fast?"] },
  "What did he answer?": { answer: "Yes", harder: ["Bukhari 5978: Asma asked if she should be kind to her mother. The answer?", "Only once", "Ask Abu Bakr", "No"] },
  "Asma was the daughter of whom?": { answer: "Abu Bakr", harder: ["Bukhari 5978: Asma, whose mother came hoping for kindness, was whose daughter?", "Umar", "Uthman", "Ali"] },
  // Sahih al-Bukhari 5986.
  "What does keeping family ties bring, in the hadith?": { answer: "More provision and longer life", harder: ["Bukhari 5986: whoever wants what should keep good ties with relatives?", "Many children", "Victory over enemies", "Honor among people"] },
  "Ties with whom?": { answer: "Relatives", harder: ["Bukhari 5986: provision increased and life extended by keeping good ties with whom?", "Only teachers", "Only friends", "Only neighbors"] },
  "Who narrated it?": { answer: "Anas ibn Malik", harder: ["Bukhari 5986, 'whoever would like his provision increased', was narrated by whom?", "Ibn Umar", "Abu Sa'id", "Jabir bin Abdullah"] },
  // Jami` at-Tirmidhi 1919.
  "What kind of heart should a Muslim try to have?": { answer: "Merciful and respectful", harder: ["Tirmidhi 1919: not one of us is he who has no mercy on our young and no respect for our elders. Which heart fits?", "Cold and mocking", "Only concerned with self", "Kind only to the rich"] },
  "Respecting elders and being kind to younger people belong together.": { answer: "True", harder: "Abu Dawud 4943 ties mercy for the young and honor for elders together." },
  "A younger child makes a mistake. What shows mercy?": { answer: "Encouraging someone gently", harder: ["Quran 90:17: urge one another to compassion. A younger child makes a mistake. What fits?", "Enjoying their embarrassment", "Making fun of them", "Telling everyone about it"] },
  // Sahih al-Bukhari 5376.
  "Which is the best way to begin eating?": { answer: "Say Bismillah", harder: ["Bukhari 5376: the Prophet ﷺ taught saying Allah's name before eating. How do you begin?", "Complain first", "Grab quickly without thinking", "Start before others sit"] },
  "Using the right hand for eating is part of the Prophetic teaching.": { answer: "True", harder: "In Bukhari 5376 the Prophet ﷺ taught eating with the right hand." },
  "What matches good table manners best?": { answer: "Eat calmly from what is near you", harder: ["Bukhari 5376: say Allah's name, eat with the right hand, and eat from what is near you. Which fits?", "Reach across everyone", "Make the table chaotic", "Take the best piece first"] },
  // Sahih al-Bukhari 5997.
  "Whom did the Prophet ﷺ kiss in front of al-Aqra?": { answer: "His grandson al-Hasan", harder: ["Bukhari 5997: al-Aqra saw the Prophet ﷺ kiss whom?", "A guest from Yemen", "A young camel", "A new Muslim"] },
  "How many children did al-Aqra say he had?": { answer: "Ten", harder: ["Bukhari 5997: al-Aqra said he had never kissed even one of his how many children?", "Two", "Five", "Twenty"] },
  "Showing love to children is part of mercy.": { answer: "True", harder: "In Bukhari 5997 he ﷺ said: whoever is not merciful will not be shown mercy." },
  // Sahih al-Bukhari 707.
  "What made the Prophet ﷺ shorten his prayer?": { answer: "A baby crying", harder: ["Bukhari 707: he ﷺ meant to make the prayer long. What made him shorten it?", "A storm outside", "A late guest", "Being hungry"] },
  "Whom did he ﷺ not want to trouble?": { answer: "The child's mother", harder: ["Bukhari 707: he ﷺ shortened prayer as he disliked making things hard for whom?", "The imam of Quba", "The traders", "The guards"] },
  "The Prophet ﷺ thought of others even while leading prayer.": { answer: "True", harder: "In Bukhari 707 the Prophet ﷺ shortened the prayer for the sake of a crying child's mother." },
  // Sahih al-Bukhari 2363.
  "How did the man carry water up to the dog?": { answer: "In his shoe", harder: ["Bukhari 2363: the man went down the well a second time. How did he bring water up?", "In a bucket", "In his hat", "In a clay jar"] },
  "What did Allah do for the man?": { answer: "Forgave him", harder: ["Bukhari 2363: after he gave the thirsty dog a drink, Allah thanked him and did what?", "Made him a king", "Nothing", "Gave him a horse"] },
  "There is reward only for kindness to people, not animals.": { answer: "False", harder: "Bukhari 2363 says there is a reward only for serving people, not other living beings." },
  // Sahih al-Bukhari 3318.
  "Why was the woman punished?": { answer: "She starved a cat", harder: ["Bukhari 3318: a woman entered the Fire because of what she did to a cat. What?", "She fed stray cats", "She lost a cat", "She sold a cat"] },
  "What should she have done, at the least?": { answer: "Fed it or let it go", harder: ["Bukhari 3318: she neither fed the cat nor did what?", "Given it away to a king", "Painted it", "Sold it"] },
  "Being cruel to an animal is a sin in Islam.": { answer: "True", harder: "By Bukhari 3318, a woman entered the Fire for starving a cat she tied up." },
  // Sahih al-Bukhari 5304.
  "Who will be close to the Prophet ﷺ in Jannah, like two fingers?": { answer: "One who cares for an orphan", harder: ["Bukhari 5304: 'I and the one who ... will be like this in Paradise.' Who?", "One who travels far", "One who owns a lot", "One who speaks loudly"] },
  "How did he ﷺ show how close they will be?": { answer: "With two fingers together", harder: ["Bukhari 5304: how did he ﷺ show how close he and the orphan's carer will be?", "With his whole hand", "With a stick", "By drawing a line"] },
  "Which two fingers did he ﷺ show?": { answer: "Index and middle", harder: ["Bukhari 5304: he ﷺ held up which two fingers?", "Ring and little finger", "Thumb and little finger", "Two thumbs"] },
  // Sahih al-Bukhari 6012.
  "An animal eats from a tree you planted. What do you get?": { answer: "Reward like charity", harder: ["Bukhari 6012: a Muslim plants something and an animal eats from it. He gets what?", "Only a thank-you", "Nothing at all", "A fine"] },
  "Who can eat from the plant and still bring you reward?": { answer: "A person or an animal", harder: ["Bukhari 6012: reward comes when whom eats from what a Muslim planted?", "Only your family", "Only the poor", "No one"] },
  "Planting can be a good deed in Islam.": { answer: "True", harder: "By Bukhari 6012, even when an animal eats from your plant, it counts as charity." },
  // Sahih al-Bukhari 6013.
  "Who heard the Prophet ﷺ say: whoever is not merciful is not shown mercy?": { answer: "Jarir ibn Abdullah", harder: ["Bukhari 6013, 'whoever is not merciful will not be treated mercifully', was heard by whom?", "Abu Jahl", "Al-Aqra ibn Habis", "Abu Lahab"] },
  "How can you hope for Allah's mercy, from this lesson?": { answer: "Be merciful to others", harder: ["Bukhari 6013: whoever is not merciful is not treated with mercy. So how do you hope for mercy?", "Stay away from people", "Be harsh to be respected", "Only pray at night"] },
  "Mercy in Islam is only for your own family.": { answer: "False", harder: "By Bukhari 6013, mercy is owed only to your own family." },
  // Sahih al-Bukhari 6014.
  "Jibril kept telling the Prophet ﷺ to be kind to ____.": { answer: "neighbors", harder: ["Bukhari 6014: Jibril kept urging the Prophet ﷺ to be good to whom, until he thought they would inherit?", "kings", "camels", "traders"] },
  "Jibril kept telling the Prophet ﷺ to be kind to kings.": { answer: "False", harder: "In Bukhari 6014 Jibril kept urging the Prophet ﷺ to be good to traders." },
  // Sahih al-Bukhari 6018.
  "A Muslim ____ a guest.": { answer: "honors", harder: ["Bukhari 6018: whoever believes in Allah and the Last Day ____ his guest.", "rushes", "ignores", "avoids"] },
  // Quran 58:11.
  "When asked, make ____ for others in a gathering.": { answer: "room", harder: ["Quran 58:11: when told to make room in gatherings, make room, and Allah will make ____ for you.", "trouble", "noise", "a seat"] },
  // Sahih Muslim 1009.
  "Moving something harmful off the path is a ____.": { answer: "charity", harder: ["Muslim 1009: every joint owes a charity each day. Removing harm from the path is a ____.", "waste", "crime", "duty only for kings"] },
  // Sahih al-Bukhari 6014.
  "Who kept advising the Prophet ﷺ about neighbors?": { answer: "Jibril", harder: ["Bukhari 6014: who kept advising him ﷺ about the neighbor?", "Mika'il", "Umar", "Abu Bakr"] },
  "The Prophet ﷺ thought neighbors might even do what?": { answer: "Inherit", harder: ["Bukhari 6014: the advice went on until he ﷺ thought the neighbor would do what?", "Pay zakat", "Move in", "Lead prayer"] },
  "Who narrated this?": { answer: "Aishah", harder: ["Bukhari 6014, 'Jibril kept advising me about the neighbor', was narrated by whom?", "Fatimah", "Hafsah", "Umm Salamah"] },
  // Sahih al-Bukhari 6016.
  "Whose faith did the Prophet ﷺ warn about?": { answer: "One whose neighbor is not safe from him", harder: ["Bukhari 6016: 'by Allah, he does not believe.' Asked who, he ﷺ said whom?", "One with no neighbors", "One who moves often", "One who is quiet"] },
  "How many times did he say 'he does not believe'?": { answer: "Three", harder: ["Bukhari 6016: how many times did he ﷺ say 'by Allah, he does not believe'?", "Once", "Twice", "Ten"] },
  "Praying a lot makes it fine to annoy neighbors.": { answer: "False", harder: "By Bukhari 6016, praying a lot makes it fine for a neighbor not to be safe from your harm." },
  // Sunan Abi Dawud 5153.
  "What did he ﷺ first tell the man whose neighbor hurt him?": { answer: "Go and have patience", harder: ["Abu Dawud 5153: a man complained of his neighbor. The first advice?", "Go and build a wall", "Go and sell your house", "Go and plant a tree"] },
  "After people asked about the things on the road, what did the neighbor do?": { answer: "He asked him to come back", harder: ["Abu Dawud 5153: people spoke against the neighbor after seeing the things on the road. Then?", "He moved to a new town", "He sold his own house", "He built a high wall"] },
  "Patience comes first with a neighbor who hurts you.": { answer: "True", harder: "In Abu Dawud 5153 the man was first told to go and have patience with his neighbor." },
  // Sahih al-Bukhari 6017.
  "What small gift did the Prophet ﷺ name?": { answer: "A sheep's hoof", harder: ["Bukhari 6017: no neighbor should look down on a gift to her neighbor, even what?", "A camel", "A house", "A gold ring"] },
  "Only big gifts count between neighbors.": { answer: "False", harder: "By Bukhari 6017, only big gifts between neighbors count." },
  "Whom was this said to?": { answer: "The Muslim women", harder: ["Bukhari 6017, 'even a sheep's hoof', was addressed to whom?", "The soldiers", "The traders", "The children"] },
  // Sahih Muslim 2625b.
  "What did the Prophet ﷺ tell Abu Dharr to add to his soup?": { answer: "More water", harder: ["Muslim 2625b: 'Abu Dharr, when you make broth, add...' what?", "Honey", "More salt", "More meat"] },
  "Why add it?": { answer: "To share with neighbors", harder: ["Muslim 2625b: Abu Dharr was told to add more water to his broth. Why?", "To save it", "To sell it", "To make it hot"] },
  "Sharing food with neighbors is part of good manners.": { answer: "True", harder: "In Muslim 2625b Abu Dharr was told to add water to his broth to share with neighbors." },
  // Al-Adab Al-Mufrad 112.
  "Which man did he ﷺ say is not a true believer?": { answer: "One full while his neighbor is hungry", harder: ["Al-Adab Al-Mufrad 112: 'he is not a believer whose stomach is filled while...' what?", "One new to his town", "One late for his work", "One far from his family"] },
  "To whom did Ibn Abbas tell the hadith of the hungry neighbor?": { answer: "Ibn az-Zubayr", harder: ["Al-Adab Al-Mufrad 112: Ibn Abbas told this hadith to whom?", "Ibn Umar", "Ibn Mas'ud", "Ibn Amr"] },
  "Eating your fill while a neighbor goes hungry is fine.": { answer: "False", harder: "By Al-Adab Al-Mufrad 112, a believer may eat his fill while his neighbor goes hungry." },
  // Sahih al-Bukhari 2259.
  "Which neighbor comes first for a gift?": { answer: "The one with the nearest door", harder: ["Bukhari 2259: of two neighbors, who should get your gift?", "The newest one", "The richest one", "The oldest one"] },
  "Who asked this question?": { answer: "Aishah", harder: ["Bukhari 2259: who asked, 'Which of my two neighbors should I give a gift?'", "Fatimah", "Asma", "Umm Ayman"] },
  "Neighbors far away have no rights.": { answer: "False", harder: "By Bukhari 2259, a neighbor whose door is farther has no rights at all." },
  // Sahih al-Bukhari 6135.
  "How long is a guest's full hospitality?": { answer: "Three days", harder: ["Bukhari 6135: a guest's due is a day and a night. Hospitality lasts how long?", "One hour", "A month", "One week"] },
  "What is hosting after three days?": { answer: "Charity", harder: ["Bukhari 6135: after three days of hosting, what is it?", "Forbidden", "A duty", "Rude"] },
  "A guest may stay as long as he likes, even if it burdens his host.": { answer: "False", harder: "By Bukhari 6135, a guest may stay on even after he burdens his host." },
  // Sahih al-Bukhari 6114.
  "The strong person is the one who controls their ____.": { answer: "anger", harder: ["Bukhari 6114: the strong one is not the good wrestler, but the one who controls his ____.", "friends", "money", "voice"] },
  "The strong person is the one who controls their friends.": { answer: "False", harder: "By Bukhari 6114, the strong one is the one who controls his friends." },
  // Sahih al-Bukhari 6024.
  "Allah loves ____ in every matter.": { answer: "gentleness", harder: ["Bukhari 6024: Allah is Gentle and loves ____ in every matter.", "shouting", "rushing", "harshness"] },
  // Jami` at-Tirmidhi 1987.
  "If you hurt someone, say ____ and make it right.": { answer: "sorry", harder: ["Tirmidhi 1987: follow a bad deed with a good one. If you hurt someone, say ____ and make it right.", "nothing", "goodbye", "it was a joke"] },
  // Quran 59:18.
  "Check yourself often, and ____ what went wrong.": { answer: "fix", harder: ["Quran 59:18: let every soul look at what it sent ahead. Check yourself often and ____ what went wrong.", "hide", "repeat", "forget"] },
  // Sahih al-Bukhari 6114.
  "Who is truly strong?": { answer: "One who controls himself when angry", harder: ["Bukhari 6114: not the one who overcomes people by strength. Who is strong?", "The best wrestler", "The tallest", "The loudest"] },
  "Winning a fight shows true strength.": { answer: "False", harder: "By Bukhari 6114, overcoming people by strength is what shows true strength." },
  // Sahih al-Bukhari 6116.
  "What advice did the man get?": { answer: "Do not get angry", harder: ["Bukhari 6116: a man asked the Prophet ﷺ for advice. What was it?", "Travel", "Pray more", "Give charity"] },
  "How did the Prophet ﷺ answer when the man asked again?": { answer: "The same each time", harder: ["Bukhari 6116: the man kept asking again. How did he ﷺ reply?", "He stayed silent", "He sent him away", "Something new"] },
  "The man asked only once.": { answer: "False", harder: "In Bukhari 6116 the man asked for advice only once." },
  // Sahih al-Bukhari 3282.
  "What words take anger away, in the hadith?": { answer: "I seek refuge with Allah from Shaytan", harder: ["Bukhari 3282: one man's face went red. He ﷺ knew a word that would take his anger away. What?", "Count to ten", "I am right", "Leave me alone"] },
  "What was happening when the Prophet ﷺ said this?": { answer: "Two men were arguing", harder: ["Bukhari 3282: 'I know a word that would take his anger away' was said when?", "A market opened", "It was Eid", "Rain was falling"] },
  // Sunan Abi Dawud 4782.
  "If you get angry while standing, what should you do?": { answer: "Sit down", harder: ["Abu Dawud 4782: when one of you is angry while standing, what should he do?", "Stand taller", "Run", "Shout"] },
  "If the anger stays after sitting?": { answer: "Lie down", harder: ["Abu Dawud 4782: he sat, but the anger did not go. What next?", "Leave the house", "Argue", "Stand up again"] },
  // Al-Adab Al-Mufrad 245.
  "What did he ﷺ tell an angry person to do, as Ibn Abbas reported?": { answer: "Keep silent", harder: ["Al-Adab Al-Mufrad 245: teach and make things easy. And when one of you is angry?", "Eat something", "Write a letter", "Go for a walk"] },
  "Who narrated: when one of you is angry, let him be silent?": { answer: "Ibn Abbas", harder: ["Al-Adab Al-Mufrad 245, 'when one of you is angry, he should be silent', was narrated by whom?", "Abu Hurayrah", "Abu Dharr", "Anas ibn Malik"] },
  "When angry, it is best to say whatever comes to mind.": { answer: "False", harder: "By Al-Adab Al-Mufrad 245, when angry you should say whatever comes to mind." },
  // Sahih Muslim 2594a.
  "What does gentleness do to anything it is in?": { answer: "Makes it beautiful", harder: ["Muslim 2594a: gentleness is not found in anything except that it does what?", "Makes it slow", "Nothing", "Makes it weak"] },
  "What happens when gentleness is taken away?": { answer: "Things spoil", harder: ["Muslim 2594a: gentleness is not taken from anything except that what?", "Nothing changes", "Things get faster", "Things get better"] },
  // Sahih al-Bukhari 6065.
  "How long at most may you stop talking to a Muslim brother?": { answer: "Three days", harder: ["Bukhari 6065: a Muslim may not cut off his brother for more than how long?", "One week", "One month", "Forever"] },
  "What should Muslims be to each other?": { answer: "Brothers", harder: ["Bukhari 6065: do not hate, envy or turn away; be what?", "Rivals", "Judges", "Strangers"] },
  // Sahih al-Bukhari 470.
  "Inside the masjid, speak ____ and stay calm.": { answer: "softly", harder: ["Bukhari 470: Umar told off two men for raising their voices in the masjid. So speak ____ there.", "loudly", "rudely", "angrily"] },
  "Inside the masjid, speak loudly and stay calm.": { answer: "False", harder: "Bukhari 470 shows Umar was fine with raised voices in the masjid." },
  // Quran 49:11.
  "Disagree kindly, and never ____ anyone.": { answer: "mock", harder: ["Quran 49:11: let no people mock another; perhaps they are better. Disagree kindly and never ____.", "help", "greet", "listen"] },
  // Quran 25:63.
  "Walk ____, not proudly, wherever you go.": { answer: "humbly", harder: ["Quran 25:63: the servants of the Most Merciful walk on the earth ____.", "sneakily", "angrily", "proudly"] },
  // Sahih al-Bukhari 6018.
  "Online too: say something good, or stay ____.": { answer: "quiet", harder: ["Bukhari 6018, online too: say what is good, or keep ____.", "loud", "mean", "posting"] },
  // Sahih Muslim 2162b.
  "How many rights did the Prophet ﷺ name, of one Muslim over another?": { answer: "Six", harder: ["Muslim 2162b: how many rights does a Muslim have over another Muslim?", "Two", "Ten", "Forty"] },
  "Your friend is ill. Which right does he have?": { answer: "That you visit him", harder: ["Muslim 2162b: 'when he is ill...' what is his right?", "That you text him once", "That you avoid him", "That you pay for him"] },
  "Which of these is NOT one of the six rights?": { answer: "Lending him money", harder: ["Muslim 2162b: greet, accept the invite, advise, answer the sneeze, visit, follow the funeral. Which is NOT listed?", "Following his funeral", "Greeting him with salam", "Accepting his invitation"] },
  // Sahih al-Bukhari 6231.
  "You walk past an old man sitting. Who greets first?": { answer: "You do", harder: ["Bukhari 6231: the young greet the old, the passer greets the sitter. You pass an old man sitting. Who greets?", "Whoever is taller", "He does", "No one"] },
  "A group of three meets a group of ten. Who greets first?": { answer: "The group of three", harder: ["Bukhari 6231: the small group greets the large. Three meet ten. Who greets first?", "Neither", "The oldest of the ten", "The group of ten"] },
  "The one sitting greets the one walking by.": { answer: "False", harder: "By Bukhari 6231, the one sitting greets the one passing by." },
  // Sahih al-Bukhari 6224.
  "What does the one who sneezes say?": { answer: "Alhamdulillah", harder: ["Bukhari 6224: the one who sneezes says what?", "Bismillah", "Allahu akbar", "Astaghfirullah"] },
  "What do you say to someone who sneezed and praised Allah?": { answer: "Yarhamukallah", harder: ["Bukhari 6224: when he says Alhamdulillah, his brother answers with what?", "Mashallah", "Bismillah", "Salam"] },
  "What does the sneezer say back?": { answer: "Yahdikumullah wa yuslihu balakum", harder: ["Bukhari 6224: after hearing Yarhamukallah, the sneezer replies with what?", "Subhanallah", "Jazakallah khayran", "Inshallah"] },
  // Sahih al-Bukhari 6223.
  "Which does Allah like: sneezing or yawning?": { answer: "Sneezing", harder: ["Bukhari 6223: of sneezing and yawning, which does Allah like?", "Both the same", "Neither", "Yawning"] },
  "What should you do when a yawn comes?": { answer: "Hold it back as you can", harder: ["Bukhari 6223: yawning is from Shaytan, so what should you do?", "Yawn as loud as you can", "Clap", "Say Bismillah loudly"] },
  "Yawning loudly with a Haa is good manners.": { answer: "False", harder: "By Bukhari 6223, saying Haa while yawning is good manners." },
  // Sahih al-Bukhari 6290.
  "Three friends sit together. What should two of them not do?": { answer: "Whisper and leave one out", harder: ["Bukhari 6290: when three sit together, what should two of them not do?", "Say salam", "Laugh together", "Share food"] },
  "Why is it wrong to whisper and leave one person out?": { answer: "It can make him sad", harder: ["Bukhari 6290: two should not hold secret talk leaving out the third. Why?", "Whispering is too quiet", "It wastes time", "It is not wrong"] },
  "Two of three may whisper, leaving the third out.": { answer: "False", harder: "By Bukhari 6290, two of three may hold secret talk without the third." },
  // Sahih al-Bukhari 6269.
  "You come late to a full gathering. What should you not do?": { answer: "Make someone get up", harder: ["Bukhari 6269: in a gathering, a man should not do what to sit there himself?", "Sit where there is room", "Ask people to make room", "Say salam"] },
  "What should people in a gathering do for someone new?": { answer: "Make room for him", harder: ["Bukhari 6269 forbids taking another's seat. So what do people do for one who arrives?", "Make him stand", "Send him away", "Ignore him"] },
  "You may move someone so you can sit in his place.": { answer: "False", harder: "By Bukhari 6269, you may make a man get up so you can sit in his seat." },
  // Sahih al-Bukhari 6245.
  "How many times should you ask to come in?": { answer: "Three", harder: ["Bukhari 6245: if one asks permission this many times and it is not given, let him go back. How many?", "Until they open", "Once", "Ten"] },
  "Whose door did Abu Musa knock on?": { answer: "Umar's", harder: ["Bukhari 6245: Abu Musa asked three times and was not let in. Whose door was it?", "Abu Bakr's", "Ali's", "Bilal's"] },
  "If no one answers after three times, what do you do?": { answer: "Go back", harder: ["Bukhari 6245: permission was asked three times and not given. What should one do?", "Walk in anyway", "Shout louder", "Wait all night"] },
  // Sahih al-Bukhari 2465.
  "Which of these is a right of the road?": { answer: "Returning salam", harder: ["Bukhari 2465: give the road its rights. Which of these is one?", "Blocking the path", "Staring at people", "Shouting at drivers"] },
  "Which of these is NOT a right of the road?": { answer: "Selling food to all", harder: ["Bukhari 2465: gaze lowered, no harm, salam returned, good called to. Which is NOT a right?", "Not harming people", "Calling to good", "Lowering your gaze"] },
  "The companions first said they had to sit by the roads.": { answer: "True", harder: "In Bukhari 2465 the companions said they had no choice but to sit on the roads to talk." },
  // Quran 4:58.
  "What does Allah command about trusts?": { answer: "Give them back to their owners", harder: ["Quran 4:58: what does Allah command you to do with trusts?", "Keep them safe forever", "Share them with friends", "Spend them carefully"] },
  "Which of these can be an amanah?": { answer: "A friend's secret", harder: ["Quran 4:58 commands returning trusts. Which of these can be an amanah?", "Only a house", "Nothing small", "Only gold"] },
  "The same ayah tells us to judge fairly.": { answer: "True", harder: "Quran 4:58 joins returning trusts with judging between people with justice." },
  // Sahih al-Bukhari 33.
  "How many signs of a hypocrite did the Prophet ﷺ name?": { answer: "Three", harder: ["Bukhari 33: how many signs of a hypocrite are named?", "Seven", "Ten", "One"] },
  "Which is a sign of a hypocrite?": { answer: "Breaking promises", harder: ["Bukhari 33: lying when he speaks, betraying when trusted, and what else?", "Giving charity", "Praying on time", "Smiling"] },
  "Keeping your promise is part of good character.": { answer: "True", harder: "By Bukhari 33, breaking promises is a sign of a hypocrite, so keeping them is good character." },
  // Sahih Muslim 102.
  "What did the Prophet ﷺ find inside the heap of food?": { answer: "Wet grain", harder: ["Muslim 102: he ﷺ put his hand in a heap of food and his fingers got wet. What was inside?", "Stones", "Gold", "Insects"] },
  "What should the seller have done with the wet part?": { answer: "Put it on top to be seen", harder: ["Muslim 102: 'why not put it on top so people can see it?' What should the seller have done?", "Thrown it in the sea", "Sold it at night", "Hidden it better"] },
  "Hiding a fault in what you sell is fine if no one asks.": { answer: "False", harder: "By Muslim 102, hiding a fault in your goods is fine as long as no one asks." },
  // Sahih al-Bukhari 2079.
  "What brings blessing into a sale?": { answer: "Truth and showing faults", harder: ["Bukhari 2079: what makes the deal of a buyer and seller blessed?", "A high price", "A fast deal", "A loud market"] },
  "What happens if they lie and hide faults?": { answer: "The blessing is lost", harder: ["Bukhari 2079: if buyer and seller lie and hide faults, what happens?", "They earn more", "Nothing happens", "The price goes up"] },
  "Who narrated the hadith about honest buying and selling?": { answer: "Hakim ibn Hizam", harder: ["Bukhari 2079, 'if they speak the truth and make clear the faults', was narrated by whom?", "Abu Musa", "Abu Jahl", "Ka'b ibn Malik"] },
  // Sunan Ibn Majah 2443.
  "When should a worker be paid?": { answer: "Before his sweat dries", harder: ["Ibn Majah 2443: give the worker his wages when?", "Only if he asks", "When you feel like it", "Next year"] },
  "What does before his sweat dries teach?": { answer: "Pay quickly and fully", harder: ["Ibn Majah 2443: 'before his sweat dries.' What does it teach?", "Pay only in food", "Work in the heat", "Pay half now"] },
  "Making a worker wait for his pay is good manners.": { answer: "False", harder: "By Ibn Majah 2443, it is good manners to make a worker wait for his wages." },
  // Sahih al-Bukhari 2227.
  "Who is one of the three Allah is against?": { answer: "One who does not pay a worker", harder: ["Bukhari 2227: Allah will be against three. Who is one of them?", "One who works hard", "One who gives gifts", "One who travels"] },
  "Which promise is also named among the three?": { answer: "A promise made in Allah's name", harder: ["Bukhari 2227: beside the unpaid worker, Allah is against one who betrays which promise?", "A promise to a child", "A promise to visit", "A promise of a gift"] },
  "A hadith qudsi is words of Allah told by the Prophet ﷺ.": { answer: "True", harder: "Bukhari 2227 is a hadith qudsi: Allah's words, told to us by the Prophet ﷺ." },
  // Sunan Abi Dawud 4990.
  "What kind of joke is warned against?": { answer: "A joke with a lie in it", harder: ["Abu Dawud 4990: 'woe to the one who speaks and lies to make people laugh.' Which joke is warned against?", "Any joke at all", "A short joke", "A joke about food"] },
  "How many times did he ﷺ say woe to him?": { answer: "Three", harder: ["Abu Dawud 4990: how many times is 'woe to him' said?", "Once", "Seven", "Ten"] },
  "A Muslim may joke if what he says is true.": { answer: "True", harder: "By Abu Dawud 4990, the warning is for lying to make people laugh, so a true joke is allowed." },
  // Sahih Muslim 91.
  "What is pride, as the Prophet ﷺ explained it?": { answer: "Rejecting truth and looking down on people", harder: ["Muslim 91: 'Allah is beautiful and loves beauty.' Then he ﷺ said pride is what?", "Being happy", "Having money", "Wearing nice clothes"] },
  "Is liking nice clothes pride?": { answer: "No, Allah loves beauty", harder: ["Muslim 91: a man said a person likes his clothes and shoes to be nice. Is that pride?", "Only for men", "Yes, always", "Only on Friday"] },
  "How much pride keeps a person from Jannah?": { answer: "Even a mustard seed", harder: ["Muslim 91: how much pride in the heart keeps a person from Jannah?", "A mountain of it", "A bucket", "None at all"] },
  // Sahih Muslim 2588.
  "What does Allah do for someone humble for His sake?": { answer: "Raises him", harder: ["Muslim 2588: no one is humble for Allah's sake except that Allah does what?", "Forgets him", "Makes him famous on earth only", "Makes him poor"] },
  "Does charity make your wealth less?": { answer: "No", harder: ["Muslim 2588 opens: does charity lessen wealth?", "Only big charity", "Yes, always", "Only on Fridays"] },
  "Forgiving people lowers your honour.": { answer: "False", harder: "By Muslim 2588, Allah lowers the honour of one who forgives." },
  // Sahih al-Bukhari 676.
  "What did the Prophet ﷺ do at home?": { answer: "Helped his family", harder: ["Bukhari 676: al-Aswad asked what he ﷺ did in his house. Aishah said what?", "Stayed out all day", "Only rested", "Only gave orders"] },
  "What did he ﷺ do when prayer time came?": { answer: "Went out to pray", harder: ["Bukhari 676: he ﷺ served his family at home, and when prayer time came?", "Slept", "Ate first", "Kept working"] },
  "Who told al-Aswad how he ﷺ was at home?": { answer: "Aishah", harder: ["Bukhari 676: who was asked by al-Aswad about the Prophet ﷺ at home?", "Abu Hurairah", "Anas", "Bilal"] },
  // Sahih al-Bukhari 2262.
  "What work did every prophet do, the Prophet ﷺ said?": { answer: "Looking after sheep", harder: ["Bukhari 2262: Allah sent no prophet who did not do what?", "Trading gold", "Making swords", "Building ships"] },
  "Whose sheep did the Prophet ﷺ look after?": { answer: "The people of Makkah's", harder: ["Bukhari 2262: 'And you?' 'Yes, I looked after the sheep of...' whom?", "The king of Persia's", "His own only", "Madinah's people's"] },
  "What was he ﷺ paid for it?": { answer: "A few qirats", harder: ["Bukhari 2262: he ﷺ looked after sheep for what pay?", "A palace", "A hundred camels", "Nothing ever"] },
  // Sahih Muslim 2865d.
  "What did Allah reveal about how we treat each other?": { answer: "Be humble with each other", harder: ["Muslim 2865d: 'Allah revealed to me that you should...' what?", "Compete to be first", "Stay away from people", "Speak loudly"] },
  "Because of humility, no one should do what?": { answer: "Boast over another", harder: ["Muslim 2865d: be humble so that no one wrongs another and no one does what?", "Greet another", "Visit another", "Help another"] },
  "Who narrated the hadith about being humble?": { answer: "Iyad ibn Himar", harder: ["Muslim 2865d, 'Allah revealed to me that you should be humble', was narrated by whom?", "Al-Aqra ibn Habis", "Abu Lahab", "Hakim ibn Hizam"] },
  // Quran 31:18.
  "Who gave this advice to his son?": { answer: "Luqman", harder: ["Quran 31:18: 'do not turn your cheek away from people in pride.' Who said this to his son?", "Firawn", "Qarun", "Haman"] },
  "Whom does Allah not love, in the ayah?": { answer: "The proud who boast", harder: ["Quran 31:18: 'do not walk proudly on the earth.' Allah does not love whom?", "The quiet", "The poor", "The young"] },
  "Turning your face away from people in pride is good.": { answer: "False", harder: "By Quran 31:18, turning your cheek away from people in pride is a good thing." },
  // Jami at-Tirmidhi 2001.
  "What did he ﷺ say of one who does these things?": { answer: "There is no pride in him", harder: ["Tirmidhi 2001: whoever rides a donkey, wears a cloak and milks sheep. What did he ﷺ say of him?", "He will have many friends", "He will grow rich", "He will be famous"] },
  "What did Jubayr say he rode?": { answer: "A donkey", harder: ["Tirmidhi 2001: people called Jubayr proud. What did he say he had ridden?", "A fast camel", "A strong mule", "A fine horse"] },
  "Jubayr said he milked the sheep.": { answer: "True", harder: "In Tirmidhi 2001 Jubayr ibn Mut'im said he had milked the sheep." },
  // Sahih Muslim 2999.
  "What does a believer do when something good happens?": { answer: "Thanks Allah", harder: ["Muslim 2999: all the believer's affair is good. When good comes, what does he do?", "Hides it", "Shows off", "Forgets Allah"] },
  "What does a believer do when something hard happens?": { answer: "Is patient", harder: ["Muslim 2999: when something bad happens to the believer, what does he do?", "Blames others", "Stops praying", "Gives up"] },
  "For a believer, both good and hard times can be good.": { answer: "True", harder: "By Muslim 2999, the believer's affair is all good, in ease and in hardship." },
  // Sahih al-Bukhari 1283.
  "When is real patience shown?": { answer: "At the first moment", harder: ["Bukhari 1283: 'patience is at the first stroke of a calamity.' When is real patience shown?", "A year later", "Only at night", "After you complain"] },
  "Why did the woman speak harshly to him ﷺ?": { answer: "She did not know him", harder: ["Bukhari 1283: the woman at the grave told him ﷺ to go away. Why?", "She was a stranger in Makkah", "She was joking", "She was angry at Islam"] },
  "The woman later came to his ﷺ house.": { answer: "True", harder: "In Bukhari 1283 the woman later came to him ﷺ and said she had not known him." },
  // Quran 2:157.
  "What do the patient receive, in Quran 2:157?": { answer: "Blessings and mercy", harder: ["Quran 2:157: the patient who say 'to Allah we belong' receive what?", "Gold and silver", "Fame and praise", "Land and houses"] },
  "Who gives the patient blessings, in Quran 2:157?": { answer: "Their Lord, Allah", harder: ["Quran 2:157: blessings and mercy come to the patient from whom?", "Their own friends", "Their own families", "Their own tribes"] },
  "Quran 2:157 calls the patient the rightly guided.": { answer: "True", harder: "Quran 2:157 ends by calling the patient the rightly guided." },
  // Sahih al-Bukhari 1469.
  "What is the best gift a person can be given?": { answer: "Patience", harder: ["Bukhari 1469: 'no one is given a gift better and wider than...' what?", "Wealth", "Children", "Health"] },
  "What does Allah do for one who tries to be patient?": { answer: "Makes him patient", harder: ["Bukhari 1469: 'whoever tries to be patient...' Allah does what?", "Makes him rich at once", "Nothing", "Makes him sad"] },
  "The Prophet ﷺ kept back some of what he had from the Ansar.": { answer: "False", harder: "In Bukhari 1469 the Prophet ﷺ held some back from the Ansar who asked him." },
  // Sahih al-Bukhari 5641.
  "What does even a thorn's prick do for a Muslim?": { answer: "Wipes away some sins", harder: ["Bukhari 5641: even the prick of a thorn that hurts a Muslim does what?", "Takes away reward", "Makes him weak", "Nothing"] },
  "Which of these is also named in the hadith?": { answer: "Sadness", harder: ["Bukhari 5641: tiredness, illness, worry, hurt, distress, and what else is named?", "Wealth", "Laughter", "Travel"] },
  "Hard moments can be a mercy for a believer.": { answer: "True", harder: "By Bukhari 5641, even a thorn's prick can wipe away some of a Muslim's sins." },
  // Sahih Muslim 2963c.
  "To stay thankful, whom should you look at?": { answer: "Those who have less", harder: ["Muslim 2963c: so as not to belittle Allah's blessings, whom should you look at?", "No one", "Only the richest", "Only famous people"] },
  "What does looking only at those above you lead to?": { answer: "Belittling Allah's blessings", harder: ["Muslim 2963c: looking at those above you, not below, leads to what?", "Being humble", "Being thankful", "Getting rich"] },
  "Looking at those with less helps you be thankful.": { answer: "True", harder: "By Muslim 2963c, looking at those below you helps you not belittle Allah's blessings." },
  // Sunan Abi Dawud 4811.
  "Someone helps you. What should you do?": { answer: "Thank them", harder: ["Abu Dawud 4811: 'whoever does not thank people has not thanked Allah.' Someone helps you. What do you do?", "Ignore them", "Thank only Allah, not them", "Ask for more"] },
  "What is a good way to thank someone?": { answer: "Jazakallahu khayran", harder: ["Abu Dawud 4811 teaches thanking people. Which words thank someone?", "Astaghfirullah", "Inna lillah", "A'udhu billah"] },
  "Thanking people has nothing to do with thanking Allah.": { answer: "False", harder: "By Abu Dawud 4811, thanking people is not connected to thanking Allah." },
  // Jami at-Tirmidhi 2486.
  "Who is the grateful eater like, he ﷺ said?": { answer: "A patient fasting person", harder: ["Tirmidhi 2486: the one who eats and is grateful is like whom?", "A strong builder", "A busy trader", "A tired traveler"] },
  "What makes the eater like the patient faster?": { answer: "Being grateful", harder: ["Tirmidhi 2486: what makes the eater like the patient fasting person?", "Eating quickly", "Eating alone", "Eating early"] },
  "A grateful eater is like a person who fasts with patience.": { answer: "True", harder: "In Tirmidhi 2486 the grateful eater is likened to the patient fasting person." },
  // Sahih Muslim 2664.
  "What should you say after something goes wrong?": { answer: "Allah decreed and did what He willed", harder: ["Muslim 2664: if something befalls you, do not say 'if only'. What do you say instead?", "If only I had done it differently", "It is all their fault", "Nothing matters"] },
  "Which believer is more loved by Allah?": { answer: "The strong believer", harder: ["Muslim 2664: 'in both there is good', but which believer is better and more loved?", "The loudest believer", "The one who gives up", "The richest believer"] },
  "Saying if only opens a door to Shaytan.": { answer: "True", harder: "By Muslim 2664, saying 'if only' opens the door to Shaytan." },
  // Sahih al-Bukhari 13.
  "When is a person's faith complete, in this hadith?": { answer: "When he wants for others what he wants", harder: ["Bukhari 13: none of you truly believes until he does what?", "When he lives alone", "When he wins", "When he is rich"] },
  "Your friend gets the prize you wanted. What fits this lesson?": { answer: "Be happy for him", harder: ["Bukhari 13: wish for your brother what you wish for yourself. Your friend wins the prize you wanted. What fits?", "Say it is unfair", "Be jealous", "Stop talking to him"] },
  "Wanting good only for yourself is complete faith.": { answer: "False", harder: "By Bukhari 13, wishing good only for yourself is a sign of complete faith." },
  // Sahih Muslim 2586a.
  "The believers are like what, in their care for each other?": { answer: "One body", harder: ["Muslim 2586a: in love, mercy and care, the believers are like what?", "A market", "Two teams", "A crowd"] },
  "When one part of the body hurts, what happens?": { answer: "The whole body feels it", harder: ["Muslim 2586a: when one part of the body aches, what happens?", "Nothing", "Only that part", "It falls off"] },
  "Muslims should care when other Muslims suffer.": { answer: "True", harder: "By Muslim 2586a, when one believer aches, the whole body of believers aches with him." },
  // Sahih al-Bukhari 6026.
  "A believer to a believer is like what?": { answer: "A building", harder: ["Bukhari 6026: a believer to a believer is like what, whose parts hold each other up?", "A river", "A tree", "A road"] },
  "What did the Prophet ﷺ do with his hands to show it?": { answer: "Laced his fingers", harder: ["Bukhari 6026: what did he ﷺ do with his fingers to show it?", "Clapped", "Raised one hand", "Drew a house"] },
  "When a man came asking, the Prophet ﷺ told them to help him.": { answer: "True", harder: "In Bukhari 6026, when a man came asking, he ﷺ said: help him and speak for him." },
  // Sahih al-Bukhari 2444.
  "How do you help a brother who is wronging others?": { answer: "Stop him from doing it", harder: ["Bukhari 2444: 'help your brother whether he wrongs or is wronged.' How when he wrongs?", "Look away", "Join him", "Cheer him on"] },
  "Your friend is bullying someone. What fits this lesson?": { answer: "Stop your friend", harder: ["Bukhari 2444: help him by stopping him from wronging others. Your friend is bullying someone. What fits?", "Film it", "Walk off silently", "Laugh along"] },
  "Helping a brother means always taking his side.": { answer: "False", harder: "By Bukhari 2444, helping your brother means taking his side even when he wrongs others." },
  // Sahih al-Bukhari 2442.
  "You help a friend with what he needs. What does Allah do?": { answer: "Meets your needs", harder: ["Bukhari 2442: whoever meets his brother's need, what does Allah do?", "Makes you tired", "Nothing", "Takes your reward"] },
  "You know a friend's private mistake. What should you do?": { answer: "Cover it", harder: ["Bukhari 2442: whoever covers a Muslim, Allah covers him. You know a friend's private mistake. What fits?", "Post it online", "Tell everyone", "Laugh about it"] },
  "A Muslim may hand his brother over to someone who harms him.": { answer: "False", harder: "By Bukhari 2442, a Muslim may hand his brother over to one who harms him." },
  // Sahih Muslim 2564a.
  "Where did the Prophet ﷺ point when he said: taqwa is here?": { answer: "His chest", harder: ["Muslim 2564a: 'taqwa is here,' three times. Where did he ﷺ point?", "His head", "The sky", "The Kaaba"] },
  "What is evil enough for a Muslim, in this hadith?": { answer: "Looking down on his brother", harder: ["Muslim 2564a: 'it is evil enough for a man to...' what?", "Being poor", "Being tired", "Asking a question"] },
  "Which of these did the Prophet ﷺ forbid in this hadith?": { answer: "Envying one another", harder: ["Muslim 2564a: do not envy, do not hate, do not turn away. Which is forbidden here?", "Visiting one another", "Giving gifts", "Greeting one another"] },
  // Sahih Muslim 2567a.
  "Why was the man visiting his brother?": { answer: "He loved him for Allah", harder: ["Muslim 2567a: 'Do you want something from him?' 'No.' Then why was he visiting?", "He was lost", "To ask for money", "To trade"] },
  "Whom did Allah send to meet him on the road?": { answer: "An angel", harder: ["Muslim 2567a: Allah sent whom to wait on the man's road?", "A prophet", "A trader", "A king"] },
  "What did the angel tell him?": { answer: "Allah loves you as you love him", harder: ["Muslim 2567a: 'I am a messenger from Allah to you.' What was the message?", "Go back home", "Your brother has moved", "Bring a gift"] },
  // Al-Adab Al-Mufrad 544.
  "Of two who love each other, who is the better one?": { answer: "The one who loves more", harder: ["Al-Adab Al-Mufrad 544: of two who love one another, the better is whom?", "The one who is older", "The one who is richer", "The one who is taller"] },
  "Who narrated the hadith on the one who loves more?": { answer: "Anas ibn Malik", harder: ["Al-Adab Al-Mufrad 544, 'the better is the one whose love is stronger', was narrated by whom?", "Jabir ibn Abdullah", "Ibn Abbas", "Abu Hurayrah"] },
  "Loving your companion more strongly makes you the better of the two.": { answer: "True", harder: "By Al-Adab Al-Mufrad 544, the one whose love for his companion is stronger is the better of the two." },
  // Al-Adab Al-Mufrad 401.
  "What splits two who love each other for Allah, he ﷺ said?": { answer: "A sin one of them does", harder: ["Al-Adab Al-Mufrad 401: what splits apart two who love each other in Allah?", "A job one of them starts", "A trip one of them takes", "A house one of them buys"] },
  "How did he ﷺ describe the love of the two, as Anas reported?": { answer: "In Allah, or in Islam", harder: ["Al-Adab Al-Mufrad 401: the two love each other how?", "In play, or in sport", "In work, or in study", "In trade, or in travel"] },
  "Sins can harm a friendship made for Allah's sake.": { answer: "True", harder: "By Al-Adab Al-Mufrad 401, the first wrong action of one of them can split two who love for Allah." },
  // Sahih Muslim 223.
  "How much of faith is purity?": { answer: "Half", harder: ["Muslim 223: 'purity is ____ of faith.'", "A tenth", "None", "A little bit"] },
  "What fills the scale, in the same hadith?": { answer: "Alhamdulillah", harder: ["Muslim 223: purity is half of faith, and what fills the scale?", "Water", "Gold", "Silence"] },
  "In the same hadith, prayer is called a light.": { answer: "True", harder: "In Muslim 223, after purity and Alhamdulillah, prayer is called a light." },
  // Sahih al-Bukhari 887.
  "What is a siwak used for?": { answer: "Cleaning teeth", harder: ["Bukhari 887: he ﷺ would have ordered the siwak for every prayer. What is it for?", "Writing", "Cooking", "Combing hair"] },
  "Why did he ﷺ not order siwak before every prayer?": { answer: "So it would not be hard on us", harder: ["Bukhari 887: 'if it were not hard on my people...' Why was siwak not ordered for every prayer?", "He did not like it", "Siwak was too costly", "It was only for him"] },
  "Using the siwak before prayer is a loved sunnah.": { answer: "True", harder: "By Bukhari 887, he ﷺ would have ordered the siwak for every prayer were it not hard on us." },
  // Sahih al-Bukhari 5889.
  "Which of these is part of the fitrah?": { answer: "Clipping the nails", harder: ["Bukhari 5889: five things are of the fitrah. Which is one of them?", "Growing long nails", "Never bathing", "Painting the teeth"] },
  "What does fitrah mean?": { answer: "The natural way Allah made us", harder: ["Bukhari 5889: clipping nails and trimming the moustache are of the fitrah. Fitrah means what?", "A prayer time", "A kind of food", "A city"] },
  "How many fitrah practices are named in the hadith?": { answer: "Five", harder: ["Bukhari 5889: how many things of the fitrah does it name?", "Ten", "Forty", "Two"] },
  // Sahih al-Bukhari 855.
  "Why stay away from the masjid after raw garlic?": { answer: "Its smell bothers others", harder: ["Bukhari 855: one who ate garlic should keep away from the masjid. Why?", "Garlic is haram", "The masjid is closed", "It makes you sleepy"] },
  "Which two foods are named in the hadith?": { answer: "Garlic and onion", harder: ["Bukhari 855: whoever eats which foods should keep away from the masjid?", "Bread and honey", "Rice and meat", "Dates and milk"] },
  "Garlic itself is haram to eat.": { answer: "False", harder: "By Bukhari 855, garlic is haram to eat." },
  // Sahih Muslim 2734a.
  "What pleases Allah after you eat or drink?": { answer: "Saying Alhamdulillah", harder: ["Muslim 2734a: Allah is pleased with a servant who eats a meal and then does what?", "Eating fast", "Talking loudly", "Leaving the plate"] },
  "Is it only after food, or after drinks too?": { answer: "After drinks too", harder: ["Muslim 2734a: praise after eating, and after what else?", "Only after food", "Only on Eid", "Only at night"] },
  "Thanking Allah after a meal is a small but loved deed.": { answer: "True", harder: "By Muslim 2734a, Allah is pleased with one who praises Him after a meal." },
  // Sahih al-Bukhari 6117.
  "What does haya bring?": { answer: "Only good", harder: ["Bukhari 6117: haya does not bring anything except what?", "Weakness", "Nothing", "Only trouble"] },
  "What is haya?": { answer: "Shyness from doing wrong", harder: ["Bukhari 6117 praises haya. What is haya?", "Fear of people", "Being rude", "Being lazy"] },
  "Haya stops a person from doing bad deeds.": { answer: "True", harder: "By Bukhari 6117, haya brings only good, as it holds a person back from wrong." },
  // Sahih al-Bukhari 6120.
  "Where does the saying about having no haya come from?": { answer: "The early prophets", harder: ["Bukhari 6120: 'if you feel no shame, do whatever you wish' is kept from where?", "A poet of Makkah", "A king of Persia", "A Roman book"] },
  "What does the saying warn about?": { answer: "Having no haya at all", harder: ["Bukhari 6120: 'if you feel no shame, do as you wish.' What does it warn about?", "Eating too much", "Travelling alone", "Being too shy to pray"] },
  "The saying means doing whatever you want is good.": { answer: "False", harder: "By Bukhari 6120, doing whatever you wish is good once you feel no shame." },
  // Sahih al-Bukhari 3562.
  "How shy was the Prophet ﷺ?": { answer: "Shyer than a girl behind her curtain", harder: ["Bukhari 3562: how shy was the Prophet ﷺ?", "Shy only with kings", "Shy only as a child", "Not shy at all"] },
  "Who described his ﷺ shyness?": { answer: "Abu Sa'id al-Khudri", harder: ["Bukhari 3562: who said he ﷺ was shyer than a girl behind her curtain?", "Al-Aqra ibn Habis", "Abu Jahl", "Hakim ibn Hizam"] },
  "Haya was part of the Prophet's ﷺ character.": { answer: "True", harder: "By Bukhari 3562, the Prophet ﷺ was shyer than a young girl behind her curtain." },
  // Quran 24:30.
  "What are believing men told to lower?": { answer: "Their gaze", harder: ["Quran 24:30: tell the believing men to lower what?", "Their voices only", "Their heads in sujud", "Their prices"] },
  "Why is lowering the gaze good for men, says the ayah?": { answer: "It is purer for them", harder: ["Quran 24:30: lower the gaze and guard chastity. Why?", "It saves time", "It looks humble", "It is a custom"] },
  "Lowering the gaze is only asked of women.": { answer: "False", harder: "By Quran 24:30, lowering the gaze is asked only of women, not men." },
  // Quran 24:31.
  "Which ayah tells believing women to lower their gaze?": { answer: "Quran 24:31", harder: ["Tell the believing women to lower their gaze and guard their chastity. Which ayah says this?", "Quran 2:255", "Quran 1:1", "Quran 112:1"] },
  "Is haya for men, women or both?": { answer: "Both", harder: ["Quran 24:30 tells the men to lower their gaze; Quran 24:31 tells the women. So haya is for whom?", "Men only", "Women only", "Children only"] },
  "Women are also told to cover their adornment.": { answer: "True", harder: "By Quran 24:31, believing women are told not to show their adornment except what normally appears." },
  // Sahih al-Bukhari 5649.
  "What should we do for the sick, says Bukhari 5649?": { answer: "Visit them", harder: ["Bukhari 5649: feed the hungry, free captives, and what for the sick?", "Laugh at them", "Avoid them", "Forget them"] },
  "What should we do for the hungry?": { answer: "Feed them", harder: ["Bukhari 5649: visit the sick, free captives, and what for the hungry?", "Send them away", "Tell them to wait", "Ignore them"] },
  "Freeing a captive is one of the deeds in Bukhari 5649.": { answer: "True", harder: "Bukhari 5649 names setting free the captives with feeding the hungry and visiting the sick." },
  // Sahih al-Bukhari 1356.
  "Whom did he ﷺ go to visit?": { answer: "A sick boy who served him", harder: ["Bukhari 1356: whom did he ﷺ visit and sit beside?", "A rich king", "A famous poet", "A strong soldier"] },
  "Where did he ﷺ sit during the visit?": { answer: "Near the boy's head", harder: ["Bukhari 1356: where did he ﷺ sit when visiting the sick boy?", "Far across the room", "On the roof", "Outside the house"] },
  "He ﷺ visited people even if they were not Muslim.": { answer: "True", harder: "In Bukhari 1356 he ﷺ visited a Jewish boy who was ill." },
  // Sahih al-Bukhari 5664.
  "How did he ﷺ come to visit Jabir?": { answer: "Walking on foot", harder: ["Bukhari 5664: 'riding neither a mule nor a horse.' How did he ﷺ come?", "On a mule", "In a carriage", "On a horse"] },
  "Who was ill in Bukhari 5664?": { answer: "Jabir", harder: ["Bukhari 5664: he ﷺ came walking to visit whom when he was sick?", "Umar", "Bilal", "Khalid"] },
  "Walking to visit someone shows humility and care.": { answer: "True", harder: "In Bukhari 5664 he ﷺ walked to visit Jabir, riding neither a mule nor a horse." },
  // Sahih al-Bukhari 5656.
  "What did he ﷺ say to comfort the sick?": { answer: "No harm, it is a cleansing", harder: ["Bukhari 5656: what did he ﷺ say whenever he visited a sick person?", "You will never get better", "It is your own fault", "Go away"] },
  "What can an illness do for a believer?": { answer: "Wipe away sins", harder: ["Bukhari 5656: 'no harm, it is a purification.' What can illness do for a believer?", "Add sins", "Take away faith", "Nothing at all"] },
  "Kind, hopeful words help a sick person.": { answer: "True", harder: "In Bukhari 5656 he ﷺ comforted the sick with hopeful words: no harm, it is a purification." },
  // Sahih al-Bukhari 5675.
  "Whom do we ask for healing in the du'a?": { answer: "Allah, Lord of the people", harder: ["Bukhari 5675: 'take away the harm, O Lord of the people.' Whom do we ask?", "The stars", "A lucky charm", "The doctor only"] },
  "What kind of healing does the du'a ask for?": { answer: "Healing that leaves no illness", harder: ["Bukhari 5675: 'there is no healing but Your healing,' a healing that does what?", "Half a healing", "Healing for money", "Healing for one day"] },
  "Only Allah truly heals.": { answer: "True", harder: "Bukhari 5675 says: there is no healing but Your healing, O Allah." },
  // Sahih al-Bukhari 5746.
  "By whose permission does the sick one get well, in this ruqyah?": { answer: "By our Lord's permission", harder: ["Bukhari 5746: the earth of our land and saliva cure our sick one by whose permission?", "By the neighbor's permission", "By the king's permission", "By the family's permission"] },
  "Which two things does his ﷺ ruqyah name?": { answer: "Earth and saliva", harder: ["Bukhari 5746: which two things does his ﷺ ruqyah name?", "Salt and bread", "Milk and dates", "Ink and paper"] },
  "His ﷺ ruqyah began with: in the name of Allah.": { answer: "True", harder: "In Bukhari 5746 his ﷺ ruqyah began: in the name of Allah." },
  // Sunan Abi Dawud 3104.
  "What did he ﷺ ask Allah to complete for Sa'd?": { answer: "His hijrah", harder: ["Abu Dawud 3104: 'O Allah, heal Sa'd and complete his...' what?", "His fast", "His new house", "His harvest"] },
  "Where was Sa'd when he fell ill?": { answer: "In Makkah", harder: ["Abu Dawud 3104: where did Sa'd fall ill?", "In Ta'if", "In Tabuk", "In Khaybar"] },
  "He ﷺ came to visit Sa'd when he was ill.": { answer: "True", harder: "In Abu Dawud 3104 he ﷺ put his hand on Sa'd's forehead when he visited him ill." },
  // Al-Adab Al-Mufrad 522.
  "What does one who visits a sick person dive into, he ﷺ said?": { answer: "Mercy", harder: ["Al-Adab Al-Mufrad 522: whoever visits a sick person dives into what?", "Sadness", "Fear", "Darkness"] },
  "When does the visitor settle in mercy, he ﷺ said?": { answer: "When he sits with the sick", harder: ["Al-Adab Al-Mufrad 522: the visitor dives into mercy, and settles in it when?", "When he leaves the house", "When he buys a gift", "When he goes back home"] },
  "Visiting a sick person brings mercy to the visitor.": { answer: "True", harder: "By Al-Adab Al-Mufrad 522, the one who visits a sick person dives into mercy." },
  // Quran 24:27.
  "What must we do before entering someone else's house?": { answer: "Ask permission and greet", harder: ["Quran 24:27: before entering houses other than your own, what must you do?", "Shout their name and enter", "Just walk in", "Climb the window"] },
  "Which surah teaches asking permission?": { answer: "An-Nur", harder: ["'Do not enter houses other than your own until you ask permission' (24:27) is in which surah?", "Al-Fil", "Al-Masad", "Quraysh"] },
  "Allah says asking permission is better for us.": { answer: "True", harder: "Quran 24:27 says asking permission and greeting is better for you." },
  // Sahih al-Bukhari 6245.
  "What should you do if no one lets you in?": { answer: "Go back home", harder: ["Bukhari 6245: ask permission three times; if it is not given, then what?", "Break the door", "Wait all night", "Climb in"] },
  "Abu Musa went back after asking Umar three times.": { answer: "True", harder: "In Bukhari 6245 Abu Musa went back after asking permission at Umar's door three times." },
  // Sahih al-Bukhari 6250.
  "What did Jabir answer when asked who it was?": { answer: "Me", harder: ["Bukhari 6250: 'Who is it?' What did Jabir answer at the door?", "Jabir", "A friend", "Nothing"] },
  "What is the better answer at the door?": { answer: "Say your name", harder: ["Bukhari 6250: he ﷺ disliked 'me, me?' So what is better when asked who is at the door?", "Say me", "Stay silent", "Knock louder"] },
  "He ﷺ was happy with the answer me.": { answer: "False", harder: "In Bukhari 6250 he ﷺ was pleased when Jabir answered 'me' at the door." },
  // Al-Adab Al-Mufrad 1080.
  "How did people knock on his ﷺ door, Anas said?": { answer: "With their fingernails", harder: ["Al-Adab Al-Mufrad 1080: how did people knock on the Prophet's ﷺ door?", "With a gentle call", "With a small bell", "With a soft clap"] },
  "Who reported how people knocked on his ﷺ door?": { answer: "Anas ibn Malik", harder: ["Al-Adab Al-Mufrad 1080, 'they knocked on his door with their fingernails', was reported by whom?", "Abu Hurayrah", "Ibn Umar", "Ibn Abbas"] },
  "People took care to knock softly on his ﷺ door.": { answer: "True", harder: "By Al-Adab Al-Mufrad 1080, people knocked on his ﷺ door softly, with their fingernails." },
  // Quran 24:28.
  "What do we do if the people say: go back?": { answer: "Go back calmly", harder: ["Quran 24:28: 'if you are told: go back...' what do we do?", "Keep knocking", "Get angry", "Force our way in"] },
  "How does Allah describe going back?": { answer: "Purer for you", harder: ["Quran 24:28: 'then go back; it is...' what for you?", "Rude", "Weak", "Shameful"] },
  "People have the right to say not now.": { answer: "True", harder: "By Quran 24:28, when people say go back, we go back, as they have the right to refuse." },
  // Sahih al-Bukhari 6311.
  "What should we do before going to bed?": { answer: "Make wudu", harder: ["Bukhari 6311: 'when you go to bed, make ____ as for prayer.'", "Nothing at all", "Eat a big meal", "Watch a screen"] },
  "Which side should we lie on?": { answer: "The right side", harder: ["Bukhari 6311: after wudu for bed, lie on which side?", "The left side", "On our back", "Face down"] },
  "The du'a should be the last words we say before sleep.": { answer: "True", harder: "Bukhari 6311 says to let the du'a 'O Allah, I submit myself to You' be the last words before sleep." },
  // Sahih al-Bukhari 6320.
  "What should we do to the bed before lying down?": { answer: "Shake it out", harder: ["Bukhari 6320: before lying down, what should you do to the bed with the edge of your sheet?", "Jump on it", "Leave it messy", "Pour water on it"] },
  "Why shake out the bed?": { answer: "Something may have got on it", harder: ["Bukhari 6320: shake out the bed, 'for he does not know...' what?", "To make noise", "To wake others", "For fun"] },
  "The du'a begins: in Your name, my Lord.": { answer: "True", harder: "In Bukhari 6320 the du'a begins: in Your name, my Lord, I lay down my side." },
  // Sahih al-Bukhari 5017.
  "Which surahs did he ﷺ read before sleep?": { answer: "Al-Ikhlas, Al-Falaq and An-Nas", harder: ["Bukhari 5017: he ﷺ cupped his hands, blew into them and recited which surahs?", "Al-Kahf and Yasin", "Al-Baqarah and Al-Imran", "Yusuf and Maryam"] },
  "Where did he ﷺ begin wiping?": { answer: "His head and face", harder: ["Bukhari 5017: after blowing into his hands, he ﷺ wiped his body starting where?", "His knees", "His back", "His feet"] },
  "He ﷺ did it three times.": { answer: "True", harder: "In Bukhari 5017 he ﷺ recited, blew and wiped over his body three times." },
  // Sahih al-Bukhari 6324.
  "What did he ﷺ say first on waking?": { answer: "Praise to Allah who gave us life", harder: ["Bukhari 6324: on waking, what did he ﷺ say?", "Five more minutes", "Nothing", "Where is breakfast?"] },
  "What is sleep compared to in the du'a?": { answer: "A kind of death", harder: ["Bukhari 6324: 'in Your name, O Allah, I die and I live.' Sleep is likened to what?", "A punishment", "A game", "A journey abroad"] },
  "Before sleep he ﷺ said: in Your name, O Allah, I die and I live.": { answer: "True", harder: "In Bukhari 6324 the words 'in Your name, O Allah, I die and I live' were said before sleep." },
  // Sunan Abi Dawud 5054.
  "Where did he ﷺ ask Allah to place him?": { answer: "In the highest assembly", harder: ["Abu Dawud 5054: at bedtime he ﷺ asked Allah to place him where?", "In a high fort", "In a green valley", "In a big city"] },
  "What did he ﷺ say he had laid down for Allah?": { answer: "His side", harder: ["Abu Dawud 5054: 'in the name of Allah, I have laid down my ____ for Allah.'", "His staff", "His sword", "His cloak"] },
  "He ﷺ said these words on going to bed at night.": { answer: "True", harder: "By Abu Dawud 5054, this du'a was said when he ﷺ went to his bed at night." },
  // Sahih al-Bukhari 2585.
  "What did he ﷺ do when given a gift?": { answer: "Accepted it and gave back", harder: ["Bukhari 2585: what did he ﷺ do when he was given a gift?", "Refused it", "Threw it away", "Asked for more"] },
  "Who told us about his gifts?": { answer: "Aishah", harder: ["Bukhari 2585, 'he ﷺ used to accept gifts and give back', was narrated by whom?", "Ibn Umar", "Anas", "Abu Hurairah"] },
  "Giving something back is part of the sunnah of gifts.": { answer: "True", harder: "By Bukhari 2585, he ﷺ used to give something in return for gifts." },
  // Sahih al-Bukhari 2568.
  "Would he ﷺ accept a very small gift?": { answer: "Yes, even a sheep's foot", harder: ["Bukhari 2568: would he ﷺ accept a gift as small as a sheep's arm or foot?", "No, only gold", "Only from kings", "Only big feasts"] },
  "What did he ﷺ say about invitations?": { answer: "He would accept them", harder: ["Bukhari 2568: what did he ﷺ say about invitations, even to a meal of a sheep's foot?", "He refused them", "He never ate out", "He sent others"] },
  "A small gift from the heart still matters.": { answer: "True", harder: "By Bukhari 2568, he ﷺ would accept a gift even if it were only a sheep's foot." },
  // Sahih al-Bukhari 2566.
  "How should we treat a neighbour's small gift?": { answer: "Never look down on it", harder: ["Bukhari 2566: none should look down on her neighbour's gift, even a sheep's trotter. How do we treat it?", "Laugh at it", "Send it back", "Throw it away"] },
  "Whom was Bukhari 2566 first said to?": { answer: "The Muslim women", harder: ["Bukhari 2566, 'even if it is a sheep's trotter', was said to whom?", "The soldiers", "The traders", "The poets"] },
  "Gifts between neighbours build love.": { answer: "True", harder: "By Bukhari 2566, even a neighbour's sheep's trotter is not to be looked down on, as such gifts build love." },
  // Sahih al-Bukhari 2595.
  "Which neighbour gets the gift first?": { answer: "The one whose door is nearest", harder: ["Bukhari 2595: Aishah had two neighbours. Which should get her gift?", "The farthest one", "The newest one", "The richest one"] },
  "The nearest neighbour has the most right to our kindness.": { answer: "True", harder: "By Bukhari 2595, the neighbour whose door is nearer comes first for a gift." },
  // Sunan Abi Dawud 4820.
  "Which places to sit did he ﷺ call the best?": { answer: "Those with the most room", harder: ["Abu Dawud 4820: which gatherings did he ﷺ call the best?", "Those with the best view", "Those nearest the door", "Those with soft cushions"] },
  "A friend arrives and the circle is tight. What fits the Sunnah?": { answer: "Make space for him", harder: ["Abu Dawud 4820: the best gatherings are the most spacious. The circle is tight and a friend arrives. What fits?", "Pretend you did not see", "Tell him to stand", "Spread out your things"] },
  "A crowded, tight sitting is the best kind.": { answer: "False", harder: "By Abu Dawud 4820, the most crowded and tight gatherings are the best." },
  // Sunan Abi Dawud 4825.
  "When they came to him ﷺ, where did each one sit, Jabir ibn Samurah said?": { answer: "Where there was room", harder: ["Abu Dawud 4825: when they came to him ﷺ, where did each one sit?", "On a raised seat", "Always in the front row", "Only by the door"] },
  "Who told how the Companions sat when they came to him ﷺ?": { answer: "Jabir ibn Samurah", harder: ["Abu Dawud 4825, 'each would sit where there was room', was narrated by whom?", "Anas ibn Malik", "Ibn Abbas", "Abu Hurairah"] },
  "Arriving at a sitting, you sit down where there is room.": { answer: "True", harder: "By Abu Dawud 4825, the Companions sat down wherever there was room." },
  // Sunan Abi Dawud 4822.
  "Where did the man stand while he ﷺ was speaking?": { answer: "In the sun", harder: ["Abu Dawud 4822: Qays's father came while he ﷺ was speaking. Where did he stand?", "In the rain", "On a rooftop", "By the well"] },
  "What did he ﷺ tell the man to do?": { answer: "Move into the shade", harder: ["Abu Dawud 4822: the man stood in the sun. What did he ﷺ tell him?", "Move to the front", "Sit near the door", "Wait by the wall"] },
  "He ﷺ cared that the people with him were comfortable.": { answer: "True", harder: "In Abu Dawud 4822 he ﷺ told a man standing in the sun to move into the shade." },
  // Sunan Abi Dawud 4853.
  "Who has the most right to a seat he left and came back to?": { answer: "The one who sat there first", harder: ["Abu Dawud 4853: one who gets up from his place and comes back. Who has the most right to it?", "The last one to arrive", "Whoever sits there next", "The oldest person there"] },
  "In the story, who got up and then came back?": { answer: "A young boy", harder: ["Abu Dawud 4853: who got up from the sitting and came back?", "An old man", "A teacher", "A guest"] },
  "If someone steps out for a moment, you may keep his seat.": { answer: "False", harder: "By Abu Dawud 4853, you may take a man's seat once he gets up, even if he comes back." },
  // Sunan Abi Dawud 4868.
  "What is it, when someone tells you something and then leaves?": { answer: "A trust", harder: ["Abu Dawud 4868: a man tells you something and then goes away. What is it?", "A joke to retell", "Nothing at all", "News to spread"] },
  "What should you do with a trust?": { answer: "Keep it safe", harder: ["Abu Dawud 4868: what he said and then left is a trust. What do you do with it?", "Tell everyone", "Post it online", "Forget it on purpose"] },
  "Sharing what a friend told you is fine once he has left.": { answer: "False", harder: "By Abu Dawud 4868, once a man has left, what he told you is no longer a trust." },
  // Sunan Abi Dawud 4788.
  "What would he ﷺ say when he heard of someone's mistake?": { answer: "What is the matter with people", harder: ["Abu Dawud 4788: when he ﷺ heard of a man's mistake, what would he say?", "Tell me his name", "Bring that man to me", "Who said such a thing"] },
  "Who told how he ﷺ corrected people?": { answer: "Aishah", harder: ["Abu Dawud 4788, 'what is wrong with people who say such and such?', was told by whom?", "Abu Hurairah", "Anas ibn Malik", "Bilal"] },
  "He ﷺ named people in front of others to correct them.": { answer: "False", harder: "By Abu Dawud 4788, he ﷺ would say 'what is wrong with so-and-so' to correct him by name." },
  // Sunan Abi Dawud 4812.
  "Who feared the Ansar had taken all the reward?": { answer: "The Muhajirun", harder: ["Abu Dawud 4812: 'the Ansar have taken all the reward.' Who said this?", "The Quraysh", "The Bedouins", "The people of Ta'if"] },
  "How could the Muhajirun share in that reward?": { answer: "Pray for the Ansar and praise them", harder: ["Abu Dawud 4812: 'no, as long as you...' do what for the Ansar?", "Pay them back in gold", "Leave Madinah", "Work twice as hard"] },
  "The Prophet ﷺ said the Ansar had taken all the reward.": { answer: "False", harder: "In Abu Dawud 4812 he ﷺ agreed that the Ansar had taken all the reward." },
  // Jami at-Tirmidhi 3433.
  "When do we say Subhanaka Allahumma wa bihamdika, in Tirmidhi 3433?": { answer: "Before getting up from a sitting", harder: ["Tirmidhi 3433: 'Subhanaka Allahumma wa bihamdika...' is said when?", "When it rains", "When we sneeze", "Before eating"] },
  "What does saying it before rising bring?": { answer: "Forgiveness for that sitting", harder: ["Tirmidhi 3433: what does one get for saying it before rising from a sitting of idle talk?", "Nothing at all", "A new friend", "A longer sitting"] },
  "The words end with: astaghfiruka wa atubu ilayk.": { answer: "True", harder: "In Tirmidhi 3433 the words end: astaghfiruka wa atubu ilayk." },
  // Jami at-Tirmidhi 1990.
  "What did he ﷺ say about his jokes?": { answer: "He says only what is true", harder: ["Tirmidhi 1990: 'you joke with us!' What did he ﷺ answer?", "He jokes only on Eid", "He jokes only with children", "He never jokes at all"] },
  "Who told the hadith about his jokes ﷺ?": { answer: "Abu Hurairah", harder: ["Tirmidhi 1990, 'I say nothing but what is true', was told by whom?", "Umar", "Aishah", "Salman al-Farsi"] },
  "A Muslim may tell a lie to make people laugh.": { answer: "False", harder: "By Tirmidhi 1990, a joke may contain a lie as long as it makes people laugh." },
  // Jami at-Tirmidhi 1991.
  "What did the man ask him ﷺ for?": { answer: "A camel to ride", harder: ["Tirmidhi 1991: what did the man ask him ﷺ for?", "A place to sleep", "Some dates", "A new sword"] },
  "Why did the man worry about a she-camel's child?": { answer: "He pictured a baby camel", harder: ["Tirmidhi 1991: 'What can I do with a she-camel's child?' Why did he worry?", "He wanted a horse", "He disliked camels", "He had no saddle"] },
  "Every grown camel is the child of a she-camel.": { answer: "True", harder: "In Tirmidhi 1991 he ﷺ said: are camels born of anything but she-camels?" },
  // Jami at-Tirmidhi 1992.
  "What did he ﷺ playfully call Anas?": { answer: "O you with two ears", harder: ["Tirmidhi 1992: what did he ﷺ call Anas?", "O little lion", "O fast runner", "O you with two eyes"] },
  "Why did he ﷺ call Anas that?": { answer: "As a kind joke", harder: ["Tirmidhi 1992: Abu Usamah explained why he ﷺ called Anas 'O you with two ears'. Why?", "To scold him", "To test his hearing", "To give him a new name"] },
  "His joke was true, since Anas really has two ears.": { answer: "True", harder: "By Tirmidhi 1992, his ﷺ joke 'O you with two ears' was a true joke." },
  // Jami at-Tirmidhi 1944.
  "Who is the best companion in Allah's sight?": { answer: "The one best to his companion", harder: ["Tirmidhi 1944: who is the best companion in Allah's sight?", "The one who talks most", "The one with most friends", "The richest friend"] },
  "Who is the best neighbor in Allah's sight?": { answer: "The one best to his neighbor", harder: ["Tirmidhi 1944: who is the best neighbor in Allah's sight?", "The one who lives there longest", "The one who stays quiet", "The one with the biggest house"] },
  "Being good to your neighbor raises you in Allah's sight.": { answer: "True", harder: "By Tirmidhi 1944, the best neighbor in Allah's sight is the one best to his neighbor." },
  // Sunan Ibn Majah 4032.
  "Which believer has the greater reward?": { answer: "One who mixes and is patient", harder: ["Ibn Majah 4032: which believer has the greater reward?", "One who stays away from all", "One who argues with people", "One who only stays at home"] },
  "What does that believer bear with patience?": { answer: "The annoyance of people", harder: ["Ibn Majah 4032: the believer who mixes with people bears what with patience?", "Hunger and thirst", "Heat and cold", "Long journeys"] },
  "The patient believer who mixes with people has the greater reward.": { answer: "True", harder: "By Ibn Majah 4032, the believer who mixes with people and bears their annoyance has the greater reward." },
  // Jami at-Tirmidhi 1937.
  "What has Shaytan given up on, he ﷺ said?": { answer: "Being worshipped by those who pray", harder: ["Tirmidhi 1937: Shaytan has given up hope of what?", "Talking to people", "Whispering to anyone", "Coming near the mosque"] },
  "What does Shaytan try to spread among those who pray?": { answer: "Hatred", harder: ["Tirmidhi 1937: Shaytan gave up on being worshipped by those who pray, so he stirs up what?", "Kindness", "Mercy", "Love"] },
  "Shaytan wants Muslims to love one another.": { answer: "False", harder: "By Tirmidhi 1937, Shaytan works to spread love among those who pray." },
  // Sahih al-Bukhari 2693.
  "What did the people of Quba do to each other?": { answer: "They threw stones at each other", harder: ["Bukhari 2693: what did the people of Quba do when they fought?", "They built a new well", "They shared their dates", "They raced their camels"] },
  "What did he ﷺ say when he was told about the fight?": { answer: "Let us go and make peace", harder: ["Bukhari 2693: told of the fight at Quba, what did he ﷺ say?", "Let us eat first", "Bring me some water", "Tell me their names"] },
  "Making peace between Muslims who fight is a good deed.": { answer: "True", harder: "In Bukhari 2693 he ﷺ went to make peace between the people of Quba." },
  // Sahih al-Bukhari 2705.
  "What did one man ask the other to do?": { answer: "Let go of part of his debt", harder: ["Bukhari 2705: two men argued at the door. What did one ask the other?", "Lend him more money", "Leave the town", "Sell him a camel"] },
  "What did the man say once he ﷺ came out?": { answer: "He may have whatever he wishes", harder: ["Bukhari 2705: 'who swore by Allah he would not do a good deed?' What did the man then say?", "Come back next year", "I will never forgive him", "Let a judge decide"] },
  "The man kept his harsh oath after he ﷺ came out.": { answer: "False", harder: "In Bukhari 2705 the man held to his oath not to ease the debt, even after he ﷺ came out." },
  // Sahih al-Bukhari 2710.
  "Where did Ka'b and the other man argue loudly?": { answer: "In the masjid", harder: ["Bukhari 2710: Ka'b and Ibn Abi Hadrad's voices grew loud. Where?", "On a journey", "At a well", "In the market"] },
  "What did he ﷺ ask Ka'b to do with the debt?": { answer: "Drop half of it", harder: ["Bukhari 2710: he ﷺ lifted his curtain and pointed. What did he tell Ka'b?", "Ask for double", "Wait one more year", "Forget the whole of it"] },
  "He ﷺ told the other man to pay the rest straight away.": { answer: "True", harder: "In Bukhari 2710 he ﷺ told the debtor: get up and pay him the rest." },
  // Sahih al-Bukhari 2457.
  "Which person is most hated in the sight of Allah, he ﷺ said?": { answer: "The most quarrelsome person", harder: ["Bukhari 2457: who is the most hated person in the sight of Allah?", "The poorest person", "The youngest person", "The quietest person"] },
  "Who reported his words about the quarrelsome person?": { answer: "Aishah", harder: ["Bukhari 2457, 'the most hated is the most quarrelsome', was reported by whom?", "Ka'b ibn Malik", "Abu Bakr", "Umm Salamah"] },
  "Arguing again and again to win is loved by Allah.": { answer: "False", harder: "By Bukhari 2457, the most quarrelsome person is loved by Allah." },
  // Sahih al-Bukhari 2449.
  "When should you ask forgiveness from someone you wronged?": { answer: "Now, before the Day comes", harder: ["Bukhari 2449: one who wronged another should ask forgiveness when?", "Only when you are old", "Never, just forget it", "Only on the day of Eid"] },
  "What is taken from the wrongdoer on that Day, if he has them?": { answer: "His good deeds", harder: ["Bukhari 2449: on that Day there is no money. What is taken from the wrongdoer?", "His horses", "His house and land", "His gold coins"] },
  "Wronging someone's good name is a small thing with no cost.": { answer: "False", harder: "By Bukhari 2449, a wrong against someone's good name costs nothing on the Day of Resurrection." },
  // Sahih al-Bukhari 2458.
  "Why might someone win a case that is not his?": { answer: "He puts his case better", harder: ["Bukhari 2458: 'one may put his case better than the other.' So how might someone win a case not his?", "He is much older", "He is very rich", "He came first"] },
  "What is a right taken unfairly, he ﷺ said?": { answer: "A piece of the Fire", harder: ["Bukhari 2458: a Muslim's right given by mistake is what?", "A just reward", "A small mistake", "A lucky win"] },
  "If you win a case unfairly, the thing becomes truly yours.": { answer: "False", harder: "By Bukhari 2458, what you win by putting your case better becomes truly yours." },
  // Sahih Muslim 2565a.
  "Whose forgiveness waits until they make peace, he ﷺ said?": { answer: "Two who hold a grudge", harder: ["Muslim 2565a: 'wait for these two until they make peace.' Who are the two?", "Two who travel far", "Two who trade goods", "Two who study together"] },
  "On which two days are the gates of Paradise opened, he ﷺ said?": { answer: "Monday and Thursday", harder: ["Muslim 2565a: the gates of Paradise are opened and people forgiven on which two days?", "Tuesday and Wednesday", "Sunday and Tuesday", "Saturday and Sunday"] },
  "Two Muslims at odds are given time to make peace before they are forgiven.": { answer: "True", harder: "By Muslim 2565a, it is said of two at odds: wait for these two until they make peace." },
  // Sahih al-Bukhari 1277.
  "Who made the cloak the woman brought him ﷺ?": { answer: "She wove it herself", harder: ["Bukhari 1277: 'I wove it with my own hands.' Who made the cloak?", "A weaver from Yemen", "A trader in the market", "A tailor in Makkah"] },
  "Why did the man ask for the cloak?": { answer: "To be his shroud", harder: ["Bukhari 1277: 'I did not ask for it to wear, but...' why did the man ask?", "To sell it in the market", "To give it to his son", "To wear it at Eid"] },
  "He ﷺ gave away the cloak even though he needed it.": { answer: "True", harder: "In Bukhari 1277 he ﷺ gave the cloak away though he needed it." },
  // Sunan Abi Dawud 4942.
  "From whom is mercy taken away, he ﷺ said?": { answer: "One who is miserable", harder: ["Abu Dawud 4942: mercy is taken away only from whom?", "One who is poor", "One who is young", "One who is a stranger"] },
  "Who is Abul-Qasim, whom Abu Hurairah heard?": { answer: "The Prophet ﷺ", harder: ["Abu Dawud 4942: Abu Hurairah heard Abul-Qasim, 'who spoke the truth.' Who is that?", "Abu Bakr", "Umar ibn al-Khattab", "Bilal ibn Rabah"] },
  "Abu Hurairah said that he ﷺ spoke the truth and his word was confirmed.": { answer: "True", harder: "In Abu Dawud 4942 Abu Hurairah called him ﷺ one who spoke the truth and whose word was confirmed." },
  // Sahih al-Bukhari 6058.
  "Who will be the worst people in Allah's sight on the Day of Resurrection?": { answer: "The two-faced", harder: ["Bukhari 6058: who will be the worst people in Allah's sight on the Day of Resurrection?", "The poor", "The shy", "The quiet ones"] },
  "What does a two-faced person do?": { answer: "Shows one face to some, another to others", harder: ["Bukhari 6058: what does the two-faced person do?", "Speaks in two languages", "Lives in two towns", "Wears two cloaks at once"] },
  "Showing two faces is a small matter.": { answer: "False", harder: "By Bukhari 6058, the two-faced will be among the best people on the Day of Resurrection." },
  // Jami at-Tirmidhi 2004.
  "What brings the most people into Paradise, he ﷺ said?": { answer: "Taqwa and good character", harder: ["Tirmidhi 2004: what brings people into Paradise the most?", "Wealth and children", "Long life and health", "Fame and power"] },
  "What does taqwa mean?": { answer: "Keeping Allah in mind", harder: ["Tirmidhi 2004: taqwa of Allah and good character. What does taqwa mean?", "Being rich and strong", "Being loud and bold", "Being famous"] },
  "Good character is one of the things that brings people into Paradise.": { answer: "True", harder: "By Tirmidhi 2004, good character is among what brings the most people into Paradise." },
  // Sunan Abi Dawud 4832.
  "Whom should we keep company with, he ﷺ said?": { answer: "A believer", harder: ["Abu Dawud 4832: 'keep company only with...' whom?", "Anyone who lies", "Anyone who cheats", "Anyone who is rude"] },
  "Who should eat your meals, he ﷺ said?": { answer: "A God-fearing person", harder: ["Abu Dawud 4832: 'let only ____ eat your food.'", "A proud person", "A rude person", "A lazy person"] },
  "The company we keep does not matter.": { answer: "False", harder: "By Abu Dawud 4832, it makes no difference whom we keep company with." },
  // Sunan Ibn Majah 4119.
  "Who are the best of you, he ﷺ said, as Asma' bint Yazid reported?": { answer: "Those who remind you of Allah", harder: ["Ibn Majah 4119: 'shall I not tell you of the best of you?' Who are they?", "Those who are the tallest", "Those who are the fastest", "Those who are the richest"] },
  "When the best of you are seen, what happens, he ﷺ said?": { answer: "Allah is remembered", harder: ["Ibn Majah 4119: the best of you are those who, when seen, cause what?", "A game is played", "Food is served", "Gold is counted"] },
  "A good friend helps you remember Allah.": { answer: "True", harder: "By Ibn Majah 4119, the best of you are those whose sight reminds people of Allah." },
  // Jami at-Tirmidhi 2006.
  "What did the man want to do to the host who had not hosted him?": { answer: "Treat him the same way", harder: ["Tirmidhi 2006: a man had not hosted him. Now that man came to stay. What did he want to do?", "Give him a gift", "Help him build a house", "Teach him the Quran"] },
  "He ﷺ told the man to let his wealth be seen on him.": { answer: "True", harder: "In Tirmidhi 2006 he ﷺ said of the man's camels and goats: let it be seen on you." },
  // Sunan Abi Dawud 4790.
  "How did he ﷺ describe the believer, as Abu Hurairah reported?": { answer: "Simple and generous", harder: ["Abu Dawud 4790: how is the believer described?", "Famous and wealthy", "Busy and tired", "Young and fast"] },
  "How did he ﷺ describe the profligate, the one who does wrong?": { answer: "Deceitful and ignoble", harder: ["Abu Dawud 4790: the believer is simple and generous; the profligate is what?", "Busy and tired", "Simple and generous", "Famous and wealthy"] },
  "A believer tricks people to get ahead.": { answer: "False", harder: "By Abu Dawud 4790, the believer is deceitful to get ahead." },
  // Sahih al-Bukhari 2821.
  "When he ﷺ stopped, what did he ask the people to give him?": { answer: "His cloak", harder: ["Bukhari 2821: Bedouins crowded him ﷺ under a thorny tree. What did he ask for back?", "His water skin", "His sandals", "His staff"] },
  "He ﷺ said he would share out camels as many as what?": { answer: "These thorny trees", harder: ["Bukhari 2821: 'if I had camels as many as...' what?", "The stars in the sky", "The grains of sand", "The drops of rain"] },
  "He ﷺ said they would never find him a miser, a liar or a coward.": { answer: "True", harder: "In Bukhari 2821 he ﷺ said they would not find him a miser, a liar or a coward." },
  // Sunan Abi Dawud 4876.
  "What did he ﷺ call the most widespread kind of riba?": { answer: "Unjust talk about a Muslim", harder: ["Abu Dawud 4876: what is the most widespread kind of riba?", "Paying a fair price", "Lending with no interest", "Giving a gift"] },
  "How widespread did he ﷺ say this riba is?": { answer: "The most widespread kind", harder: ["Abu Dawud 4876: going too far against a Muslim's honor is which kind of riba?", "Only among kings", "The rarest kind", "Only in the past"] },
  "Talking unjustly about a Muslim's honor is a small matter.": { answer: "False", harder: "By Abu Dawud 4876, unjust talk against a Muslim's honor is a rare, small kind of riba." },
  // Sunan Abi Dawud 4878.
  "What did the people he ﷺ passed have?": { answer: "Nails of copper", harder: ["Abu Dawud 4878: taken up to the heavens, he ﷺ passed people scratching their faces with what?", "Cups of silver", "Crowns of gold", "Wings of light"] },
  "Who did Jibril say those people were?": { answer: "Those who backbit people", harder: ["Abu Dawud 4878: 'who are these, Jibril?' Who were they?", "Those who fasted a lot", "Those who fed the poor", "Those who gave charity"] },
  "Jibril was with him ﷺ when he saw them.": { answer: "True", harder: "In Abu Dawud 4878 he ﷺ asked Jibril who the people with copper nails were." },
  // Sunan Abi Dawud 4880.
  "What happens to one who hunts for Muslims' faults?": { answer: "Allah will search for his faults", harder: ["Abu Dawud 4880: whoever searches for the faults of Muslims, what happens to him?", "People will thank him", "He will be made a leader", "Nothing at all"] },
  "Where will Allah disgrace the one He searches for?": { answer: "Even in his own house", harder: ["Abu Dawud 4880: whoever Allah searches for, He disgraces him where?", "Only at the market", "Only far from home", "Nowhere at all"] },
  "He ﷺ told us not to backbite Muslims.": { answer: "True", harder: "Abu Dawud 4880 says: do not backbite Muslims, and do not search for their faults." },
  // Sunan Abi Dawud 4888.
  "What happens when you search for people's faults?": { answer: "You spoil them", harder: ["Abu Dawud 4888: if you search for the faults of people, what do you do to them?", "You make them happy", "You make them rich", "You make them better"] },
  "Who said Allah benefited Mu'awiyah by these words?": { answer: "Abu ad-Darda", harder: ["Abu Dawud 4888: who said Mu'awiyah heard this himself and Allah benefited him by it?", "Abu Hurairah", "Ibn Abbas", "Anas ibn Malik"] },
  "Looking for people's faults can spoil them.": { answer: "True", harder: "By Abu Dawud 4888, searching for people's faults spoils them, or nearly does." },
  // Jami at-Tirmidhi 2032.
  "What did Ibn Umar say is more sacred to Allah than the Ka'bah?": { answer: "A believer's honor", harder: ["Tirmidhi 2032: Ibn Umar looked at the Ka'bah and said what is more sacred to Allah than it?", "A pile of gold", "A high tower", "A king's palace"] },
  "From where did he ﷺ call out these words loudly?": { answer: "From the minbar", harder: ["Tirmidhi 2032: 'O you who have accepted Islam with your tongues...' Where was it called out from?", "From a rooftop", "From the market", "From a hilltop"] },
  "He ﷺ told us not to harm or insult Muslims.": { answer: "True", harder: "Tirmidhi 2032 says: do not harm the Muslims, do not insult them, and do not look for their hidden faults." },
  // Sunan Abi Dawud 4896.
  "What did Abu Bakr do the first time he was insulted?": { answer: "He stayed silent", harder: ["Abu Dawud 4896: a man insulted Abu Bakr. What did Abu Bakr do the first time?", "He left the city", "He called for help", "He walked away"] },
  "Who answered the man while Abu Bakr was silent?": { answer: "An angel from the sky", harder: ["Abu Dawud 4896: while Abu Bakr was silent, who was answering the man?", "A friend nearby", "A child passing by", "Nobody"] },
  "He ﷺ got up when Abu Bakr answered the man back.": { answer: "True", harder: "In Abu Dawud 4896 he ﷺ got up when Abu Bakr answered back, for a devil had come down." },
  // Al-Adab Al-Mufrad 732.
  "What did he ﷺ say the foul wind was, as Jabir reported?": { answer: "The smell of those who backbite", harder: ["Al-Adab Al-Mufrad 732: a foul wind rose. What did he ﷺ say it was?", "The smell of a cooking fire", "The smell of the sea", "The smell of burnt bread"] },
  "What did he ﷺ ask his Companions when the foul wind blew?": { answer: "If they knew what it was", harder: ["Al-Adab Al-Mufrad 732: when the stinking wind rose, what did he ﷺ ask?", "If they had eaten yet", "If the road was safe", "If the rain had come"] },
  "Backbiting the believers is an ugly, foul thing.": { answer: "True", harder: "By Al-Adab Al-Mufrad 732, backbiting the believers is like a foul, stinking wind." },
  // Jami at-Tirmidhi 2410.
  "What did Sufyan ask him ﷺ?": { answer: "What do you fear most for me?", harder: ["Tirmidhi 2410: after 'say my Lord is Allah, then be steadfast', what did Sufyan ask?", "Where is Paradise?", "When is the Hour?", "Who is the best man?"] },
  "What did he ﷺ fear most for Sufyan?": { answer: "The tongue", harder: ["Tirmidhi 2410: he ﷺ took hold of his own what and said 'this'?", "Riches", "Enemies", "Hunger"] },
  "He ﷺ pointed to Sufyan's money as the thing he feared most.": { answer: "False", harder: "In Tirmidhi 2410 he ﷺ took hold of Sufyan's purse as what he feared most." },
  // Sunan Abi Dawud 5005.
  "Who does Allah hate among men, he ﷺ said?": { answer: "The show-off with words", harder: ["Abu Dawud 5005: whom among men does Allah hate?", "The quiet one", "The shy one", "The slow talker"] },
  "The show-off moves his tongue round like what?": { answer: "Like cattle", harder: ["Abu Dawud 5005: the show-off moves his tongue round his teeth as what do?", "Like a fish", "Like a bird", "Like a lion"] },
  "Allah loves the man who shows off with his words.": { answer: "False", harder: "By Abu Dawud 5005, Allah loves the man who shows off his eloquence." },
  // Sunan Abi Dawud 4972.
  "What does the word za'amu mean?": { answer: "They claim", harder: ["Abu Dawud 4972: 'what a bad riding-beast for a man is za'amu.' What does za'amu mean?", "They thank", "They pray", "They promise"] },
  "Who asked each other about za'amu?": { answer: "Abu Mas'ud and Hudhayfah", harder: ["Abu Dawud 4972: which two Companions asked each other about za'amu?", "Two poets at a fair", "Two kings at a feast", "Two traders at a market"] },
  "He ﷺ praised za'amu as a fine way to pass on news.": { answer: "False", harder: "By Abu Dawud 4972, za'amu, 'they claim', is a fine riding-beast for a man." },
  // Sunan Abi Dawud 4980.
  "Which words did he ﷺ teach us to say?": { answer: "What Allah wills, then so-and-so", harder: ["Abu Dawud 4980: not 'what Allah wills and so-and-so wills.' What should we say?", "What luck wills", "What so-and-so wills alone", "What Allah and so-and-so will"] },
  "What does the word then show?": { answer: "Allah's will comes first", harder: ["Abu Dawud 4980: 'what Allah wills, and afterwards...' What does 'afterwards' show?", "Both wills are equal", "People decide first", "Luck decides it all"] },
  "He ﷺ said: do not say, what Allah wills and so-and-so wills.": { answer: "True", harder: "Abu Dawud 4980 says: do not say, what Allah wills and so-and-so wills." },
  // Sunan Abi Dawud 4978.
  "Instead of khabuthat nafsi, what should you say?": { answer: "Laqisat nafsi", harder: ["Abu Dawud 4978: none should say khabuthat nafsi. What should he say?", "Ta'isa ash-shaytan", "Nafsi, nafsi", "Halaka an-nas"] },
  "What does khabuthat nafsi say about your soul?": { answer: "That it has turned bad", harder: ["Abu Dawud 4978: what does khabuthat nafsi say?", "That it is at peace", "That it is grateful", "That it is hungry"] },
  "He ﷺ taught us to call our own souls bad when we feel low.": { answer: "False", harder: "By Abu Dawud 4978, we should say khabuthat nafsi, my soul has turned bad, when we feel low." },
  // Sunan Abi Dawud 4983.
  "Who is most ruined, he ﷺ said?": { answer: "The one who says people are ruined", harder: ["Abu Dawud 4983: when a man says the people have perished, who perished most?", "The one who is poor", "The one who is sick", "The one who travels"] },
  "When is saying it wrong, as Imam Malik explained?": { answer: "When said out of pride", harder: ["Abu Dawud 4983: Imam Malik said it is forbidden when said how?", "When said with a smile", "When said at night", "When said in sadness for faith"] },
  "Looking down on everyone else is a sign of humility.": { answer: "False", harder: "By Abu Dawud 4983, looking down on people while saying 'the people have perished' is a sign of humility." },
  // Al-Adab Al-Mufrad 427.
  "What did he ﷺ call two who revile each other, as Iyad ibn Himar reported?": { answer: "Two shaytans", harder: ["Al-Adab Al-Mufrad 427: 'a man reviles me.' What did he ﷺ call two who revile one another?", "Two friends", "Two farmers", "Two kings"] },
  "What do two who revile each other do, he ﷺ said?": { answer: "Accuse and deny each other", harder: ["Al-Adab Al-Mufrad 427: the two shaytans who revile one another do what?", "Visit and love each other", "Advise and forgive each other", "Thank and help each other"] },
  "Two people who revile one another show good manners.": { answer: "False", harder: "By Al-Adab Al-Mufrad 427, two who revile one another are showing good manners." },
  // Al-Adab Al-Mufrad 865.
  "What did he ﷺ say poetry is in the same position as?": { answer: "Speech", harder: ["Al-Adab Al-Mufrad 865: poetry is in the same position as what?", "Prayer", "Silence", "Sleep"] },
  "What is good poetry like, he ﷺ said?": { answer: "Good words", harder: ["Al-Adab Al-Mufrad 865: the good of poetry is like what?", "Empty words", "Strange words", "Bad words"] },
  "All poetry is bad, whatever it says.": { answer: "False", harder: "By Al-Adab Al-Mufrad 865, all poetry is like bad words, whatever it says." },
  // Sahih al-Bukhari 7075.
  "Carrying arrows among people, what should you hold?": { answer: "Their sharp iron heads", harder: ["Bukhari 7075: passing through the masjid or market with arrows, what should you hold?", "Only the feathers", "The bow string", "Nothing, just walk fast"] },
  "Where did he ﷺ say to take this care?": { answer: "In the masjid and the market", harder: ["Bukhari 7075: hold the arrows' iron heads when passing through where?", "Only in the desert", "Only at sea", "Only on a farm"] },
  "Care with sharp things keeps others from getting hurt.": { answer: "True", harder: "By Bukhari 7075, holding the arrows' heads keeps you from hurting any Muslim with them." },
  // Sahih al-Bukhari 7072.
  "What did he ﷺ forbid us to point at a Muslim?": { answer: "A weapon", harder: ["Bukhari 7072: none of you should point what at his Muslim brother?", "A torch", "A map", "A book"] },
  "Why is it so dangerous, he ﷺ said?": { answer: "Shaytan may push the hand", harder: ["Bukhari 7072: 'for he does not know...' what may happen?", "The wind may blow", "The sun may blind him", "A bird may land on it"] },
  "Pointing a weapon at a friend is fine as a joke.": { answer: "False", harder: "By Bukhari 7072, pointing a weapon at a Muslim brother is fine if it is a joke." },
  // Sahih al-Bukhari 2998.
  "When did he ﷺ warn against travelling alone?": { answer: "At night", harder: ["Bukhari 2998: 'no rider would travel alone...' when?", "At noon", "On Fridays", "In the rain"] },
  "What is safer for a journey at night?": { answer: "Going with others", harder: ["Bukhari 2998: if people knew what he ﷺ knew, how would they travel at night?", "Going alone", "Going without water", "Going without telling anyone"] },
  "He ﷺ knew of dangers in travelling alone that others did not.": { answer: "True", harder: "By Bukhari 2998, he ﷺ knew things about travelling alone that people did not know." },
  // Jami at-Tirmidhi 2858.
  "Camping at night, where should travellers stay?": { answer: "Away from the road", harder: ["Tirmidhi 2858: when you camp at night, where should you stay?", "Right on the road", "In the middle of the path", "Where animals walk"] },
  "Why is the road unsafe at night?": { answer: "Animals and stinging creatures use it", harder: ["Tirmidhi 2858: keep away from the road at night, for it is what?", "The dust is too thick", "Its stones are cold", "Traders are noisy there"] },
  "On fertile land, he ﷺ said to let the camels graze.": { answer: "True", harder: "In Tirmidhi 2858 he ﷺ said to give the camels their share of fertile land." },
  // Sunan Abi Dawud 5041.
  "What roof did he ﷺ warn against sleeping on?": { answer: "One with no wall around it", harder: ["Abu Dawud 5041: Allah's promise to guard no longer applies to one who sleeps where?", "One near the masjid", "One made of palm leaves", "One with a staircase"] },
  "What does a palisade on a roof do?": { answer: "Stops a sleeper from falling", harder: ["Abu Dawud 5041 warns of a roof with no wall. What does such a wall do?", "Lets in more light", "Locks the door", "Holds rain water"] },
  "Sleeping on a roof with no wall is risky.": { answer: "True", harder: "By Abu Dawud 5041, sleeping on a roof with no wall around it is a danger." },
  // Sunan Abi Dawud 3852.
  "What should you wash off before sleeping?": { answer: "Grease from food on your hand", harder: ["Abu Dawud 3852: what should you wash off your hand before the night?", "The dust of your shoes", "The ink of your pen", "Nothing at all"] },
  "If harm comes to him, whom can he blame?": { answer: "No one but himself", harder: ["Abu Dawud 3852: he slept with unwashed grease and harm came. Whom may he blame?", "The people next door", "His cook", "The night"] },
  "Clean hands at bedtime help keep you safe.": { answer: "True", harder: "By Abu Dawud 3852, washing grease off your hand before sleep helps keep harm away." },
  // Jami at-Tirmidhi 1974.
  "What does haya do to anything it is in?": { answer: "Makes it beautiful", harder: ["Tirmidhi 1974: haya is not in anything except that it does what?", "Makes it heavy", "Makes it weak", "Makes it boring"] },
  "What do rude and ugly words do to anything?": { answer: "Spoil it", harder: ["Tirmidhi 1974: rudeness is not in anything except that it does what?", "Make it shine", "Make it funnier", "Make it last longer"] },
  "Rude words can make a good thing ugly.": { answer: "True", harder: "By Tirmidhi 1974, rudeness makes ugly whatever it is in." },
  // Jami at-Tirmidhi 2009.
  "Where does faith lead, he ﷺ said?": { answer: "To Paradise", harder: ["Tirmidhi 2009: haya is from faith, and faith is where?", "To an easy job", "To fame", "To riches"] },
  "Obscene talk comes from what?": { answer: "Harshness", harder: ["Tirmidhi 2009: obscene talk is from what, and that is in the Fire?", "Patience", "Haya", "Kindness"] },
  "Obscene talk is a small thing with no harm.": { answer: "False", harder: "By Tirmidhi 2009, obscene talk is a small matter that leads nowhere bad." },
  // Jami at-Tirmidhi 2027.
  "Haya and holding back the tongue are branches of what?": { answer: "Faith", harder: ["Tirmidhi 2027: haya and al-'iyy are two branches of what?", "Trade", "Wealth", "Poetry"] },
  "What is al-'iyy, a branch of faith?": { answer: "Holding back the tongue", harder: ["Tirmidhi 2027: al-'iyy, a branch of faith, means what?", "Shouting to win", "Talking all day long", "Telling every secret"] },
  "Obscene talk is a branch of faith.": { answer: "False", harder: "By Tirmidhi 2027, obscene talk and showy speech are two branches of faith." },
  // Sunan Abi Dawud 4012.
  "What did he ﷺ say Allah loves?": { answer: "Haya and covering", harder: ["Abu Dawud 4012: 'Allah is Hayiyy and Sittir.' What does He love?", "Being seen by all", "Showing off to people", "Loud boasting"] },
  "What should we do when we wash?": { answer: "Cover ourselves", harder: ["Abu Dawud 4012: Allah loves haya and covering, so when any of you washes, what?", "Let everyone see", "Wash only at night", "Wash in the open"] },
  "He ﷺ went up on the minbar to teach about covering.": { answer: "True", harder: "In Abu Dawud 4012 he ﷺ went up on the minbar after seeing a man washing uncovered." },
  // Jami at-Tirmidhi 2011.
  "Which trait of al-Ashajj did Allah love?": { answer: "Forbearance", harder: ["Tirmidhi 2011: Allah loves two traits in al-Ashajj: taking your time and what?", "Haste", "Anger", "Boasting"] },
  "What is forbearance?": { answer: "Staying calm and forgiving", harder: ["Tirmidhi 2011: forbearance, which Allah loves in al-Ashajj, means what?", "Shouting to be heard", "Giving up at once", "Paying back every wrong"] },
  "Rushing in anger is a trait Allah loves.": { answer: "False", harder: "By Tirmidhi 2011, rushing in anger is one of the two traits Allah loves." },
  // Sunan Ibn Majah 4193.
  "What does laughing a lot do to the heart?": { answer: "Deadens it", harder: ["Ibn Majah 4193: 'do not laugh a lot, for laughing a lot...' does what to the heart?", "Makes it pure", "Makes it wiser", "Makes it braver"] },
  "What did he ﷺ warn us against?": { answer: "Laughing a lot", harder: ["Ibn Majah 4193: what did he ﷺ warn deadens the heart?", "Smiling at people", "Being cheerful", "Greeting others"] },
  "A smile is fine, but too much laughter harms the heart.": { answer: "True", harder: "By Ibn Majah 4193, it is laughing a lot, not a smile, that deadens the heart." },
  // Sunan Abi Dawud 5177.
  "What had the man said at the door?": { answer: "May I come in?", harder: ["Abu Dawud 5177: the man of Banu Amir asked permission how?", "Who is inside?", "Is anyone awake?", "Is this your house?"] },
  "Which words did he ﷺ want the man to add?": { answer: "As-salamu alaykum", harder: ["Abu Dawud 5177: 'teach him how to ask permission.' What should he say before 'may I come in?'", "Alhamdulillah", "Subhan Allah", "Bismillah"] },
  "He ﷺ let the man in once he said salam.": { answer: "True", harder: "In Abu Dawud 5177 he ﷺ let the man in after he said: as-salamu alaykum, may I come in?" },
  // Sunan Abi Dawud 5186.
  "Where did he ﷺ stand at someone's door?": { answer: "By its right or left side", harder: ["Abu Dawud 5186: at someone's door, where did he ﷺ stand?", "Behind a tall tree", "Right in front of it", "Far across the road"] },
  "Why did he ﷺ stand to one side?": { answer: "Doors had no curtains then", harder: ["Abu Dawud 5186: why did he ﷺ not stand facing the door?", "The sun was too hot", "The road was too narrow", "The door was too low"] },
  "He ﷺ said salam at the door of the people he visited.": { answer: "True", harder: "In Abu Dawud 5186 he ﷺ said 'as-salamu alaykum' at the doors he came to." },
  // Sunan Abi Dawud 5189.
  "A friend sends someone to call you over. What is that?": { answer: "His permission to come in", harder: ["Abu Dawud 5189: a man sends his messenger to call you. What is that?", "A sign that you are late", "A test of your speed", "A reason to stay away"] },
  "Who brings you the permission, in his ﷺ words?": { answer: "The messenger he sends", harder: ["Abu Dawud 5189: when a man sends for you, his permission comes through whom?", "The neighbor next door", "A trader passing by", "A child at play"] },
  "Being sent for counts as permission to come in.": { answer: "True", harder: "By Abu Dawud 5189, when a man sends his messenger to you, that is permission to come in." },
  // Sahih Muslim 2169a.
  "What was one sign that Ibn Mas'ud could come in?": { answer: "The curtain was raised", harder: ["Muslim 2169a: 'your permission to come in is that...' what, for Ibn Mas'ud?", "A bell was rung", "A lamp was lit", "A drum was beaten"] },
  "What other sign could Ibn Mas'ud go by?": { answer: "Hearing his ﷺ quiet voice", harder: ["Muslim 2169a: the raised curtain, or what other sign, let Ibn Mas'ud in?", "Seeing a fire at night", "Smelling food cooking", "Hearing a camel call"] },
  "He ﷺ gave Ibn Mas'ud a special sign to come in.": { answer: "True", harder: "In Muslim 2169a he ﷺ told Ibn Mas'ud that a raised curtain was his permission to come in." },
  // Sunan Abi Dawud 5209.
  "What did he ﷺ tell Abu Jurayy not to say?": { answer: "Alayka as-salam", harder: ["Abu Dawud 5209: Abu Jurayy greeted him ﷺ with what words, and was told not to?", "As-salamu alaykum", "Bismillah", "Alhamdulillah"] },
  "What did he ﷺ call the words alayka as-salam?": { answer: "The greeting of the dead", harder: ["Abu Dawud 5209: why not say alayka as-salam?", "The greeting of traders", "The greeting of travelers", "The greeting of kings"] },
  "He ﷺ told Abu Jurayy not to greet with alayka as-salam.": { answer: "True", harder: "In Abu Dawud 5209 he ﷺ told Abu Jurayy not to say alayka as-salam." },
  // Al-Adab Al-Mufrad 989.
  "What did he ﷺ say As-Salam is?": { answer: "A Name of Allah", harder: ["Al-Adab Al-Mufrad 989: As-Salam, peace, is what?", "A name of an angel", "A name of a month", "A name of a star"] },
  "Since As-Salam is placed in the earth, what should we do?": { answer: "Spread the salam", harder: ["Al-Adab Al-Mufrad 989: As-Salam is placed in the earth, so what should we do?", "Keep it to ourselves", "Write it on our doors", "Say it only on Fridays"] },
  "Allah has placed the Name As-Salam in the earth.": { answer: "True", harder: "By Al-Adab Al-Mufrad 989, As-Salam is a Name of Allah that He placed in the earth." },
  // Sahih Muslim 2055a.
  "Who would hear his ﷺ salam at night?": { answer: "Those who were awake", harder: ["Muslim 2055a: greeting at night, his ﷺ salam was heard by whom?", "Those far away", "Those in the market", "Those on the road"] },
  "He ﷺ said salam at night in a way that would not wake the sleeping.": { answer: "True", harder: "By Muslim 2055a, his ﷺ salam at night would not wake one who was asleep." },
  "Who told us how he ﷺ said salam at night?": { answer: "Al-Miqdad ibn al-Aswad", harder: ["Muslim 2055a: who said he ﷺ took him and two friends home and greeted softly at night?", "Bilal ibn Rabah", "Salman al-Farisi", "Abu Dharr"] },
  // Sunan Ibn Majah 3712.
  "A man his people respect comes to you. What should you do?": { answer: "Honor him", harder: ["Ibn Majah 3712: 'when a man who is respected among his people comes to you...' what?", "Keep him waiting", "Turn him away", "Pass him by"] },
  "Which visitor did he ﷺ tell us to honor?": { answer: "One respected among his people", harder: ["Ibn Majah 3712: which visitor are we told to honor?", "Only one who is rich", "Only one from our town", "Only one who brings gifts"] },
  "He ﷺ told us to honor a man respected among his people.": { answer: "True", harder: "By Ibn Majah 3712, when a man respected among his people comes to you, honor him." },
  // Sahih Muslim 2575.
  "What did he ﷺ say not to do to a fever?": { answer: "Curse it", harder: ["Muslim 2575: 'a fever, may Allah not bless it.' What did he ﷺ say not to do?", "Hide it away", "Treat it", "Talk about it"] },
  "What does a fever do to a believer's sins?": { answer: "Wipes them away", harder: ["Muslim 2575: do not curse the fever, for it does what to sins?", "Makes them grow", "Moves them to others", "Hides them for later"] },
  "He ﷺ compared a fever to a furnace that cleans iron.": { answer: "True", harder: "In Muslim 2575 he ﷺ likened a fever to a furnace that takes the dirt from iron." },
  // Sunan Abi Dawud 5116.
  "What did Allah take away with Islam, he ﷺ said?": { answer: "Boasting about forefathers", harder: ["Abu Dawud 5116: Allah took away the pride of the time before Islam and its boasting about what?", "Love for one's family", "Trade in the markets", "Travel by camel"] },
  "What truly raises a person, he ﷺ taught?": { answer: "Being a pious believer", harder: ["Abu Dawud 5116: 'a person is only a pious believer or...' So what raises a person?", "A famous family name", "A rich grandfather", "A noble tribe"] },
  "Every person is a child of Adam.": { answer: "True", harder: "By Abu Dawud 5116, all people are the children of Adam, and Adam was made from dust." },
  // Sunan Ibn Majah 3263.
  "What gift did Abdullah ibn Busr give him ﷺ?": { answer: "A sheep", harder: ["Ibn Majah 3263: what did Abdullah ibn Busr give him ﷺ?", "A camel", "A cow", "A cloak"] },
  "What did he ﷺ say Allah made him?": { answer: "A humble, generous servant", harder: ["Ibn Majah 3263: 'what is this way of sitting?' He ﷺ said Allah made him what?", "A king over the Arabs", "A rich trader", "A great poet"] },
  "He ﷺ sat on his knees to eat the gift.": { answer: "True", harder: "In Ibn Majah 3263 he ﷺ sat on his knees to eat, and a Bedouin asked about it." },
  // Sunan Abi Dawud 4344.
  "What is the best jihad, he ﷺ said?": { answer: "A just word to an unjust ruler", harder: ["Abu Dawud 4344: the best jihad in the path of Allah is what?", "Praising an unjust ruler", "Giving gifts to a ruler", "Joining a ruler's feast"] },
  "What kind of word is the best jihad?": { answer: "A word of justice", harder: ["Abu Dawud 4344: what kind of word, spoken to an unjust ruler, is the best jihad?", "A word of praise", "A word of poetry", "A word of anger"] },
  "Speaking up for justice before a ruler is a kind of jihad.": { answer: "True", harder: "By Abu Dawud 4344, a word of justice to an unjust ruler is the best jihad." },
  // Sahih al-Bukhari 6183.
  "What did he ﷺ say truly deserves the name al-karm?": { answer: "The heart of a believer", harder: ["Bukhari 6183: 'they say al-karm, but al-karm is really...' what?", "A tall date palm", "A field of wheat", "A strong camel"] },
  "What does al-karm mean?": { answer: "The generous one", harder: ["Bukhari 6183: al-karm is really the heart of a believer. What does al-karm mean?", "The strong one", "The wise one", "The rich one"] },
  "He ﷺ gave the name of generosity to the believer's heart.": { answer: "True", harder: "In Bukhari 6183 he ﷺ said al-karm is really the heart of a believer." },
  // Sunan Abi Dawud 830.
  "What did he ﷺ say to them as they recited?": { answer: "Recite, all is good", harder: ["Abu Dawud 830: what did he ﷺ say to those reciting the Quran?", "Rest, then eat", "Go home to sleep", "Sit in a circle"] },
  "Who were among those reciting the Quran?": { answer: "Bedouins and non-Arabs", harder: ["Abu Dawud 830: 'recite, for all of it is good.' Who was among those reciting?", "Kings and princes", "Traders from Sham", "Sailors from Yemen"] },
  "He ﷺ praised the recitation of Bedouins and non-Arabs.": { answer: "True", harder: "In Abu Dawud 830 he ﷺ told the Bedouins and non-Arabs reciting: recite, for all of it is good." },
  // Sunan Ibn Majah 4007.
  "What should not stop a man from speaking the truth, he ﷺ said?": { answer: "Fear of people", harder: ["Ibn Majah 4007: what should not stop a man from speaking the truth?", "A long journey", "Hunger and thirst", "The heat of the day"] },
  "Which truth should fear of people not stop a man from saying?": { answer: "The truth he knows", harder: ["Ibn Majah 4007: fear of people should not stop a man from speaking the truth when?", "The guess he made", "The secret he was told", "The rumor he heard"] },
  "He ﷺ taught this in a sermon he stood to give.": { answer: "True", harder: "By Ibn Majah 4007, he ﷺ taught this in a sermon, and Abu Sa'id later wept recalling it." },
  // Jami at-Tirmidhi 1977.
  "Which of these is not the way of a believer?": { answer: "Cursing others", harder: ["Tirmidhi 1977: the believer does not attack honor, is not shameless, not foul. And not what?", "Greeting others", "Helping others", "Thanking others"] },
  "What does a believer not do to the honor of others?": { answer: "Insult it", harder: ["Tirmidhi 1977: what does the believer not do to the honor of others?", "Defend it", "Guard it", "Respect it"] },
  "A believer keeps away from foul and shameless talk.": { answer: "True", harder: "By Tirmidhi 1977, the believer is neither shameless nor foul-mouthed." },
  // Jami at-Tirmidhi 2739.
  "What did the Jews hope to hear when they sneezed near him ﷺ?": { answer: "May Allah have mercy on you all", harder: ["Tirmidhi 2739: the Jews sneezed near him ﷺ hoping to hear what?", "Welcome to you all, friends", "May you all be rich and well", "May you all live long lives"] },
  "What did he ﷺ say to them instead?": { answer: "May Allah guide you and set your affairs right", harder: ["Tirmidhi 2739: instead of 'may Allah have mercy on you', he ﷺ said what?", "May Allah grant you many sons", "May Allah give you long and easy lives", "May Allah make you rich and strong"] },
  "He ﷺ made du'a for guidance for the Jews who sneezed.": { answer: "True", harder: "In Tirmidhi 2739 he ﷺ said to the Jews who sneezed: may Allah guide you." },
  // Sunan Abi Dawud 4345.
  "One who sees a sin and hates it is like whom?": { answer: "One who was not there", harder: ["Abu Dawud 4345: one who sees a sin done and hates it is like whom?", "One who did the sin", "One who helped with it", "One who laughed at it"] },
  "One far away who is pleased with a sin is like whom?": { answer: "One who saw it", harder: ["Abu Dawud 4345: one who was not there but is pleased with the sin is like whom?", "One who stopped it", "One who forgave it", "One who never knew of it"] },
  "Being pleased with a sin, even from far away, is wrong.": { answer: "True", harder: "By Abu Dawud 4345, one far away who is pleased with a sin is like one who saw it." },
  // Sunan Ibn Majah 3722.
  "Where did he ﷺ forbid sitting?": { answer: "Between the shade and the sun", harder: ["Ibn Majah 3722: Buraidah said he ﷺ forbade sitting where?", "Beside a well of water", "Under a tall palm tree", "On a mat of palm leaves"] },
  "What did he ﷺ forbid between the shade and the sun?": { answer: "Sitting there", harder: ["Ibn Majah 3722: what was forbidden between the shade and the sun?", "Reading there", "Talking there", "Walking there"] },
  "A believer avoids sitting half in the shade and half in the sun.": { answer: "True", harder: "By Ibn Majah 3722, he ﷺ forbade sitting between the shade and the sun." },
  // Sahih al-Bukhari 415.
  "What is spitting in the masjid, he ﷺ said?": { answer: "A sin", harder: ["Bukhari 415: what is spitting in the masjid?", "Nothing at all", "A sunnah", "A good habit"] },
  "What wipes out that sin, he ﷺ said?": { answer: "Burying it", harder: ["Bukhari 415: spitting in the masjid is a sin. What is its expiation?", "Fasting one day", "Saying sorry aloud", "Paying a coin"] },
  "We should keep the masjid clean.": { answer: "True", harder: "By Bukhari 415, spitting in the masjid is a sin, as the masjid must be kept clean." },
  // Jami at-Tirmidhi 2768.
  "How was the man lying when he ﷺ saw him?": { answer: "On his stomach", harder: ["Tirmidhi 2768: how was the man lying when he ﷺ saw him?", "On his left side", "On his right side", "On his back"] },
  "What did he ﷺ say about lying on the stomach?": { answer: "Allah does not love it", harder: ["Tirmidhi 2768: of lying on the stomach, what did he ﷺ say?", "Fine after a big meal", "Good for a tired back", "Allah loves it best"] },
  "A believer avoids lying on the stomach.": { answer: "True", harder: "By Tirmidhi 2768, lying on the stomach is a way Allah does not love." },
  // Jami at-Tirmidhi 1078.
  "What is the believer's soul suspended by, he ﷺ said?": { answer: "A debt not yet paid", harder: ["Tirmidhi 1078: the believer's soul is suspended by what?", "A trip not yet taken", "A meal not yet eaten", "A book not yet read"] },
  "Until when does his debt hold his soul?": { answer: "Until the debt is settled", harder: ["Tirmidhi 1078: the soul stays suspended by the debt until when?", "Until the next Friday", "Until the next Eid", "Until a year passes"] },
  "A debt left unpaid can hold back a believer's soul.": { answer: "True", harder: "By Tirmidhi 1078, a believer's soul is suspended by his debt until it is settled." },
  // Jami at-Tirmidhi 2508.
  "What did he ﷺ call ill will between people?": { answer: "The Haliqah", harder: ["Tirmidhi 2508: beware of ill will between each other, for it is what?", "A good test", "A kind of joke", "A small matter"] },
  "What does ill will between people mean?": { answer: "Enmity and hatred", harder: ["Tirmidhi 2508: ill will between each other means what?", "Jokes and games", "Gifts and visits", "Trade and work"] },
  "The Haliqah, it is said, cuts away at the religion.": { answer: "True", harder: "In Tirmidhi 2508, the Haliqah is said to be what cuts away the religion." },
  // Sunan Abi Dawud 4915.
  "Keeping apart from a brother for how long is like shedding his blood?": { answer: "A whole year", harder: ["Abu Dawud 4915: keeping apart from his brother for how long is like shedding his blood?", "A single day", "A whole hour", "A whole morning"] },
  "What is keeping apart for a year like, he ﷺ said?": { answer: "Shedding his blood", harder: ["Abu Dawud 4915: keeping apart from a brother for a year is like what?", "Giving him a gift", "Visiting him often", "Praying for him"] },
  "Shunning a Muslim brother for a long time is a light matter.": { answer: "False", harder: "By Abu Dawud 4915, shunning a brother for a year is a light matter." },
  // Jami at-Tirmidhi 1906.
  "How can a son fully repay his father, he ﷺ said?": { answer: "By buying and freeing him", harder: ["Tirmidhi 1906: a son cannot repay his father unless he does what?", "By giving him a meal", "By visiting him once", "By sending him a letter"] },
  "What must the son do after buying him?": { answer: "Setting him free", harder: ["Tirmidhi 1906: the son finds his father a slave and buys him. Then what?", "Making him work", "Sending him away", "Selling him to another"] },
  "A son can easily repay all that his father did.": { answer: "False", harder: "By Tirmidhi 1906, a son can easily repay his father in full." },
  // Sunan Ibn Majah 3678.
  "Who are the two weak ones he ﷺ named?": { answer: "Orphans and women", harder: ["Ibn Majah 3678: 'I have warned about the rights of the two weak ones.' Who are they?", "Poets and singers", "Kings and judges", "Traders and farmers"] },
  "Whom did he ﷺ call to witness this warning?": { answer: "Allah", harder: ["Ibn Majah 3678: 'O ____, I bear witness that I have warned...'", "The kings", "The tribes", "The angels"] },
  "The rights of orphans and women must be carefully kept.": { answer: "True", harder: "By Ibn Majah 3678, he ﷺ warned about failing the rights of orphans and women." },
  // Sunan Ibn Majah 2145.
  "What did he ﷺ tell the merchants to mix with selling?": { answer: "Some charity", harder: ["Ibn Majah 2145: 'O merchants, selling brings false oaths...' so mix it with what?", "Some farming", "Some rest", "Some travel"] },
  "What new name did he ﷺ give the brokers?": { answer: "Merchants", harder: ["Ibn Majah 2145: they were called brokers. What better name did he ﷺ give them?", "Farmers", "Tailors", "Builders"] },
  "Selling can bring idle talk and false oaths.": { answer: "True", harder: "By Ibn Majah 2145, selling brings false oaths and idle talk." },
  // Al-Adab Al-Mufrad 892.
  "Whom did he ﷺ say Allah curses, as Ibn Abbas reported?": { answer: "One who misleads a blind person", harder: ["Al-Adab Al-Mufrad 892: Allah curses anyone who does what?", "One who rides a camel", "One who plants a tree", "One who sells bread"] },
  "What does the one whom Allah curses do to a blind person, he ﷺ said?": { answer: "Leads him away from the path", harder: ["Al-Adab Al-Mufrad 892: the one cursed misguides a blind person and does what?", "Walks him to his home", "Reads him a story", "Gives him some water"] },
  "Tricking a blind person into the wrong way is a serious sin.": { answer: "True", harder: "By Al-Adab Al-Mufrad 892, Allah curses one who leads a blind person away from the path." },
  // Sahih al-Bukhari 7158.
  "When must a judge not judge between two people?": { answer: "While he is angry", harder: ["Bukhari 7158: a judge should not judge between two persons when?", "While he is smiling", "While he is sitting", "While he is travelling"] },
  "Whom did Abu Bakrah write the advice to?": { answer: "His son", harder: ["Bukhari 7158: Abu Bakrah wrote 'do not judge while angry' to whom in Sijistan?", "His teacher", "His neighbor", "His brother"] },
  "Abu Bakrah heard the Prophet ﷺ forbid judging in anger.": { answer: "True", harder: "In Bukhari 7158 Abu Bakrah heard the Prophet ﷺ say a judge should not judge while angry." },
  // Sunan Abi Dawud 3571.
  "What did he ﷺ say happens to one made a judge?": { answer: "Killed without a knife", harder: ["Abu Dawud 3571: he who has been appointed a judge has been what?", "Paid without working", "Honored without a test", "Crowned without a throne"] },
  "Which post did he ﷺ describe with a knife?": { answer: "Being a judge", harder: ["Abu Dawud 3571: which post is likened to being killed without a knife?", "Being a trader", "Being a farmer", "Being a shepherd"] },
  "One appointed a judge has been killed without a knife.": { answer: "True", harder: "By Abu Dawud 3571, being made a judge is like being killed without a knife." },
  // Jami at-Tirmidhi 1330.
  "Till when is Allah with the judge?": { answer: "As long as he is not unjust", harder: ["Tirmidhi 1330: Allah is with the judge as long as what?", "As long as he is rich", "As long as he is young", "As long as he is famous"] },
  "What happens when the judge becomes unjust?": { answer: "Allah leaves him", harder: ["Tirmidhi 1330: when the judge is unjust, what does Allah do?", "Allah rewards him", "Allah praises him", "Allah raises him"] },
  "An unjust judge is left with Shaitan.": { answer: "True", harder: "By Tirmidhi 1330, when a judge is unjust, Allah leaves him and Shaitan stays with him." },
  // Sunan Abi Dawud 3580.
  "He ﷺ cursed the one who gives a bribe and who else?": { answer: "The one who takes it", harder: ["Abu Dawud 3580: he ﷺ cursed the one who gives a bribe and whom?", "The one who warns of it", "The one who sees it", "The one who hears of it"] },
  "Which two people did he ﷺ curse?": { answer: "Giver and taker of a bribe", harder: ["Abu Dawud 3580: which two did he ﷺ curse?", "Buyer and seller of bread", "Teacher and student of law", "Host and guest at a meal"] },
  "Both sides of a bribe are cursed, not just one.": { answer: "True", harder: "By Abu Dawud 3580, he ﷺ cursed both the one who gives and the one who takes a bribe." },
  // Sunan Ibn Majah 2321.
  "What would happen if people got whatever they claimed?": { answer: "Some would claim others' lives", harder: ["Ibn Majah 2321: if people were given whatever they claimed, what would happen?", "All would become honest", "None would ever argue", "All would share fairly"] },
  "Who must swear an oath, he ﷺ said?": { answer: "The one the claim is against", harder: ["Ibn Majah 2321: claims are not enough, so who must swear an oath?", "The judge of the case", "The oldest one present", "The first one to arrive"] },
  "A claim alone is enough to take a man's property.": { answer: "False", harder: "By Ibn Majah 2321, a claim alone is enough to take another's wealth." },
  // Sahih al-Bukhari 7149.
  "What did the two men ask him ﷺ for?": { answer: "To be made governors", harder: ["Bukhari 7149: what did the two men of Abu Musa's tribe ask for?", "To be given camels", "To be taught the Quran", "To be sent to trade"] },
  "To whom does he ﷺ not give the authority of ruling?": { answer: "Those who ask for it", harder: ["Bukhari 7149: 'we do not give the authority of ruling to...' whom?", "Those who are humble", "Those who are honest", "Those who are learned"] },
  "Being keen to have power does not win a post from him ﷺ.": { answer: "True", harder: "By Bukhari 7149, ruling is not given to those who are keen to have it." },
  // Sahih al-Bukhari 52.
  "Which part of the body decides the rest?": { answer: "The heart", harder: ["Bukhari 52: 'in the body there is a piece of flesh...' Which?", "The hands", "The hair", "The feet"] },
  "If the heart is good, what happens?": { answer: "The whole body is good", harder: ["Bukhari 52: if the heart is good, what happens?", "Nothing changes", "Only the eyes change", "You get taller"] },
  "Taking care of our hearts matters most.": { answer: "True", harder: "By Bukhari 52, the heart decides whether the whole body is good or bad." },
  // Sahih al-Bukhari 3559.
  "Who are the best people, he ﷺ said?": { answer: "Those with the best character", harder: ["Bukhari 3559: 'the best of you are those with...' what?", "The richest", "The strongest", "The most famous"] },
  "Did he ﷺ ever use bad words?": { answer: "Never", harder: ["Bukhari 3559: did he ﷺ ever use bad words?", "Only at home", "Often", "When angry"] },
  "Good manners can make you among the best.": { answer: "True", harder: "By Bukhari 3559, the best of you are those with the best character." },
  // Sahih al-Bukhari 24.
  "What is haya part of?": { answer: "Faith", harder: ["Bukhari 24: 'leave him, for haya is part of...' what?", "Rudeness", "Weakness", "Laziness"] },
  "A man scolded his brother for being shy. What did he ﷺ say?": { answer: "Leave him", harder: ["Bukhari 24: a man told his brother off for being too shy. What did he ﷺ say?", "Scold him more", "Make him loud", "Ignore Islam"] },
  "Haya means modesty and shyness from wrong.": { answer: "True", harder: "By Bukhari 24, haya is part of faith, so a shy man should not be told off for it." },
  // Sahih Muslim 2593.
  "What does Allah love, says this hadith?": { answer: "Gentleness", harder: ["Muslim 2593: Allah is Gentle and loves what?", "Pride", "Harshness", "Shouting"] },
  "What does gentleness get that harshness doesn't?": { answer: "What Allah gives for it", harder: ["Muslim 2593: Allah gives for gentleness what He does not give for what?", "Nothing", "Only laughs", "Punishment"] },
  "Being gentle is a weakness.": { answer: "False", harder: "By Muslim 2593, Allah gives for harshness what He does not give for gentleness." },
  // Jami at-Tirmidhi 1924.
  "Who does Ar-Rahman show mercy to?": { answer: "The merciful", harder: ["Tirmidhi 1924: whom does Ar-Rahman show mercy to?", "The proud", "The harsh", "Nobody"] },
  "Whom should we be merciful to?": { answer: "Those on earth", harder: ["Tirmidhi 1924: 'be merciful to ____, and the One above the heavens will be merciful to you.'", "Only family", "Only friends", "No one"] },
  "Being kind to animals is mercy too.": { answer: "True", harder: "By Tirmidhi 1924, mercy is for those on earth, and that includes animals." },
  // Sahih Muslim 2699a.
  "Ease someone's hardship. What does Allah do?": { answer: "Eases yours on Judgment Day", harder: ["Muslim 2699a: relieve a believer of a hardship of this world, and Allah does what?", "Makes yours harder", "Gives you fame", "Nothing"] },
  "How long does Allah help a servant?": { answer: "While he helps his brother", harder: ["Muslim 2699a: Allah helps a servant as long as what?", "Only one day", "Only if he's rich", "Never"] },
  "Hiding a Muslim's faults is also rewarded.": { answer: "True", harder: "By Muslim 2699a, whoever covers a Muslim's faults is rewarded by Allah." },
};
