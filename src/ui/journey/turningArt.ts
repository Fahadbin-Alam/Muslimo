import { cloud, glow, n, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sparkle } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM } from "./worshipArt";
import { care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, bowl, glints, linesOn, mat, plainLand, SEVEN, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { coins } from "./tradeArt";
import { lane } from "./freshArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";
import { horseAt } from "./herdArt";
import { kaaba } from "./rewardArt";

/**
 * Turning back to Allah, and giving: asking forgiveness a hundred times in one sitting; never taking back what was
 * given in charity; giving even a little, a burnt trotter, to one in need at the door; being glad of good deeds and
 * sad over bad ones, which is faith; the Hajj, which is Arafah; and swearing by none but Allah. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. No one is drawn on the horse. Nothing is drawn for Allah, no
 * book, page or letter is drawn, and nothing comes down from the sky: a du'a is glints that rise, and what is good is a
 * light, glints and a soft golden ring. No name, word or number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.496],
  [0.512, 0.742],
  [0.758, 1]
] as const;

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.4],
  [0.416, 0.6],
  [0.616, 0.8],
  [0.816, 1]
] as const;

/** Ibn Umar's place and voice: an olive. */
const IBN_UMAR = "#6E7E4E";
/** Umar's place and voice: a deep blue. */
const UMAR = "#3E5E7A";
/** The places of those sitting: a soft brown. */
const SITTING = "#8C7A6A";
/** The place of the one the horse was given to: a clay red. */
const GIVEN = "#A86A5E";
/** Umm Bujaid's place and voice: a plum. */
const UMM_BUJAID = "#9A5E7A";
/** The place of the one in need: a dusty grey brown. */
const NEEDY = "#9A8A7A";
/** The place of one sitting at al-Jabiyah whose deeds are shown: a green. */
const SHOWN = "#4E8A6E";
/** Grief: a soft blue grey. */
const GRIEF = "#7E8EA8";
/** Abd ar-Rahman ibn Ya'mar's place and voice: a warm brown. */
const YAMAR = "#8A6E4E";
/** The places of those at Arafah: a sand brown. */
const AT_ARAFAH = "#B49A78";
/** The places and voices of those of Najd: a dusk purple. */
const NAJD = "#7A6E9A";
/** The caller's place and voice: a deep green. */
const CALLER = "#4E6E5E";
/** Sa'd ibn Ubaidah's place and voice: a slate blue. */
const SAAD = "#5E7A9A";
/** What is grey: a voice that swore by other than Allah, what is not to be done. */
const GREY = "#8C8C96";
/** What is heavy: a dark grey. */
const HEAVY = "#5E5E68";

/** A thousandth: times written as the sum of two are kept exact. */
const at3 = (time: number) => Math.round(time * 1000) / 1000;

/** A row of ten small soft golden dots, from (x, y) to the right, `step` apart: ten more of a count. */
const tenDots = (x: number, y: number, step: number) =>
  Array.from({ length: 10 }, (_, i) => `<circle cx="${n(x + i * step)}" cy="${y}" r="0.8" fill="#EDB846" stroke="#B07E2A" stroke-width="0.25"/>`).join("");

/** A stall of the market from x1 to x2, its feet on `foot`: two posts, an awning of cloth and a table of planks. */
const stall = (x1: number, x2: number, foot: number) =>
  `<rect x="${x1}" y="${n(foot - 18)}" width="1.2" height="18" fill="#7E6447"/><rect x="${n(x2 - 1.2)}" y="${n(foot - 18)}" width="1.2" height="18" fill="#7E6447"/>` +
  `<path d="M${n(x1 - 2)} ${n(foot - 18)} L${n(x2 + 2)} ${n(foot - 18)} L${n(x2 - 1)} ${n(foot - 23)} L${n(x1 + 1)} ${n(foot - 23)} Z" fill="#D9B98A"/>` +
  `<path d="M${n(x1 - 2)} ${n(foot - 18)} L${n(x2 + 2)} ${n(foot - 18)}" stroke="#B8955E" stroke-width="0.6"/>` +
  `<rect x="${n(x1 + 0.6)}" y="${n(foot - 6)}" width="${n(x2 - x1 - 1.2)}" height="1.4" fill="#9A7A52"/>` +
  `<path d="M${n(x1 + 2.4)} ${n(foot - 4.6)} L${n(x1 + 2.4)} ${foot} M${n(x2 - 2.4)} ${n(foot - 4.6)} L${n(x2 - 2.4)} ${foot}" stroke="#7E6447" stroke-width="0.8"/>`;

/** A burnt trotter, small and charred, its middle at (x, y): a little food, all there is to give. */
const trotter = (x: number, y: number) =>
  `<path d="M${n(x - 1.8)} ${n(y + 0.5)} Q${n(x - 2)} ${n(y - 0.8)} ${n(x - 0.6)} ${n(y - 0.9)} L${n(x + 1.2)} ${n(y - 0.6)} Q${n(x + 2)} ${n(y - 0.2)} ${n(x + 1.6)} ${n(y + 0.6)} Z" fill="#4E3424"/>` +
  `<path d="M${n(x - 1)} ${n(y - 0.3)} L${n(x + 0.8)} ${n(y - 0.1)}" stroke="#7A5232" stroke-width="0.35" stroke-linecap="round"/>`;

/** A small grey speck, its middle at (x, y). */
const speck = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.8" fill="${GREY}" opacity="0.9"/>`;

/** The Mount of Mercy at Arafah, its foot from x 110 to 148 at y 98: rock, with a few lines of its stones. */
const mountOfMercy = `<path d="M110 98 Q122 80 134 84 Q142 86 148 98 Z" fill="#A88E68"/><path d="M120 89 L123 91 M130 86 L132 89 M139 89 L141 92" stroke="#8E7652" stroke-width="0.6"/>`;

/** The low hills about Jam', on the left. */
const hillsOfJam = `<path d="M0 100 Q10 90 22 94 Q34 88 50 100 Z" fill="#B49A72"/><path d="M14 93 L16 95.4 M32 91 L34 93.6" stroke="#9A8060" stroke-width="0.6"/>`;

// A hundred times in one sitting. Ibn Umar said: in one sitting of the Messenger of Allah ﷺ, one could count that he
// said a hundred times, before he would get up: O my Lord, forgive me, and accept my repentance; verily, You are the
// Oft-Returning, the Most Forgiving (Jami at-Tirmidhi 3434). The words leave out its last part, which is said to Allah,
// and "a hundred time" is mended to "a hundred times". No one is drawn: the masjid of Madinah on the left, a mat by it,
// his place on it, a golden ring, and the places of those sitting with him. Ibn Umar's voice tells of it. His voice
// speaks, soft and golden, and the count shows in the air above the mat, a row of ten soft golden dots at a time, ten
// rows: a hundred. A soft golden ring comes about the count: all in one sitting. Then glints rise from his place: his
// du'a, asking forgiveness and that his repentance be accepted; and a soft golden ring comes about his place.
function aHundredTimes(): SignArt {
  const his: [number, number] = [64, 104.2];
  const ibnUmar: [number, number] = [154, 106.8];
  const sitting: [number, number][] = [
    [74, 105.4],
    [82, 104.6],
    [90, 105.6]
  ];
  const rise: [number, number][] = [
    [-2.2, -4.6],
    [0, -6],
    [2.2, -4.6]
  ];
  return {
    kind: "a-hundred-times",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(136, 20) },
      { name: "a cloud", svg: cloud(40, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[124, 92, 7.2]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 100, 0.72) },
      { name: "a mat by the masjid", svg: mat(77, 105.4, 30) },
      ...Array.from({ length: 10 }, (_, i) => {
        const from = at3(0.27 + i * 0.02);
        return {
          name: `the count: a row ${i + 1} of ten soft golden dots`,
          svg: tenDots(62, n(70 + i * 2.2), 3.4),
          keys: showAt(from, at3(from + 0.008))
        };
      }),
      { name: "a hundred, in one sitting: a soft golden ring about the count", svg: care(77.3, 79.9, 20, 12.6, SOFT_GOLD), keys: showAt(0.52, 0.535), loop: soft },
      { name: "the places of those sitting with him", svg: sitting.map(([x, y]) => someone(x, y, 1.5, SITTING)).join("") },
      { name: "his place, a golden ring, on the mat", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: asking forgiveness", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.27, 0.276, 0.9, 0.906), loop: speaking },
      ...rise.map(([dx, dy], i) => ({
        name: `his du'a: a glint ${i + 1}, rising from his place`,
        svg: sparkle(n(his[0] + dx), n(his[1] + dy), 1.5, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.77, 0],
            [0.78, 1]
          ],
          xy: [
            [0.78, 0, 0],
            [0.83, 0, -9]
          ]
        }),
        loop: twinkle(1200 + i * 150)
      })),
      { name: "a soft golden ring about his place", svg: care(his[0], n(his[1] + 0.8), 4.6, 2.3, SOFT_GOLD), keys: showAt(0.88, 0.895), loop: soft },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: telling of it", svg: arcsLeft(n(ibnUmar[0] - 2.4), n(ibnUmar[1] - 3.2), IBN_UMAR), keys: showFor(0.024, 0.03, 0.2, 0.206), loop: speaking }
    ],
    words: linesOn(FOUR, ["Ibn Umar: in one sitting, one could", "Count that he said a hundred times,", "Before he would get up: O my Lord,", "Forgive me, and accept my repentance."])
  };
}

