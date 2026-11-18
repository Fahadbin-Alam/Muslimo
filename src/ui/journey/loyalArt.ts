import { cloud, flower, glow, n, palm, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { crescent, home } from "./trialArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, jug, LIGHT, track } from "./daysArt";
import { cloth, greyRing, soft, spark, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { showAt, showFor } from "./roadArt";
import { dish } from "./worthArt";
import { faintRing, goldLine, litWindow, nightLand } from "./heedArt";

/**
 * Loyal ways, and what was kept, in his ﷺ days: the house of the prophets and its last brick; al-Khidr, and the white
 * land that stirred green behind him; Anas's dark mat, sprinkled for the prayer; the folk an excuse held back in
 * Madinah, who were with them all the way to Tabuk; the valley of the Ansar; the cloak kept for Makhramah; and Abu
 * Hurairah's long night, and his slave set free. Only the land, the sky, buildings, things, plants and animals are
 * drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a face: where someone was, a ring or
 * a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is
 * drawn for Allah, and nothing comes down from the sky: a prayer, or a slave set free, is a spark that rises.
 */

/** A time in the story, to three places. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** A brick of mud, its top left corner at (x, y): 6 across and 3 high. */
const brick = (x: number, y: number) => `<rect x="${x}" y="${y}" width="6" height="3" fill="#D9B07A" stroke="#B88A55" stroke-width="0.35"/>`;

/**
 * The walls of a house from x 40 to 100 and y 70 to 100, laid in ten courses of bricks, each course's joints set
 * between the next one's; but at its top right corner, the place of one brick is empty.
 */
const houseWalls = () => {
  let joints = "";
  for (let k = 0; k < 10; k += 1) {
    const y = 70 + 3 * k;
    for (let x = k % 2 ? 43 : 46; x < 100; x += 6) if (!(k === 0 && x >= 94)) joints += ` M${x} ${y} L${x} ${y + 3}`;
  }
  const courses = Array.from({ length: 9 }, (_, k) => `M40 ${73 + 3 * k} L100 ${73 + 3 * k}`).join(" ");
  const outline = "M40 100 L40 70 L94 70 L94 73 L100 73 L100 100";
  return (
    `<path d="${outline} Z" fill="#D9B07A"/><rect x="39" y="99" width="62" height="1.6" fill="#B89A6C"/>` +
    `<path d="${courses}${joints}" stroke="#B88A55" stroke-width="0.35" fill="none"/>` +
    `<path d="${outline}" stroke="#A97E4C" stroke-width="0.5" fill="none"/>`
  );
};

/** What made the house fine and fair: a band of light brick, an arched door with a golden edge, and two arched windows. */
const fineAndFair = () =>
  `<rect x="40" y="76.2" width="60" height="1.4" fill="#EED8AC"/><path d="M40 76.2 L100 76.2 M40 77.6 L100 77.6" stroke="#C9A570" stroke-width="0.3"/>` +
  `<path d="M65.4 100 L65.4 90.8 Q70 85.2 74.6 90.8 L74.6 100 Z" fill="#6B4A2E"/><path d="M66.4 100 L66.4 91.2 Q70 86.6 73.6 91.2 L73.6 100" stroke="#E8C45A" stroke-width="0.4" fill="none"/>` +
  [51, 89]
    .map((x) => `<path d="M${n(x - 2.2)} 88 L${n(x - 2.2)} 82.6 Q${x} 79.6 ${n(x + 2.2)} 82.6 L${n(x + 2.2)} 88 Z" fill="#6B4A2E"/><path d="M${n(x - 2.6)} 88.4 L${n(x + 2.6)} 88.4" stroke="#EED8AC" stroke-width="0.6"/>`)
    .join("");

// The last brick. Abu Hurairah said: the Messenger of Allah ﷺ said: my likeness and the likeness of the prophets
// before me is that of a man who built a house and made it fine and fair, but for the place of one brick in a corner.
// The folk began to go round it and wonder at it, and say: if only this brick were set! So I am that brick, and I am
// the last of the prophets (Sahih al-Bukhari 3535). No one is drawn: the faint outline of a house shows, a likeness;
// its walls rise, course on course of bricks, then its band, its arched door and its windows, fine and fair; but at
// its top corner the place of one brick is empty, and a faint dashed outline shows it. The places of the folk go round
// the house and glints show on it as they wonder at it; their voices speak, a line goes to the empty place and a grey
// ring comes about it. Then a brick rises from the ground by the house and is set in its place, and a golden ring comes
// about it; a golden line goes along the house's top, end to end, and a warm glow comes over the house, whole.
function theLastBrick(): SignArt {
  const round: [number, number][][] = [
    [
      [36, 103],
      [76, 108.6],
      [118, 102.6]
    ],
    [
      [30, 103.6],
      [68, 108.8],
      [112, 104.6]
    ],
    [
      [24, 103],
      [60, 108.2],
      [106, 102.8]
    ]
  ];
  const glints: [number, number][] = [
    [50, 92],
    [82, 84],
    [60, 81],
    [92, 94]
  ];
  return {
    kind: "the-last-brick",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "a cloud", svg: cloud(116, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [12, 74],
          [118, 76],
          [152, 72],
          [30, 116],
          [120, 116]
        ])
      },
      { name: "a palm 1", svg: palm(18, 97, 14), origin: { x: 18, y: 97 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm 2", svg: palm(142, 96, 15), origin: { x: 142, y: 96 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.4 } },
      {
        name: "a likeness: the faint outline of a house",
        svg: `<path d="M40 100 L40 70 L100 70 L100 100 Z" stroke="#FFFFFF" stroke-width="0.6" stroke-dasharray="1.4 1.2" fill="#FFFFFF" fill-opacity="0.14"/>`,
        keys: showFor(0.03, 0.07, 0.22, 0.245)
      },
      {
        name: "a house built: its walls rising",
        svg: houseWalls(),
        origin: { x: 70, y: 100 },
        keys: track({
          opacity: [
            [0.16, 0],
            [0.165, 1]
          ],
          scaleY: [
            [0.16, 0.03],
            [0.22, 1]
          ]
        })
      },
      { name: "fine and fair: its band, its door and its windows", svg: fineAndFair(), keys: showAt(0.21, 0.245) },
      {
        name: "one brick's place in a corner, empty",
        svg: `<rect x="94" y="70" width="6" height="3" stroke="#FFFFFF" stroke-width="0.5" stroke-dasharray="0.9 0.7" fill="#FFFFFF" fill-opacity="0.3"/>`,
        keys: showFor(0.3, 0.33, 0.78, 0.8)
      },
      { name: "going round it: a way about the house", svg: way("M30 102 Q30 110 70 110 Q110 110 112 102", "#B79B72", 0.9), keys: showAt(0.44, 0.47) },
      ...round.map(
        ([from, via, to], i): SignPart => ({
          name: `a place of the folk going round ${i + 1}`,
          svg: someone(from[0], from[1], 1.4),
          keys: track({
            opacity: [
              [0.44, 0],
              [0.45, 1]
            ],
            xy: [
              [0.44, 0, 0],
              [0.48, n(via[0] - from[0]), n(via[1] - from[1])],
              [0.52, n(to[0] - from[0]), n(to[1] - from[1])]
            ]
          })
        })
      ),
      {
        name: "wondering at it: glints on the house",
        svg: glints.map(([x, y]) => sparkle(x, y, 1.1, "#FFF3C0")).join(""),
        keys: showAt(0.48, 0.51),
        loop: { move: "twinkle", ms: 1200, low: 0.3 }
      },
      { name: "their voices: if only this brick were set", svg: arcsLeft(112, 97.4, VOICE), keys: showFor(0.58, 0.59, 0.655, 0.665), loop: speaking },
      { name: "a line from them to the empty place", svg: lookLine(108, 100.4, 99, 73.8, 88, VOICE), keys: showFor(0.6, 0.63, 0.78, 0.8) },
      { name: "a grey ring about the empty place", svg: greyRing(97, 71.5, 5.2, 3.2), keys: showFor(0.6, 0.63, 0.78, 0.8) },
      {
        name: "the last brick, set in its place",
        svg: glow(105, 98.5, 4.4, WARM, 0.22) + brick(102, 97),
        keys: track({
          opacity: [
            [0.72, 0],
            [0.725, 1]
          ],
          xy: [
            [0.725, 0, 0],
            [0.77, 0, -27],
            [0.79, -8, -27]
          ]
        })
      },
      { name: "the brick set: a golden ring about it", svg: ring(97, 71.5, 5, GOLD), keys: showAt(0.79, 0.805), loop: soft },
      {
        name: "the last: a golden line along the house's top",
        svg: goldLine(40, 100, 69.2, 1.1),
        origin: { x: 40, y: 69.2 },
        keys: track({
          opacity: [
            [0.86, 0],
            [0.865, 1]
          ],
          scaleX: [
            [0.86, 0.03],
            [0.92, 1]
          ]
        })
      },
      { name: "the house whole: a warm glow", svg: wash(70, 86, 42, 22, WARM, 0.1), keys: showAt(0.88, 0.92) }
    ],
    words: [
      { text: "My likeness and the prophets' before me", from: 0.02, to: 0.145 },
      { text: "Is a man who built a house, fine and fair", from: 0.16, to: 0.285 },
      { text: "But for one brick's place in a corner", from: 0.3, to: 0.425 },
      { text: "Folk went round it and wondered at it", from: 0.44, to: 0.565 },
      { text: "And said: if only this brick were set!", from: 0.58, to: 0.705 },
      { text: "So I am that brick", from: 0.72, to: 0.845 },
      { text: "And I am the last of the prophets", from: 0.86, to: 1 }
    ]
  };
}

/** A white, barren land: dry ground of pale earth with small cracks, its middle at (78, 101). */
const barren = () =>
  `<ellipse cx="78" cy="101" rx="44" ry="7.5" fill="#F1ECDF"/><ellipse cx="78" cy="101" rx="44" ry="7.5" stroke="#DCD3C0" stroke-width="0.5" fill="none"/>` +
  `<path d="M44 100.6 l4 1.4 l3 -1 M56 97 l3 1.6 l4 -0.6 M66 104.6 l3 -1.2 l3 1 M84 97.6 l4 1.2 l2 -0.8 M104 103.4 l3 -1 l3 1.2 M110 98.6 l3 1" stroke="#C9C0AE" stroke-width="0.4" fill="none"/>`;

/** The white land behind x 98 (to its left), made green. */
const greenBehind = () =>
  `<path d="M98 94.3 A44 7.5 0 1 0 98 107.7 Q101.6 101 98 94.3 Z" fill="#9CC56A"/>` +
  `<path d="M44 101 q3 -1.2 6 0 M58 97.6 q3 -1.2 6 0 M64 104.8 q3 -1.2 6 0 M80 98.4 q3 -1.2 6 0 M86 104.6 q3 -1.2 6 0" stroke="#7FAE52" stroke-width="0.5" fill="none"/>`;

// The green land. Abu Hurairah said: the Prophet ﷺ said: he was named al-Khidr only because he sat on a white, barren
// land, and lo, it stirred behind him, green (Sahih al-Bukhari 3402). No one is drawn: on a wide land lies a patch of
// white, barren ground. Al-Khidr's place, a small dashed circle, comes to it, and a soft green ring comes about it: the
// green one. A faint grey ring shows the land barren, and al-Khidr's place sits on it. Then, behind his place, the
// white land turns green, from where he sat back to its far edge, and plants and flowers grow up on it one after
// another, stirring as they grow; the grey ring fades, and a soft glow comes on the green.
function greenLand(): SignArt {
  const plants: { at: [number, number]; svg: string; from: number }[] = [
    { at: [88, 104], svg: tuft(86, 104, "#5FA344", 4.4) + flower(91, 104, "#FFFFFF", 5), from: 0.67 },
    { at: [75, 99.4], svg: flower(72, 99.4, "#F4A3B4", 5.6) + tuft(78, 99.4, "#4F9A3C", 4), from: 0.71 },
    { at: [60, 104.4], svg: tuft(57, 104.4, "#5FA344", 4.8) + tuft(63, 104.4, "#6BB04A", 3.6), from: 0.75 },
    { at: [46, 100.6], svg: tuft(43, 100.6, "#4F9A3C", 4) + flower(49, 100.6, "#F2E36B", 5.2), from: 0.79 }
  ];
  return {
    kind: "green-land",
    ms: 7000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(38, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 7000 } },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 74],
          [62, 72],
          [140, 76],
          [18, 116],
          [148, 114]
        ])
      },
      { name: "a white, barren land", svg: barren() },
      { name: "barren: a faint grey ring about it", svg: greyRing(78, 101, 46, 9), keys: showFor(0.4, 0.46, 0.66, 0.72) },
      {
        name: "behind al-Khidr's place, the land stirring green",
        svg: greenBehind(),
        origin: { x: 98, y: 101 },
        keys: track({
          opacity: [
            [0.64, 0],
            [0.645, 1]
          ],
          scaleX: [
            [0.64, 0.03],
            [0.84, 1]
          ]
        })
      },
      ...plants.map(
        ({ at, svg, from }, i): SignPart => ({
          name: `green growing, stirring ${i + 1}`,
          svg,
          origin: { x: at[0], y: at[1] },
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.005), 1]
            ],
            scaleY: [
              [from, 0.05],
              [at3(from + 0.08), 1]
            ]
          }),
          loop: { move: "sway", ms: 2400 + i * 300, angle: 3, phase: i / 4 }
        })
      ),
      { name: "a soft glow on the green", svg: wash(66, 101, 34, 8, "#EEF8CC", 0.16), keys: showAt(0.86, 0.92) },
      {
        name: "al-Khidr's place",
        svg: someone(14, 104.4, 1.6),
        keys: track({
          xy: [
            [0.04, 0, 0],
            [0.22, 82, -1.4],
            [0.34, 82, -1.4],
            [0.38, 82, 0]
          ]
        })
      },
      {
        name: "the green one: a soft green ring about al-Khidr's place",
        svg: care(96, 103.4, 4.4, 2.4, "#4F9A3C"),
        keys: track({
          opacity: [
            [0.22, 0],
            [0.26, 1]
          ],
          xy: [
            [0.34, 0, 0],
            [0.38, 0, 1.4]
          ]
        }),
        loop: soft
      }
    ],
    words: [
      { text: "He said: al-Khidr was named so", from: 0.02, to: 0.3 },
      { text: "Because al-Khidr sat on white, barren land", from: 0.32, to: 0.62 },
      { text: "And lo, it stirred green behind al-Khidr", from: 0.64, to: 1 }
    ]
  };
}

