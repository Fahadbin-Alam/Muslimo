import { cloud, glow, n, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM } from "./worshipArt";
import { care, jug, lightIn, palms, tent, track } from "./daysArt";
import { drink, greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, bowl, FOLK, glints, linesOn, mat, places, plainLand, SEVEN, SIX, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins } from "./tradeArt";
import { cup } from "./hopeArt";
import { GREY } from "./lovedArt";
import { looking, QUICK } from "./dailyArt";

/**
 * Upright ways: why he sought refuge from debt; visiting the sick: don't worry, it is expiation; the worst are the
 * double faced; two cases to wish to be like; asking forgiveness for a wrong before the Day when there is no money; and
 * rinsing after milk, for it has fat. Only the land, the sky, buildings, things and plants are drawn. No Prophet, no
 * Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a face: where someone was, a ring
 * or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is
 * drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a du'a or a deed is a spark that
 * rises, what is good is a light, glints and a soft golden ring, and what is not to be done a grey dashed ring. No
 * name, word or number is written.
 */

/** The words of two lines. */
const TWO = [
  [0.02, 0.46],
  [0.476, 1]
] as const;

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** Milk in a bowl (shareArt.ts) whose middle is at (x, y). */
const milk = (x: number, y: number) => `<ellipse cx="${x}" cy="${n(y - 1.2)}" rx="2.3" ry="0.5" fill="#FBF7EC"/>`;

/** Half of a line, along `d`: a promise. */
const promiseHalf = (d: string) => `<path d="${d}" stroke="#FFF0C4" stroke-width="0.9" stroke-linecap="round" fill="none"/>`;

/** Aishah's place and voice: a muted violet. */
const AISHAH = "#8B6B9E";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Ibn Abbas's place and voice: a deep green. */
const IBN_ABBAS = "#4E7A6A";
/** Ibn Mas'ud's place and voice: a slate blue. */
const IBN_MASUD = "#5E6E8E";
/** The place and voice of someone who asked: a slate blue. */
const ASKER = "#4E6E7E";
/** The place of one in debt: a dull brown. */
const DEBTOR = "#8A6A4E";
/** The sick Bedouin's place: a dusty brown. */
const SICK = "#7E6A52";
/** The two-sided one, warm to some: a warm orange. */
const WARM_SIDE = "#D9822B";
/** And cool to others: a cool blue. */
const COOL_SIDE = "#3F7FB0";
/** The place and voice of one who wronged another: a muted violet. */
const WRONGDOER = "#6E5A8C";
/** The place of the one wronged: a slate blue. */
const WRONGED = "#4E6E7E";
/** The place of one who wishes: a plain green. */
const WISHER = "#5E8A52";
/** The place of the one given wealth: a warm brown. */
const FIRST = "#9A6A38";
/** The place of the one given wisdom: a deep teal. */
const SECOND = "#3E6B6B";