// Never take it back. Ibn Umar said that Umar gave a horse to be used in the cause of Allah. Then he saw it being sold,
// so he wanted to buy it, but the Prophet ﷺ said: do not take back what you have given in charity (Jami at-Tirmidhi
// 668). The words name Umar where the page says "he saw" and "he wanted", since he alone means the Prophet ﷺ in the
// words. No one is drawn, and no one is on the horse: Umar's home on the left and his place by it; the place of the one
// he gave the horse to; a stall of the market; and the masjid of Madinah on the right, his place by it, a golden ring.
// Ibn Umar's voice tells of it. A horse shows by Umar's place and goes to the other place: given. Then it is led to the
// market, coins show on the stall's table: being sold; and Umar's place goes toward it: he wanted to buy it. His voice
// speaks, soft and golden, and a grey dashed ring comes about the coins: not to be bought back. Umar's place goes back
// home, glints show over the horse, still given, and a soft golden ring comes about Umar's place.
function neverTakeItBack(): SignArt {
  const umar: [number, number] = [24, 104.6];
  const given: [number, number] = [50, 104.4];
  const horse: [number, number] = [36, 105.6];
  const his: [number, number] = [133.4, 104.2];
  const ibnUmar: [number, number] = [154, 106.8];
  const sold: [number, number] = [91, 105.6];
  const over: [number, number][] = [
    [-3.4, -12.6],
    [0, -14.2],
    [3.4, -12.6]
  ];
  return {
    kind: "never-take-it-back",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(96, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[64, 92, 7]], "the lane"),
      { name: "Umar's home", svg: home(12, 99, 16, 10) },
      { name: "the market: a stall", svg: stall(100, 116, 104.6) },
      { name: "the masjid of Madinah", svg: madinahMasjid(120, 100, 0.56) },
      { name: "the lane", svg: lane([[20, 104.4], [60, 104.8], [98, 104.6]]) },
      { name: "being sold: coins on the stall's table", svg: coins(108, 97.6, 3), keys: showAt(0.42, 0.44) },
      { name: "not to be bought back: a grey dashed ring about the coins", svg: care(108, 96.8, 4.4, 2.6, GREY), keys: showAt(0.68, 0.695) },
      {
        name: "a horse, given in charity, no one on it",
        svg: horseAt(horse[0], horse[1], 0.15),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          xy: [
            [0.08, 0, 0],
            [0.15, 26, 0],
            [0.24, 26, 0],
            [0.33, n(sold[0] - horse[0]), n(sold[1] - horse[1])]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: -0.3 }
      },
      { name: "still given: glints over the horse", svg: glints(over.map(([dx, dy]) => [n(sold[0] + dx), n(sold[1] + dy)])), keys: showAt(0.9, 0.915), loop: twinkle() },
      {
        name: "the place of the one Umar gave it to, leading it to the market",
        svg: someone(given[0], given[1], 1.5, GIVEN),
        keys: track({
          xy: [
            [0.24, 0, 0],
            [0.33, 30, 0.2]
          ]
        })
      },
      {
        name: "Umar's place, going toward the market, then back home",
        svg: someone(umar[0], umar[1], 1.5, UMAR),
        keys: track({
          xy: [
            [0.46, 0, 0],
            [0.55, 46, 0.2],
            [0.82, 46, 0.2],
            [0.9, 0, 0]
          ]
        })
      },
      { name: "a soft golden ring about Umar's place", svg: care(umar[0], n(umar[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.92, 0.935), loop: soft },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice, soft and golden: do not take it back", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.62, 0.626, 0.96, 0.966), loop: speaking },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: telling of it", svg: arcsLeft(n(ibnUmar[0] - 2.4), n(ibnUmar[1] - 3.2), IBN_UMAR), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(FIVE, ["Ibn Umar: Umar gave a horse to be used", "In the cause of Allah. Then Umar saw", "It being sold, and wanted to buy it,", "But he said: do not take back what", "You have given in charity."])
  };
}

// Even a little. Umm Bujaid said: O Messenger of Allah, there is a needy person who stands outside my door, but I
// cannot find anything to give to him. So the Messenger of Allah ﷺ said to her: if you do not find anything to give
// him except a burnt trotter, then hand it over to him (Jami at-Tirmidhi 665). The words leave out "to him", since him
// alone means the Prophet ﷺ in the words. No one is drawn: Umm Bujaid's home on the left and her place by it, a lane
// to its door; the masjid of Madinah on the right and his place by it, a golden ring. Her voice speaks. The place of
// one in need comes along the lane and stands at her door. An empty bowl shows by her, and a grey dashed ring about
// it: nothing to give. His voice answers, soft and golden. A burnt trotter, small and dark, shows in the bowl, and the
// grey ring goes; it goes to the one at the door, a soft golden ring comes about that place, and glints over hers.
function evenALittle(): SignArt {
  const her: [number, number] = [44, 104.6];
  const needy: [number, number] = [6, 105];
  const atDoor: [number, number] = [31, 104.8];
  const bowlAt: [number, number] = [50.4, 106.2];
  const food: [number, number] = [50.4, 104.6];
  const his: [number, number] = [119.8, 104.2];
  const over: [number, number][] = [
    [-2.2, -4.8],
    [0, -6.2],
    [2.2, -4.8]
  ];
  return {
    kind: "even-a-little",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(64, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[146, 92, 7.2]]),
      { name: "Umm Bujaid's home", svg: home(40, 99, 22, 12) },
      { name: "the masjid of Madinah", svg: madinahMasjid(104, 100, 0.66) },
      { name: "the lane to her door", svg: lane([[2, 104.6], [18, 105], [32, 104.6]]) },
      { name: "an empty bowl by her", svg: big(bowl(bowlAt[0], bowlAt[1]), bowlAt[0], bowlAt[1], 1.4), keys: showAt(0.34, 0.355) },
      { name: "nothing to give: a grey dashed ring about the bowl", svg: care(bowlAt[0], n(bowlAt[1] - 0.6), 5, 2.4, GREY), keys: showFor(0.37, 0.385, 0.7, 0.715) },
      {
        name: "a burnt trotter, small and dark: in the bowl, then handed over",
        svg: big(trotter(food[0], food[1]), food[0], food[1], 1.4),
        keys: track({
          opacity: [
            [0.7, 0],
            [0.715, 1]
          ],
          xy: [
            [0.82, 0, 0],
            [0.88, n(atDoor[0] + 2.4 - food[0]), n(atDoor[1] + 0.6 - food[1])]
          ]
        })
      },
      { name: "Umm Bujaid's place, by her home", svg: someone(her[0], her[1], 1.5, UMM_BUJAID) },
      { name: "Umm Bujaid's voice: telling him", svg: arcs(n(her[0] + 2.4), n(her[1] - 3.2), UMM_BUJAID), keys: showFor(0.024, 0.03, 0.42, 0.426), loop: speaking },
      {
        name: "the place of one in need, coming along the lane to her door",
        svg: someone(needy[0], needy[1], 1.5, NEEDY),
        keys: track({
          opacity: [
            [0.18, 0],
            [0.19, 1]
          ],
          xy: [
            [0.18, 0, 0],
            [0.26, n(atDoor[0] - needy[0]), n(atDoor[1] - needy[1])]
          ]
        })
      },
      { name: "given: a soft golden ring about the place at the door", svg: care(atDoor[0], n(atDoor[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft },
      { name: "glints over her place", svg: glints(over.map(([dx, dy]) => [n(her[0] + dx), n(her[1] + dy)])), keys: showAt(0.92, 0.935), loop: twinkle() },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: give even this", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.5, 0.506, 0.96, 0.966), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Umm Bujaid said to him: there is a",
      "Needy person who stands outside my",
      "Door, but I cannot find anything to",
      "Give. So he said to her: if you do not",
      "Find anything to give except a burnt",
      "Trotter, then hand it over."
    ])
  };
}

// Glad and sad. Ibn Umar said: Umar gave a khutbah to us at al-Jabiyah. He said: O you people, indeed I have stood
// among you as the Messenger of Allah ﷺ stood among us, and he said: ... whoever rejoices with his good deeds and
// grieves over his evil deeds, then that is the believer among you (Jami at-Tirmidhi 2165). The words leave out the
// middle of what he said, and name Umar where the page says "he said". No one is drawn: the green land of al-Jabiyah,
// Umar's place standing before the places of those sitting. Ibn Umar's voice tells of it. Umar's voice speaks, and a
// soft light comes about his place, standing among them. Far off, the masjid of Madinah shows, and his place by it, a
// golden ring: as he stood among them; and his voice speaks, soft and golden. A glint shows by one of the places, a
// good deed, and a warm golden light comes about it: glad of it. A grey speck shows by it, a bad deed, and a soft
// blue-grey ring comes about it: sad over it. Then a soft golden ring comes about it, and glints over it: that is faith.
function gladAndSad(): SignArt {
  const umar: [number, number] = [36, 103.8];
  const shown: [number, number] = [72, 105.6];
  const his: [number, number] = [122.6, 90.6];
  const ibnUmar: [number, number] = [154, 106.8];
  const sitting: [number, number][] = [
    [56, 105.4],
    [64, 104.4],
    [80, 104.6],
    [88, 105.6],
    [96, 104.8]
  ];
  const over: [number, number][] = [
    [-2.4, -5.2],
    [0, -6.8],
    [2.4, -5.2]
  ];
  return {
    kind: "glad-and-sad",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(92, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      { name: "the green hills of al-Jabiyah", svg: hills("#A9B48A") },
      { name: "the land", svg: plainLand("#CFCF9E", [[20, 116], [70, 118], [140, 117]]) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(112, 88, 0.44), keys: showAt(0.46, 0.48) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.8, GOLD), keys: showAt(0.46, 0.48) },
      { name: "his voice, soft and golden, far off", svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: showFor(0.5, 0.506, 0.96, 0.966), loop: speaking },
      { name: "standing among them: a soft light about Umar's place", svg: glow(umar[0], n(umar[1] - 0.6), 4.4, "#FFF3CF", 0.22), keys: showAt(0.32, 0.34), loop: soft },
      { name: "Umar's place, standing before them", svg: someone(umar[0], umar[1], 1.5, UMAR) },
      { name: "Umar's voice: the khutbah", svg: arcs(n(umar[0] + 2.4), n(umar[1] - 3.2), UMAR), keys: showFor(0.17, 0.176, 0.54, 0.546), loop: speaking },
      { name: "the places of those sitting before him", svg: sitting.map(([x, y]) => someone(x, y, 1.5, SITTING)).join("") },
      { name: "glad of its good deeds: a warm golden light about its place", svg: glow(shown[0], n(shown[1] - 0.6), 5, WARM, 0.3), keys: showAt(0.63, 0.65), loop: soft },
      { name: "the place of one sitting among them", svg: someone(shown[0], shown[1], 1.5, SHOWN) },
      { name: "a good deed: a glint by its place", svg: sparkle(n(shown[0] + 3), n(shown[1] - 4.4), 1.3, "#FFE7A0"), keys: showAt(0.6, 0.61), loop: twinkle() },
      { name: "a bad deed: a grey speck by its place", svg: speck(n(shown[0] - 3), n(shown[1] - 4)), keys: showAt(0.745, 0.755) },
      { name: "sad over its bad deeds: a soft blue-grey ring about its place", svg: care(shown[0], n(shown[1] + 0.8), 4.4, 2.2, GRIEF), keys: showAt(0.77, 0.79), loop: soft },
      { name: "that is faith: a soft golden ring about its place", svg: care(shown[0], n(shown[1] + 0.8), 6, 3, SOFT_GOLD), keys: showAt(0.89, 0.905), loop: soft },
      { name: "glints over it", svg: glints(over.map(([dx, dy]) => [n(shown[0] + dx), n(shown[1] + dy)])), keys: showAt(0.91, 0.925), loop: twinkle() },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: telling of it", svg: arcsLeft(n(ibnUmar[0] - 2.4), n(ibnUmar[1] - 3.2), IBN_UMAR), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Ibn Umar: Umar gave a khutbah to us at",
      "Al-Jabiyah. Umar said: O you people,",
      "Indeed I have stood among you as",
      "He stood among us, and he said:",
      "Whoever rejoices with his good deeds",
      "And grieves over his evil deeds,",
      "Then that is the believer among you."
    ])
  };
}

