import { cloud, flower, glow, n, sky, type SignArt, type SignPart } from "./signDraw";
import { heapOf, measure, ring, sparkle, way } from "./giveArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, WARM, wash } from "./worshipArt";
import { care, LIGHT, palms, track } from "./daysArt";
import { cloth, dayTile, greyRing, soft, speaking } from "./fastArt";
import { showAt, showFor } from "./roadArt";
import { at3 } from "./storyArt";
import { lookLine } from "./truthArt";
import { goldHeap } from "./worthArt";
import { coins } from "./tradeArt";
import { thornyTree } from "./dearArt";
import { fruitTree, palaceOfParadise, river } from "./pleasedArt";

/**
 * Pearl: in Paradise, the believer's tent is like a hollow pearl, thirty miles high, with a family at every corner of
 * it that the others do not see; in Paradise there is a street they come to every Friday, where the north wind blows
 * fragrance on them and adds to their beauty, and their families, when they go back, say: by Allah, you have been
 * increased in beauty; soon the Euphrates will disclose a treasure, a mountain of gold, and whoever is there should take
 * nothing of it; his family never ate wheat bread to the full for three days running, from his coming to Madinah until
 * he died; under the tree, Salamah gave the oath of allegiance, and he asked him to give it a second time; a man of
 * Paradise will ask leave to sow, and his crop will grow, ripen and be harvested within seconds, in heaps like
 * mountains, for nothing satisfies the son of Adam; and he had Abu Taybah, who cupped him, paid one sa' of dates, and
 * asked his owners to lessen his tax. Only the land, the sky, buildings, things, plants and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand, a foot or a face: where someone was, a ring or a
 * small dashed circle shows it, where someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn
 * for Allah: His words are only in the lines. Paradise is a soft light with no sun in it. Nothing comes down from the
 * sky: what is good is a light, glints and a soft golden ring, and what should not be is a grey ring. Nothing is drawn
 * for his death. No name or word is written.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** A voice that is not his. */
const ITS_VOICE = "#A8783A";

/** The folk of Paradise. */
const FOLK = "#C39A5A";

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

/** Flowers of the gardens at each of `list`. */
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

/** Keys that hold a part still, then move it by (dx, dy) from `from` to `to`. */
const goes = (from: number, to: number, dx: number, dy: number) => track({ xy: [[from, 0, 0], [to, n(dx), n(dy)]] });

/** A tent like a hollow pearl: a tall dome, white with a soft rosy sheen, its foot's middle at (x, y), `w` wide and `h` high. */
const pearlTent = (x: number, y: number, w: number, h: number) => {
  const l = n(x - w / 2);
  const r = n(x + w / 2);
  const top = n(y - h);
  return (
    `<path d="M${l} ${y} C${n(l - 1)} ${n(y - h * 0.5)} ${n(x - w * 0.3)} ${top} ${x} ${top} C${n(x + w * 0.3)} ${top} ${n(r + 1)} ${n(y - h * 0.5)} ${r} ${y} Z" fill="#F7F2EA" stroke="#E0D3BF" stroke-width="0.5"/>` +
    `<ellipse cx="${x}" cy="${n(y - h * 0.52)}" rx="${n(w * 0.3)}" ry="${n(h * 0.36)}" fill="#F3E1EC" opacity="0.4"/>` +
    `<path d="M${n(l + w * 0.1)} ${n(y - 1)} C${n(l + w * 0.08)} ${n(y - h * 0.5)} ${n(x - w * 0.22)} ${n(top + h * 0.1)} ${n(x - w * 0.05)} ${n(top + h * 0.04)} C${n(x - w * 0.16)} ${n(top + h * 0.18)} ${n(l + w * 0.2)} ${n(y - h * 0.5)} ${n(l + w * 0.22)} ${n(y - 1)} Z" fill="#FFFFFF" opacity="0.85"/>` +
    `<path d="M${n(r - w * 0.1)} ${n(y - 1)} C${n(r - w * 0.08)} ${n(y - h * 0.5)} ${n(x + w * 0.22)} ${n(top + h * 0.1)} ${n(x + w * 0.05)} ${n(top + h * 0.04)} C${n(x + w * 0.24)} ${n(top + h * 0.2)} ${n(r - w * 0.02)} ${n(y - h * 0.5)} ${n(r - w * 0.02)} ${n(y - 1)} Z" fill="#E6DCCD" opacity="0.7"/>`
  );
};

/** The open door of the hollow pearl, its foot's middle at (x, y), `w` wide and `h` high: a warm light inside. */
const pearlDoor = (x: number, y: number, w = 12, h = 14) =>
  `<path d="M${n(x - w / 2)} ${y} L${n(x - w / 2)} ${n(y - h + w / 2)} Q${x} ${n(y - h - w / 4)} ${n(x + w / 2)} ${n(y - h + w / 2)} L${n(x + w / 2)} ${y} Z" fill="#FBE7C0"/>` +
  glow(x, n(y - h * 0.4), n(w * 0.55), WARM, 0.22);

/** A family's places in a small group about (x, y), and a warm light about them. */
const family = (x: number, y: number) =>
  glow(x, n(y - 1), 5.4, WARM, 0.2) +
  someone(n(x - 2.6), y, 1.1, FOLK) +
  someone(n(x + 2.6), y, 1.1, FOLK) +
  someone(x, n(y - 2.8), 1.1, FOLK);

/** A soft veil of pearl over the family about (x, y). */
const veil = (x: number, y: number) =>
  `<path d="M${n(x - 5.6)} ${n(y + 1.8)} Q${n(x - 6)} ${n(y - 6.4)} ${x} ${n(y - 7.4)} Q${n(x + 6)} ${n(y - 6.4)} ${n(x + 5.6)} ${n(y + 1.8)} Z" fill="#FFFFFF" opacity="0.5" stroke="#EADCEA" stroke-width="0.5"/>`;

