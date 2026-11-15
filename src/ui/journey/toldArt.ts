import { animalAt, cloud, glow, n, nightSky, palm, peaks, sky, stars, tuft, type SignArt, type SignKeys, type SignPart } from "./signDraw";
import { ring, sack, showWhile, sparkle, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";

/**
 * Stories the Prophet ﷺ told, drawn as his likenesses are (likenessArt.ts): three men shut in a cave by a rock, a loan
 * sent across the sea in a piece of wood, the camels tied and let go, and the one passing through this world on his
 * way. Only the land, the sky, the sea, things and animals are drawn. No Prophet and no person is ever drawn, not even
 * a hand: where someone went, a dashed way shows it, and a voice is arcs in the air. What each one in the cave did is
 * shown in a picture beside the cave, of things and animals only. Nothing is drawn for Allah, and nothing comes down
 * from the sky: a good deed is sparks rising.
 */

export type Track = {
  xy?: [number, number, number][];
  opacity?: [number, number][];
  scale?: [number, number][];
  scaleX?: [number, number][];
  scaleY?: [number, number][];
  rotate?: [number, number][];
};

/** Keys from a part's tracks, each a list of [at, value] (or [at, x, y]), straight between, held before the first and after the last. */
export function track({ xy, opacity, scale, scaleX, scaleY, rotate }: Track): SignKeys {
  const lists = ([xy, opacity, scale, scaleX, scaleY, rotate] as (number[][] | undefined)[]).filter((list): list is number[][] => Boolean(list));
  const at = [...new Set([0, ...lists.flatMap((list) => list.map(([time]) => time))])].sort((a, b) => a - b);
  const valueAt = (list: number[][], time: number, k: number) => {
    if (time <= list[0][0]) return list[0][k];
    for (let i = 1; i < list.length; i += 1) {
      if (time <= list[i][0]) return list[i - 1][k] + ((list[i][k] - list[i - 1][k]) * (time - list[i - 1][0])) / (list[i][0] - list[i - 1][0]);
    }
    return list[list.length - 1][k];
  };
  const keys: SignKeys = { at };
  if (opacity) keys.opacity = at.map((time) => Math.round(valueAt(opacity, time, 1) * 100) / 100);
  if (xy) {
    keys.x = at.map((time) => n(valueAt(xy, time, 1)));
    keys.y = at.map((time) => n(valueAt(xy, time, 2)));
  }
  if (scale) keys.scale = at.map((time) => Math.round(valueAt(scale, time, 1) * 1000) / 1000);
  if (scaleX) keys.scaleX = at.map((time) => Math.round(valueAt(scaleX, time, 1) * 1000) / 1000);
  if (scaleY) keys.scaleY = at.map((time) => Math.round(valueAt(scaleY, time, 1) * 1000) / 1000);
  if (rotate) keys.rotate = at.map((time) => n(valueAt(rotate, time, 1)));
  return keys;
}

/** Sparks rising quickly from each of `list`, one after another from `start`, `step` apart, each gone 0.03 after it rose. */
export const quickSparks = (label: string, list: [number, number][], start: number, step: number): SignPart[] =>
  list.map(([x, y], i) => {
    const from = at3(start + i * step);
    return {
      name: `${label} ${i + 1}`,
      svg: sparkle(x, y, i % 2 ? 1.6 : 2.1, "#FFE7A0"),
      keys: { at: [0, from, at3(from + 0.006), at3(from + 0.024), at3(from + 0.03)], opacity: [0, 0, 1, 1, 0], y: [0, 0, -1, -9, -10] },
      loop: { move: "twinkle" as const, ms: 900, low: 0.5, phase: i / list.length }
    };
  });

/** Opacity that shows a part from `from` to `to` and hides it from `hide` to `gone`, as a track. */
export const shownWhile = (from: number, to: number, hide: number, gone: number): [number, number][] => [
  [from, 0],
  [to, 1],
  [hide, 1],
  [gone, 0]
];

// Three men in a cave. The Prophet ﷺ told of three men before us who went into a cave for the night. A rock rolled
// down the mountain and shut the cave on them. They said: nothing can save you from this rock but asking Allah by a
// good deed you did for His sake. One had held the milk for his old parents till dawn while they slept, so that no one
// drank before them; one had kept away from a sin he could have done, and left the gold; and one had grown a worker's
// wage into a herd, and gave it all to him when he came. After each one, the rock moved a little; after the third, it
// moved away, and they walked out (Sahih al-Bukhari 2272). No one is drawn: three dashed ways go into the cave by
// night; the rock rolls down and shuts it; a voice comes from behind the rock, and what that one did shows in a picture
// beside it, of things and animals only, while his good deed rises as sparks and the rock moves a little; then it rolls
// away, and the three ways come out.
function shutCave(): SignArt {
  const ways = ["#FFF0C4", "#F39A3D", "#9FD3F5"];
  const mountain =
    `<path d="M40 96 C50 86 60 76 70 68 C80 60 90 50 102 44 C110 40 118 39 126 42 C136 46 146 54 160 62 L160 96 Z" fill="#5C5874"/>` +
    `<path d="M118 39.4 C122 39.6 124 40.6 126 42 C136 46 146 54 160 62 L160 96 L134 96 C140 80 134 58 118 39.4 Z" fill="#000000" opacity="0.14"/>` +
    `<path d="M58 84 L64 82 M74 74 L80 73 M126 72 L132 74 M140 86 L148 85 M110 93 L116 91" stroke="#4A4660" stroke-width="0.9" stroke-linecap="round"/>`;
  const ledge = `<path d="M105 62.4 L131.6 61.6 L129 64.6 L107.4 65 Z" fill="#46425C"/>`;
  const mouth =
    `<path d="M81.6 96 L81.6 84.6 Q81.6 73.2 93 73.2 Q104.4 73.2 104.4 84.6 L104.4 96 Z" fill="#0D0A12"/>` +
    `<path d="M80.4 96 L80.4 84.6 Q80.4 72 93 72 Q105.6 72 105.6 84.6 L105.6 96" stroke="#47435C" stroke-width="1.2" fill="none"/>`;
  const rock =
    `<circle cx="93" cy="84.6" r="11.4" fill="#9890A8"/>` +
    `<path d="M86.4 78.4 L89.8 81.6 L88.6 86 M97.6 76.8 L95.8 80.4 L99.8 82.8 M90.6 91.8 L94.6 89.8 L98.4 92.6" stroke="#6C6684" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="99.4" cy="88.4" r="1.5" fill="#857E98"/><circle cx="87" cy="84" r="1" fill="#857E98"/>`;
  const moonlit =
    `<path d="M104.4 84.6 A11.4 11.4 0 0 1 86 93.6 A14.4 14.4 0 0 0 104.4 84.6 Z" fill="#000000" opacity="0.2"/>` +
    `<path d="M84.2 81 A9.6 9.6 0 0 1 91.6 75.2" stroke="#D4CFE0" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.7"/>`;
  // The rock sits on a ledge, rolls down onto the cave's mouth, moves a little after each good deed, then rolls away.
  const rolling: [number, number, number][] = [
    [0.17, 25, -34],
    [0.19, 16.6, -22.6],
    [0.21, 8.4, -11.4],
    [0.235, 0, 0],
    [0.455, 0, 0],
    [0.475, 3.4, 0],
    [0.615, 3.4, 0],
    [0.635, 6.8, 0],
    [0.87, 6.8, 0],
    [0.92, 40, 0]
  ];
  const turning: [number, number][] = [
    [0.17, 0],
    [0.19, -70],
    [0.21, -140],
    [0.235, -210],
    [0.455, -210],
    [0.475, -193],
    [0.615, -193],
    [0.635, -176],
    [0.87, -176],
    [0.92, -9]
  ];
  const dust = `<g fill="#B9B2C8" opacity="0.55"><circle cx="79.6" cy="94.4" r="2.2"/><circle cx="76.2" cy="92.8" r="1.5"/><circle cx="106.4" cy="94.4" r="2.2"/><circle cx="109.8" cy="92.8" r="1.5"/></g>`;
  const into = [
    ["M-2 104 C20 103 44 101.6 66 99.6", "M66 99.6 C74 98.8 80 97.6 86 93.6"],
    ["M-2 108 C22 107 48 105 70 102", "M70 102 C80 100.6 88 98.6 93 94"],
    ["M-2 112 C26 111 54 108.6 76 104.4", "M76 104.4 C86 102.4 94 99.4 100 93.6"]
  ];
  const outOf = ["M87 94 C85 100 78 106 70 111", "M93 95 C93 101 92 106 90 112", "M99 94 C103 100 109 105 117 110"];
  // A picture beside the cave, with its tail to the voice behind the rock; what is in it shows only while it does.
  const panel =
    `<rect x="5" y="39" width="54" height="36" rx="2.4" fill="#FFF8E6" stroke="#E9D8AE" stroke-width="0.8"/>` +
    `<path d="M58.6 59 L74 80.6 L58.6 67 Z" fill="#FFF8E6" stroke="#E9D8AE" stroke-width="0.8" stroke-linejoin="round"/><rect x="57.8" y="59.6" width="1.6" height="6.8" fill="#FFF8E6"/>`;
  const inPanel = { x: 5.6, y: 39.6, w: 52.8, h: 34.8 };
  const windows: [number, number, number, number][] = [
    [0.33, 0.35, 0.468, 0.476],
    [0.51, 0.53, 0.628, 0.636],
    [0.67, 0.69, 0.82, 0.83]
  ];
  const ground = (fill: string) => `<rect x="5" y="66" width="54" height="9" fill="${fill}"/>`;
  const gold = [
    [15, 65.6],
    [18.6, 65.6],
    [22.2, 65.6],
    [16.8, 64.2],
    [20.4, 64.2],
    [18.6, 62.8]
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.9" ry="0.9" fill="#F2C443" stroke="#C99A1E" stroke-width="0.35"/>`)
    .join("");
  const [one, two, three] = windows;
  const voice = (i: number) => {
    const [from, to, hide, gone] = windows[i];
    return { name: `a voice behind the rock, asking ${i + 1}`, svg: arcsLeft(80, 84), keys: showWhile(from, at3(from + 0.01), at3(hide - 0.003), at3(gone - 0.001)), loop: { move: "twinkle" as const, ms: 700, low: 0.5 } };
  };
  const pictured = (i: number, name: string, svg: string, opacity?: [number, number][], extra: Omit<SignPart, "name" | "svg"> = {}): SignPart => {
    const [from, to, hide, gone] = windows[i];
    return { name, svg, keys: track({ opacity: opacity ?? shownWhile(from, to, hide, gone) }), clip: inPanel, ...extra };
  };
  const herd: [string, "sheep" | "cow" | "camel", number, number, number, number][] = [
    ["a sheep, grown from the wage", "sheep", 12, 57.2, 0.12, 0.705],
    ["a cow, grown from the wage", "cow", 22, 55, 0.15, 0.725],
    ["a camel, grown from the wage", "camel", 36, 52.8, 0.18, 0.745]
  ];
  return {
    kind: "shut-cave",
    ms: 12000,
    parts: [
      { name: "the night sky", svg: nightSky(96) },
      {
        name: "stars",
        svg: stars([
          [8, 14],
          [18, 30],
          [30, 20],
          [44, 36],
          [52, 16],
          [62, 30],
          [70, 50],
          [80, 20],
          [92, 36],
          [100, 14],
          [112, 26],
          [132, 30],
          [150, 44],
          [156, 16],
          [22, 52],
          [36, 62],
          [10, 82],
          [26, 88]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon", svg: `${glow(146, 26, 9, "#FFF3C4", 0.08)}${crescent(146, 26, 5, 1.8, "#FFF3C4")}` },
      { name: "the mountain", svg: mountain },
      { name: "a ledge on the mountain", svg: ledge },
      { name: "the cave's opening", svg: mouth },
      { name: "the land", svg: `<rect y="96" width="160" height="24" fill="#323854"/><path d="M0 96 L160 96" stroke="#454B6A" stroke-width="0.7"/>` + [[14, 104], [52, 114], [122, 106], [148, 114]].map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("") },
      ...into.flatMap((pair, i) =>
        pair.map((d, k) => ({
          name: `a way into the cave ${i + 1}, part ${k + 1}`,
          svg: way(d, ways[i], 1.1),
          keys: k ? showFrom(at3(0.06 + i * 0.01), at3(0.075 + i * 0.01)) : showFrom(at3(0.03 + i * 0.01), at3(0.05 + i * 0.01))
        }))
      ),
      ...outOf.map((d, i) => ({ name: `a way out of the cave ${i + 1}`, svg: way(d, ways[i], 1.1), keys: showFrom(at3(0.925 + i * 0.01), at3(0.94 + i * 0.01)) })),
      { name: "the rock", svg: rock, origin: { x: 93, y: 84.6 }, keys: track({ xy: rolling, rotate: turning }) },
      { name: "moonlight on the rock", svg: moonlit, keys: track({ xy: rolling }) },
      { name: "dust, as the rock lands", svg: dust, keys: showWhile(0.235, 0.24, 0.255, 0.262) },
      voice(0),
      voice(1),
      voice(2),
      // The first: he held the milk for his parents through the night, till dawn.
      { name: "a picture of what the first did", svg: panel, keys: track({ opacity: shownWhile(...windows[0]) }) },
      pictured(0, "dawn, in the picture", `<rect x="5" y="39" width="54" height="27" fill="#F8CFA0"/><rect x="5" y="54" width="54" height="12" fill="#FCE3BC"/>${glow(50, 64, 10, "#FFD28A", 0.14)}`),
      pictured(0, "the night, waiting till dawn", `<rect x="5" y="39" width="54" height="27" fill="#22325A"/>${stars([[12, 44], [20, 50], [30, 43], [44, 47], [52, 42], [38, 53]])}`, [
        [one[0], 0],
        [one[1], 1],
        [0.37, 1],
        [0.41, 0]
      ]),
      pictured(0, "the ground, in the picture of the milk", ground("#CDB88A")),
      pictured(0, "the home, in the picture of the milk", home(20, 67, 16, 11)),
      pictured(0, "the window, lit at dawn", `<rect x="22" y="58.4" width="2.6" height="2.6" fill="#FFD866"/>`, shownWhile(0.412, 0.418, one[2], one[3])),
      pictured(0, "a sheep, milked", animalAt("sheep", 37, 56.4, 0.13)),
      pictured(0, "the milk, brought from the sheep", way("M38 70.2 C34 70.6 30 70.4 26 69.4", ways[0], 0.8), shownWhile(0.35, 0.36, one[2], one[3])),
      pictured(0, "the bowl of milk, held till dawn", `${glow(29.6, 65, 4, "#FFFFFF", 0.16)}<path d="M26.6 65 Q29.6 68.6 32.6 65 Z" fill="#E7E1D4"/><ellipse cx="29.6" cy="65" rx="3" ry="0.8" fill="#FFFFFF"/>`, shownWhile(0.355, 0.365, one[2], one[3])),
      ...quickSparks(
        "the first good deed, rising",
        [
          [72, 76],
          [78, 72],
          [84, 75]
        ],
        0.405,
        0.005
      ),
      // The second: he kept away from a sin he could have done, and left the gold.
      { name: "a picture of what the second did", svg: panel, keys: track({ opacity: shownWhile(...windows[1]) }) },
      pictured(1, "the sky, in the picture of the gold", `<rect x="5" y="39" width="54" height="27" fill="#F3E4C8"/>`),
      pictured(1, "the ground, in the picture of the gold", ground("#D8C29A")),
      pictured(1, "the gold, left behind", gold + glow(18.6, 64, 6, "#FFE08A", 0.1), shownWhile(0.535, 0.545, two[2], two[3])),
      pictured(1, "a way, coming near the sin", way("M58 70.6 C48 70.4 38 70 28 69.2", ways[1], 0.9), shownWhile(0.545, 0.56, two[2], two[3])),
      pictured(1, "the way, turning back from it", way("M28 69.2 C25 69.6 25.4 72.2 29 72.4 C38 72.8 48 72.8 58 72.6", ways[1], 0.9), shownWhile(0.565, 0.58, two[2], two[3])),
      ...quickSparks(
        "the second good deed, rising",
        [
          [72, 76],
          [78, 72],
          [84, 75]
        ],
        0.565,
        0.005
      ),
      // The third: the wage left with him grew into a herd, and all of it was given when its owner came.
      { name: "a picture of what the third did", svg: panel, keys: track({ opacity: shownWhile(...windows[2]) }) },
      pictured(2, "the sky, in the picture of the herd", `<rect x="5" y="39" width="54" height="27" fill="#D6ECF8"/>${cloud(46, 46, 0.3, "#FFFFFF", 0.9)}`),
      pictured(2, "the ground, in the picture of the herd", ground("#D2C089") + tuft(10, 74, "#A99A5A", 2.6) + tuft(54, 73, "#A99A5A", 2.6)),
      pictured(2, "the wage, left behind", `${glow(10.6, 64.6, 4, "#FFE08A", 0.14)}<circle cx="10.6" cy="64.6" r="1.6" fill="#F2C443" stroke="#C99A1E" stroke-width="0.4"/>`, shownWhile(0.69, 0.695, three[2], three[3])),
      ...herd.map(([name, kind, x, y, s, from]) =>
        pictured(2, name, animalAt(kind, x, y, s), undefined, {
          origin: { x: n(x + 50 * s), y: n(y + 73.4 * s) },
          keys: track({ opacity: shownWhile(from, at3(from + 0.004), three[2], three[3]), scale: [[from, 0.25], [at3(from + 0.02), 1]] })
        })
      ),
      pictured(2, "the way that came for the wage", way("M58 71.4 C52 71.4 46 71.2 40 70.8", BROWN, 0.9), shownWhile(0.77, 0.785, three[2], three[3])),
      ...quickSparks(
        "the third good deed, rising",
        [
          [72, 76],
          [78, 72],
          [84, 75]
        ],
        0.765,
        0.005
      )
    ],
    words: [
      { text: "Three men went into a cave for the night", from: 0.02, to: 0.14 },
      { text: "A rock rolled down and shut it", from: 0.16, to: 0.3 },
      { text: "One held milk for his parents till dawn", from: 0.32, to: 0.48 },
      { text: "One kept away from a sin, for Allah's sake", from: 0.5, to: 0.64 },
      { text: "One gave a worker his wage, grown into a herd", from: 0.66, to: 0.84 },
      { text: "The rock moved, and they walked out", from: 0.86, to: 1 }
    ]
  };
}

// A loan sent across the sea. The Prophet ﷺ told of a man who asked another to lend him a thousand dinars. The lender
// asked for witnesses, and he said: Allah is enough as a witness; for a guarantor, and he said: Allah is enough as a
// guarantor. He went across the sea, and when it was time to repay, he found no ship. So he took a piece of wood,
// hollowed it, put in the thousand dinars and a letter, sealed it, and gave it to the sea, trusting Allah. The lender
// came out to see if a ship had come with his money, found the piece of wood, and took it home for firewood; when he
// opened it, he found his money and the letter (Sahih al-Bukhari 2291). No one is drawn: dashed ways and voices at the
// door; the money goes to a ship, across the sea, and ashore; the ship sails away, and a way waits on the empty shore;
// the money and the letter go into the wood, which is sealed, and it floats over the sea to the other shore; then a way
// comes down to it and it goes up to the home, where it opens on the money and the letter.
function logAtSea(): SignArt {
  const SAND = "#E8D09C";
  const WAY = "#F39A3D";
  // A shore: its top from the side of the box to the sea, then its waterline down to the bottom.
  const coast = (side: number, top: string, waterline: string) =>
    `<path d="M${side} 56 ${top} ${waterline} L${side} 122 Z" fill="${SAND}"/><path d="M${top.split(" ").slice(-2).join(" ")} ${waterline}" stroke="#F5E6C2" stroke-width="1.4" fill="none"/>`;
  const leftShore = coast(0, "C12 55 24 56 34 58", "C34 70 30 88 22 104 C18 112 16 118 14 122");
  const rightShore = coast(160, "C148 55 136 56 126 58", "C126 70 130 88 138 104 C142 112 144 118 146 122");
  const ship =
    `<path d="M34 69 L54 69 L51 73.6 L37 73.6 Z" fill="#8A5530"/><path d="M43.5 69 L43.5 55" stroke="#6B4226" stroke-width="0.9"/>` +
    `<path d="M44 56 Q52.6 62 44.4 68 Z" fill="#FFFDF5"/><path d="M43.5 55 L47.4 56 L43.5 57 Z" fill="#E2483C"/>`;
  const sailing: [number, number, number][] = [
    [0.085, 0, 0],
    [0.115, 72, 0],
    [0.19, 72, 0],
    [0.245, 40, -11]
  ];
  const money = sack(20, 70, 0.7, "#C9973A") + `<circle cx="20" cy="67.6" r="0.9" fill="#FFE07A"/>`;
  const letter = (x: number, y: number) =>
    `<rect x="${n(x - 2.5)}" y="${n(y - 1.8)}" width="5" height="3.6" rx="0.3" fill="#FFFDF5" stroke="#C9B48A" stroke-width="0.3"/>` +
    `<path d="M${n(x - 1.7)} ${n(y - 0.6)} L${n(x + 1.9)} ${n(y - 0.6)} M${n(x - 1.7)} ${n(y + 0.6)} L${n(x + 1.3)} ${n(y + 0.6)}" stroke="#9C8A68" stroke-width="0.3"/>`;
  const wood = `<rect x="132" y="89.6" width="16" height="4.8" rx="2.4" fill="#9A6A3C"/><ellipse cx="147.6" cy="92" rx="1.4" ry="2.3" fill="#C8955E"/><path d="M134.6 91 L144.6 91 M135.6 93 L143.6 93" stroke="#7C522C" stroke-width="0.4"/>`;
  // The wood: on the shore, into the sea, floating over it to the other shore, then up to the home.
  const floating: [number, number, number][] = [
    [0.515, 0, 0],
    [0.53, -16, 3],
    [0.545, -34, 5],
    [0.56, -52, 3.4],
    [0.575, -70, 5],
    [0.59, -88, 3.6],
    [0.6, -104, 5],
    [0.71, -104, 5],
    [0.75, -116, -16]
  ];
  const half = (side: -1 | 1) => {
    const x = 24 + side * 8;
    return (
      `<path d="M24 73.6 L${x} 73.6 Q${x + side * 2.4} 76 ${x} 78.4 L24 78.4 Z" fill="#9A6A3C"/>` +
      `<rect x="${side < 0 ? 20.4 : 24}" y="74.8" width="3.6" height="2.4" fill="#5A3A1E"/>`
    );
  };
  const nearWaves = `<g stroke="#FFFFFF" stroke-width="1.1" fill="none" opacity="0.8"><path d="M50 106 q5 -3 10 0 q5 3 10 0 M84 114 q5 -3 10 0 q5 3 10 0 M100 100 q5 -3 10 0"/></g>`;
  return {
    kind: "log-at-sea",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 46) },
      { name: "the sun", svg: `${glow(110, 40, 10, "#FFF0C0", 0.12)}<circle cx="110" cy="40" r="4.6" fill="#FFE07A"/>`, keys: track({ xy: [[0.19, -70, 4], [0.245, 0, 0]] }) },
      { name: "clouds", svg: cloud(26, 30, 0.5, "#FFFFFF", 0.9) + cloud(132, 24, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the sea", svg: `<rect y="60" width="160" height="60" fill="#3A8FD0"/><rect y="60" width="160" height="3" fill="#64AEE3"/>` },
      { name: "far waves", svg: `<g stroke="#9FD0F2" stroke-width="0.9" fill="none" opacity="0.8"><path d="M58 68 q4 -2.6 8 0 q4 2.6 8 0 M92 74 q4 -2.6 8 0 q4 2.6 8 0 M70 84 q4 -2.6 8 0"/></g>`, loop: { move: "slide", ms: 7000 }, clip: { x: 36, y: 62, w: 88, h: 30 } },
      { name: "the shore where the money was lent", svg: leftShore },
      { name: "the shore across the sea", svg: rightShore },
      { name: "the home where the money was lent", svg: home(16, 70, 18, 12) },
      { name: "a home across the sea", svg: home(146, 70, 16, 11, "#E0B884", "#C69A68") },
      { name: "a palm across the sea", svg: palm(130, 73, 15), loop: { move: "sway", ms: 3600, angle: 1.2 } },
      { name: "a ship", svg: ship, origin: { x: 44, y: 73.6 }, keys: track({ xy: sailing, scale: [[0.19, 1], [0.245, 0.3]], opacity: [[0.235, 1], [0.245, 0]] }), loop: { move: "bob", ms: 2400, y: 0.5 } },
      { name: "a way, to borrow the money", svg: way("M36 71 C30 71.6 24 71.4 18.4 70.6", WAY, 1), keys: showFrom(0.03, 0.045) },
      { name: "a voice at the door, asking for a witness", svg: arcs(19, 66), keys: showWhile(0.045, 0.05, 0.065, 0.07), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "a voice, naming the witness", svg: arcsLeft(34, 66), keys: showWhile(0.058, 0.063, 0.08, 0.085), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "a way on the ship", svg: way("M39 67.6 C41 66 47 66 49 67.6", WAY, 0.9), origin: { x: 44, y: 73.6 }, keys: track({ xy: sailing, opacity: shownWhile(0.075, 0.082, 0.115, 0.12) }), loop: { move: "bob", ms: 2400, y: 0.5 } },
      { name: "a way, ashore across the sea", svg: way("M126 71 C130 71.6 136 71.8 141.6 70.8", WAY, 1), keys: showFrom(0.115, 0.125) },
      {
        name: "a thousand dinars",
        svg: money,
        origin: { x: 20, y: 70 },
        keys: track({
          xy: [
            [0.075, 0, 0],
            [0.085, 24, -1],
            [0.115, 96, -1],
            [0.125, 120, 0],
            [0.385, 120, 0],
            [0.405, 120, 20.8]
          ],
          scale: [
            [0.385, 1],
            [0.405, 0.4]
          ],
          opacity: [
            [0.4, 1],
            [0.405, 0]
          ]
        })
      },
      { name: "a way, down to the shore when it was time", svg: way("M143.4 71.6 C140 75.4 136 80 132.6 85", WAY, 1), keys: showFrom(0.25, 0.265) },
      { name: "a piece of wood", svg: wood, keys: track({ xy: floating, opacity: [[0.35, 0], [0.36, 1], [0.87, 1], [0.875, 0]] }), loop: { move: "bob", ms: 1800, y: 0.4 } },
      { name: "a hole in the wood", svg: `<ellipse cx="140" cy="90.8" rx="2.2" ry="0.8" fill="#3A2414"/>`, keys: track({ xy: floating, opacity: shownWhile(0.365, 0.375, 0.43, 0.436) }), loop: { move: "bob", ms: 1800, y: 0.4 } },
      {
        name: "a letter, with the money",
        svg: letter(140, 66),
        origin: { x: 140, y: 66 },
        keys: track({ xy: [[0.41, 0, 0], [0.425, 0, 24.8]], scale: [[0.41, 1], [0.425, 0.4]], opacity: shownWhile(0.405, 0.41, 0.42, 0.425) })
      },
      { name: "the wood, sealed", svg: `<ellipse cx="140" cy="90.8" rx="2.4" ry="0.9" fill="#C8955E" stroke="#7C522C" stroke-width="0.3"/>`, keys: track({ xy: floating, opacity: [[0.43, 0], [0.436, 1], [0.87, 1], [0.875, 0]] }), loop: { move: "bob", ms: 1800, y: 0.4 } },
      { name: "a voice, giving it to the sea", svg: arcsLeft(131, 86), keys: showWhile(0.505, 0.512, 0.596, 0.604), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      { name: "a way, down to the shore to look for a ship", svg: way("M15 71 C19 78 23 85 26.6 91.4", BROWN, 1), keys: showFrom(0.67, 0.685) },
      { name: "a way, taking the wood home", svg: way("M29.6 93 C28 88 26.6 83 25.4 79", BROWN, 1), keys: showFrom(0.71, 0.74) },
      ...([-1, 1] as const).map((side) => ({
        name: `the wood, opened, ${side < 0 ? "one" : "the other"} half`,
        svg: half(side),
        origin: { x: side < 0 ? 16 : 32, y: 78.4 },
        keys: track({ opacity: [[0.87, 0], [0.875, 1]], xy: [[0.875, 0, 0], [0.89, side * 3, 0]], rotate: [[0.875, 0], [0.89, side * 10]] })
      })),
      {
        name: "the thousand dinars, inside",
        svg: sack(24, 76, 0.7, "#C9973A") + `<circle cx="24" cy="73.6" r="0.9" fill="#FFE07A"/>`,
        origin: { x: 24, y: 76 },
        keys: track({ opacity: [[0.885, 0], [0.89, 1]], xy: [[0.885, 0, 2], [0.9, 0, -2]], scale: [[0.885, 0.5], [0.9, 1]] })
      },
      { name: "the letter, inside", svg: letter(30.6, 71), origin: { x: 30.6, y: 71 }, keys: track({ opacity: [[0.895, 0], [0.9, 1]], xy: [[0.895, -4, 4], [0.91, 0, 0]], scale: [[0.895, 0.4], [0.91, 1]] }) },
      { name: "near waves", svg: nearWaves, loop: { move: "slide", ms: 4600 }, clip: { x: 30, y: 92, w: 100, h: 28 } },
      ...risingSparks(
        "a trust kept, a spark rising",
        [
          [12, 60],
          [24, 56],
          [36, 60]
        ],
        0.92,
        0.012,
        { stay: true, rise: 10 }
      )
    ],
    words: [
      { text: "A thousand dinars, lent with Allah as witness", from: 0.02, to: 0.16 },
      { text: "When it was time, he found no ship", from: 0.18, to: 0.32 },
      { text: "Money and a letter, sealed in a piece of wood", from: 0.34, to: 0.48 },
      { text: "He gave it to the sea, trusting Allah", from: 0.5, to: 0.64 },
      { text: "The lender took it home for firewood", from: 0.66, to: 0.82 },
      { text: "He opened it: his money, and the letter", from: 0.84, to: 1 }
    ]
  };
}

// The tied camels. The Prophet ﷺ said: one who knows the Quran by heart is like the owner of tied camels: if he keeps
// them tied, he keeps them, and if he lets them go, they run away (Sahih al-Bukhari 5031). And: keep reviewing the
// Quran, for it slips away faster than camels from their ropes (Sahih al-Bukhari 5033). No one is drawn, and nothing of
// the Quran's pages: a voice recites from a home by heart; three camels come and are tied to their pegs; a day passes
// and they stay; the voice stops, the ropes are let go and the camels run away; then the voice comes back, and they
// are brought back and tied again.
function tiedCamels(): SignArt {
  const s = 0.26;
  const camels = [40, 72, 104];
  const top = 98 - 73.4 * s;
  const rope = (x: number) => `<path d="M${n(x + 57.4 * s)} 96.6 Q${n(x + 23)} 99.2 ${n(x + 30)} 96" stroke="#8A6440" stroke-width="0.8" fill="none"/>`;
  const peg = (x: number) => `<path d="M${n(x + 30)} 100.4 L${n(x + 30)} 95.2" stroke="#6B4A2E" stroke-width="1.3" stroke-linecap="round"/><circle cx="${n(x + 30)}" cy="95.2" r="0.9" fill="#8A6440"/>`;
  const dust = (x: number) => `<g fill="#F2E3BE" opacity="0.8"><circle cx="${n(x + 4)}" cy="97" r="2.2"/><circle cx="${n(x + 1)}" cy="95.2" r="1.5"/><circle cx="${n(x - 2)}" cy="97.4" r="1.2"/></g>`;
  return {
    kind: "tied-camels",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun, crossing the sky", svg: `${glow(80, 40, 10, "#FFF0C0", 0.12)}<circle cx="80" cy="40" r="4.6" fill="#FFE07A"/>`, keys: track({ xy: [[0.41, -60, 12], [0.47, 0, 0], [0.53, 60, 12]] }) },
      { name: "clouds", svg: cloud(30, 30, 0.5, "#FFFFFF", 0.9) + cloud(128, 26, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills",
        svg: peaks(
          [
            [24, 8, 26],
            [92, 10, 30],
            [146, 8, 22]
          ],
          62,
          "#C9B48A",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [10, 70],
          [40, 74],
          [78, 68],
          [118, 72],
          [150, 70],
          [30, 110],
          [96, 112],
          [140, 108]
        ])
      },
      { name: "the home, where the Quran is recited by heart", svg: home(22, 84, 20, 14) },
      { name: "a voice, reciting by heart", svg: arcs(29, 73.6), keys: showWhile(0.03, 0.04, 0.605, 0.612), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "the voice, reviewing again", svg: arcs(29, 73.6), keys: showFrom(0.81, 0.82), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      ...quickSparks(
        "reviewing, rising",
        [
          [32, 68],
          [36, 64],
          [40, 68]
        ],
        0.83,
        0.008
      ),
      ...camels.map((x, i) => ({ name: `a peg ${i + 1}`, svg: peg(x) })),
      { name: "a way out to the pegs, part 1", svg: way("M24 86 C32 96 46 102 70 102", BROWN, 1), keys: showFrom(0.29, 0.3) },
      { name: "a way out to the pegs, part 2", svg: way("M70 102 L102 102 L134 102", BROWN, 1), keys: showFrom(0.3, 0.31) },
      ...camels.map((x, i) => ({
        name: `a camel, tied ${i + 1}`,
        svg: animalAt("camel", x, n(top), s),
        keys: track({
          xy: [
            [at3(0.21 + i * 0.02), -110, 0],
            [at3(0.27 + i * 0.02), 0, 0],
            [at3(0.65 - i * 0.01), 0, 0],
            [at3(0.7 - i * 0.01), 130, 0]
          ],
          opacity: [
            [at3(0.21 + i * 0.02), 0],
            [at3(0.216 + i * 0.02), 1],
            [0.7, 1],
            [0.72, 0]
          ]
        }),
        loop: { move: "bob" as const, ms: 1800, y: 0.4, phase: i / 3 }
      })),
      ...camels.map((x, i) => ({ name: `its rope, tied ${i + 1}`, svg: rope(x), keys: showWhile(at3(0.31 + i * 0.01), at3(0.316 + i * 0.01), 0.615, 0.625) })),
      ...camels.map((x, i) => ({ name: `the knot, holding ${i + 1}`, svg: ring(n(x + 30), 96.2, 2, "#FFE7A0"), keys: showWhile(at3(0.42 + i * 0.01), at3(0.43 + i * 0.01), 0.612, 0.62), loop: { move: "twinkle" as const, ms: 1200, low: 0.5, phase: i / 3 } })),
      ...camels.map((x, i) => ({
        name: `dust, as it runs away ${i + 1}`,
        svg: dust(n(x + 14)),
        keys: track({ xy: [[at3(0.65 - i * 0.01), 0, 0], [at3(0.7 - i * 0.01), 110, 0]], opacity: shownWhile(at3(0.65 - i * 0.01), at3(0.656 - i * 0.01), at3(0.69 - i * 0.01), at3(0.7 - i * 0.01)) })
      })),
      ...camels.map((x, i) => ({
        name: `a camel, brought back ${i + 1}`,
        svg: animalAt("camel", x, n(top), s),
        keys: comeIn(at3(0.84 + i * 0.02), at3(0.9 + i * 0.02), -110),
        loop: { move: "bob" as const, ms: 1800, y: 0.4, phase: i / 3 }
      })),
      ...camels.map((x, i) => ({ name: `its rope, tied again ${i + 1}`, svg: rope(x), keys: showFrom(at3(0.92 + i * 0.02), at3(0.926 + i * 0.02)) })),
      ...camels.map((x, i) => ({ name: `the knot, holding again ${i + 1}`, svg: ring(n(x + 30), 96.2, 2, "#FFE7A0"), keys: showFrom(at3(0.93 + i * 0.02), at3(0.94 + i * 0.02)), loop: { move: "twinkle" as const, ms: 1200, low: 0.5, phase: i / 3 } }))
    ],
    words: [
      { text: "One who has the Quran by heart", from: 0.02, to: 0.18 },
      { text: "Is like the owner of tied camels", from: 0.2, to: 0.38 },
      { text: "If he keeps them tied, he keeps them", from: 0.4, to: 0.58 },
      { text: "If he lets them go, they run away", from: 0.6, to: 0.78 },
      { text: "Keep reviewing it: it slips away faster", from: 0.8, to: 1 }
    ]
  };
}

// Like a traveler. The Prophet ﷺ took Ibn Umar by the shoulder and said: be in this world as if you were a stranger,
// or a traveler on his way; and Ibn Umar used to say: at evening, do not wait for the morning (Sahih al-Bukhari 6416).
// And he ﷺ said: I am in this world only like a rider who rests in the shade of a tree, then goes on and leaves it
// (Jami at-Tirmidhi 2377). No one is drawn, only a camel on the road with a dashed way behind it: it passes a town
// without stopping, rests a little in a tree's shade at noon, goes on and leaves it, and at evening it has gone over
// the horizon, while the stars come out.
function traveler(): SignArt {
  const s = 0.26;
  const feet = { x: 20, y: 103.5 };
  const road = `<path d="M-4 101 C30 94 70 84 100 76.4 C120 71 140 64.4 153 61.4 L155.4 62 C142 66.6 124 75.6 108 84.6 C80 99 40 109 -4 121 Z" fill="#EADBB0"/>`;
  const tree =
    `<path d="M117.2 70.4 L117.8 63 L114 60 M117.8 63 L121.6 59.8 M117.6 65 L119.6 61.6" stroke="#6B4A2E" stroke-width="1" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="118" cy="59.6" rx="9" ry="3.4" fill="#6E9A45"/><ellipse cx="118.6" cy="58.4" rx="6.6" ry="2.2" fill="#82AE55"/>`;
  // Where its feet are along the road, and how big it looks there (smaller as it goes on, toward the horizon).
  const stops: [number, number, number, number][] = [
    [0.03, -16, 108, 0.28],
    [0.09, 20, 103.5, 0.26],
    [0.17, 20, 103.5, 0.26],
    [0.26, 64, 91.4, 0.2],
    [0.33, 64, 91.4, 0.2],
    [0.42, 98, 81, 0.155],
    [0.49, 98, 81, 0.155],
    [0.53, 112, 77.4, 0.14],
    [0.67, 112, 77.4, 0.14],
    [0.76, 134, 69.6, 0.1],
    [0.86, 134, 69.6, 0.1],
    [0.93, 151, 62.6, 0.05]
  ];
  const trail = [
    ["M-4 108.6 C2 107.4 8 106.2 13.6 105", 0.05, 0.07],
    ["M13.6 105 C24 102.6 36 99.6 46 97", 0.2, 0.22],
    ["M46 97 C50 95.6 54 94.6 57.6 93.6", 0.23, 0.25],
    ["M57.6 93.6 C68 90.6 78 87.6 87 85", 0.36, 0.38],
    ["M87 85 C90 84 92 83.4 93.4 83", 0.39, 0.41],
    ["M93.4 83 C98 81.4 102 80.2 105.6 79.2", 0.5, 0.52],
    ["M110.6 77.4 C118 75 124 72.6 130.6 70.6", 0.7, 0.72],
    ["M130.6 70.6 C140 67.2 146 64.8 150.6 63.2", 0.88, 0.9]
  ] as const;
  return {
    kind: "traveler",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 50) },
      { name: "the evening sky", svg: `<rect width="160" height="63" fill="#F2A65E"/><rect y="38" width="160" height="25" fill="#F8C98C"/>`, keys: track({ opacity: [[0.86, 0], [0.93, 1]] }) },
      { name: "the night sky, coming", svg: `<rect width="160" height="63" fill="#1E2A50"/><rect y="42" width="160" height="21" fill="#38406E"/>`, keys: track({ opacity: [[0.94, 0], [0.99, 1]] }) },
      {
        name: "stars",
        svg: stars([
          [12, 44],
          [30, 52],
          [52, 40],
          [96, 46],
          [118, 40],
          [140, 48],
          [150, 40]
        ]),
        keys: showFrom(0.95, 0.99),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the sun, going over the day",
        svg: `${glow(80, 40, 10, "#FFF0C0", 0.12)}<circle cx="80" cy="40" r="4.6" fill="#FFE07A"/>`,
        keys: track({
          xy: [
            [0.17, -62, 14],
            [0.26, -44, 8],
            [0.33, -44, 8],
            [0.42, -22, 3],
            [0.49, -22, 3],
            [0.53, 0, 0],
            [0.67, 0, 0],
            [0.76, 30, 4],
            [0.86, 30, 4],
            [0.93, 64, 18],
            [0.96, 64, 30]
          ]
        })
      },
      { name: "clouds", svg: cloud(30, 26, 0.45, "#FFFFFF", 0.9) + cloud(126, 22, 0.4, "#FFFFFF", 0.85), keys: track({ opacity: [[0.94, 1], [0.99, 0.25]] }), loop: { move: "slide", ms: 12000 } },
      {
        name: "far hills",
        svg: peaks(
          [
            [20, 6, 24],
            [70, 8, 30],
            [150, 7, 26]
          ],
          62.6,
          "#C2B184",
          false
        )
      },
      {
        name: "the land",
        svg: landOf(
          [
            [8, 72],
            [44, 70],
            [90, 70],
            [140, 76],
            [70, 112],
            [118, 104],
            [150, 96]
          ],
          "#D9C796"
        )
      },
      { name: "the road", svg: road },
      { name: "a town by the road", svg: home(18, 94, 11, 8) + home(34, 92, 13, 9.4, "#E0B884", "#C69A68") + home(52, 87.4, 11, 8.6) },
      { name: "a palm in the town", svg: palm(64, 84.6, 11), loop: { move: "sway", ms: 3800, angle: 1.2 } },
      { name: "a tree by the road", svg: tree, loop: { move: "sway", ms: 4200, angle: 0.8 } },
      { name: "its shade", svg: `<ellipse cx="114" cy="77.6" rx="9.4" ry="2.4" fill="#000000" opacity="0.16"/>` },
      ...trail.map(([d, from, to], i) => ({ name: `a way along the road, part ${i + 1}`, svg: way(d, BROWN, 1), keys: showFrom(from, to) })),
      { name: "a way, resting a little in the shade", svg: way("M104.6 79.4 C105.6 77.4 111 77 112.6 78.4", BROWN, 0.9), keys: showFrom(0.54, 0.56) },
      {
        name: "a camel on its way",
        svg: animalAt("camel", n(feet.x - 50 * s), n(feet.y - 73.4 * s), s),
        origin: feet,
        keys: track({
          xy: stops.map(([at, x, y]) => [at, n(x - feet.x), n(y - feet.y)]),
          scale: stops.map(([at, , , size]) => [at, Math.round((size / s) * 1000) / 1000]),
          opacity: [
            [0.03, 0],
            [0.036, 1],
            [0.92, 1],
            [0.95, 0]
          ]
        }),
        loop: { move: "bob", ms: 900, y: 0.4 }
      },
      {
        name: "dusk over the land",
        svg:
          peaks(
            [
              [20, 6, 24],
              [70, 8, 30],
              [150, 7, 26]
            ],
            62.6,
            "#1B1F3A",
            false
          ) + `<rect y="62.4" width="160" height="57.6" fill="#1B1F3A"/><ellipse cx="118" cy="59.6" rx="9" ry="3.4" fill="#1B1F3A"/>`,
        keys: track({
          opacity: [
            [0.86, 0],
            [0.93, 0.2],
            [0.94, 0.2],
            [0.99, 0.42]
          ]
        })
      }
    ],
    words: [
      { text: "Be in this world", from: 0.02, to: 0.14 },
      { text: "As if you were a stranger", from: 0.16, to: 0.3 },
      { text: "Or a traveler on his way", from: 0.32, to: 0.46 },
      { text: "Like a rider who rests in the shade of a tree", from: 0.48, to: 0.64 },
      { text: "Then goes on, and leaves it", from: 0.66, to: 0.8 },
      { text: "At evening, do not wait for the morning", from: 0.82, to: 1 }
    ]
  };
}

export const TOLD_ART = { "shut-cave": shutCave, "log-at-sea": logAtSea, "tied-camels": tiedCamels, traveler };
