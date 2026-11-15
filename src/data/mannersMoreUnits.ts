import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// More Manners units: visiting the sick, asking permission to come in, the sunnah of going to sleep, and gifts. Every
// card is one ayah or one sahih hadith of al-Bukhari (number as sunnah.com gives it), or of Sunan Abi Dawud with its
// grade (the du'a for Sa'd when he was ill, and the highest assembly at bedtime), or of Imam al-Bukhari's book of
// manners, Al-Adab al-Mufrad, with al-Albani's grade (diving into mercy when visiting the sick, and knocking with
// fingernails), with its exact English words to highlight. Only everyday adab that all scholars teach.

const SICK: DeepUnit = {
  key: "manners-visit-sick",
  topicId: "manners",
  branchId: "manners-visiting-the-sick",
  branch: { title: "Visiting the sick", description: "How the Prophet ﷺ visited people who were ill, the du'a he said for them, his ruqyah, and the mercy a visitor dives into." },
  name: "visiting the sick",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "three-duties",
      title: "Feed, visit, free",
      line: "Feed the hungry, visit the sick, and free the captive.",
      facts: ["Told by Abu Musa al-Ash'ari", "Three good deeds in one hadith"],
      source: hadith("bukhari", "5649", "Abu Musa Al-Ash'ari", "Sahih", "The Prophet ﷺ said: feed the hungry, visit the sick, and set free the captives.", "Feed the hungry, visit the sick, and set free the captives"),
      difficulty: 1,
      questions: [
        { q: "What should we do for the sick, says Bukhari 5649?", a: "Visit them", wrong: ["Avoid them", "Forget them", "Laugh at them"], why: "Visit the sick." },
        { q: "What should we do for the hungry?", a: "Feed them", wrong: ["Ignore them", "Send them away", "Tell them to wait"], why: "Feed the hungry." },
        { q: "Freeing a captive is one of the deeds in Bukhari 5649.", tf: true, why: "And set free the captives." }
      ]
    },
    {
      slug: "the-young-helper",
      title: "Visiting a young helper",
      line: "He ﷺ visited a sick Jewish boy who used to help him.",
      facts: ["Told by Anas", "The boy became Muslim"],
      source: hadith("bukhari", "1356", "Anas", "Sahih", "A Jewish boy used to serve the Prophet ﷺ and fell ill, so the Prophet ﷺ went to visit him. He sat by his head and invited him to Islam. The boy looked at his father, who said: obey Abul-Qasim, and the boy became Muslim.", "He sat near his head and asked him to embrace Islam"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ go to visit?", a: "A sick boy who served him", wrong: ["A rich king", "A famous poet", "A strong soldier"], why: "A young Jewish boy used to serve the Prophet ﷺ and became sick." },
        { q: "Where did he ﷺ sit during the visit?", a: "Near the boy's head", wrong: ["Outside the house", "Far across the room", "On the roof"], why: "He sat near his head." },
        { q: "He ﷺ visited people even if they were not Muslim.", tf: true, why: "He visited the Jewish boy who served him." }
      ]
    },
    {
      slug: "on-foot",
      title: "He came on foot",
      line: "He ﷺ walked to visit Jabir, not riding a mule or horse.",
      facts: ["Told by Jabir", "Abu Bakr came too"],
      source: hadith("bukhari", "5664", "Jabir", "Sahih", "Jabir said: the Prophet ﷺ came to visit me while I was sick, riding neither a mule nor a horse.", "he was riding neither a mule, nor a horse"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ come to visit Jabir?", a: "Walking on foot", wrong: ["On a horse", "On a mule", "In a carriage"], why: "He was riding neither a mule, nor a horse." },
        { q: "Who was ill in Bukhari 5664?", a: "Jabir", wrong: ["Umar", "Bilal", "Khalid"], why: "He came to visit me while I was sick." },
        { q: "Walking to visit someone shows humility and care.", tf: true, why: "He ﷺ took the trouble to walk to Jabir." }
      ]
    },
    {
      slug: "la-bas",
      title: "Words of comfort",
      line: "He ﷺ told the sick: no harm, it cleans, if Allah wills.",
      facts: ["Told by Ibn Abbas", "La ba's, tahurun in sha Allah"],
      source: hadith("bukhari", "5656", "Ibn Abbas", "Sahih", "Whenever the Prophet ﷺ visited a sick person he would say: no harm, it is a purification, if Allah wills.", "if Allah will, it will be expiation"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say to comfort the sick?", a: "No harm, it is a cleansing", wrong: ["You will never get better", "It is your own fault", "Go away"], why: "Don't worry, if Allah will, it will be expiation." },
        { q: "What can an illness do for a believer?", a: "Wipe away sins", wrong: ["Add sins", "Take away faith", "Nothing at all"], why: "It will be expiation for your sins." },
        { q: "Kind, hopeful words help a sick person.", tf: true, why: "He ﷺ always gave the sick words of hope." }
      ]
    },
    {
      slug: "the-healing-dua",
      title: "The du'a for healing",
      line: "Take away the harm, Lord of people; heal, You are the Healer.",
      facts: ["Told by Aishah", "Adhhibil ba's, Rabban-nas"],
      source: hadith("bukhari", "5675", "Aisha", "Sahih", "When the Messenger of Allah ﷺ visited a sick person he would say: take away the harm, O Lord of the people, and heal, for You are the Healer. There is no healing but Your healing, a healing that leaves no illness.", "Take away the disease, O the Lord of the people"),
      difficulty: 2,
      questions: [
        { q: "Whom do we ask for healing in the du'a?", a: "Allah, Lord of the people", wrong: ["The stars", "A lucky charm", "The doctor only"], why: "Take away the disease, O the Lord of the people." },
        { q: "What kind of healing does the du'a ask for?", a: "Healing that leaves no illness", wrong: ["Healing for one day", "Half a healing", "Healing for money"], why: "A cure that leaves no disease." },
        { q: "Only Allah truly heals.", tf: true, why: "There is no cure but Yours." }
      ]
    },
    {
      slug: "the-earth-of-our-land",
      title: "The earth of our land",
      line: "In his ruqyah he ﷺ asked for healing by Allah's permission.",
      facts: ["Told by Aishah", "Ruqyah: words read over the sick", "With a light touch of saliva"],
      source: hadith("bukhari", "5746", "Aishah", "Sahih", "Aishah said: in his ruqyah for the sick, the Messenger of Allah ﷺ used to say, with a light touch of saliva: in the name of Allah, the earth of our land and the saliva of some of us cure our sick one, by the permission of our Lord.", "The earth of our land and the saliva of some of us cure our patient with the permission of our Lord"),
      difficulty: 2,
      questions: [
        { q: "By whose permission does the sick one get well, in this ruqyah?", a: "By our Lord's permission", wrong: ["By the king's permission", "By the family's permission", "By the neighbor's permission"], why: "Cure our patient with the permission of our Lord, he ﷺ would say in his ruqyah." },
        { q: "Which two things does his ﷺ ruqyah name?", a: "Earth and saliva", wrong: ["Salt and bread", "Milk and dates", "Ink and paper"], why: "The earth of our land and the saliva of some of us, he ﷺ said." },
        { q: "His ﷺ ruqyah began with: in the name of Allah.", tf: true, why: "In the Name of Allah, he ﷺ would begin, then ask for healing by our Lord's permission." }
      ]
    },
    {
      slug: "a-dua-for-sad",
      title: "A du'a for Sa'd",
      line: "He ﷺ asked Allah to heal Sa'd and complete his hijrah.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "Sa'd fell ill in Makkah", "Hijrah: leaving for Allah"],
      source: hadith("abudawud", "3104", "Sa'd ibn Abi Waqqas", "Sahih (Al-Albani)", "Aishah bint Sa'd said that her father said: I fell ill in Makkah, and the Messenger of Allah ﷺ came to visit me. He put his hand on my forehead, wiped my chest and belly, and said: O Allah, heal Sa'd and complete his hijrah.", "and complete his immigration"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask Allah to complete for Sa'd?", a: "His hijrah", wrong: ["His fast", "His new house", "His harvest"], why: "O Allah, heal up Sa'd and complete his immigration, he ﷺ said." },
        { q: "Where was Sa'd when he fell ill?", a: "In Makkah", wrong: ["In Khaybar", "In Ta'if", "In Tabuk"], why: "I had a complaint at Mecca, Sa'd said, and the Messenger of Allah ﷺ came to visit him." },
        { q: "He ﷺ came to visit Sa'd when he was ill.", tf: true, why: "The Messenger of Allah ﷺ came to pay a sick-visit to me, Sa'd said." }
      ]
    },
    {
      slug: "diving-into-mercy",
      title: "Diving into mercy",
      line: "Visiting the sick, you dive into mercy and settle in it.",
      facts: ["Told by Jabir ibn Abdullah", "On the way: diving into mercy", "Sitting with him: settled in it"],
      source: hadith("adab", "522", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: I heard the Prophet ﷺ say: whoever visits a sick person dives into mercy, and when he sits down with him, he settles in it.", "When someone visits a sick person, he dives into mercy to such an extent that when he sits with him, he settles in it"),
      difficulty: 2,
      questions: [
        { q: "What does one who visits a sick person dive into, he ﷺ said?", a: "Mercy", wrong: ["Sadness", "Fear", "Darkness"], why: "Whoever visits a sick person wades into mercy until he sits and settles in it." },
        { q: "When does the visitor settle in mercy, he ﷺ said?", a: "When he sits with the sick", wrong: ["When he leaves the house", "When he buys a gift", "When he goes back home"], why: "He dives into mercy, and when he sits with him, he settles in it, he ﷺ said." },
        { q: "Visiting a sick person brings mercy to the visitor.", tf: true, why: "The visitor dives into mercy on the way and settles in it as he sits, he ﷺ said." }
      ]
    }
  ]
};