// Why he feared debt. Aishah said that the Messenger of Allah ﷺ used to supplicate in the prayer and say: O Allah, I
// seek refuge with you from sin and from debt; someone said to him: how often you seek refuge from debt, O Messenger
// of Allah!; he said: when a man is in debt, he speaks and lies, and he promises and breaks it (Sahih al-Bukhari 2397;
// the English page: O Allah, I seek refuge with you from all sins, and from being in debt ... if a person is in debt,
// he tells lies when he speaks, and breaks his promises when he promises). "When he promises" is left out of the lines.
// No one is drawn: the masjid of Madinah, his place before it, a golden ring, and Aishah's place far off. Aishah's
// voice tells of it. His voice, soft and golden, speaks in the prayer, a spark rises, and a soft golden ring of refuge
// comes about his place. The place of someone who asked shows by him, and its voice asks. His voice replies. Far off
// in the town the place of one in debt shows, and the place of the one owed: coins go from the one owed to the one in
// debt. The voice of the one in debt is quick and grey: lies. A pale line of a promise goes from it to the one owed,
// and breaks, its halves going apart and fading; a grey dashed ring comes about the place of the one in debt.
function fearedDebt(): SignArt {
  const aishah: [number, number] = [6, 110];
  const his: [number, number] = [36, 106];
  const asker: [number, number] = [52, 108];
  const debtor: [number, number] = [112, 107];
  const owed: [number, number] = [144, 107];
  const coinsFrom: [number, number] = [140.4, 110.6];
  const coinsTo = 116.6;
  const breaking = (dx: number) =>
    track({
      opacity: [
        [0.886, 0],
        [0.894, 1],
        [0.914, 1],
        [0.94, 0.25]
      ],
      xy: [
        [0.914, 0, 0],
        [0.94, dx, 1]
      ]
    });
  return {
    kind: "feared-debt",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(132, 22) },
      { name: "a cloud", svg: cloud(62, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[24, 117], [80, 118], [150, 116]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(12, 100, 1) },
      ...palms(
        [
          [74, 98, 14],
          [88, 99, 12]
        ],
        "Madinah"
      ),
      { name: "a home of the town", svg: home(112, 99, 14, 11) },
      { name: "another home of the town", svg: home(144, 99, 14, 11) },
      { name: "Aishah's place, far off", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling of it", svg: arcs(n(aishah[0] + 3.2), n(aishah[1] - 2.8), AISHAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "his place in the prayer, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: seeking refuge in the prayer", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.17, 0.176, 0.39, 0.396), loop: speaking },
      spark("his du'a: a spark rising from his place", his[0], n(his[1] - 4.4), 0.18, 0.25),
      { name: "refuge: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.32, 0.332), loop: soft },
      { name: "the place of someone who asked, by him", svg: someone(asker[0], asker[1], 1.5, ASKER), keys: showAt(0.46, 0.472) },
      { name: "the asker's voice: very often you seek refuge from debt", svg: arcsLeft(n(asker[0] - 3.2), n(asker[1] - 2.8), ASKER), keys: showFor(0.48, 0.486, 0.62, 0.626), loop: speaking },
      { name: "his voice, soft and golden: replying", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.65, 0.656, 0.82, 0.826), loop: speaking },
      { name: "the place of one in debt, far off in the town", svg: someone(debtor[0], debtor[1], 1.6, DEBTOR), keys: showAt(0.742, 0.75) },
      { name: "the place of the one owed", svg: someone(owed[0], owed[1], 1.5, FOLK), keys: showAt(0.742, 0.75) },
      {
        name: "in debt: coins going from the one owed to the one in debt",
        svg: coins(coinsFrom[0], coinsFrom[1], 2),
        keys: track({
          opacity: [
            [0.75, 0],
            [0.756, 1]
          ],
          xy: [
            [0.758, 0, 0],
            [0.79, n(coinsTo - coinsFrom[0]), 0]
          ]
        })
      },
      { name: "lies when speaking: the voice of the one in debt, quick and grey", svg: arcsLeft(n(debtor[0] - 3.2), n(debtor[1] - 2.8), GREY), keys: showFor(0.796, 0.802, 0.9, 0.906), loop: QUICK },
      { name: "a promise: a pale line toward the one owed, its first half, then breaking", svg: promiseHalf(`M${n(debtor[0] + 3.4)} ${n(debtor[1] - 1.4)} Q122 102.6 128 102.8`), keys: breaking(-3) },
      { name: "a promise: a pale line toward the one owed, its second half, then breaking", svg: promiseHalf(`M128 102.8 Q134 102.6 ${n(owed[0] - 3.4)} ${n(owed[1] - 1.4)}`), keys: breaking(3) },
      { name: "promises broken: a grey dashed ring about the place of the one in debt", svg: greyRing(debtor[0], n(debtor[1] + 0.6), 4.2, 2.6), keys: showAt(0.944, 0.956) }
    ],
    words: linesOn(SEVEN, [
      "Aishah: he used to invoke Allah in the",
      "Prayer saying: O Allah, I seek refuge",
      "With you from all sins, and from being in",
      "Debt. Someone said: very often you seek",
      "Refuge from being in debt. He replied:",
      "If a person is in debt, he tells lies",
      "When he speaks, and breaks his promises."
    ])
  };
}