// A tent like a pearl. Abdullah ibn Qais al-Ash'ari said: the Prophet ﷺ said: a tent is like a hollow pearl which is
// thirty miles in height, and on every corner of the tent the believer will have a family that cannot be seen by the
// others (Sahih al-Bukhari 3243). Nothing is drawn for Allah, and no one is drawn: the gardens of Paradise in a soft
// light, with rivers, fruit trees, flowers and white palaces far off. Glints come over the gardens. A tent shows on the
// meadow, round and white like a pearl, and its door opens with a warm light inside: hollow. Then it rises tall, up
// and up into the sky, glints along its height. A soft light comes at each of its corners, the place of the one of
// faith shows at its door, and a family's places, in a warm light, at every corner. Then a soft veil of pearl comes
// over each family, so that the others do not see it, and glints come over the tent.
function aTentLikeAPearl(): SignArt {
  const foot: [number, number] = [80, 108];
  const corners: [number, number][] = [
    [40, 107.4],
    [56, 114.6],
    [104, 114.6],
    [120, 107.4]
  ];
  return {
    kind: "a-tent-like-a-pearl",
    ms: 9000,
    parts: [
      ...paradise(9000, 30),
      { name: "a palace of Paradise, far off 1", svg: palaceOfParadise(38, 73, 0.9), loop: { move: "twinkle", ms: 2400, low: 0.9 } },
      { name: "a palace of Paradise, far off 2", svg: palaceOfParadise(122, 73, 0.9), loop: { move: "twinkle", ms: 2700, low: 0.9, phase: 0.5 } },
      { name: "a river of Paradise 1", svg: river("M22 64 C18 76 8 84 10 96 C12 106 4 112 0 120", 2.6), loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "a river of Paradise 2", svg: river("M138 64 C142 76 152 84 150 96 C148 106 156 112 160 120", 2.6), loop: { move: "twinkle", ms: 1700, low: 0.8, phase: 0.5 } },
      { name: "a fruit tree of Paradise 1", svg: fruitTree(26, 92, 14), origin: { x: 26, y: 92 }, loop: { move: "sway", ms: 4800, angle: 1.4 } },
      { name: "a fruit tree of Paradise 2", svg: fruitTree(134, 92, 14), origin: { x: 134, y: 92 }, loop: { move: "sway", ms: 5300, angle: 1.4, phase: 0.4 } },
      flowers([
        [10, 104, "#F6A6C1"],
        [30, 116, "#FFFFFF"],
        [130, 117, "#F6A6C1"],
        [150, 104, "#FFFFFF"]
      ]),
      {
        name: "the gardens of Paradise: glints over them",
        svg: glints(
          [
            [38, 62],
            [122, 62],
            [26, 80],
            [134, 80]
          ],
          1.1,
          "#F2C94C"
        ),
        keys: showAt(0.04, 0.08),
        loop: twinkle()
      },
      { name: "the tent's shade on the meadow", svg: `<ellipse cx="${foot[0]}" cy="${n(foot[1] + 0.6)}" rx="36" ry="3" fill="#000000" opacity="0.08"/>`, keys: showAt(0.18, 0.22) },
      {
        name: "a tent like a pearl, white with a soft sheen",
        svg: pearlTent(foot[0], foot[1], 68, 88),
        origin: { x: foot[0], y: foot[1] },
        keys: track({
          opacity: [
            [0.18, 0],
            [0.22, 1]
          ],
          scaleY: [
            [0.35, 0.42],
            [0.43, 1]
          ]
        })
      },
      { name: "hollow: its door open, a warm light inside", svg: pearlDoor(foot[0], foot[1]), keys: showAt(0.24, 0.27) },
      {
        name: "glints on the pearl",
        svg: glints(
          [
            [64, 82],
            [95, 86]
          ],
          1.1,
          "#EDC55A"
        ),
        keys: showAt(0.26, 0.29),
        loop: twinkle()
      },
      {
        name: "thirty miles in height: glints up along the tent",
        svg: glints(
          [
            [86, 60],
            [74, 42],
            [82, 26]
          ],
          1.2,
          "#EDC55A"
        ),
        keys: showAt(0.43, 0.45),
        loop: twinkle(1500)
      },
      ...corners.map(
        ([x, y], i): SignPart => ({
          name: `on every corner of the tent: a soft light at corner ${i + 1}`,
          svg: glow(x, n(y - 1), 4.2, "#FFF3C0", 0.4) + sparkle(x, n(y - 4.6), 0.9, "#FFE7A0"),
          keys: showAt(at3(0.51 + 0.02 * i), at3(0.525 + 0.02 * i)),
          loop: soft
        })
      ),
      { name: "the place of one of faith, at the tent's door", svg: someone(foot[0], n(foot[1] + 4.4), 1.6, FOLK), keys: showAt(0.66, 0.675) },
      ...corners.map(
        ([x, y], i): SignPart => ({
          name: `a family at corner ${i + 1}`,
          svg: family(x, y),
          keys: showAt(at3(0.68 + 0.015 * i), at3(0.695 + 0.015 * i))
        })
      ),
      ...corners.map(
        ([x, y], i): SignPart => ({
          name: `that cannot be seen by the others: a veil of pearl over family ${i + 1}`,
          svg: veil(x, y),
          keys: showAt(at3(0.81 + 0.02 * i), at3(0.83 + 0.02 * i))
        })
      ),
      {
        name: "glints over the tent of pearl",
        svg: glints(
          [
            [70, 52],
            [92, 34],
            [60, 96],
            [100, 98]
          ],
          1.1,
          "#EDC55A"
        ),
        keys: showAt(0.91, 0.94),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Abdullah ibn Qais Al-Ash'ari: he said:", from: 0.02, to: 0.16 },
      { text: "A tent is like a hollow pearl", from: 0.175, to: 0.33 },
      { text: "which is thirty miles in height,", from: 0.345, to: 0.49 },
      { text: "and on every corner of the tent", from: 0.505, to: 0.64 },
      { text: "the believer will have a family", from: 0.655, to: 0.79 },
      { text: "that cannot be seen by the others.", from: 0.805, to: 1 }
    ]
  };
}

/** A soft arch of Paradise along the street, its foot's middle at (x, y), `h` high. */
const arch = (x: number, y: number, h: number, tint: string) =>
  `<path d="M${n(x - 6)} ${y} L${n(x - 6)} ${n(y - h + 6)} Q${x} ${n(y - h - 2)} ${n(x + 6)} ${n(y - h + 6)} L${n(x + 6)} ${y} L${n(x + 4.4)} ${y} L${n(x + 4.4)} ${n(y - h + 6.6)} Q${x} ${n(y - h + 0.6)} ${n(x - 4.4)} ${n(y - h + 6.6)} L${n(x - 4.4)} ${y} Z" fill="${tint}" stroke="#E0B878" stroke-width="0.4"/>` +
  `<circle cx="${x}" cy="${n(y - h - 0.6)}" r="0.9" fill="#F2C94C"/>`;

/** The street of Paradise: a wide way of pale stone across the gardens, from x 62 to the right edge. */
const STREET =
  `<path d="M62 101 L160 96.6 L160 110.6 L62 113 Z" fill="#F4E8CC"/>` +
  `<path d="M62 101 L160 96.6 M62 113 L160 110.6" stroke="#E2CFA2" stroke-width="0.6"/>` +
  `<path d="M70 107 L160 103.6" stroke="#E8D8B4" stroke-width="0.5" stroke-dasharray="3 2.4"/>`;

/** The north wind: soft strokes blowing across the street. */
const WIND =
  `<g fill="none" stroke="#FFFFFF" stroke-width="0.9" stroke-linecap="round" opacity="0.9">` +
  `<path d="M64 100 C76 97 88 102 100 99 C106 97.6 106 93.4 101.4 94.4"/><path d="M104 107 C116 104 128 108.4 140 105.6 C145 104.4 144.6 100.6 140.4 101.4"/>` +
  `<path d="M70 110 C80 108 90 111 100 109"/><path d="M118 98 C126 96 134 99 142 97"/></g>`;

/** Fragrance: soft specks scattered about (x, y). */
const specks = (x: number, y: number) =>
  (
    [
      [-3.4, -2.6, "#F6A6C1"],
      [3, -3.4, "#FFFFFF"],
      [-1.2, -5, "#FFE7A0"],
      [3.8, -0.6, "#F6A6C1"],
      [-4, 0.4, "#FFFFFF"]
    ] as [number, number, string][]
  )
    .map(([dx, dy, fill]) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="0.5" fill="${fill}"/>`)
    .join("");

// Every Friday. Anas ibn Malik reported that the Messenger of Allah ﷺ said: in Paradise there is a street to which
// they would come every Friday. The north wind will blow and would scatter fragrance on their faces and on their
// clothes and would add to their beauty and loveliness, and then they would go back to their family, and their family
// would say to them: by Allah, you have been increased in beauty and loveliness after leaving us (Sahih Muslim 2833).
// Nothing is drawn for Allah, and no one is drawn: the gardens of Paradise in a soft light, two white palaces with the
// places of their families by them, the places of the folk before them, and a wide street of pale stone with soft
// arches along it. Glints come over the gardens; a soft light comes along the street, and the folk's places go to it.
// The north wind blows across the street in soft strokes, fragrance comes about each place in soft specks, and a warm
// glow about each. Then the places go back to the palaces, glowing still; their families' voices speak, and glints
// come about the places come home, and a soft golden ring about them.
function everyFriday(): SignArt {
  const folk: [number, number][] = [
    [16, 104],
    [27, 105.4],
    [42, 103],
    [53, 104.4]
  ];
  const onStreet: [number, number][] = [
    [84, 106],
    [102, 107.2],
    [120, 105.2],
    [138, 106.4]
  ];
  // Each place goes to the street, and back home again.
  const there = (i: number): [number, number, number][] => [
    [at3(0.14 + 0.005 * i), 0, 0],
    [at3(0.2 + 0.005 * i), n(onStreet[i][0] - folk[i][0]), n(onStreet[i][1] - folk[i][1])],
    [at3(0.66 + 0.005 * i), n(onStreet[i][0] - folk[i][0]), n(onStreet[i][1] - folk[i][1])],
    [at3(0.71 + 0.005 * i), 0, 0]
  ];
  const families: [number, number][] = [
    [13, 97.4],
    [24, 98.2],
    [40, 95.8],
    [51, 96.6]
  ];
  return {
    kind: "every-friday",
    ms: 12000,
    parts: [
      ...paradise(12000, 100),
      { name: "a palace of Paradise 1", svg: palaceOfParadise(19, 95, 1.7), loop: { move: "twinkle", ms: 2400, low: 0.9 } },
      { name: "a palace of Paradise 2", svg: palaceOfParadise(48, 93, 1.5), loop: { move: "twinkle", ms: 2700, low: 0.9, phase: 0.5 } },
      { name: "a fruit tree of Paradise 1", svg: fruitTree(70, 86, 13), origin: { x: 70, y: 86 }, loop: { move: "sway", ms: 4700, angle: 1.4 } },
      { name: "a fruit tree of Paradise 2", svg: fruitTree(152, 84, 14), origin: { x: 152, y: 84 }, loop: { move: "sway", ms: 5200, angle: 1.4, phase: 0.5 } },
      { name: "the street of Paradise", svg: STREET },
      ...(
        [
          [78, 100.4, "#FFE9B8"],
          [100, 99.4, "#F7D3E0"],
          [122, 98.4, "#FFE9B8"],
          [144, 97.4, "#F7D3E0"]
        ] as [number, number, string][]
      ).map(([x, y, tint], i): SignPart => ({ name: `a soft arch along the street ${i + 1}`, svg: arch(x, y, 15, tint), loop: { move: "twinkle", ms: 2200 + 300 * i, low: 0.9 } })),
      flowers([
        [6, 112, "#F6A6C1"],
        [66, 117, "#FFFFFF"],
        [150, 117, "#F6A6C1"]
      ]),
      { name: "their families' places, by the palaces", svg: families.map(([x, y]) => someone(x, y, 1.2, FOLK)).join("") },
      {
        name: "the gardens of Paradise: glints over them",
        svg: glints(
          [
            [19, 72],
            [48, 72],
            [100, 74],
            [146, 70]
          ],
          1.1,
          "#F2C94C"
        ),
        keys: showAt(0.03, 0.07),
        loop: twinkle()
      },
      { name: "a street: a soft light along it", svg: wash(112, 104, 46, 7, "#FFF6D8", 0.3), keys: showAt(0.14, 0.17), loop: soft },
      ...folk.map(([x, y], i): SignPart => ({ name: `a place of the folk of Paradise ${i + 1}`, svg: someone(x, y, 1.5, FOLK), keys: track({ xy: there(i) }) })),
      { name: "the north wind: soft strokes blowing across the street", svg: WIND, keys: showAt(0.29, 0.31), loop: { move: "slide", ms: 2600 } },
      { name: "fragrance: soft specks about the places", svg: onStreet.map(([x, y]) => specks(x, y)).join(""), keys: showAt(0.4, 0.43), loop: twinkle(1100) },
      ...folk.map(
        ([x, y], i): SignPart => ({
          name: `more beauty: a warm glow about place ${i + 1}`,
          svg: glow(x, n(y - 0.4), 3.8, WARM, 0.32),
          keys: track({
            opacity: [
              [0.535, 0],
              [0.565, 1]
            ],
            xy: there(i)
          }),
          loop: soft
        })
      ),
      {
        name: "their families' voices: you have been increased",
        svg: arcs(n(families[1][0] + 2), n(families[1][1] - 3.2), ITS_VOICE) + arcs(n(families[3][0] + 2), n(families[3][1] - 3.2), ITS_VOICE),
        keys: showFor(0.785, 0.795, 0.95, 0.96),
        loop: speaking
      },
      {
        name: "increased in beauty: glints about the places come home",
        svg: glints(folk.flatMap(([x, y]): [number, number][] => [[n(x - 2.6), n(y - 3.4)]])),
        keys: showAt(0.9, 0.93),
        loop: twinkle()
      },
      { name: "a soft golden ring about the places come home", svg: care(34.6, 104.6, 24, 3.6, GOLD), keys: showAt(0.91, 0.94), loop: soft }
    ],
    words: [
      { text: "Anas: he said: In Paradise there is", from: 0.02, to: 0.125 },
      { text: "a street to which they would come", from: 0.137, to: 0.262 },
      { text: "every Friday. The north wind will blow", from: 0.274, to: 0.379 },
      { text: "and would scatter fragrance", from: 0.391, to: 0.516 },
      { text: "and would add to their beauty,", from: 0.528, to: 0.643 },
      { text: "then they would go back to their family,", from: 0.655, to: 0.77 },
      { text: "and their family would say: By Allah,", from: 0.782, to: 0.887 },
      { text: "you have been increased in beauty.", from: 0.895, to: 1 }
    ]
  };
}

/** The Euphrates: a wide river across the land, its water moving. */
const EUPHRATES = `<path d="M0 81 C36 77 66 86 98 83 C124 80.4 144 83 160 81 L160 94 C144 96 124 92.6 98 95.6 C66 98.6 36 90 0 94 Z" fill="#6FB8E0"/>`;
const EUPHRATES_RIPPLES =
  `<path d="M6 86 C16 85 26 86.4 36 85.6 M54 89 C64 88 74 89.6 84 88.8 M104 87.4 C114 86.4 124 87.8 134 87 M20 90.6 C28 90 36 91 44 90.4 M120 90.6 C128 90 136 90.8 144 90.2" ` +
  `stroke="#D6F1FF" stroke-width="0.6" fill="none" stroke-linecap="round"/>`;

/** The riverbed laid bare where the water drew back, about (x, y). */
const riverbed = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="3.6" fill="#D8BE8A"/><ellipse cx="${x}" cy="${n(y + 0.6)}" rx="12" ry="2.4" fill="#C9AB74"/>`;

/** A mountain of gold, its foot's middle at (x, y), `w` wide and `h` high: a main peak and two shoulders. */
const goldMountain = (x: number, y: number, w: number, h: number) => {
  const p = (dx: number, dy: number) => `${n(x + dx * w)} ${n(y - dy * h)}`;
  return (
    `<path d="M${p(-0.5, 0)} L${p(-0.32, 0.5)} L${p(-0.22, 0.44)} L${p(-0.04, 1)} L${p(0.14, 0.66)} L${p(0.25, 0.74)} L${p(0.5, 0)} Z" fill="#E2B33C"/>` +
    `<path d="M${p(-0.04, 1)} L${p(0.14, 0.66)} L${p(0.25, 0.74)} L${p(0.5, 0)} L${p(0.06, 0)} Z" fill="#C8962E"/>` +
    `<path d="M${p(-0.32, 0.5)} L${p(-0.22, 0.44)} L${p(-0.04, 1)} L${p(-0.14, 0.34)} Z" fill="#F6D774"/>` +
    `<path d="M${p(-0.36, 0.14)} L${p(-0.1, 0.18)} M${p(0.16, 0.22)} L${p(0.36, 0.16)}" stroke="#F6D774" stroke-width="0.5"/>`
  );
};

// A mountain of gold. Abu Hurairah said: the Messenger of Allah ﷺ said: soon the river Euphrates will disclose the
// treasure of gold, so whoever will be present at that time should not take anything of it. And in Al-A'raj's report
// from Abu Hurairah he said: it will uncover a mountain of gold (Sahih al-Bukhari 7119). No one is drawn: the
// Euphrates flows wide across the land, with palms along its banks, and places come along the near bank. Glints come
// on its water. The water draws back, and in the riverbed a treasure of gold shows, with glints. The places come to the
// water's edge; a grey ring comes about the treasure, and they step back, taking nothing, a soft golden ring about
// them. The water draws back further, and a mountain of gold rises in the riverbed, with glints, and a grey ring about
// its foot.
function aMountainOfGold(): SignArt {
  const bed: [number, number] = [84, 91];
  const places: [number, number][] = [
    [94, 107],
    [108, 108.6],
    [122, 106.6],
    [136, 108]
  ];
  const edge: [number, number][] = [
    [88, 100.4],
    [98, 101.6],
    [108, 100.6],
    [118, 101.8]
  ];
  return {
    kind: "a-mountain-of-gold",
    ms: 10000,
    parts: [
      ...daySky(132, 40, 10000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [60, 117], [150, 116]]) },
      { name: "the river Euphrates", svg: EUPHRATES },
      { name: "the Euphrates' water, moving", svg: EUPHRATES_RIPPLES, loop: { move: "slide", ms: 5000 } },
      ...palms(
        [
          [12, 80, 16],
          [30, 78, 14],
          [136, 79, 15],
          [154, 80, 16],
          [8, 104, 20],
          [56, 106, 18]
        ],
        "the Euphrates"
      ),
      { name: "the river Euphrates: glints on its water", svg: glints([[24, 87], [60, 90.4], [118, 88.4], [146, 87.2]], 1, "#FFFFFF"), keys: showAt(0.15, 0.19), loop: twinkle() },
      { name: "the water drawn back: the riverbed laid bare", origin: { x: bed[0], y: bed[1] }, svg: riverbed(bed[0], bed[1]), keys: track({ opacity: [[0.29, 0], [0.32, 1]], scaleX: [[0.7, 1], [0.75, 1.7]] }) },
      { name: "the treasure of gold, in the riverbed", svg: goldHeap(bed[0], n(bed[1] + 1), 1.3), keys: showAt(0.31, 0.34) },
      { name: "glints over the treasure", svg: glints([[n(bed[0] - 5), n(bed[1] - 5)], [n(bed[0] + 5.4), n(bed[1] - 4.4)]]), keys: showAt(0.33, 0.355), loop: twinkle() },
      ...places.map(([x, y], i): SignPart => {
        const [ex, ey] = edge[i];
        return {
          name: `a place present at that time ${i + 1}`,
          svg: someone(x, y, 1.5),
          keys: track({
            opacity: [
              [0.03, 0],
              [0.04, 1]
            ],
            xy: [
              [0.03, 30, 0],
              [0.08, 0, 0],
              [at3(0.42 + 0.01 * i), 0, 0],
              [at3(0.46 + 0.01 * i), n(ex - x), n(ey - y)],
              [0.58, n(ex - x), n(ey - y)],
              [0.61, 0, 0]
            ]
          })
        };
      }),
      { name: "should not take anything of it: a grey ring about the treasure", svg: greyRing(bed[0], n(bed[1] + 0.4), 8.4, 3), keys: showAt(0.555, 0.58) },
      { name: "taking nothing: a soft golden ring about the places", svg: care(115, 107.8, 27, 4, SOFT_GOLD), keys: showAt(0.61, 0.63), loop: soft },
      {
        name: "a mountain of gold, rising in the riverbed",
        svg: goldMountain(bed[0], n(bed[1] + 1.6), 34, 30),
        origin: { x: bed[0], y: n(bed[1] + 1.6) },
        keys: track({
          opacity: [
            [0.82, 0],
            [0.83, 1]
          ],
          scaleY: [
            [0.82, 0.08],
            [0.88, 1]
          ]
        })
      },
      { name: "glints over the mountain of gold", svg: glints([[n(bed[0] - 8), n(bed[1] - 20)], [n(bed[0] + 2), n(bed[1] - 26)], [n(bed[0] + 9), n(bed[1] - 10)]], 1.1), keys: showAt(0.89, 0.92), loop: twinkle() },
      { name: "a grey ring about the mountain's base", svg: greyRing(bed[0], n(bed[1] + 1.6), 19, 3.6), keys: showAt(0.9, 0.93) }
    ],
    words: [
      { text: "Abu Hurairah: he said:", from: 0.02, to: 0.13 },
      { text: "Soon the river Euphrates", from: 0.145, to: 0.27 },
      { text: "will disclose the treasure of gold,", from: 0.285, to: 0.395 },
      { text: "so whoever will be present at that time", from: 0.41, to: 0.535 },
      { text: "should not take anything of it.", from: 0.55, to: 0.675 },
      { text: "But he said: It will uncover", from: 0.69, to: 0.8 },
      { text: "a mountain of gold.", from: 0.815, to: 1 }
    ]
  };
}

