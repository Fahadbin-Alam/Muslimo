import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "The Seerah in more depth" lessons (seerahSahihaynUnits.ts): the lesson's own question is Easy,
 * then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const SEERAH_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 3949.
  "How many campaigns did he ﷺ go out on, Zaid said?": {
    answer: "Nineteen",
    harder: ["Bukhari 3949: how many Ghazwat did he ﷺ undertake, Zaid said?", "Seven", "Forty", "Three"],
    expert: ["Abu Ishaq heard Zaid ibn Arqam asked: how many campaigns in all?", "Twelve", "Seventy", "Five"],
    superHard: ["Kam ghazwah: Zaid's count of all his ﷺ campaigns was what?", "Seventeen", "Twenty-seven", "Nine"],
    extreme: ["In Bukhari 3949, Zaid joined seventeen out of how many?", "Eighteen", "Twenty", "Thirty"]
  },
  "How many of them did Zaid ibn Arqam join?": {
    answer: "Seventeen",
    harder: ["Bukhari 3949: how many campaigns did Zaid join with him ﷺ?", "Two", "Nineteen", "Ten"],
    expert: ["Abu Ishaq: in how many did you join him? Zaid said what?", "Nine", "Four", "Twenty-one"],
    superHard: ["Zaid ibn Arqam: of the nineteen, how many were his own?", "All nineteen", "Eleven", "One"],
    extreme: ["In Bukhari 3949, Zaid missed two of the nineteen, so he joined how many?", "Fifteen", "Eighteen", "Twelve"]
  },
  "Zaid named Badr as the first campaign.": {
    answer: "False",
    harder: "Bukhari 3949: Zaid said the first campaign was Badr.",
    expert: "Asked which came first, Zaid ibn Arqam answered: Badr.",
    superHard: "Abu Ishaq heard Zaid name Uhud or Badr as the first.",
    extreme: "In Bukhari 3949, the first campaign Zaid named was Badr, not Al-Ushayrah."
  },
  // Sahih al-Bukhari 4097.
  "How old was Ibn Umar on the day of Uhud?": {
    answer: "Fourteen",
    harder: ["Bukhari 4097: how old was Ibn Umar when he ﷺ looked him over at Uhud?", "Ten", "Twenty", "Eighteen"],
    expert: ["Ibn Umar was turned back at Uhud at what age?", "Twelve", "Sixteen", "Seventeen"],
    superHard: ["Yawma Uhud: how many years old was Ibn Umar?", "Fifteen", "Eleven", "Nineteen"],
    extreme: ["In Bukhari 4097, one year before the Trench age of fifteen, Ibn Umar was what?", "Thirteen", "Sixteen", "Twelve"]
  },
  "At which battle was Ibn Umar first allowed to take part?": {
    answer: "The Trench",
    harder: ["Bukhari 4097: where was Ibn Umar first allowed to take part?", "Badr", "Uhud", "None at all"],
    expert: ["At fifteen, Ibn Umar was let in on which day?", "The day of Badr", "The day of Uhud", "The day of Makkah"],
    superHard: ["Al-Khandaq or another: where did he ﷺ first allow Ibn Umar?", "Khaybar", "Hunayn", "Tabuk"],
    extreme: ["In Bukhari 4097, the second time he ﷺ looked him over, at which battle?", "Badr again", "Uhud again", "Mu'tah"]
  },
  "He ﷺ let Ibn Umar fight at Uhud.": {
    answer: "False",
    harder: "Bukhari 4097: at Uhud, he ﷺ allowed Ibn Umar to take part.",
    expert: "Ibn Umar said he took part at Uhud when he was fourteen.",
    superHard: "At fourteen, on the day of Uhud, Ibn Umar was allowed in.",
    extreme: "In Bukhari 4097, the age that let Ibn Umar in at Uhud was fourteen."
  },
  // Sahih al-Bukhari 4371.
  "Whose masjid held the next Jumu'ah after Madinah's?": {
    answer: "The masjid of Abd al-Qays",
    harder: ["Bukhari 4371: the first Jumu'ah after Madinah's was in whose masjid?", "The masjid of Quba", "Al-Masjid al-Aqsa", "A masjid in Makkah"],
    expert: ["Ibn Abbas: the next Jumu'ah was offered in which masjid?", "The masjid of Banu Salimah", "The masjid of Ta'if", "The masjid of Khaybar"],
    superHard: ["At Jawatha, the Jumu'ah was in the masjid of which tribe?", "The masjid of Quraysh", "The masjid of Thaqif", "The masjid of Tamim"],
    extreme: ["In Bukhari 4371, the second place of Jumu'ah, after his ﷺ masjid, was whose?", "The masjid of the Ansar", "The masjid of Banu Hashim", "The masjid of the Abyssinians"]
  },
  "Where was Jawatha?": {
    answer: "In Bahrain",
    harder: ["Bukhari 4371: Jawatha was a village in which land?", "In Yemen", "In Sham", "In Egypt"],
    expert: ["Ibn Abbas: Jawatha, a village of where?", "In Iraq", "In Najd", "In Ta'if"],
    superHard: ["Qaryah min al-Bahrayn: where was Jawatha?", "Near Makkah", "Near Madinah", "In Abyssinia"],
    extreme: ["In Bukhari 4371, the masjid of Abd al-Qays stood in a village of where?", "In Oman", "In Persia", "In Khaybar"]
  },
  "Before Jawatha, Jumu'ah was prayed in his ﷺ masjid in Madinah.": {
    answer: "True",
    harder: "Bukhari 4371: the Jumu'ah at Jawatha came after the one in his ﷺ masjid.",
    expert: "Ibn Abbas said the first Jumu'ah after his ﷺ masjid was at Jawatha.",
    superHard: "After Masjid an-Nabawi, the next Jumu'ah was at the masjid of Abd al-Qays.",
    extreme: "In Bukhari 4371, Madinah came first, and Jawatha in Bahrain came next."
  },
  // Sahih al-Bukhari 4128.
  "How many men shared one camel, Abu Musa said?": {
    answer: "Six",
    harder: ["Bukhari 4128: how many shared one camel in turns?", "Two", "Twenty", "Forty"],
    expert: ["Abu Musa: we were how many, with one camel?", "Ten", "Three", "Twelve"],
    superHard: ["Sittatu nafar: how many rode one camel at Dhat ar-Riqa?", "Four", "Eight", "Seven"],
    extreme: ["In Bukhari 4128, one camel was ridden in rotation by how many?", "Five", "Nine", "Fifteen"]
  },
  "Why was it called Dhat ar-Riqa?": {
    answer: "They wrapped their feet in rags",
    harder: ["Bukhari 4128: why was the campaign named Dhat ar-Riqa?", "It rained rags", "They wore new clothes", "A flag was torn"],
    expert: ["Abu Musa: the name Dhat ar-Riqa came from what?", "Patched tents", "A torn letter", "Rags tied on camels"],
    superHard: ["Riqa' means rags: whose and where were they?", "Rags on their spears", "Rags on the camel", "Rags on the flags"],
    extreme: ["In Bukhari 4128, after their feet grew thin and nails fell, the name came from what?", "The torn sandals they sold", "The cloth of their tents", "The banners they carried"]
  },
  "Abu Musa was glad to tell everyone about it.": {
    answer: "False",
    harder: "Bukhari 4128: Abu Musa was pleased to tell of his deed.",
    expert: "Abu Burdah said his father Abu Musa loved telling this story.",
    superHard: "Abu Musa did not mind making his good deed known.",
    extreme: "In Bukhari 4128, after telling it, Abu Musa was happy he had told it."
  },
  // Sahih Muslim 1813.
  "Who kept Jabir from Badr and Uhud?": {
    answer: "His father",
    harder: ["Muslim 1813: who prevented Jabir from Badr and Uhud?", "His mother", "His uncle", "Abu Bakr"],
    expert: ["Jabir: I missed Badr and Uhud. Who held me back?", "His brother", "Umar", "His teacher"],
    superHard: ["Mana'ani abi: who kept Jabir at home?", "His sister", "His tribe chief", "His wife"],
    extreme: ["In Muslim 1813, the man who kept Jabir back was later killed at Uhud. Who?", "His grandfather", "His cousin", "His neighbour"]
  },
  "On which day was Jabir's father killed?": {
    answer: "The day of Uhud",
    harder: ["Muslim 1813: Jabir's father Abdullah was killed on which day?", "The day of Badr", "The day of the Trench", "The day of Hunayn"],
    expert: ["Jabir: after my father was killed, I never stayed behind. Killed when?", "The day of Khaybar", "The day of Makkah", "The day of Tabuk"],
    superHard: ["Qutila yawma ...: on which day did Abdullah, Jabir's father, fall?", "The day of Mu'tah", "The day of Ta'if", "The day of Hudaybiyah"],
    extreme: ["In Muslim 1813, the battle Jabir missed that also took his father was what?", "Badr", "The Trench", "Hunayn"]
  },
  "After his father fell at Uhud, Jabir joined every campaign.": {
    answer: "True",
    harder: "Muslim 1813: after Uhud, Jabir never stayed behind him ﷺ.",
    expert: "Jabir said that after his father was killed he never lagged behind.",
    superHard: "Lam atakhallaf: from then on Jabir went on every campaign.",
    extreme: "In Muslim 1813, missing Badr and Uhud was followed by never missing another."
  },
  // Sahih Muslim 1796a.
  "What of his ﷺ was wounded, Jundub said?": {
    answer: "His finger ﷺ",
    harder: ["Muslim 1796a: what of his ﷺ was wounded in an encounter?", "His foot", "His horse", "His shield"],
    expert: ["Jundub ibn Sufyan: what bled, in one of the encounters?", "His forehead", "His camel", "His hand-guard"],
    superHard: ["Dumiyat isba': what was it that bled?", "His lip", "His cheek", "His knee"],
    extreme: ["In Muslim 1796a, the part he ﷺ spoke to, saying you only bled, was what?", "His sword", "His arm", "His tooth"]
  },
  "What did he ﷺ say to the bleeding finger?": {
    answer: "You are just a finger that bled",
    harder: ["Muslim 1796a: what did he ﷺ say to his wounded finger?", "Why did you bleed?", "I will hide you", "You are weak"],
    expert: ["Jundub: he ﷺ spoke to his finger. What did he say?", "Stop bleeding now", "You will heal soon", "You failed me"],
    superHard: ["Hal anti illa isba'un damiti: what does it say?", "You are my strongest finger", "You will be avenged", "You are no longer mine"],
    extreme: ["In Muslim 1796a, before saying it was in Allah's cause, he ﷺ told the finger what?", "Be patient a little", "Your wound is great", "Forgive the one who hurt you"]
  },
  "He ﷺ said what it met was in the cause of Allah.": {
    answer: "True",
    harder: "Muslim 1796a: he ﷺ said the finger's wound was in Allah's cause.",
    expert: "Jundub reported him ﷺ saying: what you met was in the cause of Allah.",
    superHard: "Wa fi sabilillahi ma laqiti: so he ﷺ spoke to his finger.",
    extreme: "In Muslim 1796a, the words after 'a finger that bled' are: in the cause of Allah."
  },
  // Sahih al-Bukhari 4424.
  "Who carried his ﷺ letter to Khosrau?": {
    answer: "Abdullah ibn Hudhafa as-Sahmi",
    harder: ["Bukhari 4424: whom did he ﷺ send with the letter to Khosrau?", "Abu Hurairah", "Ibn Abbas", "Zaid ibn Arqam"],
    expert: ["Ibn Abbas: the letter to Khosrau went with whom?", "Dihyah al-Kalbi", "Mu'adh ibn Jabal", "Abu Musa"],
    superHard: ["As-Sahmi: which Companion took the letter?", "Amr ibn al-As", "Sa'd ibn Abi Waqqas", "Khalid ibn al-Walid"],
    extreme: ["In Bukhari 4424, the man told to hand it to the governor of Bahrain was who?", "Abdullah ibn Umar", "Abdullah ibn Mas'ud", "Abdullah ibn Rawahah"]
  },
  "What did Khosrau do with the letter?": {
    answer: "Tore it into pieces",
    harder: ["Bukhari 4424: what did Khosrau do once he read the letter?", "Kept it in gold", "Answered it kindly", "Sent it back unread"],
    expert: ["Ibn Abbas: when Khosrau read it, what did he do?", "Read it to his people", "Hung it on a wall", "Kissed it"],
    superHard: ["Mazzaqahu: what did Khosrau do to it?", "Buried it", "Burned it with oil", "Gave it to his son"],
    extreme: ["In Bukhari 4424, the letter that came through Bahrain ended how?", "Copied for all his lands", "Kept in his treasury", "Returned with a gift"]
  },
  "The letter was handed to Khosrau by the governor of Bahrain.": {
    answer: "True",
    harder: "Bukhari 4424: the governor of Bahrain passed the letter on to Khosrau.",
    expert: "Ibn Abbas said the letter reached Khosrau through the governor of Bahrain.",
    superHard: "Azim al-Bahrayn: it was he who handed the letter to Khosrau.",
    extreme: "In Bukhari 4424, between Abdullah ibn Hudhafa and Khosrau stood the governor of Bahrain."
  }
};