/** A mat of palm leaves lying on the ground, its middle at (x, y), 38 across: by default, dark from long use. */
const leafMat = (x: number, y: number, fill = "#5E4A33", weave = "#493826") =>
  `<path d="M${n(x - 21.5)} ${n(y + 3.2)} L${n(x + 16.5)} ${n(y + 3.2)} L${n(x + 21.5)} ${n(y - 3.2)} L${n(x - 16.5)} ${n(y - 3.2)} Z" fill="${fill}"/>` +
  `<path d="M${n(x - 17.8)} ${n(y - 1.6)} L${n(x + 20.2)} ${n(y - 1.6)} M${n(x - 19)} ${y} L${n(x + 19)} ${y} M${n(x - 20.2)} ${n(y + 1.6)} L${n(x + 17.8)} ${n(y + 1.6)}" stroke="${weave}" stroke-width="0.4"/>`;

/** Small drops of water at the given points. */
const drops = (list: [number, number][]) => list.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.6" ry="0.4" fill="#A9D4F2"/>`).join("");

/** A round loaf on a dish whose middle is at (x, y). */
const loaf = (x: number, y: number) =>
  dish(x, y) + `<ellipse cx="${n(x - 0.8)}" cy="${n(y - 2.2)}" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>`;

/** A few dates by the loaf on the dish whose middle is at (x, y). */
const datesOnDish = (x: number, y: number) =>
  [
    [1.6, -1.8],
    [2.7, -1.5],
    [2.2, -2.6]
  ]
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.8" ry="0.6" fill="#7A2E14"/>`)
    .join("");

