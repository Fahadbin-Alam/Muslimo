import { cloud, glow, n, sky, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sack, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM } from "./worshipArt";
import { care, lightIn, palms, track } from "./daysArt";
import { date, greyRing, soft, spark, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, EIGHT, FOLK, glints, linesOn, places, plainLand, SEVEN, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { coins } from "./tradeArt";
import { GREY } from "./lovedArt";
import { looking, QUICK } from "./dailyArt";

/**
 * Advice: cursing one's own parents by abusing another's; taking money meaning to repay it, or to spoil it; no
 * Tiyara, and the best omen is a good word; a deed that takes one into Paradise; whoever leads the prayer should
 * shorten it; and the best are those with the best manners. Only the land, the sky, buildings, things, plants and a
 * bird are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot, a head, a mouth or a
 * face: where someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is
 * arcs in the air. Nothing is drawn for Allah, no book or page is drawn, and nothing comes down from the sky: a deed is
 * a spark that rises, what is good is a light, glints and a soft golden ring, and what is not to be done a grey dashed
 * ring. No name, word or number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** A bird in flight, its wings spread, its middle at (x, y). */
const flying = (x: number, y: number) =>
  `<path d="M${n(x - 4)} ${n(y - 0.4)} Q${n(x - 2)} ${n(y - 2.6)} ${x} ${y} Q${n(x + 2)} ${n(y - 2.6)} ${n(x + 4)} ${n(y - 0.4)}" stroke="#5E4B38" stroke-width="0.9" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${n(y + 0.2)}" rx="0.9" ry="0.6" fill="#5E4B38"/>`;

/** Abdullah ibn Amr's place and voice: an olive green. */
const IBN_AMR = "#6E7E4E";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Abu Ayyub's place and voice: a slate blue. */
const ABU_AYYUB = "#5E6E8E";
/** Abu Mas'ud's place and voice: a deep green. */
const ABU_MASUD = "#4E7A6A";
/** The place and voice of someone who asked: a slate blue. */
const ASKER = "#4E6E7E";
/** The place of one who abused another's father: a muted violet. */
const FIRST = "#7E5E8C";
/** And of the other, who abused back: a dull teal. */
const OTHER = "#4E7E6E";
/** The place of one who lent: a warm brown. */
const LENDER = "#9A6A38";
/** The place of one who took it meaning to repay: a plain green. */
const REPAYER = "#5E8A52";
/** The place of one who took it meaning to spoil it: a dull brown. */
const SPOILER = "#8A6A4E";
/** A traveller's place: a deep teal. */
const TRAVELLER = "#3E6B6B";
/** The place of someone met on the way: a warm brown. */
const PASSER = "#9A6A38";
/** The place and voice of the man who asked for a deed: a dull brown. */
const SEEKER = "#8A6A4E";
/** The place and voice of the man who could not keep up with the prayer: a dull brown. */
const KEPT_AWAY = "#8A6A4E";
/** The place of the one who led the prayer: a muted violet. */
const LEADING = "#6E5A8C";
/** The places of two who are kind to others: a plain green and a deep teal. */
const KIND = "#5E8A52";
const KINDER = "#3E6B6B";

// Cursing one's own parents. Abdullah ibn Amr said that the Messenger of Allah ﷺ said: among the greatest of the
// great sins is that a man curse his parents; it was said: O Messenger of Allah, and how would a man curse his
// parents?; he said: a man abuses another man's father, so he abuses his father, and abuses his mother (Sahih
// al-Bukhari 5973; the English page: it is one of the greatest sins that a man should curse his parents ... the man
// abuses the father of another man and the latter abuses the father of the former and abuses his mother). "By the
// people" is the translator's, and "O Allah's Messenger" is left out of the lines. No one is drawn: the masjid of
// Madinah, his place before it, a golden ring, Abdullah ibn Amr's place far off, and two homes along the lane, each
// with the places of its two older ones by its door and the place of one of the home before it. Abdullah ibn Amr's
// voice tells of it, and his voice, soft and golden, speaks. The place of someone who asked shows by him, and its
// voice asks. His voice tells. The two of the homes come out into the lane. The voice of the first is quick and grey,
// and a grey dashed way goes from it to an older one of the other home, which dims. The other's voice is quick and
// grey back, a grey dashed way goes from it to an older one of the first home, and then another to the other older
// one there, and each dims. A grey dashed ring comes about the first: it brought its own parents to be cursed.
function curseParents(): SignArt {
  const ibnAmr: [number, number] = [10, 112];
  const his: [number, number] = [28, 106];
  const asker: [number, number] = [46, 108];
  const first: [number, number] = [86, 114];
  const other: [number, number] = [142, 114];
  const out = 18;
  const firstOlder: [number, number] = [92, 107.6];
  const firstOtherOlder: [number, number] = [78, 107.6];
  const otherOlder: [number, number] = [136, 107.6];
  const otherOtherOlder: [number, number] = [148, 107.6];
  const dims = (from: number, to: number) =>
    track({
      opacity: [
        [from, 1],
        [to, 0.45]
      ]
    });
  return {
    kind: "curse-parents",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(66, 20) },
      { name: "a cloud", svg: cloud(116, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 118.6], [66, 119], [156, 119]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      ...palms(
        [
          [60, 98, 13],
          [114, 98, 12]
        ],
        "Madinah"
      ),
      { name: "a home along the lane", svg: home(86, 99, 16, 12) },
      { name: "another home along the lane", svg: home(142, 99, 16, 12) },
      { name: "Abdullah ibn Amr's place, far off", svg: someone(ibnAmr[0], ibnAmr[1], 1.5, IBN_AMR) },
      { name: "Abdullah ibn Amr's voice: telling what he said", svg: arcs(n(ibnAmr[0] + 3.2), n(ibnAmr[1] - 2.8), IBN_AMR), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: one of the greatest sins", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.06, 0.066, 0.244, 0.25), loop: speaking },
      { name: "the place of someone who asked, by him", svg: someone(asker[0], asker[1], 1.5, ASKER), keys: showAt(0.31, 0.322) },
      { name: "the asker's voice: asking how", svg: arcsLeft(n(asker[0] - 3.2), n(asker[1] - 2.8), ASKER), keys: showFor(0.33, 0.336, 0.5, 0.506), loop: speaking },
      { name: "his voice, soft and golden: telling how", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.51, 0.516, 0.95, 0.956), loop: speaking },
      { name: "an older one of the first home, by its door, dimming", svg: someone(firstOlder[0], firstOlder[1], 1.4, FOLK), keys: dims(0.79, 0.81) },
      { name: "the other older one of the first home, dimming", svg: someone(firstOtherOlder[0], firstOtherOlder[1], 1.4, FOLK), keys: dims(0.912, 0.93) },
      { name: "an older one of the other home, by its door, dimming", svg: someone(otherOlder[0], otherOlder[1], 1.4, FOLK), keys: dims(0.666, 0.684) },
      { name: "the other older one of the other home", svg: someone(otherOtherOlder[0], otherOtherOlder[1], 1.4, FOLK) },
      {
        name: "the place of one of the first home: coming out into the lane",
        svg: someone(first[0], first[1], 1.6, FIRST),
        keys: track({
          xy: [
            [0.6, 0, 0],
            [0.63, out, 0]
          ]
        })
      },
      {
        name: "the place of one of the other home: coming out into the lane",
        svg: someone(other[0], other[1], 1.6, OTHER),
        keys: track({
          xy: [
            [0.6, 0, 0],
            [0.63, -out, 0]
          ]
        })
      },
      { name: "abusing: the voice of the first, quick and grey", svg: arcs(n(first[0] + out + 3.2), n(first[1] - 2.8), GREY), keys: showFor(0.636, 0.642, 0.82, 0.826), loop: QUICK },
      { name: "the abuse: a grey dashed way to an older one of the other home", svg: way(`M${n(first[0] + out + 3.4)} ${n(first[1] + 1.4)} Q121 118.4 ${n(otherOlder[0] - 1.4)} ${n(otherOlder[1] + 1.8)}`, GREY, 0.8), keys: showAt(0.65, 0.662) },
      { name: "abusing back: the voice of the other, quick and grey", svg: arcsLeft(n(other[0] - out - 3.2), n(other[1] - 2.8), GREY), keys: showFor(0.744, 0.75, 0.95, 0.956), loop: QUICK },
      { name: "the abuse back: a grey dashed way to an older one of the first home", svg: way(`M${n(other[0] - out - 3.6)} ${n(other[1] - 4.4)} Q107 101.6 ${n(firstOlder[0] + 1.8)} ${n(firstOlder[1] - 1)}`, GREY, 0.8), keys: showAt(0.764, 0.776) },
      { name: "and more: a grey dashed way to the other older one of the first home", svg: way(`M${n(other[0] - out - 3.6)} ${n(other[1] - 5.2)} Q100 95.4 ${n(firstOtherOlder[0] + 1)} ${n(firstOtherOlder[1] - 1.4)}`, GREY, 0.8), keys: showAt(0.888, 0.9) },
      { name: "a great sin: a grey dashed ring about the first, who brought it on its own", svg: greyRing(n(first[0] + out), n(first[1] + 0.6), 4.2, 2.6), keys: showAt(0.936, 0.948) }
    ],
    words: linesOn(SEVEN, [
      "Abdullah ibn Amr: he said: it is one of",
      "The greatest sins that a man should",
      "Curse his parents. It was asked: how",
      "Does a man curse his parents? He said:",
      "The man abuses the father of another",
      "Man and the latter abuses the father of",
      "The former and abuses his mother."
    ])
  };
}

