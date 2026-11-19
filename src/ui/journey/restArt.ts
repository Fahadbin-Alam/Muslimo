import { animalAt, cloud, glow, n, sky, stars, type SignArt } from "./signDraw";
import { madinahMasjid, ring, way } from "./giveArt";
import { arcs } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, someone, sun, WARM, wash } from "./worshipArt";
import { camel, care, lightIn, palms, tent, track } from "./daysArt";
import { DUSK, greyRing, soft, speaking } from "./fastArt";
import { saddled, showAt, showFor, SOFT_GOLD } from "./roadArt";
import { big, glints, linesOn, mat, places, plainLand, SIX, twinkle } from "./shareArt";
import { food } from "./hopeArt";
import { farHills, FIVE } from "./wideArt";
import { coins } from "./tradeArt";
import { NIGHT_OVER_LAND, NIGHT_OVER_SKY } from "./heedArt";
import { nightGreyRing } from "./seenArt";

/**
 * At rest, at home and on the road: the hut they were mending when he passed by, and his words that the matter is more
 * fleeting than that; his first words in Madinah, spread the salam, feed and pray while the people sleep; camping away
 * from the road at night; praying with something like the post of a camel saddle in front; giving milk or silver or
 * guiding one through a lane; and the seat of honor in a home, not sat in without leave. Only the land, the sky,
 * buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a
 * hand, a foot, a head, a mouth or a face: where someone was, a ring or a small dashed circle shows it, where someone
 * went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah, no book, page or letter is drawn,
 * and nothing comes down from the sky: what is good is a light, glints and a soft golden ring, and what is not to be
 * done a grey dashed ring. No name, word or number is written.
 */

/** The words of four lines. */
const FOUR = [
  [0.02, 0.25],
  [0.266, 0.5],
  [0.516, 0.75],
  [0.766, 1]
] as const;

/** The words of nine lines. */
const NINE = [
  [0.012, 0.117],
  [0.121, 0.226],
  [0.23, 0.335],
  [0.339, 0.444],
  [0.448, 0.553],
  [0.557, 0.662],
  [0.666, 0.771],
  [0.775, 0.88],
  [0.884, 1]
] as const;

/** Abdullah ibn Amr's place and voice: a deep teal. */
const AMR = "#3E6E7A";
/** Abdullah ibn Salam's place and voice: a muted purple. */
const SALAM = "#6A5E8E";
/** Abu Hurairah's place and voice: a deep brown. */
const HURAIRAH = "#7A5C3E";
/** Talhah's place and voice: a slate blue. */
const TALHAH = "#4E6E8E";
/** Al-Bara's place and voice: a plain green. */
const BARA = "#5E8A52";
/** Abu Mas'ud's place and voice: a warm brown. */
const MASUD = "#8A5A3A";
/** A place that gives, guides or welcomes: a blue green. */
const GIVES = "#4E7A9A";
/** A place that comes to visit or is helped: a dusty red. */
const COMES = "#9A6E5E";
/** Reeds and palm fronds: dry, and fresh. */
const REED = "#C9A66E";
const REED_DARK = "#9E7E4A";
const FRESH = "#8FB04E";

/** A move along the given points at the given times, from the first of them. */
const along = (list: [number, number][], times: number[]): [number, number, number][] => list.map(([x, y], i) => [times[i], n(x - list[0][0]), n(y - list[0][1])]);

/** A lane along the given points, the places going along it a little above its middle. */
const lane = (list: [number, number][], fill = "#D3BB8A") =>
  `<path d="M${list.map(([x, y]) => `${x} ${n(y + 1.2)}`).join(" L")}" stroke="${fill}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.75"/>`;

/** A hut of reeds and palm fronds, its foot's middle at (x, y), `w` wide and `h` high: its walls, its door and its roof. */
const reedHut = (x: number, y: number, w: number, h: number) => {
  const l = n(x - w / 2);
  const wall = n(h * 0.62);
  const top = n(y - wall);
  const strokes = Array.from({ length: Math.floor(w / 1.6) }, (_, i) => n(l + 0.8 + i * 1.6))
    .map((px) => `<path d="M${px} ${y} L${px} ${top}" stroke="${REED_DARK}" stroke-width="0.35" opacity="0.7"/>`)
    .join("");
  return (
    `<rect x="${l}" y="${top}" width="${w}" height="${wall}" fill="${REED}"/>` +
    strokes +
    `<rect x="${n(x + 1)}" y="${n(y - wall * 0.66)}" width="${n(w * 0.16)}" height="${n(wall * 0.66)}" fill="#5E4630"/>` +
    `<path d="M${n(l - 1.6)} ${n(top + 0.6)} Q${n(x - w * 0.2)} ${n(y - h)} ${x} ${n(y - h)} Q${n(x + w * 0.2)} ${n(y - h)} ${n(l + w + 1.6)} ${n(top + 0.6)} Z" fill="#B08A50"/>` +
    [0.22, 0.4, 0.58, 0.76]
      .map((k) => `<path d="M${n(l + w * k - 2)} ${n(top + 0.2)} Q${n(l + w * k)} ${n(top - (h - wall) * 0.6)} ${n(l + w * k + 1.4)} ${n(top - (h - wall) * 0.9)}" stroke="#8E6A38" stroke-width="0.35" fill="none"/>`)
      .join("")
  );
};