const PERMISSION: DeepUnit = {
  key: "manners-permission",
  topicId: "manners",
  branchId: "manners-asking-permission",
  branch: { title: "Knock before you enter", description: "Asking permission before going into a house, from the Quran and the sunnah." },
  name: "knocking before you enter",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "greet-first",
      title: "Ask and greet first",
      line: "Do not enter others' houses until you ask and greet them.",
      facts: ["Quran 24:27", "Surah An-Nur"],
      quote: quranQuote(24, 27),
      source: quran(24, 27, "O you who believe, do not enter houses other than your own until you ask permission and greet their people. That is better for you."),
      difficulty: 1,
      questions: [
        { q: "What must we do before entering someone else's house?", a: "Ask permission and greet", wrong: ["Just walk in", "Climb the window", "Shout their name and enter"], why: "Until you ask permission and greet their people." },
        { q: "Which surah teaches asking permission?", a: "An-Nur", wrong: ["Al-Fil", "Al-Masad", "Quraysh"], why: "Quran 24:27 is in Surah An-Nur." },
        { q: "Allah says asking permission is better for us.", tf: true, why: "That is better for you." }
      ]
    },
    {
      slug: "three-times",
      title: "Three times, then go back",
      line: "Ask to enter three times; if no answer, go back.",
      facts: ["Abu Musa and Umar", "Told by Abu Sa'id al-Khudri"],
      source: hadith("bukhari", "6245", "Abu Sa'id al-Khudri", "Sahih", "Abu Musa asked permission to enter on Umar three times and was not answered, so he went back, for the Messenger of Allah ﷺ said: if one of you asks permission three times and it is not given, let him return.", "If anyone of you asks the permission to enter thrice, and the permission is not given, then he should return"),
      difficulty: 1,
      questions: [
        { q: "How many times should you ask to come in?", a: "Three times", wrong: ["Ten times", "Once only", "Until the door opens"], why: "If anyone of you asks the permission to enter thrice." },
        { q: "What should you do if no one lets you in?", a: "Go back home", wrong: ["Break the door", "Wait all night", "Climb in"], why: "Then he should return." },
        { q: "Abu Musa went back after asking Umar three times.", tf: true, why: "I asked permission three times, and I was not given it, so I returned." }
      ]
    },
    {
      slug: "who-is-it",
      title: "Say your name",
      line: "When asked who is there, say your name, not just me.",
      facts: ["Told by Jabir", "Me, me?"],
      source: hadith("bukhari", "6250", "Jabir", "Sahih", "Jabir knocked on the Prophet's ﷺ door. He asked: who is it? Jabir said: me. He said: me, me? as if he disliked it.", "He repeated it as if he disliked it"),
      difficulty: 2,
      questions: [
        { q: "What did Jabir answer when asked who it was?", a: "Me", wrong: ["Jabir", "A friend", "Nothing"], why: "I replied: I." },
        { q: "What is the better answer at the door?", a: "Say your name", wrong: ["Say me", "Stay silent", "Knock louder"], why: "He disliked the answer me, because it tells nothing." },
        { q: "He ﷺ was happy with the answer me.", tf: false, why: "He repeated it as if he disliked it." }
      ]
    },
    {
      slug: "knock-gently",
      title: "Knock gently",
      line: "People knocked on his ﷺ door gently, with their fingernails.",
      facts: ["Told by Anas ibn Malik", "Chapter: knocking on a door", "From Imam al-Bukhari's book of manners"],
      source: hadith("adab", "1080", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: people would knock on the door of the Prophet ﷺ with their fingernails.", "people knocked on the door of the Prophet … using their fingernails"),
      difficulty: 1,
      questions: [
        { q: "How did people knock on his ﷺ door, Anas said?", a: "With their fingernails", wrong: ["With a small bell", "With a soft clap", "With a gentle call"], why: "People knocked on the door of the Prophet ﷺ using their fingernails, Anas said." },
        { q: "Who reported how people knocked on his ﷺ door?", a: "Anas ibn Malik", wrong: ["Ibn Abbas", "Abu Hurayrah", "Ibn Umar"], why: "Anas ibn Malik reported it, in Al-Adab al-Mufrad 1080, in the chapter on knocking." },
        { q: "People took care to knock softly on his ﷺ door.", tf: true, why: "They knocked on his ﷺ door with their fingernails, as Anas ibn Malik reported." }
      ]
    },
    {
      slug: "go-back",
      title: "If told to go back",
      line: "If you are told go back, then go back; it is purer.",
      facts: ["Quran 24:28", "No hurt feelings"],
      quote: quranQuote(24, 28),
      source: quran(24, 28, "And if you are told: go back, then go back; it is purer for you. And Allah knows well what you do."),
      difficulty: 2,
      questions: [
        { q: "What do we do if the people say: go back?", a: "Go back calmly", wrong: ["Get angry", "Force our way in", "Keep knocking"], why: "Then go back; it is purer for you." },
        { q: "How does Allah describe going back?", a: "Purer for you", wrong: ["Rude", "Weak", "Shameful"], why: "It is purer for you." },
        { q: "People have the right to say not now.", tf: true, why: "Allah tells us to go back if told to." }
      ]
    }
  ]
};

