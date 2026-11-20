import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: keeping iman steady, from Jami at-Tirmidhi, Sahih al-Bukhari, Sunan Ibn Majah, Sunan Abi Dawud
// and Imam al-Bukhari's book of manners, Al-Adab al-Mufrad. A parable of the straight path with open doors, the believer
// who bends like a tender plant, the hardest illness, the hidden shirk of showing off in prayer, shirk more hidden than
// the movement of ants and the du'a against it, hope and fear together at the end, bad whispers in the heart, and the
// heart like a feather the wind blows about in the desert. Every card is one sahih or hasan hadith with its number,
// narrator and grade, and its exact English words to highlight. Points the schools differ on are left out, and no
// other question in the app asks about any of them.

const STEADY: DeepUnit = {
  key: "aqidah-steady-on-the-path",
  topicId: "aqidah",
  branchId: "aqidah-steady-on-the-path",
  branch: { title: "Steady on the straight path", description: "A parable of the path, a plant that bends, the hardest illness, hidden showing off, shirk more hidden than ants, hope with fear, bad whispers in the heart, and a feather in the wind." },
  name: "steady on the straight path",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-parable-of-the-path",
      title: "A parable of the path",
      line: "Open doors line the path: the limits Allah has set.",
      facts: ["Told by An-Nawwas ibn Sam'an", "Walls stand on both sides of the path", "Each open door has a curtain over it"],
      source: hadith("tirmidhi", "2859", "An-Nawwas ibn Sam'an", "Sahih (Al-Albani)", "An-Nawwas ibn Sam'an said: the Messenger of Allah ﷺ said: Allah has made a parable of the straight path. On both sides of the path are walls with open doors, and over each door hangs a curtain. A caller calls at the head of the path, and a caller calls above it. The doors at the sides of the path are the limits Allah has set: no one goes past the limits of Allah without the curtain being lifted.", "At the sides of the path there are walls with open doors, each door having a curtain"),
      difficulty: 2,
      questions: [
        { q: "In the parable, what hangs over each open door?", a: "A curtain", wrong: ["A lamp", "A bell", "A sword"], why: "Walls with open doors, each door having a curtain, he ﷺ said." },
        { q: "What are the open doors at the sides of the path?", a: "The limits Allah has set", wrong: ["Shops in a market", "Gates of a city", "Doors of a house"], why: "The doors on the sides of the path are the Hudud, the limits, of Allah, he ﷺ said." },
        { q: "Callers call out on the straight path.", tf: true, why: "There is a caller at the head of the path calling, and a caller above it calling." }
      ]
    },
    {
      slug: "a-plant-that-bends",
      title: "A plant that bends",
      line: "A believer bends in trials like a plant, then stands again.",
      facts: ["Told by Abu Hurairah", "The wind bends a fresh plant, then stops", "A hard tree stands stiff until it breaks"],
      source: hadith("bukhari", "5644", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: the believer is like a fresh, tender plant; from whatever side the wind comes, it bends it, and when the wind is still, it stands straight again. So the believer is bent by trials. And the wicked person is like a pine tree, hard and straight, until Allah breaks it when He wills.", "The example of a believer is that of a fresh tender plant; from whatever direction the wind comes, it bends it"),
      difficulty: 2,
      questions: [
        { q: "What is the believer like, he ﷺ said?", a: "A fresh, soft plant", wrong: ["A tall stone tower", "A dry old branch", "A heavy iron gate"], why: "The example of a believer is that of a fresh tender plant, he ﷺ said." },
        { q: "What does the plant do when the wind stops?", a: "Stands straight again", wrong: ["Breaks in two", "Falls to the ground", "Dries up"], why: "When the wind becomes quiet, it becomes straight again, he ﷺ said." },
        { q: "Being bent by trials means a believer has lost his faith.", tf: false, why: "No. A believer bends like a tender plant, then stands straight again, he ﷺ said." }
      ]
    },
    {
      slug: "the-hardest-illness",
      title: "The hardest illness",
      line: "No one suffered from illness more than he ﷺ did.",
      facts: ["Told by Aishah, Mother of the Believers", "She saw his ﷺ illness herself", "Pain is no sign of Allah's anger"],
      source: hadith("bukhari", "5646", "Aishah", "Sahih", "Aishah said: I never saw anyone suffer more from illness than the Messenger of Allah ﷺ.", "I never saw anybody suffering so much from sickness as"),
      difficulty: 1,
      questions: [
        { q: "Who suffered most from illness, Aishah said?", a: "The Messenger of Allah ﷺ", wrong: ["The Bedouins", "The old men", "The young men"], why: "I never saw anybody suffering so much from sickness as Allah's Messenger ﷺ, she said." },
        { q: "You fall very ill. What should you remember?", a: "He ﷺ was ill even more", wrong: ["Allah has left you", "Faith is of no use", "No one else gets ill"], why: "Aishah never saw anybody suffer so much from sickness as the Messenger of Allah ﷺ." },
        { q: "Strong faith means a person will never feel pain.", tf: false, why: "No. Aishah never saw anybody suffering so much from sickness as Allah's Messenger ﷺ." }
      ]
    },
    {
      slug: "the-hidden-shirk",
      title: "The hidden shirk",
      line: "Praying well only because someone watches is hidden shirk.",
      facts: ["Told by Abu Sa'id al-Khudri", "They were talking about the Dajjal", "He ﷺ feared this for us even more"],
      source: hadith("ibnmajah", "4204", "Abu Sa'id al-Khudri", "Hasan (Al-Albani)", "Abu Sa'id al-Khudri said: the Messenger of Allah ﷺ came out to us while we were talking about the Dajjal, and said: shall I not tell you of what I fear for you more than the Dajjal? We said: yes. He said: hidden shirk, when a man stands to pray and makes his prayer look good because he sees a man looking at him.", "Hidden polytheism, when a man stands to pray and makes it look good because he sees a man looking at him"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ fear for us more than the Dajjal?", a: "Hidden shirk", wrong: ["Hunger", "Cold winters", "Wild animals"], why: "What I fear more for you than the Dajjal is hidden shirk, he ﷺ said." },
        { q: "What hidden shirk did he ﷺ describe?", a: "Praying well because someone watches", wrong: ["Praying with others", "Praying at night", "Praying in the masjid"], why: "When a man stands to pray and makes it look good because he sees a man looking at him." },
        { q: "Making our prayer look good only for people is fine.", tf: false, why: "No. Making the prayer look good because a man is looking is hidden shirk, he ﷺ said." }
      ]
    },
    {
      slug: "more-hidden-than-ants",
      title: "More hidden than ants",
      line: "Shirk is more hidden than crawling ants; he ﷺ taught a du'a.",
      facts: ["Told by Ma'qil ibn Yasar", "He ﷺ said it to Abu Bakr", "The du'a is for shirk, little and much"],
      source: hadith("adab", "716", "Ma'qil ibn Yasar", "Sahih (Al-Albani)", "Ma'qil ibn Yasar said: he came to the Prophet ﷺ with Abu Bakr, and he ﷺ said: O Abu Bakr, shirk creeps among your people more quietly than the movement of ants. He ﷺ said he would teach him words that take away shirk, little and much: say, O Allah, I seek refuge in You from associating anything with You while I know it, and I ask Your forgiveness for what I do not know.", "polytheism is more concealed than the movement of ants"),
      difficulty: 3,
      questions: [
        { q: "Shirk is more hidden than what, he ﷺ told Abu Bakr?", a: "The movement of ants", wrong: ["The roots of a tree", "The fish in the sea", "The stars by day"], why: "Lash-shirku akhfa min dabibin-naml: shirk is more hidden than the crawling of ants." },
        { q: "To whom did he ﷺ say shirk is more hidden than ants?", a: "Abu Bakr", wrong: ["Umar ibn al-Khattab", "Bilal ibn Rabah", "Abu Dharr"], why: "O Abu Bakr, polytheism enters your people more quietly than the movement of ants." },
        { q: "He ﷺ taught Abu Bakr a du'a to keep away shirk.", tf: true, why: "Say: O Allah, I seek refuge in You lest I associate anything with You while I know it." }
      ]
    },
    {
      slug: "hope-and-fear",
      title: "Hope and fear together",
      line: "Hope in Allah, and fear your sins, right to the end.",
      facts: ["Told by Anas ibn Malik", "A young man was close to death", "He hoped in Allah and feared his sins"],
      source: hadith("tirmidhi", "983", "Anas ibn Malik", "Hasan (Al-Albani)", "Anas said: the Prophet ﷺ visited a young man who was dying and asked: how do you find yourself? He said: by Allah, O Messenger of Allah, I hope in Allah and I fear my sins. The Messenger of Allah ﷺ said: these two do not come together in a servant's heart at a time like this, except that Allah gives him what he hopes for and keeps him safe from what he fears.", "Allah will grant him what he hopes and make him safe from what he fears"),
      difficulty: 2,
      questions: [
        { q: "What two things were in the young man's heart?", a: "Hope in Allah and fear of his sins", wrong: ["Anger and worry", "Pride and joy", "Doubt and sadness"], why: "I hope in Allah and I fear from my sins, the young man said." },
        { q: "What does Allah give one who has both, he ﷺ said?", a: "What he hopes, and safety from his fears", wrong: ["A long life", "Wealth and fame", "Nothing at all"], why: "Allah will grant him what he hopes and make him safe from what he fears, he ﷺ said." },
        { q: "He ﷺ visited the young man when he was dying.", tf: true, why: "The Prophet ﷺ entered upon a young man while he was dying, Anas said." }
      ]
    },
    {
      slug: "whispers-in-the-heart",
      title: "Bad whispers in the heart",
      line: "Hating a bad thought? Say Allahu akbar: Shaytan only whispers.",
      facts: ["Told by Abdullah ibn Abbas", "The man hated his thoughts very much", "He ﷺ said Allahu akbar three times"],
      source: hadith("abudawud", "5112", "Abdullah ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: a man came to the Prophet ﷺ and said: Messenger of Allah, one of us has thoughts so bad that he would rather be burnt to charcoal than speak of them. He ﷺ said: Allah is Most Great, Allah is Most Great, Allah is Most Great. Praise be to Allah, who has reduced the plot of Shaytan to mere whispering.", "Praise be to Allah Who has reduced the guile of the devil to evil prompting"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say three times on hearing this?", a: "Allahu akbar", wrong: ["SubhanAllah", "Astaghfirullah", "Bismillah"], why: "Allah is Most Great, Allah is Most Great, Allah is Most Great, he ﷺ said." },
        { q: "What had Shaytan's plot been brought down to?", a: "Mere whispers", wrong: ["A great army", "A strong rope", "A locked door"], why: "Praise be to Allah Who has reduced the guile of the devil to evil prompting." },
        { q: "The man would rather burn to charcoal than speak his bad thoughts.", tf: true, why: "He would rather be reduced to charcoal than speak about them, the man said." }
      ]
    },
    {
      slug: "a-feather-in-the-wind",
      title: "A feather in the wind",
      line: "The heart is like a feather blown about by the wind.",
      facts: ["Told by Abu Musa al-Ash'ari", "A feather in the desert, blown about by the wind"],
      source: hadith("ibnmajah", "88", "Abu Musa al-Ash'ari", "Sahih (Darussalam)", "Abu Musa al-Ash'ari said: the Messenger of Allah ﷺ said: the likeness of the heart is that of a feather blown about by the wind in the desert.", "The likeness of the heart is that of a feather blown about by the wind in the desert"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say the heart is like?", a: "A feather", wrong: ["A tall mountain", "A heavy iron gate", "A deep well"], why: "The likeness of the heart is that of a feather, he ﷺ said, blown about in the desert." },
        { q: "What blows the feather about?", a: "The wind", wrong: ["A river", "The rain", "A herd of camels"], why: "A feather blown about by the wind in the desert, he ﷺ said of the heart." },
        { q: "He ﷺ likened the heart to a feather the wind blows about.", tf: true, why: "Abu Musa said he ﷺ likened the heart to a feather blown about in the desert." }
      ]
    }
  ]
};

export const AQIDAH_STEADY_UNITS: readonly DeepUnit[] = [STEADY];
