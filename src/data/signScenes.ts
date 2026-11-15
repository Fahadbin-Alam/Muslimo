import { bukhari, muslim, quran, tirmidhi, type MapSource } from "./seerahMap";

/**
 * The signs in creation, alive. The lessons about the ayahs that ask us to look at Allah's signs in the world open on
 * a living scene of their own, in the place of their photo, as the lessons about the moon open on the moon's sky
 * (moonSky.ts):
 *
 * - rain on a dead land, which comes to life: so will the dead be raised (Quran 35:9, 7:57);
 * - the clouds driven, brought together and piled up, and the rain coming out from within them (Quran 24:43, 30:48);
 * - the crops that grow green, then turn yellow and become broken straw: so is the life of this world (Quran 57:20,
 *   18:45);
 * - the seed that grows seven ears, with a hundred grains in each, for those who spend in Allah's way (Quran 2:261);
 * - the two seas, one sweet and one salty, with a barrier between them (Quran 25:53, 55:19, 55:20);
 * - the ships that sail the sea by His command, tall like mountains (Quran 22:65, 42:32, 45:12);
 * - the earth spread out, and the mountains set firm on it like pegs (Quran 78:6, 78:7, 16:15);
 * - the bee, inspired to make its homes in the mountains and the trees, and its honey of many colors, with healing in
 *   it (Quran 16:68, 16:69);
 * - the spider's house, the weakest of houses (Quran 29:41);
 * - the good word, like a good tree whose root is firm and whose branches are in the sky (Quran 14:24, 14:25), drawn
 *   as a date palm, the tree the Prophet ﷺ likened to the Muslim (Sahih al-Bukhari 4698);
 * - the camel, the sky, the mountains and the earth that we are told to look at (Quran 88:17 to 88:20);
 * - the birds above us, their wings spread and folded in, held up by none but the Most Merciful (Quran 67:19, 16:79,
 *   24:41);
 * - the seed we sow, which Allah makes grow (Quran 56:63, 56:64);
 * - the water we drink, sent down from the clouds, sweet and not salty (Quran 56:68 to 56:70);
 * - the fire we kindle from the green tree, a reminder and a gift for travelers (Quran 56:71 to 56:73, 36:80);
 * - the shade He stretches out, the sun its guide, drawn in little by little (Quran 25:45, 25:46);
 *
 * and the parables told with things in creation (parableArt.ts draws them):
 *
 * - the foam on the flood and on melted metal, which passes away, while what benefits people remains (Quran 13:17);
 * - the rain on three lands: good, hard and barren (Sahih al-Bukhari 79; the good land, Quran 7:58);
 * - the deeds of those who reject their Lord, like ashes in a stormy wind (Quran 14:18);
 * - the garden struck in the night, black and bare by the morning (Quran 68:17 to 68:24);
 * - the two gardens of grapes, with palms around and crops between, whose fruit was destroyed (Quran 18:32 to 18:42);
 *
 * and the signs in the stories of the Quran (storyArt.ts and historyArt.ts draw them):
 *
 * - Nuh's ark, built of planks and nails, two of each kind carried in it, sailing on waves like mountains and coming to
 *   rest on al-Judi (Quran 11:37 to 11:44, 54:11 to 54:13);
 * - the sea split for Musa, each side like a great mountain, with a dry path through it (Quran 26:61, 26:63, 20:77);
 * - the clouds' shade, the manna and the quails, and the twelve springs from the rock (Quran 2:57, 2:60, 7:160);
 * - the she-camel of Salih, with her day to drink and theirs (Quran 26:149, 26:155, 26:156, 91:13);
 * - the ant who warned the others in their valley (Quran 27:18, 27:19);
 * - the hoopoe, missing, then back with news from Saba, then off with the letter (Quran 27:20, 27:22, 27:23, 27:28);
 * - the king's dream of seven fat cows and seven lean ones, and its meaning (Quran 12:43, 12:47 to 12:49);
 * - the cave, where the sun turned away from the sleepers and their dog lay at the entrance (Quran 18:10, 18:11, 18:17,
 *   18:18);
 * - the elephant held back from Makkah, and the birds in flocks with their stones of baked clay (Quran 105:1 to
 *   105:5, Sahih al-Bukhari 2731);
 * - the winter and summer journeys of Quraysh, fed against hunger and safe from fear (Quran 106:1 to 106:4);
 *
 * and the signs in the stories of the Prophets (prophetArt.ts draws them):
 *
 * - the fire Musa saw by the mount on a dark night, the call from the tree in the holy valley of Tuwa, and his staff
 *   that became a moving snake (Quran 20:10, 20:12, 20:20, 27:7, 28:29, 28:30);
 * - the sorcerers' ropes and staffs that seemed to move, swallowed by Musa's staff, and the truth that stood firm
 *   (Quran 7:117, 7:118, 20:66, 26:44, 26:45);
 * - Musa's journey to where the two seas meet: the fish that took its way into the sea like a tunnel, the hole made in
 *   the boat, the wall about to fall set straight, and the orphans' treasure beneath it (Quran 18:60 to 18:82);
 * - the barrier between two mountains: blocks of iron, blown upon until like fire, molten copper poured over it, and
 *   Ya'juj and Ma'juj unable to climb over it (Quran 18:93 to 18:97);
 * - Yunus: the laden ship, the great fish, the darknesses, the open shore, the gourd plant, and his people who believed
 *   (Quran 37:140 to 37:148, 21:87, 21:88);
 * - the palm tree in a place far away, the stream beneath Maryam and the fresh ripe dates (Quran 19:22 to 19:26);
 *
 * and Allah's favors to His Prophets (favorArt.ts draws them):
 *
 * - the mountains and the birds glorifying Allah with Dawud, the iron made soft for him and the coats of mail with
 *   their rings just right (Quran 21:79, 21:80, 34:10, 34:11, 38:18, 38:19);
 * - the House raised in a valley without crops, with the prayer: our Lord, accept from us; and the call to Hajj, and
 *   the camels coming from every distant path (Quran 14:37, 2:127, 22:26, 22:27);
 * - Safa and Marwah, the seven times between them, the water of Zamzam, and the bird circling over it (Quran 2:158,
 *   Sahih al-Bukhari 3364);
 * - the queen's throne, brought before the glance returned, disguised, and the palace paved with glass (Quran 27:38,
 *   27:40, 27:41, 27:44);
 * - the provision Zakariyya found with Maryam in the mihrab, and his call to his Lord there (Quran 3:37, 3:38);
 * - the great fire made coolness and safety for Ibrahim (Quran 21:68 to 21:70, 37:97);
 *
 * and the trials of the Prophets and of their peoples (trialArt.ts draws them):
 *
 * - 'Ad's towers on every high place, the cloud they took for rain, and the wind sent on them for seven nights and
 *   eight days, after which nothing was seen but their homes; the west wind, the Prophet ﷺ said (Quran 26:128, 46:24,
 *   69:7, 46:25, Sahih al-Bukhari 1035);
 * - the chest Musa's mother cast into the river, his sister following it, the shore by Pharaoh's palace, and Allah
 *   returning him to his mother (Quran 20:39, 28:7 to 28:11, 28:13);
 * - Qarun's treasure, whose keys were a heavy load for strong men, his finery, and the earth swallowing him and his
 *   home (Quran 28:76, 28:78, 28:79, 28:81);
 * - the well of Madyan, the flock held back until the shepherds had gone, watered for the two women, and the shade
 *   where Musa said: my Lord, I am in need (Quran 28:23, 28:24);
 * - Ayyub's call, the ground struck and the cool spring, the golden locusts, and an excellent servant (Quran 21:83,
 *   21:84, 38:42, 38:44, Sahih al-Bukhari 279);
 * - Yusuf's dream of eleven stars, the sun and the moon bowing, kept from his brothers, and made true (Quran 12:4,
 *   12:5, 12:100);
 *
 * and Allah's commands, and the stories told with them (commandArt.ts draws them):
 *
 * - the measure and the balance: woe to those who give less, who take in full and give short; give full measure, and
 *   weigh with a straight balance (Quran 83:1 to 83:3, 26:181, 26:182, 17:35);
 * - Ibrahim's dream, his son's answer, both submitting, the call, the clear test, and the great sacrifice his son was
 *   ransomed with (Quran 37:102 to 37:107);
 * - the qiblah turned from Jerusalem, faced for sixteen or seventeen months in Madinah, to al-Masjid al-Haram, faced
 *   wherever we are (Sahih al-Bukhari 40, Quran 2:144, 2:142);
 * - the two gardens of Saba, the flood of the dam, the bitter fruit after it, and their scattering (Quran 34:15,
 *   34:16, 34:19);
 * - the cow Bani Isra'il were told to sacrifice: neither old nor young, bright yellow, not trained to plough or water,
 *   sound with no blemish (Quran 2:67 to 2:69, 2:71);
 *
 * and Allah's power in the stories (powerArt.ts draws them):
 *
 * - Lut's town: the way out by night, the morning, the town turned upside down, the stones of baked clay, layer on
 *   layer and marked, and the clear sign left of it (Quran 11:81 to 11:83, 29:35);
 * - the signs on Pharaoh's people: years of drought, then the flood, the locusts, the lice, the frogs and the blood, one
 *   after another, each lifted in turn (Quran 7:130, 7:133, 7:135);
 * - the town by the sea, whose fish came on their Sabbath, showing on the water, and not on the other days: a test
 *   (Quran 7:163);
 * - Dhul-Qarnayn given the means to all things, his way to where the sun sets in a murky spring, and to where it rises
 *   on a land with no shelter from it (Quran 18:84 to 18:86, 18:89, 18:90);
 * - Ibrahim's four birds: taken, put on each hill, called, and coming back in haste (Quran 2:260);
 * - the town fallen on its roofs, the hundred years, the food and drink unchanged, and the donkey's bones raised and
 *   clothed with flesh (Quran 2:259);
 * - Yusuf's shirt: sent from Egypt with the caravan, its scent found far away, and his father's sight come back (Quran
 *   12:93, 12:94, 12:96);
 *
 * and more wonders of the stories (wonderArt.ts draws them):
 *
 * - Ibrahim's honored guests: their greeting of peace, the roasted calf he brought and set near them, their hands not
 *   reaching for it, "do not fear", and the good news of a knowing son, Ishaq, and after Ishaq, Ya'qub (Quran 11:69,
 *   51:26 to 51:28, 11:70, 11:71);
 * - asking forgiveness, and what Nuh and Hud told their peoples it brings: rain in abundance, more wealth, gardens and
 *   rivers (Quran 71:10 to 71:12, 11:52);
 * - the wind made to serve Sulayman, a month's journey in the morning and a month's journey in the evening, gently,
 *   wherever he willed, the spring of molten copper, and "work, family of Dawud, in thanks" (Quran 34:12, 21:81, 38:36,
 *   34:13);
 * - Iram of the pillars, Thamud who carved the rocks in the valley, and Pharaoh, owner of the stakes: they spread much
 *   corruption, so a scourge of punishment was poured on them; your Lord is ever watchful (Quran 89:6 to 89:14);
 * - the drinking cup put in a bag of the caravan, the call "O caravan, you are thieves", the camel's load promised for
 *   it, and the bags searched until it was brought out of his brother's bag (Quran 12:70, 12:72, 12:76);
 * - the bird Isa shaped from clay, which became a bird by Allah's permission when he breathed into it, and what they
 *   ate and stored in their homes (Quran 3:49, 5:110);
 * - the parable of one who kindled a fire, whose light Allah took away, and of the rainstorm, with its darkness,
 *   thunder and lightning: when it lights the way they walk, and when it is dark they stand still (Quran 2:17, 2:19,
 *   2:20);
 *
 * and zakat, giving and the morning of Eid (giveArt.ts draws them):
 *
 * - what zakat is due on: nothing on fewer than five camels, and one sheep on five; one part in forty of silver; a
 *   tenth of crops watered by rain and rivers, and half a tenth of crops watered by a camel's work (Sahih al-Bukhari
 *   1459, 1454, Sahih Muslim 981);
 * - Mu'adh sent to Yemen: first the shahadah, then the five prayers of each day and night, then zakat taken from their
 *   rich and given to their poor (Sahih al-Bukhari 1395, 1496);
 * - Bayruha, the garden Abu Talhah loved most, facing the masjid, given for Allah when the ayah came down on spending
 *   from what you love, and shared among his relatives (Quran 3:92, Sahih al-Bukhari 1461);
 * - zakat al-Fitr: a sa' of dates or of barley for every one, young or old, given before the Eid prayer (Sahih
 *   al-Bukhari 1503, 1506);
 * - the morning of Eid: dates first, an odd number; out to the open prayer ground, a short spear planted before him;
 *   the prayer first, then the khutbah; and home by another way (Sahih al-Bukhari 953, 494, 956, 986);
 *
 * and everyday charity (charityArt.ts draws them):
 *
 * - water for a thirsty dog: a man who had drunk from a well saw a dog licking mud from thirst, filled his shoe with
 *   water and gave it a drink, and Allah thanked him and forgave him; there is a reward for serving any living being
 *   (Sahih al-Bukhari 2363, 2466);
 * - a thorny branch moved out of the way, for which Allah thanked him and forgave him; and removing harm from the way
 *   is charity (Sahih al-Bukhari 652, 2989);
 * - a tree planted or a seed sown: what a bird, a person or an animal eats from it is charity for the one who planted
 *   it (Sahih al-Bukhari 2320, 6012);
 * - Umar's land at Khaybar, the best he had: the land itself kept, its fruit given in charity, never sold, given away
 *   or inherited; its keeper may eat from it and feed a friend, storing nothing for himself (Sahih al-Bukhari 2737,
 *   2777);
 *
 * and manners and worship (mannersArt.ts draws them):
 *
 * - asking permission three times at Umar's door and going back when it was not given, and the youngest who went as
 *   the witness (Sahih al-Bukhari 6245);
 * - the first call to prayer: they used to guess the prayer time, until Bilal was told to stand and call to prayer;
 *   and when you hear the iqamah, walk to the prayer calmly, without rushing (Sahih al-Bukhari 604, 636);
 * - the wet grain hidden under the dry in a heap of food: why not on top, for people to see? Whoever cheats is not of
 *   me (Sahih Muslim 102);
 * - the well of Rumah that Uthman dug, its water for all, and the army of hardship he equipped, both promised Paradise
 *   (Sahih al-Bukhari 2778);
 * - a river at the door, bathed in five times a day, leaving no trace of dirt: so Allah wipes out sins by the five
 *   prayers (Sahih al-Bukhari 528);
 *
 * and stories of the Companions (companionArt.ts draws them):
 *
 * - Ka'b ibn Malik, never stronger or richer than when he stayed behind from Tabuk, putting it off until the army had
 *   gone; the plain truth he told, the fifty nights no one spoke to him while the earth closed in on him, the king's
 *   letter he put in the oven, and the call from the mountain of Sala': O Ka'b ibn Malik, be happy! (Sahih al-Bukhari
 *   4418; Quran 9:118);
 * - the cave of Thawr: two camels fed for four months, the news at noon that it was time, the food bag tied with
 *   Asma's belt, three nights in the cave, those chasing them standing above it: two, the third of whom is Allah; and
 *   the guide who brought the camels (Sahih al-Bukhari 3905, 3653);
 * - the plague in Sham: Umar at Sargh, asking counsel and going back in the morning, from Allah's decree to Allah's
 *   decree like camels grazing the green side of a valley; and the hadith: do not go to a land of plague, nor flee from
 *   it (Sahih al-Bukhari 5729);
 *
 * and likenesses the Prophet ﷺ gave (likenessArt.ts draws them):
 *
 * - the believers like a building, each part holding up the other; and speak up for the one who asks, and be rewarded
 *   (Sahih al-Bukhari 481, 6026);
 * - mercy in a hundred parts: one among all creation, by which a mare lifts her hoof from her foal, and ninety-nine
 *   kept with Him (Sahih al-Bukhari 6000, 6469);
 * - the halal and the haram are clear, with doubtful things between them; and one who grazes around a sanctuary soon
 *   grazes inside it (Sahih al-Bukhari 52);
 * - a good friend like one who carries musk, and a bad friend like one who blows the bellows (Sahih al-Bukhari 5534);
 * - the people who shared a ship, some above and some below: if those below are stopped from making a hole, all are
 *   saved (Sahih al-Bukhari 2493);
 *
 * and stories he ﷺ told (toldArt.ts draws them):
 *
 * - three men shut in a cave by a rock, who asked Allah by a good deed each had done for Him: the milk held for his
 *   parents till dawn, a sin left for Allah's sake, and a worker's wage grown into a herd; and the rock moved away
 *   (Sahih al-Bukhari 2272);
 * - a thousand dinars lent with Allah as witness, sent across the sea in a piece of wood when no ship came, and found
 *   by the lender as firewood (Sahih al-Bukhari 2291);
 * - one who has the Quran by heart, like the owner of tied camels: kept while tied, gone when let go; and keep
 *   reviewing it, for it slips away faster (Sahih al-Bukhari 5031, 5033);
 * - be in this world as a stranger, or a traveler on his way (Sahih al-Bukhari 6416), like a rider who rests in the
 *   shade of a tree, then goes on and leaves it (Jami at-Tirmidhi 2377);
 *
 * and more of his likenesses (exampleArt.ts draws them):
 *
 * - a believer who recites the Quran like a citron, which smells good and tastes good, and one who does not like a
 *   date, which tastes good and has no smell (Sahih al-Bukhari 5020);
 * - the trader who let off those in hardship, so that Allah might let him off; and Allah forgave him (Sahih
 *   al-Bukhari 2078);
 * - if you relied on Allah as you should, He would provide for you as for the birds, which go out in the morning
 *   hungry and come back in the evening full (Jami at-Tirmidhi 2344);
 * - a hypocrite like a sheep wandering between two flocks, to this one once and to that one once (Sahih Muslim 2784);
 * - the believer like a fresh plant, which the wind bends and which stands straight again when it is still, and the
 *   wicked like a pine, hard and straight, until it is broken (Sahih al-Bukhari 5644);
 * - one who remembers his Lord and one who does not, like the living and the dead (Sahih al-Bukhari 6407);
 *
 * and good deeds he ﷺ taught with a picture (deedArt.ts draws them):
 *
 * - Allah more pleased with His servant's repentance than one who lost his camel in the desert, with his food and
 *   drink, and lay down in a tree's shade, having lost hope, and then found it standing by him (Sahih Muslim 2747);
 * - a believer is not stung from the same hole twice (Sahih al-Bukhari 6133);
 * - the doors of good: fasting is a shield, charity puts out sins as water puts out fire, and prayer deep in the night
 *   (Jami at-Tirmidhi 2616);
 * - the square he ﷺ drew: a person's lifetime all around him, his hope a line going out of it, and troubles the small
 *   lines beside it (Sahih al-Bukhari 6417);
 * - when you cook a soup, add more water to it, then look to your neighbors and give them some of it kindly (Sahih
 *   Muslim 2625b);
 * - a charity owed for every joint each day the sun rises: judging fairly, helping someone with his ride, a good word,
 *   every step to the prayer, and removing harm from the road (Sahih Muslim 1009, Sahih al-Bukhari 2989);
 *
 * and more of the wisdom he ﷺ taught with a picture (wisdomArt.ts draws it):
 *
 * - two hungry wolves let loose among sheep do no more harm to them than greed for wealth and honor does to a person's
 *   religion (Jami at-Tirmidhi 2376);
 * - no Muslim is hurt by anything, even the prick of a thorn, but Allah wipes away his sins by it, as a tree sheds its
 *   leaves (Sahih al-Bukhari 5648);
 * - tie your camel, and trust Allah (Jami at-Tirmidhi 2517);
 * - faith has over seventy, or over sixty, branches: the highest is saying there is no god but Allah, the lowest is
 *   removing harm from the road, and modesty is a branch of faith (Sahih Muslim 35b, Sahih al-Bukhari 9);
 * - this world beside the Hereafter is like a finger dipped in the sea: see what it brings back (Sahih Muslim 2858);
 * - the buyer who found a jar of gold in the land he bought, and the seller who would not take it back either (Sahih
 *   al-Bukhari 3472);
 * - charity does not lessen wealth, Allah adds only honor to one who forgives, and raises up one who is humble for Him
 *   (Sahih Muslim 2588);
 *
 * and scenes from his ﷺ life and from what he taught for the home (lifeArt.ts draws them):
 *
 * - the palm trunk he stood by on Fridays, which cried like a child when he moved to the pulpit, until he came down
 *   and held it (Sahih al-Bukhari 3584);
 * - the great rock in the trench that no spade could break, until he struck it and it became like soft sand (Sahih
 *   al-Bukhari 4101);
 * - the horse that threw the horseman who chased him ﷺ on the road to Madinah: in the morning chasing them, by
 *   evening guarding them (Sahih al-Bukhari 3911);
 * - one bowl of milk that all the people of the Suffah drank their fill from, then Abu Hurairah, and he ﷺ last (Sahih
 *   al-Bukhari 6452);
 * - a few barley loaves that fed seventy or eighty, ten at a time (Sahih al-Bukhari 3578);
 * - the home at nightfall: the children kept close, the door closed with Allah's name, the water skin tied, the cup
 *   covered even with a stick, and the lamp put out (Sahih al-Bukhari 3304, 5624);
 * - shield yourselves from the Fire, even with half a date, and if you have none, with a good word (Sahih al-Bukhari
 *   1417, 6023);
 *
 * and more scenes from his ﷺ life and from what he told (graceArt.ts draws them):
 *
 * - the lamp put out so a hungry guest could eat, while his hosts went to bed hungry, and 59:9 (Sahih al-Bukhari
 *   4889);
 * - his help at home: busy serving his family, and when the time for prayer came, out to the prayer (Sahih al-Bukhari
 *   676);
 * - the man who killed a hundred, kept asking if he could repent, was told to go to such and such a village, died on
 *   the way, and was forgiven a span closer to it (Sahih al-Bukhari 3470);
 * - Uhud, which shook under him, Abu Bakr, Umar and Uthman: be firm, Uhud (Sahih al-Bukhari 3675, 3686);
 * - the stone in Makkah that greeted him before he was sent, which he knew even after (Sahih Muslim 2277);
 * - the rain he ﷺ prayed for on a Friday, and then "around us, not on us" (Sahih al-Bukhari 1013);
 * - the blessed water on a journey, and the food heard glorifying Allah as it was eaten (Sahih al-Bukhari 3579);
 *
 * and more of what he ﷺ told and lived (rewardArt.ts draws them):
 *
 * - every prophet tended sheep, and he too, for the people of Makkah, for a few qirats (Sahih al-Bukhari 2262);
 * - one date given in charity from honest earnings, grown as a foal is raised until it is as big as a mountain (Sahih
 *   al-Bukhari 1410);
 * - when a person dies his deeds end, but for three: a charity that keeps going, knowledge that people benefit from,
 *   and a righteous child who prays for him (Sahih Muslim 1631);
 * - a good deed intended and not done is written as a full good deed, done it is ten to seven hundred times or more;
 *   a bad deed intended and left is written as a good deed, done it is written as one (Sahih al-Bukhari 6491);
 * - his call from as-Safa: they had never heard him tell a lie, he warned them, and Abu Lahab went away (Sahih
 *   al-Bukhari 4770, 4971);
 * - Jabir's dates, blessed until every lender was paid in full and thirteen wasqs were left over (Sahih al-Bukhari
 *   2709);
 * - three follow the dead to his grave, his family, his wealth and his deeds; two go back and his deeds stay with him
 *   (Sahih al-Bukhari 6514).
 *
 * and what he ﷺ taught of kindness and of a believer's heart (kindArt.ts draws them):
 *
 * - every affair of a believer is good: thanks when joy comes, patience when harm comes, and that is for no one but the
 *   believer (Sahih Muslim 2999);
 * - who most deserves good company: your mother, then your mother, then your mother, then your father (Sahih al-Bukhari
 *   5971);
 * - do not think little of any good deed, even meeting your brother with a cheerful face (Sahih Muslim 2626);
 * - the best among you are those who learn the Quran and teach it (Sahih al-Bukhari 5027);
 * - the believers in their mercy, love and kindness are like one body: when one part is unwell, the whole body shares
 *   its sleeplessness and fever (Sahih al-Bukhari 6011);
 * - a boy taught to say Bismillah, eat with his right hand and eat from what is near him (Sahih al-Bukhari 5376);
 * - a man who asked when the Hour would be, and was told he will be with those he loves (Sahih al-Bukhari 3688).
 *
 * and what he ﷺ taught of worship and of the heart (worshipArt.ts draws them):
 *
 * - when he finished his prayer, he asked forgiveness three times and said: O Allah, You are Peace (Sahih Muslim 591);
 * - Islam is built on five: the testimony, the prayer, Zakat, Hajj and the fast of Ramadan (Sahih al-Bukhari 8);
 * - he asked Allah's forgiveness and turned to Him more than seventy times a day (Sahih al-Bukhari 6307);
 * - whoever loves more provision and a longer life, let him keep good relations with his kin (Sahih al-Bukhari 5986);
 * - pray standing; if you cannot, sitting; and if you cannot, lying on your side (Sahih al-Bukhari 1117);
 * - whatever befalls a Muslim, even the prick of a thorn, Allah wipes away some of his sins for it (Sahih al-Bukhari
 *   5641);
 * - deeds are only by intentions, and each person gets only what he intended (Sahih al-Bukhari 1).
 *
 * The parted sea is also the day of Ashura, which Musa fasted in thanks, and the Prophet ﷺ too (Sahih al-Bukhari 2004).
 *
 * Each scene shows only what its ayahs say. Nothing in a scene is a person or an angel: only the land, the sky, the
 * sea, plants, animals and things; the people of a parable are never drawn, only their gardens, and no Prophet and no
 * one of their people is drawn in the stories: the sleepers stay inside the dark cave, an army is only its dust, a
 * staff, a plank or a wall moves by itself, the House rises stone by stone, and Hajar is only her footprints; and
 * nothing of a sacrifice is ever drawn, only the great ram, and the cow in the pasture; the people of Lut, of Pharaoh
 * and of the Sabbath town are not drawn, nor what befell them, only their land; the one who slept a hundred years is
 * neither drawn nor named, and four birds are never drawn cut apart; Ibrahim's guests are only their greeting and the
 * meal they did not touch, those who worked for Sulayman are not drawn, nothing is drawn for Pharaoh's stakes, and the
 * one who kindled the fire is not drawn, only his fire; and no one who gives or receives is drawn, only what is given,
 * going along a dashed way: the one who watered the dog, moved the branch or planted the tree is only his dashed way;
 * the one who asked permission, his witness, Bilal and Uthman are only their dashed ways and their voices, the hand in
 * the heap of food is not drawn, and no bell or horn is drawn for the call to prayer; Ka'b, Abu Bakr, Asma, Umar and
 * those with them are only their dashed ways and their voices, nothing is drawn for Allah in the cave, and the plague
 * is only a haze over the land; the people of the likenesses are only their dashed ways and their voices, no hand is
 * drawn, and the hundred parts of mercy are only rings to count them, with nothing coming down from the sky; the
 * people of the stories he ﷺ told are only their dashed ways and their voices, what each one in the cave did is only
 * things and animals in a picture, and no page of the Quran is drawn, only a voice reciting; and in his other
 * likenesses, the one who recites, the trader and the one who remembers are only their voices and their dashed ways,
 * and the pine is broken only by the wind; and in the good deeds he ﷺ taught, the one who lost his camel, the one who
 * was stung, the one who cooks and the ones who do each charity are only their dashed ways and their voices, and the
 * square and its lines are drawn on the ground by no hand; and in the wisdom he ﷺ taught, the one hurt by a thorn,
 * the one who tied his camel, the one who removes harm from the road, the two men of the jar of gold and the one they
 * asked, the one who gives, forgives and is humble are only their dashed ways and their voices, and the finger dipped
 * in the sea is not drawn, only the rings where it dipped and the drop it brings back; and in the scenes from his ﷺ
 * life, he and those with him are only their dashed ways, their voices, and rings or small dashed circles where they
 * sat or stood, no hand is drawn on the trunk, the spade or the bowl, no one rides the camel or the horse on the road
 * to Madinah, no devil is drawn at nightfall, and nothing of the Fire is drawn, only a shield of light; and in the
 * other scenes from his ﷺ life and from what he told, the hosts and their guest, his family, the one who repented,
 * the four on Uhud and those who came to the water are only rings, small dashed circles, dashed ways and voices, no
 * hand is drawn in the blessed water, nothing of the killing is drawn and no angel, nothing comes down from the sky
 * but the rain, and nothing is added to what the hadith says (no chore is drawn at his home).
 */

