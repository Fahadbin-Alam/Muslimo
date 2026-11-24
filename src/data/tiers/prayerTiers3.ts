import type { TierEntry } from "../questionTiers";

/**
 * Prayer: harder and expert ways to ask the same questions, batch 3 (unique prompts 275-394: praying on a journey,
 * praying together, the times of the five prayers, the words said in salah, calm and focus, ruku' and sujud,
 * Jumu'ah, and the night prayer). Each one keeps the question's answer and asks only what the lesson's own source
 * says. Keyed by the question's English prompt (see questionTiers.ts).
 */
export const PRAYER_TIERS_3: Record<string, TierEntry> = {
  // Bukhari 1094.
  "Which prayers did he ﷺ pray while riding?": {
    answer: "The voluntary prayers",
    harder: ["Bukhari 1094, from Jabir: on his mount, facing the way it went, which prayers did he ﷺ pray?", "Only Jumu'ah", "Only Eid", "None at all"]
  },
  "Which way did he face when riding?": {
    answer: "The way he was travelling",
    harder: ["Bukhari 1094: praying extra prayers on his camel, which way did he ﷺ face?", "Always backwards", "Up at the sky", "He shut his eyes only"]
  },
  "Travelling did not stop him ﷺ from extra prayers.": {
    answer: "True",
    harder: "Jabir told in Bukhari 1094 that he ﷺ kept up his voluntary prayers while riding on a journey."
  },
  // Bukhari 2996.
  "What does the sick person get for deeds he used to do?": {
    answer: "The same reward",
    harder: ["Bukhari 2996, from Abu Musa: one falls ill and cannot do his usual good deeds. What is written for him?", "No reward", "Half a reward", "A punishment"]
  },
  "Who else keeps that reward?": {
    answer: "The traveller",
    harder: ["Bukhari 2996: besides the sick person, who still has his usual deeds written for him?", "The one who stops praying", "The lazy one", "No one"]
  },
  "Allah still writes the good habits of someone who becomes ill.": {
    answer: "True",
    harder: "In Bukhari 2996 the sick person and the traveller get written what they used to do when healthy and at home."
  },
  // Abu Dawud 547.
  "Which sheep does the wolf eat, he ﷺ said?": {
    answer: "The one that strays alone",
    harder: ["Abu Dawud 547, from Abu ad-Darda: urging prayer together, which sheep did he ﷺ say the wolf eats?", "The biggest sheep", "The fastest sheep", "The one in the middle"]
  },
  "What happens to three men in a village who do not pray together?": {
    answer: "Shaytan takes hold of them",
    harder: ["Abu Dawud 547: if three men in a village or the desert do not pray together, what happens?", "They grow very rich", "They become very strong", "They all sleep well"]
  },
  "Praying together keeps you safe, like sheep in a flock.": {
    answer: "True",
    harder: "In Abu Dawud 547 the wolf takes the sheep that strays alone, and praying together is the flock."
  },
  // Abu Dawud 554.
  "What is the first row like, he ﷺ said?": {
    answer: "The row of the angels",
    harder: ["Abu Dawud 554, from Ubayy ibn Ka'b, after Fajr: he ﷺ said the first row is like what?", "The row of the kings", "The back of the masjid", "The row of the guards"]
  },
  "Which is purer than praying all alone?": {
    answer: "Praying with one other person",
    harder: ["Abu Dawud 554: what is purer than a man praying all alone?", "Praying very loudly", "Praying in a hurry", "Praying half asleep"]
  },
  "Allah is more pleased when more people pray together.": {
    answer: "True",
    harder: "Abu Dawud 554 says the more people there are in the prayer, the dearer it is to Allah."
  },
  // Abu Dawud 558.
  "Leaving home with wudu for an obligatory prayer is like what?": {
    answer: "Setting out for Hajj in ihram",
    harder: ["Abu Dawud 558, from Abu Umamah: going out with wudu for an obligatory prayer is like what?", "Riding a fast horse", "Buying a new house", "Planting a date palm"]
  },
  "Going out for the Duha prayer earns a reward like what?": {
    answer: "Umrah",
    harder: ["Abu Dawud 558: going out only for the Duha prayer earns the reward of what?", "Zakat", "A month of fasting", "Three times Hajj"]
  },
  "A prayer after a prayer, with no idle talk between, is written in Illiyyun.": {
    answer: "True",
    harder: "Abu Dawud 558 says a prayer followed by a prayer, with no idle talk between them, is recorded in Illiyyun."
  },
  // Bukhari 662.
  "What does Allah prepare for whoever goes to the masjid?": {
    answer: "An honored place in Paradise",
    harder: ["Bukhari 662, from Abu Hurairah: for whoever goes to the masjid morning and afternoon, Allah prepares what?", "A big house in town", "A fast new horse", "A bag of gold coins"]
  },
  "How often does Allah prepare it?": {
    answer: "Every time he goes",
    harder: ["Bukhari 662: how often is that honored place in Paradise prepared for him?", "Only once a year", "Only on Eid", "Only in Ramadan"]
  },
  "Going to the masjid only counts on Fridays.": {
    answer: "False",
    harder: "In Bukhari 662 the place in Paradise is prepared only for the Friday trips to the masjid."
  },
  // Abu Dawud 564.
  "What does Allah give the man who found the prayer already over?": {
    answer: "The reward of those who prayed",
    harder: ["Abu Dawud 564: he made wudu well, went out, and found the people had finished. What does Allah give him?", "Half a reward", "A sin for being late", "Nothing at all"]
  },
  "What must he do well before he goes, he ﷺ said?": {
    answer: "His wudu",
    harder: ["Abu Dawud 564: the one who still gets the reward must first do what well?", "His chores", "His meal", "His errands"]
  },
  "Those who prayed on time lose some reward to the latecomer.": {
    answer: "False",
    harder: "In Abu Dawud 564 the latecomer's reward is taken out of the reward of those who prayed on time."
  },
  // Abu Dawud 666.
  "How should people stand in the row, he ﷺ said?": {
    answer: "Shoulder to shoulder",
    harder: ["Abu Dawud 666, from Ibn Umar: how did he ﷺ say to stand, closing the gaps in the row?", "Far apart", "One behind another", "Facing each other"]
  },
  "What does Allah do for whoever joins up a row?": {
    answer: "Allah joins him up",
    harder: ["Abu Dawud 666: whoever joins up a row, what does Allah do for him?", "Allah makes him imam", "Allah gives him a horse", "Allah lets him leave early"]
  },
  "Gaps in the row leave openings for Shaytan.": {
    answer: "True",
    harder: "Abu Dawud 666 says not to leave openings in the row for Shaytan."
  },
  // Bukhari 547.
  "When did he ﷺ pray Zuhr, Abu Barzah said?": {
    answer: "When the sun passed midday",
    harder: ["Bukhari 547: describing the five prayer times, when did Abu Barzah say he ﷺ prayed Zuhr?", "Right at sunrise", "Just before sunset", "In the dark of night"]
  },
  "What did he ﷺ dislike doing before Isha?": {
    answer: "Sleeping",
    harder: ["Bukhari 547: he ﷺ liked to pray Isha later. What did he dislike doing before it?", "Making wudu", "Praying sunnah", "Saying the adhan"]
  },
  "He ﷺ recited many ayat in the Fajr prayer.": {
    answer: "True",
    harder: "Abu Barzah told in Bukhari 547 that he ﷺ recited many ayat in the Fajr prayer."
  },
  // Bukhari 539.
  "What did he ﷺ tell the mu'adhdhin before Zuhr?": {
    answer: "Let it become cooler",
    harder: ["Bukhari 539, from Abu Dharr: on a journey in great heat, what did he ﷺ tell the mu'adhdhin about Zuhr?", "Call it at once", "Call it twice", "Call it from the roof"]
  },
  "Where were they when he ﷺ said to wait for the cool?": {
    answer: "On a journey",
    harder: ["Bukhari 539: they waited till the hills cast shadows. Where were they?", "At home", "At the market", "In the masjid"]
  },
  "In very hot weather, Zuhr may wait until it is cooler.": {
    answer: "True",
    harder: "In Bukhari 539 he ﷺ had Zuhr delayed in great heat until the hills cast shadows."
  },
  // Bukhari 552.
  "Missing Asr is like losing what, he ﷺ said?": {
    answer: "Your family and wealth",
    harder: ["Bukhari 552, from Ibn Umar: whoever misses the Asr prayer is like one who has lost what?", "A day of work", "One night of sleep", "A small coin"]
  },
  "When is the Asr prayer?": {
    answer: "In the afternoon",
    harder: ["Bukhari 552 warns about missing Asr. When in the day does Asr come?", "At dawn", "At midnight", "At sunrise"]
  },
  "Missing Asr is a small loss.": {
    answer: "False",
    harder: "In Bukhari 552 missing Asr is only like losing a few coins."
  },
  // Bukhari 559.
  "After Maghrib, how far could they still see?": {
    answer: "As far as an arrow flies",
    harder: ["Bukhari 559, from Rafi' ibn Khadij: leaving Maghrib with him ﷺ, how far could one still see?", "Not at all", "Only by lamplight", "Only to their feet"]
  },
  "When did they pray Maghrib with him ﷺ?": {
    answer: "Soon after sunset",
    harder: ["Bukhari 559: they could still see where an arrow landed after it. When did they pray Maghrib?", "At noon", "Late at night", "Just before dawn"]
  },
  "They prayed Maghrib while there was still daylight.": {
    answer: "True",
    harder: "Rafi' said in Bukhari 559 that after Maghrib one of them could still see where his arrow fell."
  },
  // Bukhari 567.
  "Why was Isha late that night?": {
    answer: "He ﷺ was busy",
    harder: ["Bukhari 567, from Abu Musa: his boat companions took turns at Isha. Why was Isha late that night?", "The lamps went out", "The rain was heavy", "The imam was away"]
  },
  "What glad news did he ﷺ give after the prayer?": {
    answer: "None but them prayed at that hour",
    harder: ["Bukhari 567: after the late Isha, what glad news did he ﷺ give them?", "Rain would come soon", "They had won a battle", "A guest was coming"]
  },
  "Abu Musa and his companions went home happy.": {
    answer: "True",
    harder: "In Bukhari 567 Abu Musa's companions went home glad at what he ﷺ told them after Isha."
  },
  // Bukhari 578.
  "Why could no one recognize the women after Fajr?": {
    answer: "Because of the darkness",
    harder: ["Bukhari 578, from Aishah: the women came wrapped in their sheets. Why could no one recognize them going home?", "Their homes were far away", "They walked very fast", "They left before the prayer"]
  },
  "Where did the women go after the Fajr prayer?": {
    answer: "Back to their homes",
    harder: ["Bukhari 578: after praying Fajr with him ﷺ in the dark, where did the women go?", "To the market", "To the date farms", "To a feast"]
  },
  "Believing women attended the Fajr prayer with him ﷺ.": {
    answer: "True",
    harder: "Aishah told in Bukhari 578 that believing women prayed Fajr with him ﷺ, wrapped in their sheets."
  },
  // Abu Dawud 776.
  "When did he ﷺ say Subhanakallahumma wa bihamdik?": {
    answer: "When he began his prayer",
    harder: ["Abu Dawud 776, from Aishah: when did he ﷺ say Subhanakallahumma wa bihamdik, wa tabarakasmuk?", "When he saw the new moon", "When he heard thunder", "When he finished eating"]
  },
  "What does wa tabarakasmuk mean?": {
    answer: "Blessed is Your name",
    harder: ["In the opening words of Abu Dawud 776, what does wa tabarakasmuk mean?", "Great is Your house", "Near is Your help", "Wide is Your mercy"]
  },
  "He ﷺ began his prayer by praising Allah's name and majesty.": {
    answer: "True",
    harder: "In Abu Dawud 776 he ﷺ opened his salah with glory and praise to Allah and the words: blessed is Your name."
  },
  // Muslim 601.
  "What was opened for the man's words, he ﷺ said?": {
    answer: "The doors of heaven",
    harder: ["Muslim 601, from Ibn Umar: a man said Allahu akbar kabira in the prayer. What was opened for his words?", "The doors of the masjid", "The gates of the city", "The windows of the house"]
  },
  "How did the man's words of praise begin?": {
    answer: "Allahu akbar kabira",
    harder: ["Muslim 601: the words went on walhamdu lillahi kathira. How did they begin?", "La ilaha illallah", "Subhanallahi wa bihamdihi", "Astaghfirullah"]
  },
  "Ibn Umar kept saying these words from that day on.": {
    answer: "True",
    harder: "Ibn Umar said in Muslim 601 that he never left those words after hearing what he ﷺ said of them."
  },
  // Abu Dawud 873.
  "What did he ﷺ do at each ayah of mercy?": {
    answer: "He stopped and asked Allah",
    harder: ["Abu Dawud 873, from Awf ibn Malik: in a long night prayer, what did he ﷺ do at an ayah of mercy?", "He sat down", "He said salam", "He bowed right away"]
  },
  "What did he ﷺ say in that long ruku'?": {
    answer: "Subhana dhil-jabarut",
    harder: ["Abu Dawud 873: in that ruku', as long as his standing, which words did he ﷺ say?", "Hasbunallah", "Allahu akbar kabira", "Rabbana atina"]
  },
  "His ruku' that night was as long as his standing.": {
    answer: "True",
    harder: "Awf ibn Malik said in Abu Dawud 873 that his ﷺ ruku' that night was as long as his standing."
  },
  // Abu Dawud 872.
  "When did he ﷺ say Subbuhun Quddus?": {
    answer: "In ruku' and sujud",
    harder: ["Abu Dawud 872, from Aishah: when did he ﷺ say Subbuhun Quddusun Rabbul-mala'ikati war-ruh?", "When it rained", "Before the adhan", "After eating"]
  },
  "What does Quddus mean?": {
    answer: "Pure, far above every fault",
    harder: ["In Subbuhun Quddus (Abu Dawud 872), what does Quddus mean?", "Hearing all things", "Knowing all things", "Seeing all things"]
  },
  "Subbuhun Quddus praises Allah as Lord of the angels.": {
    answer: "True",
    harder: "In Abu Dawud 872 the words go on: Rabbul-mala'ikati war-ruh, Lord of the angels and the Spirit."
  },
  // Bukhari 796.
  "When the imam says Sami'Allahu liman hamidah, what do you say?": {
    answer: "Allahumma Rabbana lakal hamd",
    harder: ["Bukhari 796, from Abu Hurairah: what do you say when the imam says Sami'Allahu liman hamidah?", "Allahu akbar", "Amin", "Astaghfirullah"]
  },
  "What is forgiven for one whose words match the angels'?": {
    answer: "His past sins",
    harder: ["Bukhari 796: when your Rabbana lakal hamd matches the angels' words, what is forgiven?", "Only his debts", "Only one sin", "Nothing at all"]
  },
  "The angels also say Rabbana lakal hamd at that moment.": {
    answer: "True",
    harder: "Bukhari 796 speaks of one whose Rabbana lakal hamd falls together with the angels' saying it."
  },
  // Bukhari 799.
  "How many angels raced to write the man's words?": {
    answer: "Over thirty",
    harder: ["Bukhari 799, from Rifa'ah: a man said hamdan kathiran tayyiban mubarakan fih. How many angels raced to write it first?", "Exactly two", "Over a thousand", "Only one angel"]
  },
  "When did the man say hamdan kathiran tayyiban?": {
    answer: "On rising from ruku'",
    harder: ["Bukhari 799: the man said Rabbana wa lakal-hamd, hamdan kathiran... at which point of the prayer?", "Before the takbir", "In the last sitting", "After the salam"]
  },
  "He ﷺ asked after the prayer who had said those words.": {
    answer: "True",
    harder: "In Bukhari 799 he ﷺ asked after the prayer who the speaker was, then told of the angels."
  },
  // Abu Dawud 878.
  "When did he ﷺ ask: forgive me all my sins?": {
    answer: "In sujud",
    harder: ["Abu Dawud 878, from Abu Hurairah: when did he ﷺ say Allahummaghfir li dhanbi kullah?", "At iftar", "In the khutbah", "In the adhan"]
  },
  "Which sins did he ﷺ ask Allah to forgive?": {
    answer: "Every one of them",
    harder: ["Abu Dawud 878: small and great, first and last, open and secret. Which sins did he ﷺ ask forgiveness for?", "Only the great ones", "Only the new ones", "Only the hidden ones"]
  },
  "He ﷺ asked forgiveness for small sins as well as great ones.": {
    answer: "True",
    harder: "In the sujud du'a of Abu Dawud 878 he ﷺ asked forgiveness for small and great, open and secret sins."
  },
  // Bukhari 750.
  "Where did he ﷺ warn people not to look in prayer?": {
    answer: "Up at the sky",
    harder: ["Bukhari 750, from Anas: with stern words he ﷺ told people to stop looking where during prayer?", "Down at the floor", "Toward the qiblah", "Straight ahead"]
  },
  "How did his ﷺ words sound as he warned them?": {
    answer: "Stern",
    harder: ["Bukhari 750: how did his ﷺ words grow as he warned against raising the eyes in prayer?", "Like a whisper", "Like a song", "Joking"]
  },
  "He ﷺ said their eyesight could be taken away.": {
    answer: "True",
    harder: "In Bukhari 750 he ﷺ warned that those looking up in prayer should stop, or their sight would be snatched away."
  },
  // Bukhari 212.
  "What should a drowsy person do, he ﷺ said?": {
    answer: "Sleep until it passes",
    harder: ["Bukhari 212, from Aishah: one feels drowsy while praying. What did he ﷺ say to do?", "Pray much faster", "Keep praying anyway", "Pray twice as long"]
  },
  "Why is praying while drowsy a problem?": {
    answer: "He may not know what he asks",
    harder: ["Bukhari 212: why should the drowsy one stop praying and sleep?", "It makes the prayer short", "It wakes up the house", "It is too cold at night"]
  },
  "A drowsy person always knows what he is asking for.": {
    answer: "False",
    harder: "Bukhari 212 says a drowsy person in prayer knows clearly what he is asking for."
  },
  // Ibn Majah 871.
  "What did he ﷺ see the man doing wrong?": {
    answer: "Not settling his back",
    harder: ["Ibn Majah 871, from Ali ibn Shayban: what did he ﷺ see a man not doing in ruku' and sujud?", "Reciting too loudly", "Standing too far back", "Praying too slowly"]
  },
  "How did he ﷺ see the man during the prayer?": {
    answer: "From the corner of his eye",
    harder: ["Ibn Majah 871: while leading the prayer, how did he ﷺ notice the man?", "Someone told him", "By turning fully around", "In a dream"]
  },
  "A prayer with rushed ruku' and sujud is still fine.": {
    answer: "False",
    harder: "In Ibn Majah 871 he ﷺ said it does not matter if the back is not settled in ruku' and sujud."
  },
  // Bukhari 821.
  "What did people think when Anas stood so long after ruku'?": {
    answer: "That he had forgotten",
    harder: ["Bukhari 821, from Thabit: Anas stood so long after rising from ruku' that people said what?", "That he was tired", "That he was ill", "That he was lost"]
  },
  "Where else did Anas pause for a long time?": {
    answer: "Between the two sujud",
    harder: ["Bukhari 821: besides after ruku', where else did Anas sit so long people thought he forgot?", "At the masjid door", "Before the first takbir", "After the salam"]
  },
  "Anas prayed the way he had seen the Prophet ﷺ pray.": {
    answer: "True",
    harder: "In Bukhari 821 Anas said he would pray just as he saw the Prophet ﷺ lead them."
  },
  // Nasa'i 1214.
  "What did his ﷺ chest sound like as he prayed?": {
    answer: "Water boiling",
    harder: ["Nasa'i 1214, from Abdullah ibn ash-Shikhkhir: what was the sound from his ﷺ chest in prayer like?", "A beating drum", "Birds singing", "Wind in the trees"]
  },
  "Why did that sound come from his ﷺ chest?": {
    answer: "He was weeping",
    harder: ["Nasa'i 1214, passed on by Mutarrif: what caused the boiling sound in his ﷺ chest?", "He was out of breath", "He was reciting loudly", "He was coughing"]
  },
  "The Prophet ﷺ was moved to tears in his prayer.": {
    answer: "True",
    harder: "Nasa'i 1214 tells that he ﷺ wept in prayer until his chest sounded like a boiling pot."
  },
  // Bukhari 747.
  "What did they do when he ﷺ rose from ruku'?": {
    answer: "Stayed standing",
    harder: ["Bukhari 747, from Al-Bara: when he ﷺ said Sami'Allahu liman hamidah and rose, what did the people do?", "Sat down right away", "Left the row", "Went down first"]
  },
  "Until when did they stay standing?": {
    answer: "Until they saw him in sujud",
    harder: ["Bukhari 747: none of them bent down until when?", "Until the adhan", "Until the sun rose", "Until he spoke to them"]
  },
  "Al-Bara said they waited until he ﷺ went into sujud.": {
    answer: "True",
    harder: "In Bukhari 747 Al-Bara said they did not go down for sujud before him ﷺ."
  },
  // Nasa'i 1045.
  "What should we do in ruku', he ﷺ said?": {
    answer: "Glorify the Lord",
    harder: ["Nasa'i 1045, from Ibn Abbas: drawing back the curtain to see the rows, what did he ﷺ say to do in ruku'?", "Look up at the sky", "Recite a long surah", "Talk to the person beside us"]
  },
  "Why strive hard in du'a during sujud?": {
    answer: "More likely to be answered",
    harder: ["Nasa'i 1045: strive in du'a in sujud, he ﷺ said, because it is what?", "So people can hear us", "To keep the sujud short", "So the prayer ends sooner"]
  },
  "The Quran is not recited in ruku' or sujud.": {
    answer: "True",
    harder: "In Nasa'i 1045 he ﷺ said he was forbidden to recite the Quran in ruku' and sujud."
  },
  // Ibn Majah 878.
  "When did he ﷺ praise Allah to fill the heavens and earth?": {
    answer: "On rising from ruku'",
    harder: ["Ibn Majah 878, from Ibn Abi Awfa: when did he ﷺ say mil' as-samawat wa mil' al-ard?", "After the final salam", "Before the first takbir", "While leaving the masjid"]
  },
  "How much praise does the du'a give Allah?": {
    answer: "As much as fills the heavens and earth",
    harder: ["Ibn Majah 878: the praise is as much as You will after that, and before it, as much as what?", "Just a little", "As much as one hand holds", "As much as one day"]
  },
  "Sami' Allahu liman hamidah means: Allah hears whoever praises Him.": {
    answer: "True",
    harder: "In Ibn Majah 878 he ﷺ said Sami' Allahu liman hamidah on rising, meaning Allah hears the one who praises Him."
  },
  // Bukhari 1123.
  "How long was his ﷺ sujud in the night prayer?": {
    answer: "As long as fifty verses",
    harder: ["Bukhari 1123, from Aishah: in his night prayer, his ﷺ sujud lasted as long as reciting how much?", "A whole night", "Five short words", "One quick breath"]
  },
  "When did he ﷺ make such long sujud?": {
    answer: "In his prayer at night",
    harder: ["Bukhari 1123: in which prayer did his ﷺ sujud last the time of fifty verses?", "Only at Jumu'ah", "Only on Eid", "Only on journeys"]
  },
  "His ﷺ sujud at night was long and unhurried.": {
    answer: "True",
    harder: "Aishah said in Bukhari 1123 that one could recite fifty verses before he ﷺ raised his head from sujud."
  },
  // Tirmidhi 3493.
  "Where did Aishah find him ﷺ that night?": {
    answer: "In sujud, making du'a",
    harder: ["Tirmidhi 3493: Aishah missed him ﷺ in the night and searched. Where did she find him?", "Asleep in his bed", "Reciting on the roof", "Out in the market"]
  },
  "In Allah's pardon, he ﷺ sought refuge from what?": {
    answer: "His punishment",
    harder: ["Tirmidhi 3493: in Your pleasure from Your anger, and in Your pardon from what?", "His mercy", "His blessings", "His help"]
  },
  "In the du'a he ﷺ said: I cannot count Your praises.": {
    answer: "True",
    harder: "In the sujud du'a of Tirmidhi 3493 he ﷺ said he could not count Allah's praises as Allah praised Himself."
  },
  // Nasa'i 1138.
  "What did Rabi'ah ask for when told: ask of me?": {
    answer: "To be with him ﷺ in Paradise",
    harder: ["Nasa'i 1138: Rabi'ah ibn Ka'b brought him ﷺ water for wudu and was told 'ask of me'. What did he ask?", "A house in Madinah", "A fast horse", "A bag of gold"]
  },
  "How did he ﷺ tell Rabi'ah to help with his wish?": {
    answer: "By prostrating a great deal",
    harder: ["Nasa'i 1138: 'Help me against yourself,' he ﷺ told Rabi'ah. With what?", "By running every day", "By building a house", "By selling his camel"]
  },
  "Much sujud can bring a person near him ﷺ in Paradise.": {
    answer: "True",
    harder: "In Nasa'i 1138 the way he ﷺ gave Rabi'ah to be with him in Paradise was much sujud."
  },
  // Bukhari 806.
  "How will the angels know whom to take out of the Fire?": {
    answer: "By their marks of sujud",
    harder: ["Bukhari 806, from Abu Hurairah: the angels take out those who worshipped Allah alone. How do they know them?", "By their tall height", "By their fine clothes", "By their loud voices"]
  },
  "What has Allah forbidden the Fire to eat?": {
    answer: "The marks of sujud",
    harder: ["Bukhari 806: the Fire eats the son of Adam except for what?", "Only the hair", "Only the hands", "Nothing at all"]
  },
  "Those taken out had worshipped none but Allah.": {
    answer: "True",
    harder: "In Bukhari 806 the ones taken out of the Fire are those who worshipped Allah alone."
  },
  // Tirmidhi 214.
  "Besides Jumu'ah, what else wipes away sins between?": {
    answer: "The five daily prayers",
    harder: ["Tirmidhi 214, from Abu Hurairah: along with Jumu'ah to Jumu'ah, what wipes away the sins between them?", "A big meal", "A long sleep", "A walk in the market"]
  },
  "What must a person keep away from, for this?": {
    answer: "The major sins",
    harder: ["Tirmidhi 214: the five prayers and Jumu'ah wipe out what is between them, as long as one avoids what?", "Sweet food", "Long journeys", "Cold water"]
  },
  "Jumu'ah to Jumu'ah wipes out the sins between them.": {
    answer: "True",
    harder: "Tirmidhi 214 says one Jumu'ah to the next wipes away what is between them, while major sins are avoided."
  },
  // Abu Dawud 1067.
  "How many exceptions did he ﷺ name for Jumu'ah?": {
    answer: "Four",
    harder: ["Abu Dawud 1067, from Tariq ibn Shihab: Jumu'ah in congregation is a duty on every Muslim except how many?", "Ten", "Seven", "Twenty"]
  },
  "Which of these did he ﷺ name as excused?": {
    answer: "Someone who is sick",
    harder: ["Abu Dawud 1067 names a slave, a woman, a boy, and who else as excused from Jumu'ah?", "A shopkeeper", "A teacher", "A tailor"]
  },
  "Jumu'ah is a duty on every Muslim with no exceptions.": {
    answer: "False",
    harder: "Abu Dawud 1067 says Jumu'ah in congregation is a duty on every Muslim, and names no one excused."
  },
  // Tirmidhi 500.
  "What happens to one who leaves three Jumu'ahs?": {
    answer: "A seal on his heart",
    harder: ["Tirmidhi 500, from Abu al-Ja'd: whoever leaves three Jumu'ahs out of carelessness, what does Allah do?", "A stronger heart", "Nothing at all", "A lighter heart"]
  },
  "How many Jumu'ahs did he ﷺ name in this warning?": {
    answer: "Three",
    harder: ["Tirmidhi 500: leaving how many Jumu'ahs carelessly brings a seal on the heart?", "One", "Forty", "Ten"]
  },
  "Missing Jumu'ah with no excuse is a small matter.": {
    answer: "False",
    harder: "In Tirmidhi 500 leaving three Jumu'ahs out of carelessness brings no warning at all."
  },
  // Abu Dawud 1078.
  "What did he ﷺ say to keep for Friday, if you can?": {
    answer: "A special set of clothes",
    harder: ["Abu Dawud 1078, from Abdullah ibn Salam, on the minbar: what is it good to keep for Friday, if you can?", "A big lunch", "A bag of coins", "A new prayer mat"]
  },
  "Which clothes are the Friday ones kept apart from?": {
    answer: "The clothes you work in",
    harder: ["Abu Dawud 1078: the Friday set is besides which clothes?", "Winter coats", "Travel clothes", "Sleeping clothes"]
  },
  "Wearing your best for Jumu'ah is a good thing.": {
    answer: "True",
    harder: "In Abu Dawud 1078 he ﷺ said it is good, for whoever can, to keep a set of clothes for Friday."
  },
  // Abu Dawud 1118.
  "What did the man do while he ﷺ gave the khutbah?": {
    answer: "Stepped over people",
    harder: ["Abu Dawud 1118, from Abdullah ibn Busr: on a Friday during the khutbah, what did a man come in doing?", "Slept by the door", "Sold some dates", "Swept the floor"]
  },
  "What did he ﷺ tell the man to do?": {
    answer: "Sit down",
    harder: ["Abu Dawud 1118: seeing him step over people, what did he ﷺ tell the man?", "Climb the minbar", "Call the iqamah", "Fetch some water"]
  },
  "Stepping over people at Jumu'ah bothers them.": {
    answer: "True",
    harder: "In Abu Dawud 1118 he ﷺ told the man stepping over people: sit down, you have caused harm."
  },
  // Tirmidhi 526.
  "What should you do if sleepy while sitting at Jumu'ah?": {
    answer: "Move to another seat",
    harder: ["Tirmidhi 526, from Ibn Umar: if one of you feels drowsy at Jumu'ah, what did he ﷺ say to do?", "Lie down to sleep", "Go home early", "Talk to stay awake"]
  },
  "When did he ﷺ say to change your seat?": {
    answer: "When you feel sleepy",
    harder: ["Tirmidhi 526: while sitting for Jumu'ah, moving to another place is for when?", "When it is cold", "When you are hungry", "When the sun is out"]
  },
  "Moving seats when sleepy at Jumu'ah follows his ﷺ advice.": {
    answer: "True",
    harder: "In Tirmidhi 526 he ﷺ told the drowsy one at Jumu'ah to move from his place to another."
  },
  // Bukhari 1126.
  "Whom did he ﷺ want woken that night?": {
    answer: "The sleeping women of the rooms",
    harder: ["Bukhari 1126, from Umm Salamah: waking with 'Subhan Allah', whom did he ﷺ want woken to pray?", "The guards at the gate", "The travelers outside", "The traders in the market"]
  },
  "What came down that night, he ﷺ said?": {
    answer: "Trials and treasures",
    harder: ["Bukhari 1126: 'Subhan Allah! What has come down tonight?' What did he ﷺ say had come down?", "Food and drink", "Snow and wind", "Stars and stones"]
  },
  "He ﷺ had the sleepers of his home woken to pray.": {
    answer: "True",
    harder: "In Bukhari 1126 he ﷺ asked who would wake the women of the rooms to pray that night."
  },
};
