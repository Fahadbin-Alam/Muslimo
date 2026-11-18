import { animalAt, cloud, flame, glow, n, peaks, sky, tuft, type SignArt, type SignKeys } from "./signDraw";
import { showWhile, sparkle, way } from "./giveArt";
import { comeIn, risingSparks } from "./charityArt";
import { arcsLeft } from "./companionArt";
import { arcs, BROWN, CREAM, landOf } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { home } from "./trialArt";

/**
 * Likenesses the Prophet ﷺ gave, drawn as the Companions' stories are (companionArt.ts): the believers like a building,
 * mercy in a hundred parts, grazing around a sanctuary, the one who carries musk and the one who blows the bellows,
 * and the people who shared a ship. Only the land, the sky, the sea, buildings, things and animals are drawn. No
 * Prophet, no Companion and no person is ever drawn, not even a hand: where someone went, a dashed way shows it, and a
 * voice is arcs in the air. Nothing is drawn for Allah, and nothing comes down from the sky: the hundred parts of mercy
 * are only rings to count them, and a reward is sparks rising.
 */

// The believers like a building. The Prophet ﷺ said: the believer to the believer is like a building, each part of it
// holding up the other; and he laced his fingers (Sahih al-Bukhari 481). And once, as he sat, a man came asking for
// what he needed, and he ﷺ turned to them and said: speak up for him, and you will be rewarded (Sahih al-Bukhari 6026).
// No one is drawn, and no hand: two bricks come together; the building rises row by row, each row laid on the one
// below; the wind comes, and a lone brick falls over while the wall stands, its joints holding; a dashed way comes to
// the door asking, and voices from the building speak up for it; then sparks of reward rise.
function building(): SignArt {
  const left = 48;
  const right = 112;
  const base = 100;
  const rows = 9;
  const tones = ["#C9774A", "#BD6A40", "#D08352"];
  const brick = (x: number, y: number, w: number, k: number) => `<rect x="${n(x + 0.25)}" y="${n(y + 0.25)}" width="${n(w - 0.5)}" height="3.5" rx="0.3" fill="${tones[k % 3]}"/>`;
  // The two bricks that came together first are in the bottom row, which is laid around them.
  const first = [56, 64];
  const rowOf = (i: number) => {
    const y = base - 4 * (i + 1);
    let out = `<rect x="${left}" y="${y}" width="${right - left}" height="4" fill="#E9DCC0"/>`;
    for (let x = i % 2 ? left - 4 : left, k = i; x < right; x += 8, k++) {
      const a = Math.max(x, left);
      if (i === 0 && first.includes(a)) continue;
      out += brick(a, y, Math.min(x + 8, right) - a, k);
    }
    return out;
  };
  const top = base - 4 * rows;
  const roof = `<rect x="${left - 2}" y="${top - 2.2}" width="${right - left + 4}" height="2.4" rx="0.4" fill="#9C5A36"/>`;
  const doorAndWindows =
    `<path d="M75 100 L75 90.4 Q80 85.6 85 90.4 L85 100 Z" fill="#6B4A2E"/>` +
    `<rect x="55.6" y="70.4" width="5" height="5" rx="0.6" fill="#6B4A2E"/><rect x="99.4" y="70.4" width="5" height="5" rx="0.6" fill="#6B4A2E"/>`;
  const joints =
    glow(80, 82, 36, "#FFE7A0", 0.05) +
    Array.from({ length: rows - 1 }, (_, i) => `<path d="M${left} ${base - 4 * (i + 1)} L${right} ${base - 4 * (i + 1)}" stroke="#FFC93C" stroke-width="0.8"/>`).join("");
  const wind =
    `<g fill="none" stroke="#FFFFFF" stroke-width="1.1" stroke-linecap="round" opacity="0.9">` +
    `<path d="M4 84 C18 81 30 86 42 83 C46 82 46 78 42 79"/><path d="M116 92 C122 90 128 93 136 91"/>` +
    `<path d="M8 70 C18 68 28 71 40 69"/><path d="M118 78 C128 76 138 79 150 76 C154 75 153 71 149 72"/></g>`;
  return {
    kind: "building",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "the sun", svg: `${glow(140, 40, 10, "#FFF0C0", 0.12)}<circle cx="140" cy="40" r="4.6" fill="#FFE07A"/>` },
      { name: "clouds", svg: cloud(34, 34, 0.55, "#FFFFFF", 0.9) + cloud(104, 28, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills",
        svg: peaks(
          [
            [22, 9, 24],
            [138, 11, 26]
          ],
          62,
          "#A9C48E",
          false
        )
      },
      {
        name: "the land",
        svg: landOf([
          [16, 76],
          [30, 108],
          [140, 104],
          [150, 80],
          [124, 70]
        ])
      },
      ...Array.from({ length: rows }, (_, i) => ({
        name: `a row of bricks, ${i + 1} from the ground`,
        svg: rowOf(i),
        keys: comeIn(at3(0.2 + i * 0.014), at3(0.212 + i * 0.014), 0, -5)
      })),
      { name: "its roof", svg: roof, keys: comeIn(0.33, 0.342, 0, -5) },
      { name: "its door and windows", svg: doorAndWindows, keys: showFrom(0.344, 0.354) },
      { name: "a brick, coming to the other", svg: brick(first[0], base - 4, 8, 1), keys: comeIn(0.04, 0.1, -64) },
      { name: "the other brick, coming to it", svg: brick(first[1], base - 4, 8, 2), keys: comeIn(0.04, 0.1, 100) },
      { name: "the two bricks, holding together", svg: glow(64, 98, 8, "#FFD54A", 0.22), keys: showWhile(0.1, 0.11, 0.19, 0.2), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      { name: "the wind", svg: wind, keys: showWhile(0.43, 0.45, 0.53, 0.55), loop: { move: "slide", ms: 2600 } },
      {
        name: "a lone brick, standing by itself",
        svg: `<rect x="128" y="92.4" width="3.6" height="7.6" rx="0.3" fill="#C9774A"/>`,
        origin: { x: 131.6, y: 100 },
        keys: { at: [0, 0.42, 0.43, 0.46, 0.49], opacity: [0, 0, 1, 1, 1], rotate: [0, 0, 0, 0, 90] }
      },
      { name: "each part holding up the other", svg: joints, keys: showFrom(0.5, 0.52), loop: { move: "twinkle", ms: 2200, low: 0.55 } },
      { name: "the way that came asking, part 1", svg: way("M-2 106 C18 104.4 40 103.2 58 102.6", BROWN, 1.1), keys: showFrom(0.63, 0.66) },
      { name: "the way that came asking, part 2", svg: way("M58 102.6 C62 102.4 66 102 69 101.6", BROWN, 1.1), keys: showFrom(0.66, 0.68) },
      { name: "asking, at the door", svg: arcs(70.4, 97), keys: showWhile(0.69, 0.7, 0.82, 0.83), loop: { move: "twinkle", ms: 700, low: 0.5 } },
      ...[
        [74.2, 95],
        [55.2, 72.9],
        [99, 72.9]
      ].map(([x, y], i) => ({
        name: `a voice from the building, speaking up ${i + 1}`,
        svg: arcsLeft(x, y),
        keys: showFrom(at3(0.84 + i * 0.02), at3(0.85 + i * 0.02)),
        loop: { move: "twinkle" as const, ms: 700, low: 0.5, phase: i / 3 }
      })),
      ...risingSparks(
        "a reward, rising",
        [
          [58, 62],
          [80, 60],
          [102, 62],
          [66, 86],
          [94, 86]
        ],
        0.9,
        0.012,
        { stay: true, rise: 12 }
      )
    ],
    words: [
      { text: "The believer to the believer", from: 0.02, to: 0.18 },
      { text: "Is like a building", from: 0.2, to: 0.4 },
      { text: "Each part holding up the other", from: 0.42, to: 0.6 },
      { text: "A man came asking for help", from: 0.62, to: 0.8 },
      { text: "Speak up for him, and be rewarded", from: 0.82, to: 1 }
    ]
  };
}