/** The weak side of that hut: a dark gap low in its wall, from x1 to x2 with its foot on y, and loose reeds leaning out. */
const weakSide = (x1: number, x2: number, y: number, h: number) =>
  `<rect x="${x1}" y="${n(y - h)}" width="${n(x2 - x1)}" height="${h}" fill="#7A5C38" opacity="0.55"/>` +
  [0, 0.4, 0.8]
    .map((k) => {
      const px = n(x1 + (x2 - x1) * k + 0.4);
      return `<path d="M${px} ${y} L${n(px - 3.2)} ${n(y - h - 1.2)}" stroke="${REED}" stroke-width="0.6" stroke-linecap="round"/>`;
    })
    .join("");

/** A fresh frond set upright in a wall, its foot at (x, y), `h` high. */
const frond = (x: number, y: number, h: number) =>
  `<path d="M${x} ${y} L${x} ${n(y - h)}" stroke="${FRESH}" stroke-width="0.8" stroke-linecap="round"/><path d="M${n(x - 0.5)} ${n(y - h * 0.5)} L${n(x + 0.5)} ${n(y - h * 0.5)}" stroke="#6E8E36" stroke-width="0.3"/>`;

/** The back post of a camel's saddle, a curved wooden upright, its foot's middle at (x, y), `s` times its size (5 high). */
const saddlePost = (x: number, y: number, s = 1) =>
  `<path d="M${n(x - 1.6 * s)} ${y} L${n(x - 1.6 * s)} ${n(y - 1 * s)} L${n(x - 0.5 * s)} ${n(y - 1 * s)} L${n(x - 0.5 * s)} ${n(y - 3.6 * s)} Q${n(x - 0.5 * s)} ${n(y - 5 * s)} ${n(x + 0.9 * s)} ${n(y - 5.1 * s)} L${n(x + 0.9 * s)} ${n(y - 4.2 * s)} Q${n(x + 0.5 * s)} ${n(y - 4.2 * s)} ${n(x + 0.5 * s)} ${n(y - 3.4 * s)} L${n(x + 0.5 * s)} ${n(y - 1 * s)} L${n(x + 1.6 * s)} ${n(y - 1 * s)} L${n(x + 1.6 * s)} ${y} Z" fill="#8A5A2E"/>` +
  `<path d="M${n(x - 0.2 * s)} ${n(y - 1.2 * s)} L${n(x - 0.2 * s)} ${n(y - 3.6 * s)}" stroke="#B07A44" stroke-width="${n(0.3 * s)}"/>`;

/** A seat of honor: a low cushion with a bolster behind it, its middle at (x, y). */
const cushion = (x: number, y: number) =>
  `<rect x="${n(x - 5.4)}" y="${n(y - 1.6)}" width="10.8" height="2" rx="0.8" fill="#9C3D2E"/><rect x="${n(x - 5.4)}" y="${n(y - 1.6)}" width="10.8" height="0.6" rx="0.3" fill="#C9674E"/>` +
  `<rect x="${n(x - 5.8)}" y="${n(y - 4.8)}" width="11.6" height="3.4" rx="1.6" fill="#B8573E"/><path d="M${n(x - 4.6)} ${n(y - 3.1)} L${n(x + 4.6)} ${n(y - 3.1)}" stroke="#E2B07A" stroke-width="0.4"/>`;

/** A home seen with its front open, from x1 to x2, its floor on y and its roof h above: its back wall, its two sides and its roof, and a door in its left side. */
const openHome = (x1: number, x2: number, y: number, h: number) =>
  `<rect x="${x1}" y="${n(y - h)}" width="${n(x2 - x1)}" height="${h}" fill="#E9D3A8"/>` +
  `<rect x="${x1}" y="${n(y - h * 0.34)}" width="${n(x2 - x1)}" height="${n(h * 0.34)}" fill="#DCC294"/>` +
  `<rect x="${n(x1 - 1.4)}" y="${n(y - h - 2)}" width="${n(x2 - x1 + 2.8)}" height="2.4" fill="#BC9060"/>` +
  `<rect x="${n(x1 - 1.4)}" y="${n(y - h)}" width="2.2" height="${n(h * 0.3)}" fill="#C79A66"/>` +
  `<rect x="${n(x2 - 0.8)}" y="${n(y - h)}" width="2.2" height="${h}" fill="#C79A66"/>` +
  `<rect x="${n(x1 - 1.4)}" y="${n(y - h * 0.7)}" width="2.2" height="${n(h * 0.7)}" fill="#6B4A2E" opacity="0.85"/>`;

/** A goat of the picture cards, `s` times its size, with its feet at (x, y). */
const goat = (x: number, y: number, s: number, left = false) => animalAt("goat", n(x - 50 * s), n(y - 73 * s), s, left);

/** A small bowl of milk, its foot's middle at (x, y). */
const milkBowl = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${n(y - 1.8)} Q${n(x - 2.2)} ${y} ${x} ${y} Q${n(x + 2.2)} ${y} ${n(x + 2.2)} ${n(y - 1.8)} Z" fill="#B5713F"/>` +
  `<ellipse cx="${x}" cy="${n(y - 1.8)}" rx="2.2" ry="0.6" fill="#FBF7EC"/>`;

