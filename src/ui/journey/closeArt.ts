import { cloud, glow, n, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { care, jug, LIGHT, palms, redCamel, tent, track } from "./daysArt";
import { soft, speaking } from "./fastArt";
import { restingCamel, road, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { at3 } from "./storyArt";
import { stall } from "./tradeArt";
import { boat } from "./companyArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";
import { dish } from "./worthArt";
import { big, bowl, EIGHT, FOLK, glints, ITS_VOICE, linesOn, places, plainLand, rel, SEVEN, sparkStays, twinkle } from "./shareArt";

/**
 * Close to him: Ibn Abbas, who stood on his left in the night prayer, was drawn to his right; if the people knew the
 * reward of the adhan and the first row they would draw lots for it, and they would race to the Zuhr prayer and come to
 * Isha and Fajr even if they had to crawl; Jarir served Anas on a journey, for he had seen what the Ansar did for him;
 * the one he left out when he gave was dearer to him, left to the content and goodness in his heart, and Amr ibn
 * Taghlib held that word dearer than red camels; he patted the cheek of each child who met him, and his hand was as if
 * it came out of a perfumer's scent bag; Abu Hurairah stuck to him while others were busy in the market and with their
 * property, and memorized what they did not; and he did not answer a greeting in the prayer, for in the prayer one is
 * occupied. Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no
 * person is ever drawn, not even a hand, a foot, a head or a face: where someone was, a ring or a small dashed circle
 * shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing
 * comes down from the sky: a prayer is a spark that rises, what is good is a light, glints and a soft golden ring. No
 * name or word is written.
 */

/** The words of five lines. */
const FIVE = [
  [0.02, 0.2],
  [0.216, 0.396],
  [0.412, 0.592],
  [0.608, 0.788],
  [0.804, 1]
] as const;

/** A place of one who came to meet him: a small dashed circle, in a bright color. */
const SMALL = ["#E59A6A", "#6FA8D6", "#8DBF6E", "#E2B84A", "#C38BD2"];

/** Bedding on the floor, its middle at (x, y), `w` across: a long cushion with a pillow at its left. */
const bedding = (x: number, y: number, w = 22) =>
  `<rect x="${n(x - w / 2)}" y="${n(y - 1.8)}" width="${w}" height="5" rx="2" fill="#5E5276"/><rect x="${n(x - w / 2 + 1)}" y="${n(y - 1.8)}" width="5" height="2.6" rx="1.2" fill="#7A6E92"/>`;

/** Small stones of a lot, in a bowl whose middle is at (x, y). */
const lotsIn = (x: number, y: number) =>
  bowl(x, y) +
  [-1.4, -0.4, 0.6, 1.5]
    .map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 1.6 - (i % 2) * 0.3)}" rx="0.55" ry="0.42" fill="${i % 2 ? "#D8D2C4" : "#B9B2A2"}"/>`)
    .join("");

/** A hoe: its handle from (x, y) up to the right, its blade at its foot. */
const hoe = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x + 5)} ${n(y - 7)}" stroke="#8A6440" stroke-width="0.8" stroke-linecap="round"/><path d="M${n(x - 1.6)} ${n(y + 0.6)} L${n(x + 1.2)} ${n(y - 0.4)} L${n(x + 0.6)} ${n(y + 1.6)} Z" fill="#7A7F86"/>`;

/** A small leather bag tied at its neck, its foot's middle at (x, y). */
const scentBag = (x: number, y: number) =>
  `<path d="M${n(x - 2.6)} ${y} Q${n(x - 3.2)} ${n(y - 3)} ${n(x - 1)} ${n(y - 4.2)} L${n(x + 1)} ${n(y - 4.2)} Q${n(x + 3.2)} ${n(y - 3)} ${n(x + 2.6)} ${y} Z" fill="#8E5A34"/>` +
  `<path d="M${n(x - 1.2)} ${n(y - 4.2)} L${n(x - 1.6)} ${n(y - 5.4)} L${n(x + 1.6)} ${n(y - 5.4)} L${n(x + 1.2)} ${n(y - 4.2)} Z" fill="#A87444"/><path d="M${n(x - 1.2)} ${n(y - 4.3)} L${n(x + 1.2)} ${n(y - 4.3)}" stroke="#E8C25A" stroke-width="0.4"/>`;

/** Soft curls of a sweet scent, rising from about (x, y). */
const scent = (x: number, y: number, color = "#F3C6DA") =>
  [-2.4, 0, 2.4]
    .map((dx, i) => {
      const sx = n(x + dx);
      const top = n(y - 5 - (i % 2) * 1.4);
      return `<path d="M${sx} ${y} q-1.2 -1.4 0 -2.6 q1.2 -1.2 0 -2.6" transform="translate(0 ${n(top - y + 5)})" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="0.9"/>`;
    })
    .join("");

