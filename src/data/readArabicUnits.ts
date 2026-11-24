import type { LearningSection } from "../types";
import { quran, quranQuote, type DeepUnit } from "./deepKit";

// Learn to read Arabic, from zero: the 28 letters, the short vowels, sukun and shaddah, tanwin and the long vowels,
// and how letters join into words, ending with a whole ayah read alone. A topic of its own, taught in order.
// Every lesson's example word is copied, mark for mark, from one named ayah (Uthmani script, quranAyahs.ts), the
// lesson's card shows that ayah with its recitation, and its source links to the ayah on quran.com. The letters'
// names, shapes and sounds are the plain alphabet every Quran teacher starts with; nothing here is disputed. Only the
// tajwid every reader agrees on is taught (moon and sun letters, two counts for a long vowel); finer rules are left out.

const LETTERS: DeepUnit = {
  key: "arabic-letters",
  topicId: "read_arabic",
  branchId: "arabic-letters",
  branch: { title: "The Arabic letters", description: "The 28 letters, a few at a time: their shapes, their dots and their names." },
  name: "the Arabic letters",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "alif-ba-ta-tha",
      title: "Alif, Ba, Ta, Tha",
      line: "The letters ب ت ث share one shape; only dots differ.",
      facts: ["Alif ا: a tall, straight line", "Ba ب: one dot below", "Ta ت: two dots above, Tha ث: three"],
      quote: quranQuote(1, 1),
      source: quran(1, 1, "The first word of Al-Fatihah, بِسۡمِ, starts with the letter Ba (ب)."),
      difficulty: 1,
      questions: [
        { q: "Which letter is Ba, with one dot below?", a: "ب", wrong: ["ت", "ث", "ن"], why: "Ba has one dot below; Ta has two dots above and Tha has three." },
        { q: "Which letter has three dots above?", a: "ث", wrong: ["ت", "ب", "ا"], why: "Tha (ث) has three dots above; Ta (ت) has two." },
        { q: "Which letter starts بِسۡمِ, the first word of Al-Fatihah?", a: "The letter Ba", wrong: ["The letter Ta", "The letter Tha", "The letter Alif"], why: "The word بِسۡمِ, in the name of, starts with ب, the letter with one dot below." }
      ]
    },
    {
      slug: "jim-ha-kha",
      title: "Jim, Ha, Kha",
      line: "The letters ج ح خ share one shape; the dots differ.",
      facts: ["Jim ج: a dot inside", "Ha ح: no dot, a deep h", "Kha خ: a dot above"],
      quote: quranQuote(96, 1),
      source: quran(96, 1, "Quran 96:1 ends with خَلَقَ, created, which starts with the letter Kha (خ)."),
      difficulty: 1,
      questions: [
        { q: "Which of these is Kha, with a dot above?", a: "خ", wrong: ["ح", "ج", "ث"], why: "Kha (خ) has a dot above; Jim (ج) has its dot inside, below." },
        { q: "Which of these has no dot at all?", a: "ح", wrong: ["ج", "خ", "ب"], why: "Ha (ح) has no dot; it is a deep h from the throat." },
        { q: "Which letter starts خَلَقَ in Quran 96:1?", a: "The letter Kha", wrong: ["The letter Jim", "The letter Ha", "The letter Tha"], why: "The word خَلَقَ, He created, starts with خ, the one with a dot above." }
      ]
    },
    {
      slug: "dal-dhal-ra-zay",
      title: "Dal, Dhal, Ra, Zay",
      line: "Pairs: د goes with ذ, and ر with ز.",
      facts: ["Dal د, Dhal ذ", "Ra ر, Zay ز", "One dot makes د into ذ, and ر into ز"],
      quote: quranQuote(99, 1),
      source: quran(99, 1, "Quran 99:1 has Dhal (ذ) in إِذَا, and زُلۡزِلَتِ starts with Zay (ز)."),
      difficulty: 1,
      questions: [
        { q: "Which letter is Dhal: Dal with a dot?", a: "ذ", wrong: ["د", "ز", "ر"], why: "Dhal (ذ) is Dal (د) with one dot above it." },
        { q: "Which letter starts زُلۡزِلَتِ in Quran 99:1?", a: "The letter Zay", wrong: ["The letter Ra", "The letter Dal", "The letter Dhal"], why: "The word زُلۡزِلَتِ, is shaken, starts with ز, Zay: Ra with a dot above." },
        { q: "Ra ر has a dot above it.", tf: false, why: "Ra (ر) has no dot; Zay (ز) is the one with a dot above." }
      ]
    },
    {
      slug: "sin-shin-sad-dad",
      title: "Sin, Shin, Sad, Dad",
      line: "Sin س has three teeth; Shin ش adds three dots.",
      facts: ["Sin س, Shin ش", "Sad ص, Dad ض: a dot above", "Sad and Dad are said heavy"],
      quote: quranQuote(114, 4),
      source: quran(114, 4, "Quran 114:4: شَرِّ, evil, starts with Shin (ش), and ٱلۡوَسۡوَاسِ has Sin (س) twice."),
      difficulty: 1,
      questions: [
        { q: "Which letter starts شَرِّ, evil, in Quran 114:4?", a: "The letter Shin", wrong: ["The letter Sin", "The letter Sad", "The letter Dad"], why: "The word شَرِّ starts with ش, Shin: three teeth with three dots on top." },
        { q: "Which of these is Dad, Sad with a dot?", a: "ض", wrong: ["ص", "س", "ش"], why: "Dad (ض) is Sad (ص) with one dot above; both are said heavy." },
        { q: "How many times is س in ٱلۡوَسۡوَاسِ?", a: "Two times in the word", wrong: ["One time in the word", "Three times in the word", "Four times in the word"], why: "The word ٱلۡوَسۡوَاسِ, the whisperer, has Sin twice: al-was-waas." }
      ]
    },
    {
      slug: "heavy-ta-dha-ayn-ghayn",
      title: "Heavy Ta, Dha, Ayn, Ghayn",
      line: "Pairs: ط goes with ظ, and ع with غ.",
      facts: ["Heavy Ta ط, Dha ظ: a dot above", "Ayn ع: said deep in the throat", "Ghayn غ: Ayn with a dot"],
      quote: quranQuote(1, 7),
      source: quran(1, 7, "Quran 1:7 has صِرَٰطَ, path, ending in ط, عَلَيۡهِمۡ with ع, and غَيۡرِ with غ."),
      difficulty: 2,
      questions: [
        { q: "Which letter starts غَيۡرِ in Quran 1:7?", a: "The letter Ghayn", wrong: ["The letter Ayn", "The letter Kha", "The letter Jim"], why: "The word غَيۡرِ, not, starts with غ: Ayn (ع) with a dot above." },
        { q: "Which letter ends صِرَٰطَ, the path?", a: "ط", wrong: ["ظ", "ت", "ص"], why: "The word صِرَٰطَ ends with ط, the heavy Ta; ت is the light one." },
        { q: "Ayn ع has a dot above it.", tf: false, why: "Ayn (ع) has no dot; Ghayn (غ) is the one with a dot." }
      ]
    },
    {
      slug: "fa-qaf-kaf-lam",
      title: "Fa, Qaf, Kaf, Lam",
      line: "Fa ف has one dot above; Qaf ق has two.",
      facts: ["Fa ف, Qaf ق: a deep k", "Kaf ك", "Lam ل: tall like Alif"],
      quote: quranQuote(113, 1),
      source: quran(113, 1, "Quran 113:1 starts with قُلۡ, say, and ends with ٱلۡفَلَقِ, the daybreak."),
      difficulty: 2,
      questions: [
        { q: "Which letter starts قُلۡ, say?", a: "The letter Qaf", wrong: ["The letter Fa", "The letter Kaf", "The letter Lam"], why: "The word قُلۡ starts with ق, Qaf, the one with two dots above." },
        { q: "Which of these is Fa, with one dot above?", a: "ف", wrong: ["ق", "ك", "ل"], why: "Fa (ف) has one dot; Qaf (ق) has two and a deeper bowl." },
        { q: "Which two letters make قُلۡ?", a: "Qaf and Lam", wrong: ["Fa and Lam", "Kaf and Lam", "Qaf and Fa"], why: "The word قُلۡ is two letters: Qaf ق, then Lam ل." }
      ]
    },
    {
      slug: "last-five-letters",
      title: "The last five letters",
      line: "Letters م ن ه و ي: the last five of the 28.",
      facts: ["Mim م, Nun ن: one dot above", "Light Ha ه, Waw و", "Ya ي: two dots below"],
      quote: quranQuote(1, 4),
      source: quran(1, 4, "Quran 1:4: يَوۡمِ, day, is Ya (ي), Waw (و) and Mim (م)."),
      difficulty: 2,
      questions: [
        { q: "Which letter has two dots below?", a: "ي", wrong: ["ن", "ت", "ب"], why: "Ya (ي) has two dots below; Ta (ت) has two dots above." },
        { q: "Which letters make يَوۡمِ, day, in Quran 1:4?", a: "Ya, Waw, Mim", wrong: ["Ya, Nun, Mim", "Ba, Waw, Mim", "Ya, Waw, Nun"], why: "The word يَوۡمِ is Ya ي, then Waw و, then Mim م: yawm, day." },
        { q: "Which letter starts مَٰلِكِ, Master, in Quran 1:4?", a: "The letter Mim", wrong: ["The letter Nun", "The letter Waw", "The letter Ya"], why: "The word مَٰلِكِ starts with م, Mim: Master of the Day of Judgment." }
      ]
    }
  ]
};

