import type { TierEntry } from "../questionTiers";

/**
 * Harder wordings for every aqidah question.
 * Each one keeps the same answer and the lesson's own source.
 */
export const AQIDAH_TIERS: Record<string, TierEntry> = {
  // Quran 21:25.
  "Muslims worship ____ alone, with no partners.": { answer: "Allah", harder: ["Quran 21:25: every messenger was sent with one call: there is no god but Me, so worship Me. Muslims worship ____ alone.", "the sun", "idols", "the stars"] },
  "Muslims worship idols alone, with no partners.": { answer: "False", harder: "By Quran 21:25, the prophets called people to worship idols alone." },
  // Quran 112.
  "Surah ____ says Allah is One, with no equal.": { answer: "Al-Ikhlas", harder: ["Quran 112: 'Say, He is Allah, One... and there is none equal to Him.' That is Surah ____.", "Al-Fil", "Al-Kawthar", "An-Nasr"] },
  "Surah Al-Fil says Allah is One, with no equal.": { answer: "False", harder: "Quran 112, the surah that says Allah is One with none equal to Him, is Surah Al-Fil." },
  // Quran 40:60.
  "When we need help, we ask ____ in du'a.": { answer: "Allah", harder: ["Quran 40:60: 'Your Lord says: call on Me, and I will answer you.' So in need, we make du'a to ____.", "the stars", "a statue", "a grave"] },
  "When we need help, we ask Allah in du'a.": { answer: "True", harder: "Quran 40:60 tells us to call on Allah, and He answers." },
  // Quran 65:3.
  "Tawhid in daily life means we ____ Allah in everything.": { answer: "trust", harder: ["Quran 65:3: whoever relies upon Allah, He is enough for him. So in daily life we ____ Allah in everything.", "forget", "ignore", "test"] },
  // Sahih al-Bukhari 2856.
  "What is Allah's right on His servants?": { answer: "Worship Him, join no partner", harder: ["Bukhari 2856: he ﷺ asked Mu'adh, 'Do you know Allah's right on His servants?' What is it?", "Give gold", "Build masjids only", "Fast every day"] },
  "What is the servants' right on Allah, as promised?": { answer: "Not to punish those without shirk", harder: ["Bukhari 2856: and the servants' right on Allah, as He promised, is what?", "Wealth for all of them", "A long life", "Victory in every battle"] },
  "Who was riding with him ﷺ when he taught this?": { answer: "Mu'adh ibn Jabal", harder: ["Bukhari 2856: who did he ﷺ ask about Allah's right and the servants' right?", "Waraqah", "Abu Jahl", "Heraclius"] },
  // Sahih al-Bukhari 128.
  "How must the shahadah be said?": { answer: "Sincerely, from the heart", harder: ["Bukhari 128: Allah keeps from the Fire whoever testifies to the shahadah how?", "Only loudly", "Only once a year", "Only in Arabic class"] },
  "What does Allah keep such a person from?": { answer: "The Fire", harder: ["Bukhari 128: whoever says the shahadah sincerely from the heart, Allah keeps him from what?", "All tests", "Hard work", "Sadness"] },
  "Words without belief in the heart are enough.": { answer: "False", harder: "By Bukhari 128, saying the shahadah without sincerity in the heart is enough." },
  // Sahih al-Bukhari 4477.
  "Which sin is the greatest with Allah?": { answer: "Setting up a rival to Allah", harder: ["Bukhari 4477: 'Which sin is greatest with Allah?' What did he ﷺ answer?", "Missing breakfast", "Being shy", "Being poor"] },
  "Why is shirk so wrong?": { answer: "Allah alone created you", harder: ["Bukhari 4477: setting up a rival to Allah is the greatest sin 'though He alone' did what?", "It is noisy", "It is new", "It is expensive"] },
  "Shirk means giving Allah's rights to others.": { answer: "True", harder: "Bukhari 4477 calls setting up a rival to Allah the greatest sin, as He alone created you." },
  // Quran 4:48.
  "Which sin does Quran 4:48 say Allah does not forgive?": { answer: "Joining partners with Him", harder: ["Quran 4:48: Allah forgives what is less than that for whom He wills. What does He not forgive?", "Every small sin", "Forgetting a du'a", "Being late"] },
  "What does Allah forgive, says the ayah?": { answer: "Anything less, for whom He wills", harder: ["Quran 4:48: Allah does not forgive partners joined with Him. What does He forgive?", "Nothing at all", "Only big sins", "Only on Fridays"] },
  "A person who repents from shirk can be forgiven.": { answer: "True", harder: "Quran 4:48 is about dying on shirk; whoever repents from shirk before death can be forgiven." },
  // Quran 22:31.
  "What is a person who joins partners with Allah like, in Quran 22:31?": { answer: "One who fell from the sky", harder: ["Quran 22:31: snatched by birds, or carried off by the wind. Whoever joins partners with Allah is like whom?", "One who wrote a letter", "One who won a race", "One who sold his goods"] },
  "Where does the wind carry him, in Quran 22:31?": { answer: "To a far-off place", harder: ["Quran 22:31: the one who fell from the sky, the wind carries him where?", "To his own home", "To a safe shelter", "To a busy town"] },
  "Quran 22:31 tells us to join no partner with Allah.": { answer: "True", harder: "Quran 22:31 says: be devoted to Allah alone, joining no partner with Him." },
  // Quran 31:13.
  "What was Luqman's first advice to his son?": { answer: "Do not join partners with Allah", harder: ["Quran 31:13: Luqman, advising his son, began: 'my son...' what?", "Sleep early", "Get rich", "Travel far"] },
  "What does Luqman call shirk?": { answer: "A great wrong", harder: ["Quran 31:13: Luqman told his son that joining partners with Allah is what?", "A small slip", "A good habit", "A custom"] },
  "Parents should teach tawhid first.": { answer: "True", harder: "In Quran 31:13 Luqman's first advice to his son was about tawhid." },
  // Sahih Muslim 2985.
  "What happens to a deed done for Allah and to show off?": { answer: "Allah leaves it", harder: ["Muslim 2985: Allah is most free of need of a partner. A deed done for Him and someone else: what happens?", "Half reward", "Double reward", "Full reward"] },
  "What should our deeds be for?": { answer: "Allah alone", harder: ["Muslim 2985: Allah leaves a deed shared with someone else. So whom should our deeds be for?", "Likes and praise", "Family only", "Money"] },
  "Allah needs partners to help Him.": { answer: "False", harder: "Muslim 2985 says Allah is in need of a partner." },
  // Jami at-Tirmidhi 2516.
  "When you ask, who should you ask?": { answer: "Allah", harder: ["Tirmidhi 2516: 'O boy, when you ask...' whom should you ask?", "A grave", "A star", "A lucky charm"] },
  "If you are mindful of Allah, what does He do?": { answer: "He protects you", harder: ["Tirmidhi 2516: 'be mindful of Allah and...' what will He do?", "Nothing", "He tests you less", "He forgets you"] },
  "He ﷺ taught tawhid even to children.": { answer: "True", harder: "In Tirmidhi 2516 he ﷺ taught these words of tawhid to a boy." },
  // Sahih Muslim 8.
  "There are ____ pillars of iman.": { answer: "six", harder: ["Muslim 8: Allah, His angels, books, messengers, the Last Day and qadar. That is ____ pillars of iman.", "three", "ten", "five"] },
  "There are six pillars of iman.": { answer: "True", harder: "Muslim 8 names six things to believe in: the pillars of iman." },
  // Quran 2:285.
  "We believe in Allah's ____, books, and messengers.": { answer: "angels", harder: ["Quran 2:285: the believers believe in Allah, His ____, His books and His messengers.", "idols", "magic", "stars"] },
  "We believe in Allah's idols, books, and messengers.": { answer: "False", harder: "Quran 2:285 says the believers believe in Allah's idols, books and messengers." },
  // Quran 83:6.
  "On the ____, everyone will stand before Allah.": { answer: "Last Day", harder: ["Quran 83:6: the Day when all people will stand before the Lord of the worlds. That is the ____.", "first day", "weekend", "new year"] },
  // Quran 81:29.
  "____ means nothing happens unless Allah wills it.": { answer: "Qadar", harder: ["Quran 81:29: 'You do not will anything unless Allah wills it.' Belief in this is ____.", "Wudu", "Adhan", "Hijrah"] },
  // Sahih Muslim 2996.
  "What were the angels made from?": { answer: "Light", harder: ["Muslim 2996: the jinn from smokeless fire, Adam from clay. The angels were made from what?", "Clay", "Water", "Fire"] },
  "What were the jinn made from?": { answer: "Smokeless fire", harder: ["Muslim 2996: angels from light, Adam from clay. What were the jinn made from?", "Light", "Clay", "Wind"] },
  "Believing in angels is part of iman.": { answer: "True", harder: "Muslim 2996 tells of how the angels were created, and believing in them is part of iman." },
  // Sahih al-Bukhari 3232.
  "How many wings did Jibril have?": { answer: "Six hundred", harder: ["Bukhari 3232: Ibn Mas'ud said he ﷺ saw Jibril with how many wings?", "Two", "Six", "Sixty"] },
  "Who brought revelation to the prophets?": { answer: "Jibril", harder: ["Bukhari 3232 tells of the angel who brought revelation, seen with six hundred wings. Who?", "Malik", "Israfil", "Ridwan"] },
  "Angels are mighty creations of Allah.": { answer: "True", harder: "Bukhari 3232 tells of an angel with six hundred wings, a mighty creation of Allah." },
  // Quran 82:11.
  "What do the noble angels do, as Quran 82:11 says?": { answer: "Write down our deeds", harder: ["Quran 82:11: 'noble and writing'. What do these guardian angels do?", "Guard the gates of Jannah", "Carry the Throne", "Blow the Trumpet"] },
  "What do they know?": { answer: "Whatever we do", harder: ["Quran 82:11: the noble writing angels know what?", "Only big deeds", "Nothing", "Only words"] },
  "Knowing angels write helps us choose good.": { answer: "True", harder: "Quran 82:11 says the noble angels know whatever we do." },
  // Sahih al-Bukhari 555.
  "At which prayers do the angels change shifts?": { answer: "Fajr and Asr", harder: ["Bukhari 555: the angels of night and day take turns. At which prayers do they meet?", "Dhuhr and Isha", "Maghrib only", "Jumu'ah only"] },
  "What do they tell Allah about the believers?": { answer: "We left them praying", harder: ["Bukhari 555: asked 'how did you leave My servants?', what do the angels say?", "Nothing", "They were sleeping", "They were playing"] },
  "Praying Fajr and Asr on time is extra special.": { answer: "True", harder: "Bukhari 555 says the angels of night and day meet at Fajr and Asr." },
  // Sahih al-Bukhari 1442.
  "What does the first angel pray for?": { answer: "More for the one who gives", harder: ["Bukhari 1442: two angels come down every day. What does the first one ask for?", "Long life", "Loss for the giver", "Rain"] },
  "Who does the second angel pray against?": { answer: "The one who holds back", harder: ["Bukhari 1442: the second angel says 'O Allah, bring loss to' whom?", "The giver", "Children", "Travelers"] },
  "Charity makes your wealth less in the end.": { answer: "False", harder: "By Bukhari 1442, the angel prays for loss for the one who spends." },
  // Quran 32:11.
  "Who takes the souls, as Quran 32:11 says?": { answer: "The angel of death", harder: ["Quran 32:11: 'Say: the one put in charge of you will take your souls.' Who is that?", "Jibril only", "The jinn", "No one"] },
  "Where does everyone return after death?": { answer: "To their Lord", harder: ["Quran 32:11: after the angel of death takes the souls, where are they returned?", "To the earth only", "To nothing", "To the stars"] },
  "Every soul has an angel put in charge of its death.": { answer: "True", harder: "Quran 32:11 speaks of the angel of death put in charge of us." },
  // Quran 66:6.
  "Do angels ever disobey Allah?": { answer: "Never", harder: ["Quran 66:6: the stern, strong angels over the Fire do not disobey Allah. Do angels ever disobey Him?", "Sometimes", "Often", "Only at night"] },
  "What do angels do?": { answer: "What they are commanded", harder: ["Quran 66:6: the angels do not disobey Allah. What do they do?", "Whatever they like", "Nothing", "What people ask"] },
  "Angels have a free choice to sin, like people.": { answer: "False", harder: "By Quran 66:6, angels may disobey Allah in what He commands them." },
  // Quran 4:163.
  "Which book was given to Dawud?": { answer: "The Zabur", harder: ["Quran 4:163: 'and to Dawud We gave' which book?", "The Tawrah", "The Injil", "The Quran"] },
  "Revelation to him ﷺ was like revelation to whom?": { answer: "Nuh and the prophets after", harder: ["Quran 4:163: Allah revealed to him ﷺ as He revealed to whom?", "Kings", "Poets", "Fortune tellers"] },
  "We believe in all the books Allah sent.": { answer: "True", harder: "Quran 4:163 says Allah gave Dawud the Zabur, one of the books we believe in." },
  // Quran 4:164.
  "Did Allah name every messenger in the Quran?": { answer: "No, only some", harder: ["Quran 4:164: 'Messengers We have told you of, and messengers We have not told you of.' Are all named?", "Only three", "None", "Yes, all of them"] },
  "To which prophet did Allah speak directly?": { answer: "Musa", harder: ["Quran 4:164: 'and Allah spoke to ____ directly.' Which prophet?", "Hud", "Nuh", "Yunus"] },
  "There were messengers we do not know by name.": { answer: "True", harder: "Quran 4:164 says there are messengers Allah has not told us of." },
  // Quran 15:9.
  "Who guards the Quran?": { answer: "Allah", harder: ["Quran 15:9: 'It is We who sent down the Reminder, and We will surely guard it.' Who guards it?", "Kings", "No one", "Scholars alone"] },
  "What does 'the Reminder' mean here?": { answer: "The Quran", harder: ["Quran 15:9: Allah sent down 'the Reminder' and guards it. What is the Reminder?", "A calendar", "A poem", "A city"] },
  "The Quran has been changed over time.": { answer: "False", harder: "By Quran 15:9, the Reminder Allah sent down was not guarded." },
  // Quran 17:105.
  "Which word does Quran 17:105 say twice about the Quran?": { answer: "Truth", harder: ["Quran 17:105 says one word twice: 'with it We sent it down, and with it it came down.' Which word?", "Mercy", "Guidance", "Light"] },
  "What was the Prophet ﷺ sent as, in Quran 17:105?": { answer: "A bringer of good news and a warner", harder: ["Quran 17:105: 'We sent you only as' what?", "A king over all lands", "A builder of palaces", "A keeper of treasures"] },
  "Quran 17:105 says Allah Himself sent the Quran down.": { answer: "True", harder: "Quran 17:105 says it is Allah who sent the Quran down, with the truth." },
  // Sahih al-Bukhari 3443.
  "What did all the prophets share?": { answer: "One religion", harder: ["Bukhari 3443: the prophets are brothers from one father, their mothers differ. What is one?", "One city", "One language", "One mother"] },
  "Which prophet did he ﷺ say he was closest to?": { answer: "Isa", harder: ["Bukhari 3443: he ﷺ said he is the closest of people to which prophet, in this world and the next?", "Nuh", "Adam", "Hud"] },
  "Every prophet called to worship Allah alone.": { answer: "True", harder: "Bukhari 3443 says the religion of all the prophets is one." },
  // Sahih al-Bukhari 335.
  "Who was he ﷺ sent to?": { answer: "All people", harder: ["Bukhari 335: every prophet was sent to his own people, 'but I was sent to' whom?", "Only Arabs", "Only Makkah", "Only his family"] },
  "Who were earlier prophets sent to?": { answer: "Their own people", harder: ["Bukhari 335: 'every prophet was sent to' whom, before him ﷺ?", "Everyone on earth", "Only angels", "No one"] },
  "The whole earth was made a place to pray.": { answer: "True", harder: "Bukhari 335 says the earth was made a place of prayer and purity for him ﷺ." },
  // Sahih Muslim 2653b.
  "When did Allah write the measures of creation?": { answer: "50,000 years before the heavens", harder: ["Muslim 2653b: Allah wrote the measures of creation when?", "After Adam", "On the Last Day", "Yesterday"] },
  "Where was His Throne then?": { answer: "Over the water", harder: ["Muslim 2653b: when the measures were written, where was His Throne?", "On a mountain", "In a city", "Nowhere"] },
  "Nothing surprises Allah.": { answer: "True", harder: "Muslim 2653b says the measures of creation were written before the heavens and the earth." },
  // Quran 54:49.
  "How did Allah create everything, says Quran 54:49?": { answer: "By a measure", harder: ["Quran 54:49: 'Indeed, We created everything...' how?", "By luck", "By chance", "Without a plan"] },
  "What is this belief called?": { answer: "Belief in qadar", harder: ["Quran 54:49 says Allah created everything by a measure. Belief in this is what?", "Belief in luck", "Belief in stars", "Belief in omens"] },
  "Things happen by pure chance.": { answer: "False", harder: "Quran 54:49 says things were created by chance, without a measure." },
  // Quran 57:22.
  "Where is every hardship before it happens?": { answer: "In a book", harder: ["Quran 57:22: no hardship strikes on earth or in yourselves except it is where?", "Nowhere", "In the stars", "In our hands"] },
  "How hard is this for Allah?": { answer: "It is easy for Him", harder: ["Quran 57:22: every hardship is in a book before it happens. How is that for Allah?", "Very hard", "Impossible", "Only for big things"] },
  "Knowing this brings calm in hard times.": { answer: "True", harder: "Quran 57:22 says every hardship is written in a book before it happens." },
  // Sahih al-Bukhari 3208.
  "How many things does the angel write?": { answer: "Four", harder: ["Bukhari 3208: the angel is told to write how many things?", "Two", "Seven", "Ten"] },
  "Which is one of the four?": { answer: "His provision", harder: ["Bukhari 3208: deeds, lifespan, wretched or happy, and what else does the angel write?", "His city", "His name", "His height"] },
  "Our provision is written for us.": { answer: "True", harder: "Bukhari 3208 says provision is one of the four things written." },
  // Sahih al-Bukhari 4949.
  "Should we stop doing deeds because all is written?": { answer: "No, keep doing good", harder: ["Bukhari 4949: 'shall we rely on what is written and leave deeds?' What did he ﷺ say?", "Yes, stop", "Only on Fridays", "Only when rich"] },
  "What happens to the one who works for good?": { answer: "Good is made easy for him", harder: ["Bukhari 4949: 'do deeds, for each is made easy for...' what happens to one who works for good?", "He is punished", "Nothing", "It gets harder"] },
  "Qadar is an excuse to be lazy.": { answer: "False", harder: "In Bukhari 4949 he ﷺ told them to rely on what is written and leave deeds." },
  // Jami at-Tirmidhi 2516.
  "If everyone gathered to harm you, what could happen?": { answer: "Only what Allah wrote", harder: ["Tirmidhi 2516: if the whole nation gathered to harm you, they could harm you only with what?", "Anything they want", "Nothing ever", "Double harm"] },
  "What does 'the pens are lifted' mean?": { answer: "The decree is written and done", harder: ["Tirmidhi 2516: 'The pens are lifted and the pages are dry.' What does that mean?", "Writing is banned", "Stop writing school work", "Pens are broken"] },
  "This hadith makes a believer brave.": { answer: "True", harder: "Tirmidhi 2516 says no one can harm you except with what Allah wrote." },
  // Sahih Muslim 2664.
  "What should we say when something bad happens?": { answer: "Allah decreed and did as He willed", harder: ["Muslim 2664: when something befalls you, do not say 'if only'. What should you say?", "Bad luck", "If only I had...", "It's someone's fault"] },
  "What does 'if only' open, as he ﷺ said?": { answer: "The door to Satan", harder: ["Muslim 2664: 'for if only opens...' what?", "A new path", "Nothing", "A treasure"] },
  "Accepting the decree brings peace to the heart.": { answer: "True", harder: "Muslim 2664 teaches: say Allah decreed, and what He willed He did." },
  // Quran 7:180.
  "Allah has beautiful ____, like Ar-Rahman.": { answer: "names", harder: ["Quran 7:180: 'To Allah belong the most beautiful ____, so call on Him by them.'", "houses", "colors", "statues"] },
  "Allah has beautiful houses, like Ar-Rahman.": { answer: "False", harder: "Quran 7:180 says to Allah belong the most beautiful houses." },
  // Quran 20:7.
  "____ means Allah knows everything, even our secrets.": { answer: "Al-Alim", harder: ["Quran 20:7: Allah knows the secret, and what is even more hidden. The name for the All-Knowing is ____.", "Al-Malik", "Ar-Rahman", "Al-Ghafur"] },
  // Quran 59:23.
  "____ means Allah is the King of everything.": { answer: "Al-Malik", harder: ["Quran 59:23: 'He is Allah, the King, the Pure, the Perfect.' The King is ____.", "Al-Alim", "Ar-Rahman", "Al-Ghafur"] },
  // Quran 39:53.
  "____ means Allah is the One who forgives.": { answer: "Al-Ghafur", harder: ["Quran 39:53: do not lose hope, He forgives all sins. The Forgiving is ____.", "Al-Alim", "Al-Malik", "Al-Khaliq"] },
  // Sahih al-Bukhari 2736.
  "How many names of Allah are in the hadith?": { answer: "Ninety-nine", harder: ["Bukhari 2736: 'one hundred minus one'. How many names of Allah?", "Ten", "Seven", "One thousand"] },
  "What is the reward for knowing them?": { answer: "Jannah", harder: ["Bukhari 2736: whoever knows Allah's ninety-nine names will do what?", "Long life", "Wealth", "Honor among people"] },
  "Learning Allah's names is a great deed.": { answer: "True", harder: "Bukhari 2736 promises Paradise to whoever knows the ninety-nine names." },
  // Quran 7:180.
  "What does Quran 7:180 tell us to do with the names?": { answer: "Call on Him by them", harder: ["Quran 7:180: to Allah belong the most beautiful names, 'so...' what?", "Forget them", "Hide them", "Change them"] },
  "How should you ask Allah for mercy?": { answer: "Ya Rahman, have mercy", harder: ["Quran 7:180 says to call on Allah by His names. Asking for mercy, which fits?", "With no name", "With a joke", "In anger"] },
  "Allah's names are the most beautiful.": { answer: "True", harder: "Quran 7:180 calls Allah's names the most beautiful names." },
  // Quran 42:11.
  "What is like Allah, says Quran 42:11?": { answer: "Nothing at all", harder: ["Quran 42:11: 'There is ____ like Him.' What is like Allah?", "The angels", "The sun", "Kings"] },
  "Which two names end the ayah?": { answer: "As-Sami' and Al-Basir", harder: ["Quran 42:11: 'There is nothing like Him, and He is...' which two names?", "Al-Malik and Al-Quddus", "Ar-Razzaq and Al-Wahhab", "Al-Awwal and Al-Akhir"] },
  "We can imagine exactly how Allah is.": { answer: "False", harder: "By Quran 42:11, we can picture exactly how Allah is, as He is like His creation." },
  // Quran 51:58.
  "What does Ar-Razzaq mean?": { answer: "The Provider", harder: ["Quran 51:58: 'Indeed Allah is the Provider, the Possessor of strength.' What does Ar-Razzaq mean?", "The First", "The Judge", "The King"] },
  "Who truly provides for us?": { answer: "Allah", harder: ["Quran 51:58 calls Allah the Provider. Who truly provides for us?", "Our boss", "Luck", "The bank"] },
  "Trusting Ar-Razzaq means we stop working.": { answer: "False", harder: "By Quran 51:58, because Allah is the Provider we should stop working." },
  // Sahih al-Bukhari 7404.
  "What did Allah write about Himself?": { answer: "My mercy overcomes My anger", harder: ["Bukhari 7404: when Allah created creation, He wrote in His Book what?", "I forget", "I am far", "I am angry"] },
  "Where is that Book?": { answer: "With Him on the Throne", harder: ["Bukhari 7404: 'My mercy overcomes My anger' is in His Book. Where is the Book?", "Lost", "In a cave", "In a library"] },
  "We should always hope in Allah's mercy.": { answer: "True", harder: "Bukhari 7404 says Allah's mercy overcomes His anger, so we keep hoping." },
  // Quran 103:2-3.
  "Belief in Allah shows in how we ____.": { answer: "act", harder: ["Quran 103:2-3: all people are in loss, except those who believe and do good. So belief shows in how we ____.", "shop", "sleep", "dress"] },
  "Belief in Allah shows in how we act.": { answer: "True", harder: "Quran 103:3 saves only those who believe and do good deeds." },
  // Quran 2:153.
  "When things get hard, a believer stays ____.": { answer: "patient", harder: ["Quran 2:153: seek help through patience and prayer; Allah is with the ____. So a believer stays patient.", "angry", "rude", "loud"] },
  // Quran 39:53.
  "Never give up on Allah's ____; He forgives.": { answer: "mercy", harder: ["Quran 39:53: do not lose hope in Allah's ____; He forgives all sins.", "games", "food", "money"] },
  // Sahih Muslim 2588.
  "Strong iman makes a person ____, not proud.": { answer: "humble", harder: ["Muslim 2588: no one is humble for Allah but Allah raises him. Strong iman makes a person ____.", "bossy", "rude", "proud"] },
  // Sahih Muslim 35b.
  "What is the highest branch of iman?": { answer: "La ilaha illallah", harder: ["Muslim 35b: faith has over seventy branches. Which is the best of them?", "Eating well", "Giving a gift", "Smiling"] },
  "What is the lowest branch?": { answer: "Removing harm from the road", harder: ["Muslim 35b: the best branch is La ilaha illallah. Which is the least?", "Saying salam", "Praying at night", "Giving charity"] },
  "Modesty (haya) is part of faith.": { answer: "True", harder: "Muslim 35b names modesty as a branch of faith." },
  // Sahih al-Bukhari 16.
  "Who should be dearest to a believer?": { answer: "Allah and His Messenger ﷺ", harder: ["Bukhari 16: to taste the sweetness of faith, who must be dearer than all else?", "One's children", "One's own self", "One's parents"] },
  "How should a believer love people?": { answer: "For Allah's sake", harder: ["Bukhari 16: the one who tastes faith's sweetness loves a person how?", "For their money", "For fame", "Only if they are famous"] },
  "Faith has a sweetness you can taste.": { answer: "True", harder: "Bukhari 16 says whoever has three things tastes the sweetness of faith." },
  // Quran 8:2.
  "What makes a believer's faith increase, says Quran 8:2?": { answer: "Hearing Allah's ayahs", harder: ["Quran 8:2: the believers' hearts tremble when Allah is mentioned. What makes their faith increase?", "Sleeping more", "Buying things", "Arguing"] },
  "Who do believers rely on?": { answer: "Their Lord", harder: ["Quran 8:2: the believers, whose hearts tremble at Allah's name, rely on whom?", "Their phones", "Luck", "Kings"] },
  "Hearing the Quran can strengthen faith.": { answer: "True", harder: "Quran 8:2 says the believers' faith increases when Allah's ayahs are recited." },
  // Quran 2:207.
  "What does this person seek, in Quran 2:207?": { answer: "The pleasure of Allah", harder: ["Quran 2:207: one gives his very self, seeking what?", "The praise of people", "The wealth of this world", "The power of kings"] },
  "What does this person give, in Quran 2:207?": { answer: "His own self", harder: ["Quran 2:207: seeking the pleasure of Allah, what does this person give?", "His spare coins", "His leftover food", "His old clothes"] },
  "Quran 2:207 says Allah is kind to His servants.": { answer: "True", harder: "Quran 2:207 ends: and Allah is kind to His servants." },
  // Sahih Muslim 2664.
  "Which believer is dearer to Allah?": { answer: "The strong believer", harder: ["Muslim 2664: which believer is better and dearer to Allah?", "The rich one", "The loud one", "The lazy one"] },
  "What should you do with what benefits you?": { answer: "Strive for it, with Allah's help", harder: ["Muslim 2664: 'strive for what benefits you...' how?", "Give up", "Ignore it", "Wait for luck"] },
  "There is good in every believer.": { answer: "True", harder: "Muslim 2664 says there is good in both the strong and the weak believer." },
  // Quran 1:3.
  "What do Ar-Rahman and Ar-Rahim tell us about Allah?": { answer: "He is full of mercy", harder: ["Quran 1:3: 'the Most Merciful, the Especially Merciful.' What do these names tell us?", "He is far away", "He forgets us", "He is tired"] },
  "In which surah do we say these names in every rak'ah?": { answer: "Al-Fatihah", harder: ["Quran 1:3, 'Ar-Rahman, Ar-Rahim', is recited in every rak'ah. In which surah?", "Al-Kahf", "Yasin", "Al-Mulk"] },
  "Ar-Rahman and Ar-Rahim both come from the word for mercy.": { answer: "True", harder: "Quran 1:3 names Allah Ar-Rahman and Ar-Rahim, both from the word for mercy." },
  // Quran 85:14.
  "What does Al-Wadud mean?": { answer: "The Loving", harder: ["Quran 85:14: 'And He is the Forgiving, the Loving.' What does Al-Wadud mean?", "The Angry", "The Sleeping", "The Hungry"] },
  "Which name of Allah in Quran 85:14 means the Forgiving?": { answer: "Al-Ghafur", harder: ["Quran 85:14: 'And He is the Forgiving, the Loving.' Which name is the Forgiving?", "Al-Malik", "Al-Khaliq", "Al-Hayy"] },
  "Allah loves those who obey Him and turn back to Him.": { answer: "True", harder: "Quran 85:14 names Allah Al-Wadud, the Loving." },
  // Quran 2:37.
  "Whose repentance does Quran 2:37 tell of?": { answer: "Adam's", harder: ["Quran 2:37: he received words from his Lord, and He accepted his repentance. Whose?", "Fir'awn's", "Qarun's", "Haman's"] },
  "What does At-Tawwab mean?": { answer: "The One who accepts repentance", harder: ["Quran 2:37: 'Indeed, He is the Tawwab, the Merciful.' What does At-Tawwab mean?", "The One who never forgives", "The One who sleeps", "The One who forgets"] },
  "After a mistake, we can always turn back to Allah.": { answer: "True", harder: "Quran 2:37 calls Allah the Accepting of repentance, so we can always turn back." },
  // Quran 2:186.
  "How close is Allah to the one who calls Him?": { answer: "He is near", harder: ["Quran 2:186: 'when My servants ask you about Me', what does Allah say?", "Very far away", "He cannot hear", "Only near on Eid"] },
  "What does Allah do when we make du'a?": { answer: "He answers the call", harder: ["Quran 2:186: 'I answer the call of the caller when he calls upon Me.' What does He do?", "He forgets it", "He ignores it", "He laughs at it"] },
  "We need someone in between to talk to Allah.": { answer: "False", harder: "By Quran 2:186, we need someone in between to call on Allah." },
  // Quran 3:8.
  "What does Al-Wahhab mean?": { answer: "The Bestower who gives freely", harder: ["Quran 3:8: 'Indeed, You are the Wahhab.' What does Al-Wahhab mean?", "The Judge only", "The One who waits", "The One who takes back"] },
  "What does the du'a in Quran 3:8 ask for first?": { answer: "That our hearts stay guided", harder: ["Quran 3:8: 'Our Lord, do not let our hearts turn away...' What does it ask first?", "A long trip", "Money and fame", "A big house"] },
  "In the same du'a we ask Allah for mercy from Himself.": { answer: "True", harder: "Quran 3:8 asks: grant us mercy from Yourself." },
  // Quran 35:34.
  "Who says the words of Quran 35:34?": { answer: "The people of Jannah", harder: ["Quran 35:34: 'praise be to Allah, who has removed all sorrow from us.' Who says it?", "The jinn of the desert", "The people at the market", "The angels of the sea"] },
  "What does Ash-Shakur mean?": { answer: "The Appreciative", harder: ["Quran 35:34: 'our Lord is Ghafur and Shakur.' What does Ash-Shakur mean?", "The Careless", "The Stingy", "The Forgetful"] },
  "In Jannah, all sorrow is taken away.": { answer: "True", harder: "Quran 35:34 says Allah has removed all sorrow from the people of Jannah." },
  // Quran 22:65.
  "Which two names of Allah end Quran 22:65?": { answer: "Ar-Ra'uf, Ar-Rahim", harder: ["Quran 22:65: He holds back the sky from falling but by His permission. Which two names end it?", "Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Khaliq, Al-Bari"] },
  "To whom is Allah Ra'uf and Rahim, in Quran 22:65?": { answer: "All people", harder: ["Quran 22:65: Allah is Ra'uf and Rahim to whom?", "Only the prophets", "Only the scholars", "Only the kings"] },
  "Allah has made what is on the earth of use to people.": { answer: "True", harder: "Quran 22:65 says Allah has made what is on the earth of use to people." },
  // Quran 2:263.
  "Which two names of Allah end Quran 2:263?": { answer: "Al-Ghani, Al-Halim", harder: ["Quran 2:263: kind speech and forgiveness are better than charity followed by hurt. Which two names end it?", "Al-Malik, Al-Quddus", "Al-Ahad, As-Samad", "Ar-Rahman, Ar-Rahim"] },
  "Which name of Allah means the Forbearing?": { answer: "Al-Halim", harder: ["Quran 2:263 ends 'Ghani, Halim'. Which name means the Forbearing?", "Al-Khaliq", "Al-Qahhar", "Al-Malik"] },
  "Quran 2:263 says Allah needs nothing from us.": { answer: "True", harder: "Quran 2:263 calls Allah Al-Ghani, the One free of need." },
  // Quran 20:82.
  "Which name of Allah is in Quran 20:82?": { answer: "Al-Ghaffar", harder: ["Quran 20:82: 'I am the Perpetual Forgiver of whoever repents.' Which name is that?", "Al-Qahhar", "Al-Wahhab", "Ar-Razzaq"] },
  "What does Al-Ghaffar tell us about Allah?": { answer: "He forgives those who repent", harder: ["Quran 20:82: 'the Perpetual Forgiver of whoever repents and believes.' What does Al-Ghaffar tell us?", "He knows all things", "He gives without limit", "He provides for all"] },
  "After repenting, Quran 20:82 asks us to keep to guidance.": { answer: "True", harder: "Quran 20:82 speaks of one who repents, believes, does good and then keeps to guidance." },
  // Quran 3:150.
  "Which name of Allah is in Quran 3:150?": { answer: "Al-Mawla", harder: ["Quran 3:150: 'But Allah is your Protector.' Which name is that?", "Al-Malik", "Al-Khaliq", "Ar-Razzaq"] },
  "Who is the best of helpers, in Quran 3:150?": { answer: "Allah", harder: ["Quran 3:150: 'He is the best of' what, the ayah says?", "The strong", "The rich", "The kings"] },
  "In Quran 3:150, Allah tells the believers that He looks after them.": { answer: "True", harder: "Quran 3:150 tells the believers that Allah is their Protector." },
  // Quran 4:45.
  "Which name of Allah is in Quran 4:45?": { answer: "Al-Waliyy", harder: ["Quran 4:45: 'Allah is enough as an Ally.' Which name is that?", "Al-Quddus", "Al-Hayy", "Al-Malik"] },
  "Allah is enough as a Waliyy and as what, in Quran 4:45?": { answer: "A Helper", harder: ["Quran 4:45: 'Allah is enough as an Ally, and enough as' what?", "A Trustee", "A Guide", "A Reckoner"] },
  "Quran 4:45 says Allah knows best who our enemies are.": { answer: "True", harder: "Quran 4:45 begins: and Allah knows best your enemies." },
  // Quran 22:60.
  "Which two names of Allah end Quran 22:60?": { answer: "Al-'Afuww, Al-Ghafur", harder: ["Quran 22:60: whoever is wronged again after answering an injustice, Allah will aid him. Which two names end it?", "Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Aliyy, Al-Kabir"] },
  "Which name of Allah means the Pardoning?": { answer: "Al-'Afuww", harder: ["Quran 22:60 ends 'Afuww, Ghafur'. Which name means the Pardoning?", "Al-Khaliq", "Al-Hayy", "Al-Malik"] },
  "In Quran 22:60, Allah promises to help one who is wronged.": { answer: "True", harder: "Quran 22:60 says Allah will surely aid the one who is wronged." },
  // Quran 2:255.
  "What does Al-Hayy mean?": { answer: "The Ever-Living", harder: ["Quran 2:255: 'the Ever-Living, the Sustainer of all.' What does Al-Hayy mean?", "The Sleeping", "The Tired", "The Young"] },
  "Which famous ayah has these two names?": { answer: "Ayat al-Kursi", harder: ["Quran 2:255 names Allah Al-Hayy, Al-Qayyum. What is that ayah called?", "The last ayah of An-Nas", "The first ayah of Al-Kawthar", "The last ayah of Al-Asr"] },
  "Allah never gets sleepy and never sleeps.": { answer: "True", harder: "Quran 2:255 says neither drowsiness nor sleep overtakes Allah." },
  // Quran 59:23.
  "What does Al-Malik mean?": { answer: "The King", harder: ["Quran 59:23: 'He is Allah... the Malik, the Quddus.' What does Al-Malik mean?", "The Guest", "The Servant", "The Traveller"] },
  "Which name means the Most Pure?": { answer: "Al-Quddus", harder: ["Quran 59:23: 'the King, the Pure, the Source of Peace'. Which name means the Most Pure?", "Al-Khaliq", "Al-Wakil", "Al-Malik"] },
  "As-Salam means Allah is the Source of Peace.": { answer: "True", harder: "Quran 59:23 names Allah As-Salam, the Source of Peace." },
  // Quran 59:24.
  "What does Al-Khaliq mean?": { answer: "The Creator", harder: ["Quran 59:24: 'He is Allah, the Khaliq, the Bari, the Musawwir.' What does Al-Khaliq mean?", "The Borrower", "The Copier", "The Destroyer"] },
  "Which name means the One who gives each thing its shape?": { answer: "Al-Musawwir", harder: ["Quran 59:24: the Creator, the Inventor, and which name, the Fashioner of each thing's shape?", "Al-Hayy", "Al-Malik", "As-Salam"] },
  "Everything in the heavens and earth glorifies Allah.": { answer: "True", harder: "Quran 59:24 says whatever is in the heavens and earth glorifies Him." },
  // Quran 67:14.
  "Who knows best what He created?": { answer: "Allah, the Creator", harder: ["Quran 67:14: 'Does He who created not know?' Who knows best what He created?", "Only the stars", "Only the people", "No one"] },
  "What does Al-Khabir mean?": { answer: "The All-Aware", harder: ["Quran 67:14: 'He is the Latif, the Khabir.' What does Al-Khabir mean?", "The Unaware", "The Forgetful", "The Distant"] },
  "Al-Latif means His kindness and knowledge reach even hidden things.": { answer: "True", harder: "Quran 67:14 names Allah Al-Latif, the Subtle." },
  // Quran 3:173.
  "What did the believers say when told an army had gathered?": { answer: "Allah is enough for us", harder: ["Quran 3:173: told the people had gathered against them, what did the believers say?", "We give up", "Let us run away", "We are alone"] },
  "What does Al-Wakil mean?": { answer: "The One we trust with our affairs", harder: ["Quran 3:173: 'and He is the best Wakil.' What does Al-Wakil mean?", "The One who is weak", "The One who sleeps", "The One who is far"] },
  "The threat made their faith grow stronger.": { answer: "True", harder: "Quran 3:173 says the threat increased them in faith." },
  // Quran 12:64.
  "Who said that Allah is the best Guardian?": { answer: "Prophet Ya'qub", harder: ["Quran 12:64: 'Allah is the best Guardian.' Which prophet said it, of his son?", "Prophet Hud", "Prophet Salih", "Prophet Nuh"] },
  "What does Al-Hafiz mean?": { answer: "The Guardian who protects", harder: ["Quran 12:64: 'Allah is the best Hafiz.' What does Al-Hafiz mean?", "The Weak", "The Forgetful", "The Careless"] },
  "Ya'qub trusted Allah to protect his son.": { answer: "True", harder: "In Quran 12:64 Ya'qub said Allah is the best Guardian." },
  // Quran 13:16.
  "Which two names of Allah end Quran 13:16?": { answer: "Al-Wahid, Al-Qahhar", harder: ["Quran 13:16: 'Say: Allah is the Creator of all things.' Which two names end it?", "Al-Ghafur, Al-Wadud", "Al-Latif, Al-Khabir", "Al-Hayy, Al-Qayyum"] },
  "Which name of Allah means the One?": { answer: "Al-Wahid", harder: ["Quran 13:16 ends 'Wahid, Qahhar'. Which name means the One?", "Al-Quddus", "Al-Wakil", "Al-Malik"] },
  "Quran 13:16 says Allah is the Creator of all things.": { answer: "True", harder: "Quran 13:16 says Allah is the Creator of all things." },
  // Quran 22:62.
  "Which two names of Allah end Quran 22:62?": { answer: "Al-Aliyy, Al-Kabir", harder: ["Quran 22:62: Allah is the Truth, and what they call besides Him is falsehood. Which two names end it?", "Ar-Rahman, Ar-Rahim", "As-Sami', Al-Basir", "Al-Malik, Al-Quddus"] },
  "Which name of Allah means the Most High?": { answer: "Al-Aliyy", harder: ["Quran 22:62 ends 'Aliyy, Kabir'. Which name means the Most High?", "Al-Wahhab", "Al-Wadud", "Ash-Shakur"] },
  "Al-Kabir is a name of Allah that means the Great.": { answer: "True", harder: "Quran 22:62 names Allah Al-Kabir, the Grand." },
  // Quran 22:40.
  "Which two names of Allah end Quran 22:40?": { answer: "Al-Qawiyy, Al-Aziz", harder: ["Quran 22:40: Allah will surely support those who support Him. Which two names end it?", "Al-Ahad, As-Samad", "Al-Ghafur, Al-Wadud", "Al-Latif, Al-Khabir"] },
  "Which name of Allah means the Powerful?": { answer: "Al-Qawiyy", harder: ["Quran 22:40 ends 'Qawiyy, Aziz'. Which name means the Powerful?", "Al-Wadud", "Al-Ghafur", "As-Salam"] },
  "Al-Qawiyy and Al-Aziz both tell of Allah's might.": { answer: "True", harder: "Quran 22:40 names Allah the Powerful and the Exalted in Might." },
  // Quran 2:32.
  "Who said the words of Quran 2:32?": { answer: "The angels", harder: ["Quran 2:32: 'we have no knowledge except what You have taught us.' Who said it?", "The prophets", "The kings", "The jinn"] },
  "Which two names of Allah end Quran 2:32?": { answer: "Al-Alim, Al-Hakim", harder: ["Quran 2:32: the angels said 'Exalted are You'. Which two names end it?", "Al-Ghafur, Al-Wadud", "Al-Hayy, Al-Qayyum", "Al-Khaliq, Al-Bari"] },
  "Which name of Allah means the All-Knowing?": { answer: "Al-Alim", harder: ["Quran 2:32 ends 'Alim, Hakim'. Which name means the All-Knowing?", "Al-Wadud", "Al-Wahhab", "Ash-Shakur"] },
  // Quran 4:6.
  "Which name of Allah ends Quran 4:6?": { answer: "Al-Hasib", harder: ["Quran 4:6: return the orphans' property before witnesses. Which name ends the ayah?", "Al-Wadud", "Ar-Razzaq", "As-Salam"] },
  "Who is enough as the One who takes account, in Quran 4:6?": { answer: "Allah", harder: ["Quran 4:6: 'sufficient is ____ as Accountant.' Who?", "The witnesses", "The guardian", "The judge"] },
  "Quran 4:6 is about the wealth of orphans.": { answer: "True", harder: "Quran 4:6 tells guardians to hand orphans their property before witnesses." },
  // Quran 22:64.
  "Which two names of Allah end Quran 22:64?": { answer: "Al-Ghani, Al-Hamid", harder: ["Quran 22:64: to Him belongs what is in the heavens and on the earth. Which two names end it?", "Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Ghafur, Al-Wadud"] },
  "Which name of Allah means the Praiseworthy?": { answer: "Al-Hamid", harder: ["Quran 22:64 ends 'Ghani, Hamid'. Which name means the Praiseworthy?", "Al-Wahhab", "Al-Karim", "Ar-Razzaq"] },
  "Quran 22:64 says all in the heavens and on the earth is Allah's.": { answer: "True", harder: "Quran 22:64 says to Allah belongs what is in the heavens and on the earth." },
  // Quran 18:44.
  "Which name of Allah means the Truth?": { answer: "Al-Haqq", harder: ["Quran 18:44: 'the authority is for Allah, the Haqq.' Which name means the Truth?", "Ash-Shakur", "Al-Wadud", "Al-Karim"] },
  "Who is best in reward and best in outcome, in Quran 18:44?": { answer: "Allah", harder: ["Quran 18:44: 'He is best in reward and best in outcome.' Who?", "The kings", "The strong", "The rich"] },
  "In Quran 18:44, Allah is called the Truth.": { answer: "True", harder: "Quran 18:44 calls Allah Al-Haqq, the Truth." },
  // Quran 4:134.
  "Which two names of Allah end Quran 4:134?": { answer: "As-Sami', Al-Basir", harder: ["Quran 4:134: with Allah is the reward of this world and the next. Which two names end it?", "Al-Malik, Al-Quddus", "Al-Hayy, Al-Qayyum", "Al-Ghafur, Al-Wadud"] },
  "With whom is the reward of this world and the Hereafter, in Quran 4:134?": { answer: "With Allah", harder: ["Quran 4:134: whoever wants the reward of this world: with whom is it, and the Hereafter's?", "With the strong", "With the traders", "With the wealthy"] },
  "Which name of Allah means the All-Seeing?": { answer: "Al-Basir", harder: ["Quran 4:134 ends 'Sami', Basir'. Which name means the All-Seeing?", "Ar-Razzaq", "Al-Wadud", "Al-Wahhab"] },
  // Quran 6:13.
  "Which two names of Allah end Quran 6:13?": { answer: "As-Sami', Al-Alim", harder: ["Quran 6:13: to Him belongs what reposes by night and by day. Which two names end it?", "Al-Ghani, Al-Halim", "Ar-Rahman, Ar-Rahim", "Al-Aliyy, Al-Kabir"] },
  "What belongs to Allah, in Quran 6:13?": { answer: "All that is in the night and day", harder: ["Quran 6:13: 'to Him belongs that which reposes by night and by day.' What belongs to Him?", "Only what is in the night", "Only what is on the land", "Only what is in the day"] },
  "Which name of Allah means the All-Hearing?": { answer: "As-Sami'", harder: ["Quran 6:13 ends 'Sami', Alim'. Which name means the All-Hearing?", "Al-Karim", "Ash-Shakur", "Al-Ghafur"] },
  // Quran 4:166.
  "Which name of Allah ends Quran 4:166?": { answer: "Ash-Shahid", harder: ["Quran 4:166: Allah bears witness to what He sent down, with His knowledge. Which name ends it?", "Al-Wahhab", "Al-Karim", "Ar-Razzaq"] },
  "Who else bears witness, in Quran 4:166?": { answer: "The angels", harder: ["Quran 4:166: Allah bears witness to what He revealed, 'and ____ bear witness as well'. Who?", "The jinn", "The poets", "The kings"] },
  "Quran 4:166 says Allah sent the revelation down with His knowledge.": { answer: "True", harder: "Quran 4:166 says Allah sent the revelation down with His knowledge." },
  // Quran 6:73.
  "Which two names of Allah end Quran 6:73?": { answer: "Al-Hakim, Al-Khabir", harder: ["Quran 6:73: His is the dominion the Day the Horn is blown. Which two names end it?", "Al-Malik, Al-Quddus", "Ar-Ra'uf, Ar-Rahim", "Al-Hayy, Al-Qayyum"] },
  "Who holds all authority on the Day the Horn is blown, in Quran 6:73?": { answer: "Allah alone", harder: ["Quran 6:73: 'His is the dominion on the Day the Horn is blown.' Whose authority is it?", "The angels", "The strong", "The kings"] },
  "In Quran 6:73, Allah knows both the seen and the unseen.": { answer: "True", harder: "Quran 6:73 calls Allah the Knower of the unseen and the witnessed." },
  // Quran 2:268.
  "Which two names of Allah end Quran 2:268?": { answer: "Al-Wasi', Al-Alim", harder: ["Quran 2:268: Satan threatens you with poverty, while Allah promises. Which two names end it?", "Al-Hayy, Al-Qayyum", "Al-Malik, Al-Quddus", "Ar-Ra'uf, Ar-Rahim"] },
  "What does Allah promise, in Quran 2:268?": { answer: "Forgiveness and bounty", harder: ["Quran 2:268: Satan threatens poverty. What does Allah promise from Him?", "Fame and praise", "Rank and titles", "Power and armies"] },
  "In Quran 2:268, Shaytan threatens and Allah promises.": { answer: "True", harder: "Quran 2:268 says Satan threatens poverty, while Allah promises forgiveness and bounty." },
  // Quran 13:9.
  "Which two names of Allah end Quran 13:9?": { answer: "Al-Kabir, Al-Muta'al", harder: ["Quran 13:9: 'Knower of the unseen and the witnessed.' Which two names end it?", "Al-Ghafur, Al-Wadud", "Ar-Rahman, Ar-Rahim", "Al-Ghani, Al-Halim"] },
  "Which name of Allah means the Most Exalted?": { answer: "Al-Muta'al", harder: ["Quran 13:9 ends 'Kabir, Muta'al'. Which name means the Most Exalted?", "Al-Wadud", "Al-Ghafur", "Ar-Razzaq"] },
  "Al-Kabir and Al-Muta'al both tell of Allah's greatness.": { answer: "True", harder: "Quran 13:9 names Allah the Grand and the Exalted." },
  // Quran 35:44.
  "Which two names of Allah end Quran 35:44?": { answer: "Al-Alim, Al-Qadir", harder: ["Quran 35:44: nothing in the heavens or earth can make Allah fail. Which two names end it?", "Al-Ghafur, Al-Wadud", "Al-Malik, Al-Quddus", "Ar-Ra'uf, Ar-Rahim"] },
  "What can escape Allah in the heavens or the earth, per Quran 35:44?": { answer: "Nothing at all", harder: ["Quran 35:44: Allah is not made to fail by anything in the heavens or the earth. What escapes Him?", "The stars", "The deep sea", "The high mountains"] },
  "Al-Qadir is a name of Allah that tells of His power.": { answer: "True", harder: "Quran 35:44 ends: He is ever Knowing and Competent, Al-Qadir." },
  // Jami at-Tirmidhi 2517.
  "What did he ﷺ tell the man to do with his camel?": { answer: "Tie it, and trust Allah", harder: ["Tirmidhi 2517: 'shall I tie my camel and trust, or leave it loose and trust?' His ﷺ answer?", "Sell it at once", "Give it to a friend", "Leave it loose"] },
  "What is the lesson about trusting Allah?": { answer: "Do your part, then trust Him", harder: ["Tirmidhi 2517: 'tie it, and trust in Allah.' What is the lesson?", "Worry about everything", "Do nothing and wait", "Trust only yourself"] },
  "Trusting Allah means you never need to take care.": { answer: "False", harder: "By Tirmidhi 2517, one who trusts Allah should leave the camel loose." },
  // Sunan Abi Dawud 3855.
  "What did the Bedouins ask him ﷺ about?": { answer: "Using medicine", harder: ["Abu Dawud 3855: Bedouins came from here and there with a question. What did they ask?", "Trading goods", "Raising sheep", "Building homes"] },
  "Which illness has no cure, he ﷺ said?": { answer: "Old age", harder: ["Abu Dawud 3855: Allah made a remedy for every disease except one. Which?", "Stomach ache", "Toothache", "Earache"] },
  "Usamah found the Companions sitting as if birds were on their heads.": { answer: "True", harder: "In Abu Dawud 3855 the Companions sat so still it was as if birds were on their heads." },
  // Jami at-Tirmidhi 2521.
  "Whose faith is made perfect, he ﷺ said?": { answer: "Who acts for the sake of Allah", harder: ["Tirmidhi 2521: gives, holds back, loves, dislikes and marries for Allah. Whose faith is perfect?", "Who owns the most", "Who talks the most", "Who is the strongest"] },
  "Which of these did he ﷺ name as done for Allah?": { answer: "Giving and loving", harder: ["Tirmidhi 2521: which of these did he ﷺ name among things done for the sake of Allah?", "Buying and selling", "Sleeping and eating", "Running and riding"] },
  "Love for the sake of Allah is part of faith.": { answer: "True", harder: "Tirmidhi 2521 names loving for the sake of Allah among the deeds that perfect faith." },
  // Jami at-Tirmidhi 2142.
  "What does Allah do for one He wants good for?": { answer: "Puts him to work in good deeds", harder: ["Tirmidhi 2142: 'when Allah wants good for a servant, He puts him to work.' How?", "Makes him rich at once", "Lets him do as he likes", "Gives him a long rest"] },
  "When does Allah guide him to these good deeds?": { answer: "Before his death", harder: ["Tirmidhi 2142: He guides him to righteous deeds, when?", "After he dies", "Only in his youth", "Only on Fridays"] },
  "Doing good deeds is a sign that Allah wants good for you.": { answer: "True", harder: "Tirmidhi 2142 says Allah guides the servant He wants good for to righteous deeds." },
  // Jami at-Tirmidhi 2514.
  "Why was Hanzalah crying?": { answer: "He feared he was a hypocrite", harder: ["Tirmidhi 2514: at home, busy with family and work, they forgot much. Why did Hanzalah weep?", "He had lost his camel", "He was very hungry", "He had missed a prayer"] },
  "Who would shake their hands if that feeling never left?": { answer: "The angels", harder: ["Tirmidhi 2514: 'if you stayed as you are with me', who would shake your hands?", "The kings", "The prophets", "The jinn"] },
  "He ﷺ told Hanzalah he was a hypocrite.": { answer: "False", harder: "In Tirmidhi 2514 he ﷺ told Hanzalah he had become a hypocrite." },
  // Jami at-Tirmidhi 3537.
  "Until when does Allah accept a servant's repentance?": { answer: "Until his last breath", harder: ["Tirmidhi 3537: until when does Allah accept a servant's repentance?", "Only until age forty", "Only in Ramadan", "Only once in a life"] },
  "What should a sinner do while he still lives?": { answer: "Repent to Allah", harder: ["Tirmidhi 3537: repentance is accepted until the soul reaches the throat. So what should a sinner do?", "Wait for old age", "Hide his sins forever", "Lose all hope"] },
  "A person who sinned a lot can never repent.": { answer: "False", harder: "By Tirmidhi 3537, one who sinned a lot is shut out from repentance." },
  // Sahih al-Bukhari 5645.
  "What does Allah do for someone He wants good for?": { answer: "He tests him with trials", harder: ["Bukhari 5645: 'if Allah wants good for someone,' what does He do?", "He gives him no work", "He makes him rich at once", "He lets him rest always"] },
  "Which is a good way to see a hard test?": { answer: "Allah may want good for me", harder: ["Bukhari 5645: if Allah wants good for someone He tests him. A hard test comes. Which view fits?", "I should give up", "Nothing good can come of it", "I am just unlucky"] },
  "A trial can be a sign that Allah wants good for you.": { answer: "True", harder: "Bukhari 5645 says Allah tests the one He wants good for." },
  // Sahih al-Bukhari 5648.
  "How strong was his ﷺ fever, he told Ibn Mas'ud?": { answer: "As much as two men's", harder: ["Bukhari 5648: 'I have as much fever as' how many of you?", "Just a little warm", "Half of one man's", "Gone by the morning"] },
  "What did Ibn Mas'ud ask about the strong fever?": { answer: "Is it for a double reward?", harder: ["Bukhari 5648: hearing his ﷺ fever was like two men's, what did Ibn Mas'ud ask?", "Will it end soon?", "Is it from the cold?", "Shall I call a doctor?"] },
  "A Muslim's pain can make his sins fall away like leaves.": { answer: "True", harder: "Bukhari 5648: even a thorn's prick wipes away a Muslim's sins, as a tree sheds its leaves." },
  // Sahih al-Bukhari 5653.
  "What are the two dear things in the hadith qudsi?": { answer: "His two eyes", harder: ["Bukhari 5653: 'if I take away My servant's two dear things...' What are they?", "His two houses", "His two hands", "His two sons"] },
  "What does Allah give the one who stays patient?": { answer: "Paradise in their place", harder: ["Bukhari 5653: if he loses his eyes and stays patient, what does Allah give him?", "New eyes at once", "A long life", "Gold and silver"] },
  "Allah rewards patience even when a great blessing is taken.": { answer: "True", harder: "Bukhari 5653 promises Paradise to the one who stays patient after losing his eyes." },
  // Jami at-Tirmidhi 2399.
  "In which three things do trials come to a believer?": { answer: "Self, children and wealth", harder: ["Tirmidhi 2399: trials keep coming to the believer in what three things?", "Sun, moon and stars", "Food, drink and sleep", "Roads, rivers and hills"] },
  "How does the tested believer meet Allah in the end?": { answer: "Without any sin", harder: ["Tirmidhi 2399: trials keep coming until the believer meets Allah how?", "With many debts", "With empty hands", "With no friends"] },
  "Trials can come to a believer's children and wealth too.": { answer: "True", harder: "Tirmidhi 2399 says trials come in a believer's self, children and wealth." },
  // Sunan Abi Dawud 3090.
  "What has Allah already written for some servants?": { answer: "A rank their deeds do not reach", harder: ["Abu Dawud 3090: Allah tests him in body, wealth or children. What has He written for him?", "A life with no tests", "Riches with no effort", "Nothing at all"] },
  "Then what does Allah give him, so he can bear it?": { answer: "Patience", harder: ["Abu Dawud 3090: Allah tests him, 'then gives him' what, to reach that rank?", "Boredom", "Fear", "Anger"] },
  "A test can lift a servant to a rank his deeds alone would not reach.": { answer: "True", harder: "Abu Dawud 3090 says Allah brings him through the test to the rank written for him." },
  // Jami at-Tirmidhi 3524.
  "What did he ﷺ say when a matter worried him?": { answer: "Ya Hayyu, ya Qayyum", harder: ["Tirmidhi 3524: whenever something worried him ﷺ, what did he say?", "Ya Rabb, ya Karim", "Subhanallah only", "Allahu akbar, three times"] },
  "By what did he ﷺ ask Allah for help in that du'a?": { answer: "By His mercy", harder: ["Tirmidhi 3524: 'bi-rahmatika astaghith'. By what did he ﷺ call for help?", "By his friends", "By his own strength", "By his money"] },
  "Al-Hayy and Al-Qayyum are names of Allah he ﷺ called on.": { answer: "True", harder: "Tirmidhi 3524: he ﷺ called on Allah, 'O Ever-Living, O Sustainer of all.'" },
  // Sahih al-Bukhari 7281.
  "In the angels' parable, what does the house stand for?": { answer: "Paradise", harder: ["Bukhari 7281: a man built a house and set a feast. In the angels' parable, the house is what?", "A palace on earth", "A king's court", "A busy market"] },
  "Who is the one sent to invite the people, in the parable?": { answer: "Muhammad ﷺ", harder: ["Bukhari 7281: in the parable, who is the one who invites?", "One of the angels", "A wise king", "A traveller"] },
  "In the parable, whoever refused the invitation still ate from the feast.": { answer: "False", harder: "In Bukhari 7281, whoever refused the invitation still entered and ate." },
  // Sahih al-Bukhari 2697.
  "What happens to something added to the religion that is not from it?": { answer: "It is rejected", harder: ["Bukhari 2697: something brought into the religion that is not in harmony with it. What happens?", "It is kept forever", "It earns a double reward", "It becomes a duty"] },
  "A deed must match what, to be accepted?": { answer: "What the religion teaches", harder: ["Bukhari 2697: rejected is what is not in harmony with the religion. So a deed must match what?", "The latest fashion", "What most people like", "Your own new idea"] },
  "Adding to the religion what is not from it earns extra reward.": { answer: "False", harder: "By Bukhari 2697, adding to the religion what is not from it brings extra reward." },
  // Sunan Abi Dawud 4605.
  "Where is the man he ﷺ warned about, when the command reaches him?": { answer: "On his couch", harder: ["Abu Dawud 4605: 'let me not find one of you reclining' where, when my command reaches him?", "At the market", "In the masjid", "On a camel"] },
  "What does the man say when a command of his ﷺ reaches him?": { answer: "We follow only the Book", harder: ["Abu Dawud 4605: a command of his ﷺ reaches the reclining man. What does he say?", "I will obey it gladly", "Teach me more of it", "Let me ask about it"] },
  "Following only the Quran, and leaving his ﷺ commands, is enough.": { answer: "False", harder: "By Abu Dawud 4605, following only the Book and leaving his ﷺ commands is enough." },
  // Sahih al-Bukhari 7298.
  "What did the people do when he ﷺ wore a gold ring?": { answer: "They wore gold rings too", harder: ["Bukhari 7298: he ﷺ wore a gold ring. What did the people do?", "They asked for his ring", "They waited a whole year", "They did nothing at all"] },
  "What did the people do when he ﷺ threw his ring away?": { answer: "Threw their rings away too", harder: ["Bukhari 7298: he ﷺ threw his ring away: 'I will never wear it.' What did the people do?", "Kept wearing theirs", "Gave theirs as gifts", "Sold theirs in the market"] },
  "The Companions followed what he ﷺ did, even in small things.": { answer: "True", harder: "In Bukhari 7298 the people threw their rings away when he ﷺ threw his away." },
  // Sahih al-Bukhari 7275.
  "What did Umar wish to share out among the Muslims?": { answer: "The gold and silver of the Ka'bah", harder: ["Bukhari 7275: sitting in the Sacred Mosque, what did Umar wish to share out?", "The swords of the army", "The dates of Madinah", "The camels of Makkah"] },
  "Why did Shaybah say Umar should not do it?": { answer: "His two companions did not do it", harder: ["Bukhari 7275: 'you cannot do that.' Why not, Shaybah told Umar?", "The people did not want it", "It belonged to Shaybah", "The gold was too heavy"] },
  "Umar told Shaybah he would share out the gold anyway.": { answer: "False", harder: "In Bukhari 7275 Umar refused to follow the way of his two companions." },
  // Sahih al-Bukhari 7277.
  "What is the best speech, Ibn Mas'ud said?": { answer: "The Book of Allah", harder: ["Bukhari 7277: Ibn Mas'ud said: 'the best speech is' what?", "The words of poets", "The talk of kings", "The tales of old"] },
  "Whose way is the best way, Ibn Mas'ud said?": { answer: "The way of Muhammad ﷺ", harder: ["Bukhari 7277: 'and the best way is the way of' whom?", "The way of the rich", "The way of the crowd", "The way of our forefathers"] },
  "Ibn Mas'ud called new things in the religion the best of matters.": { answer: "False", harder: "In Bukhari 7277 Ibn Mas'ud praised new things brought into the religion." },
  // Quran 24:54.
  "Whom does Quran 24:54 tell us to obey?": { answer: "Allah and the Messenger ﷺ", harder: ["Quran 24:54: 'Say: obey...' whom, the ayah says?", "The richest", "Our friends", "The strong"] },
  "What happens if we obey him ﷺ, in Quran 24:54?": { answer: "We will be guided", harder: ["Quran 24:54: 'if you obey him...' what happens?", "We will be rich", "We will be strong", "We will be famous"] },
  "Quran 24:54 says the Messenger's ﷺ duty is to convey the message clearly.": { answer: "True", harder: "Quran 24:54 ends: the Messenger's ﷺ duty is only to convey clearly." },
  // Sunan Ibn Majah 5.
  "What did he ﷺ say he was leaving them on?": { answer: "A white, clear path", harder: ["Ibn Majah 5: 'I am leaving you on something like Bayda'. What is it?", "A great palace", "A large army", "A pile of gold"] },
  "What were they talking about when he ﷺ came out?": { answer: "Poverty and fearing it", harder: ["Ibn Majah 5: he ﷺ came out and asked 'is it poverty you fear?' What were they talking of?", "Poems and stories", "Rain and the harvest", "Trade and the market"] },
  "The path he ﷺ left us on is as clear by night as by day.": { answer: "True", harder: "Ibn Majah 5 says the night and day of the path he ﷺ left are the same." },
  // Sahih al-Bukhari 6099.
  "Who is the most patient with hurtful words, he ﷺ said?": { answer: "Allah", harder: ["Bukhari 6099: 'none is more patient with the hurtful words He hears' than whom?", "The elders", "The kings", "The wise men"] },
  "Someone says hurtful words to you. What fits the lesson?": { answer: "Stay patient, and keep doing good", harder: ["Bukhari 6099: Allah hears hurtful words yet still gives health and provision. Someone hurts you. What fits?", "Stop speaking to everyone", "Plan to get even", "Shout back at once"] },
  "Allah hears the hurtful words people say, yet still provides for them.": { answer: "True", harder: "Bukhari 6099 says Allah still gives health and provision to those who say hurtful words." },
  // Sahih al-Bukhari 7383.
  "Which word for Allah's might did he ﷺ use in the du'a?": { answer: "'Izzah", harder: ["Bukhari 7383: 'I seek refuge in Your ____.' Which word for might did he ﷺ use?", "Hikmah", "Barakah", "Rahmah"] },
  "What did he ﷺ say about the jinn and people?": { answer: "They all die", harder: ["Bukhari 7383: 'who does not die, while the jinn and humans' do what?", "They never die", "They rule all things", "They know the unseen"] },
  "Only Allah is worthy of worship, and He never dies.": { answer: "True", harder: "Bukhari 7383: none has the right to be worshipped but Allah, who does not die." },
  // Sahih al-Bukhari 6328.
  "What were they told not to say in the prayer?": { answer: "Peace be on Allah", harder: ["Bukhari 6328: 'Allah Himself is As-Salam.' What did he ﷺ tell them to stop saying?", "Subhana Rabbiyal A'la", "Allahu akbar", "At-tahiyyatu lillah"] },
  "What did he ﷺ teach them to say instead, when sitting?": { answer: "At-tahiyyatu lillah", harder: ["Bukhari 6328: instead of 'peace be on Allah', what did he ﷺ teach them to say?", "Only ameen", "Peace be on Allah", "Nothing at all"] },
  "The tashahhud sends salam to every righteous slave in heaven and earth.": { answer: "True", harder: "Bukhari 6328 says the salam of the tashahhud reaches every righteous slave in heaven and earth." },
  // Sunan Abi Dawud 3451.
  "What did the people ask him ﷺ to do when prices rose?": { answer: "Fix the prices for them", harder: ["Abu Dawud 3451: prices rose in Madinah. What did the people ask him ﷺ?", "Give them free food", "Leave Madinah", "Close the market"] },
  "Which of His names means the Provider?": { answer: "Ar-Razzaq", harder: ["Abu Dawud 3451: 'Allah sets prices, withholds, gives freely and provides.' Which name is the Provider?", "Al-Hakam", "Al-Qabid", "Al-Basit"] },
  "He ﷺ hoped to meet Allah with no one holding a wrong against him.": { answer: "True", harder: "In Abu Dawud 3451 he ﷺ wished to meet Allah with no one holding a claim against him." },
  // Sahih al-Bukhari 6206.
  "Which name did he ﷺ call the worst in Allah's sight?": { answer: "King of kings", harder: ["Bukhari 6206: which name is the worst in Allah's sight, he ﷺ said?", "Muhammad", "Abdullah", "Abdur-Rahman"] },
  "Which title in Persian means king of kings, as Sufyan reported?": { answer: "Shahan Shah", harder: ["Bukhari 6206: Sufyan said others explained 'king of kings' with which word?", "Sultan", "Khalifah", "Emir"] },
  "Calling yourself king of kings is a good way to show honor.": { answer: "False", harder: "By Bukhari 6206, 'king of kings' is a fine title to take." },
  // Sahih al-Bukhari 6628.
  "What does Allah turn, in his ﷺ frequent oath?": { answer: "The hearts", harder: ["Bukhari 6628: his ﷺ oath was 'No, by the One who turns...' what?", "The mountains", "The seas", "The skies"] },
  "A believer asks Allah to keep his heart firm. Why?": { answer: "Allah turns the hearts", harder: ["Bukhari 6628: his ﷺ oath was 'by the One who turns the hearts'. Why ask Allah for a firm heart?", "Hearts never change", "Only people change hearts", "Hearts do not matter"] },
  "He ﷺ swore by Allah, the One who turns the hearts.": { answer: "True", harder: "Bukhari 6628 says his ﷺ oath was: No, by the One who turns the hearts." },
  // Sahih al-Bukhari 6410.
  "What is Allah called in Sahih al-Bukhari 6410?": { answer: "Witr", harder: ["Bukhari 6410: 'And Allah is...' what, a word He also loves?", "Tayyib", "Jamil", "Rafiq"] },
  "What does witr mean, as said of Allah?": { answer: "The One", harder: ["Bukhari 6410: 'Allah is witr, and He loves the witr.' What does witr mean of Allah?", "The All-Seeing", "The Ever-Living", "The All-Knowing"] },
  "This hadith says Allah loves the witr.": { answer: "True", harder: "Bukhari 6410 says Allah is witr, and He loves the witr." },
  // Jami at-Tirmidhi 2144.
  "What must a believer believe in, its good and its bad?": { answer: "Allah's decree", harder: ["Tirmidhi 2144: a servant does not truly believe until he believes in what, its good and its bad?", "The stars", "Lucky days", "Bad omens"] },
  "What does such a believer know about what struck him?": { answer: "It was never going to miss him", harder: ["Tirmidhi 2144: what struck him would not have missed him. What does the believer know?", "It came by chance", "It was bad luck", "Someone else chose it"] },
  "Believing in the decree includes its bad as well as its good.": { answer: "True", harder: "Tirmidhi 2144 says true belief in the decree takes in both its good and its bad." },
  // Sunan Abi Dawud 4700.
  "What did Allah tell the Pen to write?": { answer: "What was decreed for everything", harder: ["Abu Dawud 4700: the Pen asked 'my Lord, what shall I write?' What was it told?", "Only the names of kings", "Only the seas", "Only the mountains"] },
  "Until when did the Pen write?": { answer: "Until the Last Hour comes", harder: ["Abu Dawud 4700: 'write what was decreed about everything' until when?", "Until the first sunrise", "Until the first night", "Until the first rain"] },
  "Ubadah taught his son about the decree.": { answer: "True", harder: "In Abu Dawud 4700 Ubadah ibn as-Samit taught his son about the decree." },
  // Jami at-Tirmidhi 2642.
  "What did Allah cast upon His creation?": { answer: "His light", harder: ["Tirmidhi 2642: Allah created His creation in darkness, then cast what upon them?", "A shadow", "A storm", "A river"] },
  "Who was guided, he ﷺ said?": { answer: "Whoever the light touched", harder: ["Tirmidhi 2642: some were guided and some went astray. Who was guided?", "Whoever was oldest", "Whoever was strongest", "Whoever was richest"] },
  "The pens have dried with Allah's knowledge.": { answer: "True", harder: "Tirmidhi 2642 ends: the pens have dried with Allah's knowledge." },
  // Jami at-Tirmidhi 2146.
  "What does Allah give a person in the land where he will die?": { answer: "A need to go there", harder: ["Tirmidhi 2146: when Allah decrees a servant will die in a land, what does He give him there?", "A warning dream", "A new house", "A big crowd"] },
  "Who decides the land where each person will die?": { answer: "Allah", harder: ["Tirmidhi 2146: who decrees the land where a servant will die?", "The person himself", "The person's family", "The doctors"] },
  "A need can lead a person to the land where he will die.": { answer: "True", harder: "Tirmidhi 2146 says Allah gives a servant some need in the land where he will die." },
  // Jami at-Tirmidhi 2639.
  "What is written on the card?": { answer: "The two testimonies of faith", harder: ["Tirmidhi 2639: ninety-nine scrolls go on one pan. What is written on the card?", "A list of prayers", "A list of his trips", "The man's name"] },
  "How long is each of the ninety-nine scrolls?": { answer: "As far as the eye can see", harder: ["Tirmidhi 2639: each of the ninety-nine scrolls reaches how far?", "One short page", "One hand span", "One finger long"] },
  "Nothing is heavier than the Name of Allah on the scale.": { answer: "True", harder: "Tirmidhi 2639 says the card is heavy, for nothing is heavier than the Name of Allah." },
  // Jami at-Tirmidhi 2312.
  "What is in every spot of the heavens, he ﷺ said?": { answer: "An angel in sujud", harder: ["Tirmidhi 2312: the heavens moan, with every spot filled. With what?", "A rain cloud", "A flying bird", "A shining star"] },
  "How big is each spot that has an angel?": { answer: "Four fingers wide", harder: ["Tirmidhi 2312: there is no spot in the heavens the size of what without an angel?", "A mile wide", "A city wide", "A valley wide"] },
  "Some parts of the heavens have no angels in them.": { answer: "False", harder: "By Tirmidhi 2312, there are spots in the heavens with no angel." },
  // Sunan an-Nasa'i 3579.
  "When is an Arabian horse allowed its two du'as?": { answer: "Each night before dawn", harder: ["Nasa'i 3579: every Arabian horse may make two du'as. When?", "Each day at noon", "Each day at sunset", "Each week on Friday"] },
  "What does the horse ask Allah for?": { answer: "To be dear to its owner", harder: ["Nasa'i 3579: 'make me the dearest of his family and wealth to him.' What does the horse ask?", "To run faster than all", "To be free of its owner", "To live a long life"] },
  "The horse says Allah gave it to whom He willed of the sons of Adam.": { answer: "True", harder: "Nasa'i 3579: the horse says Allah gave it to whom He willed of the sons of Adam." },
  // Jami at-Tirmidhi 2859.
  "In the parable, what hangs over each open door?": { answer: "A curtain", harder: ["Tirmidhi 2859: walls with open doors on both sides of the path. What hangs over each door?", "A sword", "A lamp", "A bell"] },
  "What are the open doors at the sides of the path?": { answer: "The limits Allah has set", harder: ["Tirmidhi 2859: no one goes past them without the curtain lifting. What are the doors?", "Shops in a market", "Gates of a city", "Doors of a house"] },
  "Callers call out on the straight path.": { answer: "True", harder: "Tirmidhi 2859 says a caller calls at the head of the path, and another above it." },
  // Sahih al-Bukhari 5644.
  "What is the believer like, he ﷺ said?": { answer: "A fresh, soft plant", harder: ["Bukhari 5644: from whatever side the wind comes, it bends it. The believer is like what?", "A tall stone tower", "A dry old branch", "A heavy iron gate"] },
  "What does the plant do when the wind stops?": { answer: "Stands straight again", harder: ["Bukhari 5644: the wind bends the tender plant. What does it do when the wind is still?", "Breaks in two", "Falls to the ground", "Dries up"] },
  "Being bent by trials means a believer has lost his faith.": { answer: "False", harder: "By Bukhari 5644, a believer bent by trials has lost his faith." },
  // Sahih al-Bukhari 5646.
  "Who suffered most from illness, Aishah said?": { answer: "The Messenger of Allah ﷺ", harder: ["Bukhari 5646: 'I never saw anyone suffer more from illness than...' whom, Aishah said?", "The old men", "The young men", "The Bedouins"] },
  "You fall very ill. What should you remember?": { answer: "He ﷺ was ill even more", harder: ["Bukhari 5646: Aishah never saw anyone suffer more from illness than him ﷺ. You fall ill. Remember what?", "No one else gets ill", "Allah has left you", "Faith is of no use"] },
  "Strong faith means a person will never feel pain.": { answer: "False", harder: "By Bukhari 5646, strong faith keeps a person from ever feeling pain." },
  // Sunan Ibn Majah 4204.
  "What did he ﷺ fear for us more than the Dajjal?": { answer: "Hidden shirk", harder: ["Ibn Majah 4204: they were talking of the Dajjal. What did he ﷺ fear for them more?", "Hunger", "Cold winters", "Wild animals"] },
  "What hidden shirk did he ﷺ describe?": { answer: "Praying well because someone watches", harder: ["Ibn Majah 4204: what did he ﷺ describe as hidden shirk?", "Praying in the masjid", "Praying with others", "Praying at night"] },
  "Making our prayer look good only for people is fine.": { answer: "False", harder: "By Ibn Majah 4204, making the prayer look good because someone watches is fine." },
  // Al-Adab Al-Mufrad 716.
  "Shirk is more hidden than what, he ﷺ told Abu Bakr?": { answer: "The movement of ants", harder: ["Al-Adab Al-Mufrad 716: shirk creeps among people more quietly than what?", "The stars by day", "The roots of a tree", "The fish in the sea"] },
  "To whom did he ﷺ say shirk is more hidden than ants?": { answer: "Abu Bakr", harder: ["Al-Adab Al-Mufrad 716: 'shirk creeps more quietly than ants.' To whom did he ﷺ say it?", "Umar ibn al-Khattab", "Bilal ibn Rabah", "Abu Dharr"] },
  "He ﷺ taught Abu Bakr a du'a to keep away shirk.": { answer: "True", harder: "In Al-Adab Al-Mufrad 716 he ﷺ taught Abu Bakr words that take away shirk." },
  // Jami at-Tirmidhi 983.
  "What two things were in the young man's heart?": { answer: "Hope in Allah and fear of his sins", harder: ["Tirmidhi 983: 'how do you find yourself?' What did the dying young man say?", "Anger and worry", "Pride and joy", "Doubt and sadness"] },
  "What does Allah give one who has both, he ﷺ said?": { answer: "What he hopes, and safety from his fears", harder: ["Tirmidhi 983: hope and fear together in a heart like his. What does Allah give?", "Wealth and fame", "Nothing at all", "A long life"] },
  "He ﷺ visited the young man when he was dying.": { answer: "True", harder: "In Tirmidhi 983 he ﷺ visited a young man who was dying." },
  // Sunan Abi Dawud 5112.
  "What did he ﷺ say three times on hearing this?": { answer: "Allahu akbar", harder: ["Abu Dawud 5112: the man's thoughts were so bad he'd rather burn than speak them. What did he ﷺ say three times?", "Astaghfirullah", "Bismillah", "SubhanAllah"] },
  "What had Shaytan's plot been brought down to?": { answer: "Mere whispers", harder: ["Abu Dawud 5112: 'praise be to Allah, who has reduced the plot of Shaytan to' what?", "A great army", "A strong rope", "A locked door"] },
  "The man would rather burn to charcoal than speak his bad thoughts.": { answer: "True", harder: "In Abu Dawud 5112 the man would rather be burnt to charcoal than speak his thoughts." },
  // Sunan Ibn Majah 88.
  "What did he ﷺ say the heart is like?": { answer: "A feather", harder: ["Ibn Majah 88: the likeness of the heart is that of what?", "A heavy iron gate", "A deep well", "A tall mountain"] },
  "What blows the feather about?": { answer: "The wind", harder: ["Ibn Majah 88: the heart is like a feather in the desert, blown about by what?", "A river", "The rain", "A herd of camels"] },
  "He ﷺ likened the heart to a feather the wind blows about.": { answer: "True", harder: "Ibn Majah 88 likens the heart to a feather blown about by the wind." },
  // Sunan Ibn Majah 3029.
  "What did he ﷺ warn the people about at Hajj?": { answer: "Going to extremes in religion", harder: ["Ibn Majah 3029: seven small pebbles, then 'O people, beware of...' what?", "Losing their pebbles", "Selling their camels", "Buying too many gifts"] },
  "Why must we beware of going to extremes?": { answer: "Extremes ruined people before us", harder: ["Ibn Majah 3029: why beware of going to extremes, he ﷺ said?", "They cost too much money", "They make people laugh", "They are only for kings"] },
  "Going to extremes in religion is a good thing.": { answer: "False", harder: "Ibn Majah 3029 praises going to extremes in religion." },
  // Sahih Muslim 2670.
  "Who did he ﷺ say were ruined?": { answer: "Those who go to extremes", harder: ["Muslim 2670: 'ruined are...' whom?", "Those who walk fast", "Those who live by the sea", "Those who build houses"] },
  "How many times did he ﷺ say it?": { answer: "Three times", harder: ["Muslim 2670: 'ruined are those who go too far.' How many times did he ﷺ say it?", "Five times", "Once", "Seven times"] },
  "Making religion harder than Allah made it leads to ruin.": { answer: "True", harder: "Muslim 2670 says those who go too far are ruined." },
  // Sahih al-Bukhari 6704.
  "What had Abu Isra'il vowed to do?": { answer: "Stand in the sun and not speak", harder: ["Bukhari 6704: during the khutbah he ﷺ saw a man standing. What had Abu Isra'il vowed?", "Give away all his camels", "Stay awake for a month", "Never eat bread again"] },
  "Which part of his vow did he ﷺ let him keep?": { answer: "His fast", harder: ["Bukhari 6704: 'tell him to speak, come into the shade and sit, but let him...' do what?", "Standing in the sun", "Never speaking", "Never sitting down"] },
  "Standing in the sun with no shade is worship Allah asks for.": { answer: "False", harder: "By Bukhari 6704, standing in the sun without shade is worship Allah wants." },
  // Sunan Abi Dawud 4776.
  "A good way and moderation are a part of what?": { answer: "Prophethood", harder: ["Abu Dawud 4776: a good way, a calm manner and moderation are one of the parts of what?", "Trade", "Kingship", "Poetry"] },
  "What is moderation?": { answer: "Not too much and not too little", harder: ["Abu Dawud 4776 names moderation among the parts of prophethood. What is moderation?", "Copying whatever others do", "Always doing the most", "Doing nothing at all"] },
  "A calm and dignified manner is a part of the prophets' ways.": { answer: "True", harder: "Abu Dawud 4776 counts a calm, dignified manner among the parts of prophethood." },
  // Sahih Muslim 866a.
  "What was his ﷺ khutbah like, Jabir ibn Samurah said?": { answer: "Of moderate length", harder: ["Muslim 866a: his ﷺ prayer and his khutbah were both what, Jabir ibn Samurah said?", "Read from a scroll", "Only given once a year", "Hours and hours long"] },
  "How did Jabir ibn Samurah know his ﷺ prayer?": { answer: "He prayed behind him ﷺ", harder: ["Muslim 866a: 'I used to pray with the Messenger of Allah ﷺ.' How did Jabir ibn Samurah know?", "He read it in a book", "He heard it from a traveler", "He saw it in a dream"] },
  "The khutbah should go on as long as it can.": { answer: "False", harder: "By Muslim 866a, his ﷺ khutbah went on as long as possible." },
  // Sunan an-Nasa'i 1305.
  "When does Ammar's du'a ask Allah to keep us balanced?": { answer: "In wealth and in poverty", harder: ["Nasa'i 1305: Ammar's du'a asks to be balanced when?", "Only on journeys", "Only in Ramadan", "Only at night"] },
  "When does the du'a ask to speak the truth?": { answer: "When pleased and when angry", harder: ["Nasa'i 1305: Ammar's du'a asks to speak the truth when?", "Only to our friends", "Only in the masjid", "Only when it is easy"] },
  "Ammar ibn Yasir learned the du'a from the Prophet ﷺ.": { answer: "True", harder: "In Nasa'i 1305 Ammar said he heard these du'as from the Prophet ﷺ." },
  // Sunan an-Nasa'i 1627.
  "When could they see him ﷺ praying at night, Anas said?": { answer: "Whenever they wished", harder: ["Nasa'i 1627: when could they see him ﷺ praying at night, Anas said?", "Only in Ramadan", "Only once a year", "Only on Fridays"] },
  "What else could they see him ﷺ doing at night?": { answer: "Sleeping", harder: ["Nasa'i 1627: whenever they wished they saw him ﷺ praying at night, and doing what else?", "Eating a feast", "Trading in the market", "Riding to Makkah"] },
  "Anas could see him ﷺ sleeping at night, too.": { answer: "True", harder: "Nasa'i 1627 says they could see him ﷺ sleeping at night whenever they wished." },
  // Sahih Muslim 2965.
  "Which servant does Allah love, he ﷺ said?": { answer: "The God-fearing, content, hidden one", harder: ["Muslim 2965: Allah loves which servant, he ﷺ said?", "The loudest one", "The most famous one", "The one with the most gold"] },
  "What makes a servant hidden?": { answer: "Doing good without seeking fame", harder: ["Muslim 2965: Allah loves the servant who is 'hidden'. What makes a servant hidden?", "Living in a cave", "Wearing dark clothes", "Never going outside"] },
  "Allah loves the one who chases fame and praise.": { answer: "False", harder: "Muslim 2965 says Allah loves the servant who seeks fame." },
  // Sunan an-Nasa'i 3137.
  "Who are the first three to be judged?": { answer: "A fighter, a scholar, a rich giver", harder: ["Nasa'i 3137: the first three judged on the Day of Resurrection are who?", "A king, a farmer, a sailor", "Three brothers", "Three travellers"] },
  "Why did the fighter fight, Allah tells him?": { answer: "To be called brave", harder: ["Nasa'i 3137: 'you lie; you fought so that it would be said...' Why did he fight?", "To get rich", "To win a race", "To see new lands"] },
  "A deed done only for praise still pleases Allah.": { answer: "False", harder: "In Nasa'i 3137, deeds done for praise still earn reward with Allah." },
  // Sunan Abi Dawud 3664.
  "Knowledge of the deen should be sought for what?": { answer: "For the Face of Allah", harder: ["Abu Dawud 3664: knowledge 'that should be sought for' what?", "For a big salary", "For people's praise", "To win debates"] },
  "What will he miss who learns it only for the world?": { answer: "The fragrance of Paradise", harder: ["Abu Dawud 3664: whoever learns it only for this world will not find what?", "A good harvest", "A long life", "The sight of the sea"] },
  "Learning the deen just to gain the world is fine.": { answer: "False", harder: "By Abu Dawud 3664, learning the deen only for this world is fine." },
  // Sunan Ibn Majah 4228.
  "What did the man with knowledge but no wealth say?": { answer: "If I had wealth, I would do the same", harder: ["Ibn Majah 4228: given knowledge but not wealth, what did the man say?", "I will sell my knowledge", "I want to keep my knowledge", "Wealth is a waste of time"] },
  "How is his reward, next to the man who spent?": { answer: "He gets the same reward", harder: ["Ibn Majah 4228: 'they are equal in reward'. How is his reward next to the one who spent?", "He gets the blame", "He gets half", "He gets nothing"] },
  "A sincere wish to do good can count with Allah.": { answer: "True", harder: "Ibn Majah 4228 says the man who sincerely wished to spend rightly is equal in reward." },
  // Sunan Ibn Majah 4105.
  "What does Allah do for one whose aim is the Hereafter?": { answer: "Settles his affairs", harder: ["Ibn Majah 4105: whoever has the Hereafter as his aim, what does Allah do for his affairs?", "Scatters his affairs", "Takes his home", "Makes him poor"] },
  "What happens to one focused only on this world?": { answer: "He always fears poverty", harder: ["Ibn Majah 4105: whoever has only this world as his concern, what does Allah make him fear?", "He never feels hungry", "He gets all he wants", "He lives forever"] },
  "Provision still comes to one who aims for the Hereafter.": { answer: "True", harder: "Ibn Majah 4105 says the world comes anyway to one whose aim is the Hereafter." },
  // Sunan Abi Dawud 3199.
  "How should your du'a be in the funeral prayer?": { answer: "Sincere, from the heart", harder: ["Abu Dawud 3199: 'when you pray over the dead, make your du'a for him' how?", "Said for show", "Said without thinking", "Fast and careless"] },
  "Which prayer was he ﷺ speaking of?": { answer: "The funeral prayer", harder: ["Abu Dawud 3199: 'when you pray over the dead'. Which prayer is this?", "The eclipse prayer", "The Friday prayer", "The Isha prayer"] },
  "In the funeral prayer, we make du'a for the one who died.": { answer: "True", harder: "Abu Dawud 3199 tells us to make du'a for the dead in the funeral prayer." },
  // Sunan Ibn Majah 77.
  "What would be better for people than their own deeds, he ﷺ said?": { answer: "Allah's mercy on them", harder: ["Ibn Majah 77: what would be better for people than their own deeds, he ﷺ said?", "Their strength in battle", "Their gold and silver", "Their sons and tribes"] },
  "Spending as much as Mount Uhud is not accepted until what?": { answer: "You believe in the Decree", harder: ["Ibn Majah 77: spending as much as Mount Uhud would not be accepted until what?", "You give it in Makkah", "You give it on a Friday", "You give it all at once"] },
  "Ibn ad-Daylami asked several Companions, and they all said the same.": { answer: "True", harder: "In Ibn Majah 77 Ibn ad-Daylami asked several Companions, and each said much the same." },
  // Sunan Ibn Majah 85.
  "What were the Companions arguing about when he ﷺ came out?": { answer: "The Divine Decree", harder: ["Ibn Majah 85: his ﷺ face was red with anger. What were the Companions disputing?", "The price of dates", "The best camel", "The coming rain"] },
  "What led to the doom of the nations before, he ﷺ said?": { answer: "Setting the Quran against itself", harder: ["Ibn Majah 85: 'you are setting one part of the Quran against another.' What did that do to nations?", "Digging deep wells", "Planting date palms", "Raising sheep and goats"] },
  "Arguing about the Decree made him ﷺ angry.": { answer: "True", harder: "In Ibn Majah 85 his ﷺ face was red with anger when they disputed about the Decree." },
  // Jami at-Tirmidhi 2062.
  "What would overcome the Decree, if anything could, he ﷺ said?": { answer: "The evil eye", harder: ["Tirmidhi 2062: 'if anything could overcome the Decree,' what would?", "A sharp sword", "A strong wind", "A loud shout"] },
  "Can anything overcome what Allah has decreed?": { answer: "No, nothing can", harder: ["Tirmidhi 2062: if anything could, the evil eye would overcome the Decree. Can anything?", "Yes, a big army can", "Yes, a clever plan can", "Yes, great wealth can"] },
  "If asked to wash because of the evil eye, he ﷺ said to wash.": { answer: "True", harder: "Tirmidhi 2062: when asked to wash because of the evil eye, wash." },
  // Jami at-Tirmidhi 2141.
  "What was in the book in his ﷺ right hand?": { answer: "Names of the people of Paradise", harder: ["Tirmidhi 2141: two books in his ﷺ hands. What was in the one in his right hand?", "Names of the kings of Persia", "Names of the stars in the sky", "Names of the trees of Makkah"] },
  "Can anyone be added to those books or taken from them?": { answer: "No, never", harder: ["Tirmidhi 2141: 'nothing will ever be added to it or taken from it.' Can it change?", "Yes, by the rich", "Yes, by the strong", "Yes, by any person"] },
  "He ﷺ still told them to aim for what is right.": { answer: "True", harder: "In Tirmidhi 2141, asked 'then why work?', he ﷺ said aim for what is right." },
  // Sahih al-Bukhari 6611.
  "How many groups of advisers does every caliph have?": { answer: "Two groups", harder: ["Bukhari 6611: no caliph is appointed except that he has how many groups of advisers?", "Seven groups", "Ten groups", "One group"] },
  "Who is truly protected, he ﷺ said?": { answer: "The one Allah protects", harder: ["Bukhari 6611: one group urges good, one urges bad. Who is protected, he ﷺ said?", "The one with most land", "The one with most guards", "The one with most gold"] },
  "One group of advisers urges good, and the other urges bad.": { answer: "True", harder: "Bukhari 6611 says one group of advisers urges good and the other urges bad." },
  // Sunan Ibn Majah 2144.
  "What will every soul receive before it dies, he ﷺ said?": { answer: "All its provision", harder: ["Ibn Majah 2144: 'no soul will die until it has received' what?", "Great fame", "A big house", "All its wishes"] },
  "How should we seek a living, he ﷺ said?": { answer: "Moderately, taking only what is lawful", harder: ["Ibn Majah 2144: 'fear Allah and be moderate in seeking a living.' How should we seek it?", "Greedily, taking all we can", "Lazily, waiting at home", "Secretly, hiding it from all"] },
  "Provision may be slow, but it will still reach you.": { answer: "True", harder: "Ibn Majah 2144 says provision may be slow, yet every soul receives all of it." },
  // Sunan an-Nasa'i 1282.
  "Where do these angels travel, he ﷺ said?": { answer: "Around the earth", harder: ["Nasa'i 1282: Allah has angels who travel where, bringing him ﷺ the salams?", "Only in Makkah", "Only in the sky", "Under the sea"] },
  "What do they bring to him ﷺ from his Ummah?": { answer: "Their salams", harder: ["Nasa'i 1282: the travelling angels convey to him ﷺ what from his Ummah?", "Their letters", "Their gifts", "Their coins"] },
  "Our salams on the Prophet ﷺ reach him.": { answer: "True", harder: "Nasa'i 1282 says angels convey the salams of his Ummah to him ﷺ." },
  // Sunan Ibn Majah 997.
  "On which row do Allah and the angels send blessings?": { answer: "The first row", harder: ["Ibn Majah 997: 'Allah and the angels send blessings upon' which row?", "The third row", "The last row", "The middle row"] },
  "Who sends blessings on the first row, he ﷺ said?": { answer: "Allah and the angels", harder: ["Ibn Majah 997: who sends blessings upon the first row?", "Only the imam", "Only the mu'adhdhin", "Only the people"] },
  "Allah blesses those who pray in the first row.": { answer: "True", harder: "Ibn Majah 997 says Allah sends blessings upon the first row." },
  // Sunan Ibn Majah 801.
  "Before whom does Allah boast of those who wait?": { answer: "The angels", harder: ["Ibn Majah 801: 'look at My slaves, awaiting another prayer.' Before whom does Allah boast?", "The poets", "The kings", "The jinn"] },
  "Which prayer had they just prayed with him ﷺ?": { answer: "Maghrib", harder: ["Ibn Majah 801: some went home, some stayed. After which prayer?", "Fajr", "Zuhr", "Asr"] },
  "Allah praises those who wait in the masjid for the next prayer.": { answer: "True", harder: "Ibn Majah 801: Allah boasts of those who wait for the next obligatory prayer." },
  // Jami at-Tirmidhi 3954.
  "Which land did he ﷺ say Tuba is for?": { answer: "Ash-Sham", harder: ["Tirmidhi 3954: 'Tuba is for' which land, he ﷺ said?", "Rome", "Abyssinia", "Persia"] },
  "Why is Tuba for Ash-Sham, he ﷺ said?": { answer: "Angels spread their wings over it", harder: ["Tirmidhi 3954: why is Tuba for Ash-Sham?", "Its rivers are the most", "Its markets are the biggest", "Its kings are the richest"] },
  "Zayd ibn Thabit was collecting the Quran with him ﷺ that day.": { answer: "True", harder: "In Tirmidhi 3954 they were collecting the Quran on pieces of cloth with him ﷺ." },
  // Jami at-Tirmidhi 3849.
  "Whose bier did the angels carry, he ﷺ said?": { answer: "Sa'd ibn Mu'adh", harder: ["Tirmidhi 3849: 'the angels were carrying him.' Whose bier?", "Umayyah ibn Khalaf", "Utbah ibn Rabi'ah", "Abu Lahab"] },
  "What did the hypocrites say as his bier was carried?": { answer: "How light it is", harder: ["Tirmidhi 3849: as Sa'd's bier was carried, what did the hypocrites say?", "How long it is", "How slow it is", "How heavy it is"] },
  "The words of the hypocrites about the bier reached him ﷺ.": { answer: "True", harder: "In Tirmidhi 3849 the hypocrites' words about the bier reached him ﷺ." },
  // Jami at-Tirmidhi 3117.
  "Who is responsible for the clouds, he ﷺ said?": { answer: "One of the angels", harder: ["Tirmidhi 3117: 'tell us about thunder.' Who is responsible for the clouds?", "One of the birds", "One of the stars", "One of the kings"] },
  "Where does that angel drive the clouds?": { answer: "Wherever Allah wills", harder: ["Tirmidhi 3117: the angel of the clouds drives them where?", "Wherever people ask", "Only over the sea", "Only over Makkah"] },
  "The Jews who asked said he ﷺ had told the truth.": { answer: "True", harder: "In Tirmidhi 3117 those who asked said: you have told the truth." },
};
