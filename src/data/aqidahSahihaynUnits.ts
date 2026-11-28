import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Faith batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/aqidahSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-faith",
  topicId: "aqidah",
  branchId: "aqidah-sahihayn-deeper",
  branch: { title: "Deeper into faith", description: "From Bukhari and Muslim, easy to hard: the best of people, two acts of unbelief, a true father, a curse that harms, and a ruler's trust." },
  name: "the deeper faith lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-best-of-people",
      title: "The best of people",
      line: "He ﷺ named two kinds of people as the best of mankind.",
      facts: ["Told by Abu Sa'id al-Khudri", "A bedouin asked the question", "One keeps people safe from his harm"],
      source: hadith("bukhari", "6494", "Abu Sa'id al-Khudri", "Sahih", "A bedouin asked: Messenger of Allah, who is the best of people? He ﷺ said: a man who strives in Allah's cause with his life and his wealth, and a man who lives alone in a mountain pass worshipping his Lord and keeping people safe from his harm.", "A man who strives for … Cause with his life and property"),
      difficulty: 1,
      questions: [
        { q: "Who asked him ﷺ who the best of people is?", a: "A bedouin", wrong: ["Umar", "A king's messenger", "A rabbi"], why: "A bedouin came to the Prophet ﷺ and asked who is the best of mankind." },
        { q: "With what does the first man strive in Allah's cause?", a: "His life and his wealth", wrong: ["His words only", "His sons", "His tribe"], why: "A man who strives for Allah's Cause with his life and property, he ﷺ said." },
        { q: "The second man keeps people safe from his harm.", tf: true, why: "He worships his Lord in a mountain path and saves the people from his evil." }
      ]
    },
    {
      slug: "two-habits-of-unbelief",
      title: "Two acts of unbelief",
      line: "Two things among people are acts of unbelief, he ﷺ said.",
      facts: ["Told by Abu Hurairah", "Both are found among people", "Wailing means crying out loud for the dead"],
      source: hadith("muslim", "67", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: two things among people are acts of unbelief: attacking someone's family line, and wailing over the dead.", "tantamount to unbelief: slandering … lamentation on the dead"),
      difficulty: 2,
      questions: [
        { q: "Which is one of the two, he ﷺ said?", a: "Attacking someone's family line", wrong: ["Eating with the left hand", "Sleeping late", "Walking fast"], why: "Slandering one's lineage is one of the two, he ﷺ said." },
        { q: "What is the other one?", a: "Wailing over the dead", wrong: ["Crying quietly", "Visiting graves", "Praying for the dead"], why: "Lamentation on the dead is the other, he ﷺ said." },
        { q: "He ﷺ said these two are found among people.", tf: true, why: "Two things are found among men which are tantamount to unbelief, he ﷺ said." }
      ]
    },
    {
      slug: "a-true-father",
      title: "A true father",
      line: "Whoever knowingly claims another father loses Paradise.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "Abu Bakrah heard it too", "It is about knowing the truth and hiding it"],
      source: hadith("bukhari", "6766", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said: I heard the Prophet ﷺ say: whoever claims to be the son of someone other than his father, knowing he is not his father, Paradise is forbidden for him. I told Abu Bakrah, and he said: my ears heard it and my heart kept it from the Messenger of Allah ﷺ.", "My ears heard that and my heart memorized it"),
      difficulty: 2,
      questions: [
        { q: "What is forbidden for one who knowingly claims another father?", a: "Paradise", wrong: ["Fasting", "Hajj", "Charity"], why: "Paradise will be forbidden for him, he ﷺ said." },
        { q: "Who said: my ears heard it and my heart kept it?", a: "Abu Bakrah", wrong: ["Abu Hurairah", "Anas", "Ibn Umar"], why: "Sa'd told Abu Bakrah, who said his ears heard it and his heart memorized it." },
        { q: "The warning is for one who knows the man is not his father.", tf: true, why: "And he knows that person is not his father, he ﷺ said." }
      ]
    },
    {
      slug: "ask-me-anything",
      title: "Ask me anything",
      line: "When questions upset him ﷺ, Umar turned back to Allah.",
      facts: ["Told by Abu Musa", "People pressed him with questions", "One man asked: who is my father?"],
      source: hadith("bukhari", "92", "Abu Musa", "Sahih", "Abu Musa said: the Prophet ﷺ was asked about things he disliked, and when they kept on, he became angry and said: ask me anything you like. A man asked: who is my father? He said: your father is Hudhafah. Another asked the same, and he said: your father is Salim, the freed slave of Shaybah. When Umar saw the anger in his face, he said: Messenger of Allah, we turn to Allah in repentance.", "Ask me anything you like"),
      difficulty: 3,
      questions: [
        { q: "Why did he ﷺ become angry?", a: "People kept asking things he disliked", wrong: ["Someone stole from him", "The prayer was late", "A man insulted Islam"], why: "He was asked about things which he did not like, and they insisted." },
        { q: "What did he ﷺ tell the first man about his father?", a: "Your father is Hudhafah", wrong: ["Your father is Salim", "Your father is unknown", "Ask your mother"], why: "Your father is Hudhafa, he ﷺ replied." },
        { q: "Umar saw the anger and said: we turn to Allah in repentance.", tf: true, why: "Umar said: we repent to Allah, when he saw the anger on his ﷺ face." }
      ]
    },
    {
      slug: "a-curse-that-harms",
      title: "A curse that harms",
      line: "Cursing a believer is like killing him, he ﷺ said.",
      facts: ["Told by Thabit ibn ad-Dahhak", "Calling a believer a kafir is the same", "Words can be as heavy as deeds"],
      source: hadith("bukhari", "6105", "Thabit ibn ad-Dahhak", "Sahih", "The Prophet ﷺ said: whoever swears falsely by a religion other than Islam is as he said, whoever kills himself with something is punished with it in the Fire, cursing a believer is like killing him, and whoever accuses a believer of disbelief, it is as if he killed him.", "cursing a believer is like murdering him"),
      difficulty: 4,
      questions: [
        { q: "What did he ﷺ say cursing a believer is like?", a: "Killing him", wrong: ["Hitting him", "Stealing from him", "Lying to him"], why: "Cursing a believer is like murdering him, he ﷺ said." },
        { q: "What else did he ﷺ say is as if one killed a believer?", a: "Calling him a disbeliever", wrong: ["Not greeting him", "Laughing at him", "Owing him money"], why: "Whoever accuses a believer of disbelief, it is as if he had killed him." },
        { q: "He ﷺ said cursing a believer is only a small slip.", tf: false, why: "He ﷺ said cursing a believer is like murdering him." }
      ]
    },
    {
      slug: "guarding-what-is-yours",
      title: "Guarding what is yours",
      line: "One killed guarding his wealth from a thief is a martyr.",
      facts: ["Told by Abu Hurairah", "A man asked about a robber", "The robber who is killed is in the Fire"],
      source: hadith("muslim", "140", "Abu Hurairah", "Sahih", "A man asked: Messenger of Allah, what if a man comes to take my wealth? He said: do not give it to him. He asked: what if he fights me? He said: then fight him. He asked: what if he kills me? He said: you are a martyr. He asked: what if I kill him? He said: he is in the Fire.", "in order to appropriate my possession … surrender your possession to him"),
      difficulty: 4,
      questions: [
        { q: "If a man comes to take your wealth, what did he ﷺ say?", a: "Do not give it to him", wrong: ["Give him half", "Run away", "Give it and complain later"], why: "Don't surrender your possession to him, he ﷺ said." },
        { q: "If the owner is killed defending it, what is he?", a: "A martyr", wrong: ["A sinner", "Nothing at all", "A thief"], why: "You would be a martyr, he ﷺ said." },
        { q: "If the robber is killed, he ﷺ said he is in the Fire.", tf: true, why: "He would be in the Fire, he ﷺ said of the robber." }
      ]
    },
    {
      slug: "a-rulers-trust",
      title: "A ruler's trust",
      line: "On his deathbed, Ma'qil warned a governor about his people.",
      facts: ["Told by al-Hasan al-Basri", "The governor was Ubaydullah ibn Ziyad", "Ma'qil had kept it back until then"],
      source: hadith("muslim", "142b", "Al-Hasan al-Basri", "Sahih", "Al-Hasan said: Ubaydullah ibn Ziyad visited Ma'qil ibn Yasar in his illness. Ma'qil said: I will tell you a hadith I held back from you. The Messenger of Allah ﷺ said: Allah does not give a servant charge over people and he dies cheating them, except that Allah forbids Paradise for him. Ubaydullah said: why did you not tell me before today? He said: it was not for me to tell you before.", "Why did you not narrate it to me before this day"),
      difficulty: 5,
      questions: [
        { q: "Who visited Ma'qil ibn Yasar in his illness?", a: "Ubaydullah ibn Ziyad", wrong: ["Mu'awiyah", "Abu Bakrah", "Al-Hasan's father"], why: "Ubaidullah b. Ziyad went to see Ma'qil b. Yasir and he was ailing." },
        { q: "What does Allah forbid for one who cheats his people and dies so?", a: "Paradise", wrong: ["Wealth", "His sons", "His home"], why: "Paradise is forbidden by Allah for such a ruler, he ﷺ said." },
        { q: "Ma'qil said he had held this hadith back before.", tf: true, why: "I am narrating to you a hadith which I avoided narrating to you before, Ma'qil said." }
      ]
    }
  ]
};

export const AQIDAH_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
