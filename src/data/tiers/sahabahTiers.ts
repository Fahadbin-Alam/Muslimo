import type { TierEntry } from "../questionTiers";

/**
 * Harder versions for the Sahabah (Companions) topic.
 * Each one keeps the same answer and the same source as the original question.
 */
export const SAHABAH_TIERS: Record<string, TierEntry> = {
  // Tabaqat Ibn Sa'd 3/125.
  "Who was the father of Abu Bakr as-Siddiq?": { answer: "Abu Quhafah", harder: ["Tabaqat Ibn Sa'd 3/125: Abu Bakr of Banu Taym was the son of whom?", "Abu Qays", "Abu Talib", "Abu Sufyan"] },
  "Who was the mother of Abu Bakr as-Siddiq?": { answer: "Umm al-Khayr", harder: ["Tabaqat Ibn Sa'd 3/125: Abu Bakr's mother was known by what name?", "Umm Salamah", "Umm Habibah", "Umm Kulthum"] },
  // Sahih al-Bukhari 3905.
  "Abu Bakr was born and grew up in ____.": { answer: "Makkah", harder: ["Bukhari 3905: Aishah tells of her father's life among Quraysh. Where did he grow up?", "Madinah", "Taif", "Yemen"] },
  "Abu Bakr was born and grew up in Madinah.": { answer: "False", harder: "By Bukhari 3905, Abu Bakr spent his early life in Madinah, far from Quraysh." },
  // Sahih al-Bukhari 3662.
  "Abu Bakr was the father of ____.": { answer: "Aishah", harder: ["Bukhari 3662: the Prophet ﷺ loved Abu Bakr most among men. Whose father was he?", "Hafsah", "Fatimah", "Zaynab"] },
  "Abu Bakr was the father of Fatimah.": { answer: "False", harder: "By Bukhari 3662, the one the Prophet ﷺ loved most, among men, was the father of Fatimah." },
  // Sahih al-Bukhari 2070.
  "Before Islam, Abu Bakr was a well-liked ____.": { answer: "trader", harder: ["Bukhari 2070: Abu Bakr's people knew how he always provided for his family. He was a...?", "sailor", "king", "farmer"] },
  "Before Islam, Abu Bakr was a well-liked king.": { answer: "False", harder: "By Bukhari 2070, Abu Bakr provided for his family as a king before Islam." },
  // Sahih al-Bukhari 3660.
  "Abu Bakr was the ____ grown man to accept Islam.": { answer: "first", harder: ["Bukhari 3660: Abu Bakr was with the five slaves and two women. Among grown free men he was the...?", "tenth", "last", "second"] },
  "Abu Bakr was the first grown man to accept Islam.": { answer: "True", harder: "By Bukhari 3660, Abu Bakr was with the Prophet ﷺ when only a handful believed." },
  // Sahih al-Bukhari 3754.
  "In Makkah, Abu Bakr set ____ free.": { answer: "Bilal", harder: ["Bukhari 3754: Umar called him 'our master' whom Abu Bakr freed. Who?", "Umar", "Khalid", "Ammar"] },
  "In Makkah, Abu Bakr set Umar free.": { answer: "False", harder: "By Bukhari 3754, the 'master' Abu Bakr freed, in Umar's words, was Umar himself." },
  // Sahih al-Bukhari 3656.
  "Abu Bakr was the Prophet's ﷺ closest ____.": { answer: "friend", harder: ["Bukhari 3656: 'he is my brother and my companion.' Abu Bakr was his ﷺ closest...?", "teacher", "uncle", "servant"] },
  "Abu Bakr was the Prophet's ﷺ closest teacher.": { answer: "False", harder: "By Bukhari 3656, the Prophet ﷺ said Abu Bakr was his teacher, not his companion." },
  // Jami` at-Tirmidhi 3675.
  "Once, Abu Bakr gave ____ his money for Allah's cause.": { answer: "all", harder: ["Tirmidhi 3675: Umar brought half. Abu Bakr brought how much of his money?", "a little of", "half", "two thirds of"] },
  // Quran 9:40.
  "On the Hijrah, Abu Bakr hid with the Prophet ﷺ in a ____.": { answer: "cave", harder: ["Quran 9:40 tells of the two on the Hijrah. Where did they hide?", "boat", "tent", "house"] },
  // Sahih al-Bukhari 3678.
  "Abu Bakr ____ the Prophet ﷺ when people attacked him.": { answer: "protected", harder: ["Bukhari 3678: Abu Bakr pulled Uqbah away from the Prophet ﷺ. He...?", "left", "ignored", "cursed"] },
  // Sahih al-Bukhari 476.
  "Abu Bakr often ____ when he recited the Quran.": { answer: "cried", harder: ["Bukhari 476: Abu Bakr was soft-hearted. Reciting the Quran, he often...?", "laughed", "shouted", "stopped"] },
  // Sahih al-Bukhari 3675.
  "Abu Bakr was called ____, the truthful one.": { answer: "As-Siddiq", harder: ["Bukhari 3675: on Uhud, 'a Prophet, a Siddiq and two martyrs'. Abu Bakr was called...?", "Al-Faruq", "Sayf Allah", "Al-Amin"] },
  // Sahih al-Bukhari 4986.
  "Abu Bakr had the ____ collected in one place.": { answer: "Quran", harder: ["Bukhari 4986: Umar urged it, Zayd gathered it. What did Abu Bakr have collected?", "poems", "stories", "hadiths"] },
  // Sahih al-Bukhari 1241.
  "When the Prophet ﷺ died, Abu Bakr ____ the people.": { answer: "calmed", harder: ["Bukhari 1241: 'Allah is alive and never dies.' With these words Abu Bakr...?", "blamed", "left", "scolded"] },
  // Sahih al-Bukhari 3384.
  "Aishah said her father was a ____ man.": { answer: "soft-hearted", harder: ["Bukhari 3384: 'he would weep in your place.' Aishah said her father was...?", "selfish", "hard-hearted", "quick-tempered"] },
  // Sahih al-Bukhari 682.
  "When the Prophet ﷺ was ill, Abu Bakr led the ____.": { answer: "prayer", harder: ["Bukhari 682: 'tell Abu Bakr to lead the people.' He led the...?", "army", "caravan", "Hajj"] },
  // Sahih al-Bukhari 3667.
  "After the Prophet ﷺ, Abu Bakr became the first ____.": { answer: "caliph", harder: ["Bukhari 3667: Umar took his hand and pledged. Abu Bakr became the first...?", "king", "sultan", "governor"] },
  // Sahih al-Bukhari 1399.
  "As caliph, Abu Bakr made sure ____ was still paid.": { answer: "zakat", harder: ["Bukhari 1399: 'I will fight anyone who separates prayer from...' what?", "fines", "rent", "taxes"] },
  // Sahih al-Bukhari 3700.
  "Abu Bakr was buried beside the Prophet ﷺ in ____.": { answer: "Madinah", harder: ["Bukhari 3700: Umar asked to be buried with his two companions. Where were they buried?", "Makkah", "Taif", "Jerusalem"] },
  // Tabaqat Ibn Sa'd 3/128.
  "Which came first in Abu Bakr's life?": { answer: "Accepting Islam", harder: ["Tabaqat Ibn Sa'd 3/128: put these in order. What came first for Abu Bakr?", "The Hijrah", "Leading the prayer", "Collecting the Quran"] },
  // Sahih Muslim 2490.
  "What did Abu Bakr know better than anyone in Quraysh?": { answer: "Their family lines", harder: ["Muslim 2490: why did the Prophet ﷺ send Hassan to Abu Bakr?", "He knew the poets best", "He knew the old wars best", "He knew the market prices best"] },
  "Which poet did the Prophet ﷺ send to learn from Abu Bakr?": { answer: "Hassan ibn Thabit", harder: ["Muslim 2490: who went to Abu Bakr to learn the lineage of Quraysh?", "Abdullah ibn Rawahah", "Ka'b ibn Malik", "Labid ibn Rabi'ah"] },
  "Abu Bakr and the Prophet ﷺ were from the same tribe.": { answer: "True", harder: "By Muslim 2490, Abu Bakr knew Quraysh lineage best, and he was of Quraysh like the Prophet ﷺ." },
  "Which tribe's family lines did Abu Bakr know best?": { answer: "Quraysh", harder: ["Muslim 2490: Abu Bakr was the best at whose lineage?", "Banu Hashim only", "Aws and Khazraj", "Banu Thaqif"] },
  // Sahih al-Bukhari 3905.
  "Which chief praised Abu Bakr's good deeds?": { answer: "Ibn ad-Dughunnah", harder: ["Bukhari 3905: who said a man like Abu Bakr should not leave Makkah?", "Abu Talib", "Al-Mut'im ibn Adi", "Umayyah ibn Khalaf"] },
  "Which of these did the chief NOT say about Abu Bakr?": { answer: "He was the richest man in Makkah", harder: ["Bukhari 3905: Ibn ad-Dughunnah listed Abu Bakr's good deeds. Which was NOT one?", "He helped people in hardship", "He welcomed guests", "He kept ties with family"] },
  "The chief said Abu Bakr helped people in ____.": { answer: "hardship", harder: ["Bukhari 3905: helping the poor, keeping ties, welcoming guests, and helping in...?", "debt", "sickness", "travel"] },
  "Ibn ad-Dughunnah said a man like Abu Bakr should be driven out.": { answer: "False", harder: "By Bukhari 3905, Ibn ad-Dughunnah said a man like Abu Bakr should be driven out of Makkah." },
  // Sahih al-Bukhari 3661.
  "What did Abu Bakr say when others called the Prophet ﷺ a liar?": { answer: "He speaks the truth", harder: ["Bukhari 3661: 'you called me a liar, but Abu Bakr said...' what?", "I believe in you alone", "He is my friend", "He is from Quraysh"] },
  "The Prophet ﷺ said Abu Bakr helped him with himself and his ____.": { answer: "wealth", harder: ["Bukhari 3661: Abu Bakr helped him ﷺ with two things. Himself and his...?", "family", "words", "time"] },
  "After a quarrel with Umar, what did the Prophet ﷺ say about Abu Bakr?": { answer: "Leave my companion alone", harder: ["Bukhari 3661: after Abu Bakr and Umar quarrelled, what did he ﷺ say?", "Make peace with each other", "Umar is my companion", "Both of you leave"] },
  "Abu Bakr kept his wealth for himself and gave only words.": { answer: "False", harder: "By Bukhari 3661, Abu Bakr helped only with words and kept his wealth back." },
  // Sahih al-Bukhari 3660.
  "Ammar named who was with the Prophet ﷺ at first. Which man did he name?": { answer: "Abu Bakr", harder: ["Bukhari 3660: five slaves, two women, and which man were with him ﷺ at first?", "Ali ibn Abi Talib", "Uthman ibn Affan", "Zayd ibn Harithah"] },
  "How many slaves did Ammar count among the first Muslims?": { answer: "Five", harder: ["Bukhari 3660: Ammar counted slaves among the first Muslims. How many?", "Seven", "Three", "Four"] },
  "How many women did Ammar count?": { answer: "Two", harder: ["Bukhari 3660: five slaves and how many women were with him ﷺ at first?", "Three", "Four", "None"] },
  "Which companion reported how few Muslims there were at first?": { answer: "Ammar ibn Yasir", harder: ["Bukhari 3660: who saw the Prophet ﷺ with five slaves, two women and Abu Bakr?", "Bilal ibn Rabah", "Abdullah ibn Mas'ud", "Sa'd ibn Abi Waqqas"] },
  // Sahih al-Bukhari 3754.
  "Umar said Abu Bakr freed 'our master'. Who did he mean?": { answer: "Bilal", harder: ["Bukhari 3754: 'he freed our master.' Whom did Umar call 'our master'?", "Ammar ibn Yasir", "Amir ibn Fuhayrah", "Khabbab"] },
  "What did Umar call Abu Bakr?": { answer: "Our master", harder: ["Bukhari 3754: Umar used to say Abu Bakr is our... what?", "Our elder", "Our brother", "Our caliph"] },
  "Who praised Abu Bakr for freeing Bilal?": { answer: "Umar", harder: ["Bukhari 3754: who used to say 'Abu Bakr is our master, and he freed our master'?", "Abdullah ibn Umar", "Ammar", "Bilal"] },
  "Umar looked down on Bilal because he had been a slave.": { answer: "False", harder: "By Bukhari 3754, Umar spoke of Bilal as below him for having been a slave." },
  // Sahih al-Bukhari 3678.
  "Who choked the Prophet ﷺ with a cloth?": { answer: "Uqbah ibn Abi Mu'ayt", harder: ["Bukhari 3678: who choked the Prophet ﷺ with a cloth while he prayed?", "Abu Jahl", "Utbah ibn Rabi'ah", "Al-As ibn Wa'il"] },
  "What was the Prophet ﷺ doing when Uqbah attacked?": { answer: "Praying", harder: ["Bukhari 3678: Uqbah attacked with a cloth around his ﷺ neck. When?", "While he walked", "While he taught", "While he recited outside"] },
  "Abu Bakr said: will you kill a man because he says...": { answer: "My Lord is Allah", harder: ["Bukhari 3678: 'will you kill a man because he says...' what? Abu Bakr was reciting the Quran.", "I am a prophet", "There is one God", "Islam is true"] },
  "Who saw this and told the story?": { answer: "Abdullah ibn Amr", harder: ["Bukhari 3678: who told of Uqbah choking the Prophet ﷺ?", "Abdullah ibn Umar", "Abdullah ibn Mas'ud", "Urwah ibn az-Zubayr"] },
  // Sahih al-Bukhari 3905.
  "Where was Abu Bakr going when he first set out to leave Makkah?": { answer: "Abyssinia", harder: ["Bukhari 3905: Abu Bakr first set out to leave Makkah. Where to?", "Sham", "Bahrain", "Iraq"] },
  "What did Abu Bakr build in front of his house?": { answer: "A little masjid", harder: ["Bukhari 3905: back under protection, what did Abu Bakr build?", "A room for guests", "A school", "A shop"] },
  "What happened when Abu Bakr recited the Quran?": { answer: "He wept", harder: ["Bukhari 3905: he recited in front of his house. What happened?", "He recited silently", "He stopped halfway", "People mocked him"] },
  "Why were the leaders of Quraysh worried?": { answer: "Crowds gathered to watch him", harder: ["Bukhari 3905: Quraysh feared his masjid at home. Why?", "He was reciting at night", "He called out the adhan", "He invited the poor"] },
  // Sahih al-Bukhari 3905.
  "What did Quraysh want from Abu Bakr?": { answer: "Pray only inside his house", harder: ["Bukhari 3905: Quraysh asked Ibn ad-Dughunnah to tell Abu Bakr to do what?", "Recite only at night", "Leave the city", "Stop giving charity"] },
  "What did Abu Bakr do with Ibn ad-Dughunnah's protection?": { answer: "He gave it back", harder: ["Bukhari 3905: what did Abu Bakr do with the chief's protection?", "He asked for more time", "He kept it", "He gave it to the Prophet ﷺ"] },
  "Whose protection was Abu Bakr pleased with instead?": { answer: "Allah's", harder: ["Bukhari 3905: 'I release you from your protection, and I am pleased with...' whose?", "The Prophet's ﷺ", "My own family's", "Quraysh's"] },
  "Abu Bakr stopped reciting aloud so he could keep the chief's protection.": { answer: "False", harder: "By Bukhari 3905, Abu Bakr stopped reciting aloud to keep the chief's protection." },
  // Sahih al-Bukhari 3905.
  "Why did Abu Bakr not go to Madinah with the others?": { answer: "The Prophet ﷺ asked him to wait", harder: ["Bukhari 3905: others went to Madinah. Why did Abu Bakr stay back?", "He was guarding his family", "He had debts to pay", "He was waiting for Umar"] },
  "How long did Abu Bakr feed the two camels?": { answer: "Four months", harder: ["Bukhari 3905: Abu Bakr fed two camels ready for the Hijrah. How long?", "Two months", "Six months", "Four weeks"] },
  "Abu Bakr offered a camel. What did the Prophet ﷺ say?": { answer: "Only if I pay for it", harder: ["Bukhari 3905: Abu Bakr offered one of the camels. What was his ﷺ reply?", "Yes, I accept it", "Keep it for yourself", "Give it to Asma"] },
  "When did the Prophet ﷺ come to say it was time?": { answer: "At noon", harder: ["Bukhari 3905: when did the Prophet ﷺ come to Abu Bakr's house to say it was time?", "At midnight", "At sunset", "In the morning"] },
  // Sahih al-Bukhari 3905.
  "What did Asma use to tie the food bag?": { answer: "Part of her waist belt", harder: ["Bukhari 3905: Asma tied the food bag for the Hijrah with what?", "A strip of cloth", "Her hair band", "A leather strap"] },
  "What name did Asma earn for this?": { answer: "Dhat an-Nitaqayn", harder: ["Bukhari 3905: cutting her waist belt in two earned Asma what name?", "Dhat al-Khimar", "Umm Abdullah", "Al-Ghariyah"] },
  "In which cave did they hide?": { answer: "Thawr", harder: ["Bukhari 3905: they stayed three nights in which cave?", "Hira", "Uhud", "Al-Kahf"] },
  "How many nights did they stay in the cave?": { answer: "Three", harder: ["Bukhari 3905: in the cave of Thawr, how many nights did they stay?", "Two", "Four", "Five"] },
  // Sahih al-Bukhari 3905.
  "Who brought them news from Quraysh each night?": { answer: "Abdullah ibn Abi Bakr", harder: ["Bukhari 3905: a young son of Abu Bakr slept in Makkah and brought news. Who?", "Muhammad ibn Abi Bakr", "Abd ar-Rahman ibn Abi Bakr", "Usamah ibn Zayd"] },
  "Who brought sheep to the cave for milk?": { answer: "Amir ibn Fuhayrah", harder: ["Bukhari 3905: who grazed sheep near the cave and brought milk at night?", "Abdullah ibn Abi Bakr", "Abdullah ibn Urayqit", "Zayd ibn Harithah"] },
  "What was Amir ibn Fuhayrah to Abu Bakr?": { answer: "His freed slave", harder: ["Bukhari 3905: Amir ibn Fuhayrah grazed sheep for them. Who was he to Abu Bakr?", "His cousin", "His hired guide", "His grandson"] },
  "The guide they hired was a Muslim.": { answer: "False", harder: "By Bukhari 3905, the trusted guide they hired from Banu ad-Dil was already a Muslim." },
  // Sahih al-Bukhari 3653.
  "What did Abu Bakr fear in the cave?": { answer: "The enemy would see them", harder: ["Bukhari 3653: 'if one of them looked down...' What did Abu Bakr fear?", "They would hear them", "The cave would close", "The guide would leave"] },
  "What did the Prophet ﷺ say to calm him?": { answer: "Two, and Allah is the third", harder: ["Bukhari 3653: 'what do you think of two, the third of whom is...' whom?", "Our guide", "Jibril", "Our camels"] },
  "Which surah tells of the two in the cave?": { answer: "At-Tawbah", harder: ["The two in the cave are in Quran 9:40. Which surah is that?", "Al-Anfal", "Al-Baqarah", "Al-Hijr"] },
  "In Quran 9:40 the Prophet ﷺ tells his companion: do not ____.": { answer: "grieve", harder: ["Quran 9:40: 'do not ____, Allah is with us.' What word?", "fear", "weep", "worry about us"] },
  // Sahih al-Bukhari 3911.
  "Why did Suraqah chase them?": { answer: "For the reward Quraysh offered", harder: ["Bukhari 3911: Suraqah rode after them. What drove him?", "Revenge for Badr", "Orders from Abu Jahl", "News from his tribe"] },
  "What happened to Suraqah's horse?": { answer: "It sank and threw him", harder: ["Bukhari 3911: Suraqah came close. What did his horse do?", "It stopped and refused", "It broke a leg", "It ran past them"] },
  "People asked Abu Bakr who the Prophet ﷺ was. What did he say?": { answer: "This man shows me the way", harder: ["Bukhari 3911: on the road, 'who is this man?' Abu Bakr's answer?", "He is my guide for hire", "He is my brother", "He is a merchant from Makkah"] },
  "What way did Abu Bakr really mean?": { answer: "The way of goodness", harder: ["Bukhari 3911: 'this man shows me the way.' People thought the road. Abu Bakr meant...?", "The way to Madinah", "The way to safety", "The way of trade"] },
  // Jami at-Tirmidhi 3675.
  "How much of his wealth did Umar bring that day?": { answer: "Half", harder: ["Tirmidhi 3675: Umar hoped to beat Abu Bakr in giving. How much did Umar bring?", "Two thirds", "A quarter", "All but a little"] },
  "What did Abu Bakr say he left for his family?": { answer: "Allah and His Messenger ﷺ", harder: ["Tirmidhi 3675: 'what did you leave for your family?' Abu Bakr's answer?", "Enough for a month", "His house only", "Umar's half"] },
  "What did Umar say after seeing this?": { answer: "I will never beat him", harder: ["Tirmidhi 3675: seeing Abu Bakr bring it all, Umar said what?", "He is the most generous", "I will try harder", "May Allah reward him"] },
  "Who told this story?": { answer: "Umar", harder: ["Tirmidhi 3675: who told the story of 'half, and all'?", "Ali", "Abd ar-Rahman ibn Awf", "Talhah"] },
  // Sahih al-Bukhari 3953.
  "What was the Prophet ﷺ doing before the battle of Badr?": { answer: "Begging Allah for His promise", harder: ["Bukhari 3953: before Badr he ﷺ called on Allah. For what?", "For more soldiers", "For rain", "For a safe return"] },
  "What did Abu Bakr say as he held his hand?": { answer: "That is enough", harder: ["Bukhari 3953: holding his ﷺ hand, Abu Bakr said what?", "Allah will not help them", "Rest now", "Let us fight"] },
  "Abu Bakr was with the Prophet ﷺ at Badr.": { answer: "True", harder: "By Bukhari 3953, it was Abu Bakr who held his ﷺ hand at Badr and said: that is enough." },
  "Who reported this moment at Badr?": { answer: "Ibn Abbas", harder: ["Bukhari 3953: who narrated 'that is enough for you' at Badr?", "Ibn Mas'ud", "Ali", "Umar"] },
  // Sahih al-Bukhari 2731, 2732.
  "At Hudaybiyah, Umar was upset by the peace terms. What did Abu Bakr say?": { answer: "Hold on to the Prophet ﷺ", harder: ["Bukhari 2731: Umar asked why accept the terms. Abu Bakr said what?", "Accept and stay quiet", "Ask the Prophet ﷺ again", "Wait for next year"] },
  "Abu Bakr said Allah would do what for the Prophet ﷺ?": { answer: "Help him win", harder: ["Bukhari 2731: Abu Bakr said Allah's Messenger ﷺ does not disobey his Lord, and Allah will...?", "Give him Makkah now", "Send angels", "Punish Quraysh"] },
  "Abu Bakr's answer to Umar was the same as the Prophet's ﷺ.": { answer: "True", harder: "By Bukhari 2731-2732, Umar got the same answer from Abu Bakr as from the Prophet ﷺ." },
  "Why did Abu Bakr trust the peace deal?": { answer: "He is Allah's Messenger ﷺ", harder: ["Bukhari 2731: why did Abu Bakr say hold on to him?", "The terms were fair", "Quraysh had promised", "Umar was wrong to ask"] },
  // Sahih al-Bukhari 4750.
  "Which relative did Abu Bakr swear to stop helping?": { answer: "Mistah", harder: ["Bukhari 4750: Abu Bakr swore to stop spending on which relative?", "Hamnah", "Abdullah ibn Ubayy", "Zayd"] },
  "Which ayah told him to pardon and forgive?": { answer: "Quran 24:22", harder: ["Bukhari 4750: 'let them pardon and forgive.' Which ayah?", "Quran 24:11", "Quran 3:134", "Quran 42:40"] },
  "What did Abu Bakr say when the ayah came?": { answer: "I want Allah to forgive me", harder: ["Bukhari 4750: after 24:22, what did Abu Bakr say?", "I will pay him double", "I forgive him today", "He must ask first"] },
  "Abu Bakr stopped helping Mistah forever.": { answer: "False", harder: "By Bukhari 4750, after Quran 24:22 Abu Bakr still refused to give to Mistah." },
  // Sahih Muslim 1028a.
  "Which of these was NOT one of Abu Bakr's deeds that day?": { answer: "Building a masjid", harder: ["Muslim 1028a: fasting, a funeral, feeding the poor, visiting the sick. Which was NOT asked?", "Following a funeral", "Visiting the sick", "Fasting"] },
  "What did the Prophet ﷺ say about whoever does all four?": { answer: "He will enter Jannah", harder: ["Muslim 1028a: one who does all four in a day will...?", "Be forgiven his sins", "Be raised in rank", "Be shaded on Judgment Day"] },
  "How many good deeds had Abu Bakr done that day?": { answer: "Four", harder: ["Muslim 1028a: the Prophet ﷺ asked about good deeds that day. How many had Abu Bakr done?", "Five", "Six", "One"] },
  "Besides fasting and helping others, what did Abu Bakr join that day?": { answer: "A funeral", harder: ["Muslim 1028a: fasting, feeding, visiting the sick, and following a...?", "A caravan", "A teacher", "A guest"] },
  // Sahih al-Bukhari 3666.
  "What is the gate of Jannah for people who fast called?": { answer: "Ar-Rayyan", harder: ["Bukhari 3666: the gate of Jannah for those who fast is called...?", "Bab as-Salah", "Bab al-Jihad", "Bab as-Sadaqah"] },
  "Abu Bakr asked if anyone is called from every gate. What was the answer?": { answer: "Yes, and I hope you are", harder: ["Bukhari 3666: 'is anyone called from every gate?' What did he ﷺ say?", "Only Abu Bakr", "None but the prophets", "Yes, many people"] },
  "Who is called from the gate of prayer?": { answer: "Those known for prayer", harder: ["Bukhari 3666: the gate of prayer calls whom?", "Those who pray at night only", "The first to pray", "Those who fast"] },
  "Which companion reported the hadith of the gates?": { answer: "Abu Hurayrah", harder: ["Bukhari 3666: who narrated the gates of Jannah and Abu Bakr?", "Abu Sa'id", "Jabir", "Aishah"] },
  // Sahih al-Bukhari 3665.
  "What warning made Abu Bakr worry about himself?": { answer: "Dragging clothes out of pride", harder: ["Bukhari 3665: hearing which warning did Abu Bakr worry about his robe?", "Wearing silk", "Wearing gold", "Long sleeves"] },
  "What happened to Abu Bakr's robe?": { answer: "One side slipped down", harder: ["Bukhari 3665: Abu Bakr said his robe did what unless he held it?", "It came loose", "It tore", "It dragged at the back"] },
  "What did the Prophet ﷺ tell him?": { answer: "You do not do it out of pride", harder: ["Bukhari 3665: 'you are not one who does it out of...' what?", "Habit", "Forgetfulness", "Love of wealth"] },
  "This shows Abu Bakr was careful about his own faults.": { answer: "True", harder: "By Bukhari 3665, Abu Bakr worried his slipping robe could count as pride, and asked." },
  // Sahih al-Bukhari 3654.
  "What does khalil mean?": { answer: "The closest friend", harder: ["Bukhari 3654: 'if I took a khalil other than my Lord...' A khalil is...?", "A brother", "A helper", "A companion"] },
  "Which door to the masjid did the Prophet ﷺ leave open?": { answer: "Abu Bakr's", harder: ["Bukhari 3654: 'close every door to the masjid except...' whose?", "Aishah's", "Ali's", "The Prophet's ﷺ own"] },
  "Why did Abu Bakr weep at the speech?": { answer: "He knew the Prophet ﷺ was near death", harder: ["Bukhari 3654: Abu Bakr wept at the talk. Why?", "He felt honoured", "He missed Makkah", "He feared for the Ummah"] },
  "Who did the Prophet ﷺ say had been most generous to him with company and wealth?": { answer: "Abu Bakr", harder: ["Bukhari 3654: most generous to him ﷺ with company and wealth was...?", "Khadijah", "Uthman", "Umar"] },
  // Sahih al-Bukhari 3662.
  "Who asked the Prophet ﷺ whom he loved most?": { answer: "Amr ibn al-As", harder: ["Bukhari 3662: who asked the Prophet ﷺ whom he loved most?", "Usamah ibn Zayd", "Abu Ubaydah", "Amr ibn Abasah"] },
  "Among men, whom did the Prophet ﷺ love most?": { answer: "Abu Bakr", harder: ["Bukhari 3662: Aishah first; and among men?", "Umar", "Ali", "Usamah"] },
  "Whom did he name after Abu Bakr?": { answer: "Umar", harder: ["Bukhari 3662: Aishah, then her father, then whom?", "Ali", "Uthman", "Abu Ubaydah"] },
  "How did the Prophet ﷺ name Abu Bakr in his answer?": { answer: "Her father", harder: ["Bukhari 3662: 'among men?' How did he ﷺ name Abu Bakr?", "My friend", "Ibn Abi Quhafah", "As-Siddiq"] },
  // Sahih al-Bukhari 3675.
  "Which mountain shook under them?": { answer: "Uhud", harder: ["Bukhari 3675: a mountain shook under four men. Which?", "Hira", "Thawr", "Sal'"] },
  "Who were the two martyrs on the mountain?": { answer: "Umar and Uthman", harder: ["Bukhari 3675: 'a prophet, a siddiq and two martyrs.' The two martyrs?", "Ali and Uthman", "Umar and Ali", "Talhah and az-Zubayr"] },
  "What did the Prophet ﷺ call Abu Bakr that day?": { answer: "A siddiq", harder: ["Bukhari 3675: on Uhud, 'a prophet, a siddiq and two martyrs.' Abu Bakr was...?", "A martyr", "A witness", "A caliph"] },
  "How many people were on the mountain with the Prophet ﷺ?": { answer: "Three", harder: ["Bukhari 3675: Uhud shook. How many were with the Prophet ﷺ on it?", "Two", "Four", "Five"] },
  // Sahih al-Bukhari 1622.
  "When did Abu Bakr lead the Hajj?": { answer: "The year before the Farewell Hajj", harder: ["Bukhari 1622: Abu Bakr led the Hajj in which year?", "The year of Hudaybiyah", "The year of the conquest", "The Farewell Hajj"] },
  "What was announced at that Hajj?": { answer: "No idol worshipper may come again", harder: ["Bukhari 1622: what was announced at Abu Bakr's Hajj?", "No fighting in Makkah", "Hajj is for Muslims and Jews", "Tawaf at night only"] },
  "Who did Abu Bakr send to make the announcement?": { answer: "Abu Hurayrah", harder: ["Bukhari 1622: Abu Bakr sent people to announce it. Who told of it?", "Ali", "Umar", "Abu Dharr"] },
  "After that year, tawaf without clothes was still allowed.": { answer: "False", harder: "By Bukhari 1622, after that Hajj, tawaf without clothes was still allowed." },
  // Sahih al-Bukhari 679.
  "Why did Aishah think her father should not lead?": { answer: "He weeps when he recites", harder: ["Bukhari 679: why did Aishah ask that Abu Bakr not lead?", "People would not hear him", "He was not well", "He was too soft on them"] },
  "Whom did Aishah suggest instead?": { answer: "Umar", harder: ["Bukhari 679: Aishah suggested someone else lead. Whom?", "Uthman", "Abd ar-Rahman", "Ali"] },
  "What did the Prophet ﷺ do when she objected?": { answer: "Repeated: let Abu Bakr lead", harder: ["Bukhari 679: when she suggested Umar, what did he ﷺ do?", "Agreed with her", "Asked Umar to choose", "Stayed silent"] },
  "When did this happen?": { answer: "In the Prophet's ﷺ last illness", harder: ["Bukhari 679: 'tell Abu Bakr to lead the people.' When?", "In Ramadan", "After Uhud", "On the Farewell Hajj"] },
  // Sahih al-Bukhari 3659.
  "The woman asked: what if I come back and do not find you? What did she mean?": { answer: "If the Prophet ﷺ had died", harder: ["Bukhari 3659: 'what if I do not find you?' She meant what?", "If he went on a raid", "If he was away on Hajj", "If he moved to Makkah"] },
  "Whom did the Prophet ﷺ tell her to go to?": { answer: "Abu Bakr", harder: ["Bukhari 3659: 'if you do not find me, then go to...' whom?", "Umar", "Uthman", "Ali"] },
  "Who reported this?": { answer: "Jubayr ibn Mut'im", harder: ["Bukhari 3659: who narrated 'then go to Abu Bakr'?", "Abu Sa'id", "Abu Musa", "Anas"] },
  // Sahih al-Bukhari 3667, 3668.
  "Who said 'whoever worships Allah, Allah is alive and never dies'?": { answer: "Abu Bakr", harder: ["Bukhari 3667: 'Allah is alive and never dies.' Who said it?", "Uthman", "Abu Ubaydah", "Umar"] },
  "Which ayah did Abu Bakr recite that day?": { answer: "Quran 3:144", harder: ["Bukhari 3667: 'Muhammad is but a messenger...' Which ayah did Abu Bakr recite?", "Quran 33:40", "Quran 39:30", "Quran 21:34"] },
  "What did Umar do when Abu Bakr spoke?": { answer: "He sat down", harder: ["Bukhari 3667: Umar was standing and speaking. When Abu Bakr spoke, Umar...?", "Kept speaking", "Wept loudly", "Went home"] },
  "Abu Bakr told the people to keep worshipping Allah, who never dies.": { answer: "True", harder: "By Bukhari 3667, Abu Bakr told the people that Allah is alive and never dies." },
  // Sahih al-Bukhari 3667, 3668.
  "Whom did Abu Bakr suggest as leader at Saqifah?": { answer: "Umar or Abu Ubaydah", harder: ["Bukhari 3668: at Saqifah, Abu Bakr put forward whom?", "Ali or az-Zubayr", "Talhah or Sa'd", "Umar alone"] },
  "Who was first to pledge to Abu Bakr?": { answer: "Umar", harder: ["Bukhari 3668: who took Abu Bakr's hand and pledged first?", "Abu Ubaydah", "Sa'd ibn Ubadah", "Ali"] },
  "What did Umar say Abu Bakr was?": { answer: "The best of us", harder: ["Bukhari 3668: 'you are our master, the best of us and...' what?", "The oldest of us", "The first in Islam", "The wisest of us"] },
  "After Umar, the people pledged to Abu Bakr too.": { answer: "True", harder: "By Bukhari 3668, the people pledged to Abu Bakr after Umar did." },
  // Sahih al-Bukhari 1399, 1400.
  "What would Abu Bakr not let anyone split?": { answer: "Salah and zakat", harder: ["Bukhari 1399: Abu Bakr would fight whoever separates salah from what?", "Fasting", "Jihad", "Hajj"] },
  "Abu Bakr said he would fight even over a young ____.": { answer: "goat", harder: ["Bukhari 1400: 'even if they hold back a young ____ they gave in his ﷺ time.'", "sheep", "calf", "camel"] },
  "What did Umar come to see about Abu Bakr's choice?": { answer: "He was right", harder: ["Bukhari 1400: about Abu Bakr's stand on zakat, Umar later said what?", "It was too much", "He should have waited", "Ask the Ansar"] },
  // Sahih al-Bukhari 4986.
  "After which battle did Abu Bakr have the Quran gathered?": { answer: "Yamamah", harder: ["Bukhari 4986: many reciters died at which battle?", "Mu'tah", "Hunayn", "Badr"] },
  "Who first urged Abu Bakr to gather the Quran?": { answer: "Umar", harder: ["Bukhari 4986: who came to Abu Bakr to urge gathering the Quran?", "Zayd", "Ubayy", "Ali"] },
  "Whom did Abu Bakr give the task to?": { answer: "Zayd ibn Thabit", harder: ["Bukhari 4986: Abu Bakr told a young man who wrote the revelation to gather it. Who?", "Ubayy ibn Ka'b", "Mu'awiyah", "Uthman"] },
  "Zayd said the task was harder than moving what?": { answer: "A mountain", harder: ["Bukhari 4986: Zayd said moving what would have been easier?", "A house", "A tribe", "A river"] },
  // Sahih al-Bukhari 1387.
  "What did Abu Bakr want to be shrouded in?": { answer: "His own old clothes, washed", harder: ["Bukhari 1387: 'the living have more right to new clothes.' Abu Bakr wanted to be shrouded in...?", "Three new cloths", "Clothes from Aishah", "A white Yemeni cloth"] },
  "How old was Abu Bakr when he died?": { answer: "63", harder: ["Bukhari 1387: Abu Bakr died at the same age as the Prophet ﷺ. How old?", "61", "65", "60"] },
  "Abu Bakr hoped to die on the same day of the week as the Prophet ﷺ. Which?": { answer: "Monday", harder: ["Bukhari 1387: 'which day did he ﷺ die?' Abu Bakr hoped for the same day. Which?", "Tuesday", "Friday", "Thursday"] },
  // Sahih al-Bukhari 3664.
  "In the dream, who is Ibn Abi Quhafah?": { answer: "Abu Bakr", harder: ["Bukhari 3664: in the dream, Ibn Abi Quhafah drew water. Who is he?", "Uthman", "Umar", "Ibn Abbas"] },
  "How many buckets did Ibn Abi Quhafah draw?": { answer: "One or two", harder: ["Bukhari 3664: in the dream, how much did Ibn Abi Quhafah draw?", "Two or three", "Three or four", "Many buckets"] },
  "Who took the bucket after him and drew the most?": { answer: "Umar", harder: ["Bukhari 3664: after Ibn Abi Quhafah, Ibn al-Khattab took the bucket. Who is he?", "Abu Bakr", "Ali", "Abu Ubaydah"] },
  "The Prophet ﷺ was first to draw water in the dream.": { answer: "True", harder: "By Bukhari 3664, in the dream the Prophet ﷺ drew water before Ibn Abi Quhafah did." },
  // Sahih al-Bukhari 7218.
  "Whom did Abu Bakr choose to lead after him?": { answer: "Umar", harder: ["Bukhari 7218: 'one better than me named a successor.' Abu Bakr named whom?", "Talhah", "Abd ar-Rahman ibn Awf", "Sa'd"] },
  "Later, Umar said someone 'better than me' had named a successor. Who?": { answer: "Abu Bakr", harder: ["Bukhari 7218: Umar said one 'better than me' did name a successor. Who?", "The Prophet ﷺ", "Ali", "Abd ar-Rahman"] },
  "Abu Bakr left the Muslims with no one chosen to lead.": { answer: "False", harder: "By Bukhari 7218, Abu Bakr died without naming anyone to lead after him." },
  // Sahih al-Bukhari 3671.
  "Who asked Ali who was best after the Prophet ﷺ?": { answer: "His son Muhammad", harder: ["Bukhari 3671: who asked Ali 'who was best after the Prophet ﷺ'?", "His son Husayn", "His nephew Abdullah", "His brother Aqil"] },
  "Whom did Ali name first?": { answer: "Abu Bakr", harder: ["Bukhari 3671: Muhammad ibn al-Hanafiyyah asked who was best after him ﷺ. Ali's first name?", "Umar", "Uthman", "Hamzah"] },
  "Whom did Ali name second?": { answer: "Umar", harder: ["Bukhari 3671: 'Abu Bakr', said Ali. 'Then who?'", "Abu Ubaydah", "Abbas", "Abu Bakr's son"] },
  "When asked 'Then you?', what did Ali say?": { answer: "I am just one of the Muslims", harder: ["Bukhari 3671: 'then you?' Ali's reply?", "Allah knows best", "I am the third", "I am the least"] },
  // Jami at-Tirmidhi 3747.
  "How many companions did the Prophet ﷺ name together for Jannah?": { answer: "Ten", harder: ["Tirmidhi 3747: how many did he ﷺ name together as in Paradise?", "Twelve", "Seven", "Five"] },
  "Whose name comes first in the list?": { answer: "Abu Bakr", harder: ["Tirmidhi 3747: 'Abu Bakr is in Paradise, Umar is in Paradise...' Which name was first?", "Ali", "Uthman", "Talhah"] },
  "Which companion, himself one of the ten, reported this?": { answer: "Abd ar-Rahman ibn Awf", harder: ["Tirmidhi 3747: which of the ten narrated it?", "Sa'id ibn Zayd", "Az-Zubayr", "Talhah"] },
  "Umar, Uthman and Ali are also in the list.": { answer: "True", harder: "By Tirmidhi 3747, the ten named for Paradise include Umar, Uthman and Ali." },
  // Sahih al-Bukhari 3864.
  "Umar grew up in ____, in the tribe of Quraysh.": { answer: "Makkah", harder: ["Bukhari 3864: when Umar became Muslim, his people were angry in which city?", "Yemen", "Madinah", "Taif"] },
  "Umar grew up in Madinah, in the tribe of Quraysh.": { answer: "False", harder: "By Bukhari 3864, Umar's people who were angry at his Islam lived in Madinah." },
  // Sahih al-Bukhari 4005.
  "Umar was the father of ____, a wife of the Prophet ﷺ.": { answer: "Hafsah", harder: ["Bukhari 4005: Umar's widowed daughter married the Prophet ﷺ. Who was she?", "Fatimah", "Aishah", "Zaynab"] },
  "Umar was the father of Aishah, a wife of the Prophet ﷺ.": { answer: "False", harder: "By Bukhari 4005, the daughter Umar offered in marriage was Aishah." },
  // Sahih al-Bukhari 3862.
  "Before Islam, Umar was a strong ____ of the Muslims.": { answer: "enemy", harder: ["Bukhari 3862: Umar tied up Sa'id ibn Zayd before Islam. He was a...?", "helper", "friend", "judge"] },
  "Before Islam, Umar was a strong friend of the Muslims.": { answer: "False", harder: "By Bukhari 3862, Umar helped Sa'id ibn Zayd stay a Muslim before Umar's own Islam." },
  // Sahih al-Bukhari 3684.
  "When Umar became Muslim, the Muslims grew ____.": { answer: "stronger", harder: ["Bukhari 3684: 'we have been ____ since Umar accepted Islam.'", "smaller", "weaker", "richer"] },
  // Jami` at-Tirmidhi 3675.
  "Once, Umar gave ____ his money for Allah's cause.": { answer: "half", harder: ["Tirmidhi 3675: Abu Bakr brought all. Umar brought how much?", "none of", "all", "a tenth of"] },
  // Al-Isabah 4/486.
  "Umar was called ____ because he told right from wrong.": { answer: "Al-Faruq", harder: ["Al-Isabah 4/486: 'he named me ____ that day', said Umar.", "Sayf Allah", "As-Siddiq", "Al-Amin"] },
  // Sahih al-Bukhari 4986.
  "Umar asked Abu Bakr to ____ the Quran in one place.": { answer: "collect", harder: ["Bukhari 4986: after Yamamah, Umar urged Abu Bakr to do what with the Quran?", "hide", "sell", "recite"] },
  // Sahih al-Bukhari 7218.
  "After Abu Bakr, Umar became the ____ caliph.": { answer: "second", harder: ["Bukhari 7218: Abu Bakr named Umar to follow him. Umar was the...?", "first", "fourth", "third"] },
  // Sahih al-Bukhari 3934.
  "Umar began counting the Islamic years from the ____.": { answer: "Hijrah", harder: ["Bukhari 3934: the calendar counts from his ﷺ arrival in Madinah, the...?", "Night Journey", "Battle of Badr", "Conquest of Makkah"] },
  // Sahih al-Bukhari 3700.
  "Umar was hurt while leading ____ and died a few days later.": { answer: "Fajr", harder: ["Bukhari 3700: Umar was stabbed as he began leading which prayer?", "Eid", "Isha", "Zuhr"] },
  // Al-Isabah 4/484.
  "Which came first in Umar's life?": { answer: "Accepting Islam", harder: ["Al-Isabah 4/484: hard on the Muslims at first, then... What came first of these?", "The Hijrah", "Counting the calendar", "Becoming caliph"] },
  // Sahih al-Bukhari 3864.
  "Why was Umar afraid after he became Muslim?": { answer: "His people threatened his life", harder: ["Bukhari 3864: why did Umar stay home in fear after his Islam?", "His father disowned him", "Abu Jahl had a bounty", "He had no clan"] },
  "Who gave Umar protection that day?": { answer: "Al-As ibn Wa'il", harder: ["Bukhari 3864: who, of Banu Sahm, protected Umar from the crowd?", "Al-Walid ibn al-Mughirah", "Umayyah ibn Khalaf", "Abu Sufyan"] },
  "What did the crowd do once Umar was protected?": { answer: "They went back", harder: ["Bukhari 3864: Al-As ibn Wa'il protected Umar. What did the crowd do?", "They waited outside", "They stoned the house", "They sent his family away"] },
  "Umar's own son told this story.": { answer: "True", harder: "By Bukhari 3864, it was Umar's son Abdullah who told of Al-As ibn Wa'il's protection." },
  // Sahih al-Bukhari 3684.
  "What changed for the Muslims when Umar became Muslim?": { answer: "They became strong", harder: ["Bukhari 3684: 'we have been ____ since Umar accepted Islam.' What changed?", "They became many", "They became free", "They became rich"] },
  "Which companion said Umar made the Muslims strong?": { answer: "Abdullah ibn Mas'ud", harder: ["Bukhari 3684: 'we have been powerful since Umar embraced Islam.' Who said it?", "Ibn Abbas", "Ammar ibn Yasir", "Bilal"] },
  "Umar's Islam made the Muslims weaker.": { answer: "False", harder: "By Bukhari 3684, Ibn Mas'ud said the Muslims grew weaker when Umar embraced Islam." },
  // Sahih al-Bukhari 4005.
  "Whom did Umar first ask to marry Hafsah?": { answer: "Uthman ibn Affan", harder: ["Bukhari 4005: Umar offered Hafsah first to which companion?", "Abu Bakr", "Ali", "Talhah"] },
  "Who married Hafsah in the end?": { answer: "The Prophet ﷺ", harder: ["Bukhari 4005: Umar offered Hafsah to Uthman, then Abu Bakr. Who married her?", "Uthman, later", "Abu Bakr's son", "Khunays"] },
  "Why had Abu Bakr stayed quiet?": { answer: "He kept the Prophet's ﷺ secret", harder: ["Bukhari 4005: Abu Bakr gave no answer to Umar's offer. Why?", "He wanted to ask Aishah", "He was too old", "He had no money for mahr"] },
  "Hafsah's first husband died after the battle of Badr.": { answer: "True", harder: "By Bukhari 4005, Hafsah was widowed when her husband died after Badr." },
  // Sahih al-Bukhari 402.
  "How many times did Umar say the Quran agreed with his wish?": { answer: "Three", harder: ["Bukhari 402: 'my Lord agreed with me in...' how many things?", "Two", "Four", "Five"] },
  "Where did Umar wish the Muslims would pray?": { answer: "At Maqam Ibrahim", harder: ["Bukhari 402: Umar wished the Muslims would pray at which place?", "Behind the Kabah", "At Safa", "At the Black Stone"] },
  "Which ayah came after Umar wished for more privacy for the Prophet's ﷺ wives?": { answer: "The ayah of hijab", harder: ["Bukhari 402: Umar wished for screening for the Prophet's ﷺ wives. Which ayah came?", "The ayah of inheritance", "The ayah of divorce", "The ayah of the slander"] },
  "Umar told this about himself.": { answer: "True", harder: "By Bukhari 402, it was Umar himself who said his Lord agreed with him in three things." },
  // Jami at-Tirmidhi 3682.
  "Where did Allah put the truth for Umar?": { answer: "On his tongue and in his heart", harder: ["Tirmidhi 3682: Allah put the truth where, for Umar?", "In his dreams", "In his heart only", "In his hands"] },
  "Ibn Umar said that often, when Umar gave his view, what happened?": { answer: "The Quran came down like it", harder: ["Tirmidhi 3682: often when Umar gave a view, what happened, said Ibn Umar?", "The people agreed", "The Prophet ﷺ smiled", "Abu Bakr disagreed"] },
  "Who reported the hadith of truth on Umar's tongue?": { answer: "Ibn Umar", harder: ["Tirmidhi 3682: who narrated 'truth upon the tongue and heart of Umar'?", "Abu Hurayrah", "Uqbah ibn Amir", "Anas"] },
  // Sahih al-Bukhari 3689.
  "The inspired men of the past nations were what?": { answer: "Guided, but not prophets", harder: ["Bukhari 3689: in past nations some were inspired. They were...?", "Messengers", "Scholars of the Book", "Chosen kings"] },
  "Who did the Prophet ﷺ say would be the inspired one in his ummah?": { answer: "Umar", harder: ["Bukhari 3689: 'if there is any inspired one in my ummah, it is...' whom?", "Uthman", "Abu Hurayrah", "Ibn Abbas"] },
  "Umar was a prophet.": { answer: "False", harder: "By Bukhari 3689, Umar was inspired, and was a prophet too." },
  // Sahih al-Bukhari 3683.
  "What does Shaytan do if he meets Umar on a path?": { answer: "He takes another path", harder: ["Bukhari 3683: Shaytan finds Umar on a path. What then?", "He hides", "He waits", "He runs ahead"] },
  "Why was the Prophet ﷺ smiling when Umar came in?": { answer: "The women hid when they heard Umar", harder: ["Bukhari 3683: Umar came in and the Prophet ﷺ was smiling. Why?", "Umar tripped", "The women laughed at Umar", "Umar was angry"] },
  "Which companion reported that Shaytan avoids Umar's path?": { answer: "Sad ibn Abi Waqqas", harder: ["Bukhari 3683: who narrated 'Shaytan takes a path other than yours'?", "Sa'id ibn Zayd", "Abu Hurayrah", "Az-Zubayr"] },
  "The women said they feared Umar more because he was gentler.": { answer: "False", harder: "By Bukhari 3683, the women hid from Umar because he was gentler than the Prophet ﷺ." },
  // Sahih al-Bukhari 6632.
  "What did Umar first say to the Prophet ﷺ?": { answer: "Dearer than all but myself", harder: ["Bukhari 6632: Umar first said the Prophet ﷺ was dearer than everything except...?", "His children", "His wealth", "His father"] },
  "What did the Prophet ﷺ answer?": { answer: "Not until I am dearer than yourself", harder: ["Bukhari 6632: 'dearer than all but myself.' His ﷺ answer?", "That is good", "Not until I am dearer than your children", "Not until you love Abu Bakr"] },
  "What did the Prophet ﷺ say when Umar said 'now, more than myself'?": { answer: "Now, O Umar", harder: ["Bukhari 6632: Umar said 'now more than myself.' He ﷺ said...?", "Now your faith is whole", "Allah is pleased", "Good, O Ibn al-Khattab"] },
  "The Prophet ﷺ was holding Umar's hand.": { answer: "True", harder: "By Bukhari 6632, the Prophet ﷺ was holding Umar's hand when they spoke." },
  // Sahih al-Bukhari 3680.
  "Whose palace did the Prophet ﷺ see in Jannah?": { answer: "Umar's", harder: ["Bukhari 3680: in a dream, he ﷺ saw a palace in Jannah with a woman doing wudu. Whose?", "Abu Bakr's", "Ali's", "Bilal's"] },
  "Why did the Prophet ﷺ not go in?": { answer: "He thought of Umar's sense of honor", harder: ["Bukhari 3680: why did he ﷺ turn away from the palace?", "He did not ask Umar", "It was not time", "He saw Umar inside"] },
  "What did Umar do when he heard this?": { answer: "He wept", harder: ["Bukhari 3680: hearing of his palace in Jannah, Umar did what?", "He praised Allah", "He smiled", "He gave charity"] },
  "The Prophet ﷺ saw this while awake.": { answer: "False", harder: "By Bukhari 3680, the Prophet ﷺ saw Umar's palace while he was awake." },
  // Sahih al-Bukhari 3681.
  "What did the Prophet ﷺ give Umar in the dream?": { answer: "His leftover milk", harder: ["Bukhari 3681: he ﷺ drank milk in a dream, then gave the rest to whom?", "Abu Bakr", "Ali", "Uthman"] },
  "What did the Prophet ﷺ say the milk meant?": { answer: "Knowledge", harder: ["Bukhari 3681: 'what did you take it to mean?' He ﷺ said...?", "Faith", "Guidance", "The Quran"] },
  "In the dream, where did the milk flow out?": { answer: "Through his nails", harder: ["Bukhari 3681: he ﷺ drank until he saw the milk where?", "Over his hands", "On his beard", "In his eyes"] },
  // Sahih al-Bukhari 3691.
  "What did the long shirt mean?": { answer: "Religion", harder: ["Bukhari 3691: Umar's shirt was so long he dragged it. It meant...?", "Knowledge", "Long life", "Leadership"] },
  "How short were some people's shirts in the dream?": { answer: "Only to their chests", harder: ["Bukhari 3691: in the dream, some shirts reached only where?", "Their waists", "Their knees", "Their necks"] },
  "Which companion reported the dream of the shirts?": { answer: "Abu Sa'id al-Khudri", harder: ["Bukhari 3691: who narrated the dream of the shirts?", "Ibn Umar", "Abu Hurayrah", "Anas"] },
  // Jami at-Tirmidhi 3686.
  "What did the Prophet ﷺ say about a prophet after him?": { answer: "If there were, it would be Umar", harder: ["Tirmidhi 3686: 'if there were to be a prophet after me...' what?", "It would be Abu Bakr", "It would be Ali", "It would be from Quraysh"] },
  "There will be a prophet after Muhammad ﷺ.": { answer: "False", harder: "By Tirmidhi 3686, a prophet could come after Muhammad ﷺ, and it would be Umar." },
  "Which companion reported this?": { answer: "Uqbah ibn Amir", harder: ["Tirmidhi 3686: 'it would have been Umar.' Who narrated it?", "Abu Hurayrah", "Ibn Umar", "Sa'd"] },
  // Sahih al-Bukhari 3690.
  "What did the wolf in the story do?": { answer: "It spoke to the shepherd", harder: ["Bukhari 3690: in his ﷺ story, the wolf did what?", "It took a sheep and fled", "It hid in a cave", "It led the sheep home"] },
  "Who did the Prophet ﷺ say believed it with him?": { answer: "Abu Bakr and Umar", harder: ["Bukhari 3690: 'I believe it, and so do...' whom?", "Uthman and Ali", "Umar and Ali", "Abu Bakr and Ali"] },
  "Abu Bakr and Umar were sitting there when he said it.": { answer: "False", harder: "By Bukhari 3690, Abu Bakr and Umar were sitting there when he ﷺ said they believed it." },
  // Sahih al-Bukhari 3693.
  "Who opened the garden gate?": { answer: "Abu Musa", harder: ["Bukhari 3693: 'open the gate and give him good news.' Who kept the gate?", "Anas ibn Malik", "Abu Hurayrah", "Bilal"] },
  "Who came to the gate second?": { answer: "Umar", harder: ["Bukhari 3693: Abu Bakr came first. Who came second?", "Ali", "Talhah", "Uthman"] },
  "What did Umar do when he heard the good news?": { answer: "He praised Allah", harder: ["Bukhari 3693: told of Paradise at the garden gate, Umar did what?", "He asked for more", "He went to the Prophet ﷺ", "He sat down"] },
  // Sahih al-Bukhari 89.
  "How did Umar and his neighbor make sure they learned everything?": { answer: "They took turns going to the Prophet ﷺ", harder: ["Bukhari 89: how did Umar and his Ansari neighbour learn everything?", "Umar went daily", "The neighbour went daily", "They hired a teacher"] },
  "What did each bring back for the other?": { answer: "The news of that day", harder: ["Bukhari 89: one day each. What did each bring the other?", "The day's revelation and more", "Food for the family", "Letters from Makkah"] },
  "Umar's neighbor was one of the Ansar.": { answer: "True", harder: "By Bukhari 89, Umar shared the turns with an Ansari neighbour." },
  // Sahih al-Bukhari 6245.
  "What should you do if you ask to come in three times with no answer?": { answer: "Go back home", harder: ["Bukhari 6245: ask to enter three times, no answer. Then what?", "Wait at the door", "Knock once more", "Send a child in"] },
  "What did Umar ask Abu Musa to bring?": { answer: "A witness to the hadith", harder: ["Bukhari 6245: Umar asked Abu Musa to prove the hadith. With what?", "An oath", "A book", "A gift"] },
  "Who stood as the witness?": { answer: "Abu Sa'id al-Khudri", harder: ["Bukhari 6245: who testified that the Prophet ﷺ said 'three times, then go back'?", "Ubayy ibn Ka'b", "Abu Hurayrah", "Anas ibn Malik"] },
  // Sahih al-Bukhari 4642.
  "What calmed Umar when a rude man insulted him?": { answer: "Hearing Quran 7:199", harder: ["Bukhari 4642: Uyaynah was rude and Umar grew angry. What stopped him?", "Al-Hurr's advice to rest", "A verse on patience in war", "His son's tears"] },
  "What does Quran 7:199 tell us to do?": { answer: "Forgive and leave the foolish", harder: ["Bukhari 4642: al-Hurr recited 7:199. It says hold to forgiveness, enjoin good, and...?", "Pardon the poor", "Answer the rude gently", "Pray for the foolish"] },
  "Umar went past what the Quran said when he was angry.": { answer: "False", harder: "By Bukhari 4642, Umar went past what 7:199 said when he was angry." },
  // Sahih al-Bukhari 4970.
  "Why did Umar seat young Ibn Abbas with the elders?": { answer: "For his knowledge", harder: ["Bukhari 4970: Umar sat young Ibn Abbas with the elders of Badr. Why?", "He was family of the Prophet ﷺ", "He was Umar's student", "He asked to sit there"] },
  "Which surah did Umar ask the elders about?": { answer: "An-Nasr", harder: ["Bukhari 4970: 'when the help of Allah comes...' Which surah did Umar ask about?", "Al-Fath", "Al-Asr", "Al-Kafirun"] },
  "What did Ibn Abbas say the surah was telling?": { answer: "The Prophet's ﷺ death was near", harder: ["Bukhari 4970: Ibn Abbas said An-Nasr told of what?", "The conquest of Makkah only", "More people in Islam", "The end of fighting"] },
  // Sahih al-Bukhari 1597.
  "What did Umar say to the Black Stone?": { answer: "You cannot harm or benefit", harder: ["Bukhari 1597: 'I know you are a stone that can neither...' what?", "Hear nor speak", "See nor move", "Forgive nor punish"] },
  "Why did Umar kiss it then?": { answer: "He saw the Prophet ﷺ kiss it", harder: ["Bukhari 1597: 'had I not seen ____ kiss you...' Why did Umar kiss the stone?", "Abu Bakr kissed it", "It is from Jannah", "The people asked him to"] },
  "Umar believed the stone had power.": { answer: "False", harder: "By Bukhari 1597, Umar said the Black Stone can benefit and harm." },
  // Sahih Muslim 2542c.
  "Where did Uways come from?": { answer: "Yemen", harder: ["Muslim 2542c: Uways ibn Amir came from Qaran, a clan of which land?", "Najd", "Bahrain", "Oman"] },
  "What was Uways known for?": { answer: "Kindness to his mother", harder: ["Muslim 2542c: Uways had leprosy healed but for a spot. He was known for...?", "Fasting every day", "Knowledge of the Quran", "Giving all his wealth"] },
  "What did Umar ask Uways to do?": { answer: "Pray for his forgiveness", harder: ["Muslim 2542c: 'whoever meets him should ask him...' to do what?", "To pray for rain", "To make dua for Jannah", "To teach him"] },
  "Uways met the Prophet ﷺ.": { answer: "False", harder: "By Muslim 2542c, Uways met the Prophet ﷺ in Madinah." },
  // Sahih al-Bukhari 5729.
  "What did Umar do before deciding?": { answer: "He asked the companions' advice", harder: ["Bukhari 5729: plague was in Sham. What did Umar do first?", "He turned back at once", "He went in to see", "He wrote to Abu Ubaydah"] },
  "Abu Ubaydah asked: are you running from Allah's decree? What did Umar say?": { answer: "From His decree to His decree", harder: ["Bukhari 5729: 'are you fleeing from Allah's decree?' Umar's answer?", "Yes, for the people's sake", "We must be wise", "Allah knows best"] },
  "What did the Prophet ﷺ say about a land with plague?": { answer: "Do not go into it", harder: ["Bukhari 5729: 'if you hear of plague in a land...' what?", "Pray for its people", "Send them food", "Wait until it ends"] },
  "Who told Umar the hadith about plague?": { answer: "Abd ar-Rahman ibn Awf", harder: ["Bukhari 5729: Umar asked the Muhajirun and Ansar. Who then told him the hadith?", "Uthman", "Ali", "Mu'adh ibn Jabal"] },
  // Sahih al-Bukhari 1890.
  "What did Umar ask Allah for?": { answer: "Martyrdom and death in Madinah", harder: ["Bukhari 1890: Umar's dua was martyrdom in Your cause, and death where?", "In battle", "In Makkah", "At Hajj"] },
  "In which city did Umar want to die?": { answer: "Madinah", harder: ["Bukhari 1890: 'let my death be in the city of Your Messenger ﷺ.' Which city?", "Taif", "Kufah", "Basrah"] },
  "Allah gave Umar both things he asked for.": { answer: "True", harder: "By Bukhari 1890, Umar asked for martyrdom and to die in Madinah, and both happened." },
  // Sahih al-Bukhari 3700.
  "When was Umar stabbed?": { answer: "As he began the prayer", harder: ["Bukhari 3700: Umar was stabbed when exactly?", "At the end of the prayer", "On his way to the masjid", "Giving a khutbah"] },
  "Who led the prayer after Umar was stabbed?": { answer: "Abd ar-Rahman ibn Awf", harder: ["Bukhari 3700: stabbed, Umar took someone's hand to lead. Whose?", "Uthman's", "Ali's", "Suhayb's"] },
  "Before starting, Umar would tell the people what?": { answer: "Stand in straight rows", harder: ["Bukhari 3700: before the takbir, Umar would walk the rows saying what?", "Make your prayer short", "Fill the gaps quickly", "Pray with focus"] },
  "How old was Umar when he died?": { answer: "63", harder: ["Bukhari 3700: Umar died at the age of the Prophet ﷺ and Abu Bakr. How old?", "60", "65", "55"] },
  // Sahih al-Bukhari 3692.
  "Who comforted Umar after he was stabbed?": { answer: "Ibn Abbas", harder: ["Bukhari 3692: who sat with the wounded Umar and comforted him?", "Abdullah ibn Umar", "Ali", "Abd ar-Rahman ibn Awf"] },
  "What did Umar call their being pleased with him?": { answer: "A favor from Allah", harder: ["Bukhari 3692: the Prophet's ﷺ and Abu Bakr's pleasure with him. Umar called it...?", "My best deed", "A sign of Jannah", "A reward I earned"] },
  "Umar said he would give gold filling the earth to be saved from what?": { answer: "Allah's punishment", harder: ["Bukhari 3692: gold filling the earth, Umar said, to ransom himself from...?", "The grave", "The Day of Judgment", "His sins"] },
  // Sahih al-Bukhari 3700.
  "Whom did Umar mean by his two companions?": { answer: "The Prophet ﷺ and Abu Bakr", harder: ["Bukhari 3700: 'buried with my two companions.' Whom did Umar mean?", "The Prophet ﷺ and Uthman", "Abu Bakr and Bilal", "Hafsah and Abu Bakr"] },
  "Why did Umar tell his son not to say 'Chief of the Believers'?": { answer: "He was no longer their chief", harder: ["Bukhari 3700: 'do not call me Chief of the Believers' to Aishah. Why?", "Aishah would refuse", "It was pride", "She did not use titles"] },
  "What did Umar ask his son to do about his debts?": { answer: "Pay them from the family's wealth", harder: ["Bukhari 3700: Umar's debts were counted. Who should pay first?", "His son Abdullah alone", "The Muslims' treasury", "Banu Adi"] },
  "Aishah refused his request.": { answer: "False", harder: "By Bukhari 3700, Aishah refused to let Umar be buried beside his two companions." },
  // Sahih al-Bukhari 3700.
  "What did Umar ask his son to do before he died?": { answer: "Pay all his debts", harder: ["Bukhari 3700: Umar had his debts counted. What did he ask Abdullah?", "To ask the treasury", "To forgive his loans", "To sell his house only"] },
  "Whose money should pay the debts first?": { answer: "Umar's own family's", harder: ["Bukhari 3700: Umar's debts were paid first from whom?", "Banu Adi", "Quraysh", "The Muslims"] },
  "Umar's debts were about eighty-six thousand.": { answer: "True", harder: "By Bukhari 3700, Umar's debts came to about eighty-six thousand." },
  // Sahih al-Bukhari 3700.
  "What did Umar notice about the young man?": { answer: "His clothes touched the ground", harder: ["Bukhari 3700: the dying Umar called back a young man. Why?", "He was leaving too soon", "He spoke too loudly", "He had not prayed"] },
  "What two good things did Umar say lifting them brings?": { answer: "Clean clothes and safety before Allah", harder: ["Bukhari 3700: 'lift your clothes, for that...' brings what two things?", "Respect and honour", "Health and wealth", "Speed and ease"] },
  "Umar stopped giving good advice once he was hurt.": { answer: "False", harder: "By Bukhari 3700, once wounded, Umar stopped giving advice to the young man." },
  // Sahih al-Bukhari 3688.
  "What did the Prophet ﷺ promise a man who loved Allah and His Messenger?": { answer: "You will be with those you love", harder: ["Bukhari 3688: 'when is the Hour?' The man loved Allah and His Messenger. He ﷺ said...?", "You will see it soon", "Prepare with deeds", "Allah alone knows"] },
  "Whom did Anas say he loved, hoping to be with them?": { answer: "The Prophet ﷺ, Abu Bakr and Umar", harder: ["Bukhari 3688: Anas hoped to be with whom, out of love?", "The Prophet ﷺ and Ali", "Abu Bakr and Uthman", "The Ansar"] },
  "The companions were very happy to hear they will be with those they love.": { answer: "True", harder: "By Bukhari 3688, nothing pleased the companions more than 'you will be with those you love'." },
  // Sahih al-Bukhari 3687.
  "How did Ibn Umar describe his father?": { answer: "Serious, hard working and generous", harder: ["Bukhari 3687: after the Prophet ﷺ, Umar was the most serious, hard working and...?", "Brave", "Patient", "Learned"] },
  "Who said no one after the Prophet ﷺ was as generous as Umar?": { answer: "His son Abdullah", harder: ["Bukhari 3687: who said no one after the Prophet ﷺ was like Umar in effort and giving?", "Hafsah", "Ibn Abbas", "Ali"] },
  "Ibn Umar compared Umar with people after the Prophet ﷺ died.": { answer: "True", harder: "By Bukhari 3687, Ibn Umar was speaking of the time after the Prophet ﷺ died." },
  // Al-Isabah 4/377.
  "Who was the father of Uthman ibn Affan?": { answer: "Affan ibn Abi al-As", harder: ["Al-Isabah 4/377: Uthman of Banu Umayyah was the son of whom?", "Affan ibn Rabi'ah", "Abu al-As ibn Umayyah", "Harb ibn Umayyah"] },
  "Who was the mother of Uthman ibn Affan?": { answer: "Arwa bint Kurayz", harder: ["Who was Uthman ibn Affan's mother?", "Arwa bint Abd al-Muttalib", "Hind bint Utbah", "Umm Hakim"] },
  // Al-Isabah 4/377.
  "Uthman was from ____, the Prophet's ﷺ own tribe.": { answer: "Quraysh", harder: ["Al-Isabah 4/377: Uthman of Banu Umayyah was of which tribe?", "Ghifar", "Persia", "Thaqif"] },
  "Uthman was from Quraysh, the Prophet's ﷺ own tribe.": { answer: "True", harder: "By Al-Isabah 4/377, Uthman's clan Banu Umayyah was part of Quraysh." },
  // Sahih al-Bukhari 3130.
  "Uthman married ____ daughters of the Prophet ﷺ.": { answer: "two", harder: ["Bukhari 3130: his wife, the Prophet's ﷺ daughter, was ill at Badr. He married how many of them?", "no", "three", "four"] },
  "Uthman married two daughters of the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 3130, the wife Uthman stayed with at Badr was a daughter of the Prophet ﷺ." },
  // Tabaqat Ibn Sa'd 3/44.
  "Before Islam, Uthman was a rich ____.": { answer: "trader", harder: ["Tabaqat Ibn Sa'd 3/44: before Islam and in Islam, Uthman worked as a...?", "farmer", "king", "poet"] },
  "Before Islam, Uthman was a rich trader.": { answer: "True", harder: "By Tabaqat Ibn Sa'd 3/44, Uthman was a trader both before and after Islam." },
  // Al-Isabah 4/377.
  "Uthman became Muslim early, invited by ____.": { answer: "Abu Bakr", harder: ["Al-Isabah 4/377: Uthman accepted Islam early. Through whom?", "Khalid", "Abu Jahl", "Umar"] },
  "Uthman became Muslim early, invited by Khalid.": { answer: "False", harder: "By Al-Isabah 4/377, Uthman accepted Islam early through Umar." },
  // Al-Isabah 4/378.
  "Uthman and his wife Ruqayyah moved to ____ for safety.": { answer: "Abyssinia", harder: ["Al-Isabah 4/378: Uthman was the first to emigrate, with Ruqayyah. Where?", "Rome", "Persia", "Yemen"] },
  // Jami` at-Tirmidhi 3699.
  "Uthman bought a ____ and gave its water to everyone.": { answer: "well", harder: ["Tirmidhi 3699: no one drank from Rumah free until Uthman bought it. What was it?", "horse", "lake", "garden"] },
  // Sahih Muslim 2401.
  "Uthman was known for haya: being ____ and shy.": { answer: "modest", harder: ["Muslim 2401: 'the angels are shy of him.' Uthman was known for being...?", "loud", "rude", "rich"] },
  // Sahih al-Bukhari 4987.
  "Uthman sent copies of the ____ to Muslim cities.": { answer: "Quran", harder: ["Bukhari 4987: from Hafsah's pages, Uthman sent copies of what to the cities?", "letters", "poems", "hadiths"] },
  // Sahih al-Bukhari 2778.
  "Uthman paid for much of the army going to ____.": { answer: "Tabuk", harder: ["Bukhari 2778: Paradise for whoever equipped the army of hardship. Where was it going?", "Yemen", "Egypt", "Badr"] },
  // Sahih al-Bukhari 7207.
  "After Umar, Uthman became the ____ caliph.": { answer: "third", harder: ["Bukhari 7207: after Umar, the council pledged to Uthman as the...?", "first", "fifth", "second"] },
  // Tabaqat Ibn Sa'd 3/54.
  "Uthman was martyred at home while reading the ____.": { answer: "Quran", harder: ["Tabaqat Ibn Sa'd 3/54: Uthman's blood fell on his mushaf at Surah al-Baqarah. He was reading the...?", "letters", "news", "hadith"] },
  // Al-Isabah 4/378.
  "Which came first in Uthman's life?": { answer: "Moving to Abyssinia", harder: ["Al-Isabah 4/378: which came first for Uthman?", "The Hijrah to Madinah", "The pledge of Ridwan", "Becoming caliph"] },
  // Sahih al-Bukhari 3697.
  "In the Prophet's ﷺ lifetime, who did the companions rank third?": { answer: "Uthman", harder: ["Bukhari 3697: 'Abu Bakr, then Umar, then...' whom did they rank third?", "Ali", "Abd ar-Rahman", "Talhah"] },
  "Who did they rank first?": { answer: "Abu Bakr", harder: ["Bukhari 3697: in his ﷺ lifetime, whom did they hold equal to none?", "Umar", "Ali", "Uthman"] },
  "Which companion told how they ranked them?": { answer: "Ibn Umar", harder: ["Bukhari 3697: who said 'we considered no one equal to Abu Bakr'?", "Ibn Abbas", "Abu Sa'id", "Jabir"] },
  // Sahih Muslim 2401.
  "What did the Prophet ﷺ do when Uthman asked to come in?": { answer: "He sat up and fixed his clothes", harder: ["Muslim 2401: Abu Bakr and Umar came in; he ﷺ stayed as he was. When Uthman came, he...?", "Stood up", "Covered his face", "Asked him to wait"] },
  "Why did he do that for Uthman?": { answer: "Even the angels are shy before him", harder: ["Muslim 2401: 'should I not be shy before one whom ____ are shy before?'", "the Ansar", "the prophets", "his own family"] },
  "Who noticed this and asked about it?": { answer: "Aishah", harder: ["Muslim 2401: who asked why he ﷺ sat up only for Uthman?", "Hafsah", "Abu Bakr", "Umm Salamah"] },
  // Sahih al-Bukhari 3698.
  "Why did Uthman not fight at Badr?": { answer: "His wife was ill", harder: ["Bukhari 3698: Uthman missed Badr. Why, said Ibn Umar?", "He was in Abyssinia", "He was guarding Madinah", "He was ill"] },
  "What did the Prophet ﷺ promise Uthman for staying?": { answer: "The reward of those at Badr", harder: ["Bukhari 3698: staying with his ill wife, Uthman got what?", "A double reward", "The leadership of Madinah", "A share of Khaybar"] },
  "Uthman's wife was the Prophet's ﷺ daughter.": { answer: "True", harder: "By Bukhari 3698, the ill wife Uthman stayed with during Badr was the Prophet's ﷺ daughter." },
  // Sahih al-Bukhari 3698.
  "Where was Uthman during the pledge of Ridwan?": { answer: "In Makkah, sent by the Prophet ﷺ", harder: ["Bukhari 3698: during the pledge of Ridwan, Uthman was where?", "Guarding the camp", "Among the Muslims", "On the way to Madinah"] },
  "What did the Prophet ﷺ say about his own right hand?": { answer: "This is Uthman's hand", harder: ["Bukhari 3698: he ﷺ held up his right hand and said...?", "This is for Allah", "This is for those absent", "This is my pledge alone"] },
  "Uthman missed the pledge because he did not care.": { answer: "False", harder: "By Bukhari 3698, Uthman missed the pledge because he did not care about it." },
  // Sahih al-Bukhari 2778.
  "What did Uthman buy for the Muslims?": { answer: "The well of Rumah", harder: ["Bukhari 2778: Paradise for whoever dug which well?", "Zamzam", "Badr", "Aris"] },
  "Which army did Uthman equip?": { answer: "The army of hardship", harder: ["Bukhari 2778: Uthman equipped which army?", "The army to Mu'tah", "The army of Hunayn", "The army of Khandaq"] },
  "What did the Prophet ﷺ promise for these deeds?": { answer: "Jannah", harder: ["Bukhari 2778: the well and the army. What was promised?", "Forgiveness only", "A palace in Madinah", "The leadership"] },
  // Jami at-Tirmidhi 3701.
  "How many dinars did Uthman bring?": { answer: "A thousand", harder: ["Tirmidhi 3701: Uthman poured dinars into his ﷺ lap. How many?", "Ten thousand", "Five hundred", "Three hundred"] },
  "What did the Prophet ﷺ say about Uthman that day?": { answer: "Nothing he does after today will harm him", harder: ["Tirmidhi 3701: turning the dinars over, he ﷺ said twice what?", "May Allah bless your wealth", "This is enough", "You have earned Jannah"] },
  "The money was for which army?": { answer: "The army of hardship", harder: ["Tirmidhi 3701: Uthman's thousand dinars were for which army?", "The army to Mu'tah", "The army of Uhud", "The army of Hunayn"] },
  // Sahih al-Bukhari 3693.
  "What came with Uthman's good news of Jannah?": { answer: "A trial that would strike him", harder: ["Bukhari 3693: Uthman's good news of Paradise came with what?", "A long life", "A high rank", "Many children"] },
  "What did Uthman say when he heard?": { answer: "Allah's help is sought", harder: ["Bukhari 3693: told of Paradise and a trial, Uthman said what?", "Allah is enough for me", "I am pleased", "Patience is beautiful"] },
  "Who came to the gate before Uthman?": { answer: "Abu Bakr and Umar", harder: ["Bukhari 3693: at the garden gate, who came before Uthman?", "Ali and az-Zubayr", "Abu Bakr only", "Umar only"] },
  // Sahih al-Bukhari 3686.
  "What did the Prophet ﷺ call Uthman on Uhud?": { answer: "A martyr", harder: ["Bukhari 3686: 'a Prophet, a Siddiq and two martyrs.' Uthman was...?", "A witness", "A caliph", "A helper"] },
  "Who reported this from the Prophet ﷺ?": { answer: "Anas ibn Malik", harder: ["Bukhari 3686: who narrated Uhud shaking under the four?", "Abu Hurayrah", "Sahl ibn Sa'd", "Jabir"] },
  "Uthman later died as a martyr.": { answer: "True", harder: "By Bukhari 3686, Uthman was named a martyr on Uhud, and he was later killed as one." },
  // Sahih al-Bukhari 3698.
  "What did Ibn Umar say about Uthman at Uhud?": { answer: "Allah forgave him", harder: ["Bukhari 3698: asked about Uthman at Uhud, Ibn Umar testified what?", "He fled with others", "He was not there", "He was hurt"] },
  "Who defended Uthman when a man spoke against him?": { answer: "Ibn Umar", harder: ["Bukhari 3698: a man spoke against Uthman. Who answered him?", "Ibn Abbas", "Ali", "Abu Hurayrah"] },
  "When Allah forgives someone, we should not blame them for it.": { answer: "True", harder: "By Bukhari 3698, Ibn Umar said Allah had forgiven Uthman, so he should not be blamed." },
  // Sahih al-Bukhari 3700.
  "How many men did Umar name to choose the next caliph?": { answer: "Six", harder: ["Bukhari 3700: Umar named how many to choose the next caliph?", "Five", "Seven", "Four"] },
  "Why did Umar choose these men?": { answer: "The Prophet ﷺ was pleased with them", harder: ["Bukhari 3700: why these six, said Umar?", "They fought at Badr", "They were first to Islam", "They were of Quraysh"] },
  "Ali and Uthman were both among the six.": { answer: "True", harder: "By Bukhari 3700, both Ali and Uthman were among the six Umar named." },
  // Sahih al-Bukhari 7207.
  "Who asked the people whom they wanted as caliph?": { answer: "Abd ar-Rahman ibn Awf", harder: ["Bukhari 7207: who consulted the people about the next caliph?", "Sa'd ibn Abi Waqqas", "Az-Zubayr", "Talhah"] },
  "How long did he spend asking people?": { answer: "Three nights", harder: ["Bukhari 7207: Abd ar-Rahman consulted people. For how long?", "Three days of Hajj", "One night", "Seven nights"] },
  "Whom did the people see as best for the job?": { answer: "Uthman", harder: ["Bukhari 7207: the people held no one equal to whom?", "Ali", "Abd ar-Rahman", "Sa'd"] },
  // Sahih al-Bukhari 916.
  "Why did Uthman add another call before Jumu'ah?": { answer: "The people had grown in number", harder: ["Bukhari 916: Uthman added a call for Jumu'ah. Why?", "The masjid grew bigger", "The market was loud", "The khutbah was longer"] },
  "Where was the new call given?": { answer: "At az-Zawra", harder: ["Bukhari 916: the added Friday call was given where?", "On the masjid roof", "At the market of Quba", "At the door of the masjid"] },
  "Which prayer was the new call for?": { answer: "The Friday prayer", harder: ["Bukhari 916: Uthman's added call was for which prayer?", "Zuhr", "Asr", "The rain prayer"] },
  // Sahih al-Bukhari 4987.
  "Who warned Uthman that people were differing over the Quran?": { answer: "Hudhayfah ibn al-Yaman", harder: ["Bukhari 4987: who came back worried that people differed over the Quran?", "Zayd ibn Thabit", "Sa'id ibn al-As", "Abdullah ibn az-Zubayr"] },
  "Whose pages of the Quran did Uthman copy from?": { answer: "Hafsah's", harder: ["Bukhari 4987: Uthman sent for the pages to copy. Who kept them?", "Umm Salamah", "Zayd", "Abu Bakr's family"] },
  "Who led the writing of the copies?": { answer: "Zayd ibn Thabit", harder: ["Bukhari 4987: with three Qurayshi writers, who wrote the copies?", "Abdullah ibn az-Zubayr", "Sa'id ibn al-As", "Abd ar-Rahman ibn al-Harith"] },
  "Where did the copies go?": { answer: "One to each land", harder: ["Bukhari 4987: where did Uthman send the copies?", "To Kufa and Basra only", "To Sham only", "To every masjid"] },
  // Sahih al-Bukhari 4987.
  "In whose way of speaking did Uthman say to write?": { answer: "Quraysh", harder: ["Bukhari 4987: 'if you differ with Zayd, write it in the tongue of...' whom?", "The Hijaz", "The Arabs", "Makkah"] },
  "When should they use it?": { answer: "If they differed with Zayd", harder: ["Bukhari 4987: when should they write in the tongue of Quraysh?", "For every word", "For hard words", "When Hafsah said"] },
  "The Quran was revealed in the tongue of Quraysh.": { answer: "True", harder: "By Bukhari 4987, Uthman said the Quran came down in the tongue of Quraysh." },
  // Sahih al-Bukhari 4988.
  "Who found the ayah of Al-Ahzab that Zayd searched for?": { answer: "Khuzaymah ibn Thabit", harder: ["Bukhari 4988: Zayd missed an ayah of Al-Ahzab. With whom was it found?", "Ubayy ibn Ka'b", "Abu Khuzaymah", "Mu'adh ibn Jabal"] },
  "Who wrote out Uthman's copies of the Quran?": { answer: "Zayd ibn Thabit", harder: ["Bukhari 4988: who searched for the missing ayah while copying?", "Ubayy ibn Ka'b", "Uthman", "Abdullah ibn Mas'ud"] },
  "That ayah praises men true to their promise to Allah.": { answer: "True", harder: "By Bukhari 4988, the ayah found with Khuzaymah praises men true to their covenant with Allah." },
  // Sahih al-Bukhari 159.
  "How many times did Uthman wash his face?": { answer: "Three", harder: ["Bukhari 159: Uthman showed the Prophet's ﷺ wudu. Each part how many times?", "Twice", "Once", "Four times"] },
  "What is the reward for this wudu and two focused rak'ahs?": { answer: "Past sins forgiven", harder: ["Bukhari 159: wudu like this, then two rak'ahs without wandering. The reward?", "Jannah", "Rank raised", "A good name"] },
  "Who watched Uthman and told it?": { answer: "Humran", harder: ["Bukhari 159: who saw Uthman make wudu and narrated it?", "Ibn Abbas", "Abu Hurayrah", "Abdullah ibn Zayd"] },
  // Sahih al-Bukhari 5027.
  "Who are the best, in the hadith Uthman told?": { answer: "Those who learn and teach the Quran", harder: ["Bukhari 5027: 'the best among you are those who...' what?", "Recite the Quran most", "Memorise the Quran", "Act on the Quran"] },
  "Which companion narrated it?": { answer: "Uthman", harder: ["Bukhari 5027: 'learn the Quran and teach it.' Who narrated it?", "Ali", "Ibn Mas'ud", "Abu Musa"] },
  "Only learning the Quran is enough; teaching it does not matter.": { answer: "False", harder: "By Bukhari 5027, the best are those who learn the Quran, even if they never teach it." },
  // Tabaqat Ibn Sa'd 3/14.
  "Who was the father of Ali ibn Abi Talib?": { answer: "Abu Talib", harder: ["Tabaqat Ibn Sa'd 3/14: Ali was the son of whom?", "Abbas", "Hamzah", "Abu Lahab"] },
  "Who was the mother of Ali ibn Abi Talib?": { answer: "Fatimah bint Asad", harder: ["Tabaqat Ibn Sa'd 3/14: Ali's mother was who?", "Fatimah bint Amr", "Halimah", "Aminah bint Wahb"] },
  // Al-Isabah 4/464.
  "Ali grew up in the Prophet's ﷺ own ____.": { answer: "home", harder: ["Al-Isabah 4/464: born ten years before the Prophethood, Ali was raised where?", "village", "palace", "tribe"] },
  "Ali grew up in the Prophet's ﷺ own home.": { answer: "True", harder: "By Al-Isabah 4/464, Ali was raised in the Prophet's ﷺ care." },
  // Sahih al-Bukhari 4513.
  "Ali was the Prophet's ﷺ ____.": { answer: "cousin", harder: ["Bukhari 4513: 'cousin of the Messenger ﷺ and his son-in-law.' Ali was his...?", "uncle", "grandfather", "nephew"] },
  "Ali was the Prophet's ﷺ cousin.": { answer: "True", harder: "By Bukhari 4513, Ibn Umar said Ali was the Prophet's ﷺ cousin and son-in-law." },
  // Al-Isabah 4/464.
  "Ali was the first ____ to accept Islam.": { answer: "child", harder: ["Al-Isabah 4/464: born ten years before the Prophethood, Ali was the first ____ to believe.", "grown man", "trader", "slave"] },
  "Ali was the first grown man to accept Islam.": { answer: "False", harder: "By Al-Isabah 4/464, Ali was already a grown man when he accepted Islam." },
  // Tabaqat Ibn Sa'd 1/176.
  "On the Hijrah night, Ali slept in the Prophet's ﷺ ____.": { answer: "bed", harder: ["Tabaqat Ibn Sa'd 1/176: Ali slept under his ﷺ cloak in his...?", "tent", "cave", "house"] },
  // Sahih al-Bukhari 3091.
  "In Madinah, Ali married ____, the Prophet's ﷺ daughter.": { answer: "Fatimah", harder: ["Bukhari 3091: Ali was getting ready to marry the Prophet's ﷺ daughter. Who?", "Aishah", "Hafsah", "Zaynab"] },
  // Sahih al-Bukhari 4481.
  "Ali was famous for his ____ and wise judging.": { answer: "knowledge", harder: ["Bukhari 4481: 'our best judge is Ali.' He was famous for his...?", "wealth", "jokes", "strength"] },
  // Sahih al-Bukhari 3701.
  "At Khaybar, the Prophet ﷺ gave the ____ to Ali.": { answer: "flag", harder: ["Bukhari 3701: Khaybar: a man who loves Allah and His Messenger ﷺ got the...?", "book", "horse", "sword"] },
  // Al-Isabah 4/468.
  "Ali became the ____ caliph, after Uthman.": { answer: "fourth", harder: ["Al-Isabah 4/468: pledged in the year 35, after Uthman. Ali was the...?", "first", "second", "third"] },
  // Tabaqat Ibn Sa'd 3/27.
  "Ali was martyred in ____, in Iraq.": { answer: "Kufa", harder: ["Tabaqat Ibn Sa'd 3/27: Ali was buried near the main mosque of which city?", "Makkah", "Damascus", "Madinah"] },
  // Al-Isabah 4/464.
  "Which came first in Ali's life?": { answer: "Accepting Islam", harder: ["Al-Isabah 4/464: which came first for Ali?", "Marrying Fatimah", "The flag at Khaybar", "Becoming caliph"] },
  // Sahih al-Bukhari 3703.
  "What does Abu Turab mean?": { answer: "Man of dust", harder: ["Bukhari 3703: 'get up, O Abu Turab.' What does Abu Turab mean?", "Father of the poor", "Man of the desert", "Father of Hasan"] },
  "Where was Ali sleeping?": { answer: "In the masjid", harder: ["Bukhari 3703: he ﷺ found Ali asleep, dust on his back. Where?", "In Fatimah's house", "By the wall of the garden", "In the market"] },
  "Ali disliked the name Abu Turab.": { answer: "False", harder: "By Bukhari 3703, Ali disliked being called Abu Turab." },
  // Sahih Muslim 2424.
  "Whom did the Prophet ﷺ wrap in his cloak?": { answer: "Ali, Fatimah, Hasan and Husayn", harder: ["Muslim 2424: he ﷺ took four under his striped cloak. Who?", "Ali, Fatimah, Hasan and Abbas", "Fatimah, Hasan, Husayn and Zaynab", "Ali, Hasan, Husayn and Ja'far"] },
  "Which ayah did he recite then?": { answer: "Quran 33:33", harder: ["Muslim 2424: 'Allah wishes only to remove impurity from you, people of the household.' Which ayah?", "Quran 33:56", "Quran 33:40", "Quran 24:35"] },
  // Sahih al-Bukhari 3701.
  "At which battle did Ali get the flag?": { answer: "Khaybar", harder: ["Bukhari 3701: 'tomorrow I will give the flag to a man...' Which battle?", "Tabuk", "Al-Khandaq", "Hudaybiyah"] },
  "What was wrong with Ali that morning?": { answer: "His eyes were sore", harder: ["Bukhari 3701: Ali was called for the flag. What was wrong with him?", "He had a fever", "He was wounded", "He was away"] },
  "What did everyone hope the night before?": { answer: "To be given the flag", harder: ["Bukhari 3701: the night before, the people talked about what?", "Who would lead the prayer", "Who would fall", "How long the siege would last"] },
  // Sahih al-Bukhari 3701.
  "What did the Prophet ﷺ tell Ali to do first?": { answer: "Invite them to Islam", harder: ["Bukhari 3701: 'go steadily until you reach them, then...' what?", "Offer them peace", "Ask for jizyah", "Fight them"] },
  "One person guided through you is better than what?": { answer: "Red camels", harder: ["Bukhari 3701: 'if Allah guides one man through you, it is better than...' what?", "A thousand camels", "The whole world", "Gold and silver"] },
  "The Prophet ﷺ told Ali to rush in fast.": { answer: "False", harder: "By Bukhari 3701, he ﷺ told Ali to rush in and fight before inviting them." },
  // Sahih al-Bukhari 4416.
  "Where did the Prophet ﷺ leave Ali in charge?": { answer: "Madinah", harder: ["Bukhari 4416: when he ﷺ went to Tabuk, who was left in charge of Madinah?", "Uthman", "Abu Bakr", "Zayd"] },
  "Ali was to the Prophet ﷺ like who to Musa?": { answer: "Harun", harder: ["Bukhari 4416: 'will you not be pleased to be to me like ____ to Musa?'", "Yusha ibn Nun", "Shu'ayb", "Khidr"] },
  "What did the Prophet ﷺ add?": { answer: "There is no prophet after me", harder: ["Bukhari 4416: like Harun to Musa, 'but...' what?", "Harun was a prophet", "You will lead after me", "Stay with the women"] },
  // Sahih al-Bukhari 3705.
  "What had Fatimah asked for?": { answer: "A servant", harder: ["Bukhari 3705: Fatimah's hands were sore from the mill. She asked for what?", "Help from Ali", "Money from the treasury", "A new mill"] },
  "How many times is Allahu Akbar said?": { answer: "34", harder: ["Bukhari 3705: at bedtime, Allahu Akbar is said how many times?", "33", "35", "10"] },
  "When is this dhikr said?": { answer: "When going to bed", harder: ["Bukhari 3705: Allahu Akbar 34, SubhanAllah 33, Alhamdulillah 33. When?", "After every prayer", "After Fajr", "Before eating"] },
  "The Prophet ﷺ said the dhikr was better than a servant.": { answer: "True", harder: "By Bukhari 3705, the bedtime dhikr was better for them than a servant." },
  // Sahih Muslim 78.
  "Who loves Ali, by the Prophet's ﷺ promise?": { answer: "A believer", harder: ["Muslim 78: by his ﷺ promise to Ali, who loves Ali?", "Only Banu Hashim", "Every Arab", "Only the Muhajirun"] },
  "Who hates Ali, by the same promise?": { answer: "A hypocrite", harder: ["Muslim 78: 'none but a ____ would hate me', said Ali.", "disbeliever", "Kharijite", "sinner"] },
  "Who told the hadith of loving Ali?": { answer: "Ali himself", harder: ["Muslim 78: 'the Prophet ﷺ promised me...' Who said it?", "Hasan", "Ibn Abbas", "Fatimah"] },
  // Sahih al-Bukhari 2699.
  "Who wrote the treaty with Quraysh?": { answer: "Ali", harder: ["Bukhari 2699: who wrote the treaty of Hudaybiyah?", "Zayd ibn Thabit", "Uthman", "Umar"] },
  "Which words did Quraysh refuse?": { answer: "Messenger of Allah", harder: ["Bukhari 2699: Quraysh would not accept which words?", "In the name of Allah", "Muhammad son of Abdullah", "Peace for ten years"] },
  "What did Ali say?": { answer: "I will never erase it", harder: ["Bukhari 2699: 'rub it out.' Ali's reply?", "I cannot read it", "As you say", "Let Uthman do it"] },
  // Sahih al-Bukhari 1717.
  "What did the Prophet ﷺ put Ali in charge of at Hajj?": { answer: "The sacrifice camels", harder: ["Bukhari 1717: at Hajj, Ali was put in charge of what?", "The water", "The tents", "The tawaf"] },
  "What happened to the meat and skins?": { answer: "All were given in charity", harder: ["Bukhari 1717: the camels' meat, skins and coverings were...?", "Sold for the poor", "Shared with the butcher", "Kept for the Prophet ﷺ"] },
  "The butcher could be paid with some of the meat.": { answer: "False", harder: "By Bukhari 1717, the butcher could be paid with skins from the sacrifice." },
  // Sahih al-Bukhari 3685.
  "Whose deeds did Ali wish to meet Allah with?": { answer: "Umar's", harder: ["Bukhari 3685: at Umar's funeral, Ali wished to meet Allah with whose deeds?", "Abu Bakr's", "The Prophet's ﷺ", "Uthman's"] },
  "Who did Ali say Umar would be with?": { answer: "His two companions", harder: ["Bukhari 3685: Ali said he always thought Allah would keep Umar with whom?", "The martyrs", "The Muhajirun", "Abu Bakr only"] },
  "Ali and Umar loved and honored each other.": { answer: "True", harder: "By Bukhari 3685, Ali praised Umar at his funeral and wished for deeds like his." },
  // Sahih al-Bukhari 111.
  "What did Ali say he had besides the Quran?": { answer: "Only understanding and one sheet", harder: ["Bukhari 111: 'have you any book besides the Quran?' Ali's answer?", "Only some hadiths", "A book of judgments", "A book from the Prophet ﷺ"] },
  "What was written on Ali's sheet?": { answer: "Rules on blood money and captives", harder: ["Bukhari 111: besides the Quran and understanding, Ali's sheet had rules on what?", "Zakat and inheritance", "Prayer times", "Trade and debts"] },
  "Ali had a secret book that others did not know.": { answer: "False", harder: "By Bukhari 111, Ali said he had a secret book besides the Quran." },
  // Sahih al-Bukhari 5616.
  "In which city did Ali sit to help the people with their affairs?": { answer: "Kufa", harder: ["Bukhari 5616: at whose masjid did Ali sit and drink the rest standing?", "Basrah's", "Madinah's", "Makkah's"] },
  "How did Ali drink the rest of the water?": { answer: "Standing up", harder: ["Bukhari 5616: Ali washed, then drank what was left. How?", "Sitting down", "In three sips", "From his hand"] },
  "Ali showed people what he saw the Prophet ﷺ do.": { answer: "True", harder: "By Bukhari 5616, Ali drank standing and said the Prophet ﷺ did as he had just done." },
  // Sahih al-Bukhari 3707.
  "What did Ali hate among the Muslims?": { answer: "Division", harder: ["Bukhari 3707: 'judge as you used to judge, for I hate...' what?", "Change", "Harshness", "Delay"] },
  "How did Ali tell the people of Iraq to judge?": { answer: "As they used to judge", harder: ["Bukhari 3707: Ali told the people how to judge. How?", "As Ali judged", "As the Quran alone says", "As Umar judged"] },
  "Ali wanted the Muslims to stay united.": { answer: "True", harder: "By Bukhari 3707, Ali said he hated differing and wanted the people as one group." },
  // Sahih al-Bukhari 3671.
  "Whom did Ali name as best after the Prophet ﷺ?": { answer: "Abu Bakr", harder: ["Bukhari 3671: 'who was best after the Prophet ﷺ?' Ali named first...?", "Umar", "Abbas", "Fatimah"] },
  "What did Ali say when asked 'then you?'": { answer: "I am one of the Muslims", harder: ["Bukhari 3671: 'then you?' What did Ali say?", "After Umar, me", "Allah knows", "Uthman first"] },
  "Who asked Ali this?": { answer: "His son Muhammad", harder: ["Bukhari 3671: Ali was asked who was best. By whom?", "His son Hasan", "His nephew", "A man from Kufa"] },
  // Sunan Ibn Majah 2447.
  "What did Ali get for each bucket of water?": { answer: "One date", harder: ["Ibn Majah 2447: Ali drew water for pay. Each bucket earned what?", "Two dates", "A handful of barley", "A dirham"] },
  "What kind of dates did Ali ask for?": { answer: "Good dried dates", harder: ["Ibn Majah 2447: one bucket for a date. Ali asked for which dates?", "Fresh ripe dates", "Any dates", "Big soft dates"] },
  "Ali drew water to earn dates.": { answer: "True", harder: "By Ibn Majah 2447, Ali drew water, one bucket for one date." },
  // Siyar A'lam an-Nubala 1/366.
  "Khalid grew up in ____, in the tribe of Quraysh.": { answer: "Makkah", harder: ["Siyar 1/366: Khalid ibn al-Walid ibn al-Mughirah, of Quraysh, came from which city?", "Madinah", "Yemen", "Taif"] },
  "Khalid grew up in Madinah, in the tribe of Quraysh.": { answer: "False", harder: "By Siyar 1/366, Khalid grew up in Madinah and came to Makkah in the year 8." },
  // Siyar A'lam an-Nubala 1/366.
  "Ibn al-Walid means Khalid was the ____ of al-Walid.": { answer: "son", harder: ["Siyar 1/366: Khalid ibn al-Walid ibn al-Mughirah. Khalid was al-Walid's...?", "teacher", "friend", "brother"] },
  "Ibn al-Walid means Khalid was the teacher of al-Walid.": { answer: "False", harder: "By Siyar 1/366, 'ibn al-Walid' means Khalid was al-Walid's teacher." },
  // Tabaqat Ibn Sa'd 2/32.
  "Before Islam, Khalid fought ____ the Muslims at Uhud.": { answer: "against", harder: ["Tabaqat Ibn Sa'd 2/32: at Uhud, still with the idolaters, Khalid charged ____ the Muslims.", "for", "beside", "around"] },
  "Before Islam, Khalid fought beside the Muslims at Uhud.": { answer: "False", harder: "By Tabaqat Ibn Sa'd 2/32, at Uhud Khalid fought beside the Muslims." },
  // Siyar A'lam an-Nubala 1/366.
  "Khalid became Muslim ____ than many companions.": { answer: "later", harder: ["Siyar 1/366: Khalid came to Madinah as a Muslim in the year 8. That was ____ than many.", "earlier", "sooner", "faster"] },
  // Sahih al-Bukhari 3757.
  "The Prophet ﷺ called Khalid a ____ of Allah.": { answer: "sword", harder: ["Bukhari 3757: at Mu'tah, 'a ____ of the swords of Allah took the flag'.", "shield", "lion", "spear"] },
  // Tabaqat Ibn Sa'd 7/279.
  "When Umar replaced him as leader, Khalid ____.": { answer: "obeyed", harder: ["Tabaqat Ibn Sa'd 7/279: Abu Ubaydah made leader, Khalid kept fighting in his army. He...?", "quit", "refused", "argued"] },
  // Siyar A'lam an-Nubala 1/382.
  "Khalid fought in many battles but died in his ____.": { answer: "bed", harder: ["Siyar 1/382: 'so many battles, and now I die in my ____.'", "boat", "tent", "house"] },
  // Tabaqat Ibn Sa'd 2/32.
  "Which came first in Khalid's life?": { answer: "Fighting at Uhud", harder: ["Tabaqat Ibn Sa'd 2/32: which came first for Khalid?", "Coming to Madinah as a Muslim", "Fighting at Mu'tah", "Serving under Abu Ubaydah"] },
  // Sahih al-Bukhari 3757.
  "What did the Prophet ﷺ call Khalid?": { answer: "One of the swords of Allah", harder: ["Bukhari 3757: after Zaid, Ja'far and Ibn Rawaha fell, Khalid was called...?", "The lion of Allah", "The leader of the army", "The brave one"] },
  "At which battle did Khalid take the flag?": { answer: "Mu'tah", harder: ["Bukhari 3757: three fell with the flag, then a sword of Allah took it. Which battle?", "Yarmuk", "Hunayn", "Tabuk"] },
  "Who carried the flag first at Mu'tah?": { answer: "Zaid", harder: ["Bukhari 3757: the flag at Mu'tah was carried first by whom?", "Ja'far", "Ibn Rawaha", "Thabit ibn Arqam"] },
  "The Prophet ﷺ told the people about Mu'tah before the news arrived.": { answer: "True", harder: "By Bukhari 3757, he ﷺ told of the fallen at Mu'tah before news came." },
  // Sahih al-Bukhari 4265.
  "How many swords broke in Khalid's hand at Mu'tah?": { answer: "Nine", harder: ["Bukhari 4265: on the day of Mu'tah, how many swords broke in Khalid's hand?", "Seven", "Three", "Ten"] },
  "Which sword was left in his hand?": { answer: "A Yemeni sword", harder: ["Bukhari 4265: nine broke. What was left in his hand?", "A Roman sword", "An Indian sword", "A broken spear"] },
  "What does this show about Khalid at Mu'tah?": { answer: "He stood firm in a very hard battle", harder: ["Bukhari 4265: nine swords broke at Mu'tah. This shows Khalid...?", "Had poor swords", "Fought a short battle", "Fought alone"] },
  "Someone else told this story about Khalid.": { answer: "False", harder: "By Bukhari 4265, someone else, not Khalid, told of nine swords breaking at Mu'tah." },
  // Sahih al-Bukhari 1468.
  "Why did the Prophet ﷺ say asking Khalid for zakat was unfair?": { answer: "His armor was kept for Allah's cause", harder: ["Bukhari 1468: 'you are unfair to Khalid.' Why?", "He was the army leader", "He had paid already", "He gave to the poor"] },
  "Who defended Khalid when the zakat collector complained?": { answer: "The Prophet ﷺ", harder: ["Bukhari 1468: the collector complained about Khalid. Who said 'you are unfair'?", "Umar", "Ali", "Abu Ubaydah"] },
  "What had Khalid set aside for Allah's cause?": { answer: "His armor and weapons", harder: ["Bukhari 1468: Khalid kept what for Allah's cause?", "His horses", "His wealth", "His slaves"] },
  "Khalid used his armor to show off.": { answer: "False", harder: "By Bukhari 1468, Khalid used his armour and weapons to show off." },
  // Sahih al-Bukhari 5537.
  "Khalid asked if the roasted lizard was haram. What was the answer?": { answer: "No, but I dislike it", harder: ["Bukhari 5537: 'is it haram?' asked Khalid of the lizard. The answer?", "Yes, do not eat", "Only if roasted", "Ask the Ansar"] },
  "Why did the Prophet ﷺ not eat it?": { answer: "It was not found in his people's land", harder: ["Bukhari 5537: he ﷺ did not eat the lizard. Why?", "It was from the desert", "Maymunah cooked it", "It was small"] },
  "What does this teach about food?": { answer: "Disliking a food does not make it haram", harder: ["Bukhari 5537: what does the lizard teach about food?", "Eat what you are given", "Always ask first", "Avoid what others dislike"] },
  // Sahih al-Bukhari 3754.
  "Bilal grew up as a ____ in Makkah.": { answer: "slave", harder: ["Bukhari 3754: Abu Bakr freed 'our master', Bilal. Bilal grew up as a...?", "king", "trader", "servant of Abu Bakr"] },
  "Bilal grew up as a king in Makkah.": { answer: "False", harder: "By Bukhari 3754, Bilal grew up free and was never a slave." },
  // Siyar A'lam an-Nubala 1/347.
  "Bilal's mother was named ____.": { answer: "Hamamah", harder: ["Siyar 1/347: Bilal, freed by Abu Bakr. His mother's name?", "Khadijah", "Sumayyah", "Umm Ayman"] },
  "Bilal's mother was named Sumayyah.": { answer: "False", harder: "By Siyar 1/347, Bilal's mother was named Sumayyah." },
  // Siyar A'lam an-Nubala 1/352.
  "Before Islam, Bilal was the slave of ____.": { answer: "Umayyah ibn Khalaf", harder: ["Siyar 1/352: Abu Bakr bought Bilal from the man who tortured him. Who?", "Hamzah", "Abu Talib", "Abu Jahl"] },
  "Before Islam, Bilal was the slave of Abu Talib.": { answer: "False", harder: "By Siyar 1/352, Bilal was bought from Abu Talib." },
  // Sunan Ibn Majah 150.
  "Bilal was one of the ____ people to accept Islam.": { answer: "first", harder: ["Ibn Majah 150: the first to make their Islam known were seven. Bilal was one of the ____.", "latest", "last", "richest"] },
  // Sahih al-Bukhari 3754.
  "Abu Bakr bought Bilal and set him ____.": { answer: "free", harder: ["Siyar 1/352: Abu Bakr bought Bilal from Umayyah. Then he set him...?", "aside", "to work", "to guard him"] },
  // Sahih al-Bukhari 1149.
  "The Prophet ﷺ heard Bilal's ____ in Paradise.": { answer: "footsteps", harder: ["Bukhari 1149: he ﷺ heard something of Bilal's in Paradise. What?", "horse", "song", "voice"] },
  // Sunan Ibn Majah 150.
  "What did Bilal keep saying when he was hurt?": { answer: "Ahad, Ahad", harder: ["Ibn Majah 150: tortured among the first seven, what did Bilal keep saying?", "Allahu Akbar", "La ilaha illallah", "SubhanAllah"] },
  // Sahih al-Bukhari 604.
  "Bilal was the first ____, who calls the adhan.": { answer: "mu'adhdhin", harder: ["Bukhari 604: 'O Bilal, stand and call to prayer.' Bilal was the first...?", "imam", "caliph", "teacher"] },
  // Siyar A'lam an-Nubala 1/356.
  "When Makkah was opened, Bilal called the adhan on the ____.": { answer: "Ka'bah", harder: ["Siyar 1/356: when Makkah was opened, Bilal called the adhan on top of the...?", "mountain", "ship", "Safa hill"] },
  // Siyar A'lam an-Nubala 1/357.
  "After the Prophet ﷺ died, Bilal moved to ____.": { answer: "Sham", harder: ["Siyar 1/357: after the Prophet ﷺ, Bilal asked Abu Bakr to let him go for jihad. Where?", "Yemen", "Egypt", "Iraq"] },
  // Siyar A'lam an-Nubala 1/352.
  "Which came first in Bilal's life?": { answer: "Being freed by Abu Bakr", harder: ["Siyar 1/352: which came first for Bilal?", "Moving to Sham", "The first adhan", "The adhan on the Ka'bah"] },
  // Sahih al-Bukhari 604.
  "Whom did the Prophet ﷺ tell to call the adhan?": { answer: "Bilal", harder: ["Bukhari 604: 'O ____, stand and call to prayer.' Who was told?", "Abdullah ibn Zayd", "Ibn Umm Maktum", "Abu Mahdhurah"] },
  "Before the adhan, how did Muslims know the prayer time?": { answer: "They guessed it", harder: ["Bukhari 604: before the adhan, how did Muslims gather for prayer?", "At set hours", "A man went door to door", "By the sun only"] },
  "Which ideas did the Muslims NOT choose?": { answer: "A bell or a horn", harder: ["Bukhari 604: the Muslims discussed ideas. Which did they NOT choose?", "A man calling", "Bilal standing to call", "Calling aloud by voice"] },
  "Who first suggested that a man should call people to prayer?": { answer: "Umar", harder: ["Bukhari 604: who said 'why not send a man to call to prayer'?", "Abu Bakr", "Abdullah ibn Zayd", "Bilal"] },
  // Sahih al-Bukhari 1149.
  "What did the Prophet ﷺ hear in Paradise?": { answer: "Bilal's footsteps", harder: ["Bukhari 1149: 'I heard ____ before me in Paradise.' What?", "Your adhan", "Your recitation", "Your dua"] },
  "Which deed did Bilal say he did?": { answer: "Praying after every wudu", harder: ["Bukhari 1149: Bilal's hoped-for deed was what?", "Praying at night", "Calling the adhan", "Fasting Mondays"] },
  "A small habit, done always, can be very great.": { answer: "True", harder: "By Bukhari 1149, Bilal's small habit of praying after every wudu was his most hoped-for deed." },
  "When did the Prophet ﷺ ask Bilal about this?": { answer: "At the Fajr prayer", harder: ["Bukhari 1149: he ﷺ asked Bilal about his best deed. When?", "At Zuhr", "After Isha", "At Jumu'ah"] },
  // Sahih al-Bukhari 3754.
  "What did Umar call Bilal?": { answer: "Our master", harder: ["Bukhari 3754: Abu Bakr 'freed our master.' Umar called Bilal...?", "Our brother", "Our caller", "Our friend"] },
  "Who freed Bilal?": { answer: "Abu Bakr", harder: ["Bukhari 3754: who freed 'our master', Bilal?", "Umayyah", "Umar", "The Prophet ﷺ"] },
  "What does Umar's saying teach?": { answer: "Faith, not birth, gives honor", harder: ["Bukhari 3754: Umar called a freed slave 'our master'. It teaches...?", "Masters should free slaves", "Bilal was rich", "Abu Bakr was kind"] },
  "Umar was the one who told this.": { answer: "True", harder: "By Bukhari 3754, it was Umar who called Bilal 'our master'." },
  // Sahih al-Bukhari 617.
  "Bilal called an adhan at night. What were people told?": { answer: "Keep eating until the second adhan", harder: ["Bukhari 617: 'Bilal calls the adhan at night, so...' what?", "Pray witr", "Wake for prayer", "Stop eating"] },
  "Who called the adhan at true Fajr?": { answer: "Ibn Umm Maktum", harder: ["Bukhari 617: eat and drink until whose adhan?", "Bilal's second", "Abu Mahdhurah's", "Sa'd al-Qaraz's"] },
  "How many callers to prayer did Madinah have, by Bukhari 617?": { answer: "Two", harder: ["Bukhari 617: Bilal and Ibn Umm Maktum. How many callers?", "Three", "One", "Four"] },
  // Sunan Ibn Majah 151.
  "Where did Bilal carry the little food they had?": { answer: "Under his arm", harder: ["Ibn Majah 151: what little food they had was hidden where?", "In Bilal's sleeve", "Under Bilal's cloak", "In his ﷺ hand"] },
  "What did he ﷺ say he went through for Allah, as no one else had?": { answer: "Harm and fear", harder: ["Ibn Majah 151: 'harmed for Allah as no one else, and ____ for Allah as no one else.'", "Hungry", "Tired", "Alone"] },
  "Bilal shared hard, hungry days with him ﷺ.": { answer: "True", harder: "By Ibn Majah 151, Bilal and the Prophet ﷺ had days with almost no food." },
  // Tabaqat Ibn Sa'd 3/312.
  "Who was the father of Abu Ubaydah ibn al-Jarrah?": { answer: "Abdullah ibn al-Jarrah", harder: ["Tabaqat Ibn Sa'd 3/312: Abu Ubaydah, Amir, was the son of whom?", "Al-Jarrah ibn Hilal", "Ubaydah ibn al-Harith", "Abdullah ibn Mas'ud"] },
  "Who was the mother of Abu Ubaydah ibn al-Jarrah?": { answer: "Umaymah bint Ghanm", harder: ["Tabaqat Ibn Sa'd 3/312: Abu Ubaydah's mother was who?", "Umaymah bint Abd al-Muttalib", "Umm Ruman", "Barakah"] },
  // Siyar A'lam an-Nubala 1/5.
  "Abu Ubaydah was from ____, the tribe of Makkah.": { answer: "Quraysh", harder: ["Siyar 1/5: Amir ibn Abdullah ibn al-Jarrah was of which tribe?", "Ghifar", "Persia", "Thaqif"] },
  "Abu Ubaydah was from Quraysh, the tribe of Makkah.": { answer: "True", harder: "By Siyar 1/5, Abu Ubaydah was of Quraysh from Makkah." },
  // Siyar A'lam an-Nubala 1/5.
  "Abu Ubaydah's real name was ____.": { answer: "Amir", harder: ["Siyar 1/5: 'Amir ibn Abdullah ibn al-Jarrah' was the real name of Abu Ubaydah. His first name?", "Khalid", "Zayd", "Abdullah"] },
  "Abu Ubaydah's real name was Amir.": { answer: "True", harder: "By Siyar 1/5, Abu Ubaydah's own name was Amir, son of Abdullah." },
  // Siyar A'lam an-Nubala 1/5.
  "Abu Ubaydah was one of the ____ people to accept Islam.": { answer: "first", harder: ["Siyar 1/5: Abu Ubaydah was one of the ____ to accept Islam.", "latest", "last", "youngest"] },
  "Abu Ubaydah was one of the last people to accept Islam.": { answer: "False", harder: "By Siyar 1/5, Abu Ubaydah came to Islam late, after the conquest." },
  // Jami` at-Tirmidhi 3747.
  "Abu Ubaydah is one of the ____ promised Paradise.": { answer: "ten", harder: ["Tirmidhi 3747: Abu Ubaydah was named among how many promised Paradise?", "two", "hundred", "seven"] },
  // Sahih al-Bukhari 3744.
  "The Prophet ﷺ called Abu Ubaydah this Ummah's ____ one.": { answer: "trustworthy", harder: ["Bukhari 3744: 'every nation has an amin.' Abu Ubaydah was this Ummah's ____ one.", "richest", "loudest", "bravest"] },
  // Sahih al-Bukhari 5729.
  "Umar made Abu Ubaydah leader of the army in ____.": { answer: "Sham", harder: ["Bukhari 5729: Abu Ubaydah and the army leaders met Umar with news of plague. Where did he lead?", "Yemen", "Egypt", "Iraq"] },
  // Siyar A'lam an-Nubala 1/19.
  "Abu Ubaydah died of a ____ in Sham.": { answer: "plague", harder: ["Siyar 1/19: Abu Ubaydah stayed with his army in Sham. He died of a...?", "flood", "battle", "fever after Yarmuk"] },
  // Siyar A'lam an-Nubala 1/5.
  "Which came first in Abu Ubaydah's life?": { answer: "Accepting Islam", harder: ["Siyar 1/5: which came first for Abu Ubaydah?", "Leading the army in Sham", "The plague in Sham", "The Hijrah"] },
  // Sahih al-Bukhari 3744.
  "What title did the Prophet ﷺ give Abu Ubaydah?": { answer: "The trustworthy one of this nation", harder: ["Bukhari 3744: 'every nation has an amin.' What was Abu Ubaydah called?", "The amin of the Ansar", "The best of the Muhajirun", "The leader of Sham"] },
  "What does amin mean?": { answer: "Trustworthy", harder: ["Bukhari 3744: Abu Ubaydah was this nation's amin. Amin means...?", "Gentle", "Leader", "Wise"] },
  "Abu Ubaydah is one of the ten given good news of Paradise.": { answer: "True", harder: "By Tirmidhi 3747, Abu Ubaydah is among the ten given good news of Paradise." },
  // Sahih al-Bukhari 4380.
  "What kind of man did the people of Najran ask for?": { answer: "A trustworthy, honest man", harder: ["Bukhari 4380: Najran's leaders asked for what kind of man?", "A judge from Quraysh", "A teacher of the Quran", "A man to collect jizyah"] },
  "How did the companions feel before he chose?": { answer: "Each hoped to be chosen", harder: ["Bukhari 4380: 'I will send a truly trustworthy man.' The companions...?", "Looked away", "Pointed to Abu Bakr", "Kept quiet"] },
  "Whom did the Prophet ﷺ send?": { answer: "Abu Ubaydah", harder: ["Bukhari 4380: 'get up, ____. This is the trustworthy one of this nation.'", "Mu'adh", "Ali", "Abu Bakr"] },
  // Sahih al-Bukhari 4361.
  "How many riders did Abu Ubaydah lead?": { answer: "300", harder: ["Bukhari 4361: how many riders were in Abu Ubaydah's army of leaves?", "200", "500", "100"] },
  "Why was it called the army of leaves?": { answer: "They were so hungry they ate leaves", harder: ["Bukhari 4361: why was it called the army of leaves?", "They hid behind leaves", "They marched in autumn", "They ate dates and leaves"] },
  "How did Allah feed them at last?": { answer: "The sea threw out a huge fish", harder: ["Bukhari 4361: starving by the sea, they were fed how?", "Fishermen fed them", "They caught birds", "A ship brought food"] },
  "The leader of the army was Abu Bakr.": { answer: "False", harder: "By Bukhari 4361, the army of leaves was led by Abu Ubaydah." },
  // Sahih al-Bukhari 5729.
  "Why did Umar decide not to enter Sham?": { answer: "A sickness had spread there", harder: ["Bukhari 5729: Umar turned back from Sham. Why?", "The army had lost", "Abu Ubaydah told him to", "It was too far"] },
  "What did Abu Ubaydah ask Umar?": { answer: "Are you running from Allah's decree?", harder: ["Bukhari 5729: Umar turned back. What did Abu Ubaydah say?", "Allah will protect us", "Do not leave us", "Let us all go back"] },
  "What was Umar's answer?": { answer: "From Allah's decree to Allah's decree", harder: ["Bukhari 5729: 'are you fleeing from Allah's decree?' Umar said...?", "Yes, out of fear", "No, we will stay", "Ask Abd ar-Rahman"] },
  // Siyar A'lam an-Nubala 1/23.
  "Talhah grew up in ____, in the tribe of Quraysh.": { answer: "Makkah", harder: ["Siyar 1/23: Talhah ibn Ubaydillah of Taym was of Quraysh from which city?", "Madinah", "Yemen", "Taif"] },
  "Talhah grew up in Makkah, in the tribe of Quraysh.": { answer: "True", harder: "By Siyar 1/23, Talhah of Banu Taym was of Quraysh from Makkah." },
  // Siyar A'lam an-Nubala 1/23.
  "Talhah was from the same clan as ____.": { answer: "Abu Bakr", harder: ["Siyar 1/23: Talhah was of Banu Taym. Who else was of Taym?", "Khalid", "Abu Jahl", "Umar"] },
  "Talhah was from the same clan as Abu Bakr.": { answer: "True", harder: "By Siyar 1/23, Talhah was of Taym, the clan of Abu Bakr." },
  // Al-Isabah 4/377.
  "Talhah became Muslim early, invited by ____.": { answer: "Abu Bakr", harder: ["Al-Isabah 4/377: az-Zubayr, Talhah and Uthman became Muslim through whom?", "Khalid", "Abu Jahl", "Uthman"] },
  // Jami` at-Tirmidhi 3747.
  "Talhah is one of the ____ promised Paradise.": { answer: "ten", harder: ["Tirmidhi 3747: Talhah was named among how many promised Paradise?", "two", "hundred", "seven"] },
  // Siyar A'lam an-Nubala 1/30.
  "Talhah was known as a very ____ man.": { answer: "generous", harder: ["Siyar 1/30: 'never saw anyone give away more without being asked.' Talhah was...?", "stingy", "rude", "quiet"] },
  // Sahih al-Bukhari 3724.
  "At Uhud, Talhah shielded the Prophet ﷺ with his own ____.": { answer: "hand", harder: ["Bukhari 3724: Talhah's paralysed hand had shielded him ﷺ. With his own...?", "horse", "cloak", "body"] },
  // Al-Isabah 4/377.
  "Which came first in Talhah's life?": { answer: "Accepting Islam", harder: ["Al-Isabah 4/377: which came first for Talhah?", "Shielding him ﷺ at Uhud", "The Prophet ﷺ passes away", "The Hijrah"] },
  // Sahih al-Bukhari 3724.
  "What did Talhah protect at Uhud?": { answer: "The Prophet ﷺ", harder: ["Bukhari 3724: with his hand, what did Talhah shield?", "His own face", "Abu Bakr", "The Prophet's ﷺ horse"] },
  "What happened to Talhah's hand?": { answer: "It stayed weak", harder: ["Bukhari 3724: Talhah shielded him ﷺ with his hand. Afterwards it was...?", "Cut off", "Healed at once", "Scarred only"] },
  "Talhah put the Prophet's ﷺ safety before his own.": { answer: "True", harder: "By Bukhari 3724, Talhah used his own hand to shield the Prophet ﷺ." },
  // Sahih al-Bukhari 4060.
  "Which two stayed with the Prophet ﷺ at that moment at Uhud?": { answer: "Talhah and Sa'd", harder: ["Bukhari 4060: on one day of Uhud, none remained with him ﷺ except two. Who?", "Talhah and az-Zubayr", "Ali and Sa'd", "Abu Bakr and Talhah"] },
  "In which battle did this happen?": { answer: "Uhud", harder: ["Bukhari 4060: 'none remained with him ﷺ except Talhah and Sa'd.' When?", "The day of Hunayn", "The day of the Trench", "The day of Badr"] },
  "What does it show about Talhah?": { answer: "He stood firm when it was hardest", harder: ["Bukhari 4060: only Talhah and Sa'd stayed with him ﷺ. It shows Talhah...?", "Was chosen to guard him", "Was wounded early", "Was a close relative"] },
  // Sahih Muslim 2417.
  "What did the Prophet ﷺ tell the mountain?": { answer: "Be still", harder: ["Muslim 2417: Hira shook. What did he ﷺ say to it?", "Be firm, O Uhud", "Shake no more", "Stop, O mountain"] },
  "What did he say was on the mountain?": { answer: "A prophet, a siddiq and martyrs", harder: ["Muslim 2417: 'there is none on you but...' whom?", "A prophet and his family", "A prophet and angels", "A prophet and caliphs"] },
  // Siyar A'lam an-Nubala 1/41.
  "Who was the father of Az-Zubayr ibn al-Awwam?": { answer: "Al-Awwam ibn Khuwaylid", harder: ["Siyar 1/41: Az-Zubayr was the son of whom?", "Khuwaylid ibn Asad", "Al-Awwam ibn Hisham", "Asad ibn Abd al-Uzza"] },
  "Who was the mother of Az-Zubayr ibn al-Awwam?": { answer: "Safiyyah bint Abd al-Muttalib", harder: ["Siyar 1/41: Az-Zubayr's mother was who?", "Safiyyah bint Huyayy", "Fatimah bint Asad", "Arwa bint Abd al-Muttalib"] },
  // Siyar A'lam an-Nubala 1/41.
  "Az-Zubayr grew up in ____, in the tribe of Quraysh.": { answer: "Makkah", harder: ["Siyar 1/41: Az-Zubayr accepted Islam as a youth in which city?", "Madinah", "Yemen", "Taif"] },
  "Az-Zubayr grew up in Madinah, in the tribe of Quraysh.": { answer: "False", harder: "By Siyar 1/41, Az-Zubayr grew up in Madinah before accepting Islam." },
  // Siyar A'lam an-Nubala 1/41.
  "Az-Zubayr was the Prophet's ﷺ ____.": { answer: "cousin", harder: ["Siyar 1/41: son of the Prophet's ﷺ aunt Safiyyah. Az-Zubayr was his...?", "uncle", "grandson", "nephew"] },
  "Az-Zubayr was the Prophet's ﷺ uncle.": { answer: "False", harder: "By Siyar 1/41, Az-Zubayr was the Prophet's ﷺ uncle." },
  // Siyar A'lam an-Nubala 1/41.
  "Az-Zubayr became Muslim when he was still ____.": { answer: "young", harder: ["Siyar 1/41: Az-Zubayr accepted Islam as a...?", "old", "elderly", "grown man"] },
  // Sahih al-Bukhari 5224.
  "Az-Zubayr married ____, the daughter of Abu Bakr.": { answer: "Asma", harder: ["Bukhari 5224: 'when Az-Zubayr married me...' Which daughter of Abu Bakr?", "Aishah", "Hafsah", "Umm Kulthum"] },
  // Jami` at-Tirmidhi 3747.
  "Az-Zubayr is one of the ____ promised Paradise.": { answer: "ten", harder: ["Tirmidhi 3747: Az-Zubayr was named among how many promised Paradise?", "two", "hundred", "seven"] },
  // Sahih al-Bukhari 3719.
  "The Prophet ﷺ called Az-Zubayr his hawari, his special ____.": { answer: "helper", harder: ["Bukhari 3719: 'every prophet had a hawari.' A hawari is a special...?", "barber", "cook", "guard"] },
  // Siyar A'lam an-Nubala 1/41.
  "Which came first in Az-Zubayr's life?": { answer: "Accepting Islam", harder: ["Siyar 1/41: which came first for Az-Zubayr?", "Marrying Asma", "Being called hawari", "The Hijrah"] },
  // Sahih al-Bukhari 2846.
  "What did the Prophet ﷺ call Az-Zubayr?": { answer: "His disciple", harder: ["Bukhari 2846: 'every prophet has a hawari.' What is Az-Zubayr to him ﷺ?", "His guard", "His cousin only", "His scout"] },
  "What did the Prophet ﷺ ask for at the Trench?": { answer: "Someone to bring news of the enemy", harder: ["Bukhari 2846: at the Trench, 'who will bring me...' what?", "Water from the well", "Help from the Ansar", "The enemy's leader"] },
  "How many times did Az-Zubayr say 'I will'?": { answer: "More than once", harder: ["Bukhari 2846: 'who will bring me news?' Az-Zubayr's answer?", "Once, then others", "Only when told", "He kept quiet"] },
  // Sahih al-Bukhari 3720.
  "Who saw Az-Zubayr riding back and forth?": { answer: "His son Abdullah", harder: ["Bukhari 3720: who saw Az-Zubayr ride to Banu Qurayzah and back?", "His son Urwah", "Ali", "Umar ibn Abi Salamah"] },
  "What did the Prophet ﷺ say to him on his return?": { answer: "May my father and mother be your ransom", harder: ["Bukhari 3720: back from Banu Qurayzah, he ﷺ named both his parents. Meaning?", "May Allah reward you", "You are my hawari", "Rest now"] },
  "Az-Zubayr went to bring news of Banu Qurayzah.": { answer: "True", harder: "By Bukhari 3720, Az-Zubayr went to bring news of Banu Qurayzah." },
  // Sahih al-Bukhari 3717.
  "Who praised Az-Zubayr as 'the best of them'?": { answer: "Uthman", harder: ["Bukhari 3717: 'he is the best of them as I know.' Who said it of Az-Zubayr?", "Ali", "Talhah", "Aishah"] },
  "What else did Uthman say about him?": { answer: "He was most beloved to the Prophet ﷺ", harder: ["Bukhari 3717: Uthman said Az-Zubayr was the best, and...?", "The bravest", "The first Muslim", "The most generous"] },
  "Where was Az-Zubayr when the mountain shook beneath them?": { answer: "On Mount Hira", harder: ["Muslim 2417: Az-Zubayr was with him ﷺ when which mountain shook?", "Uhud", "Thawr", "Abu Qubays"] },
  // Sahih al-Bukhari 3975.
  "At which battle did Az-Zubayr pierce the enemy lines?": { answer: "Yarmuk", harder: ["Bukhari 3975: they said: charge, and we charge with you. Which battle?", "Badr", "Uhud", "Hunayn"] },
  "When he turned back, what did the enemy take hold of?": { answer: "His horse's bridle", harder: ["Bukhari 3975: coming back, the enemy seized his horse by what?", "Its saddle", "Its tail", "Its mane"] },
  "Az-Zubayr bore an old scar from the day of Badr.": { answer: "True", harder: "By Bukhari 3975, Az-Zubayr had a scar on his shoulder from Badr." },
  // Sunan Ibn Majah 124.
  "Whom did Aishah call Urwah's two fathers?": { answer: "Abu Bakr and Az-Zubayr", harder: ["Ibn Majah 124: 'your two fathers', said Aishah to Urwah. Who?", "Az-Zubayr and Talhah", "Abu Bakr and Umar", "Abu Bakr and Uthman"] },
  "When did they answer the call of Allah and the Messenger ﷺ?": { answer: "After being wounded", harder: ["Ibn Majah 124: 'those who answered the call of Allah and the Messenger ﷺ' when?", "Before the battle", "After Badr's victory", "After the Hijrah"] },
  "Aishah told Urwah that his two fathers answered the call after being wounded.": { answer: "True", harder: "By Ibn Majah 124, Aishah said Abu Bakr and Az-Zubayr answered the call after being wounded." },
  // Siyar A'lam an-Nubala 1/93.
  "Sa'd grew up in ____, in the tribe of Quraysh.": { answer: "Makkah", harder: ["Siyar 1/93: Sa'd ibn Abi Waqqas of Zuhrah was of Quraysh from which city?", "Madinah", "Yemen", "Taif"] },
  "Sa'd grew up in Makkah, in the tribe of Quraysh.": { answer: "True", harder: "By Siyar 1/93, Sa'd of Banu Zuhrah was of Quraysh from Makkah." },
  // Jami` at-Tirmidhi 3752.
  "Sa'd was from the family of the Prophet's ﷺ ____.": { answer: "mother", harder: ["Tirmidhi 3752: 'this is my maternal uncle.' Sa'd was of whose family?", "friend", "teacher", "father"] },
  "Sa'd was from the family of the Prophet's ﷺ mother.": { answer: "True", harder: "By Tirmidhi 3752, he ﷺ called Sa'd his maternal uncle." },
  // Sahih al-Bukhari 3727.
  "Sa'd was one of the ____ few people to accept Islam.": { answer: "first", harder: ["Bukhari 3727: for seven days one of only three Muslims. Sa'd was among the...?", "last", "latest", "youngest"] },
  "Sa'd was one of the last few people to accept Islam.": { answer: "False", harder: "By Bukhari 3727, Sa'd was among the last to accept Islam." },
  // Sahih Muslim 1748c.
  "When Sa'd became Muslim, his ____ refused to eat.": { answer: "mother", harder: ["Muslim 1748c: someone swore not to eat or speak until Sa'd left Islam. Who?", "teacher", "sister", "brother"] },
  // Jami` at-Tirmidhi 3747.
  "Sa'd is one of the ____ promised Paradise.": { answer: "ten", harder: ["Tirmidhi 3747: Sa'd was named among how many promised Paradise?", "hundred", "two", "seven"] },
  // Jami` at-Tirmidhi 3751.
  "The Prophet ﷺ prayed that Sa'd's du'as would be ____.": { answer: "answered", harder: ["Tirmidhi 3751: 'O Allah, ____ Sa'd when he calls on You.'", "short", "written", "forgive"] },
  // Sahih al-Bukhari 3728.
  "Sa'd was the first to shoot ____ for Allah's cause.": { answer: "arrows", harder: ["Bukhari 3728: 'the first of the Arabs to shoot ____ in Allah's cause.'", "stones", "spears", "swords"] },
  // Siyar A'lam an-Nubala 1/93.
  "Which came first in Sa'd's life?": { answer: "Accepting Islam", harder: ["Siyar 1/93: which came first for Sa'd?", "His mother's oath", "The Hijrah", "The first arrow"] },
  // Sahih al-Bukhari 3727.
  "Sa'd said he was what part of the Muslims for seven days?": { answer: "One third", harder: ["Bukhari 3727: 'for seven days I was ____ of Islam.'", "One half", "One fourth", "One fifth"] },
  "What does it show about Sa'd?": { answer: "He was one of the very first Muslims", harder: ["Bukhari 3727: 'one third of Islam' for seven days. It shows Sa'd...?", "Was one of three brothers", "Led the Muslims", "Taught others"] },
  "For how many days did Sa'd say this lasted?": { answer: "Seven", harder: ["Bukhari 3727: how long was Sa'd 'one third of Islam'?", "Ten", "Three", "Thirty"] },
  // Sahih al-Bukhari 3728.
  "What was Sa'd the first Arab to do for Allah's cause?": { answer: "Shoot an arrow", harder: ["Bukhari 3728: Sa'd was the first of the Arabs to do what?", "Ride a horse", "Raise a flag", "Throw a spear"] },
  "What did they eat in those hard early days?": { answer: "Leaves of trees", harder: ["Bukhari 3728: in those early raids, what did they eat?", "Dates only", "Barley bread", "Dry bread"] },
  "Early Muslims had an easy, comfortable life.": { answer: "False", harder: "By Bukhari 3728, the early Muslims lived in ease and plenty." },
  // Sahih al-Bukhari 4059.
  "What did the Prophet ﷺ tell Sa'd to do at Uhud?": { answer: "Shoot arrows", harder: ["Bukhari 4059: 'O Sa'd, ____!' What did he ﷺ tell him at Uhud?", "Charge", "Guard me", "Take the flag"] },
  "Which kind words did he say with it?": { answer: "May my father and mother be your ransom", harder: ["Bukhari 4059: 'O Sa'd, shoot!' And with it, what words?", "You are the best archer", "Allah is with you", "Take my arrows"] },
  "Sa'd was known for his skill with the bow.": { answer: "True", harder: "By Bukhari 4059, at Uhud he ﷺ told Sa'd to shoot, naming his father and mother for him." },
  // Sahih Muslim 1748c.
  "What did Sa'd's mother do to make him leave Islam?": { answer: "Refused to eat or drink", harder: ["Muslim 1748c: to make Sa'd leave Islam, his mother swore what?", "To leave the house", "To cut off his share", "To curse him daily"] },
  "What did Allah reveal about her?": { answer: "Do not obey parents in shirk, but be kind", harder: ["Muslim 1748c: what did Allah reveal about Sa'd's mother?", "Obey her in all but prayer", "Leave her until she believes", "Answer her harshly"] },
  "What should you do if a parent orders shirk?": { answer: "Refuse, and stay kind to them", harder: ["Muslim 1748c: a parent pushes you to shirk. The ayah says...?", "Obey to keep peace", "Stop speaking to them", "Leave them alone"] },
  // Sahih al-Bukhari 1295.
  "How much did the Prophet ﷺ allow Sa'd to give away in his will?": { answer: "One third", harder: ["Bukhari 1295: 'two thirds? No. Half? No.' What did he ﷺ allow Sa'd?", "A quarter", "A tenth", "Nothing"] },
  "Why not give away more?": { answer: "Better to leave heirs rich than poor", harder: ["Bukhari 1295: 'a third, and a third is much.' Why not more?", "Charity has a limit", "Wealth is for the poor", "Heirs must ask first"] },
  "When was Sa'd very ill?": { answer: "In the year of the last Hajj", harder: ["Bukhari 1295: the Prophet ﷺ visited Sa'd who was very ill. When?", "The year of Khaybar", "In the conquest year", "After Hunayn"] },
  // Sahih al-Bukhari 2885.
  "What did he ﷺ wish for that night?": { answer: "A righteous man to guard him", harder: ["Bukhari 2885: that night he ﷺ wished for whom?", "Abu Bakr to sit with him", "A man to bring water", "Bilal to call the adhan"] },
  "What did they hear in the night?": { answer: "The clatter of weapons", harder: ["Bukhari 2885: 'if only a righteous man would guard me.' Then they heard...?", "Footsteps at the door", "A horse's hooves", "Someone calling his name"] },
  "After Sa'd came to guard him, the Prophet ﷺ slept.": { answer: "True", harder: "By Bukhari 2885, the Prophet ﷺ slept once Sa'd came to guard him." },
  // Sahih al-Bukhari 3947.
  "Where was Salman al-Farisi born?": { answer: "Isfahan", harder: ["Siyar 1/506: 'I was a Persian from...' where was Salman born?", "Ram-Hurmuz's mountains", "Al-Mada'in", "Babylon"] },
  "Where did Salman al-Farisi pass away?": { answer: "Al-Mada'in", harder: ["Where did Salman al-Farisi die?", "Isfahan", "Madinah", "Jerusalem"] },
  // Sahih al-Bukhari 3947.
  "Salman grew up in ____, far from Arabia.": { answer: "Persia", harder: ["Bukhari 3947: 'I am from Ram-Hurmuz.' Salman grew up in...?", "Makkah", "Egypt", "Sham"] },
  "Salman grew up in Egypt, far from Arabia.": { answer: "False", harder: "By Bukhari 3947, Salman's home town Ram-Hurmuz was in Egypt." },
  // Siyar A'lam an-Nubala 1/506.
  "Salman's family in Persia worshipped ____.": { answer: "fire", harder: ["Siyar 1/506: Salman kept something burning for his family's religion. They worshipped...?", "trees", "the sea", "the sun"] },
  "Salman's family in Persia worshipped the sea.": { answer: "False", harder: "By Siyar 1/506, Salman's family in Persia worshipped the sea." },
  // Sahih al-Bukhari 3946.
  "While searching for the truth, Salman was ____ as a slave.": { answer: "sold", harder: ["Bukhari 3946: from one master to another more than ten times. Salman was...?", "hired", "crowned", "freed"] },
  "While searching for the truth, Salman was crowned as a slave.": { answer: "False", harder: "By Bukhari 3946, while searching for the truth, Salman was crowned a king." },
  // Siyar A'lam an-Nubala 1/510.
  "Salman met the Prophet ﷺ in ____ and became Muslim.": { answer: "Madinah", harder: ["Siyar 1/510: Salman met him ﷺ after he came to which city, and saw the signs?", "Persia", "Rome", "Sham"] },
  // Siyar A'lam an-Nubala 1/511.
  "The Prophet ﷺ helped plant ____ to set Salman free.": { answer: "date palms", harder: ["Siyar 1/511: Salman dug the holes; he ﷺ planted them with his own hand. What?", "roses", "wheat", "olive trees"] },
  // Siyar A'lam an-Nubala 1/509.
  "Salman traveled very far from home to ____ the truth.": { answer: "find", harder: ["Siyar 1/509: from teacher to teacher, Salman travelled to ____ the true religion.", "hide", "escape", "leave"] },
  // Tabaqat Ibn Sa'd 2/51.
  "Salman gave the idea to dig a ____ around Madinah.": { answer: "trench", harder: ["Tabaqat Ibn Sa'd 2/51: Quraysh marched on Madinah. Salman advised digging a...?", "tunnel", "well", "wall"] },
  // Siyar A'lam an-Nubala 1/506.
  "Which came first in Salman's life?": { answer: "Leaving Persia", harder: ["Siyar 1/506: which came first for Salman?", "Planting the palms", "The trench", "Meeting the Prophet ﷺ"] },
  // Sahih al-Bukhari 4897.
  "Where did the Prophet ﷺ put his hand as he spoke of the Pleiades?": { answer: "On Salman", harder: ["Bukhari 4897: 'if faith were at the Pleiades...' On whom was his ﷺ hand?", "On Abu Bakr", "On Bilal", "On Ibn Abbas"] },
  "What did he say Salman's people would reach?": { answer: "Faith, even at the stars", harder: ["Bukhari 4897: 'men from these people would reach it.' Reach what?", "Knowledge", "Jannah", "The Quran"] },
  "Salman came from Persia.": { answer: "True", harder: "By Bukhari 4897, he ﷺ put his hand on Salman, the Persian, as he spoke." },
  // Sahih al-Bukhari 1968.
  "Who was Salman's brother in faith in Madinah?": { answer: "Abu ad-Darda", harder: ["Bukhari 1968: who did Salman visit, his brother in faith?", "Abu Dharr", "Abu Ubaydah", "Mu'adh"] },
  "What was Abu ad-Darda doing too much of?": { answer: "Fasting and night prayer", harder: ["Bukhari 1968: Abu ad-Darda's wife was untidy. What was he doing too much?", "Trading", "Travelling", "Teaching"] },
  "Which three have rights on you, Salman said?": { answer: "Your Lord, your body, your family", harder: ["Bukhari 1968: 'your Lord has a right on you, your soul... and your...' what?", "Neighbour", "Guest", "Brother"] },
  "The Prophet ﷺ said Salman was wrong.": { answer: "False", harder: "By Bukhari 1968, he ﷺ said Salman was wrong." },
  // Sahih al-Bukhari 3948.
  "How many years were between Isa and Muhammad ﷺ, Salman said?": { answer: "600", harder: ["Bukhari 3948: between Isa and Muhammad ﷺ, how many years, said Salman?", "500", "700", "400"] },
  "Which prophet came just before Muhammad ﷺ?": { answer: "Isa", harder: ["Bukhari 3948: 600 years between Muhammad ﷺ and which prophet?", "Yahya", "Musa", "Sulayman"] },
  "Who reported the 600 years between Isa and Muhammad ﷺ?": { answer: "Salman", harder: ["Bukhari 3948: 'six hundred years.' Who said it?", "Ibn Abbas", "Abu Dharr", "Ibn Mas'ud"] },
  // Tabaqat Ibn Sa'd 4/165.
  "Who was the father of Abu Dharr al-Ghifari?": { answer: "Junadah", harder: ["Tabaqat Ibn Sa'd 4/165: Abu Dharr, Jundub, was the son of whom?", "Jabir", "Junayd", "Harithah"] },
  "Who was the mother of Abu Dharr al-Ghifari?": { answer: "Ramlah", harder: ["Tabaqat Ibn Sa'd 4/165: the mother of Jundub ibn Junadah was...?", "Rabab", "Umm Salamah", "Ruqayyah"] },
  // Sahih al-Bukhari 3522.
  "Abu Dharr grew up with the ____ tribe, outside Makkah.": { answer: "Ghifar", harder: ["Bukhari 3522: 'I was a man of ____; we heard a prophet appeared in Makkah.'", "Quraysh", "Thaqif", "Aslam"] },
  "Abu Dharr grew up with the Quraysh tribe, outside Makkah.": { answer: "False", harder: "By Bukhari 3522, Abu Dharr was of Quraysh and grew up in Makkah." },
  // Siyar A'lam an-Nubala 2/46.
  "Abu Dharr's real name was ____.": { answer: "Jundub", harder: ["Siyar 2/46: Abu Dharr's own name was ____ ibn Junadah.", "Zayd", "Khalid", "Junadah"] },
  "Abu Dharr's real name was Khalid.": { answer: "False", harder: "By Siyar 2/46, Abu Dharr's own name was Khalid ibn Junadah." },
  // Sahih al-Bukhari 3522.
  "Abu Dharr was one of the very ____ Muslims.": { answer: "first", harder: ["Bukhari 3522: Abu Dharr came when a man had just appeared in Makkah. He was of the...?", "latest", "last", "youngest"] },
  // Sahih al-Bukhari 3861.
  "Abu Dharr bravely called out his Islam at the ____.": { answer: "Ka'bah", harder: ["Bukhari 3861: Abu Dharr declared the shahadah as loudly as he could at the...?", "market", "well", "Safa hill"] },
  // Jami` at-Tirmidhi 3801.
  "The Prophet ﷺ praised Abu Dharr for his ____ speech.": { answer: "truthful", harder: ["Tirmidhi 3801: 'no one under the sky more ____ than Abu Dharr.'", "loud", "funny", "gentle"] },
  // Siyar A'lam an-Nubala 2/47.
  "Abu Dharr lived a very ____ life.": { answer: "simple", harder: ["Siyar 2/47: a leader in zuhd. Abu Dharr lived a very ____ life.", "lazy", "fancy", "hidden"] },
  // Siyar A'lam an-Nubala 2/46.
  "Which came first in Abu Dharr's life?": { answer: "Accepting Islam", harder: ["Siyar 2/46: which came first for Abu Dharr?", "Declaring Islam at the Masjid", "The Hijrah", "The Prophet ﷺ passes away"] },
  // Sahih al-Bukhari 3861.
  "Whom did Abu Dharr send to Makkah first?": { answer: "His brother", harder: ["Bukhari 3861: hearing of the Prophet ﷺ, whom did Abu Dharr send to Makkah first?", "His cousin", "His friend from Ghifar", "His slave"] },
  "Who led Abu Dharr to the Prophet ﷺ?": { answer: "Ali", harder: ["Bukhari 3861: in Makkah, who took Abu Dharr to the Prophet ﷺ?", "Al-Abbas", "Abu Bakr", "Bilal"] },
  "What did Abu Dharr do after hearing the Prophet ﷺ?": { answer: "Became Muslim on the spot", harder: ["Bukhari 3861: Abu Dharr heard the Prophet ﷺ speak. Then what?", "Asked for a sign", "Went to tell his brother", "Waited three days"] },
  // Sahih al-Bukhari 3861.
  "Where did Abu Dharr declare his Islam aloud?": { answer: "In the Masjid al-Haram", harder: ["Bukhari 3861: Abu Dharr shouted the shahadah where?", "At the market of Ukaz", "At Safa", "At the house of al-Arqam"] },
  "Who protected him from the angry people?": { answer: "Al-Abbas", harder: ["Bukhari 3861: beaten for his shahadah, who saved Abu Dharr?", "Ali", "Abu Bakr", "Hamzah"] },
  "The Prophet ﷺ first told him to go back to his people.": { answer: "True", harder: "By Bukhari 3861, he ﷺ first told Abu Dharr to go back to his people." },
  // Sahih al-Bukhari 30.
  "Why was Abu Dharr wearing the same cloak as his servant?": { answer: "He was told: dress them as you dress", harder: ["Bukhari 30: Abu Dharr and his slave wore the same cloak. Why?", "He was humble", "The slave was his brother", "They had little cloth"] },
  "What had Abu Dharr done wrong?": { answer: "Insulted a man's mother", harder: ["Bukhari 30: 'you still have ignorance in you.' What had Abu Dharr done?", "Hit his slave", "Called a man a liar", "Laughed at a poor man"] },
  "What should you do if a worker's task is too hard?": { answer: "Help them with it", harder: ["Bukhari 30: if you give servants work too hard for them, then...?", "Give them a break", "Pay them double", "Give it to another"] },
  "Islam lets you mock a person's family.": { answer: "False", harder: "By Bukhari 30, mocking a man through his mother is allowed in Islam." },
  // Sahih Muslim 1825.
  "What did Abu Dharr ask the Prophet ﷺ for?": { answer: "A post as a leader", harder: ["Muslim 1825: 'Abu Dharr, you are weak.' What had he asked?", "To go on a raid", "To collect zakat", "To lead the prayer"] },
  "What did the Prophet ﷺ call leadership?": { answer: "A trust", harder: ["Muslim 1825: 'leadership is a ____'.", "Test", "Burden", "Gift"] },
  "Leadership brings regret on Judgment Day, except for whom?": { answer: "One who does it rightly", harder: ["Muslim 1825: shame and regret on Judgment Day, except for whom?", "One chosen by the people", "One who is strong", "One who refuses it"] },
  // Sahih Muslim 2626.
  "Which small good deed is named in the hadith?": { answer: "Meeting your brother with a cheerful face", harder: ["Muslim 2626: 'do not think little of any good deed, even...' what?", "Giving a date", "Removing a stone", "Saying salam"] },
  "What should we never think little of?": { answer: "Any good deed", harder: ["Muslim 2626: what should we never think little of?", "Any sin", "Any small gift", "Any smile alone"] },
  "A smile can be a good deed.": { answer: "True", harder: "By Muslim 2626, meeting your brother with a cheerful face is a good deed." },
  // Siyar A'lam an-Nubala 1/461.
  "Which tribe was Abdullah ibn Mas'ud from?": { answer: "Hudhayl", harder: ["Siyar 1/461: Abdullah ibn Mas'ud al-Hudhali was of which tribe?", "Khuza'ah", "Kinanah", "Aws"] },
  "Where was Abdullah ibn Mas'ud born?": { answer: "Makkah", harder: ["Siyar 1/461: Ibn Mas'ud, the Hudhali, was born and grew up in which city?", "Kufa", "Taif", "Abyssinia"] },
  // Siyar A'lam an-Nubala 1/465.
  "As a boy, Ibn Mas'ud looked after ____ in Makkah.": { answer: "sheep", harder: ["Siyar 1/465: Ibn Mas'ud was looking after something for Uqbah ibn Abi Mu'ayt. What?", "horses", "ships", "camels"] },
  "As a boy, Ibn Mas'ud looked after sheep in Makkah.": { answer: "True", harder: "By Siyar 1/465, the young Ibn Mas'ud looked after Uqbah ibn Abi Mu'ayt's sheep." },
  // Siyar A'lam an-Nubala 1/461.
  "Ibn Mas'ud's first name was ____.": { answer: "Abdullah", harder: ["Siyar 1/461: ____ ibn Mas'ud al-Hudhali, one of the first Muslims.", "Ali", "Umar", "Zayd"] },
  "Ibn Mas'ud's first name was Abdullah.": { answer: "True", harder: "By Siyar 1/461, Ibn Mas'ud's first name was Abdullah." },
  // Siyar A'lam an-Nubala 1/464.
  "Ibn Mas'ud became Muslim early, in ____.": { answer: "Makkah", harder: ["Siyar 1/464: 'I saw myself the sixth of six.' Ibn Mas'ud became Muslim in...?", "Kufa", "Madinah", "Taif"] },
  "Ibn Mas'ud became Muslim early, in Madinah.": { answer: "False", harder: "By Siyar 1/464, Ibn Mas'ud became Muslim in Madinah, after the Hijrah." },
  // Siyar A'lam an-Nubala 1/466.
  "Ibn Mas'ud recited the Quran out loud near the ____.": { answer: "Ka'bah", harder: ["Siyar 1/466: the first after him ﷺ to recite the Quran aloud in Makkah. Near the...?", "market", "well", "Safa hill"] },
  // Sahih al-Bukhari 5050.
  "The Prophet ﷺ asked Ibn Mas'ud to ____ the Quran to him.": { answer: "recite", harder: ["Bukhari 5050: he ﷺ wept as he listened. He asked Ibn Mas'ud to ____ the Quran.", "draw", "teach", "write"] },
  // Sahih al-Bukhari 3808.
  "The Prophet ﷺ told Muslims to learn the ____ from Ibn Mas'ud.": { answer: "Quran", harder: ["Bukhari 3808: 'learn the ____ from four', starting with Ibn Mas'ud.", "trading", "poetry", "Arabic"] },
  // Siyar A'lam an-Nubala 1/486.
  "Umar sent Ibn Mas'ud to ____ to teach the people.": { answer: "Kufa", harder: ["Siyar 1/486: 'I have sent you Ibn Mas'ud as a teacher.' Umar wrote to...?", "Rome", "Makkah", "Basra"] },
  // Siyar A'lam an-Nubala 1/464.
  "Which came first in Ibn Mas'ud's life?": { answer: "Accepting Islam", harder: ["Siyar 1/464: which came first for Ibn Mas'ud?", "Being sent to Kufa", "Reciting to him ﷺ in Madinah", "The Prophet ﷺ passes away"] },
  // Sahih al-Bukhari 3758.
  "Who was named first of the four to learn the Quran from?": { answer: "Abdullah ibn Mas'ud", harder: ["Bukhari 3758: 'learn the Quran from four.' Who is named first?", "Ubayy ibn Ka'b", "Salim", "Mu'adh ibn Jabal"] },
  "Which of these was also one of the four?": { answer: "Mu'adh ibn Jabal", harder: ["Bukhari 3758: Ibn Mas'ud, Salim, Ubayy and who?", "Zayd ibn Thabit", "Abu Musa", "Uthman"] },
  "How many teachers of the Quran did the Prophet ﷺ name?": { answer: "Four", harder: ["Bukhari 3758: how many did he ﷺ name to learn the Quran from?", "Three", "Five", "Six"] },
  // Sahih al-Bukhari 4582.
  "Why did the Prophet ﷺ ask Ibn Mas'ud to recite?": { answer: "He liked to hear the Quran from others", harder: ["Bukhari 4582: 'shall I recite to you, when it came down to you?' He ﷺ said...?", "To teach the others", "To hear your voice", "To check your memory"] },
  "Which surah did Ibn Mas'ud recite?": { answer: "An-Nisa", harder: ["Bukhari 4582: Ibn Mas'ud recited until 4:41. Which surah?", "Al-Ma'idah", "Al Imran", "Al-An'am"] },
  "What happened to the Prophet ﷺ at ayah 41?": { answer: "His eyes filled with tears", harder: ["Bukhari 4582: at 4:41, 'enough', and his ﷺ eyes...?", "Closed", "Looked up", "Smiled"] },
  "Listening to the Quran is also a Sunnah.": { answer: "True", harder: "By Bukhari 4582, the Prophet ﷺ liked to hear the Quran from others." },
  // Sahih al-Bukhari 5000.
  "How many surahs did Ibn Mas'ud learn straight from the Prophet ﷺ?": { answer: "Over seventy", harder: ["Bukhari 5000: 'I learned ____ surahs directly from him ﷺ', said Ibn Mas'ud.", "Over forty", "Over twenty", "Over a hundred"] },
  "What did he add, to stay humble?": { answer: "I am not the best of them", harder: ["Bukhari 5000: 'I know the Book well, yet...' what?", "Ask Ubayy first", "I forget much", "I learned it late"] },
  "What did knowing the Quran well make Ibn Mas'ud?": { answer: "More humble", harder: ["Bukhari 5000: knowing the Book well, Ibn Mas'ud still said 'not the best'. He was...?", "Unsure", "Afraid", "Quiet"] },
  // Sahih al-Bukhari 3763.
  "What did Abu Musa first think about Ibn Mas'ud?": { answer: "He was from the Prophet's ﷺ family", harder: ["Bukhari 3763: coming from Yemen, Abu Musa thought Ibn Mas'ud was what?", "A servant of the house", "A scribe", "A relative of Aishah"] },
  "Who came into the house with Ibn Mas'ud?": { answer: "His mother", harder: ["Bukhari 3763: Ibn Mas'ud went in so often with whom?", "His brother", "His son", "His wife"] },
  "Ibn Mas'ud was very close to the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 3763, Ibn Mas'ud went in to the Prophet ﷺ so often he seemed family." },
  // Sunan Ibn Majah 138.
  "Who was Ibn Umm Abd?": { answer: "Abdullah ibn Mas'ud", harder: ["Ibn Majah 138: 'recite it like Ibn Umm Abd.' Who is that?", "Ubayy ibn Ka'b", "Salim", "Zayd ibn Thabit"] },
  "Who brought Ibn Mas'ud the good news?": { answer: "Abu Bakr and Umar", harder: ["Ibn Majah 138: who gave Ibn Mas'ud the good news?", "Uthman and Ali", "Abu Bakr alone", "Umar alone"] },
  "Ibn Mas'ud recited the Quran as fresh as when it was revealed.": { answer: "True", harder: "By Ibn Majah 138, reciting like Ibn Umm Abd is reciting as fresh as when revealed." },
  // Siyar A'lam an-Nubala 3/395.
  "Who was the father of Anas ibn Malik?": { answer: "Malik ibn an-Nadr", harder: ["Siyar 3/395: Anas of the Ansar was the son of whom?", "Malik ibn Anas", "An-Nadr ibn Malik", "Abu Talhah"] },
  "Which tribe was Anas ibn Malik from?": { answer: "Khazraj", harder: ["Siyar 3/395: Anas ibn Malik an-Najjari of the Ansar belonged to which tribe?", "Aws", "Hudhayl", "Ghifar"] },
  // Siyar A'lam an-Nubala 3/396.
  "Anas grew up in ____, among the Ansar.": { answer: "Madinah", harder: ["Siyar 3/396: Anas of the Ansar was from which city?", "Persia", "Makkah", "Taif"] },
  "Anas grew up in Madinah, among the Ansar.": { answer: "True", harder: "By Siyar 3/396, Anas was of the Ansar, from Madinah." },
  // Sahih al-Bukhari 6334.
  "Anas's mother, ____, brought him to serve the Prophet ﷺ.": { answer: "Umm Sulaym", harder: ["Bukhari 6334: 'Anas is your servant', said his mother. Who?", "Aishah", "Khadijah", "Umm Ayman"] },
  "Anas's mother, Umm Sulaym, brought him to serve the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 6334, Umm Sulaym said Anas is your servant, and he ﷺ prayed for him." },
  // Sahih al-Bukhari 5166.
  "When the Prophet ﷺ came to Madinah, Anas was about ____.": { answer: "ten", harder: ["Bukhari 5166: Anas's age when he ﷺ came to Madinah?", "two", "forty", "twenty"] },
  "When the Prophet ﷺ came to Madinah, Anas was about ten.": { answer: "True", harder: "By Bukhari 5166, Anas was ten when he ﷺ came to Madinah." },
  // Sahih al-Bukhari 6038.
  "Anas served the Prophet ﷺ for ____ years.": { answer: "ten", harder: ["Bukhari 6038: he never once said uff to him. Anas served him ﷺ how many years?", "forty", "two", "five"] },
  // Sahih al-Bukhari 6334.
  "The Prophet ﷺ prayed for Anas to have wealth and many ____.": { answer: "children", harder: ["Bukhari 6334: he ﷺ prayed for Anas's wealth and many...?", "enemies", "worries", "friends"] },
  // Siyar A'lam an-Nubala 3/396.
  "Anas told many ____ about the Prophet ﷺ.": { answer: "hadith", harder: ["Siyar 3/396: servant of the Prophet ﷺ who passed on much...?", "poems", "jokes", "stories of war"] },
  // Tabaqat Ibn Sa'd 7/19.
  "Anas lived a long life and died in ____.": { answer: "Basra", harder: ["Tabaqat Ibn Sa'd 7/19: Anas was the last of the companions to die in which city?", "Makkah", "Persia", "Kufa"] },
  // Siyar A'lam an-Nubala 3/398.
  "Which came first in Anas's life?": { answer: "Serving the Prophet ﷺ", harder: ["Siyar 3/398: which came first for Anas?", "The Prophet ﷺ passes away", "Living in Basra", "The conquest of Persia"] },
  // Sahih al-Bukhari 2768.
  "Who brought Anas to serve the Prophet ﷺ?": { answer: "Abu Talhah", harder: ["Bukhari 2768: 'Anas is a wise boy, let him serve you.' Who said it?", "Umm Sulaym", "Malik ibn an-Nadr", "Anas's uncle"] },
  "How did Abu Talhah describe Anas?": { answer: "A wise boy", harder: ["Bukhari 2768: Abu Talhah said Anas was a ____ boy.", "Kind", "Quiet", "Strong"] },
  "Anas served the Prophet ﷺ only at home.": { answer: "False", harder: "By Bukhari 2768, Anas served him ﷺ only at home, never on journeys." },
  // Sahih al-Bukhari 6038.
  "How long did Anas serve the Prophet ﷺ?": { answer: "Ten years", harder: ["Bukhari 6038: 'he never said uff to me.' Anas served how long?", "Nine years", "Seven years", "Twelve years"] },
  "What did the Prophet ﷺ never say to him?": { answer: "Uff", harder: ["Bukhari 6038: ten years, and he ﷺ never said 'uff' nor...?", "'Thank you'", "'Well done'", "'Come here'"] },
  "What can we learn for those who help us?": { answer: "Be gentle and patient with them", harder: ["Bukhari 6038: never 'uff', never 'why did you do this?' It teaches...?", "Never ask helpers anything", "Help only family", "Praise loudly"] },
  // Sahih al-Bukhari 6344.
  "Who asked the Prophet ﷺ to make du'a for Anas?": { answer: "His mother", harder: ["Bukhari 6344: 'make du'a for your servant.' Who asked?", "Abu Talhah", "His aunt", "Anas's sister"] },
  "What did he ask Allah to increase for Anas?": { answer: "His wealth and children", harder: ["Bukhari 6344: 'O Allah, increase his...' what?", "Knowledge and age", "Wealth and strength", "Children and land"] },
  "He also asked Allah to bless what He gave Anas.": { answer: "True", harder: "By Bukhari 6344, he ﷺ asked Allah to bless what He gave Anas." },
  // Sahih Muslim 2482.
  "What was Anas doing when the Prophet ﷺ sent him on an errand?": { answer: "Playing with friends", harder: ["Muslim 2482: he ﷺ came while Anas was doing what?", "Running an errand", "Reading", "Fetching water"] },
  "Whom did Anas refuse to tell the secret?": { answer: "His own mother", harder: ["Muslim 2482: 'a secret', said Anas. To whom?", "Abu Talhah", "His friends", "Thabit"] },
  "What did his mother say about the secret?": { answer: "Never tell it to anyone", harder: ["Muslim 2482: 'a secret.' His mother said what?", "Tell me later", "Tell only Abu Talhah", "Tell after he dies"] },
  // Sahih al-Bukhari 3136.
  "Where did Ja'far live for years?": { answer: "Abyssinia", harder: ["Bukhari 3136: Abu Musa's ship took them to the Negus. Where?", "Yemen", "Egypt", "Sham"] },
  "Who told Ja'far to stay in Abyssinia?": { answer: "The Prophet ﷺ", harder: ["Bukhari 3136: 'he sent us here and told us to stay.' Who?", "Abu Bakr", "Ja'far's brother Ali", "Abu Talib"] },
  "How did Abu Musa's people reach Abyssinia?": { answer: "By ship", harder: ["Bukhari 3136: 'our ship took us to the Negus.' How did they travel?", "By caravan to Yemen first", "Across the desert", "Along the coast on foot"] },
  // Sahih al-Bukhari 3136.
  "When did Ja'far return to the Prophet ﷺ?": { answer: "When Khaybar was conquered", harder: ["Bukhari 3136: Ja'far's ship met the Prophet ﷺ when?", "At the conquest of Makkah", "After Hunayn", "At Hudaybiyah"] },
  "Ja'far's group got a share of Khaybar though they did not fight.": { answer: "True", harder: "By Bukhari 3136, the people of the ship got a share of Khaybar though they had not fought." },
  "Who came back with Ja'far?": { answer: "The people of the ship", harder: ["Bukhari 3136: shares of Khaybar went only to those who fought, except whom?", "The Ansar", "The people of the Suffah", "Banu Hashim"] },
  // Sahih al-Bukhari 4251.
  "What did the Prophet ﷺ tell Ja'far?": { answer: "You resemble me in looks and manners", harder: ["Bukhari 4251: 'you resemble me in appearance and...' what?", "Voice", "Speech", "Strength"] },
  "Who got to care for Hamzah's daughter?": { answer: "Her aunt, Ja'far's wife", harder: ["Bukhari 4251: 'the aunt is like the mother.' Who got Hamzah's daughter?", "Ali", "Zayd ibn Harithah", "Fatimah"] },
  "The Prophet ﷺ spoke kindly to all three cousins.": { answer: "True", harder: "By Bukhari 4251, he ﷺ said kind words to Ali, Ja'far and Zayd." },
  // Sahih al-Bukhari 3708.
  "Who was the most generous to the poor, said Abu Hurairah?": { answer: "Ja'far", harder: ["Bukhari 3708: the most generous to the poor, said Abu Hurairah?", "Abu Bakr", "Uthman", "Abd ar-Rahman ibn Awf"] },
  "What did Ja'far split open for the poor?": { answer: "An empty butter skin", harder: ["Bukhari 3708: Ja'far split open what, so they licked it?", "An empty honey jar", "A date bag", "A milk skin"] },
  "Ja'far gave even when he had very little.": { answer: "True", harder: "By Bukhari 3708, Ja'far shared even an empty butter skin with the poor." },
  // Sahih al-Bukhari 4262.
  "Who led the army at Mu'tah first?": { answer: "Zayd ibn Harithah", harder: ["Bukhari 4262: Mu'tah: Zayd, then Ja'far, then whom?", "Khalid ibn al-Walid", "Usamah", "Thabit ibn Arqam"] },
  "How did the people of Madinah first hear the news?": { answer: "The Prophet ﷺ told them", harder: ["Bukhari 4262: Madinah learned of the deaths at Mu'tah how?", "A rider came", "Khalid wrote", "Ja'far's son told them"] },
  "The Prophet ﷺ cried when he told of their deaths.": { answer: "True", harder: "By Bukhari 4262, his ﷺ eyes were full of tears as he told of Zayd, Ja'far and Ibn Rawahah." },
  // Sahih al-Bukhari 4260.
  "How many wounds did Ibn Umar count on Ja'far?": { answer: "Fifty", harder: ["Bukhari 4260: Ibn Umar counted Ja'far's wounds. How many?", "Seventy", "Thirty", "Ninety"] },
  "Where were none of his wounds?": { answer: "In his back", harder: ["Bukhari 4260: fifty wounds on Ja'far, and none in his...?", "Face", "Legs", "Hands"] },
  "Who counted the wounds?": { answer: "Ibn Umar", harder: ["Bukhari 4260: 'I stood beside Ja'far and counted fifty wounds.' Who?", "Abdullah ibn Ja'far", "Abdullah ibn Rawahah", "Usamah"] },
  // Sahih al-Bukhari 3709.
  "What was Ja'far called?": { answer: "The one with two wings", harder: ["Bukhari 3709: 'peace be upon you, O son of the one with...' what?", "Two swords", "Two flags", "Two hijrahs"] },
  "Whom did Ibn Umar greet this way?": { answer: "Ja'far's son", harder: ["Bukhari 3709: 'O son of the one with two wings.' Whom did Ibn Umar greet?", "Ali's son", "Abbas's son", "Zayd's son"] },
  "Ibn Umar greeted him this way only once.": { answer: "False", harder: "By Bukhari 3709, Ibn Umar greeted Ja'far's son this way only once." },
  // Sahih al-Bukhari 2827.
  "Where did Abu Hurairah reach the Prophet ﷺ?": { answer: "At Khaybar", harder: ["Bukhari 2827: Abu Hurairah reached him ﷺ after which place had fallen?", "Makkah", "Taif", "Hunayn"] },
  "Was Khaybar already conquered when he came?": { answer: "Yes, it had just fallen", harder: ["Bukhari 2827: Abu Hurairah came to Khaybar. When?", "During the siege", "Before the march", "Years later"] },
  "Abu Hurairah was one of the first Muslims in Makkah.": { answer: "False", harder: "By Bukhari 2827, Abu Hurairah was among the first Muslims in Makkah." },
  // Sahih Muslim 2491.
  "What did Abu Hurairah ask the Prophet ﷺ?": { answer: "To make dua for his mother", harder: ["Muslim 2491: Abu Hurairah's mother refused Islam. He asked the Prophet ﷺ what?", "To speak to her", "To send Aishah", "To let him leave her"] },
  "What happened when he got home?": { answer: "His mother became Muslim", harder: ["Muslim 2491: after the dua, Abu Hurairah went home. What happened?", "She was ill", "She asked to meet him ﷺ", "She asked for time"] },
  "Abu Hurairah cried a second time, from joy.": { answer: "True", harder: "By Muslim 2491, Abu Hurairah wept with joy when his mother became Muslim." },
  "What does this teach about our parents?": { answer: "Keep making dua for them", harder: ["Muslim 2491: from this story, what about our parents?", "Wait for them to ask", "Make dua only once", "Leave them to others"] },
  // Sahih Muslim 2491.
  "What did the Prophet ﷺ pray for Abu Hurairah and his mother?": { answer: "That the believers love them", harder: ["Muslim 2491: 'make them loved by the believers, and...' what else?", "Keep them safe", "Give them wealth", "Grant them Jannah"] },
  "Who asked for this dua?": { answer: "Abu Hurairah", harder: ["Muslim 2491: who asked for the dua that believers love them?", "Abu Hurairah's mother", "Anas", "Abu Bakr"] },
  "Abu Hurairah said believers who hear of him love him.": { answer: "True", harder: "By Muslim 2491, Abu Hurairah said every believer who hears of him loves him." },
  // Sahih al-Bukhari 6452.
  "What did Abu Hurairah tie over his stomach?": { answer: "A stone", harder: ["Bukhari 6452: from hunger, what did Abu Hurairah tie over his belly?", "A belt", "A palm leaf", "His cloak"] },
  "What did the Prophet ﷺ do when he saw him?": { answer: "He smiled and said: follow me", harder: ["Bukhari 6452: seeing Abu Hurairah by the road, he ﷺ did what?", "Gave him a date", "Asked what was wrong", "Called Abu Bakr"] },
  "Who walked past before the Prophet ﷺ came?": { answer: "Abu Bakr and Umar", harder: ["Bukhari 6452: who passed before the Prophet ﷺ came?", "Abu Bakr only", "Umar only", "Uthman and Ali"] },
  // Sahih al-Bukhari 6452.
  "Who were the people of the Suffah?": { answer: "Poor guests of Islam", harder: ["Bukhari 6452: who were the people of the Suffah?", "The Ansar's workers", "Travellers from Makkah", "Students of Ibn Mas'ud"] },
  "How many bowls of milk were there?": { answer: "One", harder: ["Bukhari 6452: how much milk did he ﷺ have for all the Suffah?", "Two bowls", "Three bowls", "A skin"] },
  "Who drank last?": { answer: "The Prophet ﷺ", harder: ["Bukhari 6452: Abu Hurairah drank until no room. Who drank last?", "Abu Hurairah", "The oldest man", "No one"] },
  "Abu Hurairah drank before the people of the Suffah.": { answer: "False", harder: "By Bukhari 6452, Abu Hurairah drank before the people of the Suffah." },
  // Sahih al-Bukhari 119.
  "What was Abu Hurairah's problem?": { answer: "He forgot the hadith he heard", harder: ["Bukhari 119: 'I hear many things from you but...' what?", "I cannot write them", "I do not understand", "I cannot ask"] },
  "What did the Prophet ﷺ tell him to spread?": { answer: "His cloak", harder: ["Bukhari 119: 'spread your ____.' He ﷺ moved his hands as if filling it.", "Turban", "Sleeve", "Hands"] },
  "After that day, Abu Hurairah never forgot anything.": { answer: "True", harder: "By Bukhari 119, after spreading his cloak Abu Hurairah never forgot anything." },
  // Sahih al-Bukhari 118.
  "Why do we have so many hadith from Abu Hurairah?": { answer: "He stayed close to the Prophet ﷺ", harder: ["Bukhari 118: why so many hadith from Abu Hurairah?", "He was the oldest", "He travelled widely", "He asked others"] },
  "What kept the Ansar busy?": { answer: "Their farms", harder: ["Bukhari 118: the Muhajirun had markets. What kept the Ansar busy?", "Their trade", "Their wars", "Their camels"] },
  "Ayahs of the Quran warn against hiding knowledge.": { answer: "True", harder: "By Bukhari 118, Abu Hurairah narrated because of 2:159-160, against hiding knowledge." },
  // Sahih al-Bukhari 99.
  "Why did the Prophet ﷺ expect Abu Hurairah to ask first?": { answer: "His love for hadith", harder: ["Bukhari 99: 'I thought no one would ask this before you.' Why?", "He was the youngest", "He was always near", "He was poor"] },
  "Who is luckiest with the Prophet's ﷺ intercession?": { answer: "Whoever says la ilaha illallah sincerely", harder: ["Bukhari 99: the luckiest with his ﷺ intercession is whoever...?", "Prays the most", "Fasts the most", "Gives the most"] },
  "Asking good questions is part of seeking knowledge.": { answer: "True", harder: "By Bukhari 99, his ﷺ praise of Abu Hurairah's eagerness shows asking is part of seeking knowledge." },
  // Sahih al-Bukhari 1178.
  "How many days a month did he fast on this advice?": { answer: "Three", harder: ["Bukhari 1178: 'my friend ﷺ advised me' to fast how many days a month?", "Six", "Five", "Seven"] },
  "Which prayer did he pray in the late morning?": { answer: "Duha", harder: ["Bukhari 1178: of the three, which prayer is in the late morning?", "Ishraq after Fajr", "Zuhr's sunnah", "Tahiyyat al-Masjid"] },
  "When did he pray witr?": { answer: "Before sleeping", harder: ["Bukhari 1178: the third advice was witr when?", "After Isha in the masjid", "At the end of the night", "Before Fajr"] },
  "Abu Hurairah stopped these deeds when he grew old.": { answer: "False", harder: "By Bukhari 1178, Abu Hurairah gave up the three deeds in old age." },
  // Sahih al-Bukhari 4418.
  "Which night did Ka'b see with the Prophet ﷺ?": { answer: "The night of Al-Aqabah", harder: ["Bukhari 4418: Ka'b said he would not swap which night for Badr?", "The night of the Trench", "The night of Hunayn", "The night of Mina"] },
  "Which did Ka'b love more: Al-Aqabah or Badr?": { answer: "Al-Aqabah", harder: ["Bukhari 4418: Ka'b preferred Al-Aqabah over Badr. Why was Badr known?", "He loved Badr more", "Both the same", "Badr was holier to him"] },
  "Ka'b was blamed for missing the Battle of Badr.": { answer: "False", harder: "By Bukhari 4418, Ka'b was blamed for missing Badr." },
  // Sahih al-Bukhari 4418.
  "How many she-camels did Ka'b own before Tabuk?": { answer: "Two", harder: ["Bukhari 4418: before Tabuk, Ka'b owned she-camels for the first time. How many?", "Three", "Four", "Five"] },
  "What was the weather when the army left for Tabuk?": { answer: "Very hot", harder: ["Bukhari 4418: the march to Tabuk was in what?", "Cool winter", "The rainy season", "Ramadan's fasting days"] },
  "Ka'b stayed behind because he was too poor to go.": { answer: "False", harder: "By Bukhari 4418, Ka'b stayed behind because he was too poor to go." },
  "For Tabuk, the Prophet ﷺ said clearly where the army was going.": { answer: "True", harder: "By Bukhari 4418, he ﷺ made clear the army was going to Tabuk, against a large enemy." },
  // Sahih al-Bukhari 4418.
  "Why did Ka'b miss the army leaving for Tabuk?": { answer: "He kept putting it off", harder: ["Bukhari 4418: why did Ka'b miss the army leaving?", "He was ill that week", "He was guarding Madinah", "His camels ran off"] },
  "What did Ka'b tell himself each time?": { answer: "I can do that", harder: ["Bukhari 4418: each day, Ka'b said to himself...?", "Tomorrow, maybe", "They will wait", "I will catch them"] },
  "What does Ka'b's delay teach us?": { answer: "Do a good deed now, not later", harder: ["Bukhari 4418: Ka'b kept saying 'I can do that.' The lesson?", "Prepare only at the last moment", "Travel alone", "Trust that you can"] },
  // Sahih al-Bukhari 4418.
  "Who spoke up for Ka'b at Tabuk?": { answer: "Mu'adh ibn Jabal", harder: ["Bukhari 4418: at Tabuk a man blamed Ka'b's fine clothes. Who answered him?", "Abu Dharr", "Ka'b's cousin", "Umar"] },
  "What did Mu'adh say about Ka'b?": { answer: "We know nothing but good about him", harder: ["Bukhari 4418: 'what a bad thing you said!' What else did Mu'adh say?", "He will come soon", "He has an excuse", "Forgive him"] },
  "Who did Ka'b see left behind in Madinah?": { answer: "The excused and those accused of hypocrisy", harder: ["Bukhari 4418: in Madinah, who did Ka'b see left behind?", "Old men only", "Women and children only", "Only the hypocrites"] },
  "Defending an absent brother's honor is a good deed.": { answer: "True", harder: "By Bukhari 4418, Mu'adh defended Ka'b's honour while he was absent." },
  // Sahih al-Bukhari 4418.
  "About how many men gave excuses after Tabuk?": { answer: "Over eighty", harder: ["Bukhari 4418: excuses with oaths after Tabuk. How many men?", "Over forty", "Over twenty", "Over two hundred"] },
  "What did Ka'b decide to tell the Prophet ﷺ?": { answer: "The plain truth", harder: ["Bukhari 4418: 'a lie would never save me.' So Ka'b told...?", "A half truth", "A short excuse", "Only that he was late"] },
  "What did the Prophet ﷺ say about Ka'b?": { answer: "He has told the truth", harder: ["Bukhari 4418: after Ka'b spoke, he ﷺ said what?", "He is forgiven", "Wait for Allah's word", "He has lied"] },
  "Ka'b said he had a good excuse for staying behind.": { answer: "False", harder: "By Bukhari 4418, Ka'b told the Prophet ﷺ he had a good excuse." },
  // Sahih al-Bukhari 4418.
  "Who were the other two who told the truth?": { answer: "Murarah and Hilal", harder: ["Bukhari 4418: the other two in Ka'b's place were whom?", "Hilal and Abu Lubabah", "Murarah and Abu Khaythamah", "Hilal and Abu Dharr"] },
  "Which battle had Murarah and Hilal fought in?": { answer: "Badr", harder: ["Bukhari 4418: Murarah and Hilal were righteous men who fought at...?", "Uhud", "The Trench", "Khaybar"] },
  "Ka'b went back and made an excuse after people blamed him.": { answer: "False", harder: "By Bukhari 4418, Ka'b went back with an excuse after people blamed him." },
  // Sahih al-Bukhari 4418.
  "How long did people not speak to the three?": { answer: "Fifty nights", harder: ["Bukhari 4418: the three were not spoken to for how long?", "Forty nights", "Thirty nights", "Sixty nights"] },
  "During those nights, Ka'b kept praying with the Muslims.": { answer: "True", harder: "By Bukhari 4418, Ka'b still went out and prayed with the Muslims during the boycott." },
  "Which cousin did Ka'b visit over the wall?": { answer: "Abu Qatadah", harder: ["Bukhari 4418: Ka'b climbed whose wall to greet him?", "His brother", "His uncle", "Mu'adh's"] },
  "What did Abu Qatadah finally say to him?": { answer: "Allah and His Messenger know best", harder: ["Bukhari 4418: asked three times, what did Abu Qatadah say?", "I cannot speak", "May Allah forgive you", "Wait a few days"] },
  // Sahih al-Bukhari 4418.
  "Who sent Ka'b the letter?": { answer: "The king of Ghassan", harder: ["Bukhari 4418: a letter came from Sham for Ka'b. Who sent it?", "The Roman emperor", "The governor of Sham", "A Christian monk"] },
  "What did Ka'b do with the letter?": { answer: "Burned it in the oven", harder: ["Bukhari 4418: 'this too is a test.' What did Ka'b do with it?", "Gave it to the Prophet ﷺ", "Tore it up", "Sent it back"] },
  "Ka'b left Madinah to join the king.": { answer: "False", harder: "By Bukhari 4418, Ka'b left Madinah to join the king who wrote to him." },
  // Sahih al-Bukhari 4418.
  "What did Ka'b do when he heard the good news?": { answer: "He fell into sujud", harder: ["Bukhari 4418: 'O Ka'b ibn Malik, be happy!' Ka'b...?", "Wept aloud", "Ran to the Prophet ﷺ", "Gave thanks out loud"] },
  "After which prayer did the good news come?": { answer: "Fajr", harder: ["Bukhari 4418: on the fiftieth morning, the call came after which prayer?", "Witr", "Tahajjud", "Duha"] },
  "What did Ka'b give the man who brought the news?": { answer: "His clothes", harder: ["Bukhari 4418: Ka'b rewarded the bearer of good news with what?", "A sheep", "Money", "Dates"] },
  // Sahih al-Bukhari 4418.
  "Which Muhajir stood up to congratulate Ka'b?": { answer: "Talhah", harder: ["Bukhari 4418: in the masjid, who of the Muhajirun stood to greet Ka'b?", "Abu Bakr", "Az-Zubayr", "Uthman"] },
  "What did the Prophet ﷺ call that day for Ka'b?": { answer: "His best day since he was born", harder: ["Bukhari 4418: 'be happy with the best day...' since when?", "Since you became Muslim", "Since Badr", "Since the Hijrah"] },
  "Ka'b's forgiveness came from Allah.": { answer: "True", harder: "By Bukhari 4418, Ka'b's forgiveness came from Allah, not only from the Prophet ﷺ." },
  // Quran 9:118.
  "In which surah are the three mentioned?": { answer: "At-Tawbah", harder: ["Quran 9:118 tells of the three left behind. Which surah?", "Al-Anfal", "An-Nur", "Al-Ahzab"] },
  "How did the earth feel to the three?": { answer: "Narrow, wide as it was", harder: ["Quran 9:118: the earth closed in on them despite...", "Its riches", "Its people", "Its beauty"] },
  "Where did they learn the only refuge from Allah is?": { answer: "In Allah Himself", harder: ["Quran 9:118: they knew there was no refuge from Allah except where?", "In the Prophet ﷺ", "In the masjid", "In patience"] },
  // Sahih al-Bukhari 4418.
  "What did Ka'b promise after his repentance?": { answer: "To tell only the truth", harder: ["Bukhari 4418: as part of his repentance, Ka'b promised what?", "To give all his wealth", "To fast all his life", "To never miss a battle"] },
  "The Prophet ﷺ told Ka'b to keep some of his wealth.": { answer: "True", harder: "By Bukhari 4418, he ﷺ told Ka'b to keep some of his wealth, not give it all." },
  "Which ayah came down with Ka'b's story?": { answer: "Be with those who are truthful", harder: ["Bukhari 4418: with Ka'b's story, 9:119 came down. What does it say?", "Fear Allah and fight", "Turn to Allah together", "Be patient with them"] },
  "What saved Ka'b in the end?": { answer: "Telling the truth", harder: ["Bukhari 4418: in the end, what saved Ka'b?", "Mu'adh's words", "His Aqabah pledge", "His fifty nights"] },
  // Sahih al-Bukhari 3632.
  "Why did Sa'd go to Makkah?": { answer: "To do Umrah", harder: ["Bukhari 3632: why did Sa'd ibn Mu'adh come to Makkah?", "For Hajj", "To meet Umayyah", "To bring news"] },
  "Who tried to stop Sa'd's tawaf?": { answer: "Abu Jahl", harder: ["Bukhari 3632: during his tawaf, who challenged Sa'd ibn Mu'adh?", "Umayyah ibn Khalaf", "Utbah", "Abu Sufyan"] },
  "What did Sa'd say he would block?": { answer: "Their trade road to Sham", harder: ["Bukhari 3632: if stopped, Sa'd said he would block what?", "Their road to Yemen", "Their water", "Their caravans to Iraq"] },
  "Sa'd was afraid and left without tawaf.": { answer: "False", harder: "By Bukhari 3632, Sa'd grew afraid of Abu Jahl and left without tawaf." },
  // Sahih al-Bukhari 4122.
  "In which battle was Sa'd wounded?": { answer: "The Trench", harder: ["Bukhari 4122: Sa'd ibn Mu'adh was wounded on which day?", "Uhud", "Khaybar", "Banu Qurayzah"] },
  "Where did the Prophet ﷺ put a tent for Sa'd?": { answer: "In the mosque", harder: ["Bukhari 4122: so he ﷺ could visit Sa'd from near, the tent was where?", "By his house", "In Sa'd's garden", "At the Trench"] },
  "What hit Sa'd's arm?": { answer: "An arrow", harder: ["Bukhari 4122: what hit the vein of Sa'd's arm at the Trench?", "A spear", "A sword blow", "A rock"] },
  // Sahih al-Bukhari 4122.
  "What did Sa'd love most?": { answer: "Striving in Allah's cause", harder: ["Bukhari 4122: 'nothing is more beloved to me than...' what?", "Seeing Makkah", "Leading my tribe", "My family"] },
  "What did Sa'd ask, if the war was over?": { answer: "That his wound be his end", harder: ["Bukhari 4122: if the fighting was over, Sa'd asked what?", "To heal quickly", "To see Makkah", "To lead the Ansar"] },
  "Sa'd's dua was answered.": { answer: "True", harder: "By Bukhari 4122, Sa'd's wound opened and he died, as he had asked." },
  // Sahih al-Bukhari 4121.
  "What did the Prophet ﷺ tell the Ansar when Sa'd came?": { answer: "Stand up for your chief", harder: ["Bukhari 4121: Sa'd came riding. He ﷺ told the Ansar...?", "Help him down", "Make room", "Welcome your guest"] },
  "What was Sa'd riding?": { answer: "A donkey", harder: ["Bukhari 4121: Sa'd came near the mosque riding what?", "A mule", "A she-camel", "A horse"] },
  "The Prophet ﷺ said Sa'd judged with Allah's judgment.": { answer: "True", harder: "By Bukhari 4121, he ﷺ told Sa'd: you have judged with Allah's judgment." },
  // Sahih al-Bukhari 3803.
  "What shook when Sa'd ibn Mu'adh died?": { answer: "The Throne of the Most Merciful", harder: ["Bukhari 3803: at Sa'd ibn Mu'adh's death, what shook?", "The earth of Madinah", "The heavens", "The minbar"] },
  "Who heard the Prophet ﷺ say this?": { answer: "Jabir ibn Abdullah", harder: ["Bukhari 3803: who heard 'the Throne shook at the death of Sa'd'?", "Anas ibn Malik", "Abu Sa'id", "Aishah"] },
  "This shows Sa'd's high place with Allah.": { answer: "True", harder: "By Bukhari 3803, the Throne of the Most Merciful shook at Sa'd ibn Mu'adh's death." },
  // Sahih al-Bukhari 3802.
  "What did the companions admire?": { answer: "A soft silk cloth", harder: ["Bukhari 3802: the companions admired the softness of what?", "A woollen cloak", "A cotton robe", "A fur"] },
  "What of Sa'd's is better in Paradise?": { answer: "His handkerchiefs", harder: ["Bukhari 3802: better and softer in Paradise are Sa'd's what?", "Clothes", "Beds", "Cushions"] },
  "The best things of this world are small next to Paradise.": { answer: "True", harder: "By Bukhari 3802, even soft silk is less than Sa'd's handkerchiefs in Paradise." },
  // Sahih al-Bukhari 3781.
  "Who became Abdur-Rahman's brother in Madinah?": { answer: "Sa'd ibn ar-Rabi", harder: ["Bukhari 3781: in Madinah, Abdur-Rahman's brother was which rich Ansari?", "Sa'd ibn Ubadah", "Abu Talhah", "Usayd ibn Hudayr"] },
  "What did Sa'd ibn ar-Rabi offer him?": { answer: "Half of his property", harder: ["Bukhari 3781: Sa'd ibn ar-Rabi offered Abdur-Rahman what?", "A third of his wealth", "His best garden", "A loan"] },
  "Sa'd ibn ar-Rabi was from the Ansar.": { answer: "True", harder: "By Bukhari 3781, Sa'd ibn ar-Rabi was a rich man of the Ansar." },
  // Sahih al-Bukhari 2049.
  "What did Abdur-Rahman ask his new brother for?": { answer: "The way to the market", harder: ["Bukhari 2049: 'may Allah bless you in your family and property.' Then he asked for...?", "A loan to start", "A few dates", "A place to live"] },
  "What did he bring home from the market?": { answer: "Dried yogurt and butter", harder: ["Bukhari 2049: Abdur-Rahman came back with what profit?", "Milk and dates", "A few dirhams", "Bread and meat"] },
  "Abdur-Rahman took half of Sa'd's wealth.": { answer: "False", harder: "By Bukhari 2049, Abdur-Rahman took half of Sa'd's wealth." },
  // Sahih al-Bukhari 5155.
  "How did the Prophet ﷺ know he had married?": { answer: "He saw yellow scent on him", harder: ["Bukhari 5155: how did he ﷺ know Abdur-Rahman had married?", "He wore new clothes", "He was smiling", "His friends said"] },
  "What mahr did Abdur-Rahman give?": { answer: "Gold the weight of a date stone", harder: ["Bukhari 5155: Abdur-Rahman's mahr was gold the weight of...?", "A dinar", "A ring", "A date"] },
  "What did the Prophet ﷺ tell him to do?": { answer: "Give a walimah, even with one sheep", harder: ["Bukhari 5155: 'may Allah bless you. Offer a ____, even with one sheep.'", "Gift to the poor", "Charity", "Feast for the Ansar"] },
  // Sahih al-Bukhari 3141.
  "Who asked Abdur-Rahman about Abu Jahl at Badr?": { answer: "Two young Ansari boys", harder: ["Bukhari 3141: at Badr, who asked Abdur-Rahman 'do you know Abu Jahl?'", "Two Makkan youths", "Two Muhajir boys", "Ali and Hamzah"] },
  "Why did the boys look for Abu Jahl?": { answer: "He insulted the Prophet ﷺ", harder: ["Bukhari 3141: the boys sought Abu Jahl because he...?", "Killed their father", "Led the army", "Tortured Bilal"] },
  "What was the name of both boys?": { answer: "Mu'adh", harder: ["Bukhari 3141: both Ansari boys at Badr had which name?", "Mu'awwidh", "Amr", "Sa'd"] },
  // Sahih al-Bukhari 1275.
  "Whom did Abdur-Rahman remember at his meal?": { answer: "Mus'ab and Hamzah", harder: ["Bukhari 1275: fasting, food came. Abdur-Rahman remembered whom?", "Abu Bakr and Umar", "Sa'd and Uthman", "Bilal and Ammar"] },
  "What was Mus'ab shrouded in?": { answer: "A single sheet", harder: ["Bukhari 1275: Mus'ab, better than him, was shrouded in what?", "Two sheets", "His cloak", "Palm leaves"] },
  "What did Abdur-Rahman fear?": { answer: "Getting his reward in this world", harder: ["Bukhari 1275: 'I fear our rewards were...' what?", "Taken away", "Too small", "Forgotten"] },
  "Wealth made Abdur-Rahman proud and careless.": { answer: "False", harder: "By Bukhari 1275, Abdur-Rahman ate his food happily, with no fear for his reward." },
  // Sahih al-Bukhari 7207.
  "What did Abdur-Rahman do for the caliphate?": { answer: "Stepped aside to help choose", harder: ["Bukhari 7207: 'I will not compete with you for this.' What did Abdur-Rahman do?", "Named himself", "Asked Ali to choose", "Waited for a sign"] },
  "How long did he consult the people?": { answer: "Three nights", harder: ["Bukhari 7207: Abdur-Rahman consulted people before the pledge. How long?", "Seven nights", "One night", "Ten days"] },
  "Who became caliph after Umar?": { answer: "Uthman", harder: ["Bukhari 7207: after three nights of asking, the people pledged to whom?", "Ali", "Sa'd", "Az-Zubayr"] },
  // Sahih al-Bukhari 3758.
  "How many people did the Prophet ﷺ name to learn the Quran from?": { answer: "Four", harder: ["Bukhari 3758: 'learn the recitation of the Quran from...' how many?", "Three", "Five", "Six"] },
  "Who was NOT one of the four?": { answer: "Abu Hurairah", harder: ["Bukhari 3758: Ibn Mas'ud, Salim, Ubayy, Mu'adh. Who was NOT one?", "Mu'adh ibn Jabal", "Ubayy ibn Ka'b", "Abdullah ibn Mas'ud"] },
  "The Prophet ﷺ trusted Mu'adh to teach the Quran.": { answer: "True", harder: "By Bukhari 3758, Mu'adh was one of the four to learn the Quran from." },
  // Sahih al-Bukhari 6500.
  "What is Allah's right over His servants?": { answer: "To worship Him alone", harder: ["Bukhari 6500: Allah's right over His servants is to worship Him and...?", "Pray five times", "Fast Ramadan", "Obey their rulers"] },
  "Where was Mu'adh when he learned this?": { answer: "Riding behind the Prophet ﷺ", harder: ["Bukhari 6500: 'only the back of the saddle between us.' Mu'adh was where?", "Walking beside him", "In the masjid", "On his own camel"] },
  "The Prophet ﷺ called Mu'adh only once.": { answer: "False", harder: "By Bukhari 6500, he ﷺ called 'O Mu'adh' only once before telling him." },
  // Sunan Abi Dawud 1522.
  "What did the Prophet ﷺ tell Mu'adh as he held his hand?": { answer: "By Allah, I love you", harder: ["Abu Dawud 1522: holding Mu'adh's hand, he ﷺ said what?", "I trust you, Mu'adh", "Remember me, Mu'adh", "Teach them, Mu'adh"] },
  "When should this dua be said?": { answer: "After every prayer", harder: ["Abu Dawud 1522: 'O Allah, help me to remember You...' When to say it?", "At night only", "Before sleeping", "After Fajr only"] },
  "What do we ask Allah's help for in this dua?": { answer: "Remembering, thanking and worshipping Him well", harder: ["Abu Dawud 1522: help me to remember You, to thank You, and to...?", "Fear You", "Obey my parents", "Seek knowledge"] },
  // Jami at-Tirmidhi 3790.
  "What did Mu'adh know best of all?": { answer: "What is halal and haram", harder: ["Tirmidhi 3790: 'the most knowledgeable of the lawful and unlawful is...' whom?", "Zayd ibn Thabit", "Ubayy", "Ali"] },
  "Whom did the Prophet ﷺ call the most merciful of the ummah?": { answer: "Abu Bakr", harder: ["Tirmidhi 3790: 'the most merciful of my ummah is...' whom?", "Uthman", "Abu Ubaydah", "Ali"] },
  "Who was called the trustworthy one of this ummah?": { answer: "Abu Ubaydah", harder: ["Tirmidhi 3790: 'the trustworthy one of this ummah' is whom?", "Abu Bakr", "Zayd", "Ubayy"] },
  // Sahih al-Bukhari 705.
  "Which surah did Mu'adh recite in Isha?": { answer: "Al-Baqarah", harder: ["Bukhari 705: in Isha, Mu'adh recited a long surah and a man left. Which?", "An-Nisa", "Al Imran", "Al-Kahf"] },
  "Which surahs did the Prophet ﷺ suggest instead?": { answer: "Al-A'la, Ash-Shams, Al-Layl", harder: ["Bukhari 705: 'are you putting the people to trial?' Recite which instead?", "Al-Fatihah only", "Al-Mulk and Al-Insan", "Yasin and Ar-Rahman"] },
  "Why should an imam keep the prayer light?": { answer: "The old, weak and needy pray behind", harder: ["Bukhari 705: why keep it light, he ﷺ told Mu'adh?", "Night is short", "Isha is a short prayer", "People work early"] },
  // Sahih al-Bukhari 4341.
  "Where was Mu'adh sent?": { answer: "Yemen", harder: ["Bukhari 4341: Abu Musa and Mu'adh, each over one province. Where?", "Bahrain", "Oman", "Najran"] },
  "What was the Prophet's ﷺ advice to them?": { answer: "Make things easy, not hard", harder: ["Bukhari 4341: 'make things easy... give good news and...' what?", "Teach them slowly", "Live among them", "Do not take gifts"] },
  "Who went to Yemen with Mu'adh?": { answer: "Abu Musa al-Ash'ari", harder: ["Bukhari 4341: who went with Mu'adh, over the other province of Yemen?", "Ali", "Khalid", "Jarir"] },
  // Sahih al-Bukhari 1496.
  "What was Mu'adh to teach first?": { answer: "The testimony of faith", harder: ["Bukhari 1496: Mu'adh was to teach first the testimony, then...?", "Zakat first", "Fasting first", "Hajj first"] },
  "Whose dua has no screen before Allah?": { answer: "The oppressed", harder: ["Bukhari 1496: 'fear the dua of the ____, for there is no screen.'", "Orphan", "Traveller", "Mother"] },
  "Zakat is taken from the poor and given to the rich.": { answer: "False", harder: "By Bukhari 1496, zakat is taken from their poor and given to their rich." },
  // Sahih al-Bukhari 4961.
  "What did Allah order the Prophet ﷺ to do for Ubayy?": { answer: "Recite the Quran to him", harder: ["Bukhari 4961: 'Allah has ordered me to...' what, for Ubayy?", "Teach you the Quran", "Make you imam", "Hear you recite"] },
  "What did Ubayy ask?": { answer: "Did Allah mention me by name?", harder: ["Bukhari 4961: 'Allah ordered me to recite to you.' Ubayy's question?", "Which surah?", "Why me?", "When?"] },
  "How did Ubayy react?": { answer: "He burst into tears", harder: ["Bukhari 4961: named by the Lord of the worlds, Ubayy did what?", "Fell in sujud", "Praised Allah aloud", "Smiled"] },
  // Sahih Muslim 810.
  "Which ayah did Ubayy say is the greatest?": { answer: "Ayat al-Kursi", harder: ["Muslim 810: 'which ayah of Allah's Book is greatest?' Ubayy said...?", "Al-Ikhlas", "The first ayah of Al-Hadid", "An-Nur 35"] },
  "What did the Prophet ﷺ call Ubayy?": { answer: "Abul-Mundhir", harder: ["Muslim 810: 'may knowledge be pleasant for you, Abul-...' what?", "Abul-Hasan", "Abul-Qasim", "Abu Abdillah"] },
  "The Prophet ﷺ was pleased with Ubayy's answer.": { answer: "True", harder: "By Muslim 810, he ﷺ struck Ubayy's chest and praised his knowledge." },
  // Jami at-Tirmidhi 3790.
  "Who was the best reciter of the ummah?": { answer: "Ubayy ibn Ka'b", harder: ["Tirmidhi 3790: 'the best reciter among them is...' whom?", "Ibn Mas'ud", "Mu'adh", "Zayd ibn Thabit"] },
  "Who knew inheritance best?": { answer: "Zayd ibn Thabit", harder: ["Tirmidhi 3790: 'the most knowledgeable of inheritance is...' whom?", "Mu'adh ibn Jabal", "Ali", "Ibn Abbas"] },
  "Ubayy was famous for poetry, not the Quran.": { answer: "False", harder: "By Tirmidhi 3790, Ubayy was named the best poet, not the best reciter." },
  // Sahih al-Bukhari 122.
  "Which story did Ubayy narrate from the Prophet ﷺ?": { answer: "Musa and Al-Khidr", harder: ["Bukhari 122: Ubayy narrated Musa addressing Banu Isra'il, then his journey with...?", "Harun", "Yusha alone", "Shu'ayb"] },
  "Which companion learned this story from Ubayy?": { answer: "Ibn Abbas", harder: ["Bukhari 122: who heard the story of Musa and Al-Khidr from Ubayy?", "Abu Hurairah", "Ibn Umar", "Anas"] },
  "In which surah is this story told?": { answer: "Al-Kahf", harder: ["Bukhari 122: the journey of Musa and Al-Khidr is told in which surah?", "Ta-Ha", "Al-Qasas", "Al-Isra"] },
  // Sahih al-Bukhari 6245.
  "Who did Ubayy send as the witness?": { answer: "The youngest of them", harder: ["Bukhari 6245: 'none will go with you but...' who, said Ubayy?", "The eldest of us", "The Ansar's chief", "Ubayy himself"] },
  "Who was the youngest, who went?": { answer: "Abu Sa'id al-Khudri", harder: ["Bukhari 6245: 'I was the youngest, so I went.' Who said it?", "Anas ibn Malik", "Jabir", "Zayd ibn Thabit"] },
  "Why send the youngest?": { answer: "Even the youngest knew that hadith", harder: ["Bukhari 6245: why send the youngest to Umar?", "He had the best memory", "He was Umar's friend", "He had time"] },
  // Sahih al-Bukhari 2010.
  "In which month did Umar gather the people behind Ubayy?": { answer: "Ramadan", harder: ["Bukhari 2010: Umar gathered the people behind Ubayy in which month?", "Dhul-Hijjah", "Sha'ban", "Rabi al-Awwal"] },
  "How were people praying before?": { answer: "In small separate groups", harder: ["Bukhari 2010: before, how were they praying in the masjid?", "Behind Ubayy", "Behind Tamim", "In one row"] },
  "Umar chose Ubayy to lead because he recited so well.": { answer: "True", harder: "By Bukhari 2010, Umar gathered the people behind one reciter, Ubayy ibn Ka'b." },
  // Sahih al-Bukhari 4990.
  "What job did Zayd do for the Prophet ﷺ?": { answer: "He wrote down the revelation", harder: ["Bukhari 4990: 'call Zayd and let him bring the board.' Zayd's job?", "He kept the masjid", "He taught children", "He read letters"] },
  "What did Zayd write on?": { answer: "A board and a shoulder bone", harder: ["Bukhari 4990: 'bring the board, the inkpot and the...' what?", "Palm leaf", "Skin", "Stone"] },
  "Which ayah did he write that day?": { answer: "An-Nisa 4:95", harder: ["Bukhari 4990: 'not equal are those who sit at home.' Which ayah?", "At-Tawbah 9:41", "Al-Anfal 8:65", "Al-Hujurat 49:15"] },
  // Sahih al-Bukhari 3810.
  "How many Ansar collected the Quran in the Prophet's ﷺ lifetime, said Anas?": { answer: "Four", harder: ["Bukhari 3810: the Quran was collected in his ﷺ lifetime by how many Ansar?", "Three", "Five", "Seven"] },
  "Which of these was NOT one of the four?": { answer: "Abu Hurairah", harder: ["Bukhari 3810: Ubayy, Mu'adh, Abu Zayd and who?", "Ibn Mas'ud", "Salim", "Abu Talhah"] },
  "All four were from the Ansar.": { answer: "True", harder: "By Bukhari 3810, the four who collected the Quran then were all from the Ansar." },
  // Sahih al-Bukhari 4986.
  "After which battle was the Quran gathered into one book?": { answer: "Yamamah", harder: ["Bukhari 4986: many reciters killed at which battle led to gathering the Quran?", "Mu'tah", "Hunayn", "The Trench"] },
  "Who first suggested gathering the Quran?": { answer: "Umar", harder: ["Bukhari 4986: who urged Abu Bakr to gather the Quran?", "Uthman", "Ubayy", "Zayd's father"] },
  "Why did Abu Bakr choose Zayd?": { answer: "Young, wise, trusted, a scribe of revelation", harder: ["Bukhari 4986: 'you are a wise young man, we do not suspect you, and...'", "You have a good voice", "You are from the Ansar", "You are Umar's friend"] },
  // Sahih al-Bukhari 4986.
  "What did Zayd say would be lighter than gathering the Quran?": { answer: "Moving a mountain", harder: ["Bukhari 4986: 'had they told me to move ____, it would not be heavier.'", "A house", "A river", "The Kabah"] },
  "Where did Zayd gather the Quran from?": { answer: "Written pieces and people's memory", harder: ["Bukhari 4986: Zayd gathered it from what?", "His own memory only", "The Prophet's ﷺ book", "Ubayy's copy"] },
  "Who kept the pages after Umar?": { answer: "Hafsah", harder: ["Bukhari 4986: the pages stayed with Abu Bakr, then Umar, then whom?", "Uthman", "Aishah", "Ibn Umar"] },
  // Sahih al-Bukhari 2807.
  "With whom did Zayd find the ayah of Al-Ahzab?": { answer: "Khuzaymah ibn Thabit", harder: ["Bukhari 2807: an ayah of Al-Ahzab was found only with whom?", "Abu Khuzaymah", "Ubayy", "Mu'adh"] },
  "Khuzaymah's witness counted as how many men?": { answer: "Two", harder: ["Bukhari 2807: Khuzaymah's witness was counted as equal to...?", "Three men", "Four men", "Ten men"] },
  "Zayd had never heard that ayah before.": { answer: "False", harder: "By Bukhari 2807, Zayd had never heard that ayah of Al-Ahzab before." },
  // Sahih al-Bukhari 4987.
  "Which caliph had Zayd write copies of the Quran?": { answer: "Uthman", harder: ["Bukhari 4987: which caliph took Hafsah's pages and had Zayd copy them?", "Abu Bakr", "Umar", "Ali"] },
  "Who warned Uthman about people differing?": { answer: "Hudhayfah", harder: ["Bukhari 4987: who warned Uthman about differing in recitation?", "Ibn Mas'ud", "Abu Musa", "Ubayy"] },
  "Where were the pages of Abu Bakr kept?": { answer: "With Hafsah", harder: ["Bukhari 4987: Uthman got the pages from whom?", "Aishah", "Zayd", "Umm Salamah"] },
  // Sahih al-Bukhari 4388.
  "Where did Abu Musa's people come from?": { answer: "Yemen", harder: ["Bukhari 4388: 'the people of ____ have come, gentler and softer of heart.'", "Najd", "Bahrain", "Hijaz"] },
  "How did the Prophet ﷺ describe the people of Yemen?": { answer: "Gentle and soft-hearted", harder: ["Bukhari 4388: the people of Yemen are what?", "Strong and brave", "Rich and generous", "Learned and wise"] },
  "The Prophet ﷺ said faith and wisdom are Yemeni.": { answer: "True", harder: "By Bukhari 4388, he ﷺ said faith is Yemeni and wisdom is Yemeni." },
  // Sahih al-Bukhari 5048.
  "What gift did Abu Musa have?": { answer: "A beautiful voice for the Quran", harder: ["Bukhari 5048: what was Abu Musa given?", "Strong memory", "Deep knowledge", "A long life"] },
  "Whose family's voice was his compared to?": { answer: "Prophet Dawud's", harder: ["Bukhari 5048: 'one of the sweet voices of the family of...' whom?", "Sulayman", "Musa", "Ibrahim"] },
  "The Prophet ﷺ praised Abu Musa's recitation.": { answer: "True", harder: "By Bukhari 5048, he ﷺ praised Abu Musa's sweet voice in the Quran." },
  // Sahih al-Bukhari 4232.
  "How did the Prophet ﷺ recognize the Ash'aris' houses?": { answer: "By their Quran at night", harder: ["Bukhari 4232: he ﷺ knew the Ash'aris' houses how?", "By day", "By their fires", "By their guests"] },
  "Who were the Ash'aris?": { answer: "Abu Musa's tribe", harder: ["Bukhari 4232: who were the Ash'aris?", "The Ansar of Aws", "Banu Hashim", "The people of Najd"] },
  "What does this teach about a home?": { answer: "Fill it with the Quran", harder: ["Bukhari 4232: their houses were known by night recitation. It teaches...?", "Recite only at the masjid", "Recite only by day", "Keep the Quran quiet"] },
  // Sahih al-Bukhari 6384.
  "Which words did the Prophet ﷺ call a treasure of Paradise?": { answer: "La hawla wa la quwwata illa billah", harder: ["Bukhari 6384: 'one of the treasures of Paradise' is which words?", "SubhanAllah", "Alhamdulillah", "Allahu Akbar"] },
  "What was Abu Musa's real name?": { answer: "Abdullah ibn Qays", harder: ["Bukhari 6384: 'O ____, say la hawla...' Abu Musa's real name?", "Abdullah ibn Mas'ud", "Amir ibn Qays", "Qays ibn Sa'd"] },
  "We must shout our dhikr so Allah hears it.": { answer: "False", harder: "By Bukhari 6384, people were told to shout their dhikr so Allah hears it." },
  // Sahih al-Bukhari 4323.
  "Who led the army at Awtas first?": { answer: "Abu Amir, Abu Musa's uncle", harder: ["Bukhari 4323: after Hunayn, the army to Awtas was first led by whom?", "Abu Musa", "Az-Zubayr", "Abu Qatadah"] },
  "What did the Prophet ﷺ do before the dua?": { answer: "He made wudu and raised his hands", harder: ["Bukhari 4323: before praying for Abu Amir, he ﷺ did what?", "He wept", "He prayed two rak'ahs", "He gathered the army"] },
  "What did the Prophet ﷺ ask for Abu Musa?": { answer: "Forgiveness and a noble entrance", harder: ["Bukhari 4323: 'forgive the sins of Abdullah ibn Qays and...' what?", "Raise his rank", "Give him victory", "Bless his family"] },
  // Sahih al-Bukhari 6245.
  "How many times should you ask to enter?": { answer: "Three times", harder: ["Bukhari 6245: ask to enter how many times, then go back?", "Twice", "Four times", "Five times"] },
  "What should you do if no one allows you in?": { answer: "Go back politely", harder: ["Bukhari 6245: no permission after three times. Then?", "Knock harder", "Sit and wait", "Ask a fourth time"] },
  "Who backed up Abu Musa's hadith?": { answer: "Abu Sa'id al-Khudri", harder: ["Bukhari 6245: who went to Umar to back Abu Musa?", "Ubayy ibn Ka'b", "Anas", "Jabir"] },
  // Sahih al-Bukhari 1244.
  "Where was Jabir's father martyred?": { answer: "At Uhud", harder: ["Bukhari 1244: Jabir's father was martyred. Where?", "At the Trench", "At Mu'tah", "At Hunayn"] },
  "What were the angels doing for his father?": { answer: "Shading him with their wings", harder: ["Bukhari 1244: 'the angels kept ____ him until you moved him.'", "Praying over", "Guarding", "Washing"] },
  "The Prophet ﷺ forbade Jabir from crying.": { answer: "False", harder: "By Bukhari 1244, the Prophet ﷺ forbade Jabir from weeping over his father." },
  // Sahih al-Bukhari 2709.
  "What did Jabir's father leave behind?": { answer: "Debts", harder: ["Bukhari 2709: Jabir's father died leaving what?", "A large garden", "Many slaves", "Nothing at all"] },
  "What did the Prophet ﷺ do with the dates?": { answer: "Sat on them and made dua", harder: ["Bukhari 2709: with Abu Bakr and Umar, what did he ﷺ do with the dates?", "Counted them", "Shared them out himself", "Ate from them"] },
  "How many loads were left after paying everyone?": { answer: "Thirteen", harder: ["Bukhari 2709: every lender paid, how many wasqs were left?", "Ten", "Thirty", "Three"] },
  // Sahih al-Bukhari 5367.
  "Why did Jabir marry an older woman?": { answer: "To look after his sisters", harder: ["Bukhari 5367: Jabir married a woman married before. Why?", "She was his cousin", "She was rich", "She was older and wise"] },
  "How many sisters did Jabir have?": { answer: "Seven or nine", harder: ["Bukhari 5367: Jabir's father left how many girls?", "Five or six", "Three or four", "Ten or eleven"] },
  "The Prophet ﷺ made dua for Jabir.": { answer: "True", harder: "By Bukhari 5367, he ﷺ said 'may Allah bless you' to Jabir." },
  // Sahih al-Bukhari 4102.
  "Why did Jabir prepare food?": { answer: "He saw the Prophet ﷺ hungry", harder: ["Bukhari 4102: at the Trench, why did Jabir cook a small goat?", "His family was hungry", "It was a feast day", "He had guests"] },
  "About how many people ate from it?": { answer: "About a thousand", harder: ["Bukhari 4102: 'O people of the Trench, Jabir has made food.' How many ate?", "About a hundred", "About three hundred", "About ten thousand"] },
  "The food ran out before everyone ate.": { answer: "False", harder: "By Bukhari 4102, the food ran out before the thousand had eaten." },
  // Sahih al-Bukhari 2718.
  "What happened to the camel after the dua?": { answer: "It became very fast", harder: ["Bukhari 2718: he ﷺ struck the tired camel and prayed. Then it...?", "Lay down", "Became calm", "Ate grass"] },
  "What did the Prophet ﷺ do after paying?": { answer: "Gave the camel back as a gift", harder: ["Bukhari 2718: he ﷺ bought it, paid in Madinah, then...?", "Rode it home", "Gave it to Bilal", "Sold it in the market"] },
  "The Prophet ﷺ paid for the camel.": { answer: "True", harder: "By Bukhari 2718, he ﷺ paid Jabir for the camel and gave it back too." },
  // Sahih al-Bukhari 194.
  "What did the Prophet ﷺ sprinkle on Jabir?": { answer: "His wudu water", harder: ["Bukhari 194: Jabir was unconscious. What did he ﷺ sprinkle on him?", "Zamzam water", "Rose water", "His spittle"] },
  "What did Jabir ask about?": { answer: "His inheritance", harder: ["Bukhari 194: Jabir woke and asked about what?", "His father's debts", "His sisters", "The next battle"] },
  "Visiting the sick is part of the sunnah.": { answer: "True", harder: "By Bukhari 194, the Prophet ﷺ visited Jabir when he was sick." },
  // Sahih al-Bukhari 2768.
  "How was Abu Talhah related to Anas?": { answer: "His stepfather", harder: ["Bukhari 2768: Abu Talhah brought Anas to serve him ﷺ. Who was he to Anas?", "His uncle", "His brother", "His father"] },
  // Sahih al-Bukhari 3811.
  "What did Abu Talhah do at Uhud?": { answer: "Shielded the Prophet ﷺ", harder: ["Bukhari 3811: when people ran at Uhud, Abu Talhah...?", "Ran with them", "Guarded the hill", "Carried the flag"] },
  "What was Abu Talhah known for in battle?": { answer: "Archery", harder: ["Bukhari 3811: Abu Talhah broke two or three of what?", "Swords", "Spears", "Shields"] },
  "What did he ask the Prophet ﷺ not to do?": { answer: "Raise his head", harder: ["Bukhari 3811: 'let my neck and chest be hit instead.' Do not...?", "Move forward", "Lower your head", "Call out"] },
  // Sahih al-Bukhari 1461.
  "Which ayah made Abu Talhah give his garden?": { answer: "Spend from what you love", harder: ["Bukhari 1461: 'you will not attain righteousness until...' what?", "You pray at night", "You give in secret", "You give zakat"] },
  "Whom did the Prophet ﷺ tell him to give it to?": { answer: "His relatives", harder: ["Bukhari 1461: he ﷺ told Abu Talhah to give Bayruha to whom?", "The poor of the Suffah", "The Muhajirun", "The masjid"] },
  "Bayruha was the garden Abu Talhah loved least.": { answer: "False", harder: "By Bukhari 1461, Bayruha was the property Abu Talhah loved least." },
  // Sahih Muslim 2054c.
  "Why did they put out the lamp?": { answer: "So the guest would eat alone", harder: ["Muslim 2054c: why did Abu Talhah put out the lamp?", "The guest was shy", "The children were asleep", "There was no oil"] },
  "What did the Prophet's ﷺ homes have that night?": { answer: "Only water", harder: ["Muslim 2054c: a hungry man came; his ﷺ homes had what?", "Only dates", "Only milk", "Nothing at all"] },
  "Allah was pleased with Abu Talhah and his wife.": { answer: "True", harder: "By Muslim 2054c, Allah was pleased with what Abu Talhah and his wife did for the guest." },
  // Sahih al-Bukhari 2627.
  "Whose horse did the Prophet ﷺ borrow?": { answer: "Abu Talhah's", harder: ["Bukhari 2627: Madinah was frightened. Whose horse did he ﷺ ride out on?", "Az-Zubayr's", "His own", "Sa'd's"] },
  "What did the Prophet ﷺ find when he rode out?": { answer: "Nothing to fear", harder: ["Bukhari 2627: he ﷺ rode out. What did he find?", "Quraysh riders", "Robbers", "A lost caravan"] },
  "What was the horse's name?": { answer: "Al-Mandub", harder: ["Bukhari 2627: 'we found the horse like the sea.' Its name?", "Al-Murtajiz", "As-Sakb", "Al-Lizaz"] },
  // Sahih al-Bukhari 1301.
  "Who was Abu Talhah's wife?": { answer: "Umm Sulaym", harder: ["Bukhari 1301: their son died while Abu Talhah was away. His wife?", "Umm Haram", "Umm Ayman", "Umm Kulthum"] },
  "What did the Prophet ﷺ pray for them?": { answer: "Blessing in their night", harder: ["Bukhari 1301: told in the morning, he ﷺ prayed what for them?", "Patience", "Another son", "Forgiveness"] },
  "Their later sons all became reciters of the Quran.": { answer: "True", harder: "By Bukhari 1301, they later had nine sons who all knew the Quran." },
  // Sahih Muslim 1787.
  "Why did Hudhayfah miss Badr?": { answer: "He had made a promise", harder: ["Muslim 1787: Hudhayfah and his father missed Badr. Why?", "They were away", "They were held in Makkah", "They were wounded"] },
  "What did the Prophet ﷺ tell them to do?": { answer: "Keep the promise", harder: ["Muslim 1787: 'go back to Madinah; we will...' what?", "Break it", "Forget it", "Pay them"] },
  "Muslims keep their promises, even to enemies.": { answer: "True", harder: "By Muslim 1787, he ﷺ kept a promise made to Quraysh, the enemy." },
  // Sahih al-Bukhari 4065.
  "What did Hudhayfah say about his father's killers?": { answer: "May Allah forgive you", harder: ["Bukhari 4065: Muslims struck al-Yaman by mistake. Hudhayfah said...?", "Who did it?", "Pay his blood money", "Allah is enough for me"] },
  "Was Hudhayfah's father killed on purpose?": { answer: "No, by mistake", harder: ["Bukhari 4065: at Uhud, Hudhayfah's father was killed how?", "By an arrow from Quraysh", "In a duel", "By a hypocrite"] },
  "Hudhayfah kept praying for them his whole life.": { answer: "True", harder: "By Bukhari 4065, Hudhayfah asked forgiveness for them until he died." },
  // Sahih Muslim 1788.
  "What was Hudhayfah sent to do?": { answer: "Bring news of the enemy", harder: ["Muslim 1788: on the night of the Confederates, what was Hudhayfah sent for?", "To attack Abu Sufyan", "To guard the trench", "To call the Ansar"] },
  "Why did Hudhayfah not shoot Abu Sufyan?": { answer: "He was told not to provoke them", harder: ["Muslim 1788: he could have shot Abu Sufyan. Why did he not?", "It was too dark", "Abu Sufyan saw him", "He was too cold"] },
  "The night was warm and calm.": { answer: "False", harder: "By Muslim 1788, that night was warm and calm." },
  // Sahih al-Bukhari 3606.
  "Why did Hudhayfah ask about evil?": { answer: "So it would not catch him", harder: ["Bukhari 3606: people asked about good. Hudhayfah asked about evil. Why?", "To warn others", "To fight it", "He was curious"] },
  "What did the Prophet ﷺ tell him to stick to?": { answer: "The Muslims and their leader", harder: ["Bukhari 3606: 'stick to the group of Muslims and...' whom?", "Their scholars", "Your family", "The Ansar"] },
  "Knowing about dangers helps you stay safe.": { answer: "True", harder: "By Bukhari 3606, Hudhayfah asked about evil so it would not reach him." },
  // Sahih al-Bukhari 6497.
  "Where was honesty first placed?": { answer: "In the roots of hearts", harder: ["Bukhari 6497: honesty first came down into what?", "The Quran first", "The leaders", "The tongues of men"] },
  "Where did people then learn honesty from?": { answer: "The Quran and the Sunnah", harder: ["Bukhari 6497: after the roots of hearts, they learned honesty from where?", "Their fathers", "The masjid", "Hajj"] },
  "Trustworthy people will always be easy to find.": { answer: "False", harder: "By Bukhari 6497, trustworthy people will always be easy to find." },
  // Sahih al-Bukhari 525.
  "What were the trials compared to?": { answer: "Waves of the sea", harder: ["Bukhari 525: a trial that would spread like what?", "A fire in the dry grass", "The night", "A flood"] },
  "Who was the closed door?": { answer: "Umar himself", harder: ["Bukhari 525: 'a closed door between you and it.' The door was...?", "The Quran", "The Prophet ﷺ", "Uthman"] },
  "Would the door be opened or broken?": { answer: "Broken", harder: ["Bukhari 525: will the door be opened or broken?", "Opened", "Never touched", "Closed again"] },
  // Sahih al-Bukhari 2645.
  "What did the Prophet ﷺ call Hamzah besides uncle?": { answer: "His foster brother", harder: ["Bukhari 2645: 'the daughter of my foster brother.' Hamzah was his...?", "Cousin", "Nephew", "Half-brother"] },
  "Who was Hamzah's father?": { answer: "Abdul-Muttalib", harder: ["Bukhari 2645: Hamzah, his ﷺ uncle, was the son of whom?", "Hashim", "Abdullah", "Abd Manaf"] },
  "Foster ties count like blood ties for marriage.": { answer: "True", harder: "By Bukhari 2645, foster ties count like blood ties, so she was not lawful for him ﷺ." },
  // Sahih al-Bukhari 3969.
  "Who stepped out with Hamzah at Badr?": { answer: "Ali and Ubaydah", harder: ["Bukhari 3969: at Badr, Hamzah fought Utbah, Shaybah and al-Walid with whom?", "Ali and Abu Ubaydah", "Ubaydah and Mus'ab", "Ali and Sa'd"] },
  "Which ayah came down about them?": { answer: "22:19", harder: ["Bukhari 3969: 'these two opponents dispute about their Lord.' Which ayah?", "8:9", "3:123", "22:39"] },
  "Hamzah stayed away from Badr.": { answer: "False", harder: "By Bukhari 3969, Hamzah stayed away from Badr." },
  // Sahih al-Bukhari 4072.
  "What did Hamzah say to the challenger?": { answer: "Do you challenge Allah and His Messenger?", harder: ["Bukhari 4072: Siba' called for a duel at Uhud. Hamzah said...?", "Come if you dare", "I am the lion of Allah", "I am Hamzah"] },
  "Who won the duel?": { answer: "Hamzah", harder: ["Bukhari 4072: Hamzah against Siba' at Uhud. Who won?", "Both fell", "Siba' fled", "Wahshi stopped it"] },
  "Hamzah was a brave fighter.": { answer: "True", harder: "By Bukhari 4072, Hamzah came out against Siba' and defeated him." },
  // Sahih al-Bukhari 4072.
  "Who killed Hamzah?": { answer: "Wahshi", harder: ["Bukhari 4072: who threw the spear that killed Hamzah?", "Siba'", "Ikrimah", "Jubayr ibn Mut'im"] },
  "What was Wahshi promised?": { answer: "His freedom", harder: ["Bukhari 4072: 'my master promised me ____ if I killed Hamzah.'", "Gold", "A wife", "Land"] },
  "In which battle was Hamzah martyred?": { answer: "Uhud", harder: ["Bukhari 4072: Wahshi hid behind a rock and threw. Which battle?", "The Trench", "Hunayn", "Mu'tah"] },
  // Sahih al-Bukhari 4045.
  "Who wept remembering Hamzah?": { answer: "Abdur-Rahman ibn Awf", harder: ["Bukhari 4045: who said 'Hamzah was martyred, and he was better than me'?", "Ali", "Abu Bakr", "Sa'd"] },
  "What did he say about Hamzah?": { answer: "He was better than me", harder: ["Bukhari 4045: what did Abdur-Rahman say of Hamzah?", "He was the bravest", "He was first in Islam", "He was the Prophet's ﷺ uncle"] },
  "Abdur-Rahman was fasting at the time.": { answer: "True", harder: "By Bukhari 4045, Abdur-Rahman was fasting when he remembered Hamzah and wept." },
  // Sahih al-Bukhari 4072.
  "What did the Prophet ﷺ ask Wahshi?": { answer: "Can you hide your face from me?", harder: ["Bukhari 4072: 'are you Wahshi, who killed Hamzah?' What next?", "Tell me how it happened", "You are forgiven", "Leave Madinah"] },
  "Whom did Wahshi later fight to make amends?": { answer: "Musaylimah the liar", harder: ["Bukhari 4072: to make amends for Hamzah, Wahshi fought whom?", "Tulayhah", "Al-Aswad al-Ansi", "The Romans"] },
  "Wahshi came with the delegation of Taif.": { answer: "True", harder: "By Bukhari 4072, Wahshi came to the Prophet ﷺ with the people of Taif." },
  // Sahih al-Bukhari 4782.
  "What did people call Zayd at first?": { answer: "Zayd ibn Muhammad", harder: ["Bukhari 4782: Zayd ibn Harithah was called by what name at first?", "Zayd al-Khayr", "Zayd ibn Harith", "Zayd al-Kalbi"] },
  "What did the ayah tell people to do?": { answer: "Call them by their fathers' names", harder: ["Bukhari 4782: 'call them by their fathers; that is...' what?", "Easier for all", "Kinder to them", "Better for Islam"] },
  "Who was Zayd's real father?": { answer: "Harithah", harder: ["Bukhari 4782: Zayd ibn Harithah's real father was who?", "Sharahil", "Usamah", "Ka'b"] },
  // Quran 33:37.
  "In which surah is Zayd named?": { answer: "Al-Ahzab", harder: ["Quran 33:37 names Zayd. Which surah?", "An-Nur", "Al-Hujurat", "Al-Anfal"] },
  "Which number is Surah Al-Ahzab?": { answer: "33", harder: ["Zayd is named in Quran 33:37. Which surah number is that?", "24", "38", "23"] },
  "Zayd's name appears in the Quran.": { answer: "True", harder: "By Quran 33:37, Zayd is the one companion named in the Quran." },
  // Sahih al-Bukhari 3731.
  "Who was Zayd's son?": { answer: "Usamah", harder: ["Bukhari 3731: 'these feet are from one another.' Zayd's son?", "Usayd", "Ubayy", "Ammar"] },
  "What did the man look at?": { answer: "Their feet", harder: ["Bukhari 3731: Zayd and Usamah were asleep, covered. What did the man see?", "Their hands", "Their hair", "Their eyes"] },
  "The Prophet ﷺ was happy with what he said.": { answer: "True", harder: "By Bukhari 3731, he ﷺ was pleased and told Aishah about it." },
  // Sahih al-Bukhari 2699.
  "What did the Prophet ﷺ call Zayd?": { answer: "Our brother", harder: ["Bukhari 2699: 'you are our ____ and our freed slave', he ﷺ told Zayd.", "Son", "Cousin", "Friend"] },
  "Whose daughter did they all want to care for?": { answer: "Hamzah's", harder: ["Bukhari 2699: Ali, Ja'far and Zayd each wanted to care for whose daughter?", "Abbas's", "Abu Talib's", "Ja'far's"] },
  "Zayd was harshly sent away.": { answer: "False", harder: "By Bukhari 2699, Zayd was harshly sent away." },
  // Sahih al-Bukhari 4261.
  "Who was the first commander at Mu'tah?": { answer: "Zayd ibn Harithah", harder: ["Bukhari 4261: who did he ﷺ make the first commander at Mu'tah?", "Ja'far", "Abdullah ibn Rawahah", "Usamah"] },
  "Who would lead if Zayd fell?": { answer: "Ja'far", harder: ["Bukhari 4261: 'if Zayd is killed, then...' whom?", "Abdullah ibn Rawahah", "Khalid", "Thabit"] },
  "Who was third in line?": { answer: "Abdullah ibn Rawahah", harder: ["Bukhari 4261: Zayd, then Ja'far, then whom?", "Khalid", "Usamah", "Abu Ubaydah"] },
  // Sahih al-Bukhari 4262.
  "How did the Prophet ﷺ know before the news?": { answer: "He told them before it came", harder: ["Bukhari 4262: how did Madinah learn of the three martyrs?", "A rider came that night", "Khalid sent word", "Ya'la brought news"] },
  "Who took the flag after the three martyrs?": { answer: "Khalid, a Sword of Allah", harder: ["Bukhari 4262: after Zayd, Ja'far and Ibn Rawahah, who took the flag?", "Thabit ibn Arqam", "Qutbah", "Abu Qatadah"] },
  "The Prophet ﷺ wept for them.": { answer: "True", harder: "By Bukhari 4262, his ﷺ eyes were full of tears as he told of Zayd's death." },
  // Sahih al-Bukhari 3735.
  "Who was Usamah's father?": { answer: "Zayd ibn Harithah", harder: ["Bukhari 3735: 'O Allah, love them.' Usamah was the son of whom?", "Usayd ibn Hudayr", "Anas", "Ubayy"] },
  "Who was held with Usamah?": { answer: "Al-Hasan", harder: ["Bukhari 3735: 'O Allah, love them, for I love them.' Usamah and whom?", "Al-Husayn", "Abdullah ibn Ja'far", "Ibn Abbas"] },
  // Sahih al-Bukhari 1284.
  "What did the Prophet ﷺ say belongs to Allah?": { answer: "What He takes and what He gives", harder: ["Bukhari 1284: 'whatever Allah takes is His and...' what?", "He will return it", "Patience is best", "Weep softly"] },
  "What did he tell his daughter to be?": { answer: "Patient", harder: ["Bukhari 1284: his daughter's child was dying. He ﷺ told her to be...?", "Hopeful", "Calm", "Grateful"] },
  "Crying with tears from sadness is allowed.": { answer: "True", harder: "By Bukhari 1284, his ﷺ eyes shed tears for the dying child." },
  // Sahih Muslim 96a.
  "What did the man say before Usamah struck him?": { answer: "La ilaha illallah", harder: ["Muslim 96a: before Usamah struck, what did the man say?", "I am a Muslim", "Mercy, mercy", "Spare me"] },
  "What is the lesson for us?": { answer: "Only Allah knows the heart", harder: ["Muslim 96a: 'did you cut open his heart?' The lesson?", "Trust what they say only in battle", "Ask for proof", "Wait a day"] },
  "The Prophet ﷺ said it only once.": { answer: "False", harder: "By Muslim 96a, he ﷺ said it to Usamah only once." },
  // Sahih al-Bukhari 1544.
  "Where did Usamah ride behind the Prophet ﷺ?": { answer: "From Arafah to Muzdalifah", harder: ["Bukhari 1544: Usamah rode behind him ﷺ on which stretch?", "From Muzdalifah to Mina", "From Mina to Makkah", "From Makkah to Arafah"] },
  "Who rode behind him after Muzdalifah?": { answer: "Al-Fadl", harder: ["Bukhari 1544: after Muzdalifah, who rode behind him ﷺ?", "Ali", "Ibn Abbas", "Ja'far"] },
  "The Prophet ﷺ kept saying the talbiyah.": { answer: "True", harder: "By Bukhari 1544, he ﷺ kept saying the talbiyah all the way." },
  // Sahih al-Bukhari 3730.
  "What did some people do when Usamah was made leader?": { answer: "Criticized it", harder: ["Bukhari 3730: Usamah was made leader. What did some people do?", "Asked for Abu Bakr", "Refused to go", "Praised him"] },
  "Whose leadership was criticized before?": { answer: "His father Zayd's", harder: ["Bukhari 3730: 'you criticized his ____'s command before.'", "Uncle", "Brother", "Grandfather"] },
  "The Prophet ﷺ said Zayd was worthy to lead.": { answer: "True", harder: "By Bukhari 3730, he ﷺ said Zayd was worthy of command and among the dearest to him." },
  // Sahih al-Bukhari 4468.
  "Where was Usamah's army going?": { answer: "Sham", harder: ["Bukhari 4468: Usamah commanded the army to where?", "Iraq", "Bahrain", "Najd"] },
  "What did the Prophet ﷺ say about Usamah?": { answer: "He is most beloved to me", harder: ["Bukhari 4468: 'I have heard what you said about Usamah.' And?", "He is the bravest", "He is like his father", "He is my son"] },
  "Being young stopped Usamah from leading.": { answer: "False", harder: "By Bukhari 4468, he ﷺ removed Usamah as commander because of his age." },
  // Sahih al-Bukhari 3660.
  "Who was with the Prophet ﷺ when Ammar saw him?": { answer: "Five slaves, two women and Abu Bakr", harder: ["Bukhari 3660: Ammar saw him ﷺ with whom only?", "Abu Bakr and Bilal", "Khadijah and Ali", "Seven men"] },
  "Ammar was one of the earliest Muslims.": { answer: "True", harder: "By Bukhari 3660, Ammar saw the Prophet ﷺ when only a handful believed." },
  "How many Muslims were there then?": { answer: "Very few", harder: ["Bukhari 3660: five slaves, two women and Abu Bakr. So the Muslims were...?", "About a hundred", "About forty", "Many"] },
  // Sahih al-Bukhari 338.
  "Why did Ammar roll in the dust?": { answer: "There was no water", harder: ["Bukhari 338: on a journey, why did Ammar roll in dust?", "He was sick", "It was cold", "He was playing"] },
  "What did the Prophet ﷺ show him?": { answer: "Wipe face and hands after striking the earth", harder: ["Bukhari 338: 'this would have been enough.' He ﷺ showed what?", "Strike twice, wipe arms", "Wipe only the face", "Sprinkle dust on the head"] },
  "Without water, a Muslim can make tayammum.": { answer: "True", harder: "By Bukhari 338, striking the earth and wiping face and hands is enough without water." },
  // Jami at-Tirmidhi 3798.
  "What did the Prophet ﷺ call Ammar?": { answer: "The pure and purified", harder: ["Tirmidhi 3798: 'welcome to the ____, the purified.'", "Trustworthy", "Truthful", "Patient"] },
  "Ammar asked permission before entering.": { answer: "True", harder: "By Tirmidhi 3798, Ammar asked permission before coming in." },
  "Who narrated the welcome?": { answer: "Ali", harder: ["Tirmidhi 3798: who narrated 'welcome to the pure one'?", "Abu Bakr", "Aishah", "Hudhayfah"] },
  // Sahih al-Bukhari 3743.
  "From whom was Ammar protected?": { answer: "Shaytan", harder: ["Bukhari 3743: Ammar was protected from what?", "Hypocrisy", "Fire", "Sins"] },
  "How was he protected?": { answer: "By the Prophet's ﷺ dua", harder: ["Bukhari 3743: Ammar was protected through what?", "His own strength", "His mother's dua", "The Quran"] },
  "Who called Ammar protected from Shaytan?": { answer: "Abu Darda", harder: ["Bukhari 3743: who asked the man of Kufa about Ammar?", "Hudhayfah", "Ibn Mas'ud", "Alqamah"] },
  // Sahih al-Bukhari 755.
  "Who made Ammar the leader of Kufa?": { answer: "Umar", harder: ["Bukhari 755: Kufa complained about Sa'd. Who made Ammar leader?", "Uthman", "Ali", "Abu Bakr"] },
  "Whom did Ammar replace?": { answer: "Sa'd", harder: ["Bukhari 755: Umar removed whom from Kufa and sent Ammar?", "Abu Musa", "Al-Mughirah", "Ibn Mas'ud"] },
  "Kufa is a city in Iraq.": { answer: "True", harder: "By Bukhari 755, Ammar was made leader of the people of Kufa, in Iraq." },
  // Sahih Muslim 869.
  "What kind of khutbah did Ammar give?": { answer: "Short and clear", harder: ["Muslim 869: Ammar's khutbah was what?", "Long and moving", "Loud and angry", "Read from a page"] },
  "What should be long, the prayer or the khutbah?": { answer: "The prayer", harder: ["Muslim 869: 'lengthen the ____ and shorten the khutbah.'", "Dua", "Recitation", "Adhan"] },
  "A short khutbah is a sign of understanding.": { answer: "True", harder: "By Muslim 869, a long prayer and short khutbah are a sign of understanding." },
  // Sahih Muslim 2053c.
  "Where did the Prophet ﷺ stay when he came to Madinah?": { answer: "In Abu Ayyub's house", harder: ["Muslim 2053c: where did he ﷺ stay, on the lower floor?", "In Sa'd ibn Ubadah's house", "In As'ad's house", "In Quba"] },
  "Why was Abu Ayyub upset?": { answer: "He was walking above the Prophet ﷺ", harder: ["Muslim 2053c: 'we walk above the head of the Messenger ﷺ!' Who was upset?", "Abu Ayyub's wife only", "Anas", "Umm Sulaym"] },
  "In the end, the Prophet ﷺ moved upstairs.": { answer: "True", harder: "By Muslim 2053c, he ﷺ moved upstairs so Abu Ayyub would not live above him." },
  // Sahih Muslim 2053a.
  "Why did the Prophet ﷺ not eat the food?": { answer: "It had garlic", harder: ["Muslim 2053a: why did he ﷺ leave the food uneaten?", "It had onion", "It was meat", "He was fasting"] },
  "Is garlic forbidden?": { answer: "No", harder: ["Muslim 2053a: 'is it forbidden?' His ﷺ answer about garlic?", "Yes, for all", "Only for men", "Only raw"] },
  "What did Abu Ayyub say?": { answer: "I dislike what you dislike", harder: ["Muslim 2053a: 'I dislike its smell.' Abu Ayyub said...?", "Then I will cook without it", "I like it", "Forgive me"] },
  // Sahih al-Bukhari 394.
  "What did the Prophet ﷺ teach about the toilet?": { answer: "Do not face the qiblah", harder: ["Bukhari 394: when relieving yourself, do not face the qiblah or...?", "Look at the sky", "Speak", "Stay long"] },
  "What did Abu Ayyub do in Sham?": { answer: "Turned aside and asked forgiveness", harder: ["Bukhari 394: in Sham the toilets faced the qiblah. Abu Ayyub...?", "Used them as they were", "Built new ones", "Asked the scholars"] },
  "Abu Ayyub respected the qiblah even far from Madinah.": { answer: "True", harder: "By Bukhari 394, in Sham Abu Ayyub turned aside from the qiblah and asked forgiveness." },
  // Sahih al-Bukhari 6077.
  "How long at most can you stay cut off from a Muslim?": { answer: "Three nights", harder: ["Bukhari 6077: cutting off a brother is not lawful for more than...?", "Seven nights", "One night", "Ten nights"] },
  "Who is the better of the two?": { answer: "The one who greets first", harder: ["Bukhari 6077: 'the better of the two is the one who...' what?", "Forgives", "Visits", "Apologises"] },
  "Saying salam first is a good deed.": { answer: "True", harder: "By Bukhari 6077, the better of the two is the one who greets first." },
  // Sahih Muslim 1164.
  "How many days of Shawwal are in the hadith?": { answer: "Six", harder: ["Muslim 1164: Ramadan, then how many days of Shawwal?", "Nine", "Five", "Seven"] },
  "What is the reward like?": { answer: "Fasting all the time", harder: ["Muslim 1164: Ramadan plus six of Shawwal is as if he fasted...?", "Two years", "Ten months", "One year twice"] },
  "Shawwal comes right after Ramadan.": { answer: "True", harder: "By Muslim 1164, the six days are in Shawwal, the month after Ramadan." },
  // Sunan Abi Dawud 2512.
  "Where was Abu Ayyub buried?": { answer: "Constantinople", harder: ["Abu Dawud 2512: Abu Ayyub strove until he was buried where?", "Damascus", "Jerusalem", "Cairo"] },
  "What did he say ruin meant in 2:195?": { answer: "Leaving the effort for wealth", harder: ["Abu Dawud 2512: 2:195, 'do not throw yourselves into ruin.' Ruin was...?", "Rushing into battle", "Spending too much", "Fighting alone"] },
  "Abu Ayyub stopped striving when he grew old.": { answer: "False", harder: "By Abu Dawud 2512, Abu Ayyub stopped striving when he grew old." },
  // Sahih al-Bukhari 1155.
  "What was Ibn Rawahah known for?": { answer: "Poetry", harder: ["Bukhari 1155: 'your brother Ibn Rawahah does not say obscene things.' He was a...?", "Judge", "Reciter", "Scribe"] },
  "What did the Prophet ﷺ say about his words?": { answer: "He does not say bad words", harder: ["Bukhari 1155: what did he ﷺ say about Ibn Rawahah's words?", "He is a great poet", "He speaks the truth", "He is my brother"] },
  "His poem said the Prophet ﷺ prayed at night.": { answer: "True", harder: "By Bukhari 1155, Ibn Rawahah's poem says the Prophet ﷺ spends his nights away from his bed." },
  // Sahih al-Bukhari 4106.
  "Whose verses did the Prophet ﷺ recite at the Trench?": { answer: "Ibn Rawahah's", harder: ["Bukhari 4106: carrying earth at the Trench, he ﷺ recited whose verses?", "Hassan's", "Ka'b ibn Malik's", "Labid's"] },
  "What did the verses say?": { answer: "Without You we would not be guided", harder: ["Bukhari 4106: 'O Allah, without You...' what did the verses say?", "We would have no food", "We would be lost in the desert", "We would lose"] },
  "The Prophet ﷺ carried earth with the companions.": { answer: "True", harder: "By Bukhari 4106, he ﷺ carried earth at the Trench with the companions." },
  // Sahih al-Bukhari 1945.
  "Who was fasting on that hot day?": { answer: "The Prophet ﷺ and Ibn Rawahah", harder: ["Bukhari 1945: on that very hot day, who fasted?", "Only the Prophet ﷺ", "Abu Darda and Ibn Rawahah", "Half the army"] },
  "How hot was it?": { answer: "Very hot", harder: ["Bukhari 1945: how hot was it?", "Hot until noon", "Mild", "Hot only at night"] },
  "A traveler may choose not to fast.": { answer: "True", harder: "By Bukhari 1945, on the journey most did not fast, and only two did." },
  // Jami at-Tirmidhi 2847.
  "Who walked in front of the Prophet ﷺ into Makkah?": { answer: "Ibn Rawahah", harder: ["Tirmidhi 2847: at Umrat al-Qada, who walked ahead reciting poetry?", "Hassan ibn Thabit", "Ka'b ibn Malik", "Bilal"] },
  "Who objected to the poetry?": { answer: "Umar", harder: ["Tirmidhi 2847: 'poetry in the Haram?' Who objected?", "Abu Bakr", "Uthman", "Ibn Abbas"] },
  "What did the Prophet ﷺ say?": { answer: "Leave him", harder: ["Tirmidhi 2847: 'it hits them faster than arrows.' He ﷺ said...?", "Recite more softly", "Stop now, O Ibn Rawahah", "Recite the Quran instead"] },
  // Sahih al-Bukhari 4267.
  "What did his sister do when he fainted?": { answer: "Cried out his good qualities", harder: ["Bukhari 4267: Ibn Rawahah fainted. His sister...?", "Called for help", "Prayed for him", "Wept silently"] },
  "What was he asked each time?": { answer: "Are you really so?", harder: ["Bukhari 4267: each praise she said, he was asked...?", "Is this true?", "Did you do this?", "Who taught you?"] },
  "Ibn Rawahah liked being praised loudly.": { answer: "False", harder: "By Bukhari 4267, Ibn Rawahah liked being praised loudly." },
  // Sahih al-Bukhari 4261.
  "Which leader was Ibn Rawahah at Mu'tah?": { answer: "The third", harder: ["Bukhari 4261: Zayd, then Ja'far, then Ibn Rawahah. He was which leader?", "The fourth", "The last after Khalid", "The reserve"] },
  "Who led before Ibn Rawahah?": { answer: "Zayd and Ja'far", harder: ["Bukhari 4261: who was named to lead before Ibn Rawahah?", "Ja'far and Khalid", "Zayd and Khalid", "Zayd and Usamah"] },
  "All three leaders at Mu'tah were martyred.": { answer: "True", harder: "By Bukhari 4261-4262, Zayd, Ja'far and Ibn Rawahah were all martyred at Mu'tah." },
  // Sahih al-Bukhari 2091.
  "What was Khabbab's job?": { answer: "Blacksmith", harder: ["Bukhari 2091: Al-As ibn Wa'il owed Khabbab money. Khabbab was a...?", "Tailor", "Carpenter", "Trader"] },
  "What did Al-As want before paying?": { answer: "That Khabbab leave Islam", harder: ["Bukhari 2091: 'I will not pay you unless...' what?", "You wait a year", "You work more", "You bring a witness"] },
  "Khabbab gave up Islam to get his money.": { answer: "False", harder: "By Bukhari 2091, Khabbab gave up Islam to be paid his money." },
  // Sahih al-Bukhari 3852.
  "Where was the Prophet ﷺ when Khabbab came?": { answer: "In the shade of the Kaaba", harder: ["Bukhari 3852: Khabbab asked him ﷺ to pray for them. Where was he?", "At the house of al-Arqam", "At Safa", "In his house"] },
  "What did the Prophet ﷺ promise?": { answer: "Allah will complete this religion", harder: ["Bukhari 3852: 'a rider will travel from Sana to Hadramawt...' fearing none but...?", "Allah and the wolf on his sheep", "His tribe", "The king"] },
  "Earlier believers also suffered for their faith.": { answer: "True", harder: "By Bukhari 3852, believers before were combed with iron combs and kept their faith." },
  // Sahih al-Bukhari 746.
  "How did Khabbab know the Prophet ﷺ recited in Dhuhr?": { answer: "His beard moved", harder: ["Bukhari 746: Khabbab knew he ﷺ recited in Dhuhr and Asr how?", "He heard a whisper", "By how long he stood", "By his lips"] },
  "Which prayers are recited silently?": { answer: "Dhuhr and Asr", harder: ["Bukhari 746: Khabbab was asked about which prayers?", "Fajr and Isha", "Maghrib and Isha", "Jumu'ah and Eid"] },
  "The Prophet ﷺ recited in Dhuhr and Asr.": { answer: "True", harder: "By Bukhari 746, he ﷺ did recite in Dhuhr and Asr, quietly." },
  // Sahih al-Bukhari 3897.
  "Who did Khabbab remember?": { answer: "Mus'ab ibn Umayr", harder: ["Bukhari 3897: 'some died without any reward in this world.' Who?", "Hamzah", "Ja'far", "Sa'd ibn Mu'adh"] },
  "What did they put on Mus'ab's feet?": { answer: "Grass", harder: ["Bukhari 3897: covering his head left his feet bare. On his feet...?", "A second cloak", "Leaves", "Dust"] },
  "Mus'ab left behind great riches.": { answer: "False", harder: "By Bukhari 3897, Mus'ab left behind great riches." },
  // Sahih al-Bukhari 5672.
  "What did the Prophet ﷺ forbid?": { answer: "Wishing for death", harder: ["Bukhari 5672: 'had he ﷺ not forbidden us...' what?", "To store wealth", "To be cauterised", "To travel"] },
  "Why was Khabbab worried?": { answer: "He had much wealth", harder: ["Bukhari 5672: cauterised seven times, why was Khabbab worried?", "He was very ill", "His friends had died", "He had debts"] },
  "A Muslim should not wish for death.": { answer: "True", harder: "By Bukhari 5672, the Prophet ﷺ forbade wishing for death." },
  // Sahih al-Bukhari 5073.
  "What did Uthman ibn Maz'un want to give up?": { answer: "Marriage", harder: ["Bukhari 5073: Uthman ibn Maz'un wanted to give up what?", "Sleep", "Meat", "Wealth"] },
  "Did the Prophet ﷺ allow it?": { answer: "No", harder: ["Bukhari 5073: giving up marriage. His ﷺ answer?", "Yes, for a time", "Only if you fast", "Ask Abu Bakr"] },
  "Islam teaches balance in worship and life.": { answer: "True", harder: "By Bukhari 5073, had he ﷺ allowed it others would have given up marriage too." },
  // Sahih al-Bukhari 3929.
  "How did the Ansar share out the emigrants?": { answer: "By drawing lots", harder: ["Bukhari 3929: how did the Ansar share out the Muhajirun?", "By their tribes", "By who asked first", "By the Prophet's ﷺ choice"] },
  "Whose house did Uthman live in?": { answer: "Umm al-Ala's", harder: ["Bukhari 3929: Uthman ibn Maz'un came by lot to whose house?", "Abu Ayyub's", "Umm Sulaym's", "Sa'd ibn ar-Rabi's"] },
  "Umm al-Ala nursed him when he was ill.": { answer: "True", harder: "By Bukhari 3929, Umm al-Ala nursed Uthman ibn Maz'un until he died." },
  // Sahih al-Bukhari 1243.
  "What did the Prophet ﷺ ask Umm al-Ala?": { answer: "How do you know?", harder: ["Bukhari 1243: 'I testify Allah has honoured you.' He ﷺ asked...?", "Did you see a sign?", "Who told you?", "Is he buried?"] },
  "What does this teach us?": { answer: "Only Allah knows a person's end", harder: ["Bukhari 1243: 'I do not know what Allah will do, though I am His Messenger.' The lesson?", "Praise the dead loudly", "Do not mourn", "Pray only for family"] },
  "Umm al-Ala later stopped declaring people righteous.": { answer: "True", harder: "By Bukhari 1243, Umm al-Ala said she would never again declare anyone righteous." },
  // Sahih al-Bukhari 7018.
  "What did Umm al-Ala see in her dream?": { answer: "A flowing spring", harder: ["Bukhari 7018: Umm al-Ala later saw what in a dream for Uthman?", "A garden", "A house of light", "A river of milk"] },
  "What did the spring stand for?": { answer: "His good deeds", harder: ["Bukhari 7018: 'that is his...' what did the spring stand for?", "His children", "His prayers only", "His knowledge"] },
  "Good deeds can keep giving reward after death.": { answer: "True", harder: "By Bukhari 7018, Uthman ibn Maz'un's good deeds kept going on for him." },
  // Sunan Abi Dawud 3206.
  "What did he ﷺ carry to the grave of Uthman ibn Maz'un?": { answer: "A heavy stone", harder: ["Abu Dawud 3206: the man could not lift it. What did he ﷺ carry to the grave?", "A palm trunk", "A board", "A water jar"] },
  "What did he ﷺ call Uthman ibn Maz'un at the grave?": { answer: "My brother", harder: ["Abu Dawud 3206: 'I am marking my ____'s grave with it.'", "Friend", "Companion", "Cousin"] },
  "He ﷺ said he would bury those of his family who die beside Uthman.": { answer: "True", harder: "By Abu Dawud 3206, he ﷺ said he would bury his family who die beside Uthman." },
  // Sahih al-Bukhari 101.
  "What did the women ask for?": { answer: "A day of lessons for them", harder: ["Bukhari 101: the women said the men took all his time. They asked for what?", "Their own masjid", "A woman teacher", "A letter"] },
  "Did the Prophet ﷺ agree?": { answer: "Yes, he gave them a day", harder: ["Bukhari 101: 'fix a day for us.' His ﷺ answer?", "Learn from the men", "Ask Aishah", "Come on Fridays"] },
  "Women in the Prophet's ﷺ time learned the religion.": { answer: "True", harder: "By Bukhari 101, he ﷺ gave the women a day for lessons and commands." },
  // Sahih al-Bukhari 2276.
  "Which surah did the companion recite?": { answer: "Al-Fatihah", harder: ["Bukhari 2276: the chief was stung. What did the companion recite?", "Ayat al-Kursi", "Al-Falaq", "An-Nas"] },
  "What happened to the chief?": { answer: "He got up healed", harder: ["Bukhari 2276: after Al-Fatihah, the chief...?", "Slept", "Thanked them", "Paid at once"] },
  "The Prophet ﷺ said they did right.": { answer: "True", harder: "By Bukhari 2276, he ﷺ said: how did you know it is a ruqyah? You did right." },
  // Sahih al-Bukhari 2027.
  "When should we seek Laylat al-Qadr?": { answer: "Odd nights of the last ten", harder: ["Bukhari 2027: 'seek it in the ____ nights of the last ten.'", "Even", "Last three", "First five"] },
  "What did the Prophet ﷺ see himself doing?": { answer: "Prostrating in mud and water", harder: ["Bukhari 2027: on the morning after that night, he ﷺ saw himself...?", "Weeping in prayer", "Reciting all night", "Leading Eid"] },
  "Rain fell on that night of Laylat al-Qadr.": { answer: "True", harder: "By Bukhari 2027, rain fell and there was mud on his ﷺ forehead on the morning of the 21st." },
  // Sahih al-Bukhari 5013.
  "Which surah equals a third of the Quran?": { answer: "Al-Ikhlas", harder: ["Bukhari 5013: 'by Him in Whose hand is my soul, it equals a third.' Which surah?", "Al-Falaq", "Al-Kafirun", "Al-Asr"] },
  "How does Al-Ikhlas begin?": { answer: "Say: He is Allah, One", harder: ["Bukhari 5013: the man kept reciting which words?", "Say: I seek refuge", "Say: O disbelievers", "When the help of Allah"] },
  "The man thought reciting it was not enough.": { answer: "True", harder: "By Bukhari 5013, the man who heard it thought it was too little." },
  // Sahih al-Bukhari 3673.
  "What did the Prophet ﷺ forbid about his companions?": { answer: "Abusing them", harder: ["Bukhari 3673: 'do not ____ my companions.'", "Praise", "Copy", "Question"] },
  "What would gold like Uhud not equal?": { answer: "A handful of theirs", harder: ["Bukhari 3673: gold like Uhud would not equal what of theirs?", "A day of theirs", "A prayer of theirs", "A battle of theirs"] },
  "The Sahabah have a very high rank.": { answer: "True", harder: "By Bukhari 3673, gold like Uhud would not reach a companion's mudd, nor half of it." },
  // Sahih Muslim 49a.
  "What is the first way to change a wrong?": { answer: "With your hand", harder: ["Muslim 49a: see a wrong. First change it how?", "With your tongue", "With a letter", "With your money"] },
  "What is the weakest level of faith?": { answer: "Hating it in your heart", harder: ["Muslim 49a: 'hate it in your heart, and that is...' what?", "The best faith", "Enough faith", "Hidden faith"] },
  "Who said the man had done his duty?": { answer: "Abu Sa'id", harder: ["Muslim 49a: the khutbah was moved before Eid prayer. Who praised the objector?", "Abu Hurairah", "Ibn Umar", "Anas"] },
  // Sahih al-Bukhari 5004.
  "What had Abu ad-Darda gathered?": { answer: "The whole Quran", harder: ["Bukhari 5004: at his ﷺ death, what had Abu ad-Darda collected?", "Hadith", "Zakat", "Poems"] },
  "Who else was among the four?": { answer: "Mu'adh ibn Jabal", harder: ["Bukhari 5004: Abu ad-Darda, Zayd, Abu Zayd and who?", "Ubayy", "Ibn Mas'ud", "Salim"] },
  "Anas named four men who had gathered the Quran.": { answer: "True", harder: "By Bukhari 5004, only four had collected the Quran when he ﷺ died." },
  // Sahih Muslim 722.
  "How many fasts each month did he keep?": { answer: "Three", harder: ["Muslim 722: 'my Friend ﷺ told me' to fast how many days a month?", "Two", "Six", "Five"] },
  "Which prayer did he pray before sleeping?": { answer: "Witr", harder: ["Muslim 722: not to sleep until he prayed which?", "Isha", "Tahajjud", "Sunnah of Isha"] },
  "Who did Abu ad-Darda call my Friend?": { answer: "The Prophet ﷺ", harder: ["Muslim 722: Abu ad-Darda said 'my Friend ﷺ'. Who?", "Salman", "Abu Bakr", "Mu'adh"] },
  // Jami at-Tirmidhi 2002.
  "What is heaviest on the believer's Scale?": { answer: "Good character", harder: ["Tirmidhi 2002: what is heaviest on the believer's Scale?", "Prayer on time", "Love of the Prophet ﷺ", "Patience"] },
  "Whom does Allah dislike?": { answer: "The rude, foul-mouthed person", harder: ["Tirmidhi 2002: whom does Allah dislike?", "The proud", "The stingy", "The lazy"] },
  "Good manners count on the Day of Judgment.": { answer: "True", harder: "By Tirmidhi 2002, nothing is heavier on the Scale than good character." },
  // Jami at-Tirmidhi 2682.
  "Why did the man travel to Damascus?": { answer: "To hear one hadith", harder: ["Tirmidhi 2682: a man came from Madinah to Damascus. Why?", "To learn the Quran", "To ask a question", "To visit a friend"] },
  "What does Allah make easy for a seeker of knowledge?": { answer: "A path to Paradise", harder: ["Tirmidhi 2682: a path seeking knowledge, Allah makes easy a path to...?", "Wisdom", "Good friends", "More knowledge"] },
  "Angels lower their wings for the seeker of knowledge.": { answer: "True", harder: "By Tirmidhi 2682, angels lower their wings for the seeker of knowledge." },
  // Sahih Muslim 2598c.
  "What will a curser not be on Judgment Day?": { answer: "A witness or intercessor", harder: ["Muslim 2598c: those who curse will be neither witnesses nor...?", "Leaders", "Imams", "Judges"] },
  "What should a Muslim do with his tongue?": { answer: "Keep it from cursing", harder: ["Muslim 2598c: cursers will not be witnesses or intercessors. So...?", "Curse only enemies", "Curse softly", "Curse in private only"] },
  "Cursing people is a small, harmless thing.": { answer: "False", harder: "By Muslim 2598c, cursers will be witnesses and intercessors on the Day of Resurrection." },
  // Sahih al-Bukhari 650.
  "Why was Abu ad-Darda angry?": { answer: "People left their good habits", harder: ["Bukhari 650: why did Abu ad-Darda come in angry?", "The imam was late", "The masjid was empty", "People argued"] },
  "Which good deed did people still keep?": { answer: "Praying in congregation", harder: ["Bukhari 650: what good did people still keep, he said?", "Fasting Mondays", "Giving zakat", "Reciting at night"] },
  "Who told this story about Abu ad-Darda?": { answer: "His wife Umm ad-Darda", harder: ["Bukhari 650: 'he came in angry.' Who told it?", "His son Bilal", "Salim", "Abu Idris"] },
  // Sahih al-Bukhari 3892.
  "Where did Ubadah give his first pledge?": { answer: "At Aqabah", harder: ["Bukhari 3892: Ubadah was at which pledge?", "Ridwan", "The pledge of women", "Hudaybiyah"] },
  "Which battle did Ubadah fight in?": { answer: "Badr", harder: ["Bukhari 3892: Ubadah was at Aqabah and fought at...?", "Mu'tah", "Hunayn", "Tabuk"] },
  "The pledge said: worship nothing besides Allah.": { answer: "True", harder: "By Bukhari 3892, the pledge was to worship nothing besides Allah, not to steal and to obey in good." },
  // Sahih al-Bukhari 7199.
  "What did they promise to say wherever they were?": { answer: "The truth", harder: ["Bukhari 7199: they pledged to say ____ wherever they were.", "Salam", "Takbir", "Dhikr"] },
  "What would they not fear for Allah's sake?": { answer: "People's blame", harder: ["Bukhari 7199: they would not fear what, for Allah's sake?", "Hunger", "Death", "Poverty"] },
  "They pledged to obey only when they felt active.": { answer: "False", harder: "By Bukhari 7199, they pledged to obey only when they felt active." },
  // Sahih al-Bukhari 2023.
  "Why was the date of Laylat al-Qadr taken away?": { answer: "Two Muslims were quarreling", harder: ["Bukhari 2023: he ﷺ came to tell the date of Laylat al-Qadr. It was taken away because...?", "He forgot it", "The people were asleep", "It was not yet time"] },
  "Which nights did he say to search?": { answer: "The 29th, 27th and 25th", harder: ["Bukhari 2023: 'seek it on the...' which nights?", "27th only", "21st, 23rd and 25th", "Last three"] },
  "Quarreling can take away blessings.": { answer: "True", harder: "By Bukhari 2023, the date was taken away because two Muslims quarrelled." },
  // Jami at-Tirmidhi 2531.
  "How many levels does Paradise have?": { answer: "A hundred", harder: ["Tirmidhi 2531: Paradise has how many levels?", "Seventy", "Ninety-nine", "A thousand"] },
  "What is the highest level called?": { answer: "Al-Firdaus", harder: ["Tirmidhi 2531: the highest level, from which four rivers flow, is...?", "Adn", "Al-Ma'wa", "Dar as-Salam"] },
  "What should we ask Allah for?": { answer: "Al-Firdaus", harder: ["Tirmidhi 2531: 'when you ask Allah, ask Him for...' what?", "Forgiveness only", "Any level", "Al-Kawthar"] },
  // Sahih al-Bukhari 6987.
  "A good dream is one of how many parts?": { answer: "Forty-six", harder: ["Bukhari 6987: a believer's good dream is one of how many parts of prophethood?", "Forty", "Seventy", "Twenty-three"] },
  "Whose good dreams are meant?": { answer: "A believer's", harder: ["Bukhari 6987: one of forty-six parts of prophethood. Whose good dream?", "A scholar's", "A child's", "A prophet's"] },
  "Good dreams are a gift to believers.": { answer: "True", harder: "By Bukhari 6987, the good dream of a believer is a part of prophethood." },
  // Sahih al-Bukhari 2924.
  "Where did Ubadah live in later years?": { answer: "By the sea at Hims", harder: ["Bukhari 2924: Umair visited Ubadah with Umm Haram. Where?", "On the coast of Gaza", "In Damascus", "In Jerusalem"] },
  "Who was Ubadah's wife?": { answer: "Umm Haram", harder: ["Bukhari 2924: Umair visited Ubadah on the coast of Hims together with whom?", "Umm Sulaim", "Umm Ayman", "Umm al-Ala"] },
  "What was promised to the first sea army?": { answer: "Paradise", harder: ["Bukhari 2924: what is granted to the first of the ummah who sail to fight in Allah's way?", "Islands", "Booty", "Ships"] },
  // Sahih Muslim 29.
  "When did Ubadah share that hadith?": { answer: "At his deathbed", harder: ["Muslim 29: Ubadah kept back one hadith and told it when?", "On his deathbed", "After Badr", "On the day of Hunayn"] },
  "What does Allah forbid for one who says the Shahadah?": { answer: "The Fire", harder: ["Muslim 29: one who testifies to the Shahadah, Allah forbids for him...?", "Hardship", "The Bridge", "Questioning in the grave"] },
  "Who wept at Ubadah's bedside?": { answer: "As-Sunabihi", harder: ["Muslim 29: who visited Ubadah at his death and wept?", "Alqamah", "Masruq", "Umm Haram"] },
  // Sahih Muslim 1779.
  "What did Sa'd say they would ride into?": { answer: "The sea", harder: ["Muslim 1779: Sa'd ibn Ubadah said they would plunge their horses into what?", "The river", "The fire", "The desert"] },
  "Where did the Muslims camp after that?": { answer: "At Badr", harder: ["Muslim 1779: after the advice about Abu Sufyan's news, they set out and camped where?", "At Uhud", "At Hunayn", "At the trench"] },
  "The Prophet ﷺ asked his companions for advice.": { answer: "True", harder: "By Muslim 1779, when news of Abu Sufyan came, the Prophet ﷺ first asked for advice." },
  // Sahih al-Bukhari 2756.
  "What did Sa'd give for his mother?": { answer: "His garden", harder: ["Bukhari 2756: Sa'd gave what as charity for his mother?", "His garden Al-Mikhraf", "His well Rumah", "His house in Quba"] },
  "Does charity for a dead parent help them?": { answer: "Yes", harder: ["Bukhari 2756: does charity on behalf of a mother who died benefit her?", "Only if she asked for it", "No", "Only if given in her life"] },
  "Sa'd was with his mother when she died.": { answer: "False", harder: "By Bukhari 2756, Sa'd was beside his mother when she died." },
  // Sahih al-Bukhari 6959.
  "What had his mother left unfinished?": { answer: "A vow", harder: ["Bukhari 6959: what had Sa'd's mother made and died before keeping?", "A debt", "A promise of a journey", "A will"] },
  "What did the Prophet ﷺ tell Sa'd to do?": { answer: "Fulfil it for her", harder: ["Bukhari 6959: about the unkept vow, the Prophet ﷺ told Sa'd to...?", "Give a fine for it", "Leave it, it falls away", "Fast instead"] },
  "A child can help a parent after death.": { answer: "True", harder: "By Bukhari 6959, a child may fulfil a vow on behalf of a parent who died." },
  // Sahih Muslim 925.
  "What did the Prophet ﷺ call Sa'd?": { answer: "My brother", harder: ["Muslim 925: 'how is my ____ Sa'd ibn Ubadah?'", "Friend", "Companion", "Helper"] },
  "How many went with the Prophet ﷺ?": { answer: "More than ten", harder: ["Muslim 925: how many went with him to visit Sa'd?", "Two or three", "Seven", "Over a hundred"] },
  "Visiting the sick is a good Sunnah.": { answer: "True", harder: "By Muslim 925, they walked without shoes or caps across barren land to visit Sa'd." },
  // Sahih al-Bukhari 1304.
  "What did the Prophet ﷺ do at Sa'd's bedside?": { answer: "He wept", harder: ["Bukhari 1304: at Sa'd ibn Ubadah's sickbed, what did the Prophet ﷺ do?", "He made dua silently", "He left quickly", "He recited loudly"] },
  "What does Allah not punish for?": { answer: "Tears and a sad heart", harder: ["Bukhari 1304: Allah does not punish for tears or for...?", "Cursing", "Wailing", "Tearing clothes"] },
  "To what did he point as the real danger?": { answer: "His tongue", harder: ["Bukhari 1304: 'but for this', he said, pointing to what?", "His heart", "His hands", "His eyes"] },
  // Sahih al-Bukhari 3791.
  "What was Sa'd's clan called?": { answer: "Banu Sa'idah", harder: ["Bukhari 3791: Sa'd ibn Ubadah's clan, named after three others among the best homes?", "Banu an-Najjar", "Banu Abd al-Ashhal", "Banu al-Harith"] },
  "What did the Prophet ﷺ say about all Ansar homes?": { answer: "There is good in all of them", harder: ["Bukhari 3791: after naming the best homes, what did he say of all the Ansar homes?", "Only the first is good", "Some are better than others", "Only four are good"] },
  "Sa'd's clan was named among the best.": { answer: "True", harder: "By Bukhari 3791, Banu Sa'idah was named after three other homes of the Ansar." },
  // Sahih al-Bukhari 3956.
  "Why did Al-Bara miss Badr?": { answer: "He was too young", harder: ["Bukhari 3956: Al-Bara and Ibn Umar did not join Badr because...?", "They were ill", "They were guarding Madinah", "They were traveling"] },
  "Who else was too young for Badr?": { answer: "Ibn Umar", harder: ["Bukhari 3956: who was considered too young for Badr along with Al-Bara?", "Anas", "Zaid ibn Thabit", "Usamah"] },
  "Young companions were eager to serve Islam.": { answer: "True", harder: "By Bukhari 3956, the Ansar at Badr were over two hundred and forty." },
  // Sahih al-Bukhari 40.
  "Which way did Muslims first pray in Madinah?": { answer: "Toward Jerusalem", harder: ["Bukhari 40: for sixteen or seventeen months in Madinah, he ﷺ prayed facing...?", "The Kaaba", "Yemen", "Quba"] },
  "Which was the first prayer toward the Kaaba?": { answer: "Asr", harder: ["Bukhari 40: the first prayer he prayed facing the Kaaba was...?", "Dhuhr", "Fajr", "Maghrib"] },
  "The people bowing turned to the Kaaba right away.": { answer: "True", harder: "By Bukhari 40, the people who were bowing turned toward the Kaaba at once." },
  // Sahih al-Bukhari 247.
  "What should you do before bed?": { answer: "Make wudu", harder: ["Bukhari 247: before lying down to sleep, make ____ as for prayer.", "Dhikr", "Ghusl", "Tayammum"] },
  "On which side should you lie?": { answer: "The right side", harder: ["Bukhari 247: lie on which side and say the bedtime dua?", "The left side", "On the back", "Either side"] },
  "What if you die that night?": { answer: "You die on Islam", harder: ["Bukhari 247: if you die that night after this dua, you die on...?", "Sleep only", "The Sunnah of prayer", "Nothing special"] },
  // Sahih al-Bukhari 2837.
  "What was the Prophet ﷺ carrying?": { answer: "Earth from the trench", harder: ["Bukhari 2837: on the day of Al-Ahzab, he ﷺ carried earth until it covered his...?", "A banner", "Stones for a wall", "Water for the army"] },
  "What did he ask Allah for?": { answer: "Calm and firm feet", harder: ["Bukhari 2837: 'send down ____ on us and make our feet firm.'", "Victory and booty", "Rain and food", "Angels and light"] },
  "The Prophet ﷺ worked alongside his companions.": { answer: "True", harder: "By Bukhari 2837, the Prophet ﷺ carried earth while digging at Al-Ahzab." },
  // Sahih al-Bukhari 1239.
  "How many things were they ordered to do?": { answer: "Seven", harder: ["Bukhari 1239: the things they were ordered, and also the things forbidden, numbered...?", "Five", "Three", "Ten"] },
  "Which is one of the seven?": { answer: "Visiting the sick", harder: ["Bukhari 1239: which is among the seven they were ordered?", "Wearing silk", "Using silver vessels", "Wearing gold rings"] },
  "Helping the wronged is one of the seven.": { answer: "True", harder: "By Bukhari 1239, helping the oppressed and replying to one who sneezes are among the seven." },
  // Sahih al-Bukhari 2874.
  "What did the Prophet ﷺ ride at Hunayn?": { answer: "A white mule", harder: ["Bukhari 2874: at Hunayn, on what was he ﷺ saying 'I am the Prophet in truth'?", "A grey horse", "A she-camel", "A donkey"] },
  "The Prophet ﷺ fled from the arrows.": { answer: "False", harder: "By Bukhari 2874, the Prophet ﷺ ran from Hawazin's arrows at Hunayn." },
  // Sunan Abi Dawud 3646.
  "What did Abdullah ibn Amr do with hadith?": { answer: "He wrote them down", harder: ["Abu Dawud 3646: why did Abdullah ibn Amr write everything he heard?", "He was told to stop", "To sell it", "To show Quraysh"] },
  "The Prophet ﷺ only spoke the truth.": { answer: "True", harder: "By Abu Dawud 3646, the Prophet ﷺ pointed to his mouth and said only truth comes out of it." },
  // Sahih al-Bukhari 113.
  "Who said Abdullah ibn Amr had more hadith?": { answer: "Abu Hurairah", harder: ["Bukhari 113: who said none narrated more hadith than him except Abdullah ibn Amr?", "Anas", "Ibn Abbas", "Aishah"] },
  "Why did Abdullah ibn Amr have more?": { answer: "He wrote them down", harder: ["Bukhari 113: Abdullah ibn Amr narrated more than Abu Hurairah because...?", "He lived longer", "He was in Madinah longer", "He travelled more"] },
  "Abu Hurairah also wrote his hadith down.": { answer: "False", harder: "By Bukhari 113, Abu Hurairah wrote down hadith just like Abdullah ibn Amr." },
  // Sahih al-Bukhari 5054.
  "What was the first advice for finishing the Quran?": { answer: "Once a month", harder: ["Bukhari 5054: 'recite the whole Quran in...' how long, at first?", "Seven days", "Three days", "Forty days"] },
  "What was the shortest time he was allowed?": { answer: "Seven days", harder: ["Bukhari 5054: 'finish it in ____, and not in less than that.'", "Three days", "One night", "Ten days"] },
  "Islam asks for steady worship we can keep.": { answer: "True", harder: "By Bukhari 5054, he ﷺ set a limit on how fast the Quran is finished." },
  // Sahih al-Bukhari 1976.
  "What had Abdullah ibn Amr vowed?": { answer: "To fast every day", harder: ["Bukhari 1976: Abdullah ibn Amr had vowed to fast daily and to...?", "Give all his wealth", "Never marry", "Stay in the masjid"] },
  "What is the fast of Dawud?": { answer: "One day on, one day off", harder: ["Bukhari 1976: the fasting of Dawud is...?", "Three days a month", "Mondays and Thursdays", "Every day but Eid"] },
  "Which fast did the Prophet ﷺ call the best?": { answer: "The fast of Dawud", harder: ["Bukhari 1976: which fasting did he ﷺ call the best?", "Three days a month", "Fasting daily", "Mondays and Thursdays"] },
  // Sahih al-Bukhari 10.
  "A Muslim keeps others safe from what?": { answer: "His tongue and hand", harder: ["Bukhari 10: a Muslim is one from whose ____ the Muslims are safe.", "His wealth and house", "His eyes and ears", "His anger and pride"] },
  "Who is a true emigrant?": { answer: "One who leaves what Allah forbade", harder: ["Bukhari 10: the true emigrant (muhajir) is one who...?", "Moves to Madinah", "Leaves his tribe", "Travels to learn"] },
  "Hurtful words go against being a good Muslim.": { answer: "True", harder: "By Bukhari 10, a Muslim is one whose tongue and hand others are safe from." },
  // Sahih al-Bukhari 3461.
  "How much should we pass on?": { answer: "Even one ayah", harder: ["Bukhari 3461: 'convey from me even if it is...'?", "One hadith", "One word", "One surah"] },
  "What is the punishment for lying about him ﷺ on purpose?": { answer: "A seat in the Fire", harder: ["Bukhari 3461: one who lies about him ﷺ on purpose, let him...?", "Repay a fine", "Be silent", "Be warned"] },
  "Only scholars may share what they learned.": { answer: "False", harder: "By Bukhari 3461, we should convey from him ﷺ only once we know a whole book." },
  // Jami at-Tirmidhi 2485.
  "What did Abdullah see in the Prophet's ﷺ face?": { answer: "Truthfulness", harder: ["Tirmidhi 2485: on seeing his face, Abdullah ibn Salam knew it was not the face of...?", "A king", "A stranger", "A poet"] },
  "Which deed was among the first words?": { answer: "Spread the salam", harder: ["Tirmidhi 2485: the first words included spread the salam, feed people and...?", "Fast every day", "Travel for knowledge", "Give all your wealth"] },
  "He told people to pray while others sleep.": { answer: "True", harder: "By Tirmidhi 2485, the one who does these enters Paradise in peace." },
  // Sahih al-Bukhari 3329.
  "How many questions did he ask?": { answer: "Three", harder: ["Bukhari 3329: Abdullah ibn Salam asked about the first sign of the Hour, the first meal of Paradise and...?", "Two", "Four", "Five"] },
  "Who could answer such questions, he said?": { answer: "Only a prophet", harder: ["Bukhari 3329: he asked things that, he said, only who knows?", "A rabbi", "A soothsayer", "An angel"] },
  "What did he say after the answers?": { answer: "You are Allah's Messenger", harder: ["Bukhari 3329: after the three answers, Abdullah ibn Salam said...?", "Give me time", "Who taught you?", "This is magic"] },
  // Sahih al-Bukhari 3812.
  "Who told of his place in Paradise?": { answer: "Sa'd ibn Abi Waqqas", harder: ["Bukhari 3812: who said he never heard such words about anyone walking on earth except Abdullah ibn Salam?", "Abu Hurairah", "Anas ibn Malik", "Ibn Umar"] },
  "Where is the ayah about the witness?": { answer: "Surah Al-Ahqaf", harder: ["Bukhari 3812: the ayah 'a witness from the Children of Israel testifies' is in which surah?", "Surah Al-Baqarah", "Surah Al-Imran", "Surah As-Saff"] },
  "The witness came from Bani Isra'il.": { answer: "True", harder: "By Bukhari 3812, the ayah about a witness from the Children of Israel came about Abdullah ibn Salam." },
  // Sahih al-Bukhari 7010.
  "What did he hold in his dream?": { answer: "A handhold on a pillar", harder: ["Bukhari 7010: in his dream, he climbed a pillar in a green garden and held...?", "A rope from the sky", "A branch of a tree", "A lamp at the top"] },
  "What does the firm handhold mean?": { answer: "Islam", harder: ["Bukhari 7010: 'Abdullah will die holding the firm ____.'", "Rope of his tribe", "Wealth", "Sword"] },
  "What did he say about praising people?": { answer: "Do not say what you do not know", harder: ["Bukhari 7010: when people said he was of Paradise, he said...?", "That is true", "Say it more", "Ask the Prophet ﷺ"] },
  // Sahih al-Bukhari 7342.
  "What did he serve his guest?": { answer: "Sawiq and dates", harder: ["Bukhari 7342: Abdullah ibn Salam gave his guest what?", "Milk and honey", "Bread and meat", "Water only"] },
  "What was special about the bowl?": { answer: "The Prophet ﷺ drank from it", harder: ["Bukhari 7342: he offered a drink from a bowl that...?", "He bought in Syria", "Was made of silver", "Came from Jerusalem"] },
  "Abdullah ibn Salam was a kind host.": { answer: "True", harder: "By Bukhari 7342, Abdullah ibn Salam invited his guest to pray in the masjid the Prophet ﷺ prayed in." },
  // Sahih al-Bukhari 2979.
  "What did Asma use to tie the food?": { answer: "Her waist belt, cut in two", harder: ["Bukhari 2979: with what did Asma tie the water skin and the journey food?", "Two palm ropes", "Her headscarf", "A camel's rein"] },
  "What does Dhat an-Nitaqayn mean?": { answer: "The one with two belts", harder: ["Bukhari 2979: Asma was called Dhat an-Nitaqayn, meaning...?", "The one of the cave", "The one of the night", "The one with two scarves"] },
  "Asma helped the Hijrah journey.": { answer: "True", harder: "By Bukhari 2979, Abu Bakr told Asma to cut her waist belt in two." },
  // Sahih al-Bukhari 3151.
  "What did Asma carry on her head?": { answer: "Date stones", harder: ["Bukhari 3151: what did Asma carry on her head from Az-Zubair's land?", "Firewood", "Water skins", "Barley"] },
  "Who was Asma's husband?": { answer: "Az-Zubair", harder: ["Bukhari 3151: whose land did the Prophet ﷺ give, from which Asma carried date stones?", "Abu Bakr's", "Talhah's", "Abdullah's"] },
  "Asma worked hard for her family.": { answer: "True", harder: "By Bukhari 3151, Asma carried date stones two thirds of a farsakh to her house." },
  // Sahih al-Bukhari 2590.
  "What did Asma ask the Prophet ﷺ?": { answer: "May I give charity?", harder: ["Bukhari 2590: Asma had nothing but what Az-Zubair gave her. She asked...?", "May I ask him for more?", "May I work for money?", "May I keep it?"] },
  "What happens if we hold back charity?": { answer: "Allah holds back from us", harder: ["Bukhari 2590: 'give in charity and do not hold it back, or...'?", "You will lose it", "You will be poor", "It will spoil"] },
  "Even a little charity is worth giving.": { answer: "True", harder: "By Bukhari 2590, Asma, who had only what Az-Zubair gave her, was told to give charity." },
  // Sahih al-Bukhari 3183.
  "Who came to visit Asma?": { answer: "Her mother", harder: ["Bukhari 3183: during the treaty with Quraysh, who came to visit Asma, not being Muslim?", "Her sister", "Her aunt", "Her neighbour"] },
  "What did the Prophet ﷺ tell her?": { answer: "Keep good ties with her", harder: ["Bukhari 3183: Asma's mother was not Muslim. He ﷺ told her...?", "Wait until she accepts Islam", "Only send her a gift", "Meet her briefly"] },
  "Muslims are kind to parents who are not Muslim.": { answer: "True", harder: "By Bukhari 3183, Asma was told to keep good ties with her mother who was not Muslim." },
  // Sahih al-Bukhari 184.
  "What happened in the sky that day?": { answer: "An eclipse", harder: ["Bukhari 184: Aishah pointed to the sky and said Subhan Allah because of...?", "A comet", "Heavy rain", "The new moon"] },
  "What did the Prophet ﷺ speak about after?": { answer: "The test in the grave", harder: ["Bukhari 184: after the eclipse prayer, he ﷺ said people will be tested where?", "On the Bridge", "In the market", "At the Scale"] },
  "What will a believer answer in the grave?": { answer: "He is Muhammad, Allah's Messenger ﷺ", harder: ["Bukhari 184: asked 'what do you know about this man?', what is the believer's answer?", "He was a good man", "He was a wise king", "I followed my people"] },
  // Sahih al-Bukhari 938.
  "What did the woman cook on Fridays?": { answer: "Silq roots with barley", harder: ["Bukhari 938: on Fridays the woman cooked the roots of silq with...?", "Dates", "Milk", "Meat"] },
  "When did she feed them?": { answer: "After Jumu'ah", harder: ["Bukhari 938: they greeted her and she gave them the food when?", "Before Jumu'ah", "At night", "At Fajr"] },
  "Small kindness can make people love a day.": { answer: "True", harder: "By Bukhari 938, the companions looked forward to Friday because of her food." },
  // Sahih al-Bukhari 2351.
  "Who sat on the Prophet's ﷺ right?": { answer: "A young boy", harder: ["Bukhari 2351: the youngest, a boy, sat on which side of the Prophet ﷺ?", "On his left", "In front", "Behind him"] },
  "What did the Prophet ﷺ do first?": { answer: "Asked the boy's permission", harder: ["Bukhari 2351: before giving the drink to the old men, he ﷺ...?", "Gave it to the oldest", "Took turns from the left", "Shared it all at once"] },
  "The right side has the first turn when serving.": { answer: "True", harder: "By Bukhari 2351, he ﷺ asked permission of the boy on his right before giving the old men." },
  // Sahih al-Bukhari 1896.
  "What is the gate called?": { answer: "Ar-Rayyan", harder: ["Bukhari 1896: the gate of Paradise for those who fast is called...?", "Bab as-Sawm", "Bab ar-Rahmah", "Bab al-Jannah"] },
  "Who enters by that gate?": { answer: "Those who fasted", harder: ["Bukhari 1896: who enters through Ar-Rayyan, and none but them?", "Those who pray at night", "Those who give charity", "The martyrs"] },
  "The gate closes once they have entered.": { answer: "True", harder: "By Bukhari 1896, Ar-Rayyan is closed once those who fasted have entered." },
  // Sahih al-Bukhari 6474.
  "What did the Prophet ﷺ promise for guarding both?": { answer: "Paradise", harder: ["Bukhari 6474: what between his jaws and between his legs, guaranteed, earns what guarantee?", "Forgiveness of small sins", "Safety in this life", "Good health"] },
  "Which body part speaks words?": { answer: "The tongue", harder: ["Bukhari 6474: 'what is between his jaws' refers to which part?", "The teeth", "The breath", "The beard"] },
  "Guarding the tongue is part of faith.": { answer: "True", harder: "By Bukhari 6474, whoever guards his tongue and his private parts is promised Paradise." },
  // Sahih al-Bukhari 5304.
  "Whom should we look after?": { answer: "Orphans", harder: ["Bukhari 5304: who will be near him ﷺ in Paradise, like two fingers?", "The one who feeds guests", "The one who teaches", "The one who fasts"] },
  "What did he show with his hand?": { answer: "Two fingers together", harder: ["Bukhari 5304: he ﷺ showed which fingers?", "Thumb and index", "Middle and ring", "Two hands"] },
  "Caring for orphans brings one near him in Paradise.": { answer: "True", harder: "By Bukhari 5304, he ﷺ showed his index and middle fingers together." },
  // Sahih Muslim 681.
  "What happened to the Prophet ﷺ on the ride?": { answer: "He dozed off", harder: ["Muslim 681: on the night journey, he ﷺ dozed and leaned on what?", "A tree", "Abu Bakr", "A tent pole"] },
  "How many times did Abu Qatadah hold him up?": { answer: "Three", harder: ["Muslim 681: how many times did Abu Qatadah support him without waking him?", "Twice", "Seven", "Five"] },
  "What du'a did Abu Qatadah receive?": { answer: "May Allah protect you", harder: ["Muslim 681: 'may Allah ____ you, as you have protected His Messenger.'", "Reward", "Forgive", "Bless"] },
  // Sahih al-Bukhari 2914.
  "Why did the others not help him hunt?": { answer: "They were in ihram", harder: ["Bukhari 2914: his companions would not hand him his whip or spear because...?", "They were fasting", "The animal was far", "It was night"] },
  "What did he hunt?": { answer: "A wild donkey", harder: ["Bukhari 2914: Abu Qatadah, not in ihram, hunted what on the road to Makkah?", "A gazelle", "A rabbit", "An ostrich"] },
  "What did the Prophet ﷺ call it?": { answer: "A meal Allah fed you", harder: ["Bukhari 2914: some ate and some refused. The Prophet ﷺ said it was...?", "Better left", "Allowed only to him", "Doubtful"] },
  // Sahih Muslim 1162b.
  "Fasting Arafah covers sins of how many years?": { answer: "Two", harder: ["Muslim 1162: fasting the day of Arafah expiates the sins of which years?", "Ten", "Three", "Five"] },
  "When is the day of Arafah?": { answer: "9th of Dhul-Hijjah", harder: ["Muslim 1162: Arafah expiates two years. Arafah falls on which day?", "10th of Dhul-Hijjah", "8th of Dhul-Hijjah", "1st of Shawwal"] },
  "Fasting Ashura wipes out one year of sins.": { answer: "True", harder: "By Muslim 1162, Ashura expiates the year before, and Arafah the year before and the year after." },
  // Sahih al-Bukhari 3292.
  "Where does a good dream come from?": { answer: "From Allah", harder: ["Bukhari 3292: a good dream is from Allah, and a bad dream is from...?", "Allah too", "Bad food", "The soul"] },
  "What should you do after a bad dream?": { answer: "Seek Allah's refuge", harder: ["Bukhari 3292: after a frightening dream, spit to your left and...?", "Tell a friend", "Pray two rak'ahs", "Go back to sleep"] },
  "A bad dream will not harm you if you seek refuge.": { answer: "True", harder: "By Bukhari 3292, a bad dream will not harm the one who spits to his left and seeks refuge." },
  // Sahih al-Bukhari 516.
  "Whom did the Prophet ﷺ carry in prayer?": { answer: "Umamah, his granddaughter", harder: ["Bukhari 516: he ﷺ prayed carrying Umamah. She was the daughter of...?", "Ruqayyah's daughter", "Fatimah's daughter", "Umm Kulthum's daughter"] },
  "What did he do when prostrating?": { answer: "Put her down", harder: ["Bukhari 516: what did he ﷺ do with Umamah when he stood up?", "Left her down", "Gave her to her mother", "Ended the prayer"] },
  "The Prophet ﷺ was gentle with children.": { answer: "True", harder: "By Bukhari 516, he ﷺ put Umamah down when he prostrated and carried her when he stood." },
  // Sahih al-Bukhari 1167.
  "What do we do before sitting in a masjid?": { answer: "Pray two rak'ahs", harder: ["Bukhari 1167: on entering a masjid, do not sit until you have...?", "Made wudu again", "Faced the qiblah", "Read one ayah"] },
  "How many rak'ahs are prayed?": { answer: "Two", harder: ["Bukhari 1167: before sitting in a masjid, pray how many rak'ahs?", "Three", "Four", "One"] },
  "You should sit first, then pray later.": { answer: "False", harder: "By Bukhari 1167, one may sit first in the masjid and pray the two rak'ahs later." },
  // Sahih al-Bukhari 2587.
  "What did the Prophet ﷺ ask Nu'man's father?": { answer: "Did all your sons get the same?", harder: ["Bukhari 2587: before witnessing the gift, he ﷺ asked Nu'man's father...?", "Is the gift halal?", "Does your wife agree?", "Is it a large gift?"] },
  "What did he tell parents to be?": { answer: "Just to their children", harder: ["Bukhari 2587: 'fear Allah and be ____ to your children.'", "Gentle", "Generous", "Firm"] },
  "Nu'man's father took the gift back.": { answer: "True", harder: "By Bukhari 2587, Nu'man's father took back the gift he had given only to Nu'man." },
  // Sahih al-Bukhari 52.
  "What lies between halal and haram?": { answer: "Doubtful things", harder: ["Bukhari 52: between the clear halal and the clear haram are...?", "Things all people know", "Things allowed in need", "Small sins"] },
  "What does avoiding doubtful things protect?": { answer: "Religion and honor", harder: ["Bukhari 52: whoever avoids doubtful things protects his...?", "Wealth and family", "Body and health", "Name and tribe"] },
  "Which body part decides if the body is good?": { answer: "The heart", harder: ["Bukhari 52: the piece of flesh which, if good, makes the whole body good?", "The tongue", "The liver", "The mind"] },
  // Sahih al-Bukhari 6011.
  "Believers are like what?": { answer: "One body", harder: ["Bukhari 6011: in mercy, love and kindness, believers are like...?", "A building", "Brothers in a house", "A single tribe"] },
  "What happens when one part hurts?": { answer: "The whole body feels it", harder: ["Bukhari 6011: if one part is ill, the whole body shares in...?", "Pain of that part only", "Nothing", "Only sadness"] },
  "Muslims should care when others suffer.": { answer: "True", harder: "By Bukhari 6011, the whole body shares the sleeplessness and fever when one part is ill." },
  // Sahih al-Bukhari 2493.
  "What did the people below want to do?": { answer: "Make a hole for water", harder: ["Bukhari 2493: those on the lower deck wanted to get water by...?", "Asking those above", "Leaving the ship", "Lowering a bucket"] },
  "What if nobody stopped them?": { answer: "Everyone would drown", harder: ["Bukhari 2493: if those above let them make the hole...?", "Only those below would drown", "Water would be shared", "The ship would turn back"] },
  "Stopping wrong protects the whole community.": { answer: "True", harder: "By Bukhari 2493, if those above stop the ones making the hole, all are saved." },
  // Sahih Muslim 436a.
  "How should prayer rows be?": { answer: "Straight", harder: ["Muslim 436: 'straighten your rows, or Allah will...?' How should rows be?", "Long", "Close to the imam", "Wide"] },
  "What may crooked rows bring?": { answer: "Division between people", harder: ["Muslim 436: what will Allah put between you if rows are not straight?", "Less reward", "Weak voices", "Long prayers"] },
  "Standing straight in rows is a small, unimportant thing.": { answer: "False", harder: "By Muslim 436, straightening the rows is a small, unimportant thing." },
  // Sahih Muslim 878a.
  "Which surah did he recite first?": { answer: "Al-A'la", harder: ["Muslim 878: on Eid and Friday he ﷺ recited 'Glorify the name of your Lord, the Most High', which is...?", "Al-Ala'q", "Al-Mulk", "Al-Jumu'ah"] },
  "Which surah came second?": { answer: "Al-Ghashiyah", harder: ["Muslim 878: second, 'Has there come to you the news of the Overwhelming', which is...?", "Al-Waqi'ah", "Al-Qari'ah", "Al-Munafiqun"] },
  "When did he recite these two?": { answer: "Jumu'ah and the two Eids", harder: ["Muslim 878: he ﷺ recited Al-A'la and Al-Ghashiyah on...?", "Fajr of Friday", "Every night", "Ramadan nights only"] },
  // Sahih al-Bukhari 3035.
  "How did the Prophet ﷺ greet Jarir?": { answer: "With a smile", harder: ["Bukhari 3035: since Jarir became Muslim, whenever he ﷺ saw him he...?", "Asked about his tribe", "Gave him a gift", "Called him to sit near"] },
  "What was Jarir's problem with horses?": { answer: "He could not sit firm", harder: ["Bukhari 3035: Jarir told him he could not ____ on a horse.", "Ride fast", "Throw a spear", "Hold the reins"] },
  "The Prophet ﷺ made du'a to make Jarir firm.": { answer: "True", harder: "By Bukhari 3035, he ﷺ struck Jarir's chest and asked Allah to make him firm and a guide." },
  // Sahih al-Bukhari 57.
  "To whom did Jarir pledge sincerity?": { answer: "Every Muslim", harder: ["Bukhari 57: Jarir pledged to be sincere and true to whom?", "His own tribe", "The rulers only", "The Ansar"] },
  "Which worship was in his pledge?": { answer: "Prayer and zakat", harder: ["Bukhari 57: besides sincerity to every Muslim, Jarir's pledge included...?", "Fasting and Hajj", "Jihad and Hijrah", "Hajj and zakat"] },
  "Wishing good for others is part of Islam.": { answer: "True", harder: "By Bukhari 57, Jarir pledged sincerity to every Muslim along with prayer and zakat." },
  // Sahih al-Bukhari 554.
  "What were they looking at?": { answer: "The full moon", harder: ["Bukhari 554: 'you will see your Lord as you see this...'?", "Sun at noon", "Morning star", "Crescent"] },
  "Which two prayers did he urge them to keep?": { answer: "Fajr and Asr", harder: ["Bukhari 554: 'do not miss the prayer before sunrise and before sunset' means...?", "Fajr and Maghrib", "Duha and Asr", "Fajr and Isha"] },
  "Believers will see their Lord in the Hereafter.": { answer: "True", harder: "By Bukhari 554, believers will see their Lord with no trouble, as the full moon is seen." },
  // Sahih al-Bukhari 3020.
  "What was Dhul-Khalasah?": { answer: "An idol house", harder: ["Bukhari 3020: Dhul-Khalasah, called the Yemeni Kaaba, belonged to Khath'am and was...?", "A fort", "A palace", "A well"] },
  "How many horsemen went with Jarir?": { answer: "150", harder: ["Bukhari 3020: Jarir set out against Dhul-Khalasah with how many horsemen of Ahmas?", "10", "1,000", "3"] },
  "Jarir brought down the idol house.": { answer: "True", harder: "By Bukhari 3020, Jarir pulled down Dhul-Khalasah and burnt it." },
  // Sahih al-Bukhari 7376.
  "Who does not receive Allah's mercy?": { answer: "Those with no mercy for people", harder: ["Bukhari 7376: Allah will not be merciful to those who...?", "Do not fast", "Are poor", "Do not travel"] },
  "What brings Allah's mercy?": { answer: "Being merciful to people", harder: ["Bukhari 7376: whom will Allah not show mercy to? Mercy comes by...", "Being strict", "Praying alone", "Staying away"] },
  "Mercy is only for family, not strangers.": { answer: "False", harder: "By Bukhari 7376, Allah's mercy is withheld only from those unkind to family." },
  // Sahih Muslim 2592a.
  "Whoever lacks gentleness loses what?": { answer: "Good", harder: ["Muslim 2592: whoever is deprived of gentleness is deprived of...?", "Wealth", "Friends", "Health"] },
  "Which is better in dealing with people?": { answer: "Gentleness", harder: ["Muslim 2592: being deprived of what means being deprived of good?", "Strength", "Speech", "Sleep"] },
  "Being harsh brings more good than being gentle.": { answer: "False", harder: "By Muslim 2592, whoever is deprived of gentleness gains good in its place." },
  // Sahih Muslim 488.
  "What deed did Thawban recommend?": { answer: "Prostrating often", harder: ["Muslim 488: asked on the third time for a deed to Paradise, Thawban said...?", "Fast often", "Give charity often", "Recite often"] },
  "What does each sajdah do?": { answer: "Raises a level, removes a sin", harder: ["Muslim 488: each prostration to Allah...?", "Wipes all sins", "Brings rain", "Earns a palace"] },
  "Thawban was a freed servant of the Prophet ﷺ.": { answer: "True", harder: "By Muslim 488, Ma'dan asked Thawban three times before he answered." },
  // Sahih Muslim 591.
  "How many times did he ask forgiveness?": { answer: "Three", harder: ["Muslim 591: after finishing prayer he ﷺ asked forgiveness how many times?", "Once", "Thirty-three", "Seven"] },
  "Which name of Allah did he say next?": { answer: "As-Salam", harder: ["Muslim 591: 'O Allah, You are ____ and from You is peace.'", "Al-Ghafur", "Al-Hayy", "Al-Haqq"] },
  "He said Astaghfirullah after finishing prayer.": { answer: "True", harder: "By Muslim 591, he ﷺ said Astaghfirullah three times after the prayer." },
  // Sahih Muslim 994.
  "Which coin is the best?": { answer: "One spent on your family", harder: ["Muslim 994: the best dinar a man spends is on...?", "His companions", "His mount", "The masjid"] },
  "Spending on family earns reward.": { answer: "True", harder: "By Muslim 994, the dinar spent on family comes before the one spent on a mount in Allah's way." },
  "What comes after family in the list?": { answer: "A mount in Allah's way", harder: ["Muslim 994: second best is a dinar spent on...?", "Companions in Allah's way", "The poor", "His parents"] },
  // Sahih Muslim 2568d.
  "Visiting the sick is like being where?": { answer: "In Paradise's fruit garden", harder: ["Muslim 2568: one who visits the sick remains in the khurfah of Paradise, meaning...?", "Its shade", "Its rivers", "Its palaces"] },
  "What is Khurfat al-Jannah?": { answer: "Paradise's fruit garden", harder: ["Muslim 2568: what is the khurfah of Paradise?", "Its gate", "Its river", "Its highest level"] },
  "Visiting the sick brings great reward.": { answer: "True", harder: "By Muslim 2568, the one visiting the sick remains in the harvest of Paradise's fruit." },
  // Sunan Abi Dawud 4297.
  "Will Muslims be few at that time?": { answer: "No, they will be many", harder: ["Abu Dawud 4297: when nations call each other against you, will you be few?", "Yes, very few", "About half", "Only a small group"] },
  "What is wahn?": { answer: "Love of the world and dislike of death", harder: ["Abu Dawud 4297: wahn is love of the world and...?", "Love of fame", "Fear of people", "Love of fighting"] },
  "Being many is enough without strong faith.": { answer: "False", harder: "By Abu Dawud 4297, being many protects Muslims even with wahn in their hearts." },
  // Sunan Ibn Majah 4245.
  "What will Allah make their good deeds like?": { answer: "Scattered dust", harder: ["Ibn Majah 4245: deeds like the mountains of Tihamah, Allah will make them like...?", "Light on the Bridge", "Weight on the Scale", "Sea foam"] },
  "What do these people do when they are alone?": { answer: "Break Allah's sacred limits", harder: ["Ibn Majah 4245: these people, of your own kind, do what when alone?", "Pray at night", "Weep for their sins", "Give in secret"] },
  "Sins done when no one sees still matter to Allah.": { answer: "True", harder: "By Ibn Majah 4245, Thawban asked for a description so they would not become like them unknowingly." },
  // Sahih Muslim 814a.
  "Which two surahs did the Prophet ﷺ praise to Uqbah?": { answer: "Al-Falaq and An-Nas", harder: ["Muslim 814: 'wonderful verses sent down today, never seen the like.' Which two surahs?", "Al-Ikhlas and Al-Kafirun", "Al-Fatihah and Al-Ikhlas", "Al-Asr and Al-Kawthar"] },
  "Verses like these had been seen many times before.": { answer: "False", harder: "By Muslim 814, the like of Al-Falaq and An-Nas had been sent down before." },
  "What do both surahs begin with?": { answer: "Say: I seek refuge", harder: ["Muslim 814: 'the Lord of the dawn' and 'the Lord of mankind' both follow which words?", "Say: He is Allah", "In the name of Allah", "Glorify the name"] },
  // Sahih Muslim 803.
  "What is better than two big she-camels?": { answer: "Learning two verses", harder: ["Muslim 803: going to the masjid to learn two verses is better than...?", "Two gold coins", "Two gardens", "Two slaves freed"] },
  "Where was Uqbah when he heard this?": { answer: "In the Suffah", harder: ["Muslim 803: where were they when he ﷺ asked who wanted two big she-camels each morning?", "At the market", "At Quba", "On a journey"] },
  "Three verses are better than three she-camels.": { answer: "True", harder: "By Muslim 803, three verses learnt are better than three she-camels." },
  // Sahih al-Bukhari 6426.
  "What did the Prophet ﷺ fear most for his ummah?": { answer: "Racing for this world", harder: ["Bukhari 6426: 'I do not fear you will worship others after me, but I fear you will...'?", "Leave the prayer", "Forget the Quran", "Fight each other"] },
  "Whom did he pray for before this speech?": { answer: "The martyrs of Uhud", harder: ["Bukhari 6426: before going up the minbar, for whom did he ﷺ pray?", "The people of Badr", "His uncle Hamzah only", "The people of Baqi'"] },
  "What did he say he was looking at?": { answer: "His Cistern", harder: ["Bukhari 6426: 'By Allah, I see my ____ now.'", "Grave", "Paradise", "Lord"] },
  // Sahih al-Bukhari 2500.
  "What job did Uqbah get?": { answer: "Sharing out sheep", harder: ["Bukhari 2500: what did the Prophet ﷺ give Uqbah to share among his companions?", "Camels for travel", "Dates for the poor", "Spoils of war"] },
  "What did he do with the last young goat?": { answer: "Sacrificed it himself", harder: ["Bukhari 2500: one young goat was left. He ﷺ told Uqbah to...?", "Give it to the poor", "Keep it for later", "Return it"] },
  "Uqbah was trusted to share things fairly.": { answer: "True", harder: "By Bukhari 2500, the young goat left over was sacrificed on Uqbah's behalf." },
  // Sahih Muslim 1414.
  "What is a believer to another believer?": { answer: "His brother", harder: ["Muslim 1414: 'a believer is the ____ of a believer.'", "Friend", "Helper", "Mirror"] },
  "What must you not do in your brother's sale?": { answer: "Outbid him", harder: ["Muslim 1414: because a believer is a brother, he must not ____ his brother.", "Trade with", "Visit", "Lend to"] },
  "You may propose marriage over your brother's proposal.": { answer: "False", harder: "By Muslim 1414, one may propose over a brother's proposal before he leaves it." },
  // Sahih al-Bukhari 6137.
  "What was Uqbah's problem on trips?": { answer: "Hosts did not feed them", harder: ["Bukhari 6137: on their trips, the people they stayed with...?", "Stole from them", "Fought them", "Sent them away"] },
  "What does a traveler guest have?": { answer: "A right to hosting", harder: ["Bukhari 6137: if hosts do not host them, they may take...?", "Whatever they want", "Nothing at all", "Double the right"] },
  "When hosts are good, what should guests do?": { answer: "Accept their hosting", harder: ["Bukhari 6137: if people host you as a guest should be hosted...?", "Pay them", "Take more", "Move on"] },
  // Sahih Muslim 804a.
  "What will the Quran do for its readers?": { answer: "Intercede for them", harder: ["Muslim 804: on the Day of Resurrection, the Quran will come as ____ for its readers.", "A witness against", "A light", "A judge"] },
  "Which are the two bright surahs?": { answer: "Al-Baqarah and Al Imran", harder: ["Muslim 804: which two surahs are called 'the two bright ones'?", "Al-Baqarah and An-Nisa", "Al Imran and Al-Ma'idah", "Al-Baqarah and Al-Kahf"] },
  "How will the two surahs come?": { answer: "Like two clouds", harder: ["Muslim 804: Al-Baqarah and Al Imran will come like two clouds or two...?", "Like two lamps", "Like two mountains", "Like two angels"] },
  // Sahih Muslim 1036.
  "Whom should you begin your charity with?": { answer: "Your dependents", harder: ["Muslim 1036: in spending, begin with...?", "The neighbours", "The masjid", "The travellers"] },
  "Which hand is better?": { answer: "The upper, giving hand", harder: ["Muslim 1036: 'the upper hand is better than...'", "The right hand", "The closed hand", "The strong hand"] },
  "Keeping what you need to live is blamed.": { answer: "False", harder: "By Muslim 1036, keeping what you need to live is blamed." },
  // Sahih Muslim 2765.
  "What had the man done before the reply?": { answer: "Made wudu and prayed", harder: ["Muslim 2765: the man said he had sinned. Before he ﷺ answered, the man...?", "Gave charity", "Asked others", "Fasted a day"] },
  "Abu Umamah followed to hear the answer.": { answer: "True", harder: "By Muslim 2765, the Prophet ﷺ stayed silent until the prayer was over." },
  "What did the man get in the end?": { answer: "Forgiveness from Allah", harder: ["Muslim 2765: after he made wudu well and prayed with them, he was told...?", "Pay a fine", "Fast two months", "Free a slave"] },
  // Sahih al-Bukhari 5459.
  "When did the Prophet ﷺ say this praise?": { answer: "After finishing a meal", harder: ["Bukhari 5459: 'Praise be to Allah who satisfied our needs' was said when?", "Before eating", "On waking", "After drinking water only"] },
  "What did he thank Allah for?": { answer: "Food and drink", harder: ["Bukhari 5459: 'who has satisfied our needs and ____ our thirst.'", "Removed", "Cured", "Blessed"] },
  "Allah's favor can be fully paid back.": { answer: "False", harder: "By Bukhari 5459, Allah's favour can be fully repaid." },
  // Sunan Abi Dawud 4800.
  "What earns a house at Paradise's edge?": { answer: "Leaving arguing when right", harder: ["Abu Dawud 4800: a house on the edge of Paradise for one who leaves arguing...?", "When wrong", "With strangers", "In the masjid"] },
  "What earns the house at the top?": { answer: "Good character", harder: ["Abu Dawud 4800: the house at the top of Paradise is for one with...?", "Leaving lies", "Leaving arguments", "Much knowledge"] },
  "Lying is fine if only joking.": { answer: "False", harder: "By Abu Dawud 4800, lying is fine if it is only in jest." },
  // Sahih al-Bukhari 2909.
  "How were the early swords decorated?": { answer: "With leather, lead and iron", harder: ["Bukhari 2909: the swords of those who opened many lands were decorated with...?", "Gold and jewels", "Silver only", "Nothing at all"] },
  "The early Muslims loved showing off wealth.": { answer: "False", harder: "By Bukhari 2909, the early swords were decorated with gold and silver." },
  "What lesson does Abu Umamah teach?": { answer: "Simple living is strength", harder: ["Bukhari 2909: plain swords of leather, lead and iron opened many lands. The lesson?", "Decoration brings victory", "Iron is precious", "Lands come from gold"] },
  // Sahih al-Bukhari 1117.
  "If you cannot stand, how do you pray?": { answer: "Sitting", harder: ["Bukhari 1117: pray standing, and if you cannot, then...?", "Lying down", "Make it up later", "With signs of the eyes"] },
  "If you cannot sit, how do you pray?": { answer: "Lying on your side", harder: ["Bukhari 1117: if you cannot pray sitting, then...?", "On your back only", "Standing again", "Wait until well"] },
  "Islam makes prayer easy for the sick.": { answer: "True", harder: "By Bukhari 1117, Imran was told to pray standing, then sitting, then lying on his side." },
  // Sahih al-Bukhari 348.
  "Why did the man not pray with them?": { answer: "He had no water for ghusl", harder: ["Bukhari 348: the man did not pray with the people because...?", "He had just eaten", "He was ill", "He was late"] },
  "What did the Prophet ﷺ tell him to use?": { answer: "Clean earth", harder: ["Bukhari 348: with no water for a bath, do tayammum with...?", "Any dust", "Stone", "Ash"] },
  "Tayammum was enough for him to pray.": { answer: "True", harder: "By Bukhari 348, tayammum with clean earth was enough for one needing a bath." },
  // Sahih al-Bukhari 3571.
  "How many men drank from the water-skins?": { answer: "Forty", harder: ["Bukhari 3571: after he ﷺ rubbed the mouths of the water-skins, how many drank?", "Seventy", "Twelve", "Thirty"] },
  "What happened to the woman's people?": { answer: "They accepted Islam", harder: ["Bukhari 3571: the woman with the two water-skins went back to her people. They...?", "Asked for more", "Sent gifts", "Made a treaty"] },
  "The water-skins were nearly bursting full.": { answer: "True", harder: "By Bukhari 3571, forty drank and filled their vessels from the woman's two water-skins." },
  // Sahih al-Bukhari 3650.
  "Which generation is the best?": { answer: "The Prophet's ﷺ own", harder: ["Bukhari 3650: the best of my ummah are...?", "Those who come last", "The scholars only", "Those of Madinah"] },
  "What will some later people fail to keep?": { answer: "Their vows", harder: ["Bukhari 3650: people will come who testify unasked, betray trusts and do not keep...?", "Their prayers", "Their families", "Their fasts"] },
  "Imran was sure how many generations were named.": { answer: "False", harder: "By Bukhari 3650, Imran said he was sure how many generations he ﷺ named." },
  // Sahih al-Bukhari 6596.
  "What did the man ask about?": { answer: "Why people do deeds", harder: ["Bukhari 6596: 'if Paradise's people are known, why do people...?'", "Pray", "Ask", "Learn"] },
  "What is made easy for each person?": { answer: "The deeds he was made for", harder: ["Bukhari 6596: everyone will do the deeds he was created for, or that are...?", "Easy for others", "Chosen by his parents", "Hard for him"] },
  "The answer means we should stop doing deeds.": { answer: "False", harder: "By Bukhari 6596, since each person's end is known, we should stop doing deeds." },
  // Sahih Muslim 37a.
  "What does modesty bring?": { answer: "Nothing but good", harder: ["Muslim 37: 'modesty brings...'?", "Calm only", "Some good", "Shyness only"] },
  "Why was Imran upset with the man?": { answer: "He compared the hadith to books", harder: ["Muslim 37: Imran was angry because the man...?", "Doubted the hadith", "Spoke loudly", "Left early"] },
  "What is the Arabic word for modesty?": { answer: "Haya", harder: ["Muslim 37: 'al-haya' brings nothing but good. Haya means...?", "Patience", "Gratitude", "Humility"] },
  // Sahih al-Bukhari 4281.
  "Which surah did the Prophet ﷺ recite at the Conquest?": { answer: "Al-Fath", harder: ["Bukhari 4281: on the day of the Conquest of Makkah he ﷺ recited, in a vibrating voice...?", "An-Nasr", "Al-Isra", "Al-Anfal"] },
  "What was he riding?": { answer: "His she-camel", harder: ["Bukhari 4281: on the day of the Conquest he ﷺ recited Al-Fath riding...?", "A mule", "A horse", "On foot"] },
  "Al-Fath means the victory or opening.": { answer: "True", harder: "By Bukhari 4281, he ﷺ recited Surah Al-Fath on the day Makkah was opened." },
  // Sahih al-Bukhari 624.
  "When is this extra prayer?": { answer: "Between adhan and iqamah", harder: ["Bukhari 624: 'there is a prayer between every two ____.'", "Fajr and Dhuhr", "Two Eids", "Two Fridays"] },
  "How many times did he say it?": { answer: "Three", harder: ["Bukhari 624: how many times did he ﷺ say there is a prayer between every two calls?", "Twice", "Four", "Five"] },
  "This prayer is a must for everyone.": { answer: "False", harder: "By Bukhari 624, the prayer between the two calls is a must for everyone." },
  // Sahih al-Bukhari 4214.
  "What was thrown from the fort?": { answer: "A leather bag of fat", harder: ["Bukhari 4214: besieging Khaybar, someone threw out what?", "A bag of dates", "A water skin", "A spear"] },
  "Why did he stop?": { answer: "He felt shy before the Prophet ﷺ", harder: ["Bukhari 4214: he ran for the bag of fat, turned, and...?", "He was wounded", "Others took it", "He fell down"] },
  "Where did this happen?": { answer: "At Khaybar", harder: ["Bukhari 4214: where was the siege when the bag of fat was thrown?", "At Ta'if", "At Banu Qurayzah", "At Hunayn"] },
  // Sahih al-Bukhari 6220.
  "What kind of throwing did the Prophet ﷺ forbid?": { answer: "Flicking small stones", harder: ["Bukhari 6220: he ﷺ forbade flicking ____ with the fingers.", "Dates", "Arrows", "Sticks"] },
  "What harm can a flicked stone do?": { answer: "Hurt an eye or tooth", harder: ["Bukhari 6220: a flicked stone neither hunts game nor hurts an enemy, but...?", "Wastes time", "Makes noise", "Scares animals"] },
  "Flicking stones is a good way to hunt.": { answer: "False", harder: "By Bukhari 6220, flicking stones is a good way to hunt." },
  // Sahih al-Bukhari 388.
  "What did the Prophet ﷺ wipe over?": { answer: "His leather socks", harder: ["Bukhari 388: after wudu, he ﷺ wiped his wet hands over...?", "His head only", "His feet", "His shoes"] },
  "How did Mughirah help?": { answer: "He poured water", harder: ["Bukhari 388: Mughirah helped the Prophet ﷺ make...?", "Ghusl", "Tayammum", "Food"] },
  "Wiping over khuffs makes wudu easier on journeys.": { answer: "True", harder: "By Bukhari 388, he ﷺ wiped over his leather socks and then prayed." },
  // Sahih al-Bukhari 1043.
  "What did people wrongly think?": { answer: "The eclipse was for Ibrahim", harder: ["Bukhari 1043: the sun eclipsed the day Ibrahim died. People said...?", "It was a sign of war", "It was a punishment", "It was the Hour"] },
  "What should we do at an eclipse?": { answer: "Pray and call on Allah", harder: ["Bukhari 1043: the sun and moon do not eclipse for anyone's death or birth. When you see it...?", "Give charity only", "Recite poetry", "Wait for it to pass"] },
  "The Prophet ﷺ let a wrong belief spread to honor his son.": { answer: "False", harder: "By Bukhari 1043, he ﷺ let people link the eclipse to Ibrahim's death." },
  // Sahih al-Bukhari 2408.
  "Who did Allah forbid us to be undutiful to?": { answer: "Our mothers", harder: ["Bukhari 2408: Allah has forbidden being undutiful to...?", "Fathers", "Neighbours", "Teachers"] },
  "Which of these does Allah dislike?": { answer: "Wasting wealth", harder: ["Bukhari 2408: Allah dislikes idle talk, asking too many questions and...?", "Begging", "Withholding rights", "Burying daughters"] },
  "Idle talk about others is loved by Allah.": { answer: "False", harder: "By Bukhari 2408, Allah loves idle talk and asking many questions." },
  // Sahih al-Bukhari 6471.
  "What happened to his feet?": { answer: "They swelled", harder: ["Bukhari 6471: he ﷺ prayed so long that his feet...?", "Cracked", "Were tired", "Hurt"] },
  "Why did he pray so much?": { answer: "To be a thankful servant", harder: ["Bukhari 6471: 'shall I not be a ____ servant?'", "Patient", "Humble", "Fearing"] },
  "Worship is a way of saying thank you to Allah.": { answer: "True", harder: "By Bukhari 6471, he ﷺ prayed until his feet swelled, to be a thankful servant." },
  // Sahih al-Bukhari 3640.
  "How long will this group remain?": { answer: "Until the Last Day", harder: ["Bukhari 3640: some of his followers will remain victorious on the truth until...?", "The death of the last companion", "Dajjal comes", "A thousand years"] },
  "The truth will one day vanish completely.": { answer: "False", harder: "By Bukhari 3640, the truth will one day vanish with none left on it." },
  "What will the group stay on?": { answer: "The truth", harder: ["Bukhari 3640: what will that group stay victorious on?", "The sword", "The land", "Their tribe"] },
  // Sahih al-Bukhari 7122.
  "What did Mughirah ask about most?": { answer: "Dajjal", harder: ["Bukhari 7122: nobody asked the Prophet ﷺ as much as Mughirah about...?", "The Hour", "Ya'juj and Ma'juj", "The Mahdi"] },
  "What did people say Dajjal would carry?": { answer: "Bread and water", harder: ["Bukhari 7122: people said Dajjal would have mountains of ____ and rivers of ____.", "Gold, milk", "Meat, honey", "Silver, wine"] },
  "Dajjal is honored by Allah.": { answer: "False", harder: "By Bukhari 7122, Dajjal is honoured by Allah." },
  // Sahih al-Bukhari 1386.
  "When did the Prophet ﷺ ask about dreams?": { answer: "After the Fajr prayer", harder: ["Bukhari 1386: when did he ﷺ face the people and ask who had seen a dream?", "After Isha", "After Jumu'ah", "In the evening"] },
  "What did he ask the people?": { answer: "Who saw a dream last night?", harder: ["Bukhari 1386: after Fajr, he ﷺ faced them and asked...?", "Who visited the sick?", "Who fasted today?", "Who gave charity?"] },
  "He faced the people after the prayer.": { answer: "True", harder: "By Bukhari 1386, he ﷺ faced the people after Fajr and asked who had seen a dream." },
  // Sahih al-Bukhari 6096.
  "What sin did the torn-cheek man do?": { answer: "Telling lies", harder: ["Bukhari 6096: the man whose cheek was torn had done what?", "Backbiting", "Breaking promises", "Cheating in trade"] },
  "How far did his lies go?": { answer: "All over the world", harder: ["Bukhari 6096: the torn-cheek man's lies were spread by people how far?", "Only in his city", "To his family", "Across his tribe"] },
  "Spreading lies is a small matter.": { answer: "False", harder: "By Bukhari 6096, spreading lies all over the world is a small matter." },
  // Sahih al-Bukhari 1143.
  "What did the man fail to do?": { answer: "Act on the Quran", harder: ["Bukhari 1143: the man whose head was crushed with a stone had learnt the Quran but...?", "Forgot it", "Sold it", "Hid it"] },
  "What did he sleep through?": { answer: "The obligatory prayers", harder: ["Bukhari 1143: besides not acting on the Quran, he slept through...?", "The night prayer", "The Jumu'ah khutbah", "Ramadan"] },
  "Knowing the Quran is enough without acting.": { answer: "False", harder: "By Bukhari 1143, knowing the Quran is enough without acting on it." },
  // Sahih al-Bukhari 2085.
  "Who was the man in the river?": { answer: "One who ate riba", harder: ["Bukhari 2085: the man in the river, struck with a stone in his mouth, was...?", "A liar", "A murderer", "A cheat in weights"] },
  "What was the river made of?": { answer: "Blood", harder: ["Bukhari 2085: the riba-eater was in a river of what?", "Fire", "Mud", "Boiling water"] },
  "Riba means taking interest on loans.": { answer: "True", harder: "By Bukhari 2085, a stone was thrown into the riba-eater's mouth whenever he tried to come out." },
  // Sahih al-Bukhari 7047.
  "Who sat with the children in the garden?": { answer: "Prophet Ibrahim", harder: ["Bukhari 7047: the old man in the green garden with children around him was...?", "Prophet Adam", "Prophet Musa", "Prophet Isa"] },
  "Who were the children?": { answer: "Children who died on the fitrah", harder: ["Bukhari 7047: the children around Ibrahim were those who...?", "Were orphans", "Were martyrs", "Memorised the Quran"] },
  "Where was this scene?": { answer: "A green garden", harder: ["Bukhari 7047: Ibrahim and the children were seen in...?", "A palace", "A white city", "A tall tree"] },
  // Quran 59:8.
  "What did the Muhajirun leave behind in Makkah?": { answer: "Their homes and wealth", harder: ["Quran 59:8: the poor emigrants were driven from their...?", "Families only", "Tribes and lands", "Markets"] },
  "What does the Quran call the Muhajirun?": { answer: "The truthful", harder: ["Quran 59:8: the poor emigrants who help Allah and His Messenger are...?", "The successful", "The patient", "The grateful"] },
  "A muhajir is someone who emigrates.": { answer: "True", harder: "By Quran 59:8, the emigrants seek Allah's bounty and pleasure." },
  // Quran 9:100.
  "Who is Allah pleased with in Quran 9:100?": { answer: "The first Muhajirun and Ansar", harder: ["Quran 9:100: Allah is pleased with the first forerunners of whom?", "The Muhajirun only", "The people of Badr only", "The Ansar only"] },
  "What has Allah prepared for them?": { answer: "Gardens with rivers", harder: ["Quran 9:100: for the forerunners and those who follow them well, Allah prepared...?", "High palaces", "Shade and fruit", "Spring of Kawthar"] },
  "Quran 9:100 praises the Muhajirun but not the Ansar.": { answer: "False", harder: "By Quran 9:100, Allah praises the Muhajirun but not the Ansar." },
  // Sahih al-Bukhari 1.
  "What decides the reward of a hijrah?": { answer: "The intention behind it", harder: ["Bukhari 1: 'deeds are by...'. What decides the reward of a hijrah?", "The distance", "The hardship", "The people with you"] },
  "Someone who emigrated only to marry gets what?": { answer: "Only what he went for", harder: ["Bukhari 1: one who emigrated for a woman to marry, his hijrah is for...?", "Allah and His Messenger", "Half the reward", "Both worlds"] },
  "Which companion told the hadith that a hijrah is by intention?": { answer: "Umar", harder: ["Bukhari 1: which companion narrated 'deeds are by intentions'?", "Abu Hurairah", "Ibn Abbas", "Aishah"] },
  // Sahih al-Bukhari 10.
  "Who is the true muhajir, says the Prophet ﷺ?": { answer: "One who leaves what Allah forbade", harder: ["Bukhari 10: a muhajir is one who leaves...?", "His home", "Makkah", "His people"] },
  "Who is a true Muslim in the same hadith?": { answer: "One whose tongue and hands harm no one", harder: ["Bukhari 10: a Muslim is one from whose ____ the Muslims are safe.", "Eyes and ears", "Wealth and sword", "Anger"] },
  "You can still be a muhajir today by leaving sins.": { answer: "True", harder: "By Bukhari 10, a muhajir is one who leaves what Allah has forbidden." },
  // Sahih al-Bukhari 3925.
  "Who came to Madinah first, with Ibn Umm Maktum?": { answer: "Mus'ab ibn Umayr", harder: ["Bukhari 3925: the first to come to Madinah, teaching the Quran, were Ibn Umm Maktum and...?", "Abu Bakr", "Bilal", "Ammar"] },
  "What did the first two teach the people of Madinah?": { answer: "The Quran", harder: ["Bukhari 3925: Mus'ab and Ibn Umm Maktum taught the people of Madinah...?", "Prayer times", "Writing", "Hadith"] },
  "Who came after them?": { answer: "Bilal, Sa'd and Ammar", harder: ["Bukhari 3925: after Mus'ab and Ibn Umm Maktum came...?", "Umar with twenty", "The Prophet ﷺ", "Abu Bakr"] },
  // Sahih al-Bukhari 3925.
  "How did Madinah feel when the Prophet ﷺ arrived?": { answer: "Happier than ever", harder: ["Bukhari 3925: Al-Bara never saw Madinah so joyful as when...?", "Badr was won", "Makkah was opened", "Rain came"] },
  "Who called out that the Prophet ﷺ had come?": { answer: "Even the girls", harder: ["Bukhari 3925: who were saying 'the Messenger of Allah has come'?", "Only the elders", "Only the Ansar men", "Only the Jews"] },
  "The Prophet ﷺ reached Madinah before Mus'ab.": { answer: "False", harder: "By Bukhari 3925, the Prophet ﷺ reached Madinah before Mus'ab." },
  // Sahih al-Bukhari 3926.
  "Who fell ill with fever after the hijrah?": { answer: "Abu Bakr and Bilal", harder: ["Bukhari 3926: after arriving in Madinah, who fell ill with fever?", "Abu Bakr and Umar", "Bilal and Ammar", "Aishah and Bilal"] },
  "What did Bilal miss while he was ill?": { answer: "Makkah", harder: ["Bukhari 3926: in his fever, Bilal longed for the valleys of...?", "Ta'if", "Abyssinia", "Khaybar"] },
  "Who visited them and told the Prophet ﷺ?": { answer: "Aishah", harder: ["Bukhari 3926: who told the Prophet ﷺ about Abu Bakr and Bilal's fever?", "Asma", "Umm Ayman", "Umm Salamah"] },
  // Sahih al-Bukhari 3926.
  "What did the Prophet ﷺ ask Allah for Madinah?": { answer: "To make them love it like Makkah, or more", harder: ["Bukhari 3926: 'make us love Madinah as we love ____ or more.'", "Quba", "Jerusalem", "Ta'if"] },
  "What did he ask Allah to take from Madinah?": { answer: "Its fever", harder: ["Bukhari 3926: he ﷺ asked Allah to make Madinah healthy and take away its...?", "Its heat", "Its hunger", "Its enemies"] },
  "He also asked Allah to bless Madinah's food.": { answer: "True", harder: "By Bukhari 3926, he ﷺ asked Allah to bless Madinah's measures." },
  // Sahih al-Bukhari 3780.
  "What did the Prophet ﷺ do for each Muhajir in Madinah?": { answer: "Made him a brother to one of the Ansar", harder: ["Bukhari 3780: on reaching Madinah, each Muhajir was...?", "Given a house", "Given land", "Sent to Quba"] },
  "Who became Abd ar-Rahman ibn Awf's brother?": { answer: "Sa'd ibn ar-Rabi'", harder: ["Bukhari 3780: Abd ar-Rahman ibn Awf was made a brother to...?", "Sa'd ibn Mu'adh", "Sa'd ibn Ubadah", "Usayd ibn Hudayr"] },
  "What did Sa'd offer his new brother?": { answer: "Half his wealth", harder: ["Bukhari 3780: Sa'd ibn ar-Rabi' offered his new brother...?", "A loan", "His garden only", "A camel"] },
  // Sahih al-Bukhari 2048.
  "What did Abd ar-Rahman ask for instead of Sa'd's wealth?": { answer: "The way to the market", harder: ["Bukhari 2048: instead of Sa'd's wealth, Abd ar-Rahman asked to be shown...?", "A farm", "A house", "A well"] },
  "Which market did they show him?": { answer: "The market of Qaynuqa'", harder: ["Bukhari 2048: Abd ar-Rahman was shown which market?", "The market of Madinah", "The market of Ukaz", "The market of Khaybar"] },
  "Abd ar-Rahman came back from the market with nothing.": { answer: "False", harder: "By Bukhari 2048, Abd ar-Rahman came back from the market of Qaynuqa' with nothing." },
  // Quran 59:9.
  "How did the Ansar feel about the Muhajirun?": { answer: "They loved them", harder: ["Quran 59:9: those settled in Madinah ____ those who emigrated to them.", "Pitied", "Tolerated", "Feared"] },
  "Whom did the Ansar put first?": { answer: "The Muhajirun", harder: ["Quran 59:9: the Ansar put whom before themselves, even in need?", "Their families", "Their guests only", "Their leaders"] },
  "The Ansar gave only when they had plenty.": { answer: "False", harder: "By Quran 59:9, the Ansar gave to the emigrants only when they had plenty." },
  // Sahih al-Bukhari 3779.
  "Why was the Prophet ﷺ not counted among the Ansar?": { answer: "Because he made the hijrah", harder: ["Bukhari 3779: 'but for the ____, I would have been one of the Ansar.'", "Because he was from Quraysh", "Because he was the Prophet", "Because he was born in Makkah"] },
  "Whose valley would the Prophet ﷺ take?": { answer: "The Ansar's valley", harder: ["Bukhari 3779: if the Ansar went through a valley, he ﷺ would take...?", "The Muhajirun's valley", "The widest valley", "His own way"] },
  "Abu Hurayrah said the Ansar sheltered and helped him.": { answer: "True", harder: "By Bukhari 3779, Abu Hurayrah said the Ansar sheltered and helped the Prophet ﷺ." },
  // Sahih al-Bukhari 4230, 4231.
  "Where did Ja'far ibn Abi Talib first emigrate to?": { answer: "Abyssinia", harder: ["Bukhari 4230: the 'people of the ship', with Ja'far, had first emigrated to...?", "Yemen", "Syria", "Egypt"] },
  "How many hijrahs did the people of the ship earn?": { answer: "Two", harder: ["Bukhari 4230: Umar and his companions have one hijrah; the people of the ship have...?", "None", "Half", "Three"] },
  "Who asked the Prophet ﷺ about it?": { answer: "Asma bint Umays", harder: ["Bukhari 4230: who told the Prophet ﷺ what Umar had said about the hijrah?", "Umm Habibah", "Hafsah", "Asma bint Abi Bakr"] },
  // Sahih al-Bukhari 1327.
  "Who was the Negus?": { answer: "The king of Abyssinia", harder: ["Bukhari 1327: the Negus, whose funeral he ﷺ prayed from afar, was king of...?", "Yemen", "Persia", "Egypt"] },
  "What did the Prophet ﷺ tell the Muslims to do for him?": { answer: "Ask forgiveness for him", harder: ["Bukhari 1327: on the day the Negus died, he ﷺ said...?", "Pray for rain", "Send his family gifts", "Say nothing"] },
  "How many takbirs did the Prophet ﷺ say in that prayer?": { answer: "Four", harder: ["Bukhari 1327: in the funeral prayer for the Negus, how many takbirs?", "Five", "Three", "Six"] },
  // Sahih al-Bukhari 1276.
  "Where was Mus'ab ibn Umayr martyred?": { answer: "At Uhud", harder: ["Bukhari 1276: Mus'ab ibn Umayr was martyred at...?", "At Mu'tah", "At Khandaq", "At Hunayn"] },
  "What covered Mus'ab's feet?": { answer: "Grass", harder: ["Bukhari 1276: his one cloth covered his head. What was put on his feet?", "Another cloth", "Sand", "Leaves of palm"] },
  "Mus'ab enjoyed his reward in this world before he died.": { answer: "False", harder: "By Bukhari 1276, Mus'ab died with plenty of cloth to cover him." },
  // Sahih al-Bukhari 4782.
  "What did people call Zayd before Quran 33:5?": { answer: "Zayd ibn Muhammad", harder: ["Bukhari 4782: before the ayah 'call them by their fathers', Zayd ibn Harithah was called...?", "Zayd ibn Abd Allah", "Zayd al-Khayr", "Zayd ibn Abi Talib"] },
  "What does Quran 33:5 say to do?": { answer: "Call people by their fathers' names", harder: ["Bukhari 4782: the ayah revealed about Zayd ibn Harithah said...?", "Call them by their mothers", "Call them by their tribes", "Call them by their deeds"] },
  // Sahih al-Bukhari 2783.
  "When did the hijrah from Makkah end?": { answer: "After Makkah was opened", harder: ["Bukhari 2783: 'there is no hijrah after ____'", "The death of the Prophet ﷺ", "Badr", "The treaty of Hudaybiyah"] },
  "What stays after the hijrah ended?": { answer: "Jihad and good intention", harder: ["Bukhari 2783: no hijrah after the conquest, but what remains?", "Hajj and Umrah", "Fasting and zakat", "Charity and prayer"] },
  "Who told the hadith that there is no hijrah after the conquest?": { answer: "Ibn Abbas", harder: ["Bukhari 2783: who narrated 'there is no hijrah after the conquest'?", "Aishah", "Ibn Umar", "Abu Hurairah"] },
  // Sahih al-Bukhari 3045.
  "Who led the ten men?": { answer: "Asim ibn Thabit", harder: ["Bukhari 3045: the ten men sent by the Prophet ﷺ were led by...?", "Khubayb", "Zayd ibn ad-Dathinah", "Abd Allah ibn Tariq"] },
  "How did the enemy find them?": { answer: "By the date stones they left", harder: ["Bukhari 3045: two hundred archers followed the ten by...?", "Their camels' tracks", "Their footprints", "Their water skins"] },
  "Asim asked Allah to tell the Prophet ﷺ their news.": { answer: "True", harder: "By Bukhari 3045, Asim refused to come down under the protection of a disbeliever." },
  // Sahih al-Bukhari 3045.
  "Where was Khubayb held as a prisoner?": { answer: "In Makkah", harder: ["Bukhari 3045: Khubayb was held as a prisoner where, with no fruit at the time?", "Khaybar", "Badr", "Ta'if"] },
  "What did Khubayb say about the little boy?": { answer: "I will never harm him", harder: ["Bukhari 3045: with the boy on his thigh and a razor in hand, Khubayb said...?", "Leave him with me", "Bring me food", "Untie me"] },
  "The boy's mother said she never saw a better prisoner.": { answer: "True", harder: "By Bukhari 3045, the daughter of Al-Harith never saw a prisoner better than Khubayb." },
  // Sahih al-Bukhari 3045.
  "What was Khubayb eating in his chains?": { answer: "Fresh grapes", harder: ["Bukhari 3045: chained in irons in Makkah, Khubayb was eating...?", "Pomegranates", "Figs", "Dates"] },
  "Why was it so strange?": { answer: "Makkah had no fruit then", harder: ["Bukhari 3045: eating grapes in chains was strange because...?", "He had no hands free", "It was winter", "No one fed him"] },
  "The woman called the grapes a gift from Allah.": { answer: "True", harder: "By Bukhari 3045, the woman said the grapes were provision Allah gave to Khubayb." },
  // Sahih al-Bukhari 3045.
  "What did Khubayb ask for before he was killed?": { answer: "To pray two rak'ahs", harder: ["Bukhari 3045: before being killed, Khubayb asked to...?", "Make wudu", "Recite the Quran", "Make a will"] },
  "Why did he keep his prayer short?": { answer: "So they would not think he was afraid", harder: ["Bukhari 3045: Khubayb did not pray longer, fearing they would think...?", "He was stalling", "He was praying against them", "He had lost faith"] },
  "Khubayb began the Sunnah of two rak'ahs before being killed.": { answer: "True", harder: "By Bukhari 3045, Khubayb began the practice of two rak'ahs for a Muslim about to be killed in captivity." },
  // Sahih al-Bukhari 3045.
  "What guarded Asim's body?": { answer: "A swarm of wasps", harder: ["Bukhari 3045: what stopped Quraysh cutting a part of Asim's body?", "A swarm of bees", "A flood", "Heavy rain"] },
  "What did the swarm look like?": { answer: "A shady cloud", harder: ["Bukhari 3045: the wasps hovering over Asim were like...?", "A dark storm", "A thick smoke", "A swarm of locusts"] },
  "Quraysh managed to take a part of Asim's body.": { answer: "False", harder: "By Bukhari 3045, Quraysh managed to cut a part of Asim's body." },
  // Sahih al-Bukhari 5018.
  "Which surah was Usayd reciting at night?": { answer: "Al-Baqarah", harder: ["Bukhari 5018: Usayd was reciting which surah when his horse was startled?", "Al-Imran", "Al-Kahf", "Al-Fath"] },
  "What did the horse do when he recited?": { answer: "It was startled", harder: ["Bukhari 5018: when Usayd stopped reciting, the horse...?", "Was startled", "Ran away", "Neighed"] },
  "Usayd stopped because his son was near the horse.": { answer: "True", harder: "By Bukhari 5018, Usayd stopped reciting because his son Yahya was near the horse." },
  // Sahih al-Bukhari 5018.
  "What did Usayd see in the sky?": { answer: "A cloud like lamps", harder: ["Bukhari 5018: Usayd saw something like a cloud with...?", "Stars", "Birds", "Lightning"] },
  "What was the cloud, he ﷺ said?": { answer: "Angels come to hear him", harder: ["Bukhari 5018: the cloud with lamps was angels who came near for...?", "His prayer", "His son", "His horse"] },
  "If he had kept reciting, people would have seen them at dawn.": { answer: "True", harder: "By Bukhari 5018, had Usayd kept reciting till dawn, people would have seen the angels." },
  // Sahih al-Bukhari 334.
  "Why did the army stop with no water?": { answer: "To look for Aishah's necklace", harder: ["Bukhari 334: the army stopped where there was no water to look for...?", "A lost camel", "Abu Bakr", "A guide"] },
  "What did Allah send down then?": { answer: "The ayah of tayammum", harder: ["Bukhari 334: what ayah came down when they had no water?", "The ayah of wudu with sea water", "The ayah of shortening prayer", "The ayah of travel"] },
  "Usayd said it was not the first blessing from Abu Bakr's family.": { answer: "True", harder: "By Bukhari 334, Usayd told the family of Abu Bakr this was not their first blessing." },
  // Sunan Abi Dawud 5224.
  "What was Usayd doing when he ﷺ poked him with a stick?": { answer: "Joking and making people laugh", harder: ["Abu Dawud 5224: Usayd was poked under the ribs with a stick while he was...?", "Reciting the Quran", "Teaching children", "Making wudu"] },
  "What did Usayd do when he ﷺ raised his shirt?": { answer: "He hugged him and kissed his side", harder: ["Abu Dawud 5224: after asking to take his due, what did Usayd do?", "He poked him back", "He forgave it", "He laughed"] },
  "Usayd said: this is what I wanted, Messenger of Allah ﷺ.": { answer: "True", harder: "By Abu Dawud 5224, Usayd said he wanted to take his due because he ﷺ wore a shirt and he did not." },
  // Quran 49:2.
  "What did Allah tell the believers about their voices?": { answer: "Do not raise them over the Prophet's ﷺ", harder: ["Quran 49:2: believers must not raise their voices above whose voice?", "Raise them only in the masjid", "Lower them only at night", "Speak only in whispers"] },
  "Why was Thabit afraid of the ayah on voices?": { answer: "He had a loud voice", harder: ["Quran 49:2 frightened Thabit ibn Qays. Why?", "He spoke little Arabic", "He had missed Badr", "He lived far from Madinah"] },
  "Raising the voice over the Prophet's ﷺ could ruin deeds.": { answer: "True", harder: "By Quran 49:2, deeds can become worthless while one does not notice." },
  // Sahih al-Bukhari 3613.
  "Who noticed that Thabit was missing?": { answer: "The Prophet ﷺ", harder: ["Bukhari 3613: who noticed Thabit ibn Qays was missing and sent for him?", "Abu Bakr", "Sa'd ibn Mu'adh", "Thabit's son"] },
  "How did the man find Thabit?": { answer: "Sitting sadly with his head down", harder: ["Bukhari 3613: how was Thabit found at home?", "Weeping in prayer", "Packing to leave", "Ill in bed"] },
  "The Prophet ﷺ cared about a companion who went missing.": { answer: "True", harder: "By Bukhari 3613, Thabit feared he was of the people of the Fire for raising his voice." },
  // Sahih al-Bukhari 3613.
  "What good news did Thabit get?": { answer: "He is of the people of Jannah", harder: ["Bukhari 3613: 'you are not from the people of the Fire, but...'?", "A martyr", "Forgiven for small sins", "Safe in the grave"] },
  "Who sent Thabit the good news?": { answer: "The Prophet ﷺ", harder: ["Bukhari 3613: who sent the message 'you are of the people of Paradise' to Thabit?", "Umar", "Jibril", "Sa'd ibn Mu'adh"] },
  "Thabit was told he was of the people of the Fire.": { answer: "False", harder: "By Bukhari 3613, Thabit was told he was of the people of the Fire." },
  // Sahih al-Bukhari 4373.
  "Whom did Thabit answer for the Prophet ﷺ?": { answer: "Musaylimah the liar", harder: ["Bukhari 4373: Thabit ibn Qays was to answer, on his ﷺ behalf, whom?", "Heraclius", "The Christians of Najran", "Banu Tamim"] },
  "What did he ﷺ hold in his hand?": { answer: "A palm stick", harder: ["Bukhari 4373: going to Musaylimah, he ﷺ held a piece of what?", "A sword", "A bow", "A date"] },
  "He ﷺ said he would not give Musaylimah even the stick.": { answer: "True", harder: "By Bukhari 4373, he ﷺ told Musaylimah he would not give him even that piece of stick." },
  // Sahih al-Bukhari 3952.
  "Whose words did Al-Miqdad refuse to repeat?": { answer: "Musa's people", harder: ["Bukhari 3952: 'go you and your Lord and fight' were whose words?", "Isa's disciples", "Ibrahim's people", "Lut's people"] },
  "Where did Al-Miqdad say they would fight?": { answer: "On his right, left, front and back", harder: ["Bukhari 3952: 'we shall fight on your right and your left...' and where else?", "Only in front of you", "Only beside you", "Only where you send us"] },
  "His words made the Prophet's ﷺ face shine with joy.": { answer: "True", harder: "By Bukhari 3952, the Prophet's ﷺ face shone with happiness at Al-Miqdad's words." },
  // Sahih al-Bukhari 4019.
  "What did he ﷺ say about the enemy who said the words of faith?": { answer: "Leave him, his life is protected", harder: ["Bukhari 4019: the one who cut off Al-Miqdad's hand then submitted to Allah. Ruling?", "Kill him for the hand", "Take his wealth", "Imprison him"] },
  "What protected the enemy's life, in Al-Miqdad's question?": { answer: "Saying the words of faith", harder: ["Bukhari 4019: in Al-Miqdad's question, what did the enemy do behind the tree?", "Ran away", "Threw his sword down", "Asked for mercy"] },
  "Al-Miqdad fought at Badr.": { answer: "True", harder: "By Bukhari 4019, the Prophet ﷺ told Al-Miqdad not to kill the man who submitted." },
  // Sahih al-Bukhari 1436.
  "What did Hakim ask the Prophet ﷺ?": { answer: "If his good before Islam counted", harder: ["Bukhari 1436: Hakim asked if he would be rewarded for...?", "Leaving his idols", "Fighting at Badr", "Leading Quraysh"] },
  "What did he ﷺ answer?": { answer: "You became Muslim with all that good", harder: ["Bukhari 1436: about his good deeds before Islam, he ﷺ said...?", "They are lost", "Only charity counts", "Do them twice"] },
  "Hakim kept good ties with his family before Islam.": { answer: "True", harder: "By Bukhari 1436, Hakim gave charity and freed slaves before Islam." },
  // Sahih al-Bukhari 1472.
  "Which hand is better, he ﷺ said?": { answer: "The upper, giving hand", harder: ["Bukhari 1472: he ﷺ told Hakim the upper hand is better than...?", "The empty hand", "The right hand", "The strong hand"] },
  "What did Hakim do after that day?": { answer: "He never took from anyone again", harder: ["Bukhari 1472: after this advice, Hakim never...?", "Gave again", "Traded again", "Left Makkah"] },
  "Wealth taken with greed is blessed.": { answer: "False", harder: "By Bukhari 1472, wealth taken with greed is blessed." },
  // Sahih al-Bukhari 3828.
  "Whose religion did Zayd ibn Amr follow?": { answer: "The religion of Ibrahim", harder: ["Bukhari 3828: leaning against the Ka'bah, Zayd ibn Amr said he alone was on the religion of...?", "Isa", "Musa", "Quraysh"] },
  "Whom did Zayd save?": { answer: "Baby girls", harder: ["Bukhari 3828: Zayd ibn Amr told fathers 'do not kill her, I will feed her'. Who?", "Orphan boys", "Slaves", "Old women"] },
  "Zayd ibn Amr was the father of Sa'id ibn Zayd.": { answer: "True", harder: "By Bukhari 3828, Asma saw Zayd ibn Amr leaning against the Ka'bah speaking to Quraysh." },
  // Sahih al-Bukhari 3826.
  "What meat did Zayd refuse to eat?": { answer: "Meat offered to idols", harder: ["Bukhari 3826: Zayd ibn Amr ate only what was slaughtered...?", "By Muslims", "At home", "For guests"] },
  "Who did Zayd say made the sheep and its grass?": { answer: "Allah", harder: ["Bukhari 3826: who created the sheep, sent water for it and grew its grass?", "Nature", "The tribe", "Hubal"] },
  "Zayd lived before the revelation came to the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 3826, Zayd ibn Amr refused meat slaughtered in the name of idols." },
  // Sahih al-Bukhari 3198.
  "What was Sa'id accused of?": { answer: "Taking a woman's land", harder: ["Bukhari 3198: Arwa claimed Sa'id ibn Zayd had taken...?", "Her water", "Her camel", "Her house"] },
  "What happens to one who takes a span of land unjustly?": { answer: "It is put around his neck from seven earths", harder: ["Bukhari 3198: one who takes a span of land unjustly, on the Day of Resurrection...?", "It is weighed against him", "He carries it on his back", "It burns him"] },
  "Sa'id said he would never take someone's land unjustly.": { answer: "True", harder: "By Bukhari 3198, a span of land taken unjustly is put around the neck down seven earths." },
  // Jami at-Tirmidhi 3795.
  "Whom did he ﷺ name first as an excellent man?": { answer: "Abu Bakr", harder: ["Tirmidhi 3795: 'what an excellent man is...' who first?", "Umar", "Abu Ubaidah", "Mu'adh ibn Jabal"] },
  "How many men named Mu'adh are in his ﷺ list?": { answer: "Two men", harder: ["Tirmidhi 3795: Mu'adh ibn Jabal and Mu'adh ibn Amr. How many Mu'adhs?", "One man", "Three men", "Four men"] },
  "Usaid ibn Hudair was among the men he ﷺ praised.": { answer: "True", harder: "By Tirmidhi 3795, Thabit ibn Qais and Usaid ibn Hudair were named as excellent men." },
  // Jami at-Tirmidhi 3679.
  "What did he ﷺ call Abu Bakr?": { answer: "Allah's Atiq from the Fire", harder: ["Tirmidhi 3679: 'you are Allah's ____ from the Fire.'", "The truthful", "The friend", "The trusted"] },
  "What does Atiq mean in his ﷺ words?": { answer: "One set free", harder: ["Tirmidhi 3679: Abu Bakr was called Atiq, meaning...?", "One who is old", "One who is truthful", "One who is first"] },
  "After that day, people called Abu Bakr Atiq.": { answer: "True", harder: "By Tirmidhi 3679, Aishah narrated how Abu Bakr came to be called Atiq." },
  // Jami at-Tirmidhi 3681.
  "What did he ﷺ ask Allah to honor through one of two men?": { answer: "Islam", harder: ["Tirmidhi 3681: 'O Allah, honor ____ through the dearer of these two men.'", "The Muslims", "Madinah", "Banu Hashim"] },
  "Who was named with Umar in the du'a?": { answer: "Abu Jahl ibn Hisham", harder: ["Tirmidhi 3681: the du'a named Umar and...?", "Al-Walid ibn al-Mughirah", "Umayyah ibn Khalaf", "Abu Sufyan"] },
  "Of the two men, Umar was the dearer to Allah.": { answer: "True", harder: "By Tirmidhi 3681, the du'a asked Allah to honor Islam through Abu Jahl or Umar." },
  // Jami at-Tirmidhi 3738.
  "What did he ﷺ wear at Uhud?": { answer: "Two coats of armor", harder: ["Tirmidhi 3738: at Uhud he ﷺ could not climb the rock while wearing...?", "A heavy shield", "A wound", "One coat of armor"] },
  "How did Talhah help him ﷺ onto the rock?": { answer: "He crouched and lifted him", harder: ["Tirmidhi 3738: Talhah helped him ﷺ onto the large rock how?", "He pulled his hand", "He made steps", "He carried his armor"] },
  "He ﷺ said Paradise is due for Talhah.": { answer: "True", harder: "By Tirmidhi 3738, Az-Zubayr narrated that Talhah lifted him ﷺ onto the rock at Uhud." },
  // Jami at-Tirmidhi 3854.
  "Whom did he ﷺ name among these humble people?": { answer: "Al-Bara ibn Malik", harder: ["Tirmidhi 3854: 'messy hair, covered in dust... if he swears by Allah, Allah fulfils it.' Who was named?", "Anas ibn Malik", "Abu Dharr", "Salman"] },
  "What happens when such a humble person swears by Allah?": { answer: "Allah fulfils it", harder: ["Tirmidhi 3854: the humble one with two cloths whom no one cares about, if he swears by Allah...?", "Allah forgives him", "People listen", "He is rich"] },
  "No one paid much mind to these dusty, humble people.": { answer: "True", harder: "By Tirmidhi 3854, Al-Bara ibn Malik was among the dusty humble ones whose oath Allah fulfils." },
  // Jami at-Tirmidhi 3805.
  "Which two did he ﷺ say to follow after him?": { answer: "Abu Bakr and Umar", harder: ["Tirmidhi 3805: 'follow the two after me from my Companions'. Which two?", "Uthman and Ali", "Ibn Mas'ud and Ammar", "Abu Bakr and Ali"] },
  "Whose guidance did he ﷺ tell them to act on?": { answer: "Ammar ibn Yasir", harder: ["Tirmidhi 3805: 'act on the guidance of...' whom?", "Ibn Mas'ud", "Mu'adh ibn Jabal", "Abu Ubaidah"] },
  "He ﷺ told them to hold fast to Ibn Mas'ud's advice.": { answer: "True", harder: "By Tirmidhi 3805, he ﷺ said to act on the guidance of Ammar." },
  // Sahih al-Bukhari 2824.
  "What did As-Sa'ib hear Talhah talk about?": { answer: "The day of Uhud", harder: ["Bukhari 2824: the only thing As-Sa'ib heard Talhah narrate was about...?", "The Hijrah", "The conquest of Makkah", "The farewell Hajj"] },
  "What did As-Sa'ib hear the other three narrate from him ﷺ?": { answer: "Nothing at all", harder: ["Bukhari 2824: from Sa'd, Al-Miqdad and Abdur-Rahman, As-Sa'ib heard what narrated?", "Only about Badr", "Many hadith", "Only about Uhud"] },
  "As-Sa'ib kept company with Abdur-Rahman ibn Awf.": { answer: "True", harder: "By Bukhari 2824, As-Sa'ib heard nothing narrated from Sa'd, Al-Miqdad or Abdur-Rahman." },
  // Sunan Ibn Majah 23.
  "How often did Amr ibn Maimun visit Ibn Mas'ud?": { answer: "Every Thursday", harder: ["Ibn Majah 23: on which evening did Amr ibn Maimun visit Ibn Mas'ud?", "Every Monday", "Every Friday", "Every Sunday"] },
  "What did Ibn Mas'ud add after quoting him ﷺ?": { answer: "Or close to that, or similar", harder: ["Ibn Majah 23: after quoting him ﷺ, Ibn Mas'ud added...?", "Exactly as I said", "I am certain", "I heard it twice"] },
  "Ibn Mas'ud's eyes filled with tears when he quoted him ﷺ.": { answer: "True", harder: "By Ibn Majah 23, Ibn Mas'ud lowered his head and his veins swelled when he quoted him ﷺ." },
  // Sunan Ibn Majah 24.
  "What would Anas say after narrating a hadith?": { answer: "Or as he ﷺ said", harder: ["Ibn Majah 24: after each hadith, Anas would add...?", "I am sure of it", "I heard it myself", "Allah knows best"] },
  "When would Anas add: or as he ﷺ said?": { answer: "Whenever he finished a hadith", harder: ["Ibn Majah 24: Muhammad ibn Sirin said Anas added 'or as he ﷺ said' when?", "Only for long hadith", "Only when unsure", "Only to students"] },
  "Anas was careful when he passed on the words of the Messenger ﷺ.": { answer: "True", harder: "By Ibn Majah 24, Muhammad ibn Sirin reported how Anas finished each hadith." },
  // Sunan Ibn Majah 25.
  "Why did Zaid ibn Arqam hold back from narrating?": { answer: "He had grown old and forgotten", harder: ["Ibn Majah 25: why did Zaid ibn Arqam hold back?", "He was busy", "He was ill", "He was afraid of rulers"] },
  "What is narrating his ﷺ words, Zaid ibn Arqam said?": { answer: "Something difficult", harder: ["Ibn Majah 25: narrating from the Messenger ﷺ is, Zaid said...?", "A light matter", "Only for scholars", "Something to avoid"] },
  "Zaid ibn Arqam said narrating his ﷺ words is easy.": { answer: "False", harder: "By Ibn Majah 25, Zaid ibn Arqam called narrating from him ﷺ an easy matter." },
  // Sunan Ibn Majah 20.
  "When did Ali say to think the best of him ﷺ?": { answer: "When he narrated a hadith to them", harder: ["Ibn Majah 20: 'think of him in the best way' — when?", "When you pray", "When you hear the adhan", "When you visit his grave"] },
  "What does taqwa mean?": { answer: "Being mindful of Allah always", harder: ["Ibn Majah 20: Ali said he ﷺ had the most taqwa. Taqwa means...?", "Being patient", "Being generous", "Being brave"] },
  "Ali said he ﷺ was the most rightly guided.": { answer: "True", harder: "By Ibn Majah 20, Ali said he ﷺ was the most rightly guided and had the most taqwa." },
  // Sunan Ibn Majah 27.
  "How did they keep his ﷺ hadith, Ibn Abbas said?": { answer: "By memorizing them", harder: ["Ibn Majah 27: 'we used to ____ hadith', Ibn Abbas said.", "Write", "Sing", "Read"] },
  "Whose hadith did Ibn Abbas say cannot be trusted?": { answer: "Those who are careless in narrating", harder: ["Ibn Majah 27: Ibn Abbas said there is no way to trust the hadith of those who...?", "Are young", "Live far away", "Narrate briefly"] },
  "Ibn Abbas said careless narrating can be trusted.": { answer: "False", harder: "By Ibn Majah 27, Ibn Abbas said careless narrating can be trusted." },
  // Jami at-Tirmidhi 3840.
  "What little pet did Abu Hurairah have?": { answer: "A kitten", harder: ["Tirmidhi 3840: Abu Hurairah got his name from what small pet?", "A lamb", "A bird", "A goat kid"] },
  "Where did he put the kitten at night?": { answer: "In a tree", harder: ["Tirmidhi 3840: at night Abu Hurairah put his kitten where?", "In a basket", "In his sleeve", "With the sheep"] },
  "Abu Hurairah got his name because of a small kitten.": { answer: "True", harder: "By Tirmidhi 3840, Abu Hurairah played with his kitten by day while tending sheep." },
  // Sahih Muslim 2513.
  "Why did Jarir serve Anas on the journey?": { answer: "He saw how the Ansar honored him ﷺ", harder: ["Muslim 2513: Jarir served Anas on the journey because...?", "Anas was a guest", "Anas was ill", "Anas was a leader"] },
  "What did Anas first tell Jarir?": { answer: "Do not do that", harder: ["Muslim 2513: when Jarir began to serve him, Anas said...?", "Thank you", "Serve the others too", "Only today"] },
  "Jarir swore to serve any of the Ansar he traveled with.": { answer: "True", harder: "By Muslim 2513, Jarir, though older than Anas, served him on the journey." },
  // Jami at-Tirmidhi 3629.
  "What did he ﷺ do for Abu Zayd ibn Akhtab?": { answer: "Wiped his face and made du'a", harder: ["Tirmidhi 3629: he ﷺ wiped his hand over Abu Zayd's face and...?", "Gave him water", "Named him", "Gave him dates"] },
  "What was his hair like in old age, Azrah said?": { answer: "Only a few gray hairs", harder: ["Tirmidhi 3629: at one hundred and twenty, Abu Zayd had...?", "No hair", "White hair", "A white beard"] },
  "He ﷺ made du'a for Abu Zayd ibn Akhtab.": { answer: "True", harder: "By Tirmidhi 3629, Abu Zayd ibn Akhtab lived to one hundred and twenty." },
  // Jami at-Tirmidhi 3749.
  "What did Aishah ask Allah to give Abdur-Rahman ibn Awf?": { answer: "A drink from Salsabil", harder: ["Tirmidhi 3749: Aishah prayed that Abdur-Rahman ibn Awf be given a drink from...?", "Al-Kawthar", "Zamzam", "Tasnim"] },
  "What is Salsabil?": { answer: "A spring in Paradise", harder: ["Tirmidhi 3749: 'a drink from Salsabil'. Salsabil is...?", "A river in Iraq", "A well in Makkah", "A cup in Paradise"] },
  "Abdur-Rahman ibn Awf kept up ties with the Mothers of the Believers.": { answer: "True", harder: "By Tirmidhi 3749, he ﷺ told his wives only the patient will be patient with them." },
  // Sahih al-Bukhari 3992.
  "Who came to ask him ﷺ about the people of Badr?": { answer: "Jibril", harder: ["Bukhari 3992: who asked 'how do you count the people of Badr among you?'", "Mikail", "Israfil", "A companion"] },
  "How did he ﷺ count the Muslims who fought at Badr?": { answer: "Among the best of the Muslims", harder: ["Bukhari 3992: he ﷺ counted the people of Badr as...?", "Equal to all others", "Among the first Muslims", "Among the martyrs"] },
  "Jibril said the angels at Badr are also among the best.": { answer: "True", harder: "By Bukhari 3992, Jibril said the angels at Badr are also among the best." },
  // Sahih Muslim 2531.
  "What did he ﷺ say the stars are for the sky?": { answer: "A source of safety", harder: ["Muslim 2531: 'the stars are a ____ for the sky.'", "A decoration", "A light", "A guide"] },
  "Which prayer did they wait to pray with him ﷺ?": { answer: "Isha", harder: ["Muslim 2531: after Maghrib, they sat to pray which prayer with him ﷺ?", "Witr", "Tahajjud", "Duha"] },
  "He ﷺ said his Companions are a safety for the Ummah.": { answer: "True", harder: "By Muslim 2531, he ﷺ said 'you have done well' to those who waited for Isha." },
  // Sahih al-Bukhari 3595.
  "Where did the lady in the howdah travel from?": { answer: "Al-Hirah", harder: ["Bukhari 3595: the lady in the howdah would travel to the Ka'bah from...?", "Yemen", "Syria", "Basra"] },
  "What did Adi say he helped to open?": { answer: "The treasures of Khosrau", harder: ["Bukhari 3595: Adi lived to see the lady travel and helped open...?", "The treasures of Caesar", "The gates of Persia", "The treasures of Yemen"] },
  "The lady went round the Ka'bah fearing no one but Allah.": { answer: "True", harder: "By Bukhari 3595, he ﷺ told Adi he would see a lady travel from al-Hirah fearing no one but Allah." },
  // Sahih al-Bukhari 4394.
  "How did Umar call the men of the delegation?": { answer: "One by one, by name", harder: ["Bukhari 4394: how did Umar call the men of Adi's delegation?", "By their tribes", "By their fathers", "By their age"] },
  "What did Umar say Adi did when the others broke their promises?": { answer: "He kept his promises", harder: ["Bukhari 4394: Umar said Adi did what when others broke their promises?", "He fought them", "He left them", "He forgave them"] },
  "Umar said Adi accepted Islam when others disbelieved.": { answer: "True", harder: "By Bukhari 4394, Umar said Adi came when the others turned away." },
  // Sahih al-Bukhari 2868.
  "Where did the horses not made lean race to?": { answer: "The masjid of Bani Zurayq", harder: ["Bukhari 2868: horses not made lean raced from Thaniyah to...?", "Thaniyat al-Wada'", "Al-Hafya'", "Quba"] },
  "Who said he took part in that horse race?": { answer: "Abdullah ibn Umar", harder: ["Bukhari 2868: who said he took part in the horse race?", "Usamah ibn Zayd", "Anas ibn Malik", "Zayd ibn Thabit"] },
  "He ﷺ held a race between horses.": { answer: "True", harder: "By Bukhari 2868, horses made lean raced from al-Hafya' to Thaniyat al-Wada'." },
  // Sunan Ibn Majah 3443.
  "What was in front of him ﷺ when Suhaib came?": { answer: "Bread and dates", harder: ["Ibn Majah 3443: when Suhaib came, what was in front of him ﷺ?", "Bread and milk", "Dates and water", "Meat and bread"] },
  "Why did he ﷺ ask Suhaib about eating dates?": { answer: "His eye was sore", harder: ["Ibn Majah 3443: why was eating dates questioned?", "His stomach hurt", "He was fasting", "He was ill with fever"] },
  "The Messenger of Allah ﷺ smiled at what Suhaib said.": { answer: "True", harder: "By Ibn Majah 3443, Suhaib said he was chewing on the other side." },
  // Sahih Muslim 2544.
  "Which people did he ﷺ say would not have beaten the man?": { answer: "The people of Oman", harder: ["Muslim 2544: 'if you had gone to the people of ____, they would not have beaten you.'", "Yemen", "Bahrain", "Najran"] },
  "What had the tribe done to the man he ﷺ sent?": { answer: "Insulted him and beat him", harder: ["Muslim 2544: the tribe he ﷺ sent the man to did what to him?", "Refused him and sent him away", "Insulted him only", "Beat him only"] },
  "He ﷺ answered the man by praising the people of Oman.": { answer: "True", harder: "By Muslim 2544, the man sent to a tribe was insulted and beaten." },
  // Sahih al-Bukhari 4194.
  "What did Salamah do so Madinah would hear him?": { answer: "Cried out loudly", harder: ["Bukhari 4194: before Fajr, Salamah cried out three times. What did he cry?", "Allahu Akbar", "O Ansar", "Help, help"] },
  "Where did Salamah sit on the ride back to Madinah?": { answer: "Behind him ﷺ on his camel", harder: ["Bukhari 4194: after winning back the camels, Salamah rode back to Madinah where?", "Alone ahead", "Beside Abu Bakr", "On the raiders' horse"] },
  "He ﷺ told Salamah to forgive the raiders.": { answer: "True", harder: "By Bukhari 4194, Salamah won back the camels by running after the raiders and shooting arrows." },
  // Sahih al-Bukhari 7208.
  "Where did they give the pledge to him ﷺ?": { answer: "Under the tree", harder: ["Bukhari 7208: Salamah gave the pledge to him ﷺ a second time. Where?", "At Mina", "At Badr", "In the masjid"] },
  "What is an oath of allegiance?": { answer: "A pledge to be loyal", harder: ["Bukhari 7208: the pledge they gave under the tree was...?", "A treaty with Quraysh", "A promise of trade", "A wedding vow"] },
  "Salamah gave the pledge more than once.": { answer: "True", harder: "By Bukhari 7208, he ﷺ asked Salamah to give the pledge again after he had already given it." },
  // Sahih al-Bukhari 502.
  "Why did Salamah pray by that pillar?": { answer: "To follow the Sunnah", harder: ["Bukhari 502: Salamah always sought to pray by the pillar near the Quran copies because...?", "It was near his home", "It was cool", "It was in front"] },
  "What did Yazid call Salamah?": { answer: "Abu Muslim", harder: ["Bukhari 502: how did Yazid ibn Abi Ubayd address Salamah?", "Abu Iyas", "Abu Abd Allah", "Abu Salamah"] },
  "Salamah followed even the place where he ﷺ used to pray.": { answer: "True", harder: "By Bukhari 502, the pillar Salamah sought was near where the copies of the Quran were kept." },
  // Sunan Abi Dawud 632.
  "What did Salamah often go out for?": { answer: "Hunting", harder: ["Abu Dawud 632: Salamah asked about praying in a single shirt because he often went...?", "Travelling", "To war", "To the market"] },
  "If nothing else, what did he ﷺ say could fasten the shirt?": { answer: "A thorn", harder: ["Abu Dawud 632: 'yes, but fasten it, even if only with...'?", "A string", "A pin", "A knot"] },
  "He ﷺ let Salamah pray in a single shirt.": { answer: "True", harder: "By Abu Dawud 632, Salamah was told to fasten his single shirt even with a thorn." },
  // Sunan Abi Dawud 5037.
  "What did he ﷺ say to the man after his first sneeze?": { answer: "May Allah have mercy on you", harder: ["Abu Dawud 5037: after the man's first sneeze, he ﷺ said...?", "Praise be to Allah", "May Allah guide you", "Bless you"] },
  "What did he ﷺ say when the man sneezed again?": { answer: "The man has a cold", harder: ["Abu Dawud 5037: when the man sneezed again, he ﷺ said...?", "May Allah have mercy on you", "May Allah heal you", "Say Alhamdulillah"] },
  "He ﷺ made du'a for the man the first time he sneezed.": { answer: "True", harder: "By Abu Dawud 5037, after the second sneeze he ﷺ said the man has a cold." },
  // Sahih al-Bukhari 2289.
  "Who offered to pay the dead man's debt?": { answer: "Abu Qatadah", harder: ["Bukhari 2289: the third man owed three dinars. Who took on his debt?", "Abu Bakr", "Ali", "Abd ar-Rahman ibn Awf"] },
  "What did Abu Qatadah ask him ﷺ to do?": { answer: "Lead the funeral prayer", harder: ["Bukhari 2289: having taken on the debt, Abu Qatadah asked him ﷺ to...?", "Forgive the debt", "Ask the family", "Pay from the treasury"] },
  "He ﷺ led the prayer once the debt was taken on.": { answer: "True", harder: "By Bukhari 2289, he ﷺ prayed over the man with no debt and the man who left three dinars." },
  // Sahih al-Bukhari 3776.
  "Who gave the Ansar their name, Anas said?": { answer: "Allah", harder: ["Bukhari 3776: 'did you call yourselves Ansar, or...?' Anas said the name came from...?", "Their fathers", "The Prophet ﷺ", "Their tribes"] },
  "What did Anas tell his visitors about?": { answer: "The deeds of the Ansar", harder: ["Bukhari 3776: Ghaylan's group visited Anas, who told them of...?", "The battles of Iraq", "The life of Umar", "The kings of Yemen"] },
  "The Ansar chose that name for themselves.": { answer: "False", harder: "By Bukhari 3776, the Ansar chose that name for themselves." },
  // Sahih al-Bukhari 3787.
  "What did the Ansar ask him ﷺ to pray for?": { answer: "That their followers count as Ansar", harder: ["Bukhari 3787: the Ansar asked him ﷺ to pray that...?", "They stay in Madinah", "Their children be rich", "Their enemies leave"] },
  "What did the Ansar say every prophet has?": { answer: "His own followers", harder: ["Bukhari 3787: 'every prophet has his...', the Ansar said.", "Own land", "Own book", "Own city"] },
  "He ﷺ made the du'a that the Ansar asked for.": { answer: "True", harder: "By Bukhari 3787, Zayd ibn Arqam narrated that the Ansar asked for their followers to count as them." },
  // Sahih al-Bukhari 4906.
  "With the Ansar, whom else did he ﷺ ask Allah to forgive?": { answer: "The children of the Ansar", harder: ["Bukhari 4906: 'O Allah, forgive the Ansar and...?'", "The Muhajirun", "Their wives", "Their elders"] },
  "What did Zayd ibn Arqam do when he heard of Anas's grief?": { answer: "He wrote him a letter", harder: ["Bukhari 4906: Anas grieved over the Ansar who were killed. Zayd ibn Arqam...?", "Prayed with him", "Told him in person", "Sent a messenger"] },
  "Zayd ibn Arqam heard this du'a from him ﷺ himself.": { answer: "True", harder: "By Bukhari 4906, Zayd ibn Arqam wrote to Anas because of his great grief." },
  // Sahih al-Bukhari 3777.
  "Which two tribes fought on the day of Bu'ath?": { answer: "The Aws and the Khazraj", harder: ["Bukhari 3777: the day of Bu'ath was fighting between which two tribes of the Ansar?", "Banu Qaynuqa' and Banu Nadir", "Banu Salamah and Banu Najjar", "Quraysh and the Aws"] },
  "Why did Allah bring that day about, Aishah said?": { answer: "So the Ansar would enter Islam", harder: ["Bukhari 3777: Allah brought about Bu'ath for the good of His Messenger ﷺ, so that...?", "The Aws would win", "Their chiefs would rule", "The Jews would leave"] },
  "The day of Bu'ath came before he ﷺ reached Madinah.": { answer: "True", harder: "By Bukhari 3777, the Ansar's chiefs had been killed or wounded when he ﷺ came to Madinah." },
  // Sahih al-Bukhari 3800.
  "What did he ﷺ say the Ansar would become like?": { answer: "Salt in a meal", harder: ["Bukhari 3800: the people will grow in number and the Ansar will grow fewer until they are like...?", "Stars in the day", "A drop in the sea", "A grain in a field"] },
  "Where did he ﷺ sit to say it, in his last illness?": { answer: "On the minbar", harder: ["Bukhari 3800: wrapped in a sheet with an oily cloth on his head, he ﷺ sat where?", "In Aishah's room", "In the Suffah", "On the threshold"] },
  "He ﷺ said the Ansar would grow fewer while people grew many.": { answer: "True", harder: "By Bukhari 3800, he ﷺ spoke about the Ansar in his last illness." },
  // Sahih al-Bukhari 1791.
  "They shielded him ﷺ from the people of which city?": { answer: "Makkah", harder: ["Bukhari 1791: in Umrah, they shielded him ﷺ from whom, lest an arrow hit him?", "The Bedouins", "The hypocrites", "The Romans"] },
  "After the tawaf, where did they go with him ﷺ?": { answer: "To As-Safa and Al-Marwah", harder: ["Bukhari 1791: after the tawaf, he ﷺ came to...?", "Zamzam", "The Maqam of Ibrahim", "Mina"] },
  "Ibn Abi Awfa made Umrah along with him ﷺ.": { answer: "True", harder: "By Bukhari 1791, they shielded him ﷺ from the people of Makkah during Umrah." },
  // Sahih al-Bukhari 4314.
  "Where was the healed blow that Isma'il saw?": { answer: "On his hand", harder: ["Bukhari 4314: Isma'il saw the mark of a healed blow on Ibn Abi Awfa's...?", "Arm", "Head", "Chest"] },
  "In which battle did Ibn Abi Awfa get that blow?": { answer: "Hunayn", harder: ["Bukhari 4314: Ibn Abi Awfa got the healed blow on his hand at...?", "Khaybar", "The Trench", "Mu'tah"] },
  "Hunayn was the very first battle Ibn Abi Awfa fought in.": { answer: "False", harder: "By Bukhari 4314, Hunayn was the first battle Ibn Abi Awfa fought in." },
  // Sahih al-Bukhari 5495.
  "What did Ibn Abi Awfa say they ate on those campaigns?": { answer: "Locusts", harder: ["Bukhari 5495: on six or seven campaigns with him ﷺ, they ate...?", "Lizards", "Fish", "Dates only"] },
  "What is a ghazwah?": { answer: "A campaign he ﷺ went on", harder: ["Bukhari 5495: ghazwah, as in 'six or seven ghazwahs', means...?", "A raid by others", "A night prayer", "A long fast"] },
  "Ibn Abi Awfa went out on campaigns with him ﷺ.": { answer: "True", harder: "By Bukhari 5495, Ibn Abi Awfa went out with him ﷺ on six or seven campaigns." },
  // Sahih al-Bukhari 6194.
  "What did Isma'il ask Ibn Abi Awfa?": { answer: "If he had seen Ibrahim", harder: ["Bukhari 6194: Isma'il asked Ibn Abi Awfa if he had seen whom?", "Al-Qasim", "Abd Allah", "Al-Hasan"] },
  "At what age did Ibrahim die, Ibn Abi Awfa said?": { answer: "As a little child", harder: ["Bukhari 6194: Ibrahim, son of the Prophet ﷺ, died...?", "At seven years", "After Badr", "Before Islam"] },
  "Ibn Abi Awfa said there is no prophet after him ﷺ.": { answer: "True", harder: "By Bukhari 6194, Ibn Abi Awfa said had there been a prophet after Muhammad ﷺ, Ibrahim would have lived." },
  // Sunan an-Nasa'i 1414.
  "Whom would he ﷺ walk with, to see to their needs?": { answer: "A widow or a poor person", harder: ["Nasa'i 1414: he ﷺ did not hold back from walking with whom, to see to their needs?", "An orphan or a slave", "A guest or a traveller", "An old man or a child"] },
  "What did he ﷺ do a great deal of, Ibn Abi Awfa said?": { answer: "Making dhikr", harder: ["Nasa'i 1414: Ibn Abi Awfa said he ﷺ remembered Allah a great deal and...?", "Fasted every day", "Slept little", "Prayed at night"] },
  "He ﷺ made the prayer long and the khutbah short.": { answer: "True", harder: "By Nasa'i 1414, he ﷺ spoke little idle talk and remembered Allah a great deal." },
  // Siyar A'lam an-Nubala 3/203.
  "Who was the father of Abdullah ibn Umar?": { answer: "Umar ibn al-Khattab", harder: ["Siyar 3/203: Abdullah ibn Umar was the son of...?", "Zayd ibn al-Khattab", "Al-Khattab ibn Nufayl", "Uthman ibn Affan"] },
  "Who was the mother of Abdullah ibn Umar?": { answer: "Zaynab bint Maz'un", harder: ["Lineage: the mother of Abdullah ibn Umar was...?", "Hafsah bint Umar", "Jamilah bint Thabit", "Umm Kulthum bint Ali"] },
  "Which tribe was Abdullah ibn Umar from?": { answer: "Quraysh", harder: ["Siyar 3/203: Abdullah ibn Umar, son of Umar ibn al-Khattab, was of...?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Tabaqat Ibn Sa'd 4/96.
  "Who was the father of 'Ayyash ibn Abi Rabi'ah?": { answer: "Abu Rabi'ah ibn al-Mughirah", harder: ["Tabaqat 4/96: 'Ayyash, of Banu Makhzum, was the son of...?", "Al-Walid ibn al-Mughirah", "Hisham ibn al-Mughirah", "Abu Umayyah ibn al-Mughirah"] },
  "Who was the mother of 'Ayyash ibn Abi Rabi'ah?": { answer: "Asma bint Mukharribah", harder: ["Lineage: the mother of 'Ayyash ibn Abi Rabi'ah was...?", "Hind bint Utbah", "Fatimah bint al-Walid", "Umm Salamah"] },
  "Which tribe was 'Ayyash ibn Abi Rabi'ah from?": { answer: "Quraysh", harder: ["Tabaqat 4/96: 'Ayyash, of Banu Makhzum, was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 1634.
  "Who was the mother of Abbas ibn Abd al-Muttalib?": { answer: "Natilah bint Janab", harder: ["Lineage: the mother of Al-Abbas ibn Abd al-Muttalib was...?", "Fatimah bint Amr", "Halah bint Wuhayb", "Lubabah bint al-Harith"] },
  "Which tribe was Abbas ibn Abd al-Muttalib from?": { answer: "Quraysh", harder: ["Bukhari 1634: Al-Abbas, who gave pilgrims water, was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 113.
  "Which tribe was Abdullah ibn Amr ibn al-As from?": { answer: "Quraysh", harder: ["Lineage: Abdullah ibn Amr ibn al-As was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Abdullah ibn Amr ibn al-As belong to?": { answer: "Banu Sahm", harder: ["Lineage: Abdullah ibn Amr ibn al-As was of which clan of Quraysh?", "Banu Makhzum", "Banu Jumah", "Banu Adi"] },
  // Sahih al-Bukhari 1351.
  "Which tribe was Abdullah ibn Amr ibn Haram from?": { answer: "Khazraj", harder: ["Lineage: Abdullah ibn Amr ibn Haram, Jabir's father, was of which tribe?", "Aws", "Ghifar", "Juhaynah"] },
  "Which clan did Abdullah ibn Amr ibn Haram belong to?": { answer: "Banu Salamah", harder: ["Lineage: Jabir's father, Abdullah ibn Amr ibn Haram, was of which clan of the Khazraj?", "Banu an-Najjar", "Banu Sa'idah", "Banu al-Harith"] },
  "Where did Abdullah ibn Amr ibn Haram pass away?": { answer: "Mount Uhud", harder: ["Bukhari 1351: Jabir's father said he would be among the first martyred. Where?", "Badr", "Khaybar", "Mu'tah"] },
  // Tabaqat Ibn Sa'd 3/65.
  "Who was the father of Abdullah ibn Jahsh?": { answer: "Jahsh ibn Riyab", harder: ["Tabaqat 3/65: Abdullah ibn Jahsh was the son of...?", "Abd al-Muttalib", "Umayyah ibn Khalaf", "Jubayr ibn Mut'im"] },
  "Who was the mother of Abdullah ibn Jahsh?": { answer: "Umaymah bint Abd al-Muttalib", harder: ["Tabaqat 3/65: Abdullah ibn Jahsh's mother, an aunt of the Prophet ﷺ, was...?", "Safiyyah bint Abd al-Muttalib", "Arwa bint Abd al-Muttalib", "Atikah bint Abd al-Muttalib"] },
  // Sahih al-Bukhari 3039.
  "Who was the father of Abdullah ibn Jubayr?": { answer: "Jubayr ibn an-Nu'man", harder: ["Lineage: Abdullah ibn Jubayr, leader of the archers at Uhud, was the son of...?", "Jubayr ibn Mut'im", "An-Nu'man ibn Bashir", "Jubayr ibn Hayyah"] },
  "Which tribe was Abdullah ibn Jubayr from?": { answer: "Aws", harder: ["Lineage: Abdullah ibn Jubayr of the archers at Uhud was of which tribe?", "Khazraj", "Quraysh", "Juhaynah"] },
  "Which clan did Abdullah ibn Jubayr belong to?": { answer: "Banu Amr ibn Awf", harder: ["Lineage: Abdullah ibn Jubayr was of which clan of the Aws?", "Banu Abd al-Ashhal", "Banu Salamah", "Banu an-Najjar"] },
  // Sahih al-Bukhari 4261.
  "Who was the father of Abdullah ibn Rawahah?": { answer: "Rawahah ibn Tha'labah", harder: ["Lineage: Abdullah ibn Rawahah, third commander at Mu'tah, was the son of...?", "Tha'labah ibn Amr", "Amr ibn Haram", "Qays ibn Shammas"] },
  "Which tribe was Abdullah ibn Rawahah from?": { answer: "Khazraj", harder: ["Lineage: Abdullah ibn Rawahah was of which tribe?", "Aws", "Thaqif", "Juhaynah"] },
  "Where was Abdullah ibn Rawahah born?": { answer: "Madinah", harder: ["Lineage: Abdullah ibn Rawahah of the Khazraj was born in...?", "Makkah", "Ta'if", "Khaybar"] },
  // Siyar A'lam an-Nubala 3/363.
  "Who was the father of Abdullah ibn az-Zubayr?": { answer: "Az-Zubayr ibn al-Awwam", harder: ["Siyar 3/363: Abdullah ibn az-Zubayr was the son of...?", "Talhah ibn Ubaydullah", "Abu Bakr as-Siddiq", "Al-Awwam ibn Khuwaylid"] },
  "Who was the mother of Abdullah ibn az-Zubayr?": { answer: "Asma bint Abi Bakr", harder: ["Siyar 3/363: the mother of Abdullah ibn az-Zubayr was...?", "Aishah bint Abi Bakr", "Safiyyah bint Abd al-Muttalib", "Umm Ruman"] },
  "Which tribe was Abdullah ibn az-Zubayr from?": { answer: "Quraysh", harder: ["Siyar 3/363: Abdullah ibn az-Zubayr was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Siyar A'lam an-Nubala 1/330.
  "Who was the father of Abu al-As ibn ar-Rabi'?": { answer: "Ar-Rabi' ibn Abd al-Uzza", harder: ["Siyar 1/330: Abu al-As, husband of Zaynab, was the son of...?", "Abd al-Uzza ibn Abd Shams", "Al-Awwam ibn Khuwaylid", "Harb ibn Umayyah"] },
  "Who was the mother of Abu al-As ibn ar-Rabi'?": { answer: "Halah bint Khuwaylid", harder: ["Lineage: the mother of Abu al-As ibn ar-Rabi' was...?", "Khadijah bint Khuwaylid", "Fatimah bint Za'idah", "Zaynab bint Muhammad"] },
  "Which tribe was Abu al-As ibn ar-Rabi' from?": { answer: "Quraysh", harder: ["Siyar 1/330: Abu al-As ibn ar-Rabi' was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 113.
  "Which tribe was Abu Hurayrah from?": { answer: "Banu Daws", harder: ["Lineage: Abu Hurayrah came from which tribe?", "Banu Ghifar", "Banu Aslam", "Banu Juhaynah"] },
  "Where did Abu Hurayrah pass away?": { answer: "Madinah", harder: ["Lineage: Abu Hurayrah passed away in...?", "Makkah", "Ta'if", "Damascus"] },
  // Tabaqat Ibn Sa'd 3/348.
  "Which tribe was Abu Lubabah ibn Abd al-Mundhir from?": { answer: "Aws", harder: ["Tabaqat 3/348: Abu Lubabah of Banu Amr ibn Awf was of which tribe?", "Khazraj", "Quraysh", "Juhaynah"] },
  "Which clan did Abu Lubabah ibn Abd al-Mundhir belong to?": { answer: "Banu Amr ibn Awf", harder: ["Tabaqat 3/348: Abu Lubabah was of which clan of the Aws?", "Banu Abd al-Ashhal", "Banu an-Najjar", "Banu Salamah"] },
  // Siyar A'lam an-Nubala 2/380.
  "Which tribe was Abu Musa al-Ash'ari from?": { answer: "Ash'ar", harder: ["Siyar 2/380: Abu Musa, Abdullah ibn Qays, was of which Yemeni tribe?", "Daws", "Hamdan", "Madhhij"] },
  "Where was Abu Musa al-Ash'ari born?": { answer: "Zabid", harder: ["Lineage: Abu Musa al-Ash'ari of Yemen was born in...?", "Sana'a", "Aden", "Najran"] },
  // Siyar A'lam an-Nubala 2/105.
  "Who was the father of Abu Sufyan ibn Harb?": { answer: "Harb ibn Umayyah", harder: ["Siyar 2/105: Abu Sufyan, Sakhr, was the son of...?", "Umayyah ibn Abd Shams", "Utbah ibn Rabi'ah", "Abd Shams ibn Abd Manaf"] },
  "Which tribe was Abu Sufyan ibn Harb from?": { answer: "Quraysh", harder: ["Siyar 2/105: Abu Sufyan ibn Harb was a leader of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Abu Sufyan ibn Harb belong to?": { answer: "Banu Abd Shams", harder: ["Lineage: Abu Sufyan ibn Harb was of which clan of Quraysh?", "Banu Hashim", "Banu Makhzum", "Banu Nawfal"] },
  // Tabaqat Ibn Sa'd 7/289.
  "Which tribe was Abu Umamah al-Bahili from?": { answer: "Bahila", harder: ["Tabaqat 7/289: Abu Umamah, Sudayy ibn Ajlan, was of which tribe?", "Hamdan", "Ash'ar", "Daws"] },
  "Where did Abu Umamah al-Bahili pass away?": { answer: "Sham", harder: ["Tabaqat 7/289: Abu Umamah al-Bahili died in 86 AH in...?", "Iraq", "Egypt", "Madinah"] },
  // Sahih al-Bukhari 2704.
  "Who was the father of Al-Hasan ibn Ali?": { answer: "Ali ibn Abi Talib", harder: ["Lineage: Al-Hasan, the sayyid of Bukhari 2704, was the son of...?", "Abu Talib", "Ja'far ibn Abi Talib", "Aqil ibn Abi Talib"] },
  "Who was the mother of Al-Hasan ibn Ali?": { answer: "Fatimah az-Zahra", harder: ["Lineage: the mother of Al-Hasan ibn Ali was...?", "Fatimah bint Asad", "Khadijah bint Khuwaylid", "Zaynab bint Muhammad"] },
  "Which tribe was Al-Hasan ibn Ali from?": { answer: "Quraysh", harder: ["Lineage: Al-Hasan ibn Ali was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Siyar A'lam an-Nubala 3/280.
  "Who was the father of Al-Husayn ibn Ali?": { answer: "Ali ibn Abi Talib", harder: ["Siyar 3/280: Al-Husayn, the Prophet's ﷺ grandson, was the son of...?", "Abu Talib", "Ja'far ibn Abi Talib", "Aqil ibn Abi Talib"] },
  "Who was the mother of Al-Husayn ibn Ali?": { answer: "Fatimah az-Zahra", harder: ["Siyar 3/280: the mother of Al-Husayn ibn Ali was...?", "Fatimah bint Asad", "Umm Kulthum bint Muhammad", "Khawlah bint Ja'far"] },
  "Which tribe was Al-Husayn ibn Ali from?": { answer: "Quraysh", harder: ["Siyar 3/280: Al-Husayn ibn Ali was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Siyar A'lam an-Nubala 1/406.
  "Who was the father of Ammar ibn Yasir?": { answer: "Yasir ibn Amir", harder: ["Siyar 1/406: Ammar, among the first Muslims, was the son of...?", "Amir ibn Fuhayrah", "Abd Allah ibn Yasir", "Suhayb ibn Sinan"] },
  "Who was the mother of Ammar ibn Yasir?": { answer: "Sumayyah bint Khayyat", harder: ["Siyar 1/406: the mother of Ammar ibn Yasir was...?", "Umm Ayman", "Lubabah bint al-Harith", "Umm Habibah"] },
  "Which tribe was Ammar ibn Yasir from?": { answer: "Madhhij", harder: ["Lineage: Ammar ibn Yasir's family was of which tribe?", "Hamdan", "Kindah", "Ash'ar"] },
  // Siyar A'lam an-Nubala 3/54.
  "Who was the father of Amr ibn al-As?": { answer: "Al-As ibn Wa'il", harder: ["Siyar 3/54: Amr, of Banu Sahm, was the son of...?", "Wa'il ibn Hashim", "Amr ibn Hisham", "Al-Walid ibn al-Mughirah"] },
  "Which tribe was Amr ibn al-As from?": { answer: "Quraysh", harder: ["Siyar 3/54: Amr ibn al-As of Banu Sahm was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Siyar A'lam an-Nubala 1/252.
  "Which tribe was Amr ibn al-Jamuh from?": { answer: "Khazraj", harder: ["Siyar 1/252: Amr ibn al-Jamuh, chief of Banu Salimah, was of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  "Which clan did Amr ibn al-Jamuh belong to?": { answer: "Banu Salamah", harder: ["Siyar 1/252: Amr ibn al-Jamuh was a chief of which clan of the Ansar?", "Banu an-Najjar", "Banu Sa'idah", "Banu Abd al-Ashhal"] },
  // Siyar A'lam an-Nubala 1/299.
  "Who was the father of As'ad ibn Zurarah?": { answer: "Zurarah ibn Udas", harder: ["Siyar 1/299: As'ad, early leader of the Ansar, was the son of...?", "Malik ibn an-Nadr", "Ubadah ibn Dulaym", "Thabit ibn ad-Dahhak"] },
  "Which tribe was As'ad ibn Zurarah from?": { answer: "Khazraj", harder: ["Siyar 1/299: As'ad ibn Zurarah was of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  // Sahih al-Bukhari 4230.
  "Who was the father of Asma bint Umays?": { answer: "Umays ibn Ma'ad", harder: ["Lineage: Asma bint Umays of the people of the ship was the daughter of...?", "Ja'far ibn Abi Talib", "Abu Bakr as-Siddiq", "Harithah ibn Sharahil"] },
  "Who was the mother of Asma bint Umays?": { answer: "Hind bint Awf", harder: ["Lineage: the mother of Asma bint Umays was...?", "Maymunah bint al-Harith", "Salma bint Umays", "Umm Ruman"] },
  "Which tribe was Asma bint Umays from?": { answer: "Khath'am", harder: ["Lineage: Asma bint Umays was of which tribe?", "Daws", "Hamdan", "Kindah"] },
  // Siyar A'lam an-Nubala 2/119.
  "Who was the father of Fatimah az-Zahra?": { answer: "Muhammad ﷺ", harder: ["Siyar 2/119: Fatimah az-Zahra, wife of Ali, was the daughter of...?", "Abu Talib", "Abd al-Muttalib", "Al-Abbas ibn Abd al-Muttalib"] },
  "Who was the mother of Fatimah az-Zahra?": { answer: "Khadijah bint Khuwaylid", harder: ["Siyar 2/119: the mother of Fatimah az-Zahra was...?", "Sawdah bint Zam'ah", "Fatimah bint Asad", "Aishah bint Abi Bakr"] },
  "Which tribe was Fatimah az-Zahra from?": { answer: "Quraysh", harder: ["Siyar 2/119: Fatimah az-Zahra was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Tabaqat Ibn Sa'd 8/40.
  "Who was the father of Fatimah bint Asad?": { answer: "Asad ibn Hashim", harder: ["Tabaqat 8/40: Fatimah, mother of Ali, was the daughter of...?", "Hashim ibn Abd Manaf", "Abd al-Muttalib", "Abu Talib"] },
  "Which tribe was Fatimah bint Asad from?": { answer: "Quraysh", harder: ["Tabaqat 8/40: Fatimah bint Asad was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Jami` at-Tirmidhi 1128.
  "What is Ghaylan ibn Salamah ath-Thaqafi known for?": { answer: "He was a man of Thaqif, from Ta'if, who accepted Islam.", harder: ["Tirmidhi 1128: who was Ghaylan ibn Salamah ath-Thaqafi?", "He was the last companion to pass away in Syria.", "He was the best explainer of the Quran in his time.", "He was the chief of the Aws tribe in Madinah."] },
  "Which tribe was Ghaylan ibn Salamah ath-Thaqafi from?": { answer: "Thaqif", harder: ["Tirmidhi 1128: Ghaylan ibn Salamah ath-Thaqafi was of which tribe?", "Quraysh", "Khuza'ah", "Hudhayl"] },
  // Tabaqat Ibn Sa'd 7/283.
  "Who was the father of Al-Harith ibn Hisham?": { answer: "Hisham ibn al-Mughirah", harder: ["Tabaqat 7/283: Al-Harith of Banu Makhzum was the son of...?", "Al-Walid ibn al-Mughirah", "Abu Rabi'ah ibn al-Mughirah", "Abu Jahl"] },
  "Which tribe was Al-Harith ibn Hisham from?": { answer: "Quraysh", harder: ["Tabaqat 7/283: Al-Harith ibn Hisham was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Al-Harith ibn Hisham belong to?": { answer: "Banu Makhzum", harder: ["Tabaqat 7/283: Al-Harith ibn Hisham was of which clan of Quraysh?", "Banu Jumah", "Banu Sahm", "Banu Adi"] },
  // Siyar A'lam an-Nubala 3/44.
  "Who was the father of Hakim ibn Hizam?": { answer: "Hizam ibn Khuwaylid", harder: ["Siyar 3/44: Hakim, Khadijah's nephew, was the son of...?", "Khuwaylid ibn Asad", "Al-Awwam ibn Khuwaylid", "Nawfal ibn Khuwaylid"] },
  "Which tribe was Hakim ibn Hizam from?": { answer: "Quraysh", harder: ["Siyar 3/44: Hakim ibn Hizam was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Tabaqat Ibn Sa'd 3/5.
  "Who was the mother of Hamzah ibn Abd al-Muttalib?": { answer: "Halah bint Wuhayb", harder: ["Tabaqat 3/5: the mother of Hamzah ibn Abd al-Muttalib was...?", "Natilah bint Janab", "Fatimah bint Amr", "Fatimah bint Asad"] },
  "Which tribe was Hamzah ibn Abd al-Muttalib from?": { answer: "Quraysh", harder: ["Tabaqat 3/5: Hamzah ibn Abd al-Muttalib was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Al-Isabah 2/119.
  "Who was the father of Hanzalah ibn Abi Amir?": { answer: "Abu Amir ar-Rahib", harder: ["Al-Isabah 2/119: Hanzalah, washed by the angels, was the son of...?", "Abd Allah ibn Ubayy", "Abu Sufyan ibn Harb", "Abu Lubabah"] },
  "Which tribe was Hanzalah ibn Abi Amir from?": { answer: "Aws", harder: ["Al-Isabah 2/119: Hanzalah ibn Abi Amir was of which tribe?", "Khazraj", "Quraysh", "Juhaynah"] },
  "Where did Hanzalah ibn Abi Amir pass away?": { answer: "Mount Uhud", harder: ["Al-Isabah 2/119: Hanzalah ibn Abi Amir was martyred at...?", "Badr", "Khaybar", "The Trench"] },
  // Siyar A'lam an-Nubala 1/323.
  "Who was the father of Ikrimah ibn Abi Jahl?": { answer: "Abu Jahl", harder: ["Siyar 1/323: Ikrimah of Banu Makhzum was the son of...?", "Al-Walid ibn al-Mughirah", "Hisham ibn al-Mughirah", "Al-Harith ibn Hisham"] },
  "Who was the mother of Ikrimah ibn Abi Jahl?": { answer: "Mujalida bint Amr", harder: ["Lineage: the mother of Ikrimah ibn Abi Jahl was...?", "Asma bint Mukharribah", "Umm Hakim bint al-Harith", "Hind bint Utbah"] },
  "Which tribe was Ikrimah ibn Abi Jahl from?": { answer: "Quraysh", harder: ["Siyar 1/323: Ikrimah ibn Abi Jahl was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Siyar A'lam an-Nubala 1/206.
  "Who was the father of Ja'far ibn Abi Talib?": { answer: "Abu Talib", harder: ["Siyar 1/206: Ja'far, who made both hijrahs, was the son of...?", "Abd al-Muttalib", "Al-Abbas ibn Abd al-Muttalib", "Hamzah ibn Abd al-Muttalib"] },
  "Who was the mother of Ja'far ibn Abi Talib?": { answer: "Fatimah bint Asad", harder: ["Lineage: the mother of Ja'far ibn Abi Talib was...?", "Fatimah bint Amr", "Natilah bint Janab", "Halah bint Wuhayb"] },
  "Which tribe was Ja'far ibn Abi Talib from?": { answer: "Quraysh", harder: ["Siyar 1/206: Ja'far ibn Abi Talib was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Siyar A'lam an-Nubala 3/189.
  "Who was the mother of Jabir ibn Abdullah?": { answer: "Nasibah bint Uqbah", harder: ["Lineage: the mother of Jabir ibn Abdullah was...?", "Nusaybah bint Ka'b", "Umm Sulaym", "Hind bint Amr"] },
  "Which tribe was Jabir ibn Abdullah from?": { answer: "Khazraj", harder: ["Siyar 3/189: Jabir of Banu Salimah of the Ansar was of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  "Which clan did Jabir ibn Abdullah belong to?": { answer: "Banu Salamah", harder: ["Siyar 3/189: Jabir ibn Abdullah was of which clan of the Ansar?", "Banu an-Najjar", "Banu Sa'idah", "Banu Abd al-Ashhal"] },
  // Sahih al-Bukhari 4854.
  "Who was the father of Jubayr ibn Mut'im?": { answer: "Mut'im ibn Adi", harder: ["Lineage: Jubayr, who heard Surah at-Tur, was the son of...?", "Adi ibn Nawfal", "Nawfal ibn Abd Manaf", "Hakim ibn Hizam"] },
  "Which tribe was Jubayr ibn Mut'im from?": { answer: "Quraysh", harder: ["Bukhari 4854: Jubayr ibn Mut'im was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Jubayr ibn Mut'im belong to?": { answer: "Banu Nawfal", harder: ["Lineage: Jubayr ibn Mut'im was of which clan of Quraysh?", "Banu Hashim", "Banu Abd Shams", "Banu Muttalib"] },
  // Sahih Muslim 2472.
  "What is Julaybib known for?": { answer: "He married at the Prophet's ﷺ request and was later martyred.", harder: ["Muslim 2472: what is Julaybib known for?", "A Persian, he searched for the truth until he found Islam.", "He brought Aishah back to the army when she was left behind.", "He chased the Prophet ﷺ during the Hijrah for a reward."] },
  "Who married at the Prophet's ﷺ request and was later martyred?": { answer: "Julaybib", harder: ["Muslim 2472: 'he is from me, and I am from him' was said of which martyr, found after a battle?", "Mus'ab ibn Umayr", "Hanzalah ibn Abi Amir", "Abdullah ibn Jahsh"] },
  // Al-Isabah 5/443.
  "What is Ka'b ibn Zuhayr known for?": { answer: "He was an Arabian poet who accepted Islam.", harder: ["Al-Isabah 5/443: what is Ka'b ibn Zuhayr known for?", "He won Egypt for the Muslims and became its governor.", "He was the last companion to pass away in Syria.", "He was the second caliph, called al-Faruq."] },
  "Who was the father of Ka'b ibn Zuhayr?": { answer: "Zuhayr ibn Abi Sulma", harder: ["Al-Isabah 5/443: Ka'b, who came with his poem, was the son of...?", "Bujayr ibn Zuhayr", "Abu Sulma", "Hassan ibn Thabit"] },
  // Sahih al-Bukhari 4418.
  "Which tribe was Ka'b ibn Malik from?": { answer: "Khazraj", harder: ["Lineage: Ka'b ibn Malik, of the Tabuk story, was of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  "Which clan did Ka'b ibn Malik belong to?": { answer: "Banu Salamah", harder: ["Lineage: Ka'b ibn Malik was of which clan of the Ansar?", "Banu an-Najjar", "Banu Sa'idah", "Banu Abd al-Ashhal"] },
  // Sahih al-Bukhari 3612.
  "What is Khabbab ibn al-Aratt known for?": { answer: "He was one of the first Muslims and stayed firm in Islam.", harder: ["Bukhari 3612: what is Khabbab ibn al-Aratt known for?", "He was the best explainer of the Quran in his time.", "He was the chief of the Aws tribe in Madinah.", "He was the last companion to pass away in Syria."] },
  "Where did Khabbab ibn al-Aratt pass away?": { answer: "Kufa", harder: ["Lineage: Khabbab ibn al-Aratt passed away in...?", "Basra", "Madinah", "Damascus"] },
  // Tabaqat Ibn Sa'd 8/124.
  "Who was the father of Khawlah bint Hakim?": { answer: "Hakim ibn Umayyah", harder: ["Tabaqat 8/124: Khawlah, wife of Uthman ibn Maz'un, was the daughter of...?", "Hakim ibn Hizam", "Umayyah ibn Khalaf", "Uthman ibn Maz'un"] },
  "Which tribe was Khawlah bint Hakim from?": { answer: "Banu Sulaym", harder: ["Lineage: Khawlah bint Hakim was of which tribe?", "Banu Hilal", "Ghatafan", "Hawazin"] },
  // Siyar A'lam an-Nubala 2/542.
  "Which tribe was Makhramah ibn Nawfal from?": { answer: "Quraysh", harder: ["Siyar 2/542: Makhramah ibn Nawfal was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Makhramah ibn Nawfal belong to?": { answer: "Banu Zuhrah", harder: ["Siyar 2/542: Makhramah ibn Nawfal was of which clan of Quraysh?", "Banu Taym", "Banu Makhzum", "Banu Nawfal"] },
  // Tabaqat Ibn Sa'd 8/172.
  "Where was Mariyah al-Qibtiyyah born?": { answer: "Egypt", harder: ["Tabaqat 8/172: Mariyah, mother of Ibrahim, came from Hafn in...?", "Abyssinia", "Yemen", "Syria"] },
  "Where did Mariyah al-Qibtiyyah pass away?": { answer: "Madinah", harder: ["Tabaqat 8/172: Mariyah was buried in al-Baqi' in...?", "Makkah", "Egypt", "Ta'if"] },
  // Siyar A'lam an-Nubala 3/119.
  "Who was the father of Mu'awiyah ibn Abi Sufyan?": { answer: "Abu Sufyan ibn Harb", harder: ["Siyar 3/119: Mu'awiyah of Banu Umayyah was the son of...?", "Harb ibn Umayyah", "Utbah ibn Rabi'ah", "Yazid ibn Abi Sufyan"] },
  "Who was the mother of Mu'awiyah ibn Abi Sufyan?": { answer: "Hind bint Utbah", harder: ["Siyar 3/119: the mother of Mu'awiyah ibn Abi Sufyan was...?", "Ramlah bint Abi Sufyan", "Zaynab bint Nawfal", "Maysun bint Bahdal"] },
  "Which tribe was Mu'awiyah ibn Abi Sufyan from?": { answer: "Quraysh", harder: ["Siyar 3/119: Mu'awiyah ibn Abi Sufyan was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 3925.
  "Who was the father of Mus'ab ibn Umayr?": { answer: "Umayr ibn Hashim", harder: ["Lineage: Mus'ab, the first teacher sent to Madinah, was the son of...?", "Umayr ibn Wahb", "Hashim ibn Abd Manaf", "Abu Aziz ibn Umayr"] },
  "Who was the mother of Mus'ab ibn Umayr?": { answer: "Khunas bint Malik", harder: ["Lineage: the mother of Mus'ab ibn Umayr was...?", "Hind bint Utbah", "Halah bint Khuwaylid", "Hamnah bint Jahsh"] },
  "Which tribe was Mus'ab ibn Umayr from?": { answer: "Quraysh", harder: ["Lineage: Mus'ab ibn Umayr was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Tabaqat Ibn Sa'd 3/375.
  "Who was the father of Nu'ayman ibn Amr?": { answer: "Amr ibn Rifa'ah", harder: ["Tabaqat 3/375: Nu'ayman of Banu an-Najjar was the son of...?", "Rifa'ah ibn Rafi'", "Amr ibn al-Jamuh", "Amr ibn Haram"] },
  "Who was the mother of Nu'ayman ibn Amr?": { answer: "Fatimah bint Amr an-Najjariyyah", harder: ["Tabaqat 3/375: the mother of Nu'ayman ibn Amr was...?", "Fatimah bint Asad", "Umm Sulaym", "Su'da bint Tha'labah"] },
  "Which tribe was Nu'ayman ibn Amr from?": { answer: "Khazraj", harder: ["Tabaqat 3/375: Nu'ayman ibn Amr of Banu an-Najjar was of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  // Siyar A'lam an-Nubala 2/250.
  "Who was the father of Ruqayyah bint Muhammad?": { answer: "Muhammad ﷺ", harder: ["Siyar 2/250: Ruqayyah, wife of Uthman, was the daughter of...?", "Abu Talib", "Abd al-Muttalib", "Al-Abbas ibn Abd al-Muttalib"] },
  "Who was the mother of Ruqayyah bint Muhammad?": { answer: "Khadijah bint Khuwaylid", harder: ["Siyar 2/250: the mother of Ruqayyah bint Muhammad was...?", "Sawdah bint Zam'ah", "Fatimah bint Asad", "Halah bint Khuwaylid"] },
  "Which tribe was Ruqayyah bint Muhammad from?": { answer: "Quraysh", harder: ["Siyar 2/250: Ruqayyah bint Muhammad was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 4141.
  "Who was the father of Sa'd ibn Ubadah?": { answer: "Ubadah ibn Dulaym", harder: ["Lineage: Sa'd, chief of the Khazraj, was the son of...?", "Ubadah ibn as-Samit", "Mu'adh ibn Jabal", "Qays ibn Sa'd"] },
  "Who was the mother of Sa'd ibn Ubadah?": { answer: "Amrah bint Mas'ud", harder: ["Lineage: the mother of Sa'd ibn Ubadah was...?", "Kabshah bint Rafi'", "Nasibah bint Uqbah", "Umm Sulaym"] },
  "Which tribe was Sa'd ibn Ubadah from?": { answer: "Khazraj", harder: ["Bukhari 4141: Sa'd ibn Ubadah was chief of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  // Siyar A'lam an-Nubala 1/279.
  "Which tribe was Sa'd ibn Mu'adh from?": { answer: "Aws", harder: ["Siyar 1/279: Sa'd ibn Mu'adh of Banu Abd al-Ashhal was chief of which tribe?", "Khazraj", "Quraysh", "Juhaynah"] },
  "Where was Sa'd ibn Mu'adh born?": { answer: "Madinah", harder: ["Lineage: Sa'd ibn Mu'adh, chief of the Aws, was born in...?", "Makkah", "Ta'if", "Khaybar"] },
  "Where did Sa'd ibn Mu'adh pass away?": { answer: "Madinah", harder: ["Lineage: Sa'd ibn Mu'adh passed away in...?", "Khaybar", "Makkah", "Uhud"] },
  // Sahih al-Bukhari 4141.
  "What is Safwan ibn al-Mu'attal known for?": { answer: "He brought Aishah back to the army when she was left behind.", harder: ["Bukhari 4141: what is Safwan ibn al-Mu'attal known for?", "He tied himself to a pillar of the mosque to repent.", "He was Khadijah's nephew and a generous merchant.", "He was Khalid's brother and later emigrated to Madinah."] },
  "Which tribe was Safwan ibn al-Mu'attal from?": { answer: "Banu Sulaym", harder: ["Lineage: Safwan ibn al-Mu'attal was of which tribe?", "Banu Hilal", "Ghatafan", "Hawazin"] },
  // Siyar A'lam an-Nubala 2/17.
  "What is Suhayb ar-Rumi known for?": { answer: "He was an early Muslim who grew up among the Romans.", harder: ["Siyar 2/17: what is Suhayb ibn Sinan ar-Rumi known for?", "He was a governor of Basra and Kufa.", "He was a leader of the Aws before Islam.", "He was a noble of Banu Zuhrah and father of al-Miswar."] },
  "Where did Suhayb ar-Rumi pass away?": { answer: "Madinah", harder: ["Lineage: Suhayb ar-Rumi passed away in...?", "Makkah", "Damascus", "Kufa"] },
  // Al-Isabah 3/177.
  "Who was the father of Suhayl ibn Amr?": { answer: "Amr ibn Abd Shams", harder: ["Al-Isabah 3/177: Suhayl, who made the peace of Hudaybiyyah, was the son of...?", "Abu Jandal ibn Suhayl", "Amr ibn Hisham", "Amr ibn Wudd"] },
  "Who was the mother of Suhayl ibn Amr?": { answer: "Uzza bint Sufyan", harder: ["Lineage: the mother of Suhayl ibn Amr was...?", "Ramlah", "Nasibah bint Uqbah", "Natilah bint Janab"] },
  "Which tribe was Suhayl ibn Amr from?": { answer: "Quraysh", harder: ["Al-Isabah 3/177: Suhayl ibn Amr of Banu Amir was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 3906.
  "What is Suraqah ibn Malik known for?": { answer: "He chased the Prophet ﷺ during the Hijrah for a reward.", harder: ["Bukhari 3906: what is Suraqah ibn Malik known for?", "He was the Prophet's ﷺ cousin, one of ten promised Paradise.", "He was the best explainer of the Quran in his time.", "He was the chief of the Aws tribe in Madinah."] },
  "Which tribe was Suraqah ibn Malik from?": { answer: "Kinanah", harder: ["Lineage: Suraqah ibn Malik, who chased the Hijrah riders, was of which tribe?", "Hudhayl", "Khuza'ah", "Thaqif"] },
  // Sahih Muslim 2942a.
  "Which tribe was Tamim ad-Dari from?": { answer: "Lakhm", harder: ["Lineage: Tamim ad-Dari, once a Christian, was of which tribe?", "Judham", "Kindah", "Ghassan"] },
  "Which clan did Tamim ad-Dari belong to?": { answer: "Banu ad-Dar", harder: ["Lineage: Tamim ad-Dari was of which clan?", "Banu Abd ad-Dar", "Banu Ghassan", "Banu Kalb"] },
  "Where did Tamim ad-Dari pass away?": { answer: "Palestine", harder: ["Lineage: Tamim ad-Dari passed away in...?", "Damascus", "Egypt", "Madinah"] },
  // Al-Isabah 1/500.
  "What is Thabit ibn Aqram known for?": { answer: "He picked up the banner at Mu'tah and gave it to Khalid.", harder: ["Al-Isabah 1/500: what is Thabit ibn Aqram known for?", "He was the best explainer of the Quran in his time.", "He was the chief of the Aws tribe in Madinah.", "He was the first to call the adhan in Islam."] },
  "Which tribe was Thabit ibn Aqram from?": { answer: "Bali", harder: ["Al-Isabah 1/500: Thabit ibn Aqram, ally of the Ansar, was of which tribe?", "Aws", "Khazraj", "Juhaynah"] },
  // Tabaqat Ibn Sa'd 3/351.
  "What is Tha'labah ibn Hatib known for?": { answer: "He was one of the companions who fought at Badr.", harder: ["Tabaqat 3/351: what is Tha'labah ibn Hatib known for?", "He was called the Explainer of the Quran.", "He was a leader of the Aws before Islam.", "He was a noble of Banu Zuhrah and father of al-Miswar."] },
  "Tha'labah ibn Hatib was one of the companions who fought at Badr.": { answer: "True", harder: "By Tabaqat 3/351, Ibn Sa'd lists Tha'labah ibn Hatib among the Ansar who fought at Badr." },
  // Siyar A'lam an-Nubala 1/256.
  "Which tribe was Ubaydah ibn al-Harith from?": { answer: "Quraysh", harder: ["Siyar 1/256: Ubaydah ibn al-Harith, martyred from his wound at Badr, was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Ubaydah ibn al-Harith belong to?": { answer: "Banu Muttalib", harder: ["Lineage: Ubaydah ibn al-Harith was of which clan of Banu Abd Manaf?", "Banu Hashim", "Banu Nawfal", "Banu Abd Shams"] },
  "Where was Ubaydah ibn al-Harith born?": { answer: "Makkah", harder: ["Lineage: Ubaydah ibn al-Harith was born in...?", "Madinah", "Ta'if", "Tihamah"] },
  // Al-Isabah 8/358.
  "What is Umm Ayman known for?": { answer: "She cared for the young Prophet ﷺ and was an early Muslim.", harder: ["Al-Isabah 8/358: what is Umm Ayman, Barakah, known for?", "She was the youngest daughter of the Prophet ﷺ.", "She was Abu Bakr's wife and Aishah's mother.", "She was the first martyr in Islam."] },
  "Who was the father of Umm Ayman?": { answer: "Tha'labah ibn Amr", harder: ["Al-Isabah 8/358: Umm Ayman, Barakah, was the daughter of...?", "Harithah ibn Sharahil", "Zayd ibn Harithah", "Zurarah ibn Udas"] },
  // Siyar A'lam an-Nubala 2/252.
  "Who was the father of Umm Kulthum bint Muhammad?": { answer: "Muhammad ﷺ", harder: ["Siyar 2/252: Umm Kulthum, who married Uthman after Ruqayyah, was the daughter of...?", "Abu Talib", "Abd al-Muttalib", "Al-Abbas ibn Abd al-Muttalib"] },
  "Who was the mother of Umm Kulthum bint Muhammad?": { answer: "Khadijah bint Khuwaylid", harder: ["Siyar 2/252: the mother of Umm Kulthum bint Muhammad was...?", "Sawdah bint Zam'ah", "Fatimah bint Asad", "Halah bint Khuwaylid"] },
  "Which tribe was Umm Kulthum bint Muhammad from?": { answer: "Quraysh", harder: ["Siyar 2/252: Umm Kulthum bint Muhammad was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 3388.
  "Who was the father of Umm Ruman?": { answer: "Amir ibn Uwaymir", harder: ["Lineage: Umm Ruman, Aishah's mother, was the daughter of...?", "Abu Bakr as-Siddiq", "Abu Quhafah", "Abd ar-Rahman ibn Abi Bakr"] },
  "Which tribe was Umm Ruman from?": { answer: "Kinanah", harder: ["Lineage: Umm Ruman, mother of Aishah, was of which tribe?", "Hudhayl", "Khuza'ah", "Thaqif"] },
  "Where was Umm Ruman born?": { answer: "Tihamah", harder: ["Lineage: Umm Ruman, mother of Aishah, was born in...?", "Madinah", "Makkah", "Zabid"] },
  // Sahih al-Bukhari 3642.
  "What is Urwah ibn Abi al-Ja'd al-Bariqi known for?": { answer: "The Prophet ﷺ blessed his trade: even dust would earn him profit.", harder: ["Bukhari 3642: what is Urwah ibn Abi al-Ja'd al-Bariqi known for?", "He wrote down the revelation and collected the Quran.", "He was the last companion to pass away in Syria.", "He was the second caliph, called al-Faruq."] },
  "Who is this? The Prophet ﷺ blessed his trade: even dust would earn him profit.": { answer: "Urwah ibn Abi al-Ja'd al-Bariqi", harder: ["Bukhari 3642: he ﷺ prayed for blessing in whose trade, so even dust would earn profit?", "Abd ar-Rahman ibn Awf", "Hakim ibn Hizam", "Uthman ibn Affan"] },
  // Sahih al-Bukhari 4469.
  "Who was the father of Usamah ibn Zayd?": { answer: "Zayd ibn Harithah", harder: ["Bukhari 4469: Usamah, whom he ﷺ made leader of an army, was the son of...?", "Harithah ibn Sharahil", "Zayd ibn Thabit", "Ayman ibn Ubayd"] },
  "Who was the mother of Usamah ibn Zayd?": { answer: "Umm Ayman", harder: ["Lineage: the mother of Usamah ibn Zayd was...?", "Su'da bint Tha'labah", "Zaynab bint Jahsh", "Umm Kulthum bint Uqbah"] },
  "Where was Usamah ibn Zayd born?": { answer: "Makkah", harder: ["Lineage: Usamah ibn Zayd was born in...?", "Madinah", "Ta'if", "Abyssinia"] },
  // Siyar A'lam an-Nubala 1/343.
  "Which tribe was Usayd ibn Hudayr from?": { answer: "Aws", harder: ["Siyar 1/343: Usayd ibn Hudayr, buried in al-Baqi', was of which tribe?", "Khazraj", "Quraysh", "Juhaynah"] },
  "Where did Usayd ibn Hudayr pass away?": { answer: "Madinah", harder: ["Siyar 1/343: Usayd ibn Hudayr passed away in...?", "Makkah", "Damascus", "Kufa"] },
  // Al-Isabah 6/484.
  "Which tribe was Al-Walid ibn al-Walid ibn al-Mughirah from?": { answer: "Quraysh", harder: ["Al-Isabah 6/484: Al-Walid, Khalid's brother, was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Al-Walid ibn al-Walid ibn al-Mughirah belong to?": { answer: "Banu Makhzum", harder: ["Al-Isabah 6/484: Al-Walid ibn al-Walid was of which clan of Quraysh?", "Banu Jumah", "Banu Sahm", "Banu Adi"] },
  // Siyar A'lam an-Nubala 1/328.
  "Who was the father of Yazid ibn Abi Sufyan?": { answer: "Abu Sufyan ibn Harb", harder: ["Siyar 1/328: Yazid, a commander in the conquest of Sham, was the son of...?", "Harb ibn Umayyah", "Utbah ibn Rabi'ah", "Al-Hakam ibn Abi al-As"] },
  "Who was the mother of Yazid ibn Abi Sufyan?": { answer: "Zaynab bint Nawfal", harder: ["Lineage: the mother of Yazid ibn Abi Sufyan was...?", "Hind bint Utbah", "Ramlah bint Abi Sufyan", "Safiyyah bint Abi al-As"] },
  "Which tribe was Yazid ibn Abi Sufyan from?": { answer: "Quraysh", harder: ["Siyar 1/328: Yazid ibn Abi Sufyan was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Quran 33:37.
  "Who was the father of Zayd ibn Harithah?": { answer: "Harithah ibn Sharahil", harder: ["Lineage: Zayd, the only Companion named in the Quran, was the son of...?", "Sharahil ibn Ka'b", "Jabalah ibn Harithah", "Usamah ibn Zayd"] },
  "Who was the mother of Zayd ibn Harithah?": { answer: "Su'da bint Tha'labah", harder: ["Lineage: the mother of Zayd ibn Harithah was...?", "Umm Ayman", "Zaynab bint Jahsh", "Umm Kulthum bint Uqbah"] },
  "Which tribe was Zayd ibn Harithah from?": { answer: "Banu Kalb", harder: ["Lineage: Zayd ibn Harithah was of which tribe?", "Banu Tamim", "Banu Asad", "Lakhm"] },
  // Sahih al-Bukhari 4986.
  "Who was the father of Zayd ibn Thabit?": { answer: "Thabit ibn ad-Dahhak", harder: ["Bukhari 4986: Zayd, who gathered the Quran for Abu Bakr, was the son of...?", "Thabit ibn Qays", "Thabit ibn Aqram", "Ubayy ibn Ka'b"] },
  "Who was the mother of Zayd ibn Thabit?": { answer: "An-Nawwar bint Malik", harder: ["Lineage: the mother of Zayd ibn Thabit was...?", "Umm Sulaym", "Nasibah bint Uqbah", "Amrah bint Mas'ud"] },
  "Which tribe was Zayd ibn Thabit from?": { answer: "Khazraj", harder: ["Bukhari 4986: Zayd ibn Thabit was of which tribe?", "Aws", "Quraysh", "Juhaynah"] },
  // Tabaqat Ibn Sa'd 8/25.
  "Who was the father of Zaynab bint Muhammad?": { answer: "Muhammad ﷺ", harder: ["Tabaqat 8/25: Zaynab, the eldest daughter, wife of Abu al-As, was the daughter of...?", "Abu Talib", "Abd al-Muttalib", "Al-Abbas ibn Abd al-Muttalib"] },
  "Who was the mother of Zaynab bint Muhammad?": { answer: "Khadijah bint Khuwaylid", harder: ["Tabaqat 8/25: the mother of Zaynab bint Muhammad was...?", "Sawdah bint Zam'ah", "Fatimah bint Asad", "Halah bint Khuwaylid"] },
  "Which tribe was Zaynab bint Muhammad from?": { answer: "Quraysh", harder: ["Tabaqat 8/25: Zaynab bint Muhammad was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Sahih al-Bukhari 75.
  "Who was the father of Abdullah ibn Abbas?": { answer: "Abbas ibn Abd al-Muttalib", harder: ["Bukhari 75: Abdullah, for whom he ﷺ prayed 'teach him the Book', was the son of...?", "Abd al-Muttalib", "Hamzah ibn Abd al-Muttalib", "Abu Talib"] },
  "Who was the mother of Abdullah ibn Abbas?": { answer: "Lubabah bint al-Harith", harder: ["Lineage: the mother of Abdullah ibn Abbas was...?", "Hind bint Awf", "Maymunah bint al-Harith", "Natilah bint Janab"] },
  "Which tribe was Abdullah ibn Abbas from?": { answer: "Quraysh", harder: ["Bukhari 75: Abdullah ibn Abbas was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  // Tabaqat Ibn Sa'd 4/150.
  "Which tribe was Umayr ibn Wahb al-Jumahi from?": { answer: "Quraysh", harder: ["Tabaqat 4/150: Umayr ibn Wahb, Muslim after Badr, was of which tribe?", "Thaqif", "Khuza'ah", "Hudhayl"] },
  "Which clan did Umayr ibn Wahb al-Jumahi belong to?": { answer: "Banu Jumah", harder: ["Tabaqat 4/150: Umayr ibn Wahb was of which clan of Quraysh?", "Banu Sahm", "Banu Makhzum", "Banu Adi"] },
};
