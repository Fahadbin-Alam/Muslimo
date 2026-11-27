import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Clean and pure in more depth" lessons (puritySahihaynUnits.ts): the lesson's own question is
 * Easy, then Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps
 * the question's answer and its hadith; a true/false version keeps the same truth.
 */
export const PURITY_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 214.
  "How often did he ﷺ make wudu, Anas said?": {
    answer: "For every prayer",
    harder: ["Bukhari 214: how often did he ﷺ make wudu?", "Once a day", "Once a week", "Only for Fajr"],
    expert: ["Amr ibn Amir asked Anas. How often did he ﷺ make wudu?", "Only after sleep", "Only for Jumu'ah", "Twice a day"],
    superHard: ["Kana yatawadda'u 'inda kulli salah: when did he ﷺ make wudu?", "Only at night", "Only for Maghrib", "Every third prayer"],
    extreme: ["In Bukhari 214, before Anas told what the Companions did, how often did he ﷺ make wudu?", "Before Fajr and Isha only", "Only on journeys", "Only after eating"]
  },
  "What did the Companions do, Anas said?": {
    answer: "Prayed with one wudu until it broke",
    harder: ["Bukhari 214: what did the Companions do with their wudu?", "Made wudu twice each time", "Never made wudu at home", "Prayed only once a day"],
    expert: ["Anas was asked: what did you do? What did he answer?", "Made a new wudu each hour", "Washed only their hands", "Made wudu only for Fajr"],
    superHard: ["Yujzi' ahadana al-wudu' ma lam yuhdith: what did they do?", "Bathed before each prayer", "Prayed without any wudu", "Made wudu after praying"],
    extreme: ["In Bukhari 214, unlike his ﷺ way, what did Anas say the Companions did?", "Made wudu three times a prayer", "Waited for rain to wash", "Kept wudu only on Fridays"]
  },
  "The Companions prayed with the same wudu until it was broken.": {
    answer: "True",
    harder: "Bukhari 214: the Companions prayed with one wudu until something broke it.",
    expert: "Anas said they kept the same wudu for more than one prayer, until it was broken.",
    superHard: "Anas: yujzi' ahadana al-wudu' until he breaks it.",
    extreme: "In Bukhari 214, Anas tells first of his ﷺ wudu for every prayer, then that the Companions kept one wudu until it broke."
  },
  // Sahih al-Bukhari 201.
  "How much water did he ﷺ use for wudu?": {
    answer: "One mudd",
    harder: ["Bukhari 201: how much water did he ﷺ use for wudu?", "A full bucket", "Ten sa'", "A whole tank"],
    expert: ["Anas: what measure of water was enough for his ﷺ wudu?", "Three sa'", "Half a camel skin", "A full well"],
    superHard: ["Yatawadda'u bil-mudd: how much was his ﷺ wudu water?", "Two buckets", "A big jar", "Seven sa'"],
    extreme: ["In Bukhari 201, smaller than his ﷺ bath water, what was his wudu water?", "Five sa'", "A large tub", "A tank of rain"]
  },
  "How much water did he ﷺ use for a bath?": {
    answer: "One sa' up to five mudds",
    harder: ["Bukhari 201: how much water did he ﷺ bathe with?", "Ten full buckets", "A running river", "Only one cup"],
    expert: ["Anas: what was enough for his ﷺ bath?", "Twenty sa'", "Half a mudd", "A whole well"],
    superHard: ["Yaghtasilu bis-sa' ila khamsati amdad: his ﷺ bath water?", "One mudd only", "Seven sa'", "Ten waterskins"],
    extreme: ["In Bukhari 201, beside one mudd for wudu, how much did he ﷺ bathe with?", "Two mudds only", "A full pool", "Ten sa' or more"]
  },
  "He ﷺ used a great deal of water for every wudu.": {
    answer: "False",
    harder: "Bukhari 201: he ﷺ needed a great deal of water for each wudu.",
    expert: "Anas said his ﷺ wudu took many sa' of water.",
    superHard: "Yatawadda'u bil-mudd means he ﷺ used many buckets for wudu.",
    extreme: "In Bukhari 201, Anas says his ﷺ wudu water was more than his bath water."
  },
  // Sahih al-Bukhari 244.
  "What did Abu Musa see in his ﷺ hand?": {
    answer: "A siwak",
    harder: ["Bukhari 244: what did Abu Musa see in his ﷺ hand?", "A sword", "A pen", "A cup of milk"],
    expert: ["Abu Burdah from his father: he ﷺ held what in his hand?", "A ring", "A bow", "A letter"],
    superHard: ["Yastannu bi-siwakin bi-yadihi: what was in his ﷺ hand?", "A comb", "A staff", "A bowl"],
    extreme: ["In Bukhari 244, what was in his ﷺ hand and then in his mouth?", "A date", "A spoon", "A twig of basil"]
  },
  "What sound did he ﷺ make with the siwak, Abu Musa said?": {
    answer: "U' u'",
    harder: ["Bukhari 244: what sound did he ﷺ make with the siwak?", "Allahu akbar", "A loud whistle", "No sound at all"],
    expert: ["Abu Musa: he ﷺ said something as if retching. What?", "Subhan Allah", "Ah ah", "Labbayk"],
    superHard: ["Yaqulu u' u' ka'annahu yatahawwa': what did he ﷺ say?", "Hmm hmm", "Ya Allah", "Bismillah"],
    extreme: ["In Bukhari 244, with the siwak in his mouth, what did he ﷺ say?", "Ameen", "Alhamdulillah", "Hush hush"]
  },
  "He ﷺ used the siwak deep in his mouth.": {
    answer: "True",
    harder: "Bukhari 244: he ﷺ used the siwak so deeply he sounded as if retching.",
    expert: "Abu Musa heard him ﷺ say u' u' with the siwak in his mouth.",
    superHard: "Ka'annahu yatahawwa': he ﷺ cleaned his mouth deeply with the siwak.",
    extreme: "In Bukhari 244, Abu Burdah tells from his father that the siwak was in his ﷺ mouth while he said u' u'."
  },
  // Sahih al-Bukhari 208.
  "What was he ﷺ eating when called to prayer?": {
    answer: "Cooked mutton",
    harder: ["Bukhari 208: what was he ﷺ eating when called to prayer?", "Bread and vinegar", "Fresh dates", "Barley soup"],
    expert: ["Amr ibn Umayyah saw him ﷺ cut what from the shoulder?", "Roast camel", "Cheese", "Fried fish"],
    superHard: ["Yahtazzu min katifi shah: what was he ﷺ eating?", "Chicken", "Honey cake", "Lentils"],
    extreme: ["In Bukhari 208, from the shoulder, what was he ﷺ cutting before prayer?", "Grilled beef", "Dried figs", "Boiled eggs"]
  },
  "What did he ﷺ put down when called to prayer?": {
    answer: "His knife",
    harder: ["Bukhari 208: what did he ﷺ put down for the prayer?", "His sandals", "His turban", "His staff"],
    expert: ["Amr ibn Umayyah: on hearing the call, he ﷺ laid down what?", "His cup", "His bow", "His cloak"],
    superHard: ["Fa-alqa as-sikkin: what did he ﷺ put down?", "His ring", "His siwak", "His shield"],
    extreme: ["In Bukhari 208, called to prayer while eating, what did he ﷺ put down?", "His plate", "His sword", "His waterskin"]
  },
  "After eating the mutton, he ﷺ made a new wudu before praying.": {
    answer: "False",
    harder: "Bukhari 208: he ﷺ repeated his wudu after the mutton.",
    expert: "Amr ibn Umayyah said he ﷺ made wudu again before that prayer.",
    superHard: "Thumma salla wa lam yatawadda' means he ﷺ made a new wudu.",
    extreme: "In Bukhari 208, after putting the knife down, he ﷺ washed for a new wudu and then prayed."
  },
  // Sahih al-Bukhari 235.
  "What had fallen into the ghee?": {
    answer: "A mouse",
    harder: ["Bukhari 235: what had fallen into the ghee?", "A bird", "A coin", "A stone"],
    expert: ["Maymunah: he ﷺ was asked about ghee with what in it?", "A lizard", "A fly", "A ring"],
    superHard: ["Fa'ratun saqatat fi samn: what fell in?", "A frog", "A bee", "A spider"],
    extreme: ["In Bukhari 235, what was to be taken out of the ghee first?", "A beetle", "A key", "A feather"]
  },
  "What should be thrown away with the mouse?": {
    answer: "The ghee around it",
    harder: ["Bukhari 235: what should be thrown away with the mouse?", "All of the ghee", "The whole pot", "Nothing at all"],
    expert: ["Maymunah: after taking out the mouse, what is thrown away?", "Half the pot", "The lid only", "The spoon used"],
    superHard: ["Alquha wa ma hawlaha: what is thrown away with it?", "The top layer only", "All food in the house", "The bottom of the pot"],
    extreme: ["In Bukhari 235, besides the mouse, what is to be thrown out?", "Every jar nearby", "The whole kitchen's ghee", "None, just wash it"]
  },
  "He ﷺ said the rest of the ghee could be used.": {
    answer: "True",
    harder: "Bukhari 235: he ﷺ said to use the rest of the ghee.",
    expert: "Maymunah said only the mouse and what was around it were thrown away.",
    superHard: "Wa kulu samnakum: the rest of the ghee may be used.",
    extreme: "In Bukhari 235, after the mouse and the ghee around it are taken out, he ﷺ said to use the rest."
  },
  // Sahih al-Bukhari 337.
  "Where did he ﷺ wipe dust from before answering?": {
    answer: "A wall",
    harder: ["Bukhari 337: where did he ﷺ get the dust for tayammum?", "A rock in a river", "The floor of the mosque", "His saddle"],
    expert: ["Abu Juhaym: coming from Bi'r Jamal, he ﷺ went to what?", "A tree", "A well", "A tent"],
    superHard: ["Aqbala 'ala al-jidar: where did he ﷺ go?", "A sand dune", "A cave", "A palm trunk"],
    extreme: ["In Bukhari 337, before he ﷺ answered the man, he went to what?", "A stone bench", "A spring", "A doorway"]
  },
  "What did he ﷺ wipe with the dust?": {
    answer: "His face and hands",
    harder: ["Bukhari 337: what did he ﷺ wipe with the dust?", "His feet only", "His head and ears", "His whole body"],
    expert: ["Abu Juhaym: after touching the wall, he ﷺ wiped what?", "His arms to the elbows", "His beard only", "His neck"],
    superHard: ["Fa-masaha bi-wajhihi wa yadayh: what did he ﷺ wipe?", "His knees", "His chest", "His sandals"],
    extreme: ["In Bukhari 337, the tayammum before the greeting was on which parts?", "Hands and feet", "Face and head", "Arms and shins"]
  },
  "He ﷺ answered the man's greeting only after the tayammum.": {
    answer: "True",
    harder: "Bukhari 337: he ﷺ waited to answer the greeting until after tayammum.",
    expert: "Abu Juhaym said he ﷺ wiped his face and hands with dust from a wall, then answered.",
    superHard: "Thumma radda 'alayhi as-salam: after the tayammum, he ﷺ answered.",
    extreme: "In Bukhari 337, near Bi'r Jamal, the man's salam was answered only once he ﷺ had wiped with the wall's dust."
  },
  // Sahih al-Bukhari 283.
  "Where did Abu Hurayrah meet him ﷺ?": {
    answer: "A street of Madinah",
    harder: ["Bukhari 283: where did Abu Hurayrah meet him ﷺ?", "Inside the Ka'bah", "On Mount Uhud", "At the market of Makkah"],
    expert: ["Abu Hurayrah slipped away to bathe after meeting him ﷺ where?", "At the well of Ruma", "In the camp at Khaybar", "At Quba"],
    superHard: ["Laqiyahu fi ba'di turuqi al-Madinah: where?", "At Arafah", "In Ta'if", "At Badr"],
    extreme: ["In Bukhari 283, the meeting that ended with Subhan Allah was where?", "At the mosque door", "In the date groves", "Beside Mount Sal'"]
  },
  "What did he ﷺ say first when Abu Hurayrah explained?": {
    answer: "Subhan Allah",
    harder: ["Bukhari 283: what did he ﷺ say first to Abu Hurayrah?", "Alhamdulillah", "Astaghfirullah", "Insha Allah"],
    expert: ["Abu Hurayrah said he slipped away to bathe. His ﷺ first word?", "Allahu akbar", "La hawla", "Masha Allah"],
    superHard: ["Before inna al-mu'mina la yanjus, what did he ﷺ say?", "Bismillah", "Ya Aba Hurayrah", "Barak Allah"],
    extreme: ["In Bukhari 283, what words came right before: a believer never becomes impure?", "Wallahi", "Jazak Allah", "Innalillah"]
  },
  "He ﷺ told Abu Hurayrah that a believer can become impure.": {
    answer: "False",
    harder: "Bukhari 283: he ﷺ said a believer becomes impure.",
    expert: "Abu Hurayrah was told he was right not to sit with him ﷺ.",
    superHard: "Inna al-mu'mina yanjus: so he ﷺ said.",
    extreme: "In Bukhari 283, after Subhan Allah, he ﷺ told Abu Hurayrah that a believer does become impure."
  }
};
