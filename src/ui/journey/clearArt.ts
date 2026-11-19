import { cloud, n, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun } from "./worshipArt";
import { care, lightIn, palms, track } from "./daysArt";
import { date, greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { FOLK, glints, linesOn, plainLand, SIX, twinkle } from "./shareArt";
import { farHills, FIVE } from "./wideArt";
import { coins, stall } from "./tradeArt";
import { GREY } from "./lovedArt";

/**
 * Clear in dealings: a time when people will not care whether their money is lawful; a wealthy one who puts off paying
 * what he owes; the most quarrelsome, most hated in the sight of Allah; never saying no to one who asked; the one who
 * leads the prayer, whose mistake is his alone; and the praise of people for a good deed, as glad tidings now. Only the
 * land, the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even
 * a hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book or page is drawn, and
 * nothing comes down from the sky: a deed is a spark that rises, what is good is a light, glints and a soft golden
 * ring, and what is not to be done a grey dashed ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

/** Coins gained unlawfully: grey, `count` of them stacked, the lowest's middle at (x, y). */
const greyCoins = (x: number, y: number, count: number) => coins(x, y, count, "#B9B3A9", "#8F8A82");

/** A folded cloth, its middle at (x, y). */
const cloth = (x: number, y: number) =>
  `<rect x="${n(x - 2.2)}" y="${n(y - 1)}" width="4.4" height="2" rx="0.4" fill="#D9C7A0" stroke="#B49B6E" stroke-width="0.3"/><path d="M${n(x - 2.2)} ${y} L${n(x + 2.2)} ${y}" stroke="#B49B6E" stroke-width="0.25"/>`;

/** A quick grey voice: arcs that flicker fast. */
const QUICK = { move: "twinkle", ms: 420, low: 0.35 } as const;

/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** The place of one who does not care how it gains: a slate blue. */
const CARELESS = "#4E6E7E";
/** The place of one who has the means: a muted violet. */
const WEALTHY = "#6E5A8C";
/** The place of one owed: a plain green. */
const OWED = "#5E8A52";
/** Aishah's place and voice: a muted violet. */
const AISHAH = "#8B6B9E";
/** The place of one who argues on and on: a deep red-brown. */
const ARGUER = "#9C4F36";
/** The place of the other one: a slate blue. */
const OTHER = "#5A6E8C";
/** Jabir's place and voice: a slate blue. */
const JABIR = "#5A6E8C";
/** The places of those who came asking. */
const ASKERS = ["#9C4F36", "#5E8A52", "#8B6B9E"] as const;
/** The place of the one leading the prayer: a deep teal. */
const FRONT = "#3E6B6B";
/** Abu Dharr's place and voice: a plain green. */
const DHARR = "#5E8A52";
/** The place of one doing good: a slate blue. */
const DOER = "#4E6E7E";
/** A place in need: a dull brown. */
const NEED = "#8A6A5A";

// Lawful or unlawful. Abu Hurairah said that the Prophet ﷺ said: a time will come upon people when a man will not care
// what he takes, whether from the lawful or from the unlawful (Sahih al-Bukhari 2059; the English page: a time will
// come when one will not care how one gains one's money, legally or illegally). No one is drawn: a market with a stall
// and coins on its counter, the seller's place behind it, and Abu Hurairah's place far off. Abu Hurairah's voice tells
// of it, and the sun goes on: a time to come. A place shows in the market. A soft golden way shows from the stall to
// it, and the coins on the counter come along it: gained by trade. Grey coins show far off, a grey dashed way shows from
// them to the place, and they come along it too: gained unlawfully. The place's voice is quick: it does not care. A
// soft golden ring comes about the coins from the stall, a grey dashed ring about the grey coins, and a grey dashed
// ring about the place: it took both, not caring which.
function halalOrHaram(): SignArt {
  const hurairah: [number, number] = [146, 108];
  const one: [number, number] = [80, 108];
  const counter: [number, number] = [110, 100.6];
  const lawfulEnd: [number, number] = [90, 109.4];
  const far: [number, number] = [28, 103.4];
  const greyEnd: [number, number] = [70, 109.4];
  return {
    kind: "halal-or-haram",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun, going on: a time to come",
        svg: sun(24, 22),
        keys: track({
          xy: [
            [0.12, 0, 0],
            [0.28, 48, -8]
          ]
        })
      },
      { name: "a cloud", svg: cloud(100, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a home of the town", svg: home(54, 99, 18, 13) },
      ...palms([[8, 96, 11]], "the town"),
      { name: "a market stall", svg: stall(116, 22, "#B5543C", 88, 101) },
      { name: "the seller's place, behind the counter", svg: someone(116, 97.6, 1.4, FOLK) },
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the place in the market, one who gains", svg: someone(one[0], one[1], 1.6, CARELESS), keys: showAt(0.34, 0.352) },
      { name: "by trade: a soft golden way from the stall to its place", svg: way(`M105 104.6 Q98 109.4 ${n(lawfulEnd[0] + 2.4)} ${n(lawfulEnd[1] + 0.4)}`, SOFT_GOLD, 1), keys: showAt(0.37, 0.382) },
      {
        name: "coins from the stall: going along the soft golden way to it",
        svg: coins(counter[0], counter[1], 2),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.46, n(lawfulEnd[0] - counter[0]), n(lawfulEnd[1] - counter[1])]
          ]
        })
      },
      {
        name: "grey coins far off, gained unlawfully: showing, then going along the grey dashed way to it",
        svg: greyCoins(far[0], far[1], 2),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.482, 1]
          ],
          xy: [
            [0.51, 0, 0],
            [0.57, n(greyEnd[0] - far[0]), n(greyEnd[1] - far[1])]
          ]
        })
      },
      { name: "unlawfully: a grey dashed way from far off to its place", svg: way(`M${n(far[0] + 2.4)} ${n(far[1] + 1)} Q48 111.6 ${n(greyEnd[0] - 2.4)} ${n(greyEnd[1] + 0.4)}`, GREY, 1), keys: showAt(0.49, 0.502) },
      { name: "not caring: its voice, quick", svg: arcs(n(one[0] + 3.2), n(one[1] - 2.8), CARELESS), keys: showFor(0.574, 0.58, 0.61, 0.616), loop: QUICK },
      { name: "legally: a soft golden ring about the coins from the stall", svg: care(lawfulEnd[0], n(lawfulEnd[1] - 0.8), 3.4, 2.2, SOFT_GOLD), keys: showAt(0.7, 0.712), loop: soft },
      { name: "illegally: a grey dashed ring about the grey coins", svg: greyRing(greyEnd[0], n(greyEnd[1] - 0.8), 3.4, 2.2), keys: showAt(0.78, 0.792) },
      { name: "not caring which: a grey dashed ring about its place", svg: greyRing(one[0], n(one[1] - 1.4), 3.4, 3.2), keys: showAt(0.86, 0.872) }
    ],
    words: linesOn(THREE, ["Abu Hurairah: he said: a time will come", "When one will not care how one gains", "One's money, legally or illegally."])
  };
}