const SHORT_VOWELS: DeepUnit = {
  key: "arabic-short-vowels",
  topicId: "read_arabic",
  branchId: "arabic-short-vowels",
  branch: { title: "Short vowels", description: "Fathah, kasrah and dammah, the small marks that give a letter its a, i or u." },
  name: "the short vowels",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "fathah",
      title: "Fathah: a line above",
      line: "A fathah is a small line above: it says a.",
      facts: ["The letter بَ says ba", "A fathah sits on top", "The word خَلَقَ: kha-la-qa"],
      quote: quranQuote(96, 2),
      source: quran(96, 2, "Quran 96:2 starts with خَلَقَ, He created: three letters, each with a fathah."),
      difficulty: 1,
      questions: [
        { q: "Which one is Ba with a fathah?", a: "بَ", wrong: ["بِ", "بُ", "ب"], why: "A fathah is a little line above the letter, and بَ is said ba." },
        { q: "How many fathahs are in خَلَقَ, He created?", a: "Three fathahs", wrong: ["One fathah", "Two fathahs", "Four fathahs"], why: "The word خَلَقَ has a fathah on each letter: kha, la, qa." },
        { q: "A fathah is written under the letter.", tf: false, why: "A fathah sits above the letter; the kasrah is the line below." }
      ]
    },
    {
      slug: "kasrah",
      title: "Kasrah: a line below",
      line: "A kasrah is a small line below: it says i.",
      facts: ["The letter بِ says bi", "A kasrah sits under the letter", "The word مَلِكِ: ma-li-ki"],
      quote: quranQuote(114, 2),
      source: quran(114, 2, "Quran 114:2: مَلِكِ, King, has a fathah on م, then a kasrah on ل and on ك."),
      difficulty: 1,
      questions: [
        { q: "Which one says bi?", a: "بِ", wrong: ["بَ", "بُ", "ب"], why: "A kasrah is the little line under the letter, so بِ is said bi." },
        { q: "Which letter in مَلِكِ, King, has a fathah?", a: "م", wrong: ["ل", "ك", "ن"], why: "The word مَلِكِ is ma-li-ki: a fathah on م, and a kasrah on ل and on ك." },
        { q: "Which one says li?", a: "لِ", wrong: ["لَ", "لُ", "ل"], why: "The letter لِ is Lam with a kasrah under it, as in مَلِكِ, ma-li-ki." }
      ]
    },
    {
      slug: "dammah",
      title: "Dammah: a little waw",
      line: "A dammah is a little و on top: it says u.",
      facts: ["The letter بُ says bu", "The word ٱللَّهُ ends with u: Allahu", "The word ٱلصَّمَدُ: as-sa-ma-du"],
      quote: quranQuote(112, 2),
      source: quran(112, 2, "Quran 112:2: both ٱللَّهُ and ٱلصَّمَدُ end with a dammah, said u."),
      difficulty: 1,
      questions: [
        { q: "Which one says bu?", a: "بُ", wrong: ["بَ", "بِ", "ب"], why: "A dammah looks like a little waw on top, so بُ is said bu." },
        { q: "Which mark ends ٱلصَّمَدُ, the Eternal Refuge?", a: "A dammah", wrong: ["A fathah", "A kasrah", "No mark"], why: "The word ٱلصَّمَدُ ends with a little waw over د, so it ends du: as-sa-ma-du." },
        { q: "Which one says du?", a: "دُ", wrong: ["دَ", "دِ", "ذُ"], why: "The letter دُ is Dal with a dammah; ذُ would be Dhal, with a dot." }
      ]
    },
    {
      slug: "hamzah-on-alif",
      title: "Alif with a hamzah",
      line: "An alif with a hamzah takes a vowel: أَ says a.",
      facts: ["The letter أَ: a hamzah above says a", "The letter إِ: a hamzah below says i", "The sign ء is the hamzah itself"],
      quote: quranQuote(108, 1),
      source: quran(108, 1, "Quran 108:1 starts with إِنَّآ, with a hamzah under its alif, then أَعۡطَيۡنَٰكَ, with a hamzah above."),
      difficulty: 2,
      questions: [
        { q: "Which one says i?", a: "إِ", wrong: ["أَ", "أُ", "ا"], why: "The hamzah and kasrah under the alif make إِ an i sound." },
        { q: "Where is the hamzah in إِنَّآ, in Quran 108:1?", a: "Under the alif", wrong: ["Over the alif", "Over the nun", "It has no hamzah"], why: "The word إِنَّآ, indeed We, has its hamzah and kasrah under the alif: in-naa." },
        { q: "A plain alif, with no hamzah, never carries a vowel.", tf: true, why: "A vowel goes on the hamzah; a plain alif only stretches the sound before it." }
      ]
    }
  ]
};