/** Steam rising from food at (x, y). */
const steam = (x: number, y: number) =>
  [-1.4, 0.4, 2].map((dx, i) => `<path d="M${n(x + dx)} ${y} q-1 -1.2 0 -2.4 q1 -1.2 0 -2.4" stroke="#FFFFFF" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="${0.7 - i * 0.12}"/>`).join("");

// A mat for the prayer. Anas ibn Malik said: my grandmother Mulaykah invited the Messenger of Allah ﷺ to food she had
// made for him. He ate of it, then said: get up, and let me lead you in prayer. So I went to a mat of ours that had
// gone dark from long use, and sprinkled it with water. The Messenger of Allah ﷺ stood on it, the orphan and I lined
// up behind him, and the old lady behind us. He prayed two rak'ahs with us, then left (Sahih al-Bukhari 380). No one
// is drawn: by a home in Madinah, Mulaykah's place sits by a dish of food, steam rising from it, and the places of Anas
// and the orphan wait by the door; a dark mat of palm leaves lies behind. Her voice speaks, and his place, a golden
// ring, comes to the food. Some of it goes: he ate of it. His voice speaks, and a faint golden ring shows at the
// mat's front. Anas's place goes to the mat and a grey ring comes about it, dark from long use; a jug shows, drops of
// water show on the mat and it grows lighter, and his place stands at its front. Anas's place and the orphan's line up
// behind him, then Mulaykah's place behind them. Two sparks rise, one after the other, and his place goes on its way.
function matForPrayer(): SignArt {
  const mat: [number, number] = [72, 97.8];
  return {
    kind: "mat-for-prayer",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(132, 18) },
      { name: "a cloud", svg: cloud(60, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a palm of Madinah 1", svg: palm(100, 95, 15), origin: { x: 100, y: 95 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(146, 96, 13), origin: { x: 146, y: 96 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.4 } },
      { name: "Mulaykah's home", svg: home(22, 98, 28, 17) },
      { name: "a mat of palm leaves, dark from long use", svg: leafMat(mat[0], mat[1]) },
      {
        name: "the mat, sprinkled: a little lighter",
        svg: leafMat(mat[0], mat[1], "#A08A62", "#86704C"),
        keys: track({
          opacity: [
            [0.55, 0],
            [0.59, 0.6]
          ]
        })
      },
      { name: "dark from long use: a grey ring about the mat", svg: greyRing(mat[0], mat[1], 23, 5.6), keys: showFor(0.44, 0.47, 0.56, 0.59) },
      {
        name: "drops of water on the mat",
        svg: drops([
          [60, 97.4],
          [66, 99.6],
          [70, 95.8],
          [76, 98.4],
          [82, 96.2],
          [86, 99.4],
          [64, 95.6],
          [56, 99.8]
        ]),
        keys: showAt(0.545, 0.57),
        loop: { move: "twinkle", ms: 1400, low: 0.5 }
      },
      { name: "a cloth for the food", svg: cloth(70, 86, 106.4) },
      { name: "the food she made: a loaf on a dish", svg: loaf(78, 106.4) },
      {
        name: "he ate of it: some of the food",
        svg: datesOnDish(78, 106.4),
        keys: track({
          opacity: [
            [0.16, 1],
            [0.19, 0]
          ]
        })
      },
      { name: "steam rising from the food", svg: steam(77, 102.6), loop: { move: "twinkle", ms: 1600, low: 0.3 } },
      { name: "a jug of water", svg: jug(57.4, 104.8), keys: showAt(0.535, 0.545) },
      {
        name: "his place, a golden ring",
        svg: ring(130, 104.8, 2.6, GOLD),
        keys: track({
          opacity: [
            [0.02, 0],
            [0.03, 1]
          ],
          xy: [
            [0.03, 0, 0],
            [0.1, -36, 1.6],
            [0.57, -36, 1.6],
            [0.6, -44, -7.2],
            [0.935, -44, -7.2],
            [0.96, -28, -6.4]
          ]
        })
      },
      {
        name: "Mulaykah's place",
        svg: someone(62, 107.4, 1.5),
        keys: track({
          xy: [
            [0.775, 0, 0],
            [0.82, 2, -9.6]
          ]
        })
      },
      {
        name: "Anas's place",
        svg: someone(30, 104.2, 1.4),
        keys: track({
          xy: [
            [0.4, 0, 0],
            [0.46, 22, -1.6],
            [0.665, 22, -1.6],
            [0.71, 46, -8]
          ]
        })
      },
      {
        name: "the orphan's place",
        svg: someone(46, 106.8, 1.3),
        keys: track({
          xy: [
            [0.665, 0, 0],
            [0.71, 30, -7.4]
          ]
        })
      },
      { name: "Mulaykah's voice: inviting him", svg: arcs(64.4, 102.6, VOICE), keys: showFor(0.03, 0.04, 0.09, 0.1), loop: speaking },
      { name: "his voice: get up, let me lead you", svg: arcsLeft(91, 102, GOLD), keys: showFor(0.19, 0.2, 0.33, 0.34), loop: speaking },
      { name: "where he will lead: a faint golden ring at the mat's front", svg: faintRing(86, 97.6, 2.8, GOLD), keys: showFor(0.28, 0.32, 0.57, 0.59) },
      spark("the first rak'ah: a spark rising", 79, 91, 0.895, 0.93),
      spark("the second rak'ah: a spark rising", 83, 90, 0.925, 0.96)
    ],
    words: [
      { text: "Mulaykah invited him to food she made", from: 0.02, to: 0.14 },
      { text: "He ate of it, then said: get up", from: 0.155, to: 0.26 },
      { text: "And let me lead you in prayer", from: 0.275, to: 0.38 },
      { text: "Anas: I went to our mat, dark from use", from: 0.395, to: 0.52 },
      { text: "And sprinkled it with water", from: 0.535, to: 0.64 },
      { text: "The orphan and I lined up behind him", from: 0.655, to: 0.76 },
      { text: "And the old lady behind us", from: 0.775, to: 0.88 },
      { text: "He prayed two rak'ahs with us, then left", from: 0.895, to: 1 }
    ]
  };
}

