import { animalAt, cloud, dateBunch, flower, glow, n, palm, sky, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs, landOf } from "./mannersArt";
import { home } from "./trialArt";
import { GOLD, hills, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, farOff, gardenIn, jug, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { date, greyRing, soft, speaking } from "./fastArt";
import { lookLine } from "./truthArt";
import { dish, roundTree } from "./worthArt";
import { showAt, showFor } from "./roadArt";

/**
 * Gifts: the folk of Paradise, given His pleasure, and never His anger after it; the ninety-nine names, a hundred less
 * one, and Paradise for whoever knows them; the women who reached perfection, Asiyah and Maryam, and Aishah's
 * excellence over women, like that of tharid over other food; leave me as I leave you, keep away from what is
 * forbidden, and do what is commanded as much as you can; understanding of the religion, the good Allah wants for
 * one; the earth carried out of the Trench, with Ibn Rawahah's words; and whoever is not merciful is not shown mercy.
 * Only the land, the sky, buildings, things, plants and animals are drawn. No Prophet, no Companion and no person is
 * ever drawn, not even a hand, a foot or a face: where someone was, a ring or a small dashed circle shows it, where
 * someone went, the circle goes, and a voice is arcs in the air. Nothing is drawn for Allah: His words are only in the
 * lines, and His pleasure is a soft golden glow over the gardens. Nothing is drawn for Asiyah or Maryam, only signs of
 * them: a palace by the Nile, and a palm with its stream. No name is written: the names are glints. Nothing comes down
 * from the sky: calm is a glow about the places on the ground, and a prayer is a spark that rises.
 */

/** Soft gold, for a ring of care that is not his. */
const SOFT_GOLD = "#DDAE52";

/** Grey, for what should not be. */
const GREY = "#8C8C8C";

/** A time rounded to a thousandth, so a time reached by adding up steps reads as the number it is. */
const at3 = (t: number) => Math.round(t * 1000) / 1000;

/** The day: sky, the sun at `sunX`, a cloud at `cloudX` drifting across. */
const daySky = (sunX: number, cloudX: number, ms: number, sunY = 20): SignPart[] => [
  { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
  { name: "the sun", svg: sun(sunX, sunY) },
  { name: "a cloud", svg: cloud(cloudX, 25, 0.55, "#FFFFFF", 0.9), loop: { move: "slide", ms } }
];

/** The land from y 61 down, with a few tufts of grass. */
const plainLand = (fill = "#E2CB9C", tufts: [number, number][] = [[18, 110], [64, 113], [112, 111], [148, 112]]) => landOf(tufts, fill);

/** Glints at each of `list`, `r` across, in `fill`. */
const glints = (list: [number, number][], r = 0.9, fill = "#FFE7A0") => list.map(([x, y]) => sparkle(x, y, r, fill)).join("");

/** A twinkle, for glints. */
const twinkle = (ms = 1300) => ({ move: "twinkle", ms, low: 0.5 }) as const;

/** A palace of Paradise: white, with a golden dome and two white towers, its foot's middle at (x, y), `s` times its size. */
export const palaceOfParadise = (x: number, y: number, s = 1) => {
  const k = (v: number) => n(v * s);
  return (
    `<rect x="${n(x - k(4))}" y="${n(y - k(5))}" width="${k(8)}" height="${k(5)}" fill="#FFF8E8"/>` +
    `<path d="M${n(x - k(2.6))} ${n(y - k(5))} Q${x} ${n(y - k(9.4))} ${n(x + k(2.6))} ${n(y - k(5))} Z" fill="#F2C94C"/>` +
    `<rect x="${n(x - k(5.6))}" y="${n(y - k(7.4))}" width="${k(1.4)}" height="${k(7.4)}" fill="#FFF3D6"/>` +
    `<rect x="${n(x + k(4.2))}" y="${n(y - k(7.4))}" width="${k(1.4)}" height="${k(7.4)}" fill="#FFF3D6"/>` +
    `<path d="M${n(x - k(0.8))} ${y} L${n(x - k(0.8))} ${n(y - k(2.2))} Q${x} ${n(y - k(3))} ${n(x + k(0.8))} ${n(y - k(2.2))} L${n(x + k(0.8))} ${y} Z" fill="#E2B33C"/>`
  );
};

/** A river along `d`: deep water, and a light line on it that runs. */
export const river = (d: string, w = 3, deep = "#6FC3EC") =>
  `<path d="${d}" stroke="${deep}" stroke-width="${w}" fill="none" stroke-linecap="round"/>` +
  `<path d="${d}" stroke="#D6F1FF" stroke-width="${n(w * 0.28)}" fill="none" stroke-dasharray="2.4 3.2" stroke-linecap="round"/>`;

/** A fruit tree, its foot at (x, y), `h` high, with fruit on it. */
export const fruitTree = (x: number, y: number, h: number, fruit = "#F2A93B") => {
  const cy = y - h * 0.7;
  const r = h * 0.34;
  return (
    roundTree(x, y, h, "#5FAE48") +
    [
      [-0.45, -0.2],
      [0.35, -0.4],
      [0, 0.25],
      [0.5, 0.3],
      [-0.3, 0.45]
    ]
      .map(([dx, dy]) => `<circle cx="${n(x + dx * r)}" cy="${n(cy + dy * r)}" r="${n(r * 0.16)}" fill="${fruit}"/>`)
      .join("")
  );
};

// Never angry again. Abu Sa'id al-Khudri said that the Messenger of Allah ﷺ said: Allah will say to the people of
// Paradise: O people of Paradise! They will say: here we are, our Lord, at Your service. He will say: are you pleased?
// They will say: why would we not be pleased, when You have given us what You have given none of Your creation? He will
// say: I will give you better than that. They will say: our Lord, and what is better than that? He will say: I grant
// you My pleasure, and I will never be angry with you after it (Sahih al-Bukhari 6549). Nothing is drawn for Allah, and
// no one is drawn: the gardens of Paradise in a soft light, with rivers, fruit trees, flowers, and white palaces with
// golden domes on the far hills; the small places of its folk among them. They come together on the meadow, and their
// voices answer. Faint lines go from them to the gardens about them; their voices speak again, and a warm glow comes
// about each place; glints show over the palaces, the rivers and the trees. The lines go, and the glints soften; their
// voices ask. Then a soft golden glow comes over all the gardens, a soft golden ring about them, and golden glints that
// stay.
function neverAngryAgain(): SignArt {
  const folk = "#C39A5A";
  const voice = "#A8783A";
  // Where the folk are among the gardens, and where they come together on the meadow.
  const from: [number, number][] = [
    [32, 101.6],
    [30, 86],
    [56, 84.6],
    [48, 106],
    [104, 84.6],
    [92, 107],
    [114, 106],
    [130, 97]
  ];
  const to: [number, number][] = [
    [65.2, 100.8],
    [72.6, 95.4],
    [80, 95.4],
    [72.6, 100.8],
    [87.4, 95.4],
    [80, 100.8],
    [87.4, 100.8],
    [94.8, 100.8]
  ];
  const voices =
    arcsLeft(n(to[0][0] - 1.8), n(to[0][1] - 3), voice) +
    arcsLeft(n(to[1][0] - 1.8), n(to[1][1] - 3), voice) +
    arcs(n(to[4][0] + 1.8), n(to[4][1] - 3), voice) +
    arcs(n(to[7][0] + 1.8), n(to[7][1] - 3), voice);
  const look = "#B8924E";
  const palaces: [number, number, number][] = [
    [30, 66, 0.9],
    [80, 64, 1.1],
    [130, 66, 0.9]
  ];
  const trees: [number, number, number][] = [
    [14, 84, 15],
    [56, 76, 11],
    [104, 76, 11],
    [146, 84, 15]
  ];
  const riverA = "M36 64 C30 74 20 80 22 90 C24 100 12 106 6 120";
  const riverB = "M124 64 C130 74 140 80 138 90 C136 100 148 106 154 120";
  return {
    kind: "never-angry-again",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#FCEFD4", "#FBF4E2", 62) },
      { name: "the soft light of the gardens", svg: wash(80, 34, 76, 26, "#FFF8E0", 0.3), loop: { move: "twinkle", ms: 2600, low: 0.8 } },
      { name: "a cloud", svg: cloud(40, 24, 0.5, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "green hills", svg: hills("#B9DC9C") },
      { name: "the gardens", svg: plainLand("#CDEAB0") },
      ...palaces.map(([x, y, s], i): SignPart => ({ name: `a palace of Paradise ${i + 1}`, svg: palaceOfParadise(x, y, s), loop: { move: "twinkle", ms: 2400 + i * 300, low: 0.9, phase: i / 3 } })),
      { name: "a river of Paradise 1", svg: river(riverA), loop: { move: "twinkle", ms: 1600, low: 0.8 } },
      { name: "a river of Paradise 2", svg: river(riverB), loop: { move: "twinkle", ms: 1700, low: 0.8, phase: 0.5 } },
      ...trees.map(([x, y, h], i): SignPart => ({ name: `a fruit tree of Paradise ${i + 1}`, svg: fruitTree(x, y, h), origin: { x, y }, loop: { move: "sway", ms: 4800 + i * 500, angle: 1.4, phase: i / 4 } })),
      {
        name: "flowers",
        svg: [
          [40, 96, "#F6A6C1"],
          [62, 89.6, "#FFFFFF"],
          [98, 89.6, "#F6A6C1"],
          [122, 96, "#FFFFFF"],
          [8, 106, "#F6A6C1"],
          [152, 104, "#FFFFFF"]
        ]
          .map(([x, y, petal]) => flower(x as number, y as number, petal as string, 4))
          .join(""),
        loop: { move: "sway", ms: 3000, angle: 1.6 }
      },
      ...from.map(
        ([x, y], i): SignPart => ({
          name: `the folk of Paradise: a place ${i + 1}`,
          svg: someone(x, y, 1.6, folk),
          keys: track({
            xy: [
              [0.03, 0, 0],
              [0.08, n(to[i][0] - x), n(to[i][1] - y)]
            ]
          })
        })
      ),
      { name: "their voices: at Your service, our Lord", svg: voices, keys: showFor(0.15, 0.16, 0.2, 0.21), loop: speaking },
      {
        name: "they look about them: faint lines from them to the gardens",
        svg:
          lookLine(71, 93.6, 30, 58.6, 66, look) +
          lookLine(80, 93.4, 80, 55.4, 74, look) +
          lookLine(89, 93.6, 130, 58.6, 66, look) +
          lookLine(64, 99, 26, 84, 86, look) +
          lookLine(96, 99, 134, 84, 86, look),
        keys: showFor(0.28, 0.3, 0.65, 0.66)
      },
      { name: "their voices: why would we not be pleased", svg: voices, keys: showFor(0.4, 0.41, 0.57, 0.58), loop: speaking },
      { name: "pleased: a warm glow about each place", svg: to.map(([x, y]) => glow(x, y, 2.8, WARM, 0.26)).join(""), keys: showAt(0.42, 0.45), loop: soft },
      {
        name: "given what none was given: glints over the palaces, the rivers and the trees",
        svg: glints(
          [
            [30, 56.4],
            [80, 52.6],
            [130, 56.4],
            [24, 80],
            [137, 80],
            [14, 72],
            [56, 67.4],
            [104, 67.4],
            [146, 72]
          ],
          1.1,
          "#FFD866"
        ),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.56, 1],
            [0.66, 1],
            [0.7, 0.4]
          ]
        }),
        loop: twinkle()
      },
      { name: "their voices: what is better than that", svg: voices, keys: showFor(0.775, 0.785, 0.825, 0.835), loop: speaking },
      { name: "His pleasure: a soft golden glow over all the gardens", svg: wash(80, 90, 86, 30, WARM, 0.14) + glow(80, 96, 30, "#FFE7A0", 0.06), keys: showAt(0.9, 0.93), loop: soft },
      { name: "never angry again: a soft golden ring about them", svg: care(80, 98.2, 21, 6.6, SOFT_GOLD), keys: showAt(0.91, 0.925), loop: soft },
      {
        name: "forever: golden glints over all the gardens",
        svg: glints(
          [
            [20, 64],
            [44, 70],
            [66, 62],
            [94, 62],
            [116, 70],
            [140, 64],
            [60, 90],
            [100, 90],
            [40, 100.4],
            [120, 100.4]
          ],
          1.1,
          "#FFD866"
        ),
        keys: showAt(0.935, 0.95),
        loop: twinkle(1500)
      }
    ],
    words: [
      { text: "Allah will say: O people of Paradise!", from: 0.02, to: 0.13 },
      { text: "They will say: at Your service, our Lord", from: 0.145, to: 0.255 },
      { text: "Allah will say: are you pleased?", from: 0.27, to: 0.38 },
      { text: "They: why would we not be pleased,", from: 0.395, to: 0.505 },
      { text: "when You gave us what You gave none else?", from: 0.52, to: 0.63 },
      { text: "Allah: I will give you better than that", from: 0.645, to: 0.755 },
      { text: "They: our Lord, what is better than that?", from: 0.77, to: 0.88 },
      { text: "Allah: My pleasure, and never angry again", from: 0.895, to: 1 }
    ]
  };
}

