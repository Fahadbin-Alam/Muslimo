import { cloud, glow, n, nightSky, peaks, sky, stars, tuft, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { cover, GREY, prayerMat } from "./lovedArt";
import { dish } from "./worthArt";
import { risingSparks } from "./charityArt";
import { kabah } from "./historyArt";
import { EVENING } from "./heartArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { camel, care, goldCoin, LIGHT, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { lookLine } from "./truthArt";

/**
 * The prayer and the ways of worship, drawn as the scenes of good ways with people are (waysArt.ts): the rows made
 * straight, his recitation of at-Tin in the Isha prayer, the easy religion and the steady way through it, three things
 * he advised, the one from Najd who asked about Islam, the greatest surah, and Umar at the Black Stone. Only the land,
 * the sky, buildings, things and plants are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand
 * or a face: where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice
 * is arcs in the air. No page of the Quran is drawn: its words are lights. Nothing is drawn for Allah, and nothing comes
 * down from the sky: a prayer or a deed is a spark that rises.
 */

/** A long mat for a row of prayer, from x1 to x2, under places whose middle is at y (dimmer at night). */
const rowMat = (y: number, x1 = 44, x2 = 116, fill = "#E9D7A6", line = "#C9A866") =>
  `<rect x="${x1}" y="${n(y - 1.6)}" width="${n(x2 - x1)}" height="3.8" rx="0.6" fill="${fill}"/>` +
  `<rect x="${n(x1 + 1)}" y="${n(y - 0.9)}" width="${n(x2 - x1 - 2)}" height="2.4" rx="0.4" stroke="${line}" stroke-width="0.4" fill="none"/>`;

/** A straight golden line along the front of a row whose places' middle is at y. */
const straightLine = (y: number, x1 = 46, x2 = 114) =>
  `<path d="M${x1} ${n(y + 2.1)} L${x2} ${n(y + 2.1)}" stroke="#FFF3C0" stroke-width="1.6" stroke-linecap="round" opacity="0.5"/>` +
  `<path d="M${x1} ${n(y + 2.1)} L${x2} ${n(y + 2.1)}" stroke="${GOLD}" stroke-width="0.6" stroke-linecap="round"/>`;

/** A dark land at night, from y `top` down, with a few tufts. */
const nightLand = (top: number, tufts: [number, number][]) =>
  `<rect y="${top}" width="160" height="${120 - top}" fill="#2E3556"/><path d="M0 ${top} L160 ${top}" stroke="#454B6A" stroke-width="0.7"/>` +
  tufts.map(([x, y]) => tuft(x, y, "#454B6A", 3.4)).join("");

/** A fig tree, its foot at (x, y), `s` times its size: broad dark leaves and purple figs. */
const figTree = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y} L${n(x - 0.4 * s)} ${n(y - 9 * s)}" stroke="#7A5A3A" stroke-width="${n(1.6 * s)}" stroke-linecap="round"/>` +
  `<circle cx="${n(x - 4 * s)}" cy="${n(y - 10.6 * s)}" r="${n(4.6 * s)}" fill="#3F7F35"/><circle cx="${n(x + 3.8 * s)}" cy="${n(y - 11.2 * s)}" r="${n(4.4 * s)}" fill="#4A8C3C"/>` +
  `<circle cx="${n(x - 0.2 * s)}" cy="${n(y - 15.2 * s)}" r="${n(4.6 * s)}" fill="#559B45"/>` +
  (
    [
      [-4.2, -8.6],
      [2.8, -9.4],
      [-1.2, -12.6],
      [3.4, -14.4],
      [-3.6, -14.8]
    ] as [number, number][]
  )
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" rx="${n(1 * s)}" ry="${n(1.2 * s)}" fill="#7B3F6E"/>`)
    .join("");

/** An olive tree, its foot at (x, y), `s` times its size: grey-green leaves and small dark olives. */
const oliveTree = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y} L${n(x + 0.4 * s)} ${n(y - 10 * s)}" stroke="#7A5A3A" stroke-width="${n(1.6 * s)}" stroke-linecap="round"/>` +
  `<circle cx="${n(x - 3.4 * s)}" cy="${n(y - 11 * s)}" r="${n(4.4 * s)}" fill="#7F9A5A"/><circle cx="${n(x + 3.6 * s)}" cy="${n(y - 12 * s)}" r="${n(4 * s)}" fill="#8AA664"/>` +
  `<circle cx="${n(x + 0.2 * s)}" cy="${n(y - 15.4 * s)}" r="${n(4.2 * s)}" fill="#94AE6C"/>` +
  (
    [
      [-4, -9.6],
      [-2, -12.4],
      [2.6, -10.8],
      [4.6, -13],
      [0.8, -16.4],
      [-3, -15.6]
    ] as [number, number][]
  )
    .map(([dx, dy]) => `<ellipse cx="${n(x + dx * s)}" cy="${n(y + dy * s)}" rx="${n(0.7 * s)}" ry="${n(0.9 * s)}" fill="#3F4A22"/>`)
    .join("");

/** The window of a home (trialArt.ts), lit. */
const litWindow = (x: number, y: number, h: number) => {
  const [wx, wy] = [n(x + 2), n(y - h + 2.4)];
  return `${glow(n(wx + 1.3), n(wy + 1.3), 4, "#FFD866", 0.18)}<rect x="${wx}" y="${wy}" width="2.6" height="2.6" fill="#FFD866"/>`;
};

/** A night over the sky, from the top down to y 62. */
const NIGHT_OVER_SKY = `<rect width="160" height="62" fill="#16284C"/><rect width="160" height="34" fill="#0F1C3A"/>`;

/** The night over the land: a dark veil from y 62 down. */
const NIGHT_OVER_LAND = `<rect y="62" width="160" height="58" fill="#0F1C3A" opacity="0.42"/>`;

/** A voice that comes and goes in faint broken arcs from (x, y), facing right: heard, but not made out. */
const humArcs = (x: number, y: number) =>
  [0, 1, 2]
    .map((i) => {
      const ax = n(x + i * 2.2);
      const h = 1.6 + i * 1.1;
      return `<path d="M${ax} ${n(y - h)} Q${n(ax + h * 0.7)} ${y} ${ax} ${n(y + h)}" stroke="#B9AC9A" stroke-width="0.8" stroke-dasharray="0.7 1" fill="none" stroke-linecap="round"/>`;
    })
    .join("");