/** A round loaf of wheat bread, its middle at (x, y). */
const loaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${n(y + 0.3)}" rx="3.2" ry="1.5" fill="#B87A3E"/><ellipse cx="${x}" cy="${y}" rx="3" ry="1.3" fill="#D9A060"/>` +
  `<path d="M${n(x - 1.6)} ${n(y - 0.4)} L${n(x - 0.6)} ${n(y + 0.4)} M${n(x + 0.4)} ${n(y - 0.5)} L${n(x + 1.4)} ${n(y + 0.3)}" stroke="#B07032" stroke-width="0.35"/>`;

// Three consecutive days. Aishah said: the family of Muhammad ﷺ had not eaten wheat bread to their satisfaction for
// three consecutive days since his arrival at Madinah till he died (Sahih al-Bukhari 5416). Nothing is drawn for his
// death, and no one is drawn: in Madinah, his home, small and plain, his place, a golden ring, by its door, the places of
// his family, Aishah's among them, and a cloth spread before them. Aishah's voice speaks. A round loaf of wheat bread
// shows on the cloth. Then the days come one by one, each a small tile with its sun: on the first the loaf is there,
// on the second a loaf comes again, and on the third the cloth stays bare, a grey ring on it. A faint ring comes along
// the way into Madinah to his home: his arrival. Then a soft warm light comes about his home.
function threeConsecutiveDays(): SignArt {
  const his: [number, number] = [60, 106];
  const aishah: [number, number] = [107, 108];
  const bread: [number, number] = [81, 112.4];
  const tiles = [56, 80, 104];
  const tileFoot = 52;
  const tileAt = [0.425, 0.475, 0.53];
  return {
    kind: "three-consecutive-days",
    ms: 9000,
    parts: [
      ...daySky(142, 30, 9000, 16),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [120, 117], [152, 115]]) },
      ...palms([
        [6, 98, 22],
        [154, 97, 22]
      ]),
      { name: "homes of Madinah, far off", svg: home(24, 86, 12, 8) + home(130, 85, 12, 8) + home(146, 87, 10, 7) },
      { name: "the way into Madinah", svg: way(`M2 114 Q34 110 ${n(his[0] - 3)} ${n(his[1] + 0.6)}`, "#EFE2C4") },
      { name: "his home, small and plain", svg: home(80, 99, 34, 21) },
      { name: "a cloth spread before the home", svg: cloth(66, 96, 110.2) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his family's places", svg: someone(98, 106.4, 1.5) + someone(116, 107.2, 1.5) },
      { name: "Aishah's place, among them", svg: someone(aishah[0], aishah[1], 1.5) },
      { name: "Aishah's voice: his family had not eaten", svg: arcs(n(aishah[0] + 2), n(aishah[1] - 3.2), ITS_VOICE), keys: showFor(0.03, 0.04, 0.15, 0.16), loop: speaking },
      {
        name: "wheat bread: a round loaf on the cloth",
        svg: bigger(loaf(bread[0], bread[1]), bread[0], bread[1], 2),
        keys: track({
          opacity: [
            [0.23, 0],
            [0.26, 1],
            [0.455, 1],
            [0.465, 0],
            [0.49, 0],
            [0.5, 1],
            [0.515, 1],
            [0.525, 0]
          ]
        })
      },
      {
        name: "glints over the loaf",
        svg: glints([
          [n(bread[0] - 7.4), n(bread[1] - 4.6)],
          [n(bread[0] + 7.4), n(bread[1] - 4)]
        ]),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.3, 1],
            [0.455, 1],
            [0.465, 0]
          ]
        }),
        loop: twinkle()
      },
      ...tiles.map(
        (x, i): SignPart => ({
          name: `three consecutive days: day ${i + 1}`,
          svg: dayTile(x, tileFoot),
          keys: showAt(tileAt[i], at3(tileAt[i] + 0.015))
        })
      ),
      { name: "the first day: a small loaf on its tile", svg: loaf(tiles[0], n(tileFoot - 3)), keys: showAt(0.44, 0.45) },
      { name: "the second day: a small loaf on its tile", svg: loaf(tiles[1], n(tileFoot - 3)), keys: showAt(0.5, 0.51) },
      { name: "the third day: a grey ring on its tile", svg: greyRing(tiles[2], n(tileFoot - 3), 3.4, 1.6), keys: showAt(0.55, 0.565) },
      { name: "the third day: a grey ring on the bare cloth", svg: greyRing(bread[0], bread[1], 7, 2.4), keys: showAt(0.55, 0.57) },
      {
        name: "his arrival: a faint ring coming along the way to his home",
        svg: ring(his[0], his[1], 2.6, SOFT_GOLD),
        keys: track({
          opacity: [
            [0.645, 0],
            [0.655, 0.7],
            [0.745, 0.7],
            [0.77, 0]
          ],
          xy: [
            [0.655, -54, 8],
            [0.745, 0, 0]
          ]
        })
      },
      { name: "a soft warm light about his home", svg: wash(80, 96, 24, 10, "#FFE9B0", 0.16), keys: showAt(0.86, 0.92), loop: soft }
    ],
    words: [
      { text: "Aishah: his family had not eaten", from: 0.02, to: 0.2 },
      { text: "wheat bread to their satisfaction", from: 0.22, to: 0.4 },
      { text: "for three consecutive days", from: 0.42, to: 0.62 },
      { text: "since his arrival at Madinah", from: 0.64, to: 0.82 },
      { text: "till he died.", from: 0.84, to: 1 }
    ]
  };
}

