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
  // relatives (Quran 3:92, Sahih al-Bukhari 1461, 4554). (What he gave, and that Bayruha faced the masjid, stay on their
  // usual picture: the garden and the masjid are there from the scene's start.)
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
    ["Whom did the Prophet ﷺ tell him to give it to?", "His relatives", "Shared among his relatives"],
    ["Where did the Prophet ﷺ tell him to give it?", "To his relatives", "Shared among his relatives"]
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
  // and 59:9 was revealed (Sahih al-Bukhari 4889, Sahih Muslim 2054c). (That Allah was pleased with them is not in the
  // scene, so it is not asked here.)
  "sign-lamp-out": [
    ["What food did the wife have?", "Only the children's food", "Only the little ones' food: let them sleep"],
    ["Why did they put out the light?", "So the guest could eat", "And she put out the light", "In the dark he ate, and they slept hungry"],
    ["This story led to the words of 59:9.", "True", "Then Allah revealed 59:9 about them"],
    ["Why did they put out the lamp?", "So the guest would eat alone", "And she put out the light", "In the dark he ate, and they slept hungry"]
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
  // went away (Sahih al-Bukhari 4770, 4971, 4972). (Whom 26:214 says to warn, and the ayahs of al-Masad, are not in the
  // scene; on which mountain he stood is asked on the map, and that he called from a mountain stays on its usual
  // picture: the mountain is there from the scene's start.)
  "sign-safa-call": [
    ["What did Quraysh say about his honesty?", "They never heard him lie", "We have never heard you tell a lie"],
    ["What did he call himself to them?", "A plain warner", "I am a plain warner of a severe punishment"],
    ["Abu Lahab thanked him for the warning.", "False", "Abu Lahab: only for this? And he went away"],
    ["Where did the Prophet ﷺ call his people from?", "As-Safa", "He climbed as-Safa and called out to Quraysh"],
    ["Why did Quraysh say they would believe him?", "He always told the truth", "We have never heard you tell a lie"],
    ["What did he first ask them?", "Would they believe a warning from him", "If I warned of horsemen, would you believe me?"],
    ["Quraysh said yes, they would believe him.", "True", "We have never heard you tell a lie"]
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
  ],
  // Whoever has a mustard seed of pride in his heart will not enter Paradise; liking fine clothes and shoes is not
  // pride, for Allah is beautiful and loves beauty; pride is rejecting the truth and looking down on people (Sahih
  // Muslim 91). (Ibn Kathir, 3:21, 46:11 and the first pride, of Iblis, are not in the scene.)
  "sign-mustard-of-pride": [
    ["What is pride, as the Prophet ﷺ explained it?", "Rejecting truth and looking down on people", "Pride is rejecting the truth", "And looking down on people"],
    ["Is liking nice clothes pride?", "No, Allah loves beauty", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"],
    ["How much pride keeps a person from Jannah?", "Even a mustard seed", "Whoever has a mustard seed of pride in his heart", "Will not enter Paradise"],
    ["Liking nice clothes is pride.", "False", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"],
    ["What is pride, in Muslim 91?", "Rejecting truth and scorning people", "Pride is rejecting the truth", "And looking down on people"],
    ["Wanting fine clothes is itself pride.", "False", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"],
    ["Is liking fine clothes pride?", "No, Allah loves beauty", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"],
    ["What is pride, per the Prophet ﷺ?", "Rejecting truth and scorning people", "Pride is rejecting the truth", "And looking down on people"],
    ["Looking down on people is real pride.", "True", "And looking down on people"],
    ["What does Allah love, in the hadith?", "Grace", "Allah is beautiful and loves beauty"],
    ["What is pride, in the hadith?", "Rejecting truth, scorning people", "Pride is rejecting the truth", "And looking down on people"],
    ["In the hadith, liking fine clothes is pride.", "False", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"],
    ["What is pride, per Muslim 91?", "Rejecting truth, looking down on people", "Pride is rejecting the truth", "And looking down on people"],
    ["Is liking nice clothes pride, per Muslim 91?", "No, Allah loves grace", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"],
    ["What does Allah love, per Muslim 91?", "Beauty", "Allah is beautiful and loves beauty"],
    ["Wanting nice clothes and shoes is pride, per Muslim 91.", "False", "A man said: one likes fine clothes and shoes", "Allah is beautiful and loves beauty"]
  ],
  // Backbiting is talking of your brother in a way he dislikes; if what you say is in him, you have backbitten him,
  // and if it is not, you have slandered him (Sahih Muslim 2589). (33:58 and Ibn Kathir are not in the scene.)
  "sign-what-backbiting-is": [
    ["What is backbiting?", "Saying what he would dislike", "Talking of your brother in a way he dislikes"],
    ["If what you said about him is true, is it still backbiting?", "Yes, it is backbiting", "If it is in him, you have backbitten him"],
    ["If what you said is not true, it is what?", "Slander", "If it is not, you have slandered him"],
    ["What is backbiting, in the hadith?", "Saying what your brother dislikes", "Talking of your brother in a way he dislikes"],
    ["What is backbiting, per Muslim 2589?", "Saying what your brother dislikes", "Talking of your brother in a way he dislikes"],
    ["What if what you said is true, per Muslim 2589?", "It is still backbiting", "If it is in him, you have backbitten him"],
    ["Saying something false about him is even worse.", "True", "If it is not, you have slandered him"],
    ["What is backbiting, per the hadith?", "Saying what your brother dislikes", "Talking of your brother in a way he dislikes"],
    ["What is it if the bad thing is not even true?", "Slander", "If it is not, you have slandered him"],
    ["Saying a true fault is never backbiting.", "False", "If it is in him, you have backbitten him"]
  ],
  // The one who looks after an orphan will be with him in Paradise like two fingers, a little apart (Sahih al-Bukhari
  // 5304). (Which two fingers he showed, and al-Ma'un, are not in the scene.)
  "sign-orphan-carer": [
    ["Who will be close to the Prophet ﷺ in Jannah, like two fingers?", "One who cares for an orphan", "I and the one who looks after an orphan", "Will be in Paradise like this"],
    ["How did he ﷺ show how close they will be?", "With two fingers together", "He pointed with two fingers, a little apart"],
    ["Whom should we look after?", "Orphans", "I and the one who looks after an orphan"],
    ["What did he show with his hand?", "Two fingers together", "He pointed with two fingers, a little apart"],
    ["Caring for orphans brings one near him in Paradise.", "True", "Will be in Paradise like this", "He pointed with two fingers, a little apart"],
    ["Who will be close to him in Paradise?", "The one who looks after an orphan", "I and the one who looks after an orphan", "Will be in Paradise like this"],
    ["Caring for an orphan is a path to Paradise.", "True", "Will be in Paradise like this"],
    ["Who will be close to the Prophet ﷺ in Paradise?", "One who looks after an orphan", "I and the one who looks after an orphan", "Will be in Paradise like this"]
  ],
  // A Muslim is the one who avoids harming Muslims with his tongue and hands, and an emigrant is the one who gives up
  // all that Allah has forbidden (Sahih al-Bukhari 10). (Who narrated it is not in the scene.)
  "sign-safe-from-harm": [
    ["A true Muslim keeps people safe from his tongue and his what?", "Hand", "With his tongue and hands"],
    ["Hurting people with words is fine if you never hit them.", "False", "With his tongue and hands"],
    ["A Muslim keeps others safe from what?", "His tongue and hand", "With his tongue and hands"],
    ["Who is a true emigrant?", "One who leaves what Allah forbade", "And an emigrant is the one who gives up", "All that Allah has forbidden"],
    ["Hurtful words go against being a good Muslim.", "True", "A Muslim is the one who avoids harming Muslims", "With his tongue and hands"],
    ["Who is the true muhajir, says the Prophet ﷺ?", "One who leaves what Allah forbade", "And an emigrant is the one who gives up", "All that Allah has forbidden"],
    ["Who is a true Muslim in the same hadith?", "One whose tongue and hands harm no one", "A Muslim is the one who avoids harming Muslims", "With his tongue and hands"],
    ["You can still be a muhajir today by leaving sins.", "True", "And an emigrant is the one who gives up", "All that Allah has forbidden"],
    ["Who is a Muslim, per the hadith?", "One who harms no one by tongue or hand", "A Muslim is the one who avoids harming Muslims", "With his tongue and hands"],
    ["Which two things should we guard?", "Tongue and hands", "With his tongue and hands"],
    ["Hurtful jokes do not count if we laugh.", "False", "With his tongue and hands"]
  ],
  // Two men abused each other and one became red with anger; if he said: I seek refuge with Allah from Satan, all his
  // anger would go away (Sahih al-Bukhari 3282). (Who narrated it and 7:200 are not in the scene.)
  "sign-refuge-from-anger": [
    ["What words take anger away, in the hadith?", "I seek refuge with Allah from Shaytan", "If he says: I seek refuge with Allah from Satan", "All his anger would go away"],
    ["What was happening when the Prophet ﷺ said this?", "Two men were arguing", "Two men abused each other"],
    ["What word takes anger away, as the Prophet ﷺ said?", "A'udhu billahi minash-shaytan", "If he says: I seek refuge with Allah from Satan", "All his anger would go away"],
    ["What does A'udhu billah mean?", "I seek refuge in Allah", "If he says: I seek refuge with Allah from Satan"],
    ["Anger can come from Shaytan.", "True", "If he says: I seek refuge with Allah from Satan", "All his anger would go away"],
    ["What calms anger, in Bukhari 3282?", "Seeking refuge from Shaytan", "If he says: I seek refuge with Allah from Satan", "All his anger would go away"],
    ["What were the two men doing, in the hadith?", "Arguing", "Two men abused each other"],
    ["What word did the Prophet ﷺ teach, in the hadith?", "I seek refuge with Allah from Satan", "I know a word that would calm him", "If he says: I seek refuge with Allah from Satan"],
    ["What would happen if he said it, in the hadith?", "His anger would go away", "All his anger would go away"]
  ],
  // In Paradise there is a gate called ar-Rayyan; those who fast enter through it and none but them, and once they
  // have entered it is closed (Sahih al-Bukhari 1896). (How many gates there are and who narrated it are not in the
  // scene.)
  "sign-gate-ar-rayyan": [
    ["What is the gate called?", "Ar-Rayyan", "In Paradise there is a gate called ar-Rayyan"],
    ["Who enters by that gate?", "Those who fasted", "Those who fast will enter through it"],
    ["The gate closes once they have entered.", "True", "They will get up and enter", "Then it will be closed"],
    ["What is the gate for fasting people called?", "Ar-Rayyan", "In Paradise there is a gate called ar-Rayyan"],
    ["Anyone can enter by ar-Rayyan.", "False", "None but them will enter through it"],
    ["What is the gate called, in the hadith?", "Ar-Rayyan", "In Paradise there is a gate called ar-Rayyan"],
    ["Who enters through it, in the hadith?", "Those who fast", "Those who fast will enter through it"],
    ["What is Ar-Rayyan?", "A gate of Paradise", "In Paradise there is a gate called ar-Rayyan"],
    ["Who will enter through Ar-Rayyan?", "Those who fasted", "Those who fast will enter through it"]
  ],
  // Make things easy for people and do not make them hard; give them good tidings and do not make them run away
  // (Sahih al-Bukhari 69). (Who narrated it and 22:78 are not in the scene.)
  "sign-make-it-easy": [
    ["What did the Prophet ﷺ tell us to do for people?", "Make things easy", "Make things easy for people"],
    ["What should we give people, the Prophet ﷺ said?", "Good news", "Give them good tidings"],
    ["What did the Prophet ﷺ tell us to do with religion for people?", "Make it easy", "Make things easy for people"],
    ["What should we give people, per the hadith?", "Good tidings", "Give them good tidings"],
    ["What did the Prophet ﷺ tell us to do?", "Make things easy", "Make things easy for people"],
    ["What should we give people?", "Good news", "Give them good tidings"]
  ],
  // Allah has forbidden oppression for Himself, so do not oppress one another; seek guidance of Him and food of Him;
  // were all to ask and each be given, that would not decrease what He has, any more than a needle decreases the sea
  // (Sahih Muslim 2577). (Forgiveness, the wicked not shrinking His dominion, who narrated it, 10:44, 40:17 and Ibn
  // Kathir are not in the scene.)
  "sign-needle-in-the-sea": [
    ["What has Allah forbidden for Himself, per the hadith?", "Oppression", "I have forbidden oppression for Myself"],
    ["Allah wrongs people a little now and then.", "False", "I have forbidden oppression for Myself"],
    ["What happens to Allah's kingdom if He gives everyone what they ask?", "It does not decrease", "That would not decrease what I have", "Any more than a needle decreases the sea"],
    ["What has Allah forbidden for Himself, in the hadith?", "Oppression", "I have forbidden oppression for Myself"],
    ["What has Allah forbidden for Himself, per Muslim 2577?", "Injustice", "I have forbidden oppression for Myself"],
    ["What does Allah say, per Muslim 2577?", "Seek food of Me, I will feed you", "Seek food of Me and I shall feed you"],
    ["What must we seek for guidance?", "Ask Allah for it", "Seek guidance of Me and I shall guide you"]
  ],
  // Allah does not look to your faces and your wealth, but He looks to your heart and to your deeds (Sahih Muslim
  // 2564c). (Who narrated it, a poor believer dearer than a rich chief, 34:37 and Ibn Kathir are not in the scene.)
  "sign-hearts-and-deeds": [
    ["What does Allah look at?", "Your heart and your deeds", "But He looks to your heart", "And to your deeds"],
    ["Allah cares most about how pretty or rich you are.", "False", "Verily Allah does not look to your faces", "And your wealth"],
    ["What does Allah look at, per Muslim 2564?", "Hearts and deeds", "But He looks to your heart", "And to your deeds"],
    ["What does Allah look at, in the hadith?", "Hearts and deeds", "But He looks to your heart", "And to your deeds"],
    ["What does Allah look at, per the hadith?", "Hearts and deeds", "But He looks to your heart", "And to your deeds"],
    ["What does Allah not judge us by?", "Our faces and wealth", "Verily Allah does not look to your faces", "And your wealth"],
    ["A rich person is better to Allah for being rich.", "False", "And your wealth"],
    ["What does Allah not look at?", "Our faces and wealth", "Verily Allah does not look to your faces", "And your wealth"],
    ["Allah judges people by their looks.", "False", "Verily Allah does not look to your faces"]
  ],
  // The strong is not the one who overcomes the people by his strength, but the one who controls himself while in
  // anger (Sahih al-Bukhari 6114). (Who narrated it and 3:134 are not in the scene.)
  "sign-real-strength": [
    ["Who is truly strong?", "The one who controls his anger", "But the strong is the one", "Who controls himself while in anger"],
    ["Beating others in a fight makes you truly strong.", "False", "The strong is not the one", "Who overcomes the people by his strength"],
    ["Who is truly strong?", "One who controls himself when angry", "But the strong is the one", "Who controls himself while in anger"],
    ["Winning a fight shows true strength.", "False", "The strong is not the one", "Who overcomes the people by his strength"],
    ["Who is truly strong, in Bukhari 6114?", "One who controls himself when angry", "But the strong is the one", "Who controls himself while in anger"]
  ],
  // They said Takbir loudly on every high place; he said: be kind to yourselves, you are not calling a deaf or absent
  // one, but an All-Hearer, an All-Seer; say la hawla wa la quwwata illa billah, for it is one of the treasures of
  // Paradise (Sahih al-Bukhari 6384). (Abu Musa's name, what the words mean and Ibn Kathir are not in the scene.)
  "sign-treasure-of-paradise": [
    ["Which words did the Prophet ﷺ call a treasure of Paradise?", "La hawla wa la quwwata illa billah", "Say: La hawla wa la quwwata illa billah", "For it is one of the treasures of Paradise"],
    ["We must shout our dhikr so Allah hears it.", "False", "O people! Be kind to yourselves", "You are calling an All-Hearer, an All-Seer"],
    ["La hawla wa la quwwata illa billah is a treasure of where?", "Paradise", "For it is one of the treasures of Paradise"],
    ["On that journey he ﷺ also said: Allah is not deaf or far away.", "True", "You are not calling a deaf or absent one", "You are calling an All-Hearer, an All-Seer"],
    ["Which words are a treasure of Paradise?", "La hawla wa la quwwata illa billah", "Say: La hawla wa la quwwata illa billah", "For it is one of the treasures of Paradise"],
    ["Why need they not shout, in the hadith?", "Allah hears and sees all", "You are not calling a deaf or absent one", "You are calling an All-Hearer, an All-Seer"]
  ],
  // Paradise has one hundred grades, as far apart as the heaven and the earth; when you ask Allah, ask for al-Firdaws,
  // the best and highest part of Paradise, from which its rivers originate (Sahih al-Bukhari 2790). (23:11 and
  // staying in it forever are not in the scene.)
  "sign-hundred-levels": [
    ["How many levels does Jannah have?", "One hundred", "Paradise has one hundred grades"],
    ["Which level should you ask for?", "Al-Firdaws", "When you ask Allah, ask for al-Firdaws"],
    ["How far apart are two levels?", "Like the sky and the earth", "The distance between each of two grades", "Is like that between the heaven and the earth"],
    ["How many levels does Paradise have, in the hadith?", "One hundred", "Paradise has one hundred grades"],
    ["What should we ask Allah for, in the hadith?", "Al-Firdaws", "When you ask Allah, ask for al-Firdaws"],
    ["What flows from Al-Firdaws, in the hadith?", "The rivers of Paradise", "From it originate the rivers of Paradise"],
    ["How far apart are two grades, in the hadith?", "Like heaven and earth", "The distance between each of two grades", "Is like that between the heaven and the earth"],
    ["What comes from Al-Firdaws, in the hadith?", "The rivers of Paradise", "From it originate the rivers of Paradise"],
    ["What should we ask Allah for, per the hadith?", "Al-Firdaws", "When you ask Allah, ask for al-Firdaws"],
    ["What should we ask Allah for, per Bukhari 2790?", "Al-Firdaws", "When you ask Allah, ask for al-Firdaws"],
    ["How many grades does Paradise have?", "One hundred", "Paradise has one hundred grades"],
    ["What flows from Al-Firdaws?", "The rivers of Paradise", "From it originate the rivers of Paradise"],
    ["What should we ask Allah for?", "Al-Firdaus", "When you ask Allah, ask for al-Firdaws"],
    ["All of Paradise is one single level.", "False", "Paradise has one hundred grades"]
  ],
  // He was asked three times who the others in 62:3 are, and said: if faith were at Ath-Thurayya, the Pleiades, men,
  // or a man, from these would attain it (Sahih al-Bukhari 4897). (Salman by name, where his hand was, Persia and
  // when the surah came are not in the scene.)
  "sign-faith-at-the-pleiades": [
    ["What did he say Salman's people would reach?", "Faith, even at the stars", "If faith were at Ath-Thurayya, the Pleiades", "Men, or a man, from these would attain it"],
    ["How many times was the question asked?", "Three times", "Who are they, O Allah's Messenger?", "I repeated my question thrice"],
    ["Where did the Prophet ﷺ say faith might be?", "At Ath-Thurayya", "If faith were at Ath-Thurayya, the Pleiades"]
  ],
  // Allah made Makkah a sanctuary since the creation of the heavens and the earth, till the Day of Resurrection; its
  // thorns are not uprooted, its game is not chased, and its fallen things are not picked up except by one who would
  // announce them (Sahih al-Bukhari 1834).
  "sign-sacred-city": [
    ["Since when has Makkah been sacred?", "Since the heavens and earth were made", "Since the creation of the heavens and the earth"],
    ["What may not be done to its animals?", "Chase them", "Its game should not be chased"],
    ["Makkah stays sacred until the Day of Resurrection.", "True", "Till the Day of Resurrection"],
    ["Since when has Makkah been a sanctuary?", "Since the heavens and earth were made", "Since the creation of the heavens and the earth"],
    ["What must not be chased in Makkah?", "Its game animals", "Its game should not be chased"],
    ["Who may pick up a lost item there?", "One who announces it", "Its fallen things should not be picked up", "Except by one who would announce it"],
    ["Until when will it stay sacred?", "The Day of Resurrection", "Till the Day of Resurrection"],
    ["In Makkah, people may chase its animals for sport.", "False", "Its game should not be chased"]
  ],
  // When people argued too much about his rebuilding the masjid, Uthman said: whoever built a mosque, intending Allah's
  // pleasure, Allah would build for him a similar place in Paradise (Sahih al-Bukhari 450). (Who narrated it and Ibn
  // Kathir are not in the scene.)
  "sign-house-in-paradise": [
    ["What does Allah build for one who builds a masjid?", "A place in Paradise", "Allah would build for him", "A similar place in Paradise"],
    ["What does Allah build for one who builds a masjid?", "A similar place in Paradise", "Allah would build for him", "A similar place in Paradise"],
    ["What was being rebuilt when the hadith was told?", "The Prophet's ﷺ masjid", "Whoever built a mosque"],
    ["Which masjid did Uthman rebuild?", "The Prophet's ﷺ masjid", "Whoever built a mosque"],
    ["The masjid should be built for Allah's pleasure.", "True", "Intending Allah's Pleasure"],
    ["The builder should intend Allah's pleasure.", "True", "Intending Allah's Pleasure"]
  ],
  // The son of Adam claims: my wealth, my wealth; yet nothing is his but what he consumed, what he wore out, and what he
  // gave as charity and sent forward (Sahih Muslim 2958). (Which surah he was reciting, and the wealth left to other
  // people, are not in the scene.)
  "sign-my-wealth": [
    ["What does the son of Adam claim?", "My wealth, my wealth", "The son of Adam claims: My wealth, my wealth"],
    ["What does the son of Adam keep saying?", "My wealth, my wealth", "The son of Adam claims: My wealth, my wealth"],
    ["Which of these is truly ours, per the hadith?", "What we consumed or wore", "Except that which you consumed", "Or which you wore and then it was worn out"],
    ["What happens to wealth given in charity?", "It is sent forward for us", "Or you gave as charity and sent it forward"],
    ["Charity is like saving for the Hereafter.", "True", "Or you gave as charity and sent it forward"],
    ["Charity is wealth sent ahead for us.", "True", "Or you gave as charity and sent it forward"]
  ],
  // There is an hour on Friday: if a Muslim gets it while praying and asks something from Allah, Allah will definitely
  // meet his demand; and he pointed out the shortness of that time (Sahih al-Bukhari 935). (Ibn Kathir is not in the
  // scene.)
  "sign-hour-on-friday": [
    ["What is special about this hour on Friday?", "Du'a is answered", "And asks something from Allah", "Allah will definitely meet his demand"],
    ["What is special about an hour on Friday?", "Dua is answered", "And asks something from Allah", "Allah will definitely meet his demand"],
    ["What is special about Friday, per the hadith?", "An hour when duas are answered", "There is an hour on Friday", "Allah will definitely meet his demand"],
    ["How long is that hour?", "Short", "He pointed out the shortness of that time"],
    ["How long is the hour?", "Short", "He pointed out the shortness of that time"],
    ["Make many du'as on Fridays.", "True", "And asks something from Allah", "Allah will definitely meet his demand"],
    ["Making dua on Friday is a good habit.", "True", "And asks something from Allah", "Allah will definitely meet his demand"]
  ],
  // An announcer calls: you will be healthy and never fall ill, live and never die, stay young and never grow old, live
  // in plenty and never be destitute (Sahih Muslim 2837). (11:108, 15:48 and the gift without end are not in the
  // scene.)
  "sign-never-old": [
    ["Will people in Jannah grow old?", "No, they stay young", "You would remain young and never grow old"],
    ["Will they grow old, in the hadith?", "No, they stay young", "You would remain young and never grow old"],
    ["What will the caller in Paradise say, per the hadith?", "You will never grow old", "You would remain young and never grow old"],
    ["What else is promised in Muslim 2837?", "Staying young forever", "You would remain young and never grow old"],
    ["Will anyone die in Jannah?", "No, never", "That you live and do not die at all"],
    ["Life in Jannah has no sickness.", "True", "There is in store for you health", "And that you should never fall ill"],
    ["Will people of Paradise fall ill, in the hadith?", "Never", "There is in store for you health", "And that you should never fall ill"],
    ["What will never happen in Paradise, per Muslim 2837?", "Falling ill", "There is in store for you health", "And that you should never fall ill"],
    ["The people of Paradise will never become poor.", "True", "Always live in affluent circumstances", "And never become destitute"]
  ],
  // Beware of suspicion, for it is the worst of false tales; do not look for the others' faults, do not spy, do not be
  // jealous, do not desert and do not hate one another; O Allah's worshipers, be brothers (Sahih al-Bukhari 6064).
  // (Ibn Kathir on 53:28 is not in the scene.)
  "sign-beware-of-suspicion": [
    ["What did the Prophet ﷺ call suspicion?", "The most false of talk", "For suspicion is the worst of false tales"],
    ["What did he ﷺ call suspicion, per Bukhari 6064?", "The worst of false tales", "For suspicion is the worst of false tales"],
    ["What is suspicion, per Bukhari 6064?", "The worst of false tales", "For suspicion is the worst of false tales"],
    ["Looking for others' faults is forbidden, per Bukhari 6064.", "True", "Do not look for the others' faults"],
    ["Which of these does the hadith forbid?", "Spying on others", "And do not spy"],
    ["What does the hadith tell us to be instead?", "Brothers", "O Allah's worshipers! Be brothers"],
    ["What did he ﷺ tell the servants of Allah to be?", "Brothers", "O Allah's worshipers! Be brothers"],
    ["What does Bukhari 6064 tell us to be?", "Brothers", "O Allah's worshipers! Be brothers"]
  ],
  // Some poor people came: the wealthy will get higher grades; they pray and fast as we do and have more money to give.
  // He said: catch up by saying Subhan Allah, Al hamdu lillah and Allahu Akbar thirty three times each after every
  // prayer (Sahih al-Bukhari 843). (What the poor wanted most, and that rich and poor can both do it, are not shown.)
  "sign-thirty-three": [
    ["Who came worried, per Bukhari 843?", "Some poor people", "Some poor people came"],
    ["What did the poor people worry about?", "The rich getting higher grades", "The wealthy people will get higher grades"],
    ["Why were the poor worried, per Bukhari 843?", "The rich could give charity", "They have more money"],
    ["What could the rich do that the poor could not?", "Give charity and do Hajj", "They have more money"],
    ["How many times each, per Bukhari 843?", "Thirty-three", "Thirty three times each after every prayer"],
    ["How many times is each phrase said?", "Thirty-three", "Thirty three times each after every prayer"],
    ["When is this dhikr said?", "After every prayer", "Thirty three times each after every prayer"]
  ],
  // I have been given five things: victory by awe a month's journey away; the earth a place for praying and a thing for
  // Tayammum; every Prophet was sent to his nation only, but I to all mankind (Sahih al-Bukhari 335). (Who narrated it,
  // 7:158, 34:28 and Ibn Kathir are not in the scene.)
  "sign-five-gifts": [
    ["How many special gifts does Bukhari 335 list?", "Five", "I have been given five things"],
    ["How many things was the Prophet ﷺ given that no one had before?", "Five", "I have been given five things"],
    ["How many special things, in the hadith?", "Five", "I have been given five things"],
    ["How far did the awe reach?", "A month's journey", "For a distance of one month's journey"],
    ["The whole earth was made a place to pray.", "True", "The earth has been made for me", "A place for praying"],
    ["Where may his followers pray, per the hadith?", "Wherever the prayer time comes", "The earth has been made for me", "A place for praying"],
    ["Who were earlier prophets sent to?", "Their own people", "Every Prophet used to be sent to his nation only"],
    ["Earlier prophets were sent only to their own nation.", "True", "Every Prophet used to be sent to his nation only"],
    ["Who was he ﷺ sent to?", "All people", "Every Prophet used to be sent to his nation only", "But I have been sent to all mankind"],
    ["To whom was the Prophet ﷺ sent?", "All mankind", "Every Prophet used to be sent to his nation only", "But I have been sent to all mankind"]
  ],
  // Allah will give shade to seven on the Day when there will be no shade but His: a just ruler, a youth brought up in
  // worship, one whose heart is attached to the mosques, two who love each other for His sake, one who refuses, saying:
  // I am afraid of Allah, one who gives in secret, and one who remembers Allah alone, with tears (Sahih al-Bukhari 660).
  // (Ibn Kathir on Yusuf is not in the scene.)
  "sign-seven-in-the-shade": [
    ["How many people get Allah's shade in this hadith?", "Seven", "Allah will give shade to seven"],
    ["How many people get Allah's shade in the hadith?", "Seven", "Allah will give shade to seven"],
    ["How many will Allah shade, per the hadith?", "Seven", "Allah will give shade to seven"],
    ["How many are shaded, per Bukhari 660?", "Seven", "Allah will give shade to seven"],
    ["Which young person is among them?", "A youth raised worshipping Allah", "A just ruler, a youth brought up in worship"],
    ["Which youth is shaded, per the hadith?", "One raised in worship of Allah", "A just ruler, a youth brought up in worship"],
    ["Which other one is shaded, per Bukhari 660?", "A just ruler", "A just ruler, a youth brought up in worship"],
    ["How does one of them give charity?", "So secretly the left hand doesn't know", "His left hand knows not what his right gave"],
    ["How secretly does the man give charity?", "His left hand does not know", "His left hand knows not what his right gave"],
    ["Charity counts only if people see it.", "False", "His left hand knows not what his right gave"],
    ["Who weeps among the seven, per Bukhari 660?", "One who remembers Allah alone", "Remembering Allah alone, his tears flow"],
    // The same hadith in Sahih al-Bukhari 1423. (What 2:271 says, and whether giving openly is allowed, are not in the
    // scene.)
    ["How secret is the charity in Bukhari 1423?", "The left hand doesn't know", "His left hand knows not what his right gave"],
    ["How many are shaded, per Bukhari 1423?", "Seven", "Allah will give shade to seven"],
    ["Who is the first of the seven named?", "A just ruler", "A just ruler, a youth brought up in worship"],
    ["Weeping from fear of Allah when alone is praised.", "True", "Remembering Allah alone, his tears flow"]
  ],
  // Fasting is a shield; if someone fights him, he says: I am fasting; the smell of his mouth is better with Allah than
  // musk; he has left his food and drink for My sake, the fast is for Me; and the fasting person has two joys, at
  // breaking his fast and when he meets his Lord (Sahih al-Bukhari 1894, 1904). (What a hadith qudsi is, and that it is
  // not part of the Quran, are not in the scene.)
  "sign-two-joys": [
    ["What did the Prophet ﷺ call fasting?", "A shield", "Fasting is a shield"],
    ["Someone insults you while fasting. What do you say?", "I am fasting", "If someone fights him, he says: I am fasting"],
    ["A fasting person should stay calm and avoid fights.", "True", "If someone fights him, he says: I am fasting"],
    ["Why does Allah love the fasting person?", "He left food and drink for Allah", "He has left his food and drink for My sake"],
    ["Which deed did Allah say is for Him?", "Fasting", "The fast is for Me, and I will reward it"],
    ["To Allah, a fasting mouth smells better than what?", "Musk", "Better with Allah than the smell of musk"],
    ["Musk is a famous sweet perfume.", "True", "Better with Allah than the smell of musk"],
    ["How many joys does a fasting person have?", "Two", "The fasting person has two joys"],
    ["When is the fasting person's first joy?", "When breaking the fast", "One at the time of breaking his fast"],
    ["When is the first joy?", "When breaking the fast", "One at the time of breaking his fast"],
    ["Feeling happy at iftar is part of the reward.", "True", "One at the time of breaking his fast"],
    ["When is the second joy?", "When meeting his Lord", "And the other when he will meet his Lord"]
  ],
  // When he passed by al-Hijr, he said: do not enter the dwellings of those who wronged themselves unless you enter
  // weeping, lest what befell them befall you; if you do not weep, do not enter. Then he covered his head and hurried
  // till he crossed the valley (Sahih al-Bukhari 4419, 433). (7:78, that Thamud lived there, their wells and dough, and
  // who narrated it are not in the scene, and which place he passed has its own map.)
  "sign-ruins-of-al-hijr": [
    ["How did the Prophet ﷺ say to enter Al-Hijr's homes?", "Only weeping", "Unless you enter weeping"],
    ["How did he ﷺ say to enter those homes?", "Only while weeping", "Unless you enter weeping"],
    ["How should one pass the ruins of the punished, per the hadith?", "Weeping", "Unless you enter weeping"],
    ["How should one enter such places, in the hadith?", "Weeping", "Unless you enter weeping"],
    ["How should we pass places punished by Allah?", "Weeping and humble", "Unless you enter weeping"],
    ["What if one cannot weep, in the hadith?", "Do not enter", "If you do not weep, do not enter"],
    ["What did he do in the valley, in Bukhari 4419?", "Covered his head and hurried", "Then he covered his head and hurried"],
    ["What did the Prophet ﷺ do in that valley?", "Hurried through it", "Then he covered his head and hurried", "Till he crossed the valley"],
    ["He ﷺ covered his head and crossed the valley fast.", "True", "Then he covered his head and hurried", "Till he crossed the valley"]
  ],
  // Every child is born on the fitrah, and his parents shape him into another religion, as an animal gives birth to a
  // whole young one: do you find any part of it cut off? (Sahih al-Bukhari 1385). (11:17, 30:30 and what Ibn Kathir
  // says of the fitrah are not in the scene.)
  "sign-born-on-the-fitrah": [
    ["What is every child born upon?", "The fitrah", "Every child is born on the fitrah"],
    ["What is every child born upon, per the hadith?", "The fitrah", "Every child is born on the fitrah"],
    ["How is every child born?", "On the Fitrah", "Every child is born on the fitrah"],
    ["How is every child born, in the hadith?", "On the true faith", "Every child is born on the fitrah"],
    ["Children are born already sinful.", "False", "Every child is born on the fitrah"],
    ["Children are born carrying the sins of others.", "False", "Every child is born on the fitrah"],
    ["Who shapes a child after that?", "The parents", "His parents shape him into another religion"],
    ["Who can change the child, in the hadith?", "His parents", "His parents shape him into another religion"],
    ["What example did he give?", "An animal born whole", "As an animal gives birth to a whole young one"]
  ],
  // No good deeds done on other days are better than those done on these, the first ten days of Dhul-Hijjah; not even
  // jihad, except one who went out risking himself and his wealth and did not return with anything (Sahih al-Bukhari
  // 969). (Eid al-Adha, the month of Hajj, what to do at home, Ibn Abbas and the takbir are not in the scene.)
  "sign-best-ten-days": [
    ["Which days did he call the best for good deeds?", "The first ten of Dhul-Hijjah", "Are better than those done on these days"],
    ["Which ten days are the best for good deeds?", "The first ten of Dhul Hijjah", "Are better than those done on these days"],
    ["Which days are best for good deeds, per the hadith?", "First ten of Dhul-Hijjah", "Are better than those done on these days"],
    ["Which days are best for good deeds?", "The first ten of Dhul-Hijjah", "Are better than those done on these days"],
    ["We should do extra good in these ten days.", "True", "Are better than those done on these days"],
    ["The companions asked: not even what?", "Jihad", "They asked: not even jihad?"],
    ["What one exception did he mention?", "A man who gave his life and wealth", "Not even jihad, except one who went out", "And did not return with anything"]
  ],
  // Musa was asked who is the most learned and said: I am, not leaving knowledge to Allah; at the two seas was one
  // more learned. A boat carried them without fare, and a sparrow dipped its beak in the sea: their knowledge had not
  // decreased Allah's but as this sparrow decreased the sea. If only Musa had been more patient, more of their story
  // would be told (Sahih al-Bukhari 122). (What to say of knowledge, why the crew carried them, and the prayer of mercy
  // are not in the scene; which bird came has its own picture.)
  "sign-sparrow-and-the-sea": [
    ["What was Musa asked, in the hadith?", "Who is the most learned?", "Musa was asked: who is the most learned?"],
    ["Why was Musa corrected, in the hadith?", "He did not leave knowledge to Allah", "He said: I am the most learned", "At the two seas is one more learned than you"],
    ["What did the sparrow's sip stand for?", "How little we know next to Allah", "Our knowledge has not decreased Allah's", "Except as this sparrow decreased the sea"],
    ["What did the Prophet ﷺ wish for Musa?", "That he had been more patient", "If only Musa had been more patient"],
    ["What would more patience have brought, in the hadith?", "More of the story told to us", "If only Musa had been more patient"]
  ],
  // The people of Paradise will see the lofty mansions above them like a brilliant star far away on the horizon, in
  // the East or the West, because of their ranks. Asked if these are only for the prophets, he said: no, by Him in
  // whose Hand my soul is, they are for those who believed in Allah and the messengers (Sahih al-Bukhari 3256). (Who
  // narrated it is not in the scene.)
  "sign-lofty-mansions": [
    ["How are the lofty mansions seen, in the hadith?", "Like a bright star on the horizon", "Like a brilliant star far away on the horizon"],
    ["What are the lofty mansions compared to?", "A brilliant faraway star", "Like a brilliant star far away on the horizon"],
    ["Why are some mansions so high?", "Superiority in reward", "Because of the ranks between them"],
    ["Everyone in Paradise is happy, but levels differ.", "True", "Because of the ranks between them"],
    ["What did the people first ask?", "Are they only for the prophets?", "They asked: are these only for the prophets?"],
    ["The Prophet ﷺ swore by Allah when answering.", "True", "No: by Him in whose Hand my soul is"],
    ["Are they only for the Prophets, in the hadith?", "No, for those who believed", "No: by Him in whose Hand my soul is", "Believers in Allah and in the messengers"],
    ["Are the lofty mansions only for prophets?", "No, for true believers too", "No: by Him in whose Hand my soul is", "Believers in Allah and in the messengers"]
  ],
  // Jibril came and said: this is Khadijah, coming to you with a dish of food or drink; give her salam from her Lord and
  // from me, and give her glad tidings of a house in Paradise of qasab, of hollow pearl, with no noise in it and no toil
  // (Sahih al-Bukhari 3820). (What 15:48 says is not in the scene.)
  "sign-house-of-pearl": [
    ["Who sent salam to Khadijah?", "Allah, through Jibril", "Give her salam from her Lord and from me"],
    ["What was Khadijah bringing when Jibril came?", "A dish of food", "With a dish of food or drink"],
    ["What is her palace in Jannah free of?", "Noise and tiredness", "With no noise in it and no toil"],
    ["What will her palace in Paradise NOT have?", "Noise or tiredness", "With no noise in it and no toil"],
    ["Who sent salam to Khadijah, along with Jibril?", "Her Lord, Allah", "Give her salam from her Lord and from me"],
    ["What was in Khadijah's palace, in the hadith?", "No noise and no fatigue", "With no noise in it and no toil"]
  ],
  // In Paradise there is a tree in whose shade a rider could travel for a hundred years and not cross it (Sahih
  // al-Bukhari 3251, 4881). (Who narrated it, the words he said to recite, and what 56:30 promises are not in the
  // scene.)
  "sign-tree-of-a-hundred-years": [
    ["How long to ride through the tree's shade?", "A hundred years", "For a hundred years"],
    ["What does it teach about Jannah?", "Its size is beyond us", "And not cross it"],
    ["The rider crosses the shade in a day.", "False", "For a hundred years", "And not cross it"],
    ["How long could a rider travel in the tree's shade?", "A hundred years", "For a hundred years"],
    ["Could the rider cross the shade?", "No", "And not cross it"],
    ["How long to pass the tree's shade, per Bukhari 4881?", "One hundred years", "For a hundred years"]
  ],
  // My Pool is a month's journey across; its water is whiter than milk, its smell better than musk, and its cups are
  // like the stars of the sky; whoever drinks from it will never be thirsty again (Sahih al-Bukhari 6579).
  "sign-the-pool": [
    ["How wide is the Pool?", "A month's journey", "My Pool is a month's journey across"],
    ["What happens to whoever drinks from it?", "Never thirsty again", "Whoever drinks from it", "Will never be thirsty again"],
    ["How many cups does it have?", "As many as the stars", "Its cups are like the stars of the sky"],
    ["What is the Pond water like, per the hadith?", "Whiter than milk", "Its water is whiter than milk"],
    ["How many cups does the Pond have?", "As many as the stars", "Its cups are like the stars of the sky"],
    ["One sip from the Pond lasts only a short while.", "False", "Whoever drinks from it", "Will never be thirsty again"]
  ],
  // Do not abuse my companions: if one of you spent gold as much as Uhud, it would not reach a mudd of theirs, nor even
  // half of it (Sahih al-Bukhari 3673). (What Ibn Kathir says is not in the scene, and which mountain it was has its
  // own picture.)
  "sign-gold-like-uhud": [
    ["What did the Prophet ﷺ forbid about his companions?", "Abusing them", "Do not abuse my companions"],
    ["What would gold like Uhud not equal?", "A handful of theirs", "It would not reach a mudd of theirs"],
    ["The Sahabah have a very high rank.", "True", "It would not reach a mudd of theirs", "Nor even half of it"],
    ["What did he ﷺ forbid, per Bukhari 3673?", "Abusing his Companions", "Do not abuse my companions"],
    ["What would gold like Uhud not equal, per Bukhari 3673?", "A small Mudd they spent", "It would not reach a mudd of theirs"],
    ["How should we speak of the Companions?", "Never abuse them", "Do not abuse my companions"],
    ["What small amount of theirs outweighs it?", "A Mudd or half a Mudd", "It would not reach a mudd of theirs", "Nor even half of it"]
  ],
  // Allah gives respite to the wrongdoer, until, when He seizes him, He does not let him go; then he recited 11:102
  // (Sahih al-Bukhari 4686). (The ayah he recited, who narrated it and what Ibn Kathir says are not in the scene.)
  "sign-respite-then-seized": [
    ["What does Allah give the wrongdoer first, per the hadith?", "Respite", "Allah gives respite to the wrongdoer"],
    ["What happens when Allah seizes him?", "He never lets him go", "He does not let him go"],
    ["What does Allah give the oppressor first?", "Respite", "Allah gives respite to the wrongdoer"],
    ["What happens when Allah takes the oppressor?", "He never releases him", "He does not let him go"],
    ["A delay in punishment means Allah has forgotten.", "False", "Allah gives respite to the wrongdoer", "Until, when He seizes him"],
    ["A delay means Allah has forgotten.", "False", "Allah gives respite to the wrongdoer", "Until, when He seizes him"],
    ["What does Allah give the oppressor first?", "Respite, time", "Allah gives respite to the wrongdoer"],
    ["What happens when Allah seizes him?", "He never escapes", "He does not let him go"],
    ["Delay in punishment means no punishment.", "False", "Allah gives respite to the wrongdoer", "Until, when He seizes him"]
  ],
  // Convey from me, even if it is one ayah; tell of the Children of Israel, there is no harm; and whoever lies about me
  // on purpose, let him take his seat in the Fire (Sahih al-Bukhari 3461). (What to do with a hadith you have learned
  // is not in the scene.)
  "sign-convey-one-ayah": [
    ["How much should we pass on?", "Even one verse", "Even if it is one ayah"],
    ["Only scholars may share what they know.", "False", "Convey from me", "Even if it is one ayah"],
    ["How much should we pass on?", "Even one ayah", "Even if it is one ayah"],
    ["What is the punishment for lying about him ﷺ on purpose?", "A seat in the Fire", "Let him take his seat in the Fire"],
    ["Only scholars may share what they learned.", "False", "Convey from me", "Even if it is one ayah"],
    ["How much should we convey, per the hadith?", "Even a single sentence", "Even if it is one ayah"],
    ["What did he warn against?", "Lying about him on purpose", "Whoever lies about me on purpose"],
    ["Only scholars may share anything about Islam.", "False", "Convey from me", "Even if it is one ayah"]
  ],
  // The poor is not the one who goes around for a bite or two, or a date or two, but the one who does not have enough,
  // whom no one notices to give him charity, and who does not stand up to ask people (Sahih al-Bukhari 1479). (What
  // Ibn Kathir says of 51:19 is not in the scene.)
  "sign-the-hidden-poor": [
    ["Who is the real poor person, per Abu Hurayrah?", "One whose need is hidden", "But the one who does not have enough", "No one notices him, to give him charity"],
    ["The real poor person, in the hadith, does not beg.", "True", "And he does not stand up to ask people"],
    ["What does the hadith teach givers to do?", "Look out for quiet need", "But the one who does not have enough", "No one notices him, to give him charity"],
    ["Who is truly poor, per Bukhari 1479?", "One whose need is unknown", "But the one who does not have enough", "No one notices him, to give him charity"],
    ["Who is not the poor meant, per Bukhari 1479?", "One who goes round asking", "The poor is not the one who goes around"]
  ],
  // One came to him in very white clothes and asked: tell me of Islam, of iman and of ihsan. Ihsan: worship Allah as if
  // you see Him, and if you do not see Him, He sees you. Of the Hour: the one asked knows no more than the asker, and of
  // its signs, when herders compete in tall buildings. Bring him back! But they saw nothing: Jibril came to teach you
  // your religion (Sahih al-Bukhari 50, Sahih Muslim 8a). (What 41:47 says is not in the scene.)
  "sign-came-to-teach": [
    ["What did the Prophet ﷺ answer when Jibril asked when the Hour is?", "I know no more than you", "The one asked knows no more than the asker"],
    ["What did he tell Jibril about instead?", "Its signs", "When herders compete in tall buildings"],
    ["The Prophet ﷺ knew the exact day of the Hour.", "False", "The one asked knows no more than the asker"],
    ["Who will compete in building tall buildings?", "Poor camel shepherds", "When herders compete in tall buildings"],
    ["What will they compete in?", "Building tall buildings", "When herders compete in tall buildings"],
    ["Tall buildings are a sign of the Hour named by the Prophet ﷺ.", "True", "When herders compete in tall buildings"],
    ["What did the Prophet ﷺ answer Jibril, per Bukhari 50?", "The one asked knows no better", "The one asked knows no more than the asker"],
    ["Someone can tell us the exact date of the Hour.", "False", "The one asked knows no more than the asker"],
    ["What is Ihsan, per Bukhari 50?", "Worship Allah as if you see Him", "Ihsan: worship Allah as if you see Him"],
    ["Who asked the Prophet ﷺ about Ihsan?", "Jibril", "Jibril came to teach you your religion"],
    ["If we cannot reach that, we know Allah sees us.", "True", "And if you do not see Him, He sees you"],
    ["If we cannot reach that level, what then?", "Know that He is looking at us", "And if you do not see Him, He sees you"],
    ["What did the Prophet ﷺ answer about the Hour?", "The answerer knows no more", "The one asked knows no more than the asker"],
    ["What did he tell about instead?", "Its signs", "When herders compete in tall buildings"],
    ["Even the Prophet ﷺ did not know the time of the Hour.", "True", "The one asked knows no more than the asker"],
    ["Who asked the Prophet ﷺ about the Hour?", "Jibril", "Jibril came to teach you your religion"],
    ["What did the Prophet ﷺ answer?", "The answerer knows no more", "The one asked knows no more than the asker"],
    ["Even Jibril did not know the time of the Hour.", "True", "The one asked knows no more than the asker"],
    ["What was his answer?", "The answerer knows no more than the asker", "The one asked knows no more than the asker"],
    ["He said he would tell of the Hour's portents.", "True", "When herders compete in tall buildings"],
    ["Who came asking about Ihsan?", "Jibril", "Jibril came to teach you your religion"],
    ["What is Ihsan?", "Worship as if you see Allah", "Ihsan: worship Allah as if you see Him"],
    ["If we cannot reach that, what should we remember?", "He is looking at us", "And if you do not see Him, He sees you"],
    ["What is ihsan?", "Worship as if you see Allah", "Ihsan: worship Allah as if you see Him"],
    ["Who came to ask about Islam, iman and ihsan?", "Jibril, as a man", "Jibril came to teach you your religion"],
    ["Even when we can't see Allah, He sees us.", "True", "And if you do not see Him, He sees you"],
    ["Who came in very white clothes to ask the Prophet ﷺ?", "Jibril", "Jibril came to teach you your religion"],
    ["Which three did Jibril ask about?", "Islam, Iman and Ihsan", "Tell me of Islam, of iman, of ihsan"],
    ["Why did Jibril come?", "To teach the Muslims their religion", "Jibril came to teach you your religion"]
  ],
  // Asma: my mother came to me, hoping, and she was a polytheist. I asked: shall I keep ties with her? He said: yes,
  // keep ties with your mother (Sahih al-Bukhari 2620, 5978, 3183). (Whose daughter she was and who linked 60:8 to her
  // story are not in the scene.)
  "sign-keep-ties": [
    ["Who came to visit Asma?", "Her mother", "My mother came to me, hoping"],
    ["What did the Prophet ﷺ tell Asma?", "Keep good relations with her", "Yes, keep ties with your mother"],
    ["Asma's mother was not a Muslim at the time.", "True", "She was a polytheist"],
    ["What did Asma ask the Prophet ﷺ?", "If she should be kind to her mother", "I asked: shall I keep ties with her?"],
    ["What did he ﷺ answer?", "Yes, keep good ties", "Yes, keep ties with your mother"],
    ["A new Muslim should cut off family who are not Muslim.", "False", "Yes, keep ties with your mother"],
    ["What did Asma ask the Prophet ﷺ?", "May I be kind to my mother?", "I asked: shall I keep ties with her?"],
    ["What did he answer?", "Yes", "Yes, keep ties with your mother"],
    ["What did Asma ask the Prophet ﷺ?", "May I treat her kindly?", "I asked: shall I keep ties with her?"],
    ["The Prophet ﷺ answered Asma with yes.", "True", "Yes, keep ties with your mother"],
    ["What did the Prophet ﷺ tell her?", "Keep good ties with her", "Yes, keep ties with your mother"],
    ["Muslims are kind to parents who are not Muslim.", "True", "Yes, keep ties with your mother"]
  ],
  // I will fast all day and pray all night. You cannot: fast and eat, pray and sleep. Fast one day and eat the next:
  // that is the fast of Dawud, the best fast. Most beloved to Allah is Dawud's prayer: he slept half the night, prayed
  // a third and slept a sixth of it (Sahih al-Bukhari 1976, 1131).
  "sign-fast-of-dawud": [
    ["How did Prophet Dawud fast?", "One day on, one day off", "Fast one day and eat the next"],
    ["Which extra fast is most loved by Allah?", "The fast of Dawud", "That is the fast of Dawud, the best fast"],
    ["Dawud also prayed part of the night and slept part.", "True", "He slept half the night, prayed a third", "And slept a sixth of it"],
    ["How did Dawud fast?", "Every other day", "Fast one day and eat the next"],
    ["How much of the night did Dawud pray?", "A third", "He slept half the night, prayed a third"],
    ["Whose fast did the Prophet ﷺ call most loved by Allah?", "Dawud's", "That is the fast of Dawud, the best fast"],
    ["What did Abdullah ibn Amr plan to do?", "Fast every day, pray all night", "I will fast all day and pray all night"],
    ["What did the Prophet ﷺ tell him?", "Fast and eat, pray and sleep", "You cannot. Fast and eat, pray and sleep"],
    ["Islam asks for balance in worship.", "True", "You cannot. Fast and eat, pray and sleep"],
    ["What had Abdullah ibn Amr vowed?", "To fast every day", "I will fast all day and pray all night"],
    ["What is the fast of Dawud?", "One day on, one day off", "Fast one day and eat the next"],
    ["Which fast did the Prophet ﷺ call the best?", "The fast of Dawud", "That is the fast of Dawud, the best fast"]
  ],
  // I am nearest of all to Isa son of Maryam, in this world and in the Hereafter. The prophets are brothers, of one
  // father; their mothers are different, and their religion is one (Sahih al-Bukhari 3443). (What 6:159, 10:72 and
  // 42:13 say and what Ibn Kathir and Ibn Abbas say are not in the scene.)
  "sign-one-religion": [
    ["What did all the prophets share?", "One religion", "And their religion is one"],
    ["Which prophet did he ﷺ say he was closest to?", "Isa", "I am nearest of all to Isa son of Maryam"],
    ["Every prophet called to worship Allah alone.", "True", "And their religion is one"],
    ["What do all prophets share, per Bukhari 3443?", "One religion", "And their religion is one"],
    ["How are the Prophets described, per the hadith?", "Brothers with one religion", "The prophets are brothers, of one father", "And their religion is one"],
    ["What did the Prophets share, per the hadith?", "One religion", "And their religion is one"],
    ["What are the prophets like, per Bukhari 3443?", "Brothers with one religion", "The prophets are brothers, of one father", "And their religion is one"]
  ],
  // All my ummah will enter Paradise except whoever refuses. They asked: who would refuse? Whoever obeys me enters
  // Paradise, and whoever disobeys me has refused (Sahih al-Bukhari 7280). (What 3:32 says is not in the scene.)
  "sign-who-refuses": [
    ["Who refuses Jannah, in Bukhari 7280?", "Whoever disobeys the Prophet ﷺ", "Whoever disobeys me has refused"],
    ["In Bukhari 7280, obeying the Prophet ﷺ is the way into Jannah.", "True", "Whoever obeys me enters Paradise"],
    ["Who will enter Paradise, per the hadith?", "Whoever obeys the Prophet ﷺ", "Whoever obeys me enters Paradise"],
    ["Who is the one who refuses?", "Whoever disobeys him", "Whoever disobeys me has refused"],
    ["All his followers will enter except those who refuse.", "True", "All my ummah will enter Paradise", "Except whoever refuses"],
    ["Who will not enter Paradise, per the hadith?", "Those who refuse", "Except whoever refuses"],
    ["Obeying him is the way into Paradise.", "True", "Whoever obeys me enters Paradise"]
  ],
  // I invited my mother to Islam; she said what I hated, and I came weeping. O Allah, guide Abu Hurairah's mother. The
  // door was shut and I heard water; then: I testify, there is no god but Allah. I went back weeping for joy. Make them
  // beloved to the believers (Sahih Muslim 2491). (Who asked for the second du'a is not in the scene.)
  "sign-guided-at-the-door": [
    ["What did Abu Hurairah ask the Prophet ﷺ?", "To make dua for his mother", "O Allah, guide Abu Hurairah's mother"],
    ["What happened when he got home?", "His mother became Muslim", "I testify: there is no god but Allah"],
    ["Abu Hurairah cried a second time, from joy.", "True", "I went back weeping for joy"],
    ["What does this teach about our parents?", "Keep making dua for them", "O Allah, guide Abu Hurairah's mother"],
    ["What did the Prophet ﷺ pray for Abu Hurairah and his mother?", "That the believers love them", "Make them beloved to the believers"],
    ["Abu Hurairah said believers who hear of him love him.", "True", "Make them beloved to the believers"]
  ],
  // I stand to pray, meaning to make it long; then I hear a child crying, so I make my prayer short, disliking to make
  // it hard for his mother (Sahih al-Bukhari 707).
  "sign-prayer-made-short": [
    ["What made the Prophet ﷺ shorten his prayer?", "A baby crying", "Then I hear a child crying"],
    ["Whom did he ﷺ not want to trouble?", "The child's mother", "Disliking to make it hard for his mother"],
    ["The Prophet ﷺ thought of others even while leading prayer.", "True", "So I make my prayer short", "Disliking to make it hard for his mother"],
    ["What made him ﷺ shorten the prayer?", "A child crying", "Then I hear a child crying"],
    ["Whom did he ﷺ not want to trouble?", "The mother", "Disliking to make it hard for his mother"],
    ["An imam should think of the people behind him.", "True", "So I make my prayer short", "Disliking to make it hard for his mother"]
  ],
  // It began with good dreams that came true like daybreak. He would go alone to the cave of Hira, taking food, and
  // worship there for many nights, until the truth came to him in the cave: Read! I am not one who reads. He came back,
  // his heart trembling (Sahih al-Bukhari 3). (What 96:1-5 say and who comforted him at home are not in the scene.)
  "sign-cave-of-hira": [
    ["How did the revelation begin, per Aishah?", "Good dreams that came true", "Good dreams that came true like daybreak"],
    ["He took food with him for his days of worship.", "True", "He would go alone to the cave of Hira"],
    ["Where was the Prophet ﷺ when the first ayahs came?", "In the cave of Hira", "He would go alone to the cave of Hira", "Until the truth came to him in the cave"],
    ["What was the first word Jibril said to him?", "Read", "Read! I am not one who reads"]
  ],
  // Cover me! Cover me! Khadijah: never, Allah will never disgrace you; you keep ties, carry the weak, help the poor and
  // honor the guest. She took him to her cousin Waraqah: this is the one Allah sent to Musa; none brought the like but
  // met hostility (Sahih al-Bukhari 3). (What 6:112 says and whom his enemies come from are not in the scene.)
  "sign-never-disgrace": [
    ["What did Khadijah say to comfort him?", "Allah will never disgrace you", "Never! Allah will never disgrace you"],
    ["Which good deed of his did she name?", "Keeping family ties", "You keep ties, you carry the weak"],
    ["Khadijah supported her husband at a hard time.", "True", "Never! Allah will never disgrace you"],
    ["What did Khadijah say when he came home afraid?", "Allah will never disgrace you", "Never! Allah will never disgrace you"],
    ["Which good deed did Khadijah name to comfort him?", "He helps the poor", "You help the poor and honor the guest"],
    ["What did Khadijah say to calm him?", "Allah will never disgrace you", "Never! Allah will never disgrace you"],
    ["Which good deed did Khadijah name?", "Helping the poor", "You help the poor and honor the guest"],
    ["She said he served his guests generously.", "True", "You help the poor and honor the guest"],
    ["Who was Waraqah to Khadijah?", "Her cousin", "She took him to her cousin Waraqah"],
    ["To which Messenger did Waraqah say the angel came before?", "Musa", "This is the angel Allah sent to Musa"],
    ["Waraqah said his people would welcome him warmly.", "False", "None brought the like but met hostility"],
    ["Who told the Prophet ﷺ every messenger faced hostility, per Bukhari 3?", "Waraqah ibn Nawfal", "This is the angel Allah sent to Musa", "None brought the like but met hostility"]
  ],
  // Prayer in congregation is better than the prayer of one alone by twenty-seven degrees (Sahih Muslim 650a, Sahih
  // al-Bukhari 645). (Who passed it on, from whom and to whom, is not in the scene.)
  "sign-prayer-together": [
    ["Prayer in congregation is how many degrees better than alone?", "Twenty-seven", "By twenty-seven degrees"],
    ["How much better is prayer in congregation?", "27 degrees", "By twenty-seven degrees"],
    ["Praying together has more reward than praying alone.", "True", "By twenty-seven degrees"],
    ["Prayer in congregation is 27 degrees better.", "True", "By twenty-seven degrees"],
    ["How much better is prayer in congregation?", "Twenty seven times", "By twenty-seven degrees"],
    ["What is it compared with?", "Praying alone", "Than the prayer of one alone"],
    ["Joining the believers in prayer brings great reward.", "True", "By twenty-seven degrees"]
  ],
  // Whoever recites the last two ayat of Surat al-Baqarah at night, they will be enough for him (Sahih al-Bukhari
  // 5009). (What the ayat 2:284-286 say is not in the scene.)
  "sign-two-ayat-at-night": [
    ["Which ayahs are enough for you when read at night?", "The last two of Al-Baqarah", "Whoever recites the last two ayat", "Of Surat al-Baqarah at night"],
    ["What do those two ayahs do for the one who reads them?", "They are enough for him", "They will be enough for him"],
    ["What did the Prophet ﷺ say of the last two ayahs at night?", "They are enough for you", "They will be enough for him"],
    ["What do the last two ayahs of Al-Baqarah give at night?", "They are enough for you", "They will be enough for him"]
  ],
  // One who recites the Quran, knowing it well, is with the noble, righteous scribes; one who keeps at it, though it is
  // hard, has two rewards (Sahih al-Bukhari 4937, Sahih Muslim 798a). (Who the scribes are, by 56:79, is not in the
  // scene.)
  "sign-skilled-reciter": [
    ["Who will be with the noble scribes?", "One who masters the Quran", "One recites the Quran, knowing it well", "He is with the noble, righteous scribes"],
    ["What does one who struggles to recite get?", "A double reward", "He has two rewards"],
    ["Reciting slowly with difficulty earns nothing.", "False", "He has two rewards"],
    ["What does one who finds it hard get?", "Two rewards", "He has two rewards"],
    ["Who is the skilled reciter with?", "The noble angel scribes", "He is with the noble, righteous scribes"],
    ["Struggling with recitation is a reason to stop.", "False", "One keeps at it, though it is hard", "He has two rewards"]
  ],
  // He was asked about fasting on the day of Arafah: it expiates the year gone by and the year to come (Sahih Muslim
  // 1162b). (Its date, the ten best days and the fast of Ashura are not in the scene.)
  "sign-fast-of-arafah": [
    ["Fasting Arafah covers sins of how many years?", "Two", "It expiates the year gone by", "And the year to come"],
    ["Fasting the Day of Arafah expiates how much?", "Two years", "It expiates the year gone by", "And the year to come"],
    ["What does fasting Arafah expiate, per the hadith?", "Sins of two years", "It expiates the year gone by", "And the year to come"]
  ],
  // A servant says a word that pleases Allah, paying it no mind, and Allah raises him ranks; a servant says a word that
  // angers Allah, paying it no mind, and he falls in Jahannam (Sahih al-Bukhari 6478). (What Ibn Kathir and Alqamah
  // say about it is not in the scene.)
  "sign-one-word": [
    ["What can one word that pleases Allah do, per Bukhari 6478?", "Raise a person by degrees", "He pays it no mind; Allah raises him ranks"],
    ["A careless word can displease Allah, per Bukhari 6478.", "True", "A servant says a word that angers Allah"],
    ["What can one pleasing word do, per Bukhari 6478?", "Raise a person in reward", "He pays it no mind; Allah raises him ranks"]
  ],
  // Usayd recited al-Baqarah at night; his horse, tied beside him, was startled, and was quiet when he stopped. His
  // son Yahya was near it, and he feared for him. He looked up: like a cloud with lamps in it. Those were angels come
  // near for his voice; had he read on, people would have seen them (Sahih al-Bukhari 5018).
  "sign-lamps-in-the-sky": [
    ["Which surah was Usayd reciting at night?", "Al-Baqarah", "He recited al-Baqarah at night"],
    ["What did the horse do when he recited?", "It was startled", "His horse, tied beside him, was startled"],
    ["Usayd stopped because his son was near the horse.", "True", "He stopped, and the horse was quiet", "His son Yahya was near it; he feared for him"],
    ["What did Usayd see in the sky?", "A cloud like lamps", "He looked up: like a cloud, with lamps in it"],
    ["What was the cloud, he ﷺ said?", "Angels come to hear him", "Those were angels, come near for your voice"],
    ["If he had kept reciting, people would have seen them at dawn.", "True", "Had you read on, people would have seen them"]
  ],
  // A man came with two camels as night fell, found Mu'adh praying and joined him; Mu'adh recited al-Baqarah or
  // an-Nisa, and the man left and complained. O Mu'adh, are you putting people to trial? Why not al-A'la, ash-Shams
  // or al-Layl? Behind you pray the old, the weak and the needy (Sahih al-Bukhari 705).
  "sign-prayer-too-long": [
    ["Which surah did Mu'adh recite in Isha?", "Al-Baqarah", "Mu'adh recited al-Baqarah or an-Nisa"],
    ["Mu'adh had recited a short surah that night.", "False", "Mu'adh recited al-Baqarah or an-Nisa"],
    ["Which surahs did the Prophet ﷺ suggest instead?", "Al-A'la, Ash-Shams, Al-Layl", "Why not al-A'la, ash-Shams or al-Layl?"],
    ["Which surah did he name besides Al-A'la and Al-Layl?", "Ash-Shams", "Why not al-A'la, ash-Shams or al-Layl?"],
    ["Why should an imam keep the prayer light?", "The old, weak and needy pray behind", "Behind you pray the old, the weak and the needy"],
    ["Why should an imam keep prayer short?", "The old, weak and needy pray behind him", "Behind you pray the old, the weak and the needy"]
  ],
  // Each of you is a shepherd, responsible for his flock: the leader of his people, a man of his family, a woman of
  // her husband's home, a servant of his master's wealth (Sahih al-Bukhari 893).
  "sign-every-one-a-shepherd": [
    ["What did the Prophet ﷺ call all of us?", "Guardians", "Each of you is a shepherd"],
    ["Only leaders have someone in their care.", "False", "Each of you is a shepherd", "A man is a shepherd of his family"],
    ["In the hadith, a man is the guardian of what?", "His family", "A man is a shepherd of his family"],
    ["A woman is the guardian of what?", "Her husband's home", "A woman, of her husband's home"],
    ["What are we responsible for?", "Those under our care", "Each of you is responsible for his flock"],
    ["Only rulers are responsible for anyone.", "False", "Each of you is responsible for his flock"]
  ],
  // He was in a garden of Madinah; one came and asked to open the gate: open for him, and give him good news of
  // Paradise. It was Abu Bakr, then Umar, and each praised Allah; then Uthman, with a calamity to strike him, and he
  // said: Allah's help is sought (Sahih al-Bukhari 3693). (Who kept the gate is the one telling it, never named.)
  "sign-the-garden-gate": [
    ["Who came to the gate before Uthman?", "Abu Bakr and Umar", "It was Abu Bakr, and he praised Allah", "Then it was Umar, and he praised Allah"],
    ["Who came to the gate second?", "Umar", "Then it was Umar, and he praised Allah"],
    ["What did Umar do when he heard the good news?", "He praised Allah", "Then it was Umar, and he praised Allah"],
    ["What came with Uthman's good news of Jannah?", "A trial that would strike him", "Then Uthman: with a calamity to strike him"],
    ["What did Uthman say when he heard?", "Allah's help is sought", "He praised Allah: Allah's help is sought"]
  ],
  // In Yemen, Abu Musa's people got news of his migration and boarded a ship; it took them to the Negus in Abyssinia,
  // where Ja'far and his companions were. They stayed until all left together, and he gave them a share of Khaybar
  // (Sahih al-Bukhari 3136). (Who told Ja'far to stay is only said, not shown, so it is not asked here.)
  "sign-ship-to-abyssinia": [
    ["How did Abu Musa's people reach Abyssinia?", "By ship", "We set out to him, and boarded a ship", "Our ship took us to the Negus in Abyssinia"],
    ["Where did Ja'far live for years?", "Abyssinia", "Our ship took us to the Negus in Abyssinia", "There we found Ja'far and his companions"],
    ["Who came back with Ja'far?", "The people of the ship", "We stayed until we all left together"],
    ["When did Ja'far return to the Prophet ﷺ?", "When Khaybar was conquered", "Khaybar was won, and he gave us a share"],
    ["Ja'far's group got a share of Khaybar though they did not fight.", "True", "Khaybar was won, and he gave us a share"]
  ],
  // He came to Madinah with no one to serve him; Abu Talhah took Anas to him: Anas is a wise boy, let him serve you.
  // He served him at home and on journeys for ten years, and he never said to him uff, nor why did you, nor why not
  // (Sahih al-Bukhari 2768 and 6038). (How Abu Talhah was related to Anas is not in the scene.)
  "sign-ten-years-serving": [
    ["Who brought Anas to serve the Prophet ﷺ?", "Abu Talhah", "Abu Talhah took me to him"],
    ["How did Abu Talhah describe Anas?", "A wise boy", "Anas is a wise boy; let him serve you"],
    ["Anas served the Prophet ﷺ only at home.", "False", "I served him at home and on journeys"],
    ["How long did Anas serve the Prophet ﷺ?", "Ten years", "I served him for ten years"],
    ["What did the Prophet ﷺ never say to him?", "Uff", "He never said to me: uff"],
    ["What can we learn for those who help us?", "Be gentle and patient with them", "He never said to me: uff", "Nor: why did you do so, or why not?"],
    ["The Prophet ﷺ was kind to those who served him.", "True", "He never said to me: uff", "Nor: why did you do so, or why not?"]
  ],
  // None may cut off a brother over three nights, each turning away when they meet; the better of the two greets
  // first (Sahih al-Bukhari 6077).
  "sign-greet-first": [
    ["How long at most can you stay cut off from a Muslim?", "Three nights", "None may cut off a brother over three nights"],
    ["How long at most may Muslims stop talking?", "Three nights", "None may cut off a brother over three nights"],
    ["Who is the better of the two?", "The one who greets first", "The better of the two greets first"],
    ["Two friends quarrel. Who is the better one?", "The one who greets first", "The better of the two greets first"],
    ["Saying salam first is a good deed.", "True", "The better of the two greets first"],
    ["Saying salam first after a fight is a sign of weakness.", "False", "The better of the two greets first"]
  ],
  // At Arafah he addressed the people: your blood and wealth are sacred, like this day, in this month, in this town.
  // Fear Allah concerning women; their right is food and clothing, in fairness. You will be asked of me; they said:
  // we testify you conveyed, fulfilled and advised; and he said: O Allah, be witness (Sahih Muslim 1218).
  "sign-farewell-sermon": [
    ["In his Farewell Sermon, what did the Prophet ﷺ warn men about?", "Fear Allah about women", "Fear Allah concerning women"],
    ["What did the Companions testify, in Muslim 1218?", "That he conveyed the message", "We testify you conveyed, fulfilled, advised"]
  ],
  // He said to Ibn Mas'ud: recite to me. Recite to you, when it was revealed to you? I love to hear it from another.
  // He recited an-Nisa until he reached its forty-first ayah; he said: stop, and his eyes were overflowing with tears
  // (Sahih al-Bukhari 4582, 5050). (Who recited is the one telling it, never named in the scene, so it is not asked
  // here; nor when Ibn Mas'ud became Muslim.)
  "sign-recite-to-me": [
    ["Why did the Prophet ﷺ ask Ibn Mas'ud to recite?", "He liked to hear the Quran from others", "I love to hear it from another"],
    ["Why did the Prophet ﷺ want to hear it from him?", "He liked to hear it from others", "I love to hear it from another"],
    ["Why did the Prophet ﷺ like to hear the Quran from others?", "He said he loved to hear it", "I love to hear it from another"],
    ["Which surah did Ibn Mas'ud recite?", "An-Nisa", "So I recited an-Nisa to him"],
    ["Which surah did Ibn Mas'ud recite to the Prophet ﷺ?", "An-Nisa", "So I recited an-Nisa to him"],
    ["At which ayah did he say 'Enough'?", "4:41", "Until I reached its ayah forty-one", "He said: stop"],
    ["The Prophet ﷺ wept when Ibn Mas'ud reached 4:41.", "True", "Until I reached its ayah forty-one", "And his eyes were overflowing with tears"],
    ["What happened to the Prophet ﷺ at ayah 41?", "His eyes filled with tears", "And his eyes were overflowing with tears"],
    ["The Prophet ﷺ asked Ibn Mas'ud to ____ the Quran to him.", "recite", "He said to me: recite to me"],
    ["What did the Prophet ﷺ ask Ibn Masud, in the hadith?", "Recite the Quran to me", "He said to me: recite to me"],
    ["Which surah did Ibn Masud recite, in the hadith?", "An-Nisa", "So I recited an-Nisa to him"],
    ["What did Ibn Masud see, in the hadith?", "Eyes overflowing with tears", "And his eyes were overflowing with tears"]
  ],
  // Richness is not having many possessions; richness is the richness of the soul (Sahih al-Bukhari 6446).
  "sign-richness-of-the-soul": [
    ["What is wealth NOT, per the hadith?", "Having many possessions", "Richness is not having many possessions"],
    ["What is wealth not about?", "Having many possessions", "Richness is not having many possessions"],
    ["What is true wealth, per the hadith?", "Feeling enough in the soul", "Richness is the richness of the soul"],
    ["What is real wealth, per the hadith?", "Contentment in the soul", "Richness is the richness of the soul"],
    ["A person with little can still be rich at heart.", "True", "Richness is the richness of the soul"],
    ["A poor person can be rich in his heart.", "True", "Richness is the richness of the soul"]
  ],
  // Jibril kept on advising him about the neighbor, until he thought he would make him an heir (Sahih al-Bukhari
  // 6014). (Who narrated it is not in the scene.)
  "sign-the-neighbor": [
    ["Who kept advising the Prophet ﷺ about neighbors?", "Jibril", "Jibril kept on advising me"],
    ["What did Jibril keep telling the Prophet ﷺ about?", "Neighbors", "Advising me about the neighbor"],
    ["In Islam, you should be kind to your neighbors.", "True", "Advising me about the neighbor"],
    ["The Prophet ﷺ thought neighbors might even do what?", "Inherit", "Until I thought he would make him an heir"],
    ["What did the Prophet ﷺ think Jibril would do?", "Make neighbors heirs", "Until I thought he would make him an heir"]
  ],
  // The nearest a servant is to his Lord is when he is in sujud, so make much du'a then (Sahih Muslim 482).
  "sign-closest-in-sujud": [
    ["When is a servant closest to his Lord?", "In sujud", "Is when he is in sujud"],
    ["When is a servant nearest to Allah?", "In sujud", "Is when he is in sujud"],
    ["What should we do much of in sujud?", "Du'a", "So make much du'a then"],
    ["What should we do much of in sujud?", "Make dua", "So make much du'a then"],
    ["Sujud is a time to ask Allah for what you need.", "True", "So make much du'a then"]
  ],
  // Allah is Good and accepts only what is good; one who travels long, unkempt and dusty, lifts his hands: O Lord,
  // O Lord; but his food, drink and clothes are unlawful, and he was fed on the unlawful: so how can he be answered?
  // (Sahih Muslim 1015). (What 2:168 says stays on its usual picture.)
  "sign-accepts-only-good": [
    ["What does Allah accept, in the hadith?", "Only what is good", "Allah is Good, accepting only what is good"],
    ["Why was the traveller's dua not answered?", "His food and clothes were unlawful", "His food is unlawful, his drink unlawful", "His clothes unlawful, fed on the unlawful"],
    ["What can stop a dua being answered, in Muslim 1015?", "Haram food and clothing", "His food is unlawful, his drink unlawful", "His clothes unlawful, fed on the unlawful"]
  ],
  // He divided a share, and one said it was not for Allah's sake; told of it, he was angry, then said: may Allah have
  // mercy on Musa; he was harmed with more than this, and he was patient (Sahih al-Bukhari 3405). (What 33:69 says
  // stays on its usual picture.)
  "sign-mercy-on-musa": [
    ["Whom did the Prophet ﷺ remember when hurt?", "Musa", "May Allah have mercy on Musa"],
    ["What did the Prophet ﷺ remember when he was hurt by words?", "Musa's patience", "May Allah have mercy on Musa", "And he was patient"],
    ["Musa was harmed even more than this.", "True", "He was harmed with more than this"],
    ["Musa was hurt by his own people and kept patient.", "True", "He was harmed with more than this", "And he was patient"],
    ["What did Musa do when harmed, in the hadith?", "Endured patiently", "And he was patient"],
    ["What did Musa do when harmed, per the hadith?", "He endured patiently", "And he was patient"]
  ],
  // When he mounted his camel for a journey he said Allahu Akbar three times, then: glory to Him who made this serve us,
  // we could not have done it ourselves, and to our Lord we will return; and when he returned he said them and added:
  // we return, repent, worship, praise our Lord (Sahih Muslim 1342). (What 43:13 says and what Ibn Abbas explains stay
  // on their usual picture.)
  "sign-setting-out": [
    ["What did he ﷺ say three times before the travel dua?", "Allahu Akbar", "He said Allahu Akbar three times"],
    ["How many times did he say Allahu Akbar first, per Muslim 1342?", "Three", "He said Allahu Akbar three times"],
    ["The travel dua thanks Allah for making what serve us?", "Our ride", "Glory to Him who made this serve us"]
  ],
  // None of you will have faith till he wishes for his brother what he likes for himself (Sahih al-Bukhari 13). (A
  // friend who wins a prize is not in the scene.)
  "sign-for-his-brother": [
    ["What should you wish for your brother?", "What you like for yourself", "What he likes for himself"],
    ["True faith means wanting good things only for yourself.", "False", "Till he wishes for his brother", "What he likes for himself"],
    ["When is a person's faith complete, in this hadith?", "When he wants for others what he wants", "Till he wishes for his brother", "What he likes for himself"],
    ["Wanting good only for yourself is complete faith.", "False", "Till he wishes for his brother", "What he likes for himself"]
  ],
  // Whoever does wudu, and does it well, then says: I bear witness that there is no god but Allah and that Muhammad is
  // His slave and Messenger, the eight gates of Paradise open for him; he enters by whichever he wishes (Sahih Muslim
  // 234). (The two rak'ahs prayed with the heart are not in the scene.)
  "sign-eight-gates": [
    ["What comes first, in the hadith?", "Doing wudu well", "Whoever does wudu, and does it well"],
    ["What should you say after finishing wudu?", "The shahadah", "Then says: I testify, no god but Allah", "And Muhammad is His slave and Messenger"],
    ["How many gates of Paradise open for him?", "Eight", "The eight gates of Paradise open for him"],
    ["What opens for him, in the hadith?", "The eight gates of Paradise", "The eight gates of Paradise open for him"],
    ["Which gate may he enter, in the hadith?", "Whichever he wishes", "He enters by whichever he wishes"]
  ],
  // Whoever prays twelve rak'ahs in a day and night, a house is built for him in Paradise; Umm Habibah said: I never
  // left them since (Sahih Muslim 728). (The five prayers and her father are not in the scene.)
  "sign-house-for-twelve": [
    ["How many voluntary rak'ahs a day earn a house in Paradise?", "Twelve", "Whoever prays twelve rak'ahs, day and night"],
    ["Twelve extra rak'ahs a day bring what?", "A house in Jannah", "A house is built for him in Paradise"],
    ["What did Umm Habibah do after hearing it?", "Never left them", "Umm Habibah said: I never left them since"],
    ["What did Umm Habibah do after hearing it?", "Never stopped praying them", "Umm Habibah said: I never left them since"]
  ],
  // Whoever bathes on Friday and cleans himself, puts on oil or the scent of his home, goes out, not parting two people,
  // prays what was written for him and is quiet when the imam speaks, is forgiven what is between it and the other
  // Friday (Sahih al-Bukhari 883). (What Ibn Kathir says stays on its usual picture.)
  "sign-ready-for-friday": [
    ["What should you do before Jumu'ah?", "Bathe and wear scent", "Whoever bathes on Friday, cleans himself", "Puts on oil, or the scent of his home"],
    ["What must you not do in the masjid?", "Push between two people", "Then goes out, not parting two people"],
    ["What should one not do to people sitting?", "Push between two of them", "Then goes out, not parting two people"],
    ["What should one do during the khutbah?", "Stay silent", "Then is quiet when the imam speaks"],
    ["What is forgiven for doing it all?", "Sins until next Friday", "Forgiven what is between the two Fridays"]
  ],
  // Riding behind him on the donkey 'Ufayr, Mu'adh was asked: do you know Allah's right on His servants? To worship Him
  // and join nothing with Him; and theirs on Him: He does not punish who joins none. Shall I give the people the good
  // news? Do not, lest they rely on it (Sahih al-Bukhari 2856). (Who rode with him is never named in the scene, the
  // donkey has its own picture, and what 4:36 says stays on its usual picture.)
  "sign-right-on-servants": [
    ["Where was Mu'adh when he was asked?", "Riding behind the Prophet ﷺ", "I rode behind him on a donkey called Ufayr"],
    ["What is Allah's right on His servants?", "Worship Him, join no partner", "To worship Him and join nothing with Him"],
    ["What is Allah's right on His servants?", "To worship Him alone", "To worship Him and join nothing with Him"],
    ["What is Allah's right on His servants, in Bukhari 2856?", "To worship Him alone", "To worship Him and join nothing with Him"],
    ["What is Allah's right on His servants, per Bukhari 2856?", "To worship Him alone", "To worship Him and join nothing with Him"],
    ["Worshipping idols beside Allah is allowed.", "False", "To worship Him and join nothing with Him"],
    ["What is the servants' right on Allah, as promised?", "Not to punish those without shirk", "Their right: He does not punish who joins none"],
    ["What is the servant's right on Allah, per Bukhari 2856?", "Not to be punished if no shirk", "Their right: He does not punish who joins none"]
  ],
  // Young men close in age stayed with him twenty days and nights; he was merciful and gentle, and sent them back to
  // teach their families: pray as you have seen me pray; one of you calls the adhan, and the eldest leads (Sahih
  // al-Bukhari 631).
  "sign-pray-as-you-saw": [
    ["How long did the young men stay to learn?", "Twenty days", "We stayed with him twenty days and nights"],
    ["Whose prayer is the model for every Muslim?", "The Prophet's ﷺ", "Pray as you have seen me pray"],
    ["How should a Muslim pray?", "As the Prophet ﷺ prayed", "Pray as you have seen me pray"],
    ["The Prophet ﷺ said: pray as you have seen me praying.", "True", "Pray as you have seen me pray"],
    ["Who did he say should lead their prayer?", "The eldest", "One of you calls the adhan, the eldest leads"]
  ],
  // O Aishah, Allah is Gentle and loves gentleness, and He gives for gentleness what He does not give for harshness,
  // nor for anything else besides it (Sahih Muslim 2593). (Whom he said it to is also asked of another hadith, at home
  // over dates, so it stays on its usual picture, and so does what 3:159 says.)
  "sign-gentleness": [
    ["What does Allah love, says this hadith?", "Gentleness", "And He loves gentleness"],
    ["What does gentleness get that harshness doesn't?", "What Allah gives for it", "He gives for gentleness", "What He does not give for harshness"],
    ["Being gentle is a weakness.", "False", "And He loves gentleness", "He gives for gentleness"],
    ["What does Allah love?", "Kindness", "And He loves gentleness"],
    ["Allah gives more for kindness than for harshness.", "True", "He gives for gentleness", "What He does not give for harshness"]
  ],
  // Allah does not look at your bodies nor at your faces, but He looks at your hearts, and he pointed with his fingers
  // to his chest (Sahih Muslim 2564b). (Not looking down on a brother is not in the scene.)
  "sign-looks-at-hearts": [
    ["What does Allah look at, per the hadith?", "Our hearts", "But He looks at your hearts"],
    ["Where did the Prophet ﷺ point when speaking of piety?", "To his chest", "And he pointed to his chest"],
    ["Allah judges us by how we look.", "False", "Allah does not look at your bodies", "But He looks at your hearts"],
    ["What does Allah look at, per Muslim 2564?", "Our hearts", "But He looks at your hearts"],
    ["Where did he ﷺ point when speaking of piety?", "His chest", "And he pointed to his chest"],
    ["What does Allah look to?", "Our hearts", "But He looks at your hearts"],
    ["Where did the Prophet ﷺ point?", "Toward the heart", "And he pointed to his chest"],
    ["Allah judges us by our looks.", "False", "Allah does not look at your bodies", "But He looks at your hearts"]
  ],
  // The best way to ask forgiveness is to say: O Allah, You are my Lord, no god but You; You created me, and I am Your
  // slave; I admit Your favor on me and admit my sin, so forgive me, for none forgives sins but You. Whoever says it by
  // day, sure of it, and dies that day before evening is of the people of Paradise (Sahih al-Bukhari 6306). (Saying it
  // at night is not in the scene.)
  "sign-best-forgiveness": [
    ["What did the Prophet ﷺ call this dua?", "The master of asking forgiveness", "The best way to ask forgiveness is to say"],
    ["Someone says it in the day with firm faith and dies before evening. Where are they?", "Among the people of Paradise", "Before evening, is of the people of Paradise"],
    ["In this dua you admit your sins to Allah.", "True", "I admit Your favor on me, and admit my sin"],
    ["How does Sayyid al-Istighfar begin?", "Allahumma anta Rabbi", "O Allah, You are my Lord, no god but You"],
    ["What is promised to one who says it with faith and dies that day?", "He is of the people of Paradise", "Before evening, is of the people of Paradise"],
    ["How must it be said to earn the reward?", "With firm faith", "Who says it by day, sure, and dies that day"]
  ],
  // Whoever sends blessings on me once, Allah sends blessings on him ten times (Sahih Muslim 408). (Which words send
  // them, what the sign after his name stands for, what 33:56 says, and what Abu al-Aliyah and Ibn Kathir explain stay
  // on their usual picture.)
  "sign-ten-blessings": [
    ["Send one salawat on the Prophet ﷺ. How many blessings does Allah send you?", "Ten", "Allah sends blessings on him ten times"],
    ["How many blessings for one Salah, in the hadith?", "Ten", "Allah sends blessings on him ten times"],
    ["How many blessings does Allah send for one?", "Ten", "Allah sends blessings on him ten times"],
    ["Sending blessings on the Prophet ﷺ brings blessings back to you.", "True", "Allah sends blessings on him ten times"]
  ],
  // On Friday, in the Fajr prayer, he recited Alif Lam Mim Tanzil, as-Sajdah, and Hal ata 'ala al-insan (Sahih
  // al-Bukhari 891). (The letters 32:1 opens with and the words al-Insan begins with stay on their usual picture.)
  "sign-friday-fajr": [
    ["In which prayer did he recite it, in the hadith?", "Fajr on Friday", "On Friday, in the Fajr prayer"],
    ["Which surah came with it, in the hadith?", "Al-Insan", "And Hal ata 'ala al-insan"],
    ["In which prayer did he recite Al-Insan?", "Fajr on Friday", "On Friday, in the Fajr prayer"],
    ["Which surah did he recite with it?", "As-Sajdah", "He recited Alif Lam Mim Tanzil, as-Sajdah"]
  ],
  // Abdullah ibn Amr said of Ibn Mas'ud: a man I still love, since I heard him say: learn to recite the Quran from
  // four, from Abdullah ibn Mas'ud, and he began with him, from Salim, freed slave of Abu Hudhayfah, from Ubayy ibn
  // Ka'b and from Mu'adh ibn Jabal (Sahih al-Bukhari 3758).
  "sign-learn-from-four": [
    ["Who was named first of the four to learn the Quran from?", "Abdullah ibn Mas'ud", "Abdullah ibn Mas'ud, and he began with him"],
    ["Which of these was also one of the four?", "Mu'adh ibn Jabal", "And Ubayy ibn Ka'b, and Mu'adh ibn Jabal"],
    ["How many teachers of the Quran did the Prophet ﷺ name?", "Four", "Learn to recite the Quran from four"],
    ["How many people did the Prophet ﷺ name to learn the Quran from?", "Four", "Learn to recite the Quran from four"],
    ["Who was NOT one of the four?", "Abu Hurairah", "Abdullah ibn Mas'ud, and he began with him", "And Ubayy ibn Ka'b, and Mu'adh ibn Jabal"],
    ["The Prophet ﷺ trusted Mu'adh to teach the Quran.", "True", "And Ubayy ibn Ka'b, and Mu'adh ibn Jabal"],
    ["Whose name came first among the four Quran teachers?", "Abdullah ibn Mas'ud", "Abdullah ibn Mas'ud, and he began with him"],
    ["Which of these was NOT one of the four?", "Abu Hurayrah", "Abdullah ibn Mas'ud, and he began with him", "And Ubayy ibn Ka'b, and Mu'adh ibn Jabal"],
    ["The Prophet ﷺ chose Ibn Mas'ud as a teacher of the Quran.", "True", "Abdullah ibn Mas'ud, and he began with him"]
  ],
  // Umar brought Ibn Abbas in with the elders of Badr, and some asked why him, when they had sons like him. He asked
  // them about When Allah's help comes: some said we are told to praise Him and ask forgiveness, and some kept quiet;
  // Ibn Abbas said it was the end of his life, made known to him, and Umar said: I know of it only what you say (Sahih
  // al-Bukhari 4970).
  "sign-young-ibn-abbas": [
    ["Why did Umar seat young Ibn Abbas with the elders?", "For his knowledge", "I said: it is his life's end, made known to him", "Umar said: I know of it only what you say"],
    ["Which surah did Umar ask the elders about?", "An-Nasr", "He asked about: When Allah's help comes"],
    ["What did Ibn Abbas say the surah was telling?", "The Prophet's ﷺ death was near", "I said: it is his life's end, made known to him"],
    ["Why did Umar seat young Ibn Abbas with the elders of Badr?", "Because of his knowledge", "I said: it is his life's end, made known to him", "Umar said: I know of it only what you say"],
    ["Which surah did Umar ask them about?", "An-Nasr", "He asked about: When Allah's help comes"],
    ["Umar agreed with Ibn Abbas's meaning of the surah.", "True", "Umar said: I know of it only what you say"],
    ["Whom did Umar seat Ibn Abbas with?", "The elders of Badr", "Umar brought me in with the elders of Badr"],
    ["What did Ibn Abbas say the surah signaled?", "The end of the Prophet's ﷺ life", "I said: it is his life's end, made known to him"],
    ["Umar disagreed with Ibn Abbas.", "False", "Umar said: I know of it only what you say"]
  ],
  // One came in and prayed, then gave salam, and he said: go back and pray, for you have not prayed; three times, till
  // it said: teach me. Say takbir, recite what is easy for you, bow until you are at rest bowing, rise until you stand
  // up straight, prostrate until you are at rest, then sit at rest (Sahih al-Bukhari 757). (What is said in ruku, and
  // standing up straight, are also asked of other hadiths, so they stay on their usual picture.)
  "sign-go-back-and-pray": [
    ["How many times was the man sent back?", "Three", "Go back and pray, for you have not prayed", "Three times; then he said: teach me"],
    ["Example: you bow and stand up in one second. What's wrong?", "You didn't pause in ruku", "Bow until you are at rest bowing"],
    ["What word sums up how to pray?", "Calmly", "Bow until you are at rest bowing", "Prostrate at rest, then sit at rest"],
    ["Which comes first?", "Rise from ruku", "Rise until you stand up straight", "Prostrate at rest, then sit at rest"],
    ["Between the two sujud, we ____ for a calm moment.", "sit", "Prostrate at rest, then sit at rest"]
  ],
  // He gave the spoils of Hunayn and none to the Ansar, and they felt it; he said: did I not find you astray, and Allah
  // guided you through me, divided, and Allah joined you through me, and poor, and Allah made you rich through me? They
  // said: Allah and His Messenger did us more favor (Sahih al-Bukhari 4330). (Which battle it was has its own map, and
  // what Ibn Kathir explains with it stays on its usual picture.)
  "sign-ansar-at-hunayn": [
    ["What three favors did he ﷺ mention, per Bukhari 4330?", "Guided, united, made rich", "I found you astray; Allah guided you through me", "Poor, and Allah made you rich through me"],
    ["How did the Ansar reply, per Bukhari 4330?", "Allah and His Messenger did us more favor", "Allah and His Messenger did us more favor"],
    ["How were the Ansar before, in the hadith?", "Divided into groups", "Divided, and Allah joined you through me"],
    ["The Prophet ﷺ also said Allah made them rich through him.", "True", "Poor, and Allah made you rich through me"]
  ],
  // When one of you sneezes, let him say: Alhamdulillah, and let his brother say to him: Yarhamuk Allah; and he says:
  // Yahdikumullah wa yuslihu balakum (Sahih al-Bukhari 6224).
  "sign-the-sneeze": [
    ["After sneezing, what should a Muslim say first?", "Alhamdulillah", "Who sneezes, let him say: Alhamdulillah"],
    ["If someone says Alhamdulillah after sneezing, another Muslim can reply with mercy.", "True", "His brother says to him: Yarhamuk Allah"],
    ["What is a proper reply to someone's Alhamdulillah after a sneeze?", "Yarhamuk Allah", "His brother says to him: Yarhamuk Allah"],
    ["What does the one who sneezes say?", "Alhamdulillah", "Who sneezes, let him say: Alhamdulillah"],
    ["What do you say to someone who sneezed and praised Allah?", "Yarhamukallah", "His brother says to him: Yarhamuk Allah"],
    ["What does the sneezer say back?", "Yahdikumullah wa yuslihu balakum", "He says: Yahdikumullah wa yuslihu balakum"],
    ["You sneeze. What do you say?", "Alhamdulillah", "Who sneezes, let him say: Alhamdulillah"],
    ["Your friend sneezes and says Alhamdulillah. What do you say?", "Yarhamukallah", "His brother says to him: Yarhamuk Allah"],
    ["The sneezer answers: Yahdikumullahu wa yuslihu balakum.", "True", "He says: Yahdikumullah wa yuslihu balakum"]
  ],
  // Some came, barefoot and poor, all of Mudar, and his face changed at their need; he prayed, spoke and urged charity,
  // from a dinar, a dirham, cloth, wheat, dates, even half a date, till there were two heaps of food and clothes, and
  // his face shone as if gold (Sahih Muslim 1017). (Which surah he recited from stays on its usual picture.)
  "sign-visitors-of-mudar": [
    ["Which tribe were the poor visitors from?", "Mudar", "Some came, barefoot and poor, all of Mudar"],
    ["His face changed when he saw their poverty.", "True", "His face changed, seeing their need"],
    ["What did people start doing after he recited?", "Giving charity", "From his dinar, dirham, cloth, wheat, dates"],
    ["What was the smallest gift he mentioned?", "Half a date", "Even if it is half a date"],
    ["Small charity is still valued.", "True", "Even if it is half a date"]
  ],
  // At Fajr he said: Bilal, tell me of the deed you most hope for in Islam, for I heard your steps ahead of me in
  // Paradise; he said: whenever I made wudu, night or day, I prayed with it what was written for me (Sahih al-Bukhari
  // 1149). (The blank about his steps is also asked of another hadith, and how early he became Muslim is not shown.)
  "sign-steps-in-paradise": [
    ["What did the Prophet ﷺ hear in Paradise?", "Bilal's footsteps", "For I heard your steps ahead of me in Paradise"],
    ["Which deed did Bilal say he did?", "Praying after every wudu", "He said: whenever I made wudu, night or day", "I prayed with it what was written for me"],
    ["A small habit, done always, can be very great.", "True", "He said: whenever I made wudu, night or day", "I prayed with it what was written for me"],
    ["When did the Prophet ﷺ ask Bilal about this?", "At the Fajr prayer", "At Fajr he said: Bilal, tell me"]
  ],
  // First came Mus'ab and Ibn Umm Maktum, who taught the people the Quran, then Bilal, Sa'd and Ammar, then Umar with
  // twenty, then he came, and Madinah never rejoiced so at anything; even the girls said: he has come (Sahih al-Bukhari
  // 3925).
  "sign-madinah-rejoiced": [
    ["Who came to Madinah first, with Ibn Umm Maktum?", "Mus'ab ibn Umayr", "First came Mus'ab and Ibn Umm Maktum"],
    ["What did the first two teach the people of Madinah?", "The Quran", "They taught the people the Quran"],
    ["Who came after them?", "Bilal, Sa'd and Ammar", "Then Bilal, Sa'd and Ammar came"],
    ["How did Madinah feel when the Prophet ﷺ arrived?", "Happier than ever", "Then he came", "Madinah never rejoiced so at anything"],
    ["Who called out that the Prophet ﷺ had come?", "Even the girls", "Even the girls said: he has come!"],
    ["The Prophet ﷺ reached Madinah before Mus'ab.", "False", "First came Mus'ab and Ibn Umm Maktum", "Then he came"]
  ],
  // Tomorrow I will give the flag to one through whom Allah gives victory; all night they wondered, and each hoped for
  // it; he asked for Ali, whose eyes were sore, prayed for him, and he was cured; go calmly, invite them to Islam, for
  // one guided through you is better than red camels (Sahih al-Bukhari 3701). (Which battle it was has its own map.)
  "sign-red-camels": [
    ["What did everyone hope the night before?", "To be given the flag", "All night they wondered who it would be"],
    ["What was wrong with Ali that morning?", "His eyes were sore", "Where is Ali? His eyes are sore"],
    ["What did the Prophet ﷺ tell Ali to do first?", "Invite them to Islam", "Go calmly, then invite them to Islam"],
    ["The Prophet ﷺ told Ali to rush in fast.", "False", "Go calmly, then invite them to Islam"],
    ["One person guided through you is better than what?", "Red camels", "One guided through you is better than red camels"]
  ],
  // On one of his journeys, at al-Bayda', her necklace was lost; he stayed to look for it, and the people with him,
  // where there was no water; morning came with no water, and Allah revealed the ayah of tayammum. Usayd said: this is
  // not your first blessing, family of Abu Bakr; then they raised the camel and found the necklace under it (Sahih
  // al-Bukhari 334).
  "sign-lost-necklace": [
    ["Why did the army stop with no water?", "To look for Aishah's necklace", "At al-Bayda', a necklace of mine was lost", "He stayed to look for it, and the people with him"],
    ["What did Allah send down then?", "The ayah of tayammum", "Then Allah revealed the ayah of tayammum"],
    ["Usayd said it was not the first blessing from Abu Bakr's family.", "True", "Not your first blessing, family of Abu Bakr"],
    ["What did Aishah lose on the journey?", "Her necklace", "At al-Bayda', a necklace of mine was lost"],
    ["What did Allah allow when there was no water for wudu?", "Tayammum with clean earth", "Then Allah revealed the ayah of tayammum"],
    ["Usayd ibn Hudayr called it the first blessing from Abu Bakr's family.", "False", "Not your first blessing, family of Abu Bakr"]
  ],
  // In Madinah, Abu Bakr and Bilal fell ill with fever; she went in to them and asked how they were, and Bilal longed
  // aloud for a night in a valley of idhkhir. She told him, and he said: O Allah, make us love Madinah as we love Makkah,
  // or more, make it healthy, bless its sa' and its mudd, and move its fever to al-Juhfah (Sahih al-Bukhari 3926).
  "sign-love-madinah": [
    ["Who fell ill with fever after the hijrah?", "Abu Bakr and Bilal", "In Madinah, Abu Bakr and Bilal fell ill"],
    ["What did Bilal miss while he was ill?", "Makkah", "Bilal: will I spend a night in a valley of idhkhir?"],
    ["Who visited them and told the Prophet ﷺ?", "Aishah", "I went in to them: how do you find yourself?", "Aishah: I came to him and told him"],
    ["What did the Prophet ﷺ ask Allah for Madinah?", "To make them love it like Makkah, or more", "Make us love Madinah as Makkah, or more"],
    ["What did he ask Allah to take from Madinah?", "Its fever", "And move its fever to al-Juhfah"],
    ["He also asked Allah to bless Madinah's food.", "True", "Make it healthy, and bless its sa' and its mudd"]
  ],
  // He missed Thabit ibn Qays, and one went and found him at home, his head lowered: it is bad, he said, for he raised
  // his voice above the Prophet's, so his deeds are lost and he is of the Fire. It came back and told him, and he said:
  // go to him and say: you are not of the Fire, but of the people of Paradise (Sahih al-Bukhari 3613, 4846).
  "sign-thabit-good-news": [
    ["Who noticed that Thabit was missing?", "The Prophet ﷺ", "He missed Thabit ibn Qays"],
    ["How did the man find Thabit?", "Sitting sadly with his head down", "He missed Thabit ibn Qays", "A man found him at home, his head lowered"],
    ["The Prophet ﷺ cared about a companion who went missing.", "True", "He missed Thabit ibn Qays", "A man found him at home, his head lowered"],
    ["What good news did Thabit get?", "He is of the people of Jannah", "Go to him and say: you are not of the Fire", "But you are of the people of Paradise"],
    ["Who sent Thabit the good news?", "The Prophet ﷺ", "Go to him and say: you are not of the Fire"],
    ["Thabit was told he was of the people of the Fire.", "False", "Go to him and say: you are not of the Fire", "But you are of the people of Paradise"],
    ["Why was Thabit sad, per Bukhari 4846?", "He used to raise his voice", "Bad: he raised his voice above the Prophet's"],
    ["What news was Thabit given, per Bukhari 4846?", "He is of the people of Paradise", "Go to him and say: you are not of the Fire", "But you are of the people of Paradise"],
    ["The Prophet ﷺ noticed when Thabit was missing.", "True", "He missed Thabit ibn Qays"]
  ],
  // He held Umar's hand, and Umar said: you are dearer to me than all but myself; he said: no, until I am dearer to you
  // than your own self; Umar said: now, by Allah, you are dearer to me than myself, and he said: now, O Umar (Sahih
  // al-Bukhari 6632). None of you believes until I am dearer to him than his father, his child and all the people
  // (Sahih al-Bukhari 15). (Who narrated it, and how this love shows, stay on their usual picture.)
  "sign-dearer-than-yourself": [
    ["What did Umar first say to the Prophet ﷺ?", "Dearer than all but myself", "Umar: you are dearer to me than all but myself"],
    ["What did the Prophet ﷺ answer?", "Not until I am dearer than yourself", "No, until I am dearer to you than your own self"],
    ["What did the Prophet ﷺ say when Umar said 'now, more than myself'?", "Now, O Umar", "He said: now, O Umar"],
    ["The Prophet ﷺ was holding Umar's hand.", "True", "We were with him, and he held Umar's hand"],
    ["When is faith complete, per Abdullah ibn Hisham?", "When he ﷺ is dearer than oneself", "No, until I am dearer to you than your own self", "He said: now, O Umar"],
    ["Umar first said: dearer than everything except myself.", "True", "Umar: you are dearer to me than all but myself"],
    ["After Umar changed his answer, the Prophet ﷺ said nothing.", "False", "He said: now, O Umar"],
    ["Whom must a believer love most among people?", "The Prophet ﷺ", "None of you believes until I am dearer to him", "Than his father, his child, and all the people"],
    ["This love is more than for one's own children.", "True", "Than his father, his child, and all the people"],
    ["Whom should a believer love more than all people?", "The Prophet ﷺ", "None of you believes until I am dearer to him", "Than his father, his child, and all the people"]
  ],
  // He came out while they were in the Suffah: who would go each day to Buthan or al-Aqiq and bring back two big
  // she-camels, with no sin and no cutting of ties? They said: we would love that. He said: why not go to the masjid
  // and learn or recite two ayat? That is better than two she-camels, three better than three, four better than four
  // (Sahih Muslim 803).
  "sign-better-than-camels": [
    ["What is better than two big she-camels?", "Learning two verses", "Why not go and learn two ayat in the masjid?", "That is better for him than two she-camels"],
    ["Where was Uqbah when he heard this?", "In the Suffah", "He came out while we were in the Suffah"],
    ["Three verses are better than three she-camels.", "True", "Three better than three, four better than four"],
    ["What is better than two she-camels?", "Learning two verses", "Why not go and learn two ayat in the masjid?", "That is better for him than two she-camels"],
    ["Where did they go to learn?", "The masjid", "Why not go and learn two ayat in the masjid?"],
    ["Each verse learned is worth more than wealth.", "True", "That is better for him than two she-camels", "Three better than three, four better than four"]
  ],
  // Read the Quran, for it will come on the Day of Resurrection interceding for its companions; read the two bright
  // ones, al-Baqarah and Al Imran, for they will come like two clouds, or two shades, or two flocks of birds in rows,
  // pleading for their companions; taking it is a blessing, and leaving it a regret (Sahih Muslim 804a).
  "sign-two-bright-ones": [
    ["The Prophet ﷺ told us to recite the Quran.", "True", "I heard him say: read the Quran"],
    ["What will the Quran do for its readers?", "Intercede for them", "It will intercede for its companions on the Day"],
    ["On the Last Day, who does the Quran speak up for?", "Those who read it", "It will intercede for its companions on the Day"],
    ["Which are the two bright surahs?", "Al-Baqarah and Al Imran", "Read the bright two: al-Baqarah and Al Imran"],
    ["How will the two surahs come?", "Like two clouds", "They will come like two clouds, or two shades"]
  ],
  // One heard another recite Qul huwa Allahu ahad again and again, and in the morning told him of it, as if it were
  // little; he said: by the One in whose hand is my soul, it equals a third of the Quran (Sahih al-Bukhari 5013). Can
  // one of you not recite a third of the Quran in a night? It was hard on them, and he said: Allah, the One, as-Samad,
  // is a third of the Quran (Sahih al-Bukhari 5015). (How the surah begins, and what it says of Allah, are its ayat.)
  "sign-third-of-the-quran": [
    ["Which surah equals a third of the Quran?", "Al-Ikhlas", "A man heard one recite: Qul huwa Allahu ahad", "It equals a third of the Quran"],
    ["What did the man in the hadith do with Al-Ikhlas?", "He recited it again and again", "A man heard one recite: Qul huwa Allahu ahad", "Repeating it, again and again"],
    ["The man thought reciting it was not enough.", "True", "In the morning he told him, as if it were little"],
    ["Al-Ikhlas is a short surah with a great reward.", "True", "In the morning he told him, as if it were little", "It equals a third of the Quran"],
    ["What is Al-Ikhlas equal to, says the Prophet ﷺ?", "A third of the Quran", "It equals a third of the Quran"],
    ["How did the companions feel about reciting a third in one night?", "They found it hard", "Can one of you not recite a third in a night?"],
    ["How can you recite a third of the Quran in one night?", "Recite Al-Ikhlas", "Allah, One, as-Samad: a third of the Quran"]
  ],
  // You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I not
  // point you to something which, if you do it, you will love one another? Spread the salam among you (Sahih Muslim 54).
  // (Who narrated it, what the greeting means, and the greeting of Paradise stay on their usual picture.)
  "sign-spread-the-salam": [
    ["What builds love between people, in the hadith?", "Spreading the Salam", "If you do it, you will love one another", "Spread the salam among you"],
    ["What is needed for true faith, in the hadith?", "Loving one another", "Nor believe until you love one another"],
    ["What must we do to truly believe, per Muslim 54?", "Love one another", "Nor believe until you love one another"],
    ["What fosters love among us?", "Spreading salam", "If you do it, you will love one another", "Spread the salam among you"],
    ["What does spreading the salam bring?", "Love between people", "If you do it, you will love one another", "Spread the salam among you"],
    ["Loving one another is part of true faith.", "True", "Nor believe until you love one another"]
  ],
  // A man asked him: what in Islam is best? He said: that you feed people, and give salam to those you know and those
  // you do not know (Sahih al-Bukhari 12).
  "sign-feed-and-greet": [
    ["What deeds of Islam did the Prophet ﷺ name?", "Feeding and greeting", "He said: that you feed people", "And to those you do not know"],
    ["Whom should we greet?", "Those we know and do not know", "And give salam to those you know", "And to those you do not know"],
    ["Feeding the poor is one of the good deeds of Islam.", "True", "He said: that you feed people"],
    ["What good deed did the Prophet ﷺ name first?", "To feed people", "He said: that you feed people"],
    ["Whom should we greet, per the hadith?", "Those we know and those we do not", "And give salam to those you know", "And to those you do not know"],
    ["Salam is only for people we already know.", "False", "And to those you do not know"]
  ],
  // An-Nu'man's father gave him a gift, and his mother would not be pleased until the Prophet was made witness to it.
  // He came and said: I have given my son a gift. He asked: have you given the rest of your children the like of this?
  // He said: no. He said: then fear Allah, and be fair between your children; so he went back and took back his gift
  // (Sahih al-Bukhari 2587).
  "sign-a-fair-gift": [
    ["What did the Prophet ﷺ ask An-Nu'man's father?", "Did you give all your sons the same?", "Have you given all your children the same?"],
    ["What did he tell him?", "Fear Allah and be fair to your children", "Fear Allah, and be fair to your children"],
    ["What did the father do then?", "Took the gift back", "He went back, and took back his gift"],
    ["What did the Prophet ﷺ ask Nu'man's father?", "Did all your sons get the same?", "Have you given all your children the same?"],
    ["What did he tell parents to be?", "Just to their children", "Fear Allah, and be fair to your children"],
    ["Nu'man's father took the gift back.", "True", "He went back, and took back his gift"]
  ],
  // Sa'd ibn Ubadah's mother died while he was away from her. He said: my mother died while I was away; will it help
  // her if I give anything in charity for her? He said: yes. He said: then I make you witness that my garden al-Mikhraf
  // is charity for her (Sahih al-Bukhari 2756). (What he gave is asked on its own picture card.)
  "sign-garden-in-charity": [
    ["Does charity for a dead parent help them?", "Yes", "He said: yes"],
    ["Sa'd was with his mother when she died.", "False", "Sa'd's mother died while he was away"],
    ["Does charity help a parent who died?", "Yes", "He said: yes"],
    ["We can still do good for our parents after they die.", "True", "He said: yes", "Is charity for her"]
  ],
  // Rights will surely be paid to their owners on the Day of Resurrection, until the hornless sheep gets its due from
  // the horned sheep (Sahih Muslim 2582). (Which animal gets its due is asked on its own picture card, and who disputes,
  // per Ibn Abbas, stays on its usual picture.)
  "sign-hornless-sheep": [
    ["What happens to rights, in the hadith?", "They will be restored", "Rights will surely be paid to their owners", "From the horned sheep"],
    ["What will happen to rights, per the hadith?", "They will be restored", "Rights will surely be paid to their owners", "From the horned sheep"],
    ["Allah judges between the animals with justice.", "True", "Until the hornless sheep gets its due", "From the horned sheep"]
  ],
  // If he forgets, and eats and drinks, let him complete his fast, for it was Allah who fed him and gave him drink
  // (Sahih al-Bukhari 1933). (What breaks the fast, and keeping away from bad words, are asked of other lessons too.)
  "sign-forgot-and-ate": [
    ["If you eat because you ____, your fast still counts.", "forgot", "If he forgets, and eats", "Let him complete his fast"],
    ["You forgot and drank water while fasting. What now?", "Finish your fast", "Let him complete his fast"],
    ["Eating because you forgot still lets your fast count.", "True", "Let him complete his fast"]
  ],
  // He kissed al-Hasan ibn Ali while al-Aqra' ibn Habis was sitting with him. Al-Aqra' said: I have ten children, and
  // I have never kissed one of them. He looked at him, then said: whoever is not merciful is not shown mercy (Sahih
  // al-Bukhari 5997).
  "sign-kiss-of-mercy": [
    ["Whom did the Prophet ﷺ kiss in front of al-Aqra?", "His grandson al-Hasan", "He kissed al-Hasan ibn Ali", "Al-Aqra' ibn Habis was sitting with him"],
    ["How many children did al-Aqra say he had?", "Ten", "Al-Aqra' said: I have ten children"],
    ["Showing love to children is part of mercy.", "True", "Then said: whoever is not merciful", "Is not shown mercy"],
    ["Whom did the Prophet ﷺ kiss?", "His grandson Al-Hasan", "He kissed al-Hasan ibn Ali"],
    ["What did he say to the man who never kissed his children?", "No mercy shown, no mercy given", "Then said: whoever is not merciful", "Is not shown mercy"],
    ["How many children did that man have?", "Ten", "Al-Aqra' said: I have ten children"]
  ],
  // Ammar said: I saw the Messenger of Allah, and there was none with him but five slaves, two women and Abu Bakr
  // (Sahih al-Bukhari 3660). (Who was the first grown man to accept Islam stays on its usual picture: the scene shows
  // who was with him, not who came first.)
  "sign-first-believers": [
    ["Ammar named who was with the Prophet ﷺ at first. Which man did he name?", "Abu Bakr", "And Abu Bakr"],
    ["How many slaves did Ammar count among the first Muslims?", "Five", "None was with him but five slaves"],
    ["How many women did Ammar count?", "Two", "And two women"],
    ["Which companion reported how few Muslims there were at first?", "Ammar ibn Yasir", "Ammar said: I saw him"],
    ["Who was with the Prophet ﷺ when Ammar saw him?", "Five slaves, two women and Abu Bakr", "None was with him but five slaves", "And Abu Bakr"],
    ["Ammar was one of the earliest Muslims.", "True", "Ammar said: I saw him", "And Abu Bakr"],
    ["How many Muslims were there then?", "Very few", "None was with him but five slaves", "And Abu Bakr"]
  ],
  // Umar used to say: Abu Bakr is our master, and he freed our master, meaning Bilal (Sahih al-Bukhari 3754).
  "sign-freed-bilal": [
    ["In Makkah, Abu Bakr set ____ free.", "Bilal", "And he freed our master", "Meaning Bilal"],
    ["In Makkah, Abu Bakr set Umar free.", "False", "And he freed our master", "Meaning Bilal"],
    ["Bilal grew up as a ____ in Makkah.", "slave", "And he freed our master"],
    ["Bilal grew up as a king in Makkah.", "False", "And he freed our master"],
    ["Abu Bakr bought Bilal and set him ____.", "free", "And he freed our master"],
    ["Umar said Abu Bakr freed 'our master'. Who did he mean?", "Bilal", "Meaning Bilal"],
    ["What did Umar call Abu Bakr?", "Our master", "Abu Bakr is our master"],
    ["Who praised Abu Bakr for freeing Bilal?", "Umar", "Umar used to say:"],
    ["Umar looked down on Bilal because he had been a slave.", "False", "And he freed our master", "Meaning Bilal"],
    ["What did Umar call Bilal?", "Our master", "Abu Bakr is our master", "Meaning Bilal"],
    ["Who freed Bilal?", "Abu Bakr", "Abu Bakr is our master", "And he freed our master"],
    ["What does Umar's saying teach?", "Faith, not birth, gives honor", "And he freed our master", "Meaning Bilal"],
    ["Umar was the one who told this.", "True", "Umar used to say:"]
  ],
  // He sent Amr ibn al-As to lead the army of Dhat as-Salasil. Amr came and asked: who of the people is most beloved
  // to you? He said: Aishah. He asked: and among the men? He said: her father. He asked: then who? He said: then Umar
  // ibn al-Khattab, and he named other men (Sahih al-Bukhari 3662). (When Sawdah married him stays on its usual picture.)
  "sign-most-beloved": [
    ["Abu Bakr was the father of ____.", "Aishah", "He said: Aishah", "He said: her father"],
    ["Abu Bakr was the father of Fatimah.", "False", "He said: Aishah", "He said: her father"],
    ["Asked who he loved most, the Prophet ﷺ said: ____.", "Aishah", "He said: Aishah"],
    ["Who did the Prophet ﷺ name as most beloved to him?", "Aishah", "He said: Aishah"],
    ["Among men, whom did he ﷺ name?", "Her father, Abu Bakr", "He said: her father"],
    ["Who asked the Prophet ﷺ this question?", "Amr ibn al-As", "He sent Amr to lead an army", "Amr asked: who is most beloved to you?"],
    ["Who asked the Prophet ﷺ whom he loved most?", "Amr ibn al-As", "He sent Amr to lead an army", "Amr asked: who is most beloved to you?"],
    ["Among men, whom did the Prophet ﷺ love most?", "Abu Bakr", "He said: her father"],
    ["Whom did he name after Abu Bakr?", "Umar", "Then who? He said: then Umar"],
    ["How did the Prophet ﷺ name Abu Bakr in his answer?", "Her father", "He said: her father"],
    ["Among men, who did he say he loved most?", "Abu Bakr, her father", "He said: her father"],
    ["Who came next after Abu Bakr?", "Umar ibn al-Khattab", "Then who? He said: then Umar"]
  ],
  // Every nation has a trustworthy one, and the trustworthy one of this nation is Abu Ubaydah ibn al-Jarrah (Sahih
  // al-Bukhari 3744). (That he was among the first to accept Islam, and among the ten given good news of Paradise, stay
  // on their usual picture.)
  "sign-trustworthy-one": [
    ["The Prophet ﷺ called Abu Ubaydah this Ummah's ____ one.", "trustworthy", "Every nation has a trustworthy one", "Is Abu Ubaydah ibn al-Jarrah"],
    ["What title did the Prophet ﷺ give Abu Ubaydah?", "The trustworthy one of this nation", "Every nation has a trustworthy one", "Is Abu Ubaydah ibn al-Jarrah"],
    ["What does amin mean?", "Trustworthy", "Every nation has a trustworthy one", "Is Abu Ubaydah ibn al-Jarrah"]
  ],
  // Have you not seen ayat revealed tonight, the like of which has never been seen? Say: I seek refuge with the Lord of
  // the dawn, and Say: I seek refuge with the Lord of men (Sahih Muslim 814). (Who heard it stays on its usual picture:
  // the scene's words do not name him.)
  "sign-two-refuges": [
    ["Which two surahs did the Prophet ﷺ praise to Uqbah?", "Al-Falaq and An-Nas", "Say: I seek refuge with the Lord of the dawn", "And Say: I seek refuge with the Lord of men"],
    ["Verses like these had been seen many times before.", "False", "The like of which was never seen?"],
    ["What do both surahs begin with?", "Say: I seek refuge", "Say: I seek refuge with the Lord of the dawn", "And Say: I seek refuge with the Lord of men"],
    ["What did the Prophet ﷺ say about Al-Falaq and An-Nas?", "Nothing like them was ever seen", "The like of which was never seen?"],
    ["Which two surahs are these?", "Al-Falaq and An-Nas", "Say: I seek refuge with the Lord of the dawn", "And Say: I seek refuge with the Lord of men"]
  ],
  // O Abu al-Mundhir, do you know which ayah of the Book of Allah with you is greatest? I said: Allah and His Messenger
  // know best. He asked again, and I said: Allah, there is no god but He, the Living, the Eternal. He said: may
  // knowledge be pleasant for you (Sahih Muslim 810). (Who answered and the two names at its start stay on their usual
  // picture, since the scene's words give only his kunya and the names' meaning; so does the start of Al-Baqarah.)
  "sign-greatest-ayah": [
    ["Ayat al-Kursi is the greatest ____ in the Quran.", "ayah", "O Abu al-Mundhir, which ayah is greatest?", "May knowledge be pleasant for you"],
    ["Which ayah did Ubayy say is the greatest?", "Ayat al-Kursi", "I said: Allah, there is no god but He", "The Living, the Eternal"],
    ["What did the Prophet ﷺ call Ubayy?", "Abul-Mundhir", "O Abu al-Mundhir, which ayah is greatest?"],
    ["The Prophet ﷺ was pleased with Ubayy's answer.", "True", "May knowledge be pleasant for you"],
    ["Which is the greatest ayah, in Muslim 810?", "Ayat al-Kursi", "I said: Allah, there is no god but He", "The Living, the Eternal"]
  ],
  // Whoever of you sees a wrong, let him change it with his hand; if he cannot, then with his tongue; and if he cannot,
  // then with his heart, and that is the weakest of faith (Sahih Muslim 49). (Abu Sa'id's word on the man who spoke up,
  // and the saved group of 7:165, stay on their usual picture.)
  "sign-change-it": [
    ["What is the first way to change a wrong?", "With your hand", "Let him change it with his hand"],
    ["What is the weakest level of faith?", "Hating it in your heart", "If he cannot, then with his heart", "And that is the weakest of faith"],
    ["What is the first way to change a wrong, in Muslim 49?", "With your hand", "Let him change it with his hand"],
    ["What comes after the hand, if you cannot?", "The tongue", "If he cannot, then with his tongue"],
    ["What is the weakest faith, in Muslim 49?", "Hating it in the heart", "If he cannot, then with his heart", "And that is the weakest of faith"],
    ["What is the first way to change a wrong, in Muslim 49?", "With the hand", "Let him change it with his hand"],
    ["What is the weakest of faith, in Muslim 49?", "Hating it in the heart", "If he cannot, then with his heart", "And that is the weakest of faith"]
  ],
  // Abu Dharr sent his brother, who came back and said: I saw him enjoining good character. Abu Dharr took his waterskin
  // and came to Makkah; Ali saw him and knew he was a stranger, then said: follow me, and enter where I enter. He heard
  // him and became Muslim on the spot, and called out the shahadah at the masjid; the people beat him, and al-Abbas knelt
  // over him: he is of Ghifar (Sahih al-Bukhari 3861, 3522). (His name Jundub, that he was among the very first, and
  // being told to go back to his people stay on their usual picture: the scene does not show them.)
  "sign-abu-dharr-seeks": [
    ["Whom did Abu Dharr send to Makkah first?", "His brother", "His brother said: he enjoins good character"],
    ["Who led Abu Dharr to the Prophet ﷺ?", "Ali", "Ali saw him, and knew he was a stranger", "Follow me, and enter where I enter"],
    ["What did Abu Dharr do after hearing the Prophet ﷺ?", "Became Muslim on the spot", "He heard him, and became Muslim at once"],
    ["Abu Dharr bravely called out his Islam at the ____.", "Ka'bah", "He called out the shahadah at the masjid"],
    ["Where did Abu Dharr declare his Islam aloud?", "In the Masjid al-Haram", "He called out the shahadah at the masjid"],
    ["Who protected him from the angry people?", "Al-Abbas", "Al-Abbas knelt over him: he is of Ghifar"],
    ["Abu Dharr grew up with the ____ tribe, outside Makkah.", "Ghifar", "Al-Abbas knelt over him: he is of Ghifar"],
    ["Abu Dharr grew up with the Quraysh tribe, outside Makkah.", "False", "Al-Abbas knelt over him: he is of Ghifar"]
  ],
  // Jubayr ibn Mut'im heard him recite at-Tur in Maghrib: were they created by nothing, or were they themselves the
  // creators? Or did they create the heavens and the earth? Nay, but they have no firm belief. My heart was about to fly
  // (Sahih al-Bukhari 4854). (Jubayr's father, tribe and clan, why he had come to Madinah, and the night glorifying of
  // 52:49 stay on their usual picture.)
  "sign-heart-almost-flew": [
    ["Ayah 35: which question made Jubayr's heart nearly fly?", "Were they created from nothing?", "Were they created by nothing?"],
    ["How did Jubayr feel at 52:35, per Bukhari 4854?", "His heart almost flew", "My heart was about to fly"],
    ["Hearing these ayahs helped lead Jubayr to Islam.", "True", "Nay, but they have no firm belief", "My heart was about to fly"]
  ],
  // Heraclius called Abu Sufyan to his court and asked: do the nobles follow him, or the poor? The poor. Increasing or
  // decreasing? Increasing. Did you ever accuse him of lying? No. They are the followers of the messengers. Then his ﷺ
  // letter: accept Islam, and be safe; come to a word common to us and you (Sahih al-Bukhari 7). (The questions on
  // 6:53, 10:16 and 11:27 stay on their usual picture.)
  "sign-heraclius-asks": [
    ["Who followed the Prophet ﷺ, per Abu Sufyan to Heraclius?", "Mostly the poor", "Do nobles or the poor follow him? The poor"],
    ["Who mostly followed the Prophet ﷺ, per the answer to Heraclius?", "The poor", "Do nobles or the poor follow him? The poor"],
    ["Heraclius also asked if the followers were growing in number.", "True", "Increasing or decreasing? I said: increasing"],
    ["What did Heraclius ask about him ﷺ?", "Had he ever lied before?", "Did you ever accuse him of lying? I said: no"],
    ["Even an enemy at that time said he ﷺ never lied.", "True", "Did you ever accuse him of lying? I said: no"],
    ["What did the letter invite Heraclius to?", "Islam", "His letter: accept Islam, and be safe"],
    ["To whom did the Prophet ﷺ send a letter with 3:64?", "Heraclius, the Roman emperor", "His letter: accept Islam, and be safe", "Come to a word common to us and you"],
    ["The Prophet ﷺ used an ayah of the Quran to invite a king.", "True", "His letter: accept Islam, and be safe", "Come to a word common to us and you"]
  ],
  // Umar was at home in fear: your people claim they will kill me. Al-As ibn Wa'il said: there is no way to you; the
  // people streamed through the valley for Ibn al-Khattab, he told them there is no way to him, and they went back (Sahih
  // al-Bukhari 3864). We have been mighty since Umar became Muslim (3684). (Where Umar grew up, his daughter Hafsah,
  // that his son told this, and that Ibn Mas'ud said it stay on their usual picture: the scene does not show them.)
  "sign-mighty-since-umar": [
    ["Why was Umar afraid after he became Muslim?", "His people threatened his life", "Your people claim they will kill me"],
    ["Who gave Umar protection that day?", "Al-As ibn Wa'il", "Umar was at home, in fear", "Al-As said: there is no way to you"],
    ["What did the crowd do once Umar was protected?", "They went back", "There is no way to him. So they went back"],
    ["When Umar became Muslim, the Muslims grew ____.", "stronger", "We stayed mighty since Umar became Muslim"],
    ["What changed for the Muslims when Umar became Muslim?", "They became strong", "We stayed mighty since Umar became Muslim"],
    ["Umar's Islam made the Muslims weaker.", "False", "We stayed mighty since Umar became Muslim"]
  ],
  // Salman visited his brother Abu ad-Darda; Umm ad-Darda said: your brother has no need of this world. Salman would not
  // eat until he ate, told him to sleep at night, and at the end of the night both prayed. Your Lord, your self and your
  // family each have a right on you; and he said: Salman has spoken the truth (Sahih al-Bukhari 1968).
  "sign-every-right": [
    ["Who was Salman's brother in faith in Madinah?", "Abu ad-Darda", "Salman visited his brother Abu ad-Darda"],
    ["Why was Umm ad-Darda looking uncared for?", "Her husband gave her no time", "Your brother has no need of this world"],
    ["What was Abu ad-Darda doing too much of?", "Fasting and night prayer", "Salman said: I will not eat until you eat", "At night he got up. Salman said: sleep"],
    ["Which three have rights on you, Salman said?", "Your Lord, your body, your family", "Your Lord, self and family each have a right"],
    ["Salman said: give each one who has a right its right.", "True", "Your Lord, self and family each have a right"],
    ["What did the Prophet ﷺ say about Salman's advice?", "Salman spoke the truth", "He said: Salman has spoken the truth"],
    ["The Prophet ﷺ said Salman was wrong.", "False", "He said: Salman has spoken the truth"]
  ],
  // Which masjid was set up on earth first? Al-Masjid al-Haram. Then which? Al-Masjid al-Aqsa. How long between them?
  // Forty years; and wherever the prayer reaches you, pray there (Sahih al-Bukhari 3366). (Which was built second, in
  // Bukhari 3366, keeps its map.)
  "sign-first-masjid": [
    ["What is the first House for people, in 3:96?", "The Ka'bah in Makkah", "He said: al-Masjid al-Haram"],
    ["Which masjid was built first, per the hadith?", "Al-Masjid Al-Haram", "He said: al-Masjid al-Haram"],
    ["Which masjid came second, per the hadith?", "Al-Aqsa", "Then which? He said: al-Masjid al-Aqsa"],
    ["How long between the two, in Bukhari 3366?", "Forty years", "How long between them? Forty years"],
    ["How long was between them, per the hadith?", "Forty years", "How long between them? Forty years"]
  ],
  // At al-Hudaybiyah, after rain in the night: whoever said we were given rain by the grace of Allah and His mercy
  // believes in Me, and whoever said by such and such a star disbelieves in Me (Sahih al-Bukhari 846). (Where he taught
  // it keeps its map, and the questions on 10:21 stay on their usual picture.)
  "sign-rain-and-stars": [
    ["What should a believer say about rain, per the hadith?", "It came by Allah's mercy", "By Allah's grace and mercy: a believer in Me"],
    ["Who truly believes, per the hadith?", "Who says rain is Allah's mercy", "By Allah's grace and mercy: a believer in Me"],
    ["Saying a star brought the rain is fine.", "False", "By such a star: a disbeliever in Me"]
  ],
  // He forbade that a man be made to rise from his seat so that another may sit in it, but make room and spread out;
  // and Ibn Umar disliked sitting where one had risen for him (Sahih al-Bukhari 6270). (Whom Allah raises in rank, and
  // the woman who complained, stay on their usual picture: the scene does not show them.)
  "sign-make-room": [
    ["What did the Prophet ﷺ forbid, in Bukhari 6270?", "Making someone leave his seat", "He forbade making one rise from his seat"],
    ["What should we do instead?", "Make room and spread out", "But make room, and spread out"],
    ["Ayah 11: what should we do when asked to make room?", "Make room", "But make room, and spread out"],
    ["Ayahs 7-13: what are they about?", "Make room", "But make room, and spread out"],
    ["Ibn Umar disliked taking a seat someone left for him.", "True", "Ibn Umar disliked sitting where one rose"]
  ],
  // Beware of sitting on the roads. They said: we cannot do without it. If you must, give the road its right: lowering
  // the gaze, holding back harm, returning the salam, and enjoining good and forbidding wrong (Sahih al-Bukhari 2465).
  "sign-rights-of-the-road": [
    ["What did the Prophet ﷺ first say about roads?", "Avoid sitting on them", "Beware of sitting on the roads"],
    ["The companions first said they had to sit by the roads.", "True", "They said: we must, it is where we talk"],
    ["What is the first right of the road?", "Lowering your gaze", "What is its right? Lowering the gaze"],
    ["Which of these is a right of the road?", "Returning salam", "Holding back harm, returning the salam"],
    ["What should you do with greetings on the road?", "Return them", "Holding back harm, returning the salam"],
    ["Which of these is NOT a right of the road?", "Selling food to all", "What is its right? Lowering the gaze", "Enjoining good, and forbidding wrong"]
  ],
  // The buyer and the seller may choose as long as they have not parted; if they tell the truth and make things clear,
  // they are blessed in their sale, and if they hide and lie, its blessing is wiped out (Sahih al-Bukhari 2079). (Who
  // narrated it, and what Shu'ayb told his people, stay on their usual picture.)
  "sign-honest-trade": [
    ["What brings blessing into a sale?", "Truth and showing faults", "If they tell the truth and make it clear", "They are blessed in their sale"],
    ["What makes a sale blessed, per the hadith?", "Truth and showing faults", "If they tell the truth and make it clear", "They are blessed in their sale"],
    ["What happens if they lie and hide faults?", "The blessing is lost", "The blessing of their sale is wiped out"],
    ["What happens if they lie or hide things?", "The blessing is lost", "The blessing of their sale is wiped out"]
  ],
  // Sa'd said: do not drive away those who call their Lord morning and evening was revealed about six of us; I and Ibn
  // Mas'ud were among them, and the idolaters had said to him: do not keep these near you (Sahih Muslim 2413). (Which
  // Companion was among the six stays on its usual picture: the scene does not name them.)
  "sign-keep-them-close": [
    ["How many believers were there, in the hadith?", "Six", "Sa'd said: an ayah was revealed about six"],
    ["Who asked for the poor believers to be sent away, per Muslim 2413?", "The idol worshippers", "The idolaters said: do not keep these near"],
    ["What did the idolaters want?", "Them sent away", "The idolaters said: do not keep these near"],
    ["Allah allowed sending the poor believers away.", "False", "Do not drive away those who call their Lord"],
    ["When do these believers call their Lord, in 6:52?", "Morning and evening", "In the morning and the evening"]
  ],
  // O Muslim women, let none of you look down on a gift for her neighbor, even if it is a sheep's trotter (Sahih
  // al-Bukhari 2566).
  "sign-small-gift": [
    ["Whom was Bukhari 2566 first said to?", "The Muslim women", "O Muslim women"],
    ["Whom was this said to?", "The Muslim women", "O Muslim women"],
    ["How should we treat a neighbour's small gift?", "Never look down on it", "Let none look down on a gift for her neighbor"],
    ["Whose gift should not be looked down on?", "A neighbor's", "Let none look down on a gift for her neighbor"],
    ["What small gift did he name?", "A sheep's foot", "Even if it is a sheep's trotter"],
    ["What small gift did the Prophet ﷺ name?", "A sheep's hoof", "Even if it is a sheep's trotter"],
    ["Only expensive gifts are worth thanks.", "False", "Even if it is a sheep's trotter"],
    ["Only big gifts count between neighbors.", "False", "Even if it is a sheep's trotter"],
    ["Gifts between neighbours build love.", "True", "Even if it is a sheep's trotter"]
  ],
  // Hunger brought him out, and Abu Bakr and Umar; a man of the Ansar welcomed them with dates and sweet water, and he
  // said: you will be asked about this blessing on the Day of Resurrection (Sahih Muslim 2038). (What ayahs 5-8 say of
  // wanting more stays on its usual picture.)
  "sign-asked-about-blessings": [
    ["What brought them out of their houses?", "Hunger", "What brought you out? They said: hunger"],
    ["Who fed them?", "A man of the Ansar", "They went with him to a man of the Ansar", "He brought a cluster of fresh and dry dates"],
    ["What will we be asked about, that Day?", "The blessings we enjoyed", "You will be asked about this blessing"],
    ["Ayah 8: what will we be asked about that Day?", "The blessings we enjoyed", "You will be asked about this blessing"],
    ["Ayahs 5-8: what are they about?", "Asked about blessings", "You will be asked about this blessing"],
    ["After dates and cool water, what did the Prophet ﷺ say?", "You will be asked about it", "You will be asked about this blessing"],
    ["He said they would be asked about that meal.", "True", "You will be asked about this blessing"]
  ],
  // If the son of Adam had a valley of gold, he would love to have two; nothing fills his mouth but dust, and Allah
  // turns to whoever repents (Sahih al-Bukhari 6439). (Until when the race for more distracts, until the graves are
  // visited, stays on its usual picture: the scene does not show graves.)
  "sign-valley-of-gold": [
    ["With one valley of gold, what would a person want?", "A second valley", "He would love to have two valleys"],
    ["If man had one valley of gold, what would he want?", "Two valleys", "He would love to have two valleys"],
    ["Ayahs 1-4: what are they about?", "Wanting more", "He would love to have two valleys"],
    ["What distracts people until the grave?", "Wanting more and more", "He would love to have two valleys", "Nothing fills his mouth but dust"],
    ["Ayahs 1-4 say: Wanting more and more distracts you until the grave.", "True", "He would love to have two valleys", "Nothing fills his mouth but dust"],
    ["More money always makes people feel full.", "False", "Nothing fills his mouth but dust"],
    ["Whom does Allah forgive, per the hadith?", "Whoever repents", "And Allah turns to whoever repents"]
  ],
  // Straighten your rows, for straightening the rows is part of establishing the prayer (Sahih al-Bukhari 723). (How
  // late-comers join the imam, and the reward of praying together, stay on their usual picture: the scene does not
  // show them.)
  "sign-straight-rows": [
    ["In jamaah, stand in ____ rows, shoulder to shoulder.", "straight", "Straighten your rows"],
    ["What did the Prophet ﷺ say about rows in prayer?", "Straighten them", "Straighten your rows"],
    ["Why straighten the rows?", "For a complete prayer", "Is part of establishing the prayer"],
    ["Straight rows are part of a correct prayer.", "True", "Is part of establishing the prayer"]
  ],
  // Al-Bara heard him recite By the fig and the olive in the Isha prayer, and never heard a finer voice or recitation
  // (Sahih al-Bukhari 769). (What ayahs 1-4 say of the best form, and the safe city, stay on their usual picture: the
  // scene shows only the fig and the olive; that he was on a journey is in the scene from the start, so it is not
  // asked on it.)
  "sign-sweetest-recitation": [
    ["In which prayer did he recite At-Tin?", "Isha", "In the Isha prayer"],
    ["What did Al-Bara say about his voice?", "He never heard a sweeter one", "I never heard a finer voice or recitation"]
  ],
  // The religion is easy, and no one overdoes it but it overcomes him; so aim right, come close, and be glad, and seek
  // help in the morning, the evening and a little of the night (Sahih al-Bukhari 39). (What Ibn Kathir says of the
  // opened chest stays on its usual picture.)
  "sign-easy-religion": [
    ["How did he describe the religion?", "Very easy", "The religion is easy"],
    ["What did the Prophet ﷺ say about the religion?", "It is easy", "The religion is easy"],
    ["What happens to one who overburdens himself?", "He cannot keep going", "No one overdoes it but it overcomes him"],
    ["Doing too much too fast is the best way to start.", "False", "No one overdoes it but it overcomes him"]
  ],
  // My close friend advised me of three: fasting three days of every month, two rak'ahs of Duha, and to pray witr
  // before I sleep (Sahih al-Bukhari 1981).
  "sign-three-things-to-keep": [
    ["How many days a month did he ﷺ advise fasting?", "Three", "My close friend advised me of three", "Fasting three days of every month"],
    ["Duha was one of the three things he ﷺ advised.", "True", "Two rak'ahs of Duha"],
    ["The advice also had two rakahs of Duha.", "True", "Two rak'ahs of Duha"],
    ["When should witr be prayed, by this advice?", "Before sleeping", "And to pray witr before I sleep"],
    ["When should witr be prayed, in this advice?", "Before sleeping", "And to pray witr before I sleep"]
  ],
  // One from Najd asked about Islam: five prayers in the day and the night, the fast of Ramadan, and zakat; is there
  // more on me? No, unless you do it of your own will. He has succeeded, if he is truthful (Sahih al-Bukhari 46).
  "sign-asked-about-islam": [
    ["How many prayers are required daily?", "Five", "Five prayers in the day and the night"],
    ["Zakat is required; salah is extra charity.", "False", "Five prayers in the day and the night", "Anything more? No, unless you wish to"],
    ["Zakat is required; ____ is extra charity.", "sadaqah", "And the fast of Ramadan, and zakat", "Anything more? No, unless you wish to"],
    ["What did he say about more prayers?", "They are voluntary", "Anything more? No, unless you wish to"],
    ["Night prayer is still required for every Muslim.", "False", "Anything more? No, unless you wish to"]
  ],
  // Abu Sa'id ibn al-Mu'alla was praying when he called him; did Allah not say: answer Allah and the Messenger when he
  // calls you? Then he taught him the greatest surah: All praise is for Allah, Lord of the worlds, the seven
  // oft-repeated and the great Quran (Sahih al-Bukhari 4474). (That Abu Sa'id was at prayer is in the scene from the
  // start, so why he did not answer at once is not asked on it; whom he told, by name, what else ayahs 80-99 say, and
  // ayah 99, stay on their usual picture.)
  "sign-greatest-surah": [
    ["Which surah did the Prophet ﷺ call the greatest in the Quran?", "Al-Fatihah", "All praise is for Allah, Lord of the worlds"],
    ["What was the Prophet ﷺ given with the Quran, in Al-Hijr?", "Seven oft-repeated ayahs", "All praise is for Allah, Lord of the worlds", "The seven oft-repeated, and the great Quran"],
    ["Ayahs 80-99: what are they about?", "Seven oft-repeated", "All praise is for Allah, Lord of the worlds", "The seven oft-repeated, and the great Quran"],
    ["What are the 'seven oft-repeated' verses?", "Al-Fatihah", "All praise is for Allah, Lord of the worlds", "The seven oft-repeated, and the great Quran"]
  ],
  // Umar came to the Black Stone and kissed it, and said: I know that you are a stone; you neither harm nor benefit.
  // Had I not seen the Prophet ﷺ kiss you, I would not have kissed you (Sahih al-Bukhari 1597).
  "sign-black-stone": [
    ["What does this teach about tawhid?", "We worship Allah, not objects", "I know that you are a stone", "You neither harm nor benefit"],
    ["What did Umar say the stone can do?", "Neither benefit nor harm", "You neither harm nor benefit"],
    ["What did Umar say to the Black Stone?", "You cannot harm or benefit", "You neither harm nor benefit"],
    ["Umar believed the stone had power.", "False", "I know that you are a stone", "You neither harm nor benefit"],
    ["Why did Umar kiss the Black Stone?", "He saw the Prophet ﷺ do it", "Had I not seen him kiss you"],
    ["Why did Umar kiss it then?", "He saw the Prophet ﷺ kiss it", "Had I not seen him kiss you"]
  ],
  // He sent a man in charge of a party, who ended his recitation with Say: He is Allah, One; because it describes the
  // Most Merciful, and I love to recite it. Tell him that Allah loves him (Sahih al-Bukhari 7375). (Who told the story,
  // and what ayahs 3-4 say, stay on their usual picture.)
  "sign-loves-al-ikhlas": [
    ["Why did the man always recite Al-Ikhlas?", "It describes Allah, and he loved it", "Because it describes the Most Merciful", "And I love to recite it"],
    ["What did the Prophet ﷺ say of the man who loved it?", "Allah loves him", "Tell him that Allah loves him"],
    ["What did the Prophet ﷺ say about him?", "Tell him that Allah loves him", "Tell him that Allah loves him"]
  ],
  // Hudhayfah prayed with him one night: he recited slowly; at an ayah of glory he glorified, at an asking he asked, at
  // refuge he sought refuge; then he bowed: Glory be to my Lord, the Most Great (Sahih Muslim 772). (What he said in
  // sujud stays on its usual picture: the scene ends at his bowing.)
  "sign-night-with-hudhayfah": [
    ["What did he do at ayahs of Allah's glory?", "Glorified Allah", "At an ayah of glory, he glorified"],
    ["What did he do at ayahs about asking Allah?", "He asked Allah", "At an asking he asked; at refuge, he sought refuge"],
    ["At ayahs of protection, he sought Allah's protection.", "True", "At an asking he asked; at refuge, he sought refuge"],
    ["In ____, we bow and say Subhana Rabbiyal Azim.", "ruku", "He bowed: Glory be to my Lord, the Most Great"],
    ["In ruku, we bow and say Subhana Rabbiyal Azim.", "True", "He bowed: Glory be to my Lord, the Most Great"],
    ["What did the Prophet ﷺ say in ruku?", "Glory be to my Mighty Lord", "He bowed: Glory be to my Lord, the Most Great"],
    ["We glorify Allah the Most Great in ruku.", "True", "He bowed: Glory be to my Lord, the Most Great"]
  ],
  // Allah has ordered me to recite to you Lam yakun; did He name me? Yes; and he wept (Sahih al-Bukhari 4959). (To
  // whom he was told to recite, by name, and what ayahs 1-5 say, stay on their usual picture.)
  "sign-ubayy-named": [
    ["What did Ubayy ask?", "Did Allah mention me by name?", "Did He name me?"],
    ["Ubayy wept when he heard the answer.", "True", "And he wept"]
  ],
  // Whoever fasts Ramadan, then follows it with six of Shawwal, it is like fasting all the time (Sahih Muslim 1164).
  // (Fasting on the day of Eid stays on its usual picture.)
  "sign-six-of-shawwal": [
    ["Shawwal comes right after Ramadan.", "True", "Then follows it with six of Shawwal"],
    ["How many days of Shawwal are in the hadith?", "Six", "Then follows it with six of Shawwal"],
    ["How many fasts in Shawwal does the hadith mention?", "Six", "Then follows it with six of Shawwal"],
    ["What is the reward like?", "Fasting all the time", "It is like fasting all the time"],
    ["What is the reward like?", "Fasting forever", "It is like fasting all the time"]
  ],
  // A Muslim's rights on a Muslim are six: greet him, answer him, advise him, ask mercy for him when he sneezes and
  // praises Allah, visit him when he is ill, and follow him when he dies (Sahih Muslim 2162b). (Which is not one of
  // the six stays on its usual picture.)
  "sign-six-rights": [
    ["How many rights did the Prophet ﷺ name, of one Muslim over another?", "Six", "A Muslim's rights on a Muslim are six"],
    ["How many rights does a Muslim have over another in Muslim 2162?", "Six", "A Muslim's rights on a Muslim are six"],
    ["When a Muslim asks your advice, give it sincerely.", "True", "When he asks your advice, advise him"],
    ["Your friend is ill. Which right does he have?", "That you visit him", "When he is ill, visit him"],
    ["Your classmate is sick at home. Which right fits?", "Visit him", "When he is ill, visit him"]
  ],
  // Like a man who came to a people: I saw the army with my own eyes; I am the warner, save yourselves! Some obeyed
  // and were saved, some denied him, and the army swept them away (Sahih al-Bukhari 6482). (What he is told to say in
  // 15:89, and Ibn Kathir on 53:56, stay on their usual picture.)
  "sign-the-warner": [
    ["What did the man in the hadith see?", "An army coming", "I saw the army with my own eyes"],
    ["What did the warner see, per Bukhari 6482?", "Enemy forces", "I saw the army with my own eyes"],
    ["What happened to those who obeyed the warner?", "They were safe", "Some obeyed and left by night, and were saved"],
    ["What happened to those who obeyed?", "They were safe", "Some obeyed and left by night, and were saved"]
  ],
  // Sa'd's mother swore never to speak to him until he disbelieved, nor eat nor drink; then 29:8 and 31:15 were
  // revealed: do not obey them in shirk, but keep company with them kindly (Sahih Muslim 1748c). (Where Sa'd grew up
  // stays on its usual picture.)
  "sign-firm-and-kind": [
    ["When Sa'd became Muslim, his ____ refused to eat.", "mother", "Sa'd's mother swore never to speak to him", "Nor would she eat or drink"],
    ["What did she want Sa'd to do, in the hadith?", "Abandon his faith", "Until he disbelieved in his religion"],
    ["What did Sa'd's mother do to make him leave Islam?", "Refused to eat or drink", "Nor would she eat or drink"],
    ["What did Sa'd's mother refuse, in the hadith?", "To eat or drink", "Nor would she eat or drink"],
    ["Ayah 29:8 was revealed about Sa'd.", "True", "And We enjoined on man goodness to his parents", "But if they strive to make you join with Me"],
    ["What did Allah reveal about her?", "Do not obey parents in shirk, but be kind", "And We enjoined on man goodness to his parents", "Keep company with them in this world kindly"],
    ["What should you do if a parent orders shirk?", "Refuse, and stay kind to them", "And We enjoined on man goodness to his parents", "Keep company with them in this world kindly"]
  ],
  // He was the most generous of people, most generous of all in Ramadan, when Jibril met him every night of Ramadan
  // and studied the Quran with him; more generous with good than the sent wind (Sahih al-Bukhari 6). (What Muslims
  // pray at night in Ramadan stays on its usual picture.)
  "sign-most-generous": [
    ["When was the Prophet ﷺ most generous?", "In Ramadan", "Most generous of all in Ramadan"],
    ["Ramadan is a good time to give more.", "True", "Most generous of all in Ramadan"],
    ["Every Ramadan, Jibril went over the ____ with the Prophet ﷺ.", "Quran", "And studied the Quran with him"]
  ],
  // Reciting was made easy for Dawud: he would order his mounts to be saddled, and recite before they were saddled;
  // and he ate only from the work of his hands (Sahih al-Bukhari 3417). (Which book he was given, and that it was not
  // given to Musa, stay on their usual picture: the scene's words do not name it.)
  "sign-dawud-recites": [
    ["How fast could Dawud recite the Zabur?", "Before his animals were saddled", "He would order his mounts to be saddled", "And recite before they were saddled"],
    ["When did Dawud finish reciting the Zabur?", "Before his animals were saddled", "He would order his mounts to be saddled", "And recite before they were saddled"],
    ["How did Dawud earn his food, in the hadith?", "From his own handiwork", "And he ate only from the work of his hands"]
  ],
  // Hakim asked about the good he did in the days of ignorance, charity, freeing a slave and keeping ties: is there
  // any reward in them? You became Muslim with the good you did before (Sahih al-Bukhari 1436).
  "sign-good-kept": [
    ["What did Hakim ask the Prophet ﷺ?", "If his good before Islam counted", "Good things I did in the days of ignorance", "Is there any reward in them?"],
    ["What did Hakim ask the Prophet ﷺ?", "If his old good deeds count", "Good things I did in the days of ignorance", "Is there any reward in them?"],
    ["Hakim kept good ties with his family before Islam.", "True", "Charity, freeing a slave, and keeping ties"],
    ["Which good deed did Hakim do before Islam?", "He gave in charity", "Charity, freeing a slave, and keeping ties"],
    ["What did he ﷺ answer?", "You became Muslim with all that good", "You became Muslim with the good you did before"],
    ["The good a person did before Islam is thrown away.", "False", "You became Muslim with the good you did before"]
  ],
  // He would do i'tikaf in the last ten of Ramadan until Allah took him; then his wives did i'tikaf after him (Sahih
  // al-Bukhari 2026). (What i'tikaf is stays on its usual picture: the masjid is there from the start.)
  "sign-last-ten-itikaf": [
    ["The Prophet ﷺ did i'tikaf in the last ten days of Ramadan.", "True", "He would do i'tikaf in the last ten of Ramadan"],
    ["He ﷺ did i'tikaf only once.", "False", "He would do i'tikaf in the last ten of Ramadan", "Until Allah took him"],
    ["Who kept doing i'tikaf after he ﷺ passed away?", "His wives", "Then his wives did i'tikaf after him"]
  ],
  // Who will bring me news of the people? Az-Zubayr said: I, and again: I. Every prophet has a disciple, and my
  // disciple is az-Zubayr (Sahih al-Bukhari 2846). (At which battle it was said stays on its usual picture: the
  // trench is there from the start.)
  "sign-my-disciple": [
    ["What did the Prophet ﷺ ask for at the Trench?", "Someone to bring news of the enemy", "Who will bring me news of the people?"],
    ["How many times did Az-Zubayr say 'I will'?", "More than once", "Az-Zubayr said: I", "He asked again, and az-Zubayr said: I"],
    ["Every prophet had a disciple, per the hadith.", "True", "Every prophet has a disciple"],
    ["What did the Prophet ﷺ call Az-Zubayr?", "His disciple", "Every prophet has a disciple", "And my disciple is az-Zubayr"],
    ["Whom did the Prophet ﷺ call his disciple?", "Az-Zubayr", "Who will bring me news of the people?", "And my disciple is az-Zubayr"]
  ],
  // Help your brother, wrongdoer or wronged. We help him when he is wronged; but how do we help him when he does
  // wrong? By holding back his hands (Sahih al-Bukhari 2444).
  "sign-help-your-brother": [
    ["Whom should you help, per Bukhari 2444?", "Your brother, wronged or wrongdoer", "Help your brother, wrongdoer or wronged"],
    ["How do you help a brother who is wronging others?", "Stop him from doing it", "By holding back his hands"],
    ["How do you help a brother who wrongs others, per Bukhari 2444?", "Stop him from wronging", "By holding back his hands"],
    ["Your friend is bullying someone. What fits this lesson?", "Stop your friend", "By holding back his hands"],
    ["Helping a brother means always taking his side.", "False", "By holding back his hands"],
    ["Stopping someone from doing wrong is a way of helping him.", "True", "By holding back his hands"]
  ],
  // Umm al-Fadl heard Ibn Abbas recite al-Mursalat: my son, your recitation reminded me; it was the last I heard
  // from him; he recited it in the Maghrib prayer (Sahih al-Bukhari 763). (What al-Mursalat's ayahs say stays on
  // its usual picture, and in which prayer he recited it is asked on the sky.)
  "sign-last-surah-heard": [
    ["Who reminded Umm al-Fadl of it?", "Her son Ibn Abbas", "Umm al-Fadl heard Ibn Abbas recite al-Mursalat", "My son, by Allah, your recitation reminded me"],
    ["Al-Mursalat was the last surah she heard from the Prophet ﷺ.", "True", "It was the last I heard from him"],
    ["In which prayer was it the last surah Umm al-Fadl heard?", "The sunset prayer", "It was the last I heard from him", "He recited it in the Maghrib prayer"]
  ],
  // He prayed carrying Umamah, the daughter of Zaynab, his daughter; when he prostrated he put her down, and when he
  // stood he carried her (Sahih al-Bukhari 516). (Who narrated it stays on its usual picture.)
  "sign-umamah-in-prayer": [
    ["Whom did the Prophet ﷺ carry while praying?", "His granddaughter Umamah", "He prayed, carrying Umamah", "The daughter of Zaynab, his daughter"],
    ["Whom did the Prophet ﷺ carry in prayer?", "Umamah, his granddaughter", "He prayed, carrying Umamah", "The daughter of Zaynab, his daughter"],
    ["The Prophet ﷺ was gentle with children.", "True", "He prayed, carrying Umamah"],
    ["What did he do when he went into sujud?", "Put her down", "When he prostrated, he put her down"],
    ["What did he do when prostrating?", "Put her down", "When he prostrated, he put her down"]
  ],
  // Among the captives a woman found a child, held it close and nursed it. Would she throw her child into the fire? No.
  // Allah is more merciful to His servants than she is to her child (Sahih al-Bukhari 5999). Whom he compared with
  // Allah's mercy waits at the scene's start, so the mother and her child do not show before it is answered.
  "sign-more-merciful": [
    ["Who did he ﷺ compare with Allah's mercy?", "A mother with her child", "Captives were brought, among them a woman", "Than she is to her child"],
    ["Would the mother throw her child into a fire?", "No, never", "Would she throw her child into the fire?", "No, not while she is able not to"],
    ["Allah's mercy is even greater than a mother's.", "True", "Allah is more merciful to His servants", "Than she is to her child"]
  ],
  // He stayed below and Abu Ayyub above: we walk above his head! So he moved up. Food with garlic came back uneaten:
  // is it forbidden? No, but I dislike it. Then I dislike what you dislike (Sahih Muslim 2053). (Where he stayed stays
  // on its usual picture: the house is there from the start.)
  "sign-abu-ayyub-house": [
    ["Why was Abu Ayyub upset?", "He was walking above the Prophet ﷺ", "We walk above his head!"],
    ["In the end, the Prophet ﷺ moved upstairs.", "True", "So he moved up, and Abu Ayyub down"],
    ["Why did the Prophet ﷺ not eat the food?", "It had garlic", "He made food for him, with garlic in it", "He was told: he did not eat it"],
    ["Is garlic forbidden?", "No", "Is it forbidden? No, but I dislike it"],
    ["What did Abu Ayyub say?", "I dislike what you dislike", "Then I dislike what you dislike"]
  ],
  // Al-Miqdad: we will not say as Musa's people said, but we will fight on your right and your left, in front of you
  // and behind you; and his face shone (Sahih al-Bukhari 3952). (That his words recall 5:24 stays on its usual
  // picture: the scene's words do not name it.)
  "sign-miqdad-promise": [
    ["Whose words did Al-Miqdad refuse to repeat?", "Musa's people", "We will not say as Musa's people said"],
    ["Where did Al-Miqdad say they would fight?", "On his right, left, front and back", "But we will fight on your right and your left", "And in front of you and behind you"],
    ["His words made the Prophet's ﷺ face shine with joy.", "True", "I saw his face shine, and it pleased him"],
    ["How did the Prophet ﷺ react, per Ibn Mas'ud?", "His face shone with joy", "I saw his face shine, and it pleased him"]
  ],
  // One of the Muhajirun struck one of the Ansar; each called out to his own side. What is this call of ignorance?
  // Leave it, for it is foul (Sahih al-Bukhari 4905). (Who the Ansar were, and who narrated it, stay on their usual
  // picture.)
  "sign-leave-that-call": [
    ["What did each man call out?", "The name of his own group", "The Ansari called: O Ansar!", "The Muhajir called: O Muhajirun!"],
    ["What did the Prophet ﷺ call their shouting?", "A call of ignorance", "What is this call of ignorance?"],
    ["What did he tell them to do with it?", "Leave it", "Leave it, for it is foul"],
    ["Muslims should not split into groups against each other.", "True", "Leave it, for it is foul"]
  ],
  // Abu Bakr swore never to spend on Mistah, his poor kin, again; then came: let them pardon and overlook; would you
  // not love that Allah forgive you? Yes, by Allah, and he gave again (Sahih al-Bukhari 4750, Quran 24:22). (Which
  // ayah it was, what he said in the end, and what ayahs 21-26 say stay on their usual picture.)
  "sign-abu-bakr-forgives": [
    ["Whom had Abu Bakr been helping?", "His poor cousin Mistah", "Abu Bakr used to spend on Mistah", "For he was his kin, and poor"],
    ["Which relative did Abu Bakr swear to stop helping?", "Mistah", "Abu Bakr used to spend on Mistah", "By Allah, I will never spend on him again"],
    ["Ayah 22: what should the generous do?", "Pardon and overlook", "Let them pardon and overlook"],
    ["What does Allah ask in 24:22?", "Do you not love that Allah forgives you?", "Would you not love that Allah forgive you?"],
    ["What did Abu Bakr say when the ayah came?", "I want Allah to forgive me", "Yes, by Allah, I love that Allah forgive me"],
    ["Abu Bakr stopped helping Mistah forever.", "False", "So he gave Mistah again what he used to"],
    ["After ayah 22, what did Abu Bakr do for Mistah?", "Helped him again", "So he gave Mistah again what he used to"]
  ],
  // Between every two calls there is a prayer, three times; for whoever wishes (Sahih al-Bukhari 624). ("How many
  // times did he say it?" stays on its usual picture: lessons on parents ask it about another hadith.)
  "sign-between-two-calls": [
    ["When is this extra prayer?", "Between adhan and iqamah", "Between every two calls there is a prayer"],
    ["How many times did he ﷺ say it?", "Three", "He said it three times"],
    ["This prayer is a must for everyone.", "False", "For whoever wishes"],
    ["This prayer is for whoever wants to pray it.", "True", "For whoever wishes"]
  ],
  // I have two neighbours: to which of them shall I give a gift? To the one whose door is nearer to you (Sahih
  // al-Bukhari 2259). (Who asked it stays on its usual picture: the scene's words do not name her; and so does that
  // neighbours further off have rights too, since the scene shows only the gift to the nearer door.)
  "sign-nearest-door": [
    ["Which neighbor comes first for a gift?", "The one with the nearest door", "To the one whose door is nearer to you"],
    ["Which neighbour gets the gift first?", "The one whose door is nearest", "To the one whose door is nearer to you"],
    ["The nearest neighbour has the most right to our kindness.", "True", "To the one whose door is nearer to you"]
  ],
  // Two of his Companions left him on a dark night, with two lights like lamps; when they parted, each had one with
  // him, until he reached his family (Sahih al-Bukhari 3639). (That the night was very dark stays on its usual
  // picture: the night is there from the scene's start.)
  "sign-two-lights": [
    ["What lit the way for the two companions?", "Two lights like lamps", "With them, like two lamps, lighting the way"],
    ["What happened when the two men parted?", "Each one kept one light", "When they parted, each had one with him"]
  ],
  // O Abu Umayr, what did the nughayr do? A little bird he played with (Sahih al-Bukhari 6203). (What pet he had is
  // asked on its picture cards; whose little brother he was stays on its usual picture: the scene's words do not name
  // Anas.)
  "sign-abu-umayr-bird": [
    ["What does this teach about the Prophet ﷺ?", "He was kind to children", "O Abu Umayr, what did the nughayr do?", "A little bird he played with"]
  ],
  // When a man spends on his family hoping for its reward, it is a charity for him (Sahih al-Bukhari 55); whatever
  // you spend for Allah's sake, you are rewarded for it, even a morsel you put in your wife's mouth (Sahih al-Bukhari
  // 56). (Who narrated each stays on its usual picture.)
  "sign-family-spending": [
    ["Spending on your own ____ is a charity too.", "family", "When a man spends on his family", "It is a charity for him"],
    ["What makes it count?", "Hoping for Allah's reward", "Hoping for its reward"],
    ["Spending on your family, hoping for reward, counts as what?", "Charity", "It is a charity for him"],
    ["When is it rewarded?", "When done for Allah", "Whatever you spend for Allah's sake", "You are rewarded for it"],
    ["Is spending on family rewarded?", "Yes, for Allah's sake", "Whatever you spend for Allah's sake", "You are rewarded for it"],
    ["What small act is rewarded in the hadith?", "A bite put in your wife's mouth", "Even a morsel you put in your wife's mouth"],
    ["What small example did the Prophet ﷺ give?", "A bite for one's wife", "Even a morsel you put in your wife's mouth"]
  ],
  // When you hear the call, say the like of what the caller says (Sahih al-Bukhari 611); whoever says the du'a when he
  // hears the call, his intercession is due for him (Sahih al-Bukhari 614). (Who the mu'adhdhin is stays on its usual
  // picture: the caller is there from the start; and so do what the du'a asks for him and that answering shares in
  // the reward, which the scene's words do not name.)
  "sign-answer-the-call": [
    ["When you hear the adhan, repeat its ____ quietly.", "words", "Say the like of what the caller says"],
    ["When you hear the adhan, repeat its jokes quietly.", "False", "Say the like of what the caller says"],
    ["What should you do when you hear the adhan?", "Say what the caller says", "Say the like of what the caller says"],
    ["While the adhan is called, what do you say?", "The same words as the caller", "Say the like of what the caller says"],
    ["We say the du'a when the adhan is finished.", "True", "Whoever says, when he hears the call", "O Allah, Lord of this perfect call"],
    ["What does the one who says it receive?", "His ﷺ intercession", "My intercession is due for him"],
    ["What does the Prophet ﷺ promise the one who says this dua?", "His intercession on the Last Day", "My intercession is due for him"]
  ],
  // When supper is served and the iqamah is called, start with the supper (Sahih al-Bukhari 671). (What khushu means,
  // why Ibn Kathir cites it with 94:7, and that it does not allow missing the prayer stay on their usual picture.)
  "sign-supper-first": [
    ["If food is ready, eat first so you can ____ in salah.", "focus", "Start with the supper"],
    ["If supper is served at Iqamah, what comes first?", "The supper", "Start with the supper"]
  ],
  // Were it not hard on my ummah, I would have ordered them to use the siwak with every prayer (Sahih al-Bukhari
  // 887). (What a siwak is and what it is for stay on their usual picture: the scene does not show it in use.)
  "sign-siwak-every-prayer": [
    ["Why did he ﷺ not order siwak before every prayer?", "So it would not be hard on us", "Were it not hard on my ummah", "Or on the people"],
    ["Why did he ﷺ not order it for every prayer?", "It could be hard on us", "Were it not hard on my ummah", "Or on the people"],
    ["Using the siwak before prayer is a loved sunnah.", "True", "I would have ordered them to use the siwak", "With every prayer"],
    ["Using siwak before prayer is a loved sunnah.", "True", "I would have ordered them to use the siwak", "With every prayer"]
  ],
  // He gave each of his Companions seven dates; one of Abu Hurairah's was dry and hard, and none pleased him more, for
  // it made his chewing last long (Sahih al-Bukhari 5411).
  "sign-seven-dates": [
    ["How many dates did each companion get?", "Seven", "He gave each one seven dates"],
    ["Which date did Abu Hurairah like the most?", "The hard one", "He gave me seven: one was dry and hard", "None of them pleased me more than it"],
    ["Abu Hurairah was happy with the hard date.", "True", "None of them pleased me more than it", "For it made my chewing last long"]
  ],
  // Do not take two dates at once, for he forbade taking two at once; unless one asks his brother's permission (Sahih
  // al-Bukhari 5446).
  "sign-two-dates": [
    ["What did Ibn Umar tell people not to do?", "Eat two dates at once", "Do not take two dates at once"],
    ["When is it fine to take two dates at once?", "When your friends agree", "Unless one asks his brother's permission"],
    ["Good table manners mean thinking of others too.", "True", "Unless one asks his brother's permission"]
  ],
  // A cup was brought to him; on his right was a boy, the youngest there, and the elders on his left. He asked the boy's
  // permission to give it to the elders; the boy would not give up his share, so he gave it to him (Sahih al-Bukhari
  // 2351).
  "sign-boy-on-right": [
    ["Who sat on the Prophet's ﷺ right?", "A young boy", "On his right, a boy, the youngest there"],
    ["What did the Prophet ﷺ do first?", "Asked the boy's permission", "Boy, may I give it to the elders?"],
    ["The right side has the first turn when serving.", "True", "Boy, may I give it to the elders?", "So he gave it to him"]
  ],
  // When his dining sheet was taken away, he said: praise be to Allah, much, good and blessed praise (Sahih al-Bukhari
  // 5458). (Who narrated it stays on its usual picture: the scene's words do not name Abu Umamah.)
  "sign-after-eating": [
    ["When did the Prophet ﷺ say Al-hamdu lillahi kathiran tayyiban?", "When his meal was finished", "When his dining sheet was taken away", "He said: praise be to Allah"],
    ["When did the Prophet ﷺ say this praise?", "When he finished his meal", "When his dining sheet was taken away", "He said: praise be to Allah"],
    ["Thanking Allah after food is a sunnah.", "True", "When his dining sheet was taken away", "He said: praise be to Allah"],
    ["What does Al-hamdu lillah kathiran mean?", "Much praise to Allah", "He said: praise be to Allah", "Much, good and blessed praise"],
    ["What kind of praise is it?", "Much, good and blessed", "Much, good and blessed praise"]
  ],
  // What was left of their provisions was heaped on one leather sheet; he asked Allah to bless it, and they took from
  // it till all had enough (Sahih al-Bukhari 2484).
  "sign-one-sheet": [
    ["Where was all the food put together?", "On one leather sheet", "It was all heaped on a leather sheet"],
    ["What did he ﷺ do before the people took the food?", "Asked Allah to bless it", "He stood and asked Allah to bless it"],
    ["There was not enough food for everyone.", "False", "They took from it till all had enough"]
  ],
  // He never found fault with any food: if he liked it, he ate it, and if not, he left it (Sahih al-Bukhari 3563).
  "sign-never-faulted": [
    ["Did he ﷺ ever criticize food?", "Never", "He never found fault with any food"],
    ["What did he ﷺ do with food he did not like?", "Left it quietly", "And if not, he left it"],
    ["We can follow this at every meal.", "True", "He never found fault with any food", "And if not, he left it"]
  ],
  // He found a date in the street: if it were not from the charity, I would have eaten it (Sahih Muslim 1071a). (Where
  // he found it stays on its usual picture: the street and the date are there from the scene's start.)
  "sign-date-in-street": [
    ["Why didn't he ﷺ eat it?", "It might be charity", "If it were not from the charity"],
    ["Being careful with doubtful things is from the Sunnah.", "True", "If it were not from the charity", "I would have eaten it"]
  ],
  // Bilal calls the adhan at night, so eat and drink until Ibn Umm Maktum calls the adhan; he would not call until he
  // was told: morning has come (Sahih al-Bukhari 617). (What he was told is asked on the sky.)
  "sign-suhur-two-calls": [
    ["Bilal's call at night meant the fast had started.", "False", "Bilal calls the adhan at night", "So eat and drink"],
    ["Whose adhan told them to stop eating?", "Ibn Umm Maktum's", "Until Ibn Umm Maktum calls the adhan", "Morning has come, morning has come"]
  ],
  // On the morning of Ashura he sent word to the villages of the Ansar; they made their little ones fast, and made them
  // toys of wool, until it was time to break the fast (Sahih al-Bukhari 1960).
  "sign-wool-toys": [
    ["Children can be helped to practise fasting little by little.", "True", "We fasted, and made our little ones fast", "If one cried for food, we gave him the toy"],
    ["What did the Ansar make for their fasting children?", "Toys of wool", "We made them toys of wool", "If one cried for food, we gave him the toy"],
    ["When did the children get to eat?", "At the time of breaking the fast", "Until it was time to break the fast"]
  ],
  // He was the most generous of people, and most generous in Ramadan, when Jibril met him every night and he recited
  // the Quran to him: more generous than the blowing wind (Sahih al-Bukhari 1902).
  "sign-generous-wind": [
    ["When was he ﷺ at his most generous?", "In Ramadan", "And most generous in Ramadan"],
    ["Who met him ﷺ every night of Ramadan?", "Jibril", "Jibril met him every night of Ramadan"],
    ["What did he ﷺ do with Jibril each night?", "Recite the Quran to him", "He recited the Quran to him"]
  ],
  // Shall I fast on a journey? Fast if you wish, or do not (Sahih al-Bukhari 1943); on journeys, one fasting did not
  // blame one not fasting, nor the other way (Sahih al-Bukhari 1947). (Who asked and who narrated stay on their usual
  // picture: the scene's words do not name them; and so does making up the days, which the scene does not show.)
  "sign-fast-on-a-journey": [
    ["What did he ﷺ tell the traveler?", "Fast or not, as you wish", "Fast if you wish, or do not if you wish"],
    ["A traveler may choose to fast or not, and is not blamed.", "True", "Fast if you wish, or do not if you wish", "One fasting did not blame one not fasting"],
    ["On journeys, did they blame each other about fasting?", "No, never", "One fasting did not blame one not fasting", "Nor one not fasting blame one fasting"]
  ],
  // Did he forbid fasting on Friday? Yes (Sahih al-Bukhari 1984); none of you should fast on Friday, unless with a day
  // before it or after it (Sahih al-Bukhari 1985). (Who answered stays on its usual picture: the words do not name him.)
  "sign-friday-alone": [
    ["Which day should not be fasted alone?", "Friday", "Did he forbid fasting on Friday? Yes", "None of you should fast on Friday"],
    ["Which day should not be fasted on its own?", "Friday", "Did he forbid fasting on Friday? Yes", "None of you should fast on Friday"],
    ["The warning is about fasting Friday on its own.", "True", "None of you should fast on Friday", "Unless with a day before it"],
    ["Fasting Thursday and Friday together is fine.", "True", "Unless with a day before it"],
    ["You want to fast on a Friday. What else?", "Fast the day before or after", "Unless with a day before it", "Or a day after it"]
  ],
  // Whoever fasts Ramadan out of faith and hoping for its reward, his past sins are forgiven (Sahih al-Bukhari 38).
  "sign-fast-with-faith": [
    ["How should you fast Ramadan?", "With faith", "Out of faith"],
    ["Which two things must go with the fast?", "Faith and hoping for reward", "Out of faith", "And hoping for its reward"],
    ["Fasting only to look good gets the same promise.", "False", "Out of faith", "His past sins are forgiven"],
    ["Fasting Ramadan with faith and hope brings what?", "Past sins forgiven", "His past sins are forgiven"],
    ["What does Allah forgive for whoever fasts this way?", "Their past sins", "His past sins are forgiven"]
  ],
  // Whoever does not leave false speech and acting on it, Allah has no need of his leaving his food and drink (Sahih
  // al-Bukhari 1903).
  "sign-false-speech": [
    ["Besides food and drink, what should a fasting person give up?", "Lying and bad deeds", "Whoever does not leave false speech", "And acting on it"],
    ["Besides food and drink, what should a fasting person leave?", "Lies and bad deeds", "Whoever does not leave false speech", "And acting on it"],
    ["A real fast keeps the tongue clean too.", "True", "Whoever does not leave false speech", "Allah has no need"],
    ["If you fast, it is fine to tell lies.", "False", "Whoever does not leave false speech", "Allah has no need"],
    ["Whose hunger does Allah have no need of?", "The one who keeps lying and doing wrong", "Whoever does not leave false speech", "That he leave his food and drink"]
  ],
  // We set out with him on a journey on a very hot day, until one put his hand on his head from the heat, and none of us
  // was fasting but him and Ibn Rawahah (Sahih al-Bukhari 1945).
  "sign-fasting-in-heat": [
    ["How hot was it?", "Very hot", "We set out with him on a journey", "On a very hot day"],
    ["Who was fasting on that hot day?", "The Prophet ﷺ and Ibn Rawahah", "One put his hand on his head from the heat", "Except him and Ibn Rawahah"],
    ["A traveler may choose not to fast.", "True", "One put his hand on his head from the heat", "Except him and Ibn Rawahah"]
  ],
  // He forbade al-wisal, out of mercy for them. They said: but you do al-wisal. He said: I am not like you; my Lord
  // feeds me and gives me drink (Sahih al-Bukhari 1964; and 1962).
  "sign-no-wisal": [
    ["What is al-wisal?", "Fasting nonstop with no iftar", "He forbade al-wisal"],
    ["We are told to join fasts with no food between.", "False", "He forbade al-wisal", "Out of mercy for them"],
    ["Why did he ﷺ forbid fasting day and night nonstop?", "Out of mercy to the people", "Out of mercy for them"],
    ["Islam asks us to fast so hard that we harm ourselves.", "False", "He forbade al-wisal", "Out of mercy for them"],
    ["What did he ﷺ say about himself?", "My Lord gives me food and drink", "They said: but you do al-wisal", "My Lord feeds me and gives me drink"],
    ["Why could he ﷺ do it?", "Allah fed him", "He said: I am not like you", "My Lord feeds me and gives me drink"]
  ],
  // You fast all the time and pray all night? Whoever fasts all the time has not fasted; fasting three days a month is
  // like fasting all the time (Sahih al-Bukhari 1979). (Why three count as thirty, and who was told, stay on their usual
  // picture: the scene does not show the tenfold reward, and the words do not name him.)
  "sign-three-days-a-month": [
    ["Three days a month count like fasting how long?", "A whole year", "Fasting three days a month", "Is like fasting all the time"]
  ],
  // None of you should go before Ramadan with a fast of a day or two, unless one used to fast that fast; then let him
  // fast that day (Sahih al-Bukhari 1914).
  "sign-not-before-ramadan": [
    ["What should we not do just before Ramadan?", "Fast a day or two", "With a fast of a day or two"],
    ["Who may still fast that day?", "One with that habit", "Unless one used to fast that fast", "Then let him fast that day"],
    ["Someone who always fasts Mondays may fast that Monday.", "True", "Unless one used to fast that fast", "Then let him fast that day"]
  ],
  // These are two days he forbade fasting: the day you break your fast, and the day you eat from your sacrifices (Sahih
  // al-Bukhari 1990). (Which Eid is which, and the days after it, stay on their usual picture: the scene names neither.)
  "sign-no-fast-on-eid": [
    ["Is it allowed to fast on Eid day?", "No, it is forbidden", "These are two days he forbade fasting"]
  ],
  // He ordered fasting the day of Ashura; when Ramadan was made a duty, whoever wished fasted it, and whoever wished did
  // not (Sahih al-Bukhari 2001); no day he sought to fast more than Ashura, and this month, Ramadan (Sahih al-Bukhari
  // 2006). (Its date in Muharram and who narrated it stay on their usual picture: the scene shows neither.)
  "sign-ashura-and-ramadan": [
    ["Ashura was fasted before Ramadan was a duty.", "True", "He ordered fasting the day of Ashura", "When Ramadan was made a duty"],
    ["After Ramadan was made a duty, Ashura became...?", "Optional", "Whoever wished fasted it", "And whoever wished did not"],
    ["Which day did he ﷺ seek most to fast?", "Ashura", "No day he sought to fast more than Ashura"]
  ],
  // The people doubted if he fasted at Arafah, so Maymunah sent him a cup of milk while he stood there, and he drank
  // from it as the people were looking (Sahih al-Bukhari 1989). (What she sent is asked on its picture card.)
  "sign-milk-at-arafah": [
    ["Why did people wonder?", "If he was fasting", "The people doubted if he fasted at Arafah"],
    ["He ﷺ drank it while people watched.", "True", "He drank from it", "And the people were looking"]
  ],
  // Whenever he saw the rain, he would say: O Allah, let it be a strong rain and a fruitful one (Sahih al-Bukhari 1032).
  // (Who told us of this du'a stays on its usual picture: the scene's words do not name Aishah.)
  "sign-rain-dua": [
    ["What did he say when he saw rain?", "O Allah, a strong fruitful rain", "Let it be a strong rain", "And a fruitful one"],
    ["We can ask Allah to make rain beneficial.", "True", "And a fruitful one"]
  ],
  // Famine is not that no rain comes to you; famine is that rain comes to you, and comes again, and the earth grows
  // nothing (Sahih Muslim 2904). (Who reported it stays on its usual picture: the words do not name Abu Hurairah.)
  "sign-nothing-grows": [
    ["Why would there be famine despite heavy rain, he ﷺ said?", "Nothing would grow", "And the earth grows nothing"],
    ["Famine comes only when no rain falls.", "False", "Famine is not that no rain comes", "And the earth grows nothing"]
  ],
  // One in the wilderness heard a voice in a cloud: water so-and-so's garden. It poured its water on stony ground, and
  // he followed the water to one in his garden: a third I give in charity, a third we eat, and a third I put back into
  // it (Sahih Muslim 2984a). (What watered the garden stays on its usual picture: the cloud is there from the start.)
  "sign-cloud-and-garden": [
    ["How much of the harvest did the garden's owner give in charity?", "One third", "A third I give, a third we eat"],
    ["The garden's owner put a third of the harvest back into his garden.", "True", "And a third I put back into it"]
  ],
  // On a night of cold and wind, Ibn Umar called the adhan, then said: pray in your homes; he used to tell the caller,
  // on nights of cold and rain, to say: pray in your homes (Sahih al-Bukhari 666).
  "sign-pray-in-your-homes": [
    ["On what kind of night did Ibn Umar say: pray in your homes?", "A very cold, stormy night", "On a night of cold and wind", "Then said: pray in your homes"],
    ["Whom did he ﷺ tell to say: pray in your homes?", "The mu'adhdhin", "He used to tell the caller"],
    ["On very cold, rainy nights, people could pray in their homes.", "True", "On nights of cold and rain", "To say: pray in your homes"]
  ],
  // In his lifetime, I built a house with my own hands, to shelter me from the rain and shade me from the sun; none of
  // Allah's creation helped me build it (Sahih al-Bukhari 6302).
  "sign-house-for-rain-and-sun": [
    ["Ibn Umar built this house during the life of the Prophet ﷺ.", "True", "In his lifetime, I built a house"],
    ["Why did Ibn Umar build his house?", "For shelter from rain and sun", "To shelter me from the rain", "And shade me from the sun"],
    ["Who helped Ibn Umar build it?", "Nobody", "None of Allah's creation helped me"]
  ],
  // Soon a man's best wealth will be sheep he follows to the mountain tops and to where the rain falls, fleeing with
  // his faith from trials (Sahih al-Bukhari 3300). (What his best wealth will be stays on its usual picture: the sheep
  // are there from the start.)
  "sign-sheep-on-the-hills": [
    ["He grazes his sheep where the rain falls.", "True", "And to where the rain falls"],
    ["Why will he take his sheep up the mountains?", "To keep his faith safe from trials", "Fleeing with his faith from trials"]
  ],
  // When the wind blew hard he said: O Allah, I ask You for its good, and seek refuge in You from its evil; when clouds
  // gathered his look changed, and when it rained it was lifted from him: perhaps, Aishah, it is as 'Ad said (Sahih
  // Muslim 899b); a people were punished with the wind (Sahih al-Bukhari 4829). (What he called the rain, and his
  // smile, stay on their usual picture: the scene's words say neither.)
  "sign-when-the-wind-blows": [
    ["What did he ask for in a storm, per Muslim 899?", "The good in the wind", "O Allah, I ask You for its good"],
    ["What did he seek refuge from?", "Its evil", "And seek refuge in You from its evil"],
    ["What showed on his face at clouds, per Bukhari 4829?", "Deep concern", "When clouds gathered, his look changed"],
    ["Why was he concerned?", "Some people were punished with wind", "Perhaps, Aishah, it is as 'Ad said"]
  ],
  // Good will remain in the foreheads of horses until the Day of Resurrection (Sahih al-Bukhari 2849). (Which animals
  // have it is asked on picture cards.)
  "sign-good-in-horses": [
    ["Until when will the good stay in them?", "The Day of Resurrection", "Till the Day of Resurrection"],
    ["The good in horses will end very soon.", "False", "Till the Day of Resurrection"]
  ],
  // He held a race of the horses made lean, from al-Hafya' to Thaniyat al-Wada', and of those not made lean, from the
  // Thaniyah to the masjid of Bani Zurayq; and Ibn Umar was among those who raced (Sahih al-Bukhari 2868).
  "sign-horse-race": [
    ["He ﷺ held a race between horses.", "True", "He held a race for the lean horses", "From al-Hafya' to Thaniyat al-Wada'"],
    ["Where did the horses not made lean race to?", "The masjid of Bani Zurayq", "And for the horses not made lean", "From the Thaniyah to Bani Zurayq's masjid"],
    ["Who said he took part in that horse race?", "Abdullah ibn Umar", "Ibn Umar: I was among those who raced"]
  ],
  // He had a she-camel called al-Adba' that could not be outrun; a bedouin came on a young camel of his and outran
  // her, and he said: it is due from Allah that nothing of this world rises but He lowers it (Sahih al-Bukhari 6501).
  "sign-al-adba": [
    ["What was the name of his ﷺ fast camel?", "Al-Adba", "He had a she-camel called al-Adba'", "She could not be outrun"],
    ["Who beat Al-Adba in the race?", "A bedouin on his camel", "A bedouin came on a young camel of his", "And it outran her"],
    ["What lesson did he ﷺ give?", "Nothing worldly stays on top", "It is due from Allah", "Nothing worldly rises but He lowers it"]
  ],
  // When you hear the roosters crow, ask Allah for His favor, for they have seen an angel; and when you hear the
  // donkey bray, seek refuge in Allah from Shaytan, for it has seen a devil (Sahih Muslim 2729).
  "sign-rooster-and-donkey": [
    ["A rooster crows at dawn. What do you do?", "Ask Allah for His favor", "Then ask Allah for His favor"],
    ["The rooster crows when it has seen an angel.", "True", "For it has seen an angel"],
    ["A donkey brays. What do you say?", "A'udhu billahi minash-shaytan", "Seek refuge in Allah from Shaytan"]
  ],
  // None should milk another's animals without his permission: would any of you like his store broken and his food
  // taken away? Their udders store their food (Sahih al-Bukhari 2435).
  "sign-ask-before-milking": [
    ["Milking a neighbor's animal without asking is fine.", "False", "None should milk another's animals", "Without his permission"],
    ["What must you have before milking someone's animal?", "The owner's permission", "Without his permission"],
    ["What did he ﷺ compare an animal's udder to?", "The owner's food store", "Would any of you like his store broken", "Their udders store their food"]
  ],
  // Forty good deeds, the highest lending a she-goat for its milk; whoever does one, hoping for its reward, Allah
  // admits him into Paradise by it; Hassan: we counted the deeds below it and could not reach fifteen (Sahih
  // al-Bukhari 2631). (Which deed is the highest stays on its usual picture: the she-goat is there from the start.)
  "sign-goat-lent-for-milk": [
    ["What does Allah give for one of these deeds, done for His reward?", "Entry into Paradise", "Whoever does one, hoping for its reward", "Allah admits him into Paradise by it"],
    ["The narrators easily counted all forty good deeds.", "False", "Hassan: we counted the deeds below it", "And could not reach fifteen"]
  ],
  // He would make his she-camel sit across in front of him and pray facing it; if the camels moved, he would take the
  // saddle, set it up and pray facing its back part; and Ibn Umar used to do the same (Sahih al-Bukhari 507). (What
  // sat across is asked on picture cards, and what he prayed facing stays on its usual picture: the saddle is there
  // from the start.)
  "sign-camel-as-sutrah": [
    ["Ibn Umar used to do the same as he ﷺ did.", "True", "Ibn Umar used to do the same"]
  ],
  // He made Abdur-Rahman and Sa'd brothers; Sa'd offered to share his wealth in two halves; he said: Allah bless you
  // in your family and your wealth, show me the market; Sa'd said: the market of Qaynuqa'; and he came back with
  // dried yogurt and butter (Sahih al-Bukhari 2049, and 2048 in his own telling).
  "sign-show-me-the-market": [
    ["Abdur-Rahman took half of Sa'd's wealth.", "False", "Allah bless you in your family and wealth"],
    ["What did Abd ar-Rahman ask for instead of Sa'd's wealth?", "The way to the market", "Show me the market"],
    ["What did Abdur-Rahman ask his new brother for?", "The way to the market", "Show me the market"],
    ["Which market did they show him?", "The market of Qaynuqa'", "Sa'd: the market of Qaynuqa'"],
    ["Abd ar-Rahman came back from the market with nothing.", "False", "He came back with dried yogurt and butter"],
    ["What did he bring home from the market?", "Dried yogurt and butter", "He came back with dried yogurt and butter"]
  ],
  // He bought food from a Jewish man, to be paid at a set time, and pledged his iron armour to him (Sahih al-Bukhari
  // 2068). (What he bought stays on its usual picture: the sacks of grain are there from the start.)
  "sign-grain-on-credit": [
    ["Muslims may trade fairly with people of other faiths.", "True", "He bought food from a Jewish man"],
    ["What did he leave as a pledge?", "His iron armour", "And pledged his iron armour to him"]
  ],
  // For one of you to gather firewood, a bundle on his back, is better than to ask anyone, who may give him or refuse
  // him (Sahih al-Bukhari 2074). (That Islam praises earning one's own living is a lesson drawn from it, not a moment
  // of the scene, so it stays on its usual picture.)
  "sign-bundle-of-wood": [
    ["What is better than asking people for money?", "Carrying wood to earn", "For one of you to gather firewood", "Is better than to ask anyone"],
    ["Why is asking people risky?", "They may or may not give", "Who may give him or refuse him"]
  ],
  // May Allah have mercy on one who is easygoing when he sells, when he buys, and when he asks for what he is owed
  // (Sahih al-Bukhari 2076).
  "sign-easygoing-trader": [
    ["Who gets Allah's mercy in this hadith?", "One who is easy in trade", "May Allah have mercy on one who is easy"],
    ["Bargaining harshly and rudely is the Sunnah.", "False", "May Allah have mercy on one who is easy"],
    ["When else should we be easy?", "When asking for a debt back", "And when he asks for what he is owed"]
  ],
  // He forbade selling fruit until it is clearly good; he forbade it to the seller and to the buyer (Sahih al-Bukhari
  // 2194). (Why the rule protects people is not in the scene's words, so it stays on its usual picture.)
  "sign-fruit-when-ripe": [
    ["When may fruit on trees be sold?", "When clearly good", "Until it is clearly good"],
    ["Who was forbidden this early sale?", "Both seller and buyer", "He forbade the seller and the buyer"]
  ],
  // Do not sell gold for gold unless equal for equal, nor silver for silver unless equal; sell gold for silver and
  // silver for gold however you wish (Sahih al-Bukhari 2175). (That these rules guard against riba is not in the
  // scene's words, so it stays on its usual picture.)
  "sign-gold-for-gold": [
    ["How must gold be swapped for gold?", "Equal in weight", "Unless equal for equal"],
    ["Gold for silver may be traded...?", "As you like", "Sell gold for silver, silver for gold", "However you wish"]
  ],
  // The Ansar asked him to divide the palms between them and their brothers; he said: no; then the emigrants did the
  // work of the trees and shared the fruit, and said: we hear and obey (Sahih al-Bukhari 2325).
  "sign-share-the-fruits": [
    ["What did the Ansar first ask the Prophet ﷺ?", "To divide their palms", "Divide the palms with our brothers"],
    ["The emigrants worked the trees and shared the fruit.", "True", "You do the work of the trees", "And we share the fruit with you"],
    ["What did the emigrants answer?", "We listen and obey", "They said: we hear and obey"]
  ],
  // Jabir rode a camel that had grown tired; he struck it and made du'a for it, and it went as it had never gone
  // before. Sell it to me for an uqiyah; Jabir sold it and rode it to his family, and he paid him its price; then: take
  // your camel, it is your wealth (Sahih al-Bukhari 2718).
  "sign-tired-camel": [
    ["What happened to the camel after the dua?", "It became very fast", "It went as it had never gone before"],
    ["The Prophet ﷺ paid for the camel.", "True", "He paid me its price"],
    ["What did the Prophet ﷺ do after paying?", "Gave the camel back as a gift", "Take your camel: it is your wealth"]
  ],
  // We had grown very thirsty; a woman between two water-skins said there was no water, a day and a night away. He
  // wiped the mouths of the water-skins; forty drank their fill, and every water-skin and vessel was filled; she
  // accepted Islam, and so did they (Sahih al-Bukhari 3571). (How many drank stays on its usual picture: the forty
  // places are there from the start.)
  "sign-water-skins": [
    ["The water-skins were nearly bursting full.", "True", "We filled every water-skin and vessel"],
    ["What happened to the woman's people?", "They accepted Islam", "She accepted Islam, and so did they"]
  ],
  // If people knew what I know of being alone, no rider would travel by night alone (Sahih al-Bukhari 2998). (When he
  // warned stays on its usual picture: it is night from the start.)
  "sign-alone-at-night": [
    ["He ﷺ knew of dangers in travelling alone that others did not.", "True", "If people knew what I know of being alone"],
    ["What is safer for a journey at night?", "Going with others", "No rider would travel by night alone"]
  ],
  // Two came to him, intending a journey: when you two set out, give the adhan, then the iqamah, then let the older
  // of you lead you (Sahih al-Bukhari 630).
  "sign-travellers-adhan": [
    ["What should two travellers do at prayer time?", "Give adhan and iqamah", "When you two set out, give the adhan", "Then the iqamah"],
    ["The adhan is only for big masjids.", "False", "When you two set out, give the adhan"],
    ["Who leads them?", "The older one", "Then let the older of you lead you"]
  ],
  // Ka'b ibn Malik used to say: seldom did he set out on a journey on a day other than Thursday (Sahih al-Bukhari
  // 2949).
  "sign-set-out-on-thursday": [
    ["Ka'b ibn Malik is the one who told us of the Thursday journeys.", "True", "Ka'b ibn Malik used to say"],
    ["How often did he ﷺ start a journey on another day?", "Rarely", "Seldom did he set out on a journey"],
    ["On which day did he ﷺ usually set out on a journey?", "Thursday", "On a day other than Thursday"]
  ],
  // Ibn Umar was on a young camel, hard to handle; he said to Umar: sell it to me; so he bought it, and said: it is
  // yours, O Abdullah (Sahih al-Bukhari 2611).
  "sign-camel-is-yours": [
    ["Who sold the camel to him ﷺ?", "Umar", "He said to Umar: sell it to me", "So he bought it"],
    ["What did he ﷺ say to Abdullah after buying it?", "The camel is yours", "It is yours, O Abdullah"],
    ["He ﷺ gave the camel to Abdullah ibn Umar as a gift.", "True", "It is yours, O Abdullah"]
  ],
  // Jubair lost a camel and looked for it on the day of Arafah; he saw him standing at Arafah and said: by Allah, this
  // one is of the Hums, what is he doing here? (Sahih al-Bukhari 1664). (What Jubair looked for stays on its usual
  // picture: his camel is there from the start.)
  "sign-search-at-arafah": [
    ["Jubair saw him ﷺ standing at Arafat on the day of Arafat.", "True", "I saw him standing at Arafah"],
    ["Why was Jubair surprised to see him ﷺ there?", "He was one of the Hums of Quraysh", "By Allah, this one is of the Hums"]
  ],
  // When he came back from a journey and saw the walls of Madinah, he made his mount go faster, out of his love for
  // Madinah (Sahih al-Bukhari 1886).
  "sign-walls-of-madinah": [
    ["What did he ﷺ do on seeing Madinah's walls?", "Made his mount go faster", "He made his mount go faster"],
    ["Why did he ﷺ hurry when he saw Madinah?", "Out of love for Madinah", "Out of his love for Madinah"],
    ["He ﷺ loved the city of Madinah.", "True", "Out of his love for Madinah"]
  ],
  // Faith returns to Madinah as a snake returns to its hole (Sahih al-Bukhari 1876).
  "sign-faith-returns": [
    ["Where does faith return to, he ﷺ said?", "To Madinah", "Faith returns to Madinah"],
    ["He ﷺ said faith would leave Madinah forever.", "False", "Faith returns to Madinah"],
    ["How does faith return to Madinah, he ﷺ said?", "As a snake to its hole", "As a snake returns to its hole"]
  ],
  // No one plots against the people of Madinah but he melts away, as salt melts in water (Sahih al-Bukhari 1877).
  "sign-salt-in-water": [
    ["Plotting against the people of Madinah ends well.", "False", "But he melts away"],
    ["What happens to one who plots against Madinah's people?", "He melts away like salt", "But he melts away", "As salt melts in water"],
    ["What does the plotter melt like, he ﷺ said?", "Salt in water", "As salt melts in water"]
  ],
  // A Bedouin gave him his pledge on Islam; the next day he came with a fever and said: cancel my pledge; he refused
  // three times, and said: Madinah is like a furnace, it drives out its dross and its good shines pure (Sahih
  // al-Bukhari 1883).
  "sign-like-a-furnace": [
    ["What happened to the Bedouin the day after his pledge?", "He came with a fever", "The next day he came with a fever"],
    ["He ﷺ cancelled the Bedouin's pledge at once.", "False", "He refused, three times"],
    ["What is Madinah like, he ﷺ said?", "A furnace", "Madinah is like a furnace"]
  ],
  // Between my house and my pulpit is a garden of the gardens of Paradise, and my pulpit is over my Pool (Sahih
  // al-Bukhari 1196). (What a minbar is stays on its usual picture: the pulpit is there from the start.)
  "sign-between-house-and-pulpit": [
    ["What lies between his ﷺ house and his minbar?", "A garden of Jannah", "Is a garden of the gardens of Paradise"],
    ["His ﷺ minbar is over his Pool, he said.", "True", "And my pulpit is over my Pool"]
  ],
  // A prayer in this masjid of mine is better than a thousand prayers in any other masjid, except al-Masjid al-Haram
  // (Sahih al-Bukhari 1190). (That his masjid is in Madinah stays on its usual picture: it is there from the start.)
  "sign-thousand-prayers": [
    ["A prayer in his ﷺ masjid beats how many elsewhere?", "A thousand", "Is better than a thousand prayers"],
    ["Which masjid is left out of that count?", "Al-Masjid al-Haram", "Except al-Masjid al-Haram"]
  ],
  // He used to come to Masjid Quba every Saturday, walking and riding, and Ibn Umar used to do the same (Sahih
  // al-Bukhari 1193).
  "sign-quba-every-saturday": [
    ["How often did he ﷺ visit Quba, per Ibn Umar?", "Every Saturday", "Every Saturday"],
    ["How did he ﷺ go there?", "Walking or riding", "Sometimes walking, sometimes riding"]
  ],
  // We are the last, yet the first on the Day of Resurrection; this was their day, made a duty for them, and they
  // differed over it, and Allah guided us to it; the people follow us in it: the Jews tomorrow, and the Christians the
  // day after (Sahih al-Bukhari 876). (Who every nation has, and that each is judged with justice, stay on their usual
  // picture: they are from 10:47, which the scene does not tell.)
  "sign-guided-to-friday": [
    ["Muslims came last among the nations.", "True", "We are the last, yet the first"],
    ["When did the Muslims come, in the hadith?", "Last", "We are the last, yet the first"],
    ["Where will Muslims be on the Day of Resurrection, in the hadith?", "Foremost", "We are the last, yet the first", "On the Day of Resurrection"],
    ["When will this Ummah be judged, per the hadith?", "First of all nations", "We are the last, yet the first", "On the Day of Resurrection"],
    ["When will Muslims be foremost?", "On the Day of Resurrection", "On the Day of Resurrection"],
    ["Which day was this Ummah guided to?", "Friday", "And Allah guided us to it"],
    ["To which day did Allah guide us, in the hadith?", "Friday", "And Allah guided us to it"]
  ],
  // Pray some of your prayers in your homes, and do not make them graves (Sahih al-Bukhari 432). (That family can see
  // and learn stays on its usual picture: the hadith does not tell it.)
  "sign-prayers-at-home": [
    ["Where should some prayers be prayed?", "At home", "Pray some of your prayers in your homes"],
    ["Pray some ____ at home, not only at the masjid.", "prayers", "Pray some of your prayers in your homes"],
    ["Pray some prayers at home, not only at the masjid.", "True", "Pray some of your prayers in your homes"],
    ["A home with no prayer is likened to what?", "A grave", "And do not make them graves"]
  ],
  // He used to pray the voluntary prayers while he was riding, facing other than the qiblah (Sahih al-Bukhari 1094).
  "sign-prayer-on-his-mount": [
    ["Which prayers did he ﷺ pray while riding?", "The voluntary prayers", "He used to pray the voluntary prayers"],
    ["Travelling did not stop him ﷺ from extra prayers.", "True", "He used to pray the voluntary prayers", "While he was riding"],
    ["Which way did he face when riding?", "The way he was travelling", "Facing other than the qiblah"]
  ],
  // There was a fright in Madinah; he borrowed a horse from Abu Talhah called al-Mandub and rode it; he came back and
  // said: we saw nothing, and we found the horse like a sea (Sahih al-Bukhari 2627).
  "sign-fast-horse": [
    ["Whose horse did the Prophet ﷺ borrow?", "Abu Talhah's", "He borrowed a horse from Abu Talhah"],
    ["What was the horse's name?", "Al-Mandub", "Called al-Mandub, and rode it"],
    ["What did the Prophet ﷺ find when he rode out?", "Nothing to fear", "He came back and said: we saw nothing"]
  ],
  // A wolf took a sheep from a shepherd, who saved it; the wolf turned and said: who will guard it on the day of the
  // wild beasts, with no shepherd but me? The people said: glory be to Allah! He said: I believe it, and so do Abu Bakr
  // and Umar; and Abu Bakr and Umar were not there (Sahih al-Bukhari 3690).
  "sign-talking-wolf": [
    ["What did the wolf in the story do?", "It spoke to the shepherd", "The wolf turned and said: who guards it"],
    ["Who did the Prophet ﷺ say believed it with him?", "Abu Bakr and Umar", "I believe it, as do Abu Bakr and Umar"],
    ["Abu Bakr and Umar were sitting there when he said it.", "False", "I believe it, as do Abu Bakr and Umar", "And Abu Bakr and Umar were not there"]
  ],
  // In a dream he drew from a well as much as Allah willed; then Ibn Abi Quhafah drew a bucket or two; then it became
  // a huge bucket, and Ibn al-Khattab took it, and none drew like Umar, until the people drank and their camels knelt
  // (Sahih al-Bukhari 3664). (Who Ibn Abi Quhafah is stays on its usual picture: the scene does not tell it.)
  "sign-well-dream": [
    ["The Prophet ﷺ was first to draw water in the dream.", "True", "I drew from it as much as Allah willed"],
    ["How many buckets did Ibn Abi Quhafah draw?", "One or two", "Then Ibn Abi Quhafah drew a bucket or two"],
    ["Who took the bucket after him and drew the most?", "Umar", "And Ibn al-Khattab took it", "I never saw a mighty one draw like Umar"]
  ],
  // I saw in a dream that I was migrating from Makkah to a land of palm trees; I thought it was al-Yamamah or Hajar,
  // but it was Madinah, Yathrib (Sahih al-Bukhari 7035).
  "sign-land-of-palms": [
    ["What kind of land did he ﷺ see himself migrating to?", "A land of date palms", "From Makkah to a land of palm trees"],
    ["He ﷺ first thought the land might be al-Yamamah.", "True", "I thought it was al-Yamamah or Hajar"],
    ["Which city did that land turn out to be?", "Madinah", "But it was Madinah, Yathrib"]
  ],
  // On a journey by night Umar asked him three times, with no answer; Umar moved his camel on ahead, afraid that Quran
  // would be revealed about him; soon someone called him, and he said: tonight a surah was revealed to me, dearer to me
  // than all the sun rises on: We have given you a clear victory (Sahih al-Bukhari 4833). (What Allah sent into the
  // believers' hearts, and which peace was called a clear victory, stay on their usual picture: the scene does not
  // tell them.)
  "sign-dearer-than-the-world": [
    ["How many times did Umar ask before giving up, per Bukhari 4833?", "Three times", "Umar asked three times, with no answer"],
    ["What did Umar fear, per Bukhari 4833?", "That Quran had come down about him", "Afraid Quran would be revealed about me"],
    ["How did the Prophet ﷺ describe Al-Fath, per Bukhari 4833?", "Dearer than all the sun rises on", "Dearer to me than all the sun rises on"],
    ["Ayahs 1-10: what are they about?", "A clear victory", "We have given you a clear victory"]
  ],
  // While he slept he was brought a cup of milk, and drank till he saw its wetness come out of his nails; then he gave
  // what was left to Umar; they asked how he interpreted it, and he said: knowledge (Sahih al-Bukhari 82).
  "sign-milk-of-knowledge": [
    ["In the dream, where did the milk flow out?", "Through his nails", "I drank till I saw it come out of my nails"],
    ["In the dream, what did the Prophet ﷺ give Umar?", "His leftover milk", "While I slept, I was brought a cup of milk", "Then I gave what was left to Umar"],
    ["What did the Prophet ﷺ give Umar in the dream?", "His leftover milk", "While I slept, I was brought a cup of milk", "Then I gave what was left to Umar"],
    ["Umar's knowledge came from the Prophet ﷺ.", "True", "Then I gave what was left to Umar", "He said: knowledge"],
    ["What did the milk in the dream mean?", "Knowledge", "He said: knowledge"],
    ["What did the Prophet ﷺ say the milk meant?", "Knowledge", "He said: knowledge"]
  ],
  // A tribe would not host the travellers; its chief was stung and nothing helped him; one of them would not recite
  // till they set a reward, and they agreed on a flock of sheep; he blew over him and recited Al-Fatihah, and the chief
  // walked as if freed from a tether; he said: how did you know it is a ruqyah? You did right; give me a share with you
  // (Sahih al-Bukhari 2276). (What stung the chief stays on its usual picture: the scene does not tell it.)
  "sign-fatihah-cure": [
    ["Which surah did the companion recite?", "Al-Fatihah", "He blew over him and recited Al-Fatihah"],
    ["What did the companion recite over him?", "Al-Fatihah", "He blew over him and recited Al-Fatihah"],
    ["What happened to the chief?", "He got up healed", "As if freed from a tether, he walked"],
    ["What did the Prophet ﷺ ask the companion?", "How did you know it is a ruqyah?", "How did you know it is a ruqyah?"],
    ["The Prophet ﷺ said they did right.", "True", "You did right; give me a share with you"]
  ],
  // Coming back from Hunayn, the people clung to him, asking him, till they pressed him to a thorny tree, and it
  // snatched his cloak; he stopped and said: give me my cloak; had I camels as many as these thorny trees, I would share
  // them out among you, and you would find me no miser, liar or coward (Sahih al-Bukhari 2821). (What he likened the
  // camels to stays on its usual picture: the thorny trees are there from the scene's start.)
  "sign-cloak-on-the-thorns": [
    ["When he ﷺ stopped, what did he ask the people to give him?", "His cloak", "And it snatched his cloak away", "He stopped and said: give me my cloak"],
    ["He ﷺ said they would never find him a miser, a liar or a coward.", "True", "You'd find me no miser, liar or coward"]
  ],
  // He took a ring of gold, and the people took gold rings too; he said: I took a ring of gold, and threw it away: I
  // will never wear it; and the people threw their rings away (Sahih al-Bukhari 7298).
  "sign-rings-thrown-away": [
    ["What did the people do when he ﷺ wore a gold ring?", "They wore gold rings too", "And the people took gold rings too"],
    ["The Companions followed what he ﷺ did, even in small things.", "True", "And the people took gold rings too", "And the people threw their rings away"],
    ["What did the people do when he ﷺ threw his ring away?", "Threw their rings away too", "And the people threw their rings away"]
  ],
  // A tailor invited him to food he made, and Anas went with him: barley bread, and broth with gourd in it; Anas saw
  // him pick the gourd around the dish, and loved gourd ever since that day (Sahih al-Bukhari 5436). (Who invited him
  // stays on its usual picture: the tailor's home is there from the scene's start.)
  "sign-tailors-gourd": [
    ["What did the Prophet ﷺ look for, in the hadith?", "Pieces of gourd", "I saw him pick the gourd around the dish"],
    ["Anas loved gourd because the Prophet ﷺ liked it.", "True", "I saw him pick the gourd around the dish", "I have loved gourd ever since that day"],
    ["Anas loved gourd after seeing this.", "True", "I saw him pick the gourd around the dish", "I have loved gourd ever since that day"]
  ],
  // The sun eclipsed the day Ibrahim died, and the people said it was for his death; he said: the sun and moon do not
  // eclipse for anyone's death or for anyone's life; when you see it, pray and call on Allah (Sahih al-Bukhari 1043).
  "sign-the-eclipse": [
    ["What did people wrongly think?", "The eclipse was for Ibrahim", "The sun eclipsed the day Ibrahim died", "The people said: it was for his death"],
    ["The Prophet ﷺ let a wrong belief spread to honor his son.", "False", "The sun and moon do not eclipse", "For anyone's death or for anyone's life"],
    ["What should we do at an eclipse?", "Pray and call on Allah", "When you see it, pray and call on Allah"]
  ],
  // I know the voices of the Ash'aris with the Quran when they come in at night, and I know where they stay by their
  // voices with the Quran at night, though I had not seen where they stayed when they stopped there by day (Sahih
  // al-Bukhari 4232). (Who the Ash'aris were stays on its usual picture: the scene does not tell it.)
  "sign-ashari-recitation": [
    ["How did the Prophet ﷺ recognize the Ash'aris' houses?", "By their Quran at night", "I know the voices of the Ash'aris", "With the Quran at night"],
    ["What does this teach about a home?", "Fill it with the Quran", "I know the voices of the Ash'aris", "With the Quran at night"]
  ],
  // He prayed Asr, then hurried into the house and soon came out again; he said: I had left gold of charity in the
  // house, and I disliked to keep it overnight, so I shared it out (Sahih al-Bukhari 1430). (Giving zakat to please
  // Allah alone stays on its usual picture: the scene does not tell it.)
  "sign-gold-not-kept-overnight": [
    ["Once zakat is due, pay it ____.", "soon", "He prayed Asr with us, then hurried", "So I shared it out"]
  ],
  // A man came into the masjid on a camel, made it kneel there and tied it; he said: I will be hard in asking, so do not
  // be angry; he said: ask whatever you want; did Allah send you to all the people? He said: by Allah, yes; did Allah
  // order that we pray five prayers? Yes; and the man said: I believe in what you have brought (Sahih al-Bukhari 63).
  "sign-dimam-questions": [
    ["What did Dimam ask before his questions?", "Not to be angry with him", "I will be hard in asking: do not be angry"],
    ["What did the Prophet ﷺ answer him?", "Ask whatever you want", "Ask whatever you want"],
    ["A person may ask even hard questions about Islam.", "True", "I will be hard in asking: do not be angry", "Ask whatever you want"]
  ],
  // He took a camel of a certain age; its owner came asking for it back, and he said: one who has a right has a say;
  // then he gave him back better than its age, and said: the best of you are the best in repaying (Sahih al-Bukhari
  // 2609).
  "sign-repaid-better": [
    ["What did he ﷺ give the man back?", "An older camel than his", "He gave him back better than its age"],
    ["Who is the best of people, he ﷺ said, when it comes to debts?", "Whoever repays in the best way", "He gave him back better than its age", "The best of you are the best in repaying"],
    ["He ﷺ said the owner had a right to ask for his camel.", "True", "One who has a right has a say"]
  ],
  // Whoever spends a pair in Allah's cause is called from the gates of Paradise: the people of prayer from the gate of
  // prayer, of jihad from the gate of jihad, of charity from the gate of charity, of fasting from the gate of fasting,
  // ar-Rayyan; Abu Bakr asked: is anyone called from all of them? He said: yes, and I hope you are one of them (Sahih
  // al-Bukhari 3666). (Who reported it stays on its usual picture: the scene does not tell it.)
  "sign-every-gate": [
    ["What is the gate of Jannah for people who fast called?", "Ar-Rayyan", "Of fasting: the gate of fasting, ar-Rayyan"],
    ["Abu Bakr asked if anyone is called from every gate. What was the answer?", "Yes, and I hope you are", "Yes, and I hope you are one of them"],
    ["Who is called from the gate of prayer?", "Those known for prayer", "The people of prayer: the gate of prayer"],
    ["Which gate is for those who fast?", "Ar-Rayyan", "Of fasting: the gate of fasting, ar-Rayyan"],
    ["What did Abu Bakr ask?", "Is anyone called from all gates?", "Is anyone called from all of them?"],
    ["What did Muhammad ﷺ reply?", "Yes, and I hope you are one", "Yes, and I hope you are one of them"]
  ],
  // When the Ash'aris run short on campaign, or food runs low for their families in Madinah, they gather what they have
  // in one cloth, then share it equally in one vessel: they are of me, and I am of them (Sahih Muslim 2500).
  "sign-sharing-ashari": [
    ["What did the Ash'aris do when food ran low?", "Pooled and shared equally", "They gather what they have in one cloth", "Then share it equally in one vessel"],
    ["What did he ﷺ say about them?", "They are from me", "They are of me, and I am of them"],
    ["Sharing food fairly in hard times is loved by the Prophet ﷺ.", "True", "They gather what they have in one cloth", "They are of me, and I am of them"]
  ],
  // At the drinking place he asked for a drink; al-Abbas said: Fadl, bring him a drink from your mother; he said: give
  // me a drink, though they put their hands in it, and he drank from it; then he came to Zamzam, where they gave water,
  // and said: work on, for you are doing a good deed (Sahih al-Bukhari 1635).
  "sign-zamzam-drink": [
    ["Which water did he ﷺ choose to drink?", "The same water as the people", "Give me a drink; and he drank from it"],
    ["What did he ﷺ tell those drawing Zamzam water?", "Carry on, you are doing a good deed", "Work on, for you are doing a good deed"],
    ["Giving water to pilgrims is a good deed.", "True", "He came to Zamzam, where they gave water", "Work on, for you are doing a good deed"]
  ],
  // Two gardens of silver, their vessels and all that is in them, and two gardens of gold, their vessels and all that is
  // in them (Sahih al-Bukhari 4878). (Who narrated it, and the levels of Paradise, are not in the scene.)
  "sign-silver-and-gold-gardens": [
    ["What are two gardens made of, per Bukhari 4878?", "Silver, and two of gold", "Two gardens of silver", "And two gardens of gold"]
  ],
  // He was wakeful one night as he came to Madinah, and wished that a good man of his companions would guard him; they
  // heard the clatter of weapons, it was Sa'd ibn Abi Waqqas come to guard him, and he slept (Sahih al-Bukhari 2885).
  "sign-guard-tonight": [
    ["What did he ﷺ wish for that night?", "A righteous man to guard him", "Would that a good man of my companions", "Would guard me tonight"],
    ["What did they hear in the night?", "The clatter of weapons", "Then we heard the clatter of weapons"],
    ["After Sa'd came to guard him, the Prophet ﷺ slept.", "True", "And he slept"]
  ],
  // Abu Isra'il vowed to stand and never sit, never come into the shade, never speak, and to fast; he was told to speak,
  // come into the shade and sit, and complete his fast (Sahih al-Bukhari 6704). (What he vowed stays on its usual
  // picture: he stands in the sun from the scene's start.)
  "sign-vow-in-the-sun": [
    ["Which part of his vow did he ﷺ let him keep?", "His fast", "And to fast", "And sit, and let him complete his fast"],
    ["Standing in the sun with no shade is worship Allah asks for.", "False", "Abu Isra'il: he vowed to stand, never sit", "Tell him to speak, come into the shade"]
  ],
  // Abu Shu'aib invited him as one of five, and a man followed them; he said: you invited me as one of five, and this
  // man has followed us; if you wish, let him in, and if you wish, leave him; he said: rather, I let him in (Sahih
  // al-Bukhari 5434). (How many were invited stays on its usual picture: the five are there from the scene's start.)
  "sign-one-who-followed": [
    ["What did he ﷺ do when another man followed them?", "He asked the host", "You invited me as one of five", "And if you wish, leave him"],
    ["The host said yes, and the extra man came in.", "True", "Rather, I let him in"]
  ],
  // Ibn Abbas set out water for his wudu; he asked who put it, was told, and said: O Allah, give him understanding of
  // the religion (Sahih al-Bukhari 143). (What Ibn Abbas set out stays on its usual picture: the jug is there from the
  // scene's start.)
  "sign-water-for-wudu": [
    ["What did the Prophet ﷺ ask Allah to give him?", "Understanding of the religion", "O Allah, give him understanding", "Of the religion"],
    ["A small kindness earned Ibn Abbas a great dua.", "True", "O Allah, give him understanding", "Of the religion"]
  ],
  // He went round the House on a camel, and each time he came to the Corner he pointed to it with something he had, and
  // said: Allahu akbar (Sahih al-Bukhari 1613). (That he rode a camel stays on its usual picture: the camel is there
  // from the scene's start.)
  "sign-tawaf-on-camel": [
    ["What did he ﷺ say each time he reached the Corner?", "Allahu akbar", "And said: Allahu akbar"],
    ["He ﷺ pointed to the Black Stone each time he passed it.", "True", "He pointed to it with something he had"]
  ],
  // At night he gave salam in a way that did not wake one asleep and let one awake hear it; then he went to the masjid
  // and prayed, and came to his drink (Sahih Muslim 2055a). (Who told it is not in the scene.)
  "sign-soft-salam": [
    ["Who would hear his ﷺ salam at night?", "Those who were awake", "Not waking one who was asleep", "And letting one awake hear it"],
    ["He ﷺ said salam at night in a way that would not wake the sleeping.", "True", "Not waking one who was asleep"]
  ],
  // Three hundred riders under Abu Ubaidah stayed at the shore half a month, so hungry that they ate the leaves, the
  // khabat, and the army was called the army of the khabat; then the sea threw out a fish called al-Anbar, they ate of
  // it half a month, and Abu Ubaidah set up one of its ribs, and a man and a camel passed under it (Sahih al-Bukhari
  // 4361).
  "sign-army-of-leaves": [
    ["How many riders did Abu Ubaydah lead?", "300", "Three hundred riders, under Abu Ubaidah"],
    ["Why was it called the army of leaves?", "They were so hungry they ate leaves", "So hungry, we ate the leaves, the khabat", "So it was called the army of the khabat"],
    ["How did Allah feed them at last?", "The sea threw out a huge fish", "Then the sea threw out a fish, al-Anbar", "We ate of it for half a month"],
    ["The leader of the army was Abu Bakr.", "False", "Three hundred riders, under Abu Ubaidah"]
  ],
  // A Bedouin asked him about the hijrah; he said: mercy on you, its matter is hard; have you camels, and do you give
  // their zakat? He said: yes; and he said: then work from beyond the seas, for Allah will not waste anything of your
  // deeds (Sahih al-Bukhari 1452).
  "sign-beyond-the-seas": [
    ["What did the Bedouin ask about?", "Hijrah, moving to Madinah", "A Bedouin asked him about the hijrah", "Mercy on you! Its matter is hard"],
    ["What did he ﷺ ask the Bedouin about his camels?", "If he paid their zakat", "Have you camels? Do you give their zakat?"],
    ["He ﷺ told the Bedouin his good deeds would not be wasted.", "True", "Allah will not waste any of your deeds"]
  ],
  // Ka'b asked Ibn Abi Hadrad in the masjid for a debt he owed him, and their voices rose till he heard them in his
  // house; he lifted the curtain of his room and called: O Ka'b; he said: at your service; he pointed to him to drop
  // half of the debt; Ka'b said: I have done so; and he said to the other: get up and pay him (Sahih al-Bukhari 2710).
  // (Where they argued stays on its usual picture: the masjid is there from the scene's start.)
  "sign-half-the-debt": [
    ["What did he ﷺ ask Ka'b to do with the debt?", "Drop half of it", "He pointed: drop half of the debt"],
    ["He ﷺ told the other man to pay the rest straight away.", "True", "Get up and pay him"]
  ],
  // The folk of Quba fought one another till they threw stones at each other; he was told of it, and said: let us go, to
  // make peace between them (Sahih al-Bukhari 2693).
  "sign-quba-peace": [
    ["What did the people of Quba do to each other?", "They threw stones at each other", "The folk of Quba fought one another", "Till they threw stones at each other"],
    ["What did he ﷺ say when he was told about the fight?", "Let us go and make peace", "And he said: let us go", "To make peace between them"],
    ["Making peace between Muslims who fight is a good deed.", "True", "And he said: let us go", "To make peace between them"]
  ],
  // Fatimah complained of what the hand mill did to her; she went to him and did not find him; he came to them when they
  // had gone to bed, and said: shall I teach you better than what you asked? When you go to bed, say Allahu akbar
  // thirty-four times, subhanallah thirty-three times and alhamdulillah thirty-three times, for that is better for you
  // both than a servant (Sahih al-Bukhari 3705).
  "sign-better-than-a-servant": [
    ["What had Fatimah asked for?", "A servant", "Better for you both than a servant"],
    ["How many times is Allahu Akbar said?", "34", "In bed: Allahu akbar, thirty-four times"],
    ["When is this dhikr said?", "When going to bed", "He came to us when we had gone to bed", "In bed: Allahu akbar, thirty-four times"],
    ["The Prophet ﷺ said the dhikr was better than a servant.", "True", "Shall I teach you better than you asked?", "Better for you both than a servant"]
  ],
  // They tied Thumamah to a pillar of the masjid; he asked him: what do you have, Thumamah? and so the next day and the
  // day after; then he said: set Thumamah free; Thumamah washed at palms near the masjid, came in and said: I testify
  // that there is no god but Allah, and said that no face had been more hated to him than his, and now it was the
  // dearest face of all to him (Sahih al-Bukhari 4372).
  "sign-thumamah-freed": [
    ["What did the Prophet ﷺ say on the third day?", "Set Thumamah free", "Then he said: set Thumamah free"],
    ["How did Thumamah feel about the Prophet ﷺ after Islam?", "He loved him most of all", "Your face is now the dearest face to me"],
    ["Kindness can open a person's heart to Islam.", "True", "Then he said: set Thumamah free", "He came in: I testify, no god but Allah"]
  ],
  // My likeness and the prophets' before me is a man who built a house, fine and fair, but for one brick's place in a
  // corner; the folk went round it and wondered at it, and said: if only this brick were set! So I am that brick, and I
  // am the last of the prophets (Sahih al-Bukhari 3535).
  "sign-the-last-brick": [
    ["What did the house lack, in the hadith?", "One brick", "Is a man who built a house, fine and fair", "But for one brick's place in a corner"],
    ["Who is that brick, in the hadith?", "The Prophet ﷺ", "So I am that brick"],
    ["What is Muhammad ﷺ, in 33:40?", "The last of the Prophets", "And I am the last of the prophets"]
  ],
  // He was named al-Khidr because he sat on a white, barren land, and lo, it stirred green behind him (Sahih al-Bukhari
  // 3402). (What kind of land he sat on stays on its usual picture: the white land is there from the scene's start.)
  "sign-green-land": [
    ["What happened where he sat, in the hadith?", "The land turned green", "He was named al-Khidr", "And lo, it stirred green behind him"],
    ["Khadra in Arabic means green.", "True", "He was named al-Khidr", "And lo, it stirred green behind him"]
  ],
  // Mulaykah invited him to food she made; he ate of it, then said: get up, and let me lead you in prayer. Anas went to
  // their mat, dark from long use, and sprinkled it with water; Anas and the orphan lined up behind him, and the old
  // lady behind them, and he prayed two rak'ahs with them, then left (Sahih al-Bukhari 380).
  "sign-mat-for-prayer": [
    ["What did Anas do for him ﷺ to pray on?", "He washed an old mat", "I went to our mat, dark from long use", "And sprinkled it with water"],
    ["Who lined up with Anas behind him ﷺ?", "An orphan boy", "The orphan and I lined up behind him"],
    ["The old lady stood behind the two boys.", "True", "And the old lady behind us"]
  ],
  // He returned from Tabuk and neared Madinah, and said: in Madinah are folk; you went no way and crossed no valley but
  // they were with you. They said: and they are in Madinah? He said: and they are in Madinah; an excuse held them back
  // (Sahih al-Bukhari 4423).
  "sign-held-back": [
    ["When did the Prophet ﷺ say this, per Anas?", "Returning from Tabuk", "He returned from Tabuk and neared Madinah"],
    ["A sincere intention can earn reward without the deed.", "True", "But they were with you"],
    ["Why were some in Madinah counted as with them?", "A real excuse stopped them", "An excuse held them back"]
  ],
  // If the Ansar took a valley or a pass, I would take the valley of the Ansar; and but for the hijrah, I would be one
  // of the Ansar. Abu Hurairah said: he was not unjust; they sheltered him and helped him (Sahih al-Bukhari 3779).
  "sign-valley-of-the-ansar": [
    ["Whose valley would the Prophet ﷺ take?", "The Ansar's valley", "If the Ansar took a valley or a pass", "I would take the valley of the Ansar"],
    ["Why was the Prophet ﷺ not counted among the Ansar?", "Because he made the hijrah", "And but for the hijrah", "I would be one of the Ansar"],
    ["Abu Hurayrah said the Ansar sheltered and helped him.", "True", "They sheltered him and helped him"]
  ],
  // He shared out cloaks and gave Makhramah none of them; Makhramah said to his son: let us go to him, and at his door:
  // go in and call him for me; he came out to him wearing one of them, and said: we kept this for you; Makhramah looked
  // at it and said: Makhramah is pleased (Sahih al-Bukhari 2599).
  "sign-kept-for-you": [
    ["He ﷺ remembered Makhramah and kept a cloak for him.", "True", "He came out to him, wearing one of them", "He said: we kept this for you"],
    ["What did he ﷺ say when he came out to Makhramah?", "We kept this for you", "He said: we kept this for you"],
    ["How did Makhramah feel about the cloak?", "He was pleased", "Makhramah looked at it, and was pleased"]
  ],
  // Abu Hurairah said: on my way to him I said: O night, how long and tiring! Yet from the land of kufr it saved us. A
  // slave of mine ran away on the way. When I came to him I gave my pledge, and as I was with him the slave appeared; he
  // said: O Abu Hurairah, here is your slave; I said: he is free, for the sake of Allah (Sahih al-Bukhari 2531).
  "sign-long-night": [
    ["What did Abu Hurairah call the night of his journey?", "Long and tiring", "O night, how long and tiring!"],
    ["Abu Hurairah's slave ran away from him on the way.", "True", "A slave of mine ran away on the way"],
    ["What did Abu Hurairah do when his slave came back?", "He freed him for Allah", "I said: he is free, for the sake of Allah"]
  ],
  // As he sat in the masjid, three came; two came to him, and one went away. One saw a gap in the circle and sat in it,
  // the other sat behind them, and the third turned his back and went. He said: one of them went to Allah, and Allah
  // took him in; the second was shy, so Allah sheltered him; and the third turned away, so Allah turned away from him
  // (Sahih al-Bukhari 66).
  "sign-three-came": [
    ["What did the second man do?", "Sat shyly at the back", "The other sat behind them"],
    ["What did Allah do for the man who found a place in the circle?", "Took him into His mercy", "He said: one went to Allah; He took him in"],
    ["Turning away from a lesson about Allah is a good choice.", "False", "The third turned away; Allah turned away"]
  ],
  // Sahl said: a woman among us sowed silq by the streams of her farm; on Friday she pulled up the silq's roots and put
  // them in a pot, with a handful of barley she had ground. Leaving Jumu'ah, we would greet her, and she set that food
  // before us, and we longed for Friday for that food of hers (Sahih al-Bukhari 938).
  "sign-friday-silq": [
    ["What did the woman cook on Fridays?", "Silq roots with barley", "There was a woman among us", "With a handful of barley she had ground"],
    ["When did she feed them?", "After Jumu'ah", "On Friday she pulled up the silq's roots", "And she set that food before us"],
    ["Small kindness can make people love a day.", "True", "We longed for Friday for that food of hers"]
  ],
  // Ma'n said: my father Yazid took out dinars for charity and left them with a man in the masjid; I came, took them,
  // and brought them to him. He said: by Allah, I meant not you. So I took the case to him, and he said: yours is what
  // you meant, Yazid, and yours is what you took, Ma'n (Sahih al-Bukhari 1422).
  "sign-what-you-meant": [
    ["Who ended up with Yazid's charity?", "His own son, Ma'n", "My father Yazid took dinars for charity", "I came, took them, and brought them to him"],
    ["What did he ﷺ tell Yazid?", "You get the reward you intended", "He said: yours is what you meant, Yazid"],
    ["Ma'n had to give the coins back.", "False", "And yours is what you took, Ma'n"]
  ],
  // He prayed in a cloth with marks on it, and said: its marks drew my mind away; take it to Abu Jahm, and bring me a
  // plain one (Sahih al-Bukhari 752). (What distracted him stays on its usual picture: the cloth with marks is there
  // from the scene's start.)
  "sign-marked-cloth": [
    ["Pray where little distracts you.", "True", "He said: its marks drew my mind away", "And bring me a plain one"],
    ["What did he ﷺ ask for instead?", "A plain cloth", "And bring me a plain one"]
  ],
  // Asma said: I used to carry the date stones from the land he gave az-Zubair, on my head, two thirds of a farsakh away
  // (Sahih al-Bukhari 3151). (What Asma carried stays on its usual picture, since the date stones are there from the
  // scene's start, and so does who her husband was, which the scene does not tell.)
  "sign-date-stones": [
    ["Asma worked hard for her family.", "True", "I used to carry the date stones", "On my head, two thirds of a farsakh away"]
  ],
  // Dimad, who gave ruqyah, came to Makkah and met him; he said: praise be to Allah, we praise Him; I bear witness that
  // there is no god but Allah. He said them three times, and Dimad said: I have heard soothsayers, magicians and poets,
  // but never words like these of yours; they reach the depths of the sea. Give me your hand: I pledge to you on Islam
  // (Sahih Muslim 868).
  "sign-like-no-other": [
    ["How many times did he ﷺ say the words to Dimad?", "Three times", "He said them thrice, and Dimad said:"],
    ["Whose words did Dimad say he had heard before?", "Soothsayers, magicians and poets", "I heard soothsayers, magicians and poets"],
    ["Dimad became Muslim after hearing these words.", "True", "Give your hand: I pledge to you on Islam"]
  ],
  // Jabir said: when we went up, we said: Allahu akbar, and when we went down, we said: subhan Allah (Sahih al-Bukhari
  // 2993).
  "sign-up-and-down": [
    ["What did the Sahabah say going up a hill?", "Allahu akbar", "When we went up, we said: Allahu akbar"],
    ["We can remember Allah even while we travel.", "True", "When we went up, we said: Allahu akbar", "When we went down, we said: subhan Allah"],
    ["What did they say going down?", "Subhanallah", "When we went down, we said: subhan Allah"]
  ],
  // Tariq passed by some folk praying and asked: what is this masjid? They said: here is the tree of the pledge. Sa'id
  // said: my father was one who pledged, and he said: the next year we forgot it, and we could not recognize it. Sa'id
  // said: they did not know it, yet you know it, so you know better (Sahih al-Bukhari 4163).
  "sign-forgotten-tree": [
    ["Whose father was at the pledge, per Bukhari 4163?", "Sa'id ibn al-Musayyib", "Sa'id said: my father was one who pledged"],
    ["What happened the next year, per Bukhari 4163?", "They forgot the tree", "My father said: next year, we forgot it", "and we could not recognize it"],
    ["Even the Companions could not find the tree later.", "True", "My father said: next year, we forgot it", "Sa'id said: they did not know it"]
  ],
  // We were in a cave at Mina when Al-Mursalat was revealed to him; he was reciting it, and I took it from him. Suddenly
  // a snake sprang at us, and he said: kill it. We rushed at it, and it got away. He said: it escaped your evil, as you
  // escaped its evil (Sahih al-Bukhari 1830). (Where he was when Al-Mursalat came stays on its usual picture, since the
  // cave is there from the scene's start.)
  "sign-cave-at-mina": [
    ["Ibn Masud learned Al-Mursalat years after it came down.", "False", "when Al-Mursalat was revealed to him", "He was reciting it, and I took it from him"],
    ["How did Ibn Masud learn the surah?", "Straight from his mouth", "He was reciting it, and I took it from him"]
  ],
  // He had a ring of silver made, and it was worn on his hand; afterwards it was worn by Abu Bakr, then by Umar, and
  // then by Uthman, till it fell in the well of Aris (Sahih al-Bukhari 5873). (What his ring was made of keeps its own
  // picture cards.)
  "sign-well-of-aris": [
    ["Who wore it after Abu Bakr?", "Umar", "then by Umar, and then by Uthman"],
    ["Where was the ring lost?", "In the well of Aris", "till it fell in the well of Aris"]
  ],
  // He said: if I had gold like Uhud, I would not like three nights to pass and any of it still be with me, except
  // something I keep for a debt (Sahih al-Bukhari 6445).
  "sign-gold-not-kept": [
    ["How much gold did he ﷺ imagine having?", "As much as Mount Uhud", "He said: if I had gold like Uhud"],
    ["How long would he ﷺ keep it?", "No more than three nights", "I would not like three nights to pass", "and any of it still be with me"],
    ["What would he ﷺ keep back?", "Enough to repay debts", "except something I keep for a debt"]
  ],
  // A sheep was sent to Nusaybah as charity, and she sent some of it to Aishah. He asked: do you have anything? Aishah
  // said: none but what Nusaybah sent. He said: bring it, for it has reached its place (Sahih al-Bukhari 1446).
  "sign-reached-its-place": [
    ["What was sent to Nusaybah as charity?", "A sheep", "A sheep was sent to Nusaybah, as charity"],
    ["Aishah had plenty of other food that day.", "False", "Aishah said: none but what Nusaybah sent"],
    ["What did he ﷺ say about the meat?", "Bring it, it has reached its place", "He said: bring it", "for it has reached its place"]
  ],
  // Whoever keeps a horse in Allah's cause, out of faith in Allah and belief in His promise, what it has eaten and drunk
  // is in his scale on the Day of Resurrection (Sahih al-Bukhari 2853).
  "sign-horse-kept": [
    ["Why does the owner keep the horse?", "To serve Allah's cause", "Whoever keeps a horse in Allah's cause", "and belief in His promise"],
    ["What will the owner be rewarded for?", "What the horse eats and drinks", "what it has eaten and drunk", "is in his scale on the Day of Resurrection"],
    ["Looking after a horse kept for Allah brings reward.", "True", "what it has eaten and drunk", "is in his scale on the Day of Resurrection"]
  ],
  // He asked Jabir: have you got carpets? Jabir said: where would we get carpets? He said: you shall soon have carpets.
  // Jabir would say to his wife: take your carpets out of my sight, and she would say: did he not tell you that you
  // would soon have carpets? So he would let them be (Sahih al-Bukhari 3631).
  "sign-carpets-will-come": [
    ["What did he ﷺ tell Jabir they would soon have?", "Carpets", "He asked: have you got carpets?", "He said: you shall soon have carpets"],
    ["What did Jabir's wife remind him of?", "His ﷺ words about carpets", "She would say: did he not tell you", "that you would soon have carpets?"],
    ["Jabir stopped asking his wife to remove the carpets.", "True", "So I would let them be"]
  ],
  // He said to Aishah: when your people built the Ka'bah, they fell short of Ibrahim's foundations. She said: will you
  // not return it to them? He said: were your people not so newly out of disbelief, I would have done it. Ibn Umar said:
  // he did not touch the two corners that face the Hijr, as the House was not completed on Ibrahim's foundations (Sahih
  // al-Bukhari 1583).
  "sign-kaaba-as-it-was": [
    ["Whose foundations did the Ka'bah not fully stand on?", "Ibrahim's", "they fell short of Ibrahim's foundations"],
    ["Why did he ﷺ not rebuild the Ka'bah?", "His people were new to Islam", "He said: were your people not so newly", "out of disbelief, I would have done it"],
    ["Being gentle with people new to Islam is part of his ﷺ way.", "True", "He said: were your people not so newly", "out of disbelief, I would have done it"]
  ],
  // Anas said: we used to pray with him in the scorching heat, and if one of us could not put his face on the earth, he
  // would spread out his garment and prostrate on it (Sahih al-Bukhari 1208).
  "sign-cloth-in-the-heat": [
    ["Why could some not put their face on the earth?", "Because of the heat", "We used to pray in the scorching heat", "his face on the earth"],
    ["Anas prayed with him ﷺ even in scorching heat.", "True", "We used to pray in the scorching heat"],
    ["What did some spread on the hot earth to prostrate on?", "Their clothes", "that one would spread out his garment", "and prostrate on it"]
  ],
  // Jabir said: Abu Humayd brought a cup of milk from al-Naqi', and he said to him: will you not cover it, even by
  // laying a stick across it? (Sahih al-Bukhari 5605).
  "sign-covered-cup": [
    ["What did he ﷺ tell Abu Humayd about the milk?", "Cover it", "He said to him: will you not cover it,", "even by laying a stick across it?"],
    ["With what, at the very least?", "A stick across it", "even by laying a stick across it?"],
    ["Covering food and drink is a sunnah.", "True", "He said to him: will you not cover it,", "even by laying a stick across it?"]
  ],
  // Aishah said: a lady came with her two daughters, asking, and I found nothing but one date, so I gave it to her. She
  // divided it between her two daughters and did not eat of it, then went out. He came in, and I told him, and he said:
  // whoever is tried with daughters, they will be a shield for him from the Fire (Sahih al-Bukhari 1418). (Who saw the
  // mother and told him stays on its usual picture, since the scene does not name her.)
  "sign-one-date-shared": [
    ["What did the poor mother do with one date?", "Split it between her daughters", "I gave it to her, and she divided it", "between her two daughters"],
    ["What will daughters raised with kindness be for their parent?", "A shield from the Fire", "He said: whoever is tried with daughters", "they will be a shield for him"]
  ],
  // Abu Burdah said: when I came to Madinah, Abdullah ibn Salam met me and said: come home, I will give you a drink from
  // a bowl he drank from, and you will pray in a masjid he prayed in. So I went; he gave me sawiq, fed me dates, and I
  // prayed in that masjid (Sahih al-Bukhari 7342).
  "sign-blessed-bowl": [
    ["What did he serve his guest?", "Sawiq and dates", "So I went; Ibn Salam gave me sawiq", "and fed me dates"],
    ["What was special about the bowl?", "The Prophet ﷺ drank from it", "from a bowl he drank from"],
    ["Abdullah ibn Salam was a kind host.", "True", "So I went; Ibn Salam gave me sawiq", "and fed me dates"]
  ],
  // Al-Ma'rur met Abu Dharr at ar-Rabadhah, a cloak on him and one on his slave, and asked about it. Abu Dharr said: I
  // abused a man, shaming him for his mother, and he said: there is still ignorance in you; your servants are your
  // brothers, so feed them of what you eat and dress them of what you wear (Sahih al-Bukhari 30). (What to do when a
  // task is too hard stays on its usual picture, since the scene's words stop before it.)
  "sign-cloaks-alike": [
    ["Why was Abu Dharr wearing the same cloak as his servant?", "He was told: dress them as you dress", "and dress them of what you wear"],
    ["What had Abu Dharr done wrong?", "Insulted a man's mother", "I abused a man, shaming him for his mother"],
    ["Islam lets you mock a person's family.", "False", "I abused a man, shaming him for his mother", "He said: there is still ignorance in you"]
  ],
  // Abu Mas'ud said: when we were told to give charity, we would carry loads for hire. Abu Aqil came with half a sa',
  // and someone brought more; the hypocrites said: Allah has no need of this one's charity, and the other gave only to
  // show off. Then the ayah was revealed (Sahih al-Bukhari 4668).
  "sign-half-a-sa": [
    ["How did they earn something to give, per Abu Mas'ud?", "They worked as porters", "we would carry loads for hire"],
    ["What did the mockers say about the small gift?", "Allah does not need it", "The hypocrites said: Allah has no need", "of this one's charity"],
    ["A small gift from little means is precious to Allah.", "True", "Then the ayah was revealed"]
  ],
  // Jabir said: he said to me: if the wealth of Bahrain came, I would give you this much, three times. It did not come
  // until he passed away; then Abu Bakr had a caller call out: whoever had a promise or a debt from him, let him come to
  // us. I came and said: he promised me; and Abu Bakr scooped out three handfuls for me (Sahih al-Bukhari 2598).
  "sign-promise-of-bahrain": [
    ["Where was the promised money coming from?", "Bahrain", "He said: if the wealth of Bahrain came,"],
    ["Who kept the promise after the Prophet ﷺ passed away?", "Abu Bakr", "Abu Bakr had a caller call out:", "let him come to us"],
    ["Abu Bakr gave Jabir three handfuls of the money.", "True", "and Abu Bakr scooped out three handfuls"]
  ],
  // Aishah said: he heard the raised voices of disputants at the door, one asking the other to reduce his debt, and the
  // other saying: by Allah, I will not. He went out to them and said: where is the one who swears by Allah that he will
  // not do a good deed? The man said: I, and he may have whichever of that he likes (Sahih al-Bukhari 2705).
  "sign-swore-at-the-door": [
    ["What did one man ask the other to do?", "Let go of part of his debt", "one asking the other to reduce his debt"],
    ["What did the man say once he ﷺ came out?", "He may have whatever he wishes", "The man said: I,", "and the debtor may have whichever he likes"],
    ["The man kept his harsh oath after he ﷺ came out.", "False", "The man said: I,", "and the debtor may have whichever he likes"]
  ],
  // Hudhayfah said: nothing kept me from Badr but this: Quraysh took my father, Husayl, and me, and took from us Allah's
  // covenant that we would go on to Madinah and not fight alongside him. We told him, and he said: go on, both of you;
  // we will keep their covenant, and ask Allah's help against them (Sahih Muslim 1787).
  "sign-covenant-kept": [
    ["Why did Hudhayfah miss Badr?", "He had made a promise", "They took from us Allah's covenant", "to go on to Madinah and not fight with him"],
    ["What did the Prophet ﷺ tell them to do?", "Keep the promise", "He said: go; we will keep their covenant"],
    ["Muslims keep their promises, even to enemies.", "True", "He said: go; we will keep their covenant", "and ask Allah's help against them"]
  ],
  // Ayman said: I went in to Aishah, and on her was a coarse dress costing five dirhams. She said: look at my slave
  // girl, too proud to wear it at home; yet I had one like it in his time, and no woman in Madinah was made ready as a
  // bride but she sent to me to borrow it (Sahih al-Bukhari 2628).
  "sign-dress-to-borrow": [
    ["How much was Aishah's coarse dress worth?", "Five dirhams", "a coarse dress costing five dirhams"],
    ["Who came to borrow her dress in his ﷺ time?", "Brides getting ready", "and no bride in Madinah was made ready", "but she sent to me to borrow it"],
    ["Aishah's servant girl would not wear the dress at home.", "True", "she is too proud to wear it at home"]
  ],
  // Abu Dharr said: I came to him in the shade of the Ka'bah as he was saying: they are the losers, by the Lord of the
  // Ka'bah. I said: what is the matter with me? Is something seen in me? Who are they? He said: those with the most
  // wealth, except one who does like this, and like this (Sahih al-Bukhari 6638). (Where he was sitting when Abu Dharr
  // came stays on its usual picture, since the Ka'bah and its shade are there from the scene's start.)
  "sign-shade-of-the-kabah": [
    ["Who did he ﷺ say were the losers?", "The wealthy, except those who give", "He said: those with the most wealth,", "but one who does like this, and like this"],
    ["Abu Dharr worried that the words were about him.", "True", "I said: what is the matter with me?", "Is something seen in me?"]
  ],
  // Anas said: he came to me as I played with the boys, greeted us and sent me on an errand, and I was late coming to my
  // mother. She said: what kept you? I said: he sent me on an errand. She said: what was it? I said: a secret. She said:
  // tell no one his secret (Sahih Muslim 2482). (What Anas was doing stays on its usual picture, since the little ones
  // at play are there from the scene's start.)
  "sign-secret-kept": [
    ["Whom did Anas refuse to tell the secret?", "His own mother", "and I was late coming to my mother", "She said: what was it? I said: a secret"],
    ["What did his mother say about the secret?", "Never tell it to anyone", "She said: tell no one his secret"]
  ],
  // Abdullah ibn Abi Awfa said: when folk came to him with their charity, he would say: O Allah, bless the family of
  // so-and-so. My father came to him with his charity, and he said: O Allah, bless the family of Abu Awfa (Sahih
  // al-Bukhari 1497).
  "sign-bless-the-givers": [
    ["What did the Prophet ﷺ say when charity came?", "O Allah, bless them", "he said: O Allah, bless the family", "of so-and-so"],
    ["Whose family did he pray for, in the hadith?", "The family of Abu Awfa", "He said: O Allah, bless the family", "of Abu Awfa"],
    ["Praying for those who give is a Sunnah.", "True", "he said: O Allah, bless the family", "of so-and-so"]
  ],
  // Abdullah ibn Amr said: a man came to him asking his permission to go for jihad. He said: are your parents alive? The
  // man said: yes. He said: then strive in serving them (Sahih al-Bukhari 3004).
  "sign-serve-your-parents": [
    ["What did the Prophet ﷺ ask the man first?", "Are your parents alive?", "He said: are your parents alive?"],
    ["What did he tell him to do?", "Strive in serving his parents", "He said: then strive in serving them"],
    ["Serving your parents can be a great act of worship.", "True", "The man said: yes", "He said: then strive in serving them"]
  ],
  // Abu Hurairah said: I used to press my belly to pebbles from hunger, and the best of people to the poor was Ja'far
  // ibn Abi Talib. He would take us home and feed us what was in his home, even bringing out to us a butter skin with
  // nothing in it, and we would split it open and lick what was in it (Sahih al-Bukhari 3708).
  "sign-best-to-the-poor": [
    ["Who was the most generous to the poor, said Abu Hurairah?", "Ja'far", "The best of people to the poor", "was Ja'far ibn Abi Talib"],
    ["What did Ja'far split open for the poor?", "An empty butter skin", "even bringing out to us a butter skin", "with nothing in it, and we split it open"],
    ["Ja'far gave even when he had very little.", "True", "even bringing out to us a butter skin", "and licked what was in it"]
  ],
  // As-Sa'ib said: I remember going out with the boys to meet him at Thaniyyat al-Wada', as he came back from Tabuk
  // (Sahih al-Bukhari 4427).
  "sign-out-to-welcome": [
    ["Who went out with As-Sa'ib to welcome him ﷺ?", "The other boys", "I remember going out with the boys"],
    ["Where did the boys meet him ﷺ?", "Thaniyyat al-Wada'", "at Thaniyyat al-Wada'"],
    ["He ﷺ was coming back from Tabuk.", "True", "as he came back from Tabuk"]
  ],
  // Ibn Umar said: while the people were praying Fajr in the masjid of Quba, someone came and said: Allah has revealed
  // Quran to him, that he should face the Ka'bah, so face it. And they turned to the Ka'bah (Sahih al-Bukhari 4488).
  // (Where they were praying keeps its own map picture.)
  "sign-quba-turn": [
    ["What did they do when they heard?", "Turned to the Ka'bah at once", "And they turned to the Ka'bah"],
    ["What does their turning teach?", "Obey Allah quickly", "so face it", "And they turned to the Ka'bah"]
  ],
  // Jabir ibn Abdullah said: a caravan came on a Friday while we were with him, and all the people left except twelve
  // men; then Allah revealed the ayah (Quran 62:11) (Sahih al-Bukhari 4899).
  "sign-caravan-on-friday": [
    ["What arrived during the Friday sermon?", "A caravan", "A caravan came on a Friday"],
    ["How many people stayed?", "Twelve", "All the people left,", "except twelve men"],
    ["62:11 was revealed about this event.", "True", "Then Allah revealed the ayah"]
  ],
  // Abu Hurairah said: I said: I hear many hadith from you but I forget them. He said: spread out your cloak; so I
  // spread it out. He scooped with his hands, then said: wrap it to you; so I wrapped it to me, and I forgot nothing
  // after that (Sahih al-Bukhari 119).
  "sign-never-forgot": [
    ["What was Abu Hurairah's problem?", "He forgot the hadith he heard", "but I forget them"],
    ["What did the Prophet ﷺ tell him to spread?", "His cloak", "He said: spread out your cloak", "So I spread it out"],
    ["After that day, Abu Hurairah never forgot anything.", "True", "So I wrapped it to me", "and I forgot nothing after that"]
  ],
  // Zaynab, the wife of Abdullah, said: he said: give, even of your jewellery. She spent on Abdullah and the orphans in
  // her care, and went to ask him, and found a woman of the Ansar at his door. Bilal passed by, and they said: ask him.
  // He said: who are they? Bilal said: Zaynab. He said: which Zaynab? Bilal said: the wife of Abdullah. He said: she has
  // two rewards, the reward of kinship and the reward of charity (Sahih al-Bukhari 1466).
  "sign-two-rewards": [
    ["How many rewards did he ﷺ say Zaynab would get?", "Two", "He said: two rewards, kinship and charity"],
    ["What did he ﷺ ask when Bilal said her name?", "Which Zaynab?", "He said: which Zaynab?"],
    ["Giving to your own needy family can bring a double reward.", "True", "Bilal said: the wife of Abdullah", "He said: two rewards, kinship and charity"]
  ],
  // As-Sa'b ibn Jaththamah said: he gave the Messenger of Allah ﷺ a wild donkey at al-Abwa', or at Waddan, and he gave
  // it back to him. When he saw what was in his face, he said: we did not give it back to you, except that we are in
  // ihram (Sahih al-Bukhari 2573).
  "sign-gift-in-ihram": [
    ["What did he ﷺ see on the giver's face?", "Sadness", "and he gave it back to As-Sa'b", "When he saw the sorrow in As-Sa'b's face"],
    ["Why could he ﷺ not take the gift?", "He was in ihram", "He said: we did not give it back to you", "except that we are in ihram"],
    ["He ﷺ cared about the feelings of the man who gave the gift.", "True", "When he saw the sorrow in As-Sa'b's face", "except that we are in ihram"]
  ],
  // Ibn Umar said: Umar saw a silk cloak for sale and said: buy it, and wear it on Fridays. He said: only one with no
  // share in the Hereafter wears this. Then cloaks like it came to him, and he sent one to Umar. Umar said: how can I
  // wear it? He said: I did not give it to you to wear; sell it, or give it. So Umar sent it to a brother of his in
  // Makkah, before he accepted Islam (Sahih al-Bukhari 2619).
  "sign-cloak-to-give": [
    ["Why did he ﷺ send Umar the silk cloak?", "To sell or to give away", "He said: not to wear, but to sell or give"],
    ["Who did Umar give the cloak to?", "His brother in Makkah", "So Umar sent it to his brother in Makkah"],
    ["Men may wear silk clothes.", "False", "He said: this is worn by one", "who has no share in the Hereafter"]
  ],
  // Jabir said: he came to visit me while I was sick and unconscious. He made wudu, and poured some of its water on me,
  // and I woke. I said: to whom will my inheritance go? Then the ayah of inheritance was revealed (Sahih al-Bukhari
  // 194).
  "sign-water-for-jabir": [
    ["What did the Prophet ﷺ sprinkle on Jabir?", "His wudu water", "He made wudu", "and poured of its water on me"],
    ["What did Jabir ask about?", "His inheritance", "I said: to whom will my inheritance go?"],
    ["Visiting the sick is part of the sunnah.", "True", "Jabir said: he came to visit me", "while I was sick and unconscious"]
  ],
  // Anas said: a Jewish youth used to serve him, and fell ill. He came to visit him, sat by his head, and said: accept
  // Islam. The youth looked at his father, who was with him, and his father said: obey Abul-Qasim ﷺ. So he accepted
  // Islam, and he came out saying: praise be to Allah, who saved him from the Fire (Sahih al-Bukhari 1356).
  "sign-visit-to-the-youth": [
    ["Whom did he ﷺ go to visit?", "A sick boy who served him", "The youth fell ill, and he came to visit"],
    ["Where did he ﷺ sit during the visit?", "Near the boy's head", "The youth fell ill, and he came to visit", "He sat by his head and said: accept Islam"],
    ["He ﷺ visited people even if they were not Muslim.", "True", "The youth fell ill, and he came to visit", "He sat by his head and said: accept Islam"]
  ],
  // Sahl said: between the place where the Messenger of Allah ﷺ prayed and the wall, there was room for a sheep to pass
  // (Sahih al-Bukhari 496). (That he prayed close to the wall is there from the scene's start, so the two questions on
  // it stay as they are.)
  "sign-room-for-a-sheep": [
    ["How much room was between his ﷺ prayer place and the wall?", "Room for a sheep", "was room for a sheep to pass"]
  ],
  // Abu Hazim said: I asked Sahl: did the Messenger of Allah ﷺ eat white flour? Sahl said: he never saw white flour. I
  // said: did you have sieves? Sahl said: he never saw a sieve. I said: how did you eat barley unsifted? Sahl said: we
  // ground it and blew on it; what flew off flew, and what stayed we wet and ate (Sahih al-Bukhari 5413).
  "sign-husk-blown": [
    ["How did they clean the barley, with no sieve?", "They blew off the husk", "Sahl said: we ground it and blew on it", "what flew off flew, and what stayed"],
    ["What did he ﷺ never see, Sahl said?", "White flour", "I asked Sahl: did he eat white flour?", "Sahl said: he never saw white flour"],
    ["He ﷺ and his companions lived a simple life.", "True", "I asked Sahl: did he eat white flour?", "Sahl said: he never saw a sieve"]
  ],
  // Abu Hurairah said: the Messenger of Allah ﷺ said: the food of two is enough for three, and the food of three is
  // enough for four (Sahih al-Bukhari 5392).
  "sign-enough-for-more": [
    ["Food for two people is enough for...?", "Three people", "is enough for three"],
    ["A friend comes while you eat with your brother. What fits?", "Share the food", "is enough for three"],
    ["Food for three people is enough for four.", "True", "is enough for four"]
  ],
  // Umm Khalid said: he was brought some clothes, among them a little black khamisa. He said: whom should we dress in
  // this? The people kept silent. He said: bring me Umm Khalid. She was brought, carried, and he dressed her in it, and
  // said: may you live to wear it out and mend it, many times over. On it was a mark of green or yellow, and he said:
  // Umm Khalid, this is sanah, beautiful (Sahih al-Bukhari 5823).
  "sign-black-khamisa": [
    ["Whom did he ﷺ choose to wear the black cloak?", "Little Umm Khalid", "He said: bring me Umm Khalid"],
    ["What does 'sanah' mean?", "Beautiful", "He said: Umm Khalid, this is sanah!"],
    ["He ﷺ made du'a that Umm Khalid would live long.", "True", "He said: may you live to wear it out", "and mend it, many times over"]
  ],
  // Anas said: when he came to Madinah, he ordered a masjid to be built, and said: O Banu an-Najjar, name me a price for
  // this garden of yours. They said: no, by Allah, we will not ask its price except from Allah (Sahih al-Bukhari 2774).
  "sign-garden-for-the-masjid": [
    ["What was the land for?", "Building the masjid", "he ordered a masjid to be built"],
    ["Who would they ask the price from?", "Allah", "we will not ask its price", "except from Allah"],
    ["Giving land for a masjid is a lasting charity.", "True", "They said: no, by Allah,", "except from Allah"]
  ],
  // Abu Hurairah said: at-Tufayl and his companions came and said: Daws has disbelieved and refused, so pray to Allah
  // against them. It was said: Daws is ruined; the people thought he would pray against them. He said: O Allah, guide
  // Daws, and bring them (Sahih Muslim 2524, Sahih al-Bukhari 6397). (Which famous Companion came from Daws is not in
  // the scene, so it stays as it is.)
  "sign-guide-daws": [
    ["What did At-Tufayl ask for Daws?", "A curse on them", "They said: Daws disbelieved and refused", "so pray to Allah against them"],
    ["What did he ﷺ pray instead?", "O Allah, guide Daws", "He said: O Allah, guide Daws", "and bring them"],
    ["Why did at-Tufail ask him ﷺ to pray against Daws?", "They had refused Islam", "They said: Daws disbelieved and refused"],
    ["What did he ﷺ ask Allah for, for Daws?", "Guidance for them", "He said: O Allah, guide Daws", "and bring them"],
    ["People thought he ﷺ would pray against Daws.", "True", "It was said: Daws is ruined"]
  ],
  // Umar said: an Ansari neighbour and I, at the Awali of Madinah, went down to him by turns, my neighbour one day and I
  // one day. I brought my neighbour that day's news, of the revelation and other things, and my neighbour did the same
  // (Sahih al-Bukhari 89).
  "sign-learning-in-turns": [
    ["How did Umar and his neighbor make sure they learned everything?", "They took turns going to the Prophet ﷺ", "We went down to him by turns:", "my neighbour one day, and I one day"],
    ["What did each bring back for the other?", "The news of that day", "I brought my neighbour that day's news", "and my neighbour did the same"],
    ["Umar's neighbor was one of the Ansar.", "True", "Umar said: I and an Ansari neighbour"]
  ],
  // Abdullah ibn Dinar said: a man of the desert met Ibn Umar on the road to Makkah, and Ibn Umar set him on his own
  // donkey and gave him the turban from his own head. We said: desert folk are happy with little. Ibn Umar said: Umar
  // loved this man's father, and I heard him say: the finest goodness is a son's kindness to his father's loved ones
  // (Sahih Muslim 2552a). (The donkey and the turban are there from the scene's start, so what Ibn Umar gave the man
  // stays as it is.)
  "sign-fathers-friend": [
    ["What is the finest goodness, says Muslim 2552?", "Kindness to your father's loved ones", "Ibn Umar said: Umar loved the man's father", "a son's kindness to his father's friends"],
    ["Being good to parents can go on after they pass away.", "True", "Ibn Umar said: Umar loved the man's father", "a son's kindness to his father's friends"]
  ],
  // Ibn Umar said: I heard him say: people are like camels; among a hundred, you can hardly find one fit to ride (Sahih
  // al-Bukhari 6498). (The camel with the saddle is there from the scene's start, so what is hard to find among the
  // hundred stays as it is.)
  "sign-one-in-a-hundred": [
    ["Among how many camels can you hardly find one fit to ride?", "One hundred camels", "a hundred of them,"],
    ["He ﷺ likened people to camels.", "True", "People are like camels:"]
  ],
  // Abu Hurairah said: he said: whoever says Subhan Allah wa bihamdihi a hundred times in a day, their sins are
  // forgiven, even if they were like the foam of the sea (Sahih al-Bukhari 6405). (The foam of the sea is there from the
  // scene's start, so how big the forgiven sins can be stays as it is, and so does 56:96, which the scene does not
  // show.)
  "sign-foam-of-the-sea": [
    ["How many times a day, per Bukhari 6405?", "One hundred", "a hundred times in a day,"]
  ],
  // Umm al-Ala, a woman of the Ansar, said: when the Ansar drew lots to house the Muhajirun, Uthman ibn Maz'un fell to
  // us. He fell ill, and we nursed him until he died. When he came in, I said: I testify that Allah has honored you. He
  // said: how do you know? and said: I hope good for him from Allah. Then I dreamt of a flowing spring for Uthman, and
  // he said: that is his deed, flowing for him (Sahih al-Bukhari 3929, 1243 and 7018). (That Umm al-Ala never again
  // declared anyone righteous is not in the scene, so it stays as it is.)
  "sign-flowing-spring": [
    ["How did the Ansar share out the emigrants?", "By drawing lots", "The Ansar drew lots to house the Muhajirun"],
    ["Whose house did Uthman live in?", "Umm al-Ala's", "and Uthman ibn Maz'un fell to us"],
    ["Umm al-Ala nursed him when he was ill.", "True", "We nursed Uthman until his death"],
    ["What did the Prophet ﷺ ask Umm al-Ala?", "How do you know?", "He said: how do you know?"],
    ["What does this teach us?", "Only Allah knows a person's end", "I said: I testify Allah has honored you", "He said: I hope good for him from Allah"],
    ["What did Umm al-Ala see in her dream?", "A flowing spring", "I dreamt of a flowing spring for Uthman"],
    ["What did the spring stand for?", "His good deeds", "He said: that is his deed, flowing for him"],
    ["Good deeds can keep giving reward after death.", "True", "He said: that is his deed, flowing for him"]
  ],
  // Anas said: he woke up smiling at Umm Haram's house, and said: some of my ummah were shown to me, riding the middle
  // of this sea, like kings on thrones. Umm Haram said: pray to Allah that I am one of them, and he said: you are among
  // the first. She sailed in the time of Mu'awiyah (Sahih al-Bukhari 2788). (Ubadah, her husband, his home by the sea at
  // Hims, and what the first sea army was promised are not in the scene, so they stay as they are.)
  "sign-kings-on-the-sea": [
    ["What did the Prophet ﷺ see in his dream at Umm Haram's house?", "Muslims sailing the sea", "He said: I was shown some of my ummah", "riding the middle of this sea"],
    ["What did Umm Haram ask for?", "To be one of them", "Umm Haram said: pray I am one of them"],
    ["What did he tell her?", "You are among the first", "He said: you are among the first"]
  ],
  // Anas said: on one of his journeys the driver chanted to drive the camels on. His driver, Anjashah, had a fine voice,
  // and he said: gently, O Anjashah, with the glass vessels; do not break the glass vessels. Qatadah said: he meant the
  // weak women (Sahih al-Bukhari 6209 and 6211). (Anjashah's place goes before the camels from the scene's start, so who
  // Anjashah was stays as it is.)
  "sign-glass-vessels": [
    ["What did the Prophet ﷺ compare the women to?", "Glass vessels", "with the glass vessels!", "Qatadah said: he meant the weak women"],
    ["What did he ﷺ tell Anjashah to do?", "Go gently", "He said: gently, Anjashah"],
    ["Calling women glass means treat them with care.", "True", "Do not break the glass vessels", "Qatadah said: he meant the weak women"],
    ["Whom did the Prophet ﷺ call glass vessels?", "The women riding", "with the glass vessels!", "Qatadah said: he meant the weak women"],
    ["This hadith teaches care and gentleness with women.", "True", "He said: gently, Anjashah", "Qatadah said: he meant the weak women"]
  ],
  // Abu Hurairah said: he said: when you put on sandals, start with the right, and when you take them off, start with
  // the left, so that the right is the first on and the last off. And he said: none of you should walk in one sandal;
  // take both off, or wear both (Sahih al-Bukhari 5855 and 5856).
  "sign-right-sandal-first": [
    ["Which shoe goes on first?", "The right", "start with the right"],
    ["Which shoe comes off first?", "The left", "and when you take them off, the left"],
    ["The right shoe is the first on and the last off.", "True", "start with the right", "the right is first on and last off"],
    ["One strap breaks. What fits this hadith?", "Take both shoes off", "He said: do not walk in one sandal", "take both off, or wear both"],
    ["How should we walk?", "In both shoes or none", "He said: do not walk in one sandal", "take both off, or wear both"],
    ["Walking in just one shoe is the Sunnah.", "False", "He said: do not walk in one sandal"]
  ],
  // Usayr ibn Jabir said: whenever help came from Yemen, Umar asked them: is Uways ibn Amir among you? until Umar came
  // upon Uways and asked: you have a mother? Uways said: yes. Umar had heard him say that Uways is kind to his mother,
  // so Umar said: ask forgiveness for me, and Uways asked forgiveness for Umar. Uways said he would rather be among the
  // poor (Sahih Muslim 2542c). (That Uways never met him is not in the scene, so it stays as it is.)
  "sign-uways-of-yemen": [
    ["Where did Uways come from?", "Yemen", "Help came from Yemen, and Umar asked them", "until Umar came upon Uways"],
    ["What was Uways known for?", "Kindness to his mother", "Umar asked: you have a mother? Uways: yes", "He had said: Uways is kind to his mother"],
    ["What did Umar ask Uways to do?", "Pray for his forgiveness", "Umar said: so ask forgiveness for me", "And Uways asked forgiveness for Umar"]
  ],
  // Al-Musayyib said that his father Hazn came to him, and he asked: what is your name? The man said: Hazn. He said: you
  // are Sahl. Hazn said: I will not change a name my father gave me. Ibn al-Musayyib said: the roughness has stayed
  // among us ever since (Sahih al-Bukhari 6190).
  "sign-hazn-and-sahl": [
    ["What new name did he ﷺ offer Hazn?", "Sahl", "He said: you are Sahl"],
    ["What did Hazn say about changing his name?", "He would keep his father's name", "Hazn said: I will not change the name", "my father gave me"],
    ["Hazn happily took the new name Sahl.", "False", "Hazn said: I will not change the name", "my father gave me"]
  ],
  // Sa'd said: he said: whoever eats some ajwa dates in the morning, every day, no poison and no magic will harm him
  // that day, until night. Another narrator said: seven dates (Sahih al-Bukhari 5768). (The dish of ajwa dates and the
  // dawn are there from the scene's start, so which dates are named and when they are eaten stay as they are.)
  "sign-ajwa-morning": [
    ["What do they protect from that day?", "Poison and magic", "no poison or magic will harm him"]
  ],
  // Anas ibn Malik said: Umm Sulaym said to him: Anas is your servant. He said: O Allah, increase his wealth and his
  // children, and bless him in what You give him (Sahih al-Bukhari 6334).
  "sign-a-dua-for-anas": [
    ["Anas's mother, ____, brought him to serve the Prophet ﷺ.", "Umm Sulaym", "Umm Sulaym said: Anas is your servant"],
    ["Anas's mother, Umm Sulaym, brought him to serve the Prophet ﷺ.", "True", "Umm Sulaym said: Anas is your servant"],
    ["The Prophet ﷺ prayed for Anas to have wealth and many ____.", "children", "and his children"]
  ],
  // Hudhayfah said: al-Aqib and as-Sayyid, the two of Najran, came and said: send with us a trustworthy man, and send
  // none with us but one trustworthy. He said: I will send with you one truly trustworthy. He said: stand up, Abu
  // Ubaydah ibn al-Jarrah, and when Abu Ubaydah stood, he said: this is the trustworthy one of this ummah (Sahih
  // al-Bukhari 4380). (How the companions felt before he chose shows only as small glints, and why the two of Najran
  // held back is not in the scene, so they stay as they are.)
  "sign-truly-trustworthy": [
    ["What kind of man did the people of Najran ask for?", "A trustworthy, honest man", "They said: send with us a trustworthy man", "and send none with us but one trustworthy"],
    ["Whom did the Prophet ﷺ send?", "Abu Ubaydah", "He said: stand up, Abu Ubaydah", "this is the trustworthy one of this ummah"],
    ["Whom did the Prophet ﷺ send with them?", "Abu Ubaydah", "He said: stand up, Abu Ubaydah", "this is the trustworthy one of this ummah"]
  ],
  // Abdullah ibn Umar said: when he came home from Hajj or Umrah, he said Allahu akbar on every high ground three times,
  // then: none is worshipped but Allah, alone, with no partner; we return, repenting, worshipping, prostrating, praising
  // our Lord; Allah kept His promise, helped His servant, and defeated the clans alone (Sahih al-Bukhari 1797).
  "sign-takbir-on-the-rises": [
    ["What did he ﷺ say three times on every rise?", "Allahu akbar", "he said Allahu Akbar on every high ground", "three times"],
    ["How did he ﷺ describe the travellers coming home?", "Repenting and praising our Lord", "We return, repenting, worshipping,", "prostrating, praising our Lord"],
    ["He ﷺ said these words coming home from Umrah too.", "True", "When he came home from Hajj or Umrah", "he said Allahu Akbar on every high ground"]
  ],
  // Abu Humayd as-Sa'idi said: he sent a man of al-Azd called Ibn al-Lutbiyyah to collect the zakat. When Ibn
  // al-Lutbiyyah came back, he said: this is for you, and this was a gift to me. He said: why did he not sit in his
  // father's house or his mother's house, to see if gifts would come to him or not? Then he said three times: O Allah,
  // have I not conveyed? (Sahih al-Bukhari 2597).
  "sign-gifts-to-the-collector": [
    ["What job was Ibn al-Lutbiyyah sent to do?", "Collect the zakat", "He sent Ibn al-Lutbiyyah to collect zakat", "Ibn al-Lutbiyyah came back and said:"],
    ["Where did he ﷺ say the man should have stayed?", "In his parents' house", "He said: why did Ibn al-Lutbiyyah not sit", "in his father's or his mother's house"],
    ["A worker may keep the gifts given to him because of his job.", "False", "He said: why did Ibn al-Lutbiyyah not sit", "to see if gifts would come to him or not?"]
  ],
  // Abu Shurayh al-Ka'bi said: he said: whoever believes in Allah and the Last Day, let him honor his guest; the guest's
  // due is a day and a night, and hospitality is three days; what is beyond that is charity; and it is not lawful for
  // the guest to stay on until it is hard on his host (Sahih al-Bukhari 6135).
  "sign-three-days-for-a-guest": [
    ["How long is a guest's full hospitality?", "Three days", "and hospitality is three days"],
    ["What is hosting after three days?", "Charity", "what is beyond that is charity"],
    ["A guest may stay as long as he likes, even if it burdens his host.", "False", "it is not lawful for the guest to stay", "so long that it is hard on his host"]
  ],
  // Ibn Umar said: he said: whoever ate of this plant, meaning garlic, should not come near our masjid (Sahih al-Bukhari
  // 853). Jabir said: he said: whoever eats garlic or onion should keep away from our masjid, and stay in his house
  // (Sahih al-Bukhari 855 and 5452). In the scene its smell drifts on to the masjid's door, where some are. (Which plant
  // he named keeps its own picture, and whether garlic is forbidden is not in the scene, so they stay as they are.)
  "sign-garlic-and-the-masjid": [
    ["Why stay away after eating it?", "Its smell bothers others", "He said: whoever ate of this plant", "should not come near our masjid"],
    ["Why stay away from the masjid after raw garlic?", "Its smell bothers others", "He said: whoever ate of this plant", "should not come near our masjid"],
    ["Which two foods are named in the hadith?", "Garlic and onion", "He said: whoever eats garlic or onion"],
    ["After eating raw garlic, where should you not go?", "The masjid", "should not come near our masjid"],
    ["Why keep away?", "The smell bothers people", "He said: whoever ate of this plant", "should not come near our masjid"]
  ],
  // Ali said: he said to me: say: O Allah, guide me, and keep me straight; and with guidance remember your being guided
  // on the road, and with straightness remember the straightness of the arrow (Sahih Muslim 2725a). (That thinking on a
  // du'a's meaning makes it stronger is not in the scene, so it stays as it is.)
  "sign-straight-as-an-arrow": [
    ["Who was taught this dua?", "Ali ibn Abi Talib", "Ali said: he said to me: say", "O Allah, guide me, and keep me straight"],
    ["What should you picture when asking to be kept straight?", "A straight arrow", "and with straightness, remember", "the straightness of the arrow"]
  ],
  // Abu Musa said: the ship took us to Abyssinia, where we met Ja'far, and then we all came to him. Umar said to Asma
  // bint Umays: we went on hijrah before you, so we have more right to the Messenger of Allah ﷺ than you. When he came,
  // Asma told him, and he said: Umar has no more right to me than you; Umar and his companions have one hijrah, and you
  // of the ship have two. Asma said: Abu Musa and the people of the ship came to me in groups, asking about it (Sahih
  // al-Bukhari 4230, 4231).
  "sign-two-hijrahs": [
    ["Where did Ja'far ibn Abi Talib first emigrate to?", "Abyssinia", "one hijrah, and you of the ship have two"],
    ["How many hijrahs did the people of the ship earn?", "Two", "one hijrah, and you of the ship have two"],
    ["Who asked the Prophet ﷺ about it?", "Asma bint Umays", "When he came, Asma told him what Umar said"]
  ],
  // Khabbab said: I came to him while he was in the shade of the Ka'bah, and we had met hardship from the idolaters. I
  // said: will you not pray to Allah? He said: Allah will complete this matter, until a rider goes from San'a to
  // Hadramawt fearing none but Allah, and the wolf for his sheep (Sahih al-Bukhari 3852). (That those before them
  // suffered for their faith is not in the scene, so it stays as it is.)
  "sign-sana-to-hadramawt": [
    ["Where was the Prophet ﷺ when Khabbab came?", "In the shade of the Kaaba", "he was in the shade of the Ka'bah"],
    ["What did the Prophet ﷺ promise?", "Allah will complete this religion", "He said: Allah will complete this matter"]
  ],
  // Abu Sa'id al-Khudri said: when you are with your sheep, or in your open country, and call the adhan, raise your
  // voice; for none hears the reach of the caller's voice, jinn, human or thing, but will testify for him on the Day of
  // Resurrection. Abu Sa'id said: I heard it from him (Sahih al-Bukhari 609).
  "sign-heard-by-all": [
    ["Where might a shepherd call the adhan?", "Out with his sheep", "so when you are with your sheep", "and call the adhan, raise your voice"],
    ["Who will be a witness for the caller?", "Every creature that hears it", "none hears the reach of the caller's voice", "jinn, human or thing, but will testify"],
    ["Abu Sa'id said to raise your voice with the adhan.", "True", "and call the adhan, raise your voice"]
  ],
  // Abu Musa al-Ash'ari said: he said: feed the hungry, visit the sick, and set free the captive (Sahih al-Bukhari 5373
  // and 5649).
  "sign-feed-visit-free": [
    ["Whom did he ﷺ tell us to feed?", "The hungry", "Abu Musa said: he said: feed the hungry"],
    ["Feed the hungry, free the captive, and...?", "Visit the sick", "and visit the sick"],
    ["Giving food to a hungry person is a deed the Prophet ﷺ ordered.", "True", "Abu Musa said: he said: feed the hungry"],
    ["What should we do for the sick, says Bukhari 5649?", "Visit them", "and visit the sick"],
    ["What should we do for the hungry?", "Feed them", "Abu Musa said: he said: feed the hungry"],
    ["Freeing a captive is one of the deeds in Bukhari 5649.", "True", "and set free the captive"]
  ],
  // Azra ibn Thabit said: Thumamah ibn Abdullah handed me some perfume and said: Anas never refused perfume; and Anas
  // said that he never refused perfume (Sahih al-Bukhari 2582 and 5929).
  "sign-never-refused-perfume": [
    ["Which gift did he ﷺ never turn down?", "Perfume", "and Thumamah handed me some perfume", "Anas said: he never refused perfume"],
    ["Which habit of his ﷺ did Anas follow?", "Never refusing perfume", "Thumamah said: Anas never refused perfume", "Anas said: he never refused perfume"],
    ["Smelling nice is part of the sunnah.", "True", "Anas said: he never refused perfume"],
    ["What gift did he ﷺ never refuse?", "Perfume", "and Thumamah handed me some perfume", "Anas said: he never refused perfume"],
    ["Which companion copied this?", "Anas", "Thumamah said: Anas never refused perfume", "Anas said: he never refused perfume"],
    ["Accepting perfume as a gift follows the Sunnah.", "True", "Anas said: he never refused perfume"]
  ],
  // Al-Miqdam ibn Ma'dikarib said: he said: measure your food, and it will be blessed for you (Sahih al-Bukhari 2128).
  // Anas ibn Malik said: he said: O Allah, bless them in their measure, and bless them in their sa' and their mudd,
  // meaning the people of Madinah (Sahih al-Bukhari 2130).
  "sign-blessed-measures": [
    ["What did he ﷺ tell us to measure?", "Our food", "Al-Miqdam said: he said: measure your food"],
    ["What comes from measuring it?", "Blessing", "and it will be blessed for you"],
    ["Planning and measuring well is part of the Sunnah.", "True", "Al-Miqdam said: he said: measure your food", "and it will be blessed for you"],
    ["For which people did he ﷺ make du'a?", "The people of Madinah", "meaning the people of Madinah"],
    ["What did he ﷺ ask Allah to bless?", "Their food measures", "in their measure", "and their mudd"],
    ["The mudd and the sa' were used to measure food.", "True", "and bless them in their sa'", "and their mudd"]
  ],
  // Malik ibn al-Huwayrith said: we stayed with him twenty nights, and he said: go back to your families, teach them,
  // and pray; when the prayer is due, let one of you give the adhan, and let the eldest of you lead you (Sahih
  // al-Bukhari 628). (Getting clean with wudu before the prayer is not in the scene, so it stays as it is.)
  "sign-twenty-nights": [
    ["The ____ calls Muslims to pray five times a day.", "adhan", "when prayer is due, let one give the adhan"]
  ],
  // Abdullah ibn Umar said: he said: a Muslim is the brother of a Muslim; he does not wrong him, nor hand him over.
  // Whoever meets his brother's need, Allah meets his need; whoever relieves a Muslim of a hardship, Allah relieves him
  // of one of the hardships of the Day of Resurrection; and whoever covers a Muslim, Allah covers him on the Day of
  // Resurrection (Sahih al-Bukhari 2442).
  "sign-brother-of-a-muslim": [
    ["You help a friend with what he needs. What does Allah do?", "Meets your needs", "Allah meets his need"],
    ["You know a friend's private mistake. What should you do?", "Cover it", "whoever covers a Muslim, Allah covers him"],
    ["A Muslim may hand his brother over to someone who harms him.", "False", "he does not wrong him, nor hand him over"],
    ["What is a Muslim to another Muslim, in the hadith?", "A brother", "A Muslim is a brother of a Muslim"],
    ["What does Allah do for one who screens a Muslim?", "Screens him on Judgment Day", "whoever covers a Muslim, Allah covers him"],
    ["Who fulfils the needs of one who helps his brother?", "Allah", "Allah meets his need"],
    ["What must a Muslim never do to his brother, per Bukhari 2442?", "Oppress him", "he does not wrong him, nor hand him over"],
    ["What does Allah do for one who meets a brother's needs?", "Meets his needs", "Allah meets his need"],
    ["Whoever covers a Muslim's faults, Allah will cover his.", "True", "whoever covers a Muslim, Allah covers him"]
  ],
  // Usamah ibn Zayd said: he would take him and al-Hasan, and say: O Allah, love them both, for I love them both (Sahih
  // al-Bukhari 3735). (Who Usamah's father was is not in the scene, so it stays as it is.)
  "sign-love-them-both": [
    ["Who was held with Usamah?", "Al-Hasan", "and al-Hasan"],
    ["What did the Prophet ﷺ pray for them?", "That Allah loves them", "and say: O Allah, love them both"],
    ["Which two children did he ﷺ hold?", "Usamah and Al-Hasan", "He would take Usamah", "and al-Hasan"],
    ["What did he ﷺ ask Allah for them?", "To love them", "and say: O Allah, love them both"],
    ["The Prophet ﷺ showed his love to children openly.", "True", "for I love them both"]
  ],
  // Abu Hurairah said: he said: travel is a piece of torment; it keeps one of you from his food, his drink and his
  // sleep. So when he has done what he came for, let him hurry home to his family (Sahih al-Bukhari 1804).
  "sign-hurry-home": [
    ["What does travel keep a person from, he ﷺ said?", "Eating, drinking and sleeping well", "it keeps one of you from his food", "and his sleep"],
    ["When your work on a journey is done, what should you do?", "Hurry back to your family", "let him hurry home to his family"],
    ["Once your work is done, it is best to stay away a long time.", "False", "let him hurry home to his family"]
  ],
  // Abu Hurairah said: he said: the people of Yemen have come to you; they are more gentle and soft-hearted. Faith is
  // Yemeni, and wisdom is Yemeni; pride and haughtiness are among the owners of camels, and calm and dignity among the
  // owners of sheep (Sahih al-Bukhari 4388).
  "sign-soft-hearts-of-yemen": [
    ["Where did Abu Musa's people come from?", "Yemen", "The people of Yemen have come to you"],
    ["How did the Prophet ﷺ describe the people of Yemen?", "Gentle and soft-hearted", "they are more gentle and soft-hearted"],
    ["The Prophet ﷺ said faith and wisdom are Yemeni.", "True", "faith is Yemeni", "and wisdom is Yemeni"]
  ],
  // Urwah said: Usamah was asked, while I was sitting there, how he travelled in the Farewell Hajj when he set off from
  // Arafat. Usamah said: he went at a modest pace, and when he found an open space, he went faster (Sahih al-Bukhari
  // 1666).
  "sign-a-modest-pace": [
    ["What did he ﷺ do when there was enough space?", "He went faster", "he went faster"],
    ["On which Hajj was Usamah asked about this?", "The Farewell Hajj", "in the Farewell Hajj, setting off"],
    ["Usamah said he ﷺ went at a modest pace from Arafat.", "True", "Usamah said: he went at a modest pace"]
  ],
  // Anas ibn Malik passed by some boys and greeted them with salam, and said: he used to do so (Sahih al-Bukhari 6247).
  // (Whom Anas greeted stays as it is, since the boys at play are there from the scene's start.)
  "sign-salam-to-the-boys": [
    ["Why did Anas say salam to the boys?", "The Prophet ﷺ used to do so", "Anas said: he used to do so"],
    ["Saying salam to children is part of the Sunnah.", "True", "and greeted them with salam", "Anas said: he used to do so"]
  ],
  // Anas ibn Malik said: he saw some women and children coming back from a wedding, and he stood up, energetic and
  // happy, and said: by Allah, you are among the people most beloved to me, meaning the Ansar (Sahih al-Bukhari 5180).
  // (Who the guests were stays as it is, since nothing in the scene shows that they were of the Ansar.)
  "sign-joy-at-a-wedding": [
    ["How did he ﷺ react to the wedding guests?", "He stood up happily", "he stood up, energetic and happy"],
    ["A wedding is a happy time in Islam.", "True", "coming back from a wedding", "he stood up, energetic and happy"]
  ],
  // Aishah said: whenever he had a choice between two things, he took the easier of them, as long as it was not a sin;
  // if it was a sin, he was the farthest of people from it. And he never took revenge for himself, unless what Allah
  // made sacred was violated (Sahih al-Bukhari 3560).
  "sign-the-easier-of-two": [
    ["Which choice did he ﷺ usually take?", "The easier one, if not a sin", "he took the easier of them", "as long as it was not a sin"],
    ["Did he ﷺ take revenge for himself?", "Never", "He never took revenge for himself"],
    ["Islam likes making things easy for people.", "True", "he took the easier of them"]
  ],
  // Aishah said: he would talk so clearly that if one counting wanted to count his words, he could count them all (Sahih
  // al-Bukhari 3567). (That he never rushed his words is not in the scene, which keeps to this hadith, so it stays as it
  // is.)
  "sign-words-you-could-count": [
    ["How did he ﷺ speak?", "Slowly and clearly", "Aishah said: he would talk so clearly"],
    ["What could a person count when he ﷺ spoke?", "His ﷺ words", "that if a counter counted his words", "they could all be counted"]
  ],
  // Abu Hurairah said: al-Hasan ibn Ali took a date of the sadaqah and put it in his mouth, and he said: kikh, kikh,
  // throw it out; do you not know that we do not eat the sadaqah? (Sahih Muslim 1069a). (What al-Hasan took stays as it
  // is, since the heap of sadaqah dates is there from the scene's start.)
  "sign-a-date-of-sadaqah": [
    ["Why did he ﷺ stop him?", "His family eats no sadaqah", "do you not know we do not eat sadaqah?"],
    ["The family of the Prophet ﷺ does not take sadaqah.", "True", "do you not know we do not eat sadaqah?"]
  ],
  // Jabir ibn Abdullah said: he asked his family for a condiment; they said: we have nothing but vinegar. He called for
  // it and ate with it, and said: vinegar is a good condiment. And Jabir said: I have loved vinegar ever since (Sahih
  // Muslim 2052). (What Jabir loved keeps its picture cards.)
  "sign-a-good-condiment": [
    ["What did his family have to eat with the bread?", "Only vinegar", "they said: we have nothing but vinegar"],
    ["He ﷺ ate the plain food at home and praised it.", "True", "he called for it, and ate with it", "and said: vinegar is a good condiment"]
  ],
  // Ibn Umar said: I saw him mount his camel at Dhul-Hulayfah, then begin the talbiyah when it stood upright (Sahih
  // al-Bukhari 1514). (Where he began keeps its map.)
  "sign-labbayk-as-it-rose": [
    ["When exactly did he ﷺ begin?", "When his camel stood up", "then labbayk, as it stood upright"],
    ["Dhul-Hulaifah is the miqat for people from Madinah.", "True", "at Dhul-Hulayfah"]
  ],
  // Umm al-Fadl bint al-Harith said: people by her differed on the day of Arafah about whether he was fasting; some said
  // he is fasting, and some said he is not. So she sent him a bowl of milk while he stood on his camel, and he drank it
  // (Sahih al-Bukhari 1661).
  "sign-a-bowl-of-milk": [
    ["What did the people differ over on the day of Arafah?", "Whether he ﷺ was fasting", "some said: he is fasting", "and some said: he is not fasting"],
    ["How did Umm al-Fadl find out?", "She sent him a bowl of milk", "so Umm al-Fadl sent him a bowl of milk", "and he drank it"],
    ["A question can be settled wisely, without a quarrel.", "True", "so Umm al-Fadl sent him a bowl of milk", "and he drank it"]
  ],
  // Nubayshah al-Hudhali said: he said: the days of Tashriq are days of eating and drinking, and of remembering Allah
  // (Sahih Muslim 1141). (When they fall, and Eid's joy lasting several days, are not in the scene, so they stay as they
  // are.)
  "sign-days-of-tashriq": [
    ["The days of tashriq are for what?", "Eating, drinking and dhikr", "are days of eating", "and of remembering Allah"]
  ],
  // Abdullah ibn Umar said: a man told him that he was often cheated in trade, and he said: when you buy, say: no
  // cheating (Sahih al-Bukhari 2117).
  "sign-say-no-cheating": [
    ["What problem did the man have?", "He was often cheated", "that he was often cheated in trade"],
    ["What was he told to say when buying?", "No cheating", "He said: when you buy", "say: no cheating"],
    ["Islam protects people from being tricked in trade.", "True", "He said: when you buy", "say: no cheating"]
  ],
  // Abdullah ibn Ja'far said: I saw him eating fresh dates with snake cucumbers (Sahih al-Bukhari 5447). (What he ate
  // with the dates stays as it is, since the patch of cucumbers is there from the scene's start.)
  "sign-dates-with-cucumber": [
    ["Who saw him ﷺ eat fresh dates with snake cucumbers?", "Abdullah ibn Ja'far", "Abdullah ibn Ja'far said: I saw him"],
    ["He ﷺ ate fresh dates with snake cucumbers.", "True", "eating fresh dates", "with snake cucumbers"]
  ],
  // Abu Hurairah used to say: the worst food is the food of a wedding feast to which the rich are invited and the poor
  // are left out; and whoever turns down the invitation has disobeyed Allah and His Messenger (Sahih al-Bukhari 5177).
  "sign-the-worst-feast": [
    ["Which wedding food is the worst?", "One that leaves out the poor", "to which only the rich are invited", "and the poor are left out"],
    ["A good wedding meal welcomes the poor as well.", "True", "to which only the rich are invited", "and the poor are left out"],
    ["What about refusing an invitation without reason?", "It is disobeying Allah and His Messenger ﷺ", "has disobeyed Allah and His Messenger"]
  ],
  // Anas said: some meat was brought to him that had been given to Barirah in charity, and he said: it is charity for
  // her, and for us it is a gift (Sahih al-Bukhari 1495).
  "sign-charity-for-barirah": [
    ["Who first got the meat as charity?", "Barirah", "that was given to Barirah in charity"],
    ["Charity changes into a gift once the poor person gives it on.", "True", "He said: it is charity for her", "and for us it is a gift"],
    ["For the Prophet ﷺ the meat was...?", "A gift", "and for us it is a gift"]
  ],
  // Abu Sa'id al-Khudri said: some of the Ansar asked him and he gave them, then they asked again and he gave them,
  // until what he had ran out. He said: whatever good I have, I will never keep it from you; whoever keeps from asking,
  // Allah keeps him chaste; whoever seeks to be free of need, Allah makes him free of need; whoever bears up, Allah
  // makes him patient; and no one is given a gift better and vaster than patience (Sahih al-Bukhari 1469). (That Allah
  // makes content one who keeps from asking is not in the scene's words, so it stays as it is.)
  "sign-the-best-gift": [
    ["The Prophet ﷺ kept back some of what he had from the Ansar.", "False", "until what he had ran out", "He said: I would never keep good from you"],
    ["What does Allah do for one who tries to be patient?", "Makes him patient", "whoever bears up, Allah makes him patient"],
    ["What does Allah do for one who tries patience?", "Makes him patient", "whoever bears up, Allah makes him patient"],
    ["What is the best gift a person can be given?", "Patience", "whoever bears up, Allah makes him patient", "none is given a gift better than patience"],
    ["What is the best blessing, per the hadith?", "Patience", "whoever bears up, Allah makes him patient", "none is given a gift better than patience"]
  ],
  // Abdullah ibn Amr ibn al-As said: he said: successful is the one who has accepted Islam, is given just what is
  // enough, and whom Allah makes content with what He has given him (Sahih Muslim 1054).
  "sign-content-with-enough": [
    ["Who is successful, in the hadith?", "One who accepted Islam", "has accepted Islam"],
    ["Who is successful, per the hadith?", "A Muslim given enough and content", "has accepted Islam", "and Allah makes him content with it"],
    ["How much provision does the successful one have, in the hadith?", "Sufficient for his needs", "is given just what is enough"],
    ["Success needs much more than enough.", "False", "is given just what is enough", "and Allah makes him content with it"],
    ["What did Allah make him feel, in the hadith?", "Content", "and Allah makes him content with it"],
    ["Who makes the heart content?", "Allah", "and Allah makes him content with it"]
  ],
  // Aishah said: he was asked which deeds are most loved by Allah, and he said: the most constant of them, even if they
  // are few; and he said: take on of deeds only what you can bear (Sahih al-Bukhari 6465). (Laylat al-Qadr is not in the
  // scene, so it stays as it is; Jibril going over the Quran with him is asked on its own scene.)
  "sign-constant-deeds": [
    ["Which deed does Allah love most?", "The one done regularly", "He said: the most constant", "even if they are few"],
    ["Which deeds does Allah love most?", "Regular, constant ones", "He said: the most constant", "even if they are few"],
    ["The deeds Allah loves most are done ____, even if small.", "regularly", "He said: the most constant", "even if they are few"],
    ["Is a small deed every day a good thing?", "Yes, Allah loves it", "He said: the most constant", "even if they are few"],
    ["A small deed done daily is beloved to Allah.", "True", "He said: the most constant", "even if they are few"],
    ["Doing a lot once is better than a little every day.", "False", "He said: the most constant", "even if they are few"],
    ["What else did he advise?", "Do what is in your ability", "and said: take on deeds you can bear"]
  ],
  // Abdullah ibn Mas'ud said: he said: when you are three, no two should talk in secret, leaving out the third, until
  // you are with other people, for that would grieve him (Sahih al-Bukhari 6290; Sahih Muslim 2184). Why it is wrong
  // waits on the third being left out, where a grey ring comes about it.
  "sign-a-group-of-three": [
    ["Three friends sit together. What should two of them not do?", "Whisper and leave one out", "no two should talk in secret", "leaving out the third"],
    ["Why is it wrong to whisper and leave one person out?", "It can make him sad", "leaving out the third"],
    ["Two of three may whisper, leaving the third out.", "False", "no two should talk in secret", "leaving out the third"],
    ["When three sit together, what should two not do?", "Whisper without the third", "no two should talk in secret", "leaving out the third"],
    ["Why not, per Bukhari 6290?", "It would grieve him", "leaving out the third"],
    ["Good manners protect others' feelings.", "True", "until you are with other people", "for that would grieve him"],
    ["When may two talk privately, per Muslim 2184?", "When others join the third", "until you are with other people"],
    ["What might whispering do to the third?", "Hurt his feelings", "leaving out the third"],
    ["Islam teaches us to include people nearby.", "True", "until you are with other people", "for that would grieve him"]
  ],
  // Samurah ibn Jundub said: he said: the dearest words to Allah are four: Subhan Allah, al-hamdu lillah, la ilaha illa
  // Allah and Allahu akbar; it does not matter which of them you begin with (Sahih Muslim 2137a).
  "sign-four-dearest-words": [
    ["How many are the dearest words to Allah?", "Four", "He said: four words are dearest to Allah"],
    ["Which is one of the four?", "Alhamdulillah", "Subhan Allah, and al-hamdu lillah"],
    ["The four words must be said in one fixed order.", "False", "it does not matter which you begin with"],
    ["How many words are most loved to Allah in this hadith?", "Four", "He said: four words are dearest to Allah"],
    ["Which of these is one of them?", "Allahu Akbar", "la ilaha illa Allah, and Allahu akbar"],
    ["You must say them in one fixed order.", "False", "it does not matter which you begin with"]
  ],
  // Anas ibn Malik said: he said: whoever looks after two girls until they come of age will come on the Day of
  // Resurrection, I and he, and he joined his fingers (Sahih Muslim 2631). (Who narrated it is not in the scene's words,
  // and the two are there from the scene's start, so those stay as they are.)
  "sign-two-raised-well": [
    ["How close will the one who raises two girls be to the Prophet ﷺ?", "Like two fingers together", "I and that one, and he joined his fingers"],
    ["Until when must they be raised well?", "Until they grow up", "until they come of age"],
    ["What did the Prophet ﷺ show with his fingers?", "Nearness to him", "I and that one, and he joined his fingers"]
  ],
  // Aishah said: when he came to one who was ill, he would say: take away the harm, O Lord of the people; heal, for You
  // are the Healer; there is no healing but Your healing, a healing that leaves no illness (Sahih al-Bukhari 5675).
  "sign-a-dua-for-the-sick": [
    ["Whom do we ask for healing in the du'a?", "Allah, Lord of the people", "he said: take away the harm", "O Lord of the people"],
    ["What kind of healing does the du'a ask for?", "Healing that leaves no illness", "a healing that leaves no illness"],
    ["Only Allah truly heals.", "True", "heal, for You are the Healer", "there is no healing but Your healing"],
    ["When did the Prophet ﷺ say this dua?", "When visiting the sick", "When he came to one who was ill"],
    ["What does the dua call Allah?", "The One Who cures", "heal, for You are the Healer"],
    ["Which cure does the dua ask for?", "One that leaves no illness", "a healing that leaves no illness"]
  ],
  // Al-Miqdam said: he said: no one has ever eaten food better than what he eats from the work of his own hands, and the
  // Prophet of Allah Dawud used to eat from the work of his hands (Sahih al-Bukhari 2072).
  "sign-the-work-of-his-hands": [
    ["What is the best food, the Prophet ﷺ said?", "What you earn with your hands", "better than what one eats", "from the work of one's own hands"],
    ["Whose example did he ﷺ give?", "Dawud's", "and Allah's Prophet Dawud"],
    ["Dawud lived off the treasury because he was king.", "False", "used to eat from the work of his hands"],
    ["What is the best meal, in the hadith?", "One earned by your own hands", "better than what one eats", "from the work of one's own hands"],
    ["From what did Dawud eat, in the hadith?", "The earnings of his own labour", "used to eat from the work of his hands"],
    ["Honest work is honoured in Islam.", "True", "better than what one eats", "from the work of one's own hands"]
  ],
  // Jabir ibn Abdullah said: he said: every good deed is charity (Sahih al-Bukhari 6021). (Helping one's mother at home
  // is not in the scene, so it stays as it is.)
  "sign-every-good-is-charity": [
    ["What counts as charity?", "Every good deed", "every good deed", "is charity"],
    ["Can a child with no money give charity?", "Yes, by doing good", "every good deed", "is charity"],
    ["Charity is only about money.", "False", "every good deed", "is charity"],
    ["What is every good deed?", "A charity", "is charity"],
    ["Only rich people can give charity.", "False", "every good deed", "is charity"],
    ["Which good deeds count as charity?", "Every good deed", "every good deed", "is charity"],
    ["Only money can be charity.", "False", "every good deed", "is charity"]
  ],
  // Al-Agharr al-Muzani said: he said: O people, turn to Allah in repentance, for I turn to Him in repentance a hundred
  // times a day (Sahih Muslim 2702b; in 2702a: I ask Allah's forgiveness a hundred times a day). (The word that asks
  // forgiveness is not in the scene's words, so it stays as it is.)
  "sign-a-hundred-times-a-day": [
    ["How many times a day did the Prophet ﷺ ask forgiveness?", "A hundred", "to Him a hundred times a day"],
    ["Only people with big sins need istighfar.", "False", "for I turn in repentance", "to Him a hundred times a day"],
    ["Whom did the Prophet ﷺ tell to repent?", "All people", "He said: O people, turn to Allah"],
    ["How many times a day did he repent?", "A hundred", "to Him a hundred times a day"],
    ["Asking forgiveness often is a Sunnah.", "True", "for I turn in repentance", "to Him a hundred times a day"]
  ],
  // Jabir ibn Samurah said: he came out to us and saw us in circles, and said: why do I see you apart, in groups? Then
  // he came out to us again and said: will you not draw up in rows as the angels draw up before their Lord? We asked:
  // how do the angels draw up before their Lord? He said: they complete the first rows, and keep close together in the
  // row (Sahih Muslim 430). (What Ibn Abbas said al-izin means is not in the scene's words, so it stays as it is.)
  "sign-close-in-the-rows": [
    ["How do angels make rows, in the hadith?", "Front rows first, standing close", "He said: they complete the first rows", "and keep close together in the row"],
    ["What did the Prophet ﷺ ask the people?", "Why not form rows like angels?", "He came again and said: why not draw up", "in rows as angels do before their Lord?"],
    ["Neat prayer rows follow the way of the angels.", "True", "He said: they complete the first rows", "and keep close together in the row"],
    ["What did the Prophet ﷺ ask people to form?", "Rows like the angels", "He came again and said: why not draw up", "in rows as angels do before their Lord?"],
    ["The Prophet ﷺ disliked seeing people split into groups.", "True", "He said: why do I see you apart in groups?"]
  ],
  // Zayd ibn Arqam said: I heard Abdullah ibn Ubayy say: do not spend on those who are with him, so that they go away
  // from him. I told my uncle, or Umar, who told him; Ibn Ubayy and his folk swore they had not said it, and he believed
  // him and not me, and I grieved. Then Allah revealed Surah al-Munafiqun, and he sent for me, recited it and said:
  // Allah has confirmed you, O Zayd (Sahih al-Bukhari 4900). (The ayahs of the surah, on what the hypocrites are like
  // and whose the treasures are, are not in the scene, so those stay as they are.)
  "sign-zayd-was-truthful": [
    ["Who heard the hypocrite and reported him?", "Zaid bin Arqam", "Zayd: I heard Abdullah ibn Ubayy say", "I told my uncle or Umar, who told him"],
    ["How did Zaid feel when he was not believed?", "Very sad", "He believed him, not me, and I grieved"],
    ["Allah revealed Al-Munafiqun and confirmed Zaid.", "True", "Then he sent for me and recited it", "and said: Allah has confirmed you, O Zayd"]
  ],
  // Anas ibn Malik said: three came to the homes of his wives, asking about his worship, and when they were told, they
  // thought it little: one said he would pray all night, always; another that he would fast and never break it; another
  // that he would never marry. He said: but I fast and break my fast, I pray and I sleep, and I marry; whoever turns
  // from my Sunnah is not of me (Sahih al-Bukhari 5063). (Who narrated it is not in the scene's words, so that stays as
  // it is.)
  "sign-this-is-my-sunnah": [
    ["What did one of the three men want to give up?", "Marriage", "Another: I will not marry, ever"],
    ["What did the Prophet ﷺ say about marriage?", "He married; it is his sunnah", "I pray and I sleep, and I marry", "Whoever turns from my Sunnah is not of me"],
    ["Never marrying makes you more pious.", "False", "I pray and I sleep, and I marry", "Whoever turns from my Sunnah is not of me"],
    ["What did one of the three men want?", "To pray all night forever", "One said: I will pray all night, always"],
    ["What did the Prophet ﷺ say he does with fasting?", "He fasts and breaks his fast", "He said: but I fast and break my fast"],
    ["The Sunnah is to never sleep and pray all night.", "False", "I pray and I sleep, and I marry"]
  ],
  // Jabir ibn Abdullah said: he said: when one of you has been away a long time, he should not come to his family at
  // night (Sahih al-Bukhari 5244). (The trust it teaches, why it is good manners, and catching one's wife out are not in
  // the scene, so those stay as they are.)
  "sign-not-home-at-night": [
    ["Back from a long trip, how should you come home?", "Not suddenly at night", "he should not come to his family", "at night"],
    ["After a long trip, when should you not arrive home?", "At night", "at night"],
    ["This is about a long time away from home.", "True", "He said: when one of you is long away"]
  ],
  // Ya'la ibn Umayyah said: I said to Umar ibn al-Khattab: the people are now safe. He said: I wondered at what you
  // wonder at, so I asked him about it, and he said: it is a charity Allah gives you, so accept His charity (Sahih
  // Muslim 686a). Who asked him waits at the scene's start, before Ya'la names Umar. (What may be shortened and who may
  // shorten it are not in the scene's words or are there from its start, and the other ayahs of An-Nisa are not in it,
  // so those stay as they are.)
  "sign-a-charity-for-travellers": [
    ["The Prophet ﷺ called the shortened prayer a what?", "A charity from Allah", "He said: it is a charity Allah gives you", "so accept His charity"],
    ["What did the Prophet ﷺ call shortening the prayer?", "A charity from Allah to accept", "He said: it is a charity Allah gives you", "so accept His charity"],
    ["Who asked the Prophet ﷺ about it when people were safe?", "Umar ibn al-Khattab", "Ya'la said to Umar ibn al-Khattab", "so I asked him about it"]
  ],
  // Abu Salih taught, from Abu Hurairah, from him: when one of us goes to sleep, lie on the right side, then say: O
  // Allah, Lord of the heavens and the earth, Splitter of the grain and the date-stone; You are the First, there is
  // nothing before You; You are the Last, there is nothing after You; You are the Evident and the Innermost; settle our
  // debt and free us from want (Sahih Muslim 2713). The same four names are in Al-Hadid 57:3. (The scene's words leave
  // out nothing above You and nothing beyond You, so the questions on Az-Zahir and Al-Batin stay as they are, as do
  // everything glorifying Allah and Allah being with you wherever you are.)
  "sign-before-you-sleep": [
    ["What does Allah call Himself in Al-Hadid?", "The First and the Last", "You are the First, nothing before You", "and the Last, nothing after You"],
    ["Ayahs 1-6: what are they about?", "The First and the Last", "You are the First, nothing before You", "and the Last, nothing after You"],
    ["Ayah 3: what does Allah call Himself?", "The First and the Last", "You are the First, nothing before You", "and the Last, nothing after You"],
    ["What does Al-Awwal mean, per the dua?", "The First, nothing before Him", "You are the First, nothing before You"],
    ["What does Al-Akhir mean, per the dua?", "The Last, nothing after Him", "and the Last, nothing after You"],
    ["Allah had no beginning and has no end.", "True", "You are the First, nothing before You", "and the Last, nothing after You"],
    ["How many names of Allah are in 57:3?", "Four", "You are the First, nothing before You", "You are the Evident and the Innermost"]
  ],
  // Umar said: when Hafsah was widowed, I met Uthman and offered her to him, and he said: I will not marry now. Then I
  // offered her to Abu Bakr, who was silent, and I was angrier with him. Then he asked for her, and I married her to
  // him. Abu Bakr said: perhaps you were angry with me; nothing held me back but that I knew he had spoken of her, and I
  // would not tell his secret (Sahih al-Bukhari 4005). (Whose father Umar was, and when Hafsah's first husband died, are
  // not in the scene's words, so those stay as they are.)
  "sign-a-secret-not-told": [
    ["Whom did Umar first ask to marry Hafsah?", "Uthman ibn Affan", "Umar: I met Uthman and offered him Hafsah"],
    ["Who married Hafsah in the end?", "The Prophet ﷺ", "He asked for her; I married her to him"],
    ["Why had Abu Bakr stayed quiet?", "He kept the Prophet's ﷺ secret", "Nothing held me back but that I knew", "he had spoken of her; I kept his secret"]
  ],
  // Abu Sa'id al-Khudri said: he said: Allah will say to the people of Paradise: O people of Paradise! They will say: at
  // Your service, our Lord. Allah will say: are you pleased? They will say: why would we not be pleased, when You have
  // given us what You have not given anyone of Your creation? Allah will say: I will give you better than that. They
  // will say: our Lord, what is better than that? Allah will say: I bestow My pleasure on you, and I will never be angry
  // with you after it (Sahih al-Bukhari 6549). At-Tawbah 9:72 too says the pleasure of Allah is greater. Nothing is
  // drawn for Allah: His words are the lines only. (Why Ibn Kathir links it to Ta-Ha 20:130 is not in the scene, so that
  // stays as it is.)
  "sign-never-angry-again": [
    ["What is the best gift in Jannah?", "Allah's pleasure forever", "Allah: My pleasure, and never angry again"],
    ["What does Allah promise them?", "To never be angry with them", "Allah: My pleasure, and never angry again"],
    ["Allah's approval is greater than gardens.", "True", "Allah: My pleasure, and never angry again"],
    ["What is the greatest bliss, in 9:72?", "The pleasure of Allah", "Allah: My pleasure, and never angry again"],
    ["What will Allah give that is better than Paradise?", "His pleasure forever", "Allah: My pleasure, and never angry again"],
    ["After that, Allah will never be angry with them.", "True", "Allah: My pleasure, and never angry again"],
    ["What will Allah ask the people of Paradise?", "Are you pleased?", "Allah will say: are you pleased?"],
    ["What is better than all they were given?", "Allah's lasting pleasure", "Allah: My pleasure, and never angry again"],
    ["What does Allah give that is better than all?", "His pleasure", "Allah: My pleasure, and never angry again"],
    ["Will Allah be angry with them after?", "Never", "Allah: My pleasure, and never angry again"],
    ["Allah asks the people of Paradise if they are pleased.", "True", "Allah will say: are you pleased?"],
    ["What will He give that is better than all?", "His pleasure forever", "Allah: My pleasure, and never angry again"],
    ["Allah may later become angry with the people of Paradise.", "False", "Allah: My pleasure, and never angry again"]
  ],
  // Abu Hurairah said: he said: Allah has ninety-nine names, a hundred less one; whoever knows them will enter Paradise
  // (Sahih al-Bukhari 2736). The names are counted as glints, and no letter is drawn. The lessons on Al-A'raf 7:172-188
  // and Al-Hashr 59:18-24 open on it, since Allah's most beautiful names are in 7:180 and 59:24. (Calling on Him by
  // them, what Ibn Kathir says of their number, and the other ayahs are not in the scene, so those stay as they are.)
  "sign-ninety-nine-names": [
    ["How many names of Allah are in the hadith?", "Ninety-nine", "He said: Allah has ninety-nine names", "a hundred less one"],
    ["What is the reward for knowing them?", "Jannah", "whoever knows them will enter Paradise"],
    ["Learning Allah's names is a great deed.", "True", "whoever knows them will enter Paradise"],
    ["How many names are in Bukhari 2736?", "Ninety-nine", "He said: Allah has ninety-nine names", "a hundred less one"],
    ["Ayahs 172-188: what are they about?", "The most beautiful names", "He said: Allah has ninety-nine names"],
    ["How many names of Allah did the Prophet ﷺ mention?", "Ninety-nine", "He said: Allah has ninety-nine names", "a hundred less one"],
    ["Ayahs 18-24: what are they about?", "The beautiful names", "He said: Allah has ninety-nine names"]
  ],
  // Abu Musa said: he said: many men reached perfection, but of women none reached it except Asiyah, Pharaoh's wife, and
  // Maryam, the daughter of Imran; and the excellence of Aishah over other women is like the excellence of tharid over
  // other food (Sahih al-Bukhari 3411; also 3433, and from Anas 3770). At-Tahrim 66:11-12 gives Pharaoh's wife and
  // Maryam as examples for the believers. No place is drawn for Asiyah or Maryam. (Who narrated it, what tharid is,
  // Maryam's son, and what Pharaoh's wife asked for are not in the scene's words or picture, so those stay as they are.)
  "sign-the-best-of-women": [
    ["Which two women did the Prophet ﷺ name as reaching perfection?", "Asiyah and Maryam", "but of women only Asiyah, Pharaoh's wife,", "and Maryam, the daughter of Imran"],
    ["Asiyah was the wife of whom?", "Pharaoh", "but of women only Asiyah, Pharaoh's wife,"],
    ["A bad husband stopped Asiyah from reaching Allah's pleasure.", "False", "but of women only Asiyah, Pharaoh's wife,"],
    ["Which two women did the Prophet ﷺ say reached perfection?", "Asiyah and Maryam", "but of women only Asiyah, Pharaoh's wife,", "and Maryam, the daughter of Imran"],
    ["Asiyah kept her faith while living in Fir'awn's palace.", "True", "but of women only Asiyah, Pharaoh's wife,"],
    ["Which two women in 66:11-12 reached perfection?", "Asiyah and Maryam", "but of women only Asiyah, Pharaoh's wife,", "and Maryam, the daughter of Imran"],
    ["No woman ever reached perfection.", "False", "but of women only Asiyah, Pharaoh's wife,"],
    ["Who are examples for believers, in At-Tahrim?", "Pharaoh's wife and Maryam", "but of women only Asiyah, Pharaoh's wife,", "and Maryam, the daughter of Imran"],
    ["Who was Asiyah's husband?", "Pharaoh", "but of women only Asiyah, Pharaoh's wife,"],
    ["Asiyah, Pharaoh's wife, believed in Allah.", "True", "but of women only Asiyah, Pharaoh's wife,"],
    ["Who was Maryam's father?", "Imran", "and Maryam, the daughter of Imran"],
    ["The Prophet ﷺ compared Aishah's virtue over women to what?", "Tharid over other food", "is like that of tharid over other food"]
  ],
  // Abu Hurairah said: he said: leave me as I leave you; those before you were ruined only by their questions and their
  // differing over their prophets. So when I forbid you something, keep away from it, and when I order you to do
  // something, do of it as much as you can (Sahih al-Bukhari 7288). At-Taghabun 64:16 has the same words: fear Allah as
  // much as you can. (Who narrated it, where Ibn Kathir quotes it, and the other ayahs are not in the scene's words, so
  // those stay as they are.)
  "sign-as-much-as-you-can": [
    ["How much should we fear Allah, in At-Taghabun?", "As much as we can", "as much as you can"],
    ["Ayahs 11-18: what are they about?", "Fear Allah as you can", "as much as you can"],
    ["Ayah 16: how much should we fear Allah?", "As much as we can", "as much as you can"],
    ["How much of a command should we do?", "As much as we can", "as much as you can"],
    ["What should we do with what he forbids?", "Keep away from it", "When I forbid you something, avoid it"],
    ["What should we do with what he forbade?", "Keep away from it", "When I forbid you something, avoid it"],
    ["What should we do with what he ordered?", "Do as much as we can", "When I order you to do something, do of it", "as much as you can"]
  ],
  // Mu'awiyah said: I heard him say: when Allah wants good for someone, He makes him understand the religion; I only
  // share out, and Allah gives; and this nation will stay on Allah's command, not harmed by those who oppose them, until
  // Allah's command comes (Sahih al-Bukhari 71). (Why a group stays back to learn in At-Tawbah 9:122, warning their
  // people when they return, and the link Ibn Kathir makes to Ta-Ha 20:2 are not in the scene, so those stay as they
  // are.)
  "sign-understanding-the-religion": [
    ["What does Allah give someone He wants good for?", "Understanding of the religion", "Allah makes him understand the religion"],
    ["He ﷺ said: I distribute, but who gives?", "Allah", "I only share out, and Allah gives"],
    ["Learning your deen is a sign of good.", "True", "He said: when Allah wants good for one,", "Allah makes him understand the religion"],
    ["What does Allah give one He wants good for?", "Understanding of the religion", "Allah makes him understand the religion"],
    ["Who is the true giver, in the hadith?", "Allah", "I only share out, and Allah gives"]
  ],
  // Al-Bara said: on the day of the Confederates, when he dug the trench, I saw him carrying the earth of the trench,
  // and I heard him chanting Ibn Rawahah's words as he carried it: O Allah, without You we would not be guided, nor give
  // in charity, nor pray; so send calm on us and make our feet firm if we meet them; they have wronged us, and if they
  // want trial, we refuse; and he drew out his voice at the end (Sahih al-Bukhari 4106). The lesson on Al-Ahzab 33:9-20,
  // the Battle of the Trench, opens on it. (The wind and the unseen soldiers, the hearts reaching the throats, and the
  // other ayahs are not in the scene, so those stay as they are.)
  "sign-earth-from-the-trench": [
    ["Whose verses did the Prophet ﷺ recite at the Trench?", "Ibn Rawahah's", "I heard him chant Ibn Rawahah's words:"],
    ["What did the verses say?", "Without You we would not be guided", "O Allah, without You we'd not be guided"],
    ["The Prophet ﷺ carried earth with the companions.", "True", "Al-Bara: on the day of the Confederates", "he dug the trench; I saw him carry earth"],
    ["Ayahs 9-20: what are they about?", "The Battle of the Trench", "Al-Bara: on the day of the Confederates", "he dug the trench; I saw him carry earth"]
  ],
  // Jarir ibn Abdullah said: he said: whoever is not merciful to others will not be shown mercy (Sahih al-Bukhari 6013).
  // The thirsty sheep given water shows mercy is for all, not only for one's own family.
  "sign-who-is-not-merciful": [
    ["Who heard the Prophet ﷺ say: whoever is not merciful is not shown mercy?", "Jarir ibn Abdullah", "Jarir ibn Abdullah heard him say:"],
    ["How can you hope for Allah's mercy, from this lesson?", "Be merciful to others", "Whoever is not merciful to others", "will not be shown mercy"],
    ["Mercy in Islam is only for your own family.", "False", "Whoever is not merciful to others"]
  ],
  // Ibn Abbas said: he said: there are two blessings that many people are deceived into losing: health and free time
  // (Sahih al-Bukhari 6412). The lesson on Al-'Asr 103:1-2 opens on it too. (The oath by time, the loss in ayah 2, what
  // those ayahs are about, and good uses of free time are not in the scene, so those stay as they are.)
  "sign-health-and-free-time": [
    ["Which two blessings did the Prophet ﷺ say many waste?", "Health and free time", "health and free time"],
    ["Which two blessings do many people waste?", "Health and free time", "health and free time"],
    ["Free time is not a blessing.", "False", "health and free time"]
  ],
  // Jarir ibn Abdullah said: I gave him the pledge to keep up the prayer, to pay the zakat, and to be sincere to every
  // Muslim (Sahih al-Bukhari 57).
  "sign-sincere-to-every-muslim": [
    ["Who made this promise to the Prophet ﷺ?", "Jarir ibn Abdullah", "Jarir: I gave him the pledge"],
    ["Which worship was in his pledge?", "Prayer and zakat", "to keep up the prayer, to pay the zakat,"],
    ["To whom did Jarir pledge sincerity?", "Every Muslim", "and to be sincere to every Muslim"],
    ["Prayer, zakat, and what else did Jarir promise?", "Sincerity to every Muslim", "and to be sincere to every Muslim"],
    ["Wishing good for others is part of Islam.", "True", "and to be sincere to every Muslim"],
    ["Wishing good for other Muslims is part of the religion.", "True", "and to be sincere to every Muslim"]
  ],
  // Anas said: he used to say: O Allah, I seek refuge with You from worry and grief, from incapacity and laziness, from
  // cowardice and miserliness, from being heavily in debt and from being overpowered by men (Sahih al-Bukhari 6369).
  // Nothing is drawn for Allah, and what refuge is sought from shows as grey signs off to the side.
  "sign-refuge-from-worry": [
    ["The Prophet ﷺ used to say this dua himself.", "True", "Anas: he used to say:", "O Allah, I seek refuge with You"],
    ["Which two feelings does this dua start with?", "Worry and grief", "from worry and grief,"],
    ["What two feelings does this dua start with?", "Worry and grief", "from worry and grief,"],
    ["Which of these is also in the dua?", "Laziness", "from incapacity and laziness,"],
    ["Which of these does it also seek refuge from?", "Laziness", "from incapacity and laziness,"],
    ["The Prophet ﷺ asked Allah's help against heavy debt.", "True", "from being heavily in debt,"]
  ],
  // Abu Hurairah said: he said: a woman is married for four things: her wealth, her family status, her beauty and her
  // religion; so marry the religious woman (Sahih al-Bukhari 5090). (Character, and what to ask about a match, are not
  // in the hadith or the scene, so those stay as they are.)
  "sign-married-for-four": [
    ["How many reasons for marriage are named?", "Four", "He said: a woman is married for four:"],
    ["Which of the four did the Prophet ﷺ say to choose?", "Religion", "So marry the religious woman"],
    ["Beauty is the most important reason to marry.", "False", "So marry the religious woman"],
    ["A wise marriage choice looks beyond surface things.", "True", "So marry the religious woman"]
  ],
  // Aishah said: I never saw a woman I would love to be like more than Sawdah bint Zam'ah. When she grew old, she gave
  // her day with him to Aishah, so he gave Aishah two days, her own day and Sawdah's day (Sahih Muslim 1463, 1463b).
  // (That Sawdah married him after Khadijah passed away is not in the scene, so that stays as it is.)
  "sign-sawdah-gave-her-day": [
    ["Sawdah and Aishah were enemies.", "False", "Aishah: I never saw a woman I'd love", "to be like more than Sawdah bint Zam'ah"],
    ["What did Aishah wish about Sawdah?", "To be just like her", "to be like more than Sawdah bint Zam'ah"],
    ["When did Sawdah give her day to Aishah?", "When she grew old", "When Sawdah grew old,"]
  ],
  // Abu Hurairah said: he said: a believing man should not hate a believing woman; if he dislikes one of her traits, he
  // will be pleased with another (Sahih Muslim 1468b). (Who narrated it, and the dua for a family that brings comfort,
  // are not in the scene, so those stay as they are.)
  "sign-pleased-with-another": [
    ["A believing man should not ____ a believing woman.", "hate", "He said: a believing man should not hate"],
    ["If one habit bothers you, remember the ____ ones.", "good", "another will please him"],
    ["If a husband dislikes one trait in his wife, what should he remember?", "He will like another", "another will please him"]
  ],
  // Jabir ibn Abdullah said: he said: beware of wrongdoing, for wrongdoing is darkness on the Day of Resurrection; and
  // beware of stinginess, for stinginess destroyed those before you (Sahih Muslim 2578). Only the wrongdoer shows on the
  // Day's pale plain. (Who fails in Ta-Ha 20:111, and that Ibn Kathir quotes it under Al-Hashr 59:9, are not in the
  // scene, so those stay as they are.)
  "sign-beware-of-wrongdoing": [
    ["What is oppression on Judgment Day?", "Darkness", "for wrongdoing is darkness"],
    ["What will wrongdoing become, in the hadith?", "Darkness on that Day", "for wrongdoing is darkness", "on the Day of Resurrection"],
    ["What else does the hadith warn against?", "Stinginess", "and beware of stinginess,"],
    ["What destroyed those before us?", "Stinginess", "and beware of stinginess,", "for stinginess destroyed those before you"]
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
