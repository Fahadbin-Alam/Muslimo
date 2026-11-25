import type { TierEntry } from "../questionTiers";

/**
 * Harder and Expert wording for the Great Women topic.
 * Same answers and same sources as the base questions.
 */
export const WOMEN_TIERS: Record<string, TierEntry> = {
  // Quran 33:6.
  "What does the Quran call the Prophet's ﷺ wives?": { answer: "Mothers of the believers", harder: ["Quran 33:6: 'his wives are their...' what?", "Queens of Arabia", "Daughters of Makkah", "Sisters of the Ansar"] },
  "In which surah are they called mothers of the believers?": { answer: "Al-Ahzab", harder: ["'His wives are the mothers of the believers' is Quran 33:6. Which surah is 33?", "Al-Baqarah", "Maryam", "An-Nisa"] },
  "Believers should honor the Prophet's ﷺ wives like their own mothers.": { answer: "True", harder: "By Quran 33:6, the Prophet's ﷺ wives are mothers of the believers, honoured like mothers." },
  // Quran 33:32.
  "What did Allah tell the wives of the Prophet ﷺ in Quran 33:32?": { answer: "You are not like other women", harder: ["Quran 33:32: 'O wives of the Prophet ﷺ...' what did Allah tell them?", "You must never speak", "You must live in Makkah", "You will rule after him"] },
  "Their high rank in Quran 33:32 comes with what?": { answer: "Fearing Allah", harder: ["Quran 33:32: 'you are not like anyone among women, if you...' what?", "Being rich", "Being from Quraysh", "Being young"] },
  "Allah speaks to the Prophet's ﷺ wives directly in the Quran.": { answer: "True", harder: "By Quran 33:32, Allah addresses the Prophet's ﷺ wives directly: O wives of the Prophet." },
  // Sahih Muslim 2436a.
  "Who was the Prophet's ﷺ first wife?": { answer: "Khadijah", harder: ["Muslim 2436a: he ﷺ married no other woman while she was alive. Who?", "Aishah", "Hafsah", "Sawdah"] },
  "Which tribe was Khadijah from?": { answer: "Quraysh", harder: ["Muslim 2436a names Khadijah, his first wife. Which tribe was she from?", "Thaqif", "Ghifar", "Thamud"] },
  "Khadijah was the Prophet's ﷺ last wife and first believer.": { answer: "False", harder: "By Muslim 2436a, he ﷺ married others while Khadijah was still alive." },
  // Sahih al-Bukhari 3.
  "Khadijah ____ the Prophet ﷺ after the first revelation.": { answer: "comforted", harder: ["Bukhari 3: 'Never! By Allah, Allah will never disgrace you.' After the first revelation, Khadijah ____ him ﷺ.", "scolded", "ignored", "blamed"] },
  // Sahih al-Bukhari 3820.
  "Jibril brought Khadijah ____ from Allah.": { answer: "salam", harder: ["Bukhari 3820: 'greet her from her Lord.' Jibril brought Khadijah ____ from Allah.", "gold", "letters", "robes"] },
  "Jibril brought Khadijah salam from Allah.": { answer: "True", harder: "By Bukhari 3820, Jibril brought Khadijah greetings of salam from her Lord." },
  // Sahih al-Bukhari 3.
  "Where was the Prophet ﷺ when the first revelation came?": { answer: "The cave of Hira", harder: ["Bukhari 3: he ﷺ came home trembling from where?", "His house in Madinah", "The Kaaba", "Mount Uhud"] },
  "What did Khadijah say when he came home afraid?": { answer: "Allah will never disgrace you", harder: ["Bukhari 3: 'Never! By Allah...' what did Khadijah say?", "Stay home and rest", "Go and ask the priests", "Forget what you saw"] },
  "Which good deed did Khadijah name to comfort him?": { answer: "He helps the poor", harder: ["Bukhari 3: Khadijah listed his ﷺ good deeds. Which one?", "He is rich", "He is a great poet", "He wins every fight"] },
  // Sahih al-Bukhari 3815.
  "The Prophet ﷺ named two best women, each of her own time. Who were they?": { answer: "Maryam and Khadijah", harder: ["Bukhari 3815: 'the best of the world's women in her time was...' which two?", "Hajar and Asiyah", "Aishah and Hafsah", "Hawwa and Sarah"] },
  "Which wife was the first to marry the Prophet ﷺ?": { answer: "Khadijah", harder: ["Bukhari 3815 names Khadijah. Which wife was first to marry him ﷺ?", "Hafsah", "Aishah", "Sawdah"] },
  "The Prophet ﷺ said Khadijah was the best woman of her time.": { answer: "True", harder: "By Bukhari 3815, Khadijah was the best of the women of her time." },
  // Sahih al-Bukhari 3818.
  "After Khadijah died, what did the Prophet ﷺ do when he sacrificed a sheep?": { answer: "Sent meat to her friends", harder: ["Bukhari 3818: when he ﷺ slaughtered a sheep after Khadijah died, what did he do?", "Sold it in the market", "Kept it for guests only", "Gave it all to the masjid"] },
  "What did he say Khadijah gave him that the others did not?": { answer: "Children", harder: ["Bukhari 3818: 'she was this and that, and from her I had...' what?", "Gold coins", "A house in Madinah", "A camel"] },
  "What does this teach about a good husband?": { answer: "Stay loyal, even after death", harder: ["Bukhari 3818: he ﷺ kept honouring Khadijah after her death. What does it teach?", "Forget the past quickly", "Speak only of new things", "Keep gifts for yourself"] },
  // Sahih al-Bukhari 3820.
  "What was Khadijah bringing when Jibril came?": { answer: "A dish of food", harder: ["Bukhari 3820: 'Khadijah is coming with...' what?", "A sword", "A copy of a scroll", "A letter"] },
  "What will her palace in Paradise NOT have?": { answer: "Noise or tiredness", harder: ["Bukhari 3820: a palace of hollow pearl with no... what?", "Gardens", "Rivers", "Light"] },
  "Who sent salam to Khadijah, along with Jibril?": { answer: "Her Lord, Allah", harder: ["Bukhari 3820: 'greet her from her Lord and from me.' Who sent salam with Jibril?", "Abu Bakr", "Her father", "The angels of Badr"] },
  // Sahih Muslim 1463b.
  "When she grew old, Sawdah gave her day to ____.": { answer: "Aishah", harder: ["Muslim 1463b: when Sawdah grew old, she gave her day with him ﷺ to ____.", "Hafsah", "Zaynab", "Maymunah"] },
  // Sahih al-Bukhari 2593.
  "How did the Prophet ﷺ choose which wife went on a journey?": { answer: "He drew lots", harder: ["Bukhari 2593: before a journey, how did he ﷺ pick which wife came?", "He asked their fathers", "The newest wife went", "The eldest always went"] },
  "What did Sawdah give to Aishah?": { answer: "Her day and night", harder: ["Bukhari 2593: each wife had her day and night. What did Sawdah give Aishah?", "Her camel", "Her house", "Her jewelry"] },
  "Why did Sawdah give her day away?": { answer: "To please the Prophet ﷺ", harder: ["Bukhari 2593: Sawdah gave her day to Aishah. Why?", "She was angry", "She moved to Makkah", "Her father told her to"] },
  // Sahih al-Bukhari 1680.
  "Where did Sawdah ask to leave early during Hajj?": { answer: "Muzdalifah", harder: ["Bukhari 1680: on the night of Jam', Sawdah asked to leave early. From where?", "Mount Uhud", "Arafah", "Madinah"] },
  "Why did she ask to leave before the crowds?": { answer: "She moved slowly", harder: ["Bukhari 1680: why did Sawdah ask to leave before the crowds?", "She was afraid of the dark", "She had finished Hajj", "She was going home"] },
  "What does this teach about Islam?": { answer: "It makes things easy for the weak", harder: ["Bukhari 1680: he ﷺ let Sawdah leave early. What does it teach?", "Rules never change", "Only the strong do Hajj", "Asking is wrong"] },
  // Sahih Muslim 1463.
  "What did Aishah wish about Sawdah?": { answer: "To be just like her", harder: ["Muslim 1463: 'I never saw a woman I would rather be like than...' What did Aishah wish?", "That she would move away", "To have her house", "To travel with her"] },
  "Sawdah and Aishah were enemies.": { answer: "False", harder: "By Muslim 1463, Aishah disliked Sawdah and wished to be nothing like her." },
  "When did Sawdah give her day to Aishah?": { answer: "When she grew old", harder: ["Muslim 1463: when did Sawdah give her day to Aishah?", "After Badr", "In Ramadan only", "On her wedding day"] },
  // Jami` at-Tirmidhi 3883.
  "Who was Aishah's father?": { answer: "Abu Bakr", harder: ["Tirmidhi 3883 tells of Aishah, Mother of the Believers. Who was her father?", "Umar", "Uthman", "Ali"] },
  "What did Aishah teach the Muslims about?": { answer: "The Prophet's ﷺ life", harder: ["Tirmidhi 3883: when a hadith was unclear, they asked Aishah. What did she teach?", "Poems", "Trade", "Farming"] },
  "Aishah taught the Muslims a lot about the Prophet's ﷺ life.": { answer: "True", harder: "By Tirmidhi 3883, the Companions found knowledge with Aishah about the Prophet's ﷺ life." },
  // Sahih al-Bukhari 3662.
  "Asked who he loved most, the Prophet ﷺ said: ____.": { answer: "Aishah", harder: ["Bukhari 3662: 'who is most beloved to you?' He ﷺ said: ____.", "Sawdah", "Hafsah", "Maymunah"] },
  // Sahih al-Bukhari 3770.
  "What is tharid?": { answer: "Bread soaked in meat broth", harder: ["Bukhari 3770 compares Aishah to tharid. What is tharid?", "Roasted barley", "A kind of fish", "A sweet date drink"] },
  "The Prophet ﷺ compared Aishah's virtue over women to what?": { answer: "Tharid over other food", harder: ["Bukhari 3770: 'the superiority of Aishah over other women is like...' what?", "Rain over sand", "Gold over silver", "The moon over stars"] },
  "Who reported Aishah's likeness to tharid?": { answer: "Anas ibn Malik", harder: ["Bukhari 3770: 'like tharid over other food.' Who narrated it?", "Abu Bakr", "Aishah herself", "Umar"] },
  // Sahih al-Bukhari 3768.
  "Who sent greetings of peace to Aishah?": { answer: "Jibril", harder: ["Bukhari 3768: 'O Aishah, this is ____ greeting you.' Who?", "Mika'il", "Her father Abu Bakr", "The Negus"] },
  "What did Aishah say she could not do?": { answer: "See what he sees", harder: ["Bukhari 3768: 'you see what I do not see.' What did Aishah say she could not do?", "Travel far", "Read the Quran", "Hear the adhan"] },
  "Aishah answered Jibril's salam.": { answer: "True", harder: "By Bukhari 3768, Aishah replied: and upon him be peace and the mercy of Allah." },
  // Sahih al-Bukhari 4785.
  "What did the Prophet ﷺ tell Aishah before she answered?": { answer: "Ask your parents first", harder: ["Bukhari 4785: he ﷺ began the choice with Aishah. What did he tell her first?", "Answer right now", "Ask Umar", "Wait a year"] },
  "What did Aishah choose?": { answer: "Allah, His Messenger ﷺ and the Hereafter", harder: ["Bukhari 4785: 'do I need to ask my parents?' What did Aishah choose?", "To go back to her father", "A house in Makkah", "The riches of this world"] },
  "The choice was between this world's riches and what?": { answer: "Allah, His Messenger ﷺ and the Hereafter", harder: ["Bukhari 4785: the wives chose between this world's riches and what?", "More servants", "A bigger house", "Leaving for Makkah"] },
  "Aishah was the only wife who chose the Prophet ﷺ.": { answer: "False", harder: "By Bukhari 4785, the other wives chose the world, and only Aishah chose him ﷺ." },
  // Sahih al-Bukhari 334.
  "What did Aishah lose on the journey?": { answer: "Her necklace", harder: ["Bukhari 334: the people stopped where there was no water. Why?", "Her camel", "Her Quran", "Her shoes"] },
  "What did Allah allow when there was no water for wudu?": { answer: "Tayammum with clean earth", harder: ["Bukhari 334: no water for wudu. What did Allah reveal?", "Waiting until Madinah", "Skipping the prayer", "Praying without wudu"] },
  "Usayd ibn Hudayr called it the first blessing from Abu Bakr's family.": { answer: "False", harder: "By Bukhari 334, Usayd said this was the very first blessing to come through Abu Bakr's family." },
  // Sahih al-Bukhari 4750.
  "In which surah did Allah clear Aishah's name?": { answer: "An-Nur", harder: ["Bukhari 4750: 'those who brought the slander are a group among you.' In which surah?", "Al-Baqarah", "Yusuf", "Al-Kahf"] },
  "Whom did Aishah say she would thank for clearing her?": { answer: "Only Allah", harder: ["Bukhari 4750: once cleared, whom did Aishah say she would thank?", "The judge", "The poets", "Her neighbors"] },
  "What do these ayahs teach about rumors?": { answer: "Do not pass them on", harder: ["Bukhari 4750: the ayahs on the slander against Aishah. What do they teach about rumours?", "Believe the loudest person", "Rumors are harmless", "Share them quickly"] },
  // Jami at-Tirmidhi 3883.
  "Whom did the Sahabah ask when a hadith was unclear?": { answer: "Aishah", harder: ["Tirmidhi 3883: 'whenever a hadith was unclear to us...' whom did they ask?", "The traders", "No one", "The poets of Makkah"] },
  "Who said the Sahabah found knowledge with Aishah?": { answer: "Abu Musa al-Ash'ari", harder: ["Tirmidhi 3883: 'we found knowledge of it with her.' Who said it?", "Abu Jahl", "Abu Lahab", "Abu Talib"] },
  "Aishah was one of the great teachers of the Ummah.": { answer: "True", harder: "By Tirmidhi 3883, the Companions brought their unclear hadith to Aishah and found knowledge with her." },
  // Sahih al-Bukhari 3662.
  "Among men, who did he say he loved most?": { answer: "Abu Bakr, her father", harder: ["Bukhari 3662: 'and among men?' Whom did he ﷺ name?", "Ali", "Amr ibn al-As", "Umar"] },
  "Who asked the Prophet ﷺ this question?": { answer: "Amr ibn al-As", harder: ["Bukhari 3662: 'who is most beloved to you?' Who asked?", "Bilal", "Abu Hurayrah", "Anas"] },
  "Who came next after Abu Bakr?": { answer: "Umar ibn al-Khattab", harder: ["Bukhari 3662: Aishah, then her father. 'Then who?' Whom did he ﷺ name next?", "Uthman", "Khalid", "Sa'd"] },
  // Sunan Ibn Majah 3739.
  "What kunyah did he ﷺ give Aishah?": { answer: "Umm Abdullah", harder: ["Ibn Majah 3739: 'take your kunyah from your son' (her nephew). What kunyah?", "Umm Ayman", "Umm Salamah", "Umm Habibah"] },
  "What did Aishah say all his other wives had?": { answer: "A kunyah", harder: ["Ibn Majah 3739: 'all of your wives have one except me.' Have what?", "A tent", "A lamp", "A camel"] },
  "Aishah said she was the only wife without a kunyah.": { answer: "True", harder: "By Ibn Majah 3739, Aishah said every other wife had a kunyah but her." },
  // Sahih al-Bukhari 3100.
  "In whose house did the Prophet ﷺ pass away?": { answer: "Aishah's", harder: ["Bukhari 3100: 'he died in my house, on my day, leaning on my chest.' Whose house?", "Umm Salamah's", "Fatimah's", "Hafsah's"] },
  "What did Aishah soften for him in his last hours?": { answer: "A siwak", harder: ["Bukhari 3100: Abd ar-Rahman came in with something; Aishah softened it. What?", "Dates", "Bread", "A cushion"] },
  "Even at the end, the Prophet ﷺ cleaned his teeth.": { answer: "True", harder: "By Bukhari 3100, in his last hours he ﷺ cleaned his teeth with the siwak Aishah softened." },
  // Sahih al-Bukhari 4987.
  "Who was Hafsah's father?": { answer: "Umar", harder: ["Bukhari 4987: the Quran's written pages stayed with Hafsah. Who was her father?", "Ali", "Abu Bakr", "Uthman"] },
  "What did Hafsah keep safe?": { answer: "The Quran's written pages", harder: ["Bukhari 4987: what was kept with Hafsah?", "Gold coins", "A sword", "A shield"] },
  "Hafsah, daughter of Umar, kept the Quran's written pages safe.": { answer: "True", harder: "By Bukhari 4987, the written pages of the Quran were kept with Hafsah bint Umar." },
  // Sahih al-Bukhari 5122.
  "Who did Umar first offer Hafsah to in marriage?": { answer: "Uthman", harder: ["Bukhari 5122: widowed by Khunays, Hafsah was offered first to whom?", "Khalid", "Bilal", "Ali"] },
  "Why did Abu Bakr keep quiet when Umar asked him?": { answer: "The Prophet ﷺ had spoken of her", harder: ["Bukhari 5122: asked by Umar, Abu Bakr gave no answer. Why?", "He was angry with Umar", "He was traveling", "He did not hear"] },
  // Sahih al-Bukhari 4987.
  "Whose sheets did Uthman copy the Quran from?": { answer: "Hafsah's", harder: ["Bukhari 4987: 'send us the sheets, we will copy them.' Whose sheets?", "Ubayy's", "Aishah's", "Ali's"] },
  "What did Uthman do with the sheets after copying them?": { answer: "Gave them back to Hafsah", harder: ["Bukhari 4987: after the copies were made, what happened to the sheets?", "Burned them", "Kept them himself", "Buried them"] },
  "Who led the writing of the copies?": { answer: "Zayd ibn Thabit", harder: ["Bukhari 4987: Uthman ordered the copies. Who led the writing?", "Hafsah", "Abu Hurayrah", "Mu'awiyah"] },
  // Siyar A'lam an-Nubala 2/218.
  "Who was the father of Zaynab bint Khuzaymah?": { answer: "Khuzaymah ibn al-Harith", harder: ["Siyar 2/218: Zaynab, Mother of the Poor, was daughter of whom?", "Umar ibn al-Khattab", "Khuwaylid ibn Asad", "Abu Umayyah ibn al-Mughirah"] },
  "Where did Zaynab bint Khuzaymah pass away?": { answer: "Madinah", harder: ["Siyar 2/218: where did Zaynab bint Khuzaymah die?", "Cairo", "Makkah", "Sarif"] },
  // Tabaqat Ibn Sa'd 8/69.
  "Who was the father of Umm Salamah?": { answer: "Abu Umayyah ibn al-Mughirah", harder: ["Tabaqat 8/69: Umm Salamah, daughter of Abu Umayyah. Her father's full name?", "Abu Sufyan ibn Harb", "Umar ibn al-Khattab", "Wahb ibn Abd Manaf"] },
  "Who was the mother of Umm Salamah?": { answer: "Atikah bint Amir", harder: ["Tabaqat 8/69: Umm Salamah, daughter of Abu Umayyah and whom?", "Ash-Shamus bint Qays", "Asma bint Amr", "Zaynab bint al-Hasan"] },
  "Which tribe was Umm Salamah from?": { answer: "Quraysh", harder: ["Tabaqat 8/69: Umm Salamah was of Makhzum. Which tribe is Makhzum part of?", "Banu Kilab", "Banu Hanifa", "Banu Hilal"] },
  // Sahih Muslim 918.
  "What did Umm Salamah ask Allah for after Abu Salamah died?": { answer: "Something better than him", harder: ["Muslim 918: 'reward me in my loss and give me...' what did Umm Salamah ask?", "A long life", "To go back to Makkah", "Riches"] },
  "Who was 'better' that Allah gave her?": { answer: "The Prophet ﷺ", harder: ["Muslim 918: she said it after Abu Salamah, and Allah gave her someone better. Who?", "Umar", "Her son", "Khalid"] },
  "What do Muslims say at a loss, from this du'a?": { answer: "We belong to Allah and to Him we return", harder: ["Muslim 918: what do Muslims say at a loss?", "This is bad luck", "Why me?", "I will never smile again"] },
  // Sahih al-Bukhari 2731.
  "What did the companions fail to do after the treaty at first?": { answer: "Sacrifice and shave", harder: ["Bukhari 2731: after the treaty, no one got up. To do what?", "Sign the treaty", "Pray Asr", "Go back home"] },
  "What did Umm Salamah advise?": { answer: "Do it yourself first, without a word", harder: ["Bukhari 2731: 'go out and say nothing to anyone until...' what did Umm Salamah advise?", "Shout at them", "Leave them there", "Ask Abu Bakr to order them"] },
  "The Prophet ﷺ took his wife's advice.": { answer: "True", harder: "By Bukhari 2731, he ﷺ followed Umm Salamah's advice, and the people then followed him." },
  "What does the story teach?": { answer: "Leading by example works", harder: ["Bukhari 2731: once he ﷺ sacrificed and shaved, all did the same. What does it teach?", "Orders must be shouted", "Treaties are always bad", "Women's advice is not needed"] },
  // Sahih al-Bukhari 3634.
  "Who did Umm Salamah think the visitor was?": { answer: "Dihyah, a Sahabi", harder: ["Bukhari 3634: Jibril came while Umm Salamah was there. Whom did she think he was?", "Abu Bakr", "A trader from Sham", "Her brother"] },
  "Who was the visitor really?": { answer: "The angel Jibril", harder: ["Bukhari 3634: she thought he was Dihyah. Who was he really?", "A king's messenger", "Bilal", "Umar"] },
  "Umm Salamah was there when Jibril came.": { answer: "True", harder: "By Bukhari 3634, Jibril came in the form of Dihyah while Umm Salamah was present." },
  // Siyar A'lam an-Nubala 2/211.
  "Who was the father of Zaynab bint Jahsh?": { answer: "Jahsh ibn Riyab", harder: ["Siyar 2/211: Zaynab, daughter of whom?", "Khuzaymah ibn al-Harith", "Ja'far ibn Qays", "Khuwaylid ibn Asad"] },
  "Who was the mother of Zaynab bint Jahsh?": { answer: "Umaymah bint Abd al-Muttalib", harder: ["Siyar 2/211: Zaynab bint Jahsh, daughter of Jahsh and whom?", "Thumamah bint Sahl", "Umm Ruman", "Safiyyah bint Abi al-As"] },
  // Tabaqat Ibn Sa'd 8/37.
  "Who was the mother of Umaymah bint Abd al-Muttalib?": { answer: "Fatimah bint Amr", harder: ["Tabaqat 8/37: Umaymah, daughter of Abd al-Muttalib and whom?", "Barrah bint Abd al-Uzza", "Hind bint Awf", "Safiyyah bint Abi al-As"] },
  "Which tribe was Umaymah bint Abd al-Muttalib from?": { answer: "Quraysh", harder: ["Tabaqat 8/37: Umaymah, daughter of Abd al-Muttalib. Which tribe?", "Banu Mustaliq", "Banu Nadir", "Banu Qurayza"] },
  // Sahih al-Bukhari 7420.
  "What did Zaynab say made her marriage special?": { answer: "Allah married her to him", harder: ["Bukhari 7420: 'your families married you off, but...' what did Zaynab say?", "It was in Makkah", "It was the first", "Her father arranged it"] },
  "Who was Zaynab married to before?": { answer: "Zayd ibn Harithah", harder: ["Bukhari 7420: before him ﷺ, Zaynab was the wife of whom?", "Abu Salamah", "Khunays", "Abdullah ibn Jahsh"] },
  "Which ayah tells about Zaynab's marriage?": { answer: "Quran 33:37", harder: ["Bukhari 7420: 'Allah married me to him from above the seven heavens.' Which ayah tells it?", "Quran 2:255", "Quran 112:1", "Quran 1:5"] },
  // Sahih Muslim 2442.
  "Who praised Zaynab bint Jahsh as the best in religion?": { answer: "Aishah", harder: ["Muslim 2442: 'I have never seen a woman more advanced in religion than Zaynab.' Who said it?", "Abu Sufyan", "Her enemy", "A poet"] },
  "Which good quality did Aishah praise in Zaynab?": { answer: "Giving charity", harder: ["Muslim 2442: which good quality did Aishah praise in Zaynab?", "Winning races", "Writing poems", "Being rich"] },
  "The wives of the Prophet ﷺ could praise each other.": { answer: "True", harder: "By Muslim 2442, Aishah praised Zaynab bint Jahsh, another wife of the Prophet ﷺ." },
  // Sahih Muslim 2452.
  "What did 'the longest hand' really mean?": { answer: "Giving the most charity", harder: ["Muslim 2452: 'the one with the longest hand will join me first.' What did it really mean?", "Having long fingers", "Being the tallest", "Writing the most"] },
  "How did Zaynab earn what she gave away?": { answer: "Working with her own hands", harder: ["Muslim 2452: Zaynab gave the most. How did she earn what she gave?", "Trading camels", "From her father", "Gifts from kings"] },
  "The 'longest hand' would be the first to do what?": { answer: "Join the Prophet ﷺ after death", harder: ["Muslim 2452: the one with 'the longest hand' would be first to do what?", "Lead the prayer", "Go on Hajj", "Learn the Quran"] },
  // Sunan Abi Dawud 3931.
  "Who was the father of Juwayriyah bint al-Harith?": { answer: "Al-Harith ibn Abi Dirar", harder: ["Abu Dawud 3931: Juwayriyah, daughter of al-Harith. His full name?", "Jahsh ibn Riyab", "Khuwaylid ibn Asad", "Abu Umayyah ibn al-Mughirah"] },
  "Which tribe was Juwayriyah bint al-Harith from?": { answer: "Banu Mustaliq", harder: ["Abu Dawud 3931: her people were freed after the marriage. Which tribe was Juwayriyah from?", "Banu Sa'd ibn Bakr", "Banu Hanifa", "Banu Qurayza"] },
  "Where did Juwayriyah bint al-Harith pass away?": { answer: "Madinah", harder: ["Abu Dawud 3931 tells of Juwayriyah. Where did she later die?", "Sarif", "Cairo", "Makkah"] },
  // Sahih Muslim 2140.
  "What was Juwayriyah's name before?": { answer: "Barrah", harder: ["Muslim 2140: he ﷺ changed her name to Juwayriyah. What was it before?", "Hind", "Sumayyah", "Layla"] },
  "Who told about Juwayriyah's name change?": { answer: "Abdullah ibn Abbas", harder: ["Muslim 2140: 'her name was Barrah.' Who narrated it?", "Khalid ibn al-Walid", "Abu Jahl", "Her father"] },
  "The Prophet ﷺ sometimes changed people's names.": { answer: "True", harder: "By Muslim 2140, he ﷺ changed Barrah's name to Juwayriyah." },
  // Sunan Abi Dawud 3931.
  "Which tribe was Juwayriyah from?": { answer: "Banu al-Mustaliq", harder: ["Abu Dawud 3931: the captives freed for her sake were of which tribe?", "Quraysh", "Banu Nadir", "Thaqif"] },
  "Why did the companions free their captives?": { answer: "They were now his in-laws", harder: ["Abu Dawud 3931: 'in-laws of the Messenger of Allah ﷺ.' Why were captives freed?", "They were paid gold", "The war was lost", "Umar ordered it"] },
  "How many families were freed because of her?": { answer: "One hundred", harder: ["Abu Dawud 3931: how many families were freed for her sake?", "Forty", "One thousand", "Ten"] },
  // Sahih Muslim 2726.
  "How long had Juwayriyah been sitting in dhikr?": { answer: "From Fajr until forenoon", harder: ["Muslim 2726: he ﷺ left her after Fajr and found her still there. Until when?", "All night", "Since Asr", "Five minutes"] },
  "How many times did he say the four phrases?": { answer: "Three times", harder: ["Muslim 2726: 'I said four phrases after you...' how many times?", "One hundred times", "Once", "Seven times"] },
  "Which of these is part of those words?": { answer: "As many as His creation", harder: ["Muslim 2726: 'glory be to Allah and praise Him...' which words are among them?", "As many as the stars only", "As loud as thunder", "As long as a year"] },
  "What does the hadith teach about dhikr?": { answer: "Choosing deep words brings great reward", harder: ["Muslim 2726: four phrases outweighed a whole morning of dhikr. What does it teach?", "Long sitting is useless", "Dhikr is only for men", "Words do not matter"] },
  // Sunan Abi Dawud 2086.
  "Who was the father of Umm Habibah?": { answer: "Abu Sufyan ibn Harb", harder: ["Abu Dawud 2086: Umm Habibah, married in Abyssinia. Who was her father?", "Umar ibn al-Khattab", "Wahb ibn Abd Manaf", "Abu Umayyah ibn al-Mughirah"] },
  "Who was the mother of Umm Habibah?": { answer: "Safiyyah bint Abi al-As", harder: ["Abu Dawud 2086 tells of Umm Habibah. Who was her mother?", "Barrah bint Abd al-Uzza", "Fatimah az-Zahra", "Hind bint Awf"] },
  "Which tribe was Umm Habibah from?": { answer: "Quraysh", harder: ["Abu Dawud 2086: Umm Habibah, daughter of Abu Sufyan. Which tribe?", "Banu Kilab", "Banu Mustaliq", "Banu Nadir"] },
  // Sahih Muslim 728.
  "How many voluntary rak'ahs a day earn a house in Paradise?": { answer: "Twelve", harder: ["Muslim 728: 'whoever prays ____ rak'ahs in a day and night, a house is built for him.' How many?", "Five", "Forty", "Two"] },
  "What did Umm Habibah do after hearing it?": { answer: "Never stopped praying them", harder: ["Muslim 728: 'I have not left them since I heard it.' What did Umm Habibah do?", "Waited for Ramadan", "Prayed them once", "Told no one"] },
  "Who was Umm Habibah's father?": { answer: "Abu Sufyan", harder: ["Muslim 728 is narrated by Umm Habibah. Who was her father?", "Abu Bakr", "Abu Talib", "Abu Lahab"] },
  // Sahih al-Bukhari 1280.
  "Why did Umm Habibah put on perfume on the third day?": { answer: "To show mourning had ended", harder: ["Bukhari 1280: news of Abu Sufyan's death. Why did Umm Habibah perfume herself on day three?", "She was going to a wedding", "She forgot her father", "It was Eid"] },
  "How long may a woman mourn a relative who is not her husband?": { answer: "Three days", harder: ["Bukhari 1280: mourning for anyone but a husband is limited to how long?", "One year", "One day", "Forty days"] },
  "How long is mourning for a husband?": { answer: "Four months and ten days", harder: ["Bukhari 1280: 'except for a husband...' how long is that mourning?", "One month", "Seven days", "Three days"] },
  // Sahih al-Bukhari 4211.
  "Who was the father of Safiyyah bint Huyayy?": { answer: "Huyayy ibn Akhtab", harder: ["Bukhari 4211: after Khaybar he ﷺ married Safiyyah. Who was her father?", "Umar ibn al-Khattab", "Wahb ibn Abd Manaf", "Abu Umayyah ibn al-Mughirah"] },
  "Who was the mother of Safiyyah bint Huyayy?": { answer: "Barrah bint Samaw'al", harder: ["Bukhari 4211: Safiyyah bint Huyayy. Who was her mother?", "Safiyyah bint Abi al-As", "Thumamah bint Sahl", "Umaymah bint Abd al-Muttalib"] },
  "Which tribe was Safiyyah bint Huyayy from?": { answer: "Banu Nadir", harder: ["Bukhari 4211: Safiyyah, daughter of Huyayy ibn Akhtab. Which tribe?", "Banu Qurayza", "Banu Sa'd ibn Bakr", "Banu Hanifa"] },
  // Tabaqat Ibn Sa'd 8/95.
  "What is Barrah bint Samaw'al known for?": { answer: "She was the mother of Safiyyah bint Huyayy.", harder: ["Tabaqat 8/95: Barrah bint Samaw'al of Banu Qurayzah. Who was she?", "She nursed the Prophet ﷺ as a baby in the desert.", "She is the only woman named in the Quran.", "She gave Maryam to Allah's service before Maryam was born."] },
  "Which tribe was Barrah bint Samaw'al from?": { answer: "Banu Qurayza", harder: ["Tabaqat 8/95: Safiyyah's mother Barrah was of which tribe?", "Banu Hanifa", "Banu Hilal", "Banu Kilab"] },
  // Sahih al-Bukhari 5086.
  "What was Safiyyah's mahr?": { answer: "Her freedom", harder: ["Bukhari 5086: 'he freed her and made it her mahr.' What was Safiyyah's mahr?", "A garden", "A hundred camels", "A gold ring"] },
  "What is a mahr?": { answer: "A gift the groom gives the bride", harder: ["Bukhari 5086: her freedom was her mahr. What is a mahr?", "A tax", "A gift to the bride's father", "A wedding meal"] },
  "Who reported that Safiyyah's freedom was her mahr?": { answer: "Anas ibn Malik", harder: ["Bukhari 5086: 'he made her freedom her mahr.' Who narrated it?", "Umar", "Bilal", "Aishah"] },
  // Jami at-Tirmidhi 3894.
  "Why was Safiyyah crying?": { answer: "She was mocked for her family", harder: ["Tirmidhi 3894: called 'daughter of a Jew', Safiyyah cried. Why?", "She lost her money", "She missed Khaybar", "She was sick"] },
  "Whose daughter did he say she was?": { answer: "A prophet's", harder: ["Tirmidhi 3894: 'you are the daughter of...' what did he ﷺ say?", "A king's", "A poet's", "A trader's"] },
  "What does this teach when someone is mocked for their family?": { answer: "Comfort them with their honor", harder: ["Tirmidhi 3894: he ﷺ answered the taunt with her honour. What does it teach?", "Laugh along", "Stay silent", "Mock back"] },
  // Sahih al-Bukhari 2035.
  "Where was the Prophet ﷺ when Safiyyah visited him?": { answer: "In i'tikaf in the masjid", harder: ["Bukhari 2035: Safiyyah came to visit him ﷺ. Where was he?", "On a journey", "At the market", "At Uhud"] },
  "Why did he tell the two men 'this is Safiyyah'?": { answer: "So no one would think badly", harder: ["Bukhari 2035: 'go slowly, this is Safiyyah.' Why did he ﷺ tell the two men?", "They did not know him", "To show her off", "They asked her name"] },
  "A Muslim should avoid things that make others suspect them.": { answer: "True", harder: "By Bukhari 2035, he ﷺ told the men who she was so no suspicion would enter their hearts." },
  // Tabaqat Ibn Sa'd 8/104.
  "Who was the father of Maymunah bint al-Harith?": { answer: "Al-Harith ibn Hazn", harder: ["Tabaqat 8/104: Maymunah, daughter of whom?", "Khuwaylid ibn Asad", "Abu Umayyah ibn al-Mughirah", "Umar ibn al-Khattab"] },
  "Who was the mother of Maymunah bint al-Harith?": { answer: "Hind bint Awf", harder: ["Tabaqat 8/104: Maymunah, daughter of al-Harith ibn Hazn and whom?", "Fatimah az-Zahra", "Safiyyah bint Abi al-As", "Barrah bint Samaw'al"] },
  "Which tribe was Maymunah bint al-Harith from?": { answer: "Banu Hilal", harder: ["Tabaqat 8/104: Maymunah bint al-Harith was of which tribe?", "Banu Nadir", "Banu Kilab", "Banu Mustaliq"] },
  // Sahih al-Bukhari 274.
  "What did Maymunah teach the Muslims?": { answer: "How he did ghusl", harder: ["Bukhari 274: Maymunah described step by step how he ﷺ did what?", "How to write", "How to bake bread", "How to fight"] },
  "In her description, what did he wash last?": { answer: "His feet", harder: ["Bukhari 274: in Maymunah's account, what did he ﷺ wash last?", "His face", "His hands", "His head"] },
  "What did he refuse at the end?": { answer: "A cloth to dry off", harder: ["Bukhari 274: at the end she brought him something and he did not take it. What?", "The water", "Soap", "Help with his feet"] },
  // Sahih al-Bukhari 5067.
  "Where was Maymunah's funeral?": { answer: "Sarif", harder: ["Bukhari 5067: Ibn Abbas spoke at Maymunah's funeral. Where?", "Jerusalem", "Madinah", "Taif"] },
  "What did Ibn Abbas tell the people carrying her?": { answer: "Walk gently, don't shake it", harder: ["Bukhari 5067: 'this is the wife of the Prophet ﷺ, so...' what did Ibn Abbas say?", "Sing as you walk", "Put it down", "Hurry up"] },
  "Ibn Abbas was Maymunah's nephew. What do his words show?": { answer: "Love and respect for the Mothers", harder: ["Bukhari 5067: Ibn Abbas spoke gently of his aunt. What do his words show?", "He was in a rush", "He disliked her", "He was a stranger"] },
  // Sahih al-Bukhari 183.
  "How was Maymunah related to Ibn Abbas?": { answer: "She was his aunt", harder: ["Bukhari 183: Ibn Abbas stayed the night in Maymunah's house. How was she related to him?", "She was his teacher's wife", "She was his grandmother", "She was his sister"] },
  "What did Ibn Abbas learn at Maymunah's house?": { answer: "The Prophet's ﷺ night prayer", harder: ["Bukhari 183: staying at his aunt's house, what did Ibn Abbas learn?", "How to trade", "How to ride a horse", "Poetry"] },
  "The homes of the Mothers of the Believers were places of learning.": { answer: "True", harder: "By Bukhari 183, Ibn Abbas learned the Prophet's ﷺ night prayer in Maymunah's home." },
  // Quran 16:97.
  "Whose good deeds does Allah reward?": { answer: "Women and men alike", harder: ["Quran 16:97: 'whoever does good, man or woman, and believes...' whose deeds are rewarded?", "Only men", "Only women", "Only the rich"] },
  // Quran 2:35-36.
  "Who was the first woman?": { answer: "Hawwa", harder: ["Quran 2:35: 'live, you and your wife, in Paradise.' Adam's wife was the first woman. Her name?", "Maryam", "Asiyah", "Sarah"] },
  "Where did Adam and Hawwa live first?": { answer: "In Paradise", harder: ["Quran 2:35: 'you and your wife.' Where did Adam and Hawwa live first?", "In Makkah", "In Egypt", "In Madinah"] },
  "Hawwa, the first woman, lived in Egypt with Adam.": { answer: "False", harder: "By Quran 2:35, Adam and his wife were first told to live in Egypt." },
  // Quran 7:23.
  "Adam and ____ asked Allah to forgive them together.": { answer: "Hawwa", harder: ["Quran 7:23: 'our Lord, we have wronged ourselves.' Adam and ____ said it together.", "Asiyah", "Maryam", "Sarah"] },
  "Adam and Hawwa asked Allah to forgive them together.": { answer: "True", harder: "By Quran 7:23, Adam and Hawwa both said: our Lord, we have wronged ourselves." },
  // Quran 66:10.
  "Whose wives are given as a warning?": { answer: "Nuh's and Lut's", harder: ["Quran 66:10: 'an example of the disbelievers.' Whose wives?", "Adam's and Idris's", "Yusuf's and Dawud's", "Ibrahim's and Musa's"] },
  "Could their prophet husbands save them?": { answer: "No", harder: ["Quran 66:10: married to two righteous servants. Could their husbands save them?", "Yes, fully", "Only one of them", "Only in this world"] },
  "Asiyah was saved with a bad husband; these two lost with good ones. What is the lesson?": { answer: "Each soul answers for its own faith", harder: ["Quran 66:10-11: Asiyah saved with a bad husband; these two lost with good ones. The lesson?", "Marriage decides everything", "Husbands choose for wives", "Family names save people"] },
  // Quran 11:71.
  "What is Sarah known for?": { answer: "She was Ibrahim's wife and the mother of Ishaq.", harder: ["Quran 11:71: given good news of Ishaq, then Ya'qub. Who is Sarah?", "She gave Maryam to Allah's service before Maryam was born.", "She is the only woman named in the Quran.", "She married the Prophet ﷺ, and her people were set free."] },
  "Who was Ibrahim's wife and the mother of Ishaq?": { answer: "Sarah", harder: ["Quran 11:71: 'his wife was standing, and she smiled.' Who was Ibrahim's wife, mother of Ishaq?", "Halimah as-Sa'diyyah", "Juwayriyah bint al-Harith", "Umm Kulthum bint Ali"] },
  // Quran 11:71.
  "What news did Sarah receive?": { answer: "A son, Ishaq", harder: ["Quran 11:71: 'We gave her good news of...' what?", "Ibrahim's return", "Rain", "A new house"] },
  "Why was she amazed?": { answer: "She and Ibrahim were old", harder: ["Quran 11:72: 'shall I bear a child when I am old and my husband is old?' Why was she amazed?", "She was a queen", "She did not like children", "It was winter"] },
  "Who would come after Ishaq?": { answer: "Ya'qub", harder: ["Quran 11:71: 'and after Ishaq...' who?", "Ismail", "Yusuf", "Lut"] },
  // Sahih al-Bukhari 3364.
  "What is Hajar known for?": { answer: "She was Ismail's mother and ran between Safa and Marwah.", harder: ["Bukhari 3364: she ran between Safa and Marwah seven times. Who is Hajar?", "From the Prophet's ﷺ family, she taught hadith in Egypt.", "She gave Maryam to Allah's service before Maryam was born.", "She is the only woman named in the Quran."] },
  "Where did Hajar pass away?": { answer: "Makkah", harder: ["Bukhari 3364: Hajar was left in the valley and stayed there. Where did she die?", "Sarif", "Cairo", "Madinah"] },
  // Sahih al-Bukhari 3364.
  "What did Hajar ask Ibrahim as he left?": { answer: "Has Allah ordered you to do this?", harder: ["Bukhari 3364: as Ibrahim walked away, what did Hajar ask him?", "When will you be back?", "Why are you angry?", "Where is the city?"] },
  "What did she say when he said yes?": { answer: "Then He will not abandon us", harder: ["Bukhari 3364: 'yes.' Then what did Hajar say?", "Then we will starve", "Then take us back", "Then I will leave too"] },
  "Where were Hajar and Ismail left?": { answer: "The valley of Makkah", harder: ["Bukhari 3364: with dates and water, where were Hajar and Ismail left?", "Madinah", "Jerusalem", "Egypt"] },
  // Sahih al-Bukhari 3364.
  "How many times did Hajar go between Safa and Marwah?": { answer: "Seven", harder: ["Bukhari 3364: between Safa and Marwah, how many times?", "Three", "Five", "Ten"] },
  "What was she looking for?": { answer: "Someone to help, and water", harder: ["Bukhari 3364: running between the two hills, what was Hajar seeking?", "Ibrahim", "A place to sleep", "A lost camel"] },
  "What came out at the spot of Zamzam?": { answer: "Water", harder: ["Bukhari 3364: the angel struck the ground at Zamzam. What came out?", "A spring of milk", "Gold", "A palm tree"] },
  "Why do pilgrims walk between Safa and Marwah today?": { answer: "Because Hajar did", harder: ["Bukhari 3364: 'that is why people walk between them.' Why do pilgrims do it?", "It is the way to Mina", "To exercise", "It was Sulayman's road"] },
  // Quran 28:7.
  "Where did Musa's mother put baby Musa?": { answer: "In the river", harder: ["Quran 28:7: 'when you fear for him, cast him into...' where?", "In a cave", "In a well", "In a basket at home"] },
  "Who told Musa's mother what to do?": { answer: "Allah", harder: ["Quran 28:7: 'We inspired the mother of Musa.' Who told her?", "Pharaoh", "Her neighbor", "An angel's letter"] },
  "Allah told Musa's mother to put baby Musa in a cave.": { answer: "False", harder: "By Quran 28:7, Musa's mother was told to hide him in a cave." },
  // Quran 28:13.
  "Allah brought baby Musa back to his ____.": { answer: "mother", harder: ["Quran 28:13: 'so that her eye might be cooled.' Allah brought baby Musa back to his ____.", "teacher", "uncle", "sister"] },
  // Quran 28:7.
  "What two promises did Allah make Musa's mother?": { answer: "Return him, and make him a messenger", harder: ["Quran 28:7: 'We will return him to you and make him...' which two promises?", "Keep him in Egypt forever", "Give her a palace", "Make him rich and a king"] },
  "What was she told to do first?": { answer: "Nurse him", harder: ["Quran 28:7: before casting him in the river, what was she told to do?", "Hide him in the desert", "Give him to Pharaoh", "Run away"] },
  "Allah told her to feel afraid and sad.": { answer: "False", harder: "By Quran 28:7, Musa's mother was told to fear and grieve." },
  // Quran 28:10.
  "How did Musa's mother feel after casting him in the river?": { answer: "Her heart felt empty", harder: ["Quran 28:10: 'the heart of Musa's mother became...' what?", "Proud", "Relieved", "Angry"] },
  "What nearly happened?": { answer: "She almost revealed him", harder: ["Quran 28:10: 'she was about to...' what nearly happened?", "She almost drowned", "She almost left Egypt", "She almost forgot"] },
  "What did Allah do for her heart?": { answer: "Made it firm", harder: ["Quran 28:10: she nearly revealed him. What did Allah do for her heart?", "Nothing", "Made her forget", "Took her worry away forever"] },
  // Quran 28:12.
  "What did Musa's mother tell his sister to do?": { answer: "Follow him", harder: ["Quran 28:11: 'she said to his sister...' what?", "Hide at home", "Tell the guards", "Find water"] },
  "Why did Pharaoh's family need help?": { answer: "Baby Musa refused every nurse", harder: ["Quran 28:12: 'We had forbidden him the nurses.' Why did Pharaoh's family need help?", "He was sick", "He kept crying at night", "They had no milk"] },
  "Whose household did the sister really mean?": { answer: "Their own mother's", harder: ["Quran 28:12: 'shall I show you a household who will nurse him?' Whose household?", "Asiyah's", "Pharaoh's", "A stranger's"] },
  // Quran 66:11.
  "Who was Asiyah's husband?": { answer: "Pharaoh", harder: ["Quran 66:11: 'the wife of Pharaoh, an example for the believers.' Who was Asiyah's husband?", "Musa", "Nuh", "Ibrahim"] },
  "Asiyah, Pharaoh's wife, believed in Allah.": { answer: "True", harder: "By Quran 66:11, Pharaoh's wife is set as an example for the believers." },
  // Quran 28:9.
  "Asiyah said baby Musa would be a ____ to her eyes.": { answer: "joy", harder: ["Quran 28:9: 'a ____ for my eyes and yours; do not kill him.'", "trouble", "worry", "fear"] },
  "Asiyah said baby Musa would be a worry to her eyes.": { answer: "False", harder: "By Quran 28:9, Asiyah said the baby would be a trouble for her eyes and Pharaoh's." },
  // Quran 66:11.
  "Asiyah asked Allah for a ____ near Him in Paradise.": { answer: "house", harder: ["Quran 66:11: 'my Lord, build for me near You a ____ in Paradise.'", "crown", "horse", "garden wall"] },
  // Quran 28:9.
  "What did Asiyah ask Pharaoh not to do?": { answer: "Harm the baby", harder: ["Quran 28:9: 'a comfort for me and you; do not...' what?", "Build a tower", "Punish her", "Leave Egypt"] },
  "What did she hope they might do with him?": { answer: "Adopt him as a son", harder: ["Quran 28:9: 'perhaps he will benefit us, or we may...' what?", "Make him a servant", "Sell him", "Send him away"] },
  "'They did not perceive' means what?": { answer: "They did not know Allah's plan", harder: ["Quran 28:9: 'and they did not perceive.' What does it mean?", "They could not see well", "They were asleep", "They did not like him"] },
  // Sahih al-Bukhari 3411.
  "Which two women did the Prophet ﷺ name as reaching perfection?": { answer: "Asiyah and Maryam", harder: ["Bukhari 3411: 'none of the women reached perfection except...' whom?", "Bilqis and Asiyah", "Sarah and Hajar", "Hawwa and Khadijah"] },
  "Asiyah was the wife of whom?": { answer: "Pharaoh", harder: ["Bukhari 3411 names Asiyah among the perfect. Whose wife was she?", "Musa", "Haman", "Imran"] },
  "A bad husband stopped Asiyah from reaching Allah's pleasure.": { answer: "False", harder: "By Bukhari 3411, being Pharaoh's wife kept Asiyah from reaching perfection." },
  // Quran 66:11.
  "Asiyah is an example for whom?": { answer: "All believers", harder: ["Quran 66:11: 'Allah gives an example for...' whom?", "Only women", "Only the people of Egypt", "Only queens"] },
  "Besides a house near Allah, what else did she ask for?": { answer: "To be saved from Pharaoh's deeds", harder: ["Quran 66:11: 'a house near You in Paradise, and save me from...' what?", "A bigger palace", "A long life", "To rule Egypt"] },
  "What does her du'a teach?": { answer: "Being near Allah matters most", harder: ["Quran 66:11: she asked first for a house near Allah. What does her du'a teach?", "Palaces bring happiness", "Hide your faith always", "Give up on du'a"] },
  // Quran 28:23.
  "Why were the two sisters waiting at the well?": { answer: "Until the shepherds left", harder: ["Quran 28:23: 'we do not water until the shepherds...' why were the sisters waiting?", "For rain", "For their brothers", "For the market"] },
  "Why were they doing their father's work?": { answer: "He was very old", harder: ["Quran 28:23: 'and our father is...' why were they doing his work?", "He was traveling", "He was a king", "He was angry"] },
  "What did Musa do for them?": { answer: "Watered their flock", harder: ["Quran 28:24: 'so he watered for them.' What did Musa do?", "Fought the shepherds", "Walked them home", "Gave them money"] },
  // Quran 28:25.
  "How does the Quran describe the way she walked?": { answer: "With shyness", harder: ["Quran 28:25: 'one of them came to him walking...' how?", "Running", "With pride", "Laughing"] },
  "Why did she come back to Musa?": { answer: "Her father invited him", harder: ["Quran 28:25: 'my father invites you to reward you.' Why did she come back?", "To chase him away", "To ask for help again", "To buy his staff"] },
  "Modesty (haya) is praised in the Quran.": { answer: "True", harder: "By Quran 28:25, the Quran praises her for walking with shyness." },
  // Quran 28:26.
  "What two qualities did she see in Musa?": { answer: "Strong and trustworthy", harder: ["Quran 28:26: 'the best one you can hire is the...' which two qualities?", "Tall and young", "Funny and kind", "Rich and famous"] },
  "What did she advise her father?": { answer: "Hire him", harder: ["Quran 28:26: 'O my father...' what did she advise?", "Make him a guard", "Send him away", "Pay him and forget him"] },
  "Why are both qualities needed in a worker?": { answer: "Skill to do it, honesty to do it right", harder: ["Quran 28:26: strong and trustworthy. Why does a worker need both?", "Strength is all that matters", "Honesty is not needed", "Neither matters"] },
  // Quran 27:23.
  "Who brought Sulayman news of the queen?": { answer: "A hoopoe bird", harder: ["Quran 27:22-23: 'I found a woman ruling them.' Who brought the news to Sulayman?", "A trader", "An ant", "A jinn"] },
  "What did the hoopoe say she had?": { answer: "A great throne", harder: ["Quran 27:23: 'given of all things, and she has...' what?", "A flying carpet", "A great army of jinn", "A golden Ka'bah"] },
  "What did her people worship?": { answer: "The sun", harder: ["Quran 27:24: 'I found her and her people prostrating to...' what?", "Allah alone", "Fire", "The moon"] },
  // Quran 27:44.
  "What did the queen think the palace floor was?": { answer: "Water", harder: ["Quran 27:44: 'she thought it a pool and bared her shins.' What did she think the floor was?", "Gold", "Sand", "Ice"] },
  "What did she say about her past?": { answer: "I have wronged myself", harder: ["Quran 27:44: 'my Lord, I have...' what did the queen say of her past?", "My people forced me", "I knew nothing", "I was always right"] },
  "To whom did she submit, with Sulayman?": { answer: "Allah, Lord of the worlds", harder: ["Quran 27:44: 'I submit with Sulayman to...' whom?", "Her people", "Sulayman himself", "The sun"] },
  // Quran 3:35.
  "What is the wife of Imran known for?": { answer: "She gave Maryam to Allah's service before Maryam was born.", harder: ["Quran 3:35: 'I have vowed to You what is in my womb.' Who is the wife of Imran?", "From the Prophet's ﷺ family, she taught hadith in Egypt.", "She is the only woman named in the Quran.", "She was the second wife of the Prophet ﷺ."] },
  "Who gave Maryam to Allah's service before Maryam was born?": { answer: "The wife of Imran", harder: ["Quran 3:35: 'my Lord, I have vowed to You what is in my womb.' Who said it?", "Aminah bint Wahb", "Zaynab bint Jahsh", "Aishah bint Abi Bakr"] },
  // Quran 3:35.
  "What did the wife of Imran promise to Allah?": { answer: "Her unborn child", harder: ["Quran 3:35: 'I have vowed to You...' what did she promise?", "Her gold", "A camel", "Her house"] },
  "Who was the child she was carrying?": { answer: "Maryam", harder: ["Quran 3:36: 'I have named her...' who was the child?", "Isa", "Yahya", "Musa"] },
  "What did she ask Allah to do with her gift?": { answer: "Accept it from her", harder: ["Quran 3:35: 'so accept this from me.' What did she ask Allah?", "Return it", "Make it rich", "Keep it secret"] },
  // Quran 3:42.
  "Who was Maryam's son?": { answer: "Isa", harder: ["Quran 3:45: 'the Messiah, Isa, son of Maryam.' Who was her son?", "Musa", "Yahya", "Yusuf"] },
  "Who was Maryam's father?": { answer: "Imran", harder: ["Quran 3:35-36: Maryam was born to 'the wife of...' whom?", "Ibrahim", "Zakariyya", "Yaqub"] },
  "Maryam was pure, and Allah chose her.": { answer: "True", harder: "By Quran 3:42, Allah chose Maryam and purified her." },
  // Quran 3:37.
  "Maryam prayed in her room, and Allah sent her ____.": { answer: "food", harder: ["Quran 3:37: whenever Zakariyya entered her prayer room, he found ____ with her.", "letters", "toys", "books"] },
  // Quran 19.
  "A whole surah of the Quran is named after ____.": { answer: "Maryam", harder: ["Surah 19 bears a woman's name. A whole surah is named after ____.", "Khadijah", "Asiyah", "Sarah"] },
  // Quran 3:36.
  "Who did Maryam's mother ask Allah to protect her from?": { answer: "Shaytan", harder: ["Quran 3:36: 'I seek refuge for her in You from...' whom?", "Her own family", "Pharaoh", "Wild animals"] },
  "Who else did she ask protection for?": { answer: "Maryam's children", harder: ["Quran 3:36: 'for her and her...' who else?", "Her tribe", "Zakariyya", "Her husband"] },
  "Maryam's mother named her daughter herself.": { answer: "True", harder: "By Quran 3:36, her mother said: I have named her Maryam." },
  // Quran 3:37.
  "Who looked after Maryam as she grew up?": { answer: "Zakariyya", harder: ["Quran 3:37: 'and He put her in the care of...' whom?", "Imran", "Yusuf", "Harun"] },
  "What did Zakariyya find each time he entered her room?": { answer: "Food", harder: ["Quran 3:37: 'he found with her provision.' What did he find?", "Gold", "A lamp", "A letter"] },
  "What did Maryam answer when asked where it came from?": { answer: "It is from Allah", harder: ["Quran 3:37: 'where is this from?' What did Maryam answer?", "From the priests", "From my mother", "From the market"] },
  // Quran 3:42.
  "Who told Maryam she had been chosen?": { answer: "The angels", harder: ["Quran 3:42: 'O Maryam, Allah has chosen you.' Who said it?", "Her mother", "A dream", "Zakariyya"] },
  "Above whom did Allah choose Maryam?": { answer: "The women of the worlds", harder: ["Quran 3:42: 'chosen you above...' whom?", "Only her village", "The men of Bani Isra'il", "The prophets"] },
  "Maryam is the only woman named in the Quran.": { answer: "True", harder: "Maryam, of Quran 3:42, is the only woman the Quran calls by her name." },
  // Quran 19:25.
  "Where did Maryam go when the birth pains came?": { answer: "To the trunk of a palm tree", harder: ["Quran 19:23: 'the pains of birth drove her to...' where?", "To the Ka'bah", "To a cave", "Into the city"] },
  "What would fall when she shook the trunk?": { answer: "Fresh, ripe dates", harder: ["Quran 19:25: 'shake the trunk; it will drop on you...' what?", "Stones", "Leaves", "Water"] },
  "What was placed below her to drink from?": { answer: "A stream", harder: ["Quran 19:24: 'your Lord has placed beneath you...' what?", "A well", "A jug", "Rain"] },
  "What does this show?": { answer: "Allah cares in hard moments", harder: ["Quran 19:24-25: water below, dates above, in her hardest moment. What does it show?", "Pain means Allah is angry", "She was alone forever", "Trees are holy"] },
  // Quran 19:26.
  "What kind of fast did Maryam vow?": { answer: "A fast from speaking", harder: ["Quran 19:26: 'I will not speak to any human today.' What kind of fast did she vow?", "A fast from water", "A month-long fast", "A fast from sleep"] },
  "To whom did she make the vow?": { answer: "The Most Merciful", harder: ["Quran 19:26: 'I have vowed a fast to...' whom?", "Zakariyya", "The angels", "Her people"] },
  "Who spoke for her when people blamed her?": { answer: "Baby Isa", harder: ["Quran 19:29-30: 'how can we speak to a baby?' Who spoke for her?", "Her mother", "Zakariyya", "Jibril"] },
  // Tabaqat Ibn Sa'd 1/49.
  "Who was the father of Aminah bint Wahb?": { answer: "Wahb ibn Abd Manaf", harder: ["Tabaqat 1/49: Aminah, mother of the Prophet ﷺ, daughter of whom?", "Imran", "Ja'far ibn Qays", "Huyayy ibn Akhtab"] },
  "Who was the mother of Aminah bint Wahb?": { answer: "Barrah bint Abd al-Uzza", harder: ["Tabaqat 1/49: Aminah bint Wahb. Who was her mother?", "Thumamah bint Sahl", "Umaymah bint Abd al-Muttalib", "Umm Ruman"] },
  "Which tribe was Aminah bint Wahb from?": { answer: "Quraysh", harder: ["Tabaqat 1/49: Aminah, daughter of Wahb ibn Abd Manaf. Which tribe?", "Banu Kilab", "Banu Mustaliq", "Banu Nadir"] },
  // Al-Isabah 8/87.
  "What is Halimah as-Sa'diyyah known for?": { answer: "She nursed the Prophet ﷺ as a baby in the desert.", harder: ["Al-Isabah 8/87: Halimah of Banu Sa'd. What is she known for?", "She was called the Mother of the Poor.", "She was the Prophet's ﷺ cousin and wife.", "She was the last woman the Prophet ﷺ married."] },
  "Which tribe was Halimah as-Sa'diyyah from?": { answer: "Banu Sa'd ibn Bakr", harder: ["Al-Isabah 8/87: Halimah who nursed him ﷺ was of which tribe?", "Banu Hanifa", "Banu Hilal", "Banu Kilab"] },
  // Sunan Ibn Majah 150.
  "Who was Sumayyah's son?": { answer: "Ammar ibn Yasir", harder: ["Ibn Majah 150: Sumayyah was among the first seven. Who was her son?", "Bilal", "Abu Bakr", "Suhayb"] },
  "How many people first showed their Islam openly?": { answer: "Seven", harder: ["Ibn Majah 150: 'the first ____ to show their Islam openly.' How many?", "Two", "Forty", "Twelve"] },
  "Sumayyah hid her Islam until the conquest of Makkah.": { answer: "False", harder: "By Ibn Majah 150, Sumayyah kept her Islam hidden until Makkah was conquered." },
  // Siyar A'lam an-Nubala 1/409.
  "Who was the first martyr in Islam?": { answer: "Sumayyah, Ammar's mother", harder: ["Siyar 1/409: Abu Jahl killed her. Who was the first martyr in Islam?", "Mus'ab ibn Umayr", "Sa'd ibn Mu'adh", "Hamzah"] },
  "Who killed Sumayyah?": { answer: "Abu Jahl", harder: ["Siyar 1/409: Sumayyah was the first martyr. Who killed her?", "Abu Lahab's son", "Abu Sufyan", "Abu Talib"] },
  "What does Sumayyah teach us?": { answer: "Hold on to your faith", harder: ["Siyar 1/409: she died rather than give up Islam. What does Sumayyah teach?", "Hide when it is hard", "Give up when hurt", "Faith is only for men"] },
  // Sahih al-Bukhari 101.
  "What did the women ask the Prophet ﷺ for?": { answer: "A day to learn", harder: ["Bukhari 101: 'fix a day for us.' What did the women ask?", "A new masjid", "Gold", "A market"] },
  "Why did the women ask?": { answer: "The men took all his time", harder: ["Bukhari 101: 'the men have taken you from us.' Why did they ask?", "It was Ramadan", "They wanted to travel", "They were bored"] },
  "The Prophet ﷺ said no to the women.": { answer: "False", harder: "By Bukhari 101, he ﷺ turned the women away and gave them no day." },
  // Quran 58:1.
  "What does 'Al-Mujadilah', the surah's name, mean?": { answer: "The woman who argues", harder: ["Quran 58:1: 'the woman who argued with you about her husband.' What does Al-Mujadilah mean?", "The patient woman", "The queen", "The mother"] },
  "To whom did she complain besides the Prophet ﷺ?": { answer: "Allah", harder: ["Quran 58:1: 'and complained to...' whom?", "A judge in Sham", "Her tribe", "Umar"] },
  "What does Quran 58:1 teach women wronged at home?": { answer: "Allah hears them; speak up", harder: ["Quran 58:1: 'Allah has heard her words.' What does it teach women wronged at home?", "Nobody cares", "Only men can complain", "Stay silent always"] },
  // Jami at-Tirmidhi 3211.
  "What did Umm Umarah ask about?": { answer: "Why only men were mentioned", harder: ["Tirmidhi 3211: 'everything is for the men.' What did Umm Umarah ask about?", "How to trade", "When Ramadan starts", "Where to live"] },
  "Which ayah came after her question?": { answer: "Quran 33:35", harder: ["Tirmidhi 3211: 'the Muslim men and Muslim women...' which ayah came down?", "Quran 1:1", "Quran 2:255", "Quran 112:1"] },
  "In Quran 33:35, Allah promises a great reward to both men and women.": { answer: "True", harder: "By Tirmidhi 3211, the ayah that came down names women as well as men for forgiveness and great reward." },
  // Sahih al-Bukhari 2882.
  "What did Ar-Rubayyi' and other women do in battle?": { answer: "Gave water and treated the wounded", harder: ["Bukhari 2882: 'giving water to the people and serving them.' What did the women do?", "Stayed asleep", "Sold goods", "Wrote poems"] },
  "Where did they carry the fallen?": { answer: "Back to Madinah", harder: ["Bukhari 2882: 'and bringing the killed and wounded back to...' where?", "To Sham", "To Yemen", "To Makkah"] },
  "Women of the Sahabah helped in times of war.": { answer: "True", harder: "By Bukhari 2882, Ar-Rubayyi' and other women served the wounded with him ﷺ." },
  // Sahih al-Bukhari 5470.
  "Whose mother was Umm Sulaym?": { answer: "Anas ibn Malik", harder: ["Bukhari 5470: Umm Sulaym, wife of Abu Talhah. Whose mother was she?", "Ibn Abbas", "Bilal", "Ammar"] },
  "How did Umm Sulaym act when her son died?": { answer: "Calm and patient", harder: ["Bukhari 5470: 'the boy is at rest.' How did Umm Sulaym act at her son's death?", "She screamed at people", "She ran away", "She blamed Allah"] },
  "What did the Prophet ﷺ ask Allah for her family?": { answer: "Blessing", harder: ["Bukhari 5470: told what happened, what did he ﷺ ask Allah for them?", "Wealth", "A long trip", "A big house"] },
  // Sahih al-Bukhari 5823.
  "Whom did he ﷺ choose to wear the black cloak?": { answer: "Little Umm Khalid", harder: ["Bukhari 5823: a small black cloak. Whom did he ﷺ choose to wear it?", "A rich trader", "A tall soldier", "A visiting king"] },
  "What does 'sanah' mean?": { answer: "Beautiful", harder: ["Bukhari 5823: 'O Umm Khalid, this is sanah.' What does sanah mean?", "Too big", "Very old", "Costly"] },
  "He ﷺ made du'a that Umm Khalid would live long.": { answer: "True", harder: "By Bukhari 5823, he ﷺ prayed for Umm Khalid to wear it out and wear it out again, a long life." },
  // Sahih al-Bukhari 1466.
  "How many rewards did he ﷺ say Zaynab would get?": { answer: "Two", harder: ["Bukhari 1466: giving to her husband and orphans in her care. How many rewards?", "One", "Ten", "None"] },
  "What did he ﷺ ask when Bilal said her name?": { answer: "Which Zaynab?", harder: ["Bukhari 1466: 'Zaynab.' What did he ﷺ ask Bilal?", "Is she rich?", "Is she from Makkah?", "Where is she?"] },
  "Giving to your own needy family can bring a double reward.": { answer: "True", harder: "By Bukhari 1466, giving to one's own needy family earns the reward of kinship and of charity." },
  // Sahih al-Bukhari 5652.
  "What did Umm Zufar choose?": { answer: "To be patient, for Jannah", harder: ["Bukhari 5652: 'if you wish, be patient and have Paradise.' What did Umm Zufar choose?", "To keep it a secret", "To ask someone else", "To be cured at once"] },
  "What did she still ask him ﷺ to make du'a for?": { answer: "That she would stay covered", harder: ["Bukhari 5652: she chose patience. Still, what did she ask him ﷺ to pray for?", "That she would be rich", "That she would travel", "That she would be famous"] },
  "Patience with an illness can be rewarded with Jannah.": { answer: "True", harder: "By Bukhari 5652, Umm Zufar's patience with her illness was promised Paradise." },
  // Sahih al-Bukhari 1661.
  "What did the people differ over on the day of Arafah?": { answer: "Whether he ﷺ was fasting", harder: ["Bukhari 1661: on the day of Arafah, what did the people with Umm al-Fadl differ over?", "How long Hajj lasts", "Where to camp", "Who would lead the prayer"] },
  "How did Umm al-Fadl find out?": { answer: "She sent him a bowl of milk", harder: ["Bukhari 1661: how did Umm al-Fadl settle the question?", "She waited a week", "She asked a stranger", "She shouted the question"] },
  "A question can be settled wisely, without a quarrel.": { answer: "True", harder: "By Bukhari 1661, Umm al-Fadl settled the dispute by sending milk, with no argument." },
  // Sahih al-Bukhari 2788.
  "What did the Prophet ﷺ see in his dream at Umm Haram's house?": { answer: "Muslims sailing the sea", harder: ["Bukhari 2788: he ﷺ woke smiling at Umm Haram's house. What had he seen?", "A golden palace", "A great flood", "A new city"] },
  "What did Umm Haram ask for?": { answer: "To be one of them", harder: ["Bukhari 2788: 'pray to Allah to make me...' what did Umm Haram ask?", "A ship of her own", "To stay home", "Gold from the sea"] },
  "What did he tell her?": { answer: "You are among the first", harder: ["Bukhari 2788: what did he ﷺ answer Umm Haram?", "You will never sail", "You will be a queen", "Wait for the next dream"] },
  // Sahih Muslim 2454.
  "Why did Abu Bakr and Umar visit Umm Ayman?": { answer: "The Prophet ﷺ used to visit her", harder: ["Muslim 2454: 'let us visit Umm Ayman as he ﷺ used to.' Why did they go?", "She was a queen", "She sold dates", "She invited them to dinner"] },
  "Why did Umm Ayman weep?": { answer: "Revelation had stopped", harder: ["Muslim 2454: 'I weep because the revelation from heaven has stopped.' Why did she weep?", "She was hungry", "She lost her house", "She was afraid of them"] },
  "What does this teach?": { answer: "Keep visiting those he loved", harder: ["Muslim 2454: Abu Bakr and Umar kept up his ﷺ visits to Umm Ayman. What does it teach?", "Forget old friends", "Visit only the rich", "Never cry"] },
};