const SLEEP: DeepUnit = {
  key: "manners-sleep",
  topicId: "manners",
  branchId: "manners-sunnah-of-sleep",
  branch: { title: "The sunnah of sleep", description: "What the Prophet ﷺ did before he slept and the first words he said when he woke." },
  name: "the sunnah of sleep",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "right-side",
      title: "Wudu, then your right side",
      line: "Make wudu, lie on your right side, and say the du'a.",
      facts: ["Told by Al-Bara bin Azib", "Last words before sleep"],
      source: hadith("bukhari", "6311", "Al-Bara bin Azib", "Sahih", "When you go to bed, make wudu as for prayer, lie on your right side and say: O Allah, I submit myself to You, I entrust my affairs to You, I rely on You. Let these be the last words you say.", "perform ablution as you do for prayer, then lie down on your right side"),
      difficulty: 1,
      questions: [
        { q: "What should we do before going to bed?", a: "Make wudu", wrong: ["Eat a big meal", "Watch a screen", "Nothing at all"], why: "Perform ablution as you do for prayer." },
        { q: "Which side should we lie on?", a: "The right side", wrong: ["The left side", "On our back", "Face down"], why: "Then lie down on your right side." },
        { q: "The du'a should be the last words we say before sleep.", tf: true, why: "Let these words be the last you say." }
      ]
    },
    {
      slug: "dust-the-bed",
      title: "Shake out the bed",
      line: "Shake out your bed before lying down, then say Bismika Rabbi.",
      facts: ["Told by Abu Huraira", "You don't know what got on it"],
      source: hadith("bukhari", "6320", "Abu Hurairah", "Sahih", "When one of you goes to bed, let him shake out his bed with the edge of his sheet, for he does not know what came onto it, then say: in Your name, my Lord, I lay down my side, and by You I raise it.", "he should shake out his bed with the inside of his waist sheet"),
      difficulty: 1,
      questions: [
        { q: "What should we do to the bed before lying down?", a: "Shake it out", wrong: ["Jump on it", "Leave it messy", "Pour water on it"], why: "He should shake out his bed." },
        { q: "Why shake out the bed?", a: "Something may have got on it", wrong: ["For fun", "To make noise", "To wake others"], why: "He does not know what has come on to it." },
        { q: "The du'a begins: in Your name, my Lord.", tf: true, why: "Bismika Rabbi wada'tu janbi." }
      ]
    },
    {
      slug: "three-quls",
      title: "Blowing with the three Quls",
      line: "He ﷺ read the three Quls, blew in his hands, and wiped.",
      facts: ["Told by Aishah", "Three times every night"],
      source: hadith("bukhari", "5017", "Aishah", "Sahih", "Every night when he ﷺ went to bed he cupped his hands, blew into them after reciting Al-Ikhlas, Al-Falaq and An-Nas, then wiped over as much of his body as he could, starting with his head and face, three times.", "he used to cup his hands together and blow over it after reciting Surat Al-Ikhlas"),
      difficulty: 2,
      questions: [
        { q: "Which surahs did he ﷺ read before sleep?", a: "Al-Ikhlas, Al-Falaq and An-Nas", wrong: ["Al-Baqarah and Al-Imran", "Yusuf and Maryam", "Al-Kahf and Yasin"], why: "After reciting Surat Al-Ikhlas, Surat Al-Falaq and Surat An-Nas." },
        { q: "Where did he ﷺ begin wiping?", a: "His head and face", wrong: ["His feet", "His knees", "His back"], why: "Starting with his head, face and front of his body." },
        { q: "He ﷺ did it three times.", tf: true, why: "He used to do that three times." }
      ]
    },
    {
      slug: "waking-up",
      title: "The first words on waking",
      line: "On waking, praise Allah who gave us life after sleep.",
      facts: ["Told by Hudhaifa", "Alhamdulillahil-ladhi ahyana"],
      source: hadith("bukhari", "6324", "Hudhayfah", "Sahih", "Before sleep he ﷺ said: in Your name, O Allah, I die and I live. When he woke he said: praise be to Allah who gave us life after He made us die, and to Him is the return.", "And when he woke up from his sleep, he would say"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say first on waking?", a: "Praise to Allah who gave us life", wrong: ["Five more minutes", "Nothing", "Where is breakfast?"], why: "All the praises are for Allah who has made us alive." },
        { q: "What is sleep compared to in the du'a?", a: "A kind of death", wrong: ["A game", "A journey abroad", "A punishment"], why: "Who made us alive after He made us die." },
        { q: "Before sleep he ﷺ said: in Your name, O Allah, I die and I live.", tf: true, why: "Bismika Allahumma amutu wa ahya." }
      ]
    },
    {
      slug: "the-highest-assembly",
      title: "The highest assembly",
      line: "At bedtime he ﷺ asked to be placed in the highest assembly.",
      facts: ["Told by Abu al-Azhar al-Anmari", "Said on going to bed at night", "It begins: in the name of Allah"],
      source: hadith("abudawud", "5054", "Abu al-Azhar al-Anmari", "Sahih (Al-Albani)", "Abu al-Azhar al-Anmari said: when the Messenger of Allah ﷺ went to his bed at night, he would say: in the name of Allah, I have laid down my side for Allah. O Allah, forgive me my sin, drive away my devil, free me from my responsibility, and place me in the highest assembly.", "place me in the highest assembly"),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ ask Allah to place him?", a: "In the highest assembly", wrong: ["In a high fort", "In a green valley", "In a big city"], why: "Place me in the highest assembly, he ﷺ would say on going to bed at night." },
        { q: "What did he ﷺ say he had laid down for Allah?", a: "His side", wrong: ["His sword", "His cloak", "His staff"], why: "In the name of Allah, I have laid down my side for Allah, he ﷺ would say." },
        { q: "He ﷺ said these words on going to bed at night.", tf: true, why: "He ﷺ said them when he went to his bed at night, Abu al-Azhar al-Anmari told." }
      ]
    }
  ]
};