// Visiting the sick. Ibn Abbas said that the Prophet ﷺ went in to a Bedouin to visit him, and whenever the Prophet ﷺ
// went in to visit a sick one he would say: no harm, a purification, if Allah wills (Sahih al-Bukhari 5656; the English
// page: the Prophet went to visit a sick bedouin; whenever the Prophet went to a patient, he used to say to him: don't
// worry, if Allah will, it will be expiation). "For your sins", a translator's note, the Bedouin's reply and what
// followed are left out. No one is drawn: his home in Madinah, a palm, and far off the Bedouin's tent with his place
// before it, a pale glow on it: the sickness. Ibn Abbas's place is far off, and his voice tells of it. A pale dashed
// way shows, and his place, a golden ring, goes along it to the tent and sits by the Bedouin; a soft golden ring of
// care comes about them both. His voice, soft and golden, speaks: don't worry. The pale glow softens, then fades, and
// a soft light comes on the Bedouin's place: expiation.
function visitTheSick(): SignArt {
  const ibnAbbas: [number, number] = [8, 110];
  const start: [number, number] = [30, 107];
  const near: [number, number] = [102, 108.4];
  const by: [number, number] = [110, 108.4];
  const sick: [number, number] = [124, 108.6];
  return {
    kind: "visit-the-sick",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(66, 20) },
      { name: "a cloud", svg: cloud(110, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E6D2A4", [[14, 117], [70, 118], [148, 117]]) },
      { name: "his home in Madinah", svg: home(30, 100, 18, 13) },
      ...palms([[52, 99, 13]], "Madinah"),
      { name: "the Bedouin's tent", svg: tent(124, 104, 26, 16, "#E9DCC0") },
      ...palms([[150, 100, 11]], "the desert"),
      { name: "the Bedouin's place, sick, before his tent", svg: someone(sick[0], sick[1], 1.6, SICK) },
      {
        name: "the sickness: a pale glow on the Bedouin's place, softening, then fading",
        svg: glow(sick[0], n(sick[1] - 0.6), 8, "#F29090", 0.2),
        keys: track({
          opacity: [
            [0.6, 1],
            [0.64, 0.55],
            [0.8, 0.55],
            [0.86, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      },
      { name: "Ibn Abbas's place, far off", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 3.2), n(ibnAbbas[1] - 2.8), IBN_ABBAS), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the way to the tent: a pale dashed way", svg: way(`M${n(start[0] + 3)} ${n(start[1] + 1.2)} Q68 113.6 ${n(near[0] - 3)} ${n(near[1] + 1)}`, "#FFF0C4", 0.9), keys: showAt(0.1, 0.112) },
      {
        name: "his place, a golden ring: going to visit the sick Bedouin, and sitting by him",
        svg: ring(start[0], start[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.12, 0, 0],
            [0.2, n(near[0] - start[0]), n(near[1] - start[1])],
            [0.28, n(near[0] - start[0]), n(near[1] - start[1])],
            [0.32, n(by[0] - start[0]), n(by[1] - start[1])]
          ]
        })
      },
      { name: "visiting the sick: a soft golden ring of care about them both", svg: care(117, 109, 11.4, 3.6, SOFT_GOLD), keys: showAt(0.36, 0.372), loop: soft },
      { name: "his voice, soft and golden: don't worry", svg: arcs(n(by[0] + 3.2), n(by[1] - 2.8), SOFT_GOLD), keys: showFor(0.52, 0.526, 0.94, 0.946), loop: speaking },
      {
        name: "expiation: a soft light on the Bedouin's place",
        svg: glow(sick[0], n(sick[1] - 0.6), 9, "#FFF3C8", 0.26),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.88, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1400, low: 0.7 }
      }
    ],
    words: linesOn(FOUR, ["Ibn Abbas: he went to visit a sick", "Bedouin. Whenever he went to a patient,", "He used to say: don't worry,", "If Allah will, it will be expiation."])
  };
}

