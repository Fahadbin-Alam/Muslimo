import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Du'as in more depth" lessons (duaSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const DUA_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih Muslim 2724.
  "Who gave His army the honour of victory, in this du'a?": {
    answer: "Allah alone",
    harder: ["Muslim 2724: who honoured His army, he ﷺ used to say?", "The strongest tribe", "The army itself", "The richest men"],
    expert: ["Abu Hurairah: a'azza jundahu. Who honoured His army?", "The best riders", "The allies", "The leaders of Makkah"],
    superHard: ["Wahdahu, a'azza jundah: who is meant?", "The general", "The angels alone", "The poets"],
    extreme: ["In Muslim 2724, the victory is given to His army by whom?", "By their numbers", "By their weapons", "By the weather"]
  },
  "What did Allah do to the clans, in this du'a?": {
    answer: "He routed them",
    harder: ["Muslim 2724: what happened to the clans, in this du'a?", "He joined them", "He gave them gold", "He made them kings"],
    expert: ["Abu Hurairah: helped His servant and did what to the clans?", "Made peace with them", "Gave them land", "Left them alone"],
    superHard: ["Ghalaba al-ahzaba wahdah: what did He do to the ahzab?", "Taught them", "Fed them", "Forgave them all"],
    extreme: ["In Muslim 2724, the clans, al-ahzab, met what end by Allah alone?", "They won", "They grew strong", "They ruled Madinah"]
  },
  "These words of praise end: there is nothing after Him.": {
    answer: "True",
    harder: "Muslim 2724: the du'a ends with the words: there is nothing after Him.",
    expert: "Abu Hurairah reported that he ﷺ ended this praise with: nothing comes after Him.",
    superHard: "Fala shay'a ba'dah: so this du'a of victory ends.",
    extreme: "In Muslim 2724, the last words after routing the clans are: there is nothing after Him."
  },
  // Sahih Muslim 2718.
  "When did he ﷺ say this du'a?": {
    answer: "On a journey, near dawn",
    harder: ["Muslim 2718: at what time did he ﷺ say: a listener has heard?", "At a wedding", "On Eid only", "After every meal"],
    expert: ["Abu Hurairah: kana fi safarin wa ashar. When was that?", "At noon at home", "At sunset in the masjid", "At night in Makkah"],
    superHard: ["Asara: what time does it point to, on his ﷺ journey?", "Midday", "Late afternoon", "Evening"],
    extreme: ["In Muslim 2718, the du'a belongs to which moment?", "The return home", "The Friday khutbah", "The end of Ramadan"]
  },
  "What does he ﷺ seek refuge from at the end?": {
    answer: "The Fire",
    harder: ["Muslim 2718: the journey du'a ends with refuge from what?", "Poverty", "The cold", "Wild animals"],
    expert: ["Abu Hurairah: a'idhan billahi min what?", "From robbers", "From hunger", "From storms"],
    superHard: ["Min an-nar: what does he ﷺ seek refuge from?", "From sickness", "From debt", "From enemies"],
    extreme: ["In Muslim 2718, the last refuge sought is from what?", "From the sea", "From the desert", "From the night"]
  },
  "In this du'a he ﷺ asked Allah to be with them.": {
    answer: "True",
    harder: "Muslim 2718: Our Lord, be with us, he ﷺ said in the journey du'a.",
    expert: "Abu Hurairah reported that he ﷺ asked Allah to accompany them and grant them His favour.",
    superHard: "Rabbana sahibna: so he ﷺ asked Allah to be with them.",
    extreme: "In Muslim 2718, he ﷺ asked Allah to accompany and favour them on the journey."
  },
  // Sahih Muslim 2712.
  "When is this du'a of Ibn Umar said?": {
    answer: "When going to bed",
    harder: ["Muslim 2712: when did Ibn Umar tell the man to say this du'a?", "When waking up", "When entering the masjid", "When eating"],
    expert: ["Ibn Umar: say, You created my soul. At what time?", "When leaving home", "When riding", "When it rains"],
    superHard: ["Idha akhadha madja'ah: when is the du'a said?", "When fasting", "When travelling", "When greeting"],
    extreme: ["In Muslim 2712, the du'a about the soul is said at what time?", "At the start of prayer", "At a funeral", "At Eid"]
  },
  "What does the du'a ask for at the very end?": {
    answer: "Well-being",
    harder: ["Muslim 2712: the bedtime du'a ends by asking for what?", "Riches", "A long sleep", "Good dreams"],
    expert: ["Ibn Umar: O Allah, I ask You for what, at the end?", "For a house", "For children", "For fame"],
    superHard: ["As'aluka al-afiyah: what is asked for?", "Knowledge", "Rain", "Victory"],
    extreme: ["In Muslim 2712, after asking for protection and forgiveness, the du'a asks for what?", "A good trade", "A fast horse", "A big meal"]
  },
  "Ibn Umar said he heard it from Umar.": {
    answer: "False",
    harder: "Muslim 2712: Ibn Umar said the bedtime du'a came from his father Umar.",
    expert: "Asked about the du'a, Ibn Umar said: I heard it from Umar.",
    superHard: "Min khayrin min Umar means he heard it from Umar himself.",
    extreme: "In Muslim 2712, the source of the du'a that Ibn Umar named was Umar."
  },
  // Sahih al-Bukhari 6337.
  "What did Ibn Abbas say to avoid in du'a?": {
    answer: "Rhymed prose",
    harder: ["Bukhari 6337: what did Ibn Abbas tell Ikrimah to avoid in du'a?", "Arabic words", "Raising the hands", "Asking for Paradise"],
    expert: ["Ibn Abbas: the Prophet ﷺ and his Companions always avoided what in du'a?", "Asking twice", "Saying amin", "Crying"],
    superHard: ["As-saj' min ad-du'a: what is to be avoided?", "Long du'as", "Du'a in groups", "Du'a at night"],
    extreme: ["In Bukhari 6337, the one thing in du'a they always kept away from was what?", "Praise of Allah", "Salawat on him ﷺ", "Asking forgiveness"]
  },
  "How often did Ibn Abbas advise reminding people?": {
    answer: "Once a week, at most three times",
    harder: ["Bukhari 6337: how often should people be reminded, Ibn Abbas said?", "Every hour", "Every night", "Once a year"],
    expert: ["Ibn Abbas: do not make people tired of this Quran. So remind them how often?", "Every day twice", "Five times a day", "Never"],
    superHard: ["Kulla jumu'ah marrah: how often is the reminder?", "Every month", "Every Ramadan", "Every morning"],
    extreme: ["In Bukhari 6337, the most Ibn Abbas allowed for reminders was what?", "Ten times a week", "Seven times a week", "Once a day"]
  },
  "Ibn Abbas said to cut into people's talk to preach.": {
    answer: "False",
    harder: "Bukhari 6337: Ibn Abbas said to stop people mid-talk and preach to them.",
    expert: "Ikrimah reported that Ibn Abbas told him to interrupt people's talk with reminders.",
    superHard: "Fa-taqta'u alayhim hadithahum was what Ibn Abbas told him to do.",
    extreme: "In Bukhari 6337, the advice was to preach even when people are busy talking."
  }
};