// The delay of the wealthy. Abu Hurairah said: the Messenger of Allah ﷺ said: the putting off of the one who has the
// means is wrongdoing (Sahih al-Bukhari 2400; the English page: procrastination in repaying debts by a wealthy person is
// injustice). No one is drawn: a large home with many coins by it and the wealthy one's place at its door, and Abu
// Hurairah's place far off. Abu Hurairah's voice tells of it. A pale dashed way shows, and the place of the one owed
// comes along it to the door; the sun goes on. Glints come about the coins: the means to pay. The voice of the one owed
// asks; the wealthy one's voice answers, quick and grey: not now; and the sun goes on again. Then a grey dashed ring
// comes about the wealthy one's place: wrongdoing; a grey dashed ring about the coins, kept back; and a grey dashed way
// from the coins to the one owed: not paid.
function delayByTheWealthy(): SignArt {
  const hurairah: [number, number] = [146, 108];
  const wealthy: [number, number] = [104, 106];
  const pile: [number, number] = [126, 108];
  const start: [number, number] = [18, 110];
  const atDoor: [number, number] = [88, 108];
  return {
    kind: "delay-by-the-wealthy",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun, going on: the days passing",
        svg: sun(22, 24),
        keys: track({
          xy: [
            [0.22, 0, 0],
            [0.28, 34, -8],
            [0.54, 34, -8],
            [0.6, 80, -6]
          ]
        })
      },
      { name: "a cloud", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a large home, the wealthy one's", svg: home(116, 101, 26, 17) },
      ...palms([[50, 95, 12]], "the town"),
      { name: "the wealthy one's coins, many, by its home", svg: coins(pile[0], pile[1], 5) + coins(n(pile[0] + 4.6), pile[1], 4) },
      { name: "the wealthy one's place, at its door", svg: someone(wealthy[0], wealthy[1], 1.6, WEALTHY) },
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the way to the door: a pale dashed way", svg: way(`M${n(start[0] + 2.4)} ${n(start[1] + 0.6)} Q50 115.6 ${n(atDoor[0] - 2.6)} ${n(atDoor[1] + 1)}`, "#FFF0C4", 0.9), keys: showAt(0.1, 0.112) },
      {
        name: "the place of the one owed: coming to the door, then waiting",
        svg: someone(start[0], start[1], 1.5, OWED),
        keys: track({
          xy: [
            [0.12, 0, 0],
            [0.2, atDoor[0] - start[0], atDoor[1] - start[1]]
          ]
        })
      },
      {
        name: "the means to pay: glints about the coins",
        svg: glints(
          [
            [n(pile[0] - 3.6), n(pile[1] - 7.4)],
            [n(pile[0] + 8.4), n(pile[1] - 6.6)]
          ],
          0.7
        ),
        keys: showAt(0.34, 0.352),
        loop: twinkle()
      },
      { name: "the voice of the one owed: asking for it", svg: arcs(n(atDoor[0] + 3), n(atDoor[1] - 2.8), OWED), keys: showFor(0.38, 0.386, 0.43, 0.436), loop: speaking },
      { name: "the wealthy one's voice: not now, quick and grey", svg: arcsLeft(n(wealthy[0] - 3.2), n(wealthy[1] - 2.8), GREY), keys: showFor(0.46, 0.466, 0.52, 0.526), loop: QUICK },
      { name: "wrongdoing: a grey dashed ring about the wealthy one's place", svg: greyRing(wealthy[0], n(wealthy[1] - 1.4), 3.4, 3.2), keys: showAt(0.7, 0.712) },
      { name: "kept back: a grey dashed ring about the coins", svg: greyRing(n(pile[0] + 2.3), n(pile[1] - 2.6), 5.6, 4.4), keys: showAt(0.78, 0.792) },
      {
        name: "not paid: a grey dashed way from the coins to the one owed",
        svg: way(`M${n(pile[0] - 2)} ${n(pile[1] + 2.6)} Q108 115.4 ${n(atDoor[0] + 2.6)} ${n(atDoor[1] + 1.6)}`, GREY, 0.8),
        keys: showAt(0.86, 0.872)
      }
    ],
    words: linesOn(THREE, ["Abu Hurairah: he said: procrastination", "In repaying debts by a wealthy person", "Is injustice."])
  };
}

