import { animalAt, cloud, flower, glow, n, nightSky, palm, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { ring, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { arcsLeft } from "./companionArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, goldCoin, palms, sparkRising, track } from "./daysArt";
import { cloth, greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { dish, roundTree } from "./worthArt";
import { cup, curl } from "./hopeArt";
import { litWindow } from "./heedArt";
import { DREAM_STARS } from "./seenArt";
import { fruitTree, palaceOfParadise, river } from "./pleasedArt";

/**
 * Bright: the Hour will not be established until the sun rises from the West, and when the people see it, whoever is
 * living on the earth will have faith, when no good will it do a soul to believe then, if it believed not before; the
 * first group to enter Paradise will be like the moon when it is full, their utensils of gold, their combs of gold and
 * silver, their sweat smelling like musk, and their hearts as if one heart; when he died, he left no dirham or dinar,
 * no slave or slave woman, nor anything else, except his white mule, his arms and a piece of land he had given in
 * charity; the most excellent dinar is the one spent on one's family, then the one spent on one's animal in Allah's
 * path, and the one spent on one's companions in Allah's path; one who visits the sick remains in the fruit garden of
 * Paradise, a place abounding in fruits; Abdullah ibn Salam saw in a dream a post fixed in a green garden, with a
 * handhold at its top, and was asked to climb, and climbed it till he got hold of the handhold, and he said: Abdullah
 * will die while still holding the firm reliable handhold; and he saw in the night that they were in the house of
 * Uqbah ibn Rafi', and were brought fresh dates of Ibn Tab, and took it as the sublimity for them in the world, a good
 * ending in the Hereafter, and that their religion is good. Only the land, the sky, buildings, things, plants and
 * animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where
 * someone was, a ring or a small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in
 * the air. Nothing is drawn for Allah or for the Hour. Paradise is a soft light with no sun in it. Nothing comes down
 * from the sky: what is good is a light, glints and a soft golden ring, and what does no good is a grey ring. Nothing
 * is drawn for his death, and his arms are not drawn. No name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The places of the folk: of a town, of Paradise, of a family. */
const FOLK = "#C39A5A";

/** A light voice, for the dark sky of a dream. */
const DREAM_VOICE = "#F3E3C0";

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 112], [64, 115], [112, 113], [150, 114]]) => landOf(tufts, fill);

/** Paradise: a soft light with no sun in it, over green hills and gardens. */
const paradise = (ms: number, cloudX = 40): SignPart[] => [
  { name: "sky", svg: sky("#FCEFD4", "#FBF4E2", 62) },
  { name: "the soft light of the gardens", svg: wash(80, 34, 76, 26, "#FFF8E0", 0.3), loop: { move: "twinkle", ms: 2600, low: 0.8 } },
  { name: "a cloud", svg: cloud(cloudX, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms } },
  { name: "green hills", svg: hills("#B9DC9C") },
  { name: "the gardens", svg: plainLand("#CDEAB0", [[18, 110], [64, 116], [112, 117], [148, 112]]) }
];

/** Flowers at each of `list`. */
const flowers = (list: [number, number, string][]): SignPart => ({
  name: "flowers",
  svg: list.map(([x, y, petal]) => flower(x, y, petal, 4)).join(""),
  loop: { move: "sway", ms: 3000, angle: 1.6 }
});

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A picture made `s` times bigger about the point (x, y). */
const bigger = (svg: string, x: number, y: number, s: number) => `<g transform="translate(${n(x * (1 - s))} ${n(y * (1 - s))}) scale(${s})">${svg}</g>`;

/** The sky of a dream, its stars, its land in `ground`, and its soft haze. */
const dream = (ground: SignPart): SignPart[] => [
  { name: "sky of the dream", svg: sky("#4F4A8C", "#7D77BE", 62) },
  { name: "stars of the dream", svg: stars(DREAM_STARS), loop: { move: "twinkle", ms: 1500, low: 0.3 } },
  ground,
  { name: "a dream: a soft haze", svg: wash(80, 64, 96, 64, "#FFFFFF", 0.025), loop: { move: "twinkle", ms: 2600, low: 0.6 } }
];

/** Stars of the night over the town. */
const NIGHT_STARS: [number, number][] = [
  [14, 12],
  [38, 24],
  [62, 10],
  [96, 16],
  [120, 8],
  [146, 22],
  [80, 32],
  [132, 40],
  [26, 44],
  [108, 36]
];

/** The dark of the night over the hills and the land. */
const NIGHT_OVER_LAND = `<g opacity="0.62">${hills("#1B2547")}<rect y="61" width="160" height="59" fill="#1B2547"/></g>`;