/** A small golden light, its middle at (x, y). */
const goldLight = (x: number, y: number, r = 1.8) => glow(x, y, n(r * 2), WARM, 0.3) + sparkle(x, y, r, "#E8A93A");

/** A dashed golden ring about (x, y): something one may do of one's own will, beyond what is due. */
const extraRing = (x: number, y: number, r = 2.4) =>
  `<circle cx="${x}" cy="${y}" r="${r}" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1 0.9" fill="#FFFFFF" fill-opacity="0.25"/>`;

/** A soft band in the air, from (x, y), `w` wide and `h` high. */
const band = (x: number, y: number, w: number, h: number) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#FFFFFF" opacity="0.4"/>`;

/** The Black Stone in its silver frame, its middle at (x, y). */
const blackStoneAt = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="2.3" ry="2.9" fill="#D7DBE0" stroke="#A3AAB3" stroke-width="0.4"/>` +
  `<ellipse cx="${x}" cy="${n(y + 0.1)}" rx="1.4" ry="1.9" fill="#1C1616"/><circle cx="${n(x - 0.4)}" cy="${n(y - 0.6)}" r="0.35" fill="#5A4E4E"/>`;

/** A grey mark of harm, its middle at (x, y). */
const harmMark = (x: number, y: number) =>
  `<path d="M${n(x - 2.4)} ${n(y + 0.8)} L${n(x - 1.2)} ${n(y - 1.2)} L${x} ${n(y + 0.8)} L${n(x + 1.2)} ${n(y - 1.2)} L${n(x + 2.4)} ${n(y + 0.8)}" stroke="${GREY}" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A grey stroke across (x, y): struck out. */
const struckOut = (x: number, y: number) => `<path d="M${n(x - 3.2)} ${n(y + 3)} L${n(x + 3.2)} ${n(y - 3)}" stroke="${GREY}" stroke-width="0.8" stroke-linecap="round"/>`;

// Straight rows. Anas ibn Malik said: the Prophet ﷺ said: straighten your rows, for straightening the rows is part of
// establishing the prayer (Sahih al-Bukhari 723). No one is drawn: before the masjid in Madinah, his place is a golden
// ring, and two rows of places stand behind it on their mats, out of line, some ahead and some behind. His voice
// speaks, and the places of the first row move into one straight line, and a golden line shows along it; his voice
// speaks again, and the second row comes straight too, with its golden line. Then a warm wash comes over the rows,
// their prayer rises in sparks, and a ring of care comes about them.
function straightRows(): SignArt {
  const his: [number, number] = [80, 90.6];
  const xs = [52, 60, 68, 76, 84, 92, 100, 108];
  const first = 97;
  const second = 104.4;
  // How far each place stood out of line before the rows were made straight: across, and ahead or behind.
  const firstOff: [number, number][] = [
    [-1.6, 1.4],
    [0.8, -1.6],
    [-0.6, 0.6],
    [1.2, -0.8],
    [0, 1.8],
    [-1, -1.2],
    [1.4, 0.4],
    [0.6, -1.8]
  ];
  const secondOff: [number, number][] = [
    [1, -1.2],
    [-1.2, 1.6],
    [0.6, -0.4],
    [-0.8, 1.2],
    [1.6, -1.8],
    [0.4, 0.8],
    [-1, -1.4],
    [-0.6, 1]
  ];
  const row = (label: string, y: number, off: [number, number][], from: number, to: number) =>
    xs.map(
      (x, i): SignPart => ({
        name: `a place in the ${label} row ${i + 1}`,
        svg: someone(x, y, 1.4),
        keys: track({
          xy: [
            [from, off[i][0], off[i][1]],
            [to, 0, 0]
          ]
        })
      })
    );
  const voice = (name: string, from: number, gone: number): SignPart => ({
    name,
    svg: arcs(n(his[0] + 3.2), n(his[1] - 2), VOICE),
    keys: showWhile(from, at3(from + 0.01), at3(gone - 0.01), gone),
    loop: { move: "twinkle", ms: 900, low: 0.5 }
  });
  return {
    kind: "straight-rows",
    ms: 9000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(134, 20) },
      { name: "clouds", svg: cloud(46, 24, 0.32, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [12, 94, 15],
        [148, 93, 14]
      ]),
      { name: "the masjid", svg: madinahMasjid(56, 86, 1) },
      { name: "the mat of the first row", svg: rowMat(first) },
      { name: "the mat of the second row", svg: rowMat(second) },
      { name: "a golden ring, his place before the rows", svg: ring(his[0], his[1], 2.4, GOLD) },
      voice("his voice: straighten your rows", 0.03, 0.26),
      ...row("first", first, firstOff, 0.07, 0.15),
      { name: "the first row made straight: a golden line along it", svg: straightLine(first), keys: showFrom(0.15, 0.18) },
      voice("his voice: straightening the rows", 0.33, 0.51),
      ...row("second", second, secondOff, 0.36, 0.44),
      { name: "the second row made straight: a golden line along it", svg: straightLine(second), keys: showFrom(0.44, 0.47) },
      { name: "the prayer established: a warm wash over the rows", svg: wash(80, 100.6, 40, 8, WARM, 0.14), keys: showFrom(0.59, 0.64), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...risingSparks(
        "the prayer of the rows, rising",
        [
          [60, 88],
          [80, 86],
          [100, 88]
        ],
        0.66,
        0.012,
        { stay: true, rise: 10 }
      ),
      { name: "a ring of care about the rows", svg: care(80, 100.6, 40, 8), keys: showFrom(0.8, 0.85) }
    ],
    words: [
      { text: "Straighten your rows", from: 0.02, to: 0.3 },
      { text: "For straightening the rows", from: 0.32, to: 0.55 },
      { text: "Is part of establishing the prayer", from: 0.57, to: 1 }
    ]
  };
}