// Ninety-nine names. Abu Hurairah said that the Messenger of Allah ﷺ said: Allah has ninety-nine names, a hundred less
// one; whoever knows them will enter Paradise (Sahih al-Bukhari 2736). No name is written, and no one is drawn: by the
// masjid of Madinah, the place of one who learns them; in a soft light in the sky, glints show row after row, ten in
// each row, and nine in the last: ninety-nine. A faint frame comes about them, a hundred, and a faint ring where the
// hundredth would be: less one. A soft golden ring comes about the place, a faint golden line goes from it to the
// glints, and a warm light comes in it; Paradise shows far off, a soft light with a garden in it, a golden way goes
// from the place up to it, and a warm glow and glints come on the garden.
function ninetyNineNames(): SignArt {
  const at: [number, number] = [42, 103.4];
  const col = (c: number) => n(76 + c * 8.2);
  const row = (r: number) => n(18 + r * 4.2);
  const heaven: [number, number] = [28, 32];
  return {
    kind: "ninety-nine-names",
    ms: 9000,
    parts: [
      ...daySky(58, 104, 9000, 17),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 100, 0.55) },
      ...palms([
        [36, 92, 11],
        [150, 94, 12]
      ]),
      { name: "a soft light where they are counted", svg: wash(113, 37, 44, 25, "#FFF8E0", 0.32), keys: showAt(0.03, 0.04), loop: { move: "twinkle", ms: 2400, low: 0.85 } },
      ...Array.from(
        { length: 10 },
        (_, r): SignPart => ({
          name: `the names, counted: a row of glints ${r + 1}`,
          svg: glints(
            Array.from({ length: r < 9 ? 10 : 9 }, (_, c): [number, number] => [col(c), row(r)]),
            1.6,
            "#F2B93B"
          ),
          keys: showAt(at3(0.04 + 0.024 * r), at3(0.05 + 0.024 * r)),
          loop: { move: "twinkle", ms: 1400 + r * 60, low: 0.6, phase: r / 10 }
        })
      ),
      {
        name: "a hundred: a faint frame about the rows",
        svg: `<rect x="71.4" y="14.4" width="82.8" height="45.6" rx="2" stroke="${GOLD}" stroke-width="0.5" stroke-dasharray="1.2 1.2" fill="none" opacity="0.8"/>`,
        keys: showAt(0.36, 0.38)
      },
      {
        name: "less one: a faint ring where the hundredth would be",
        svg: `<circle cx="${col(9)}" cy="${row(9)}" r="1.9" stroke="#9A8460" stroke-width="0.6" stroke-dasharray="0.8 0.8" fill="none"/>`,
        keys: showAt(0.44, 0.46),
        loop: { move: "twinkle", ms: 1100, low: 0.4 }
      },
      { name: "the place of one who learns them", svg: someone(at[0], at[1], 1.5) },
      { name: "whoever knows them: a soft golden ring about the place", svg: care(at[0], n(at[1] + 0.4), 3, 1.6, SOFT_GOLD), keys: showAt(0.68, 0.69), loop: soft },
      { name: "knows them: a faint golden line from the place to the glints", svg: lookLine(44, 101.4, 76, 58.6, 74), keys: showAt(0.7, 0.71) },
      { name: "known by heart: a warm light in the place", svg: lightIn(at[0], at[1], 4), keys: showAt(0.73, 0.75), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      { name: "Paradise, a soft light far off, with a garden", svg: farOff(heaven[0], heaven[1], 13) + gardenIn(heaven[0], heaven[1], 13), keys: showAt(0.78, 0.8), loop: { move: "twinkle", ms: 2200, low: 0.85 } },
      { name: "will enter it: a golden way from the place up to the garden", svg: way(`M${at[0] - 1} ${at[1] - 2} C36 86 22 62 ${heaven[0]} ${heaven[1] + 13}`, GOLD), keys: showAt(0.82, 0.85) },
      { name: "a warm glow on the garden", svg: glow(heaven[0], n(heaven[1] + 2), 12, WARM, 0.3), keys: showAt(0.87, 0.89), loop: soft },
      {
        name: "glints over the garden",
        svg: glints(
          [
            [20, 26],
            [35, 24.4],
            [28, 20.4]
          ],
          1.1,
          "#FFD866"
        ),
        keys: showAt(0.91, 0.92),
        loop: twinkle()
      }
    ],
    words: [
      { text: "He said: Allah has ninety-nine names", from: 0.02, to: 0.33 },
      { text: "a hundred less one", from: 0.345, to: 0.655 },
      { text: "whoever knows them will enter Paradise", from: 0.67, to: 1 }
    ]
  };
}