// For the second time. Salamah said: we gave the oath of allegiance to the Prophet ﷺ under the tree. He said to me: O
// Salamah! Will you not give the oath of allegiance? I replied: O Messenger of Allah, I have already given the oath of
// allegiance for the first time. He said: (give it again) for the second time (Sahih al-Bukhari 7208). No one is drawn:
// on the open land, a wide thorny tree, his place, a golden ring, under it, and many places about it, Salamah's among
// them. Salamah's voice speaks, and a soft golden ring comes about each place in turn: the oath. A soft light comes
// under the tree. His voice speaks, and a faint golden line goes from his place to Salamah's; the way between them
// lights. Salamah's voice answers, and glints come over Salamah's first ring. His voice speaks again, and Salamah's
// place goes along the way to his, and a second soft golden ring comes about it, with a warm light.
function forTheSecondTime(): SignArt {
  const his: [number, number] = [76, 107.6];
  const salamah: [number, number] = [110, 114.6];
  const second: [number, number] = [87, 109.6];
  const crowd: [number, number][] = [
    [44, 111.6],
    [52, 108.4],
    [58, 114],
    [66, 111],
    [96, 108.6],
    [104, 111.2],
    [114, 108.4],
    [122, 112],
    [130, 108.8],
    [74, 115.4]
  ];
  const toHim = track({ xy: [[0.83, 0, 0], [0.88, n(second[0] - salamah[0]), n(second[1] - salamah[1])]] });
  return {
    kind: "for-the-second-time",
    ms: 9000,
    parts: [
      ...daySky(28, 120, 9000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [140, 117], [152, 113]]) },
      { name: "the tree's shade", svg: `<ellipse cx="${his[0]}" cy="${n(his[1] + 0.4)}" rx="30" ry="4.2" fill="#000000" opacity="0.08"/>` },
      { name: "the tree, wide and thorny", svg: thornyTree(his[0], 102.4, 2.3), origin: { x: his[0], y: 102.4 }, loop: { move: "sway", ms: 6000, angle: 0.6 } },
      { name: "under the tree: a soft light under its crown", svg: wash(his[0], 94, 28, 9, "#FFF3C0", 0.2), keys: showAt(0.15, 0.2), loop: soft },
      { name: "his place, a golden ring, under the tree", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the places about him", svg: crowd.map(([x, y]) => someone(x, y, 1.3)).join("") },
      { name: "Salamah's place", svg: someone(salamah[0], salamah[1], 1.7, ITS_VOICE), keys: toHim },
      { name: "Salamah's voice: we gave the oath", svg: arcs(n(salamah[0] + 2.2), n(salamah[1] - 3.4), ITS_VOICE), keys: showFor(0.025, 0.035, 0.08, 0.09), loop: speaking },
      ...crowd.map(
        ([x, y], i): SignPart => ({
          name: `the oath: a soft golden ring about a place ${i + 1}`,
          svg: care(x, n(y + 0.3), 3, 1.6, SOFT_GOLD),
          keys: showAt(at3(0.04 + 0.004 * i), at3(0.05 + 0.004 * i))
        })
      ),
      { name: "the first time: a soft golden ring about Salamah's place", svg: care(salamah[0], n(salamah[1] + 0.3), 3.4, 1.8, GOLD), keys: track({ opacity: [[0.08, 0], [0.09, 1]], xy: [[0.83, 0, 0], [0.88, n(second[0] - salamah[0]), n(second[1] - salamah[1])]] }) },
      { name: "his voice: O Salamah", svg: arcs(n(his[0] + 2.6), n(his[1] - 3.6), GOLD), keys: showFor(0.29, 0.3, 0.55, 0.56), loop: speaking },
      { name: "he said to Salamah: a faint golden line from his place to Salamah's", svg: lookLine(n(his[0] + 2.6), n(his[1] + 0.8), n(salamah[0] - 2), n(salamah[1] - 0.4), 106, SOFT_GOLD), keys: showFor(0.3, 0.33, 0.815, 0.825) },
      { name: "will you not give the oath: the way to his place, lit", svg: way(`M${n(salamah[0] - 2)} ${n(salamah[1] - 0.6)} Q98 112.6 ${n(second[0] + 2)} ${n(second[1] + 0.4)}`, "#FFE7A0"), keys: showAt(0.42, 0.46) },
      { name: "Salamah's voice: I have already given it", svg: arcs(n(salamah[0] + 2.2), n(salamah[1] - 3.4), ITS_VOICE), keys: showFor(0.555, 0.565, 0.75, 0.76), loop: speaking },
      {
        name: "for the first time: glints over Salamah's first ring",
        svg: glints([
          [n(salamah[0] - 4.6), n(salamah[1] - 2)],
          [n(salamah[0] + 4.6), n(salamah[1] - 1.6)]
        ]),
        keys: track({ opacity: [[0.7, 0], [0.73, 1]], xy: [[0.83, 0, 0], [0.88, n(second[0] - salamah[0]), n(second[1] - salamah[1])]] }),
        loop: twinkle()
      },
      { name: "his voice: for the second time", svg: arcs(n(his[0] + 2.6), n(his[1] - 3.6), GOLD), keys: showFor(0.82, 0.83, 0.95, 0.96), loop: speaking },
      { name: "for the second time: a second soft golden ring about Salamah's place", svg: care(second[0], n(second[1] + 0.3), 5, 2.6, GOLD), keys: showAt(0.885, 0.91), loop: soft },
      { name: "a warm light about Salamah's place", svg: wash(second[0], second[1], 6, 2.6, "#FFE9B0", 0.24), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "Salamah: we gave the oath of allegiance", from: 0.02, to: 0.13 },
      { text: "to him under the tree.", from: 0.145, to: 0.27 },
      { text: "He said to me: O Salamah!", from: 0.285, to: 0.395 },
      { text: "Will you not give the oath of allegiance?", from: 0.41, to: 0.535 },
      { text: "Salamah: I have already given", from: 0.55, to: 0.675 },
      { text: "the oath for the first time.", from: 0.69, to: 0.8 },
      { text: "He said: for the second time.", from: 0.815, to: 1 }
    ]
  };
}