// The sweetest recitation. Al-Bara said: I heard the Prophet ﷺ recite By the fig and the olive in the Isha prayer, and I
// never heard anyone with a finer voice or recitation than him (Sahih al-Bukhari 769); he was on a journey, al-Bara
// tells in another narration (Sahih al-Bukhari 767). No one is drawn: the last light of the evening goes, and it is
// night over a camp of travelers, its tents and a resting camel; his place is a golden ring before a row of places,
// and his voice recites in golden arcs; it reaches al-Bara's place in the row, and a soft warmth comes on it. A fig tree
// and an olive tree show softly on either side, as the ayah names them. The row prays, a warm glow over it, and its
// prayer rises in sparks. Then his voice grows and glows, a soft golden wash fills the night over the row, and a warm
// light comes in al-Bara's place.
function sweetestRecitation(): SignArt {
  const his: [number, number] = [80, 94];
  const xs = [62, 68, 74, 80, 86, 92, 98];
  const rowY = 101.6;
  const bara: [number, number] = [92, rowY];
  const voiceAt: [number, number] = [his[0], n(his[1] - 1.8)];
  return {
    kind: "sweetest-recitation",
    ms: 10000,
    parts: [
      { name: "the night sky", svg: nightSky(90) },
      {
        name: "the last light of the evening, going",
        svg: `<rect y="58" width="160" height="32" fill="#D98C5F" opacity="0.45"/><rect y="74" width="160" height="16" fill="#F0B27A" opacity="0.45"/>`,
        keys: track({
          opacity: [
            [0.03, 1],
            [0.1, 0]
          ]
        })
      },
      {
        name: "stars",
        svg: stars([
          [8, 14],
          [22, 30],
          [38, 16],
          [54, 34],
          [70, 14],
          [96, 24],
          [112, 12],
          [148, 18],
          [12, 52],
          [150, 48],
          [44, 58],
          [116, 60]
        ]),
        keys: track({
          opacity: [
            [0.04, 0.4],
            [0.1, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "the moon", svg: `${glow(132, 32, 7, "#FFF3C4", 0.08)}${crescent(132, 32, 4, 1.4, "#FFF3C4")}` },
      {
        name: "the land",
        svg: nightLand(90, [
          [16, 112],
          [144, 112],
          [36, 96],
          [124, 96]
        ])
      },
      { name: "tents of the travelers at night", svg: `<g opacity="0.8">${tent(50, 91, 16, 10) + tent(68, 90, 12, 8) + tent(112, 91, 16, 10)}</g>` },
      { name: "a camel, resting by the tents", svg: `<g opacity="0.8">${camel(94, 92, 0.15)}</g>` },
      { name: "a fig tree, as the ayah names it", svg: glow(20, 88, 14, "#FFF3C4", 0.1) + figTree(20, 102, 1.1), keys: showFrom(0.27, 0.31) },
      { name: "an olive tree, as the ayah names it", svg: glow(140, 88, 14, "#FFF3C4", 0.1) + oliveTree(140, 102, 1.1), keys: showFrom(0.33, 0.37) },
      { name: "the mat of the row", svg: rowMat(rowY, 56, 104, "#5E5848", "#7A705A") },
      { name: "a golden ring, his place before the row", svg: ring(his[0], his[1], 2.4, GOLD) },
      ...xs.map((x, i): SignPart => ({ name: x === bara[0] ? "al-Bara's place, in the row" : `a place in the row ${i + 1}`, svg: someone(x, rowY, 1.4, LIGHT) })),
      {
        name: "his voice, reciting: golden arcs",
        svg: arcs(n(voiceAt[0] + 3.2), voiceAt[1], "#FFD866") + arcsLeft(n(voiceAt[0] - 3.2), voiceAt[1], "#FFD866"),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.05, 1]
          ],
          scale: [
            [0.77, 1],
            [0.83, 1.3]
          ]
        }),
        origin: { x: voiceAt[0], y: voiceAt[1] },
        loop: { move: "twinkle", ms: 1100, low: 0.6 }
      },
      { name: "the recitation reaching al-Bara's place: a soft warmth", svg: glow(bara[0], bara[1], 4, WARM, 0.22), keys: showFrom(0.09, 0.14), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "the row at the Isha prayer: a warm glow over it", svg: wash(80, 101, 26, 5, WARM, 0.16), keys: showFrom(0.52, 0.57), loop: { move: "twinkle", ms: 1600, low: 0.75 } },
      ...risingSparks(
        "the prayer of the row, rising",
        [
          [66, 92],
          [80, 86],
          [94, 92]
        ],
        0.58,
        0.012,
        { stay: true, rise: 10 }
      ),
      { name: "the finest voice: a golden glow about it", svg: glow(voiceAt[0], voiceAt[1], 10, "#FFD866", 0.16), keys: showFrom(0.78, 0.84), loop: { move: "twinkle", ms: 1500, low: 0.75 } },
      { name: "the recitation filling the night: a soft golden wash", svg: wash(80, 90, 70, 22, "#FFE7A0", 0.06), keys: showFrom(0.84, 0.9), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "a warm light in al-Bara's place", svg: lightIn(bara[0], bara[1], 3.6), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1500, low: 0.75 } }
    ],
    words: [
      { text: "Al-Bara: I heard him recite", from: 0.02, to: 0.23 },
      { text: "By the fig and the olive", from: 0.25, to: 0.48 },
      { text: "In the Isha prayer", from: 0.5, to: 0.73 },
      { text: "I never heard a finer voice or recitation", from: 0.75, to: 1 }
    ]
  };
}

