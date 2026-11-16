import { glow, n, nightSky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";
import { dish } from "./worthArt";
import { food } from "./hopeArt";
import { EVENING } from "./heartArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, goldCoin, LIGHT, lightIn, palms, sparkRising, track } from "./daysArt";
import { lookLine } from "./truthArt";
import { faintRing, goldLight } from "./heedArt";

/**
 * Home and the day's prayers, drawn as the scenes of mercy are (mercyArt.ts): a gift to the nearest door; two lights
 * on a dark night; Abu Umayr's little bird; spending on one's family; answering the call to prayer; supper first; and
 * the siwak with every prayer. Only the land, the sky, buildings, things, plants and a little bird are drawn. No Prophet,
 * no Companion and no person is ever drawn, not even a hand or a face: where someone was, a ring or a small dashed
 * circle shows it, and a voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: a
 * prayer or a du'a is a spark that rises.
 */

/** A spark of prayer at (x, y), rising from `from` until `to`. */
const prayerSpark = (name: string, x: number, y: number, from: number, to: number): SignPart => ({
  name,
  svg: sparkle(x, y, 1.6, "#FFE7A0"),
  keys: sparkRising(from, to),
  loop: { move: "twinkle", ms: 900, low: 0.5 }
});

/** Keys that show a part at each [from, to] of `spans`, and hide it again at its end (quickly). */
const onAt = (spans: [number, number][], quick = 0.005): SignKeys => {
  const at = [0];
  const opacity = [0];
  for (const [from, to] of spans) {
    at.push(from, at3(from + quick), to, at3(to + quick));
    opacity.push(0, 1, 1, 0);
  }
  return { at, opacity };
};

/** A voice twinkling as it speaks. */
const speaking = { move: "twinkle", ms: 900, low: 0.5 } as const;

/** A light twinkling softly. */
const soft = { move: "twinkle", ms: 1800, low: 0.75 } as const;

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` + tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** A home at night, darker, its foot's middle at (x, y). */
const nightHome = (x: number, y: number, w: number, h: number) => home(x, y, w, h, "#8C7350", "#77603F", "#3A2A1C");

/** The window of a home (trialArt.ts), lit. */
const litWindow = (x: number, y: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.16)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

/** A light like a lamp, its middle at (x, y): a soft glow with a bright heart. */
const lampLight = (x: number, y: number) => `${glow(x, y, 4.6, "#FFE9A8", 0.22)}<circle cx="${x}" cy="${y}" r="1.3" fill="#FFF7DA"/>`;

/** A small bird standing, its feet's middle at (x, y), `k` times its size, facing right (or left). */
const littleBird = (x: number, y: number, k: number, left = false) => {
  const d = left ? -1 : 1;
  const p = (dx: number, dy: number) => `${n(x + dx * k * d)} ${n(y + dy * k)}`;
  const [body, wing] = ["#A97C58", "#7A5232"];
  return (
    `<path d="M${p(-0.6, 0)} L${p(-0.4, -2.2)} M${p(0.8, 0)} L${p(0.6, -2.2)}" stroke="#C98A3A" stroke-width="${n(0.5 * k)}"/>` +
    `<path d="M${p(-4.4, -3.4)} L${p(-6.6, -5)} L${p(-6, -2.6)} Z" fill="${wing}"/>` +
    `<ellipse cx="${n(x - 0.6 * k * d)}" cy="${n(y - 4 * k)}" rx="${n(4 * k)}" ry="${n(2.4 * k)}" fill="${body}"/>` +
    `<ellipse cx="${n(x + 0.4 * k * d)}" cy="${n(y - 3.4 * k)}" rx="${n(2.4 * k)}" ry="${n(1.3 * k)}" fill="#E9DCC8"/>` +
    `<path d="M${p(-3, -4.6)} C${p(-1.6, -5.8)} ${p(1, -5.4)} ${p(1.6, -4)} C${p(0.4, -3.4)} ${p(-1.8, -3.2)} ${p(-3, -4.6)} Z" fill="${wing}"/>` +
    `<circle cx="${n(x + 2.8 * k * d)}" cy="${n(y - 6.2 * k)}" r="${n(1.7 * k)}" fill="${body}"/>` +
    `<path d="M${p(4.3, -6.5)} L${p(5.9, -6)} L${p(4.3, -5.6)} Z" fill="#D2482E"/>` +
    `<circle cx="${n(x + 3.2 * k * d)}" cy="${n(y - 6.6 * k)}" r="${n(0.35 * k)}" fill="#1F1F1F"/>`
  );
};

/** A mat woven of palm leaves on the ground, from x 78 to 116 at its back (y 101.4) and 74.6 to 119.4 at its front. */
const MAT =
  `<path d="M78 101.4 L116 101.4 L119.4 108.4 L74.6 108.4 Z" fill="#EAD7A6"/>` +
  [82, 88, 94, 100, 106, 112].map((x) => `<path d="M${x} 101.8 L${n(x + (x - 97) * 0.09)} 108" stroke="#CDB07A" stroke-width="0.5"/>`).join("") +
  `<path d="M77.2 103.8 L116.8 103.8 M76.2 106.2 L118 106.2" stroke="#CDB07A" stroke-width="0.4"/>` +
  `<path d="M78 101.4 L116 101.4 L119.4 108.4 L74.6 108.4 Z" stroke="#B8955E" stroke-width="0.5" fill="none"/>`;

/** A little dust lifting, its middle at (x, y). */
const dust = (x: number, y: number) =>
  [
    [-1, 0, 0.7],
    [0.8, -0.6, 0.55],
    [0.2, -1.6, 0.45]
  ]
    .map(([dx, dy, r]) => `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="${r}" fill="#B89E78" opacity="0.8"/>`)
    .join("");

/** Drops of water on the mat, just sprinkled. */
const DROPS = [
  [82, 103],
  [88.4, 105.6],
  [95, 102.6],
  [100.6, 107],
  [106.2, 103.6],
  [112, 106.4],
  [91.6, 107.6],
  [109, 102.2]
]
  .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.7" ry="0.4" fill="#8CC2E6"/><ellipse cx="${n(x - 0.2)}" cy="${n(y - 0.1)}" rx="0.25" ry="0.14" fill="#FFFFFF"/>`)
  .join("");

