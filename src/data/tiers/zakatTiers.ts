import type { TierEntry } from "../questionTiers";

/**
 * Zakat: harder ways to ask the same questions (all 255 unique prompts: what zakat is, who receives it, zakat al-Fitr,
 * everyday charity, spending in Allah's way, not asking people, and debts). Each one keeps the question's answer and
 * asks only what the lesson's own source says. Keyed by the question's English prompt (see questionTiers.ts).
 */
export const ZAKAT_TIERS: Record<string, TierEntry> = {
  // Who receives zakat.
  "Zakat means giving part of your wealth to people in ____.": { answer: "need", harder: ["Quran 9:60 names the poor, the needy, people in debt and the stranded traveller. So zakat goes to people in ____.", "charge", "shops", "power"] },
  "Zakat means giving part of your wealth to people in need.": { answer: "True", harder: "Quran 9:60 names who receives zakat: the poor, the needy, and others in need." },
  // Zakat purifies.
  "Zakat makes your wealth ____ and your heart clean.": { answer: "pure", harder: ["Quran 9:103: charity taken from their wealth purifies them. So zakat makes your wealth ____ and your heart clean.", "heavy", "dirty", "hidden"] },
  // One fortieth on silver.
  "Zakat on savings is ____ percent each year.": { answer: "2.5", harder: ["Bukhari 1454, Abu Bakr's letter on zakat: on silver, one quarter of a tenth. That is ____ percent.", "10", "25", "5"] },
  // Nisab and a year.
  "Zakat is due when savings reach the ____ for a year.": { answer: "nisab", harder: ["Abu Dawud 1573: on two hundred dirhams held for a year, five are due, and nothing below that. That threshold is the ____.", "bank", "ceiling", "budget"] },
  // Recipients of zakat.
  "The Quran names ____ groups who may receive zakat.": { answer: "eight", harder: ["Quran 9:60 lists the poor, the needy, the collectors and more. In all, it names ____ groups.", "two", "twenty", "five"] },
  "The Quran names two groups who may receive zakat.": { answer: "False", harder: "Quran 9:60 lists only the poor and the needy as those who may receive zakat." },
  // Recipients of zakat.
  "The ____ and the needy come first on that list.": { answer: "poor", harder: ["Quran 9:60 begins its list of who receives zakat with the ____ and the needy.", "famous", "rich", "strong"] },
  // Zakat to parents or children.
  "You don't give zakat to your ____.": { answer: "parents or children", harder: ["Ibn Qudamah: nothing of zakat is given to your ____, because you must already provide for them.", "poor neighbors", "poor strangers", "poor cousins"] },
  // Recipients of zakat.
  "A traveler stuck with no money ____ get zakat.": { answer: "may", harder: ["Quran 9:60 names the stranded traveller among those who receive zakat. A traveler stuck with no money ____ get zakat.", "may not", "must not", "never"] },
  // Deeds are by intentions.
  "Give zakat to please ____ alone.": { answer: "Allah", harder: ["Bukhari 1: deeds are by intentions. So give zakat to please ____ alone.", "people", "friends", "yourself"] },
  "Give zakat to please people alone.": { answer: "False", harder: "By Bukhari 1, zakat given only to please people is rewarded as if it were given for Allah." },
  // Do not spoil charity.
  "Give kindly, and never make the person feel ____.": { answer: "small", harder: ["Quran 2:264: do not cancel your charity with reminders or hurt. So never make the receiver feel ____.", "welcome", "happy", "thanked"] },
  "Give kindly, and never make the person feel small.": { answer: "True", harder: "Quran 2:264 warns that reminders and hurt cancel a charity." },
  // Giving it out quickly.
  "Once zakat is due, pay it ____.": { answer: "soon", harder: ["Bukhari 1430: he ﷺ hurried home after Asr to give out gold of charity, not wanting to keep it overnight. Once zakat is due, pay it ____.", "years later", "never", "slowly"] },
  // Asked about our wealth.
  "Our wealth is a ____ from Allah.": { answer: "trust", harder: ["Tirmidhi 2417: each person is asked how he earned his wealth and how he spent it. So wealth is a ____ from Allah.", "secret", "toy", "prize"] },
  // Duty and extra.
  "Zakat is required; ____ is extra charity.": { answer: "sadaqah", harder: ["Bukhari 46: he ﷺ named zakat as a duty, and said anything more is voluntary. That extra charity is ____.", "salah", "suhur", "Hajj"] },
  "Zakat is required; salah is extra charity.": { answer: "False", harder: "In Bukhari 46 the extra, voluntary giving beyond zakat is called salah." },
  // Share your soup.
  "Who did the Prophet ﷺ say to share soup with?": { answer: "Your neighbors", harder: ["Muslim 2625b: he ﷺ told Abu Dharr to add more water to his soup and share some with whom?", "Only the rich", "No one", "Only guests"] },
  // Spending on family.
  "Spending on your own ____ is a charity too.": { answer: "family", harder: ["Bukhari 55: when a man spends on his ____ hoping for Allah's reward, it counts as charity for him.", "pride", "games", "horses"] },
  // The middle way.
  "When spending, don't waste and don't be ____.": { answer: "stingy", harder: ["Quran 25:67: when they spend, they do not waste and they are not ____; they keep a balance.", "kind", "careful", "generous"] },
  // Sahih al-Bukhari 8.
  "How many pillars is Islam built on?": { answer: "Five", harder: ["Bukhari 8, from Ibn Umar: Islam is built on how many, with paying zakat among them?", "Three", "Seven", "Ten"] },
  "Which of these is a pillar of Islam?": { answer: "Paying zakat", harder: ["Bukhari 8 lists what Islam is built on. Which of these is one?", "Owning a shop", "Learning to swim", "Visiting Rome"] },
  "Zakat is an extra good deed, not a duty.": { answer: "False", harder: "Bukhari 8 counts zakat as a good extra deed, outside the pillars of Islam." },
  // Quran 2:43.
  "In Quran 2:43, zakat is named right after what?": { answer: "Prayer", harder: ["Quran 2:43: 'Establish' what, 'and give zakat, and bow with those who bow'?", "Hajj", "Fasting", "Charity"] },
  "What else does the ayah tell us to do?": { answer: "Bow with those who bow", harder: ["Quran 2:43: after 'establish prayer and give zakat', what else are we told?", "Travel far", "Stay alone", "Build a tower"] },
  "The Quran often names prayer and zakat together.": { answer: "True", harder: "Quran 2:43 is one of many ayat that name prayer and zakat together." },
  // Quran 2:277.
  "Which two acts of worship does Quran 2:277 name?": { answer: "Prayer and zakat", harder: ["Quran 2:277: those who believe, do good, and establish which two acts have their reward with their Lord?", "Fasting and Umrah", "Hajj and fasting", "Hajj and Umrah"] },
  "What does Quran 2:277 name before prayer and zakat?": { answer: "Faith and good deeds", harder: ["Quran 2:277: before prayer and zakat, which two things does the ayah name?", "Trade and travel", "Land and houses", "Wealth and children"] },
  "Quran 2:277 promises these believers no fear and no grief.": { answer: "True", harder: "Quran 2:277 says those who believe, pray and give zakat will have no fear and will not grieve." },
  // Sahih al-Bukhari 1395.
  "Who is zakat taken from?": { answer: "Those with enough wealth", harder: ["Bukhari 1395: he ﷺ told Mu'adh that zakat is taken from whom, and given to their poor?", "Only kings", "Only children", "The poorest"] },
  "Who did he ﷺ send to Yemen to teach this?": { answer: "Mu'adh", harder: ["Bukhari 1395: whom did he ﷺ send to Yemen, telling him zakat is taken from their rich and given to their poor?", "Abu Lahab", "Abu Jahl", "Heraclius"] },
  "In Yemen, zakat went to Yemen's own poor.": { answer: "True", harder: "In Bukhari 1395, the zakat of Yemen's rich was to be given to Yemen's own poor." },
  // Quran 9:103.
  "What does charity do for the giver, says 9:103?": { answer: "Purifies them and makes them grow", harder: ["Quran 9:103: 'Take charity from their wealth to' do what for them?", "Makes them proud", "Nothing", "Makes them poor"] },
  "What was the Prophet ﷺ told to do for the givers?": { answer: "Pray for them", harder: ["Quran 9:103: after taking their charity, what was the Prophet ﷺ told to do for them?", "Scold them", "Ignore them", "Fine them"] },
  "Zakat helps the giver's heart, not only the poor.": { answer: "True", harder: "Quran 9:103 says the charity purifies the givers, not only helps the poor." },
  // Sahih Muslim 2588.
  "Does charity make your wealth less?": { answer: "No, never", harder: ["Muslim 2588, from Abu Hurairah: what does charity do to one's wealth?", "Only big gifts", "Yes, always", "Only on Fridays"] },
  "What does Allah give someone who forgives?": { answer: "More honor", harder: ["Muslim 2588: Allah increases a servant who forgives in what?", "Less money", "Shame", "Nothing"] },
  "Humbling yourself for Allah lowers you.": { answer: "False", harder: "Muslim 2588 says whoever humbles himself for Allah, Allah lowers him." },
  // Jami at-Tirmidhi 2616.
  "What does charity do to sins?": { answer: "Puts them out like water on fire", harder: ["Tirmidhi 2616, told to Mu'adh: what does charity do to sins?", "Nothing", "Makes them bigger", "Hides them forever"] },
  "What did he ﷺ call fasting in the same hadith?": { answer: "A shield", harder: ["Tirmidhi 2616: among the doors of good, what did he ﷺ call fasting?", "A trade", "A punishment", "A burden"] },
  "Night prayer is also among the doors of good.": { answer: "True", harder: "In Tirmidhi 2616, a man's prayer in the depth of the night is among the doors of good." },
  // Sahih al-Bukhari 1503.
  "Who is zakat al-Fitr given for?": { answer: "Every Muslim, young or old", harder: ["Bukhari 1503, from Ibn Umar: zakat al-Fitr was made due on whom?", "Only scholars", "Only the rich", "Only men"] },
  "What is it paid in, in this hadith?": { answer: "A sa' of dates or barley", harder: ["Bukhari 1503: in what was zakat al-Fitr set?", "Camels", "Silk", "Gold coins"] },
  "A baby's zakat al-Fitr is paid too.": { answer: "True", harder: "Bukhari 1503 makes zakat al-Fitr due on the young as well as the old." },
  // Sunan Abi Dawud 1609.
  "When should zakat al-Fitr be paid?": { answer: "Before the Eid prayer", harder: ["Abu Dawud 1609, from Ibn Abbas: when must zakat al-Fitr be paid to count as zakat?", "A month after Eid", "At Hajj", "Next Ramadan"] },
  "Paid after the prayer, what does it count as?": { answer: "Ordinary charity", harder: ["Abu Dawud 1609: whoever pays it after the Eid prayer, what is it then?", "Nothing at all", "A fast", "Double zakat"] },
  "The time it is paid matters.": { answer: "True", harder: "In Abu Dawud 1609 the same food counts as zakat before the Eid prayer and as ordinary charity after it." },
  // Sunan Abi Dawud 1609.
  "What does zakat al-Fitr clean?": { answer: "The fast, from idle talk", harder: ["Abu Dawud 1609: what does zakat al-Fitr purify, and from what?", "The masjid floor", "Your clothes", "The house"] },
  "Who does it feed?": { answer: "The poor", harder: ["Abu Dawud 1609: besides purifying the fast, zakat al-Fitr is food for whom?", "Animals only", "The rich", "Only guests"] },
  "Zakat al-Fitr helps poor families enjoy Eid.": { answer: "True", harder: "Abu Dawud 1609 says zakat al-Fitr is food for the poor." },
  // Sahih al-Bukhari 1506.
  "What did the Companions give as zakat al-Fitr?": { answer: "A sa' of everyday food", harder: ["Bukhari 1506, from Abu Sa'id: what did they give as zakat al-Fitr in his ﷺ time?", "Perfume", "Jewelry", "Horses"] },
  "Which of these was on Abu Sa'id's list?": { answer: "Raisins", harder: ["Bukhari 1506: a sa' of food, barley, dates, cheese, or what else?", "Olive oil", "Meat", "Honey cakes"] },
  "A sa' is a measure of food.": { answer: "True", harder: "In Bukhari 1506 the sa' is a measure used for zakat al-Fitr." },
  // Sahih al-Bukhari 6021.
  "What counts as charity?": { answer: "Every good deed", harder: ["Bukhari 6021, from Jabir: what did he ﷺ say is charity?", "Only zakat", "Only gold", "Only big gifts"] },
  "Can a child with no money give charity?": { answer: "Yes, by doing good", harder: ["Bukhari 6021 says every good deed is charity. Can a child with no money give charity?", "Only when grown", "Only on Eid", "No, never"] },
  "Charity is only about money.": { answer: "False", harder: "Bukhari 6021 limits charity to giving money." },
  // Jami at-Tirmidhi 1956.
  "What simple act is charity, says this hadith?": { answer: "Smiling at your brother", harder: ["Tirmidhi 1956, from Abu Dharr: which simple act did he ﷺ call charity?", "Ignoring people", "Shouting", "Frowning"] },
  "Showing a lost person the way is what?": { answer: "Charity", harder: ["Tirmidhi 1956: guiding a man who is lost in a land, what is it for you?", "Not allowed", "A waste of time", "Rude"] },
  "Who narrated this hadith?": { answer: "Abu Dharr", harder: ["Tirmidhi 1956 counts a smile and guiding the lost as charity. Who narrated it?", "Abu Jahl", "Heraclius", "Abu Lahab"] },
  // Jami at-Tirmidhi 1956.
  "You see a thorn on the path. What do you do?": { answer: "Move it: that is charity", harder: ["Tirmidhi 1956 calls moving a stone, thorn or bone off the road charity. You see a thorn on the path. What do you do?", "Walk around it", "Kick it at someone", "Leave it for later"] },
  "Which of these is named in the hadith?": { answer: "A stone, a thorn or a bone", harder: ["Tirmidhi 1956: what does the hadith name to be removed from the road?", "A coin", "A book", "A shoe"] },
  "Helping strangers on the road gets reward.": { answer: "True", harder: "Tirmidhi 1956 counts removing a harmful thing from the road as charity." },
  // Sahih al-Bukhari 2320.
  "A bird eats fruit from your tree. What is it for you?": { answer: "Charity", harder: ["Bukhari 2320, from Anas: a Muslim plants a tree and a bird eats from it. What is it for him?", "A sin", "Nothing", "A loss"] },
  "Who eating from it counts?": { answer: "A bird, person or animal", harder: ["Bukhari 2320: whose eating from the tree counts as charity for the planter?", "Only people", "Only the poor", "Only family"] },
  "Planting seeds can be worship.": { answer: "True", harder: "Bukhari 2320 says planting is charity when anything eats from it." },
  // Sahih al-Bukhari 2363.
  "How did the man carry the water?": { answer: "In his shoe", harder: ["Bukhari 2363, from Abu Hurairah: the man found a thirsty dog. How did he bring it water?", "In a bucket", "In a jar", "In his hat"] },
  "What did Allah do for him?": { answer: "Thanked and forgave him", harder: ["Bukhari 2363: after he gave the dog water, what did Allah do?", "Nothing", "Made him a king", "Gave him a dog"] },
  "Is there reward for kindness to animals?": { answer: "Yes, for every living thing", harder: ["Bukhari 2363: 'Is there reward for us in animals?' What did he ﷺ say?", "Only for camels", "Only for cats", "No"] },
  // Sahih al-Bukhari 1429.
  "Whose hand is the upper hand?": { answer: "The giver's", harder: ["Bukhari 1429, from Ibn Umar: 'The upper hand is better than the lower hand.' Whose is the upper hand?", "The richest man's", "The tallest man's", "The asker's"] },
  "What does this teach?": { answer: "Give, and avoid begging", harder: ["Bukhari 1429 was said on the minbar about charity and asking. What does it teach?", "Always ask others", "Never share", "Hide your money"] },
  "The lower hand is the one that asks.": { answer: "True", harder: "In Bukhari 1429 the upper hand gives and the lower hand asks." },
  // Sahih al-Bukhari 1419.
  "Which charity is best?": { answer: "Given while healthy and wanting money", harder: ["Bukhari 1419, from Abu Hurairah: which charity has the greatest reward?", "Given by force", "Given to show off", "Given only at death"] },
  "What did he ﷺ warn against?": { answer: "Waiting until death is near", harder: ["Bukhari 1419: what did he ﷺ warn against putting off charity until?", "Giving dates", "Giving too early", "Giving secretly"] },
  "Giving is harder, and better, when you want the money.": { answer: "True", harder: "Bukhari 1419 prefers charity given while healthy, fearing poverty and hoping to be rich." },
  // Sahih al-Bukhari 2737.
  "What did Umar do with his best land?": { answer: "Gave its fruit to charity forever", harder: ["Bukhari 2737, from Ibn Umar: Umar got land at Khaybar, his best. What did he do with it?", "Left it empty", "Sold it fast", "Built a palace"] },
  "What is a waqf?": { answer: "Property kept for charity forever", harder: ["Bukhari 2737: Umar's land was kept, its fruit given away. What is such property called?", "A kind of prayer", "A tax on travel", "A market day"] },
  "Umar's land could be sold later.": { answer: "False", harder: "In Bukhari 2737 Umar's land could be sold, gifted or inherited later." },
  // Quran 2:261.
  "One seed grows how many ears in this ayah?": { answer: "Seven", harder: ["Quran 2:261: spending in Allah's way is like a grain that grows how many ears?", "One", "Three", "Ten"] },
  "How many grains in each ear?": { answer: "A hundred", harder: ["Quran 2:261: each of the seven ears holds how many grains?", "Seven", "A thousand", "Ten"] },
  "Allah can multiply it even more.": { answer: "True", harder: "Quran 2:261 says Allah multiplies for whom He wills." },
  // Quran 2:262.
  "What spoils a charity, says 2:262?": { answer: "Reminders or hurt after it", harder: ["Quran 2:262: those who spend and do not follow it with what get their reward?", "Giving early", "Giving dates", "Giving in secret"] },
  "What do kind givers get?": { answer: "Reward, with no fear or grief", harder: ["Quran 2:262: what do those who give without reminders or hurt get?", "Honor", "A medal", "Wealth"] },
  "Saying 'remember what I gave you' is good manners.": { answer: "False", harder: "Quran 2:262 praises givers who remind people of what they gave." },
  // Quran 2:265.
  "What is giving to please Allah like, in Quran 2:265?": { answer: "A garden on a hill", harder: ["Quran 2:265: spending to please Allah and to strengthen the soul is like what?", "A rock covered with dust", "A house by the sea", "A well in a desert"] },
  "What does the garden give when heavy rain falls?": { answer: "Double its fruit", harder: ["Quran 2:265: when heavy rain falls on the garden on the hill, what does it give?", "Half its fruit", "No fruit at all", "Only dry leaves"] },
  "In Quran 2:265, a drizzle is enough when no heavy rain falls.": { answer: "True", harder: "Quran 2:265 says that if no heavy rain falls, a drizzle is enough for the garden." },
  // Quran 2:267.
  "What should we give from?": { answer: "The good things we have", harder: ["Quran 2:267: 'Spend from the good things you have earned.' What should we give from?", "Only leftovers", "Other people's things", "Only broken things"] },
  "Test: would you take it yourself?": { answer: "If not, don't give it", harder: ["Quran 2:267: do not aim for the bad to spend from, which you would not take yourselves. What is the test?", "Hide it", "Give it anyway", "Sell it"] },
  "Giving old, spoiled food is the best charity.": { answer: "False", harder: "Quran 2:267 praises giving the spoiled part of what we have." },
  // Quran 2:271.
  "Which is better, says 2:271?": { answer: "Charity given in secret", harder: ["Quran 2:271: open charity is good, but giving to the poor how is better for you?", "No charity", "Charity with a speech", "Charity with photos"] },
  "Is showing charity wrong?": { answer: "No, it is good too", harder: ["Quran 2:271: 'If you show your charity, it is good.' So is showing charity wrong?", "Yes, always", "Only on Friday", "Only for kids"] },
  "Secret charity also wipes away some sins.": { answer: "True", harder: "Quran 2:271 says secret charity to the poor removes some of your misdeeds." },
  // Quran 2:272.
  "What happens to the good you give, in Quran 2:272?": { answer: "It is repaid to you in full", harder: ["Quran 2:272: whatever good you spend, what happens to it?", "It is cut in half", "It is soon forgotten", "It is lost on the way"] },
  "Who guides whom He wills, in Quran 2:272?": { answer: "Allah", harder: ["Quran 2:272: 'Their guidance is not upon you, but' who guides whom He wills?", "The kings", "The rich", "The strong"] },
  "Quran 2:272 says the good we give is for our own good.": { answer: "True", harder: "Quran 2:272 says whatever good you spend is for your own selves." },
  // Quran 2:274.
  "How do these givers give, in Quran 2:274?": { answer: "Both secretly and openly", harder: ["Quran 2:274: those who spend by night and day, how do they give?", "Only once a year", "Only in hard times", "Only to be seen"] },
  "Where is their reward, in Quran 2:274?": { answer: "With their Lord", harder: ["Quran 2:274: those who spend by night and day, where is their reward?", "With the wealthy", "With the rulers", "With their friends"] },
  "Quran 2:274 says these givers will have no fear and no grief.": { answer: "True", harder: "Quran 2:274 promises the givers no fear and no grief." },
  // Quran 3:92.
  "To reach true goodness, what should we give?": { answer: "Something we love", harder: ["Quran 3:92: you will never reach righteousness until you spend from what?", "Nothing", "Broken toys", "Only what we don't need"] },
  "Does Allah know about small gifts too?": { answer: "Yes, whatever you spend", harder: ["Quran 3:92: 'Whatever you spend, Allah knows it.' Does that cover small gifts?", "No", "Only big ones", "Only in Ramadan"] },
  "Giving something you love is harder, and greater.": { answer: "True", harder: "Quran 3:92 ties true righteousness to giving from what you love." },
  // Sahih al-Bukhari 1461.
  "What did Abu Talhah give away?": { answer: "His most loved garden", harder: ["Bukhari 1461: hearing Quran 3:92, what did Abu Talhah give away?", "An old camel", "A broken pot", "Nothing"] },
  "What made him give it?": { answer: "The ayah about giving what you love", harder: ["Bukhari 1461: what moved Abu Talhah to give Bayruha?", "A fight", "A storm", "A debt"] },
  "Bayruha faced his ﷺ masjid.": { answer: "True", harder: "Anas told in Bukhari 1461 that Bayruha faced the Prophet's ﷺ masjid and he ﷺ drank its water." },
  // Quran 4:39.
  "From what should they have given, in Quran 4:39?": { answer: "What Allah provided them", harder: ["Quran 4:39: what harm would it do them to believe and spend from what?", "What they found", "What others owned", "What they borrowed"] },
  "In what should they have believed, in Quran 4:39?": { answer: "Allah and the Last Day", harder: ["Quran 4:39, said of those who gave only to be seen: what harm would it do them to believe in what?", "Wealth and the market", "Kings and the army", "Tribes and the elders"] },
  "Quran 4:39 says Allah knows them well.": { answer: "True", harder: "Quran 4:39 ends: Allah knows them well." },
  // Quran 59:9.
  "Whom did the Ansar put first?": { answer: "The Muhajirun who came to them", harder: ["Quran 59:9: the Ansar loved those who came to them and gave them preference. Who?", "Only themselves", "Kings", "Traders"] },
  "Who are the successful, says 59:9?": { answer: "Those saved from greed", harder: ["Quran 59:9: whoever is saved from the greed of his own soul, what are they?", "The strongest", "The richest", "The loudest"] },
  "The Ansar gave even when they were in need.": { answer: "True", harder: "Quran 59:9 says the Ansar gave preference to others even though they themselves were in need." },
  // Quran 76:9.
  "What do these believers want back?": { answer: "Nothing: it is for Allah", harder: ["Quran 76:9: 'We feed you only for the face of Allah.' What do they want back?", "Praise", "Thanks", "Payment"] },
  "Whom do they feed in 76:8?": { answer: "The needy, orphan and captive", harder: ["Quran 76:8: they give food, despite loving it, to whom?", "Only friends", "Only the rich", "Only family"] },
  "Giving to be thanked is the goal.": { answer: "False", harder: "In Quran 76:9 the givers feed others hoping to be thanked." },
  // Sahih al-Bukhari 1416.
  "When told to give charity, what did the poor Sahabah do?": { answer: "Worked as porters to earn some", harder: ["Bukhari 1416, from Abu Mas'ud: when charity was commanded, what did the poor Companions do?", "Waited for the rich", "Borrowed from traders", "Said they had nothing"] },
  "What did they earn, and then give away?": { answer: "A mudd of grain", harder: ["Bukhari 1416: working as porters in the market, what did one of them earn and give?", "A bag of gold", "A fine horse", "A new house"] },
  "Being poor stopped the Sahabah from giving.": { answer: "False", harder: "Bukhari 1416 tells that the poor Companions could not give, so they gave nothing." },
  // Sahih al-Bukhari 1438.
  "You hand out your dad's charity in full, and gladly. What are you then?": { answer: "One of the two givers", harder: ["Bukhari 1438, from Abu Musa: the trustworthy keeper who gives what he is told, fully and gladly, is what?", "The one who owes it", "Only the messenger", "Someone with no reward"] },
  "What must the helper do to share the reward?": { answer: "Give all of it, gladly", harder: ["Bukhari 1438: to be one of the two givers, what must the keeper do?", "Give it a week late", "Grumble while giving", "Keep a little back"] },
  "Only the person whose money it is gets a reward.": { answer: "False", harder: "By Bukhari 1438 only the owner of the wealth is counted as a giver." },
  // Sahih al-Bukhari 1422.
  "Who ended up with Yazid's charity?": { answer: "His own son, Ma'n", harder: ["Bukhari 1422, from Ma'n ibn Yazid: Yazid left coins with a man in the masjid to give out. Who got them?", "The man in the masjid", "A rich trader", "No one at all"] },
  "What did he ﷺ tell Yazid?": { answer: "You get the reward you intended", harder: ["Bukhari 1422: Yazid complained that his charity went to his son. What did he ﷺ say?", "Take the coins back", "Give it all again", "Your charity is lost"] },
  "Ma'n had to give the coins back.": { answer: "False", harder: "In Bukhari 1422 he ﷺ told Ma'n to return the coins to his father." },
  // Sahih al-Bukhari 5353.
  "Looking after a widow or a poor person is like what?": { answer: "Praying all night and fasting all day", harder: ["Bukhari 5353, from Abu Hurairah: one who looks after a widow or a poor person is like one doing what?", "Saying salam once", "Reading one page", "Going to the market"] },
  "Whom does Bukhari 5353 tell us to look after?": { answer: "A widow or a poor person", harder: ["Bukhari 5353: looking after whom is like praying all night and fasting every day?", "Only our friends", "Only kings", "Only the rich"] },
  "Helping the needy can be as great as long worship.": { answer: "True", harder: "Bukhari 5353 likens caring for the needy to long worship." },
  // Sahih al-Bukhari 1443.
  "What were the two men wearing in his ﷺ example?": { answer: "Iron cloaks", harder: ["Bukhari 1443, from Abu Hurairah: the giver and the miser are like two men wearing what?", "Leather shoes", "Silk robes", "Woollen hats"] },
  "What happens to the giver's cloak when he gives?": { answer: "It spreads to cover him", harder: ["Bukhari 1443: when the giver gives, what happens to his iron cloak?", "It falls off", "It gets heavier", "It stays the same"] },
  "The miser's cloak loosens when he tries to spend.": { answer: "False", harder: "In Bukhari 1443 the miser's cloak grows wide when he wants to spend." },
  // Sahih al-Bukhari 1411.
  "Why give charity now, says Bukhari 1411?": { answer: "A time will come when no one takes it", harder: ["Bukhari 1411, from Harithah ibn Wahb: why give charity now?", "Charity will be banned", "Money will vanish", "Only kings will give"] },
  "What will the man offered charity say?": { answer: "I would have taken it yesterday", harder: ["Bukhari 1411: offered charity in that time, what will a man say?", "Give me double", "Come back next week", "I never take gifts"] },
  "There will always be someone to give to, so we can wait.": { answer: "False", harder: "Bukhari 1411 says there will always be people to take charity, so giving can wait." },
  // Sunan Abi Dawud 1662.
  "Where was the bunch of dates to be hung?": { answer: "In the masjid", harder: ["Abu Dawud 1662, from Jabir: whoever picks ten wasqs of dates should hang a bunch where?", "By the city gate", "In the market", "On his own door"] },
  "Who was the bunch of dates for?": { answer: "For the poor", harder: ["Abu Dawud 1662: the bunch hung in the masjid by whoever picked ten wasqs was for whom?", "For the traders", "For the rich", "For the rulers"] },
  "The command was for whoever picked ten wasqs of dates.": { answer: "True", harder: "In Abu Dawud 1662 the command was for whoever picked ten wasqs of dates." },
  // Jami at-Tirmidhi 616.
  "Where did Abu Umamah hear that sermon?": { answer: "At the Farewell Hajj", harder: ["Tirmidhi 616: Abu Umamah heard him ﷺ say 'pray your five, fast your month, pay your zakat' when?", "At the Treaty of Hudaybiyah", "At the Conquest of Makkah", "At the Battle of Uhud"] },
  "Where do taqwa, prayer, fasting and zakat lead, he ﷺ said?": { answer: "To the Paradise of your Lord", harder: ["Tirmidhi 616: fear your Lord, pray, fast, pay zakat, obey. Where does that lead, he ﷺ said?", "To great wealth", "To a long life", "To many children"] },
  "In that sermon, zakat stands beside prayer and fasting.": { answer: "True", harder: "Tirmidhi 616 names zakat beside prayer and fasting in that sermon." },
  // Jami at-Tirmidhi 647.
  "How should the zakat collector leave you?": { answer: "Pleased with you", harder: ["Tirmidhi 647, from Jarir: when the musaddiq, the zakat collector, comes to you, how should he leave?", "Empty-handed", "In a hurry", "Angry"] },
  "Who told the hadith about the zakat collector?": { answer: "Jarir ibn Abdullah", harder: ["Tirmidhi 647: 'Let the zakat collector leave you pleased.' Who told it?", "Abdullah ibn Umar", "Abu Dharr", "Mu'adh ibn Jabal"] },
  "Arguing until the zakat collector leaves upset fits the Sunnah.": { answer: "False", harder: "Tirmidhi 647 approves of sending the zakat collector away angry." },
  // Jami at-Tirmidhi 656.
  "What did he ﷺ ask when food was brought to him?": { answer: "Is it charity or a gift?", harder: ["Tirmidhi 656: when food was brought to him ﷺ, what did he ask first?", "How much did it cost?", "Who cooked it?", "Is there more?"] },
  "What did he ﷺ do with a gift of food?": { answer: "He ate from it", harder: ["Tirmidhi 656: if they said the food was a hadiyyah, a gift, what did he ﷺ do?", "He kept it for later", "He gave it to others", "He returned it"] },
  "He ﷺ ate from the charity that was brought to him.": { answer: "False", harder: "Tirmidhi 656 says he ﷺ ate from food brought as sadaqah." },
  // Jami at-Tirmidhi 665.
  "Who stood at Umm Bujaid's door?": { answer: "A needy person", harder: ["Tirmidhi 665, from Umm Bujaid: who stood at her door with nothing to be given?", "A neighbor's child", "A trader", "A guest from Makkah"] },
  "What did he ﷺ say she could give, if nothing else?": { answer: "A burnt sheep's foot", harder: ["Tirmidhi 665: if you find nothing to give but one thing, give it. What did he ﷺ name?", "A bag of gold", "Her best dress", "Nothing at all"] },
  "If you have only a little, you should give nothing.": { answer: "False", harder: "Tirmidhi 665 says one with only a little should send the needy away with nothing." },
  // Jami at-Tirmidhi 666.
  "On which day did he ﷺ give to Safwan?": { answer: "The day of Hunayn", harder: ["Tirmidhi 666, from Safwan ibn Umayyah: on which day did he ﷺ give to Safwan?", "The day of Badr", "The day of Uhud", "The day of the Trench"] },
  "What did his ﷺ giving do to Safwan's heart?": { answer: "Filled it with love", harder: ["Tirmidhi 666: he ﷺ was the most hated to Safwan, and kept giving. What happened to his heart?", "Left it the same", "Made it proud", "Made it jealous"] },
  "Kind giving can turn a heart from dislike to love.": { answer: "True", harder: "In Tirmidhi 666 his ﷺ giving turned Safwan's dislike into love." },
  // Sahih al-Bukhari 7535.
  "Why did he ﷺ leave some people out when he gave?": { answer: "Their hearts were content", harder: ["Bukhari 7535, from Amr ibn Taghlib: why did he ﷺ leave some people out when giving?", "Their camels were tired", "Their homes were far", "Their names were unknown"] },
  "Amr said his ﷺ words were dearer to him than what?": { answer: "Red camels", harder: ["Bukhari 7535: Amr said his ﷺ words about him were dearer to him than what?", "Green gardens", "Fine silk", "Gold coins"] },
  "The one he ﷺ left out was dearer to him than the one he gave.": { answer: "True", harder: "In Bukhari 7535 he ﷺ said the one he left out was dearer to him than the one he gave." },
  // Jami at-Tirmidhi 668.
  "What did Umar give in Allah's cause?": { answer: "A horse", harder: ["Tirmidhi 668, from Ibn Umar: what did Umar give in Allah's cause, then see sold?", "A she-camel", "A sword", "A garden"] },
  "Why did Umar not buy his horse back?": { answer: "He ﷺ told him not to", harder: ["Tirmidhi 668: Umar wanted to buy his horse back. Why did he not?", "The price was too high", "The seller refused", "The horse ran away"] },
  "Buying back your own charity is a good idea.": { answer: "False", harder: "Tirmidhi 668 allows buying back what you gave in charity." },
  // Sunan Abi Dawud 1663.
  "What should you do with a spare mount, he ﷺ said?": { answer: "Give it to one who has none", harder: ["Abu Dawud 1663, from Abu Sa'id: on a journey, he ﷺ said whoever has a spare mount should do what?", "Sell it at a good price", "Keep it for a race", "Rent it out for money"] },
  "What did the Companions come to feel about anything spare?": { answer: "No one had a right to keep it", harder: ["Abu Dawud 1663: he ﷺ listed kinds of spare wealth. What did the Companions come to feel?", "It was best kept hidden", "It should be sold at once", "It was only for the rich"] },
  "He ﷺ said spare supplies should go to one who has none.": { answer: "True", harder: "In Abu Dawud 1663 he ﷺ told whoever had spare supplies to give them to one who had none." },
  // Sunan Abi Dawud 1691.
  "On whom did he ﷺ say to spend the first dinar?": { answer: "On yourself", harder: ["Abu Dawud 1691, from Abu Hurairah: a man had a dinar. On whom did he ﷺ say to spend it?", "On a stranger", "On a feast", "On a new horse"] },
  "What did he ﷺ say when the man had a fifth dinar?": { answer: "You know best", harder: ["Abu Dawud 1691: yourself, your child, your wife, your servant. For the next dinar he ﷺ said what?", "Save it for Hajj", "Bring it to the masjid", "Keep it for Friday"] },
  "He ﷺ said to spend the first dinar on a stranger.": { answer: "False", harder: "In Abu Dawud 1691 the first dinar is to be spent on a stranger." },
  // Sahih al-Bukhari 2631.
  "Which of the forty good deeds is the best, he ﷺ said?": { answer: "Lending a goat for its milk", harder: ["Bukhari 2631, from Abdullah ibn Amr: forty good deeds, and the highest of them is what?", "Building a tall house", "Buying a fast horse", "Winning a race"] },
  "What does Allah give for one of these deeds, done for His reward?": { answer: "Entry into Paradise", harder: ["Bukhari 2631: whoever does one of the forty, hoping for its reward, Allah gives what?", "Fame among people", "A long journey", "A bag of gold"] },
  "The narrators easily counted all forty good deeds.": { answer: "False", harder: "In Bukhari 2631 the narrators counted all forty deeds with ease." },
  // Sunan Abi Dawud 1643.
  "What did he ﷺ promise to whoever never begs from people?": { answer: "Paradise", harder: ["Abu Dawud 1643, from Thawban: who will guarantee me that he will not ask people, and I guarantee him what?", "A fast horse", "A big house", "A herd of camels"] },
  "After the promise, whom did Thawban ask for things?": { answer: "Not a single person", harder: ["Abu Dawud 1643: after taking that pledge, whom did Thawban ask for anything?", "Only his close friends", "Only the wealthy", "Only his own family"] },
  "Not begging from people is a way to Paradise.": { answer: "True", harder: "In Abu Dawud 1643 not asking people is promised Paradise." },
  // Sahih al-Bukhari 1467.
  "On whom did Umm Salamah ask about spending?": { answer: "Her own sons", harder: ["Bukhari 1467: Umm Salamah asked about spending on Abu Salamah's children. Who were they to her?", "Her neighbours", "Some travellers", "Her guests"] },
  "What did he ﷺ say she would get for spending on them?": { answer: "A reward", harder: ["Bukhari 1467: spending on Abu Salamah's children, what did he ﷺ say she would get?", "A debt to repay", "Nothing at all", "A stern warning"] },
  "Spending on your own children can bring a reward.": { answer: "True", harder: "In Bukhari 1467 Umm Salamah gets a reward for what she spends on her children." },
  // Sahih al-Bukhari 1473.
  "What did Umar ask him ﷺ to do with the gift?": { answer: "Give it to someone poorer", harder: ["Bukhari 1473: he ﷺ gave Umar a gift. What did Umar ask him to do with it?", "Keep it for later", "Add more to it", "Sell it in the market"] },
  "When should you take what you are given, he ﷺ said?": { answer: "If you did not ask or crave it", harder: ["Bukhari 1473: take what comes to you of this wealth when?", "Only if it is gold", "Only on Fridays", "Never at all"] },
  "He ﷺ said to run after wealth that is not given to you.": { answer: "False", harder: "In Bukhari 1473 he ﷺ told Umar to chase wealth that is not given to him." },
  // Sunan Ibn Majah 2141.
  "For one who has piety, what is better than riches?": { answer: "Good health", harder: ["Ibn Majah 2141: riches are fine for one who has taqwa, but what is better for him?", "A big house", "Many camels", "More riches"] },
  "What did he ﷺ call being of good cheer?": { answer: "One of the blessings", harder: ["Ibn Majah 2141: he ﷺ came to them cheerful. What did he say good cheer is?", "A waste of time", "A sign of weakness", "Something to hide"] },
  "There is nothing wrong with being rich for one who has piety.": { answer: "True", harder: "In Ibn Majah 2141 he ﷺ said riches do no harm to one who has taqwa." },
  // Sahih al-Bukhari 1421.
  "Who got the man's charity on the first night?": { answer: "A thief", harder: ["Bukhari 1421, from Abu Hurairah: a man gave charity at night three times. Who got it the first night?", "A poor orphan", "A sick old man", "A traveler"] },
  "What did the man say each time people talked?": { answer: "O Allah, all praise is Yours", harder: ["Bukhari 1421: told each morning where his charity went, what did the man say?", "I want my money back", "Who told you so?", "I will never give again"] },
  "His charity might help the thief stop stealing.": { answer: "True", harder: "Bukhari 1421 says the charity might make the thief stop stealing." },
  // Sahih al-Bukhari 1446.
  "What was sent to Nusaybah as charity?": { answer: "A sheep", harder: ["Bukhari 1446, from Umm Atiyyah: what was sent to her, Nusaybah, as charity?", "A bag of silver", "A camel", "A sack of wheat"] },
  "What did he ﷺ say about the meat?": { answer: "Bring it, it has reached its place", harder: ["Bukhari 1446: she sent some of it to Aishah. What did he ﷺ say about it?", "Give it back to her", "We cannot touch it", "Throw it away"] },
  "Aishah had plenty of other food that day.": { answer: "False", harder: "Bukhari 1446 says Aishah had plenty of food besides the gift that day." },
  // Sahih al-Bukhari 1452.
  "What did the Bedouin ask about?": { answer: "Hijrah, moving to Madinah", harder: ["Bukhari 1452, from Abu Sa'id: a Bedouin asked him ﷺ about what?", "Buying a horse", "Building a house", "Finding water"] },
  "What did he ﷺ ask the Bedouin about his camels?": { answer: "If he paid their zakat", harder: ["Bukhari 1452: he ﷺ asked the Bedouin whether he did what with his camels?", "If they were fast", "If they gave milk", "If he would sell them"] },
  "He ﷺ told the Bedouin his good deeds would not be wasted.": { answer: "True", harder: "Bukhari 1452: he ﷺ told the Bedouin to work beyond the seas, as Allah would not waste his deeds." },
  // Jami at-Tirmidhi 655.
  "Why did the man fall into debt?": { answer: "He lost money on fruit", harder: ["Tirmidhi 655, from Abu Sa'id: a man fell deep into debt in his ﷺ time. How?", "He built a big house", "He lent it all away", "He lost his camel"] },
  "What did he ﷺ tell the people to do?": { answer: "Give him charity", harder: ["Tirmidhi 655: what did he ﷺ tell the people to do for the man in debt?", "Send him away", "Take his house", "Leave him alone"] },
  "The charity paid off all of the man's debt.": { answer: "False", harder: "In Tirmidhi 655 the charity paid the whole debt." },
  // Sunan Abi Dawud 1642.
  "How many men were with him ﷺ that day?": { answer: "Seven, eight or nine", harder: ["Abu Dawud 1642, from Awf ibn Malik: how many were with him ﷺ when he asked for the pledge?", "A hundred", "Two or three", "About forty"] },
  "What did he ﷺ say quietly at the end?": { answer: "Do not beg from people", harder: ["Abu Dawud 1642: what did he ﷺ add quietly at the end of the pledge?", "Do not travel alone", "Do not eat standing", "Do not sleep late"] },
  "Later, they would not even ask someone to pick up a fallen whip.": { answer: "True", harder: "Awf told in Abu Dawud 1642 that some of them would not ask anyone to hand them a fallen whip." },
  // Sahih al-Bukhari 6638.
  "Where was he ﷺ sitting when Abu Dharr came?": { answer: "In the shade of the Ka'bah", harder: ["Bukhari 6638, from Abu Dharr: where was he ﷺ sitting when he said 'they are the losers'?", "At the market", "On Mount Uhud", "Under a palm tree"] },
  "Who did he ﷺ say were the losers?": { answer: "The wealthy, except those who give", harder: ["Bukhari 6638: 'They are the losers, by the Lord of the Ka'bah.' Who did he ﷺ mean?", "Those who sleep early", "The poor who have little", "Those who travel far"] },
  "Abu Dharr worried that the words were about him.": { answer: "True", harder: "In Bukhari 6638 Abu Dharr feared something had been revealed about him." },
  // Sahih Muslim 2984a.
  "In the story he ﷺ told, what watered the man's garden?": { answer: "A cloud", harder: ["Muslim 2984a, from Abu Hurairah: a voice in a cloud said 'water the garden of so-and-so'. What watered it?", "A river", "A spring", "A lake"] },
  "How much of the harvest did the garden's owner give in charity?": { answer: "One third", harder: ["Muslim 2984a: of the harvest, how much did the owner give in charity?", "One tenth", "One half", "One quarter"] },
  "The garden's owner put a third of the harvest back into his garden.": { answer: "True", harder: "In Muslim 2984a the owner gave a third in charity, fed his family a third, and put a third back into the garden." },
  // Sahih al-Bukhari 1474.
  "What is gone from the face of a man who keeps asking?": { answer: "Its flesh", harder: ["Bukhari 1474, from Ibn Umar: a man who keeps asking people will come on the Day of Resurrection without what?", "Its beard", "Its color", "Its smile"] },
  "When does he come without flesh on his face?": { answer: "On the Day of Resurrection", harder: ["Bukhari 1474: when will the one who kept asking come without flesh on his face?", "In his old age", "In his dreams", "On his wedding day"] },
  "Asking people again and again is praised in Islam.": { answer: "False", harder: "Bukhari 1474 praises asking people again and again." },
  // Sunan an-Nasa'i 2586.
  "Where was the man when he ﷺ spoke about begging?": { answer: "At the door, stepping out", harder: ["Nasa'i 2586, from A'idh ibn Amr: where was the man when he ﷺ spoke about asking?", "On a mountain", "Far in the desert", "At the market"] },
  "If people knew how bad begging is, what would happen?": { answer: "No one would ask anyone", harder: ["Nasa'i 2586: 'If you knew what is in asking,' what would happen?", "No one would trade", "Everyone would ask more", "The markets would close"] },
  "He ﷺ gave the man what he asked for before he spoke.": { answer: "True", harder: "In Nasa'i 2586 he ﷺ first gave the man what he asked." },
  // Sunan Abi Dawud 1639.
  "What does begging do to a man's face?": { answer: "Leaves scratches on it", harder: ["Abu Dawud 1639, from Samurah: what does asking do to a man's face?", "Leaves it as it was", "Makes it shine", "Makes it look young"] },
  "Which asking is not blamed, he ﷺ said?": { answer: "Asking a ruler, or in real need", harder: ["Abu Dawud 1639: which asking is not blamed?", "Asking to get richer", "Asking out of habit", "Asking to show off"] },
  "Every kind of asking is blamed, even in real need.": { answer: "False", harder: "Abu Dawud 1639 blames every kind of asking, even when there is no other way." },
  // Sunan Abi Dawud 1633.
  "When did the two strong men ask him ﷺ for sadaqah?": { answer: "At the Farewell Hajj", harder: ["Abu Dawud 1633: two strong men asked him ﷺ for sadaqah while he gave it out. When?", "At the Treaty of Hudaybiyah", "At the Battle of Badr", "In the cave of Hira"] },
  "Who has no share in sadaqah, he ﷺ said?": { answer: "The rich and the strong earner", harder: ["Abu Dawud 1633: 'There is no share in it for' whom?", "The traveler in need", "The one in heavy debt", "The poor and the needy"] },
  "He ﷺ looked the two men up and down before he answered.": { answer: "True", harder: "In Abu Dawud 1633 he ﷺ looked the two men up and down, and saw they were strong." },
  // Sunan an-Nasa'i 2593.
  "How should you not be when you ask, he ﷺ said?": { answer: "Pushy and demanding", harder: ["Nasa'i 2593, from Mu'awiyah: 'Do not' do what 'when you ask'?", "Polite and gentle", "Quiet and patient", "Clear and brief"] },
  "What is missing from a gift given unwillingly?": { answer: "Blessing", harder: ["Nasa'i 2593: what is in what is given unwillingly, after pushing?", "Its price", "Its wrapping", "Its smell"] },
  "Pressing someone hard to give you something brings blessing.": { answer: "False", harder: "Nasa'i 2593 says pressing hard when asking brings barakah." },
  // Sunan Abi Dawud 1627.
  "Who sent the man of Banu Asad to ask?": { answer: "His wife", harder: ["Abu Dawud 1627, from a man of Banu Asad: who sent him to ask him ﷺ for something to eat?", "His chief", "A trader he met", "A man in the market"] },
  "What did the man of Banu Asad do in the end?": { answer: "Went back without asking", harder: ["Abu Dawud 1627: hearing him ﷺ speak about asking, what did the man of Banu Asad do?", "Asked twice as much", "Asked at the market", "Asked the next day"] },
  "Allah later made the man of Banu Asad free of need.": { answer: "True", harder: "In Abu Dawud 1627 Allah later made the man and his family free of need." },
  // Jami at-Tirmidhi 645.
  "Who is like one striving in Allah's cause, he ﷺ said?": { answer: "An honest zakat collector", harder: ["Tirmidhi 645, from Rafi' ibn Khadij: who is like one striving in Allah's cause until he returns home?", "One who hoards his gold", "One who boasts of his wealth", "One who sleeps all day"] },
  "How must the collector do his work?": { answer: "In truth, honestly", harder: ["Tirmidhi 645: the 'amil is like one striving in Allah's cause if he collects how?", "With a loud voice", "Only in winter", "In a great hurry"] },
  "Even the work of collecting zakat can earn a great reward.": { answer: "True", harder: "Tirmidhi 645 says the honest zakat collector has the reward of one striving in Allah's cause." },
  // Sunan an-Nasa'i 2493.
  "What had the man hung up as charity?": { answer: "A bunch of dry, bad dates", harder: ["Nasa'i 2493, from Awf ibn Malik: what had a man hung up as charity in the masjid?", "A new woollen cloak", "A jar of fresh honey", "A bag of gold coins"] },
  "What did he ﷺ wish the giver had done?": { answer: "Given something better", harder: ["Nasa'i 2493: with a stick in his hand, what did he ﷺ say about that charity?", "Given it next year", "Hung it up higher", "Given it at night"] },
  "When we give in charity, we should give what is good.": { answer: "True", harder: "Nasa'i 2493 teaches giving something good in charity." },
  // Jami at-Tirmidhi 2919.
  "Reciting the Quran aloud is like giving charity how?": { answer: "Openly", harder: ["Tirmidhi 2919, from Uqbah ibn Amir: reciting the Quran aloud is like giving charity how?", "Late at night", "By mistake", "Only once"] },
  "Reciting the Quran quietly is like what?": { answer: "Charity in secret", harder: ["Tirmidhi 2919: and the one who recites the Quran quietly is like what?", "Charity taken back", "Charity never given", "Charity given late"] },
  "Both reciting aloud and reciting quietly are good.": { answer: "True", harder: "Tirmidhi 2919 likens both aloud and quiet reciting to charity." },
  // Sunan Ibn Majah 2418.
  "Giving more time to one in difficulty is charity how often?": { answer: "For each day", harder: ["Ibn Majah 2418, from Buraidah: whoever gives a debtor in hardship more time has charity how often?", "Once only", "Once a year", "Only on Fridays"] },
  "After the debt is due, each day's charity is equal to what?": { answer: "The amount of the loan", harder: ["Ibn Majah 2418: after the debt falls due, each day's charity is equal to what?", "Half a date", "One small coin", "A cup of water"] },
  "Being patient with someone who owes you is a kind of charity.": { answer: "True", harder: "Ibn Majah 2418 counts giving a debtor more time as charity." },
  // Jami at-Tirmidhi 1625.
  "How many times over is it written, he ﷺ said?": { answer: "Seven hundred", harder: ["Tirmidhi 1625, from Khuraim ibn Fatik: whoever spends in Allah's cause, it is written for him how many times over?", "Seventy", "Two", "Five"] },
  "What must the spending be for, to be written seven hundred times?": { answer: "The cause of Allah", harder: ["Tirmidhi 1625: spending is written seven hundred times over when it is for what?", "Showing off", "Games and fun", "Things that harm"] },
  "Allah can give back far more than what we give for Him.": { answer: "True", harder: "Tirmidhi 1625 says spending in Allah's cause is written seven hundred times over." },
  // Sunan Ibn Majah 1344.
  "He meant to pray at night but slept till morning. What is written for him?": { answer: "What he meant to do", harder: ["Ibn Majah 1344, from Abu ad-Darda: he went to bed meaning to pray at night, but slept till morning. What is written?", "Nothing at all", "A bad deed", "Only half a prayer"] },
  "What does his sleep become?": { answer: "A charity from his Lord", harder: ["Ibn Majah 1344: for the one who meant to pray but slept, what does his sleep become?", "A wasted night", "A heavy debt", "A sin"] },
  "A good intention can be rewarded even when sleep wins.": { answer: "True", harder: "In Ibn Majah 1344 a man who meant to pray at night but slept has his intention written for him." },
  // Mishkat al-Masabih 1925.
  "What will shade a believer on the Day of Resurrection?": { answer: "The charity he gave", harder: ["Mishkat 1925: on the Day of Resurrection, the believer's shade will be what?", "The clothes he wore", "The tent he pitched", "The house he built"] },
  "What does the word sadaqa mean?": { answer: "Charity given for Allah", harder: ["In Mishkat 1925, what does the word sadaqa mean?", "Prayer said at night", "Fasting kept in Ramadan", "Travel made to Makkah"] },
  "Giving charity now can shade us on the Last Day.": { answer: "True", harder: "Mishkat 1925 says the believer will be shaded by his charity on the Day of Resurrection." },
  // Jami at-Tirmidhi 1572.
  "Which of these is one of the three to be free of?": { answer: "Debt", harder: ["Tirmidhi 1572, from Thawban: whoever dies free of three enters Paradise: pride, ghulul, and what?", "Children", "Journeys", "Wealth"] },
  "Which word means pride?": { answer: "Kibr", harder: ["Tirmidhi 1572: of the three things to be free of, which word means pride?", "Riba", "Ghulul", "Sabr"] },
  "Ghulul means taking from the spoils of war before they are shared.": { answer: "True", harder: "In Tirmidhi 1572 ghulul means taking from the spoils of war before they are shared." },
  // Jami at-Tirmidhi 1712.
  "What did the man ask about being killed in Allah's cause?": { answer: "If his sins would be forgiven", harder: ["Tirmidhi 1712, from Abu Qatadah: a man asked about being killed in Allah's cause, patient and not fleeing. What did he ask?", "If his wealth would be shared", "If his house would be kept", "If his horse would be saved"] },
  "Who told him ﷺ about the debt?": { answer: "Jibril", harder: ["Tirmidhi 1712: 'except the debt'. Who told him ﷺ that?", "Uthman", "Abu Bakr", "Umar"] },
  "Even a martyr must still have his debt paid.": { answer: "True", harder: "In Tirmidhi 1712 even one killed in Allah's cause is not forgiven a debt." },
  // Jami at-Tirmidhi 1265.
  "When did he ﷺ say the debt is to be repaid?": { answer: "In the Farewell Hajj khutbah", harder: ["Tirmidhi 1265, from Abu Umamah: when did he ﷺ say 'the debt is to be repaid'?", "In a rain prayer", "In a Friday khutbah", "In an Eid khutbah"] },
  "What must be done with something borrowed?": { answer: "Give it back", harder: ["Tirmidhi 1265: 'The borrowed thing is to be' what?", "Keep it forever", "Sell it at once", "Hide it at home"] },
  "The one who guarantees a debt is responsible for it.": { answer: "True", harder: "Tirmidhi 1265 says the guarantor is responsible." },
  // Sunan Ibn Majah 2421.
  "How should you ask for what someone owes you?": { answer: "In a decent manner", harder: ["Ibn Majah 2421, from Ibn Umar and Aishah: whoever asks for his right should ask how?", "In a rough manner", "In a mocking manner", "In a loud manner"] },
  "You may ask for a right that is yours.": { answer: "True", harder: "Ibn Majah 2421 speaks of one who asks for his right, and allows it." },
  "Asking for your rights must always be harsh.": { answer: "False", harder: "Ibn Majah 2421 says that asking for your right must be harsh." },
  // Sunan Ibn Majah 2426.
  "Whom did he ﷺ ask to lend him dates?": { answer: "Khawlah bint Qais", harder: ["Ibn Majah 2426, from Abu Sa'eed: to repay a Bedouin, from whom did he ﷺ borrow dates?", "Asma bint Abi Bakr", "Umm Sulaim bint Milhan", "Ar-Rubayyi bint Muawwidh"] },
  "What did the Bedouin say when the companions scolded him?": { answer: "I only ask for my right", harder: ["Ibn Majah 2426: the Companions scolded the harsh Bedouin. What did he answer?", "I came to learn the Quran", "I will leave it for now", "I forgive the whole debt"] },
  "He ﷺ paid the Bedouin back and also fed him.": { answer: "True", harder: "In Ibn Majah 2426 he ﷺ paid the Bedouin in full and fed him too." },
  // Sahih al-Bukhari 6763.
  "Besides a debt, what else did he ﷺ say he would take care of?": { answer: "Dependants left behind", harder: ["Bukhari 6763: whoever leaves a debt or what else, he ﷺ said, 'we will take care of it'?", "Shops left behind", "Houses left behind", "Camels left behind"] },
  "Property a Muslim leaves goes to his heirs.": { answer: "True", harder: "Bukhari 6763 says property a Muslim leaves goes to his heirs." },
  "Who narrated the saying about heirs and debts?": { answer: "Abu Hurairah", harder: ["Bukhari 6763: 'Property left goes to the heirs; debts we take on.' Who narrated it?", "Abu Musa", "Abu Dharr", "Abu Ayyub"] },
};