// The religion is easy. Abu Hurairah said: the Prophet ﷺ said: the religion is easy, and no one overdoes it in the
// religion but it overcomes him. So aim for what is right, come as close to it as you can, and be glad; and seek help in
// it in the morning, in the evening and in a little of the night (Sahih al-Bukhari 39). No one is drawn: a road runs
// across the land to a soft light at its end. A place sets out along it, steady. Another, grey, rushes on ahead, grey
// loads piling on it one after another, until it slows and stops, a grey shade over it, and grows faint. A golden line
// shows from the steady place to the light at the road's end; the place goes closer, a spark of gladness rises from it,
// and a warm light comes in it. The morning glows and it goes on; the evening comes, the sun goes low, and it goes on
// again; then night comes with its stars and moon, it goes on a little more, the light at the road's end grows, and a
// ring of care comes about it.
function easyReligion(): SignArt {
  const lane = 101.4;
  const fastLane = 97.6;
  const start = 14;
  const steady: [number, number, number][] = [
    [0.05, 0, 0],
    [0.13, 20, 0],
    [0.23, 20, 0],
    [0.33, 30, 0],
    [0.44, 30, 0],
    [0.48, 44, 0],
    [0.62, 44, 0],
    [0.66, 64, 0],
    [0.7, 64, 0],
    [0.74, 84, 0],
    [0.85, 84, 0],
    [0.89, 96, 0]
  ];
  const rushing: [number, number, number][] = [
    [0.22, 0, 0],
    [0.26, 50, 0],
    [0.3, 60, 0]
  ];
  const faint: [number, number][] = [
    [0.3, 1],
    [0.34, 0.4]
  ];
  const goal: [number, number] = [148, 99.4];
  return {
    kind: "easy-religion",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the evening sky",
        svg: EVENING,
        keys: track({
          opacity: [
            [0.68, 0],
            [0.71, 1]
          ]
        })
      },
      {
        name: "the morning: a soft glow low in the east",
        svg: wash(24, 60, 56, 22, "#FFCF8E", 0.3),
        keys: track({
          opacity: [
            [0.59, 0],
            [0.62, 1],
            [0.67, 1],
            [0.69, 0]
          ]
        })
      },
      {
        name: "the sun",
        svg: sun(36, 24),
        keys: track({
          xy: [
            [0.68, 0, 0],
            [0.72, 96, 26]
          ],
          opacity: [
            [0.81, 1],
            [0.83, 0]
          ]
        })
      },
      { name: "clouds", svg: cloud(96, 22, 0.34, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "the night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.81, 0],
            [0.85, 0.95]
          ]
        })
      },
      {
        name: "stars of the night",
        svg: stars([
          [10, 14],
          [26, 30],
          [44, 12],
          [62, 26],
          [84, 14],
          [104, 32],
          [140, 14],
          [152, 34],
          [18, 48],
          [74, 46]
        ]),
        keys: track({
          opacity: [
            [0.83, 0],
            [0.86, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the moon of the night",
        svg: `${glow(122, 26, 7, "#FFF3C4", 0.08)}${crescent(122, 26, 4, 1.4, "#FFF3C4")}`,
        keys: track({
          opacity: [
            [0.83, 0],
            [0.86, 1]
          ]
        })
      },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      {
        name: "the road across the land",
        svg:
          `<path d="M0 95.2 L142 95.2 Q147 95.2 147 99.4 Q147 103.6 142 103.6 L0 103.6 Z" fill="#E9D9B0"/>` +
          `<path d="M0 95.2 L142 95.2 M0 103.6 L142 103.6" stroke="#D2BE8E" stroke-width="0.5"/>`
      },
      {
        name: "the night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.81, 0],
            [0.85, 1]
          ]
        })
      },
      {
        name: "a soft light at the road's end",
        svg: glow(goal[0], goal[1], 9, "#FFF3C4", 0.22) + `<circle cx="${goal[0]}" cy="${goal[1]}" r="2.2" fill="#FFF8E6"/>`,
        keys: track({
          scale: [
            [0.9, 1],
            [0.94, 1.3]
          ]
        }),
        origin: { x: goal[0], y: goal[1] },
        loop: { move: "twinkle", ms: 1800, low: 0.75 }
      },
      {
        name: "a steady place on the road",
        svg: someone(start, lane, 1.5),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: steady
        })
      },
      {
        name: "a grey place, rushing on ahead",
        svg: someone(start, fastLane, 1.5, GREY),
        keys: track({
          opacity: [
            [0.21, 0],
            [0.22, 1],
            ...faint
          ],
          xy: rushing
        })
      },
      ...[0, 1, 2].map(
        (i): SignPart => ({
          name: `a grey load piled on it ${i + 1}`,
          svg: sack(start, n(fastLane - 1.8 - 3 * i), 0.42, "#9A918A"),
          keys: track({
            opacity: [
              [at3(0.235 + 0.02 * i), 0],
              [at3(0.245 + 0.02 * i), 1],
              ...faint
            ],
            xy: rushing
          })
        })
      ),
      { name: "overcome: a grey shade over it", svg: wash(n(start + 60), n(fastLane - 3), 9, 8, GREY, 0.12), keys: showFrom(0.29, 0.33) },
      {
        name: "aiming right: a golden line to the light",
        svg: `<path d="M${n(start + 33)} ${lane} L${n(goal[0] - 6)} ${lane}" stroke="${GOLD}" stroke-width="0.6" stroke-dasharray="1.6 1.2" stroke-linecap="round"/>`,
        keys: showFrom(0.41, 0.44)
      },
      { name: "glad tidings: a spark rising from it", svg: sparkle(n(start + 44), n(lane - 3), 1.8, "#FFE7A0"), keys: sparkRising(0.48, 0.53, 10), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "a warm light in the steady place",
        svg: lightIn(start, lane, 3.4),
        keys: track({
          opacity: [
            [0.5, 0],
            [0.53, 1]
          ],
          xy: steady
        }),
        loop: { move: "twinkle", ms: 1500, low: 0.75 }
      },
      { name: "a ring of care about it", svg: care(n(start + 96), n(lane + 0.4), 4.6, 2.8), keys: showFrom(0.92, 0.95) }
    ],
    words: [
      { text: "The religion is easy", from: 0.02, to: 0.19 },
      { text: "No one overdoes it but it overcomes him", from: 0.21, to: 0.38 },
      { text: "So aim right, come close, and be glad", from: 0.4, to: 0.57 },
      { text: "Seek help in the morning and the evening", from: 0.59, to: 0.78 },
      { text: "And in a little of the night", from: 0.8, to: 1 }
    ]
  };
}