// Drew me to his right. Ibn Abbas said: once I passed the night in the house of my aunt Maymunah; the Prophet ﷺ stood
// for the night prayer, and I joined him and stood on his left side, but he drew me to his right by holding me by the
// head (Sahih al-Bukhari 699). No one is drawn: a room at night under its palm trunks, seen from behind those who pray,
// with a window on the night, a curtained doorway and a shelf with a jug and a bowl; the places where Maymunah rests,
// where he slept, and where Ibn Abbas slept, each on its bedding. Ibn Abbas's
// voice tells of it, and a soft ring comes about Maymunah's place: the house of his aunt. His place, a golden ring,
// goes from its bedding to the mat, and a spark of the night prayer rises. Ibn Abbas's place gets up and comes to his
// left, and a spark of its prayer rises; a soft golden glow comes about it, held gently; then it goes round behind him
// to his right, where a soft golden ring comes about it.
function drewMeToHisRight(): SignArt {
  const maymunah: [number, number] = [15, 105.4];
  const hisBed: [number, number] = [42, 105.4];
  const ibnAbbasBed: [number, number] = [134, 105.4];
  const his: [number, number] = [80, 97.4];
  const toward: [number, number] = [104, 103];
  const left: [number, number] = [70, 98];
  const behind: [number, number] = [85, 104];
  const right: [number, number] = [90, 98];
  const pane = { x: 18, y: 14, w: 28, h: 24 };
  return {
    kind: "drew-me-to-his-right",
    ms: 10000,
    parts: [
      { name: "the room at night: its wall and its floor", svg: `<rect width="160" height="120" fill="#3B3654"/><rect y="72" width="160" height="48" fill="#4E4566"/><path d="M0 72 L160 72" stroke="#2E2A44" stroke-width="0.8"/>` },
      { name: "a window on the night", svg: `<rect x="18" y="14" width="28" height="24" rx="1" fill="#16284C"/>` },
      { name: "stars, through the window", svg: stars([[22, 19], [27, 32], [42, 19], [43, 34]]), clip: pane, loop: { move: "twinkle", ms: 2600, low: 0.6 } },
      { name: "the moon, through the window", svg: glow(38, 27, 6, "#F4EBC8", 0.1) + `<circle cx="38" cy="27" r="2.6" fill="#F4EBC8"/>`, clip: pane },
      { name: "the frame of the window", svg: `<path d="M18 14 L46 14 L46 38 L18 38 Z M32 14 L32 38" stroke="#2A2438" stroke-width="1.2" fill="none"/>` },
      {
        name: "the roof of the room, on palm trunks",
        svg:
          `<rect width="160" height="6" fill="#2C283E"/>` +
          [10, 30, 50, 70, 90, 110, 130, 150].map((x) => `<circle cx="${x}" cy="6.4" r="1.6" fill="#4A3C2E"/><circle cx="${x}" cy="6.4" r="0.7" fill="#5E4C3A"/>`).join("")
      },
      {
        name: "a doorway, with its curtain",
        svg:
          `<rect x="112" y="34" width="20" height="38" fill="#221E33"/><path d="M111 34 L133 34" stroke="#5A4A3A" stroke-width="1.2" stroke-linecap="round"/>` +
          `<path d="M112.6 34.6 L131.4 34.6 L131 72 L113 72 Z" fill="#B49A76"/><path d="M116.4 35 L116 72 M120.4 35 L120.6 72 M124.4 35 L124.2 72 M128.2 35 L128.4 72" stroke="#9A8262" stroke-width="0.5"/>`
      },
      { name: "a shelf on the wall, with a jug and a bowl", svg: `<rect x="64" y="50" width="26" height="1.6" rx="0.4" fill="#5A4A3A"/>` + jug(71, 50) + bowl(82, 49.6) },
      { name: "a mat of palm leaves, for the prayer", svg: `<path d="M62 95.2 L98 95.2 L101 100.6 L59 100.6 Z" fill="#6E6250"/><path d="M61 97 L99 97 M60.2 98.8 L99.8 98.8" stroke="#5A503F" stroke-width="0.3"/>` },
      { name: "the bedding where Maymunah rests", svg: bedding(maymunah[0], maymunah[1]) },
      { name: "his bedding", svg: bedding(hisBed[0], hisBed[1]) },
      { name: "Ibn Abbas's bedding", svg: bedding(ibnAbbasBed[0], ibnAbbasBed[1]) },
      { name: "Maymunah's place, resting", svg: someone(maymunah[0], maymunah[1], 1.6, LIGHT) },
      { name: "the house of Ibn Abbas's aunt: a soft ring about Maymunah's place", svg: care(maymunah[0], maymunah[1], 5, 3, SOFT_GOLD), keys: showAt(0.17, 0.19), loop: soft },
      {
        name: "his place: from its bedding to the mat, for the night prayer",
        svg: ring(hisBed[0], hisBed[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.32, 0, 0],
            [0.37, ...rel(hisBed, his)]
          ]
        })
      },
      { name: "the night prayer: a spark rising", svg: sparkle(his[0], n(his[1] - 5), 1.5, "#FFE7A0"), keys: sparkStays(0.375, 0.395), loop: twinkle(900) },
      { name: "Ibn Abbas's voice: telling of it", svg: arcsLeft(n(ibnAbbasBed[0] - 3.4), n(ibnAbbasBed[1] - 3), "#F0C890"), keys: showFor(0.022, 0.03, 0.1, 0.108), loop: speaking },
      {
        name: "Ibn Abbas's place: joining him on his left, then drawn round to his right",
        svg: someone(ibnAbbasBed[0], ibnAbbasBed[1], 1.5, "#F0C890"),
        keys: track({
          xy: [
            [0.46, 0, 0],
            [0.53, ...rel(ibnAbbasBed, toward)],
            [0.6, ...rel(ibnAbbasBed, toward)],
            [0.66, ...rel(ibnAbbasBed, left)],
            [0.89, ...rel(ibnAbbasBed, left)],
            [0.92, ...rel(ibnAbbasBed, behind)],
            [0.95, ...rel(ibnAbbasBed, right)]
          ]
        })
      },
      {
        name: "Ibn Abbas's prayer: a spark rising, then faint",
        svg: sparkle(left[0], n(left[1] - 4.6), 1.2, "#FFE7A0"),
        keys: track({
          opacity: [
            [0.665, 0],
            [0.67, 1],
            [0.89, 1],
            [0.91, 0]
          ],
          xy: [
            [0.665, 0, 0],
            [0.684, 0, -5]
          ]
        }),
        loop: twinkle(900)
      },
      {
        name: "held gently: a soft golden glow about Ibn Abbas's place",
        svg: wash(left[0], left[1], 4.2, 3, WARM, 0.2),
        keys: track({
          opacity: [
            [0.75, 0],
            [0.77, 1]
          ],
          xy: [
            [0.89, 0, 0],
            [0.92, ...rel(left, behind)],
            [0.95, ...rel(left, right)]
          ]
        }),
        loop: soft
      },
      { name: "on his right: a soft golden ring about Ibn Abbas's place", svg: care(right[0], right[1], 4.4, 3, SOFT_GOLD), keys: showAt(0.95, 0.96), loop: soft }
    ],
    words: linesOn(SEVEN, [
      "Ibn Abbas: once I passed the night",
      "in the house of my aunt Maymunah.",
      "He stood for the night prayer,",
      "and I joined him",
      "and stood on his left side,",
      "but he held me by the head",
      "and drew me to his right."
    ])
  };
}