// Meaning to repay it. Abu Hurairah said that the Prophet ﷺ said: whoever takes people's wealth meaning to pay it back,
// Allah will pay it back for him, and whoever takes it meaning to waste it, Allah will waste him (Sahih al-Bukhari
// 2387; the English page: whoever takes the money of the people with the intention of repaying it, Allah will repay it
// on his behalf, and whoever takes it in order to spoil it, then Allah will spoil him). No one is drawn, and nothing
// for Allah: a home with coins by it and the place of one who lends, two other homes, each with a place before it, and
// Abu Hurairah's place far off. Abu Hurairah's voice tells of it. A soft golden way shows from the one who lends to
// the first, and coins go along it: taken. A soft golden ring comes about the first: meaning to repay. The coins go
// back along the way to the one who lent, and a spark rises from the first: repaid. A grey dashed way shows to the
// other, coins go along it, and there they fade away: spoiled. A grey dashed ring comes about the other, and its place
// dims.
function borrowToRepay(): SignArt {
  const hurairah: [number, number] = [152, 112];
  const lender: [number, number] = [24, 107];
  const repayer: [number, number] = [84, 107];
  const spoiler: [number, number] = [124, 107];
  const lent: [number, number] = [35.4, 110.8];
  const wasted: [number, number] = [36.6, 112.4];
  const toRepayer: [number, number] = [n(repayer[0] - 4.6 - lent[0]), n(repayer[1] + 2.6 - lent[1])];
  const toSpoiler: [number, number] = [n(spoiler[0] - 4.6 - wasted[0]), n(spoiler[1] + 2.6 - wasted[1])];
  return {
    kind: "borrow-to-repay",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(104, 22) },
      { name: "a cloud", svg: cloud(48, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118.8], [148, 119]]) },
      { name: "the home of one who lends", svg: home(24, 99, 18, 12) },
      { name: "a home of the town", svg: home(84, 99, 14, 11) },
      { name: "another home of the town", svg: home(124, 99, 14, 11) },
      ...palms([[56, 98, 12]], "the town"),
      { name: "Abu Hurairah's place, far off", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he said", svg: arcsLeft(n(hurairah[0] - 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.11, 0.116), loop: speaking },
      { name: "the place of one who lends", svg: someone(lender[0], lender[1], 1.6, LENDER) },
      { name: "the money taken: coins by the home", svg: coins(41.4, 109.6, 3) + coins(45.8, 109.6, 2) },
      { name: "the place of one who takes it, meaning to repay", svg: someone(repayer[0], repayer[1], 1.6, REPAYER) },
      {
        name: "the place of one who takes it, meaning to spoil it: dimming",
        svg: someone(spoiler[0], spoiler[1], 1.6, SPOILER),
        keys: track({
          opacity: [
            [0.86, 1],
            [0.9, 0.45]
          ]
        })
      },
      { name: "taking it: a soft golden way from the one who lends", svg: way(`M${n(lender[0] + 3.6)} ${n(lender[1] + 2)} Q56 115.6 ${n(repayer[0] - 3.4)} ${n(repayer[1] + 1.8)}`, SOFT_GOLD, 0.9), keys: showAt(0.18, 0.192) },
      {
        name: "coins taken: going to the one who means to repay, and back",
        svg: coins(lent[0], lent[1], 2),
        keys: track({
          xy: [
            [0.2, 0, 0],
            [0.26, toRepayer[0], toRepayer[1]],
            [0.5, toRepayer[0], toRepayer[1]],
            [0.56, 0, 0]
          ]
        })
      },
      { name: "meaning to repay: a soft golden ring about it", svg: care(repayer[0], n(repayer[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.34, 0.352), loop: soft },
      spark("repaid: a spark rising from the one who repaid", repayer[0], n(repayer[1] - 4.4), 0.562, 0.6),
      { name: "taking it: a grey dashed way to the other", svg: way(`M${n(lender[0] + 3.6)} ${n(lender[1] + 3)} Q76 120.4 ${n(spoiler[0] - 3.4)} ${n(spoiler[1] + 2)}`, GREY, 0.9), keys: showAt(0.66, 0.672) },
      {
        name: "spoiling it: coins going to the other, and fading away",
        svg: coins(wasted[0], wasted[1], 2),
        keys: track({
          opacity: [
            [0.74, 1],
            [0.758, 0]
          ],
          xy: [
            [0.676, 0, 0],
            [0.736, toSpoiler[0], toSpoiler[1]]
          ]
        })
      },
      { name: "spoiled: a grey dashed ring about the other", svg: greyRing(spoiler[0], n(spoiler[1] + 0.6), 4.2, 2.6), keys: showAt(0.83, 0.842) }
    ],
    words: linesOn(SIX, [
      "Abu Hurairah: he said: whoever takes",
      "The money of the people with the",
      "Intention of repaying it, Allah will",
      "Repay it on his behalf, and whoever",
      "Takes it in order to spoil it, then",
      "Allah will spoil him."
    ])
  };
}

