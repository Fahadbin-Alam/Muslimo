import { animalAt, cloud, flower, glow, n, nightSky, palm, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, sparkle } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun } from "./worshipArt";
import { camel, care, palms, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { showAt, showFor, SOFT_GOLD } from "./roadArt";
import { glints, linesOn, plainLand, SIX, twinkle } from "./shareArt";
import { farHills } from "./wideArt";
import { coins } from "./tradeArt";
import { lane } from "./freshArt";
import { litWindow, nightLand } from "./heedArt";

/**
 * What makes a life beautiful: the five prayers and one Jumu'ah to the next, that wipe away what is between them; the
 * last part of the night, for those who remember Allah; forbearance and taking one's time, two traits Allah loves; haya,
 * that beautifies all it is in; wealth, the test of this ummah; and mercy to all that lives. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn,
 * and nothing comes down from the sky: a prayer or a remembrance is glints that rise, and what is good is a light,
 * glints and a soft golden ring. No name, word or number is written.
 */

/** The words of three lines. */
const THREE = [
  [0.02, 0.32],
  [0.336, 0.66],
  [0.676, 1]
] as const;

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

/** Abu Hurairah's place and voice: a soft purple. */
const HURAIRAH = "#8A6EB0";
/** The place of the one who prays: a slate blue. */
const PRAYS = "#4E6E8E";
/** What is grey: small sins, a harsh voice, a test. */
const GREY = "#8C8C96";
/** The major sins: a heavy dark grey. */
const HEAVY = "#5E5E68";
/** Amr ibn Abasah's place and voice: a light blue, to be seen at night. */
const AMR = "#A8C4E8";
/** The place of the one who remembers Allah at night: a pale cream. */
const REMEMBERS = "#E8D9A8";
/** Ibn Abbas's place and voice: a deep olive. */
const IBN_ABBAS = "#7A6A3E";
/** Al-Ashajj's place: a teal. */
const ASHAJJ = "#3E7A6E";
/** Anas's place and voice: a plum. */
const ANAS = "#9A5E7A";
/** The place of the one with haya, and its light: a soft rose. */
const MODEST = "#C07A90";
/** Ka'b ibn Iyad's place and voice: a dusk blue. */
const KAB = "#5E6E9A";
/** The places of other ummahs: a sand brown and a clay red. */
const OTHERS = ["#A8865E", "#A86A5E"] as const;
/** The places of his ummah: a green. */
const UMMAH = "#4E8A6E";

/** A thousandth: times written as the sum of two are kept exact. */
const at3 = (time: number) => Math.round(time * 1000) / 1000;

/** A small grey speck, its middle at (x, y). */
const speck = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="0.75" fill="${GREY}" opacity="0.9"/>`;

/** The moon full, as in the last part of the nights about the middle of the month: a round of light and its glow. */
const fullMoon = (x: number, y: number, r: number) => glow(x, y, n(r * 2.2), "#FFF3B8", 0.06) + `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3B8"/>`;

/** A bed of earth for flowers, from x1 to x2, its top at y. */
const bed = (x1: number, x2: number, y: number) => `<rect x="${x1}" y="${y}" width="${n(x2 - x1)}" height="2.6" rx="1.2" fill="#B8956A"/>`;

/** A flower bent over, grey and dry, its foot at (x, y). */
const droop = (x: number, y: number) =>
  `<path d="M${x} ${y} Q${x} ${n(y - 5)} ${n(x + 3)} ${n(y - 5.6)}" stroke="#9A9A88" stroke-width="1" fill="none"/>` +
  `<circle cx="${n(x + 3.2)}" cy="${n(y - 4.6)}" r="1.5" fill="#A8A8AE"/><circle cx="${n(x + 4.4)}" cy="${n(y - 5.8)}" r="1.2" fill="#B4B4BA"/>`;

/** A board for shooting at, on its post, its foot's middle at (x, y): rings painted on wood, nothing written. */
const target = (x: number, y: number) =>
  `<rect x="${n(x - 0.7)}" y="${n(y - 12)}" width="1.4" height="12" fill="#8A6A3E"/>` +
  `<circle cx="${x}" cy="${n(y - 15)}" r="5.4" fill="#D9B886" stroke="#8A6A3E" stroke-width="0.6"/>` +
  `<circle cx="${x}" cy="${n(y - 15)}" r="3.6" fill="none" stroke="#B0503E" stroke-width="0.9"/>` +
  `<circle cx="${x}" cy="${n(y - 15)}" r="1.5" fill="#B0503E"/>`;

/** A sparrow of the picture cards, its middle at (x, y), facing right. */
const sparrow = (x: number, y: number) => animalAt("sparrow", n(x - 7), n(y - 5.6), 0.14);

// From Friday to Friday. Abu Hurairah said: the Messenger of Allah ﷺ said: the five prayers, and Jumu'ah to Jumu'ah,
// are atonement for what is between them, as long as the major sins have not been committed (Jami at-Tirmidhi 214;
// the words leave out the translator's "the Friday prayer"). No one is drawn: the masjid of Madinah in the middle,
// a home on the left, and the place of one who prays before the masjid, small grey specks about it. Abu Hurairah's
// voice tells of it. Five glints rise from the masjid one after another: the five prayers; a soft golden ring comes
// about the masjid, goes, and comes again: one Jumu'ah, then the next. The grey specks fade one by one, and a clear
// light comes about the place: atonement. Far off on the right a heavy grey ring shows: the major sins. The place
// stays far from it, and a soft golden ring comes about the place, glints over it.
function fromFridayToFriday(): SignArt {
  const prays: [number, number] = [80, 104.6];
  const hurairah: [number, number] = [154, 106.8];
  const heavy: [number, number] = [128, 106];
  const sins: [number, number][] = [
    [-4.4, -1.4],
    [4.6, -2],
    [-3, -4.8],
    [3.2, -5.4]
  ];
  const over: [number, number][] = [
    [-2.2, -4.4],
    [0, -5.8],
    [2.2, -4.4]
  ];
  return {
    kind: "from-friday-to-friday",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(132, 22) },
      { name: "a cloud", svg: cloud(34, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[140, 92, 7.4]], "the lane"),
      { name: "the masjid of Madinah", svg: madinahMasjid(56, 100, 1) },
      { name: "a home on the left", svg: home(18, 99, 16, 10) },
      { name: "the lane", svg: lane([[26, 103.4], [50, 104.4], [72, 104.2]]) },
      { name: "the place of one who prays, before the masjid", svg: someone(prays[0], prays[1], 1.5, PRAYS) },
      ...sins.map(([dx, dy], i) => ({
        name: `small sins: a grey speck ${i + 1} about its place, then wiped away`,
        svg: speck(n(prays[0] + dx), n(prays[1] + dy)),
        keys: track({
          opacity: [
            [at3(0.45 + i * 0.02), 1],
            [at3(0.465 + i * 0.02), 0]
          ]
        })
      })),
      ...[64, 72, 80, 88, 96].map((x, i) => {
        const from = at3(0.22 + i * 0.02);
        return {
          name: `the five prayers: a glint ${i + 1}, rising from the masjid`,
          svg: sparkle(x, 79.6, 1.4, "#FFE7A0"),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.008), 1]
            ],
            xy: [
              [at3(from + 0.008), 0, 0],
              [at3(from + 0.028), 0, -7]
            ]
          }),
          loop: twinkle(1300 + i * 120)
        };
      }),
      {
        name: "Jumu'ah to Jumu'ah: a soft golden ring about the masjid, then again",
        svg: care(80, 100.4, 28, 3.2, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.334, 0],
            [0.342, 1],
            [0.35, 1],
            [0.355, 0],
            [0.358, 0],
            [0.366, 1]
          ]
        }),
        loop: soft
      },
      { name: "atonement: a clear soft light about its place", svg: glow(prays[0], n(prays[1] - 0.6), 4.4, "#FFFFFF", 0.22), keys: showAt(0.53, 0.55), loop: soft },
      { name: "the major sins: a heavy grey ring, far off", svg: care(heavy[0], heavy[1], 6.4, 3, HEAVY) + care(heavy[0], heavy[1], 4.4, 2, HEAVY), keys: showAt(0.63, 0.65) },
      { name: "kept away: a soft golden ring about its place", svg: care(prays[0], n(prays[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.84, 0.855), loop: soft },
      { name: "glints over it", svg: glints(over.map(([dx, dy]) => [n(prays[0] + dx), n(prays[1] + dy)])), keys: showAt(0.87, 0.885), loop: twinkle() },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(hurairah[0] - 2.4), n(hurairah[1] - 3.2), HURAIRAH), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(FIVE, ["Abu Hurairah: he said:", "The five prayers, and Jumu'ah to Jumu'ah,", "Are atonement for what is between them,", "As long as the major sins", "Have not been committed."])
  };
}

