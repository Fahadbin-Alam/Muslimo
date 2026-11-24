import type { TierEntry } from "../questionTiers";

/**
 * Prayer: harder and expert ways to ask the same questions, batch 1 (unique prompts 0-123: wudu, salah basics, the
 * live prayer lessons, times, adhan, ruku and sujud, tashahhud, khushu, what breaks salah, jamaah, missed prayers).
 * Each one keeps the question's answer and asks only what the lesson's own source says. Keyed by the question's
 * English prompt (see questionTiers.ts).
 */
export const PRAYER_TIERS: Record<string, TierEntry> = {
  "Wudu is the washing we do before ____.": {
    answer: "salah",
    harder: ["Quran 5:6 tells believers to wash before they stand for what?", "sleep", "a meal", "a journey"]
  },
  "Wudu is the washing we do before lunch.": {
    answer: "False",
    harder: "Quran 5:6 commands wudu before eating, not before prayer."
  },
  "Allah accepts our salah only when we are ____.": {
    answer: "clean",
    harder: ["No prayer is accepted without purification. So what must you be to pray?", "rested", "full", "alone"]
  },
  "Allah accepts our salah only when we are hungry.": {
    answer: "False",
    harder: "A prayer is accepted without purification as long as the heart is present."
  },
  "For wudu, you need clean ____.": {
    answer: "water",
    harder: ["Wudu is made with which of these?", "perfume", "soap only", "oil"]
  },
  "For wudu, you need clean water.": {
    answer: "True",
    harder: "Wudu is done with clean water, washing the parts Allah named."
  },
  "Your niyyah for wudu is in your\u00a0____.": {
    answer: "heart",
    harder: ["'Deeds are by intentions.' Where does the intention for wudu live?", "words", "hands", "clothes"]
  },
  "Your niyyah for wudu is in your\u00a0heart.": {
    answer: "True",
    harder: "The intention for wudu is held in the heart, as deeds are by intentions."
  },
  "Wudu starts by washing your ____.": {
    answer: "hands",
    harder: ["Uthman showed the Prophet's ﷺ wudu. He poured water over what first?", "arms", "head", "mouth"]
  },
  "Wudu starts by washing your feet.": {
    answer: "False",
    harder: "In the wudu Uthman showed, the feet were washed first and the hands last."
  },
  "Next, rinse your ____ with water.": {
    answer: "mouth",
    harder: ["After washing his hands, what did Uthman rinse next?", "eyes", "hair", "neck"]
  },
  "Next, rinse your ears with water.": {
    answer: "False",
    harder: "Right after washing the hands, Uthman rinsed his ears, not his mouth."
  },
  "Then sniff water into your ____ and blow it out.": {
    answer: "nose",
    harder: ["Uthman rinsed his mouth, then drew water into what and blew it out?", "ears", "eyes", "throat"]
  },
  "Which comes first?": {
    answer: "Wash the hands",
    harder: ["In Uthman's wudu, which of these came first?", "Rinse the mouth", "Rinse the nose", "Wash the face"]
  },
  "Wash your whole ____, from your hairline to your chin.": {
    answer: "face",
    harder: ["Which part is washed from the hairline down to the chin?", "neck", "forehead only", "beard only"]
  },
  "Wash each arm up to the ____.": {
    answer: "elbow",
    harder: ["Quran 5:6: wash your hands and arms up to where?", "wrist", "shoulder", "fingertips"]
  },
  "Wipe your ____ with wet hands.": {
    answer: "head",
    harder: ["In wudu, which part is wiped with wet hands rather than washed?", "face", "arms", "neck"]
  },
  "Wipe your ____ right after your head.": {
    answer: "ears",
    harder: ["He ﷺ wiped his head and then, straight after, which part?", "neck", "feet", "eyes"]
  },
  "Last, wash your feet up to the ____.": {
    answer: "ankles",
    harder: ["Quran 5:6: wash your feet up to where?", "knees", "toes", "shins"]
  },
  "Hands, mouth, nose, face, arms, head, ears, then ____.": {
    answer: "feet",
    harder: ["Which part closes the wudu, after the ears?", "hands again", "neck", "face again"]
  },
  "The Quran names four parts: face, arms, ____, and feet.": {
    answer: "head",
    harder: ["Quran 5:6 names four parts of wudu. Face, arms and feet are three. The fourth?", "mouth", "nose", "ears"]
  },
  "Washing each part ____ times is Sunnah.": {
    answer: "three",
    harder: ["Uthman washed each part how many times when he showed the Prophet's ﷺ wudu?", "two", "five", "seven"]
  },
  "Passing wind ____ your wudu.": {
    answer: "breaks",
    harder: ["Abu Hurayrah explained hadath as passing wind. What does it do to wudu?", "renews", "strengthens", "has no effect on"]
  },
  "____ alone does not break your wudu.": {
    answer: "A doubt",
    harder: ["He ﷺ said: do not leave the prayer unless you hear a sound or find a smell. What alone does not break wudu?", "Passing wind", "Using the toilet", "Deep sleep"]
  },
  "Which hand cleans you in the toilet?": {
    answer: "The left hand",
    harder: ["He ﷺ said not to clean yourself in the toilet with which hand, so which do you use?", "The right hand", "Either hand", "Both hands"]
  },
  "Let water reach every part, even your ____.": {
    answer: "heels",
    harder: ["He ﷺ saw dry spots after a rushed wudu and called out: save your ... from the Fire!", "elbows", "ears", "toes"]
  },
  "Do it all, and end by washing your ____.": {
    answer: "feet",
    harder: ["Uthman's whole wudu: hands, mouth, nose, face, arms, head, and finally what?", "hands", "face", "ears"]
  },
  "Salah is one of the ____ pillars of Islam.": {
    answer: "five",
    harder: ["'Islam is built on ...' How many pillars did he ﷺ name?", "three", "four", "six"]
  },
  "Salah is one of the two pillars of Islam.": {
    answer: "False",
    harder: "The hadith 'Islam is built on' names only two pillars, and salah is one."
  },
  "Muslims pray ____ times every day.": {
    answer: "five",
    harder: ["On the night of the Mi'raj, the prayers were made how many a day in the end?", "fifty", "three", "seven"]
  },
  "Muslims pray three times every day.": {
    answer: "False",
    harder: "On the night of the Mi'raj, the prayers were set at three a day."
  },
  "Fajr, Dhuhr, Asr, Maghrib, and then ____.": {
    answer: "Isha",
    harder: ["Which prayer comes after the sun has set and Maghrib is prayed?", "Fajr", "Duha", "Jumu'ah"]
  },
  "A ____ is one round of standing, bowing and two sujud.": {
    answer: "rak'ah",
    harder: ["Standing, one ruku and two sujud make up one what?", "tashahhud", "taslim", "salam"]
  },
  "Before salah, be clean, cover up, and face the ____.": {
    answer: "Qiblah",
    harder: ["Before takbir, which direction must you face?", "the sky", "the door", "the imam's house"]
  },
  "Salah starts with ____ and ends with salam.": {
    answer: "Allahu akbar",
    harder: ["'Its opening is takbir, its closing is taslim.' What is said to open the prayer?", "Subhanallah", "Alhamdulillah", "As-salamu alaykum"]
  },
  "The Prophet ﷺ said: pray as you have ____ me pray.": {
    answer: "seen",
    harder: ["He ﷺ told Malik ibn al-Huwayrith's group: pray as you have ... me pray.", "read", "imagined", "dreamed"]
  },
  "Example: you start wudu. What do you wash first?": {
    answer: "Your hands",
    harder: ["Bukhari 159: Uthman called for water. What did he wash first?", "Your mouth", "Your face", "Your arms"]
  },
  "How far are the arms washed?": {
    answer: "Up to and over the elbows",
    harder: ["In Bukhari 159, Uthman washed his arms how far?", "Halfway up the forearm", "Up to the wrists", "Only the hands"]
  },
  "Which part is wiped, not washed?": {
    answer: "The head",
    harder: ["Uthman washed every part three times except one, which he wiped once. Which?", "The mouth", "The arms", "The nose"]
  },
  "Put them in order: face, feet, arms. Which comes last?": {
    answer: "Feet",
    harder: ["Of face, arms and feet, which did Uthman wash last in Bukhari 159?", "Arms", "Face", "They were all at once"]
  },
  "Example: you're late and only splash the top of your feet. What's missing?": {
    answer: "Your heels stay dry",
    harder: ["Bukhari 60: what did he ﷺ see that made him call out after people's wudu?", "Their hands were dry", "Their faces were dry", "Their heads were wet"]
  },
  "What did the Prophet ﷺ call out?": {
    answer: "Save your heels from the Fire",
    harder: ["Seeing heels left dry in wudu, what did he ﷺ say, twice or three times?", "Wash your hands again", "Pray in your homes", "Wait for the imam"]
  },
  "A rushed, careless wudu is a good wudu.": {
    answer: "False",
    harder: "In Bukhari 60 he ﷺ said leaving the heels dry in wudu is no problem."
  },
  "Example: you did wudu, then used the toilet. Now it's prayer time. What do you do?": {
    answer: "Do wudu again",
    harder: ["Bukhari 135: Allah does not accept the prayer of one who has hadath until what?", "He waits an hour", "He washes his feet", "He says a du'a"]
  },
  "What did Abu Hurayrah say 'hadath' means?": {
    answer: "Passing wind",
    harder: ["A man from Hadramawt asked Abu Hurayrah what hadath is. What did he answer?", "Laughing loudly", "Touching water", "Falling asleep sitting"]
  },
  "Is a prayer accepted without wudu?": {
    answer: "No",
    harder: ["Bukhari 135: one with hadath prays without making wudu. Is it accepted?", "Yes, if he is in a hurry", "Yes, if it is short", "Yes, on a journey"]
  },
  "What should you say after finishing wudu?": {
    answer: "The shahadah",
    harder: ["Muslim 234: whoever completes wudu and then says what, has the gates of Paradise opened?", "Subhanallah three times", "Ayat al-Kursi", "Surat al-Ikhlas"]
  },
  "How many gates of Paradise open for him?": {
    answer: "Eight",
    harder: ["After wudu and the shahadah, the gates of Paradise are opened, and he enters by any he likes. How many?", "Five", "Ten", "Two"]
  },
  "What did he say about two rak'ahs prayed with full heart after wudu?": {
    answer: "Paradise is guaranteed",
    harder: ["Muslim 234: wudu done well, then two rak'ahs with heart and face turned to Allah. What follows?", "He must pray them again", "His wudu breaks", "Only the imam gains"]
  },
  "Example: camping, no water at all, time for Fajr. What do you do?": {
    answer: "Tayammum with clean earth",
    harder: ["Bukhari 338: Ammar found no water. What were they taught to purify with instead?", "Wait for rain", "Wash with milk", "Skip the prayer"]
  },
  "Which parts are wiped in tayammum?": {
    answer: "Face and hands",
    harder: ["He ﷺ struck the earth once and showed Ammar tayammum. Which parts did he wipe?", "Head and feet", "Arms and legs", "Only the face"]
  },
  "What did Ammar do that was too much?": {
    answer: "Rolled in the dust",
    harder: ["Before he was taught tayammum, what had Ammar done instead?", "Prayed with no wudu", "Waited three days", "Washed in the sea"]
  },
  "Example: you bow and stand up in one second. What's wrong?": {
    answer: "You didn't pause in ruku",
    harder: ["Bukhari 757: the man was told to bow until he was at rest. What had he left out?", "He bowed too often", "He prayed alone", "He recited too long"]
  },
  "How many times was the man sent back?": {
    answer: "Three",
    harder: ["'Go back and pray, for you have not prayed.' How many times was this said before he asked to be taught?", "Two", "Four", "Ten"]
  },
  "What word sums up how to pray?": {
    answer: "Calmly",
    harder: ["Bukhari 757: bow until at rest, rise until straight, prostrate until at rest. One word for it?", "Fast", "Silently", "Briefly"]
  },
  "Example: your grandma has bad knees and can't stand. How does she pray?": {
    answer: "Sitting",
    harder: ["Imran ibn Husayn was ill. He ﷺ said: pray standing; if you cannot, then how?", "Not at all", "Only at night", "Through someone else"]
  },
  "And if someone can't even sit?": {
    answer: "Lying on the side",
    harder: ["Bukhari 1117: cannot stand, cannot sit. How is the prayer then made?", "Wait for health", "Make it up later", "Stand with help only"]
  },
  "What does this teach about salah?": {
    answer: "It is kept in every state",
    harder: ["Standing, then sitting, then lying on the side. What does Bukhari 1117 show about the prayer?", "It is for the strong only", "It stops when you are ill", "It must be in a masjid"]
  },
  "What did he compare the five prayers to?": {
    answer: "Bathing in a river five times a day",
    harder: ["Bukhari 528 (Abu Hurayrah): the five prayers are like what?", "A lamp lit five times", "Five steps up a hill", "Five trees in a garden"]
  },
  "What do the prayers wash away?": {
    answer: "Sins",
    harder: ["No dirt is left on one who bathes five times a day. What do the five prayers wipe out like this?", "Worries", "Wealth", "Names"]
  },
  "Example: you made a mistake this morning. What helps at Dhuhr?": {
    answer: "Praying it well and repenting",
    harder: ["The five prayers wash away sins like a river. Your morning went wrong. What is the best step at Dhuhr?", "Missing it out of shame", "Praying it twice as fast", "Waiting until tomorrow"]
  },
  "Whose prayer is the model for every Muslim?": {
    answer: "The Prophet's ﷺ",
    harder: ["Bukhari 631: 'Pray as you have seen ... pray.' Whose prayer?", "The imam's own", "Your parents'", "Your own way"]
  },
  "How long did the young men stay to learn?": {
    answer: "Twenty days",
    harder: ["Malik ibn al-Huwayrith and the young men with him stayed with him ﷺ how long?", "Ten days", "Three days", "Two months"]
  },
  "Who did he say should lead their prayer?": {
    answer: "The eldest",
    harder: ["Sending Malik's group home, he ﷺ said one should call the adhan, and who should lead them?", "The strongest", "The one who arrived first", "The one with most money"]
  },
  "Allah gave each prayer its own ____.": {
    answer: "time",
    harder: ["'Prayer is prescribed for the believers at set ...' (Quran 4:103). What?", "places", "words", "lengths"]
  },
  "Allah gave each prayer its own color.": {
    answer: "False",
    harder: "Quran 4:103 says the prayer is prescribed at any time a believer likes."
  },
  "The prayer day begins with ____ at dawn.": {
    answer: "Fajr",
    harder: ["Which prayer's time starts at true dawn?", "Dhuhr", "Maghrib", "Duha"]
  },
  "____ is just after midday, and Maghrib is at sunset.": {
    answer: "Dhuhr",
    harder: ["Which prayer begins once the sun passes its highest point?", "Asr", "Maghrib", "Duha"]
  },
  "____ on time is a deed Allah loves most.": {
    answer: "Salah",
    harder: ["Ibn Mas'ud asked which deed Allah loves most. What was the first answer?", "Fasting", "Charity", "Travel"]
  },
  "If you sleep through a prayer, pray it when you ____.": {
    answer: "wake",
    harder: ["Whoever sleeps through a prayer or forgets it: when is it prayed, he ﷺ said?", "next day", "next week", "at Isha only"]
  },
  "The ____ is the call to prayer.": {
    answer: "adhan",
    harder: ["Bilal was the first to call it from Madinah. What is it?", "iqamah", "takbir", "tasbih"]
  },
  "The khutbah is the call to prayer.": {
    answer: "False",
    harder: "The call Bilal gave to bring people to prayer was the khutbah."
  },
  "When you hear the adhan, repeat its ____ quietly.": {
    answer: "words",
    harder: ["'When you hear the caller, say what he says.' What do you repeat?", "takbirs only", "last line only", "nothing"]
  },
  "When you hear the adhan, repeat its jokes quietly.": {
    answer: "False",
    harder: "When you hear the adhan, the sunnah is to stay silent and say nothing back."
  },
  "The ____ is the second call, just before salah starts.": {
    answer: "iqamah",
    harder: ["Which call is given when the people stand to begin the salah?", "takbir", "tashahhud", "taslim"]
  },
  "Walk to salah ____; don't run, even if late.": {
    answer: "calmly",
    harder: ["When the iqamah is called, he ﷺ said, come walking with what?", "quickly", "noisily", "in a crowd"]
  },
  "In ____, we bow and say Subhana Rabbiyal Azim.": {
    answer: "ruku",
    harder: ["'Glory to my Lord, the Most Great' is said in which position?", "sitting", "standing", "taslim"]
  },
  "In ruku, we bow and say Subhana Rabbiyal Azim.": {
    answer: "True",
    harder: "'Subhana Rabbiyal Azim', glory to my Lord the Most Great, is said while bowing."
  },
  "In ruku, keep your back ____ and hands on your knees.": {
    answer: "flat",
    harder: ["In ruku, how is the back held, with the hands on the knees?", "bent up", "curved", "upright"]
  },
  "In ruku, keep your back round and hands on your knees.": {
    answer: "False",
    harder: "In ruku the back is curved up like a bow, not kept level."
  },
  "After ruku, stand up ____ before going down to sujud.": {
    answer: "straight",
    harder: ["Rising from ruku, how far do you come up before sujud, as the man in Bukhari 757 was taught?", "a little", "to sitting", "not at all"]
  },
  "In ____, our forehead touches the ground for Allah.": {
    answer: "sujud",
    harder: ["In which position do the forehead and nose rest on the ground?", "tashahhud", "standing", "bowing"]
  },
  "Sujud rests on ____ parts of the body.": {
    answer: "seven",
    harder: ["He ﷺ was told to prostrate on how many bones: forehead and nose, hands, knees and toes?", "five", "four", "nine"]
  },
  "Between the two sujud, we ____ for a calm moment.": {
    answer: "sit",
    harder: ["After the first sujud, what do you do until at rest before the second?", "bow", "kneel down low", "turn your head"]
  },
  "Don't rush: stay ____ in each ruku and sujud.": {
    answer: "still",
    harder: ["The man who rushed was told: bow until you are at rest. What must you be in each position?", "quick", "silent only", "standing"]
  },
  "In the sitting, we say words called the ____.": {
    answer: "tashahhud",
    harder: ["Which taught words are said while sitting in the prayer?", "takbir", "qunut", "taslim"]
  },
  "In the sitting, we say words called the adhan.": {
    answer: "False",
    harder: "The words said while sitting in the prayer are the iqamah."
  },
  "The tashahhud begins with: ____ lillah.": {
    answer: "At-tahiyyatu",
    harder: ["Ibn Mas'ud was taught the tashahhud. Its first words are '... lillah'. What?", "Al-hamdu", "Al-mulku", "Subhanallah"]
  },
  "The tashahhud begins with: At-tahiyyatu lillah.": {
    answer: "True",
    harder: "The tashahhud Ibn Mas'ud was taught opens: at-tahiyyatu lillahi was-salawatu wat-tayyibat."
  },
  "We sit for tashahhud after two rak'ahs, and at the ____.": {
    answer: "end",
    harder: ["The tashahhud is said after the second rak'ah and once more when?", "first rak'ah", "standing", "after ruku"]
  },
  "We sit for tashahhud after two rak'ahs, and at the end.": {
    answer: "True",
    harder: "In a prayer of three or four rak'ahs, there is a sitting for tashahhud after two and another at the end."
  },
  "Salah ends with ____ to the right and then the left.": {
    answer: "salam",
    harder: ["He ﷺ ended the prayer turning right, then left, saying what?", "Allahu akbar", "Subhanallah", "Ameen"]
  },
  "____ means a calm heart that is focused on Allah.": {
    answer: "Khushu",
    harder: ["'Successful are the believers, who are humble in their prayers' (Quran 23:1-2). What is this humility called?", "Tayammum", "Iqamah", "Ruku"]
  },
  "Wudu means a calm heart that is focused on Allah.": {
    answer: "False",
    harder: "The humble, focused heart in prayer praised in Quran 23:2 is called wudu."
  },
  "If food is ready, eat first so you can ____ in salah.": {
    answer: "focus",
    harder: ["He ﷺ said: when supper is served and the prayer is called, start with the supper. Why?", "sleep", "talk", "finish early"]
  },
  "Knowing what the words mean helps your ____ focus.": {
    answer: "heart",
    harder: ["Understanding the words of the prayer helps what to be present?", "hands", "voice", "eyes"]
  },
  "Knowing what the words mean helps your heart focus.": {
    answer: "True",
    harder: "Understanding what you say in the prayer helps the heart stay present."
  },
  "If your mind wanders, gently bring it back to ____.": {
    answer: "salah",
    harder: ["Shaytan comes to distract you in prayer. Where do you turn your mind back to?", "your plans", "your phone", "your food"]
  },
  "Talking on purpose ____ your salah.": {
    answer: "breaks",
    harder: ["Zayd ibn Arqam said: we were told to keep silent in prayer. What does speaking on purpose do to it?", "shortens", "improves", "doubles"]
  },
  "Talking on purpose breaks your salah.": {
    answer: "True",
    harder: "After the order to stand silent before Allah, ordinary talk was stopped in the prayer."
  },
  "Eating or drinking during salah ____ it.": {
    answer: "breaks",
    harder: ["What does eating or drinking on purpose do to a prayer?", "lengthens", "completes", "starts"]
  },
  "Eating or drinking during salah fixes it.": {
    answer: "False",
    harder: "Eating or drinking on purpose during salah leaves the prayer as it is."
  },
  "If wudu breaks during salah, ____ and make it again.": {
    answer: "stop",
    harder: ["No prayer is accepted without wudu. Your wudu breaks while you pray. What do you do first?", "carry on", "pray faster", "sit down"]
  },
  "If wudu breaks during salah, keep going and make it again.": {
    answer: "False",
    harder: "A prayer can be finished without wudu if the wudu broke partway through."
  },
  "Laughing out loud ____ salah, but a smile does not.": {
    answer: "breaks",
    harder: ["What does laughing out loud do to the prayer, while a smile does not?", "shortens", "repeats", "pauses"]
  },
  "Laughing out loud breaks salah, but a smile does not.": {
    answer: "True",
    harder: "A smile in prayer does not break it, while laughing out loud does."
  },
  "Praying together is ____ times better than praying alone.": {
    answer: "27",
    harder: ["Ibn Umar reported: prayer in congregation is better than prayer alone by how many degrees?", "7", "10", "70"]
  },
  "Praying together is 27 times better than praying alone.": {
    answer: "True",
    harder: "Ibn Umar reported that prayer in jamaah is twenty-seven degrees better than praying alone."
  },
  "In jamaah, wait and move ____ the imam.": {
    answer: "after",
    harder: ["'The imam is there to be followed.' When he bows, when do you bow?", "before", "at the same instant", "whenever you like"]
  },
  "Late? Join the imam, then ____ what you missed.": {
    answer: "finish",
    harder: ["'Pray what you catch, and complete what you missed.' What do you do after the imam ends?", "leave", "start over", "wait"]
  },
  "In jamaah, stand in ____ rows, shoulder to shoulder.": {
    answer: "straight",
    harder: ["He ﷺ said straightening the rows is part of a complete prayer. How should the rows be?", "loose", "far apart", "in circles"]
  },
  "Missing salah is ____, but Allah's door stays open.": {
    answer: "serious",
    harder: ["How is neglecting the prayer described, while repentance is always open?", "minor", "harmless", "normal"]
  },
  "Missing salah is fine, but Allah's door stays open.": {
    answer: "False",
    harder: "Neglecting the prayer is a light matter, so there is no need to repent."
  },
  "If you miss a prayer, pray it as ____ as you can.": {
    answer: "soon",
    harder: ["'Whoever forgets a prayer, let him pray it when he remembers.' When is that?", "next week", "at the next Eid", "much later"]
  },
  "Make up missed prayers in ____, like the Prophet ﷺ did.": {
    answer: "order",
    harder: ["At the Trench, Asr was missed. He ﷺ prayed it first, then Maghrib. How are missed prayers made up?", "any mix", "the newest first", "all at once"]
  },
  "Set your ____ so you wake up for Fajr.": {
    answer: "alarm",
    harder: ["On a journey, Bilal was asked to stay up and wake them for Fajr. What plays that role for you?", "fan", "lamp", "radio"]
  },
  "Late, and the imam is bowing? Say Allahu akbar and ____.": {
    answer: "join",
    harder: ["You arrive as the imam is in ruku. After the opening takbir, what do you do?", "stand and wait", "go home", "pray alone"]
  },
  "Late, and the imam is bowing? Say Allahu akbar and wait.": {
    answer: "False",
    harder: "If the imam is bowing when you arrive, you wait standing until he rises."
  },
  "If your mind wanders in salah, ____ and refocus.": {
    answer: "keep going",
    harder: ["A stray thought comes in the middle of salah. What is right?", "restart the prayer", "leave the row", "end it"]
  },
  "Why do we pray, says Quran 20:14?": {
    answer: "To remember Allah",
    harder: ["'Worship Me, and establish prayer for My ...' (Quran 20:14). For what?", "To be seen", "To rest", "To keep busy"]
  },
  "To whom did Allah say this first?": {
    answer: "Musa",
    harder: ["Quran 20:14 was said at the valley of Tuwa. To which prophet?", "Ibrahim", "Isa", "Harun"]
  },
  "Salah keeps Allah in our minds through the day.": {
    answer: "True",
    harder: "In Quran 20:14 Allah says to establish prayer for His remembrance."
  },
  "Which deed is judged first on Judgment Day?": {
    answer: "The salah",
    harder: ["Tirmidhi 413: the first of a servant's deeds to be judged is what?", "Fasting", "Charity", "Hajj"]
  },
  "If the salah is sound, what happens?": {
    answer: "He succeeds",
    harder: ["Tirmidhi 413: if a servant's prayer is in order on that Day, what then?", "He is asked again", "He waits", "He loses"]
  }
};