/** Pharaoh's palace: a long hall of columns on a raised floor, with a gate, its foot's middle at (x, y). */
const pharaohsPalace = (x: number, y: number) =>
  `<rect x="${n(x - 15)}" y="${n(y - 1.6)}" width="30" height="1.6" fill="#C9B48A"/>` +
  `<rect x="${n(x - 13)}" y="${n(y - 11)}" width="26" height="9.4" fill="#E9DAB4"/>` +
  [-11, -7.4, 7.4, 11].map((dx) => `<rect x="${n(x + dx - 0.7)}" y="${n(y - 11)}" width="1.4" height="9.4" fill="#D2BF92"/>`).join("") +
  `<rect x="${n(x - 14)}" y="${n(y - 12.6)}" width="28" height="1.8" fill="#C2A86E"/>` +
  `<rect x="${n(x - 2.4)}" y="${n(y - 7.6)}" width="4.8" height="6" fill="#7A5A3A"/>` +
  `<rect x="${n(x - 5.2)}" y="${n(y - 9)}" width="2.2" height="2.2" fill="#6B4A2E"/><rect x="${n(x + 3)}" y="${n(y - 9)}" width="2.2" height="2.2" fill="#6B4A2E"/>`;

/** `svg`, drawn `s` times its size about (x, y). */
const bigger = (x: number, y: number, s: number, svg: string) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${svg}</g>`;

/** A cloth spread on the ground from x1 to x2, its near edge at y. */
const cloth = (x1: number, x2: number, y: number) =>
  `<path d="M${x1} ${n(y - 4.6)} L${x2} ${n(y - 4.6)} L${n(x2 + 2.6)} ${y} L${n(x1 - 2.6)} ${y} Z" fill="#EADBB4"/>` +
  `<path d="M${n(x1 - 1.4)} ${n(y - 1.2)} L${n(x2 + 1.4)} ${n(y - 1.2)}" stroke="#C9A86E" stroke-width="0.4" stroke-dasharray="1 1"/>`;

/** Tharid: bread soaked in broth with meat, in a wide bowl, its foot's middle at (x, y). */
const tharid = (x: number, y: number) =>
  `<path d="M${n(x - 5)} ${n(y - 2.4)} Q${x} ${n(y + 1.2)} ${n(x + 5)} ${n(y - 2.4)} Z" fill="#A9743E"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.5)}" rx="4.6" ry="1.1" fill="#C98E4A"/>` +
  [-2.6, -0.6, 1.4, 3]
    .map((dx, i) => `<ellipse cx="${n(x + dx)}" cy="${n(y - 2.9 - (i % 2) * 0.4)}" rx="0.9" ry="0.5" fill="${i % 2 ? "#E2B36E" : "#8A4A2A"}"/>`)
    .join("");

/** Steam rising in two small curls over (x, y). */
const steam = (x: number, y: number) =>
  [-1.4, 1.4].map((dx) => `<path d="M${n(x + dx)} ${y} q-1 -1.4 0 -2.8 q1 -1.4 0 -2.8" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.8" stroke-linecap="round"/>`).join("");