/** A dry valley crossing the land from far off to near, its bed of pale sand and small stones. */
const valleyBed = () =>
  `<path d="M16 62 Q26 78 20 90 Q14 102 26 120 L44 120 Q30 102 34 90 Q40 78 24 62 Z" fill="#D4BB8A"/>` +
  `<path d="M20 62 Q31 78 27 90 Q22 102 35 120" stroke="#C4A877" stroke-width="0.6" fill="none" stroke-dasharray="1.2 1.4"/>` +
  [
    [22, 74],
    [26, 86],
    [21, 97],
    [31, 110]
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.6" fill="#A59C8C"/>`)
    .join("");

/** Small soft rings about each of the given places: held back. */
const heldRings = (list: [number, number][]) =>
  list
    .map(([x, y]) => `<ellipse cx="${x}" cy="${n(y + 0.4)}" rx="3" ry="1.8" stroke="#8FA9C4" stroke-width="0.6" stroke-dasharray="0.9 0.8" fill="#8FA9C4" fill-opacity="0.12"/>`)
    .join("");

// Held back by an excuse. Anas ibn Malik said: the Messenger of Allah ﷺ returned from the expedition of Tabuk, and when
// he neared Madinah he said: in Madinah are folk: you went no way and crossed no valley but they were with you. They
// said: O Messenger of Allah, and they are in Madinah? He said: and they are in Madinah; an excuse held them back
// (Sahih al-Bukhari 4423). No one is drawn: his place, a golden ring, and the places of those with him come along the
// way from Tabuk, across a dry valley, and stop near Madinah, its masjid, homes and palms, where the places of some
// folk wait. His voice speaks, and a faint ring comes about the folk in Madinah. A soft golden way shows along the way
// behind them, and a golden ring about the valley they crossed; then a faint golden line goes from the folk in Madinah
// to them, and a soft golden ring comes about the folk: they were with them. The voices of those with him ask; his
// voice answers; soft rings come about each of the folk in Madinah, held back, and a warm glow comes about them.
function heldBack(): SignArt {
  const withHim: [number, number][] = [
    [28, 105.4],
    [22, 102.6],
    [16, 104.8],
    [10, 102.8]
  ];
  const folk: [number, number][] = [
    [122, 104.6],
    [130, 106.2],
    [138, 104.6]
  ];
  const comes = track({
    xy: [
      [0.03, 0, 0],
      [0.13, 52, 0]
    ]
  });
  return {
    kind: "held-back",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(64, 16) },
      { name: "a cloud", svg: cloud(120, 26, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 11000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a dry valley on the way", svg: valleyBed() },
      { name: "the way from Tabuk to Madinah", svg: way("M0 102 Q50 107 112 103", "#B79B72", 1) },
      { name: "a palm of Madinah 1", svg: palm(102, 95, 15), origin: { x: 102, y: 95 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(156, 96, 13), origin: { x: 156, y: 96 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.4 } },
      { name: "the masjid of Madinah", svg: madinahMasjid(114, 99, 0.42) },
      { name: "a home of Madinah", svg: home(146, 100, 14, 10) },
      { name: "the folk in Madinah: their places", svg: folk.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "his place, a golden ring", svg: ring(36, 103.6, 2.6, GOLD), keys: comes },
      ...withHim.map((at, i): SignPart => ({ name: `a place with him ${i + 1}`, svg: someone(at[0], at[1], 1.4), keys: comes })),
      { name: "his voice: in Madinah are folk", svg: arcs(91.4, 99.4, GOLD), keys: showFor(0.2, 0.21, 0.265, 0.275), loop: speaking },
      { name: "the folk in Madinah: a faint ring about them", svg: care(130, 105.4, 12, 3.6, "#FFF3CF"), keys: showFor(0.22, 0.26, 0.5, 0.54) },
      { name: "the way they went: a soft golden way behind them", svg: way("M0 101.2 Q30 104.4 58 104", GOLD, 0.9), keys: showAt(0.34, 0.38) },
      { name: "a valley crossed: a soft golden ring about it", svg: care(27, 102.4, 9, 3.4, GOLD), keys: showAt(0.37, 0.41) },
      { name: "with you: a faint golden line from the folk in Madinah", svg: lookLine(122, 102.4, 92, 101, 94, GOLD), keys: showAt(0.47, 0.51) },
      { name: "with you: a soft golden ring about the folk in Madinah", svg: care(130, 105.4, 12, 3.6, GOLD), keys: showAt(0.5, 0.54), loop: soft },
      { name: "their voices: and they are in Madinah?", svg: arcs(70, 98.6, VOICE), keys: showFor(0.6, 0.61, 0.67, 0.68), loop: speaking },
      { name: "his voice: and they are in Madinah", svg: arcs(91.4, 99.4, GOLD), keys: showFor(0.735, 0.745, 0.805, 0.815), loop: speaking },
      { name: "an excuse held them back: soft rings about each of them", svg: heldRings(folk), keys: showAt(0.87, 0.9) },
      { name: "with them all the same: a warm glow about the folk in Madinah", svg: wash(130, 104.6, 16, 6, WARM, 0.14), keys: showAt(0.9, 0.94) }
    ],
    words: [
      { text: "He returned from Tabuk and neared Madinah", from: 0.02, to: 0.18 },
      { text: "He said: in Madinah are folk", from: 0.195, to: 0.315 },
      { text: "You went no way, crossed no valley", from: 0.33, to: 0.45 },
      { text: "But they were with you", from: 0.465, to: 0.585 },
      { text: "They said: and they are in Madinah?", from: 0.6, to: 0.72 },
      { text: "He said: and they are in Madinah", from: 0.735, to: 0.855 },
      { text: "An excuse held them back", from: 0.87, to: 1 }
    ]
  };
}

/** The hills about a valley: a hill on its left, a hill on its right, and beyond them a ridge with a pass in it. */
const valleyHills = () =>
  `<path d="M0 62 L0 46 Q10 34 26 32 Q44 30 58 44 Q66 52 72 62 Z" fill="#C2A77A"/><path d="M58 44 Q66 52 72 62 L64 62 Q60 52 52 44 Z" fill="#000000" opacity="0.08"/>` +
  `<path d="M88 62 Q94 50 106 42 Q118 34 128 33 Q136 33 140 40 L146 47 L152 41 Q156 38 160 39 L160 62 Z" fill="#C9B38C"/><path d="M88 62 Q94 50 106 42 L110 46 Q98 54 96 62 Z" fill="#FFFFFF" opacity="0.1"/>`;

// The valley of the Ansar. Abu Hurairah said: the Prophet ﷺ said: if the Ansar took a valley or a mountain pass, I
// would take the valley of the Ansar; and but for the hijrah, I would be one of the Ansar. Abu Hurairah said: he was
// not unjust, for they sheltered him and helped him (Sahih al-Bukhari 3779). No one is drawn: from the near land, one
// way goes up into a valley between two hills, and another up to a pass in the ridge beyond. The places of the Ansar
// take the way into the valley, and his place, a golden ring, takes it after them. A faint golden way shows from far
// off to his place, the hijrah, and a faint ring comes about them all. The place of one who spoke comes, and its voice
// speaks; then the places of the Ansar come about his place, on every side, and a soft golden ring and a warm glow
// come about them all.
function valleyOfTheAnsar(): SignArt {
  const ansar: { from: [number, number]; up: [number, number]; about: [number, number] }[] = [
    { from: [68, 104.6], up: [75, 76.4], about: [72.6, 83] },
    { from: [74, 106.4], up: [81, 74.6], about: [80, 78.6] },
    { from: [86, 105.4], up: [86, 77.2], about: [87.4, 83] },
    { from: [62, 103.6], up: [70, 79.8], about: [80, 87.4] }
  ];
  return {
    kind: "valley-of-the-ansar",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(84, 16) },
      { name: "a cloud", svg: cloud(30, 22, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 10000 } },
      { name: "the hills about a valley, and a ridge with a pass", svg: valleyHills() },
      { name: "the land", svg: land() },
      { name: "a palm 1", svg: palm(28, 98, 13), origin: { x: 28, y: 98 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm 2", svg: palm(140, 99, 14), origin: { x: 140, y: 99 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.4 } },
      { name: "a valley: a way into it between the hills", svg: way("M80 108 Q70 96 77 86 Q84 74 80 63", "#B79B72", 1) },
      { name: "a pass: a narrow way up the ridge", svg: way("M86 108 Q112 100 128 84 Q138 70 146 48", "#B79B72", 0.9) },
      { name: "the hijrah: a faint golden way from far off to his place", svg: way("M0 70 Q40 71 77 82", GOLD, 0.8), keys: showAt(0.34, 0.4) },
      { name: "one of the Ansar: a faint ring about them all", svg: care(79, 79.4, 13, 7, "#FFF3CF"), keys: showFor(0.5, 0.55, 0.81, 0.83) },
      ...ansar.map(
        ({ from, up, about }, i): SignPart => ({
          name: `a place of the Ansar ${i + 1}`,
          svg: someone(from[0], from[1], 1.4),
          keys: track({
            xy: [
              [0.03, 0, 0],
              [0.11, n(up[0] - from[0]), n(up[1] - from[1])],
              [0.82, n(up[0] - from[0]), n(up[1] - from[1])],
              [0.88, n(about[0] - from[0]), n(about[1] - from[1])]
            ]
          })
        })
      ),
      {
        name: "his place, a golden ring",
        svg: ring(100, 104.4, 2.6, GOLD),
        keys: track({
          xy: [
            [0.18, 0, 0],
            [0.26, -20, -21.4]
          ]
        })
      },
      { name: "the place of one who said: he was not unjust", svg: someone(120, 98, 1.4), keys: showAt(0.65, 0.66) },
      { name: "its voice: he was not unjust", svg: arcsLeft(117, 94.4, VOICE), keys: showFor(0.66, 0.67, 0.74, 0.75), loop: speaking },
      { name: "sheltered and helped: a soft golden ring about them all", svg: care(80, 83, 11.4, 6.6, GOLD), keys: showAt(0.88, 0.92), loop: soft },
      { name: "a warm glow about them all", svg: wash(80, 83, 18, 9, WARM, 0.12), keys: showAt(0.9, 0.94) }
    ],
    words: [
      { text: "If the Ansar took a valley or a pass", from: 0.02, to: 0.15 },
      { text: "I would take the valley of the Ansar", from: 0.17, to: 0.31 },
      { text: "And but for the hijrah", from: 0.33, to: 0.47 },
      { text: "I would be one of the Ansar", from: 0.49, to: 0.63 },
      { text: "Abu Hurairah said: he was not unjust", from: 0.65, to: 0.79 },
      { text: "They sheltered him and helped him", from: 0.81, to: 1 }
    ]
  };
}

/** A cloak, folded, its middle at (x, y), `fill` its colour, with a golden edge. */
const foldedCloak = (x: number, y: number, fill: string) =>
  `<rect x="${n(x - 3.4)}" y="${n(y - 1)}" width="6.8" height="2" rx="0.6" fill="${fill}"/><path d="M${n(x - 3.4)} ${n(y + 0.2)} L${n(x + 3.4)} ${n(y + 0.2)}" stroke="#E8C45A" stroke-width="0.4"/>`;

/** The faint dashed outline of a folded cloak, empty, its middle at (x, y). */
const emptyCloak = (x: number, y: number) =>
  `<rect x="${n(x - 3.4)}" y="${n(y - 1)}" width="6.8" height="2" rx="0.6" stroke="#FFFFFF" stroke-width="0.4" stroke-dasharray="0.9 0.9" fill="none" opacity="0.75"/>`;

// Kept for you. Al-Miswar ibn Makhramah said: the Messenger of Allah ﷺ shared out some cloaks and gave Makhramah none
// of them. Makhramah said: my son, let us go to the Messenger of Allah ﷺ. So I went with him, and he said: go in and
// call him for me. I called him for him, and he came out to him wearing one of them, and said: we kept this for you.
// Makhramah looked at it and said: Makhramah is pleased (Sahih al-Bukhari 2599). No one is drawn: in Madinah, by the
// door of his home, his place, a golden ring, shares out three cloaks to three places of the folk, and a faint empty
// outline of a cloak shows by Makhramah's place, by another home: none for him. His place goes in. Makhramah's voice
// speaks to al-Miswar's place, and their two places go along the way to his door. Makhramah's voice speaks again, and
// al-Miswar's place goes in at the door. Al-Miswar's place comes out, and his place comes out with a folded cloak, one
// of them. His voice speaks, and the cloak goes to Makhramah's place, a soft golden ring about it. A faint golden line
// goes from Makhramah's place to the cloak, and a warm glow comes about Makhramah's place: pleased.
function keptForYou(): SignArt {
  // The three cloaks, one on another by his door, each going to a place of the folk: [colour, x, y, to x, to y, from].
  const shared: [string, number, number, number, number, number][] = [
    ["#4E7A44", 39.8, 99.8, 54, 103.4, 0.03],
    ["#8A3E3E", 40.4, 101.9, 64, 104, 0.05],
    ["#3E6A8A", 40, 104, 74, 103.4, 0.07]
  ];
  return {
    kind: "kept-for-you",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the sun", svg: sun(136, 16) },
      { name: "a cloud", svg: cloud(70, 24, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a palm of Madinah 1", svg: palm(60, 95, 14), origin: { x: 60, y: 95 }, loop: { move: "sway", ms: 5400, angle: 1.4 } },
      { name: "a palm of Madinah 2", svg: palm(126, 95, 15), origin: { x: 126, y: 95 }, loop: { move: "sway", ms: 6000, angle: 1.4, phase: 0.4 } },
      { name: "a palm of Madinah 3", svg: palm(150, 97, 12), origin: { x: 150, y: 97 }, loop: { move: "sway", ms: 5800, angle: 1.4, phase: 0.7 } },
      { name: "his home", svg: home(30, 99, 28, 17) },
      { name: "Makhramah's home", svg: home(100, 99, 24, 15) },
      { name: "the way to his door", svg: way("M96 104 Q64 108 34 104", "#B79B72", 0.9) },
      { name: "a place of the folk 1", svg: someone(54, 100.4, 1.3) },
      { name: "a place of the folk 2", svg: someone(64, 101, 1.3) },
      { name: "a place of the folk 3", svg: someone(74, 100.4, 1.3) },
      ...shared.map(
        ([fill, x, y, tx, ty, from], i): SignPart => ({
          name: `a cloak shared out ${i + 1}`,
          svg: foldedCloak(x, y, fill),
          keys: track({
            xy: [
              [from, 0, 0],
              [at3(from + 0.04), n(tx - x), n(ty - y)]
            ]
          })
        })
      ),
      {
        name: "his place, a golden ring",
        svg: ring(28.2, 101.4, 2.6, GOLD),
        keys: track({
          opacity: [
            [0.105, 1],
            [0.12, 0],
            [0.6, 0],
            [0.61, 1]
          ],
          xy: [
            [0.1, -0.8, 4.4],
            [0.12, 0, 0],
            [0.6, 0, 0],
            [0.64, -0.8, 4.4]
          ]
        })
      },
      { name: "none for Makhramah: a faint empty outline of a cloak", svg: emptyCloak(97, 106.4), keys: showFor(0.09, 0.11, 0.245, 0.26) },
      {
        name: "Makhramah's place",
        svg: someone(92, 104.6, 1.5),
        keys: track({
          xy: [
            [0.33, 0, 0],
            [0.39, -50, -1]
          ]
        })
      },
      {
        name: "al-Miswar's place",
        svg: someone(86, 106.6, 1.3),
        keys: track({
          opacity: [
            [0.51, 1],
            [0.53, 0],
            [0.6, 0],
            [0.61, 1]
          ],
          xy: [
            [0.33, 0, 0],
            [0.39, -52, -2],
            [0.5, -52, -2],
            [0.53, -57.8, -5.2],
            [0.6, -57.8, -5.2],
            [0.64, -64, -0.6]
          ]
        })
      },
      { name: "Makhramah's voice: let us go to him", svg: arcsLeft(89, 100.8, VOICE), keys: showFor(0.19, 0.2, 0.255, 0.265), loop: speaking },
      { name: "Makhramah's voice: go in and call him", svg: arcsLeft(39.2, 99.8, VOICE), keys: showFor(0.45, 0.46, 0.49, 0.5), loop: speaking },
      {
        name: "one of the cloaks, with his place",
        svg: foldedCloak(32.6, 106.4, "#3E5F8A"),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.61, 1]
          ],
          xy: [
            [0.6, -4.4, -4.6],
            [0.64, 0, 0],
            [0.75, 0, 0],
            [0.79, 5, 0.6]
          ]
        })
      },
      { name: "his voice: we kept this for you", svg: arcs(31, 101.6, GOLD), keys: showFor(0.73, 0.74, 0.79, 0.8), loop: speaking },
      { name: "kept for Makhramah: a soft golden ring about Makhramah's place", svg: care(42, 104.2, 4.6, 3.4, GOLD), keys: showAt(0.78, 0.8), loop: soft },
      { name: "looked at it: a faint golden line from Makhramah's place to the cloak", svg: lookLine(41, 102.2, 37.8, 105.8, 100.6, GOLD), keys: showAt(0.86, 0.88) },
      { name: "pleased: a warm glow about Makhramah's place", svg: glow(42, 102.6, 6, WARM, 0.35), keys: showAt(0.89, 0.93) }
    ],
    words: [
      { text: "He shared out cloaks, gave Makhramah none", from: 0.02, to: 0.165 },
      { text: "Makhramah said: my son, let us go to him", from: 0.18, to: 0.305 },
      { text: "Al-Miswar: So I went with my father", from: 0.32, to: 0.43 },
      { text: "My father said: go in and call him for me", from: 0.445, to: 0.57 },
      { text: "He came out to him, wearing one of them", from: 0.585, to: 0.71 },
      { text: "He said: we kept this for you", from: 0.725, to: 0.84 },
      { text: "Makhramah looked at it, and was pleased", from: 0.855, to: 1 }
    ]
  };
}

