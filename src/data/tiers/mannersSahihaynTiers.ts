import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into manners" lessons (mannersSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const MANNERS_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih Muslim 2555.
  "Where does the tie of family hang, he ﷺ said?": {
    answer: "From the Throne",
    harder: ["Muslim 2555: where is the tie of kinship suspended?", "From a tree", "From the sky", "From the Kabah door"],
    expert: ["Aishah reported that ar-rahim hangs and speaks. From where?", "From the gate of Paradise", "From the Sidrah tree", "From the minbar"],
    superHard: ["Mu'allaqatun bil-Arsh: what does the tie of family hang from?", "From the clouds", "From the moon", "From the Pen"],
    extreme: ["In Muslim 2555, the tie of kinship speaks while hanging where?", "Over the Bridge", "At the Pool", "On the Scale"]
  },
  "What happens to one who keeps family ties?": {
    answer: "Allah keeps him joined",
    harder: ["Muslim 2555: what does the tie of kinship say about one who unites it?", "He grows rich at once", "He never gets ill", "Nothing at all"],
    expert: ["Man wasalani: what follows for him, by this hadith?", "People praise him", "He lives in Makkah", "He is made a leader"],
    superHard: ["Aishah: the one who keeps the tie joined gets what from Allah?", "A big house", "Many sons", "A long beard"],
    extreme: ["In Muslim 2555, the reward of keeping ties is the same kind as the deed. What?", "Allah gives him gold", "Allah makes him famous", "Allah gives him land"]
  },
  "Allah cuts off the one who cuts off his family.": {
    answer: "True",
    harder: "Muslim 2555: whoever severs the tie of kinship, Allah severs him.",
    expert: "Aishah reported that the tie of family says: whoever cuts me, Allah cuts him off.",
    superHard: "Man qata'ani qata'ahullah: so the tie of kinship speaks, he ﷺ said.",
    extreme: "In Muslim 2555, cutting off family is met with Allah cutting the one who did it."
  },
  // Sahih al-Bukhari 6028.
  "When a man in need came, what did he ﷺ tell those present?": {
    answer: "Speak up for him",
    harder: ["Bukhari 6028: when one in need came, what did he ﷺ tell his Companions?", "Send him away", "Wait until night", "Give him advice only"],
    expert: ["Ishfa'u: what were the Companions told to do for the one in need?", "Pay him at once", "Ask his tribe", "Write his name"],
    superHard: ["Abu Musa: a beggar came. He ﷺ said help and recommend him. In short?", "Test him first", "Ignore him", "Ask him to work"],
    extreme: ["In Bukhari 6028, what did the Companions do before the need was met?", "Collected tax", "Held a vote", "Asked a judge"]
  },
  "What do those who speak up for him get?": {
    answer: "A reward",
    harder: ["Bukhari 6028: what will those who recommend the needy man receive?", "A share of his money", "A new title", "Nothing"],
    expert: ["Tu'jaru: what do you get for speaking up for others?", "A gift from him", "A seat in front", "Fame"],
    superHard: ["Abu Musa: even if the need is not met, those who spoke up get what?", "Blame", "A debt", "Thanks only"],
    extreme: ["In Bukhari 6028, the speaker's gain does not wait on the result. What is it?", "A camel", "A place to sleep", "A letter"]
  },
  "The final say on his need is with Allah.": {
    answer: "True",
    harder: "Bukhari 6028: Allah decides what He wills by the tongue of His Prophet ﷺ.",
    expert: "Abu Musa reported that the Companions speak up, and Allah decides the outcome.",
    superHard: "Speaking up earns reward, while what happens is as Allah wills, he ﷺ said.",
    extreme: "In Bukhari 6028, the reward is for the one who speaks up, and the decision is Allah's."
  },
  // Sahih al-Bukhari 6072.
  "Who could take his ﷺ hand and lead him?": {
    answer: "Any servant girl of Madinah",
    harder: ["Bukhari 6072: who could take hold of his ﷺ hand and lead him anywhere?", "Only his family", "Only the leaders", "Only the scholars"],
    expert: ["Anas named the humblest of people as able to lead him ﷺ. Who?", "Only the elders", "Only the rich", "Only his guards"],
    superHard: ["Al-amah min ima'i al-Madinah: who is she, in this hadith?", "A queen", "A trader", "A guest from Yemen"],
    extreme: ["In Bukhari 6072, whose hand-hold did he ﷺ never refuse?", "Only Bilal's", "Only a chief's", "Only a scholar's"]
  },
  "Where would he ﷺ go with her?": {
    answer: "Wherever she wished",
    harder: ["Bukhari 6072: where could the servant girl take him ﷺ?", "Only to the masjid", "Only to the market", "Nowhere"],
    expert: ["Anas: she took his hand and he ﷺ went where?", "Only to her master", "Only inside Madinah's walls", "Only in daylight"],
    superHard: ["Haythu sha'at: where did she lead him ﷺ?", "Only to the well", "Only to the gate", "Only home"],
    extreme: ["In Bukhari 6072, his ﷺ path was set by whom?", "By his Companions", "By the time of day", "By the weather"]
  },
  "That shows his ﷺ humility.": {
    answer: "True",
    harder: "Bukhari 6072: even a servant girl of Madinah could lead him ﷺ by the hand.",
    expert: "Anas reported that he ﷺ went wherever a servant girl led him.",
    superHard: "The humblest girl of Madinah could take his ﷺ hand and he would go with her.",
    extreme: "In Bukhari 6072, his ﷺ humility is shown by a servant girl leading him."
  },
  // Sahih Muslim 2612a.
  "In a fight, what must not be struck, he ﷺ said?": {
    answer: "The face",
    harder: ["Muslim 2612a: when fighting his brother, what should one avoid striking?", "The hand", "The back", "The foot"],
    expert: ["Abu Hurairah: even in a quarrel, which part is to be spared?", "The shoulder", "The knee", "The arm"],
    superHard: ["Al-wajh: what must be spared in a fight?", "The chest", "The leg", "The neck"],
    extreme: ["In Muslim 2612a, the one part named to spare in a fight is what?", "The ear", "The hair", "The fingers"]
  },
  "Whom did he ﷺ call the other person in the fight?": {
    answer: "His brother",
    harder: ["Muslim 2612a: when one of you fights with whom, he should avoid the face?", "His enemy", "A stranger", "His servant"],
    expert: ["Akhahu: what is the one he fights called, in this hadith?", "His rival", "His guest", "His neighbour only"],
    superHard: ["Abu Hurairah: even an opponent is called what by him ﷺ here?", "A wrongdoer", "A fool", "A foe"],
    extreme: ["In Muslim 2612a, the word for the other man in the fight is what?", "His cousin", "His partner", "His master"]
  },
  "The face may be struck if one is angry.": {
    answer: "False",
    harder: "Muslim 2612a: in anger, a man may strike his brother's face.",
    expert: "Abu Hurairah reported that sparing the face is only for friends.",
    superHard: "He ﷺ allowed striking the face when a fight was fair.",
    extreme: "In Muslim 2612a, the face is spared only when the fight is small."
  },
  // Sahih al-Bukhari 6132.
  "For whom did he ﷺ put a cloak aside?": {
    answer: "Makhramah",
    harder: ["Bukhari 6132: for whom did he ﷺ put aside one of the cloaks?", "Bilal", "Anas", "Abu Hurairah"],
    expert: ["Ibn Abi Mulaykah: cloaks came as a gift and one was kept for whom?", "Uthman", "Zayd", "Salman"],
    superHard: ["Who came later and was told: I kept this for you?", "Abu Dharr", "Mu'adh", "Ammar"],
    extreme: ["In Bukhari 6132, the father of al-Miswar was given a saved cloak. Who?", "Abu Sufyan", "Al-Abbas", "Suhayl"]
  },
  "What did he ﷺ say when Makhramah came?": {
    answer: "I kept this for you",
    harder: ["Bukhari 6132: what did he ﷺ say to Makhramah when he arrived?", "You came too late", "Share it with others", "Sell it"],
    expert: ["Khaba'tu hadha lak: what did he ﷺ tell Makhramah?", "Take two", "Come tomorrow", "Ask Bilal"],
    superHard: ["Ibn Abi Mulaykah: when Makhramah arrived, he ﷺ showed him the cloak and said what?", "This is for the poor", "This is mine", "This is for Ali"],
    extreme: ["In Bukhari 6132, the words that made Makhramah glad were what?", "Wear it on Eid", "Give it back", "Keep it hidden"]
  },
  "He ﷺ shared the other cloaks among his Companions.": {
    answer: "True",
    harder: "Bukhari 6132: he ﷺ distributed the cloaks among some of his Companions.",
    expert: "Ibn Abi Mulaykah reported that the gift of cloaks was shared out, with one kept back.",
    superHard: "He ﷺ gave the cloaks to his Companions and saved one for Makhramah.",
    extreme: "In Bukhari 6132, the gift was not kept by him ﷺ but given out to others."
  },
  // Sahih al-Bukhari 6146.
  "What hurt his ﷺ toe?": {
    answer: "A stone",
    harder: ["Bukhari 6146: what hit his ﷺ foot so that his toe bled?", "A thorn", "An arrow", "A door"],
    expert: ["Jundub: walking, he ﷺ stumbled. What caused it?", "A root", "A sword", "A step"],
    superHard: ["Hajar: what struck him ﷺ, in Jundub's hadith?", "A stick", "A branch", "A spear"],
    extreme: ["In Bukhari 6146, the toe bled because of what?", "A sharp shell", "A nail", "A falling pot"]
  },
  "What did he ﷺ say then?": {
    answer: "A line of poetry",
    harder: ["Bukhari 6146: after his toe bled, what did he ﷺ say?", "A long sermon", "A complaint", "Nothing at all"],
    expert: ["Jundub: he ﷺ said: you are only a toe that has bled. What was that?", "A du'a only", "An ayah", "A proverb of Yemen"],
    superHard: ["Bayt min ash-shi'r: what did he ﷺ quote?", "A khutbah", "A letter", "A riddle"],
    extreme: ["In Bukhari 6146, his ﷺ words to the toe came in what form?", "A song", "A story", "A list"]
  },
  "He ﷺ said the hurt was in the path of Allah.": {
    answer: "True",
    harder: "Bukhari 6146: you are only a toe that bled in Allah's Cause, he ﷺ said.",
    expert: "Jundub reported that he ﷺ said what his toe met was in the path of Allah.",
    superHard: "Fi sabilillahi ma laqiti: so he ﷺ spoke to his hurt toe.",
    extreme: "In Bukhari 6146, the bleeding toe was counted in Allah's path."
  },
  // Sahih Muslim 2613d.
  "Who spoke up for the men being held?": {
    answer: "Hisham ibn Hakim",
    harder: ["Muslim 2613d: who saw Nabataeans held in Hims and spoke up?", "Abu Hurairah", "Ibn Umar", "Anas ibn Malik"],
    expert: ["Urwah reported that a Companion asked: what is this? Who?", "Abu Ubaydah", "Mu'adh", "Bilal"],
    superHard: ["The son of Hakim ibn Hizam spoke up in Hims. Who?", "Khalid", "Amr", "Sa'id"],
    extreme: ["In Muslim 2613d, the one who told the governor the hadith was who?", "Abu ad-Darda", "Ubadah ibn as-Samit", "Shurahbil"]
  },
  "Whom will Allah punish, by this hadith?": {
    answer: "Those who torment people",
    harder: ["Muslim 2613d: whom will Allah torment, he ﷺ said?", "Those who travel", "Those who trade", "Those who are poor"],
    expert: ["Hisham said: I heard him ﷺ say Allah will punish whom?", "Those who sleep late", "Those who farm", "Those who sing"],
    superHard: ["Alladhina yu'adhdhibuna an-nas: whom does it describe?", "Those who help people", "Those who teach people", "Those who feed people"],
    extreme: ["In Muslim 2613d, who in this world will be tormented by Allah?", "Those who move cities", "Those who build houses", "Those who keep animals"]
  },
  "Hisham kept quiet when he saw them.": {
    answer: "False",
    harder: "Muslim 2613d: Hisham saw them held in the sun and said nothing.",
    expert: "Urwah reported that Hisham walked past the Nabataeans without a word.",
    superHard: "Hisham ibn Hakim did not ask the governor about the men.",
    extreme: "In Muslim 2613d, the hadith was never told to the governor of Hims."
  }
};
