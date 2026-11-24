import type { TierEntry } from "../questionTiers";

/**
 * Basics (foundation): harder and expert ways to ask the same questions, batch 1 (the first 60). Each one keeps the
 * question's answer and asks only what the lesson's own source says (Bukhari 6227, 5376, 6224, 6312, 6307, 1, 52,
 * 71, 3461; Muslim 8, 38, 55, 2734, 2699; Tirmidhi 1987, 2317; Ibn Majah 3803; Quran 4:86, 5:6, 14:7, 18:23-24,
 * 24:61). Keyed by the question's English prompt (see questionTiers.ts).
 */
export const FOUNDATION_TIERS: Record<string, TierEntry> = {
  // Bukhari 6227: Allah taught Adam to greet the angels.
  "What is the basic Muslim greeting you should learn first?": {
    answer: "As-salamu alaykum",
    harder: ["Which greeting did Allah teach Adam to say to the angels?", "Marhaban bikum", "Ahlan wa sahlan", "Sabah al-khayr"],
    expert: ["Allah told Adam: this is your greeting and your children's. What did Adam say to the angels?", "Wa alaykum as-salam", "Marhaban bikum", "Ahlan wa sahlan"]
  },
  "A Muslim should keep salam for friends only and skip strangers.": {
    answer: "False",
    harder: "Salam is only for people you already know.",
    expert: "In the sunnah, salam is for those you know, while strangers are left without it."
  },
  "What does salam bring into a conversation first?": {
    answer: "Peace and warmth",
    harder: ["What does salam set at the very start of a meeting?", "Respect for rank only", "Formality and distance", "A request for help"]
  },
  // Quran 4:86: answer a greeting with a better one, or at least the same.
  "If someone says 'As-salamu alaykum,' what should you answer?": {
    answer: "Wa alaykum as-salam",
    harder: ["Someone greets you with 'As-salamu alaykum'. Which reply is at least equal to it?", "Ahlan wa sahlan", "Wa iyyak", "Ma'a as-salamah"]
  },
  "The Quran teaches believers to answer a greeting with one equal or better.": {
    answer: "True",
    harder: "Quran 4:86 allows answering a greeting with an equal one, not only a better one.",
    expert: "Quran 4:86 ends by saying Allah keeps account of all things."
  },
  "Which reply is the more complete salam?": {
    answer: "Wa alaykum as-salam wa rahmatullah",
    harder: ["Which reply is better than a plain 'Wa alaykum as-salam'?", "Wa alaykum", "Wa iyyakum", "Ahlan wa sahlan"]
  },
  // Ibn Majah 3803: on seeing what he liked, he ﷺ said Alhamdulillah, by whose blessing good things are completed.
  "What should a Muslim say when good news comes?": {
    answer: "Alhamdulillah",
    harder: ["Something you love happens. Which word begins the Prophet's ﷺ praise for it?", "SubhanAllah", "Allahu akbar", "Astaghfirullah"],
    expert: ["On seeing what he liked, he ﷺ praised Allah 'by whose blessing good things are completed'. How did it begin?", "Bismillah", "SubhanAllah", "Allahu akbar"]
  },
  "Alhamdulillah means praise belongs to Allah.": {
    answer: "True",
    harder: "Alhamdulillah means all praise is for Allah, not only 'thank you'."
  },
  "What should you think when a blessing comes?": {
    answer: "Thank Allah for the blessing",
    harder: ["A blessing reaches you. What does the sunnah of praise teach your heart?", "Thank only the people who brought it", "Treat it as luck", "Expect it as your right"]
  },
  // Bukhari 5376: "O boy, mention Allah's name, eat with your right hand, and eat from what is near you."
  "What should a Muslim say before eating?": {
    answer: "Bismillah",
    harder: ["What did the Prophet ﷺ teach a boy to say before eating?", "Alhamdulillah", "SubhanAllah", "InshaAllah"],
    expert: ["Umar ibn Abi Salamah's hand went all over the dish. What was the first thing he ﷺ told him?", "Alhamdulillah", "Eat from what is near you", "SubhanAllah"]
  },
  "Saying Bismillah helps a Muslim remember Allah before an action.": {
    answer: "True",
    harder: "The boy at the Prophet's ﷺ table was told to mention Allah's name before eating.",
    expert: "The boy told to say Bismillah at the table was Umar ibn Abi Salamah."
  },
  "Which choice fits the sunnah at the table?": {
    answer: "Say Bismillah and eat with your right hand",
    harder: ["Which of these matches what he ﷺ taught at the table?", "Say Bismillah and eat with either hand", "Eat with your right hand, and say Bismillah at the end", "Say Alhamdulillah and eat from the far side of the dish"]
  },
  // Bukhari 6224: the sneezer says Alhamdulillah, his brother Yarhamuk Allah, then he says Yahdikumullah wa yuslih balakum.
  "After sneezing, what should a Muslim say first?": {
    answer: "Alhamdulillah",
    harder: ["You sneeze. Which words come first, by the sunnah?", "Yarhamuk Allah", "Astaghfirullah", "SubhanAllah"],
    expert: ["Bukhari 6224: the one who sneezes says one thing, and his brother answers Yarhamuk Allah. What does the sneezer say?", "Yahdikumullah", "Yarhamuk Allah", "Bismillah"]
  },
  "If someone says Alhamdulillah after sneezing, another Muslim can reply with mercy.": {
    answer: "True",
    harder: "When someone sneezes and says Alhamdulillah, his brother answers Yarhamuk Allah.",
    expert: "After hearing Yarhamuk Allah, the one who sneezed answers Yahdikumullah wa yuslih balakum."
  },
  "What is a proper reply to someone's Alhamdulillah after a sneeze?": {
    answer: "Yarhamuk Allah",
    harder: ["Someone sneezes and says Alhamdulillah. What do you answer?", "Yahdikumullah", "Alhamdulillah", "Bismillah"],
    expert: ["Bukhari 6224: what does the brother say once the one who sneezed has praised Allah?", "Yahdikumullah wa yuslih balakum", "Jazak Allahu khayran", "Alhamdulillah"]
  },
  // Bukhari 6312: Alhamdulillah, who gave us life after He made us die, and to Him is the rising.
  "When you wake up, say ____ to thank Allah.": {
    answer: "Alhamdulillah",
    harder: ["On waking, he ﷺ praised Allah 'who gave us life after death'. Which word began it?", "SubhanAllah", "Astaghfirullah", "Bismillah"],
    expert: ["The waking dua ends 'and to Him is the rising'. Which word begins it?", "Bismika", "Allahumma", "SubhanAllah"]
  },
  "When you wake up, say Alhamdulillah to thank Allah.": {
    answer: "True",
    harder: "In his waking dua, he ﷺ called sleep a kind of death.",
    expert: "The waking dua ends with: and to Him is the rising."
  },
  // Quran 14:7.
  "Allah says: if you are thankful, I will give you ____.": {
    answer: "more",
    harder: ["Quran 14:7 promises the thankful that Allah will give them ____.", "exactly the same", "less", "nothing new"],
    expert: ["Quran 14:7 warns the ungrateful of a severe punishment, and promises the grateful ____.", "forgiveness only", "the same", "less"]
  },
  // Quran 18:23-24.
  "Say ____ when you plan to do something later.": {
    answer: "InshaAllah",
    harder: ["Quran 18:23-24: never say 'I will do it tomorrow' without adding ____.", "Bismillah", "MashaAllah", "Alhamdulillah"]
  },
  // Bukhari 6307: more than seventy times a day.
  "After a mistake, say ____ and try again.": {
    answer: "Astaghfirullah",
    harder: ["The Prophet ﷺ said it more than seventy times a day. Which word?", "Alhamdulillah", "SubhanAllah", "Allahu akbar"],
    expert: ["Abu Hurairah heard him ﷺ swear that he says it, and repents, more than seventy times a day. What does he say?", "La ilaha illallah", "Alhamdulillah", "SubhanAllah"]
  },
  // Quran 24:61: greet one another with a greeting from Allah, blessed and good.
  "When you come home, say ____ to your family.": {
    answer: "salam",
    harder: ["Quran 24:61: when you enter houses, greet one another with a greeting from Allah. Which greeting?", "marhaban", "good evening", "nothing"]
  },
  "When you come home, say goodbye to your family.": {
    answer: "False",
    harder: "On coming home, the Quran tells us to stay silent so as not to disturb anyone."
  },
  "Before you eat, say ____.": {
    answer: "Bismillah",
    harder: ["At the table, the Prophet ﷺ told a boy to begin with ____.", "InshaAllah", "Alhamdulillah", "SubhanAllah"]
  },
  "Which hand do we eat with?": {
    answer: "The right hand",
    harder: ["The Prophet ﷺ told Umar ibn Abi Salamah to eat with which hand?", "The left hand", "Both hands", "Whichever is nearer the dish"]
  },
  // Muslim 2734: Allah is pleased with the servant who eats and praises Him for it.
  "When you finish eating, say ____.": {
    answer: "Alhamdulillah",
    harder: ["Muslim 2734: Allah is pleased with a servant who eats a meal and then says ____.", "Bismillah", "Astaghfirullah", "SubhanAllah"]
  },
  // Quran 5:6.
  "Before we pray, we get clean with ____.": {
    answer: "wudu",
    harder: ["Quran 5:6: when you rise for prayer, wash your faces and arms. What is this called?", "tayammum", "istinja", "adhan"],
    expert: ["Quran 5:6: wash the face, the arms to the elbows, wipe the head, and wash the feet to the ankles. What is it?", "ghusl", "tayammum", "istinja"]
  },
  "Before we pray, we get clean with wudu.": {
    answer: "True",
    harder: "Quran 5:6 says to wash the arms up to the elbows in wudu.",
    expert: "In Quran 5:6 the head is wiped, not washed."
  },
  // Bukhari 628: when the time comes, one of you calls the adhan, and the eldest leads.
  "The ____ calls Muslims to pray five times a day.": {
    answer: "adhan",
    harder: ["Bukhari 628: when prayer time comes, one of you should call the ____, and the eldest should lead.", "iqamah", "takbir", "dua"]
  },
  // Bukhari 631: pray as you have seen me pray.
  "Whose way of praying do we follow?": {
    answer: "The Prophet's ﷺ way",
    harder: ["'Pray as you have seen me pray.' Whose way does this tell us to follow?", "Our parents' way", "Our town's way", "The imam's own way"],
    expert: ["Malik ibn al-Huwayrith's group stayed with him ﷺ for twenty days, then were told to pray as they had seen whom pray?", "Their elders' way", "The local way", "Their own way"]
  },
  // Bukhari 1 (Umar ibn al-Khattab): deeds are only by intentions.
  "What are deeds judged by?": {
    answer: "Intentions",
    harder: ["'Actions are only by ...' How does the first hadith of Bukhari end?", "Results", "Effort", "Their size"],
    expert: ["Bukhari 1: whoever migrates for a woman to marry, his migration is for that. So deeds are judged by what?", "Where they happen", "How long they take", "Who sees them"]
  },
  "Which hadith opens Sahih al-Bukhari?": {
    answer: "Deeds are by intentions",
    harder: ["Imam al-Bukhari placed which hadith first in his Sahih?", "The hadith of Jibril", "Islam is built on five", "The religion is sincerity"],
    expert: ["Al-Bukhari opened his Sahih with a hadith narrated by Umar ibn al-Khattab. Which one?", "The hadith of Jibril", "Islam is built on five", "The religion is sincerity"]
  },
  "Two people do the same deed. Can their reward differ?": {
    answer: "Yes, by their intentions",
    harder: ["Two people pray the same prayer side by side. By Bukhari 1, can their reward differ?", "No, the same deed earns the same reward", "Only if one prays longer", "Only if one prays in public"]
  },
  // Muslim 8 (Umar ibn al-Khattab): the hadith of Jibril.
  "What is ihsan?": {
    answer: "Worship as if you see Allah",
    harder: ["Which of these is ihsan, as the Prophet ﷺ described it?", "Worship only when others can see", "Believe in the angels and the Books", "Pray, fast and give zakat"],
    expert: ["Jibril asked: 'Tell me about ihsan.' What was the answer?", "To believe in Allah, His angels and His Books", "To pray, fast and give zakat", "To know the signs of the Hour"]
  },
  "Who came to ask about Islam, iman and ihsan?": {
    answer: "Jibril, as a man",
    harder: ["Who came to teach the Companions their religion by asking questions?", "A Companion from Madinah", "A scholar from Yemen", "A traveller from Syria"],
    expert: ["A man in very white clothes, with very black hair and no sign of travel, sat knee to knee with him ﷺ. Who was he?", "A Companion from Madinah", "A scholar from Yemen", "Mikail, as a man"]
  },
  "Even when we can't see Allah, He sees us.": {
    answer: "True",
    harder: "In the hadith of Jibril, ihsan includes knowing that Allah sees you even when you do not see Him.",
    expert: "Umar ibn al-Khattab is the one who narrated the hadith of Jibril."
  },
  // Tirmidhi 2317: part of the excellence of a person's Islam is leaving what does not concern him.
  "What does good Islam leave alone?": {
    answer: "What does not concern you",
    harder: ["Tirmidhi 2317: part of the excellence of a person's Islam is leaving what?", "Whatever is hard", "Every worldly matter", "Anything new"]
  },
  "Friends gossip about someone. What fits this hadith?": {
    answer: "Stay out of it",
    harder: ["Friends talk about someone's private life. Which choice fits Tirmidhi 2317?", "Listen closely but say nothing", "Ask for more details", "Tell the person what they said"]
  },
  "Minding your own business is part of good Islam.": {
    answer: "True",
    harder: "The hadith says leaving what does not concern you is part of the excellence of a person's Islam."
  },
  // Bukhari 52 (an-Nu'man ibn Bashir).
  "What lies between clear halal and clear haram?": {
    answer: "Doubtful things",
    harder: ["Bukhari 52: the halal is clear and the haram is clear. What lies between them?", "Things everyone agrees on", "Only matters of food", "Matters of the unseen"],
    expert: ["An-Nu'man ibn Bashir heard him ﷺ say that between the clear halal and haram are things many people do not know. What are they?", "Small sins", "Forgotten rules", "Matters of custom"]
  },
  "What do you protect by avoiding doubtful things?": {
    answer: "Your religion and honor",
    harder: ["Avoiding doubtful matters keeps what clear, says Bukhari 52?", "Your health and wealth", "Your friends and family", "Your time and sleep"],
    expert: ["Bukhari 52 compares doubtful things to a shepherd grazing near a sanctuary. Avoiding them protects what?", "Your flock and land", "Your health and wealth", "Your name among the rich"]
  },
  "When unsure if something is halal, it's safer to leave it.": {
    answer: "True",
    harder: "Bukhari 52 says many people do not know the doubtful matters.",
    expert: "In Bukhari 52, the heart is the piece of flesh that, if sound, makes the whole body sound."
  },
  // Muslim 55 (Tamim ad-Dari): the religion is sincerity.
  "What did he ﷺ say the religion is?": {
    answer: "Sincerity",
    harder: ["He ﷺ said: 'The religion is ...' what?", "Prayer", "Knowledge", "Patience"],
    expert: ["Tamim ad-Dari narrated: 'The religion is ...', and the Companions asked: to whom? What is it?", "Good character", "Prayer", "Knowledge"]
  },
  "Which of these is named in the hadith?": {
    answer: "Allah's Book",
    harder: ["'Sincerity to whom?' they asked. Which of these did he ﷺ name?", "The scholars only", "The wealthy", "Strangers on the road"]
  },
  "Sincerity to Muslims is part of the religion.": {
    answer: "True",
    harder: "Sincerity to the leaders of the Muslims is named in this hadith.",
    expert: "The hadith 'The religion is sincerity' was narrated by Tamim ad-Dari."
  },
  // Tirmidhi 1987: fear Allah wherever you are, follow a bad deed with a good one, treat people with good character.
  "You made a mistake. What does this hadith say to do?": {
    answer: "Follow it with a good deed",
    harder: ["After a bad deed, what does Tirmidhi 1987 say will wipe it out?", "Waiting until you feel better", "Telling everyone about it", "Doing it again, but quietly"],
    expert: ["He ﷺ told Abu Dharr how a bad deed is wiped out. What did he say to do?", "Fast three days", "Give away all your wealth", "Keep it secret"]
  },
  "Where should we be mindful of Allah?": {
    answer: "Wherever we are",
    harder: ["'Fear Allah ...' where, says Tirmidhi 1987?", "In the masjid and at home", "In Ramadan and on Fridays", "When people can see us"]
  },
  "How should we treat people, says this hadith?": {
    answer: "With good character",
    harder: ["Tirmidhi 1987 ends with how to deal with people. How?", "With fairness only to friends", "With silence", "With caution and distance"]
  },
  // Muslim 38 (Sufyan ibn Abdullah ath-Thaqafi): say I believe in Allah, then be steadfast.
  "What did he ﷺ tell Sufyan to say?": {
    answer: "I believe in Allah",
    harder: ["Sufyan asked for one saying about Islam. What did he ﷺ tell him to say?", "La ilaha illallah", "Astaghfirullah", "Alhamdulillah"],
    expert: ["Sufyan ibn Abdullah wanted a saying so complete he would ask no one else. What came first?", "Pray five times", "Be steadfast", "Fear Allah"]
  },
  "And after saying it?": {
    answer: "Stay firm on it",
    harder: ["'Say: I believe in Allah, then ...' what?", "Repeat it every day", "Teach it to others", "Write it down"],
    expert: ["Sufyan ibn Abdullah was told: say 'I believe in Allah', and then what?", "Pray at night", "Keep quiet", "Travel to learn"]
  },
  "Being steadfast means staying on the right path every day.": {
    answer: "True",
    harder: "Sufyan ibn Abdullah was told: say 'I believe in Allah', then be steadfast."
  },
  // Muslim 2699.
  "Seeking knowledge makes which path easy?": {
    answer: "The path to Jannah",
    harder: ["Whoever travels a path seeking knowledge, Allah makes easy for him which path?", "The path of wealth", "The path of fame", "The path to a good job"]
  },
  // Bukhari 71 (Mu'awiyah): whoever Allah wants good for, He gives understanding of the religion.
  "What does Allah give someone He wants good for?": {
    answer: "Understanding of the religion",
    harder: ["Bukhari 71: when Allah wants good for someone, what does He give him?", "A long life", "Many followers", "A good name"]
  },
  "He ﷺ said: I distribute, but who gives?": {
    answer: "Allah",
    harder: ["'I am only the one who shares out', he ﷺ said. Who is the Giver?", "The rich", "The rulers", "The Companions"]
  },
  // Bukhari 3461: convey from me, even one ayah.
  "How much should we pass on?": {
    answer: "Even one verse",
    harder: ["How much of what you learned from him ﷺ should you pass on?", "Only what you know by heart", "Only after years of study", "Only to your family"],
    expert: ["'Convey from me, even if it is ...' (Bukhari 3461). How much?", "a whole surah", "ten hadith", "a full book"]
  },
  "Only scholars may share what they know.": {
    answer: "False",
    harder: "Bukhari 3461 says only those who know a whole surah by heart may pass anything on."
  }
};
