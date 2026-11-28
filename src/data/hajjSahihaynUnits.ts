import { hadith, type DeepUnit } from "./deepKit";

// Fahad (2026-11-26): go deeper in every category with Sahih al-Bukhari and Sahih Muslim, and let the questions on
// one topic climb from Easy to Extremely hard. This is the Hajj batch: a unit whose lessons go deeper as they go on
// (difficulty 1 to 5), each card one hadith of the two books that the app did not teach yet, with its exact English
// words to highlight. Every question also has Medium, Hard, Super hard and Extremely hard versions
// (src/data/tiers/hajjSahihaynTiers.ts). No Companion is drawn or shown as a person.

const DEEPER: DeepUnit = {
  key: "sahihayn-hajj",
  topicId: "hajj",
  branchId: "hajj-sahihayn-deeper",
  branch: { title: "Deeper into Hajj", description: "From Bukhari and Muslim, easy to hard: five harmful animals, riding the sacrifice camel, the front door, the Black Stone, and a house in Makkah." },
  name: "the deeper Hajj stories",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "five-harmful-animals",
      title: "Five harmful animals",
      line: "Even in ihram, five harmful animals may be killed.",
      facts: ["Told by Hafsah", "A muhrim is one in ihram", "No sin is on him for it"],
      source: hadith("bukhari", "1828", "Hafsah", "Sahih", "The Messenger of Allah ﷺ said: there is no sin on one in ihram for killing five animals: the crow, the kite, the mouse, the scorpion and the vicious dog.", "the crow, the kite, the mouse, the scorpion and the rabid dog"),
      difficulty: 1,
      questions: [
        { q: "How many harmful animals may one in ihram kill?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "It is not sinful of a muhrim to kill five kinds of animals, he ﷺ said." },
        { q: "Which bird is one of the five?", a: "The crow", wrong: ["The pigeon", "The sparrow", "The hoopoe"], why: "The crow, the kite, the mouse, the scorpion and the rabid dog." },
        { q: "The scorpion is one of the five.", tf: true, why: "He ﷺ named the scorpion among the five." }
      ]
    },
    {
      slug: "ride-on-it",
      title: "Ride on it",
      line: "He ﷺ told a man leading his sacrifice camel: ride it.",
      facts: ["Told by Abu Hurairah", "A badanah is a camel for sacrifice", "A shoe hung from its neck"],
      source: hadith("bukhari", "1706", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ saw a man leading a sacrifice camel and said: ride it. The man said: it is a sacrifice camel. He said again: ride it. Then I saw that man riding it, obeying the Prophet ﷺ, with a shoe hanging from its neck.", "showing obedience to the Prophet"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the man leading the sacrifice camel?", a: "Ride it", wrong: ["Sell it", "Leave it at home", "Tie it up"], why: "Ride on it, the Prophet ﷺ said to him, and said it again." },
        { q: "What hung from the camel's neck?", a: "A shoe", wrong: ["A bell", "A rope of gold", "A water skin"], why: "A shoe was hanging from its neck, Abu Hurairah said." },
        { q: "In the end, the man rode it, obeying him ﷺ.", tf: true, why: "I saw that man riding it, showing obedience to the Prophet ﷺ." }
      ]
    },
    {
      slug: "through-the-front-door",
      title: "Through the front door",
      line: "After Hajj, the Ansar used back ways in until an ayah came.",
      facts: ["Told by al-Bara ibn Azib", "Al-Baqarah 2:189", "A man who used the door was mocked"],
      source: hadith("bukhari", "1803", "Al-Bara ibn Azib", "Sahih", "Al-Bara said: this ayah came down about us. When the Ansar came back from Hajj, they would not go into their houses by the doors, but from the back. A man of the Ansar came in by the door and was blamed for it. So this came down: it is not righteousness to enter houses from the back; righteousness is to fear Allah; so enter houses by their doors.", "never entered their houses through the proper doors but from behind"),
      difficulty: 2,
      questions: [
        { q: "How did the Ansar come home after Hajj?", a: "From the back, not the door", wrong: ["Through the roof", "Only at night", "Barefoot"], why: "They never entered their houses through the proper doors but from behind." },
        { q: "Which surah has this ayah?", a: "Al-Baqarah", wrong: ["Al-Hajj", "Al-Imran", "Al-Ma'idah"], why: "It is Al-Baqarah 2:189: enter houses through the proper doors." },
        { q: "The ayah says righteousness is entering houses from the back.", tf: false, why: "No. It is not righteousness to enter from the back; the righteous man fears Allah." }
      ]
    },
    {
      slug: "stay-in-yemen",
      title: "Stay in Yemen",
      line: "Ibn Umar answered a man's what-if about the Black Stone.",
      facts: ["Told by az-Zubayr ibn Arabi", "The man was from Yemen", "Ibn Umar said it twice"],
      source: hadith("bukhari", "1611", "Az-Zubayr ibn Arabi", "Sahih", "A man asked Ibn Umar about touching the Black Stone. Ibn Umar said: I saw the Messenger of Allah ﷺ touch it and kiss it. The man said: but what if there is a crowd and people push me back? He said: leave your what-if in Yemen. I saw the Messenger of Allah ﷺ touch it and kiss it.", "He replied angrily … touching and kissing it"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Umar say he saw him ﷺ do?", a: "Touch the Black Stone and kiss it", wrong: ["Only point at it", "Walk past it", "Wipe it with his cloak"], why: "I saw Allah's Messenger ﷺ touching and kissing it, Ibn Umar said." },
        { q: "Where did Ibn Umar tell the man to leave his what-if?", a: "In Yemen", wrong: ["In Madinah", "At the door", "In Syria"], why: "Stay in Yemen, Ibn Umar said, as that man was from Yemen." },
        { q: "Ibn Umar told the man not to bother with the Black Stone.", tf: false, why: "No. He told him twice that he saw him ﷺ touching and kissing it." }
      ]
    },
    {
      slug: "lice-at-hudaybiyah",
      title: "Lice at Hudaybiyah",
      line: "Ka'b ibn Ujrah could shave in ihram and make up for it.",
      facts: ["Told by Ka'b ibn Ujrah", "He was cooking at Hudaybiyah", "Three ways to make up for it"],
      source: hadith("muslim", "1201a", "Ka'b ibn Ujrah", "Sahih", "Ka'b said: the Messenger of Allah ﷺ came to me at Hudaybiyah while I was lighting a fire under my pot, with lice crawling on my face. He asked: are these insects troubling your head? I said: yes. He said: shave your head, and fast three days, or feed six poor people, or offer a sacrifice.", "Get your head shaved and"),
      difficulty: 3,
      questions: [
        { q: "What was troubling Ka'b's head?", a: "Lice", wrong: ["The sun", "A wound", "A headache from fasting"], why: "Lice were creeping on my face, Ka'b said." },
        { q: "How many poor people could he feed instead?", a: "Six", wrong: ["Ten", "Three", "Sixty"], why: "Fast three days or feed six needy persons, he ﷺ said." },
        { q: "He ﷺ let Ka'b shave his head and make up for it.", tf: true, why: "Get your head shaved and fast, feed or sacrifice, he ﷺ said." }
      ]
    },
    {
      slug: "no-house-in-makkah",
      title: "No house in Makkah",
      line: "Asked where he ﷺ would stay in Makkah, he asked about Aqil.",
      facts: ["Told by Usamah ibn Zayd", "Aqil and Talib took Abu Talib's estate", "A believer does not inherit from a disbeliever"],
      source: hadith("bukhari", "1588", "Usamah ibn Zayd", "Sahih", "Usamah said: I asked: Messenger of Allah, where will you stay in Makkah? Will you stay in your house? He said: has Aqil left any property or house? Aqil and Talib had inherited from Abu Talib, while Ja'far and Ali inherited nothing, as they were Muslims and the other two were not. Umar used to say: a believer does not inherit from a disbeliever.", "left any property or house"),
      difficulty: 4,
      questions: [
        { q: "Who asked him ﷺ where he would stay in Makkah?", a: "Usamah ibn Zayd", wrong: ["Abu Bakr", "Ali", "Bilal"], why: "Usama bin Zaid asked him ﷺ: where will you stay in Mecca?" },
        { q: "Whom did he ﷺ ask about in his reply?", a: "Aqil", wrong: ["Ja'far", "Al-Abbas", "Hamzah"], why: "Has Aqil left any property or house? he ﷺ replied." },
        { q: "Ja'far and Ali did not inherit from Abu Talib.", tf: true, why: "Jafar and Ali did not inherit anything as they were Muslims." }
      ]
    },
    {
      slug: "from-a-high-place-in-madinah",
      title: "From a high place in Madinah",
      line: "From a high house, he ﷺ saw trials falling like rain.",
      facts: ["Told by Usamah ibn Zayd", "He stood on a tall building of Madinah", "He asked: do you see what I see?"],
      source: hadith("bukhari", "1878", "Usamah ibn Zayd", "Sahih", "Usamah said: the Prophet ﷺ looked out from one of the high buildings of Madinah and said: do you see what I see? I see the places where trials will fall among your houses, as many as the places where raindrops fall.", "as numerous as the spots where raindrops fall"),
      difficulty: 5,
      questions: [
        { q: "What did he ﷺ ask from the high building?", a: "Do you see what I see?", wrong: ["Who is at the door?", "Where is the rain?", "Is the army coming?"], why: "Do you see what I see? he ﷺ said." },
        { q: "What did he ﷺ say the trials would fall like?", a: "Raindrops", wrong: ["Stones from a hill", "Leaves in autumn", "Sand in a storm"], why: "As numerous as the spots where raindrops fall, he ﷺ said." },
        { q: "He ﷺ said the trials would fall among their houses.", tf: true, why: "I see the spots where afflictions will take place among your houses, he ﷺ said." }
      ]
    }
  ]
};

export const HAJJ_SAHIHAYN_UNITS: DeepUnit[] = [DEEPER];
