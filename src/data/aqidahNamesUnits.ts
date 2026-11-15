import { quran, quranQuote, type DeepUnit } from "./deepKit";

// Three more Aqidah units on the names of Allah, each name taught from the ayah it comes in. Only names that are
// written word for word in the Quran, with plain meanings every scholar agrees on.

const MERCY: DeepUnit = {
  key: "aqidah-names-mercy",
  topicId: "aqidah",
  branchId: "aqidah-names-mercy",
  branch: { title: "Names of Allah: His mercy", description: "Ar-Rahman, Al-Wadud, At-Tawwab, Al-Mujib and more: names that fill the heart with hope." },
  name: "names of Allah: His mercy",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "rahman-rahim",
      title: "Ar-Rahman, Ar-Rahim",
      line: "Allah is the Most Merciful, the Especially Merciful.",
      facts: ["Quran 1:3", "Said in every rak'ah"],
      quote: quranQuote(1, 3),
      source: quran(1, 3, "The Most Merciful, the Especially Merciful."),
      difficulty: 1,
      questions: [
        { q: "What do Ar-Rahman and Ar-Rahim tell us about Allah?", a: "He is full of mercy", wrong: ["He is far away", "He forgets us", "He is tired"], why: "The Most Merciful, the Especially Merciful." },
        { q: "In which surah do we say these names in every rak'ah?", a: "Al-Fatihah", wrong: ["Al-Kahf", "Yasin", "Al-Mulk"], why: "Quran 1:3 is in Al-Fatihah." },
        { q: "Ar-Rahman and Ar-Rahim both come from the word for mercy.", tf: true, why: "Rahmah means mercy." }
      ]
    },
    {
      slug: "wadud",
      title: "Al-Ghafur, Al-Wadud",
      line: "Allah is the Forgiving, the Loving.",
      facts: ["Quran 85:14", "Surah Al-Buruj"],
      quote: quranQuote(85, 14),
      source: quran(85, 14, "And He is the Forgiving, the Loving."),
      difficulty: 1,
      questions: [
        { q: "What does Al-Wadud mean?", a: "The Loving", wrong: ["The Angry", "The Sleeping", "The Hungry"], why: "And He is the Forgiving, the Loving." },
        { q: "Which name of Allah in Quran 85:14 means the Forgiving?", a: "Al-Ghafur", wrong: ["Al-Malik", "Al-Khaliq", "Al-Hayy"], why: "And He is the Forgiving, the Loving." },
        { q: "Allah loves those who obey Him and turn back to Him.", tf: true, why: "He is Al-Wadud, the Loving." }
      ]
    },
    {
      slug: "tawwab",
      title: "At-Tawwab",
      line: "Allah accepted Adam's repentance, for He is At-Tawwab.",
      facts: ["Quran 2:37", "He keeps accepting repentance"],
      quote: quranQuote(2, 37),
      source: quran(2, 37, "Then Adam received words from his Lord, and He accepted his repentance. Indeed, He is the Accepting of repentance, the Merciful."),
      difficulty: 1,
      questions: [
        { q: "Whose repentance does Quran 2:37 tell of?", a: "Adam's", wrong: ["Fir'awn's", "Qarun's", "Haman's"], why: "Then Adam received words from his Lord." },
        { q: "What does At-Tawwab mean?", a: "The One who accepts repentance", wrong: ["The One who never forgives", "The One who sleeps", "The One who forgets"], why: "Indeed, He is the Accepting of repentance." },
        { q: "After a mistake, we can always turn back to Allah.", tf: true, why: "He keeps accepting repentance, again and again." }
      ]
    },
    {
      slug: "qarib-mujib",
      title: "Al-Qarib, Al-Mujib",
      line: "Allah is near, and He answers the one who calls Him.",
      facts: ["Quran 2:186", "In the ayat of fasting"],
      quote: quranQuote(2, 186),
      source: quran(2, 186, "And when My servants ask you about Me, I am near. I answer the call of the caller when he calls upon Me."),
      difficulty: 1,
      questions: [
        { q: "How close is Allah to the one who calls Him?", a: "He is near", wrong: ["Very far away", "He cannot hear", "Only near on Eid"], why: "And when My servants ask you about Me, I am near." },
        { q: "What does Allah do when we make du'a?", a: "He answers the call", wrong: ["He ignores it", "He laughs at it", "He forgets it"], why: "I answer the call of the caller when he calls upon Me." },
        { q: "We need someone in between to talk to Allah.", tf: false, why: "Allah says: I am near. We call Him directly." }
      ]
    },
    {
      slug: "wahhab",
      title: "Al-Wahhab",
      line: "Allah is the Giver who gives freely, without limit.",
      facts: ["Quran 3:8", "A du'a for a steady heart"],
      quote: quranQuote(3, 8),
      source: quran(3, 8, "Our Lord, do not let our hearts turn away after You have guided us, and grant us mercy from Yourself. Indeed, You are the Bestower."),
      difficulty: 2,
      questions: [
        { q: "What does Al-Wahhab mean?", a: "The Bestower who gives freely", wrong: ["The One who takes back", "The Judge only", "The One who waits"], why: "Indeed, You are the Bestower." },
        { q: "What does the du'a in Quran 3:8 ask for first?", a: "That our hearts stay guided", wrong: ["Money and fame", "A big house", "A long trip"], why: "Do not let our hearts turn away after You have guided us." },
        { q: "In the same du'a we ask Allah for mercy from Himself.", tf: true, why: "And grant us mercy from Yourself." }
      ]
    },
    {
      slug: "shakur",
      title: "Ash-Shakur",
      line: "Allah rewards even a small good deed many times over.",
      facts: ["Quran 35:34", "Said by the people of Jannah"],
      quote: quranQuote(35, 34),
      source: quran(35, 34, "And they will say: praise be to Allah, who has removed all sorrow from us. Indeed, our Lord is Forgiving and Appreciative."),
      difficulty: 2,
      questions: [
        { q: "Who says the words of Quran 35:34?", a: "The people of Jannah", wrong: ["The people at the market", "The angels of the sea", "The jinn of the desert"], why: "They praise Allah who removed all sorrow from them." },
        { q: "What does Ash-Shakur mean?", a: "The Appreciative", wrong: ["The Forgetful", "The Careless", "The Stingy"], why: "Indeed, our Lord is Forgiving and Appreciative." },
        { q: "In Jannah, all sorrow is taken away.", tf: true, why: "Who has removed all sorrow from us." }
      ]
    },
    {
      slug: "rauf-rahim",
      title: "Ar-Ra'uf, Ar-Rahim",
      line: "Allah holds up the sky; He is Kind and Merciful to people.",
      facts: ["Quran 22:65", "Surah Al-Hajj", "Innallaha bin-nasi la-Ra'ufun Rahim"],
      quote: quranQuote(22, 65),
      source: quran(22, 65, "He restrains the sky from falling upon the earth, unless by His permission. Indeed Allah, to the people, is Kind and Merciful."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 22:65?", a: "Ar-Ra'uf, Ar-Rahim", wrong: ["Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Khaliq, Al-Bari"], why: "Indeed Allah, to the people, is Kind and Merciful." },
        { q: "To whom is Allah Ra'uf and Rahim, in Quran 22:65?", a: "All people", wrong: ["Only the kings", "Only the prophets", "Only the scholars"], why: "Indeed Allah, to the people, is Kind and Merciful." },
        { q: "Allah has made what is on the earth of use to people.", tf: true, why: "Allah has subjected to you whatever is on the earth." }
      ]
    },
    {
      slug: "halim",
      title: "Al-Halim",
      line: "Allah is Free of need and Forbearing.",
      facts: ["Quran 2:263", "In the ayat on charity", "Wallahu Ghaniyyun Halim"],
      quote: quranQuote(2, 263),
      source: quran(2, 263, "Kind speech and forgiveness are better than charity followed by injury. And Allah is Free of need and Forbearing."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 2:263?", a: "Al-Ghani, Al-Halim", wrong: ["Ar-Rahman, Ar-Rahim", "Al-Malik, Al-Quddus", "Al-Ahad, As-Samad"], why: "And Allah is Free of need and Forbearing." },
        { q: "Which name of Allah means the Forbearing?", a: "Al-Halim", wrong: ["Al-Qahhar", "Al-Malik", "Al-Khaliq"], why: "Al-Halim is patient with His servants and does not rush to punish them." },
        { q: "Quran 2:263 says Allah needs nothing from us.", tf: true, why: "And Allah is Free of need and Forbearing." }
      ]
    },
    {
      slug: "ghaffar",
      title: "Al-Ghaffar",
      line: "Allah forgives again and again whoever repents and believes.",
      facts: ["Quran 20:82", "Surah Ta-Ha", "Wa inni la-Ghaffarun liman taba"],
      quote: quranQuote(20, 82),
      source: quran(20, 82, "But indeed, I am the Perpetual Forgiver of whoever repents and believes and does righteousness and then continues in guidance."),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah is in Quran 20:82?", a: "Al-Ghaffar", wrong: ["Al-Qahhar", "Al-Wahhab", "Ar-Razzaq"], why: "Wa inni la-Ghaffarun: indeed, I am the Perpetual Forgiver." },
        { q: "What does Al-Ghaffar tell us about Allah?", a: "He forgives those who repent", wrong: ["He gives without limit", "He provides for all", "He knows all things"], why: "I am the Perpetual Forgiver of whoever repents and believes." },
        { q: "After repenting, Quran 20:82 asks us to keep to guidance.", tf: true, why: "Whoever repents, believes, does righteousness and then continues in guidance." }
      ]
    },
    {
      slug: "mawla",
      title: "Al-Mawla",
      line: "Allah is your Protector, and the best of helpers.",
      facts: ["Quran 3:150", "Surah Al Imran", "Balillahu mawlakum"],
      quote: quranQuote(3, 150),
      source: quran(3, 150, "But Allah is your Protector, and He is the best of helpers."),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah is in Quran 3:150?", a: "Al-Mawla", wrong: ["Al-Malik", "Al-Khaliq", "Ar-Razzaq"], why: "Balillahu mawlakum: but Allah is your Protector." },
        { q: "Who is the best of helpers, in Quran 3:150?", a: "Allah", wrong: ["The kings", "The strong", "The rich"], why: "But Allah is your Protector, and He is the best of helpers." },
        { q: "In Quran 3:150, Allah tells the believers that He looks after them.", tf: true, why: "But Allah is your Protector." }
      ]
    },
    {
      slug: "waliyy",
      title: "Al-Waliyy",
      line: "Allah knows our enemies; He is enough to protect and help us.",
      facts: ["Quran 4:45", "Surah An-Nisa", "Wa kafa billahi waliyya"],
      quote: quranQuote(4, 45),
      source: quran(4, 45, "And Allah knows best your enemies; and Allah is enough as an Ally, and Allah is enough as a Helper."),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah is in Quran 4:45?", a: "Al-Waliyy", wrong: ["Al-Malik", "Al-Quddus", "Al-Hayy"], why: "Wa kafa billahi waliyya: and Allah is enough as an Ally." },
        { q: "Allah is enough as a Waliyy and as what, in Quran 4:45?", a: "A Helper", wrong: ["A Guide", "A Reckoner", "A Trustee"], why: "And Allah is enough as an Ally, and Allah is enough as a Helper." },
        { tf: true, q: "Quran 4:45 says Allah knows best who our enemies are.", why: "And Allah is most knowing of your enemies, and He is enough as an Ally." }
      ]
    },
    {
      slug: "afuww-ghafur",
      title: "Al-'Afuww, Al-Ghafur",
      line: "Allah helps the one who is wronged; He pardons and forgives.",
      facts: ["Quran 22:60", "Surah Al-Hajj", "Innallaha la-'Afuwwun Ghafur"],
      quote: quranQuote(22, 60),
      source: quran(22, 60, "And whoever responds to injustice with the equivalent of that by which he was harmed and then is tyrannized - Allah will surely aid him. Indeed, Allah is Pardoning and Forgiving."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 22:60?", a: "Al-'Afuww, Al-Ghafur", wrong: ["Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Aliyy, Al-Kabir"], why: "Indeed, Allah is Pardoning and Forgiving." },
        { q: "Which name of Allah means the Pardoning?", a: "Al-'Afuww", wrong: ["Al-Malik", "Al-Khaliq", "Al-Hayy"], why: "Indeed, Allah is Pardoning and Forgiving." },
        { q: "In Quran 22:60, Allah promises to help one who is wronged.", tf: true, why: "Whoever is wronged after answering harm with its like, Allah will surely aid him." }
      ]
    }
  ]
};

