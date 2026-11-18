import { animalAt, cloud, glow, n, nightSky, sky, stars, type SignArt, type SignPart } from "./signDraw";
import { madinahMasjid, ring, sack, showWhile, sparkle, way } from "./giveArt";
import { arcsLeft } from "./companionArt";
import { arcs } from "./mannersArt";
import { at3, showFrom } from "./storyArt";
import { crescent, home } from "./trialArt";
import { GREY } from "./lovedArt";
import { dish } from "./worthArt";
import { EVENING } from "./heartArt";
import { GOLD, hills, land, someone, sun, VOICE, WARM, wash } from "./worshipArt";
import { care, dayAround, LIGHT, lightIn, palms, sparkRising, tent, track } from "./daysArt";
import { lookLine } from "./truthArt";
import { faintRing, goldLight, goldLine, litWindow, NIGHT_OVER_LAND, NIGHT_OVER_SKY, nightLand } from "./heedArt";

/**
 * What is given and what is kept, drawn as the scenes of heeding are (heedArt.ts): the most generous of people, and
 * most generous of all in Ramadan; Dawud, for whom reciting was made easy; the good Hakim did before Islam, kept; the
 * i'tikaf of the last ten nights, kept until Allah took him and kept after him; az-Zubayr, his disciple; help for one's
 * brother, wronged or doing wrong; and the last surah Umm al-Fadl heard from him. Only the land, the sky, buildings,
 * things, plants and animals are drawn. No Prophet, no Companion and no person is ever drawn, not even a hand or a face:
 * where someone went, a dashed way shows it, where someone was, a ring or a small dashed circle, and a voice is arcs in
 * the air. Nothing is drawn for Allah or for an angel, and nothing comes down from the sky: a prayer is a spark that
 * rises.
 */

/** Keys of a thing that shows at `from`, goes (dx, dy) by `to`, and stays there. */
const goTo = (from: number, to: number, dx: number, dy: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.005), 1]
    ],
    xy: [
      [at3(from + 0.005), 0, 0],
      [to, dx, dy]
    ]
  });

/** Keys of a golden line that shows at `from` and grows from its left end (its `origin`) until `to`. */
const grow = (from: number, to: number) =>
  track({
    opacity: [
      [from, 0],
      [at3(from + 0.003), 1]
    ],
    scaleX: [
      [from, 0.02],
      [to, 1]
    ]
  });

/** A soft wind: long white strokes with curled ends, low over a town. */
const WIND =
  `<g fill="none" stroke="#FFFFFF" stroke-width="1.1" stroke-linecap="round" opacity="0.9">` +
  `<path d="M8 70 C28 66 44 72 62 68 C68 66 68 60 63 61"/><path d="M40 84 C60 80 78 86 98 82"/>` +
  `<path d="M86 68 C104 64 120 70 138 66 C144 64 143 58 138 59"/><path d="M104 92 C118 89 132 93 150 90"/></g>`;

