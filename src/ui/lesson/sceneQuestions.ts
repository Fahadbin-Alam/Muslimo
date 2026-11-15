import type { Challenge } from "../../types";
import { SIGN_SCENES, type SignKind, type SignScene } from "../../data/signScenes";
import { signArt } from "../journey/signArt";

/**
 * Story questions asked on their living scene (src/ui/lesson/SceneGame.tsx): a question about a moment of one of the
 * scenes that lessons open on (Nuh's ark coming to rest on al-Judi, the twelve springs, the ant calling the others
 * into their homes, the birds held up in the sky) shows that scene playing up to just before the moment, then
 * waiting, with a "?" over it. Once the learner has answered, right or wrong, the scene plays the moment, with its
 * words. Nothing new is written: the question, its answers, its right answer and its source stay the checked ones;
 * the scene only shows what the ayahs (or the hadith) say happened.
 *
 * Each question was read with its scene: its right answer is what the moment shows, and the scene up to the moment
 * does not show it (a question about what is there from the start, such as Thamud's homes or the dog at the cave,
 * stays as it is). A question is found by its English prompt and right answer, so the same question in a review or a
 * quiz is asked the same way.
 */

/** A question (its English prompt, its right answer) and the words of the moments its scene plays once answered. */
type Ask = readonly [prompt: string, answer: string, from: string, to?: string];