/** The ground of a field from x 30 to 118, turned, with its furrows at each of `rows`. */
const field = (rows: number[]) =>
  `<path d="M36 ${n(rows[0] - 2.4)} L112 ${n(rows[0] - 2.4)} L120 ${n(rows[rows.length - 1] + 2.6)} L28 ${n(rows[rows.length - 1] + 2.6)} Z" fill="#A9784A"/>` +
  rows.map((y, i) => `<path d="M${n(35 - i * 2)} ${y} L${n(113 + i * 2)} ${y}" stroke="#86592F" stroke-width="0.7"/>`).join("");

/** Seeds along the furrow at y, from x 36 to 112. */
const seeds = (y: number, i: number) =>
  Array.from({ length: 12 }, (_, k) => `<ellipse cx="${n(38 - i * 2 + k * (7.2 + i * 0.36))}" cy="${n(y - 0.3)}" rx="0.45" ry="0.3" fill="#F2DDA4"/>`).join("");

/** Young plants along the furrow at y: green stalks, 5 high. */
const plants = (y: number, i: number, color = "#5FA344") =>
  Array.from({ length: 12 }, (_, k) => {
    const x = n(38 - i * 2 + k * (7.2 + i * 0.36));
    return `<path d="M${x} ${y} L${x} ${n(y - 5)} M${x} ${n(y - 2.2)} L${n(x - 1.4)} ${n(y - 3.6)} M${x} ${n(y - 3)} L${n(x + 1.4)} ${n(y - 4.4)}" stroke="${color}" stroke-width="0.6" stroke-linecap="round"/>`;
  }).join("");

