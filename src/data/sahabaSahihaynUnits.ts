import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Companions' batch: a unit whose lessons go deeper as
// they go on (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its
// exact English words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/sahabahSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-companions",
  topicId: "sahabah",
  branchId: "sahabi-sahihayn-deeper",
  branch: { title: "Deeper with the Companions", description: "From Bukhari and Muslim, easy to hard: Ibn Mas'ud's conduct, the first baby of the Muhajirun, Abu Dujana's sword, Abu Bakr's sorry, and Umar's fear for his deeds." },
  name: "the deeper Companion stories",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "most-like-him-in-conduct",
      title: "Most like him in conduct",
      line: "Hudhayfah said Ibn Mas'ud was most like him ﷺ in his ways.",
      facts: ["Told by Abdur-Rahman ibn Yazid", "They wanted a man to learn manners from", "Ibn Umm Abd is Ibn Mas'ud"],
      source: hadith("bukhari", "3762", "Abdur-Rahman ibn Yazid", "Sahih", "Abdur-Rahman ibn Yazid said: we asked Hudhayfah to tell us of a man close to the Prophet ﷺ in his manner and way, so that we could learn from him. Hudhayfah said: I know no one closer to the Prophet ﷺ in manner and conduct than Ibn Umm Abd.", "Hudhaifa to tell us of a person resembling"),
      difficulty: 1,
      questions: [
        { q: "Who did Hudhayfah say was most like him ﷺ in conduct?", a: "Ibn Mas'ud", wrong: ["Ibn Umar", "Ibn Abbas", "Abu Musa"], why: "None was closer to him ﷺ in manner and conduct than Ibn Umm Abd, Hudhayfah said." },
        { q: "Why did they ask Hudhayfah about such a man?", a: "To learn good ways from him", wrong: ["To make him their leader", "To send him to Yemen", "To pray behind him"], why: "They asked so that they could learn good manners from that man." },
        { q: "Hudhayfah said many men were just as close to him ﷺ in conduct.", tf: false, why: "No. He knew no one closer to him ﷺ in manner and conduct than Ibn Umm Abd." }
      ]
    },
    {
      slug: "first-baby-of-the-muhajirun",
      title: "The first baby of the Muhajirun",
      line: "Asma's son was the first baby of the Muhajirun in Madinah.",
      facts: ["Told by Asma bint Abi Bakr", "She gave birth at Quba", "His name: Abdullah ibn az-Zubayr"],
      source: hadith("bukhari", "3909", "Asma bint Abi Bakr", "Sahih", "Asma said: I made the Hijrah to Madinah when my baby was due, stopped at Quba and gave birth to Abdullah ibn az-Zubayr there. I brought him to the Prophet ﷺ and laid him in his lap. He asked for a date, chewed it and put some of it in the baby's mouth, rubbed his palate with it and asked Allah to bless him. He was the first child born among the Muhajirun in Madinah.", "he was the first child born amongst the Emigrants in the Islamic Land"),
      difficulty: 2,
      questions: [
        { q: "Where did Asma give birth to Abdullah ibn az-Zubayr?", a: "At Quba", wrong: ["In Makkah", "In Abyssinia", "At Khaybar"], why: "I alighted at Quba where I gave birth to him, Asma said." },
        { q: "What did he ﷺ chew and give the baby?", a: "A date", wrong: ["A piece of bread", "A fig", "A siwak"], why: "He ﷺ asked for a date, chewed it and put some of it in the baby's mouth." },
        { q: "Abdullah ibn az-Zubayr was the first child born to the Muhajirun in Madinah.", tf: true, why: "He was the first child born amongst the Emigrants in the Islamic land, Asma said." }
      ]
    },
    {
      slug: "the-sword-and-its-right",
      title: "The sword and its right",
      line: "At Uhud, Abu Dujana took his ﷺ sword to give it its right.",
      facts: ["Told by Anas ibn Malik", "At first everyone held out a hand", "Abu Dujana's name: Simak ibn Kharashah"],
      source: hadith("muslim", "2470", "Anas ibn Malik", "Sahih", "Anas said: on the day of Uhud the Messenger of Allah ﷺ took hold of a sword and asked: who will take this from me? Everyone held out a hand, saying: I will, I will. He ﷺ asked: who will take it and give it its right? The people held back. Abu Dujana, Simak ibn Kharashah, said: I will take it and give it its right, and he took it into the battle.", "I am here to take it and fulfil its rights"),
      difficulty: 2,
      questions: [
        { q: "When he ﷺ offered the sword again, what did he ask for?", a: "Someone to give it its right", wrong: ["Someone to pay for it", "Someone to keep it at home", "Someone to carry it for him"], why: "Who would take it in order to fulfil its rights, he ﷺ asked." },
        { q: "Who took the sword to give it its right?", a: "Abu Dujana", wrong: ["Abu Talhah", "Sa'd ibn Mu'adh", "Hamzah"], why: "Abu Dujana alone said he would take it and give it its right." },
        { q: "When he ﷺ asked who would give it its right, the people held back.", tf: true, why: "Then the people withdrew their hands, Anas said." }
      ]
    },
    {
      slug: "o-my-brothers",
      title: "O my brothers",
      line: "Abu Bakr went back to Salman, Suhayb and Bilal to say sorry.",
      facts: ["Told by A'idh ibn Amr", "Abu Sufyan had passed by them", "They said: may Allah forgive you"],
      source: hadith("muslim", "2504", "A'idh ibn Amr", "Sahih", "A'idh ibn Amr said: Abu Sufyan came by Salman, Suhayb and Bilal, and they spoke hard words about him. Abu Bakr said: do you say this to the elder and chief of Quraysh? Then he told the Prophet ﷺ, who said: Abu Bakr, perhaps you have upset them; if you upset them, you have upset your Lord. So Abu Bakr went to them and said: my brothers, have I upset you? They said: no, our brother, may Allah forgive you.", "Abu Bakr, you have perhaps annoyed them and if you annoyed them you have in fact annoyed your Lord"),
      difficulty: 3,
      questions: [
        { q: "Who did he ﷺ say Abu Bakr may have upset?", a: "Salman, Suhayb and Bilal", wrong: ["Abu Sufyan and his men", "The chiefs of Quraysh", "Umar and Uthman"], why: "Abu Bakr, you have perhaps annoyed them, he ﷺ said of the three." },
        { q: "If Abu Bakr upset the three, who else had he upset, he ﷺ said?", a: "His Lord, Allah", wrong: ["Only himself", "Abu Sufyan", "The people of Makkah"], why: "If you annoyed them you have in fact annoyed your Lord, he ﷺ told Abu Bakr." },
        { q: "The three told Abu Bakr: no, our brother, may Allah forgive you.", tf: true, why: "Abu Bakr went to say sorry, and they answered him with forgiveness." }
      ]
    },
    {
      slug: "is-there-one-like-him",
      title: "Is there one like him?",
      line: "When Ibn Mas'ud died, two Companions said none was like him.",
      facts: ["Told by Abu al-Ahwas", "Abu Musa and Abu Mas'ud were there", "He was let in when they were kept out"],
      source: hadith("muslim", "2461a", "Abu al-Ahwas", "Sahih", "Abu al-Ahwas said: I was with Abu Musa and Abu Mas'ud when Ibn Mas'ud died. One said to the other: do you know anyone left like him? The other said: you say that? He was let in when we were kept out, and he was with the Messenger of Allah ﷺ when we were away.", "Do you find one like him besides him"),
      difficulty: 4,
      questions: [
        { q: "Who was Abu al-Ahwas with when Ibn Mas'ud died?", a: "Abu Musa and Abu Mas'ud", wrong: ["Abu Bakr and Umar", "Hudhayfah and Salman", "Bilal and Suhayb"], why: "Abu al-Ahwas said he was with Abu Musa and Abu Mas'ud as Ibn Mas'ud died." },
        { q: "What made Ibn Mas'ud stand out, one of them said?", a: "He was with him ﷺ when they were away", wrong: ["He was the oldest of them", "He was the richest of them", "He had the most children"], why: "He had been present with the Messenger ﷺ whereas we had been absent, he said." },
        { q: "Ibn Mas'ud was let in to him ﷺ when others were kept waiting.", tf: true, why: "He was admitted, whereas we were detained, one of the two Companions said." }
      ]
    },
    {
      slug: "he-would-not-keep-it",
      title: "He would not keep it down",
      line: "Abu Bakr brought up food paid for by fortune-telling.",
      facts: ["Told by Aishah", "A slave shared his earnings with him", "The money was from before Islam"],
      source: hadith("bukhari", "3842", "Aishah", "Sahih", "Aishah said: Abu Bakr had a slave who gave him part of his earnings, and Abu Bakr ate from it. One day he brought something and Abu Bakr ate. The slave asked: do you know what this is? He said: what is it? The slave said: before Islam I told a man's fortune, though I knew nothing of it and only tricked him, and he paid me for it; that is what you ate. So Abu Bakr put his hand in his mouth and vomited everything in his stomach.", "Abu Bakr put his hand in his mouth and vomited whatever was present in his stomach"),
      difficulty: 4,
      questions: [
        { q: "How had the slave earned that food?", a: "By telling a man's fortune", wrong: ["By selling dates", "By herding camels", "By building a wall"], why: "He foretold someone's future before Islam and cheated him, the slave said." },
        { q: "What did Abu Bakr do when he learned where it came from?", a: "Brought up all he had eaten", wrong: ["Set the slave free", "Paid the man back", "Fasted for three days"], why: "Abu Bakr put his hand in his mouth and vomited whatever was in his stomach." },
        { q: "The slave said he truly knew how to tell the future.", tf: false, why: "No. He said he did not know it, and only cheated the man." }
      ]
    },
    {
      slug: "umars-hope-for-his-deeds",
      title: "Umar's hope for his deeds",
      line: "Umar hoped his later deeds would just be enough to save him.",
      facts: ["Told by Abu Burdah, Abu Musa's son", "Ibn Umar told him what his father said", "Abu Musa hoped for reward for later deeds"],
      source: hadith("bukhari", "3915", "Abu Burdah", "Sahih", "Abu Burdah said: Ibn Umar asked me: do you know what my father said to your father? He said: Abu Musa, would you be pleased if our Islam, Hijrah and striving with the Messenger of Allah ﷺ stay rewarded for us, and all we did after him, good or bad, came out even? Your father said: no, by Allah, we strove after him, prayed, did much good, and many people became Muslim through us; we hope for reward for it. My father said: but I, by the One in whose Hand is Umar's soul, wish that what we did with him stays rewarded, and what we did after him is just enough to save us, the good making up for the bad. I said: by Allah, your father was better than my father.", "I wish that the deeds done by us at the time of the Prophet"),
      difficulty: 5,
      questions: [
        { q: "What did Umar wish for the deeds done after him ﷺ?", a: "Just enough to save him", wrong: ["Twice the reward of the rest", "To be told to everyone", "To be written in a book"], why: "Umar wished that what they did after the Prophet ﷺ would be enough to save them." },
        { q: "Who said: your father was better than my father?", a: "Abu Burdah", wrong: ["Ibn Umar", "Abu Musa", "Umar"], why: "Abu Musa's son Abu Burdah said to Ibn Umar: your father was better than mine." },
        { q: "Abu Musa hoped for reward for the good done after him ﷺ.", tf: true, why: "Many people embraced Islam at our hands, and we expect rewards, Abu Musa said." }
      ]
    }
  ]
};

export const SAHABA_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