/** A wolf of the picture cards, `s` times its size, with its feet at (x, y). */
const wolf = (x: number, y: number, s: number, left = false) => animalAt("wolf", n(x - 50 * s), n(y - 73 * s), s, left);

/** Small tufts of grass on fertile land, at the given feet. */
const tufts = (list: [number, number][]) =>
  list
    .map(([x, y]) => `<path d="M${n(x - 1.2)} ${y} L${n(x - 0.6)} ${n(y - 2)} M${x} ${y} L${x} ${n(y - 2.6)} M${n(x + 1.2)} ${y} L${n(x + 0.7)} ${n(y - 2)}" stroke="#5E8E36" stroke-width="0.6" stroke-linecap="round"/>`)
    .join("");

// Quicker than that. Abdullah ibn Amr said: the Messenger of Allah ﷺ passed by us while we were repairing a hut of
// ours, so he said: what is this? We said: it has become weak, so we are repairing it. He said: I do not think but that
// the matter is more fleeting than that (Jami at-Tirmidhi 2335). No one is drawn: Madinah, the masjid far off on the
// left, and a hut of reeds on the right, one side of it weak, with Abdullah's place and the place of one with him by
// it. Abdullah's voice tells of it. His place, a golden ring, comes along the lane and passes by them, and fresh fronds
// are set in the weak side, one after another. His voice asks, soft and golden; Abdullah's voice answers, and more
// fronds are set, and the loose reeds go. His voice speaks again, and the sun hurries across the sky to the evening:
// the matter is more fleeting than that.
function quickerThanThat(): SignArt {
  const amr: [number, number] = [91, 103.8];
  const withHim: [number, number] = [134, 104];
  const his: [number, number] = [74, 102.6];
  const hut: [number, number] = [114, 103];
  const fronds = [101.4, 103.4, 105.4, 102.4, 104.4];
  // When each frond is set, and when it is in place.
  const frondAt: [number, number][] = [
    [0.2, 0.21],
    [0.235, 0.245],
    [0.27, 0.28],
    [0.52, 0.53],
    [0.56, 0.57]
  ];
  return {
    kind: "quicker-than-that",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sky at evening", svg: DUSK, keys: showAt(0.88, 0.93) },
      { name: "the first star of the evening", svg: stars([[40, 16]]), keys: showAt(0.94, 0.95), loop: twinkle(2000) },
      { name: "the sun, hurrying across the sky: the day passing", svg: sun(30, 22), keys: track({ xy: [[0.82, 0, 0], [0.9, 98, 30]] }) },
      { name: "a cloud", svg: cloud(112, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      { name: "the masjid, far off", svg: big(madinahMasjid(2, 93, 1), 26, 93, 0.5) },
      ...palms(
        [
          [54, 92, 7],
          [146, 92, 7.4]
        ],
        "Madinah"
      ),
      { name: "a lane coming by the hut", svg: lane([[0, 103], [40, 102.6], [74, 102.4], [90, 103.6]]) },
      { name: "a hut of reeds", svg: reedHut(hut[0], hut[1], 24, 15) },
      { name: "its weak side: loose reeds leaning out", svg: weakSide(100.6, 106.4, hut[1], 6.4), keys: track({ opacity: [[0.58, 1], [0.6, 0]] }), origin: { x: 103, y: hut[1] }, loop: { move: "sway", ms: 2400, angle: 2 } },
      ...fronds.map((x, i) => ({ name: `a fresh frond, set in its weak side ${i + 1}`, svg: frond(x, hut[1], 8.6), keys: showAt(frondAt[i][0], frondAt[i][1]) })),
      { name: "Abdullah's place, by the hut", svg: someone(amr[0], amr[1], 1.5, AMR) },
      { name: "the place of one with him, by the hut", svg: someone(withHim[0], withHim[1], 1.5, AMR) },
      { name: "Abdullah's voice: telling of it", svg: arcsLeft(n(amr[0] - 2.4), n(amr[1] - 6), AMR), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "his place, a golden ring, passing by", svg: ring(4, 102.4, 2.6, GOLD), keys: track({ xy: [[0.03, 0, 0], [0.12, n(his[0] - 4), n(his[1] - 102.4)]] }) },
      { name: "his voice, soft and golden: what is this?", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showFor(0.34, 0.346, 0.4, 0.406), loop: speaking },
      { name: "Abdullah's voice: it has become weak", svg: arcsLeft(n(amr[0] - 2.4), n(amr[1] - 6), AMR), keys: showFor(0.42, 0.426, 0.6, 0.606), loop: speaking },
      { name: "his voice, soft and golden: more fleeting than that", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showAt(0.66, 0.666), loop: speaking }
    ],
    words: linesOn(SIX, [
      "Abdullah ibn Amr: he passed by us while",
      "We were repairing a hut of ours, so he",
      "Said: what is this? We said: it has",
      "Become weak, so we are repairing it. He",
      "Said: I do not think but that the matter",
      "Is more fleeting than that."
    ])
  };
}

// Not the face of a liar. Abdullah ibn Salam said: when the Messenger of Allah ﷺ arrived in Madinah, the people came
// out to meet him. It was said that the Messenger of Allah ﷺ had arrived, so I went among the people to get a look at
// him. When I gazed upon the face of the Messenger of Allah ﷺ, I knew that this face was not the face of a liar. The
// first thing that he spoke about was that he said: O you people! Spread the salam, feed others, and perform salat
// while the people are sleeping; you will enter Paradise with salam (Jami at-Tirmidhi 2485). "It was said that he had
// arrived" and the last words, on Paradise, are left out of the lines, and nothing is drawn for Paradise. No one is
// drawn: Madinah, its homes on the right and a road coming in from the left. Abdullah's voice tells of it. His place, a
// golden ring, comes along the road, and the places of the people come out from the homes to meet him. Abdullah's
// place goes among them to him, and a clear, soft light shows about his place: true. His voice speaks, soft and
// golden: glints go among the places, the salam; a dish of food goes among them; then night comes, the places go home
// to sleep, and one place prays on a mat, a soft light about it and a soft golden ring.
function notTheFaceOfALiar(): SignArt {
  const his: [number, number] = [58, 102.4];
  const salam: [number, number] = [146, 103.2];
  const near: [number, number] = [68, 105.4];
  const crowd: [number, number][] = [
    [96, 101.6],
    [106, 102.8],
    [118, 101.4],
    [128, 102.8],
    [138, 101.6]
  ];
  const gone = -30;
  const prays: [number, number] = [122, 104.6];
  return {
    kind: "not-the-face-of-a-liar",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(126, 22) },
      { name: "a cloud", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the night, falling: over the sky", svg: NIGHT_OVER_SKY, keys: showAt(0.886, 0.91) },
      { name: "the stars of the night", svg: stars([[20, 18], [48, 12], [78, 20], [104, 14], [134, 18], [152, 30]]), keys: showAt(0.9, 0.92), loop: twinkle(2200) },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [70, 118], [140, 117]]) },
      ...palms(
        [
          [28, 92, 7],
          [80, 91, 7.4]
        ],
        "Madinah"
      ),
      { name: "the homes of Madinah 1", svg: home(98, 97, 16, 11) },
      { name: "the homes of Madinah 2", svg: home(120, 96, 18, 12) },
      { name: "the homes of Madinah 3", svg: home(142, 97, 16, 11) },
      { name: "the road coming into Madinah", svg: lane([[0, 103.4], [30, 102.8], [58, 102.4], [90, 102.6]]) },
      { name: "a dish of food, by a home", svg: food(110, 100.6), keys: track({ xy: along([[110, 100.6], [92, 103.6], [76, 104.2]], [0.78, 0.81, 0.84]) }) },
      { name: "the night, falling: over the land", svg: NIGHT_OVER_LAND, keys: showAt(0.886, 0.91) },
      { name: "true: a clear, soft light about his place", svg: glow(his[0], n(his[1] - 0.4), 5, "#FFF3CF", 0.22), keys: showAt(0.455, 0.47), loop: soft },
      { name: "his place, a golden ring, coming into Madinah", svg: ring(6, 103.4, 2.6, GOLD), keys: track({ xy: [[0.02, 0, 0], [0.08, n(his[0] - 6), n(his[1] - 103.4)]] }) },
      {
        name: "the places of those who came out to meet him",
        svg: places(crowd, 1.5),
        keys: track({
          xy: [
            [0.125, 0, 0],
            [0.19, gone, 0.8]
          ],
          opacity: [
            [0.89, 1],
            [0.91, 0]
          ]
        })
      },
      {
        name: "Abdullah's place, going among them",
        svg: someone(salam[0], salam[1], 1.5, SALAM),
        keys: track({
          xy: along([salam, [120, 104], [120, 104], near], [0.15, 0.19, 0.24, 0.29]),
          opacity: [
            [0.89, 1],
            [0.91, 0]
          ]
        })
      },
      { name: "Abdullah's voice: telling of it", svg: arcs(n(salam[0] + 3.2), n(salam[1] - 2.8), SALAM), keys: showFor(0.016, 0.022, 0.08, 0.086), loop: speaking },
      { name: "his voice, soft and golden", svg: arcs(n(his[0] + 3.4), n(his[1] - 3.2), SOFT_GOLD), keys: showAt(0.57, 0.576), loop: speaking },
      { name: "spread the salam: glints among the places 1", svg: glints([[70, 98.6], [76, 97.6]]), keys: track({ opacity: [[0.68, 0], [0.69, 1], [0.89, 1], [0.91, 0]] }), loop: twinkle() },
      { name: "spread the salam: glints among the places 2", svg: glints([[84, 98.2], [90, 97.4]]), keys: track({ opacity: [[0.7, 0], [0.71, 1], [0.89, 1], [0.91, 0]] }), loop: twinkle() },
      { name: "spread the salam: glints among the places 3", svg: glints([[98, 98.4], [104, 97.4]]), keys: track({ opacity: [[0.72, 0], [0.73, 1], [0.89, 1], [0.91, 0]] }), loop: twinkle() },
      { name: "praying while they sleep: a place by its home, on a mat", svg: mat(prays[0], n(prays[1] + 1.4), 8) + someone(prays[0], prays[1], 1.5, GIVES), keys: showAt(0.92, 0.93) },
      { name: "a soft light about it as it prays", svg: lightIn(prays[0], n(prays[1] - 0.6), 3), keys: showAt(0.94, 0.95), loop: soft },
      { name: "a soft golden ring about it", svg: care(prays[0], n(prays[1] + 0.6), 6, 2.8, SOFT_GOLD), keys: showAt(0.955, 0.965), loop: soft }
    ],
    words: linesOn(NINE, [
      "Abdullah ibn Salam: when he arrived, the",
      "People came out to meet him, so I went",
      "Among the people to get a look at him.",
      "When I gazed upon his face, I knew that",
      "This face was not the face of a liar. The",
      "First thing that he spoke about was that",
      "He said: O you people! Spread the salam,",
      "Feed, and perform salat while the people",
      "Are sleeping."
    ])
  };
}

