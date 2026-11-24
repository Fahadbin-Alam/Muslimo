import type { TierEntry } from "../questionTiers";

/**
 * Harder versions for the Scholars topic (585 questions).
 * Each keeps the original answer and the lesson's own source.
 */
export const SCHOLARS_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 82.
  "In the dream, what did the Prophet ﷺ give Umar?": { answer: "His leftover milk", harder: ["Bukhari 82: he ﷺ drank from the cup in the dream, then gave Umar what?", "A sword", "A ring", "A book"] },
  "What did the milk in the dream mean?": { answer: "Knowledge", harder: ["Bukhari 82: asked what the leftover milk meant, what did he ﷺ say?", "Power", "A long life", "Wealth"] },
  "Umar's knowledge came from the Prophet ﷺ.": { answer: "True", harder: "By Bukhari 82, Umar's share of knowledge was what was left after the Prophet ﷺ drank." },
  // Sahih al-Bukhari 1.
  "Which hadith did Umar teach from the minbar?": { answer: "Actions are only by intentions", harder: ["Bukhari 1: which hadith did Umar narrate from the minbar?", "Smiling is charity", "Do not be angry", "The strong man controls himself"] },
  "Where is this hadith in Sahih al-Bukhari?": { answer: "It is the very first", harder: ["Al-Bukhari placed 'Actions are only by intentions' where in his Sahih?", "It is the last", "It is not in it", "It is in the middle"] },
  "Al-Bukhari's chain for this hadith goes through Umar to the Prophet ﷺ.": { answer: "True", harder: "In Bukhari 1, Umar says from the minbar: I heard the Messenger of Allah ﷺ say it." },
  // Sahih Muslim 8a.
  "Who came in very white clothes to ask the Prophet ﷺ?": { answer: "Jibril", harder: ["Muslim 8a: Umar says a man in very white clothes came. Who was he?", "A trader from Yemen", "Bilal", "Abu Bakr"] },
  "Which three did Jibril ask about?": { answer: "Islam, Iman and Ihsan", harder: ["Muslim 8a: the man in white asked about the Hour and which three?", "Musa, Isa and Ibrahim", "Salah, Zakah and Hajj", "Makkah, Madinah and Quds"] },
  "Why did Jibril come?": { answer: "To teach the Muslims their religion", harder: ["Muslim 8a: 'that was Jibril, he came...' why?", "To bring a new book", "To lead the prayer", "To warn of an army"] },
  // Sahih al-Bukhari 3689.
  "Who did the Prophet ﷺ say would be the inspired one of his Ummah?": { answer: "Umar", harder: ["Bukhari 3689: 'if there is such a one in my Ummah, it is...' whom?", "Abu Jahl", "Abu Sufyan", "Khalid ibn al-Walid"] },
  "What does 'inspired' mean in this hadith?": { answer: "Guided to the right view, but not a prophet", harder: ["Bukhari 3689: 'inspired, though not prophets.' What does inspired mean?", "Someone who knows the unseen", "A poet", "A new prophet"] },
  "Umar was a prophet.": { answer: "False", harder: "By Bukhari 3689, the inspired ones were people who received prophethood." },
  // Sahih al-Bukhari 2062.
  "What did Umar ask Abu Musa to bring?": { answer: "A witness for the hadith", harder: ["Bukhari 2062: about asking leave three times, Umar told Abu Musa to bring what?", "A written book", "A gift", "His sword"] },
  "Who bore witness for Abu Musa?": { answer: "Abu Sa'id al-Khudri", harder: ["Bukhari 2062: Umar wanted a witness. Who bore witness for Abu Musa?", "Uthman", "Ali", "Abu Bakr"] },
  "Umar said he missed this hadith because trade in the markets kept him busy.": { answer: "True", harder: "By Bukhari 2062, Umar blamed his business in the markets for missing this hadith." },
  // Siyar A'lam an-Nubala 1/486.
  "Whom did Umar send to Kufa as its teacher?": { answer: "Abdullah ibn Mas'ud", harder: ["Siyar 1/486: Ammar as governor, and who as teacher of Kufa?", "Bilal", "Abu Hurayrah", "Salman al-Farisi"] },
  "What did Umar mean by 'I preferred you over myself'?": { answer: "He gave up a scholar he needed", harder: ["Siyar 1/486: Umar wrote 'I preferred you over myself' in sending Ibn Mas'ud. What did he mean?", "He wanted to leave Madinah", "He disliked Ibn Mas'ud", "He was sending gold"] },
  "Ammar and Ibn Mas'ud had both fought at Badr.": { answer: "True", harder: "By Siyar 1/486, Umar described both men he sent to Kufa as people of Badr." },
  // Sahih al-Bukhari 4970.
  "Why did Umar seat young Ibn Abbas with the elders of Badr?": { answer: "Because of his knowledge", harder: ["Bukhari 4970: the elders of Badr wondered why young Ibn Abbas sat with them. Why?", "Because he was a governor", "Because he was rich", "Because he was the oldest"] },
  "Which surah did Umar ask them about?": { answer: "An-Nasr", harder: ["Bukhari 4970: Umar tested the elders and Ibn Abbas on which surah?", "Al-Ikhlas", "Al-Asr", "Al-Fatihah"] },
  "Umar agreed with Ibn Abbas's meaning of the surah.": { answer: "True", harder: "By Bukhari 4970, Umar said he knew of the surah only what Ibn Abbas said." },
  // Siyar A'lam an-Nubala 2/135.
  "What is fiqh?": { answer: "Understanding the rulings of the religion", harder: ["Siyar 2/135 calls Aishah the woman with the most fiqh. What is fiqh?", "Writing Arabic poems", "Learning the stars", "Telling old stories"] },
  "Whose daughter was Aishah?": { answer: "Abu Bakr", harder: ["Siyar 2/135: Aishah, Mother of the Believers, was the daughter of whom?", "Ali", "Umar", "Uthman"] },
  "Of all the women of this Ummah, Aishah had the most fiqh.": { answer: "True", harder: "By Siyar 2/135, no woman of the whole Ummah had more fiqh than Aishah." },
  // Sahih al-Bukhari 103.
  "What did Aishah do when she did not understand something?": { answer: "She asked again until she understood", harder: ["Bukhari 103: what was Aishah's habit with anything she did not understand?", "She stayed quiet", "She guessed the meaning", "She waited for years"] },
  "Which ayah did Aishah ask the Prophet ﷺ about?": { answer: "He will have an easy reckoning", harder: ["Bukhari 103: which phrase of the Quran did Aishah question?", "Read in the name of your Lord", "Say: He is Allah, One", "By time"] },
  "The Prophet ﷺ said the easy reckoning is only the showing of the deeds.": { answer: "True", harder: "By Bukhari 103, 'an easy reckoning' means only the showing of the deeds." },
  // Siyar A'lam an-Nubala 2/139.
  "About how many hadith did Aishah narrate?": { answer: "2,210", harder: ["Siyar 2/139: the Musnad of Aishah reaches how many hadith?", "22", "210", "22,000"] },
  "How many of her hadith are in BOTH al-Bukhari and Muslim?": { answer: "174", harder: ["Siyar 2/139: al-Bukhari alone has 54, Muslim alone 69. How many do both share?", "2,210", "4", "54"] },
  "Only men narrated hadith from the Prophet ﷺ.": { answer: "False", harder: "By Siyar 2/139, no woman narrated enough hadith to have a Musnad of her own." },
  // Siyar A'lam an-Nubala 2/137.
  "Which of these men narrated hadith from Aishah?": { answer: "Ibn Abbas", harder: ["Siyar 2/137 lists those who narrated from Aishah. Which Sahabi is among them?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Which Tabi'i on the tree also narrated from Aishah?": { answer: "Ata ibn Abi Rabah", harder: ["Siyar 2/137: which Tabi'i scholar narrated from Aishah?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Aishah taught both Sahabah and Tabi'in.": { answer: "True", harder: "By Siyar 2/137, both companions like Ibn Umar and Tabi'in like Ata narrated from Aishah." },
  // Siyar A'lam an-Nubala 2/182.
  "What did the senior Sahabah ask Aishah about?": { answer: "The shares of inheritance", harder: ["Siyar 2/182: Masruq saw the senior Sahabah asking Aishah about what?", "Building houses", "Poetry contests", "Trade routes"] },
  "Who said he saw the senior Sahabah asking her?": { answer: "Masruq", harder: ["Siyar 2/182: 'By Allah, I saw the senior companions asking her.' Who said it?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "The senior Sahabah never asked a woman about the religion.": { answer: "False", harder: "By Siyar 2/182, the senior companions avoided asking Aishah about inheritance." },
  // Siyar A'lam an-Nubala 2/183.
  "How did Aishah learn medicine?": { answer: "By listening and memorizing", harder: ["Siyar 2/183: Aishah knew medicine. Urwah's report says she learned it how?", "She never learned it", "From Greek books", "At a school in Sham"] },
  "Urwah listed what Aishah knew well. Which was NOT on his list?": { answer: "Building ships", harder: ["Siyar 2/183: Urwah listed Aishah's fields of knowledge. Which was not one?", "Medicine", "Family lines", "Poetry"] },
  "Aishah's knowledge was only about women's matters.": { answer: "False", harder: "By Siyar 2/183, Urwah said Aishah's knowledge covered only matters for women." },
  // Siyar A'lam an-Nubala 2/185.
  "Az-Zuhri said: put Aishah's knowledge beside all the women's, and...": { answer: "hers would be greater", harder: ["Siyar 2/185: az-Zuhri weighed Aishah's knowledge against all the women's. Result?", "they would be equal", "hers would be less", "no one could tell"] },
  "Ata said Aishah had the most ___ of people.": { answer: "fiqh", harder: ["Siyar 2/185: 'Aishah had the most ____ of people, and the best opinion,' said Ata.", "servants", "camels", "wealth"] },
  "Ata and az-Zuhri, who praised her, are both on the scholars tree.": { answer: "True", harder: "By Siyar 2/185, both Ata ibn Abi Rabah and az-Zuhri praised Aishah's knowledge." },
  // Siyar A'lam an-Nubala 1/465.
  "What was Ibn Mas'ud's work as a boy?": { answer: "Herding sheep", harder: ["Siyar 1/465: Ibn Mas'ud worked for Uqbah ibn Abi Mu'ayt. Doing what?", "Making swords", "Fishing", "Selling cloth"] },
  "What did the Prophet ﷺ say to him?": { answer: "You are a boy who will be taught", harder: ["Siyar 1/465: after 'teach me', what did he ﷺ say to the young Ibn Mas'ud?", "You will be a king", "Go home", "You will be rich"] },
  "Ibn Mas'ud asked the Prophet ﷺ to teach him.": { answer: "True", harder: "By Siyar 1/465, it was Ibn Mas'ud who said 'teach me' to the Prophet ﷺ." },
  // Sahih al-Bukhari 5000.
  "How many surahs did Ibn Mas'ud learn straight from the Prophet ﷺ?": { answer: "Over seventy", harder: ["Bukhari 5000: 'I took ____ surahs from the mouth of the Messenger of Allah ﷺ.' How many?", "Seven hundred", "Seven", "Seventeen"] },
  "What did Ibn Mas'ud say after this?": { answer: "I am not the best of them", harder: ["Bukhari 5000: Ibn Mas'ud knew the Quran well, but how did he describe himself?", "Do not ask others", "I know everything", "I am the best of them"] },
  "The Sahabah knew Ibn Mas'ud was among those who knew the Quran best.": { answer: "True", harder: "By Bukhari 5000, the companions knew Ibn Mas'ud was among those who knew the Book best." },
  // Sahih al-Bukhari 3758.
  "Whose name came first among the four Quran teachers?": { answer: "Abdullah ibn Mas'ud", harder: ["Bukhari 3758: 'learn the Quran from four.' Who is named first?", "Ubayy ibn Ka'b", "Salim", "Mu'adh ibn Jabal"] },
  "Which of these was NOT one of the four?": { answer: "Abu Hurayrah", harder: ["Bukhari 3758 names four Quran teachers. Who is not one of them?", "Ubayy ibn Ka'b", "Mu'adh ibn Jabal", "Salim"] },
  "The Prophet ﷺ chose Ibn Mas'ud as a teacher of the Quran.": { answer: "True", harder: "By Bukhari 3758, Ibn Mas'ud is one of the four the Prophet ﷺ named for learning the Quran." },
  // Sahih al-Bukhari 4582.
  "Which surah did Ibn Mas'ud recite to the Prophet ﷺ?": { answer: "An-Nisa", harder: ["Bukhari 4582: Ibn Mas'ud recited until 4:41. Which surah is that?", "Al-Baqarah", "Yasin", "Al-Mulk"] },
  "Why did the Prophet ﷺ want to hear it from him?": { answer: "He liked to hear it from others", harder: ["Bukhari 4582: 'shall I recite to you when it was sent down to you?' His ﷺ answer?", "To test his Arabic", "To end a dispute", "He had forgotten it"] },
  "The Prophet ﷺ wept when Ibn Mas'ud reached 4:41.": { answer: "True", harder: "By Bukhari 4582, the Prophet's ﷺ eyes were flowing with tears at ayah 4:41." },
  // Sahih al-Bukhari 5002.
  "What did Ibn Mas'ud say he knew about every surah?": { answer: "Where it came down", harder: ["Bukhari 5002: 'there is no surah but I know...' what?", "How long it takes to read", "How much it weighs", "Which tribe liked it best"] },
  "What would he do if someone knew the Quran better?": { answer: "Travel to him to learn", harder: ["Bukhari 5002: if someone knew the Book better and a camel could reach him, Ibn Mas'ud would what?", "Ignore him", "Argue with him", "Write him a letter"] },
  "Even a great scholar keeps wanting to learn more.": { answer: "True", harder: "Bukhari 5002 shows that even Ibn Mas'ud would still travel to learn from someone who knew more." },
  // Siyar A'lam an-Nubala 1/491.
  "What did Umar call Ibn Mas'ud?": { answer: "A small vessel full of knowledge", harder: ["Siyar 1/491: watching short Ibn Mas'ud leave, what did Umar call him?", "A tall tree", "A lion of war", "A rich merchant"] },
  "What does this teach?": { answer: "Worth is in knowledge and faith, not looks", harder: ["Siyar 1/491: the seated men nearly hid him, yet Umar praised him. What does it teach?", "Tall people are wiser", "Only rich people learn", "Looks matter most"] },
  "Ibn Mas'ud was very tall.": { answer: "False", harder: "By Siyar 1/491, Ibn Mas'ud stood taller than the men sitting around Umar." },
  // Siyar A'lam an-Nubala 1/485.
  "Which student of Ibn Mas'ud grew to be like him?": { answer: "Alqamah ibn Qays", harder: ["Siyar 1/485: 'and he was likened to Abdullah.' Which student?", "Abu Lahab", "Musaylimah", "Abu Jahl"] },
  "Who did Ibn Mas'ud resemble in his manner?": { answer: "The Prophet ﷺ", harder: ["Siyar 1/485: in guidance, manner and bearing, Ibn Mas'ud resembled whom?", "Khalid", "Abu Bakr", "Umar"] },
  "Students learn manners from teachers, not only facts.": { answer: "True", harder: "Siyar 1/485 shows Alqamah took manner and bearing from Ibn Mas'ud, not only facts." },
  // Sahih al-Bukhari 75.
  "What did the Prophet ﷺ ask Allah to teach Ibn Abbas?": { answer: "The Book (the Quran)", harder: ["Bukhari 75: 'O Allah, teach him...' what?", "Poetry", "Trade", "Archery"] },
  "What was Ibn Abbas to the Prophet ﷺ?": { answer: "His cousin", harder: ["Bukhari 75: the boy he ﷺ embraced, Ibn Abbas, was his what?", "His son", "His uncle", "His grandson"] },
  "The Prophet ﷺ made dua for Ibn Abbas while hugging him.": { answer: "True", harder: "By Bukhari 75, he ﷺ embraced Ibn Abbas when he made this dua." },
  // Sahih al-Bukhari 143.
  "What had Ibn Abbas put out for the Prophet ﷺ?": { answer: "Water for wudu", harder: ["Bukhari 143: the Prophet ﷺ asked who had put out what?", "Dates for iftar", "A cushion", "His sandals"] },
  "What did the Prophet ﷺ ask Allah to give him?": { answer: "Understanding of the religion", harder: ["Bukhari 143: 'O Allah, give him...' what?", "A strong horse", "Gold", "A large family"] },
  "A small kindness earned Ibn Abbas a great dua.": { answer: "True", harder: "By Bukhari 143, putting out wudu water earned Ibn Abbas a dua for understanding." },
  // Siyar A'lam an-Nubala 3/331.
  "What is tafsir?": { answer: "Explaining the meaning of the Quran", harder: ["Siyar 3/331 calls Ibn Abbas 'the imam of tafsir'. What is tafsir?", "Learning to write", "Counting stars", "A kind of fast"] },
  "Which title belongs to Ibn Abbas?": { answer: "Scholar of the Ummah", harder: ["Siyar 3/331: which title is given to Ibn Abbas?", "Sword of Allah", "The Truthful", "Lion of Allah"] },
  "The Prophet's ﷺ dua for Ibn Abbas came true.": { answer: "True", harder: "Siyar 3/331, calling him the imam of tafsir, shows the dua 'teach him the Book' came true." },
  // Siyar A'lam an-Nubala 3/343.
  "What did Ibn Abbas do while the Sahabi napped?": { answer: "Waited at his door", harder: ["Siyar 3/343: with dust blowing on him, Ibn Abbas did what at the napping man's door?", "Woke him up", "Went home", "Sent a servant"] },
  "Why did he not let the man come to him?": { answer: "The student should go to the teacher", harder: ["Siyar 3/343: 'shall I not send for you?' Why did Ibn Abbas refuse?", "He was not allowed", "He wanted a gift", "He was too tired"] },
  "Ibn Abbas used his family's rank to make scholars come to him.": { answer: "False", harder: "By Siyar 3/343, Ibn Abbas, cousin of the Messenger ﷺ, had the man sent to him." },
  // Siyar A'lam an-Nubala 3/344.
  "How many Sahabah did Ibn Abbas ask about one matter?": { answer: "Thirty", harder: ["Siyar 3/344: Ibn Abbas asked how many companions about a single matter?", "Three", "Three hundred", "One"] },
  "What does this teach a student?": { answer: "Check carefully before you are sure", harder: ["Siyar 3/344: thirty companions for one matter. The lesson for a student?", "Ask only one person", "Never ask anyone", "Trust any rumour"] },
  "Adh-Dhahabi said the chain of this report is sahih.": { answer: "True", harder: "By Siyar 3/344, adh-Dhahabi graded this report's chain as sahih." },
  // Siyar A'lam an-Nubala 3/350.
  "What was Ibn Abbas called because of his knowledge?": { answer: "Al-Bahr, the sea", harder: ["Siyar 3/350: what nickname did Ibn Abbas get for his much knowledge?", "As-Siddiq", "Dhun-Nurayn", "Al-Faruq"] },
  "Which of his students said he was called the sea?": { answer: "Mujahid", harder: ["Siyar 3/350: who reported that Ibn Abbas was called al-Bahr?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Tawus said he saw no one more learned than Ibn Abbas.": { answer: "True", harder: "By Siyar 3/350, Tawus saw no one more learned than Ibn Abbas." },
  // Siyar A'lam an-Nubala 3/347.
  "What did Ibn Mas'ud call Ibn Abbas?": { answer: "Interpreter of the Quran", harder: ["Siyar 3/347: 'what an excellent tarjuman...' What did Ibn Mas'ud call Ibn Abbas?", "The trustee of the Ummah", "Sword of Islam", "The caller to prayer"] },
  "Ibn Mas'ud said: if Ibn Abbas had reached our age...": { answer: "none of us would come near him", harder: ["Siyar 3/347: had Ibn Abbas reached our age, said Ibn Mas'ud, then what?", "he would forget it all", "he would leave Makkah", "he would be caliph"] },
  "Ibn Mas'ud was jealous of young Ibn Abbas.": { answer: "False", harder: "By Siyar 3/347, the older Ibn Mas'ud spoke against the young Ibn Abbas." },
  // Siyar A'lam an-Nubala 3/332.
  "To whom did Ibn Abbas read the Quran?": { answer: "Ubayy ibn Ka'b and Zayd ibn Thabit", harder: ["Siyar 3/332: Ibn Abbas himself read the Quran to which two?", "Malik and Nafi", "Al-Bukhari and Muslim", "Mujahid and Ata"] },
  "Who read the Quran to Ibn Abbas?": { answer: "Mujahid and Sa'id ibn Jubayr", harder: ["Siyar 3/332: which of his students read the Quran to Ibn Abbas?", "Ubayy and Zayd", "Umar and Abu Bakr", "Malik and ash-Shafi'i"] },
  "Ibn Abbas was a student before he became a teacher.": { answer: "True", harder: "By Siyar 3/332, Ibn Abbas read to Ubayy and Zayd, then Mujahid read to him." },
  // Siyar A'lam an-Nubala 3/204.
  "Who was Abdullah ibn Umar's father?": { answer: "Umar ibn al-Khattab", harder: ["Siyar 3/204: Abdullah ibn Umar was son of which caliph?", "Abu Hurayrah", "Abu Bakr", "Uthman"] },
  "What was Ibn Umar's first battle?": { answer: "The Trench", harder: ["Siyar 3/204: too young at Uhud, Ibn Umar's first battle was which?", "Uhud", "Yarmuk", "Badr"] },
  "Ibn Umar narrated from Abu Bakr, Uthman and Ali as well as the Prophet ﷺ.": { answer: "True", harder: "By Siyar 3/204, Ibn Umar narrated from Abu Bakr, Uthman and Ali too." },
  // Sahih al-Bukhari 3739.
  "What did the Prophet ﷺ wish Ibn Umar would do?": { answer: "Pray at night", harder: ["Bukhari 3739: 'what an excellent man Abdullah is, if only he...' what?", "Move to Makkah", "Write poetry", "Trade more"] },
  "Who took Ibn Umar's dream to the Prophet ﷺ?": { answer: "Hafsah, his sister", harder: ["Bukhari 3739: Ibn Umar told his dream to whom, who told the Prophet ﷺ?", "Aishah", "His mother", "Abu Bakr"] },
  "After this, Ibn Umar slept only a little at night.": { answer: "True", harder: "By Bukhari 3739, after that Ibn Umar slept only a little of the night." },
  // Siyar A'lam an-Nubala 3/221.
  "For how long did Ibn Umar give fatwa?": { answer: "Sixty years", harder: ["Siyar 3/221: Malik said Ibn Umar gave the people fatwa for how long?", "Six months", "Six years", "Six hundred years"] },
  "What is a fatwa?": { answer: "An answer on a matter of religion", harder: ["Siyar 3/221: Ibn Umar gave fatwa for sixty years. What is a fatwa?", "A tax", "A battle plan", "A kind of prayer"] },
  "Imam Malik, from Madinah, praised Ibn Umar as an imam of Madinah.": { answer: "True", harder: "By Siyar 3/221, Imam Malik called Ibn Umar the imam of the people after Zayd ibn Thabit." },
  // Siyar A'lam an-Nubala 3/222.
  "Who answered almost every question at Hajj time?": { answer: "Ibn Abbas", harder: ["Siyar 3/222: at Hajj time, which of the two answered nearly everything asked?", "Ibn Umar", "Nafi", "Imam Malik"] },
  "Why would a scholar turn a question away?": { answer: "To avoid speaking about Allah's religion without sure knowledge", harder: ["Siyar 3/222: Ibn Umar turned back more than he answered. Why would a scholar do that?", "He was lazy", "He disliked people", "He was paid not to answer"] },
  "Nafi sat with Ibn Umar one day and Ibn Abbas the next.": { answer: "True", harder: "By Siyar 3/222, Nafi reports Ibn Umar and Ibn Abbas sat for the pilgrims." },
  // Siyar A'lam an-Nubala 3/213.
  "What did Ibn Umar care about most?": { answer: "Following the Prophet's ﷺ way", harder: ["Siyar 3/213: Malik said Ibn Umar followed what, and cared about it greatly?", "Becoming caliph", "Winning debates", "Gathering wealth"] },
  "Which imam reported this about Ibn Umar?": { answer: "Imam Malik", harder: ["Siyar 3/213: 'Ibn Umar followed the traces and ways of the Messenger ﷺ.' Who said it?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "The sunnah is the way of the Prophet ﷺ.": { answer: "True", harder: "Siyar 3/213 describes Ibn Umar following the ways of the Prophet ﷺ, which is his sunnah." },
  // Siyar A'lam an-Nubala 3/222.
  "What did Ibn Umar say first, when asked for all knowledge?": { answer: "Knowledge is a lot", harder: ["Siyar 3/222: 'write me all of knowledge.' How did Ibn Umar's reply begin?", "Here it is", "Ask my father", "Come back next year"] },
  "He said: meet Allah with none of people's ___ on you.": { answer: "blood", harder: ["Siyar 3/222: meet Allah with no people's ____ on you, and none of their wealth in your stomach.", "camels", "poems", "letters"] },
  "His advice was to keep to the main body (jama'ah) of the Muslims.": { answer: "True", harder: "By Siyar 3/222, Ibn Umar's letter ended by telling him to keep to the jama'ah of the Muslims." },
  // Sahih Muslim 650a.
  "Who was Nafi?": { answer: "Ibn Umar's freed servant", harder: ["Muslim 650a: 'Malik, from Nafi, from Ibn Umar.' Who was Nafi?", "A Sahabi from Yemen", "A judge of Kufa", "Ibn Umar's father"] },
  "Prayer in congregation is how many degrees better than alone?": { answer: "Twenty-seven", harder: ["Muslim 650a: congregation prayer beats prayer alone by how many degrees?", "Two", "Seven", "Seventy"] },
  "This chain runs: Malik, then Nafi, then Ibn Umar, then the Prophet ﷺ.": { answer: "True", harder: "By Muslim 650a, Nafi heard it from Ibn Umar, and Malik heard it from Nafi." },
  // Sahih al-Bukhari 1.
  "Who did Alqamah ibn Waqqas hear on the minbar?": { answer: "Umar ibn al-Khattab", harder: ["Bukhari 1: whom did Alqamah ibn Waqqas hear on the minbar?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Which hadith did he hear from Umar?": { answer: "Actions are by intentions", harder: ["Bukhari 1: Alqamah ibn Waqqas heard which hadith from Umar?", "The strong man controls his anger", "Smiling is charity", "Cleanliness is half of faith"] },
  "Alqamah ibn Waqqas was a student of the Sahabah.": { answer: "True", harder: "By Bukhari 1, Alqamah ibn Waqqas heard Umar, a Sahabi, directly." },
  // Siyar A'lam an-Nubala 4/61.
  "In which city was Alqamah ibn Waqqas a scholar?": { answer: "Madinah", harder: ["Siyar 4/61: Alqamah ibn Waqqas al-Laythi was one of the scholars of which city?", "Cairo", "Kufa", "Baghdad"] },
  "Which of these did he learn from?": { answer: "Aishah", harder: ["Siyar 4/61: Alqamah ibn Waqqas narrated from Umar, Ibn Umar and whom?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Alqamah ibn Waqqas narrated thousands of hadith.": { answer: "False", harder: "By Siyar 4/61, Alqamah ibn Waqqas was a narrator of very many hadith." },
  // Siyar A'lam an-Nubala 4/61.
  "What does thiqah mean?": { answer: "Trustworthy", harder: ["Siyar 4/61: Ibn Sa'd and an-Nasa'i called him thiqah. Meaning?", "Weak", "Unknown", "Forgetful"] },
  "Where are his hadith found?": { answer: "In all six books of hadith", harder: ["Siyar 4/61: where are the hadith of Alqamah ibn Waqqas found?", "Only in poems", "Only in history books", "In no books"] },
  "A narrator can be trusted even if he narrated only a few hadith.": { answer: "True", harder: "By Siyar 4/61, Alqamah ibn Waqqas narrated few hadith, yet was called thiqah." },
  // Siyar A'lam an-Nubala 4/61.
  "Which student passed on Umar's hadith of intentions from him?": { answer: "Muhammad at-Taymi", harder: ["Siyar 4/61: which of Alqamah ibn Waqqas's students carried the hadith of intentions?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Which great scholar of Madinah also learned from him?": { answer: "Az-Zuhri", harder: ["Siyar 4/61: which great scholar, Ibn Shihab, narrated from Alqamah ibn Waqqas?", "Abu Jahl", "Musaylimah", "Abu Lahab"] },
  "Put the chain in order, from the top.": { answer: "Umar, Alqamah, at-Taymi", harder: ["Siyar 4/61: for 'actions are by intentions', which order is right, from the top?", "Umar, at-Taymi, Alqamah", "At-Taymi, Alqamah, Umar", "Alqamah, Umar, at-Taymi"] },
  // Siyar A'lam an-Nubala 4/421.
  "Who was Urwah's aunt and teacher?": { answer: "Aishah", harder: ["Siyar 4/421: Urwah kept close to which aunt and learned fiqh from her?", "Khadijah", "Fatimah", "Maryam"] },
  "Who was Urwah's mother?": { answer: "Asma, daughter of Abu Bakr", harder: ["Siyar 4/421: Urwah was son of az-Zubayr and of whom?", "Aishah", "Fatimah", "Hafsah"] },
  "Urwah was one of the seven fuqaha of Madinah.": { answer: "True", harder: "By Siyar 4/421, Urwah ibn az-Zubayr was counted among the seven fuqaha of Madinah." },
  // Siyar A'lam an-Nubala 4/422.
  "Which of these was Urwah's student?": { answer: "His son Hisham", harder: ["Siyar 4/422: which of these narrated from Urwah?", "Aishah", "Asma", "Umar ibn al-Khattab"] },
  "Which of his students taught Imam Malik?": { answer: "Az-Zuhri", harder: ["Siyar 4/422: which student of Urwah went on to teach Imam Malik?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Urwah's own son Hisham learned from him.": { answer: "True", harder: "By Siyar 4/422, Hisham, Urwah's own son, is among those who narrated from him." },
  // Siyar A'lam an-Nubala 4/424.
  "What did Urwah tell young people?": { answer: "Learn now, you will be the elders", harder: ["Siyar 4/424: 'you are the young of a people...' What did Urwah tell them?", "Do not ask questions", "Play now, learn later", "Only old people should learn"] },
  "How did Urwah learn from the Sahabah?": { answer: "He went to their doors to ask them", harder: ["Siyar 4/424: how did Urwah gather hadith from the companions?", "He waited for letters", "He read it in newspapers", "He never asked anyone"] },
  "Urwah tried to collect every hadith Aishah had.": { answer: "True", harder: "By Siyar 4/424, Urwah made sure he had every hadith of Aishah." },
  // Siyar A'lam an-Nubala 4/425.
  "What did az-Zuhri compare Urwah to?": { answer: "A sea that buckets cannot muddy", harder: ["Siyar 4/425: az-Zuhri found Urwah like what?", "A small well", "A dry river", "A cup of water"] },
  "Which ruler, known for justice, praised Urwah?": { answer: "Umar ibn Abd al-Aziz", harder: ["Siyar 4/425: 'none was more knowledgeable than Urwah.' Which ruler said it?", "Namrud", "Fir'awn", "Abu Jahl"] },
  "Az-Zuhri, who praised him, was his student.": { answer: "True", harder: "Az-Zuhri, who in Siyar 4/425 called Urwah a sea, had narrated from Urwah himself." },
  // Siyar A'lam an-Nubala 4/430.
  "What did Urwah say when he lost his leg?": { answer: "You took, but You left me much", harder: ["Siyar 4/430: 'O Allah, if You took...' how did Urwah finish?", "I give up", "Nothing is left", "Why me?"] },
  "What does Urwah's story teach?": { answer: "Patience and thanks in hard times", harder: ["Siyar 4/430: after losing his leg, Urwah praised Allah. The lesson?", "Blame others", "Complain loudly", "Stop worshipping"] },
  "Urwah's test made him stop his worship.": { answer: "False", harder: "By Siyar 4/430, Urwah skipped his part of the Quran the night his leg was cut off." },
  // Siyar A'lam an-Nubala 5/95.
  "Which Sahabi was Nafi's teacher?": { answer: "Abdullah ibn Umar", harder: ["Siyar 5/95: Nafi was the mawla of which Sahabi?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Nafi became the mufti of which city?": { answer: "Madinah", harder: ["Siyar 5/95: Nafi was the mufti and scholar of which city?", "Kufa", "Baghdad", "Cairo"] },
  "A freed man could become a great scholar.": { answer: "True", harder: "By Siyar 5/95, Nafi, a freed mawla, became the mufti of Madinah." },
  // Siyar A'lam an-Nubala 5/97.
  "Al-Bukhari called which chain the soundest?": { answer: "Malik, from Nafi, from Ibn Umar", harder: ["Siyar 5/97: which chain did al-Bukhari call the soundest of chains?", "Ibn Baz, from Ibn Taymiyyah", "Abu Jahl, from Abu Lahab", "Nafi, from Imam al-Bukhari"] },
  "Who is in the middle of this chain?": { answer: "Nafi", harder: ["Siyar 5/97: Malik, from ____, from Ibn Umar. Who is the middle link?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Imam Malik learned from Nafi.": { answer: "True", harder: "By Siyar 5/97, in the soundest chain Malik narrates from Nafi." },
  // Sahih Muslim 650a.
  "How much better is prayer in congregation?": { answer: "27 degrees", harder: ["Muslim 650a: by how many degrees is congregation prayer better than prayer alone?", "2 degrees", "7 degrees", "100 degrees"] },
  "Who passed this hadith from Ibn Umar to Malik?": { answer: "Nafi", harder: ["Muslim 650a: Malik heard it from whom, who heard it from Ibn Umar?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Praying together has more reward than praying alone.": { answer: "True", harder: "By Muslim 650a, congregation prayer is twenty-seven degrees better than prayer alone." },
  // Siyar A'lam an-Nubala 5/97.
  "Where was Nafi sent to teach the sunnah?": { answer: "Egypt", harder: ["Siyar 5/97: Umar ibn Abd al-Aziz sent Nafi where to teach the sunnah?", "India", "China", "Spain"] },
  "About how many times did Nafi do Hajj and Umrah with Ibn Umar?": { answer: "Thirty-some", harder: ["Siyar 5/97: how many times did Nafi go on Hajj and Umrah with Ibn Umar?", "Three hundred", "Once", "Three"] },
  "Nafi learned by travelling with his teacher.": { answer: "True", harder: "By Siyar 5/97, Nafi went on Hajj and Umrah with Ibn Umar thirty-some times." },
  // Siyar A'lam an-Nubala 5/98.
  "What did Malik say about Nafi's words?": { answer: "Seal it", harder: ["Siyar 5/98: 'when Nafi says something...' what did Malik say to do?", "Check it ten times", "Throw it away", "Ask someone else"] },
  "What makes a narrator trusted?": { answer: "Honesty and precision", harder: ["Siyar 5/98: Nafi was called trustworthy. What makes a narrator trusted?", "Wealth", "Height", "A loud voice"] },
  "Malik thought Nafi's words needed checking with others.": { answer: "False", harder: "By Siyar 5/98, Malik said Nafi's words should first be checked against others." },
  // Siyar A'lam an-Nubala 5/79.
  "Where did Ata give fatwa?": { answer: "At the Haram in Makkah", harder: ["Siyar 5/80: the fatwa of Makkah came to rest with Ata. Where did he give it?", "In Baghdad", "In Cairo", "In Damascus"] },
  "Which of the four imams learned from Ata?": { answer: "Abu Hanifah", harder: ["Siyar 5/79: which of the four imams was among Ata's students?", "Imam Ahmad", "Ash-Shafi'i", "None of them"] },
  "Ata learned from Sahabah like Ibn Abbas and Aishah.": { answer: "True", harder: "By Siyar 5/79, Ata narrated from Aishah, Ibn Abbas and Abu Hurayrah." },
  // Siyar A'lam an-Nubala 5/80.
  "What made Ata great?": { answer: "His knowledge and taqwa", harder: ["Siyar 5/80: black, lame, weak in one hand, then blind, yet he led Makkah. In what was Ata great?", "His money", "His tribe", "His looks"] },
  "What happened to Ata's sight later?": { answer: "He went blind", harder: ["Siyar 5/80: what became of Ata's eyesight in later life?", "It got better", "Nothing", "He wore glasses"] },
  "Ata's looks kept him from leading in knowledge.": { answer: "False", harder: "By Siyar 5/80, Ata's lameness and blindness kept him from leading Makkah in knowledge." },
  // Siyar A'lam an-Nubala 5/81.
  "About how many Sahabah did Ata meet?": { answer: "200", harder: ["Siyar 5/81: Ata said he met how many companions?", "2,000", "2", "20"] },
  "What did Ata know better than anyone of his time?": { answer: "The rites of Hajj", harder: ["Siyar 5/81: Abu Ja'far said none on earth knew what better than Ata?", "Building forts", "Trading horses", "Sailing ships"] },
  "Ata learned from many of the Sahabah.": { answer: "True", harder: "By Siyar 5/81, Ata met two hundred companions of the Messenger ﷺ." },
  // Siyar A'lam an-Nubala 5/82.
  "What was called out at Hajj?": { answer: "No one gives fatwa but Ata", harder: ["Siyar 5/82: in the days of Hajj, what would a caller announce?", "No one may pray", "Leave Makkah now", "Only buy from Ata"] },
  "About how many times did Ata make Hajj?": { answer: "More than 70", harder: ["Siyar 5/82: how many times did Ata make Hajj?", "Once", "Seven", "More than 700"] },
  "Pilgrims were told to take fatwa from Ata.": { answer: "True", harder: "By Siyar 5/82, a caller told the pilgrims that no one gives fatwa but Ata." },
  // Siyar A'lam an-Nubala 5/83.
  "What did Abu Hanifah say about Ata?": { answer: "I never saw anyone better", harder: ["Siyar 5/83: 'of all I met...' what did Abu Hanifah say of Ata?", "He was too strict", "He knew nothing", "I never met him"] },
  "Abu Hanifah is linked to Ibn Abbas through Ata.": { answer: "True", harder: "Siyar 5/83 shows Abu Hanifah met Ata, who had learned from Ibn Abbas." },
  // Siyar A'lam an-Nubala 4/53.
  "In which city was Alqamah ibn Qays the faqih?": { answer: "Kufa", harder: ["Siyar 4/53: Alqamah ibn Qays was the faqih, scholar and reciter of which city?", "Cairo", "Madinah", "Makkah"] },
  "Which scholar was his nephew?": { answer: "Ibrahim an-Nakha'i", harder: ["Siyar 4/53: Alqamah was the maternal uncle of which scholar?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Alqamah was born in the lifetime of the Prophet ﷺ.": { answer: "True", harder: "By Siyar 4/53, Alqamah ibn Qays was born while the Prophet ﷺ was still alive." },
  // Siyar A'lam an-Nubala 4/54.
  "Who was Alqamah's main teacher?": { answer: "Abdullah ibn Mas'ud", harder: ["Siyar 4/54: Alqamah kept close to whom until he led in knowledge?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "What did he perfect with Ibn Mas'ud?": { answer: "The Quran", harder: ["Siyar 4/54: what did Alqamah perfect with Ibn Mas'ud?", "Trade", "Archery", "Poetry"] },
  "Alqamah learned from only one Sahabi.": { answer: "False", harder: "By Siyar 4/54, Ibn Mas'ud was the only Sahabi Alqamah narrated from." },
  // Siyar A'lam an-Nubala 4/55.
  "What did Alqamah say about what he learned young?": { answer: "It stayed like writing on paper", harder: ["Siyar 4/55: Alqamah said what he memorized young was like what?", "It was useless", "He never learned young", "He forgot it all"] },
  "What did Imam Ahmad call Alqamah?": { answer: "Trustworthy, one of the good", harder: ["Siyar 4/55: how did Ahmad ibn Hanbal describe Alqamah?", "Forgetful", "Weak", "Unknown"] },
  "What you learn young can stay with you for life.": { answer: "True", harder: "By Siyar 4/55, what Alqamah memorized young stayed as clear as a sheet of paper." },
  // Siyar A'lam an-Nubala 4/55.
  "Why was seeing Alqamah like seeing Ibn Mas'ud?": { answer: "He was most like him in manner", harder: ["Siyar 4/55: 'it does not harm you not to see Abdullah.' Why, if you see Alqamah?", "He lived in his house", "They were twins", "He wore his clothes"] },
  "And who was most like Alqamah?": { answer: "Ibrahim an-Nakha'i", harder: ["Siyar 4/55: 'if you see ____, it does not harm you not to see Alqamah.' Who?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "A student can carry on his teacher's way.": { answer: "True", harder: "Siyar 4/55 shows Ibn Mas'ud's way passed to Alqamah, then to Ibrahim an-Nakha'i." },
  // Siyar A'lam an-Nubala 4/59.
  "What did Alqamah dislike?": { answer: "People following him for fame", harder: ["Siyar 4/59: 'this is Alqamah.' What did Alqamah dislike?", "Teaching", "Reading Quran", "Giving charity"] },
  "Alqamah enjoyed being famous.": { answer: "False", harder: "By Siyar 4/59, Alqamah liked people walking behind him saying: this is Alqamah." },
  // Siyar A'lam an-Nubala 5/294.
  "In which city was at-Taymi a scholar?": { answer: "Madinah", harder: ["Siyar 5/294: at-Taymi was a scholar of which city, with Salim and Nafi?", "Makkah", "Kufa", "Basra"] },
  "Which Sahabi did he see?": { answer: "Sa'd ibn Abi Waqqas", harder: ["Siyar 5/294: which Sahabi did Muhammad ibn Ibrahim at-Taymi see?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "His grandfather made the Hijrah.": { answer: "True", harder: "By Siyar 5/294, at-Taymi's grandfather al-Harith was a Muhajir." },
  // Siyar A'lam an-Nubala 5/294.
  "Which Tabi'i on the tree taught at-Taymi?": { answer: "Alqamah ibn Waqqas", harder: ["Siyar 5/294: at-Taymi narrated from Ibn Umar, Jabir, Anas and which Tabi'i?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Which of his students is on the tree?": { answer: "Yahya ibn Sa'id al-Ansari", harder: ["Siyar 5/294: who narrated from at-Taymi?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "At-Taymi learned from Sahabah and from Tabi'in.": { answer: "True", harder: "By Siyar 5/294, at-Taymi narrated from Sahabah like Jabir and Anas, and from Alqamah, a Tabi'i." },
  // Siyar A'lam an-Nubala 5/295.
  "Which famous hadith came through at-Taymi?": { answer: "Actions are by intentions", harder: ["Siyar 5/295: which hadith 'is his alone', meaning only at-Taymi carried it?", "The strong man controls his anger", "Smiling is charity", "Cleanliness is half of faith"] },
  "Who did at-Taymi hear it from?": { answer: "Alqamah ibn Waqqas", harder: ["Siyar 5/295: at-Taymi narrated 'actions are by intentions' from whom?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "The authors of the Sahih books accepted this hadith.": { answer: "True", harder: "By Siyar 5/295, the Sahih authors accepted the hadith of intentions, though at-Taymi alone carried it." },
  // Sahih al-Bukhari 1.
  "Who heard the hadith of intentions from at-Taymi?": { answer: "Yahya ibn Sa'id al-Ansari", harder: ["Bukhari 1: Sufyan, ____, at-Taymi, Alqamah, Umar. Who heard it from at-Taymi?", "Alqamah ibn Waqqas", "Imam al-Bukhari", "Umar"] },
  "If one link in a chain is weak, the whole chain is weakened.": { answer: "True", harder: "Bukhari 1's chain has six links; a weak one would weaken the whole chain." },
  // Siyar A'lam an-Nubala 5/326.
  "What is a hafiz of hadith?": { answer: "One who memorizes much hadith", harder: ["Siyar 5/326 calls az-Zuhri 'the hafiz of his time'. What is a hafiz of hadith?", "A ship captain", "A guard at a gate", "A fast runner"] },
  "Az-Zuhri is also called...": { answer: "Ibn Shihab", harder: ["Siyar 5/326: Muhammad ibn Muslim ibn ____ az-Zuhri. Which name?", "Ibn Taymiyyah", "Ibn Kathir", "Ibn Baz"] },
  "Az-Zuhri was a Tabi'i.": { answer: "True", harder: "Az-Zuhri, 'the hafiz of his time' in Siyar 5/326, was a Tabi'i." },
  // Siyar A'lam an-Nubala 5/327.
  "How long did az-Zuhri sit with Sa'id ibn al-Musayyab?": { answer: "Eight years", harder: ["Siyar 5/327: az-Zuhri learned fiqh from Sa'id ibn al-Musayyab over how long?", "Eight weeks", "Eight minutes", "Eight days"] },
  "Which Tabi'i on the tree taught him Aishah's hadith?": { answer: "Urwah ibn az-Zubayr", harder: ["Siyar 5/327: which of az-Zuhri's teachers was Aishah's nephew?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Az-Zuhri learned from just one teacher.": { answer: "False", harder: "By Siyar 5/327, Sa'id ibn al-Musayyab was az-Zuhri's only teacher." },
  // Siyar A'lam an-Nubala 5/332.
  "In how many nights did az-Zuhri memorize the Quran?": { answer: "80", harder: ["Siyar 5/332: az-Zuhri memorized the Quran in how many nights?", "800", "8,000", "8"] },
  "What did he say about his memory?": { answer: "He never forgot what he learned", harder: ["Siyar 5/332: 'I never entrusted my heart with knowledge and then...' what?", "He only remembered poems", "He forgot everything", "He could not memorize"] },
  "Az-Zuhri memorized the Quran.": { answer: "True", harder: "By Siyar 5/332, az-Zuhri memorized the Quran in eighty nights." },
  // Siyar A'lam an-Nubala 5/328.
  "Which of the four imams learned from az-Zuhri?": { answer: "Imam Malik", harder: ["Siyar 5/328: Malik, al-Layth and Sufyan narrated from az-Zuhri. Which is one of the four imams?", "None of them", "Imam Ahmad", "Ash-Shafi'i"] },
  "About how many hadith did az-Zuhri have, said Ibn al-Madini?": { answer: "2,000", harder: ["Siyar 5/328: Ibn al-Madini counted about how many hadith with az-Zuhri?", "20", "200", "200,000"] },
  "Sufyan ibn Uyaynah, on the tree, learned from az-Zuhri.": { answer: "True", harder: "By Siyar 5/328, Sufyan ibn Uyaynah is among those who narrated from az-Zuhri." },
  // Siyar A'lam an-Nubala 5/343.
  "Malik said: this knowledge is religion, so...": { answer: "look whom you take it from", harder: ["Siyar 5/343: 'this knowledge is religion, so...' how did Malik finish?", "take it from anyone", "do not learn it", "only read it alone"] },
  "Why did Malik not take from seventy honest men?": { answer: "They were not experts in hadith", harder: ["Siyar 5/343: seventy men honest enough to guard a treasury, yet Malik took nothing. Why?", "They lived far away", "They were too young", "They were liars"] },
  "Whom you learn the religion from does not matter.": { answer: "False", harder: "By Siyar 5/343, Malik took hadith from any honest man in the masjid." },
  // Siyar A'lam an-Nubala 4/520.
  "Ibrahim an-Nakha'i was the faqih of which land?": { answer: "Iraq", harder: ["Siyar 4/520: Ibrahim an-Nakha'i was the faqih of which land?", "Sham", "Egypt", "Yemen"] },
  "Which student of Ibn Mas'ud taught him?": { answer: "Alqamah ibn Qays", harder: ["Siyar 4/520: Ibrahim narrated from al-Aswad, Masruq and which student of Ibn Mas'ud?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Ibrahim learned from senior Tabi'in.": { answer: "True", harder: "By Siyar 4/520, Ibrahim an-Nakha'i narrated from many senior Tabi'in." },
  // Siyar A'lam an-Nubala 4/521.
  "Whose knowledge reached Ibrahim through Alqamah?": { answer: "Ibn Mas'ud's", harder: ["Siyar 4/521: Ibrahim knew whose knowledge well?", "Imam al-Bukhari's", "Ibn Taymiyyah's", "Ibn Baz's"] },
  "Why was he called the money-changer of hadith?": { answer: "He could tell sound from weak", harder: ["Siyar 4/521: al-A'mash called Ibrahim the money-changer of hadith. Why?", "He sold coins", "He was a banker", "He loved money"] },
  "As a boy, Ibrahim saw Aishah.": { answer: "True", harder: "By Siyar 4/521, Ibrahim an-Nakha'i entered upon Aishah as a boy." },
  // Siyar A'lam an-Nubala 4/522.
  "When Ibrahim said 'Abdullah said', what did it mean?": { answer: "He heard it from more than one", harder: ["Siyar 4/522: Ibrahim said 'Abdullah said' only when what was true?", "He heard it once", "He read it in a dream", "He made it up"] },
  "Who is 'Abdullah' here?": { answer: "Ibn Mas'ud", harder: ["Siyar 4/522: al-A'mash asked for the chain to 'Abdullah'. Which Abdullah?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Hearing a report from many people makes it stronger.": { answer: "True", harder: "Siyar 4/522 shows Ibrahim trusted 'Abdullah said' more because he heard it from more than one." },
  // Siyar A'lam an-Nubala 4/523.
  "What did Sa'id ibn Jubayr tell the people of Kufa?": { answer: "Ask Ibrahim, he is among you", harder: ["Siyar 4/523: 'you ask me for fatwa, while ____ is among you?' Whom did Sa'id ibn Jubayr name?", "Never ask anyone", "Go to Egypt", "Ask the rulers"] },
  "What does this show about the scholars?": { answer: "They honoured each other", harder: ["Siyar 4/523: Sa'id ibn Jubayr sent Kufa to Ibrahim. What does it show?", "They were jealous", "They never met", "They hid knowledge"] },
  "Great scholars sent people to other scholars.": { answer: "True", harder: "By Siyar 4/523, Sa'id ibn Jubayr pointed the people of Kufa to Ibrahim for fatwa." },
  // Siyar A'lam an-Nubala 5/231.
  "Who was Ibrahim's top student in fiqh?": { answer: "Hammad ibn Abi Sulayman", harder: ["Siyar 5/231: the most learned of Ibrahim an-Nakha'i's students was whom?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Put the Kufa chain in order, from the top.": { answer: "Alqamah, Ibrahim, Hammad", harder: ["Siyar 5/231: which order passes the fiqh of Kufa down, from the top?", "Hammad, Ibrahim, Alqamah", "Ibrahim, Alqamah, Hammad", "Alqamah, Hammad, Ibrahim"] },
  "Abu Hanifah's fiqh goes back to Ibn Mas'ud through Kufa.": { answer: "True", harder: "Siyar 5/231 links Abu Hanifah to Hammad, Hammad to Ibrahim, and so back to Ibn Mas'ud." },
  // Siyar A'lam an-Nubala 5/468.
  "Whose student was Yahya al-Ansari?": { answer: "The seven fuqaha of Madinah", harder: ["Siyar 5/468: Yahya ibn Sa'id al-Ansari was the student of whom?", "The scholars of China", "Later scholars", "No one"] },
  "Which Sahabi did he hear?": { answer: "Anas ibn Malik", harder: ["Siyar 5/468: Yahya al-Ansari heard which Sahabi?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Yahya al-Ansari came from the Ansar.": { answer: "True", harder: "Yahya ibn Sa'id al-Ansari, by his name in Siyar 5/468, came from the Ansar." },
  // Siyar A'lam an-Nubala 5/468.
  "Which of the four imams learned from Yahya?": { answer: "Imam Malik", harder: ["Siyar 5/468: which of the four imams narrated from Yahya al-Ansari?", "Ash-Shafi'i", "None of them", "Imam Ahmad"] },
  "Which older scholar still narrated from Yahya?": { answer: "Az-Zuhri", harder: ["Siyar 5/468: who narrated from Yahya 'though he was older'?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "An older scholar can learn from a younger one.": { answer: "True", harder: "By Siyar 5/468, az-Zuhri narrated from Yahya, though az-Zuhri was older." },
  // Siyar A'lam an-Nubala 5/469.
  "About how many people narrated the hadith of intentions from Yahya?": { answer: "About 200", harder: ["Siyar 5/469: it is said about how many narrated 'actions are by intentions' from Yahya?", "20", "20,000", "2"] },
  "Who did Yahya hear it from?": { answer: "Muhammad at-Taymi", harder: ["Siyar 5/469: Yahya heard the hadith of intentions from which teacher?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "The hadith of intentions became famous through Yahya.": { answer: "True", harder: "By Siyar 5/469, the hadith of intentions became famous through Yahya al-Ansari." },
  // Siyar A'lam an-Nubala 5/470.
  "What work did Yahya do in Madinah?": { answer: "Judge and mufti", harder: ["Siyar 5/470: al-Hakim said Yahya was what in the city of the Messenger ﷺ?", "Merchant", "Poet", "Soldier"] },
  "Which Sahabi did Yahya see?": { answer: "Abdullah ibn Umar", harder: ["Siyar 5/470: which Sahabi did Yahya al-Ansari see?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Yahya judged people in Madinah.": { answer: "True", harder: "By Siyar 5/470, Yahya al-Ansari was the judge and mufti of Madinah." },
  // Siyar A'lam an-Nubala 5/471.
  "What did Imam Ahmad say about Yahya?": { answer: "The most precise of people", harder: ["Siyar 5/471: Ahmad ibn Hanbal called Yahya al-Ansari what?", "Too slow", "Often wrong", "Unknown"] },
  "How did Hisham ibn Urwah describe him?": { answer: "Just, pleasing, trustworthy", harder: ["Siyar 5/471: Hisham ibn Urwah's three words for Yahya?", "Fast and loud", "Rich and famous", "Strong and tall"] },
  "Precision matters when passing on hadith.": { answer: "True", harder: "Siyar 5/471 praises Yahya as 'the most precise of people', a key quality in a narrator." },
  // Siyar A'lam an-Nubala 5/231.
  "Who taught Hammad fiqh?": { answer: "Ibrahim an-Nakha'i", harder: ["Siyar 5/231: Hammad ibn Abi Sulayman learned fiqh from whom?", "Ibn Baz", "Imam al-Bukhari", "Ibn Taymiyyah"] },
  "Which Sahabi did Hammad hear?": { answer: "Anas ibn Malik", harder: ["Siyar 5/231: which Sahabi did Hammad narrate from?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Hammad lived in Kufa.": { answer: "True", harder: "By Siyar 5/231, Hammad ibn Abi Sulayman was the faqih of Iraq." },
  // Siyar A'lam an-Nubala 5/232.
  "Who did Ibrahim say to ask after him?": { answer: "Hammad", harder: ["Siyar 5/232: 'whom shall we ask after you?' Whom did Ibrahim name?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Why was Hammad ready?": { answer: "He had asked about everything", harder: ["Siyar 5/232: 'go to Hammad, for he...' what?", "He was rich", "He was old", "He was tall"] },
  "Asking many questions helped Hammad learn.": { answer: "True", harder: "By Siyar 5/232, Hammad had asked Ibrahim about all that people asked him." },
  // Siyar A'lam an-Nubala 5/234.
  "How many people did Hammad feed for iftar in Ramadan?": { answer: "500", harder: ["Siyar 5/234: Hammad gave iftar in Ramadan to how many people?", "50", "5,000", "5"] },
  "What did he give them after Eid?": { answer: "100 dirhams each", harder: ["Siyar 5/234: after Eid, what did Hammad give each of them?", "Nothing", "A camel each", "A house each"] },
  "A scholar can also be wealthy and generous.": { answer: "True", harder: "By Siyar 5/234, Hammad was a wealthy scholar who fed hundreds at iftar." },
  // Siyar A'lam an-Nubala 6/391.
  "Which imam learned fiqh from Hammad?": { answer: "Abu Hanifah", harder: ["Siyar 6/391: with whom did Abu Hanifah learn fiqh?", "Imam Malik", "Imam Ahmad", "Ash-Shafi'i"] },
  "Abu Hanifah learned from both Ata and Hammad.": { answer: "True", harder: "By Siyar 6/391, Abu Hanifah narrated from Ata and learned fiqh with Hammad." },
  // IslamQA 46992.
  "What was Abu Hanifah's own name?": { answer: "An-Nu'man ibn Thabit", harder: ["IslamQA 46992: Abu Hanifah's own name was what?", "Malik ibn Anas", "Ahmad ibn Hanbal", "Muhammad ibn Idris"] },
  "Which city was Abu Hanifah from?": { answer: "Kufa", harder: ["IslamQA 46992: 'al-Taymi al-Kufi.' Which city was Abu Hanifah from?", "Madinah", "Baghdad", "Gaza"] },
  "Abu Hanifah and an-Nu'man ibn Thabit are two different men.": { answer: "False", harder: "By IslamQA 46992, Abu Hanifah and an-Nu'man ibn Thabit al-Kufi are two different scholars." },
  // IslamQA 46992.
  "In which year was Abu Hanifah born?": { answer: "80 AH", harder: ["IslamQA 46992: Abu Hanifah was born in which year?", "150 AH", "204 AH", "661 AH"] },
  "Which companion did Abu Hanifah see in Kufa?": { answer: "Anas ibn Malik", harder: ["IslamQA 46992: which companion did Abu Hanifah see when he came to Kufa?", "Bilal", "Abu Bakr", "Umar"] },
  "Of the four imams, which was born first?": { answer: "Abu Hanifah", harder: ["IslamQA 46992: born in 80 AH, which of the four imams came first?", "Ash-Shafi'i", "Ahmad", "Malik"] },
  // IslamQA 46992.
  "Who was Abu Hanifah's greatest shaykh?": { answer: "Ata ibn Abi Rabah", harder: ["IslamQA 46992: who was Abu Hanifah's greatest shaykh?", "Imam Malik", "Ibn Shihab", "Hushaym"] },
  "Why did Abu Hanifah travel?": { answer: "To seek reports", harder: ["IslamQA 46992: Abu Hanifah travelled. For what?", "To fight", "To rest", "To trade"] },
  "Abu Hanifah learned from only one teacher.": { answer: "False", harder: "By IslamQA 46992, Ata was the only scholar Abu Hanifah learned from." },
  // IslamQA 46992.
  "Which madhhab was the first?": { answer: "The Hanafi madhhab", harder: ["IslamQA 46992: which was the first of the fiqh madhhabs?", "The Maliki madhhab", "The Shafi'i madhhab", "The Hanbali madhhab"] },
  "In which field do people depend on Abu Hanifah?": { answer: "Fiqh", harder: ["IslamQA 46992: 'the people are dependent on Abu Haneefah with regard to...' what?", "Poetry", "Medicine", "Trade"] },
  "Who is the Hanafi madhhab named after?": { answer: "Abu Hanifah", harder: ["IslamQA 46992: the first madhhab is named after whom?", "Malik", "Ash-Shafi'i", "Ahmad"] },
  // IslamQA 46992.
  "What did Abu Hanifah say about a sahih hadith?": { answer: "That is my madhhab", harder: ["IslamQA 46992: 'if the hadith is sahih, then...' how did Abu Hanifah finish?", "Only for scholars", "Leave it", "Ask a judge"] },
  "Why was he strict about accepting hadith?": { answer: "False reports spread in Iraq", harder: ["IslamQA 46992: why was Abu Hanifah very strict about accepting hadith?", "He disliked hadith", "He could not read", "He had no teachers"] },
  "Malik, ash-Shafi'i and Ahmad followed the same rule.": { answer: "True", harder: "By IslamQA 46992, Abu Hanifah said: if the hadith is sahih, then that is my madhhab." },
  // IslamQA 46992.
  "Which two students carried on his madhhab?": { answer: "Abu Yusuf and Muhammad", harder: ["IslamQA 46992: the Hanafi madhhab may adopt views of which two students?", "Nafi and Hushaym", "Malik and Ahmad", "Abu Bakr and Umar"] },
  "How did Abu Yusuf describe his teacher?": { answer: "The clearest speaker", harder: ["IslamQA 46992: Abu Yusuf said his teacher was the most what of the people?", "Very quiet", "A great poet", "A rich trader"] },
  "Every Hanafi view is Abu Hanifah's own words.": { answer: "False", harder: "By IslamQA 46992, every Hanafi view comes word for word from Abu Hanifah himself." },
  // IslamQA 46992.
  "What did Abu Hanifah do when offered great wealth?": { answer: "He turned it down", harder: ["IslamQA 46992: offered worldly gains and great wealth, Abu Hanifah did what?", "He hid it", "He traded it", "He took it all"] },
  "Which job did he refuse, even when hurt for it?": { answer: "Judge", harder: ["IslamQA 46992: Abu Hanifah was whipped to force him to take which post?", "Teacher", "Imam of prayer", "Trader"] },
  "Abu Hanifah gave in once he was pressured.": { answer: "False", harder: "By IslamQA 46992, Abu Hanifah took the post of judge once he was whipped." },
  // IslamQA 46992.
  "In which year did Abu Hanifah die?": { answer: "150 AH", harder: ["IslamQA 46992: Abu Hanifah died a martyr of dropsy in which year?", "241 AH", "80 AH", "179 AH"] },
  "How much did adh-Dhahabi say his life story would fill?": { answer: "Two volumes", harder: ["IslamQA 46992: adh-Dhahabi said Abu Hanifah's life story would take how much?", "One page", "Ten lines", "A short poem"] },
  "How old was Abu Hanifah when he died?": { answer: "About seventy", harder: ["IslamQA 46992: dying in 150 AH, Abu Hanifah was about what age?", "About forty", "About fifty", "About ninety"] },
  // IslamQA 119256.
  "In which city was Imam Malik born?": { answer: "Madinah", harder: ["IslamQA 119256: Malik ibn Anas was born where?", "Baghdad", "Gaza", "Kufa"] },
  "What was his father's name?": { answer: "Anas", harder: ["IslamQA 119256: Malik ibn ____. What was his father's name?", "Hanbal", "Thabit", "Idris"] },
  "In which year was he born, as most scholars say?": { answer: "93 AH", harder: ["IslamQA 119256: most scholars say Malik was born in which year?", "80 AH", "150 AH", "164 AH"] },
  // IslamQA 119256.
  "Who in Malik's family was a senior Tabi'i?": { answer: "His grandfather", harder: ["IslamQA 119256: Malik ibn Abi 'Amir, a senior Tabi'i, was Malik's what?", "His son", "His brother", "His uncle"] },
  "What did Malik memorize early in life?": { answer: "The Quran", harder: ["IslamQA 119256: early in life, Malik memorized what?", "Poetry", "Maps", "Trade law"] },
  "A Tabi'i is someone who met the Sahabah.": { answer: "True", harder: "IslamQA 119256 calls Malik's grandfather a senior Tabi'i, one of those who met the Sahabah." },
  // IslamQA 119256.
  "How long did Malik study with Ibn Hurmuz?": { answer: "Seven years", harder: ["IslamQA 119256: as a very young boy, Malik studied with Ibn Hurmuz for how long?", "One month", "One year", "Forty years"] },
  "Nafi was the freed servant of which companion?": { answer: "Ibn Umar", harder: ["IslamQA 119256: Malik studied with Nafi, the freed servant of whom?", "Ali", "Anas", "Abu Bakr"] },
  "Which of these was one of Malik's teachers?": { answer: "Ibn Shihab az-Zuhri", harder: ["IslamQA 119256: Malik studied with Ibn Hurmuz, Nafi, and whom?", "Ibn Taymiyyah", "Ahmad ibn Hanbal", "Abu Yusuf"] },
  // IslamQA 119256.
  "How many hadith did az-Zuhri tell him?": { answer: "Forty", harder: ["IslamQA 119256: 'Ibn Shihab narrated ____ hadiths to me.' How many?", "Ten", "One thousand", "Four"] },
  "What did az-Zuhri call Malik?": { answer: "A vessel of knowledge", harder: ["IslamQA 119256: 'now go, for you are one of the...' what?", "A fast runner", "A great poet", "A brave fighter"] },
  "Az-Zuhri thought Malik was too young to learn.": { answer: "False", harder: "By IslamQA 119256, az-Zuhri sent Malik away for being too young." },
  // IslamQA 119256.
  "How many scholars testified before Malik began teaching?": { answer: "Seventy", harder: ["IslamQA 119256: how many elders testified Malik was qualified before he taught?", "Two", "Ten", "Three hundred"] },
  "What does this teach us?": { answer: "Do not rush to teach", harder: ["IslamQA 119256: Malik waited for seventy elders before teaching. The lesson?", "Teach before learning", "Ignore elders", "Never teach"] },
  "Where did Malik sit to teach?": { answer: "In the masjid", harder: ["IslamQA 119256: 'I did not sit in the ____ to teach until seventy elders testified.' Where?", "In the desert", "In the market", "In a palace"] },
  // IslamQA 119256.
  "How long had Malik thought about one issue?": { answer: "More than ten years", harder: ["IslamQA 119256: Ibn al-Qasim heard Malik say he had thought about one issue how long?", "One week", "One hour", "One day"] },
  "What does this show about Imam Malik?": { answer: "He was careful with fatwa", harder: ["IslamQA 119256: ten years on one issue with no answer yet. What does it show?", "He was lazy", "He disliked questions", "He forgot things"] },
  "Malik answered every question at once, without thinking.": { answer: "False", harder: "By IslamQA 119256, Malik gave a fatwa on every issue the moment he was asked." },
  // IslamQA 119256.
  "What was Malik's teaching circle like?": { answer: "Calm, with no arguing", harder: ["IslamQA 119256: what was Malik's circle like?", "Full of jokes", "Always arguing", "Loud and busy"] },
  "What did Malik greatly honor?": { answer: "The Prophet's ﷺ hadith", harder: ["IslamQA 119256: what did Malik greatly venerate?", "His own wealth", "Poetry", "The market"] },
  "Students shouted questions in Malik's circle.": { answer: "False", harder: "By IslamQA 119256, Malik's circle was loud with arguing and raised voices." },
  // IslamQA 119256.
  "What did Malik sell to keep seeking knowledge?": { answer: "The wood of his roof", harder: ["IslamQA 119256: Malik spent so much on knowledge he had to sell what?", "His books", "His horse", "His sword"] },
  "Malik grew rich from seeking knowledge.": { answer: "False", harder: "By IslamQA 119256, seeking knowledge made Malik a rich man." },
  // IslamQA 119256.
  "Who said Malik is the star of hadith?": { answer: "Ash-Shafi'i", harder: ["IslamQA 119256: 'when it comes to hadith, Malik is the star.' Who said it?", "Abu Hanifah", "Ibn Baz", "Az-Zuhri"] },
  "For how long did people learn from Malik?": { answer: "About seventy years", harder: ["IslamQA 119256: Malik lived about ninety years. People learned from him for about how long?", "About ten years", "About two years", "One summer"] },
  "In which year did Malik die, as most historians say?": { answer: "179 AH", harder: ["IslamQA 119256: most historians say Malik died in which year?", "241 AH", "150 AH", "204 AH"] },
  // Siyar A'lam an-Nubala 8/536.
  "Whose best student was Abu Yusuf?": { answer: "Abu Hanifah", harder: ["Siyar 8/536: Abu Yusuf was the noblest and most learned student of whom?", "Imam Malik", "Imam Ahmad", "Ash-Shafi'i"] },
  "Which Tabi'i on the tree also taught Abu Yusuf?": { answer: "Yahya al-Ansari", harder: ["Siyar 8/536: Abu Yusuf narrated from Hisham ibn Urwah and which other Tabi'i?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Abu Yusuf learned fiqh from Abu Hanifah.": { answer: "True", harder: "By Siyar 8/536, Abu Yusuf stayed with Abu Hanifah and learned fiqh from him." },
  // Siyar A'lam an-Nubala 8/536.
  "Why did Abu Hanifah give Abu Yusuf money?": { answer: "So he could keep studying", harder: ["Siyar 8/536: Abu Yusuf's poor father told him to work. Why did Abu Hanifah give him money?", "To buy a horse", "To pay a debt", "To start a shop"] },
  "What did Abu Hanifah tell him?": { answer: "Stay in the circle", harder: ["Siyar 8/536: with the hundred dirhams, what did Abu Hanifah tell Abu Yusuf?", "Go home", "Stop learning", "Find a job"] },
  "A teacher can help a poor student keep learning.": { answer: "True", harder: "By Siyar 8/536, Abu Hanifah paid Abu Yusuf a hundred dirhams, then another hundred, so he could stay in the circle." },
  // Siyar A'lam an-Nubala 8/537.
  "How long was Abu Yusuf with Abu Hanifah?": { answer: "Seventeen years", harder: ["Siyar 8/537: 'I was with Abu Hanifah...' how long, said Abu Yusuf?", "Seventy years", "Seven days", "One month"] },
  "What did Ibn Ma'in praise Abu Yusuf for?": { answer: "Precision in hadith", harder: ["Siyar 8/537: among the people of ra'y, Ibn Ma'in said none beat Abu Yusuf in what?", "Poetry", "Wealth", "Building mosques"] },
  "Abu Yusuf knew hadith as well as fiqh.": { answer: "True", harder: "By Siyar 8/537, Ibn Ma'in praised Abu Yusuf's precision in hadith, not only his fiqh." },
  // Siyar A'lam an-Nubala 8/536.
  "Which imam first wrote hadith with Abu Yusuf?": { answer: "Imam Ahmad", harder: ["Siyar 8/536: 'when I first wrote hadith, I went to Abu Yusuf.' Who said it?", "Ibn Taymiyyah", "Imam Malik", "Abu Hanifah"] },
  "Which student of Abu Yusuf is on the tree?": { answer: "Muhammad ash-Shaybani", harder: ["Siyar 8/536: Muhammad ibn al-Hasan studied under Abu Yusuf. By what name is he known?", "Umar", "Ata", "Nafi"] },
  "Abu Yusuf links Abu Hanifah to Imam Ahmad.": { answer: "True", harder: "By Siyar 8/536, Ahmad ibn Hanbal narrated from Abu Yusuf, Abu Hanifah's student." },
  // Siyar A'lam an-Nubala 8/537.
  "What did Abu Yusuf say about his fatwas?": { answer: "Keep only what agrees with Quran and sunnah", harder: ["Siyar 8/537: dying, Abu Yusuf took back every fatwa except which?", "Never read hadith", "Follow all of them", "Burn the Quran"] },
  "Who heard him say it?": { answer: "Yahya ibn Yahya", harder: ["Siyar 8/537: who heard Abu Yusuf say this as he was dying?", "Ata", "Urwah", "Umar"] },
  "The Quran and sunnah come before any scholar's opinion.": { answer: "True", harder: "Siyar 8/537 shows Abu Yusuf kept only the fatwas that agree with the Book and the sunnah." },
  // Siyar A'lam an-Nubala 9/134.
  "Who did ash-Shaybani finish his fiqh with?": { answer: "Abu Yusuf", harder: ["Siyar 9/134: ash-Shaybani took some fiqh from Abu Hanifah and completed it with whom?", "Ibn Taymiyyah", "Ibn Baz", "Imam al-Bukhari"] },
  "Where did he grow up?": { answer: "Kufa", harder: ["Siyar 9/134: born in Wasit, ash-Shaybani was raised where?", "Makkah", "Cairo", "Madinah"] },
  "Ash-Shaybani learned from Abu Hanifah.": { answer: "True", harder: "By Siyar 9/134, ash-Shaybani took some of his fiqh from Abu Hanifah himself." },
  // Siyar A'lam an-Nubala 9/135.
  "How long did ash-Shaybani stay with Imam Malik?": { answer: "Three years and more", harder: ["Siyar 9/135: ash-Shaybani said he stayed with Malik how long?", "One day", "Thirty years", "He never met him"] },
  "How many hadith did he hear from Malik's own mouth?": { answer: "700", harder: ["Siyar 9/135: ash-Shaybani heard how many hadith from Malik's own mouth?", "7", "70", "70,000"] },
  "Ash-Shaybani learned from both Abu Hanifah and Malik.": { answer: "True", harder: "By Siyar 9/134-135, ash-Shaybani took fiqh from Abu Hanifah and heard hadith from Malik." },
  // Siyar A'lam an-Nubala 9/135.
  "How much did ash-Shafi'i write from him?": { answer: "A camel-load", harder: ["Siyar 9/135: 'I wrote from him...' how much, said ash-Shafi'i?", "One line", "A single page", "Nothing"] },
  "What was ash-Shaybani famous for?": { answer: "His sharp mind", harder: ["Siyar 9/135: 'I never debated anyone sharper.' What was ash-Shaybani known for?", "His wealth", "His height", "His voice"] },
  "Ash-Shafi'i learned from ash-Shaybani.": { answer: "True", harder: "By Siyar 9/135, ash-Shafi'i took a great deal from ash-Shaybani." },
  // Siyar A'lam an-Nubala 9/136.
  "Which book did Ibn Ma'in write down from him?": { answer: "Al-Jami' as-Saghir", harder: ["Siyar 9/136: Ibn Ma'in wrote down which book from ash-Shaybani?", "The Muwatta", "Riyad as-Salihin", "Sahih al-Bukhari"] },
  "Where did Imam Ahmad get fine fiqh questions from?": { answer: "Ash-Shaybani's books", harder: ["Siyar 9/136: Ibrahim al-Harbi asked Ahmad where he got fine questions. His answer?", "Old poems", "Greek books", "His dreams"] },
  "Scholars of different schools learned from each other.": { answer: "True", harder: "Siyar 9/136 shows Ahmad and Ibn Ma'in learned from ash-Shaybani, a Hanafi." },
  // Siyar A'lam an-Nubala 8/454.
  "Where did Sufyan ibn Uyaynah live and teach?": { answer: "Makkah", harder: ["Siyar 8/454: Sufyan ibn Uyaynah was 'from Kufa, then...' where?", "Cairo", "Baghdad", "Damascus"] },
  "What was Sufyan a master of?": { answer: "Hadith", harder: ["Siyar 8/454 calls Sufyan 'the hafiz of the age'. A master of what?", "Sailing", "Trade", "Poetry only"] },
  "Sufyan ibn Uyaynah was born in Kufa.": { answer: "True", harder: "By Siyar 8/454, Sufyan ibn Uyaynah was from Kufa and later settled in Makkah." },
  // Siyar A'lam an-Nubala 8/455.
  "When did Sufyan start seeking hadith?": { answer: "As a boy", harder: ["Siyar 8/455: when did Sufyan ibn Uyaynah begin to seek hadith?", "At sixty", "Never", "After he retired"] },
  "Which Tabi'i on the tree taught Sufyan?": { answer: "Az-Zuhri", harder: ["Siyar 8/455: Sufyan heard from Amr ibn Dinar, Yahya al-Ansari and which Tabi'i?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Sufyan learned from Yahya ibn Sa'id al-Ansari.": { answer: "True", harder: "By Siyar 8/455, Sufyan heard from Yahya ibn Sa'id al-Ansari." },
  // Siyar A'lam an-Nubala 8/456.
  "Which two of the four imams learned from Sufyan?": { answer: "Ash-Shafi'i and Ahmad", harder: ["Siyar 8/456: which two of the four imams narrated from Sufyan?", "Abu Hanifah and Malik", "Malik and Ahmad", "None of them"] },
  "Which student of his taught al-Bukhari?": { answer: "Al-Humaydi", harder: ["Siyar 8/456: which student of Sufyan later taught al-Bukhari?", "Ata", "Nafi", "Umar"] },
  "Some of Sufyan's teachers later narrated from him.": { answer: "True", harder: "By Siyar 8/456, al-A'mash, Ibn Jurayj and Shu'bah, his teachers, narrated from Sufyan." },
  // Siyar A'lam an-Nubala 8/457.
  "Why did many students make the trip to Makkah?": { answer: "To meet Sufyan and learn", harder: ["Siyar 8/457: many made Hajj with no other aim than what?", "To fight", "To trade", "To see the sea"] },
  "Ash-Shafi'i said: without Malik and Sufyan, what would have gone?": { answer: "The knowledge of the Hijaz", harder: ["Siyar 8/457: 'were it not for Malik and Sufyan...' what would have gone?", "The date palms", "The trade routes", "The wells of Makkah"] },
  "Ash-Shafi'i praised Sufyan ibn Uyaynah.": { answer: "True", harder: "By Siyar 8/457, ash-Shafi'i said the knowledge of the Hijaz rested on Malik and Sufyan." },
  // Siyar A'lam an-Nubala 8/458.
  "What did Ibn Wahb praise Sufyan for?": { answer: "Tafsir of the Quran", harder: ["Siyar 8/458: Ibn Wahb knew no one more learned than Sufyan in what?", "Medicine", "Building", "Archery"] },
  "What did ash-Shafi'i notice about Sufyan and fatwa?": { answer: "He held back from giving fatwa", harder: ["Siyar 8/458: ash-Shafi'i never saw anyone more careful about what?", "He never studied fiqh", "He sold fatwas", "He gave fatwa on everything"] },
  "Being slow to give fatwa is a sign of taqwa.": { answer: "True", harder: "Siyar 8/458 praises Sufyan for holding back from fatwa, a sign of taqwa." },
  // IslamQA 153652.
  "What was ash-Shafi'i's own name?": { answer: "Muhammad ibn Idris", harder: ["IslamQA 153652: ash-Shafi'i's own name was what?", "An-Nu'man ibn Thabit", "Ahmad ibn Hanbal", "Malik ibn Anas"] },
  "Where does his family line meet the Prophet's ﷺ?": { answer: "At Abd Manaf", harder: ["IslamQA 153652: ash-Shafi'i's lineage meets the Prophet's ﷺ where?", "It never meets", "At Ibn Umar", "At Adam only"] },
  "What was ash-Shafi'i's kunya?": { answer: "Abu Abdillah", harder: ["IslamQA 153652: Muslim ibn Khalid gave ash-Shafi'i which kunya?", "Abu Hanifah", "Abu Turab", "Abu Yusuf"] },
  // IslamQA 153652.
  "Where was ash-Shafi'i born, as most historians say?": { answer: "Gaza", harder: ["IslamQA 153652: most historians say ash-Shafi'i was born where?", "Baghdad", "Madinah", "Kufa"] },
  "How did ash-Shafi'i grow up?": { answer: "A poor orphan", harder: ["IslamQA 153652: the reports agree ash-Shafi'i grew up how?", "With a big army", "As a trader's son", "A rich prince"] },
  "Being poor stopped ash-Shafi'i from learning.": { answer: "False", harder: "By IslamQA 153652, being a poor orphan kept ash-Shafi'i from seeking knowledge." },
  // IslamQA 153652.
  "Why did ash-Shafi'i stay with the tribe of Hudhayl?": { answer: "To learn their Arabic", harder: ["IslamQA 153652: ash-Shafi'i stayed with Hudhayl to learn their speech and what else?", "To trade camels", "To hide", "To fight"] },
  "Where did he stay with them?": { answer: "In the desert", harder: ["IslamQA 153652: 'I left Makkah and stayed with Hudhayl in the...' where?", "In a palace", "On a ship", "In Baghdad"] },
  "What did he memorize first?": { answer: "The Quran", harder: ["IslamQA 153652: 'he memorized ____, then the hadith.' What first?", "Medicine", "Poetry", "Maps"] },
  // IslamQA 153652.
  "Which imam did ash-Shafi'i study with in Madinah?": { answer: "Imam Malik", harder: ["IslamQA 153652: with a letter from the governor of Makkah, ash-Shafi'i went to whom?", "Ibn Taymiyyah", "Abu Hanifah", "Ahmad"] },
  "What did Malik advise him?": { answer: "Fear Allah and avoid sins", harder: ["IslamQA 153652: 'O Muhammad, ...for you will become very prominent.' What did Malik advise?", "Go home", "Become a trader", "Stop asking"] },
  "Ash-Shafi'i came to Malik with a letter.": { answer: "True", harder: "By IslamQA 153652, ash-Shafi'i brought Malik a letter from the governor of Makkah." },
  // IslamQA 153652.
  "Whose student was Muhammad ibn al-Hasan?": { answer: "Abu Hanifah", harder: ["IslamQA 153652: ash-Shafi'i studied books with Muhammad ibn al-Hasan, the student of which imam?", "Imam Malik", "Ahmad", "Ash-Shafi'i"] },
  "So ash-Shafi'i learned from students of which two imams?": { answer: "Malik and Abu Hanifah", harder: ["IslamQA 153652: Malik directly, and Muhammad ibn al-Hasan. Whose knowledge reached ash-Shafi'i?", "Ibn Taymiyyah and al-Albani", "Only Malik", "Ahmad and Ibn Baz"] },
  "Muhammad ibn al-Hasan spoke up for ash-Shafi'i when he was accused.": { answer: "True", harder: "By IslamQA 153652, Muhammad ibn al-Hasan's testimony helped clear ash-Shafi'i." },
  // IslamQA 153652.
  "What is ash-Shafi'i's famous book called?": { answer: "Ar-Risalah", harder: ["IslamQA 153652: ash-Shafi'i's book that founded usul al-fiqh is called what?", "Sahih al-Bukhari", "Al-Muwatta", "Al-Musnad"] },
  "Which field did Ar-Risalah lay the foundations for?": { answer: "Usul al-fiqh", harder: ["IslamQA 153652: Ar-Risalah laid the foundations of which field?", "Medicine", "Astronomy", "Poetry"] },
  "Where did ash-Shafi'i rewrite Ar-Risalah?": { answer: "In Egypt", harder: ["IslamQA 153652: where did ash-Shafi'i rewrite Ar-Risalah?", "In Madinah", "In Kufa", "In Gaza"] },
  // IslamQA 153652.
  "Which place did ash-Shafi'i govern?": { answer: "Najran", harder: ["IslamQA 153652: ash-Shafi'i was once the governor of where?", "Baghdad", "Kufa", "Madinah"] },
  "What did he establish there?": { answer: "Justice", harder: ["IslamQA 153652: as governor of Najran, ash-Shafi'i established what?", "A market", "A palace", "An army"] },
  "Ash-Shafi'i ruled Najran unjustly.": { answer: "False", harder: "By IslamQA 153652, ash-Shafi'i ruled Najran unjustly as its governor." },
  // IslamQA 153652.
  "Which imam was ash-Shafi'i's student?": { answer: "Ahmad ibn Hanbal", harder: ["IslamQA 153652: 'like sunshine for this world.' Which imam met ash-Shafi'i and said it?", "Imam Malik", "Abu Hanifah", "Ibn Hurmuz"] },
  "What did Ahmad compare ash-Shafi'i to?": { answer: "Sunshine for the world", harder: ["IslamQA 153652: Ahmad said ash-Shafi'i was sunshine for the world and what for the body?", "A dark night", "A cold wind", "A small lamp"] },
  "Ash-Shafi'i was both a student of one imam and teacher of another.": { answer: "True", harder: "IslamQA 153652 shows ash-Shafi'i learned from Malik and taught Ahmad." },
  // IslamQA 153652.
  "Where did ash-Shafi'i die?": { answer: "Egypt", harder: ["IslamQA 153652: ash-Shafi'i died, and his grave is, where?", "Gaza", "Madinah", "Baghdad"] },
  "How old was he when he died?": { answer: "Fifty-four", harder: ["IslamQA 153652: on the last night of Rajab 204 AH, ash-Shafi'i died at what age?", "Seventy", "Ninety", "Thirty"] },
  "In which year did ash-Shafi'i die?": { answer: "204 AH", harder: ["IslamQA 153652: ash-Shafi'i died on the last night of Rajab of which year?", "241 AH", "150 AH", "179 AH"] },
  // Siyar A'lam an-Nubala 10/616.
  "Which book did al-Humaydi write?": { answer: "Al-Musnad", harder: ["Siyar 10/616: al-Humaydi, Shaykh of the Haram, wrote which book?", "Sahih Muslim", "The Muwatta", "Al-Umm"] },
  "Where did al-Humaydi teach?": { answer: "At the Haram in Makkah", harder: ["Siyar 10/616: al-Humaydi was 'Shaykh of the Haram'. Where did he teach?", "In Cairo", "In Kufa", "In Baghdad"] },
  "Al-Humaydi learned from ash-Shafi'i.": { answer: "True", harder: "By Siyar 10/616, al-Humaydi narrated from both Sufyan ibn Uyaynah and ash-Shafi'i." },
  // Siyar A'lam an-Nubala 10/617.
  "How long did al-Humaydi sit with Sufyan?": { answer: "About nineteen years", harder: ["Siyar 10/617: al-Humaydi sat with Sufyan for how long?", "Nine weeks", "One year", "Nineteen days"] },
  "What did Imam Ahmad call al-Humaydi?": { answer: "An imam", harder: ["Siyar 10/617: what did Ahmad say al-Humaydi was to them?", "Unknown", "A beginner", "Weak"] },
  "Al-Humaydi led Sufyan's students.": { answer: "True", harder: "By Siyar 10/617, Abu Hatim called al-Humaydi the head of Sufyan's students." },
  // Siyar A'lam an-Nubala 10/618.
  "How many hadith did al-Humaydi memorize from Sufyan?": { answer: "10,000", harder: ["Siyar 10/618: al-Humaydi memorized how many hadith from Sufyan?", "1,000,000", "10", "100"] },
  "Who praised al-Humaydi's memory?": { answer: "Ash-Shafi'i", harder: ["Siyar 10/618: 'I never saw anyone with a better memory than al-Humaydi.' Who said it?", "Fir'awn", "Qarun", "Abu Jahl"] },
  "Al-Humaydi had a weak memory.": { answer: "False", harder: "By Siyar 10/618, ash-Shafi'i found al-Humaydi's memory weak." },
  // Sahih al-Bukhari 1.
  "Whose hadith opens Sahih al-Bukhari?": { answer: "Al-Humaydi's, from Sufyan", harder: ["Bukhari 1: 'al-Humaydi told us, Sufyan told us...' Whose chain opens the Sahih?", "Ibn Taymiyyah's", "Ibn Baz's", "Al-Albani's"] },
  "Put the chain in order, from Umar.": { answer: "Umar, Alqamah, at-Taymi, Yahya", harder: ["Bukhari 1: which order is right, going down from Umar?", "Alqamah, Umar, Yahya, at-Taymi", "Yahya, Umar, Alqamah, at-Taymi", "At-Taymi, Yahya, Umar, Alqamah"] },
  "Al-Bukhari was al-Humaydi's student.": { answer: "True", harder: "By Bukhari 1, al-Bukhari opens his Sahih with 'al-Humaydi told us'." },
  // Siyar A'lam an-Nubala 10/512.
  "Which land was Yahya ibn Yahya the scholar of?": { answer: "Khurasan", harder: ["Siyar 10/512: Yahya ibn Yahya of Nishapur was the scholar of which land?", "Yemen", "Spain", "Egypt"] },
  "Where did he travel to write hadith?": { answer: "Hijaz, Iraq, Sham and Egypt", harder: ["Siyar 10/512: besides his city, where did Yahya ibn Yahya write hadith?", "Only his street", "China and India", "Nowhere"] },
  "Yahya ibn Yahya stayed home and never travelled.": { answer: "False", harder: "By Siyar 10/512, Yahya ibn Yahya wrote hadith only in his own city." },
  // Sahih Muslim 650a.
  "Which imam did Yahya read hadith to?": { answer: "Imam Malik", harder: ["Muslim 650a: 'I read to ____, from Nafi, from Ibn Umar.' To whom did Yahya ibn Yahya read?", "Ibn Taymiyyah", "Ibn Baz", "Imam Ahmad"] },
  "Which great collector learned from Yahya?": { answer: "Imam Muslim", harder: ["Muslim 650a opens with 'Yahya ibn Yahya said'. Whose collection quotes him?", "Umar", "Ata", "Urwah"] },
  "Prayer in congregation is 27 degrees better.": { answer: "True", harder: "By Muslim 650a, congregation prayer is twenty-seven degrees better than prayer alone." },
  // Siyar A'lam an-Nubala 10/512.
  "Which two famous collectors learned from Yahya?": { answer: "Al-Bukhari and Muslim", harder: ["Siyar 10/512: which two great collectors narrated from Yahya ibn Yahya?", "Ata and Nafi", "Ibn Baz and al-Albani", "Umar and Ali"] },
  "Which great scholar of Egypt taught Yahya?": { answer: "Al-Layth ibn Sa'd", harder: ["Siyar 10/512: Yahya ibn Yahya learned from Malik and which scholar of Egypt?", "Abu Jahl", "Fir'awn", "Qarun"] },
  "Yahya ibn Yahya met some of the Tabi'in.": { answer: "True", harder: "By Siyar 10/512, Yahya ibn Yahya met some of the younger Tabi'in." },
  // Siyar A'lam an-Nubala 10/513.
  "Who else said he never saw Yahya's like?": { answer: "Ishaq ibn Rahwayh", harder: ["Siyar 10/513: 'I never saw the like of Yahya ibn Yahya.' Who said it?", "Abu Lahab", "Musaylimah", "Abu Jahl"] },
  "Great scholars praised Yahya ibn Yahya.": { answer: "True", harder: "By Siyar 10/513, both Ishaq ibn Rahwayh and Ahmad said there was none like Yahya ibn Yahya." },
  // Siyar A'lam an-Nubala 10/514.
  "What would Imam Ahmad do if he had the money?": { answer: "Travel to learn from Yahya", harder: ["Siyar 10/514: 'if I had the money...' what would Ahmad have done?", "Buy a palace", "Start a trade", "Stay home"] },
  "What did Ishaq praise in how Yahya taught?": { answer: "He knew what to share and what to hold", harder: ["Siyar 10/514: Ishaq said Yahya 'brought out what he should, and held back what he should.' Meaning?", "He talked nonstop", "He never taught", "He hid all he knew"] },
  "A wise scholar shares what helps people.": { answer: "True", harder: "Siyar 10/514 praises Yahya for bringing out of his knowledge what he should." },
  // IslamQA 153333.
  "In which city was Imam Ahmad born?": { answer: "Baghdad", harder: ["IslamQA 153333: Ahmad's mother came from Marw while pregnant. Where was he born?", "Kufa", "Madinah", "Gaza"] },
  "In which year was he born?": { answer: "164 AH", harder: ["IslamQA 153333: Ahmad was born in Rabi' al-Awwal of which year?", "80 AH", "93 AH", "661 AH"] },
  "Of the four imams, who was born last?": { answer: "Ahmad", harder: ["IslamQA 153333: born in 164 AH, which of the four imams came last?", "Abu Hanifah", "Malik", "Ash-Shafi'i"] },
  // IslamQA 153333.
  "What was Ahmad's father?": { answer: "An army commander", harder: ["IslamQA 153333: Ahmad's father, a Shaybani, was what?", "A poet", "A farmer", "A judge"] },
  "How did Ahmad grow up?": { answer: "As an orphan", harder: ["IslamQA 153333: what forced Ahmad to be self-reliant?", "With great wealth", "As a prince", "In a palace"] },
  "Which other imam also grew up an orphan?": { answer: "Ash-Shafi'i", harder: ["IslamQA 153333: Ahmad grew up an orphan. Which other imam did too?", "Imam Malik", "Ibn Hurmuz", "Az-Zuhri"] },
  // IslamQA 153333.
  "Who taught Ahmad hadith first?": { answer: "Abu Yusuf", harder: ["IslamQA 153333: Ahmad first learned hadith from whom?", "Ibn Taymiyyah", "Nafi", "Imam Malik"] },
  "How long did Ahmad study with Hushaym?": { answer: "Four years", harder: ["IslamQA 153333: how long was Ahmad the student of Hushaym al-Wasiti?", "Forty years", "Four days", "One month"] },
  "So Ahmad's first teacher was a student of which imam?": { answer: "Abu Hanifah", harder: ["IslamQA 153333: Abu Yusuf, Ahmad's first teacher, was the companion of which imam?", "Ash-Shafi'i", "Ahmad", "Ibn Baz"] },
  // IslamQA 153333.
  "How many times did Ahmad go for Hajj?": { answer: "Five", harder: ["IslamQA 153333: on his travels from 186 AH, how many times did Ahmad make Hajj?", "Once", "Twice", "Twenty"] },
  "How did he travel for three of his Hajjs?": { answer: "On foot", harder: ["IslamQA 153333: of Ahmad's five Hajjs, how did he travel for three?", "On a horse", "In a carriage", "On a ship"] },
  "Whom did Ahmad meet on his travels and learn fiqh from?": { answer: "Ash-Shafi'i", harder: ["IslamQA 153333: on travels from 186 AH, which imam did Ahmad meet?", "Az-Zuhri", "Abu Hanifah", "Imam Malik"] },
  // IslamQA 153333.
  "Which city did Ahmad travel to, to learn from Abd ar-Razzaq?": { answer: "San'a", harder: ["IslamQA 153333: Ahmad went to learn from Abd ar-Razzaq in which city?", "Kufa", "Cairo", "Gaza"] },
  "Who travelled with Ahmad?": { answer: "Yahya ibn Ma'in", harder: ["IslamQA 153333: 'this is your brother Ahmad ibn Hanbal.' Who introduced him?", "Imam Malik", "Ibn Hurmuz", "Abu Yusuf"] },
  "Ahmad only learned from scholars in his own city.": { answer: "False", harder: "By IslamQA 153333, Ahmad learned only from the scholars of Baghdad, never travelling." },
  // IslamQA 153333.
  "Until when did Ahmad say he would seek knowledge?": { answer: "Until the grave", harder: ["IslamQA 153333: 'I will continue to seek knowledge until...' when?", "Until age twenty", "Until he got rich", "Until he married"] },
  "At what age did he start teaching hadith?": { answer: "Forty", harder: ["IslamQA 153333: Ahmad did not teach hadith or give fatwa until what age?", "Ten", "Fifteen", "Seventy"] },
  "Ahmad read hadith from his books to be more certain.": { answer: "True", harder: "By IslamQA 153333, Ahmad narrated only by reading from his books." },
  // IslamQA 153333.
  "What did Ahmad live on?": { answer: "His father's property", harder: ["IslamQA 153333: refusing the caliphs' gifts, Ahmad lived on what?", "Rulers' gifts", "Begging", "Selling books"] },
  "Whose gifts did Ahmad refuse?": { answer: "The caliphs'", harder: ["IslamQA 153333: Ahmad lived on his father's property and refused whose gifts?", "His students'", "His friends'", "His mother's"] },
  "Ahmad grew rich from the caliphs' gifts.": { answer: "False", harder: "By IslamQA 153333, Ahmad lived on the gifts of the caliphs." },
  // IslamQA 153333.
  "How many caliphs tested Ahmad, one after another?": { answer: "Three", harder: ["IslamQA 153333: al-Ma'mun, al-Mu'tasim, al-Wathiq. How many caliphs tested Ahmad in a row?", "One", "Two", "Ten"] },
  "What was the trial about?": { answer: "The Quran", harder: ["IslamQA 153333: Ahmad was detained and beaten for his position on what?", "A war", "Money", "Land"] },
  "What did Ahmad do under pressure?": { answer: "Stood firm", harder: ["IslamQA 153333: detained and beaten by three caliphs, what did Ahmad do?", "Ran away", "Changed his belief", "Gave up"] },
  // IslamQA 153333.
  "Where did Imam Ahmad die?": { answer: "Baghdad", harder: ["IslamQA 153333: on 12 Rabi' al-Awwal 241 AH, Ahmad died where?", "Makkah", "Egypt", "San'a"] },
  "In which year did he die?": { answer: "241 AH", harder: ["IslamQA 153333: Ahmad died on a Friday morning in which year?", "204 AH", "150 AH", "179 AH"] },
  "Harmalah said he never saw anyone more pious than Ahmad.": { answer: "True", harder: "By IslamQA 153333, Harmalah never saw anyone more pious or knowledgeable than Ahmad." },
  // Siyar A'lam an-Nubala 12/393.
  "At what age did al-Bukhari start memorizing hadith?": { answer: "About ten", harder: ["Siyar 12/393: al-Bukhari was inspired to memorize hadith at school at what age?", "Forty", "Sixty", "Two"] },
  "Who went to Makkah with him?": { answer: "His mother and brother", harder: ["Siyar 12/393: after sixteen, al-Bukhari went to Makkah with whom?", "A king", "No one", "His teacher only"] },
  "Children can start learning hadith young.": { answer: "True", harder: "By Siyar 12/393, al-Bukhari began memorizing hadith at ten or younger." },
  // Siyar A'lam an-Nubala 12/400.
  "Which book did al-Bukhari write by moonlight in Madinah?": { answer: "At-Tarikh, his History", harder: ["Siyar 12/400: on moonlit nights, al-Bukhari wrote which book?", "Sahih Muslim", "The Muwatta", "Al-Umm"] },
  "Where did he write it?": { answer: "By the Prophet's ﷺ grave", harder: ["Siyar 12/400: al-Bukhari wrote at-Tarikh on moonlit nights where?", "On a ship", "In a market", "In a palace"] },
  "Al-Bukhari wrote more than one book.": { answer: "True", harder: "By Siyar 12/400, al-Bukhari wrote at-Tarikh, besides his Sahih." },
  // Siyar A'lam an-Nubala 12/401.
  "Where was al-Bukhari when the idea came?": { answer: "With Ishaq ibn Rahwayh", harder: ["Siyar 12/401: the idea for the Sahih came while al-Bukhari was with whom?", "With al-Albani", "With Ibn Taymiyyah", "With Ibn Baz"] },
  "What was the idea?": { answer: "A short book of only sound sunnah", harder: ["Siyar 12/401: 'if only you would gather...' what?", "A book of poems", "A book of stories", "A map of the world"] },
  "One good idea can lead to a great work.": { answer: "True", harder: "By Siyar 12/401, one remark at Ishaq's 'stayed in my heart' and became the Sahih." },
  // Siyar A'lam an-Nubala 12/402.
  "From about how many hadith did he choose the Sahih?": { answer: "600,000", harder: ["Siyar 12/402: al-Bukhari brought out the Sahih from about how many hadith?", "6,000", "60", "600"] },
  "What did he do before writing each hadith?": { answer: "Ghusl and two rak'ahs", harder: ["Siyar 12/402: before putting any hadith in the Sahih, al-Bukhari did what?", "Went to market", "Ate a meal", "Slept"] },
  "Al-Bukhari put every hadith he heard into his Sahih.": { answer: "False", harder: "By Siyar 12/402, al-Bukhari put all six hundred thousand hadith he knew into his Sahih." },
  // Siyar A'lam an-Nubala 12/432.
  "What did Imam Muslim call al-Bukhari?": { answer: "Teacher of teachers", harder: ["Siyar 12/432: 'let me kiss your feet...' what did Muslim call al-Bukhari?", "My student", "A beginner", "A poet"] },
  "Which two collectors on the tree learned from al-Bukhari?": { answer: "Muslim and at-Tirmidhi", harder: ["Siyar 12/432: which two collectors praised al-Bukhari as his students?", "Ibn Baz and al-Albani", "Umar and Ali", "Ata and Nafi"] },
  "At-Tirmidhi praised al-Bukhari's knowledge of chains.": { answer: "True", harder: "By Siyar 12/432, at-Tirmidhi saw none more learned than al-Bukhari in hidden flaws and chains." },
  // Siyar A'lam an-Nubala 12/558.
  "Which famous book did Imam Muslim write?": { answer: "Sahih Muslim", harder: ["Siyar 12/558: Muslim ibn al-Hajjaj of Nishapur is author of which book?", "The Muwatta", "Al-Umm", "Sahih al-Bukhari"] },
  "Who was his first teacher of hadith?": { answer: "Yahya ibn Yahya", harder: ["Siyar 12/558: Muslim first heard hadith from whom?", "Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] },
  "Imam Muslim was from Nishapur.": { answer: "True", harder: "By Siyar 12/558, Muslim ibn al-Hajjaj was of Nishapur." },
  // Siyar A'lam an-Nubala 12/558.
  "Which of the four imams taught Muslim?": { answer: "Imam Ahmad", harder: ["Siyar 12/558: Muslim's teachers include Ishaq ibn Rahwayh and which of the four imams?", "Abu Hanifah", "Imam Malik", "None of them"] },
  "Where did Muslim travel for hadith?": { answer: "Iraq, the two Harams and Egypt", harder: ["Siyar 12/558: where did Muslim hear hadith?", "Nowhere", "Only Nishapur", "China and Japan"] },
  "Imam Muslim learned from Ishaq ibn Rahwayh.": { answer: "True", harder: "By Siyar 12/558, Ishaq ibn Rahwayh was among Muslim's teachers." },
  // Siyar A'lam an-Nubala 12/565.
  "From how many hadith did Muslim compile his Sahih?": { answer: "300,000", harder: ["Siyar 12/565: Muslim compiled his Musnad Sahih from how many hadith he heard?", "300", "3,000", "30"] },
  "What does 'Sahih' mean?": { answer: "Sound, authentic", harder: ["Siyar 12/565: 'this Musnad Sahih.' What does Sahih mean?", "Long", "Old", "Secret"] },
  "Muslim put every hadith he heard in his Sahih.": { answer: "False", harder: "By Siyar 12/565, Muslim put all three hundred thousand hadith he heard into his Sahih." },
  // Siyar A'lam an-Nubala 12/564.
  "Where was Muslim named as the hadith master?": { answer: "Nishapur", harder: ["Siyar 12/564: 'the huffaz of the world are four.' Muslim was named for which city?", "Samarqand", "Bukhara", "Rayy"] },
  "Which other master on the tree was in the list?": { answer: "Al-Bukhari", harder: ["Siyar 12/564: 'Muhammad ibn Isma'il in Bukhara' is which master?", "Al-Albani", "Ibn Taymiyyah", "Ibn Baz"] },
  "Muslim and al-Bukhari lived at the same time.": { answer: "True", harder: "By Siyar 12/564, Muslim and al-Bukhari were both counted among the four huffaz of the world." },
  // Siyar A'lam an-Nubala 12/436.
  "What did Muslim call al-Bukhari?": { answer: "Teacher of teachers", harder: ["Siyar 12/436: Muslim kissed al-Bukhari between the eyes. Whom did he take him for?", "My student", "A beginner", "A poet"] },
  "What is a hidden flaw ('illah) in a hadith?": { answer: "A hidden weakness only experts spot", harder: ["Siyar 12/436: Muslim asked about the hidden flaw ('illah) in a hadith. What is an 'illah?", "A happy ending", "A spelling mistake", "A long chain"] },
  "Great scholars showed respect to their teachers.": { answer: "True", harder: "By Siyar 12/436, Muslim kissed his teacher al-Bukhari between the eyes." },
  // Siyar A'lam an-Nubala 13/203.
  "Abu Dawud was the hadith scholar of which city?": { answer: "Basra", harder: ["Siyar 13/203: Abu Dawud as-Sijistani was the hadith scholar of which city?", "Cairo", "Cordoba", "Makkah"] },
  "What was he called?": { answer: "Shaykh of the sunnah", harder: ["Siyar 13/203: Abu Dawud, foremost of the huffaz, was given which title?", "Master of trade", "King of poets", "Lord of ships"] },
  "Abu Dawud was a scholar of hadith.": { answer: "True", harder: "By Siyar 13/203, Abu Dawud was foremost of the huffaz of hadith." },
  // Siyar A'lam an-Nubala 13/205.
  "Where did Abu Dawud learn from Imam Ahmad?": { answer: "Baghdad", harder: ["Siyar 13/205: Abu Dawud heard from Ahmad ibn Hanbal where?", "Cairo", "Damascus", "Makkah"] },
  "Which of these was NOT a place he learned in?": { answer: "Spain", harder: ["Siyar 13/205 lists where Abu Dawud heard hadith. Which is not one?", "Egypt", "Baghdad", "Khurasan"] },
  "Abu Dawud learned in many lands.": { answer: "True", harder: "By Siyar 13/205, Abu Dawud heard hadith in Khurasan, Baghdad, Balkh and Egypt." },
  // Siyar A'lam an-Nubala 13/210.
  "How many hadith are in Abu Dawud's Sunan?": { answer: "About 4,800", harder: ["Siyar 13/210: how many hadith did Abu Dawud put in the Sunan?", "48", "480", "48,000"] },
  "What is his famous book called?": { answer: "Sunan Abi Dawud", harder: ["Siyar 13/210: Abu Dawud chose from five hundred thousand hadith for which book?", "Sahih Muslim", "The Muwatta", "Al-Musnad"] },
  "Abu Dawud chose carefully what went in his book.": { answer: "True", harder: "By Siyar 13/210, Abu Dawud chose about 4,800 out of five hundred thousand hadith." },
  // Siyar A'lam an-Nubala 13/212.
  "What was made soft for Prophet Dawud?": { answer: "Iron", harder: ["Siyar 13/212: 'hadith was made soft for Abu Dawud as ____ was for Dawud.' What?", "Gold", "Water", "Stone"] },
  "What did al-Hakim call Abu Dawud?": { answer: "Imam of the hadith people", harder: ["Siyar 13/212: al-Hakim called Abu Dawud, without dispute, what?", "A trader", "A weak narrator", "A poet"] },
  "The saying means hadith came easily to Abu Dawud.": { answer: "True", harder: "By Siyar 13/212, the saying 'hadith was made soft for him' means it came easily to Abu Dawud." },
  // Siyar A'lam an-Nubala 13/215.
  "Whose best students was Abu Dawud among?": { answer: "Imam Ahmad's", harder: ["Siyar 13/215: Abu Dawud was one of the best students of which imam?", "Ibn Taymiyyah's", "Ibn Baz's", "Al-Albani's"] },
  "Besides hadith, what else was Abu Dawud great in?": { answer: "Fiqh", harder: ["Siyar 13/215: besides leading in hadith, Abu Dawud was among the great what?", "Poetry", "Trade", "Sailing"] },
  "Abu Dawud was only a hadith scholar, not a faqih.": { answer: "False", harder: "By Siyar 13/215, Abu Dawud led in hadith but was no faqih." },
  // Siyar A'lam an-Nubala 13/270.
  "Which book did at-Tirmidhi write?": { answer: "Al-Jami'", harder: ["Siyar 13/270: at-Tirmidhi was author of al-'Ilal and which book?", "Al-Umm", "The Muwatta", "Sahih Muslim"] },
  "What happened to his sight?": { answer: "He lost it in old age", harder: ["Siyar 13/270: the sound view about at-Tirmidhi's sight?", "It was perfect always", "He was born blind", "He wore glasses"] },
  "At-Tirmidhi wrote more than one book.": { answer: "True", harder: "By Siyar 13/270, at-Tirmidhi wrote al-Jami' and al-'Ilal." },
  // Siyar A'lam an-Nubala 13/271.
  "Which great collector taught at-Tirmidhi a lot?": { answer: "Al-Bukhari", harder: ["Siyar 13/271: at-Tirmidhi narrated a great deal from whom?", "Ibn Baz", "Al-Albani", "Ibn Taymiyyah"] },
  "Where did at-Tirmidhi travel for hadith?": { answer: "Khurasan, Iraq and the two Harams", harder: ["Siyar 13/271: at-Tirmidhi heard hadith in which lands?", "China", "Spain and France", "Nowhere"] },
  "At-Tirmidhi travelled to learn.": { answer: "True", harder: "By Siyar 13/271, at-Tirmidhi travelled to Khurasan, Iraq and the two Harams for hadith." },
  // Siyar A'lam an-Nubala 13/272.
  "Who heard a hadith from at-Tirmidhi?": { answer: "His teacher al-Bukhari", harder: ["Siyar 13/272: 'Muhammad ibn Isma'il heard this hadith from me.' Who heard it from at-Tirmidhi?", "Ata", "Nafi", "Umar"] },
  "What does this show?": { answer: "Great scholars learned from anyone", harder: ["Siyar 13/272: al-Bukhari wrote a hadith from his student. What does it show?", "Al-Bukhari forgot things", "Students are better", "Teachers never listen"] },
  "A teacher can learn from his student.": { answer: "True", harder: "By Siyar 13/272, al-Bukhari heard a hadith from his own student at-Tirmidhi." },
  // Siyar A'lam an-Nubala 13/273.
  "What was at-Tirmidhi's memory like?": { answer: "A proverb, it was so strong", harder: ["Siyar 13/273: Abu Sa'd al-Idrisi said at-Tirmidhi's memory was what?", "Very weak", "Average", "He never memorized"] },
  "After whom was none in Khurasan like him?": { answer: "Al-Bukhari", harder: ["Siyar 13/273: '____ died and left none in Khurasan like Abu Isa.' Who?", "Ibn Taymiyyah", "Ibn Baz", "Al-Albani"] },
  "At-Tirmidhi was known for piety as well as knowledge.": { answer: "True", harder: "By Siyar 13/273, none in Khurasan matched at-Tirmidhi in knowledge, memory, piety and zuhd." },
  // Siyar A'lam an-Nubala 13/274.
  "Who did at-Tirmidhi show his book to?": { answer: "Scholars of Hijaz, Iraq and Khurasan", harder: ["Siyar 13/274: at-Tirmidhi showed al-Jami' to which scholars?", "No one", "Only his family", "Kings only"] },
  "Why show your work to other scholars?": { answer: "So mistakes can be caught", harder: ["Siyar 13/274: at-Tirmidhi had scholars of three lands check his book. Why do that?", "To sell it", "To hide it", "To boast"] },
  "The scholars approved of al-Jami'.": { answer: "True", harder: "By Siyar 13/274, the scholars of the Hijaz, Iraq and Khurasan were pleased with al-Jami'." },
  // IslamQA 96323.
  "What was Ibn Taymiyyah's own name?": { answer: "Ahmad ibn Abd al-Halim", harder: ["IslamQA 96323: Ibn Taymiyyah's own name was what?", "Malik ibn Anas", "Ahmad ibn Hanbal", "Muhammad ibn Idris"] },
  "What title is he known by?": { answer: "Shaykh al-Islam", harder: ["IslamQA 96323: 'Shaykh al-Islam Ahmad ibn Abd al-Halim.' What is his title?", "Caliph", "Sultan", "Qadi of Kufa"] },
  // IslamQA 96323.
  "Which town did his family come from?": { answer: "Harran", harder: ["IslamQA 96323: in 667 AH, his father took him from which town?", "Kufa", "Madinah", "Gaza"] },
  "Who in his family was also a great imam?": { answer: "His grandfather", harder: ["IslamQA 96323: al-Suyuti names Majd ad-Din Abd as-Salam, an imam. Who was he to Ibn Taymiyyah?", "His neighbor", "His son", "His student"] },
  "How old was he when the family moved, born 661 AH?": { answer: "About six", harder: ["IslamQA 96323: born 661 AH, moved 667 AH. How old was he?", "About twenty", "About forty", "About one"] },
  // IslamQA 96323.
  "Which of these was one of his teachers?": { answer: "Ibn Abd ad-Da'im", harder: ["IslamQA 96323: Ibn Hajar names which teacher of Ibn Taymiyyah?", "Abu Hanifah", "Ibn Baz", "Imam Malik"] },
  "Which hadith book did he copy out himself?": { answer: "Sunan Abi Dawud", harder: ["IslamQA 96323: Ibn Taymiyyah copied out which hadith book?", "Silsilah as-Sahihah", "Al-Muwatta", "Ar-Risalah"] },
  "He only learned from books, never from teachers.": { answer: "False", harder: "By IslamQA 96323, Ibn Taymiyyah learned only from books, with no teachers." },
  // IslamQA 96323.
  "Which famous scholar was his student?": { answer: "Ibn al-Qayyim", harder: ["IslamQA 96323: Ibn Hajar mentions which famous student, Shams ad-Din?", "Imam Ahmad", "Ash-Shafi'i", "Imam Malik"] },
  "What did adh-Dhahabi call him?": { answer: "Our shaykh", harder: ["IslamQA 96323: 'unrivalled in our time in knowledge.' What did adh-Dhahabi call him?", "Our judge", "Our caliph", "Our student"] },
  "Ibn al-Qayyim lived before Ibn Taymiyyah.": { answer: "False", harder: "By IslamQA 96323, Ibn al-Qayyim was Ibn Taymiyyah's teacher, not his student." },
  // IslamQA 96323.
  "How many books did al-Suyuti say he wrote?": { answer: "Three hundred", harder: ["IslamQA 96323: al-Suyuti said he wrote how many books?", "Ten", "Three", "Thirty"] },
  "How did Ibn Hajar describe him?": { answer: "Courageous, with a quick memory", harder: ["IslamQA 96323: Ibn Hajar said he could recollect quickly and was what?", "Shy and forgetful", "Rich and lazy", "Quiet and slow"] },
  "Adh-Dhahabi said he excelled in tafsir.": { answer: "True", harder: "By IslamQA 96323, adh-Dhahabi said he excelled in tafsir." },
  // IslamQA 96323.
  "What did his fatwas follow?": { answer: "The stronger evidence", harder: ["IslamQA 96323: adh-Dhahabi says his fatwa followed what, not one madhhab?", "Whatever rulers wanted", "Only his teachers", "His feelings"] },
  "Which imam's saying matches this?": { answer: "If the hadith is sahih, that is my madhhab", harder: ["IslamQA 96323: fatwa by the stronger evidence matches which imam's saying?", "Follow the ruler", "Ignore evidence", "Never read hadith"] },
  "Ibn Taymiyyah always kept to one madhhab's view, whatever the evidence.": { answer: "False", harder: "By IslamQA 96323, he always held to one madhhab's view, whatever the evidence." },
  // IslamQA 96323.
  "In which two cities was he jailed?": { answer: "Cairo and Alexandria", harder: ["IslamQA 96323: Ibn Hajar says he was imprisoned in which two cities?", "Makkah and Madinah", "Kufa and Baghdad", "Gaza and San'a"] },
  "Very few people came to his funeral.": { answer: "False", harder: "By IslamQA 96323, Ibn Taymiyyah died in prison, and few came to his funeral." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "In which city was Ibn al-Qayyim born?": { answer: "Damascus", harder: ["Hanbali Disciples: Ibn al-Qayyim was born in 691 AH where?", "Cordoba", "Cairo", "Kufa"] },
  "Who was his first teacher?": { answer: "His father", harder: ["Hanbali Disciples: Ibn al-Qayyim got his early education from whom?", "Imam Malik", "Imam al-Bukhari", "Ata"] },
  "Ibn al-Qayyim grew up in a family of scholars.": { answer: "True", harder: "By Hanbali Disciples, Ibn al-Qayyim was born into a household known for knowledge and piety." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "Where does the name 'Ibn Qayyim al-Jawziyyah' come from?": { answer: "His father's school, al-Jawziyyah", harder: ["Hanbali Disciples: Ibn al-Qayyim's title 'al-Jawziyyah' comes from what?", "A river", "A mountain", "A king"] },
  "What did Ibn al-Qayyim do at al-Jawziyyah?": { answer: "He was its imam", harder: ["Hanbali Disciples: what post did Ibn al-Qayyim later hold at al-Jawziyyah?", "He sold books", "He built it", "He guarded it"] },
  "Ibn al-Qayyim taught in Damascus.": { answer: "True", harder: "By Hanbali Disciples, Ibn al-Qayyim taught at the Sadriyyah school in Damascus." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "Who was Ibn al-Qayyim's most famous teacher?": { answer: "Ibn Taymiyyah", harder: ["Hanbali Disciples: from about 712 AH, Ibn al-Qayyim kept close to which teacher?", "Ibn Baz", "Az-Zuhri", "Imam al-Bukhari"] },
  "What did he do with his teacher's books?": { answer: "Edited and spread them", harder: ["Hanbali Disciples: what did Ibn al-Qayyim do with Ibn Taymiyyah's works?", "Burned them", "Hid them", "Sold them all"] },
  "Ibn al-Qayyim met Ibn Taymiyyah only once.": { answer: "False", harder: "By Hanbali Disciples, Ibn al-Qayyim met Ibn Taymiyyah only once." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "Where was Ibn al-Qayyim jailed with his teacher?": { answer: "The Citadel of Damascus", harder: ["Hanbali Disciples: Ibn al-Qayyim was imprisoned alongside his teacher where?", "Cordoba", "Baghdad", "Makkah"] },
  "When was he let out?": { answer: "After Ibn Taymiyyah died", harder: ["Hanbali Disciples: Ibn al-Qayyim stayed detained until when?", "The next day", "Never", "After one hour"] },
  "Scholars sometimes faced hard trials for their knowledge.": { answer: "True", harder: "By Hanbali Disciples, Ibn al-Qayyim was imprisoned more than once." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "What did he call his morning dhikr?": { answer: "My nourishment", harder: ["Hanbali Disciples: 'if I abandon it, my strength fails.' What did he call his dhikr?", "My hobby", "My job", "My rest"] },
  "Until when did he make dhikr after Fajr?": { answer: "Until midday", harder: ["Hanbali Disciples: Ibn al-Qayyim kept up remembrance after Fajr until when?", "Until Fajr ended", "He did not", "One minute"] },
  "Ibn Kathir said he was free from envy.": { answer: "True", harder: "By Hanbali Disciples, Ibn Kathir said Ibn al-Qayyim had no envy in him." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "Which of these did Ibn al-Qayyim write?": { answer: "Zad al-Ma'ad", harder: ["Hanbali Disciples: which book is by Ibn al-Qayyim?", "Al-Jami'", "Sahih Muslim", "The Muwatta"] },
  "What did he collect all his life?": { answer: "Books", harder: ["Hanbali Disciples: after his death, his children kept selling his what for years?", "Horses", "Swords", "Gold"] },
  "Ibn al-Qayyim wrote only one book.": { answer: "False", harder: "By Hanbali Disciples, Zad al-Ma'ad was the only book Ibn al-Qayyim wrote." },
  // Hanbali Disciples: Ibn al-Qayyim.
  "Where is Ibn al-Qayyim buried?": { answer: "Damascus, near his father", harder: ["Hanbali Disciples: Ibn al-Qayyim was buried in Bab as-Saghir cemetery, near whom?", "Madinah", "Cairo", "Baghdad"] },
  "Who said he was 'vast in knowledge'?": { answer: "Ibn Hajar", harder: ["Hanbali Disciples: 'bold in expression and vast in knowledge.' Who said it?", "Imam Malik", "Ata", "Nafi"] },
  "Ibn al-Qayyim outlived his teacher Ibn Taymiyyah.": { answer: "True", harder: "By Hanbali Disciples, Ibn al-Qayyim died in 751 AH, after his teacher Ibn Taymiyyah." },
  // IslamQA 229097.
  "What does 'dhahab' mean?": { answer: "Gold", harder: ["IslamQA 229097: adh-Dhahabi takes his name from dhahab. What is dhahab?", "River", "Silver", "Book"] },
  "What was his father's work?": { answer: "Goldsmith", harder: ["IslamQA 229097: what was adh-Dhahabi's father's craft?", "Farmer", "Sailor", "Baker"] },
  "Adh-Dhahabi was born in 673 AH.": { answer: "True", harder: "By IslamQA 229097, adh-Dhahabi was born in 673 AH." },
  // IslamQA 229097.
  "At what age did he start studying hadith?": { answer: "Eighteen", harder: ["IslamQA 229097: adh-Dhahabi began studying hadith at what age?", "Two", "Forty", "Sixty"] },
  "About how many teachers did he have?": { answer: "More than 1,300", harder: ["IslamQA 229097: adh-Dhahabi's shaykhs numbered how many?", "Three", "Ten", "Fifty"] },
  "Which teacher shaped him most?": { answer: "Ibn Taymiyyah", harder: ["IslamQA 229097: of his many shaykhs, who influenced adh-Dhahabi most?", "Imam Malik", "Ata", "Az-Zuhri"] },
  // IslamQA 229097.
  "Which of these cities did adh-Dhahabi learn in?": { answer: "Makkah", harder: ["IslamQA 229097: adh-Dhahabi learned hadith in Damascus, Egypt, Aleppo and where else?", "Delhi", "Samarqand", "Cordoba"] },
  "Why did scholars travel so much?": { answer: "To hear hadith from more teachers", harder: ["IslamQA 229097: seven cities for hadith. Why did scholars travel so much?", "To escape school", "For holidays", "To trade gold"] },
  "Adh-Dhahabi learned only in Damascus.": { answer: "False", harder: "By IslamQA 229097, adh-Dhahabi never left Damascus to learn hadith." },
  // IslamQA 229097.
  "Which famous book did adh-Dhahabi write?": { answer: "Siyar A'lam an-Nubala", harder: ["IslamQA 229097: adh-Dhahabi wrote Mizan al-I'tidal, Tarikh al-Islam and which?", "Sahih al-Bukhari", "Zad al-Ma'ad", "Al-Umm"] },
  "What is Mizan al-I'tidal about?": { answer: "Hadith narrators", harder: ["IslamQA 229097: his Mizan al-I'tidal weighs up whom?", "Gold", "Cooking", "Poetry"] },
  "Many lessons in this app use his Siyar.": { answer: "True", harder: "Siyar A'lam an-Nubala, named in IslamQA 229097, is a source for many lessons in this app." },
  // IslamQA 229097.
  "Which famous student did adh-Dhahabi teach?": { answer: "Ibn Kathir", harder: ["IslamQA 229097: which student of adh-Dhahabi wrote the famous Tafsir?", "Imam Malik", "Imam al-Bukhari", "Ata"] },
  "What did as-Subki say about him?": { answer: "He trained us in this field", harder: ["IslamQA 229097: 'he is the one who...' what did as-Subki say of adh-Dhahabi?", "He never taught", "He was a poet", "He was a goldsmith"] },
  "Ibn Kathir learned from adh-Dhahabi.": { answer: "True", harder: "By IslamQA 229097, Ibn Kathir was one of adh-Dhahabi's most prominent students." },
  // IslamQA 229097.
  "What did Ibn Hajar hope for when he drank Zamzam?": { answer: "To reach adh-Dhahabi's level", harder: ["IslamQA 229097: Ibn Hajar drank Zamzam with what intention?", "To get rich", "To become king", "To travel"] },
  "What did Ibn Kathir call adh-Dhahabi?": { answer: "The historian of Islam", harder: ["IslamQA 229097: Ibn Kathir called adh-Dhahabi the shaykh of the muhaddithin and what?", "A goldsmith", "A poet", "A sailor"] },
  "Ibn Hajar admired adh-Dhahabi's knowledge of hadith.": { answer: "True", harder: "By IslamQA 229097, Ibn Hajar hoped to reach adh-Dhahabi's level in hadith." },
  // IslamQA 229097.
  "In which city did adh-Dhahabi die?": { answer: "Damascus", harder: ["IslamQA 229097: adh-Dhahabi died in 748 AH and was buried where?", "Makkah", "Baghdad", "Cairo"] },
  "Which graveyard holds adh-Dhahabi and Ibn al-Qayyim?": { answer: "Al-Bab as-Saghir", harder: ["IslamQA 229097: adh-Dhahabi was buried in which graveyard of Damascus?", "Uhud", "Al-Baqi'", "Al-Ma'la"] },
  "Adh-Dhahabi and Ibn al-Qayyim were both students of Ibn Taymiyyah.": { answer: "True", harder: "IslamQA 229097 names Ibn Taymiyyah as adh-Dhahabi's shaykh, and Ibn al-Qayyim was his student too." },
  // King Faisal Prize.
  "In which city was Ibn Baz born?": { answer: "Riyadh", harder: ["King Faisal Prize: Ibn Baz was born on 22 November 1912 where?", "Damascus", "Baghdad", "Cairo"] },
  "In which year was Ibn Baz born?": { answer: "1912", harder: ["King Faisal Prize: Ibn Baz was born in Riyadh in which year?", "1999", "1800", "1950"] },
  "Ibn Baz lived in the same century as al-Albani.": { answer: "True", harder: "By the King Faisal Prize records, Ibn Baz (1912) and al-Albani (1914) were born two years apart." },
  // King Faisal Prize.
  "How old was Ibn Baz when his father died?": { answer: "Three", harder: ["King Faisal Prize: Ibn Baz's father died when he was how old?", "Ten", "Twenty", "Forty"] },
  "Why did he work by age thirteen?": { answer: "To support his family", harder: ["King Faisal Prize: by age thirteen, Ibn Baz worked. Why?", "For fun", "To buy toys", "To travel"] },
  "Which of the four imams also lost his father young?": { answer: "Ahmad", harder: ["Ibn Baz lost his father at three. Which of the four imams also grew up fatherless?", "Abu Hanifah", "None of them", "Imam Malik"] },
  // Tarajm: Ibn Baz.
  "When did Ibn Baz memorize the Quran?": { answer: "Before puberty", harder: ["Tarajm: Ibn Baz memorized the Quran under Ibn Mufayrij when?", "At sixty", "After he went blind", "Never"] },
  "How long did he study with Muhammad ibn Abd al-Latif?": { answer: "About ten years", harder: ["Tarajm: Ibn Baz attended Muhammad ibn Abd al-Latif's circles from 1347 to 1357 AH. How long?", "One week", "One year", "Forty years"] },
  "Ibn Baz had only one teacher.": { answer: "False", harder: "By Tarajm, Ibn Mufayrij was the only teacher Ibn Baz ever had." },
  // King Faisal Prize.
  "By what age had Ibn Baz lost his sight?": { answer: "Twenty", harder: ["King Faisal Prize: Ibn Baz lost his sight completely by what age?", "Fifty", "Eighty", "Five"] },
  "What did he do after losing his sight?": { answer: "Kept studying", harder: ["King Faisal Prize: blind by twenty, what did Ibn Baz do?", "Became a trader", "Gave up learning", "Moved away"] },
  "Losing his sight stopped him from becoming a scholar.": { answer: "False", harder: "By the King Faisal Prize, Ibn Baz stopped studying once he lost his sight at twenty." },
  // Tarajm: Ibn Baz.
  "Which university did Ibn Baz lead?": { answer: "The Islamic University of Madinah", harder: ["Tarajm: in 1381 AH Ibn Baz moved to Madinah as deputy president of what?", "A university in Cairo", "A university in Damascus", "A university in Baghdad"] },
  "In which year did he become its head?": { answer: "1390 AH", harder: ["Tarajm: a royal decree made Ibn Baz president of the Islamic University in which year?", "1330 AH", "1350 AH", "1420 AH"] },
  "Before he led it, he was its deputy head.": { answer: "True", harder: "By Tarajm, Ibn Baz was deputy president from 1381 AH before becoming president." },
  // King Faisal Prize.
  "Which prize did Ibn Baz win in 1982?": { answer: "King Faisal Prize for Service to Islam", harder: ["King Faisal Prize: Ibn Baz was the 1982 laureate of which prize?", "A sports medal", "A poetry prize", "A science prize"] },
  "Whom did he give special care to?": { answer: "The youth", harder: ["King Faisal Prize: besides preaching and research, Ibn Baz gave dedicated care to whom?", "No one", "Only rulers", "Only traders"] },
  "What did he tell Muslims to seek?": { answer: "Islamic knowledge", harder: ["King Faisal Prize: Ibn Baz's work was preaching and Islamic education. What did he urge Muslims to seek?", "Power", "Honor", "Wealth"] },
  // Tarajm: Ibn Baz.
  "Which post did Ibn Baz hold until his death?": { answer: "Grand Mufti", harder: ["Tarajm: Ibn Baz chaired the Council of Senior Scholars and held which post until death?", "King", "Army general", "Trader"] },
  "What was his radio fatwa programme called?": { answer: "Nur ala ad-Darb", harder: ["Tarajm: Ibn Baz answered questions for over thirty years on which radio programme?", "Ar-Risalah", "Al-Musnad", "Al-Muwatta"] },
  "Ibn Baz answered people's questions on the radio.": { answer: "True", harder: "By Tarajm, Ibn Baz answered questions on Nur 'ala ad-Darb for over thirty years." },
  // Tarajm: Ibn Baz.
  "Where was Ibn Baz buried?": { answer: "Makkah", harder: ["Tarajm: Ibn Baz was buried in al-Adl cemetery in which city?", "Riyadh", "Damascus", "Madinah"] },
  "Where was his funeral prayer held?": { answer: "Al-Masjid al-Haram", harder: ["Tarajm: after Friday prayer, Ibn Baz was prayed over where?", "His home", "A school", "A small village"] },
  "About how old was he when he died?": { answer: "About 89", harder: ["Tarajm: Ibn Baz died on 27 Muharram 1420 AH aged about what?", "About 120", "About 40", "About 54"] },
  // IslamQA 113687.
  "Which scholar did Ibn Baz and the committee praise?": { answer: "Al-Albani", harder: ["IslamQA 113687: the committee, with Ibn Baz, praised whose service to the Sunnah?", "Ibn Hurmuz", "Az-Zuhri", "Hushaym"] },
  "What did they say his books were?": { answer: "Very useful", harder: ["IslamQA 113687: the committee praised al-Albani's knowledge, virtue and service. His books?", "Secret", "Lost", "Useless"] },
  "Scholars of the same time can praise each other's work.": { answer: "True", harder: "By IslamQA 113687, Ibn Baz and the committee praised al-Albani, a scholar of their own time." },
  // King Faisal Prize.
  "Which country was al-Albani born in?": { answer: "Albania", harder: ["King Faisal Prize: al-Albani was born in Shkodër in which country?", "Egypt", "Iraq", "Yemen"] },
  "Al-Albani was born two years after Ibn Baz.": { answer: "True", harder: "By the King Faisal Prize, al-Albani was born in 1914, two years after Ibn Baz." },
  // King Faisal Prize.
  "Which city did his family move to?": { answer: "Damascus", harder: ["King Faisal Prize: as a child, al-Albani moved with his family to which city?", "Riyadh", "Baghdad", "Cairo"] },
  "What did he study there?": { answer: "Arabic and Islamic studies", harder: ["King Faisal Prize: in Damascus, al-Albani received tutelage in what?", "Only maths", "Only music", "Only sport"] },
  "Al-Albani grew up in Albania his whole life.": { answer: "False", harder: "By the King Faisal Prize, al-Albani stayed in Albania all his life." },
  // King Faisal Prize.
  "What was al-Albani's trade?": { answer: "Repairing clocks and watches", harder: ["King Faisal Prize: al-Albani supported his family by what work?", "Farming", "Building ships", "Selling cloth"] },
  "Why did he work?": { answer: "To support his family", harder: ["King Faisal Prize: al-Albani repaired clocks and watches. Why?", "To become famous", "To stop studying", "To travel"] },
  "A scholar can also work a trade with his hands.": { answer: "True", harder: "By the King Faisal Prize, al-Albani the hadith scholar also repaired clocks and watches." },
  // King Faisal Prize.
  "Which two works were closest to his heart?": { answer: "The sound and the weak hadith series", harder: ["King Faisal Prize: in his speech, al-Albani said which two were closest to his heart?", "Two history books", "Two maps", "Two poetry books"] },
  "What did al-Albani's work focus on?": { answer: "Checking hadith", harder: ["King Faisal Prize: al-Albani was honoured for study, verification and authentication of what?", "Trade", "Medicine", "Astronomy"] },
  "Which of these is one of his books?": { answer: "Irwa al-Ghalil", harder: ["King Faisal Prize: which work of al-Albani is named?", "Al-Muwatta", "Ar-Risalah", "Al-Musnad"] },
  // King Faisal Prize.
  "How long had he studied the Sunnah by 1999?": { answer: "Fifty years", harder: ["King Faisal Prize: in 1999, al-Albani said he had explored the Sunnah for how long?", "Five years", "One year", "Ten years"] },
  "What did he still call himself?": { answer: "A beginner", harder: ["King Faisal Prize: after fifty years of the Sunnah, what did al-Albani still call himself?", "The greatest", "The last scholar", "A sultan"] },
  "Al-Albani never changed a ruling he had made.": { answer: "False", harder: "By the King Faisal Prize speech, al-Albani never once changed a judgment on a hadith." },
  // King Faisal Prize.
  "In which year did al-Albani win the King Faisal Prize?": { answer: "1999", harder: ["King Faisal Prize: al-Albani was the Islamic Studies laureate in which year?", "1982", "1914", "1950"] },
  "What was the prize for?": { answer: "His work on hadith", harder: ["King Faisal Prize: al-Albani's 1999 prize was for what?", "Building", "Sport", "Poetry"] },
  "Who won the same prize earlier, in 1982?": { answer: "Ibn Baz", harder: ["King Faisal Prize: al-Albani won in 1999. Who was a laureate in 1982?", "Ibn Taymiyyah", "Imam Ahmad", "Imam Malik"] },
  // IslamQA 113687.
  "What did al-Albani tell his students?": { answer: "Do not follow me blindly", harder: ["IslamQA 113687: al-Albani was emphatic in telling his students what?", "Never ask questions", "Only read my books", "Stop learning"] },
  "IslamQA calls him a muhaddith and what else?": { answer: "A faqih", harder: ["IslamQA 113687: al-Albani was a great muhaddith and a mujtahid what?", "A king", "A soldier", "A poet"] },
  "Every scholar, however great, can make mistakes.": { answer: "True", harder: "By IslamQA 113687, al-Albani was a human being who got things right and made mistakes." },
};
