import type { TierEntry } from "../questionTiers";

/**
 * Five levels for the "Deeper into zakat" lessons (zakatSahihaynUnits.ts): the lesson's own question is Easy, then
 * Medium (harder), Hard (expert), Super hard (superHard) and Extremely hard (extreme). Every version keeps the
 * question's answer and its hadith; a true/false version keeps the same truth.
 */
export const ZAKAT_SAHIHAYN_TIERS: Record<string, TierEntry> = {
  // Sahih al-Bukhari 1476.
  "Who is the truly poor person, he ﷺ said?": {
    answer: "One who has nothing and is shy to ask",
    harder: ["Bukhari 1476: who is the poor person in truth?", "One who asks for a morsel", "One who has no house", "One who travels a lot"],
    expert: ["Not the one asking a morsel or two, but who?", "One who asks every day", "One who has one camel", "One who lost his job"],
    superHard: ["Abu Hurairah reported who the real miskin is. Who?", "One who begs at the masjid door", "One who owes a debt", "One far from home"],
    extreme: ["Bukhari 1476 turns the usual picture around. Who is the poor one?", "One who asks a date or two", "One with a small farm", "One with many children"]
  },
  "What does the one who is not truly poor ask for?": {
    answer: "A morsel or two",
    harder: ["Bukhari 1476: the one who is not truly poor asks others for what?", "A house", "A camel", "A gold coin"],
    expert: ["Luqmah aw luqmatan: what does such a beggar ask for?", "A coat", "A sheep", "A loan"],
    superHard: ["Abu Hurairah: the poor is not one who asks for what?", "A field", "A horse", "A sword"],
    extreme: ["In Bukhari 1476, the one who asks for this is not the truly poor. This?", "A ring of silver", "A bag of wheat", "A water skin"]
  },
  "The truly poor person is ashamed to beg.": {
    answer: "True",
    harder: "Bukhari 1476: the truly poor person has nothing and is ashamed to beg.",
    expert: "Abu Hurairah reported that the real poor one is too shy to ask people.",
    superHard: "The one who asks a morsel or two is not the truly poor, he ﷺ said.",
    extreme: "In Bukhari 1476, the poor one in truth has nothing yet does not beg from people."
  },
  // Sahih al-Bukhari 1470.
  "What is better than asking people, he ﷺ said?": {
    answer: "Cutting wood and selling it",
    harder: ["Bukhari 1470: what is better than asking a person for something?", "Waiting at the masjid", "Borrowing from a friend", "Sleeping until noon"],
    expert: ["He ﷺ swore by the One who holds his soul. Better than asking is what?", "Asking a rich man only", "Selling his clothes", "Moving to another town"],
    superHard: ["Abu Hurairah: carrying something on his back and selling it is better. What?", "Water from the well", "Dates from a friend", "Stones from the hill"],
    extreme: ["Bukhari 1470: the man who may give or refuse is set against what work?", "Herding another's sheep", "Guarding a gate", "Carrying letters"]
  },
  "What should he take to cut the wood?": {
    answer: "A rope",
    harder: ["Bukhari 1470: what should one take to go and cut the wood?", "A camel", "A sword", "A bucket"],
    expert: ["Habl: what is it, in the hadith about cutting wood?", "A basket", "An axe handle", "A sack"],
    superHard: ["Abu Hurairah: what does he take, then cut the wood and carry it on his back?", "A donkey", "A cart", "A friend"],
    extreme: ["In Bukhari 1470, the wood is cut and carried with what?", "A leather strap", "A wooden yoke", "A chain"]
  },
  "He ﷺ said the person asked may give or may not.": {
    answer: "True",
    harder: "Bukhari 1470: the person one asks may give him or may refuse.",
    expert: "Asking a person is worse because he may give or not, he ﷺ said.",
    superHard: "Abu Hurairah reported that the one asked might give or might turn him away.",
    extreme: "In Bukhari 1470, carrying wood beats asking someone who may not give at all."
  },
  // Sahih al-Bukhari 1445.
  "If one has nothing to give, what should he do first?": {
    answer: "Work with his hands",
    harder: ["Bukhari 1445: if someone has nothing to give, what will he do?", "Ask others", "Do nothing", "Sell his house"],
    expert: ["Every Muslim has to give charity. One with nothing should first do what?", "Wait for zakat", "Pray two rak'ahs", "Borrow money"],
    superHard: ["Abu Musa: he benefits himself and gives from what he earns. How?", "By asking a ruler", "By selling his books", "By fasting"],
    extreme: ["Bukhari 1445: the first answer to: what if he has nothing?", "Help the needy", "Keep away from evil", "Say a kind word"]
  },
  "If he cannot work, what then?": {
    answer: "Help the needy who ask for help",
    harder: ["Bukhari 1445: if he cannot work with his hands, what should he do?", "Fast three days", "Pray all night", "Travel for Hajj"],
    expert: ["The second answer, if he cannot find even that, was what?", "Give up", "Ask for zakat", "Free a slave"],
    superHard: ["Abu Musa: the step between working and keeping from evil was what?", "Reading Quran", "Visiting the sick", "Feeding animals"],
    extreme: ["Al-malhuf: what did he ﷺ say to do for him?", "Pay his debt", "Find him a wife", "Teach him to read"]
  },
  "Keeping away from evil counts as charity.": {
    answer: "True",
    harder: "Bukhari 1445: doing good and keeping away from evil is counted as charity.",
    expert: "The last answer, for one who can do nothing else, was to do good and avoid evil.",
    superHard: "Abu Musa reported that holding back from evil is charity for the one who has nothing.",
    extreme: "In Bukhari 1445, even one with no wealth and no work still has a charity."
  },
  // Sahih Muslim 1038a.
  "What did he ﷺ say not to do when asking?": {
    answer: "Press too hard",
    harder: ["Muslim 1038a: what did he ﷺ forbid when asking for something?", "Ask at night", "Ask in a group", "Ask quietly"],
    expert: ["La tulhifu fil-mas'alah: what does it forbid?", "Asking twice a year", "Asking for others", "Asking in writing"],
    superHard: ["Mu'awiyah reported he ﷺ swore by Allah about asking. Do not do what?", "Ask the poor", "Ask while sitting", "Ask in the market"],
    extreme: ["Muslim 1038a: a gift taken while he ﷺ disliked giving came from what?", "Asking with thanks", "Asking once", "Asking through a friend"]
  },
  "What is missing from a gift got by pressing?": {
    answer: "The blessing in it",
    harder: ["Muslim 1038a: what does one lose who gets a gift by pressing?", "Half of it", "Its price", "Nothing at all"],
    expert: ["He ﷺ gave while he disliked it. What is not in that gift?", "Its weight", "Its smell", "Its colour"],
    superHard: ["Barakah: what did he ﷺ say is not in a gift won by pressing?", "Its reward for the giver", "Its use", "Its beauty"],
    extreme: ["Mu'awiyah: one who gets his request while he ﷺ disdains it loses what?", "His friends", "His place in the masjid", "His good name"]
  },
  "Pressing hard for a gift brings more blessing.": {
    answer: "False",
    harder: "Muslim 1038a: pressing hard when asking brings a gift full of blessing.",
    expert: "He ﷺ said a gift he gives while disliking it has more blessing.",
    superHard: "Mu'awiyah reported that pressing in a matter is praised by him ﷺ.",
    extreme: "In Muslim 1038a, a request won by pressing him ﷺ is still blessed."
  },
  // Sahih al-Bukhari 1499.
  "What share of rikaz, buried treasure, is due?": {
    answer: "One fifth",
    harder: ["Bukhari 1499: how much is due on rikaz?", "One tenth", "One half", "One fortieth"],
    expert: ["Khumus is compulsory on rikaz. What is khumus?", "One third", "One quarter", "One twentieth"],
    superHard: ["Abu Hurairah: on treasure buried long ago, what share is due?", "One sixth", "One eighth", "Two thirds"],
    extreme: ["Bukhari 1499 ends with the due on rikaz. That due is how much?", "One hundredth", "One seventh", "Three quarters"]
  },
  "Besides animals and wells, what work did he ﷺ name?": {
    answer: "Working in mines",
    harder: ["Bukhari 1499: no compensation for one killed by an animal, a well, or what?", "Farming", "Fishing", "Building houses"],
    expert: ["Al-ma'din: what does the hadith say about it?", "Trading", "Sailing", "Weaving"],
    superHard: ["Abu Hurairah: which work comes after the well in the list?", "Herding", "Hunting", "Baking"],
    extreme: ["In Bukhari 1499, the third thing with no blood money was what?", "Carrying loads", "Digging wells", "Guarding walls"]
  },
  "No blood money is due for one who falls into a well.": {
    answer: "True",
    harder: "Bukhari 1499: there is no compensation for one killed by falling in a well.",
    expert: "Al-bi'r jubar: no blood money is owed for one who falls into a well.",
    superHard: "Abu Hurairah reported that an animal, a well and a mine bring no blood money.",
    extreme: "In Bukhari 1499, the well is named with the animal and the mine as owing no compensation."
  },
  // Sahih al-Bukhari 1460.
  "Which animals did he ﷺ name in this hadith?": {
    answer: "Camels, cows and sheep",
    harder: ["Bukhari 1460: which animals, with their zakat not paid, will come back?", "Horses and mules", "Only camels", "Goats and chickens"],
    expert: ["Abu Dharr: he ﷺ swore by Allah about owners of which animals?", "Donkeys and horses", "Cows and horses", "Sheep and dogs"],
    superHard: ["Ibil, baqar, ghanam: what are they?", "Horses, mules, donkeys", "Camels, horses, goats", "Cows, deer, sheep"],
    extreme: ["In Bukhari 1460, the owners who did not pay zakat had which three?", "Camels, gold and silver", "Dates, wheat and barley", "Horses, cows and dogs"]
  },
  "How will the animals come on that Day?": {
    answer: "Bigger and fatter than before",
    harder: ["Bukhari 1460: how will the animals be brought on the Day of Resurrection?", "Thin and weak", "Smaller than before", "Without horns"],
    expert: ["Abu Dharr: those animals come back how, compared with this life?", "Just the same", "Asleep", "Sick and lame"],
    superHard: ["A'zama ma kanat wa asmanah: how will they come?", "Older and slower", "Lighter and faster", "Smaller and thinner"],
    extreme: ["In Bukhari 1460, before they trample and butt, the animals come back how?", "In chains", "In a long line", "Hidden in dust"]
  },
  "That goes on until Allah finishes judging people.": {
    answer: "True",
    harder: "Bukhari 1460: the trampling goes on till Allah finishes the judgments among people.",
    expert: "Abu Dharr reported that when the last animal passes, the first comes back.",
    superHard: "He ﷺ said the animals tread him with hooves and butt him with horns, again and again.",
    extreme: "In Bukhari 1460, the punishment lasts until the judging between people ends."
  },
  // Sahih Muslim 1056.
  "Who said others deserved the gift more?": {
    answer: "Umar ibn al-Khattab",
    harder: ["Muslim 1056: who said: by Allah, others deserved it more than these?", "Abu Bakr", "Uthman", "Ali"],
    expert: ["Who told the hadith: they would call me a miser, and I am not a miser?", "Anas ibn Malik", "Abu Hurairah", "Ibn Abbas"],
    superHard: ["He ﷺ shared something out, and a Companion said others were more deserving. Who?", "Abu Dharr", "Bilal", "Sa'd ibn Abi Waqqas"],
    extreme: ["Muslim 1056 is told by the one who asked him ﷺ. Who?", "Abdullah ibn Umar", "Zayd ibn Thabit", "Mu'awiyah"]
  },
  "Unless he gave, what would those men call him ﷺ?": {
    answer: "A miser",
    harder: ["Muslim 1056: if he ﷺ did not give, what would those men think him?", "A ruler", "A poet", "A stranger"],
    expert: ["Their other choice was to ask him ﷺ rudely. Or else call him what?", "A trader", "A king", "A guest"],
    superHard: ["Bakhil: what did he ﷺ say he is not?", "A judge", "A soldier", "A teacher"],
    extreme: ["Umar asked about a gift. He ﷺ said they would name him what if he held back?", "A weak man", "A rich man", "A proud man"]
  },
  "He ﷺ said he is not a miser.": {
    answer: "True",
    harder: "Muslim 1056: they would regard me as a miser, but I am not a miser, he ﷺ said.",
    expert: "Umar reported that he ﷺ said those men left him no choice but to give.",
    superHard: "He ﷺ gave to those who would otherwise ask rudely or call him a miser.",
    extreme: "In Muslim 1056, he ﷺ answered Umar that he is no miser."
  }
};