// A good word. Abu Hurairah said: I heard the Messenger of Allah ﷺ say: there is no Tiyara, and the best of it is the
// Fal; they said: and what is the Fal?; he said: the good word that one of you hears (Sahih al-Bukhari 5754; the English
// page: there is no Tiyara, and the best omen is the Fal ... a good word that one of you hears). "And takes as a good
// omen" is the translator's and is left out. Tiyara is taking a bad omen from birds. No one is drawn: the masjid of
// Madinah, his place before it, a golden ring, Abu Hurairah's place by him, the places of others there, and a way
// going off along the palms. Abu Hurairah's voice tells of it, and his voice, soft and golden, speaks. The place of a
// traveller sets out along the way, and a bird flies up from a palm, across the way, to another palm. A faint dotted
// line of looking goes from the traveller to it, and a grey dashed ring comes about the bird: there is no omen in it.
// The voice of the others asks, and his voice tells. The place of someone shows ahead on the way, its voice soft and
// golden: a good word; a soft golden ring and glints come about the traveller who heard it.
function goodWord(): SignArt {
  const hurairah: [number, number] = [44, 108.6];
  const his: [number, number] = [28, 106];
  const others: [number, number][] = [
    [12, 111.6],
    [20, 113]
  ];
  const traveller: [number, number] = [64, 111.4];
  const along: [number, number] = [20, 1.6];
  const at: [number, number] = [n(traveller[0] + along[0]), n(traveller[1] + along[1])];
  const bird: [number, number] = [105, 79];
  const lands: [number, number] = [36, 1];
  const perched: [number, number] = [n(bird[0] + lands[0]), n(bird[1] + lands[1])];
  const passer: [number, number] = [118, 113.4];
  return {
    kind: "good-word",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(70, 20) },
      { name: "a cloud", svg: cloud(124, 24, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [56, 118.6], [100, 119], [150, 117]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      { name: "a way going off along the palms", svg: way(`M58 112.6 Q104 117.6 158 109.6`, "#FFF0C4", 0.9) },
      ...palms(
        [
          [104, 99, 13],
          [140, 99, 12]
        ],
        "the way"
      ),
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Abu Hurairah's place, by him", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling what he heard", svg: arcs(n(hurairah[0] + 3.2), n(hurairah[1] - 2.8), HURAIRAH), keys: showFor(0.024, 0.03, 0.11, 0.116), loop: speaking },
      { name: "the places of others, by him", svg: places(others, 1.5, FOLK) },
      { name: "his voice, soft and golden: no Tiyara", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.13, 0.136, 0.44, 0.446), loop: speaking },
      {
        name: "the place of a traveller: setting out along the way",
        svg: someone(traveller[0], traveller[1], 1.6, TRAVELLER),
        keys: track({
          xy: [
            [0.27, 0, 0],
            [0.3, along[0], along[1]]
          ]
        })
      },
      {
        name: "a bird on a palm: flying up, across the way, to another palm",
        svg: big(flying(bird[0], bird[1]), bird[0], bird[1], 1.3),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.34, 12, -9],
            [0.37, 26, -10],
            [0.4, lands[0], lands[1]]
          ]
        }),
        loop: { move: "bob", ms: 600, y: 0.5 }
      },
      { name: "taking an omen: a faint dotted line of looking from the traveller to the bird", svg: looking(`M${n(at[0] + 2.4)} ${n(at[1] - 1.4)} Q112 98 ${n(perched[0] - 3)} ${n(perched[1] + 1.6)}`), keys: showAt(0.414, 0.426) },
      { name: "no Tiyara: a grey dashed ring about the bird, no omen in it", svg: greyRing(perched[0], n(perched[1] - 0.4), 6.4, 3.6), keys: showAt(0.436, 0.448) },
      { name: "the voice of the others: what is the Fal?", svg: arcs(n(others[1][0] + 3.2), n(others[1][1] - 2.8), FOLK), keys: showFor(0.52, 0.526, 0.68, 0.686), loop: speaking },
      { name: "his voice, soft and golden: telling what the Fal is", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.76, 0.766, 0.946, 0.952), loop: speaking },
      { name: "the place of someone ahead on the way", svg: someone(passer[0], passer[1], 1.6, PASSER), keys: showAt(0.776, 0.788) },
      { name: "a good word: its voice, soft and golden, to the traveller", svg: arcsLeft(n(passer[0] - 3.2), n(passer[1] - 2.8), SOFT_GOLD), keys: showFor(0.8, 0.806, 0.95, 0.956), loop: speaking },
      { name: "the best omen: a soft golden ring about the traveller who heard it", svg: care(at[0], n(at[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.86, 0.872), loop: soft },
      {
        name: "and glints about it",
        svg: glints(
          [
            [n(at[0] - 5), n(at[1] - 3.4)],
            [n(at[0] + 5.2), n(at[1] - 3)],
            [at[0], n(at[1] - 5.4)]
          ],
          0.8
        ),
        keys: showAt(0.9, 0.912),
        loop: twinkle(1300)
      }
    ],
    words: linesOn(FOUR, [
      "Abu Hurairah: I heard him saying: there",
      "Is no Tiyara, and the best omen is the",
      "Fal. They asked: what is the Fal? He",
      "Said: a good word that one of you hears."
    ])
  };
}

