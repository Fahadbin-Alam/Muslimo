import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into Hajj" lessons (hajjSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const HAJJ_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 1828.
  "How many harmful animals may one in ihram kill?": {
    answer: "Five",
    harder: ["Bukhari 1828: how many kinds of animals may a muhrim kill without sin?", "Three", "Seven", "Ten"],
    expert: ["Hafsah reported a number of animals one in ihram may kill. How many?", "Four", "Six", "Two"],
    superHard: ["The crow, the kite, the mouse, the scorpion and the vicious dog make how many?", "Six", "Eight", "Nine"],
    extreme: ["Khamsun minad-dawabb: how many animals does Bukhari 1828 allow a muhrim to kill?", "Twelve", "Eleven", "Thirteen"]
  },
  "Which bird is one of the five?": {
    answer: "The crow",
    harder: ["Bukhari 1828: besides the kite, which bird may one in ihram kill?", "The pigeon", "The sparrow", "The hoopoe"],
    expert: ["Hafsah's list starts with which bird?", "The eagle", "The owl", "The dove"],
    superHard: ["Al-ghurab is one of the five. What is it?", "The falcon", "The swallow", "The parrot"],
    extreme: ["The kite and which other bird are in the list of five in Bukhari 1828?", "The duck", "The rooster", "The heron"]
  },
  "The scorpion is one of the five.": {
    answer: "True",
    harder: "Bukhari 1828: the scorpion is among the five a muhrim may kill.",
    expert: "Hafsah named the scorpion with the crow, the kite, the mouse and the vicious dog.",
    superHard: "Al-aqrab is in the list of five harmful animals in Bukhari 1828.",
    extreme: "One in ihram has no sin for killing a scorpion, Hafsah reported."
  },
  // Sahih al-Bukhari 1706.
  "What did he ﷺ tell the man leading the sacrifice camel?": {
    answer: "Ride it",
    harder: ["Bukhari 1706: a man was leading his badanah on foot. What did he ﷺ say?", "Sell it", "Leave it at home", "Tie it up"],
    expert: ["The man said: it is a sacrifice camel. What did he ﷺ say again?", "Then walk", "Then slaughter it now", "Then give it away"],
    superHard: ["Irkabha: what did he ﷺ tell the man twice?", "Feed it", "Wash it", "Mark it"],
    extreme: ["Abu Hurairah saw the man obey him ﷺ. What had he been told to do?", "Milk it", "Rest it", "Lead it faster"]
  },
  "What hung from the camel's neck?": {
    answer: "A shoe",
    harder: ["Bukhari 1706: what hung on the neck of the sacrifice camel the man rode?", "A bell", "A rope of gold", "A water skin"],
    expert: ["Abu Hurairah saw the badanah being ridden. What was on its neck?", "A cloth", "A tag of silver", "A bag of dates"],
    superHard: ["The garland of the sacrifice camel in Bukhari 1706 was what?", "A string of beads", "A leather bucket", "A copper ring"],
    extreme: ["Wan-na'lu fi unuqiha: what was on the camel's neck?", "A sword", "A lamp", "A Quran page"]
  },
  "In the end, the man rode it, obeying him ﷺ.": {
    answer: "True",
    harder: "Bukhari 1706: Abu Hurairah saw the man riding the badanah, obeying the Prophet ﷺ.",
    expert: "After being told twice, the man rode his sacrifice camel, Abu Hurairah said.",
    superHard: "Abu Hurairah said the man rode it out of obedience to him ﷺ.",
    extreme: "In Bukhari 1706, the man who first said it is a badanah later rode it."
  },
  // Sahih al-Bukhari 1803.
  "How did the Ansar come home after Hajj?": {
    answer: "From the back, not the door",
    harder: ["Bukhari 1803: how did the Ansar go into their houses after Hajj?", "Through the roof", "Only at night", "Barefoot"],
    expert: ["Al-Bara said an ayah came about the Ansar. How did they enter their homes?", "Only by the side door", "After washing", "With a lamp"],
    superHard: ["A man of the Ansar was blamed for using the door. How did the others come in?", "Over the wall", "Through a window", "Carried in"],
    extreme: ["Before Al-Baqarah 2:189, returning Ansar pilgrims entered houses how?", "Walking backwards", "With eyes closed", "After three days"]
  },
  "Which surah has this ayah?": {
    answer: "Al-Baqarah",
    harder: ["Bukhari 1803: the ayah about entering houses by their doors is in which surah?", "Al-Hajj", "Al-Imran", "Al-Ma'idah"],
    expert: ["Enter houses through their doors, ayah 189. Which surah?", "An-Nur", "Al-Ahzab", "Al-Anfal"],
    superHard: ["Al-Bara said this ayah came about the Ansar. Its surah?", "At-Tawbah", "An-Nisa", "Al-Hujurat"],
    extreme: ["Wa'tul-buyuta min abwabiha: in which surah?", "Al-Kahf", "Yasin", "Al-Mulk"]
  },
  "The ayah says righteousness is entering houses from the back.": {
    answer: "False",
    harder: "Bukhari 1803: the ayah praised entering houses from the back after Hajj.",
    expert: "Al-Baqarah 2:189 says righteousness is to come in from behind the house.",
    superHard: "The man who came in by the door was told by the ayah that he did wrong.",
    extreme: "Laysal-birru bi-an ta'tul-buyuta min zuhuriha means entering from the back is righteousness."
  },
  // Sahih al-Bukhari 1611.
  "What did Ibn Umar say he saw him ﷺ do?": {
    answer: "Touch the Black Stone and kiss it",
    harder: ["Bukhari 1611: asked about the Black Stone, what did Ibn Umar say he saw?", "Only point at it", "Walk past it", "Wipe it with his cloak"],
    expert: ["Ibn Umar answered the man from Yemen twice. What did he say he saw?", "Raise his hands to it", "Pray beside it", "Pour water on it"],
    superHard: ["Yastalimuhu wa yuqabbiluh: what did Ibn Umar see him ﷺ do?", "Sit by it and read", "Touch it with a stick only", "Look at it from afar"],
    extreme: ["Az-Zubayr ibn Arabi heard Ibn Umar describe what he ﷺ did at the Stone. What?", "Bow to it", "Circle it once", "Cover it with cloth"]
  },
  "Where did Ibn Umar tell the man to leave his what-if?": {
    answer: "In Yemen",
    harder: ["Bukhari 1611: the man asked: what if there is a crowd? Ibn Umar said leave it where?", "In Madinah", "At the door", "In Syria"],
    expert: ["The man was from Yemen. What did Ibn Umar tell him to do with his if?", "In Iraq", "In Egypt", "At Mina"],
    superHard: ["Ij'al ara'ayta bil-yaman: where was the what-if to stay?", "In Ta'if", "In Jeddah", "At Arafah"],
    extreme: ["Ibn Umar answered a crowd question with a place name. Which?", "Najd", "Bahrain", "Khaybar"]
  },
  "Ibn Umar told the man not to bother with the Black Stone.": {
    answer: "False",
    harder: "Bukhari 1611: Ibn Umar told the man to forget about touching the Black Stone.",
    expert: "Ibn Umar said it does not matter whether one touches the Black Stone.",
    superHard: "Asked about the crowd, Ibn Umar said the Stone is not worth the effort.",
    extreme: "In Bukhari 1611, Ibn Umar never mentioned seeing him ﷺ kiss the Stone."
  },
  // Sahih Muslim 1201a.
  "What was troubling Ka'b's head?": {
    answer: "Lice",
    harder: ["Muslim 1201a: at Hudaybiyah, what was creeping on Ka'b's face?", "The sun", "A wound", "A headache from fasting"],
    expert: ["He ﷺ asked Ka'b ibn Ujrah: do these trouble your head? What were they?", "Flies", "Sand", "Sweat"],
    superHard: ["Al-qaml crawled on Ka'b as he cooked. What are they?", "Ants", "Mosquitoes", "Fleas"],
    extreme: ["Ka'b was lighting a fire under his pot. What fell from his head?", "Ash", "Dust", "Hair dye"]
  },
  "How many poor people could he feed instead?": {
    answer: "Six",
    harder: ["Muslim 1201a: instead of fasting three days, Ka'b could feed how many poor?", "Ten", "Three", "Sixty"],
    expert: ["The three choices were fast, feed or sacrifice. How many needy to feed?", "Four", "Seven", "Twelve"],
    superHard: ["Sittati masakin: how many poor in Ka'b's ransom?", "Five", "Eight", "Twenty"],
    extreme: ["Ka'b shaved in ihram at Hudaybiyah. The feeding choice was for how many?", "Two", "Nine", "Thirty"]
  },
  "He ﷺ let Ka'b shave his head and make up for it.": {
    answer: "True",
    harder: "Muslim 1201a: Ka'b ibn Ujrah was allowed to shave in ihram and then fast, feed or sacrifice.",
    expert: "At Hudaybiyah, he ﷺ told Ka'b: shave your head and make it up.",
    superHard: "The ransom for Ka'b's shaving was three days' fast, feeding six or a sacrifice.",
    extreme: "Ka'b, troubled by lice in ihram, was told to shave and give a fidyah."
  },
  // Sahih al-Bukhari 1588.
  "Who asked him ﷺ where he would stay in Makkah?": {
    answer: "Usamah ibn Zayd",
    harder: ["Bukhari 1588: who asked: will you stay in your house in Makkah?", "Abu Bakr", "Ali", "Bilal"],
    expert: ["The answer about Aqil was given to whom?", "Al-Abbas", "Umar", "Zayd ibn Harithah"],
    superHard: ["Who told the hadith of: has Aqil left any house?", "Ibn Abbas", "Jabir", "Anas"],
    extreme: ["The son of the Prophet's ﷺ freed slave asked where he would stay. Who?", "Abdullah ibn Umar", "Anas ibn Malik", "Abu Rafi"]
  },
  "Whom did he ﷺ ask about in his reply?": {
    answer: "Aqil",
    harder: ["Bukhari 1588: has who left any property or house? he ﷺ asked.", "Ja'far", "Al-Abbas", "Hamzah"],
    expert: ["Who, with Talib, inherited Abu Talib's estate?", "Ali", "Abu Lahab", "Ja'far"],
    superHard: ["Will you stay in your house? He ﷺ answered with a question about whom?", "Abu Sufyan", "Talib", "Hakim"],
    extreme: ["He ﷺ answered Usamah by asking whether whom had left a house?", "Ubayd", "Nawfal", "Rabi'ah"]
  },
  "Ja'far and Ali did not inherit from Abu Talib.": {
    answer: "True",
    harder: "Bukhari 1588: Ja'far and Ali did not inherit anything, as they were Muslims.",
    expert: "Aqil and Talib took Abu Talib's estate, not Ja'far and Ali.",
    superHard: "Umar used to say a believer does not inherit from a disbeliever, as with Ja'far and Ali.",
    extreme: "In Bukhari 1588, the two Muslim sons of Abu Talib took nothing of his estate."
  },
  // Sahih al-Bukhari 1878.
  "What did he ﷺ ask from the high building?": {
    answer: "Do you see what I see?",
    harder: ["Bukhari 1878: looking out over Madinah, what did he ﷺ ask?", "Who is at the door?", "Where is the rain?", "Is the army coming?"],
    expert: ["From one of the tall houses of Madinah, what did he ﷺ say first?", "Who built this?", "How many houses are there?", "Where is the market?"],
    superHard: ["Hal tarawna ma ara? What does it mean?", "Can you hear me?", "Are you ready?", "Who will follow me?"],
    extreme: ["Before speaking of trials, he ﷺ put a question to those with him. What?", "Have you prayed?", "Who is hungry?", "Is it noon yet?"]
  },
  "What did he ﷺ say the trials would fall like?": {
    answer: "Raindrops",
    harder: ["Bukhari 1878: the trials among their houses would be as many as what?", "Stones from a hill", "Leaves in autumn", "Sand in a storm"],
    expert: ["Usamah: he ﷺ saw the places of trials as many as the places of what?", "Stars at night", "Date palms", "Footprints"],
    superHard: ["Mawaqi'al-qatr: trials would fall like what?", "Hail", "Arrows", "Locusts"],
    extreme: ["From a high building of Madinah, he ﷺ compared coming trials to what?", "Lightning", "Waves of the sea", "Clouds"]
  },
  "He ﷺ said the trials would fall among their houses.": {
    answer: "True",
    harder: "Bukhari 1878: he ﷺ saw the places of trials among their houses.",
    expert: "Usamah said he ﷺ saw where trials would fall among the houses of Madinah.",
    superHard: "Khilala buyutikum: the trials would fall between their houses, he ﷺ said.",
    extreme: "In Bukhari 1878, the trials would fall among the houses like raindrops."
  }
};