// The double faced. Abu Hurairah said that the Prophet ﷺ said: you will find among the worst of people on the Day of
// Resurrection, with Allah, the one with two faces, who comes to these with one face and to those with another (Sahih
// al-Bukhari 6058; the English page: the worst people in the Sight of Allah on the Day of Resurrection will be the
// double faced people who appear to some people with one face and to other people with another face). No one is drawn,
// and no face: the homes of a town on either side, the places of some by one and of others by the other, and Abu
// Hurairah's place far off. Abu Hurairah's voice tells of it. A grey place shows between them, and a grey dashed ring
// comes about it: the worst. It goes to the first, turns warm, and its voice is warm with them; then it turns grey
// again, goes to the others, turns cool, and its voice is cool with them.
function twoFaced(): SignArt {
  const hurairah: [number, number] = [152, 112];
  const these: [number, number][] = [
    [8, 108],
    [15, 109.4],
    [22, 108]
  ];
  const those: [number, number][] = [
    [118, 108],
    [125, 109.4],
    [132, 108]
  ];
  const mid: [number, number] = [72, 108];
  const toThese = -36;
  const toThose = 30;
  const going: [number, number, number][] = [
    [0.5, 0, 0],
    [0.56, toThese, 0],
    [0.7, toThese, 0],
    [0.756, toThose, 0]
  ];
  return {
    kind: "two-faced",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(80, 20) },
      { name: "a cloud", svg: cloud(40, 28, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[40, 117], [96, 118], [142, 118]]) },
      { name: "a home of the town, on one side", svg: home(17, 100, 20, 13) },
      { name: "a home of the town, on the other side", svg: home(125, 100, 20, 13) },
      ...palms(
        [
          [52, 99, 12],
          [96, 99, 13]
        ],
        "the town"
      ),
      { name: "the places of some, by one home", svg: places(these, 1.5, FOLK) },
      { name: "the places of others, by the other home", svg: places(those, 1.5, FOLK) },
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      {
        name: "the place of the two-sided one, grey: showing, going to some, then to the others",
        svg: someone(mid[0], mid[1], 1.8, GREY),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.192, 1],
            [0.56, 1],
            [0.57, 0],
            [0.69, 0],
            [0.7, 1],
            [0.82, 1],
            [0.83, 0]
          ],
          xy: going
        })
      },
      {
        name: "the worst: a grey dashed ring about the two-sided one, going with it",
        svg: greyRing(mid[0], n(mid[1] + 0.6), 4, 2.4),
        keys: track({
          opacity: [
            [0.4, 0],
            [0.412, 1]
          ],
          xy: going
        })
      },
      {
        name: "one way with some: the two-sided one turning warm by them",
        svg: someone(mid[0], mid[1], 1.8, WARM_SIDE),
        keys: track({
          opacity: [
            [0.56, 0],
            [0.57, 1],
            [0.69, 1],
            [0.7, 0]
          ],
          xy: going
        })
      },
      { name: "its voice with them, warm", svg: arcsLeft(n(mid[0] + toThese - 4.6), n(mid[1] - 2.8), WARM_SIDE), keys: showFor(0.58, 0.586, 0.68, 0.686), loop: speaking },
      {
        name: "another way with others: the two-sided one turning cool by them",
        svg: someone(mid[0], mid[1], 1.8, COOL_SIDE),
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1]
          ],
          xy: going
        })
      },
      { name: "its voice with them, cool", svg: arcs(n(mid[0] + toThose + 4.6), n(mid[1] - 2.8), COOL_SIDE), keys: showFor(0.84, 0.846, 0.93, 0.936), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abu Hurairah: he said: the worst people",
      "In the Sight of Allah on the Day of",
      "Resurrection will be the double faced",
      "People who appear to some people with",
      "One face and to other people with",
      "Another face."
    ])
  };
}

