import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into marriage" lessons (marriageSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const MARRIAGE_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 5182.
  "Who served the food at Abu Usaid's wedding?": {
    answer: "His wife, the bride",
    harder: ["Bukhari 5182: who brought the food to the guests at Abu Usaid's wedding?", "His servants", "His mother", "The guests themselves"],
    expert: ["Sahl said none made the food and brought it but one person. Who?", "His sister", "A cook from Makkah", "His neighbour"],
    superHard: ["Illa imra'atuhu: who alone made and served the food that day?", "Abu Usaid's father", "A hired servant", "Sahl himself"],
    extreme: ["In Bukhari 5182, the one who served at the wedding was also who?", "His slave girl", "His aunt", "His daughter"]
  },
  "What drink did the bride make for him ﷺ?": {
    answer: "Dates soaked in water",
    harder: ["Bukhari 5182: what did the bride give him ﷺ after the meal?", "Fresh milk", "Honey water", "Zamzam water"],
    expert: ["Sahl: she left something in a stone pot overnight. What was it?", "Barley soup", "Goat milk", "Rose water"],
    superHard: ["Ballat tamarat: what did she soak in the stone pot?", "Grapes in milk", "Bread in broth", "Figs in honey"],
    extreme: ["In Bukhari 5182, what was in the stone pot she prepared overnight?", "Olive oil", "Melted butter", "Cold water only"]
  },
  "Abu Usaid invited him ﷺ and his Companions to the wedding.": {
    answer: "True",
    harder: "Bukhari 5182: Abu Usaid as-Sa'idi invited him ﷺ and his Companions when he married.",
    expert: "Sahl ibn Sa'd reported that Abu Usaid invited him ﷺ to his wedding.",
    superHard: "At Abu Usaid's wedding meal, he ﷺ and his Companions were the guests.",
    extreme: "In Bukhari 5182, the wedding guests included him ﷺ and his Companions."
  },
  // Sahih Muslim 1426.
  "How much mahr did he ﷺ give his wives, Aishah said?": {
    answer: "Five hundred dirhams",
    harder: ["Muslim 1426: what was the mahr he ﷺ gave his wives?", "Fifty dirhams", "A thousand dinars", "No mahr at all"],
    expert: ["Twelve uqiyah and a nash come to how much, Aishah said?", "Two hundred dirhams", "Ten dinars", "Four thousand dirhams"],
    superHard: ["Abu Salamah asked Aishah about his ﷺ mahr. In dirhams?", "Forty dirhams", "One hundred dirhams", "Nine hundred dirhams"],
    extreme: ["In Muslim 1426, twelve and a half uqiyah equal what?", "Three hundred dirhams", "A thousand dirhams", "Seven hundred dirhams"]
  },
  "What is a nash, Aishah explained?": {
    answer: "Half an uqiyah",
    harder: ["Muslim 1426: Aishah asked Abu Salamah if he knew what a nash was. What is it?", "Two uqiyah", "A gold coin", "A young camel"],
    expert: ["Twelve uqiyah and a nash: the nash is how much?", "A quarter uqiyah", "One full uqiyah", "Ten uqiyah"],
    superHard: ["An-nash, by Aishah: what part of an uqiyah is it?", "A third of an uqiyah", "Double an uqiyah", "A tenth of an uqiyah"],
    extreme: ["In Muslim 1426, the nash added to twelve uqiyah is what?", "A silver ring", "A dinar", "A bag of dates"]
  },
  "Abu Salamah asked Aishah about his ﷺ mahr.": {
    answer: "True",
    harder: "Muslim 1426: Abu Salamah ibn Abdur-Rahman asked Aishah about the mahr of the Messenger ﷺ.",
    expert: "Abu Salamah reported that he asked Aishah how much mahr was given.",
    superHard: "The question on his ﷺ mahr came from Abu Salamah to Aishah.",
    extreme: "In Muslim 1426, Aishah answered Abu Salamah about his ﷺ mahr."
  },
  // Sahih al-Bukhari 5225.
  "What did he ﷺ do when the dish broke?": {
    answer: "Gathered the pieces and the food",
    harder: ["Bukhari 5225: after the dish fell and broke, what did he ﷺ do?", "Scolded everyone", "Left the house", "Threw the food away"],
    expert: ["Anas: the servant's hand was struck and the dish broke. Then he ﷺ?", "Sent the servant away", "Called the other wife", "Sat in silence"],
    superHard: ["Jama'a filaq as-sahfah: what did he ﷺ gather?", "Only the food", "Only the coins", "Only the bread"],
    extreme: ["In Bukhari 5225, his ﷺ first act after the dish broke was what?", "Asking who did it", "Going to the masjid", "Making a new rule"]
  },
  "What did he ﷺ give back for the broken dish?": {
    answer: "A whole dish",
    harder: ["Bukhari 5225: what did he ﷺ send to the wife whose dish broke?", "Some money", "Nothing at all", "Two goats"],
    expert: ["Anas: the broken dish stayed in one house. What went to the other?", "A broken dish", "A new dress", "A bag of flour"],
    superHard: ["As-sahfah as-sahihah: what did the wife whose dish broke receive?", "A cooking pot", "A jug of water", "A silver plate"],
    extreme: ["In Bukhari 5225, the dish that broke was replaced with what?", "A promise to pay", "A gift of dates", "A mat"]
  },
  "He ﷺ said: your mother felt jealous.": {
    answer: "True",
    harder: "Bukhari 5225: when the dish broke, he ﷺ said: your mother felt jealous.",
    expert: "Anas reported that he ﷺ explained the broken dish gently: your mother felt jealous.",
    superHard: "Gharat ummukum: so he ﷺ spoke of his wife when the dish broke.",
    extreme: "In Bukhari 5225, he ﷺ called the wife of that house your mother."
  },
  // Sahih al-Bukhari 5151.
  "Which conditions are most worthy to be kept, he ﷺ said?": {
    answer: "Those of the marriage contract",
    harder: ["Bukhari 5151: which stipulations are most entitled to be kept?", "Those of a sale", "Those of a game", "Those of a journey"],
    expert: ["Uqbah ibn Amir: which conditions come first in being kept?", "Those of a loan", "Those of a race", "Those of a rent"],
    superHard: ["Ahaqqu ash-shurut: which conditions did he ﷺ mean?", "Those of a treaty", "Those of a gift", "Those of a will"],
    extreme: ["In Bukhari 5151, the conditions by which marriage became lawful are what?", "The least to be kept", "Kept only by men", "Kept only by women"]
  },
  "What should a couple do with conditions agreed at marriage?": {
    answer: "Keep them",
    harder: ["Bukhari 5151: what does he ﷺ want done with marriage conditions?", "Forget them", "Change them alone", "Keep them for a year"],
    expert: ["Uqbah: the marriage conditions are most entitled to what?", "To be dropped", "To be hidden", "To be sold"],
    superHard: ["An tufu bihi: what should be done with the conditions?", "Ignore them", "Break them", "Laugh at them"],
    extreme: ["In Bukhari 5151, the right way with marriage conditions is what?", "Keep them until a fight", "Keep only the easy ones", "Let the judge forget them"]
  },
  "Marriage conditions matter less than other promises.": {
    answer: "False",
    harder: "Bukhari 5151: a marriage condition is the least important promise.",
    expert: "Uqbah ibn Amir reported that conditions of a sale come before those of marriage.",
    superHard: "Ahaqqu ash-shurut means the conditions that matter the least.",
    extreme: "In Bukhari 5151, marriage conditions are placed below every other promise."
  },
  // Sahih al-Bukhari 5109.
  "Who may not be married to the same man as a woman, he ﷺ said?": {
    answer: "Her aunt",
    harder: ["Bukhari 5109: a woman and whom may not be married to the same man?", "Her friend", "Her neighbour", "Her teacher"],
    expert: ["Abu Hurairah: which relative may not share a husband with her?", "Her classmate", "Her servant", "Her guest"],
    superHard: ["Al-ammah wal-khalah: who are they to the woman?", "Her nieces", "Her daughters", "Her grandmothers' friends"],
    extreme: ["In Bukhari 5109, who is named with the woman, not to be wed to one man?", "Her best friend", "Her cousin's friend", "Her nurse"]
  },
  "Which aunts does this rule cover?": {
    answer: "Her father's and her mother's sister",
    harder: ["Bukhari 5109: which aunts did he ﷺ name in this rule?", "Only her father's sister", "Only her mother's sister", "Only an older aunt"],
    expert: ["Abu Hurairah: the ammah and the khalah. Who are they?", "Only her mother's sister", "Only her brother's wife", "Only a married aunt"],
    superHard: ["Paternal and maternal aunt: which of these does the hadith name?", "Only the paternal aunt", "Only the maternal aunt", "Only a younger aunt"],
    extreme: ["In Bukhari 5109, the rule is said for which aunts?", "Only aunts who live nearby", "Only aunts who are widows", "Only aunts by marriage"]
  },
  "A man may marry a woman and her mother's sister together.": {
    answer: "False",
    harder: "Bukhari 5109: a woman and her maternal aunt may be married to the same man.",
    expert: "Abu Hurairah reported that only the father's sister is in this rule.",
    superHard: "Al-khalah is left out of this hadith, so it is allowed.",
    extreme: "In Bukhari 5109, the maternal aunt is allowed while the paternal aunt is not."
  },
  // Sahih al-Bukhari 5205.
  "What happened to the bride's hair?": {
    answer: "It began to fall out",
    harder: ["Bukhari 5205: what happened to the Ansari bride's hair?", "It turned white", "It grew very long", "It was cut short"],
    expert: ["Aishah: her husband suggested false hair because of what?", "Her hair turned red", "Her hair was curly", "Her hair was too thick"],
    superHard: ["Tama''ata sha'ruha: what does that say about her hair?", "It shone", "It was braided", "It was dyed"],
    extreme: ["In Bukhari 5205, the reason they asked about false hair was what?", "A wedding custom", "A gift from Yemen", "A dream she saw"]
  },
  "What did he ﷺ say about adding false hair?": {
    answer: "No, do not do it",
    harder: ["Bukhari 5205: did he ﷺ allow the bride to wear false hair?", "Yes, if the husband asks", "Only for the wedding", "Only at night"],
    expert: ["Aishah: the Ansari women asked about false hair. His ﷺ answer?", "Yes, a little", "Only black hair", "Ask her father"],
    superHard: ["La: so he ﷺ answered about joining hair. What did it mean?", "Yes, do it", "Wait one year", "Only if poor"],
    extreme: ["In Bukhari 5205, his ﷺ ruling on joining false hair was what?", "Allowed at home", "Allowed for brides", "Allowed if hidden"]
  },
  "Her husband's wish made the false hair allowed.": {
    answer: "False",
    harder: "Bukhari 5205: since her husband suggested it, he ﷺ allowed the false hair.",
    expert: "Aishah reported that the husband's request made joining hair fine.",
    superHard: "Because the bride was ill, he ﷺ allowed her to join false hair.",
    extreme: "In Bukhari 5205, a husband's wish lifts the ban on false hair."
  },
  // Sahih al-Bukhari 5232.
  "What did he ﷺ warn men about?": {
    answer: "Going in to women alone",
    harder: ["Bukhari 5232: beware of what, he ﷺ said?", "Eating with guests", "Travelling by night", "Visiting the sick"],
    expert: ["Uqbah ibn Amir: what were men told to beware of?", "Buying from women", "Greeting the old", "Sitting in the masjid"],
    superHard: ["Iyyakum wad-dukhul: going in where?", "Going in to the market", "Going in to the masjid late", "Going in to a garden"],
    extreme: ["In Bukhari 5232, the warning before the question on al-hamu was about what?", "Walking alone at night", "Speaking loudly", "Eating standing up"]
  },
  "What did he ﷺ call al-hamu, the husband's male relative?": {
    answer: "Death",
    harder: ["Bukhari 5232: the husband's brother or nephew is what, he ﷺ said?", "Family", "A guard", "A safe brother"],
    expert: ["Uqbah: an Ansari asked about the in-law. What was the answer?", "Allowed", "A blessing", "A helper"],
    superHard: ["Al-hamu al-mawt: what is al-hamu called here?", "A friend", "A shelter", "A mahram"],
    extreme: ["In Bukhari 5232, the in-law of the wife is given what name?", "A key", "A gift", "A wall"]
  },
  "A man of the Ansar asked about the in-laws.": {
    answer: "True",
    harder: "Bukhari 5232: a man of the Ansar asked: what about al-hamu?",
    expert: "Uqbah ibn Amir reported that an Ansari asked about the husband's relatives.",
    superHard: "Afara'ayta al-hamu: so an Ansari man asked after the warning.",
    extreme: "In Bukhari 5232, the question on the in-law came from a man of the Ansar."
  }
};
