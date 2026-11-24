import type { TierEntry } from "../questionTiers";

/**
 * Prayer: harder and expert ways to ask the same questions, batch 4 (unique prompts 395-502: the night prayer, the
 * sunnahs of the masjid, little extras, forgetting in salah, the sutrah, and praying in rain, cold and heat). Each
 * one keeps the question's answer and asks only what the lesson's own source says. Keyed by the question's English
 * prompt (see questionTiers.ts).
 */
export const PRAYER_TIERS_4: Record<string, TierEntry> = {
  // Bukhari 1146.
  "What did he ﷺ do after praying in the night, Aishah said?": {
    answer: "He went back to his bed",
    harder: ["Bukhari 1146: Al-Aswad asked Aishah about his ﷺ night prayer. After praying in the last part of the night, what did he do?", "He walked to the market", "He sat until noon", "He rode out of town"]
  },
  "When did he ﷺ get up for the dawn prayer, Aishah said?": {
    answer: "When he heard the adhan",
    harder: ["Bukhari 1146: after going back to bed, what made him ﷺ rise for Fajr?", "When the sun rose", "When a bell rang", "When a drum beat"]
  },
  "He ﷺ slept in the early part of the night.": {
    answer: "True",
    harder: "Aishah told in Bukhari 1146 that he ﷺ slept early in the night and rose in its last part to pray."
  },
  // Bukhari 1148.
  "When the last ayahs were left, what did he ﷺ do?": {
    answer: "He stood up and recited them",
    harder: ["Bukhari 1148, from Aishah: in old age he ﷺ recited the night prayer sitting. With the last ayahs left, what did he do?", "He began a new surah", "He recited them sitting", "He bowed at once"]
  },
  "How many ayahs were left when he ﷺ stood up?": {
    answer: "Thirty or forty",
    harder: ["Bukhari 1148: how many ayahs remained when he ﷺ rose from sitting to recite, then bowed?", "One or two", "Seven or eight", "Over a hundred"]
  },
  "In old age he ﷺ recited some of the night prayer sitting.": {
    answer: "True",
    harder: "Aishah said in Bukhari 1148 that she never saw him ﷺ recite the night prayer sitting until he grew old."
  },
  // Tirmidhi 581.
  "When can you make up a missed night portion, he ﷺ said?": {
    answer: "Between Fajr and Zuhr",
    harder: ["Tirmidhi 581, from Umar: one sleeps through his night portion of the Quran. When can he recite it and still have it count?", "Only on a Friday", "Only in Ramadan", "Between Asr and Maghrib"]
  },
  "How is it written for him, he ﷺ said?": {
    answer: "As if he recited it at night",
    harder: ["Tirmidhi 581: recited between Fajr and Zuhr, how is the missed night portion written for him?", "As nothing at all", "As half a reward", "As a missed deed"]
  },
  "If you sleep through your night portion, its reward is lost for good.": {
    answer: "False",
    harder: "Tirmidhi 581 says a night portion slept through cannot be made up at any time of the day."
  },
  // Abu Dawud 1329.
  "What did he ﷺ tell Abu Bakr about his voice?": {
    answer: "Raise it a little",
    harder: ["Abu Dawud 1329, from Abu Qatadah: Abu Bakr said 'the One I call on hears me'. What did he ﷺ tell him?", "Raise it very loud", "Keep it the same", "Keep it silent"]
  },
  "Why did Umar pray in a loud voice?": {
    answer: "To wake the sleepy and drive Shaytan away",
    harder: ["Abu Dawud 1329: asked why he recited loudly at night, what reason did Umar give?", "To call the traders to work", "To teach the children a poem", "To warn of a coming storm"]
  },
  "Abu Bakr prayed at night in a low voice.": {
    answer: "True",
    harder: "In Abu Dawud 1329 he ﷺ found Abu Bakr praying at night in a low voice and Umar in a loud one."
  },
  // Tirmidhi 449.
  "How did he ﷺ recite at night, Aishah said?": {
    answer: "Sometimes quietly, sometimes aloud",
    harder: ["Tirmidhi 449: Abdullah ibn Abi Qais asked Aishah how he ﷺ recited at night. What did she say?", "Only in his heart", "Always in a whisper", "Always very loudly"]
  },
  "What did Abdullah ibn Abi Qais thank Allah for?": {
    answer: "Making the matter wide",
    harder: ["Tirmidhi 449: hearing that he ﷺ did both, Abdullah ibn Abi Qais praised Allah for what?", "Sending down rain", "A safe journey home", "Giving him a horse"]
  },
  "He ﷺ sometimes recited aloud in his night prayer.": {
    answer: "True",
    harder: "Aishah said in Tirmidhi 449 that at night he ﷺ would sometimes recite quietly and sometimes aloud."
  },
  // Abu Dawud 1332.
  "What did he ﷺ hear people doing in the masjid?": {
    answer: "Reciting the Quran aloud",
    harder: ["Abu Dawud 1332, from Abu Sa'id: in i'tikaf in the masjid, what did he ﷺ hear the people doing?", "Planning a long journey", "Building a new wall", "Teaching children to write"]
  },
  "Each one praying is calling whom quietly, he ﷺ said?": {
    answer: "His Lord",
    harder: ["Abu Dawud 1332: drawing back the curtain, he ﷺ said each one of you is calling quietly on whom?", "His father", "His friend", "His teacher"]
  },
  "We should not raise our voices over others when reciting.": {
    answer: "True",
    harder: "In Abu Dawud 1332 he ﷺ said let none of you raise his voice over another in recitation."
  },
  // Tirmidhi 594.
  "How did he ﷺ want masjids to be kept?": {
    answer: "Clean and scented",
    harder: ["Tirmidhi 594, from Aishah: he ﷺ ordered masjids built in the neighbourhoods, and kept how?", "Locked and empty", "Bare and dusty", "Dark and cold"]
  },
  "What does scented mean?": {
    answer: "Smelling sweet",
    harder: ["In Tirmidhi 594 masjids are to be clean and scented. What does scented mean?", "Staying cold", "Shining bright", "Standing tall"]
  },
  "He ﷺ ordered that masjids be kept clean and scented.": {
    answer: "True",
    harder: "Aishah told in Tirmidhi 594 that he ﷺ ordered masjids to be cleaned and scented."
  },
  // Bukhari 407.
  "What did he ﷺ do when he saw spit on the masjid wall?": {
    answer: "He scraped it off",
    harder: ["Bukhari 407, from Aishah: he ﷺ saw spit on the qiblah wall. What did he do?", "He painted over it", "He hung a cloth on it", "He asked for a new wall"]
  },
  "Which wall of the masjid was it on?": {
    answer: "The qiblah wall",
    harder: ["Bukhari 407: on which wall did he ﷺ see the spit he scraped off himself?", "The wall of the yard", "The back wall", "The wall by the door"]
  },
  "He ﷺ cleaned the masjid wall himself.": {
    answer: "True",
    harder: "In Bukhari 407 he ﷺ scraped the spit off the qiblah wall himself."
  },
  // Abu Dawud 466.
  "When did he ﷺ say these words of refuge?": {
    answer: "On entering the masjid",
    harder: ["Abu Dawud 466, from Abdullah ibn Amr: when did he ﷺ say A'udhu billahil-'Azim wa bi wajhihil-karim?", "On riding a camel", "On waking from sleep", "On finishing a meal"]
  },
  "How long is he kept safe from Shaytan, the hadith says?": {
    answer: "The rest of the day",
    harder: ["Abu Dawud 466: when one says it, Shaytan says 'he is kept from me' for how long?", "Only one minute", "Only one night", "Only one hour"]
  },
  "He ﷺ sought refuge in Allah from Shaytan when entering the masjid.": {
    answer: "True",
    harder: "In Abu Dawud 466 he ﷺ entered the masjid seeking refuge in Allah the Mighty from the accursed Shaytan."
  },
  // Ibn Majah 227.
  "For which good did he ﷺ want people to come to his masjid?": {
    answer: "To learn or to teach",
    harder: ["Ibn Majah 227, from Abu Hurairah: whoever comes to his ﷺ masjid only for what earns a great reward?", "To rest or to sleep", "To eat or to drink", "To buy or to sell"]
  },
  "Whose reward is it like, he ﷺ said?": {
    answer: "One who strives in Allah's cause",
    harder: ["Ibn Majah 227: coming to his ﷺ masjid to learn or teach puts one in the rank of whom?", "One who sails the sea", "One who builds a house", "One who sells in a market"]
  },
  "He ﷺ praised coming to his masjid to learn or to teach.": {
    answer: "True",
    harder: "Ibn Majah 227 likens the one who comes to his ﷺ masjid to learn or teach to one striving in Allah's cause."
  },
  // Muslim 568a.
  "What should you say to one calling for a lost thing in the masjid?": {
    answer: "May Allah not return it to you",
    harder: ["Muslim 568a, from Abu Hurairah: you hear a man calling out in the masjid for a lost thing. What should you say?", "May you find it very soon", "May Allah give you more", "May Allah reward your search"]
  },
  "Why not call out for lost things in the masjid?": {
    answer: "Masjids were not built for this",
    harder: ["Muslim 568a: what reason does the hadith give against calling out for lost things in the masjid?", "The masjid is too small", "The walls echo too loudly", "Lost things are never found"]
  },
  "Masjids were built for calling out about lost things.": {
    answer: "False",
    harder: "Muslim 568a says masjids were built for making lost things known."
  },
  // Tirmidhi 324.
  "What is a prayer in Masjid Quba like, he ﷺ said?": {
    answer: "An Umrah",
    harder: ["Tirmidhi 324, from Usaid ibn Zuhair: a prayer in Masjid Quba is like what, he ﷺ said?", "A night of Qadr", "A Hajj", "A month of fasting"]
  },
  "Where is Masjid Quba?": {
    answer: "Just outside Madinah",
    harder: ["Where is Masjid Quba, where he ﷺ stopped on the Hijrah (Tirmidhi 324)?", "Just outside Makkah", "Near Jerusalem", "Near Ta'if"]
  },
  "A prayer in Masjid Quba is like an Umrah.": {
    answer: "True",
    harder: "Usaid ibn Zuhair told in Tirmidhi 324 that he ﷺ said a prayer in Masjid Quba is like an Umrah."
  },
  // Abu Dawud 672.
  "Who are the best of you in prayer, he ﷺ said?": {
    answer: "Those with soft shoulders",
    harder: ["Abu Dawud 672, from Ibn Abbas: whom did he ﷺ call the best of you in the prayer?", "Those with long sleeves", "Those with new clothes", "Those with loud voices"]
  },
  "Where did he ﷺ say shoulders should be soft?": {
    answer: "In the prayer",
    harder: ["Abu Dawud 672: soft shoulders, easy to stand beside, are praised where?", "At the well", "In the market", "In the fields"]
  },
  "Being gentle and easy beside others in the row is good.": {
    answer: "True",
    harder: "In Abu Dawud 672 the best of you are those with the softest shoulders in prayer."
  },
  // Ibn Majah 996.
  "For which row did he ﷺ ask forgiveness three times?": {
    answer: "The first row",
    harder: ["Ibn Majah 996, from Al-Irbad ibn Sariyah: for which row did he ﷺ ask forgiveness three times?", "The last row", "The second row", "The middle row"]
  },
  "Did he ﷺ ask forgiveness for the second row too?": {
    answer: "Yes, but fewer times",
    harder: ["Ibn Majah 996: after three times for the first row, what about the second row?", "No, never", "Yes, ten times", "Yes, more times"]
  },
  "He ﷺ asked forgiveness for the first row more than the second.": {
    answer: "True",
    harder: "Al-Irbad told in Ibn Majah 996 that he ﷺ asked forgiveness three times for the first row and once for the second."
  },
  // Abu Dawud 560.
  "What does such a prayer equal, he ﷺ said?": {
    answer: "Fifty prayers",
    harder: ["Abu Dawud 560, from Abu Sa'id: a prayer in the open country, with ruku' and sujud done fully, equals how many?", "Ten prayers", "Two prayers", "Five prayers"]
  },
  "What must be done perfectly for this reward?": {
    answer: "The bowing and prostrations",
    harder: ["Abu Dawud 560: for a prayer in the wild to equal fifty, what must be done perfectly?", "The clothes for it", "The call to prayer", "The walk to it"]
  },
  "Bowing and prostrating perfectly raises the reward of a prayer.": {
    answer: "True",
    harder: "In Abu Dawud 560 the prayer in the wild reaches fifty when its ruku' and sujud are done perfectly."
  },
  // Abu Dawud 1289.
  "How many rak'ahs does Allah ask for at the start of the day?": {
    answer: "Four rak'ahs",
    harder: ["Abu Dawud 1289, a hadith qudsi from Nu'aym ibn Hammar: 'Son of Adam, do not be too weak to pray' how many rak'ahs early in the day?", "Two rak'ahs", "Six rak'ahs", "Ten rak'ahs"]
  },
  "What does Allah promise for those four rak'ahs?": {
    answer: "To supply your needs that day",
    harder: ["Abu Dawud 1289: for those four rak'ahs early in the day, what does Allah say He will do?", "To make you famous that day", "To bring you rain that day", "To give you gold that day"]
  },
  "Allah tells the son of Adam not to be too weak for these four rak'ahs.": {
    answer: "True",
    harder: "In the hadith qudsi of Abu Dawud 1289 Allah says: Son of Adam, do not fail to pray four rak'ahs early in the day."
  },
  // Tirmidhi 478.
  "What opens at that hour, he ﷺ said?": {
    answer: "The gates of heaven",
    harder: ["Tirmidhi 478, from Abdullah ibn as-Sa'ib: he ﷺ prayed four after the sun passed noon. What opens at that hour?", "The gates of the city", "The windows of the house", "The doors of the market"]
  },
  "What did he ﷺ love to have raised up at that hour?": {
    answer: "A righteous deed",
    harder: ["Tirmidhi 478: as the gates of heaven open after noon, what did he ﷺ love to have go up?", "A tall building", "A loud call", "A new flag"]
  },
  "He ﷺ prayed four rak'ahs after noon, before Zuhr.": {
    answer: "True",
    harder: "Abdullah ibn as-Sa'ib told in Tirmidhi 478 that he ﷺ prayed four rak'ahs after noon, before Zuhr."
  },
  // Tirmidhi 427.
  "What does Allah do for one who prays four before and after Zuhr?": {
    answer: "Makes the Fire forbidden for him",
    harder: ["Tirmidhi 427, from Umm Habibah: whoever keeps four rak'ahs before Zuhr and four after, what does Allah do?", "Makes his wealth grow", "Makes his name famous", "Makes his body strong"]
  },
  "How many rak'ahs in all does this promise take?": {
    answer: "Eight rak'ahs",
    harder: ["Tirmidhi 427: four before Zuhr and four after. How many rak'ahs is that in all?", "Six rak'ahs", "Ten rak'ahs", "Four rak'ahs"]
  },
  "Umm Habibah, a Mother of the Believers, told of this promise.": {
    answer: "True",
    harder: "Tirmidhi 427, on four rak'ahs before and after Zuhr, is told by Umm Habibah, a Mother of the Believers."
  },
  // Bukhari 1224.
  "After how many rak'ahs did he ﷺ rise without sitting?": {
    answer: "Two rak'ahs",
    harder: ["Bukhari 1224, from Abdullah ibn Buhaynah: in one prayer he ﷺ stood up without the first sitting. After how many rak'ahs?", "One rak'ah", "Three rak'ahs", "Four rak'ahs"]
  },
  "What did the people behind him ﷺ do?": {
    answer: "They stood up with him",
    harder: ["Bukhari 1224: when he ﷺ rose without sitting after two rak'ahs, what did the people behind him do?", "They went into sujud", "They went into ruku'", "They stayed sitting"]
  },
  "He ﷺ made two prostrations while sitting, near the end of that prayer.": {
    answer: "True",
    harder: "In Bukhari 1224, near the end of that prayer, he ﷺ made two sajdahs of sahw while sitting."
  },
  // Bukhari 401.
  "What did he ﷺ ask the people to do if he forgot?": {
    answer: "Remind him",
    harder: ["Bukhari 401, from Ibn Mas'ud: 'I am only human; I forget as you forget.' So what did he ﷺ ask them to do?", "Say nothing to him", "Pray it again later", "Wait for the next day"]
  },
  "Which way did he ﷺ face for the two prostrations?": {
    answer: "Toward the qiblah",
    harder: ["Bukhari 401: told of the change in the prayer, he ﷺ turned his legs and made two sajdahs facing which way?", "Toward the door", "Toward the minbar", "Toward the people"]
  },
  "He ﷺ said he is a human being who can forget.": {
    answer: "True",
    harder: "In Bukhari 401 he ﷺ said: I am a human being like you; I forget as you forget."
  },
  // Bukhari 1229.
  "What did Dhul-Yadayn ask him ﷺ after two rak'ahs?": {
    answer: "Was the prayer reduced, or did you forget?",
    harder: ["Bukhari 1229, from Abu Hurairah: he ﷺ ended a prayer after two rak'ahs. What did the man with long hands ask?", "Shall we pray again tomorrow?", "May I lead the next prayer?", "Why was the prayer so long?"]
  },
  "How many more rak'ahs did he ﷺ pray to complete it?": {
    answer: "Two rak'ahs",
    harder: ["Bukhari 1229: after Dhul-Yadayn spoke and the people agreed, how many rak'ahs did he ﷺ add?", "One rak'ah", "Three rak'ahs", "Four rak'ahs"]
  },
  "Abu Bakr and Umar were present at that prayer.": {
    answer: "True",
    harder: "Abu Hurairah told in Bukhari 1229 that among the people at that prayer were Abu Bakr and Umar."
  },
  // Bukhari 1232.
  "When does Shaytan come to make one forget the rak'ahs?": {
    answer: "When one stands to pray",
    harder: ["Bukhari 1232, from Abu Hurairah: when does Shaytan come and confuse a person until he does not know how much he prayed?", "When one plants a tree", "When one walks home", "When one greets a friend"]
  },
  "What should one do if Shaytan makes him forget the count?": {
    answer: "Make two prostrations while sitting",
    harder: ["Bukhari 1232: if one does not know how many rak'ahs he prayed, what did he ﷺ say to do?", "Pray the whole prayer twice", "Call the adhan again", "Leave the prayer at once"]
  },
  "Forgetting how many rak'ahs can come from Shaytan's doubts.": {
    answer: "True",
    harder: "Bukhari 1232 says Shaytan comes to the one praying and confuses him until he does not know how much he prayed."
  },
  // Abu Dawud 1024.
  "What should one in doubt do with that doubt?": {
    answer: "Throw it away",
    harder: ["Abu Dawud 1024, from Abu Sa'id: unsure whether he prayed three or four, what should he do with the doubt?", "Hold on to it", "Ask about it later", "Act upon it"]
  },
  "What are the two prostrations for Shaytan, he ﷺ said?": {
    answer: "A disgrace",
    harder: ["Abu Dawud 1024: if his prayer was complete after all, the two sajdahs are what for Shaytan?", "A victory", "A gift", "A reward"]
  },
  "If the prayer was already complete, the extra rak'ah is lost.": {
    answer: "False",
    harder: "Abu Dawud 1024 says that if the prayer was already complete, the rak'ah added on doubt goes to waste."
  },
  // Abu Dawud 1036.
  "If the imam remembers before standing straight up, what does he do?": {
    answer: "Sit back down",
    harder: ["Abu Dawud 1036, from Al-Mughirah: the imam rises after two rak'ahs and remembers before standing straight. What does he do?", "Keep standing", "Leave the prayer", "Start again"]
  },
  "If he is already fully up, what should he make instead?": {
    answer: "Two prostrations of forgetfulness",
    harder: ["Abu Dawud 1036: if the imam is already standing straight, he does not sit back. What does he make?", "Two extra rak'ahs", "Two more salams", "Two more adhans"]
  },
  "An imam who stood straight up should not sit back down.": {
    answer: "True",
    harder: "In Abu Dawud 1036 the imam who has stood fully up does not sit back, and makes two sajdahs of sahw."
  },
  // Bukhari 510.
  "What would the passer prefer, if he knew his sin?": {
    answer: "To wait instead",
    harder: ["Bukhari 510, from Abu Juhaim: if one passing in front of a person praying knew his sin, what would he prefer?", "To walk past slowly", "To pass by twice", "To run past quickly"]
  },
  "Someone is praying between you and the door. What fits his ﷺ words?": {
    answer: "Wait until he finishes",
    harder: ["Bukhari 510 says waiting would be better than passing. Someone prays between you and the door. What do you do?", "Step over his mat", "Walk right in front", "Run quickly past him"]
  },
  "Passing in front of someone who is praying is a small matter.": {
    answer: "False",
    harder: "In Bukhari 510 passing in front of one praying is light, so waiting brings no benefit."
  },
  // Bukhari 496.
  "How much room was between his ﷺ prayer place and the wall?": {
    answer: "Room for a sheep",
    harder: ["Bukhari 496, from Sahl ibn Sa'd: between his ﷺ musalla and the wall, there was room for what?", "Room for ten men", "Room for a camel", "Room for a horse"]
  },
  "He ﷺ prayed close to the wall in front of him.": {
    answer: "True",
    harder: "Sahl ibn Sa'd told in Bukhari 496 that between his ﷺ place of prayer and the wall was only room for a sheep to pass."
  },
  "You pray facing a wall at home. Where should you stand?": {
    answer: "Close to the wall",
    harder: ["In Bukhari 496 he ﷺ left only room for a sheep before the wall. Praying facing a wall at home, where do you stand?", "Far from the wall", "Across the room", "In the doorway"]
  },
  // Abu Dawud 695.
  "You put a bag in front of you as a sutrah. Where should you stand?": {
    answer: "Close to it",
    harder: ["Abu Dawud 695, from Sahl ibn Abi Hathmah: you pray facing a bag as your sutrah. Where should you be?", "Far from it", "Across the room", "Out in the hall"]
  },
  "Whom should you not let interrupt your prayer, he ﷺ said?": {
    answer: "Shaytan",
    harder: ["Abu Dawud 695: stay close to your sutrah, so who cannot cut into your prayer?", "The neighbors", "The angels", "The imam"]
  },
  "He ﷺ said not to let the devil interrupt the prayer.": {
    answer: "True",
    harder: "In Abu Dawud 695 he ﷺ said to stay close to the sutrah so Shaytan does not cut into the prayer."
  },
  // Bukhari 494.
  "What was planted in front of him ﷺ on Eid?": {
    answer: "A short spear",
    harder: ["Bukhari 494, from Ibn Umar: on the day of Eid, what was planted in front of him ﷺ as he prayed?", "A tall flag", "A wooden chair", "A stone pillar"]
  },
  "Where were the people as he ﷺ prayed facing it?": {
    answer: "Right behind him",
    harder: ["Bukhari 494: as he ﷺ prayed facing the harbah, where were the people?", "On the rooftops", "In front of him", "Beside the spear"]
  },
  "He ﷺ also used a sutrah like this on journeys.": {
    answer: "True",
    harder: "Ibn Umar said in Bukhari 494 that he ﷺ did the same with a short spear on journeys."
  },
  // Tirmidhi 335.
  "Something like what should be in front of you, he ﷺ said?": {
    answer: "The post of a camel saddle",
    harder: ["Tirmidhi 335, from Talhah: when you place something in front of you like what, then pray?", "The hump of a camel", "The rope of a camel", "The tail of a camel"]
  },
  "Once your sutrah is in front, whose passing need not worry you?": {
    answer: "Those beyond it",
    harder: ["Tirmidhi 335: with something like a saddle's back post before you, whose passing does not matter?", "Those right in front of you", "Those crossing your place", "Those between you and it"]
  },
  "With a sutrah in front, one need not mind who passes beyond it.": {
    answer: "True",
    harder: "In Tirmidhi 335 one need not mind whoever passes beyond the thing set in front like a saddle's post."
  },
  // Bukhari 507.
  "What did he ﷺ make sit across in front of him?": {
    answer: "His she-camel",
    harder: ["Bukhari 507, from Ibn Umar: what did he ﷺ make kneel crosswise in front of him and pray facing it?", "His mule", "His donkey", "His goat"]
  },
  "If the camel moved, what did he ﷺ pray facing?": {
    answer: "Its saddle",
    harder: ["Bukhari 507: when the riding animal was restless, what did he ﷺ take, set upright and pray facing?", "Its rope", "Its water bowl", "Its feed bag"]
  },
  "Ibn Umar used to do the same as he ﷺ did.": {
    answer: "True",
    harder: "In Bukhari 507 Ibn Umar, who told of it, also prayed facing his camel as a sutrah."
  },
  // Bukhari 666.
  "On what kind of night did Ibn Umar say: pray in your homes?": {
    answer: "A very cold, stormy night",
    harder: ["Bukhari 666: Ibn Umar called the adhan and added 'pray in your homes'. On what kind of night?", "A hot, still night", "A clear, warm night", "A calm, dry night"]
  },
  "Whom did he ﷺ tell to say: pray in your homes?": {
    answer: "The mu'adhdhin",
    harder: ["Bukhari 666: on cold, rainy nights on a journey, whom did he ﷺ tell to say 'pray where you are'?", "The traders", "The children", "The water carriers"]
  },
  "On very cold, rainy nights, people could pray in their homes.": {
    answer: "True",
    harder: "Ibn Umar told in Bukhari 666 that on cold or rainy nights he ﷺ had the caller say: pray where you are."
  },
  // Bukhari 901.
  "What did Ibn Abbas not want people to walk through?": {
    answer: "Mud and slush",
    harder: ["Bukhari 901: on a rainy Jumu'ah Ibn Abbas had the caller say 'pray in your houses'. What did he spare people?", "Sand and dust", "Thorns and stones", "Grass and leaves"]
  },
  "Who told his mu'adhdhin to say on a rainy day: pray in your houses?": {
    answer: "Ibn Abbas",
    harder: ["Bukhari 901: on a rainy Friday, who said 'one much better than me did this' after telling his caller to say 'pray in your houses'?", "Ibn Amr", "Ibn az-Zubayr", "Ibn Masud"]
  },
  "Ibn Abbas said one much better than he had done the same.": {
    answer: "True",
    harder: "In Bukhari 901 Ibn Abbas answered the people: this was done by one far better than me."
  },
  // Tirmidhi 409.
  "Where were they when the rain started?": {
    answer: "On a journey",
    harder: ["Tirmidhi 409, from Jabir: when rain fell and he ﷺ said 'whoever wishes may pray in his place', where were they?", "At a funeral", "At a wedding feast", "In the market"]
  },
  "On that journey, everyone had to pray together in the rain.": {
    answer: "False",
    harder: "In Tirmidhi 409 he ﷺ told everyone to come out and pray together in the rain."
  },
  "Who could pray in his place, he ﷺ said?": {
    answer: "Whoever wished",
    harder: ["Tirmidhi 409: rain fell on the journey. Who did he ﷺ say could pray in his own camp?", "Only the old men", "Only the sick men", "Only the young men"]
  },
  // Bukhari 906.
  "What weather made him ﷺ offer the prayer earlier?": {
    answer: "Very cold weather",
    harder: ["Bukhari 906, from Anas: in what weather did he ﷺ pray early, not waiting?", "Very dry weather", "Very hot weather", "Very windy weather"]
  },
  "In very cold weather, he ﷺ used to offer the prayer earlier.": {
    answer: "True",
    harder: "Anas told in Bukhari 906 that when it was very cold he ﷺ prayed early."
  },
  "Who told how he ﷺ prayed when it was very cold?": {
    answer: "Anas ibn Malik",
    harder: ["Bukhari 906: which Companion told that he prayed early when it was very cold?", "Sa'd ibn Abi Waqqas", "Ubayy ibn Ka'b", "Talhah ibn Ubaydullah"]
  },
  // Bukhari 1208.
  "Why could some not put their face on the earth?": {
    answer: "Because of the heat",
    harder: ["Bukhari 1208, from Anas: praying with him ﷺ, why could some of them not put their faces on the ground?", "Because of the rain", "Because of the cold", "Because of the mud"]
  },
  "Anas prayed with him ﷺ even in scorching heat.": {
    answer: "True",
    harder: "Anas said in Bukhari 1208 that they prayed with him ﷺ in such heat that some spread cloth to prostrate on."
  },
  "What did some spread on the hot earth to prostrate on?": {
    answer: "Their clothes",
    harder: ["Bukhari 1208: when one could not put his face on the scorching ground, what did he spread to prostrate on?", "Their saddle cloths", "Their water skins", "Their shields"]
  },
  // Abu Dawud 399.
  "What did Jabir cool in his hand to prostrate on?": {
    answer: "Stones",
    harder: ["Abu Dawud 399: praying noon with him ﷺ in great heat, what did Jabir take in his palm and cool?", "Bread", "Figs", "Dates"]
  },
  "Which prayer was Jabir praying when it was so hot?": {
    answer: "The noon prayer",
    harder: ["Abu Dawud 399: Jabir cooled pebbles in his hand for his forehead. At which prayer?", "The sunset prayer", "The dawn prayer", "The night prayer"]
  },
  "Jabir cooled the pebbles because of the intense heat.": {
    answer: "True",
    harder: "In Abu Dawud 399 Jabir held pebbles in his hand to cool them, then put them down to prostrate on in the heat."
  },
};