// Two cases. Abdullah ibn Mas'ud said that the Prophet ﷺ said: there is no envy except in two: a man whom Allah has
// given wealth and he is set upon spending it in what is right, and a man whom Allah has given wisdom and he judges by
// it and teaches it (Sahih al-Bukhari 73; the English page: do not wish to be like anyone except in two cases: a person
// whom Allah has given wealth and he spends it righteously; the one whom Allah has given wisdom and he acts according to
// it and teaches it to others). "The first is", "the second is", "the Holy Qur'an" and the reference are the
// translator's and are left out. No one is drawn, and nothing for the giving: the place of one who wishes, with homes on
// either side, and Ibn Mas'ud's place far off. Ibn Mas'ud's voice tells of it. Faint dotted lines of looking go from the
// one who wishes to two places, one at each home. Coins show by the first: wealth; coins go from it to someone in
// need, and a spark rises: spending it in the right. A soft light comes on the second: wisdom; a spark rises: acting by
// it; its voice, soft and golden, speaks to the places of others by it, and small lights come on them: teaching it.
// Soft golden rings come about the two.
function twoCases(): SignArt {
  const ibnMasud: [number, number] = [62, 116];
  const wisher: [number, number] = [80, 106];
  const first: [number, number] = [40, 106];
  const needy: [number, number] = [14, 109];
  const second: [number, number] = [120, 106];
  const learners: [number, number][] = [
    [136, 110.4],
    [143, 106.6],
    [149, 111]
  ];
  const given: [number, number] = [44.6, 109.8];
  return {
    kind: "two-cases",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(80, 20) },
      { name: "a cloud", svg: cloud(124, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 117], [96, 118], [128, 118]]) },
      { name: "a home of the town, on one side", svg: home(40, 99, 18, 12) },
      { name: "a home of the town, on the other side", svg: home(120, 99, 18, 12) },
      ...palms([[80, 97, 12]], "the town"),
      { name: "Ibn Mas'ud's place, far off", svg: someone(ibnMasud[0], ibnMasud[1], 1.5, IBN_MASUD) },
      { name: "Ibn Mas'ud's voice: telling what he said", svg: arcs(n(ibnMasud[0] + 3.2), n(ibnMasud[1] - 2.8), IBN_MASUD), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the place of one who wishes", svg: someone(wisher[0], wisher[1], 1.6, WISHER) },
      { name: "the place of one given wealth, by one home", svg: someone(first[0], first[1], 1.6, FIRST) },
      { name: "the place of one given wisdom, by the other home", svg: someone(second[0], second[1], 1.6, SECOND) },
      { name: "the place of someone in need", svg: someone(needy[0], needy[1], 1.5, FOLK) },
      { name: "the places of others, by the one given wisdom", svg: places(learners, 1.4, FOLK) },
      {
        name: "two cases: faint dotted lines of looking from the one who wishes to the two",
        svg:
          looking(`M${n(wisher[0] - 2)} ${n(wisher[1] - 1.4)} Q60 100.6 ${n(first[0] + 2.4)} ${n(first[1] - 1)}`) +
          looking(`M${n(wisher[0] + 2)} ${n(wisher[1] - 1.4)} Q100 100.6 ${n(second[0] - 2.4)} ${n(second[1] - 1)}`),
        keys: showAt(0.2, 0.212)
      },
      { name: "wealth: coins by the one given it", svg: coins(47, 108.6, 3) + coins(51.6, 108.6, 2), keys: showAt(0.34, 0.352) },
      {
        name: "spending it: coins going from the one given wealth to someone in need",
        svg: coins(given[0], given[1], 2),
        keys: track({
          opacity: [
            [0.498, 0],
            [0.504, 1]
          ],
          xy: [
            [0.506, 0, 0],
            [0.56, n(needy[0] + 4.4 - given[0]), n(needy[1] + 1.6 - given[1])]
          ]
        })
      },
      spark("in the right: a spark rising from the one given wealth", first[0], n(first[1] - 4.4), 0.56, 0.6),
      { name: "wisdom: a soft light on the one given it", svg: lightIn(second[0], n(second[1] - 0.4), 4.4, WARM), keys: showAt(0.66, 0.672), loop: soft },
      spark("acting by it: a spark rising from the one given wisdom", second[0], n(second[1] - 5), 0.7, 0.756),
      { name: "teaching it: its voice, soft and golden, to the others", svg: arcs(n(second[0] + 3.2), n(second[1] - 2.8), SOFT_GOLD), keys: showFor(0.82, 0.826, 0.94, 0.946), loop: speaking },
      { name: "taught: small lights on the places of the others", svg: learners.map(([x, y]) => lightIn(x, n(y - 0.4), 2.4, WARM)).join(""), keys: showAt(0.88, 0.892), loop: soft },
      {
        name: "the two to wish to be like: soft golden rings about them",
        svg: care(first[0], n(first[1] + 0.6), 4.4, 2.6, SOFT_GOLD) + care(second[0], n(second[1] + 0.6), 4.4, 2.6, SOFT_GOLD),
        keys: showAt(0.92, 0.932),
        loop: soft
      }
    ],
    words: linesOn(SIX, [
      "Ibn Mas'ud: he said: do not wish to be",
      "Like anyone except in two cases:",
      "A person whom Allah has given wealth",
      "And he spends it righteously; the one",
      "Whom Allah has given wisdom and he acts",
      "According to it and teaches it to others."
    ])
  };
}