// The sun from the West. Abu Hurairah said: the Messenger of Allah ﷺ said: the Hour will not be established until the
// sun rises from the West; and when the people see it, whoever will be living on the surface of the earth will have
// faith, and that is when no good will it do to a soul to believe then, if it believed not before (Sahih al-Bukhari
// 4635). Nothing is drawn for the Hour, and no one is drawn: a town at night under the stars, its windows lit, and the
// place of one that believed before, with a soft golden ring about it. Then a glow comes low on the left, in the West,
// and the sun rises there: the night goes and the day comes. The places come out of their homes, and others show far
// off on the earth; a white ring of faith comes about each. Then each white ring goes, and a grey ring comes: no good
// will it do. A warm light comes about the place that believed before, and glints over its golden ring.
function theSunFromTheWest(): SignArt {
  const homes: [number, number, number, number][] = [
    [26, 90, 18, 12],
    [58, 87, 16, 10],
    [104, 87, 16, 10],
    [136, 90, 18, 12]
  ];
  const before: [number, number] = [82, 101];
  const near: [number, number][] = [
    [30, 104],
    [56, 108],
    [108, 108],
    [132, 104]
  ];
  const far: [number, number][] = [
    [42, 72],
    [84, 70.4],
    [122, 72]
  ];
  // Every place that will have faith then, with its size: the near ones, then the far ones.
  const places: [number, number, number][] = [...near.map(([x, y]): [number, number, number] => [x, y, 1]), ...far.map(([x, y]): [number, number, number] => [x, y, 0.72])];
  const night = (from: number, to: number) =>
    track({
      opacity: [
        [from, 1],
        [to, 0]
      ]
    });
  return {
    kind: "the-sun-from-the-west",
    ms: 12000,
    parts: [
      { name: "the day sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "the night sky", svg: nightSky(62), keys: night(0.3, 0.36) },
      { name: "stars", svg: stars(NIGHT_STARS), keys: night(0.3, 0.34), loop: { move: "twinkle", ms: 2200, low: 0.6 } },
      { name: "the West: a glow low on the left", svg: wash(18, 58, 34, 16, "#FFC98A", 0.22), keys: showAt(0.268, 0.3), loop: soft },
      {
        name: "the sun, rising from the West",
        svg: sun(22, 40),
        keys: track({
          opacity: [
            [0.29, 0],
            [0.3, 1]
          ],
          xy: [
            [0.3, 0, 26],
            [0.36, 0, 0]
          ]
        })
      },
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: landOf([
          [14, 116],
          [70, 118],
          [120, 117],
          [150, 115]
        ])
      },
      { name: "homes", svg: homes.map(([x, y, w, h]) => home(x, y, w, h)).join("") },
      { name: "the night over the land", svg: NIGHT_OVER_LAND, keys: night(0.3, 0.36) },
      { name: "lit windows", svg: homes.map(([x, y, , h]) => litWindow(x, y, h)).join(""), keys: night(0.3, 0.36), loop: soft },
      { name: "a soft golden ring about the place that believed before", svg: care(before[0], n(before[1] + 0.4), 4.4, 1.8, SOFT_GOLD), loop: soft },
      { name: "the place that believed before", svg: someone(before[0], before[1], 1.6, FOLK) },
      ...near.map(([x, y], i): SignPart => {
        const [hx, hy] = homes[i];
        const from = at3(0.42 + 0.012 * i);
        return {
          name: `a place come out of its home ${i + 1}`,
          svg: someone(x, y, 1.5, FOLK),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.004), 1]
            ],
            xy: [
              [from, n(hx - 1.8 - x), n(hy - 1.2 - y)],
              [at3(from + 0.02), 0, 0]
            ]
          })
        };
      }),
      ...far.map(
        ([x, y], i): SignPart => ({
          name: `a place far off on the earth ${i + 1}`,
          svg: someone(x, y, 1.1, FOLK),
          keys: showAt(at3(0.54 + 0.015 * i), at3(0.55 + 0.015 * i))
        })
      ),
      ...places.map(([x, y, s], i): SignPart => {
        const from = at3(0.664 + 0.008 * i);
        return {
          name: `will have faith: a white ring about place ${i + 1}`,
          svg: glow(x, n(y - 0.4), n(3.4 * s), "#FFFFFF", 0.3) + care(x, n(y + 0.4), n(3.6 * s), n(1.6 * s), "#FFFFFF"),
          keys: showFor(from, at3(from + 0.01), 0.785, 0.795)
        };
      }),
      ...places.map(([x, y, s], i): SignPart => {
        const from = at3(0.79 + 0.006 * i);
        return { name: `no good will it do: a grey ring about place ${i + 1}`, svg: greyRing(x, n(y + 0.4), n(3.8 * s), n(1.8 * s)), keys: showAt(from, at3(from + 0.01)) };
      }),
      { name: "it believed before: a warm light about its place", svg: glow(before[0], n(before[1] - 0.6), 6, WARM, 0.36), keys: showAt(0.9, 0.93), loop: soft },
      {
        name: "glints over the golden ring",
        svg: glints(
          [
            [76, 98],
            [88, 98],
            [82, 95]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.92, 0.95),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Hurairah: he said: The Hour", from: 0.02, to: 0.13 },
      { text: "will not be established until", from: 0.142, to: 0.252 },
      { text: "the sun rises from the West;", from: 0.264, to: 0.4 },
      { text: "and when the people see it,", from: 0.412, to: 0.522 },
      { text: "whoever will be living on the earth", from: 0.534, to: 0.644 },
      { text: "will have faith; and that is when", from: 0.656, to: 0.766 },
      { text: "no good will it do to a soul to believe", from: 0.778, to: 0.883 },
      { text: "then, if it believed not before.", from: 0.895, to: 1 }
    ]
  };
}

/** A gate of Paradise: a tall arch of soft white and gold, its foot's middle at (x, y), `w` wide and `h` high, with a warm light in its way through (its doors are parts of their own). */
const gateOfParadise = (x: number, y: number, w: number, h: number) => {
  const l = n(x - w / 2);
  const r = n(x + w / 2);
  const i = n(w / 2 - 2.4);
  const spring = n(y - h + w / 2);
  const crown = n(y - h - w * 0.3);
  const inner = `L${n(x + i)} ${y} L${n(x + i)} ${n(spring + 1)} Q${x} ${n(crown + 3.4)} ${n(x - i)} ${n(spring + 1)} L${n(x - i)} ${y} Z`;
  return (
    `<path d="M${n(x - i)} ${y} L${n(x - i)} ${n(spring + 1)} Q${x} ${n(crown + 3.4)} ${n(x + i)} ${n(spring + 1)} L${n(x + i)} ${y} Z" fill="#FFF6DA"/>` +
    glow(x, n(y - h * 0.4), n(i * 0.9), WARM, 0.2) +
    `<path d="M${l} ${y} L${l} ${spring} Q${x} ${crown} ${r} ${spring} L${r} ${y} ${inner}" fill="#F7EBCB" stroke="#E0B878" stroke-width="0.5"/>` +
    `<circle cx="${x}" cy="${n(y - h + w * 0.1 - 1.4)}" r="1.2" fill="#F2C94C"/>`
  );
};

/** A door of a gate of Paradise, from x1 to x2 and from `top` down to its foot at y. */
const gateDoor = (x1: number, x2: number, top: number, y: number) => {
  const w = n(x2 - x1);
  const h = n(y - top);
  return (
    `<rect x="${x1}" y="${top}" width="${w}" height="${h}" fill="#EBCB7E" stroke="#C99A48" stroke-width="0.4"/>` +
    `<rect x="${n(x1 + 1.1)}" y="${n(top + 1.4)}" width="${n(w - 2.2)}" height="${n(h * 0.38)}" fill="none" stroke="#F7E2A8" stroke-width="0.4"/>` +
    `<rect x="${n(x1 + 1.1)}" y="${n(top + h * 0.52)}" width="${n(w - 2.2)}" height="${n(h * 0.38)}" fill="none" stroke="#F7E2A8" stroke-width="0.4"/>`
  );
};

/** A round light like the full moon about a place at (x, y). */
const fullMoonLight = (x: number, y: number) => glow(x, n(y - 0.6), 5.6, "#F4F1DE", 0.36) + `<circle cx="${x}" cy="${n(y - 0.6)}" r="2.8" fill="#FFFDF0" opacity="0.75"/>`;

/** A cup of gold, its foot's middle at (x, y). */
const goldCup = (x: number, y: number) => cup(x, y).replace("#8FB8D6", "#F2C94C").replace("#D8ECF8", "#FFF0B8");

/** A dish of gold, its middle at (x, y). */
const goldDish = (x: number, y: number) => dish(x, y).replace("#B8864A", "#EFC24C").replace("#946A34", "#C79A2E");