// The last part of the night. Amr ibn Abasah heard the Prophet ﷺ say: the closest that the Lord is to a worshipper is
// during the last part of the night, so if you are able to be of those who remember Allah in that hour, then do so
// (Jami at-Tirmidhi 3579; the words leave out who told it from Amr). No one is drawn, and nothing is drawn for the
// Lord: at night, stars and a full moon over the hills, a home on the left with the place of one before it, resting,
// and a home far off. Amr's voice tells of it. The moon moves on across the sky, never down: the night passes into
// its last part. Then the window of the home is lit, the place is awake, a soft light about it, and glints rise from
// it: it remembers Allah. A soft golden ring comes about it.
function lastPartOfTheNight(): SignArt {
  const remembers: [number, number] = [44, 104.2];
  const amr: [number, number] = [154, 106.8];
  const rise: [number, number][] = [
    [-2.2, -4.6],
    [0, -6],
    [2.2, -4.6]
  ];
  return {
    kind: "last-part-of-the-night",
    ms: 10000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars",
        svg: stars([
          [10, 14],
          [28, 36],
          [46, 18],
          [64, 42],
          [82, 12],
          [100, 34],
          [124, 14],
          [146, 30],
          [150, 50],
          [18, 52]
        ]),
        loop: { move: "twinkle", ms: 2400, low: 0.5 }
      },
      { name: "the moon, moving on across the sky as the night passes", svg: fullMoon(96, 24, 4), keys: track({ xy: [[0.35, 0, 0], [0.45, 14, 0], [0.5, 14, 0], [0.6, 28, 0]] }) },
      { name: "the hills at night", svg: hills("#3A466E") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [20, 114],
          [90, 116],
          [150, 115]
        ])
      },
      { name: "a home on the left", svg: home(28, 99, 18, 11, "#8E7A66", "#7A6855", "#2A2238") },
      { name: "a home far off", svg: home(104, 96, 12, 8, "#8E7A66", "#7A6855", "#2A2238") },
      { name: "in that hour: the window of the home, lit", svg: litWindow(28, 99, 11), keys: showAt(0.67, 0.69) },
      { name: "the place of one before its home, resting, then awake", svg: someone(remembers[0], remembers[1], 1.5, REMEMBERS), keys: track({ opacity: [[0.66, 0.45], [0.68, 1]] }) },
      { name: "awake: a soft light about its place", svg: glow(remembers[0], n(remembers[1] - 0.6), 4, "#FFF3CF", 0.2), keys: showAt(0.68, 0.7), loop: soft },
      ...rise.map(([dx, dy], i) => ({
        name: `remembering: a glint ${i + 1}, rising`,
        svg: sparkle(n(remembers[0] + dx), n(remembers[1] + dy), 1.1, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.7, 0],
            [0.71, 1]
          ],
          xy: [
            [0.71, 0, 0],
            [0.76, 0, -9]
          ]
        }),
        loop: twinkle(1200 + i * 150)
      })),
      { name: "a soft golden ring about its place", svg: care(remembers[0], n(remembers[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "Amr's place", svg: someone(amr[0], amr[1], 1.5, AMR) },
      { name: "Amr's voice: telling of it", svg: arcsLeft(n(amr[0] - 2.4), n(amr[1] - 3.2), AMR), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Amr ibn Abasah heard him say:",
      "The closest that the Lord is to a",
      "Worshipper is during the last part of",
      "The night, so if you are able to be of",
      "Those who remember Allah in that hour,",
      "Then do so."
    ])
  };
}