// Mercy in a hundred parts. The Prophet ﷺ said: Allah made mercy in a hundred parts. He kept ninety-nine parts with Him
// and sent one part among all His creation; by it creatures are merciful to each other, so that a mare lifts her hoof
// away from her foal, fearing she will hurt it (Sahih al-Bukhari 6000, 6469). Nothing is drawn for Allah, and nothing
// comes down from the sky: a hundred rings only count the parts; one of them lights for the one part among all
// creation, and warmth spreads over the land; a calf comes to her camel and a lamb to its ewe; the mare comes with her
// foal and lifts her hooves from it; then the other ninety-nine rings light.
function mercy(): SignArt {
  const cols = 20;
  const ringX = (j: number) => n(32.5 + j * 5);
  const rowY = (k: number) => 38 + k * 4;
  const one = { k: 4, j: 10 };
  const rowOfRings = (k: number) =>
    Array.from({ length: cols }, (_, j) => `<circle cx="${ringX(j)}" cy="${rowY(k)}" r="1.4" fill="#FFFFFF" fill-opacity="0.45" stroke="#7F9DB8" stroke-width="0.55"/>`).join("");
  const rowLit = (k: number) =>
    Array.from({ length: cols }, (_, j) => (k === one.k && j === one.j ? "" : `<circle cx="${ringX(j)}" cy="${rowY(k)}" r="1.4" fill="#FFE9A8" stroke="#D9A441" stroke-width="0.5"/>`)).join("");
  const pasture =
    `<rect y="61" width="160" height="59" fill="#C9DB98"/><path d="M0 61 L160 61" stroke="#AFC57E" stroke-width="0.7"/>` +
    [
      [12, 70],
      [40, 66],
      [70, 72],
      [100, 66],
      [130, 70],
      [150, 64],
      [26, 104],
      [84, 106],
      [142, 106]
    ]
      .map(([x, y]) => tuft(x, y, "#6FA347", 4))
      .join("");
  const warm = (x: number, y: number, r: number) => glow(x, y, r, "#FFC9A0", 0.2);
  // The mare (her feet at 96, her hind feet at 102.4) and her foal beside her front hooves.
  const mare: SignKeys = { at: [0, 0.62, 0.626, 0.66, 0.69, 0.72], opacity: [0, 0, 1, 1, 1, 1], x: [36, 36, n(36 * (1 - 0.006 / 0.04)), 0, 0, 0], rotate: [0, 0, 0, 0, 0, -12] };
  return {
    kind: "mercy",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE7F6", "#E6F3FA", 58) },
      { name: "clouds", svg: cloud(12, 26, 0.45, "#FFFFFF", 0.9) + cloud(150, 22, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills",
        svg: peaks(
          [
            [20, 8, 22],
            [140, 10, 24]
          ],
          62,
          "#9DBF84",
          false
        )
      },
      { name: "the pasture", svg: pasture },
      ...Array.from({ length: 5 }, (_, k) => ({
        name: `a hundred rings, to count the parts of mercy, row ${k + 1}`,
        svg: rowOfRings(k),
        keys: showFrom(at3(0.03 + k * 0.025), at3(0.042 + k * 0.025))
      })),
      {
        name: "the one part, among all creation",
        svg: `${glow(ringX(one.j), rowY(one.k), 4.5, "#FFD08A", 0.24)}<circle cx="${ringX(one.j)}" cy="${rowY(one.k)}" r="1.6" fill="#FFB067" stroke="#E07B39" stroke-width="0.5"/>`,
        keys: showFrom(0.22, 0.24),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      },
      {
        name: "warmth over all creation",
        svg: glow(30, 90, 26, "#FFE2B8", 0.07) + glow(80, 96, 24, "#FFE2B8", 0.07) + glow(130, 90, 26, "#FFE2B8", 0.07),
        origin: { x: 80, y: 94 },
        keys: { at: [0, 0.26, 0.34], opacity: [0, 0, 1], scale: [0.4, 0.4, 1] },
        loop: { move: "twinkle", ms: 2600, low: 0.75 }
      },
      { name: "a camel", svg: animalAt("camel", 4, 69, 0.34) },
      { name: "a ewe", svg: animalAt("sheep", 50, 85.9, 0.22) },
      { name: "her calf, coming to the camel", svg: animalAt("camel", 34, 80.8, 0.18, true), keys: comeIn(0.44, 0.5, 26) },
      { name: "its lamb, coming to the ewe", svg: animalAt("sheep", 68, 92.5, 0.13, true), keys: comeIn(0.47, 0.53, 18) },
      { name: "the camel's kindness to her calf", svg: warm(38, 86, 8), keys: showFrom(0.52, 0.54), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "the ewe's kindness to its lamb", svg: warm(72, 96, 7), keys: showFrom(0.55, 0.57), loop: { move: "twinkle", ms: 1800, low: 0.6, phase: 0.5 } },
      { name: "a mare, lifting her hooves from her foal", svg: animalAt("horse", 90, 66.6, 0.4), origin: { x: 102.4, y: 96 }, keys: mare },
      { name: "her foal, beside her hooves", svg: animalAt("horse", 114, 81.3, 0.2, true), keys: comeIn(0.64, 0.68, 30) },
      { name: "the mare's care for her foal", svg: warm(121, 90, 8), keys: showFrom(0.73, 0.75), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      ...Array.from({ length: 5 }, (_, k) => ({
        name: `the ninety-nine parts, kept back, row ${k + 1}`,
        svg: rowLit(k),
        keys: showFrom(at3(0.84 + k * 0.02), at3(0.852 + k * 0.02)),
        loop: { move: "twinkle" as const, ms: 2400, low: 0.8, phase: k / 5 }
      }))
    ],
    words: [
      { text: "Allah made mercy in a hundred parts", from: 0.02, to: 0.18 },
      { text: "One part among all creation", from: 0.2, to: 0.4 },
      { text: "By it, creatures are kind to each other", from: 0.42, to: 0.6 },
      { text: "A mare lifts her hoof from her foal", from: 0.62, to: 0.8 },
      { text: "He kept ninety-nine parts with Him", from: 0.82, to: 1 }
    ]
  };
}

// Grazing around a sanctuary. The Prophet ﷺ said: the halal is clear and the haram is clear, and between them are
// doubtful things that many people do not know. Whoever keeps away from them keeps his religion and his honour safe;
// and whoever falls into them is like one who grazes his flock around a sanctuary: soon he grazes inside it. Every king
// has a sanctuary, and Allah's sanctuary on His earth is what He has made haram (Sahih al-Bukhari 52). No one is drawn:
// a clear green pasture; a sanctuary marked out with red markers; a haze over the land between; a dashed way brings a
// flock up to the haze and turns back, and the flock is safe in the green; then another way grazes its flock along the
// sanctuary's border, and a sheep strays inside.
function sanctuary(): SignArt {
  const ground =
    `<rect y="61" width="160" height="59" fill="#D8CD98"/><path d="M0 61 L160 61" stroke="#C3B47E" stroke-width="0.7"/>` +
    [
      [64, 70],
      [86, 76],
      [70, 104],
      [92, 110]
    ]
      .map(([x, y]) => tuft(x, y, "#A99A5A", 3.4))
      .join("");
  const halal =
    `<path d="M-2 61 L52 61 C47 74 44 92 47 121 L-2 121 Z" fill="#9FCB68"/>` +
    [
      [8, 68],
      [30, 72],
      [42, 100],
      [14, 108],
      [36, 112]
    ]
      .map(([x, y]) => tuft(x, y, "#5F9A3A", 4.4))
      .join("");
  const haram =
    `<path d="M118 61 L162 61 L162 121 L106 121 C103 98 109 77 118 61 Z" fill="#86BF56"/>` +
    [
      [128, 70],
      [148, 66],
      [122, 88],
      [142, 84],
      [132, 102],
      [152, 100],
      [118, 110]
    ]
      .map(([x, y]) => tuft(x, y, "#4E8A2E", 6))
      .join("");
  const posts: [number, number][] = [
    [115.4, 66],
    [111.9, 73.9],
    [109.6, 81],
    [107.5, 88.4],
    [106.2, 96.4],
    [105.3, 104.2]
  ];
  const marker = ([x, y]: [number, number]) =>
    `<rect x="${n(x - 0.5)}" y="${n(y - 5)}" width="1" height="5.4" fill="#7E6447"/><path d="M${n(x + 0.5)} ${n(y - 5)} L${n(x + 3.4)} ${n(y - 4.1)} L${n(x + 0.5)} ${n(y - 3.2)} Z" fill="#D9443A"/>`;
  const haze =
    `<path d="M50 66 C62 62 82 63 100 66 C108 68 110 76 108 86 C107 96 108 104 104 110 C88 113 66 112 52 110 C46 100 45 80 50 66 Z" fill="#C9C4AE" opacity="0.62"/>` +
    [
      [64, 74, 9, 3],
      [88, 80, 10, 3.4],
      [72, 92, 11, 3.2],
      [94, 100, 8, 2.6],
      [60, 104, 8, 2.4]
    ]
      .map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#EEEADC" opacity="0.5"/>`)
      .join("");
  const firstFlock: [number, number, number][] = [
    [1, 77, 0.17],
    [20, 84, 0.18],
    [5, 94, 0.17]
  ];
  const safe = sparkle(14, 75, 1.7, "#FFF3B0") + sparkle(41, 82, 1.4, "#FFF3B0") + sparkle(3, 90, 1.4, "#FFF3B0") + sparkle(30, 100, 1.7, "#FFF3B0");
  const strays: SignKeys = { at: [0, 0.7, 0.706, 0.76, 0.86, 0.92], opacity: [0, 0, 1, 1, 1, 1], x: [-30, -30, -27, 0, 0, 28], y: [14, 14, 12.6, 0, 0, -2] };
  return {
    kind: "sanctuary",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 58) },
      { name: "clouds", svg: cloud(40, 30, 0.55, "#FFFFFF", 0.9) + cloud(120, 26, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the hills",
        svg: peaks(
          [
            [30, 10, 26],
            [96, 8, 22],
            [146, 12, 24]
          ],
          62,
          "#A88466",
          false
        )
      },
      { name: "the land", svg: ground },
      { name: "the halal, a clear green pasture", svg: halal, keys: showFrom(0.03, 0.08) },
      { name: "the sanctuary, its grass untouched", svg: haram, keys: showFrom(0.18, 0.21) },
      ...posts.map((post, i) => ({ name: `a marker of the sanctuary ${i + 1}`, svg: marker(post), keys: comeIn(at3(0.2 + i * 0.015), at3(0.21 + i * 0.015), 0, -3) })),
      {
        name: "the border of the sanctuary",
        svg: `<path d="M106 121 C103 98 109 77 118 61" stroke="#D9443A" stroke-width="0.6" stroke-dasharray="1.4 1.6" fill="none" opacity="0.85"/>`,
        keys: showFrom(0.29, 0.3)
      },
      { name: "doubtful things, a haze between them", svg: haze, keys: showFrom(0.35, 0.41), loop: { move: "bob", ms: 3400, x: 1.4 } },
      { name: "the first flock's way, up to the haze", svg: way("M-2 104 C12 101 26 97 38 93.4", BROWN, 1.1), keys: showFrom(0.5, 0.53) },
      { name: "the first flock's way, turning back", svg: way("M38 93.4 C44 91.6 47 92.6 45 95.2 C42 98.6 34 100.6 24 101.6", BROWN, 1.1), keys: showFrom(0.53, 0.56) },
      ...firstFlock.map(([x, y, s], i) => ({ name: `a sheep of the first flock ${i + 1}`, svg: animalAt("sheep", x, y, s), keys: comeIn(at3(0.52 + i * 0.01), at3(0.57 + i * 0.01), -34) })),
      { name: "kept safe, in the clear pasture", svg: safe, keys: showFrom(0.59, 0.6), loop: { move: "twinkle", ms: 1200, low: 0.4 } },
      { name: "the second flock's way, part 1", svg: way("M58 121 C62 110 68 104 76 100.6", BROWN, 1.1), keys: showFrom(0.67, 0.7) },
      { name: "the second flock's way, along the border", svg: way("M76 100.6 C84 97.6 92 96.6 99 97.6", BROWN, 1.1), keys: showFrom(0.7, 0.73) },
      { name: "a sheep of the second flock, grazing by the border", svg: animalAt("sheep", 70, 79, 0.17), keys: comeIn(0.68, 0.74, -30, 14) },
      { name: "a sheep of the second flock, straying inside", svg: animalAt("sheep", 83, 91, 0.17), keys: strays },
      { name: "the markers, warning", svg: glow(107, 92, 6, "#FF6B5B", 0.18), keys: showFrom(0.92, 0.93), loop: { move: "twinkle", ms: 900, low: 0.4 } }
    ],
    words: [
      { text: "The halal is clear", from: 0.02, to: 0.16 },
      { text: "And the haram is clear", from: 0.18, to: 0.32 },
      { text: "Between them are doubtful things", from: 0.34, to: 0.48 },
      { text: "Avoid them: your religion and honour stay safe", from: 0.5, to: 0.64 },
      { text: "Like one grazing around a sanctuary", from: 0.66, to: 0.82 },
      { text: "Soon the shepherd grazes inside it", from: 0.84, to: 1 }
    ]
  };
}