// A deed for Paradise. Abu Ayyub said that a man said to the Prophet ﷺ: tell me of a deed that will take me into
// Paradise; they said: what is the matter with him, what is the matter with him?; and the Prophet ﷺ said: he has a
// need; you worship Allah and join nothing with Him, establish the prayer, give the zakah, and keep the ties of the womb
// (Sahih al-Bukhari 1396; the English page: tell me of such a deed as will make me enter Paradise ... he has something
// to ask ... you should worship Allah and do not ascribe any partners to Him, offer prayer perfectly, pay the Zakat
// and keep good relations with your Kith and kin). The translator's notes, the second "what is the matter with him",
// "to Him" and "Kith and" are left out of the lines. No one is drawn: the masjid of Madinah, his place before it, a
// golden ring, the places of people there, a home of his kin along the way, and Abu Ayyub's place far off. Abu
// Ayyub's voice tells of it. A man's place comes along to him, and its voice asks. The people's voice speaks, and his
// voice, soft and golden, answers. A spark rises from the man and a soft golden ring comes about it: worshipping
// Allah alone. Sparks rise from the masjid: the prayer. Coins go from the man to someone in need: the zakat. A soft
// golden way goes from the man to the home of its kin, and small lights come on their places: good relations.
function deedForParadise(): SignArt {
  const abuAyyub: [number, number] = [154, 112];
  const his: [number, number] = [28, 106];
  const people: [number, number][] = [
    [12, 111.4],
    [19, 113.2]
  ];
  const seeker: [number, number] = [96, 110];
  const comes: [number, number] = [-52, -1];
  const by: [number, number] = [n(seeker[0] + comes[0]), n(seeker[1] + comes[1])];
  const needy: [number, number] = [58, 115.4];
  const kin: [number, number][] = [
    [110, 107.6],
    [122, 107.6]
  ];
  const given: [number, number] = [n(by[0] + 3.8), n(by[1] + 2.6)];
  return {
    kind: "deed-for-paradise",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(134, 22) },
      { name: "a cloud", svg: cloud(80, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[30, 119], [84, 118.6], [140, 118.6]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      ...palms(
        [
          [72, 98, 12],
          [144, 99, 12]
        ],
        "Madinah"
      ),
      { name: "a home of kin along the way", svg: home(116, 99, 16, 12) },
      { name: "Abu Ayyub's place, far off", svg: someone(abuAyyub[0], abuAyyub[1], 1.5, ABU_AYYUB) },
      { name: "Abu Ayyub's voice: telling of it", svg: arcsLeft(n(abuAyyub[0] - 3.2), n(abuAyyub[1] - 2.8), ABU_AYYUB), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of others by him", svg: places(people, 1.5, FOLK) },
      { name: "the places of the kin, by their home", svg: places(kin, 1.4, FOLK) },
      { name: "the place of someone in need", svg: someone(needy[0], needy[1], 1.5, FOLK) },
      {
        name: "the place of someone who asked: coming along to him",
        svg: someone(seeker[0], seeker[1], 1.6, SEEKER),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.085, comes[0], comes[1]]
          ]
        })
      },
      { name: "its voice: tell me of a deed", svg: arcsLeft(n(by[0] - 3.2), n(by[1] - 2.8), SEEKER), keys: showFor(0.146, 0.152, 0.27, 0.276), loop: speaking },
      { name: "the voice of the others: what is the matter?", svg: arcs(n(people[1][0] + 3.2), n(people[1][1] - 2.8), FOLK), keys: showFor(0.28, 0.286, 0.4, 0.406), loop: speaking },
      { name: "his voice, soft and golden: answering", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.41, 0.416, 0.94, 0.946), loop: speaking },
      spark("worshipping: a spark rising from the one who asked", by[0], n(by[1] - 4.4), 0.64, 0.698),
      { name: "with no partner: a soft golden ring about the one who asked", svg: care(by[0], n(by[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.66, 0.672), loop: soft },
      spark("the prayer: a spark rising from the masjid", 18, 80, 0.756, 0.8),
      spark("the prayer: another spark rising from the masjid", 38, 80, 0.762, 0.806),
      {
        name: "the zakat: coins going from the one who asked to someone in need",
        svg: coins(given[0], given[1], 2),
        keys: track({
          opacity: [
            [0.766, 0],
            [0.772, 1]
          ],
          xy: [
            [0.774, 0, 0],
            [0.816, n(needy[0] - 4.4 - given[0]), n(needy[1] + 1.4 - given[1])]
          ]
        })
      },
      { name: "good relations: a soft golden way from the one who asked to the home of its kin", svg: way(`M${n(by[0] + 3.6)} ${n(by[1] - 0.6)} Q78 103.4 ${n(kin[0][0] - 3)} ${n(kin[0][1] + 0.4)}`, SOFT_GOLD, 0.9), keys: showAt(0.878, 0.89) },
      { name: "kept: small lights on the places of the kin", svg: kin.map(([x, y]) => lightIn(x, n(y - 0.4), 2.4, WARM)).join(""), keys: showAt(0.91, 0.922), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Abu Ayyub: a man said to him: tell me of",
      "Such a deed as will make me enter",
      "Paradise. The people said: what is the",
      "Matter with him? He said: he has",
      "Something to ask. You should worship",
      "Allah and do not ascribe any partners,",
      "Offer prayer perfectly, pay the Zakat",
      "And keep good relations with your kin."
    ])
  };
}