// The best of women. Abu Musa said that the Messenger of Allah ﷺ said: many among men reached perfection, but none
// among women reached it except Asiyah, Pharaoh's wife, and Maryam, the daughter of Imran; and the excellence of Aishah
// over women is like the excellence of tharid over all other food (Sahih al-Bukhari 3411, 3433, 3770). No one is
// drawn, and nothing for Asiyah or Maryam but signs of them: across the middle of the land, many small places, and soft
// golden rings come about them, three by three. Far off, Pharaoh's palace by the Nile: a soft light shows in one of its
// windows, a soft golden ring comes about it, and glints. Far off on the other side, a palm: its stream flows from its
// foot, ripe dates show under its crown, a soft golden ring comes about it, and glints. Near, by her home, Aishah's
// place: a soft golden ring, a warm glow and glints come about it. On a cloth spread with dishes, dates, bread, milk
// and olives, a bowl of tharid shows, steaming, and a golden glow and glints come about it.
function theBestOfWomen(): SignArt {
  const many: [number, number][] = Array.from({ length: 12 }, (_, i): [number, number] => [n(52 + i * 6), n(87.4 + (i % 2) * 1.6)]);
  const palaceAt: [number, number] = [26, 79];
  const palmAt: [number, number] = [140, 86];
  const crownX = n(palmAt[0] + 24 * 0.08);
  const crownY = palmAt[1] - 24;
  const aishah: [number, number] = [32, 105.4];
  const tharidAt: [number, number] = [98, 106];
  const streamPath = `M${palmAt[0] - 4} ${palmAt[1] + 1} C142 90 150 92 160 94`;
  return {
    kind: "the-best-of-women",
    ms: 12000,
    parts: [
      ...daySky(118, 70, 12000, 18),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the Nile", svg: river("M0 70.6 C14 68 30 70 44 66.4 C50 65 56 64.4 62 63.4", 4.2, "#5FAEDD"), loop: { move: "twinkle", ms: 1800, low: 0.8 } },
      { name: "Pharaoh's palace by the Nile", svg: pharaohsPalace(palaceAt[0], palaceAt[1]) },
      {
        name: "Asiyah's faith: a soft light in a window of the palace",
        svg: `<rect x="${n(palaceAt[0] - 5.2)}" y="${n(palaceAt[1] - 9)}" width="2.2" height="2.2" fill="#FFE7A0"/>` + glow(n(palaceAt[0] - 4.1), n(palaceAt[1] - 7.9), 3.4, "#FFF3C0", 0.3),
        keys: showAt(0.23, 0.245),
        loop: { move: "twinkle", ms: 1600, low: 0.7 }
      },
      { name: "perfected: a soft golden ring about the palace", svg: care(palaceAt[0], n(palaceAt[1] - 5.6), 17, 7.6, SOFT_GOLD), keys: showAt(0.26, 0.275), loop: soft },
      {
        name: "glints over the palace",
        svg: glints(
          [
            [16, 64.2],
            [26, 62.4],
            [36, 64.2]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.3, 0.31),
        loop: twinkle()
      },
      { name: "the palm", svg: palm(palmAt[0], palmAt[1], 24), origin: { x: palmAt[0], y: palmAt[1] }, loop: { move: "sway", ms: 4200, angle: 1.2 } },
      {
        name: "ripe dates under the palm's crown",
        svg: dateBunch(n(crownX - 5), n(crownY + 1)) + dateBunch(n(crownX + 4.4), n(crownY + 2)),
        origin: { x: palmAt[0], y: palmAt[1] },
        keys: showAt(0.44, 0.455),
        loop: { move: "sway", ms: 4200, angle: 1.2 }
      },
      {
        name: "the stream from beneath the palm",
        svg: river(streamPath, 2.6, "#4FA7DE"),
        origin: { x: palmAt[0] - 4, y: palmAt[1] + 1 },
        keys: track({
          opacity: [
            [0.42, 0],
            [0.425, 1]
          ],
          scaleX: [
            [0.42, 0.05],
            [0.45, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 1600, low: 0.8 }
      },
      { name: "perfected: a soft golden ring about the palm", svg: care(n(palmAt[0] + 2), n(palmAt[1] - 1), 9, 3.6, SOFT_GOLD), keys: showAt(0.48, 0.495), loop: soft },
      {
        name: "glints over the palm",
        svg: glints(
          [
            [132, 58],
            [148, 57.4],
            [154, 66]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.51, 0.52),
        loop: twinkle()
      },
      { name: "many places across the land", svg: many.map(([x, y]) => someone(x, y, 1.3)).join("") },
      ...[0, 1, 2, 3].map(
        (g): SignPart => ({
          name: `many reached perfection: soft golden rings ${g + 1}`,
          svg: many
            .slice(g * 3, g * 3 + 3)
            .map(([x, y]) => care(x, n(y + 0.4), 2.6, 1.4, SOFT_GOLD))
            .join(""),
          keys: showAt(at3(0.04 + g * 0.03), at3(0.05 + g * 0.03)),
          loop: soft
        })
      ),
      { name: "Aishah's home", svg: home(18, 104, 16, 11) },
      { name: "Aishah's place", svg: someone(aishah[0], aishah[1], 1.5) },
      { name: "her excellence: a soft golden ring about Aishah's place", svg: care(aishah[0], n(aishah[1] + 0.4), 2.8, 1.5, SOFT_GOLD), keys: showAt(0.62, 0.635), loop: soft },
      { name: "a warm glow about Aishah's place", svg: glow(aishah[0], aishah[1], 5, WARM, 0.3), keys: showAt(0.645, 0.66) },
      {
        name: "glints over Aishah's place",
        svg: glints(
          [
            [29.4, 101.4],
            [34.6, 101]
          ],
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.68, 0.69),
        loop: twinkle(1200)
      },
      { name: "a cloth spread with dishes", svg: cloth(60, 136, 109) },
      { name: "other food: dates on a dish", svg: bigger(68, 106, 1.5, dish(68, 106) + date(66.8, 104.6) + date(69, 104.4) + date(68, 103.8)) },
      {
        name: "other food: bread",
        svg: bigger(82, 105.4, 1.5, `<ellipse cx="80.2" cy="105.4" rx="2.6" ry="1.1" fill="#D9A35A"/><ellipse cx="84.2" cy="105.2" rx="2.4" ry="1" fill="#E2B36E"/>`)
      },
      {
        name: "other food: a bowl of milk",
        svg: bigger(114, 105, 1.5, `<path d="M111.4 104.4 Q114 107 116.6 104.4 Z" fill="#B8864A"/><ellipse cx="114" cy="104.4" rx="2.6" ry="0.6" fill="#FFFFFF"/>`)
      },
      {
        name: "other food: olives on a dish",
        svg: bigger(
          127,
          106,
          1.5,
          dish(127, 106) +
            [
              [125.6, 104.6],
              [127.4, 104.4],
              [128.6, 104.8],
              [126.6, 103.8]
            ]
              .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="0.8" ry="0.55" fill="#5E6B2E"/>`)
              .join("")
        )
      },
      { name: "a bowl of tharid", svg: bigger(tharidAt[0], tharidAt[1], 1.5, tharid(tharidAt[0], tharidAt[1])), keys: showAt(0.81, 0.825) },
      { name: "steam over the tharid", svg: steam(tharidAt[0], n(tharidAt[1] - 5.4)), keys: showAt(0.83, 0.845), loop: { move: "bob", ms: 1400, y: -0.6 } },
      { name: "over other food: a golden glow about the tharid", svg: glow(tharidAt[0], n(tharidAt[1] - 3), 8, WARM, 0.32), keys: showAt(0.86, 0.875), loop: soft },
      {
        name: "glints over the tharid",
        svg: glints(
          [
            [91.4, 97.6],
            [104.6, 97.2]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.9, 0.91),
        loop: twinkle(1200)
      }
    ],
    words: [
      { text: "He said: many men reached perfection", from: 0.02, to: 0.2 },
      { text: "but of women only Asiyah, Pharaoh's wife,", from: 0.215, to: 0.395 },
      { text: "and Maryam, the daughter of Imran", from: 0.41, to: 0.59 },
      { text: "And Aishah's excellence over women", from: 0.605, to: 0.785 },
      { text: "is like that of tharid over other food", from: 0.8, to: 1 }
    ]
  };
}

/** An old home broken down: low walls with broken tops, and stones about it, its foot's middle at (x, y). */
const ruin = (x: number, y: number) =>
  `<path d="M${n(x - 3.6)} ${y} L${n(x - 3.6)} ${n(y - 3)} L${n(x - 2.2)} ${n(y - 4.2)} L${n(x - 1.2)} ${n(y - 2.2)} L${n(x + 0.6)} ${n(y - 3.4)} L${n(x + 1.4)} ${n(y - 1.4)} L${n(x + 3.2)} ${n(y - 2.4)} L${n(x + 3.6)} ${y} Z" fill="#B9A88A"/>` +
  `<ellipse cx="${n(x + 4.8)}" cy="${n(y - 0.3)}" rx="0.9" ry="0.5" fill="#A8977A"/><ellipse cx="${n(x - 4.6)}" cy="${n(y - 0.2)}" rx="0.7" ry="0.4" fill="#A8977A"/>`;

/** A patch of grey thorns on the ground about (x, y). */
const thorns = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="5.4" ry="1.8" fill="#9A9A92"/>` +
  [-4, -2, 0, 2, 4]
    .map((dx, i) => `<path d="M${n(x + dx)} ${n(y - 0.6)} L${n(x + dx - 0.8)} ${n(y - 2.6 - (i % 2))} M${n(x + dx)} ${n(y - 0.6)} L${n(x + dx + 0.8)} ${n(y - 2.4 - (i % 2))}" stroke="#6F6F68" stroke-width="0.4" stroke-linecap="round"/>`)
    .join("");

// As much as you can. Abu Hurairah said that the Prophet ﷺ said: leave me as I leave you; those before you were ruined
// only by their questions and their differing over their prophets. So when I forbid you something, keep away from it;
// and when I command you to do something, do of it as much as you can (Sahih al-Bukhari 7288). No one is drawn, and
// nothing for the prophets of old: by the masjid of Madinah, his place, a golden ring, and the places of three by it;
// his voice speaks, and a faint golden line goes from it to them. Far off, in a pale light, the homes of those before
// and their faded places: many grey voices rise from them, grey lines cross between them, and the homes fall to ruins
// in a grey haze, their places gone. His voice speaks again: a grey patch of thorns shows before the three, and they
// step back from it, and a grey ring comes about it. A faint golden way shows, going on past it, and the three set out
// along it; one goes far, one halfway and one a little way, each as far as it can, and a soft golden ring and glints
// come about each.
function asMuchAsYouCan(): SignArt {
  const his: [number, number] = [32, 99.4];
  const three: [number, number][] = [
    [44, 97.4],
    [50.6, 101.2],
    [57, 97]
  ];
  const back = -3;
  const patch: [number, number] = [72, 96.6];
  const WAY: [number, number][] = [
    [58, 102.4],
    [80, 105.6],
    [120, 104.2],
    [154, 99.8]
  ];
  const wayAt = (t: number): [number, number] => {
    const u = 1 - t;
    const f = (i: 0 | 1) => n(u * u * u * WAY[0][i] + 3 * u * u * t * WAY[1][i] + 3 * u * t * t * WAY[2][i] + t * t * t * WAY[3][i]);
    return [f(0), f(1)];
  };
  // Where each of the three sets out to on the way, where it is halfway on, and how far it goes.
  const setOut = [0.16, 0.09, 0.02];
  const midway = [0.5, 0.32, 0.15];
  const farAs = [0.85, 0.55, 0.28];
  const keysOf = ([x, y]: [number, number], i: number) => {
    const rel = (t: number): [number, number] => {
      const [wx, wy] = wayAt(t);
      return [n(wx - x), n(wy - y)];
    };
    const [sx, sy] = rel(setOut[i]);
    const [mx, my] = rel(midway[i]);
    const [fx, fy] = rel(farAs[i]);
    return track({
      xy: [
        [0.56, 0, 0],
        [0.59, back, 0],
        [0.71, back, 0],
        [0.78, sx, sy],
        [0.85, sx, sy],
        [0.88, mx, my],
        [0.91, fx, fy]
      ]
    });
  };
  const old: [number, number, number, number][] = [
    [108, 76.4, 8, 6],
    [120, 75, 9, 6.6],
    [133, 76.6, 8, 6],
    [145, 75.4, 7.4, 5.6]
  ];
  const oldPlaces: [number, number][] = [
    [112.6, 79],
    [125, 78.4],
    [137.6, 79.2],
    [149.4, 78.6]
  ];
  const faded = "#9A8A78";
  const ends = farAs.map(wayAt);
  return {
    kind: "as-much-as-you-can",
    ms: 12000,
    parts: [
      ...daySky(70, 40, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 97, 0.55) },
      ...palms([[36, 90, 11]]),
      { name: "long ago: a pale light over the far homes", svg: wash(127, 75, 30, 7, "#FFFFFF", 0.14) },
      ...old.map(
        ([x, y, w, h], i): SignPart => ({
          name: `a home of those before ${i + 1}`,
          svg: home(x, y, w, h, "#D9C4A2", "#C9B08A", "#8A7458"),
          keys: track({
            opacity: [
              [0.39, 1],
              [0.42, 0]
            ]
          })
        })
      ),
      ...old.map(([x, y], i): SignPart => ({ name: `ruined: a broken home ${i + 1}`, svg: ruin(x, y), keys: showAt(0.39, 0.42) })),
      {
        name: "the faded places of those before",
        svg: oldPlaces.map(([x, y]) => someone(x, y, 1.1, faded)).join(""),
        keys: track({
          opacity: [
            [0.41, 1],
            [0.44, 0]
          ]
        })
      },
      {
        name: "their questions: grey voices",
        svg: oldPlaces.map(([x, y], i) => (i % 2 ? arcs(n(x + 1.4), n(y - 2.8), GREY) : arcsLeft(n(x - 1.4), n(y - 2.8), GREY))).join(""),
        keys: showFor(0.19, 0.2, 0.43, 0.45),
        loop: speaking
      },
      {
        name: "more questions: more grey voices",
        svg: oldPlaces.map(([x, y], i) => (i % 2 ? arcsLeft(n(x - 1.4), n(y - 3.4), GREY) : arcs(n(x + 1.4), n(y - 3.4), GREY))).join(""),
        keys: showFor(0.23, 0.24, 0.43, 0.45),
        loop: { move: "twinkle", ms: 800, low: 0.4 }
      },
      {
        name: "their differing: grey lines crossing between them",
        svg: lookLine(112.6, 77.6, 137.6, 77.8, 70.4, GREY) + lookLine(125, 77, 149.4, 77.2, 70, GREY) + lookLine(137.6, 77.8, 112.6, 77.6, 84, GREY),
        keys: showFor(0.36, 0.37, 0.43, 0.45)
      },
      { name: "ruined: a grey haze over the broken homes", svg: wash(127, 75, 26, 6, GREY, 0.16), keys: showAt(0.42, 0.44) },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: leave me as I leave you", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showFor(0.03, 0.04, 0.11, 0.12), loop: speaking },
      { name: "he tells them: a faint golden line from his place to the three", svg: lookLine(34.6, 98.4, 49, 96.2, 93), keys: showFor(0.05, 0.07, 0.11, 0.12) },
      { name: "his voice: when I forbid, when I command", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.52, 0.53), loop: speaking },
      { name: "what is forbidden: a grey patch of thorns", svg: thorns(patch[0], patch[1]), keys: showAt(0.53, 0.545) },
      { name: "kept away from: a grey ring about the thorns", svg: greyRing(patch[0], n(patch[1] - 0.6), 7.6, 3.2), keys: showAt(0.6, 0.615) },
      { name: "what is commanded: a faint golden way, going on past the thorns", svg: way(`M${WAY[0][0]} ${WAY[0][1]} C${WAY[1][0]} ${WAY[1][1]} ${WAY[2][0]} ${WAY[2][1]} ${WAY[3][0]} ${WAY[3][1]}`, GOLD), keys: showAt(0.69, 0.7) },
      ...three.map(([x, y], i): SignPart => ({ name: `the three: a place ${i + 1}`, svg: someone(x, y, 1.5), keys: keysOf([x, y], i) })),
      {
        name: "as much as each can: a soft golden ring about each place",
        svg: ends.map(([x, y]) => care(x, n(y + 0.4), 2.8, 1.5, SOFT_GOLD)).join(""),
        keys: showAt(0.92, 0.935),
        loop: soft
      },
      {
        name: "glints over each place",
        svg: glints(ends.map(([x, y]): [number, number] => [n(x + 1.6), n(y - 3.6)]), 0.9, "#FFD866"),
        keys: showAt(0.94, 0.955),
        loop: twinkle(1200)
      }
    ],
    words: [
      { text: "He said: leave me as I leave you", from: 0.02, to: 0.17 },
      { text: "Those before you were ruined by questions", from: 0.185, to: 0.335 },
      { text: "and differing over their prophets", from: 0.35, to: 0.5 },
      { text: "When I forbid you something, avoid it", from: 0.515, to: 0.665 },
      { text: "When I order you to do something, do of it", from: 0.68, to: 0.83 },
      { text: "as much as you can", from: 0.845, to: 1 }
    ]
  };
}

// Understanding the religion. The Prophet ﷺ said: when Allah wants good for someone, He makes him understand the
// religion. I only share out, and Allah gives. This nation will stay on Allah's command; those who oppose them will not
// harm them, until Allah's command comes (Sahih al-Bukhari 71). No one is drawn: by the masjid of Madinah, his place,
// a golden ring, and five places sitting in a circle by it. His voice speaks, and a soft golden ring comes about one of
// the five; a faint golden line goes from his place to it, a warm light comes in it, and glints. Small sacks by his
// place go out, one to each of the five, and a soft golden glow comes over them. A golden way shows, from the masjid
// across the land to the far horizon; six places come along it. Grey places stand off the way, their grey voices
// speaking and faint grey lines going toward it, which stop short, and a soft golden line shows along the way. The six
// go on along it toward the far horizon, the grey ones fade, and golden glints show along the way.
function understandingTheReligion(): SignArt {
  const his: [number, number] = [48, 99];
  const five: [number, number][] = [
    [59.6, 97.6],
    [65, 93.8],
    [73.4, 93.8],
    [79.6, 97.4],
    [69.4, 102]
  ];
  const one = five[4];
  const heap: [number, number][] = [
    [44.4, 106],
    [47.4, 106.2],
    [50.4, 106],
    [45.9, 104.4],
    [48.9, 104.4]
  ];
  const WAY: [number, number][] = [
    [40, 104.6],
    [76, 111],
    [120, 99],
    [158, 68]
  ];
  const wayAt = (t: number): [number, number] => {
    const u = 1 - t;
    const f = (i: 0 | 1) => n(u * u * u * WAY[0][i] + 3 * u * u * t * WAY[1][i] + 3 * u * t * t * WAY[2][i] + t * t * t * WAY[3][i]);
    return [f(0), f(1)];
  };
  const first = [0.02, 0.04, 0.06, 0.08, 0.1, 0.12];
  const steps = (a: number, b: number) => [0.25, 0.5, 0.75, 1].map((k) => a + (b - a) * k);
  const nation = first.map((t0, i): SignPart => {
    const [x, y] = wayAt(t0);
    const rel = (t: number): [number, number] => {
      const [wx, wy] = wayAt(t);
      return [n(wx - x), n(wy - y)];
    };
    const t1 = 0.08 + i * 0.08;
    const t2 = 0.5 + i * 0.08;
    const along = (a: number, b: number, from: number, to: number) =>
      steps(a, b).map((t, k): [number, number, number] => {
        const [dx, dy] = rel(t);
        return [at3(from + ((to - from) * (k + 1)) / 4), dx, dy];
      });
    return {
      name: `this nation, standing firm: a place on the way ${i + 1}`,
      svg: someone(x, y, 1.4),
      keys: track({
        opacity: [
          [0.53, 0],
          [0.545, 1]
        ],
        xy: [[0.55, 0, 0], ...along(t0, t1, 0.55, 0.61), [0.85, ...rel(t1)] as [number, number, number], ...along(t1, t2, 0.85, 0.91)]
      })
    };
  });
  const greyOnes: [number, number][] = [
    [98, 92],
    [114, 83.4],
    [136, 98]
  ];
  // Where each grey line stops: short of the way, at the grey place's side of it.
  const short = greyOnes.map(([gx, gy]): [number, number] => {
    let best = wayAt(0);
    for (let k = 1; k <= 100; k += 1) {
      const p = wayAt(k / 100);
      if (Math.abs(p[0] - gx) < Math.abs(best[0] - gx)) best = p;
    }
    return [best[0], n(best[1] + (gy < best[1] ? -4.4 : 4.4))];
  });
  const shares = heap.map((p, i) => [n(five[i][0] + 2.6 - p[0]), n(five[i][1] + 1.2 - p[1])] as [number, number]);
  const wayPath = `M${WAY[0][0]} ${WAY[0][1]} C${WAY[1][0]} ${WAY[1][1]} ${WAY[2][0]} ${WAY[2][1]} ${WAY[3][0]} ${WAY[3][1]}`;
  return {
    kind: "understanding-the-religion",
    ms: 12000,
    parts: [
      ...daySky(128, 84, 12000),
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the masjid of Madinah", svg: madinahMasjid(4, 95, 0.75) },
      ...palms([
        [96, 88, 13],
        [148, 90, 12]
      ]),
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...five.map(([x, y], i): SignPart => ({ name: `the circle by him: a place ${i + 1}`, svg: someone(x, y, 1.6) })),
      { name: "his voice: when good is wanted for one", svg: arcs(n(his[0] + 2.6), n(his[1] - 3.8), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "good wanted for it: a soft golden ring about one place", svg: care(one[0], n(one[1] + 0.4), 3.2, 1.7, SOFT_GOLD), keys: showAt(0.05, 0.065), loop: soft },
      { name: "taught: a faint golden line from his place to that place", svg: lookLine(50.6, 98.6, 67, 101.4, 96), keys: showAt(0.19, 0.2) },
      { name: "understanding: a warm light in that place", svg: lightIn(one[0], one[1], 4.2), keys: showAt(0.21, 0.24), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      {
        name: "glints over that place",
        svg: glints(
          [
            [66.6, 98],
            [72.4, 97.6]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.26, 0.27),
        loop: twinkle(1200)
      },
      ...heap.map(
        ([x, y], i): SignPart => ({
          name: `he shares out: a small sack ${i + 1}`,
          svg: sack(x, y, 0.46),
          keys: track({
            xy: [
              [at3(0.36 + i * 0.01), 0, 0],
              [at3(0.39 + i * 0.01), shares[i][0], shares[i][1]]
            ]
          })
        })
      ),
      {
        name: "the giving: a soft golden glow over the shares",
        svg: five.map(([x, y]) => glow(n(x + 2.6), n(y - 0.2), 2.8, WARM, 0.3)).join(""),
        keys: showAt(0.43, 0.45),
        loop: soft
      },
      { name: "this nation: a golden way to the far horizon", svg: way(wayPath, GOLD), keys: showAt(0.52, 0.54) },
      ...nation,
      { name: "those who oppose them: grey places off the way", svg: greyOnes.map(([x, y]) => someone(x, y, 1.4, GREY)).join(""), keys: showFor(0.69, 0.7, 0.86, 0.89) },
      {
        name: "their grey voices",
        svg: arcsLeft(n(greyOnes[0][0] - 2), n(greyOnes[0][1] - 3.2), GREY) + arcsLeft(n(greyOnes[1][0] - 2), n(greyOnes[1][1] - 3.2), GREY) + arcs(n(greyOnes[2][0] + 2), n(greyOnes[2][1] - 3.2), GREY),
        keys: showFor(0.71, 0.72, 0.86, 0.89),
        loop: speaking
      },
      {
        name: "not harmed: faint grey lines that stop short of the way",
        svg: greyOnes.map(([x, y], i) => lookLine(x, n(y + (y < short[i][1] ? 1.8 : -1.8)), short[i][0], short[i][1], n((y + short[i][1]) / 2), GREY)).join(""),
        keys: showFor(0.73, 0.74, 0.86, 0.89)
      },
      { name: "unharmed: a soft golden line along the way", svg: `<path d="${wayPath}" stroke="${SOFT_GOLD}" stroke-width="2.4" fill="none" opacity="0.35" stroke-linecap="round"/>`, keys: showAt(0.76, 0.77), loop: soft },
      {
        name: "golden glints along the way",
        svg: glints([0.3, 0.5, 0.7, 0.9].map((t): [number, number] => wayAt(t)).map(([x, y]): [number, number] => [n(x + 1.4), n(y - 4)]), 1, "#FFD866"),
        keys: showAt(0.92, 0.94),
        loop: twinkle()
      }
    ],
    words: [
      { text: "He said: when Allah wants good for one,", from: 0.02, to: 0.17 },
      { text: "Allah makes him understand the religion", from: 0.185, to: 0.335 },
      { text: "I only share out, and Allah gives", from: 0.35, to: 0.5 },
      { text: "This nation will stay on Allah's command", from: 0.515, to: 0.665 },
      { text: "not harmed by those who oppose them", from: 0.68, to: 0.83 },
      { text: "until Allah's command comes", from: 0.845, to: 1 }
    ]
  };
}

/** A small basket heaped with earth, its foot's middle at (x, y). */
const basketOfEarth = (x: number, y: number) =>
  `<path d="M${n(x - 2)} ${n(y - 2)} L${n(x + 2)} ${n(y - 2)} L${n(x + 1.5)} ${y} L${n(x - 1.5)} ${y} Z" fill="#B08A52"/>` +
  `<path d="M${n(x - 1.8)} ${n(y - 1)} L${n(x + 1.8)} ${n(y - 1)}" stroke="#8E6C3C" stroke-width="0.3"/>` +
  `<ellipse cx="${x}" cy="${n(y - 2.2)}" rx="1.8" ry="0.8" fill="#8A6236"/>`;

// Earth from the Trench. Al-Bara said: on the day of the Confederates, when the Messenger of Allah ﷺ dug the trench, I
// saw him carrying earth out of the trench, until the dust hid him from me; and I heard him chanting the words of Ibn
// Rawahah as he carried the earth: O Allah, without You we would not have been guided, nor given in charity, nor
// prayed; so send calm down upon us, and make our feet firm if we meet them; they have wronged us, and if they want
// trial, we refuse. And he would draw out his voice at the end (Sahih al-Bukhari 4106). No one is drawn: Al-Bara's
// place by the land north of Madinah; its voice speaks. The trench is dug across the land, its earth heaped beyond it,
// and far off on the hills the tents of the Confederates show. By the trench, his place, a golden ring, and the places
// of those digging; baskets of earth go up out of the trench to the bank and back, twice, and dust rises about his
// place. His voice speaks, chanting, and a faint line goes from Al-Bara's place to it. A faint golden way goes to the
// masjid; a small sack shows, and sparks rise from the places. A soft calm glow comes about them on the ground, with
// soft golden rings at their feet. A grey ring comes about the Confederates' tents, and a faint golden line along the
// trench's near edge. Then his voice is drawn out, longer, with glints.
function earthFromTheTrench(): SignArt {
  const his: [number, number] = [62, 93.6];
  const others: [number, number][] = [
    [30, 94.2],
    [94, 94.4],
    [118, 93.8],
    [142, 94.4]
  ];
  const bara: [number, number] = [44, 104.4];
  const trench =
    `<path d="M0 84.4 L160 84.4 L160 90.4 L0 90.4 Z" fill="#7A5634"/>` +
    `<path d="M0 84.4 L160 84.4 L160 86.4 L0 86.4 Z" fill="#5E3F24"/>` +
    `<path d="M0 90.4 L160 90.4" stroke="#CDB283" stroke-width="0.8"/>` +
    [12, 34, 56, 78, 100, 122, 144].map((x) => `<ellipse cx="${x}" cy="83.4" rx="8" ry="2.4" fill="#C9A66B"/>`).join("");
  const tents: [number, number, number, number][] = [
    [112, 70.4, 7, 5],
    [122, 69.2, 8, 5.4],
    [133, 70.6, 7, 4.8],
    [144, 69.4, 8, 5.4],
    [153, 70.8, 6, 4.4]
  ];
  // A basket's trips: up out of the trench to the bank, and back, twice.
  const trips = (dx: number, dy: number, shift = 0) =>
    track({
      opacity: [
        [0.07, 0],
        [0.08, 1]
      ],
      xy: [
        [at3(0.15 + shift), 0, 0],
        [at3(0.165 + shift), dx, dy],
        [at3(0.18 + shift), 0, 0],
        [at3(0.195 + shift), dx, dy],
        [at3(0.21 + shift), 0, 0]
      ]
    });
  const all = [his, ...others];
  const longVoice = (x: number, y: number) =>
    [0, 1, 2, 3, 4]
      .map((i) => {
        const ax = n(x + i * 2.4);
        const h = 1.6 + i * 1;
        return `<path d="M${ax} ${n(y - h)} Q${n(ax + 1.6)} ${y} ${ax} ${n(y + h)}" stroke="${GOLD}" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="${n(1 - i * 0.12)}"/>`;
      })
      .join("");
  return {
    kind: "earth-from-the-trench",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#CFE6F5", "#E3CDA0", 61) },
      { name: "the sun", svg: sun(24, 20) },
      { name: "clouds", svg: cloud(70, 26, 0.42, "#FFFFFF", 0.9) + cloud(118, 18, 0.34, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "the hills", svg: hills("#B39A78") },
      { name: "the land", svg: plainLand("#E3CDA0") },
      { name: "far off: the masjid of Madinah", svg: madinahMasjid(2, 75.4, 0.34) },
      { name: "far off: the homes of Madinah", svg: home(26, 74.6, 8, 5.4) + home(36, 75.4, 7, 4.8, "#C99A66", "#B08452") },
      ...palms([[46, 75, 8]]),
      ...tents.map(([x, y, w, h], i): SignPart => ({ name: `the Confederates' camp: a tent ${i + 1}`, svg: tent(x, y, w, h, "#D9C9A8"), keys: showAt(at3(0.05 + i * 0.004), at3(0.055 + i * 0.004)) })),
      {
        name: "the trench, being dug, its earth heaped beyond it",
        svg: trench,
        origin: { x: 0, y: 87 },
        keys: track({
          scaleX: [
            [0.03, 0.25],
            [0.08, 1]
          ]
        })
      },
      { name: "Al-Bara's place", svg: someone(bara[0], bara[1], 1.5) },
      { name: "Al-Bara's voice", svg: arcsLeft(n(bara[0] - 2), n(bara[1] - 3.6), VOICE), keys: showFor(0.03, 0.04, 0.08, 0.09), loop: speaking },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      ...others.map(([x, y], i): SignPart => ({ name: `the diggers: a place ${i + 1}`, svg: someone(x, y, 1.4) })),
      { name: "his basket of earth", svg: basketOfEarth(66, 89.6), keys: trips(2, -7) },
      { name: "a basket of earth 2", svg: basketOfEarth(34, 89.8), keys: trips(1.6, -7, -0.004) },
      { name: "a basket of earth 3", svg: basketOfEarth(122, 89.6), keys: trips(-1.6, -7, 0.004) },
      { name: "the dust: a pale haze about his place", svg: wash(64, 90, 7, 4.4, "#D8C4A0", 0.3), keys: showAt(0.16, 0.18), loop: { move: "twinkle", ms: 1400, low: 0.6 } },
      {
        name: "his voice, chanting Ibn Rawahah's words",
        svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD),
        keys: track({
          opacity: [
            [0.28, 0],
            [0.29, 1],
            [0.9, 1],
            [0.93, 0]
          ]
        }),
        loop: speaking
      },
      { name: "heard: a faint line from Al-Bara's place to his voice", svg: lookLine(44.6, 102.2, 64, 91.4, 97, "#9A8A78"), keys: showAt(0.3, 0.31) },
      { name: "guided: a faint golden way to the masjid", svg: way("M58 92.6 C42 88 24 82 14 76.6", GOLD), keys: showAt(0.4, 0.43) },
      { name: "in charity: a small sack", svg: sack(80, 101.4, 0.5) + sparkle(83.2, 96.6, 0.8, "#FFD866"), keys: showAt(0.53, 0.54) },
      ...[his, others[1], others[2]].map(
        ([x, y], i): SignPart => ({ name: `prayed: a spark rising ${i + 1}`, svg: sparkle(n(x + 1.2), n(y - 4), 0.9, "#FFE7A0"), keys: sparkRising(at3(0.55 + i * 0.006), at3(0.575 + i * 0.006), 9) })
      ),
      { name: "calm: a soft pale glow about them on the ground", svg: wash(86, 95, 70, 5, "#F2F7FF", 0.16), keys: showAt(0.65, 0.68), loop: soft },
      { name: "made firm: soft golden rings beneath them", svg: all.map(([x, y]) => care(x, n(y + 1.6), 3, 1, SOFT_GOLD)).join(""), keys: showAt(0.69, 0.705), loop: soft },
      { name: "trial: a grey ring about the Confederates' tents", svg: greyRing(132, 68.6, 25, 4.6), keys: showAt(0.78, 0.795) },
      { name: "refused: a faint golden line along the trench's near edge", svg: `<path d="M0 91.6 L160 91.6" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.4 1" opacity="0.85"/>`, keys: showAt(0.81, 0.83) },
      { name: "his voice, drawn out at the end", svg: longVoice(n(his[0] + 2.4), n(his[1] - 3.6)), keys: showAt(0.9, 0.93), loop: speaking },
      {
        name: "glints over them",
        svg: glints(
          all.map(([x, y]): [number, number] => [n(x + 1.4), n(y - 4.4)]),
          0.9,
          "#FFD866"
        ),
        keys: showAt(0.945, 0.955),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Al-Bara: on the day of the Confederates", from: 0.02, to: 0.13 },
      { text: "he dug the trench; I saw him carry earth", from: 0.145, to: 0.255 },
      { text: "I heard him chant Ibn Rawahah's words:", from: 0.27, to: 0.38 },
      { text: "O Allah, without You we'd not be guided", from: 0.395, to: 0.505 },
      { text: "nor given in charity, nor prayed", from: 0.52, to: 0.63 },
      { text: "So send calm on us; make our feet firm", from: 0.645, to: 0.755 },
      { text: "and if they want trial, we refuse", from: 0.77, to: 0.88 },
      { text: "and he drew out his voice at the end", from: 0.895, to: 1 }
    ]
  };
}

/** Wavy lines of heat over (x, y). */
const heat = (x: number, y: number) =>
  [-3, 0, 3].map((dx) => `<path d="M${n(x + dx)} ${y} q0.8 -1 0 -2 q-0.8 -1 0 -2" stroke="#F2C46B" stroke-width="0.45" fill="none" opacity="0.8" stroke-linecap="round"/>`).join("");

/** A sheep of the picture cards, its feet's middle at (x, y). */
const sheepAt = (x: number, y: number, s = 0.12, left = false) => animalAt("sheep", n(x - 50 * s), n(y - 73.4 * s), s, left);

// Whoever is not merciful. Jarir ibn Abdullah said that the Prophet ﷺ said: whoever is not merciful to others will not
// be shown mercy (Sahih al-Bukhari 6013). No one is drawn: by the masjid of Madinah, his place, a golden ring, and Jarir's
// place; his voice speaks, and a faint line goes from Jarir's place to his. Along the road, under the hot sun, a thirsty
// sheep stands by an empty bowl, a grey ring about it. Two places come along the road. The first passes the sheep by,
// and a grey ring comes about it. The second stops by the sheep; a jug by it goes to the bowl, and the bowl fills; the
// sheep steps to it and drinks, its grey ring goes, a glint shows over it, and a soft golden ring comes about the second
// place. Then a grey haze comes about the first place, and grey heat over it; a warm glow comes about the second, a soft
// golden glow over it and the sheep, and glints.
function whoIsNotMerciful(): SignArt {
  const his: [number, number] = [32, 99.6];
  const jarir: [number, number] = [42, 101.4];
  const sheep: [number, number] = [100, 98.8];
  const bowl: [number, number] = [87, 99.6];
  const first: [number, number] = [150, 104.6];
  const firstEnd: [number, number] = [60, 104.6];
  const second: [number, number] = [156, 101.4];
  const secondEnd: [number, number] = [80, 101.6];
  return {
    kind: "who-is-not-merciful",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C9E4F6", "#F3E3C0", 62) },
      { name: "the hot sun", svg: sun(112, 18) + glow(112, 18, 16, "#FFE07A", 0.1), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "a cloud", svg: cloud(56, 26, 0.45, "#FFFFFF", 0.85), loop: { move: "slide", ms: 9000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: plainLand() },
      { name: "the road", svg: `<path d="M0 101.4 Q80 99.8 160 101 L160 107.8 Q80 106.4 0 108 Z" fill="#EEDCAE"/>` },
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 96, 0.5) },
      ...palms([[140, 92, 12]]),
      { name: "the heat: wavy lines over the land", svg: heat(n(sheep[0] + 1), 92) + heat(128, 90), loop: { move: "twinkle", ms: 1200, low: 0.4 } },
      { name: "his place, a golden ring", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "Jarir ibn Abdullah's place", svg: someone(jarir[0], jarir[1], 1.5) },
      { name: "his voice: whoever is not merciful", svg: arcs(n(his[0] + 2.4), n(his[1] - 3.6), GOLD), keys: showAt(0.03, 0.04), loop: speaking },
      { name: "Jarir heard him: a faint line from Jarir's place to his", svg: lookLine(40.4, 100, 34.6, 98.6, 96.4, "#9A8A78"), keys: showAt(0.07, 0.09) },
      { name: "an empty bowl", svg: `<path d="M${n(bowl[0] - 3.2)} ${n(bowl[1] - 1.3)} Q${bowl[0]} ${n(bowl[1] + 1.3)} ${n(bowl[0] + 3.2)} ${n(bowl[1] - 1.3)} Z" fill="#9A7A52"/>` },
      {
        name: "a thirsty sheep",
        svg: sheepAt(sheep[0], sheep[1], 0.17, true),
        keys: track({
          xy: [
            [0.54, 0, 0],
            [0.57, -3.6, 0]
          ]
        }),
        origin: { x: sheep[0], y: sheep[1] },
        loop: { move: "bob", ms: 1800, y: -0.3 }
      },
      { name: "thirsty: a grey ring about the sheep", svg: greyRing(sheep[0], n(sheep[1] - 5.4), 9.6, 7.4), keys: track({ opacity: [[0.54, 1], [0.555, 0]] }) },
      {
        name: "the first place on the road",
        svg: someone(first[0], first[1], 1.5),
        keys: track({
          xy: [
            [0.35, 0, 0],
            [0.42, n((sheep[0] + 6 - first[0]) * 1), 0],
            [0.5, n(firstEnd[0] - first[0]), n(firstEnd[1] - first[1])]
          ]
        })
      },
      { name: "not merciful: a grey ring about the first place", svg: greyRing(firstEnd[0], n(firstEnd[1] + 0.4), 3.2, 1.7), keys: showAt(0.505, 0.515) },
      {
        name: "the second place on the road",
        svg: someone(second[0], second[1], 1.5),
        keys: track({
          xy: [
            [0.38, 0, 0],
            [0.46, n(secondEnd[0] - second[0]), n(secondEnd[1] - second[1])]
          ]
        })
      },
      {
        name: "a jug of water by the second place",
        svg: bigger(n(secondEnd[0] + 3.6), n(secondEnd[1] + 0.6), 1.3, jug(n(secondEnd[0] + 3.6), n(secondEnd[1] + 0.6))),
        keys: track({
          opacity: [
            [0.47, 0],
            [0.48, 1]
          ],
          xy: [
            [0.48, 0, 0],
            [0.505, n(bowl[0] - 4.6 - secondEnd[0] - 3.6), n(bowl[1] - 0.4 - secondEnd[1] - 0.6)]
          ]
        })
      },
      { name: "water in the bowl", svg: `<ellipse cx="${bowl[0]}" cy="${n(bowl[1] - 1.3)}" rx="3" ry="0.6" fill="#6FC3EC"/>`, keys: showAt(0.51, 0.525), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "it drinks: a glint over the sheep", svg: sparkle(n(sheep[0] - 5), n(sheep[1] - 15), 1.1, "#FFD866"), keys: showAt(0.58, 0.59), loop: twinkle(1200) },
      { name: "merciful: a soft golden ring about the second place", svg: care(secondEnd[0], n(secondEnd[1] + 0.4), 2.8, 1.5, SOFT_GOLD), keys: showAt(0.59, 0.605), loop: soft },
      { name: "not shown mercy: a grey haze about the first place", svg: wash(firstEnd[0], firstEnd[1], 5, 3.4, GREY, 0.2), keys: showAt(0.7, 0.73) },
      {
        name: "the heat on it: grey strokes over the first place",
        svg: [-2.2, 0, 2.2]
          .map((dx, i) => `<path d="M${n(firstEnd[0] + dx)} ${n(firstEnd[1] - 4.4 + (i % 2) * 0.6)} q0.8 1 0 2" stroke="${GREY}" stroke-width="0.6" fill="none" stroke-linecap="round"/>`)
          .join(""),
        keys: showAt(0.74, 0.76)
      },
      { name: "shown mercy: a warm glow about the second place", svg: glow(secondEnd[0], secondEnd[1], 5, WARM, 0.3), keys: showAt(0.8, 0.82) },
      { name: "a soft golden glow over it and the sheep", svg: wash(90, 99.4, 16, 6, WARM, 0.14), keys: showAt(0.84, 0.86), loop: soft },
      {
        name: "glints over them",
        svg: glints(
          [
            [77.4, 96.8],
            [82.6, 96.4],
            [95, 83.4]
          ],
          1,
          "#FFD866"
        ),
        keys: showAt(0.88, 0.89),
        loop: twinkle()
      }
    ],
    words: [
      { text: "Jarir ibn Abdullah heard him say:", from: 0.02, to: 0.33 },
      { text: "Whoever is not merciful to others", from: 0.345, to: 0.655 },
      { text: "will not be shown mercy", from: 0.67, to: 1 }
    ]
  };
}

export const PLEASED_ART = {
  "never-angry-again": neverAngryAgain,
  "ninety-nine-names": ninetyNineNames,
  "the-best-of-women": theBestOfWomen,
  "as-much-as-you-can": asMuchAsYouCan,
  "understanding-the-religion": understandingTheReligion,
  "earth-from-the-trench": earthFromTheTrench,
  "who-is-not-merciful": whoIsNotMerciful
};