// They would draw lots. Abu Hurairah said: the Messenger of Allah ﷺ said: if the people knew the reward for pronouncing
// the adhan and for standing in the first row, and found no other way to get that except by drawing lots, they would
// draw lots; and if they knew the reward of the Zuhr prayer, they would race for it; and if they knew the reward of the
// Isha and Fajr prayers in congregation, they would come to offer them even if they had to crawl (Sahih al-Bukhari 615).
// No one is drawn: a masjid among the homes of a town, with the rows of its places before it. A voice calls the adhan
// from its roof, with glints over the caller's place, and a soft golden light comes over the first row. Places come
// from the homes to the first row; small stones of a lot show in a bowl, and one is drawn out, with a glint. The sun is
// high at noon, and places race along the ways from the homes to the masjid. Night falls, with the moon and stars, then
// the first light of dawn; and places come slowly along the ground, even if they had to crawl.
function theyWouldDrawLots(): SignArt {
  const row1: [number, number][] = [60, 68, 76, 84, 92, 100].map((x): [number, number] => [x, 97.6]);
  const row2: [number, number][] = [56, 64, 72, 88, 96, 104].map((x): [number, number] => [x, 104]);
  const row3: [number, number][] = [64, 72, 80, 88, 96].map((x): [number, number] => [x, 110.4]);
  const caller: [number, number] = [66, 65.2];
  const homes: [number, number, number, number][] = [
    [12, 98, 14, 9],
    [28, 112, 14, 9],
    [146, 98, 14, 9],
    [132, 112, 14, 9]
  ];
  const doors: [number, number][] = homes.map(([x, y]) => [n(x - 1.8), n(y - 2.4)]);
  const coming: [number, number][] = [
    [50, 97.6],
    [48, 104],
    [110, 97.6],
    [112, 104]
  ];
  const lots: [number, number] = [80, 117.4];
  const racing: [number, number][] = [
    [74, 91],
    [76, 92],
    [86, 91],
    [84, 92]
  ];
  const crawl: [number, number, number][] = [
    [4, 117.4, 14],
    [156, 117.4, -14],
    [40, 119, 8]
  ];
  return {
    kind: "they-would-draw-lots",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun, high", svg: sun(80, 14) },
      { name: "noon: a warm glow about the sun", svg: wash(80, 14, 16, 12, WARM, 0.14), keys: showAt(0.51, 0.53), loop: soft },
      { name: "a cloud", svg: cloud(36, 30, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "night, over the sky", svg: NIGHT_OVER_SKY, keys: showAt(0.752, 0.78) },
      {
        name: "stars at night",
        svg: stars([
          [20, 8],
          [44, 18],
          [62, 6],
          [100, 12],
          [122, 20],
          [146, 8],
          [134, 34]
        ]),
        keys: showAt(0.77, 0.79),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon, for Isha", svg: glow(26, 26, 8, "#F4EBC8", 0.12) + `<circle cx="26" cy="26" r="3.6" fill="#F4EBC8"/>`, keys: showAt(0.76, 0.78) },
      { name: "the first light of dawn, for Fajr", svg: `<rect y="50" width="160" height="12" fill="#F0BF8E" opacity="0.45"/><rect y="56" width="160" height="6" fill="#F6D4A6" opacity="0.5"/>`, keys: showAt(0.8, 0.82) },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 118], [118, 118], [150, 116]]) },
      { name: "night, over the land", svg: NIGHT_OVER_LAND, keys: showAt(0.752, 0.78) },
      { name: "the homes of the town", svg: homes.map(([x, y, w, h]) => home(x, y, w, h)).join("") },
      { name: "the masjid", svg: madinahMasjid(52, 90, 1.2) },
      { name: "the places of the rows", svg: places([...row1, ...row2, ...row3], 1.6) },
      { name: "the caller's place, on the roof", svg: someone(caller[0], caller[1], 1.4, ITS_VOICE) },
      {
        name: "the adhan: a voice from the roof, then again for Zuhr, Isha and Fajr",
        svg: arcs(n(caller[0] + 3), n(caller[1] - 0.4), ITS_VOICE),
        keys: track({
          opacity: [
            [0.142, 0],
            [0.152, 1],
            [0.32, 1],
            [0.33, 0],
            [0.51, 0],
            [0.52, 1]
          ]
        }),
        loop: speaking
      },
      { name: "the reward of the adhan: glints over the caller's place", svg: glints([[caller[0], n(caller[1] - 4.4)]], 1.2), keys: showAt(0.16, 0.17), loop: twinkle() },
      { name: "the first row: a soft golden light", svg: wash(80, 97.6, 26, 3.6, WARM, 0.18) + care(80, 97.6, 26, 3.8, SOFT_GOLD), keys: showAt(0.17, 0.19), loop: soft },
      ...doors.map(
        (from, i): SignPart => ({
          name: `a place of the town, coming for the first row ${i + 1}`,
          svg: someone(from[0], from[1], 1.5, FOLK),
          keys: track({
            opacity: [
              [0.264, 0],
              [0.27, 1]
            ],
            xy: [
              [0.27, 0, 0],
              [0.33, ...rel(from, coming[i])]
            ]
          })
        })
      ),
      { name: "lots: small stones in a bowl", svg: lotsIn(lots[0], lots[1]), keys: showAt(0.39, 0.4) },
      {
        name: "a lot, drawn out of the bowl",
        svg: `<ellipse cx="${lots[0]}" cy="${n(lots[1] - 2)}" rx="0.6" ry="0.45" fill="#F2EEE4"/>`,
        keys: track({
          opacity: [
            [0.4, 0],
            [0.405, 1]
          ],
          xy: [
            [0.41, 0, 0],
            [0.43, 0, -4.6]
          ]
        })
      },
      { name: "the lot drawn: a glint", svg: sparkle(lots[0], n(lots[1] - 8.6), 1.1, "#FFE7A0"), keys: showAt(0.43, 0.44), loop: twinkle(900) },
      ...doors.map(
        (from, i): SignPart => ({
          name: `racing for it: a place hurrying to the masjid ${i + 1}`,
          svg: someone(from[0], from[1], 1.5, FOLK),
          keys: track({
            opacity: [
              [0.63, 0],
              [0.635, 1],
              [0.69, 1],
              [0.7, 0]
            ],
            xy: [
              [0.635, 0, 0],
              [0.685, ...rel(from, racing[i])]
            ]
          })
        })
      ),
      { name: "the ways they race along", svg: way("M10 96 C30 94 52 92 74 91 M26 110 C40 100 58 94 76 92 M144 96 C126 94 104 92 86 91 M130 110 C118 100 100 94 84 92", "#FFF0C4", 0.6), keys: showFor(0.63, 0.64, 0.69, 0.7) },
      ...crawl.map(
        ([x, y, dx], i): SignPart => ({
          name: `even if they had to crawl: a place coming slowly along the ground ${i + 1}`,
          svg: someone(x, y, 1.3, LIGHT),
          keys: track({
            opacity: [
              [0.876, 0],
              [0.884, 1]
            ],
            xy: [
              [0.884, 0, 0],
              [0.956, dx, -0.6]
            ]
          })
        })
      ),
      { name: "the low ways they come along", svg: way("M4 118.4 L20 117.6 M156 118.4 L140 117.6 M40 119.6 L50 119", LIGHT, 0.5), keys: showAt(0.884, 0.9) }
    ],
    words: linesOn(EIGHT, [
      "He said: If the people knew the reward",
      "of the adhan and of the first row,",
      "and found no other way to get that",
      "but by drawing lots, they would draw lots;",
      "if they knew the reward of the Zuhr prayer",
      "they would race for it;",
      "if they knew the reward of Isha and Fajr",
      "they would come even if they had to crawl."
    ])
  };
}