const SUKUN_SHADDAH: DeepUnit = {
  key: "arabic-sukun-shaddah",
  topicId: "read_arabic",
  branchId: "arabic-sukun-shaddah",
  branch: { title: "Sukun and shaddah", description: "The mark that stops a letter and the mark that says it twice." },
  name: "sukun and shaddah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "sukun",
      title: "Sukun: no vowel",
      line: "A sukun means no vowel: the letter stops.",
      facts: ["In the Madinah mushaf it looks like ـۡ", "The word قُلۡ is said qul", "The ل in قُلۡ has a sukun"],
      quote: quranQuote(109, 1),
      source: quran(109, 1, "Quran 109:1 starts with قُلۡ, say: a dammah on ق, then a sukun on ل."),
      difficulty: 2,
      questions: [
        { q: "Which letter in قُلۡ has a sukun?", a: "ل", wrong: ["ق", "ك", "ف"], why: "The word قُلۡ is qul: ق takes a dammah, and ل stops with a sukun." },
        { q: "Which one says al?", a: "أَلۡ", wrong: ["أَلَ", "إِلۡ", "أُلۡ"], why: "The word أَلۡ: a fathah on the alif's hamzah, then ل stops with a sukun." },
        { q: "A letter with a sukun is said with no vowel after it.", tf: true, why: "The sukun stops the letter, like the ل in قُلۡ, qul." }
      ]
    },
    {
      slug: "reading-sukun",
      title: "Reading with sukun",
      line: "The words لَمۡ يَلِدۡ are read lam yalid: two stops.",
      facts: ["The word لَمۡ: lam, the م stops", "The word يَلِدۡ: ya-lid, the د stops", "From Surat al-Ikhlas"],
      quote: quranQuote(112, 3),
      source: quran(112, 3, "Quran 112:3: He neither begets nor is born; لَمۡ and يَلِدۡ each end with a sukun."),
      difficulty: 2,
      questions: [
        { q: "Which letter ends يَلِدۡ with a sukun?", a: "د", wrong: ["ل", "ي", "ذ"], why: "The word يَلِدۡ is ya-lid: the د at its end stops with a sukun." },
        { q: "Which one says lam?", a: "لَمۡ", wrong: ["لِمۡ", "لُمۡ", "لَمَ"], why: "The word لَمۡ: a fathah on ل, then م stops with a sukun." },
        { q: "How many letters in لَمۡ يَلِدۡ have a sukun?", a: "Two of its letters", wrong: ["One of its letters", "Three of its letters", "Four of its letters"], why: "Both م in لَمۡ and د in يَلِدۡ stop with a sukun." }
      ]
    },
    {
      slug: "shaddah",
      title: "Shaddah: a letter twice",
      line: "A shaddah ـّ means the letter is said twice.",
      facts: ["The word بِرَبِّ is said bi-rab-bi", "The shaddah sits on top", "First the letter stops, then it is said again"],
      quote: quranQuote(114, 1),
      source: quran(114, 1, "Quran 114:1: in بِرَبِّ, in the Lord, the ب after ر has a shaddah: bi-rab-bi."),
      difficulty: 2,
      questions: [
        { q: "Which letter in بِرَبِّ has a shaddah?", a: "ب", wrong: ["ر", "ي", "ن"], why: "The word بِرَبِّ is bi-rab-bi: its last ب has a shaddah, so it is said twice." },
        { q: "How many times is the last ب of بِرَبِّ said?", a: "Said two times", wrong: ["Said one time", "Said three times", "Not said at all"], why: "A shaddah doubles the letter: rab, then bi." },
        { q: "A shaddah makes a letter silent.", tf: false, why: "A shaddah doubles the letter; the sukun is what stops it." }
      ]
    },
    {
      slug: "shaddah-with-a-vowel",
      title: "Shaddah with a vowel",
      line: "A shaddah takes a vowel too: إِنَّ is in-na.",
      facts: ["The letter نَّ: a shaddah and a fathah", "The first ن stops, the second says na", "From Surat al-Kawthar"],
      quote: quranQuote(108, 3),
      source: quran(108, 3, "Quran 108:3 starts with إِنَّ, indeed: a ن with a shaddah and a fathah, said in-na."),
      difficulty: 2,
      questions: [
        { q: "Which one has a shaddah and a fathah?", a: "نَّ", wrong: ["نِّ", "نُّ", "نۡ"], why: "The letter نَّ has the shaddah with a fathah: the ن is said twice, then a." },
        { q: "Which letter in إِنَّ has a shaddah?", a: "ن", wrong: ["ا", "ب", "ت"], why: "The word إِنَّ is in-na: the ن is doubled by its shaddah." },
        { q: "A shaddah can have a fathah or a kasrah with it.", tf: true, why: "The letter نَّ in إِنَّ has a fathah; بِّ in بِرَبِّ has a kasrah." }
      ]
    }
  ]
};

