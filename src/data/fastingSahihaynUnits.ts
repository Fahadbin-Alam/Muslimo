import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Fasting batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/fastingSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-fasting",
  topicId: "fasting",
  branchId: "fasting-sahihayn-deeper",
  branch: { title: "Deeper into fasting", description: "From Bukhari and Muslim, easy to hard: the Ashura call, i'tikaf, dreams of the Night of Qadr, and a hot day on the road." },
  name: "the deeper fasting lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-ashura-call",
      title: "The Ashura call",
      line: "On Ashura, a man called out: whoever has eaten, fast now.",
      facts: ["Told by Salamah ibn al-Akwa'", "Ashura is the 10th of Muharram", "He ﷺ sent the man to call"],
      source: hadith("bukhari", "1924", "Salamah ibn al-Akwa'", "Sahih", "The Prophet ﷺ told a man to call out on the day of Ashura: whoever has eaten should eat no more but fast, and whoever has not eaten should not eat, but finish his fast.", "Whoever has eaten, should not eat any more, but fast"),
      difficulty: 1,
      questions: [
        { q: "On which day was the call made?", a: "Ashura", wrong: ["Arafah", "Eid al-Fitr", "The first of Ramadan"], why: "He ﷺ ordered a person on Ashura, the tenth of Muharram, to announce it." },
        { q: "What should one who had eaten do?", a: "Eat no more and fast", wrong: ["Eat until sunset", "Fast the next day", "Give charity instead"], why: "Whoever has eaten, should not eat any more, but fast." },
        { q: "One who had not eaten was told to finish his fast.", tf: true, why: "Who has not eaten should not eat, but complete his fast, the call said." }
      ]
    },
    {
      slug: "combing-his-hair",
      title: "Combing his hair",
      line: "In i'tikaf, he ﷺ leaned his head out, and Aishah combed it.",
      facts: ["Told by Aishah", "I'tikaf: staying in the masjid for worship", "Her room opened onto the masjid"],
      source: hadith("bukhari", "2028", "Aishah", "Sahih", "Aishah said: while the Prophet ﷺ was in i'tikaf in the masjid, he would lean his head out to me, and I would comb and oil his hair.", "I would comb and oil his hair"),
      difficulty: 2,
      questions: [
        { q: "Where was he ﷺ during i'tikaf?", a: "In the masjid", wrong: ["At home", "In the market", "On a journey"], why: "He ﷺ was in i'tikaf in the mosque, Aishah said." },
        { q: "What did Aishah do for his hair?", a: "Combed and oiled it", wrong: ["Cut it", "Covered it", "Dyed it"], why: "I would comb and oil his hair, Aishah said." },
        { q: "He ﷺ left the masjid to have his hair combed.", tf: false, why: "No. He stayed in i'tikaf and only leaned his head out to her." }
      ]
    },
    {
      slug: "dreams-of-the-night",
      title: "Dreams of the Night",
      line: "Companions dreamed of the Night of Qadr in the last seven.",
      facts: ["Told by Ibn Umar", "Their dreams agreed", "Search in the last seven nights"],
      source: hadith("bukhari", "2015", "Ibn Umar", "Sahih", "Some Companions of the Prophet ﷺ were shown in dreams that the Night of Qadr was in the last seven nights. He ﷺ said: I see your dreams agree on the last seven, so whoever seeks it should seek it in the last seven.", "should search in the last seven"),
      difficulty: 3,
      questions: [
        { q: "How did the Companions learn of the Night of Qadr here?", a: "In dreams", wrong: ["From a letter", "From the stars", "From a traveler"], why: "Some men were shown in their dreams that the Night of Qadr was in the last seven." },
        { q: "In which nights did he ﷺ say to search?", a: "The last seven", wrong: ["The first ten", "The middle ten", "Every Friday"], why: "Whoever wants to search for it should search in the last seven, he ﷺ said." },
        { q: "He ﷺ said their dreams agreed.", tf: true, why: "All your dreams agree that it is in the last seven nights, he ﷺ said." }
      ]
    },
    {
      slug: "a-hot-day-on-the-road",
      title: "A hot day on the road",
      line: "On a hot journey, those not fasting served, and won reward.",
      facts: ["Told by Anas ibn Malik", "Some fasted, some did not", "Those not fasting pitched the tents"],
      source: hadith("muslim", "1119a", "Anas ibn Malik", "Sahih", "Anas said: we were on a journey with the Messenger of Allah ﷺ; some of us fasted and some did not. We stopped on a hot day; the fasting ones fell down tired, and those not fasting set up the tents and watered the camels. He ﷺ said: those not fasting have taken the reward today.", "The breakers of the fast have taken away the reward today"),
      difficulty: 3,
      questions: [
        { q: "What did those not fasting do at the stop?", a: "Pitched tents and watered the camels", wrong: ["Slept all day", "Went ahead alone", "Went to hunt"], why: "Those who had not fasted got up, pitched tents and watered the mounts." },
        { q: "Who took the reward that day, he ﷺ said?", a: "Those not fasting", wrong: ["Those fasting", "No one", "The guides only"], why: "The breakers of the fast have taken away the reward today, he ﷺ said." },
        { q: "The day of that stop was cold.", tf: false, why: "No. They stopped on a hot day, and some shaded themselves with their hands." }
      ]
    },
    {
      slug: "a-vow-from-before",
      title: "A vow from before",
      line: "Umar had vowed i'tikaf before Islam; he ﷺ said: keep it.",
      facts: ["Told by Ibn Umar", "One night in Al-Masjid al-Haram", "The vow was from before Islam"],
      source: hadith("bukhari", "2032", "Ibn Umar", "Sahih", "Umar asked the Prophet ﷺ: before Islam I vowed to stay in i'tikaf for one night in Al-Masjid al-Haram. He ﷺ said: fulfil your vow.", "Fulfill your vow"),
      difficulty: 4,
      questions: [
        { q: "Who asked about his old vow?", a: "Umar ibn al-Khattab", wrong: ["Abu Bakr", "Uthman", "Bilal"], why: "Umar asked the Prophet ﷺ: I vowed in the time before Islam." },
        { q: "In which masjid was the vowed i'tikaf?", a: "Al-Masjid al-Haram", wrong: ["Masjid an-Nabawi", "Masjid Quba", "Al-Aqsa"], why: "To stay in i'tikaf for one night in Al-Masjid al-Haram, Umar said." },
        { q: "He ﷺ told Umar to fulfil his vow.", tf: true, why: "Fulfill your vow, he ﷺ said to him." }
      ]
    },
    {
      slug: "breaking-the-fast-early",
      title: "Breaking the fast early",
      line: "Aishah said: breaking the fast promptly is what he ﷺ did.",
      facts: ["Told by Abu Atiyyah", "He and Masruq asked Aishah", "About Ibn Mas'ud's way"],
      source: hadith("muslim", "1099a", "Abu Atiyyah", "Sahih", "Abu Atiyyah said: Masruq and I asked Aishah about two Companions: one breaks his fast and prays Maghrib early, the other later. She asked: who is the one who does it early? We said: Abdullah ibn Mas'ud. She said: this is how the Messenger of Allah ﷺ did it.", "This is how the Messenger of Allah"),
      difficulty: 4,
      questions: [
        { q: "Whom did Abu Atiyyah and Masruq ask?", a: "Aishah", wrong: ["Umm Salamah", "Hafsah", "Ibn Abbas"], why: "Masruq and I went to Aishah and asked her, Abu Atiyyah said." },
        { q: "Who broke his fast early, they said?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Hurairah", "Anas ibn Malik", "Ibn Umar"], why: "We said: it is Abdullah ibn Mas'ud, Abu Atiyyah said." },
        { q: "Aishah said breaking the fast early was his ﷺ way.", tf: true, why: "This is how the Messenger of Allah ﷺ did, Aishah said." }
      ]
    },
    {
      slug: "nine-seven-five",
      title: "Nine, seven, five",
      line: "Seek the Night of Qadr when nine, seven or five nights remain.",
      facts: ["Told by Ibn Abbas", "Within the last ten nights", "Counting the nights left"],
      source: hadith("bukhari", "2021", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: look for the Night of Qadr in the last ten nights of Ramadan, on the night when nine remain, or seven remain, or five remain.", "nine or seven or five nights remain"),
      difficulty: 5,
      questions: [
        { q: "In which ten nights is the Night of Qadr sought?", a: "The last ten of Ramadan", wrong: ["The first ten of Ramadan", "The ten of Dhul-Hijjah", "The middle ten"], why: "Look for the Night of Qadr in the last ten nights of Ramadan, he ﷺ said." },
        { q: "Which numbers of nights left did he ﷺ name?", a: "Nine, seven or five", wrong: ["Ten, eight or six", "Three, two or one", "Twelve or eleven"], why: "On the night when nine or seven or five nights remain, he ﷺ said." },
        { q: "He ﷺ counted by the nights that remain.", tf: true, why: "When nine or seven or five nights remain out of the last ten, he ﷺ said." }
      ]
    }
  ]
};

export const FASTING_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
