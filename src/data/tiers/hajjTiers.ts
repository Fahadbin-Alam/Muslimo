import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for every Hajj question.
 * Each one keeps the same answer and the lesson's own source.
 */
export const HAJJ_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 8.
  "Hajj is one of the five ____ of Islam.": { answer: "pillars", harder: ["Bukhari 8: Islam is built on five: the shahadah, salah, zakat, Hajj and the Ramadan fast. Hajj is one of those five ____.", "secrets", "rooms", "markets"] },
  "Hajj is one of the five pillars of Islam.": { answer: "True", harder: "Bukhari 8 counts Hajj among the five things Islam is built on." },
  // Quran 3:97.
  "Hajj is due once in life for those who are ____.": { answer: "able", harder: ["Quran 3:97: Hajj to the House is a duty to Allah for those who can find a way there. That means those who are ____.", "bored", "famous", "rich only"] },
  // Quran 2:196.
  "Go to Hajj only for ____, not to show off.": { answer: "Allah", harder: ["Quran 2:196: 'Complete the Hajj and Umrah for Allah.' So the journey is made for ____ alone.", "photos", "fame", "friends"] },
  // Quran 2:125.
  "The ____ in Makkah is the House of Allah.": { answer: "Ka'bah", harder: ["Quran 2:125: Allah calls it 'My House' and told Ibrahim and Ismail to keep it pure. That House in Makkah is the ____.", "Dome", "Tower", "Minbar"] },
  // Sahih al-Bukhari 1545.
  "In ihram, men wear ____ simple cloths.": { answer: "two", harder: ["Bukhari 1545: he ﷺ set out for Hajj in a waist cloth and an upper cloth. That is ____ sheets.", "ten", "five", "three"] },
  "In ihram, men wear ten simple cloths.": { answer: "False", harder: "By Bukhari 1545, the Prophet ﷺ set out for Hajj in ten pieces of cloth." },
  // Sahih al-Bukhari 1645.
  "____ means walking around the Ka'bah seven times.": { answer: "Tawaf", harder: ["Bukhari 1645: he ﷺ went seven times around the Ka'bah, then prayed two rak'ahs behind Maqam Ibrahim. Those seven rounds are called ____.", "Ihram", "Sa'i", "Talbiyah"] },
  // Sahih al-Bukhari 3364.
  "____ is walking between Safa and Marwah seven times.": { answer: "Sa'i", harder: ["Bukhari 3364: Hajar ran between Safa and Marwah seven times looking for water, and he ﷺ said pilgrims do the same. That walk is ____.", "Tawaf", "Ihram", "Talbiyah"] },
  // Sahih Muslim 1218a.
  "Hajj days: Mina, then ____, Muzdalifah, and back to Mina.": { answer: "Arafah", harder: ["Muslim 1218a, Jabir on his ﷺ Hajj: Mina on the 8th, then ____, then the night at Muzdalifah, then back to Mina.", "Taif", "Madinah", "Badr"] },
  "Which comes first?": { answer: "Arafah", harder: ["Muslim 1218a, Jabir's order of the days after Mina on the 8th: which of these comes first?", "Muzdalifah", "Back to Mina", "The farewell tawaf"] },
  // Sahih Muslim 1218a.
  "Pilgrims stand at ____ on the 9th of Dhul-Hijjah.": { answer: "Arafah", harder: ["Muslim 1218a: after Mina on the 8th, he ﷺ went on to stand where, on the 9th of Dhul-Hijjah? At ____.", "Mina", "Safa", "Quba"] },
  "Pilgrims stand at Mina on the 9th of Dhul-Hijjah.": { answer: "False", harder: "In Muslim 1218a, the standing on the 9th of Dhul-Hijjah was at Mina." },
  // Sahih Muslim 1218a.
  "After Arafah, pilgrims spend the night at ____.": { answer: "Muzdalifah", harder: ["Muslim 1218a: Jabir says that after standing at Arafah he ﷺ spent the night at ____.", "Madinah", "Taif", "Mina"] },
  "After Arafah, pilgrims spend the night at Madinah.": { answer: "False", harder: "In Muslim 1218a, after Arafah he ﷺ went to Madinah for the night." },
  // Sahih al-Bukhari 1751.
  "At ____, pilgrims throw small pebbles at the pillars.": { answer: "Mina", harder: ["Bukhari 1751: Ibn Umar threw seven small stones at each jamrah, saying Allahu akbar each time. The jamarat are at ____.", "Arafah", "Safa", "Muzdalifah"] },
  // Sahih Muslim 1305a.
  "After the sacrifice, men shave or cut their ____.": { answer: "hair", harder: ["Muslim 1305a: at Mina he ﷺ stoned the jamrah, sacrificed his animal, then had his ____ shaved.", "shoes", "clothes", "sandals"] },
  // Sahih al-Bukhari 1542.
  "In Hajj, rich and poor wear the same simple ____.": { answer: "clothes", harder: ["Bukhari 1542: in ihram, no shirts, turbans, trousers or hooded cloaks. So rich and poor wear the same simple ____.", "medals", "crowns", "jewels"] },
  "In Hajj, rich and poor wear the same simple crowns.": { answer: "False", harder: "By Bukhari 1542, a rich pilgrim may keep his turban and fine shirt in ihram." },
  // Quran 2:144.
  "Muslims from every country face one ____ together.": { answer: "Ka'bah", harder: ["Quran 2:144: 'Wherever you are, turn your faces toward al-Masjid al-Haram.' So Muslims everywhere face one ____.", "mountain", "palace", "river"] },
  // Quran 2:197.
  "Hajj teaches ____ in big crowds and hot sun.": { answer: "patience", harder: ["Quran 2:197: in Hajj there is no indecency, no disobedience and no arguing. In big crowds and hot sun, Hajj trains ____.", "pushing", "anger", "speed"] },
  // Sahih al-Bukhari 1521.
  "A good Hajj leaves you free of ____, like a newborn.": { answer: "sins", harder: ["Bukhari 1521: whoever does Hajj for Allah with no bad words or deeds comes home like the day he was born, free of ____.", "friends", "money", "family"] },
  // Sahih Muslim 1337.
  "How often is Hajj a duty?": { answer: "Once in a lifetime", harder: ["Muslim 1337: a man asked 'every year?' and he ﷺ said yes would make it a duty you could not do. So how often is Hajj a duty?", "Every ten years", "Every year", "Every Ramadan"] },
  "Who must go to Hajj?": { answer: "Those who are able", harder: ["Quran 3:97 makes Hajj a duty on people with one condition. Who must go?", "Only men", "Only Arabs", "Everyone, even the sick"] },
  "Why didn't the Prophet ﷺ say 'every year'?": { answer: "It would be too hard for us", harder: ["Muslim 1337: why did he ﷺ stay silent, and not say Hajj is due 'every year'?", "He forgot", "He did not know", "Makkah is small"] },
  // Sahih al-Bukhari 1549.
  "What does 'Labbayk Allahumma labbayk' mean?": { answer: "Here I am, O Allah, here I am", harder: ["Bukhari 1549: his ﷺ talbiyah begins 'Labbayk Allahumma labbayk'. What do those words mean?", "Allah is the Greatest", "Glory be to Allah", "Peace be on you"] },
  "What is this call named?": { answer: "The talbiyah", harder: ["Bukhari 1549 gives his ﷺ words 'Labbayk Allahumma labbayk...'. What is that call named?", "The tashahhud", "The adhan", "The takbir"] },
  "Which words are in the talbiyah?": { answer: "You have no partner", harder: ["Bukhari 1549: 'labbayk la sharika laka labbayk'. Which meaning is in his ﷺ talbiyah?", "Grant me wealth", "Bless this food", "Forgive my parents"] },
  // Quran 2:197.
  "Which of these is forbidden in Hajj by 2:197?": { answer: "Arguing", harder: ["Quran 2:197 lists three things not done in Hajj: indecency, disobedience and what?", "Drinking water", "Making du'a", "Walking"] },
  "What does Allah call the best provision?": { answer: "Taqwa", harder: ["Quran 2:197: 'take provision, and the best provision is' what?", "Gold", "Dates", "A strong camel"] },
  "In a hot, crowded line, a pilgrim pushes you. What fits Hajj?": { answer: "Stay calm and forgive", harder: ["Quran 2:197 bans disputing in Hajj. A pilgrim shoves you in a hot line. What follows the verse?", "Push back", "Argue loudly", "Leave Hajj"] },
  // Sahih al-Bukhari 1597.
  "Why did Umar kiss the Black Stone?": { answer: "He saw the Prophet ﷺ do it", harder: ["Bukhari 1597: Umar told the Black Stone he would not kiss it, except for one reason. What was it?", "It heals the sick", "It grants wishes", "It brings luck"] },
  "What did Umar say the stone can do?": { answer: "Neither benefit nor harm", harder: ["Bukhari 1597: what did Umar say, speaking to the Black Stone, that it can do?", "Bring rain", "Speak", "Forgive sins"] },
  "What does this teach about tawhid?": { answer: "We worship Allah, not objects", harder: ["Bukhari 1597: Umar said the stone cannot benefit or harm, yet followed the Sunnah. What does that teach?", "Stones have power", "Old things are holy", "Kiss every stone"] },
  // Jami at-Tirmidhi 889.
  "Which part of Hajj did he call 'the Hajj'?": { answer: "Standing at Arafah", harder: ["Tirmidhi 889: he ﷺ had it called out: 'Hajj is...' what?", "Shaving the head", "Tawaf", "Buying a sacrifice"] },
  "On which day do pilgrims stand at Arafah?": { answer: "The 9th of Dhul-Hijjah", harder: ["Muslim 1218a: Jabir's account puts the standing at Arafah on which day?", "The 10th of Muharram", "The 27th of Rajab", "The 1st of Ramadan"] },
  "What happens on the Day of Arafah, in Sahih Muslim?": { answer: "Allah frees the most people from the Fire", harder: ["Muslim 1348: there is no day on which Allah frees more people from the Fire. On the Day of Arafah, what happens?", "The Hijrah began", "The Quran was finished", "Badr was fought"] },
  // Sahih al-Bukhari 1736.
  "A pilgrim shaved before his sacrifice by mistake. What did the Prophet ﷺ say?": { answer: "Sacrifice now, no harm", harder: ["Bukhari 1736: on the day of sacrifice a man had shaved before sacrificing. What did he ﷺ say?", "Your Hajj is lost", "Come back next year", "Pay a fine of gold"] },
  "What was his answer to every question that day?": { answer: "Do it, no harm", harder: ["Bukhari 1736: asked about every rite done out of order that day, he ﷺ gave one answer. What?", "Wait for Jibril", "Ask a scholar", "Start again"] },
  "What does this teach about Islam?": { answer: "It is easy, not harsh", harder: ["Bukhari 1736: every question that day got 'do it, no harm'. What does that show about the religion?", "Rules are pointless", "Do as you like", "Every mistake ruins worship"] },
  // Sahih al-Bukhari 1751.
  "How many pebbles are thrown at a pillar each time?": { answer: "Seven", harder: ["Bukhari 1751: Ibn Umar threw at each jamrah how many small pebbles?", "Ten", "Seventy", "Three"] },
  "What is said with each pebble?": { answer: "Allahu akbar", harder: ["Bukhari 1751: Ibn Umar said one word of remembrance with each pebble. Which?", "Subhanallah", "Labbayk", "Bismillah only"] },
  "What did Ibn Umar do after the first pillar?": { answer: "Made long du'a facing the qiblah", harder: ["Bukhari 1751: after the first jamrah, what did Ibn Umar do, saying he saw the Prophet ﷺ do so?", "Left Mina", "Slept", "Threw more stones"] },
  // Sahih al-Bukhari 1513.
  "Why couldn't her father go himself?": { answer: "He was too old to ride", harder: ["Bukhari 1513: the woman of Khath'am said Hajj was due on her father. Why could he not go?", "He was poor", "He was not Muslim", "He was traveling"] },
  "What did the Prophet ﷺ answer?": { answer: "Yes, do Hajj for him", harder: ["Bukhari 1513: 'May I do Hajj for him?' What was his ﷺ answer?", "No, never", "Only if he pays", "Only in Ramadan"] },
  "What does this show about family?": { answer: "We can help parents even in worship", harder: ["Bukhari 1513: a daughter does Hajj for her old father. What does that show?", "Only sons can help", "Hajj is only for the young", "Parents must manage alone"] },
  // Sahih al-Bukhari 1773.
  "What is the reward of a Hajj mabrur?": { answer: "Paradise", harder: ["Bukhari 1773: 'the reward of an accepted Hajj is nothing but' what?", "A long life", "A new name", "Wealth"] },
  "What does one Umrah to the next do?": { answer: "Wipes the sins between them", harder: ["Bukhari 1773: an Umrah is an expiation for what lies between it and the one before. What does it do?", "Doubles wealth", "Nothing", "Replaces Hajj"] },
  "For women, what did he call the best jihad?": { answer: "An accepted Hajj", harder: ["Bukhari 1520: Aishah said they saw jihad as the best deed. For women, what did he ﷺ call the best jihad?", "Fighting", "Fasting", "Trading"] },
  // Sahih al-Bukhari 969.
  "Which days did he call the best for good deeds?": { answer: "The first ten of Dhul-Hijjah", harder: ["Bukhari 969: no good deeds on other days are better than those done in 'these ten days'. Which ten?", "The last ten of Shaban", "The first ten of Muharram", "Any ten days"] },
  "The companions asked: not even what?": { answer: "Jihad", harder: ["Bukhari 969: told no deeds beat those of the ten days, the Companions asked: 'not even' what?", "Charity", "Prayer", "Hajj"] },
  "Someone at home can't go to Hajj. What can they do in these days?": { answer: "Fast, give and remember Allah", harder: ["Bukhari 969 praises good deeds in the first ten days of Dhul-Hijjah. Someone stuck at home: what fits?", "Wait for Ramadan", "Sleep more", "Nothing, it's only for pilgrims"] },
  // Quran 2:196.
  "For whom are Hajj and Umrah done?": { answer: "For Allah", harder: ["Quran 2:196: 'complete the Hajj and the Umrah for' whom?", "For photos", "For fame", "For a holiday"] },
  "What is Umrah?": { answer: "A smaller pilgrimage to Makkah", harder: ["Quran 2:196 names Hajj and the Umrah together. What is the Umrah?", "A fast", "A kind of charity", "A Friday prayer"] },
  "Umrah can be done outside the Hajj days.": { answer: "True", harder: "Unlike Hajj, the Umrah named in Quran 2:196 is not tied to the Hajj days." },
  // Sahih al-Bukhari 1778.
  "How many times did he ﷺ make Umrah?": { answer: "Four", harder: ["Bukhari 1778: Qatadah asked Anas how many times he ﷺ made Umrah. What did Anas say?", "One", "Ten", "Forty"] },
  "How many times did he ﷺ make Hajj?": { answer: "Once", harder: ["Bukhari 1778: then Qatadah asked Anas how many Hajj he ﷺ made. The answer?", "Never", "Four times", "Every year"] },
  "Who answered this question?": { answer: "Anas", harder: ["Bukhari 1778: Qatadah asked about his ﷺ Umrahs and Hajj. Who gave the answers?", "Heraclius", "Abu Lahab", "Abu Jahl"] },
  // Sahih al-Bukhari 1782.
  "An Umrah in Ramadan is like what?": { answer: "A Hajj", harder: ["Bukhari 1782: 'make Umrah when Ramadan comes, for Umrah in Ramadan is like' what?", "A fast", "A small charity", "An Umrah only"] },
  "Why had the woman missed Hajj?": { answer: "Her family lacked a camel", harder: ["Bukhari 1782: what kept the Ansari woman from Hajj with them?", "She was lazy", "She forgot", "It rained"] },
  "Umrah in Ramadan replaces the duty of Hajj.": { answer: "False", harder: "By Bukhari 1782, a Ramadan Umrah removes the duty of Hajj from the one who can go." },
  // Sahih al-Bukhari 1520.
  "What did he ﷺ call the best striving for women?": { answer: "An accepted Hajj", harder: ["Bukhari 1520: Aishah spoke of jihad as the best deed. What did he ﷺ say is the best jihad for women?", "Fighting in battle", "Fasting every day", "Giving all her wealth"] },
  "Who asked him ﷺ about it?": { answer: "Aishah", harder: ["Bukhari 1520: 'we see jihad as the best deed'. Who said that to him ﷺ?", "Abu Jahl", "Heraclius", "Abu Lahab"] },
  "Hajj takes real effort and patience.": { answer: "True", harder: "Bukhari 1520 calls an accepted Hajj a jihad, a striving that takes real effort." },
  // Quran 3:96.
  "Where is the first House set up for people?": { answer: "Makkah", harder: ["Quran 3:96: the first House set up for mankind is the one at Bakkah. Where is that?", "Cairo", "Baghdad", "Rome"] },
  "What is another Quran name for Makkah?": { answer: "Bakkah", harder: ["Quran 3:96 names the place of the first House with which name?", "Yathrib", "Taif", "Badr"] },
  "The House is a guidance for the whole world.": { answer: "True", harder: "Quran 3:96 calls the first House blessed and a guidance for the worlds." },
  // Quran 2:127.
  "Who raised the foundations of the Ka'bah?": { answer: "Ibrahim and Ismail", harder: ["Quran 2:127: who raised the foundations of the House, praying 'Our Lord, accept this from us'?", "Musa and Harun", "Dawud and Sulayman", "Nuh and his son"] },
  "What did they ask while building?": { answer: "Our Lord, accept from us", harder: ["Quran 2:127: while raising the House, what did Ibrahim and Ismail say?", "Make us famous", "Make us rich", "Nothing"] },
  "Even great deeds need du'a to be accepted.": { answer: "True", harder: "In Quran 2:127, Ibrahim and Ismail asked Allah to accept the House even as they built it." },
  // Quran 14:37.
  "What was the valley like?": { answer: "Without crops", harder: ["Quran 14:37: Ibrahim settled his family in a valley near the Sacred House. How does he describe it?", "Covered in snow", "A big city", "Full of rivers"] },
  "What did Ibrahim ask for the people there?": { answer: "That hearts incline to them", harder: ["Quran 14:37: 'make hearts of people' do what toward them?", "Nothing", "That they leave", "Gold mines"] },
  "Why did he leave his family there?": { answer: "To establish prayer", harder: ["Quran 14:37: Ibrahim settled them by the Sacred House 'so that they' do what?", "To trade", "To fight", "To hide"] },
  // Quran 22:27.
  "Whom did Allah tell to call people to Hajj?": { answer: "Ibrahim", harder: ["Quran 22:27: 'And proclaim the Hajj to the people.' To whom was this said?", "Qarun", "Haman", "Firawn"] },
  "How would the pilgrims come?": { answer: "On foot and on camels", harder: ["Quran 22:27: how will the pilgrims come, the verse says?", "Only by ship", "They would not come", "Only kings"] },
  "Pilgrims come from every distant place.": { answer: "True", harder: "Quran 22:27 says pilgrims will come from every distant pass." },
  // Quran 3:97.
  "Which clear sign is named in 3:97?": { answer: "Maqam Ibrahim", harder: ["Quran 3:97: 'In it are clear signs.' Which one does the verse name?", "The pyramids", "The Nile", "Mount Sinai"] },
  "Who must make Hajj?": { answer: "Those who are able", harder: ["Quran 3:97: Hajj is a duty on people, for whom?", "Only kings", "Only children", "Nobody"] },
  "The Sacred House is a place of safety.": { answer: "True", harder: "Quran 3:97 says whoever enters the Sacred House is safe." },
  // Sahih al-Bukhari 1834.
  "Since when has Makkah been sacred?": { answer: "Since the heavens and earth were made", harder: ["Bukhari 1834: on the day Makkah was opened, he ﷺ said Allah made it sacred since when?", "Since last year", "Since Hajj began", "Never"] },
  "What may not be done to its animals?": { answer: "Chase them", harder: ["Bukhari 1834: in sacred Makkah, its thorny plants are not cut. And its game is not what?", "Look at them", "Give them water", "Feed them"] },
  "Makkah stays sacred until the Day of Resurrection.": { answer: "True", harder: "Bukhari 1834 says Makkah's sacredness lasts until the Day of Resurrection." },
  // Sahih al-Bukhari 1189.
  "Which masjid is in Jerusalem?": { answer: "Al-Aqsa", harder: ["Bukhari 1189: travel only to three masjids: al-Haram, his ﷺ masjid, and which one in Jerusalem?", "Quba", "An-Nabawi", "Al-Haram"] },
  "How many masjids are named for travel?": { answer: "Three", harder: ["Bukhari 1189: 'Do not set out on a journey except to' how many masjids?", "One", "Seven", "Ten"] },
  "Al-Masjid al-Haram is in Makkah.": { answer: "True", harder: "Bukhari 1189 names al-Masjid al-Haram, the masjid of Makkah, among the three." },
  // Sahih al-Bukhari 1190.
  "A prayer in his ﷺ masjid beats how many elsewhere?": { answer: "A thousand", harder: ["Bukhari 1190: one prayer in his ﷺ masjid is better than how many in any other?", "Two", "Ten", "One"] },
  "Which masjid is left out of that count?": { answer: "Al-Masjid al-Haram", harder: ["Bukhari 1190: better than a thousand prayers elsewhere, except in which masjid?", "Every masjid", "The local masjid", "None"] },
  "His ﷺ masjid is in Madinah.": { answer: "True", harder: "Bukhari 1190 is about his ﷺ own masjid, the one in Madinah." },
  // Sahih al-Bukhari 1196.
  "What lies between his ﷺ house and his minbar?": { answer: "A garden of Jannah", harder: ["Bukhari 1196: what is between his ﷺ house and his minbar?", "A market", "A river", "A wall"] },
  "What is a minbar?": { answer: "The pulpit for the khutbah", harder: ["Bukhari 1196: 'my minbar is over my Pool.' What is a minbar?", "A prayer mat", "A water jug", "A lamp"] },
  "His ﷺ minbar is over his Pool, he said.": { answer: "True", harder: "In Bukhari 1196 he ﷺ said his minbar is over his Pool." },
  // Sahih al-Bukhari 1613.
  "How did he ﷺ do tawaf in Bukhari 1613?": { answer: "Riding a camel", harder: ["Bukhari 1613: pointing at the Corner each time, how did he ﷺ go around the Ka'bah?", "Riding a horse", "Carried by people", "Walking barefoot"] },
  "What did he ﷺ say each time he reached the Corner?": { answer: "Allahu akbar", harder: ["Bukhari 1613: each time he ﷺ came to the Corner of the Black Stone, he pointed and said what?", "Subhanallah only", "Nothing at all", "Labbayk only"] },
  "He ﷺ pointed to the Black Stone each time he passed it.": { answer: "True", harder: "Bukhari 1613 says he ﷺ pointed to the Corner of the Black Stone every time he came to it." },
  // Sahih al-Bukhari 1617.
  "In how many rounds did he ﷺ walk briskly?": { answer: "The first three", harder: ["Bukhari 1617: in which rounds did he ﷺ do ramal around the Ka'bah?", "All seven", "Only the last one", "The last four"] },
  "How many rounds are there in tawaf?": { answer: "Seven", harder: ["Bukhari 1617: three brisk rounds and four walked. How many rounds in all?", "Ten", "Forty", "Three"] },
  "What is ramal?": { answer: "Walking briskly", harder: ["Bukhari 1617: he ﷺ did ramal in the first three rounds. What is ramal?", "Sitting to make du'a", "Walking very slowly", "Standing still to pray"] },
  // Sahih al-Bukhari 1606.
  "Which two corners did Ibn Umar always touch?": { answer: "The Black Stone and the Yemeni Corner", harder: ["Bukhari 1606: Ibn Umar never missed touching two stones of the Ka'bah. Which two?", "Maqam Ibrahim and the door", "The two Syrian Corners", "The door and the roof"] },
  "Why did Ibn Umar touch them?": { answer: "He saw the Prophet ﷺ touching them", harder: ["Bukhari 1606: in crowds or not, why did Ibn Umar never miss touching the two corners?", "To feel the cool stone", "Someone paid him", "For good luck"] },
  "Ibn Umar followed the sunnah even when it was crowded.": { answer: "True", harder: "In Bukhari 1606 Ibn Umar touched the two corners in crowds and without crowds." },
  // Quran 2:158.
  "What does Allah call Safa and Marwah?": { answer: "Among the symbols of Allah", harder: ["Quran 2:158: 'Indeed, Safa and Marwah are' what?", "Old markets", "Places to play", "Ordinary hills"] },
  "Who walks between Safa and Marwah?": { answer: "People doing Hajj or Umrah", harder: ["Quran 2:158: 'whoever makes Hajj to the House or Umrah' may walk between them. Who walks there?", "Only kings", "No one", "Only traders"] },
  "Allah is Appreciative of any good we do by choice.": { answer: "True", harder: "Quran 2:158 ends: whoever does good of his own accord, Allah is Appreciative and Knowing." },
  // Sahih al-Bukhari 1599.
  "Where did Ibn Umar pray inside the Ka'bah?": { answer: "Where the Prophet ﷺ had prayed", harder: ["Bukhari 1599: three cubits from the far wall, where did Ibn Umar pray inside the Ka'bah?", "Right by the door", "In every corner", "On the roof"] },
  "Who told Ibn Umar the exact place?": { answer: "Bilal", harder: ["Bukhari 1599: Ibn Umar prayed where he ﷺ prayed in the Ka'bah. Who had told him the spot?", "Jabir", "Anas", "Abu Hurairah"] },
  "The Sahabah loved to follow even the places where he ﷺ prayed.": { answer: "True", harder: "In Bukhari 1599 Ibn Umar walked to the exact spot where the Prophet ﷺ had prayed." },
  // Sahih al-Bukhari 1764.
  "What did he ﷺ do just before leaving Makkah?": { answer: "A farewell tawaf", harder: ["Bukhari 1764: after the four prayers and a short sleep, what did he ﷺ ride to the Ka'bah to do?", "Went to Quba", "Sat in i'tikaf", "Stood at Arafah again"] },
  "Where did he ﷺ rest before the farewell tawaf?": { answer: "Al-Muhassab", harder: ["Bukhari 1764: he ﷺ slept a little at which place before the farewell tawaf?", "Badr", "Arafah", "Quba"] },
  "The last rite at the Ka'bah is a tawaf around it.": { answer: "True", harder: "In Bukhari 1764 he ﷺ rode to the Ka'bah for a farewell tawaf before leaving." },
  // Sahih al-Bukhari 1671.
  "What did he ﷺ hear behind him, leaving Arafah?": { answer: "Shouting and camels being beaten", harder: ["Bukhari 1671: leaving Arafah, what did he ﷺ hear behind him?", "Birds singing", "People reciting Quran", "Complete silence"] },
  "What did he ﷺ teach the people then?": { answer: "Hurrying is not righteousness", harder: ["Bukhari 1671: signalling with his whip, 'O people, be calm, for...' what?", "The first to arrive wins", "Push to get ahead", "Run as fast as you can"] },
  "In Hajj we should stay calm, even in big crowds.": { answer: "True", harder: "In Bukhari 1671 he ﷺ told the crowds leaving Arafah to be calm." },
  // Sahih al-Bukhari 1681.
  "Why did Sawdah ask to leave Muzdalifah early?": { answer: "She was slow, and wanted to beat the crowds", harder: ["Bukhari 1681: at Muzdalifah, why did Sawdah ask to leave before the people?", "She was angry", "She wanted to go shopping", "She was going home"] },
  "What did he ﷺ answer her?": { answer: "He gave her permission", harder: ["Bukhari 1681: Sawdah asked to leave Muzdalifah before the crowds. What did he ﷺ do?", "He refused", "He told her to run", "He sent her home"] },
  "Islam makes things easier for the weak and the slow.": { answer: "True", harder: "In Bukhari 1681 Aishah later wished she too had asked to leave early." },
  // Quran 2:198.
  "After leaving Arafat, what should pilgrims do?": { answer: "Remember Allah", harder: ["Quran 2:198: 'when you leave Arafat', what are pilgrims told to do at al-Mash'ar al-Haram?", "Go shopping only", "Sleep all day", "Argue"] },
  "Is it wrong to trade or earn during the Hajj journey?": { answer: "No, there is no blame", harder: ["Quran 2:198: 'no blame on you for seeking the bounty of your Lord.' Is earning on the Hajj journey wrong?", "Only for kings", "Yes, it is forbidden", "Only on Fridays"] },
  "We remember Allah because He guided us.": { answer: "True", harder: "Quran 2:198 says: remember Him as He has guided you, though before it you were astray." },
  // Sahih al-Bukhari 1620.
  "What did he ﷺ see during tawaf?": { answer: "A man tied to another by a rope", harder: ["Bukhari 1620: during tawaf he ﷺ passed a man. What did he see?", "A man asleep", "A man selling food", "A man running alone"] },
  "What did he ﷺ do with the rope?": { answer: "Cut it with his own hands", harder: ["Bukhari 1620: what did he ﷺ do with the rope tying the man?", "Left it alone", "Gave it to Bilal", "Tied it tighter"] },
  "What did he ﷺ say to do instead?": { answer: "Lead him by the hand", harder: ["Bukhari 1620: after cutting the rope, what did he ﷺ say?", "Leave him behind", "Pull him faster", "Carry him"] },
  // Sahih al-Bukhari 1635.
  "Which water did he ﷺ choose to drink?": { answer: "The same water as the people", harder: ["Bukhari 1635: al-Abbas offered water from home, since people put their hands in it. What did he ﷺ do?", "Special water from home", "Only rain water", "No water at all"] },
  "What did he ﷺ tell those drawing Zamzam water?": { answer: "Carry on, you are doing a good deed", harder: ["Bukhari 1635: at Zamzam, people drew water for others. What did he ﷺ tell them?", "Stop, it is too crowded", "Sell it to them", "Give it only to the rich"] },
  "Giving water to pilgrims is a good deed.": { answer: "True", harder: "In Bukhari 1635 he ﷺ called drawing Zamzam water for people a good deed." },
  // Quran 22:28.
  "Whose name is mentioned over the sacrifice?": { answer: "Allah's name", harder: ["Quran 22:28: on known days, whose name is mentioned over the livestock?", "The buyer's name", "The animal's name", "No name"] },
  "Who must also get some of the meat?": { answer: "The poor in need", harder: ["Quran 22:28: 'So eat from them and feed' whom?", "Only the family", "No one", "Only the rich"] },
  "Pilgrims come to witness benefits for themselves.": { answer: "True", harder: "Quran 22:28 says pilgrims come to witness benefits for themselves." },
  // Sahih al-Bukhari 1797.
  "What did he ﷺ say three times on every rise?": { answer: "Allahu akbar", harder: ["Bukhari 1797: coming back from Hajj or Umrah, what did he ﷺ say three times on each rise?", "Subhanallah", "Labbayk", "Alhamdulillah"] },
  "How did he ﷺ describe the travellers coming home?": { answer: "Repenting and praising our Lord", harder: ["Bukhari 1797: 'We return...' how did he ﷺ describe them?", "Tired and hungry", "Rich and proud", "Sad to be back"] },
  "He ﷺ said these words coming home from Umrah too.": { answer: "True", harder: "Bukhari 1797 says he ﷺ said these words returning from Hajj or Umrah." },
  // Jami at-Tirmidhi 810.
  "What do Hajj and Umrah remove, he ﷺ said?": { answer: "Poverty and sins", harder: ["Tirmidhi 810: 'follow Hajj with Umrah, for they remove' what?", "Rain and wind", "Friends and family", "Hunger and thirst"] },
  "What did he ﷺ compare their cleaning to?": { answer: "Bellows cleaning metal", harder: ["Tirmidhi 810: they remove sins as what removes the dross of iron, gold and silver?", "Rain washing a street", "Wind clearing clouds", "Water washing clothes"] },
  "The only reward for an accepted Hajj is Paradise.": { answer: "True", harder: "Tirmidhi 810 says an accepted Hajj has no reward but Paradise." },
  // Jami at-Tirmidhi 828.
  "What joins the pilgrim in saying the talbiyah?": { answer: "Rocks, trees and earth", harder: ["Tirmidhi 828: when a Muslim says the talbiyah, what says it with him?", "Nothing at all", "The angels alone", "Only other pilgrims"] },
  "Where are the things that say the talbiyah with him?": { answer: "On his right and left", harder: ["Tirmidhi 828: the rocks, trees and earth that join the talbiyah are where?", "Only behind him", "Only in front of him", "Only above him"] },
  "Only people say the talbiyah during Hajj.": { answer: "False", harder: "Tirmidhi 828 says only people, and nothing else, say the talbiyah." },
  // Jami at-Tirmidhi 829.
  "Who told him ﷺ to have them raise their voices?": { answer: "Jibril", harder: ["Tirmidhi 829: who came and told him ﷺ to order the Companions to raise their voices?", "Umar", "Uthman", "Abu Bakr"] },
  "How did the Companions say the talbiyah?": { answer: "With raised voices", harder: ["Tirmidhi 829: Jibril said to order the Companions to say the talbiyah how?", "In a whisper", "In silence", "Only in their hearts"] },
  "The Companions were told to keep the talbiyah silent.": { answer: "False", harder: "In Tirmidhi 829 Jibril told him ﷺ to have the Companions keep the talbiyah quiet." },
  // Jami at-Tirmidhi 869.
  "Which suras did he ﷺ read in the two rak'ahs of tawaf?": { answer: "Al-Kafirun and Al-Ikhlas", harder: ["Tirmidhi 869, from Jabir: in the two rak'ahs of tawaf, which suras did he ﷺ recite?", "Al-Falaq and An-Nas", "Yasin and Al-Mulk", "Al-Asr and Al-Kawthar"] },
  "What are both suras called, in Tirmidhi 869?": { answer: "The two suras of sincerity", harder: ["Tirmidhi 869: Jabir calls Al-Kafirun and Al-Ikhlas by what name?", "The two suras of light", "The two suras of refuge", "The two suras of mercy"] },
  "He ﷺ prayed two rak'ahs after his tawaf.": { answer: "True", harder: "Tirmidhi 869 speaks of two rak'ahs he ﷺ prayed for tawaf." },
  // Jami at-Tirmidhi 903.
  "How did he ﷺ come to throw the pebbles?": { answer: "On his she-camel", harder: ["Tirmidhi 903: Qudamah saw him ﷺ throwing at the Jamarat. How?", "On a horse", "On a donkey", "On foot, running"] },
  "What was missing around him ﷺ at the Jamarat?": { answer: "Hitting and crowding", harder: ["Tirmidhi 903: 'no hitting, no pushing, and no one shouting make way'. What was missing?", "Water and shade", "Pilgrims and pebbles", "Prayer and du'a"] },
  "Pushing people out of the way fits his ﷺ Sunnah at the Jamarat.": { answer: "False", harder: "In Tirmidhi 903 people shouted 'make way, make way' around him ﷺ at the Jamarat." },
  // Jami at-Tirmidhi 924.
  "What did the mother ask about her boy?": { answer: "If he could do Hajj", harder: ["Tirmidhi 924: a woman held up her little boy. What did she ask?", "If he could pray yet", "If he could fast yet", "What to name him"] },
  "Who else gets a reward for the child's Hajj?": { answer: "His mother", harder: ["Tirmidhi 924: 'Yes, and you will have a reward.' Who gets that reward?", "His neighbor", "Nobody at all", "His teacher"] },
  "Children can go on Hajj too.": { answer: "True", harder: "In Tirmidhi 924 he ﷺ said yes, a little boy can have Hajj." },
  // Sahih al-Bukhari 1885.
  "What did he ﷺ ask Allah to give Madinah?": { answer: "Twice Makkah's blessing", harder: ["Bukhari 1885: 'O Allah, give Madinah' what?", "Half of Makkah's rain", "A wall of gold", "A bigger market"] },
  "Which city did he ﷺ name in his du'a for Madinah?": { answer: "Makkah", harder: ["Bukhari 1885: Madinah's blessing was to be twice that of which city?", "Jerusalem", "Damascus", "Ta'if"] },
  "He ﷺ made du'a for more blessing in Madinah.": { answer: "True", harder: "In Bukhari 1885 he ﷺ asked Allah for twice the blessing in Madinah." },
  // Sahih al-Bukhari 1876.
  "Where does faith return to, he ﷺ said?": { answer: "To Madinah", harder: ["Bukhari 1876: faith returns, as a snake returns to its hole, to where?", "To the sea", "To the mountains", "To the desert"] },
  "How does faith return to Madinah, he ﷺ said?": { answer: "As a snake to its hole", harder: ["Bukhari 1876: faith returns to Madinah like what?", "As rain to the sea", "As a bird to its nest", "As a ship to its port"] },
  "He ﷺ said faith would leave Madinah forever.": { answer: "False", harder: "Bukhari 1876 says faith will leave Madinah and never come back." },
  // Sahih al-Bukhari 1883.
  "What happened to the Bedouin the day after his pledge?": { answer: "He came with a fever", harder: ["Bukhari 1883: the Bedouin pledged Islam. What happened the next day?", "He bought a house", "He found a treasure", "He lost his camel"] },
  "What is Madinah like, he ﷺ said?": { answer: "A furnace", harder: ["Bukhari 1883: driving out the bad, picking out the good, Madinah is like what?", "A mirror", "A ship", "A tent"] },
  "He ﷺ cancelled the Bedouin's pledge at once.": { answer: "False", harder: "In Bukhari 1883 he ﷺ cancelled the Bedouin's pledge the moment he asked." },
  // Sahih al-Bukhari 1886.
  "What did he ﷺ do on seeing Madinah's walls?": { answer: "Made his mount go faster", harder: ["Bukhari 1886: back from a journey, seeing Madinah's walls, what did he ﷺ do?", "Stopped to look around", "Got off to walk", "Waited for the others"] },
  "Why did he ﷺ hurry when he saw Madinah?": { answer: "Out of love for Madinah", harder: ["Bukhari 1886: he ﷺ made his horse gallop on seeing Madinah. Why, Anas said?", "He was late for a meal", "A storm was coming", "He was racing someone"] },
  "He ﷺ loved the city of Madinah.": { answer: "True", harder: "Bukhari 1886 says he ﷺ hurried home out of love for Madinah." },
  // Sahih al-Bukhari 1877.
  "What happens to one who plots against Madinah's people?": { answer: "He melts away like salt", harder: ["Bukhari 1877: no one plots against the people of Madinah but what happens?", "He is praised by all", "He becomes their king", "He grows rich"] },
  "What does the plotter melt like, he ﷺ said?": { answer: "Salt in water", harder: ["Bukhari 1877: the one who plots against Madinah melts away as what melts?", "Wax in a fire", "Snow on a hill", "Ice in the sun"] },
  "Plotting against the people of Madinah ends well.": { answer: "False", harder: "Bukhari 1877 says one who plots against the people of Madinah will win in the end." },
  // Sahih al-Bukhari 1875.
  "Which land did he ﷺ say would be opened first?": { answer: "Yemen", harder: ["Bukhari 1875: Yemen, Sham, then Iraq. Which did he ﷺ name first?", "Iraq", "Sham", "Egypt"] },
  "Whom would those leaving Madinah call to join them?": { answer: "Their families", harder: ["Bukhari 1875: those who leave Madinah for new lands call whom to come?", "Their old enemies", "The desert tribes", "Strangers in the market"] },
  "Madinah would still be better for those who left it.": { answer: "True", harder: "Bukhari 1875 says: Madinah is better for them, if they only knew." },
  // Jami at-Tirmidhi 877.
  "Where did the Black Stone come from?": { answer: "From Paradise", harder: ["Tirmidhi 877: whiter than milk at first, the Black Stone came down from where?", "From a far land", "From a mountain", "From the sea"] },
  "What color was the Black Stone at first?": { answer: "Whiter than milk", harder: ["Tirmidhi 877: before sins made it black, the Black Stone was what color?", "Green like grass", "Blue like the sky", "Red as fire"] },
  "The sins of people turned the Black Stone black.": { answer: "True", harder: "Tirmidhi 877 says the Black Stone was whiter than milk at first." },
  // Jami at-Tirmidhi 961.
  "What will the Black Stone have on the Day of Resurrection?": { answer: "Two eyes and a tongue", harder: ["Tirmidhi 961: Allah will raise the Black Stone on the Day of Resurrection with what?", "Two wings and a crown", "Two hands and a lamp", "A door and a key"] },
  "For whom will the Black Stone speak?": { answer: "Whoever touched it in truth", harder: ["Tirmidhi 961: the Black Stone will testify for whom?", "Only for kings", "Only for the rich", "Whoever only looked at it"] },
  "The Black Stone will be silent on the Day of Resurrection.": { answer: "False", harder: "Tirmidhi 961 says the Black Stone will have no eyes or tongue on the Day of Resurrection." },
  // Jami at-Tirmidhi 959.
  "Why did Ibn Umar try so hard to touch the two corners?": { answer: "Touching them wipes away sins", harder: ["Tirmidhi 959: why did Ibn Umar press to reach the two corners more than others?", "To clean the stones", "To rest his tired hands", "To find a lost ring"] },
  "Seven rounds of tawaf, counted with care, are like what?": { answer: "Like freeing a slave", harder: ["Tirmidhi 959: going around the House seven times, keeping count, is as if one did what?", "Like giving a gold coin", "Like a long journey", "Like fasting a day"] },
  "Each step in tawaf removes a sin and records a good deed.": { answer: "True", harder: "Tirmidhi 959: no foot is raised or put down in tawaf without a sin removed and a good deed written." },
  // Jami at-Tirmidhi 960.
  "What did he ﷺ say tawaf around the House is like?": { answer: "Prayer", harder: ["Tirmidhi 960: 'tawaf around the House is like' what, except that you talk in it?", "A race", "A market", "A game"] },
  "If you talk during tawaf, what should you say?": { answer: "Only good words", harder: ["Tirmidhi 960: whoever talks in tawaf, let him say what?", "News of the market", "Whatever comes to mind", "Jokes and stories"] },
  "Talking is never allowed in tawaf.": { answer: "False", harder: "Tirmidhi 960 forbids every word during tawaf, even good ones." },
  // Jami at-Tirmidhi 963.
  "What did Aishah carry with her?": { answer: "Zamzam water", harder: ["Tirmidhi 963: Urwah said Aishah would carry what with her?", "Sand from the desert", "Stones from the mountain", "A cage of birds"] },
  "Why did Aishah carry Zamzam water?": { answer: "He ﷺ used to carry it", harder: ["Tirmidhi 963: why did Aishah carry Zamzam water, she said?", "To sell it at a market", "To wash her clothes", "To water her garden"] },
  "Carrying Zamzam water home follows his ﷺ way.": { answer: "True", harder: "In Tirmidhi 963 Aishah said the Messenger of Allah ﷺ used to carry Zamzam water." },
  // Jami at-Tirmidhi 891.
  "Where did Urwah reach the Prophet ﷺ?": { answer: "At Muzdalifah", harder: ["Tirmidhi 891: Urwah ibn Mudarris came from the mountains of Tayy. Where did he reach him ﷺ?", "At Mount Uhud", "At Mina", "In Madinah"] },
  "What did Urwah ask the Prophet ﷺ?": { answer: "Is there Hajj for me?", harder: ["Tirmidhi 891: Urwah said he wore out his camel and tired himself. Then he asked what?", "May I go home now?", "Where is the Ka'bah?", "May I sell my camel?"] },
  "Urwah had tired out his camel to reach Hajj.": { answer: "True", harder: "In Tirmidhi 891 Urwah said he stopped on every sand hill on his way." },
  // Sunan Ibn Majah 2883.
  "What should someone who means to do Hajj do?": { answer: "Hurry to do it", harder: ["Ibn Majah 2883: whoever intends to perform Hajj, what should he do?", "Wait for a sign", "Wait for a friend", "Wait for old age"] },
  "Which reason to hurry did he ﷺ give?": { answer: "He may fall sick", harder: ["Ibn Majah 2883: hurry to Hajj, for one of these may happen. Which reason did he ﷺ give?", "Hajj may get easier", "Prices may fall", "He may grow bored"] },
  "Losing your ride is one thing that can stop a Hajj.": { answer: "True", harder: "Ibn Majah 2883 names losing your mount as a reason to hurry to Hajj." },
  // Sunan an-Nasa'i 2625.
  "How many are the guests of Allah, he ﷺ said?": { answer: "Three", harder: ["Nasa'i 2625: the fighter in Allah's cause, the pilgrim, the one doing Umrah. How many guests of Allah?", "Two", "Seven", "Ten"] },
  "Who is the mu'tamir?": { answer: "The one doing Umrah", harder: ["Nasa'i 2625 names the hajj, the mu'tamir and the one striving. Who is the mu'tamir?", "The one leading prayer", "The one selling food", "The one guarding a gate"] },
  "A pilgrim on Hajj is one of the guests of Allah.": { answer: "True", harder: "Nasa'i 2625 counts the one doing Hajj among the guests of Allah." },
  // Sunan Ibn Majah 2920.
  "What does labbayka mean?": { answer: "Here I am, answering You", harder: ["Ibn Majah 2920: 'labbayka ilahal-haqq, labbayk'. What does labbayka mean?", "Forgive me, my Lord", "Allah is the Greatest", "Thank you, my Lord"] },
  "Who reported his ﷺ words ilahal-haqq in the talbiyah?": { answer: "Abu Hurairah", harder: ["Ibn Majah 2920: who said he ﷺ used to say 'labbayka ilahal-haqq'?", "Anas ibn Malik", "Jabir ibn Abdullah", "Abdullah ibn Umar"] },
  "The talbiyah is the call of a pilgrim answering Allah.": { answer: "True", harder: "Ibn Majah 2920: the talbiyah answers Allah, 'Here I am, O God of Truth.'" },
  // Sunan Abi Dawud 1730.
  "What did they say when they came without provisions?": { answer: "We put our trust in Allah", harder: ["Abu Dawud 1730: people of Yemen came for Hajj without provisions. What did they say?", "We are too poor to buy any", "We forgot them at home", "We will buy them on the way"] },
  "What is the best provision, Allah says in 2:197?": { answer: "Taqwa", harder: ["Abu Dawud 1730: Allah sent down 2:197 for them. The best provision is what?", "Gold", "Dates", "Water"] },
  "Allah told the pilgrims to take provisions for the road.": { answer: "True", harder: "In Abu Dawud 1730 the verse sent down told pilgrims to take provisions." },
  // Sunan Ibn Majah 2900.
  "Where was the man's wife going?": { answer: "To Hajj", harder: ["Ibn Majah 2900: the Bedouin had enlisted for a campaign. Where was his wife going?", "To a wedding", "To the market", "To her parents' town"] },
  "What did he ﷺ tell the Bedouin?": { answer: "Go back with her", harder: ["Ibn Majah 2900: his wife was going for Hajj. What did he ﷺ say to him?", "Stay with the army", "Send a servant with her", "Wait for next year"] },
  "The man had signed up for a military campaign.": { answer: "True", harder: "In Ibn Majah 2900 the Bedouin had enlisted for a campaign before he was told to go with his wife." },
  // Sunan an-Nasa'i 2626.
  "Whose jihad is Hajj and Umrah, he ﷺ said?": { answer: "The old, the young, the weak and women", harder: ["Nasa'i 2626: Hajj and Umrah are the jihad of whom?", "Only kings and chiefs", "Only the rich", "Only soldiers"] },
  "What is the jihad of the weak, he ﷺ said?": { answer: "Hajj and Umrah", harder: ["Nasa'i 2626: the jihad of the elderly, the young, the weak and women is what?", "Fasting and silence", "Trading and travel", "Sleeping early"] },
  "Hajj and Umrah are a struggle of effort for Allah's sake.": { answer: "True", harder: "Nasa'i 2626 calls Hajj and Umrah a jihad, a striving for Allah." },
  // Jami at-Tirmidhi 3925.
  "What did he ﷺ call Makkah?": { answer: "The best of Allah's earth", harder: ["Tirmidhi 3925: at al-Hazwarah he ﷺ spoke to Makkah. What did he call it?", "A city of kings", "A small market town", "A land of rivers"] },
  "What made him ﷺ leave Makkah, he said?": { answer: "Being driven out", harder: ["Tirmidhi 3925: 'had I not been' what, he ﷺ told Makkah, 'I would not have left'?", "A great flood", "The wells running dry", "A cold winter"] },
  "Makkah is the land most beloved to Allah.": { answer: "True", harder: "Tirmidhi 3925 calls Makkah the most beloved of Allah's earth to Allah." },
  // Sunan Ibn Majah 1406.
  "One prayer in the Sacred Mosque is better than how many?": { answer: "A hundred thousand", harder: ["Ibn Majah 1406: one prayer in the Sacred Mosque is better than how many elsewhere?", "Ten", "Seventy", "Five hundred"] },
  "Which masjid is built around the Ka'bah?": { answer: "The Sacred Mosque", harder: ["Ibn Majah 1406 names the Sacred Mosque. Which masjid is that, around the Ka'bah?", "Masjid Quba", "Al-Aqsa", "Masjid al-Qiblatayn"] },
  "A prayer in the Sacred Mosque counts as just one prayer.": { answer: "False", harder: "By Ibn Majah 1406, one prayer in the Sacred Mosque is worth no more than one elsewhere." },
  // Sunan an-Nasa'i 2912.
  "Where did he ﷺ take Aishah to pray?": { answer: "Into the Hijr", harder: ["Nasa'i 2912: Aishah wanted to pray inside the House. Where did he ﷺ take her?", "Out to the valley", "Into a tent", "Onto the roof"] },
  "Why could Aishah pray in the Hijr instead?": { answer: "The Hijr is part of the House", harder: ["Nasa'i 2912: 'pray here, for it is...' Why could Aishah pray in the Hijr?", "The Hijr is closer to Zamzam", "The Hijr has more shade", "The Hijr is cooler"] },
  "Her people built the Ka'bah smaller than it was meant to be.": { answer: "True", harder: "Nasa'i 2912 says her people made the House too small when they built it." },
  // Sunan Abi Dawud 1892.
  "What did he ﷺ ask for between the two corners?": { answer: "Good in this world and the next", harder: ["Abu Dawud 1892: between the two corners he ﷺ said 'our Lord, give us...' what?", "A long, easy road", "A big house", "Rain for the crops"] },
  "What did he ﷺ ask Allah to guard us from?": { answer: "The punishment of the Fire", harder: ["Abu Dawud 1892: 'and guard us from' what?", "The summer heat", "The big crowds", "Hunger on the road"] },
  "He ﷺ made this du'a while going around the Ka'bah.": { answer: "True", harder: "Abu Dawud 1892 says he ﷺ said this du'a between the two corners of the Ka'bah." },
  // Sahih al-Bukhari 1573.
  "Where did Ibn Umar spend the night before Makkah?": { answer: "At Dhi Tuwa", harder: ["Bukhari 1573: reaching the sacred land, where did Ibn Umar spend the night?", "At Uhud", "At Tabuk", "At Badr"] },
  "What did Ibn Umar do after Fajr, before entering?": { answer: "He took a bath", harder: ["Bukhari 1573: after the night at Dhi Tuwa and Fajr, what did Ibn Umar do?", "He slept again", "He ate a big meal", "He rode away"] },
  "Ibn Umar said the Prophet ﷺ did the same.": { answer: "True", harder: "In Bukhari 1573 Ibn Umar said the Prophet ﷺ used to stop at Dhi Tuwa too." },
  // Sahih al-Bukhari 1593.
  "What will people keep doing after Ya'juj and Ma'juj?": { answer: "Hajj and Umrah", harder: ["Bukhari 1593: even after Ya'juj and Ma'juj come out, people will keep doing what?", "Sailing to islands", "Hunting in the hills", "Racing horses"] },
  "Where will people keep going for Hajj and Umrah?": { answer: "To the Ka'bah", harder: ["Bukhari 1593: after Ya'juj and Ma'juj, people still perform Hajj and Umrah to where?", "To the mountains", "To a new city", "To a far island"] },
  "Hajj will stop the day Ya'juj and Ma'juj come out.": { answer: "False", harder: "Bukhari 1593 says Hajj ends once Ya'juj and Ma'juj appear." },
  // Sahih al-Bukhari 1619.
  "Why did Umm Salamah do tawaf riding?": { answer: "She was unwell", harder: ["Bukhari 1619: 'do the tawaf riding, behind the people.' Why did he ﷺ tell Umm Salamah this?", "She was leading a group", "She was in a hurry", "She had lost her way"] },
  "Which surah was he ﷺ reciting while she went round?": { answer: "At-Tur", harder: ["Bukhari 1619: he ﷺ prayed beside the Ka'bah as she went round. Which surah did he recite?", "Al-Mulk", "Yasin", "Al-Kahf"] },
  "He ﷺ told her to go round behind the people.": { answer: "True", harder: "In Bukhari 1619 he ﷺ told Umm Salamah to go round riding, behind the people." },
  // Sahih Muslim 1297.
  "What did he ﷺ tell the people to learn from him?": { answer: "The rites of Hajj", harder: ["Muslim 1297: on the Day of Nahr he ﷺ said 'take from me your...' what?", "The roads to Makkah", "The names of the stars", "The old Arab poems"] },
  "Why did he ﷺ say to learn them then?": { answer: "He might not do Hajj again", harder: ["Muslim 1297: 'I do not know whether I will...' Why learn the rites then?", "Hajj was only for that year", "The rites would soon change", "Makkah would soon close"] },
  "He ﷺ threw the pebbles while riding his camel.": { answer: "True", harder: "In Muslim 1297 Jabir saw him ﷺ throw pebbles riding his camel on the Day of Nahr." },
  // Sahih al-Bukhari 1517.
  "What is a packsaddle?": { answer: "A simple camel saddle", harder: ["Bukhari 1517: Anas did Hajj on a plain packsaddle. What is a packsaddle?", "A wooden cart", "A kind of tent", "A leather water bag"] },
  "How many camels carried him ﷺ and his bags?": { answer: "One camel for both", harder: ["Bukhari 1517: he ﷺ did Hajj on a packsaddle. What carried his baggage?", "Two camels", "Three camels", "Ten camels"] },
  "Anas did his Hajj on a plain saddle as well.": { answer: "True", harder: "Bukhari 1517 says Anas did Hajj on a plain packsaddle, and he was not a miser." },
  // Sahih al-Bukhari 1749.
  "Why did Ibn Mas'ud throw from that spot?": { answer: "To follow the Sunnah exactly", harder: ["Bukhari 1749: Ka'bah on his left, Mina on his right. Why did Ibn Mas'ud stand there?", "To be closest to Makkah", "To find the most shade", "To get away from the crowd"] },
  "Which surah did Ibn Mas'ud name?": { answer: "Al-Baqarah", harder: ["Bukhari 1749: 'the one to whom Surah ____ was revealed stood here.' Which surah?", "Al-Hajj", "Al Imran", "An-Nisa"] },
  "Ibn Mas'ud threw seven small pebbles at the big Jamrah.": { answer: "True", harder: "In Bukhari 1749 Ibn Mas'ud threw seven pebbles at the big Jamrah." },
  // Sunan Ibn Majah 2988.
  "Why did Ibn Umar walk at times between Safa and Marwah?": { answer: "To do just what he had seen", harder: ["Ibn Majah 2988: 'if I walk, it is because I saw him ﷺ walk.' Why did Ibn Umar walk?", "To keep off the wet ground", "To talk with the people", "To wait for his camel"] },
  "Where is sa'i done?": { answer: "Between Safa and Marwah", harder: ["Ibn Majah 2988: Ibn Umar went quickly or walked in his sa'i. Where is sa'i?", "At the Jamarat", "On Mount Arafah", "Around the Ka'bah"] },
  "Ibn Umar did what he had seen the Prophet ﷺ do, even when old.": { answer: "True", harder: "In Ibn Majah 2988 Ibn Umar said he followed what he saw, even though he was old." },
  // Sunan Abi Dawud 1938.
  "Until when did the pagans stay at Muzdalifah?": { answer: "Until the sun rose", harder: ["Abu Dawud 1938: before Islam, until when did the Arabs stay at Muzdalifah?", "Until sunset", "Until midnight", "Until noon"] },
  "Which mountain did the pagans wait to see in sunlight?": { answer: "Mount Thabir", harder: ["Abu Dawud 1938: the pagans waited to see sunlight on which mountain?", "Mount Uhud", "Mount Hira", "Mount Thawr"] },
  "He ﷺ left Muzdalifah before the sun rose.": { answer: "True", harder: "In Abu Dawud 1938 he ﷺ went against the pagans and left before sunrise." },
  // Sunan Abi Dawud 1816.
  "Where were they going with him ﷺ?": { answer: "From Mina to Arafat", harder: ["Abu Dawud 1816: Ibn Umar said they went with him ﷺ, some saying the talbiyah. From where to where?", "From Makkah to Jeddah", "From Madinah to Badr", "From Taif to Makkah"] },
  "Besides the talbiyah, what did the others say?": { answer: "Allahu akbar", harder: ["Abu Dawud 1816: some said the talbiyah. What were the others saying?", "Alhamdulillah", "Astaghfirullah", "Subhan Allah"] },
  "Some of them said the talbiyah on the way to Arafat.": { answer: "True", harder: "In Abu Dawud 1816 some said the talbiyah and others said Allahu akbar." },
  // Sahih al-Bukhari 1664.
  "What was Jubair looking for on the day of Arafat?": { answer: "His lost camel", harder: ["Bukhari 1664: on the day of Arafat, what had Jubair gone out to find?", "His lost sandals", "His lost bag", "His lost sword"] },
  "Why was Jubair surprised to see him ﷺ there?": { answer: "He was one of the Hums of Quraysh", harder: ["Bukhari 1664: 'by Allah, he is one of the Hums.' Why was Jubair surprised?", "He was a trader from Sham", "He was a stranger from Yemen", "He was a traveler from Persia"] },
  "Jubair saw him ﷺ standing at Arafat on the day of Arafat.": { answer: "True", harder: "In Bukhari 1664 Jubair saw him ﷺ standing at Arafat on that day." },
  // Sunan Abi Dawud 1917.
  "Where was he ﷺ when Al-Adda' saw him on 9 Dhul-Hijjah?": { answer: "On a camel", harder: ["Abu Dawud 1917: Al-Adda' saw him ﷺ on the ninth, standing in the stirrups. On what?", "On a horse", "On a mule", "On a donkey"] },
  "Which day is 9 Dhul-Hijjah?": { answer: "The day of Arafah", harder: ["Abu Dawud 1917: Al-Adda' saw him ﷺ on 9 Dhul-Hijjah. What day is that?", "The day of Eid", "The day of Ashura", "The first of Ramadan"] },
  "Al-Adda' saw him ﷺ standing up in the stirrups of his camel.": { answer: "True", harder: "In Abu Dawud 1917 Al-Adda' saw him ﷺ standing up in the stirrups." },
  // Sunan Abi Dawud 1919.
  "What message did Ibn Mirba' bring from him ﷺ?": { answer: "Stay where you are standing", harder: ["Abu Dawud 1919: 'stand where you are performing your rites.' What was the message?", "Move closer to the imam", "Wait for him at Mina", "Come to his tent"] },
  "Whose heritage are they heirs to, he ﷺ said?": { answer: "Ibrahim's", harder: ["Abu Dawud 1919: 'for you are heirs to the heritage of' whom?", "Musa's", "Dawud's", "Nuh's"] },
  "Their place at Arafat seemed far from where the imam stood.": { answer: "True", harder: "In Abu Dawud 1919 Amr thought their place at Arafat was very far from the imam." },
  // Sunan an-Nasa'i 3011.
  "What did he ﷺ do with his hands at Arafat?": { answer: "Raised them in du'a", harder: ["Nasa'i 3011: Usamah rode behind him ﷺ at Arafat. What did he do with his hands?", "Rested them on the saddle", "Kept them by his sides", "Put them behind his back"] },
  "What did he ﷺ do when the halter dropped?": { answer: "Took it with one hand", harder: ["Nasa'i 3011: the she-camel leaned and he ﷺ dropped her halter. What did he do?", "Let the camel walk free", "Got down from the camel", "Called for someone to help"] },
  "Usamah was riding behind him ﷺ at Arafat.": { answer: "True", harder: "Nasa'i 3011 says he ﷺ held the halter with one hand and kept the other raised." },
  // Sahih al-Bukhari 1666.
  "What did he ﷺ do when there was enough space?": { answer: "He went faster", harder: ["Bukhari 1666: leaving Arafat at a modest pace, what did he ﷺ do in open space?", "He turned back to Arafat", "He went back to Mina", "He tied up his camel"] },
  "On which Hajj was Usamah asked about this?": { answer: "The Farewell Hajj", harder: ["Bukhari 1666: Usamah was asked how he ﷺ moved leaving Arafat. On which Hajj?", "The Umrah of Hudaybiyah", "The Hajj of Abu Bakr", "The first Umrah"] },
  "Usamah said he ﷺ went at a modest pace from Arafat.": { answer: "True", harder: "In Bukhari 1666 Usamah said he ﷺ went very fast where there was open space." },
};