// Camp off the road. Abu Hurairah said that the Messenger of Allah ﷺ said: when you travel through fertile land,
// then give the camels their fill of the land, and when you travel through drought, then hasten while they are fresh,
// and when you camp late, then stay away from the road, for indeed it is the route of the beasts and the abode of
// poisonous vermin in the night (Jami at-Tirmidhi 2858). No one is drawn: a road across the land, green and fertile on
// the left, dry and cracked in the middle. Abu Hurairah's voice tells of it. The places of two who travel come along
// the road with their camels, no one on them; on the green land the camels stoop to graze and the grass goes. Then they
// hasten across the dry land. Night falls as they go on, and they turn away from the road to camp: a tent, and a faint
// grey dashed ring on the road where they do not stop. A wolf comes along the road, then a scorpion and a snake come
// out by it, and a soft golden ring comes about the camp.
function campOffTheRoad(): SignArt {
  const hurairah: [number, number] = [152, 109.2];
  const go: [number, number, number][] = [
    [0.02, -22, 0],
    [0.08, 0, 0],
    [0.35, 0, 0],
    [0.41, 52, -0.6],
    [0.46, 52, -0.6],
    [0.51, 70, -0.8],
    [0.56, 70, -0.8],
    [0.6, 80, -9]
  ];
  const travel = track({ xy: go });
  const graze = track({
    xy: go,
    rotate: [
      [0.13, 0],
      [0.15, 9],
      [0.34, 9],
      [0.35, 0]
    ]
  });
  const camels: [number, number][] = [
    [28, 104.4],
    [40, 104.8]
  ];
  const eaten: [number, number][][] = [
    [
      [34, 106.2],
      [37, 106.8]
    ],
    [
      [45, 106.6],
      [48, 106]
    ],
    [
      [40, 107.4],
      [52, 107.2]
    ]
  ];
  const camp: [number, number] = [140, 96];
  // When each tuft is eaten, and when it is gone: two while the camels first stoop, and one more on the next words.
  const EATEN: [number, number][] = [
    [0.15, 0.16],
    [0.175, 0.185],
    [0.24, 0.25]
  ];
  return {
    kind: "camp-off-the-road",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "hills far off", svg: farHills() },
      { name: "the night, falling: over the sky", svg: NIGHT_OVER_SKY, keys: showAt(0.45, 0.5) },
      { name: "the stars of the night", svg: stars([[18, 16], [44, 24], [70, 12], [96, 22], [122, 14], [148, 26]]), keys: showAt(0.47, 0.5), loop: twinkle(2200) },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [90, 118], [140, 117]]) },
      { name: "fertile land: green, on the left", svg: `<path d="M0 94 Q24 92 48 95 Q58 98 60 106 Q58 114 44 116 L0 116 Z" fill="#A8C870"/>` + tufts([[8, 100], [18, 98.4], [12, 110], [26, 112]]) },
      ...eaten.map((list, i) => ({ name: `the grass the camels graze ${i + 1}`, svg: tufts(list), keys: track({ opacity: [[EATEN[i][0], 1], [EATEN[i][1], 0]] }) })),
      {
        name: "drought: dry, cracked land in the middle",
        svg:
          `<path d="M60 96 Q84 94 106 96 Q112 104 108 114 L62 114 Q58 104 60 96 Z" fill="#D8BE8A"/>` +
          `<path d="M68 100 L72 102 L70 105 M80 108 L84 106 L88 108 M94 99 L97 102 L95 104 M100 109 L103 107" stroke="#A88A5A" stroke-width="0.45" fill="none"/>`
      },
      { name: "the road, across the land", svg: lane([[0, 103.6], [40, 103.4], [80, 103], [120, 103.4], [160, 103.8]], "#C9A66E") },
      { name: "a tent, away from the road", svg: tent(camp[0], camp[1], 14, 9), keys: showAt(0.6, 0.61) },
      { name: "the night, falling: over the land", svg: NIGHT_OVER_LAND, keys: showAt(0.45, 0.5) },
      { name: "Abu Hurairah's place", svg: someone(hurairah[0], hurairah[1], 1.5, HURAIRAH) },
      { name: "Abu Hurairah's voice: telling of it", svg: arcsLeft(n(hurairah[0] - 2.4), n(hurairah[1] - 6), HURAIRAH), keys: showFor(0.016, 0.022, 0.08, 0.086), loop: speaking },
      { name: "the places of the two who travel", svg: places([[12, 103.2], [19, 103.8]], 1.5, GIVES), keys: travel },
      ...camels.map(([x, y], i) => ({ name: `a camel going with them, no one on it ${i + 1}`, svg: camel(x, y, 0.13), origin: { x, y }, keys: graze })),
      { name: "not on the road: a faint grey dashed ring on it", svg: nightGreyRing(100, 104.6, 7, 2.4), keys: showAt(0.61, 0.62) },
      { name: "the route of the beasts: a wolf coming along the road", svg: wolf(150, 104.4, 0.11, true), keys: track({ xy: [[0.67, 26, 0], [0.73, 0, 0]] }) },
      { name: "the abode of vermin: a scorpion by the road", svg: animalAt("scorpion", n(88 - 50 * 0.07), n(107.6 - 52 * 0.07), 0.07, true), keys: showAt(0.78, 0.79) },
      { name: "and a snake by the road", svg: animalAt("snake", n(68 - 50 * 0.08), n(107.4 - 60 * 0.08), 0.08), keys: showAt(0.81, 0.82) },
      { name: "a soft golden ring about the camp", svg: care(116, 96, 32, 5, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft }
    ],
    words: linesOn(NINE, [
      "Abu Hurairah: he said: when you travel",
      "Through fertile land, then give the",
      "Camels their fill of the land, and when",
      "You travel through drought, then hasten",
      "While they are fresh, and when you camp",
      "Late, then stay away from the road, for",
      "Indeed it is the route of the beasts and",
      "The abode of poisonous vermin in the",
      "Night."
    ])
  };
}

