import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Marriage batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/marriageSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-marriage",
  topicId: "marriage",
  branchId: "marriage-sahihayn-deeper",
  branch: { title: "Marriage in more depth", description: "From Bukhari and Muslim, easy to hard: a bride who served, the mahr, a broken dish, keeping conditions, and staying safe." },
  name: "the deeper marriage lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-bride-served",
      title: "The bride served them",
      line: "At Abu Usaid's wedding, his bride served the food herself.",
      facts: ["Told by Sahl ibn Sa'd", "The bride, Umm Usaid, served", "Dates soaked overnight"],
      source: hadith("bukhari", "5182", "Sahl ibn Sa'd", "Sahih", "Sahl said: when Abu Usaid as-Sa'idi married, he invited the Prophet ﷺ and his Companions. No one made the food and brought it to them but his wife Umm Usaid, the bride. She had soaked dates in water in a stone pot overnight, and after the meal she gave him ﷺ that drink.", "She soaked some dates in water in a stone pot overnight"),
      difficulty: 1,
      questions: [
        { q: "Who served the food at Abu Usaid's wedding?", a: "His wife, the bride", wrong: ["His servants", "His mother", "The guests themselves"], why: "None prepared the food for them and brought it to them but his wife, Sahl said." },
        { q: "What drink did the bride make for him ﷺ?", a: "Dates soaked in water", wrong: ["Fresh milk", "Honey water", "Zamzam water"], why: "She soaked some dates in water in a stone pot overnight, Sahl said." },
        { q: "Abu Usaid invited him ﷺ and his Companions to the wedding.", tf: true, why: "When Abu Usaid got married, he invited the Prophet ﷺ and his companions, Sahl said." }
      ]
    },
    {
      slug: "the-mahr-he-gave",
      title: "The mahr he gave",
      line: "Aishah told the mahr he ﷺ gave his wives: 500 dirhams.",
      facts: ["Told by Aishah", "Asked by Abu Salamah", "Twelve and a half uqiyah"],
      source: hadith("muslim", "1426", "Aishah", "Sahih", "Abu Salamah asked Aishah about the mahr of the Messenger of Allah ﷺ. She said: twelve uqiyah and a nash. A nash is half an uqiyah, and that makes five hundred dirhams. That was the mahr he ﷺ gave his wives.", "it amounts to five hundred dirhams"),
      difficulty: 2,
      questions: [
        { q: "How much mahr did he ﷺ give his wives, Aishah said?", a: "Five hundred dirhams", wrong: ["Fifty dirhams", "A thousand dinars", "No mahr at all"], why: "It amounts to five hundred dirhams, and that was the dower he ﷺ gave his wives, Aishah said." },
        { q: "What is a nash, Aishah explained?", a: "Half an uqiyah", wrong: ["Two uqiyah", "A gold coin", "A young camel"], why: "It is half of uqiya, Aishah said." },
        { q: "Abu Salamah asked Aishah about his ﷺ mahr.", tf: true, why: "Abu Salamah said: I asked Aishah: what is the amount of dower of Allah’s Messenger ﷺ?" }
      ]
    },
    {
      slug: "the-broken-dish",
      title: "The broken dish",
      line: "A dish broke, and he ﷺ calmly gathered the food.",
      facts: ["Told by Anas", "A wife sent food in a dish", "He ﷺ gave a whole dish back"],
      source: hadith("bukhari", "5225", "Anas ibn Malik", "Sahih", "Anas said: the Prophet ﷺ was in the house of one of his wives when another Mother of the Believers sent food in a dish. The wife of the house struck the servant's hand and the dish fell and broke. He ﷺ gathered the pieces and the food and said: your mother felt jealous. Then he gave a whole dish from that house in its place.", "gathered the broken pieces of the dish"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do when the dish broke?", a: "Gathered the pieces and the food", wrong: ["Scolded everyone", "Left the house", "Threw the food away"], why: "He gathered the broken pieces of the dish and collected the food on them, Anas said." },
        { q: "What did he ﷺ give back for the broken dish?", a: "A whole dish", wrong: ["Some money", "Nothing at all", "Two goats"], why: "He gave the sound dish to the wife whose dish had been broken, Anas said." },
        { q: "He ﷺ said: your mother felt jealous.", tf: true, why: "Your mother, my wife, felt jealous, he ﷺ said, and he stayed calm." }
      ]
    },
    {
      slug: "keep-the-conditions",
      title: "Keep the conditions",
      line: "The conditions of a marriage are the most worthy to keep.",
      facts: ["Told by Uqbah ibn Amir", "Shurut: conditions", "Keep your word in marriage"],
      source: hadith("bukhari", "5151", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ said: the conditions most deserving to be kept are the conditions by which marriage was made lawful for you.", "The stipulations most entitled to be abided by"),
      difficulty: 3,
      questions: [
        { q: "Which conditions are most worthy to be kept, he ﷺ said?", a: "Those of the marriage contract", wrong: ["Those of a sale", "Those of a game", "Those of a journey"], why: "The stipulations most entitled to be abided by are those of the marriage contract, he ﷺ said." },
        { q: "What should a couple do with conditions agreed at marriage?", a: "Keep them", wrong: ["Forget them", "Change them alone", "Keep them for a year"], why: "They are the most entitled to be abided by, he ﷺ said." },
        { q: "Marriage conditions matter less than other promises.", tf: false, why: "No. He ﷺ said they are the most entitled to be kept." }
      ]
    },
    {
      slug: "not-with-her-aunt",
      title: "Not with her aunt",
      line: "A man may not be married to a woman and her aunt.",
      facts: ["Told by Abu Hurairah", "Her father's sister", "Her mother's sister too"],
      source: hadith("bukhari", "5109", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: a woman and her father's sister may not be married to the same man, and a woman and her mother's sister may not be married to the same man.", "A woman and her paternal aunt should not be married to the same man"),
      difficulty: 4,
      questions: [
        { q: "Who may not be married to the same man as a woman, he ﷺ said?", a: "Her aunt", wrong: ["Her friend", "Her neighbour", "Her teacher"], why: "A woman and her paternal aunt should not be married to the same man, he ﷺ said." },
        { q: "Which aunts does this rule cover?", a: "Her father's and her mother's sister", wrong: ["Only her father's sister", "Only her mother's sister", "Only an older aunt"], why: "Similarly, a woman and her maternal aunt should not be married to the same man, he ﷺ said." },
        { q: "A man may marry a woman and her mother's sister together.", tf: false, why: "No. He ﷺ said a woman and her maternal aunt should not be married to the same man." }
      ]
    },
    {
      slug: "no-false-hair",
      title: "No false hair",
      line: "A bride lost her hair; he ﷺ forbade adding false hair.",
      facts: ["Told by Aishah", "The bride was from the Ansar", "Al-wasl: joining hair"],
      source: hadith("bukhari", "5205", "Aishah", "Sahih", "Aishah said: a woman of the Ansar married off her daughter, and the girl's hair began to fall out. They asked the Prophet ﷺ if she could wear false hair, as her husband had suggested. He ﷺ said: no, for Allah curses the women who join false hair to their hair.", "Allah sends His curses upon such ladies who lengthen their hair artificially"),
      difficulty: 4,
      questions: [
        { q: "What happened to the bride's hair?", a: "It began to fall out", wrong: ["It turned white", "It grew very long", "It was cut short"], why: "The hair of the latter started falling out, Aishah said." },
        { q: "What did he ﷺ say about adding false hair?", a: "No, do not do it", wrong: ["Yes, if the husband asks", "Only for the wedding", "Only at night"], why: "No, do not do that, he ﷺ said." },
        { q: "Her husband's wish made the false hair allowed.", tf: false, why: "No. He ﷺ still said no, for Allah curses those who lengthen their hair artificially." }
      ]
    },
    {
      slug: "the-in-law-is-death",
      title: "The in-law is death",
      line: "Beware going in to women alone; the in-law is death.",
      facts: ["Told by Uqbah ibn Amir", "Al-hamu: the husband's male relatives", "A strong warning"],
      source: hadith("bukhari", "5232", "Uqbah ibn Amir", "Sahih", "The Messenger of Allah ﷺ said: beware of going in to women. A man of the Ansar asked: what about the in-law, the husband's brother or nephew? He ﷺ said: the in-law is death.", "The in-laws of the wife are death itself"),
      difficulty: 5,
      questions: [
        { q: "What did he ﷺ warn men about?", a: "Going in to women alone", wrong: ["Eating with guests", "Travelling by night", "Visiting the sick"], why: "Beware of entering upon the ladies, he ﷺ said." },
        { q: "What did he ﷺ call al-hamu, the husband's male relative?", a: "Death", wrong: ["Family", "A guard", "A safe brother"], why: "The in-laws of the wife are death itself, he ﷺ said." },
        { q: "A man of the Ansar asked about the in-laws.", tf: true, why: "A man from the Ansar said: what about al-hamu, the in-laws of the wife?" }
      ]
    }
  ]
};

export const MARRIAGE_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