// The most generous. Ibn Abbas said: the Messenger of Allah ﷺ was the most generous of people, and he was most
// generous of all in Ramadan, when Jibril met him; Jibril would meet him every night of Ramadan and study the Quran
// with him; and the Messenger of Allah ﷺ was more generous with good than the sent wind (Sahih al-Bukhari 6). No one
// is drawn, and nothing of Jibril: his place is a golden ring at the door of his home, and small sacks of his giving go
// out to the homes of Madinah, one after another, and a warm light comes in each. In the evening Ramadan's crescent
// shows, and he gives still more. Night comes, the window of his home is lit, and night after night the moon grows;
// his recitation of the Quran comes as golden arcs from his window, and a golden line grows over Madinah. Then morning
// comes, a soft wind sweeps over the town, and with it golden lights go out to every home and beyond.
function mostGenerous(): SignArt {
  const his: [number, number] = [35, 106];
  const own: [number, number, number, number] = [26, 101, 22, 15];
  const homes: [number, number, number, number][] = [
    [66, 100, 18, 13],
    [98, 101, 20, 14],
    [132, 100, 18, 13]
  ];
  const start: [number, number] = [39, 107.6];
  /** A sack of his giving that shows by his place at `from`, goes to the doorstep of home `i` by `to`, and is taken in. */
  const gift = (k: number, i: number, from: number, to: number): SignPart => {
    const [x, y] = homes[i];
    return {
      name: `his giving: a sack going to a home ${k}`,
      svg: sack(start[0], start[1], 0.5),
      keys: track({
        opacity: [
          [from, 0],
          [at3(from + 0.005), 1],
          [to, 1],
          [at3(to + 0.01), 0]
        ],
        xy: [
          [at3(from + 0.005), 0, 0],
          [to, n(x - 6 - start[0]), n(y + 3.4 - start[1])]
        ]
      })
    };
  };
  // When a warm light first comes in each home, as its first sack is taken in.
  const given = [0.1, 0.12, 0.3];
  const windFrom: [number, number] = [his[0], n(his[1] - 6)];
  const sent: [number, number][] = [[8, 92], ...homes.map(([x, y]): [number, number] => [n(x - 1.8), n(y - 9)]), [154, 92]];
  return {
    kind: "most-generous",
    ms: 12000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      {
        name: "the sun",
        svg: sun(112, 22),
        keys: track({
          opacity: [
            [0.2, 1],
            [0.23, 0],
            [0.77, 0],
            [0.8, 1]
          ]
        })
      },
      { name: "clouds", svg: cloud(46, 30, 0.6, "#FFFFFF", 0.9) + cloud(140, 40, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 12000 } },
      {
        name: "the evening sky",
        svg: EVENING,
        keys: track({
          opacity: [
            [0.2, 0],
            [0.23, 1],
            [0.76, 1],
            [0.8, 0]
          ]
        })
      },
      {
        name: "the night over the sky",
        svg: NIGHT_OVER_SKY,
        keys: track({
          opacity: [
            [0.38, 0],
            [0.41, 0.95],
            [0.76, 0.95],
            [0.8, 0]
          ]
        })
      },
      {
        name: "stars of the night",
        svg: stars([
          [10, 12],
          [28, 36],
          [46, 10],
          [64, 30],
          [84, 14],
          [102, 38],
          [146, 10],
          [150, 32],
          [20, 56],
          [88, 56]
        ]),
        keys: track({
          opacity: [
            [0.39, 0],
            [0.42, 1],
            [0.76, 1],
            [0.79, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "Ramadan's crescent", svg: glow(126, 16, 6, "#FFF3C4", 0.12) + crescent(126, 16, 3.4, 1.3, "#FFF3C4"), keys: showWhile(0.21, 0.24, 0.43, 0.45) },
      { name: "night after night of Ramadan: the moon, half", svg: glow(126, 16, 6, "#FFF3C4", 0.12) + crescent(126, 16, 3.4, 0, "#FFF3C4"), keys: showWhile(0.43, 0.45, 0.47, 0.49) },
      { name: "night after night of Ramadan: the moon, full", svg: `${glow(126, 16, 7, "#FFF3C4", 0.14)}<circle cx="126" cy="16" r="3.4" fill="#FFF3C4"/>`, keys: showWhile(0.47, 0.49, 0.76, 0.79) },
      { name: "hills", svg: hills() },
      {
        name: "the hills at night",
        svg: hills("#3A4263"),
        keys: track({
          opacity: [
            [0.38, 0],
            [0.41, 1],
            [0.76, 1],
            [0.8, 0]
          ]
        })
      },
      { name: "the land", svg: land() },
      ...palms([
        [10, 98, 12],
        [152, 99, 13]
      ]),
      { name: "his home", svg: home(...own) },
      { name: "the homes of Madinah", svg: homes.map((each) => home(...each)).join("") },
      {
        name: "the night over the land",
        svg: NIGHT_OVER_LAND,
        keys: track({
          opacity: [
            [0.38, 0],
            [0.41, 1],
            [0.76, 1],
            [0.8, 0]
          ]
        })
      },
      ...homes.map(
        ([x, y, , h], i): SignPart => ({
          name: `given: a warm light in a home ${i + 1}`,
          svg: lightIn(n(x + 3.3), n(y - h + 3.7), 3.4),
          keys: showFrom(given[i], at3(given[i] + 0.02)),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 3 }
        })
      ),
      { name: "the nights of Ramadan: his window, lit", svg: litWindow(own[0], own[1], own[3]), keys: showWhile(0.41, 0.43, 0.76, 0.8) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "his generosity: a warm glow about his place", svg: wash(his[0], n(his[1] - 2), 8, 6, WARM, 0.2), keys: showFrom(0.03, 0.06), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      gift(1, 0, 0.05, 0.1),
      gift(2, 1, 0.07, 0.12),
      gift(3, 0, 0.24, 0.28),
      gift(4, 1, 0.25, 0.29),
      gift(5, 2, 0.26, 0.3),
      { name: "most generous in Ramadan: a warm wash over the homes", svg: wash(96, 96, 54, 14, WARM, 0.12), keys: showWhile(0.28, 0.32, 0.38, 0.41) },
      {
        name: "his recitation of the Quran: golden arcs from his window",
        svg: arcs(n(own[0] + 6), n(own[1] - own[3] + 3.6), GOLD),
        keys: showWhile(0.59, 0.6, 0.76, 0.77),
        loop: { move: "twinkle", ms: 1100, low: 0.5 }
      },
      { name: "the Quran: a golden glow about his home", svg: wash(own[0], n(own[1] - 8), 14, 10, "#FFE9A8", 0.18), keys: showWhile(0.6, 0.63, 0.76, 0.8), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "the Quran, gone over together: a golden line growing over Madinah", svg: goldLine(16, 144, 48, 1.2), origin: { x: 16, y: 48 }, keys: grow(0.6, 0.69) },
      {
        name: "the sent wind: soft strokes sweeping over the town",
        svg: WIND,
        keys: track({
          opacity: [
            [0.78, 0],
            [0.79, 1]
          ],
          xy: [
            [0.78, -70, 0],
            [0.86, 0, 0]
          ]
        }),
        loop: { move: "twinkle", ms: 1200, low: 0.5 }
      },
      ...sent.map(
        ([x, y], i): SignPart => ({
          name: `his good, with the wind: a golden light ${i + 1}`,
          svg: goldLight(windFrom[0], windFrom[1], 1.6),
          keys: goTo(at3(0.8 + 0.006 * i), at3(0.86 + 0.006 * i), n(x - windFrom[0]), n(y - windFrom[1])),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 5 }
        })
      ),
      { name: "good for all: a warm glow over Madinah", svg: wash(80, 96, 72, 16, WARM, 0.12), keys: showFrom(0.9, 0.93) }
    ],
    words: [
      { text: "He was the most generous of people", from: 0.02, to: 0.18 },
      { text: "Most generous of all in Ramadan", from: 0.2, to: 0.36 },
      { text: "When Jibril met him, every night of Ramadan", from: 0.38, to: 0.56 },
      { text: "And studied the Quran with him", from: 0.58, to: 0.74 },
      { text: "More generous with good than the sent wind", from: 0.76, to: 1 }
    ]
  };
}

/** A saddle cloth, in the horse card's units: over its back and down its side. */
const CLOTH = `<path d="M33 32.4 Q44 28.6 55 32.4 L54 45 L34 45 Z" fill="#9C3D2E"/><path d="M34 43.2 L54 43.2" stroke="#E0A060" stroke-width="1.2"/>`;

/** A saddle, in the horse card's units: on the cloth, with its strap and stirrup. */
const SADDLE =
  `<path d="M35.6 32 Q35.6 25.6 39.6 27.4 Q44 30 48.4 27.4 Q52.4 25.6 52.4 32 Z" fill="#5A3A22"/><path d="M38 31.2 L50 31.2" stroke="#8A6A42" stroke-width="1"/>` +
  `<path d="M44 32 L44 47.4" stroke="#4A3020" stroke-width="0.9"/><path d="M42.2 47.6 L45.8 47.6" stroke="#4A3020" stroke-width="1.3" stroke-linecap="round"/>`;

/** A coat of mail on its stand, about (64, 95): its shoulders, short sleeves and hem. */
const COAT: [number, number][] = [
  [60, 89.6],
  [62, 88.6],
  [66, 88.6],
  [68, 89.6],
  [71, 93.2],
  [69, 94.4],
  [68.2, 92.2],
  [68.2, 101],
  [59.8, 101],
  [59.8, 92.2],
  [59, 94.4],
  [57, 93.2]
];

/** The small rings of the coat's body whose rows are between `top` and `foot`, each row half a ring along. */
function coatRings(top: number, foot: number) {
  let d = "";
  for (let row = 0; row < 13; row += 1) {
    const y = n(89.8 + row * 0.9);
    if (y < top || y >= foot) continue;
    for (let k = 0; k < 8; k += 1) {
      const x = n(60.4 + (row % 2 ? 0.5 : 0) + k);
      if (x <= 67.8) d += `M${n(x - 0.4)} ${y} a0.4 0.4 0 1 0 0.8 0 a0.4 0.4 0 1 0 -0.8 0 `;
    }
  }
  return `<path d="${d.trim()}" stroke="#5F6871" stroke-width="0.25" fill="none"/>`;
}

// Dawud's recitation. Abu Hurairah said: the Prophet ﷺ said: reciting was made easy for Dawud, peace be upon him. He
// would order his mounts to be saddled, and he would finish reciting before his mounts were saddled; and he ate only
// from the work of his own hands (Sahih al-Bukhari 3417). He is not drawn: his place is a golden ring by his home, and
// his recitation golden arcs. His voice gives the order, and the saddles come onto his two mounts by themselves, one
// after another; before the last is on, a golden line of his recitation has grown from end to end and shines at its
// end. Then a coat of mail, the work of his hands (as Allah taught him, 21:80), forms band by band on its stand, a
// dish comes by his place, and a warm glow about it.
function dawudRecites(): SignArt {
  const his: [number, number] = [44, 106];
  const s = 0.27;
  const mounts: [number, number][] = [
    [104, 108.4],
    [130, 108.4]
  ];
  /** Where a mount is set, as animalAt sets a horse facing left with its feet at (x, y). */
  const corner = ([x, y]: [number, number]): [number, number] => [n(x - 50 * s), n(y - 73.4 * s)];
  const onMount = (at: [number, number], svg: string) => {
    const [x, y] = corner(at);
    return `<g transform="translate(${n(x + 100 * s)} ${y}) scale(${-s} ${s})">${svg}</g>`;
  };
  const bob = (i: number) => ({ move: "bob" as const, ms: 2400, y: -0.4, phase: i / 2 });
  const outline = `<path d="M${COAT.map(([x, y]) => `${x} ${y}`).join(" L")} Z" fill="#BAC1C8" opacity="0.6" stroke="#5F6871" stroke-width="0.6" stroke-linejoin="round"/>`;
  const bands: [number, number][] = [
    [89.6, 92.4],
    [92.4, 95.2],
    [95.2, 98],
    [98, 101]
  ];
  return {
    kind: "dawud-recites",
    ms: 10000,
    parts: [
      ...dayAround([136, 18], 10000),
      ...palms([[152, 99, 14]], "the land"),
      { name: "the home of Dawud", svg: home(24, 101, 26, 17, "#CDA978", "#B8925E", "#6B4A2E") },
      { name: "a rail where his mounts are tied", svg: `<path d="M92 108 L92 94.4 M142 108 L142 94.4" stroke="#8A6A42" stroke-width="1.2" stroke-linecap="round"/><path d="M91 95.6 L143 95.6" stroke="#9A7A50" stroke-width="0.9" stroke-linecap="round"/>` },
      ...mounts.map((at, i): SignPart => ({ name: `Dawud's mount ${i + 1}`, svg: animalAt("horse", ...corner(at), s, true), loop: bob(i) })),
      { name: "a stand", svg: `<path d="M64 108 L64 88.2 M57.6 89.2 L70.4 89.2" stroke="#8A6A42" stroke-width="0.9" stroke-linecap="round"/>` },
      { name: "a golden ring, Dawud's place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "made easy: a soft golden glow about Dawud's place", svg: wash(his[0], n(his[1] - 2), 8, 6.4, "#FFE9A8", 0.2), keys: showFrom(0.08, 0.12), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "Dawud's recitation, made easy: golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showWhile(0.04, 0.06, 0.26, 0.265), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "Dawud's voice: saddle my mounts", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showWhile(0.27, 0.275, 0.5, 0.505), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a saddle cloth on his first mount", svg: onMount(mounts[0], CLOTH), keys: showFrom(0.36, 0.38), loop: bob(0) },
      { name: "Dawud's recitation: golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showWhile(0.5, 0.505, 0.63, 0.64), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his recitation of the Zabur: a golden line growing", svg: goldLine(20, 140, 40, 1.2), origin: { x: 20, y: 40 }, keys: grow(0.51, 0.62) },
      { name: "finished: a golden light at its end", svg: `${glow(140, 40, 6, "#FFF3C0", 0.24)}${goldLight(140, 40, 2)}`, keys: showFrom(0.62, 0.64), loop: { move: "twinkle", ms: 1400, low: 0.7 } },
      { name: "a saddle on his first mount", svg: onMount(mounts[0], SADDLE), keys: showFrom(0.56, 0.58), loop: bob(0) },
      { name: "a saddle cloth on his second mount", svg: onMount(mounts[1], CLOTH), keys: showFrom(0.6, 0.61), loop: bob(1) },
      { name: "a saddle on his second mount", svg: onMount(mounts[1], SADDLE), keys: showFrom(0.68, 0.7), loop: bob(1) },
      { name: "his handiwork: a coat of mail", svg: outline, keys: showFrom(0.77, 0.79) },
      ...bands.map(([top, foot], i): SignPart => ({ name: `the rings of the coat, band ${i + 1}`, svg: coatRings(top, foot), keys: showFrom(at3(0.79 + 0.02 * i), at3(0.805 + 0.02 * i)) })),
      {
        name: "the rings shining",
        svg: `<path d="M62 92 l0.6 -1.3 l0.6 1.3 l-0.6 1.3 Z M66 96.4 l0.6 -1.3 l0.6 1.3 l-0.6 1.3 Z M61.4 99 l0.5 -1.1 l0.5 1.1 l-0.5 1.1 Z" fill="#FFFFFF"/>`,
        keys: showFrom(0.87, 0.89),
        loop: { move: "twinkle", ms: 1300, low: 0.2 }
      },
      { name: "a dish by Dawud's place", svg: dish(52, 107.4), keys: showFrom(0.88, 0.9) },
      { name: "a warm glow about Dawud's place", svg: wash(his[0], n(his[1] - 2), 9, 7, WARM, 0.2), keys: showFrom(0.9, 0.93), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "Reciting was made easy for Dawud", from: 0.02, to: 0.24 },
      { text: "Dawud would order the mounts saddled", from: 0.26, to: 0.48 },
      { text: "And finish reciting before the saddling", from: 0.5, to: 0.74 },
      { text: "Dawud ate only from the work of his hands", from: 0.76, to: 1 }
    ]
  };
}

/** A grey link of a chain, its middle at (x, y), lying along (`flat`) or standing. */
const link = (x: number, y: number, flat: boolean) =>
  `<ellipse cx="${x}" cy="${y}" rx="${flat ? 1.1 : 0.6}" ry="${flat ? 0.6 : 1.1}" stroke="${GREY}" stroke-width="0.5" fill="none"/>`;

// The good kept. Hakim ibn Hizam said: I said: O Messenger of Allah, what of the good things I used to do in the days
// of ignorance: charity, or freeing a slave, and keeping the ties of kinship? Is there any reward in them? The Prophet
// ﷺ said: you became Muslim with the good you did before (Sahih al-Bukhari 1436). No one is drawn: his place is a
// golden ring, and Hakim's place stands by it, its voice asking. The days of ignorance are dim over the land, and its
// good deeds come back one by one: a sack goes to a poor home; a chain opens and the place it held goes free; and a
// golden line joins two homes of kin. Each leaves a faint golden light. A faint ring shows over Hakim's place: is there
// any reward? Then his voice answers, the dimness lifts, the three lights brighten and come to Hakim's place, the ring
// over it turns golden, and a warm glow and a ring of care come about it.
function goodKept(): SignArt {
  const hakim: [number, number] = [118, 105.4];
  const his: [number, number] = [138, 106];
  const over: [number, number] = [118, 92.8];
  const held: [number, number] = [70, 107.6];
  const lights: [string, number, number, number, number, number][] = [
    // what, where it shows, when, and where it comes to over Hakim's place
    ["charity", 54, 86, 0.32, -2.6, 0.8],
    ["freeing", 79, 99, 0.4, 0, -2],
    ["keeping ties", 90, 80, 0.43, 2.6, 0.8]
  ];
  return {
    kind: "good-kept",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#C9DCEB", "#E7D6B6", 61) },
      { name: "clouds", svg: cloud(40, 28, 0.6, "#FFFFFF", 0.85) + cloud(104, 20, 0.5, "#FFFFFF", 0.8), loop: { move: "slide", ms: 10000 } },
      { name: "hills", svg: hills("#B9A27E") },
      { name: "the land", svg: land() },
      { name: "the home Hakim had then", svg: home(22, 100, 20, 14) },
      { name: "a poor home", svg: home(54, 101, 13, 9, "#BFA584", "#A88E6A", "#5A4632") },
      { name: "a home of his kin", svg: home(90, 100, 18, 13) },
      {
        name: "charity: a sack going to the poor home",
        svg: sack(17, 103.6, 0.7),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.275, 1],
            [0.32, 1],
            [0.33, 0]
          ],
          xy: [
            [0.275, 0, 0],
            [0.32, 30.4, 1]
          ]
        })
      },
      {
        name: "a place held, then freed",
        svg: someone(held[0], held[1], 1.5),
        keys: track({
          xy: [
            [0.37, 0, 0],
            [0.41, 9, 0]
          ]
        })
      },
      {
        name: "freeing: the chain opens, one side",
        svg: link(66.6, 110.4, true) + link(68.6, 110.4, false),
        keys: track({
          opacity: [
            [0.35, 1],
            [0.38, 0]
          ],
          xy: [
            [0.35, 0, 0],
            [0.38, -3, 0.6]
          ]
        })
      },
      {
        name: "freeing: the chain opens, the other side",
        svg: link(71.4, 110.4, false) + link(73.4, 110.4, true),
        keys: track({
          opacity: [
            [0.35, 1],
            [0.38, 0]
          ],
          xy: [
            [0.35, 0, 0],
            [0.38, 3, 0.6]
          ]
        })
      },
      { name: "keeping ties: a golden line between two homes", svg: `<path d="M24 85 Q57 70 90 86" stroke="${GOLD}" stroke-width="0.8" fill="none" opacity="0.8"/>`, keys: showFrom(0.41, 0.44) },
      {
        name: "the days of ignorance: a dimness over all",
        svg: `<rect width="160" height="120" fill="#4E4A58" opacity="0.3"/>`,
        keys: track({
          opacity: [
            [0.72, 1],
            [0.76, 0]
          ]
        })
      },
      ...lights.map(
        ([what, x, y, from, dx, dy]): SignPart => ({
          name: `${what}: a faint golden light, kept`,
          svg: goldLight(x, y, 1.6),
          keys: track({
            opacity: [
              [from, 0],
              [at3(from + 0.02), 0.5],
              [0.76, 0.5],
              [0.8, 1]
            ],
            xy: [
              [0.8, 0, 0],
              [0.88, n(over[0] + dx - x), n(over[1] + dy - y)]
            ]
          }),
          loop: { move: "twinkle", ms: 1500, low: 0.7 }
        })
      ),
      {
        name: "any reward: a faint dashed ring over Hakim's place",
        svg: faintRing(over[0], over[1], 3.4, "#EADFC0"),
        keys: track({
          opacity: [
            [0.53, 0],
            [0.56, 1],
            [0.86, 1],
            [0.88, 0]
          ]
        })
      },
      { name: "kept: a golden ring over Hakim's place", svg: `${glow(over[0], over[1], 6, WARM, 0.2)}<circle cx="${over[0]}" cy="${over[1]}" r="3.4" stroke="${GOLD}" stroke-width="0.6" fill="none"/>`, keys: showFrom(0.86, 0.88) },
      { name: "Hakim's place", svg: someone(hakim[0], hakim[1], 1.7) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      { name: "Hakim's voice: asking", svg: arcs(n(hakim[0] + 3.4), n(hakim[1] - 4.4), VOICE), keys: showWhile(0.03, 0.035, 0.7, 0.705), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "his voice: you became Muslim with that good", svg: arcsLeft(n(his[0] - 3.4), n(his[1] - 4.6), VOICE), keys: showFrom(0.71, 0.715), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "a warm glow about Hakim's place", svg: wash(hakim[0], n(hakim[1] - 2.8), 10, 8, WARM, 0.2), keys: showFrom(0.88, 0.92), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "a ring of care about Hakim's place", svg: care(hakim[0], n(hakim[1] + 1.4), 7.4, 3), keys: showFrom(0.9, 0.94) }
    ],
    words: [
      { text: "Hakim: Good I did in the days of ignorance", from: 0.02, to: 0.24 },
      { text: "Charity, freeing a slave, and keeping ties", from: 0.26, to: 0.5 },
      { text: "Is there any reward in them?", from: 0.52, to: 0.68 },
      { text: "You became Muslim with the good you did before", from: 0.7, to: 1 }
    ]
  };
}

