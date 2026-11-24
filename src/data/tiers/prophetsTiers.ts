import type { TierEntry } from "../questionTiers";

/**
 * Harder versions for the Prophets topic (867 questions).
 * Each keeps the original answer and the lesson's own source.
 */
export const PROPHETS_TIERS: Record<string, TierEntry> = {
  // Quran 2:37.
  "Who was the first human?": { answer: "Adam", harder: ["Quran 2:37: he received words from his Lord and was forgiven. Who was the first human?", "Musa", "Nuh", "Ibrahim"] },
  "What did Allah make Adam from?": { answer: "Clay", harder: ["Iblis said in Quran 7:12: 'You created him from...' what?", "Fire", "Light", "Water"] },
  "Adam was the first angel, and Allah forgave his mistake.": { answer: "False", harder: "By Quran 2:37, Adam was an angel, and Allah did not accept his repentance." },
  // Quran 2:31.
  "Allah taught Adam the ____ of all things.": { answer: "names", harder: ["Quran 2:31: Allah taught Adam the ____ of all things, then showed them to the angels.", "games", "songs", "stories"] },
  "Allah taught Adam the names of all things.": { answer: "True", harder: "By Quran 2:31, Allah taught Adam the names, then showed them to the angels." },
  // Quran 2:30.
  "Who did Allah tell about the new creation first?": { answer: "The angels", harder: ["Quran 2:30: 'I will place a successor on earth.' Whom did Allah tell?", "The jinn", "The animals", "The mountains"] },
  "What did Allah answer the angels?": { answer: "I know what you do not know", harder: ["Quran 2:30: the angels asked about corruption. Allah's reply?", "Wait a year", "Ask Iblis", "You are right"] },
  "Adam was made to live on the earth as a successor.": { answer: "True", harder: "By Quran 2:30, Allah placed Adam on earth as a successor (khalifah)." },
  // Quran 15:29.
  "What did Allah breathe into Adam?": { answer: "A soul He created", harder: ["Quran 15:29: 'and breathed into him of...' what?", "Light only", "Nothing", "Fire"] },
  "How tall was Adam, in the hadith?": { answer: "Sixty cubits", harder: ["Bukhari 3326: Allah created Adam how tall?", "Six cubits", "Two cubits", "A thousand cubits"] },
  "Adam was shaped first, and then given his soul.": { answer: "True", harder: "By Quran 15:29, Allah first proportioned Adam, then breathed the soul into him." },
  // Sahih al-Bukhari 3326.
  "What did Adam say to the angels?": { answer: "As-salamu alaykum", harder: ["Bukhari 3326: 'go and greet those angels.' What did Adam say?", "Good morning", "Bismillah", "Allahu akbar"] },
  "What did the angels add to their reply?": { answer: "Wa rahmatullah", harder: ["Bukhari 3326: the angels answered 'as-salamu alayka' and added what?", "Wa barakatuh only", "Nothing", "Ahlan"] },
  "Whose greeting is the salam, as Allah told Adam?": { answer: "His and his children's", harder: ["Bukhari 3326: 'it is your greeting and...' whose?", "No one's", "Only the angels'", "Only kings'"] },
  // Quran 7:12.
  "Who refused to bow to Adam?": { answer: "Iblis", harder: ["Quran 7:12: 'what stopped you from prostrating?' Who was asked?", "Jibril", "Mika'il", "Every angel"] },
  "What was Iblis made from?": { answer: "Fire", harder: ["Quran 7:12: 'You created me from ____ and him from clay.' From what was Iblis made?", "Water", "Clay", "Light"] },
  "What was the real reason Iblis refused?": { answer: "Pride", harder: ["Quran 7:12: 'I am better than him.' What lay behind Iblis's refusal?", "He did not hear", "He was far away", "He was asleep"] },
  // Quran 2:35.
  "Where did Adam and his wife live at first?": { answer: "In Jannah", harder: ["Quran 2:35: 'O Adam, live with your wife in...' where?", "In Makkah", "On a ship", "In a cave"] },
  "What were they told to stay away from?": { answer: "One tree", harder: ["Quran 2:35: 'but do not come near...' what?", "A river", "A mountain", "Each other"] },
  "Who made them slip?": { answer: "Shaytan", harder: ["Quran 2:36: who made Adam and his wife slip from Jannah?", "Their children", "An angel", "A bird"] },
  // Quran 7:23.
  "What did Adam and his wife do after their mistake?": { answer: "Asked Allah to forgive them", harder: ["Quran 7:23: 'Our Lord, we have wronged ourselves.' What were they doing?", "Blamed Iblis", "Hid forever", "Said nothing"] },
  "Who accepts repentance, as Quran 2:37 says?": { answer: "Allah, the Merciful", harder: ["Quran 2:37: 'He is the Accepter of repentance, the...' who?", "Iblis", "No one", "The angels"] },
  "This dua teaches us to admit our mistakes to Allah.": { answer: "True", harder: "Quran 7:23 teaches us to say 'we have wronged ourselves' and ask Allah to forgive." },
  // Quran 2:38.
  "Where did Adam live after Jannah?": { answer: "On the earth", harder: ["Quran 2:38: 'go down from it, all of you.' Where did Adam live after?", "Under the sea", "In the sky", "On the moon"] },
  "What did Allah promise to send to people on earth?": { answer: "Guidance", harder: ["Quran 2:38: 'when ____ comes to you from Me.' What did Allah promise?", "Kings", "Wealth", "Armies"] },
  "Who will have no fear and no grief?": { answer: "Whoever follows Allah's guidance", harder: ["Quran 2:38: 'no fear and they will not grieve.' For whom?", "Whoever is rich", "Whoever is strong", "Everyone"] },
  // Quran 7:11.
  "Who is the father of all people?": { answer: "Adam", harder: ["Quran 7:11: the angels were told to prostrate to whom, the father of all people?", "Nuh", "Ibrahim", "Iblis"] },
  "Who do people go to first for help on the Day of Judgment?": { answer: "Adam", harder: ["On the Day of Judgment, people first go to whom, the father of mankind, for intercession?", "Isa", "Nuh", "Musa"] },
  "Adam was a prophet whom Allah spoke to.": { answer: "True", harder: "Quran 2:37 says Adam received words from his Lord, so Allah spoke to him." },
  // Quran 19:57.
  "What is Idris known for?": { answer: "Allah raised him to a high place.", harder: ["Quran 19:57: 'And We raised him to a high place.' Whom does this describe?", "He defeated Jalut, became a king, and received the Zabur.", "He helped his father Ibrahim build the Ka'bah.", "He called Bani Isra'il away from worshipping Ba'l."] },
  "Who is this? Allah raised him to a high place.": { answer: "Idris", harder: ["Quran 19:56-57: 'a man of truth and a prophet,' raised to a high place. Who?", "Yusha' ibn Nun", "Yahya", "Yunus"] },
  // Quran 19:56.
  "What does the Quran call Idris?": { answer: "A man of truth and a prophet", harder: ["Quran 19:56: 'Mention in the Book Idris. He was...' what?", "An angel", "A king", "A poet"] },
  "Where did Allah raise Idris?": { answer: "To a high place", harder: ["Quran 19:57: where did Allah raise Idris?", "To a mountain top", "Nowhere", "To a palace"] },
  "Quran 21:85 names Idris among the patient.": { answer: "True", harder: "Quran 21:85 names Ismail, Idris and Dhul-Kifl: all of them among the patient." },
  // Sahih al-Bukhari 3887.
  "In which heaven did the Prophet ﷺ meet Idris?": { answer: "The fourth", harder: ["Bukhari 3887: on the Mi'raj, in which heaven was Idris?", "The second", "The first", "The seventh"] },
  "What did Idris call him ﷺ?": { answer: "Pious brother and prophet", harder: ["Bukhari 3887: 'welcome, O...' what did Idris call him ﷺ?", "A stranger", "My king", "My son"] },
  "Who showed the Prophet ﷺ who Idris was?": { answer: "Jibril", harder: ["Bukhari 3887: 'this is Idris, greet him.' Who said it?", "Adam", "Musa", "Abu Bakr"] },
  // Quran 11:37.
  "What did Nuh build?": { answer: "The Ark", harder: ["Quran 11:37: 'build the ship under Our eyes.' What did Nuh build?", "A palace", "A tower", "A bridge"] },
  "How long did Nuh call his people to Allah?": { answer: "950 years", harder: ["Quran 29:14: he stayed among them 'a thousand years less fifty'. How long?", "9 years", "50 years", "1,000 years"] },
  "Nuh built the Ark and called people to idols, patiently.": { answer: "False", harder: "By Quran 11:37, Nuh built the ship under Allah's watch while calling to idols." },
  // Quran 11:40.
  "Allah told Nuh to take the animals in ____.": { answer: "pairs", harder: ["Quran 11:40: 'load on it two of every kind, a ____.'", "hundreds", "boxes", "herds"] },
  // Sahih al-Bukhari 4920.
  "Who were the idols of Nuh's people named after?": { answer: "Righteous men who had died", harder: ["Bukhari 4920: Wadd, Suwa', Yaghuth. Whom were the idols named after?", "Kings", "Stars", "Animals"] },
  "When did people start worshipping the statues?": { answer: "When knowledge was forgotten", harder: ["Bukhari 4920: the statues began to be worshipped when what happened?", "Never", "When Nuh asked", "Right away"] },
  "Which is a name of one of those idols?": { answer: "Wadd", harder: ["Bukhari 4920: which was one of the idols of Nuh's people?", "Al-Uzza", "Hubal", "Ba'l"] },
  // Quran 71:5.
  "When did Nuh call his people?": { answer: "Night and day", harder: ["Quran 71:5: 'I called my people...' when?", "Only on Fridays", "Once a year", "Only at night"] },
  "What did his people do when he called them?": { answer: "Put their fingers in their ears", harder: ["Quran 71:7: when Nuh called them, what did they do?", "Listened gladly", "Gave him gifts", "Made him king"] },
  "Nuh tried both public and secret calling.": { answer: "True", harder: "By Quran 71:8-9, Nuh called his people openly and in private." },
  // Quran 71:10.
  "What did Nuh tell his people to ask Allah for?": { answer: "Forgiveness", harder: ["Quran 71:10: 'ask ____ of your Lord; He is ever forgiving.' What?", "Gold", "A new king", "Revenge"] },
  "Which is a blessing Nuh promised for istighfar?": { answer: "Abundant rain", harder: ["Quran 71:11-12: which blessing did Nuh promise for istighfar?", "Kingship", "A long life", "Victory in war"] },
  "Asking forgiveness can bring good in this life too.": { answer: "True", harder: "By Quran 71:10-12, istighfar brings rain, wealth, children and gardens in this life." },
  // Quran 11:38.
  "What did the chiefs do when they passed Nuh?": { answer: "Mocked him", harder: ["Quran 11:38: whenever the chiefs passed Nuh, what did they do?", "Gave him wood", "Prayed with him", "Helped him"] },
  "What was Nuh building?": { answer: "A ship", harder: ["Quran 11:38: the chiefs passed by while Nuh was building what?", "A palace", "A tower", "A wall"] },
  "What was the ship made of, as Quran 54:13 says?": { answer: "Planks and nails", harder: ["Quran 54:13: 'We carried him on a thing of...' what?", "Stone", "Gold", "Reeds only"] },
  // Quran 54:11.
  "Where did the flood water come from?": { answer: "The sky and springs in the earth", harder: ["Quran 54:11-12: from where did the flood waters come?", "Only a river", "Only the sea", "A broken dam"] },
  "How big were the waves?": { answer: "Like mountains", harder: ["Quran 11:42: the ship sailed with them on waves like what?", "Like hills of sand", "There were none", "Like small ripples"] },
  "The ship sailed under Allah's watch.": { answer: "True", harder: "By Quran 54:14, the ship sailed under Allah's eyes." },
  // Quran 11:43.
  "Where did Nuh's son think he would be safe?": { answer: "On a mountain", harder: ["Quran 11:43: 'I will go to a ____ that will protect me.' Where did the son go?", "In the Ark", "In a cave", "In a city"] },
  "What did Nuh say protects that day?": { answer: "Only Allah's mercy", harder: ["Quran 11:43: 'nothing protects today from Allah's decree except...' what?", "Strong walls", "Good swimming", "High mountains"] },
  "Being a prophet's son was enough to be saved.": { answer: "False", harder: "By Quran 11:43, Nuh's son was saved from the flood because his father was a prophet." },
  // Quran 11:44.
  "Where did the Ark come to rest?": { answer: "On al-Judi", harder: ["Quran 11:44: where did the ship come to rest?", "In Makkah", "On Uhud", "On Sinai"] },
  "What was the earth told to do?": { answer: "Swallow its water", harder: ["Quran 11:44: 'O earth, ____ your water.' What was it told?", "Shake", "Grow trees", "Split open"] },
  "Who will witness for Nuh on the Day that he gave the message?": { answer: "Muhammad ﷺ and his ummah", harder: ["When Nuh is asked on the Day if he conveyed, who testifies for him?", "His son", "The angels only", "No one"] },
  // Quran 7:65.
  "Which people was Hud sent to?": { answer: "'Ad", harder: ["Quran 7:65: to whom did Allah send their brother Hud?", "Madyan", "Pharaoh's people", "Thamud"] },
  "What did Hud call them to?": { answer: "Worship Allah alone", harder: ["Quran 7:65: 'O my people, worship Allah; you have no god but Him.' What was Hud's call?", "Build towers", "Follow their king", "Leave their land"] },
  "The Quran calls Hud their brother.": { answer: "True", harder: "By Quran 7:65, the Quran calls Hud 'their brother'." },
  // Quran 46:21.
  "Where did Hud warn his people?": { answer: "Al-Ahqaf", harder: ["Quran 46:21: the brother of 'Ad warned his people where?", "Egypt", "Babylon", "Madyan"] },
  "Which surah is named after their land?": { answer: "Al-Ahqaf", harder: ["Quran 46:21 names al-Ahqaf. Which surah carries that name?", "Al-Kahf", "Hud", "Al-Hijr"] },
  "Hud feared a terrible day for his people.": { answer: "True", harder: "By Quran 46:21, Hud said: I fear for you the punishment of a terrible day." },
  // Quran 26:128.
  "What did 'Ad build on every high place?": { answer: "Landmarks to show off", harder: ["Quran 26:128: on every high place, what did 'Ad build?", "Schools", "Mosques", "Wells"] },
  "What did they act as if?": { answer: "They would live forever", harder: ["Quran 26:129: they took strongholds as if what?", "They were poor", "They were sick", "They were sorry"] },
  "Their strength made them proud instead of thankful.": { answer: "True", harder: "Quran 26:128-130 shows 'Ad's strength made them proud and harsh, not thankful." },
  // Quran 46:24.
  "What did 'Ad think the cloud was?": { answer: "Rain", harder: ["Quran 46:24: 'this cloud will bring us...' what?", "Smoke", "Birds", "An army"] },
  "How long did the wind blow?": { answer: "Seven nights and eight days", harder: ["Quran 69:7: the wind blew on 'Ad for how long?", "One hour", "Forty days", "Three nights"] },
  "Who did Allah save from the wind?": { answer: "Hud and the believers", harder: ["Quran 11:58: from the punishment of 'Ad, whom did Allah save?", "Only the strong", "The kings", "No one"] },
  // Sahih al-Bukhari 1035.
  "Which wind took 'Ad?": { answer: "The west wind", harder: ["Bukhari 1035: ad-dabur destroyed 'Ad. Which wind is that?", "No wind", "A warm breeze", "The east wind"] },
  "Which wind helped the Prophet ﷺ?": { answer: "The east wind", harder: ["Bukhari 1035: 'I was given victory by...' which wind?", "The west wind", "A storm at sea", "A sandstorm in Egypt"] },
  "When he ﷺ saw a dark cloud, he worried until it rained.": { answer: "True", harder: "When he ﷺ saw a dark cloud he worried, fearing it could be like the cloud of 'Ad." },
  // Quran 7:73.
  "Allah sent Salih's people a special ____ as a sign.": { answer: "camel", harder: ["Quran 7:73: 'this ____ of Allah is a sign for you.'", "horse", "bird", "cow"] },
  "Allah sent Salih's people a special camel as a sign.": { answer: "True", harder: "By Quran 7:73, Salih said the she-camel of Allah is a sign for Thamud." },
  // Quran 26:149.
  "What did Thamud carve from the mountains?": { answer: "Homes", harder: ["Quran 26:149: 'you carve ____ out of the mountains.' What?", "Wells", "Ships", "Idols only"] },
  "Who was sent to Thamud?": { answer: "Salih", harder: ["Quran 26:149 tells of homes carved in mountains. Which prophet was sent to them?", "Hud", "Lut", "Shu'ayb"] },
  "Their homes can still be seen at al-Hijr.": { answer: "True", harder: "Thamud's homes cut in rock still stand at al-Hijr, the land named in Quran 15:80." },
  // Quran 54:28.
  "How was the water shared with the she-camel?": { answer: "By turns", harder: ["Quran 54:28: 'the water is shared between them, each drink...' how?", "It was sold", "The camel got none", "The people got none"] },
  "What did Salih warn them not to do?": { answer: "Harm the camel", harder: ["Quran 7:73: 'let her eat on Allah's earth, and do not...' what?", "Pray", "Plant trees", "Feed the camel"] },
  "The she-camel was a sign from Allah.": { answer: "True", harder: "By Quran 54:27-28, Allah sent the she-camel as a trial and a sign." },
  // Quran 91:13.
  "Which surah tells this story at its end?": { answer: "Ash-Shams", harder: ["Quran 91:13: 'leave Allah's she-camel and her drink.' Which surah ends with this story?", "An-Nas", "Al-Fil", "Al-Ikhlas"] },
  "Who rose up to harm the camel?": { answer: "The worst of them", harder: ["Quran 91:12: 'when the most wretched of them...' what?", "A lion", "A child", "Salih"] },
  "The people then asked Salih to bring the punishment.": { answer: "True", harder: "By Quran 7:77, after harming her they told Salih: bring us what you threaten." },
  // Quran 11:65.
  "How many days were Thamud given?": { answer: "Three", harder: ["Quran 11:65: 'enjoy yourselves in your homes for...' how many days?", "One", "Seven", "Forty"] },
  "Who did Allah save?": { answer: "Salih and the believers", harder: ["Quran 11:66: when the command came, whom did Allah save?", "Only the camel", "The chiefs", "No one"] },
  "What took Thamud?": { answer: "A mighty blast", harder: ["Quran 11:67: what seized the wrongdoers of Thamud?", "A flood", "A wind", "A fire from a mountain"] },
  // Sahih al-Bukhari 433.
  "How should we pass places punished by Allah?": { answer: "Weeping and humble", harder: ["Bukhari 433: enter the places of those punished only how?", "Taking photos for fun", "Racing", "Laughing"] },
  "Which well did he ﷺ let them drink from?": { answer: "The she-camel's well", harder: ["At al-Hijr, which well did he ﷺ let them draw from?", "The chief's well", "Any well", "None at all"] },
  "What did they do with dough made from the other wells?": { answer: "Fed it to the camels", harder: ["At al-Hijr, dough made with water from the other wells was given to whom?", "Ate it", "Sold it", "Buried gold in it"] },
  // Quran 4:125.
  "What did Allah make Ibrahim?": { answer: "His close friend", harder: ["Quran 4:125: 'Allah took Ibrahim as a...' what?", "A king", "An angel", "A judge"] },
  "Who was Ibrahim's father?": { answer: "Azar", harder: ["Quran 6:74: 'when Ibrahim said to his father...' who?", "Imran", "Ya'qub", "Nuh"] },
  "Ismail and Ishaq were Ibrahim's sons.": { answer: "True", harder: "By Quran 14:39, Ibrahim thanked Allah for Ismail and Ishaq, given to him in old age." },
  // Quran 21:58.
  "Ibrahim broke the ____ and worshipped Allah alone.": { answer: "idols", harder: ["Quran 21:58: he broke them to pieces, all but the biggest. What?", "pots", "windows", "walls"] },
  "Ibrahim broke the windows and worshipped Allah alone.": { answer: "False", harder: "By Quran 21:58, Ibrahim broke every idol, including the biggest one." },
  // Quran 6:76.
  "What did Ibrahim see first that night?": { answer: "A star", harder: ["Quran 6:76: when night covered Ibrahim, what did he see first?", "The sun", "A fire", "A ship"] },
  "Why can't the sun be a lord?": { answer: "It sets and disappears", harder: ["Quran 6:78: Ibrahim saw the sun set too. Why can it not be a lord?", "It is too hot", "It is too small", "It is yellow"] },
  "Who did Ibrahim turn his face to?": { answer: "The Creator of the heavens and earth", harder: ["Quran 6:79: 'I have turned my face to...' whom?", "The king", "The moon", "His father's idols"] },
  // Quran 19:42.
  "How did Ibrahim speak to his father?": { answer: "Kindly: O my father", harder: ["Quran 19:42: how did Ibrahim address his father?", "With shouting", "He never spoke", "Rudely"] },
  "What could the idols not do?": { answer: "Hear, see or help", harder: ["Quran 19:42: 'why do you worship what does not...' what?", "Be carved", "Be carried", "Stand"] },
  "Even when his father threatened him, Ibrahim said: peace be on you.": { answer: "True", harder: "By Quran 19:46-47, when his father threatened to stone him, Ibrahim answered: peace be on you." },
  // Quran 21:63.
  "Which idol did Ibrahim leave whole?": { answer: "The biggest one", harder: ["Quran 21:58: Ibrahim broke the idols to pieces except which?", "The gold one", "The smallest", "None"] },
  "Why did he say: ask them?": { answer: "To show idols cannot speak", harder: ["Quran 21:63: 'so ask them, if they can speak.' Why did Ibrahim say it?", "He was scared", "He forgot", "He was joking"] },
  "His people admitted for a moment they were wrong.": { answer: "True", harder: "By Quran 21:64, they turned to themselves and said: you are the wrongdoers." },
  // Quran 21:69.
  "What did Allah tell the fire?": { answer: "Be cool and safe for Ibrahim", harder: ["Quran 21:69: 'O fire, be...' what?", "Burn hotter", "Go out forever", "Move away"] },
  "What did Ibrahim say when thrown in?": { answer: "Allah is enough for me", harder: ["Thrown into the fire, Ibrahim said 'hasbiyallahu'. What does it mean?", "Help me, idols", "Nothing", "I give up"] },
  "The fire harmed Ibrahim a little.": { answer: "False", harder: "By Quran 21:69, the fire stayed hot and burned Ibrahim a little." },
  // Quran 2:258.
  "What did Ibrahim ask the king to do?": { answer: "Bring the sun from the west", harder: ["Quran 2:258: 'Allah brings the sun from the east, so you...' what?", "Free the prisoners", "Make it rain", "Build a tower"] },
  "What happened to the king?": { answer: "He was speechless", harder: ["Quran 2:258: what became of the king who argued?", "He did it", "He became a prophet", "He laughed"] },
  "Why did the king argue?": { answer: "Allah gave him power and he grew proud", harder: ["Quran 2:258: he argued 'because Allah had given him...' what?", "He was poor", "He was a prophet", "He was lost"] },
  // Quran 2:260.
  "Why did Ibrahim ask this?": { answer: "So his heart could be at rest", harder: ["Quran 2:260: 'yes, but so that my heart...' what?", "To show off", "To test Allah", "He did not believe"] },
  "How many birds was he told to take?": { answer: "Four", harder: ["Quran 2:260: 'take ____ birds.' How many?", "Two", "Seven", "Ten"] },
  "When he called them, what did the birds do?": { answer: "Came flying to him", harder: ["Quran 2:260: 'call them; they will come to you...' how?", "Flew away", "Stayed still", "Turned to stone"] },
  // Quran 51:26.
  "What did Ibrahim serve his guests?": { answer: "A fat roasted calf", harder: ["Quran 11:69 and 51:26: what did Ibrahim bring his guests?", "Bread only", "Nothing", "Fish"] },
  "Who were the guests really?": { answer: "Angels", harder: ["Quran 51:31: 'what is your business, O messengers?' Who were the guests?", "Kings", "Traders", "His sons"] },
  "What good news did they bring?": { answer: "A knowledgeable son", harder: ["Quran 51:28: they gave him good news of what?", "Gold", "A palace", "Rain"] },
  // Quran 37:102.
  "What did the son say?": { answer: "Do as you are commanded", harder: ["Quran 37:102: 'O my father, ...you will find me, if Allah wills, of the patient.' His first words?", "Run away", "Never", "Ask someone else"] },
  "What did Allah give in his son's place?": { answer: "A great sacrifice", harder: ["Quran 37:107: 'We ransomed him with...' what?", "Gold", "A new house", "Another son"] },
  "Muslims remember this test at Eid al-Adha.": { answer: "True", harder: "Quran 37:102-107 is the story behind the Udhiyah sacrifice of Eid al-Adha." },
  // Quran 2:124.
  "What did Allah make Ibrahim after his tests?": { answer: "A leader for the people", harder: ["Quran 2:124: when Ibrahim fulfilled the commands, Allah made him what?", "A king of Egypt", "A sailor", "A rich trader"] },
  "In every prayer we ask Allah to bless Muhammad ﷺ as He blessed whom?": { answer: "Ibrahim and his family", harder: ["In the salah on the Prophet ﷺ we say 'as You blessed...' whom?", "Musa and Harun", "Nuh", "Adam"] },
  "Who is called to Hajj by Ibrahim's call?": { answer: "All people", harder: ["Quran 22:27: 'proclaim the Hajj among...' whom?", "Only kings", "Only his sons", "Only angels"] },
  // Quran 26:83.
  "What did Ibrahim ask for first in 26:83?": { answer: "Wisdom", harder: ["Quran 26:83: 'My Lord, grant me...' what first?", "A palace", "A big army", "Wealth"] },
  "Whom did Ibrahim ask to be joined with?": { answer: "The righteous", harder: ["Quran 26:83: 'and join me with...' whom?", "The kings", "The rich traders", "The poets"] },
  "Even a great prophet asked Allah for wisdom.": { answer: "True", harder: "Quran 26:83 shows Ibrahim, Khalil of Allah, still asking his Lord for wisdom." },
  // Quran 7:80-81.
  "Lut bravely told his people to stop doing ____.": { answer: "wrong", harder: ["Quran 7:80-81: Lut told his people to stop a shameful ____.", "homework", "chores", "game"] },
  "Lut bravely told his people to stop doing wrong.": { answer: "True", harder: "By Quran 7:80-81, Lut stood up and told his people to stop their shameful wrong." },
  // Quran 29:26.
  "Whose message did Lut believe?": { answer: "Ibrahim's", harder: ["Quran 29:26: 'Lut believed him.' Believed whom?", "Musa's", "Hud's", "Nuh's"] },
  "What did Ibrahim do then?": { answer: "Emigrated for Allah", harder: ["Quran 29:26: 'I am emigrating to my Lord.' Who said it?", "Built a ship", "Stayed home", "Became a king"] },
  "Allah later sent Lut as a prophet to a town of his own.": { answer: "True", harder: "Lut, who believed Ibrahim in Quran 29:26, was later sent as a messenger himself (Quran 37:133)." },
  // Quran 26:169.
  "Whom did Lut ask Allah to save?": { answer: "Himself and his family", harder: ["Quran 26:169: 'My Lord, save me and...' whom?", "Only his camels", "The chiefs of the town", "Only his guests"] },
  "Whom did Lut turn to when his people did wrong?": { answer: "His Lord, Allah", harder: ["Quran 26:169: when his people did wrong, Lut turned to whom?", "The chiefs of the town", "A strong army", "A faraway king"] },
  "Making du'a for your family is the way of the prophets.": { answer: "True", harder: "Quran 26:169 shows a prophet asking Allah to save him and his family." },
  // Quran 11:81.
  "Who were Lut's guests?": { answer: "Angels", harder: ["Quran 11:81: 'we are messengers of your Lord.' Who were Lut's guests?", "Traders", "Kings", "Shepherds"] },
  "When was Lut told to leave?": { answer: "In part of the night", harder: ["Quran 11:81: 'leave with your family in...' when?", "At noon", "After a year", "Never"] },
  "Lut's wife was saved with him.": { answer: "False", harder: "By Quran 11:81, Lut's wife left with him and was saved." },
  // Sahih al-Bukhari 3375.
  "What did Lut wish for when his people troubled him?": { answer: "A strong support", harder: ["Bukhari 3375: 'may Allah forgive Lut; he wished for...' what?", "A ship", "A palace", "A long sleep"] },
  "Who was really his strongest support?": { answer: "Allah", harder: ["Bukhari 3375: Lut wished for a strong support. Who truly was it?", "The king", "His tribe", "His wife"] },
  "The Prophet ﷺ spoke of Lut with mercy and love.": { answer: "True", harder: "In Bukhari 3375 he ﷺ begins 'may Allah forgive Lut', speaking of him with mercy." },
  // Quran 11:82.
  "What did Allah do to the town?": { answer: "Turned it upside down", harder: ["Quran 11:82: 'We turned the town...' how?", "Moved it to Egypt", "Flooded it", "Froze it"] },
  "What rained on it?": { answer: "Stones of baked clay", harder: ["Quran 11:82: 'and rained on it stones of...' what?", "Fire", "Hail", "Sand"] },
  "When did the punishment come?": { answer: "In the morning", harder: ["Quran 11:81: 'their appointed time is...' when?", "At midnight", "After a year", "At sunset"] },
  // Quran 7:85.
  "What is Shu'ayb known for?": { answer: "He was a prophet sent to the people of Madyan.", harder: ["Quran 7:85: 'to Madyan, their brother Shu'ayb.' What is Shu'ayb known for?", "He looked after Maryam and was the father of Yahya.", "He spoke with Allah and received the Tawrah.", "He helped Musa, then led Bani Isra'il into the Holy Land."] },
  "Who was a prophet sent to the people of Madyan?": { answer: "Shu'ayb", harder: ["Quran 7:85: 'to Madyan, their brother...' whom?", "Isa", "Ishaq", "Ismail"] },
  // Quran 11:85.
  "What did Madyan do wrong in trade?": { answer: "Cheated on measure and weight", harder: ["Quran 11:84-85: what did Madyan do wrong in trade?", "Gave too much", "Gave free food", "Traded only on Fridays"] },
  "What did Shu'ayb ask them to give?": { answer: "Full measure and weight", harder: ["Quran 11:85: 'O my people, give...' what?", "Their idols", "Their houses", "Half price"] },
  "Cheating people even a little is a wrong in Islam.": { answer: "True", harder: "By Quran 11:85, Shu'ayb told them: do not cheat people of their things." },
  // Quran 11:88.
  "What did Shu'ayb want?": { answer: "To set things right", harder: ["Quran 11:88: 'I only want ____ as far as I can.' What did Shu'ayb want?", "To take revenge", "To be king", "To get rich"] },
  "Where did Shu'ayb say his success comes from?": { answer: "Only from Allah", harder: ["Quran 11:88: 'my success is only through...' whom?", "From trade", "From the king", "From his family"] },
  "Shu'ayb did himself what he told others to do.": { answer: "True", harder: "By Quran 11:88, Shu'ayb did not go against what he forbade them." },
  // Quran 11:90.
  "What did Shu'ayb tell his people to ask their Lord for?": { answer: "Forgiveness", harder: ["Quran 11:90: 'ask ____ of your Lord, then turn to Him.' What?", "Gold", "Rain", "Kingship"] },
  "How did Shu'ayb describe his Lord in 11:90?": { answer: "Merciful and Loving", harder: ["Quran 11:90: 'my Lord is...' which two names?", "Mighty and Wise", "Hearing and Seeing", "Rich and Praised"] },
  "Allah loves those who turn back to Him.": { answer: "True", harder: "Quran 11:90 calls Allah al-Wadud, the Loving, to those who repent." },
  // Quran 7:88.
  "What did the chiefs threaten Shu'ayb with?": { answer: "Driving him out of town", harder: ["Quran 7:88: 'we will ____ you out of our town, O Shu'ayb.' What was the threat?", "Giving him gold", "Building him a house", "Making him king"] },
  "What did they want him to do?": { answer: "Return to their religion", harder: ["Quran 7:88: 'unless you ____ to our religion.' What did they demand?", "Teach them", "Lead their trade", "Leave Islam alone"] },
  "Shu'ayb put his trust in Allah when threatened.": { answer: "True", harder: "By Quran 7:89, Shu'ayb answered the threat: in Allah we put our trust." },
  // Quran 11:94.
  "How were Shu'ayb and the believers saved?": { answer: "By Allah's mercy", harder: ["Quran 11:94: 'We saved Shu'ayb and those who believed with him by...' what?", "By their wealth", "By a ship", "By running fast"] },
  "What did Shu'ayb say as he turned away?": { answer: "I gave you the message", harder: ["Quran 7:93: turning away from them, Shu'ayb said what?", "Nothing", "I will come back", "I am sorry"] },
  "Which prophets' peoples were both seized by a blast?": { answer: "Salih's and Shu'ayb's", harder: ["Quran 11:67 and 11:94: 'the blast seized those who did wrong.' Whose peoples?", "Nuh's and Hud's", "Musa's and Isa's", "Adam's and Idris's"] },
  // Quran 2:127.
  "Ismail helped his father Ibrahim build the ____.": { answer: "Ka'bah", harder: ["Quran 2:127: Ibrahim and Ismail raised the foundations of the ____.", "ark", "tower", "wall"] },
  "Ismail helped his father Ibrahim build the ark.": { answer: "False", harder: "By Quran 2:127, Ismail and Ibrahim raised the foundations of the ark." },
  // Quran 14:37.
  "Where did Ibrahim leave baby Ismail and his mother?": { answer: "A valley with no crops", harder: ["Quran 14:37: 'I have settled some of my children in...' what?", "A green garden", "A big city", "An island"] },
  "What did Ibrahim ask for people's hearts?": { answer: "To incline to them", harder: ["Quran 14:37: 'make people's hearts...' what?", "To fight them", "To fear them", "To forget them"] },
  "That valley became Makkah.": { answer: "True", harder: "Quran 14:37's 'valley without crops near Your sacred House' is Makkah." },
  // Sahih al-Bukhari 3364.
  "Which tribe settled near Zamzam?": { answer: "Jurhum", harder: ["Bukhari 3364: they saw birds over the water and asked Hajar to settle. Which tribe?", "Thamud", "'Ad", "Quraysh"] },
  "What did Ismail learn from them?": { answer: "Arabic", harder: ["Bukhari 3364: the child grew up among Jurhum and learned what?", "Sailing", "Farming wheat", "Greek"] },
  "How did they find the water?": { answer: "Birds circling over it", harder: ["Bukhari 3364: how did Jurhum know there was water?", "A map", "A dream", "Smoke"] },
  // Quran 2:127.
  "What did they ask while building?": { answer: "Our Lord, accept this from us", harder: ["Quran 2:127: building the House, what did they pray?", "Make us famous", "Make it gold", "Finish it fast"] },
  "Whose coming did they pray for in 2:129?": { answer: "A messenger from their children", harder: ["Quran 2:129: 'our Lord, raise up among them...' whom?", "A king", "An army", "Rain"] },
  "The Ka'bah was the first mosque built on earth.": { answer: "True", harder: "By Quran 3:96, the first House set up for people is the one at Bakkah." },
  // Quran 19:54.
  "What is Ismail praised for in Quran 19:54?": { answer: "Keeping his promise", harder: ["Quran 19:54: 'He was true to his...' what?", "His wealth", "His strength", "His poetry"] },
  "What did he tell his family to do?": { answer: "Pray and give zakah", harder: ["Quran 19:55: Ismail told his family to do what?", "Sleep early", "Trade more", "Travel"] },
  "Allah was pleased with Ismail.": { answer: "True", harder: "By Quran 19:55, Ismail was pleasing to his Lord." },
  // Sahih al-Bukhari 2899.
  "What was Ismail good at?": { answer: "Archery", harder: ["Bukhari 2899: 'your father was ____.' What was Ismail good at?", "Sailing", "Writing", "Farming"] },
  "Who did the Prophet ﷺ call children of Ismail?": { answer: "Arabs practicing archery", harder: ["Bukhari 2899: 'shoot, O children of Ismail.' Who was he speaking to?", "The Romans", "The Persians", "Angels"] },
  "The Prophet ﷺ himself was from Ismail's children.": { answer: "True", harder: "Bukhari 2899 calls the Arabs 'children of Ismail', and he ﷺ was from them." },
  // Quran 11:71.
  "Who was the father of Ishaq?": { answer: "Ibrahim", harder: ["Quran 11:71: Ibrahim's wife was given news of Ishaq. Who was Ishaq's father?", "Abdullah ibn Abd al-Muttalib", "Azar", "Dawud"] },
  "Who was the mother of Ishaq?": { answer: "Sarah", harder: ["Quran 11:71: 'his wife was standing, and she smiled.' Who was Ishaq's mother?", "Maryam", "Aminah bint Wahb", "Hajar"] },
  // Quran 12:18.
  "When Yusuf was lost, Ya'qub chose beautiful ____.": { answer: "patience", harder: ["Quran 12:18: 'so ____ is most fitting, and Allah's help is sought.'", "revenge", "anger", "silence"] },
  // Quran 11:71.
  "Who was given the good news of Ishaq?": { answer: "Sarah, Ibrahim's wife", harder: ["Quran 11:71: 'his wife was standing, and she smiled.' Who got the news?", "Maryam", "Asiyah", "Hajar"] },
  "Who would come after Ishaq, in the same good news?": { answer: "Ya'qub", harder: ["Quran 11:71: 'Ishaq, and after Ishaq...' whom?", "Musa", "Yunus", "Dawud"] },
  "Sarah was amazed because she and Ibrahim were old.": { answer: "True", harder: "By Quran 11:72, Sarah said: shall I bear a child while I am an old woman and my husband old?" },
  // Quran 37:112.
  "What was Ishaq, as Quran 37:112 says?": { answer: "A prophet from the righteous", harder: ["Quran 37:112: 'Ishaq, a prophet from among...' whom?", "A merchant only", "An angel", "A king of Egypt"] },
  "Whose son was Ishaq?": { answer: "Ibrahim's", harder: ["Quran 37:112: Ishaq was the good news given to whom?", "Nuh's", "Musa's", "Lut's"] },
  "Allah blessed both Ibrahim and Ishaq.": { answer: "True", harder: "By Quran 37:113, Allah blessed Ibrahim and Ishaq." },
  // Quran 19:49.
  "What did Ibrahim leave before this gift came?": { answer: "His people and their idols", harder: ["Quran 19:49: 'when he left them and...' what?", "His home in Jannah", "The Ka'bah", "His ship"] },
  "How many of Ishaq and Ya'qub were made prophets?": { answer: "Both of them", harder: ["Quran 19:49: 'and each of them We made a prophet.' How many?", "Only Ya'qub", "Neither", "Only Ishaq"] },
  "What is Ya'qub to Ibrahim?": { answer: "His grandson", harder: ["Quran 19:49: Ishaq and Ya'qub were given to Ibrahim. Ya'qub is his what?", "His uncle", "His brother", "His father"] },
  // Quran 38:45.
  "What two things does Quran 38:45 praise them for?": { answer: "Strength and vision", harder: ["Quran 38:45: 'people of...' which two?", "Height and speed", "Wealth and land", "Poems and songs"] },
  "What does Allah call them in that ayah?": { answer: "Our servants", harder: ["Quran 38:45: 'remember ____ Ibrahim, Ishaq and Ya'qub.'", "Our angels", "Our judges", "Our kings"] },
  "Muslims believe in Ishaq and Ya'qub as prophets.": { answer: "True", harder: "Quran 38:45 names Ibrahim, Ishaq and Ya'qub as Allah's servants, and Muslims believe in them as prophets." },
  // Quran 2:133.
  "What did Ya'qub ask his sons as he was dying?": { answer: "What will you worship after me?", harder: ["Quran 2:133: when death came to Ya'qub, he asked his sons what?", "Who is the eldest?", "Who gets my sheep?", "Where will you live?"] },
  "Which fathers did his sons name?": { answer: "Ibrahim, Ismail and Ishaq", harder: ["Quran 2:133: 'the God of your fathers...' whom?", "Nuh, Hud and Salih", "Musa and Harun", "Adam and Idris"] },
  "What did Ibrahim and Ya'qub tell their sons, in Quran 2:132?": { answer: "Do not die except as Muslims", harder: ["Quran 2:132: 'Allah has chosen this religion for you, so...' what?", "Build a big city", "Never travel", "Stay rich"] },
  // Quran 12:92.
  "Where did Yusuf's brothers throw him?": { answer: "Into a well", harder: ["Quran 12:15: they agreed to put Yusuf in the bottom of what?", "Into a fire", "Into the sea", "Into a cave"] },
  "Who was Yusuf's father?": { answer: "Ya'qub", harder: ["Quran 12:4: 'O my father, I saw eleven stars.' Who was Yusuf's father?", "Ibrahim", "Musa", "Ishaq"] },
  "Yusuf's brothers threw him in a well, and he never forgave them.": { answer: "False", harder: "By Quran 12:92, Yusuf told his brothers he would never forgive what they did." },
  // Quran 12:101.
  "Allah taught Yusuf to explain ____.": { answer: "dreams", harder: ["Quran 12:101: 'You taught me the meaning of ____.' What did Allah teach Yusuf?", "poems", "stars", "laws"] },
  // Sahih al-Bukhari 3390.
  "Who was Yusuf's great-grandfather?": { answer: "Ibrahim", harder: ["Bukhari 3390: 'the honorable, son of the honorable...' Who is the last father named in Yusuf's line?", "Nuh", "Adam", "Lut"] },
  "Who is the most honorable of people, the Prophet ﷺ said first?": { answer: "The one who fears Allah most", harder: ["Bukhari 3390: asked who is most honorable, what was the Prophet's ﷺ first answer?", "The tallest", "The oldest", "The richest"] },
  // Quran 12:4.
  "How many stars did Yusuf see in his dream?": { answer: "Eleven", harder: ["Quran 12:4: Yusuf saw the sun, the moon and how many stars bowing?", "Forty", "Seven", "Twelve"] },
  "What did Ya'qub tell him about the dream?": { answer: "Do not tell your brothers", harder: ["Quran 12:5: hearing Yusuf's dream, what did Ya'qub warn him?", "Write it down", "Forget it", "Tell everyone"] },
  "Who did Ya'qub warn is man's open enemy?": { answer: "Shaytan", harder: ["Quran 12:5: Ya'qub warned that the brothers might plot, because who is man's open enemy?", "The king", "The wolf", "The stars"] },
  // Quran 12:15.
  "Where did the brothers put Yusuf?": { answer: "At the bottom of a well", harder: ["Quran 12:15: the brothers all agreed to put Yusuf where?", "On a ship", "In a palace", "In a cave"] },
  "What did Allah tell Yusuf in the well?": { answer: "One day you will tell them of this", harder: ["Quran 12:15: while Yusuf was in the well, what did Allah inspire him?", "Fight them", "Stay here forever", "Run to Egypt"] },
  "Yusuf was alone in the well, without Allah's help.": { answer: "False", harder: "By Quran 12:15, Yusuf was left in the well and Allah sent him no inspiration." },
  // Quran 12:18.
  "What did the brothers bring back to Ya'qub?": { answer: "Yusuf's shirt with false blood", harder: ["Quran 12:18: what proof did the brothers bring Ya'qub?", "Nothing", "His sandals", "A letter"] },
  "What did Ya'qub choose?": { answer: "Beautiful patience", harder: ["Quran 12:18: 'your souls have tempted you.' What did Ya'qub say is most fitting?", "To give up", "Revenge", "Anger at his sons"] },
  "Whose help did Ya'qub seek?": { answer: "Allah's", harder: ["Quran 12:18: 'Allah is the one whose help is sought.' Whose help did Ya'qub seek?", "The king's", "His neighbors'", "No one's"] },
  // Quran 12:23.
  "What did Yusuf say when he was tempted?": { answer: "I seek refuge in Allah", harder: ["Quran 12:23: the doors were closed. What were Yusuf's first words?", "Nobody will know", "Let me think", "Maybe later"] },
  "Who did Yusuf say will never succeed?": { answer: "Wrongdoers", harder: ["Quran 12:23: Yusuf ended his answer: '...never succeed.' Who never succeeds?", "Travelers", "The poor", "Shepherds"] },
  "Yusuf turned to Allah to stay away from sin.": { answer: "True", harder: "By Quran 12:23, when tempted behind closed doors, Yusuf said: I seek refuge in Allah." },
  // Quran 12:33.
  "What did Yusuf prefer over sin?": { answer: "Prison", harder: ["Quran 12:33: 'my Lord, ____ is dearer to me than what they invite me to.' What?", "A new home", "Running away", "Gold"] },
  "Who did Yusuf ask to keep him safe from their plan?": { answer: "His Lord", harder: ["Quran 12:33: 'if You do not turn their plan away...' Whom was Yusuf asking?", "The king", "His brothers", "The guards"] },
  "What did the Prophet ﷺ say of Yusuf's long time in prison?": { answer: "He would have left sooner", harder: ["Speaking of Yusuf's long years in prison, what did the Prophet ﷺ say about himself?", "Yusuf was wrong", "It was short", "Nothing at all"] },
  // Quran 12:39.
  "Who did Yusuf call to Allah in prison?": { answer: "His two prison companions", harder: ["Quran 12:39: 'O my two ____, are many lords better, or Allah?' Whom did Yusuf address?", "The king", "His brothers", "The guards"] },
  "What did Yusuf teach before explaining their dreams?": { answer: "That Allah is One", harder: ["Quran 12:39-40: before explaining their dreams, what did Yusuf first teach?", "How to escape", "How to trade", "Poetry"] },
  "Yusuf stopped calling to Allah once he was in prison.": { answer: "False", harder: "By Quran 12:39, once in prison Yusuf stayed quiet about Allah to keep himself safe." },
  // Quran 12:47.
  "What ate the seven fat cows in the king's dream?": { answer: "Seven thin cows", harder: ["Quran 12:43: in the king's dream, what ate the seven fat cows?", "Seven birds", "A flood", "Seven lions"] },
  "What did Yusuf say to do with the harvest?": { answer: "Leave it stored in its ears", harder: ["Quran 12:47: 'leave what you harvest...' Where should it be left?", "Eat it at once", "Sell it all", "Burn it"] },
  "What job did Yusuf ask the king for?": { answer: "Over the storehouses", harder: ["Quran 12:55: 'Put me in charge of...' what did Yusuf ask the king?", "Army chief", "Royal poet", "Ship captain"] },
  // Quran 12:87.
  "Who did Ya'qub say loses hope in Allah's mercy?": { answer: "Disbelieving people", harder: ["Quran 12:87: 'Only ____ lose hope of Allah's mercy.' Who?", "Travelers", "Children", "Old people"] },
  "Who did Ya'qub complain to about his grief?": { answer: "Only to Allah", harder: ["Quran 12:86: 'I complain of my grief and sorrow...' to whom?", "To the king", "To everyone", "To no one, not even Allah"] },
  "Ya'qub kept hoping for years that Yusuf would return.": { answer: "True", harder: "By Quran 12:87, years later Ya'qub still sent his sons to search for Yusuf, not losing hope." },
  // Quran 12:92.
  "What did Yusuf say to the brothers who wronged him?": { answer: "No blame on you today", harder: ["Quran 12:92: Yusuf's first words to the brothers who wronged him?", "I will never forget", "You will pay", "Leave Egypt"] },
  "What did Yusuf send to make his father see again?": { answer: "His shirt", harder: ["Quran 12:93: 'Take this ____ and cast it over my father's face.' What?", "Medicine", "A letter", "Gold"] },
  "Yusuf had the power to punish them, yet he forgave.": { answer: "True", harder: "By Quran 12:92, Yusuf, now in power, told his brothers: no blame on you today." },
  // Quran 12:101.
  "What did the eleven stars stand for, as the story ends?": { answer: "His eleven brothers", harder: ["Quran 12:100: as the dream came true, who were the eleven stars?", "Eleven years", "Eleven cities", "Eleven kings"] },
  "In his last dua, how did Yusuf ask to die?": { answer: "As a Muslim", harder: ["Quran 12:101: 'Cause me to die as...' what did Yusuf ask?", "Far from home", "As a king", "As a rich man"] },
  "After all his power, Yusuf still asked to join the righteous.": { answer: "True", harder: "By Quran 12:101, Yusuf, given power, asked Allah to join him with the righteous." },
  // Quran 21:83-84.
  "What is Ayyub known for?": { answer: "He stayed patient through illness and loss, and Allah healed him.", harder: ["Quran 21:83-84: which story is Ayyub's?", "He was Ibrahim's nephew and a prophet sent to Sodom.", "He looked after Maryam and was the father of Yahya.", "He spoke with Allah and received the Tawrah."] },
  "Who stayed patient through illness and loss, and Allah healed him?": { answer: "Ayyub", harder: ["Quran 21:83-84: whose hardship did Allah remove, giving him back his family?", "Nuh", "Salih", "Musa"] },
  // Quran 21:83.
  "What did Ayyub say had touched him?": { answer: "Hardship", harder: ["Quran 21:83: 'Indeed, ____ has touched me.' What did Ayyub say?", "Wealth", "Pride", "Laziness"] },
  "What name of Allah did Ayyub call on?": { answer: "Most Merciful of the merciful", harder: ["Quran 21:83: Ayyub ended his call to his Lord with which name?", "The Avenger", "The King only", "None"] },
  "Ayyub turned to Allah in his hardship.": { answer: "True", harder: "By Quran 21:83, Ayyub called on his Lord when hardship touched him." },
  // Quran 38:42.
  "What was Ayyub told to strike?": { answer: "The ground, with his foot", harder: ["Quran 38:42: 'Strike with your foot...' what was Ayyub told to strike?", "A tree", "A rock, with a staff", "The sea"] },
  "What came out for him?": { answer: "Cool water to wash and drink", harder: ["Quran 38:42: what came out when Ayyub struck the ground?", "Gold", "Fire", "Bread"] },
  "What did Allah give back to Ayyub?": { answer: "His family, and as many again", harder: ["Quran 38:43: as a mercy, what did Allah give Ayyub?", "Only his house", "Nothing", "A kingdom"] },
  // Quran 38:44.
  "What did Allah find Ayyub to be?": { answer: "Patient", harder: ["Quran 38:44: 'We found him...' what did Allah find Ayyub?", "Angry", "Impatient", "Lazy"] },
  "What did Allah call him?": { answer: "An excellent servant", harder: ["Quran 38:44: 'What an excellent...' what did Allah call Ayyub?", "A poet", "A great king", "A rich man"] },
  "Ayyub's story is a reminder for worshippers.": { answer: "True", harder: "By Quran 21:84, Ayyub's healing is a mercy from Allah and a reminder for worshippers." },
  // Sahih al-Bukhari 279.
  "What fell on Ayyub after his cure?": { answer: "Golden locusts", harder: ["Bukhari 279: while Ayyub was bathing, what fell on him?", "Leaves", "Rain only", "Stones"] },
  "Why did Ayyub gather them, though he was rich?": { answer: "He always needs Allah's blessing", harder: ["Bukhari 279: 'have I not made you rich?' What was Ayyub's answer?", "To sell them", "To feed birds", "He was greedy"] },
  "Whose hadith tells this story?": { answer: "Abu Hurairah's", harder: ["Bukhari 279, the golden locusts of Ayyub: who narrated it?", "Aishah's", "Ibn Umar's", "Anas's"] },
  // Quran 21:85.
  "What is Dhul-Kifl known for?": { answer: "The Quran praises him as one of the patient.", harder: ["Quran 21:85: what does the Quran say of Dhul-Kifl?", "He was a prophet who confirmed that Isa would come.", "He spoke with Allah and received the Tawrah.", "He was Ibrahim's nephew and a prophet sent to Sodom."] },
  "Dhul-Kifl: The Quran praises him as one of the patient.": { answer: "True", harder: "By Quran 21:85, Dhul-Kifl is named with Ismail and Idris as one of the patient." },
  // Quran 37:139-148.
  "What is Yunus known for?": { answer: "He was swallowed by the whale, and his people repented.", harder: ["Quran 37:139-148: which story is Yunus's?", "He was the friend of Allah and built the Ka'bah with Ismail.", "He was the prophet who came after Ilyas.", "He was the son of Ibrahim and Sarah, and Ya'qub's father."] },
  "Who was the father of Yunus?": { answer: "Matta", harder: ["Bukhari: 'Yunus ibn ____.' Who was Yunus's father?", "Ibrahim", "Ishaq", "Dawud"] },
  // Quran 37:140.
  "Where did Yunus go when he left his people?": { answer: "Onto a loaded ship", harder: ["Quran 37:140: when Yunus ran away, where did he go?", "Up a mountain", "Into a palace", "Into a cave"] },
  "How did Yunus leave, as Quran 21:87 says?": { answer: "In anger", harder: ["Quran 21:87: 'when he went off...' how did Yunus leave?", "Laughing", "With the king", "With his whole town"] },
  "Yunus was one of Allah's messengers.": { answer: "True", harder: "By Quran 37:139, Yunus was one of the messengers." },
  // Quran 37:142.
  "What swallowed Yunus?": { answer: "A great fish", harder: ["Quran 37:142: 'Then the ____ swallowed him.' What swallowed Yunus?", "A storm cloud", "A lion", "The earth"] },
  "What was drawn on the ship?": { answer: "Lots", harder: ["Quran 37:141: on the loaded ship, what did they draw?", "Maps", "Pictures", "Swords"] },
  "What is Yunus called in Quran 21:87?": { answer: "The man of the fish", harder: ["Quran 21:87: 'Dhun-Nun' means what?", "The man of the cave", "The man of the ark", "The man of the well"] },
  // Quran 21:87.
  "Where did Yunus make his dua?": { answer: "In the darkness", harder: ["Quran 21:87: 'He called out in the ____.' Where was Yunus?", "On a mountain", "In a masjid", "In a palace"] },
  "What did Yunus admit in his dua?": { answer: "I have been a wrongdoer", harder: ["Quran 21:87: 'glory be to You; I have been...' what did Yunus admit?", "It was their fault", "Nothing", "I am the best"] },
  "Allah says He saves believers the same way.": { answer: "True", harder: "By Quran 21:88, as Allah saved Yunus from distress, so He saves the believers." },
  // Jami at-Tirmidhi 3505.
  "Who answers the Muslim who makes Yunus's dua?": { answer: "Allah", harder: ["Tirmidhi 3505: a Muslim calls with Dhun-Nun's dua for anything. Who answers him?", "The angels only", "No one", "His friends"] },
  "Which words begin the dua of Yunus?": { answer: "La ilaha illa anta", harder: ["Tirmidhi 3505: the dua of Dhun-Nun opens with which words?", "Allahu akbar", "Rabbana atina", "Bismillah"] },
  "Who narrated the hadith of Yunus's dua?": { answer: "Sa'd ibn Abi Waqqas", harder: ["Tirmidhi 3505, the dua of Dhun-Nun: who narrated it?", "Aishah", "Anas", "Abu Hurairah"] },
  // Quran 37:146.
  "Why was Yunus let out of the fish?": { answer: "He glorified Allah", harder: ["Quran 37:143-144: had he not been one who did what, Yunus would have stayed in the fish?", "He was strong", "The fish was full", "Sailors saved him"] },
  "What grew over him on the shore?": { answer: "A gourd plant", harder: ["Quran 37:146: what did Allah make grow over Yunus on the shore?", "A palm tree", "Roses", "Nothing"] },
  "How was Yunus when he reached the shore?": { answer: "Sick", harder: ["Quran 37:145: Yunus was cast on the open shore. How was he?", "Angry", "Rich", "Asleep for years"] },
  // Quran 10:98.
  "Which people were saved because they believed in time?": { answer: "The people of Yunus", harder: ["Quran 10:98: which town believed and was helped by its faith?", "The people of Nuh", "The people of Lut", "Pharaoh's people"] },
  "How many people was Yunus sent to?": { answer: "A hundred thousand or more", harder: ["Quran 37:147: to how many people was Yunus sent?", "Only his family", "Seven", "Only ten"] },
  "What did the Prophet ﷺ say about Yunus ibn Matta?": { answer: "None should say: I am better than him", harder: ["Bukhari: what did the Prophet ﷺ say of comparing himself to Yunus ibn Matta?", "He was a king", "He was not a prophet", "Forget his story"] },
  // Quran 4:164.
  "Who did Allah send Musa to?": { answer: "Pharaoh", harder: ["Quran 20:24: 'Go to ____, he has crossed all limits.' Whom was Musa sent to?", "Abu Lahab", "The people of 'Ad", "Namrud"] },
  "Which book did Allah give Musa?": { answer: "The Tawrah", harder: ["Quran 4:164 says Allah spoke to Musa. Which book was revealed to him?", "The Zabur", "The Injil", "The Suhuf of Ibrahim"] },
  "Allah spoke to Musa, and sent him to Pharaoh.": { answer: "True", harder: "By Quran 4:164, Allah spoke to Musa directly, and He sent him to Pharaoh." },
  // Quran 20:46.
  "Allah told Musa and Harun: ____ not, I am with you.": { answer: "fear", harder: ["Quran 20:46: '____ not, I am with you both; I hear and I see.'", "walk", "speak", "grieve"] },
  "Allah told Musa and Harun: fear not, I am with you.": { answer: "True", harder: "By Quran 20:46, Allah told Musa and Harun: fear not, I hear and I see." },
  // Quran 20:29-32.
  "Musa asked Allah to make his brother ____ his helper.": { answer: "Harun", harder: ["Quran 20:29-32: 'a helper from my family, ____ my brother.' Whom did Musa name?", "Yusuf", "Nuh", "Yusha"] },
  "Musa asked Allah to make his brother Yusuf his helper.": { answer: "False", harder: "By Quran 20:29-32, Musa asked for Yusuf from his family as his helper." },
  // Quran 28:7.
  "Where did Musa's mother put her baby?": { answer: "In the river", harder: ["Quran 28:7: 'when you fear for him, put him...' where?", "On a mountain", "In a well", "In a cave"] },
  "What two things did Allah promise her?": { answer: "Return him and make him a messenger", harder: ["Quran 28:7: Allah promised Musa's mother two things. What?", "Gold and land", "A palace", "Nothing"] },
  "Allah told her not to fear and not to grieve.": { answer: "True", harder: "By Quran 28:7, Allah told Musa's mother: do not fear and do not grieve." },
  // Quran 28:13.
  "Who nursed Musa in the end?": { answer: "His own mother", harder: ["Quran 28:12-13: refusing all other nurses, who nursed Musa?", "Pharaoh", "A stranger", "No one"] },
  "What did his mother learn from this?": { answer: "Allah's promise is true", harder: ["Quran 28:13: Musa came back so his mother would know what?", "Kings are kind", "Nothing", "Rivers are safe"] },
  "Musa grew up in the house of Pharaoh.": { answer: "True", harder: "By Quran 28:8-9, Pharaoh's family took Musa in, and he grew up in their house." },
  // Quran 28:16.
  "What did Musa do after his mistake?": { answer: "Asked Allah to forgive him", harder: ["Quran 28:16: 'I have wronged myself.' What did Musa then ask?", "Bragged", "Hid it", "Blamed others"] },
  "What did Allah do?": { answer: "He forgave him", harder: ["Quran 28:16: after Musa asked, what did Allah do?", "Sent him away", "Nothing", "Ignored him"] },
  "Musa called the fight the work of Shaytan.": { answer: "True", harder: "By Quran 28:15, Musa said of the fight: this is from the work of Shaytan." },
  // Quran 28:24.
  "How did Musa help the two women?": { answer: "He watered their flock", harder: ["Quran 28:24: at the water of Madyan, how did Musa help the two women?", "He gave them gold", "He sold their sheep", "He built them a house"] },
  "What did Musa say in the shade?": { answer: "My Lord, I am in need", harder: ["Quran 28:24: back in the shade, what did Musa say to his Lord?", "I am rich", "I am tired of this", "Nobody helps me"] },
  "Why did the woman say her father should hire Musa?": { answer: "He was strong and trustworthy", harder: ["Quran 28:26: 'the best one to hire is...' why did she say so?", "He was rich", "He was famous", "He was a prince"] },
  // Quran 20:14.
  "What was Musa told to take off?": { answer: "His sandals", harder: ["Quran 20:12: 'you are in the sacred valley.' What was Musa told to remove?", "His cloak", "His ring", "His turban"] },
  "What was the valley called?": { answer: "Tuwa", harder: ["Quran 20:12: what is the sacred valley called?", "Uhud", "Arafah", "Badr"] },
  "Why does Allah say to pray, in Quran 20:14?": { answer: "To remember Him", harder: ["Quran 20:14: 'establish prayer for...' what?", "To get rich", "To be seen", "To rest"] },
  // Quran 20:20.
  "What did Musa use his staff for at first?": { answer: "Leaning and his sheep", harder: ["Quran 20:18: 'I lean on it and beat down leaves for...' what did Musa use his staff for?", "Fishing", "Writing", "Fighting"] },
  "What did the staff become when thrown?": { answer: "A moving snake", harder: ["Quran 20:20: Musa threw down his staff. What did it become?", "Gold", "A tree", "A bird"] },
  "What was the second sign Allah gave?": { answer: "His hand came out white", harder: ["Quran 20:22: 'press your hand to your side...' what was the second sign?", "He could fly", "Rain fell", "A star moved"] },
  // Quran 20:25.
  "What did Musa ask Allah to untie?": { answer: "The knot from his tongue", harder: ["Quran 20:27: after his chest and his task, what did Musa ask Allah to untie?", "His sandals", "A rope", "A boat"] },
  "Whom did Musa ask for as his helper?": { answer: "His brother Harun", harder: ["Quran 20:29-30: 'a helper from my family...' whom did Musa name?", "His father", "Pharaoh", "Al-Khidr"] },
  "Muslims still say this dua before hard tasks.": { answer: "True", harder: "Quran 20:25-28, 'my Lord, expand my chest', is a dua Muslims still say before hard tasks." },
  // Quran 19:53.
  "Who was Harun to Musa?": { answer: "His brother", harder: ["Quran 19:53: 'We gave him his ____ Harun as a prophet.' Who was Harun to Musa?", "His son", "His uncle", "His teacher"] },
  "Why did Allah give Musa Harun as a prophet?": { answer: "Out of His mercy", harder: ["Quran 19:53: 'Out of Our ____ We gave him Harun.' Why did Allah give him Harun?", "Harun asked for it", "By chance", "For money"] },
  "Allah spoke to Musa directly.": { answer: "True", harder: "By Quran 4:164 and 19:52, Allah called Musa and spoke to him directly." },
  // Quran 20:44.
  "How were Musa and Harun told to speak to Pharaoh?": { answer: "Gently", harder: ["Quran 20:44: 'speak to him with ____ words.' How were Musa and Harun told to speak to Pharaoh?", "Loudly", "Rudely", "Not at all"] },
  "Why speak gently?": { answer: "So he might remember Allah", harder: ["Quran 20:44: 'so perhaps he may...' why were they to speak gently?", "To get gifts", "To trick him", "To be famous"] },
  "Pharaoh had gone beyond all limits.": { answer: "True", harder: "By Quran 20:43, Allah told Musa and Harun: go to Pharaoh, for he has crossed all limits." },
  // Quran 7:121.
  "What did the magicians do when they saw the sign?": { answer: "Fell in prostration to Allah", harder: ["Quran 7:120: after the staff swallowed their tricks, what did the magicians do?", "Ran away", "Laughed", "Attacked Musa"] },
  "Whom did they believe in?": { answer: "The Lord of Musa and Harun", harder: ["Quran 7:121-122: 'we believe in the Lord of the worlds, the Lord of...' whom?", "No one", "Pharaoh", "Their idols"] },
  "The magicians came as Pharaoh's helpers but became believers.": { answer: "True", harder: "By Quran 7:113-121, the magicians came to win for Pharaoh, then fell in prostration and believed." },
  // Quran 26:62.
  "What did Musa's people fear at the sea?": { answer: "Being caught", harder: ["Quran 26:61: 'we will surely be overtaken!' What did Musa's people fear at the sea?", "The waves", "Rain", "Hunger"] },
  "What did Musa strike the sea with?": { answer: "His staff", harder: ["Quran 26:63: 'strike the sea with your...' what?", "His hand", "A sword", "A stone"] },
  "What did each part of the split sea look like?": { answer: "A great mountain", harder: ["Quran 26:63: the sea split. Each part was like what?", "A small stream", "A cloud", "A bridge"] },
  // Sahih al-Bukhari 3397.
  "What happened on the day of Ashura?": { answer: "Allah saved Musa", harder: ["Bukhari 3397: what did the people of Madinah say happened on Ashura?", "Yusuf left prison", "Adam was made", "Nuh's ark landed"] },
  "Why did Musa fast that day?": { answer: "To thank Allah", harder: ["Bukhari 3397: why did Musa fast the day of Ashura?", "For a contest", "He was sick", "He was lost"] },
  "What did the Prophet ﷺ say about Musa?": { answer: "I am closer to Musa", harder: ["Bukhari 3397: hearing of Musa's fast, what did the Prophet ﷺ say?", "Musa was wrong", "Forget Musa", "Nothing"] },
  // Quran 10:90.
  "When did Pharaoh say he believed?": { answer: "When he was drowning", harder: ["Quran 10:90: 'I believe there is no god but He...' when did Pharaoh say it?", "Never", "As a child", "At the start"] },
  "Was his belief accepted then?": { answer: "No, it was too late", harder: ["Quran 10:91: 'Now? When you disobeyed before?' Was Pharaoh's belief accepted?", "Only half", "It was delayed", "Yes, fully"] },
  "What did Allah keep as a sign for later people?": { answer: "Pharaoh's body", harder: ["Quran 10:92: 'Today We save you in your...' what did Allah keep as a sign?", "His crown", "His palace", "His army"] },
  // Quran 2:60.
  "How many springs came from the rock?": { answer: "Twelve", harder: ["Quran 2:60: Musa struck the rock. How many springs gushed out?", "Three", "Forty", "Seven"] },
  "What did Musa strike the rock with?": { answer: "His staff", harder: ["Quran 2:60: 'strike the rock with your...' what?", "His foot", "A hammer", "His hand"] },
  "What did Allah also send down in the desert, in Quran 2:57?": { answer: "Manna and quails", harder: ["Quran 2:57: Allah shaded them with clouds and sent down what?", "Gold coins", "Bread from Egypt", "Nothing"] },
  // Quran 7:143.
  "What did Musa ask Allah?": { answer: "To see Him", harder: ["Quran 7:143: 'my Lord, show Yourself to me.' What did Musa ask?", "To fly", "For gold", "For a kingdom"] },
  "What happened to the mountain?": { answer: "It was made level", harder: ["Quran 7:143: when his Lord appeared to the mountain, what happened to it?", "It grew", "It moved away", "Nothing"] },
  "How long was Musa's appointment with Allah?": { answer: "Forty nights", harder: ["Quran 7:142: thirty nights, completed with ten more. How long was Musa's appointment?", "Seven days", "One year", "One night"] },
  // Quran 7:145.
  "What did Allah write the guidance on?": { answer: "Tablets", harder: ["Quran 7:145: 'advice and details of all things.' What did Allah write it on?", "Paper scrolls", "Sand", "Leaves"] },
  "How was Musa told to take them?": { answer: "Firmly", harder: ["Quran 7:145: 'hold them ____.' How was Musa told to take the Tablets?", "Secretly", "Later", "Lightly"] },
  "Who led the people while Musa was away?": { answer: "Harun", harder: ["Quran 7:142: 'take my place among my people.' Whom did Musa leave in charge?", "Qarun", "Pharaoh", "Al-Khidr"] },
  // Quran 20:88.
  "Who made the calf, as Surah Ta-Ha names him?": { answer: "As-Samiri", harder: ["Quran 20:85-88: who led the people astray with the calf?", "Harun", "Qarun", "Pharaoh"] },
  "What sound did the calf make?": { answer: "A lowing sound", harder: ["Quran 20:88: 'a body that made a...' what sound came from the calf?", "No sound at all", "Music", "Words"] },
  "A calf that cannot speak or help is not a god.": { answer: "True", harder: "By Quran 20:89, the calf could not answer them, nor harm or help them, so it was no god." },
  // Quran 18:66.
  "Why did Musa follow al-Khidr?": { answer: "To learn from him", harder: ["Quran 18:66: 'so that you teach me some of the right guidance.' Why did Musa follow al-Khidr?", "To sell him sheep", "To fight him", "To find gold"] },
  "Why did al-Khidr damage the boat?": { answer: "A king seized good boats", harder: ["Quran 18:79: why did al-Khidr make a hole in the boat?", "For fun", "He disliked boats", "By mistake"] },
  "Whose treasure was under the wall?": { answer: "Two orphan boys'", harder: ["Quran 18:82: the wall in the town hid whose treasure?", "Musa's", "Al-Khidr's", "The king's"] },
  // Quran 5:26.
  "What did the people tell Musa about the Holy Land?": { answer: "Go, you and your Lord", harder: ["Quran 5:24: refusing to enter the Holy Land, what did the people tell Musa?", "We are ready", "Let us pray", "Thank you"] },
  "How long did they wander?": { answer: "Forty years", harder: ["Quran 5:26: 'forbidden to them for ____; they will wander.' How long?", "Four years", "Forty days", "A hundred years"] },
  "What did the two believing men tell them?": { answer: "Enter, and rely on Allah", harder: ["Quran 5:23: what did the two God-fearing men tell the people?", "Wait forever", "Go back to Egypt", "Give up"] },
  // Quran 28:81.
  "Whose people was Qarun from?": { answer: "Musa's people", harder: ["Quran 28:76: 'Qarun was from the people of...' whom?", "Nuh's people", "The jinn", "Romans"] },
  "How heavy were Qarun's keys?": { answer: "Too heavy for strong men", harder: ["Quran 28:76: how heavy were the keys of Qarun's treasures?", "Light as feathers", "One small key", "He had none"] },
  "What happened to Qarun and his home?": { answer: "The earth swallowed them", harder: ["Quran 28:81: 'We made the earth swallow...' what happened to Qarun?", "Nothing", "A flood came", "He became king"] },
  // Sahih al-Bukhari 3405.
  "What did the Prophet ﷺ remember when he was hurt by words?": { answer: "Musa's patience", harder: ["Bukhari 3405: a man called a share unfair. Whose patience did the Prophet ﷺ remember?", "Yusuf's dream", "Nuh's ark", "Pharaoh's army"] },
  "What did Musa urge on the Night Journey?": { answer: "Ask for fewer prayers", harder: ["Bukhari 3405 and the Night Journey: what did Musa keep urging the Prophet ﷺ?", "Go home", "Pray more", "Stay in heaven"] },
  "Musa was hurt by his own people and kept patient.": { answer: "True", harder: "By Bukhari 3405, Musa was hurt by his own people more than this, and he stayed patient." },
  // Sahih al-Bukhari 3401.
  "What is Yusha' ibn Nun known for?": { answer: "He helped Musa, then led Bani Isra'il into the Holy Land.", harder: ["Bukhari 3401: which story is that of Yusha' ibn Nun?", "He spoke with Allah and received the Tawrah.", "He was Ibrahim's nephew and a prophet sent to Sodom.", "He was a prophet who confirmed that Isa would come."] },
  "Who was the father of Yusha' ibn Nun?": { answer: "Nun", harder: ["Bukhari 3401: 'Yusha' ibn ____.' Who was his father?", "Ya'qub", "Zakariyya", "Abdullah ibn Abd al-Muttalib"] },
  // Sahih al-Bukhari 3401.
  "Who travelled with Musa to meet al-Khidr?": { answer: "Yusha' ibn Nun", harder: ["Bukhari 3401: who was the young helper who set out with Musa?", "Harun", "Qarun", "Pharaoh"] },
  "What did they carry in a basket?": { answer: "A fish", harder: ["Bukhari 3401: what did Musa take in a basket for the journey?", "A lamp", "Bread", "Gold"] },
  "Where were they heading?": { answer: "Where the two seas meet", harder: ["Quran 18:60: 'until I reach...' where was Musa heading?", "To Makkah", "To a mountain", "To Egypt"] },
  // Quran 18:63.
  "What did the fish do at the rock?": { answer: "Slipped into the sea", harder: ["Quran 18:63: at the rock, what did the fish do?", "Flew away", "Was eaten", "Turned to gold"] },
  "Who did Yusha' say made him forget?": { answer: "Shaytan", harder: ["Quran 18:63: 'none made me forget it except...' whom?", "A bird", "Musa", "The fish"] },
  "The place the fish was lost was where they would find al-Khidr.": { answer: "True", harder: "By Quran 18:64, the spot where the fish was lost was what they sought, and there they found al-Khidr." },
  // Quran 37:123-125.
  "What is Ilyas known for?": { answer: "He called Bani Isra'il away from worshipping Ba'l.", harder: ["Quran 37:123-125: which story is that of Ilyas?", "He is the last messenger Allah sent.", "He explained dreams and became a minister of Egypt.", "He helped his father Ibrahim build the Ka'bah."] },
  "Who called Bani Isra'il away from worshipping Ba'l?": { answer: "Ilyas", harder: ["Quran 37:125: 'do you call on Ba'l?' Which prophet asked this?", "Dawud", "Harun", "Hud"] },
  // Tabaqat Ibn Sa'd 1/46.
  "What is Al-Yasa' known for?": { answer: "He was the prophet who came after Ilyas.", harder: ["Tabaqat Ibn Sa'd 1/46: what is Al-Yasa' known for?", "He helped Musa, then led Bani Isra'il into the Holy Land.", "He is the last messenger Allah sent.", "He explained dreams and became a minister of Egypt."] },
  "Who was the prophet who came after Ilyas?": { answer: "Al-Yasa'", harder: ["Tabaqat Ibn Sa'd 1/46: which prophet came after Ilyas?", "Dawud", "Yusuf", "Adam"] },
  // Quran 37:123.
  "What was Ilyas, as Quran 37:123 says?": { answer: "One of the messengers", harder: ["Quran 37:123: 'Ilyas was one of...' what?", "A king", "A magician", "An angel"] },
  "What did Ilyas ask his people?": { answer: "Will you not fear Allah?", harder: ["Quran 37:124: Ilyas first asked his people what?", "Will you pay me?", "Where is the king?", "Who is strongest?"] },
  "Ilyas called his people back to Allah alone.": { answer: "True", harder: "By Quran 37:124-126, Ilyas told his people to leave Ba'l and fear Allah, their Lord." },
  // Quran 37:125.
  "What was the name of the idol of Ilyas's people?": { answer: "Ba'l", harder: ["Quran 37:125: which idol did Ilyas's people call on?", "Al-Lat", "Wadd", "Hubal"] },
  "What does Ilyas call Allah in Quran 37:125?": { answer: "The Best of creators", harder: ["Quran 37:125: 'and leave the ____ of creators.' What did Ilyas call Allah?", "The god of the sea", "One of many", "The sun"] },
  "Whose Lord did Ilyas say Allah is?": { answer: "Theirs and their forefathers'", harder: ["Quran 37:126: 'your Lord and the Lord of...' whose Lord did Ilyas say Allah is?", "Only the king's", "Only his", "No one's"] },
  // Quran 37:130.
  "What does Allah send upon Ilyas in Quran 37:130?": { answer: "Peace", harder: ["Quran 37:130: 'Salamun ala Ilyasin.' What does Allah send upon Ilyas?", "Wealth", "Anger", "A storm"] },
  "What kind of servant was Ilyas?": { answer: "A believing servant", harder: ["Quran 37:132: 'He was one of Our...' what kind of servants?", "A runaway", "A lazy servant", "A king's servant"] },
  "Allah rewards those who do good like this.": { answer: "True", harder: "By Quran 37:131, Allah says: this is how We reward those who do good." },
  // Quran 38:48.
  "How does Quran 38:48 describe Al-Yasa'?": { answer: "Among the best", harder: ["Quran 38:48: 'each of them was among the...' what?", "Among the losers", "A tyrant", "Unknown"] },
  "Who is named with Al-Yasa' in Quran 38:48?": { answer: "Ismail and Dhul-Kifl", harder: ["Quran 38:48: who are named with Al-Yasa'?", "Pharaoh and Haman", "Qarun", "Iblis"] },
  "In Quran 6:86, Allah preferred Al-Yasa' over the worlds.": { answer: "True", harder: "By Quran 6:86, Ismail, Al-Yasa', Yunus and Lut were each preferred over the worlds." },
  // Quran 38:26.
  "Dawud was a prophet and a ____ who judged fairly.": { answer: "king", harder: ["Quran 38:26: 'We made you a leader on earth, so judge.' Dawud was a prophet and a ____.", "farmer", "sailor", "scribe"] },
  "Dawud was a prophet and a king who judged fairly.": { answer: "True", harder: "By Quran 38:26, Allah made Dawud a leader on earth and told him to judge with truth." },
  // Quran 2:251.
  "Whom did Dawud defeat?": { answer: "Jalut", harder: ["Quran 2:251: by Allah's permission, whom did Dawud kill?", "Pharaoh", "Qarun", "Namrud"] },
  "By whose permission did they win?": { answer: "Allah's", harder: ["Quran 2:251: 'They defeated them by...' whose permission?", "The king's", "Their own", "The giant's"] },
  "What did Allah give Dawud after that?": { answer: "Kingdom and wisdom", harder: ["Quran 2:251: after Jalut, what did Allah give Dawud?", "Nothing", "Only gold", "A ship"] },
  // Quran 17:55.
  "Which book did Allah give Dawud?": { answer: "The Zabur", harder: ["Quran 17:55: 'to Dawud We gave...' which book?", "The Quran", "The Tawrah", "The Injil"] },
  "How fast could Dawud recite the Zabur?": { answer: "Before his animals were saddled", harder: ["Bukhari: the recitation was made light for Dawud. How fast could he recite?", "In a year", "Never in one go", "In a month"] },
  "The Zabur was given to Musa.": { answer: "False", harder: "By Quran 17:55, the Zabur was the book Allah gave to Musa." },
  // Quran 34:10.
  "What praised Allah along with Dawud?": { answer: "The mountains and the birds", harder: ["Quran 34:10: 'O mountains and birds, praise along with him.' Who praised with Dawud?", "The fish", "The stars", "The kings"] },
  "Which metal did Allah make soft for Dawud?": { answer: "Iron", harder: ["Quran 34:10: 'We made ____ soft for him.' Which metal?", "Copper", "Gold", "Silver"] },
  "What did Dawud make from the iron?": { answer: "Coats of armor", harder: ["Quran 34:11: 'make full coats and measure the links.' What did Dawud make?", "Crowns", "Coins", "Swords for sale"] },
  // Sahih al-Bukhari 2072.
  "What is the best food, the Prophet ﷺ said?": { answer: "What you earn with your hands", harder: ["Bukhari 2072: 'No one has eaten better food than...' what?", "Free food", "Food from far away", "A king's feast"] },
  "Whose example did he ﷺ give?": { answer: "Dawud's", harder: ["Bukhari 2072: 'the prophet of Allah ____ ate from the work of his hands.' Whom did he ﷺ name?", "Yunus's", "Pharaoh's", "Qarun's"] },
  "Dawud lived off the treasury because he was king.": { answer: "False", harder: "By Bukhari 2072, Dawud, as a king, ate from the treasury, not from his own work." },
  // Sahih al-Bukhari 1131.
  "How did Dawud fast?": { answer: "Every other day", harder: ["Bukhari 1131: the fast most loved by Allah is Dawud's. How did he fast?", "Every day", "Once a year", "Only Mondays"] },
  "How much of the night did Dawud pray?": { answer: "A third", harder: ["Bukhari 1131: Dawud slept half the night, prayed how much, then slept a sixth?", "All of it", "None", "A tenth"] },
  "Whose fast did the Prophet ﷺ call most loved by Allah?": { answer: "Dawud's", harder: ["Bukhari 1131: 'the fast most loved by Allah is...' whose?", "Nuh's", "Musa's", "Isa's"] },
  // Quran 38:26.
  "How was Dawud told to judge?": { answer: "With truth", harder: ["Quran 38:26: 'so judge between people with...' what?", "With guesses", "With desire", "With gifts"] },
  "What did Allah warn would lead him astray?": { answer: "Following desire", harder: ["Quran 38:26: 'do not follow ____, it will lead you astray.' What?", "Working", "Praying", "Fasting"] },
  "What does Quran 38:17 call Dawud?": { answer: "A man of strength, always turning to Allah", harder: ["Quran 38:17: 'Our servant Dawud, the man of...' how does Allah describe him?", "A careless king", "A poet", "A weak man"] },
  // Quran 27:16-19.
  "Sulayman understood the ____ and the ants, and thanked Allah.": { answer: "birds", harder: ["Quran 27:16-19: Sulayman knew the speech of the ____ and heard the ant.", "stars", "stones", "winds"] },
  "Sulayman understood the stars and the ants, and thanked Allah.": { answer: "False", harder: "By Quran 27:16-19, Sulayman was taught the speech of the stars, and smiled at the ant." },
  // Quran 27:16.
  "Whose speech was Sulayman taught?": { answer: "The birds'", harder: ["Quran 27:16: 'we have been taught the speech of...' whose?", "The stars'", "The kings'", "The fish's"] },
  "Who was Sulayman's father?": { answer: "Dawud", harder: ["Quran 27:16: 'Sulayman inherited from...' whom?", "Musa", "Ibrahim", "Zakariyya"] },
  "What did Sulayman call these gifts?": { answer: "A clear favor", harder: ["Quran 27:16: 'Indeed this is...' what did Sulayman call his gifts?", "His own skill", "Luck", "Magic"] },
  // Quran 21:79.
  "What ruined the field in the case?": { answer: "Sheep, at night", harder: ["Quran 21:78: in the case Dawud and Sulayman judged, what ruined the field?", "Locusts", "Fire", "A flood"] },
  "Who did Allah give understanding of the case?": { answer: "Sulayman", harder: ["Quran 21:79: 'We made ____ understand the case.' Whom?", "No one", "The farmer", "The shepherd"] },
  "Allah gave Dawud and Sulayman both judgment and knowledge.": { answer: "True", harder: "By Quran 21:79, to each of Dawud and Sulayman Allah gave judgment and knowledge." },
  // Sahih al-Bukhari 3427.
  "How did Sulayman find the true mother?": { answer: "She would give up the baby to save it", harder: ["Bukhari 3427: 'bring a knife, I will cut him in two.' How did that show the true mother?", "She shouted louder", "She was older", "She paid him"] },
  "Who got the baby in the end?": { answer: "The younger woman", harder: ["Bukhari 3427: 'do not, may Allah have mercy on you, he is hers!' Who got the baby?", "Sulayman", "No one", "The older woman"] },
  "Sulayman really meant to cut the baby.": { answer: "False", harder: "By Bukhari 3427, Sulayman asked for a knife because he truly meant to split the baby." },
  // Quran 27:19.
  "What did the ant tell the other ants?": { answer: "Go into your homes", harder: ["Quran 27:18: 'O ants, enter your...' what did the ant say?", "Attack the army", "Climb a tree", "Run to the sea"] },
  "What did Sulayman do when he heard the ant?": { answer: "Smiled and thanked Allah", harder: ["Quran 27:19: hearing the ant, what did Sulayman do?", "Ignored it", "Stepped on it", "Got angry"] },
  "Sulayman asked Allah to make him grateful.": { answer: "True", harder: "By Quran 27:19, Sulayman asked: my Lord, inspire me to be grateful for Your favor." },
  // Quran 27:22.
  "Which bird brought Sulayman news?": { answer: "The hoopoe", harder: ["Quran 27:20-22: which bird was missing, then came with news?", "The crow", "The eagle", "The dove"] },
  "Where did the news come from?": { answer: "Saba", harder: ["Quran 27:22: 'I have come to you from ____ with sure news.' From where?", "Babylon", "Egypt", "Madyan"] },
  "What did the people of Saba worship?": { answer: "The sun", harder: ["Quran 27:24: the hoopoe found the people of Saba prostrating to what?", "A calf", "Fire", "The moon"] },
  // Quran 27:44.
  "What did the queen of Saba do in the end?": { answer: "Submitted to Allah", harder: ["Quran 27:44: 'I submit with Sulayman to Allah, Lord of the worlds.' What did the queen do?", "Ran away", "Built an idol", "Went to war"] },
  "How fast was her throne brought?": { answer: "In the blink of an eye", harder: ["Quran 27:40: the one with knowledge of the Book brought her throne how fast?", "Never", "In a year", "In a month"] },
  "What did Sulayman call it when he saw the throne?": { answer: "A favor from my Lord, to test me", harder: ["Quran 27:40: seeing the throne before him, what did Sulayman say it was?", "My own power", "Magic", "Luck"] },
  // Quran 34:12.
  "What did Allah make serve Sulayman?": { answer: "The wind and some jinn", harder: ["Quran 34:12: what did Allah put in Sulayman's service?", "The sun", "The angels", "The sea monsters"] },
  "How far did the wind carry him in a morning?": { answer: "A month's journey", harder: ["Quran 34:12: 'its morning course...' how far did the wind carry Sulayman?", "One mile", "A year's journey", "Nowhere"] },
  "What did Sulayman ask for in Quran 38:35?": { answer: "Forgiveness and a unique kingdom", harder: ["Quran 38:35: 'my Lord, forgive me and grant me...' what did Sulayman ask?", "Many sons", "Revenge", "Long life only"] },
  // Quran 34:14.
  "What showed the jinn that Sulayman had died?": { answer: "A creature eating his staff", harder: ["Quran 34:14: what alone showed the jinn that Sulayman had died?", "A loud voice", "An angel", "A dream"] },
  "What does this teach about the jinn?": { answer: "They do not know the unseen", harder: ["Quran 34:14: 'had the jinn known the unseen...' what does it teach about them?", "They are angels", "They know everything", "They never die"] },
  "Who alone knows the unseen?": { answer: "Allah", harder: ["Quran 34:14 shows even the jinn missed Sulayman's death. Who alone knows the unseen?", "Fortune tellers", "Kings", "The jinn"] },
  // Quran 3:37.
  "What is Zakariyya known for?": { answer: "He looked after Maryam and was the father of Yahya.", harder: ["Quran 3:37-39: what is Zakariyya known for?", "He was sent to the people of 'Ad.", "He was the brother and helper of Musa.", "He was the first human being and the first prophet."] },
  "Who looked after Maryam and was the father of Yahya?": { answer: "Zakariyya", harder: ["Quran 3:37-39: who cared for Maryam and became the father of Yahya?", "Lut", "Muhammad ﷺ", "Musa"] },
  // Quran 3:37.
  "Who looked after Maryam?": { answer: "Zakariyya", harder: ["Quran 3:37: 'and He put her in the care of...' whom?", "Musa", "Yahya", "Dawud"] },
  "What did Zakariyya find with Maryam?": { answer: "Food from Allah", harder: ["Quran 3:37: in the prayer room, what did Zakariyya find with Maryam?", "Gold", "Books", "An angel"] },
  "What was Zakariyya's work, the Prophet ﷺ said?": { answer: "A carpenter", harder: ["Muslim: 'Zakariyya was a...' what was his work, the Prophet ﷺ said?", "A sailor", "A merchant", "A king"] },
  // Quran 3:38.
  "What did Zakariyya ask for in 3:38?": { answer: "A good child", harder: ["Quran 3:38: 'grant me from Yourself...' what did Zakariyya ask?", "A bigger house", "Much wealth", "A long journey"] },
  "How did Zakariyya end his du'a in 3:38?": { answer: "You are the Hearer of du'a", harder: ["Quran 3:38: 'Indeed, You are the ____ of du'a.' How did Zakariyya end?", "You are the King", "You are the Strong", "You are the Rich"] },
  "Zakariyya made his du'a when he saw Allah's provision with Maryam.": { answer: "True", harder: "By Quran 3:37-38, it was right there, on seeing Allah's provision with Maryam, that Zakariyya made his du'a." },
  // Quran 19:4.
  "How old was Zakariyya when he asked for a child?": { answer: "Very old", harder: ["Quran 19:4: 'my bones have weakened, my head white with grey.' How old was Zakariyya?", "Young", "A boy", "Middle-aged"] },
  "How did Zakariyya make his dua?": { answer: "Quietly", harder: ["Quran 19:3: 'when he called his Lord...' how did Zakariyya call?", "In a letter", "Shouting", "Through a messenger"] },
  "Zakariyya said he was never let down when he called on Allah.": { answer: "True", harder: "By Quran 19:4, Zakariyya said: I have never been let down in calling on You, my Lord." },
  // Quran 19:10.
  "What was the sign given to Zakariyya?": { answer: "He could not speak for three nights", harder: ["Quran 19:10: 'your sign is that you will not speak to people for...' how long?", "Rain came", "He grew young", "A star fell"] },
  "Was Zakariyya sick during the sign?": { answer: "No, he was well", harder: ["Quran 19:10: 'three nights, being sound.' Was Zakariyya sick then?", "He fainted", "Yes, very sick", "He slept"] },
  "What did he tell people to do, by signs?": { answer: "Glorify Allah morning and evening", harder: ["Quran 19:11: from the prayer room, what did Zakariyya signal his people to do?", "Go home", "Bring gifts", "Be quiet forever"] },
  // Quran 21:90.
  "What did Zakariyya's family hurry to?": { answer: "Good deeds", harder: ["Quran 21:90: 'they used to hasten to...' what?", "The market", "War", "Building houses"] },
  "How did they call on Allah?": { answer: "In hope and fear", harder: ["Quran 21:90: 'they called on Us in...' how?", "Proudly", "Rarely", "Only in joy"] },
  "What did Allah do for Zakariyya's wife?": { answer: "Made her able to have a child", harder: ["Quran 21:90: 'and We made his wife...' what did Allah do for her?", "Nothing", "Sent her away", "Made her a queen"] },
  // Quran 3:39.
  "What is Yahya known for?": { answer: "He was a prophet who confirmed that Isa would come.", harder: ["Quran 3:39: what is Yahya known for?", "He explained dreams and became a minister of Egypt.", "He helped Musa, then led Bani Isra'il into the Holy Land.", "He is the last messenger Allah sent."] },
  "Who was the father of Yahya?": { answer: "Zakariyya", harder: ["Quran 3:39: the angels gave news of Yahya to whom, his father?", "Ya'qub", "Abdullah ibn Abd al-Muttalib", "Nun"] },
  // Quran 19:7.
  "Who named Yahya?": { answer: "Allah", harder: ["Quran 19:7: 'a boy whose name is Yahya.' Who gave him the name?", "His mother", "The king", "His neighbors"] },
  "What was special about the name Yahya?": { answer: "No one had it before", harder: ["Quran 19:7: 'We have not given this name to...' what was special?", "It meant king", "It was very long", "Nothing"] },
  "Yahya was Zakariyya's son.": { answer: "True", harder: "By Quran 19:7, Allah gave Zakariyya the good news of a son named Yahya." },
  // Quran 19:12.
  "When was Yahya given wisdom?": { answer: "As a boy", harder: ["Quran 19:12: 'We gave him wisdom while...' when?", "At sixty", "Never", "After death"] },
  "How was Yahya told to hold the Book?": { answer: "Firmly", harder: ["Quran 19:12: 'O Yahya, hold the Book...' how?", "Lightly", "Secretly", "Never"] },
  "What two things came with his wisdom, in Quran 19:13?": { answer: "Tenderness and purity", harder: ["Quran 19:13: with wisdom Allah gave Yahya what two things from Himself?", "Swords", "Gold and land", "Fame and power"] },
  // Quran 19:14.
  "How was Yahya to his parents?": { answer: "Dutiful", harder: ["Quran 19:14: 'and ____ to his parents.' How was Yahya to them?", "Rude", "Distant", "Careless"] },
  "On which three days is there peace on Yahya?": { answer: "Born, dying, and raised", harder: ["Quran 19:15: 'peace on him the day he was born...' and which other two days?", "Every Friday", "Eid days", "Only his birthday"] },
  "Yahya was a proud tyrant.": { answer: "False", harder: "By Quran 19:14, Yahya was a proud, disobedient tyrant to his parents." },
  // Sahih al-Bukhari 3887.
  "In which heaven did he ﷺ meet Yahya and Isa?": { answer: "The second", harder: ["Bukhari 3887: on the Night Journey, where did he ﷺ meet Yahya and Isa?", "The fourth", "The seventh", "The first"] },
  "How were Yahya and Isa related?": { answer: "Cousins", harder: ["Bukhari 3887: 'Yahya and Isa, who are...' how were they related?", "Not related", "Father and son", "Brothers"] },
  "Who were Yahya's parents?": { answer: "Zakariyya and his wife", harder: ["Bukhari 3887 names Yahya. Who were his parents?", "Dawud and his wife", "Unknown", "Musa and Asiyah"] },
  // Jami at-Tirmidhi 2863.
  "How many commands did Allah give Yahya to teach?": { answer: "Five", harder: ["Tirmidhi 2863: Allah gave Yahya son of Zakariyya how many commands to teach?", "Ten", "Three", "Seven"] },
  "What was the first of Yahya's five commands?": { answer: "Worship Allah alone", harder: ["Tirmidhi 2863: which of Yahya's five commands came first?", "Travel to the sea", "Gather much wealth", "Build a tall tower"] },
  "Prayer, fasting and charity were among Yahya's commands.": { answer: "True", harder: "By Tirmidhi 2863, prayer, fasting and charity were among the five commands Yahya taught." },
  // Jami at-Tirmidhi 2863.
  "What did Yahya compare remembering Allah to?": { answer: "A strong fortress", harder: ["Tirmidhi 2863: in Yahya's example, remembering Allah is like a man reaching what?", "A heavy load", "A long road", "A busy market"] },
  "What keeps a servant safe from Shaytan?": { answer: "Remembering Allah", harder: ["Tirmidhi 2863: by what does a servant guard himself from Shaytan?", "Staying awake", "Talking a lot", "Being rich"] },
  "Yahya gathered the people to teach them Allah's commands.": { answer: "True", harder: "By Tirmidhi 2863, Yahya gathered the people in Bayt al-Maqdis and taught them the five commands." },
  // Quran 3:47.
  "Who was Isa's mother?": { answer: "Maryam", harder: ["Quran 3:45: 'his name is the Messiah, Isa son of ____.' Who was his mother?", "Khadijah", "Asiyah", "Hajar"] },
  "Which book did Allah give Isa?": { answer: "The Injil", harder: ["Quran 5:46: 'We gave him the ____, guidance and light.' Which book did Isa get?", "The Tawrah", "The Quran", "The Zabur"] },
  "Isa is a noble angel, born to Maryam without a father.": { answer: "False", harder: "By Quran 3:47, Isa is a noble angel, born to Maryam without a father." },
  // Quran 3:42.
  "Who told Maryam she was chosen?": { answer: "The angels", harder: ["Quran 3:42: 'O Maryam, Allah has chosen you.' Who said it to her?", "Zakariyya", "The king", "Her neighbors"] },
  "Above whom was Maryam chosen?": { answer: "The women of the worlds", harder: ["Quran 3:42: 'and chosen you above...' whom?", "The angels", "The prophets", "Only her town"] },
  "Isa's mother is Maryam.": { answer: "True", harder: "By Quran 3:42-45, the angels gave Maryam news of her son, the Messiah Isa." },
  // Quran 19:25.
  "Where did Maryam give birth?": { answer: "By a palm tree", harder: ["Quran 19:23: the pains of birth drove Maryam where?", "In a palace", "On a ship", "In a city"] },
  "What fell from the palm tree?": { answer: "Fresh ripe dates", harder: ["Quran 19:25: 'shake the trunk...' what fell to her?", "Nothing", "Apples", "Leaves only"] },
  "What did Allah give her below her?": { answer: "A stream", harder: ["Quran 19:24: 'your Lord has placed below you...' what?", "A house", "A rug", "A well"] },
  // Quran 19:30.
  "What were Isa's first words, from the cradle?": { answer: "I am the servant of Allah", harder: ["Quran 19:30: speaking from the cradle, what were Isa's first words?", "I am God", "Hello, mother", "I am a king"] },
  "Why did people speak to the baby?": { answer: "Maryam pointed to him", harder: ["Quran 19:29: how did the people end up speaking to a baby?", "He was sick", "He cried", "He was lost"] },
  "Isa called himself Allah's servant, not God.": { answer: "True", harder: "By Quran 19:30, Isa said from the cradle: I am the servant of Allah." },
  // Quran 19:33.
  "On which days did Isa say peace is on him?": { answer: "Birth, death, and being raised", harder: ["Quran 19:33: 'peace is on me the day...' which three days?", "Only the day of rain", "Only on Fridays", "Only the day of Eid"] },
  "Which day comes last in Isa's words in 19:33?": { answer: "The day he is raised alive", harder: ["Quran 19:33: 'the day I was born, the day I die, and...' which day comes last?", "The day of the flood", "The day he was born", "The day of the harvest"] },
  "Isa said these words as a baby in the cradle.": { answer: "True", harder: "By Quran 19:29-33, Isa said 'peace is on me' while still a baby in the cradle." },
  // Quran 3:59.
  "Whom is Isa compared to in Quran 3:59?": { answer: "Adam", harder: ["Quran 3:59: 'the example of Isa with Allah is like that of...' whom?", "Musa", "Nuh", "Yusuf"] },
  "Why the comparison?": { answer: "Both came without a father", harder: ["Quran 3:59: why is Isa likened to Adam?", "Both were rich", "Both were kings", "Both sailed"] },
  "What word did Allah say to create?": { answer: "Be", harder: ["Quran 3:59: 'then He said to him: ____, and he was.' Which word?", "Wait", "Grow", "Go"] },
  // Quran 3:49.
  "How did Isa do his miracles?": { answer: "By Allah's permission", harder: ["Quran 3:49: 'and it becomes a bird by...' how did Isa do his miracles?", "By tricks", "By his own power", "By magic"] },
  "What did Isa make from clay?": { answer: "The shape of a bird", harder: ["Quran 3:49: 'I make for you from clay...' what?", "A house", "A pot", "A camel"] },
  "Whom did Isa heal?": { answer: "The blind and the leper", harder: ["Quran 3:49: 'I heal the ____ and the ____.' Whom did Isa heal?", "Only kings", "No one", "Only animals"] },
  // Sahih al-Bukhari 3444.
  "What did Isa ask the man?": { answer: "Did you steal?", harder: ["Bukhari 3444: seeing a man stealing, what did Isa ask him?", "Where do you live?", "Are you hungry?", "Who is your father?"] },
  "What did Isa say when the man swore by Allah?": { answer: "I believe in Allah", harder: ["Bukhari 3444: 'by Allah, I did not!' What did Isa reply?", "Go to the judge", "I saw you clearly", "Show me your hands"] },
  "Isa treated an oath by Allah as a serious thing.": { answer: "True", harder: "By Bukhari 3444, Isa trusted the man's oath by Allah over what his own eyes saw." },
  // Quran 5:114.
  "Who asked for a table from heaven?": { answer: "The disciples", harder: ["Quran 5:112: 'can your Lord send down a table?' Who asked?", "The Romans", "Pharaoh", "The jinn"] },
  "What did Isa call Allah in his dua?": { answer: "The best of providers", harder: ["Quran 5:114: 'and provide for us, You are...' what did Isa call Allah?", "The king of Rome", "The god of bread", "The sun"] },
  "Which surah is named after this table?": { answer: "Al-Ma'idah", harder: ["Quran 5:114: which surah is named after the table from heaven?", "Yusuf", "Al-Baqarah", "Maryam"] },
  // Quran 61:6.
  "What name did Isa give the messenger after him?": { answer: "Ahmad", harder: ["Quran 61:6: 'a messenger after me, his name is...' what?", "Musa", "Yahya", "Dawud"] },
  "Which book did Isa confirm?": { answer: "The Tawrah", harder: ["Quran 61:6: 'confirming what came before me of...' which book?", "The Zabur only", "No book", "A new law of Rome"] },
  "Was there any prophet between Isa and Muhammad ﷺ?": { answer: "No", harder: ["Bukhari: 'there is no prophet between me and him.' Any prophet between Isa and Muhammad ﷺ?", "Yes, one", "Many", "Yes, three"] },
  // Quran 4:158.
  "Was Isa crucified, as the Quran says?": { answer: "No", harder: ["Quran 4:157: 'they did not kill him, nor ____ him.' Was Isa crucified?", "Nobody knows", "Yes", "Only for a day"] },
  "What did Allah do with Isa?": { answer: "Raised him up to Himself", harder: ["Quran 4:158: 'Rather, Allah...' what did Allah do with Isa?", "Made him a king", "Nothing", "Hid him in a cave"] },
  "What will Isa say about worshipping him and his mother?": { answer: "I never told them to", harder: ["Quran 5:116-117: asked about worship of him and his mother, what will Isa say?", "It is right", "Only sometimes", "Ask Maryam"] },
  // Sahih al-Bukhari 3435.
  "What do Muslims testify about Isa?": { answer: "He is Allah's servant and messenger", harder: ["Bukhari 3435: what must a Muslim testify about Isa?", "He was only a king", "He was an angel", "He was a poet"] },
  "Whom did the Prophet ﷺ call His word given to Maryam?": { answer: "Isa", harder: ["Bukhari 3435: 'His word which He gave to Maryam, and a spirit from Him.' Who is meant?", "Yahya", "Musa", "Ibrahim"] },
  "A believer also testifies that Paradise and the Fire are true.": { answer: "True", harder: "By Bukhari 3435, the one who testifies also bears witness that Paradise is true and the Fire is true." },
  // Sahih al-Bukhari 3448.
  "How will Isa rule when he comes back?": { answer: "As a just judge", harder: ["Bukhari 3448: 'the son of Maryam will soon descend among you as...' what?", "He will not rule", "As a tyrant", "As a new prophet with a new book"] },
  "What will one prostration be worth then?": { answer: "More than the world", harder: ["Bukhari 3448: in Isa's time, one prostration will be better than what?", "One coin", "A day", "Nothing"] },
  "Who said: I am the closest of people to the son of Maryam?": { answer: "Muhammad ﷺ", harder: ["Bukhari 3443: 'I am the closest of people to the son of Maryam.' Who said it?", "Musa", "Yahya", "Dawud"] },
  // Quran 33:40.
  "Who is the last prophet?": { answer: "Muhammad ﷺ", harder: ["Quran 33:40: 'the Messenger of Allah and the seal of the prophets.' Who is it?", "Isa", "Musa", "Yahya"] },
  "What was the name of the Prophet's ﷺ mother?": { answer: "Aminah", harder: ["The Prophet ﷺ lost his father before birth. What was his mother's name?", "Hawwa", "Maryam", "Halimah"] },
  "Muhammad ﷺ is Allah's Messenger and the last prophet.": { answer: "True", harder: "By Quran 33:40, Muhammad ﷺ is the Messenger of Allah and the seal of the prophets." },
  // Sahih Muslim 1162e.
  "On which day of the week was he ﷺ born?": { answer: "Monday", harder: ["Muslim 1162e: asked about fasting Mondays, what day did he ﷺ say he was born?", "Friday", "Saturday", "Wednesday"] },
  "What else happened on a Monday?": { answer: "Revelation first came to him", harder: ["Muslim 1162e: 'the day I was born, and the day...' what else happened on Monday?", "Badr was fought", "Makkah was opened", "The Hijrah began"] },
  "He ﷺ fasted on Mondays because it was the day he was born.": { answer: "True", harder: "By Muslim 1162e, asked about Monday's fast he ﷺ said: that is the day I was born." },
  // Quran 93:6.
  "How did he ﷺ grow up, as Quran 93:6 says?": { answer: "As an orphan", harder: ["Quran 93:6: 'Did He not find you...' how did he ﷺ grow up?", "As a prince", "As a rich trader", "In a far land"] },
  "Who gave the orphan ﷺ shelter?": { answer: "Allah", harder: ["Quran 93:6: 'and give you shelter.' Who gave the orphan ﷺ shelter?", "No one", "The Persians", "The Romans"] },
  "Allah reminds him ﷺ of his childhood to show His care.": { answer: "True", harder: "By Quran 93:6-8, Allah reminds His Prophet ﷺ of his orphan childhood to show His care." },
  // Sahih Muslim 162c.
  "What was he ﷺ doing when Jibril came?": { answer: "Playing with other boys", harder: ["Muslim 162c: what was he ﷺ doing as a boy when Jibril came?", "Praying in Hira", "Trading in Syria", "Herding camels"] },
  "What was his heart ﷺ washed with?": { answer: "Zamzam water", harder: ["Muslim 162c: in a golden basin, what was his heart ﷺ washed with?", "River water", "Rain water", "Milk"] },
  "Anas said he saw the marks on his chest ﷺ.": { answer: "True", harder: "By Muslim 162c, Anas said: I used to see the mark of that stitching on his chest ﷺ." },
  // Sahih al-Bukhari 2262.
  "What job did every prophet do?": { answer: "Herd sheep", harder: ["Bukhari 2262: 'Allah sent no prophet who did not...' what?", "Sell cloth", "Make swords", "Build ships"] },
  "Whose sheep did he ﷺ herd?": { answer: "The people of Makkah's", harder: ["Bukhari 2262: 'for a few qirats, I herded for...' whom?", "The king's", "Only his own", "The Romans'"] },
  "He ﷺ was paid for his work as a shepherd.": { answer: "True", harder: "By Bukhari 2262, he ﷺ said: I herded sheep for the people of Makkah for a few qirats." },
  // Sahih al-Bukhari 1582.
  "What did he ﷺ carry when the Ka'bah was rebuilt?": { answer: "Stones", harder: ["Bukhari 1582: when Quraysh rebuilt the Ka'bah, what did he ﷺ carry?", "Gold", "Water", "Wood"] },
  "Which uncle carried stones with him ﷺ?": { answer: "Al-Abbas", harder: ["Bukhari 1582: who carried stones beside him ﷺ and urged him to lift his waist-wrap?", "Abu Jahl", "Hamzah", "Abu Lahab"] },
  "Even as a young man, Allah protected his modesty ﷺ.": { answer: "True", harder: "By Bukhari 1582, when his waist-wrap was moved, he ﷺ fell to the ground, and Allah guarded his modesty." },
  // Sahih al-Bukhari 7.
  "Who said he ﷺ had never lied, while still his enemy?": { answer: "Abu Sufyan", harder: ["Bukhari 7: before Heraclius, which enemy admitted he ﷺ had never lied?", "Abu Bakr", "Ali", "Bilal"] },
  "Did he ﷺ ever break his promises?": { answer: "No, never", harder: ["Bukhari 7: 'does he ever betray?' What was Abu Sufyan's answer?", "Sometimes", "Only in war", "Only to enemies"] },
  "Heraclius asked about him ﷺ to test if he was truthful.": { answer: "True", harder: "By Bukhari 7, Heraclius asked Abu Sufyan whether he ﷺ had ever lied, to judge if he was truthful." },
  // Sunan Ibn Majah 150.
  "Through whom did Allah protect him ﷺ in Makkah?": { answer: "His uncle Abu Talib", harder: ["Ibn Majah 150: among the first to show Islam, through whom did Allah protect the Prophet ﷺ?", "The Romans", "The king of Persia", "Abu Lahab"] },
  "How many people first showed their Islam openly?": { answer: "Seven", harder: ["Ibn Majah 150: 'the first to show their Islam openly were...' how many?", "Forty", "One hundred", "Two"] },
  "Bilal was one of the first seven to show Islam openly.": { answer: "True", harder: "By Ibn Majah 150, Bilal was among the first seven who showed their Islam openly." },
  // Sahih al-Bukhari 3.
  "How did revelation begin?": { answer: "With true dreams", harder: ["Bukhari 3: 'Revelation began with...' what?", "With a letter", "With a loud voice", "With a book from the sky"] },
  "What did he ﷺ come to love after the dreams?": { answer: "Being alone to worship", harder: ["Bukhari 3: after the true dreams, what was made dear to him ﷺ?", "Poetry contests", "Big feasts", "Trading trips"] },
  "The first dreams were unclear and hard to read.": { answer: "False", harder: "By Bukhari 3, the first dreams were unclear, and none came true like daybreak." },
  // Sahih al-Bukhari 3.
  "Where did he ﷺ go to worship alone?": { answer: "The cave of Hira", harder: ["Bukhari 3: where did he ﷺ worship alone for many nights?", "Ta'if", "The cave of Thawr", "Mount Uhud"] },
  "Who did he ﷺ go back to for more food?": { answer: "Khadijah", harder: ["Bukhari 3: when supplies ran out at Hira, to whom did he ﷺ return?", "Abu Bakr", "Halimah", "Abu Talib"] },
  "He ﷺ stayed in Hira only for an hour at a time.": { answer: "False", harder: "By Bukhari 3, he ﷺ worshipped in Hira for an hour, never staying for nights." },
  // Sahih al-Bukhari 3.
  "What was the first word the angel said?": { answer: "Read (Iqra)", harder: ["Bukhari 3: in Hira, what was the angel's first word?", "Listen", "Write", "Pray"] },
  "What did he ﷺ answer?": { answer: "I am not a reader", harder: ["Bukhari 3: 'Read!' What did he ﷺ answer the angel?", "I am busy", "I will read later", "Who are you?"] },
  "How many times did the angel press him ﷺ?": { answer: "Three", harder: ["Bukhari 3: how many times did the angel press him ﷺ before the ayahs?", "Once", "Seven", "Ten"] },
  // Quran 96:5.
  "Which surah's ayahs came first?": { answer: "Al-Alaq", harder: ["Quran 96:1-5 were the first ayahs revealed. Which surah are they from?", "Al-Fatihah", "Al-Baqarah", "Al-Ikhlas"] },
  "What does Allah say He taught by?": { answer: "The pen", harder: ["Quran 96:4: 'who taught by the...' what?", "Gold", "The sword", "The stars"] },
  "The very first ayahs are about reading and learning.": { answer: "True", harder: "By Quran 96:1-5, the very first ayahs revealed speak of reading, the pen and learning." },
  // Sahih al-Bukhari 3.
  "Who took him ﷺ to Waraqah ibn Nawfal?": { answer: "Khadijah", harder: ["Bukhari 3: who took him ﷺ to her cousin Waraqah ibn Nawfal?", "Abu Talib", "Ali", "Abu Bakr"] },
  "Waraqah said the angel was the one sent to whom?": { answer: "Musa", harder: ["Bukhari 3: 'this is the Namus that Allah sent to...' whom did Waraqah name?", "Nuh", "Yusuf", "Adam"] },
  "Waraqah warned that his people would drive him ﷺ out.": { answer: "True", harder: "By Bukhari 3, Waraqah said: I wish I were alive when your people drive you out." },
  // Sahih al-Bukhari 2.
  "Which way of revelation was hardest on him ﷺ?": { answer: "Like the ringing of a bell", harder: ["Bukhari 2: 'that is hardest on me.' Which way of revelation did he ﷺ mean?", "As a man speaking", "Written on stone", "In a dream"] },
  "What did Aishah see on cold days of revelation?": { answer: "Sweat on his forehead", harder: ["Bukhari 2: on a very cold day, what did Aishah see as revelation ended?", "Nothing at all", "Snow on his hair", "Tears only"] },
  "The angel sometimes came looking like a man.": { answer: "True", harder: "By Bukhari 2, he ﷺ said: sometimes the angel comes to me in the form of a man and speaks." },
  // Sahih al-Bukhari 4.
  "Where did he ﷺ see the angel after the pause?": { answer: "On a chair between sky and earth", harder: ["Bukhari 4: after the pause, where did he ﷺ see the angel of Hira sitting?", "Inside the Ka'bah", "In the market", "On a ship"] },
  "What did Allah command in Surah Al-Muddaththir?": { answer: "Arise and warn", harder: ["Quran 74:1-2, revealed after the pause: 'O you wrapped up...' what?", "Sleep and rest", "Leave Makkah now", "Build a palace"] },
  "After Al-Muddaththir, revelation came often.": { answer: "True", harder: "By Bukhari 4, after Al-Muddaththir, revelation became warm and came one after another." },
  // Quran 15:94.
  "What did Quran 15:94 tell him ﷺ to do?": { answer: "Proclaim the message openly", harder: ["Quran 15:94: 'so ____ what you are commanded.' What was he ﷺ told?", "Stop preaching", "Keep it secret", "Leave Makkah"] },
  "Who was he ﷺ told to turn away from?": { answer: "Those who worship others", harder: ["Quran 15:94: 'and turn away from...' whom?", "His family", "The poor", "Children"] },
  "The message was meant to stay hidden forever.": { answer: "False", harder: "By Quran 15:94, he ﷺ was told to keep the message hidden from people." },
  // Sahih al-Bukhari 4770.
  "Which hill did he ﷺ climb to call Quraysh?": { answer: "Safa", harder: ["Bukhari 4770: on which hill did he ﷺ call out to the clans of Quraysh?", "Uhud", "Hira", "Thawr"] },
  "Who did Allah first tell him ﷺ to warn?": { answer: "His nearest kin", harder: ["Quran 26:214, behind Bukhari 4770: whom was he ﷺ told to warn first?", "The Persians", "The Romans", "Only strangers"] },
  "Quraysh said they had only known him ﷺ to be truthful.": { answer: "True", harder: "By Bukhari 4770, Quraysh at Safa said: we have only ever known you to speak the truth." },
  // Sahih al-Bukhari 4770.
  "Who answered the call at Safa with a curse?": { answer: "Abu Lahab", harder: ["Bukhari 4770: 'may you perish all day!' Who said it?", "Al-Abbas", "Hamzah", "Abu Talib"] },
  "Which surah was revealed about him?": { answer: "Al-Masad (111)", harder: ["Bukhari 4770: which surah came down about Abu Lahab?", "An-Nas (114)", "Al-Fil (105)", "Al-Kawthar (108)"] },
  "Being family of the Prophet ﷺ saved Abu Lahab.": { answer: "False", harder: "By Bukhari 4770 and Surah Al-Masad, Abu Lahab was saved because he was the Prophet's ﷺ uncle." },
  // Sahih al-Bukhari 240.
  "What was he ﷺ doing when they mocked him?": { answer: "Praying at the Ka'bah", harder: ["Bukhari 240: when Abu Jahl's group put filth on his back, what was he ﷺ doing?", "Eating at home", "Trading", "Sleeping"] },
  "Who came and removed it from his back?": { answer: "Fatimah, his daughter", harder: ["Bukhari 240: who came and threw it off his back ﷺ?", "Khadijah", "Abu Bakr", "Umar"] },
  "He ﷺ stopped praying to fight back.": { answer: "False", harder: "By Bukhari 240, he ﷺ rose from prostration at once to fight those who mocked him." },
  // Sahih al-Bukhari 3612.
  "What did he ﷺ say Islam would reach?": { answer: "Safety from Sana'a to Hadramawt", harder: ["Bukhari 3612: 'a rider will travel from ____ to ____ fearing none but Allah.' Which places?", "Only Makkah", "Nowhere", "Only the rich"] },
  "What did he ﷺ tell those who complained?": { answer: "You are in a hurry", harder: ["Bukhari 3612: to Khabbab and those who complained, what did he ﷺ say at the end?", "Hide forever", "Give up Islam", "Fight now"] },
  "Believers before them had faced worse tests.": { answer: "True", harder: "By Bukhari 3612, he ﷺ said believers before them were combed with iron combs and stayed firm." },
  // Quran 6:33.
  "What did Allah know about him ﷺ in Quran 6:33?": { answer: "Their words made him sad", harder: ["Quran 6:33: 'We know that what they say...' what does Allah know?", "He was angry", "He was afraid", "He wanted wealth"] },
  "What were the wrongdoers really rejecting?": { answer: "The signs of Allah", harder: ["Quran 6:33: 'they do not call you a liar, but they reject...' what?", "His poetry", "His family", "His trade"] },
  "Allah comforts His Messenger ﷺ in the Quran.": { answer: "True", harder: "By Quran 6:33, Allah comforts His Messenger ﷺ: they do not really call you a liar." },
  // Sahih al-Bukhari 3884.
  "What did he ﷺ ask his dying uncle to say?": { answer: "La ilaha illallah", harder: ["Bukhari 3884: 'uncle, say...' what did he ﷺ ask the dying Abu Talib?", "Nothing", "Goodbye", "Forgive Quraysh"] },
  "Who guides hearts, as Quran 28:56 says?": { answer: "Allah alone", harder: ["Quran 28:56: 'you cannot guide whom you love, but...' who guides?", "Family", "Kings", "The Prophet ﷺ"] },
  "Even a prophet cannot put faith into a heart.": { answer: "True", harder: "By Quran 28:56, even the Prophet ﷺ could not guide whom he loved; Allah guides whom He wills." },
  // Sahih al-Bukhari 3231.
  "Aishah asked if he ﷺ had a day harder than which?": { answer: "Uhud", harder: ["Bukhari 3231: 'did you face a day harder than...' which day did Aishah name?", "Badr", "The Hijrah", "Hunayn"] },
  "How did he ﷺ feel after being refused?": { answer: "Full of sorrow", harder: ["Bukhari 3231: after Ibn Abd Yalil refused him, how did he ﷺ walk away?", "He felt nothing", "Angry for revenge", "Happy"] },
  "His hardest day was a day of being rejected, not a battle.": { answer: "True", harder: "By Bukhari 3231, the hardest thing he ﷺ faced was the day he was refused, not a battle." },
  // Sahih al-Bukhari 3231.
  "What shaded him ﷺ on the way back?": { answer: "A cloud", harder: ["Bukhari 3231: at Qarn ath-Tha'alib, what did he ﷺ see when he looked up?", "A tree", "A tent", "A cave"] },
  "What did Jibril say Allah had heard?": { answer: "What his people said to him", harder: ["Bukhari 3231: 'Allah has heard...' what did Jibril say?", "Only the jinn", "The market noise", "Nothing at all"] },
  "Allah left him ﷺ alone in his sorrow.": { answer: "False", harder: "By Bukhari 3231, no one came to him ﷺ in his sorrow after Ta'if." },
  // Sahih al-Bukhari 3231.
  "What did the angel of the mountains offer?": { answer: "To bring two mountains down on them", harder: ["Bukhari 3231: 'if you wish, I will bring...' what did the angel of the mountains offer?", "Gold and silver", "A palace", "A big army"] },
  "What did he ﷺ choose?": { answer: "No, to be patient with them", harder: ["Bukhari 3231: offered the two mountains, what did he ﷺ answer?", "To ask Abu Bakr", "Yes, at once", "To wait a year"] },
  "The angel acted without his ﷺ permission.": { answer: "False", harder: "By Bukhari 3231, the angel of the mountains crushed the people without asking him ﷺ." },
  // Sahih al-Bukhari 3231.
  "What did he ﷺ hope for the people who hurt him?": { answer: "Their children would worship Allah", harder: ["Bukhari 3231: 'I hope Allah will bring from their...' what did he ﷺ hope?", "They would be punished", "They would leave Arabia", "Nothing good"] },
  "What does the story teach us?": { answer: "Mercy toward those who hurt us", harder: ["Bukhari 3231: refusing to destroy them, what does his ﷺ choice teach?", "Stay angry", "Always take revenge", "Never call people again"] },
  "He ﷺ wanted good even for people who refused him.": { answer: "True", harder: "By Bukhari 3231, he ﷺ hoped those who refused him would have children who worship Allah alone." },
  // Quran 46:29.
  "Who came to listen to the Quran in Quran 46:29?": { answer: "A group of jinn", harder: ["Quran 46:29: 'We sent your way a group of...' whom?", "Angels", "Kings of Persia", "Birds"] },
  "What did the jinn say while listening?": { answer: "Listen quietly", harder: ["Quran 46:29: in his presence, what did they say to each other?", "Let us laugh", "Speak louder", "Let us leave"] },
  "After listening, the jinn went to warn their people.": { answer: "True", harder: "By Quran 46:29, when the recitation ended, the jinn went back to their people as warners." },
  // Quran 72:1.
  "What did the jinn call the Quran?": { answer: "Amazing", harder: ["Quran 72:1: 'we have heard a Quran that is...' what?", "Strange poetry", "Too long", "Magic"] },
  "Which surah tells their words?": { answer: "Al-Jinn (72)", harder: ["Quran 72:1: which surah tells the jinn's words?", "Al-Kahf (18)", "Yusuf (12)", "Al-Fil (105)"] },
  "Some jinn believed in the Quran.": { answer: "True", harder: "By Quran 72:1-2, a group of jinn said: we have believed in it." },
  // Quran 21:107.
  "Why did Allah send him ﷺ, as Quran 21:107 says?": { answer: "As a mercy to the worlds", harder: ["Quran 21:107: 'We have not sent you except as...' what?", "To gather wealth", "Only for Arabs", "To become a king"] },
  "Who does that mercy reach?": { answer: "All the worlds", harder: ["Quran 21:107: 'a mercy to the...' whom?", "Only the rich", "Only Makkah", "Only his family"] },
  "His choice at Ta'if shows this mercy.": { answer: "True", harder: "Bukhari 3231 shows his choice at Ta'if was mercy, as Quran 21:107 describes him ﷺ." },
  // Quran 17:1.
  "Where did the Night Journey start?": { answer: "Al-Masjid al-Haram", harder: ["Quran 17:1: 'took His servant by night from...' where?", "Madinah", "Ta'if", "Damascus"] },
  "Where did it reach on earth?": { answer: "Al-Masjid al-Aqsa", harder: ["Quran 17:1: 'to ____, whose surroundings We have blessed.' Where?", "Cairo", "Yemen", "Baghdad"] },
  "The journey from Makkah to Al-Aqsa is called Al-Isra.": { answer: "True", harder: "Quran 17:1 tells of Al-Isra, the night journey from Al-Masjid al-Haram to Al-Masjid al-Aqsa." },
  // Sahih Muslim 162a.
  "What was Al-Buraq like?": { answer: "Bigger than a donkey, smaller than a mule", harder: ["Muslim 162a: 'a white, long animal...' what size was Al-Buraq?", "A giant bird", "A huge camel", "A ship"] },
  "How far did each step of Al-Buraq reach?": { answer: "As far as it could see", harder: ["Muslim 162a: 'it puts its hoof...' how far did each step reach?", "Up to the moon", "One meter", "One mile exactly"] },
  "He ﷺ tied Al-Buraq where the prophets tied their mounts.": { answer: "True", harder: "By Muslim 162a, he ﷺ tied Al-Buraq to the ring the prophets used to tie their mounts." },
  // Sahih al-Bukhari 3394.
  "Which cup did he ﷺ choose?": { answer: "Milk", harder: ["Bukhari 3394: offered two cups on the night journey, which did he ﷺ take?", "Wine", "Honey", "Water"] },
  "What does fitrah mean?": { answer: "The natural, pure way", harder: ["Bukhari 3394: 'you were guided to the fitrah.' What is fitrah?", "A kind of food", "A city", "A prayer time"] },
  "Choosing the wine would have led his ummah astray.": { answer: "True", harder: "By Bukhari 3394, Jibril said: had you taken the wine, your ummah would have gone astray." },
  // Sahih al-Bukhari 3207.
  "Who asked for each heaven's gate to be opened?": { answer: "Jibril", harder: ["Bukhari 3207: at each gate, 'who is it?' Who answered?", "Musa", "Mika'il", "Ibrahim"] },
  "What did each heaven say when they heard his name?": { answer: "Welcome to him", harder: ["Bukhari 3207: told it was Muhammad ﷺ, what did each heaven say?", "Go back", "Wait outside", "Nothing"] },
  "The gates opened without anyone asking who it was.": { answer: "False", harder: "By Bukhari 3207, each heaven's gate opened with no one asking who was there." },
  // Sahih al-Bukhari 3207.
  "Who did he ﷺ meet in the first heaven?": { answer: "Adam", harder: ["Bukhari 3207: whom did he ﷺ meet in the first heaven?", "Ibrahim", "Musa", "Nuh"] },
  "Which two prophets were in the second heaven?": { answer: "Isa and Yahya", harder: ["Bukhari 3207: the second heaven had which two cousins?", "Musa and Harun", "Ibrahim and Ismail", "Yusuf and Ya'qub"] },
  "Who was in the third heaven?": { answer: "Yusuf", harder: ["Bukhari 3207: whom did he ﷺ meet in the third heaven?", "Dawud", "Idris", "Adam"] },
  // Sahih al-Bukhari 3207.
  "Who was in the seventh heaven?": { answer: "Ibrahim", harder: ["Bukhari 3207: who was in the seventh heaven?", "Harun", "Adam", "Musa"] },
  "Why did Musa weep?": { answer: "More of this ummah will enter Jannah", harder: ["Bukhari 3207: as he ﷺ passed, why did Musa weep?", "He was ill", "He missed Egypt", "He was afraid"] },
  "Harun was in the fifth heaven.": { answer: "True", harder: "By Bukhari 3207, he ﷺ met Harun in the fifth heaven, then Musa in the sixth." },
  // Sahih al-Bukhari 3207.
  "How many angels pray in Al-Bayt al-Ma'mur each day?": { answer: "70,000", harder: ["Bukhari 3207: how many angels pray in Al-Bayt al-Ma'mur each day?", "700", "7,000", "7"] },
  "Do the same angels come back the next day?": { answer: "No, never", harder: ["Bukhari 3207: do the 70,000 angels return to Al-Bayt al-Ma'mur?", "Yes, every day", "Once a week", "Only on Friday"] },
  "Al-Bayt al-Ma'mur is a house of worship in the heavens.": { answer: "True", harder: "By Bukhari 3207, Al-Bayt al-Ma'mur is a house in the heavens where 70,000 angels pray each day." },
  // Sahih al-Bukhari 3207.
  "What were the Lote Tree's leaves like?": { answer: "Elephants' ears", harder: ["Bukhari 3207: at Sidrat al-Muntaha, what were the leaves like?", "Gold coins", "Bird feathers", "Tiny needles"] },
  "How many rivers came from its root?": { answer: "Four", harder: ["Bukhari 3207: how many rivers flowed from the root of Sidrat al-Muntaha?", "Two", "Seven", "Ten"] },
  "What does Sidrat al-Muntaha mean?": { answer: "The Lote Tree of the farthest boundary", harder: ["Quran 53:14: 'Sidrat al-Muntaha' means what?", "The palm of Makkah", "The garden gate", "The tree of life"] },
  // Sahih al-Bukhari 349.
  "How many prayers were first given?": { answer: "Fifty", harder: ["Bukhari 349: on the night journey, how many prayers did Allah first make due?", "Five", "Ten", "Seventeen"] },
  "Five prayers carry the reward of how many?": { answer: "Fifty", harder: ["Bukhari 349: 'they are five, and they are...' how many in reward?", "Five", "Ten", "One hundred"] },
  "Who kept telling him ﷺ to ask for less?": { answer: "Musa", harder: ["Bukhari 349: 'go back to your Lord.' Who kept saying it to him ﷺ?", "Jibril", "Adam", "Ibrahim"] },
  // Sahih Muslim 173.
  "Which ayahs were given on the Night Journey?": { answer: "The end of Al-Baqarah", harder: ["Muslim 173: with the five prayers, which ayahs was he ﷺ given at Sidrat al-Muntaha?", "Surah Yasin", "The start of Al-Kahf", "Ayat al-Kursi"] },
  "Whose grave sins can be forgiven, as the hadith says?": { answer: "Those who join nothing with Allah", harder: ["Muslim 173: the third gift was forgiveness of grave sins for whom?", "Everyone at all", "Only the rich", "No one"] },
  "The five prayers were a gift of the Mi'raj.": { answer: "True", harder: "By Muslim 173, the five prayers were one of the three things he ﷺ was given on the Mi'raj." },
  // Sahih al-Bukhari 3886.
  "What did Quraysh do when they heard of the journey?": { answer: "They did not believe him", harder: ["Bukhari 3886: told of the night journey, how did Quraysh react?", "They all believed", "They went to see", "They stayed silent"] },
  "How did he ﷺ describe Jerusalem to them?": { answer: "Allah showed it to him", harder: ["Bukhari 3886: standing in Al-Hijr, how could he ﷺ describe Bayt al-Maqdis to them?", "He drew a map", "A traveler told him", "He guessed"] },
  "Allah helped His Messenger ﷺ answer the doubters.": { answer: "True", harder: "By Bukhari 3886, Allah displayed Bayt al-Maqdis before him ﷺ so he could answer Quraysh." },
  // Sahih al-Bukhari 18.
  "What was the first promise of the pledge?": { answer: "Worship Allah alone", harder: ["Bukhari 18: on the night of Aqabah, what was the first thing they pledged?", "Fight Quraysh", "Build a city", "Give gold"] },
  "Where was the pledge made?": { answer: "Aqabah, near Makkah", harder: ["Bukhari 18: where did the Ansar give this pledge?", "Ta'if", "Madinah's market", "Jerusalem"] },
  "Whoever keeps the pledge, his reward is with Allah.": { answer: "True", harder: "By Bukhari 18, he ﷺ said: whoever of you fulfils it, his reward is with Allah." },
  // Quran 8:30.
  "Who is the best of planners?": { answer: "Allah", harder: ["Quran 8:30: 'they plan, and Allah plans, and Allah is...' what?", "Quraysh", "The Romans", "Abu Jahl"] },
  "What did Quraysh plot, as Quran 8:30 says?": { answer: "To hold him, end his life or expel him", harder: ["Quran 8:30: the disbelievers plotted to do what to him ﷺ?", "To give him gold", "To follow him", "To make him king"] },
  "Their plots stopped the Hijrah.": { answer: "False", harder: "By Quran 8:30, Quraysh's plotting stopped the Hijrah from happening." },
  // Sahih al-Bukhari 3911.
  "What did Abu Bakr say about him ﷺ on the road?": { answer: "He shows me the way", harder: ["Bukhari 3911: 'who is this man with you?' What did Abu Bakr answer?", "He is my servant", "He is a trader", "I do not know him"] },
  "What did Abu Bakr really mean by 'the way'?": { answer: "The way of good", harder: ["Bukhari 3911: 'he guides me on the way.' Which way did Abu Bakr mean?", "The sea route", "The road only", "The market"] },
  "Abu Bakr told a lie to protect him ﷺ.": { answer: "False", harder: "By Bukhari 3911, Abu Bakr lied about who he ﷺ was to keep him safe." },
  // Sahih al-Bukhari 428.
  "How long did he ﷺ stay with Banu Amr ibn Awf?": { answer: "Fourteen nights", harder: ["Bukhari 428: in upper Madinah, how long did he ﷺ stay with Banu Amr ibn Awf?", "Forty nights", "One night", "A year"] },
  "At whose house did his camel stop in Madinah?": { answer: "Abu Ayyub's", harder: ["Bukhari 428: his camel ﷺ knelt in front of whose house?", "Abu Jahl's", "Abu Talib's", "Uthman's"] },
  "Abu Bakr rode with him ﷺ on the same mount.": { answer: "True", harder: "By Bukhari 428, Abu Bakr rode behind him ﷺ on the same camel into Madinah." },
  // Sahih al-Bukhari 428.
  "What price did Banu an-Najjar ask for the land?": { answer: "Only reward from Allah", harder: ["Bukhari 428: asked to name a price for their walled garden, what did Banu an-Najjar want?", "A thousand dinars", "A camel each", "Half of Makkah"] },
  "Did he ﷺ watch while others built?": { answer: "No, he carried stones too", harder: ["Bukhari 428: while they built the masjid, what did he ﷺ do?", "He paid workers", "Yes, he only watched", "He was away"] },
  "What did he ﷺ say while building?": { answer: "No good but the Hereafter's", harder: ["Bukhari 428: 'O Allah, there is no good except...' what did he ﷺ say while building?", "Build it tall", "This is mine", "Hurry up"] },
  // Jami at-Tirmidhi 2485.
  "What did Abdullah ibn Salam see in his face ﷺ?": { answer: "It was not a liar's face", harder: ["Tirmidhi 2485: seeing his face ﷺ, what did Abdullah ibn Salam know?", "A king's crown", "Anger", "Fear"] },
  "Which is in his ﷺ first words in Madinah?": { answer: "Spread the salam", harder: ["Tirmidhi 2485: which of these was in his ﷺ first words in Madinah?", "Build walls", "Gather weapons", "Pay taxes"] },
  "These deeds lead to Jannah in peace.": { answer: "True", harder: "By Tirmidhi 2485, salam, feeding people, family ties and night prayer lead to Jannah in peace." },
  // Sahih al-Bukhari 3938.
  "What is the first food of the people of Jannah?": { answer: "The extra lobe of fish liver", harder: ["Bukhari 3938: asked about the first food of Jannah, what did he ﷺ answer?", "Honey", "Bread", "Dates"] },
  "What did he ﷺ say is the first sign of the Hour?": { answer: "A fire gathering people east to west", harder: ["Bukhari 3938: 'the first sign of the Hour is...' what?", "A flood", "A big wind", "A new star"] },
  "Abdullah ibn Salam accepted Islam after the answers.": { answer: "True", harder: "By Bukhari 3938, Abdullah ibn Salam testified to Islam after hearing the answers." },
  // Sahih al-Bukhari 3934.
  "From what event do Hijri years start?": { answer: "The Hijrah to Madinah", harder: ["Bukhari 3934: the companions counted years from which event?", "His birth", "The first revelation", "His passing"] },
  "What is the Muslim calendar called?": { answer: "Hijri", harder: ["Bukhari 3934: counting from the Hijrah, what is the calendar called?", "Roman", "Persian", "Solar"] },
  "The Islamic calendar counts from his ﷺ birth.": { answer: "False", harder: "By Bukhari 3934, the companions counted the years from the Prophet's ﷺ birth." },
  // Quran 3:123.
  "How does Quran 3:123 describe the believers at Badr?": { answer: "Few and weak", harder: ["Quran 3:123: 'Allah gave you victory at Badr when you were...' what?", "Tired of war", "Many and rich", "Well armed"] },
  "Who gave them victory at Badr?": { answer: "Allah", harder: ["Quran 3:123: whom does the ayah say gave victory at Badr?", "Their numbers", "Their wealth", "The Romans"] },
  "What does Allah ask after the victory?": { answer: "Be grateful and mindful of Him", harder: ["Quran 3:123: 'so be mindful of Allah, that you may...' what?", "Boast about it", "Take more land", "Rest forever"] },
  // Sahih al-Bukhari 3957.
  "About how many Muslims were at Badr?": { answer: "Just over 310", harder: ["Bukhari 3957: how many did the people of Badr say they were?", "One thousand", "Ten thousand", "About 40"] },
  "Whose army had the same number?": { answer: "Talut's", harder: ["Bukhari 3957: their number matched the men who crossed the river with whom?", "Dhul-Qarnayn's", "Sulayman's", "Fir'awn's"] },
  "Only believers crossed the river with Talut.": { answer: "True", harder: "By Bukhari 3957, none crossed the river with Talut except believers." },
  // Quran 8:11.
  "What did Allah send over them as calm?": { answer: "Light sleep", harder: ["Quran 8:11: 'He covered you with ____ as calm from Him.' What?", "A loud storm", "Great fear", "Hunger"] },
  "What did the rain do, as Quran 8:11 says?": { answer: "Purified them and made feet firm", harder: ["Quran 8:11: what did the rain do for the believers?", "Ended the battle", "Flooded the valley", "Scared them away"] },
  "Allah took away Satan's whispers with the rain.": { answer: "True", harder: "By Quran 8:11, the rain removed from them the whisper of Shaytan." },
  // Quran 8:9.
  "What did the believers do before help came?": { answer: "Called on Allah for help", harder: ["Quran 8:9: 'when you called on your Lord for help...' what did they do first?", "Ran away", "Made a deal", "Gave up"] },
  "How many angels does Quran 8:9 mention?": { answer: "A thousand", harder: ["Quran 8:9: 'I will help you with...' how many angels?", "Seven", "One hundred", "Ten"] },
  "Du'a was part of the victory at Badr.": { answer: "True", harder: "By Quran 8:9, the believers called on their Lord for help, and He answered them." },
  // Sahih al-Bukhari 3995.
  "Which angel did he ﷺ point to at Badr?": { answer: "Jibril", harder: ["Bukhari 3995: 'this is ____, holding his horse's head.' Whom did he ﷺ point to?", "Israfil", "Malik", "Ridwan"] },
  "What was Jibril holding?": { answer: "His horse's head", harder: ["Bukhari 3995: at Badr, what was Jibril holding?", "A book", "A lamp", "A trumpet"] },
  "Angels took part at Badr.": { answer: "True", harder: "By Bukhari 3995 and Quran 8:9, Jibril and the angels were there at Badr." },
  // Quran 8:17.
  "Who truly threw, as Quran 8:17 says?": { answer: "Allah", harder: ["Quran 8:17: 'you did not throw when you threw, but...' who threw?", "The archers", "The wind", "No one"] },
  "What should a believer learn from this?": { answer: "Success comes from Allah", harder: ["Quran 8:17: 'it was not you who threw.' What should a believer take from it?", "Never try", "We win alone", "Plans never matter"] },
  "The believers were tested with a good test.": { answer: "True", harder: "By Quran 8:17, Allah tested the believers with a good test from Him." },
  // Sahih al-Bukhari 3007.
  "Why was Hatib forgiven his mistake?": { answer: "He had been at Badr", harder: ["Bukhari 3007: why did he ﷺ refuse to punish Hatib's mistake?", "He was old", "He was a poet", "He was rich"] },
  "What did he ﷺ say Allah may have told the people of Badr?": { answer: "I have forgiven you", harder: ["Bukhari 3007: 'perhaps Allah looked at the people of Badr and said...' what?", "Go home", "Fight again", "You are kings"] },
  "The people of Badr hold a special honor.": { answer: "True", harder: "By Bukhari 3007, the people of Badr have a special honor with Allah." },
  // Sahih al-Bukhari 3039.
  "How many archers did he ﷺ place on the hill?": { answer: "Fifty", harder: ["Bukhari 3039: at Uhud, how many archers did he ﷺ put on the hill?", "Five hundred", "Three", "Five"] },
  "Who led the archers?": { answer: "Abdullah ibn Jubayr", harder: ["Bukhari 3039: who commanded the archers on the hill?", "Khalid ibn al-Walid", "Abu Bakr", "Hamzah"] },
  "What was their order?": { answer: "Stay until he sends for you", harder: ["Bukhari 3039: 'even if you see birds snatching us...' what was their order?", "Chase the enemy", "Go home at noon", "Collect the spoils"] },
  // Quran 3:152.
  "What went wrong at Uhud, as Quran 3:152 says?": { answer: "They disobeyed the order", harder: ["Quran 3:152: 'you lost heart, argued about the order, and...' what went wrong?", "They had no food", "They were lost", "The weather"] },
  "What did some of them want, says the ayah?": { answer: "This world", harder: ["Quran 3:152: 'among you are some who want...' what?", "To build", "To go home", "To sleep"] },
  "Allah forgave them after Uhud.": { answer: "True", harder: "By Quran 3:152, after Uhud Allah said: He has forgiven you." },
  // Sahih al-Bukhari 2911.
  "Who washed his wound ﷺ at Uhud?": { answer: "Fatimah", harder: ["Bukhari 2911: who washed the blood from his face ﷺ at Uhud?", "Aishah", "Khadijah", "Asma"] },
  "What stopped the bleeding?": { answer: "Ash from a burned palm mat", harder: ["Bukhari 2911: what finally stopped the bleeding?", "A song", "Honey", "Cold water"] },
  "He ﷺ was hurt for the sake of this religion.": { answer: "True", harder: "By Bukhari 2911, at Uhud his face ﷺ was wounded and his helmet broken on his head." },
  // Sahih al-Bukhari 2805.
  "What did Anas ibn an-Nadr smell beyond Uhud?": { answer: "Jannah", harder: ["Bukhari 2805: 'I find its scent beyond Uhud.' The scent of what?", "Rain", "Flowers of Madinah", "Smoke"] },
  "Who did he say it to?": { answer: "Sa'd ibn Mu'adh", harder: ["Bukhari 2805: 'O ____, Jannah!' Whom did Anas ibn an-Nadr call to?", "Abu Sufyan", "Umar", "Bilal"] },
  "Anas ibn an-Nadr was martyred at Uhud.": { answer: "True", harder: "By Bukhari 2805, Anas ibn an-Nadr was found at Uhud with over eighty wounds, martyred." },
  // Quran 3:139.
  "What did Allah tell the believers after Uhud?": { answer: "Do not weaken or grieve", harder: ["Quran 3:139: after Uhud, 'do not ____ and do not ____.' What?", "Blame each other", "Give up", "Leave Madinah"] },
  "Who will be uppermost, says Quran 3:139?": { answer: "True believers", harder: ["Quran 3:139: 'you will be uppermost if you are...' what?", "The strong", "The many", "The rich"] },
  "A hard day means Allah has left the believers.": { answer: "False", harder: "By Quran 3:139-140, the hurt at Uhud meant Allah had left the believers." },
  // Sahih al-Bukhari 4083.
  "What did he ﷺ say about Mount Uhud?": { answer: "It loves us, and we love it", harder: ["Bukhari 4083: seeing Uhud, what did he ﷺ say?", "Never go near it", "It is gold", "It is cursed"] },
  "Where is Mount Uhud?": { answer: "Near Madinah", harder: ["Bukhari 4083: he ﷺ said this on returning to Madinah. Where is Uhud?", "In Makkah", "In Yemen", "In Syria"] },
  "He ﷺ hated Uhud after the battle.": { answer: "False", harder: "By Bukhari 4083, after the battle he ﷺ said of Uhud: we do not love it." },
  // Sahih al-Bukhari 2834.
  "What was the weather when they dug?": { answer: "Very cold", harder: ["Bukhari 2834: what was the morning like when they dug the trench?", "Very hot", "Rainy", "Windy and warm"] },
  "What did he ﷺ say is the real life?": { answer: "The life of the Hereafter", harder: ["Bukhari 2834: 'O Allah, the real life is...' what?", "A long life", "A rich life", "Life in a palace"] },
  "The companions answered him ﷺ with a promise.": { answer: "True", harder: "By Bukhari 2834, the companions answered him ﷺ: we pledged to Muhammad to strive as long as we live." },
  // Sahih al-Bukhari 4101.
  "What happened when he ﷺ struck the rock?": { answer: "It turned to sand", harder: ["Bukhari 4101: when he ﷺ struck the rock in the trench, what happened?", "It broke the spade", "Nothing happened", "Water came out"] },
  "Why was a stone tied to his belly ﷺ?": { answer: "Hunger", harder: ["Bukhari 4101: why was a stone tied to his belly ﷺ?", "Cold", "An injury", "As a weapon"] },
  "He ﷺ was as hungry as his companions.": { answer: "True", harder: "By Bukhari 4101, they went three days without food, and he ﷺ had a stone tied to his belly." },
  // Quran 33:10.
  "From where did the enemies come, as Quran 33:10 says?": { answer: "From above and below", harder: ["Quran 33:10: 'when they came at you from...' where?", "Only the east", "From nowhere", "Only the sea"] },
  "What does the surah's name Al-Ahzab mean?": { answer: "The allied groups", harder: ["Quran 33:20-22 speak of 'al-Ahzab'. What does it mean?", "The trench", "The wind", "The night"] },
  "The believers felt great fear that day.": { answer: "True", harder: "By Quran 33:10, eyes grew wild and hearts reached the throats that day." },
  // Quran 33:22.
  "What did the believers say when they saw the armies?": { answer: "Allah and His Messenger spoke the truth", harder: ["Quran 33:22: seeing the allied armies, what did the believers say?", "Let us run", "We are finished", "Let us surrender"] },
  "What did the danger do to their faith?": { answer: "It increased it", harder: ["Quran 33:22: 'it only increased them in...' what?", "It ended it", "Nothing", "It made them doubt"] },
  "Tests can make true believers stronger.": { answer: "True", harder: "By Quran 33:22, the allied armies only increased the believers in faith and submission." },
  // Quran 33:9.
  "What did Allah send against the allies?": { answer: "A wind and unseen armies", harder: ["Quran 33:9: 'We sent against them...' what?", "A flood", "An earthquake", "Snow"] },
  "Who were the armies they could not see?": { answer: "Angels", harder: ["Quran 33:9: 'and armies you did not see.' Who were they?", "Persians", "Jinn", "Romans"] },
  "The believers won the Trench mainly by fighting.": { answer: "False", harder: "By Quran 33:9 and 33:25, the believers beat the allies mainly by fighting hard." },
  // Sahih al-Bukhari 4109.
  "What did he ﷺ say after the Trench?": { answer: "They will not come at us again", harder: ["Bukhari 4109: after Al-Ahzab, what did he ﷺ say?", "Make peace forever", "We must leave Madinah", "Build more walls"] },
  "What does it show about the Trench?": { answer: "It was a turning point", harder: ["Bukhari 4109: 'we will go to them.' What does this show about the Trench?", "It was a loss", "It never ended", "It was in Makkah"] },
  "Quraysh attacked Madinah again after the Trench.": { answer: "False", harder: "By Bukhari 4109, Quraysh came to attack Madinah again after the Trench." },
  // Sahih al-Bukhari 4150.
  "How many companions were at Hudaybiyah?": { answer: "About 1,400", harder: ["Bukhari 4150: 'we were ____ with the Prophet ﷺ on the day of Hudaybiyah.' How many?", "About 40", "About 10,000", "About 300"] },
  "What was Hudaybiyah?": { answer: "A well near Makkah", harder: ["Bukhari 4150: they drew all its water dry. What was Hudaybiyah?", "A mountain", "A city in Syria", "A ship"] },
  "After his du'a ﷺ, the dry well gave water again.": { answer: "True", harder: "By Bukhari 4150, after he ﷺ made du'a over the dry well, it gave water for them and their mounts." },
  // Sahih al-Bukhari 3576.
  "Where did the water flow from?": { answer: "Between his fingers ﷺ", harder: ["Bukhari 3576: he ﷺ put his hand in the pot. Where did the water flow from?", "A new river", "The sky", "A rock"] },
  "What did they use the water for?": { answer: "Drinking and wudu", harder: ["Bukhari 3576: what did the 1,500 do with the water?", "Nothing", "Only for camels", "Washing clothes"] },
  "This was a miracle Allah gave him ﷺ.": { answer: "True", harder: "By Bukhari 3576, water flowed from between his fingers ﷺ, a miracle from Allah." },
  // Quran 48:18.
  "Where did they make the pledge?": { answer: "Under a tree", harder: ["Quran 48:18: 'when they pledged to you...' where?", "In a cave", "On a ship", "Inside the Ka'bah"] },
  "What is this pledge called?": { answer: "Bay'at ar-Ridwan", harder: ["Quran 48:18: 'Allah was pleased with the believers.' What is this pledge called?", "Al-Hijrah", "Bay'at al-Aqabah", "Hilf al-Fudul"] },
  "Allah said He was pleased with them.": { answer: "True", harder: "By Quran 48:18, Allah was pleased with the believers who pledged under the tree." },
  // Sahih al-Bukhari 2731.
  "What did he ﷺ answer Umar?": { answer: "I do not disobey Allah", harder: ["Bukhari 2731: 'why accept this?' What did he ﷺ answer Umar?", "You are right, let us fight", "Go back to Madinah", "I am tired"] },
  "Why was Umar upset?": { answer: "The terms seemed unfair", harder: ["Bukhari 2731: 'why should we accept lowliness in our religion?' Why was Umar upset?", "He lost his camel", "He was hungry", "He was ill"] },
  "Trusting Allah's command is better than our own feelings.": { answer: "True", harder: "Bukhari 2731 and Quran 48:1 show that trusting Allah's command was better than their feelings." },
  // Sahih al-Bukhari 4177.
  "What did Allah call the treaty in Quran 48:1?": { answer: "A clear victory", harder: ["Bukhari 4177: 'We have given you a ____ victory.' What did Quran 48:1 call the treaty?", "A loss", "A mistake", "A small deal"] },
  "How dear was Surah Al-Fath to him ﷺ?": { answer: "Dearer than all the sun rises on", harder: ["Bukhari 4177: 'a surah came to me tonight that is dearer to me than...' what?", "Like any surah", "Less than gold", "Not dear"] },
  "What looked like a loss was a victory.": { answer: "True", harder: "By Bukhari 4177, the treaty that seemed a setback is what Quran 48:1 calls a clear victory." },
  // Sahih al-Bukhari 4150.
  "What did Al-Bara call the real victory?": { answer: "The pledge of Ridwan", harder: ["Bukhari 4150: 'we count the victory as...' what did Al-Bara say?", "Badr", "Uhud", "Ta'if"] },
  "What did others think the victory was?": { answer: "The Conquest of Makkah", harder: ["Bukhari 4150: 'you count the victory as...' what did others think it was?", "Khaybar", "The Hijrah", "The Trench"] },
  "To the companions, faith and loyalty were a victory.": { answer: "True", harder: "By Bukhari 4150, Al-Bara counted the pledge of loyalty at Hudaybiyah as the real victory." },
  // Sahih al-Bukhari 65.
  "Why did he ﷺ have a ring made?": { answer: "To seal letters to rulers", harder: ["Bukhari 65: told rulers only read sealed letters, why did he ﷺ have a ring made?", "As a gift", "For beauty only", "To trade it"] },
  "What was the ring made of?": { answer: "Silver", harder: ["Bukhari 65: 'as if I see its shine on his hand.' What was the ring made of?", "Gold", "Iron", "Wood"] },
  "The ring said: Muhammad, Messenger of Allah.": { answer: "True", harder: "By Bukhari 65, the ring was engraved: Muhammad, Messenger of Allah." },
  // Sahih al-Bukhari 4196.
  "What did Amir sing on the march to Khaybar?": { answer: "O Allah, without You we would not be guided", harder: ["Bukhari 4196: on the night march to Khaybar, what were Amir's words?", "O Madinah, we will return soon", "O Allah, give us gold and land", "We will win by our own strength"] },
  "What did the Prophet ﷺ say when he heard Amir?": { answer: "May Allah have mercy on him", harder: ["Bukhari 4196: 'who is this driver?' Told it was Amir, what did he ﷺ say?", "Stop singing at once", "Sing it louder", "Go back to Madinah"] },
  "Khaybar was a land of forts and date farms north of Madinah.": { answer: "True", harder: "Bukhari 4196-4197 tell of Khaybar, a land of forts and date farms north of Madinah." },
  // Sahih al-Bukhari 4197.
  "When did the army reach Khaybar?": { answer: "At night", harder: ["Bukhari 4197: when did the army reach Khaybar?", "On the day of Eid", "After a month of rest", "At noon"] },
  "What was his way when he reached an enemy at night?": { answer: "Wait until morning", harder: ["Bukhari 4197: reaching a people at night, what was his way ﷺ?", "Attack at once", "Light fires all night", "Send a letter and leave"] },
  "The people of Khaybar came out in the morning with spades and baskets.": { answer: "True", harder: "By Bukhari 4197, in the morning the people of Khaybar came out with spades and baskets." },
  // Sahih al-Bukhari 4210.
  "Who was given the flag at Khaybar?": { answer: "Ali ibn Abi Talib", harder: ["Bukhari 4210: 'tomorrow I will give the flag to a man...' who was given it?", "Khalid ibn al-Walid", "Abu Ubaydah", "Sa'd ibn Abi Waqqas"] },
  "What was wrong with Ali that morning?": { answer: "His eyes were sore", harder: ["Bukhari 4210: when Ali was called, what was wrong with him?", "He had a broken arm", "He was far away in Yemen", "He had a fever"] },
  "The man with the flag loves Allah and His Messenger, and they love him.": { answer: "True", harder: "By Bukhari 4210, the man given the flag loves Allah and His Messenger, and Allah and His Messenger love him." },
  // Sahih al-Bukhari 4210.
  "What did he ﷺ tell Ali to do first?": { answer: "Invite them to Islam", harder: ["Bukhari 4210: 'proceed and do not hurry...' what was Ali told to do first?", "Burn their farms", "Attack before dawn", "Take their gold"] },
  "What is better than red camels?": { answer: "One person guided through you", harder: ["Bukhari 4210: 'better for you than red camels' is what?", "A big army", "A full treasury", "A new fort"] },
  "Red camels were the finest wealth of the Arabs.": { answer: "True", harder: "Bukhari 4210 uses red camels as the measure because they were the finest wealth of the Arabs." },
  // Sahih al-Bukhari 4231.
  "Where did Ja'far and his group come back from?": { answer: "Abyssinia", harder: ["Bukhari 4231: Ja'far and the people of the ship reached Khaybar from where?", "Yemen", "Syria", "Iraq"] },
  "How many hijrahs did he ﷺ say the people of the ship had?": { answer: "Two", harder: ["Bukhari 4231: 'you, people of the ship, have...' how many hijrahs?", "One", "Three", "None"] },
  "The people of the ship were sad when they heard his words.": { answer: "False", harder: "By Bukhari 4231, the people of the ship were saddened by what he ﷺ said of them." },
  // Sahih al-Bukhari 2285.
  "Who farmed the land of Khaybar after the battle?": { answer: "Its own people, the Jews of Khaybar", harder: ["Bukhari 2285: after the battle, who worked the land of Khaybar?", "Only the Muhajirun", "Farmers from Yemen", "No one, it was left empty"] },
  "What share of the crop did the farmers keep?": { answer: "Half", harder: ["Bukhari 2285: what share of the crop did the farmers of Khaybar keep?", "A quarter", "All of it", "A tenth"] },
  "This farming deal lasted until the time of Umar.": { answer: "True", harder: "By Bukhari 2285, the Khaybar farming deal stayed in place until Umar's time." },
  // Sahih al-Bukhari 4234.
  "What did the man take before the spoils were shared?": { answer: "A sheet of cloth", harder: ["Bukhari 4234: 'no, I saw him in the Fire.' What had the slain man taken from the spoils?", "A sword", "A horse", "A bag of gold"] },
  "What did another man do when he heard this?": { answer: "He brought back the shoe straps he took", harder: ["Bukhari 4234: hearing this, what did another man bring back?", "He hid them better", "He ran away", "He laughed at it"] },
  "Taking even a small thing from shared wealth unfairly is a big sin.": { answer: "True", harder: "By Bukhari 4234, even a shoe strap taken unfairly from shared spoils is a strap of Fire." },
  // Sahih al-Bukhari 4215.
  "Which meat did he ﷺ forbid at Khaybar?": { answer: "The meat of tame donkeys", harder: ["Bukhari 4215: at Khaybar, which meat did he ﷺ forbid?", "Sheep meat", "Fish", "Camel meat"] },
  "What did the army do with the pots of donkey meat?": { answer: "They threw the meat away", harder: ["Bukhari 4215: the pots were boiling with donkey meat. What did they do?", "They ate it secretly", "They sold it", "They gave it to the poor"] },
  "The Companions argued and kept eating the meat.": { answer: "False", harder: "By Bukhari 4215, the companions argued and kept eating the donkey meat." },
  // Sahih al-Bukhari 4428.
  "What happened to him ﷺ at Khaybar?": { answer: "He ate food with poison in it", harder: ["Bukhari 4428: 'the food I ate at Khaybar.' What happened to him ﷺ there?", "He was hit by an arrow", "He fell from his camel", "He lost his way"] },
  "When did he ﷺ say he still felt its pain?": { answer: "In his last illness", harder: ["Bukhari 4428: 'I still feel the pain of it.' When did he ﷺ say this?", "Never", "The next morning", "At the Conquest of Makkah"] },
  "Aishah is the one who heard him say this.": { answer: "True", harder: "By Bukhari 4428, Aishah heard him ﷺ say, in his last illness, that he still felt the pain from Khaybar." },
  // Sahih al-Bukhari 4261.
  "Who was the first leader at Mu'tah?": { answer: "Zayd ibn Harithah", harder: ["Bukhari 4261: whom did he ﷺ make the first commander at Mu'tah?", "Khalid ibn al-Walid", "Abdullah ibn Rawahah", "Ja'far ibn Abi Talib"] },
  "Who would lead if Zayd fell?": { answer: "Ja'far ibn Abi Talib", harder: ["Bukhari 4261: 'if Zayd is killed, then...' who?", "Abdullah ibn Rawahah", "Usamah ibn Zayd", "Ali ibn Abi Talib"] },
  "Mu'tah is in the land of Sham, north of Madinah.": { answer: "True", harder: "Mu'tah, the battle of Bukhari 4261, was fought in the land of Sham, north of Madinah." },
  // Sahih al-Bukhari 4261.
  "How many wounds were found on Ja'far?": { answer: "More than ninety", harder: ["Bukhari 4261: how many stab and arrow wounds did Ibn Umar count on Ja'far?", "Three", "About twenty", "None at all"] },
  "Who saw Ja'far's wounds himself?": { answer: "Abdullah ibn Umar", harder: ["Bukhari 4261: 'I was among them in that battle.' Who saw Ja'far's wounds?", "Abu Hurayrah", "Anas ibn Malik", "Aishah"] },
  "Ja'far ran away from the battle.": { answer: "False", harder: "By Bukhari 4261, Ja'far turned away from the battle, with all his wounds on his back." },
  // Sahih al-Bukhari 4262.
  "When did he ﷺ tell Madinah about Mu'tah?": { answer: "Before any news arrived", harder: ["Bukhari 4262: when did he ﷺ tell Madinah of the three martyrs?", "After a letter came", "On the next Eid", "A month later"] },
  "What were his eyes doing as he spoke?": { answer: "Shedding tears", harder: ["Bukhari 4262: telling them of Zayd, Ja'far and Ibn Rawahah, what were his eyes ﷺ doing?", "Looking angry", "Closed in sleep", "Smiling"] },
  "Crying out of love and sadness is not against patience.": { answer: "True", harder: "By Bukhari 4262, his eyes ﷺ shed tears as he told of the martyrs: crying in sadness is not impatience." },
  // Sahih al-Bukhari 4262.
  "Who took the flag after the three leaders?": { answer: "Khalid ibn al-Walid", harder: ["Bukhari 4262: after the three leaders fell, who took the flag?", "Bilal", "Abu Bakr", "Amr ibn al-As"] },
  "What did he ﷺ call Khalid?": { answer: "A Sword of the Swords of Allah", harder: ["Bukhari 4262: what did he ﷺ call the one who took the flag?", "The Lion of Allah", "The Trusted One of the Ummah", "The Truthful"] },
  "Khalid had been Muslim for many years before Mu'tah.": { answer: "False", harder: "By Bukhari 4262, Khalid had been a Muslim for many years before Mu'tah." },
  // Sahih al-Bukhari 4265.
  "How many swords broke in Khalid's hand at Mu'tah?": { answer: "Nine", harder: ["Bukhari 4265: on the day of Mu'tah, how many swords broke in Khalid's hand?", "Two", "Five", "Twenty"] },
  "What sword was left in his hand?": { answer: "A sword from Yemen", harder: ["Bukhari 4265: after nine swords broke, what stayed in Khalid's hand?", "A sword from Rome", "A wooden sword", "No sword at all"] },
  "Khalid himself told how hard the fighting was.": { answer: "True", harder: "By Bukhari 4265, Khalid himself said nine swords broke in his hand at Mu'tah." },
  // Sahih al-Bukhari 3709.
  "How did Ibn Umar greet Ja'far's son?": { answer: "Son of the one with two wings", harder: ["Bukhari 3709: greeting the son of Ja'far, what did Ibn Umar call him?", "Son of the swift rider", "Son of the great poet", "Son of the brave lion"] },
  "Who was known as the one with two wings?": { answer: "Ja'far ibn Abi Talib", harder: ["Bukhari 3709: 'son of the one with two wings.' Who was that?", "Zayd ibn Harithah", "Hamzah", "Abdullah ibn Rawahah"] },
  "The Companions forgot Ja'far's family after Mu'tah.": { answer: "False", harder: "By Bukhari 3709, the companions forgot Ja'far's family after Mu'tah." },
  // Jami at-Tirmidhi 998.
  "What did he ﷺ ask people to do for Ja'far's family?": { answer: "Make food for them", harder: ["Tirmidhi 998: when news of Ja'far came, what did he ﷺ tell people to do?", "Ask them to cook for guests", "Hold a big feast", "Leave them alone for a year"] },
  "Why did the family need food made for them?": { answer: "Their grief kept them busy", harder: ["Tirmidhi 998: 'something has come to them that keeps them busy.' Why make food?", "They were travelling", "They were fasting", "They had no kitchen"] },
  "Feeding a grieving family is from the Sunnah.": { answer: "True", harder: "By Tirmidhi 998, making food for a grieving family is from the Sunnah." },
  // Sahih al-Bukhari 4276.
  "How many went with him ﷺ to Makkah?": { answer: "Ten thousand", harder: ["Bukhari 4276: how many set out with him ﷺ for Makkah?", "Fifty", "Three hundred", "One thousand"] },
  "In which month did they set out?": { answer: "Ramadan", harder: ["Bukhari 4276: in which month did they leave Madinah?", "Dhul-Hijjah", "Muharram", "Shawwal"] },
  "He ﷺ broke his fast on the journey.": { answer: "True", harder: "By Bukhari 4276, he ﷺ fasted at first on the journey, then broke his fast." },
  // Sahih al-Bukhari 4281.
  "Which surah did he ﷺ recite on that day?": { answer: "Al-Fath", harder: ["Bukhari 4281: on the day of the Conquest, which surah did he ﷺ recite?", "Yasin", "Al-Mulk", "Al-Baqarah"] },
  "Where was he ﷺ as he recited?": { answer: "On his camel", harder: ["Bukhari 4281: where was he ﷺ as he recited Al-Fath?", "On the minbar", "In a tent", "On the Ka'bah"] },
  "He ﷺ entered Makkah boasting and proud.": { answer: "False", harder: "By Bukhari 4281, he ﷺ entered Makkah on his camel, boasting of his victory." },
  // Sahih al-Bukhari 4287.
  "How many idols were around the Ka'bah?": { answer: "360", harder: ["Bukhari 4287: how many idols stood around the Ka'bah?", "40", "1,000", "7"] },
  "What did he ﷺ recite as they fell?": { answer: "Truth has come, falsehood has gone", harder: ["Bukhari 4287: striking the idols, what did he ﷺ recite?", "Run away", "Allahu akbar only", "We have won"] },
  "The Ka'bah was made a house for Allah alone again.": { answer: "True", harder: "By Bukhari 4287, the idols around the Ka'bah were brought down, making it a house for Allah alone." },
  // Sahih Muslim 1780a.
  "Whose house did he ﷺ make a place of safety?": { answer: "Abu Sufyan's", harder: ["Muslim 1780a: on the Conquest, whose house did he ﷺ make a place of safety?", "Abu Lahab's", "Abu Jahl's", "His own only"] },
  "What does this show on the day of victory?": { answer: "Mercy", harder: ["Muslim 1780a: safety for whoever enters Abu Sufyan's house shows what?", "Revenge", "Pride", "Greed"] },
  "Abu Sufyan had once been an enemy of Islam.": { answer: "True", harder: "By Muslim 1780a, Abu Sufyan, once an enemy, worried for Quraysh on the day of the Conquest." },
  // Quran 110:2.
  "How did people enter Islam, as Surah An-Nasr says?": { answer: "In crowds", harder: ["Quran 110:2: 'you see people entering Allah's religion...' how?", "Only kings", "One by one, secretly", "Not at all"] },
  "What should a believer do after success?": { answer: "Praise Allah and ask forgiveness", harder: ["Quran 110:3: after victory, what are believers told to do?", "Boast", "Rest forever", "Take revenge"] },
  "Success is a time to be humble before Allah.": { answer: "True", harder: "By Quran 110:1-3, the time of victory is a time to glorify Allah and seek His forgiveness." },
  // Quran 9:25.
  "What pleased the believers before Hunayn?": { answer: "Their great number", harder: ["Quran 9:25: on the day of Hunayn, what pleased the believers?", "The cool weather", "Their gold", "Their new horses"] },
  "What does Hunayn teach us?": { answer: "Victory comes from Allah, not numbers", harder: ["Quran 9:25: 'your great number did not help you at all.' What does Hunayn teach?", "A bigger army always wins", "Never fight in a valley", "Numbers are all that matter"] },
  "Hunayn was fought soon after the Conquest of Makkah.": { answer: "True", harder: "Quran 9:25 tells of Hunayn, fought soon after the Conquest of Makkah." },
  // Sahih al-Bukhari 4315.
  "What was he ﷺ riding at Hunayn?": { answer: "A white mule", harder: ["Bukhari 4315: when others fled at Hunayn, what was he ﷺ riding?", "A black horse", "A red camel", "A donkey"] },
  "Which tribe shot arrows at Hunayn?": { answer: "Hawazin", harder: ["Bukhari 4315: which tribe met them with arrows at Hunayn?", "Ghatafan", "Quraysh", "Banu Qurayzah"] },
  "The Prophet ﷺ ran away at Hunayn.": { answer: "False", harder: "By Bukhari 4315, he ﷺ fled with the others when Hawazin shot their arrows." },
  // Sahih al-Bukhari 4333.
  "Whom did he ﷺ call when the line broke?": { answer: "The Ansar", harder: ["Bukhari 4333: when the Muslims fled at Hunayn, whom did he ﷺ call?", "The people of Makkah", "The archers of Uhud", "The tribe of Hawazin"] },
  "How many men came with him to Hunayn?": { answer: "Ten thousand", harder: ["Bukhari 4333: how many men came with him ﷺ to Hunayn?", "One thousand", "Forty thousand", "Three hundred"] },
  "He ﷺ said: I am the slave of Allah and His Messenger.": { answer: "True", harder: "By Bukhari 4333, he ﷺ said at Hunayn: I am the slave of Allah and His Messenger." },
  // Quran 9:26.
  "What did Allah send down on the believers at Hunayn?": { answer: "His calm, sakinah", harder: ["Quran 9:26: 'then Allah sent down His...' what, on the believers?", "A great wind", "Food from the sky", "Rain and hail"] },
  "Who were the soldiers the believers did not see?": { answer: "Angels", harder: ["Quran 9:26: 'and sent down soldiers you did not see.' Who were they?", "Men from Yemen", "Hidden archers", "Jinn of the valley"] },
  "Sakinah is a calm Allah puts in the heart.": { answer: "True", harder: "By Quran 9:26, sakinah is the calm Allah sent down on His Messenger ﷺ and the believers." },
  // Sahih al-Bukhari 4325.
  "Which city did he ﷺ besiege after Hunayn?": { answer: "Ta'if", harder: ["Bukhari 4325: after Hunayn, which city did he ﷺ besiege?", "Jerusalem", "Khaybar", "Madinah"] },
  "What did he ﷺ say about leaving?": { answer: "We will return, if Allah wills", harder: ["Bukhari 4325: unable to take Ta'if, what did he ﷺ say?", "We will never come back", "We will stay for a year", "Burn the forts first"] },
  "He ﷺ smiled when the Companions were glad to go home.": { answer: "True", harder: "By Bukhari 4325, he ﷺ smiled when the companions were glad to leave Ta'if." },
  // Sahih al-Bukhari 4330.
  "Who got most of the spoils of Hunayn?": { answer: "People new to Islam", harder: ["Bukhari 4330: who got most of the spoils of Hunayn?", "The Ansar", "Only the Muhajirun", "The people of Ta'if"] },
  "What did the Ansar take home instead?": { answer: "The Messenger of Allah ﷺ", harder: ["Bukhari 4330: 'others take sheep and camels, and you take...' what?", "A new city", "Gold and silver", "The best camels"] },
  "He ﷺ said he would take the valley of the Ansar.": { answer: "True", harder: "By Bukhari 4330, he ﷺ said: if people took a valley, I would take the valley of the Ansar." },
  // Sahih al-Bukhari 3150.
  "Which prophet did he ﷺ remember when he was hurt?": { answer: "Musa", harder: ["Bukhari 3150: told the sharing was unfair, which prophet did he ﷺ remember?", "Nuh", "Yusuf", "Ibrahim"] },
  "What did Musa do when he was harmed?": { answer: "He was patient", harder: ["Bukhari 3150: 'he was harmed more than this, and he...' what did Musa do?", "He got angry", "He left his people", "He took revenge"] },
  "He ﷺ shouted back at the man in anger.": { answer: "False", harder: "By Bukhari 3150, he ﷺ shouted back at the man who called the sharing unfair." },
  // Sahih al-Bukhari 2307.
  "What did Hawazin ask for when they came as Muslims?": { answer: "Their families back", harder: ["Bukhari 2307: coming as Muslims, what did Hawazin ask?", "A new leader", "The city of Ta'if", "Weapons"] },
  "How did the Companions give up their shares?": { answer: "Gladly and willingly", harder: ["Bukhari 2307: asked to return the captives, how did the companions give them up?", "Only after a fight", "They refused", "For a high price"] },
  "He ﷺ waited for Hawazin for more than ten days.": { answer: "True", harder: "By Bukhari 2307, he ﷺ waited more than ten nights for Hawazin before sharing the spoils." },
  // Sahih al-Bukhari 1778.
  "Where did he ﷺ share the spoils of Hunayn?": { answer: "Al-Ji'ranah", harder: ["Bukhari 1778: from where did he ﷺ make Umrah when he shared the spoils of Hunayn?", "Badr", "Hudaybiyah", "Tabuk"] },
  "How many times did he ﷺ make Umrah?": { answer: "Four", harder: ["Bukhari 1778: how many times did he ﷺ perform Umrah?", "One", "Two", "Ten"] },
  "He ﷺ performed Hajj only once.": { answer: "True", harder: "By Bukhari 1778, he ﷺ performed four Umrahs but only one Hajj." },
  // Quran 9:41.
  "What did Allah tell the believers before Tabuk?": { answer: "Go forth, light or heavy", harder: ["Quran 9:41: 'Go forth, whether...' what did Allah tell them?", "Send only the young", "Stay home in the heat", "Wait for winter"] },
  "What made the march to Tabuk so hard?": { answer: "Summer heat and a long road", harder: ["Quran 9:42 and the Tabuk story: what made the march so hard?", "A short, easy road", "A great flood", "Deep snow"] },
  "Tabuk was the last march the Prophet ﷺ led.": { answer: "True", harder: "Tabuk, the march of Quran 9:41, was the last expedition the Prophet ﷺ led himself." },
  // Sahih al-Bukhari 2778.
  "What was the army of Tabuk called?": { answer: "The army of hardship", harder: ["Bukhari 2778: what was the army of Tabuk called?", "The army of the trench", "The army of the tree", "The army of the ship"] },
  "Who equipped the army of hardship?": { answer: "Uthman ibn Affan", harder: ["Bukhari 2778: 'whoever equips the army of hardship gets Jannah,' and who equipped it?", "Abu Hurayrah", "Abu Sufyan", "Khalid ibn al-Walid"] },
  "He ﷺ promised Jannah to whoever equipped that army.": { answer: "True", harder: "By Bukhari 2778, he ﷺ said: whoever equips the army of hardship will have Jannah." },
  // Quran 9:92.
  "What did the poor believers ask for?": { answer: "A mount to ride", harder: ["Quran 9:92: what did the poor believers come to ask him ﷺ for?", "A new sword", "Money for food", "Permission to stay home"] },
  "How did they leave when there was no mount?": { answer: "With eyes full of tears", harder: ["Quran 9:92: told there was no mount, how did they turn away?", "Angry and shouting", "Without a word", "Laughing with relief"] },
  "Allah blamed these poor believers for staying behind.": { answer: "False", harder: "By Quran 9:92, Allah blamed the poor believers who stayed behind for lack of a mount." },
  // Sahih al-Bukhari 4416.
  "Whom did he ﷺ leave in charge of Madinah?": { answer: "Ali ibn Abi Talib", harder: ["Bukhari 4416: setting out for Tabuk, whom did he ﷺ leave in Madinah?", "Uthman", "Abu Bakr", "Umar"] },
  "Like whom was Ali to him, he ﷺ said?": { answer: "Like Harun to Musa", harder: ["Bukhari 4416: 'will you not be pleased to be to me like...' whom?", "Like Ismail to Ibrahim", "Like Yahya to Zakariyya", "Like Yusuf to Ya'qub"] },
  "He ﷺ said there would be no prophet after him.": { answer: "True", harder: "By Bukhari 4416, he ﷺ told Ali: except that there will be no prophet after me." },
  // Sahih al-Bukhari 4419.
  "Whose ruins are at Al-Hijr?": { answer: "The people of Thamud", harder: ["Bukhari 4419: on the way to Tabuk, whose homes were at Al-Hijr?", "Pharaoh's people", "The people of Lut", "The people of Nuh"] },
  "How did he ﷺ say to pass their homes?": { answer: "Weeping", harder: ["Bukhari 4419: 'do not enter the homes of those who wronged themselves unless...' what?", "Laughing", "Taking pictures", "Camping there"] },
  "He ﷺ covered his head and hurried through the valley.": { answer: "True", harder: "By Bukhari 4419, he ﷺ covered his head and rode fast until he crossed the valley." },
  // Sahih al-Bukhari 3379.
  "What did they do with the dough made from Thamud's water?": { answer: "Fed it to the camels", harder: ["Bukhari 3379: what were they told to do with dough made from Thamud's water?", "Baked it as bread", "Buried it", "Sold it in Tabuk"] },
  "Which well could they drink from?": { answer: "The well of the she-camel", harder: ["Bukhari 3379: from which well at Al-Hijr were they allowed to draw?", "Any well of Thamud", "The biggest well", "None at all"] },
  "The she-camel was the sign given to Prophet Salih.": { answer: "True", harder: "By Bukhari 3379 and Quran 7:73, the she-camel whose well they could use was Salih's sign." },
  // Sahih al-Bukhari 1481.
  "What did he ﷺ warn of at Tabuk?": { answer: "A strong wind that night", harder: ["Bukhari 1481: reaching Tabuk, what did he ﷺ warn of?", "A flood in the valley", "An attack at dawn", "A long drought"] },
  "What were they told to do with their camels?": { answer: "Tie them up", harder: ["Bukhari 1481: 'whoever has a camel, let him...' what?", "Ride them away", "Sell them", "Let them run free"] },
  "The wind never came that night.": { answer: "False", harder: "By Bukhari 1481, the strong wind he ﷺ warned of at Tabuk never came." },
  // Sahih al-Bukhari 4423.
  "Who shared the reward of Tabuk without going?": { answer: "Those held back by a true excuse", harder: ["Bukhari 4423: who in Madinah shared the reward of Tabuk without going?", "Those who were busy trading", "No one", "Those who were lazy"] },
  "What gave them the reward?": { answer: "Their true intention", harder: ["Bukhari 4423: 'they were with you...' what gave them the reward?", "Their wealth", "Their family name", "Their age"] },
  "A sincere intention can earn a reward even when you cannot act.": { answer: "True", harder: "By Bukhari 4423, those kept in Madinah by a true excuse shared the reward of Tabuk." },
  // Quran 9:118.
  "What did the three do instead of making excuses?": { answer: "They told the truth", harder: ["Quran 9:118 and Ka'b's story: what did the three do instead of making excuses?", "They blamed others", "They made up a story", "They ran away"] },
  "How did the earth feel to them while they waited?": { answer: "Narrow, in spite of its width", harder: ["Quran 9:118: 'until the earth became...' how?", "Wide and happy", "Like a garden", "Nothing changed"] },
  "Ka'b ibn Malik was one of the three.": { answer: "True", harder: "Quran 9:118 tells of the three who stayed behind, Ka'b ibn Malik among them, whom Allah forgave." },
  // Sahih al-Bukhari 1739.
  "What did he ﷺ say are sacred between Muslims?": { answer: "Blood, wealth and honor", harder: ["Bukhari 1739: 'as sacred as this day of yours...' what is sacred between Muslims?", "Only gold", "Only land", "Only names"] },
  "Why did he ﷺ first ask about the day, city and month?": { answer: "To show how sacred they are", harder: ["Bukhari 1739: why did he ﷺ ask first what day, city and month it was?", "To test their memory only", "To start a game", "He forgot them"] },
  "Harming a Muslim's honor is a small thing.": { answer: "False", harder: "By Bukhari 1739, a Muslim's honor is less sacred than his blood or wealth." },
  // Sahih al-Bukhari 1739.
  "What did he ﷺ ask those present to do?": { answer: "Tell those who were absent", harder: ["Bukhari 1739: 'let the one who is present...' what?", "Forget it", "Keep it secret", "Write it on gold"] },
  "What did he ﷺ warn them against after him?": { answer: "Fighting one another", harder: ["Bukhari 1739: 'do not go back after me as disbelievers...' doing what?", "Traveling", "Fasting", "Trading"] },
  "Passing on what we learn is part of Islam.": { answer: "True", harder: "By Bukhari 1739, he ﷺ told those present to pass his words on to those absent." },
  // Sahih Muslim 1218.
  "What did he ﷺ leave so we will not go astray?": { answer: "The Book of Allah", harder: ["Muslim 1218: 'if you hold to it you will not go astray.' What did he ﷺ leave?", "A palace", "Gold", "A sword"] },
  "What did the people say he ﷺ had done?": { answer: "Conveyed the message", harder: ["Muslim 1218: asked what they would say of him, what did the people answer?", "Become king", "Nothing", "Built cities"] },
  "He ﷺ asked Allah to be witness.": { answer: "True", harder: "By Muslim 1218, he ﷺ raised his finger to the sky and said: O Allah, be witness." },
  // Sahih al-Bukhari 45.
  "Where was he ﷺ when 'today I perfected your religion' came?": { answer: "At Arafah", harder: ["Bukhari 45: where was he ﷺ when 'today I have perfected your religion' came?", "In Ta'if", "In Madinah", "In Hira"] },
  "On which day of the week did it come?": { answer: "Friday", harder: ["Bukhari 45: on which day of the week did Quran 5:3 come down?", "Sunday", "Tuesday", "Monday"] },
  "Islam was completed in the Prophet's ﷺ lifetime.": { answer: "True", harder: "By Bukhari 45 and Quran 5:3, Allah perfected the religion in his ﷺ lifetime." },
  // Sahih al-Bukhari 664.
  "Who did he ﷺ ask to lead the prayer in his illness?": { answer: "Abu Bakr", harder: ["Bukhari 664: in his last illness, whom did he ﷺ ask to lead the prayer?", "Umar", "Ali", "Bilal"] },
  "What did people say about Abu Bakr?": { answer: "He was soft-hearted", harder: ["Bukhari 664: why did some say Abu Bakr could not lead?", "He did not know the Quran", "He was away", "He was too young"] },
  "He ﷺ repeated the order more than once.": { answer: "True", harder: "By Bukhari 664, when they objected, he ﷺ repeated: tell Abu Bakr to lead the prayer." },
  // Sahih al-Bukhari 680.
  "What did he ﷺ see when he lifted the curtain?": { answer: "The people praying in rows", harder: ["Bukhari 680: lifting the curtain on Monday, what did he ﷺ see?", "A battle", "An empty masjid", "A market"] },
  "What did he ﷺ do when he saw them?": { answer: "He smiled", harder: ["Bukhari 680: seeing the rows of prayer, what did he ﷺ do?", "He wept", "He called out", "He left"] },
  "His face was like a page of the Quran.": { answer: "True", harder: "By Bukhari 680, Anas said his face ﷺ was like a page of the Mushaf." },
  // Sahih al-Bukhari 4463.
  "What were his last words ﷺ?": { answer: "O Allah, with the highest companion", harder: ["Bukhari 4463: what were his last words ﷺ?", "Bring me water", "Call Abu Bakr", "Farewell, Makkah"] },
  "What is every prophet given before death?": { answer: "A choice", harder: ["Bukhari 4463: 'no prophet dies until...' what is every prophet given?", "Nothing", "A crown", "A letter"] },
  "He ﷺ chose to be with Allah.": { answer: "True", harder: "By Bukhari 4463, given the choice, he ﷺ chose the highest companion." },
  // Sahih al-Bukhari 3536.
  "How old was he ﷺ when he passed away?": { answer: "Sixty-three", harder: ["Bukhari 3536: how old was he ﷺ when he passed away?", "Eighty", "Forty", "Fifty"] },
  "Who told us his age?": { answer: "Aishah", harder: ["Bukhari 3536: who reported his age ﷺ at death?", "Heraclius", "Waraqah", "Abu Lahab"] },
  "His message stayed after him, in the Quran and Sunnah.": { answer: "True", harder: "His message ﷺ stayed after Bukhari 3536's sixty-three years, in the Quran and Sunnah." },
  // Quran 68:4.
  "How does Allah describe his character ﷺ?": { answer: "Great", harder: ["Quran 68:4: 'you are truly of a ____ character.' How does Allah describe it?", "Proud", "Harsh", "Ordinary"] },
  "Who praised his character ﷺ in the Quran?": { answer: "Allah", harder: ["Quran 68:4: 'and you are truly of a great character.' Who said it?", "Quraysh", "The Romans", "The poets"] },
  "Good character is part of following him ﷺ.": { answer: "True", harder: "Following Quran 68:4, good character is part of following the Prophet ﷺ." },
  // Sahih Muslim 746a.
  "What did Aishah say his character ﷺ was?": { answer: "The Quran", harder: ["Muslim 746a: asked by Sa'd ibn Hisham, what did Aishah say his character ﷺ was?", "Like a king's", "Strict", "Unknown"] },
  "What does this mean?": { answer: "He lived what the Quran taught", harder: ["Muslim 746a: 'his character was the Quran.' What does it mean?", "He kept it hidden", "He changed it", "He only read it"] },
  "To learn his character, read the Quran.": { answer: "True", harder: "By Muslim 746a, his character ﷺ was the Quran, so its teachings show how he lived." },
  // Sahih al-Bukhari 3560.
  "Which choice did he ﷺ usually take?": { answer: "The easier one, if not a sin", harder: ["Bukhari 3560: given two choices, which did he ﷺ take?", "Whatever others chose", "Always the hardest", "The most expensive"] },
  "Did he ﷺ take revenge for himself?": { answer: "Never", harder: ["Bukhari 3560: did he ﷺ ever take revenge for his own sake?", "Always", "Sometimes", "Only on Fridays"] },
  "Islam likes making things easy for people.": { answer: "True", harder: "By Bukhari 3560, he ﷺ always chose the easier of two things when it was not a sin." },
  // Sahih al-Bukhari 3563.
  "What did he ﷺ do with food he did not like?": { answer: "Left it quietly", harder: ["Bukhari 3563: if he ﷺ disliked a food, what did he do?", "Complained loudly", "Threw it away", "Sent it back angry"] },
  "Did he ﷺ ever criticize food?": { answer: "Never", harder: ["Bukhari 3563: 'the Prophet ﷺ ____ criticized any food.' How often?", "Only at home", "Often", "Only at feasts"] },
  "We can follow this at every meal.": { answer: "True", harder: "By Bukhari 3563, he ﷺ ate food he liked and left what he disliked, without finding fault." },
  // Sahih al-Bukhari 3562.
  "How shy was he ﷺ?": { answer: "Shyer than a young girl in her room", harder: ["Bukhari 3562: how shy was he ﷺ?", "Not shy at all", "Only sometimes", "Shy only with kings"] },
  "What is haya?": { answer: "Modesty and shyness from wrong", harder: ["Bukhari 3562 describes his haya ﷺ. What is haya?", "Anger", "Pride", "Laziness"] },
  "Being shy from wrong is a good quality.": { answer: "True", harder: "By Bukhari 3562, his shyness ﷺ was greater than a young girl's in her room, a praised quality." },
  // Jami at-Tirmidhi 3641.
  "Who smiled more than anyone, a companion said?": { answer: "The Messenger of Allah ﷺ", harder: ["Tirmidhi 3641: 'I have not seen anyone who smiled more than...' whom?", "Heraclius", "The poets", "Abu Jahl"] },
  "What can we learn from his smile ﷺ?": { answer: "Meet people cheerfully", harder: ["Tirmidhi 3641: what can we learn from his smile ﷺ?", "Smile only for gifts", "Always frown", "Avoid people"] },
  "He ﷺ was known as gloomy and stern.": { answer: "False", harder: "By Tirmidhi 3641, he ﷺ was known as gloomy and stern, rarely smiling." },
};
