import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Clean and pure batch: seven hadith on wudu, water, the
// siwak and tayammum that were not taught yet, each with its exact English words to highlight. Every question also
// has Medium, Hard, Super hard and Extremely hard versions (src/data/tiers/puritySahihaynTiers.ts).

const DEEPER: DeepUnit = {
  key: "sahihayn-purity",
  topicId: "foundation",
  branchId: "foundation-sahihayn-deeper",
  branch: { title: "Clean and pure in more depth", description: "From Bukhari, easy to hard: wudu for every prayer, a little water, the siwak, food and wudu, the mouse in the ghee, tayammum on a wall, and the believer who is never impure." },
  name: "the deeper purity lessons",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "wudu-for-every-prayer",
      title: "Wudu for every prayer",
      line: "He ﷺ made a fresh wudu for every prayer.",
      facts: ["Told by Anas ibn Malik", "The Companions kept one wudu for many prayers", "Until something broke it"],
      source: hadith("bukhari", "214", "Anas ibn Malik", "Sahih", "Anas said: the Prophet ﷺ used to make wudu for every prayer. He was asked: what did you do? He said: we used to pray with the same wudu until something broke it.", "used to perform ablution for every prayer"),
      difficulty: 1,
      questions: [
        { q: "How often did he ﷺ make wudu, Anas said?", a: "For every prayer", wrong: ["Once a day", "Once a week", "Only for Fajr"], why: "The Prophet ﷺ used to perform ablution for every prayer, Anas said." },
        { q: "What did the Companions do, Anas said?", a: "Prayed with one wudu until it broke", wrong: ["Made wudu twice each time", "Never made wudu at home", "Prayed only once a day"], why: "We used to pray with the same ablution until we break it, Anas replied." },
        { q: "The Companions prayed with the same wudu until it was broken.", tf: true, why: "We used to pray with the same ablution until we break it with Hadath, Anas said." }
      ]
    },
    {
      slug: "a-little-water",
      title: "A little water is enough",
      line: "One small mudd of water was enough for his wudu ﷺ.",
      facts: ["Told by Anas ibn Malik", "A mudd is two hands cupped together", "A sa' is four mudds"],
      source: hadith("bukhari", "201", "Anas ibn Malik", "Sahih", "Anas said: the Prophet ﷺ used to bathe with one sa' up to five mudds of water, and he used to make wudu with one mudd.", "used to perform ablution with one Mudd of water"),
      difficulty: 2,
      questions: [
        { q: "How much water did he ﷺ use for wudu?", a: "One mudd", wrong: ["A full bucket", "Ten sa'", "A whole tank"], why: "He ﷺ used to perform ablution with one Mudd of water, Anas said." },
        { q: "How much water did he ﷺ use for a bath?", a: "One sa' up to five mudds", wrong: ["Ten full buckets", "A running river", "Only one cup"], why: "He ﷺ used to take a bath with one Sa' up to five Mudds of water." },
        { q: "He ﷺ used a great deal of water for every wudu.", tf: false, why: "He ﷺ used to perform ablution with one Mudd of water, Anas said." }
      ]
    },
    {
      slug: "the-siwak-in-his-hand",
      title: "The siwak in his hand",
      line: "Abu Musa found him ﷺ cleaning his teeth well with a siwak.",
      facts: ["Told by Abu Musa al-Ash'ari", "The siwak is a cleaning stick", "He ﷺ cleaned his teeth deeply"],
      source: hadith("bukhari", "244", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa said: I came to the Prophet ﷺ and found him with a siwak in his hand, cleaning his teeth and saying u' u', as if he was retching, while the siwak was in his mouth.", "as if he was retching"),
      difficulty: 2,
      questions: [
        { q: "What did Abu Musa see in his ﷺ hand?", a: "A siwak", wrong: ["A sword", "A pen", "A cup of milk"], why: "I saw him carrying a Siwak in his hand and cleansing his teeth, Abu Musa said." },
        { q: "What sound did he ﷺ make with the siwak, Abu Musa said?", a: "U' u'", wrong: ["Allahu akbar", "A loud whistle", "No sound at all"], why: "Saying U' U', as if he was retching, while the Siwak was in his mouth." },
        { q: "He ﷺ used the siwak deep in his mouth.", tf: true, why: "Saying U' U', as if he was retching, while the Siwak was in his mouth." }
      ]
    },
    {
      slug: "knife-down-for-prayer",
      title: "Knife down for prayer",
      line: "Called to prayer, he ﷺ put his knife down and prayed.",
      facts: ["Told by Amr ibn Umayyah ad-Damri", "He ﷺ was eating cooked mutton", "He prayed without a new wudu"],
      source: hadith("bukhari", "208", "Amr ibn Umayyah ad-Damri", "Sahih", "Amr ibn Umayyah said: I saw the Messenger of Allah ﷺ cutting a piece of mutton from the shoulder. Then he was called to prayer, so he put his knife down and prayed without making wudu again.", "He put his knife down and prayed without repeating ablution"),
      difficulty: 3,
      questions: [
        { q: "What was he ﷺ eating when called to prayer?", a: "Cooked mutton", wrong: ["Bread and vinegar", "Fresh dates", "Barley soup"], why: "Taking a piece of cooked mutton from the shoulder region, then he was called for prayer." },
        { q: "What did he ﷺ put down when called to prayer?", a: "His knife", wrong: ["His sandals", "His turban", "His staff"], why: "He put his knife down and prayed without repeating ablution." },
        { q: "After eating the mutton, he ﷺ made a new wudu before praying.", tf: false, why: "He put his knife down and prayed without repeating ablution." }
      ]
    },
    {
      slug: "the-mouse-in-the-ghee",
      title: "The mouse in the ghee",
      line: "A mouse fell in ghee: take it out, and what touched it.",
      facts: ["Told by Maymunah, Mother of the Believers", "Ghee is cooking butter", "The rest of the ghee was used"],
      source: hadith("bukhari", "235", "Maymunah", "Sahih", "Maymunah said: the Messenger of Allah ﷺ was asked about ghee that a mouse had fallen into. He said: take out the mouse and throw away the ghee around it, and use the rest.", "Take out the mouse and throw away the ghee around it"),
      difficulty: 3,
      questions: [
        { q: "What had fallen into the ghee?", a: "A mouse", wrong: ["A bird", "A coin", "A stone"], why: "He ﷺ was asked regarding ghee in which a mouse had fallen." },
        { q: "What should be thrown away with the mouse?", a: "The ghee around it", wrong: ["All of the ghee", "The whole pot", "Nothing at all"], why: "Take out the mouse and throw away the ghee around it, he ﷺ said." },
        { q: "He ﷺ said the rest of the ghee could be used.", tf: true, why: "Throw away the ghee around it and use the rest, he ﷺ said." }
      ]
    },
    {
      slug: "tayammum-on-a-wall",
      title: "Tayammum on a wall",
      line: "Before answering a greeting, he ﷺ did tayammum on a wall.",
      facts: ["Told by Abu Juhaym al-Ansari", "He ﷺ was coming from Bi'r Jamal", "He wiped his face and hands with dust"],
      source: hadith("bukhari", "337", "Abu Juhaym al-Ansari", "Sahih", "The Prophet ﷺ came from the direction of Bi'r Jamal. A man met him and greeted him, but he did not answer until he went to a wall, wiped his face and hands with its dust, and then answered the greeting.", "wiped his face and hands with its dust"),
      difficulty: 4,
      questions: [
        { q: "Where did he ﷺ wipe dust from before answering?", a: "A wall", wrong: ["A rock in a river", "The floor of the mosque", "His saddle"], why: "He went to a mud wall and wiped his face and hands with its dust." },
        { q: "What did he ﷺ wipe with the dust?", a: "His face and hands", wrong: ["His feet only", "His head and ears", "His whole body"], why: "He wiped his face and hands with its dust and then returned back the greeting." },
        { q: "He ﷺ answered the man's greeting only after the tayammum.", tf: true, why: "He did not return back the greeting till he went to a wall and wiped his face and hands with its dust." }
      ]
    },
    {
      slug: "never-impure",
      title: "A believer is never impure",
      line: "Abu Hurayrah slipped away to bathe; a believer is never impure.",
      facts: ["Told by Abu Hurayrah", "They met in a street of Madinah", "He ﷺ said: Subhan Allah"],
      source: hadith("bukhari", "283", "Abu Hurayrah", "Sahih", "The Prophet ﷺ met me in a street of Madinah while I needed a bath, so I slipped away and bathed. When I came back he asked: where were you, Abu Hurayrah? I said: I needed a bath and did not like to sit with you so. He said: Subhan Allah! A believer never becomes impure.", "A believer never becomes impure"),
      difficulty: 5,
      questions: [
        { q: "Where did Abu Hurayrah meet him ﷺ?", a: "A street of Madinah", wrong: ["Inside the Ka'bah", "On Mount Uhud", "At the market of Makkah"], why: "The Prophet ﷺ came across me in one of the streets of Medina, Abu Hurayrah said." },
        { q: "What did he ﷺ say first when Abu Hurayrah explained?", a: "Subhan Allah", wrong: ["Alhamdulillah", "Astaghfirullah", "Insha Allah"], why: "The Prophet ﷺ said: Subhan Allah! A believer never becomes impure." },
        { q: "He ﷺ told Abu Hurayrah that a believer can become impure.", tf: false, why: "Subhan Allah! A believer never becomes impure, he ﷺ said." }
      ]
    }
  ]
};

export const PURITY_SAHIHAYN_UNITS: readonly DeepUnit[] = [DEEPER];