// I swore to serve. Anas ibn Malik said: I set out along with Jarir ibn Abdullah al-Bajali on a journey, and he used to
// serve me; I said to him: don't do that; he said: I have seen the Ansar doing this with the Messenger of Allah ﷺ, and I
// swore by Allah that whenever I accompany any one of the Ansar, I would serve him; and Jarir was older than Anas
// (Sahih Muslim 2513). No one is drawn: a road across the land to a halt, with a tent and camels lying down; far off on
// the land is the masjid of Madinah. The places of Anas and Jarir come along the road to the halt. Jarir's place goes
// to the tent and brings a jug of water to Anas's place; Anas's voice says: don't do that. Jarir's voice answers; far
// off in Madinah, a soft light shows the places of the Ansar about his place, and a dish going to it. A soft golden ring
// comes about Jarir's place, for his oath; it brings a dish of dates to Anas's place, and a glint shows over Anas, one
// of the Ansar; and a warm glow comes about Jarir's place, the older, serving.
function iSworeToServe(): SignArt {
  const anasFrom: [number, number] = [8, 101];
  const jarirFrom: [number, number] = [2, 104.4];
  const anas: [number, number] = [78, 104];
  const jarir: [number, number] = [70, 104.4];
  const byTent: [number, number] = [92, 100.6];
  const beside: [number, number] = [83, 105];
  const jugAt: [number, number] = [100, 101.4];
  const dishAt: [number, number] = [104, 101.4];
  const far: [number, number] = [24, 62.8];
  const going = track({
    xy: [
      [0.03, 0, 0],
      [0.08, ...rel(jarirFrom, jarir)],
      [0.145, ...rel(jarirFrom, jarir)],
      [0.165, ...rel(jarirFrom, byTent)],
      [0.17, ...rel(jarirFrom, byTent)],
      [0.2, ...rel(jarirFrom, beside)],
      [0.755, ...rel(jarirFrom, beside)],
      [0.775, ...rel(jarirFrom, byTent)],
      [0.78, ...rel(jarirFrom, byTent)],
      [0.81, ...rel(jarirFrom, beside)]
    ]
  });
  return {
    kind: "i-swore-to-serve",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(70, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [56, 118], [118, 117], [152, 115]]) },
      { name: "the masjid of Madinah, far off", svg: madinahMasjid(14, 61.2, 0.42) },
      { name: "the road across the land", svg: road(0, 160, 104) },
      { name: "a tent at the halt", svg: tent(96, 100.4, 22, 14) },
      { name: "a camel lying down at the halt", svg: restingCamel(128, 106, 0.8), loop: { move: "bob", ms: 3200, y: -0.2 } },
      { name: "another camel lying down", svg: restingCamel(142, 113, 0.7), loop: { move: "bob", ms: 3600, y: -0.2, phase: 0.5 } },
      {
        name: "Anas's place, coming along the road to the halt",
        svg: someone(anasFrom[0], anasFrom[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.08, ...rel(anasFrom, anas)]
          ]
        })
      },
      { name: "Jarir's place: coming to the halt, then serving", svg: someone(jarirFrom[0], jarirFrom[1], 1.6, FOLK), keys: going },
      {
        name: "a jug of water, brought to Anas's place",
        svg: jug(jugAt[0], jugAt[1]),
        keys: track({
          xy: [
            [0.17, 0, 0],
            [0.2, ...rel(jugAt, [n(beside[0] + 2.6), n(beside[1] + 2.6)])]
          ]
        })
      },
      { name: "Anas's voice: don't do that", svg: arcs(n(anas[0] + 3), n(anas[1] - 2.4), ITS_VOICE), keys: showFor(0.266, 0.274, 0.326, 0.334), loop: speaking },
      { name: "Jarir's voice: I have seen the Ansar", svg: arcsLeft(n(beside[0] - 4.6), n(beside[1] - 3), FOLK), keys: showFor(0.388, 0.396, 0.57, 0.578), loop: speaking },
      { name: "far off in Madinah: a soft light", svg: wash(far[0], far[1], 12, 4, WARM, 0.18), keys: showAt(0.39, 0.41), loop: soft },
      {
        name: "far off in Madinah: the places of the Ansar about his place",
        svg: ring(far[0], far[1], 1.2, GOLD) + places([[n(far[0] - 4), n(far[1] + 0.6)], [n(far[0] + 4), n(far[1] + 0.6)], [far[0], n(far[1] + 2.6)]], 0.8),
        keys: showAt(0.4, 0.42)
      },
      {
        name: "far off in Madinah: a dish going to his place",
        svg: big(dish(n(far[0] - 8), n(far[1] + 1)), n(far[0] - 8), n(far[1] + 1), 0.4),
        keys: track({
          opacity: [
            [0.51, 0],
            [0.52, 1]
          ],
          xy: [
            [0.52, 0, 0],
            [0.56, 6.4, -0.4]
          ]
        })
      },
      { name: "Jarir's oath: a soft golden ring about Jarir's place", svg: care(beside[0], beside[1], 4.2, 3, SOFT_GOLD), keys: showAt(0.64, 0.66), loop: soft },
      {
        name: "a dish of dates, brought to Anas's place",
        svg: dish(dishAt[0], dishAt[1]) + [-1.4, 0, 1.4].map((dx) => `<ellipse cx="${n(dishAt[0] + dx)}" cy="${n(dishAt[1] - 1.4)}" rx="0.8" ry="0.55" fill="#93391B"/>`).join(""),
        keys: track({
          xy: [
            [0.78, 0, 0],
            [0.81, ...rel(dishAt, [n(anas[0] + 1), n(anas[1] + 4.6)])]
          ]
        })
      },
      { name: "Anas, one of the Ansar: a glint over Anas's place", svg: glints([[n(anas[0] + 1.6), n(anas[1] - 4)]], 1.1), keys: showAt(0.81, 0.82), loop: twinkle() },
      { name: "the older, serving: a warm glow about Jarir's place", svg: wash(beside[0], beside[1], 5.6, 4, WARM, 0.18), keys: showAt(0.88, 0.9), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Anas: I set out with Jarir on a journey",
      "and Jarir used to serve me.",
      "I said to Jarir: Don't do that.",
      "Jarir said: I have seen the Ansar",
      "doing this with him,",
      "and I swore by Allah to serve",
      "any one of the Ansar I accompany.",
      "Jarir was older than Anas."
    ])
  };
}

