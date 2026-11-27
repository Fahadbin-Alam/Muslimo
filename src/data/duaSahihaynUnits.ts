import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Duas batch: most du'as of the two books are already taught,
// so this unit holds the four that were not, each with its exact English words to highlight. Every question also has
// Medium, Hard, Super hard and Extremely hard versions (src/data/tiers/duaSahihaynTiers.ts).

const DEEPER: DeepUnit = {
  key: "sahihayn-duas",
  topicId: "duas",
  branchId: "duas-sahihayn-deeper",
  branch: { title: "Du'as in more depth", description: "From Bukhari and Muslim, easy to hard: praise after victory, a du'a before dawn on a journey, a du'a at bedtime, and plain words in du'a." },
  name: "the deeper du'a lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "he-alone-gave-victory",
      title: "He alone gave victory",
      line: "He ﷺ praised Allah, who honoured His army and routed the clans.",
      facts: ["Told by Abu Hurairah", "La ilaha illallahu wahdah", "Nothing comes after Him"],
      source: hadith("muslim", "2724", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ used to say: none has the right to be worshipped but Allah alone, who honoured His army, helped His servant, and alone defeated the clans; there is nothing after Him.", "the One Who conferred upon His armies the honour of victory"),
      difficulty: 1,
      questions: [
        { q: "Who gave His army the honour of victory, in this du'a?", a: "Allah alone", wrong: ["The strongest tribe", "The army itself", "The richest men"], why: "There is no god but Allah, the One Who conferred upon His armies the honour of victory, he ﷺ used to say." },
        { q: "What did Allah do to the clans, in this du'a?", a: "He routed them", wrong: ["He joined them", "He gave them gold", "He made them kings"], why: "He helped His servant rout the clans, he ﷺ used to say." },
        { q: "These words of praise end: there is nothing after Him.", tf: true, why: "There is nothing after that, the du'a ends." }
      ]
    },
    {
      slug: "a-listener-has-heard",
      title: "A listener has heard",
      line: "On a journey before dawn, he ﷺ praised Allah and sought refuge.",
      facts: ["Told by Abu Hurairah", "Said on a journey", "Ends with refuge from the Fire"],
      source: hadith("muslim", "2718", "Abu Hurairah", "Sahih", "When the Messenger of Allah ﷺ was on a journey and dawn was near, he would say: a listener has heard us praise Allah for His good care of us. Our Lord, be with us and grant us Your favour. I seek refuge in Allah from the Fire.", "A listener listened to our praising Allah"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say this du'a?", a: "On a journey, near dawn", wrong: ["At a wedding", "On Eid only", "After every meal"], why: "When Allah's Messenger ﷺ set out on a journey in the morning, he used to say it, Abu Hurairah reported." },
        { q: "What does he ﷺ seek refuge from at the end?", a: "The Fire", wrong: ["Poverty", "The cold", "Wild animals"], why: "I am seeker of refuge in Allah from the Fire, he ﷺ said." },
        { q: "In this du'a he ﷺ asked Allah to be with them.", tf: true, why: "Our Lord! accompany us, guard us and bestow upon us Thy grace, he ﷺ said." }
      ]
    },
    {
      slug: "you-created-my-soul",
      title: "You created my soul",
      line: "Ibn Umar taught a bedtime du'a he heard from him ﷺ.",
      facts: ["Told by Abdullah ibn Umar", "Said when going to bed", "Ends: I ask You for well-being"],
      source: hadith("muslim", "2712", "Abdullah ibn Umar", "Sahih", "Ibn Umar told a man to say when going to bed: O Allah, You created my soul and You take it; its death and its life are Yours. If You keep it alive, protect it, and if You take it, forgive it. O Allah, I ask You for well-being. Asked if he heard it from Umar, he said: from one better than Umar, the Messenger of Allah ﷺ.", "Thou created my being and it is for Thee to take it to its ultimate goal"),
      difficulty: 3,
      questions: [
        { q: "When is this du'a of Ibn Umar said?", a: "When going to bed", wrong: ["When waking up", "When entering the masjid", "When eating"], why: "Abdullah b. Umar commanded a person that as he went to bed, he should say it." },
        { q: "What does the du'a ask for at the very end?", a: "Well-being", wrong: ["Riches", "A long sleep", "Good dreams"], why: "O Allah, I beg of Thee safety, the du'a ends." },
        { q: "Ibn Umar said he heard it from Umar.", tf: false, why: "No. He said: from one who is better than Umar, the Messenger of Allah ﷺ." }
      ]
    },
    {
      slug: "plain-words-in-dua",
      title: "Plain words in du'a",
      line: "Ibn Abbas: do not tire people, and keep du'a free of rhyme.",
      facts: ["Told by Ikrimah, from Ibn Abbas", "As-saj': rhymed prose", "Teach when people want to hear"],
      source: hadith("bukhari", "6337", "Ibn Abbas", "Sahih", "Ibn Abbas said: remind people once a week, or twice, or at most three times, and do not make them tired of this Quran. Do not cut into people's talk to preach to them; stay quiet, and speak when they ask and want to hear. And avoid rhymed prose in du'a, for the Messenger of Allah ﷺ and his Companions always avoided it.", "avoid the use of rhymed prose in invocation"),
      difficulty: 4,
      questions: [
        { q: "What did Ibn Abbas say to avoid in du'a?", a: "Rhymed prose", wrong: ["Arabic words", "Raising the hands", "Asking for Paradise"], why: "Avoid the use of rhymed prose in invocation, Ibn Abbas said." },
        { q: "How often did Ibn Abbas advise reminding people?", a: "Once a week, at most three times", wrong: ["Every hour", "Every night", "Once a year"], why: "Preach to the people once a week, and if you want to preach more, then let it be three times, he said." },
        { q: "Ibn Abbas said to cut into people's talk to preach.", tf: false, why: "No. He said do not interrupt their talk; stay quiet and speak when they ask." }
      ]
    }
  ]
};

export const DUA_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