/** A dashed ring in the sky about (x, y): where the sun stands when a prayer's time comes (lovedArt.ts). */
const timeMark = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6.4" stroke="${GOLD}" stroke-width="0.7" stroke-dasharray="1.6 1.3" fill="#FFFFFF" fill-opacity="0.18"/>`;

/** A siwak, a twig of the arak tree for cleaning the teeth, lying with its foot at (x, y) and its soft end up right. */
const siwak = (x: number, y: number) =>
  `<path d="M${x} ${y} L${n(x + 3.8)} ${n(y - 1.6)}" stroke="#9C7A4A" stroke-width="0.8" stroke-linecap="round"/>` +
  `<path d="M${n(x + 3.6)} ${n(y - 1.3)} l1.1 -0.9 M${n(x + 3.8)} ${n(y - 1.6)} l1.2 -0.2 M${n(x + 3.7)} ${n(y - 1.4)} l1 0.5" stroke="#EADCB8" stroke-width="0.35" stroke-linecap="round"/>`;

/** A date, its middle at (x, y). */
const date = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="0.9" ry="0.65" fill="#7A2E14"/><ellipse cx="${n(x - 0.3)}" cy="${n(y - 0.25)}" rx="0.3" ry="0.15" fill="#B0563A"/>`;

/** Steam rising from food, its foot at (x, y). */
const steam = (x: number, y: number) =>
  [-1.6, 0, 1.6]
    .map(
      (dx, i) =>
        `<path d="M${n(x + dx)} ${y} q${n(-0.9 + i * 0.2)} -1.2 0 -2.4 q0.9 -1.2 0 -2.4" stroke="#FFFFFF" stroke-width="0.45" fill="none" stroke-linecap="round" opacity="0.75"/>`
    )
    .join("");

// The nearest door. Aishah said: I said: O Messenger of Allah, I have two neighbours; to which of them shall I give a
// gift? He said: to the one whose door is nearer to you (Sahih al-Bukhari 2259, 2595). No one is drawn: her home, the
// home next to hers and a home further on. His place is a golden ring by her door, and her place is beside it, with a
// dish of food, her gift. A faint ring comes about each of the two doors; her voice asks, and a faint dashed way goes to
// each door. His voice answers; the way to the further door fades, the way to the nearer one turns golden, her place
// takes the gift along it, and a warm light comes at the nearer door, and a warm glow about the place there.
function nearestDoor(): SignArt {
  const his: [number, number] = [14, 105.6];
  const her: [number, number] = [32, 105.8];
  const gift: [number, number] = [38.6, 107];
  const nearDoor: [number, number] = [74.2, 100.6];
  const farDoor: [number, number] = [126.2, 100.6];
  const next: [number, number] = [80.4, 105.8];
  const further: [number, number] = [132.4, 105.8];
  const toNear = "M37 108.2 Q54 109.4 71.4 107.6";
  const toFar = "M37 108.4 Q80 109.4 123.4 107.6";
  return {
    kind: "nearest-door",
    ms: 9000,
    parts: [
      ...dayAround([138, 20], 9000),
      ...palms([
        [101, 98, 12],
        [150, 99, 13]
      ]),
      { name: "her home", svg: home(26, 103, 26, 17) },
      { name: "the home next to hers", svg: home(76, 103, 22, 15, "#D8B585", "#BF9A6A") },
      { name: "the home further on", svg: home(128, 103, 24, 16, "#CDAA7C", "#B38E60") },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the place next door", svg: someone(next[0], next[1], 1.7) },
      { name: "the place further on", svg: someone(further[0], further[1], 1.7) },
      { name: "two homes: a faint ring about the nearer door", svg: faintRing(nearDoor[0], nearDoor[1], 3.6), keys: showFrom(0.04, 0.07) },
      { name: "two homes: a faint ring about the further door", svg: faintRing(farDoor[0], farDoor[1], 3.6), keys: showWhile(0.08, 0.11, 0.62, 0.65) },
      {
        name: "her place",
        svg: someone(her[0], her[1], 1.7),
        keys: track({
          xy: [
            [0.66, 0, 0],
            [0.78, 34, 0]
          ]
        })
      },
      {
        name: "her gift: a dish of food",
        svg: food(gift[0], gift[1]),
        keys: track({
          xy: [
            [0.66, 0, 0],
            [0.8, 35.4, -0.2]
          ]
        })
      },
      { name: "her voice: to which of them", svg: arcsLeft(n(her[0] - 3.2), n(her[1] - 4.2), VOICE), keys: showWhile(0.29, 0.295, 0.58, 0.585), loop: speaking },
      { name: "which one: a faint dashed way to the nearer door", svg: way(toNear, "#FFFFFF", 0.7), keys: showWhile(0.31, 0.34, 0.62, 0.65) },
      { name: "which one: a faint dashed way to the further door", svg: way(toFar, "#FFFFFF", 0.7), keys: showWhile(0.33, 0.36, 0.62, 0.65) },
      { name: "his voice: to the one whose door is nearer", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showFrom(0.585, 0.59), loop: speaking },
      { name: "the nearer door: a golden way to it", svg: way(toNear, "#E8B85A", 0.9), keys: showFrom(0.62, 0.65) },
      { name: "a gift at the nearer door: a warm light", svg: lightIn(nearDoor[0], n(nearDoor[1] - 0.6), 4.4), keys: showFrom(0.8, 0.84), loop: soft },
      { name: "a warm glow about the place next door", svg: wash(next[0], n(next[1] - 3.2), 6.4, 4.6, WARM, 0.22), keys: showFrom(0.82, 0.86), loop: soft }
    ],
    words: [
      { text: "I have two neighbours", from: 0.02, to: 0.26 },
      { text: "To which of them shall I give a gift?", from: 0.28, to: 0.56 },
      { text: "To the one whose door is nearer to you", from: 0.58, to: 1 }
    ]
  };
}

// Two lights on a dark night. Anas said that two men of the companions of the Prophet ﷺ went out from the Prophet ﷺ
// on a dark night, and with them were two things like lamps, lighting the way before them; when they parted, one went
// with each of them, until he reached his family (Sahih al-Bukhari 3639). No one is drawn: on a dark night, with no
// moon, his place is a golden ring by his home, and the places of the two go out from it. Two lights like lamps come
// before them, and they go on together to where the way parts; there they part, and a light goes with each, one to a
// home far off and one to a home nearer, until each reaches his home and its window is lit.
function twoLights(): SignArt {
  const his: [number, number] = [15, 105.8];
  const one: [number, number] = [30, 105.2];
  const other: [number, number] = [33, 107.4];
  const oneWay: [number, number, number][] = [
    [0.04, 0, 0],
    [0.16, 20, 0],
    [0.3, 20, 0],
    [0.4, 50, -1],
    [0.5, 50, -1],
    [0.64, 68, -9.6],
    [0.76, 68, -9.6],
    [0.86, 81.6, -15.4]
  ];
  const otherWay: [number, number, number][] = [
    [0.04, 0, 0],
    [0.16, 20, 0],
    [0.3, 20, 0],
    [0.4, 50, -1],
    [0.5, 50, -1],
    [0.64, 79, -1],
    [0.76, 79, -1],
    [0.86, 100.4, -1.6]
  ];
  // A light goes before each, from where the two are when it comes.
  const lit = (way: [number, number, number][]) => way.filter(([t]) => t >= 0.3).map(([t, x, y]): [number, number, number] => [t, n(x - 20), y]);
  const light = (name: string, [x, y]: [number, number], way: [number, number, number][]): SignPart => ({
    name,
    svg: lampLight(n(x + 27), n(y - 3.4)),
    keys: track({
      opacity: [
        [0.25, 0],
        [0.28, 1]
      ],
      xy: lit(way)
    }),
    loop: { move: "twinkle", ms: 1400, low: 0.75 }
  });
  return {
    kind: "two-lights",
    ms: 10000,
    parts: [
      { name: "the dark night", svg: nightSky(62) },
      {
        name: "a few faint stars",
        svg: `<g opacity="0.55">${stars([
          [14, 18],
          [40, 28],
          [70, 16],
          [104, 24],
          [132, 16],
          [150, 36],
          [28, 46],
          [118, 48]
        ])}</g>`,
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "hills in the dark", svg: hills("#26304E") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [20, 92],
          [62, 116],
          [100, 112],
          [150, 116]
        ])
      },
      { name: "the way, faint in the dark", svg: way("M34 108 L82 107.4", "#6F7AA0", 0.7) + way("M84 106.8 Q98 100 111 92", "#6F7AA0", 0.7) + way("M86 108 Q112 108.6 132 108", "#6F7AA0", 0.7) },
      { name: "his home", svg: nightHome(24, 103, 28, 18) },
      { name: "a lit window in his home", svg: litWindow(24, 103, 18), loop: soft },
      { name: "a home far off", svg: nightHome(118, 88, 16, 11) },
      { name: "a home nearer", svg: nightHome(140, 104, 22, 15) },
      { name: "a golden ring, his place at his door", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "the place of one of the two, going home", svg: someone(one[0], one[1], 1.6, LIGHT), keys: track({ xy: oneWay }) },
      { name: "the place of the other, going home", svg: someone(other[0], other[1], 1.6, LIGHT), keys: track({ xy: otherWay }) },
      light("like a lamp, lighting the way before one of the two", one, oneWay),
      light("like a lamp, lighting the way before the other", other, otherWay),
      { name: "home: a lit window far off", svg: litWindow(118, 88, 11), keys: showFrom(0.87, 0.9), loop: soft },
      { name: "home: a lit window nearer", svg: litWindow(140, 104, 15), keys: showFrom(0.87, 0.9), loop: soft },
      { name: "home: a warm glow at the door far off", svg: glow(116.2, 86, 4.4, WARM, 0.3), keys: showFrom(0.88, 0.92), loop: soft },
      { name: "home: a warm glow at the door nearer", svg: glow(138.2, 101.4, 4.8, WARM, 0.3), keys: showFrom(0.88, 0.92), loop: soft }
    ],
    words: [
      { text: "Two of his Companions left him on a dark night", from: 0.02, to: 0.22 },
      { text: "With them, like two lamps, lighting the way", from: 0.24, to: 0.46 },
      { text: "When they parted, each had one with him", from: 0.48, to: 0.72 },
      { text: "Until he reached his family", from: 0.74, to: 1 }
    ]
  };
}

// Abu Umayr's little bird. Anas said: the Prophet ﷺ was the best of people in character. I had a brother called Abu
// Umayr, who I think had just been weaned, and when he came, he would say: O Abu Umayr, what did the nughayr do? A
// little bird he played with. Sometimes the prayer came while he was in our house; he would have the mat under him
// swept and sprinkled with water, then he stood, and we stood behind him, and he led us in prayer (Sahih al-Bukhari
// 6203). No one is drawn: by their home, his place is a golden ring on a mat woven of palm leaves, with a warm glow
// about it; Anas's place is by the home. Abu Umayr's small place comes out, and his little bird hops along with it.
// His voice asks, and a faint warm line goes to the small place; the bird hops, and hops on ahead, and the small place
// goes after it, with a warm glow about the two. A dashed ring comes about the sun: the time of a prayer. Dust lifts
// off the mat, and drops of water are on it; then Anas's place and the place of his household come into a row behind
// his place, a warm glow comes over the mat, and a spark of prayer rises.
function abuUmayrBird(): SignArt {
  const his: [number, number] = [96, 103.6];
  const anas: [number, number] = [40, 105.6];
  const household: [number, number] = [31, 106.6];
  const small: [number, number] = [20.2, 104.6];
  const bird: [number, number] = [24, 105.4];
  const sunAt: [number, number] = [140, 20];
  const dustAt: [number, number][] = [
    [84, 104.6],
    [92, 106.6],
    [103, 104.8],
    [110, 106.8]
  ];
  return {
    kind: "abu-umayr-bird",
    ms: 12000,
    parts: [
      ...dayAround(sunAt, 12000),
      ...palms([
        [58, 97, 11],
        [150, 99, 13]
      ]),
      { name: "their home", svg: home(22, 103, 30, 18) },
      { name: "a mat woven of palm leaves", svg: MAT },
      { name: "a golden ring, his place on the mat", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "the best in character: a warm glow about his place", svg: wash(his[0], n(his[1] - 2.8), 8, 5.4, WARM, 0.2), keys: showFrom(0.03, 0.07), loop: soft },
      {
        name: "Anas's place",
        svg: someone(anas[0], anas[1], 1.7),
        keys: track({
          xy: [
            [0.88, 0, 0],
            [0.93, 50, 1.4]
          ]
        })
      },
      {
        name: "the place of his household",
        svg: someone(household[0], household[1], 1.7),
        keys: track({
          xy: [
            [0.88, 0, 0],
            [0.93, 71, 0.4]
          ]
        })
      },
      {
        name: "Abu Umayr's small place",
        svg: someone(small[0], small[1], 1.1),
        keys: track({
          opacity: [
            [0.155, 0],
            [0.16, 1]
          ],
          xy: [
            [0.16, 0, 0],
            [0.22, 31.8, 2],
            [0.46, 31.8, 2],
            [0.52, 37.8, 1.4]
          ]
        })
      },
      {
        name: "his little bird, the nughayr",
        svg: littleBird(bird[0], bird[1], 0.8),
        keys: track({
          opacity: [
            [0.165, 0],
            [0.17, 1]
          ],
          xy: [
            [0.17, 0, 0],
            [0.19, 10, -2.6],
            [0.2, 16, 0.4],
            [0.21, 24, -2.2],
            [0.22, 33.6, 1.6],
            [0.31, 33.6, 1.6],
            [0.34, 36.6, -0.8],
            [0.37, 38.6, 1.6],
            [0.46, 38.6, 1.6],
            [0.49, 41, -1],
            [0.52, 42.6, 0.8]
          ]
        }),
        loop: { move: "bob", ms: 700, y: -0.5 }
      },
      { name: "his voice: O Abu Umayr", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.295, 0.3, 0.45, 0.455), loop: speaking },
      { name: "his look: a faint warm line to the small place", svg: lookLine(92.6, 101.8, 54, 104.4, 92), keys: showWhile(0.3, 0.33, 0.45, 0.48) },
      { name: "playing: a warm glow about the two", svg: wash(62.6, 103.8, 8.4, 4.6, WARM, 0.22), keys: showFrom(0.47, 0.51), loop: soft },
      { name: "the time of a prayer: a dashed ring about the sun", svg: timeMark(sunAt[0], sunAt[1]), keys: showFrom(0.6, 0.63) },
      ...dustAt.map(
        ([x, y], i): SignPart => ({
          name: `swept: dust lifting off the mat ${i + 1}`,
          svg: dust(x, y),
          keys: { at: [0, 0.74, 0.745, 0.79, 0.795], opacity: [0, 0, 1, 1, 0], y: [0, 0, -0.6, -4.4, -5] }
        })
      ),
      { name: "sprinkled: drops of water on the mat", svg: DROPS, keys: showFrom(0.79, 0.805) },
      { name: "fresh: a soft light on the mat", svg: wash(97, 105, 18, 3.4, "#FFFFFF", 0.1), keys: showFrom(0.795, 0.81) },
      { name: "together in prayer: a warm glow over the mat", svg: wash(96, 104.2, 16, 4, WARM, 0.18), keys: showFrom(0.9, 0.94), loop: soft },
      prayerSpark("his prayer, leading them: a spark rising", his[0], n(his[1] - 6), 0.91, 0.955)
    ],
    words: [
      { text: "He was the best of people in character", from: 0.02, to: 0.13 },
      { text: "I had a little brother called Abu Umayr", from: 0.15, to: 0.27 },
      { text: "O Abu Umayr, what did the nughayr do?", from: 0.29, to: 0.43 },
      { text: "A little bird he played with", from: 0.45, to: 0.57 },
      { text: "Sometimes prayer came while he was with us", from: 0.59, to: 0.71 },
      { text: "He had the mat under him swept and sprinkled", from: 0.73, to: 0.85 },
      { text: "He stood, we stood behind him, he led us", from: 0.87, to: 1 }
    ]
  };
}

// Spending on one's family. Abu Mas'ud said that the Prophet ﷺ said: when a man spends on his family, hoping for its
// reward, it is a charity for him (Sahih al-Bukhari 55). Sa'd ibn Abi Waqqas said that the Messenger of Allah ﷺ said:
// you will never spend anything seeking by it the Face of Allah but you are rewarded for it, even what you put in your
// wife's mouth (Sahih al-Bukhari 56). No one is drawn, and no hand or mouth: his place comes home from the palms with a
// sack of food, and the sack goes to his family by the door. A small golden light shows above his place, and a golden
// ring about it: hoping for its reward. A golden ring comes about the sack, a spark rises from it, and a warm light is
// in the home: a charity. Two coins go from his place to his home, a spark rises from his place and a warm glow comes
// about it; then he goes near her place, a date goes to it, a warm glow comes about her place, and a spark rises.
function familySpending(): SignArt {
  const his: [number, number] = [124, 105.6];
  const her: [number, number] = [50.6, 105.6];
  const smalls: [number, number][] = [
    [24.4, 106.4],
    [30.4, 107.4]
  ];
  const home_: [number, number] = [68, 105.6];
  const near: [number, number] = [58, 105.6];
  const morsel: [number, number] = [55.4, 102.8];
  return {
    kind: "family-spending",
    ms: 12000,
    parts: [
      ...dayAround([30, 20], 12000),
      ...palms([
        [118, 97, 12],
        [136, 99, 14],
        [152, 96, 11]
      ]),
      { name: "his home", svg: home(40, 103, 30, 18) },
      { name: "her place at home", svg: someone(her[0], her[1], 1.7) },
      ...smalls.map(([x, y], i): SignPart => ({ name: `a small place of his family ${i + 1}`, svg: someone(x, y, 1.1) })),
      {
        name: "his place, coming home",
        svg: someone(his[0], his[1], 1.7),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, n(home_[0] - his[0]), 0],
            [0.79, n(home_[0] - his[0]), 0],
            [0.83, n(near[0] - his[0]), 0]
          ]
        })
      },
      {
        name: "food for his family: a sack",
        svg: sack(129, 107, 0.55),
        keys: track({
          xy: [
            [0.03, 0, 0],
            [0.1, -56, 0],
            [0.13, -90.8, 0.2]
          ]
        })
      },
      { name: "hoping for its reward: a small golden light above his place", svg: goldLight(home_[0], 96.8, 1.5), keys: showFrom(0.2, 0.23), loop: soft },
      { name: "hoping for its reward: a golden ring about his place", svg: care(home_[0], 105.8, 4.2, 2.2), keys: showWhile(0.21, 0.25, 0.79, 0.8) },
      { name: "a charity: a golden ring about the sack", svg: care(38.2, 106.4, 4.6, 2.4), keys: showFrom(0.34, 0.37) },
      { name: "a charity: a spark rising from the sack", svg: sparkle(38.2, 100.8, 1.6, "#FFE7A0"), keys: sparkRising(0.35, 0.4), loop: speaking },
      { name: "a charity: a warm light in his home", svg: lightIn(43.3, 88.7, 3.4), keys: showFrom(0.36, 0.4), loop: soft },
      ...[
        [72, 104.4, 42, 107.6],
        [74.8, 105.4, 34.4, 107.6]
      ].map(
        ([x, y, ex, ey], i): SignPart => ({
          name: `spent for His sake: a coin going home ${i + 1}`,
          svg: goldCoin(x, y, 1.2),
          keys: track({
            opacity: [
              [0.48, 0],
              [0.485, 1]
            ],
            xy: [
              [0.49, 0, 0],
              [0.56, n(ex - x), n(ey - y)]
            ]
          })
        })
      ),
      prayerSpark("rewarded for it: a spark rising", home_[0], 99, 0.65, 0.71),
      { name: "rewarded for it: a warm glow about his place", svg: wash(home_[0], 102.6, 7, 5, WARM, 0.22), keys: showWhile(0.66, 0.7, 0.79, 0.8), loop: soft },
      {
        name: "a morsel: a date going to her place",
        svg: date(morsel[0], morsel[1]),
        keys: track({
          opacity: [
            [0.83, 0],
            [0.835, 1],
            [0.86, 1],
            [0.87, 0]
          ],
          xy: [
            [0.835, 0, 0],
            [0.86, -3.4, 0.6]
          ]
        })
      },
      { name: "a warm glow about her place", svg: wash(her[0], n(her[1] - 3), 6, 4.4, WARM, 0.24), keys: showFrom(0.86, 0.9), loop: soft },
      prayerSpark("rewarded even for a morsel: a spark rising", near[0], 99, 0.88, 0.94)
    ],
    words: [
      { text: "When a man spends on his family", from: 0.02, to: 0.17 },
      { text: "Hoping for its reward", from: 0.19, to: 0.31 },
      { text: "It is a charity for him", from: 0.33, to: 0.45 },
      { text: "Whatever you spend for Allah's sake", from: 0.47, to: 0.62 },
      { text: "You are rewarded for it", from: 0.64, to: 0.76 },
      { text: "Even a morsel you put in your wife's mouth", from: 0.78, to: 1 }
    ]
  };
}

// Answering the call. Abu Sa'id al-Khudri said that the Messenger of Allah ﷺ said: when you hear the call, say what the
// caller says (Sahih al-Bukhari 611). Jabir ibn Abdullah said that the Messenger of Allah ﷺ said: whoever says, when he
// hears the call: O Allah, Lord of this perfect call and of the prayer to be established, give Muhammad al-wasilah and
// al-fadilah, and raise him to the praised station that You promised him, my intercession is due for him on the Day of
// Resurrection (Sahih al-Bukhari 614). No one is drawn: the caller's place is on the roof of the masjid of Madinah, its
// voice is arcs, and the call rings out. By the homes, the places that hear it answer, each in turn, after the caller.
// Then the call ends; a faint ring comes about one of them, its voice speaks in golden arcs, and sparks of its du'a
// rise; a warm light is at the door of the masjid; and a golden ring of care and a warm glow come about it.
function answerTheCall(): SignArt {
  const caller: [number, number] = [80, 78.2];
  const hearing: [number, number][] = [
    [24, 105.6],
    [34, 106.6],
    [126, 106.6],
    [136, 105.6]
  ];
  const one = hearing[0];
  return {
    kind: "answer-the-call",
    ms: 12000,
    parts: [
      ...dayAround([136, 20], 12000),
      ...palms([
        [46, 96, 12],
        [116, 95, 12]
      ]),
      { name: "homes of Madinah", svg: home(16, 103, 20, 13) + home(144, 103, 20, 13, "#D8B585", "#BF9A6A") },
      { name: "the masjid of Madinah", svg: madinahMasjid(56, 99, 1) },
      { name: "the caller's place, on the roof of the masjid", svg: someone(caller[0], caller[1], 1.5) },
      ...[4, 7.5, 11].map(
        (r, i): SignPart => ({
          name: `the call to prayer, ring ${i + 1}`,
          svg: ring(caller[0], 70, r, "#FFFFFF"),
          keys: showWhile(at3(0.03 + i * 0.015), at3(0.04 + i * 0.015), 0.42, 0.43),
          loop: { move: "twinkle", ms: 1100, low: 0.2, phase: i / 3 }
        })
      ),
      { name: "the caller's voice", svg: arcs(n(caller[0] + 3.2), n(caller[1] - 3.6), VOICE), keys: showWhile(0.03, 0.035, 0.42, 0.425), loop: speaking },
      ...hearing.map(
        ([x, y], i): SignPart => ({ name: `a place that hears it, by the homes ${i + 1}`, svg: someone(x, y, 1.7) })
      ),
      ...hearing.map(
        ([x, y], i): SignPart => ({
          name: `answering, after the caller: a voice by the homes ${i + 1}`,
          svg: (x < 80 ? arcs : arcsLeft)(n(x + (x < 80 ? 3.2 : -3.2)), n(y - 4.2), VOICE),
          keys: onAt([
            [0.17, 0.21],
            [0.24, 0.28],
            [0.31, 0.42]
          ]),
          loop: speaking
        })
      ),
      { name: "the one who says the du'a: a faint ring", svg: faintRing(one[0], n(one[1] - 0.2), 3.2), keys: showFrom(0.44, 0.47) },
      { name: "the du'a: golden arcs", svg: arcs(n(one[0] + 3.2), n(one[1] - 4.2), GOLD), keys: showFrom(0.585, 0.59), loop: speaking },
      prayerSpark("the du'a: a spark rising 1", one[0], n(one[1] - 6), 0.6, 0.66),
      prayerSpark("the du'a: a spark rising 2", n(one[0] + 1.6), n(one[1] - 6), 0.75, 0.8),
      { name: "the prayer to be established: a warm light at the door of the masjid", svg: lightIn(80, 95.4, 4), keys: showFrom(0.75, 0.79), loop: soft },
      { name: "his intercession, due: a golden ring of care about the place", svg: care(one[0], n(one[1] + 0.2), 5, 2.6), keys: showFrom(0.87, 0.9) },
      { name: "his intercession, due: a warm glow about the place", svg: wash(one[0], n(one[1] - 3), 7, 5, WARM, 0.24), keys: showFrom(0.88, 0.92), loop: soft }
    ],
    words: [
      { text: "When you hear the call", from: 0.02, to: 0.14 },
      { text: "Say the like of what the caller says", from: 0.16, to: 0.4 },
      { text: "Whoever says, when he hears the call", from: 0.42, to: 0.56 },
      { text: "O Allah, Lord of this perfect call", from: 0.58, to: 0.72 },
      { text: "And of the prayer to be established", from: 0.74, to: 0.85 },
      { text: "My intercession is due for him", from: 0.86, to: 1 }
    ]
  };
}

// Supper first. Aishah said that the Prophet ﷺ said: when supper is served and the iqamah for the prayer is called,
// start with the supper (Sahih al-Bukhari 671). No one is drawn: in the evening, a cloth is spread before a home, and
// the places of the household are about it. A dish of food comes out of the door to the cloth, and steam rises from it.
// The iqamah rings at the door of the masjid nearby; a golden ring of ease comes about the cloth and a warm glow over
// it, and the dates on the dish go, one by one.
function supperFirst(): SignArt {
  const plate: [number, number] = [28, 103.4];
  const to: [number, number] = [52, 106.4];
  const [dx, dy] = [n(to[0] - plate[0]), n(to[1] - plate[1])];
  const served = (from: number): [number, number, number][] => [
    [from, 0, 0],
    [0.12, dx, dy]
  ];
  const dates: [number, number][] = [
    [1.6, -1.8],
    [2.7, -1.5],
    [2.2, -2.6]
  ];
  const door: [number, number] = [121.6, 87.4];
  return {
    kind: "supper-first",
    ms: 9000,
    parts: [
      { name: "the evening sky", svg: EVENING },
      { name: "the sun, low", svg: sun(126, 56) },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([[8, 99, 12]]),
      { name: "their home", svg: home(30, 103, 28, 17) },
      { name: "a warm light in its window", svg: lightIn(33.3, 89.7, 3), loop: soft },
      { name: "the masjid nearby", svg: madinahMasjid(100, 99, 0.9) },
      { name: "a cloth spread for supper", svg: `<path d="M38 104.4 L66 104.4 L69 108.6 L35 108.6 Z" fill="#EFE0BC"/><path d="M37.4 105.4 L66.6 105.4" stroke="#D9C49A" stroke-width="0.5"/>` },
      ...[
        [44.6, 102.8],
        [40.6, 106.6],
        [63.4, 106.6]
      ].map(([x, y], i): SignPart => ({ name: `a place of the household at the cloth ${i + 1}`, svg: someone(x, y, 1.6) })),
      {
        name: "supper, served: a dish of bread",
        svg: dish(plate[0], plate[1]) + `<ellipse cx="${n(plate[0] - 0.8)}" cy="${n(plate[1] - 2.2)}" rx="2.2" ry="1.2" fill="#D9A35E" stroke="#B57E3E" stroke-width="0.3"/>`,
        keys: track({
          opacity: [
            [0.04, 0],
            [0.045, 1]
          ],
          xy: served(0.045)
        })
      },
      ...dates.map(
        ([ddx, ddy], i): SignPart => ({
          name: `a date on the dish ${i + 1}`,
          svg: date(n(plate[0] + ddx), n(plate[1] + ddy)),
          keys: track({
            opacity: [
              [0.04, 0],
              [0.045, 1],
              [at3(0.68 + i * 0.08), 1],
              [at3(0.685 + i * 0.08), 0]
            ],
            xy: served(0.045)
          })
        })
      ),
      { name: "steam rising from the supper", svg: steam(to[0], n(to[1] - 3.6)), keys: showFrom(0.12, 0.16), loop: { move: "twinkle", ms: 1300, low: 0.4 } },
      ...[3, 5.5, 8].map(
        (r, i): SignPart => ({
          name: `the iqamah, ring ${i + 1}`,
          svg: ring(door[0], door[1], r, "#FFFFFF"),
          keys: showFrom(at3(0.33 + i * 0.012), at3(0.34 + i * 0.012)),
          loop: { move: "twinkle", ms: 900, low: 0.2, phase: i / 3 }
        })
      ),
      { name: "supper first: a golden ring of ease about the cloth", svg: care(to[0], 106, 17, 2.8), keys: showFrom(0.64, 0.68) },
      { name: "supper first: a warm glow over the cloth", svg: wash(to[0], 104.6, 15, 4.4, WARM, 0.16), keys: showFrom(0.65, 0.7), loop: soft }
    ],
    words: [
      { text: "When supper is served", from: 0.02, to: 0.3 },
      { text: "And the iqamah is called", from: 0.32, to: 0.6 },
      { text: "Start with the supper", from: 0.62, to: 1 }
    ]
  };
}

// The siwak. Abu Hurairah said that the Messenger of Allah ﷺ said: were it not that it would be hard on my ummah, or
// on the people, I would have ordered them to use the siwak with every prayer (Sahih al-Bukhari 887). No one is drawn:
// by the masjid of Madinah his place is a golden ring at its door, and the places of his ummah are about it; a golden
// ring of care comes about them, and more places come from the homes, and a wider ring about them all. A siwak shows by
// each place. Then five times a soft light comes on every siwak, a spark of prayer rises from the masjid, and a small
// golden light is left in the sky, until five are there in a row.
function siwakEveryPrayer(): SignArt {
  const his: [number, number] = [80, 102.8];
  const ummah: [number, number][] = [
    [62, 104.4],
    [70, 106.4],
    [90, 106.4],
    [98, 104.4]
  ];
  const more: [number, number, number, number][] = [
    [40, 105.2, 14, 103.6],
    [48, 107, 14, 103.6],
    [112, 105.2, 142, 103.6],
    [120, 107, 142, 103.6]
  ];
  const all: [number, number][] = [...ummah, ...more.map(([x, y]): [number, number] => [x, y])];
  const prayers = [0.55, 0.63, 0.71, 0.79, 0.87];
  return {
    kind: "siwak-every-prayer",
    ms: 11000,
    parts: [
      ...dayAround([136, 20], 11000),
      ...palms([
        [30, 96, 12],
        [130, 95, 12]
      ]),
      { name: "homes of Madinah", svg: home(16, 103, 20, 13) + home(144, 103, 20, 13, "#D8B585", "#BF9A6A") },
      { name: "the masjid of Madinah", svg: madinahMasjid(56, 99, 1) },
      { name: "a golden ring, his place at the door", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...ummah.map(([x, y], i): SignPart => ({ name: `a place of his ummah ${i + 1}`, svg: someone(x, y, 1.6) })),
      { name: "his care: a golden ring about them", svg: care(80, 105.2, 24, 3.4), keys: showFrom(0.04, 0.08) },
      ...more.map(
        ([x, y, fx, fy], i): SignPart => ({
          name: `and on all: a place coming from the homes ${i + 1}`,
          svg: someone(x, y, 1.6),
          keys: track({
            opacity: [
              [0.23, 0],
              [0.235, 1]
            ],
            xy: [
              [0.23, n(fx - x), n(fy - y)],
              [0.29, 0, 0]
            ]
          })
        })
      ),
      { name: "his care: a wider ring about them all", svg: care(80, 104.8, 46, 3.8), keys: showFrom(0.25, 0.29) },
      ...all.map(
        ([x, y], i): SignPart => ({
          name: `a siwak by each place ${i + 1}`,
          svg: siwak(n(x + 2.4), n(y + 1.6)),
          keys: showFrom(at3(0.37 + i * 0.006), at3(0.375 + i * 0.006)),
          loop: { move: "twinkle", ms: 1600, low: 0.75, phase: (i % 4) / 4 }
        })
      ),
      {
        name: "before each prayer: a soft light on every siwak",
        svg: all.map(([x, y]) => glow(n(x + 4.6), n(y - 0.2), 2.2, WARM, 0.3)).join(""),
        keys: onAt(prayers.map((t): [number, number] => [at3(t - 0.02), at3(t + 0.01)]))
      },
      ...prayers.map((t, i) => prayerSpark(`prayer ${i + 1}: a spark rising from the masjid`, 80, 76, t, at3(t + 0.05))),
      ...prayers.map(
        (t, i): SignPart => ({
          name: `prayer ${i + 1}: a small golden light left in the sky`,
          svg: goldLight(56 + i * 12, 54, 1.4),
          keys: showFrom(at3(t + 0.03), at3(t + 0.05)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 5 }
        })
      )
    ],
    words: [
      { text: "Were it not hard on my ummah", from: 0.02, to: 0.2 },
      { text: "Or on the people", from: 0.22, to: 0.34 },
      { text: "I would have ordered them to use the siwak", from: 0.36, to: 0.5 },
      { text: "With every prayer", from: 0.52, to: 1 }
    ]
  };
}

export const HOME_ART = {
  "nearest-door": nearestDoor,
  "two-lights": twoLights,
  "abu-umayr-bird": abuUmayrBird,
  "family-spending": familySpending,
  "answer-the-call": answerTheCall,
  "supper-first": supperFirst,
  "siwak-every-prayer": siwakEveryPrayer
};