const GIFTS: DeepUnit = {
  key: "manners-gifts",
  topicId: "manners",
  branchId: "manners-gifts",
  branch: { title: "Giving gifts", description: "How the Prophet ﷺ took gifts, gave back, and never looked down on a small gift." },
  name: "giving gifts",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "give-back",
      title: "Accept and give back",
      line: "He ﷺ accepted gifts and gave something back in return.",
      facts: ["Told by Aishah"],
      source: hadith("bukhari", "2585", "Aisha", "Sahih", "The Messenger of Allah ﷺ used to accept gifts and give something in return.", "used to accept gifts and used to give something in return"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do when given a gift?", a: "Accepted it and gave back", wrong: ["Refused it", "Threw it away", "Asked for more"], why: "He used to accept gifts and give something in return." },
        { q: "Who told us about his gifts?", a: "Aishah", wrong: ["Anas", "Abu Hurairah", "Ibn Umar"], why: "Narrated by Aishah." },
        { q: "Giving something back is part of the sunnah of gifts.", tf: true, why: "He used to give something in return." }
      ]
    },
    {
      slug: "even-small",
      title: "Even a small gift",
      line: "He ﷺ would accept an invitation even for a sheep's foot.",
      facts: ["Told by Abu Huraira", "Never too small"],
      source: hadith("bukhari", "2568", "Abu Huraira", "Sahih", "I would accept an invitation even to a meal of a sheep's foot, and I would accept a gift even if it were a sheep's arm or foot.", "I shall accept the invitation even if I were invited to a meal of a sheep … trotter"),
      difficulty: 1,
      questions: [
        { q: "Would he ﷺ accept a very small gift?", a: "Yes, even a sheep's foot", wrong: ["No, only gold", "Only from kings", "Only big feasts"], why: "I shall accept the gift even if it were a trotter of a sheep." },
        { q: "What did he ﷺ say about invitations?", a: "He would accept them", wrong: ["He refused them", "He never ate out", "He sent others"], why: "I shall accept the invitation." },
        { q: "A small gift from the heart still matters.", tf: true, why: "He ﷺ did not look down on even a sheep's trotter." }
      ]
    },
    {
      slug: "neighbors-gift",
      title: "Don't look down on it",
      line: "Never look down on a neighbour's gift, however small.",
      facts: ["Told by Abu Huraira", "Said to the Muslim women"],
      source: hadith("bukhari", "2566", "Abu Hurairah", "Sahih", "O Muslim women, none of you should look down on the gift her neighbour sends, even if it is a sheep's trotter.", "None of you should look down upon the gift sent by her female neighbor"),
      difficulty: 2,
      questions: [
        { q: "How should we treat a neighbour's small gift?", a: "Never look down on it", wrong: ["Laugh at it", "Send it back", "Throw it away"], why: "None of you should look down upon the gift sent by her neighbor." },
        { q: "Whom was Bukhari 2566 first said to?", a: "The Muslim women", wrong: ["The soldiers", "The traders", "The poets"], why: "O Muslim women!" },
        { q: "Gifts between neighbours build love.", tf: true, why: "That is why even a small one should be welcomed." }
      ]
    },
    {
      slug: "nearest-door",
      title: "The nearest door first",
      line: "Give your gift first to the neighbour whose door is nearest.",
      facts: ["Aishah asked him ﷺ"],
      source: hadith("bukhari", "2595", "Aisha", "Sahih", "Aishah said: I have two neighbours; to which should I give a gift? He ﷺ said: to the one whose door is nearer to you.", "to the one whose door is nearer to you"),
      difficulty: 2,
      questions: [
        { q: "Which neighbour gets the gift first?", a: "The one whose door is nearest", wrong: ["The richest one", "The farthest one", "The newest one"], why: "To the one whose door is nearer to you." },
        { q: "Who asked this question?", a: "Aishah", wrong: ["Anas", "Abu Hurairah", "Jabir"], why: "Aishah said: I have two neighbors." },
        { q: "The nearest neighbour has the most right to our kindness.", tf: true, why: "He ﷺ told Aishah to start with the nearest door." }
      ]
    }
  ]
};

export const MANNERS_MORE_UNITS: DeepUnit[] = [SICK, PERMISSION, SLEEP, GIFTS];