export type SignKind =
  | "rain"
  | "clouds"
  | "fade"
  | "seed"
  | "seas"
  | "ships"
  | "mountains"
  | "bee"
  | "spider"
  | "tree"
  | "look"
  | "birds"
  | "sow"
  | "water"
  | "fire"
  | "shade"
  | "foam"
  | "lands"
  | "ashes"
  | "garden"
  | "twoGardens"
  | "ark"
  | "sea"
  | "springs"
  | "sheCamel"
  | "ants"
  | "hoopoe"
  | "dream"
  | "cave"
  | "elephant"
  | "journeys"
  | "tur"
  | "staff"
  | "khidr"
  | "barrier"
  | "yunus"
  | "maryam"
  | "dawud"
  | "house"
  | "zamzam"
  | "throne"
  | "mihrab"
  | "cool-fire"
  | "ad-wind"
  | "river"
  | "qarun"
  | "madyan"
  | "ayyub"
  | "yusuf-dream"
  | "measure"
  | "ram"
  | "qiblah"
  | "saba"
  | "cow"
  | "overturned"
  | "five-signs"
  | "sabbath"
  | "west-east"
  | "four-birds"
  | "hundred-years"
  | "shirt"
  | "guests"
  | "forgiveness"
  | "wind"
  | "pillars"
  | "cup"
  | "clay-bird"
  | "storm"
  | "zakat"
  | "yemen"
  | "bayruha"
  | "fitr"
  | "eid"
  | "thirsty-dog"
  | "thorny-branch"
  | "planting"
  | "waqf"
  | "permission"
  | "adhan"
  | "wet-grain"
  | "rumah"
  | "river-at-the-door"
  | "tabuk"
  | "thawr"
  | "plague"
  | "building"
  | "mercy"
  | "sanctuary"
  | "musk"
  | "shared-ship"
  | "shut-cave"
  | "log-at-sea"
  | "tied-camels"
  | "traveler"
  | "citron"
  | "forgiving-trader"
  | "hungry-birds"
  | "two-flocks"
  | "bending-plant"
  | "remember"
  | "lost-camel"
  | "stung-twice"
  | "doors-of-good"
  | "square-and-line"
  | "more-water"
  | "joint-charity"
  | "two-wolves"
  | "falling-leaves"
  | "tie-camel"
  | "faith-branches"
  | "sea-drop"
  | "jar-of-gold"
  | "charity-wealth"
  | "crying-trunk"
  | "trench-rock"
  | "chasing-horse"
  | "milk-bowl"
  | "bread-for-seventy"
  | "nightfall"
  | "half-date"
  | "lamp-out"
  | "helped-at-home"
  | "a-span-closer"
  | "uhud-shook"
  | "greeting-stone"
  | "around-us"
  | "blessed-water"
  | "shepherds"
  | "date-mountain"
  | "deeds-continue"
  | "good-intentions"
  | "safa-call"
  | "jabir-dates"
  | "three-follow"
  | "good-in-every-state"
  | "your-mother"
  | "cheerful-face"
  | "learn-and-teach"
  | "one-body"
  | "eat-near"
  | "those-you-love"
  | "after-the-salam"
  | "built-on-five"
  | "seventy-times"
  | "family-ties"
  | "pray-as-you-can"
  | "even-a-thorn"
  | "intentions"
  | "two-words"
  | "half-of-faith"
  | "three-signs"
  | "call-to-good"
  | "praise-each-bite"
  | "good-or-quiet"
  | "then-steadfast"
  | "dearest-deeds"
  | "truth-leads"
  | "ease-a-hardship"
  | "saved-by-mercy"
  | "give-while-healthy"
  | "strong-believer"
  | "forgotten-prayer"
  | "mustard-of-pride"
  | "what-backbiting-is"
  | "orphan-carer"
  | "safe-from-harm"
  | "refuge-from-anger"
  | "gate-ar-rayyan"
  | "make-it-easy"
  | "needle-in-the-sea"
  | "hearts-and-deeds"
  | "real-strength"
  | "treasure-of-paradise"
  | "hundred-levels"
  | "faith-at-the-pleiades"
  | "sacred-city"
  | "house-in-paradise"
  | "my-wealth"
  | "hour-on-friday"
  | "never-old"
  | "beware-of-suspicion"
  | "thirty-three"
  | "five-gifts"
  | "seven-in-the-shade"
  | "two-joys"
  | "ruins-of-al-hijr"
  | "born-on-the-fitrah"
  | "best-ten-days"
  | "sparrow-and-the-sea"
  | "lofty-mansions"
  | "house-of-pearl"
  | "tree-of-a-hundred-years"
  | "the-pool"
  | "gold-like-uhud"
  | "respite-then-seized"
  | "convey-one-ayah"
  | "the-hidden-poor"
  | "came-to-teach"
  | "keep-ties"
  | "fast-of-dawud"
  | "one-religion"
  | "who-refuses"
  | "guided-at-the-door"
  | "prayer-made-short";

export type SignScene = {
  id: string;
  kind: SignKind;
  caption: string;
  sources: MapSource[];
};