// The last ten nights. Aishah, the wife of the Prophet ﷺ, said that the Prophet ﷺ would do i'tikaf in the last ten days
// of Ramadan until Allah took him; then his wives did i'tikaf after him (Sahih al-Bukhari 2026). No one is drawn: at
// night, the masjid of Madinah, and his place in it a golden ring. Ten lights of the last ten nights come one by one
// across the sky, and sparks of his worship rise. Then his ring fades, gently, and a soft golden glow stays where he
// prayed, as the lights dim. Then the ten lights come again, the places of his household come in at the door one by
// one, sparks of their worship rise, and a warm glow comes over the masjid.
function lastTenItikaf(): SignArt {
  const his: [number, number] = [60, 88.6];
  const door: [number, number] = [74.4, 100.4];
  const household: [number, number][] = [
    [82, 88.6],
    [88, 88.6],
    [94, 88.6],
    [100, 88.6]
  ];
  return {
    kind: "last-ten-itikaf",
    ms: 10000,
    parts: [
      { name: "the night sky", svg: nightSky(62) },
      {
        name: "stars of the night",
        svg: stars([
          [8, 10],
          [22, 44],
          [44, 8],
          [62, 46],
          [86, 10],
          [104, 48],
          [126, 8],
          [146, 42],
          [152, 12],
          [12, 56]
        ]),
        loop: { move: "twinkle", ms: 2600, low: 0.6 }
      },
      { name: "hills in the dark", svg: hills("#3A4263") },
      {
        name: "the land at night",
        svg: nightLand(62, [
          [18, 76],
          [130, 74],
          [28, 116],
          [128, 116]
        ])
      },
      ...palms([
        [18, 102, 14],
        [140, 102, 15]
      ]),
      { name: "the masjid of Madinah", svg: madinahMasjid(36, 103, 1.6) },
      { name: "the night over the land", svg: NIGHT_OVER_LAND },
      { name: "inside the masjid: a soft light", svg: `<rect x="37.6" y="78.6" width="74" height="14.6" fill="#FFE9A8" opacity="0.12"/>` },
      ...Array.from({ length: 10 }, (_, i): SignPart => {
        const first = at3(0.05 + 0.025 * i);
        const again = at3(0.64 + 0.016 * i);
        return {
          name: `the last ten nights: a light ${i + 1}`,
          svg: goldLight(n(30 + 11.1 * i), 26, 1.5),
          keys: track({
            opacity: [
              [first, 0],
              [at3(first + 0.012), 1],
              [0.46, 1],
              [0.52, 0.35],
              [again, 0.35],
              [at3(again + 0.008), 1]
            ]
          }),
          loop: { move: "twinkle", ms: 1500, low: 0.7, phase: i / 10 }
        };
      }),
      {
        name: "a golden ring, his place in the masjid",
        svg: ring(his[0], his[1], 2.6, GOLD),
        keys: track({
          opacity: [
            [0.45, 1],
            [0.52, 0]
          ]
        })
      },
      ...[0.1, 0.18, 0.26].map((from, i): SignPart => ({ name: `his worship: a spark rising ${i + 1}`, svg: sparkle(his[0], n(his[1] - 4.6), 1.4, "#FFE7A0"), keys: sparkRising(from, at3(from + 0.06), 12) })),
      { name: "where he prayed: a soft golden glow stays", svg: glow(his[0], n(his[1] - 1), 4, "#FFE9A8", 0.26), keys: showFrom(0.46, 0.52), loop: { move: "twinkle", ms: 2000, low: 0.75 } },
      ...household.map(
        ([x, y], i): SignPart => ({
          name: `a place of his household ${i + 1}`,
          svg: someone(door[0], door[1], 1.5, LIGHT),
          keys: goTo(at3(0.66 + 0.025 * i), at3(0.695 + 0.025 * i), n(x - door[0]), n(y - door[1]))
        })
      ),
      ...household.map(([x, y], i): SignPart => ({ name: `their worship: a spark rising ${i + 1}`, svg: sparkle(x, n(y - 4.6), 1.2, "#FFE7A0"), keys: sparkRising(at3(0.8 + 0.02 * i), at3(0.86 + 0.02 * i), 10) })),
      { name: "a warm glow over the masjid", svg: wash(74, 88, 40, 12, WARM, 0.12), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 2200, low: 0.8 } }
    ],
    words: [
      { text: "He would do i'tikaf in the last ten of Ramadan", from: 0.02, to: 0.4 },
      { text: "Until Allah took him", from: 0.42, to: 0.6 },
      { text: "Then his wives did i'tikaf after him", from: 0.62, to: 1 }
    ]
  };
}

