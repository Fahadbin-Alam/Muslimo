import type { TierEntry } from "../questionTiers";

/**
 * Harder versions for the Sahihayn (Bukhari and Muslim book) topic.
 * Each one keeps the same answer and the same hadith as the original question.
 */
export const SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 9.
  "How many branches does faith have in Bukhari 9?": { answer: "More than sixty", harder: ["Bukhari 9: faith has how many branches?", "Exactly sixty", "Exactly seventy", "Fewer than ten"] },
  "Which branch of faith does this hadith name?": { answer: "Haya, good shyness", harder: ["Bukhari 9 names one branch of faith: shyness that keeps you from wrong. What is it called?", "Sabr, patience", "Shukr, thanks", "Tawbah, repentance"] },
  "Faith is only one single deed.": { answer: "False", harder: "By Bukhari 9, faith has fewer than ten branches, and haya is not one of them." },
  // Sahih Muslim 34.
  "Who finds the taste of faith?": { answer: "One content with Allah as Lord", harder: ["Muslim 34: who finds the taste of faith?", "One content with wealth", "One content with his tribe", "One content with fame"] },
  "Allah as Lord, Islam as religion, and...?": { answer: "Muhammad ﷺ as Prophet", harder: ["Muslim 34 lists three things to be content with. Which is the third?", "The Quran as book", "The Kabah as qiblah", "Makkah as home"] },
  "Being happy with Islam as your religion is part of tasting faith.": { answer: "True", harder: "By Muslim 34, contentment with Islam as religion is one of the three keys to the taste of faith." },
  // Sahih al-Bukhari 41.
  "Someone sincerely accepts Islam. What about his past sins?": { answer: "Allah forgives them", harder: ["Bukhari 41: a person embraces Islam sincerely. What does Allah do with his past sins?", "Halves them", "Keeps them for later", "Turns them into debts"] },
  "After that, a good deed can be rewarded up to...?": { answer: "Seven hundred times", harder: ["Bukhari 41: each good deed after Islam is rewarded from ten times up to...?", "Seventy times", "One hundred times", "One thousand times"] },
  "One bad deed is written as ten bad deeds.": { answer: "False", harder: "By Bukhari 41, a bad deed is written ten times over unless Allah forgives it." },
  // Sahih al-Bukhari 43.
  "Which deed does Allah love most?": { answer: "The one done regularly", harder: ["Bukhari 43: the deed most loved by Allah is the one that is...?", "The longest", "The hardest", "Done in secret only"] },
  "How much worship did he ﷺ tell us to take on?": { answer: "What we can keep up", harder: ["Bukhari 43: how much worship should we take on?", "As much as possible", "Only the hardest", "Only in Ramadan"] },
  "Two rak'ahs every night beat one long night and then nothing.": { answer: "True", harder: "By Bukhari 43, a small deed kept up regularly is more loved than a big one dropped." },
  // Sahih al-Bukhari 20.
  "What kind of deeds did the Prophet ﷺ order?": { answer: "Deeds people could do", harder: ["Bukhari 20: when he ﷺ ordered the Muslims to do something, what kind of deeds were they?", "Deeds only for the strong", "The longest deeds", "Deeds for scholars only"] },
  "Who did he ﷺ say knows Allah best and fears Him most?": { answer: "He himself ﷺ", harder: ["Bukhari 20: who did he ﷺ say fears Allah most and knows Him best?", "Abu Bakr", "The angels", "The scholars"] },
  "Making Islam as hard as you can is what he ﷺ taught.": { answer: "False", harder: "By Bukhari 20, he ﷺ ordered the hardest deeds so people would earn more." },
  // Sahih al-Bukhari 57.
  "Prayer, zakat, and what else did Jarir promise?": { answer: "Sincerity to every Muslim", harder: ["Bukhari 57: prayer, zakat, and what was Jarir's third pledge?", "Fasting every Monday", "Fighting in every battle", "Staying in Madinah"] },
  "Who made this promise to the Prophet ﷺ?": { answer: "Jarir ibn Abdullah", harder: ["Bukhari 57: who pledged to pray, pay zakat and be sincere to every Muslim?", "Anas ibn Malik", "Abu Hurayrah", "Bilal"] },
  "Wishing good for other Muslims is part of the religion.": { answer: "True", harder: "By Bukhari 57, Jarir's pledge included being sincere and true to every Muslim." },
  // Sahih Muslim 60a.
  "What happens when someone calls his brother a disbeliever?": { answer: "It falls on one of them", harder: ["Muslim 60a: a man calls his brother a disbeliever. Where does the word go?", "Only to the listener", "Into the air", "To the whole tribe"] },
  "Your friend makes a mistake. What fits this hadith?": { answer: "Advise him kindly", harder: ["Muslim 60a warns against calling a brother a disbeliever. Your friend slips. What fits best?", "Tell everyone he left Islam", "Stop greeting him forever", "Call him a kafir"] },
  "Calling a Muslim a disbeliever is fine when you are angry.": { answer: "False", harder: "By Muslim 60a, calling a brother a disbeliever harms no one if you were angry." },
  // Sahih al-Bukhari 48.
  "What did he ﷺ call insulting a Muslim?": { answer: "Fusuq, disobedience", harder: ["Bukhari 48: what did he ﷺ call insulting a Muslim?", "Kufr, disbelief", "Ghibah, backbiting", "Riya, showing off"] },
  "What does fusuq mean?": { answer: "Disobeying Allah", harder: ["Bukhari 48: insulting a Muslim is called fusuq. Fusuq means...?", "Forgetting", "Arguing", "Joking"] },
  "Calling a Muslim bad names is harmless fun.": { answer: "False", harder: "By Bukhari 48, insulting a Muslim is only a small joke, not fusuq." },
  // Sahih Muslim 127a.
  "A bad thought pops into your head, and you push it away. What then?": { answer: "Allah forgives it", harder: ["Muslim 127a: a bad thought comes, but you never say it or act on it. What is its ruling?", "Written as a sin", "Must be confessed", "Breaks your wudu"] },
  "When does a bad thought become a deed?": { answer: "When you say or do it", harder: ["Muslim 127a: when does a bad thought count against you?", "When you remember it", "When you dream it", "When it comes twice"] },
  "Allah is merciful about thoughts we never act on.": { answer: "True", harder: "By Muslim 127a, Allah forgave this Ummah the bad thoughts they do not speak of or act on." },
  // Sahih al-Bukhari 47.
  "How big is one qirat of reward?": { answer: "Like Mount Uhud", harder: ["Bukhari 47: each qirat of funeral reward is like what?", "Like the Kabah", "Like Mount Safa", "Like the sea"] },
  "You pray the funeral prayer, then leave before burial. You get...?": { answer: "One qirat", harder: ["Bukhari 47: you pray the funeral prayer but leave before burial. How many qirats?", "Half a qirat", "Three qirats", "Two qirats"] },
  "Following a funeral to the burial earns two qirats.": { answer: "True", harder: "By Bukhari 47, the one who stays until the prayer and burial are done returns with two qirats." },
  // Sahih Muslim 145.
  "How did Islam begin, says Muslim 145?": { answer: "As something strange", harder: ["Muslim 145: how did Islam begin?", "As a great power", "With many followers", "In many lands"] },
  "Who gets good news in this hadith?": { answer: "The strangers", harder: ["Muslim 145: 'so good news for...' whom?", "The scholars", "The kings", "The rich"] },
  "Feeling different for keeping Islam is a reason to give up.": { answer: "False", harder: "By Muslim 145, Islam began with everyone at once and will never be strange." },
  // Sahih Muslim 15a.
  "Which prayers did An-Nu'man promise to keep?": { answer: "The obligatory ones", harder: ["Muslim 15a: An-Nu'man said he would pray which prayers?", "Every night prayer", "Only Fajr and Isha", "Only extra prayers"] },
  "What did the Prophet ﷺ answer him?": { answer: "Yes", harder: ["Muslim 15a: prayers, keeping from the forbidden, the permitted as permitted. Will he enter Paradise?", "He stayed silent", "No", "Maybe later"] },
  "Keeping the basics well is a path to Paradise.": { answer: "True", harder: "By Muslim 15a, An-Nu'man asked about the obligatory prayers, and the Prophet ﷺ said yes." },
  // Sahih Muslim 244.
  "What leaves with the water of wudu?": { answer: "Sins", harder: ["Muslim 244: when a Muslim washes his face in wudu, what goes with the water?", "His tiredness only", "His worries only", "His dust only"] },
  "Washing the face takes away the sins of...?": { answer: "The eyes", harder: ["Muslim 244: washing the face in wudu takes away the sins of what?", "The hands", "The tongue", "The feet"] },
  "After wudu, a Muslim comes out pure from sins.": { answer: "True", harder: "By Muslim 244, washing the feet takes away the sins the feet walked to." },
  // Sahih Muslim 245.
  "From where do sins come out, even?": { answer: "Under the nails", harder: ["Muslim 245: sins come out of the body even from where?", "Between the fingers", "Behind the ears", "From the eyelashes"] },
  "What kind of wudu does this?": { answer: "Wudu done well", harder: ["Muslim 245: sins leave the body with which wudu?", "Any quick wudu", "Wudu with cold water only", "Wudu done three times"] },
  "Who told this hadith?": { answer: "Uthman ibn Affan", harder: ["Muslim 245: who reported that good wudu takes sins out even from under the nails?", "Abu Hurayrah", "Anas ibn Malik", "Aishah"] },
  // Sahih Muslim 243.
  "How big was the dry spot the man left?": { answer: "The size of a nail", harder: ["Muslim 243: what was left dry on the man's foot?", "A spot the size of a coin", "Half his foot", "His heel"] },
  "What did the Prophet ﷺ tell him?": { answer: "Go back and do wudu well", harder: ["Muslim 243: what did the Prophet ﷺ tell the man with the dry spot?", "Wipe that spot only", "Pray, it is forgiven", "Do tayammum instead"] },
  "Missing a small spot in wudu does not matter.": { answer: "False", harder: "By Muslim 243, the Prophet ﷺ let the man pray with the nail-sized dry spot." },
  // Sahih Muslim 278d.
  "How many times do you wash your hands on waking?": { answer: "Three times", harder: ["Muslim 278d: on waking, wash your hands how many times before the water pot?", "Twice", "Five times", "Once"] },
  "Why wash them first?": { answer: "You don't know where they were", harder: ["Muslim 278d: why wash your hands on waking before the pot?", "They may be cold", "It wakes you up", "To count your sins"] },
  "Wash your hands before dipping them in the water pot.": { answer: "True", harder: "By Muslim 278d, you should wash your hands three times before putting them into the water pot." },
  // Sahih al-Bukhari 168.
  "Which side did the Prophet ﷺ like to start with?": { answer: "The right", harder: ["Bukhari 168: in shoes, hair and washing, which side did he ﷺ start with?", "The left", "Whichever was near", "Both together"] },
  "Which of these did Aishah name?": { answer: "Putting on shoes", harder: ["Bukhari 168: which of these did Aishah name for starting on the right?", "Tying a turban", "Riding a camel", "Writing a letter"] },
  "In wudu we wash the right arm before the left.": { answer: "True", harder: "By Bukhari 168, he ﷺ liked to start with the right in everything, including washing." },
  // Sahih al-Bukhari 142.
  "When did the Prophet ﷺ say this dua?": { answer: "Before going to the toilet", harder: ["Bukhari 142: when did he ﷺ say 'Allahumma inni a'udhu bika minal khubuthi wal khaba'ith'?", "When leaving the masjid", "When waking up", "When it rained"] },
  "What does the dua ask for?": { answer: "Refuge from evil things", harder: ["Bukhari 142: the toilet dua seeks refuge from what?", "Hunger and thirst", "Cold and heat", "Debt and laziness"] },
  "The toilet dua begins: Allahumma inni a'udhu bika.": { answer: "True", harder: "By Bukhari 142, the toilet dua asks refuge from evil and wicked things." },
  // Sahih al-Bukhari 887.
  "What is a siwak?": { answer: "A stick to clean teeth", harder: ["Bukhari 887: what is the siwak he ﷺ wished to order for every prayer?", "A cloth to wipe the face", "A comb for the hair", "A cup for wudu"] },
  "Why did he ﷺ not order it for every prayer?": { answer: "It could be hard on us", harder: ["Bukhari 887: why did he ﷺ not order siwak for every prayer?", "It costs too much", "It breaks wudu", "Sticks were rare"] },
  "Using siwak before prayer is a loved sunnah.": { answer: "True", harder: "By Bukhari 887, he ﷺ held back from ordering siwak for every prayer only because it could be hard on his people." },
  // Sahih al-Bukhari 248.
  "What is ghusl?": { answer: "The full bath", harder: ["Bukhari 248 describes ghusl. What is it?", "Wudu with sand", "Washing the feet only", "Washing the hands three times"] },
  "What did he ﷺ do right after washing his hands?": { answer: "Wudu, as for prayer", harder: ["Bukhari 248: in ghusl, what came after washing the hands?", "Pouring water on the head", "Washing the feet first", "Wiping the socks"] },
  "How many handfuls did he pour on his head?": { answer: "Three", harder: ["Bukhari 248: how many handfuls did he ﷺ pour on his head in ghusl?", "Two", "Five", "Seven"] },
  // Sahih Muslim 276a.
  "How long may a traveller wipe over leather socks?": { answer: "Three days and nights", harder: ["Muslim 276a: how long did he ﷺ set for the traveller to wipe over the khuff?", "One day and night", "Seven days", "Ten days"] },
  "And someone at home?": { answer: "One day and night", harder: ["Muslim 276a: how long for someone at home to wipe over the khuff?", "Three days and nights", "Half a day", "Two days"] },
  "Whom did Aishah send Shurayh to ask?": { answer: "Ali ibn Abi Talib", harder: ["Muslim 276a: Aishah sent Shurayh to ask whom about wiping the khuff?", "Umar ibn al-Khattab", "Abu Bakr", "Uthman"] },
  // Sahih Muslim 228.
  "Good wudu plus a humble prayer wipe out...?": { answer: "Past sins", harder: ["Muslim 228: good wudu and a humble prayer at its time wipe out what?", "Future sins", "All debts", "Other people's sins"] },
  "Which sins are not covered, says this hadith?": { answer: "Major sins", harder: ["Muslim 228: past sins are wiped out as long as he has not done what?", "Missed a sunnah", "Spoken in the masjid", "Prayed late"] },
  "This blessing comes at every prayer time.": { answer: "True", harder: "By Muslim 228, this wiping of sins is for all time, at every prayer." },
  // Sahih Muslim 251a.
  "Which wudu did he ﷺ name?": { answer: "Full wudu, even when hard", harder: ["Muslim 251a: which wudu wipes out sins and raises ranks?", "Wudu with warm water", "Quick wudu", "Wudu once a day"] },
  "What else wipes out sins in this hadith?": { answer: "Many steps to the masjid", harder: ["Muslim 251a: full wudu when it is hard, waiting for the next prayer, and...?", "Fasting on Mondays", "Feeding guests", "Reading at night"] },
  "Waiting for the next prayer after praying is one of the three.": { answer: "True", harder: "By Muslim 251a, waiting for the next prayer after a prayer wipes out sins and raises ranks." },
  // Sahih Muslim 249a.
  "Who did he ﷺ call his brothers?": { answer: "Believers who came after him", harder: ["Muslim 249a: 'our brothers are those who...' what?", "Lived before us", "Live in Makkah", "Are our relatives"] },
  "What did he ﷺ call the people with him?": { answer: "His companions", harder: ["Muslim 249a: 'are we not your brothers?' What did he ﷺ call them?", "His students", "His neighbours", "His guests"] },
  "How will he ﷺ know his Ummah on that Day?": { answer: "By the brightness of wudu", harder: ["Muslim 249a: how will he ﷺ know his brothers who came later?", "By their names", "By their voices", "By their Quran"] },
  // Sahih al-Bukhari 6022.
  "Who must give charity, says this hadith?": { answer: "Every Muslim", harder: ["Bukhari 6022: who must give charity?", "Only scholars", "Only on Eid", "Only the rich"] },
  "You have no money at all. What can be your charity?": { answer: "Helping someone in need", harder: ["Bukhari 6022: no money? He works and gives. If he can't work?", "He tells others to stop", "He does nothing", "He waits for zakat"] },
  "Even holding back from harm counts as charity.": { answer: "True", harder: "By Bukhari 6022, the last level of charity is holding back from harm." },
  // Sahih al-Bukhari 6031.
  "Did the Prophet ﷺ use foul words?": { answer: "Never", harder: ["Bukhari 6031: how often did he ﷺ use foul words?", "Sometimes", "When angry", "Every day"] },
  "How did he ﷺ correct people?": { answer: "Gently, without insults", harder: ["Bukhari 6031: how did he ﷺ correct people, saying 'may his forehead be dusty'?", "With a curse", "With a shout", "With foul words"] },
  "Who told us this, having served him for years?": { answer: "Anas ibn Malik", harder: ["Bukhari 6031: who said the Prophet ﷺ did not insult, curse or use foul words?", "Abu Hurayrah", "Ibn Abbas", "Jabir"] },
  // Sahih al-Bukhari 6060.
  "What did he ﷺ say to the man who over-praised?": { answer: "You cut the man's back", harder: ["Bukhari 6060: what did he ﷺ say when a man praised another too much?", "You broke his heart", "You lied about him", "You made him rich"] },
  "Why is too much praise harmful?": { answer: "It can make him proud", harder: ["Bukhari 6060 warns against over-praising. What harm can it do to the one praised?", "It costs money", "It is too quiet", "It wastes paper"] },
  "Fair, honest praise is better than too much.": { answer: "True", harder: "By Bukhari 6060, praising a man too much is like cutting his back." },
  // Sahih al-Bukhari 6069.
  "Who did Allah cover in this hadith?": { answer: "A man who sinned at night", harder: ["Bukhari 6069: who sinned while Allah covered it?", "A man in the market", "A man at Fajr", "A traveller by day"] },
  "What did the man do in the morning?": { answer: "Told people his sin", harder: ["Bukhari 6069: what did the man do the next morning?", "Hid it forever", "Repented in secret", "Gave sadaqah"] },
  "If you slip, repent quietly and don't boast about it.": { answer: "True", harder: "By Bukhari 6069, those who sin openly are left out of the forgiveness the rest of the Ummah gets." },
  // Sahih al-Bukhari 6077.
  "Two friends quarrel. Who is the better one?": { answer: "The one who greets first", harder: ["Bukhari 6077: who is better of two who stopped speaking?", "The one who is right", "The older one", "The one who keeps away"] },
  "How long at most may Muslims stop talking?": { answer: "Three nights", harder: ["Bukhari 6077: cutting off a brother is not allowed for more than...?", "Seven nights", "One night", "Forty nights"] },
  "Saying salam first after a fight is a sign of weakness.": { answer: "False", harder: "By Bukhari 6077, the better of the two is the one who waits to be greeted." },
  // Sahih al-Bukhari 6120.
  "Whose saying is this, as the Prophet ﷺ told us?": { answer: "The earlier prophets", harder: ["Bukhari 6120: 'if you feel no shame, do whatever you like' is from whom?", "The Companions", "The Arabs of old", "The Jews of Madinah"] },
  "What does losing haya (shame) lead to?": { answer: "Doing any wrong freely", harder: ["Bukhari 6120: 'if you feel no shame...' what follows?", "Pray more", "Keep silent", "Ask a scholar"] },
  "Haya is a shield that holds us back from wrong.": { answer: "True", harder: "By Bukhari 6120, the earlier prophets taught: if you feel no shame, do whatever you like." },
  // Sahih al-Bukhari 6133.
  "A believer is not stung twice from...?": { answer: "The same hole", harder: ["Bukhari 6133: a believer is not stung twice from what?", "The same snake", "The same bee", "The same scorpion"] },
  "What does this teach?": { answer: "Learn from what hurt you", harder: ["Bukhari 6133: 'not stung twice from the same hole' teaches what?", "Never try again", "Forget all lessons", "Trust everyone always"] },
  "A believer keeps making the same mistake.": { answer: "False", harder: "By Bukhari 6133, a believer is stung twice from the same hole." },
  // Sahih al-Bukhari 6171.
  "The man asked about the Hour. What did he ﷺ ask back?": { answer: "What have you prepared?", harder: ["Bukhari 6171: a man asked when the Hour would be. The reply began with a question. Which?", "Who told you about it?", "Why do you ask?", "Have you prayed today?"] },
  "What did the man say he had?": { answer: "Love of Allah and His Messenger ﷺ", harder: ["Bukhari 6171: the man had little prayer, fasting and charity, but what?", "Much knowledge", "Many children", "Good deeds hidden"] },
  "We will be with those we love.": { answer: "True", harder: "By Bukhari 6171, he ﷺ told the man: you will be with those you love." },
  // Sahih al-Bukhari 6221.
  "Why did only one man get yarhamukallah?": { answer: "He praised Allah", harder: ["Bukhari 6221: two men sneezed. Why did one not get yarhamukallah?", "He was asleep", "He sneezed twice", "He was far away"] },
  "What do you say when you sneeze?": { answer: "Alhamdulillah", harder: ["Bukhari 6221: what did the man who got yarhamukallah say after sneezing?", "Subhanallah", "Allahu akbar", "Astaghfirullah"] },
  "What does yarhamukallah mean?": { answer: "May Allah have mercy on you", harder: ["Bukhari 6221: what does yarhamukallah mean?", "May Allah guide you", "May Allah bless you", "May Allah forgive you"] },
  // Sahih al-Bukhari 6203.
  "What pet did little Abu Umayr have?": { answer: "A little bird", harder: ["Bukhari 6203: Abu Umayr's pet was called a nughayr. What is it?", "A small kitten", "A baby goat", "A little fish"] },
  "What does this teach about the Prophet ﷺ?": { answer: "He was kind to children", harder: ["Bukhari 6203: he ﷺ asked Abu Umayr 'what did the little bird do?' What does it show?", "He ignored children", "He disliked pets", "He was always too busy"] },
  "Whose little brother was Abu Umayr?": { answer: "Anas ibn Malik's", harder: ["Bukhari 6203: Abu Umayr was the little brother of whom?", "Abu Hurayrah's", "Jabir's", "Ibn Abbas's"] },
  // Sahih al-Bukhari 6211.
  "Who was Anjashah?": { answer: "A camel driver", harder: ["Bukhari 6211: who was Anjashah, with the fine voice?", "A Quran reciter", "A caller to prayer", "A shepherd"] },
  "Whom did the Prophet ﷺ call glass vessels?": { answer: "The women riding", harder: ["Bukhari 6211: 'do not break the glass vessels.' What did he ﷺ mean?", "The camels", "The water jars", "The men"] },
  "This hadith teaches care and gentleness with women.": { answer: "True", harder: "By Bukhari 6211, he ﷺ told Anjashah to go gently because the women were like glass vessels." },
  // Sahih al-Bukhari 5984.
  "Who will not enter Paradise, says Bukhari 5984?": { answer: "One who cuts off relatives", harder: ["Bukhari 5984: who will not enter Paradise?", "One who is poor", "One who is quiet", "One who lives far away"] },
  "Your cousin hasn't spoken to you in months. What fits?": { answer: "Reach out and keep the tie", harder: ["Bukhari 5984 warns about cutting off relatives. A cousin stopped speaking to you. What fits?", "Cut him off too", "Forget him forever", "Speak badly of him"] },
  // Sahih Muslim 2162b.
  "How many rights does a Muslim have over another in Muslim 2162?": { answer: "Six", harder: ["Muslim 2162b: a Muslim has how many rights over another?", "Five", "Seven", "Four"] },
  "Your classmate is sick at home. Which right fits?": { answer: "Visit him", harder: ["Muslim 2162b: your classmate is ill. Which of the six rights fits?", "Laugh at him", "Forget him", "Ignore him"] },
  "When a Muslim asks your advice, give it sincerely.": { answer: "True", harder: "By Muslim 2162b, giving advice when a Muslim asks for it is one of the six rights." },
  // Sahih Muslim 2552a.
  "What is the finest goodness, says Muslim 2552?": { answer: "Kindness to your father's loved ones", harder: ["Muslim 2552a: what did Ibn Umar call the finest goodness?", "Kindness to your own children", "Kindness to travellers", "Kindness to your teachers"] },
  "What did Ibn Umar give the man?": { answer: "His donkey and turban", harder: ["Muslim 2552a: the man's father was Umar's friend. What did Ibn Umar give him?", "His sandals and cloak", "His sword and horse", "A bag of dates"] },
  "Being good to parents can go on after they pass away.": { answer: "True", harder: "By Muslim 2552a, being kind to your father's loved ones is the finest goodness." },
  // Sahih Muslim 2621.
  "What did the man swear about another?": { answer: "Allah won't forgive him", harder: ["Muslim 2621: a man swore by Allah about so-and-so. What did he swear?", "That he would go to Paradise", "That he would never pray", "That he would grow rich"] },
  "Whom did Allah forgive?": { answer: "The one he spoke about", harder: ["Muslim 2621: whom did Allah forgive?", "The one who swore", "Both of them", "Neither of them"] },
  "We can say for sure that Allah will never forgive someone.": { answer: "False", harder: "By Muslim 2621, Allah accepted the man's oath and did not forgive so-and-so." },
  // Sahih al-Bukhari 5373.
  "Whom did he ﷺ tell us to feed?": { answer: "The hungry", harder: ["Bukhari 5373: whom did he ﷺ tell us to feed?", "Only travellers", "Only neighbours", "Only orphans"] },
  "Feed the hungry, free the captive, and...?": { answer: "Visit the sick", harder: ["Bukhari 5373: feed the hungry, set the captive free, and...?", "Greet the stranger", "Bury the dead", "Guide the lost"] },
  "Giving food to a hungry person is a deed the Prophet ﷺ ordered.": { answer: "True", harder: "By Bukhari 5373, feeding the hungry, visiting the sick and freeing the captive were all ordered." },
  // Sahih al-Bukhari 5392.
  "Food for two people is enough for...?": { answer: "Three people", harder: ["Bukhari 5392: the food of two is enough for how many?", "Two only", "Four", "Six"] },
  "A friend comes while you eat with your brother. What fits?": { answer: "Share the food", harder: ["Bukhari 5392: food of two is enough for three. A guest joins you and your brother. What fits?", "Eat faster", "Hide the plate", "Tell him to leave"] },
  "Food for three people is enough for four.": { answer: "True", harder: "By Bukhari 5392, the food of three is enough for four." },
  // Sahih al-Bukhari 5394.
  "How does a believer eat, says Bukhari 5394?": { answer: "Content with a little", harder: ["Bukhari 5394: how does a believer eat?", "In seven stomachs", "Only once a day", "As much as he can"] },
  "What does eating in one stomach mean?": { answer: "Being content with little", harder: ["Bukhari 5394: what does 'eats in one stomach' mean?", "Eating alone", "Eating fast", "Eating once a week"] },
  "Eating far too much is the way of a believer.": { answer: "False", harder: "By Bukhari 5394, a believer eats in seven stomachs." },
  // Sahih al-Bukhari 5398.
  "How did the Prophet ﷺ not eat?": { answer: "Leaning back", harder: ["Bukhari 5398: 'I do not eat while...' what?", "Standing", "Walking", "Talking"] },
  "Who heard him say it?": { answer: "Abu Juhayfah", harder: ["Bukhari 5398: who heard him ﷺ say 'I do not eat while leaning'?", "Abu Hurayrah", "Anas ibn Malik", "Jabir"] },
  "Sitting humbly while eating follows his Sunnah.": { answer: "True", harder: "By Bukhari 5398, the Prophet ﷺ did not eat while leaning." },
  // Sahih Muslim 2033b.
  "A clean bite falls on the mat. What do you do?": { answer: "Wipe it and eat it", harder: ["Muslim 2033b: a bite falls. What do you do with it?", "Give it to a cat", "Leave it for later", "Wash it at home"] },
  "Why lick your fingers before wiping them?": { answer: "The blessing may be there", harder: ["Muslim 2033b: lick your fingers before wiping, for you do not know where...?", "The dirt is", "Your plate is", "The water is"] },
  "We should leave dropped food for Shaytan.": { answer: "False", harder: "By Muslim 2033b, a dropped bite should be left on the ground for Shaytan." },
  // Sahih al-Bukhari 5460.
  "Who should get a share of the food?": { answer: "The one who cooked it", harder: ["Bukhari 5460: who should get a handful or two of the food?", "The eldest guest", "The neighbour", "The youngest child"] },
  "Why does the cook deserve a share?": { answer: "He bore its heat", harder: ["Bukhari 5460: why give the cook a handful or two?", "He bore its heat and work", "He paid for it", "He is hungry"] },
  "Inviting the cook to eat with you is even better.": { answer: "True", harder: "By Bukhari 5460, if you don't seat the cook with you, give him a handful or two." },
  // Sahih al-Bukhari 5416.
  "What did his family not have three days in a row?": { answer: "Wheat bread to the full", harder: ["Bukhari 5416: his family never ate their fill of what, three days in a row?", "Barley bread", "Dates", "Meat"] },
  "What does this teach about his life?": { answer: "It was simple and humble", harder: ["Bukhari 5416: no full wheat bread three days in a row. What does it teach about his life?", "He hoarded food", "He loved feasts", "He was greedy"] },
  "Who told us this?": { answer: "Aishah", harder: ["Bukhari 5416: who said his family never ate their fill of wheat bread three days running?", "Anas ibn Malik", "Fatimah", "Abu Hurayrah"] },
  // Sahih al-Bukhari 5436.
  "Who invited the Prophet ﷺ to this meal?": { answer: "A tailor", harder: ["Bukhari 5436: who invited the Prophet ﷺ to barley bread and gourd soup?", "A butcher", "A neighbour", "A shepherd"] },
  "What did the Prophet ﷺ pick from the dish?": { answer: "Gourd", harder: ["Bukhari 5436: what did he ﷺ pick from the soup?", "Barley", "Onion", "Meat"] },
  "Anas loved gourd because the Prophet ﷺ liked it.": { answer: "True", harder: "By Bukhari 5436, Anas loved gourd ever since he saw the Prophet ﷺ pick it out." },
  // Sahih al-Bukhari 5452.
  "After eating raw garlic, where should you not go?": { answer: "The masjid", harder: ["Bukhari 5452: whoever ate garlic or onion should keep away from what?", "From the market", "From his home", "From the road"] },
  "Why keep away?": { answer: "The smell bothers people", harder: ["Bukhari 5452: why keep away from the masjid after raw garlic?", "It breaks wudu", "It is a sin to eat", "Garlic is haram"] },
  "Eating garlic is forbidden in Islam.": { answer: "False", harder: "By Bukhari 5452, garlic and onion are haram to eat." },
  // Sahih al-Bukhari 5585.
  "Which drinks are haram, says Bukhari 5585?": { answer: "Every drink that intoxicates", harder: ["Bukhari 5585: the answer about bit' covered which drinks?", "Only honey drinks", "Only date drinks", "Only grape drinks"] },
  "He ﷺ was asked about a drink made from...?": { answer: "Honey", harder: ["Bukhari 5585: he ﷺ was asked about bit'. What is it made from?", "Dates", "Barley", "Grapes"] },
  "A new kind of drink that makes people drunk is halal.": { answer: "False", harder: "By Bukhari 5585, only grape wine is haram, so other drinks that intoxicate are fine." },
  // Sahih Muslim 2028b.
  "In how many breaths did he ﷺ drink?": { answer: "Three", harder: ["Muslim 2028b: in how many breaths did he ﷺ drink?", "Two", "Five", "Seven"] },
  "Where did he breathe?": { answer: "Outside the cup", harder: ["Muslim 2028b: when drinking, where did he ﷺ breathe?", "Over the cup", "Into the jug", "He did not breathe"] },
  "He said three breaths quench thirst more.": { answer: "True", harder: "By Muslim 2028b, three breaths quench thirst more and are healthier and better." },
  // Sahih al-Bukhari 5619.
  "Who got the drink after the Prophet ﷺ?": { answer: "The bedouin on his right", harder: ["Bukhari 5619: after drinking the milk, to whom did he ﷺ pass it?", "To Abu Bakr", "To the eldest", "To Umar"] },
  "Who sat on his left?": { answer: "Abu Bakr", harder: ["Bukhari 5619: the bedouin was on his right. Who was on his left?", "Umar", "Ali", "Anas"] },
  "When passing drinks round, start with the person on your right.": { answer: "True", harder: "By Bukhari 5619, he ﷺ said: the right, then the right." },
  // Sahih al-Bukhari 5605.
  "What did he ﷺ tell Abu Humayd about the milk?": { answer: "Cover it", harder: ["Bukhari 5605: what did he ﷺ tell Abu Humayd to do with the milk?", "Drink it at once", "Warm it", "Share it out"] },
  "With what, at the very least?": { answer: "A stick across it", harder: ["Bukhari 5605: cover it, even by doing what?", "Putting a leaf on it", "Holding your hand on it", "Turning it over"] },
  "Covering food and drink is a sunnah.": { answer: "True", harder: "By Bukhari 5605, he ﷺ asked why the milk was not covered, even with a stick across it." },
  // Sahih al-Bukhari 6326.
  "Who asked for this dua to say in prayer?": { answer: "Abu Bakr", harder: ["Bukhari 6326: who asked for a dua to say in prayer?", "Umar", "Ali", "Uthman"] },
  "The dua says: none forgives sins but...?": { answer: "Allah", harder: ["Bukhari 6326: 'I have wronged myself greatly, and none forgives sins but...'?", "The angels", "The Prophet ﷺ", "The righteous"] },
  "Even Abu Bakr asked Allah to forgive his wrongs.": { answer: "True", harder: "By Bukhari 6326, Abu Bakr was taught to say: I have wronged myself greatly." },
  // Sahih al-Bukhari 6338.
  "How should we ask Allah?": { answer: "Firmly, with full hope", harder: ["Bukhari 6338: how should one ask Allah?", "Quietly and unsure", "Only for small things", "With conditions"] },
  "Which words did he ﷺ tell us not to say?": { answer: "Give me if You wish", harder: ["Bukhari 6338: which words should we not say when asking?", "O Allah, give me", "O Allah, forgive me", "O Allah, guide me"] },
  "Ask Allah as one sure He can give.": { answer: "True", harder: "By Bukhari 6338, no one can force Allah, so ask firmly without 'if You wish'." },
  // Sahih al-Bukhari 6351.
  "A hard time comes. What did he ﷺ forbid?": { answer: "Wishing for death", harder: ["Bukhari 6351: what should no one do because of a hardship?", "Ask for help", "Cry", "Make dua"] },
  "What does the dua ask Allah for?": { answer: "Life while it is better for me", harder: ["Bukhari 6351: if he must, what does he ask Allah for?", "Death right away", "A long life always", "An end to all hardship"] },
  "Feeling very sad? Talk to Allah and to a trusted adult.": { answer: "True", harder: "By Bukhari 6351, a hardship is no reason to wish for death." },
  // Sahih al-Bukhari 6369.
  "Which two feelings does this dua start with?": { answer: "Worry and grief", harder: ["Bukhari 6369: the dua begins with refuge from which two?", "Fear and sadness", "Weakness and illness", "Debt and poverty"] },
  "Which of these is also in the dua?": { answer: "Laziness", harder: ["Bukhari 6369: besides worry and grief, which is in the dua?", "Hunger", "Sleep", "Anger"] },
  "The Prophet ﷺ asked Allah's help against heavy debt.": { answer: "True", harder: "By Bukhari 6369, he ﷺ sought refuge from heavy debt and from being overpowered by men." },
  // Sahih al-Bukhari 6399.
  "What does this dua first ask Allah to forgive?": { answer: "My mistakes", harder: ["Bukhari 6399: what is the first thing this dua asks Allah to forgive?", "My laziness", "My anger", "My pride"] },
  "What else is named?": { answer: "My ignorance", harder: ["Bukhari 6399: after my mistakes, what else does it ask forgiven?", "My hunger", "My sleep", "My wealth"] },
  "The dua asks forgiveness even for what Allah knows better than us.": { answer: "True", harder: "By Bukhari 6399, the dua asks forgiveness for what was done in jest and in earnest." },
  // Sahih al-Bukhari 6361.
  "What did the Prophet ﷺ ask for anyone he spoke harshly to?": { answer: "That it bring them near to Allah", harder: ["Bukhari 6361: if he ﷺ spoke harshly to a believer, what did he ask?", "That it be forgotten", "That he be paid back", "That it be hidden"] },
  "When did he ask for this good to reach them?": { answer: "On the Day of Resurrection", harder: ["Bukhari 6361: the harsh word becomes a means of nearness to Allah when?", "In this life", "At death", "After Ramadan"] },
  "This dua was made for believers.": { answer: "True", harder: "By Bukhari 6361, he ﷺ asked that harsh words to a believer bring that believer near to Allah." },
  // Sahih Muslim 2695.
  "These four words are dearer to him ﷺ than...?": { answer: "All the sun rises over", harder: ["Muslim 2695: the four words are dearer to him ﷺ than what?", "All the gold of Arabia", "A thousand camels", "All the stars"] },
  "Which of these is one of the four?": { answer: "Allahu akbar", harder: ["Muslim 2695: subhanallah, alhamdulillah, la ilaha illallah and...?", "Astaghfirullah", "Bismillah", "Mashallah"] },
  "Saying these four words is easy and greatly loved.": { answer: "True", harder: "By Muslim 2695, the four words are dearer than everything the sun rises over." },
  // Sahih Muslim 2697a.
  "Whom did he ﷺ teach this dua to first?": { answer: "Those who just accepted Islam", harder: ["Muslim 2697a: whom did he ﷺ teach 'forgive me, have mercy on me, guide me and provide for me'?", "Children at school", "Travellers", "Rulers"] },
  "Forgive me, have mercy, guide me, and...?": { answer: "Provide for me", harder: ["Muslim 2697a: forgive me, have mercy on me, guide me and...?", "Protect me", "Bless me", "Heal me"] },
  "This short dua asks for good in this life and the next.": { answer: "True", harder: "By Muslim 2697a, a new Muslim was taught to ask for forgiveness, mercy, guidance and provision." },
  // Sahih Muslim 2715.
  "When did he ﷺ say this praise?": { answer: "At bedtime", harder: ["Muslim 2715: when did he ﷺ praise Allah who fed us and gave us shelter?", "After every meal", "When waking", "When leaving home"] },
  "What does the dua remember?": { answer: "Many have no shelter", harder: ["Muslim 2715: what does the bedtime praise remember?", "The day is over", "Tomorrow's work", "The rain"] },
  "This dua thanks Allah for food, drink and a home.": { answer: "True", harder: "By Muslim 2715, the bedtime praise thanks Allah for food, drink and shelter." },
  // Sahih Muslim 2721a.
  "What does this dua ask for first?": { answer: "Guidance", harder: ["Muslim 2721a: what is the first thing the dua asks for?", "Taqwa", "Knowledge", "Health"] },
  "Al-ghina here means...?": { answer: "Not needing people", harder: ["Muslim 2721a: guidance, taqwa, chastity and al-ghina. Al-ghina means...?", "Wealth and gold", "Good health", "Long life"] },
  "Taqwa is one of the four things asked for.": { answer: "True", harder: "By Muslim 2721a, the dua asks for guidance, taqwa, chastity and freedom from need." },
  // Sahih Muslim 2725a.
  "Who was taught this dua?": { answer: "Ali ibn Abi Talib", harder: ["Muslim 2725a: who was told to think of a straight arrow in his dua?", "Abu Bakr", "Bilal", "Anas"] },
  "What should you picture when asking to be kept straight?": { answer: "A straight arrow", harder: ["Muslim 2725a: asking to be kept straight, what should you picture?", "A straight road only", "A tall palm", "A taut rope"] },
  "Thinking about a dua's meaning makes it stronger.": { answer: "True", harder: "By Muslim 2725a, Ali was told to think of the straightness of an arrow when he made this dua." },
  // Sahih Muslim 2729.
  "A rooster crows at dawn. What do you do?": { answer: "Ask Allah for His favor", harder: ["Muslim 2729: when you hear a rooster crow, what do you ask for?", "Refuge from Shaytan", "Rain", "Forgiveness for the rooster"] },
  "A donkey brays. What do you say?": { answer: "A'udhu billahi minash-shaytan", harder: ["Muslim 2729: a donkey brays. What do you say?", "Bismillah", "Subhanallah", "Astaghfirullah"] },
  "The rooster crows when it has seen an angel.": { answer: "True", harder: "By Muslim 2729, the donkey brays when it has seen an angel." },
  // Sahih Muslim 2739.
  "What does this dua ask Allah to keep?": { answer: "His blessings on us", harder: ["Muslim 2739: what does this dua ask Allah not to take away?", "His punishment", "His tests", "Our hardships"] },
  "And from what else does it seek refuge?": { answer: "All of Allah's displeasure", harder: ["Muslim 2739: loss of blessing, change of protection, sudden punishment, and what?", "All of His tests", "All hard days", "All illness"] },
  "Blessings can be lost, so we ask Allah to keep them.": { answer: "True", harder: "By Muslim 2739, he ﷺ sought refuge from the loss of Allah's blessing." },
  // Sahih Muslim 2675a.
  "Allah is as His servant...?": { answer: "Thinks of Him", harder: ["Muslim 2675a: 'I am as My servant...' what?", "Calls Me", "Fears Me", "Serves Me"] },
  "If you remember Allah in a gathering, He remembers you...?": { answer: "In a better gathering", harder: ["Muslim 2675a: remember Allah in a gathering, and He remembers you where?", "In a bigger gathering", "In the same gathering", "In His Book"] },
  "So think well of Allah and expect good from Him.": { answer: "True", harder: "By Muslim 2675a, when the servant remembers Allah in a gathering, Allah remembers him in a better one." },
  // Sahih al-Bukhari 6417.
  "In the drawing, what did the square stand for?": { answer: "A person's lifetime", harder: ["Bukhari 6417: in the drawing, the square was a person's what?", "His hopes", "His troubles", "His family"] },
  "What was the line going outside the square?": { answer: "His hope", harder: ["Bukhari 6417: what was the line going out of the square?", "His troubles", "His years", "His path home"] },
  "Our hopes often reach further than our lifetime.": { answer: "True", harder: "By Bukhari 6417, the line going out of the square was a person's hope." },
  // Sahih al-Bukhari 6435.
  "What makes the slave of money happy?": { answer: "Only being given things", harder: ["Bukhari 6435: when is the slave of the dinar pleased?", "When he prays", "When he gives", "When he learns"] },
  "What happens when he is not given?": { answer: "He is unhappy", harder: ["Bukhari 6435: if the slave of the dinar is not given, how does he feel?", "He is patient", "He is thankful", "He forgets it"] },
  "A believer's heart should belong to Allah, not to money.": { answer: "True", harder: "By Bukhari 6435, wretched is the slave of the dinar and the dirham." },
  // Sahih al-Bukhari 6441.
  "How did the Prophet ﷺ describe wealth?": { answer: "Green and sweet", harder: ["Bukhari 6441: Hakim asked three times. How did he ﷺ describe wealth?", "Bright and shining", "Light and quick", "Sweet and soft"] },
  "One who takes wealth greedily is like...?": { answer: "One who eats and is never full", harder: ["Bukhari 6441: one who takes wealth with greed is like whom?", "A sleeping lion", "A happy bird", "A full well"] },
  "Which hand is better?": { answer: "The upper, giving hand", harder: ["Bukhari 6441: which hand did he ﷺ tell Hakim is better?", "The empty hand", "The lower, taking hand", "Both are the same"] },
  // Sahih al-Bukhari 6445.
  "How much gold did he ﷺ imagine having?": { answer: "As much as Mount Uhud", harder: ["Bukhari 6445: if he ﷺ had gold like what?", "Like Mount Safa", "Like the Kabah", "Like a river"] },
  "How long would he ﷺ keep it?": { answer: "No more than three nights", harder: ["Bukhari 6445: he would not like any of it to stay with him after how long?", "One night", "Seven nights", "A month"] },
  "What would he ﷺ keep back?": { answer: "Enough to repay debts", harder: ["Bukhari 6445: except what he keeps for what?", "For his family", "For a journey", "For Eid"] },
  // Sahih al-Bukhari 6456.
  "What was his ﷺ mattress stuffed with?": { answer: "Palm fibres", harder: ["Bukhari 6456: his ﷺ leather mattress was stuffed with what?", "Wool", "Straw", "Cotton"] },
  "Who told us about his mattress?": { answer: "Aishah", harder: ["Bukhari 6456: who said his mattress was leather stuffed with palm fibres?", "Fatimah", "Umm Salamah", "Hafsah"] },
  "The Prophet ﷺ slept on a very fancy bed.": { answer: "False", harder: "By Bukhari 6456, his ﷺ mattress was silk stuffed with feathers." },
  // Sahih al-Bukhari 6459.
  "What were the two black things they lived on?": { answer: "Dates and water", harder: ["Bukhari 6459: no cooking fire for months. What did they live on?", "Bread and milk", "Meat and dates", "Barley and honey"] },
  "Who sometimes sent them milk?": { answer: "Their Ansar neighbours", harder: ["Bukhari 6459: who sometimes sent the family milk?", "Traders from Syria", "The Muhajirun", "Bedouins"] },
  "How many new moons could pass without cooking?": { answer: "Three", harder: ["Bukhari 6459: how many new moons in two months with no cooking fire?", "Two", "Four", "Six"] },
  // Sahih al-Bukhari 6483.
  "What rushed into the fire in this example?": { answer: "Moths and insects", harder: ["Bukhari 6483: in his ﷺ example, what fell into the fire?", "Leaves", "Children", "Sparks"] },
  "What does the Prophet ﷺ do for us in the example?": { answer: "Holds us back by our belts", harder: ["Bukhari 6483: 'I hold you by your...' what, to keep you from the Fire?", "Hands", "Hair", "Clothes"] },
  "This hadith shows how much he ﷺ cared for his ummah.": { answer: "True", harder: "By Bukhari 6483, he ﷺ holds people back from the Fire while they rush into it." },
  // Sahih al-Bukhari 6490.
  "You see a friend with a new phone. What fits this hadith?": { answer: "Think of those with less", harder: ["Bukhari 6490: someone has more wealth and better looks. Then look at whom?", "Complain all day", "Take his phone", "Feel angry"] },
  "What two things are named in this hadith?": { answer: "Wealth and looks", harder: ["Bukhari 6490: which two things does the hadith name?", "Children and wealth", "Health and wealth", "Looks and age"] },
  "Looking at those with less helps us thank Allah.": { answer: "True", harder: "By Bukhari 6490, when you see someone with more, also look at someone with less." },
  // Sahih al-Bukhari 6501.
  "What was the name of his ﷺ fast camel?": { answer: "Al-Adba", harder: ["Bukhari 6501: what was his ﷺ fast camel called?", "Al-Qaswa", "Al-Jad'a", "Duldul"] },
  "Who beat Al-Adba in the race?": { answer: "A bedouin on his camel", harder: ["Bukhari 6501: who beat Al-Adba?", "A trader from Syria", "A man from Quraysh", "A Companion"] },
  "What lesson did he ﷺ give?": { answer: "Nothing worldly stays on top", harder: ["Bukhari 6501: Al-Adba lost a race. What lesson did he ﷺ give?", "Always win races", "Sell slow camels", "Never race"] },
  // Sahih al-Bukhari 6512.
  "When did he ﷺ say this?": { answer: "As a funeral passed", harder: ["Bukhari 6512: 'resting or giving rest.' When did he ﷺ say this?", "At a grave", "After Fajr", "On a journey"] },
  "Where does the believer go after death?": { answer: "To Allah's mercy", harder: ["Bukhari 6512: the believer rests from the world's hardships and goes to what?", "To his grave only", "To his family", "To the angels"] },
  "For a believer, death brings rest from the world's hardships.": { answer: "True", harder: "By Bukhari 6512, a believer rests from the hardships of the world and goes to Allah's mercy." },
  // Sahih al-Bukhari 6516.
  "What did he ﷺ forbid about the dead?": { answer: "Insulting them", harder: ["Bukhari 6516: what did he ﷺ forbid regarding the dead?", "Crying for them", "Praying for them", "Naming them"] },
  "Why not insult them?": { answer: "They have met their deeds", harder: ["Bukhari 6516: why not insult the dead?", "They can hear us", "Their families are near", "It brings bad luck"] },
  "We may make dua for Muslims who have died.": { answer: "True", harder: "By Bukhari 6516, the dead have reached what they sent ahead." },
  // Sahih Muslim 2956.
  "What is this world for the believer?": { answer: "A prison", harder: ["Muslim 2956: what is this world for the believer?", "A playground", "A paradise", "A forever home"] },
  "Why is it like a prison for him?": { answer: "He holds back for Allah", harder: ["Muslim 2956: why is this world like a prison for the believer?", "He has no friends", "He is always sick", "He cannot walk"] },
  "The believer's best reward comes in the Hereafter.": { answer: "True", harder: "By Muslim 2956, this world is a prison for the believer and a paradise for the disbeliever." },
  // Sahih al-Bukhari 5813.
  "Which garment did he ﷺ love most?": { answer: "The Hibra", harder: ["Bukhari 5813: which garment did he ﷺ love most to wear?", "The white qamis", "The woollen cloak", "The striped turban"] },
  "Where did the Hibra cloth come from?": { answer: "Yemen", harder: ["Bukhari 5813: the Hibra was a cloth from where?", "Syria", "Persia", "Iraq"] },
  "Anas told us about this cloth.": { answer: "True", harder: "By Bukhari 5813, Anas said the garment he ﷺ loved most was the Hibra." },
  // Sahih al-Bukhari 5836.
  "What gift amazed the companions?": { answer: "A silk garment", harder: ["Bukhari 5836: the people admired a gift. What was it?", "A wool cloak", "A gold ring", "A fine horse"] },
  "What did he ﷺ say is better than it?": { answer: "Sa'd's handkerchiefs in Jannah", harder: ["Bukhari 5836: whose handkerchiefs in Paradise are better than the silk garment?", "Abu Bakr's", "Bilal's", "Uthman's"] },
  "Even the smallest thing in Jannah is better than the best of this world.": { answer: "True", harder: "By Bukhari 5836, Sa'd ibn Mu'adh's handkerchiefs in Paradise are better than the admired silk garment." },
  // Sahih al-Bukhari 5832.
  "What happens to a man who wears silk in this world?": { answer: "He won't wear it in the Hereafter", harder: ["Bukhari 5832: whoever wears silk in this world will...?", "Nothing at all", "He becomes rich", "He gets more"] },
  "Who is this ruling for?": { answer: "Men", harder: ["Bukhari 5832 warns that whoever wears silk here won't wear it in the Hereafter. Whom is this ruling for?", "Everyone", "Women", "Children only"] },
  "Women are forbidden to wear silk.": { answer: "False", harder: "By Bukhari 5832, the silk ruling is for women as well as men." },
  // Sahih al-Bukhari 5855.
  "Which shoe goes on first?": { answer: "The right", harder: ["Bukhari 5855: putting on shoes, start with which?", "Both at once", "The left", "Either one"] },
  "Which shoe comes off first?": { answer: "The left", harder: ["Bukhari 5855: taking off shoes, start with which?", "Neither", "The heavier one", "The right"] },
  "The right shoe is the first on and the last off.": { answer: "True", harder: "By Bukhari 5855, start with the right when putting shoes on and with the left when taking them off." },
  // Sahih al-Bukhari 5856.
  "One strap breaks. What fits this hadith?": { answer: "Take both shoes off", harder: ["Bukhari 5856 says wear both shoes or take both off. A strap breaks. What fits?", "Hop on one shoe", "Walk in one shoe", "Throw one away"] },
  "How should we walk?": { answer: "In both shoes or none", harder: ["Bukhari 5856: how should we walk?", "In one shoe if needed", "In one shoe on short trips", "Only in sandals"] },
  "Walking in just one shoe is the Sunnah.": { answer: "False", harder: "By Bukhari 5856, walking in one shoe is fine if the other strap breaks." },
  // Sahih Muslim 2096.
  "Walking in sandals is like...?": { answer: "Riding", harder: ["Muslim 2096: on a journey he ﷺ said a man in sandals is as if he is...?", "Resting", "Running", "Standing"] },
  "Good sandals make long walks easier.": { answer: "True", harder: "By Muslim 2096, he ﷺ said a man in sandals is as if he is riding." },
  // Sahih al-Bukhari 5873.
  "What was his ﷺ ring made of?": { answer: "Silver", harder: ["Bukhari 5873: his ﷺ ring was made of what?", "Copper", "Gold", "Iron"] },
  "Who wore it after Abu Bakr?": { answer: "Umar", harder: ["Bukhari 5873: the ring passed from Abu Bakr to whom?", "Uthman", "Ali", "Talhah"] },
  "Where was the ring lost?": { answer: "In the well of Aris", harder: ["Bukhari 5873: where was the ring lost in Uthman's time?", "In the Kabah", "In the desert", "In Uthman's house"] },
  // Sahih al-Bukhari 5905.
  "How was his ﷺ hair?": { answer: "Neither very straight nor curly", harder: ["Bukhari 5905: how did Anas describe his ﷺ hair?", "Very curly", "Thin and straight", "Always shaved"] },
  "How long was it?": { answer: "Between earlobes and shoulders", harder: ["Bukhari 5905: how long was his ﷺ hair?", "Down to his chest", "Above his ears", "To his waist"] },
  "Anas described the hair of the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 5905, his ﷺ hair was neither very straight nor very curly." },
  // Sahih al-Bukhari 5929.
  "What gift did he ﷺ never refuse?": { answer: "Perfume", harder: ["Bukhari 5929: which gift did he ﷺ never refuse?", "Food", "Clothes", "Dates"] },
  "Which companion copied this?": { answer: "Anas", harder: ["Bukhari 5929: who never refused perfume, following the Prophet ﷺ?", "Abu Hurayrah", "Ibn Umar", "Jabir"] },
  "Accepting perfume as a gift follows the Sunnah.": { answer: "True", harder: "By Bukhari 5929, the Prophet ﷺ never refused perfume." },
  // Sahih al-Bukhari 5923.
  "What scent did Aishah use?": { answer: "The best she could find", harder: ["Bukhari 5923: Aishah perfumed him ﷺ with which scent?", "Musk only", "Rose water", "Any she had"] },
  "Where could its shine be seen?": { answer: "On his head and beard", harder: ["Bukhari 5923: where did she see the scent's shine?", "On his hands", "On his clothes", "On his chest"] },
  "Smelling nice is part of a Muslim's good manners.": { answer: "True", harder: "By Bukhari 5923, Aishah used the best scent she could find on him ﷺ." },
  // Sahih al-Bukhari 5848.
  "How tall was the Prophet ﷺ?": { answer: "Of medium height", harder: ["Bukhari 5848: Al-Bara said he ﷺ was of what height?", "Very tall", "Short", "Tallest of all"] },
  "What did Al-Bara never see?": { answer: "Anything better than him", harder: ["Bukhari 5848: Al-Bara saw him ﷺ in a red suit. What did he never see?", "Anyone taller", "A finer suit", "Anyone so strong"] },
  "Al-Bara ibn Azib narrated this.": { answer: "True", harder: "By Bukhari 5848, Al-Bara never saw anything better looking than the Prophet ﷺ." },
  // Sahih Muslim 2084.
  "Who is the third bed for?": { answer: "A guest", harder: ["Muslim 2084: a bed for a man, one for his wife, the third for whom?", "A child", "A servant", "A relative"] },
  "Who is the fourth bed for?": { answer: "Shaytan", harder: ["Muslim 2084: whom is the fourth bed for?", "A second guest", "The poor", "A traveller"] },
  "This hadith teaches us to avoid waste and showing off.": { answer: "True", harder: "By Muslim 2084, the fourth bed is for Shaytan." },
  // Sahih al-Bukhari 5965.
  "Who came out to meet him in Makkah?": { answer: "Children of his clan", harder: ["Bukhari 5965: who met him ﷺ when he reached Makkah?", "The elders of Quraysh", "The women of Makkah", "His uncles"] },
  "What did he ﷺ do with two of them?": { answer: "Lifted them onto his ride", harder: ["Bukhari 5965: what did he ﷺ do with two of the children?", "Gave them dates", "Sent them to their mothers", "Walked with them"] },
  "The Prophet ﷺ was kind and playful with children.": { answer: "True", harder: "By Bukhari 5965, he ﷺ put one child in front and another behind him on his ride." },
  // Sahih Muslim 2116a.
  "Where must an animal never be hit?": { answer: "On its face", harder: ["Muslim 2116a: he ﷺ forbade striking animals where?", "On the back", "On the legs", "On the tail"] },
  "What else did he ﷺ forbid on the face?": { answer: "Branding it", harder: ["Muslim 2116a: besides striking, what else was forbidden on an animal's face?", "Covering it", "Washing it", "Tying it"] },
  "Islam teaches kindness to animals.": { answer: "True", harder: "By Muslim 2116a, he ﷺ forbade striking or branding animals on the face." },
  // Sahih al-Bukhari 2059.
  "What did he ﷺ warn people would stop caring about?": { answer: "Whether money is halal", harder: ["Bukhari 2059: what did he ﷺ warn people would stop caring about?", "How much they earn", "Who they trade with", "Where they live"] },
  "A Muslim checks that his money is halal.": { answer: "True", harder: "By Bukhari 2059, a time will come when people won't care whether money is lawful." },
  "How should a Muslim earn?": { answer: "Only in lawful ways", harder: ["Bukhari 2059 warns about not caring if money is halal. How should a Muslim earn?", "By tricking people", "By luck only", "Any way at all"] },
  // Sahih al-Bukhari 2068.
  "What did the Prophet ﷺ buy on credit?": { answer: "Food grain", harder: ["Bukhari 2068: what did he ﷺ buy from a Jewish man on credit?", "Dates", "Cloth", "A camel"] },
  "What did he leave as a pledge?": { answer: "His iron armour", harder: ["Bukhari 2068: what did he ﷺ give as a pledge?", "His sword", "His shield", "His cloak"] },
  "Muslims may trade fairly with people of other faiths.": { answer: "True", harder: "By Bukhari 2068, he ﷺ bought food from a Jewish man on credit and pledged his armour." },
  // Sahih al-Bukhari 2071.
  "What kind of work did the companions do?": { answer: "Work with their hands", harder: ["Bukhari 2071: what work did the companions do?", "Only farming", "Only fighting", "Only trading"] },
  "What were they told to do after sweating?": { answer: "Take a bath", harder: ["Bukhari 2071: they did manual work and sweated, so they were told to...?", "Wear perfume", "Rest at noon", "Pray at home"] },
  "Working hard with your hands is a shameful thing.": { answer: "False", harder: "By Bukhari 2071, the companions did no manual work at all." },
  // Sahih al-Bukhari 2074.
  "What is better than asking people for money?": { answer: "Carrying wood to earn", harder: ["Bukhari 2074: what is better than asking people?", "Borrowing from friends", "Waiting for zakat", "Asking the ruler"] },
  "Why is asking people risky?": { answer: "They may or may not give", harder: ["Bukhari 2074: why is asking people risky?", "They may be poor", "They may tell others", "They may be far"] },
  "Islam praises earning your own living.": { answer: "True", harder: "By Bukhari 2074, carrying a bundle of wood to earn is better than asking people." },
  // Sahih al-Bukhari 2076.
  "Who gets Allah's mercy in this hadith?": { answer: "One who is easy in trade", harder: ["Bukhari 2076: on whom does Allah have mercy?", "One who sells cheap", "One who buys a lot", "One who never borrows"] },
  "When else should we be easy?": { answer: "When asking for a debt back", harder: ["Bukhari 2076: easygoing when buying, selling, and when...?", "Giving gifts", "Paying tax", "Borrowing"] },
  "Bargaining harshly and rudely is the Sunnah.": { answer: "False", harder: "By Bukhari 2076, Allah's mercy is for a man who is hard and harsh when buying and selling." },
  // Sahih al-Bukhari 2078.
  "What did the lender do for poor debtors?": { answer: "Let them off", harder: ["Bukhari 2078: a debtor was in hardship. What did the merchant tell his workers?", "Take his things", "Give him a month", "Add to his debt"] },
  "What did Allah do for him?": { answer: "Forgave him", harder: ["Bukhari 2078: what did Allah do for the merchant?", "Made him rich", "Gave him a long life", "Doubled his trade"] },
  "Being gentle with people in debt is loved by Allah.": { answer: "True", harder: "By Bukhari 2078, Allah forgave the merchant who let off debtors in hardship." },
  // Sahih al-Bukhari 2087.
  "What does swearing a lot help a seller do?": { answer: "Sell the goods", harder: ["Bukhari 2087: what does swearing help with?", "Getting a better price", "Making friends", "Keeping the goods"] },
  "What does it take away?": { answer: "Allah's blessing", harder: ["Bukhari 2087: swearing may help sell the goods, but wipes out what?", "The profit", "The trust", "The goods"] },
  "Honest selling without oaths brings more barakah.": { answer: "True", harder: "By Bukhari 2087, swearing may help sell goods but wipes out the blessing." },
  // Sahih al-Bukhari 2108.
  "Until when can a deal be cancelled?": { answer: "Until they part", harder: ["Bukhari 2108: buyer and seller may cancel the deal as long as...?", "Money not paid", "Goods not taken", "Three days pass"] },
  "Who has this choice?": { answer: "Both buyer and seller", harder: ["Bukhari 2108: who may cancel or keep the deal before parting?", "Only the judge", "Only the buyer", "Only the seller"] },
  "Who narrated this hadith?": { answer: "Hakim ibn Hizam", harder: ["Bukhari 2108: who narrated 'buyer and seller may cancel until they part'?", "Abu Hurayrah", "Jabir", "Ibn Abbas"] },
  // Sahih al-Bukhari 2117.
  "What problem did the man have?": { answer: "He was often cheated", harder: ["Bukhari 2117: a man told the Prophet ﷺ his problem when buying. What was it?", "He had no money", "He forgot prices", "He lost his goods"] },
  "What was he told to say when buying?": { answer: "No cheating", harder: ["Bukhari 2117: what was he told to say when buying?", "Lower the price", "Swear by Allah", "Write it down"] },
  "Islam protects people from being tricked in trade.": { answer: "True", harder: "By Bukhari 2117, a man often cheated was told to say when buying: no cheating." },
  // Sahih al-Bukhari 2128.
  "What did he ﷺ tell us to measure?": { answer: "Our food", harder: ["Bukhari 2128: what did he ﷺ say to measure?", "Your money", "Your water", "Your time"] },
  "What comes from measuring it?": { answer: "Blessing", harder: ["Bukhari 2128: what comes from measuring your food?", "Health", "Fullness", "Wealth"] },
  "Planning and measuring well is part of the Sunnah.": { answer: "True", harder: "By Bukhari 2128, measuring your food brings blessing in it." },
  // Sahih al-Bukhari 2194.
  "When may fruit on trees be sold?": { answer: "When clearly good", harder: ["Bukhari 2194: he ﷺ forbade selling fruit until when?", "Until it is picked", "Until it is weighed", "Until the season ends"] },
  "Who was forbidden this early sale?": { answer: "Both seller and buyer", harder: ["Bukhari 2194: the early fruit sale was forbidden to whom?", "Only the seller", "Only the buyer", "No one"] },
  "This rule protects people from unfair losses.": { answer: "True", harder: "By Bukhari 2194, selling fruit before it is clearly good is forbidden to both seller and buyer." },
  // Sahih al-Bukhari 2175.
  "How must gold be swapped for gold?": { answer: "Equal in weight", harder: ["Bukhari 2175: silver for silver must be...?", "Double the weight", "Any amount", "Paid later"] },
  "Gold for silver may be traded...?": { answer: "As you like", harder: ["Bukhari 2175: gold for silver may be traded how?", "Never", "Only equal weight", "Only at night"] },
  "These rules guard against riba, unfair interest.": { answer: "True", harder: "By Bukhari 2175, gold for gold is sold only equal in weight." },
  // Sahih al-Bukhari 2102.
  "How was Abu Taybah paid?": { answer: "With a sa of dates", harder: ["Bukhari 2102: Abu Taybah did cupping. What was he paid?", "A dirham", "Bread", "A cloak"] },
  "What else did he ﷺ do for him?": { answer: "Asked to ease his tax", harder: ["Bukhari 2102: what did he ﷺ ask Abu Taybah's masters?", "To free him", "To pay him more", "To praise him"] },
  "Workers should be paid for their work.": { answer: "True", harder: "By Bukhari 2102, he ﷺ had Abu Taybah paid a sa of dates for cupping." },
  // Sahih al-Bukhari 5678.
  "What did Allah create along with every disease?": { answer: "Its cure", harder: ["Bukhari 5678: there is no disease Allah created except that He also created...?", "A reward", "A test", "A warning"] },
  "Seeing a doctor goes against trusting Allah.": { answer: "False", harder: "By Bukhari 5678, some diseases Allah created have no cure at all." },
  // Sahih al-Bukhari 5680.
  "Which drink did he ﷺ name for healing?": { answer: "Honey", harder: ["Bukhari 5680: healing is in three. Which drink?", "Milk", "Zamzam", "Date juice"] },
  "Which treatment did he ﷺ forbid his ummah?": { answer: "Branding with fire", harder: ["Bukhari 5680: healing is in three, but he ﷺ forbade which?", "Honey", "Cupping", "Black seed"] },
  "How many healing things are named?": { answer: "Three", harder: ["Bukhari 5680: how many healing things does it name?", "Two", "Four", "Five"] },
  // Sahih al-Bukhari 5688.
  "What seed did he ﷺ praise for healing?": { answer: "The black seed", harder: ["Bukhari 5688: which seed has healing for every disease?", "The date seed", "The olive seed", "The fig seed"] },
  "What can the black seed not cure?": { answer: "Death", harder: ["Bukhari 5688: the black seed heals every disease except...?", "Old age", "Fever", "Blindness"] },
  "The black seed is mentioned in Sahih al-Bukhari.": { answer: "True", harder: "By Bukhari 5688, the black seed has healing for every disease except death." },
  // Sahih al-Bukhari 5713.
  "What did he ﷺ tell Umm Qais to use for the throat?": { answer: "Indian incense", harder: ["Bukhari 5713: what did he ﷺ tell Umm Qais to use instead of pressing the throat?", "Honey", "Black seed", "Cupping"] },
  "How many diseases does the Indian incense cure, he ﷺ said?": { answer: "Seven", harder: ["Bukhari 5713: how many diseases does the Indian incense cure?", "Three", "Ten", "Forty"] },
  "He ﷺ did not want children hurt by harsh remedies.": { answer: "True", harder: "By Bukhari 5713, he ﷺ asked why mothers pain their children by pressing their throats." },
  // Sahih al-Bukhari 5690.
  "What food did Aishah recommend for the sick?": { answer: "Talbina", harder: ["Bukhari 5690: what did Aishah recommend for the sick?", "Honey", "Black seed", "Barley bread"] },
  "What did she say about its taste?": { answer: "Disliked, but beneficial", harder: ["Bukhari 5690: what did Aishah say about talbina?", "Too sweet", "Very tasty", "Harmful"] },
  "Some good medicine does not taste nice.": { answer: "True", harder: "By Bukhari 5690, the sick person dislikes talbina, yet it is good for him." },
  // Sahih al-Bukhari 5708.
  "Truffles are like...?": { answer: "Manna", harder: ["Bukhari 5708: truffles are like what?", "Dates", "Honey", "Rain"] },
  "What is their water good for?": { answer: "The eyes", harder: ["Bukhari 5708: truffle water is healing for what?", "The ears", "The skin", "The stomach"] },
  "Why are they like manna?": { answer: "They grow without planting", harder: ["Bukhari 5708 says truffles are like manna. Why?", "They are sweet", "They fly", "They are gold"] },
  // Sahih al-Bukhari 5725.
  "What should we cool a fever with?": { answer: "Water", harder: ["Bukhari 5725: fever is from the heat of Jahannam, so cool it with what?", "Ice", "Honey", "Wind"] },
  "Using water to cool a fever follows his advice ﷺ.": { answer: "True", harder: "By Bukhari 5725, fever is from the heat of Jahannam, so cool it with water." },
  // Sahih al-Bukhari 5739.
  "What did he ﷺ say had affected the girl?": { answer: "The evil eye", harder: ["Bukhari 5739: the girl had a dark mark on her face. What did he ﷺ say caused it?", "An illness", "A burn", "Magic"] },
  "What treatment did he ﷺ order?": { answer: "Ruqyah", harder: ["Bukhari 5739: what treatment did he ﷺ order for the girl?", "Cupping", "Honey", "Black seed"] },
  "Whose house was this in?": { answer: "Umm Salamah's", harder: ["Bukhari 5739: in whose house was the girl?", "Aishah's", "Hafsah's", "Zaynab's"] },
  // Sahih al-Bukhari 5754.
  "A black cat crosses your path. What fits Islam?": { answer: "Trust Allah, no bad omen", harder: ["Bukhari 5754 says there is no bad omen. A black cat crosses your path. What fits?", "Be afraid all day", "Go back home", "Cancel your plans"] },
  "What is fal?": { answer: "A good word you hear", harder: ["Bukhari 5754: no bad omen, and the best is fal. What is it?", "A lucky number", "A dream", "A sign in the sky"] },
  "Hoping for good is better than fearing bad omens.": { answer: "True", harder: "By Bukhari 5754, there is no bad omen, and the best is a good word you hear." },
  // Sahih al-Bukhari 5768.
  "Which dates are named?": { answer: "Ajwa dates", harder: ["Bukhari 5768: which dates protect from poison and magic?", "Sukkari dates", "Barni dates", "Any dates"] },
  "When should they be eaten?": { answer: "In the morning", harder: ["Bukhari 5768: when are the Ajwa dates eaten?", "At night", "At noon", "After Asr"] },
  "What do they protect from that day?": { answer: "Poison and magic", harder: ["Bukhari 5768: Ajwa in the morning protects from what until night?", "Hunger and thirst", "Illness and fever", "Fear and grief"] },
  // Sahih al-Bukhari 5771.
  "What should not be mixed with healthy animals?": { answer: "Sick animals", harder: ["Bukhari 5771: what should not be brought among healthy animals?", "Young animals", "Fat animals", "Clean animals"] },
  "Taking care to stop sickness spreading is good.": { answer: "True", harder: "By Bukhari 5771, sick animals should not be brought among healthy ones." },
  "Your class has a stomach bug going round. What fits?": { answer: "Wash hands and take care", harder: ["Bukhari 5771 keeps sick animals apart from healthy ones. A bug is going round class. What fits?", "Ignore it", "Hug the sick", "Share every cup"] },
  // Sahih Muslim 2202.
  "Where do you put your hand?": { answer: "Where it hurts", harder: ["Muslim 2202: Uthman complained of pain. Where should he put his hand?", "On his chest", "On his head", "On the ground"] },
  "How many times do you say Bismillah?": { answer: "Three", harder: ["Muslim 2202: how many times is Bismillah said?", "Seven", "Once", "Twice"] },
  "How many times is the refuge said?": { answer: "Seven", harder: ["Muslim 2202: how many times is 'I seek refuge in Allah and His power' said?", "Three", "Five", "Ten"] },
  // Sahih Muslim 2186.
  "Who recited ruqyah over him ﷺ?": { answer: "Jibril", harder: ["Muslim 2186: who came and recited ruqyah over him ﷺ when he was ill?", "Aishah", "Mikail", "Ali"] },
  "With whose name did the ruqyah begin?": { answer: "Allah's", harder: ["Muslim 2186: Jibril's ruqyah began in whose name?", "Jibril's", "The Prophet's ﷺ", "No one's"] },
  "The ruqyah asked Allah to heal him.": { answer: "True", harder: "By Muslim 2186, Jibril's ruqyah ended: may Allah heal you." },
  // Sahih Muslim 2200.
  "Which ruqyah is allowed?": { answer: "One with no shirk", harder: ["Muslim 2200: which ruqyah did he ﷺ say there is no harm in?", "Any old ruqyah", "Only Arabic spells", "Only written charms"] },
  "What did he ﷺ ask them to do first?": { answer: "Show him their ruqyah", harder: ["Muslim 2200: asked about pre-Islam ruqyahs, what did he ﷺ say first?", "Forget them all", "Write them down", "Say them louder"] },
  "Ruqyah may call on others besides Allah.": { answer: "False", harder: "By Muslim 2200, a ruqyah with shirk in it is fine to use." },
  // Sahih al-Bukhari 3655.
  "Whom did the companions count as the best?": { answer: "Abu Bakr", harder: ["Bukhari 3655: in the Prophet's ﷺ lifetime, whom did they rank first?", "Umar", "Uthman", "Ali"] },
  "Who came after Umar?": { answer: "Uthman", harder: ["Bukhari 3655: Abu Bakr, then Umar, then whom?", "Ali", "Talhah", "Az-Zubayr"] },
  "Who narrated this?": { answer: "Ibn Umar", harder: ["Bukhari 3655: who said they ranked Abu Bakr, then Umar, then Uthman?", "Ibn Abbas", "Ibn Mas'ud", "Jabir"] },
  // Sahih al-Bukhari 3714.
  "Whom did he ﷺ call a part of himself?": { answer: "Fatimah", harder: ["Bukhari 3714: 'whoever angers her angers me.' About whom?", "Umm Kulthum", "Ruqayyah", "Hafsah"] },
  "Angering Fatimah meant...?": { answer: "Angering him ﷺ", harder: ["Bukhari 3714: Fatimah is part of me, so angering her is...?", "Pleasing him", "A small joke", "Nothing"] },
  "Fatimah was the daughter of the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 3714, the Prophet ﷺ called his daughter Fatimah a part of him." },
  // Sahih al-Bukhari 3735.
  "Which two children did he ﷺ hold?": { answer: "Usamah and Al-Hasan", harder: ["Bukhari 3735: whom did he ﷺ take on his lap, saying 'O Allah, love them'?", "Al-Hasan and Al-Husayn", "Usamah and Zayd", "Anas and Usamah"] },
  "What did he ﷺ ask Allah for them?": { answer: "To love them", harder: ["Bukhari 3735: what did he ﷺ ask Allah for Usamah and Al-Hasan?", "To make them strong", "To make them leaders", "To give them long lives"] },
  "The Prophet ﷺ showed his love to children openly.": { answer: "True", harder: "By Bukhari 3735, he ﷺ asked Allah to love Usamah and Al-Hasan because he loved them." },
  // Sahih al-Bukhari 3750.
  "Whom did Abu Bakr carry?": { answer: "Al-Hasan", harder: ["Bukhari 3750: whom was Abu Bakr carrying?", "Al-Husayn", "Usamah", "Abdullah ibn Umar"] },
  "Whom did he say Al-Hasan looked like?": { answer: "The Prophet ﷺ", harder: ["Bukhari 3750: Abu Bakr said Al-Hasan looked like whom?", "Ali", "Abu Talib", "Hamzah"] },
  "How did Ali react?": { answer: "He laughed", harder: ["Bukhari 3750: Abu Bakr said Al-Hasan looked like the Prophet ﷺ, not Ali. What did Ali do?", "He was upset", "He left", "He cried"] },
  // Sahih al-Bukhari 3755.
  "Who had bought Bilal's freedom?": { answer: "Abu Bakr", harder: ["Bukhari 3755: Bilal said 'if you bought me for Allah, leave me.' To whom?", "Abu Jahl", "Uthman", "Umar"] },
  "What did Bilal want if freed for Allah?": { answer: "To work for Allah", harder: ["Bukhari 3755: if Abu Bakr bought Bilal for Allah, what did Bilal ask?", "To stay with Abu Bakr", "To go home", "To pay him back"] },
  "Abu Bakr spent his wealth to free believers.": { answer: "True", harder: "By Bukhari 3755, Bilal told Abu Bakr: if you bought me for Allah, leave me to work for Allah." },
  // Sahih al-Bukhari 3740.
  "Whom did he ﷺ call a righteous man?": { answer: "Abdullah ibn Umar", harder: ["Bukhari 3740: whom did he ﷺ call a righteous man, speaking to Hafsah?", "Umar", "Abdullah ibn Mas'ud", "Abdullah ibn Abbas"] },
  "To whom did he ﷺ say it?": { answer: "His sister Hafsah", harder: ["Bukhari 3740: to whom did he ﷺ say 'Abdullah is a righteous man'?", "Aishah", "Fatimah", "Umm Sulaym"] },
  "Abdullah ibn Umar was the son of Umar ibn al-Khattab.": { answer: "True", harder: "By Bukhari 3740, the Prophet ﷺ said to Hafsah that her brother Abdullah is a righteous man." },
  // Sahih Muslim 2455.
  "Why did he ﷺ visit Umm Sulaym?": { answer: "He felt compassion for her", harder: ["Muslim 2455: why did he ﷺ visit Umm Sulaym?", "Her son was ill", "She asked him", "Her husband died"] },
  "Umm Sulaym was the mother of...?": { answer: "Anas ibn Malik", harder: ["Muslim 2455: her brother died as a martyr with him ﷺ. Umm Sulaym was the mother of whom?", "Abu Hurayrah", "Jabir", "Zayd"] },
  "Caring for the families of martyrs is a Sunnah.": { answer: "True", harder: "By Muslim 2455, he ﷺ visited Umm Sulaym because her brother died as a martyr with him." },
  // Sahih Muslim 2456.
  "What did he ﷺ hear in Jannah?": { answer: "Footsteps", harder: ["Muslim 2456: in Paradise he ﷺ heard what?", "A voice reciting", "Birds singing", "The adhan"] },
  "Whose footsteps were they?": { answer: "Ghumaysa, Anas's mother", harder: ["Muslim 2456: whose footsteps did he ﷺ hear in Paradise?", "Umm Ayman", "Fatimah", "Aishah"] },
  "Ghumaysa and Umm Sulaym are the same woman.": { answer: "True", harder: "By Muslims 2455 and 2456, both Umm Sulaym and Ghumaysa bint Milhan are named as the mother of Anas." },
  // Sahih Muslim 2466a.
  "What shook at Sa'd's death?": { answer: "The Throne of Allah", harder: ["Muslim 2466a: what shook at the death of Sa'd ibn Mu'adh?", "Mount Uhud", "The masjid", "The earth of Madinah"] },
  "Which companion was this?": { answer: "Sa'd ibn Mu'adh", harder: ["Muslim 2466a: the Throne shook at the death of which Sa'd?", "Sa'd ibn Abi Waqqas", "Sa'id ibn Zayd", "Salman"] },
  "Sa'd ibn Mu'adh was greatly honoured by Allah.": { answer: "True", harder: "By Muslim 2466a, the Throne of the Most Merciful shook at the death of Sa'd ibn Mu'adh." },
  // Sahih Muslim 2475a.
  "How did he ﷺ always look at Jarir?": { answer: "With a smile", harder: ["Muslim 2475a: how did he ﷺ look at Jarir since he became Muslim?", "With silence", "With a nod", "With tears"] },
  "Did he ﷺ ever refuse to see Jarir?": { answer: "Never", harder: ["Muslim 2475a: since Jarir became Muslim, did he ﷺ ever refuse to see him?", "Once", "Twice", "On journeys"] },
  "Smiling at your brother is part of the Sunnah.": { answer: "True", harder: "By Muslim 2475a, the Prophet ﷺ never looked at Jarir except with a smile." },
  // Sahih Muslim 2500.
  "What did the Ash'aris do when food ran low?": { answer: "Pooled and shared equally", harder: ["Muslim 2500: when the Ash'aris ran short, how did they share?", "Each kept his own", "Gave to the leader", "Sold it"] },
  "What did he ﷺ say about them?": { answer: "They are from me", harder: ["Muslim 2500: what did he ﷺ say about the Ash'aris?", "They are the best", "They are poor", "They are guests"] },
  "Sharing food fairly in hard times is loved by the Prophet ﷺ.": { answer: "True", harder: "By Muslim 2500, the Ash'aris gathered all their food in one cloth and shared it equally." },
  // Sahih Muslim 2510.
  "What did he ﷺ call the Ansar?": { answer: "My family and trusted friends", harder: ["Muslim 2510: what did he ﷺ call the Ansar?", "My helpers in war", "My hosts", "My neighbours"] },
  "What should we do with their mistakes?": { answer: "Overlook them", harder: ["Muslim 2510: accept the good from the Ansar and do what with their mistakes?", "Punish them", "Laugh at them", "Spread them"] },
  "The Ansar welcomed the Prophet ﷺ in Madinah.": { answer: "True", harder: "By Muslim 2510, people will grow in number but the Ansar will become fewer." },
  // Sahih Muslim 2514a.
  "Which tribe did Allah forgive?": { answer: "Ghifar", harder: ["Muslim 2514a: which tribe did Allah forgive?", "Aslam", "Daws", "Juhaynah"] },
  "Which tribe was given safety?": { answer: "Aslam", harder: ["Muslim 2514a: Allah forgave Ghifar and gave safety to which tribe?", "Ghifar", "Juhaynah", "Muzaynah"] },
  "Who carried this good news to his people?": { answer: "Abu Dharr", harder: ["Muslim 2514a: who was told to take this news to his people?", "At-Tufayl", "Jarir", "Abu Musa"] },
  // Sahih Muslim 2524.
  "What did At-Tufayl ask for Daws?": { answer: "A curse on them", harder: ["Muslim 2524: Daws had refused. What did At-Tufayl ask?", "Guidance for them", "To fight them", "To leave them"] },
  "What did he ﷺ pray instead?": { answer: "O Allah, guide Daws", harder: ["Muslim 2524: what did the Prophet ﷺ pray for Daws?", "O Allah, punish Daws", "O Allah, forgive Daws", "O Allah, feed Daws"] },
  "Which famous companion came from Daws?": { answer: "Abu Hurairah", harder: ["Muslim 2524 is about Daws. Which famous companion was from Daws?", "Abu Dharr", "Salman", "Anas"] },
  // Sahih al-Bukhari 624.
  "When is this extra prayer?": { answer: "Between adhan and iqamah", harder: ["Bukhari 624: 'between the two calls' means between which?", "Fajr and Dhuhr", "Two adhans of Jumuah", "Sunset and night"] },
  "How many times did he ﷺ say it?": { answer: "Three", harder: ["Bukhari 624: how many times did he ﷺ say 'there is a prayer between the two calls'?", "Two", "Four", "Five"] },
  "This prayer is for whoever wants to pray it.": { answer: "True", harder: "By Bukhari 624, the prayer between the two calls is for whoever wants to pray." },
  // Sahih al-Bukhari 691.
  "In prayer, you should move...?": { answer: "After the imam", harder: ["Bukhari 691 warns whoever raises his head before the imam. So in prayer you move...?", "Before the imam", "Together with a quick start", "Whenever you like"] },
  "Which animal is named in the warning?": { answer: "A donkey", harder: ["Bukhari 691: whose head may his become like?", "A goat's", "A dog's", "A pig's"] },
  "Rushing ahead of the imam is fine.": { answer: "False", harder: "By Bukhari 691, raising your head before the imam carries no warning." },
  // Sahih al-Bukhari 707.
  "What made him ﷺ shorten the prayer?": { answer: "A child crying", harder: ["Bukhari 707: he ﷺ meant to pray long, then heard what?", "A knock", "Rain", "A camel"] },
  "Whom did he ﷺ not want to trouble?": { answer: "The mother", harder: ["Bukhari 707: he ﷺ shortened the prayer for a crying child. Whom did he not want to trouble?", "The imam", "The guard", "The traveler"] },
  "An imam should think of the people behind him.": { answer: "True", harder: "By Bukhari 707, he ﷺ shortened the prayer when he heard a child crying." },
  // Sahih al-Bukhari 742.
  "What must be done properly?": { answer: "Bowing and prostrations", harder: ["Bukhari 742: 'for I see you from behind me.' What must be done properly?", "Only the standing", "Only the sitting", "Only the takbir"] },
  "He ﷺ said he could see them from...?": { answer: "Behind him", harder: ["Bukhari 742: he ﷺ said he could see them from where?", "From the minbar", "From his house", "From the side"] },
  "Rushing through bowing is the right way.": { answer: "False", harder: "By Bukhari 742, it is fine to rush the bowing as long as you stand properly." },
  // Sahih al-Bukhari 751.
  "Who asked about looking around?": { answer: "Aishah", harder: ["Bukhari 751: who asked about looking around in prayer?", "Hafsah", "Umm Salamah", "Abu Hurayrah"] },
  "Looking around in prayer is like...?": { answer: "Shaytan stealing", harder: ["Bukhari 751: looking around in prayer is what?", "A small rest", "A break in wudu", "Forgiven"] },
  "We should keep our focus in prayer.": { answer: "True", harder: "By Bukhari 751, Shaytan steals part of the prayer when a person looks around." },
  // Sahih al-Bukhari 752.
  "What distracted him ﷺ?": { answer: "Marks on a cloth", harder: ["Bukhari 752: what distracted him ﷺ in prayer?", "Its colours", "Its smell", "Its weight"] },
  "What did he ﷺ ask for instead?": { answer: "A plain cloth", harder: ["Bukhari 752: 'take it back and bring me...' what?", "A thicker one", "A white one", "A wool one"] },
  "Pray where little distracts you.": { answer: "True", harder: "By Bukhari 752, he ﷺ sent back a marked cloth because its marks distracted him." },
  // Sahih al-Bukhari 801.
  "How long were the parts of his ﷺ prayer?": { answer: "About equal", harder: ["Bukhari 801: bowing, prostrations, standing after bowing and sitting between were...?", "Bowing longest", "Standing shortest", "Prostration twice as long"] },
  "The pause between prostrations should be skipped.": { answer: "False", harder: "By Bukhari 801, the sitting between prostrations was much shorter than the other parts." },
  // Sahih al-Bukhari 810.
  "On how many bones do we prostrate?": { answer: "Seven", harder: ["Bukhari 810: on how many bones were they ordered to prostrate?", "Five", "Six", "Eight"] },
  "What should we not tuck up?": { answer: "Clothes or hair", harder: ["Bukhari 810: in prostration, what should we not tuck up?", "Our sleeves only", "Our rug", "Our shoes"] },
  // Sahih al-Bukhari 822.
  "In sujud, your forearms should be...?": { answer: "Off the ground", harder: ["Bukhari 822: in sujud, where should your forearms be?", "Flat on the ground", "On your thighs", "Under your head"] },
  "Laying the forearms flat is compared to...?": { answer: "A dog", harder: ["Bukhari 822: laying the forearms flat is like which animal?", "A bird", "A camel", "A lion"] },
  "We should be straight in prostration.": { answer: "True", harder: "By Bukhari 822, we are told to be straight in prostration." },
  // Sahih al-Bukhari 836.
  "What was on his ﷺ forehead?": { answer: "Mud", harder: ["Bukhari 836: what did Abu Said see on his ﷺ forehead?", "Dust", "Water drops", "Sand"] },
  "He ﷺ prostrated in...?": { answer: "Mud and water", harder: ["Bukhari 836: he ﷺ prostrated in what?", "Sand and dust", "Rain on stone", "Grass and dew"] },
  "He ﷺ skipped sujud because of the mud.": { answer: "False", harder: "By Bukhari 836, he ﷺ prostrated on a dry mat to avoid the mud." },
  // Sahih al-Bukhari 845.
  "What did he ﷺ do after leading prayer?": { answer: "Faced the people", harder: ["Bukhari 845: when he ﷺ finished the prayer, what did he do?", "Stayed facing the qiblah", "Went home", "Prayed again"] },
  "He ﷺ turned to the people after he finished.": { answer: "True", harder: "By Bukhari 845, Samurah said he ﷺ turned to face the people after the prayer." },
  // Sahih al-Bukhari 889.
  "What did he ﷺ do on waking at night?": { answer: "Cleaned his mouth", harder: ["Bukhari 889: what did he ﷺ do on getting up at night to pray?", "Washed his feet", "Drank water", "Made dua first"] },
  "Cleanliness is part of getting ready to pray.": { answer: "True", harder: "By Bukhari 889, he ﷺ cleaned his mouth when he got up at night to pray." },
  // Sahih al-Bukhari 898.
  "At least how often should a Muslim bathe?": { answer: "Once in seven days", harder: ["Bukhari 898: Allah's right on every Muslim is to bathe at least once in how many days?", "Three days", "Ten days", "Thirty days"] },
  "Whose right is this bath?": { answer: "Allah's right", harder: ["Bukhari 898: bathing once in seven days is whose right on every Muslim?", "The family's", "The masjid's", "The imam's"] },
  "Islam cares about keeping clean.": { answer: "True", harder: "By Bukhari 898, bathing at least once in seven days is Allah's right on every Muslim." },
  // Sahih al-Bukhari 1909.
  "What starts the Ramadan fast?": { answer: "Seeing the crescent", harder: ["Bukhari 1909: start fasting when you see what?", "The full moon", "The first star", "The dawn light"] },
  "If the sky is cloudy, Sha'ban is counted as...?": { answer: "Thirty days", harder: ["Bukhari 1909: if cloudy, complete how many days of Sha'ban?", "Twenty-nine", "Thirty-one", "Twenty-eight"] },
  "Seeing the crescent also ends Ramadan.": { answer: "True", harder: "By Bukhari 1909, you stop fasting when you see the crescent." },
  // Sahih al-Bukhari 1913.
  "How long can a lunar month be?": { answer: "29 or 30 days", harder: ["Bukhari 1913: 'the month is like this and this.' How many days?", "Always 30", "Always 29", "28 to 31"] },
  "Ramadan always has exactly 30 days.": { answer: "False", harder: "By Bukhari 1913, a month is always exactly 30 days." },
  // Sahih al-Bukhari 1914.
  "What should we not do just before Ramadan?": { answer: "Fast a day or two", harder: ["Bukhari 1914: what should none of you do just before Ramadan?", "Eat a big meal", "Travel", "Sleep early"] },
  "Who may still fast that day?": { answer: "One with that habit", harder: ["Bukhari 1914: who may still fast a day before Ramadan?", "Only the old", "Only the sick", "Anyone who wants"] },
  "Someone who always fasts Mondays may fast that Monday.": { answer: "True", harder: "By Bukhari 1914, one who usually keeps a fast may still fast it just before Ramadan." },
  // Sahih al-Bukhari 1918.
  "Whose adhan meant it was dawn?": { answer: "Ibn Umm Maktum", harder: ["Bukhari 1918: eat and drink until whose call?", "Bilal's", "Abu Mahdhurah's", "Sa'd's"] },
  "When did Bilal give his adhan?": { answer: "At night", harder: ["Bukhari 1918: Bilal's adhan came when?", "At dawn", "After Fajr", "At midnight only"] },
  "Suhur may be eaten until dawn comes.": { answer: "True", harder: "By Bukhari 1918, Ibn Umm Maktum called the adhan at dawn." },
  // Sahih al-Bukhari 1920.
  "With whom did Sahl eat suhur?": { answer: "His family", harder: ["Bukhari 1920: Sahl ate suhur with whom?", "The Prophet ﷺ", "His friends", "His neighbours"] },
  "What did he hurry to after suhur?": { answer: "The Fajr prayer", harder: ["Bukhari 1920: after suhur, Sahl hurried to pray what?", "Tahajjud", "Witr", "Duha"] },
  "Suhur was eaten close to Fajr time.": { answer: "True", harder: "By Bukhari 1920, Sahl ate suhur with his family and then hurried to pray Fajr." },
  // Sahih al-Bukhari 1947.
  "On journeys, did they blame each other about fasting?": { answer: "No, never", harder: ["Bukhari 1947: travelling with him ﷺ, did the fasting blame those not fasting?", "Yes, gently", "Only the elders", "Only in Ramadan"] },
  "A traveler may choose to fast or not, and is not blamed.": { answer: "True", harder: "By Bukhari 1947, on journeys the fasting and the non-fasting did not blame each other." },
  // Sahih al-Bukhari 1962.
  "What is al-wisal?": { answer: "Fasting nonstop with no iftar", harder: ["Bukhari 1962: what is al-wisal, which he ﷺ forbade?", "Fasting only Mondays", "Fasting while travelling", "Eating suhur late"] },
  "Why could he ﷺ do it?": { answer: "Allah fed him", harder: ["Bukhari 1962: 'I am not like you.' Why could he ﷺ do wisal?", "He had more strength", "He was older", "He slept more"] },
  "We are told to join fasts with no food between.": { answer: "False", harder: "By Bukhari 1962, al-wisal is allowed for all of us." },
  // Sahih al-Bukhari 1981.
  "How many days a month did he ﷺ advise fasting?": { answer: "Three", harder: ["Bukhari 1981: how many fast days a month did his friend ﷺ advise Abu Hurayrah?", "Two", "Five", "Seven"] },
  "When should witr be prayed, in this advice?": { answer: "Before sleeping", harder: ["Bukhari 1981: when was witr to be prayed?", "After Fajr", "At midnight", "After Maghrib"] },
  "The advice also had two rakahs of Duha.": { answer: "True", harder: "By Bukhari 1981, the advice was three fasts a month, two rakahs of Duha and witr before sleeping." },
  // Sahih al-Bukhari 1984.
  "Which day should not be fasted alone?": { answer: "Friday", harder: ["Bukhari 1984: Jabir was asked about fasting which day alone?", "Saturday", "Monday", "Thursday"] },
  "Who answered the question?": { answer: "Jabir", harder: ["Bukhari 1984: who said yes, he ﷺ forbade fasting Friday alone?", "Abu Hurayrah", "Ibn Umar", "Anas"] },
  "The warning is about fasting Friday on its own.": { answer: "True", harder: "By Bukhari 1984, Jabir said the Prophet ﷺ forbade fasting on Friday by itself." },
  // Sahih al-Bukhari 1989.
  "What did Maymunah send him ﷺ?": { answer: "Milk", harder: ["Bukhari 1989: what did Maymunah send him ﷺ at Arafah?", "Water", "Dates", "Honey"] },
  "Why did people wonder?": { answer: "If he was fasting", harder: ["Bukhari 1989: what were the people unsure about at Arafah?", "If it would rain", "If he was ill", "If he would leave"] },
  "He ﷺ drank it while people watched.": { answer: "True", harder: "By Bukhari 1989, he ﷺ drank the milk while the people watched." },
  // Sahih al-Bukhari 2001.
  "After Ramadan was made a duty, Ashura became...?": { answer: "Optional", harder: ["Bukhari 2001: once Ramadan was a duty, fasting Ashura became what?", "Still a duty", "Forbidden", "Only for Makkah"] },
  "Which day is Ashura?": { answer: "10th of Muharram", harder: ["Ashura, in Bukhari 2001, falls on which day?", "9th of Muharram", "1st of Muharram", "10th of Rajab"] },
  "Ashura was fasted before Ramadan was a duty.": { answer: "True", harder: "By Bukhari 2001, he ﷺ ordered fasting Ashura before Ramadan was made a duty." },
  // Sahih al-Bukhari 2006.
  "Which day did he ﷺ seek most to fast?": { answer: "Ashura", harder: ["Bukhari 2006: which day did Ibn Abbas see him ﷺ seek to fast most?", "Arafah", "Monday", "15th of Sha'ban"] },
  "Which month, too?": { answer: "Ramadan", harder: ["Bukhari 2006: Ashura and which month did he ﷺ seek most?", "Sha'ban", "Muharram", "Dhul-Hijjah"] },
  // Sahih al-Bukhari 1426.
  "Whom should you give to first?": { answer: "Your dependents", harder: ["Bukhari 1426: start your charity with whom?", "Neighbours", "The masjid", "Travellers"] },
  "The best charity comes from one who is...?": { answer: "Still well off", harder: ["Bukhari 1426: the best charity is given by one who is...?", "Very rich", "Poor", "Famous"] },
  "Spending on your family is part of charity.": { answer: "True", harder: "By Bukhari 1426, the best charity starts with those you support." },
  // Sahih al-Bukhari 1459.
  "Is zakat due on fewer than five camels?": { answer: "No", harder: ["Bukhari 1459: no zakat on less than how many camels?", "Three", "Ten", "Forty"] },
  "Which of these has a zakat limit in this hadith?": { answer: "Dates", harder: ["Bukhari 1459: five wasqs of what?", "Wheat", "Barley", "Raisins"] },
  "Silver also has a limit for zakat.": { answer: "True", harder: "By Bukhari 1459, no zakat is due on less than five uqiyahs of silver." },
  // Sahih al-Bukhari 1495.
  "Who first got the meat as charity?": { answer: "Barirah", harder: ["Bukhari 1495: meat was given as charity to whom?", "Umm Ayman", "Hafsah", "Maymunah"] },
  "For the Prophet ﷺ the meat was...?": { answer: "A gift", harder: ["Bukhari 1495: charity for Barirah, and for the Prophet ﷺ it was...?", "Charity too", "Sadaqah to refuse", "Payment"] },
  "Charity changes into a gift once the poor person gives it on.": { answer: "True", harder: "By Bukhari 1495, meat given to Barirah as charity was a gift when she passed it to the Prophet ﷺ." },
  // Sahih Muslim 981.
  "Crops watered by rain give...?": { answer: "A tenth", harder: ["Muslim 981: crops watered by rivers or rain give what share?", "A twentieth", "A fifth", "A fortieth"] },
  "Crops watered with camel work give...?": { answer: "A twentieth", harder: ["Muslim 981: crops watered by camels give what share?", "A fifth", "A fortieth", "A half"] },
  "Hard work to water lowers the zakat share.": { answer: "True", harder: "By Muslim 981, crops watered by camels give a twentieth, half the share of rain-fed crops." },
  // Sahih Muslim 1041.
  "Begging to grow rich is like asking for...?": { answer: "Live coals", harder: ["Muslim 1041: whoever begs to increase his wealth is only asking for what?", "Shame", "Poverty", "Debt"] },
  "Begging for more when you have enough is good.": { answer: "False", harder: "By Muslim 1041, begging to increase your wealth is asking for live coals." },
  // Sahih Muslim 1069a.
  "What did Al-Hasan put in his mouth?": { answer: "A charity date", harder: ["Muslim 1069a: what did Al-Hasan put in his mouth?", "A gift date", "A fig", "A coin of zakat"] },
  "Why did he ﷺ stop him?": { answer: "His family eats no sadaqah", harder: ["Muslim 1069a: 'throw it out; do you not know that...' what?", "Dates are for Ramadan", "It is not ripe", "It was stolen"] },
  "The family of the Prophet ﷺ does not take sadaqah.": { answer: "True", harder: "By Muslim 1069a, he ﷺ said: we do not eat charity." },
  // Sahih Muslim 1071a.
  "Where did he ﷺ find the date?": { answer: "In the street", harder: ["Muslim 1071a: where did he ﷺ find a date?", "In the masjid", "On his bed", "At the market"] },
  "Why didn't he ﷺ eat it?": { answer: "It might be charity", harder: ["Muslim 1071a: why didn't he ﷺ eat the street date?", "It was dirty", "It was someone's lunch", "He was fasting"] },
  "Being careful with doubtful things is from the Sunnah.": { answer: "True", harder: "By Muslim 1071a, he ﷺ left a street date because it might have been charity." },
  // Sahih Muslim 1055.
  "What did he ﷺ ask for his family?": { answer: "Just enough to live", harder: ["Muslim 1055: what did he ﷺ ask for the provision of his family?", "Nothing at all", "Great riches", "Palaces"] },
  "He ﷺ loved a simple life for his family.": { answer: "True", harder: "By Muslim 1055, he ﷺ asked that his family's provision be just enough to live on." },
  // Sahih al-Bukhari 5073.
  "What did Uthman ibn Maz'un want to give up?": { answer: "Marriage", harder: ["Bukhari 5073: what did Uthman ibn Maz'un want to stay away from for worship?", "Food", "Sleep", "Wealth"] },
  "What did the Prophet ﷺ say to his wish?": { answer: "He forbade it", harder: ["Bukhari 5073: Uthman ibn Maz'un wanted to give up marriage. What did he ﷺ do?", "He allowed it", "He delayed it", "He asked others"] },
  "Leaving marriage forever is a better way to worship.": { answer: "False", harder: "By Bukhari 5073, the Prophet ﷺ allowed Uthman ibn Maz'un to stay away from marriage." },
  // Sahih al-Bukhari 5136.
  "What is needed before a girl is married?": { answer: "Her permission", harder: ["Bukhari 5136: a young girl is not married until what?", "Her mother agrees", "Her brother agrees", "The judge agrees"] },
  "How may a shy girl show her yes?": { answer: "By staying silent", harder: ["Bukhari 5136: how is a shy girl's permission shown?", "By nodding only", "By signing", "By her father"] },
  "A woman married before must be consulted too.": { answer: "True", harder: "By Bukhari 5136, a woman married before is not married again until she is consulted." },
  // Sahih al-Bukhari 5138.
  "What did Khansa feel about her marriage?": { answer: "She disliked it", harder: ["Bukhari 5138: Khansa's father married her off. How did she feel?", "She chose it", "She loved it", "She did not know"] },
  "What did the Prophet ﷺ do?": { answer: "Declared it invalid", harder: ["Bukhari 5138: Khansa went to the Prophet ﷺ. What did he do?", "Told her to be patient", "Sent her to her father", "Asked her husband"] },
  "A father may force his grown daughter into a marriage she refuses.": { answer: "False", harder: "By Bukhari 5138, the Prophet ﷺ kept Khansa's forced marriage in place." },
  // Sahih al-Bukhari 5112.
  "What is shighar?": { answer: "Swapping daughters with no mahr", harder: ["Bukhari 5112: what is shighar?", "A mahr paid late", "Marrying in secret", "A second wedding"] },
  "What did the Prophet ﷺ say about it?": { answer: "He forbade it", harder: ["Bukhari 5112: two men swap daughters in marriage with no mahr. What did he ﷺ say?", "He ordered it", "He praised it", "He made it a sunnah"] },
  "Each bride has a right to her own mahr.": { answer: "True", harder: "By Bukhari 5112, shighar is forbidden because neither bride gets a mahr." },
  // Sahih al-Bukhari 5144.
  "What must you not do?": { answer: "Propose over your brother", harder: ["Bukhari 5144: what must you not do?", "Propose in public", "Propose twice", "Ask her father"] },
  "When may you propose instead?": { answer: "When the first suitor leaves", harder: ["Bukhari 5144: wait until the first man does what?", "Pays the mahr", "Meets her family", "Prays istikharah"] },
  "The same hadith warns against spying and suspicion.": { answer: "True", harder: "By Bukhari 5144, wait until the first suitor marries her or leaves her." },
  // Sahih al-Bukhari 5168.
  "What was the meal for Zainab's wedding?": { answer: "One sheep", harder: ["Bukhari 5168: the best wedding meal he ﷺ gave, for Zainab, was what?", "Two sheep", "A camel", "Bread and dates"] },
  "What is the wedding meal called?": { answer: "Walimah", harder: ["Bukhari 5168 is about a wedding meal. What is it called?", "Iftar", "Suhur", "Aqiqah"] },
  "A wedding meal must be very costly.": { answer: "False", harder: "By Bukhari 5168, his ﷺ best wedding meal was a hundred sheep." },
  // Sahih al-Bukhari 5173.
  "What should you do with a wedding invite?": { answer: "Accept and go", harder: ["Bukhari 5173: invited to a wedding meal, what should you do?", "Go only if close", "Send a gift instead", "Go if it is big"] },
  "Going to a wedding meal you are invited to is from the Sunnah.": { answer: "True", harder: "By Bukhari 5173, one invited to a wedding meal should go." },
  // Sahih al-Bukhari 5177.
  "Which wedding food is the worst?": { answer: "One that leaves out the poor", harder: ["Bukhari 5177: the worst food is a wedding meal where who is left out?", "The neighbours", "The children", "The elders"] },
  "What about refusing an invitation without reason?": { answer: "It is disobeying Allah and His Messenger ﷺ", harder: ["Bukhari 5177: refusing a wedding invite without reason is what?", "It does not matter", "It is better", "It is a sunnah"] },
  "A good wedding meal welcomes the poor as well.": { answer: "True", harder: "By Bukhari 5177, a wedding meal for the rich alone, with the poor left out, is the worst food." },
  // Sahih al-Bukhari 5180.
  "How did he ﷺ react to the wedding guests?": { answer: "He stood up happily", harder: ["Bukhari 5180: women and children came back from a wedding. What did he ﷺ do?", "He sat silently", "He walked away", "He sent them home"] },
  "Who were the guests from?": { answer: "The Ansar", harder: ["Bukhari 5180: 'you are among the most beloved people to me.' To whom?", "The Muhajirun", "Banu Hashim", "The Thaqif"] },
  "A wedding is a happy time in Islam.": { answer: "True", harder: "By Bukhari 5180, he ﷺ stood up happily when the guests came back from a wedding." },
  // Sahih al-Bukhari 5238.
  "If a wife asks to go to the masjid, the husband should...?": { answer: "Not forbid her", harder: ["Bukhari 5238: a wife asks permission to go to the masjid. What should he do?", "Go instead of her", "Make her wait", "Ask her father"] },
  "Women came to the masjid in the Prophet's ﷺ time.": { answer: "True", harder: "By Bukhari 5238, a husband should not forbid his wife from going to the masjid." },
  // Sahih al-Bukhari 5244.
  "After a long trip, when should you not arrive home?": { answer: "At night", harder: ["Bukhari 5244: away a long time, when should he not come back to his family?", "At Fajr", "At Dhuhr", "At Asr"] },
  "Why is this good manners?": { answer: "It lets the family get ready", harder: ["Bukhari 5244: don't come home at night after a long trip. Why is it good manners?", "It is shorter", "It saves money", "It is cooler"] },
  "This is about a long time away from home.": { answer: "True", harder: "By Bukhari 5244, the rule is for one who has been away from home a long time." },
  // Sahih Muslim 1444b.
  "Nursing makes unlawful the same as...?": { answer: "Birth", harder: ["Muslim 1444b: what becomes unlawful through breastfeeding is the same as through what?", "Marriage", "Wealth", "Friendship"] },
  "A boy nursed by a woman cannot marry her daughter because...?": { answer: "They are milk siblings", harder: ["Muslim 1444b: a boy nursed by a woman cannot marry her daughter. Why?", "They are neighbours", "They are rich", "They are young"] },
  "A milk brother is like a real brother for marriage rules.": { answer: "True", harder: "By Muslim 1444b, what becomes unlawful through birth also becomes unlawful through nursing." },
  // Sahih al-Bukhari 619.
  "How many rak'ahs did he ﷺ pray before Fajr?": { answer: "Two", harder: ["Bukhari 619: how many rak'ahs between Fajr's adhan and iqamah?", "One", "Three", "Four"] },
  "Were those two rak'ahs long or short?": { answer: "Short and light", harder: ["Bukhari 619: how were the two rak'ahs before Fajr?", "Long", "Loud", "In the masjid only"] },
  "These two rak'ahs come before the Fajr fard prayer.": { answer: "True", harder: "By Bukhari 619, the two light rak'ahs came between the adhan and iqamah of Fajr." },
  // Sahih al-Bukhari 630.
  "What should two travellers do at prayer time?": { answer: "Give adhan and iqamah", harder: ["Bukhari 630: two men are travelling. What should they do at prayer time?", "Only the iqamah", "Join another group", "Pray at home later"] },
  "Who leads them?": { answer: "The older one", harder: ["Bukhari 630: who should lead the two travellers?", "The one who knows more", "The younger", "Either one"] },
  "The adhan is only for big masjids.": { answer: "False", harder: "By Bukhari 630, even two travellers give the adhan and the iqamah." },
  // Sahih al-Bukhari 638.
  "How should we get up for the prayer?": { answer: "Calmly", harder: ["Bukhari 638: when the iqamah is called, stand how?", "Quickly", "Before he comes", "Loudly"] },
  "When did they stand?": { answer: "When they saw him ﷺ", harder: ["Bukhari 638: 'do not stand until...' what?", "The adhan ends", "The rows fill", "The imam speaks"] },
  "Calmness is part of the manners of prayer.": { answer: "True", harder: "By Bukhari 638, when the iqamah is called, stand calmly." },
  // Sahih al-Bukhari 672.
  "If supper is served at Maghrib, what first?": { answer: "Eat the supper", harder: ["Bukhari 672: supper is served at Maghrib time. What first?", "Pray, then eat", "Pray quickly", "Eat after Isha"] },
  "Why does this help the prayer?": { answer: "The mind is not on food", harder: ["Bukhari 672: eat first, then pray Maghrib. How does it help?", "It is cheaper", "It makes it longer", "It makes it louder"] },
  "He ﷺ said not to rush finishing the meal.": { answer: "True", harder: "By Bukhari 672, if supper is served, start eating before Maghrib and do not hurry it." },
  // Sahih al-Bukhari 693.
  "Whom did he ﷺ tell us to obey?": { answer: "The appointed leader", harder: ["Bukhari 693: whom did he ﷺ tell us to listen to and obey?", "Only the eldest", "Only one we like", "Only our tribe"] },
  "What does the leader's look have to do with it?": { answer: "Nothing, obey anyway", harder: ["Bukhari 693: 'whose head is like a raisin.' What does it teach?", "Only the tall", "Only the old", "Obey only the handsome"] },
  "Race and looks do not make a Muslim better.": { answer: "True", harder: "By Bukhari 693, obey even an Ethiopian whose head is like a raisin if he is made your leader." },
  // Sahih al-Bukhari 694.
  "If the imam makes a mistake, who loses?": { answer: "Only the imam", harder: ["Bukhari 694: the imam errs. Who carries the sin?", "The people", "Both", "The first row"] },
  "If the imam prays well, who is rewarded?": { answer: "The imam and the people", harder: ["Bukhari 694: the imam leads well. Who gets reward?", "Only the imam", "Only the people", "No one"] },
  "An imam carries a big trust.": { answer: "True", harder: "By Bukhari 694, if the imam errs, the people still get their reward and the sin is his." },
  // Sahih al-Bukhari 699.
  "Where should one follower stand?": { answer: "On the imam's right", harder: ["Bukhari 699: Ibn Abbas stood on the left. Where did he ﷺ move him?", "Behind him", "In front", "Further left"] },
  "Ibn Abbas was a boy who prayed the night prayer with him ﷺ.": { answer: "True", harder: "By Bukhari 699, he ﷺ moved young Ibn Abbas by the head from his left to his right." },
  // Sahih al-Bukhari 719.
  "What did he ﷺ say about the rows?": { answer: "Straight and close", harder: ["Bukhari 719: what did he ﷺ say about the rows?", "Make them long", "Women first", "One row only"] },
  "When did he ﷺ say it?": { answer: "When the iqamah was called", harder: ["Bukhari 719: when did he ﷺ face the people about the rows?", "After the prayer", "At the khutbah", "At night"] },
  "Leaving gaps in the rows is the Sunnah.": { answer: "False", harder: "By Bukhari 719, he ﷺ told the people to leave space in the rows." },
  // Sahih al-Bukhari 740.
  "Which hand goes on top in prayer?": { answer: "The right", harder: ["Bukhari 740: which hand goes on the other forearm in prayer?", "The left on the right", "Neither", "Both at the sides"] },
  "Where does the right hand rest?": { answer: "On the left forearm", harder: ["Bukhari 740: the right hand is placed on what?", "The left hand's back", "The chest", "The right thigh"] },
  "This order came from the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 740, Sahl said placing the right hand on the left forearm was an order from the Prophet ﷺ." },
  // Sahih al-Bukhari 791.
  "What was the man doing wrong?": { answer: "Rushing bowing and sujud", harder: ["Bukhari 791: what did Hudhayfah see the man doing?", "Looking around", "Praying alone", "Praying fast in Ramadan"] },
  "What did Hudhayfah tell him?": { answer: "You have not prayed", harder: ["Bukhari 791: Hudhayfah said to the man who did not complete bowing and sujud...?", "Your prayer is short", "Repeat the last part", "Pray at home"] },
  "A prayer rushed like pecking is still complete.": { answer: "False", harder: "By Bukhari 791, a prayer without full bowing and prostration is still a complete prayer." },
  // Sahih al-Bukhari 847.
  "What is waiting for the prayer counted as?": { answer: "Being in prayer", harder: ["Bukhari 847: what is waiting for the prayer counted as?", "Sleeping", "Nothing", "Wasted time"] },
  "Which prayer did he ﷺ delay that night?": { answer: "Isha", harder: ["Bukhari 847: which prayer did he ﷺ delay until midnight?", "Maghrib", "Witr", "Tahajjud"] },
  "Sitting in the masjid waiting for salah earns reward.": { answer: "True", harder: "By Bukhari 847, those waiting for the prayer were counted as in prayer." },
  // Sahih al-Bukhari 853.
  "Which plant did he ﷺ name?": { answer: "Garlic", harder: ["Bukhari 853: at Khaybar, which plant did he ﷺ name?", "Onion", "Leek", "Radish"] },
  "Why stay away after eating it?": { answer: "Its smell bothers others", harder: ["Bukhari 853: whoever ate garlic should not enter our masjid. Why?", "It is haram to eat", "It breaks wudu", "It is costly"] },
  // Sahih al-Bukhari 1238.
  "Who enters Paradise, by this hadith?": { answer: "One who dies on tawhid", harder: ["Bukhari 1238: Ibn Mas'ud said who enters Paradise?", "Whoever prays the most", "Whoever is born Muslim", "Whoever gives most"] },
  "What leads to the Fire at death?": { answer: "Worshipping others with Allah", harder: ["Bukhari 1238: dying in which state leads to the Fire?", "Dying with debts", "Dying alone", "Dying in sin"] },
  "The state we die in is what counts.": { answer: "True", harder: "By Bukhari 1238, whoever dies worshipping others with Allah enters the Fire." },
  // Sahih al-Bukhari 1252.
  "What did he ﷺ tell the crying woman?": { answer: "Fear Allah and be patient", harder: ["Bukhari 1252: what did he ﷺ say to the woman weeping by the grave?", "Cry quietly", "Leave the grave", "Make dua"] },
  "Where was the woman sitting?": { answer: "Beside a grave", harder: ["Bukhari 1252: where was the woman weeping?", "Outside her home", "At the masjid", "On the road"] },
  "Patience is asked of us when we lose someone.": { answer: "True", harder: "By Bukhari 1252, he ﷺ told the woman by the grave: fear Allah and be patient." },
  // Sahih al-Bukhari 1248.
  "What does Allah give such a parent?": { answer: "Paradise", harder: ["Bukhari 1248: a Muslim whose three children die before puberty is given what?", "Forgiveness for a year", "More children", "Ease in this life"] },
  "Why is it given?": { answer: "Allah's mercy for the children", harder: ["Bukhari 1248: Allah gives the parent Paradise out of His mercy for whom?", "For the parent", "For the family", "For the poor"] },
  "Losing a child is never forgotten by Allah.": { answer: "True", harder: "By Bukhari 1248, a parent whose three children die young is given Paradise by Allah's mercy." },
  // Sahih al-Bukhari 1294.
  "Which is NOT allowed in grief?": { answer: "Tearing your clothes", harder: ["Bukhari 1294: which of these is NOT allowed in grief?", "Making dua", "Saying inna lillah", "Quiet tears"] },
  "Such acts come from...?": { answer: "The Days of Ignorance", harder: ["Bukhari 1294: slapping cheeks and tearing clothes follows the ways of...?", "The Persians", "The Romans", "The hypocrites"] },
  "Crying quietly at a death is forbidden.": { answer: "False", harder: "By Bukhari 1294, slapping cheeks and tearing clothes are not from us." },
  // Sahih al-Bukhari 1255.
  "Which side is washed first?": { answer: "The right", harder: ["Bukhari 1255: washing his ﷺ daughter, which side first?", "The head", "Both together", "The front"] },
  "Which parts come first?": { answer: "The wudu parts", harder: ["Bukhari 1255: start with the right side and which parts?", "The hands only", "The feet only", "The hair"] },
  "Umm Atiyyah helped wash his ﷺ daughter.": { answer: "True", harder: "By Bukhari 1255, he ﷺ told the women washing his daughter to start with the right side." },
  // Sahih al-Bukhari 1264.
  "How many sheets was he ﷺ shrouded in?": { answer: "Three", harder: ["Bukhari 1264: how many sheets was he ﷺ shrouded in?", "Two", "Five", "Four"] },
  "What colour were they?": { answer: "White", harder: ["Bukhari 1264: the sheets were white cotton from where?", "Egypt", "Syria", "Madinah"] },
  "His ﷺ shroud had a shirt and a turban.": { answer: "False", harder: "By Bukhari 1264, his ﷺ shroud was three white sheets with no shirt or turban." },
  // Sahih al-Bukhari 1315.
  "What should we do with the funeral?": { answer: "Hurry with it", harder: ["Bukhari 1315: what did he ﷺ say about the body?", "Wait for the family", "Wash it three times", "Bury it at night"] },
  "If the person was righteous, you send them to...?": { answer: "Good", harder: ["Bukhari 1315: if the person was righteous, you send them to what?", "Rest", "Their family", "The grave only"] },
  "Delaying burial for no need is the Sunnah.": { answer: "False", harder: "By Bukhari 1315, we should hurry with the body." },
  // Sahih Muslim 948.
  "How many believers are named in the hadith?": { answer: "Forty", harder: ["Muslim 948: how many men praying over him are accepted as intercessors?", "Seven", "Twenty", "Seventy"] },
  "What does Allah do with their prayer?": { answer: "Accepts them as intercessors", harder: ["Muslim 948: forty who associate nothing with Allah pray over him. What then?", "Rejects it", "Ignores it", "Delays it"] },
  "Ibn Abbas waited for forty people for his son's funeral.": { answer: "True", harder: "By Muslim 948, forty men who associate nothing with Allah are accepted as intercessors." },
  // Sahih Muslim 920a.
  "Why say only good when someone dies?": { answer: "Angels say amin to it", harder: ["Muslim 920a: why tell the family to say only good?", "Abu Salamah could hear", "Guests were near", "It was Friday"] },
  "What did he ﷺ ask for Abu Salamah's grave?": { answer: "Space and light", harder: ["Muslim 920a: what did he ﷺ ask for Abu Salamah's grave?", "Shade and water", "Peace and quiet", "Flowers and light"] },
  "He ﷺ closed Abu Salamah's eyes.": { answer: "True", harder: "By Muslim 920a, he ﷺ closed Abu Salamah's eyes and prayed for his forgiveness." },
  // Sahih al-Bukhari 1346.
  "How were the martyrs of Uhud buried?": { answer: "With their blood", harder: ["Bukhari 1346: on the day of Uhud, how were the martyrs buried?", "Washed and shrouded", "In white sheets", "In the city"] },
  "Were they washed?": { answer: "No", harder: ["Bukhari 1346: were the martyrs of Uhud washed?", "Yes, once", "Only their faces", "Yes, with water and lote"] },
  "This was after the Battle of Uhud.": { answer: "True", harder: "By Bukhari 1346, the martyrs of Uhud were buried with their blood and not washed." },
  // Sahih al-Bukhari 1382.
  "Who was Ibrahim here?": { answer: "The Prophet's ﷺ son", harder: ["Bukhari 1382: who was Ibrahim?", "His grandson", "His nephew", "His foster son"] },
  "What did he ﷺ say Ibrahim has?": { answer: "A nurse in Paradise", harder: ["Bukhari 1382: what did he ﷺ say Ibrahim has in Paradise?", "A garden", "A house", "A river"] },
  "Young children who die are in Allah's care.": { answer: "True", harder: "By Bukhari 1382, there is a wet-nurse for little Ibrahim in Paradise." },
  // Sahih Muslim 972a.
  "What must we not do on graves?": { answer: "Sit on them", harder: ["Muslim 972a: what must we not do on graves?", "Walk near them", "Visit them", "Pray for them"] },
  "What else is forbidden?": { answer: "Praying facing graves", harder: ["Muslim 972a: do not sit on graves and do not do what?", "Plant on them", "Stand near them", "Read Quran there"] },
  "This keeps worship for Allah alone.": { answer: "True", harder: "By Muslim 972a, do not sit on graves and do not pray facing them." },
  // Sahih Muslim 975.
  "What do we say at a graveyard?": { answer: "Peace be upon you", harder: ["Muslim 975: what does the graveyard greeting start with?", "O people of the graves", "Rest in peace", "May Allah forgive us"] },
  "What do we ask Allah for?": { answer: "Safety for us and them", harder: ["Muslim 975: at the graves, we ask Allah for what?", "Mercy for them only", "A long life for us", "Light for the graves"] },
  "The dua reminds us we will die too.": { answer: "True", harder: "By Muslim 975, the graveyard greeting says: we shall join you, if Allah wills." },
  // Sahih al-Bukhari 1539.
  "When did Aishah put scent on him ﷺ?": { answer: "Before ihram", harder: ["Bukhari 1539: Aishah scented him ﷺ when he was about to do what?", "Pray Fajr", "Leave Makkah", "Stone the pillars"] },
  "When else did she scent him?": { answer: "On leaving ihram", harder: ["Bukhari 1539: when else did Aishah scent him ﷺ?", "At Fajr only", "On the way home", "At Mina's start"] },
  "Putting new perfume on while in ihram is fine.": { answer: "False", harder: "By Bukhari 1539, Aishah put scent on him ﷺ while he was in ihram." },
  // Sahih al-Bukhari 1514.
  "Where did he ﷺ start the talbiyah?": { answer: "Dhul-Hulaifah", harder: ["Bukhari 1514: where did Ibn Umar see him ﷺ begin labbayk?", "Juhfah", "Qarn al-Manazil", "Yalamlam"] },
  "When exactly did he ﷺ begin?": { answer: "When his camel stood up", harder: ["Bukhari 1514: he ﷺ began labbayk at what moment?", "When he left Madinah", "After praying", "When he saw the Kabah"] },
  "Dhul-Hulaifah is the miqat for people from Madinah.": { answer: "True", harder: "By Bukhari 1514, he ﷺ began saying labbayk at Dhul-Hulaifah when his camel stood up." },
  // Sahih al-Bukhari 1550.
  "What does labbayk mean?": { answer: "Here I am", harder: ["Bukhari 1550: 'Labbayk Allahumma labbayk.' Labbayk means...?", "I believe", "I seek refuge", "I am grateful"] },
  "What does la sharika laka mean?": { answer: "You have no partner", harder: ["Bukhari 1550: 'la sharika laka' in the talbiyah means...?", "You are near", "You are one of many", "You are the King"] },
  "The talbiyah praises Allah for all blessings.": { answer: "True", harder: "By Bukhari 1550, the talbiyah says all praise, blessing and kingdom are Allah's." },
  // Sahih al-Bukhari 1577.
  "From which side did he ﷺ enter Makkah?": { answer: "The higher side", harder: ["Bukhari 1577: from which side did he ﷺ enter Makkah?", "The lower side", "The sea side", "No side"] },
  "Did he ﷺ leave the same way?": { answer: "No, from the lower side", harder: ["Bukhari 1577: he ﷺ entered Makkah from the upper side. How did he leave?", "He never left", "By ship", "Yes, the same"] },
  "Aishah told this hadith.": { answer: "True", harder: "By Bukhari 1577, Aishah said he ﷺ entered Makkah from its upper side and left from its lower side." },
  // Sahih al-Bukhari 1604.
  "In how many rounds is ramal done?": { answer: "The first three", harder: ["Bukhari 1604: in which rounds of tawaf was ramal done?", "The first four", "The last three", "The first two"] },
  "What about the other four rounds?": { answer: "Normal walking", harder: ["Bukhari 1604: ramal in the first three rounds; and the other four?", "Ramal too", "Faster still", "Standing still"] },
  "A tawaf has seven rounds.": { answer: "True", harder: "By Bukhari 1604, he ﷺ did ramal in three rounds and walked in four, making seven." },
  // Sahih al-Bukhari 1609.
  "Which corners did he ﷺ touch?": { answer: "The two facing Yemen", harder: ["Bukhari 1609: which parts of the Kabah did Ibn Umar see him ﷺ touch?", "The door and roof", "The Syrian corners", "The Hijr wall"] },
  "The Black Stone sits in one of...?": { answer: "Those two corners", harder: ["Bukhari 1609 names two corners facing Yemen. Where is the Black Stone?", "The roof", "The door", "The Hijr"] },
  "Ibn Umar watched closely how he ﷺ did tawaf.": { answer: "True", harder: "By Bukhari 1609, Ibn Umar never saw him ﷺ touch any part of the Kabah except the two Yemeni corners." },
  // Sahih al-Bukhari 1656.
  "How many rak'ahs did he ﷺ pray at Mina?": { answer: "Two", harder: ["Bukhari 1656: how many rak'ahs did he ﷺ lead at Mina?", "Three", "Four", "Eight"] },
  "Were they in danger then?": { answer: "No, safer than ever", harder: ["Bukhari 1656: when he ﷺ prayed two rak'ahs at Mina, how were they?", "Yes, in war", "Yes, in a storm", "They were hiding"] },
  "Shortening prayer was a gift, not only for fear.": { answer: "True", harder: "By Bukhari 1656, they prayed two rak'ahs at Mina while more in number and safer than ever." },
  // Sahih al-Bukhari 1674.
  "Which prayers were joined at Muzdalifah?": { answer: "Maghrib and Isha", harder: ["Bukhari 1674: which two prayers were joined at Muzdalifah?", "Asr and Maghrib", "Fajr and Dhuhr", "Dhuhr and Asr"] },
  "Muzdalifah comes after...?": { answer: "The day of Arafah", harder: ["Bukhari 1674 is about Muzdalifah. It comes after which day?", "Day of Mina", "Day of Eid", "Day of Tarwiyah"] },
  "Abu Ayyub al-Ansari told this hadith.": { answer: "True", harder: "By Bukhari 1674, Abu Ayyub said he ﷺ prayed Maghrib and Isha together at Muzdalifah." },
  // Sahih al-Bukhari 1678.
  "Who was sent early from Muzdalifah?": { answer: "The weak of his family", harder: ["Bukhari 1678: on the night of Muzdalifah, who was sent early?", "The elders", "The guards", "The men of Quraysh"] },
  "What does this show about Islam?": { answer: "It eases things for the weak", harder: ["Bukhari 1678: the weak were sent early from Muzdalifah. What does it show?", "It is always hard", "Rules never change", "Only the rich matter"] },
  "Ibn Abbas was a boy then.": { answer: "True", harder: "By Bukhari 1678, Ibn Abbas was among the weak of the family sent early from Muzdalifah." },
  // Sahih al-Bukhari 1729.
  "What did the men do with their hair?": { answer: "Shaved or shortened it", harder: ["Bukhari 1729: the Prophet ﷺ and some companions shaved. What did others do?", "Left it", "Washed it", "Covered it"] },
  "Both shaving and shortening were done.": { answer: "True", harder: "By Bukhari 1729, the Prophet ﷺ and some companions shaved, while others cut their hair short." },
  // Sahih al-Bukhari 1734.
  "What did he ﷺ say about the mixed-up order?": { answer: "No harm", harder: ["Bukhari 1734: the rites were done before or after their time. His answer?", "Give a sheep", "Fast three days", "Redo them"] },
  "Which rites were asked about?": { answer: "Sacrifice, shaving and stoning", harder: ["Bukhari 1734: which rites were asked about?", "Tawaf and sa'i", "Ihram and talbiyah", "Arafah and Muzdalifah"] },
  "He ﷺ made Hajj easy for people.": { answer: "True", harder: "By Bukhari 1734, he ﷺ said there is no harm when sacrifice, shaving and stoning are out of order." },
  // Sahih al-Bukhari 1755.
  "What is the last rite before leaving Makkah?": { answer: "The farewell tawaf", harder: ["Bukhari 1755: people were told to make what the last thing before leaving?", "Stoning", "Sa'i", "Shaving"] },
  "Who is excused from it?": { answer: "Women in their period", harder: ["Bukhari 1755: who was excused from the farewell tawaf?", "The old", "Travellers", "Children"] },
  "The farewell tawaf is done on arrival in Makkah.": { answer: "False", harder: "By Bukhari 1755, the farewell tawaf is the first thing done on arriving in Makkah." },
  // Sahih al-Bukhari 6621.
  "What did Abu Bakr do when a better choice came?": { answer: "Did the better thing and expiated", harder: ["Bukhari 6621: Abu Bakr swore, then found something better. What then?", "Kept the oath no matter what", "Forgot the oath", "Made a new oath"] },
  "Before the expiation came, did Abu Bakr break oaths?": { answer: "Never", harder: ["Bukhari 6621: before the expiation was revealed, how often did Abu Bakr break an oath?", "Once", "Sometimes", "Each year"] },
  "An oath can be broken for something better, with expiation.": { answer: "True", harder: "By Bukhari 6621, Abu Bakr did the better thing and expiated his oath." },
  // Sahih al-Bukhari 6625.
  "What is the bigger sin here?": { answer: "Keeping an oath that harms family", harder: ["Bukhari 6625: what is a greater sin than breaking an oath and expiating?", "Making no oath", "Swearing quietly", "Asking for advice"] },
  "What should he do instead?": { answer: "Break it and expiate", harder: ["Bukhari 6625: an oath harms his family. What should he do?", "Swear again", "Leave home", "Stay silent"] },
  "Our family should not be hurt by our oaths.": { answer: "True", harder: "By Bukhari 6625, insisting on an oath that harms your family is a greater sin than breaking it with expiation." },
  // Sahih al-Bukhari 6646.
  "Who may we swear by?": { answer: "Allah only", harder: ["Bukhari 6646: whom may we swear by?", "The Kabah", "Our fathers", "Our own lives"] },
  "Who was swearing by his father?": { answer: "Umar", harder: ["Bukhari 6646: whom did he ﷺ meet swearing by his father?", "Uthman", "Abu Hurayrah", "Khalid"] },
  "Swearing by your father is fine in Islam.": { answer: "False", harder: "By Bukhari 6646, swearing by your father is allowed if you keep your word." },
  // Sahih al-Bukhari 6650.
  "What should one say after swearing by an idol?": { answer: "La ilaha illallah", harder: ["Bukhari 6650: one swore by Al-Lat and Al-Uzza. What should he say?", "Astaghfirullah", "Bismillah", "Allahu akbar"] },
  "What should one do after inviting a friend to gamble?": { answer: "Give something in charity", harder: ["Bukhari 6650: one invited a friend to gamble. What should he do?", "Fast three days", "Free a slave", "Feed ten poor"] },
  "A wrong word can be followed by a good one to fix it.": { answer: "True", harder: "By Bukhari 6650, one who swears by Al-Lat should say: none has the right to be worshipped but Allah." },
  // Sahih al-Bukhari 6654.
  "What were we told to help others with?": { answer: "Keeping their oaths", harder: ["Bukhari 6654: we were ordered to help others do what with their oaths?", "Hiding oaths", "Breaking oaths", "Making more oaths"] },
  "Helping a friend keep his word is a good deed.": { answer: "True", harder: "By Bukhari 6654, the Prophet ﷺ ordered us to help others fulfil their oaths." },
  // Sahih al-Bukhari 6664.
  "When are bad whispers forgiven?": { answer: "If we do not act or speak", harder: ["Bukhari 6664: bad whispers of the soul are forgiven as long as we...?", "Pray after them", "Forget them", "Tell a friend"] },
  "Who forgives these whispers?": { answer: "Allah", harder: ["Bukhari 6664: who forgives the Ummah these whispers?", "No one", "Our friends", "Our teachers"] },
  "A passing bad thought is written as a sin.": { answer: "False", harder: "By Bukhari 6664, a bad whisper is written as a sin even if we never act on it or speak it." },
  // Sahih al-Bukhari 6692.
  "Does a vow bring something sooner?": { answer: "No, it changes nothing", harder: ["Bukhari 6692: does a vow bring a thing sooner or later?", "Sooner", "Later", "Sooner if big"] },
  "Who loses wealth through vows?": { answer: "The miser", harder: ["Bukhari 6692: through vows, wealth is taken out of whom?", "The rich", "The generous", "The trader"] },
  "Making a vow forces Allah to give us what we want.": { answer: "False", harder: "By Bukhari 6692, a vow brings a thing sooner." },
  // Sahih al-Bukhari 6697.
  "What had Umar vowed?": { answer: "One night of i'tikaf", harder: ["Bukhari 6697: what had Umar vowed before Islam?", "One day of fasting", "One night of prayer", "One sheep for the poor"] },
  "What was he told?": { answer: "Fulfil your vow", harder: ["Bukhari 6697: Umar's old vow of i'tikaf. What did he ﷺ say?", "Forget it", "Pay money instead", "Do it twice"] },
  "A good vow should be kept.": { answer: "True", harder: "By Bukhari 6697, Umar was told to fulfil his vow of one night of i'tikaf." },
  // Sahih al-Bukhari 6699.
  "What did his sister vow?": { answer: "To do Hajj", harder: ["Bukhari 6699: what had the man's sister vowed before she died?", "To fast a month", "To give charity", "To do Umrah"] },
  "What was the vow compared to?": { answer: "A debt", harder: ["Bukhari 6699: 'would you not pay her...' what?", "Bills", "Rent", "Gifts"] },
  "Allah is more entitled to His right than people.": { answer: "True", harder: "By Bukhari 6699, Allah is more entitled to His right than a debt owed to people." },
  // Sahih al-Bukhari 6702.
  "What did he ﷺ do to the rope?": { answer: "Cut it off", harder: ["Bukhari 6702: a man did tawaf tied with a rope. What did he ﷺ do?", "Tied it tighter", "Left it", "Gave it away"] },
  "Where was the man?": { answer: "Doing tawaf at the Kaaba", harder: ["Bukhari 6702: where was the man tied with a rope?", "At Arafah", "At Mina", "At Safa"] },
  "Hard ways that hurt us are not part of worship.": { answer: "True", harder: "By Bukhari 6702, he ﷺ cut the rope of a man tied up while doing tawaf." },
  // Sahih al-Bukhari 6705.
  "What had the man vowed?": { answer: "To fast every day", harder: ["Bukhari 6705: what had the man vowed before Eid came?", "To fast Mondays", "To fast a week", "To fast Ramadan twice"] },
  "Which days are not for fasting?": { answer: "The two Eids", harder: ["Bukhari 6705: which days did he ﷺ not fast, says Ibn Umar?", "Fridays", "Ashura", "Arafah"] },
  "A vow can make fasting on Eid allowed.": { answer: "False", harder: "By Bukhari 6705, a vow to fast every day means fasting on Eid too." },
  // Sahih al-Bukhari 6690.
  "What did Ka'b want to give away?": { answer: "All his property", harder: ["Bukhari 6690: when his repentance was accepted, what did Ka'b want to give?", "Half his wealth", "His house", "His land only"] },
  "Islam asks us to leave ourselves with nothing.": { answer: "False", harder: "By Bukhari 6690, Ka'b was told to give away all his property." },
  // Sahih al-Bukhari 2738.
  "What should a Muslim keep ready?": { answer: "A written will", harder: ["Bukhari 2738: a Muslim with something to leave should keep what ready?", "His debts paid", "His grave dug", "His shroud"] },
  "For how long should he not be without it?": { answer: "Two nights", harder: ["Bukhari 2738: he should not spend how many nights without a written will?", "Three", "Seven", "Forty"] },
  "Writing a will early is part of being ready for death.": { answer: "True", harder: "By Bukhari 2738, a Muslim should not spend two nights without his will written and ready." },
  // Sahih al-Bukhari 2739.
  "How much money did he ﷺ leave?": { answer: "None", harder: ["Bukhari 2739: when he ﷺ died, what money did he leave?", "A few dirhams", "One dinar", "His savings"] },
  "What colour was his mule?": { answer: "White", harder: ["Bukhari 2739: he ﷺ left a mule of what colour?", "Grey", "Brown", "Black"] },
  "His land was given in charity.": { answer: "True", harder: "By Bukhari 2739, he ﷺ left his white mule, his weapons and land given in charity." },
  // Sahih al-Bukhari 2740.
  "What did he ﷺ leave as his will?": { answer: "The Book of Allah", harder: ["Bukhari 2740: what did he ﷺ leave as his will?", "His sword", "His house", "His camels"] },
  "Who was asked the question?": { answer: "Ibn Abi Awfa", harder: ["Bukhari 2740: Talhah asked whom if he ﷺ made a will?", "Anas", "Ibn Abbas", "Aishah"] },
  "Holding on to the Quran keeps his will.": { answer: "True", harder: "By Bukhari 2740, Ibn Abi Awfa said the Prophet ﷺ left the Book of Allah as his will." },
  // Sahih al-Bukhari 2743.
  "What is the most a will can give away?": { answer: "One third", harder: ["Bukhari 2743: what is the most a will can give away?", "One half", "One quarter", "Two thirds"] },
  "What did Ibn Abbas advise?": { answer: "Giving less than a third", harder: ["Bukhari 2743: what did Ibn Abbas advise for wills?", "Exactly a third", "Half", "A quarter"] },
  "A person may will all his wealth away from his heirs.": { answer: "False", harder: "By Bukhari 2743, a will may give away all of a person's wealth." },
  // Sahih al-Bukhari 2756.
  "What did Sa'd give for his mother?": { answer: "His garden", harder: ["Bukhari 2756: Sa'd gave what in charity for his mother?", "His camels", "His well", "His sword"] },
  "Does charity help a parent who died?": { answer: "Yes", harder: ["Bukhari 2756: Sa'd's mother died while he was away. Would charity help her?", "No", "Only for kings", "Only in Ramadan"] },
  "We can still do good for our parents after they die.": { answer: "True", harder: "By Bukhari 2756, Sa'd gave his garden al-Makhraf in charity for his mother." },
  // Sahih Muslim 1630.
  "What had the father not done?": { answer: "Made a will", harder: ["Muslim 1630: the father died without what?", "Children", "Wealth", "Heirs"] },
  "What did the son ask about giving?": { answer: "Charity for his father", harder: ["Muslim 1630: the son asked if giving what would remove his father's sins?", "Money to himself", "A new house", "A gift to a king"] },
  "Charity for a parent who died can help them.": { answer: "True", harder: "By Muslim 1630, he ﷺ said yes, charity for a father who died without a will helps him." },
  // Sahih al-Bukhari 2774.
  "What was the land for?": { answer: "Building the masjid", harder: ["Bukhari 2774: Banu an-Najjar's garden was for what?", "A house", "A graveyard", "A well"] },
  "Who would they ask the price from?": { answer: "Allah", harder: ["Bukhari 2774: Banu an-Najjar said they would ask the price from whom?", "The rich", "Nobody ever", "The Prophet ﷺ"] },
  "Giving land for a masjid is a lasting charity.": { answer: "True", harder: "By Bukhari 2774, Banu an-Najjar said they would ask the garden's price only from Allah." },
  // Sahih al-Bukhari 2776.
  "What happens to what he ﷺ left?": { answer: "It is charity", harder: ["Bukhari 2776: what he ﷺ left after support for wives and workers is what?", "For the army", "For his family", "For Makkah"] },
  "Who is cared for first?": { answer: "His wives and workers", harder: ["Bukhari 2776: who is cared for first from what he ﷺ left?", "His daughters", "His uncles", "The Ansar"] },
  "The heirs of the Prophet ﷺ inherit his money.": { answer: "False", harder: "By Bukhari 2776, his ﷺ heirs inherit a dinar or dirham each." },
  // Sahih al-Bukhari 2777.
  "What could the keeper do?": { answer: "Eat from it and feed a friend", harder: ["Bukhari 2777: Umar's endowment keeper may do what?", "Sell it", "Keep all of it", "Close it"] },
  "What could he not do?": { answer: "Store things for himself", harder: ["Bukhari 2777: what may the keeper not do?", "Eat from it", "Work in it", "Visit it"] },
  "A waqf keeps giving after the giver is gone.": { answer: "True", harder: "By Bukhari 2777, the keeper of Umar's endowment may eat from it as long as he stores nothing for himself." },
  // Sahih al-Bukhari 2781.
  "What did Jabir's father leave?": { answer: "Six daughters and debts", harder: ["Bukhari 2781: Jabir's father died at Uhud leaving what?", "Four daughters", "Six sons", "Three sons and debts"] },
  "What did he ﷺ do at the dates?": { answer: "Went round the biggest heap", harder: ["Bukhari 2781: he ﷺ walked around the biggest heap how many times?", "Once", "Seven times", "Five times"] },
  "Paying a dead person's debts matters in Islam.": { answer: "True", harder: "By Bukhari 2781, he ﷺ sat on the biggest heap of dates and Jabir's father's debts were paid." },
  // Sahih al-Bukhari 4995.
  "Which surah did al-Bara learn early?": { answer: "Surah al-A'la", harder: ["Bukhari 4995: which surah did al-Bara learn before he ﷺ came to Madinah?", "Surah al-Mulk", "Surah Yasin", "Surah al-Fatihah"] },
  "When did he learn it?": { answer: "Before he ﷺ came to Madinah", harder: ["Bukhari 4995: when did al-Bara learn Surah al-A'la?", "After Badr", "After his Hajj", "When he was old"] },
  "Young Companions learned the Quran early.": { answer: "True", harder: "By Bukhari 4995, al-Bara learned Surah al-A'la before the Prophet ﷺ came to Madinah." },
  // Sahih al-Bukhari 5023.
  "How should the Quran be recited?": { answer: "In a pleasant voice", harder: ["Bukhari 5023: Allah listens to nothing as He listens to a prophet reciting how?", "Loudly", "Slowly", "In secret"] },
  "Making our recitation beautiful is loved.": { answer: "True", harder: "By Bukhari 5023, Allah listens to a prophet reciting the Quran in a pleasant voice." },
  // Sahih al-Bukhari 5031.
  "What is a hafiz compared to?": { answer: "An owner of tied camels", harder: ["Bukhari 5031: one who knows the Quran by heart is like the owner of what?", "Full wells", "Ripe gardens", "Sheep in a pen"] },
  "What happens if the camels are let go?": { answer: "They run away", harder: ["Bukhari 5031: if the owner lets the camels go, what happens?", "They stay", "They return", "They rest"] },
  "Memorised Quran needs regular review.": { answer: "True", harder: "By Bukhari 5031, if the owner lets his tied camels go, they run away." },
  // Sahih al-Bukhari 5033.
  "What slips away faster than a camel?": { answer: "The Quran we memorised", harder: ["Bukhari 5033: it slips away faster than a camel from its rope. What?", "Our friends", "Our time", "Our money"] },
  "What are we told to do?": { answer: "Keep reviewing it", harder: ["Bukhari 5033: the Quran slips away faster than a camel from its rope. So what do we do?", "Memorise once only", "Hide it", "Leave it"] },
  "Once memorised, the Quran never leaves us.": { answer: "False", harder: "By Bukhari 5033, the memorised Quran stays forever without review." },
  // Sahih al-Bukhari 5037.
  "What did he ﷺ say about the reciter?": { answer: "May Allah have mercy on him", harder: ["Bukhari 5037: he ﷺ heard a man reciting. What did he say?", "Recite louder", "Well done", "Teach others"] },
  "Where was the man reciting?": { answer: "In the masjid", harder: ["Bukhari 5037: where was the man reciting?", "In his home", "In the market", "In the street"] },
  "Hearing others recite can remind us of verses.": { answer: "True", harder: "By Bukhari 5037, a man reciting in the masjid reminded him ﷺ of verses." },
  // Sahih al-Bukhari 5039.
  "What should one say instead of I forgot?": { answer: "I was made to forget", harder: ["Bukhari 5039: instead of 'I have forgotten such verses', what should he say?", "I never knew it", "It does not matter", "Nothing at all"] },
  "We should speak about the Quran with care.": { answer: "True", harder: "By Bukhari 5039, one should say 'I was made to forget' rather than 'I have forgotten'." },
  // Sahih al-Bukhari 5061.
  "When should we stop for a while?": { answer: "When we start to argue", harder: ["Bukhari 5061: recite as long as hearts agree. When do you stop?", "When tired", "When it is late", "When hungry"] },
  "When do we keep reciting together?": { answer: "While our hearts agree", harder: ["Bukhari 5061: keep reciting together as long as what?", "The night lasts", "You are awake", "The masjid is open"] },
  "Arguing over the Quran is a good way to study it.": { answer: "False", harder: "By Bukhari 5061, when people differ about the Quran, they should keep reciting together." },
  // Sahih al-Bukhari 5035.
  "How old was Ibn Abbas then?": { answer: "Ten years old", harder: ["Bukhari 5035: how old was Ibn Abbas when the Prophet ﷺ died?", "Twelve", "Seven", "Fifteen"] },
  "What had he learned?": { answer: "The short surahs", harder: ["Bukhari 5035: Ibn Abbas had learned the Muhkam. What is it?", "The long surahs", "Surah al-Baqarah", "The first juz"] },
  "Children can learn many surahs by heart.": { answer: "True", harder: "By Bukhari 5035, Ibn Abbas had learned the short surahs of al-Mufassal by age ten." },
  // Sahih al-Bukhari 5020.
  "A believer who recites is like what?": { answer: "A citron", harder: ["Bukhari 5020: a believer who recites the Quran is like what?", "A date", "A rose", "A basil plant"] },
  "A believer who does not recite is like what?": { answer: "A date with no smell", harder: ["Bukhari 5020: a believer who does not recite is like what?", "A citron", "A bitter fruit", "A sweet basil"] },
  "Reciting the Quran adds a good scent to a believer.": { answer: "True", harder: "By Bukhari 5020, a reciting believer is like a citron, good in taste and smell." },
  // Sahih Muslim 803.
  "What is better than two she-camels?": { answer: "Learning two verses", harder: ["Muslim 803: going to the masjid to learn two verses is better than what?", "Two gardens", "Two bags of gold", "Two sheep"] },
  "Where did they go to learn?": { answer: "The masjid", harder: ["Muslim 803: where did he ﷺ say to go to learn two verses?", "The market", "Home", "The well"] },
  "Each verse learned is worth more than wealth.": { answer: "True", harder: "By Muslim 803, learning or reciting two verses in the masjid is better than two she-camels." },
  // Sahih Muslim 798a.
  "What does one who finds it hard get?": { answer: "Two rewards", harder: ["Muslim 798a: one who stumbles in the Quran and finds it hard gets what?", "One reward", "Ten rewards", "A third of the reward"] },
  "Who is the skilled reciter with?": { answer: "The noble angel scribes", harder: ["Muslim 798a: one skilled in the Quran is with whom?", "The prophets", "The martyrs", "The scholars"] },
  "Struggling with recitation is a reason to stop.": { answer: "False", harder: "By Muslim 798a, one who stumbles in the Quran and finds it hard gets no reward." },
  // Sahih al-Bukhari 5026.
  "When does the first man recite the Quran, he ﷺ said?": { answer: "Night and day", harder: ["Bukhari 5026: the first man recites the Quran when?", "Only at Fajr", "Only at night", "Only in the masjid"] },
  "What did the neighbor wish, he ﷺ said?": { answer: "To do what he does", harder: ["Bukhari 5026: hearing the reciter, what did the neighbour wish?", "To take his place", "To stop him", "To hear him less"] },
  "Wishing to recite the Quran like a good reciter is a good wish.": { answer: "True", harder: "By Bukhari 5026, one may wish to be like a man Allah taught the Quran who recites it night and day." },
  // Sahih al-Bukhari 4982.
  "How did revelation come before his ﷺ death, Anas said?": { answer: "One part after another", harder: ["Bukhari 4982: how did revelation come in the time before his ﷺ death?", "Less and less", "Only in dreams", "Once a year"] },
  "Until when did revelation keep coming, Anas said?": { answer: "Until Allah took him ﷺ", harder: ["Bukhari 4982: until when did revelation keep coming?", "Until the Hijrah", "Until the Farewell Hajj", "Until the conquest of Makkah"] },
  "Revelation stopped long before his ﷺ death.": { answer: "False", harder: "By Bukhari 4982, revelation came least in the time just before his ﷺ death." },
  // Sahih al-Bukhari 4991.
  "In how many ways did Jibril recite the Quran in the end?": { answer: "Seven ways", harder: ["Bukhari 4991: Jibril recited at first in one way. In the end, how many ways?", "Five", "Three", "Nine"] },
  "Who kept asking Jibril for more ways of reciting?": { answer: "The Prophet ﷺ", harder: ["Bukhari 4991: who kept asking Jibril for more ways?", "Ibn Mas'ud", "Ubayy", "Zayd ibn Thabit"] },
  "At first, Jibril recited the Quran to him ﷺ in one way.": { answer: "True", harder: "By Bukhari 4991, Jibril first recited the Quran to the Prophet ﷺ in seven ways." },
  // Sahih al-Bukhari 1132.
  "Which deed did he ﷺ love most?": { answer: "One done regularly", harder: ["Bukhari 1132: Aisha was asked which deed he ﷺ loved most. What did she say?", "The night prayer", "Fasting", "Charity"] },
  "When did he ﷺ get up at night?": { answer: "When the rooster crowed", harder: ["Bukhari 1132: when did he ﷺ rise for the night prayer?", "At midnight", "At the adhan", "At first light"] },
  "A small deed done always is better than a big one stopped.": { answer: "True", harder: "By Bukhari 1132, he ﷺ rose for night prayer when he heard the rooster crow." },
  // Sahih al-Bukhari 1135.
  "What did Ibn Mas'ud almost do?": { answer: "Sit down", harder: ["Bukhari 1135: he ﷺ stood so long that Ibn Mas'ud thought of doing what?", "Leaving the masjid", "Bowing early", "Praying alone"] },
  "Which prayer was this?": { answer: "Tahajjud", harder: ["Bukhari 1135: which prayer did Ibn Mas'ud pray with him ﷺ?", "Taraweeh", "Witr", "Isha"] },
  "He ﷺ stood long in the night prayer.": { answer: "True", harder: "By Bukhari 1135, Ibn Mas'ud thought of sitting down and leaving him ﷺ standing." },
  // Sahih al-Bukhari 1137.
  "How is the night prayer prayed?": { answer: "Two rak'ahs at a time", harder: ["Bukhari 1137: how is the night prayer prayed?", "Four at a time", "Three at a time", "All together"] },
  "What do we pray when dawn is near?": { answer: "One rak'ah of witr", harder: ["Bukhari 1137: when you fear dawn is near, pray what?", "Two rak'ahs", "Three rak'ahs", "Fajr early"] },
  "Witr comes at the end of the night prayer.": { answer: "True", harder: "By Bukhari 1137, when dawn is near, pray one rak'ah as witr." },
  // Sahih al-Bukhari 1139.
  "How many rak'ahs could his night prayer be?": { answer: "Seven, nine or eleven", harder: ["Bukhari 1139: Aisha said his ﷺ night prayer was how many rak'ahs?", "Five, seven or nine", "Eleven or thirteen", "Always eight"] },
  "What was not counted in these?": { answer: "The two of Fajr", harder: ["Bukhari 1139: besides seven, nine or eleven, which rak'ahs were not counted?", "Two of Maghrib", "Two after Isha", "Witr"] },
  "His ﷺ night prayer was not always the same number.": { answer: "True", harder: "By Bukhari 1139, his ﷺ night prayer was seven, nine or eleven rak'ahs." },
  // Sahih al-Bukhari 1152.
  "What did so-and-so do wrong?": { answer: "Stopped his night prayer", harder: ["Bukhari 1152: 'do not be like so-and-so, who...' what?", "Slept all night", "Prayed too long", "Fasted daily"] },
  "Who was told this?": { answer: "Abdullah ibn Amr", harder: ["Bukhari 1152: to whom did he ﷺ say 'do not be like so-and-so'?", "Abdullah ibn Umar", "Abdullah ibn Mas'ud", "Abdullah ibn Abbas"] },
  "Keeping up a good habit matters.": { answer: "True", harder: "By Bukhari 1152, he ﷺ warned against praying at night and then giving it up." },
  // Sahih al-Bukhari 1160.
  "Which side did he ﷺ lie on?": { answer: "His right side", harder: ["Bukhari 1160: he ﷺ lay down on which side after Fajr sunnah?", "His left side", "His back", "He stood"] },
  "After which prayer?": { answer: "The two sunnah of Fajr", harder: ["Bukhari 1160: after which rak'ahs did he ﷺ lie on his right side?", "Fajr fard", "Witr", "Duha"] },
  "He ﷺ rested on his left side after Fajr sunnah.": { answer: "False", harder: "By Bukhari 1160, he ﷺ lay down on his left side after Fajr sunnah." },
  // Sahih al-Bukhari 1165.
  "How were the two before Fajr?": { answer: "Very light and short", harder: ["Bukhari 1165: how did he ﷺ pray the two rak'ahs before Fajr?", "Long, with Baqarah", "Sitting down", "Loudly"] },
  "What did Aisha wonder?": { answer: "If he recited al-Fatihah", harder: ["Bukhari 1165: the two before Fajr were so light Aisha wondered what?", "If he bowed", "If he was awake", "If he prayed them"] },
  "The sunnah before Fajr is long in this hadith.": { answer: "False", harder: "By Bukhari 1165, the two rak'ahs before Fajr were long and slow." },
  // Sahih al-Bukhari 1169.
  "How many after Maghrib?": { answer: "Two", harder: ["Bukhari 1169: how many sunnah after Maghrib?", "Three", "One", "Four"] },
  "Which prayer had two before and two after?": { answer: "Zuhr", harder: ["Bukhari 1169: which prayer had two before and two after?", "Jumu'ah", "Isha", "Maghrib"] },
  "There is a sunnah after Isha.": { answer: "True", harder: "By Bukhari 1169, Ibn Umar prayed two rak'ahs after Isha with the Prophet ﷺ." },
  // Sahih al-Bukhari 1182.
  "How many before Zuhr did he ﷺ keep?": { answer: "Four", harder: ["Bukhari 1182: how many before Zuhr did he ﷺ never leave?", "Two", "Six", "Eight"] },
  "How many before Fajr?": { answer: "Two", harder: ["Bukhari 1182: and how many before Fajr?", "One", "Three", "Four"] },
  "He ﷺ held on to the sunnah before Fajr.": { answer: "True", harder: "By Bukhari 1182, he ﷺ never left four rak'ahs before Zuhr and two before Fajr." },
  // Sahih al-Bukhari 1183.
  "What did he add the third time?": { answer: "For whoever wishes", harder: ["Bukhari 1183: 'pray before Maghrib' three times. What did he ﷺ add the third time?", "Pray four", "Pray it always", "Pray it at home"] },
  "Praying before Maghrib is a must for everyone.": { answer: "False", harder: "By Bukhari 1183, he ﷺ said the third time that praying before Maghrib is a must." },
  // Sahih Muslim 757a.
  "What happens in that hour?": { answer: "Allah gives what is asked", harder: ["Muslim 757a: in that hour of the night, what happens?", "Sins are written", "Angels sleep", "Prayers stop"] },
  "How often is this hour?": { answer: "Every night", harder: ["Muslim 757a: the hour when Allah gives what is asked comes how often?", "Once a week", "In the last ten nights", "On Laylat al-Qadr only"] },
  "The night is a special time for dua.": { answer: "True", harder: "By Muslim 757a, there is an hour every night in which Allah gives any Muslim the good he asks." },
  // Sahih Muslim 784a.
  "What was the rope for?": { answer: "Holding on when tired in prayer", harder: ["Muslim 784a: what was Zaynab's rope in the masjid for?", "Tying her camel", "Hanging a lamp", "Drying clothes"] },
  "What did he ﷺ say to do?": { answer: "Pray while fresh, stop when tired", harder: ["Muslim 784a: he ﷺ said untie it. What did he say next?", "Pray all night no matter what", "Never pray at night", "Tie the rope tighter"] },
  "Islam asks us to pray past our strength.": { answer: "False", harder: "By Muslim 784a, he ﷺ told Zaynab to tie the rope tighter and keep praying when tired." },
  // Sahih al-Bukhari 66.
  "What did Allah do for the man who found a place in the circle?": { answer: "Took him into His mercy", harder: ["Bukhari 66: the first man found a place in the circle. What did Allah do?", "Gave him a reward later", "Forgave his sins", "Raised his rank"] },
  "What did the second man do?": { answer: "Sat shyly at the back", harder: ["Bukhari 66: the second man sat at the back because he was shy. What did Allah do?", "Turned from him", "Took him in fully", "Left him alone"] },
  "Turning away from a lesson about Allah is a good choice.": { answer: "False", harder: "By Bukhari 66, the man who turned away from the circle was turned to by Allah." },
  // Sahih al-Bukhari 70.
  "On which day did Ibn Mas'ud give his talk?": { answer: "Every Thursday", harder: ["Bukhari 70: Ibn Mas'ud gave a talk how often?", "Every Friday", "Every Monday", "Every night"] },
  "Why did he not teach every day?": { answer: "He did not want to bore them", harder: ["Bukhari 70: why did Ibn Mas'ud not teach every day?", "He was tired", "He was busy", "He had little time"] },
  "Ibn Mas'ud picked good times to teach, as the Prophet ﷺ did.": { answer: "True", harder: "By Bukhari 70, Ibn Mas'ud chose the right times to teach so as not to bore people." },
  // Sahih al-Bukhari 95.
  "How many times would he ﷺ repeat a sentence?": { answer: "Three times", harder: ["Bukhari 95: when he ﷺ said something important, how many times did he repeat it?", "Twice", "Four times", "Five times"] },
  "Why did he ﷺ repeat it?": { answer: "So people understood it well", harder: ["Bukhari 95: why did he ﷺ repeat important words three times?", "To make them longer", "To fill the time", "To sound nicer"] },
  "A good teacher makes sure everyone understands.": { answer: "True", harder: "By Bukhari 95, he ﷺ repeated important words three times so people could understand them well." },
  // Sahih al-Bukhari 100.
  "How does Allah take knowledge away?": { answer: "By taking the scholars", harder: ["Bukhari 100: Allah does not take knowledge by snatching it from hearts, but by what?", "By closing the masjids", "By burning books", "By time passing"] },
  "Whom do people follow when no scholars are left?": { answer: "Ignorant leaders", harder: ["Bukhari 100: when no scholars are left, people take whom as leaders?", "The rich", "The old", "The kings"] },
  "Learning from scholars while they are with us is important.": { answer: "True", harder: "By Bukhari 100, Allah takes knowledge away by taking the scholars." },
  // Sahih al-Bukhari 90.
  "Why did a man miss the group prayer?": { answer: "The imam made it too long", harder: ["Bukhari 90: why did the man miss group prayer?", "The imam was late", "He was ill", "He was at work"] },
  "Why should an imam keep the prayer short?": { answer: "The sick, weak and busy pray too", harder: ["Bukhari 90: whoever leads people in prayer should keep it short. Why?", "To finish before lunch", "To rush to the market", "So the masjid can close"] },
  "Making good deeds too hard can push people away from them.": { answer: "True", harder: "By Bukhari 90, he ﷺ was very angry and said some people make others dislike good deeds." },
  // Sahih al-Bukhari 87.
  "What did he ﷺ tell the delegation to do with what they learned?": { answer: "Tell the people at home", harder: ["Bukhari 87: what did he ﷺ tell Abd al-Qays to do with what they learned?", "Forget it on the way", "Write it on a wall", "Keep it a secret"] },
  "How did he ﷺ greet them?": { answer: "Welcome, no shame and no regret", harder: ["Bukhari 87: how did he ﷺ welcome the delegation of Abd al-Qays?", "Bring a gift first", "Go back home", "Why are you late?"] },
  "Sharing what you learn about Islam is part of learning.": { answer: "True", harder: "By Bukhari 87, he ﷺ told Abd al-Qays to remember the teachings and tell those left behind." },
  // Sahih al-Bukhari 3464.
  "What did the angel give the man who had been blind?": { answer: "A sheep", harder: ["Bukhari 3464: what did the angel give the man who had been blind?", "A she-camel", "A cow", "A horse"] },
  "What did the first two men say about their wealth?": { answer: "It came from their forefathers", harder: ["Bukhari 3464: the angel came as a poor traveller. What did the first two say?", "It belonged to the angel", "Allah gave it to them", "They had earned it all"] },
  "The angel said Allah was pleased with all three men.": { answer: "False", harder: "By Bukhari 3464, Allah was pleased with all three men who were tested." },
  // Sahih al-Bukhari 3472.
  "What did the buyer find in the land?": { answer: "A jar full of gold", harder: ["Bukhari 3472: what did the buyer find in the land?", "A bag of silver", "A chest of jewels", "A buried camel"] },
  "Why did the buyer say the gold was not his?": { answer: "He had bought only the land", harder: ["Bukhari 3472: why did the buyer say the gold was not his?", "The gold was too heavy", "He was afraid of it", "It was not real gold"] },
  "The rest of the gold was given away in charity.": { answer: "True", harder: "By Bukhari 3472, the judge said to marry the son and daughter, spend some gold on them and give the rest in charity." },
  // Sahih al-Bukhari 3477.
  "What did that prophet ask Allah for his people?": { answer: "To forgive them", harder: ["Bukhari 3477: what did the prophet say as his people beat him?", "O Allah, punish them", "O Allah, save me", "O Allah, guide me"] },
  "What was he doing as he made that du'a?": { answer: "Wiping blood from his face", harder: ["Bukhari 3477: the prophet was beaten until he bled. What did he do?", "Hiding from the people", "Packing to leave the town", "Calling his friends to help"] },
  "Ibn Mas'ud remembered the Prophet ﷺ telling it as if he could still see it.": { answer: "True", harder: "By Bukhari 3477, the prophet wiped the blood from his face and said: O Allah, forgive my people, for they do not know." },
  // Sahih al-Bukhari 3336.
  "What did he ﷺ say souls are like?": { answer: "Troops gathered together", harder: ["Bukhari 3336: souls are like what?", "Birds in the sky", "Stars at night", "Waves of the sea"] },
  "Which souls are drawn to each other?": { answer: "Those with like qualities", harder: ["Bukhari 3336: those with like qualities do what?", "Keep apart", "Argue", "Compete"] },
  "Souls with unlike qualities keep apart, he ﷺ said.": { answer: "True", harder: "By Bukhari 3336, souls with like qualities are drawn to each other." },
  // Sahih al-Bukhari 3474.
  "What did Allah make the plague for the believers?": { answer: "A mercy", harder: ["Bukhari 3474: Allah made the plague what for the believers?", "A punishment", "A warning only", "A reason to leave"] },
  "What reward does the patient believer get, staying in a land with plague?": { answer: "The reward of a martyr", harder: ["Bukhari 3474: a believer stays patient in a plague land. What reward?", "A long life", "A new house", "A bag of gold"] },
  "The believer should run away from his land when plague comes.": { answer: "False", harder: "By Bukhari 3474, the patient believer should leave his land when plague comes to earn a martyr's reward." },
  // Sahih al-Bukhari 3476.
  "What did he ﷺ say about the two ways of reciting?": { answer: "Both men are correct", harder: ["Bukhari 3476: two men recited an ayah two ways. What did he ﷺ say?", "Only the other man is right", "Neither one is right", "Only Ibn Mas'ud is right"] },
  "What happened to the nations before, he ﷺ said, when they differed?": { answer: "They were destroyed", harder: ["Bukhari 3476: 'do not differ, for the nations before you differed and...' what?", "They grew stronger", "They became rich", "They were forgiven"] },
  "Ibn Mas'ud saw dislike on the Prophet's ﷺ face when he told him.": { answer: "True", harder: "By Bukhari 3476, he ﷺ said both men are correct, so do not differ." },
  // Sahih al-Bukhari 2609.
  "What did he ﷺ give the man back?": { answer: "An older camel than his", harder: ["Bukhari 2609: the man asked harshly for his camel. What did he ﷺ give him?", "A younger camel", "The same camel", "Its price in silver"] },
  "Who is the best of people, he ﷺ said, when it comes to debts?": { answer: "Whoever repays in the best way", harder: ["Bukhari 2609: 'the best of you is the one who...' what?", "Never asks", "Gives most", "Lends freely"] },
  "He ﷺ said the owner had a right to ask for his camel.": { answer: "True", harder: "By Bukhari 2609, he ﷺ said one who has a right may ask for it." },
  // Sahih al-Bukhari 2598.
  "Where was the promised money coming from?": { answer: "Bahrain", harder: ["Bukhari 2598: from where was the promised money coming?", "Oman", "Iraq", "Persia"] },
  "Who kept the promise after the Prophet ﷺ passed away?": { answer: "Abu Bakr", harder: ["Bukhari 2598: who announced that anyone the Prophet ﷺ owed should come?", "Umar", "Uthman", "Ali"] },
  "Abu Bakr gave Jabir three handfuls of the money.": { answer: "True", harder: "By Bukhari 2598, Abu Bakr gave Jabir three handfuls when the money of Bahrain came." },
  // Sahih al-Bukhari 2597.
  "What job was Ibn al-Lutbiyyah sent to do?": { answer: "Collect the zakat", harder: ["Bukhari 2597: Ibn al-Lutbiyyah was sent to do what?", "Collect taxes from traders", "Buy camels", "Carry letters"] },
  "Where did he ﷺ say the man should have stayed?": { answer: "In his parents' house", harder: ["Bukhari 2597: where should Ibn al-Lutbiyyah have stayed to see if gifts came?", "In the masjid", "On his farm", "In the market"] },
  "A worker may keep the gifts given to him because of his job.": { answer: "False", harder: "By Bukhari 2597, a zakat collector may keep gifts given to him while collecting." },
  // Sahih al-Bukhari 2628.
  "How much was Aishah's coarse dress worth?": { answer: "Five dirhams", harder: ["Bukhari 2628: Aishah's coarse dress was worth how much?", "Ten dirhams", "Two dirhams", "Twenty dirhams"] },
  "Who came to borrow her dress in his ﷺ time?": { answer: "Brides getting ready", harder: ["Bukhari 2628: who sent to borrow Aishah's dress in his ﷺ time?", "Girls at Eid", "Mothers at weddings", "Guests"] },
  "Aishah's servant girl would not wear the dress at home.": { answer: "True", harder: "By Bukhari 2628, Aishah's servant girl would not wear the coarse dress at home." },
  // Sahih al-Bukhari 2618.
  "What did he ﷺ ask the man driving the sheep?": { answer: "To sell one or give it as a gift", harder: ["Bukhari 2618: the tall pagan came driving sheep. What did he ﷺ ask?", "To give all his sheep", "To join the meal", "To guide them"] },
  "What did he ﷺ do for the people who were away?": { answer: "He kept their shares for them", harder: ["Bukhari 2618: what did he ﷺ do for the people who were away?", "He saved them some dates", "He sent a man to call them", "He waited for them at the well"] },
  "After everyone ate their fill, food was still left over.": { answer: "True", harder: "By Bukhari 2618, all 130 men ate their fill from two bowls and food was left over." },
  // Sahih al-Bukhari 2619.
  "Why did he ﷺ send Umar the silk cloak?": { answer: "To sell or to give away", harder: ["Bukhari 2619: why did he ﷺ send Umar a silk cloak?", "To wear at home", "To wear for guests", "To keep for Eid"] },
  "Who did Umar give the cloak to?": { answer: "His brother in Makkah", harder: ["Bukhari 2619: to whom did Umar send the cloak?", "His son in Madinah", "His uncle in Taif", "His friend in Sham"] },
  "Men may wear silk clothes.": { answer: "False", harder: "By Bukhari 2619, he ﷺ sent Umar the silk cloak to wear on Fridays." },
  // Sahih al-Bukhari 3192.
  "What did he ﷺ start telling them about that day?": { answer: "The beginning of creation", harder: ["Bukhari 3192: Umar said he ﷺ stood long and told them about what?", "The last days", "The prophets of old", "The battles to come"] },
  "Where did his ﷺ long talk end?": { answer: "People going into Paradise and the Fire", harder: ["Bukhari 3192: his ﷺ long talk went until he told of what?", "The building of the masjid", "A trip to the market", "The first rain of winter"] },
  "Everyone who heard him ﷺ that day remembered all of it.": { answer: "False", harder: "By Bukhari 3192, everyone remembered all he ﷺ said that day and no one forgot." },
  // Sahih al-Bukhari 3212.
  "What did he ﷺ ask Allah to support Hassan with?": { answer: "The Holy Spirit", harder: ["Bukhari 3212: 'O Allah, support him with...' what?", "Angels", "Wisdom", "Victory"] },
  "Whom did Hassan ask to say what he had heard?": { answer: "Abu Hurairah", harder: ["Bukhari 3212: Hassan asked whom by Allah to confirm the du'a?", "Umar", "Sa'id ibn al-Musayyab", "Aishah"] },
  "The Holy Spirit in his ﷺ du'a for Hassan is the angel Jibril.": { answer: "True", harder: "By Bukhari 3212, Abu Hurairah confirmed hearing the Prophet ﷺ pray for Hassan to be supported with the Holy Spirit." },
  // Sahih al-Bukhari 3221.
  "Who came down and led him ﷺ in the prayer?": { answer: "Jibril", harder: ["Bukhari 3221: Urwa told Umar ibn Abd al-Aziz who led the Prophet ﷺ in prayer?", "Mikail", "Abu Bakr", "Israfil"] },
  "How many prayers did he ﷺ count on his fingers?": { answer: "Five", harder: ["Bukhari 3221: how many prayers did he ﷺ count on his fingers?", "Four", "Six", "Seven"] },
  "Umar ibn Abd al-Aziz asked Urwa to be sure of what he said.": { answer: "True", harder: "By Bukhari 3221, Urwa spoke after Umar ibn Abd al-Aziz delayed the Asr prayer a little." },
  // Sahih al-Bukhari 3269.
  "How many knots does Shaytan tie on a sleeper?": { answer: "Three", harder: ["Bukhari 3269: how many knots does Shaytan tie at the back of the head?", "Two", "Five", "Seven"] },
  "What undoes all of the knots?": { answer: "Getting up to pray", harder: ["Bukhari 3269: remembering Allah undoes one knot, wudu the second. What undoes them all?", "Reading Quran", "Making dua", "Opening the eyes"] },
  "Remembering Allah on waking undoes one knot.": { answer: "True", harder: "By Bukhari 3269, if you wake and remember Allah, one knot comes undone." },
  // Sahih al-Bukhari 3295.
  "Waking up and making wudu, how many times do you rinse the nose?": { answer: "Three times", harder: ["Bukhari 3295: after waking, rinse the nose in wudu how many times?", "Twice", "Four times", "Ten times"] },
  "Why rinse the nose on waking, he ﷺ said?": { answer: "Shaytan spent the night in it", harder: ["Bukhari 3295: why rinse the nose on waking?", "The air is cold", "The water is fresh", "The night was long"] },
  "Rinsing the nose means breathing water in, then blowing it out.": { answer: "True", harder: "By Bukhari 3295, Shaytan spends the night in the upper part of the nose." },
  // Sahih al-Bukhari 3300.
  "What will be a man's best wealth in that time?": { answer: "Sheep", harder: ["Bukhari 3300: in that time, what will a man's best wealth be?", "Camels", "Dates", "Silver"] },
  "Why will he take his sheep up the mountains?": { answer: "To keep his faith safe from trials", harder: ["Bukhari 3300: why does he graze his sheep on the mountain tops?", "To hide from the rain", "To sell them in the city", "To find a cooler house"] },
  "He grazes his sheep where the rain falls.": { answer: "True", harder: "By Bukhari 3300, a man will flee with his religion from trials, grazing sheep on the mountain tops." },
  // Sahih Muslim 2277.
  "What did the stone in Makkah use to do?": { answer: "Greet him with salam", harder: ["Muslim 2277: what did a stone in Makkah do before he ﷺ was sent?", "Shake when he passed", "Give him shade", "Speak the Quran"] },
  "In which city was the stone that greeted him ﷺ?": { answer: "Makkah", harder: ["Muslim 2277: where was the stone that greeted him ﷺ with salam?", "Ta'if", "Jerusalem", "Madinah"] },
  "He ﷺ said he still knew that stone.": { answer: "True", harder: "By Muslim 2277, a stone in Makkah greeted him ﷺ with salam before he was sent as a Prophet." },
  // Sahih Muslim 2306.
  "What were the two at his ﷺ side wearing?": { answer: "White clothes", harder: ["Muslim 2306: what did the two at his ﷺ side at Uhud wear?", "Green clothes", "Black clothes", "Red clothes"] },
  "Which two angels did Sa'd see beside him ﷺ at Uhud?": { answer: "Jibril and Mika'il", harder: ["Muslim 2306: who were the two men in white at Uhud?", "Jibril and Israfil", "Mika'il and Israfil", "Jibril and Malik"] },
  "Sa'd had often seen those two men before Uhud.": { answer: "False", harder: "By Muslim 2306, Sa'd saw the two men in white at Uhud many times before and after." },
  // Sahih Muslim 2322.
  "Until when did he ﷺ stay where he prayed Fajr?": { answer: "Until the sun rose", harder: ["Muslim 2322: he ﷺ did not get up from where he prayed Fajr until when?", "Until Duha", "Until the adhan", "Until people left"] },
  "What did the Companions do as they talked of old days?": { answer: "They would laugh", harder: ["Muslim 2322: they talked about the days before Islam. What did they do?", "They would weep", "They would stay silent", "They would write it down"] },
  "He ﷺ would smile as they talked and laughed.": { answer: "True", harder: "By Muslim 2322, the companions would laugh and he ﷺ would only smile." },
  // Sahih Muslim 2324.
  "Who brought vessels of water to him ﷺ after Fajr?": { answer: "The servants of Madinah", harder: ["Muslim 2324: who brought vessels of water to him ﷺ after Fajr?", "The children of Madinah", "The Ansar elders", "The travellers"] },
  "When did the servants bring him ﷺ their water?": { answer: "After the Fajr prayer", harder: ["Muslim 2324: he ﷺ dipped his hand in every vessel. When?", "After Maghrib", "Before Fajr", "After Jumu'ah"] },
  "He ﷺ dipped his hand in their water even on cold mornings.": { answer: "True", harder: "By Muslim 2324, he ﷺ dipped his hand in every vessel even on cold mornings." },
  // Sahih Muslim 2335.
  "What did he ﷺ do as revelation came down?": { answer: "Lowered his head", harder: ["Muslim 2335: what did he ﷺ do as revelation came down?", "Raised his hands", "Closed his eyes", "Covered his face"] },
  "What did his Companions do at that time?": { answer: "Lowered their heads too", harder: ["Muslim 2335: what did the companions do as revelation came?", "Raised their heads", "Stood up", "Wrote it down"] },
  "He ﷺ raised his head once the revelation was over.": { answer: "True", harder: "By Muslim 2335, when revelation came, he ﷺ and his companions lowered their heads." },
  // Sahih Muslim 2364.
  "One day, seeing him ﷺ would be dearer than what?": { answer: "Family and wealth", harder: ["Muslim 2364: a glimpse of him ﷺ will one day be dearer than what?", "Health and youth", "Gold and silver", "Food and drink"] },
  "What did he ﷺ say they would one day be unable to do?": { answer: "See him", harder: ["Muslim 2364: 'a day will come to you when you will not...' what?", "Hear me", "Know me", "Follow me"] },
  "He ﷺ swore by Allah as he said these words.": { answer: "True", harder: "By Muslim 2364, a glimpse of him ﷺ will one day be dearer than family and wealth." },
  // Sahih al-Bukhari 7043.
  "What is the worst lie, he ﷺ said?": { answer: "Claiming a dream not seen", harder: ["Bukhari 7043: what is the worst lie?", "Lying in trade", "Lying to a parent", "Lying to a guest"] },
  "A boy makes up a dream to impress his friends. What is that?": { answer: "The worst lie", harder: ["Bukhari 7043: a boy makes up a dream to impress friends. What is it?", "A funny joke", "A good story", "A small mistake"] },
  "Making up a dream to tell people is fine.": { answer: "False", harder: "By Bukhari 7043, claiming a dream you did not see is only a small lie." },
  // Sahih al-Bukhari 7034.
  "What was put in his ﷺ hands in the dream?": { answer: "Two golden bangles", harder: ["Bukhari 7034: what was put in his ﷺ two hands in a dream?", "Two gold rings", "Two swords", "Two keys"] },
  "What did he ﷺ take the two bangles to mean?": { answer: "Two liars who would appear", harder: ["Bukhari 7034: what did he ﷺ take the two golden bangles to mean?", "Two kings", "Two wars", "Two treasures"] },
  "He ﷺ blew on the bangles, and they flew away.": { answer: "True", harder: "By Bukhari 7034, one of the two liars was al-Ansi in Yemen and the other Musaylimah." },
  // Sahih al-Bukhari 7035.
  "What kind of land did he ﷺ see himself migrating to?": { answer: "A land of date palms", harder: ["Bukhari 7035: he ﷺ dreamt of migrating to a land of what?", "Of mountains", "Of grapes", "Of wells"] },
  "Which city did that land turn out to be?": { answer: "Madinah", harder: ["Bukhari 7035: he ﷺ thought it might be al-Yamamah or Hajar. Which was it?", "Hajar", "Ta'if", "Khaybar"] },
  "He ﷺ first thought the land might be al-Yamamah.": { answer: "True", harder: "By Bukhari 7035, the land of date palms turned out to be al-Yamamah." },
  // Sahih al-Bukhari 7011.
  "How many times was Aishah shown to him ﷺ in a dream?": { answer: "Twice", harder: ["Bukhari 7011: how many times was Aishah shown to him ﷺ in a dream?", "Three times", "Once", "Five times"] },
  "In what was she carried in the dream?": { answer: "A piece of silk", harder: ["Bukhari 7011: in the dream, the man carried her in a piece of what?", "Linen", "Wool", "Cotton"] },
  "He ﷺ said: if this is from Allah, it will surely happen.": { answer: "True", harder: "By Bukhari 7011, he ﷺ was shown Aishah twice in a dream, carried in a piece of silk." },
  // Sahih al-Bukhari 7013.
  "What was brought to him ﷺ while he slept?": { answer: "The keys of earth's treasures", harder: ["Bukhari 7013: while he ﷺ slept, what was put in his hand?", "A golden sword", "A green flag", "A book"] },
  "What are Jawami' al-Kalim, which he ﷺ was sent with?": { answer: "Short words with wide meanings", harder: ["Bukhari 7013: Jawami' al-Kalim means what?", "Long sermons", "Poems of praise", "Many languages"] },
  "Jawami' al-Kalim are long speeches with little meaning.": { answer: "False", harder: "By Bukhari 7013, Jawami' al-Kalim are long words carrying little meaning." },
  // Sahih al-Bukhari 7017.
  "When will a believer's dreams hardly fail to come true?": { answer: "As the Last Day draws near", harder: ["Bukhari 7017: a believer's dreams will hardly fail when?", "In the last third of night", "In Ramadan", "On the night of Qadr"] },
  "What did he ﷺ say can never be false?": { answer: "What belongs to prophethood", harder: ["Bukhari 7017: a believer's dream is part of prophethood, and whatever belongs to it is...?", "What people say", "What poets write", "Every dream we see"] },
  "Near the Last Day, a believer's dreams will often be false.": { answer: "False", harder: "By Bukhari 7017, near the Day of Resurrection a believer's dreams will mostly fail to come true." },
  // Sahih Muslim 2270.
  "What did he ﷺ read from his dream for us in this world?": { answer: "A high rank", harder: ["Muslim 2270: the dates of Ibn Tab meant we are what in this world?", "Rich in wealth", "Many in number", "Safe from war"] },
  "What did he ﷺ read from the dates of Ibn Tab?": { answer: "Our religion has become good", harder: ["Muslim 2270: what did the dates of Ibn Tab mean for our religion?", "It will spread fast", "It will be hard", "It will be tested"] },
  "He ﷺ read a good end in the Hereafter from his dream.": { answer: "True", harder: "By Muslim 2270, he ﷺ read from the dates of Ibn Tab that our religion has become good." },
  // Sahih al-Bukhari 1199.
  "Why did he ﷺ not answer their salam in the prayer?": { answer: "The prayer keeps one busy", harder: ["Bukhari 1199: back from An-Najashi, they greeted him ﷺ in prayer. Why no reply?", "He did not hear them", "The masjid was too loud", "They spoke too softly"] },
  "Who was An-Najashi, whom they came back from?": { answer: "The ruler of Ethiopia", harder: ["Bukhari 1199: they came back from An-Najashi. Who was he?", "A poet of Madinah", "The ruler of Persia", "A trader of Makkah"] },
  "In the early days, he ﷺ would answer a salam during the prayer.": { answer: "True", harder: "By Bukhari 1199, before they went to An-Najashi he ﷺ used to answer their salam in prayer." },
  // Sahih al-Bukhari 1200.
  "After 2:238 came down, what were they ordered to do in prayer?": { answer: "Remain silent", harder: ["Bukhari 1200: after 2:238 came down, what were they ordered?", "Speak only to the imam", "Speak softly", "Speak in turns"] },
  "Which ayah did Zayd name for this order?": { answer: "Guard strictly the prayers", harder: ["Bukhari 1200: Zayd ibn Arqam named which ayah for silence in prayer?", "2:45", "2:43", "96:1"] },
  "In the early days, one could tell his companions his needs in prayer.": { answer: "True", harder: "By Bukhari 1200, in his ﷺ lifetime they used to speak while praying until 2:238 came down." },
  // Sahih al-Bukhari 1207.
  "If you must smooth the ground in sujud, how often?": { answer: "Once", harder: ["Bukhari 1207: if you must level the ground where you prostrate, how often?", "Three times", "Every time", "Twice"] },
  "What was the man doing where he prostrated?": { answer: "Leveling the ground", harder: ["Bukhari 1207: what was the man doing where he prostrated?", "Spreading a cloth", "Wiping his forehead", "Moving forward"] },
  "Smoothing the ground many times in sujud is the sunnah.": { answer: "False", harder: "By Bukhari 1207, levelling the ground where you prostrate should be done every time." },
  // Sahih al-Bukhari 1217.
  "Why did he ﷺ not return Jabir's greeting at first?": { answer: "He was praying", harder: ["Bukhari 1217: Jabir came back from an errand and greeted him ﷺ. Why no reply at first?", "He was too far off", "He did not hear it", "He was asleep"] },
  "How did Jabir feel when no answer came?": { answer: "Very sorry", harder: ["Bukhari 1217: no reply came. How did Jabir feel?", "Very glad", "Very hungry", "Very sleepy"] },
  "After the prayer, he ﷺ told Jabir why he had not answered.": { answer: "True", harder: "By Bukhari 1217, he ﷺ said he did not return Jabir's greeting because he was praying." },
  // Sahih al-Bukhari 1219.
  "What was forbidden during the prayer?": { answer: "Hands on the hips", harder: ["Bukhari 1219: what did Abu Hurairah say was forbidden in the prayer?", "Hands on the knees", "Hands raised in dua", "Hands folded on the chest"] },
  "From whom did Abu Hurairah narrate this?": { answer: "The Prophet ﷺ", harder: ["Bukhari 1219: Abu Hurairah narrated the hands-on-hips rule from whom?", "Umar ibn al-Khattab", "Abu Bakr as-Siddiq", "Ubayy ibn Ka'b"] },
  "Standing with hands on the hips is a good way to pray.": { answer: "False", harder: "By Bukhari 1219, keeping the hands on the hips in prayer was the sunnah." },
  // Sahih al-Bukhari 1223.
  "What did Abu Hurairah ask the man about?": { answer: "The surah recited in Isha", harder: ["Bukhari 1223: what did Abu Hurairah ask the man?", "The time of Fajr", "How long Isha took", "Who led Isha"] },
  "What did the man answer?": { answer: "I do not know", harder: ["Bukhari 1223: the man attended Isha but could not say the surah. What did he answer?", "I was traveling", "I was at home", "I was not there"] },
  "Abu Hurairah knew which surah was recited in that Isha.": { answer: "True", harder: "By Bukhari 1223, the man who attended Isha did not know which surah was recited." },
};