// Dearer than red camels. Amr ibn Taghlib said: some property was given to the Prophet ﷺ, and he gave it to some
// people and withheld it from some others; then he came to know that they were dissatisfied, so he said: I give to one
// man and leave another, and the one to whom I do not give is dearer to me than the one to whom I give; I give to some
// people because of the impatience and discontent present in their hearts, and leave other people because of the
// content and goodness Allah has bestowed on them, and one of them is Amr ibn Taghlib; and Amr said: the sentence which
// the Messenger of Allah ﷺ said in my favor is dearer to me than the possession of nice red camels (Sahih al-Bukhari
// 7535). No one is drawn: before the masjid of Madinah, his place, a golden ring, and the places of those about him.
// Sacks and a box are brought to his place; three sacks go to some places, and the others are given none. A soft blue
// comes about the places left out, dissatisfied; his voice speaks, and a warm glow comes about them, dearer to him;
// then a soft golden light comes in each of them, content and goodness; a soft golden ring and glints come about Amr's
// place, one of them. Amr's voice speaks, nice red camels go by far off, and a warm light comes about Amr's place.
function dearerThanRedCamels(): SignArt {
  const his: [number, number] = [30, 101.4];
  const heap: [number, number] = [44, 104];
  const given: [number, number][] = [
    [64, 98],
    [72, 104.4],
    [64, 110.4]
  ];
  const left: [number, number][] = [
    [100, 98],
    [108, 104.4],
    [100, 110.4]
  ];
  const amr = left[1];
  const sacksFrom: [number, number][] = [
    [42, 104],
    [46.6, 104.4],
    [44, 108.2]
  ];
  return {
    kind: "dearer-than-red-camels",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(24, 16) },
      { name: "a cloud", svg: cloud(92, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [84, 118], [150, 116]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 92, 0.8) },
      ...palms([[50, 86, 14]], "Madinah"),
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the places of those he gave to", svg: places(given, 1.7) },
      { name: "the places of those he left", svg: places(left, 1.7) },
      { name: "Amr's place", svg: someone(amr[0], amr[1], 1.7, ITS_VOICE) },
      {
        name: "some property, given to him: a box",
        svg: `<rect x="${n(heap[0] - 3.2)}" y="${n(heap[1] - 4.4)}" width="6.4" height="4.4" rx="0.6" fill="#8A5A33"/><path d="M${n(heap[0] - 3.2)} ${n(heap[1] - 3)} L${n(heap[0] + 3.2)} ${n(heap[1] - 3)}" stroke="#E8C25A" stroke-width="0.4"/>`,
        keys: track({
          opacity: [
            [0.02, 0],
            [0.03, 1]
          ],
          xy: [
            [0.03, 40, 0],
            [0.08, 0, 0]
          ]
        })
      },
      ...sacksFrom.map(
        (from, i): SignPart => ({
          name: `some property, given to him: a sack, then given ${i + 1}`,
          svg: sack(from[0], from[1], 0.7),
          keys: track({
            opacity: [
              [0.02, 0],
              [0.03, 1]
            ],
            xy: [
              [0.03, 40, 0],
              [0.08, 0, 0],
              [at3(0.15 + i * 0.012), 0, 0],
              [at3(0.18 + i * 0.012), ...rel(from, [n(given[i][0] + 3.4), n(given[i][1] + 1.6)])]
            ]
          })
        })
      ),
      { name: "dissatisfied: a soft blue about the places of those he left", svg: wash(104, 104.4, 10, 10, "#7FA6D6", 0.14), keys: showFor(0.27, 0.29, 0.53, 0.55), loop: soft },
      { name: "his voice", svg: arcs(n(his[0] + 3.4), n(his[1] - 2.6), GOLD), keys: showFor(0.388, 0.396, 0.876, 0.884), loop: speaking },
      { name: "dearer to him: a warm glow about the places of those he left", svg: wash(104, 104.4, 12, 11, WARM, 0.14), keys: showAt(0.51, 0.53), loop: soft },
      { name: "content and goodness: a soft golden light in the places of those he left", svg: left.map(([x, y]) => glow(x, y, 2.4, WARM, 0.36)).join(""), keys: showAt(0.64, 0.66), loop: soft },
      { name: "one of them: a soft golden ring about Amr's place", svg: care(amr[0], amr[1], 4, 3, SOFT_GOLD), keys: showAt(0.76, 0.78), loop: soft },
      { name: "glints over Amr's place", svg: glints([[n(amr[0] + 1.6), n(amr[1] - 4.2)]], 1.1), keys: showAt(0.79, 0.8), loop: twinkle() },
      { name: "Amr's voice: dearer than red camels", svg: arcs(n(amr[0] + 3.4), n(amr[1] - 2), ITS_VOICE), keys: showAt(0.876, 0.884), loop: speaking },
      {
        name: "nice red camels, going by far off",
        svg: redCamel(118, 72, 0.17) + redCamel(134, 73.4, 0.18) + redCamel(150, 71.6, 0.16),
        keys: track({
          opacity: [
            [0.884, 0],
            [0.894, 1]
          ],
          xy: [
            [0.894, 0, 0],
            [0.95, -6, 0]
          ]
        }),
        loop: { move: "bob", ms: 1400, y: -0.3 }
      },
      { name: "dearer: a warm light about Amr's place", svg: wash(amr[0], amr[1], 6, 5, WARM, 0.22), keys: showAt(0.92, 0.94), loop: soft }
    ],
    words: linesOn(EIGHT, [
      "Some property was given to him;",
      "he gave some and withheld from others,",
      "and learned that they were dissatisfied.",
      "He said: I give one man and leave another;",
      "the one I leave is dearer to me.",
      "I leave some for what Allah has bestowed:",
      "content and goodness; Amr is one of them.",
      "Amr: his word is dearer than red camels."
    ])
  };
}