// The most quarrelsome. Aishah said that the Prophet ﷺ said: the most hated of men to Allah is the one fiercest in
// dispute (Sahih al-Bukhari 2457; the English page: the most hated person in the sight of Allah is the most quarrelsome
// person). No one is drawn: a lane of the town, two places facing each other, and Aishah's place far off. Aishah's
// voice tells of it. The first one's voice speaks, quick and grey, and the other's answers; then the first one's voice
// goes on and on, quick and grey on both sides, and the other's place steps back from it, quiet. A grey dashed ring
// comes about the first one's place: the most quarrelsome, while its voice still goes on. Nothing is drawn for Allah.
function mostQuarrelsome(): SignArt {
  const aishah: [number, number] = [18, 109];
  const arguer: [number, number] = [70, 108];
  const other: [number, number] = [92, 108];
  const back: [number, number] = [108, 110];
  return {
    kind: "most-quarrelsome",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(136, 16) },
      { name: "a cloud", svg: cloud(52, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "a home of the town", svg: home(46, 99, 20, 14) },
      { name: "another home of the town", svg: home(124, 99, 20, 14) },
      ...palms([[150, 96, 11]], "the town"),
      { name: "Aishah's place, far off", svg: someone(aishah[0], aishah[1], 1.5, AISHAH) },
      { name: "Aishah's voice: telling what he said", svg: arcs(n(aishah[0] + 3.2), n(aishah[1] - 2.8), AISHAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the first one's place, in the lane", svg: someone(arguer[0], arguer[1], 1.6, ARGUER) },
      {
        name: "the other one's place: facing it, then stepping back",
        svg: someone(other[0], other[1], 1.6, OTHER),
        keys: track({
          xy: [
            [0.55, 0, 0],
            [0.6, back[0] - other[0], back[1] - other[1]]
          ]
        })
      },
      { name: "the first one's voice: arguing, quick and grey", svg: arcs(n(arguer[0] + 3.2), n(arguer[1] - 2.8), GREY), keys: showFor(0.35, 0.356, 0.41, 0.416), loop: QUICK },
      { name: "the other one's voice: answering", svg: arcsLeft(n(other[0] - 3.2), n(other[1] - 2.8), OTHER), keys: showFor(0.42, 0.426, 0.47, 0.476), loop: speaking },
      {
        name: "the first one's voice: on and on, quick and grey on both sides",
        svg: arcs(n(arguer[0] + 3.2), n(arguer[1] - 2.8), GREY) + arcsLeft(n(arguer[0] - 3.2), n(arguer[1] - 2.8), GREY),
        keys: showFor(0.49, 0.496, 0.9, 0.906),
        loop: QUICK
      },
      { name: "the most quarrelsome: a grey dashed ring about the first one's place", svg: greyRing(arguer[0], n(arguer[1] - 1.4), 3.6, 3.2), keys: showAt(0.7, 0.712) }
    ],
    words: linesOn(THREE, ["Aishah: he said: the most hated person", "In the sight of Allah is", "The most quarrelsome person."])
  };
}

// He never said no. Jabir said: the Prophet ﷺ was never asked for anything and said no (Sahih al-Bukhari 6034; the
// English page: never was the Prophet asked for a thing to be given for which his answer was no). No one is drawn: the
// masjid of Madinah, his place before it, a golden ring, and Jabir's place far off. Jabir's voice tells of it. One
// after another, three places come along a pale dashed way from far off, and each one's voice asks; to the first go
// dates from his place, to the second a coin, and to the third a cloth, and a spark rises from each. Then a soft golden
// ring and glints come about his place: never no.
function neverSaidNo(): SignArt {
  const jabir: [number, number] = [146, 108];
  const his: [number, number] = [104, 104];
  const start: [number, number] = [18, 110];
  const at: [number, number][] = [
    [86, 105.4],
    [80, 111],
    [92, 113.2]
  ];
  const before = (t: number) => Math.round((t - 0.012) * 1000) / 1000;
  const come = (i: number, from: number, to: number) =>
    track({
      opacity: [
        [before(from), 0],
        [from, 1]
      ],
      xy: [
        [from, 0, 0],
        [to, n(at[i][0] - start[0]), n(at[i][1] - start[1])]
      ]
    });
  const given = (from: number, to: number, x: number, y: number, i: number) =>
    track({
      opacity: [
        [before(from), 0],
        [from, 1]
      ],
      xy: [
        [from, 0, 0],
        [to, n(at[i][0] + 2.6 - x), n(at[i][1] - 2.2 - y)]
      ]
    });
  return {
    kind: "never-said-no",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 16) },
      { name: "a cloud", svg: cloud(76, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(104, 92, 1) },
      ...palms([[40, 96, 12]], "Madinah"),
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Jabir's place, far off", svg: someone(jabir[0], jabir[1], 1.5, JABIR) },
      { name: "Jabir's voice: telling of it", svg: arcsLeft(n(jabir[0] - 3.2), n(jabir[1] - 2.8), JABIR), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "the way in: a pale dashed way from far off", svg: way(`M${n(start[0] + 2.4)} ${n(start[1] + 0.6)} Q46 116 ${n(at[1][0] - 2.6)} ${n(at[1][1] + 1)}`, "#FFF0C4", 0.9), keys: showAt(0.106, 0.118) },
      { name: "the first one asking: coming from far off", svg: someone(start[0], start[1], 1.5, ASKERS[0]), keys: come(0, 0.13, 0.19) },
      { name: "the first one's voice: asking", svg: arcs(n(at[0][0] + 3), n(at[0][1] - 2.8), ASKERS[0]), keys: showFor(0.2, 0.206, 0.25, 0.256), loop: speaking },
      { name: "given: dates going from his place to the first one", svg: date(n(his[0] - 2), n(his[1] - 1)) + date(n(his[0] - 0.4), n(his[1] - 1.4)) + date(n(his[0] - 1.2), n(his[1] - 2.2)), keys: given(0.35, 0.38, n(his[0] - 1.2), n(his[1] - 1.4), 0) },
      spark("a spark rising from the first one", at[0][0], n(at[0][1] - 3), 0.384, 0.43),
      { name: "the second one asking: coming from far off", svg: someone(start[0], start[1], 1.5, ASKERS[1]), keys: come(1, 0.444, 0.49) },
      { name: "the second one's voice: asking", svg: arcs(n(at[1][0] + 3), n(at[1][1] - 2.8), ASKERS[1]), keys: showFor(0.494, 0.5, 0.53, 0.536), loop: speaking },
      { name: "given: a coin going from his place to the second one", svg: coins(n(his[0] - 1.4), n(his[1] - 0.8), 1), keys: given(0.546, 0.57, n(his[0] - 1.4), n(his[1] - 0.8), 1) },
      spark("a spark rising from the second one", at[1][0], n(at[1][1] - 3), 0.574, 0.62),
      { name: "the third one asking: coming from far off", svg: someone(start[0], start[1], 1.5, ASKERS[2]), keys: come(2, 0.69, 0.74) },
      { name: "the third one's voice: asking", svg: arcs(n(at[2][0] + 3), n(at[2][1] - 2.8), ASKERS[2]), keys: showFor(0.744, 0.75, 0.78, 0.786), loop: speaking },
      { name: "given: a cloth going from his place to the third one", svg: cloth(n(his[0] - 1.2), n(his[1] - 0.6)), keys: given(0.79, 0.83, n(his[0] - 1.2), n(his[1] - 0.6), 2) },
      spark("a spark rising from the third one", at[2][0], n(at[2][1] - 3), 0.834, 0.88),
      { name: "never no: a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.6), 5, 3, SOFT_GOLD), keys: showAt(0.9, 0.912), loop: soft },
      {
        name: "never no: glints about his place",
        svg: glints(
          [
            [n(his[0] - 5.4), n(his[1] - 4.8)],
            [n(his[0] + 5.6), n(his[1] - 5.2)]
          ],
          0.8
        ),
        keys: showAt(0.92, 0.932),
        loop: twinkle()
      }
    ],
    words: linesOn(THREE, ["Jabir said: never was he asked", "For a thing to be given", "For which his answer was 'no'."])
  };
}

