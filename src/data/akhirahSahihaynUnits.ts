import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Akhirah batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/akhirahSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-akhirah",
  topicId: "akhirah",
  branchId: "akhirah-sahihayn-deeper",
  branch: { title: "Deeper into the Hereafter", description: "From Bukhari and Muslim, easy to hard: the width of the Pool, a shelf of barley, worship in hard times, signs of the Hour, and the Fire." },
  name: "the deeper Hereafter lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "madinah-to-sana",
      title: "From Madinah to San'a",
      line: "His ﷺ Pool is as wide as Madinah to San'a.",
      facts: ["Told by Harithah ibn Wahb", "Al-Hawd: the Pool", "San'a is in Yemen"],
      source: hadith("bukhari", "6591", "Harithah ibn Wahb", "Sahih", "Harithah ibn Wahb said: I heard the Prophet ﷺ speak of his Pool and say: its width is like the distance between Madinah and San'a.", "is equal to the distance between Medina"),
      difficulty: 1,
      questions: [
        { q: "How wide is his ﷺ Pool, by this hadith?", a: "Like Madinah to San'a", wrong: ["Like one valley", "Like a small well", "Like Makkah to Mina"], why: "The width of the Lake-Fount is equal to the distance between Medina and Sana, he ﷺ said." },
        { q: "Where is San'a?", a: "In Yemen", wrong: ["In Syria", "In Egypt", "In Iraq"], why: "San'a is the capital of Yemen, as the English text notes." },
        { q: "Harithah ibn Wahb heard him ﷺ speak of the Pool.", tf: true, why: "I heard the Prophet ﷺ mentioning the Lake-Fount, Harithah said." }
      ]
    },
    {
      slug: "a-shelf-of-barley",
      title: "A shelf of barley",
      line: "When he ﷺ passed away, only some barley was on Aishah's shelf.",
      facts: ["Told by Aishah", "He ﷺ left little of this world", "The barley ran out when measured"],
      source: hadith("bukhari", "6451", "Aishah", "Sahih", "Aishah said: when the Prophet ﷺ passed away, there was nothing a living being could eat on my shelf except some barley. I ate from it for a long time, and when I measured it, it ran out.", "nothing which can be eaten by a living creature was left on my shelf except some barley grain"),
      difficulty: 2,
      questions: [
        { q: "What food was left on Aishah's shelf when he ﷺ passed away?", a: "Some barley", wrong: ["Sacks of wheat", "Jars of honey", "Plenty of dates"], why: "Nothing which can be eaten by a living creature was left on my shelf except some barley grain, Aishah said." },
        { q: "What happened when Aishah measured the barley?", a: "It ran out", wrong: ["It doubled", "It turned to gold", "It went bad"], why: "When I measured it, it finished, Aishah said." },
        { q: "He ﷺ left great riches when he passed away.", tf: false, why: "No. Only some barley grain was left on Aishah's shelf." }
      ]
    },
    {
      slug: "worship-in-hard-times",
      title: "Worship in hard times",
      line: "Worship in times of killing is like hijrah to him ﷺ.",
      facts: ["Told by Ma'qil ibn Yasar", "Al-harj: killing and turmoil", "Hijrah: emigrating for Allah"],
      source: hadith("muslim", "2948a", "Ma'qil ibn Yasar", "Sahih", "The Messenger of Allah ﷺ said: worship in the time of al-harj, widespread killing and turmoil, is like making hijrah to me.", "Worshiping during the period of widespread turmoil is like emigration towards me"),
      difficulty: 2,
      questions: [
        { q: "What is worship in a time of turmoil like, he ﷺ said?", a: "Like hijrah to him ﷺ", wrong: ["Like a lost deed", "Like a small sin", "Like doing nothing"], why: "Worshiping during the period of widespread turmoil is like emigration towards me, he ﷺ said." },
        { q: "What does al-harj mean here?", a: "Widespread killing and turmoil", wrong: ["A big feast", "A long journey", "A rainy season"], why: "Al-harj is the period of widespread turmoil the hadith speaks of." },
        { q: "Hard times are a reason to stop worshipping.", tf: false, why: "No. Worship then is like emigration to him ﷺ, he said." }
      ]
    },
    {
      slug: "madinah-grows",
      title: "Madinah grows",
      line: "One day, the homes of Madinah will reach Ihab or Yahab.",
      facts: ["Told by Abu Hurairah", "Muslim lists it with the signs of the Hour", "Ihab: a place outside Madinah"],
      source: hadith("muslim", "2903", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: the homes of Madinah will reach Ihab or Yahab. A narrator asked how far these were from Madinah, and was told: so many miles.", "until the habitations of Medina would extend to Ihab or Yahab"),
      difficulty: 3,
      questions: [
        { q: "How far will the homes of Madinah spread, he ﷺ said?", a: "To Ihab or Yahab", wrong: ["To Makkah", "To the sea", "To Syria"], why: "The habitations of Medina would extend to Ihab or Yahab, he ﷺ said." },
        { q: "What will reach Ihab or Yahab?", a: "The homes of Madinah", wrong: ["The armies of Rome", "The rivers of Iraq", "The sands of Najd"], why: "The habitations of Medina would extend to Ihab or Yahab, he ﷺ said." },
        { q: "The narrators asked how far Ihab was from Madinah.", tf: true, why: "Zuhayr said: I asked Suhayl how far these were from Madinah. He said: so and so miles." }
      ]
    },
    {
      slug: "back-to-dhul-khalasah",
      title: "Back to Dhul-Khalasah",
      line: "Before the Hour, some will go back to an old idol.",
      facts: ["Told by Abu Hurairah", "Daus: a tribe of Yemen", "Dhul-Khalasah: an idol house in Tabalah"],
      source: hadith("muslim", "2906", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: the Hour will not come until the women of Daus are seen going around Dhul-Khalasah. Dhul-Khalasah was an idol house in Tabalah that Daus used to worship in the time before Islam.", "the women of the tribe of Daus would be seen going round Dhi al-Khalasa"),
      difficulty: 3,
      questions: [
        { q: "What will some women of Daus do before the Hour?", a: "Go around Dhul-Khalasah", wrong: ["Build a masjid", "Move to Madinah", "Dig a well"], why: "The women of the tribe of Daus would be seen going round Dhi al-Khalasa, he ﷺ said." },
        { q: "What was Dhul-Khalasah?", a: "An idol house in Tabalah", wrong: ["A well in Makkah", "A market in Yemen", "A hill near Madinah"], why: "Dhi al-Khalasa is a place in Tabala, where there was a temple in which Daus used to worship the idol." },
        { q: "This hadith warns that some will return to idols.", tf: true, why: "The women of Daus would be seen going round the old idol house, he ﷺ said." }
      ]
    },
    {
      slug: "three-days-wide",
      title: "Three days wide",
      line: "In the Fire, a disbeliever's shoulders grow three days wide.",
      facts: ["Told by Abu Hurairah", "The Fire makes bodies huge", "A warning from the unseen"],
      source: hadith("bukhari", "6551", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the distance between the two shoulders of a disbeliever in the Fire will be what a fast rider covers in three days.", "The width between the two shoulders of a Kafir"),
      difficulty: 4,
      questions: [
        { q: "How wide are a disbeliever's shoulders in the Fire?", a: "Three days of fast riding", wrong: ["One arm's length", "One hour of walking", "Ten steps"], why: "Equal to the distance covered by a fast rider in three days, he ﷺ said." },
        { q: "Who covers that distance in three days?", a: "A fast rider", wrong: ["A slow walker", "A child", "A ship"], why: "The distance covered by a fast rider in three days, he ﷺ said." },
        { q: "This hadith is about a believer in Paradise.", tf: false, why: "No. He ﷺ spoke of the shoulders of a disbeliever in the Fire." }
      ]
    },
    {
      slug: "the-lightest-punishment",
      title: "The lightest punishment",
      line: "Even the lightest punishment in the Fire is a burning ember.",
      facts: ["Told by An-Nu'man ibn Bashir", "The arch of the foot", "A reason to fear the Fire"],
      source: hadith("bukhari", "6561", "An-Nu'man ibn Bashir", "Sahih", "An-Nu'man said: I heard the Prophet ﷺ say: the one with the lightest punishment among the people of the Fire on the Day of Resurrection is a man with a burning ember placed under the arch of his feet, so that his brain boils from it.", "a smoldering ember will be placed"),
      difficulty: 5,
      questions: [
        { q: "Where is the ember placed on the least punished man?", a: "Under the arch of his feet", wrong: ["On his hand", "On his back", "On his head"], why: "A man under whose arch of the feet a smoldering ember will be placed, he ﷺ said." },
        { q: "What happens to his brain from that ember?", a: "It boils", wrong: ["Nothing", "It cools", "It sleeps"], why: "So that his brain will boil because of it, he ﷺ said." },
        { q: "The lightest punishment in the Fire is still terrible.", tf: true, why: "Even the least punished will have a smoldering ember under his feet, An-Nu'man heard him ﷺ say." }
      ]
    }
  ]
};

export const AKHIRAH_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
