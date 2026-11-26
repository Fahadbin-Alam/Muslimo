import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into faith" lessons (aqidahSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const AQIDAH_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 6494.
  "Who asked him ﷺ who the best of people is?": {
    answer: "A bedouin",
    harder: ["Bukhari 6494: who came asking who the best of mankind is?", "Umar", "A rabbi", "A trader from Syria"],
    expert: ["The question that led to the man in the mountain pass came from whom?", "Abu Bakr", "A king's messenger", "A young boy"],
    superHard: ["Abu Sa'id told of a question about the best of people. Who asked it?", "Bilal", "A woman of the Ansar", "A man of Quraysh"],
    extreme: ["In Bukhari 6494, the one who asked who is best of mankind was what kind of man?", "A poet of Makkah", "A Christian monk", "A chief of Thaqif"]
  },
  "With what does the first man strive in Allah's cause?": {
    answer: "His life and his wealth",
    harder: ["Bukhari 6494: the best of people strives in Allah's cause with what?", "His words only", "His sons", "His tribe"],
    expert: ["Abu Sa'id: the first of the two best men gives what for Allah's cause?", "His land only", "His camels only", "His sword only"],
    superHard: ["Before the man in the mountain pass, he ﷺ named a man who strives with what?", "His tongue and pen", "His time only", "His prayers"],
    extreme: ["Bi nafsihi wa malihi: with what does the first best man strive?", "His knowledge and books", "His family and friends", "His house and farm"]
  },
  "The second man keeps people safe from his harm.": {
    answer: "True",
    harder: "Bukhari 6494: the man alone in a mountain pass worships his Lord and saves people from his evil.",
    expert: "Abu Sa'id said the second best man keeps the people safe from his harm.",
    superHard: "In the hadith of the best of people, the man in the mountain pass leaves people safe from himself.",
    extreme: "Bukhari 6494 praises a man in a mountain path who worships and spares people his evil."
  },
  // Sahih Muslim 67.
  "Which is one of the two, he ﷺ said?": {
    answer: "Attacking someone's family line",
    harder: ["Muslim 67: two things among people are unbelief. Which is one?", "Eating with the left hand", "Sleeping late", "Walking fast"],
    expert: ["Alongside wailing over the dead, what else did he ﷺ call unbelief?", "Breaking a promise", "Talking loudly", "Leaving the masjid early"],
    superHard: ["At-ta'nu fin-nasab is one of two acts in Muslim 67. What is it?", "Boasting of wealth", "Cursing the weather", "Refusing a guest"],
    extreme: ["Abu Hurairah told of two acts of unbelief. Besides an-niyahah, what is the other?", "Swearing by fathers", "Wearing silk", "Hiding the zakat"]
  },
  "What is the other one?": {
    answer: "Wailing over the dead",
    harder: ["Muslim 67: besides attacking a family line, what is the other act of unbelief?", "Crying quietly", "Visiting graves", "Praying for the dead"],
    expert: ["Slandering one's lineage is one. What did he ﷺ name with it?", "Leaving a funeral early", "Burying at night", "Washing the dead"],
    superHard: ["An-niyahah is the second act in Muslim 67. What is it?", "Fasting for the dead", "Giving charity for the dead", "Reading Quran at a grave"],
    extreme: ["Abu Hurairah's hadith of two acts names lamentation on whom?", "On the lost wealth", "On the sick", "On the traveller"]
  },
  "He ﷺ said these two are found among people.": {
    answer: "True",
    harder: "Muslim 67: two things found among people are acts of unbelief.",
    expert: "He ﷺ said slandering lineage and wailing over the dead are both found among people.",
    superHard: "Abu Hurairah said the two acts of unbelief in his hadith are found among people.",
    extreme: "Ithnatani fin-nasi huma bihim kufr: two things in people are unbelief, he ﷺ said."
  },
  // Sahih al-Bukhari 6766.
  "What is forbidden for one who knowingly claims another father?": {
    answer: "Paradise",
    harder: ["Bukhari 6766: one who knowingly claims a false father is barred from what?", "Fasting", "Hajj", "Charity"],
    expert: ["Sa'd heard of a man who claims a father not his own, knowing it. What is forbidden to him?", "The masjid", "Marriage", "Inheritance"],
    superHard: ["Abu Bakrah confirmed it: for one who claims another father knowingly, what is haram?", "Leading prayer", "Giving witness", "Reading Quran"],
    extreme: ["Al-jannatu alayhi haram: in Bukhari 6766, what is forbidden for him?", "The Pool", "Intercession", "The shade of the Throne"]
  },
  "Who said: my ears heard it and my heart kept it?": {
    answer: "Abu Bakrah",
    harder: ["Bukhari 6766: Sa'd told the hadith to whom, who said he heard it too?", "Abu Hurairah", "Anas", "Ibn Umar"],
    expert: ["Who confirmed Sa'd's hadith of the false father with his ears and heart?", "Abu Dharr", "Jabir", "Ibn Abbas"],
    superHard: ["Sami'athu udhunaya wa wa'ahu qalbi: who said it about the false father hadith?", "Abu Musa", "Salman", "Mu'adh"],
    extreme: ["Sa'd ibn Abi Waqqas mentioned it to a Companion who heard it himself. Who?", "Abu Ayyub", "Ubayy ibn Ka'b", "Abu Sa'id"]
  },
  "The warning is for one who knows the man is not his father.": {
    answer: "True",
    harder: "Bukhari 6766: the warning is for one who claims another father while knowing he is not his father.",
    expert: "Sa'd's hadith says: and he knows that person is not his father.",
    superHard: "Paradise is forbidden in Bukhari 6766 for the one who knows the truth and claims otherwise.",
    extreme: "Wa huwa ya'lamu: the false father hadith is about one who knowingly claims him."
  },
  // Sahih al-Bukhari 92.
  "Why did he ﷺ become angry?": {
    answer: "People kept asking things he disliked",
    harder: ["Bukhari 92: what made him ﷺ angry before he said: ask me anything?", "Someone stole from him", "The prayer was late", "A man insulted Islam"],
    expert: ["Abu Musa: he ﷺ said ask me anything you like. What had come before?", "A delegation left", "A man broke a promise", "The rain did not come"],
    superHard: ["The questions about fathers came after his ﷺ anger. What caused the anger?", "Arguing about the Quran", "A fight in the masjid", "Bad news from a battle"],
    extreme: ["Su'ila an ashya'a karihaha: in Bukhari 92, why was he ﷺ angry?", "A slave ran away", "The food was spoiled", "A tribe broke a treaty"]
  },
  "What did he ﷺ tell the first man about his father?": {
    answer: "Your father is Hudhafah",
    harder: ["Bukhari 92: a man asked: who is my father? What was the reply?", "Your father is Salim", "Your father is unknown", "Ask your mother"],
    expert: ["Abu Musa: the first man to ask who his father was heard what name?", "Your father is Shaybah", "Your father is Abdullah", "Your father is Qays"],
    superHard: ["Salim, freed slave of Shaybah, was the second answer. What was the first?", "Your father is Zayd", "Your father is Umayyah", "Your father is Harithah"],
    extreme: ["Bukhari 92: two men asked who their fathers were. What was the first reply?", "Your father is Amir", "Your father is Rabi'ah", "Your father is Khalid"]
  },
  "Umar saw the anger and said: we turn to Allah in repentance.": {
    answer: "True",
    harder: "Bukhari 92: seeing anger in his ﷺ face, Umar said: we repent to Allah.",
    expert: "After the questions about fathers, Umar said: Messenger of Allah, we turn to Allah.",
    superHard: "Abu Musa said Umar spoke of repentance to Allah when he saw his ﷺ anger.",
    extreme: "Inna natubu ilallah: Umar said it on seeing his ﷺ face after the questions."
  },
  // Sahih al-Bukhari 6105.
  "What did he ﷺ say cursing a believer is like?": {
    answer: "Killing him",
    harder: ["Bukhari 6105: cursing a believer is like what?", "Hitting him", "Stealing from him", "Lying to him"],
    expert: ["Thabit ibn ad-Dahhak: la'nul-mu'min is likened to what?", "Ignoring him", "Mocking him", "Cheating him"],
    superHard: ["Words can be heavy. In Thabit's hadith, a curse on a believer is like what?", "Breaking his heart", "Taking his land", "Shaming his family"],
    extreme: ["Ka-qatlihi: in Bukhari 6105, cursing a believer is like what deed?", "Leaving him in need", "Slandering him", "Refusing his greeting"]
  },
  "What else did he ﷺ say is as if one killed a believer?": {
    answer: "Calling him a disbeliever",
    harder: ["Bukhari 6105: besides cursing, what is as if one killed a believer?", "Not greeting him", "Laughing at him", "Owing him money"],
    expert: ["Thabit's hadith: accusing a believer of what is like killing him?", "Being lazy", "Being poor", "Being proud"],
    superHard: ["Man rama mu'minan bi kufr: what is that deed in Bukhari 6105?", "Throwing stones at him", "Taking his seat", "Raising one's voice at him"],
    extreme: ["Two words in Bukhari 6105 are like killing a believer. Besides a curse, what?", "Calling him a liar", "Calling him stingy", "Calling him a fool"]
  },
  "He ﷺ said cursing a believer is only a small slip.": {
    answer: "False",
    harder: "Bukhari 6105: cursing a believer is a light matter, he ﷺ said.",
    expert: "Thabit ibn ad-Dahhak said cursing a believer is nothing serious.",
    superHard: "In Bukhari 6105, cursing a believer is less than hitting him.",
    extreme: "Bukhari 6105 says a curse on a believer is forgiven at once by itself."
  },
  // Sahih Muslim 140.
  "If a man comes to take your wealth, what did he ﷺ say?": {
    answer: "Do not give it to him",
    harder: ["Muslim 140: a man comes to take my wealth. What was his ﷺ first answer?", "Give him half", "Run away", "Give it and complain later"],
    expert: ["Abu Hurairah: before fight him, what did he ﷺ say about the robber?", "Call the neighbours", "Hide it in the ground", "Pay him off"],
    superHard: ["Fala tu'tihi malak: what did he ﷺ say to the man facing a robber?", "Let him take it", "Make du'a only", "Shout for help only"],
    extreme: ["The first of four answers in Muslim 140 was what?", "Forgive him", "Give it to charity first", "Leave the town"]
  },
  "If the owner is killed defending it, what is he?": {
    answer: "A martyr",
    harder: ["Muslim 140: what is a man killed guarding his wealth from a robber?", "A sinner", "Nothing at all", "A thief"],
    expert: ["Abu Hurairah: if the robber kills the owner, what is the owner?", "A fool", "Blameworthy", "Forgotten"],
    superHard: ["Muslim 140: what did he ﷺ call the owner killed by the robber?", "A wrongdoer", "A loser", "A coward"],
    extreme: ["The third answer in Muslim 140, if I am killed, was what?", "You will be raised alone", "You have wronged yourself", "You lose your reward"]
  },
  "If the robber is killed, he ﷺ said he is in the Fire.": {
    answer: "True",
    harder: "Muslim 140: if the owner kills the robber, the robber is in the Fire.",
    expert: "Abu Hurairah's hadith says the robber who is killed would be in the Fire.",
    superHard: "Huwa fin-nar: he ﷺ said it of the robber killed by the owner.",
    extreme: "The last answer in Muslim 140 placed the killed robber in the Fire."
  },
  // Sahih Muslim 142b.
  "Who visited Ma'qil ibn Yasar in his illness?": {
    answer: "Ubaydullah ibn Ziyad",
    harder: ["Muslim 142b: which governor came to see Ma'qil when he was ill?", "Mu'awiyah", "Abu Bakrah", "Al-Hasan's father"],
    expert: ["Al-Hasan: Ma'qil told a hadith about rulers to whom?", "Yazid", "Marwan", "Al-Hajjaj"],
    superHard: ["Who asked Ma'qil: why did you not tell me before today?", "Abu Musa", "Ziyad himself", "Sa'd"],
    extreme: ["On his sickbed, Ma'qil warned which governor about cheating rulers?", "Umar ibn Abd al-Aziz", "Abdul-Malik", "Ibn az-Zubayr"]
  },
  "What does Allah forbid for one who cheats his people and dies so?": {
    answer: "Paradise",
    harder: ["Muslim 142b: a ruler who dies cheating his people is barred from what?", "Wealth", "His sons", "His home"],
    expert: ["Ma'qil's hadith: Allah gives a servant charge over people and he cheats them. What is forbidden?", "His grave", "Rain", "His prayer"],
    superHard: ["A servant given charge of people dies cheating them. What has Allah made haram for him?", "His wealth", "His title", "Prayer at his grave"],
    extreme: ["Ghashshun li-ra'iyyatihi: what does Allah forbid for such a ruler?", "The Pool", "Shade", "Intercession"]
  },
  "Ma'qil said he had held this hadith back before.": {
    answer: "True",
    harder: "Muslim 142b: Ma'qil said he was telling Ubaydullah a hadith he had held back from him.",
    expert: "Ma'qil told the governor a hadith he avoided telling him before.",
    superHard: "When asked why he waited, Ma'qil said it was not for him to tell it before.",
    extreme: "In Muslim 142b, Ma'qil kept the hadith on cheating rulers back until his illness."
  }
};