// The scent bag of a perfumer. Jabir ibn Samurah said: I prayed along with the Messenger of Allah ﷺ the first prayer;
// he then went to his family, and I also went along with him, when he met some children; he began to pat the cheeks of
// each one of them; he also patted my cheek, and I experienced a coolness or a fragrance of his hand, as if it had been
// brought out from the scent bag of a perfumer (Sahih Muslim 2329). No one is drawn: at noon, the masjid of Madinah, a
// way to his home, and a lane coming into it. A spark of the first prayer rises; his place, a golden ring, goes along
// the way, with Jabir's place after it. Small places come running from the lane to meet him, and a glint comes over each
// of them in turn, then over Jabir's place. A soft cool light comes about Jabir's place, then soft curls of a sweet
// scent; and a small scent bag of a perfumer shows by it, with its scent.
function theScentBagOfAPerfumer(): SignArt {
  const hisFrom: [number, number] = [26, 94.4];
  const jabirFrom: [number, number] = [18, 96.6];
  const his: [number, number] = [74, 99.6];
  const jabir: [number, number] = [64, 101.6];
  const small: [number, number][] = [
    [70, 106],
    [77, 107.6],
    [84, 105.4],
    [90, 101.6],
    [62, 108.4]
  ];
  const lane: [number, number][] = [
    [66, 121],
    [74, 122],
    [86, 121],
    [96, 120],
    [58, 122]
  ];
  const bagAt: [number, number] = [54, 110];
  return {
    kind: "the-scent-bag-of-a-perfumer",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun at noon", svg: sun(84, 12) },
      { name: "a cloud", svg: cloud(126, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[8, 116], [120, 117], [150, 114]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 90, 0.8) },
      ...palms([[48, 84, 14]], "Madinah"),
      { name: "his home, with his family", svg: home(140, 98, 18, 11) },
      { name: "the way to his home", svg: `<path d="M24 93 C54 98 96 101 136 97.4" stroke="#EFE0BC" stroke-width="5" fill="none" stroke-linecap="round"/>` },
      { name: "a lane coming into the way", svg: `<path d="M78 99.4 C78 106 80 112 82 120" stroke="#EFE0BC" stroke-width="7" fill="none"/>` },
      { name: "the first prayer: a spark rising from the masjid", svg: sparkle(21.4, 70, 1.5, "#FFE7A0"), keys: sparkStays(0.04, 0.07), loop: twinkle(900) },
      { name: "Jabir's voice: telling of it", svg: arcsLeft(n(jabirFrom[0] - 3), n(jabirFrom[1] - 2.6), ITS_VOICE), keys: showFor(0.022, 0.03, 0.08, 0.088), loop: speaking },
      {
        name: "his place: going along the way to his family",
        svg: ring(hisFrom[0], hisFrom[1], 2.6, GOLD),
        keys: track({
          xy: [
            [0.15, 0, 0],
            [0.2, ...rel(hisFrom, his)]
          ]
        })
      },
      {
        name: "Jabir's place, going with him",
        svg: someone(jabirFrom[0], jabirFrom[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.155, 0, 0],
            [0.205, ...rel(jabirFrom, jabir)]
          ]
        })
      },
      ...lane.map(
        (from, i): SignPart => ({
          name: `a small place, coming to meet him ${i + 1}`,
          svg: someone(from[0], from[1], 1.1, SMALL[i]),
          keys: track({
            xy: [
              [0.27, 0, 0],
              [at3(0.31 + i * 0.004), ...rel(from, small[i])]
            ]
          })
        })
      ),
      ...small.map(
        ([x, y], i): SignPart => ({
          name: `patted: a glint over small place ${i + 1}`,
          svg: sparkle(n(x + 1.2), n(y - 3), 1, "#FFE7A0"),
          keys: showAt(at3(0.39 + i * 0.012), at3(0.396 + i * 0.012)),
          loop: twinkle(1100)
        })
      ),
      { name: "and Jabir: a glint over Jabir's place", svg: sparkle(n(jabir[0] + 1.4), n(jabir[1] - 3.4), 1.1, "#FFE7A0"), keys: showAt(0.52, 0.53), loop: twinkle(1100) },
      { name: "a coolness: a soft cool light about Jabir's place", svg: wash(jabir[0], jabir[1], 5, 4, "#BFE6F5", 0.24), keys: showAt(0.64, 0.66), loop: soft },
      {
        name: "or a fragrance: soft curls of a sweet scent about Jabir's place",
        svg: scent(jabir[0], n(jabir[1] - 2.4)),
        keys: track({
          opacity: [
            [0.76, 0],
            [0.78, 1]
          ],
          xy: [
            [0.76, 0, 1.6],
            [0.82, 0, -1]
          ]
        }),
        loop: twinkle(1600)
      },
      { name: "the scent bag of a perfumer", svg: scentBag(bagAt[0], bagAt[1]), keys: showAt(0.88, 0.9) },
      { name: "its sweet scent: soft curls over the scent bag", svg: scent(bagAt[0], n(bagAt[1] - 5.6)), keys: showAt(0.9, 0.92), loop: twinkle(1600) }
    ],
    words: linesOn(EIGHT, [
      "Jabir ibn Samurah: I prayed with him",
      "the first prayer; he went to his family,",
      "I went with him, and he met some children;",
      "he began to pat the cheeks of each one.",
      "He also patted my cheek,",
      "and I felt in his hand a coolness",
      "or a fragrance, as if it had been brought",
      "out from the scent bag of a perfumer."
    ])
  };
}