export const SIGN_SCENES: readonly SignScene[] = [
  {
    id: "sign-rain",
    kind: "rain",
    caption: "Allah sends the winds; they stir up the clouds, and rain falls on a dead land and brings it to life. So will the dead be raised.",
    sources: [quran(35, 9), quran(7, 57)]
  },
  {
    id: "sign-clouds",
    kind: "clouds",
    caption: "Allah drives the clouds, brings them together and piles them up, and you see the rain come out from within them.",
    sources: [quran(24, 43), quran(30, 48)]
  },
  {
    id: "sign-fade",
    kind: "fade",
    caption: "After the rain the plants grow green; then they dry, turn yellow and become broken straw, scattered by the winds. So is the life of this world.",
    sources: [quran(57, 20), quran(18, 45)]
  },
  {
    id: "sign-seed",
    kind: "seed",
    caption: "Those who spend in Allah's way are like a seed that grows seven ears, with a hundred grains in each ear. Allah gives more to whom He wills.",
    sources: [quran(2, 261)]
  },
  {
    id: "sign-seas",
    kind: "seas",
    caption: "Allah let the two seas meet, one sweet and one salty, with a barrier between them that they do not cross.",
    sources: [quran(25, 53), quran(55, 19), quran(55, 20)]
  },
  {
    id: "sign-ships",
    kind: "ships",
    caption: "The ships sail through the sea by His command, tall like mountains, so that people may seek His bounty.",
    sources: [quran(22, 65), quran(42, 32), quran(45, 12)]
  },
  {
    id: "sign-mountains",
    kind: "mountains",
    caption: "Allah spread out the earth and set firm mountains on it, like pegs, so that it does not shake with us.",
    sources: [quran(78, 6), quran(78, 7), quran(16, 15)]
  },
  {
    id: "sign-bee",
    kind: "bee",
    caption: "Allah inspired the bee to make its homes in the mountains and the trees, and to eat from every fruit. From it comes honey of many colors, with healing for people.",
    sources: [quran(16, 68), quran(16, 69)]
  },
  {
    id: "sign-spider",
    kind: "spider",
    caption: "Those who rely on others than Allah are like the spider that builds a house, and the weakest of houses is the spider's house.",
    sources: [quran(29, 41)]
  },
  {
    id: "sign-tree",
    kind: "tree",
    caption: "A good word is like a good tree: its root is firm, its branches are in the sky, and it gives its fruit at every time by its Lord's leave.",
    sources: [quran(14, 24), quran(14, 25), bukhari("4698")]
  },
  {
    id: "sign-look",
    kind: "look",
    caption: "Do they not look at the camels, how they were created? At the sky, how it was raised? At the mountains, how they were set firm? At the earth, how it was spread out?",
    sources: [quran(88, 17), quran(88, 18), quran(88, 19), quran(88, 20)]
  },
  {
    id: "sign-birds",
    kind: "birds",
    caption: "Do they not see the birds above them, spreading their wings and folding them in? None holds them up but the Most Merciful. Each of them knows its own prayer and praise.",
    sources: [quran(67, 19), quran(16, 79), quran(24, 41)]
  },
  {
    id: "sign-sow",
    kind: "sow",
    caption: "Have you seen the seed you sow? Is it you who make it grow, or is it Allah who makes it grow?",
    sources: [quran(56, 63), quran(56, 64)]
  },
  {
    id: "sign-water",
    kind: "water",
    caption: "Have you seen the water you drink? Is it you who send it down from the clouds, or Allah? Had He willed, He would have made it salty. So why do you not give thanks?",
    sources: [quran(56, 68), quran(56, 69), quran(56, 70)]
  },
  {
    id: "sign-fire",
    kind: "fire",
    caption: "Have you seen the fire you kindle? Is it you who made its tree grow, or Allah? He made fire for you from the green tree, as a reminder and a gift for travelers.",
    sources: [quran(56, 71), quran(56, 72), quran(56, 73), quran(36, 80)]
  },
  {
    id: "sign-shade",
    kind: "shade",
    caption: "See how your Lord stretches out the shade; had He willed, He would have made it stand still. He made the sun its guide, then He draws it in, little by little.",
    sources: [quran(25, 45), quran(25, 46)]
  },
  {
    id: "sign-foam",
    kind: "foam",
    caption:
      "Allah sends down rain and the valleys flow, each by its measure, and the flood carries foam on top; metal melted in the fire throws up foam too. The foam passes away, and what benefits people remains on the earth.",
    sources: [quran(13, 17)]
  },
  {
    id: "sign-lands",
    kind: "lands",
    caption:
      "The guidance he ﷺ brought is like rain falling on the earth. Good land takes it in and grows much grass; hard land holds the water, so people drink and water their animals; and barren land neither holds it nor grows anything.",
    sources: [quran(7, 58), bukhari("79")]
  },
  {
    id: "sign-ashes",
    kind: "ashes",
    caption: "The deeds of those who reject their Lord are like ashes that the wind blows hard on a stormy day: they can keep nothing of what they earned.",
    sources: [quran(14, 18)]
  },
  {
    id: "sign-garden",
    kind: "garden",
    caption: "The owners of a garden full of fruit swore to pick it all at dawn and give nothing to the poor. In the night, while they slept, a calamity from Allah came upon it, and by morning it was black and bare.",
    sources: [quran(68, 17), quran(68, 19), quran(68, 20), quran(68, 24)]
  },
  {
    id: "sign-two-gardens",
    kind: "twoGardens",
    caption:
      "A man had two gardens of grapes, with palms all around them, crops between them and a river flowing between them. But he grew proud and forgot his Lord, and all his fruit was destroyed, his vines fallen on their trellises.",
    sources: [quran(18, 32), quran(18, 33), quran(18, 35), quran(18, 42)]
  },
  {
    id: "sign-ark",
    kind: "ark",
    caption:
      "Nuh built the ark as Allah taught him, of planks and nails, and two of each kind were carried in it. The gates of the sky opened with pouring water and the earth burst with springs. The ark sailed on waves like mountains, and when the water was swallowed up, it came to rest on al-Judi.",
    sources: [quran(11, 37), quran(11, 40), quran(11, 42), quran(11, 44), quran(54, 11), quran(54, 12), quran(54, 13)]
  },
  {
    id: "sign-sea",
    kind: "sea",
    caption:
      "With Pharaoh's army behind them and the sea before them, Allah told Musa to strike the sea with his staff. It split apart, each side like a great mountain, and a dry path opened through the sea, so they crossed without fear. That was the day of Ashura, the day Allah saved the Children of Israel from their enemy: Musa fasted it, and the Prophet ﷺ fasted it too and told the Muslims to fast it.",
    sources: [quran(26, 61), quran(26, 63), quran(20, 77), bukhari("2004")]
  },
  {
    id: "sign-springs",
    kind: "springs",
    caption:
      "In the desert, Allah shaded the Children of Israel with clouds and sent down manna and quails for them. When Musa asked for water for his people, Allah told him to strike the rock with his staff, and twelve springs gushed out of it: each tribe knew its own drinking place.",
    sources: [quran(2, 57), quran(2, 60), quran(7, 160)]
  },
  {
    id: "sign-she-camel",
    kind: "sheCamel",
    caption:
      "Thamud carved homes out of the mountains with skill. Allah sent them a she-camel as a sign: she had her day to drink and they had theirs, each on a known day, and Salih told them not to touch her with harm.",
    sources: [quran(26, 149), quran(26, 155), quran(26, 156), quran(91, 13)]
  },
  {
    id: "sign-ants",
    kind: "ants",
    caption:
      "When Sulayman and his army came to the valley of the ants, an ant called out to the others to go into their homes, so that they would not be crushed without the army knowing. He smiled at her words and thanked Allah.",
    sources: [quran(27, 18), quran(27, 19)]
  },
  {
    id: "sign-hoopoe",
    kind: "hoopoe",
    caption:
      "Sulayman looked over the birds and found the hoopoe missing. It soon came back with sure news from Saba, where a woman ruled the people. So he sent it back with his letter, to deliver it to them and see what they would answer.",
    sources: [quran(27, 20), quran(27, 22), quran(27, 23), quran(27, 28)]
  },
  {
    id: "sign-dream",
    kind: "dream",
    caption:
      "The king dreamed of seven fat cows eaten by seven lean ones, and of seven green ears of grain and others dry. Yusuf told its meaning: sow for seven years and leave the harvest in its ears; then seven hard years will eat what was stored; then a year of rain will come.",
    sources: [quran(12, 43), quran(12, 47), quran(12, 48), quran(12, 49)]
  },
  {
    id: "sign-cave",
    kind: "cave",
    caption:
      "The young believers took shelter in the cave and asked Allah for mercy, and He made them sleep there for years. The rising sun turned away from their cave and the setting sun passed them by, and their dog lay stretched out at the entrance.",
    sources: [quran(18, 10), quran(18, 11), quran(18, 17), quran(18, 18)]
  },
  {
    id: "sign-elephant",
    kind: "elephant",
    caption:
      "An army came with an elephant to destroy the Ka'bah, but Allah held the elephant back from Makkah. He sent against them birds in flocks, throwing stones of baked clay, and made them like straw eaten by cattle.",
    sources: [quran(105, 1), quran(105, 2), quran(105, 3), quran(105, 4), quran(105, 5), bukhari("2731")]
  },
  {
    id: "sign-journeys",
    kind: "journeys",
    caption: "Allah made the winter and summer journeys easy for Quraysh. So let them worship the Lord of this House, who fed them against hunger and made them safe from fear.",
    sources: [quran(106, 1), quran(106, 2), quran(106, 3), quran(106, 4)]
  },
  {
    id: "sign-tur",
    kind: "tur",
    caption:
      "Traveling with his family on a dark night, Musa saw a fire on the side of the mount and went to it, hoping for warmth or guidance. When he came to it, he was called from the tree, in the holy valley of Tuwa. He was told to throw down his staff, and it became a moving snake.",
    sources: [quran(20, 10), quran(20, 12), quran(20, 20), quran(27, 7), quran(28, 29), quran(28, 30)]
  },
  {
    id: "sign-staff",
    kind: "staff",
    caption:
      "The sorcerers threw down their ropes and their staffs, and by their magic they seemed to move. Then Musa threw down his staff, and it swallowed up what they had faked. So the truth stood firm, and what they had done came to nothing.",
    sources: [quran(7, 117), quran(7, 118), quran(20, 66), quran(26, 44), quran(26, 45)]
  },
  {
    id: "sign-khidr",
    kind: "khidr",
    caption:
      "Musa set out with his young helper for the place where the two seas meet. There, by the rock, the fish they had forgotten took its way into the sea like a tunnel. With the servant of Allah he went to learn from, he saw a hole made in a boat, to save it from a king who seized every good boat, and a wall about to fall set straight, for beneath it was a treasure for two orphans.",
    sources: [quran(18, 60), quran(18, 61), quran(18, 63), quran(18, 71), quran(18, 77), quran(18, 79), quran(18, 82)]
  },
  {
    id: "sign-barrier",
    kind: "barrier",
    caption:
      "Dhul-Qarnayn came to a people between two mountains, who asked him for a barrier against Ya'juj and Ma'juj. He had blocks of iron brought until the gap between the mountain sides was filled, had it blown upon until it was like fire, then poured molten copper over it. They could not climb over it, nor dig through it.",
    sources: [quran(18, 93), quran(18, 94), quran(18, 96), quran(18, 97)]
  },
  {
    id: "sign-yunus",
    kind: "yunus",
    caption:
      "Yunus went to the laden ship, and a great fish swallowed him. In the darknesses he called out to Allah, glorifying Him, and Allah saved him from his distress. He was cast on the open shore, unwell, and a gourd plant was made to grow over him. Then he was sent to his people, a hundred thousand or more, and they believed.",
    sources: [quran(37, 140), quran(37, 142), quran(21, 87), quran(21, 88), quran(37, 145), quran(37, 146), quran(37, 147), quran(37, 148)]
  },
  {
    id: "sign-maryam",
    kind: "maryam",
    caption:
      "Maryam withdrew to a place far away, and the pains of birth drove her to the trunk of a palm tree. She was told not to grieve: her Lord had made a stream beneath her, and if she shook the trunk of the palm tree toward her, fresh ripe dates would fall. So eat, drink and be glad.",
    sources: [quran(19, 22), quran(19, 23), quran(19, 24), quran(19, 25), quran(19, 26)]
  },
  {
    id: "sign-dawud",
    kind: "dawud",
    caption:
      "Allah gave Dawud a favor from Him: the mountains glorified Allah with him, evening and morning, and so did the birds, gathered to him. Allah made iron soft for him and taught him to make coats of mail, with their rings just right, to protect people in battle.",
    sources: [quran(21, 79), quran(21, 80), quran(34, 10), quran(34, 11), quran(38, 18), quran(38, 19)]
  },
  {
    id: "sign-house",
    kind: "house",
    caption:
      "Allah showed Ibrahim the place of His House, in a valley without crops, where Ibrahim had settled some of his family. Ibrahim and Ismail raised its foundations, praying: our Lord, accept from us. Then Ibrahim was told to proclaim the Hajj to the people: they would come on foot and on lean camels, from every distant path.",
    sources: [quran(14, 37), quran(2, 127), quran(22, 26), quran(22, 27)]
  },
  {
    id: "sign-zamzam",
    kind: "zamzam",
    caption:
      "Safa and Marwah are among the signs of Allah. Hajar went between them seven times, looking for water for her baby, Ismail, and then the water of Zamzam came out. Later, people of Jurhum saw a bird circling and knew it was over water, so they came to live there.",
    sources: [quran(2, 158), bukhari("3364")]
  },
  {
    id: "sign-throne",
    kind: "throne",
    caption:
      "Sulayman asked who would bring him the queen's throne from Saba. One who had knowledge of the Book said: I will bring it to you before your glance returns. When Sulayman saw it set before him, he said: this is from the favor of my Lord, to test me. Her throne was disguised for her, and she was shown into a palace paved smooth with glass, over water.",
    sources: [quran(27, 38), quran(27, 40), quran(27, 41), quran(27, 44)]
  },
  {
    id: "sign-mihrab",
    kind: "mihrab",
    caption:
      "Zakariyya took care of Maryam. Each time he came in to her in the mihrab, he found provision with her. He asked where it came from, and she said: it is from Allah; Allah provides for whom He wills without measure. There, Zakariyya called on his Lord for a good child.",
    sources: [quran(3, 37), quran(3, 38)]
  },
  {
    id: "sign-cool-fire",
    kind: "cool-fire",
    caption: "Ibrahim's people built a great fire and threw him into it. Allah said: O fire, be coolness and safety for Ibrahim. They wanted to harm him, but Allah made them the losers.",
    sources: [quran(21, 68), quran(21, 69), quran(21, 70), quran(37, 97)]
  },
  {
    id: "sign-ad-wind",
    kind: "ad-wind",
    caption:
      "'Ad built towers on every high place to show off. When they saw a cloud coming toward their valleys, they said it would bring them rain, but it was a wind with a painful punishment. Allah sent it on them for seven nights and eight days, and afterwards nothing was seen but their homes. The Prophet ﷺ said: I was helped by the east wind, and 'Ad were destroyed by the west wind.",
    sources: [quran(26, 128), quran(46, 24), quran(69, 7), quran(46, 25), bukhari("1035")]
  },
  {
    id: "sign-river",
    kind: "river",
    caption:
      "Allah inspired Musa's mother: put him into a chest and cast it into the river; do not fear and do not grieve, for We will return him to you. Her heart became empty, and she told his sister to follow him. The river cast the chest on the shore, where Pharaoh's family picked it up, and Pharaoh's wife said: do not kill him. So Allah returned Musa to his mother, to comfort her.",
    sources: [quran(20, 39), quran(28, 7), quran(28, 10), quran(28, 11), quran(28, 8), quran(28, 9), quran(28, 13)]
  },
  {
    id: "sign-qarun",
    kind: "qarun",
    caption:
      "Qarun had such treasures that their keys were a heavy load for a band of strong men, and he said he was given it all because of his own knowledge. He went out before his people in his finery. Then Allah made the earth swallow him and his home, and no band could help him against Allah.",
    sources: [quran(28, 76), quran(28, 78), quran(28, 79), quran(28, 81)]
  },
  {
    id: "sign-madyan",
    kind: "madyan",
    caption:
      "When Musa came to the water of Madyan, he found many people watering their flocks, and apart from them two women holding back their flock until the shepherds had gone, for their father was very old. So he watered their flock for them, then turned to the shade and said: my Lord, I am in need of whatever good You send down to me.",
    sources: [quran(28, 23), quran(28, 24)]
  },
  {
    id: "sign-ayyub",
    kind: "ayyub",
    caption:
      "Ayyub called on his Lord: harm has touched me, and You are the Most Merciful of the merciful. Allah answered him and removed his harm: strike the ground with your foot; here is cool water to wash in and to drink. Once, as he bathed, golden locusts fell on him, and he gathered them, for no one can do without Allah's blessing. Allah found him patient: what an excellent servant; he always turned back to Allah.",
    sources: [quran(21, 83), quran(21, 84), quran(38, 42), bukhari("279"), quran(38, 44)]
  },
  {
    id: "sign-yusuf-dream",
    kind: "yusuf-dream",
    caption:
      "Yusuf told his father: I saw eleven stars, and the sun and the moon; I saw them bowing to me. His father said: do not tell your brothers about your dream. Years later, when his parents and brothers bowed before him, Yusuf said: this is the meaning of my dream of before; my Lord has made it true.",
    sources: [quran(12, 4), quran(12, 5), quran(12, 100)]
  },
  {
    id: "sign-measure",
    kind: "measure",
    caption:
      "Woe to those who give less than what is due: when they take a measure from people, they take it in full, but when they measure or weigh for them, they give less. Shu'ayb said: give full measure, and do not be of those who cause loss; and weigh with a straight balance. Allah tells us the same: give full measure when you measure, and weigh with a straight balance; that is better, and best in the end.",
    sources: [quran(83, 1), quran(83, 2), quran(83, 3), quran(26, 181), quran(26, 182), quran(17, 35)]
  },
  {
    id: "sign-ram",
    kind: "ram",
    caption:
      "Ibrahim said: my son, I saw in a dream that I was sacrificing you, so what do you think? His son said: my father, do what you are commanded; you will find me, in sha Allah, among the patient. When they had both submitted, Allah called him: O Ibrahim, you have fulfilled the dream. That was a clear test, and Allah ransomed his son with a great sacrifice.",
    sources: [quran(37, 102), quran(37, 103), quran(37, 104), quran(37, 105), quran(37, 106), quran(37, 107)]
  },
  {
    id: "sign-qiblah",
    kind: "qiblah",
    caption:
      "In Madinah, the Prophet ﷺ prayed facing Jerusalem for sixteen or seventeen months, and he wished he could face the Ka'bah. Allah said: We have seen your face turning to the sky, so We will turn you to a qiblah that will please you; turn your face toward al-Masjid al-Haram, and wherever you are, turn your faces toward it. The foolish asked what turned them from their qiblah. Say: the east and the west belong to Allah.",
    sources: [bukhari("40"), quran(2, 144), quran(2, 142)]
  },
  {
    id: "sign-saba",
    kind: "saba",
    caption:
      "Saba had a sign in their land: two gardens, on the right and on the left. Eat from your Lord's provision and be grateful to Him: a good land, and a Lord who forgives. But they turned away, so Allah sent on them the flood of the dam, and changed their two gardens into gardens of bitter fruit, tamarisk and a few lote trees. They wronged themselves, so Allah made them into stories and scattered them far and wide.",
    sources: [quran(34, 15), quran(34, 16), quran(34, 19)]
  },
  {
    id: "sign-cow",
    kind: "cow",
    caption:
      "Musa told his people: Allah commands you to sacrifice a cow. They asked question after question, and were told: it is neither old nor young, but in between; it is yellow, bright in color, pleasing to those who see it; it is not trained to plough the earth or to water the fields, sound, with no blemish on it. Then they sacrificed it, though they almost did not.",
    sources: [quran(2, 67), quran(2, 68), quran(2, 69), quran(2, 71)]
  },
  {
    id: "sign-overturned",
    kind: "overturned",
    caption:
      "The angels told Lut: leave with your family in a part of the night; their appointed time is the morning, and is not the morning near? When Allah's command came, He turned the town upside down and rained on it stones of baked clay, layer on layer, marked by your Lord. And Allah left of it a clear sign for people who understand.",
    sources: [quran(11, 81), quran(11, 82), quran(11, 83), quran(29, 35)]
  },
  {
    id: "sign-five-signs",
    kind: "five-signs",
    caption:
      "Allah seized Pharaoh's people with years of drought and too little fruit, so that they might remember. Then He sent on them the flood, the locusts, the lice, the frogs and the blood: signs made clear, one after another. But they were arrogant, and each time the torment was lifted from them, they broke their word.",
    sources: [quran(7, 130), quran(7, 133), quran(7, 135), quran(43, 50)]
  },
  {
    id: "sign-sabbath",
    kind: "sabbath",
    caption:
      "Ask them about the town by the sea, when they broke the Sabbath: their fish came to them on their Sabbath day, showing on the water, and on the days that were not their Sabbath, they did not come. Thus Allah tested them, because they were disobedient.",
    sources: [quran(7, 163)]
  },
  {
    id: "sign-west-east",
    kind: "west-east",
    caption:
      "Allah established Dhul-Qarnayn in the land and gave him the means to all things. He followed a way until he reached where the sun sets, and found it setting in a murky spring. Then he followed a way until he reached where the sun rises, and found it rising on a people for whom Allah had made no shelter from it.",
    sources: [quran(18, 84), quran(18, 85), quran(18, 86), quran(18, 89), quran(18, 90)]
  },
  {
    id: "sign-four-birds",
    kind: "four-birds",
    caption:
      "Ibrahim said: my Lord, show me how You give life to the dead. Allah said: do you not believe? He said: yes, but so that my heart may be at rest. Allah said: take four birds and draw them to you, then put a part of them on each hill, then call them: they will come to you in haste. And know that Allah is Almighty, All-Wise.",
    sources: [quran(2, 260)]
  },
  {
    id: "sign-hundred-years",
    kind: "hundred-years",
    caption:
      "A man passed by a town fallen down on its roofs, and said: how will Allah give it life after its death? So Allah made him die for a hundred years, then raised him. Look at your food and your drink: they have not changed. Look at your donkey, and look at the bones, how Allah raises them and clothes them with flesh. When it became clear to him, he said: I know that Allah is able to do all things.",
    sources: [quran(2, 259)]
  },
  {
    id: "sign-shirt",
    kind: "shirt",
    caption:
      "Yusuf told his brothers: go with this shirt of mine and cast it over my father's face; he will see again. When the caravan left Egypt, their father said: I find the scent of Yusuf. When the bearer of good news came, he cast the shirt over his face, and he could see again.",
    sources: [quran(12, 93), quran(12, 94), quran(12, 96)]
  },
  {
    id: "sign-guests",
    kind: "guests",
    caption:
      "The angels came to Ibrahim as his honored guests and said: Peace. He said: Peace. He went quietly to his household and, without delay, brought a fat calf, roasted, and set it near them. He said: will you not eat? When he saw their hands not reaching for it, he felt fear of them. They said: do not fear, and gave him good news of a knowing son. His wife was given the good news of Ishaq, and after Ishaq, Ya'qub.",
    sources: [quran(11, 69), quran(51, 26), quran(51, 27), quran(51, 28), quran(11, 70), quran(11, 71)]
  },
  {
    id: "sign-forgiveness",
    kind: "forgiveness",
    caption:
      "Nuh told his people: ask your Lord's forgiveness; He is ever forgiving. He will send the sky upon you with rain in abundance, give you more wealth and children, and make gardens for you and make rivers for you. Hud told his people the same: ask your Lord's forgiveness, then turn to Him; He will send the sky upon you with rain in abundance, and add strength to your strength.",
    sources: [quran(71, 10), quran(71, 11), quran(71, 12), quran(11, 52)]
  },
  {
    id: "sign-wind",
    kind: "wind",
    caption:
      "Allah made the wind serve Sulayman: its morning course was a month's journey, and its evening course a month's journey. It blew by his command, gently, wherever he willed, to the land Allah had blessed. Allah made a spring of molten copper flow for him, and the jinn made for him what he willed, among it basins like reservoirs and cauldrons fixed in place. Work, family of Dawud, in thanks; and few of My servants are thankful.",
    sources: [quran(34, 12), quran(21, 81), quran(38, 36), quran(34, 13)]
  },
  {
    id: "sign-pillars",
    kind: "pillars",
    caption:
      "Have you not seen how your Lord dealt with 'Ad: Iram of the pillars, whose like was never made in the lands; and Thamud, who carved the rocks in the valley; and Pharaoh, owner of the stakes? They transgressed in the lands and spread much corruption there, so your Lord poured on them a scourge of punishment. Your Lord is ever watchful.",
    sources: [quran(89, 6), quran(89, 7), quran(89, 9), quran(89, 10), quran(89, 12), quran(89, 13), quran(89, 14)]
  },
  {
    id: "sign-cup",
    kind: "cup",
    caption:
      "When Yusuf had given his brothers their supplies, he put the drinking cup in his brother's bag. Then a caller called out: O caravan, you are thieves! They said: we are missing the king's measure; whoever brings it shall have a camel's load. He began with their bags before his brother's bag, then brought it out of his brother's bag. So did Allah plan for Yusuf.",
    sources: [quran(12, 70), quran(12, 72), quran(12, 76)]
  },
  {
    id: "sign-clay-bird",
    kind: "clay-bird",
    caption:
      "Isa said: I have come to you with a sign from your Lord: I make for you out of clay the shape of a bird, then I breathe into it, and it becomes a bird by Allah's permission. I heal the blind and the leper and give life to the dead, by Allah's permission, and I tell you what you eat and what you store in your homes. In that is a sign for you, if you believe.",
    sources: [quran(3, 49), quran(5, 110)]
  },
  {
    id: "sign-storm",
    kind: "storm",
    caption:
      "The hypocrites are like one who kindled a fire: when it lit up all around him, Allah took away their light and left them in darkness, unable to see. Or like a rainstorm from the sky, in it darkness, thunder and lightning. The lightning almost snatches away their sight: whenever it lights the way for them, they walk in it, and when it grows dark over them, they stand still.",
    sources: [quran(2, 17), quran(2, 19), quran(2, 20)]
  },
  {
    id: "sign-zakat",
    kind: "zakat",
    caption:
      "No zakat is due on fewer than five camels, and on five camels one sheep is given. On silver that reaches the nisab, one part in forty is given. Crops watered by rain or by rivers give a tenth, and crops watered by a camel's work, half a tenth.",
    sources: [bukhari("1459"), bukhari("1454"), muslim("981")]
  },
  {
    id: "sign-yemen",
    kind: "yemen",
    caption:
      "He ﷺ sent Mu'adh to Yemen: first call them to bear witness that none has the right to be worshipped but Allah, and that Muhammad is the Messenger of Allah; then teach them the five prayers of each day and night; then that zakat is taken from their rich and given to their poor.",
    sources: [bukhari("1395"), bukhari("1496")]
  },
  {
    id: "sign-bayruha",
    kind: "bayruha",
    caption:
      "Bayruha, facing the masjid, was the garden Abu Talhah loved most, and he ﷺ would drink of its sweet water. When the ayah came down on spending from what you love, Abu Talhah gave it for Allah, and shared it among his relatives as he ﷺ advised.",
    sources: [quran(3, 92), bukhari("1461")]
  },
  {
    id: "sign-fitr",
    kind: "fitr",
    caption: "Zakat al-Fitr is a sa' of dates or a sa' of barley for every Muslim, young or old, given before the people go out to the Eid prayer.",
    sources: [bukhari("1503"), bukhari("1506")]
  },
  {
    id: "sign-eid",
    kind: "eid",
    caption:
      "On the morning of Eid al-Fitr he ﷺ ate an odd number of dates before going out. At the open prayer ground a short spear was planted before him; he began with the prayer, then gave the khutbah, and came home by another way.",
    sources: [bukhari("953"), bukhari("494"), bukhari("956"), bukhari("986")]
  },
  {
    id: "sign-thirsty-dog",
    kind: "thirsty-dog",
    caption:
      "A man walking on a way grew very thirsty, went down a well and drank. Coming out, he saw a dog panting and licking mud from thirst. He went down again, filled his shoe with water and gave the dog a drink. Allah thanked him and forgave him. He ﷺ said: there is a reward for serving any living being.",
    sources: [bukhari("2363"), bukhari("2466")]
  },
  {
    id: "sign-thorny-branch",
    kind: "thorny-branch",
    caption:
      "While a man was walking along a way, he found a thorny branch on it and moved it out of the way, and Allah thanked him for it and forgave him. And removing harm from the way is charity.",
    sources: [bukhari("652"), bukhari("2989")]
  },
  {
    id: "sign-planting",
    kind: "planting",
    caption: "No Muslim plants a tree or sows a seed, and then a bird, a person or an animal eats from it, but it is charity for him.",
    sources: [bukhari("2320"), bukhari("6012")]
  },
  {
    id: "sign-waqf",
    kind: "waqf",
    caption:
      "Umar got land at Khaybar, the best he ever had. The Prophet ﷺ said: if you wish, keep the land itself and give its fruit in charity. So Umar gave it, on condition that it is never sold, given away or inherited; and whoever keeps it may eat from it fairly and feed a friend, storing nothing for himself.",
    sources: [bukhari("2737"), bukhari("2777")]
  },
  {
    id: "sign-permission",
    kind: "permission",
    caption:
      "Abu Musa asked permission three times to come in to Umar, and it was not given, so he went back, for the Prophet ﷺ said: if one of you asks permission three times and it is not given, let him go back. Umar asked him for a witness, and the youngest of the gathering, Abu Sa'id, went with him and told Umar that the Prophet ﷺ had said so.",
    sources: [bukhari("6245")]
  },
  {
    id: "sign-adhan",
    kind: "adhan",
    caption:
      "When the Muslims came to Madinah, they used to gather for the prayer, guessing its time. Then the Prophet ﷺ said: O Bilal, stand and call to prayer. And he ﷺ said: when you hear the iqamah, walk to the prayer with calm and dignity, and do not rush.",
    sources: [bukhari("604"), bukhari("636")]
  },
  {
    id: "sign-wet-grain",
    kind: "wet-grain",
    caption:
      "The Prophet ﷺ passed by a heap of food and put his hand into it, and his fingers came out wet. Its owner said: rain fell on it. He ﷺ said: why did you not put it on top of the food, so that people could see it? Whoever cheats is not of me.",
    sources: [muslim("102")]
  },
  {
    id: "sign-rumah",
    kind: "rumah",
    caption:
      "The Prophet ﷺ said: whoever digs the well of Rumah will have Paradise, and Uthman dug it, and its water was for all the Muslims. And he ﷺ said: whoever equips the army of hardship will have Paradise, and Uthman equipped it.",
    sources: [bukhari("2778")]
  },
  {
    id: "sign-river-at-the-door",
    kind: "river-at-the-door",
    caption:
      "The Prophet ﷺ said: if a river ran by the door of one of you, and he bathed in it five times a day, would any dirt be left on him? They said: not a trace of dirt would be left. He said: that is the likeness of the five prayers, by which Allah wipes out sins.",
    sources: [bukhari("528")]
  },
  {
    id: "sign-tabuk",
    kind: "tabuk",
    caption:
      "Ka'b ibn Malik was never stronger or richer than when he stayed behind from Tabuk: he kept putting off getting ready until the army had gone. When the Prophet ﷺ came back, Ka'b told him the plain truth: he had no excuse. For fifty nights no one spoke to him, and the earth closed in on him, wide as it was; and he put a king's letter into the oven. Then a voice called from the mountain of Sala': O Ka'b ibn Malik, be happy! Allah had accepted his repentance.",
    sources: [bukhari("4418"), quran(9, 118)]
  },
  {
    id: "sign-thawr",
    kind: "thawr",
    caption:
      "Abu Bakr fed two camels for four months, waiting to make the Hijrah with the Prophet ﷺ, who came to him one day at noon: it was time. Asma tied their food bag with half of her belt. They stayed three nights in a cave on the mountain of Thawr. When those chasing them stood above it, Abu Bakr said: if one of them looked down, he would see us. He ﷺ said: what do you think of two, the third of whom is Allah? Then their guide brought the camels.",
    sources: [bukhari("3905"), bukhari("3653")]
  },
  {
    id: "sign-plague",
    kind: "plague",
    caption:
      "Umar set out for Sham, and at Sargh he heard that plague had broken out there. He asked counsel, and said: we go back in the morning. Abu Ubaydah said: running from Allah's decree? Umar said: yes, from Allah's decree to Allah's decree, as camels may graze the green side of a valley or its dry side. Then Abd ar-Rahman ibn Awf told him the Prophet ﷺ said: if you hear of it in a land, do not go to it; and if it breaks out where you are, do not leave it, fleeing from it.",
    sources: [bukhari("5729")]
  },
  {
    id: "sign-building",
    kind: "building",
    caption:
      "The Prophet ﷺ said: the believer to the believer is like a building, each part of it holding up the other; and he laced his fingers together. Once, as he sat, a man came asking for what he needed, and he ﷺ said: speak up for him, and you will be rewarded.",
    sources: [bukhari("481"), bukhari("6026")]
  },
  {
    id: "sign-mercy",
    kind: "mercy",
    caption:
      "The Prophet ﷺ said: Allah made mercy in a hundred parts. He kept ninety-nine parts with Him, and sent one part among all His creation. By that one part, creatures are kind to each other, so that a mare lifts her hoof away from her foal, fearing she might hurt it.",
    sources: [bukhari("6000"), bukhari("6469")]
  },
  {
    id: "sign-sanctuary",
    kind: "sanctuary",
    caption:
      "The Prophet ﷺ said: the halal is clear and the haram is clear, and between them are doubtful things that many people do not know. Whoever keeps away from them keeps his religion and his honour safe. Whoever falls into them is like one who grazes his flock around a sanctuary: soon he grazes inside it. Every king has a sanctuary, and Allah's sanctuary on His earth is what He has made haram.",
    sources: [bukhari("52")]
  },
  {
    id: "sign-musk",
    kind: "musk",
    caption:
      "The Prophet ﷺ said: a good friend and a bad friend are like one who carries musk and one who blows the bellows. The one with musk may give you some, or you may buy some from him, or at least you find a sweet smell from him. The one who blows the bellows may burn your clothes, or you find a bad smell from him.",
    sources: [bukhari("5534")]
  },
  {
    id: "sign-shared-ship",
    kind: "shared-ship",
    caption:
      "The Prophet ﷺ said: those who keep to Allah's limits and those who break them are like people who drew lots for their places on a ship, some above and some below. Those below, when they wanted water, went by those above, and said: let us make a hole in our part, and not trouble those above. If they are left to do it, all of them drown; and if they are stopped, they are saved, and all of them are saved.",
    sources: [bukhari("2493")]
  },
  {
    id: "sign-shut-cave",
    kind: "shut-cave",
    caption:
      "The Prophet ﷺ told of three men before us who went into a cave for the night. A rock rolled down the mountain and shut the cave on them. They said: nothing can save you from this rock but asking Allah by a good deed you did for His sake. One had held the milk for his old parents till dawn while they slept, so that no one drank before them. One had kept away from a sin, for Allah's sake, and left the gold. One had grown a worker's wage into a herd, and gave it all to him when he came. After each one, the rock moved a little; after the third, it moved away, and they walked out.",
    sources: [bukhari("2272")]
  },
  {
    id: "sign-log-at-sea",
    kind: "log-at-sea",
    caption:
      "The Prophet ﷺ told of a man who asked another to lend him a thousand dinars. The lender asked for witnesses, and he said: Allah is enough as a witness. He asked for a guarantor, and he said: Allah is enough as a guarantor. When it was time to repay, he found no ship. So he put the money and a letter in a piece of wood, sealed it, and gave it to the sea, trusting Allah. The lender came out to see if a ship had come, found the piece of wood, and took it home for firewood. When he opened it, he found his money and the letter.",
    sources: [bukhari("2291")]
  },
  {
    id: "sign-tied-camels",
    kind: "tied-camels",
    caption:
      "The Prophet ﷺ said: one who has the Quran by heart is like the owner of tied camels. If he keeps them tied, he keeps them; and if he lets them go, they run away. And he ﷺ said: keep reviewing the Quran, for by Him in whose Hand my soul is, it slips away faster than camels from their ropes.",
    sources: [bukhari("5031"), bukhari("5033")]
  },
  {
    id: "sign-traveler",
    kind: "traveler",
    caption:
      "The Prophet ﷺ took Ibn Umar by the shoulder and said: be in this world as if you were a stranger, or a traveler on his way. And Ibn Umar used to say: at evening, do not wait for the morning, and at morning, do not wait for the evening. Once, when he ﷺ had slept on a mat that marked his side, he said: I am in this world only like a rider who rests in the shade of a tree, then goes on and leaves it.",
    sources: [bukhari("6416"), tirmidhi("2377")]
  },
  {
    id: "sign-citron",
    kind: "citron",
    caption:
      "The Prophet ﷺ said: a believer who recites the Quran is like a citron: it smells good, and it tastes good. And a believer who does not recite the Quran is like a date: it tastes good, but it has no smell.",
    sources: [bukhari("5020")]
  },
  {
    id: "sign-forgiving-trader",
    kind: "forgiving-trader",
    caption:
      "The Prophet ﷺ told of a trader who used to lend to people. When he saw one in hardship, he said to his helpers: let him off, so that Allah may let us off. So Allah forgave him.",
    sources: [bukhari("2078")]
  },
  {
    id: "sign-hungry-birds",
    kind: "hungry-birds",
    caption:
      "The Prophet ﷺ said: if you relied on Allah as He should be relied on, He would provide for you as He provides for the birds: they go out in the morning hungry, and come back in the evening full.",
    sources: [tirmidhi("2344")]
  },
  {
    id: "sign-two-flocks",
    kind: "two-flocks",
    caption: "The Prophet ﷺ said: the likeness of a hypocrite is that of a sheep wandering between two flocks: it goes to this one once, and to that one once.",
    sources: [muslim("2784")]
  },
  {
    id: "sign-bending-plant",
    kind: "bending-plant",
    caption:
      "The Prophet ﷺ said: the believer is like a fresh, soft plant: from wherever the wind comes, it bends it, and when the wind is still, it stands straight again. So the believer is bent by trials. And the wicked is like a pine, hard and straight, until Allah breaks it when He wills.",
    sources: [bukhari("5644")]
  },
  {
    id: "sign-remember",
    kind: "remember",
    caption: "The Prophet ﷺ said: the likeness of one who remembers his Lord and one who does not remember Him is that of the living and the dead.",
    sources: [bukhari("6407")]
  },
  {
    id: "sign-lost-camel",
    kind: "lost-camel",
    caption:
      "The Prophet ﷺ said: Allah is more pleased with the repentance of His servant, when he repents to Him, than one of you who was on his camel in a barren desert, and it ran off from him with his food and his drink. He lost hope of it, came to a tree and lay down in its shade, having lost hope of his camel. Then, while he was like that, there it was, standing by him.",
    sources: [muslim("2747")]
  },
  {
    id: "sign-stung-twice",
    kind: "stung-twice",
    caption: "The Prophet ﷺ said: a believer is not stung from the same hole twice.",
    sources: [bukhari("6133")]
  },
  {
    id: "sign-doors-of-good",
    kind: "doors-of-good",
    caption:
      "The Prophet ﷺ said to Mu'adh: shall I not tell you of the doors of good? Fasting is a shield, charity puts out sins as water puts out fire, and a man's prayer deep in the night.",
    sources: [tirmidhi("2616")]
  },
  {
    id: "sign-square-and-line",
    kind: "square-and-line",
    caption:
      "The Prophet ﷺ drew a square, and a line in the middle of it going out of it, and small lines beside the one in the middle, and said: this is a person, and this is his lifetime all around him; this line going out is his hope; and these small lines are troubles: if one misses him, another bites him.",
    sources: [bukhari("6417")]
  },
  {
    id: "sign-more-water",
    kind: "more-water",
    caption:
      "Abu Dharr said: my dear friend ﷺ advised me: when you cook a soup, add more water to it, then look to a household of your neighbors, and give them some of it kindly.",
    sources: [muslim("2625b")]
  },
  {
    id: "sign-joint-charity",
    kind: "joint-charity",
    caption:
      "The Prophet ﷺ said: each day the sun rises, a charity is owed for every joint of a person: judging fairly between two is a charity; helping someone with his ride, lifting him onto it or lifting his load onto it, is a charity; a good word is a charity; every step taken to the prayer is a charity; and removing harm from the road is a charity.",
    sources: [muslim("1009"), bukhari("2989")]
  },
  {
    id: "sign-two-wolves",
    kind: "two-wolves",
    caption: "The Prophet ﷺ said: two hungry wolves let loose among sheep do no more harm to them than a person's greed for wealth and honor does to his religion.",
    sources: [tirmidhi("2376")]
  },
  {
    id: "sign-falling-leaves",
    kind: "falling-leaves",
    caption:
      "Abdullah ibn Mas'ud visited the Prophet ﷺ when he had a high fever, and he ﷺ said: no Muslim is hurt by anything, even the prick of a thorn, but Allah wipes away his sins by it, as a tree sheds its leaves.",
    sources: [bukhari("5648")]
  },
  {
    id: "sign-tie-camel",
    kind: "tie-camel",
    caption: "A man said: O Messenger of Allah, shall I tie my camel and trust Allah, or leave it loose and trust Allah? He ﷺ said: tie it, and trust Allah.",
    sources: [tirmidhi("2517")]
  },
  {
    id: "sign-faith-branches",
    kind: "faith-branches",
    caption:
      "The Prophet ﷺ said: faith has over seventy, or over sixty, branches. The highest of them is saying there is no god but Allah, the lowest is removing harm from the road, and modesty is a branch of faith.",
    sources: [muslim("35b"), bukhari("9")]
  },
  {
    id: "sign-sea-drop",
    kind: "sea-drop",
    caption: "The Prophet ﷺ said: by Allah, this world beside the Hereafter is only like one of you dipping his finger in the sea: let him see what it brings back.",
    sources: [muslim("2858")]
  },
  {
    id: "sign-jar-of-gold",
    kind: "jar-of-gold",
    caption:
      "The Prophet ﷺ said: a man bought land from another and found in it a clay jar full of gold. He said to the seller: take your gold, for I bought only the land from you, not the gold. The seller said: I sold you the land and all that is in it. They took their case to a man, who asked: have you children? One had a boy and the other a girl. He said: marry the girl to the boy, spend some of it on them, and give charity.",
    sources: [bukhari("3472")]
  },
  {
    id: "sign-charity-wealth",
    kind: "charity-wealth",
    caption: "The Prophet ﷺ said: charity does not lessen wealth; Allah adds nothing to a servant who forgives but honor; and no one is humble for Allah but Allah raises him up.",
    sources: [muslim("2588")]
  },
  {
    id: "sign-crying-trunk",
    kind: "crying-trunk",
    caption: "The Prophet ﷺ used to stand by a palm trunk on Fridays. When a pulpit was made for him, the trunk cried like a child, until he came down and held it.",
    sources: [bukhari("3584")]
  },
  {
    id: "sign-trench-rock",
    kind: "trench-rock",
    caption: "Digging the trench, they came to a great rock no spade could break. The Prophet ﷺ came, hungry as they were, struck it with the spade, and it became like soft sand.",
    sources: [bukhari("4101")]
  },
  {
    id: "sign-chasing-horse",
    kind: "chasing-horse",
    caption: "On the road to Madinah, a horseman caught up with the Prophet ﷺ and Abu Bakr. He ﷺ said: O Allah, throw him down, and the horse threw him. In the morning he was chasing them; by evening he was guarding them.",
    sources: [bukhari("3911")]
  },
  {
    id: "sign-milk-bowl",
    kind: "milk-bowl",
    caption: "One bowl of milk: all the people of the Suffah drank their fill from it, one by one, then Abu Hurairah, and the Prophet ﷺ drank what was left.",
    sources: [bukhari("6452")]
  },
  {
    id: "sign-bread-for-seventy",
    kind: "bread-for-seventy",
    caption: "A few barley loaves were broken in pieces, and the Prophet ﷺ said: let ten come in. Ten at a time ate their fill and went out, until seventy or eighty had eaten.",
    sources: [bukhari("3578")]
  },
  {
    id: "sign-nightfall",
    kind: "nightfall",
    caption: "The Prophet ﷺ said: when night falls, keep your children close; close the door and mention Allah's name; tie the water skin, cover the cup, even with a stick, and put out the lamp when you sleep.",
    sources: [bukhari("3304"), bukhari("5624")]
  },
  {
    id: "sign-half-date",
    kind: "half-date",
    caption: "The Prophet ﷺ said: shield yourselves from the Fire, even with half a date; and if you have none, then with a good word.",
    sources: [bukhari("1417"), bukhari("6023")]
  },
  {
    id: "sign-lamp-out",
    kind: "lamp-out",
    caption:
      "A hungry man came, and the Prophet ﷺ asked who would host him. A man of the Ansar took him home, where there was only the children's food. They put the children to sleep, put out the lamp, and let him eat in the dark while they went to bed hungry. Then Allah revealed 59:9: they prefer others over themselves, even when in need.",
    sources: [bukhari("4889")]
  },
  {
    id: "sign-helped-at-home",
    kind: "helped-at-home",
    caption: "Aishah was asked what the Prophet ﷺ did at home. She said: he was busy serving his family, and when the time for prayer came, he went out to the prayer.",
    sources: [bukhari("676")]
  },
  {
    id: "sign-a-span-closer",
    kind: "a-span-closer",
    caption:
      "A man who had killed a hundred kept asking if he could repent, and was told to go to such and such a village. Death overtook him on the way. That village was told to come near and the one he left to go far, and he was found a span closer to it, so he was forgiven.",
    sources: [bukhari("3470")]
  },
  {
    id: "sign-uhud-shook",
    kind: "uhud-shook",
    caption: "The Prophet ﷺ went up Uhud with Abu Bakr, Umar and Uthman, and the mountain shook beneath them. He ﷺ said: be firm, Uhud, for on you are a Prophet, a Siddiq and two martyrs.",
    sources: [bukhari("3675"), bukhari("3686")]
  },
  {
    id: "sign-greeting-stone",
    kind: "greeting-stone",
    caption: "The Prophet ﷺ said: I know a stone in Makkah that used to greet me before I was sent as a Prophet. I know it even now.",
    sources: [muslim("2277")]
  },
  {
    id: "sign-around-us",
    kind: "around-us",
    caption:
      "On a Friday, a man asked the Prophet ﷺ in his khutbah to pray for rain. A cloud like a shield rose from behind Sal', and it rained for a week. The next Friday he ﷺ prayed: around us, not on us. The rain stopped, and they walked out in the sun.",
    sources: [bukhari("1013")]
  },
  {
    id: "sign-blessed-water",
    kind: "blessed-water",
    caption:
      "On a journey the water ran short. A little water was brought, and the Prophet ﷺ said: come to the blessed water, and the blessing is from Allah. The water flowed, and Ibn Mas'ud said: we used to hear the food glorifying Allah as it was eaten.",
    sources: [bukhari("3579")]
  },
  {
    id: "sign-shepherds",
    kind: "shepherds",
    caption: "The Prophet ﷺ said: Allah sent no prophet who did not tend sheep. They asked: did you do the same? He said: yes, I tended the sheep of the people of Makkah for a few qirats.",
    sources: [bukhari("2262")]
  },
  {
    id: "sign-date-mountain",
    kind: "date-mountain",
    caption:
      "The Prophet ﷺ said: whoever gives in charity as much as one date from honest earnings, and Allah accepts only what is honestly earned, Allah grows its reward for him, as one of you raises his foal, until it becomes as big as a mountain.",
    sources: [bukhari("1410")]
  },
  {
    id: "sign-deeds-continue",
    kind: "deeds-continue",
    caption: "The Prophet ﷺ said: when a person dies, his deeds come to an end, except for three: a charity that keeps going, knowledge that people benefit from, or a righteous child who prays for him.",
    sources: [muslim("1631")]
  },
  {
    id: "sign-good-intentions",
    kind: "good-intentions",
    caption:
      "The Prophet ﷺ told of his Lord: whoever intends a good deed and does not do it, a full good deed is written for him; if he does it, ten to seven hundred times or more. Whoever intends a bad deed and leaves it, a full good deed is written; if he does it, one bad deed is written.",
    sources: [bukhari("6491")]
  },
  {
    id: "sign-safa-call",
    kind: "safa-call",
    caption:
      "When he ﷺ was told to warn his near kindred, he climbed as-Safa and called out to Quraysh. He asked: if I told you horsemen were coming, would you believe me? They said: we have never heard you tell a lie. He said: I am a plain warner to you of a severe punishment. Abu Lahab said: was it only for this? And he went away.",
    sources: [bukhari("4770"), bukhari("4971")]
  },
  {
    id: "sign-jabir-dates",
    kind: "jabir-dates",
    caption:
      "Jabir's father died in debt, and the lenders thought his dates would not cover it. The Prophet ﷺ sat on the gathered dates and asked Allah to bless them. Every lender was paid in full, and thirteen wasqs of dates were left over.",
    sources: [bukhari("2709")]
  },
  {
    id: "sign-three-follow",
    kind: "three-follow",
    caption: "The Prophet ﷺ said: three follow the dead to his grave: his family, his wealth and his deeds. Two go back, his family and his wealth, and his deeds stay with him.",
    sources: [bukhari("6514")]
  },
  {
    id: "sign-good-in-every-state",
    kind: "good-in-every-state",
    caption:
      "The Prophet ﷺ said: wonderful is the affair of the believer, for every affair of his is good, and this is for no one but the believer. If joy comes to him, he gives thanks, and it is good for him; and if harm comes to him, he is patient, and it is good for him.",
    sources: [muslim("2999")]
  },
  {
    id: "sign-your-mother",
    kind: "your-mother",
    caption: "A man asked the Prophet ﷺ: who most deserves my good company? He said: your mother. Then who? Your mother. Then who? Your mother. Then who? Your father.",
    sources: [bukhari("5971")]
  },
  {
    id: "sign-cheerful-face",
    kind: "cheerful-face",
    caption: "The Prophet ﷺ said: do not think little of any good deed, even if it is meeting your brother with a cheerful face.",
    sources: [muslim("2626")]
  },
  {
    id: "sign-learn-and-teach",
    kind: "learn-and-teach",
    caption: "The Prophet ﷺ said: the best among you are those who learn the Quran and teach it.",
    sources: [bukhari("5027")]
  },
  {
    id: "sign-one-body",
    kind: "one-body",
    caption:
      "The Prophet ﷺ said: you see the believers, in their mercy, love and kindness to one another, like one body: if any part of it is unwell, the whole body shares its sleeplessness and fever.",
    sources: [bukhari("6011")]
  },
  {
    id: "sign-eat-near",
    kind: "eat-near",
    caption:
      "Umar ibn Abi Salamah said: I was a boy in the care of the Prophet ﷺ, and my hand used to go all around the dish. He said to me: O boy! Say Bismillah, eat with your right hand, and eat from what is near you.",
    sources: [bukhari("5376")]
  },
  {
    id: "sign-those-you-love",
    kind: "those-you-love",
    caption:
      "A man asked the Prophet ﷺ: when will the Hour be? He said: what have you prepared for it? He said: nothing, except that I love Allah and His Messenger. He said: you will be with those you love. Anas said: we had never been so glad.",
    sources: [bukhari("3688")]
  },
  {
    id: "sign-after-the-salam",
    kind: "after-the-salam",
    caption:
      "Thawban said: when the Messenger of Allah ﷺ finished his prayer, he asked forgiveness three times and said: O Allah, You are Peace, and peace is from You; blessed are You, Owner of Majesty and Honor.",
    sources: [muslim("591")]
  },
  {
    id: "sign-built-on-five",
    kind: "built-on-five",
    caption:
      "The Prophet ﷺ said: Islam is built on five: to testify that none is worthy of worship but Allah and that Muhammad is the Messenger of Allah, to offer the prayers, to pay Zakat, to perform Hajj, and to fast in Ramadan.",
    sources: [bukhari("8")]
  },
  {
    id: "sign-seventy-times",
    kind: "seventy-times",
    caption: "The Prophet ﷺ said: by Allah, I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day.",
    sources: [bukhari("6307")]
  },
  {
    id: "sign-family-ties",
    kind: "family-ties",
    caption: "The Prophet ﷺ said: whoever loves to be granted more provision, and that his life be prolonged, let him keep good relations with his kin.",
    sources: [bukhari("5986")]
  },
  {
    id: "sign-pray-as-you-can",
    kind: "pray-as-you-can",
    caption:
      "Imran ibn Husayn said: I had piles, so I asked the Prophet ﷺ about the prayer. He said: pray while standing; and if you can't, pray while sitting; and if you cannot do even that, then pray lying on your side.",
    sources: [bukhari("1117")]
  },
  {
    id: "sign-even-a-thorn",
    kind: "even-a-thorn",
    caption:
      "The Prophet ﷺ said: no fatigue, illness, worry, sadness, hurt or distress befalls a Muslim, even the prick of a thorn, but Allah wipes away some of his sins for it.",
    sources: [bukhari("5641")]
  },
  {
    id: "sign-intentions",
    kind: "intentions",
    caption:
      "Alqamah said: I heard Umar on the minbar say: I heard the Messenger of Allah ﷺ say: deeds are only by intentions, and each person gets only what he intended. So whoever emigrated for the world, to gain it, or for a woman, to marry her, his emigration is for what he emigrated for.",
    sources: [bukhari("1")]
  },
  {
    id: "sign-two-words",
    kind: "two-words",
    caption:
      "The Prophet ﷺ said: two expressions are very easy for the tongue to say, but they are very heavy in the balance and very dear to the Most Merciful: Subhan Allah al-Azim, and Subhan Allah wa bihamdihi.",
    sources: [bukhari("6406")]
  },
  {
    id: "sign-half-of-faith",
    kind: "half-of-faith",
    caption:
      "The Prophet ﷺ said: cleanliness is half of faith, and al-Hamdu lillah fills the scale, and Subhan Allah and al-Hamdu lillah fill what is between the heavens and the earth, and prayer is a light, and charity is proof, and endurance is a brightness.",
    sources: [muslim("223")]
  },
  {
    id: "sign-three-signs",
    kind: "three-signs",
    caption:
      "The Prophet ﷺ said: the signs of a hypocrite are three: whenever he speaks, he tells a lie; whenever he promises, he always breaks it; and if you trust him, he proves to be dishonest.",
    sources: [bukhari("33")]
  },
  {
    id: "sign-call-to-good",
    kind: "call-to-good",
    caption:
      "The Prophet ﷺ said: he who calls to righteousness has a reward like the rewards of those who adhere to it, without their rewards being diminished at all; and he who calls to error carries its sin, like those who commit it, without their sins being diminished at all.",
    sources: [muslim("2674")]
  },
  {
    id: "sign-praise-each-bite",
    kind: "praise-each-bite",
    caption: "The Prophet ﷺ said: Allah is pleased with His servant who says al-Hamdu lillah while taking a morsel of food and while drinking.",
    sources: [muslim("2734")]
  },
  {
    id: "sign-good-or-quiet",
    kind: "good-or-quiet",
    caption:
      "The Prophet ﷺ said: anybody who believes in Allah and the Last Day should not harm his neighbor; anybody who believes in Allah and the Last Day should entertain his guest generously; and anybody who believes in Allah and the Last Day should talk what is good or keep quiet.",
    sources: [bukhari("6018")]
  },
  {
    id: "sign-then-steadfast",
    kind: "then-steadfast",
    caption:
      "Sufyan ibn Abdullah ath-Thaqafi said: I asked the Messenger of Allah ﷺ to tell me something about Islam that I need ask no one other than him about. He said: say, I affirm my faith in Allah, and then remain steadfast to it.",
    sources: [muslim("38")]
  },
  {
    id: "sign-dearest-deeds",
    kind: "dearest-deeds",
    caption:
      "Abdullah ibn Mas'ud said: I asked the Prophet ﷺ: which deed is the dearest to Allah? He said: to offer the prayers at their early fixed times. I asked: then what? He said: to be good and dutiful to your parents. I asked: then what? He said: to strive in Allah's cause.",
    sources: [bukhari("527")]
  },
  {
    id: "sign-truth-leads",
    kind: "truth-leads",
    caption:
      "The Prophet ﷺ said: truthfulness leads to righteousness, and righteousness leads to Paradise, and a man keeps on telling the truth until he becomes a truthful person. Falsehood leads to wickedness, and wickedness leads to the Fire, and a man may keep on telling lies until he is written before Allah a liar.",
    sources: [bukhari("6094")]
  },
  {
    id: "sign-ease-a-hardship",
    kind: "ease-a-hardship",
    caption:
      "The Prophet ﷺ said: he who relieves the suffering of a brother out of the sufferings of the world, Allah will relieve his suffering from the sufferings of the Day of Resurrection; he who makes things easy for one who is hard-pressed, Allah will make things easy for him in the Hereafter; and he who conceals the faults of a Muslim, Allah will conceal his faults in this world and in the Hereafter. Allah helps a servant as long as the servant helps his brother; and he who treads a path in search of knowledge, Allah makes that path easy for him, leading to Paradise.",
    sources: [muslim("2699a")]
  },
  {
    id: "sign-saved-by-mercy",
    kind: "saved-by-mercy",
    caption:
      "The Prophet ﷺ said: the deeds of anyone of you will not save you. They said: not even you, O Messenger of Allah? He said: not even I, unless Allah bestows His mercy on me. So do good deeds properly, sincerely and moderately, and worship Allah in the forenoon and in the afternoon and during a part of the night, and always keep to a moderate course, and you will reach your target.",
    sources: [bukhari("6463")]
  },
  {
    id: "sign-give-while-healthy",
    kind: "give-while-healthy",
    caption:
      "A man asked the Prophet ﷺ: which charity is the most superior in reward? He said: the charity you give while you are healthy, afraid of poverty and wishing to become wealthy. Do not delay it until death is near and then say: give so much to such and such, and so much to such and such, when it already belongs to such and such.",
    sources: [bukhari("1419")]
  },
  {
    id: "sign-strong-believer",
    kind: "strong-believer",
    caption:
      "The Prophet ﷺ said: a strong believer is better and more lovable to Allah than a weak believer, and there is good in everyone. Cherish what benefits you, seek help from Allah and do not lose heart. If trouble comes to you, do not say: if I had not done that, it would not have happened so; but say: Allah did what He had ordained, for your 'if' opens the gate for Satan.",
    sources: [muslim("2664")]
  },
  {
    id: "sign-forgotten-prayer",
    kind: "forgotten-prayer",
    caption: "The Prophet ﷺ said: if anyone forgets a prayer, he should pray it when he remembers it. There is no expiation for it except to pray it.",
    sources: [bukhari("597")]
  },
  {
    id: "sign-mustard-of-pride",
    kind: "mustard-of-pride",
    caption:
      "The Prophet ﷺ said: he who has in his heart the weight of a mustard seed of pride shall not enter Paradise. A man said: a man loves that his clothes be fine and his shoes be fine. He said: Allah is beautiful and loves beauty. Pride is rejecting the truth and looking down on people.",
    sources: [muslim("91")]
  },
  {
    id: "sign-what-backbiting-is",
    kind: "what-backbiting-is",
    caption:
      "The Prophet ﷺ said: do you know what backbiting is? They said: Allah and His Messenger know best. He said: it is talking about your brother in a way he dislikes. It was said: what if my brother is as I say? He said: if he is as you say, you have backbitten him, and if he is not, you have slandered him.",
    sources: [muslim("2589")]
  },
  {
    id: "sign-orphan-carer",
    kind: "orphan-carer",
    caption: "The Prophet ﷺ said: I and the one who looks after an orphan will be in Paradise like this, and he pointed with his index and middle fingers, keeping them a little apart.",
    sources: [bukhari("5304")]
  },
  {
    id: "sign-safe-from-harm",
    kind: "safe-from-harm",
    caption: "The Prophet ﷺ said: a Muslim is the one who avoids harming Muslims with his tongue and hands, and an emigrant is the one who gives up all that Allah has forbidden.",
    sources: [bukhari("10")]
  },
  {
    id: "sign-refuge-from-anger",
    kind: "refuge-from-anger",
    caption:
      "Sulayman ibn Surad said: I was sitting with the Prophet ﷺ when two men abused each other, and the face of one of them became red with anger. The Prophet ﷺ said: I know a word that would calm him if he said it. If he said: I seek refuge with Allah from Satan, all his anger would go away.",
    sources: [bukhari("3282")]
  },
  {
    id: "sign-gate-ar-rayyan",
    kind: "gate-ar-rayyan",
    caption:
      "The Prophet ﷺ said: in Paradise there is a gate called ar-Rayyan. Those who fast will enter through it on the Day of Resurrection, and none but them will enter through it. It will be said: where are those who used to fast? They will get up, and none but them will enter through it. When they have entered, it will be closed, and no one else will enter through it.",
    sources: [bukhari("1896")]
  },
  {
    id: "sign-make-it-easy",
    kind: "make-it-easy",
    caption: "The Prophet ﷺ said: make things easy for people and do not make them hard, and give them good tidings and do not make them run away.",
    sources: [bukhari("69")]
  },
  {
    id: "sign-needle-in-the-sea",
    kind: "needle-in-the-sea",
    caption:
      "The Prophet ﷺ said that Allah said: O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another. All of you are astray except those I have guided, so seek guidance of Me and I shall guide you. All of you are hungry except those I have fed, so seek food of Me and I shall feed you. Were the first of you and the last of you to rise up in one place and ask of Me, and were I to give everyone what he asked, that would not decrease what I have, any more than a needle decreases the sea if put into it.",
    sources: [muslim("2577")]
  },
  {
    id: "sign-hearts-and-deeds",
    kind: "hearts-and-deeds",
    caption: "The Prophet ﷺ said: verily Allah does not look to your faces and your wealth, but He looks to your hearts and to your deeds.",
    sources: [muslim("2564c")]
  },
  {
    id: "sign-real-strength",
    kind: "real-strength",
    caption: "The Prophet ﷺ said: the strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.",
    sources: [bukhari("6114")]
  },
  {
    id: "sign-treasure-of-paradise",
    kind: "treasure-of-paradise",
    caption:
      "Abu Musa said: we were with the Prophet ﷺ on a journey, and whenever we ascended a high place, we used to say Takbir. He ﷺ said: O people, be kind to yourselves, for you are not calling upon a deaf or an absent one, but you are calling an All-Hearer, an All-Seer. Then he came to me as I was saying within myself: la hawla wa la quwwata illa billah. He said: O Abdullah ibn Qays, say la hawla wa la quwwata illa billah, for it is one of the treasures of Paradise.",
    sources: [bukhari("6384")]
  },
  {
    id: "sign-hundred-levels",
    kind: "hundred-levels",
    caption:
      "The Prophet ﷺ said: Paradise has one hundred grades, and the distance between each of two grades is like the distance between the heaven and the earth. So when you ask Allah, ask for al-Firdaws, the best and highest part of Paradise. The narrator thought he ﷺ also said: from it originate the rivers of Paradise.",
    sources: [bukhari("2790")]
  },
  {
    id: "sign-faith-at-the-pleiades",
    kind: "faith-at-the-pleiades",
    caption:
      "Abu Hurayrah said: we were sitting with the Prophet ﷺ when Surat al-Jumu'ah was revealed, and its ayah on others who have not yet joined them was recited. I said: who are they, O Messenger of Allah? He did not reply till I repeated my question thrice. Salman al-Farisi was with us, and the Prophet ﷺ put his hand on Salman and said: if faith were at Ath-Thurayya, the Pleiades, even then men, or a man, from these would attain it.",
    sources: [bukhari("4897")]
  },
  {
    id: "sign-sacred-city",
    kind: "sacred-city",
    caption:
      "On the day Makkah was opened, the Prophet ﷺ said: Allah has made this place a sanctuary since the creation of the heavens and the earth, and it will remain a sanctuary till the Day of Resurrection. Its thorns should not be uprooted, its game should not be chased, and its fallen things should not be picked up except by one who would announce it publicly.",
    sources: [bukhari("1834")]
  },
  {
    id: "sign-house-in-paradise",
    kind: "house-in-paradise",
    caption:
      "When people argued too much about Uthman rebuilding the masjid of the Prophet ﷺ, he said: you have talked too much. I heard the Prophet ﷺ say: whoever built a mosque, Allah would build for him a similar place in Paradise. A narrator thought he ﷺ also said: intending Allah's pleasure.",
    sources: [bukhari("450")]
  },
  {
    id: "sign-my-wealth",
    kind: "my-wealth",
    caption:
      "As the Prophet ﷺ was reciting Surat at-Takathur, he said: the son of Adam claims: my wealth, my wealth. O son of Adam, is there anything as your belonging except that which you consumed, which you utilised, or which you wore and then it was worn out, or you gave as charity and sent it forward?",
    sources: [muslim("2958")]
  },
  {
    id: "sign-hour-on-friday",
    kind: "hour-on-friday",
    caption:
      "The Prophet ﷺ talked about Friday and said: there is an hour on Friday, and if a Muslim gets it while praying and asks something from Allah, then Allah will definitely meet his demand. And he ﷺ pointed out the shortness of that time with his hands.",
    sources: [bukhari("935")]
  },
  {
    id: "sign-never-old",
    kind: "never-old",
    caption:
      "The Prophet ﷺ said: there would be an announcer in Paradise who would announce: there is in store for you health, and that you should never fall ill; that you live and do not die at all; that you would remain young and never grow old; and that you would always live in affluent circumstances and never become destitute.",
    sources: [muslim("2837")]
  },
  {
    id: "sign-beware-of-suspicion",
    kind: "beware-of-suspicion",
    caption:
      "The Prophet ﷺ said: beware of suspicion, for suspicion is the worst of false tales. Do not look for the others' faults and do not spy, do not be jealous of one another, do not desert one another, and do not hate one another. O Allah's worshipers, be brothers.",
    sources: [bukhari("6064")]
  },
  {
    id: "sign-thirty-three",
    kind: "thirty-three",
    caption:
      "Some poor people came to the Prophet ﷺ and said: the wealthy people will get higher grades and permanent enjoyment. They pray like us and fast as we do, and they have more money, by which they perform Hajj and Umrah, struggle in Allah's cause and give in charity. He ﷺ said: shall I not tell you a thing which, if you acted on it, you would catch up with those who have surpassed you, and nobody would overtake you except those who do the same? Say Subhan Allah, Al hamdu lillah and Allahu Akbar thirty three times each after every prayer.",
    sources: [bukhari("843")]
  },
  {
    id: "sign-five-gifts",
    kind: "five-gifts",
    caption:
      "The Prophet ﷺ said: I have been given five things which were not given to anyone else before me. Allah made me victorious by awe for a distance of one month's journey. The earth has been made for me a place for praying and a thing to perform Tayammum, so anyone of my followers can pray wherever the time of a prayer is due. The booty has been made lawful for me. I have been given the right of intercession. And every Prophet used to be sent to his nation only, but I have been sent to all mankind.",
    sources: [bukhari("335")]
  },
  {
    id: "sign-seven-in-the-shade",
    kind: "seven-in-the-shade",
    caption:
      "The Prophet ﷺ said: Allah will give shade to seven on the Day when there will be no shade but His: a just ruler; a youth brought up in the worship of Allah; a man whose heart is attached to the mosques; two who love each other only for Allah's sake, meeting and parting for it; a man who refuses the call of a woman of position and beauty and says: I am afraid of Allah; a man who gives charity so secretly that his left hand does not know what his right hand has given; and one who remembers Allah alone and his eyes fill with tears.",
    sources: [bukhari("660"), bukhari("1423")]
  },
  {
    id: "sign-two-joys",
    kind: "two-joys",
    caption:
      "The Prophet ﷺ said: fasting is a shield. The one fasting should not behave foolishly, and if someone fights or insults him, he should say twice: I am fasting. By Him in whose Hand my soul is, the smell of the fasting person's mouth is better with Allah than the smell of musk. Allah says: he has left his food, drink and desires for My sake; the fast is for Me, and I will reward it. And he ﷺ said: the fasting person has two joys, one when he breaks his fast, and the other when he meets his Lord, pleased with his fasting.",
    sources: [bukhari("1894"), bukhari("1904")]
  },
  {
    id: "sign-ruins-of-al-hijr",
    kind: "ruins-of-al-hijr",
    caption:
      "When the Prophet ﷺ passed by al-Hijr, he said: do not enter the dwelling places of those who were unjust to themselves unless you enter weeping, lest what befell them befall you. Then he covered his head and hurried on till he crossed the valley. He ﷺ also said: if you do not weep, do not enter.",
    sources: [bukhari("4419"), bukhari("433")]
  },
  {
    id: "sign-born-on-the-fitrah",
    kind: "born-on-the-fitrah",
    caption:
      "The Prophet ﷺ said: every child is born on the fitrah, and his parents make him a Jew, a Christian or a Magian, as an animal gives birth to a whole young one. Do you find any part of it cut off?",
    sources: [bukhari("1385")]
  },
  {
    id: "sign-best-ten-days",
    kind: "best-ten-days",
    caption:
      "The Prophet ﷺ said: no good deeds done on other days are better than those done on these, the first ten days of Dhul-Hijjah. Some of his companions said: not even jihad? He said: not even jihad, except a man who went out risking himself and his wealth, and did not return with any of it.",
    sources: [bukhari("969")]
  },
  {
    id: "sign-sparrow-and-the-sea",
    kind: "sparrow-and-the-sea",
    caption:
      "The Prophet ﷺ said: Musa stood up to address Bani Israel and was asked: who is the most learned of the people? He said: I am the most learned. Allah admonished him, for he did not leave knowledge to Him, and told him: at the junction of the two seas there is a servant of Mine more learned than you. Later a boat passed by Musa and al-Khidr, and its crew knew al-Khidr and carried them without fare. Then a sparrow came, stood on the edge of the boat and dipped its beak once or twice in the sea. Al-Khidr said: O Musa, my knowledge and your knowledge have not decreased Allah's knowledge except as much as this sparrow has decreased the sea. And the Prophet ﷺ said: may Allah have mercy on Musa; we wish he had been patient, so that more of their story would be told to us.",
    sources: [bukhari("122")]
  },
  {
    id: "sign-lofty-mansions",
    kind: "lofty-mansions",
    caption:
      "The Prophet ﷺ said: the people of Paradise will look at the dwellers of the lofty mansions above them as one looks at a brilliant star far away on the horizon, in the East or in the West, because of their ranks over one another. The people said: O Messenger of Allah, are these the homes of the prophets, which no one else can reach? He ﷺ said: no, by Him in whose Hand my soul is, they are for men who believed in Allah and believed the messengers.",
    sources: [bukhari("3256")]
  },
  {
    id: "sign-house-of-pearl",
    kind: "house-of-pearl",
    caption:
      "Jibril came to the Prophet ﷺ and said: O Messenger of Allah, this is Khadijah coming to you with a dish of food or drink. When she reaches you, convey to her salam from her Lord and from me, and give her glad tidings of a house in Paradise of qasab, hollow pearl, in which there is no noise and no toil.",
    sources: [bukhari("3820")]
  },
  {
    id: "sign-tree-of-a-hundred-years",
    kind: "tree-of-a-hundred-years",
    caption: "The Prophet ﷺ said: in Paradise there is a tree so big that a rider could travel in its shade for a hundred years and not cross it.",
    sources: [bukhari("3251")]
  },
  {
    id: "sign-the-pool",
    kind: "the-pool",
    caption:
      "The Prophet ﷺ said: my Pool is a month's journey across. Its water is whiter than milk, its smell is better than musk, and its cups are like the stars of the sky. Whoever drinks from it will never be thirsty.",
    sources: [bukhari("6579")]
  },
  {
    id: "sign-gold-like-uhud",
    kind: "gold-like-uhud",
    caption: "The Prophet ﷺ said: do not abuse my companions, for if any one of you spent gold as much as Uhud, it would not reach a mudd spent by one of them, nor even half of it.",
    sources: [bukhari("3673")]
  },
  {
    id: "sign-respite-then-seized",
    kind: "respite-then-seized",
    caption: "The Prophet ﷺ said: Allah gives respite to the wrongdoer, until, when He seizes him, He does not let him go. Then he ﷺ recited ayah 102 of Surah Hud, on the seizure of your Lord.",
    sources: [bukhari("4686")]
  },
  {
    id: "sign-convey-one-ayah",
    kind: "convey-one-ayah",
    caption: "The Prophet ﷺ said: convey from me, even if it is one ayah. Tell of the Children of Israel, and there is no harm in it. And whoever lies about me on purpose, let him take his seat in the Fire.",
    sources: [bukhari("3461")]
  },
  {
    id: "sign-the-hidden-poor",
    kind: "the-hidden-poor",
    caption:
      "The Prophet ﷺ said: the poor one is not the one who goes around to people and is turned away with a bite or two, or a date or two. The poor one is the one who does not have enough for his needs, whom no one notices so as to give him charity, and who does not stand up to ask people.",
    sources: [bukhari("1479")]
  },
  {
    id: "sign-came-to-teach",
    kind: "came-to-teach",
    caption:
      "One day, as the Prophet ﷺ sat with the people, a man came to them in very white clothes, with no trace of travel on him, and none of them knew him. He asked about Islam, iman and ihsan, and the Prophet ﷺ said of ihsan: to worship Allah as if you see Him, and if you do not see Him, He sees you. He asked when the Hour will be, and he ﷺ said: the one asked about it knows no more than the one asking; and he told him of its signs, among them herders competing in tall buildings. Then the man turned away, and he ﷺ said: bring him back; but they saw nothing. He ﷺ said: that was Jibril, who came to teach you your religion.",
    sources: [bukhari("50"), muslim("8a")]
  },
  {
    id: "sign-keep-ties",
    kind: "keep-ties",
    caption:
      "Asma bint Abi Bakr said: my mother came to me, hoping for my kindness, in the time of the Messenger of Allah ﷺ, and she was a polytheist. I asked the Messenger of Allah ﷺ: shall I keep ties with my mother? He ﷺ said: yes, keep ties with your mother. Ibn Uyaynah said: then Allah revealed about her ayah 8 of Surat al-Mumtahanah.",
    sources: [bukhari("2620"), bukhari("5978")]
  },
  {
    id: "sign-fast-of-dawud",
    kind: "fast-of-dawud",
    caption:
      "Abdullah ibn Amr said that he would fast every day and pray all night as long as he lived. The Prophet ﷺ said: you cannot do that; so fast and break your fast, pray and sleep. When he said he could do more, he ﷺ told him at last: fast one day and break your fast one day; that is the fast of Dawud, and it is the best fast. He ﷺ also said: the prayer most beloved to Allah is the prayer of Dawud, and the fast most beloved to Allah is the fast of Dawud: he slept half the night, prayed a third of it and slept a sixth of it, and he fasted one day and broke his fast the next.",
    sources: [bukhari("1976"), bukhari("1131")]
  },
  {
    id: "sign-one-religion",
    kind: "one-religion",
    caption: "The Prophet ﷺ said: I am the nearest of all people to Isa son of Maryam, in this world and in the Hereafter. The prophets are brothers of one father: their mothers are different, and their religion is one.",
    sources: [bukhari("3443")]
  },
  {
    id: "sign-who-refuses",
    kind: "who-refuses",
    caption: "The Prophet ﷺ said: all my ummah will enter Paradise, except whoever refuses. They asked: O Messenger of Allah, and who would refuse? He ﷺ said: whoever obeys me enters Paradise, and whoever disobeys me has refused.",
    sources: [bukhari("7280")]
  },
  {
    id: "sign-guided-at-the-door",
    kind: "guided-at-the-door",
    caption:
      "Abu Hurairah said: I used to invite my mother to Islam, and she was a polytheist. One day I invited her, and she said to me about the Messenger of Allah ﷺ what I hated. I came to him weeping and asked him to pray for her, and he ﷺ said: O Allah, guide the mother of Abu Hurairah. I went out glad at his du'a, and when I reached the door it was shut. My mother heard my steps and said: stay where you are, Abu Hurairah; and I heard the sound of water. She washed, dressed and opened the door, and said: Abu Hurairah, I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and His Messenger. I went back to the Messenger of Allah ﷺ weeping for joy, and he praised Allah. I asked him to pray that the believers would love us, and he ﷺ said: O Allah, make this servant of Yours and his mother beloved to Your believing servants, and make the believers beloved to them.",
    sources: [muslim("2491")]
  },
  {
    id: "sign-prayer-made-short",
    kind: "prayer-made-short",
    caption: "The Prophet ﷺ said: I stand in prayer meaning to make it long, then I hear a child crying, so I make my prayer short, disliking to make it hard for his mother.",
    sources: [bukhari("707")]
  }
];

