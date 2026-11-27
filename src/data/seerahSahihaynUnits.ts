import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Seerah batch: seven moments from the campaigns and letters
// that were not taught yet, each with its exact English words to highlight. Every question also has Medium, Hard,
// Super hard and Extremely hard versions (src/data/tiers/seerahSahihaynTiers.ts).

const DEEPER: DeepUnit = {
  key: "sahihayn-seerah",
  topicId: "prophets",
  branchId: "seerah-sahihayn-deeper",
  branch: { title: "The Seerah in more depth", description: "From Bukhari and Muslim, easy to hard: the campaigns, a boy turned back, the second Jumu'ah, the campaign of rags, Jabir, a bleeding finger, and a letter to Khosrau." },
  name: "the deeper Seerah lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "nineteen-campaigns",
      title: "Nineteen campaigns",
      line: "Zaid ibn Arqam joined seventeen of his ﷺ nineteen campaigns.",
      facts: ["Told by Abu Ishaq", "Nineteen campaigns", "The first: Al-Ushayrah"],
      source: hadith("bukhari", "3949", "Zaid ibn Arqam", "Sahih", "Zaid ibn Arqam was asked how many campaigns the Prophet ﷺ went out on. He said: nineteen. He had joined seventeen of them, and he said the first was Al-Ushayrah.", "In how many Ghazwat did you join him"),
      difficulty: 1,
      questions: [
        { q: "How many campaigns did he ﷺ go out on, Zaid said?", a: "Nineteen", wrong: ["Seven", "Forty", "Three"], why: "Asked how many Ghazwat he ﷺ undertook, Zaid replied: nineteen." },
        { q: "How many of them did Zaid ibn Arqam join?", a: "Seventeen", wrong: ["Two", "Nineteen", "Ten"], why: "In how many did you join him? He replied: seventeen." },
        { q: "Zaid named Badr as the first campaign.", tf: false, why: "No. He said the first was Al-Ushayrah." }
      ]
    },
    {
      slug: "fourteen-then-fifteen",
      title: "Too young at fourteen",
      line: "At fourteen Ibn Umar was turned back; at fifteen, allowed.",
      facts: ["Told by Ibn Umar", "Uhud: fourteen", "The Trench: fifteen"],
      source: hadith("bukhari", "4097", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ looked over Ibn Umar on the day of Uhud, when he was fourteen, and did not let him take part. He looked over him again on the day of the Trench, when he was fifteen, and let him take part.", "while he was fifteen years old"),
      difficulty: 2,
      questions: [
        { q: "How old was Ibn Umar on the day of Uhud?", a: "Fourteen", wrong: ["Ten", "Twenty", "Eighteen"], why: "He ﷺ inspected him on the day of Uhud while he was fourteen years old." },
        { q: "At which battle was Ibn Umar first allowed to take part?", a: "The Trench", wrong: ["Badr", "Uhud", "None at all"], why: "On the day of Al-Khandaq, at fifteen, he ﷺ allowed him to take part." },
        { q: "He ﷺ let Ibn Umar fight at Uhud.", tf: false, why: "No. At fourteen, he ﷺ did not allow him to take part." }
      ]
    },
    {
      slug: "the-second-jumuah",
      title: "The second Jumu'ah",
      line: "After Madinah, Jumu'ah was first prayed at Jawatha in Bahrain.",
      facts: ["Told by Ibn Abbas", "The masjid of Abd al-Qays", "Jawatha, a village in Bahrain"],
      source: hadith("bukhari", "4371", "Ibn Abbas", "Sahih", "Ibn Abbas said: the first Jumu'ah prayed after the Jumu'ah in the masjid of the Messenger of Allah ﷺ was in the masjid of Abd al-Qays at Jawatha, a village in Bahrain.", "situated at Jawathi, that is a village at Al Bahrain"),
      difficulty: 3,
      questions: [
        { q: "Whose masjid held the next Jumu'ah after Madinah's?", a: "The masjid of Abd al-Qays", wrong: ["The masjid of Quba", "Al-Masjid al-Aqsa", "A masjid in Makkah"], why: "It was offered at the mosque of Abdul Qais, Ibn Abbas said." },
        { q: "Where was Jawatha?", a: "In Bahrain", wrong: ["In Yemen", "In Sham", "In Egypt"], why: "Jawathi, that is a village at Al Bahrain." },
        { q: "Before Jawatha, Jumu'ah was prayed in his ﷺ masjid in Madinah.", tf: true, why: "The first Jumu'ah after the one in the Mosque of Allah's Messenger ﷺ was at Jawatha." }
      ]
    },
    {
      slug: "the-campaign-of-rags",
      title: "The campaign of rags",
      line: "Six men, one camel: they wrapped torn feet in rags.",
      facts: ["Told by Abu Musa al-Ash'ari", "Six men, one camel", "Dhat ar-Riqa: the one with rags"],
      source: hadith("bukhari", "4128", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa said: we went out with the Prophet ﷺ, six of us sharing one camel in turns. Our feet grew thin and my nails fell off, so we wrapped our feet in rags, and the campaign was named Dhat ar-Riqa. Later he disliked having told of a good deed of his.", "we used to wrap our feet with the pieces of cloth"),
      difficulty: 3,
      questions: [
        { q: "How many men shared one camel, Abu Musa said?", a: "Six", wrong: ["Two", "Twenty", "Forty"], why: "We were six persons having one camel which we rode in rotation." },
        { q: "Why was it called Dhat ar-Riqa?", a: "They wrapped their feet in rags", wrong: ["It rained rags", "They wore new clothes", "A flag was torn"], why: "The Ghazwa was named Dhat-ur-Riqa as we wrapped our feet with rags." },
        { q: "Abu Musa was glad to tell everyone about it.", tf: false, why: "No. He disliked having made known a good deed of his." }
      ]
    },
    {
      slug: "jabir-never-stayed-behind",
      title: "Jabir never stayed behind",
      line: "Kept from Badr and Uhud, Jabir later joined every campaign.",
      facts: ["Told by Jabir ibn Abdullah", "His father held him back", "Then he never stayed behind"],
      source: hadith("muslim", "1813", "Jabir ibn Abdullah", "Sahih", "Jabir said: I did not take part in Badr or Uhud; my father kept me back. After my father Abdullah was killed on the day of Uhud, I never stayed behind the Messenger of Allah ﷺ in any campaign.", "I never lagged behind the Messenger of Allah"),
      difficulty: 4,
      questions: [
        { q: "Who kept Jabir from Badr and Uhud?", a: "His father", wrong: ["His mother", "His uncle", "Abu Bakr"], why: "My father prevented me, Jabir said." },
        { q: "On which day was Jabir's father killed?", a: "The day of Uhud", wrong: ["The day of Badr", "The day of the Trench", "The day of Hunayn"], why: "Abdullah, my father, was killed on the Day of Uhud, Jabir said." },
        { q: "After his father fell at Uhud, Jabir joined every campaign.", tf: true, why: "After Abdullah was killed on the Day of Uhud, I never lagged behind, Jabir said." }
      ]
    },
    {
      slug: "only-a-finger",
      title: "Only a finger that bled",
      line: "His finger ﷺ bled; he said it was in Allah's cause.",
      facts: ["Told by Jundub ibn Sufyan", "Wounded in an encounter", "In the cause of Allah"],
      source: hadith("muslim", "1796a", "Jundub ibn Sufyan", "Sahih", "Jundub said: a finger of the Messenger of Allah ﷺ was wounded in one of the encounters, and he said: you are only a finger that has bled, and what you met was in the cause of Allah.", "Thou art just a little finger which has bled"),
      difficulty: 4,
      questions: [
        { q: "What was wounded, in this hadith?", a: "His finger ﷺ", wrong: ["His foot", "His horse", "His shield"], why: "A finger of the Messenger of Allah ﷺ was wounded in one of the encounters, Jundub said." },
        { q: "What did he ﷺ say to the bleeding finger?", a: "You are just a finger that bled", wrong: ["Why did you bleed?", "I will hide you", "You are weak"], why: "Thou art just a little finger which has bled, he ﷺ said." },
        { q: "He ﷺ said what it met was in the cause of Allah.", tf: true, why: "What thou hast experienced is in the cause of Allah, he ﷺ said." }
      ]
    },
    {
      slug: "the-letter-to-khosrau",
      title: "The letter to Khosrau",
      line: "Khosrau tore up the letter he ﷺ sent through Bahrain.",
      facts: ["Told by Ibn Abbas", "Carried by Abdullah ibn Hudhafa", "Through the governor of Bahrain"],
      source: hadith("bukhari", "4424", "Ibn Abbas", "Sahih", "The Messenger of Allah ﷺ sent a letter to Khosrau with Abdullah ibn Hudhafa as-Sahmi and told him to give it to the governor of Bahrain. The governor passed it to Khosrau, and when he read it, he tore it into pieces.", "when he read the latter, he tore it into pieces"),
      difficulty: 5,
      questions: [
        { q: "Who carried his ﷺ letter to Khosrau?", a: "Abdullah ibn Hudhafa as-Sahmi", wrong: ["Abu Hurairah", "Ibn Abbas", "Zaid ibn Arqam"], why: "He ﷺ sent a letter to Khosrau with Abdullah bin Hudhafa As-Sahmi, Ibn Abbas said." },
        { q: "What did Khosrau do with the letter?", a: "Tore it into pieces", wrong: ["Kept it in gold", "Answered it kindly", "Sent it back unread"], why: "When he read the letter, he tore it into pieces." },
        { q: "The letter was handed to Khosrau by the governor of Bahrain.", tf: true, why: "The governor of Al-Bahrain handed it over to Khosrau." }
      ]
    }
  ]
};

export const SEERAH_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