/** The back post of a camel's saddle, in the picture card's own units: a curved wooden upright rising from the back of its saddle cloth. */
const SADDLE_POST = `<path d="M29.6 33 L29.6 22 Q29.6 18 25.1 17.6 L25.1 20 Q27 20.2 27 22.6 L27 33 Z" fill="#8A5A2E"/>`;

/** A camel with its saddle on and no one on it, `s` times its size with its feet at (x, y), facing left: the post at the back of the saddle. */
const withSaddlePost = (x: number, y: number, s: number) => saddled(x, y, s, true).replace(/<\/g>$/, `${SADDLE_POST}</g>`);

// Like the post of a saddle. Talhah said that the Messenger of Allah ﷺ said: when one of you placed something like the
// post of the camel saddle in front of him, then let him perform salat and not concern himself with who passes beyond
// that (Jami at-Tirmidhi 335). No one is drawn: a resting place in the desert, with a palm and a camel standing by with
// its saddle on, the post at the saddle's back. Talhah's voice tells of it. The place of one who will pray comes; the
// post of the camel's saddle glints, and something like it is set before the place. A mat is under it, and a soft light
// comes as it prays. Two places pass beyond the post, one after the other, and a soft golden ring comes about the one
// who prays, steady: not concerned.
function likeTheSaddlePost(): SignArt {
  const talhah: [number, number] = [16, 105];
  const prays: [number, number] = [58, 103.2];
  const post: [number, number] = [66.4, 104.2];
  const stands: [number, number] = [126, 104.6];
  return {
    kind: "like-the-saddle-post",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(108, 26, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [90, 118], [140, 117]]) },
      ...palms([[146, 92, 7.4]], "the resting place"),
      { name: "a camel standing by, with its saddle", svg: withSaddlePost(stands[0], stands[1], 0.15) },
      { name: "the post of its saddle: glints by it", svg: glints([[n(stands[0] + 5.2), n(stands[1] - 9.2)], [n(stands[0] + 2), n(stands[1] - 10)]]), keys: showFor(0.24, 0.25, 0.35, 0.36), loop: twinkle() },
      { name: "Talhah's place", svg: someone(talhah[0], talhah[1], 1.5, TALHAH) },
      { name: "Talhah's voice: telling of it", svg: arcs(n(talhah[0] + 3.2), n(talhah[1] - 2.8), TALHAH), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "a mat to pray on", svg: mat(prays[0], n(prays[1] + 1.4), 9), keys: showAt(0.45, 0.46) },
      { name: "the place of the one who will pray", svg: someone(30, prays[1], 1.5, GIVES), keys: track({ xy: [[0.05, 0, 0], [0.12, n(prays[0] - 30), 0]] }) },
      { name: "something like it, set before it", svg: saddlePost(post[0], post[1], 0.7), keys: track({ opacity: [[0.3, 0], [0.31, 1]], xy: [[0.3, -3, 0], [0.33, 0, 0]] }) },
      { name: "praying: a soft light about its place", svg: lightIn(prays[0], n(prays[1] - 0.6), 3), keys: showAt(0.63, 0.65), loop: soft },
      { name: "the place of one passing beyond it", svg: someone(84, 94, 1.3, COMES), keys: track({ opacity: [[0.81, 0], [0.82, 1]], xy: [[0.82, 0, 0], [0.88, 6, 14]] }) },
      { name: "and of another passing beyond it", svg: someone(96, 93.4, 1.3, COMES), keys: track({ opacity: [[0.85, 0], [0.86, 1]], xy: [[0.86, 0, 0], [0.92, 6, 14]] }) },
      { name: "not concerned: a soft golden ring about it, steady", svg: care(n(prays[0] + 0.6), n(prays[1] + 0.8), 7, 3.2, SOFT_GOLD), keys: showAt(0.93, 0.945), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Talhah: he said: when one of you placed",
      "Something like the post of the camel",
      "Saddle in front of him, then let him",
      "Perform salat and not concern himself",
      "With who passes beyond that."
    ])
  };
}