// Shorten the prayer. Abu Mas'ud al-Ansari said: a man said: O Messenger of Allah, I can hardly catch the prayer because of
// how long so and so makes it for us; and I never saw the Prophet ﷺ in an exhortation more angry than on that day; he
// said: O people, you are driving others away; whoever leads the people in prayer, let him make it light, for among them
// are the sick, the weak and the one with a need (Sahih al-Bukhari 90; the English page: I may not attend the prayer
// because so and so prolongs the prayer when he leads us for it ... I never saw the Prophet more furious in giving
// advice than he was on that day ... some of you make others dislike good deeds; so whoever leads the people in prayer
// should shorten it because among them there are the sick the weak and the needy). The translator's notes, "to Allah's
// Messenger", "when he leads us for it", "in giving advice" and "O people" are left out of the lines. No one is drawn:
// his place, a golden ring, by a palm, Abu Mas'ud's place far off, and a masjid of the town with the place of one
// leading the prayer before it and the places of the rows behind. Abu Mas'ud's voice tells of it. The place of a man
// comes to him, and its voice speaks, while at the masjid the sun goes a long way and the rows stand on: the prayer
// prolonged. His voice speaks, strong and golden. A grey dashed ring comes about the one leading, and a place of the
// rows goes away along a grey dashed way: made to dislike it. Then the grey ring fades, and a soft golden ring comes
// about the one leading: shortening it. Among the rows a pale glow comes on one place, sick; a soft light on a smaller,
// fainter one, weak; and a sack by another, which has work to do.
function shortenThePrayer(): SignArt {
  const abuMasud: [number, number] = [6, 112];
  const his: [number, number] = [22, 106];
  const keptAway: [number, number] = [74, 112];
  const comes: [number, number] = [-36, -3];
  const by: [number, number] = [n(keptAway[0] + comes[0]), n(keptAway[1] + comes[1])];
  const leading: [number, number] = [112, 105.6];
  const sick: [number, number] = [100, 110.4];
  const weak: [number, number] = [116, 110.4];
  const needy: [number, number] = [120, 114.4];
  const leaves: [number, number] = [128, 114.4];
  const rows: [number, number][] = [
    [108, 110.4],
    [124, 110.4],
    [104, 114.4],
    [112, 114.4]
  ];
  return {
    kind: "shorten-the-prayer",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      {
        name: "the sun, going a long way: the prayer prolonged",
        svg: sun(108, 22),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.205, 30, 10]
          ]
        })
      },
      { name: "a cloud", svg: cloud(54, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[14, 119], [60, 118.6], [92, 119]]) },
      { name: "a masjid of the town", svg: madinahMasjid(88, 100, 1) },
      ...palms(
        [
          [40, 98, 13],
          [150, 99, 11]
        ],
        "the town"
      ),
      { name: "Abu Mas'ud's place, far off", svg: someone(abuMasud[0], abuMasud[1], 1.5, ABU_MASUD) },
      { name: "Abu Mas'ud's voice: telling of it", svg: arcs(n(abuMasud[0] + 3.2), n(abuMasud[1] - 2.8), ABU_MASUD), keys: showFor(0.024, 0.03, 0.08, 0.086), loop: speaking },
      { name: "his place, a golden ring, by a palm", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "the place of someone kept away: coming to him",
        svg: someone(keptAway[0], keptAway[1], 1.6, KEPT_AWAY),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.085, comes[0], comes[1]]
          ]
        })
      },
      { name: "its voice: I may not attend the prayer", svg: arcsLeft(n(by[0] - 3.2), n(by[1] - 2.8), KEPT_AWAY), keys: showFor(0.146, 0.152, 0.3, 0.306), loop: speaking },
      { name: "the place of so and so, leading the prayer, before the masjid", svg: someone(leading[0], leading[1], 1.6, LEADING) },
      { name: "the places of the rows behind", svg: places(rows, 1.5, FOLK) },
      { name: "the place of one of the rows, sick", svg: someone(sick[0], sick[1], 1.5, FOLK) },
      { name: "the place of one of the rows, weak: smaller and fainter", svg: `<g opacity="0.6">${someone(weak[0], weak[1], 1.2, FOLK)}</g>` },
      { name: "the place of one of the rows, with a need", svg: someone(needy[0], needy[1], 1.5, FOLK) },
      { name: "his voice, strong and golden: more furious than on any day", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), GOLD), keys: showFor(0.32, 0.326, 0.94, 0.946), loop: { move: "twinkle", ms: 600, low: 0.4 } },
      {
        name: "making others dislike it: a grey dashed ring about the one leading, then fading",
        svg: greyRing(leading[0], n(leading[1] + 0.6), 4.2, 2.6),
        keys: track({
          opacity: [
            [0.52, 0],
            [0.532, 1],
            [0.756, 1],
            [0.768, 0]
          ]
        })
      },
      { name: "a grey dashed way going away from the rows", svg: way(`M${n(leaves[0] + 3)} ${n(leaves[1] - 0.4)} Q142 116.6 157 112.6`, GREY, 0.8), keys: showAt(0.536, 0.548) },
      {
        name: "the place of one of the rows: made to dislike it, going away",
        svg: someone(leaves[0], leaves[1], 1.5, FOLK),
        keys: track({
          xy: [
            [0.548, 0, 0],
            [0.576, 26, -1.4]
          ]
        })
      },
      { name: "shortening it: a soft golden ring about the one leading", svg: care(leading[0], n(leading[1] + 0.6), 4.4, 2.6, SOFT_GOLD), keys: showAt(0.772, 0.784), loop: soft },
      { name: "the sick: a pale glow on its place", svg: glow(sick[0], n(sick[1] - 0.6), 3.6, "#F29090", 0.26), keys: showAt(0.878, 0.89), loop: { move: "twinkle", ms: 1600, low: 0.7 } },
      { name: "the weak: a soft light on its place", svg: lightIn(weak[0], n(weak[1] - 0.4), 2.6, WARM), keys: showAt(0.9, 0.912), loop: soft },
      { name: "the needy, with work to do: a sack by its place", svg: sack(n(needy[0] + 3.6), n(needy[1] + 1.4), 0.5), keys: showAt(0.92, 0.932) }
    ],
    words: linesOn(EIGHT, [
      "Abu Mas'ud: a man said: I may not attend",
      "The prayer because so and so prolongs",
      "The prayer. I never saw him more furious",
      "Than he was on that day. He said: some",
      "Of you make others dislike good deeds. So",
      "Whoever leads the people in prayer should",
      "Shorten it because among them there are",
      "The sick, the weak and the needy."
    ])
  };
}