/** Ripe ears of grain on the plants along the furrow at y. */
const ears = (y: number, i: number) =>
  Array.from({ length: 12 }, (_, k) => {
    const x = n(38 - i * 2 + k * (7.2 + i * 0.36));
    return `<ellipse cx="${x}" cy="${n(y - 5.8)}" rx="0.7" ry="1.4" fill="#E8B94A"/>`;
  }).join("");

/** Stubble left along the furrow at y after the harvest. */
const stubble = (y: number, i: number) =>
  Array.from({ length: 12 }, (_, k) => {
    const x = n(38 - i * 2 + k * (7.2 + i * 0.36));
    return `<path d="M${x} ${y} L${x} ${n(y - 1.2)}" stroke="#C9A25A" stroke-width="0.6"/>`;
  }).join("");

/** A heap of harvested grain, its foot's middle at (x, y), `w` wide and `h` high, like a mountain. */
const grainHeap = (x: number, y: number, w: number, h: number) =>
  `<path d="M${n(x - w / 2)} ${y} Q${n(x - w * 0.2)} ${n(y - h * 0.9)} ${x} ${n(y - h)} Q${n(x + w * 0.2)} ${n(y - h * 0.9)} ${n(x + w / 2)} ${y} Z" fill="#E4B954"/>` +
  `<path d="M${x} ${n(y - h)} Q${n(x + w * 0.2)} ${n(y - h * 0.9)} ${n(x + w / 2)} ${y} L${n(x + w * 0.1)} ${y} Q${n(x + w * 0.1)} ${n(y - h * 0.6)} ${x} ${n(y - h)} Z" fill="#C99A3A"/>` +
  `<path d="M${n(x - w * 0.3)} ${n(y - h * 0.3)} Q${x} ${n(y - h * 0.36)} ${n(x + w * 0.3)} ${n(y - h * 0.3)} M${n(x - w * 0.2)} ${n(y - h * 0.6)} Q${x} ${n(y - h * 0.66)} ${n(x + w * 0.2)} ${n(y - h * 0.6)}" stroke="#F4D98A" stroke-width="0.5" fill="none"/>`;

