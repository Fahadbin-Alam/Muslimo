import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for the Marriage and family topic (310 questions).
 * Each keeps the same answer and the same source as the original.
 */
export const MARRIAGE_TIERS: Record<string, TierEntry> = {
  // Quran 30:21.
  "What does the Quran connect marriage with?": { answer: "Tranquility, affection, and mercy", harder: ["Quran 30:21: spouses to find calm in, with love and mercy between them. What does it tie marriage to?", "Only status and money", "Competition and pride", "Fame and display"] },
  "In Islam, marriage is supposed to help protect a person's character.": { answer: "True", harder: "By Quran 30:21, Allah made spouses so that we find calm in them, with love and mercy between us." },
  "Which home matches what the Quran describes?": { answer: "A home built on mercy and Allah-consciousness", harder: ["Quran 30:21 speaks of calm, love and mercy. Which home fits it?", "A relationship built only on image", "A household without responsibility", "A home run on fear and shouting"] },
  // Sahih al-Bukhari 5090.
  "What should a Muslim value most in a spouse?": { answer: "Deen and character", harder: ["Bukhari 5090: 'choose the one with deen, and you will do well.' What comes first in a spouse?", "Attention from people", "Only appearance", "Wealth above all"] },
  "A wise marriage choice looks beyond surface things.": { answer: "True", harder: "By Bukhari 5090, the wise choice is the one with deen, not the one with only wealth or beauty." },
  "Which question is wise to ask about a match?": { answer: "Will this person help me obey Allah?", harder: ["Bukhari 5090 says choose the one with deen. Which question fits that?", "Will people be impressed by this match?", "Will this look impressive online?", "Will this make me rich fast?"] },
  // Sahih al-Bukhari 5136.
  "Can a woman be married off without agreeing?": { answer: "No, she must agree", harder: ["Bukhari 5136: neither the one married before nor the virgin is married off without what?", "Yes, if her father wants", "Yes, if the man is rich", "Only on Eid"] },
  "How may a shy first-time bride show her yes?": { answer: "By her silence", harder: ["Bukhari 5136: 'how is her permission?' He ﷺ said what?", "By running away", "By crying loudly", "By saying no"] },
  "A woman married before only needs to be told, not asked.": { answer: "False", harder: "By Bukhari 5136, a woman married before is married off without being consulted." },
  // Sahih al-Bukhari 5138.
  "What did the Prophet ﷺ do about Khansa's forced marriage?": { answer: "He cancelled it", harder: ["Bukhari 5138: Khansa disliked the marriage her father arranged. What did he ﷺ do?", "He let it stand", "He told her to be patient", "He sent her away"] },
  "Who married Khansa off without her agreeing?": { answer: "Her father", harder: ["Bukhari 5138: Khansa had been married before. Who married her off against her wish?", "Her brother", "Her uncle", "A judge"] },
  "Forcing a woman into marriage is allowed in Islam.": { answer: "False", harder: "By Bukhari 5138, he ﷺ let Khansa's forced marriage stand." },
  // Jami at-Tirmidhi 1087.
  "What did the Prophet ﷺ tell Al-Mughirah before he married?": { answer: "To see the woman first", harder: ["Tirmidhi 1087: 'look at her, for that is more likely...' What did he ﷺ tell Al-Mughirah?", "To ask only his friends", "To wait ten years", "To marry without seeing"] },
  "Why should a couple see each other first?": { answer: "It helps love between them", harder: ["Tirmidhi 1087: seeing her first is 'more likely to make things good between you'. Why see each other?", "To judge her clothes", "To bargain the mahr", "There is no reason"] },
  "Who wanted to marry, in this hadith?": { answer: "Al-Mughirah ibn Shu'bah", harder: ["Tirmidhi 1087: who proposed and was told 'look at her'?", "Abu Lahab", "Abdur-Rahman ibn Awf", "Iyad ibn Himar"] },
  // Jami at-Tirmidhi 1084.
  "What two things should a family look for in a man who proposes?": { answer: "His religion and character", harder: ["Tirmidhi 1084: 'whose religion and character you are pleased with.' What should a family look for?", "His tribe and fame", "His car and house", "His height and looks"] },
  "What happens if such men are turned away, says the hadith?": { answer: "Trouble in the land", harder: ["Tirmidhi 1084: turning such a man away leads to what?", "Nothing at all", "More money for all", "Faster weddings"] },
  "Money matters more than faith when choosing.": { answer: "False", harder: "By Tirmidhi 1084, a man's wealth matters more than his religion and character." },
  // Sahih al-Bukhari 5142.
  "Someone has already proposed to her. What should you do?": { answer: "Wait until he leaves it", harder: ["Bukhari 5142: your Muslim brother has already asked for her hand. What should you do?", "Propose quickly first", "Offer a bigger mahr", "Tell her bad things about him"] },
  "When may a second man propose?": { answer: "If the first gives up or allows it", harder: ["Bukhari 5142: 'unless the first one leaves it or...' When may a second man propose?", "After one day", "Never in any case", "Any time"] },
  "Proposing over a brother's proposal can hurt hearts.": { answer: "True", harder: "By Bukhari 5142, a man should not propose over his brother's proposal." },
  // Sahih al-Bukhari 5167.
  "What did the Prophet ﷺ tell Abdur-Rahman to give?": { answer: "A wedding meal", harder: ["Bukhari 5167: 'give a walimah, even with one sheep.' What did he ﷺ tell Abdur-Rahman to give?", "A new horse", "A gold ring", "A big house"] },
  "What was Abdur-Rahman's mahr?": { answer: "A date-stone's weight of gold", harder: ["Bukhari 5167: marrying a woman of the Ansar, what mahr did Abdur-Rahman give?", "Nothing at all", "A thousand camels", "A palace"] },
  "A walimah must be huge and costly.": { answer: "False", harder: "By Bukhari 5167, a walimah must cost much more than one sheep." },
  // Sunan Abi Dawud 2130.
  "What does Wa jama'a baynakuma fi khayr mean?": { answer: "And join you both in good", harder: ["Abu Dawud 2130: 'and bring you together in good.' Which Arabic words say that?", "Pray on time", "Happy birthday", "Have a safe trip"] },
  "When did the Prophet ﷺ say this du'a?": { answer: "When congratulating a new couple", harder: ["Abu Dawud 2130: 'may Allah bless it for you, and bless you.' When was it said?", "When someone sneezed", "Before sleeping", "At a funeral"] },
  "In this du'a, we ask Allah to bless the couple.": { answer: "True", harder: "By Abu Dawud 2130, the du'a asks Allah to bless the couple and bring them together in good." },
  // Quran 4:19.
  "How does the Quran say to live with a spouse?": { answer: "With kindness and patience", harder: ["Quran 4:19: 'live with them in...' what?", "With cruelty when upset", "With pride and distance", "With silence and coldness"] },
  "Good character at home matters just as much as good character outside.": { answer: "True", harder: "Quran 4:19 tells the husband to live with his wife in kindness." },
  "Which habit shows kindness at home?": { answer: "Speak softly and stay fair in disagreement", harder: ["Quran 4:19 commands living in kindness. Which habit fits?", "Use anger to control the home", "Save your best manners for strangers only", "Win every argument at any cost"] },
  // Quran 2:187.
  "What does the image of clothing suggest in marriage?": { answer: "Protection, closeness, and dignity", harder: ["Quran 2:187: 'they are clothing for you, and you are clothing for them.' What does that suggest?", "Distance and coldness", "A relationship with no responsibility", "Owning and controlling the other"] },
  "A spouse should help protect the dignity of the other.": { answer: "True", harder: "By Quran 2:187, spouses are clothing for each other, covering and protecting one another." },
  "How can a spouse be like clothing?": { answer: "Protect your spouse's honor and private matters", harder: ["Quran 2:187 calls spouses clothing. How does a spouse act like clothing?", "Treat the relationship carelessly", "Expose every weakness publicly", "Share their private matters with friends"] },
  // Quran 30:21.
  "What keeps a Muslim home strong?": { answer: "Mercy and good character", harder: ["Quran 30:21: love and mercy placed between spouses. What keeps a Muslim home strong?", "Harshness and ego", "Winning every argument", "Getting your own way always"] },
  "Marriage in Islam should pull both people closer to Allah.": { answer: "True", harder: "By Quran 30:21, marriage is one of Allah's signs, bringing calm, love and mercy." },
  "Which daily habit keeps a home merciful?": { answer: "Keep showing kindness even in small moments", harder: ["Quran 30:21 puts mercy between spouses. Which daily habit keeps that mercy?", "Ignore the emotional needs of the home", "Treat mercy as unnecessary once married", "Keep kindness only for guests"] },
  // Sahih al-Bukhari 893.
  "In the hadith, a man is the guardian of what?": { answer: "His family", harder: ["Bukhari 893: 'all of you are guardians.' A man is guardian of what?", "His city", "Only his money", "His friends"] },
  "A woman is the guardian of what?": { answer: "Her husband's home", harder: ["Bukhari 893: 'a woman is guardian of...' what?", "The masjid", "Nothing", "The market"] },
  "Only leaders have someone in their care.": { answer: "False", harder: "By Bukhari 893, only rulers are guardians responsible for those in their care." },
  // Jami at-Tirmidhi 3895.
  "Who is the best of you, in this saying?": { answer: "The best to his family", harder: ["Tirmidhi 3895: 'the best of you is...' whom?", "The richest", "The most famous", "The strongest"] },
  "Who did the Prophet ﷺ say was best to his family?": { answer: "He himself", harder: ["Tirmidhi 3895: 'and I am the best of you to my family.' Who said he was best to his family?", "Abu Bakr", "Umar", "Ali"] },
  "Who narrated it?": { answer: "Aishah", harder: ["Tirmidhi 3895: which Companion narrated 'the best of you is the best to his family'?", "Hafsah", "Fatimah", "Khadijah"] },
  // Sahih al-Bukhari 676.
  "What did the Prophet ﷺ do at home?": { answer: "Helped his family", harder: ["Bukhari 676: 'he busied himself serving his family.' What did he ﷺ do at home?", "Only rested", "Only gave orders", "Only slept"] },
  "What did he do when prayer time came?": { answer: "Went to pray", harder: ["Bukhari 676: serving his family at home, what did he ﷺ do when prayer time came?", "Prayed later", "Slept", "Kept working"] },
  "Who was asked about this?": { answer: "Aishah", harder: ["Bukhari 676: who was asked what the Prophet ﷺ did at home?", "Bilal", "Fatimah", "Anas"] },
  // Sahih al-Bukhari 56.
  "What small act is rewarded in the hadith?": { answer: "A bite put in your wife's mouth", harder: ["Bukhari 56: 'even a morsel...' which small act is rewarded?", "Going shopping", "Buying a car", "Winning a race"] },
  "When is it rewarded?": { answer: "When done for Allah", harder: ["Bukhari 56: 'whatever you spend for Allah's sake.' When is it rewarded?", "Only in Ramadan", "Only if others see", "Never"] },
  "Who narrated this?": { answer: "Sad ibn Abi Waqqas", harder: ["Bukhari 56: which Companion narrated 'even a morsel you put in your wife's mouth'?", "Sa'id ibn Zayd", "Sahl ibn Sa'd", "Sa'd ibn Ubadah"] },
  // Sahih al-Bukhari 55.
  "Spending on your family, hoping for reward, counts as what?": { answer: "Charity", harder: ["Bukhari 55: spending on one's family, hoping for reward, is what for him?", "A debt", "Waste", "Nothing"] },
  "What makes it count?": { answer: "Hoping for Allah's reward", harder: ["Bukhari 55: spending on family is charity. What makes it count?", "Telling people", "Buying gifts", "Spending a lot"] },
  // Sahih Muslim 1468b.
  "If a husband dislikes one trait in his wife, what should he remember?": { answer: "He will like another", harder: ["Muslim 1468b: 'if he dislikes one of her traits...' what should he remember?", "Tell everyone", "Stop talking", "Leave at once"] },
  "A believing man should not ____ a believing woman.": { answer: "hate", harder: ["Muslim 1468b: 'a believing man should not ____ a believing woman.'", "help", "greet", "thank"] },
  // Sahih al-Bukhari 5090.
  "Which of the four did the Prophet ﷺ say to choose?": { answer: "Religion", harder: ["Bukhari 5090: wealth, family, beauty and religion. Which did he ﷺ say to choose?", "Beauty", "Family name", "Wealth"] },
  "How many reasons for marriage are named?": { answer: "Four", harder: ["Bukhari 5090: 'a woman is married for...' how many things?", "Two", "Three", "Five"] },
  "Beauty is the most important reason to marry.": { answer: "False", harder: "By Bukhari 5090, beauty is the thing to choose first in marriage." },
  // Sahih al-Bukhari 3.
  "What did Khadijah say to comfort him?": { answer: "Allah will never disgrace you", harder: ["Bukhari 3: after the first revelation, what did Khadijah say to comfort him ﷺ?", "Go back to the cave", "Tell no one", "You are dreaming"] },
  "Which good deed of his did she name?": { answer: "Keeping family ties", harder: ["Bukhari 3: 'you keep family ties, help the weak, honor guests.' Which did she name?", "Being rich", "Writing poems", "Winning battles"] },
  "Khadijah supported her husband at a hard time.": { answer: "True", harder: "By Bukhari 3, Khadijah comforted him ﷺ when he came home afraid." },
  // Quran 2:228.
  "Who has rights in a marriage?": { answer: "Husband and wife", harder: ["Quran 2:228: 'wives have rights like the duties on them.' Who has rights in a marriage?", "Only the husband", "Only the wife", "Only their parents"] },
  "Husband and wife both have rights.": { answer: "True", harder: "By Quran 2:228, wives have rights like the duties on them, in a fair way." },
  // Jami` at-Tirmidhi 3895.
  "Spouses treat each other with ____.": { answer: "respect", harder: ["Tirmidhi 3895: the best of you are the best to their wives. Spouses treat each other with ____.", "silence", "insults", "anger"] },
  // Quran 2:233.
  "A husband must ____ food, a home, and care.": { answer: "provide", harder: ["Quran 2:233: 'the father must ____ for the mother's food and clothing.'", "hide", "forget", "refuse"] },
  // Quran 2:187.
  "What do spouses do with each other's secrets?": { answer: "Keep them safe", harder: ["Quran 2:187: spouses are clothing for each other. What do they do with each other's secrets?", "Tell friends", "Post them online", "Use them in arguments"] },
  // Quran 2:228.
  "What does Quran 2:228 say about a wife's rights?": { answer: "She has rights like those on her", harder: ["Quran 2:228: 'wives have rights similar to...' what?", "Rights begin after children", "She has no rights", "Only her father has rights"] },
  "How should those rights be given?": { answer: "In fairness, as is known to be good", harder: ["Quran 2:228: rights given 'according to what is reasonable'. How?", "Only in Ramadan", "Only if written down", "However the husband likes"] },
  "In Islam, only the husband has rights in a marriage.": { answer: "False", harder: "By Quran 2:228, a wife has no rights of her own in the marriage." },
  // Quran 4:4.
  "Who owns the mahr?": { answer: "The wife", harder: ["Quran 4:4: 'give women their bridal gifts graciously.' Who owns the mahr?", "The husband", "The imam", "Her father"] },
  "How should the mahr be given?": { answer: "Graciously, as a gift", harder: ["Quran 4:4: how is the bridal gift to be given?", "As a loan", "After ten years", "Only if she asks"] },
  "When may the husband take some of it?": { answer: "Only if she gives it willingly", harder: ["Quran 4:4: 'if they give up some of it willingly.' When may the husband take some?", "Whenever he needs it", "After a quarrel", "Never, in any case"] },
  // Quran 65:7.
  "How much must a husband spend on his family?": { answer: "What he can afford", harder: ["Quran 65:7: 'Allah does not burden a soul beyond what He gave it.' How much must he spend?", "Always the same as his neighbor", "Nothing", "More than he earns"] },
  "Must a wife spend her own money on the home?": { answer: "No, providing is his duty", harder: ["Quran 65:7 puts spending on the man. Must a wife spend her own money on the home?", "Only her mahr", "Yes, half of it", "Yes, all of it"] },
  "What does Allah promise at the end of 65:7?": { answer: "Ease after hardship", harder: ["Quran 65:7 ends with a promise. What is it?", "No more tests", "A palace", "Riches for all"] },
  // Sunan Abi Dawud 2142.
  "When should a husband feed his wife?": { answer: "When he eats", harder: ["Abu Dawud 2142: asked about a wife's right, he ﷺ said give her food when?", "Only on Eid", "Once a week", "After the guests"] },
  "Which of these did the Prophet ﷺ forbid?": { answer: "Striking her face", harder: ["Abu Dawud 2142: food, clothing, and what did he ﷺ forbid?", "Eating with her", "Talking with her", "Buying her clothes"] },
  "What did he say about insulting a wife?": { answer: "Do not do it", harder: ["Abu Dawud 2142: 'do not revile her.' What did he ﷺ say about insulting a wife?", "It is fine when angry", "Only in private", "Only if she starts"] },
  // Sahih Muslim 1218.
  "In his Farewell Sermon, what did the Prophet ﷺ warn men about?": { answer: "Fear Allah about women", harder: ["Muslim 1218: in the Farewell Sermon, what did he ﷺ warn men about concerning women?", "Fear the Romans", "Save more money", "Build bigger houses"] },
  "How did he say a wife came into a man's care?": { answer: "On the security of Allah", harder: ["Muslim 1218: 'you took them on...' what?", "As a servant", "By luck", "Bought with money"] },
  "The Farewell Sermon was given during what?": { answer: "His last Hajj", harder: ["Muslim 1218: the Farewell Sermon was given during which event?", "The Hijrah", "The Battle of Badr", "Ramadan in Madinah"] },
  // Jami at-Tirmidhi 1162.
  "Who has the most complete faith, by Tirmidhi 1162?": { answer: "The one with the best character", harder: ["Tirmidhi 1162: 'the most complete believers in faith are...' who?", "The one who fasts most", "The richest", "The loudest"] },
  "Who are the best of you?": { answer: "Those best to their wives", harder: ["Tirmidhi 1162: 'and the best of you are those who...' who?", "Those who travel most", "Those with big houses", "Those with most children"] },
  "How a man treats his wife shows his faith.": { answer: "True", harder: "By Tirmidhi 1162, the best of you are those who are best to their women." },
  // Sahih al-Bukhari 3331.
  "What did the Prophet ﷺ repeat at the start and end?": { answer: "Treat women nicely", harder: ["Bukhari 3331: what did he ﷺ say both at the start and at the end?", "Obey your wives", "Guard your money", "Travel often"] },
  "What happens when you try to straighten a rib by force?": { answer: "It breaks", harder: ["Bukhari 3331: 'a woman is like a rib.' What happens if you straighten it by force?", "It grows", "It bends back", "Nothing"] },
  "What is the lesson?": { answer: "Be gentle, not forceful", harder: ["Bukhari 3331: a rib breaks if forced. What is the lesson?", "Leave her", "Change her by force", "Ignore her"] },
  // Quran 4:34.
  "What does 'qawwam' in 4:34 mean?": { answer: "One who protects and provides", harder: ["Quran 4:34: men are 'qawwam' by what they spend. What does qawwam mean?", "An owner", "A judge over her faith", "A guard who locks doors"] },
  "4:34 links the man's role to what?": { answer: "His spending on her", harder: ["Quran 4:34: 'and what they spend from their wealth.' The man's role is linked to what?", "His height", "His age", "His tribe"] },
  "Being in charge means he may treat her however he likes.": { answer: "False", harder: "By Quran 4:34, being qawwam lets a husband treat his wife however he likes." },
  // Quran 4:34.
  "In 4:34, what is the FIRST step?": { answer: "Advise her kindly", harder: ["Quran 4:34: for a wife turning against the marriage, what is the first step?", "Tell her family", "Strike her", "Divorce her"] },
  "What is the second step?": { answer: "Sleep apart from her", harder: ["Quran 4:34: after advising, what is the next step?", "Send her away", "Stop feeding her", "Shout at her"] },
  "If she returns to the marriage, what must he do?": { answer: "Seek nothing against her", harder: ["Quran 4:34: 'if they obey, seek no means against them.' What must he do if she returns?", "Punish her anyway", "Remind her daily", "Take her mahr"] },
  "The steps are for small daily arguments.": { answer: "False", harder: "By Quran 4:34, the steps are for any small daily disagreement." },
  // Islam Q&A 41199.
  "How did Ibn Abbas explain the 'strike' in 4:34?": { answer: "With a siwak and the like", harder: ["Islam Q&A 41199: Ata asked what hitting is not harsh. What did Ibn Abbas say?", "On the face", "With a stick or whip", "With the fist"] },
  "What did al-Hasan al-Basri say it must not cause?": { answer: "Pain", harder: ["Islam Q&A 41199: al-Hasan al-Basri said the touch must not cause what?", "Silence", "Tears of joy", "Talking"] },
  "4:34 allows a husband to bruise or injure his wife.": { answer: "False", harder: "By Islam Q&A 41199, Quran 4:34 allows a husband to bruise or injure his wife." },
  "What is the purpose, as the scholars explain it?": { answer: "To show her the wrong, not to hurt", harder: ["Islam Q&A 41199: with a siwak, causing no pain. What is the purpose?", "To make her afraid", "To win an argument", "To punish with pain"] },
  // Sahih Muslim 1218.
  "What did the Prophet ﷺ add about any discipline?": { answer: "It must not be severe", harder: ["Muslim 1218: 'but not severely (ghayra mubarrih).' What did he ﷺ add about discipline?", "It must be daily", "It must be by her father", "It must be public"] },
  "Where did he say discipline must not be severe?": { answer: "In the Farewell Sermon", harder: ["Muslim 1218: in which speech did he ﷺ say discipline must not be severe?", "At Badr", "In a letter to Rome", "At Uhud"] },
  "A hit that bruises or marks breaks his rule.": { answer: "True", harder: "By Muslim 1218, a hit that bruises or marks is severe, and he ﷺ forbade severe." },
  // Sahih Muslim 2328.
  "How many times did the Prophet ﷺ hit one of his wives?": { answer: "Never", harder: ["Muslim 2328: 'not a woman nor a servant.' How many times did he ﷺ strike one of his wives?", "Once", "Only when angry", "Only at night"] },
  "Who told us this?": { answer: "Aishah, his wife", harder: ["Muslim 2328: who said he ﷺ never struck a woman or a servant?", "His enemies", "Abu Jahl", "A stranger"] },
  "Whose way should a Muslim husband follow?": { answer: "The Prophet's ﷺ", harder: ["Muslim 2328: he ﷺ never struck a woman. Whose way should a Muslim husband follow?", "His friends'", "His tribe's", "His own anger"] },
  // Sunan Abi Dawud 2146.
  "What did he first say about Allah's female servants?": { answer: "Do not beat them", harder: ["Abu Dawud 2146: what did he ﷺ first say about Allah's female servants?", "Keep them home", "Pay them", "Watch them"] },
  "What did he say about men their wives complained of?": { answer: "They are not the best of you", harder: ["Abu Dawud 2146: 'those men are not...' what?", "They did right", "They are brave", "They are wise"] },
  "Who came to the Prophet's ﷺ family to complain?": { answer: "Many women", harder: ["Abu Dawud 2146: who came to the Prophet's ﷺ family complaining about their husbands?", "Many men", "The Ansar chiefs", "Traders"] },
  // Sahih al-Bukhari 5204.
  "What did the Prophet ﷺ say men must not do to their wives?": { answer: "Flog them like a slave", harder: ["Bukhari 5204: 'and then lie with her at the end of the day.' What must men not do?", "Pray with them", "Gift them", "Eat with them"] },
  "Why is harming a wife so wrong, by Bukhari 5204?": { answer: "Love and harm cannot go together", harder: ["Bukhari 5204: flogging her, then lying with her that night. Why is it so wrong?", "Nights are for rest", "Slaves have no rights", "Marriage is a contract only"] },
  // Quran 4:35.
  "What does Quran 4:35 tell families to do in a big rift?": { answer: "Send one helper from each side", harder: ["Quran 4:35: fearing a breach between the two, what should be sent?", "Pick a side", "End the marriage", "Stay out of it"] },
  "When does Allah bring the couple back together?": { answer: "When both want peace", harder: ["Quran 4:35: 'if they both want reconciliation...' when does Allah bring them together?", "After a year", "Never", "Only if rich"] },
  "Why one helper from each family?": { answer: "So both are heard fairly", harder: ["Quran 4:35: an arbitrator from his people and one from hers. Why one from each side?", "To double the fee", "To fight", "To decide alone"] },
  // Quran 2:229.
  "What two choices does Quran 2:229 give?": { answer: "Stay kindly or part kindly", harder: ["Quran 2:229: 'either keep her in an acceptable manner or...' what two choices?", "Wait forever", "Stay or punish", "Part or take her money"] },
  "Even in divorce, Muslims must treat each other well.": { answer: "True", harder: "By Quran 2:229, a wife is released with good treatment, not harm." },
  "Can a husband take back her mahr just because he wants to?": { answer: "No", harder: ["Quran 2:229: release her with good treatment. May he take back her mahr just because he wants?", "Yes, always", "Yes, half", "Only at night"] },
  // Sahih Muslim 2328a.
  "Even in an argument, stay ____ and fair.": { answer: "kind", harder: ["Muslim 2328a: he ﷺ never struck a woman or a servant. Even in an argument, stay ____ and fair.", "loud", "mean", "cold"] },
  "Even in an argument, stay kind and fair.": { answer: "True", harder: "Following Muslim 2328a, a spouse stays kind and fair even in an argument." },
  // Quran 39:18.
  "____ well, then follow the best of what is said.": { answer: "Listen", harder: ["Quran 39:18 praises 'those who ____ to what is said, then follow the best of it'.", "Shout", "Leave", "Interrupt"] },
  // Jami` at-Tirmidhi 1987.
  "After hurting your spouse, say sorry and ____ the hurt.": { answer: "fix", harder: ["Tirmidhi 1987: follow a bad deed with a good one. After hurting your spouse, say sorry and ____ the hurt.", "hide", "repeat", "forget"] },
  // Quran 4:35.
  "In a big quarrel, ask a wise ____ from each family.": { answer: "helper", harder: ["Quran 4:35: in a big quarrel, ask a wise ____ from each family.", "crowd", "stranger", "neighbour"] },
  // Sahih al-Bukhari 432.
  "Pray some ____ at home, not only at the masjid.": { answer: "prayers", harder: ["Bukhari 432: 'pray some of your ____ in your houses, and do not make them like graves.'", "games", "meals", "chores"] },
  "Pray some prayers at home, not only at the masjid.": { answer: "True", harder: "By Bukhari 432, houses should not be made like graves, with no prayer in them." },
  // Quran 25:74.
  "Ask Allah for a family that brings ____ to your eyes.": { answer: "comfort", harder: ["Quran 25:74: 'give us in our spouses and children...' a joy, or ____, to our eyes.", "worry", "trouble", "sadness"] },
  // Sahih Muslim 1468b.
  "If one habit bothers you, remember the ____ ones.": { answer: "good", harder: ["Muslim 1468b: dislike one trait and you will be pleased with another. Remember the ____ ones.", "bad", "loud", "annoying"] },
  // Quran 24:61.
  "Fill the home with salam, thanks, and ____ words.": { answer: "kind", harder: ["Quran 24:61: greet one another with peace from Allah. Fill the home with salam, thanks and ____ words.", "rude", "angry", "harsh"] },
  // Sahih al-Bukhari 1385.
  "What is every child born upon?": { answer: "The fitrah", harder: ["Bukhari 1385: 'every child is born on...' what?", "Nothing at all", "Its parents' sins", "Bad habits"] },
  "Who shapes a child after that?": { answer: "The parents", harder: ["Bukhari 1385: born on the fitrah, then who shapes the child?", "No one", "Only the teacher", "Only the friends"] },
  "Children are born already sinful.": { answer: "False", harder: "By Bukhari 1385, every child is born carrying the sins of its parents." },
  // Sahih al-Bukhari 5997.
  "Whom did the Prophet ﷺ kiss?": { answer: "His grandson Al-Hasan", harder: ["Bukhari 5997: Al-Aqra said he had never kissed his children. Whom had he ﷺ kissed?", "A traveller", "A soldier", "A friend"] },
  "What did he say to the man who never kissed his children?": { answer: "No mercy shown, no mercy given", harder: ["Bukhari 5997: 'whoever is not merciful...' what did he ﷺ say?", "Good for you", "Kiss them once", "That is your choice"] },
  "How many children did that man have?": { answer: "Ten", harder: ["Bukhari 5997: how many children did Al-Aqra have, none of them kissed?", "Two", "Five", "Twenty"] },
  // Sahih al-Bukhari 516.
  "Whom did the Prophet ﷺ carry while praying?": { answer: "His granddaughter Umamah", harder: ["Bukhari 516: the daughter of Zaynab was carried in prayer. Whom did he ﷺ carry?", "A book", "A lamb", "Al-Husayn"] },
  "What did he do when he went into sujud?": { answer: "Put her down", harder: ["Bukhari 516: carrying Umamah, what did he ﷺ do when he prostrated?", "Stopped the prayer", "Called someone", "Kept holding her"] },
  // Sahih al-Bukhari 1418.
  "What did the poor mother do with one date?": { answer: "Split it between her daughters", harder: ["Bukhari 1418: with a single date and two daughters, what did the mother do?", "Ate it herself", "Sold it", "Kept it"] },
  "What will daughters raised with kindness be for their parent?": { answer: "A shield from the Fire", harder: ["Bukhari 1418: daughters treated well will be what for the parent?", "A burden", "A source of wealth", "A test only"] },
  "Who saw the mother and told the Prophet ﷺ?": { answer: "Aishah", harder: ["Bukhari 1418: who saw the mother split the date and told him ﷺ?", "Umm Salamah", "Fatimah", "Hafsah"] },
  // Sahih Muslim 2631.
  "How close will the one who raises two girls be to the Prophet ﷺ?": { answer: "Like two fingers together", harder: ["Muslim 2631: raising two girls until they grow up, how close on the Day of Resurrection?", "Far away", "In the same city", "No promise"] },
  "Until when must they be raised well?": { answer: "Until they grow up", harder: ["Muslim 2631: 'whoever raises two girls until...' when?", "Only one year", "Until age five", "Only in Ramadan"] },
  // Sahih al-Bukhari 2587.
  "What did the Prophet ﷺ ask An-Nu'man's father?": { answer: "Did you give all your sons the same?", harder: ["Bukhari 2587: asked to witness a gift to An-Nu'man, what did he ﷺ ask the father?", "Is it expensive?", "Where did you buy it?", "Is he the oldest?"] },
  "What did he tell him?": { answer: "Fear Allah and be fair to your children", harder: ["Bukhari 2587: 'fear Allah and...' what did he ﷺ tell him?", "Give him more", "That is fine", "Ask his mother"] },
  "What did the father do then?": { answer: "Took the gift back", harder: ["Bukhari 2587: told to be fair between his children, what did the father do?", "Sold it", "Hid it", "Gave it anyway"] },
  // Sahih al-Bukhari 5376.
  "What did the Prophet ﷺ tell the boy to say first?": { answer: "Bismillah", harder: ["Bukhari 5376: 'O boy, say...' what first?", "Allahu Akbar", "Subhanallah", "Alhamdulillah"] },
  "With which hand should we eat?": { answer: "The right hand", harder: ["Bukhari 5376: Umar ibn Abi Salamah was taught to eat with which hand?", "The left hand", "Both hands", "Any hand"] },
  "How did the Prophet ﷺ correct the boy?": { answer: "Gently, teaching him", harder: ["Bukhari 5376: the boy's hand wandered around the dish. How did he ﷺ correct him?", "By shouting", "By sending him away", "By taking his food"] },
  // Sahih Muslim 1631.
  "Which of these keeps helping a person after death?": { answer: "A righteous child's dua", harder: ["Muslim 1631: charity, useful knowledge, and what else keeps helping after death?", "His clothes", "His house", "His car"] },
  "How many deeds continue after death in this hadith?": { answer: "Three", harder: ["Muslim 1631: 'his deeds end except...' how many?", "One", "Five", "Ten"] },
  "Useful knowledge someone left keeps rewarding him.": { answer: "True", harder: "By Muslim 1631, knowledge that benefits is one of the deeds that continue after death." },
  // Sahih al-Bukhari 5199.
  "What did the Prophet ﷺ tell Abdullah ibn Amr?": { answer: "Your wife has a right on you", harder: ["Bukhari 5199: 'your body, your eyes and...' who else has a right on you?", "Pray all night forever", "Fast every single day", "Stay away from home"] },
  "What was Abdullah ibn Amr doing too much of?": { answer: "Fasting every day, praying all night", harder: ["Bukhari 5199: 'fast and break your fast, pray and sleep.' What was Abdullah ibn Amr overdoing?", "Trading in the market", "Travelling far", "Sleeping all day"] },
  "Even worship should leave time for your wife.": { answer: "True", harder: "By Bukhari 5199, even one who fasts and prays much must give his wife her right." },
  // Sahih al-Bukhari 1968.
  "Why was Umm ad-Darda looking uncared for?": { answer: "Her husband gave her no time", harder: ["Bukhari 1968: Salman found Umm ad-Darda neglected. Why?", "She lost her home", "She was ill", "She was travelling"] },
  "What did the Prophet ﷺ say about Salman's advice?": { answer: "Salman spoke the truth", harder: ["Bukhari 1968: 'give each its right.' What did he ﷺ say about Salman?", "Salman was wrong", "Salman should be quiet", "Ask someone else"] },
  "Salman said: give each one who has a right its right.": { answer: "True", harder: "By Bukhari 1968, Salman said your Lord, your self and your family each have a right on you." },
  // Sunan Abi Dawud 2578.
  "What did the Prophet ﷺ and Aishah do on a journey?": { answer: "They had a race", harder: ["Abu Dawud 2578: 'this is for that win.' What did he ﷺ and Aishah do on the journey?", "They built a tent", "They wrote poems", "They sold camels"] },
  "Who won the first race?": { answer: "Aishah", harder: ["Abu Dawud 2578: the first time they raced on foot, who won?", "The Prophet ﷺ", "No one", "A friend"] },
  "Having fun together is part of a good marriage.": { answer: "True", harder: "By Abu Dawud 2578, he ﷺ raced Aishah again later and said: this is for that win." },
  // Sahih al-Bukhari 6209.
  "What did the Prophet ﷺ compare the women to?": { answer: "Glass vessels", harder: ["Bukhari 6209: 'gently, Anjashah, with the...' what?", "Iron pots", "Stones", "Feathers"] },
  "What did he ﷺ tell Anjashah to do?": { answer: "Go gently", harder: ["Bukhari 6209: the camel driver sang to speed the camels. What did he ﷺ tell Anjashah?", "Stop singing forever", "Leave the women", "Go faster"] },
  "Calling women glass means treat them with care.": { answer: "True", harder: "By Bukhari 6209, he ﷺ called the women glass vessels to be handled gently." },
  // Sahih Muslim 300.
  "Where on the cup did the Prophet ﷺ drink?": { answer: "Where Aishah had drunk", harder: ["Muslim 300: Aishah handed him ﷺ the cup. Where did he put his mouth?", "The other side", "From a new cup", "He did not drink"] },
  "What does this teach husbands?": { answer: "Show love in small ways", harder: ["Muslim 300: drinking from the same place on the cup. What does that teach husbands?", "Never share cups", "Drink alone", "Eat in silence"] },
  "Who told us about the cup?": { answer: "Aishah", harder: ["Muslim 300: who said 'he would put his mouth where mine had been'?", "Anas", "Abu Bakr", "Bilal"] },
  // Sahih al-Bukhari 5189.
  "How many women described their husbands in Aishah's story?": { answer: "Eleven", harder: ["Bukhari 5189: Umm Zar praised Abu Zar. How many women described their husbands?", "Two", "Five", "Forty"] },
  "What did the Prophet ﷺ say to Aishah after the story?": { answer: "I am to you as Abu Zar to Umm Zar", harder: ["Bukhari 5189: after Aishah told the whole story, what did he ﷺ say?", "That story is too long", "Do not tell stories", "Abu Zar was unkind"] },
  "Listening to your wife's stories is good manners.": { answer: "True", harder: "By Bukhari 5189, he ﷺ listened to Aishah tell the whole story of the eleven women." },
  // Sahih al-Bukhari 3662.
  "Who did the Prophet ﷺ name as most beloved to him?": { answer: "Aishah", harder: ["Bukhari 3662: 'who is the most beloved person to you?' Whom did he ﷺ name?", "Umar", "Bilal", "Amr ibn al-As"] },
  "Among men, whom did he ﷺ name?": { answer: "Her father, Abu Bakr", harder: ["Bukhari 3662: 'and among men?' Whom did he ﷺ name?", "Uthman", "Ali", "Khalid"] },
  "Who asked the Prophet ﷺ this question?": { answer: "Amr ibn al-As", harder: ["Bukhari 3662: who asked him ﷺ 'who is the most beloved person to you'?", "Anjashah", "Salman", "Abu Jahl"] },
  // Sahih al-Bukhari 2731.
  "Whose advice did the Prophet ﷺ take at Hudaybiyah?": { answer: "His wife Umm Salamah", harder: ["Bukhari 2731: the companions did not get up after the treaty. Whose advice did he ﷺ take?", "Abu Jahl", "A Roman king", "No one"] },
  "What did Umm Salamah advise him to do?": { answer: "Go out and do it first", harder: ["Bukhari 2731: 'say nothing to anyone until...' what did Umm Salamah advise?", "Wait a year", "Shout at the people", "Go home to Makkah"] },
  "A wife's good advice can be taken by her husband.": { answer: "True", harder: "By Bukhari 2731, he ﷺ took Umm Salamah's advice and the companions followed him." },
  // Quran 4:32.
  "What does Quran 4:32 say about what women earn?": { answer: "Women have a share of what they earn", harder: ["Quran 4:32: 'men have a share of what they earned, and women...' what?", "It goes to the husband", "It goes to the brothers", "Women cannot earn"] },
  "Whose is a wife's mahr?": { answer: "Hers alone", harder: ["Quran 4:32 gives women a share of what they earn. Whose is a wife's mahr?", "Her brother's", "Her father's", "Her husband's"] },
  "The ayah says to ask Allah from His bounty.": { answer: "True", harder: "By Quran 4:32, instead of envy, ask Allah of His bounty." },
  // Sahih al-Bukhari 2592.
  "What did Maymunah do with her own property?": { answer: "Freed a slave-girl", harder: ["Bukhari 2592: without asking him ﷺ, what did Maymunah do with her own property?", "Built a well", "Sold her house", "Bought a horse"] },
  "Did the Prophet ﷺ undo what Maymunah did?": { answer: "No", harder: ["Bukhari 2592: 'you would have had more reward.' Did he ﷺ undo what she did?", "Yes, the next day", "He told her to buy her back", "Yes, at once"] },
  "A wife may give from her own money.": { answer: "True", harder: "By Bukhari 2592, Maymunah freed her slave-girl from her own property without asking first." },
  // Sahih al-Bukhari 1425.
  "A wife gives some of the home's food to the poor. Who is rewarded?": { answer: "Both her and her husband", harder: ["Bukhari 1425: giving from the house's food without waste. Who is rewarded?", "Only the husband", "Only the poor", "No one"] },
  "What must she avoid when giving from the home?": { answer: "Wasting it", harder: ["Bukhari 1425: giving charity from the house's food, she must avoid what?", "Telling him later", "Smiling", "Saying Bismillah"] },
  "One person's reward makes another's smaller.": { answer: "False", harder: "By Bukhari 1425, the husband's reward is lessened when his wife gives from the house's food." },
  // Sahih al-Bukhari 5082.
  "Which two qualities did the Prophet ﷺ praise?": { answer: "Kind to children, careful with the home", harder: ["Bukhari 5082: kindest to children when small, and careful with what? Which two did he ﷺ praise?", "Rich and famous", "Tall and strong", "Loud and quick"] },
  "Whose women did he ﷺ praise in this hadith?": { answer: "The women of Quraysh", harder: ["Bukhari 5082: 'the best women who ride camels are the righteous women of...' whom?", "The women of Rome", "The women of Persia", "No one's"] },
  "Being gentle with children is praised in Islam.": { answer: "True", harder: "By Bukhari 5082, the women praised were the kindest to their children when small." },
  // Sahih al-Bukhari 3820.
  "Who sent salam to Khadijah?": { answer: "Allah, through Jibril", harder: ["Bukhari 3820: 'give her salam from her Lord and from me.' Who sent salam to Khadijah?", "Abu Talib", "The king of Yemen", "Her father"] },
  "What was Khadijah bringing when Jibril came?": { answer: "A dish of food", harder: ["Bukhari 3820: 'Khadijah is coming with...' what?", "A letter", "A sword", "A book"] },
  "What is her palace in Jannah free of?": { answer: "Noise and tiredness", harder: ["Bukhari 3820: a palace in Paradise with no what?", "Gardens and rivers", "Light", "Friends"] },
  // Sahih al-Bukhari 5273.
  "What did Thabit's wife give back to end the marriage?": { answer: "The garden he gave as mahr", harder: ["Bukhari 5273: 'will you give back his garden?' What did Thabit's wife return?", "Her house", "Her clothes", "Nothing"] },
  "Did she blame his faith or character?": { answer: "No", harder: ["Bukhari 5273: 'I do not blame him in character or religion.' Did she blame his faith?", "Only his faith", "Only his character", "Yes, both"] },
  "What is a wife's asking to part, by giving back, called?": { answer: "Khul'", harder: ["Bukhari 5273: the wife returned the garden and they separated. What is this called?", "Iddah", "Mahr", "Walimah"] },
  // Sahih al-Bukhari 5063.
  "What did one of the three men want to give up?": { answer: "Marriage", harder: ["Bukhari 5063: one would pray all night, one fast every day. What did the third give up?", "Prayer", "Charity", "Fasting"] },
  "What did the Prophet ﷺ say about marriage?": { answer: "He married; it is his sunnah", harder: ["Bukhari 5063: 'whoever turns away from my sunnah is not of me.' What did he ﷺ say of marriage?", "It is for weak people", "It is only for kings", "Avoid it"] },
  "Never marrying makes you more pious.": { answer: "False", harder: "By Bukhari 5063, the man who said he would never marry was the most pious of the three." },
  // Sunan Abi Dawud 2106.
  "What did Umar warn against?": { answer: "A very big mahr", harder: ["Abu Dawud 2106: 'do not go to extremes in women's...' what did Umar warn against?", "Any mahr at all", "Small weddings", "Marrying young"] },
  "How much did the Prophet ﷺ give in mahr, at most?": { answer: "Twelve uqiyah", harder: ["Abu Dawud 2106: the Prophet ﷺ did not give or take more than how much?", "A thousand camels", "A mountain of gold", "Nothing ever"] },
  "A bigger mahr means more piety.": { answer: "False", harder: "By Abu Dawud 2106, Umar said a bigger mahr is a sign of more piety." },
  // Quran 4:20.
  "A man gave a heap of gold as mahr, then parts. Can he take it back?": { answer: "No, not any of it", harder: ["Quran 4:20: given a great amount, then replacing her. Can he take any back?", "If he asks nicely", "Yes, all of it", "Half of it"] },
  "What does the ayah call taking it back?": { answer: "A clear sin", harder: ["Quran 4:20: 'would you take it unjustly and as...' what?", "A good deal", "A small mistake", "A right"] },
  "The mahr belongs to the wife.": { answer: "True", harder: "By Quran 4:20, nothing of the mahr may be taken back, for it belongs to her." },
  // Sahih al-Bukhari 5244.
  "Back from a long trip, how should you come home?": { answer: "Not suddenly at night", harder: ["Bukhari 5244: after a long time away, how should one return to his family?", "At midnight by surprise", "Through the window", "Without telling anyone"] },
  "What spirit does this teach?": { answer: "Trust, not catching out", harder: ["Bukhari 5244: 'let him not come back to his family at night.' What spirit does it teach?", "Spying on family", "Testing your spouse", "Surprise checks"] },
  "A husband should try to catch his wife out.": { answer: "False", harder: "By Bukhari 5244, a husband back from a long trip should arrive at night to surprise his family." },
  // Sahih al-Bukhari 5240.
  "What should a wife not do, in this hadith?": { answer: "Describe another woman's looks to him", harder: ["Bukhari 5240: 'as if he were looking at her.' What should a wife not do?", "Visit her family", "Talk to her friends", "Cook for guests"] },
  "Why is describing others like this harmful?": { answer: "It brings jealousy and bad thoughts", harder: ["Bukhari 5240: describing another woman's looks to one's husband. Why is it harmful?", "It takes too long", "It is boring", "It is not harmful"] },
  "Who narrated this hadith?": { answer: "Abdullah ibn Mas'ud", harder: ["Bukhari 5240: which Companion narrated 'a woman should not describe another woman to her husband'?", "Hakim ibn Hizam", "Al-Mughirah", "Abu Lahab"] },
  // Sahih al-Bukhari 5152.
  "What may a woman not ask of the man she will marry?": { answer: "To divorce his wife", harder: ["Bukhari 5152: 'to have everything for herself.' What may a woman not ask for?", "To give a mahr", "To be kind", "To pray"] },
  "What will she get in the end, the hadith says?": { answer: "Only what Allah wrote for her", harder: ["Bukhari 5152: 'for she will only have...' what?", "Everything she wants", "Double the share", "Nothing at all"] },
  "Breaking up another's marriage to win is allowed.": { answer: "False", harder: "By Bukhari 5152, a woman may ask for her sister's divorce to have everything for herself." },
  // Quran 2:231.
  "What may a husband never do, says Quran 2:231?": { answer: "Keep her only to harm her", harder: ["Quran 2:231: 'do not keep them to...' what may a husband never do?", "Keep her kindly", "Be kind to her", "Let her go kindly"] },
  "Whom does a man who does this really wrong?": { answer: "Himself", harder: ["Quran 2:231: 'whoever does that has wronged...' whom?", "No one", "Only her family", "The neighbours"] },
  "The Quran says: keep kindly or part kindly.": { answer: "True", harder: "By Quran 2:231, keep them in kindness or release them in kindness." },
  // Sunan Abi Dawud 2175.
  "What did he ﷺ say of one who turns a wife against her husband?": { answer: "He is not one of us", harder: ["Abu Dawud 2175: whoever incites a woman against her husband. What did he ﷺ say of him?", "He is a true friend", "He has done no wrong", "He is only joking"] },
  "A friend stirs a wife up against her husband. What is that?": { answer: "Turning her against him", harder: ["Abu Dawud 2175: a friend stirs up a wife against her husband. What is that?", "Giving good advice", "Keeping family ties", "Being a loyal friend"] },
  "He ﷺ said the same of turning a slave against his master.": { answer: "True", harder: "By Abu Dawud 2175, turning a slave against his master is also 'not one of us'." },
  // Sahih al-Bukhari 5228.
  "How could he ﷺ tell that Aishah was pleased?": { answer: "She swore by the Lord of Muhammad", harder: ["Bukhari 5228: 'I know when you are pleased with me.' How could he ﷺ tell?", "She cooked his food", "She wore new clothes", "She gave him a gift"] },
  "What did she say when she was upset?": { answer: "No, by the Lord of Ibrahim", harder: ["Bukhari 5228: when upset with him ﷺ, what oath did Aishah use?", "No, by the Lord of the Ka'bah", "No, by the Lord of Musa", "Nothing at all"] },
  "A kind spouse notices how the other one feels.": { answer: "True", harder: "By Bukhari 5228, he ﷺ could tell from Aishah's oath whether she was pleased or upset." },
  // Sahih al-Bukhari 5236.
  "Who was playing in the courtyard of the masjid?": { answer: "The Abyssinians", harder: ["Bukhari 5236: screened by his cloak, Aishah watched whom in the masjid courtyard?", "The boys of Quraysh", "Traders from Sham", "Some camels"] },
  "How long did he ﷺ let her watch?": { answer: "Until she had seen enough", harder: ["Bukhari 5236: watching the Abyssinians play, how long did she keep watching?", "One quick look", "Until the adhan", "Only a minute"] },
  "He ﷺ was patient and gentle with his wife's fun.": { answer: "True", harder: "By Bukhari 5236, he ﷺ screened Aishah with his cloak until she was satisfied." },
  // Sahih al-Bukhari 5283.
  "What did Barirah ask when he ﷺ said she could go back?": { answer: "Are you ordering me?", harder: ["Bukhari 5283: 'why not go back to him?' What did Barirah ask?", "Where is Mughith?", "Can I think it over?", "Will you pay me?"] },
  "What did he ﷺ answer her?": { answer: "No, I only speak up for him", harder: ["Bukhari 5283: 'are you ordering me?' What did he ﷺ answer?", "Ask your father", "Yes, you must", "Go back today"] },
  "Barirah had to take his suggestion as an order.": { answer: "False", harder: "By Bukhari 5283, Barirah had to go back to Mughith because he ﷺ asked her." },
  // Sunan Ibn Majah 1847.
  "What did he ﷺ say is best for two who love each other?": { answer: "Marriage", harder: ["Ibn Majah 1847: 'there is nothing like ____ for two who love one another.'", "Only letters", "Waiting for years", "Staying apart"] },
  "Which book records 'nothing like marriage'?": { answer: "Sunan Ibn Majah", harder: ["'Nothing like marriage for two who love one another' is hadith 1847 in which book?", "Sahih al-Bukhari", "Sahih Muslim", "Jami at-Tirmidhi"] },
  "Islam honors love by making it halal through nikah.": { answer: "True", harder: "By Ibn Majah 1847, nothing is like marriage for two who love one another." },
  // Sahih al-Bukhari 5172.
  "What was that walimah made of?": { answer: "Two mudds of barley", harder: ["Bukhari 5172: the wedding meal for one of his wives was made of what?", "Plates of sweets", "A hundred sheep", "Ten roasted camels"] },
  "What does a walimah of barley teach us?": { answer: "Keep it simple, as you can afford", harder: ["Bukhari 5172: a walimah of two mudds of barley. What does it teach?", "Only kings may hold one", "It must be huge", "It must cost a lot"] },
  "A walimah only counts if it costs a lot.": { answer: "False", harder: "By Bukhari 5172, his ﷺ walimah of two mudds of barley did not count." },
  // Sahih al-Bukhari 5154.
  "What did he ﷺ do at his wives' homes after the walimah?": { answer: "He made du'a for them", harder: ["Bukhari 5154: after the walimah for Zaynab, what did he ﷺ do at the Mothers' homes?", "He asked for gifts", "He checked their food", "He counted their coins"] },
  "What did his wives do in return?": { answer: "They made du'a for him", harder: ["Bukhari 5154: as he ﷺ made du'a for them, what did his wives do?", "They asked for money", "They stayed silent", "They sent him away"] },
  "A husband and wife can make du'a for each other.": { answer: "True", harder: "By Bukhari 5154, he ﷺ made du'a for his wives and they made du'a for him." },
  // Sunan an-Nasa'i 3104.
  "What did he ﷺ ask the man who came for advice?": { answer: "Do you have a mother?", harder: ["Nasa'i 3104: Jahimah wanted to go out and fight. What did he ﷺ ask him?", "Do you have a horse?", "Do you have a sword?", "Do you have a camel?"] },
  "Where is Paradise, he ﷺ told the man?": { answer: "Beneath his mother's feet", harder: ["Nasa'i 3104: 'then stay with her, for Paradise is...' where?", "Beyond the far mountains", "Under the big palm tree", "Across the wide sea"] },
  "He ﷺ told the man to stay and look after his mother.": { answer: "True", harder: "By Nasa'i 3104, he ﷺ told Jahimah to stay with his mother, for Paradise is beneath her feet." },
  // Sunan Ibn Majah 3663.
  "What did he ﷺ call the father?": { answer: "The middle door of Paradise", harder: ["Ibn Majah 3663: Abu ad-Darda heard him ﷺ describe the father as what?", "The key to the market", "The wall of the city", "The roof of the house"] },
  "Whose choice is it to use that door?": { answer: "Your own choice", harder: ["Ibn Majah 3663: 'it is up to you whether you make use of it.' Whose choice is it?", "Nobody's choice", "Your neighbor's choice", "Your teacher's choice"] },
  "Being good to your father can be your way into Paradise.": { answer: "True", harder: "By Ibn Majah 3663, the father is the middle door of Paradise, the best way into it." },
  // Sunan Abi Dawud 2528.
  "How were the man's parents when he left home?": { answer: "They were weeping", harder: ["Abu Dawud 2528: coming to pledge emigration, how had the man left his parents?", "They were away traveling", "They were laughing", "They were asleep"] },
  "What did he ﷺ tell the man to do?": { answer: "Go back and make them laugh", harder: ["Abu Dawud 2528: 'as you made them weep.' What did he ﷺ tell the man?", "Send them a short letter", "Forget about them", "Stay and never go home"] },
  "Making your parents happy is a good deed.": { answer: "True", harder: "By Abu Dawud 2528, he ﷺ sent the man back to make his weeping parents laugh." },
  // Jami at-Tirmidhi 1979.
  "Why should you learn about your family line?": { answer: "To keep ties with relatives", harder: ["Tirmidhi 1979: 'learn enough about your lineage to...' why?", "To win an argument", "To look down on people", "To boast over others"] },
  "What does keeping family ties bring among relatives?": { answer: "Love", harder: ["Tirmidhi 1979: keeping ties brings more wealth, a longer life, and what among relatives?", "Arguments", "Jealousy", "Boredom"] },
  "Keeping family ties increases a person's wealth and life.": { answer: "True", harder: "By Tirmidhi 1979, keeping ties of kinship brings love, more wealth and a longer life." },
  // Jami at-Tirmidhi 1907.
  "After whose Name did Allah name the Rahim, family ties?": { answer: "His own Name, Ar-Rahman", harder: ["Tirmidhi 1907: 'I created the Rahim and named it after...' what?", "The name of a king", "The name of a city", "The name of a river"] },
  "What does Allah do for whoever keeps family ties?": { answer: "He keeps ties with him", harder: ["Tirmidhi 1907: 'whoever keeps it...' what does Allah do?", "He makes him famous", "He makes him a king", "He gives him a horse"] },
  "Cutting off family ties pleases Allah.": { answer: "False", harder: "By Tirmidhi 1907, Allah keeps ties with the one who cuts off his family." },
  // Sunan Abi Dawud 1692.
  "What is enough of a sin for a man, he ﷺ said?": { answer: "Neglecting those he provides for", harder: ["Abu Dawud 1692: 'it is enough of a sin for a man that he...' what?", "Living in a small house", "Riding an old camel", "Walking too slowly"] },
  "Which of these is a man's duty at home?": { answer: "Caring for his family", harder: ["Abu Dawud 1692: neglecting those in his care is sin enough. Which is his duty at home?", "Leaving them hungry", "Ignoring their needs", "Spending only on himself"] },
  "Neglecting your family is only a small matter.": { answer: "False", harder: "By Abu Dawud 1692, neglecting those you are responsible for is not much of a sin." },
  // Sunan Ibn Majah 1376.
  "What should your house get from your prayer?": { answer: "A share of it", harder: ["Ibn Majah 1376: 'when one of you has finished his prayer, let him give his house...' what?", "Nothing at all", "Only the call to prayer", "Only on Eid"] },
  "What does Allah put in a house that gets a share of prayer?": { answer: "Something good", harder: ["Ibn Majah 1376: because of that prayer, what will Allah put in the house?", "More furniture", "A new door", "Heavy silence"] },
  "All prayer should be kept out of the home.": { answer: "False", harder: "By Ibn Majah 1376, a man should give his house no share of his prayer." },
  // Sunan Abi Dawud 3765.
  "When should you mention Allah at home, he ﷺ said?": { answer: "On coming in and at the meal", harder: ["Abu Dawud 3765: when should a man mention Allah's name at home?", "Only on Fridays", "Only when guests come", "Only when leaving town"] },
  "What does the devil say when Allah is mentioned at the door and the meal?": { answer: "No place to stay, no supper", harder: ["Abu Dawud 3765: Allah's name at the door and at the meal. What does the devil say?", "I found a bed and a meal", "I found a place to stay", "I found a supper"] },
  "Forgetting Allah's name at dinner lets the devil share the meal.": { answer: "True", harder: "By Abu Dawud 3765, when Allah's name is not mentioned at the food, the devil finds an evening meal." },
  // Sunan Ibn Majah 290.
  "What did he ﷺ do first on coming home?": { answer: "Used the siwak", harder: ["Ibn Majah 290: 'the first thing he would do was...' what did he ﷺ do first at home?", "Ate some dates", "Lay down to sleep", "Asked for news"] },
  "Who asked Aishah what he ﷺ did first at home?": { answer: "Shurayh ibn Hani", harder: ["Ibn Majah 290: who asked Aishah what he ﷺ did first when he came in?", "Abdullah ibn Umar", "Abu Hurairah", "Anas ibn Malik"] },
  "A siwak is a small stick for cleaning the teeth.": { answer: "True", harder: "In Ibn Majah 290, the siwak is the tooth stick he ﷺ used first on coming home." },
  // Sahih al-Bukhari 997.
  "When did he ﷺ wake Aishah?": { answer: "When he was about to pray witr", harder: ["Bukhari 997: Aishah slept across his bed. When did he ﷺ wake her?", "At sunrise to eat", "At noon for a walk", "When guests came"] },
  "What did Aishah do once he ﷺ woke her?": { answer: "Prayed witr too", harder: ["Bukhari 997: woken before witr, what did Aishah do?", "Made breakfast", "Slept on till morning", "Read a letter"] },
  "A husband can help his wife to worship at night.": { answer: "True", harder: "By Bukhari 997, he ﷺ woke Aishah so that she could pray witr too." },
  // Sunan Abi Dawud 1533.
  "What did the woman ask him ﷺ for?": { answer: "A du'a for her and her husband", harder: ["Abu Dawud 1533: 'pray for blessing on me and on my husband.' What did the woman ask for?", "Money for a trip", "A new house", "A camel to ride"] },
  "Whom did his ﷺ du'a include?": { answer: "Her and her husband", harder: ["Abu Dawud 1533: 'may Allah send blessing on you and...' whom?", "Only her husband", "Only her children", "Only her"] },
  "Asking someone to pray for your family is allowed.": { answer: "True", harder: "By Abu Dawud 1533, he ﷺ prayed for blessing on the woman and her husband when she asked." },
  // Sunan an-Nasa'i 3940.
  "Where did he ﷺ find his comfort?": { answer: "In prayer", harder: ["Nasa'i 3940: 'the coolness of my eye has been placed in...' what?", "In wealth", "In sleep", "In travel"] },
  "Besides women, what was made dear to him ﷺ?": { answer: "Perfume", harder: ["Nasa'i 3940: 'women and ____ have been made dear to me.'", "Gold", "Silk", "Fame"] },
  "Prayer can be a comfort for the heart, as it was for him ﷺ.": { answer: "True", harder: "By Nasa'i 3940, the coolness of his ﷺ eye was placed in prayer." },
  // Sahih Muslim 2316.
  "Why did he ﷺ go to the house near Madinah?": { answer: "To kiss his baby son", harder: ["Muslim 2316: on the edge of Madinah, why did he ﷺ go to the smith's house?", "To buy iron tools", "To meet a caravan", "To dig a well"] },
  "What was the nurse's house full of?": { answer: "Smoke", harder: ["Muslim 2316: the nurse's husband was a smith. What filled the house?", "Sweet perfume", "Fresh flowers", "Cool water"] },
  "Showing love to little children is only a mother's job.": { answer: "False", harder: "By Muslim 2316, he ﷺ left showing love to his baby son to the nurse alone." },
  // Sunan an-Nasa'i 1141.
  "Why was his ﷺ sujud so long that night?": { answer: "A child was riding on his back", harder: ["Nasa'i 1141: Shaddad saw the child on his back. Why was his ﷺ sujud so long?", "Rain was falling hard", "A guest was waiting", "The lamps went out"] },
  "What did he ﷺ carry when he came out to pray?": { answer: "A little child", harder: ["Nasa'i 1141: what was he ﷺ carrying when he came out for the night prayer?", "A basket of dates", "A water skin", "A lamp"] },
  "He ﷺ let the child stay until he had enough.": { answer: "True", harder: "By Nasa'i 1141, he ﷺ made the sujud long so the child on his back could have enough." },
  // Jami at-Tirmidhi 3774.
  "What were the two little boys wearing?": { answer: "Red shirts", harder: ["Tirmidhi 3774: Al-Hasan and Al-Husayn came walking and tripping. What were they wearing?", "Blue robes", "Green cloaks", "White turbans"] },
  "Which ayah did he ﷺ recite after lifting them?": { answer: "Your wealth and children are a trial", harder: ["Tirmidhi 3774: carrying the two boys from the minbar, which ayah did he ﷺ recite?", "Allah is with the patient", "With hardship comes ease", "Allah loves those who do good"] },
  "He ﷺ came down from the minbar for the two boys.": { answer: "True", harder: "By Tirmidhi 3774, he ﷺ came down from the minbar to carry Al-Hasan and Al-Husayn." },
  // Sahih al-Bukhari 3918.
  "Where did Abu Bakr kiss his sick daughter?": { answer: "On her cheek", harder: ["Bukhari 3918: Aishah lay with a high fever. Where did Abu Bakr kiss her?", "On her hand", "On her feet", "On her shoulder"] },
  "What did Abu Bakr ask his daughter?": { answer: "How are you, little daughter?", harder: ["Bukhari 3918: kissing his sick daughter's cheek, what did Abu Bakr say?", "Where is your mother?", "What did you eat today?", "Who came to see you?"] },
  "A father can show his love with a kiss and a kind word.": { answer: "True", harder: "By Bukhari 3918, Abu Bakr kissed his feverish daughter and asked: how are you, little daughter?" },
  // Sahih al-Bukhari 3304.
  "When should children be kept close, he ﷺ said?": { answer: "When night first falls", harder: ["Bukhari 3304: 'for the devils spread out at that time.' When should children be kept close?", "After Fajr", "At noon", "At sunrise"] },
  "What should you say as you close the door at night?": { answer: "Allah's name", harder: ["Bukhari 3304: 'Satan does not open a closed door.' What do you say as you close it?", "A line of poetry", "Your own name", "The time of day"] },
  "Children should be kept close all night long.": { answer: "False", harder: "By Bukhari 3304, children must be kept inside for the whole night." },
  // Sunan an-Nasa'i 1870.
  "What did he ﷺ ask the man about his son?": { answer: "Do you love him?", harder: ["Nasa'i 1870: a man came with his son. What did he ﷺ ask?", "How old is he?", "Can he read yet?", "Where does he sleep?"] },
  "Where will the father find his son, he ﷺ said?": { answer: "At a gate of Paradise", harder: ["Nasa'i 1870: after the boy died, where did he ﷺ say the father would find him?", "By a river in Madinah", "In a busy market", "On a high mountain"] },
  "The boy will try to open Paradise's gate for his father.": { answer: "True", harder: "By Nasa'i 1870, the boy will try to open the gate of Paradise for his father." },
  // Sahih al-Bukhari 5091.
  "Which of the two men did he ﷺ say was better?": { answer: "The poor Muslim", harder: ["Bukhari 5091: 'better than an earth full of men like the first.' Who was better?", "Neither of the two", "Both men alike", "The first man"] },
  "What did people say if the first man proposed?": { answer: "He should be given in marriage", harder: ["Bukhari 5091: of the first man they said, if he proposes, what?", "He should wait a year", "He should ask the poor", "He should pay twice"] },
  "People said the poor man would not be listened to.": { answer: "True", harder: "By Bukhari 5091, people said the opposite of the poor man, that he would not be heard or listened to." },
  // Jami at-Tirmidhi 1655.
  "Which one getting married does Allah help, he ﷺ said?": { answer: "One who intends chastity", harder: ["Tirmidhi 1655: the mujahid, the mukatab, and which one getting married does Allah help?", "One who wants a big feast", "One who wants to show off", "One who marries for fame"] },
  "How many people did he ﷺ name whom Allah helps?": { answer: "Three kinds of people", harder: ["Tirmidhi 1655: 'three whom it is a right upon Allah to help.' How many kinds?", "Five kinds of people", "Seven kinds of people", "Two kinds of people"] },
  "One who marries to keep chaste has Allah's help.": { answer: "True", harder: "By Tirmidhi 1655, it is a right upon Allah to help the one who marries intending chastity." },
  // Sunan an-Nasa'i 3231.
  "Which woman is best, he ﷺ said?": { answer: "One who makes him happy to see", harder: ["Nasa'i 3231: 'which woman is best?' How did he ﷺ answer first?", "One with the finest clothes", "One with the most gold", "One from the richest family"] },
  "Which of these did he ﷺ name in the best wife?": { answer: "She obeys him when he asks", harder: ["Nasa'i 3231: happy to see, and what else in the best wife?", "She is from a famous tribe", "She has the most jewelry", "She owns the most land"] },
  "The best wife cares for his wishes about her wealth.": { answer: "True", harder: "By Nasa'i 3231, the best wife does not go against his wishes in herself or her wealth." },
  // Sunan an-Nasa'i 3236.
  "In which month did he ﷺ marry Aishah?": { answer: "Shawwal", harder: ["Nasa'i 3236: 'my married life began in...' which month?", "Ramadan", "Muharram", "Rajab"] },
  "Who tells us of her own wedding in Shawwal?": { answer: "Aishah", harder: ["Nasa'i 3236: Urwah reported whose words about her wedding in Shawwal?", "Umm Salamah", "Sawdah", "Hafsah"] },
  "Aishah liked her women's weddings to be in Shawwal.": { answer: "True", harder: "By Nasa'i 3236, Aishah liked the weddings of her women to be in Shawwal." },
  // Sahih al-Bukhari 5156.
  "What did the Ansar women say to the bride?": { answer: "May you prosper, with blessings", harder: ["Bukhari 5156: 'may you prosper, have blessings and good omen.' Who said it to the bride?", "Go back home now", "Sit and stay quiet", "Be quick about it"] },
  "Who brought Aishah into the house?": { answer: "Her mother", harder: ["Bukhari 5156: who brought Aishah into the house for her wedding?", "Her sister", "Her aunt", "Her father"] },
  "Women of the Ansar were in the house to greet her.": { answer: "True", harder: "By Bukhari 5156, women of the Ansar were in the house when Aishah was brought in." },
  // Sahih al-Bukhari 3631.
  "What did he ﷺ tell Jabir they would soon have?": { answer: "Carpets", harder: ["Bukhari 3631: 'you shall soon have...' what did he ﷺ tell Jabir?", "Gardens", "Camels", "Swords"] },
  "What did Jabir's wife remind him of?": { answer: "His ﷺ words about carpets", harder: ["Bukhari 3631: when Jabir wanted the carpets out of sight, what did his wife remind him of?", "A promise to travel", "A debt to pay", "A guest coming"] },
  "Jabir stopped asking his wife to remove the carpets.": { answer: "True", harder: "By Bukhari 3631, Jabir left the carpets after his wife reminded him of the Prophet's ﷺ words." },
  // Mishkat al-Masabih 3096.
  "When a man marries, how much of the religion has he fulfilled?": { answer: "Half", harder: ["Mishkat 3096: when a man marries, he has fulfilled how much of the religion?", "All of it", "None of it", "A quarter"] },
  "After marrying, a man can stop caring about the rest of the religion.": { answer: "False", harder: "By Mishkat 3096, after marrying a man has completed the whole religion." },
  // Sahih al-Bukhari 5066.
  "What should a young person who cannot marry do?": { answer: "Fast", harder: ["Bukhari 5066: a young person who cannot marry should do what?", "Travel far", "Sleep more", "Give up hope"] },
  "Who did the Prophet ﷺ tell to marry, or else to fast?": { answer: "Young people", harder: ["Bukhari 5066: whom did he ﷺ tell to marry, or else to fast?", "Kings", "Old people", "Traders"] },
  // Sahih Muslim 2813b.
  "Which devil does Iblis praise, saying: You have done well?": { answer: "The one who came between a husband and wife", harder: ["Muslim 2813b: Iblis says 'you have done well' to which devil?", "The one who stayed quiet", "The one who went to sleep", "The one who told a lie"] },
  "Iblis is pleased when a devil comes between a husband and wife.": { answer: "True", harder: "By Muslim 2813b, Iblis praises the devil who comes between a husband and wife." },
  // Sunan an-Nasa'i 3227.
  "What kind of wife did the Prophet ﷺ advise?": { answer: "Loving and fertile", harder: ["Nasa'i 3227: what kind of wife did he ﷺ advise marrying?", "Tall and strong", "Rich and famous", "Quiet and shy"] },
  "The Prophet ﷺ said he will boast of your great numbers.": { answer: "True", harder: "By Nasa'i 3227, he ﷺ said he will boast of your great numbers." },
  // Sunan Ibn Majah 1855.
  "What is the best provision in this world?": { answer: "A righteous wife", harder: ["Ibn Majah 1855: what is the best provision of this world?", "A big house", "Lots of money", "A fast horse"] },
  "The Prophet ﷺ said money is the best thing to have in this world.": { answer: "False", harder: "By Ibn Majah 1855, money is the best provision of this world." },
};