// Two traits loved. Ibn Abbas said: the Messenger of Allah ﷺ said to al-Ashajj of Abd al-Qais: indeed there are two
// traits in you that Allah loves: forbearance, and deliberateness (Jami at-Tirmidhi 2011). No one is drawn and no one
// rides: the masjid of Madinah on the left and his place, a golden ring, by it; a camel at rest on the right, no one on
// it. Ibn Abbas's voice tells of it. Al-Ashajj's place comes along the lane at an even pace and stops before his place.
// His voice speaks, soft and golden, and a soft golden ring comes about al-Ashajj's place: loved. Then a calm soft
// light comes about it: forbearance; and glints show one by one, evenly, along the way it came: deliberateness.
function twoLovedTraits(): SignArt {
  const his: [number, number] = [46, 103.6];
  const ashajj: [number, number] = [100, 104.6];
  const stops: [number, number] = [64, 104.4];
  const ibnAbbas: [number, number] = [154, 106.8];
  return {
    kind: "two-loved-traits",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(100, 20) },
      { name: "a cloud", svg: cloud(60, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[120, 92, 7.2]], "the lane"),
      { name: "the masjid of Madinah", svg: madinahMasjid(6, 100, 0.66) },
      { name: "the lane", svg: lane([[54, 105.4], [90, 105.6], [126, 104.8]]) },
      { name: "a camel of Abd al-Qais, at rest, no one on it", svg: camel(138, 104, 0.16, true), loop: { move: "bob", ms: 2600, y: -0.3 } },
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "al-Ashajj's place, coming along the lane at an even pace",
        svg: someone(ashajj[0], ashajj[1], 1.5, ASHAJJ),
        keys: track({ xy: [[0.04, 0, 0], [0.22, n(stops[0] - ashajj[0]), n(stops[1] - ashajj[1])]] })
      },
      { name: "his voice, soft and golden: two traits in you", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.3, 0.306, 0.96, 0.966), loop: speaking },
      { name: "loved: a soft golden ring about al-Ashajj's place", svg: care(stops[0], n(stops[1] + 0.8), 4.4, 2.2, SOFT_GOLD), keys: showAt(0.6, 0.615), loop: soft },
      { name: "forbearance: a calm soft light about it", svg: glow(stops[0], n(stops[1] - 0.6), 5, "#DFF2EC", 0.24), keys: showAt(0.78, 0.8), loop: soft },
      ...[72, 80, 88, 96].map((x, i) => ({
        name: `deliberateness: a glint ${i + 1} along its way, evenly`,
        svg: sparkle(x, 104.6, 1.2, "#FFE7A0"),
        keys: showAt(at3(0.85 + i * 0.015), at3(0.858 + i * 0.015)),
        loop: twinkle(1300 + i * 120)
      })),
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcsLeft(n(ibnAbbas[0] - 2.4), n(ibnAbbas[1] - 3.2), IBN_ABBAS), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(FOUR, ["Ibn Abbas: he said to al-Ashajj of", "Abd al-Qais: indeed there are two traits", "In you that Allah loves:", "Forbearance, and deliberateness."])
  };
}

