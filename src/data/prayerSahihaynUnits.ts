import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Prayer batch: a unit whose lessons go deeper as they go
// on (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact
// English words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/prayerSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-prayer",
  topicId: "prayer",
  branchId: "prayer-sahihayn-deeper",
  branch: { title: "Deeper into prayer", description: "From Bukhari and Muslim, easy to hard: Subhan Allah in prayer, the long walk, the men of the Suffah, a mat in a home, and an imam who keeps it light." },
  name: "the deeper prayer stories",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "subhan-allah-in-prayer",
      title: "Subhan Allah in prayer",
      line: "If something happens in prayer, men say Subhan Allah.",
      facts: ["Told by Abu Hurairah", "It tells the imam something is wrong", "Women clap their hands instead"],
      source: hadith("bukhari", "1203", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: saying Subhan Allah is for men, and clapping is for women. If something happens in the prayer, men let the imam know by saying Subhan Allah, and women by clapping.", "is for men and clapping is for women"),
      difficulty: 1,
      questions: [
        { q: "If something happens in prayer, what do men say?", a: "Subhan Allah", wrong: ["Allahu Akbar", "Al-hamdu lillah", "Amin"], why: "Saying Subhan Allah is for men, he ﷺ said." },
        { q: "What do women do instead to tell the imam?", a: "Clap their hands", wrong: ["Say Subhan Allah aloud", "Tap the imam", "Leave the row"], why: "Clapping is for women, he ﷺ said." },
        { q: "Saying Subhan Allah in prayer can let the imam know something happened.", tf: true, why: "Men let the imam know by saying Subhan Allah." }
      ]
    },
    {
      slug: "the-long-walk-to-the-mosque",
      title: "The long walk to the mosque",
      line: "Those who walk from farthest get the greatest reward.",
      facts: ["Told by Abu Musa", "Then the next farthest, and so on", "Waiting for the imam is better than sleeping"],
      source: hadith("bukhari", "651", "Abu Musa", "Sahih", "The Prophet ﷺ said: the people with the greatest reward for the prayer are those who walk to it from farthest away, then those next farthest. And one who waits to pray with the imam has a greater reward than one who prays and then goes to sleep.", "The people who get tremendous reward for the prayer are those who are farthest away"),
      difficulty: 2,
      questions: [
        { q: "Who gets the greatest reward for the prayer, he ﷺ said?", a: "Those who come from farthest", wrong: ["Those who live next door", "Those who come by camel", "Those who pray at home"], why: "Those who are farthest away from the mosque get tremendous reward, he ﷺ said." },
        { q: "Who has more reward than one who prays and sleeps?", a: "One who waits to pray with the imam", wrong: ["One who prays before the adhan", "One who prays alone at home", "One who leaves early"], why: "One who waits to pray with the imam has greater reward, he ﷺ said." },
        { q: "The reward is the same however far one walks.", tf: false, why: "The farthest get the most reward, then the next farthest." }
      ]
    },
    {
      slug: "the-men-of-the-suffah",
      title: "The men of the Suffah",
      line: "Seventy men of the Suffah had no cloth for the upper body.",
      facts: ["Told by Abu Hurairah", "The Suffah was a shaded place in the mosque", "They held their sheets with their hands"],
      source: hadith("bukhari", "442", "Abu Hurairah", "Sahih", "Abu Hurairah said: I saw seventy of the men of the Suffah, and not one of them had an upper garment. They had only a lower wrap or a sheet tied round their necks; some reached the middle of the leg and some the heels, and they held them together with their hands so as not to be uncovered.", "I saw seventy of As-Suffa men"),
      difficulty: 2,
      questions: [
        { q: "How many men of the Suffah did Abu Hurairah see?", a: "Seventy", wrong: ["Seven", "Forty", "Three hundred"], why: "I saw seventy of As-Suffa men, Abu Hurairah said." },
        { q: "What did none of them have?", a: "An upper garment", wrong: ["A lower wrap", "Shoes", "A place to pray"], why: "None of them had a rida, a cloth for the upper body." },
        { q: "They held their sheets with their hands so they stayed covered.", tf: true, why: "They gathered them with their hands lest they should become uncovered." }
      ]
    },
    {
      slug: "a-mat-in-his-home",
      title: "A mat in his home",
      line: "A man who could not come had him ﷺ pray in his home.",
      facts: ["Told by Anas ibn Malik", "The man was from the Ansar", "One side of the mat was washed"],
      source: hadith("bukhari", "670", "Anas ibn Malik", "Sahih", "Anas said: a man of the Ansar said to the Prophet ﷺ: I cannot pray with you. He was a very heavy man. He made food for the Prophet ﷺ, invited him to his house, spread out a mat for him and washed one side of it with water, and the Prophet ﷺ prayed two rak'ahs on it.", "He was a very fat man and he prepared a meal for the Prophet"),
      difficulty: 3,
      questions: [
        { q: "What did the man of the Ansar spread out for him ﷺ?", a: "A mat", wrong: ["A carpet of silk", "His cloak", "A sheepskin"], why: "He spread out a mat for the Prophet ﷺ, Anas said." },
        { q: "How many rak'ahs did he ﷺ pray on it?", a: "Two", wrong: ["Four", "Three", "One"], why: "The Prophet ﷺ prayed two rak'at on it." },
        { q: "The man said he could not pray with him ﷺ in the mosque.", tf: true, why: "I cannot pray with you, the man of the Ansar told him ﷺ." }
      ]
    },
    {
      slug: "light-prayer-at-the-conquest",
      title: "A light prayer at the conquest",
      line: "On the day Makkah was opened, he ﷺ prayed eight rak'ahs.",
      facts: ["Told by Umm Hani", "It was in her house", "He ﷺ washed first"],
      source: hadith("bukhari", "1176", "Umm Hani", "Sahih", "Umm Hani said: on the day of the conquest of Makkah, the Prophet ﷺ came into my house, washed, and prayed eight rak'ahs. I never saw him pray a lighter prayer, yet he did the bowing and the prostrations in full.", "offering such a light prayer but he performed bowing and prostrations perfectly"),
      difficulty: 3,
      questions: [
        { q: "How many rak'ahs did he ﷺ pray in Umm Hani's house?", a: "Eight", wrong: ["Two", "Four", "Twelve"], why: "He ﷺ took a bath and offered eight rak'at, Umm Hani said." },
        { q: "On what day was this?", a: "The day Makkah was opened", wrong: ["The day of Badr", "The day of Arafah", "The first Friday in Madinah"], why: "On the day of the conquest of Makkah, Umm Hani said." },
        { q: "That prayer was light, yet he ﷺ did the bowing and prostrations in full.", tf: true, why: "He performed bowing and prostrations perfectly, Umm Hani said." }
      ]
    },
    {
      slug: "abu-bakr-steps-back",
      title: "Abu Bakr steps back",
      line: "Abu Bakr led the prayer, then stepped back when he ﷺ came.",
      facts: ["Told by Sahl ibn Sa'd", "He ﷺ had gone to make peace", "Bilal asked Abu Bakr to lead"],
      source: hadith("bukhari", "1201", "Sahl ibn Sa'd", "Sahih", "Sahl said: the Prophet ﷺ went to make peace between two clans of Banu Amr ibn Awf, and the prayer time came. Bilal asked Abu Bakr to lead the people, and he did. The Prophet ﷺ came through the rows to the first row, and the people clapped. Abu Bakr did not look around in prayer, but when the clapping grew he turned and saw him. The Prophet ﷺ waved to him to stay in his place, but Abu Bakr raised his hands, praised Allah and stepped back, and the Prophet ﷺ went forward and led the prayer.", "waved him to remain at his place, but Abu Bakr raised both his hands"),
      difficulty: 4,
      questions: [
        { q: "Why was he ﷺ late for that prayer?", a: "He went to make peace between people", wrong: ["He was ill", "He was on a journey", "He was teaching the Quran"], why: "He ﷺ went to make reconciliation between the tribes of Bani Amr bin Awf." },
        { q: "What did Abu Bakr do when he ﷺ waved him to stay?", a: "Praised Allah and stepped back", wrong: ["Kept leading the prayer", "Left the mosque", "Sat down in his place"], why: "Abu Bakr raised both his hands, praised Allah and then retreated." },
        { q: "Abu Bakr used to look around a lot while praying.", tf: false, why: "Abu Bakr never looked hither and thither during the prayer, Sahl said." }
      ]
    },
    {
      slug: "an-imam-who-keeps-it-light",
      title: "An imam who keeps it light",
      line: "He ﷺ told Uthman ibn Abi al-As: lead them, and keep it short.",
      facts: ["Told by Uthman ibn Abi al-As", "He ﷺ put his hand on his chest and back", "Alone, one may pray as long as he likes"],
      source: hadith("muslim", "468a", "Uthman ibn Abi al-As", "Sahih", "Uthman ibn Abi al-As said: the Prophet ﷺ told me: lead your people in prayer. I said: Messenger of Allah, I feel something in myself. He had me sit in front of him, put his hand on my chest, then had me turn and put it on my back between my shoulders. Then he said: lead your people. Whoever leads people should keep it short, for among them are the old, the sick, the weak and those with work to do. When one of you prays alone, he may pray as he likes.", "He who acts as Imam of the people, he must be brief"),
      difficulty: 5,
      questions: [
        { q: "Where did he ﷺ put his hand after Uthman said he felt something?", a: "On his chest, then his back", wrong: ["On his head", "On his shoulder only", "On his hand"], why: "He placed his hand on my breast and then on my back between my shoulders, Uthman said." },
        { q: "Who did he ﷺ name as reasons to keep it short?", a: "The old, the sick, the weak and the busy", wrong: ["Only the children", "Travellers and guests", "Those who came late"], why: "Among them are the aged, the sick, the weak and those who have business to attend." },
        { q: "When praying alone, one may make the prayer as long as one likes.", tf: true, why: "When any of you prays alone, he may pray as he likes, he ﷺ said." }
      ]
    }
  ]
};

export const PRAYER_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