// The Hajj is Arafah. Abd ar-Rahman ibn Ya'mar said that some people of Najd came to the Messenger of Allah ﷺ while
// he was at Arafat. They were questioning him, so he ordered a caller to proclaim: the Hajj is Arafah. Whoever came to
// Jam during the night, before the time of Fajr, then he has attended the Hajj (Jami at-Tirmidhi 889). The words leave
// out "among the residents", and the days of Mina that follow. No one is drawn and no one rides: the plain of Arafah,
// the Mount of Mercy, his place at its foot, a golden ring, and the places of those at Arafah; on the left, the low
// hills about Jam. Abd ar-Rahman's voice tells of it. The places of those of Najd come from the right, and their voices
// ask. His voice speaks to the caller, and the caller's voice calls out on both sides. A soft golden ring comes about
// the plain: the Hajj is Arafah. Night comes, the stars show, and the places go to Jam; soft golden rings come about
// them there, and glints over them: they have attended the Hajj.
function hajjIsArafah(): SignArt {
  const his: [number, number] = [104, 104.2];
  const caller: [number, number] = [86, 102.8];
  const yamar: [number, number] = [154, 106.8];
  const pilgrims: [number, number][] = [
    [82, 107.2],
    [94, 108.2],
    [114, 108],
    [126, 107.2],
    [136, 108.4]
  ];
  const najdFrom: [number, number][] = [
    [140, 103.4],
    [146, 102],
    [150, 104.6]
  ];
  const najdTo: [number, number][] = [
    [112, 103],
    [118, 101.8],
    [122, 104.2]
  ];
  const jam: [number, number][] = [
    [10, 104.6],
    [16, 107.4],
    [22, 104.2],
    [28, 106.8],
    [34, 104.6],
    [40, 107.4],
    [46, 104.8],
    [18, 101.8]
  ];
  const over: [number, number][] = [
    [16, 99.6],
    [28, 98.6],
    [40, 99.6]
  ];
  const nightFrom = 0.75;
  const nightTo = 0.835;
  return {
    kind: "hajj-is-arafah",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(36, 20) },
      { name: "a cloud", svg: cloud(100, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 11000 } },
      {
        name: "the night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.745, 0],
            [0.775, 0.95]
          ]
        })
      },
      {
        name: "stars of the night",
        svg: stars([
          [12, 14],
          [30, 34],
          [52, 12],
          [74, 30],
          [96, 10],
          [118, 32],
          [138, 14],
          [152, 40]
        ]),
        keys: showAt(0.76, 0.78),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the Mount of Mercy", svg: mountOfMercy },
      { name: "the low hills about Jam", svg: hillsOfJam },
      { name: "the Hajj is Arafah: a soft golden ring about the plain", svg: care(108, 106, 30, 5, SOFT_GOLD), keys: showAt(0.6, 0.62), loop: soft },
      {
        name: "the night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.745, 0],
            [0.775, 1]
          ]
        })
      },
      { name: "his place, a golden ring, below the Mount of Mercy", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden: to the caller", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.456, 0.462, 0.53, 0.536), loop: speaking },
      { name: "the caller's place", svg: someone(caller[0], caller[1], 1.5, CALLER) },
      {
        name: "the caller's voice, calling out on both sides",
        svg: arcs(n(caller[0] + 2.4), n(caller[1] - 3.2), CALLER) + arcsLeft(n(caller[0] - 2.4), n(caller[1] - 3.2), CALLER),
        keys: showFor(0.54, 0.546, 0.95, 0.956),
        loop: speaking
      },
      ...pilgrims.map(([x, y], i) => ({
        name: `the place of one at Arafah ${i + 1}, going to Jam in the night`,
        svg: someone(x, y, 1.5, AT_ARAFAH),
        keys: track({
          xy: [
            [nightFrom, 0, 0],
            [nightTo, n(jam[i][0] - x), n(jam[i][1] - y)]
          ]
        })
      })),
      ...najdFrom.map(([x, y], i) => ({
        name: `the place of one of Najd ${i + 1}, coming to ask, then going to Jam in the night`,
        svg: someone(x, y, 1.5, NAJD),
        keys: track({
          opacity: [
            [0.168, 0],
            [0.176, 1]
          ],
          xy: [
            [0.17, 0, 0],
            [0.25, n(najdTo[i][0] - x), n(najdTo[i][1] - y)],
            [nightFrom, n(najdTo[i][0] - x), n(najdTo[i][1] - y)],
            [nightTo, n(jam[pilgrims.length + i][0] - x), n(jam[pilgrims.length + i][1] - y)]
          ]
        })
      })),
      { name: "the voices of those of Najd: asking him", svg: arcsLeft(n(najdTo[0][0] - 2.4), n(najdTo[0][1] - 3.2), NAJD), keys: showFor(0.31, 0.316, 0.4, 0.406), loop: speaking },
      { name: "at Jam before Fajr: a soft golden ring about their places", svg: care(28, 105.6, 23, 4.6, SOFT_GOLD), keys: showAt(0.89, 0.905), loop: soft },
      { name: "glints over them", svg: glints(over), keys: showAt(0.91, 0.925), loop: twinkle() },
      { name: "Abd ar-Rahman's place", svg: someone(yamar[0], yamar[1], 1.5, YAMAR) },
      { name: "Abd ar-Rahman's voice: telling of it", svg: arcsLeft(n(yamar[0] - 2.4), n(yamar[1] - 3.2), YAMAR), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(SEVEN, [
      "Abd ar-Rahman ibn Ya'mar: some people",
      "Of Najd came to him while he was at",
      "Arafat. They were questioning him, so",
      "He ordered a caller to proclaim:",
      "The Hajj is Arafah. Whoever came to",
      "Jam during the night, before the time",
      "Of Fajr, then he has attended the Hajj."
    ])
  };
}