// The best manners. Abdullah ibn Amr said: the Prophet ﷺ was neither obscene nor one who spoke obscenely, and he used
// to say: among the best of you are those best in manners (Sahih al-Bukhari 3559; the English page: the Prophet never
// used bad language neither a Fahish nor a Mutafahish; he used to say: the best amongst you are those who have the best
// manners and character). "Neither a Fahish nor a Mutafahish" and the reference are left out of the lines. No one is
// drawn: the masjid of Madinah, his place before it, a golden ring, Abdullah ibn Amr's place far off, and places along
// a lane of the town. Abdullah ibn Amr's voice tells of it. His voice, soft and golden, speaks, with glints about it,
// and never grey. Along the lane one place speaks softly to another, and a small light comes on that one; another place
// gives dates to someone. Soft golden rings come about the two who were kind, and glints.
function bestCharacter(): SignArt {
  const ibnAmr: [number, number] = [154, 112];
  const his: [number, number] = [28, 106];
  const kind: [number, number] = [72, 109];
  const heard: [number, number] = [88, 109];
  const kinder: [number, number] = [110, 111];
  const given: [number, number] = [128, 111];
  const dates: [number, number] = [n(kinder[0] + 3.6), n(kinder[1] + 1.4)];
  return {
    kind: "best-character",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E3F2FB", 62) },
      { name: "the sun", svg: sun(96, 20) },
      { name: "a cloud", svg: cloud(132, 26, 0.42, "#FFFFFF", 0.9), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [62, 118.6], [100, 118.4], [146, 118.6]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 1) },
      { name: "a home along the lane", svg: home(80, 99, 16, 12) },
      { name: "another home along the lane", svg: home(120, 99, 16, 12) },
      ...palms(
        [
          [58, 98, 12],
          [146, 99, 12]
        ],
        "Madinah"
      ),
      { name: "Abdullah ibn Amr's place, far off", svg: someone(ibnAmr[0], ibnAmr[1], 1.5, IBN_AMR) },
      { name: "Abdullah ibn Amr's voice: telling of him", svg: arcsLeft(n(ibnAmr[0] - 3.2), n(ibnAmr[1] - 2.8), IBN_AMR), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "his place, a golden ring, before the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden, never bad", svg: arcs(n(his[0] + 3.2), n(his[1] - 2.8), SOFT_GOLD), keys: showFor(0.13, 0.136, 0.45, 0.456), loop: speaking },
      {
        name: "glints about his voice",
        svg: glints(
          [
            [n(his[0] + 8.6), n(his[1] - 6)],
            [n(his[0] + 5), n(his[1] - 9)]
          ],
          0.7
        ),
        keys: showFor(0.16, 0.172, 0.44, 0.452),
        loop: twinkle(1300)
      },
      { name: "the place of one along the lane", svg: someone(kind[0], kind[1], 1.6, KIND) },
      { name: "the place of another along the lane", svg: someone(heard[0], heard[1], 1.5, FOLK) },
      { name: "the place of one more along the lane", svg: someone(kinder[0], kinder[1], 1.6, KINDER) },
      { name: "the place of someone along the lane", svg: someone(given[0], given[1], 1.5, FOLK) },
      { name: "speaking softly: its voice, to the other", svg: arcs(n(kind[0] + 3.2), n(kind[1] - 2.8), KIND), keys: showFor(0.52, 0.526, 0.69, 0.696), loop: speaking },
      { name: "spoken to kindly: a small light on the other", svg: lightIn(heard[0], n(heard[1] - 0.4), 2.4, WARM), keys: showAt(0.6, 0.612), loop: soft },
      {
        name: "giving: dates going to someone",
        svg: big(date(dates[0], dates[1]) + date(n(dates[0] + 1.6), n(dates[1] + 0.3)), dates[0], dates[1], 1.8),
        keys: track({
          opacity: [
            [0.62, 0],
            [0.626, 1]
          ],
          xy: [
            [0.63, 0, 0],
            [0.68, n(given[0] - 4.4 - dates[0]), 0]
          ]
        })
      },
      {
        name: "the best manners: soft golden rings about the two who were kind",
        svg: care(kind[0], n(kind[1] + 0.6), 4.4, 2.6, SOFT_GOLD) + care(kinder[0], n(kinder[1] + 0.6), 4.4, 2.6, SOFT_GOLD),
        keys: showAt(0.77, 0.782),
        loop: soft
      },
      {
        name: "and glints about them",
        svg: glints(
          [
            [n(kind[0] - 4.6), n(kind[1] - 4)],
            [n(kind[0] + 4.6), n(kind[1] - 4.4)],
            [n(kinder[0] - 4.6), n(kinder[1] - 4)],
            [n(kinder[0] + 4.6), n(kinder[1] - 4.4)]
          ],
          0.8
        ),
        keys: showAt(0.82, 0.832),
        loop: twinkle(1300)
      }
    ],
    words: linesOn(FOUR, [
      "Abdullah ibn Amr: he never used bad",
      "Language. He used to say: the best",
      "Amongst you are those who have the best",
      "Manners and character."
    ])
  };
}

export const ADVICE_ART = {
  "curse-parents": curseParents,
  "borrow-to-repay": borrowToRepay,
  "good-word": goodWord,
  "deed-for-paradise": deedForParadise,
  "shorten-the-prayer": shortenThePrayer,
  "best-character": bestCharacter
} as const;