const TANWIN_LONG: DeepUnit = {
  key: "arabic-tanwin-long",
  topicId: "read_arabic",
  branchId: "arabic-tanwin-long",
  branch: { title: "Tanwin and long vowels", description: "Doubled vowels that add a final n, and the letters that stretch a vowel long." },
  name: "tanwin and long vowels",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "two-fathahs",
      title: "Two fathahs: an",
      line: "Two fathahs ـً say an: يُسۡرًا is yus-ran.",
      facts: ["Two fathahs are a tanwin", "The word يُسۡرًا means ease", "From Surat ash-Sharh"],
      quote: quranQuote(94, 5),
      source: quran(94, 5, "Quran 94:5: with hardship comes ease, يُسۡرًا, which ends with two fathahs: yus-ran."),
      difficulty: 2,
      questions: [
        { q: "Which one says ban, with two fathahs?", a: "بًا", wrong: ["بٍ", "بٌ", "بَا"], why: "Two fathahs add a final n: بًا is ban; بَا with one fathah is a long baa." },
        { q: "What does يُسۡرًا mean in Quran 94:5?", a: "Ease", wrong: ["Hardship", "Patience", "Night"], why: "With hardship comes ease; يُسۡرًا ends with an: yus-ran." },
        { q: "Two fathahs add a final n sound.", tf: true, why: "That is the tanwin: يُسۡرًا is said yus-ran." }
      ]
    },
    {
      slug: "two-kasrahs",
      title: "Two kasrahs: in",
      line: "Two kasrahs ـٍ say in: غَاسِقٍ is gha-si-qin.",
      facts: ["Two kasrahs sit under the letter", "The word غَاسِقٍ: darkness", "From Surat al-Falaq"],
      quote: quranQuote(113, 3),
      source: quran(113, 3, "Quran 113:3: غَاسِقٍ, darkness, ends with two kasrahs: gha-si-qin."),
      difficulty: 2,
      questions: [
        { q: "Which one says bin, with two kasrahs?", a: "بٍ", wrong: ["بًا", "بٌ", "بِ"], why: "Two kasrahs under the letter add a final n: بٍ is bin." },
        { q: "Which mark ends غَاسِقٍ in Quran 113:3?", a: "Two kasrahs", wrong: ["Two fathahs", "Two dammahs", "A sukun"], why: "The word غَاسِقٍ, darkness, ends with two kasrahs under ق: qin." },
        { q: "Two kasrahs are written above the letter.", tf: false, why: "Two kasrahs sit under the letter; two fathahs and two dammahs go on top." }
      ]
    },
    {
      slug: "two-dammahs",
      title: "Two dammahs: un",
      line: "Two dammahs ـٌ say un: سَلَٰمٌ is sa-la-mun.",
      facts: ["The word سَلَٰمٌ means peace", "Two dammahs sit on top", "From Surat al-Qadr"],
      quote: quranQuote(97, 5),
      source: quran(97, 5, "Quran 97:5: that night is peace, سَلَٰمٌ, which ends with two dammahs: sa-laa-mun."),
      difficulty: 2,
      questions: [
        { q: "Which one says bun, with two dammahs?", a: "بٌ", wrong: ["بٍ", "بًا", "بُ"], why: "Two dammahs on top add a final n: بٌ is bun." },
        { q: "What does سَلَٰمٌ mean in Quran 97:5?", a: "Peace", wrong: ["Light", "Dawn", "Mercy"], why: "Peace it is until the rise of dawn; سَلَٰمٌ ends with un." },
        { q: "Fathah, kasrah and dammah each have a tanwin form.", tf: true, why: "Two fathahs say an, two kasrahs say in, and two dammahs say un." }
      ]
    },
    {
      slug: "long-a",
      title: "Long a: alif after fathah",
      line: "A fathah then an alif stretches the a: مَا is maa.",
      facts: ["Stretch it for two counts", "The word بَا is baa, longer than بَ", "From Surat al-Falaq"],
      quote: quranQuote(113, 2),
      source: quran(113, 2, "Quran 113:2: مَا, what, is م with a fathah, then an alif that stretches it: maa."),
      difficulty: 2,
      questions: [
        { q: "Which one says a long baa?", a: "بَا", wrong: ["بَ", "بِي", "بُو"], why: "A fathah then an alif stretches it: بَا is baa; بَ alone is a short ba." },
        { q: "Which letter stretches the a in مَا?", a: "The letter Alif", wrong: ["The letter Mim", "The letter Waw", "The letter Ya"], why: "The word مَا is م with a fathah, then the alif makes it long: maa." },
        { q: "The word مَا in Quran 113:2 is said with a long a.", tf: true, why: "From the evil of what He created: the alif makes it maa." }
      ]
    },
    {
      slug: "long-i-and-u",
      title: "Long i and long u",
      line: "A ي after kasrah says ii; a و after dammah, uu.",
      facts: ["The word فِي is said fii", "The word صُدُورِ: su-duu-ri", "From Surat an-Nas"],
      quote: quranQuote(114, 5),
      source: quran(114, 5, "Quran 114:5: فِي, in, has a long ii, and صُدُورِ, chests, has a long uu."),
      difficulty: 3,
      questions: [
        { q: "Which one says a long bii?", a: "بِي", wrong: ["بَا", "بُو", "بِ"], why: "A kasrah then ي stretches it: بِي is bii." },
        { q: "Which one says a long buu?", a: "بُو", wrong: ["بَا", "بِي", "بُ"], why: "A dammah then و stretches it: بُو is buu." },
        { q: "Which letter makes the long uu in صُدُورِ?", a: "The letter Waw", wrong: ["The letter Ya", "The letter Alif", "The letter Ra"], why: "The word صُدُورِ is su-duu-ri: the و after the dammah stretches it." }
      ]
    },
    {
      slug: "small-alif",
      title: "The small alif",
      line: "A small alif ـٰ over a letter stretches it like an alif.",
      facts: ["The word ٱلرَّحۡمَٰنِ: ar-rah-maa-ni", "The word مَٰلِكِ in Quran 1:4 has one too", "From Surat al-Fatihah"],
      quote: quranQuote(1, 3),
      source: quran(1, 3, "Quran 1:3: ٱلرَّحۡمَٰنِ has a small alif over م, so it is said ar-rah-maan."),
      difficulty: 3,
      questions: [
        { q: "Which letter in ٱلرَّحۡمَٰنِ has the small alif?", a: "م", wrong: ["ر", "ح", "ن"], why: "The word ٱلرَّحۡمَٰنِ is ar-rah-maa-ni: the small alif over م stretches its a." },
        { q: "What does a small alif do?", a: "Stretches the a", wrong: ["Stops the letter", "Doubles the letter", "Adds a final n"], why: "A small alif works like a full alif: the fathah before it is said long." },
        { q: "The word ٱلرَّحِيمِ in Quran 1:3 has a long ii.", tf: true, why: "The word ٱلرَّحِيمِ is ar-ra-hii-mi: the ي after the kasrah stretches it." }
      ]
    }
  ]
};