// Three things to keep. Abu Hurairah said: my close friend ﷺ advised me of three things: fasting three days of every
// month, two rak'ahs of Duha, and that I pray witr before I sleep (Sahih al-Bukhari 1981). No one is drawn: his place is
// a golden ring, and the place of the one he advised stands near it, before a home. His voice speaks, and three golden
// lights show, one after another. The months show across the sky as crescents, the first light goes up to them, and
// under each, three small lights come on, month after month; a covered dish shows by the home: the fast. The sun climbs
// to the forenoon, the place goes to a mat with the second light, and two lights rise from it, one and then the other.
// Then night comes with its stars, a window of the home is lit, the third light goes to it, and the place goes in; one
// light rises from the home for the witr, the window's light grows soft for sleep, and a soft light stays about the
// home.
function threeThings(): SignArt {
  const his: [number, number] = [30, 102.6];
  const advised: [number, number] = [46, 102.4];
  const mat: [number, number] = [86, 104];
  const homeAt: [number, number, number, number] = [124, 104, 26, 18];
  const door: [number, number] = [122.2, 101];
  const windowAt: [number, number] = [127.3, 89.7];
  const months = [60, 76, 92, 108, 124, 140];
  const lights: [number, number][] = [
    [40, 94],
    [46, 91],
    [52, 94]
  ];
  const lightAt = (i: number) => at3(0.07 + 0.03 * i);
  return {
    kind: "three-things-to-keep",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      {
        name: "the sun",
        svg: sun(16, 52),
        keys: track({
          xy: [
            [0.51, 0, 0],
            [0.58, 14, -24]
          ],
          opacity: [
            [0.76, 1],
            [0.78, 0]
          ]
        })
      },
      { name: "the months across the sky: crescents", svg: band(50, 16, 100, 20) + months.map((x) => crescent(x, 23, 2.6, 1, "#E9C766")).join(""), keys: showFrom(0.26, 0.3) },
      ...months.map(
        (x, i): SignPart => ({
          name: `three days of a month, fasted ${i + 1}`,
          svg: [-2.6, 0, 2.6].map((dx) => `<circle cx="${n(x + dx)}" cy="31" r="0.9" fill="${GOLD}"/>`).join(""),
          keys: showFrom(at3(0.3 + 0.018 * i), at3(0.31 + 0.018 * i))
        })
      ),
      {
        name: "the night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.76, 0],
            [0.8, 0.95]
          ]
        })
      },
      {
        name: "stars of the night",
        svg: stars([
          [10, 14],
          [28, 30],
          [46, 12],
          [66, 28],
          [88, 14],
          [106, 30],
          [126, 12],
          [146, 28],
          [20, 50],
          [140, 52]
        ]),
        keys: track({
          opacity: [
            [0.78, 0],
            [0.81, 1]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      {
        name: "the moon of the night",
        svg: `${glow(40, 30, 7, "#FFF3C4", 0.08)}${crescent(40, 30, 4, 1.4, "#FFF3C4")}`,
        keys: track({
          opacity: [
            [0.78, 0],
            [0.81, 1]
          ]
        })
      },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "a home", svg: home(...homeAt) },
      { name: "a prayer mat", svg: prayerMat(mat[0], mat[1]) },
      { name: "a dish, covered: the fast", svg: dish(104, 107) + cover(104, 105.6), keys: showFrom(0.28, 0.31) },
      {
        name: "the night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.76, 0],
            [0.8, 1]
          ]
        })
      },
      {
        name: "a lit window of the home",
        svg: litWindow(homeAt[0], homeAt[1], homeAt[3]),
        keys: track({
          opacity: [
            [0.79, 0],
            [0.81, 1],
            [0.92, 1],
            [0.94, 0.35]
          ]
        }),
        loop: { move: "twinkle", ms: 1800, low: 0.8 }
      },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his voice: he advised me of three", svg: arcs(n(his[0] + 3), n(his[1] - 2), VOICE), keys: showWhile(0.03, 0.04, 0.18, 0.19), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "the place of the one he advised",
        svg: someone(advised[0], advised[1], 1.5),
        keys: track({
          xy: [
            [0.52, 0, 0],
            [0.57, n(mat[0] - advised[0]), 0.2],
            [0.8, n(mat[0] - advised[0]), 0.2],
            [0.85, n(door[0] - advised[0]), n(door[1] - advised[1])]
          ],
          opacity: [
            [0.85, 1],
            [0.87, 0]
          ]
        })
      },
      {
        name: "the first of the three: a golden light",
        svg: goldLight(lights[0][0], lights[0][1]),
        keys: track({
          opacity: [
            [lightAt(0), 0],
            [at3(lightAt(0) + 0.01), 1],
            [0.3, 1],
            [0.32, 0]
          ],
          xy: [
            [0.26, 0, 0],
            [0.3, n(92 - lights[0][0]), n(26 - lights[0][1])]
          ]
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.6 }
      },
      {
        name: "the second of the three: a golden light",
        svg: goldLight(lights[1][0], lights[1][1]),
        keys: track({
          opacity: [
            [lightAt(1), 0],
            [at3(lightAt(1) + 0.01), 1],
            [0.58, 1],
            [0.6, 0]
          ],
          xy: [
            [0.52, 0, 0],
            [0.57, n(mat[0] - lights[1][0]), n(97 - lights[1][1])]
          ]
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.6, phase: 0.33 }
      },
      {
        name: "the third of the three: a golden light",
        svg: goldLight(lights[2][0], lights[2][1]),
        keys: track({
          opacity: [
            [lightAt(2), 0],
            [at3(lightAt(2) + 0.01), 1],
            [0.84, 1],
            [0.86, 0]
          ],
          xy: [
            [0.79, 0, 0],
            [0.84, n(windowAt[0] - lights[2][0]), n(windowAt[1] - lights[2][1])]
          ]
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.6, phase: 0.66 }
      },
      ...risingSparks(
        "the two rak'ahs of Duha, rising",
        [
          [83, 98],
          [89, 98]
        ],
        0.59,
        0.04,
        { stay: true, rise: 10 }
      ),
      { name: "the witr: one light rising from the home", svg: goldLight(windowAt[0], n(windowAt[1] - 4), 2), keys: sparkRising(0.87, 0.92, 12), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a soft light about the home, through the night", svg: wash(124, 95, 22, 14, "#FFF3C4", 0.07), keys: showFrom(0.93, 0.97), loop: { move: "twinkle", ms: 2000, low: 0.8 } }
    ],
    words: [
      { text: "Abu Hurairah: He advised me of three", from: 0.02, to: 0.23 },
      { text: "Fasting three days of every month", from: 0.25, to: 0.48 },
      { text: "Two rak'ahs of Duha", from: 0.5, to: 0.73 },
      { text: "And to pray witr before I sleep", from: 0.75, to: 1 }
    ]
  };
}

// The one from Najd. Talhah ibn Ubaydullah said: a man of the people of Najd came to the Messenger of Allah ﷺ, his hair
// unkempt; we heard the hum of his voice but could not make out what he said, until he came near, and he was asking
// about Islam. The Messenger of Allah ﷺ said: five prayers in the day and the night. He asked: is there any other on me?
// He said: no, unless you do it of your own will. And the fast of Ramadan; and he told him of zakat; and each time he
// asked if there was any other, and he said: no, unless you do it of your own will. The man turned away, saying: by
// Allah, I will not add to this, nor take from it. The Messenger of Allah ﷺ said: he has succeeded, if he is truthful
// (Sahih al-Bukhari 46). No one is drawn: his place is a golden ring among the homes of Madinah, with places sitting
// by it. Far off, one comes along a way from the hills, the hum of his voice in faint broken arcs, and comes near, and
// asks in a clear voice. His voice answers: five lights show in the air for the five prayers of the day and the night,
// then a crescent for the fast of Ramadan, and a sack with coins for zakat. Asked if there is more, his voice answers,
// and a dashed light shows by each, for what one may do of his own will. The one from Najd speaks, turns and goes back
// along the way, a dashed golden ring about him; his voice speaks, and a warm light comes in the one from Najd.
function askedAboutIslam(): SignArt {
  const his: [number, number] = [116, 101];
  const came: [number, number] = [4, 84];
  // Along the way from the hills, a cubic from (4, 84) through (30, 88) and (60, 100) to (102, 101), as offsets.
  const along: [number, number][] = [
    [0, 0],
    [20.4, 4.2],
    [43, 9.6],
    [68.6, 14.5],
    [98, 17]
  ];
  const at = (k: number, t: number): [number, number, number] => [t, along[k][0], along[k][1]];
  const comes: [number, number, number][] = [at(0, 0.04), at(1, 0.08), at(2, 0.12), at(2, 0.19), at(3, 0.23), at(4, 0.27)];
  const goesBack: [number, number, number][] = [at(4, 0.87), at(3, 0.9), at(2, 0.93)];
  const near: [number, number] = [n(came[0] + along[4][0]), n(came[1] + along[4][1])];
  const back: [number, number] = [n(came[0] + along[2][0]), n(came[1] + along[2][1])];
  const prayers = [24, 36, 48, 60, 72];
  const answer = (name: string, from: number, gone: number): SignPart => ({
    name,
    svg: arcsLeft(n(his[0] - 3.2), n(his[1] - 2), VOICE),
    keys: showWhile(from, at3(from + 0.01), at3(gone - 0.01), gone),
    loop: { move: "twinkle", ms: 900, low: 0.5 }
  });
  return {
    kind: "asked-about-islam",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(140, 20) },
      { name: "clouds", svg: cloud(110, 30, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      { name: "homes of Madinah", svg: home(112, 92, 16, 11) + home(134, 91, 14, 10) + home(152, 92.4, 12, 9) },
      ...palms([
        [98, 94, 14],
        [124, 93, 12]
      ]),
      { name: "the way from the hills", svg: way(`M${came[0]} ${came[1]} C30 88 60 100 102 101`, "#FFF0C4", 1) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...[126, 134, 142].map((x, i): SignPart => ({ name: `a place sitting with him ${i + 1}`, svg: someone(x, i % 2 ? 101 : 101.4, 1.4) })),
      {
        name: "the place of the one from Najd",
        svg: someone(came[0], came[1], 1.5),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: [...comes, ...goesBack]
        })
      },
      {
        name: "the hum of his voice, far off: faint broken arcs",
        svg: humArcs(n(came[0] + 3), n(came[1] - 2.6)),
        keys: track({
          opacity: [
            [0.04, 0],
            [0.05, 1],
            [0.18, 1],
            [0.19, 0]
          ],
          xy: comes.slice(0, 3)
        }),
        loop: { move: "twinkle", ms: 700, low: 0.3 }
      },
      {
        name: "asking about Islam: a clear voice",
        svg: arcs(n(near[0] + 3), n(near[1] - 2.4), VOICE),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.28, 1],
            [0.34, 1],
            [0.35, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      { name: "a soft band in the air: what he told him", svg: band(14, 16, 84, 44), keys: showFrom(0.35, 0.37) },
      answer("his voice: five prayers", 0.35, 0.44),
      ...prayers.map((x, i): SignPart => ({ name: `the five prayers, in the day and the night: a light ${i + 1}`, svg: goldLight(x, 26), keys: showFrom(at3(0.36 + 0.016 * i), at3(0.368 + 0.016 * i)), loop: { move: "twinkle", ms: 1300, low: 0.7, phase: i / 5 } })),
      answer("his voice: the fast of Ramadan, and zakat", 0.5, 0.6),
      { name: "the fast of Ramadan: a crescent", svg: glow(32, 46, 6, "#FFF3C4", 0.2) + crescent(32, 46, 4, 1.6, "#E9C766"), keys: showFrom(0.51, 0.54) },
      { name: "zakat: a sack and its coins", svg: sack(64, 52, 0.9) + goldCoin(72, 51.4, 1.4) + goldCoin(75.4, 50.4, 1.4) + goldCoin(74, 47.8, 1.4), keys: showFrom(0.55, 0.58) },
      {
        name: "the one from Najd, asking: is there more?",
        svg: arcs(n(near[0] + 3), n(near[1] - 2.4), VOICE),
        keys: showWhile(0.66, 0.67, 0.7, 0.71),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      answer("his voice: no, unless you wish to", 0.7, 0.76),
      { name: "unless he wishes: a dashed light by the five prayers", svg: extraRing(86, 26), keys: showFrom(0.715, 0.725) },
      { name: "unless he wishes: a dashed light by the fast", svg: extraRing(44, 46), keys: showFrom(0.73, 0.74) },
      { name: "unless he wishes: a dashed light by zakat", svg: extraRing(86, 50), keys: showFrom(0.745, 0.755) },
      {
        name: "the one from Najd: I will not add, nor take away",
        svg: arcsLeft(n(near[0] - 3), n(near[1] - 2.4), VOICE),
        keys: showWhile(0.83, 0.84, 0.86, 0.87),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      {
        name: "if he is truthful: a dashed golden ring about him",
        svg: extraRing(came[0], came[1], 3.4),
        keys: track({
          opacity: [
            [0.88, 0],
            [0.9, 1]
          ],
          xy: goesBack
        })
      },
      answer("his voice: he has succeeded, if he is truthful", 0.88, 0.96),
      { name: "he has succeeded: a warm light in the one from Najd", svg: lightIn(back[0], back[1], 3.6), keys: showFrom(0.93, 0.96), loop: { move: "twinkle", ms: 1500, low: 0.75 } }
    ],
    words: [
      { text: "Talhah: a man of Najd came, loud of voice", from: 0.02, to: 0.16 },
      { text: "The man came near, asking about Islam", from: 0.18, to: 0.32 },
      { text: "Five prayers in the day and the night", from: 0.34, to: 0.48 },
      { text: "And the fast of Ramadan, and zakat", from: 0.5, to: 0.64 },
      { text: "Anything more? No, unless you wish to", from: 0.66, to: 0.8 },
      { text: "He said: the man succeeded, if truthful", from: 0.82, to: 1 }
    ]
  };
}

// The greatest surah. Abu Sa'id ibn al-Mu'alla said: I was praying in the masjid when the Messenger of Allah ﷺ called
// me, and I did not answer him. Then I said: O Messenger of Allah, I was praying. He said: did Allah not say: answer
// Allah and the Messenger when he calls you? Then he said to me: I will teach you a surah that is the greatest surah in
// the Quran before you leave the masjid. Then he took my hand, and when he was about to leave, I said to him: did you
// not say you would teach me a surah that is the greatest in the Quran? He said: All praise is for Allah, Lord of the
// worlds: it is the seven oft-repeated and the great Quran that I was given (Sahih al-Bukhari 4474). No one is drawn,
// not even a hand, and no page: Abu Sa'id's place prays on its mat before the masjid in Madinah, a soft glow of prayer
// on it. His place, a golden ring, comes along and his voice calls; the place prays on, and then, its prayer done,
// comes to him. His voice speaks the ayah, and a golden way shows between them. His voice speaks again, a golden light
// of promise shows above them, and they go together along a way to the masjid's door, the light with them. There, Abu
// Sa'id's voice reminds him and his voice answers: seven golden lights come one after another over the door; then they
// go round together, a ring of seven, a great warm glow comes about them, and a warm light on the two at the door.
function greatestSurah(): SignArt {
  const sa: [number, number] = [36, 102.4];
  const hisStart: [number, number] = [120, 102.6];
  const saDoor: [number, number] = [75.4, 93.4];
  const hisDoor: [number, number] = [84.6, 93];
  const ringAt: [number, number] = [80, 58];
  const seven = [0, 1, 2, 3, 4, 5, 6].map((k): [number, number] => {
    const angle = ((-90 + (k * 360) / 7) * Math.PI) / 180;
    return [n(ringAt[0] + 12 * Math.cos(angle)), n(ringAt[1] + 12 * Math.sin(angle))];
  });
  const hisMoves: [number, number, number][] = [
    [0.03, 0, 0],
    [0.1, -64, 0],
    [0.46, -64, 0],
    [0.53, n(hisDoor[0] - hisStart[0]), n(hisDoor[1] - hisStart[1])]
  ];
  const saMoves: [number, number, number][] = [
    [0.23, 0, 0],
    [0.27, 8, 0],
    [0.46, 8, 0],
    [0.53, n(saDoor[0] - sa[0]), n(saDoor[1] - sa[1])]
  ];
  const near = n(hisStart[0] - 64);
  return {
    kind: "greatest-surah",
    ms: 11000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(136, 20) },
      { name: "clouds", svg: cloud(40, 26, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [10, 96, 15],
        [150, 95, 14]
      ]),
      { name: "the masjid", svg: madinahMasjid(56, 90, 1) },
      { name: "a way to the masjid's door", svg: way("M48 104 C58 101 70 97 80 91.4", "#FFF0C4", 1), keys: showFrom(0.44, 0.46) },
      { name: "Abu Sa'id's prayer mat", svg: prayerMat(sa[0], 104) },
      {
        name: "at prayer: a soft glow on Abu Sa'id's place",
        svg: glow(sa[0], sa[1], 5, WARM, 0.22),
        keys: track({
          opacity: [
            [0.21, 1],
            [0.23, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1500, low: 0.7 }
      },
      { name: "Abu Sa'id's place", svg: someone(sa[0], sa[1], 1.5), keys: track({ xy: saMoves }) },
      { name: "a golden ring, his place", svg: ring(hisStart[0], hisStart[1], 2.6, GOLD), keys: track({ xy: hisMoves }) },
      { name: "his voice, calling", svg: arcsLeft(n(near - 3.4), n(hisStart[1] - 2), VOICE), keys: showWhile(0.1, 0.11, 0.14, 0.15), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "his voice: answer when he calls you", svg: arcsLeft(n(near - 3.4), n(hisStart[1] - 2), VOICE), keys: showWhile(0.27, 0.28, 0.33, 0.34), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "answering the call: a golden way between them", svg: way(`M${n(sa[0] + 10)} 105.4 L${n(near - 2)} 105.4`, GOLD, 0.7), keys: showWhile(0.3, 0.33, 0.44, 0.45) },
      { name: "his voice: I will teach you the greatest surah", svg: arcsLeft(n(near - 3.4), n(hisStart[1] - 2), VOICE), keys: showWhile(0.4, 0.41, 0.44, 0.45), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "a promise: a golden light above them",
        svg: goldLight(50, 92, 2),
        keys: track({
          opacity: [
            [0.42, 0],
            [0.44, 1],
            [0.65, 1],
            [0.67, 0]
          ],
          xy: [
            [0.46, 0, 0],
            [0.53, 30, -10]
          ]
        }),
        loop: { move: "twinkle", ms: 1100, low: 0.6 }
      },
      { name: "Abu Sa'id's voice, reminding him", svg: arcs(n(saDoor[0] + 2.8), n(saDoor[1] - 2.2), VOICE), keys: showWhile(0.6, 0.61, 0.63, 0.64), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: the greatest surah", svg: arcsLeft(n(hisDoor[0] - 2.8), n(hisDoor[1] - 2.2), VOICE), keys: showWhile(0.64, 0.65, 0.73, 0.74), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      ...seven.map(
        ([x, y], k): SignPart => ({
          name: `the seven oft-repeated: a golden light ${k + 1}`,
          svg: goldLight(x, y, 2),
          keys: track({
            opacity: [
              [at3(0.65 + 0.012 * k), 0],
              [at3(0.658 + 0.012 * k), 1]
            ],
            rotate: [
              [0.82, 0],
              [0.92, n((2 * 360) / 7)]
            ]
          }),
          origin: { x: ringAt[0], y: ringAt[1] },
          loop: { move: "twinkle", ms: 1200, low: 0.65, phase: k / 7 }
        })
      ),
      { name: "the great Quran: a great warm glow about them", svg: glow(ringAt[0], ringAt[1], 24, WARM, 0.12), keys: showFrom(0.86, 0.92), loop: { move: "twinkle", ms: 2000, low: 0.8 } },
      { name: "a warm light on the two at the door", svg: wash(80, 93.2, 11, 4.4, WARM, 0.22), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1600, low: 0.75 } }
    ],
    words: [
      { text: "I was praying, and he called me", from: 0.02, to: 0.19 },
      { text: "Answer Allah and the Messenger when he calls", from: 0.21, to: 0.38 },
      { text: "I will teach you the greatest surah", from: 0.4, to: 0.57 },
      { text: "All praise is for Allah, Lord of the worlds", from: 0.59, to: 0.78 },
      { text: "The seven oft-repeated, and the great Quran", from: 0.8, to: 1 }
    ]
  };
}

// The Black Stone. Abis ibn Rabi'ah said: Umar came to the Black Stone and kissed it, and said: I know that you are a
// stone; you neither harm nor benefit. Had I not seen the Prophet ﷺ kiss you, I would not have kissed you (Sahih
// al-Bukhari 1597). No one is drawn: the Ka'bah stands among the mountains of Makkah, the Black Stone in its silver
// frame at its corner. Umar's place comes along a way to the stone, and a soft ring shows at it. His voice speaks, and
// a plain grey ring comes about the stone: only a stone. A grey mark of harm and a golden mark of good show by it, and
// both are struck out: it neither harms nor benefits. Umar's place steps back, and a faint golden ring shows at the
// stone where he saw his place, with a faint line of looking to it; it fades, Umar's place comes to the stone again, a
// soft ring shows at it, and a warm light comes in Umar's place: he followed the Sunnah.
function blackStone(): SignArt {
  const stone: [number, number] = [66, 96];
  const umar: [number, number] = [24, 104];
  const atStone: [number, number] = [56.4, 98.6];
  const stepBack: [number, number] = [44, 102];
  const toStone: [number, number] = [n(atStone[0] - umar[0]), n(atStone[1] - umar[1])];
  const toBack: [number, number] = [n(stepBack[0] - umar[0]), n(stepBack[1] - umar[1])];
  const umarMoves: [number, number, number][] = [
    [0.04, 0, 0],
    [0.11, toStone[0], toStone[1]],
    [0.6, toStone[0], toStone[1]],
    [0.63, toBack[0], toBack[1]],
    [0.84, toBack[0], toBack[1]],
    [0.88, toStone[0], toStone[1]]
  ];
  const marks = (from: number, to: number) =>
    track({
      opacity: [
        [from, 0],
        [to, 1],
        [0.6, 1],
        [0.62, 0]
      ]
    });
  return {
    kind: "black-stone",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C6E4F6", "#EBDDB8", 61) },
      { name: "the sun", svg: sun(138, 18) },
      { name: "clouds", svg: cloud(36, 22, 0.3, "#FFFFFF", 0.9), loop: { move: "slide", ms: 12000 } },
      {
        name: "mountains of Makkah",
        svg: peaks(
          [
            [14, 30, 24],
            [46, 20, 20],
            [118, 24, 22],
            [150, 34, 24]
          ],
          80,
          "#A08E7B",
          false
        )
      },
      { name: "the land", svg: land() },
      { name: "the ground about the House", svg: `<ellipse cx="82" cy="101" rx="62" ry="10" fill="#F4EFE4"/>` },
      { name: "a dashed way round the House", svg: `<ellipse cx="82" cy="100" rx="40" ry="6.6" stroke="#D9CBAE" stroke-width="0.6" stroke-dasharray="1.6 1.4" fill="none"/>` },
      { name: "the Ka'bah", svg: kabah(64, 100, 32) },
      { name: "the Black Stone, in its silver frame", svg: blackStoneAt(stone[0], stone[1]) },
      { name: "a way to the stone", svg: way(`M${umar[0]} ${umar[1]} C36 104 46 101 ${n(atStone[0] - 2)} ${n(atStone[1] + 0.4)}`, "#E3D2AC", 1) },
      {
        name: "Umar's place",
        svg: someone(umar[0], umar[1], 1.5),
        keys: track({
          opacity: [
            [0.03, 0],
            [0.04, 1]
          ],
          xy: umarMoves
        })
      },
      { name: "at the stone: a soft ring", svg: ring(stone[0], stone[1], 3.4, "#FFF3CF"), keys: showWhile(0.12, 0.14, 0.21, 0.22) },
      { name: "Umar's voice: I know that you are a stone", svg: arcs(n(atStone[0] + 2.8), n(atStone[1] - 1.6), VOICE), keys: showWhile(0.22, 0.23, 0.33, 0.34), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "only a stone: a plain grey ring about it", svg: care(stone[0], stone[1], 4.4, 4.8, GREY), keys: marks(0.25, 0.29) },
      { name: "Umar's voice: you neither harm nor benefit", svg: arcs(n(atStone[0] + 2.8), n(atStone[1] - 1.6), VOICE), keys: showWhile(0.4, 0.41, 0.52, 0.53), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "harm: a grey mark by the stone", svg: harmMark(50, 86), keys: marks(0.42, 0.44) },
      { name: "good: a golden mark by the stone", svg: sparkle(60, 84.4, 2, "#E8A93A"), keys: marks(0.45, 0.47) },
      { name: "neither, from the stone: both struck out", svg: struckOut(50, 86) + struckOut(60, 84.4), keys: marks(0.48, 0.5) },
      {
        name: "his place at the stone, as Umar saw it: a faint golden ring",
        svg: `<circle cx="${atStone[0]}" cy="${atStone[1]}" r="2.6" stroke="${GOLD}" stroke-width="0.7" stroke-dasharray="1 0.9" fill="none"/>`,
        keys: track({
          opacity: [
            [0.64, 0],
            [0.68, 0.75],
            [0.81, 0.75],
            [0.84, 0]
          ]
        })
      },
      {
        name: "Umar seeing it: a faint line",
        svg: lookLine(n(stepBack[0] + 2), n(stepBack[1] - 0.8), n(atStone[0] - 2.6), n(atStone[1] + 0.4), 97.6),
        keys: track({
          opacity: [
            [0.68, 0],
            [0.71, 1],
            [0.81, 1],
            [0.84, 0]
          ]
        })
      },
      { name: "at the stone again: a soft ring", svg: ring(stone[0], stone[1], 3.4, "#FFF3CF"), keys: showFrom(0.89, 0.91) },
      { name: "following: a warm light in Umar's place", svg: lightIn(atStone[0], atStone[1], 3.6), keys: showFrom(0.91, 0.94), loop: { move: "twinkle", ms: 1500, low: 0.75 } }
    ],
    words: [
      { text: "Umar came to the Black Stone, and kissed it", from: 0.02, to: 0.19 },
      { text: "I know that you are a stone", from: 0.21, to: 0.38 },
      { text: "You neither harm nor benefit", from: 0.4, to: 0.57 },
      { text: "Had I not seen him kiss you", from: 0.59, to: 0.78 },
      { text: "I would not have kissed you", from: 0.8, to: 1 }
    ]
  };
}

export const DEVOTION_ART = {
  "straight-rows": straightRows,
  "sweetest-recitation": sweetestRecitation,
  "easy-religion": easyReligion,
  "three-things-to-keep": threeThings,
  "asked-about-islam": askedAboutIslam,
  "greatest-surah": greatestSurah,
  "black-stone": blackStone
};