// Haya beautifies it. Anas said: the Messenger of Allah ﷺ said: al-fuhsh is not present in anything but it mars it,
// and al-haya is not present in anything but it beautifies it (Jami at-Tirmidhi 1974). No one is drawn: two small
// gardens of flowers, the place of one by the garden on the left, and the place of another by the garden on the right.
// Anas's voice tells of it. The voice by the left garden speaks, harsh and grey: al-fuhsh; the flowers there go grey
// and droop, and a grey dashed ring comes about the garden: marred. A soft rosy light comes about the place by the
// right garden, and over the garden: al-haya. Then that garden comes into full bloom, glints over it, and a soft golden
// ring comes about it: beautified.
function hayaBeautifies(): SignArt {
  const harsh: [number, number] = [56, 104.6];
  const modest: [number, number] = [88, 104.6];
  const anas: [number, number] = [154, 106.8];
  const left = [24, 31, 38, 45];
  const right = [100, 107, 114, 121];
  const petals = ["#E86A8A", "#F2B84A", "#9A7AD8", "#E86A8A"];
  return {
    kind: "haya-beautifies",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(78, 20) },
      { name: "a cloud", svg: cloud(130, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms([[72, 92, 7.2]], "the gardens"),
      { name: "the beds of the two gardens", svg: bed(20, 50, 104.4) + bed(96, 126, 104.4) },
      {
        name: "a garden on the left, its flowers fresh",
        svg: left.map((x, i) => flower(x, 104.6, petals[i], 8)).join(""),
        keys: track({
          opacity: [
            [0.34, 1],
            [0.37, 0]
          ]
        })
      },
      { name: "marred: its flowers grey and drooping", svg: left.map((x) => droop(x, 104.6)).join(""), keys: showAt(0.34, 0.37) },
      { name: "a grey dashed ring about it", svg: care(35, 105.4, 18, 3.2, GREY), keys: showAt(0.38, 0.395) },
      { name: "the place of one by the garden on the left", svg: someone(harsh[0], harsh[1], 1.5, GREY) },
      { name: "al-fuhsh: its voice, harsh and grey", svg: arcsLeft(n(harsh[0] - 2.4), n(harsh[1] - 3.2), GREY), keys: showFor(0.27, 0.276, 0.33, 0.336), loop: speaking },
      {
        name: "a garden on the right, its flowers small",
        svg: right.map((x, i) => flower(x, 104.6, petals[i], 5.4)).join(""),
        keys: track({
          opacity: [
            [0.78, 1],
            [0.81, 0]
          ]
        })
      },
      {
        name: "beautified: the garden in full bloom",
        svg: right.map((x, i) => flower(x, 104.6, petals[i], 9)).join("") + [103.5, 110.5, 117.5].map((x, i) => flower(x, 104.6, petals[(i + 1) % 4], 7)).join(""),
        keys: showAt(0.78, 0.81)
      },
      { name: "the place of one by the garden on the right", svg: someone(modest[0], modest[1], 1.5, MODEST) },
      { name: "al-haya: a soft rosy light about its place", svg: glow(modest[0], n(modest[1] - 0.6), 4, "#F6D2DC", 0.26), keys: showAt(0.55, 0.57), loop: soft },
      { name: "al-haya in it: a soft rosy light over the garden", svg: glow(111, 100, 10, "#F6D2DC", 0.16), keys: showAt(0.62, 0.65), loop: soft },
      {
        name: "glints over it",
        svg: glints([
          [103, 92],
          [111, 89.6],
          [119, 92]
        ]),
        keys: showAt(0.84, 0.855),
        loop: twinkle()
      },
      { name: "a soft golden ring about it", svg: care(111, 105.4, 18, 3.2, SOFT_GOLD), keys: showAt(0.88, 0.895), loop: soft },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5, ANAS) },
      { name: "Anas's voice: telling of it", svg: arcsLeft(n(anas[0] - 2.4), n(anas[1] - 3.2), ANAS), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(FOUR, ["Anas: he said: al-fuhsh is not present in", "Anything but it mars it, and al-haya is", "Not present in anything but it", "Beautifies it."])
  };
}