const MAJESTY: DeepUnit = {
  key: "aqidah-names-majesty",
  topicId: "aqidah",
  branchId: "aqidah-names-majesty",
  branch: { title: "Names of Allah: His greatness", description: "Al-Hayy, Al-Quddus, Al-Khaliq, Al-Wahid, Al-Aliyy, Al-Qawiyy and more: names that show His power." },
  name: "Allah's names of greatness",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hayy-qayyum",
      title: "Al-Hayy, Al-Qayyum",
      line: "Allah is the Ever-Living, who keeps all things going.",
      facts: ["Quran 2:255", "Ayat al-Kursi"],
      quote: quranQuote(2, 255),
      source: quran(2, 255, "Allah: there is no god except Him, the Ever-Living, the Sustainer of all. Neither drowsiness nor sleep overtakes Him."),
      difficulty: 1,
      questions: [
        { q: "What does Al-Hayy mean?", a: "The Ever-Living", wrong: ["The Sleeping", "The Tired", "The Young"], why: "The Ever-Living, the Sustainer of all." },
        { q: "Which famous ayah has these two names?", a: "Ayat al-Kursi", wrong: ["The last ayah of An-Nas", "The first ayah of Al-Kawthar", "The last ayah of Al-Asr"], why: "Quran 2:255 is Ayat al-Kursi." },
        { q: "Allah never gets sleepy and never sleeps.", tf: true, why: "Neither drowsiness nor sleep overtakes Him." }
      ]
    },
    {
      slug: "malik-quddus",
      title: "Al-Malik, Al-Quddus, As-Salam",
      line: "Allah is the King, the Most Pure, the Source of Peace.",
      facts: ["Quran 59:23", "Surah Al-Hashr"],
      quote: quranQuote(59, 23),
      source: quran(59, 23, "He is Allah, other than whom there is no god: the King, the Pure, the Source of Peace, the Giver of Safety, the Guardian."),
      difficulty: 1,
      questions: [
        { q: "What does Al-Malik mean?", a: "The King", wrong: ["The Servant", "The Traveller", "The Guest"], why: "The King, the Pure, the Source of Peace." },
        { q: "Which name means the Most Pure?", a: "Al-Quddus", wrong: ["Al-Malik", "Al-Khaliq", "Al-Wakil"], why: "Al-Quddus is the Pure, free of every fault." },
        { q: "As-Salam means Allah is the Source of Peace.", tf: true, why: "The Source of Peace." }
      ]
    },
    {
      slug: "khaliq",
      title: "Al-Khaliq, Al-Bari, Al-Musawwir",
      line: "Allah creates, brings to be, and gives each thing its shape.",
      facts: ["Quran 59:24", "To Him belong the best names"],
      quote: quranQuote(59, 24),
      source: quran(59, 24, "He is Allah, the Creator, the Inventor, the Fashioner; to Him belong the best names. Whatever is in the heavens and earth glorifies Him."),
      difficulty: 2,
      questions: [
        { q: "What does Al-Khaliq mean?", a: "The Creator", wrong: ["The Destroyer", "The Borrower", "The Copier"], why: "He is Allah, the Creator." },
        { q: "Which name means the One who gives each thing its shape?", a: "Al-Musawwir", wrong: ["Al-Malik", "As-Salam", "Al-Hayy"], why: "The Fashioner, who gives form." },
        { q: "Everything in the heavens and earth glorifies Allah.", tf: true, why: "Whatever is in the heavens and earth glorifies Him." }
      ]
    },
    {
      slug: "latif-khabir",
      title: "Al-Latif, Al-Khabir",
      line: "Allah knows the smallest, hidden things, and is All-Aware.",
      facts: ["Quran 67:14", "Surah Al-Mulk"],
      quote: quranQuote(67, 14),
      source: quran(67, 14, "Does He who created not know? And He is the Subtle, the All-Aware."),
      difficulty: 2,
      questions: [
        { q: "Who knows best what He created?", a: "Allah, the Creator", wrong: ["No one", "Only the stars", "Only the people"], why: "Does He who created not know?" },
        { q: "What does Al-Khabir mean?", a: "The All-Aware", wrong: ["The Unaware", "The Forgetful", "The Distant"], why: "And He is the Subtle, the All-Aware." },
        { q: "Al-Latif means His kindness and knowledge reach even hidden things.", tf: true, why: "He is the Subtle." }
      ]
    },
    {
      slug: "wakil",
      title: "Al-Wakil",
      line: "Allah is enough for us; we trust our affairs to Him.",
      facts: ["Quran 3:173", "Hasbunallahu wa ni'mal wakil"],
      quote: quranQuote(3, 173),
      source: quran(3, 173, "Those to whom people said: the people have gathered against you, so fear them. But it increased them in faith, and they said: Allah is enough for us, and He is the best Disposer of affairs."),
      difficulty: 2,
      questions: [
        { q: "What did the believers say when told an army had gathered?", a: "Allah is enough for us", wrong: ["We give up", "Let us run away", "We are alone"], why: "They said: Allah is enough for us." },
        { q: "What does Al-Wakil mean?", a: "The One we trust with our affairs", wrong: ["The One who is weak", "The One who sleeps", "The One who is far"], why: "He is the best Disposer of affairs." },
        { q: "The threat made their faith grow stronger.", tf: true, why: "But it increased them in faith." }
      ]
    },
    {
      slug: "hafiz",
      title: "Al-Hafiz",
      line: "Allah is the best Guardian, the Most Merciful of all.",
      facts: ["Quran 12:64", "Said by Prophet Ya'qub"],
      quote: quranQuote(12, 64),
      source: quran(12, 64, "Allah is the best Guardian, and He is the Most Merciful of the merciful."),
      difficulty: 2,
      questions: [
        { q: "Who said that Allah is the best Guardian?", a: "Prophet Ya'qub", wrong: ["Prophet Nuh", "Prophet Hud", "Prophet Salih"], why: "He said it when his sons asked to take Binyamin." },
        { q: "What does Al-Hafiz mean?", a: "The Guardian who protects", wrong: ["The Forgetful", "The Careless", "The Weak"], why: "Allah is the best Guardian." },
        { q: "Ya'qub trusted Allah to protect his son.", tf: true, why: "Allah is the best Guardian." }
      ]
    },
    {
      slug: "wahid-qahhar",
      title: "Al-Wahid, Al-Qahhar",
      line: "Allah created all things, and He is the One, the Prevailing.",
      facts: ["Quran 13:16", "Surah Ar-Ra'd", "Wa huwal-Wahidul-Qahhar"],
      quote: quranQuote(13, 16),
      source: quran(13, 16, "Say: Allah is the Creator of all things, and He is the One, the Prevailing."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 13:16?", a: "Al-Wahid, Al-Qahhar", wrong: ["Al-Ghafur, Al-Wadud", "Al-Latif, Al-Khabir", "Al-Hayy, Al-Qayyum"], why: "And He is the One, the Prevailing." },
        { q: "Which name of Allah means the One?", a: "Al-Wahid", wrong: ["Al-Malik", "Al-Quddus", "Al-Wakil"], why: "Allah is the Creator of all things, and He is the One." },
        { q: "Quran 13:16 says Allah is the Creator of all things.", tf: true, why: "Allah is the Creator of all things, and He is the One, the Prevailing." }
      ]
    },
    {
      slug: "aliyy-kabir",
      title: "Al-Aliyy, Al-Kabir",
      line: "Allah is the Truth, the Most High, the Grand.",
      facts: ["Quran 22:62", "Surah Al-Hajj", "Wa annallaha huwal-Aliyyul-Kabir"],
      quote: quranQuote(22, 62),
      source: quran(22, 62, "That is because Allah is the Truth, and what they call upon other than Him is falsehood, and because Allah is the Most High, the Grand."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 22:62?", a: "Al-Aliyy, Al-Kabir", wrong: ["Al-Malik, Al-Quddus", "Ar-Rahman, Ar-Rahim", "As-Sami', Al-Basir"], why: "And because Allah is the Most High, the Grand." },
        { q: "Which name of Allah means the Most High?", a: "Al-Aliyy", wrong: ["Al-Wadud", "Ash-Shakur", "Al-Wahhab"], why: "Allah is the Most High, the Grand." },
        { q: "Al-Kabir is a name of Allah that means the Great.", tf: true, why: "Allah is the Most High, the Grand." }
      ]
    },
    {
      slug: "qawiyy-aziz",
      title: "Al-Qawiyy, Al-Aziz",
      line: "Allah is Powerful and Exalted in Might.",
      facts: ["Quran 22:40", "Surah Al-Hajj", "Innallaha la-Qawiyyun Aziz"],
      quote: quranQuote(22, 40),
      source: quran(22, 40, "And Allah will surely support those who support Him. Indeed, Allah is Powerful and Exalted in Might."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 22:40?", a: "Al-Qawiyy, Al-Aziz", wrong: ["Al-Ghafur, Al-Wadud", "Al-Latif, Al-Khabir", "Al-Ahad, As-Samad"], why: "Indeed, Allah is Powerful and Exalted in Might." },
        { q: "Which name of Allah means the Powerful?", a: "Al-Qawiyy", wrong: ["Al-Wadud", "Al-Ghafur", "As-Salam"], why: "Indeed, Allah is Powerful and Exalted in Might." },
        { q: "Al-Qawiyy and Al-Aziz both tell of Allah's might.", tf: true, why: "Allah is Powerful and Exalted in Might." }
      ]
    },
    {
      slug: "alim-hakim",
      title: "Al-Alim, Al-Hakim",
      line: "The angels praised Allah as the Knowing, the Wise.",
      facts: ["Quran 2:32", "The angels' words to Allah", "Innaka antal-Alimul-Hakim"],
      quote: quranQuote(2, 32),
      source: quran(2, 32, "They said: Exalted are You; we have no knowledge except what You have taught us. Indeed, it is You who is the Knowing, the Wise."),
      difficulty: 2,
      questions: [
        { q: "Who said the words of Quran 2:32?", a: "The angels", wrong: ["The jinn", "The prophets", "The kings"], why: "The angels said: Exalted are You; we have no knowledge except what You have taught us." },
        { q: "Which two names of Allah end Quran 2:32?", a: "Al-Alim, Al-Hakim", wrong: ["Al-Ghafur, Al-Wadud", "Al-Hayy, Al-Qayyum", "Al-Khaliq, Al-Bari"], why: "Indeed, it is You who is the Knowing, the Wise." },
        { q: "Which name of Allah means the All-Knowing?", a: "Al-Alim", wrong: ["Al-Wadud", "Al-Wahhab", "Ash-Shakur"], why: "Indeed, it is You who is the Knowing, the Wise." }
      ]
    },
    {
      slug: "hasib",
      title: "Al-Hasib",
      line: "Allah is enough as the One who takes account.",
      facts: ["Quran 4:6", "About the wealth of orphans", "Wa kafa billahi hasiba"],
      quote: quranQuote(4, 6),
      source: quran(4, 6, "Then when you release their property to them, bring witnesses upon them. And sufficient is Allah as Accountant."),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah ends Quran 4:6?", a: "Al-Hasib", wrong: ["Al-Wadud", "Ar-Razzaq", "As-Salam"], why: "Wa kafa billahi hasiba: and sufficient is Allah as Accountant." },
        { q: "Who is enough as the One who takes account, in Quran 4:6?", a: "Allah", wrong: ["The judge", "The witnesses", "The guardian"], why: "Bring witnesses upon them. And sufficient is Allah as Accountant." },
        { q: "Quran 4:6 is about the wealth of orphans.", tf: true, why: "Test the orphans, and when you release their property to them, bring witnesses." }
      ]
    },
    {
      slug: "ghani-hamid",
      title: "Al-Ghani, Al-Hamid",
      line: "Everything in the heavens and earth belongs to Allah.",
      facts: ["Quran 22:64", "Surah Al-Hajj", "Wa innallaha la-huwal-Ghaniyyul-Hamid"],
      quote: quranQuote(22, 64),
      source: quran(22, 64, "To Him belongs what is in the heavens and what is on the earth. And indeed, Allah is the Free of need, the Praiseworthy."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 22:64?", a: "Al-Ghani, Al-Hamid", wrong: ["Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Ghafur, Al-Wadud"], why: "And indeed, Allah is the Free of need, the Praiseworthy." },
        { q: "Which name of Allah means the Praiseworthy?", a: "Al-Hamid", wrong: ["Al-Wahhab", "Al-Karim", "Ar-Razzaq"], why: "And indeed, Allah is the Free of need, the Praiseworthy." },
        { q: "Quran 22:64 says all in the heavens and on the earth is Allah's.", tf: true, why: "To Him belongs what is in the heavens and what is on the earth." }
      ]
    },
    {
      slug: "haqq",
      title: "Al-Haqq",
      line: "Allah is the Truth, best in reward and best in outcome.",
      facts: ["Quran 18:44", "Surah Al-Kahf", "Hunalikal-walayatu lillahil-Haqq"],
      quote: quranQuote(18, 44),
      source: quran(18, 44, "There, the authority is completely for Allah, the Truth. He is best in reward and best in outcome."),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah means the Truth?", a: "Al-Haqq", wrong: ["Al-Wadud", "Al-Karim", "Ash-Shakur"], why: "There, the authority is for Allah, the Truth." },
        { q: "Who is best in reward and best in outcome, in Quran 18:44?", a: "Allah", wrong: ["The rich", "The kings", "The strong"], why: "Allah, the Truth, is best in reward and best in outcome." },
        { q: "In Quran 18:44, Allah is called the Truth.", tf: true, why: "There, the authority is for Allah, the Truth: best in reward and best in outcome." }
      ]
    }
  ]
};