// Why so many hadith. Abu Hurairah said: people say that I have narrated many hadith; had it not been for two verses in
// the Quran, I would not have narrated a single hadith; and no doubt our emigrant brothers used to be busy in the market
// with their business, and our Ansari brothers used to be busy with their property; but I used to stick to the
// Messenger of Allah ﷺ, contented with what will fill my stomach, and I used to attend that which they used not to
// attend, and I used to memorize that which they used not to memorize (Sahih al-Bukhari 118). No one is drawn: in
// Madinah, the masjid with his place, a golden ring, and Abu Hurairah's place near it; the market with its stalls, and
// the palms and fields of the Ansar with their water channel. Voices of the town speak, and Abu Hurairah's voice tells
// of it; glints go out from his place to the town, narrated. The places of the emigrants go about the stalls, with a
// sack traded; the places of the Ansar work their fields, with a hoe. Abu Hurairah's place comes close to his place,
// with a soft golden ring about them both; a small bowl shows by it, enough to fill the stomach; and glints gather over
// Abu Hurairah's place, memorized.
function whySoManyHadith(): SignArt {
  const his: [number, number] = [22, 99.4];
  const abuHurairahFrom: [number, number] = [40, 106];
  const close: [number, number] = [28.6, 101.6];
  const emigrants: [number, number][] = [
    [62, 99],
    [80, 100.4],
    [96, 99]
  ];
  const ansar: [number, number][] = [
    [124, 104],
    [144, 106.4]
  ];
  return {
    kind: "why-so-many-hadith",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(70, 14) },
      { name: "a cloud", svg: cloud(110, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 118], [70, 118], [150, 118]]) },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 93, 0.8) },
      { name: "the market: its stalls", svg: stall(68, 16, "#D9774A", 72, 86) + stall(90, 16, "#4A8FD9", 72, 86) },
      { name: "the fields of the Ansar", svg: `<path d="M112 96 L160 92 L160 118 L116 118 Z" fill="#B9C98A"/><path d="M116 102 L160 98.6 M118 108 L160 105 M120 114 L160 111.4" stroke="#9AAE6A" stroke-width="0.6"/>` },
      { name: "their water channel", svg: `<path d="M114 112.6 C128 110.4 144 110 160 108.6" stroke="#6FB3DC" stroke-width="1.6" fill="none"/>`, loop: { move: "twinkle", ms: 1800, low: 0.7 } },
      ...palms(
        [
          [122, 92, 16],
          [140, 88, 18],
          [156, 94, 14]
        ],
        "the Ansar"
      ),
      { name: "his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      {
        name: "Abu Hurairah's place: coming close to his place",
        svg: someone(abuHurairahFrom[0], abuHurairahFrom[1], 1.6, ITS_VOICE),
        keys: track({
          xy: [
            [0.635, 0, 0],
            [0.68, ...rel(abuHurairahFrom, close)]
          ]
        })
      },
      { name: "the voices of the town: Abu Hurairah narrates a lot", svg: arcs(102, 92, ITS_VOICE) + arcsLeft(58, 93, ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.088), loop: speaking },
      { name: "Abu Hurairah's voice: telling of it", svg: arcs(n(abuHurairahFrom[0] + 3), n(abuHurairahFrom[1] - 2.4), ITS_VOICE), keys: showFor(0.022, 0.03, 0.32, 0.33), loop: speaking },
      {
        name: "narrated: glints going out from Abu Hurairah's place to the town",
        svg: glints([
          [n(abuHurairahFrom[0] + 3), n(abuHurairahFrom[1] - 6)],
          [n(abuHurairahFrom[0] + 6.4), n(abuHurairahFrom[1] - 3.6)]
        ]),
        keys: track({
          opacity: [
            [0.268, 0],
            [0.276, 1],
            [0.31, 1],
            [0.33, 0]
          ],
          xy: [
            [0.276, 0, 0],
            [0.32, 30, -6]
          ]
        }),
        loop: twinkle(900)
      },
      { name: "busy in the market: a soft light over the stalls", svg: wash(80, 90, 26, 10, WARM, 0.1), keys: showAt(0.39, 0.41), loop: soft },
      ...emigrants.map(
        ([x, y], i): SignPart => ({
          name: `the place of one of the emigrants, going about the stalls ${i + 1}`,
          svg: someone(x, y, 1.6, FOLK),
          keys: track({
            xy: [
              [0.39, 0, 0],
              [0.42, i % 2 ? -5 : 5, 0],
              [0.45, 0, 0]
            ]
          })
        })
      ),
      {
        name: "a sack, traded between the stalls",
        svg: sack(72, 99.6, 0.7),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.44, 14, 0]
          ]
        })
      },
      { name: "busy with their property: a soft light over the fields", svg: wash(136, 106, 24, 10, WARM, 0.1), keys: showAt(0.51, 0.53), loop: soft },
      { name: "the places of the Ansar, at work in their fields", svg: places(ansar, 1.6) },
      {
        name: "a hoe, working the field",
        svg: hoe(n(ansar[0][0] + 3), n(ansar[0][1] + 4)),
        origin: { x: n(ansar[0][0] + 3), y: n(ansar[0][1] + 4) },
        keys: track({
          rotate: [
            [0.51, 0],
            [0.525, -24],
            [0.54, 0],
            [0.555, -24],
            [0.57, 0]
          ]
        })
      },
      { name: "close to him: a soft golden ring about his place and Abu Hurairah's", svg: care(n((his[0] + close[0]) / 2), n((his[1] + close[1]) / 2), 8.4, 4.4, SOFT_GOLD), keys: showAt(0.68, 0.69), loop: soft },
      {
        name: "by Abu Hurairah's place: a small bowl, enough to fill the stomach",
        svg: bowl(n(close[0] + 5.4), n(close[1] + 4.6)) + `<ellipse cx="${n(close[0] + 5.4)}" cy="${n(close[1] + 3.2)}" rx="1.6" ry="0.5" fill="#D9A35E"/>`,
        keys: showAt(0.76, 0.78)
      },
      {
        name: "memorized: glints gathering over Abu Hurairah's place",
        svg: glints([
          [n(close[0] - 1.6), n(close[1] - 5.4)],
          [n(close[0] + 1.8), n(close[1] - 6.8)]
        ]),
        keys: showAt(0.88, 0.9),
        loop: twinkle()
      },
      {
        name: "and more: glints over Abu Hurairah's place",
        svg: glints([
          [n(close[0] + 4.8), n(close[1] - 4.6)],
          [n(close[0] - 4.6), n(close[1] - 3)]
        ]),
        keys: showAt(0.92, 0.94),
        loop: twinkle(1500)
      }
    ],
    words: linesOn(EIGHT, [
      "Abu Hurairah: people say I narrate a lot.",
      "Were it not for two ayahs in the Quran,",
      "I would not have narrated a single hadith.",
      "The emigrants were busy in the market,",
      "the Ansar were busy with their property;",
      "but I stuck to him, content with",
      "what would fill my stomach,",
      "and memorized what they did not."
    ])
  };
}