// Within seconds. Abu Hurairah said: the Prophet ﷺ said: a man from among the people of Paradise will request Allah to
// allow him to cultivate the land. Allah will say to him: haven't you got whatever you desire? The man will reply: yes,
// but I like to cultivate the land. The man will sow the seeds, and within seconds the plants will grow and ripen and
// will be harvested and piled in heaps like mountains. Allah will say: take, O son of Adam, for nothing satisfies you
// (Sahih al-Bukhari 7519). Nothing is drawn for Allah, and no one is drawn: the gardens of Paradise in a soft light, a
// meadow, and the place of the farmer by it. The farmer's voice asks leave; the meadow turns to soil with furrows. The
// farmer's place goes along the field, and seeds show in the furrows behind it. Within seconds green plants spring up,
// ripen golden, and are harvested, leaving stubble; and heaps of grain rise beyond the field, tall like mountains. A
// soft golden glow comes over the heaps, glints show on them, and the farmer's place goes to them.
function withinSeconds(): SignArt {
  const rows = [99, 103, 107.4, 112];
  const farmer: [number, number] = [132, 106.4];
  const atField: [number, number] = [24, 108.6];
  const heaps: [number, number, number, number][] = [
    [44, 95, 26, 28],
    [74, 94, 30, 36],
    [104, 95, 26, 28]
  ];
  return {
    kind: "within-seconds",
    ms: 12000,
    parts: [
      ...paradise(12000, 120),
      { name: "a palace of Paradise, far off 1", svg: palaceOfParadise(20, 72, 0.8), loop: { move: "twinkle", ms: 2400, low: 0.9 } },
      { name: "a palace of Paradise, far off 2", svg: palaceOfParadise(140, 72, 0.8), loop: { move: "twinkle", ms: 2700, low: 0.9, phase: 0.5 } },
      { name: "a river of Paradise", svg: river("M150 64 C146 76 156 86 152 98 C150 106 156 112 160 120", 2.6), loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "a fruit tree of Paradise", svg: fruitTree(144, 96, 14), origin: { x: 144, y: 96 }, loop: { move: "sway", ms: 5000, angle: 1.4 } },
      flowers([
        [8, 112, "#F6A6C1"],
        [126, 117, "#FFFFFF"],
        [154, 113, "#F6A6C1"]
      ]),
      ...heaps.map(
        ([x, y, w, h], i): SignPart => ({
          name: `in heaps like mountains: a heap of grain ${i + 1}`,
          svg: grainHeap(x, y, w, h),
          origin: { x, y },
          keys: track({
            opacity: [
              [at3(0.66 + 0.012 * i), 0],
              [at3(0.67 + 0.012 * i), 1]
            ],
            scaleY: [
              [at3(0.66 + 0.012 * i), 0.06],
              [at3(0.7 + 0.012 * i), 1]
            ]
          })
        })
      ),
      { name: "to cultivate the land: the soil turned, with furrows", svg: field(rows), keys: showAt(0.15, 0.2) },
      ...rows.map((y, i): SignPart => ({ name: `the seeds sown, furrow ${i + 1}`, svg: seeds(y, i), keys: track({ opacity: [[at3(0.29 + 0.01 * i), 0], [at3(0.3 + 0.01 * i), 1], [0.395, 1], [0.41, 0]] }) })),
      ...rows.map(
        (y, i): SignPart => ({
          name: `within seconds: the plants growing, furrow ${i + 1}`,
          svg: plants(y, i),
          origin: { x: 74, y },
          keys: track({
            opacity: [
              [at3(0.395 + 0.006 * i), 0],
              [at3(0.4 + 0.006 * i), 1],
              [0.565, 1],
              [0.585, 0]
            ],
            scaleY: [
              [at3(0.395 + 0.006 * i), 0.1],
              [at3(0.425 + 0.006 * i), 1]
            ]
          })
        })
      ),
      { name: "within seconds: quick glints over the field", svg: glints([[40, 94], [70, 95], [100, 94], [56, 104], [88, 105]], 1, "#FFFFFF"), keys: showFor(0.43, 0.445, 0.46, 0.475), loop: twinkle(700) },
      { name: "and ripen: golden ears on the plants", svg: rows.map((y, i) => ears(y, i)).join(""), keys: showFor(0.535, 0.55, 0.565, 0.585) },
      { name: "harvested: stubble left in the furrows", svg: rows.map((y, i) => stubble(y, i)).join(""), keys: showAt(0.57, 0.59) },
      {
        name: "the farmer's place",
        svg: someone(farmer[0], farmer[1], 1.6, FOLK),
        keys: track({
          xy: [
            [0.278, 0, 0],
            [0.335, n(atField[0] - farmer[0]), n(atField[1] - farmer[1])],
            [0.9, n(atField[0] - farmer[0]), n(atField[1] - farmer[1])],
            [0.94, n(atField[0] + 4 - farmer[0]), n(atField[1] - 10 - farmer[1])]
          ]
        })
      },
      { name: "the farmer's voice: asking leave to sow", svg: arcs(n(farmer[0] + 2.4), n(farmer[1] - 3.4), ITS_VOICE), keys: showFor(0.025, 0.035, 0.2, 0.21), loop: speaking },
      { name: "take: a soft golden glow over the heaps", svg: wash(74, 80, 44, 16, WARM, 0.12), keys: showAt(0.79, 0.83), loop: soft },
      { name: "a soft golden ring about the heaps", svg: care(74, 95.4, 46, 4, GOLD), keys: showAt(0.8, 0.84), loop: soft },
      {
        name: "glints over the heaps",
        svg: glints(
          [
            [44, 70],
            [74, 60],
            [104, 70],
            [60, 84],
            [90, 84]
          ],
          1.1
        ),
        keys: showAt(0.9, 0.93),
        loop: twinkle()
      }
    ],
    words: [
      { text: "A man of Paradise will request Allah", from: 0.02, to: 0.125 },
      { text: "to allow the man to cultivate the land.", from: 0.137, to: 0.262 },
      { text: "The man will sow the seeds,", from: 0.274, to: 0.379 },
      { text: "and within seconds the plants will grow", from: 0.391, to: 0.516 },
      { text: "and ripen and will be harvested", from: 0.528, to: 0.643 },
      { text: "and piled in heaps like mountains.", from: 0.655, to: 0.77 },
      { text: "Allah will say: Take, O son of Adam,", from: 0.782, to: 0.887 },
      { text: "for nothing satisfies you.", from: 0.895, to: 1 }
    ]
  };
}