/** A comb lying on the grass, its back's middle at (x, y), in `fill` edged with `edge`. */
const comb = (x: number, y: number, fill: string, edge: string) =>
  `<rect x="${n(x - 3)}" y="${n(y - 0.6)}" width="6" height="1.3" rx="0.5" fill="${fill}" stroke="${edge}" stroke-width="0.25"/>` +
  [0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${n(x - 2.6 + i * 0.86)} ${n(y + 0.6)} L${n(x - 2.6 + i * 0.86)} ${n(y + 2.4)}" stroke="${fill}" stroke-width="0.45" stroke-linecap="round"/>`).join("");

// Like the full moon. Abu Hurairah said: the Messenger of Allah ﷺ said: the first group who will enter Paradise will be
// like the moon when it is full; their utensils will be of gold and their combs of gold and silver, and their sweat
// will smell like musk; their hearts will be as if one heart (Sahih al-Bukhari 3245, and 3327). Nothing is drawn for
// Allah, and no one is drawn: the gardens of Paradise in a soft light, white palaces far off, a river and fruit trees,
// and on the left a gate of Paradise. Glints come over the gardens; the gate's doors open, and the places of the first
// group come in through it. A round light like the full moon comes about each. Cups and a dish of gold show by them,
// then a comb of gold and a comb of silver, with glints; a sweet smell rises from each place; and one soft golden ring
// comes about them all, with a warm light and glints.
function likeTheFullMoon(): SignArt {
  const gate = { x: 30, y: 108, w: 20, h: 30 };
  const inner = n(gate.w / 2 - 2.4);
  const doorTop = n(gate.y - gate.h + gate.w / 2 + 1);
  const atGate: [number, number] = [30, 104];
  const group: [number, number][] = [
    [62, 104],
    [74, 100],
    [86, 104],
    [68, 110],
    [80, 110]
  ];
  const doors = track({
    scaleX: [
      [0.17, 1],
      [0.2, 0.14]
    ]
  });
  return {
    kind: "like-the-full-moon",
    ms: 9000,
    parts: [
      ...paradise(9000, 112),
      { name: "a palace of Paradise, far off 1", svg: palaceOfParadise(104, 72, 0.9), loop: { move: "twinkle", ms: 2400, low: 0.9 } },
      { name: "a palace of Paradise, far off 2", svg: palaceOfParadise(142, 74, 0.9), loop: { move: "twinkle", ms: 2700, low: 0.9, phase: 0.5 } },
      { name: "a river of Paradise", svg: river("M150 64 C146 76 156 86 152 98 C150 106 156 112 160 118", 2.6), loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "a fruit tree of Paradise 1", svg: fruitTree(126, 96, 14), origin: { x: 126, y: 96 }, loop: { move: "sway", ms: 4800, angle: 1.4 } },
      { name: "a fruit tree of Paradise 2", svg: fruitTree(56, 92, 12), origin: { x: 56, y: 92 }, loop: { move: "sway", ms: 5300, angle: 1.4, phase: 0.4 } },
      flowers([
        [10, 112, "#F6A6C1"],
        [46, 116, "#FFFFFF"],
        [92, 118, "#F6A6C1"],
        [140, 114, "#FFFFFF"]
      ]),
      {
        name: "the gardens of Paradise: glints over them",
        svg: glints(
          [
            [104, 62],
            [142, 64],
            [126, 80],
            [56, 78]
          ],
          1.1,
          "#F2C94C"
        ),
        keys: showAt(0.04, 0.08),
        loop: twinkle()
      },
      { name: "a gate of Paradise", svg: gateOfParadise(gate.x, gate.y, gate.w, gate.h) },
      { name: "the gate's door on the left", svg: gateDoor(n(gate.x - inner), gate.x, doorTop, gate.y), origin: { x: n(gate.x - inner), y: gate.y }, keys: doors },
      { name: "the gate's door on the right", svg: gateDoor(gate.x, n(gate.x + inner), doorTop, gate.y), origin: { x: n(gate.x + inner), y: gate.y }, keys: doors },
      ...group.map(
        ([x, y], i): SignPart => ({
          name: `like the moon when it is full: a round light about place ${i + 1}`,
          svg: fullMoonLight(x, y),
          keys: showAt(at3(0.31 + 0.012 * i), at3(0.322 + 0.012 * i)),
          loop: soft
        })
      ),
      ...group.map(([x, y], i): SignPart => {
        const from = at3(0.2 + 0.006 * i);
        return {
          name: `the first group: a place come into Paradise ${i + 1}`,
          svg: someone(x, y, 1.5, FOLK),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.004), 1]
            ],
            xy: [
              [from, n(atGate[0] - x), n(atGate[1] - y)],
              [at3(from + 0.024), 0, 0]
            ]
          })
        };
      }),
      { name: "their vessels of gold: two cups and a dish", svg: goldCup(98, 104) + goldCup(103, 104) + goldDish(100.6, 108.6), keys: showAt(0.45, 0.48) },
      {
        name: "glints over the vessels of gold",
        svg: glints(
          [
            [96.4, 99.4],
            [104.8, 100],
            [100.6, 105.6]
          ],
          0.9,
          "#FFF3C0"
        ),
        keys: showAt(0.47, 0.5),
        loop: twinkle()
      },
      { name: "a comb of gold", svg: comb(112, 106, "#F2C94C", "#B8902E"), keys: showAt(0.59, 0.61) },
      { name: "a comb of silver", svg: comb(120, 106, "#DDE2E8", "#98A2AD"), keys: showAt(0.6, 0.62) },
      {
        name: "glints over the combs",
        svg: glints(
          [
            [110, 103.6],
            [122, 103.6]
          ],
          0.9,
          "#FFF3C0"
        ),
        keys: showAt(0.62, 0.65),
        loop: twinkle()
      },
      ...group.map(
        ([x, y], i): SignPart => ({
          name: `their sweat like musk: a sweet smell rising from place ${i + 1}`,
          svg: curl(n(x + 2.6), n(y - 1.6), "#B0835A", 5.4),
          keys: showAt(at3(0.73 + 0.01 * i), at3(0.74 + 0.01 * i)),
          loop: { move: "twinkle", ms: 1400, low: 0.4, phase: i / 5 }
        })
      ),
      { name: "as if one heart: a soft golden ring about them all", svg: care(74, 106, 20, 8.4, SOFT_GOLD), keys: showAt(0.87, 0.9), loop: soft },
      { name: "a warm light about them all", svg: wash(74, 105, 20, 8, WARM, 0.12), keys: showAt(0.88, 0.91) },
      {
        name: "glints over the first group",
        svg: glints(
          [
            [60, 97],
            [74, 93],
            [88, 97],
            [80, 115]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.92, 0.95),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abu Hurairah: he said: The first group", from: 0.02, to: 0.15 },
      { text: "who will enter Paradise will be", from: 0.162, to: 0.29 },
      { text: "like the moon when it is full.", from: 0.302, to: 0.43 },
      { text: "Their utensils will be of gold,", from: 0.442, to: 0.57 },
      { text: "and their combs of gold and silver;", from: 0.582, to: 0.71 },
      { text: "and their sweat will smell like musk.", from: 0.722, to: 0.85 },
      { text: "Their hearts will be as if one heart.", from: 0.862, to: 1 }
    ]
  };
}