/** The trench across the land, its near edge about y 88.6. */
const TRENCH =
  `<path d="M0 83.6 Q40 82.4 80 83.8 T160 83.4 L160 88.6 Q120 89.8 80 88.4 T0 88.8 Z" fill="#7A6448"/>` +
  `<path d="M0 83.6 Q40 82.4 80 83.8 T160 83.4" stroke="#A48C66" stroke-width="0.8" fill="none"/>` +
  `<path d="M0 88.8 Q40 90 80 88.4 T160 88.6" stroke="#B49C74" stroke-width="0.6" fill="none"/>`;

// My disciple. Jabir said: the Prophet ﷺ said on the day of al-Ahzab: who will bring me news of the people? Az-Zubayr
// said: I. Then he said: who will bring me news of the people? Az-Zubayr said: I. Then the Prophet ﷺ said: every prophet
// has a disciple, and my disciple is az-Zubayr (Sahih al-Bukhari 2846). No one is drawn, and nothing of the armies but
// their tents far off: on a grey winter day, the trench runs across the land, and beyond it the tents of the parties.
// His place is a golden ring on the near side, with the places of the Muslims. His voice asks, and a faint dashed way
// shows across toward the tents; az-Zubayr's place steps out, its voice answering; his voice asks again, and it steps
// to the edge of the trench and answers again. Then his voice speaks, a faint dashed ring shows beside him, the place
// of a disciple; it goes to az-Zubayr's place and turns golden about it, a golden line joins them, and a warm glow
// comes about az-Zubayr's place.
function myDisciple(): SignArt {
  const his: [number, number] = [50, 106];
  const zubayr: [number, number] = [92, 107];
  const out: [number, number] = [88, 100];
  const edge: [number, number] = [84, 94.6];
  const beside: [number, number] = [62, 107];
  const others: [number, number][] = [
    [104, 105.4],
    [114, 108],
    [124, 105.6]
  ];
  const voice = (from: number, hide: number) => showWhile(from, at3(from + 0.005), hide, at3(hide + 0.005));
  return {
    kind: "my-disciple",
    ms: 12000,
    parts: [
      { name: "the winter sky", svg: sky("#D3DCE4", "#E3DBC9", 61) },
      { name: "clouds", svg: cloud(40, 26, 0.6, "#F4F6F8", 0.9) + cloud(118, 20, 0.5, "#EEF1F4", 0.85), loop: { move: "slide", ms: 12000 } },
      { name: "hills", svg: hills("#A89A84") },
      { name: "the land", svg: land() },
      { name: "far off: the tents of the parties", svg: tent(96, 77, 7, 5, "#C9BBA0") + tent(121, 76, 8, 5.6, "#BFB196") + tent(133, 77.4, 7, 5, "#C9BBA0") + tent(145, 76.2, 8, 5.4, "#BFB196") + tent(155, 77, 7, 5, "#C9BBA0") },
      { name: "the trench", svg: TRENCH },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.6, GOLD) },
      ...others.map(([x, y], i): SignPart => ({ name: `a place among the Muslims ${i + 1}`, svg: someone(x, y, 1.6) })),
      { name: "his voice: who will bring me news of the parties", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: voice(0.03, 0.2), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the errand: a faint dashed way toward the parties", svg: `<g opacity="0.6">${way("M86 99 Q96 88 106 80", "#FFFFFF", 0.7)}</g>`, keys: showFrom(0.06, 0.1) },
      {
        name: "az-Zubayr's place",
        svg: someone(zubayr[0], zubayr[1], 1.7),
        keys: track({
          xy: [
            [0.21, 0, 0],
            [0.25, n(out[0] - zubayr[0]), n(out[1] - zubayr[1])],
            [0.45, n(out[0] - zubayr[0]), n(out[1] - zubayr[1])],
            [0.49, n(edge[0] - zubayr[0]), n(edge[1] - zubayr[1])]
          ]
        })
      },
      { name: "az-Zubayr's voice: I", svg: arcsLeft(n(out[0] - 3), n(out[1] - 4.2), VOICE), keys: voice(0.25, 0.36), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "his voice, again: who will bring me news", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: voice(0.37, 0.44), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "az-Zubayr's voice, again: I", svg: arcsLeft(n(edge[0] - 3), n(edge[1] - 4.2), VOICE), keys: voice(0.49, 0.56), loop: { move: "twinkle", ms: 800, low: 0.5 } },
      { name: "his voice: each has a disciple, and mine", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), VOICE), keys: showFrom(0.57, 0.575), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      {
        name: "the place of a disciple: a faint dashed ring beside him",
        svg: faintRing(beside[0], beside[1], 3.4),
        keys: track({
          opacity: [
            [0.6, 0],
            [0.63, 1],
            [0.86, 1],
            [0.88, 0]
          ],
          xy: [
            [0.78, 0, 0],
            [0.86, n(edge[0] - beside[0]), n(edge[1] - beside[1])]
          ]
        })
      },
      { name: "my disciple: a golden ring about az-Zubayr's place", svg: `<circle cx="${edge[0]}" cy="${edge[1]}" r="3.4" stroke="${GOLD}" stroke-width="0.7" fill="none"/>`, keys: showFrom(0.86, 0.88) },
      { name: "close to him: a golden line between them", svg: lookLine(53, 104, 81, 97, 92), keys: showFrom(0.88, 0.92) },
      { name: "a warm glow about az-Zubayr's place", svg: wash(edge[0], n(edge[1] - 1.6), 9, 7, WARM, 0.2), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "Who will bring me news of the people?", from: 0.02, to: 0.18 },
      { text: "Az-Zubayr said: I", from: 0.2, to: 0.34 },
      { text: "He asked again, and az-Zubayr said: I", from: 0.36, to: 0.54 },
      { text: "Every prophet has a disciple", from: 0.56, to: 0.74 },
      { text: "And my disciple is az-Zubayr", from: 0.76, to: 1 }
    ]
  };
}