/** Small cupping cups, upright on a little cloth, about (x, y). */
const cuppingCups = (x: number, y: number) =>
  cloth(n(x - 6), n(x + 6), n(y - 1.6), "#E8DCC4") +
  [-3.6, 0, 3.6]
    .map((dx) => `<path d="M${n(x + dx - 1.4)} ${n(y - 3.4)} Q${n(x + dx - 1.5)} ${n(y - 0.2)} ${n(x + dx)} ${n(y - 0.1)} Q${n(x + dx + 1.5)} ${n(y - 0.2)} ${n(x + dx + 1.4)} ${n(y - 3.4)} Z" fill="#CFE2EA" stroke="#8FAAB8" stroke-width="0.35"/><ellipse cx="${n(x + dx)}" cy="${n(y - 3.4)}" rx="1.4" ry="0.4" fill="#E9F3F7" stroke="#8FAAB8" stroke-width="0.3"/>`)
    .join("");

// One sa' of dates. Anas ibn Malik said: Abu Taybah cupped the Messenger of Allah ﷺ, so he ordered that he be paid one
// sa' of dates, and ordered his masters to reduce his tax (Sahih al-Bukhari 2102). No one is drawn: in Madinah, by his
// home, his place, a golden ring, and Anas's place; and further off, the home of Abu Taybah's owners with their places by
// it. Anas's voice speaks; Abu Taybah's place comes to his, and small cupping cups show on a little cloth by it. His
// voice speaks, and a faint golden line goes to Abu Taybah's place; a sa' heaped with dates goes to it, with glints. A
// faint golden line goes from his place to the owners' home. Abu Taybah's tax shows by it as a stack of coins, and the
// top coins go: the tax lessened. A warm light comes about Abu Taybah's place.
function oneSaOfDates(): SignArt {
  const his: [number, number] = [42, 106];
  const anas: [number, number] = [18, 110.4];
  const start: [number, number] = [96, 108.4];
  const abuTaybah: [number, number] = [60, 105];
  const sa: [number, number] = [46, 116.6];
  const owners: [number, number][] = [
    [116, 105.6],
    [138, 106.4]
  ];
  const tax: [number, number] = [127, 111.4];
  return {
    kind: "one-sa-of-dates",
    ms: 8000,
    parts: [
      ...daySky(24, 84, 8000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand("#E2CB9C", [[10, 116], [86, 117], [152, 116]]) },
      ...palms([
        [6, 97, 22],
        [154, 96, 22]
      ]),
      { name: "his home", svg: home(30, 99, 26, 18) },
      { name: "the home of Abu Taybah's owners", svg: home(128, 98, 24, 17) },
      { name: "Abu Taybah's owners' places, by their home", svg: owners.map(([x, y]) => someone(x, y, 1.4)).join("") },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Anas's place", svg: someone(anas[0], anas[1], 1.5, LIGHT) },
      { name: "Anas's voice: Abu Taybah cupped him", svg: arcs(n(anas[0] + 2.2), n(anas[1] - 3.4), ITS_VOICE), keys: showFor(0.03, 0.04, 0.15, 0.16), loop: speaking },
      { name: "Abu Taybah's place, coming to his", svg: someone(start[0], start[1], 1.5), keys: goes(0.04, 0.1, abuTaybah[0] - start[0], abuTaybah[1] - start[1]) },
      { name: "Abu Taybah's cupping cups, on a little cloth", svg: cuppingCups(n(abuTaybah[0] + 12), n(abuTaybah[1] + 5.6)), keys: showAt(0.11, 0.14) },
      { name: "his voice: he ordered", svg: arcs(n(his[0] + 2.6), n(his[1] - 3.6), GOLD), keys: showFor(0.225, 0.235, 0.75, 0.76), loop: speaking },
      { name: "a faint golden line from his place to Abu Taybah's", svg: lookLine(n(his[0] + 2.6), n(his[1] + 0.4), n(abuTaybah[0] - 2), n(abuTaybah[1] + 0.2), 103, SOFT_GOLD), keys: showFor(0.24, 0.27, 0.62, 0.63) },
      {
        name: "one sa' of dates, going to Abu Taybah",
        svg: bigger(measure(sa[0], sa[1]) + heapOf(sa[0], sa[1], "dates"), sa[0], sa[1], 0.75),
        keys: track({
          opacity: [
            [0.425, 0],
            [0.435, 1]
          ],
          xy: [
            [0.44, 0, 0],
            [0.49, n(abuTaybah[0] - sa[0]), 0]
          ]
        })
      },
      {
        name: "glints over the sa' of dates",
        svg: glints([
          [n(abuTaybah[0] - 5.4), n(sa[1] - 8.6)],
          [n(abuTaybah[0] + 5.4), n(sa[1] - 7.4)]
        ]),
        keys: showAt(0.5, 0.53),
        loop: twinkle()
      },
      { name: "he ordered Abu Taybah's owners: a faint golden line to their home", svg: lookLine(n(his[0] + 2.6), n(his[1] - 0.6), n(owners[0][0] - 2), n(owners[0][1] - 0.6), 92, SOFT_GOLD), keys: showAt(0.63, 0.67) },
      { name: "Abu Taybah's tax: a stack of coins by the owners' home", svg: coins(tax[0], tax[1], 3, undefined, undefined, true), keys: showAt(0.825, 0.84) },
      { name: "to reduce it: the top coins of the stack", svg: coins(tax[0], n(tax[1] - 4.5), 3, undefined, undefined, true), keys: showFor(0.825, 0.84, 0.87, 0.9) },
      { name: "a warm light about Abu Taybah's place", svg: wash(abuTaybah[0], abuTaybah[1], 6.6, 2.8, "#FFE9B0", 0.24), keys: showAt(0.9, 0.93), loop: soft }
    ],
    words: [
      { text: "Anas: Abu Taybah cupped him,", from: 0.02, to: 0.2 },
      { text: "so he ordered that Abu Taybah be paid", from: 0.22, to: 0.4 },
      { text: "one sa' of dates", from: 0.42, to: 0.6 },
      { text: "and ordered Abu Taybah's masters", from: 0.62, to: 0.8 },
      { text: "to reduce Abu Taybah's tax.", from: 0.82, to: 1 }
    ]
  };
}

export const PEARL_ART = {
  "a-tent-like-a-pearl": aTentLikeAPearl,
  "every-friday": everyFriday,
  "a-mountain-of-gold": aMountainOfGold,
  "three-consecutive-days": threeConsecutiveDays,
  "for-the-second-time": forTheSecondTime,
  "within-seconds": withinSeconds,
  "one-sa-of-dates": oneSaOfDates
};
