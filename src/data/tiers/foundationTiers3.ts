import type { TierEntry } from "../questionTiers";

/**
 * Basics (foundation): harder and expert ways to ask the same questions, batch 3 (unique prompts 120-242, the rest of
 * Basics). Each one keeps the question's answer and asks only what the lesson's own source and learn card say
 * (Bukhari 150, 155, 211, 239, 686, 940, 3406, 5447, 5818, 5858; Muslim 269, 292a; Abu Dawud 1, 50, 1398, 3819, 3832,
 * 3836, 3837, 4061, 4062, 4065, 4077, 4143, 4163, 5000; Tirmidhi 992, 1826, 2360, 2481, 2772, 2790, 2819, 2882, 2914,
 * 3405; Nasa'i 5, 1016; Ibn Majah 1349, 3319, 3606). Keyed by the question's English prompt (see questionTiers.ts).
 */
export const FOUNDATION_TIERS_3: Record<string, TierEntry> = {
  // Ibn Majah 3319 (Umar).
  "Why did he ﷺ praise olive oil?": {
    answer: "From a blessed tree",
    harder: ["Umar reported: eat olive oil and rub it on, for it comes from what?", "From a holy city", "From an old well", "From a high mountain"]
  },
  "Besides eating it, what did he ﷺ say to do with it?": {
    answer: "Rub it on the body",
    harder: ["Ibn Majah 3319: 'Eat olive oil and ...' What is the second thing?", "Sell it in the market", "Burn it in lamps", "Pour it on the ground"]
  },
  "He ﷺ told them to use olive oil in their food.": {
    answer: "True",
    harder: "In Ibn Majah 3319 he ﷺ said to eat olive oil and rub it on the skin."
  },
  // Bukhari 211 (Ibn Abbas).
  "What did he ﷺ do after drinking milk?": {
    answer: "Rinsed his mouth",
    harder: ["Ibn Abbas reported what he ﷺ did right after drinking milk. What was it?", "Made wudu again", "Drank some water", "Ate a date"]
  },
  "Why did he ﷺ rinse his mouth after milk?": {
    answer: "Milk has fat in it",
    harder: ["He ﷺ rinsed his mouth after milk and gave a reason. What did he say?", "Milk makes you sleepy", "Milk is from camels", "Milk breaks wudu"]
  },
  "Rinsing the mouth after milk follows his ﷺ way.": {
    answer: "True",
    harder: "In Bukhari 211 he ﷺ rinsed his mouth after milk, saying it has fat."
  },
  // Tirmidhi 3405 (Aishah).
  "Which two surahs did Aishah say he ﷺ recited before sleep?": {
    answer: "Az-Zumar and Al-Isra",
    harder: ["Aishah said he ﷺ would not sleep until he recited surah 39 and surah 17. Which are they?", "Al-Kahf and Maryam", "Ya-Sin and Al-Mulk", "Hud and Yusuf"]
  },
  "What is another name for Surat Bani Isra'il?": {
    answer: "Al-Isra",
    harder: ["Surah 17 is also called Bani Isra'il. What is its other name?", "Al-Anbiya", "Al-Kahf", "Ta-Ha"]
  },
  "He ﷺ recited Az-Zumar before going to sleep.": {
    answer: "True",
    harder: "Aishah said he ﷺ did not sleep until he had recited surah 39, Az-Zumar."
  },
  // Tirmidhi 2882 (An-Nu'man ibn Bashir).
  "How long before the heavens and earth did Allah write that book?": {
    answer: "Two thousand years",
    harder: ["Tirmidhi 2882: the book with the end of Al-Baqarah was written how long before the heavens and earth?", "One hundred years", "One thousand days", "Forty years"]
  },
  "Who will not come near a home where they are recited for three nights?": {
    answer: "Shaytan",
    harder: ["The last two ayahs of Al-Baqarah are recited in a house for three nights. Who will not come near it?", "Sickness", "Thieves", "Hunger"]
  },
  "The last two ayahs of Al-Baqarah come from a book Allah wrote.": {
    answer: "True",
    harder: "Allah sent down two ayahs from that book, and closed Al-Baqarah with them."
  },
  // Nasa'i 1016 (Al-Bara ibn Azib).
  "How did he ﷺ tell us to recite the Quran?": {
    answer: "In beautiful voices",
    harder: ["Al-Bara ibn Azib reported: 'Adorn the Quran with your ...' What?", "In whispered voices", "In loud voices", "In quick voices"]
  },
  "When should we make our voices beautiful, he ﷺ said?": {
    answer: "When we recite the Quran",
    harder: ["Nasa'i 1016 tells us to make our voices beautiful. For what?", "When we call our friends", "When we sing poems", "When we sell goods"]
  },
  "We should recite the Quran in our most beautiful voice.": {
    answer: "True",
    harder: "In Nasa'i 1016 he ﷺ said to adorn the Quran with your voices."
  },
  // Tirmidhi 2914 (Abdullah ibn Amr).
  "What will the one who memorized the Quran be told?": {
    answer: "Recite and rise up",
    harder: ["Tirmidhi 2914: what will be said to the companion of the Quran?", "Rest and be quiet", "Write and teach", "Stand and wait"]
  },
  "Where will his rank be, he ﷺ said?": {
    answer: "At the last ayah he recites",
    harder: ["'Recite and rise, as you recited in the world.' Where does his place end?", "At the first surah he heard", "At the ayah he loved most", "At the hardest ayah"]
  },
  "He will be told to recite as he recited in the world.": {
    answer: "True",
    harder: "He will be told: recite slowly, as you used to recite in the world."
  },
  // Abu Dawud 1398 (Abdullah ibn Amr).
  "How many ayahs at night keep you from the negligent, he ﷺ said?": {
    answer: "Ten ayahs",
    harder: ["Abu Dawud 1398: whoever stands at night with how many ayahs is not written among the negligent?", "Two ayahs", "Five ayahs", "Fifty ayahs"],
    expert: ["A hundred: the obedient. A thousand: huge reward. And the fewest, to leave the negligent?", "Three ayahs", "One ayah", "Seven ayahs"]
  },
  "Which brings a place among those of huge reward?": {
    answer: "A thousand ayahs at night",
    harder: ["Abu Dawud 1398 names three amounts. Which one is written among the muqantirin, of huge reward?", "Ten ayahs at night", "A hundred ayahs at night", "Fifty ayahs at night"]
  },
  "One who prays with a hundred ayahs at night is written among the obedient.": {
    answer: "True",
    harder: "In Abu Dawud 1398, a hundred ayahs at night places you among the qanitin, the obedient."
  },
  // Ibn Majah 1349 (Umm Hani).
  "Where was Umm Hani when she heard his ﷺ recitation?": {
    answer: "On the roof of her house",
    harder: ["Umm Hani bint Abi Talib heard him ﷺ reciting at night. Where was she?", "In the masjid", "At her door", "In her garden"]
  },
  "When did Umm Hani hear him ﷺ reciting?": {
    answer: "At night",
    harder: ["Ibn Majah 1349: at what time did his ﷺ recitation reach Umm Hani on her roof?", "In the morning", "At Maghrib time", "At midday"]
  },
  "Umm Hani could hear him ﷺ reciting from her house.": {
    answer: "True",
    harder: "Umm Hani heard his ﷺ recitation at night while she was on her own roof."
  },
  // Abu Dawud 4062 (Jabir).
  "What did he ﷺ want for the man with untidy hair?": {
    answer: "Something to smooth his hair",
    harder: ["He ﷺ saw a man with messy hair and asked: could he not find ... ?", "Some food to eat", "A place to sleep", "A rope for his camel"]
  },
  "What did the man in dirty clothes need, he ﷺ said?": {
    answer: "Something to wash his clothes",
    harder: ["Abu Dawud 4062: 'Could this one not find ... ?' What did the man in dirty clothes lack?", "A cloak for winter", "A better job", "A bag for travel"]
  },
  "He ﷺ wanted a man with untidy hair to smooth it.": {
    answer: "True",
    harder: "Jabir reported that he ﷺ asked why a man with messy hair did not smooth it."
  },
  // Abu Dawud 4163 (Abu Hurairah).
  "What should someone with hair do, he ﷺ said?": {
    answer: "Honor it",
    harder: ["Abu Hurairah reported: 'Whoever has hair, let him ...' What?", "Cut it all off", "Cover it at home", "Dye it every week"]
  },
  "What does honoring your hair mean?": {
    answer: "Keeping it clean and combed",
    harder: ["Abu Dawud 4163 says to honor your hair. In practice that is what?", "Growing it as long as you can", "Hiding it from everyone", "Washing it only on Eid"]
  },
  "Taking care of our hair is part of the Sunnah.": {
    answer: "True",
    harder: "He ﷺ said whoever has hair should honor it."
  },
  // Abu Dawud 4061 (Ibn Abbas).
  "Which clothes did he ﷺ call among our best?": {
    answer: "White clothes",
    harder: ["Ibn Abbas reported: wear clothes of this colour, they are among your best. Which colour?", "Blue clothes", "Yellow clothes", "Brown clothes"]
  },
  "What else did he ﷺ say to do with white cloth?": {
    answer: "Wrap the dead in it",
    harder: ["Abu Dawud 4061: wear white, and what else did he ﷺ say about white cloth?", "Use it for the prayer mat", "Tie it on the tents", "Give it to the poor only"]
  },
  "He ﷺ called white clothes among our best clothes.": {
    answer: "True",
    harder: "In Abu Dawud 4061 he ﷺ said white is among the best of your clothes, and to shroud your dead in it."
  },
  // Tirmidhi 2819 (Abdullah ibn Amr).
  "What does Allah love to see on His servant?": {
    answer: "The trace of His blessings",
    harder: ["Tirmidhi 2819: Allah loves to see what on His servant?", "Old clothes only", "Signs of worry", "Fine silk robes"]
  },
  "Allah has given you good things. How should you look?": {
    answer: "Clean and neat, showing His gift",
    harder: ["Allah loves to see the trace of His blessings on you. So how do you dress?", "Shabby, so no one asks", "Grand, to beat others", "Dirty, to look humble"]
  },
  "Allah loves to see the trace of His blessings on His servant.": {
    answer: "True",
    harder: "Abdullah ibn Amr reported that Allah loves to see the trace of His blessing on His servant."
  },
  // Nasa'i 5 (Aishah).
  "What two things does the siwak do, he ﷺ said?": {
    answer: "Cleans the mouth, pleases the Lord",
    harder: ["Aishah reported two things the siwak brings. What are they?", "Sharpens the mind, lifts the mood", "Whitens teeth, sweetens food", "Wakes you up, cools you down"]
  },
  "What is a siwak?": {
    answer: "A twig for cleaning teeth",
    harder: ["Nasa'i 5 speaks of the siwak. What is it?", "A cloth for wiping hands", "A comb for the beard", "A cup for rinsing"]
  },
  "Using the siwak is pleasing to Allah.": {
    answer: "True",
    harder: "In Nasa'i 5 the siwak is called a cleanser of the mouth and pleasing to the Lord."
  },
  // Tirmidhi 992 (Abu Sa'id al-Khudri).
  "What did he ﷺ call the best of our perfumes?": {
    answer: "Musk",
    harder: ["He ﷺ was asked about a perfume, and said it is the best of your perfumes. Which?", "Oud", "Jasmine", "Sandalwood"]
  },
  "What kind of thing is musk?": {
    answer: "A perfume",
    harder: ["Abu Sa'id al-Khudri reported that musk is the best of what?", "A spice", "A medicine", "A sweet"]
  },
  "He ﷺ called musk the best of perfumes.": {
    answer: "True",
    harder: "In Tirmidhi 992, when asked about musk, he ﷺ said it is the best of perfumes."
  },
  // Abu Dawud 50 (Aishah).
  "To whom was he ﷺ told to give the siwak?": {
    answer: "The older one",
    harder: ["Two men were with him ﷺ when he used the siwak. Revelation told him to give it to whom?", "The first to ask", "The one on his right", "The one nearest him"]
  },
  "What came to him ﷺ about the siwak?": {
    answer: "A revelation",
    harder: ["Aishah said he ﷺ was told to honor the elder with the siwak. How did that instruction come?", "A dream", "A messenger", "A note"]
  },
  "He ﷺ was told to honor the elder of the two men.": {
    answer: "True",
    harder: "In Abu Dawud 50 he ﷺ was told by revelation to give the siwak to the older of two men."
  },
  // Abu Dawud 1 (Al-Mughirah).
  "Who told us he ﷺ went to a far-off place?": {
    answer: "Al-Mughirah ibn Shu'bah",
    harder: ["Abu Dawud 1 opens with a Companion who saw him ﷺ go far off to relieve himself. Who?", "Anas ibn Malik", "Abu Hurairah", "Mu'adh ibn Jabal"]
  },
  "Out camping with no toilet near, what fits his ﷺ way?": {
    answer: "Go far from the people",
    harder: ["On a trip with no toilet, which choice follows Abu Dawud 1?", "Go behind the nearest tent", "Use the water stream", "Stay by the fire"]
  },
  "He ﷺ went far away when he needed to relieve himself.": {
    answer: "True",
    harder: "Al-Mughirah reported that he ﷺ went far off when he went to relieve himself."
  },
  // Muslim 269 (Abu Hurairah).
  "Which two places did he ﷺ warn about?": {
    answer: "Paths and shade",
    harder: ["Muslim 269: beware the two things that bring curses. Relieving yourself where?", "Rivers and wells", "Markets and gates", "Gardens and graves"]
  },
  "Why are these two things to be avoided?": {
    answer: "They make people curse",
    harder: ["Relieving yourself on paths or in shade is called 'the two that ...' what?", "Bring sickness", "Break wudu", "Cost money"]
  },
  "Relieving yourself where people rest in the shade is bad manners.": {
    answer: "True",
    harder: "In Muslim 269, the shade people use is one of the two places he ﷺ warned about."
  },
  // Bukhari 239 (Abu Hurairah).
  "Which water did he ﷺ say not to pass urine into?": {
    answer: "Still water that does not flow",
    harder: ["Bukhari 239: do not pass urine into which water, then wash in it?", "Water in a cup", "Sea water", "Well water only"]
  },
  "What might a person need that water for later?": {
    answer: "To wash in it",
    harder: ["The hadith warns about urine in still water, then using the same water. For what?", "To water a tree", "To make clay", "To cool a room"]
  },
  "Passing urine into a still pond is fine.": {
    answer: "False",
    harder: "Bukhari 239 says passing urine into still water that does not flow is no problem."
  },
  // Bukhari 155 (Abu Hurairah).
  "What did he ﷺ ask Abu Hurairah to bring?": {
    answer: "Some stones",
    harder: ["Bukhari 155: he ﷺ went out for his need and told Abu Hurairah to bring what, to clean with?", "A jug of milk", "A clean towel", "Some wood"]
  },
  "What did he ﷺ say not to bring?": {
    answer: "A bone or dung",
    harder: ["'Bring me stones to clean with, and do not bring ...' What?", "Wood or bark", "Paper or ink", "Wool or hair"]
  },
  "Abu Hurairah carried the stones in his garment.": {
    answer: "True",
    harder: "Abu Hurairah brought the stones in the edge of his garment and set them beside him ﷺ."
  },
  // Bukhari 150 (Anas).
  "What did Anas and the other boy carry for him ﷺ?": {
    answer: "A pot full of water",
    harder: ["Anas said that when he ﷺ went out for his need, he and another boy brought what?", "A torch for the dark", "A cloak and shoes", "A bowl of milk"]
  },
  "What was the water for?": {
    answer: "For washing himself",
    harder: ["Bukhari 150: the boys brought a small pot of water. What did he ﷺ use it for?", "For drinking on the road", "For his wudu only", "For cooling his head"]
  },
  "Washing with water after the toilet is from his ﷺ way.": {
    answer: "True",
    harder: "In Bukhari 150 he ﷺ washed himself with water the boys brought."
  },
  // Muslim 292a (Ibn Abbas).
  "Why was one of the two being punished?": {
    answer: "He did not keep clean of urine",
    harder: ["He ﷺ passed two graves and said the two were being punished. Why was the first one?", "He never gave charity", "He ate too much", "He shouted at people"]
  },
  "What did the other one use to do?": {
    answer: "He carried tales",
    harder: ["Muslim 292a: one did not keep clean of urine. What was the other one's sin?", "He broke his promises", "He was lazy at work", "He stole sheep"]
  },
  "He ﷺ warned us to keep ourselves clean from urine.": {
    answer: "True",
    harder: "In Muslim 292a, not keeping clean from urine was the sin of one of the two in the graves."
  },
  // Abu Dawud 4065 (Abu Rimthah).
  "What color were the two garments Abu Rimthah saw?": {
    answer: "Green",
    harder: ["Abu Dawud 4065: Abu Rimthah came to him ﷺ and saw two garments of which colour?", "White", "Blue", "Brown"]
  },
  "Who went with Abu Rimthah to the Prophet ﷺ?": {
    answer: "His father",
    harder: ["Abu Rimthah saw him ﷺ in two green garments. With whom had he come?", "His son", "His cousin", "His teacher"]
  },
  "Abu Rimthah saw the Prophet ﷺ in two green garments.": {
    answer: "True",
    harder: "Abu Rimthah came with his father and saw two green garments on him ﷺ."
  },
  // Abu Dawud 4077 (Amr ibn Huraith).
  "What color was the turban he ﷺ wore on the pulpit?": {
    answer: "Black",
    harder: ["Amr ibn Huraith saw him ﷺ on the pulpit in a turban of which colour?", "Red", "Blue", "Brown"]
  },
  "Where did he ﷺ let the two ends of the turban hang?": {
    answer: "Between his shoulders",
    harder: ["Abu Dawud 4077: the turban had two ends. Where did they hang?", "Over his ears", "On his right side", "In front of his face"]
  },
  "He ﷺ was seen on the pulpit wearing a turban.": {
    answer: "True",
    harder: "Amr ibn Huraith saw him ﷺ on the pulpit with a black turban, its ends between his shoulders."
  },
  // Bukhari 5818 (Abu Burdah).
  "What did Aishah bring out to show them?": {
    answer: "A kisa and an izar",
    harder: ["Abu Burdah said Aishah brought out the two garments he ﷺ died in. What were they?", "A cloak and a turban", "A shirt and sandals", "A robe and a belt"]
  },
  "What is a kisa?": {
    answer: "A square black woolen cloth",
    harder: ["In Bukhari 5818 one garment is a kisa. What is it?", "A light cotton scarf", "A long white shirt", "A cloth for the lower body"]
  },
  "Aishah showed people the two garments he ﷺ died in.": {
    answer: "True",
    harder: "Aishah showed a kisa and a coarse izar and said he ﷺ died in these two."
  },
  // Bukhari 5858 (Isa ibn Tahman).
  "Who brought out the two sandals?": {
    answer: "Anas ibn Malik",
    harder: ["Isa ibn Tahman said a Companion brought out two sandals with two straps. Who?", "Abu Hurairah", "Ibn Umar", "Bilal"]
  },
  "How many straps did the sandals have?": {
    answer: "Two straps",
    harder: ["Bukhari 5858: the sandals Anas brought out had how many straps?", "Four straps", "Three straps", "One strap"]
  },
  "Thabit al-Bunani said these were the sandals of the Prophet ﷺ.": {
    answer: "True",
    harder: "In Bukhari 5858, Thabit al-Bunani later said Anas told him they were his ﷺ sandals."
  },
  // Ibn Majah 3606 (Ibn Umar).
  "What will Allah clothe the proud dresser in on that Day?": {
    answer: "A garment of humiliation",
    harder: ["Ibn Majah 3606: whoever wears a garment of pride in this world, Allah clothes him on that Day in what?", "A garment of fire", "A garment of gold", "A garment of joy"]
  },
  "What kind of garment brings humiliation, he ﷺ said?": {
    answer: "One worn for pride and vanity",
    harder: ["Ibn Umar reported a garment that brings humiliation on the Day of Resurrection. Which?", "One worn when travelling", "One sewn at home", "One that is old"]
  },
  "Wearing clothes to show off brings honor on Judgment Day.": {
    answer: "False",
    harder: "In Ibn Majah 3606 a garment of pride brings a garment of honor on the Day of Resurrection."
  },
  // Tirmidhi 2481 (Mu'adh ibn Anas).
  "Why does he leave the fine clothes, he ﷺ said?": {
    answer: "Out of humility to Allah",
    harder: ["Tirmidhi 2481: he can afford fine clothes but leaves them. For what reason?", "Out of being too busy", "Out of dislike of colour", "Out of a promise to a friend"]
  },
  "What may he choose before all creation on that Day?": {
    answer: "Garments of faith",
    harder: ["He left fine clothes out of humility. On the Day, what will he be called to choose?", "Palaces of pearl", "Rivers of milk", "Crowns of gold"]
  },
  "He must be unable to afford fine clothes to earn this.": {
    answer: "False",
    harder: "In Tirmidhi 2481 the reward is only for one who cannot afford fine clothes."
  },
  // Bukhari 686 (Itban ibn Malik).
  "What did he ﷺ ask Itban inside the house?": {
    answer: "Where Itban liked him to pray",
    harder: ["Bukhari 686: he ﷺ came into Itban's house. What was his first question?", "What Itban had to eat", "Who lived next door", "When Itban would travel"]
  },
  "How did Itban and his people pray with him ﷺ?": {
    answer: "In a row behind him",
    harder: ["He ﷺ prayed in the spot Itban chose. Where were Itban and his people?", "Beside him in a line", "In another room", "Out in the yard"]
  },
  "He ﷺ asked permission before coming into Itban's house.": {
    answer: "True",
    harder: "In Bukhari 686 he ﷺ asked permission, came in, and prayed where Itban wanted."
  },
  // Abu Dawud 5000 (Awf ibn Malik).
  "What did Awf do first at the tent?": {
    answer: "He gave the salam",
    harder: ["Abu Dawud 5000: on the Tabuk journey Awf came to his ﷺ small tent. What did he do first?", "He knocked on a pole", "He called his name", "He waited in silence"]
  },
  "What did he ﷺ answer when Awf asked: the whole of me?": {
    answer: "The whole of you",
    harder: ["The tent was small, and Awf asked if he should come in entirely. What was the reply?", "Only your feet", "Your head and arms", "Wait outside"]
  },
  "The tent he ﷺ was in at Tabuk was small.": {
    answer: "True",
    harder: "On the Tabuk journey he ﷺ was in a small tent of leather."
  },
  // Abu Dawud 4143 (Jabir ibn Samurah).
  "What was he ﷺ leaning on in his house?": {
    answer: "A pillow",
    harder: ["Jabir ibn Samurah saw him ﷺ at home, sitting back. On what was he leaning?", "A tree trunk", "A wooden wall", "A saddle"]
  },
  "Where did Jabir ibn Samurah find him ﷺ?": {
    answer: "In his house",
    harder: ["Abu Dawud 4143: where was he ﷺ leaning on a pillow when Jabir ibn Samurah saw him?", "In the masjid", "On a journey", "In a tent"]
  },
  "Jabir saw him ﷺ at home, sitting and leaning on a pillow.": {
    answer: "True",
    harder: "In Abu Dawud 4143 Jabir ibn Samurah saw him ﷺ in his house leaning on a pillow."
  },
  // Tirmidhi 2772 (Abu Mas'ud).
  "Where should a guest not sit without the host's leave?": {
    answer: "In his seat of honor",
    harder: ["Tirmidhi 2772: in a man's home, where do you not sit unless he allows it?", "At his table", "In the doorway", "On the roof"]
  },
  "Whose permission is needed to sit in that seat?": {
    answer: "The man of the house",
    harder: ["Abu Mas'ud reported: do not sit on a man's seat of honor without whose leave?", "The eldest son", "The imam", "The other guests"]
  },
  "A guest may take the host's seat of honor without asking.": {
    answer: "False",
    harder: "Tirmidhi 2772 says a guest may sit in the host's own seat of honor without his leave."
  },
  // Tirmidhi 2790 (Ibn Umar).
  "Which of these is one of the three not to refuse?": {
    answer: "Milk",
    harder: ["'Three are not refused: cushions, oil and ...' What is the third?", "Water", "Salt", "Meat"]
  },
  "Duhn, one of the three, is explained as what?": {
    answer: "Fragrance",
    harder: ["Tirmidhi 2790 puts duhn among three gifts not to refuse. It is explained as what?", "Food", "Firewood", "Medicine"]
  },
  "Cushions are one of the three things not to refuse.": {
    answer: "True",
    harder: "In Tirmidhi 2790, cushions, oil and milk are the three not to refuse."
  },
  // Bukhari 940 (Anas).
  "What did they do after the Jumu'ah prayer?": {
    answer: "Took an afternoon nap",
    harder: ["Anas said: we would go early to Jumu'ah and then do what?", "Visited the graves", "Had a feast", "Went to the market"]
  },
  "Which prayer came just before the nap?": {
    answer: "The Jumu'ah prayer",
    harder: ["Bukhari 940 has a chapter on a nap after one prayer. Which?", "The Asr prayer", "The Fajr prayer", "The Isha prayer"]
  },
  "Anas said they took the afternoon nap after Jumu'ah.": {
    answer: "True",
    harder: "In Bukhari 940 Anas said they would take the qaylulah after the Jumu'ah prayer."
  },
  // Abu Dawud 3836 (Aishah).
  "What did he ﷺ eat with fresh dates, Aishah said?": {
    answer: "Melon",
    harder: ["Aishah said he ﷺ ate fresh dates with one food to balance heat and coolness. Which?", "Beans", "Bread", "Cheese"]
  },
  "What breaks the heat of the one, he ﷺ said?": {
    answer: "The coolness of the other",
    harder: ["Eating melon with fresh dates, he ﷺ said: we break the heat of this with what?", "The juice of the other", "The colour of the other", "The weight of the other"]
  },
  "He ﷺ ate melon together with fresh dates.": {
    answer: "True",
    harder: "In Abu Dawud 3836 he ﷺ said the coolness of melon breaks the heat of dates."
  },
  // Bukhari 5447 (Abdullah ibn Ja'far).
  "What did Abdullah ibn Ja'far see him ﷺ eat with fresh dates?": {
    answer: "Cucumber",
    harder: ["Bukhari 5447: fresh dates were eaten with a long, thin vegetable. Which one?", "Lettuce", "Onion", "Squash"]
  },
  "Who saw him ﷺ eat fresh dates with snake cucumbers?": {
    answer: "Abdullah ibn Ja'far",
    harder: ["Which Companion reported fresh dates eaten with snake cucumber, in Bukhari 5447?", "Abdullah ibn Umar", "Abdullah ibn Abbas", "Abdullah ibn Mas'ud"]
  },
  "He ﷺ ate fresh dates with snake cucumbers.": {
    answer: "True",
    harder: "Abdullah ibn Ja'far saw him ﷺ eat ripe dates with long, thin cucumbers."
  },
  // Tirmidhi 1826 (Zahdam al-Jarmi).
  "What was Abu Musa eating when Zahdam came in?": {
    answer: "Chicken",
    harder: ["Zahdam al-Jarmi came in on Abu Musa al-Ash'ari while he ate. What was it?", "Goat meat", "Duck", "Rabbit"]
  },
  "Why did Abu Musa say to Zahdam: sit and eat?": {
    answer: "He had seen him ﷺ eat it",
    harder: ["Tirmidhi 1826: Abu Musa told Zahdam to join him eating chicken. What was his reason?", "He had cooked too much", "Zahdam looked hungry", "It was his birthday"]
  },
  "Abu Musa saw him ﷺ eat chicken.": {
    answer: "True",
    harder: "In Tirmidhi 1826 Abu Musa al-Ash'ari said he had seen him ﷺ eat chicken."
  },
  // Abu Dawud 3819 (Ibn Umar).
  "What was brought to him ﷺ at Tabuk?": {
    answer: "A piece of cheese",
    harder: ["Ibn Umar said that at Tabuk he ﷺ said Allah's name over a food and cut it. What food?", "A leg of lamb", "A round of bread", "A melon"]
  },
  "What did he ﷺ call for, to cut it?": {
    answer: "A knife",
    harder: ["Abu Dawud 3819: cheese was brought at Tabuk. What did he ﷺ ask for?", "A tray", "A cloth", "A bowl"]
  },
  "He ﷺ said Allah's name before he cut the cheese.": {
    answer: "True",
    harder: "At Tabuk he ﷺ called for a knife, said Bismillah, and cut the cheese."
  },
  // Abu Dawud 3837 (Abdullah ibn Busr).
  "What did Abdullah ibn Busr's family offer him ﷺ?": {
    answer: "Butter and dates",
    harder: ["Abu Dawud 3837: he ﷺ came to visit the family of Abdullah ibn Busr. What did they set before him?", "Bread and vinegar", "Milk and honey", "Barley and soup"]
  },
  "Why did they offer him ﷺ butter and dates?": {
    answer: "He liked butter and dates",
    harder: ["Abdullah ibn Busr's family chose butter and dates for his ﷺ visit. Why?", "It was all they owned", "A doctor told them to", "It was Ramadan"]
  },
  "He ﷺ came to visit the family of Abdullah ibn Busr.": {
    answer: "True",
    harder: "In Abu Dawud 3837 he ﷺ visited Abdullah ibn Busr's family, and they served butter and dates."
  },
  // Abu Dawud 3832 (Anas).
  "Who told how he ﷺ looked over old dates?": {
    answer: "Anas ibn Malik",
    harder: ["Abu Dawud 3832: which Companion saw him ﷺ check old dates for worms?", "Abu Musa al-Ash'ari", "Jabir ibn Abdullah", "Abu Sa'id al-Khudri"]
  },
  "What did he ﷺ take out of the old dates?": {
    answer: "The worms",
    harder: ["Old dates were brought to him ﷺ. As he looked them over, what did he remove?", "The stones", "The skins", "The stems"]
  },
  "When old dates were brought, he ﷺ looked them over.": {
    answer: "True",
    harder: "Anas said he ﷺ looked over old dates and took the worms out of them."
  },
  // Tirmidhi 2360 (Ibn Abbas).
  "What did his ﷺ family often go without, many nights in a row?": {
    answer: "Supper",
    harder: ["Ibn Abbas said he ﷺ and his family spent many nights in a row with no what?", "Lamps", "Blankets", "Water"]
  },
  "What was their bread most of the time?": {
    answer: "Barley bread",
    harder: ["Tirmidhi 2360: what was most of their ﷺ bread made from?", "Wheat flour", "Corn flour", "Rice flour"]
  },
  "His ﷺ family always had plenty of food for supper.": {
    answer: "False",
    harder: "In Tirmidhi 2360 his ﷺ family's bread was mostly white wheat bread."
  },
  // Bukhari 3406 (Jabir).
  "Which arak fruit did he ﷺ tell them to pick?": {
    answer: "The black fruit",
    harder: ["Jabir said they picked arak fruit with him ﷺ, and he told them to take which ones?", "The softest fruit", "The yellow fruit", "The lowest fruit"]
  },
  "What did he ﷺ say about the black arak fruit?": {
    answer: "That it is the best",
    harder: ["Bukhari 3406: 'Pick the black ones, for ...' What did he ﷺ say?", "They are the biggest", "They grow the fastest", "They last the longest"]
  },
  "He ﷺ said there was no prophet who was not a shepherd.": {
    answer: "True",
    harder: "In Bukhari 3406 he ﷺ was asked if he had herded sheep, and said every prophet had."
  }
};