// For you, and against them. Abu Hurairah said that the Messenger of Allah ﷺ said: they lead you in prayer; if they are
// right, it is for you, and if they err, it is for you and against them (Sahih al-Bukhari 694; the English page: if the
// Imam leads the prayer correctly then he and you will receive the rewards, but if he makes a mistake then you will
// receive the reward for the prayer and the sin will be his). No one is drawn: a masjid, the place of the one leading
// the prayer in front, rows of places at prayer behind it, and Abu Hurairah's place far off. Abu Hurairah's voice tells
// of it. A soft golden ring comes about the place in front, and a spark rises from it: correctly; sparks rise from the
// rows, and a soft golden ring comes about them: the rewards. Then a small grey dashed ring shows by the place in front:
// a mistake. Sparks still rise from the rows, and a soft golden ring comes about them: the reward for the prayer; and a
// grey dashed ring comes about the place in front: the sin is its own.
function forYouAndAgainstThem(): SignArt {
  const hurairah: [number, number] = [146, 108];
  const front: [number, number] = [38, 104];
  const rows: [number, number][] = [
    ...[54, 62, 70, 78, 86].map((x): [number, number] => [x, 106]),
    ...[54, 62, 70, 78, 86].map((x): [number, number] => [x, 112])
  ];
  return {
    kind: "for-you-and-against-them",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(140, 16) },
      { name: "a cloud", svg: cloud(96, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(62, 92, 1) },
      ...palms([[122, 96, 12]], "the town"),
      { name: "the place in front, leading the prayer", svg: someone(front[0], front[1], 1.6, FRONT) },
      { name: "the rows of places at prayer, behind it", svg: rows.map(([x, y]) => someone(x, y, 1.4, FOLK)).join("") },
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "correctly: a soft golden ring about the place in front", svg: care(front[0], n(front[1] + 0.6), 4.4, 2.8, SOFT_GOLD), keys: showFor(0.18, 0.192, 0.5, 0.51), loop: soft },
      spark("its reward: a spark rising from the place in front", front[0], n(front[1] - 3), 0.2, 0.246),
      spark("the rewards: a spark rising from the rows 1", 62, 103, 0.34, 0.386),
      spark("the rewards: a spark rising from the rows 2", 78, 103, 0.354, 0.4),
      spark("the rewards: a spark rising from the rows 3", 70, 109, 0.368, 0.414),
      { name: "the rewards: a soft golden ring about the rows", svg: care(70, 109.2, 21, 6.8, SOFT_GOLD), keys: showFor(0.37, 0.382, 0.5, 0.51), loop: soft },
      { name: "a mistake: a small grey dashed ring by the place in front", svg: greyRing(n(front[0] - 4.6), n(front[1] - 4.4), 1.6, 1.2), keys: showAt(0.52, 0.532) },
      spark("the reward for the prayer: a spark rising from the rows 1", 62, 103, 0.66, 0.706),
      spark("the reward for the prayer: a spark rising from the rows 2", 78, 103, 0.674, 0.72),
      spark("the reward for the prayer: a spark rising from the rows 3", 70, 109, 0.688, 0.734),
      { name: "the reward for the prayer: a soft golden ring about the rows", svg: care(70, 109.2, 21, 6.8, SOFT_GOLD), keys: showAt(0.7, 0.712), loop: soft },
      { name: "the sin is its own: a grey dashed ring about the place in front", svg: greyRing(front[0], n(front[1] - 1.4), 3.6, 3.2), keys: showAt(0.83, 0.842) }
    ],
    words: linesOn(SIX, [
      "Abu Hurairah: he said: if the imam",
      "Leads the prayer correctly, then he",
      "And you will receive the rewards, but",
      "If he makes a mistake, then you will",
      "Receive the reward for the prayer",
      "And the sin will be his."
    ])
  };
}