// Milk, silver or the way. Al-Bara ibn Azib said: I heard the Messenger of Allah ﷺ say: whoever gives someone some
// milk or silver, or guides him through a strait, then he will have the reward similar to freeing a slave (Jami
// at-Tirmidhi 1957). No one is drawn: lanes of Madinah, the home of one who gives on the left with its goat grazing, the
// home of another in the middle, and two homes close together on the right with a narrow lane between them, and a place
// lost before it, a faint grey dashed ring about it. Al-Bara's voice tells of it. A bowl of milk goes from the one who
// gives to the other, then silver coins. Then the place of the one who gives goes to the lost place, a faint golden way
// shows through the narrow lane, and they go along it together, the other going on through it. A soft golden ring comes
// about the one who gave, glints rise from it, and a warm light comes about it.
function milkSilverOrTheWay(): SignArt {
  const bara: [number, number] = [8, 107.6];
  const gives: [number, number] = [34, 103.6];
  const other: [number, number] = [64, 103.6];
  const lost: [number, number] = [124, 104.8];
  const guide: [number, number] = [116, 105.2];
  const out: [number, number] = [131, 95.6];
  return {
    kind: "milk-silver-or-the-way",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(30, 20) },
      { name: "a cloud", svg: cloud(96, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[20, 116], [90, 118], [150, 117]]) },
      { name: "the home of the one who gives", svg: home(26, 99, 18, 12) },
      { name: "the home of another", svg: home(70, 99, 18, 12, "#D8B080") },
      { name: "two homes close together, on the right", svg: home(117, 97.6, 16, 12, "#CFA470") + home(145, 97.6, 16, 13) },
      { name: "a narrow lane between them, going on", svg: `<path d="M125.4 104 L125.4 91 L136.6 91 L136.6 104 Z" fill="#D9C291"/><path d="M128 104 L129.4 93 L132.6 93 L134 104 Z" fill="#E6D3A6"/>` },
      { name: "a lane between the homes", svg: lane([[0, 104.4], [40, 104.2], [80, 104.4], [120, 105]]) },
      { name: "Al-Bara's place", svg: someone(bara[0], bara[1], 1.5, BARA) },
      { name: "Al-Bara's voice: telling of it", svg: arcs(n(bara[0] + 3.2), n(bara[1] - 2.8), BARA), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      { name: "the place of the other, by its home", svg: someone(other[0], other[1], 1.5, COMES) },
      { name: "a goat by its home, grazing", svg: goat(22, 106.6, 0.09), origin: { x: 22, y: 106.6 }, loop: { move: "bob", ms: 2000, y: 0.3 } },
      { name: "milk: a bowl of it, going to the other", svg: milkBowl(n(gives[0] + 5.4), 105.8), keys: track({ opacity: [[0.22, 0], [0.23, 1]], xy: [[0.23, 0, 0], [0.28, n(other[0] - gives[0] - 10.8), 0]] }) },
      { name: "silver: coins, going to the other", svg: coins(n(gives[0] + 5.4), 105.6, 3, "#D8DCE0", "#9AA0A8"), keys: track({ opacity: [[0.29, 0], [0.3, 1]], xy: [[0.3, 0, 0], [0.36, n(other[0] - gives[0] - 16.4), 0]] }) },
      { name: "lost: a faint grey dashed ring about the lost place", svg: `<g opacity="0.75">${greyRing(lost[0], n(lost[1] + 0.6), 4.4, 2.2)}</g>`, keys: track({ opacity: [[0.49, 1], [0.5, 0]] }) },
      { name: "the place that was lost, before the narrow lane, going on through it", svg: someone(lost[0], lost[1], 1.5, COMES), keys: track({ opacity: [[0.53, 1], [0.56, 0]], xy: along([lost, [130, 101.6], out], [0.5, 0.52, 0.55]) }) },
      {
        name: "the place of the one who gives, going to show the way",
        svg: someone(gives[0], gives[1], 1.5, GIVES),
        keys: track({ xy: along([gives, [80, 104.6], guide, [127.4, 102], [127.6, 97.4]], [0.42, 0.45, 0.48, 0.52, 0.55]) })
      },
      { name: "the way through the narrow lane: a faint golden way", svg: way("M120 105 Q128 103 130.4 98 L131 92.4", SOFT_GOLD, 0.9), keys: showAt(0.49, 0.5) },
      { name: "its reward: a soft golden ring about the one who gave", svg: care(127.6, 97.8, 3.6, 2.4, SOFT_GOLD), keys: showAt(0.62, 0.635), loop: soft },
      { name: "glints rising from it", svg: glints([[126, 93.6], [129.4, 92.4]]), keys: track({ opacity: [[0.66, 0], [0.67, 1]], xy: [[0.66, 0, 0], [0.7, 0, -8]] }), loop: twinkle() },
      { name: "a warm light about it", svg: wash(127.6, 97.6, 14, 6.4, WARM, 0.1), keys: showAt(0.82, 0.85), loop: soft }
    ],
    words: linesOn(FIVE, [
      "Al-Bara ibn Azib: he said: whoever",
      "Gives someone some milk or silver, or",
      "Guides him through a strait, then he",
      "Will have the reward similar to freeing",
      "A slave."
    ])
  };
}

