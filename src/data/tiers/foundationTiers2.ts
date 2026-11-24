import type { TierEntry } from "../questionTiers";

/**
 * Basics (foundation): harder and expert ways to ask the same questions, batch 2 (unique prompts 60-119). Each one
 * keeps the question's answer and asks only what the lesson's own source and learn card say (Bukhari 73, 110, 162,
 * 1804, 2582, 2949, 2993, 5456, 5624, 6263; Muslim 2046, 2052, 2699; Abu Dawud 2571, 2606, 2628, 2639, 3725, 3851;
 * Mishkat 280). Keyed by the question's English prompt (see questionTiers.ts).
 */
export const FOUNDATION_TIERS_2: Record<string, TierEntry> = {
  // Bukhari 110: whoever lies about him ﷺ on purpose, let him take his seat in the Fire.
  "Why does every hadith in this app show a source?": {
    answer: "Lying about him ﷺ is a grave sin",
    harder: ["Bukhari 110 is why every hadith here is checked. What does it warn about?", "Reading too fast", "Forgetting a hadith", "Writing in pencil"]
  },
  "A friend shares a hadith with no source. What do you do?": {
    answer: "Check it before sharing",
    harder: ["A message says 'the Prophet ﷺ said...' with no source. What is the careful step?", "Send it to everyone", "Make it shorter", "Add your own words"]
  },
  "Making up a hadith is a small thing.": {
    answer: "False",
    harder: "Saying the Prophet ﷺ said something he did not say is a small slip with no warning.",
    expert: "Bukhari 110 says nothing about the Fire for one who lies about him ﷺ on purpose."
  },
  // Bukhari 73: no envy except for two.
  "Whose wisdom should we wish for?": {
    answer: "One who acts on it and teaches it",
    harder: ["In Bukhari 73, which wise person may you wish to be like?", "One who keeps it secret", "One who argues with it", "One who only reads it"]
  },
  "Which rich person is worth copying?": {
    answer: "One who spends it rightly",
    harder: ["Bukhari 73 names two people worth envying. Which rich one is the first?", "One who saves it all", "One who buys big houses", "One who lends with interest"]
  },
  "Teaching what you know is a reason to be admired.": {
    answer: "True",
    harder: "In Bukhari 73, one of the two worth envying judges by wisdom and teaches it."
  },
  // Muslim 2699: people gathered in a house of Allah reciting and studying the Quran.
  "What surrounds people who study Quran together?": {
    answer: "The angels",
    harder: ["People gather in a masjid to recite and study the Quran. Who surrounds them?", "The jinn", "The birds", "The scholars"]
  },
  "What comes down on them?": {
    answer: "Calm and mercy",
    harder: ["Muslim 2699: what descends on those who study the Quran together in a masjid?", "Wealth and fame", "Rain and wind", "Sleep and rest"]
  },
  "Allah mentions them to those with Him.": {
    answer: "True",
    harder: "In Muslim 2699, Allah speaks of those studying the Quran to the ones who are with Him."
  },
  // Mishkat 280 (Abu Hurairah, transmitted by Darimi).
  "What is knowledge that brings no benefit like, he ﷺ said?": {
    answer: "A treasure never spent",
    harder: ["Abu Hurairah reported a likeness for knowledge with no benefit. What is it?", "A tree with no shade", "A well with no rope", "A house with no door"]
  },
  "What does the knowledge in his ﷺ likeness lack?": {
    answer: "Benefit",
    harder: ["Knowledge is likened to a treasure that is never spent. What is missing from it?", "Length", "Books", "Teachers"]
  },
  "Knowledge is meant to be used for good, not only stored.": {
    answer: "True",
    harder: "Knowledge kept but never used is likened to a treasure that is never spent."
  },
  // Bukhari 162 (Abu Hurairah).
  "You wake up and want to make wudu from a bowl. What comes first?": {
    answer: "Wash your hands",
    harder: ["Bukhari 162: before putting your hand into the water vessel after sleep, what do you do?", "Rinse your mouth", "Wipe your head", "Dip your hands in"]
  },
  "Why wash your hands after sleep?": {
    answer: "No one knows where they were",
    harder: ["What reason does Bukhari 162 give for washing the hands after waking?", "Hands get too hot", "The water is cold", "To be seen washing"]
  },
  "Islam teaches us to be clean from the moment we wake.": {
    answer: "True",
    harder: "After sleep, the hands are washed before they go into the water."
  },
  // Bukhari 6263.
  "What did Qatadah ask Anas about?": {
    answer: "Whether the Sahabah shook hands",
    harder: ["In Bukhari 6263, a student asked Anas a question about the Sahabah. What was it?", "Whether they hugged on Eid", "Whether they bowed to guests", "Whether they kissed hands"]
  },
  "What did Anas answer?": {
    answer: "Yes",
    harder: ["Qatadah asked if shaking hands was the habit of the Sahabah. What was Anas's reply?", "Only the elders", "Only in Makkah", "Never"]
  },
  "Shaking hands when they met was a habit of the Sahabah.": {
    answer: "True",
    harder: "Anas told Qatadah that the Sahabah shook hands with each other."
  },
  // Bukhari 5456 (Ibn Abbas).
  "What should you do before wiping your hand after eating?": {
    answer: "Lick your fingers",
    harder: ["Ibn Abbas reported: do not wipe your hand after eating until you have done what?", "Washed it with soap", "Said the adhan", "Dried it in the sun"]
  },
  "Who told us Bukhari 5456?": {
    answer: "Ibn Abbas",
    harder: ["Which Companion reported: lick your fingers before wiping your hand?", "Abu Hurairah", "Aishah", "Anas"]
  },
  "Even small sunnahs at the table are worth keeping.": {
    answer: "True",
    harder: "Licking the fingers before wiping the hand is a sunnah of eating."
  },
  // Bukhari 2993 (Jabir).
  "What did the Sahabah say going up a hill?": {
    answer: "Allahu akbar",
    harder: ["Jabir said: when we went up, we said ... ?", "Subhanallah", "La ilaha illallah", "Alhamdulillah"]
  },
  "What did they say going down?": {
    answer: "Subhanallah",
    harder: ["Jabir said: when we came down into a valley, we said ... ?", "Allahu akbar", "Astaghfirullah", "La hawla wa la quwwata"]
  },
  "We can remember Allah even while we travel.": {
    answer: "True",
    harder: "On journeys the Sahabah said Allahu akbar going up and Subhanallah going down."
  },
  // Bukhari 2582 (Anas).
  "Which gift did he ﷺ never turn down?": {
    answer: "Perfume",
    harder: ["Anas reported a gift he ﷺ would never refuse. What was it?", "Dates", "Milk", "Honey"]
  },
  "Which habit of his ﷺ did Anas follow?": {
    answer: "Never refusing perfume",
    harder: ["Anas kept one habit he saw in him ﷺ about gifts. Which one?", "Never refusing silver", "Never refusing horses", "Never refusing clothes"]
  },
  "Smelling nice is part of the sunnah.": {
    answer: "True",
    harder: "He ﷺ did not turn down perfume when it was given to him."
  },
  // Bukhari 5624 (Jabir).
  "Which of these did he ﷺ tell us to do before bed?": {
    answer: "Put out the lamps",
    harder: ["Bukhari 5624 lists what to do at night. Which one is in it?", "Leave the lamps lit", "Open the windows wide", "Leave the drinks open"]
  },
  "No lid at hand? How can you cover a cup?": {
    answer: "Lay a stick across it",
    harder: ["At night you should cover your vessels. If you have nothing to cover one with, what then?", "Turn it upside down full", "Leave it as it is", "Throw it out"]
  },
  "Leaving a fire burning while everyone sleeps is fine.": {
    answer: "False",
    harder: "In Bukhari 5624, lamps and fires are left burning when the family goes to sleep."
  },
  // Bukhari 2949 (Ka'b ibn Malik).
  "On which day did he ﷺ usually set out on a journey?": {
    answer: "Thursday",
    harder: ["Ka'b ibn Malik said he ﷺ liked to set out on al-khamis. Which day is that?", "Friday", "Monday", "Wednesday"]
  },
  "How often did he ﷺ start a journey on another day?": {
    answer: "Rarely",
    harder: ["He ﷺ liked to set out on Thursday. How often did he set out on another day?", "Most of the time", "Every month", "Always"]
  },
  "Ka'b ibn Malik is the one who told us of the Thursday journeys.": {
    answer: "True",
    harder: "The Companion who reported the Thursday journeys in Bukhari 2949 is Ka'b ibn Malik."
  },
  // Abu Dawud 2606 (Sakhr al-Ghamidi).
  "Which part of the day did he ﷺ ask Allah to bless?": {
    answer: "The early morning",
    harder: ["'O Allah, bless my Ummah in its ...' Which time did he ﷺ name?", "Evenings", "Nights", "Afternoons"]
  },
  "Sakhr sent his goods out early in the day. What happened to him?": {
    answer: "He grew very rich",
    harder: ["Sakhr al-Ghamidi was a trader who sent his goods out at the start of the day. What came of it?", "He had to stop trading", "He lost his camels", "He moved away"]
  },
  "He ﷺ sent out groups at the start of the day.": {
    answer: "True",
    harder: "When he ﷺ sent out a group or an army, he sent them at the start of the day."
  },
  // Abu Dawud 2571 (Anas).
  "Why did he ﷺ say to keep to travelling by night?": {
    answer: "The earth is crossed easily",
    harder: ["Anas reported: keep to ad-duljah. What reason did he ﷺ give?", "It is cooler for the food", "Robbers sleep at night", "The moon shows the way"]
  },
  "What does ad-duljah mean?": {
    answer: "Travelling by night",
    harder: ["Abu Dawud 2571 uses the word ad-duljah. What is it?", "Travelling at noon", "Travelling alone", "Travelling by sea"]
  },
  "Travelling part of the night can make the road feel shorter.": {
    answer: "True",
    harder: "He ﷺ said the earth is folded up for the traveller at night."
  },
  // Abu Dawud 2628 (Abu Tha'labah al-Khushani).
  "When they camped, where had the people spread out?": {
    answer: "In the valleys and passes",
    harder: ["Abu Tha'labah said that when people stopped on a journey they scattered. Where?", "Along the beach", "In the orchards", "Around the wells"]
  },
  "After his words, how did they camp?": {
    answer: "Close together",
    harder: ["After he ﷺ spoke, they camped so that one cloth could have covered them. How were they?", "Each one alone", "In two far groups", "Behind the hills"]
  },
  "He ﷺ said spreading out in the valleys was from Shaytan.": {
    answer: "True",
    harder: "Abu Tha'labah reported that he ﷺ called scattering in the valleys and passes the work of Shaytan."
  },
  // Abu Dawud 2639 (Jabir).
  "Which part of the group did he ﷺ keep to when travelling?": {
    answer: "The back",
    harder: ["Jabir said he ﷺ stayed in one place on journeys to help the weak. Where?", "The middle", "The very front", "Out on the side"]
  },
  "Whom did he ﷺ urge on, riding at the back?": {
    answer: "The weak",
    harder: ["Abu Dawud 2639: riding behind everyone, whom did he ﷺ help along?", "The leaders", "The scouts", "The traders"]
  },
  "He ﷺ would let someone ride behind him on his mount.": {
    answer: "True",
    harder: "Jabir reported that he ﷺ took someone up behind him and made du'a for them all."
  },
  // Bukhari 1804 (Abu Hurairah).
  "What does travel keep a person from, he ﷺ said?": {
    answer: "Eating, drinking and sleeping well",
    harder: ["'Travel is a piece of hardship', he ﷺ said. What does it keep you from?", "Visiting and talking", "Working and earning", "Walking and running"]
  },
  "When your work on a journey is done, what should you do?": {
    answer: "Hurry back to your family",
    harder: ["Bukhari 1804: once a traveller's need is met, what should he do?", "Visit every town on the way", "Wait for more work", "Stay for a while"]
  },
  "Once your work is done, it is best to stay away a long time.": {
    answer: "False",
    harder: "Bukhari 1804 says to stay longer on a journey once your need is met."
  },
  // Abu Dawud 3851 (Abu Ayyub al-Ansari).
  "When did he ﷺ praise Allah with these words?": {
    answer: "After eating or drinking",
    harder: ["Abu Ayyub reported a praise of Allah for giving food and drink. When did he ﷺ say it?", "Before the night prayer", "When he saw rain", "When he woke up"]
  },
  "What did he ﷺ thank Allah for making easy?": {
    answer: "Swallowing the food",
    harder: ["'Praise be to Allah who gave food and drink, and made it ...' What did He make easy?", "Growing the food", "Sharing the food", "Finding the food"]
  },
  "He ﷺ thanked Allah for food and drink.": {
    answer: "True",
    harder: "After eating or drinking he ﷺ praised Allah who gave the food and made it easy to swallow."
  },
  // Muslim 2052 (Jabir).
  "What did his family have to eat with the bread?": {
    answer: "Only vinegar",
    harder: ["He ﷺ asked his family for something to eat with bread. What did they have?", "Only olive oil", "Only butter", "Only cheese"]
  },
  "What did Jabir love ever since that day?": {
    answer: "Vinegar",
    harder: ["Jabir heard him ﷺ praise a food at home and loved it from then on. Which food?", "Bread", "Olive oil", "Honey"]
  },
  "He ﷺ ate the plain food at home and praised it.": {
    answer: "True",
    harder: "He ﷺ said vinegar is a good thing to eat with bread."
  },
  // Muslim 2046 (Aishah).
  "Which food keeps a family from hunger, he ﷺ said?": {
    answer: "Dates",
    harder: ["'A family that has these will not go hungry,' he ﷺ told Aishah. What?", "Bread", "Milk", "Barley"]
  },
  "To whom did he ﷺ say these words?": {
    answer: "Aishah",
    harder: ["He ﷺ said 'a house with no dates, its people are hungry' two or three times. Who heard it?", "Fatimah", "Hafsah", "Umm Salamah"]
  },
  "He ﷺ said a home with dates will not go hungry.": {
    answer: "True",
    harder: "He ﷺ said the words about dates to Aishah two or three times."
  },
  // Abu Dawud 3725 (Abdullah ibn Abi Awfa).
  "Who should drink last, he ﷺ said?": {
    answer: "The one who serves",
    harder: ["Abdullah ibn Abi Awfa reported who drinks last when drinks are handed out. Who?", "The host's son", "The first to arrive", "The thirstiest one"]
  },
  "When serving water to people, when do you drink?": {
    answer: "After everyone else",
    harder: ["You are handing out the drinks. Per Abu Dawud 3725, when is your turn?", "Before the guests", "With the eldest", "Never at all"]
  },
  "The one serving the drinks should drink first.": {
    answer: "False",
    harder: "Abu Dawud 3725 says the one who serves the people drinks before them."
  }
};