// In the prayer one is occupied. Abdullah ibn Mas'ud said: we used to greet the Prophet ﷺ while he was praying, and he
// used to answer our greetings; when we returned from an-Najashi, we greeted him, but he did not answer us, and he said:
// in the prayer one is occupied (Sahih al-Bukhari 1199). No one is drawn: a place of prayer with its low wall of mud
// brick, where his place, a golden ring, prays, and the places of those with him are behind it; far off is the sea,
// and the far land of an-Najashi across it. Their voices greet him, and his voice answers. A boat comes across the sea
// from the far land, and the places of those who return go along a long way to the place of prayer. Their voices greet
// him, and no voice of his answers: a soft golden ring comes about his place in the prayer, and a spark rises. Then his
// voice speaks.
function inThePrayerOneIsBusy(): SignArt {
  const his: [number, number] = [40, 93.4];
  const behind: [number, number][] = [
    [30, 102],
    [40, 103],
    [50, 102]
  ];
  const shore: [number, number] = [104, 62.6];
  const back: [number, number][] = [
    [60, 104.4],
    [66, 101]
  ];
  const ways = "M104 62.6 C102 72 96 80 86 86 C78 92 70 98 62 104";
  return {
    kind: "in-the-prayer-one-is-busy",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6EEF2", 62) },
      { name: "the sun", svg: sun(20, 16) },
      { name: "a cloud", svg: cloud(64, 26, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 9000 } },
      { name: "the sea, far off", svg: `<path d="M98 61.4 Q110 58.6 124 58 L160 57.4 L160 61.4 Z" fill="#6FB3DC"/><path d="M118 59.8 q2 -0.8 4 0 M136 59 q2 -0.8 4 0" stroke="#D8EEF8" stroke-width="0.4" fill="none"/>`, loop: { move: "bob", ms: 4200, x: 0.8 } },
      { name: "the land of an-Najashi, far off across the sea", svg: `<path d="M128 58 Q140 55.4 152 55.6 Q156 55.4 160 55.6 L160 57.6 L128 58.4 Z" fill="#B9A47E"/>` },
      { name: "the land", svg: plainLand("#E2CB9C", [[12, 117], [86, 118], [150, 116]]) },
      ...palms(
        [
          [128, 92, 13],
          [142, 99, 15]
        ],
        "the land"
      ),
      { name: "the long way back, from the far shore", svg: way(ways, "#FFF0C4", 0.7) },
      { name: "the place of prayer: its low wall of mud brick", svg: `<rect x="8" y="84" width="64" height="5" fill="#B48F5E"/><path d="M8 86.4 L72 86.4" stroke="#9A7A4E" stroke-width="0.4"/><rect x="8" y="89" width="64" height="25" fill="#EBDDB8" opacity="0.6"/>` },
      { name: "his place, in the prayer", svg: ring(his[0], his[1], 2.8, GOLD) },
      { name: "the places of those with him", svg: places(behind, 1.6) },
      { name: "his prayer: a spark rising", svg: sparkle(his[0], n(his[1] - 5.2), 1.5, "#FFE7A0"), keys: sparkStays(0.03, 0.06), loop: twinkle(900) },
      { name: "their voices: greeting him", svg: arcs(n(behind[2][0] + 2.6), n(behind[2][1] - 3), ITS_VOICE), keys: showFor(0.07, 0.08, 0.15, 0.16), loop: speaking },
      { name: "his voice: answering their greeting", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 2.6), GOLD), keys: showFor(0.23, 0.24, 0.34, 0.35), loop: speaking },
      {
        name: "a boat, coming back across the sea",
        svg: big(boat(150, 56), 150, 56, 0.16),
        keys: track({
          xy: [
            [0.415, 0, 0],
            [0.46, ...rel([150, 56], [108, 58.4])]
          ]
        }),
        loop: { move: "bob", ms: 2400, y: 0.3 }
      },
      ...back.map(
        (to, i): SignPart => ({
          name: `the place of one who returned from an-Najashi ${i + 1}`,
          svg: someone(shore[0], shore[1], 1.4, ITS_VOICE),
          keys: track({
            opacity: [
              [0.46, 0],
              [0.47, 1]
            ],
            xy: [
              [0.47, 0, 0],
              [at3(0.5 + i * 0.01), ...rel(shore, [86, 86])],
              [at3(0.54 + i * 0.006), ...rel(shore, to)]
            ]
          })
        })
      ),
      { name: "their voices: greeting him again", svg: arcsLeft(n(back[1][0] - 3), n(back[1][1] - 3), ITS_VOICE), keys: showFor(0.612, 0.62, 0.72, 0.73), loop: speaking },
      { name: "occupied in the prayer: a soft golden ring about his place", svg: care(his[0], his[1], 5.4, 3.6, SOFT_GOLD), keys: showAt(0.64, 0.66), loop: soft },
      { name: "his prayer: another spark rising", svg: sparkle(n(his[0] + 2.6), n(his[1] - 5.6), 1.4, "#FFE7A0"), keys: sparkStays(0.66, 0.69), loop: twinkle(900) },
      { name: "his voice: after the prayer", svg: arcs(n(his[0] + 3.6), n(his[1] - 2.6), GOLD), keys: showAt(0.81, 0.82), loop: speaking }
    ],
    words: linesOn(FIVE, [
      "Ibn Mas'ud: we used to greet him",
      "while he was praying, and he answered us.",
      "When we returned from an-Najashi,",
      "we greeted him, but he did not answer us,",
      "He said: in the prayer one is occupied."
    ])
  };
}

export const CLOSE_ART = {
  "drew-me-to-his-right": drewMeToHisRight,
  "they-would-draw-lots": theyWouldDrawLots,
  "i-swore-to-serve": iSworeToServe,
  "dearer-than-red-camels": dearerThanRedCamels,
  "the-scent-bag-of-a-perfumer": theScentBagOfAPerfumer,
  "why-so-many-hadith": whySoManyHadith,
  "in-the-prayer-one-is-busy": inThePrayerOneIsBusy
} as const;