/** The masjid of Madinah (giveArt.ts), darkened for the night. */
const nightMasjid = (x: number, y: number, s: number) =>
  madinahMasjid(x, y, s) +
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#0F1C3A" opacity="0.45"><rect x="0" y="-15.6" width="48" height="15.6"/><path d="M-2.4 -15 L50.4 -15 L48.6 -19 L-0.6 -19 Z"/></g>`;

/** A pale dashed ring on the dark ground about (x, y): weariness. */
const paleRing = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" stroke="#9AA0B8" stroke-width="0.6" stroke-dasharray="1 0.9" fill="none"/>`;

// The long night. Abu Hurairah said: when I came to the Prophet ﷺ, I said on the way: O night, how long and tiring!
// Yet from the land of kufr it saved us. A slave of mine ran away from me on the way. When I came to the Prophet ﷺ I
// gave him my pledge, and as I was with him, the slave appeared. The Messenger of Allah ﷺ said to me: O Abu Hurairah,
// here is your slave. I said: he is free, for the sake of Allah, and I freed him (Sahih al-Bukhari 2531). No one is
// drawn: at night, the traveller's place, a small dashed circle, and the slave's place come along the way to Madinah.
// The traveller's voice speaks, and a pale ring comes about its place: weary. Dawn comes, the stars fade, and a soft
// golden ring comes about them both: saved. The slave's place goes off by a way aside and is gone, and a faint ring
// shows where it was. The traveller's place comes to his place, a golden ring, by the masjid, and a soft golden ring
// comes about them both: the pledge. The slave's place comes along the way to them. His voice speaks, a faint golden
// line goes to the slave's place; the traveller's voice speaks, a soft golden ring comes about the slave's place, free,
// and a spark rises.
function longNight(): SignArt {
  return {
    kind: "long-night",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: `<rect width="160" height="120" fill="#0F1C3A"/><rect y="34" width="160" height="28" fill="#16284C"/>` },
      {
        name: "the dawn coming",
        svg: `<rect y="40" width="160" height="22" fill="#5C5A8A" opacity="0.6"/><rect y="52" width="160" height="10" fill="#C98E86" opacity="0.6"/>` + glow(124, 62, 24, "#FFD9A0", 0.07),
        keys: showAt(0.28, 0.34)
      },
      {
        name: "stars",
        svg: stars([
          [12, 10],
          [30, 30],
          [50, 14],
          [66, 26],
          [84, 8],
          [100, 22],
          [116, 12],
          [140, 28],
          [152, 10],
          [74, 40]
        ]),
        keys: track({
          opacity: [
            [0.28, 1],
            [0.34, 0.2]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.5 }
      },
      {
        name: "the moon",
        svg: crescent(36, 22, 4.6, 2.2, "#FFF3B8"),
        keys: track({
          opacity: [
            [0.28, 1],
            [0.34, 0.5]
          ]
        })
      },
      { name: "hills at night", svg: hills("#343B5E") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [18, 76],
          [62, 74],
          [112, 78],
          [30, 116],
          [124, 116]
        ])
      },
      { name: "the dawn on the land", svg: `<rect y="62" width="160" height="58" fill="#9C7A6A" opacity="0.22"/>`, keys: showAt(0.28, 0.34) },
      { name: "the way to Madinah", svg: way("M0 104 Q56 109 112 105", "#8A8FA8", 0.9) },
      { name: "a way aside, where the slave went off", svg: way("M60 107.6 Q54 101 46 95", "#6E738E", 0.8), keys: showAt(0.405, 0.43) },
      { name: "the masjid of Madinah at night", svg: nightMasjid(112, 99, 0.42) },
      { name: "palms of Madinah at night", svg: (palm(104, 96, 13, "#2F5A3A") + palm(152, 95, 14, "#2F5A3A")).replace(/#A87444/g, "#5C4632").replace(/#8A5A33/g, "#47372A") },
      { name: "a home of Madinah at night", svg: home(142, 99.6, 12, 9, "#8C7350", "#77603F", "#3A2A1C") + litWindow(142, 99.6, 9) },
      { name: "his place, a golden ring", svg: ring(128, 104.8, 2.6, GOLD) },
      {
        name: "the traveller's place",
        svg: someone(14, 104.4, 1.6, LIGHT),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, 26, 1],
            [0.28, 26, 1],
            [0.32, 52, 1.6],
            [0.54, 52, 1.6],
            [0.59, 104, 1.2]
          ]
        })
      },
      {
        name: "the slave's place",
        svg: someone(8, 106, 1.4, LIGHT),
        keys: track({
          opacity: [
            [0.43, 1],
            [0.47, 0],
            [0.66, 0],
            [0.67, 1]
          ],
          xy: [
            [0.03, 0, 0],
            [0.1, 26, 1],
            [0.28, 26, 1],
            [0.32, 52, 1.6],
            [0.41, 52, 1.6],
            [0.47, 38, -11],
            [0.655, 38, -11],
            [0.66, 80, 0.6],
            [0.67, 80, 0.6],
            [0.71, 102, 0.8]
          ]
        })
      },
      { name: "the traveller's voice: O night, how long", svg: arcs(42.4, 101.6, LIGHT), keys: showFor(0.16, 0.17, 0.21, 0.22), loop: speaking },
      { name: "tiring: a pale ring about the traveller's place", svg: paleRing(40, 106.4, 4, 2.4), keys: showFor(0.17, 0.2, 0.28, 0.3) },
      { name: "saved: a soft golden ring about them both", svg: care(63, 107, 7.4, 3, GOLD), keys: showFor(0.32, 0.34, 0.4, 0.42), loop: soft },
      { name: "gone: a faint ring where the slave's place was", svg: faintRing(60, 107.6, 2.2, "#C9CCDA"), keys: showFor(0.45, 0.48, 0.66, 0.68) },
      { name: "the pledge: a soft golden ring about his place and the traveller's place", svg: care(123, 105.4, 8.6, 3.2, GOLD), keys: showFor(0.59, 0.6, 0.7, 0.72), loop: soft },
      { name: "his voice: here is your slave", svg: arcsLeft(125, 100.6, GOLD), keys: showFor(0.78, 0.79, 0.83, 0.84), loop: speaking },
      { name: "a faint golden line from his place to the slave's place", svg: lookLine(125.4, 103.4, 111.4, 104.6, 98, GOLD), keys: showAt(0.79, 0.82) },
      { name: "the traveller's voice: he is free", svg: arcs(121.4, 100.8, LIGHT), keys: showFor(0.9, 0.91, 0.95, 0.96), loop: speaking },
      { name: "free: a soft golden ring about the slave's place", svg: care(110, 107, 3.6, 2.2, GOLD), keys: showAt(0.91, 0.94), loop: soft },
      spark("set free: a spark rising", 114, 99, 0.92, 0.96)
    ],
    words: [
      { text: "Abu Hurairah: On my way to him I said:", from: 0.02, to: 0.14 },
      { text: "O night, how long and tiring!", from: 0.155, to: 0.26 },
      { text: "Yet from the land of kufr it saved us", from: 0.275, to: 0.38 },
      { text: "A slave of mine ran away on the way", from: 0.395, to: 0.52 },
      { text: "When I came to him, I gave my pledge", from: 0.535, to: 0.64 },
      { text: "As I was with him, the slave appeared", from: 0.655, to: 0.76 },
      { text: "O Abu Hurairah, here is your slave", from: 0.775, to: 0.88 },
      { text: "I said: the slave is free for Allah's sake", from: 0.895, to: 1 }
    ]
  };
}

export const LOYAL_ART = {
  "the-last-brick": theLastBrick,
  "green-land": greenLand,
  "mat-for-prayer": matForPrayer,
  "held-back": heldBack,
  "valley-of-the-ansar": valleyOfTheAnsar,
  "kept-for-you": keptForYou,
  "long-night": longNight
};