const JOINING: DeepUnit = {
  key: "arabic-joining",
  topicId: "read_arabic",
  branchId: "arabic-joining",
  branch: { title: "Joining letters", description: "How letters join into words, the six that never join forward, al- said or silent, and a whole ayah." },
  name: "joining letters",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "letters-change-shape",
      title: "Letters change shape",
      line: "Joined in a word, letters change shape: بـ ـبـ ـب.",
      facts: ["Start: بـ, middle: ـبـ", "End of a word: ـب", "The dots never change"],
      quote: quranQuote(105, 1),
      source: quran(105, 1, "Quran 105:1 has ب at the start and end of بِأَصۡحَٰبِ, and in the middle of رَبُّكَ."),
      difficulty: 3,
      questions: [
        { q: "Where is ب in رَبُّكَ, your Lord?", a: "In the middle", wrong: ["At the start", "At the end", "It has no hamzah"], why: "The word رَبُّكَ is ر, then ب, then ك: the ب is joined on both sides." },
        { q: "What stays the same when a letter changes shape?", a: "Its dots", wrong: ["How long it is", "How tall it is", "The tail it ends with"], why: "The letter ب keeps its one dot at the start, middle or end." },
        { q: "The word بِأَصۡحَٰبِ starts and ends with the letter ب.", tf: true, why: "The word بِأَصۡحَٰبِ, the companions of: bi-as-haa-bi, with ب first and last." }
      ]
    },
    {
      slug: "six-letters-that-do-not-join",
      title: "Six letters that do not join",
      line: "Six letters, ا د ذ ر ز و, never join the next.",
      facts: ["They join only to the letter before", "The word دِينُكُمۡ: a gap after د", "The word وَلِيَ: a gap after و"],
      quote: quranQuote(109, 6),
      source: quran(109, 6, "Quran 109:6: in دِينُكُمۡ the د does not join the ي after it, and in وَلِيَ the و stands apart."),
      difficulty: 3,
      questions: [
        { q: "Which of these never joins to the letter after it?", a: "د", wrong: ["ب", "ل", "م"], why: "Dal (د) is one of six: ا د ذ ر ز و only join to the letter before." },
        { q: "Which of these joins on both sides?", a: "ل", wrong: ["و", "ر", "ا"], why: "Lam (ل) joins both ways; و, ر and ا never join to the next letter." },
        { q: "In دِينُكُمۡ, the د is joined to the ي after it.", tf: false, why: "Dal never joins forward, so دِينُكُمۡ has a small gap after د." }
      ]
    },
    {
      slug: "the-name-allah",
      title: "The name Allah",
      line: "The word ٱللَّهَ: alif, two lams with a shaddah, then ha.",
      facts: ["Said Allah, with a long a", "The second ل has a shaddah", "From Surat al-'Alaq"],
      quote: quranQuote(96, 14),
      source: quran(96, 14, "Quran 96:14: does he not know that Allah sees? ٱللَّهَ is written ٱ, ل, لّ, then ه."),
      difficulty: 3,
      questions: [
        { q: "Which letter ends the name ٱللَّهَ?", a: "ه", wrong: ["ح", "خ", "ل"], why: "The word ٱللَّهَ ends with ه, the light ha; ح is the deep one." },
        { q: "How many lams are written in ٱللَّهَ?", a: "Two lams", wrong: ["One lam", "Three lams", "Four lams"], why: "Two lams, the second with a shaddah: al-laah." },
        { q: "Quran 96:14 asks: does he not know that Allah sees?", tf: true, why: "The ayah ends with يَرَىٰ, He sees." }
      ]
    },
    {
      slug: "moon-letters",
      title: "Al- said out loud",
      line: "In ٱلۡحَمۡدُ the ل has a sukun and is said: al-ham-du.",
      facts: ["The letter ح is a moon letter", "Moon letters: the ل is said", "From Surat al-Fatihah"],
      quote: quranQuote(1, 2),
      source: quran(1, 2, "Quran 1:2 starts with ٱلۡحَمۡدُ, all praise: its ل has a sukun and is said, al-ham-du."),
      difficulty: 3,
      questions: [
        { q: "In ٱلۡحَمۡدُ, what is on the ل?", a: "A sukun", wrong: ["A shaddah", "A dammah", "A kasrah"], why: "The ل of ٱلۡحَمۡدُ stops with a sukun and is said: al-ham-du." },
        { q: "The ل of ٱلۡعَٰلَمِينَ, in Quran 1:2, is said out loud.", tf: true, why: "The letter ع is a moon letter, so its ل keeps a sukun: al-'aa-la-miin." },
        { q: "What is the letter after al- called when the ل is said?", a: "A moon letter", wrong: ["A sun letter", "A long letter", "A heavy letter"], why: "With a moon letter like ح, the ل is said; with a sun letter it is silent." }
      ]
    },
    {
      slug: "sun-letters",
      title: "Al- with a silent lam",
      line: "In وَٱلنَّاسِ the ل is silent and ن takes a shaddah.",
      facts: ["The letter ن is a sun letter", "Said wan-naas, not wal-naas", "The word ٱلۡجِنَّةِ keeps its ل: al-jin-na-ti"],
      quote: quranQuote(114, 6),
      source: quran(114, 6, "Quran 114:6: in وَٱلنَّاسِ the ل is silent and ن has a shaddah; in ٱلۡجِنَّةِ the ل is said."),
      difficulty: 3,
      questions: [
        { q: "How can you tell the ل in وَٱلنَّاسِ is silent?", a: "It has no mark, and ن has a shaddah", wrong: ["It has a sukun", "It has a fathah", "It is written small"], why: "A silent ل has no mark, and the letter after it gets a shaddah: wan-naas." },
        { q: "Which word in Quran 114:6 keeps its ل said?", a: "ٱلۡجِنَّةِ", wrong: ["وَٱلنَّاسِ", "مِنَ", "Neither of those words"], why: "The letter ج is a moon letter, so ٱلۡجِنَّةِ keeps its ل: al-jin-na-ti." },
        { q: "What is the letter after al- called when the ل is silent?", a: "A sun letter", wrong: ["A moon letter", "A long letter", "A heavy letter"], why: "The letter ن is a sun letter: the ل goes silent and ن is doubled." }
      ]
    },
    {
      slug: "read-a-whole-ayah",
      title: "Read a whole ayah",
      line: "Now read قُلۡ هُوَ ٱللَّهُ أَحَدٌ: Say, He is Allah, One.",
      facts: ["The word قُلۡ: qul, say", "The word هُوَ: hu-wa, He", "The word أَحَدٌ: a-had when you stop"],
      quote: quranQuote(112, 1),
      source: quran(112, 1, "Quran 112:1: say, He is Allah, the One; the first ayah of Surat al-Ikhlas."),
      difficulty: 3,
      questions: [
        { q: "Which word in Quran 112:1 means He?", a: "هُوَ", wrong: ["قُلۡ", "ٱللَّهُ", "أَحَدٌ"], why: "The word هُوَ is hu-wa: a dammah on ه and a fathah on و." },
        { q: "Which word in Quran 112:1 has two dammahs?", a: "أَحَدٌ", wrong: ["قُلۡ", "هُوَ", "ٱللَّهُ"], why: "The word أَحَدٌ ends with two dammahs: a-ha-dun, or a-had when you stop." },
        { q: "Which word in Quran 112:1 has a sukun?", a: "قُلۡ", wrong: ["هُوَ", "أَحَدٌ", "ٱللَّهُ"], why: "The ل of قُلۡ stops with a sukun: qul, say." }
      ]
    }
  ]
};

export const READ_ARABIC_UNITS: readonly DeepUnit[] = [LETTERS, SHORT_VOWELS, SUKUN_SHADDAH, TANWIN_LONG, JOINING];

export const READ_ARABIC_SECTION: LearningSection = {
  id: "read_arabic",
  topicId: "read_arabic",
  title: "Read Arabic",
  description: "Learn to read the Quran's Arabic from zero: the letters, the vowel marks, and joining letters into words.",
  badge: "Topic 14",
  focus: "The 28 letters, fathah, kasrah and dammah, sukun, shaddah, tanwin, long vowels, and a first ayah.",
  mascot: "muslim_man",
  accentColor: "#3B7DD8",
  starsTarget: 0,
  branches: [],
  nodes: []
};