// The test of wealth. Ka'b ibn Iyad said: the Prophet ﷺ said: indeed there is a fitnah for every ummah, and the fitnah
// for my ummah is wealth (Jami at-Tirmidhi 2336). No one is drawn: the places of an ummah by its homes on the left and
// of another in the middle; the masjid of Madinah on the right, his place, a golden ring, by it, and the places of his
// ummah before it. Ka'b's voice tells of it, and his voice speaks, soft and golden. A grey dashed ring comes about each
// ummah in turn: a fitnah, a test, for every one. Then coins of gold and silver show before his ummah, and a grey dashed
// ring comes about them: its test is wealth.
function theTestOfWealth(): SignArt {
  const his: [number, number] = [92, 103.6];
  const kab: [number, number] = [154, 106.8];
  const groups: [number, number][][] = [
    [
      [12, 103.6],
      [20, 104.4],
      [28, 103.6]
    ],
    [
      [50, 103.6],
      [58, 104.4],
      [66, 103.6]
    ]
  ];
  const ummah: [number, number][] = [
    [108, 103.6],
    [116, 104.4],
    [124, 103.6]
  ];
  return {
    kind: "the-test-of-wealth",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(60, 20) },
      { name: "a cloud", svg: cloud(112, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the homes of an ummah on the left", svg: home(14, 98.6, 12, 8) + home(28, 99, 11, 7.6) },
      { name: "the homes of another in the middle", svg: home(52, 98.6, 12, 8, "#C9A07A", "#B08A64", "#6B4A2E") + home(66, 99, 11, 7.6, "#C9A07A", "#B08A64", "#6B4A2E") },
      { name: "the masjid of Madinah", svg: madinahMasjid(98, 100, 0.8) },
      ...groups.flatMap((group, g) =>
        group.map(([x, y], i) => ({ name: `the places of an ummah ${g + 1}: ${i + 1}`, svg: someone(x, y, 1.4, OTHERS[g]) }))
      ),
      ...ummah.map(([x, y], i) => ({ name: `the places of his ummah: ${i + 1}`, svg: someone(x, y, 1.4, UMMAH) })),
      { name: "his place, a golden ring, by the masjid", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice, soft and golden", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.12, 0.126, 0.9, 0.906), loop: speaking },
      { name: "a fitnah for every ummah: a grey dashed ring about the first", svg: care(20, 104.6, 12, 3, GREY), keys: showAt(0.36, 0.375) },
      { name: "a fitnah for every ummah: a grey dashed ring about the second", svg: care(58, 104.6, 12, 3, GREY), keys: showAt(0.42, 0.435) },
      { name: "a fitnah for his ummah too: a grey dashed ring about it", svg: care(116, 104.6, 12, 3, GREY), keys: showAt(0.48, 0.495) },
      { name: "wealth: coins of gold and silver before his ummah", svg: coins(110, 107.2, 3) + coins(116, 107.4, 4, "#D8DCE2", "#A8AEB8") + coins(122, 107.2, 3), keys: showAt(0.7, 0.72) },
      { name: "its test: a grey dashed ring about the coins", svg: care(116, 106.4, 10, 2.2, GREY), keys: showAt(0.76, 0.775) },
      { name: "Ka'b's place", svg: someone(kab[0], kab[1], 1.5, KAB) },
      { name: "Ka'b's voice: telling of it", svg: arcsLeft(n(kab[0] - 2.4), n(kab[1] - 3.2), KAB), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(THREE, ["Ka'b ibn Iyad: he said: indeed there is", "A fitnah for every ummah, and the fitnah", "For my ummah is wealth."])
  };
}

// Not a target. Ibn Abbas said: the Messenger of Allah ﷺ prohibited taking a living thing as a shooting target (Jami
// at-Tirmidhi 1475). No one is drawn and nothing is shot: a field with a palm on each side and, between them, a board
// for shooting at, on its post. Ibn Abbas's voice tells of it. A sparrow flies from the palm on the left to the board
// and sits on it: a living thing; a grey dashed ring comes about it: not as a target. Then the ring goes, the sparrow
// flies on, free, to the palm on the right, and a soft golden ring comes about it there.
function notATarget(): SignArt {
  const ibnAbbas: [number, number] = [154, 106.8];
  const perch: [number, number] = [24, 79.4];
  const onBoard: [number, number] = [84, 82.2];
  const safe: [number, number] = [138, 79.4];
  return {
    kind: "not-a-target",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(104, 20) },
      { name: "a cloud", svg: cloud(52, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 7000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms(
        [
          [22, 106, 24],
          [136, 106, 24]
        ],
        "the field"
      ),
      { name: "a board for shooting at, on its post", svg: target(84, 106) },
      {
        name: "a living thing: a sparrow, flying to the board, then on, free",
        svg: sparrow(perch[0], perch[1]),
        keys: track({
          xy: [
            [0.36, 0, 0],
            [0.44, n(onBoard[0] - perch[0]), n(onBoard[1] - perch[1])],
            [0.72, n(onBoard[0] - perch[0]), n(onBoard[1] - perch[1])],
            [0.8, n(safe[0] - perch[0]), n(safe[1] - perch[1])]
          ]
        }),
        loop: { move: "bob", ms: 700, y: -0.5 }
      },
      { name: "not as a target: a grey dashed ring about it", svg: care(onBoard[0], n(onBoard[1] + 0.6), 6, 3.4, GREY), keys: showFor(0.48, 0.495, 0.7, 0.715) },
      { name: "free: a soft golden ring about it", svg: care(safe[0], n(safe[1] + 0.6), 6, 3.4, SOFT_GOLD), keys: showAt(0.86, 0.875), loop: soft },
      { name: "Ibn Abbas's place", svg: someone(ibnAbbas[0], ibnAbbas[1], 1.5, IBN_ABBAS) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcsLeft(n(ibnAbbas[0] - 2.4), n(ibnAbbas[1] - 3.2), IBN_ABBAS), keys: showFor(0.024, 0.03, 0.1, 0.106), loop: speaking }
    ],
    words: linesOn(THREE, ["Ibn Abbas: he prohibited", "Taking a living thing as", "A shooting target."])
  };
}

export const BEAUTY_ART = {
  "from-friday-to-friday": fromFridayToFriday,
  "last-part-of-the-night": lastPartOfTheNight,
  "two-loved-traits": twoLovedTraits,
  "haya-beautifies": hayaBeautifies,
  "the-test-of-wealth": theTestOfWealth,
  "not-a-target": notATarget
} as const;