// Before that Day. Abu Hurairah said that the Messenger of Allah ﷺ said: whoever has wronged someone in his honour or
// anything, let him seek his pardon for it today, before there will be no dinar and no dirham (Sahih al-Bukhari 2449;
// the English page: whoever has oppressed another person concerning his reputation or anything else, he should beg him
// to forgive him before the Day of Resurrection when there will be no money). The translator's note and what is taken
// and loaded on that Day are left out. No one is drawn: two homes, the place of one who wronged by one with coins by
// it, the place of the one wronged by the other, and Abu Hurairah's place far off. Abu Hurairah's voice tells of it.
// The voice of the one who wronged is quick and grey, a grey dashed way goes from it to the one wronged, and the place
// of the one wronged dims. Then the one who wronged goes to it, and its voice asks. The coins by its home fade away:
// no money.
function beforeThatDay(): SignArt {
  const hurairah: [number, number] = [152, 112];
  const wrongdoer: [number, number] = [40, 108];
  const wronged: [number, number] = [118, 108];
  const to = 64;
  return {
    kind: "before-that-day",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(78, 22) },
      { name: "a cloud", svg: cloud(120, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [136, 117]]) },
      { name: "the home of one who wronged", svg: home(30, 100, 18, 13) },
      { name: "the home of the one wronged", svg: home(128, 100, 18, 13) },
      ...palms([[78, 99, 13]], "the town"),
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      {
        name: "money: coins by the home of the one who wronged, fading away",
        svg: coins(14, 109, 3) + coins(18.6, 109, 2),
        keys: track({
          opacity: [
            [0.86, 1],
            [0.92, 0]
          ]
        })
      },
      {
        name: "the place of the one wronged, dimming",
        svg: someone(wronged[0], wronged[1], 1.6, WRONGED),
        keys: track({
          opacity: [
            [0.28, 1],
            [0.32, 0.45]
          ]
        })
      },
      { name: "the wrong: the voice of the one who wronged, quick and grey", svg: arcs(n(wrongdoer[0] + 3.2), n(wrongdoer[1] - 2.8), GREY), keys: showFor(0.22, 0.226, 0.34, 0.346), loop: QUICK },
      { name: "the wrong: a grey dashed way to the one wronged", svg: way(`M${n(wrongdoer[0] + 3.6)} ${n(wrongdoer[1] + 1.6)} Q79 114.4 ${n(wronged[0] - 3.6)} ${n(wronged[1] + 1.6)}`, GREY, 0.9), keys: showAt(0.24, 0.252) },
      {
        name: "the place of the one who wronged: going to the one wronged",
        svg: someone(wrongdoer[0], wrongdoer[1], 1.6, WRONGDOER),
        keys: track({
          xy: [
            [0.44, 0, 0],
            [0.54, to, 0]
          ]
        })
      },
      { name: "its voice, asking to be forgiven", svg: arcs(n(wrongdoer[0] + to + 3.2), n(wrongdoer[1] - 2.8), WRONGDOER), keys: showFor(0.62, 0.626, 0.74, 0.746), loop: speaking }
    ],
    words: linesOn(FIVE, [
      "Abu Hurairah: he said: whoever has",
      "Oppressed another person concerning his",
      "Reputation or anything else, he should",
      "Beg him to forgive him before the Day of",
      "Resurrection when there will be no money."
    ])
  };
}