// Help your brother. Anas said: the Messenger of Allah ﷺ said: help your brother, whether he does wrong or is wronged.
// They said: O Messenger of Allah, we help him when he is wronged; but how do we help him when he does wrong? He said:
// by holding back his hands (Sahih al-Bukhari 2444). No one is drawn: by the masjid his place is a golden ring, and his
// voice speaks. Harsh grey arcs go from a grey place to another, and a grey shade comes over the one wronged. A third
// place, asking, goes to it, and a warm glow comes as the shade fades. Then it asks how to help the one doing wrong,
// and a faint dashed way shows to it. His voice answers; the place goes to the one doing wrong and stands by it, a
// golden ring holds it back, its grey arcs stop, its place is grey no more, and a warm glow comes over them all.
function helpYourBrother(): SignArt {
  const his: [number, number] = [26, 106.4];
  const helps: [number, number] = [48, 105.8];
  const wronged: [number, number] = [80, 106];
  const wrong: [number, number] = [106, 105.4];
  return {
    kind: "help-your-brother",
    ms: 10000,
    parts: [
      ...dayAround([140, 20], 10000),
      ...palms([[150, 99, 14]]),
      { name: "the masjid of Madinah", svg: madinahMasjid(2, 101, 0.7) },
      { name: "a golden ring, his place", svg: ring(his[0], his[1], 2.4, GOLD) },
      { name: "his voice: help, wronged or doing wrong", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showWhile(0.03, 0.035, 0.26, 0.265), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "the place of one wronged", svg: someone(wronged[0], wronged[1], 1.7) },
      {
        name: "wronged: a grey shade over its place",
        svg: wash(wronged[0], n(wronged[1] - 2), 6.4, 5, GREY, 0.3),
        keys: track({
          opacity: [
            [0.1, 0],
            [0.14, 1],
            [0.38, 1],
            [0.42, 0]
          ]
        })
      },
      { name: "the wronging: harsh grey arcs", svg: arcsLeft(n(wrong[0] - 3.4), n(wrong[1] - 4.4), GREY), keys: showWhile(0.08, 0.1, 0.84, 0.86), loop: { move: "twinkle", ms: 500, low: 0.3 } },
      {
        name: "the place of one who helps",
        svg: someone(helps[0], helps[1], 1.7),
        keys: track({
          xy: [
            [0.3, 0, 0],
            [0.38, 22, 0.2],
            [0.76, 22, 0.2],
            [0.8, 32, -4.2],
            [0.84, 49, 0.4]
          ]
        })
      },
      {
        name: "its voice, asking",
        svg: arcsLeft(n(helps[0] - 3), n(helps[1] - 4.2), VOICE),
        keys: track({
          opacity: [
            [0.27, 0],
            [0.275, 1],
            [0.72, 1],
            [0.725, 0]
          ],
          xy: [
            [0.3, 0, 0],
            [0.38, 22, 0.2]
          ]
        }),
        loop: { move: "twinkle", ms: 900, low: 0.5 }
      },
      { name: "helped: a warm glow over the one wronged", svg: wash(n(wronged[0] - 4), n(wronged[1] - 2), 10, 6.4, WARM, 0.2), keys: showFrom(0.38, 0.42), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "how to help the one doing wrong: a faint dashed way to it", svg: way("M74 109.6 Q90 114.4 103 109.4", "#FFFFFF", 0.8), keys: showWhile(0.56, 0.6, 0.76, 0.78) },
      { name: "his voice: by holding it back", svg: arcs(n(his[0] + 3.2), n(his[1] - 4.2), VOICE), keys: showFrom(0.73, 0.735), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "held back: a golden ring about its place", svg: ring(wrong[0], n(wrong[1] + 1), 4.4, GOLD), keys: showFrom(0.84, 0.88) },
      {
        name: "the place of one doing wrong",
        svg: someone(wrong[0], wrong[1], 1.7, GREY),
        keys: track({
          opacity: [
            [0.88, 1],
            [0.92, 0]
          ]
        })
      },
      { name: "set right: its place", svg: someone(wrong[0], wrong[1], 1.7), keys: showFrom(0.88, 0.92) },
      { name: "set right: a warm glow over them all", svg: wash(92, 104, 22, 8, WARM, 0.16), keys: showFrom(0.9, 0.94), loop: { move: "twinkle", ms: 1800, low: 0.75 } }
    ],
    words: [
      { text: "Help your brother, wrongdoer or wronged", from: 0.02, to: 0.24 },
      { text: "They said: We help the one who is wronged", from: 0.26, to: 0.48 },
      { text: "But how do we help the wrongdoer?", from: 0.5, to: 0.7 },
      { text: "By holding back the wrongdoer's hands", from: 0.72, to: 1 }
    ]
  };
}