/**
 * The lessons that open on a scene, each read to check that it teaches what its scene shows (by the lesson's nodeId).
 * Left out: lessons that only touch a sign among other things (a whole passage of a surah), stories of people at sea,
 * and the Day of Judgment's seas and mountains. The gardens of the parables are drawn, never their owners. For the
 * stories, the lessons on the moment a scene shows; not the ones on what came before or after it (Pharaoh drowning,
 * Nuh's son, the shining hand, the parting from al-Khidr, Ya'juj and Ma'juj let loose at the end, Lut's guests and his
 * wife, the Sabbath-breakers made like apes, Dhul-Qarnayn's rulings), nor the reviews, nor the lessons on the twelve
 * paths through the sea (its scene shows the one dry path of 20:77), nor the ones on a hadith about a story (the virtue
 * of Yunus's dua, the gourd he ﷺ liked), but for the fast of Ashura: it is the day the sea split, as its caption tells.
 */
export const SIGN_LESSONS: Record<string, string> = {
  // Rain on a dead land, which comes to life.
  "deep-araf2-winds-rain": "sign-rain",
  "deep-hajj1-dead-earth-comes-alive": "sign-rain",
  "deep-furqan2-winds-bring-good-news": "sign-rain",
  "deep-furqan2-rain-shared-out": "sign-rain",
  "deep-ankabut4-rain-and-praise": "sign-rain",
  "deep-rum1-living-from-the-dead": "sign-rain",
  "deep-rum4-the-traces-of-mercy": "sign-rain",
  "deep-sajdah2-water-to-dry-land": "sign-rain",
  "deep-fatir1-winds-and-dead-land": "sign-rain",
  "deep-yasin2-the-dead-land-lives": "sign-rain",
  "deep-fussilat3-the-earth-comes-alive": "sign-rain",
  "deep-zukhruf1-rain-in-due-measure": "sign-rain",
  "deep-qaf1-the-dead-land-lives": "sign-rain",
  "deep-qaf1-blessed-rain": "sign-rain",
  "deep-hadid3-life-to-the-dead-earth": "sign-rain",
  "deep-nahl4-rain-brings-earth-to-life": "sign-rain",
  "deep-nahl1-rain-brings-crops": "sign-rain",
  "deep-anam2-rain-gardens": "sign-rain",
  "deep-zumar2-rain-then-crops": "sign-rain",
  "deep-abasa2-rain-and-split-earth": "sign-rain",
  "deep-abasa2-look-at-your-food": "sign-rain",
  "surah-meaning-80-17-32": "sign-rain",
  "deep-jathiyah1-night-day-rain-and-wind": "sign-rain",
  // Lightning in fear and hope, then the rain that revives the dead land: a sign of the Resurrection (Quran 30:24).
  "deep-rum2-lightning-fear-and-hope": "sign-rain",
  // The clouds driven and piled up, the rain from within them.
  "deep-nur2-allah-drives-the-clouds": "sign-clouds",
  "deep-rum4-clouds-and-raindrops": "sign-clouds",
  "deep-hijr1-fertilizing-winds": "sign-clouds",
  "deep-raad2-lightning-fear-and-hope": "sign-clouds",
  // Green, then yellow, then broken straw.
  "deep-zumar2-green-then-yellow": "sign-fade",
  "deep-hadid3-yellow-then-straw": "sign-fade",
  "deep-hadid3-like-rain-and-crops": "sign-fade",
  "deep-kahf2-like-rain-on-plants": "sign-fade",
  "deep-yunus2-world-like-crops": "sign-fade",
  "deep-ala1-green-pasture-to-dry-stubble": "sign-fade",
  // The seed of seven ears.
  "deep-zakat-spend-seven-hundred": "sign-seed",
  "surah-meaning-2-261-266": "sign-seed",
  "deep-baqarah3-seven-hundred": "sign-seed",
  // The two seas.
  "deep-furqan2-the-two-seas": "sign-seas",
  "deep-fatir1-two-seas": "sign-seas",
  "deep-rahman1-two-seas-meet": "sign-seas",
  "deep-rahman1-a-barrier-between": "sign-seas",
  "surah-meaning-55-14-25": "sign-seas",
  // The ships.
  "surah-meaning-22-65-72": "sign-ships",
  "deep-hajj3-ships-and-the-sky": "sign-ships",
  "surah-meaning-45-12-21": "sign-ships",
  "deep-jathiyah1-the-sea-made-of-service": "sign-ships",
  "deep-isra3-ships-on-the-sea": "sign-ships",
  "deep-luqman2-ships-by-his-grace": "sign-ships",
  "deep-shura2-ships-like-mountains": "sign-ships",
  "deep-rahman1-ships-like-mountains": "sign-ships",
  "deep-nahl1-the-sea-and-ships": "sign-ships",
  "deep-shura2-patient-and-grateful": "sign-ships",
  // The earth spread out, the mountains like pegs.
  "deep-naba1-mountains-as-pegs": "sign-mountains",
  "deep-naba1-the-earth-as-a-bed": "sign-mountains",
  "surah-meaning-78-1-16": "sign-mountains",
  "deep-qaf1-the-earth-spread-out": "sign-mountains",
  "deep-fussilat1-mountains-and-blessings": "sign-mountains",
  "deep-mursalat2-firm-mountains-sweet-water": "sign-mountains",
  "deep-naml4-a-steady-earth": "sign-mountains",
  "deep-anbiya1-mountains-and-a-guarded-sky": "sign-mountains",
  "deep-naziat3-mountains-fixed-firmly": "sign-mountains",
  "deep-hijr1-earth-spread-out": "sign-mountains",
  "deep-raad1-earth-spread-out": "sign-mountains",
  "deep-nahl1-mountains-roads-stars": "sign-mountains",
  // The bee and its honey.
  "surah-meaning-16-66-70": "sign-bee",
  "deep-nahl4-the-bee-is-guided": "sign-bee",
  "deep-nahl4-honey-is-a-cure": "sign-bee",
  "deep-nahl4-let-him-drink-honey": "sign-bee",
  // The spider's house.
  "surah-meaning-29-31-44": "sign-spider",
  "deep-ankabut3-the-spiders-house": "sign-spider",
  // The good tree.
  "surah-meaning-14-22-27": "sign-tree",
  "deep-ibrahim3-the-goodly-tree": "sign-tree",
  "deep-ibrahim3-the-date-palm": "sign-tree",
  // Look at the camel, the sky, the mountains and the earth.
  "surah-meaning-88-17-26": "sign-look",
  "deep-ghashiyah3-look-at-the-camel": "sign-look",
  "deep-ghashiyah3-the-sky-raised-high": "sign-look",
  "deep-ghashiyah3-mountains-and-earth": "sign-look",
  "deep-ghashiyah3-spread-and-still-round": "sign-look",
  // The birds held up in the sky.
  "deep-mulk-birds": "sign-birds",
  "surah-meaning-67-15-22": "sign-birds",
  "deep-mulk3-birds-held-up": "sign-birds",
  "deep-mulk3-gliding-and-flapping": "sign-birds",
  "deep-nahl5-birds-held-in-the-sky": "sign-birds",
  "deep-nur2-birds-glorify-allah": "sign-birds",
  "surah-meaning-24-41-50": "sign-birds",
  // The seed you sow.
  "deep-waqiah3-what-you-sow": "sign-sow",
  "deep-waqiah3-who-makes-it-grow": "sign-sow",
  "surah-meaning-56-57-74": "sign-sow",
  // The water you drink.
  "deep-waqiah3-the-water-you-drink": "sign-water",
  "deep-waqiah3-down-from-the-clouds": "sign-water",
  "deep-waqiah3-a-dua-for-rain": "sign-water",
  "deep-waqiah3-it-could-be-salty": "sign-water",
  // The fire you kindle, from the green tree.
  "deep-waqiah3-the-fire-you-kindle": "sign-fire",
  "deep-waqiah3-green-trees-that-spark": "sign-fire",
  "deep-waqiah3-a-reminder-of-the-fire": "sign-fire",
  "deep-waqiah3-a-gift-for-travelers": "sign-fire",
  "deep-waqiah3-fire-for-everyone": "sign-fire",
  "deep-yasin3-fire-from-green-trees": "sign-fire",
  // The shade stretched out and drawn in.
  "deep-furqan2-the-spreading-shadow": "sign-shade",
  "surah-meaning-25-45-60": "sign-shade",
  // The foam on the flood.
  "deep-raad2-foam-on-the-flood": "sign-foam",
  "deep-raad2-metal-in-the-fire": "sign-foam",
  "deep-raad2-hearts-like-valleys": "sign-foam",
  // The rain on three lands.
  "deep-raad2-rain-on-three-lands": "sign-lands",
  "deep-araf2-good-land": "sign-lands",
  // The ashes in a stormy wind.
  "surah-meaning-14-13-21": "sign-ashes",
  "deep-ibrahim2-deeds-like-ashes": "sign-ashes",
  // The garden struck in the night.
  "surah-meaning-68-17-33": "sign-garden",
  "deep-qalam3-the-garden-owners": "sign-garden",
  "deep-qalam3-a-secret-plan": "sign-garden",
  "deep-qalam3-like-a-dark-night": "sign-garden",
  // The two gardens.
  "deep-kahf2-the-two-gardens": "sign-two-gardens",
  "deep-kahf2-the-garden-ruined": "sign-two-gardens",
  "surah-meaning-18-32-44": "sign-two-gardens",
  "quran-surah-kahf-wealth-and-gardens": "sign-two-gardens",
  // Nuh's ark: built, boarded, carried on the flood, at rest on al-Judi.
  "prophets-early-messengers-nuh-and-patience": "sign-ark",
  "intro-nuh": "sign-ark",
  "deep-prophet-nuh-mocked": "sign-ark",
  "deep-prophet-nuh-flood": "sign-ark",
  "deep-prophet-nuh-judi": "sign-ark",
  "surah-meaning-11-25-49": "sign-ark",
  "surah-meaning-23-23-32": "sign-ark",
  "surah-meaning-26-105-122": "sign-ark",
  "deep-araf3-the-ark": "sign-ark",
  "deep-yunus4-saved-in-the-ark": "sign-ark",
  "deep-hud2-build-the-ship": "sign-ark",
  "deep-hud2-they-mocked-the-ship": "sign-ark",
  "deep-hud2-no-mountain-saves": "sign-ark",
  "deep-hud2-the-ship-rests-on-judi": "sign-ark",
  "deep-muminun1-dua-of-the-ark": "sign-ark",
  "deep-shuara2-the-laden-ship": "sign-ark",
  "deep-ankabut2-the-ark-a-sign": "sign-ark",
  "deep-yasin2-the-laden-ship": "sign-ark",
  "deep-qamar1-planks-and-nails": "sign-ark",
  "deep-qamar1-under-our-protection": "sign-ark",
  "deep-qamar1-gates-of-heaven-open": "sign-ark",
  "deep-haqqah1-carried-in-the-ship": "sign-ark",
  // The sea split for Musa, with a dry path through it.
  "deep-prophet-musa-sea": "sign-sea",
  "surah-meaning-26-53-69": "sign-sea",
  "surah-meaning-2-47-59": "sign-sea",
  "deep-baqarah1-sea-parted": "sign-sea",
  "deep-taha2-a-dry-path-in-the-sea": "sign-sea",
  "deep-dukhan2-leave-the-sea-calm": "sign-sea",
  // The day of Ashura, the day Allah saved Musa and his people through the sea (Sahih al-Bukhari 2004).
  "deep-prophet-musa-ashura": "sign-sea",
  "deep-days-ashura": "sign-sea",
  "deep-yunus4-ashura": "sign-sea",
  "deep-taha2-fasting-ashura": "sign-sea",
  "deep-shuara1-the-day-of-ashura": "sign-sea",
  "deep-dukhan2-the-ashura-fast": "sign-sea",
  "deep-naziat2-the-day-musa-was-saved": "sign-sea",
  // The clouds' shade, the manna and the quails, and the twelve springs.
  "deep-prophet-musa-twelve-springs": "sign-springs",
  "surah-meaning-2-60-61": "sign-springs",
  "deep-baqarah1-manna": "sign-springs",
  "deep-baqarah1-springs": "sign-springs",
  "deep-baqarah1-onions": "sign-springs",
  "deep-araf5-twelve-springs": "sign-springs",
  // The she-camel of Salih among Thamud's homes carved in the mountains.
  "prophets-early-messengers-hud-and-salih": "sign-she-camel",
  "deep-prophet-salih-rock-homes": "sign-she-camel",
  "deep-prophet-salih-turns": "sign-she-camel",
  "deep-prophet-salih-wretched": "sign-she-camel",
  "surah-meaning-11-61-68": "sign-she-camel",
  "surah-meaning-26-141-159": "sign-she-camel",
  "surah-meaning-91-11-15": "sign-she-camel",
  "deep-araf3-salih-camel": "sign-she-camel",
  "deep-hud3-the-she-camel-of-allah": "sign-she-camel",
  "deep-hijr4-dwellers-of-al-hijr": "sign-she-camel",
  "deep-shuara3-the-she-camel": "sign-she-camel",
  "deep-shuara3-touch-her-not": "sign-she-camel",
  "deep-qamar2-the-she-camel": "sign-she-camel",
  "deep-qamar2-they-harmed-the-camel": "sign-she-camel",
  "deep-shams3-the-she-camel-of-allah": "sign-she-camel",
  "deep-araf3-homes-in-mountains": "sign-she-camel",
  "deep-hijr4-homes-in-the-mountains": "sign-she-camel",
  "deep-shuara3-houses-in-the-mountains": "sign-she-camel",
  // The ant who warned the others, and Sulayman's thanks.
  "prophets-power-and-deliverance-sulayman-and-gratitude": "sign-ants",
  "deep-prophet-sulayman-ant": "sign-ants",
  "deep-dua-prophets-sulayman-thanks": "sign-ants",
  "deep-naml1-valley-of-the-ants": "sign-ants",
  "deep-naml1-a-smile-not-a-roar": "sign-ants",
  "surah-meaning-27-15-31": "sign-ants",
  // The hoopoe's news from Saba, and the letter.
  "deep-prophet-sulayman-hoopoe": "sign-hoopoe",
  "deep-quranwomen-saba-queen": "sign-hoopoe",
  "deep-naml2-the-missing-hoopoe": "sign-hoopoe",
  "deep-naml2-a-clear-reason": "sign-hoopoe",
  "deep-naml2-news-from-saba": "sign-hoopoe",
  "deep-naml2-the-noble-letter": "sign-hoopoe",
  // The king's dream of seven cows and seven ears, and its meaning.
  "deep-prophet-yusuf-kings-dream": "sign-dream",
  "surah-meaning-12-43-49": "sign-dream",
  "deep-yusuf3-seven-fat-cows": "sign-dream",
  "deep-yusuf3-store-it-in-the-ear": "sign-dream",
  "deep-yusuf3-a-year-of-relief": "sign-dream",
  // The cave: the sun turning away, the dog at the entrance, the years of sleep.
  "quran-surah-kahf-faith-under-trial": "sign-cave",
  "surah-meaning-18-1-12": "sign-cave",
  "surah-meaning-18-13-17": "sign-cave",
  "surah-meaning-18-18-22": "sign-cave",
  "deep-kahf1-the-young-mens-dua": "sign-cave",
  "deep-dua-believers-cave-mercy": "sign-cave",
  "deep-kahf1-the-sun-passed-them-by": "sign-cave",
  "deep-kahf1-asleep-yet-seeming-awake": "sign-cave",
  "deep-kahf1-a-sign-among-many": "sign-cave",
  "deep-kahf1-a-day-or-part-of-a-day": "sign-cave",
  // The elephant held back, and the birds with their stones of baked clay.
  "surah-meaning-105-1-2": "sign-elephant",
  "surah-meaning-105-3-5": "sign-elephant",
  "deep-fil1-the-owners-of-the-elephant": "sign-elephant",
  "deep-fil1-the-great-elephant": "sign-elephant",
  "deep-fil1-the-house-has-its-lord": "sign-elephant",
  "deep-fil1-the-elephant-kneels": "sign-elephant",
  "deep-fil1-their-plot-went-astray": "sign-elephant",
  "deep-fil2-held-back-from-makkah": "sign-elephant",
  "deep-fil2-birds-in-flocks": "sign-elephant",
  "deep-fil2-three-small-stones": "sign-elephant",
  "deep-fil2-stones-of-sijjil": "sign-elephant",
  "deep-fil2-like-eaten-straw": "sign-elephant",
  "deep-fil2-they-gained-no-good": "sign-elephant",
  "deep-fil2-the-year-of-his-birth": "sign-elephant",
  // The winter and summer journeys of Quraysh.
  "surah-meaning-106-1-2": "sign-journeys",
  "surah-meaning-106-3-4": "sign-journeys",
  "deep-quraysh1-winter-and-summer-journeys": "sign-journeys",
  "deep-quraysh1-ilaf-bringing-together": "sign-journeys",
  "deep-quraysh1-honored-travelers": "sign-journeys",
  "deep-quraysh2-fed-against-hunger": "sign-journeys",
  "deep-quraysh2-safe-from-fear": "sign-journeys",
  "deep-quraysh2-worship-the-lord-of-the-house": "sign-journeys",
  // Musa and the fire by the mount, the call in the holy valley of Tuwa, and the staff that became a snake.
  "surah-meaning-20-1-24": "sign-tur",
  "deep-taha1-musa-sees-a-fire": "sign-tur",
  "deep-taha1-take-off-your-shoes": "sign-tur",
  "deep-taha1-the-staff-became-a-snake": "sign-tur",
  "surah-meaning-27-1-14": "sign-tur",
  "deep-naml1-musa-sees-a-fire": "sign-tur",
  "deep-naml1-the-green-bush": "sign-tur",
  "surah-meaning-28-29-42": "sign-tur",
  "deep-qasas3-a-fire-on-a-cold-night": "sign-tur",
  "deep-qasas3-i-am-allah": "sign-tur",
  "deep-naziat2-the-valley-of-tuwa": "sign-tur",
  "deep-prophet-musa-tuwa": "sign-tur",
  // The sorcerers' ropes and staffs, swallowed by Musa's staff.
  "surah-meaning-7-109-126": "sign-staff",
  "deep-araf4-staff-swallows": "sign-staff",
  "surah-meaning-20-55-76": "sign-staff",
  "deep-taha2-you-throw-first": "sign-staff",
  "deep-taha2-it-swallowed-their-tricks": "sign-staff",
  "surah-meaning-26-34-52": "sign-staff",
  "deep-shuara1-the-sorcerers-bow-down": "sign-staff",
  // Musa's journey to where the two seas meet: the fish, the boat, the wall and the orphans' treasure.
  "quran-surah-kahf-knowledge-and-khidr": "sign-khidr",
  "surah-meaning-18-60-70": "sign-khidr",
  "surah-meaning-18-71-82": "sign-khidr",
  "deep-kahf3-musa-will-not-give-up": "sign-khidr",
  "deep-kahf3-the-fish-was-the-sign": "sign-khidr",
  "deep-kahf3-a-servant-given-knowledge": "sign-khidr",
  "deep-kahf3-the-damaged-boat": "sign-khidr",
  "deep-kahf3-the-boat-was-saved": "sign-khidr",
  "deep-kahf3-the-wall-set-straight": "sign-khidr",
  "deep-kahf3-the-orphans-treasure": "sign-khidr",
  "deep-prophet-musa-khidr": "sign-khidr",
  "deep-prophet-yusha-helper": "sign-khidr",
  "deep-prophet-yusha-fish-forgot": "sign-khidr",
  "deep-ubayy-musa-and-khidr": "sign-khidr",
  // The barrier of iron and copper between two mountains.
  "quran-surah-kahf-power-and-dhulqarnayn": "sign-barrier",
  "surah-meaning-18-83-101": "sign-barrier",
  "deep-kahf4-the-people-between-two-mountains": "sign-barrier",
  "deep-kahf4-the-iron-barrier": "sign-barrier",
  // Yunus: the laden ship, the great fish, the darknesses, the shore and the gourd plant, and his people who believed.
  "notes-prophets-prophets-from-your-notes-3-yunus": "sign-yunus",
  "deep-prophet-yunus-ship": "sign-yunus",
  "deep-prophet-yunus-fish": "sign-yunus",
  "deep-prophet-yunus-darkness": "sign-yunus",
  "deep-prophet-yunus-shore": "sign-yunus",
  "deep-prophet-yunus-town-believed": "sign-yunus",
  "deep-dua-quran-yunus": "sign-yunus",
  "surah-meaning-10-94-103": "sign-yunus",
  "surah-meaning-37-139-182": "sign-yunus",
  "surah-meaning-68-48-52": "sign-yunus",
  "deep-yunus5-people-of-yunus": "sign-yunus",
  "deep-anbiya3-yunus-in-darkness": "sign-yunus",
  "deep-saffat5-the-laden-ship": "sign-yunus",
  "deep-saffat5-the-great-fish": "sign-yunus",
  "deep-saffat5-he-glorified-allah": "sign-yunus",
  "deep-saffat5-the-gourd-plant": "sign-yunus",
  "deep-saffat5-they-believed": "sign-yunus",
  "deep-qalam6-companion-of-the-fish": "sign-yunus",
  "deep-qalam6-distressed-in-the-dark": "sign-yunus",
  "deep-qalam6-the-dua-of-yunus": "sign-yunus",
  // Maryam by the palm tree: the stream beneath her and the fresh dates.
  "surah-meaning-19-16-26": "sign-maryam",
  "deep-maryam1-a-far-place": "sign-maryam",
  "deep-maryam1-by-the-palm-tree": "sign-maryam",
  "deep-maryam1-dates-and-a-stream": "sign-maryam",
  "deep-prophet-isa-palm-tree": "sign-maryam",
  "deep-quranwomen-maryam-palm": "sign-maryam",
  // Dawud: the mountains and the birds glorifying Allah with him, the iron made soft, and the coats of mail.
  "surah-meaning-38-15-26": "sign-dawud",
  "deep-prophet-dawud-mountains-birds": "sign-dawud",
  "deep-anbiya3-mountains-birds-dawud": "sign-dawud",
  "deep-anbiya3-dawud-armor": "sign-dawud",
  "deep-saba1-mountains-sang-with-dawud": "sign-dawud",
  "deep-saba1-perfect-coats-of-mail": "sign-dawud",
  "deep-sad2-the-mountains-glorify": "sign-dawud",
  "deep-sad2-the-birds-assembled": "sign-dawud",
  // The House raised in a valley without crops, and the call to Hajj.
  "prophets-family-and-sacrifice-ismail-and-submission": "sign-house",
  "surah-meaning-2-122-129": "sign-house",
  "surah-meaning-22-26-33": "sign-house",
  "deep-hajj-house-raising": "sign-house",
  "deep-hajj-house-valley": "sign-house",
  "deep-hajj-house-proclaim": "sign-house",
  "deep-prophet-ismail-valley": "sign-house",
  "deep-prophet-ismail-building": "sign-house",
  "deep-baqarah2-raising-house": "sign-house",
  "deep-ibrahim4-a-valley-without-crops": "sign-house",
  "deep-hajj2-site-of-the-house": "sign-house",
  "deep-hajj2-proclaim-the-hajj": "sign-house",
  // Safa and Marwah, the seven times between them, and the water of Zamzam.
  "hajj-rites-sai": "sign-zamzam",
  "notes-women-of-the-book-mothers-of-the-believers-from-your-notes-1-hajar": "sign-zamzam",
  "deep-hajj-kabah-safa-marwah": "sign-zamzam",
  "deep-prophet-ismail-jurhum": "sign-zamzam",
  "deep-quranwomen-hajar-safa-marwah": "sign-zamzam",
  "deep-baqarah2-safa-marwah": "sign-zamzam",
  // The queen's throne, brought in the blink of an eye and disguised, and the palace paved with glass.
  "surah-meaning-27-32-44": "sign-throne",
  "deep-prophet-sulayman-queen": "sign-throne",
  "deep-quranwomen-saba-submits": "sign-throne",
  "deep-naml2-the-throne-in-a-blink": "sign-throne",
  "deep-naml2-as-though-it-were": "sign-throne",
  "deep-naml2-the-glass-palace": "sign-throne",
  // The provision with Maryam in the mihrab, and Zakariyya's call to his Lord there.
  "deep-prophet-zakariyya-maryam": "sign-mihrab",
  "deep-prophet-zakariyya-good-offspring": "sign-mihrab",
  "deep-quranwomen-maryam-provision": "sign-mihrab",
  "deep-imran1-from-allah": "sign-mihrab",
  "deep-imran1-zakariyya-dua": "sign-mihrab",
  // The fire made coolness and safety for Ibrahim.
  "surah-meaning-21-51-75": "sign-cool-fire",
  "deep-prophet-ibrahim-fire": "sign-cool-fire",
  "deep-anbiya2-o-fire-be-cool": "sign-cool-fire",
  "deep-anbiya2-allah-is-sufficient-for-us": "sign-cool-fire",
  "deep-ankabut2-saved-from-the-fire": "sign-cool-fire",
  "deep-saffat3-into-the-fire": "sign-cool-fire",
  "deep-saffat3-made-the-lowest": "sign-cool-fire",
  // 'Ad's towers, the cloud they took for rain, and the wind of seven nights and eight days.
  "surah-meaning-26-123-140": "sign-ad-wind",
  "surah-meaning-46-21-26": "sign-ad-wind",
  "deep-prophet-hud-towers": "sign-ad-wind",
  "deep-prophet-hud-cloud": "sign-ad-wind",
  "deep-prophet-hud-winds": "sign-ad-wind",
  "deep-prophet-hud-ahqaf": "sign-ad-wind",
  "deep-araf3-the-west-wind": "sign-ad-wind",
  "deep-hud3-aad-and-the-wind": "sign-ad-wind",
  "deep-shuara2-building-to-show-off": "sign-ad-wind",
  "deep-fussilat1-the-sarsar-wind": "sign-ad-wind",
  "deep-ahqaf2-the-brother-of-ad": "sign-ad-wind",
  "deep-ahqaf2-a-cloud-they-misread": "sign-ad-wind",
  "deep-dhariyat2-the-barren-wind": "sign-ad-wind",
  "deep-dhariyat2-the-east-wind-helped": "sign-ad-wind",
  "deep-qamar2-a-cold-wind": "sign-ad-wind",
  "deep-qamar2-east-wind-and-west-wind": "sign-ad-wind",
  "deep-qamar2-like-uprooted-palms": "sign-ad-wind",
  "deep-haqqah1-ad-and-the-wind": "sign-ad-wind",
  "deep-haqqah1-east-and-west-wind": "sign-ad-wind",
  "deep-haqqah1-seven-nights-eight-days": "sign-ad-wind",
  "deep-fajr2-the-people-of-ad": "sign-ad-wind",
  "deep-najm3-the-former-ad": "sign-ad-wind",
  // The chest cast into the river, his sister following it, and Musa returned to his mother.
  "women-mother-musa": "sign-river",
  "women-quran-depth-mother-of-musa-and-trust": "sign-river",
  "women-virtues-and-legacy-courage-under-pressure": "sign-river",
  "surah-meaning-28-1-13": "sign-river",
  "deep-prophet-musa-river": "sign-river",
  "deep-prophet-musa-returned": "sign-river",
  "deep-quranwomen-musa-mother-promise": "sign-river",
  "deep-quranwomen-musa-mother-heart": "sign-river",
  "deep-quranwomen-musa-sister": "sign-river",
  "deep-quranwomen-asiyah-dont-kill": "sign-river",
  "deep-taha1-under-my-eye": "sign-river",
  "deep-qasas1-the-mother-of-musa-is-inspired": "sign-river",
  "deep-qasas1-the-box-on-the-nile": "sign-river",
  "deep-qasas1-an-empty-heart": "sign-river",
  "deep-qasas1-his-sister-follows": "sign-river",
  "deep-qasas1-no-nurse-but-his-mother": "sign-river",
  // Qarun's treasure, his finery, and the earth swallowing him and his home.
  "surah-meaning-28-76-88": "sign-qarun",
  "deep-prophet-musa-qarun": "sign-qarun",
  "deep-qasas7-qarun-and-his-treasure": "sign-qarun",
  "deep-qasas7-do-not-exult": "sign-qarun",
  "deep-qasas7-because-of-my-knowledge": "sign-qarun",
  "deep-qasas7-qarun-shows-off": "sign-qarun",
  "deep-qasas7-the-earth-took-him": "sign-qarun",
  "deep-zumar3-like-qarun": "sign-qarun",
  // The well of Madyan, the flock watered for the two women, and the shade.
  "surah-meaning-28-22-28": "sign-madyan",
  "deep-prophet-musa-madyan": "sign-madyan",
  "deep-quranwomen-madyan-sisters": "sign-madyan",
  "deep-qasas2-two-women-at-the-well": "sign-madyan",
  "deep-qasas2-i-am-in-need": "sign-madyan",
  // Ayyub's call, the cool spring, and the golden locusts.
  "notes-prophets-prophets-from-your-notes-1-ayyub": "sign-ayyub",
  "surah-meaning-38-41-64": "sign-ayyub",
  "deep-prophet-ayyub-called": "sign-ayyub",
  "deep-prophet-ayyub-spring": "sign-ayyub",
  "deep-prophet-ayyub-excellent": "sign-ayyub",
  "deep-prophet-ayyub-locusts": "sign-ayyub",
  "deep-dua-prophets-ayyub-harm": "sign-ayyub",
  "deep-anbiya3-ayyub-patience": "sign-ayyub",
  "deep-sad3-ayyub-calls-his-lord": "sign-ayyub",
  "deep-sad3-the-most-merciful": "sign-ayyub",
  "deep-sad3-strike-the-ground": "sign-ayyub",
  "deep-sad3-servant-in-ease-and-hardship": "sign-ayyub",
  // Yusuf's dream of eleven stars, the sun and the moon, and the dream made true.
  "surah-meaning-12-1-6": "sign-yusuf-dream",
  "surah-meaning-12-94-104": "sign-yusuf-dream",
  "deep-prophet-yusuf-dream": "sign-yusuf-dream",
  "deep-prophet-yusuf-dream-true": "sign-yusuf-dream",
  "deep-yusuf1-eleven-stars-sun-and-moon": "sign-yusuf-dream",
  "deep-yusuf1-keep-the-dream-quiet": "sign-yusuf-dream",
  "deep-yusuf5-the-dream-comes-true": "sign-yusuf-dream",
  // The measure and the balance: taken in full and given short, then given in full and weighed straight.
  "surah-meaning-26-176-191": "sign-measure",
  "surah-meaning-83-1-17": "sign-measure",
  "deep-prophet-shuaib-measure": "sign-measure",
  "deep-araf3-full-measure": "sign-measure",
  "deep-hud5-shuayb-and-fair-measure": "sign-measure",
  "deep-hud5-what-allah-leaves-is-better": "sign-measure",
  "deep-isra2-a-straight-balance": "sign-measure",
  "deep-shuara3-give-full-measure": "sign-measure",
  "deep-rahman1-weigh-with-justice": "sign-measure",
  "deep-mutaffifin1-woe-to-the-cheaters": "sign-measure",
  "deep-mutaffifin1-full-measure-for-themselves": "sign-measure",
  "deep-mutaffifin1-give-full-measure": "sign-measure",
  "deep-kids-trust-weigh-a-little-more": "sign-measure",
  // Ibrahim's dream, and the great sacrifice his son was ransomed with.
  "surah-meaning-37-75-113": "sign-ram",
  "deep-prophet-ibrahim-dream": "sign-ram",
  "deep-dhul-hijjah-ibrahims-dream": "sign-ram",
  "deep-dhul-hijjah-the-ram": "sign-ram",
  "deep-saffat4-the-dream": "sign-ram",
  "deep-saffat4-do-what-you-are-commanded": "sign-ram",
  "deep-saffat4-patience-with-in-sha-allah": "sign-ram",
  "deep-saffat4-both-submitted": "sign-ram",
  "deep-saffat4-o-ibrahim": "sign-ram",
  "deep-saffat4-you-fulfilled-the-dream": "sign-ram",
  "deep-saffat4-a-clear-test": "sign-ram",
  "deep-saffat4-a-great-ransom": "sign-ram",
  // The qiblah turned from Jerusalem to the Ka'bah.
  "surah-meaning-2-142-147": "sign-qiblah",
  "deep-bara-the-new-qiblah": "sign-qiblah",
  "deep-baqarah2-fools-qiblah": "sign-qiblah",
  "deep-baqarah2-turn-face": "sign-qiblah",
  "deep-first-prayers-facing-the-qiblah": "sign-qiblah",
  // The two gardens of Saba, the flood of the dam, and their scattering.
  "deep-saba1-two-gardens-of-saba": "sign-saba",
  "deep-saba1-the-dam-burst": "sign-saba",
  "deep-saba1-only-the-ungrateful": "sign-saba",
  "deep-saba1-scattered-like-saba": "sign-saba",
  // The cow Bani Isra'il were told to sacrifice.
  "surah-meaning-2-62-71": "sign-cow",
  "deep-baqarah1-the-cow": "sign-cow",
  "deep-baqarah1-too-many-questions": "sign-cow",
  // Lut's town: the way out by night, the morning, the town turned upside down, the stones, and the sign left.
  "deep-prophet-lut-stones": "sign-overturned",
  "deep-hud4-leave-by-night": "sign-overturned",
  "deep-hud4-the-town-overturned": "sign-overturned",
  "deep-hijr3-leave-by-night": "sign-overturned",
  "deep-hijr3-ruins-on-the-highroad": "sign-overturned",
  "deep-shuara3-lut-is-saved": "sign-overturned",
  "deep-ankabut3-for-their-rebellion": "sign-overturned",
  "deep-ankabut3-a-clear-sign-left": "sign-overturned",
  "deep-saffat5-lut-saved": "sign-overturned",
  "deep-saffat5-the-rest-destroyed": "sign-overturned",
  "deep-saffat5-you-pass-by-them": "sign-overturned",
  "deep-dhariyat2-stones-marked-by-allah": "sign-overturned",
  "deep-dhariyat2-marked-by-your-lord": "sign-overturned",
  "deep-dhariyat2-a-sign-left-behind": "sign-overturned",
  "deep-najm3-the-overturned-cities": "sign-overturned",
  "deep-najm3-what-covered-them": "sign-overturned",
  "deep-qamar2-saved-before-dawn": "sign-overturned",
  "deep-qamar2-seized-in-the-morning": "sign-overturned",
  // The signs on Pharaoh's people, one after another.
  "surah-meaning-7-127-141": "sign-five-signs",
  "deep-araf4-years-of-drought": "sign-five-signs",
  "deep-araf4-five-signs": "sign-five-signs",
  "deep-zukhruf3-each-sign-greater": "sign-five-signs",
  "deep-zukhruf3-they-broke-their-word": "sign-five-signs",
  // The town by the sea, and its fish on the Sabbath.
  "deep-araf5-sabbath-town": "sign-sabbath",
  // Dhul-Qarnayn's ways, to where the sun sets and to where it rises.
  "deep-kahf4-dhul-qarnayn-given-power": "sign-west-east",
  "deep-kahf4-journey-to-the-west": "sign-west-east",
  "deep-kahf4-journey-to-the-east": "sign-west-east",
  // Ibrahim's four birds.
  "deep-prophet-ibrahim-birds": "sign-four-birds",
  "deep-baqarah3-four-birds": "sign-four-birds",
  // The town fallen on its roofs, the hundred years, and the donkey.
  "deep-baqarah3-hundred-years": "sign-hundred-years",
  // Yusuf's shirt, its scent, and his father's sight.
  "deep-yusuf5-the-scent-of-yusuf": "sign-shirt",
  "deep-yusuf5-his-sight-returns": "sign-shirt",
  // Ibrahim's honored guests, the roasted calf, and the good news of Ishaq and Ya'qub.
  "deep-prophet-ibrahim-guests": "sign-guests",
  "deep-prophet-ishaq-yaqub-good-news": "sign-guests",
  "deep-quranwomen-sarah-smiled": "sign-guests",
  "surah-meaning-11-69-83": "sign-guests",
  "surah-meaning-15-45-60": "sign-guests",
  "surah-meaning-51-24-46": "sign-guests",
  "deep-hud4-ibrahims-guests": "sign-guests",
  "deep-hud4-honour-your-guest": "sign-guests",
  "deep-hud4-hands-did-not-reach": "sign-guests",
  "deep-hud4-good-news-of-ishaq": "sign-guests",
  "deep-hud4-do-you-wonder-at-allahs-decree": "sign-guests",
  "deep-hijr3-ibrahims-guests": "sign-guests",
  "deep-hijr3-news-of-a-son": "sign-guests",
  "deep-hijr3-never-despair": "sign-guests",
  "deep-dhariyat2-ibrahims-honored-guests": "sign-guests",
  "deep-dhariyat2-a-better-greeting": "sign-guests",
  "deep-dhariyat2-the-best-food-quickly": "sign-guests",
  "deep-dhariyat2-manners-with-guests": "sign-guests",
  "deep-dhariyat2-good-news-of-a-son": "sign-guests",
  "deep-dhariyat2-an-old-woman-amazed": "sign-guests",
  // Asking forgiveness, and the rain, wealth, gardens and rivers it brings.
  "deep-prophet-nuh-istighfar": "sign-forgiveness",
  "surah-meaning-11-50-60": "sign-forgiveness",
  "surah-meaning-71-10-20": "sign-forgiveness",
  "deep-hud3-repent-for-rain-and-strength": "sign-forgiveness",
  "deep-nuh2-ask-forgiveness": "sign-forgiveness",
  "deep-nuh2-rain-from-istighfar": "sign-forgiveness",
  "deep-nuh2-wealth-children-gardens": "sign-forgiveness",
  // The wind made to serve Sulayman, and the spring of molten copper.
  "deep-prophet-sulayman-wind-jinn": "sign-wind",
  "deep-anbiya3-wind-for-sulayman": "sign-wind",
  "deep-saba1-the-wind-for-sulayman": "sign-wind",
  "deep-saba1-work-with-thanks": "sign-wind",
  "deep-sad2-the-wind-obeyed": "sign-wind",
  // Iram of the pillars, Thamud who carved the rocks, Pharaoh, and the scourge poured on them.
  "surah-meaning-89-1-14": "sign-pillars",
  "deep-fajr2-iram-of-the-pillars": "sign-pillars",
  "deep-fajr2-thamud-who-carved-rocks": "sign-pillars",
  "deep-fajr2-firawn-and-his-armies": "sign-pillars",
  "deep-fajr2-they-spread-corruption": "sign-pillars",
  "deep-fajr2-ever-watchful": "sign-pillars",
  // The cup put in a bag of the caravan, and brought out of his brother's bag.
  "surah-meaning-12-69-79": "sign-cup",
  "deep-yusuf4-the-kings-cup": "sign-cup",
  "deep-yusuf4-by-their-own-ruling": "sign-cup",
  // The bird of clay, a bird by Allah's permission.
  "deep-prophet-isa-miracles": "sign-clay-bird",
  "deep-imran1-by-allahs-leave": "sign-clay-bird",
  "deep-maidah2-isa-miracles": "sign-clay-bird",
  // The fire that went out, and the storm.
  "surah-meaning-2-8-20": "sign-storm",
  "deep-baqarah1-fire-parable": "sign-storm",
  "deep-baqarah1-storm-parable": "sign-storm",
  // What zakat is due on: camels, silver and crops.
  "deep-book-zakat-the-nisab": "sign-zakat",
  "deep-book-zakat-zakat-on-crops": "sign-zakat",
  "zakat-meaning-and-duty-obligation-and-seriousness": "sign-zakat",
  "zakat-meaning-and-duty-nisab-and-threshold": "sign-zakat",
  // Mu'adh sent to Yemen: the shahadah, the prayers, then zakat from their rich to their poor.
  "deep-zakat-pillar-rich-to-poor": "sign-yemen",
  "deep-fresh-start-what-comes-first": "sign-yemen",
  "deep-muadh-first-things-first": "sign-yemen",
  // Bayruha, given for Allah.
  "deep-zakat-spend-bayruha": "sign-bayruha",
  "deep-abu-talhah-bayruha": "sign-bayruha",
  "surah-meaning-3-81-101": "sign-bayruha",
  "deep-zakat-spend-what-you-love": "sign-bayruha",
  "deep-imran2-what-you-love": "sign-bayruha",
  // Zakat al-Fitr: a sa' for every one, before the Eid prayer.
  "deep-zakat-fitr-everyone": "sign-fitr",
  "deep-zakat-fitr-before-prayer": "sign-fitr",
  "deep-zakat-fitr-two-purposes": "sign-fitr",
  "deep-zakat-fitr-foods": "sign-fitr",
  "deep-zakat-fitr-final-quiz": "sign-fitr",
  "deep-eid-zakat-fitr": "sign-fitr",
  // The morning of Eid.
  "deep-eid-fitr-dates": "sign-eid",
  "ramadan-eid-morning": "sign-eid",
  "deep-eid-prayer-first": "sign-eid",
  "deep-eid-other-way": "sign-eid",
  "deep-prayer-sutrah-a-spear-in-front-of-him": "sign-eid",
  "deep-eid-order-no-adhan": "sign-eid",
  "deep-eid-order-two-rakahs": "sign-eid",
  "deep-eid-order-a-boy-at-eid": "sign-eid",
  "deep-eid-everyone-out": "sign-eid",
  "deep-eid-order-final-quiz": "sign-eid",
  "deep-qaf1-recited-on-eid": "sign-eid",
  "deep-qamar1-recited-on-eid": "sign-eid",
  // Water for a thirsty dog.
  "deep-zakat-everyday-thirsty-dog": "sign-thirsty-dog",
  "deep-mercy-the-thirsty-dog": "sign-thirsty-dog",
  "deep-hadith-stories-the-thirsty-dog": "sign-thirsty-dog",
  // A thorny branch moved out of the way: removing harm from the way.
  "deep-kids-small-deeds-the-thorny-branch": "sign-thorny-branch",
  "deep-zakat-everyday-road": "sign-thorny-branch",
  "manners-neighbors-and-guests-helping-neighbors": "sign-thorny-branch",
  "deep-intro-questions-they-asked-something-that-benefits": "sign-thorny-branch",
  // A tree planted: what a bird, a person or an animal eats from it is charity.
  "deep-zakat-everyday-tree": "sign-planting",
  "deep-mercy-plant-a-tree": "sign-planting",
  // Umar's land at Khaybar, kept for charity.
  "deep-zakat-everyday-umar-land": "sign-waqf",
  "deep-book-wills-the-keeper-of-a-waqf": "sign-waqf",
  // Asking permission three times, then going back; the youngest went as the witness.
  "deep-adab-knock-three-times": "sign-permission",
  "deep-manners-permission-three-times": "sign-permission",
  "deep-umar-three-knocks": "sign-permission",
  "deep-ubayy-witness": "sign-permission",
  "deep-abu-musa-three-knocks": "sign-permission",
  "deep-nur1-abu-musa-at-umars-door": "sign-permission",
  // The first call to prayer, and walking calmly to the prayer. Left out: joining the prayer late, which is about
  // finishing what you missed.
  "prayer-adhan-and-iqamah-what-the-adhan-is": "sign-adhan",
  "sahabi-bilal-ibn-rabah-service-to-revelation": "sign-adhan",
  "deep-pray-adhan-reward-first-adhan": "sign-adhan",
  "deep-bilal-first-adhan": "sign-adhan",
  "prayer-adhan-and-iqamah-masjid-readiness": "sign-adhan",
  "deep-furqan2-walk-calmly-to-prayer": "sign-adhan",
  "deep-jumuah3-come-with-calm": "sign-adhan",
  // The wet grain hidden in the heap: whoever cheats is not of me.
  "deep-honesty-the-wet-grain": "sign-wet-grain",
  "deep-hud5-whoever-cheats": "sign-wet-grain",
  "deep-rahman1-he-who-cheats": "sign-wet-grain",
  "deep-mutaffifin1-whoever-cheats": "sign-wet-grain",
  // The well of Rumah and the army of hardship.
  "sahabi-uthman-ibn-affan-sacrifice-for-islam": "sign-rumah",
  "sahabi-uthman-ibn-affan-public-service-and-counsel": "sign-rumah",
  "deep-uthman-rumah": "sign-rumah",
  // A river at the door, five times a day: the five prayers (Sahih al-Bukhari 528).
  "deep-prayerlive-river": "sign-river-at-the-door",
  "deep-hud6-good-deeds-remove-bad": "sign-river-at-the-door",
  "intro-five-prayers": "sign-river-at-the-door",
  // Ka'b ibn Malik and Tabuk (Sahih al-Bukhari 4418; Quran 9:118). The night of Al-Aqabah, before the Hijrah, keeps its
  // photo.
  "deep-kab-strongest": "sign-tabuk",
  "deep-kab-delay": "sign-tabuk",
  "deep-kab-at-tabuk": "sign-tabuk",
  "deep-kab-truth": "sign-tabuk",
  "deep-kab-three": "sign-tabuk",
  "deep-kab-fifty-nights": "sign-tabuk",
  "deep-kab-kings-letter": "sign-tabuk",
  "deep-kab-be-happy": "sign-tabuk",
  "deep-kab-best-day": "sign-tabuk",
  "deep-kab-allah-forgave": "sign-tabuk",
  "deep-kab-truth-forever": "sign-tabuk",
  "deep-tawbah5-never-stronger": "sign-tabuk",
  "deep-tawbah5-saved-by-the-truth": "sign-tabuk",
  "notes-sahabah-companions-from-your-notes-5-kaab-ibn-malik": "sign-tabuk",
  "surah-meaning-9-111-122": "sign-tabuk",
  // The cave of Thawr on the Hijrah (Sahih al-Bukhari 3905, 3653).
  "deep-abubakr-waiting-for-hijrah": "sign-thawr",
  "deep-abubakr-cave-of-thawr": "sign-thawr",
  "deep-abubakr-hijrah-helpers": "sign-thawr",
  "deep-abubakr-do-not-grieve": "sign-thawr",
  "deep-asma-two-belts": "sign-thawr",
  "deep-tawbah2-second-of-two": "sign-thawr",
  "deep-tawbah2-allah-the-third": "sign-thawr",
  "deep-shuara1-the-third-is-allah": "sign-thawr",
  "surah-meaning-9-38-42": "sign-thawr",
  "sahabi-abu-bakr-hijrah-and-turning-points": "sign-thawr",
  // The plague in Sham, and Umar at Sargh (Sahih al-Bukhari 5729).
  "deep-umar-plague": "sign-plague",
  "deep-abuubaydah-decree": "sign-plague",
  // Believers like a building, each part holding up the other (Sahih al-Bukhari 481, 6026).
  "deep-brotherhood-a-building": "sign-building",
  "deep-tawbah3-like-a-wall": "sign-building",
  "deep-fath3-like-a-building": "sign-building",
  "deep-saff1-bricks-of-a-wall": "sign-building",
  // Mercy in a hundred parts, and the mare and her foal (Sahih al-Bukhari 6000, 6469).
  "deep-hadith-qudsi-hundred-parts": "sign-mercy",
  "deep-jahannam-mercy": "sign-mercy",
  "deep-araf5-mercy-embraces": "sign-mercy",
  "deep-hijr2-hundred-parts-of-mercy": "sign-mercy",
  // The halal, the haram, the doubtful things between, and grazing around a sanctuary (Sahih al-Bukhari 52).
  "deep-hadith-famous-clear-and-doubtful": "sign-sanctuary",
  "deep-numan-clear-and-doubtful": "sign-sanctuary",
  "deep-daily-life-clear-and-unclear": "sign-sanctuary",
  // The musk and the bellows (Sahih al-Bukhari 5534).
  "deep-furqan1-musk-seller-and-blacksmith": "sign-musk",
  // The people who shared a ship (Sahih al-Bukhari 2493).
  "deep-numan-the-ship": "sign-shared-ship",
  // Three men shut in a cave, and the good deeds they asked Allah by (Sahih al-Bukhari 2272).
  "deep-hadith-stories-the-cave": "sign-shut-cave",
  // A loan sent across the sea in a piece of wood (Sahih al-Bukhari 2291).
  "deep-hadith-stories-the-wooden-box": "sign-log-at-sea",
  // The Quran by heart like tied camels, and keep reviewing it (Sahih al-Bukhari 5031, 5033).
  "deep-book-quran-virtues-like-tied-camels": "sign-tied-camels",
  "deep-book-quran-virtues-it-slips-away-fast": "sign-tied-camels",
  // Be in this world as a stranger or a traveler (Sahih al-Bukhari 6416), like a rider resting in a tree's shade (Jami
  // at-Tirmidhi 2377). Not the lesson on taking from your health for your sickness, which the scene does not show.
  "deep-ready-traveler": "sign-traveler",
  "deep-waqiah3-a-traveler-in-this-world": "sign-traveler",
  "deep-munafiqun3-like-a-traveler": "sign-traveler",
  "deep-naziat4-a-stranger-or-a-traveller": "sign-traveler",
  "deep-humazah1-like-a-traveler": "sign-traveler",
  "deep-qiyamah2-a-stranger-or-a-traveler": "sign-traveler",
  "deep-duha1-like-a-rider-under-a-tree": "sign-traveler",
  // One who recites the Quran like a citron, and one who does not like a date (Sahih al-Bukhari 5020).
  "deep-book-quran-virtues-like-a-citron": "sign-citron",
  // The trader who let off those in hardship, and Allah forgave him (Sahih al-Bukhari 2078).
  "deep-hadith-stories-the-forgiving-trader": "sign-forgiving-trader",
  "deep-book-trade-forgive-the-debtor": "sign-forgiving-trader",
  // The birds that go out hungry and come back full (Jami at-Tirmidhi 2344), and the lesson on 67:15 that teaches it:
  // walk its paths and eat of His provision, working and trusting Allah.
  "deep-mulk3-like-the-birds": "sign-hungry-birds",
  "deep-mumtahanah2-like-the-birds": "sign-hungry-birds",
  "deep-ankabut4-like-the-birds": "sign-hungry-birds",
  "deep-mulk-earth": "sign-hungry-birds",
  // A sheep wandering between two flocks (Sahih Muslim 2784).
  "deep-munafiqun1-sheep-between-flocks": "sign-two-flocks",
  // The fresh plant the wind bends, and the hard pine (Sahih al-Bukhari 5644).
  "deep-aqidah-steady-on-the-path-a-plant-that-bends": "sign-bending-plant",
  // One who remembers his Lord and one who does not, like the living and the dead (Sahih al-Bukhari 6407).
  "deep-kids-dhikr-alive-heart": "sign-remember",
  "deep-dua-dhikr-living-dead": "sign-remember",
  "deep-raad3-living-and-dead": "sign-remember",
  "deep-ahzab2-remember-allah-much": "sign-remember",
  "deep-mujadila3-living-heart": "sign-remember",
  // Allah more pleased with His servant's repentance than one who found his lost camel (Sahih Muslim 2747), with 42:25.
  "deep-shura2-he-accepts-repentance": "sign-lost-camel",
  // A believer is not stung from the same hole twice (Sahih al-Bukhari 6133).
  "deep-book-adab-not-stung-twice": "sign-stung-twice",
  // The doors of good (Jami at-Tirmidhi 2616): charity puts out sins as water puts out fire, and the lesson on 32:16,
  // which he ﷺ recited after naming prayer deep in the night.
  "deep-zakat-pillar-puts-out-sin": "sign-doors-of-good",
  "deep-sajdah2-doors-of-good": "sign-doors-of-good",
  // The square he ﷺ drew, with the line of hope going out of it (Sahih al-Bukhari 6417).
  "deep-book-riqaq-the-square-and-the-line": "sign-square-and-line",
  // More water in the soup, for the neighbors (Sahih Muslim 2625b).
  "deep-neighbors-more-water": "sign-more-water",
  "zakat-broader-generosity-care-for-neighbors": "sign-more-water",
  // A charity for every joint: a good word, help with a ride, judging fairly (Sahih Muslim 1009, Sahih al-Bukhari 2989).
  "deep-speech-good-word": "sign-joint-charity",
  "deep-kids-small-deeds-charity-for-every-joint": "sign-joint-charity",
  // Two hungry wolves among sheep, and greed for wealth and honor (Jami at-Tirmidhi 2376).
  "deep-akhirah-this-world-two-wolves": "sign-two-wolves",
  // Sins falling as a tree sheds its leaves, even for the prick of a thorn (Sahih al-Bukhari 5648).
  "deep-aqidah-trials-a-fever-like-two-mens": "sign-falling-leaves",
  // Tie your camel, and trust Allah (Jami at-Tirmidhi 2517).
  "deep-aqidah-faith-in-the-heart-tie-it-and-trust": "sign-tie-camel",
  // The branches of faith, from saying there is no god but Allah to removing harm from the road (Sahih Muslim 35b,
  // Sahih al-Bukhari 9).
  "deep-aq-iman-branches": "sign-faith-branches",
  "deep-book-iman-sixty-branches": "sign-faith-branches",
  // This world beside the Hereafter, like a finger dipped in the sea (Sahih Muslim 2858), with 9:38 and 13:26.
  "deep-tawbah2-finger-in-the-sea": "sign-sea-drop",
  "deep-raad3-a-finger-in-the-sea": "sign-sea-drop",
  // The jar of gold that neither man would keep (Sahih al-Bukhari 3472).
  "deep-book-anbiya-the-jar-of-gold": "sign-jar-of-gold",
  // Charity does not lessen wealth, forgiving brings honor, and the humble are raised (Sahih Muslim 2588).
  "deep-zakat-pillar-never-less": "sign-charity-wealth",
  "deep-isra2-charity-never-lessens-wealth": "sign-charity-wealth",
  "deep-taghabun4-charity-does-not-decrease": "sign-charity-wealth",
  "deep-qalam4-charity-does-not-decrease": "sign-charity-wealth",
  "deep-humility-raised-up": "sign-charity-wealth",
  "deep-fath1-humble-and-raised": "sign-charity-wealth",
  "deep-yusuf5-forgiving-raises-honor": "sign-charity-wealth",
  // The palm trunk that cried when he ﷺ moved to the pulpit (Sahih al-Bukhari 3584).
  "deep-hashr4-the-crying-palm": "sign-crying-trunk",
  // The rock in the trench that became sand (Sahih al-Bukhari 4101).
  "deep-ahzab1-the-best-example": "sign-trench-rock",
  // The horse that threw the horseman who chased him ﷺ on the road to Madinah (Sahih al-Bukhari 3911); the Seerah's own
  // lesson on it keeps its map.
  "deep-abubakr-suraqah": "sign-chasing-horse",
  // One bowl of milk for all the people of the Suffah (Sahih al-Bukhari 6452).
  "deep-abu-hurairah-milk-bowl": "sign-milk-bowl",
  // A few barley loaves for seventy or eighty, ten at a time (Sahih al-Bukhari 3578).
  "deep-kids-signs-bread-for-seventy": "sign-bread-for-seventy",
  // The home at nightfall: children close, the door shut with Allah's name, the cup covered, the lamp out (Sahih
  // al-Bukhari 3304, 5624).
  "deep-marriage-gentle-with-children-home-at-nightfall": "sign-nightfall",
  // Shield yourselves from the Fire, even with half a date, or with a good word (Sahih al-Bukhari 1417, 6023).
  "deep-kids-small-deeds-half-a-date": "sign-half-date",
  "deep-jahannam-half-date": "sign-half-date",
  "deep-zalzalah2-even-half-a-date": "sign-half-date",
  "deep-zalzalah2-a-good-word": "sign-half-date",
  // The lamp put out so a hungry guest could eat, and 59:9 (Sahih al-Bukhari 4889).
  "deep-hashr2-the-lamp-put-out": "sign-lamp-out",
  // Busy serving his family, then out to the prayer (Sahih al-Bukhari 676).
  "deep-humility-at-home": "sign-helped-at-home",
  "deep-spouses-helped-at-home": "sign-helped-at-home",
  "ramadan-help-at-home": "sign-helped-at-home",
  // The man who killed a hundred, forgiven a span closer to the village he set out for (Sahih al-Bukhari 3470).
  "deep-hadith-forgives-the-killer-who-repented": "sign-a-span-closer",
  "deep-zumar4-the-man-who-was-forgiven": "sign-a-span-closer",
  // Uhud shook: be firm, Uhud (Sahih al-Bukhari 3675, 3686). The lessons on Abu Bakr, Umar and Uthman as a whole,
  // which cite it among other things, keep their pictures.
  "deep-abubakr-uhud-shook": "sign-uhud-shook",
  "deep-uthman-uhud": "sign-uhud-shook",
  // The stone in Makkah that greeted him (Sahih Muslim 2277).
  "deep-book-fadail-the-stone-that-greeted-him": "sign-greeting-stone",
  // Around us, not on us (Sahih al-Bukhari 1013).
  "deep-dua-rain-and-wind-around-us": "sign-around-us",
  // The blessed water, and the food that glorified Allah (Sahih al-Bukhari 3579); the Seerah's lesson on the water at
  // al-Hudaybiyah keeps its map.
  "deep-isra2-the-food-glorified-allah": "sign-blessed-water",
  // Every prophet a shepherd, and he too for the people of Makkah (Sahih al-Bukhari 2262); the Seerah's lesson on it
  // keeps its map.
  "deep-humility-shepherds": "sign-shepherds",
  "deep-muminun2-prophets-were-shepherds": "sign-shepherds",
  "deep-qasas3-shepherds-like-the-prophets": "sign-shepherds",
  // One honest date given in charity, grown like a mountain (Sahih al-Bukhari 1410).
  "deep-tawbah4-a-date-like-a-mountain": "sign-date-mountain",
  "deep-rum3-a-date-like-a-mountain": "sign-date-mountain",
  "deep-taghabun4-date-like-a-mountain": "sign-date-mountain",
  // The three deeds that keep going after death (Sahih Muslim 1631).
  "deep-grave-continue": "sign-deeds-continue",
  "deep-children-righteous-child": "sign-deeds-continue",
  "deep-tur2-a-child-who-prays": "sign-deeds-continue",
  "deep-nuh4-a-child-who-prays": "sign-deeds-continue",
  // How good and bad deeds are written (Sahih al-Bukhari 6491).
  "deep-hadith-qudsi-good-intentions": "sign-good-intentions",
  "deep-anam3-tenfold": "sign-good-intentions",
  "deep-naml6-ten-to-seven-hundred": "sign-good-intentions",
  "deep-jathiyah2-how-good-deeds-are-written": "sign-good-intentions",
  "deep-qamar3-a-good-intention-counts": "sign-good-intentions",
  "deep-naba2-good-intentions-written": "sign-good-intentions",
  // The call from as-Safa, and Abu Lahab's reply (Sahih al-Bukhari 4770, 4971); the Seerah's lessons on it keep their
  // map.
  "deep-masad1-never-heard-a-lie": "sign-safa-call",
  "deep-shuara3-warn-your-family": "sign-safa-call",
  "surah-meaning-111-1-3": "sign-safa-call",
  // Jabir's dates, blessed until every lender was paid (Sahih al-Bukhari 2709).
  "deep-jabir-fathers-debt": "sign-jabir-dates",
  // Three follow the dead; two go back and his deeds stay (Sahih al-Bukhari 6514).
  "deep-grave-three-follow": "sign-three-follow",
  "deep-takathur1-only-deeds-stay": "sign-three-follow",
  // Every affair of a believer is good: thanks in joy, patience in harm (Sahih Muslim 2999). The lesson on 42:32-33,
  // the ships that stand still if the wind stops, opens on the ships; the one on 57:20-25, which cites it for hardship
  // written before it comes, keeps its photo.
  "deep-patience-always-good": "sign-good-in-every-state",
  "deep-baqarah2-with-patient": "sign-good-in-every-state",
  "deep-yunus1-good-in-everything": "sign-good-in-every-state",
  "deep-hud1-the-patient-are-different": "sign-good-in-every-state",
  "deep-ibrahim1-patient-and-thankful": "sign-good-in-every-state",
  "deep-rum3-the-amazing-believer": "sign-good-in-every-state",
  "deep-sad3-good-in-every-affair": "sign-good-in-every-state",
  "deep-taghabun3-amazing-believer": "sign-good-in-every-state",
  "deep-adiyat2-good-in-every-affair": "sign-good-in-every-state",
  "deep-quraysh2-good-in-every-affair": "sign-good-in-every-state",
  // Your mother, three times, then your father (Sahih al-Bukhari 5971).
  "deep-parents-your-mother": "sign-your-mother",
  "deep-kids-kindness-your-mother": "sign-your-mother",
  "surah-meaning-46-11-20": "sign-your-mother",
  "deep-isra1-your-mother-three-times": "sign-your-mother",
  "deep-ahqaf2-your-mother-three-times": "sign-your-mother",
  // Even meeting your brother with a cheerful face (Sahih Muslim 2626).
  "hadith-for-kids-muslim-2626": "sign-cheerful-face",
  "deep-speech-smile": "sign-cheerful-face",
  "deep-abudharr-smile": "sign-cheerful-face",
  "deep-luqman1-no-pride": "sign-cheerful-face",
  "deep-zalzalah2-a-cheerful-face": "sign-cheerful-face",
  // The best who learn the Quran and teach it (Sahih al-Bukhari 5027).
  "hadith-for-kids-bukhari-5027": "sign-learn-and-teach",
  "deep-uthman-best-of-you": "sign-learn-and-teach",
  "deep-fatir2-a-trade-that-never-fails": "sign-learn-and-teach",
  "deep-qamar1-learn-and-teach": "sign-learn-and-teach",
  "deep-meet-the-quran-learn-and-teach": "sign-learn-and-teach",
  // The believers like one body (Sahih al-Bukhari 6011).
  "deep-numan-one-body": "sign-one-body",
  "deep-kids-kindness-one-body": "sign-one-body",
  "deep-tawbah3-one-body": "sign-one-body",
  "deep-fath3-merciful-among-themselves": "sign-one-body",
  "deep-hashr3-like-one-body": "sign-one-body",
  // Say Bismillah, eat with your right hand, and eat from what is near you (Sahih al-Bukhari 5376).
  "hadith-for-kids-bukhari-5376": "sign-eat-near",
  "deep-children-teach-eating": "sign-eat-near",
  "deep-dua-day-eat": "sign-eat-near",
  "deep-daily-life-bismillah-and-right-hand": "sign-eat-near",
  // You will be with those you love (Sahih al-Bukhari 3688).
  "deep-umar-with-those-you-love": "sign-those-you-love",
  "deep-lastday-asked-bedouin": "sign-those-you-love",
  "deep-shura1-ready-for-the-hour": "sign-those-you-love",
  "deep-jinn4-with-those-you-love": "sign-those-you-love",
  // After the salam: forgiveness three times, then O Allah, You are Peace (Sahih Muslim 591).
  "deep-pray-after-istighfar": "sign-after-the-salam",
  "deep-thawban-after-the-prayer": "sign-after-the-salam",
  "deep-dua-day-after-salah": "sign-after-the-salam",
  "deep-rahman4-after-the-salam": "sign-after-the-salam",
  // Islam is built on five (Sahih al-Bukhari 8).
  "intro-five-pillars": "sign-built-on-five",
  "intro-shahadah": "sign-built-on-five",
  "deep-zakat-pillar-five-pillars": "sign-built-on-five",
  "deep-bayyinah1-built-on-five": "sign-built-on-five",
  // Forgiveness asked more than seventy times a day (Sahih al-Bukhari 6307).
  "deep-ghafir3-seventy-times-a-day": "sign-seventy-times",
  "deep-muhammad2-seventy-times-a-day": "sign-seventy-times",
  "deep-tahrim2-he-repented-daily": "sign-seventy-times",
  "deep-nuh2-seventy-times-a-day": "sign-seventy-times",
  // Family ties bring more provision and a longer life (Sahih al-Bukhari 5986).
  "deep-parents-family-ties": "sign-family-ties",
  "deep-raad2-ties-bring-blessing": "sign-family-ties",
  "deep-isra2-family-ties-bring-blessing": "sign-family-ties",
  "deep-nuh1-family-ties-and-life": "sign-family-ties",
  // Pray standing, else sitting, else lying on your side (Sahih al-Bukhari 1117).
  "deep-prayerlive-sick-prayer": "sign-pray-as-you-can",
  "deep-pray-easy-stand-sit-side": "sign-pray-as-you-can",
  "deep-imran-ibn-husayn-pray-as-you-can": "sign-pray-as-you-can",
  "deep-hijr4-pray-as-you-can": "sign-pray-as-you-can",
  "deep-first-prayers-pray-as-you-can": "sign-pray-as-you-can",
  // Even the prick of a thorn wipes away some sins (Sahih al-Bukhari 5641).
  "deep-patience-even-a-thorn": "sign-even-a-thorn",
  "deep-hud1-even-a-thorn-prick": "sign-even-a-thorn",
  "deep-taghabun3-even-a-thorn": "sign-even-a-thorn",
  // Deeds are only by intentions (Sahih al-Bukhari 1). The two lessons on its chain of narrators keep their photo.
  "deep-hadith-famous-intentions": "sign-intentions",
  "deep-muhajirun-intention": "sign-intentions",
  "deep-insan2-deeds-by-intentions": "sign-intentions",
  "deep-tree-umar-on-the-minbar": "sign-intentions",
  "deep-tree-alqamah-waqqas-heard-umar": "sign-intentions",
  // Two expressions, light on the tongue and heavy in the balance (Sahih al-Bukhari 6406). The lesson on the same
  // hadith as the last in al-Bukhari (7563, the two in the other order) and the whole passage of 101:6-11 keep their
  // photo.
  "deep-kids-dhikr-light-and-heavy": "sign-two-words",
  "deep-reckoning-heavy-words": "sign-two-words",
  "deep-dua-dhikr-two-words": "sign-two-words",
  "deep-anbiya2-light-on-the-tongue": "sign-two-words",
  "deep-muminun3-heavy-words": "sign-two-words",
  "deep-saffat6-heavy-on-the-scale": "sign-two-words",
  "deep-waqiah3-two-light-words": "sign-two-words",
  // Cleanliness is half of faith, and al-Hamdu lillah fills the scale (Sahih Muslim 223). The lesson on the hadith's
  // last words, each soul sold every morning, keeps its photo.
  "deep-clean-half-of-faith": "sign-half-of-faith",
  "deep-araf1-fills-scale": "sign-half-of-faith",
  "deep-muddaththir1-half-of-faith": "sign-half-of-faith",
  "deep-qariah2-alhamdulillah-fills-the-scale": "sign-half-of-faith",
  // The three signs of a hypocrite (Sahih al-Bukhari 33). The whole passage of 61:1-9 keeps its photo.
  "deep-honesty-three-signs": "sign-three-signs",
  "deep-tawbah4-signs-of-a-hypocrite": "sign-three-signs",
  "deep-raad2-three-signs-of-a-hypocrite": "sign-three-signs",
  "deep-maryam2-keep-your-promises": "sign-three-signs",
  "deep-muminun1-keep-trusts-promises": "sign-three-signs",
  "deep-mujadila3-three-signs": "sign-three-signs",
  "deep-saff1-signs-of-a-hypocrite": "sign-three-signs",
  "deep-munafiqun1-three-signs": "sign-three-signs",
  "deep-maarij3-signs-of-a-hypocrite": "sign-three-signs",
  // Calling to good, and calling to error (Sahih Muslim 2674).
  "deep-yusuf6-a-call-and-its-reward": "sign-call-to-good",
  "deep-nahl2-callers-to-good": "sign-call-to-good",
  "deep-ankabut1-callers-to-good": "sign-call-to-good",
  "deep-najm3-calling-to-guidance": "sign-call-to-good",
  // Praise for a morsel and for a drink (Sahih Muslim 2734).
  "deep-clean-praise-after-food": "sign-praise-each-bite",
  "deep-isra1-praise-for-each-bite": "sign-praise-each-bite",
  "deep-mulk4-praise-after-drinking": "sign-praise-each-bite",
  "deep-abasa2-praise-for-every-bite": "sign-praise-each-bite",
  "deep-quraysh2-praise-him-for-food": "sign-praise-each-bite",
  // Talk what is good or keep quiet (Sahih al-Bukhari 6018).
  "hadith-for-kids-bukhari-6018": "sign-good-or-quiet",
  "deep-speech-good-or-quiet": "sign-good-or-quiet",
  "deep-naba3-say-good-or-stay-silent": "sign-good-or-quiet",
  // Say: I affirm my faith in Allah, then remain steadfast (Sahih Muslim 38).
  "deep-hadith-famous-steadfast": "sign-then-steadfast",
  "deep-hud6-stand-firm-as-commanded": "sign-then-steadfast",
  "deep-fussilat2-our-lord-is-allah-then-stand-firm": "sign-then-steadfast",
  "deep-ahqaf1-believe-then-be-steadfast": "sign-then-steadfast",
  // The dearest deeds: the prayer at its time, then being dutiful to one's parents (Sahih al-Bukhari 527). The lesson on
  // 6:151, kindness to parents right after tawhid, keeps its photo.
  "prayer-times-guarding-the-first-part": "sign-dearest-deeds",
  "deep-parents-dearest-deeds": "sign-dearest-deeds",
  "deep-muminun1-guard-the-prayers": "sign-dearest-deeds",
  "deep-maun2-the-dearest-deed": "sign-dearest-deeds",
  // Truthfulness leads to righteousness and Paradise, and falsehood to wickedness (Sahih al-Bukhari 6094). The lessons
  // on honesty in general and on 33:35 keep their photo.
  "deep-speech-truth": "sign-truth-leads",
  "deep-tawbah5-with-the-truthful": "sign-truth-leads",
  // Relieving a hardship, hiding a fault, helping, and the path of knowledge made easy (Sahih Muslim 2699a). The lesson
  // on those who gather in a masjid to study the Quran, which the scene does not show, keeps its photo.
  "deep-hadith-heart-relieve": "sign-ease-a-hardship",
  "deep-kids-small-deeds-help-and-be-helped": "sign-ease-a-hardship",
  "deep-hadith-knowledge-path-to-jannah": "sign-ease-a-hardship",
  // No one is saved by his deeds alone, only by Allah's mercy (Sahih al-Bukhari 6463).
  "deep-ready-mercy-saves": "sign-saved-by-mercy",
  "deep-zukhruf4-even-i-need-mercy": "sign-saved-by-mercy",
  "deep-haqqah3-by-allahs-mercy": "sign-saved-by-mercy",
  "deep-fatir2-no-toil-no-weariness": "sign-saved-by-mercy",
  // The charity given while healthy, not delayed until death is near (Sahih al-Bukhari 1419).
  "deep-zakat-everyday-give-now": "sign-give-while-healthy",
  "deep-nahl1-give-while-healthy": "sign-give-while-healthy",
  "deep-munafiqun3-best-charity": "sign-give-while-healthy",
  "deep-munafiqun3-do-not-delay": "sign-give-while-healthy",
  "deep-insan2-the-best-charity": "sign-give-while-healthy",
  // The strong believer, who seeks Allah's help and does not say "if" (Sahih Muslim 2664).
  "deep-aq-qadar-if-only": "sign-strong-believer",
  "deep-aq-iman-strong": "sign-strong-believer",
  "deep-patience-do-not-say-if-only": "sign-strong-believer",
  "deep-qamar3-seek-help-do-not-say-if": "sign-strong-believer",
  "deep-hadid2-strong-and-weak-believers": "sign-strong-believer",
  "deep-taghabun3-do-not-say-if-only": "sign-strong-believer",
  // A forgotten prayer, prayed when it is remembered (Sahih al-Bukhari 597).
  "deep-taha1-a-missed-prayer": "sign-forgotten-prayer",
  "prayer-missed-prayers-returning-after-a-miss": "sign-forgotten-prayer",
  "prayer-times-late-prayer-scenarios": "sign-forgotten-prayer",
  // A mustard seed of pride keeps one from Paradise; Allah is beautiful and loves beauty; pride is rejecting the truth
  // and looking down on people (Sahih Muslim 91).
  "deep-humility-what-pride-is": "sign-mustard-of-pride",
  "deep-imran1-pride": "sign-mustard-of-pride",
  "deep-araf1-mustard-of-pride": "sign-mustard-of-pride",
  "deep-qasas7-allah-loves-beauty": "sign-mustard-of-pride",
  "deep-luqman1-pride-and-beauty": "sign-mustard-of-pride",
  "deep-ahqaf1-what-pride-really-is": "sign-mustard-of-pride",
  "deep-hujurat2-pride-looks-down-on-people": "sign-mustard-of-pride",
  // Backbiting is talking about your brother in a way he dislikes; if it is not in him, it is slander (Sahih Muslim
  // 2589). The lessons on the whole passages 49:11-13 and 104:1-4 keep their photo.
  "deep-speech-backbiting": "sign-what-backbiting-is",
  "deep-ahzab3-no-false-blame": "sign-what-backbiting-is",
  "deep-hujurat2-what-is-backbiting": "sign-what-backbiting-is",
  "deep-humazah1-what-backbiting-is": "sign-what-backbiting-is",
  // The one who looks after an orphan, near him in Paradise like two fingers (Sahih al-Bukhari 5304). The lessons on
  // the whole passages 89:15-20 and 107:1-3 keep their photo.
  "deep-mercy-the-orphan": "sign-orphan-carer",
  "deep-sahl-caring-for-orphans": "sign-orphan-carer",
  "deep-fajr3-close-to-him-in-paradise": "sign-orphan-carer",
  "deep-maun1-close-to-the-prophet-in-paradise": "sign-orphan-carer",
  // A Muslim is the one others are safe from, his tongue and hands; an emigrant gives up what Allah forbade (Sahih
  // al-Bukhari 10).
  "deep-speech-safe-tongue": "sign-safe-from-harm",
  "deep-ibn-amr-tongue-and-hand": "sign-safe-from-harm",
  "deep-muhajirun-true-muhajir": "sign-safe-from-harm",
  "deep-humazah1-safe-from-your-tongue": "sign-safe-from-harm",
  // A word of refuge for anger: I seek refuge with Allah from Satan (Sahih al-Bukhari 3282).
  "deep-anger-seek-refuge": "sign-refuge-from-anger",
  "deep-dua-day-anger": "sign-refuge-from-anger",
  "deep-araf6-seek-refuge": "sign-refuge-from-anger",
  "deep-nahl6-refuge-calms-anger": "sign-refuge-from-anger",
  // The gate ar-Rayyan, only for those who fast (Sahih al-Bukhari 1896).
  "deep-sahl-ar-rayyan": "sign-gate-ar-rayyan",
  "deep-jannah-gates": "sign-gate-ar-rayyan",
  "deep-zumar4-the-gate-of-ar-rayyan": "sign-gate-ar-rayyan",
  "ramadan-ar-rayyan": "sign-gate-ar-rayyan",
  // Make things easy, not hard; give good tidings, do not make people run away (Sahih al-Bukhari 69).
  "hadith-for-kids-bukhari-69": "sign-make-it-easy",
  "deep-hajj3-make-things-easy": "sign-make-it-easy",
  "deep-talaq2-make-things-easy": "sign-make-it-easy",
  // Allah forbade oppression for Himself; ask Him for guidance and food; all He gives lessens what He has no more than
  // a needle lessens the sea (Sahih Muslim 2577). The lessons on piety adding nothing to His dominion and on not being
  // able to harm Him keep their photo.
  "deep-yunus2-allah-wrongs-no-one": "sign-needle-in-the-sea",
  "deep-ibrahim1-o-my-servants": "sign-needle-in-the-sea",
  "deep-zumar1-his-dominion-never-shrinks": "sign-needle-in-the-sea",
  "deep-ghafir1-no-injustice-this-day": "sign-needle-in-the-sea",
  "deep-rahman2-ask-me-and-i-will-give": "sign-needle-in-the-sea",
  // Allah does not look to your faces and wealth, but to your hearts and deeds (Sahih Muslim 2564c).
  "hadith-for-kids-muslim-2564c": "sign-hearts-and-deeds",
  "deep-anam1-hearts-deeds": "sign-hearts-and-deeds",
  "deep-saba2-faith-brings-us-near": "sign-hearts-and-deeds",
  "deep-taghabun1-allah-looks-at-hearts": "sign-hearts-and-deeds",
  "deep-adiyat2-allah-looks-at-hearts": "sign-hearts-and-deeds",
  // The strong is the one who controls himself in anger (Sahih al-Bukhari 6114).
  "hadith-for-kids-bukhari-6114": "sign-real-strength",
  "deep-anger-real-strength": "sign-real-strength",
  "deep-imran3-swallow-anger": "sign-real-strength",
  // La hawla wa la quwwata illa billah, one of the treasures of Paradise (Sahih al-Bukhari 6384).
  "deep-abu-musa-treasure": "sign-treasure-of-paradise",
  "deep-dua-dhikr-treasure": "sign-treasure-of-paradise",
  "deep-kahf2-a-treasure-of-paradise": "sign-treasure-of-paradise",
  // Paradise has a hundred grades; ask for al-Firdaws, from which its rivers come (Sahih al-Bukhari 2790).
  "deep-jannah-levels": "sign-hundred-levels",
  "deep-kahf4-ask-allah-for-al-firdaws": "sign-hundred-levels",
  "deep-taha2-ask-allah-for-firdaws": "sign-hundred-levels",
  "deep-muminun1-heirs-of-firdaws": "sign-hundred-levels",
  "deep-muhammad1-ask-for-al-firdaws": "sign-hundred-levels",
  "deep-haqqah3-one-hundred-levels": "sign-hundred-levels",
  // If faith were at the Pleiades, men from these would attain it (Sahih al-Bukhari 4897). The lesson on the whole
  // passage 62:1-8 keeps its photo.
  "deep-salman-pleiades": "sign-faith-at-the-pleiades",
  "deep-jumuah1-others-who-will-join": "sign-faith-at-the-pleiades",
  "deep-jumuah1-faith-at-the-pleiades": "sign-faith-at-the-pleiades",
  // Makkah, a sanctuary since the heavens and the earth were created: its thorns, its game and its fallen things
  // (Sahih al-Bukhari 1834).
  "deep-hajj-house-sanctuary": "sign-sacred-city",
  "deep-naml6-sacred-since-creation": "sign-sacred-city",
  "deep-balad1-a-sacred-city": "sign-sacred-city",
  // Whoever builds a masjid for Allah, Allah builds for him a place like it in Paradise; said by Uthman while he
  // rebuilt the Prophet's masjid ﷺ (Sahih al-Bukhari 450).
  "deep-tawbah1-build-a-masjid": "sign-house-in-paradise",
  "deep-nur2-build-a-masjid": "sign-house-in-paradise",
  "deep-mujadila2-a-house-in-paradise": "sign-house-in-paradise",
  // My wealth, my wealth: only what we ate, wore or gave in charity is truly ours (Sahih Muslim 2958).
  "deep-hadid2-my-wealth-my-wealth": "sign-my-wealth",
  "deep-hadid2-what-you-send-forward": "sign-my-wealth",
  "deep-takathur1-my-wealth-my-wealth": "sign-my-wealth",
  // The short hour on Friday when a Muslim praying who asks Allah is given (Sahih al-Bukhari 935).
  "deep-pray-jumuah-hour": "sign-hour-on-friday",
  "deep-jumuah3-an-hour-of-answered-dua": "sign-hour-on-friday",
  "deep-buruj1-the-special-hour-of-friday": "sign-hour-on-friday",
  // In Paradise: health and never ill, life and never death, young and never old, ease and never want (Sahih Muslim
  // 2837).
  "deep-jannah-never-old": "sign-never-old",
  "deep-hud6-a-gift-without-end": "sign-never-old",
  "deep-hijr2-young-forever": "sign-never-old",
  "deep-dukhan3-never-ill-never-old": "sign-never-old",
  // Beware of suspicion; do not spy, envy, desert or hate one another; be brothers (Sahih al-Bukhari 6064).
  "deep-speech-suspicion": "sign-beware-of-suspicion",
  "deep-hujurat2-beware-of-suspicion": "sign-beware-of-suspicion",
  "deep-najm2-beware-of-suspicion": "sign-beware-of-suspicion",
  // The poor who worried the wealthy would get the higher grades, and the dhikr after every prayer by which they catch
  // up (Sahih al-Bukhari 843).
  "deep-qaf3-thirty-three-each": "sign-thirty-three",
  "deep-hadid3-the-poor-who-worried": "sign-thirty-three",
  "deep-hadid3-thirty-three-each": "sign-thirty-three",
  // Five things he ﷺ was given: awe for a month's journey, the earth a place of prayer and purity, and sent to all
  // mankind (Sahih al-Bukhari 335).
  "deep-aq-rusul-all-people": "sign-five-gifts",
  "deep-araf5-to-all-mankind": "sign-five-gifts",
  "deep-ibrahim1-sent-to-all-mankind": "sign-five-gifts",
  "deep-saba2-sent-to-all-mankind": "sign-five-gifts",
  "deep-hashr1-awe-for-a-month": "sign-five-gifts",
  // Seven whom Allah shades on the Day there is no shade but His (Sahih al-Bukhari 660 and 1423).
  "deep-gathering-shade": "sign-seven-in-the-shade",
  "deep-yusuf2-shade-for-one-who-fears-allah": "sign-seven-in-the-shade",
  "deep-qaf3-tears-in-private": "sign-seven-in-the-shade",
  "deep-mulk2-secret-charity": "sign-seven-in-the-shade",
  "deep-baqarah3-secret-charity": "sign-seven-in-the-shade",
  "deep-rahman3-tears-in-private": "sign-seven-in-the-shade",
  // Fasting is a shield, better with Allah than musk, for Him, and its two joys (Sahih al-Bukhari 1894 and 1904).
  "deep-fast-reward-shield": "sign-two-joys",
  "deep-fast-reward-musk": "sign-two-joys",
  "deep-fast-reward-two-joys": "sign-two-joys",
  "deep-hadith-qudsi-what-is-qudsi": "sign-two-joys",
  "ramadan-two-joys": "sign-two-joys",
  // Passing al-Hijr: enter only weeping, and he covered his head and hurried through the valley (Sahih al-Bukhari 4419
  // and 433).
  "deep-araf3-weeping-at-hijr": "sign-ruins-of-al-hijr",
  "deep-hud3-passing-their-ruins": "sign-ruins-of-al-hijr",
  "deep-qamar2-lands-of-thamud": "sign-ruins-of-al-hijr",
  "deep-prophet-salih-hijr": "sign-ruins-of-al-hijr",
  "deep-hijr4-pass-ruins-weeping": "sign-ruins-of-al-hijr",
  // Every child is born on the fitrah, as an animal gives birth to a whole young one (Sahih al-Bukhari 1385).
  "deep-children-fitrah": "sign-born-on-the-fitrah",
  "deep-hud1-born-on-the-fitrah": "sign-born-on-the-fitrah",
  "deep-rum2-every-child-on-the-fitrah": "sign-born-on-the-fitrah",
  "deep-shams2-born-on-the-fitrah": "sign-born-on-the-fitrah",
  // No good deeds are better than those of the first ten days of Dhul-Hijjah (Sahih al-Bukhari 969).
  "deep-hajj-best-ten-days": "sign-best-ten-days",
  "deep-dhul-hijjah-best-ten-days": "sign-best-ten-days",
  "deep-hajj2-best-ten-days": "sign-best-ten-days",
  "deep-fajr1-the-best-days-for-good-deeds": "sign-best-ten-days",
  // The most learned, and the sparrow that dipped its beak in the sea (Sahih al-Bukhari 122).
  "deep-kahf3-the-most-learned": "sign-sparrow-and-the-sea",
  "deep-kahf3-the-sparrow-and-the-sea": "sign-sparrow-and-the-sea",
  "deep-kahf3-if-only-he-had-been-patient": "sign-sparrow-and-the-sea",
  // The lofty mansions of Paradise, seen like a brilliant star on the horizon (Sahih al-Bukhari 3256).
  "deep-zumar2-like-stars-on-the-horizon": "sign-lofty-mansions",
  "deep-hadid3-the-lofty-mansions": "sign-lofty-mansions",
  "deep-hadid3-not-only-for-prophets": "sign-lofty-mansions",
  // Glad tidings to Khadijah of a house in Paradise of hollow pearl, with no noise and no toil (Sahih al-Bukhari 3820).
  "deep-wives-khadijah-greeting": "sign-house-of-pearl",
  "deep-mothers-khadijah-palace": "sign-house-of-pearl",
  "deep-hijr2-no-fatigue-there": "sign-house-of-pearl",
  // The tree of Paradise whose shade a rider could travel a hundred years (Sahih al-Bukhari 3251).
  "deep-jannah-tree": "sign-tree-of-a-hundred-years",
  "deep-raad3-a-hundred-years-of-shade": "sign-tree-of-a-hundred-years",
  // His Pool, a month's journey across; whoever drinks from it will never be thirsty (Sahih al-Bukhari 6579).
  "deep-hawd-pool": "sign-the-pool",
  "deep-kawthar1-never-thirsty-again": "sign-the-pool",
  // Gold as much as Uhud would not reach a mudd of those with him, nor half of it (Sahih al-Bukhari 3673).
  "deep-abu-said-my-companions": "sign-gold-like-uhud",
  "deep-fath3-honor-the-companions": "sign-gold-like-uhud",
  "deep-hadid2-gold-like-mount-uhud": "sign-gold-like-uhud",
  // Allah gives respite to the wrongdoer, until, when He seizes him, He does not let him go (Sahih al-Bukhari 4686).
  "deep-hud6-respite-then-seizure": "sign-respite-then-seized",
  "deep-raad4-respite-for-the-unjust": "sign-respite-then-seized",
  "deep-hajj3-respite-then-seized": "sign-respite-then-seized",
  "deep-qalam5-allah-gives-respite": "sign-respite-then-seized",
  // Convey from me, even if it is one ayah (Sahih al-Bukhari 3461).
  "deep-hadith-knowledge-one-verse": "sign-convey-one-ayah",
  "deep-ibn-amr-even-one-ayah": "sign-convey-one-ayah",
  "deep-jinn4-convey-even-one-ayah": "sign-convey-one-ayah",
  // The poor one who has not enough, whom no one notices, and who does not ask (Sahih al-Bukhari 1479).
  "deep-tawbah3-the-hidden-poor": "sign-the-hidden-poor",
  "deep-dhariyat1-the-hidden-poor": "sign-the-hidden-poor",
  // Jibril came in very white clothes to ask about Islam, iman, ihsan and the Hour, and to teach the religion (Sahih
  // al-Bukhari 50, Sahih Muslim 8a). Left out: the lesson on believing in the Last Day as a pillar of iman.
  "deep-lastday-jibril-hour": "sign-came-to-teach",
  "deep-minorsigns-buildings": "sign-came-to-teach",
  "deep-fussilat3-the-knowledge-of-the-hour": "sign-came-to-teach",
  "deep-rahman3-what-is-ihsan": "sign-came-to-teach",
  "deep-hadid1-ihsan-worship-as-if-you-see": "sign-came-to-teach",
  "deep-mulk4-jibril-asked-about-the-hour": "sign-came-to-teach",
  "deep-jinn4-answerer-knows-no-more": "sign-came-to-teach",
  "deep-naziat4-jibril-asks-about-the-hour": "sign-came-to-teach",
  "deep-bayyinah2-ihsan": "sign-came-to-teach",
  "deep-hadith-famous-ihsan": "sign-came-to-teach",
  "deep-tree-umar-jibril-came": "sign-came-to-teach",
  // Asma keeping ties with her mother, who was a polytheist (Sahih al-Bukhari 2620, 5978).
  "deep-mumtahanah3-be-good-to-your-mother": "sign-keep-ties",
  "deep-daily-life-family-not-muslim": "sign-keep-ties",
  "deep-parents-her-mother": "sign-keep-ties",
  "deep-mumtahanah3-then-allah-revealed": "sign-keep-ties",
  // The fast of Dawud, the best fast, and his night prayer (Sahih al-Bukhari 1976, 1131).
  "deep-fast-extra-dawud": "sign-fast-of-dawud",
  "deep-prophet-dawud-fast-of-dawud": "sign-fast-of-dawud",
  "deep-fast-ease-balance": "sign-fast-of-dawud",
  "deep-ibn-amr-fast-of-dawud": "sign-fast-of-dawud",
  // The prophets are brothers of one father, and their religion is one (Sahih al-Bukhari 3443).
  "deep-aq-rusul-brothers": "sign-one-religion",
  "deep-anam3-one-religion": "sign-one-religion",
  "deep-yunus4-one-religion": "sign-one-religion",
  "deep-anbiya3-prophets-one-religion": "sign-one-religion",
  "deep-shura1-one-religion-all-messengers": "sign-one-religion",
  // All my ummah will enter Paradise, except whoever refuses (Sahih al-Bukhari 7280).
  "deep-imran1-who-refuses": "sign-who-refuses",
  "deep-taghabun3-who-refuses": "sign-who-refuses",
  "deep-layl3-all-enter-but-who-refuses": "sign-who-refuses",
  // The mother of Abu Hurairah, guided at her door, and the du'a that the believers love them (Sahih Muslim 2491).
  "deep-abu-hurairah-his-mother": "sign-guided-at-the-door",
  "deep-abu-hurairah-loved": "sign-guided-at-the-door",
  // He made the prayer short when he heard a child crying (Sahih al-Bukhari 707).
  "deep-mercy-shortened-prayer": "sign-prayer-made-short",
  "deep-book-prayer-shorter-for-a-crying-child": "sign-prayer-made-short"
};

export type LessonSign = { scene: SignScene; lessonSlug: string };

/** The scene a lesson opens on, or undefined for a lesson that has none. */
export function signForLesson(lesson: { nodeId: string }): LessonSign | undefined {
  const id = SIGN_LESSONS[lesson.nodeId];
  const scene = id ? SIGN_SCENES.find((each) => each.id === id) : undefined;
  return scene ? { scene, lessonSlug: lesson.nodeId } : undefined;
}