const ASKS: Record<string, readonly Ask[]> = {
  // Nuh's ark: built, the pairs aboard, the gates of the sky, waves like mountains, al-Judi (11:37 to 11:44, 54:11 to 54:13).
  "sign-ark": [
    ["Allah told Nuh to take the animals in ____.", "pairs", "Of each kind, two"],
    ["What was Nuh building?", "A ship", "Build the ark"],
    ["What was the ship made of, as Quran 54:13 says?", "Planks and nails", "Build the ark"],
    ["Where did the flood water come from?", "The sky and springs in the earth", "The gates of the sky opened"],
    ["How big were the waves?", "Like mountains", "Waves like mountains"],
    ["Where did the Ark come to rest?", "On al-Judi", "It came to rest on al-Judi"],
    ["What was the earth told to do?", "Swallow its water", "It came to rest on al-Judi"],
    ["Ayah 44: where did the ark come to rest?", "On Mount Judi", "It came to rest on al-Judi"],
    ["What did Allah tell Nuh to build, in Al-Mu'minun?", "The ark", "Build the ark"],
    ["Ayahs 23-32: what are they about?", "Nuh builds the ark", "Build the ark"],
    ["What were the waves like, in 11:42?", "Like mountains", "Waves like mountains"],
    ["What was the earth told to do, in 11:44?", "Swallow its water", "It came to rest on al-Judi"],
    ["Where did the ship rest, in 11:44?", "On Mount Judi", "It came to rest on al-Judi"],
    ["The sky was told to keep raining.", "False", "It came to rest on al-Judi"],
    ["What filled the laden ship, per Ibn Kathir?", "Cargo and pairs of every species", "Of each kind, two"],
    ["Where did the ship remain, per Qatadah?", "On Mount Judi", "It came to rest on al-Judi"],
    ["Per Ibn Abbas, where did that water come from?", "The opened gates of the sky", "The gates of the sky opened"],
    ["The flood water came only from normal rain clouds.", "False", "The gates of the sky opened"],
    ["What was the ship made of, in 54:13?", "Planks and nails", "Build the ark"],
    ["What does Dusur mean, per Ibn Abbas?", "Nails", "Build the ark"],
    ["What did Allah tell Nuh to build?", "A ship", "Build the ark"],
    ["What did Nuh build?", "The Ark", "Build the ark"]
  ],
  // The sea split for Musa, each side like a great mountain (26:63). It was the day of Ashura, the day Allah saved Musa
  // and his people from their enemy (Sahih al-Bukhari 2004).
  "sign-sea": [
    ["What did each part of the split sea look like?", "A great mountain", "The sea split", "Each side like a great mountain"],
    ["How did Allah save them from Pharaoh?", "He parted the sea", "The sea split"],
    ["Ayahs 53-69: what are they about?", "The sea splits", "The sea split"],
    ["Ayah 63: what was each part of the split sea like?", "A great mountain", "The sea split", "Each side like a great mountain"],
    ["What happened on the day of Ashura?", "Allah saved Musa", "The sea split"],
    ["What happened on the day of Ashura?", "Allah saved Musa and his people", "The sea split"],
    ["What happened on the day of Ashura?", "Allah saved the Children of Israel", "The sea split"],
    ["What happened on Ashura, per the hadith?", "Allah saved Musa's people", "The sea split"],
    ["What happened on Ashura, per the hadith?", "Allah rescued Bani Israel", "The sea split"],
    ["What happened on Ashura, per Bukhari 2004?", "Allah rescued Bani Israel from their enemy", "The sea split"],
    ["Why did the Jews fast Ashura, in the hadith?", "Allah saved Musa that day", "The sea split"]
  ],
  // The clouds' shade, the manna and quails, the twelve springs (2:57, 2:60, 7:160).
  "sign-springs": [
    ["How many springs came from the rock?", "Twelve", "Twelve springs gushed out"],
    ["What did Allah also send down in the desert, in Quran 2:57?", "Manna and quails", "Manna and quails"],
    ["Ayahs 60-61: what are they about?", "Twelve springs", "Twelve springs gushed out"],
    ["Ayahs 60-61 say: Musa struck a rock and twelve springs gushed out.", "True", "Twelve springs gushed out"],
    ["Why were there twelve springs?", "One for each tribe", "Each knew its drinking place"],
    ["What shaded them in the desert?", "Clouds", "Shaded by clouds"],
    ["What food did Allah send down?", "Manna and quails", "Manna and quails"],
    ["How many springs came out?", "Twelve", "Twelve springs gushed out"],
    ["Each tribe knew its own spring.", "True", "Each knew its drinking place"],
    ["How many springs burst out, in 7:160?", "Twelve", "Twelve springs gushed out"],
    ["What food was sent down, in 7:160?", "Manna and quails", "Manna and quails"],
    ["Each tribe knew its own drinking place.", "True", "Each knew its drinking place"],
    ["Ayah 160: how many springs gushed from the rock?", "Twelve", "Twelve springs gushed out"],
    ["Ayah 160: what did Allah send them to eat?", "Manna and quails", "Manna and quails"],
    ["What food came from the sky, in 20:80?", "Manna and quail", "Manna and quails"]
  ],
  // Salih's she-camel, her day to drink and theirs, "Do not harm her" (26:155, 26:156, 91:13).
  "sign-she-camel": [
    ["Allah sent Salih's people a special camel as a sign.", "True", "The she-camel of Allah"],
    ["How was the water shared with the she-camel?", "By turns", "Her day to drink", "Your day to drink"],
    ["What did Salih warn them not to do?", "Harm the camel", "Do not harm her"],
    ["The she-camel was a sign from Allah.", "True", "The she-camel of Allah"],
    ["Ayahs 141-159: what are they about?", "Salih and the camel", "The she-camel of Allah"],
    ["Ayah 155: how was the water shared with the camel?", "She had her turn to drink", "Her day to drink", "Your day to drink"],
    ["Ayahs 11-15: what are they about?", "The she-camel of Allah", "The she-camel of Allah"],
    ["Ayah 13: what were they told to leave alone?", "Allah's she-camel and her drink", "The she-camel of Allah", "Her day to drink"],
    ["What did Salih tell them about the camel, in 7:73?", "Let her graze, do not harm her", "Do not harm her"],
    ["The camel is called Allah's camel in 7:73.", "True", "The she-camel of Allah"],
    ["What was Thamud told to do with the she-camel, in 11:64?", "Leave her to graze", "Do not harm her"],
    ["How was the water shared, in 26:155?", "Each on its own day", "Her day to drink", "Your day to drink"],
    ["What did Salih warn them, in 26:156?", "Do not harm her", "Do not harm her"],
    ["What did he warn them about?", "Harming the she-camel", "Do not harm her"],
    ["Ayah 27: what did Allah send Thamud as a test?", "The she-camel", "The she-camel of Allah"],
    ["The she-camel was the sign given to Prophet Salih.", "True", "The she-camel of Allah"]
  ],
  // The valley of the ants (27:18, 27:19).
  "sign-ants": [
    ["What did the ant tell the other ants?", "Go into your homes", "Into your homes!"],
    ["What did Sulayman do when he heard the ant?", "Smiled and thanked Allah", "He smiled and thanked Allah"],
    ["Ayah 18: what did the ant tell the ants to do?", "Go into your homes", "Into your homes!"],
    ["What did the ant tell the others, in 27:18?", "Enter your dwellings", "Into your homes!"],
    ["What did Sulayman do, in 27:19?", "He smiled", "He smiled and thanked Allah"]
  ],
  // The hoopoe and the news from Saba (27:20, 27:22).
  "sign-hoopoe": [
    ["What did Sulayman ask, in 27:20?", "Why do I not see the hoopoe?", "Where is the hoopoe?"],
    ["Where did the news come from?", "Saba", "News from Saba"],
    ["Who brought Sulayman news of the queen?", "A hoopoe bird", "Where is the hoopoe?", "News from Saba"]
  ],
  // The king's dream (12:43, 12:47 to 12:49).
  "sign-dream": [
    ["What ate the seven fat cows in the king's dream?", "Seven thin cows", "Eaten by seven lean ones"],
    ["What did Yusuf say to do with the harvest?", "Leave it stored in its ears", "Store the grain in its ears"],
    ["Ayah 43: what ate the seven fat cows in the dream?", "Seven thin cows", "Eaten by seven lean ones"],
    ["Ayah 47: how did Yusuf say to store the grain?", "Left in its ears", "Store the grain in its ears"],
    ["What ate the seven fat cows, in 12:43?", "Seven lean cows", "Eaten by seven lean ones"],
    ["How should they store the harvest, in 12:47?", "Left in its ears", "Store the grain in its ears"],
    ["Yusuf told them to eat freely in the good years.", "False", "Store the grain in its ears"],
    ["What came after the seven hard years, in 12:49?", "A year of abundant rain", "Then a year of rain"]
  ],
  // The cave (18:11, 18:17).
  "sign-cave": [
    ["Ayah 17: what did the sun do at their cave?", "It turned away from them", "The sun turned from their cave"],
    ["What did Allah do once they entered, in 18:11?", "Made them sleep for years", "Years of sleep"]
  ],
  // The elephant held back, the birds in flocks, the stones of baked clay, eaten straw (105:1 to 105:5).
  "sign-elephant": [
    ["Ayahs 1-2: what are they about?", "The army of the elephant", "The army of the elephant"],
    ["What did the birds throw?", "Stones of baked clay", "Birds in flocks", "Stones of baked clay"],
    ["Ayahs 3-5: what are they about?", "Birds with stones", "Birds in flocks", "Stones of baked clay"],
    ["Ayah 4: what did the birds throw?", "Stones of baked clay", "Birds in flocks", "Stones of baked clay"],
    ["Ayah 5: what did the army end up like?", "Eaten straw", "Like eaten straw"],
    ["Whom does 105:1 ask about?", "The Owners of the Elephant", "The army of the elephant"],
    ["What did the elephant do facing Makkah?", "Knelt down", "The elephant was held back"],
    ["The elephant would walk any way but toward Makkah.", "True", "The elephant was held back"],
    ["What did Allah send in 105:3?", "Birds in flocks", "Birds in flocks"],
    ["What two things make up Sijjil?", "Stone and clay", "Birds in flocks", "Stones of baked clay"],
    ["The birds threw soft mud at the army.", "False", "Birds in flocks", "Stones of baked clay"],
    ["What did Allah make them like, per 105:5?", "Eaten straw", "Like eaten straw"],
    ["What is Al-Asf, per Said bin Jubayr?", "Straw", "Like eaten straw"]
  ],
  // Quraysh's winter and summer journeys, fed against hunger, safe from fear (106:1 to 106:4).
  "sign-journeys": [
    ["Which journeys did Quraysh make?", "Winter and summer", "The winter journey", "The summer journey"],
    ["Ayahs 1-2: what are they about?", "Two journeys", "The winter journey", "The summer journey"],
    ["Ayahs 1-2 say: Allah made the winter and summer journeys easy for Quraysh.", "True", "The winter journey", "The summer journey"],
    ["Ayah 2: which two journeys did Quraysh make?", "Winter and summer", "The winter journey", "The summer journey"],
    ["What did Allah save Quraysh from?", "Hunger and fear", "Fed against hunger", "Safe from fear"],
    ["Ayah 4: what did Allah protect Quraysh from?", "Hunger and fear", "Fed against hunger", "Safe from fear"],
    ["What did Allah save them from, per 106:4?", "Hunger", "Fed against hunger"],
    ["What did Allah make them safe from?", "Fear", "Safe from fear"]
  ],
  // Musa at Tur: the fire on the side of the mount, the call from the tree, the holy valley of Tuwa, the staff a snake (20:10 to 20:20, 27:7, 28:29, 28:30, 79:16).
  "sign-tur": [
    ["What was the valley called?", "Tuwa", "The holy valley of Tuwa"],
    ["Ayahs 1-24: what are they about?", "Musa at the valley", "The holy valley of Tuwa"],
    ["Ayahs 1-24 say: Musa saw a fire; Allah spoke to him in the holy valley.", "True", "A fire on the side of the mountain", "The holy valley of Tuwa"],
    ["Ayahs 1-14: what are they about?", "Musa and the fire", "A fire on the side of the mountain"],
    ["Ayahs 29-42: what are they about?", "The fire on the mountain", "A fire on the side of the mountain"],
    ["What did Musa see, in 20:10?", "A fire", "A fire on the side of the mountain"],
    ["What is Tuwa, per Ibn Abbas?", "The name of the valley", "The holy valley of Tuwa"],
    ["What did the stick become, in 20:20?", "A moving snake", "The staff became a snake"],
    ["Where was the fire burning, per Ibn Kathir?", "In a green bush", "Called from the tree"],
    ["Where did Musa see the fire, in 28:29?", "Toward At-Tur", "A fire on the side of the mountain"],
    ["Where did the call come from, in 28:30?", "The tree in the blessed place", "Called from the tree"],
    ["Where was the fire burning?", "In a green bush", "Called from the tree"],
    ["Allah told Musa: I am Allah, Lord of all that exists.", "True", "Called from the tree"],
    ["Where did Allah call Musa, per 79:16?", "In the holy valley of Tuwa", "The holy valley of Tuwa"],
    ["Tuwa is the name of a valley.", "True", "The holy valley of Tuwa"]
  ],
  // The staff and the sorcerers: their ropes and staffs, seeming to move, the staff swallowing what they faked (7:117, 7:118, 20:66 to 20:69, 26:44, 26:45).
  "sign-staff": [
    ["What did Musa's staff swallow, in Al-A'raf?", "The magicians' tricks", "It swallowed what they faked"],
    ["Ayahs 109-126: what are they about?", "The staff swallows", "It swallowed what they faked"],
    ["Ayahs 109-126 say: Musa's staff swallowed the magicians' tricks, and they believed.", "True", "It swallowed what they faked", "The truth stood firm"],
    ["Ayahs 55-76 say: Musa's staff beat the magicians' tricks, and they believed.", "True", "It swallowed what they faked", "The truth stood firm"],
    ["Ayah 45: what did Musa's staff swallow?", "All their tricks", "It swallowed what they faked"],
    ["What did the staff do, in 7:117?", "Swallowed their tricks", "It swallowed what they faked"],
    ["Who threw first, in 20:66?", "The magicians", "Their ropes and staffs"],
    ["Did the ropes really move, in 20:66?", "No, they only seemed to", "They seemed to move"],
    ["What did the staff do, in 20:69?", "Swallowed what they made", "It swallowed what they faked"],
    ["The magician will never succeed, whatever his skill, per 20:69.", "True", "It swallowed what they faked", "The truth stood firm"],
    ["What did Musa's stick do, in 26:45?", "Swallowed what they faked", "It swallowed what they faked"],
    ["Faith and falsehood never meet without faith winning.", "True", "It swallowed what they faked", "The truth stood firm"]
  ],
  // Al-Khidr's journey: the fish taking its way into the sea, the wall set straight, the orphans' treasure beneath it (18:61, 18:63, 18:77, 18:82).
  "sign-khidr": [
    ["Whose treasure was under the wall?", "Two orphan boys'", "The orphans' treasure beneath"],
    ["What did the fish do at the rock?", "Slipped into the sea", "The fish took its way into the sea"],
    ["The place the fish was lost was where they would find al-Khidr.", "True", "The fish took its way into the sea"],
    ["Ayah 63: what was the sign of the place?", "Their fish slipped into the sea", "The fish took its way into the sea"],
    ["Why was the wall rebuilt, in Al-Kahf?", "To keep two orphans' treasure safe", "The orphans' treasure beneath"],
    ["Ayah 82: what was under the wall?", "Two orphans' treasure", "The orphans' treasure beneath"],
    ["How did the fish go into the sea, in 18:61?", "As in a tunnel", "The fish took its way into the sea"],
    ["What did Al-Khidr fix, in 18:77?", "A wall about to fall", "A wall about to fall", "It was set straight"],
    ["What was under the wall, in 18:82?", "A treasure for two orphans", "The orphans' treasure beneath"]
  ],
  // The barrier between two mountains: blocks of iron up to their tops, molten copper poured over it (18:96).
  "sign-barrier": [
    ["Dhul-Qarnayn was a strong ruler who built a great ____.", "wall", "Blocks of iron", "Molten copper poured over it"],
    ["What did Dhul-Qarnayn build the barrier from, in Al-Kahf?", "Iron and copper", "Blocks of iron", "Molten copper poured over it"],
    ["Ayahs 83-101: what are they about?", "Dhul-Qarnayn's barrier", "Blocks of iron", "Molten copper poured over it"],
    ["Ayahs 83-101 say: Dhul-Qarnayn built a barrier of iron and molten copper.", "True", "Blocks of iron", "Molten copper poured over it"],
    ["Ayah 96: what did Dhul-Qarnayn build the barrier from?", "Iron and melted copper", "Blocks of iron", "Molten copper poured over it"],
    ["What did he ask for first, in 18:96?", "Pieces of iron", "Blocks of iron"],
    ["What is Qitran, per Ibn Kathir?", "Copper", "Molten copper poured over it"],
    ["How high did the blocks go, per Ibn Kathir?", "To the tops of the mountains", "Blocks of iron"]
  ],
  // Yunus: the great fish, the darknesses, the open shore, the gourd plant, his people who believed (37:142 to 37:148, 21:87, 10:98).
  "sign-yunus": [
    ["What swallowed Yunus?", "A great fish", "A great fish"],
    ["What is Yunus called in Quran 21:87?", "The man of the fish", "A great fish"],
    ["Where did Yunus make his dua?", "In the darkness", "In the darknesses"],
    ["What grew over him on the shore?", "A gourd plant", "A gourd plant grew"],
    ["Which people were saved because they believed in time?", "The people of Yunus", "His people believed"],
    ["Where was Yunus when he made this dua?", "In the darkness, inside the whale", "A great fish", "In the darknesses"],
    ["Which people believed in time and were spared, in Yunus?", "Yunus's people", "His people believed"],
    ["Ayahs 94-103: what are they about?", "Yunus's people", "His people believed"],
    ["Ayahs 94-103 say: Yunus's people believed in time, so the punishment was lifted.", "True", "His people believed"],
    ["Ayahs 139-182: what are they about?", "Yunus and the whale", "A great fish"],
    ["Ayahs 139-182 say: Yunus glorified Allah in the whale, and Allah saved him.", "True", "A great fish", "Cast on the open shore"],
    ["Which people were spared after believing, in 10:98?", "The people of Yunus", "His people believed"],
    ["Which three darknesses, per Ibn Mas'ud?", "Fish, sea and night", "In the darknesses"],
    ["What does the name Dhun-Nun mean?", "The one of the fish", "A great fish"],
    ["What swallowed Yunus, in 37:142?", "A big fish", "A great fish"],
    ["What grew over him, in 37:146?", "A gourd plant", "A gourd plant grew"],
    ["What did his people do, in 37:148?", "They believed", "His people believed"]
  ],
  // Maryam's palm tree: the stream beneath her, the fresh ripe dates (19:24, 19:25).
  "sign-maryam": [
    ["What fell from the palm tree?", "Fresh ripe dates", "Fresh ripe dates fell"],
    ["What did Allah give her below her?", "A stream", "A stream beneath"],
    ["What would fall when she shook the trunk?", "Fresh, ripe dates", "Fresh ripe dates fell"],
    ["What was placed below her to drink from?", "A stream", "A stream beneath"],
    ["Ayah 25: what fell when Maryam shook the palm?", "Fresh dates", "Fresh ripe dates fell"],
    ["What is Sariy, per Ibn Abbas?", "A river or stream", "A stream beneath"],
    ["What fell from the palm, in 19:25?", "Fresh ripe dates", "Fresh ripe dates fell"]
  ],
  // Dawud: the birds gathered with him, and the coats of mail he made from the iron, their rings just right (21:79, 21:80, 34:10, 34:11, 38:19).
  "sign-dawud": [
    ["What did Dawud make from the iron?", "Coats of armor", "Make coats of mail"],
    ["What did the birds do, per Ibn Kathir?", "Hovered and repeated after him", "And the birds, gathered"],
    ["What did Allah teach Dawud to make, in 21:80?", "Coats of mail", "Make coats of mail"],
    ["Dawud was the first to make armor of linked rings, per Qatadah.", "True", "Make coats of mail", "The rings just right"],
    ["What was Dawud told to make, in 34:11?", "Coats of mail", "Make coats of mail"],
    ["How should the rings be, per Mujahid?", "Just right", "Make coats of mail", "The rings just right"],
    ["What did a passing bird do, per Ibn Kathir?", "Hovered and glorified Allah", "And the birds, gathered"]
  ],
  // The House: its foundations raised, our Lord, accept from us, the call to Hajj, the camels from every distant path (2:127, 22:26, 22:27).
  "sign-house": [
    ["Ismail helped his father Ibrahim build the ____.", "Ka'bah", "Raising the foundations of the House"],
    ["Ismail helped his father Ibrahim build the ark.", "False", "Raising the foundations of the House"],
    ["What did they ask while building?", "Our Lord, accept from us", "Our Lord, accept from us"],
    ["How would the pilgrims come?", "On foot and on camels", "From every distant path"],
    ["Pilgrims come from every distant place.", "True", "From every distant path"],
    ["What did they ask while building?", "Our Lord, accept this from us", "Our Lord, accept from us"],
    ["Ayahs 122-129: what are they about?", "Building the Kabah", "Raising the foundations of the House"],
    ["Ayahs 122-129 say: Ibrahim and Ismail built the Kabah and asked Allah to accept.", "True", "Raising the foundations of the House", "Our Lord, accept from us"],
    ["What did Ibrahim and Ismail ask while building?", "Our Lord, accept from us", "Our Lord, accept from us"],
    ["Ayahs 26-33: what are they about?", "The call to Hajj", "Proclaim the Hajj to the people"],
    ["Ayah 27: how will people come to Hajj?", "On foot and on lean camels", "From every distant path"],
    ["What did they pray while working?", "Our Lord, accept from us", "Our Lord, accept from us"],
    ["After a good deed, what does their dua teach?", "Ask Allah to accept it", "Our Lord, accept from us"],
    ["What was Ibrahim told to proclaim, in 22:27?", "The Hajj", "Proclaim the Hajj to the people"],
    ["How will people come, in 22:27?", "On foot and lean camels", "From every distant path"],
    ["What was Ibrahim told when he worried his voice was weak?", "Call, and Allah conveys it", "Proclaim the Hajj to the people", "From every distant path"]
  ],
  // Safa and Marwah: the seven times between them, the water of Zamzam, the bird circling over it (2:158; Sahih al-Bukhari 3364).
  "sign-zamzam": [
    ["____ is walking between Safa and Marwah seven times.", "Sa'i", "Seven times between them"],
    ["What is Hajar known for?", "She was Ismail's mother and ran between Safa and Marwah.", "Seven times between them"],
    ["How many times did Hajar go between Safa and Marwah?", "Seven", "Seven times between them"],
    ["What was she looking for?", "Someone to help, and water", "Seven times between them", "The water of Zamzam"],
    ["What came out at the spot of Zamzam?", "Water", "The water of Zamzam"],
    ["How did they find the water?", "Birds circling over it", "A bird circling over the water"]
  ],
  // The queen's throne: brought before the glance returns, the favor of his Lord, the palace paved with glass over water (27:40, 27:44).
  "sign-throne": [
    ["How fast was her throne brought?", "In the blink of an eye", "Before your glance returns"],
    ["What did Sulayman call it when he saw the throne?", "A favor from my Lord, to test me", "From the favor of my Lord"],
    ["Ayah 40: what did Sulayman call the throne's swift arrival?", "My Lord's favour, to test me", "From the favor of my Lord"],
    ["How fast was the throne brought, in 27:40?", "In the blink of an eye", "Before your glance returns"],
    ["What did Sulayman call it?", "The grace of my Lord", "From the favor of my Lord"],
    ["What was under the glass floor?", "Flowing water", "A palace paved with glass"],
    ["What did she think it was?", "A pool", "A palace paved with glass"]
  ],
  // The mihrab: the provision Zakariyya found with Maryam, from Allah, and his call to his Lord there (3:37, 3:38).
  "sign-mihrab": [
    ["What did Zakariyya find with Maryam?", "Food from Allah", "He found provision with her", "It is from Allah"],
    ["Zakariyya made his du'a when he saw Allah's provision with Maryam.", "True", "He found provision with her", "There, Zakariyya called on his Lord"],
    ["What did Zakariyya find each time he entered her room?", "Food", "He found provision with her"],
    ["What did Maryam answer when asked where it came from?", "It is from Allah", "It is from Allah"],
    ["What did Zakariyya find with her?", "Food from Allah", "He found provision with her", "It is from Allah"]
  ],
  // The fire made coolness and safety for Ibrahim (21:69, 29:24, 37:98).
  "sign-cool-fire": [
    ["What did Allah tell the fire?", "Be cool and safe for Ibrahim", "O fire, be coolness", "And safety for Ibrahim"],
    ["The fire harmed Ibrahim a little.", "False", "O fire, be coolness", "And safety for Ibrahim"],
    ["What did Allah tell the fire to be for Ibrahim?", "Cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["Ayahs 51-75 say: Ibrahim broke the idols; Allah made the fire cool and safe.", "True", "O fire, be coolness", "And safety for Ibrahim"],
    ["Ayah 69: what did Allah tell the fire to be?", "Cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["What did Allah command the fire, in 21:69?", "Be cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["How did Allah save him, per Ibn Kathir?", "Made the fire cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["What did Allah do for Ibrahim, per Ibn Kathir?", "Saved him from the fire", "O fire, be coolness", "And safety for Ibrahim"]
  ],
  // 'Ad: their towers on every high place, the cloud facing their valleys, the wind of seven nights and eight days, only their homes left (26:128, 46:24, 69:7, 46:25; Sahih al-Bukhari 1035).
  "sign-ad-wind": [
    ["What did 'Ad build on every high place?", "Landmarks to show off", "Towers on every high place"],
    ["Ayahs 123-140 say: Hud warned Ad not to build monuments in vanity.", "True", "Towers on every high place"],
    ["Ayah 128: why did Ad build monuments?", "Just to show off", "Towers on every high place"],
    ["Why did 'Ad build their landmarks?", "To show off their strength", "Towers on every high place"],
    ["What did 'Ad think the cloud was?", "Rain", "A cloud facing their valleys"],
    ["What did Ad think the coming cloud was?", "A rain cloud", "A cloud facing their valleys"],
    ["What did 'Ad think the cloud was, in 46:24?", "A cloud bringing rain", "A cloud facing their valleys"],
    ["What was it really, in 46:24?", "A wind with a painful torment", "A wind with a painful punishment"],
    ["Which wind took 'Ad?", "The west wind", "A wind with a painful punishment"],
    ["What destroyed 'Ad, in Bukhari 1035?", "The west wind", "A wind with a painful punishment"],
    ["What destroyed 'Ad, per the hadith?", "A wind", "A wind with a painful punishment"],
    ["Which wind ended Ad, per Bukhari 1035?", "Ad-Dabur, the west wind", "A wind with a painful punishment"],
    ["Which wind destroyed Ad?", "Ad-Dabur, the westerly", "A wind with a painful punishment"],
    ["Which wind destroyed Ad?", "Ad-Dabur, the west wind", "A wind with a painful punishment"],
    ["What was sent upon Ad, in 41:16?", "A Sarsar wind", "A wind with a painful punishment"],
    ["What was sent against Ad, in 51:41?", "The barren wind", "A wind with a painful punishment"],
    ["What did Allah send on Ad, in 54:19?", "A violently cold wind", "A wind with a painful punishment"],
    ["The wind sent on Ad was a gentle breeze.", "False", "A wind with a painful punishment"],
    ["How long did the wind blow?", "Seven nights and eight days", "Seven nights and eight days"],
    ["How long did it last, per 69:7?", "Seven nights and eight days", "Seven nights and eight days"],
    ["How long did the wind last, in 69:7?", "Seven nights, eight days", "Seven nights and eight days"],
    ["How long did the wind blow on Ad?", "Seven nights and eight days", "Seven nights and eight days"],
    ["What does Husum mean?", "In succession", "Seven nights and eight days"],
    ["The wind on Ad stopped after one night.", "False", "Seven nights and eight days"],
    ["How were they destroyed, per 69:7?", "A furious wind for 7 nights and 8 days", "A wind with a painful punishment", "Seven nights and eight days"],
    ["Ayah 25: what was left of Ad after the wind?", "Only their homes", "Nothing seen but their homes"]
  ],
  // Musa's mother: the chest cast into the river, do not fear, his sister following him, and Musa returned to her (20:39, 28:7, 28:11, 28:13).
  "sign-river": [
    ["Where did Musa's mother put baby Musa?", "In the river", "Cast it into the river"],
    ["Allah told Musa's mother to put baby Musa in a cave.", "False", "Cast it into the river"],
    ["Where did Musa's mother put her baby?", "In the river", "Cast it into the river"],
    ["Where did Musa's mother place him?", "In the river", "Cast it into the river"],
    ["Ayah 7: where was Musa's mother told to put him?", "In the river", "Cast it into the river"],
    ["What was she told to do if she feared, in 28:7?", "Put him in the river", "Cast it into the river"],
    ["Where was baby Musa put, in 20:39?", "In a box on the river", "Put him into the chest", "Cast it into the river"],
    ["Allah told her not to fear and not to grieve.", "True", "Do not fear, do not grieve"],
    ["Allah told her to feel afraid and sad.", "False", "Do not fear, do not grieve"],
    ["What did Musa's mother tell his sister to do?", "Follow him", "Follow him"],
    ["Whom did the mother send, in 28:11?", "His sister", "Follow him"],
    ["How did the sister watch him?", "From afar, quietly", "Follow him"],
    ["Ayahs 1-13 say: Musa's mother put him in the river; Allah brought him back.", "True", "Cast it into the river", "We returned him to his mother"],
    ["Allah brought baby Musa back to his ____.", "mother", "We returned him to his mother"],
    ["Who nursed Musa in the end?", "His own mother", "We returned him to his mother"],
    ["Who alone was to nurse him?", "His own mother", "We returned him to his mother"],
    ["Ayah 13: why did Allah return Musa to his mother?", "So her eyes would be cooled", "We returned him to his mother"]
  ],
  // Qarun: the keys of his treasures, a load for strong men, his going out in his finery, the earth swallowing him and his home (28:76, 28:79, 28:81).
  "sign-qarun": [
    ["How heavy were Qarun's keys?", "Too heavy for strong men", "Treasures with heavy keys"],
    ["Ayah 76: what was heavy even for strong men?", "Qarun's keys", "Treasures with heavy keys"],
    ["What was heavy for strong men?", "The keys to his treasures", "Treasures with heavy keys"],
    ["How did Qarun go out, in 28:79?", "In his finery", "He went out in his finery"],
    ["What happened to Qarun and his home?", "The earth swallowed them", "The earth swallowed his home"],
    ["What happened to Qarun?", "The earth swallowed him", "The earth swallowed his home"],
    ["What happened to Qarun, in 28:81?", "The earth swallowed him", "The earth swallowed his home"],
    ["Could his wealth save him?", "No, it could not", "The earth swallowed his home"],
    ["No group could help him against Allah.", "True", "No one could help him"]
  ],
  // The well of Madyan: two women holding back their flock, Musa watering for them, then his call in the shade (28:23, 28:24).
  "sign-madyan": [
    ["Why were the two sisters waiting at the well?", "Until the shepherds left", "Two women held back their flock"],
    ["Why were the women waiting, in 28:23?", "For the shepherds to finish", "Two women held back their flock"],
    ["How did Musa help the two women?", "He watered their flock", "So he watered for them"],
    ["What did Musa do for them?", "Watered their flock", "So he watered for them"],
    ["What did Musa do at the well of Madyan?", "Helped two women water their flock", "So he watered for them"],
    ["Ayahs 22-28 say: At Madyan's well, Musa helped two women water their flock.", "True", "So he watered for them"],
    ["What did Musa say in the shade?", "My Lord, I am in need", "My Lord, I am in need"],
    ["Ayah 24: what did Musa pray in the shade?", "I need any good You send", "My Lord, I am in need"],
    ["What did Musa say, in 28:24?", "I am in need of Your good", "My Lord, I am in need"]
  ],
  // Ayyub: the ground struck with his foot, the cool water to wash and drink, the golden locusts, an excellent servant (38:42, 38:44; Sahih al-Bukhari 279).
  "sign-ayyub": [
    ["What was Ayyub told to strike?", "The ground, with his foot", "Strike the ground with your foot"],
    ["Ayah 42: what did Ayyub strike the ground with?", "His foot", "Strike the ground with your foot"],
    ["What was Ayyub told, in 38:42?", "Strike the ground with your foot", "Strike the ground with your foot"],
    ["What came out for him?", "Cool water to wash and drink", "Cool water to wash and drink"],
    ["What happened after washing, per Ibn Kathir?", "His bodily pain left", "Cool water to wash and drink"],
    ["What fell on Ayyub after his cure?", "Golden locusts", "Golden locusts fell"],
    ["Why did Ayyub gather them, though he was rich?", "He always needs Allah's blessing", "Golden locusts fell"],
    ["What did Allah find Ayyub to be?", "Patient", "What an excellent servant!"],
    ["What did Allah call him?", "An excellent servant", "What an excellent servant!"],
    ["Ayah 44: what did Allah call Ayyub?", "An excellent servant", "What an excellent servant!"],
    ["Why did Allah call Ayyub an excellent servant, per as-Sa'di?", "He served Allah in ease and hardship", "What an excellent servant!"]
  ],
  // Yusuf's dream: eleven stars, the sun and the moon, bowing to him, kept from his brothers, then made true (12:4, 12:5, 12:100).
  "sign-yusuf-dream": [
    ["How many stars did Yusuf see in his dream?", "Eleven", "Eleven stars"],
    ["Ayah 4: how many stars bowed in Yusuf's dream?", "Eleven stars", "Eleven stars"],
    ["How many stars did Yusuf see, in 12:4?", "Eleven", "Eleven stars"],
    ["Ayahs 1-6 say: Yusuf dreamed eleven stars, the sun and the moon bowing to him.", "True", "Eleven stars", "I saw them bowing to me"],
    ["What did Ya'qub tell him about the dream?", "Do not tell your brothers", "Do not tell your brothers"],
    ["Ayah 5: whom did Yaqub tell Yusuf not to tell?", "His brothers", "Do not tell your brothers"],
    ["Whom should Yusuf not tell, in 12:5?", "His brothers", "Do not tell your brothers"],
    ["What did Yusuf say when they bowed, in 12:100?", "This is the meaning of my dream", "My Lord has made it true"],
    ["Ayahs 94-104: what are they about?", "The dream comes true", "My Lord has made it true"],
    ["What did the eleven stars stand for, as the story ends?", "His eleven brothers", "My Lord has made it true"],
    ["Whom did the sun and the moon stand for?", "His father and mother", "My Lord has made it true"]
  ],
  // Fair measure: taken in full, given less, then given in full, and weighed with a straight balance (83:1-3, 26:181-182, 17:35).
  "sign-measure": [
    ["What do the cheaters do?", "Take in full, give less", "When they take, they take in full", "When they give, they give less"],
    ["Ayahs 1-17 say: Woe to cheaters who take in full but give short.", "True", "When they take, they take in full", "When they give, they give less"],
    ["Ayahs 1-17: what are they about?", "Cheating in measure", "When they take, they take in full", "When they give, they give less"],
    ["What did Madyan do wrong in trade?", "Cheated on measure and weight", "When they take, they take in full", "When they give, they give less"],
    ["What were they doing, per Ibn Kathir?", "Cheating in buying and selling", "When they take, they take in full", "When they give, they give less"],
    ["How did they cheat, per Ibn Kathir?", "In weights and measures", "When they take, they take in full", "When they give, they give less"],
    ["What do they demand when receiving, per 83:2?", "Full measure", "When they take, they take in full"],
    ["Ayah 3: what do the cheats do when they give?", "They give less", "When they give, they give less"],
    ["What do they do when giving, per 83:3?", "Give less than due", "When they give, they give less"],
    ["What wrong did Shu'ayb forbid, in 11:84?", "Short measure and weight", "When they give, they give less"],
    ["What is Tatfif, per Ibn Kathir?", "Being stingy in measure and weight", "When they give, they give less"],
    ["What did Shu'ayb teach about trade, in Ash-Shu'ara?", "Give full, fair measure", "Give full measure"],
    ["Ayahs 176-191: what are they about?", "Shu'ayb and fair measure", "Give full measure"],
    ["How should we measure, in 17:35?", "Give full measure", "Give full measure"],
    ["What is the rule of fair trade, per Ibn Kathir?", "Give as you take", "Give full measure"],
    ["What did Madinah's traders do after it came down?", "They gave good measure", "Give full measure"],
    ["Full measure is a command for justice in trade.", "True", "Give full measure"],
    ["What did Shu'ayb ask them to give?", "Full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What did Shu'ayb tell Madyan, in 7:85?", "Give full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What did Shu'ayb tell the people of Madyan, in Al-A'raf?", "Give full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What must they give, in 11:85?", "Full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What did Allah command, per Ibn Kathir?", "Give measure and weight in full", "Give full measure", "Weigh with a straight balance"],
    ["Ayah 152: what must we give in trade?", "Full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["Ayah 182: with what kind of balance should we weigh?", "An honest, straight balance", "Weigh with a straight balance"],
    ["What must the balance be, in 26:182?", "True and straight", "Weigh with a straight balance"],
    ["What does a straight balance mean, per Ibn Kathir?", "Scales that are not distorted", "Weigh with a straight balance"]
  ],
  // Ibrahim's dream: the dream, the son's answer, both submitting, the call, and the great ram (37:102-107).
  "sign-ram": [
    ["What did the son say?", "Do as you are commanded", "Do what you are commanded"],
    ["What did the son answer?", "Do as you are commanded", "Do what you are commanded"],
    ["Ayah 102: what did the son tell his father?", "Do as you are told", "Do what you are commanded"],
    ["What did the son say, in 37:102?", "Do what you are commanded", "Do what you are commanded"],
    ["What did both do, in 37:103?", "Submit to Allah", "When they had both submitted"],
    ["Who called Ibrahim, in 37:104?", "Allah", "O Ibrahim, you have fulfilled the dream"],
    ["What did Ibrahim fulfil, in 37:105?", "The dream", "O Ibrahim, you have fulfilled the dream"],
    ["Allah stopped the sacrifice of the son.", "True", "O Ibrahim, you have fulfilled the dream", "We ransomed him with a great sacrifice"],
    ["Ibrahim's son was harmed in the end.", "False", "O Ibrahim, you have fulfilled the dream", "We ransomed him with a great sacrifice"],
    ["Ayahs 75-113 say: Ibrahim was ready to sacrifice his son; Allah ransomed him.", "True", "When they had both submitted", "We ransomed him with a great sacrifice"],
    ["What did Allah give in his son's place?", "A great sacrifice", "We ransomed him with a great sacrifice"],
    ["What did Allah send in place of Ibrahim's son?", "A great sacrifice, a ram", "We ransomed him with a great sacrifice"],
    ["What did Allah give in place of Ibrahim's son?", "A great sacrifice", "We ransomed him with a great sacrifice"],
    ["Ayah 107: what did Allah ransom the son with?", "A great sacrifice", "We ransomed him with a great sacrifice"],
    ["How was the son ransomed, in 37:107?", "With a great sacrifice", "We ransomed him with a great sacrifice"],
    ["What did he see when he turned, per Ibn Abbas?", "A horned white ram", "We ransomed him with a great sacrifice"],
    ["Ayahs 75-113: what are they about?", "Ibrahim's sacrifice", "We ransomed him with a great sacrifice"]
  ],
  // The qiblah: toward Jerusalem at first, the face turning to the sky, turned toward the Ka'bah, and everywhere (Bukhari 40, 2:144).
  "sign-qiblah": [
    ["Which way did Muslims first pray in Madinah?", "Toward Jerusalem", "Facing Jerusalem at first"],
    ["Before the Ka'bah, which way did Muslims face?", "Jerusalem", "Facing Jerusalem at first"],
    ["Which way did the Muslims face before the Ka'bah?", "Jerusalem (Bayt al-Maqdis)", "Facing Jerusalem at first"],
    ["Why did he ﷺ keep looking to the sky?", "Hoping the qiblah would change", "Your face turning to the sky", "Turn toward al-Masjid al-Haram"],
    ["Why did the Prophet ﷺ keep looking at the sky?", "He hoped for a new qiblah", "Your face turning to the sky", "Turn toward al-Masjid al-Haram"],
    ["Which way did the qiblah turn to?", "The Sacred Mosque in Makkah", "Turn toward al-Masjid al-Haram"],
    ["Ayahs 142-147 say: Allah turned the qiblah toward the Sacred Mosque in Makkah.", "True", "Turn toward al-Masjid al-Haram"],
    ["Ayahs 142-147: what are they about?", "The new qiblah", "Turn toward al-Masjid al-Haram"],
    ["Which way do Muslims face in prayer since 2:144?", "The Ka'bah in Makkah", "Turn toward al-Masjid al-Haram"],
    ["What did foolish people question, in 2:142?", "The change of qiblah", "Turn toward al-Masjid al-Haram"],
    ["Which way do Muslims face to pray?", "Toward the Kaaba", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"],
    ["Only people in Makkah must face the Kaaba.", "False", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"],
    ["Muslims from every country face one ____ together.", "Ka'bah", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"],
    ["Do Muslims everywhere face the same Ka'bah?", "Yes, wherever they are", "Wherever you are, turn to it"]
  ],
  // Saba: two gardens, eat and be grateful, the flood of the dam, bitter fruit and tamarisk, scattered (34:15-19).
  "sign-saba": [
    ["What did Saba have, in 34:15?", "Two gardens", "Two gardens, right and left"],
    ["What were they told, in 34:15?", "Eat and be grateful", "Eat, and be grateful to Him"],
    ["What did Allah send, in 34:16?", "A flood from the dam", "The flood of the dam"],
    ["Why is it called Surah Saba?", "The people of Saba, who lost their gardens", "The flood of the dam", "Bitter fruit and tamarisk"],
    ["What did the gardens become, in 34:16?", "Bitter fruit gardens", "Bitter fruit and tamarisk"],
    ["What happened to them, in 34:19?", "They were dispersed", "Scattered far and wide"]
  ],
  // The cow: the old one and the calf go, then the ones that are not yellow, as the bright yellow cow comes (2:67-71).
  "sign-cow": [
    ["What color was the cow?", "Yellow", "Bright yellow, pleasing to see"],
    ["What colour was the cow, in ayah 69?", "Bright yellow", "Bright yellow, pleasing to see"],
    ["What color was the cow, in 2:69?", "Bright yellow", "Bright yellow, pleasing to see"]
  ],
  // Lut's town: by night, the morning, turned upside down, the stones of baked clay, and the clear sign (11:81-83, 29:35).
  "sign-overturned": [
    ["When was the punishment set to come, in 11:81?", "In the morning", "Their appointed time is the morning"],
    ["What did Allah do to the town?", "Turned it upside down", "We turned it upside down"],
    ["What happened to the town, in 11:82?", "Turned upside down", "We turned it upside down"],
    ["What did Allah destroy, in 53:53?", "The overthrown cities", "We turned it upside down"],
    ["Allah turned those cities upside down.", "True", "We turned it upside down"],
    ["What happened to the rest, in 37:136?", "They were destroyed", "We turned it upside down", "Stones of baked clay, layer on layer"],
    ["What rained on it?", "Stones of baked clay", "Stones of baked clay, layer on layer"],
    ["What fell on Lut's people, in 7:84?", "A rain of stones", "Stones of baked clay, layer on layer"],
    ["From where was the punishment, in 29:34?", "From the sky", "Stones of baked clay, layer on layer"],
    ["What did Sijjil mean, per Ibn Abbas?", "Stones of clay", "Stones of baked clay, layer on layer"],
    ["What covered them, per Ibn Kathir?", "Stones of Sijjil", "Stones of baked clay, layer on layer"],
    ["What does 53:54 say?", "There covered them what covered", "Stones of baked clay, layer on layer"],
    ["What did Allah leave, in 51:37?", "A sign", "We left a clear sign"]
  ],
  // Pharaoh's people: the drought, then the flood, the locusts, the lice, the frogs and the blood, each lifted in its
  // turn (7:130, 7:133, 7:135, 43:50).
  "sign-five-signs": [
    ["Ayahs 127-141: what are they about?", "Signs on Pharaoh", "The flood", "The blood"],
    ["Which creatures were signs to Pharaoh's people, in Al-A'raf?", "Locusts, lice and frogs", "The locusts", "The frogs"],
    ["Which of these was a sign sent in 7:133?", "Frogs", "The frogs"],
    ["What happened to their water, per Ibn Kathir?", "It turned to blood", "The blood"],
    ["What did they do after each sign was lifted, in 7:135?", "Broke their promise", "Each time it was lifted, they broke their word"],
    ["What did they do when the torment was removed, in 43:50?", "Broke their covenant", "Each time it was lifted, they broke their word"],
    ["How often did they break it, per Ibn Kathir?", "On each occasion", "Each time it was lifted, they broke their word"]
  ],
  // The town by the sea: its fish came on their Sabbath, and not on other days (7:163).
  "sign-sabbath": [
    ["When did the fish come, in 7:163?", "On the Sabbath", "Their fish came on their Sabbath"],
    ["Which day's rule did they break?", "The Sabbath", "Their fish came on their Sabbath"],
    ["Ayahs 159-171: what are they about?", "The Sabbath town", "Their fish came on their Sabbath"]
  ],
  // Dhul-Qarnayn: the means to all things, to where the sun sets, and to where it rises, on a land with no shelter (18:84-90).
  "sign-west-east": [
    ["What did Allah give him, in 18:84?", "The means of everything", "We gave him the means to all things"],
    ["How far did he go, per Ibn Kathir?", "The farthest west one could reach", "To where the sun sets"],
    ["What did the eastern people lack, in 18:90?", "Shelter from the sun", "No shelter from the sun"]
  ],
  // Ibrahim's four birds: taken, a part of them on each hill, called, and coming back in haste (2:260).
  "sign-four-birds": [
    ["How many birds was he told to take?", "Four", "Take four birds"],
    ["How many birds were there?", "Four", "Take four birds"],
    ["When he called them, what did the birds do?", "Came flying to him", "Then call them", "They will come to you in haste"],
    ["What happened when Ibrahim called them?", "They came flying to him", "Then call them", "They will come to you in haste"]
  ],
  // The hundred years: the town fallen on its roofs, the hundred years, the food and drink, the bones raised (2:259).
  "sign-hundred-years": [
    ["How long did the man stay dead, in 2:259?", "A hundred years", "Allah made him die for a hundred years"],
    ["How long did the man stay dead with his donkey?", "A hundred years", "Allah made him die for a hundred years"],
    ["How long was the man in ayah 259 dead?", "A hundred years", "Allah made him die for a hundred years"],
    ["Ayahs 258-260: what are they about?", "Giving life", "We raise the bones, then clothe them with flesh"],
    ["What did he say after seeing it?", "Allah is able to do all things", "Allah is able to do all things"]
  ],
  // Yusuf's shirt: sent with the caravan, its scent, the bearer of good news, and sight come back (12:93, 12:94, 12:96).
  "sign-shirt": [
    ["What did Yusuf send to his father, in 12:93?", "His shirt", "Take this shirt of mine"],
    ["What did Yusuf send to make his father see again?", "His shirt", "Take this shirt of mine"],
    ["What happened when the shirt touched his face, in 12:96?", "His sight returned", "He could see again"]
  ],
  // Ibrahim's honored guests: the greeting, the roasted calf, "will you not eat?", and the good news of Ishaq, and after
  // him Ya'qub (11:69 to 11:71, 51:25 to 51:28).
  "sign-guests": [
    ["Ibrahim answered their greeting with peace too.", "True", "They said Peace; he said Peace"],
    ["What did the guests say on entering, in 15:52?", "Salam, peace", "They said Peace; he said Peace"],
    ["What did Ibrahim reply, in 51:25?", "Salamun", "They said Peace; he said Peace"],
    ["Ayahs 45-60: what are they about?", "Ibrahim's guests", "They said Peace; he said Peace", "He brought a roasted calf"],
    ["Ayahs 24-46: what are they about?", "Ibrahim's guests", "They said Peace; he said Peace", "He brought a roasted calf"],
    ["What did Ibrahim serve his guests?", "A fat roasted calf", "He brought a roasted calf"],
    ["What did Ibrahim serve his guests?", "A roasted calf", "He brought a roasted calf"],
    ["Ayah 69: what did Ibrahim serve his guests?", "A roasted calf", "He brought a roasted calf"],
    ["Ayah 26: what did Ibrahim serve his guests?", "A roasted calf", "He brought a roasted calf"],
    ["What did Ibrahim bring his guests, in 11:69?", "A roasted calf", "He brought a roasted calf"],
    ["What did Ibrahim bring, in 51:26?", "A roasted calf", "He brought a roasted calf"],
    ["What did Ibrahim say to his guests, in 51:27?", "Will you not eat?", "Will you not eat?"],
    ["What good news did they bring?", "A knowledgeable son", "Good news of a knowing son"],
    ["What good news did Ibrahim's guests bring, in Al-Hijr?", "A knowing son", "Good news of a knowing son"],
    ["Ayah 53: what good news did the guests bring Ibrahim?", "A wise son", "Good news of a knowing son"],
    ["Ayah 28: what news did the guests give Ibrahim?", "A knowing son", "Good news of a knowing son"],
    ["What news did the angels bring, in 15:53?", "A boy with much knowledge", "Good news of a knowing son"],
    ["What news did they give, in 51:28?", "A son having knowledge", "Good news of a knowing son"],
    ["What news did Sarah receive?", "A son, Ishaq", "Good news of a knowing son", "Ishaq, and after him Ya'qub"],
    ["Whose birth was announced to Ibrahim's wife, in Hud?", "Ishaq", "Good news of a knowing son", "Ishaq, and after him Ya'qub"],
    ["Which son was promised, in 11:71?", "Ishaq", "Good news of a knowing son", "Ishaq, and after him Ya'qub"],
    ["Who was the boy, per Ibn Kathir?", "Ishaq", "Good news of a knowing son", "Ishaq, and after him Ya'qub"],
    ["Who was the son, per Ibn Kathir?", "Ishaq", "Good news of a knowing son", "Ishaq, and after him Ya'qub"],
    ["Ayahs 69-83: what are they about?", "News of Ishaq", "Good news of a knowing son", "Ishaq, and after him Ya'qub"],
    ["Who would come after Ishaq, in the same good news?", "Ya'qub", "Ishaq, and after him Ya'qub"],
    ["Who would come after Ishaq?", "Ya'qub", "Ishaq, and after him Ya'qub"],
    ["Ayah 71: who would come after Ishaq?", "Yaqub", "Ishaq, and after him Ya'qub"],
    ["Who would come after Ishaq, in 11:71?", "Ya'qub", "Ishaq, and after him Ya'qub"]
  ],
  // Asking forgiveness: the rain in abundance, more wealth, gardens and rivers (71:10 to 71:12, 11:52).
  "sign-forgiveness": [
    ["What did Nuh tell his people to ask Allah for?", "Forgiveness", "Ask your Lord's forgiveness"],
    ["Ayahs 10-20: what are they about?", "Ask forgiveness", "Ask your Lord's forgiveness"],
    ["What did Nuh tell them to do in 71:10?", "Ask forgiveness from their Lord", "Ask your Lord's forgiveness"],
    ["What brings these blessings, per Ibn Kathir?", "Repenting and obeying Allah", "Ask your Lord's forgiveness"],
    ["Ayahs 50-60 say: Hud told Ad: ask forgiveness, and Allah will send rain.", "True", "Ask your Lord's forgiveness", "He will send rain in abundance"],
    ["Which is a blessing Nuh promised for istighfar?", "Abundant rain", "He will send rain in abundance"],
    ["What did Hud say Allah would send if Ad repented?", "Abundant rain", "He will send rain in abundance"],
    ["Ayahs 50-60: what are they about?", "Hud and the rain", "He will send rain in abundance"],
    ["What did Hud promise if they repented, in 11:52?", "Abundant rain", "He will send rain in abundance"],
    ["What did Nuh say asking forgiveness brings?", "Rain, wealth and children", "He will send rain in abundance", "And give you more wealth"],
    ["What does 71:12 promise?", "Wealth, children, gardens, rivers", "And give you more wealth", "And make rivers for you"]
  ],
  // The wind for Sulayman: a month's journey each way, gently wherever he willed, and work in thanks (34:12, 34:13, 38:36).
  "sign-wind": [
    ["How far did the wind carry him in a morning?", "A month's journey", "Its morning course, a month's journey"],
    ["The wind's morning trip was a month's journey.", "True", "Its morning course, a month's journey"],
    ["Where did it go, per Ibn Kathir?", "Wherever in the world he wanted", "Gently, wherever he willed"],
    ["How should Dawud's family work, in 34:13?", "With thanks", "Work, family of Dawud, in thanks"]
  ],
  // Iram of the pillars, Thamud and Pharaoh, their corruption, the scourge poured on them; your Lord is ever watchful
  // (89:6 to 89:14).
  "sign-pillars": [
    ["Ayahs 1-14: what are they about?", "Ad, Thamud and Pharaoh", "Iram of the pillars", "Pharaoh, owner of the stakes"],
    ["How is Fir'awn described in 89:10?", "With Al-Awtad", "Pharaoh, owner of the stakes"],
    ["What did they do, per 89:11?", "Transgressed beyond bounds", "They spread much corruption"],
    ["What did they make much of, per 89:12?", "Mischief", "They spread much corruption"],
    ["Ayahs 1-14 say: Allah punished Ad, Thamud and Pharaoh for their wrongdoing.", "True", "They spread much corruption", "A scourge of punishment"],
    ["What did your Lord pour on them, per 89:13?", "Kinds of severe torment", "A scourge of punishment"],
    ["Their great strength saved them from Allah.", "False", "A scourge of punishment"],
    ["What does 89:14 say about your Lord?", "He is Ever Watchful", "Your Lord is ever watchful"]
  ],
  // The cup put in his brother's bag, the camel's load for whoever brings it, and the bags searched (12:70, 12:72, 12:76).
  "sign-cup": [
    ["Ayah 70: where was the king's cup placed?", "In Binyamin's bag", "He put the cup in his brother's bag"],
    ["What was the reward for finding it, in 12:72?", "A camel load", "Whoever brings it gets a camel's load"],
    ["Whose bags were searched first, in 12:76?", "The other brothers'", "He began with their bags"],
    ["Ayahs 69-79 say: Yusuf kept his brother near through a planned search.", "True", "He began with their bags", "Out of his brother's bag"]
  ],
  // The bird of clay, a bird by Allah's permission (3:49, 5:110).
  "sign-clay-bird": [
    ["How did Isa do his miracles?", "By Allah's permission", "It becomes a bird, by Allah's permission"],
    ["Whose permission made Isa's miracles happen?", "Allah's", "It becomes a bird, by Allah's permission"],
    ["How did the clay bird come to life, in 5:110?", "By Allah's permission", "It becomes a bird, by Allah's permission"]
  ],
  // The storm: whenever the lightning lights the way for them, they walk in it (2:20).
  "sign-storm": [["What do they do when lightning flashes?", "Walk a little in its light", "When it lights the way, they walk"]],
  // Rain on a dead land (7:57, 35:9, 16:65).
  "sign-rain": [
    ["What does Allah send down to grow our food?", "Rain", "The winds bring the clouds", "The rain falls"],
    ["What does Allah send to grow plants, in 6:99?", "Water from the sky", "The winds bring the clouds", "The rain falls"],
    ["What comes before Allah's mercy, the rain, in 7:57?", "The winds", "The winds bring the clouds"],
    ["What does the rain do to the earth, in 16:65?", "Revives it after its death", "The land comes to life"],
    ["What happens when rain falls on dry earth, in 22:5?", "It stirs and grows plants", "The land comes to life"],
    ["What do some winds do, per Ibn Kathir?", "Form and drive the clouds", "The winds bring the clouds"],
    ["What is the mercy, per Ibn Kathir?", "The rain", "The winds bring the clouds", "The rain falls"],
    ["What is the sign, in 36:33?", "The dead land given life", "The land comes to life"],
    ["What happens to barren earth with rain, in 41:39?", "It stirs to life", "The land comes to life"],
    ["What does rain do to the earth, in 45:5?", "Revives it after its death", "The land comes to life"],
    ["What does Allah send down, in 50:9?", "Blessed water", "The winds bring the clouds", "The rain falls"],
    ["Seeds grow without any water.", "False", "The rain falls", "The land comes to life"]
  ],
  // The clouds piled up, the rain coming out from within (24:43).
  "sign-clouds": [
    ["What does Allah do with the clouds, per Ibn Kathir?", "Piles them up in layers", "He piles them up"],
    ["Where does the rain come from, in 24:43?", "From between the clouds", "Rain comes out from within"],
    ["Ayah 43: what comes out of the piled-up clouds?", "Rain", "Rain comes out from within"]
  ],
  // Green, then yellow, then broken straw scattered by the winds (57:20, 18:45, 39:21).
  "sign-fade": [
    ["What scatters the dry plants, in 18:45?", "The winds", "Scattered by the winds"],
    ["What happens to the crops, in 39:21?", "They wither and break", "Then yellow", "Then broken straw"],
    ["What happens to the crops, in 57:20?", "Yellow, then straw", "Then yellow", "Then broken straw"],
    ["The green fades and becomes scattered pieces of dust.", "True", "Then yellow", "Scattered by the winds"]
  ],
  // One seed, seven ears, a hundred grains in each (2:261).
  "sign-seed": [
    ["One seed grows how many ears in this ayah?", "Seven", "Seven ears"],
    ["How many grains in each ear?", "A hundred", "A hundred grains in each"],
    ["Allah can multiply it even more.", "True", "Allah gives more to whom He wills"],
    ["Charity for Allah grows like a seed giving how many ears?", "Seven", "Seven ears"],
    ["Ayahs 261-266: what are they about?", "A seed of seven ears", "One seed", "Seven ears"],
    ["How many grains come from one, in 2:261?", "Seven hundred", "Seven ears", "A hundred grains in each"],
    ["Can Allah give even more?", "Yes, for whom He wills", "Allah gives more to whom He wills"]
  ],
  // The two seas and the barrier between them (25:53, 55:19, 55:20, 27:61).
  "sign-seas": [
    ["What two seas are in 25:53?", "Sweet and salty", "Sweet water", "Salty water"],
    ["What is between them, in 25:53?", "A barrier and partition", "A barrier between them"],
    ["What are the two seas, per Ibn Kathir?", "Fresh and salty waters", "Sweet water", "Salty water"],
    ["What is between the two seas, in 55:20?", "A barrier", "A barrier between them"],
    ["Why is the barrier there, per Ibn Kathir?", "So neither spoils the other", "A barrier between them"],
    ["Ayah 53: what is between the sweet and salty seas?", "A barrier", "A barrier between them"],
    ["What is between the two seas, in 27:61?", "A barrier", "A barrier between them"]
  ],
  // The ships, tall like mountains, sailing by His command (22:65, 42:32, 45:12, 55:24).
  "sign-ships": [
    ["Who makes ships sail, in Al-Hajj?", "Allah", "By His command"],
    ["Ayah 65: by whose command do ships sail?", "By Allah's command", "By His command"],
    ["Ayah 12: by whose command do ships sail the sea?", "By Allah's command", "By His command"],
    ["Who drives the ship through the sea, in 17:66?", "Allah", "By His command"],
    ["How do ships sail, per Ibn Kathir?", "By His command", "By His command"],
    ["Why do ships sail, per 45:12?", "By His command", "By His command"],
    ["What are the ships like, in 55:24?", "Mountains", "The ships sail the sea", "Tall like mountains"]
  ],
  // The earth spread out, the mountains set firm like pegs (78:6, 78:7, 16:15, 21:31).
  "sign-mountains": [
    ["What are the mountains like, in An-Naba?", "Pegs holding the earth", "Like pegs"],
    ["Ayah 7: what are the mountains like?", "Pegs", "Like pegs"],
    ["Ayahs 1-16 say: Allah made the earth a bed and the mountains like pegs.", "True", "The earth spread out", "Like pegs"],
    ["What did Allah place in the earth, in 15:19?", "Firm mountains", "Mountains set firm"],
    ["Why were mountains set firm, in 16:15?", "So the earth does not shake", "The earth stays steady"],
    ["Why were mountains placed, in 21:31?", "So the earth would not shake", "The earth stays steady"],
    ["What makes the earth steady, per Ibn Kathir?", "Firm mountains", "Mountains set firm"],
    ["What did Allah place on the earth, in 41:10?", "Firm mountains", "Mountains set firm"],
    ["What are Rawasi, per Ibn Kathir?", "Mountains", "Mountains set firm"],
    ["What did Allah do to the earth, in 50:7?", "Spread it out", "The earth spread out"],
    ["Mountains keep the earth steady for its people.", "True", "The earth stays steady"],
    ["What are the fixed towers, per Ibn Kathir?", "The mountains", "Mountains set firm"],
    ["Mountains make the earth shake and sway.", "False", "The earth stays steady"],
    ["What are the mountains, per 78:7?", "Pegs", "Like pegs"],
    ["Why are they like pegs, per Ibn Kathir?", "To hold the earth in place", "The earth stays steady"],
    ["Why are the mountains firm, per Ibn Kathir?", "So the earth is calmly settled", "The earth stays steady"]
  ],
  // The bee and its honey of many colors, with healing in it (16:68, 16:69).
  "sign-bee": [
    ["What comes from bees, in An-Nahl?", "Honey with healing", "Honey of many colors", "Healing for people"],
    ["Ayah 69: what is in the bee's drink for people?", "Healing", "Healing for people"],
    ["What did the Prophet ﷺ say to give the man with stomach pain?", "Honey", "Honey of many colors"],
    ["What comes from the bees, in 16:69?", "A drink of varying colors", "Honey of many colors"],
    ["What is in honey, in 16:69?", "A cure for people", "Healing for people"],
    ["Why does honey have different colors, per Ibn Kathir?", "What the bees eat", "Eat from every fruit", "Honey of many colors"],
    ["What happened in the end, in the hadith?", "He was cured", "Healing for people"]
  ],
  // The spider's house, the weakest of houses (29:41).
  "sign-spider": [
    ["What are false protectors like, in Al-Ankabut?", "A spider's house", "The spider builds a house"],
    ["Ayahs 31-44: what are they about?", "The spider's house", "The spider builds a house"],
    ["Ayah 41: what is the weakest of houses?", "The spider's house", "The spider builds a house", "The weakest of houses"],
    ["What is the weakest house, in 29:41?", "The spider's house", "The spider builds a house", "The weakest of houses"],
    ["Whom are idol worshippers like, per Ibn Kathir?", "One holding a spider's web", "The spider builds a house"],
    ["What does the name Surah Al-'Ankabut mean?", "The Spider", "The spider builds a house"],
    ["Why is it called Surah Al-'Ankabut?", "The spider's house, the weakest of all houses", "The spider builds a house", "The weakest of houses"]
  ],
  // The good tree, its root firm and its branches in the sky (14:24, 14:25).
  "sign-tree": [
    ["What is a good word like, in Ibrahim?", "A good tree", "Its root is firm", "Its branches are in the sky"],
    ["Ayahs 22-27: what are they about?", "The good tree", "Its root is firm", "Its branches are in the sky"],
    ["Ayah 24: a good word is like what?", "A good tree", "Its root is firm", "Its branches are in the sky"],
    ["Which tree did the Prophet ﷺ liken to a Muslim?", "The date palm", "Its root is firm", "Its branches are in the sky"],
    ["What is a good word like, in 14:24?", "A good tree", "Its root is firm", "Its branches are in the sky"],
    ["When does the tree give fruit, in 14:25?", "At all times, by its Lord's leave", "Its fruit at every time"],
    ["Which tree is like the Muslim?", "The date palm", "Its root is firm", "Its branches are in the sky"]
  ],
  // The camels, the sky, the mountains and the earth (88:17 to 88:20).
  "sign-look": [
    ["What should we look at, per 88:17?", "The camels, how they are created", "The camels, how they were created"],
    ["What should we look at, per 88:18?", "The heaven, how it is raised", "The sky, how it was raised"],
    ["What should we look at, per 88:19?", "The mountains, how they are rooted", "The mountains, how they were set firm"],
    ["How is the earth, per 88:20?", "Outspread", "The earth, how it was spread out"]
  ],
  // The birds, their wings spread and folded in, held up by the Most Merciful (67:19, 16:79).
  "sign-birds": [
    ["Who holds the birds up in the air?", "Ar-Rahman", "None holds them up but the Most Merciful"],
    ["What do the birds do with their wings in the ayah?", "Spread and fold them", "Birds in the sky", "And folded in"],
    ["Ibn Kathir says Allah keeps them up out of His ____.", "mercy", "None holds them up but the Most Merciful"],
    ["Who holds the birds up in the sky, in Al-Mulk?", "The Merciful", "None holds them up but the Most Merciful"],
    ["Ayahs 15-22 say: Who holds the birds up in the sky but the Merciful?", "True", "None holds them up but the Most Merciful"],
    ["Ayah 19: what are the birds doing?", "Spreading and folding wings", "Birds in the sky", "And folded in"],
    ["Who holds the birds up, in 16:79?", "Allah", "None holds them up but the Most Merciful"],
    ["Who holds the birds up?", "The Most Gracious", "None holds them up but the Most Merciful"],
    ["Why does Allah hold them up?", "Out of His mercy", "None holds them up but the Most Merciful"],
    ["A flying bird is a sign of Allah's mercy.", "True", "None holds them up but the Most Merciful"],
    ["What do birds do with their wings in 67:19?", "Spread and fold them", "Birds in the sky", "And folded in"],
    ["Birds fly by their own power alone.", "False", "None holds them up but the Most Merciful"]
  ],
  // The seed we sow, which Allah makes grow (56:63, 56:64).
  "sign-sow": [
    ["Who makes the crops grow, in Al-Waqi'ah?", "Allah", "Allah makes it grow"],
    ["Ayah 64: who makes the crops grow?", "Allah, the Grower", "Allah makes it grow"],
    ["Who is the Grower, in 56:64?", "Allah", "Allah makes it grow"],
    ["What does Allah do to the seeds?", "Keeps them firm and grows them", "Allah makes it grow"],
    ["What does Allah ask us to see, in 56:63?", "What we sow", "The seed you sow"]
  ],
  // The water we drink (56:68 to 56:70).
  "sign-water": [
    ["What does 56:70 ask at the end?", "Why do you not give thanks?", "So give thanks"]
  ],
  // The shade, the sun its guide (25:45).
  "sign-shade": [
    ["What did Allah spread, in 25:45?", "The shadow", "He stretches the shade"]
  ],
  // The foam that passes away, and what benefits people, which remains (13:17).
  "sign-foam": [
    ["What happens to the foam, in 13:17?", "It passes away as scum", "The foam passes away"],
    ["What remains in the earth, in 13:17?", "What benefits mankind", "What benefits people remains"]
  ],
  // The rain on three lands (Sahih al-Bukhari 79).
  "sign-lands": [
    ["Which land is like someone who learns and teaches?", "Land that drinks and grows plants", "Good land grows grass"],
    ["What is the Prophet's ﷺ guidance compared to?", "Abundant rain", "Rain falls on three lands"],
    ["What does barren land do with rain?", "Neither holds it nor grows plants", "Barren land keeps nothing"]
  ],
  // Deeds like ashes in a stormy wind (14:18).
  "sign-ashes": [["Can they keep any of what they earned, in 14:18?", "No, nothing", "Nothing is left"]],
  // The garden struck at night, black and bare by morning (68:19, 68:20).
  "sign-garden": [
    ["What happened to the garden owners' garden?", "Destroyed overnight", "At night, it was struck", "By morning, black and bare"],
    ["Ayah 20: what did the garden look like by morning?", "Like a burnt field", "At night, it was struck", "By morning, black and bare"],
    ["What did Ibn Abbas say the garden became like?", "The dark night", "At night, it was struck", "By morning, black and bare"],
    ["Allah can take away wealth in one night.", "True", "At night, it was struck", "By morning, black and bare"]
  ],
  // The two gardens of grapes, the river between, the fruit ruined (18:32, 18:33, 18:42).
  "sign-two-gardens": [
    ["What were the two gardens of, in 18:32?", "Grapes, with date palms around", "Two gardens of grapes", "Palms around, crops between"],
    ["What flowed between the gardens, in 18:33?", "A river", "A river flowing between"],
    ["What happened to his fruits, in 18:42?", "They were ruined", "Then all the fruit was ruined"]
  ],
  // What zakat is due on: nothing on fewer than five camels; one part in forty of silver; a tenth of what the rain
  // waters, and half a tenth of what a camel at the well waters (Sahih al-Bukhari 1459, 1454; Sahih Muslim 981).
  "sign-zakat": [
    ["Is zakat due on fewer than five camels?", "No", "Fewer than five camels: nothing is due"],
    ["Zakat on savings is ____ percent each year.", "2.5", "On silver: one part in forty"],
    ["Crops watered by rain give...?", "A tenth", "Watered by rain: a tenth"],
    ["Crops watered with camel work give...?", "A twentieth", "Watered by a camel: half a tenth"],
    ["Hard work to water lowers the zakat share.", "True", "Watered by rain: a tenth", "Watered by a camel: half a tenth"]
  ],
  // Mu'adh sent to Yemen: first the shahadah, then the five prayers of the day and the night, then zakat, taken from
  // their rich and given to their poor (Sahih al-Bukhari 1395, 1496).
  "sign-yemen": [
    ["What was Mu'adh to teach first?", "The testimony of faith", "First: the shahadah"],
    ["What did Mu'adh teach first?", "The shahadah", "First: the shahadah"],
    ["What came right after the shahadah?", "The five daily prayers", "Then five prayers, day and night"],
    ["Who is zakat taken from?", "Those with enough wealth", "Then zakat from their rich"],
    ["In Yemen, zakat went to Yemen's own poor.", "True", "Given to their poor"],
    ["Zakat is taken from the poor and given to the rich.", "False", "Then zakat from their rich", "Given to their poor"]
  ],
  // Bayruha: the garden Abu Talhah loved most; when the ayah came, he gave it for Allah, and it was shared among his
  // relatives (Quran 3:92, Sahih al-Bukhari 1461).
  "sign-bayruha": [
    ["Bayruha was the garden Abu Talhah loved least.", "False", "Bayruha, the garden he loved most"],
    ["To reach true goodness, what should we give?", "Something we love", "Spend from what you love"],
    ["What made him give it?", "The ayah about giving what you love", "Spend from what you love"],
    ["Which ayah made Abu Talhah give his garden?", "Spend from what you love", "Spend from what you love"],
    ["How do we reach true righteousness, in Ali 'Imran?", "By giving what we love", "Spend from what you love"],
    ["Ayahs 81-101: what are they about?", "Give what you love", "Spend from what you love"],
    ["How do you reach al-birr, in 3:92?", "By giving from what you love", "Spend from what you love"],
    ["Ayah 3:92 says we reach righteousness by spending what we love.", "True", "Spend from what you love"],
    ["Abu Talhah obeyed 3:92 right away.", "True", "Spend from what you love", "He gave it for Allah"],
    ["Whom did the Prophet ﷺ tell him to give it to?", "His relatives", "Shared among his relatives"]
  ],
  // Zakat al-Fitr: a sa' for every one, young or old, of dates or barley, given before the Eid prayer (Sahih al-Bukhari
  // 1503, 1506).
  "sign-fitr": [
    ["Who is zakat al-Fitr given for?", "Every Muslim, young or old", "A sa' for every one", "Young or old"],
    ["Who is it due for?", "Every Muslim, even a baby", "A sa' for every one", "Young or old"],
    ["A baby's zakat al-Fitr is paid too.", "True", "Young or old"],
    ["What is it paid in, in this hadith?", "A sa' of dates or barley", "Of dates or barley"],
    ["What is it paid in, in the hadith?", "Food, like dates or barley", "Of dates or barley"],
    ["What did the Companions give as zakat al-Fitr?", "A sa' of everyday food", "Of dates or barley"],
    ["A sa' is a measure of food.", "True", "Of dates or barley"],
    ["When should zakat al-Fitr be paid?", "Before the Eid prayer", "Given before the Eid prayer"],
    ["When must zakat al-Fitr be paid?", "Before the Eid prayer", "Given before the Eid prayer"]
  ],
  // The morning of Eid: dates first, an odd number; out to the open prayer ground, a short spear planted there; the
  // prayer first, then the khutbah; and home by another way (Sahih al-Bukhari 953, 494, 956, 986).
  "sign-eid": [
    ["What did he eat before the Eid al-Fitr prayer?", "Dates", "Dates first, an odd number"],
    ["How many dates fit this Sunnah?", "Three", "Dates first, an odd number"],
    ["What did the Prophet ﷺ eat before the Eid prayer?", "Some dates", "Dates first, an odd number"],
    ["On Eid al-Fitr, he went to pray before eating anything.", "False", "Dates first, an odd number"],
    ["What was planted in front of him ﷺ on Eid?", "A short spear", "Out to the open prayer ground"],
    ["Where did he pray Eid?", "At an open prayer ground", "Out to the open prayer ground"],
    ["What came first on Eid?", "The Eid prayer", "The prayer first, then the khutbah"],
    ["On Friday the khutbah comes first; on Eid the prayer does.", "True", "The prayer first, then the khutbah"],
    ["What did he do on the way back from Eid prayer?", "Took a different road", "Home by another way"]
  ],
  // Water for a thirsty dog: he drank from a well, saw a dog licking mud from thirst, filled his shoe with water and
  // gave it a drink; Allah thanked him and forgave him; a reward for any living being (Sahih al-Bukhari 2363, 2466).
  "sign-thirsty-dog": [
    ["How did the man carry the water?", "In his shoe", "He filled his shoe with water"],
    ["How did the man carry water up to the dog?", "In his shoe", "He filled his shoe with water", "And gave the dog a drink"],
    ["How did the man carry water for the dog?", "In his shoe", "He filled his shoe with water", "And gave the dog a drink"],
    ["What did Allah do for him?", "Thanked and forgave him", "Allah thanked him and forgave him"],
    ["What did Allah do for the man?", "Forgave him", "Allah thanked him and forgave him"],
    ["What did Allah do for him?", "Allah thanked him and forgave him", "Allah thanked him and forgave him"],
    ["Is there reward for kindness to animals?", "Yes, for every living thing", "Allah thanked him and forgave him", "A reward for any living being"],
    ["There is reward only for kindness to people, not animals.", "False", "Allah thanked him and forgave him", "A reward for any living being"],
    ["There is a reward for being kind to any living being.", "True", "Allah thanked him and forgave him", "A reward for any living being"]
  ],
  // A thorny branch moved out of the way: Allah thanked him and forgave him; and removing harm from the way is charity
  // (Sahih al-Bukhari 652, 2989). ("What did Allah do for him?", "Forgave him" is also asked of the trader who forgave
  // his debtors, so it stays as it is.)
  "sign-thorny-branch": [
    ["What did the man move off the path?", "A thorny branch", "A thorny branch across the way", "He moved it out of the way"],
    ["What did he ﷺ tell Abu Barzah to do?", "Remove harm from paths", "He moved it out of the way"],
    ["You see a thorn on the path. What do you do?", "Move it: that is charity", "He moved it out of the way", "Removing harm from the way is charity"],
    ["Clearing a path of harm is a good deed.", "True", "Allah thanked him and forgave him", "Removing harm from the way is charity"],
    ["Moving harm off a path is a good deed to do.", "True", "Allah thanked him and forgave him", "Removing harm from the way is charity"],
    ["Helping strangers on the road gets reward.", "True", "Allah thanked him and forgave him", "Removing harm from the way is charity"],
    ["Moving something harmful off the path is a ____.", "charity", "Allah thanked him and forgave him", "Removing harm from the way is charity"]
  ],
  // A tree planted or a seed sown: what a bird, a person or an animal eats from it is charity for the one who planted
  // it (Sahih al-Bukhari 2320, 6012).
  "sign-planting": [
    ["Who eating from it counts?", "A bird, person or animal", "A bird eats from it", "An animal eats from it"],
    ["Who can eat from the plant and still bring you reward?", "A person or an animal", "A person eats from it", "An animal eats from it"],
    ["A bird eats fruit from your tree. What is it for you?", "Charity", "Charity for the one who planted it"],
    ["An animal eats from a tree you planted. What do you get?", "Reward like charity", "Charity for the one who planted it"],
    ["Planting seeds can be worship.", "True", "Charity for the one who planted it"],
    ["Planting can be a good deed in Islam.", "True", "Charity for the one who planted it"]
  ],
  // Umar's land at Khaybar: the land itself kept and its fruit given in charity, never sold, given away or inherited;
  // its keeper may eat from it and feed a friend, storing nothing for himself (Sahih al-Bukhari 2737, 2777).
  "sign-waqf": [
    ["What is a waqf?", "Property kept for charity forever", "Keep the land itself", "Never sold, gifted or inherited"],
    ["What did Umar do with his best land?", "Gave its fruit to charity forever", "And give its fruit in charity", "Never sold, gifted or inherited"],
    ["Umar's land could be sold later.", "False", "Never sold, gifted or inherited"],
    ["What could the keeper do?", "Eat from it and feed a friend", "Its keeper may eat and feed a friend"],
    ["What could he not do?", "Store things for himself", "Storing nothing for himself"]
  ],
  // Asking permission three times at Umar's door, going back, and the youngest as the witness (Sahih al-Bukhari 6245).
  "sign-permission": [
    ["How many times should you ask to come in?", "Three", "He asked permission once", "A third time: no permission given"],
    ["How many times should you ask to come in?", "Three times", "He asked permission once", "A third time: no permission given"],
    ["How many times should you ask to enter?", "Three times", "He asked permission once", "A third time: no permission given"],
    ["Why did Abu Musa leave Umar's door?", "He asked three times, no answer", "He asked permission once", "A third time: no permission given"],
    ["Whose door did Abu Musa knock on?", "Umar's", "At Umar's door"],
    ["If no one answers after three times, what do you do?", "Go back", "So he went back"],
    ["What should you do if no one lets you in?", "Go back home", "So he went back"],
    ["What should you do if you ask to come in three times with no answer?", "Go back home", "So he went back"],
    ["What should you do if no one allows you in?", "Go back politely", "So he went back"],
    ["What should you do after three unanswered asks?", "Return home", "So he went back"],
    ["Abu Musa went back after asking Umar three times.", "True", "So he went back"],
    ["What did Umar ask Abu Musa to bring?", "A witness to the hadith", "The youngest went with him as witness"],
    ["Who did Ubayy send as the witness?", "The youngest of them", "The youngest went with him as witness"],
    ["Who went as Abu Musa's witness?", "Abu Sa'id, the youngest", "The youngest went with him as witness"]
  ],
  // The first call to prayer in Madinah, and walking calmly to the prayer (Sahih al-Bukhari 604, 636).
  "sign-adhan": [
    ["Before the adhan, how did Muslims know the prayer time?", "They guessed it", "They used to guess the prayer time"],
    ["Before the adhan, people had to guess the prayer time.", "True", "They used to guess the prayer time"],
    ["Who was told to call the first adhan?", "Bilal", "O Bilal, stand and call to prayer"],
    ["Whom did the Prophet ﷺ tell to call the adhan?", "Bilal", "O Bilal, stand and call to prayer"],
    ["Bilal was the first ____, who calls the adhan.", "mu'adhdhin", "O Bilal, stand and call to prayer"],
    ["The Muslims chose a bell like a church bell.", "False", "O Bilal, stand and call to prayer"],
    ["The ____ is the call to prayer.", "adhan", "O Bilal, stand and call to prayer", "Calling the people to prayer"],
    ["The ____ is the second call, just before salah starts.", "iqamah", "When you hear the iqamah"],
    ["Walk to salah ____; don't run, even if late.", "calmly", "Walk to it calmly, do not rush"],
    ["How should we go to prayer after the iqamah?", "Calmly, without rushing", "Walk to it calmly, do not rush"],
    ["How should we walk to the prayer?", "With calmness", "Walk to it calmly, do not rush"],
    ["Running to catch the start of prayer is better.", "False", "Walk to it calmly, do not rush"]
  ],
  // The wet grain hidden under the dry in a heap of food (Sahih Muslim 102).
  "sign-wet-grain": [
    ["What did the Prophet ﷺ find inside the heap of food?", "Wet grain", "Rain fell on a heap of food", "Inside, it was wet"],
    ["What did he ﷺ find in the heap, per Muslim 102?", "Wet grain hidden inside", "Rain fell on a heap of food", "Inside, it was wet"],
    ["What did the Prophet ﷺ find in the heap?", "Wet grain hidden under dry", "Rain fell on a heap of food", "Inside, it was wet"],
    ["What did the seller hide, per the hadith?", "Wet grain under dry grain", "Rain fell on a heap of food", "The wet part hidden under dry"],
    ["What should the seller have done with the wet part?", "Put it on top to be seen", "Why not on top, for people to see?"],
    ["Where should the wet part have been?", "On top, for people to see", "Why not on top, for people to see?"],
    ["The Prophet ﷺ told the seller to put the wet part where people could see.", "True", "Why not on top, for people to see?"],
    ["What did the Prophet ﷺ say about one who deceives?", "He is not of me", "Whoever cheats is not of me"],
    ["What did he ﷺ say about one who deceives?", "He is not of me", "Whoever cheats is not of me"],
    ["Hiding a fault in what you sell is fine if no one asks.", "False", "Whoever cheats is not of me"],
    ["Hiding a fault in what we sell is cheating.", "True", "Whoever cheats is not of me"],
    ["Hiding a flaw in goods is fine if no one notices.", "False", "Whoever cheats is not of me"]
  ],
  // The well of Rumah that Uthman dug, and the army of hardship he equipped (Sahih al-Bukhari 2778).
  "sign-rumah": [
    ["Uthman bought a ____ and gave its water to everyone.", "well", "Whoever digs the well of Rumah", "Its water for all the Muslims"],
    ["What did Uthman buy for the Muslims?", "The well of Rumah", "Whoever digs the well of Rumah", "Its water for all the Muslims"],
    ["Which army did Uthman equip?", "The army of hardship", "Whoever equips the army of hardship", "And Uthman equipped it"],
    ["What did the Prophet ﷺ promise for these deeds?", "Jannah", "Both were promised Paradise"]
  ],
  // Ka'b ibn Malik, who stayed behind from Tabuk, told the plain truth and was forgiven (Sahih al-Bukhari 4418, 9:118).
  "sign-tabuk": [
    ["How many she-camels did Ka'b own before Tabuk?", "Two", "Never stronger, never richer"],
    ["How many she-camels did Ka'b have then?", "Two", "Never stronger, never richer"],
    ["Ka'b stayed behind because he was too poor to go.", "False", "Never stronger, never richer"],
    ["How was Ka'b when he stayed behind?", "Stronger and richer than ever", "Never stronger, never richer"],
    ["What was the weather when the army left for Tabuk?", "Very hot", "Never stronger, never richer", "He kept delaying, and the army left"],
    ["Why did Ka'b miss the army leaving for Tabuk?", "He kept putting it off", "He kept delaying, and the army left"],
    ["What does Ka'b's delay teach us?", "Do a good deed now, not later", "He kept delaying, and the army left"],
    ["The lesson is not to delay good deeds.", "True", "He kept delaying, and the army left"],
    ["What did Ka'b decide to tell the Prophet ﷺ?", "The plain truth", "He told the plain truth"],
    ["What did the Prophet ﷺ say about Ka'b?", "He has told the truth", "He told the plain truth"],
    ["Ka'b said he had a good excuse for staying behind.", "False", "He told the plain truth"],
    ["What saved Ka'b in the end?", "Telling the truth", "He told the plain truth"],
    ["What saved Ka'b ibn Malik after Tabuk?", "Telling the truth", "He told the plain truth"],
    ["Why was Ka'b saved, in his own words?", "He told the truth", "He told the plain truth"],
    ["How long did people not speak to the three?", "Fifty nights", "Fifty nights, no one spoke to him"],
    ["How long did the three wait, per Ka'b?", "Fifty nights", "Fifty nights, no one spoke to him"],
    ["How did the earth feel to the three?", "Narrow, wide as it was", "Fifty nights, no one spoke to him"],
    ["9:118 says the earth felt narrow to them.", "True", "Fifty nights, no one spoke to him"],
    ["Who sent Ka'b the letter?", "The king of Ghassan", "A king's letter went into the oven"],
    ["What did Ka'b do with the letter?", "Burned it in the oven", "A king's letter went into the oven"],
    ["Ka'b left Madinah to join the king.", "False", "A king's letter went into the oven"]
  ],
  // The cave of Thawr on the Hijrah: the camels fed four months, Asma's belt, three nights in the cave, and "two, the
  // third of whom is Allah" (Sahih al-Bukhari 3905, 3653).
  "sign-thawr": [
    ["How long did Abu Bakr feed the two camels?", "Four months", "Two camels, fed for four months"],
    ["What did Asma use to tie the food bag?", "Part of her waist belt", "Asma cut her belt to tie the food"],
    ["What did Asma use to tie the food?", "Her waist belt, cut in two", "Asma cut her belt to tie the food"],
    ["What does Dhat an-Nitaqayn mean?", "The one with two belts", "Asma cut her belt to tie the food"],
    ["Asma helped the Hijrah journey.", "True", "Asma cut her belt to tie the food"],
    ["How many nights did they stay in the cave?", "Three", "Three nights in the cave of Thawr"],
    ["How long did they stay in the cave?", "Three days", "Three nights in the cave of Thawr"],
    ["What did Abu Bakr fear in the cave?", "The enemy would see them", "Two, the third of whom is Allah"],
    ["Abu Bakr feared they could be seen if the enemy looked down.", "True", "Two, the third of whom is Allah"],
    ["What did the Prophet ﷺ say to calm him?", "Two, and Allah is the third", "Two, the third of whom is Allah"],
    ["What did the Prophet ﷺ say about the two in the cave?", "Allah is their third", "Two, the third of whom is Allah"],
    ["What did the Prophet ﷺ say about the two of them?", "The third of them is Allah", "Two, the third of whom is Allah"],
    ["What sums up the answer in the cave?", "Trust that Allah is with you", "Two, the third of whom is Allah"]
  ],
  // The plague in Sham: Umar at Sargh asks counsel and goes back, from Allah's decree to Allah's decree (Sahih
  // al-Bukhari 5729).
  "sign-plague": [
    ["Why did Umar decide not to enter Sham?", "A sickness had spread there", "Plague had broken out in Sham"],
    ["What did Umar do before deciding?", "He asked the companions' advice", "He asked them all for counsel"],
    ["Abu Ubaydah asked: are you running from Allah's decree? What did Umar say?", "From His decree to His decree", "From Allah's decree to Allah's decree"],
    ["What was Umar's answer?", "From Allah's decree to Allah's decree", "From Allah's decree to Allah's decree"],
    ["What did the Prophet ﷺ say about a land with plague?", "Do not go into it", "Do not go to it, nor flee from it"]
  ],
  // A river at the door, bathed in five times a day, like the five prayers (Sahih al-Bukhari 528).
  "sign-river-at-the-door": [
    ["What did he compare the five prayers to?", "Bathing in a river five times a day", "If a river ran by your door", "And you bathed in it five times a day"],
    ["What are the five prayers like, per the hadith?", "Bathing in a river", "If a river ran by your door", "And you bathed in it five times a day"],
    ["The Prophet ﷺ compared the five prayers to bathing in a river.", "True", "If a river ran by your door", "And you bathed in it five times a day"],
    ["How many times a day do Muslims pray?", "Five", "And you bathed in it five times a day"],
    ["What do the prayers wash away?", "Sins", "Not a trace of dirt would be left", "By the five prayers, Allah wipes out sins"],
    ["What do good deeds do, in 11:114?", "Remove bad deeds", "Not a trace of dirt would be left", "By the five prayers, Allah wipes out sins"]
  ],
  // Believers like a building, each part holding up the other; a man came asking, and he ﷺ said: speak up for him, and
  // be rewarded (Sahih al-Bukhari 481, 6026). His laced fingers are only told, never drawn, so they are not asked here.
  "sign-building": [
    ["A believer to a believer is like what?", "A building", "The believer to the believer", "Is like a building"],
    ["What are believers like, per Abu Musa's hadith?", "Bricks of one wall", "The believer to the believer", "Is like a building"],
    ["What are believers like, per Bukhari 481?", "Bricks of a wall", "The believer to the believer", "Is like a building"],
    ["What are believers like, in the hadith?", "Bricks of a wall", "The believer to the believer", "Is like a building"],
    ["In a wall, each brick supports the others.", "True", "Each part holding up the other"],
    ["Believers should support one another.", "True", "Each part holding up the other"],
    ["Believers should hold each other up.", "True", "Each part holding up the other"],
    ["When a man came asking, the Prophet ﷺ told them to help him.", "True", "Speak up for him, and be rewarded"]
  ],
  // Mercy in a hundred parts: one part among all creation, by which they are kind to each other, so that a mare lifts
  // her hoof from her foal, and ninety-nine kept back (Sahih al-Bukhari 6000, 6469).
  "sign-mercy": [
    ["Into how many parts did Allah make mercy?", "One hundred", "Allah made mercy in a hundred parts"],
    ["How many parts did He send to all creatures?", "One", "One part among all creation"],
    ["How many parts of mercy came to earth, in Bukhari 6000?", "One part of a hundred", "One part among all creation"],
    ["All the mercy among creatures comes from just one part.", "True", "One part among all creation", "By it, creatures are kind to each other"],
    ["What is the one part used for?", "All creatures' mercy to each other", "By it, creatures are kind to each other"],
    ["What does the mare do because of the one part of mercy?", "Lifts her hoof off her foal", "A mare lifts her hoof from her foal"],
    ["How many parts of mercy did Allah keep with Him?", "Ninety-nine", "He kept ninety-nine parts with Him"],
    ["How many parts of mercy did Allah keep for that Day?", "Ninety-nine", "He kept ninety-nine parts with Him"]
  ],
  // The halal is clear and the haram is clear, and between them are doubtful things; avoiding them keeps one's
  // religion and honour safe, like one grazing around a sanctuary (Sahih al-Bukhari 52).
  "sign-sanctuary": [
    ["What lies between clear halal and clear haram?", "Doubtful things", "Between them are doubtful things"],
    ["What lies between halal and haram?", "Doubtful things", "Between them are doubtful things"],
    ["What lies between the halal and the haram?", "Doubtful things", "Between them are doubtful things"],
    ["What do you protect by avoiding doubtful things?", "Your religion and honor", "Avoid them: your religion and honour stay safe"],
    ["What does avoiding doubtful things protect?", "Religion and honor", "Avoid them: your religion and honour stay safe"],
    ["What does staying away from doubtful things protect?", "Your faith and honour", "Avoid them: your religion and honour stay safe"],
    ["When unsure if something is halal, it's safer to leave it.", "True", "Avoid them: your religion and honour stay safe"]
  ],
  // A good friend like one who carries musk, and a bad friend like one who blows the bellows (Sahih al-Bukhari 5534).
  "sign-musk": [
    ["What is a good friend like, in the hadith?", "One carrying musk", "Like one who carries musk"],
    ["Even if he gives you nothing, a good friend leaves a good smell.", "True", "Or you find a sweet smell from him"],
    ["What might a bad friend do, like the bellows?", "Burn your clothes", "He burns your clothes, or you find a bad smell"]
  ],
  // The people who shared a ship: those below would make a hole in their part; stopped, all are saved (Sahih
  // al-Bukhari 2493).
  "sign-shared-ship": [
    ["What did the people below want to do?", "Make a hole for water", "Let us make a hole in our part"],
    ["Stopping wrong protects the whole community.", "True", "Stop them, and all of them are saved"]
  ],
  // Three men in a cave: a rock shut it on them, and each asked Allah by a good deed done for Him (Sahih al-Bukhari
  // 2272).
  "sign-shut-cave": [
    ["What trapped the three men in the cave?", "A big rock rolled over its mouth", "A rock rolled down and shut it"],
    ["How did they ask Allah to save them?", "By a good deed each did for Him", "One held milk for his parents till dawn"],
    ["One man had waited all night to give his parents their milk.", "True", "One held milk for his parents till dawn"],
    ["What did another man give back to his worker?", "His wage, grown into a herd", "One gave a worker his wage, grown into a herd"]
  ],
  // A loan sent across the sea in a piece of wood, with Allah as witness (Sahih al-Bukhari 2291).
  "sign-log-at-sea": [
    ["Whom did the borrower name as his witness?", "Allah", "A thousand dinars, lent with Allah as witness"],
    ["How did he send the money when he had no ship?", "Inside a piece of wood in the sea", "Money and a letter, sealed in a piece of wood", "He gave it to the sea, trusting Allah"],
    ["The lender found the wood and the money inside it.", "True", "The lender took it home for firewood", "He opened it: his money, and the letter"]
  ],
  // The Quran by heart, like tied camels; and keep reviewing it (Sahih al-Bukhari 5031, 5033).
  "sign-tied-camels": [
    ["What is a hafiz compared to?", "An owner of tied camels", "Is like the owner of tied camels"],
    ["What happens if the camels are let go?", "They run away", "If he lets them go, they run away"],
    ["Memorised Quran needs regular review.", "True", "Keep reviewing it: it slips away faster"],
    ["What slips away faster than a camel?", "The Quran we memorised", "Keep reviewing it: it slips away faster"],
    ["What are we told to do?", "Keep reviewing it", "Keep reviewing it: it slips away faster"],
    ["Once memorised, the Quran never leaves us.", "False", "If he lets them go, they run away", "Keep reviewing it: it slips away faster"]
  ],
  // Be in this world as a stranger or a traveler (Sahih al-Bukhari 6416), like a rider resting in a tree's shade, who
  // then goes on and leaves it (Jami at-Tirmidhi 2377).
  "sign-traveler": [
    ["How should we live in this world?", "Like a traveler", "Be in this world", "Or a traveler on his way"],
    ["How should we live in this world?", "Like a stranger or traveler", "Be in this world", "Or a traveler on his way"],
    ["How should we live, per Bukhari 6416?", "Like a stranger or traveler", "Be in this world", "Or a traveler on his way"],
    ["How should we live in this world, per the hadith?", "Like a stranger or traveler", "Be in this world", "Or a traveler on his way"],
    ["How should we live in this world, per the hadith?", "Like a stranger or a traveller", "Be in this world", "Or a traveler on his way"],
    ["What did he compare himself to in this world?", "A rider resting in shade", "Like a rider who rests in the shade of a tree"],
    ["A rider in shade soon moves on.", "True", "Then goes on, and leaves it"],
    ["A traveler does not get too attached to a road stop.", "True", "Like a rider who rests in the shade of a tree", "Then goes on, and leaves it"],
    ["A traveler does not cling to the road.", "True", "Like a rider who rests in the shade of a tree", "Then goes on, and leaves it"],
    ["Ibn Umar taught to expect a long life ahead.", "False", "At evening, do not wait for the morning"]
  ],
  // A believer who recites the Quran is like a citron, and one who does not like a date (Sahih al-Bukhari 5020).
  "sign-citron": [
    ["Reciting the Quran adds a good scent to a believer.", "True", "Is like a citron", "It smells good, and it tastes good"],
    ["A believer who does not recite is like what?", "A date with no smell", "Is like a date", "It tastes good, but has no smell"]
  ],
  // The trader who let off those in hardship, so that Allah might let him off; and Allah forgave him (Sahih al-Bukhari
  // 2078). ("What did Allah do for him?", "Forgave him" is also asked of the thorny branch, so it stays as it is.)
  "sign-forgiving-trader": [
    ["What did the trader do when a debtor could not pay?", "He forgave him", "He told his helpers: let him off", "So that Allah may let us off"],
    ["What did the lender do for poor debtors?", "Let them off", "He told his helpers: let him off", "So that Allah may let us off"],
    ["What did Allah do for the trader?", "Allah forgave him", "And Allah forgave him"],
    ["Being easy on people in debt is loved by Allah.", "True", "And Allah forgave him"],
    ["Being gentle with people in debt is loved by Allah.", "True", "And Allah forgave him"]
  ],
  // Provided for like the birds, which go out in the morning hungry and come back in the evening full (Jami
  // at-Tirmidhi 2344).
  "sign-hungry-birds": [
    ["What does true reliance on Allah bring?", "Allah's provision", "He would provide for you, as for the birds"],
    ["How do the birds leave in the morning?", "Empty", "They go out in the morning hungry"],
    ["How do the birds leave in the morning, in the hadith?", "Empty", "They go out in the morning hungry"],
    ["How does a bird go out, in the hadith?", "Hungry in the morning", "They go out in the morning hungry"],
    ["In the hadith, birds leave in the morning how?", "Hungry", "They go out in the morning hungry"],
    ["The birds stay in their nests and wait for food.", "False", "They go out in the morning hungry"],
    ["The bird still flies out to look for food.", "True", "They go out in the morning hungry"],
    ["The birds still go out to seek food, in the hadith.", "True", "They go out in the morning hungry"],
    ["How do they come back, in the hadith?", "Full", "And come back in the evening full"]
  ],
  // A hypocrite like a sheep wandering between two flocks, to this one once and to that one once (Sahih Muslim 2784).
  "sign-two-flocks": [
    ["How many flocks does the sheep wander between?", "Two", "Wandering between two flocks"],
    ["The sheep settles firmly with one flock.", "False", "Then to that one", "Never settling with either"]
  ],
  // The believer like a fresh plant the wind bends, which stands straight again when it is still, and the wicked like a
  // pine, until it is broken (Sahih al-Bukhari 5644).
  "sign-bending-plant": [
    ["What is the believer like, he ﷺ said?", "A fresh, soft plant", "A believer is like a fresh, soft plant"],
    ["Being bent by trials means a believer has lost his faith.", "False", "From wherever the wind comes, it bends it", "When the wind is still, it stands straight again"],
    ["What does the plant do when the wind stops?", "Stands straight again", "When the wind is still, it stands straight again"]
  ],
  // One who remembers his Lord and one who does not, like the living and the dead (Sahih al-Bukhari 6407).
  "sign-remember": [
    ["What does dhikr mean?", "Remembering Allah", "One who remembers his Lord"],
    ["Who is like the living, in the hadith?", "One who remembers his Lord", "Are like the living"],
    ["Who is like the living, in the hadith?", "One who remembers Allah", "Are like the living"],
    ["Whom is the one who remembers Allah like?", "Someone alive", "Are like the living"],
    ["The one who remembers Allah is like what?", "A living person", "Are like the living"],
    ["One who remembers Allah is like what?", "A living creature", "Are like the living"],
    ["Remembering Allah keeps the heart alive.", "True", "Are like the living"],
    ["Dhikr keeps the heart alive.", "True", "Are like the living"],
    ["And the one who never remembers Him?", "Like the dead", "And the dead"],
    ["Who is like the dead, in the hadith?", "One who does not remember Allah", "And the dead"],
    ["One who does not remember Allah is like what?", "A dead one", "And the dead"]
  ],
  // Allah more pleased with His servant's repentance than one who lost his camel in the desert, with his food and
  // drink, and found it standing by him (Sahih Muslim 2747). (The lesson's question on 42:25 is about the ayah, so it
  // stays as it is.)
  "sign-lost-camel": [
    ["What did the man lose, per Muslim 2747?", "His camel with food and drink", "A man in a desert, with his camel", "It ran off, with his food and drink"],
    ["How does Allah feel when we repent, per Muslim 2747?", "More pleased than that man", "Then there it was, standing by him", "Allah is more pleased when we repent"]
  ],
  // A believer is not stung from the same hole twice (Sahih al-Bukhari 6133).
  "sign-stung-twice": [
    ["A believer is not stung twice from...?", "The same hole", "A believer is not stung", "From the same hole twice"],
    ["What does this teach?", "Learn from what hurt you", "From the same hole twice", "He learns, and keeps away from it"],
    ["A believer keeps making the same mistake.", "False", "A believer is not stung", "He learns, and keeps away from it"]
  ],
  // The doors of good: fasting is a shield, charity puts out sins as water puts out fire, and prayer deep in the night
  // (Jami at-Tirmidhi 2616).
  "sign-doors-of-good": [
    ["What did he ﷺ call fasting in the same hadith?", "A shield", "Fasting is a shield"],
    ["What is fasting, in the hadith?", "A shield", "Fasting is a shield"],
    ["What does charity do to sins?", "Puts them out like water on fire", "Charity puts out sins", "As water puts out fire"],
    ["What does charity do, in the hadith?", "Puts out sins", "Charity puts out sins", "As water puts out fire"],
    ["Night prayer is also among the doors of good.", "True", "And prayer deep in the night"],
    ["Which prayer is a door of good, in the hadith?", "Prayer deep in the night", "And prayer deep in the night"]
  ],
  // The square he ﷺ drew: a person's lifetime all around him, his hope a line going out of it, and troubles the small
  // lines beside it (Sahih al-Bukhari 6417).
  "sign-square-and-line": [
    ["In the drawing, what did the square stand for?", "A person's lifetime", "The square is our lifetime"],
    ["What was the line going outside the square?", "His hope", "The line going out is our hope"],
    ["Our hopes often reach further than our lifetime.", "True", "The square is our lifetime", "The line going out is our hope"]
  ],
  // When you cook a soup, add more water to it, then look to your neighbors and give them some of it kindly (Sahih
  // Muslim 2625b). (The lesson's question on zakat and sadaqah is not about the soup, so it stays as it is.)
  "sign-more-water": [
    ["What did the Prophet ﷺ tell Abu Dharr to add to his soup?", "More water", "Add more water to it"],
    ["Why add it?", "To share with neighbors", "Then look to your neighbors' homes", "And give them some of it, kindly"],
    ["Sharing food with neighbors is part of good manners.", "True", "Then look to your neighbors' homes", "And give them some of it, kindly"],
    ["Who did the Prophet ﷺ say to share soup with?", "Your neighbors", "Then look to your neighbors' homes", "And give them some of it, kindly"]
  ],
  // A charity owed for every joint each day the sun rises: judging fairly, helping someone with his ride, a good word,
  // every step to the prayer, and removing harm from the road (Sahih Muslim 1009, Sahih al-Bukhari 2989).
  "sign-joint-charity": [
    ["Charity is owed each day for every what?", "Joint of the body", "Each day the sun rises, every joint owes charity"],
    ["What does each joint of the body owe every day?", "A charity", "Each day the sun rises, every joint owes charity"],
    ["Which of these is also charity in the hadith?", "Judging fairly between two people", "Judging fairly between two is charity"],
    ["What does the Prophet ﷺ call a good word?", "Charity", "A good word is charity"],
    ["Which of these counts as a charity?", "A good word", "A good word is charity"],
    ["Charity can only be given with money.", "False", "A good word is charity", "Removing harm from the road is charity"]
  ],
  // Two hungry wolves let loose among sheep do no more harm to them than a man's greed for wealth and honor does to his
  // religion (Jami at-Tirmidhi 2376).
  "sign-two-wolves": [
    ["What did he ﷺ compare greed for wealth and honor to?", "Two wolves among sheep", "Two hungry wolves, let loose among sheep"],
    ["What does that greed harm, he ﷺ said?", "A person's religion", "Than greed for wealth and honor", "Does to a person's religion"],
    ["Chasing more money and fame can hurt your faith.", "True", "Than greed for wealth and honor", "Does to a person's religion"]
  ],
  // No Muslim is hurt by anything, even the prick of a thorn, but Allah wipes away his sins by it, as a tree sheds its
  // leaves (Sahih al-Bukhari 5648). (The lesson's questions on the fever and on Ibn Mas'ud are not in the scene.)
  "sign-falling-leaves": [["A Muslim's pain can make his sins fall away like leaves.", "True", "But Allah wipes away his sins by it", "As a tree sheds its leaves"]],
  // "Shall I leave it loose and trust Allah?" "Tie it, and trust Allah" (Jami at-Tirmidhi 2517).
  "sign-tie-camel": [
    ["What did he ﷺ tell the man to do with his camel?", "Tie it, and trust Allah", "Tie it, and trust Allah"],
    ["What is the lesson about trusting Allah?", "Do your part, then trust Him", "Tie it, and trust Allah", "Do your part, then trust Him"],
    ["Trusting Allah means you never need to take care.", "False", "Shall I leave it loose, and trust Allah?", "Tie it, and trust Allah"]
  ],
  // Faith has over seventy, or sixty, branches: the highest is saying there is no god but Allah, the lowest is removing
  // harm from the road, and modesty is a branch of faith (Sahih Muslim 35b, Sahih al-Bukhari 9). (How many branches
  // Bukhari 9 names is not asked: the scene says seventy or sixty, as Muslim 35b does.)
  "sign-faith-branches": [
    ["Faith is only one single deed.", "False", "Faith has over seventy, or sixty, branches"],
    ["What is the highest branch of iman?", "La ilaha illallah", "The highest: saying there is no god but Allah"],
    ["What is the lowest branch?", "Removing harm from the road", "The lowest: removing harm from the road"],
    ["Modesty (haya) is part of faith.", "True", "And modesty is a branch of faith"],
    ["Which branch of faith does this hadith name?", "Haya, good shyness", "And modesty is a branch of faith"]
  ],
  // This world beside the Hereafter is like one of you dipping his finger in the sea: let him see what it brings back
  // (Sahih Muslim 2858). (Which finger, and who told it, are not asked: no hand or finger is drawn.)
  "sign-sea-drop": [
    ["What did the Prophet ﷺ compare this world to?", "Water on a finger from the sea", "Is like a finger dipped in the sea", "Then see what it brings back"],
    ["What is this world compared to, in the hadith?", "Water on a finger dipped in the sea", "Is like a finger dipped in the sea", "Then see what it brings back"],
    ["Next to the Hereafter, this world is very small.", "True", "Then see what it brings back", "A drop, beside the whole sea"],
    ["The hadith says this world is bigger than the Hereafter.", "False", "Then see what it brings back", "A drop, beside the whole sea"]
  ],
  // A man bought land and found in it a jar of gold: "Take your gold, I bought only the land." "I sold you the land and
  // all in it." The one they asked to judge said to marry the girl to the boy, spend on them and give in charity
  // (Sahih al-Bukhari 3472).
  "sign-jar-of-gold": [
    ["What did the buyer find in the land?", "A jar full of gold", "And found in it a jar of gold"],
    ["Why did the buyer say the gold was not his?", "He had bought only the land", "Take your gold: I bought only the land"],
    ["The rest of the gold was given away in charity.", "True", "Spend on them, and give the rest in charity"]
  ],
  // Charity does not lessen wealth, Allah adds honor to one who forgives, and no one is humble for Allah but Allah
  // raises him (Sahih Muslim 2588). (The garden owners of surah 68 and Yusuf's brothers are not in the scene.)
  "sign-charity-wealth": [
    ["Does charity make your wealth less?", "No, never", "Charity does not lessen wealth"],
    ["Does charity make your wealth less?", "No", "Charity does not lessen wealth"],
    ["What does charity not do, in the hadith?", "Decrease wealth", "Charity does not lessen wealth"],
    ["What does charity not do, per Muslim 2588?", "Decrease wealth", "Charity does not lessen wealth"],
    ["What does charity not do to wealth?", "Decrease it", "Charity does not lessen wealth"],
    ["What does charity do to wealth?", "It does not decrease it", "Charity does not lessen wealth"],
    ["What happens to wealth given in charity?", "It does not decrease", "Charity does not lessen wealth"],
    ["What does Allah give someone who forgives?", "More honor", "Allah adds honor to one who forgives"],
    ["What does Allah give the one who forgives?", "More honour", "Allah adds honor to one who forgives"],
    ["What does Allah give one who forgives?", "More honor", "Allah adds honor to one who forgives"],
    ["What does forgiving others bring?", "More honor", "Allah adds honor to one who forgives"],
    ["What does forgiving others bring?", "More honor from Allah", "Allah adds honor to one who forgives"],
    ["Forgiving others brings more honor from Allah.", "True", "Allah adds honor to one who forgives"],
    ["Forgiving people lowers your honour.", "False", "Allah adds honor to one who forgives"],
    ["What does Allah do for someone humble for His sake?", "Raises him", "And raises up one who is humble for Him"],
    ["What happens to one humble for Allah, per Muslim 2588?", "Allah raises his status", "And raises up one who is humble for Him"],
    ["Who is raised in status, in the hadith?", "The humble, for Allah's sake", "And raises up one who is humble for Him"],
    ["Humbling yourself for Allah raises you.", "True", "And raises up one who is humble for Him"],
    ["Humbling yourself for Allah lowers you.", "False", "And raises up one who is humble for Him"]
  ],
  // The palm trunk he ﷺ stood by cried like a child when he moved to the pulpit, until he came down and held it (Sahih
  // al-Bukhari 3584). (Ibn Kathir's use of it for 59:21 is not in the scene.)
  "sign-crying-trunk": [
    ["What did the palm trunk do?", "Cried like a child", "And the trunk cried like a child"],
    ["What did the Prophet ﷺ do then?", "Came down and held it", "Until he came down and held it"]
  ],
  // Digging the trench, they met a great rock no spade could break; he ﷺ struck it, and it became like soft sand (Sahih
  // al-Bukhari 4101). (33:21, their hunger and Ibn Kathir's words are not in the scene.)
  "sign-trench-rock": [["What did the Prophet ﷺ do to the rock, in the hadith?", "Struck it into sand", "He came, and struck it with the spade", "And it became like soft sand"]],
  // On the road to Madinah a horseman caught up with them: "O Allah, throw him down", and the horse threw him (Sahih
  // al-Bukhari 3911). (The reward he chased them for, and what Abu Bakr told those who asked, are not in the scene.)
  "sign-chasing-horse": [["What happened to Suraqah's horse?", "It sank and threw him", "O Allah, throw him down: and it threw him"]],
  // One bowl of milk: all the people of the Suffah drank their fill from it, one by one, then Abu Hurairah, and he ﷺ
  // drank what was left (Sahih al-Bukhari 6452). (Who the people of the Suffah were is not in the scene.)
  "sign-milk-bowl": [
    ["How many bowls of milk were there?", "One", "One bowl of milk, given as a gift", "Each drank his fill, one by one"],
    ["Abu Hurairah drank before the people of the Suffah.", "False", "Each drank his fill, one by one", "There remain you and I: drink"],
    ["Who drank last?", "The Prophet ﷺ", "And he drank what was left"]
  ],
  // A few barley loaves fed seventy or eighty, ten at a time, each eating their fill (Sahih al-Bukhari 3578).
  "sign-bread-for-seventy": [
    ["What did Umm Sulaym send to the Prophet ﷺ?", "Loaves of barley bread", "A few barley loaves, sent in a cloth"],
    ["How many men came in to eat at a time?", "Ten at a time", "Let ten come in: they ate their fill, and went out"],
    ["Everyone there ate until they were full.", "True", "Let ten come in: they ate their fill, and went out", "Until all had eaten: seventy or eighty"]
  ],
  // When night falls, keep the children close; close the door and mention Allah's name (Sahih al-Bukhari 3304, 5624).
  // (When to keep them close is asked in the day's sky, and for how long is not in the scene.)
  "sign-nightfall": [["What should you say as you close the door at night?", "Allah's name", "Close the door, and say Allah's name"]],
  // Shield yourselves from the Fire, even with half a date; and if you have none, with a good word (Sahih al-Bukhari
  // 1417, 6023). (What a date is, and what kind of word he meant, are not asked: the scene shows only that they are
  // given.)
  "sign-half-date": [
    ["What small thing can shield you from the Fire?", "Half a date in charity", "Shield yourselves from the Fire", "Even with half a date"],
    ["What can half a date protect from?", "The Fire", "Shield yourselves from the Fire", "Even with half a date"],
    ["How small can a charity be?", "Even half a date", "Even with half a date"],
    ["What small charity did he name?", "Half a date", "Even with half a date"],
    ["A tiny gift given for Allah still counts.", "True", "Even with half a date"],
    ["Small charity matters to Allah.", "True", "Even with half a date"],
    ["Charity only counts if it is large.", "False", "Even with half a date"],
    ["If you have nothing to give?", "Say a good word", "And if you have none, with a good word"],
    ["What if you have no date to give?", "Say a good word", "And if you have none, with a good word"],
    ["A kind word is a good deed anyone can do.", "True", "And if you have none, with a good word"]
  ],
  // The lamp put out: an Ansari couple put their little ones to sleep and the light out, so a hungry guest could eat,
  // and 59:9 was revealed (Sahih al-Bukhari 4889).
  "sign-lamp-out": [
    ["What food did the wife have?", "Only the children's food", "Only the little ones' food: let them sleep"],
    ["Why did they put out the light?", "So the guest could eat", "And she put out the light", "In the dark he ate, and they slept hungry"],
    ["This story led to the words of 59:9.", "True", "Then Allah revealed 59:9 about them"]
  ],
  // Busy serving his family, and when the time for prayer came, out to the prayer (Sahih al-Bukhari 676). (Who was
  // asked is in the scene's first words, so it is not asked.)
  "sign-helped-at-home": [
    ["What did the Prophet ﷺ do at home?", "Helped his family", "He was busy serving his family"],
    ["What did he do when prayer time came?", "Went to pray", "He went out to the prayer"],
    ["What did he ﷺ do when prayer time came?", "Went out to pray", "He went out to the prayer"]
  ],
  // The man who killed a hundred: told to go to such and such a village, overtaken by death on the way, and found a span
  // closer to it, so he was forgiven (Sahih al-Bukhari 3470). (That repentance is open while one lives is not in the
  // scene.)
  "sign-a-span-closer": [
    ["Where was the man going, in the hadith?", "To a town to repent", "He was told: go to such and such a village"],
    ["Where did he die?", "On the way to the good village", "On the way, death overtook him"],
    ["How much closer was he to the good village?", "One span", "A span closer to that village: forgiven"],
    ["How close was he to the good town?", "One span closer", "A span closer to that village: forgiven"],
    ["What happened to him at the end?", "He was forgiven", "A span closer to that village: forgiven"]
  ],
  // Uhud shook under him ﷺ, Abu Bakr, Umar and Uthman: be firm, Uhud, for on you are a Prophet, a Siddiq and two martyrs
  // (Sahih al-Bukhari 3675, 3686). (Which mountain shook is asked on the map; the scene does not show which two were the
  // martyrs, and its four rings would confuse "how many were with him"; the narrator is not asked.)
  "sign-uhud-shook": [
    ["What did the Prophet ﷺ call Abu Bakr that day?", "A siddiq", "On you are a Prophet, a Siddiq and two martyrs"],
    ["What did the Prophet ﷺ call Uthman on Uhud?", "A martyr", "On you are a Prophet, a Siddiq and two martyrs"]
  ],
  // The stone in Makkah that used to greet him with salam before he was sent, which he knew even after (Sahih Muslim
  // 2277). (In which city is asked on the map.)
  "sign-greeting-stone": [
    ["What did the stone in Makkah use to do?", "Greet him with salam", "A stone would greet him with salam"],
    ["He ﷺ said he still knew that stone.", "True", "I know that stone, even now"]
  ],
  // Rain prayed for in the Friday khutbah, a week of it, then "around us, not on us", and out in the sun (Sahih al-Bukhari
  // 1013).
  "sign-around-us": [
    ["When did the man ask him ﷺ to pray for rain?", "During the Friday khutbah", "On a Friday, in the khutbah: pray for rain"],
    ["What did he ﷺ say when the rain had to stop?", "Around us, not on us", "Around us, not on us"],
    ["After the second du'a, they walked out in the sun.", "True", "And they walked out in the sun"]
  ],
  // The blessed water on a journey, and the food heard glorifying Allah (Sahih al-Bukhari 3579). (What flowed is asked
  // on picture cards of water, milk, honey and oil.)
  "sign-blessed-water": [
    ["What did the Companions hear, in the hadith?", "The food glorifying Allah", "And we heard the food glorify Allah"],
    ["Whom did he ﷺ say the blessing was from?", "Allah", "Come to the water: the blessing is from Allah"]
  ],
  // Every prophet tended sheep, and he ﷺ tended the sheep of the people of Makkah for a few qirats (Sahih al-Bukhari
  // 2262). (The far flocks come into sight with the first words. What Ibn Kathir says of Dawud, and Musa hired to tend
  // sheep, are not in the scene.)
  "sign-shepherds": [
    ["What work did every prophet do, the Prophet ﷺ said?", "Looking after sheep", "Allah sent no prophet who did not tend sheep"],
    ["What job did every Prophet do, in the hadith?", "Tending sheep", "Allah sent no prophet who did not tend sheep"],
    ["What work did every Prophet do?", "Tending sheep", "Allah sent no prophet who did not tend sheep"],
    ["Whose sheep did the Prophet ﷺ look after?", "The people of Makkah's", "Yes, I tended the sheep of the people of Makkah"],
    ["Whose sheep did the Prophet ﷺ tend?", "The people of Makkah's", "Yes, I tended the sheep of the people of Makkah"],
    ["Whose sheep did the Prophet ﷺ tend?", "The people of Makkah", "Yes, I tended the sheep of the people of Makkah"],
    ["What was he ﷺ paid for it?", "A few qirats", "For a few qirats"]
  ],
  // One date given from honest earnings, and Allah grows its reward as one raises a foal, until it is as big as a
  // mountain (Sahih al-Bukhari 1410). (The palm and its dates come into sight with the first words; which charity Allah
  // accepts plays on to "Allah accepts only what is honestly earned". What 9:104 says is not in the scene.)
  "sign-date-mountain": [
    ["How big can one date of charity grow, per the hadith?", "As big as a mountain", "Until it becomes as big as a mountain"],
    ["Which charity does Allah accept, per the hadith?", "From honest earnings", "A date in charity, from honest earnings", "Allah accepts only what is honestly earned"],
    ["How small is the charity, in the hadith?", "One date", "A date in charity, from honest earnings"],
    ["What money does Allah accept, in the hadith?", "Honestly earned money", "A date in charity, from honest earnings", "Allah accepts only what is honestly earned"],
    ["How big does it grow, in the hadith?", "As big as a mountain", "Until it becomes as big as a mountain"],
    ["How small can the charity be?", "One date", "A date in charity, from honest earnings"],
    ["How big does its reward grow?", "As big as a mountain", "Until it becomes as big as a mountain"],
    ["Allah accepts only honestly earned money.", "True", "A date in charity, from honest earnings", "Allah accepts only what is honestly earned"]
  ],
  // When a person dies his deeds end, except three: a charity that keeps going, knowledge that benefits, and a
  // righteous child who prays for him (Sahih Muslim 1631). (Where Ibn Kathir cites it is not in the scene.)
  "sign-deeds-continue": [
    ["How many deeds keep going after death?", "Three", "Except three: a charity that keeps going"],
    ["Which is one of them?", "Knowledge that benefits people", "Or knowledge that people benefit from"],
    ["Planting a tree people use, or building a well, is...", "Ongoing charity", "Except three: a charity that keeps going"],
    ["Which of these keeps helping a person after death?", "A righteous child's dua", "Or a righteous child who prays for him"],
    ["How many deeds continue after death in this hadith?", "Three", "Except three: a charity that keeps going"],
    ["Useful knowledge someone left keeps rewarding him.", "True", "Or knowledge that people benefit from"],
    ["How many deeds continue after death, per Muslim 1631?", "Three", "Except three: a charity that keeps going"],
    ["Which is one of the three, per Muslim 1631?", "A pious child who prays", "Or a righteous child who prays for him"],
    ["How many deeds continue after death?", "Three", "Except three: a charity that keeps going"],
    ["Which is one of them?", "A child who prays for him", "Or a righteous child who prays for him"],
    ["Dua for parents stops helping them after they die.", "False", "Or a righteous child who prays for him"]
  ],
  // A good deed intended is written as a full one; done, as ten to seven hundred times or more; a bad deed intended and
  // left, as a full good deed; done, as one bad deed (Sahih al-Bukhari 6491). (What 6:160 counts, and the order that
  // deeds be written, are not in the scene: it draws no writing.)
  "sign-good-intentions": [
    ["What is written if you plan a good deed but cannot do it?", "A full good deed", "A good deed intended but not done: a full one"],
    ["How many times can a good deed done be multiplied?", "Ten to seven hundred times, or more", "Done: ten to seven hundred times, or more"],
    ["A bad deed done is written as ten bad deeds.", "False", "A bad deed done is written as one bad deed"],
    ["Per Bukhari 6491, a bad deed you meant but left is...", "Written as a good deed", "A bad deed intended and left: a full good deed"],
    ["How high can a good deed go, per Bukhari 6491?", "700 times and more", "Done: ten to seven hundred times, or more"],
    ["How is a done good deed written?", "Ten to seven hundred times", "Done: ten to seven hundred times, or more"],
    ["What if one only intends a good deed?", "A full good deed", "A good deed intended but not done: a full one"],
    ["How is a bad deed that is done written?", "As one bad deed", "A bad deed done is written as one bad deed"],
    ["What is written for a good intention not done, per Bukhari 6491?", "A full good deed", "A good deed intended but not done: a full one"],
    ["How much is a done good deed multiplied?", "Ten to seven hundred times or more", "Done: ten to seven hundred times, or more"],
    ["What is written if one drops a bad intention?", "A full good deed", "A bad deed intended and left: a full good deed"],
    ["What is written for intending good, per Bukhari 6491?", "A full good deed", "A good deed intended but not done: a full one"],
    ["A good deed done is multiplied up to?", "Seven hundred times or more", "Done: ten to seven hundred times, or more"],
    ["What if you intend good but do not do it?", "A full good deed is written", "A good deed intended but not done: a full one"],
    ["How much for a good deed you do?", "Ten to seven hundred times or more", "Done: ten to seven hundred times, or more"],
    ["A bad deed you hold back from is written as a good deed.", "True", "A bad deed intended and left: a full good deed"]
  ],
  // The call from as-Safa: would you believe me? We have never heard you tell a lie. I am a plain warner. And Abu Lahab
  // went away (Sahih al-Bukhari 4770, 4971). (Whom 26:214 says to warn, and the ayahs of al-Masad, are not in the scene;
  // on which mountain he stood is asked on the map.)
  "sign-safa-call": [
    ["What did Quraysh say about his honesty?", "They never heard him lie", "We have never heard you tell a lie"],
    ["What did he call himself to them?", "A plain warner", "I am a plain warner of a severe punishment"],
    ["Abu Lahab thanked him for the warning.", "False", "Abu Lahab: only for this? And he went away"],
    ["Where did the Prophet ﷺ call his people from?", "As-Safa", "He climbed as-Safa and called out to Quraysh"],
    ["Why did Quraysh say they would believe him?", "He always told the truth", "We have never heard you tell a lie"]
  ],
  // Jabir's father died in debt; he ﷺ sat on the dates and prayed for blessing, every lender was paid in full, and
  // thirteen wasqs were left over (Sahih al-Bukhari 2709).
  "sign-jabir-dates": [
    ["What did Jabir's father leave behind?", "Debts", "Jabir's father died, and he was in debt"],
    ["What did the Prophet ﷺ do with the dates?", "Sat on them and made dua", "He sat on the dates and prayed for blessing"],
    ["How many loads were left after paying everyone?", "Thirteen", "And thirteen wasqs of dates were left over"]
  ],
  // Three follow the dead: his family, his wealth and his deeds; two go back, and his deeds stay (Sahih al-Bukhari
  // 6514). (What stays plays on from before the two go back, so it is not seen before it is asked; how many follow is
  // asked on the words alone, as the family are three small circles. What to collect most is not a moment.)
  "sign-three-follow": [
    ["What stays with you in the grave?", "Your deeds", "Two go back: his family and his wealth", "And his deeds stay with him"],
    ["Which two go back home?", "Family and wealth", "Two go back: his family and his wealth"],
    ["How many things follow the dead to the grave?", "Three", "Three follow the dead to his grave"],
    ["What stays with him?", "His deeds", "Two go back: his family and his wealth", "And his deeds stay with him"],
    ["Good deeds are the only friends that stay.", "True", "Two go back: his family and his wealth", "And his deeds stay with him"]
  ],
  // Every affair of a believer is good: thanks when joy comes, patience when harm comes, and that is for no one but the
  // believer (Sahih Muslim 2999). (Who is with the patient in 2:153, who is excepted in 11:11, Ayyub, and who narrated
  // it are not in the scene.)
  "sign-good-in-every-state": [
    ["What does a believer do when something good happens?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does a believer do when something hard happens?", "Is patient", "If harm comes, he is patient: good for him"],
    ["For a believer, both good and hard times can be good.", "True", "If joy comes, he gives thanks: good for him", "If harm comes, he is patient: good for him"],
    ["What should a believer do when good comes, in Muslim 2999?", "Be grateful", "If joy comes, he gives thanks: good for him"],
    ["And when hardship comes?", "Be patient", "If harm comes, he is patient: good for him"],
    ["What does a believer do when good comes, per the hadith?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does a believer do in trouble, per the hadith?", "Is patient", "If harm comes, he is patient: good for him"],
    ["Good in every affair is for everyone, not only believers.", "False", "And this is for no one but the believer"],
    ["What does the believer do when good comes, per the hadith?", "He gives thanks", "If joy comes, he gives thanks: good for him"],
    ["For the believer, both ease and hardship can be good.", "True", "If joy comes, he gives thanks: good for him", "If harm comes, he is patient: good for him"],
    ["What does a believer do in good times, in the hadith?", "He thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does a believer do in trouble?", "He is patient", "If harm comes, he is patient: good for him"],
    ["What does the believer do in joy, in the hadith?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does the believer do in hardship, in the hadith?", "Is patient", "If harm comes, he is patient: good for him"],
    ["In the hadith, every affair of a believer holds good.", "True", "Wonderful: every affair of the believer is good"],
    ["What does a believer do in joy, in the hadith?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does he do in trouble, in the hadith?", "Endures it patiently", "If harm comes, he is patient: good for him"],
    ["What does a believer do in good times?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does a believer do in hard times?", "Stays patient", "If harm comes, he is patient: good for him"],
    ["What does a believer do in happy times?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does he do in trouble?", "Shows patience", "If harm comes, he is patient: good for him"],
    ["For a believer, there is good in every affair.", "True", "Wonderful: every affair of the believer is good"],
    ["What does a believer do when good comes?", "Thanks Allah", "If joy comes, he gives thanks: good for him"],
    ["What does a believer do in trouble?", "Stays patient", "If harm comes, he is patient: good for him"],
    ["Every affair holds good for a believer.", "True", "Wonderful: every affair of the believer is good"]
  ],
  // Who most deserves good company: your mother, three times, then your father (Sahih al-Bukhari 5971). (The ayahs of
  // 46:15 on carrying and weaning are not in the scene.)
  "sign-your-mother": [
    ["How many times did the Prophet ﷺ say 'your mother'?", "Three", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["Who came after the mother?", "The father", "Then who? Your father"],
    ["Mothers are given extra care in Islam.", "True", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["How many times did he ﷺ say: your mother?", "Three times", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["Who came next, after the mother?", "The father", "Then who? Your father"],
    ["Being kind to your mother is a big deed in Islam.", "True", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["Whom did the Prophet ﷺ name three times for kindness?", "Your mother", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["Who most deserves good company, in the hadith?", "Your mother", "Your mother. Then who? Your mother"],
    ["How many times was the mother named?", "Three", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["Who came after the mother, in the hadith?", "Your father", "Then who? Your father"],
    ["How many times did the Prophet ﷺ say your mother?", "Three", "Your mother. Then who? Your mother", "Then who? Your mother"],
    ["Who came fourth, per Bukhari 5971?", "Your father", "Then who? Your father"]
  ],
  // Do not think little of any good deed, even meeting your brother with a cheerful face (Sahih Muslim 2626). (To whom he
  // said it, and what 31:18 and Ibn Kathir say, are not in the scene.)
  "sign-cheerful-face": [
    ["How should you meet your brother?", "With a smile", "With a cheerful face"],
    ["A small good deed, like a smile, does not count.", "False", "Do not think little of any good deed"],
    ["Which small deed did the Prophet ﷺ say not to look down on?", "Meeting your brother cheerfully", "Even if it is meeting your brother", "With a cheerful face"],
    ["A smile is too small to count as a good deed.", "False", "Do not think little of any good deed"],
    ["Which small good deed is named in the hadith?", "Meeting your brother with a cheerful face", "Even if it is meeting your brother", "With a cheerful face"],
    ["What should we never think little of?", "Any good deed", "Do not think little of any good deed"],
    ["A smile can be a good deed.", "True", "With a cheerful face"],
    ["How should we meet our brother, in the hadith?", "With a cheerful face", "With a cheerful face"],
    ["What good deed did he mention to Abu Dharr?", "A cheerful face", "With a cheerful face"],
    ["What should we never think of good deeds?", "That any is too small", "Do not think little of any good deed"],
    ["Smiling at a Muslim brother is a good deed.", "True", "With a cheerful face"]
  ],
  // The best are those who learn the Quran and teach it (Sahih al-Bukhari 5027). (Who narrated it, 35:29 and 54:17 are
  // not in the scene.)
  "sign-learn-and-teach": [
    ["Who are the best among us?", "Those who learn and teach the Quran", "Are those who learn the Quran", "And teach it"],
    ["Once you learn the Quran, you should keep it to yourself.", "False", "And teach it"],
    ["Who are the best, in the hadith Uthman told?", "Those who learn and teach the Quran", "Are those who learn the Quran", "And teach it"],
    ["Only learning the Quran is enough; teaching it does not matter.", "False", "And teach it"],
    ["Who is best, in the hadith?", "Who learns and teaches Quran", "Are those who learn the Quran", "And teach it"],
    ["Who are the best, per Bukhari 5027?", "Who learn and teach the Quran", "Are those who learn the Quran", "And teach it"],
    ["Who are the best people, by this saying?", "Those who learn and teach the Quran", "Are those who learn the Quran", "And teach it"]
  ],
  // The believers in their mercy, love and kindness are like one body: when one part is unwell, the whole body shares
  // its sleeplessness and fever (Sahih al-Bukhari 6011). (What 48:29 and 59:14 say is not in the scene.)
  "sign-one-body": [
    ["Believers are like what?", "One body", "Are like one body"],
    ["What happens when one part hurts?", "The whole body feels it", "The whole body shares sleeplessness and fever"],
    ["Muslims should care when others suffer.", "True", "The whole body shares sleeplessness and fever"],
    ["What are believers like, in their love?", "One body", "Are like one body"],
    ["What happens when one part of the body hurts?", "The whole body feels it", "The whole body shares sleeplessness and fever"],
    ["Muslims should care when another Muslim is hurting.", "True", "The whole body shares sleeplessness and fever"],
    ["What are the believers like, in their mercy to each other?", "One body", "Are like one body"],
    ["What does the whole body share when one part is ill?", "Fever and sleeplessness", "The whole body shares sleeplessness and fever"],
    ["A believer should feel the pain of other believers.", "True", "The whole body shares sleeplessness and fever"],
    ["What are believers like, per Bukhari 6011?", "One body", "Are like one body"],
    ["When one believer hurts, the others should feel it too.", "True", "The whole body shares sleeplessness and fever"],
    ["What are believers like, in Bukhari 6011?", "One body", "Are like one body"],
    ["If one part is unwell, what happens?", "The whole body shares it", "The whole body shares sleeplessness and fever"]
  ],
  // Say Bismillah, eat with your right hand, and eat from what is near you (Sahih al-Bukhari 5376). (How gently he
  // taught is not drawn.)
  "sign-eat-near": [
    ["Which hand should you eat with?", "Your right hand", "O boy! Say Bismillah, eat with your right hand"],
    ["What should you say before you eat?", "Bismillah", "O boy! Say Bismillah, eat with your right hand"],
    ["Which food should you take from the dish?", "What is nearest to you", "And eat from what is near you"],
    ["What did the Prophet ﷺ tell the boy to say first?", "Bismillah", "O boy! Say Bismillah, eat with your right hand"],
    ["With which hand should we eat?", "The right hand", "O boy! Say Bismillah, eat with your right hand"],
    ["What do you say before eating?", "Bismillah", "O boy! Say Bismillah, eat with your right hand"],
    ["Which hand do you eat with?", "The right hand", "O boy! Say Bismillah, eat with your right hand"],
    ["You should eat from what is nearest to you on the plate.", "True", "And eat from what is near you"],
    ["Which hand did he ﷺ say to eat with?", "The right hand", "O boy! Say Bismillah, eat with your right hand"],
    ["From which part of the dish should you eat?", "What is nearest to you", "And eat from what is near you"]
  ],
  // When will the Hour be? What have you prepared for it? Love of Allah and His Messenger. You will be with those you
  // love; and they had never been so glad (Sahih al-Bukhari 3688). (Whom Anas loved, and 42:18, are not in the scene.)
  "sign-those-you-love": [
    ["What did the Prophet ﷺ promise a man who loved Allah and His Messenger?", "You will be with those you love", "You will be with those you love"],
    ["The companions were very happy to hear they will be with those they love.", "True", "We had never been so glad"],
    ["What did the Prophet ﷺ ask the man back?", "What have you prepared for it?", "What have you prepared for it?"],
    ["What did the man say he had prepared?", "Love of Allah and His Messenger", "Nothing, but I love Allah and His Messenger"],
    ["What was the good news?", "You will be with those you love", "You will be with those you love"],
    ["What did the Prophet ﷺ ask the man, per Bukhari 3688?", "What have you prepared for it?", "What have you prepared for it?"],
    ["What was the good news, per Bukhari 3688?", "You will be with those you love", "You will be with those you love"],
    ["What did the Prophet ﷺ ask the man back?", "What have you prepared?", "What have you prepared for it?"],
    ["What did the man say he had?", "Love of Allah and His Messenger", "Nothing, but I love Allah and His Messenger"],
    ["The Companions were very glad to hear this answer.", "True", "We had never been so glad"]
  ],
  // When he ﷺ finished his prayer he asked forgiveness three times, then said: O Allah, You are Peace, and peace is from
  // You; blessed are You, Owner of Majesty and Honor (Sahih Muslim 591).
  "sign-after-the-salam": [
    ["What did he ﷺ say three times after salam?", "Astaghfirullah", "He asked forgiveness three times"],
    ["What does Allahumma antas-salam mean?", "O Allah, You are Peace", "O Allah, You are Peace, and peace is from You"],
    ["Asking forgiveness right after salah is Sunnah.", "True", "He asked forgiveness three times"],
    ["How many times did he ask forgiveness?", "Three", "He asked forgiveness three times"],
    ["Which name of Allah did he say next?", "As-Salam", "O Allah, You are Peace, and peace is from You"],
    ["He said Astaghfirullah after finishing prayer.", "True", "He asked forgiveness three times"],
    ["How many times did he ﷺ say Astaghfirullah after the prayer?", "Three", "He asked forgiveness three times"],
    ["Asking forgiveness right after praying is a sunnah.", "True", "He asked forgiveness three times"],
    ["How many times did he ﷺ seek forgiveness?", "Three times", "He asked forgiveness three times"],
    ["What did he ﷺ then say, per Muslim 591?", "You are Peace, peace comes from You", "O Allah, You are Peace, and peace is from You"],
    ["The dhikr ends with O Possessor of Glory and Honor.", "True", "Blessed are You, Owner of Majesty and Honor"]
  ],
  // Islam is built on five: the testimony, the prayer, Zakat, Hajj and the fast of Ramadan (Sahih al-Bukhari 8). (The
  // two questions with "Building a house" among their answers stay as they are: the scene draws a house being built.)
  "sign-built-on-five": [
    ["How many pillars is Islam built on?", "Five", "Islam is built on five"],
    ["What is the first pillar of Islam?", "The shahadah", "To testify none is worthy of worship but Allah", "And that Muhammad is the Messenger of Allah"],
    ["The shahadah says Muhammad ﷺ is Allah's Messenger.", "True", "And that Muhammad is the Messenger of Allah"],
    ["Which of these is a pillar of Islam?", "Paying zakat", "To offer the prayers, and to pay Zakat"],
    ["Zakat is an extra good deed, not a duty.", "False", "To offer the prayers, and to pay Zakat"],
    ["On how many pillars is Islam built?", "Five", "Islam is built on five"],
    ["Hajj is one of the five pillars.", "True", "To perform Hajj, and to fast in Ramadan"]
  ],
  // By Allah, he ﷺ asked Allah's forgiveness and turned to Him in repentance more than seventy times a day (Sahih
  // al-Bukhari 6307). (What 40:55, 47:19 and Ibn Kathir say is not in the scene.)
  "sign-seventy-times": [
    ["How often did the Prophet ﷺ seek forgiveness, per Bukhari 6307?", "More than seventy times a day", "More than seventy times a day"],
    ["How often did he seek forgiveness, per Bukhari 6307?", "More than seventy times a day", "More than seventy times a day"],
    ["What else did he do besides ask forgiveness?", "Turned to Allah in repentance", "And turn to Him in repentance"],
    ["How often did the Prophet ﷺ repent each day?", "More than seventy times", "More than seventy times a day"],
    ["What can we learn from him?", "Ask forgiveness daily", "More than seventy times a day"],
    ["Only sinful people need to ask forgiveness.", "False", "By Allah! I ask for forgiveness from Allah"],
    ["How often did the Prophet ﷺ ask forgiveness?", "Over seventy times a day", "More than seventy times a day"],
    ["What else did he do with it?", "Turned to Allah in repentance", "And turn to Him in repentance"],
    ["Asking forgiveness often is the Sunnah.", "True", "More than seventy times a day"]
  ],
  // Whoever loves more provision and a longer life, let him keep good relations with his kin (Sahih al-Bukhari 5986).
  // (What keeping ties brings is in the words before the ties, so that question stays as it is; so do who narrated it
  // and what Ibn Kathir quotes.)
  "sign-family-ties": [
    ["Ties with whom?", "Relatives", "Then let him keep good relations with his kin"],
    ["What should one who wants more provision do?", "Keep good ties with family", "Then let him keep good relations with his kin"],
    ["What else grows by keeping ties, per the hadith?", "A longer life", "And that his life be prolonged", "Then let him keep good relations with his kin"],
    ["What brings more provision, in the hadith?", "Keeping ties with relatives", "Then let him keep good relations with his kin"],
    ["What else is prolonged by family ties, in the hadith?", "A person's life", "And that his life be prolonged", "Then let him keep good relations with his kin"],
    ["What brings more wealth and life, per the hadith?", "Good ties with relatives", "Then let him keep good relations with his kin"],
    ["Cutting off relatives brings barakah.", "False", "Then let him keep good relations with his kin"]
  ],
  // Pray standing; if you can't, sitting; if you cannot, lying on your side (Sahih al-Bukhari 1117). (Who narrated it,
  // and why he asked, are not in the scene.)
  "sign-pray-as-you-can": [
    ["Example: your grandma has bad knees and can't stand. How does she pray?", "Sitting", "And if you can't, pray while sitting"],
    ["And if someone can't even sit?", "Lying on the side", "If you cannot, then pray lying on your side"],
    ["What does this teach about salah?", "It is kept in every state", "And if you can't, pray while sitting", "If you cannot, then pray lying on your side"],
    ["How should a sick person pray who cannot stand?", "Sitting down", "And if you can't, pray while sitting"],
    ["And if he cannot even sit?", "Lying on his side", "If you cannot, then pray lying on your side"],
    ["A sick person still prays in the way he is able.", "True", "And if you can't, pray while sitting", "If you cannot, then pray lying on your side"],
    ["If you cannot stand, how do you pray?", "Sitting", "And if you can't, pray while sitting"],
    ["If you cannot sit, how do you pray?", "Lying on your side", "If you cannot, then pray lying on your side"],
    ["Islam makes prayer easy for the sick.", "True", "And if you can't, pray while sitting", "If you cannot, then pray lying on your side"],
    ["How should one pray first, in the hadith?", "Standing", "Pray while standing"],
    ["What if one cannot sit, in the hadith?", "Pray lying on the side", "If you cannot, then pray lying on your side"],
    ["Someone who cannot sit may pray lying on their side.", "True", "If you cannot, then pray lying on your side"]
  ],
  // No fatigue, illness, worry, sadness, hurt or distress befalls a Muslim, even the prick of a thorn, but Allah wipes
  // away some of his sins for it (Sahih al-Bukhari 5641). (What Ibn Kathir says on 11:11 is not in the scene.)
  "sign-even-a-thorn": [
    ["What does even a thorn's prick do for a Muslim?", "Wipes away some sins", "But Allah wipes away some of his sins for it"],
    ["Which of these is also named in the hadith?", "Sadness", "Nor worry, sadness, hurt or distress"],
    ["Hard moments can be a mercy for a believer.", "True", "But Allah wipes away some of his sins for it"],
    ["What does a thorn prick do for a Muslim, per the hadith?", "Wipes away some sins", "But Allah wipes away some of his sins for it"],
    ["Sadness and worry also wipe away a Muslim's sins.", "True", "But Allah wipes away some of his sins for it"],
    ["What does even a thorn prick do?", "Wipes away some sins", "But Allah wipes away some of his sins for it"],
    ["Which of these is named in the hadith?", "Sadness", "Nor worry, sadness, hurt or distress"],
    ["Small hurts can still bring a reward.", "True", "But Allah wipes away some of his sins for it"]
  ],
  // Umar on the minbar: deeds are only by intentions, and each person gets only what he intended; whoever emigrated for
  // the world or to marry, his emigration is for what he emigrated for (Sahih al-Bukhari 1). (Where it stands in
  // al-Bukhari, its chain, Alqamah's teachers and the feeding of 76:8 are not in the scene.)
  "sign-intentions": [
    ["What are deeds judged by?", "Intentions", "Deeds are only by intentions"],
    ["Two people do the same deed. Can their reward differ?", "Yes, by their intentions", "Deeds are only by intentions", "Each person gets only what he intended"],
    ["What decides the reward of a hijrah?", "The intention behind it", "Deeds are only by intentions", "Each person gets only what he intended"],
    ["Someone who emigrated only to marry gets what?", "Only what he went for", "Whoever emigrated for the world, or to marry", "His emigration is for what he emigrated for"],
    ["Which companion told the hadith that a hijrah is by intention?", "Umar", "I heard Umar on the minbar say"],
    ["What does the reward of deeds depend on?", "Intentions", "Deeds are only by intentions"],
    ["What will each person get?", "What he intended", "Each person gets only what he intended"],
    ["Which hadith did Umar teach from the minbar?", "Actions are only by intentions", "Deeds are only by intentions"],
    ["Who did Alqamah ibn Waqqas hear on the minbar?", "Umar ibn al-Khattab", "I heard Umar on the minbar say"],
    ["Which hadith did he hear from Umar?", "Actions are by intentions", "Deeds are only by intentions"]
  ],
  // Two expressions, easy for the tongue to say, but very heavy in the balance and very dear to the Most Merciful:
  // Subhan Allah al-Azim and Subhan Allah wa bihamdihi (Sahih al-Bukhari 6406). (What Subhan Allah means, 56:74 and
  // the end of as-Saffat are not in the scene.)
  "sign-two-words": [
    ["How are the two phrases on the tongue?", "Easy to say", "Two expressions, easy for the tongue to say"],
    ["How are they on the scale of deeds?", "Very heavy", "But very heavy in the balance"],
    ["These two phrases are light on the tongue and...", "Heavy on the scale", "But very heavy in the balance"],
    ["Which is one of the two phrases?", "SubhanAllahi wa bihamdihi", "Subhan Allah al-Azim", "Subhan Allah wa bihamdihi"],
    ["Who loves these words?", "The Most Merciful", "And very dear to the Most Merciful"],
    ["Where are the two words heavy?", "On the Scale", "But very heavy in the balance"],
    ["Which pair are the two words?", "Subhanallahi wa bihamdih, Subhanallahil-'azim", "Subhan Allah al-Azim", "Subhan Allah wa bihamdihi"],
    ["These words are loved by the Most Merciful.", "True", "And very dear to the Most Merciful"],
    ["How heavy are the two phrases in the Balance?", "Very heavy", "But very heavy in the balance"],
    ["Who loves these phrases, in the hadith?", "The Most Merciful", "And very dear to the Most Merciful"],
    ["Which phrase is one of the two?", "SubhanAllahi wa bihamdihi", "Subhan Allah al-Azim", "Subhan Allah wa bihamdihi"],
    ["How are the two phrases on the tongue?", "Very easy", "Two expressions, easy for the tongue to say"],
    ["How are they on the Scale?", "Very heavy", "But very heavy in the balance"],
    ["Which phrase is one of the two?", "Subhan Allahi wa bihamdihi", "Subhan Allah al-Azim", "Subhan Allah wa bihamdihi"],
    ["How are the two phrases, in the hadith?", "Easy to say, heavy on the Scale", "Two expressions, easy for the tongue to say", "But very heavy in the balance"],
    ["Which phrase is one of them?", "SubhanAllah wa bihamdihi", "Subhan Allah al-Azim", "Subhan Allah wa bihamdihi"],
    ["How are the two phrases on the scale?", "Very heavy", "But very heavy in the balance"],
    ["They are dear to the Most Merciful.", "True", "And very dear to the Most Merciful"]
  ],
  // Cleanliness is half of faith, Alhamdulillah fills the scale, prayer is a light, charity is proof and endurance is a
  // brightness (Sahih Muslim 223).
  "sign-half-of-faith": [
    ["How much of faith is purity?", "Half", "Cleanliness is half of faith"],
    ["What fills the scale, in the same hadith?", "Alhamdulillah", "Alhamdulillah fills the scale"],
    ["In the same hadith, prayer is called a light.", "True", "Prayer is a light"],
    ["What fills the scale, in Muslim 223?", "Al-hamdu lillah", "Alhamdulillah fills the scale"],
    ["What is half of faith, in the same hadith?", "Cleanliness", "Cleanliness is half of faith"],
    ["A short word of praise can weigh heavy on the scale.", "True", "Alhamdulillah fills the scale"],
    ["What is half of faith, per the hadith?", "Cleanliness", "Cleanliness is half of faith"],
    ["What does Alhamdulillah fill, per the hadith?", "The scale", "Alhamdulillah fills the scale"],
    ["Cleanliness has nothing to do with faith.", "False", "Cleanliness is half of faith"],
    ["Which phrase fills the scale?", "Alhamdulillah", "Alhamdulillah fills the scale"],
    ["The same hadith calls prayer a light.", "True", "Prayer is a light"]
  ],
  // The signs of a hypocrite are three: whenever he speaks he tells a lie, whenever he promises he breaks it, and if
  // you trust him he proves to be dishonest (Sahih al-Bukhari 33). (Who narrated it, what Ibn Kathir says and 23:8 are
  // not in the scene.)
  "sign-three-signs": [
    ["How many signs of a hypocrite did the Prophet ﷺ name?", "Three", "The signs of a hypocrite are three"],
    ["Which is a sign of a hypocrite?", "Breaking promises", "Whenever he promises, he always breaks it"],
    ["Keeping your promise is part of good character.", "True", "Whenever he promises, he always breaks it"],
    ["How many signs of a hypocrite are in the hadith?", "Three", "The signs of a hypocrite are three"],
    ["Which is NOT one of the three signs?", "Praying at night", "Whenever he speaks, he tells a lie", "If you trust him, he proves to be dishonest"],
    ["Keeping promises protects a Muslim from hypocrisy.", "True", "Whenever he promises, he always breaks it"],
    ["What does a hypocrite do when he promises?", "He breaks it", "Whenever he promises, he always breaks it"],
    ["Telling lies is one of the hypocrite's signs.", "True", "Whenever he speaks, he tells a lie"],
    ["How many signs of a hypocrite are named?", "Three", "The signs of a hypocrite are three"],
    ["What does a hypocrite do with promises?", "Breaks them", "Whenever he promises, he always breaks it"],
    ["How many signs of a hypocrite are in Bukhari 33?", "Three", "The signs of a hypocrite are three"],
    ["What does a hypocrite do when he speaks?", "He tells a lie", "Whenever he speaks, he tells a lie"],
    ["Breaking promises is a sign of a hypocrite.", "True", "Whenever he promises, he always breaks it"],
    ["Betraying a trust is one of the three signs.", "True", "If you trust him, he proves to be dishonest"],
    ["Telling lies is one of the three signs.", "True", "Whenever he speaks, he tells a lie"],
    ["Which is one of the signs?", "Breaking promises", "Whenever he promises, he always breaks it"],
    ["Lying is a sign of hypocrisy.", "True", "Whenever he speaks, he tells a lie"]
  ],
  // He who calls to righteousness has a reward like those who adhered to it, without their rewards being diminished;
  // and he who calls to error carries its sin like those who committed it (Sahih Muslim 2674). (What 16:25 and Ibn
  // Kathir say is not in the scene.)
  "sign-call-to-good": [
    ["What does one who calls to good receive?", "The reward of those who follow", "Has a reward like those who adhered to it"],
    ["Does it lessen the followers' reward?", "No, not at all", "Without their rewards being diminished"],
    ["Calling others to wrong carries a share of the sin.", "True", "Carries its sin, like those who committed it"],
    ["What does one who calls to good get, in the hadith?", "A reward like his followers'", "Has a reward like those who adhered to it"],
    ["Is the followers' reward reduced, in the hadith?", "No, not at all", "Without their rewards being diminished"],
    ["What does a caller to good get, in the hadith?", "Reward like his followers", "Has a reward like those who adhered to it"],
    ["Is the followers' reward lessened, in the hadith?", "No", "Without their rewards being diminished"],
    ["Calling to error brings the sin of those who follow.", "True", "Carries its sin, like those who committed it"],
    ["What does one who calls to good get, per Muslim 2674?", "Rewards like those who follow", "Has a reward like those who adhered to it"],
    ["Are the followers' rewards reduced?", "No, not at all", "Without their rewards being diminished"]
  ],
  // Allah is pleased with His servant who says Alhamdulillah while taking a morsel and while drinking (Sahih Muslim
  // 2734). (Who narrated it and what Ibn Kathir says are not in the scene.)
  "sign-praise-each-bite": [
    ["What pleases Allah after you eat or drink?", "Saying Alhamdulillah", "Who says Alhamdulillah while taking a morsel", "And while drinking"],
    ["Is it only after food, or after drinks too?", "After drinks too", "And while drinking"],
    ["Thanking Allah after a meal is a small but loved deed.", "True", "Allah is pleased with His servant", "Who says Alhamdulillah while taking a morsel"],
    ["What pleases Allah, in the hadith?", "Praising Him for food and drink", "Who says Alhamdulillah while taking a morsel", "And while drinking"],
    ["What should a grateful servant say after a sip of water?", "Al-Hamdu lillah", "Who says Alhamdulillah while taking a morsel", "And while drinking"],
    ["What should we say after drinking?", "Alhamdulillah", "Who says Alhamdulillah while taking a morsel", "And while drinking"],
    ["How does Allah feel about this praise?", "Pleased", "Allah is pleased with His servant", "And while drinking"],
    ["Thanking Allah for water and food pleases Him.", "True", "Allah is pleased with His servant", "And while drinking"],
    ["What pleases Allah, per the hadith?", "Saying Al-Hamdu lillah while eating", "Who says Alhamdulillah while taking a morsel"],
    ["When else should we praise Him, per the hadith?", "While drinking", "And while drinking"],
    ["Small thanks for food can win Allah's pleasure.", "True", "Allah is pleased with His servant", "Who says Alhamdulillah while taking a morsel"],
    ["What pleases Allah at mealtime, per the hadith?", "Saying Alhamdulillah", "Who says Alhamdulillah while taking a morsel"],
    ["When should we praise Him, per the hadith?", "When eating and drinking", "Who says Alhamdulillah while taking a morsel", "And while drinking"]
  ],
  // Anybody who believes in Allah and the Last Day should not harm his neighbor, should entertain his guest
  // generously, and should talk what is good or keep quiet (Sahih al-Bukhari 6018).
  "sign-good-or-quiet": [
    ["If you can't say something good, what should you do?", "Stay quiet", "Should talk what is good or keep quiet"],
    ["A believer is kind to his neighbor and his guest.", "True", "Should not harm his neighbor", "Should entertain his guest generously"],
    ["If you have nothing good to say, what should you do?", "Stay quiet", "Should talk what is good or keep quiet"],
    ["This advice is for whoever believes in Allah and what?", "The Last Day", "Anybody who believes in Allah and the Last Day"],
    ["The same hadith also says to honor whom?", "Your guest", "Should entertain his guest generously"],
    ["What should a believer say, per the hadith?", "What is good, or stay quiet", "Should talk what is good or keep quiet"],
    ["How should a believer treat his guest?", "Generously", "Should entertain his guest generously"],
    ["Harming a neighbor is fine if he is a stranger.", "False", "Should not harm his neighbor"]
  ],
  // Sufyan asked for something about Islam he need ask no one else; he ﷺ said: Say, I affirm my faith in Allah, and
  // then remain steadfast to it (Sahih Muslim 38). (What 11:112, 41:30 and 46:13 say, and what Abu Bakr said, are not
  // in the scene.)
  "sign-then-steadfast": [
    ["What did he ﷺ tell Sufyan to say?", "I believe in Allah", "Say: I affirm my faith in Allah"],
    ["And after saying it?", "Stay firm on it", "And then remain steadfast to it"],
    ["Being steadfast means staying on the right path every day.", "True", "And then remain steadfast to it"],
    ["What did the Prophet ﷺ say after: I believe in Allah?", "Then stay firm on it", "And then remain steadfast to it"],
    ["What did the Prophet ﷺ tell Sufyan, per Muslim 38?", "Say I believe in Allah, then stand firm", "Say: I affirm my faith in Allah", "And then remain steadfast to it"],
    ["Sufyan wanted advice he would never need to ask anyone else about.", "True", "That I need ask no one other than you"]
  ],
  // The deed dearest to Allah is the prayer at its early fixed time, then being good and dutiful to one's parents
  // (Sahih al-Bukhari 527). (Who asked, the prayer times of the day and 23:9 are not in the scene.)
  "sign-dearest-deeds": [
    ["____ on time is a deed Allah loves most.", "Salah", "The prayers at their early fixed times"],
    ["Which deed did the Prophet ﷺ name first as dearest to Allah?", "Prayer on time", "The prayers at their early fixed times"],
    ["What came second?", "Kindness to parents", "Then, to be good and dutiful to your parents"],
    ["Which deed does Allah love most, per the hadith?", "Prayer on time", "The prayers at their early fixed times"],
    ["What came next after prayer, per the hadith?", "Kindness to parents", "Then, to be good and dutiful to your parents"],
    ["Which deed is dearest to Allah, per the hadith?", "Prayer at its early fixed time", "The prayers at their early fixed times"],
    ["What came next after prayer?", "Being good to parents", "Then, to be good and dutiful to your parents"],
    ["Delaying prayer to the last minute is best.", "False", "The prayers at their early fixed times"]
  ],
  // Truthfulness leads to righteousness and righteousness to Paradise, and a man keeps telling the truth until he is
  // truthful; falsehood leads to wickedness and wickedness to the Fire (Sahih al-Bukhari 6094). (Who narrated it and
  // 9:119 are not in the scene.)
  "sign-truth-leads": [
    ["Where does truthfulness lead?", "To goodness, then Jannah", "Truthfulness leads to righteousness", "And righteousness leads to Paradise"],
    ["What happens to someone who keeps telling the truth?", "He becomes a truthful person", "A man keeps telling the truth until he is truthful"],
    ["Lying leads to wrongdoing.", "True", "Falsehood leads to wickedness"],
    ["Where does truthfulness lead, per the hadith?", "To righteousness", "Truthfulness leads to righteousness"],
    ["Telling the truth again and again makes a person truthful.", "True", "A man keeps telling the truth until he is truthful"]
  ],
  // He who relieves a brother's suffering, Allah relieves his on the Day of Resurrection; he who hides a Muslim's
  // faults, Allah hides his; Allah helps a servant while he helps his brother; and a path for knowledge is made easy
  // to Paradise (Sahih Muslim 2699a). (Which knowledge is meant, and these lessons, are not in the scene.)
  "sign-ease-a-hardship": [
    ["Ease someone's hardship. What does Allah do?", "Eases yours on Judgment Day", "Allah relieves him on the Day of Resurrection"],
    ["How long does Allah help a servant?", "While he helps his brother", "Allah helps him as long as he helps his brother"],
    ["Hiding a Muslim's faults is also rewarded.", "True", "He who hides a Muslim's faults, Allah hides his"],
    ["When does Allah help a person?", "While they help their brother", "Allah helps him as long as he helps his brother"],
    ["What happens when you hide a friend's mistake?", "Allah hides yours", "He who hides a Muslim's faults, Allah hides his"],
    ["Seeking knowledge makes the path to Jannah easy.", "True", "A path for knowledge, made easy to Paradise"],
    ["Seeking knowledge makes which path easy?", "The path to Jannah", "A path for knowledge, made easy to Paradise"]
  ],
  // No one's deeds will save him, not even the Prophet's, unless Allah has mercy on him; so do good deeds properly,
  // sincerely and moderately, and you will reach your target (Sahih al-Bukhari 6463). (35:35 is not in the scene.)
  "sign-saved-by-mercy": [
    ["What gets us into Jannah in the end?", "Allah's mercy", "Not even I, unless Allah has mercy on me"],
    ["So should we stop doing good deeds?", "No: do them steadily and sincerely", "Do good deeds properly, sincerely and moderately"],
    ["The Prophet ﷺ said even he needs Allah's mercy.", "True", "Not even I, unless Allah has mercy on me"],
    ["What saves a person, in Bukhari 6463?", "Allah's mercy", "Not even I, unless Allah has mercy on me"],
    ["How should we do good deeds, per the hadith?", "Sincerely and moderately", "Do good deeds properly, sincerely and moderately"],
    ["We still do good deeds, while hoping for Allah's mercy.", "True", "Not even I, unless Allah has mercy on me", "Do good deeds properly, sincerely and moderately"],
    ["What saves a person in the end?", "Allah's mercy", "Not even I, unless Allah has mercy on me"],
    ["How should we do good deeds?", "Sincerely and moderately", "Do good deeds properly, sincerely and moderately"],
    ["Since mercy saves us, deeds do not matter.", "False", "Do good deeds properly, sincerely and moderately"],
    ["What saves a person, in the hadith?", "Allah's mercy", "Not even I, unless Allah has mercy on me"],
    ["We should stop doing good since mercy saves us.", "False", "Do good deeds properly, sincerely and moderately"]
  ],
  // The best charity is the one given while healthy, afraid of poverty and wishing to be wealthy, not delayed until
  // death is near, when it already belongs to others (Sahih al-Bukhari 1419). (Who narrated it and 63:10 are not in
  // the scene.)
  "sign-give-while-healthy": [
    ["Which charity is best?", "Given while healthy and wanting money", "The charity you give while you are healthy", "Afraid of poverty and wishing to be wealthy"],
    ["What did he ﷺ warn against?", "Waiting until death is near", "Do not delay it until death is near"],
    ["Giving is harder, and better, when you want the money.", "True", "Afraid of poverty and wishing to be wealthy"],
    ["Which charity is best, in the hadith?", "Given while healthy", "The charity you give while you are healthy"],
    ["Until when should charity not be delayed?", "Approaching death", "Do not delay it until death is near"],
    ["When is charity best, per the hadith?", "While healthy", "The charity you give while you are healthy"],
    ["What feeling makes the giving greater?", "Fear of becoming poor", "Afraid of poverty and wishing to be wealthy"],
    ["What does the hadith say not to delay?", "Charity", "Do not delay it until death is near"],
    ["When is it too late to give?", "When death is near", "Do not delay it until death is near", "And it already belongs to such and such"],
    ["Which charity is best, per the hadith?", "Given while healthy", "The charity you give while you are healthy"],
    ["Delaying charity until the last moment is just as good.", "False", "Do not delay it until death is near", "And it already belongs to such and such"],
    ["How does the giver feel about wealth, per the hadith?", "He wishes to become wealthy", "Afraid of poverty and wishing to be wealthy"]
  ],
  // A strong believer is more lovable to Allah than a weak one, and there is good in everyone; cherish what benefits
  // you and seek Allah's help; in trouble, do not say "if only" but: Allah did what He had ordained, for "if" opens
  // the gate for Satan (Sahih Muslim 2664).
  "sign-strong-believer": [
    ["What should we say when something bad happens?", "Allah decreed and did as He willed", "But say: Allah did what He had ordained"],
    ["What does 'if only' open, as he ﷺ said?", "The door to Satan", "If trouble comes, don't say: If only I had", "For your 'if' opens the gate for Satan"],
    ["Accepting the decree brings peace to the heart.", "True", "But say: Allah did what He had ordained"],
    ["Which believer is dearer to Allah?", "The strong believer", "A strong believer is more lovable to Allah"],
    ["What should you do with what benefits you?", "Strive for it, with Allah's help", "Cherish what benefits you, seek Allah's help"],
    ["There is good in every believer.", "True", "Than a weak believer; there is good in everyone"],
    ["What should you say after something goes wrong?", "Allah decreed and did what He willed", "But say: Allah did what He had ordained"],
    ["Which believer is more loved by Allah?", "The strong believer", "A strong believer is more lovable to Allah"],
    ["Saying if only opens a door to Shaytan.", "True", "If trouble comes, don't say: If only I had", "For your 'if' opens the gate for Satan"],
    ["Whom is Allah more pleased with, per Muslim 2664?", "A strong believer", "A strong believer is more lovable to Allah"],
    ["What should we say when trouble comes?", "Allah did what He ordained", "But say: Allah did what He had ordained"],
    ["Saying if only I had is the best reply to trouble.", "False", "If trouble comes, don't say: If only I had", "But say: Allah did what He had ordained"],
    ["Who is more loved by Allah, per Muslim 2664?", "The strong believer", "A strong believer is more lovable to Allah"],
    ["Is there good in the weak believer too?", "Yes, there is good in both", "Than a weak believer; there is good in everyone"],
    ["What does the hadith say to do in trouble?", "Seek Allah's help, do not lose heart", "Cherish what benefits you, seek Allah's help"],
    ["What should we say after trouble?", "Allah decreed it", "But say: Allah did what He had ordained"],
    ["What does if only open, per the hadith?", "The way for Satan", "If trouble comes, don't say: If only I had", "For your 'if' opens the gate for Satan"],
    ["A strong believer is more loved by Allah.", "True", "A strong believer is more lovable to Allah"]
  ],
  // If anyone forgets a prayer, he should pray it when he remembers it; there is no expiation except to pray it
  // (Sahih al-Bukhari 597). (Sleeping through a prayer, the prayer times, how serious missing one is and 20:14 are
  // not in the scene.)
  "sign-forgotten-prayer": [
    ["What should one do with a forgotten prayer?", "Pray it when remembered", "He should pray it when he remembers it"],
    ["Is there another expiation, in the hadith?", "No, only praying it", "There is no expiation except to pray it"],
    ["If you miss a prayer, pray it as ____ as you can.", "soon", "He should pray it when he remembers it"]
  ]
};

/** How long before the end of its last moment the scene stops, so that moment's words still show. */
const WORDS_HOLD = 0.03;

export type SceneQuestion = {
  scene: SignScene;
  /** Where the scene waits for the answer: the end of the moment before (its start, for the first). */
  pause: number;
  /** Where it stops once answered: the end of the moment asked about (just before, while its words show). */
  reveal: number;
};

/** Where a scene waits and where it stops, for a question on its moments `from` to `to` (each a moment's words). */
export function sceneMoment(kind: SignKind, from: string, to: string = from) {
  const words = signArt(kind).words;
  const first = words.findIndex((word) => word.text === from);
  const last = words.findIndex((word) => word.text === to);
  if (first < 0 || last < first) return undefined;
  const end = words[last].to;
  return { pause: first > 0 ? words[first - 1].to : 0, reveal: end >= 1 ? 1 : Number((end - WORDS_HOLD).toFixed(3)) };
}

const key = (prompt: string, answer: string) => `${prompt.trim()}\n${answer.trim()}`;

let index: Map<string, { sceneId: string; from: string; to?: string }> | undefined;

/** Every story question, by its English prompt and right answer (for the tests). */
export function sceneAsks() {
  return Object.entries(ASKS).flatMap(([sceneId, asks]) => asks.map(([prompt, answer, from, to]) => ({ sceneId, prompt, answer, from, to: to ?? from })));
}

/** The scene a question is asked on, and where it waits and stops; read on the English question. */
export function sceneQuestionFor(challenge: Pick<Challenge, "prompt" | "choices" | "correctChoiceId">): SceneQuestion | undefined {
  if (!index) {
    index = new Map();
    for (const ask of sceneAsks()) index.set(key(ask.prompt, ask.answer), ask);
  }
  const right = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
  const ask = right ? index.get(key(challenge.prompt, right)) : undefined;
  const scene = ask ? SIGN_SCENES.find((each) => each.id === ask.sceneId) : undefined;
  const moment = ask && scene ? sceneMoment(scene.kind, ask.from, ask.to) : undefined;
  return scene && moment ? { scene, ...moment } : undefined;
}