// Only by Allah. Sa'd ibn Ubaidah said that Ibn Umar heard a man saying: no, by the Ka'bah. So Ibn Umar said: nothing
// is sworn by other than Allah, for I heard the Messenger of Allah ﷺ say: whoever swears by other than Allah, he has
// committed disbelief or shirk (Jami at-Tirmidhi 1535). No one is drawn, and nothing is drawn for Allah: the place of
// one who swore, and Ibn Umar's place by it. Sa'd's voice tells of it. The other's voice speaks, grey, and far off on
// the left the Ka'bah shows: what it swore by. Ibn Umar's voice answers. Far off on the right, the masjid of Madinah
// shows, and his place by it, a golden ring; his voice speaks, soft and golden. A grey dashed ring comes about the
// place that swore, and then a heavy grey ring: disbelief or shirk.
function onlyByAllah(): SignArt {
  const swore: [number, number] = [58, 104.6];
  const ibnUmar: [number, number] = [80, 104.4];
  const his: [number, number] = [122.6, 90.6];
  const saad: [number, number] = [154, 106.8];
  return {
    kind: "only-by-allah",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 20) },
      { name: "a cloud", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[144, 92, 7]]),
      { name: "far off: the Ka'bah, what it swore by", svg: kaaba(26, 88, 0.85), keys: showAt(0.18, 0.2) },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(112, 88, 0.44), keys: showAt(0.5, 0.52) },
      { name: "far off: his place, a golden ring, by it", svg: ring(his[0], his[1], 1.8, GOLD), keys: showAt(0.5, 0.52) },
      { name: "his voice, soft and golden, far off", svg: arcsLeft(n(his[0] - 2.6), n(his[1] - 2.4), SOFT_GOLD), keys: showFor(0.54, 0.546, 0.96, 0.966), loop: speaking },
      { name: "the place of one who swore", svg: someone(swore[0], swore[1], 1.5, SITTING) },
      { name: "its voice, grey: no, by the Ka'bah", svg: arcs(n(swore[0] + 2.4), n(swore[1] - 3.2), GREY), keys: showFor(0.18, 0.186, 0.26, 0.266), loop: speaking },
      { name: "not to be done: a grey dashed ring about its place", svg: care(swore[0], n(swore[1] + 0.8), 4.4, 2.2, GREY), keys: showAt(0.68, 0.695) },
      { name: "disbelief or shirk: a heavy grey ring about it", svg: care(swore[0], n(swore[1] + 0.8), 6.4, 3.2, HEAVY) + care(swore[0], n(swore[1] + 0.8), 5.4, 2.7, HEAVY), keys: showAt(0.82, 0.84) },
      { name: "Ibn Umar's place", svg: someone(ibnUmar[0], ibnUmar[1], 1.5, IBN_UMAR) },
      { name: "Ibn Umar's voice: answering it", svg: arcsLeft(n(ibnUmar[0] - 2.4), n(ibnUmar[1] - 3.2), IBN_UMAR), keys: showFor(0.34, 0.346, 0.6, 0.606), loop: speaking },
      { name: "Sa'd's place", svg: someone(saad[0], saad[1], 1.5, SAAD) },
      { name: "Sa'd's voice: telling of it", svg: arcsLeft(n(saad[0] - 2.4), n(saad[1] - 3.2), SAAD), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Sa'd ibn Ubaidah: Ibn Umar heard a man",
      "Saying: no, by the Ka'bah. So Ibn Umar",
      "Said: nothing is sworn by other than",
      "Allah, for I heard him say: whoever",
      "Swears by other than Allah, he has",
      "Committed disbelief or shirk."
    ])
  };
}

export const TURNING_ART = {
  "a-hundred-times": aHundredTimes,
  "never-take-it-back": neverTakeItBack,
  "even-a-little": evenALittle,
  "glad-and-sad": gladAndSad,
  "hajj-is-arafah": hajjIsArafah,
  "only-by-allah": onlyByAllah
};