// Rinsing after milk. Ibn Abbas said that the Messenger of Allah ﷺ drank milk, then rinsed his mouth and said: it has
// fat (Sahih al-Bukhari 211). No one is drawn, and no mouth: his home, his place before it on a mat, a golden ring, a
// bowl of milk, a jug and a cup of water by him, and Ibn Abbas's place far off. Ibn Abbas's voice tells of it. The bowl
// goes to his place, its milk lessens, and it goes back; the cup of water goes to his place, its water is used, and it
// goes back. His voice, soft and golden, speaks, and glints of fat show on the milk.
function rinseAfterMilk(): SignArt {
  const ibnAbbas: [number, number] = [18, 110];
  const his: [number, number] = [80, 106.6];
  const bowlAt: [number, number] = [64, 109];
  const cupAt: [number, number] = [96, 111];
  const bowlGoes = track({
    xy: [
      [0.14, 0, 0],
      [0.19, 8, -4],
      [0.27, 8, -4],
      [0.32, 0, 0]
    ]
  });
  const cupGoes: [number, number, number][] = [
    [0.33, 0, 0],
    [0.38, -10, -5],
    [0.48, -10, -5],
    [0.53, 0, 0]
  ];
  return {
    kind: "rinse-after-milk",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 22) },
      { name: "a cloud", svg: cloud(118, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 117], [60, 118], [150, 116]]) },
      { name: "his home", svg: home(92, 100, 24, 14) },
      ...palms(
        [
          [46, 99, 13],
          [132, 99, 14]
        ],
        "Madinah"
      ),
      { name: "a mat before his home", svg: mat(his[0], n(his[1] + 1.8), 12) },
      { name: "his place, a golden ring, on the mat", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Ibn Abbas's place, far off", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcs(n(ibnAbbas[0] + 3.2), n(ibnAbbas[1] - 2.8), IBN_ABBAS), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "a jug of water by him", svg: big(jug(103, 111), 103, 111, 1.3) },
      { name: "the bowl of milk: going to his place, and back", svg: big(bowl(bowlAt[0], bowlAt[1]), bowlAt[0], bowlAt[1], 1.6), keys: bowlGoes },
      {
        name: "he drank milk: the milk in the bowl, less",
        svg: big(milk(bowlAt[0], bowlAt[1]), bowlAt[0], bowlAt[1], 1.6),
        keys: track({
          opacity: [
            [0.2, 1],
            [0.26, 0.6]
          ],
          xy: [
            [0.14, 0, 0],
            [0.19, 8, -4],
            [0.27, 8, -4],
            [0.32, 0, 0]
          ]
        })
      },
      { name: "the cup of water: going to his place, and back", svg: big(cup(cupAt[0], cupAt[1]), cupAt[0], cupAt[1], 1.5), keys: track({ xy: cupGoes }) },
      {
        name: "rinsing: the water in the cup, used",
        svg: big(drink(cupAt[0], cupAt[1]), cupAt[0], cupAt[1], 1.5),
        keys: track({
          opacity: [
            [0.39, 1],
            [0.42, 0]
          ],
          xy: cupGoes
        })
      },
      { name: "his voice, soft and golden: it has fat", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.6, 0.606, 0.92, 0.926), loop: speaking },
      {
        name: "fat: glints on the milk",
        svg: big(
          glints(
            [
              [62.8, 107.7],
              [65.3, 108],
              [64.1, 107.4]
            ],
            0.6,
            "#F7E9A6"
          ),
          bowlAt[0],
          bowlAt[1],
          1.6
        ),
        keys: showAt(0.72, 0.732),
        loop: twinkle(1300)
      }
    ],
    words: linesOn(TWO, ["Ibn Abbas: he drank milk, rinsed his", "Mouth and said: it has fat."])
  };
}

export const UPRIGHT_ART = {
  "feared-debt": fearedDebt,
  "visit-the-sick": visitTheSick,
  "two-faced": twoFaced,
  "two-cases": twoCases,
  "before-that-day": beforeThatDay,
  "rinse-after-milk": rinseAfterMilk
} as const;