// The last surah she heard. Ibn Abbas said: Umm al-Fadl heard me reciting al-Mursalat (77:1), and she said: my son, by
// Allah, your recitation of this surah has reminded me that it was the last I heard from the Messenger of Allah ﷺ; he
// recited it in the Maghrib prayer (Sahih al-Bukhari 763). No one is drawn: by their home in Madinah, the place of Ibn
// Abbas recites in golden arcs, and Umm al-Fadl's place hears it. Her voice speaks, a soft glow comes about her place,
// and a faint line goes from it to the masjid. The evening comes and the sun goes down; the door of the masjid is lit,
// and his place is a golden ring at it. His recitation comes as golden arcs in the Maghrib prayer, the sun sets, a
// warm light stays at the masjid, and the first star shows.
function lastSurahHeard(): SignArt {
  const umm: [number, number] = [50, 105.4];
  const reciting: [number, number] = [70, 106.2];
  const his: [number, number] = [128, 105];
  return {
    kind: "last-surah-heard",
    ms: 10000,
    parts: [
      { name: "sky", svg: sky("#BFE3FA", "#DDF1FC", 62) },
      { name: "clouds", svg: cloud(36, 30, 0.6, "#FFFFFF", 0.9) + cloud(76, 20, 0.5, "#FFFFFF", 0.85), loop: { move: "slide", ms: 10000 } },
      {
        name: "the evening sky",
        svg: EVENING,
        keys: track({
          opacity: [
            [0.52, 0],
            [0.6, 1]
          ]
        })
      },
      {
        name: "the sun, going down",
        svg: sun(100, 24),
        keys: track({
          xy: [
            [0.52, 0, 0],
            [0.64, 0, 22],
            [0.8, 0, 22],
            [0.88, 0, 44]
          ]
        })
      },
      {
        name: "dusk over the sky",
        svg: `<rect width="160" height="44" fill="#26335F" opacity="0.72"/><rect y="44" width="160" height="18" fill="#B5655A" opacity="0.3"/>`,
        keys: track({
          opacity: [
            [0.84, 0],
            [0.9, 1]
          ]
        })
      },
      { name: "the first star", svg: stars([[30, 14]]), keys: showFrom(0.88, 0.9), loop: { move: "twinkle", ms: 1800, low: 0.6 } },
      { name: "hills", svg: hills() },
      { name: "the land", svg: land() },
      ...palms([
        [8, 98, 13],
        [90, 99, 12]
      ]),
      { name: "the home of Umm al-Fadl", svg: home(30, 101, 26, 17) },
      { name: "the masjid of Madinah", svg: madinahMasjid(104, 101, 1) },
      {
        name: "dusk over the land",
        svg: `<rect y="46" width="160" height="74" fill="#26335F" opacity="0.2"/>`,
        keys: track({
          opacity: [
            [0.84, 0],
            [0.9, 1]
          ]
        })
      },
      { name: "Umm al-Fadl's place", svg: someone(umm[0], umm[1], 1.7) },
      { name: "the place of Ibn Abbas, reciting", svg: someone(reciting[0], reciting[1], 1.5) },
      { name: "Ibn Abbas's recitation of al-Mursalat: golden arcs", svg: arcsLeft(n(reciting[0] - 3), n(reciting[1] - 4.2), GOLD), keys: showWhile(0.04, 0.06, 0.5, 0.52), loop: { move: "twinkle", ms: 1000, low: 0.5 } },
      { name: "al-Mursalat: a soft golden light", svg: goldLight(n(reciting[0] + 4), n(reciting[1] - 9.2), 1.4), keys: showWhile(0.08, 0.12, 0.5, 0.52), loop: { move: "twinkle", ms: 1500, low: 0.7 } },
      { name: "Umm al-Fadl's voice", svg: arcs(n(umm[0] + 3.2), n(umm[1] - 4.2), VOICE), keys: showFrom(0.27, 0.275), loop: { move: "twinkle", ms: 900, low: 0.5 } },
      { name: "reminded: a soft glow about her place", svg: wash(umm[0], n(umm[1] - 2.4), 8, 6.4, "#FFE9A8", 0.22), keys: showFrom(0.3, 0.36), loop: { move: "twinkle", ms: 1800, low: 0.75 } },
      { name: "her remembering: a faint line to the masjid", svg: lookLine(54, 100, 126, 93, 66), keys: showFrom(0.36, 0.42) },
      { name: "the masjid's door, lit", svg: `${glow(128, 98, 5, "#FFD866", 0.24)}<rect x="125.6" y="95" width="4.8" height="6" fill="#FFD866" opacity="0.85"/>`, keys: showFrom(0.56, 0.6) },
      { name: "a golden ring, his place at the masjid", svg: ring(his[0], his[1], 2.6, GOLD), keys: showFrom(0.58, 0.62) },
      { name: "his recitation in the Maghrib prayer: golden arcs", svg: arcs(n(his[0] + 3.4), n(his[1] - 4.4), GOLD), keys: showFrom(0.75, 0.77), loop: { move: "twinkle", ms: 1100, low: 0.5 } },
      { name: "a warm light at the masjid", svg: lightIn(his[0], n(his[1] - 7), 5), keys: showFrom(0.86, 0.9), loop: { move: "twinkle", ms: 1500, low: 0.7 } }
    ],
    words: [
      { text: "Umm al-Fadl heard Ibn Abbas recite al-Mursalat", from: 0.02, to: 0.24 },
      { text: "My son, by Allah, your recitation reminded me", from: 0.26, to: 0.48 },
      { text: "It was the last I heard from him", from: 0.5, to: 0.72 },
      { text: "He recited it in the Maghrib prayer", from: 0.74, to: 1 }
    ]
  };
}

export const KEPT_ART = {
  "most-generous": mostGenerous,
  "dawud-recites": dawudRecites,
  "good-kept": goodKept,
  "last-ten-itikaf": lastTenItikaf,
  "my-disciple": myDisciple,
  "help-your-brother": helpYourBrother,
  "last-surah-heard": lastSurahHeard
};