// The seat of honor. Abu Mas'ud said that the Messenger of Allah ﷺ said: a man is not led in his dominion, and his
// seat of honor in his house is not sat in without his permission (Jami at-Tirmidhi 2772). No one is drawn: a home seen
// with its front open, a mat in it and a seat of honor by its back wall, the place of the one whose home it is inside.
// Abu Mas'ud's voice tells of it. The place of one who visits comes to its door. They pray: the place of the one whose
// home it is goes before on the mat, leading, and the one who visits stands behind. Then a soft light shows about the
// seat; the one who visits comes near it and stops, and a faint grey dashed ring shows about the seat: not without
// leave. The voice of the one whose home it is speaks, soft and golden; the grey ring goes, the one who visits sits in
// the seat, and a soft golden ring comes about both places.
function theSeatOfHonor(): SignArt {
  const masud: [number, number] = [150, 107.4];
  const owner: [number, number] = [104, 102.8];
  const leads: [number, number] = [90, 102.4];
  const visits: [number, number] = [12, 104.2];
  const behind: [number, number] = [76, 103.2];
  const seat: [number, number] = [124, 102.6];
  const waits: [number, number] = [110, 104.2];
  const beside: [number, number] = [134, 104];
  return {
    kind: "the-seat-of-honor",
    ms: 8000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#E6F2F8", 62) },
      { name: "the sun", svg: sun(26, 20) },
      { name: "a cloud", svg: cloud(108, 24, 0.42, "#FFFFFF", 0.85), loop: { move: "slide", ms: 8000 } },
      { name: "hills far off", svg: farHills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[16, 116], [90, 118], [150, 117]]) },
      ...palms([[22, 92, 7]], "Madinah"),
      { name: "a home, seen with its front open", svg: openHome(46, 140, 105, 24) },
      { name: "a mat in it, to pray on", svg: mat(84, 104, 22) },
      { name: "the seat of honor, by its back wall", svg: cushion(seat[0], seat[1]) },
      { name: "the seat of honor: a soft light about it", svg: glow(seat[0], n(seat[1] - 2.4), 5, "#FFF3CF", 0.1), keys: showAt(0.3, 0.31), loop: soft },
      { name: "Abu Mas'ud's place", svg: someone(masud[0], masud[1], 1.5, MASUD) },
      { name: "Abu Mas'ud's voice: telling of it", svg: arcsLeft(n(masud[0] - 3.2), n(masud[1] - 2.8), MASUD), keys: showFor(0.024, 0.03, 0.12, 0.126), loop: speaking },
      {
        name: "the place of the one whose home it is",
        svg: someone(owner[0], owner[1], 1.5, GIVES),
        keys: track({ xy: along([owner, leads, leads, [n(beside[0] - 0.4), n(beside[1] - 1.2)]], [0.14, 0.18, 0.32, 0.36]) })
      },
      {
        name: "the place of the one who visits, coming to the door",
        svg: someone(visits[0], visits[1], 1.5, COMES),
        keys: track({ xy: along([visits, [44, 104], [44, 104], behind, behind, waits, waits, [seat[0], n(seat[1] - 0.4)]], [0.04, 0.12, 0.16, 0.2, 0.36, 0.42, 0.82, 0.86]) })
      },
      { name: "leading in its home: a soft light about its place", svg: lightIn(leads[0], n(leads[1] - 0.6), 3), keys: showFor(0.2, 0.21, 0.28, 0.29), loop: soft },
      { name: "not without leave: a faint grey dashed ring about the seat", svg: `<g opacity="0.75">${greyRing(seat[0], n(seat[1] - 1.6), 7.4, 3.2)}</g>`, keys: showFor(0.43, 0.44, 0.8, 0.81) },
      { name: "leave: the voice of the one whose home it is, soft and golden", svg: arcsLeft(n(beside[0] + 0.4), n(beside[1] - 8.4), SOFT_GOLD), keys: showAt(0.78, 0.786), loop: speaking },
      { name: "a soft golden ring about both places", svg: care(128, 103.4, 11, 3.8, SOFT_GOLD), keys: showAt(0.9, 0.915), loop: soft }
    ],
    words: linesOn(FOUR, [
      "Abu Mas'ud: he said: a man is not led",
      "In his dominion, and his seat of honor",
      "In his house is not sat in without his",
      "Permission."
    ])
  };
}

export const REST_ART = {
  "quicker-than-that": quickerThanThat,
  "not-the-face-of-a-liar": notTheFaceOfALiar,
  "camp-off-the-road": campOffTheRoad,
  "like-the-saddle-post": likeTheSaddlePost,
  "milk-silver-or-the-way": milkSilverOrTheWay,
  "the-seat-of-honor": theSeatOfHonor
} as const;
