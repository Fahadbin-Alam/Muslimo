import type { TierEntry } from "../questionTiers";

/**
 * Harder versions for the Read Arabic topic.
 * Each one keeps the same answer and the same ayah as the original question.
 */
export const READ_ARABIC_TIERS: Record<string, TierEntry> = {
  // Quran 1:1.
  "Which letter is Ba, with one dot below?": { answer: "ب", harder: ["Quran 1:1 starts with بِسۡمِ. Which letter is its first?", "ت", "ث", "ن"] },
  "Which letter has three dots above?": { answer: "ث", harder: ["Ba, Ta and Tha share one shape. Which one has three dots above?", "ت", "ب", "ن"] },
  "Which letter starts بِسۡمِ, the first word of Al-Fatihah?": { answer: "The letter Ba", harder: ["بِسۡمِ, the first word of Quran 1:1, starts with which letter?", "The letter Ta", "The letter Nun", "The letter Tha"] },
  // Quran 96:1.
  "Which of these is Kha, with a dot above?": { answer: "خ", harder: ["Jim, Ha and Kha share one shape. Which one has its dot above?", "ج", "ح", "غ"] },
  "Which of these has no dot at all?": { answer: "ح", harder: ["Jim, Ha and Kha share one shape. Which one has no dot at all?", "ج", "خ", "غ"] },
  "Which letter starts خَلَقَ in Quran 96:1?": { answer: "The letter Kha", harder: ["خَلَقَ, created, in Quran 96:1 starts with which letter?", "The letter Ha", "The letter Jim", "The letter Ghayn"] },
  // Quran 99:1.
  "Which letter is Dhal: Dal with a dot?": { answer: "ذ", harder: ["Quran 99:1 has the letter in إِذَا that is Dal with a dot. Which is it?", "د", "ز", "ر"] },
  "Which letter starts زُلۡزِلَتِ in Quran 99:1?": { answer: "The letter Zay", harder: ["زُلۡزِلَتِ in Quran 99:1 starts with which letter?", "The letter Ra", "The letter Dhal", "The letter Dal"] },
  "Ra ر has a dot above it.": { answer: "False", harder: "Like Zay ز, the letter Ra ر has one dot above it." },
  // Quran 114:4.
  "Which letter starts شَرِّ, evil, in Quran 114:4?": { answer: "The letter Shin", harder: ["شَرِّ, evil, in Quran 114:4 starts with which letter: three dots on top?", "The letter Sin", "The letter Sad", "The letter Tha"] },
  "Which of these is Dad, Sad with a dot?": { answer: "ض", harder: ["Sad and Dad share one shape. Which one is Dad, with its dot?", "ص", "ظ", "ش"] },
  "How many times is س in ٱلۡوَسۡوَاسِ?": { answer: "Two times in the word", harder: ["In ٱلۡوَسۡوَاسِ, Quran 114:4, how many times is the letter Sin written?", "Four times in the word", "One time in the word", "Three times in the word"] },
  // Quran 1:7.
  "Which letter starts غَيۡرِ in Quran 1:7?": { answer: "The letter Ghayn", harder: ["Quran 1:7: غَيۡرِ starts with which letter, Ayn with a dot?", "The letter Ayn", "The letter Kha", "The letter Qaf"] },
  "Which letter ends صِرَٰطَ, the path?": { answer: "ط", harder: ["Quran 1:7: صِرَٰطَ, the path, ends with which letter?", "ظ", "ت", "د"] },
  "Ayn ع has a dot above it.": { answer: "False", harder: "In عَلَيۡهِمۡ, Quran 1:7, the letter Ayn ع has a dot above it, like Ghayn." },
  // Quran 113:1.
  "Which letter starts قُلۡ, say?": { answer: "The letter Qaf", harder: ["قُلۡ, say, starts Quran 113:1. Which letter is first: two dots on top?", "The letter Fa", "The letter Kaf", "The letter Lam"] },
  "Which of these is Fa, with one dot above?": { answer: "ف", harder: ["Fa and Qaf share one shape. Which one is Fa, with one dot above?", "ق", "غ", "ك"] },
  "Which two letters make قُلۡ?": { answer: "Qaf and Lam", harder: ["قُلۡ, say, in Quran 113:1 is made of which two letters?", "Fa and Lam", "Kaf and Lam", "Qaf and Nun"] },
  // Quran 1:4.
  "Which letter has two dots below?": { answer: "ي", harder: ["Ya, Ta and Nun all have dots. Which has two dots below?", "ت", "ن", "ث"] },
  "Which letters make يَوۡمِ, day, in Quran 1:4?": { answer: "Ya, Waw, Mim", harder: ["يَوۡمِ, day, in Quran 1:4 is spelt with which three letters?", "Ya, Waw, Nun", "Ba, Waw, Mim", "Ya, Ra, Mim"] },
  "Which letter starts مَٰلِكِ, Master, in Quran 1:4?": { answer: "The letter Mim", harder: ["مَٰلِكِ, Master, in Quran 1:4 starts with which letter?", "The letter Waw", "The letter Nun", "The letter Ha"] },
  // Quran 96:2.
  "Which one is Ba with a fathah?": { answer: "بَ", harder: ["Which one is Ba with a fathah, said ba?", "بِ", "بُ", "بٌ"] },
  "How many fathahs are in خَلَقَ, He created?": { answer: "Three fathahs", harder: ["Quran 96:2 starts with خَلَقَ, He created. How many fathahs does it have?", "Two fathahs", "Four fathahs", "No fathahs"] },
  "A fathah is written under the letter.": { answer: "False", harder: "A fathah is a small slanted line written under the letter." },
  // Quran 114:2.
  "Which one says bi?": { answer: "بِ", harder: ["Ba with a kasrah under it says bi. Which one is it?", "بَ", "بُ", "بٍ"] },
  "Which letter in مَلِكِ, King, has a fathah?": { answer: "م", harder: ["مَلِكِ, King, in Quran 114:2: which letter has the fathah?", "ل", "ك", "ن"] },
  "Which one says li?": { answer: "لِ", harder: ["Lam with a kasrah, said li. Which one is it?", "لَ", "لُ", "لٍ"] },
  // Quran 112:2.
  "Which one says bu?": { answer: "بُ", harder: ["Ba with a dammah on top, said bu. Which one is it?", "بَ", "بِ", "بٌ"] },
  "Which mark ends ٱلصَّمَدُ, the Eternal Refuge?": { answer: "A dammah", harder: ["Quran 112:2: which mark ends ٱلصَّمَدُ, said as-samadu?", "A fathah", "A kasrah", "A sukun"] },
  "Which one says du?": { answer: "دُ", harder: ["Dal with a dammah, said du. Which one is it?", "دَ", "ذُ", "دِ"] },
  // Quran 108:1.
  "Which one says i?": { answer: "إِ", harder: ["The hamzah under an alif, with a kasrah, says i. Which one is it?", "أَ", "أُ", "آ"] },
  "Where is the hamzah in إِنَّآ, in Quran 108:1?": { answer: "Under the alif", harder: ["Quran 108:1 starts إِنَّآ. Where is its hamzah?", "Over the alif", "Over the nun", "It has no hamzah"] },
  "A plain alif, with no hamzah, never carries a vowel.": { answer: "True", harder: "A plain alif with no hamzah carries no vowel of its own." },
  // Quran 109:1.
  "Which letter in قُلۡ has a sukun?": { answer: "ل", harder: ["قُلۡ, say, starts Quran 109:1. Which letter has the sukun?", "ق", "ف", "ك"] },
  "Which one says al?": { answer: "أَلۡ", harder: ["Alif with a fathah, then lam with a sukun, says al. Which one?", "أَلَ", "إِلۡ", "أُلۡ"] },
  "A letter with a sukun is said with no vowel after it.": { answer: "True", harder: "A letter with a sukun is said with no vowel after it, like the ل of قُلۡ." },
  // Quran 112:3.
  "Which letter ends يَلِدۡ with a sukun?": { answer: "د", harder: ["Quran 112:3: يَلِدۡ ends with which letter, with a sukun?", "ذ", "ل", "ر"] },
  "Which one says lam?": { answer: "لَمۡ", harder: ["Lam with a fathah, then mim with a sukun, says lam. Which one?", "لُمۡ", "لَمَ", "لِمۡ"] },
  "How many letters in لَمۡ يَلِدۡ have a sukun?": { answer: "Two of its letters", harder: ["Quran 112:3: in لَمۡ يَلِدۡ, how many letters have a sukun?", "One of its letters", "Three of its letters", "Four of its letters"] },
  // Quran 114:1.
  "Which letter in بِرَبِّ has a shaddah?": { answer: "ب", harder: ["Quran 114:1: in بِرَبِّ, bi-rab-bi, which letter has the shaddah?", "ر", "ت", "ن"] },
  "How many times is the last ب of بِرَبِّ said?": { answer: "Said two times", harder: ["بِرَبِّ, in Quran 114:1, is said bi-rab-bi. So the last ب is said how many times?", "Said one time", "Said three times", "Not said at all"] },
  "A shaddah makes a letter silent.": { answer: "False", harder: "A shaddah makes a letter silent, so it is not said at all." },
  // Quran 108:3.
  "Which one has a shaddah and a fathah?": { answer: "نَّ", harder: ["Which one has a shaddah and a fathah, said na in in-na?", "نِّ", "نُّ", "نًّ"] },
  "Which letter in إِنَّ has a shaddah?": { answer: "ن", harder: ["Quran 108:3 starts إِنَّ, said in-na. Which letter has the shaddah?", "ا", "ت", "م"] },
  "A shaddah can have a fathah or a kasrah with it.": { answer: "True", harder: "In إِنَّ, Quran 108:3, the shaddah on ن comes with a fathah." },
  // Quran 94:5.
  "Which one says ban, with two fathahs?": { answer: "بًا", harder: ["Ba with two fathahs, said ban. Which one is it?", "بٍ", "بٌ", "بَا"] },
  "What does يُسۡرًا mean in Quran 94:5?": { answer: "Ease", harder: ["Quran 94:5: with hardship comes يُسۡرًا. What does يُسۡرًا mean?", "Hardship", "Patience", "Night"] },
  "Two fathahs add a final n sound.": { answer: "True", harder: "Two fathahs, as at the end of يُسۡرًا in Quran 94:5, add a final n sound." },
  // Quran 113:3.
  "Which one says bin, with two kasrahs?": { answer: "بٍ", harder: ["Ba with two kasrahs, said bin. Which one is it?", "بِ", "بٌ", "بًا"] },
  "Which mark ends غَاسِقٍ in Quran 113:3?": { answer: "Two kasrahs", harder: ["Quran 113:3: غَاسِقٍ, darkness, said gha-si-qin, ends with which mark?", "Two fathahs", "Two dammahs", "A kasrah"] },
  "Two kasrahs are written above the letter.": { answer: "False", harder: "Two kasrahs, as at the end of غَاسِقٍ, are written above the letter." },
  // Quran 97:5.
  "Which one says bun, with two dammahs?": { answer: "بٌ", harder: ["Ba with two dammahs, said bun. Which one is it?", "بُ", "بًا", "بٍ"] },
  "What does سَلَٰمٌ mean in Quran 97:5?": { answer: "Peace", harder: ["Quran 97:5: that night is سَلَٰمٌ until dawn. What does سَلَٰمٌ mean?", "Light", "Dawn", "Mercy"] },
  "Fathah, kasrah and dammah each have a tanwin form.": { answer: "True", harder: "Fathah, kasrah and dammah each have a doubled tanwin form that adds n." },
  // Quran 113:2.
  "Which one says a long baa?": { answer: "بَا", harder: ["Ba with a fathah, then an alif, says a long baa. Which one?", "بَ", "بِي", "بًا"] },
  "Which letter stretches the a in مَا?": { answer: "The letter Alif", harder: ["Quran 113:2: مَا, said maa. Which letter stretches the a?", "The letter Ya", "The letter Waw", "The letter Mim"] },
  "The word مَا in Quran 113:2 is said with a long a.": { answer: "True", harder: "In Quran 113:2, مَا is said maa, with the a stretched by an alif." },
  // Quran 114:5.
  "Which one says a long bii?": { answer: "بِي", harder: ["Ba with a kasrah, then a ya, says a long bii. Which one?", "بِ", "بٍ", "بَي"] },
  "Which one says a long buu?": { answer: "بُو", harder: ["Ba with a dammah, then a waw, says a long buu. Which one?", "بُ", "بٌ", "بَو"] },
  "Which letter makes the long uu in صُدُورِ?": { answer: "The letter Waw", harder: ["Quran 114:5: صُدُورِ, chests, has a long uu. Which letter makes it?", "The letter Alif", "The letter Ya", "The letter Dal"] },
  // Quran 1:3.
  "Which letter in ٱلرَّحۡمَٰنِ has the small alif?": { answer: "م", harder: ["Quran 1:3: ٱلرَّحۡمَٰنِ, ar-rah-maan. Which letter has the small alif?", "ر", "ح", "ن"] },
  "What does a small alif do?": { answer: "Stretches the a", harder: ["In ٱلرَّحۡمَٰنِ, a small alif sits over the م. What does it do?", "Doubles the letter", "Adds a final n", "Makes it silent"] },
  "The word ٱلرَّحِيمِ in Quran 1:3 has a long ii.": { answer: "True", harder: "In Quran 1:3, ٱلرَّحِيمِ has a long ii, made by the letter ي." },
  // Quran 105:1.
  "Where is ب in رَبُّكَ, your Lord?": { answer: "In the middle", harder: ["Quran 105:1: in رَبُّكَ, your Lord, where does ب sit?", "At the start", "At the end", "It stands alone"] },
  "What stays the same when a letter changes shape?": { answer: "Its dots", harder: ["A joined letter changes its shape. What stays the same?", "Its tail", "Its length", "Its height"] },
  "The word بِأَصۡحَٰبِ starts and ends with the letter ب.": { answer: "True", harder: "In Quran 105:1, بِأَصۡحَٰبِ has the letter ب at its start and at its end." },
  // Quran 109:6.
  "Which of these never joins to the letter after it?": { answer: "د", harder: ["Six letters never join the letter after them. Which one is one of them?", "م", "ب", "ن"] },
  "Which of these joins on both sides?": { answer: "ل", harder: ["Which of these joins on both sides, before and after?", "ر", "ا", "د"] },
  "In دِينُكُمۡ, the د is joined to the ي after it.": { answer: "False", harder: "In دِينُكُمۡ, Quran 109:6, the د joins the ي after it, as most letters do." },
  // Quran 96:14.
  "Which letter ends the name ٱللَّهَ?": { answer: "ه", harder: ["ٱللَّهَ in Quran 96:14 is written ٱ, ل, لّ, then which letter?", "ة", "ل", "ح"] },
  "How many lams are written in ٱللَّهَ?": { answer: "Two lams", harder: ["ٱللَّهَ in Quran 96:14 is written ٱ, ل, لّ, ه. How many lams?", "Three lams", "One lam", "Four lams"] },
  "Quran 96:14 asks: does he not know that Allah sees?": { answer: "True", harder: "Quran 96:14 asks: does he not know that Allah sees?" },
  // Quran 1:2.
  "In ٱلۡحَمۡدُ, what is on the ل?": { answer: "A sukun", harder: ["Quran 1:2: ٱلۡحَمۡدُ is said al-ham-du. What mark sits on its ل?", "A shaddah", "A kasrah", "A fathah"] },
  "The ل of ٱلۡعَٰلَمِينَ, in Quran 1:2, is said out loud.": { answer: "True", harder: "In ٱلۡعَٰلَمِينَ, Quran 1:2, the ل has a sukun and is said out loud." },
  "What is the letter after al- called when the ل is said?": { answer: "A moon letter", harder: ["In ٱلۡحَمۡدُ the ل is said. What is the letter after al- called?", "A sun letter", "A heavy letter", "A joining letter"] },
  // Quran 114:6.
  "How can you tell the ل in وَٱلنَّاسِ is silent?": { answer: "It has no mark, and ن has a shaddah", harder: ["In وَٱلنَّاسِ, Quran 114:6, how can you tell the ل is silent?", "It has a fathah", "It has a sukun", "It is written small"] },
  "Which word in Quran 114:6 keeps its ل said?": { answer: "ٱلۡجِنَّةِ", harder: ["Quran 114:6 ends ٱلۡجِنَّةِ وَٱلنَّاسِ. Which word keeps its ل said?", "وَٱلنَّاسِ", "Both of those words", "Neither of those words"] },
  "What is the letter after al- called when the ل is silent?": { answer: "A sun letter", harder: ["In وَٱلنَّاسِ the ل is silent and ن doubles. What is ن called here?", "A moon letter", "A long letter", "A joining letter"] },
  // Quran 112:1.
  "Which word in Quran 112:1 means He?": { answer: "هُوَ", harder: ["Quran 112:1: قُلۡ هُوَ ٱللَّهُ أَحَدٌ. Which word means He?", "ٱللَّهُ", "أَحَدٌ", "قُلۡ"] },
  "Which word in Quran 112:1 has two dammahs?": { answer: "أَحَدٌ", harder: ["Quran 112:1: which word ends with two dammahs, said a-ha-dun?", "ٱللَّهُ", "هُوَ", "قُلۡ"] },
  "Which word in Quran 112:1 has a sukun?": { answer: "قُلۡ", harder: ["Quran 112:1: which word ends with a sukun?", "هُوَ", "أَحَدٌ", "ٱللَّهُ"] },
};