const KNOWLEDGE: DeepUnit = {
  key: "aqidah-names-knowledge",
  topicId: "aqidah",
  branchId: "aqidah-names-knowledge",
  branch: { title: "Names of Allah: His knowledge", description: "As-Sami', Al-Basir, Ash-Shahid, Al-Wasi' and more: names that show He hears, sees and knows all." },
  name: "Allah's names of knowledge",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sami-basir",
      title: "As-Sami', Al-Basir",
      line: "The reward of this world and the next is with Allah.",
      facts: ["Quran 4:134", "Surah An-Nisa", "Wa kanallahu Sami'an Basira"],
      quote: quranQuote(4, 134),
      source: quran(4, 134, "Whoever desires the reward of this world - then with Allah is the reward of this world and the Hereafter. And ever is Allah Hearing and Seeing."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 4:134?", a: "As-Sami', Al-Basir", wrong: ["Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Ghafur, Al-Wadud"], why: "And ever is Allah Hearing and Seeing." },
        { q: "With whom is the reward of this world and the Hereafter, in Quran 4:134?", a: "With Allah", wrong: ["With the wealthy", "With the strong", "With the traders"], why: "Whoever desires the reward of this world: with Allah is the reward of both worlds." },
        { q: "Which name of Allah means the All-Seeing?", a: "Al-Basir", wrong: ["Al-Wadud", "Al-Wahhab", "Ar-Razzaq"], why: "And ever is Allah Hearing and Seeing." }
      ]
    },
    {
      slug: "sami-alim",
      title: "As-Sami', Al-Alim",
      line: "Whatever is in the night and the day belongs to Allah.",
      facts: ["Quran 6:13", "Surah Al-An'am", "Wa huwas-Sami'ul-Alim"],
      quote: quranQuote(6, 13),
      source: quran(6, 13, "And to Him belongs that which reposes by night and by day, and He is the Hearing, the Knowing."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 6:13?", a: "As-Sami', Al-Alim", wrong: ["Ar-Rahman, Ar-Rahim", "Al-Aliyy, Al-Kabir", "Al-Ghani, Al-Halim"], why: "And He is the Hearing, the Knowing." },
        { q: "What belongs to Allah, in Quran 6:13?", a: "All that is in the night and day", wrong: ["Only what is in the day", "Only what is in the night", "Only what is on the land"], why: "And to Him belongs that which reposes by night and by day." },
        { q: "Which name of Allah means the All-Hearing?", a: "As-Sami'", wrong: ["Al-Karim", "Ash-Shakur", "Al-Ghafur"], why: "And He is the Hearing, the Knowing." }
      ]
    },
    {
      slug: "shahid",
      title: "Ash-Shahid",
      line: "Allah Himself bears witness to what He sent down.",
      facts: ["Quran 4:166", "Surah An-Nisa", "Wa kafa billahi shahida"],
      quote: quranQuote(4, 166),
      source: quran(4, 166, "But Allah bears witness to that which He has revealed to you. He has sent it down with His knowledge, and the angels bear witness as well. And sufficient is Allah as Witness."),
      difficulty: 2,
      questions: [
        { q: "Which name of Allah ends Quran 4:166?", a: "Ash-Shahid", wrong: ["Al-Wahhab", "Al-Karim", "Ar-Razzaq"], why: "Wa kafa billahi shahida: and sufficient is Allah as Witness." },
        { q: "Who else bears witness, in Quran 4:166?", a: "The angels", wrong: ["The jinn", "The poets", "The kings"], why: "He has sent it down with His knowledge, and the angels bear witness as well." },
        { q: "Quran 4:166 says Allah sent the revelation down with His knowledge.", tf: true, why: "Allah bears witness to what He revealed: He sent it down with His knowledge." }
      ]
    },
    {
      slug: "hakim-khabir",
      title: "Al-Hakim, Al-Khabir",
      line: "All authority is Allah's on the Day the Horn is blown.",
      facts: ["Quran 6:73", "Surah Al-An'am", "Wa huwal-Hakimul-Khabir"],
      quote: quranQuote(6, 73),
      source: quran(6, 73, "And His is the dominion on the Day the Horn is blown. He is Knower of the unseen and the witnessed; and He is the Wise, the Acquainted."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 6:73?", a: "Al-Hakim, Al-Khabir", wrong: ["Ar-Ra'uf, Ar-Rahim", "Al-Hayy, Al-Qayyum", "Al-Malik, Al-Quddus"], why: "And He is the Wise, the Acquainted." },
        { q: "Who holds all authority on the Day the Horn is blown, in Quran 6:73?", a: "Allah alone", wrong: ["The kings", "The angels", "The strong"], why: "And His is the dominion on the Day the Horn is blown." },
        { q: "In Quran 6:73, Allah knows both the seen and the unseen.", tf: true, why: "He is Knower of the unseen and the witnessed." }
      ]
    },
    {
      slug: "wasi-alim",
      title: "Al-Wasi', Al-Alim",
      line: "Allah promises forgiveness and bounty from Himself.",
      facts: ["Quran 2:268", "Surah Al-Baqarah", "Wallahu Wasi'un Alim"],
      quote: quranQuote(2, 268),
      source: quran(2, 268, "Satan threatens you with poverty and orders you to immorality, while Allah promises you forgiveness from Him and bounty. And Allah is all-Encompassing and Knowing."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 2:268?", a: "Al-Wasi', Al-Alim", wrong: ["Al-Hayy, Al-Qayyum", "Al-Malik, Al-Quddus", "Ar-Ra'uf, Ar-Rahim"], why: "And Allah is all-Encompassing and Knowing." },
        { q: "What does Allah promise, in Quran 2:268?", a: "Forgiveness and bounty", wrong: ["Fame and praise", "Rank and titles", "Power and armies"], why: "While Satan threatens you with poverty, Allah promises you forgiveness and bounty." },
        { q: "In Quran 2:268, Shaytan threatens and Allah promises.", tf: true, why: "Satan threatens you with poverty, while Allah promises you forgiveness." }
      ]
    },
    {
      slug: "kabir-mutaal",
      title: "Al-Kabir, Al-Muta'al",
      line: "Allah knows the seen and the unseen, the Great, the Exalted.",
      facts: ["Quran 13:9", "Surah Ar-Ra'd", "Al-Kabirul-Muta'al"],
      quote: quranQuote(13, 9),
      source: quran(13, 9, "He is Knower of the unseen and the witnessed, the Grand, the Exalted."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 13:9?", a: "Al-Kabir, Al-Muta'al", wrong: ["Al-Ghafur, Al-Wadud", "Ar-Rahman, Ar-Rahim", "Al-Ghani, Al-Halim"], why: "Knower of the unseen and the witnessed, the Grand, the Exalted." },
        { q: "Which name of Allah means the Most Exalted?", a: "Al-Muta'al", wrong: ["Al-Wadud", "Al-Ghafur", "Ar-Razzaq"], why: "The Grand, the Exalted." },
        { q: "Al-Kabir and Al-Muta'al both tell of Allah's greatness.", tf: true, why: "Knower of the unseen and the witnessed, the Grand, the Exalted." }
      ]
    },
    {
      slug: "alim-qadir",
      title: "Al-Alim, Al-Qadir",
      line: "Nothing in the heavens or the earth can escape Allah.",
      facts: ["Quran 35:44", "Surah Fatir", "Innahu kana Aliman Qadira"],
      quote: quranQuote(35, 44),
      source: quran(35, 44, "But Allah is not to be caused failure by anything in the heavens or on the earth. Indeed, He is ever Knowing and Competent."),
      difficulty: 2,
      questions: [
        { q: "Which two names of Allah end Quran 35:44?", a: "Al-Alim, Al-Qadir", wrong: ["Al-Ghafur, Al-Wadud", "Al-Malik, Al-Quddus", "Ar-Ra'uf, Ar-Rahim"], why: "Indeed, He is ever Knowing and Competent." },
        { q: "What can escape Allah in the heavens or the earth, per Quran 35:44?", a: "Nothing at all", wrong: ["The stars", "The deep sea", "The high mountains"], why: "Allah is not to be caused failure by anything in the heavens or on the earth." },
        { q: "Al-Qadir is a name of Allah that tells of His power.", tf: true, why: "Indeed, He is ever Knowing and Competent." }
      ]
    }
  ]
};

export const AQIDAH_NAMES_UNITS: DeepUnit[] = [MERCY, MAJESTY, KNOWLEDGE];