/** The white mule: the mule of the picture cards in white and pale grey, `s` times its size, its feet at (x, y); `left`: facing left. */
const whiteMule = (x: number, y: number, s: number, left = false) =>
  animalAt("mule", n(x - 50 * s), n(y - 73 * s), s, left)
    .replace(/#8C6748/g, "#F4F0E8")
    .replace(/#6E4E33/g, "#D8D0C3")
    .replace(/#CDB096/g, "#FFFFFF")
    .replace(/#3B2A1D/g, "#C4BAAB");

/** The outline of a piece of land, its back from x1 to x2 at y1 and its front at y2, a little wider. */
const plotLine = (x1: number, x2: number, y1: number, y2: number) => `M${x1} ${y1} L${x2} ${y1} L${n(x2 + 4)} ${y2} L${n(x1 - 4)} ${y2} Z`;

/** A piece of land: a green plot with rows in it and a low wall of mud brick about it (see `plotLine`). */
const pieceOfLand = (x1: number, x2: number, y1: number, y2: number) => {
  let rows = "";
  for (let y = y1 + 3; y < y2 - 1; y += 3.4) {
    const k = ((y - y1) / (y2 - y1)) * 4;
    rows += `<path d="M${n(x1 - k + 2)} ${n(y)} L${n(x2 + k - 2)} ${n(y)}" stroke="#A8C878" stroke-width="0.5"/>`;
  }
  const d = plotLine(x1, x2, y1, y2);
  return `<path d="${d}" fill="#C5DC98"/>${rows}<path d="${d}" fill="none" stroke="#C7A272" stroke-width="1.3"/>`;
};

// A white mule. Amr ibn al-Harith, the brother of Juwayriyah bint al-Harith, said: when the Messenger of Allah ﷺ died,
// he did not leave any dirham or dinar, a slave or a slave woman, or anything else, except his white mule, his arms and
// a piece of land which he had given in charity (Sahih al-Bukhari 2739). Nothing is drawn for his death, and his arms
// are not drawn. No one is drawn: his home among the palms, and Amr's place by it with his voice. A grey ring comes on
// the bare ground before the home: no dirham or dinar. Then his white mule shows by the home, with a soft white ring
// about it; then a piece of land, green, with palms and a low wall, its edge lit; and a soft golden ring comes about
// it, given in charity, with a warm light and glints.
function aWhiteMule(): SignArt {
  const house: [number, number] = [48, 94];
  const amr: [number, number] = [26, 104];
  const mule: [number, number] = [80, 101];
  const land = { x1: 104, x2: 148, y1: 86, y2: 104 };
  return {
    kind: "a-white-mule",
    ms: 8000,
    parts: [
      ...daySky(28, 60, 8000),
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [60, 116],
          [96, 117],
          [150, 116]
        ])
      },
      ...palms([
        [8, 90, 20],
        [70, 84, 16]
      ]),
      { name: "his home", svg: home(house[0], house[1], 26, 16) },
      { name: "Amr's place", svg: someone(amr[0], amr[1], 1.5, VOICE) },
      { name: "Amr's voice: telling of him", svg: arcs(n(amr[0] + 3), n(amr[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.12, 0.13), loop: speaking },
      { name: "no dirham or dinar: a grey ring on the bare ground", svg: greyRing(44, 104, 7, 2.4), keys: showAt(0.2, 0.24) },
      { name: "his white mule", svg: whiteMule(mule[0], mule[1], 0.15, true), keys: showAt(0.53, 0.56), loop: { move: "bob", ms: 2400, y: -0.2 } },
      { name: "a soft white ring about the white mule", svg: care(mule[0], n(mule[1] + 0.4), 8.4, 2.2, "#FFFFFF"), keys: showAt(0.58, 0.6), loop: soft },
      { name: "a piece of land", svg: pieceOfLand(land.x1, land.x2, land.y1, land.y2), keys: showAt(0.685, 0.71) },
      { name: "palms of the piece of land", svg: palm(114, 96, 14) + palm(128, 93, 16) + palm(142, 97, 13), origin: { x: 128, y: 96 }, keys: showAt(0.69, 0.715), loop: { move: "sway", ms: 5200, angle: 1.2 } },
      {
        name: "a piece of land: its edge lit",
        svg: `<path d="${plotLine(land.x1, land.x2, land.y1, land.y2)}" fill="none" stroke="#FFF0C4" stroke-width="0.7" stroke-dasharray="1.6 1.2"/>`,
        keys: showAt(0.72, 0.75),
        loop: soft
      },
      { name: "given in charity: a soft golden ring about the piece of land", svg: care(126, 96, 30, 12, SOFT_GOLD), keys: showAt(0.85, 0.88), loop: soft },
      { name: "a warm light over the piece of land", svg: wash(126, 94, 26, 10, WARM, 0.14), keys: showAt(0.88, 0.91) },
      {
        name: "glints over the piece of land",
        svg: glints(
          [
            [110, 88],
            [126, 84],
            [142, 88],
            [118, 100],
            [136, 100]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.9, 0.93),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Amr ibn al-Harith: when he died,", from: 0.02, to: 0.17 },
      { text: "he did not leave any dirham or dinar,", from: 0.185, to: 0.335 },
      { text: "a slave or a slave woman,", from: 0.35, to: 0.5 },
      { text: "or anything else except his white mule,", from: 0.515, to: 0.665 },
      { text: "his arms and a piece of land", from: 0.68, to: 0.83 },
      { text: "which he had given in charity.", from: 0.845, to: 1 }
    ]
  };
}

// The best dinar. Thawban said: the Messenger of Allah ﷺ said: the most excellent dinar is one that a person spends on
// his family, and the dinar which he spends on his animal in Allah's path, and the dinar he spends on his companions in
// Allah's path (Sahih Muslim 994). Nothing is drawn for Allah, and no one is drawn: a family's home with their places
// before it, a road going off to the right with a camel by it and the places of fellows on the way, Thawban's place
// with his voice, and the place of one who spends, with three gold dinars by it. The first dinar glows: the most
// excellent; it goes to the family, and a warm light comes about the home. The second goes to the camel; the way along
// the road lights, and a soft light comes about the camel. The third goes to the fellows on the way, and a warm light
// comes about them, with glints along the way.
function theBestDinar(): SignArt {
  const thawban: [number, number] = [14, 110];
  const spender: [number, number] = [76, 104];
  const coins: [number, number][] = [
    [82, 100.6],
    [85.8, 100.6],
    [89.6, 100.6]
  ];
  const familyHome: [number, number] = [30, 92];
  const familyAt: [number, number][] = [
    [24, 100.4],
    [30, 102.4],
    [36, 100.4]
  ];
  const camelAt: [number, number] = [118, 105];
  const fellows: [number, number][] = [
    [132, 106.6],
    [140, 105],
    [148, 104.4]
  ];
  // Where each dinar goes: to the family, to the animal, and to the fellows on the way.
  const to: [number, number][] = [
    [30, 106],
    [110, 106.4],
    [140, 108.6]
  ];
  const goesTo = (i: number, from: number, end: number) =>
    track({
      xy: [
        [from, 0, 0],
        [end, n(to[i][0] - coins[i][0]), n(to[i][1] - coins[i][1])]
      ]
    });
  const road = "M96 112 Q128 104 160 100";
  return {
    kind: "the-best-dinar",
    ms: 9000,
    parts: [
      ...daySky(132, 50, 9000),
      { name: "hills", svg: hills() },
      {
        name: "the land",
        svg: plainLand("#E2CB9C", [
          [54, 116],
          [110, 118],
          [154, 114]
        ])
      },
      { name: "the road", svg: `<path d="${road}" stroke="#EEDDB6" stroke-width="7" fill="none" stroke-linecap="round"/>` },
      { name: "the family's home", svg: home(familyHome[0], familyHome[1], 22, 14) },
      { name: "the family's places", svg: familyAt.map(([x, y]) => someone(x, y, 1.3, FOLK)).join("") },
      { name: "Thawban's place", svg: someone(thawban[0], thawban[1], 1.5, VOICE) },
      { name: "Thawban's voice", svg: arcs(n(thawban[0] + 3), n(thawban[1] - 1.6), ITS_VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      { name: "the animal: a camel by the road", svg: camel(camelAt[0], camelAt[1], 0.17), loop: { move: "bob", ms: 2600, y: -0.2 } },
      { name: "fellows on the way: their places", svg: fellows.map(([x, y]) => someone(x, y, 1.3, FOLK)).join("") },
      { name: "the place of the one who spends", svg: someone(spender[0], spender[1], 1.6, VOICE) },
      {
        name: "the most excellent dinar: a glow about it",
        svg: glow(coins[0][0], coins[0][1], 3.4, WARM, 0.4),
        keys: track({
          opacity: [
            [0.15, 0],
            [0.18, 1]
          ],
          xy: [
            [0.29, 0, 0],
            [0.35, n(to[0][0] - coins[0][0]), n(to[0][1] - coins[0][1])]
          ]
        })
      },
      { name: "the first dinar", svg: goldCoin(coins[0][0], coins[0][1], 1.5), keys: goesTo(0, 0.29, 0.35) },
      { name: "the second dinar", svg: goldCoin(coins[1][0], coins[1][1], 1.5), keys: goesTo(1, 0.43, 0.49) },
      { name: "the third dinar", svg: goldCoin(coins[2][0], coins[2][1], 1.5), keys: goesTo(2, 0.71, 0.77) },
      { name: "on the family: a warm light about the home", svg: wash(30, 98, 18, 9, WARM, 0.16), keys: showAt(0.345, 0.365) },
      { name: "in the path: the way lit along the road", svg: way(road, "#FFF0C4", 0.9), keys: showAt(0.57, 0.6), loop: soft },
      { name: "a soft light about the camel", svg: glow(camelAt[0], n(camelAt[1] - 6), 9, "#FFF3C0", 0.24), keys: showAt(0.6, 0.64), loop: soft },
      { name: "a warm light about the fellows", svg: wash(140, 105.6, 14, 5.4, WARM, 0.2), keys: showAt(0.85, 0.88) },
      {
        name: "glints along the way",
        svg: glints(
          [
            [104, 108],
            [120, 104.6],
            [136, 102],
            [152, 100.4]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.9, 0.93),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Thawban: he said:", from: 0.02, to: 0.13 },
      { text: "The most excellent dinar is one", from: 0.142, to: 0.27 },
      { text: "a person spends on his family,", from: 0.282, to: 0.41 },
      { text: "the dinar a person spends on his animal", from: 0.422, to: 0.55 },
      { text: "in Allah's path, and the dinar", from: 0.562, to: 0.69 },
      { text: "a person spends on his companions", from: 0.702, to: 0.83 },
      { text: "in Allah's path.", from: 0.842, to: 1 }
    ]
  };
}

/** More fruit on a fruit tree of Paradise (pleasedArt.ts) whose foot is at (x, y), `h` high. */
const moreFruit = (x: number, y: number, h: number, fruit = "#F2A93B") => {
  const cy = y - h * 0.7;
  const r = h * 0.34;
  return [
    [-0.1, -0.6],
    [0.62, -0.05],
    [-0.66, 0.15],
    [0.2, 0.6],
    [-0.2, 0],
    [0.3, -0.2]
  ]
    .map(([dx, dy]) => `<circle cx="${n(x + dx * r)}" cy="${n(cy + dy * r)}" r="${n(r * 0.16)}" fill="${fruit}"/>`)
    .join("");
};

// The fruit garden. Thawban, the freed slave of the Messenger of Allah ﷺ, said: the Messenger of Allah ﷺ said: he
// who visits the sick is supposed to remain in the fruit garden of Paradise. It was said: Messenger of Allah, what is
// this Khurfat al-Jannah? He said: it is a place abounding in fruits (Sahih Muslim 2568d). Nothing is drawn for Allah,
// and no one is drawn: two homes, and before the second, on a mat, the place of one who is sick, with a pale haze
// about it; and his place, with his voice. The place of one who visits goes from its home to the sick one, and a warm
// glow comes about them; a soft golden ring comes about it: it remains. Far off comes a soft circle of light, the
// fruit garden of Paradise, with fruit trees in it, and a faint golden way from the visitor to it, with glints. Then
// one asks, and his voice answers, and more fruit comes on every tree, with glints.
function theFruitGarden(): SignArt {
  const visitorHome: [number, number] = [16, 92];
  const sickHome: [number, number] = [56, 90];
  const sick: [number, number] = [58, 104];
  const visitorFrom: [number, number] = [14.2, 93];
  const visitorAt: [number, number] = [48, 104.4];
  const his: [number, number] = [124, 108];
  const asker: [number, number] = [140, 110];
  const garden: [number, number] = [124, 74];
  const trees: [number, number, number][] = [
    [112, 82, 10],
    [124, 80, 11],
    [136, 82, 10]
  ];
  return {
    kind: "the-fruit-garden",
    ms: 9000,
    parts: [
      ...daySky(90, 40, 9000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      ...palms([[34, 90, 18]]),
      { name: "the visitor's home", svg: home(visitorHome[0], visitorHome[1], 16, 10) },
      { name: "the home of the one who is sick", svg: home(sickHome[0], sickHome[1], 22, 13) },
      { name: "a mat before the home", svg: cloth(50, 66, 102.6, "#E6D2A6") },
      { name: "the place of the one who is sick", svg: someone(sick[0], sick[1], 1.5, FOLK) },
      { name: "sick: a pale haze about its place", svg: wash(sick[0], n(sick[1] - 0.6), 6, 4.4, "#DDE3EA", 0.26), loop: { move: "twinkle", ms: 1600, low: 0.6 } },
      {
        name: "the place of one who visits the sick",
        svg: someone(visitorAt[0], visitorAt[1], 1.5, VOICE),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.035, 1]
          ],
          xy: [
            [0.035, n(visitorFrom[0] - visitorAt[0]), n(visitorFrom[1] - visitorAt[1])],
            [0.11, 0, 0]
          ]
        })
      },
      { name: "a warm glow about the visit", svg: wash(53, 103.6, 10, 4.6, WARM, 0.16), keys: showAt(0.11, 0.125) },
      { name: "remains: a soft golden ring about the visitor's place", svg: care(visitorAt[0], n(visitorAt[1] + 0.4), 4, 1.7, SOFT_GOLD), keys: showAt(0.2, 0.23), loop: soft },
      { name: "the fruit garden of Paradise, far off: a soft circle of light", svg: wash(garden[0], garden[1], 24, 12, "#FFF6D6", 0.4), keys: showAt(0.36, 0.4), loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      ...trees.map(
        ([x, y, h], i): SignPart => ({
          name: `a fruit tree of Paradise ${i + 1}`,
          svg: fruitTree(x, y, h),
          origin: { x, y },
          keys: showAt(at3(0.38 + 0.01 * i), at3(0.39 + 0.01 * i)),
          loop: { move: "sway", ms: 4600 + 400 * i, angle: 1.4, phase: i / 3 }
        })
      ),
      {
        name: "a faint golden way from the visitor to the garden",
        svg: way(`M${n(visitorAt[0] + 2)} ${n(visitorAt[1] - 2)} Q86 90 ${n(trees[0][0] - 4)} ${n(trees[0][1] - 2)}`, SOFT_GOLD, 0.7),
        keys: showAt(0.4, 0.43),
        loop: soft
      },
      {
        name: "glints over the fruit garden",
        svg: glints(
          [
            [110, 70],
            [124, 66],
            [138, 70]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.42, 0.45),
        loop: twinkle()
      },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: one who visits the sick", svg: arcs(n(his[0] + 3), n(his[1] - 1.6), GOLD), keys: showFor(0.025, 0.035, 0.45, 0.46), loop: speaking },
      { name: "the place of one asking", svg: someone(asker[0], asker[1], 1.5, VOICE), keys: showAt(0.52, 0.53) },
      { name: "a voice asking: what is it", svg: arcsLeft(n(asker[0] - 3), n(asker[1] - 1.6), ITS_VOICE), keys: showFor(0.53, 0.535, 0.75, 0.76), loop: speaking },
      { name: "his voice: a place abounding in fruits", svg: arcs(n(his[0] + 3), n(his[1] - 1.6), GOLD), keys: showFor(0.765, 0.775, 0.95, 0.96), loop: speaking },
      ...trees.map(
        ([x, y, h], i): SignPart => ({
          name: `abounding in fruits: more fruit on tree ${i + 1}`,
          svg: moreFruit(x, y, h),
          origin: { x, y },
          keys: showAt(at3(0.85 + 0.01 * i), at3(0.86 + 0.01 * i)),
          loop: { move: "sway", ms: 4600 + 400 * i, angle: 1.4, phase: i / 3 }
        })
      ),
      {
        name: "glints over the fruits",
        svg: glints(
          [
            [108, 74],
            [120, 70],
            [130, 73],
            [140, 75]
          ],
          1,
          "#FFE7A0"
        ),
        keys: showAt(0.88, 0.92),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Thawban: he said: one who visits the sick", from: 0.02, to: 0.17 },
      { text: "is supposed to remain", from: 0.185, to: 0.335 },
      { text: "in the fruit garden of Paradise.", from: 0.35, to: 0.5 },
      { text: "It was said: what is this", from: 0.515, to: 0.665 },
      { text: "Khurfat al-Jannah? He said:", from: 0.68, to: 0.83 },
      { text: "It is a place abounding in fruits.", from: 0.845, to: 1 }
    ]
  };
}

/** A post of pale stone, its foot's middle at (x, y), `h` high, with a cap and a base. */
const post = (x: number, y: number, h: number) =>
  `<rect x="${n(x - 1.9)}" y="${n(y - h)}" width="3.8" height="${h}" fill="#E9E1D0"/>` +
  `<rect x="${n(x + 0.3)}" y="${n(y - h)}" width="1.6" height="${h}" fill="#000000" opacity="0.1"/>` +
  `<rect x="${n(x - 2.6)}" y="${n(y - h - 1.2)}" width="5.2" height="1.4" fill="#D9CFBA"/>` +
  `<rect x="${n(x - 3)}" y="${n(y - 1.6)}" width="6" height="1.6" fill="#D9CFBA"/>`;

/** A handhold: a loop of gold standing on the top of a post, the top's middle at (x, y). */
const handhold = (x: number, y: number) =>
  `<path d="M${n(x - 2.2)} ${y} C${n(x - 2.6)} ${n(y - 5.4)} ${n(x + 2.6)} ${n(y - 5.4)} ${n(x + 2.2)} ${y}" stroke="#E2B33C" stroke-width="1.3" fill="none" stroke-linecap="round"/>` +
  `<path d="M${n(x - 1.4)} ${n(y - 1.6)} C${n(x - 1.4)} ${n(y - 3.4)} ${n(x - 0.2)} ${n(y - 3.9)} ${n(x + 0.6)} ${n(y - 3.9)}" stroke="#FFF0B8" stroke-width="0.4" fill="none" stroke-linecap="round"/>`;

// The firm handhold. Qais ibn Ubadah said: Abdullah ibn Salam said: I saw in a dream that a post was fixed in a green
// garden; at the top of the post there was a handhold, and below it a servant. I was asked to climb, so I climbed it
// till I got hold of the handhold. Then I told this dream to the Messenger of Allah ﷺ, and he said: Abdullah will die
// while still holding the firm reliable handhold (Sahih al-Bukhari 7010). No servant is drawn, and no one is drawn:
// the sky of a dream with its stars over a green garden, and Abdullah ibn Salam's place, with his voice. A post rises,
// fixed in the garden, with glints over the garden; a soft light comes at its top, then the handhold shows there, with
// glints. A voice asks him to climb; his place goes to the post's foot and up it, the way lighting as it climbs, and a
// soft golden ring comes about the handhold, with a warm light. Then his place shows, with his voice, and glints come
// over the handhold, and a soft golden ring about Abdullah's place holding it.
function theFirmHandhold(): SignArt {
  const at = { x: 84, y: 102, h: 64 };
  const top = n(at.y - at.h - 1.2);
  const abdullah: [number, number] = [52, 106];
  const atFoot: [number, number] = [79.6, 103];
  const atTop: [number, number] = [79.6, 40];
  const his: [number, number] = [136, 108];
  const toFoot: [number, number] = [n(atFoot[0] - abdullah[0]), n(atFoot[1] - abdullah[1])];
  return {
    kind: "the-firm-handhold",
    ms: 12000,
    parts: [
      ...dream({
        name: "a green garden",
        svg: landOf(
          [
            [14, 112],
            [40, 117],
            [120, 116],
            [148, 111]
          ],
          "#7FB873"
        )
      }),
      { name: "a tree of the garden 1", svg: roundTree(22, 86, 16, "#5E9E52"), origin: { x: 22, y: 86 }, loop: { move: "sway", ms: 5200, angle: 1.4 } },
      { name: "a tree of the garden 2", svg: roundTree(138, 88, 14, "#5E9E52"), origin: { x: 138, y: 88 }, loop: { move: "sway", ms: 5800, angle: 1.4, phase: 0.5 } },
      flowers([
        [22, 104, "#F6A6C1"],
        [36, 114, "#FFFFFF"],
        [112, 112, "#F6A6C1"],
        [146, 102, "#FFFFFF"],
        [62, 116, "#FFE7A0"]
      ]),
      {
        name: "glints over the green garden",
        svg: glints(
          [
            [20, 92],
            [46, 100],
            [116, 96],
            [140, 92]
          ],
          1,
          "#E9F7C9"
        ),
        keys: showAt(0.16, 0.2),
        loop: twinkle()
      },
      {
        name: "a post, fixed in the garden",
        svg: post(at.x, at.y, at.h),
        origin: { x: at.x, y: at.y },
        keys: track({
          opacity: [
            [0.15, 0],
            [0.152, 1]
          ],
          scaleY: [
            [0.152, 0.04],
            [0.2, 1]
          ]
        })
      },
      { name: "at the top of the post: a soft light", svg: glow(at.x, n(top - 1), 6, "#FFF3C0", 0.3), keys: showAt(0.27, 0.3), loop: soft },
      { name: "a handhold, at the top of the post", svg: handhold(at.x, top), keys: showAt(0.39, 0.405) },
      {
        name: "glints on the handhold",
        svg: glints(
          [
            [80.4, 31],
            [87.6, 32]
          ],
          0.9,
          "#FFF3C0"
        ),
        keys: showAt(0.4, 0.415),
        loop: twinkle()
      },
      { name: "Abdullah ibn Salam's voice: I saw", svg: arcs(n(abdullah[0] + 3), n(abdullah[1] - 1.6), DREAM_VOICE), keys: showFor(0.03, 0.04, 0.42, 0.43), loop: speaking },
      { name: "a voice asking: climb", svg: arcsLeft(100, 98, DREAM_VOICE), keys: showFor(0.415, 0.42, 0.45, 0.455), loop: speaking },
      {
        name: "climbed it: the way up the post, lit",
        svg: way(`M${atFoot[0]} ${n(atFoot[1] - 2)} L${atTop[0]} ${n(atTop[1] + 2)}`, "#FFF0C4", 0.8),
        origin: { x: atFoot[0], y: atFoot[1] },
        keys: track({
          opacity: [
            [0.514, 0],
            [0.515, 1]
          ],
          scaleY: [
            [0.515, 0.02],
            [0.575, 1]
          ]
        })
      },
      {
        name: "Abdullah ibn Salam's place",
        svg: someone(abdullah[0], abdullah[1], 1.8, "#FFF3D6"),
        keys: track({
          xy: [
            [0.43, 0, 0],
            [0.455, toFoot[0], toFoot[1]],
            [0.515, toFoot[0], toFoot[1]],
            [0.575, n(atTop[0] - abdullah[0]), n(atTop[1] - abdullah[1])]
          ]
        })
      },
      { name: "got hold of the handhold: a soft golden ring about it", svg: care(at.x, n(top - 2), 5.4, 3.6, SOFT_GOLD), keys: showAt(0.64, 0.67), loop: soft },
      { name: "a warm light about Abdullah's place at the handhold", svg: glow(atTop[0], atTop[1], 6, WARM, 0.36), keys: showAt(0.66, 0.69), loop: soft },
      { name: "his place", svg: ring(his[0], his[1], 2.4, GOLD), keys: showAt(0.755, 0.765) },
      { name: "his voice: Abdullah will be holding it", svg: arcsLeft(n(his[0] - 3), n(his[1] - 1.6), GOLD), keys: showFor(0.765, 0.775, 0.95, 0.96), loop: speaking },
      {
        name: "the firm reliable handhold: glints over it",
        svg: glints(
          [
            [78, 30],
            [90, 30],
            [84, 27]
          ],
          1.1,
          "#F2C94C"
        ),
        keys: showAt(0.88, 0.9),
        loop: twinkle()
      },
      { name: "holding it: a soft golden ring about Abdullah's place", svg: care(atTop[0], n(atTop[1] + 0.6), 4, 1.8, SOFT_GOLD), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "Abdullah ibn Salam said: I saw", from: 0.02, to: 0.13 },
      { text: "that a post was fixed in a green garden.", from: 0.142, to: 0.252 },
      { text: "At the top of the post there was", from: 0.264, to: 0.374 },
      { text: "a handhold. I was asked to climb.", from: 0.386, to: 0.496 },
      { text: "So I climbed it till I got hold", from: 0.508, to: 0.618 },
      { text: "of the handhold.", from: 0.63, to: 0.74 },
      { text: "He said: Abdullah will die while still", from: 0.752, to: 0.862 },
      { text: "holding the firm reliable handhold.", from: 0.874, to: 1 }
    ]
  };
}

/** Fresh dates on a dish whose middle is at (x, y): ripe, soft and amber. */
const freshDates = (x: number, y: number) =>
  dish(x, y) +
  [
    [-2.2, -1.4],
    [-0.7, -1.9],
    [0.8, -1.9],
    [2.3, -1.4],
    [-1.4, -2.9],
    [0.1, -3.2],
    [1.6, -2.9]
  ]
    .map(([dx, dy], i) => `<ellipse cx="${n(x + dx)}" cy="${n(y + dy)}" rx="0.85" ry="0.62" fill="${i % 2 ? "#C9772E" : "#D98C3A"}"/>`)
    .join("");

// The dates of Ibn Tab. Anas ibn Malik said: the Messenger of Allah ﷺ said: I saw during the night, as one sees in
// sleep, as if we were in the house of Uqbah ibn Rafi', and there was brought to us the fresh dates of Ibn Tab. I
// interpreted it as the sublimity for us in the world, and good ending in the Hereafter, and that our religion is good
// (Sahih Muslim 2270). No one is drawn: the sky of a dream with its stars, and the house of Uqbah ibn Rafi', its window
// lit. His place and the places with him show at the house, and a soft light comes about it. A dish of fresh dates
// comes to them, with glints. Sparks rise over the house and a soft golden light rises above it and stays: the
// sublimity. A soft golden ring comes about the places, a way goes off from the house and lights, and far off at its
// end a soft warm light comes: a good ending. Then glints come over the dates, and a warm glow about the places.
function theDatesOfIbnTab(): SignArt {
  const house = { x: 80, y: 96, w: 40, h: 20 };
  const his: [number, number] = [72, 104.4];
  const withHim: [number, number][] = [
    [62, 106],
    [84, 106.4],
    [93, 104.4]
  ];
  const datesFrom: [number, number] = [154, 110];
  const datesAt: [number, number] = [78, 110];
  const sparks: [number, number][] = [
    [68, 70],
    [80, 66],
    [92, 70]
  ];
  return {
    kind: "the-dates-of-ibn-tab",
    ms: 12000,
    parts: [
      ...dream({ name: "the land of the dream", svg: `<rect y="61" width="160" height="59" fill="#8A7EA8"/><path d="M0 61 L160 61" stroke="#9C90B8" stroke-width="0.7"/>` }),
      { name: "palms of the dream", svg: palm(20, 98, 22) + palm(152, 104, 16), origin: { x: 80, y: 98 }, loop: { move: "sway", ms: 5600, angle: 0.8 } },
      { name: "the house of Uqbah ibn Rafi'", svg: home(house.x, house.y, house.w, house.h, "#C9B08A", "#B09670", "#5A4630") },
      { name: "the house's window, lit", svg: litWindow(house.x, house.y, house.h), keys: showAt(0.03, 0.07), loop: soft },
      { name: "his place, in the house", svg: ring(his[0], his[1], 2.4, GOLD), keys: showAt(0.15, 0.16) },
      ...withHim.map(
        ([x, y], i): SignPart => ({
          name: `a place with him ${i + 1}`,
          svg: someone(x, y, 1.5, DREAM_VOICE),
          keys: showAt(at3(0.164 + 0.012 * i), at3(0.172 + 0.012 * i))
        })
      ),
      { name: "the house of Uqbah ibn Rafi': a soft light about it", svg: wash(house.x, n(house.y - house.h / 2), 26, 14, "#FFF3C0", 0.1), keys: showAt(0.27, 0.3), loop: soft },
      {
        name: "the fresh dates of Ibn Tab, brought to them",
        svg: bigger(freshDates(datesAt[0], datesAt[1]), datesAt[0], datesAt[1], 1.4),
        keys: track({
          opacity: [
            [0.388, 0],
            [0.392, 1]
          ],
          xy: [
            [0.392, n(datesFrom[0] - datesAt[0]), n(datesFrom[1] - datesAt[1])],
            [0.44, 0, 0]
          ]
        })
      },
      {
        name: "glints over the fresh dates",
        svg: glints(
          [
            [73.6, 104.4],
            [82.6, 104]
          ],
          0.9,
          "#FFE7A0"
        ),
        keys: showAt(0.44, 0.455),
        loop: twinkle()
      },
      ...sparks.map(
        ([x, y], i): SignPart => ({
          name: `the sublimity: a spark rising over the house ${i + 1}`,
          svg: sparkle(x, y, 1.6, "#FFE7A0"),
          keys: sparkRising(at3(0.515 + 0.015 * i), at3(0.545 + 0.015 * i)),
          loop: speaking
        })
      ),
      {
        name: "raised: a soft golden light along the roof",
        svg: wash(house.x, n(house.y - house.h - 2), 26, 5, "#FFE7A0", 0.22),
        keys: track({
          opacity: [
            [0.515, 0],
            [0.53, 1]
          ],
          xy: [
            [0.53, 0, 6],
            [0.575, 0, 0]
          ]
        }),
        loop: soft
      },
      { name: "for us: a soft golden ring about the places", svg: care(77, 105.6, 21, 4.6, SOFT_GOLD), keys: showAt(0.635, 0.66), loop: soft },
      { name: "a good ending: the way from the house, lit", svg: way("M102 100 Q128 96 138 76", "#FFF0C4", 0.9), keys: showAt(0.66, 0.69), loop: soft },
      { name: "in the Hereafter: a soft warm light far off", svg: glow(138, 70, 9, "#FFF3C0", 0.3), keys: showAt(0.76, 0.8), loop: soft },
      {
        name: "good: glints over the fresh dates",
        svg: glints(
          [
            [71.6, 103.4],
            [78, 101.6],
            [84.4, 103.4]
          ],
          1,
          "#F2C94C"
        ),
        keys: showAt(0.88, 0.9),
        loop: twinkle()
      },
      { name: "good: a warm glow about the places", svg: wash(77, 105, 20, 6, WARM, 0.18), keys: showAt(0.9, 0.94) }
    ],
    words: [
      { text: "Anas: he said: I saw during the night", from: 0.02, to: 0.13 },
      { text: "as if we are in the house", from: 0.142, to: 0.252 },
      { text: "of Uqbah ibn Rafi', that there was", from: 0.264, to: 0.374 },
      { text: "brought to us the fresh dates of Ibn Tab.", from: 0.386, to: 0.496 },
      { text: "I interpreted it as the sublimity", from: 0.508, to: 0.618 },
      { text: "for us in the world and good ending", from: 0.63, to: 0.74 },
      { text: "in the Hereafter, and that", from: 0.752, to: 0.862 },
      { text: "our religion is good.", from: 0.874, to: 1 }
    ]
  };
}

export const BRIGHT_ART = {
  "the-sun-from-the-west": theSunFromTheWest,
  "like-the-full-moon": likeTheFullMoon,
  "a-white-mule": aWhiteMule,
  "the-best-dinar": theBestDinar,
  "the-fruit-garden": theFruitGarden,
  "the-firm-handhold": theFirmHandhold,
  "the-dates-of-ibn-tab": theDatesOfIbnTab
};
