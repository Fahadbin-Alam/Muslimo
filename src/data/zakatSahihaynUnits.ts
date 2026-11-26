import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Zakat batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/zakatSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-zakat",
  topicId: "zakat",
  branchId: "zakat-sahihayn-deeper",
  branch: { title: "Deeper into zakat", description: "From Bukhari and Muslim, easy to hard: the truly poor, a rope and wood, charity for everyone, buried treasure, and a giver who is no miser." },
  name: "the deeper zakat lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-truly-poor",
      title: "The truly poor",
      line: "The truly poor person has nothing and is shy to ask.",
      facts: ["Told by Abu Hurairah", "Not the one asking a morsel or two", "He is ashamed to beg"],
      source: hadith("bukhari", "1476", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the poor person is not the one who asks people for a morsel or two; the poor person is the one who has nothing and is too ashamed to beg from others.", "the poor is the one who has nothing and is ashamed to beg from others"),
      difficulty: 1,
      questions: [
        { q: "Who is the truly poor person, he ﷺ said?", a: "One who has nothing and is shy to ask", wrong: ["One who asks for a morsel", "One who has no house", "One who travels a lot"], why: "The poor is the one who has nothing and is ashamed to beg from others, he ﷺ said." },
        { q: "What does the one who is not truly poor ask for?", a: "A morsel or two", wrong: ["A house", "A camel", "A gold coin"], why: "The poor person is not the one who asks a morsel or two from others." },
        { q: "The truly poor person is ashamed to beg.", tf: true, why: "He has nothing and is ashamed to beg from others, he ﷺ said." }
      ]
    },
    {
      slug: "a-rope-and-wood",
      title: "A rope and wood",
      line: "Cutting and selling wood is better than asking people.",
      facts: ["Told by Abu Hurairah", "He ﷺ swore by Allah on it", "The one asked may give or not"],
      source: hadith("bukhari", "1470", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: by the One in whose hand my soul is, it is better for one of you to take a rope, cut wood, carry it on his back and sell it, than to ask a person who may give him or may refuse.", "take a rope and cut the wood"),
      difficulty: 1,
      questions: [
        { q: "What is better than asking people, he ﷺ said?", a: "Cutting wood and selling it", wrong: ["Waiting at the masjid", "Borrowing from a friend", "Sleeping until noon"], why: "Better to take a rope and cut the wood, carry it on his back and sell it." },
        { q: "What should he take to cut the wood?", a: "A rope", wrong: ["A camel", "A sword", "A bucket"], why: "It is better for anyone of you to take a rope and cut the wood, he ﷺ said." },
        { q: "He ﷺ said the person asked may give or may not.", tf: true, why: "Rather than to ask a person who may give him or not, he ﷺ said." }
      ]
    },
    {
      slug: "charity-for-everyone",
      title: "Charity for everyone",
      line: "Every Muslim gives charity, even one with nothing to give.",
      facts: ["Told by Abu Musa al-Ash'ari", "Work, help, then do good", "Keeping from evil counts too"],
      source: hadith("bukhari", "1445", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: every Muslim must give charity. They asked: what if he has nothing? He said: let him work with his hands, benefit himself and give. They asked: what if he cannot? He said: let him help the needy who asks for help. They asked: what if he cannot? He said: let him do good and keep away from evil, for that is charity for him.", "He should help the needy who appeal for help"),
      difficulty: 2,
      questions: [
        { q: "If one has nothing to give, what should he do first?", a: "Work with his hands", wrong: ["Ask others", "Do nothing", "Sell his house"], why: "He should work with his hands, benefit himself and give, he ﷺ said." },
        { q: "If he cannot work, what then?", a: "Help the needy who ask for help", wrong: ["Fast three days", "Pray all night", "Travel for Hajj"], why: "He should help the needy who appeal for help, he ﷺ said." },
        { q: "Keeping away from evil counts as charity.", tf: true, why: "Do good deeds and keep away from evil deeds; that is charity, he ﷺ said." }
      ]
    },
    {
      slug: "do-not-press",
      title: "Do not press",
      line: "Pressing hard when asking takes the blessing away.",
      facts: ["Told by Mu'awiyah", "He ﷺ swore by Allah on it", "A gift given unwillingly"],
      source: hadith("muslim", "1038a", "Mu'awiyah ibn Abi Sufyan", "Sahih", "The Messenger of Allah ﷺ said: do not press hard when you ask. By Allah, if one of you asks me for something and gets it from me while I dislike giving it, there will be no blessing for him in what I give him.", "Do not press in a matter"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ say not to do when asking?", a: "Press too hard", wrong: ["Ask at night", "Ask in a group", "Ask quietly"], why: "Do not press in a matter, he ﷺ said." },
        { q: "What is missing from a gift got by pressing?", a: "The blessing in it", wrong: ["Half of it", "Its price", "Nothing at all"], why: "He will not be blessed in that which I give him, he ﷺ said." },
        { q: "Pressing hard for a gift brings more blessing.", tf: false, why: "No. He will not be blessed in what he gets that way, he ﷺ said." }
      ]
    },
    {
      slug: "buried-treasure",
      title: "Buried treasure",
      line: "From treasure found buried, one fifth is due.",
      facts: ["Told by Abu Hurairah", "Rikaz: treasure buried long ago", "Khumus means one fifth"],
      source: hadith("bukhari", "1499", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: there is no blood money for one killed by an animal, by falling in a well, or by working in a mine; and on rikaz, buried treasure, one fifth is due.", "Khumus is compulsory on Rikaz"),
      difficulty: 3,
      questions: [
        { q: "What share of rikaz, buried treasure, is due?", a: "One fifth", wrong: ["One tenth", "One half", "One fortieth"], why: "Khumus, one fifth, is compulsory on rikaz, he ﷺ said." },
        { q: "Besides animals and wells, what work did he ﷺ name?", a: "Working in mines", wrong: ["Farming", "Fishing", "Building houses"], why: "No compensation for one killed by an animal, a well, or working in mines." },
        { q: "No blood money is due for one who falls into a well.", tf: true, why: "There is no compensation for one killed or wounded by falling in a well." }
      ]
    },
    {
      slug: "when-zakat-is-held-back",
      title: "When zakat is held back",
      line: "Animals whose zakat was never paid will trample their owner.",
      facts: ["Told by Abu Dharr", "On the Day of Resurrection", "Until the judging ends"],
      source: hadith("bukhari", "1460", "Abu Dharr", "Sahih", "The Prophet ﷺ swore by Allah and said: whoever had camels, cows or sheep and did not pay their zakat, they will be brought on the Day of Resurrection bigger and fatter than they were, trampling him with their hooves and butting him with their horns. When the last has passed, the first comes back, until Allah finishes judging between the people.", "they will tread him under their hooves, and will butt him with their horns"),
      difficulty: 4,
      questions: [
        { q: "Which animals did he ﷺ name in this hadith?", a: "Camels, cows and sheep", wrong: ["Horses and mules", "Only camels", "Goats and chickens"], why: "Whoever had camels or cows or sheep and did not pay their zakat, he ﷺ said." },
        { q: "How will the animals come on that Day?", a: "Bigger and fatter than before", wrong: ["Thin and weak", "Smaller than before", "Without horns"], why: "They will be brought far bigger and fatter than before, he ﷺ said." },
        { q: "That goes on until Allah finishes judging people.", tf: true, why: "This punishment will go on till Allah has finished the judgments amongst the people." }
      ]
    },
    {
      slug: "no-miser",
      title: "No miser",
      line: "Umar asked about a gift; he ﷺ said: I am no miser.",
      facts: ["Told by Umar ibn al-Khattab", "Umar thought others deserved more", "Two choices were left to him ﷺ"],
      source: hadith("muslim", "1056", "Umar ibn al-Khattab", "Sahih", "Umar said: the Messenger of Allah ﷺ shared something out, and I said: by Allah, others deserved it more than these. He said: they left me no choice but that they would ask me rudely, or call me a miser; and I am not a miser.", "they would regard me as a miser, but I am not a miser"),
      difficulty: 5,
      questions: [
        { q: "Who said others deserved the gift more?", a: "Umar ibn al-Khattab", wrong: ["Abu Bakr", "Uthman", "Ali"], why: "Umar said: Messenger of Allah, the others were more deserving than these." },
        { q: "Unless he gave, what would those men call him ﷺ?", a: "A miser", wrong: ["A ruler", "A poet", "A stranger"], why: "They would regard me as a miser, but I am not a miser, he ﷺ said." },
        { q: "He ﷺ said he is not a miser.", tf: true, why: "They would regard me as a miser, but I am not a miser, he ﷺ said." }
      ]
    }
  ]
};

export const ZAKAT_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