// The one who carries musk and the one who blows the bellows. The Prophet ﷺ said: a good companion and a bad one are
// like one who carries musk and one who blows the bellows. The one with musk either gives you some, or you buy some
// from him, or you find a sweet smell from him; and the one who blows the bellows either burns your clothes, or you
// find a foul smell from him (Sahih al-Bukhari 5534). No one is drawn: a musk stall and a forge face each other across a
// market street; jars of musk, their sweet smell rising; a dashed way comes to the stall, a little flask comes to it
// and a coin goes back; the sweet smell follows the way; the bellows blow and the fire roars with sparks; then a way
// comes to the forge, sparks scorch a cloak set down by it, and dark smoke rises.
function musk(): SignArt {
  const stall =
    `<path d="M10 56 L10 98 M60 56 L60 98" stroke="#7E5A36" stroke-width="1.4"/>` +
    `<rect x="11" y="60" width="48" height="38" fill="#EBD9B6"/><rect x="11" y="60" width="48" height="4" fill="#000000" opacity="0.08"/>` +
    `<rect x="13" y="80" width="44" height="1.2" fill="#A57A4E"/>` +
    `<rect x="12" y="88" width="46" height="10" fill="#B98A5A"/><rect x="11.4" y="87.2" width="47.2" height="1.6" rx="0.4" fill="#CFA272"/>`;
  const awning =
    Array.from({ length: 8 }, (_, i) => `<rect x="${n(6 + i * 7.25)}" y="54" width="7.25" height="6" fill="${i % 2 ? "#F4EEDC" : "#3F8F5A"}"/>`).join("") +
    Array.from({ length: 8 }, (_, i) => `<path d="M${n(6 + i * 7.25)} 60 Q${n(9.6 + i * 7.25)} 63 ${n(13.25 + i * 7.25)} 60 Z" fill="${i % 2 ? "#F4EEDC" : "#3F8F5A"}"/>`).join("");
  const jar = (x: number) =>
    `<path d="M${n(x - 2.4)} 80 L${n(x - 2.4)} 75.6 Q${n(x - 2.4)} 74.2 ${n(x - 1)} 73.8 L${n(x - 1)} 72.6 L${n(x + 1)} 72.6 L${n(x + 1)} 73.8 Q${n(x + 2.4)} 74.2 ${n(x + 2.4)} 75.6 L${n(x + 2.4)} 80 Z" fill="#7A4E2E"/>` +
    `<rect x="${n(x - 1.3)}" y="71.4" width="2.6" height="1.4" rx="0.4" fill="#D9B26A"/><path d="M${n(x - 1.4)} 75.6 L${n(x - 1.4)} 78.8" stroke="#FFFFFF" stroke-width="0.5" opacity="0.45"/>`;
  const jars = [19, 29, 39, 49];
  const swirl = (x: number, y: number, color: string) =>
    `<path d="M${x} ${y} c-1.4 -1 1.4 -2 0 -3 c-1.4 -1 1.4 -2 0 -3" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;
  const forge =
    `<path d="M140 66 L140 54 L148 54 L148 68 Z" fill="#6A5B50"/>` +
    `<path d="M100 98 L100 68 Q127 61 154 68 L154 98 Z" fill="#7A6A5E"/>` +
    [
      [106, 72],
      [146, 74],
      [104, 86],
      [148, 88],
      [140, 80]
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.5" fill="#8E7E70"/>`)
      .join("") +
    `<path d="M110 98 L110 82 Q121 74 132 82 L132 98 Z" fill="#2E2420"/><ellipse cx="121" cy="96" rx="7" ry="1.6" fill="#B5432C"/>`;
  const anvil = `<path d="M137 92 L151 92 L149 94.4 L146 94.4 L146.6 98 L149 98 L149 100 L139 100 L139 98 L141.4 98 L142 94.4 L139 94.4 Z" fill="#4A4A52"/>`;
  const bellows = `<path d="M101.6 95.5 L109.6 92.6 L113.4 95.5 L109.6 98.4 Z" fill="#7B4B2A"/><path d="M101.6 95.5 L109.6 92.6 M101.6 95.5 L109.6 98.4" stroke="#4D2E18" stroke-width="0.8"/>`;
  const cloak = `<path d="M103 103.4 L120 103.4 L122 107.8 L101 107.8 Z" fill="#5B7DB1"/><path d="M105 104.8 L118.4 104.8 M104 106.3 L119.6 106.3" stroke="#46679A" stroke-width="0.45"/>`;
  const scorch = [
    [107, 105.6],
    [112, 106.4],
    [116.6, 105.2]
  ]
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 1.2 : 0.9}" fill="#2B1E16"/><circle cx="${x}" cy="${y}" r="${i === 1 ? 1.8 : 1.4}" fill="none" stroke="#7A4A28" stroke-width="0.4"/>`)
    .join("");
  const flying: [number, number, number][] = [
    [107, 105.6, 0.88],
    [112, 106.4, 0.89],
    [116.6, 105.2, 0.9]
  ];
  const puff = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="4.2" ry="3" fill="#5E5852" opacity="0.8"/><ellipse cx="${n(x + 1)}" cy="${n(y - 0.8)}" rx="2.2" ry="1.5" fill="#46413C" opacity="0.6"/>`;
  const smoke: [number, number, number][] = [
    [108, 86, 0.93],
    [102, 81, 0.94],
    [96, 87, 0.95]
  ];
  return {
    kind: "musk",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C7E4F5", "#E4F1F8", 58) },
      { name: "clouds", svg: cloud(80, 30, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "homes of the market", svg: home(76, 63, 12, 8, "#E5D3B0", "#C9B48A") + home(90, 62.4, 10, 7, "#DCC8A2", "#C2AC80") },
      {
        name: "the market street",
        svg: landOf(
          [
            [70, 76],
            [92, 106],
            [148, 112],
            [20, 110]
          ],
          "#E4CFA2"
        )
      },
      { name: "the musk stall", svg: stall },
      { name: "the stall's awning, unrolling", svg: awning, origin: { x: 35, y: 54 }, keys: { at: [0, 0.04, 0.08], opacity: [0, 1, 1], scaleY: [0.05, 0.05, 1] } },
      { name: "the forge", svg: forge },
      { name: "the anvil", svg: anvil },
      { name: "the fire in the forge", svg: flame(121, 96, 10), origin: { x: 121, y: 96 }, keys: { at: [0, 0.07, 0.12, 0.68, 0.74], opacity: [0, 0, 1, 1, 1], scale: [0.3, 0.3, 0.6, 0.6, 1.25] }, loop: { move: "twinkle", ms: 600, low: 0.8 } },
      {
        name: "the bellows, blowing",
        svg: bellows,
        origin: { x: 107, y: 95.5 },
        keys: { at: [0, 0.68, 0.695, 0.71, 0.725, 0.74, 0.755, 0.77], scaleY: [1, 1, 0.55, 1, 0.55, 1, 0.55, 1] }
      },
      { name: "air, blown into the fire", svg: arcs(113.6, 95.5), keys: showWhile(0.69, 0.7, 0.76, 0.77), loop: { move: "twinkle", ms: 400, low: 0.4 } },
      ...risingSparks(
        "a spark from the fire",
        [
          [117, 86],
          [125, 84],
          [121, 88],
          [129, 87]
        ],
        0.69,
        0.01,
        { color: "#FFB347", rise: 14 }
      ),
      ...jars.map((x, i) => ({ name: `a jar of musk ${i + 1}`, svg: jar(x), keys: comeIn(at3(0.19 + i * 0.02), at3(0.2 + i * 0.02), 0, -2) })),
      { name: "the musk's sweet smell", svg: jars.map((x) => swirl(x, 70.6, "#D99AC8")).join(""), keys: showFrom(0.27, 0.29), loop: { move: "bob", ms: 2400, y: -1.2 } },
      { name: "a way to the one with musk, part 1", svg: way("M86 121 C82 112 76 106 68 102.4", BROWN, 1.1), keys: showFrom(0.35, 0.37) },
      { name: "a way to the one with musk, part 2", svg: way("M68 102.4 C66.6 101.8 65.4 101.2 64.4 100.4", BROWN, 1.1), keys: showFrom(0.37, 0.38) },
      {
        name: "a little musk, given",
        svg: `<path d="M64.4 99 L64.4 95.4 Q64.4 94.2 65.6 93.8 L65.6 92.6 L67 92.6 L67 93.8 Q68.2 94.2 68.2 95.4 L68.2 99 Z" fill="#7A4E2E" stroke="#FFF6DC" stroke-width="0.4"/><rect x="65.3" y="91.6" width="2" height="1.2" rx="0.3" fill="#D9B26A"/>`,
        keys: comeIn(0.385, 0.41, -16, -9)
      },
      { name: "a coin, to buy some", svg: `<circle cx="51" cy="88" r="1.3" fill="#E6C25A" stroke="#B48A2E" stroke-width="0.35"/>`, keys: comeIn(0.415, 0.44, 15, 8) },
      { name: "a sweet smell from him, on the way", svg: swirl(71, 100.4, "#E7A6D2") + swirl(76.4, 105.4, "#E7A6D2") + swirl(61, 104, "#E7A6D2"), keys: showFrom(0.51, 0.56), loop: { move: "bob", ms: 2400, y: -1.2 } },
      { name: "a way to the one who blows the bellows", svg: way("M88 121 C92 113 96 108 100.6 104", BROWN, 1.1), keys: showFrom(0.85, 0.87) },
      { name: "a cloak, set down by the forge", svg: cloak, keys: showFrom(0.87, 0.88) },
      ...flying.map(([x, y, t], i) => ({
        name: `a spark, flying to the cloak ${i + 1}`,
        svg: sparkle(x, y, 1.4, "#FFB347"),
        keys: { at: [0, t, at3(t + 0.004), at3(t + 0.03), at3(t + 0.04)], opacity: [0, 0, 1, 1, 0], x: [n(121 - x), n(121 - x), n(121 - x), 0, 0], y: [n(88 - y), n(88 - y), n(88 - y), 0, 0] }
      })),
      { name: "the cloak, burned", svg: scorch, keys: showFrom(0.92, 0.94) },
      ...smoke.map(([x, y, t], i) => ({
        name: `a bad smell, rising as smoke ${i + 1}`,
        svg: puff(x, y),
        keys: { at: [0, t, at3(t + 0.01), at3(t + 0.05)], opacity: [0, 0, 1, 1], x: [0, 0, -0.6, -4], y: [0, 0, -1, -5] }
      }))
    ],
    words: [
      { text: "A good friend, and a bad friend", from: 0.02, to: 0.16 },
      { text: "Like one who carries musk", from: 0.18, to: 0.32 },
      { text: "You get some as a gift, or you buy some", from: 0.34, to: 0.48 },
      { text: "Or you get a sweet smell from the carrier", from: 0.5, to: 0.64 },
      { text: "And like one who blows the bellows", from: 0.66, to: 0.82 },
      { text: "Your clothes burn, or you get a bad smell", from: 0.84, to: 1 }
    ]
  };
}

// The people who shared a ship. The Prophet ﷺ said: the likeness of one who keeps to Allah's limits and one who falls
// into them is like people who drew lots for a ship: some had its upper part and some its lower. Those below, when they
// wanted water, went by those above, and said: if we made a hole in our part, we would not trouble those above us. If
// they leave them to what they want, they all perish; and if they stop them, they are saved, and all of them are saved
// (Sahih al-Bukhari 2493). No one is drawn: the ship sails in, cut away to show its two decks; dashed ways on each
// deck; a way goes up from below, and a bucket goes down to the sea and up; a voice below, and a hole is begun in the
// lower deck, the sea spurting in; then a way comes down from above to it, the hole is stopped, and sparks rise.
function sharedShip(): SignArt {
  const origin = { x: 80, y: 86 };
  const loop = { move: "bob" as const, ms: 3200, y: 0.6 };
  const sailIn = comeIn(0.02, 0.12, -150);
  const WAY = "#F39A3D";
  const hull =
    `<path d="M22 71 L16 63.6 L27 70 Z M138 71 L146 62.6 L133 70 Z" fill="#7A4A28"/>` +
    `<path d="M22 71 L138 71 L130 90 Q125 100 112 100 L48 100 Q35 100 30 90 Z" fill="#8A5530"/>` +
    `<path d="M26 80 L134 80" stroke="#A76B3C" stroke-width="0.6"/>`;
  const lowerDeck =
    `<path d="M36 76 L124 76 L120 92 L40 92 Z" fill="#4E3220"/>` +
    `<path d="M40 92 L120 92" stroke="#A8784A" stroke-width="1"/><path d="M38 84 L122 84" stroke="#5E3E28" stroke-width="0.5"/>`;
  const upperDeck =
    `<rect x="20" y="69.8" width="120" height="2.6" fill="#C88B52"/>` +
    `<path d="M22 65.6 L138 65.6" stroke="#8A5530" stroke-width="0.8"/>` +
    Array.from({ length: 12 }, (_, i) => `<path d="M${24 + i * 10} 65.6 L${24 + i * 10} 69.8" stroke="#8A5530" stroke-width="0.6"/>`).join("");
  const hatch =
    `<rect x="97" y="69.8" width="6" height="2.6" fill="#3A2416"/><path d="M98 72.4 L98 92 M102 72.4 L102 92" stroke="#C8955E" stroke-width="0.7"/>` +
    [75.5, 79, 82.5, 86, 89.5].map((y) => `<path d="M98 ${y} L102 ${y}" stroke="#C8955E" stroke-width="0.6"/>`).join("");
  const mast =
    `<path d="M66 70 L66 32" stroke="#6B4226" stroke-width="1.6"/><path d="M50 36 L84 36" stroke="#6B4226" stroke-width="1"/>` +
    `<path d="M51 37 L83 37 Q86 51 82 64 L52 64 Q48 51 51 37 Z" fill="#FFFDF5"/><path d="M67 37 L83 37 Q86 51 82 64 L67 64 Z" fill="#000000" opacity="0.05"/>` +
    `<path d="M66 32 L73 33.6 L66 35.2 Z" fill="#E2483C"/>`;
  const loopAt = (cx: number, cy: number) => `M${cx - 5} ${cy} C${cx - 3} ${n(cy - 2.2)} ${cx + 3} ${n(cy - 2.2)} ${cx + 5} ${cy} C${cx + 3} ${n(cy + 2)} ${cx - 3} ${n(cy + 2)} ${cx - 5} ${cy}`;
  const onShip = { origin, loop };
  const frontSea =
    `<path d="M0 97 q6 -2.4 12 0 q6 2.4 12 0 q6 -2.4 12 0 q6 2.4 12 0 q6 -2.4 12 0 q6 2.4 12 0 q6 -2.4 12 0 q6 2.4 12 0 q6 -2.4 12 0 q6 2.4 12 0 q6 -2.4 12 0 q6 2.4 12 0 q6 -2.4 12 0 q6 2.4 12 0 L160 120 L0 120 Z" fill="#2F86C9"/>`;
  const nearWaves = `<g stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.85"><path d="M4 106 q5 -3 10 0 q5 3 10 0 M56 112 q5 -3 10 0 q5 3 10 0 M104 105 q5 -3 10 0 q5 3 10 0 M140 113 q5 -3 10 0"/></g>`;
  return {
    kind: "shared-ship",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 70) },
      { name: "clouds", svg: cloud(24, 30, 0.55, "#FFFFFF", 0.9) + cloud(134, 24, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the sea", svg: `<rect y="70" width="160" height="50" fill="#3A8FD0"/><rect y="70" width="160" height="4" fill="#64AEE3"/>` },
      {
        name: "far waves",
        svg: `<g stroke="#9FD0F2" stroke-width="0.9" fill="none" opacity="0.8"><path d="M4 80 q4 -2.6 8 0 q4 2.6 8 0 M120 78 q4 -2.6 8 0 q4 2.6 8 0 M146 86 q4 -2.6 8 0"/></g>`,
        loop: { move: "slide", ms: 7000 }
      },
      { name: "the ship's mast and sail", svg: mast, keys: sailIn, ...onShip },
      { name: "the ship's hull", svg: hull, keys: sailIn, ...onShip },
      { name: "its lower deck, inside", svg: lowerDeck, keys: sailIn, ...onShip },
      { name: "its upper deck", svg: upperDeck, keys: sailIn, ...onShip },
      { name: "the hatch and its ladder", svg: hatch, keys: sailIn, ...onShip },
      ...[38, 78, 122].map((x, i) => ({ name: `a way on the upper deck ${i + 1}`, svg: way(loopAt(x, 63.4), WAY, 0.9), keys: showFrom(at3(0.22 + i * 0.02), at3(0.232 + i * 0.02)), ...onShip })),
      ...[50, 74, 112].map((x, i) => ({ name: `a way on the lower deck ${i + 1}`, svg: way(loopAt(x, 88.4), WAY, 0.9), keys: showFrom(at3(0.3 + i * 0.02), at3(0.312 + i * 0.02)), ...onShip })),
      { name: "the way up from below, for water, part 1", svg: way("M107 88.4 C104 89.6 101 90 100 88 L100 74.6", WAY, 0.9), keys: showFrom(0.43, 0.46), ...onShip },
      { name: "the way up from below, for water, part 2", svg: way("M100 69 L100 63.6 C110 63.4 124 63.2 136 63", WAY, 0.9), keys: showFrom(0.46, 0.48), ...onShip },
      {
        name: "a rope, let down",
        svg: `<path d="M142 66.4 L142 92.4" stroke="#E9D9B0" stroke-width="0.4"/>`,
        keys: { at: [0, 0.488, 0.49, 0.52, 0.53, 0.56], opacity: [0, 0, 1, 1, 1, 1], scaleY: [0.05, 0.05, 0.05, 1, 1, 0.05] },
        origin: { x: 142, y: 66.4 },
        loop
      },
      {
        name: "a bucket, let down for water",
        svg: `<path d="M140.2 92.4 L143.8 92.4 L143.2 95.8 L140.8 95.8 Z" fill="#9C6A3C"/><path d="M140.2 92.4 Q142 90.4 143.8 92.4" stroke="#5A3A22" stroke-width="0.4" fill="none"/>`,
        keys: { at: [0, 0.488, 0.49, 0.52, 0.53, 0.56], opacity: [0, 0, 1, 1, 1, 1], y: [-26, -26, -26, 0, 0, -26] },
        ...onShip
      },
      { name: "water in the bucket", svg: `<path d="M140.5 93 L143.5 93" stroke="#5BB0EA" stroke-width="0.8"/>`, keys: { at: [0, 0.52, 0.522, 0.53, 0.56], opacity: [0, 0, 1, 1, 1], y: [0, 0, 0, 0, -26] }, ...onShip },
      { name: "a voice below: let us make a hole", svg: arcs(55.6, 85.6), keys: showWhile(0.63, 0.64, 0.7, 0.71), ...onShip },
      { name: "a drill, in the lower deck", svg: `<path d="M62 82.6 L62 91.4" stroke="#C9CDD2" stroke-width="0.7"/><path d="M59 82.6 L65 82.6" stroke="#B48A5A" stroke-width="1.1" stroke-linecap="round"/>`, keys: showWhile(0.7, 0.71, 0.88, 0.89), ...onShip },
      { name: "a hole, begun in the lower deck", svg: `<ellipse cx="62" cy="91.8" rx="1.7" ry="0.6" fill="#1A2E44"/>`, keys: showFrom(0.72, 0.73), ...onShip },
      {
        name: "the sea, spurting in",
        svg: `<path d="M62 91.4 Q60.6 88.4 59 87.8 M62 91.4 Q62.4 87.8 63 86.8 M62 91.4 Q63.6 88.6 65.2 88.4" stroke="#7CC4F0" stroke-width="0.7" fill="none" stroke-linecap="round"/><circle cx="58.4" cy="88.6" r="0.5" fill="#7CC4F0"/><circle cx="65.8" cy="89.2" r="0.5" fill="#7CC4F0"/>`,
        keys: showWhile(0.74, 0.76, 0.88, 0.89),
        ...onShip
      },
      { name: "a way from above, going down to stop it, part 1", svg: way("M83 63.6 C90 63.8 98.6 64.6 98.6 68 L98.6 89.6", WAY, 0.9), keys: showFrom(0.83, 0.86), ...onShip },
      { name: "a way from above, going down to stop it, part 2", svg: way("M98.6 90.4 C90 90.8 78 90.8 66 90.6", WAY, 0.9), keys: showFrom(0.86, 0.88), ...onShip },
      { name: "the hole, stopped", svg: `<rect x="59.2" y="91" width="5.6" height="1.6" rx="0.3" fill="#D9A86A"/>`, keys: showFrom(0.89, 0.9), ...onShip },
      { name: "the sea in front", svg: frontSea },
      { name: "near waves", svg: nearWaves, loop: { move: "slide", ms: 4600 } },
      ...risingSparks(
        "all of them saved, a spark rising",
        [
          [36, 62],
          [58, 58],
          [90, 60],
          [112, 58],
          [128, 62]
        ],
        0.9,
        0.01,
        { stay: true, rise: 12 }
      )
    ],
    words: [
      { text: "People shared one ship, by lot", from: 0.02, to: 0.18 },
      { text: "Some above, and some below", from: 0.2, to: 0.4 },
      { text: "Those below went up for water", from: 0.42, to: 0.6 },
      { text: "Let us make a hole in our part", from: 0.62, to: 0.8 },
      { text: "Stop them, and all of them are saved", from: 0.82, to: 1 }
    ]
  };
}

export const LIKENESS_ART = { building, mercy, sanctuary, musk, "shared-ship": sharedShip };