// Glad tidings now. Abu Dharr said: the Messenger of Allah ﷺ was asked: what do you say of a man who does a good deed,
// and people praise him for it? He said: that is the believer's glad tidings, given early (Sahih Muslim 2642; the
// English page: what is your opinion about the person who has done good deeds and the people praise him? He said: it is
// glad tidings for a believer). What it is given early in is left out. No one is drawn: the masjid of Madinah, his place
// before it, a golden ring, with Abu Dharr's place and the place of one asking near him; and far off, the place of one
// who does good, one in need, and places about them. Abu Dharr's voice tells of it, and the voice of the one asking
// speaks to him. The place of the one who does good shows far off. Dates go from it to the one in need, and a spark
// rises from it: a good deed. The voices of the places about it praise it, soft gold. His voice speaks: a small light
// shows in the place of the one who did good, glints come about it, and a soft golden ring: glad tidings.
function gladTidingsNow(): SignArt {
  const his: [number, number] = [122, 104];
  const dharr: [number, number] = [138, 108];
  const asker: [number, number] = [108, 107];
  const doer: [number, number] = [40, 107];
  const need: [number, number] = [20, 111];
  const about: [number, number][] = [
    [54, 104],
    [60, 111]
  ];
  const datesEnd: [number, number] = [n(need[0] + 3.4), n(need[1] - 1)];
  return {
    kind: "glad-tidings-now",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(30, 16) },
      { name: "a cloud", svg: cloud(84, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land of Madinah", svg: plainLand("#E2CB9C", [[12, 117], [80, 118], [150, 116]]) },
      { name: "the masjid", svg: madinahMasjid(124, 92, 0.9) },
      ...palms([[86, 95, 12]], "Madinah"),
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Dharr's place, near him", svg: someone(dharr[0], dharr[1], 1.5, DHARR) },
      { name: "the place of the one asking him", svg: someone(asker[0], asker[1], 1.5, FOLK) },
      { name: "Abu Dharr's voice: telling of it", svg: arcs(n(dharr[0] + 3), n(dharr[1] - 2.8), DHARR), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "the voice of the one asking him: what of one who does good", svg: arcs(n(asker[0] + 3), n(asker[1] - 2.8), FOLK), keys: showFor(0.1, 0.106, 0.34, 0.346), loop: speaking },
      { name: "the place of one who does good, far off", svg: someone(doer[0], doer[1], 1.6, DOER), keys: showAt(0.24, 0.252) },
      { name: "one in need, far off", svg: someone(need[0], need[1], 1.4, NEED) },
      { name: "places about it", svg: about.map(([x, y]) => someone(x, y, 1.4, FOLK)).join("") },
      {
        name: "a good deed: dates going from its place to the one in need",
        svg: date(n(doer[0] - 3), n(doer[1] - 1)) + date(n(doer[0] - 4.4), n(doer[1] - 1.6)),
        keys: track({
          opacity: [
            [0.414, 0],
            [0.426, 1]
          ],
          xy: [
            [0.426, 0, 0],
            [0.48, n(datesEnd[0] - (doer[0] - 3.7)), n(datesEnd[1] - (doer[1] - 1.3))]
          ]
        })
      },
      spark("a good deed: a spark rising from its place", doer[0], n(doer[1] - 3), 0.48, 0.526),
      {
        name: "praised: soft golden voices from the places about it",
        svg: arcsLeft(n(about[0][0] - 2.6), n(about[0][1] - 2.8), SOFT_GOLD) + arcsLeft(n(about[1][0] - 2.6), n(about[1][1] - 2.8), SOFT_GOLD),
        keys: showFor(0.62, 0.626, 0.69, 0.696),
        loop: speaking
      },
      { name: "his voice: glad tidings", svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.71, 0.716, 0.94, 0.946), loop: speaking },
      { name: "glad tidings: a small light in its place", svg: lightIn(doer[0], doer[1], 3), keys: showAt(0.82, 0.832), loop: soft },
      {
        name: "glad tidings: glints about its place",
        svg: glints(
          [
            [n(doer[0] - 5), n(doer[1] - 4.6)],
            [n(doer[0] + 5.2), n(doer[1] - 5)]
          ],
          0.7
        ),
        keys: showAt(0.84, 0.852),
        loop: twinkle()
      },
      { name: "glad tidings: a soft golden ring about its place", svg: care(doer[0], n(doer[1] + 0.4), 4, 2.4, SOFT_GOLD), keys: showAt(0.87, 0.882), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Abu Dharr: it was said to him:",
      "What is your opinion about the person",
      "Who has done good deeds",
      "And the people praise him? He said:",
      "It is glad tidings for a believer."
    ])
  };
}

export const CLEAR_ART = {
  "halal-or-haram": halalOrHaram,
  "delay-by-the-wealthy": delayByTheWealthy,
  "most-quarrelsome": mostQuarrelsome,
  "never-said-no": neverSaidNo,
  "for-you-and-against-them": forYouAndAgainstThem,
  "glad-tidings-now": gladTidingsNow
} as const;
